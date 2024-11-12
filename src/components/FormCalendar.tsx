// "use client";

// import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

// function FormularioConCalendario() {
//   const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
//   const [horarios, setHorarios] = useState([
//     { hora: '09:00', disponible: true },
//     { hora: '10:00', disponible: false },
//     { hora: '11:00', disponible: true },
//     { hora: '12:00', disponible: false },
//     { hora: '13:00', disponible: true },
//     { hora: '14:00', disponible: false },
//     { hora: '15:00', disponible: true },
//     { hora: '16:00', disponible: false },
//     { hora: '17:00', disponible: true },
//   ]);



//   const manejarFechaSeleccionada = (fecha) => {
//     setFechaSeleccionada(fecha);
//     // Aquí puedes actualizar los horarios en función de la fecha seleccionada desde una API
//   };

//   return (
//     <div>
//       <h2>Selecciona una fecha</h2>
//       <Calendar onChange={manejarFechaSeleccionada} value={fechaSeleccionada} />
      
//       <h3>Horarios disponibles para el {fechaSeleccionada.toLocaleDateString()}</h3>
//       <ul>
//         {horarios.map((horario, index) => (
//           <li
//             key={index}
//             style={{
//               color: horario.disponible ? 'green' : 'red',
//               fontWeight: 'bold',
//             }}
//           >
//             {horario.hora}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


// export default FormularioConCalendario;
