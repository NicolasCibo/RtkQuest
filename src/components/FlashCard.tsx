import { useQuest } from "../hooks/useQuest"


function FlashCard() {

    const { state, dispatch } = useQuest()
    const {current, kanjiQuest, reveal} = state

    const handleResponse = (answer : string) => {
        const id = current
        dispatch({type: 'kanji-answer', payload: {answer, id}})
    }

  return (
    <>
        <div>
            <p className="text-xl text-center mb-5">{`Cantidad: ${current+1}/${kanjiQuest.length}`}</p>
            <h3 className="text-4xl font-bold text-center uppercase">{kanjiQuest[current].keyword}</h3>

            <div className="flex flex-col relative max-w-xs mx-auto mt-8 rounded-sm border-white border-4">
                <h3 className="text-center text-9xl mb-4">{!reveal ? '?' : kanjiQuest[current].kanji}</h3>
                <p className="self-end -mb-1 -mr-1 max-w-max max-h-max border-4 border-white p-1 font-bold">{!reveal ? '???' : kanjiQuest[current].id}</p>              
            </div>
        </div>

        {current !== kanjiQuest.length ? (
                !reveal ? 
                <div className="flex justify-center mt-5">
                <button 
                    className="p-2 font-bold uppercase bg-white text-black hover:bg-gray-500 hover:text-white rounded-full border-2 border-black"
                    onClick={() => dispatch({type: 'reveal-kanji'})}>Revelar</button>
                </div> 
                :
                <div className="flex justify-center mt-5 gap-3">
                    <button 
                        className="p-2 font-bold uppercase bg-white text-black hover:bg-green-500 hover:text-white rounded-full border-2 border-black"
                        onClick={() => handleResponse('good')}>Bien</button>
                    <button 
                        className="p-2 font-bold uppercase bg-white text-black hover:bg-red-500 hover:text-white rounded-full border-2 border-black"
                        onClick={() => handleResponse('bad')}>Mal</button>      
                </div> 
            ) : (
                null
            )
        }
    </>  
  )
}

export default FlashCard