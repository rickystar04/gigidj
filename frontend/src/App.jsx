// App.jsx
import React from "react";
import foto from "./assets/gigidj.jpeg"; // sostituisci con il percorso della tua immagine

function App() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-100">
      <h1 className="text-8xl md:text-9xl font-extrabold text-red-600 mb-12 text-center">
        Non sono spotify
      </h1>
      <img
        src={foto}
        alt="Immagine centrale"
        className="w-11/12 max-w-[200px] h-auto object-cover rounded-lg shadow-xl"
      />
    </div>
  );
}

export default App;
