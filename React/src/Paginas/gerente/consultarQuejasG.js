import React, { useState, useEffect } from 'react';
import NavBar from '../../components/navBarGerente'; // O el componente del empleado
import Footer from '../../components/footer';
import axios from 'axios';
import Swal from 'sweetalert2';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 90%;
  margin: 0 auto;
  padding: 20px;
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  border-bottom: 2px solid #ddd;
  padding: 12px;
  background-color: #f4f4f4;
`;

const Td = styled.td`
  border-bottom: 1px solid #ddd;
  padding: 12px;
`;

const Icon = styled.i`
  cursor: pointer;
  font-size: 20px;
  color: #007bff;

  &:hover {
    color: #0056b3;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 16px;
  resize: vertical;
  margin-bottom: 10px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  justify-content: center;

  label {
    display: flex;
    flex-direction: column;
    font-weight: bold;
  }

  input, select {
    margin-top: 5px;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
    font-size: 16px;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: #007bff;
      outline: none;
    }
  }
`;

const ConsultarQuejasG = () => {
  const [quejas, setQuejas] = useState([]);
  const [filteredQuejas, setFilteredQuejas] = useState([]);
  const [mostrarQueja, setMostrarQueja] = useState(null);
  const [respuestas, setRespuestas] = useState({});
  const [fechaFiltro, setFechaFiltro] = useState('');
  const [respondidaFiltro, setRespondidaFiltro] = useState('');

  useEffect(() => {
    const fetchQuejas = async () => {
      try {
        const response = await axios.get('http://localhost:3002/Quejas/');
        setQuejas(response.data);
        setFilteredQuejas(response.data);
      } catch (error) {
        console.error('Error al obtener las quejas:', error);
      }
    };

    fetchQuejas();
  }, []);

  useEffect(() => {
    const aplicarFiltros = () => {
      let resultado = quejas;

      if (fechaFiltro) {
        resultado = resultado.filter(queja => queja.fecha.includes(fechaFiltro));
      }

      if (respondidaFiltro) {
        resultado = resultado.filter(queja => (respondidaFiltro === 'respondida' ? queja.Respuesta : !queja.Respuesta));
      }

      setFilteredQuejas(resultado);
    };

    aplicarFiltros();
  }, [fechaFiltro, respondidaFiltro, quejas]);

  const toggleQueja = (index) => {
    setMostrarQueja(mostrarQueja === index ? null : index);
  };

  const handleRespuestaChange = (id, value) => {
    setRespuestas({ ...respuestas, [id]: value });
  };

  const enviarRespuesta = async (queja) => {
    if (queja.Respuesta) {
      Swal.fire({
        icon: 'warning',
        title: 'La queja ya ha sido respondida',
        text: 'No se puede responder nuevamente.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    try {
      await axios.post(`http://localhost:3002/Quejas/${queja.id}/responder`, { respuesta: respuestas[queja.id] });
      
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Respuesta enviada',
        showConfirmButton: false,
        timer: 1500
      });

      const nuevasQuejas = filteredQuejas.map(q => q.id === queja.id ? { ...q, Respuesta: respuestas[queja.id] } : q);
      setFilteredQuejas(nuevasQuejas);
    } catch (error) {
      console.error('Error al enviar la respuesta:', error);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Error al enviar respuesta',
        text: 'Hubo un problema al enviar la respuesta.',
        showConfirmButton: true
      });
    }
  };

  return (
    <div>
      <NavBar />
      <Container>
        <h2>Quejas</h2>
        <p>Estas son las últimas quejas registradas en el sistema</p>
        <FilterContainer>
          <label>
            Fecha:
            <input 
              type="date" 
              value={fechaFiltro} 
              onChange={(e) => setFechaFiltro(e.target.value)} 
            />
          </label>
          <label>
            Estado:
            <select 
              value={respondidaFiltro} 
              onChange={(e) => setRespondidaFiltro(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="respondida">Respondidas</option>
              <option value="noRespondida">No Respondidas</option>
            </select>
          </label>
        </FilterContainer>
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <Th>Fecha</Th>
                <Th>Hora</Th>
                <Th>Nombre</Th>
                <Th>Correo</Th>
                <Th>Acción</Th>
              </tr>
            </thead>
            <tbody>
              {filteredQuejas.map((queja, index) => (
                <React.Fragment key={queja.id}>
                  <tr>
                    <Td>{queja.fecha}</Td>
                    <Td>{queja.hora}</Td>
                    <Td>{queja.nombre}</Td>
                    <Td>{queja.correo}</Td>
                    <Td>
                      <Icon
                        className={`fa-solid ${mostrarQueja === index ? 'fa-eye-slash' : 'fa-eye'}`}
                        onClick={() => toggleQueja(index)}
                      />
                    </Td>
                  </tr>
                  {mostrarQueja === index && (
                    <tr>
                      <Td colSpan={6}>
                        <div className="consultarQuejasG-queja-content">
                          <p>{queja.texto}</p>
                          {queja.Respuesta ? (
                            <p><strong>Respuesta:</strong> {queja.Respuesta}</p>
                          ) : (
                            <div className="consultarQuejasG-response-section">
                              <TextArea 
                                placeholder="Escribe tu respuesta aquí..."
                                value={respuestas[queja.id] || ''}
                                onChange={(e) => handleRespuestaChange(queja.id, e.target.value)}
                                disabled={!!queja.Respuesta}
                              />
                              <Button 
                                onClick={() => enviarRespuesta(queja)}
                                disabled={!!queja.Respuesta}
                              >
                                {queja.Respuesta ? 'Respondida' : 'Enviar Respuesta'}
                              </Button>
                            </div>
                          )}
                        </div>
                      </Td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </Container>
      <Footer />
    </div>
  );
};

export default ConsultarQuejasG;
