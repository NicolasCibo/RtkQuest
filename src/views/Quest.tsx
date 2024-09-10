import FlashCard from "../components/FlashCard"
import Summary from "../components/Summary"
import Form from "../components/Form"
import { useQuest } from "../hooks/useQuest"

function Quest() {

    const { state, dispatch } = useQuest()
    const {questStart, current, kanjiQuest} = state

    const confirmAction = () => {
        const response = window.confirm('¿Seguro desea finalizar la quest? Se perderá el progreso.')
        response && dispatch({type: 'reset-quest'})
    }

  return (
    <>
        <div className="flex flex-col max-w-4xl mx-auto text-white rounded-xl py-8">
            {!questStart ? <Form /> : (
                current !== kanjiQuest.length ? <FlashCard /> : <Summary />
            )}
            
            {current !== kanjiQuest.length && (
                    <div className="flex justify-center mt-20 border-t border-opacity-20 border-slate-400">
                    <button 
                        className="px-8 py-2 mt-3 font-bold uppercase bg-white text-black hover:bg-blue-500 hover:text-white rounded-full border-2 border-black col-span-2"
                        onClick={confirmAction}>Finalizar Quest</button>
                    </div>
                )
            }          
        </div>
    </>
  )
}

export default Quest