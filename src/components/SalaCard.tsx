import { useNavigate } from "react-router-dom";

interface SalaCardProps {
    sala: {
        id: number;
        nombre: string;
        cantidad_computadoras: number;
    };
}

export function SalaCard({ sala }: SalaCardProps) {
    const navigate = useNavigate();
    return (
        <div 
            className=" mt-10 p-5 rounded-xl shadow-md box cursor-pointer bg-card text-center bg-slate-100 text-xl py-10 nav-card text-white "
            onClick={() => {
                navigate('/detalle-sala/' + sala.id);
            }}
        >
            <h1><strong>Sala:</strong> {sala.nombre}</h1>
            <p><strong>Computadores:</strong> {sala.cantidad_computadoras}</p>  
        </div>
    );
}
