
import { Outlet } from "react-router-dom";
import { useAuth } from "../Autenticacion/AutProvider";
import React from "react";

export default function ProtectedRoute() {
    const auth = useAuth();

    // Verifica si el usuario está autenticado
    const isAuthenticated = auth.esAutentico;

    // Si el usuario está autenticado, renderiza el Outlet para mostrar el contenido protegido
    // Si el usuario no está autenticado, también renderiza el Outlet pero puede mostrar un mensaje o componente diferente
    return <Outlet isAuthenticated={isAuthenticated} />;
}
