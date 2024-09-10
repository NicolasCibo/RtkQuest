import { useRef, ChangeEvent } from "react"
import { useQuest } from "../hooks/useQuest"
import { kanjis as db } from "../data/kanjidb"
import { Kanji } from "../types"
import KanjiDetail from "../components/KanjiDetail"
import SearchTable from "../components/SearchTable"


function Search() {


  const { state, dispatch } = useQuest()
  const {searchFilter} = state

  const kanjiView = useRef<HTMLDivElement>(null)

  const handleTable = (id : number) => {
    dispatch({type: 'search-from-table', payload: {id}})
  }

  const handleSearch = (e : ChangeEvent<HTMLInputElement>) => {
    const changeKanji = e.target.value.toLowerCase()
    const filter : Kanji[] = db.filter(kanji => kanji.keyword.toLowerCase().includes(changeKanji)).sort((a,b) => a.id - b.id)
    dispatch({type: 'filter-search-list', payload: {filter}})
  }

  const scrollToElement = () => {
    if(window.innerWidth <= 768){
      kanjiView.current && kanjiView.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="max-w-4xl mx-auto rounded-xl py-8 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-20 mt-5">
        <div>    
          <KanjiDetail kanjiView={kanjiView}/>
        </div> 

        <div>
          <div className="mb-5 text-center">
            <input type="text" placeholder="Buscar por palabra clave..." onChange={handleSearch}
                className="w-[95%] py-2 pl-2 border text-black rounded-lg outline-none focus:border-blue-500" />
          </div>

          <div className="flex items-center justify-center">
            <SearchTable 
              list={searchFilter}
              handleTable={handleTable}
              scrollToElement={scrollToElement}
            />   
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search