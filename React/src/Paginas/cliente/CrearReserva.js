import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importa axios
import NavBarCliente from '../../components/navBarCliente';
import Footer from '../../components/footer';
import styles from './CrearReserva.module.css'; // Importa los estilos como módulo
import emailjs from 'emailjs-com'; // Importa EmailJS

const CrearReserva = () => {
  const [formData, setFormData] = useState({
    fechaInicio: '',
    fechaFinal: '',
    mascota: '',
    celular: '',
    correo: '',
    estado: 'Por Confirmar'
  });

  const [mascotas, setMascotas] = useState([]); // Estado para almacenar las mascotas
  const [usuarios, setUsuarios] = useState([]); // Estado para almacenar los usuarios
  const [userId, setUserId] = useState(localStorage.getItem('usuarioId')); // Estado para almacenar el ID del usuario

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const response = await axios.get('http://localhost:3002/Mascotas');
        setMascotas(response.data);
      } catch (error) {
        console.error('Error al obtener las mascotas:', error);
      }
    };

    fetchMascotas(); // Llama a la función cuando el componente se monte
  }, []);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:3002/Usuarios');
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    fetchUsuarios(); // Llama a la función cuando el componente se monte
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica que userId esté disponible
    if (!userId) {
      console.error('ID del usuario no encontrado en localStorage');
      alert('ID del usuario no encontrado. Por favor, inicie sesión nuevamente.');
      return;
    }

    const reserva = {
      ...formData,
      usuarioId: userId // Agregar el ID del usuario a la reserva
    };

    try {
      // Enviar solicitud POST para crear reserva
      const response = await axios.post('http://localhost:3002/Reservas', reserva, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) { // Cambiar a 201 si es el código de éxito para creación
        alert('Reserva creada exitosamente');

        // Verifica que el usuario esté en la lista de usuarios
        const usuario = usuarios.find(user => user.id === userId);

        if (!usuario) {
          console.error('Usuario no encontrado');
          alert('Usuario no encontrado. Verifique su sesión.');
          return;
        }

        // Enviar correo electrónico con EmailJS
        const templateParams = {
          to_name: usuario.Nombre,
          from_name: 'Tu Aplicación',
          to_email: usuario.Correo,
          fechaInicio: formData.fechaInicio,
          fechaFinal: formData.fechaFinal,
          mascota: formData.mascota,
          celular: formData.celular,
          correo: formData.correo
        };

        try {
          await emailjs.send(
            'service_91sjn3i', // Reemplaza con tu ID de servicio
            'template_tybdlva', // Reemplaza con tu ID de plantilla
            templateParams,
            'QyL_P2wB9V3Z0clnB' // Reemplaza con tu clave pública
          );
          alert('Correo de confirmación enviado exitosamente');
        } catch (emailError) {
          console.error('Error al enviar el correo:', emailError);
          alert('Error al enviar el correo. Inténtalo de nuevo más tarde.');
        }

        // Limpiar el formulario
        setFormData({
          FechaInicio: '',
          FechaFinal: '',
          Mascota: '',
          Celular: '',
          Correo: ''
        });
      } else {
        console.error('Error al crear la reserva:', response.status);
        alert('Error al crear la reserva. Inténtalo de nuevo más tarde.');
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('Error de red. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div className={styles.pageContainer}>
      <NavBarCliente />
      <div className={styles.container}>
        <h2>Crear Reserva</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="fechaInicio">Fecha de inicio:</label>
              <input 
                type="date" 
                id="fechaInicio" 
                name="fechaInicio" 
                value={formData.FechaInicio}
                onChange={handleChange}
                required 
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="fechaFinal">Fecha de final:</label>
              <input 
                type="date" 
                id="fechaFinal" 
                name="fechaFinal" 
                value={formData.FechaFinal}
                onChange={handleChange}
                required 
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="mascota">Seleccione mascota:</label>
              <select 
                id="mascota" 
                name="mascota" 
                value={formData.Mascota}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione una opción</option>
                {mascotas.map(mascota => (
                  <option key={mascota.id} value={mascota.Nombre}>
                    {mascota.Nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="celular">Celular:</label>
              <input 
                type="tel" 
                id="celular" 
                name="celular" 
                placeholder="Ingrese su número de celular" 
                value={formData.Celular}
                onChange={handleChange}
                required 
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="correo">Correo:</label>
            <input 
              type="email" 
              id="correo" 
              name="correo" 
              placeholder="Ingrese su correo electrónico" 
              value={formData.Correo}
              onChange={handleChange}
              required 
            />
          </div>
          <button type="submit" className={styles.button}>Registrar</button>
        </form>
      </div>
      <Footer className={styles.footer} />
      {/* Botón flotante de WhatsApp */}
      <a href="https://wa.me/1234567890" className="whatsapp-button" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-whatsapp"></i>
      </a>
    </div>
  );
};

export default CrearReserva;
