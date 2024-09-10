import { useNavigate } from "react-router-dom"
import Form from "../components/Form"
import { useQuest } from "../hooks/useQuest"

function IndexPage() {

  const { state } = useQuest()
  const navigate = useNavigate()

  return (
    <div className="flex flex-col max-w-4xl mx-auto text-white rounded-xl py-8">
      <p className="text-lg md:text-xl px-5">
        El objetivo de este proyecto es afianzar los caracteres aprendidos en  
        <em> Remembering the Kanji</em> con el método que recomienda el mismo.
      </p>

      <p className="text-lg md:text-xl px-5 mt-2">
        En la lección 5 se nos explica que el método es hacer una serie de tarjetas que por un lado contenga la palabra clave del Kanji,
        y por el otro lado el Kanji.
      </p>

      <p className="text-lg md:text-xl px-5 mt-2">
        Ya sea que utilices este proyecto para repasar u otras aplicaciones, 
        recuerda <strong className="uppercase text-orange-100">repasar desde la palabra clave al Kanji, nunca al contrario.</strong>
      </p>

      {!state.questStart ? (
        <Form /> 
        ) : (
        <button onClick={() => navigate('/quest')}
          className="text-xl md:text-4xl text-center px-5 mt-10 hover:text-gray-400"
        >Quest en curso...</button>
      )}
    </div>
  )
}

export default IndexPage