import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../Autenticacion/AutProvider";
import { useState } from "react";
import { API_URL } from "../Autenticacion/constanst";
import type { AuthResponse, AuthResponseError } from "../types/types";
import React from "react";
import DefaultLayout from "../layout/DefaultLayout";
import Footer from "../components/Footer";


export default function Login() {
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const auth = useAuth();
  const goto = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          gmail,
          password
        })
      });

      if (response.ok) {
        setErrorResponse("");
        const json = (await response.json()) as AuthResponse;

        if (json.body.accessToken && json.body.refreshToken) {
          auth.saveUser(json);

          // Obtener el rol del usuario
          const role = json.body.user.role;

          // Redirigir según el rol del usuario
          if (role === "cliente") {
            goto("/posts");
          } else if (role === "usuario") {
            goto("/dashboard");
          }
        }
      } else {
        const json = (await response.json()) as AuthResponseError;
        setErrorResponse(json.body.error);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (auth.esAutentico) {
    console.log("autenticacion "+ auth.esAutentico);
    
    return <Navigate to="/dashboard" />;
  }

  return (
    

<DefaultLayout>
      <div className="form-box">
        <div className="wrapper">
          <div className="left">
          <div className="registration-info">
            <div className="title-regis">
              <h1>Bienvenido a <span className="span">ParkingLocation</span></h1>

            </div>
            <div className="regisP">
              <p>Accede a nuestra plataforma y disfrutar de servicios de estacionamiento convenientes y seguros.</p>

            </div>
            <div className="regislink">
              <p className="login-link">¿Aún no tienes cuenta? <a href="/signup">Registrate aquí</a></p>

            </div>
          </div>

          </div>
          <div className="right">

          <div className="form-area">
            <form className="formLogin" onSubmit={handleSubmit}>
              <div className="formTitle">
                <h2 className="form-title">Iniciar sesión</h2>

              </div>
              {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
              <div className="inputs">

                <input
                  type="email"
                  value={gmail}
                  onChange={(e) => setGmail(e.target.value)}
                  placeholder="Correo...."
                  className="log-input"></input>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña...."
                  className="log-input"></input>
              </div>
              <button className="crear">Acceder</button>
            </form>
          </div>
          </div>
        </div>
        <div className='air air1'></div>
        <div className='air air2'></div>
        <div className='air air3'></div>
        <div className='air air4'></div>
      </div>
      <Footer />
    </DefaultLayout>
      
      
    
  );
}


