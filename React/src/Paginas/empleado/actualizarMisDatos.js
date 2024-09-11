import React, { useEffect, useState } from 'react';
import NavBar from '../../components/navBarEmpleado';
import Footer from '../../components/footer';
import axios from 'axios';
import styled from 'styled-components';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Container = styled.div`
  font-family: Arial, sans-serif;
  max-width: 60%;
  margin: 0 auto;
  padding: 20px;
`;

const FormSection = styled.div`
  background: #f4f4f4;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }

  input[disabled] {
    background: #e9ecef;
  }

  .password-container {
    position: relative;
    display: flex;
    align-items: center;
  }

  .password-container input {
    padding-right: 40px;
  }

  .password-container .eye-icon {
    position: absolute;
    right: 10px;
    cursor: pointer;
    font-size: 1.2em;
  }
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;

  &:hover {
    background-color: #0056b3;
  }
`;

const ActualizarMisDatos = () => {
  const [usuario, setUsuario] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchUsuario = async () => {
      const id = localStorage.getItem('usuarioId');
      if (id) {
        try {
          const respuesta = await axios.get(`http://localhost:3002/Usuarios/`);
          const usuarios = respuesta.data;
          const usuarioEncontrado = usuarios.find(user => user.id === id);
          setUsuario(usuarioEncontrado);
        } catch (error) {
          console.error('Error al obtener el perfil:', error);
        }
      }
    };

    fetchUsuario();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (usuario) {
      try {
        await axios.put(`http://localhost:3002/Usuarios/${usuario.id}`, {
          Nombre: event.target.nombre.value,
          Apellido: event.target.apellido.value,
          Correo: event.target.correo.value,
          Contraseña: event.target.contraseña.value,
          Celular: event.target.celular.value,
          Direccion: event.target.direccion.value,
          TipoDocumento: usuario.TipoDocumento, // No editable
          NumeroDocumento: usuario.NumeroDocumento // No editable
        });
        alert('Datos actualizados exitosamente');
      } catch (error) {
        console.error('Error al actualizar los datos:', error);
        alert('Error al actualizar los datos');
      }
    }
  };

  if (!usuario) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <NavBar />
      <Container>
        <center>
        <FormSection>
          <h2>Actualizar Datos</h2>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                defaultValue={usuario.Nombre}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="apellido">Apellido:</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                defaultValue={usuario.Apellido}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="correo">Correo:</label>
              <input
                type="email"
                id="correo"
                name="correo"
                defaultValue={usuario.Correo}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="contraseña">Contraseña:</label>
              <div className="password-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="contraseña"
                  name="contraseña"
                  defaultValue={usuario.Contraseña}
                  required
                />
                <span
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </FormGroup>
            <FormGroup>
              <label htmlFor="celular">Celular:</label>
              <input
                type="text"
                id="celular"
                name="celular"
                defaultValue={usuario.Celular}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="direccion">Dirección:</label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                defaultValue={usuario.Direccion}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="tipo_documento">Tipo documento:</label>
              <input
                type="text"
                id="tipo_documento"
                name="tipo_documento"
                defaultValue={usuario.TipoDocumento}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="numero_documento">Número Documento:</label>
              <input
                type="text"
                id="numero_documento"
                name="numero_documento"
                defaultValue={usuario.NumeroDocumento}
                disabled
              />
            </FormGroup>
            <center>
              <Button type="submit">Guardar</Button>
            </center>
          </form>
        </FormSection>
        </center>
      </Container>
      <Footer />
    </div>
  );
};

export default ActualizarMisDatos;
