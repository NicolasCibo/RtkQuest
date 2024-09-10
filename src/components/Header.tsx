import { NavLink } from "react-router-dom"
import { useQuest } from "../hooks/useQuest"

function Header() {

    const { state } = useQuest()

  return (
    <header className="py-5 flex justify-around md:justify-evenly">
        <h1 className="text-orange-500 text-2xl md:text-6xl text-center py-5 font-bold uppercase">
            <NavLink to="/">RTK Quest</NavLink>
        </h1>
        <nav className="flex">
            <ul className="flex md:gap-5 my-auto">
                <li>
                    <NavLink to="/quest"
                        className={({isActive}) => `${isActive ? "text-yellow-200" : "text-white"} p-2 text-sm md:text-2xl font-bold uppercase hover:text-gray-400`}
                    >Quest</NavLink>
                </li>
                <li>
                {state.current === state.kanjiQuest.length ? (    
                    <NavLink to="/search"
                        className={({isActive}) => `${isActive ? "text-yellow-200" : "text-white"} p-2 text-sm md:text-2xl font-bold uppercase hover:text-gray-400`}
                    >Buscar</NavLink>    
                ):(
                    <NavLink to="#"
                        className='p-2 text-sm md:text-2xl font-bold uppercase text-white hover:text-gray-400 opacity-10'
                    >Buscar</NavLink>
                )}
                </li>
                
            </ul>
        </nav> 
    </header>
  )
}

export default Header