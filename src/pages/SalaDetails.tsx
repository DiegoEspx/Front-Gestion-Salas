import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSala } from '../api/sala_api';
interface Computadora {
    numero: number;
    ocupado: boolean;
}

interface SalaDetailsProps {
    id: number; // Asegúrate de incluir el ID en la interfaz
    nombre: string;
    cantidad_computadoras: number;
    computadoras: Computadora[];
    ocupadas: number;
    libres: number;
}
export function SalaDetails() {
    const { id } = useParams<{ id: string }>();
    const [salaDetails, setSalaDetails] = useState<SalaDetailsProps | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchSalaDetails() {
            try {
                const res = await getSala(id!);
                setSalaDetails(res);
            } catch (error) {
                console.error("Error fetching sala details:", error);
            }
        }
        fetchSalaDetails();
    }, [id]);

    if (!salaDetails) {
        return <div>Loading...</div>;
    }

    const handleEdit = () => {
        navigate(`/editar-sala/${id}`);
    };

    return (
        <main className="flex justify-center">
    <div className="bg-crear mt-16 py-8 px-9 box rounded-3xl  relative text-white">
        <div className="bg-detalles text-center text-3xl font-bold py-4 rounded-3xl absolute top-0 left-0 w-full">
            <h1>Detalles de la Sala {salaDetails.id}</h1>
        </div>
        <div className="grid grid-cols-2 gap-7 mt-16 mb-3 text-lg">
            <div className="text-left my-6">
                <p><strong>Nombre:</strong> {salaDetails.nombre}</p>
                <p><strong>Cantidad de Computadoras:</strong> {salaDetails.cantidad_computadoras}</p>
                <p><strong>Computadoras Ocupadas:</strong> {salaDetails.ocupadas}</p>
                <p><strong>Computadoras Libres:</strong> {salaDetails.libres}</p>
            </div>
            <div className="text-left ">
                <h2 className="font-bold ml-10"> Computadoras:</h2>
                <ul>
                    {salaDetails.computadoras.map((comp, index) => (
                        <li key={index}>
                            <strong>Computadora {comp.numero}:</strong> {comp.ocupado ? 'Ocupada' : 'Libre'}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        <button 
            onClick={handleEdit} 
            className="bg-boton text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline ml-16">
            Editar
        </button>
    </div>
</main>


    );
}
