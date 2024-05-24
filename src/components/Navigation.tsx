import {Link} from 'react-router-dom';                  

export function Navigation() {
    return (
    <main className=' p-2 text-center text-white'>
        <Link to="/salas">
            <h1 className='  text-4xl mt-7 text'> <strong>Gestion de Salas de Computadores</strong></h1>
        </Link>
        
        <section className=' flex mt-10 gap-6 justify-center'>
            <div className=' rounded-[20px] group relative bg-nav px-5 py-3 text-lg text-white nav-link'>
                <Link to= '/salas' ><strong>Lista de Salas</strong> </Link>
            </div>
            <div className=' rounded-[20px] group relative bg-nav  px-5 py-3 text-lg text-white nav-link'>
                <Link to= '/crear-sala' ><strong>Crear Sala</strong> </Link>
            </div>
            <div className='rounded-[20px] group relative bg-nav  px-5 py-3 text-lg text-white nav-link'>
                <Link to= '/computadores'><strong>Lista de Computadores</strong> </Link>              
            </div>
            <div className='rounded-[20px] group relative bg-nav px-5 py-3 text-lg text-white nav-link'>
                <Link to= '/crear-computador'><strong>Crear Computador</strong></Link>
            </div>
        </section>
        
    </main>
    )
}

