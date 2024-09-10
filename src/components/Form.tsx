import { useState, FormEvent, ChangeEvent } from 'react'
import { useQuest } from '../hooks/useQuest'
import { useNavigate } from 'react-router-dom'
import SearchTable from './SearchTable'

function Form() {

    const {state, dispatch} = useQuest()
    const [startNumber, setStartNumber] = useState(1)
    const [endNumber, setEndNumber] = useState(state.kanjiDB.length)
    const [buttonClick, setButtonClick] = useState("")
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)

    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        e.target.id === "start" ? setStartNumber(+e.target.value) : setEndNumber(+e.target.value)
    }

    const handleButton = (buttonId : string) => {
        setButtonClick(buttonId)
    }

    const disableStartButton = () => {
        if(startNumber === 0 || endNumber === 0 || endNumber < startNumber || endNumber > state.kanjiDB.length){
            return true
        }else{
            return false
        }
    }

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({type: 'generate-quest', payload: {startNumber, endNumber, buttonClick}})
        navigate('/quest')
    }

    const toggleMenu = () => {
      setMenuOpen(!menuOpen)
    }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row justify-center mt-10 mx-auto gap-10 md:gap-20">
        <div className="flex flex-col">             
          <label htmlFor="start" className="mx-auto">Seleccione desde donde empezar:</label>
            <input className="mx-auto text-black text-center" 
              type="number" id="start" value={startNumber} onChange={handleChange}/>
          
          <label htmlFor="end" className="mt-5 mx-auto">Seleccione hasta donde terminar: </label>
          <input className="mx-auto text-black text-center" 
            type="number" id="end" value={endNumber} onChange={handleChange}/>
          
          <button type="submit" id="newQuest" onClick={() => handleButton("newQuest")} disabled={disableStartButton()}
            className="disabled:opacity-10 mx-auto mt-5 py-2 px-8 font-bold uppercase bg-white text-black hover:bg-blue-500 hover:text-white rounded-full border-2 border-black col-span-2"
          >Empezar</button>
        </div>
        
        <div className="flex flex-col justify-end text-center mx-auto">
          <p className="text-8xl">{state.reviewKanji.length}</p>
          <p className="mb-3">Para repasar</p>
          <div className='flex gap-1'>
            <button type="submit" id="reviewQuest" onClick={() => handleButton("reviewQuest")} disabled={state.reviewKanji.length === 0 ? true : false}
              className="disabled:opacity-10  py-2 px-6 font-bold uppercase bg-white text-black hover:bg-orange-500 hover:text-white rounded-full border-2 border-black col-span-2"
            >Repasar</button>
            <button type="button" onClick={toggleMenu} disabled={state.reviewKanji.length === 0 ? true : false}
              className="disabled:opacity-10  py-2 px-4 font-bold uppercase bg-white text-black hover:bg-blue-500 hover:text-white rounded-full border-2 border-black col-span-2"
            >Ver</button>
          </div>
        </div>

        <div className={`fixed inset-0 z-50 bg-black bg-opacity-60 transition-transform transform ${menuOpen ? 'translate-y-0' : '-translate-y-[100%]'} transition-transform duration-500`}>
          <div className="absolute right-0 top-0 bg-white/9 w-full h-full p-4 backdrop-blur-2xl flex justify-center">
            <button type="button" onClick={toggleMenu} className="text-white focus:outline-none absolute top-4 right-4" aria-label={menuOpen ? "Close menu" : "Open menu"}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            <SearchTable 
              list={state.reviewKanji}
            /> 
          </div>
        </div>  
    </form>
  )
}

export default Form