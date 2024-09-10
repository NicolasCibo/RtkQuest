import { lazy, Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./layouts/Layout"

const IndexPage = lazy(() => import('./views/IndexPage'))
const Quest = lazy(() => import('./views/Quest'))
const Search = lazy(() => import('./views/Search'))


function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<Layout />}> 
              <Route path="/" element={<Suspense><IndexPage /></Suspense>} />
              <Route path="/quest" element={<Suspense><Quest /></Suspense>} />
              <Route path="/search" element={<Suspense><Search /></Suspense>} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter