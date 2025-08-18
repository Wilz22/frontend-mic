'use client';
/* eslint-disable @next/next/no-img-element */
import React, { useContext, useRef, useState } from 'react';
import Link from 'next/link';

import { StyleClass } from 'primereact/styleclass';
import { Button } from 'primereact/button';
import { Ripple } from 'primereact/ripple';
import { Divider } from 'primereact/divider';
import { LayoutContext } from '../layout/context/layoutcontext';
import { NodeRef } from '@/types';
import { classNames } from 'primereact/utils';

const LandingPage = () => {
    const [isHidden, setIsHidden] = useState(false);
    const { layoutConfig } = useContext(LayoutContext);
    const menuRef = useRef<HTMLElement | null>(null);
    const router = require('next/navigation').useRouter();

    const toggleMenuItemClick = () => setIsHidden((prev) => !prev);

    return (
        <div className="surface-0 flex justify-content-center">
            <div id="home" className="landing-wrapper overflow-hidden">
                {/* Topbar */}
                <div className="py-4 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-between relative lg:static">
                    <Link href="/" className="flex align-items-center">
                        <img src={`/layout/images/storybook.svg`} alt="Logo Tienda" height="48" className="mr-2" />
                        <span className="text-900 font-medium text-2xl line-height-3 mr-8">
                            Moda<span className="text-primary-500">Store</span>
                        </span>
                    </Link>

                    <StyleClass nodeRef={menuRef as NodeRef} selector="@next" enterClassName="hidden" leaveToClassName="hidden" hideOnOutsideClick>
                        <i ref={menuRef} className="pi pi-bars text-3xl cursor-pointer block lg:hidden text-700" aria-label="Abrir menú"></i>
                    </StyleClass>

                    <div className={classNames('align-items-center surface-0 flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full left-0 px-6 lg:px-0 z-2', { hidden: isHidden })} style={{ top: '100%' }}>
                        {/* Nav */}
                        <ul className="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row">
                            <li>
                                <a href="#home" onClick={toggleMenuItemClick} className="p-ripple flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3">
                                    <span>Inicio</span>
                                    <Ripple />
                                </a>
                            </li>
                            <li>
                                <a href="#collections" onClick={toggleMenuItemClick} className="p-ripple flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3">
                                    <span>Colecciones</span>
                                    <Ripple />
                                </a>
                            </li>
                            <li>
                                <a href="#features" onClick={toggleMenuItemClick} className="p-ripple flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3">
                                    <span>Beneficios</span>
                                    <Ripple />
                                </a>
                            </li>
                            <li>
                                <a href="#highlights" onClick={toggleMenuItemClick} className="p-ripple flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3">
                                    <span>Destacados</span>
                                    <Ripple />
                                </a>
                            </li>
                        </ul>

                        {/* Actions */}
                        <div className="flex gap-3 lg:block border-top-1 lg:border-top-none surface-border py-3 lg:py-0 mt-3 lg:mt-0">
                            <Button label="Iniciar Sesión" rounded className="border-none font-light line-height-2 bg-primary text-white" onClick={() => router.push('/auth/login')} />
                        </div>
                    </div>
                </div>

                {/* Hero */}
                <div
                    id="hero"
                    className="flex flex-column pt-4 px-4 lg:px-8 overflow-hidden"
                    style={{
                        background: 'linear-gradient(0deg, rgba(255,255,255,.35), rgba(255,255,255,.35)), radial-gradient(90% 200% at 80% 20%, #FFE3EC 0%, #D6E8FF 60%, #FFFFFF 100%)',
                        clipPath: 'ellipse(150% 87% at 93% 13%)'
                    }}
                >
                    <div className="mx-4 md:mx-8 mt-1 md:mt-4">
                        <h1 className="text-6xl font-bold text-gray-900 line-height-2">
                            <span className="font-light block">Nueva Temporada</span>Primavera–Verano 2025
                        </h1>
                        <p className="font-normal text-2xl line-height-3 md:mt-3 text-gray-700">Prendas esenciales, telas frescas y colores tendencia. Envíos a todo el país y cambios sin complicaciones.</p>
                        <div className="flex flex-wrap gap-3 mt-3">
                            <Button type="button" label="Comprar ahora" rounded className="text-xl border-none bg-primary font-normal line-height-3 px-3 text-white" onClick={() => router.push('/shop')} />
                            <Button type="button" label="Ver colecciones" rounded outlined className="text-xl line-height-3 px-3" onClick={() => router.push('/collections')} />
                        </div>
                    </div>
                    <div className="flex justify-content-center md:justify-content-end">
                        {/* Reemplaza la imagen por un banner de moda propio */}
                        <img src="/demo/images/landing/screen-2.png" alt="Colección de moda" className="w-9 md:w-auto" />
                    </div>
                </div>

                {/* Collections quick links */}
                <div id="collections" className="py-4 px-4 lg:px-8 mt-5 mx-0 lg:mx-8">
                    <div className="grid">
                        <div className="col-12 text-center mt-4 mb-4">
                            <h2 className="text-900 font-normal mb-2">Compra por categoría</h2>
                            <span className="text-600 text-2xl">Encuentra tu estilo</span>
                        </div>

                        {[
                            { title: 'Mujer', href: '/collections/women', bg: 'bg-pink-100', icon: 'pi pi-heart' },
                            { title: 'Hombre', href: '/collections/men', bg: 'bg-blue-100', icon: 'pi pi-user' },
                            { title: 'Accesorios', href: '/collections/accessories', bg: 'bg-yellow-100', icon: 'pi pi-sparkles' },
                            { title: 'Calzado', href: '/collections/shoes', bg: 'bg-teal-100', icon: 'pi pi-compass' }
                        ].map((c, i) => (
                            <div key={i} className="col-12 sm:col-6 lg:col-3 p-2">
                                <div className="p-3 surface-card h-full flex flex-column justify-content-between" style={{ borderRadius: '10px' }}>
                                    <div className={classNames('flex align-items-center justify-content-center mb-3', c.bg)} style={{ width: '3.5rem', height: '3.5rem', borderRadius: '10px' }}>
                                        <i className={`${c.icon} text-2xl text-700`}></i>
                                    </div>
                                    <h5 className="mb-2 text-900">{c.title}</h5>
                                    <span className="text-600">Explora lo más nuevo</span>
                                    <Button label="Ver" className="mt-3" text onClick={() => router.push(c.href)} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Store features (benefits) */}
                <div id="features" className="py-4 px-4 lg:px-8 mt-2 mx-0 lg:mx-8">
                    <div className="grid justify-content-center">
                        <div className="col-12 text-center mt-6 mb-4">
                            <h2 className="text-900 font-normal mb-2">Por qué comprar en ModaStore</h2>
                            <span className="text-600 text-2xl">Beneficios pensados para ti</span>
                        </div>

                        {[
                            { iconBg: 'bg-teal-200', icon: 'pi pi-truck', title: 'Envío rápido', text: '24–72h a todo el país.' },
                            { iconBg: 'bg-cyan-200', icon: 'pi pi-refresh', title: 'Cambios fáciles', text: '30 días para cambios.' },
                            { iconBg: 'bg-yellow-200', icon: 'pi pi-credit-card', title: 'Pagos seguros', text: 'Tarjeta, transferencia o contraentrega.' },
                            { iconBg: 'bg-purple-200', icon: 'pi pi-shield', title: 'Compra protegida', text: 'Devolución si algo sale mal.' },
                            { iconBg: 'bg-orange-200', icon: 'pi pi-star', title: 'Calidad verificada', text: 'Miles de reseñas 5★.' },
                            { iconBg: 'bg-blue-200', icon: 'pi pi-tags', title: 'Ofertas semanales', text: 'Descuentos y cupones.' }
                        ].map((f, i) => (
                            <div key={i} className="col-12 md:col-6 lg:col-4 p-2">
                                <div className="p-3 surface-card h-full" style={{ borderRadius: '10px' }}>
                                    <div className={classNames('flex align-items-center justify-content-center mb-3', f.iconBg)} style={{ width: '3.5rem', height: '3.5rem', borderRadius: '10px' }}>
                                        <i className={`${f.icon} text-2xl text-700`}></i>
                                    </div>
                                    <h5 className="mb-2 text-900">{f.title}</h5>
                                    <span className="text-600">{f.text}</span>
                                </div>
                            </div>
                        ))}

                        {/* Testimonial / Promo */}
                        <div
                            className="col-12 mt-6 mb-8 p-3 md:p-6"
                            style={{
                                borderRadius: '20px',
                                background: 'linear-gradient(0deg, rgba(255,255,255,0.75), rgba(255,255,255,0.75)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, #FAD7E0 0%, #CBE1FF 100%)'
                            }}
                        >
                            <div className="flex flex-column md:flex-row justify-content-between align-items-center text-center md:text-left gap-3">
                                <div>
                                    <h3 className="text-gray-900 mb-2">Suscríbete y obtén 10% OFF</h3>
                                    <span className="text-gray-700 text-lg">Para tu primera compra en ModaStore</span>
                                </div>
                                <div className="flex gap-2">
                                    <Button label="Crear cuenta" rounded className="bg-primary border-none text-white" onClick={() => router.push('/auth/register')} />
                                    <Button label="Ver términos" rounded text onClick={() => router.push('/legal/terminos')} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Highlights */}
                <div id="highlights" className="py-4 px-4 lg:px-8 mx-0 my-6 lg:mx-8">
                    <div className="text-center">
                        <h2 className="text-900 font-normal mb-2">Compra donde estés</h2>
                        <span className="text-600 text-2xl">Web rápida, catálogo actualizado y seguimiento de pedidos</span>
                    </div>

                    <div className="grid mt-5 pb-2 md:pb-6">
                        <div className="flex justify-content-center col-12 lg:col-6 bg-purple-100 p-0 flex-order-1 lg:flex-order-0" style={{ borderRadius: '8px' }}>
                            <img src="/demo/images/landing/mockup.svg" className="w-11" alt="App móvil ModaStore" />
                        </div>

                        <div className="col-12 lg:col-6 my-auto flex flex-column lg:align-items-end text-center lg:text-right">
                            <div className="flex align-items-center justify-content-center bg-purple-200 align-self-center lg:align-self-end" style={{ width: '4.2rem', height: '4.2rem', borderRadius: '10px' }}>
                                <i className="pi pi-mobile text-5xl text-purple-700"></i>
                            </div>
                            <h2 className="line-height-1 text-900 text-4xl font-normal mt-3">Catálogo en tu bolsillo</h2>
                            <span className="text-700 text-2xl line-height-3 ml-0 md:ml-2" style={{ maxWidth: '650px' }}>
                                Guarda favoritos, recibe alertas de precio y sigue tu envío en tiempo real.
                            </span>
                        </div>
                    </div>

                    <div className="grid my-6 pt-2 md:pt-6">
                        <div className="col-12 lg:col-6 my-auto flex flex-column text-center lg:text-left lg:align-items-start">
                            <div className="flex align-items-center justify-content-center bg-yellow-200 align-self-center lg:align-self-start" style={{ width: '4.2rem', height: '4.2rem', borderRadius: '10px' }}>
                                <i className="pi pi-desktop text-5xl text-yellow-700"></i>
                            </div>
                            <h2 className="line-height-1 text-900 text-4xl font-normal mt-3">Experiencia ultra rápida</h2>
                            <span className="text-700 text-2xl line-height-3 mr-0 md:mr-2" style={{ maxWidth: '650px' }}>
                                Navegación fluida, filtros por talla/color y recomendaciones personalizadas.
                            </span>
                        </div>

                        <div className="flex justify-content-end flex-order-1 sm:flex-order-2 col-12 lg:col-6 bg-yellow-100 p-0" style={{ borderRadius: '8px' }}>
                            <img src="/demo/images/landing/mockup-desktop.svg" className="w-11" alt="Sitio web ModaStore" />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="py-4 px-4 mx-0 mt-8 lg:mx-8">
                    <div className="grid justify-content-between">
                        <div className="col-12 md:col-2 flex content-end" style={{ marginTop: '-1.5rem' }}>
                            <Link href="/" className="flex flex-wrap align-items-center justify-content-center md:justify-content-start md:mb-0 mb-3 cursor-pointer">
                                <img src={`/layout/images/storybook.svg`} alt="ModaStore" width="50" height="50" className="mr-2" />
                                <span className="font-medium text-3xl text-900">
                                    Moda<span className="text-primary-500">Store</span>
                                </span>
                            </Link>
                        </div>

                        <div className="col-12 md:col-10 lg:col-7">
                            <div className="grid text-center md:text-left">
                                <div className="col-12 md:col-3 mt-4 md:mt-0">
                                    <h4 className="font-medium line-height-3 mb-3 text-900">Tienda</h4>
                                    <Link href="/shop" className="block mb-2 text-700 line-height-3">
                                        Catálogo
                                    </Link>
                                    <Link href="/ofertas" className="block mb-2 text-700 line-height-3">
                                        Ofertas
                                    </Link>
                                    <Link href="/novedades" className="block text-700 line-height-3">
                                        Novedades
                                    </Link>
                                </div>

                                <div className="col-12 md:col-3 mt-4 md:mt-0">
                                    <h4 className="font-medium line-height-3 mb-3 text-900">Ayuda</h4>
                                    <Link href="/ayuda/envios" className="block mb-2 text-700 line-height-3">
                                        Envíos
                                    </Link>
                                    <Link href="/ayuda/cambios" className="block mb-2 text-700 line-height-3">
                                        Cambios y devoluciones
                                    </Link>
                                    <Link href="/ayuda/contacto" className="block text-700 line-height-3">
                                        Contacto
                                    </Link>
                                </div>

                                <div className="col-12 md:col-3 mt-4 md:mt-0">
                                    <h4 className="font-medium line-height-3 mb-3 text-900">Nosotros</h4>
                                    <Link href="/about" className="block mb-2 text-700 line-height-3">
                                        Historia
                                    </Link>
                                    <Link href="/sustentabilidad" className="block mb-2 text-700 line-height-3">
                                        Sustentabilidad
                                    </Link>
                                    <Link href="/trabaja-con-nosotros" className="block text-700 line-height-3">
                                        Trabaja con nosotros
                                    </Link>
                                </div>

                                <div className="col-12 md:col-3 mt-4 md:mt-0">
                                    <h4 className="font-medium line-height-3 mb-3 text-900">Legal</h4>
                                    <Link href="/legal/privacidad" className="block mb-2 text-700 line-height-3">
                                        Política de Privacidad
                                    </Link>
                                    <Link href="/legal/terminos" className="block text-700 line-height-3">
                                        Términos de Servicio
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Divider className="my-4" />
                    <div className="text-center text-600 text-sm">© {new Date().getFullYear()} ModaStore. Todos los derechos reservados.</div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
