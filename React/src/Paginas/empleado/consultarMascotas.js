import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBarEmpleado from '../../components/navBarEmpleado';
import Footer from '../../components/footer';

const ConsultarMascotas = () => {
  const [mascotas, setMascotas] = useState([]);
  const [razaFiltro, setRazaFiltro] = useState('');
  const [sexoFiltro, setSexoFiltro] = useState('');
  const [edadMinFiltro, setEdadMinFiltro] = useState('');
  const [edadMaxFiltro, setEdadMaxFiltro] = useState('');

  useEffect(() => {
    const obtenerMascotas = async () => {
      try {
        const respuesta = await axios.get('http://localhost:3002/Mascotas/');
        setMascotas(respuesta.data);
      } catch (error) {
        console.error('Error al obtener las mascotas:', error);
      }
    };

    obtenerMascotas();
  }, []);

  const filtrarMascotas = () => {
    return mascotas.filter((mascota) => {
      const cumpleRaza = razaFiltro ? mascota.Raza.includes(razaFiltro) : true;
      const cumpleSexo = sexoFiltro ? mascota.Sexo === sexoFiltro : true;
      const cumpleEdadMin = edadMinFiltro ? mascota.Edad >= parseInt(edadMinFiltro) : true;
      const cumpleEdadMax = edadMaxFiltro ? mascota.Edad <= parseInt(edadMaxFiltro) : true;

      return cumpleRaza && cumpleSexo && cumpleEdadMin && cumpleEdadMax;
    });
  };

  const verPerfil = (id) => {
    localStorage.setItem('mascotaId', id);
    window.location.href = '/verPerfilMascota';
  };

  const styles = {
    body: {
      margin: 0,
      fontFamily: 'sans-serif',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'repeat',
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: 'calc(100vh - 80px)',
      padding: '20px',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      borderRadius: '10px',
      width: '95%',
      maxWidth: '1200px',
    },
    filters: {
      marginBottom: '20px',
      display: 'flex',
      gap: '15px',
      width: '100%',
      justifyContent: 'space-around',
    },
    filterInput: {
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ddd',
      width: '100%',
    },
    tableContainer: {
      padding: '20px',
      borderRadius: '5px',
      width: '100%',
      overflowX: 'auto',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      textAlign: 'left',
      color: 'black',
    },
    th: {
      padding: '10px',
      borderBottom: '1px solid #ddd',
      backgroundColor: '#bfbcbcbf',
      fontWeight: 'bold',
    },
    td: {
      padding: '10px',
      borderBottom: '1px solid #ddd',
    },
    button: {
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    buttonHover: {
      backgroundColor: '#3e8e41',
    },
  };

  return (
    <div style={styles.body}>
      <NavBarEmpleado />
      <section style={styles.container}>
        <div style={styles.content}>
          <h2>Consultar Mascotas</h2>
          <div style={styles.filters}>
            <input
              type="text"
              placeholder="Filtrar por Raza"
              style={styles.filterInput}
              value={razaFiltro}
              onChange={(e) => setRazaFiltro(e.target.value)}
            />
            <select
              style={styles.filterInput}
              value={sexoFiltro}
              onChange={(e) => setSexoFiltro(e.target.value)}
            >
              <option value="">Todos los sexos</option>
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
            <input
              type="number"
              placeholder="Edad mínima"
              style={styles.filterInput}
              value={edadMinFiltro}
              onChange={(e) => setEdadMinFiltro(e.target.value)}
            />
            <input
              type="number"
              placeholder="Edad máxima"
              style={styles.filterInput}
              value={edadMaxFiltro}
              onChange={(e) => setEdadMaxFiltro(e.target.value)}
            />
          </div>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Nombre</th>
                  <th style={styles.th}>Raza</th>
                  <th style={styles.th}>Edad</th>
                  <th style={styles.th}>Sexo</th>
                  <th style={styles.th}>Enfermedades</th>
                  <th style={styles.th}>Peso</th>
                  <th style={styles.th}>Esterilizado</th>
                  <th style={styles.th}>Acción</th>
                </tr>
              </thead>
              <tbody>
                {filtrarMascotas().map((mascota) => (
                  <tr key={mascota.id}>
                    <td style={styles.td}>{mascota.Nombre}</td>
                    <td style={styles.td}>{mascota.Raza}</td>
                    <td style={styles.td}>{mascota.Edad} años</td>
                    <td style={styles.td}>{mascota.Sexo}</td>
                    <td style={styles.td}>{mascota.Enfermedades}</td>
                    <td style={styles.td}>{mascota.Peso}</td>
                    <td style={styles.td}>{mascota.Esterilizado ? 'Sí' : 'No'}</td>
                    <td style={styles.td}>
                      <button
                        style={styles.button}
                        onClick={() => verPerfil(mascota.id)}
                      >
                        Perfil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ConsultarMascotas;
