import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../Autenticacion/AutProvider';
import { API_URL } from "../Autenticacion/constanst";

const Menu: React.FC = () => {
  const auth = useAuth();
  const [role, setRole] = useState<string>('cliente'); // Establece un valor predeterminado para el estado role

 

  useEffect(() => {
    const userRole = auth.getUser()?.role;
    if (userRole) {
      setRole(userRole);
    } else {
      setRole('cliente'); 
    }
  }, [auth.getUser()?.role]);

  async function handleSignOut(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/signout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getRefreshToken()}`
        }
      });

      if (response.ok) {
        auth.signOut();
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <nav>
      <ul>
        {role === 'usuario' && (
          <>
            <li>
              <Link to="/dashboard">Mapa navegación</Link>
            </li>
            <li>
              <Link to="/ExplicacionUser">¿Cómo Funciona?</Link>
            </li>
            <li>
              <Link to="/reservasUser">Historial Reserva</Link>
            </li>
          </>
        )}
        {role === "cliente" && (
          <>
            <li>
              <Link to="/posts">Creación parqueadero</Link>
            </li>
            <li>
              <Link to="/Explicacion">¿Cómo Funciona?</Link>
            </li>
          </>
        )}
        <li>
          <button className="p-14 hover:text-blue-500" onClick={handleSignOut}>Salir</button>
        </li>
        {role && (
          <li>
            Rol: {role}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Menu;
