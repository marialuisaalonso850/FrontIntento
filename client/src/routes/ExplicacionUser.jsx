import React from 'react';
import '../assets/Explicacion.css';
import PortalLayout from '../layout/PortalLayout';
import Footer from '../components/Footer';


export default function ExplicacionUser() {
  const reproducirVideo = () => {
    // URL del video de YouTube
    const videoUrl = 'https://youtu.be/RzH4gb-MqwU';
    // Abre una nueva ventana emergente con el video de YouTube
    window.open(videoUrl, '_blank', 'noopener noreferrer');
  };

  return (
    <PortalLayout>
      <div className="explicacion-container">
        <div className="steps-container">
          <h1>Pasos para crear su reserva en ParkingLocation</h1>
          <ol>
            <li>Ingresar al sistema de ParkingLocation.</li>
            <li>Ir al apartado de Mapa de navegación.</li>
            <li>Dar clic en el botón "Reserva".</li>
            <li>Llenar los datos del formulario.</li>
            <p>
              Si aun hay puestos disponibles puedes hacer tu reserva:
              <a href="/dashboard" target="_blank" rel="noopener noreferrer">click aquí</a>.
            </p>
            <li>La reserrva será validada y finalmente creada.</li>
            <div>
              <button onClick={reproducirVideo}>Ver Video</button>
            </div>
          </ol>
        </div>
        <div className="image-container">
          <img src="https://i.ibb.co/5KvC9QQ/Wireframing-bro-removebg-preview.png" alt="Imagen explicativa" className='intentoimg'/>
        </div>
      </div>

      <Footer />
    </PortalLayout>
  );
}
