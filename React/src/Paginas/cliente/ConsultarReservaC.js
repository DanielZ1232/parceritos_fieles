import React, { useState, useEffect } from 'react';
import NavBarCliente from '../../components/navBarCliente';
import Footer from '../../components/footer';
import styles from './ConsultarReservaC.module.css'; // Importa los estilos como módulo

const ConsultarReservaC = () => {
  const [reservas, setReservas] = useState([]);
  const [filteredReservas, setFilteredReservas] = useState([]);
  const [filterDate, setFilterDate] = useState(''); // Estado para la fecha de filtro
  const userId = localStorage.getItem('usuarioId'); // Obtener el ID del usuario

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await fetch('http://localhost:3002/Reservas');
        if (response.ok) {
          const reservasData = await response.json();
          // Filtra las reservas para mostrar solo las del usuario autenticado
          const userReservas = reservasData.filter(reserva => reserva.usuarioId === userId);
          setReservas(userReservas);
          setFilteredReservas(userReservas); // Inicialmente, muestra todas las reservas del usuario
        } else {
          console.error('Error al obtener las reservas:', response.status);
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    fetchReservas(); // Llama a la función cuando el componente se monte
  }, [userId]);

  const handleCancel = async (id) => {
    try {
      const response = await fetch(`http://localhost:3002/Reservas/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setReservas(reservas.filter(reserva => reserva.id !== id));
        setFilteredReservas(filteredReservas.filter(reserva => reserva.id !== id));
      } else {
        console.error('Error al cancelar la reserva:', response.status);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setFilterDate(selectedDate);

    // Filtra las reservas por la fecha seleccionada
    if (selectedDate) {
      const filtered = reservas.filter(reserva => reserva.fechaInicio === selectedDate);
      setFilteredReservas(filtered);
    } else {
      setFilteredReservas(reservas); // Si no hay fecha seleccionada, muestra todas las reservas
    }
  };

  return (
    <div className={styles.pageContainer}>
      <NavBarCliente />
      <div className={styles.container}>
        <h2>Mis Reservas</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Fecha Inicio</th>
              <th>Fecha Final</th>
              <th>Celular</th>
              <th>Correo</th>
              <th>Mascota</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservas.map(reserva => (
              <tr key={reserva.id}>
                <td>{reserva.fechaInicio}</td>
                <td>{reserva.fechaFinal}</td>
                <td>{reserva.celular}</td>
                <td>{reserva.correo}</td>
                <td>{reserva.mascota}</td>
                <td>{reserva.estado || 'Por Confirmar'}</td>
                <td>
                  <button 
                    className={styles.cancelButton} 
                    onClick={() => handleCancel(reserva.id)}
                  >
                    Cancelar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Filtro por fecha */}
        <div className={styles.filterContainer}>
          <label htmlFor="filterDate">Filtrar por fecha:</label>
          <input 
            type="date" 
            id="filterDate" 
            value={filterDate}
            onChange={handleDateChange}
          />
        </div>
      </div>
      <Footer className={styles.footer} />
      {/* Botón flotante de WhatsApp */}
      <a href="https://wa.me/1234567890" className="whatsapp-button" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-whatsapp"></i>
      </a>
    </div>
  );
};

export default ConsultarReservaC;
