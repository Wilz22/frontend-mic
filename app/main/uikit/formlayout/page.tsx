'use client';

import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

const API_BASE = 'http://192.168.250.10/microservice-entity/public/api/clientes';

async function apiCreateCliente(cliente: { nombre_completo: string; direccion: string; email: string; telefono: string }) {
    const token = localStorage.getItem('access_token');
    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    const res = await fetch(API_BASE, {
        method: 'POST',
        headers,
        body: JSON.stringify(cliente)
    });
    if (!res.ok) throw new Error(`POST ${API_BASE} ${res.status}`);
    return await res.json();
}

const FormLayoutDemo = () => {
    const [form, setForm] = useState({ nombre_completo: '', direccion: '', email: '', telefono: '' });
    const [loading, setLoading] = useState(false);
    const toast = useRef<Toast>(null);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await apiCreateCliente(form);
            toast.current?.show({
                severity: 'success',
                summary: '¡Ingreso exitoso!',
                detail: 'Cliente creado exitosamente.',
                life: 2500
            });
            setForm({ nombre_completo: '', direccion: '', email: '', telefono: '' });
        } catch (err: any) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al crear cliente: ' + (err?.message ?? ''),
                life: 4000
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid" style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
            <Toast ref={toast} />
            <div className="col-12 md:col-6">
                <div className="card p-fluid">
                    <h5>Crear Cliente</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label htmlFor="nombre_completo">Nombre Completo</label>
                            <InputText id="nombre_completo" value={form.nombre_completo} onChange={handleInput} required autoFocus />
                        </div>
                        <div className="field">
                            <label htmlFor="direccion">Dirección</label>
                            <InputText id="direccion" value={form.direccion} onChange={handleInput} required />
                        </div>
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <InputText id="email" value={form.email} onChange={handleInput} required />
                        </div>
                        <div className="field">
                            <label htmlFor="telefono">Teléfono</label>
                            <InputText id="telefono" value={form.telefono} onChange={handleInput} />
                        </div>
                        <Button type="submit" label={loading ? 'Enviando...' : 'Crear Cliente'} disabled={loading} className="mt-2" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormLayoutDemo;
