import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createSala, deleteSala, updateSala, getSala } from '../api/sala_api';
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

interface FormData {
    nombreSala: string;
}

export function SalasFormPage() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function loadSala() {
            if (params.id) {
                try {
                    const res = await getSala(params.id!);
                    if (res && res.nombre) {
                        setValue('nombreSala', res.nombre);
                    } else {
                        console.error("La respuesta de la API no tiene la estructura esperada:", res);
                    }
                } catch (error) {
                    console.error("Error loading sala:", error);
                }
            }
        }
        loadSala();
    }, [params.id, setValue]);

    const onSubmit = handleSubmit(async (data: FormData) => {
        const sala = {
            nombre: data.nombreSala,
        };
        try {
            if (params.id) {
                await updateSala(params.id, sala);
            } else {
                await createSala(sala);
                toast.success("Sala Creada", {
                    position: 'bottom-center'
                })
            }
            navigate("/salas");
        } catch (error) {
            console.error("Error al crear o actualizar la sala:", error);
        }
    });

    return (
        <div className="flex justify-center">
            <main className="bg-crear mt-10 rounded-3xl py-24 px-64 box ">
                <div className=" text-center mb-10 text-4xl font-bold text-white ">
                    <h1>Nombre Para la Sala</h1>
                </div>
                <form onSubmit={onSubmit} className="flex flex-col items-center">
                        <input 
                            className=" text-lg text-black rounded-xl px-10 py-2 mb-4 focus:outline-none"
                            type="text" 
                            placeholder="Nombre Sala"
                            autoComplete="off"
                        {...register("nombreSala", { required: "El nombre de la sala es obligatorio" })}
                        />
                        {errors.nombreSala && <span className="text-black font-extrabold">Este campo es requerido</span>}
                        <button type="submit" className= "bg-boton text-white font-bold mt-3 py-3 px-4 rounded-full text-lg">
                            Guardar
                        </button>
                </form>
                <div className="flex justify-center items-center mt-3">
                    {params.id && (
                        <button onClick={async() => {
                            const aceptar = window.confirm('¿Estás seguro?');
                            if (aceptar) {
                                try {
                                    await deleteSala(params.id!);
                                    navigate('/salas');
                                } catch (error) {
                                    console.error("Error al eliminar la sala:", error);
                                }
                            }
                        }} className="bg-boton text-white font-bold mt-1 py-3 px-4 rounded-full text-lg">Eliminar</button>
                    )}
                </div>
            </main>
        </div>
    );
}
