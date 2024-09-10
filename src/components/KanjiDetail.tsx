import { useQuest } from "../hooks/useQuest"
import useMediaQuery from '@mui/material/useMediaQuery'

type KanjiDetailProps = {
  kanjiView: React.RefObject<HTMLDivElement>
}

function KanjiDetail({kanjiView} : KanjiDetailProps) {

  const { state } = useQuest()
  const {searchKanji} = state

  const isMobile = useMediaQuery('(max-width: 768px)')

  const searchKanjiLink = `https://www.kakimashou.com/dictionary/character/${searchKanji.kanji}`

  const kanjiNumber = () => {
    if(searchKanji.id < 10){
      return `000${searchKanji.id}`
    }else if(searchKanji.id >= 10 && searchKanji.id < 100){
      return `00${searchKanji.id}`
    }else if(searchKanji.id >= 100){
      return `0${searchKanji.id}`
    }else{
      return searchKanji.id
    }
  }

  return (
    <>
      {isMobile ? (
        <div className="border border-white rounded-sm w-[95%] mx-auto" ref={kanjiView}>
          <div className="flex justify-around mt-2 px-2">
            <h3 
              className="text-4xl text-center font-bold"
              title={searchKanji.keyword}
            >{searchKanji.keyword}</h3>
            <p className='text-4xl font-bold'>{kanjiNumber()}</p>
          </div>
          <div className="flex justify-center">
            <h3 className='text-[9rem]'>{searchKanji.kanji}</h3>
          </div>
          <div className="flex justify-around">
            <div className="text-center">
              <h3 className='text-4xl'>{searchKanji.strokes}</h3>
              <p>Trazos</p>
            </div>
            <div className="text-center">
              <h3 className='text-4xl'>{searchKanji.lesson}</h3>
              <p>Lección</p>
            </div>
          </div>
          <div className="text-center my-3">
            <a href={searchKanjiLink} className="uppercase text-xl font-bold text-blue-500 hover:cursor-pointer">Más información</a>
          </div>
        </div>
      ):(
        <div className='grid grid-cols-3 grid-rows-4 mx-auto gap-2 text-center w-78 justify-center items-center fixed' ref={kanjiView}>
          <div className="my-auto col-span-2 px-6 py-11 border border-white rounded-xl">
            <h3 
              className="text-2xl font-bold mx-auto max-w-[200px] truncate"
              title={searchKanji.keyword}
              >{searchKanji.keyword}</h3>       
          </div>

          <div className='my-auto mx-auto px-4 py-10 border border-white rounded-xl'>
            <h3 className='text-4xl font-bold p'>{kanjiNumber()}</h3>
          </div>

          <div className='col-span-2 row-span-2 my-auto p-2 border border-white rounded-xl'>
            <h3 className='text-[10rem]'>{searchKanji.kanji}</h3>
          </div>

          <div className='row-span-2 my-auto mx-auto px-9 py-24 border border-white rounded-xl'>
            <h3 className='text-4xl'>{searchKanji.strokes}</h3>
            <p>Trazos</p>
          </div>

          <div className='my-auto p-9 border border-white rounded-xl'>
            <h3 className='text-xl'>{searchKanji.lesson}</h3>
            <p>Lección</p>
          </div>

          <div className='text-xl md:col-span-2 my-auto p-12 border border-white rounded-xl'>
            <a href={searchKanjiLink} className="text-blue-500 hover:text-blue-400 hover:cursor-pointer">Más información</a>
          </div>      
        </div>
      )}
    </>  
  )
}

export default KanjiDetail