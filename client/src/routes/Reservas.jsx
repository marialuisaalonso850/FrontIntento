import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import PortalLayout from "../layout/PortalLayout";
import Footer from "../components/Footer";
import puestos from '../puestos.json'
import { useAuth } from "../Autenticacion/AutProvider";
import '../pages/DatosFrom/info.css'

const Reservas = () => {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  const auth = useAuth(); // Obtener el contexto de autenticación

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axios.get(`${puestos.apiUrl}`, {
          headers: {
            Authorization: `Bearer ${auth.getAccessToken()}` // Agregar el token de autorización al encabezado
          }
        });
        if (response.status === 200) {
          const data = response.data;
          setReservas(data); // Establecer todas las reservas sin filtrar
        } else {
          console.error("Error al obtener las reservas:", response.statusText);
        }
      } catch (error) {
        console.error("Error al obtener las reservas:", error);
      }
    };
  
    fetchReservas();
  }, [auth]);

  const handleDelete = async (reservaId) => {
    try {
      const accessToken = auth.getAccessToken(); // Obtener el token de acceso del contexto de autenticación
      await axios.delete(`http://localhost:5000/api/reserva/${reservaId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      // Mostrar la alerta de éxito
      Swal.fire({
        icon: 'success',
        title: 'Factura enviada',
        text: 'Se ha enviado la factura al correo electrónico.',
      });
      // Actualizar la lista de reservas después de la eliminación
      fetchReservas(); // Aquí corregimos el nombre de la función a fetchReservas
    } catch (error) {
      console.error("Error al eliminar la reserva:", error);
    }
  };

  let codigoPais = '57'; // Código de país
    
  const handleWhatsAppClick = (numeroTelefono, nombre) => {
    const mensajeInicial = encodeURIComponent(`¡Hola ${nombre}!, recuerda que tienes una reserva en nuestro parqueadero, para más información comunícate con este número.`);
    const numeroWhatsApp = `${codigoPais}${numeroTelefono}`;
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeInicial}`;
    window.open(urlWhatsApp, '_blank');
  }

  return (
    <PortalLayout>
      <div className="posts">
        <div className="datosReserva">
          <Link to="/Posts">
            <Button color="primary">Regresar</Button>
          </Link>
     
          <section className="table__body">
            <table>
              <thead>
                <tr>
                  <th>Fecha</th>              
                  <th>Tiempo</th>
                  <th>Nombre</th>             
                  <th>Numero</th>
                  <th>Placa</th>
                  <th>Eliminar</th>
                  <th>Enviar mensaje</th>
                </tr>
              </thead>
              <tbody>
                {reservas.map((reserva) => (
                  <tr key={reserva._id}>
                    <td>{reserva.date}</td>
                    <td>{reserva.time}</td>
                    <td>{reserva.nombre}</td>
                    <td className="numeroW">{reserva.telefono}</td> 
                    <td>{reserva.placa}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(reserva._id)}
                        className="btn btn-danger"
                      >
                        Salida de vehiculo
                      </button>
                    </td>
                    <td>
                      <Link onClick={() => handleWhatsAppClick(reserva.telefono, reserva.nombre)}>
                        <img src="https://cdn.icon-icons.com/icons2/1571/PNG/512/1024881-whatsapp_107716.png" alt="" className="whatsapp" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
      <Footer />
    </PortalLayout>
  );
};

export default Reservas;
