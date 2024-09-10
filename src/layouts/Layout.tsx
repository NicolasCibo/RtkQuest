import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import { useEffect } from "react"
import { useQuest } from "../hooks/useQuest"

function Layout() {

  const { state } = useQuest()

  useEffect(() => {
    localStorage.setItem('kanjiQuest', JSON.stringify(state.kanjiQuest))
    localStorage.setItem('current', JSON.stringify(state.current))
    localStorage.setItem('reviewKanji', JSON.stringify(state.reviewKanji))
    localStorage.setItem('questStart', JSON.stringify(state.questStart))
  }, [state.kanjiQuest, state.reviewKanji])

  return (
    <>
      <Header />
      <Outlet />

    </>
  )
}

export default Layout