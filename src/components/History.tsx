import { useQuest } from "../hooks/useQuest"

function History() {

    const {state, dispatch} = useQuest()
    const {history} = state

    const isScrollable = history.length > 25

    const confirmAction = () => {
        const response = window.confirm('¿Seguro desea finalizar la quest? Se perderá el progreso.')
        response && dispatch({type: 'delete-history'})
    }
    
  return (
    <div className="flex flex-col">
        <div className={`flex flex-col mt-10 p-2 ${isScrollable ? 'md:h-[90%] md:scrollbar-custom overflow-y-scroll' : 'overflow-y-auto'}`}>
            <h3 className="text-3xl font-bold mx-auto mb-5">Registro de Quest realizadas</h3>
            {history.length !== 0 ? (history.map((his, index) => <p key={index}>{his}</p>)) : <p className="mx-auto">¡No hay registros previos!</p>}
        </div>
        {history.length !== 0 ? (
            <button type="button" onClick={confirmAction}
                className="disabled:opacity-10 mx-auto mt-5 py-2 px-4 font-bold uppercase bg-white text-black hover:bg-orange-500 hover:text-white rounded-full border-2 border-black col-span-2"
            >Eliminar historial</button>
        ) : (
            null
        )}
        
    </div>
  )
}

export default History