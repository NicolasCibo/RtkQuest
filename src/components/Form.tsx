import { useState, FormEvent, ChangeEvent } from 'react'
import { useQuest } from '../hooks/useQuest'
import { useNavigate } from 'react-router-dom'
import SearchTable from './SearchTable'
import History from './History'
import Modal from './Modal'

function Form() {

    const {state, dispatch} = useQuest()
    const [startNumber, setStartNumber] = useState(1)
    const [endNumber, setEndNumber] = useState(state.kanjiDB.length)
    const [buttonClick, setButtonClick] = useState("")
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)
    const [infoRender, setInfoRender] = useState("view")
 
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

    const toggleMenu = (render : string) => {
      setInfoRender(render)
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
          
          <div className='flex gap-1'>
            <button type="submit" id="newQuest" onClick={() => handleButton("newQuest")} disabled={disableStartButton()}
              className="disabled:opacity-10 mx-auto mt-5 py-2 px-6 font-bold uppercase bg-white text-black hover:bg-blue-500 hover:text-white rounded-full border-2 border-black col-span-2"
            >Empezar</button>
            <button type="button" id="history" onClick={() => toggleMenu("history")}
              className="disabled:opacity-10 mx-auto mt-5 py-2 px-4 font-bold uppercase bg-white text-black hover:bg-orange-500 hover:text-white rounded-full border-2 border-black col-span-2"
            >Historial</button>
          </div>
        </div>
        
        <div className="flex flex-col justify-end text-center mx-auto">
          <p className="text-8xl">{state.reviewKanji.length}</p>
          <p className="mb-3">Para repasar</p>
          <div className='flex gap-1'>
            <button type="submit" id="reviewQuest" onClick={() => handleButton("reviewQuest")} disabled={state.reviewKanji.length === 0 ? true : false}
              className="disabled:opacity-10  py-2 px-6 font-bold uppercase bg-white text-black hover:bg-orange-500 hover:text-white rounded-full border-2 border-black col-span-2"
            >Repasar</button>
            <button type="button" id="view" onClick={() => toggleMenu("view")} disabled={state.reviewKanji.length === 0 ? true : false}
              className="disabled:opacity-10  py-2 px-4 font-bold uppercase bg-white text-black hover:bg-blue-500 hover:text-white rounded-full border-2 border-black col-span-2"
            >Ver</button>
          </div>
        </div>

        <Modal 
          toggleMenu={toggleMenu}
          menuOpen={menuOpen}
        >
          {menuOpen === false 
          ? "" 
          : (infoRender === "view" ? <SearchTable list={state.reviewKanji} /> : <History />)}
        </Modal>
    </form>
  )
}

export default Form