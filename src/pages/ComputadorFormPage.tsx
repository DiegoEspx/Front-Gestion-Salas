import { useForm } from "react-hook-form";
import { createComputadora } from '../api/computador_api';
import { useNavigate } from "react-router-dom";

interface FormData {
    sala: number;
    nombre_sala: string; 
    numero: number;
    ocupado: boolean;
}

export function ComputadoraFormPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const navigate = useNavigate();
    
    const onSubmit = handleSubmit(async (data: FormData) => {
        try {
            await createComputadora(data);
            navigate("/computadores");
        } catch (error) {
            console.error("Error al crear la computadora:", error);
        }
    });

    return (
        <div className="flex justify-center">
            <main className="bg-crear mt-6 rounded-3xl py-16 px-64 box ">
                <form onSubmit={onSubmit} className="flex flex-col items-center" >
                    <div className=" text-center mb-3 text-2xl font-bold text-white ">
                        <h1>ID de Sala</h1>
                    </div>
                    <div className="flex flex-col items-center" >
                        <input 
                            className=" text-lg text-black rounded-xl px-4 py-2  focus:outline-none"
                            type="number" 
                            placeholder="ID Sala"
                            {...register("sala", { required: "El ID de la sala es obligatorio" })}
                        />
                        {errors.sala && <span className="text-black font-extrabold my-2">Este campo es requerido</span>}
                    </div>
                    <div className=" text-center my-3 text-2xl font-bold text-white ">
                        <h1>Numero de Computadora</h1>
                    </div>
                    <div className="flex flex-col items-center">
                        <input 
                            className=" text-lg text-black rounded-xl px-4 py-2 mb-8 focus:outline-none"
                            type="number" 
                            placeholder="Número"
                            {...register("numero", { required: "El número de la computadora es obligatorio" })}
                        />
                        {errors.numero && <span className="text-black font-extrabold">Este campo es requerido</span>}
                    </div>
                    <div className="mb-6">
                        <label className="flex items-center text-white cursor-pointer">
                            <input 
                                type="checkbox" 
                                {...register("ocupado")}
                                className="form-checkbox h-5 w-5 text-blue-600 rounded-full border-2 border-blue-600 focus:outline-none focus:border-blue-400 transition duration-300"
                            />
                            <span className="ml-2 text-lg">Ocupado</span>
                        </label>
                    </div>
                    <button type="submit" className="bg-boton text-white font-bold mt-3 py-3 px-4 rounded-full text-lg">Guardar</button>
                </form>
            </main>
        </div>
    );
}
