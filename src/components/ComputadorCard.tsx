import { useState } from "react";
import { updateComputadora } from './../api/computador_api';

interface ComputadorCardProps {
    computador: {
        id?: number;
        sala: number;
        nombre_sala: string; 
        numero: number;
        ocupado: boolean;
    };
}

export function ComputadoraCard({ computador }: ComputadorCardProps) {
    const [ocupado, setOcupado] = useState(computador.ocupado);

    const handleChangeEstado = async () => {
        if (computador.id !== undefined) {
            try {
                const updatedComputadora = { ocupado: !ocupado }; // Definimos el objeto con el nuevo estado
                await updateComputadora(computador.id, updatedComputadora); // Enviamos la solicitud PUT
                setOcupado(!ocupado); // Actualizamos el estado local
            } catch (error) {
                console.error("Error al actualizar el estado de la computadora:", error);
            }
        }
    };

    return (
        <div className=" mt-5 p-3 rounded-xl cursor-pointer bg-compu box text-center text-lg text-white">
            <h1><strong>Sala:</strong> {computador.nombre_sala}</h1> 
            <p><strong>Número de Computadora:</strong> {computador.numero}</p>
            <p><strong>Estado:</strong> {ocupado ? "Ocupado" : "Libre"}</p>  
            <button onClick={handleChangeEstado}  className=" text-white font-bold py-3 px-2 bg-boton rounded-full
             my-3 text-sm">
                Cambiar estado
            </button>
        </div>
    );
}
