import { useEffect, useState } from "react";
import { getAllSalas } from "../api/sala_api";
import { SalaCard } from "./SalaCard";

interface Sala {
    id: number;
    nombre: string;
    cantidad_computadoras: number;
}

export function SalaList() {
    const [salas, setSalas] = useState<Sala[]>([]); // Especifica el tipo Sala[] para salas

    useEffect(() => {
        async function loadSalas() {
            try {
                const res = await getAllSalas();
                setSalas(res);
            } catch (error) {
                console.error("Error fetching salas:", error);
            }
        }
        loadSalas();
    }, []);
    
    return (
        <main className="flex justify-center ">
            <section className="grid grid-cols-4 gap-10 p-3 ">
            {salas.map((sala) => (
                <SalaCard key={sala.id} sala={sala} />
            ))}
            </section>
        </main>
        
    );
}
