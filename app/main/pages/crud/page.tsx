/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { classNames } from 'primereact/utils';

type Cliente = {
    cliente_id: number;
    nombre_completo: string;
    direccion: string;
    email: string;
    telefono: string;
};

const API_BASE = 'http://127.0.0.1/microservice-entity/public/api/clientes';

async function apiList(): Promise<Cliente[]> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    const res = await fetch(API_BASE, {
        cache: 'no-store',
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
    });
    if (!res.ok) throw new Error(`GET ${API_BASE} ${res.status}`);
    const data = await res.json();
    return data?.data?.items ?? [];
}

const Crud = () => {
    const emptyCliente: Cliente = { cliente_id: 0, nombre_completo: '', direccion: '', email: '', telefono: '' };
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [clienteDialog, setClienteDialog] = useState(false);
    const [deleteClienteDialog, setDeleteClienteDialog] = useState(false);
    const [deleteClientesDialog, setDeleteClientesDialog] = useState(false);
    const [cliente, setCliente] = useState<Cliente>(emptyCliente);
    const [selectedClientes, setSelectedClientes] = useState<Cliente[] | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef(null);

    const userEmail = typeof window !== 'undefined' ? localStorage.getItem('user_email') ?? '' : '';
    const viewOnlyEmails = ['admin@app.com', 'dev@app.com', 'supervisor@app.com'];
    const isViewOnly = viewOnlyEmails.includes(userEmail);

    useEffect(() => {
        (async () => {
            try {
                const list = await apiList();
                setClientes(list);
            } catch (err) {
                setClientes([]);
            }
        })();
    }, []);

    const openNew = () => {
        setCliente(emptyCliente);
        setSubmitted(false);
        setClienteDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setClienteDialog(false);
    };

    const hideDeleteClienteDialog = () => setDeleteClienteDialog(false);
    const hideDeleteClientesDialog = () => setDeleteClientesDialog(false);

    // Simulación de guardado local (puedes adaptar a tu API POST/PUT)
    const saveCliente = () => {
        setSubmitted(true);
        if (!cliente.nombre_completo.trim() || !cliente.email.trim()) return;
        const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
        if (cliente.cliente_id) {
            // Actualizar (PUT)
            fetch(`${API_BASE}/${cliente.cliente_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                },
                body: JSON.stringify({
                    nombre_completo: cliente.nombre_completo,
                    direccion: cliente.direccion,
                    email: cliente.email,
                    telefono: cliente.telefono
                })
            })
                .then((res) => {
                    if (!res.ok) throw new Error('Error actualizando');
                    toast.current?.show({ severity: 'success', summary: 'Actualizado', detail: 'Cliente actualizado', life: 2500 });
                    return apiList();
                })
                .then((list) => setClientes(list))
                .catch(() => toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar', life: 2500 }));
        } else {
            // Crear (POST)
            fetch(API_BASE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                },
                body: JSON.stringify({
                    nombre_completo: cliente.nombre_completo,
                    direccion: cliente.direccion,
                    email: cliente.email,
                    telefono: cliente.telefono
                })
            })
                .then((res) => {
                    if (!res.ok) throw new Error('Error creando');
                    toast.current?.show({ severity: 'success', summary: 'Creado', detail: 'Cliente creado', life: 2500 });
                    return apiList();
                })
                .then((list) => setClientes(list))
                .catch(() => toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudo crear', life: 2500 }));
        }
        setClienteDialog(false);
        setCliente(emptyCliente);
    };

    const editCliente = (row: Cliente) => {
        setCliente({ ...row });
        setClienteDialog(true);
    };

    const confirmDeleteCliente = (row: Cliente) => {
        setCliente(row);
        setDeleteClienteDialog(true);
    };

    const deleteCliente = () => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
        fetch(`${API_BASE}/${cliente.cliente_id}`, {
            method: 'DELETE',
            headers: {
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            }
        })
            .then((res) => {
                if (!res.ok) throw new Error('Error eliminando');
                toast.current?.show({ severity: 'success', summary: 'Eliminado', detail: 'Cliente eliminado', life: 2500 });
                return apiList();
            })
            .then((list) => setClientes(list))
            .catch(() => toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar', life: 2500 }));
        setDeleteClienteDialog(false);
        setCliente(emptyCliente);
    };

    const confirmDeleteSelected = () => setDeleteClientesDialog(true);

    const deleteSelectedClientes = () => {
        if (!selectedClientes?.length) return;
        setClientes((prev) => (prev ? prev.filter((c) => !selectedClientes.some((s) => s.cliente_id === c.cliente_id)) : prev));
        setSelectedClientes(null);
        setDeleteClientesDialog(false);
        toast.current?.show({ severity: 'success', summary: 'Eliminados', detail: 'Clientes eliminados', life: 2500 });
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: keyof Cliente) => {
        const val = e.target.value;
        setCliente((prev) => ({ ...prev, [name]: val }));
    };

    const onInputNumberChange = (e: InputNumberValueChangeEvent, name: keyof Cliente) => {
        const val = e.value ?? 0;
        setCliente((prev) => ({ ...prev, [name]: val }));
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Clientes</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" value={globalFilter} placeholder="Buscar..." />
            </span>
        </div>
    );

    const idBodyTemplate = (rowData: Cliente) => (
        <>
            <span className="p-column-title">ID</span>
            {rowData.cliente_id}
        </>
    );
    const nombreBodyTemplate = (rowData: Cliente) => (
        <>
            <span className="p-column-title">Nombre</span>
            {rowData.nombre_completo}
        </>
    );
    const emailBodyTemplate = (rowData: Cliente) => (
        <>
            <span className="p-column-title">Email</span>
            {rowData.email}
        </>
    );
    const telefonoBodyTemplate = (rowData: Cliente) => (
        <>
            <span className="p-column-title">Teléfono</span>
            {rowData.telefono}
        </>
    );
    const actionBodyTemplate = (rowData: Cliente) => (
        <>
            <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editCliente(rowData)} />
            <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteCliente(rowData)} />
        </>
    );

    const clienteDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" text onClick={saveCliente} />
        </>
    );
    const deleteClienteDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteClienteDialog} />
            <Button label="Sí" icon="pi pi-check" text onClick={deleteCliente} />
        </>
    );
    const deleteClientesDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteClientesDialog} />
            <Button label="Sí" icon="pi pi-check" text onClick={deleteSelectedClientes} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar
                        className="mb-4"
                        left={
                            !isViewOnly ? (
                                <div className="my-2">
                                    <Button label="Eliminar" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedClientes || !selectedClientes.length} />
                                </div>
                            ) : null
                        }
                    />

                    <DataTable
                        ref={dt}
                        value={clientes.filter((c) => c && typeof c === 'object')}
                        selection={selectedClientes ?? []}
                        onSelectionChange={(e) => setSelectedClientes(e.value)}
                        selectionMode="multiple"
                        dataKey="cliente_id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} clientes"
                        globalFilter={globalFilter}
                        emptyMessage="No hay clientes."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }} />
                        <Column field="cliente_id" header="ID" sortable body={idBodyTemplate} headerStyle={{ minWidth: '6rem' }} />
                        <Column
                            field="nombre_completo"
                            header="Nombre Completo"
                            sortable
                            body={(rowData) => (
                                <>
                                    <span className="p-column-title">Nombre Completo</span>
                                    {rowData.nombre_completo}
                                </>
                            )}
                            headerStyle={{ minWidth: '15rem' }}
                        />
                        <Column
                            field="direccion"
                            header="Dirección"
                            sortable
                            body={(rowData) => (
                                <>
                                    <span className="p-column-title">Dirección</span>
                                    {rowData.direccion}
                                </>
                            )}
                            headerStyle={{ minWidth: '15rem' }}
                        />
                        <Column field="email" header="Email" sortable body={emailBodyTemplate} headerStyle={{ minWidth: '15rem' }} />
                        <Column field="telefono" header="Teléfono" sortable body={telefonoBodyTemplate} headerStyle={{ minWidth: '10rem' }} />
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }} />
                    </DataTable>

                    <Dialog visible={clienteDialog} style={{ width: '450px' }} header="Datos del Cliente" modal className="p-fluid" footer={clienteDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="nombre_completo">Nombre Completo</label>
                            <InputText id="nombre_completo" value={cliente.nombre_completo} onChange={(e) => onInputChange(e, 'nombre_completo')} required autoFocus className={classNames({ 'p-invalid': submitted && !cliente.nombre_completo })} />
                            {submitted && !cliente.nombre_completo && <small className="p-invalid">El nombre completo es requerido.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="direccion">Dirección</label>
                            <InputText id="direccion" value={cliente.direccion} onChange={(e) => onInputChange(e, 'direccion')} required className={classNames({ 'p-invalid': submitted && !cliente.direccion })} />
                            {submitted && !cliente.direccion && <small className="p-invalid">La dirección es requerida.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <InputText id="email" value={cliente.email} onChange={(e) => onInputChange(e, 'email')} required className={classNames({ 'p-invalid': submitted && !cliente.email })} />
                            {submitted && !cliente.email && <small className="p-invalid">El email es requerido.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="telefono">Teléfono</label>
                            <InputText id="telefono" value={cliente.telefono} onChange={(e) => onInputChange(e, 'telefono')} />
                        </div>
                    </Dialog>

                    <Dialog visible={deleteClienteDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteClienteDialogFooter} onHide={hideDeleteClienteDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {cliente && (
                                <span>
                                    ¿Seguro que deseas eliminar a <b>{cliente.nombre_completo}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteClientesDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteClientesDialogFooter} onHide={hideDeleteClientesDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            <span>¿Seguro que deseas eliminar los clientes seleccionados?</span>
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Crud;
