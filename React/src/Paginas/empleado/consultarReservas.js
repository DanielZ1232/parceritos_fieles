import React, { useEffect, useState } from 'react';
import NavBarEmpleado from '../../components/navBarEmpleado';
import Footer from '../../components/footer';
import styled from 'styled-components';
import axios from 'axios';
import { MdCheckCircle } from 'react-icons/md'; // Importa el icono

const Container = styled.div`
  max-width: 90%;
  margin: 0 auto;
  padding: 20px;
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
`;

const FilterSelect = styled.select`
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ddd;
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
  background-color: ${(props) => (props.disabled ? '#ccc' : '#1cab1f')};
  color: #fff;
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  
  &:hover {
    background-color: ${(props) => (props.disabled ? '#ccc' : '#156d27')};
  }
`;

const Icon = styled.div`
  font-size: 20px;
`;

const ConsultarReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [filtro, setFiltro] = useState('todos');

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const respuesta = await axios.get('http://localhost:3002/Reservas/');
        setReservas(respuesta.data);
      } catch (error) {
        console.error('Error al obtener las reservas:', error);
      }
    };

    fetchReservas();
  }, []);

  const confirmarReserva = async (index) => {
    const reserva = reservas[index];
    const nuevaReserva = { ...reserva, estado: 'Confirmada' };

    try {
      await axios.put(`http://localhost:3002/Reservas/${reserva.id}`, nuevaReserva);
      const nuevasReservas = reservas.map((reserva, i) =>
        i === index ? nuevaReserva : reserva
      );
      setReservas(nuevasReservas);
    } catch (error) {
      console.error('Error al confirmar la reserva:', error);
    }
  };

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value);
  };

  const reservasFiltradas = reservas.filter((reserva) =>
    filtro === 'todos' ? true : reserva.estado === filtro
  );

  return (
    <div>
      <NavBarEmpleado />
      <Container>
        <h2>Reservas</h2>
        <p>Estas son las últimas reservas que has hecho</p>
        <FilterContainer>
          <FilterSelect value={filtro} onChange={handleFiltroChange}>
            <option value="todos">Todos</option>
            <option value="Por Confirmar">Por confirmar</option>
            <option value="Confirmada">Confirmada</option>
            <option value="Asistida">Asistida</option>
            <option value="Cancelada">Cancelada</option>
          </FilterSelect>
        </FilterContainer>
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <Th>Fecha de inicio</Th>
                <Th>Fecha de final</Th>
                <Th>Celular</Th>
                <Th>Correo</Th>
                <Th>Estado</Th>
                <Th></Th>
              </tr>
            </thead>
            <tbody>
              {reservasFiltradas.map((reserva, index) => (
                <tr key={reserva.id}>
                  <Td>{reserva.fechaInicio}</Td>
                  <Td>{reserva.fechaFinal}</Td>
                  <Td>{reserva.celular}</Td>
                  <Td>{reserva.correo}</Td>
                  <Td>{reserva.estado}</Td>
                  <Td>
                    <Button
                      onClick={() => confirmarReserva(index)}
                      disabled={reserva.estado !== 'Por Confirmar'}
                    >
                      <Icon>
                        {reserva.estado === 'Confirmada' ? (
                          <MdCheckCircle />
                        ) : (
                          <MdCheckCircle />
                        )}
                      </Icon>
                    </Button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </Container>
      <Footer />
    </div>
  );
};

export default ConsultarReservas;
