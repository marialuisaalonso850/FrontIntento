import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';
import PortalLayout from "../layout/PortalLayout";
import Footer from "../components/Footer";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import puestos from '../puestos.json'
import { FaFilePdf } from "react-icons/fa";
import { useAuth } from '../Autenticacion/AutProvider';
import '../pages/DatosFrom/info.css';

const UserReseve = () => {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  const auth = useAuth();
// Obtener el contexto de autenticación

  useEffect(() => {
    const fetchReseva = async () => {
      try {
        const response = await fetch(`${puestos.apiUrl}`, {
          headers: {
            Authorization: `Bearer ${auth.getAccessToken()}` // Agregar el token de autorización al encabezado
          }
        });
        if (response.ok) {
          const data = await response.json();
          const filteredPosts = data.filter(reserva => reserva.userId === auth.getUser().id);
          
          setReservas(filteredPosts);
        } else {
          console.error("Error al obtener los mensajes:", response.statusText);
        }
      } catch (error) {
        console.error("Error al obtener los mensajes:", error);
      }
    };

    fetchReseva();
  }, [auth]);

  const handleCheckout = (reserva) => {
    
  
    // Crear un nuevo documento PDF
    const doc = new jsPDF();
  
    // Diseño del PDF
    doc.setFontSize(18);
    doc.text(80, 20, 'Detalles de la reserva');
    doc.setFontSize(12);
    doc.text(20, 30, `Fecha de reserva: ${reserva.date}`);
    doc.text(20, 40, `Nombre: ${reserva.nombre}`);
    doc.text(20, 50, `Hora de reserva: ${reserva.time}`);
  
    // Construir el array de datos para la tabla
    const data = [
      [reserva.date, reserva.time, reserva.nombre, reserva.placa, reserva.telefono]
    ];
  
    doc.autoTable({
      head: [['Fecha', 'Hora', 'Nombre', 'Placa', 'Numero Telefonico']],
      body: data,
      startY: 80 // Empieza la tabla en la posición Y 80
    });
  
    // Guardar el PDF
    doc.save("reserva.pdf");
  };
  const handleDelete = async (reservaId) => {
    try {
      // Obtener el token de autorización
      await axios.delete(`https://rolescambios.onrender.com//api/reserva/${reservaId}`, {
        headers: {
          Authorization: `Bearer ${auth.getAccessToken()}`
        }
      });
      // Actualizar la lista de reservas después de la eliminación
      fetchResevas();
    } catch (error) {
      console.error("Error deleting reserva:", error);
    }
  };

  return (
    <PortalLayout>
      <div className="posts">
        <div className="datosReserva">
          <Link to="/Dashboard">
            <Button color="primary">Regresar</Button>
          </Link>
          <section class="table__body" >

          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Tiempo</th>
                <th>Nombre</th>
                <th>Numero</th>
                <th>Placa</th>
                <th>Acciones</th>
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
                    <Button
                      onClick={() => handleCheckout(reserva)}
                      color="success"
                    >
                       <FaFilePdf />
                      Generar Factura
                    </Button>{" "}
                    <Button
                      onClick={() => handleDelete(reserva._id)}
                      color="danger"
                    >
                     
                      Cancelar 
                    </Button>
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

export default UserReseve;


