import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import 'leaflet/dist/leaflet.css';
import config from "../../config.json";
import './info.css';
import { useAuth } from '../../Autenticacion/AutProvider';
import PortalLayout from "../../layout/PortalLayout";
import Footer from "../../components/Footer";

const PostInfo = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const auth = useAuth(); // Obtiene el contexto de autenticación

    useEffect(() => {
        const fetchPostById = async () => {
            try {
                const res = await axios.get(`${config.apiUrl}/${id}`, {
                    headers: {
                        Authorization: `Bearer ${auth.getAccessToken()}` // Agrega el token de autorización al encabezado
                    }
                });
                setPost(res.data); // Asumiendo que la respuesta de la API contiene un objeto de poste directamente
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };

        fetchPostById();
    }, [id, auth]); // Agrega auth a la lista de dependencias

    if (!post || post.latitud === undefined || post.longitud === undefined) {
        return <div>Loading...</div>;
    }

    const defaultCenter = [post.latitud, post.longitud];

    return (
        <PortalLayout>
            <div>
                <div className="informacion">
                    {/* Información del parqueadero */}
                    <div className="info">
                        <h2>{post.title}</h2>
                        <p><strong>Dirección:</strong> {post.content}</p>
                        <p><strong>Nosotros:</strong> {post.nosotros}</p>
                        <p><strong>Horario:</strong> {post.horarios}</p>
                        <p><strong>Tarifa Carro:</strong> {post.tarifaCarro}</p>
                        <p><strong>Tarifa Moto:</strong> {post.tarifaMoto}</p>
                        <p><strong>Teléfono:</strong> {post.telefono}</p>
                    </div>
                    {/* Mapa del parqueadero */}
                    <div className="map">
                        <MapContainer center={defaultCenter} zoom={12} style={{ height: '400px', width: '800px' }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='© OpenStreetMap contributors'
                            />
                            <Marker position={defaultCenter}>
                                <Popup>
                                    <div>
                                        <strong>Parqueadero:</strong> {post.title}
                                        <br />
                                        <strong>Dirección:</strong> {post.content}
                                    </div>
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                </div>
                {/* Sección de métodos de pago */}
                <div className="metodos-pago">
                    <h3>Métodos de Pago</h3>
                    <div className="codigos">
                        <div className="qr-code">
                            <img src="https://ingetraining.com/site/wp-content/uploads/2020/04/IMAGEN-QR-BANCOLOMBIA-03-803x1024.png" alt="Código QR Banco 1" />
                            <p>Banco: BancoColombia</p>
                        </div>
                        <div className="qr-code">
                            <img src="https://amartemarket.com/wp-content/uploads/2020/11/Daviplata-amarte-market.png" alt="Código QR Banco 2" />
                            <p>Banco: Davivienda</p>
                        </div>
                        <div className="qr-code">
                            <img src="https://www.casconection.com/wp-content/uploads/2021/05/NEQUI-QR-1024x949.png" alt="Código QR Banco 3" />
                            <p>Banco: Nequi BancoColombia</p>
                        </div>
                    </div>
                </div>
            </div>


            <Footer />
        </PortalLayout>

    );
};

export default PostInfo;
