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
import Swal from 'sweetalert2'; // Importa sweetalert2
import '../pages/DatosFrom/info.css';

const UserReseve = () => {
  
  const [reservas, setReservas] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    const fetchReseva = async () => {
      try {
        const response = await fetch(`${puestos.apiUrl}`, {
          headers: {
            Authorization: `Bearer  ${auth.getAccessToken()}`
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

    // Cargar la imagen del logo como base64
    const imgData = "https://i.ibb.co/wQYC7K6/images-jpg-Photoroom-png-Photoroom.png";
    
    // Diseño del PDF
    doc.setFontSize(18);
    doc.text(80, 20, 'Detalles de la reserva', null, null, 'center');
    
    // Insertar el logo en el PDF
    doc.addImage(imgData, 'PNG', 15, 15, 30, 30);
    
    doc.setFontSize(12);
    doc.text(20, 60, `Fecha de reserva: ${reserva.date}`);
    doc.text(20, 70,` Nombre: ${reserva.nombre}`);
    doc.text(20, 80, `Hora de reserva: ${reserva.time}`);
    
    // Construir el array de datos para la tabla
    const data = [
      [reserva.date, reserva.time, reserva.nombre, reserva.placa, reserva.telefono]
    ];
    
    doc.autoTable({
      head: [['Fecha', 'Hora', 'Nombre', 'Placa', 'Numero Telefonico']],
      body: data,
      startY: 100
    });

    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      const city = "Ciudad";
      const department = "Departamento";
      const year = new Date().getFullYear();
      const thankYouText = `¡Gracias por reservar en nuestro parqueadero en ${city}, ${department} ${year}!`;
      doc.text(thankYouText, 14, doc.internal.pageSize.height - 10);
    }

    doc.save("reserva.pdf");
  };
  
  

  const handleDelete = async (reservaId) => {
    // Mostrar una alerta de confirmación antes de eliminar
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://backintento.onrender.com/api/reserva/cancel/${reservaId}`, {
            headers: {
              Authorization: `Bearer ${auth.getAccessToken()}`
            }
          });
          Swal.fire(
            'Eliminado!',
            'La reserva ha sido eliminada.',
            'success'
          );
  
          // Actualizar la lista de reservas después de la eliminación
          setReservas(reservas.filter(reserva => reserva._id !== reservaId));
        } catch (error) {
          console.error("Error deleting reserva:", error);
          Swal.fire(
            'Error!',
            'Hubo un problema al eliminar la reserva.',
            'error'
            );
          }
        }
      });
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


