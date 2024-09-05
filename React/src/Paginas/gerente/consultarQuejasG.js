import React, { useState, useEffect } from 'react';
import NavBar from '../../components/navBarGerente';
import Footer from '../../components/footer';
import './consultarQuejasG.css';
import axios from 'axios';

const ConsultarQuejasG = () => {
  const [quejas, setQuejas] = useState([]);
  const [mostrarQueja, setMostrarQueja] = useState(null);

  useEffect(() => {
    const fetchQuejas = async () => {
      try {
        const response = await axios.get('http://localhost:3002/Quejas/');
        setQuejas(response.data);
      } catch (error) {
        console.error('Error al obtener las quejas:', error);
      }
    };

    fetchQuejas();
  }, []);

  const toggleQueja = (index) => {
    setMostrarQueja(mostrarQueja === index ? null : index);
  };

  return (
    <div>
      <NavBar />
      <div className="consultarQuejasG-container">
        <h2>Quejas</h2>
        <p>Estas son las últimas quejas registradas en el sistema</p>
        <div className="consultarQuejasG-table-container">
          <table className="consultarQuejasG-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {quejas.map((queja, index) => (
                <React.Fragment key={queja.id}>
                  <tr>
                    <td>{queja.fecha}</td>
                    <td>{queja.hora}</td>
                    <td>{queja.nombre}</td>
                    <td>{queja.correo}</td>
                    <td>
                      <button 
                        className="consultarQuejasG-button-primary" 
                        onClick={() => toggleQueja(index)}
                      >
                        {mostrarQueja === index ? 'Ocultar' : 'Ver'}
                      </button>
                    </td>
                  </tr>
                  {mostrarQueja === index && (
                    <tr>
                      <td colSpan={6}>
                        <div className="consultarQuejasG-queja-content">
                          <p>{queja.texto}</p>
                          <div className="consultarQuejasG-response-section">
                            <textarea 
                              className="consultarQuejasG-textarea" 
                              placeholder="Escribe tu respuesta aquí..." 
                            />
                            <button className="consultarQuejasG-button">Enviar Respuesta</button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ConsultarQuejasG;
