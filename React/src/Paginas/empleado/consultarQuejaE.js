import React, { useState, useEffect } from 'react';
import NavBar from '../../components/navBarEmpleado';
import Footer from '../../components/footer';
import styled from 'styled-components';
import axios from 'axios';

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

const Button = styled.button`
  background-color: ${(props) => (props.primary ? '#007bff' : '#28a745')};
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.primary ? '#0056b3' : '#218838')};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 16px;
  resize: vertical; /* Allows vertical resizing */
  margin-bottom: 10px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const QuejaContent = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ResponseSection = styled.div`
  margin-top: 20px;
`;

const ConsultarQuejaE = () => {
  const [quejas, setQuejas] = useState([]);
  const [mostrarQueja, setMostrarQueja] = useState(null);

  useEffect(() => {
    const fetchQuejas = async () => {
      try {
        const response = await axios.get('http://localhost:3002/Quejas/'); // Cambia esta URL por la de tu API
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
      <Container>
        <h2>Quejas</h2>
        <p>Estas son las últimas quejas registradas en el sistema</p>
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
              {quejas.map((queja, index) => (
                <React.Fragment key={queja.id}>
                  <tr>
                    <Td>{queja.fecha}</Td>
                    <Td>{queja.hora}</Td>
                    <Td>{queja.nombre}</Td>
                    <Td>{queja.correo}</Td>
                    <Td>
                      <Button primary onClick={() => toggleQueja(index)}>
                        {mostrarQueja === index ? 'Ocultar' : 'Ver'}
                      </Button>
                    </Td>
                  </tr>
                  {mostrarQueja === index && (
                    <tr>
                      <Td colSpan={6}>
                        <QuejaContent>
                          <p>{queja.texto}</p>
                          <ResponseSection>
                            <TextArea placeholder="Escribe tu respuesta aquí..." />
                            <Button>Enviar Respuesta</Button>
                          </ResponseSection>
                        </QuejaContent>
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

export default ConsultarQuejaE;
