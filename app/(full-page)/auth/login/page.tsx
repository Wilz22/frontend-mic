/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useState, useRef } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const toast = useRef<Toast>(null);
    const { layoutConfig } = useContext(LayoutContext);
    const router = useRouter();
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    const handleLogin = async () => {
        setLoading(true);
        if (toast.current) toast.current.clear();
        try {
            const response = await fetch('http://127.0.0.1/microservice-entity/public/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const result = await response.json();
            if (response.ok && result.data?.access_token) {
                localStorage.setItem('access_token', result.data.access_token);
                localStorage.setItem('user_email', email);
                localStorage.setItem('user_type', result.data.role); // <-- Guarda el rol
                toast.current?.show({
                    severity: 'success',
                    summary: '¡Ingreso exitoso!',
                    detail: 'Bienvenido/a al sistema.',
                    life: 2500
                });
                setTimeout(() => router.push('/main'), 1200);
            } else {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Error de autenticación',
                    detail: 'Credenciales incorrectas. Verifica tu correo y contraseña.',
                    life: 3500
                });
            }
        } catch (err) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error de conexión',
                detail: 'Intenta nuevamente más tarde.',
                life: 3500
            });
        }
        setLoading(false);
    };

    return (
        <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center">
                <div
                    style={{
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
                    }}
                >
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <Toast ref={toast} />
                        <div className="text-center mb-5">
                            <img src="/demo/images/login/avatar.png" alt="Imagen" height="50" className="mb-3" />
                            <div className="text-900 text-3xl font-medium mb-3">¡Bienvenido!</div>
                            <span className="text-600 font-medium">Inicia sesión para continuar</span>
                        </div>

                        <div>
                            <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                                Correo electrónico
                            </label>
                            <InputText id="email1" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo electrónico" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />

                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                Contraseña
                            </label>
                            <Password inputId="password1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" toggleMask className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem" />

                            <div className="flex align-items-center justify-content-between mb-5 gap-5"></div>
                            <Button label={loading ? 'Ingresando...' : 'Iniciar sesión'} className="w-full p-3 text-xl" onClick={handleLogin} disabled={loading} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
