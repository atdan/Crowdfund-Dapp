import { Route, Routes } from "react-router-dom"
import Header from "./components/Header.jsx"
import Home from "./views/Home.jsx"
import { Project } from "./views/Project.jsx"
import { useEffect } from "react"
import { isWalletConnected } from "./services/blockchain.jsx"

const App = () => {
  useEffect(async() => {
    await isWalletConnected() // automatically connect to metamask wallet on load
    console.log('Blockchain loaded')
  }, [])
  return (
    <div className="min-h-screen">
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/projects/:id" element={<Project/>}/>
      </Routes>
    </div>
  )
}

export default App