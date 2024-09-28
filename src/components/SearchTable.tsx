import { useState, useEffect } from "react"
import { Kanji } from "../types"

type SearchTableProps = {
    list: Kanji[]
    handleTable?: (id: number) => void
    scrollToElement?: () => void
}

function SearchTable({list, handleTable = () => {}, scrollToElement = () => {}} : SearchTableProps) {

    const [visibleItems, setVisibleItems] = useState(100)
    const isScrollable = list.length > 25

    const loadMoreItems = () => {
        if (visibleItems < list.length) {
            setVisibleItems((prevItems) => prevItems + 100)
        }
    }

    const handleScroll = () => {
        const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1
        if (bottom){
            loadMoreItems()
        }    
    }    

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [visibleItems])

  return (
    <div className={`${isScrollable ? 'md:h-[90%] md:scrollbar-custom overflow-y-scroll' : 'overflow-y-auto'} mt-10 mr-5 p-2`}>
        <table className="min-w-full table-auto">
            <thead className="top-0 bg-[#2a2a2a] z-10">
            <tr className='border'>
                <th className="text-2xl text-center font-bold p-2">Caracter</th>
                <th className="text-2xl text-center font-bold p-2">Palabra Clave</th>
                <th className="text-2xl text-center font-bold p-2">Número</th>
            </tr>
            </thead>
            <tbody>
            {list.slice(0, visibleItems).map(filter => (
                <tr 
                key={filter.id} 
                className="text-center border hover:bg-blue-500 hover:text-white hover:cursor-pointer"
                onClick={() => {handleTable(filter.id); scrollToElement()}}
                >
                    <td className='border-r'>{filter.kanji}</td>
                    <td className='border-r'>{filter.keyword}</td>
                    <td>{filter.id}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
  )
}

export default SearchTable