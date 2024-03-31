// import DefaultLayout from "../layout/DefaultLayout";
// import emailjs from '@emailjs/browser';
// import React, { useRef } from "react";
// import '../assets/Contac.css'
// import { RiMailFill,  RiTwitterXFill } from "react-icons/ri";
// import { FaPhone, FaFacebook } from "react-icons/fa6";
// import { BsInstagram, BsLinkedin } from "react-icons/bs";
// import Footer from "../components/Footer";



// const ContactUs = () => {
//   const refForm = useRef(null);

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const serviceId = "service_ghhs3xh";
//     const templateId = "template_qjyqutf";
//     const apiKey = "y8ZnVdPiGF3qDQgh5";

//     emailjs.sendForm(serviceId, templateId,refForm.current, apiKey)
//       .then(result => console.log(result.text))
//       .catch(error => console.error(error));
//   };

//   return (
//     <DefaultLayout>
//             <div className="Ccontainer">

//                 <div className="contacto">

//                     <div className="box-info">
//                         <h1 className="title">¡CONTÁCTATE CON NOSOTROS!</h1>
//                         <div className="data">
//                             <p className="data1"><FaPhone />   +57 314 844 8537</p>
//                             <p className="data1"> <RiMailFill />   parkinlocation750@gmail.com</p>
//                         </div>
//                         <div className="links">
//                             <a href="#"><FaFacebook /></a>
//                             <a href="#"><BsInstagram /></a>
//                             <a href="#"><RiTwitterXFill /></a>
//                             <a href="#"><BsLinkedin /></a>
//                         </div>
//                     </div>
//                     <form onSubmit={handleSubmit} className="Cform">
//                         <div className="send">
//                             <div className="input-box">
//                                 <input name="username" type="text" placeholder="Nombre:" required />


//                             </div>
//                             <div className="input-box">
//                                 <input type="email" placeholder="Email:" name="email" required />
//                                 <i className="fa-solid fa-envelope"></i>
//                             </div>
//                             <div className="input-box">
//                                 <textarea maxLength={500} placeholder="¡Envíanos un mensaje!" name="message" id="" cols={30} rows={10}></textarea>
//                             </div>
//                             <button type="submit" className="crear">Enviar</button>

//                         </div>
//                     </form>

//                 </div>

//             </div>
//             <Footer />
//         </DefaultLayout>
//   );
// };

// export default ContactUs;


import DefaultLayout from "../layout/DefaultLayout";
import emailjs from '@emailjs/browser';
import React, { useRef } from "react";
import '../assets/Contac.css'
import { RiMailFill, RiTwitterFill } from "react-icons/ri";
import { FaPhone, FaFacebook } from "react-icons/fa";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import Footer from "../components/Footer";

const ContactUs = () => {
  const refForm = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const serviceId = "service_6bw2z6s";
    const templateId = "template_ik91suf";
    const apiKey = "y8ZnVdPiGF3qDQgh5";

    emailjs.sendForm(serviceId, templateId, refForm.current, apiKey)
      .then(result => console.log(result.text))
      .catch(error => console.error(error));
  };

  return (
    <DefaultLayout>
      <div className="Ccontainer">

        <div className="contacto">
        <div className="box-info">
        <h1 className="title">¡CONTÁCTATE CON NOSOTROS!</h1>
          <div className="data">
            <p className="data1"><FaPhone />   +57 323 588 8007</p>
            <p className="data1"> <RiMailFill/>  parkinlocation750@gmail.com</p>
          </div>
          <div className="links">
            <a href="#"><FaFacebook /></a>
            <a href="#"><BsInstagram/></a>
            <a href="#"><RiTwitterFill/></a>
            <a href="#"><BsLinkedin /></a>
          </div>
        </div>
        <form ref={refForm} action="" onSubmit={handleSubmit} className="Cform">
        <div className="send">
          <fieldset className="input-box" style={{color: "blue"}}>
            <label className="symbol-required-name" htmlFor="">Nombre</label>
            <input name="username" type="text" placeholder="ej: Maria Luisa" required  /> 
          </fieldset>
          <fieldset className="input-box">
            <label className="symbol-required-gmail" htmlFor="">Correo</label>
            <input type="email" placeholder="ej marialuisaalonso850@gmail.com" name="email" required />
          </fieldset>
          <fieldset className="input-box">
            <label className="symbol-required-menssage" htmlFor="">Mensaje</label>
            <textarea maxLength={500} placeholder="Escribe tu mensaje" name="message" id="" cols={30} rows={10}></textarea>
          </fieldset>
          <button type="submit" className="crear">Enviar</button>
          </div>
        </form>
        </div>
      </div>
      <Footer />
    </DefaultLayout>
  );
};

export default ContactUs;