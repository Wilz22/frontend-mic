/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { AppMenuItem } from '@/types';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    let userEmail = '';
    if (typeof window !== 'undefined') {
        userEmail = localStorage.getItem('user_email') || '';
    }

    let model: AppMenuItem[] = [];
    if (userEmail === 'supervisor@app.com') {
        model = [
            {
                label: 'Menú',
                icon: 'pi pi-fw pi-briefcase',
                to: '/pages',
                items: [
                    {
                        label: 'Clientes',
                        icon: 'pi pi-fw pi-pencil',
                        to: '/main/pages/crud'
                    }
                ]
            }
        ];
    } else {
        model = [
            {
                label: 'Home',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/main' }]
            },
            {
                label: 'Menú',
                icon: 'pi pi-fw pi-briefcase',
                to: '/pages',
                items: [
                    {
                        label: 'Ingreso Clientes',
                        icon: 'pi pi-fw pi-id-card',
                        to: '/main/uikit/formlayout'
                    },
                    {
                        label: 'Clientes',
                        icon: 'pi pi-fw pi-pencil',
                        to: '/main/pages/crud'
                    }
                ]
            }
        ];
    }

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
