import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; // Importa SweetAlert2
import './MenuGerente.css'; 
import NavBarGerente from "../../components/navBarGerente";
import Footer from '../../components/footer';

const MenuGerente = () => {
    const [empleados, setEmpleados] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [showClienteSearch, setShowClienteSearch] = useState(false);
    const [documentoBusqueda, setDocumentoBusqueda] = useState('');
    const [clienteEncontrado, setClienteEncontrado] = useState(null);

    useEffect(() => {
        // Fetch empleados
        fetch('http://localhost:3002/Usuarios/')
            .then(response => response.json())
            .then(data => setEmpleados(data))
            .catch(error => console.error('Error fetching employees:', error));

        // Fetch clientes
        fetch('http://localhost:3002/Usuarios')
            .then(response => response.json())
            .then(data => setClientes(data))
            .catch(error => console.error('Error fetching clients:', error));
    }, []);

    const handleAgregarEmpleadoClick = () => {
        setShowClienteSearch(true);
    };

    const handleBuscarCliente = () => {
        const cliente = clientes.find(cliente => cliente.NumeroDocumento === documentoBusqueda);
        setClienteEncontrado(cliente);
    };

    const handleCambioRol = (clienteId) => {
        const cliente = clientes.find(c => c.id === clienteId);
    
        if (cliente) {
            fetch(`http://localhost:3002/Usuarios/${clienteId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...cliente,
                    Rol: 'Empleado'  // Aquí cambiamos el rol a "Empleado"
                }),
            })
            .then(response => response.json())
            .then(updatedCliente => {
                setEmpleados([...empleados, updatedCliente]);
                setClientes(clientes.filter(c => c.id !== clienteId));
                setClienteEncontrado(null);
                setDocumentoBusqueda('');
                setShowClienteSearch(false);

                // Mostrar la notificación de éxito
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Empleado agregado exitosamente",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
                console.error('Error changing role:', error);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Error al agregar empleado",
                    showConfirmButton: false,
                    timer: 1500
                });
            });
        } else {
            console.error('Cliente no encontrado');
        }
    };

    const handleCloseModal = () => {
        setShowClienteSearch(false);
        setClienteEncontrado(null);
        setDocumentoBusqueda('');
    };

    return (
        <div>
            <NavBarGerente />
            <div className="menu-gerente-container">
                <div className="bienvenido-text">Bienvenido Gerente</div>
            </div>
            <div className="equipo-container">
                <h2>¡Tu Equipo!</h2>
                <p>Las personas que hacen que todo suceda</p>
                <div className="empleados-grid">
                    {empleados.filter(empleado => empleado.Rol === 'Empleado').map((empleado) => (
                        <div key={empleado.id} className="empleado-card">
                            <h3 className='emp'>{empleado.Nombre}</h3>
                            <p>{empleado.Rol}</p>
                        </div>
                    ))}
                </div>
                <button className="agregar-empleado-btn" onClick={handleAgregarEmpleadoClick}>
                    + Agregar Empleado
                </button>
                {showClienteSearch && (
                    <div className="cliente-search-modal">
                        <div className="close-modal-icon" onClick={handleCloseModal}>×</div>
                        <h3 className="buscar-cliente-titulo">Buscar Cliente para Agregar</h3>
                        <input
                            type="text"
                            placeholder="Número de Documento"
                            value={documentoBusqueda}
                            onChange={(e) => setDocumentoBusqueda(e.target.value)}
                        />
                        <button className="buscar-btn" onClick={handleBuscarCliente}>Buscar</button>
                        {clienteEncontrado && (
                            <div className="cliente-found">
                                <p>{clienteEncontrado.Nombre} {clienteEncontrado.Apellido}</p>
                                <button 
                                    className="cambiar-rol-btn" 
                                    onClick={() => handleCambioRol(clienteEncontrado.id)}>
                                    Cambiar a Empleado
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default MenuGerente;
