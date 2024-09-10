import { useNavigate } from "react-router-dom"
import { useQuest } from "../hooks/useQuest"

function Summary() {

    const { state, dispatch } = useQuest()
    const {kanjiQuest, good, bad } = state

    const navigate = useNavigate()

    const handleTable = (id : number) => {
        dispatch({type: 'search-from-table', payload: {id}})
        navigate('/search')
    }

  return (
    <div className="flex items-center justify-center">
        <div>
            <div className="flex justify-center mb-5">
                <h3 className="text-2xl text-center font-bold p-2">BIEN: <span className="text-green-500">{good}</span></h3>
                <h3 className="text-2xl text-center font-bold p-2">MAL: <span className="text-red-500">{bad}</span></h3>
            </div>

            <table className="border-t border-l border-r">
                <thead>
                    <tr>
                        <th className="text-2xl text-center font-bold border-b p-2">KANJI</th>
                        <th className="text-2xl text-center font-bold border-b border-l p-2">REPASO</th>
                    </tr>
                </thead>
                <tbody>
                    {kanjiQuest.map(kanji => (
                        <tr key={kanji.id} className="text-center hover:cursor-pointer">
                            <td className={`${kanji.answer === 'good' ? 'bg-green-500' : 'bg-red-500'} hover:bg-white hover:text-black grid grid-cols-3 p-2 border-b border-r`}  
                                onClick={() => handleTable(kanji.id)} 
                                title={`Buscar: ${kanji.kanji}`}>
                                <span>{kanji.kanji}</span>
                                <span>{kanji.keyword}</span>
                                <span>{kanji.id}</span>
                            </td>
                            <td className="border-b underline hover:text-blue-400" onClick={() => dispatch({type: 'handle-review', payload: {kanji}})}
                            >{kanji.answer === 'good' ? "AGREGAR" : "QUITAR"}</td>   
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-5 flex justify-center">
            <button 
                className="px-4 py-2 font-bold uppercase bg-white text-black hover:bg-blue-500 hover:text-white rounded-full border-2 border-black col-span-2"
                onClick={() => dispatch({type: 'reset-quest'})}>Volver al inicio</button>
            </div>
        </div>   
    </div>
  )
}

export default Summary