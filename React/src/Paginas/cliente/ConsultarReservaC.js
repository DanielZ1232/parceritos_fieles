import React, { useState, useEffect } from 'react';
import NavBarCliente from '../../components/navBarCliente';
import Footer from '../../components/footer';
import styles from './ConsultarReservaC.module.css'; // Importa los estilos como módulo
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ConsultarReservaC = () => {
  const [reservas, setReservas] = useState([]);
  const [filteredReservas, setFilteredReservas] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [availableDates, setAvailableDates] = useState([]); // Estado para fechas disponibles
  const userId = localStorage.getItem('usuarioId');

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await fetch('http://localhost:3002/Reservas');
        if (response.ok) {
          const reservasData = await response.json();
          const userReservas = reservasData.filter(reserva => reserva.usuarioId === userId);
          setReservas(userReservas);
          setFilteredReservas(userReservas);

          // Extrae las fechas únicas de las reservas para el filtro
          const dates = Array.from(new Set(userReservas.map(reserva => reserva.fechaInicio)));
          setAvailableDates(dates);
        } else {
          console.error('Error al obtener las reservas:', response.status);
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    fetchReservas();
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

    if (selectedDate && availableDates.includes(selectedDate)) {
      const filtered = reservas.filter(reserva => reserva.fechaInicio === selectedDate);
      setFilteredReservas(filtered);
    } else {
      setFilteredReservas(reservas); // Si no hay fecha seleccionada o fecha no válida, muestra todas las reservas
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
                  <FontAwesomeIcon 
                    icon={faTimes} 
                    size="lg" 
                    className={styles.cancelIcon} 
                    onClick={() => handleCancel(reserva.id)}
                  />
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
            min={availableDates.length > 0 ? availableDates[0] : ''} // Establece la fecha mínima disponible
          />
        </div>
      </div>
      <Footer className={styles.footer} />
      {/* Botón flotante de WhatsApp */}
      <a href="https://wa.me/1234567890" className={styles.whatsappButton} target="_blank" rel="noopener noreferrer">
        <i className="fab fa-whatsapp"></i>
      </a>
    </div>
  );
};

export default ConsultarReservaC;
