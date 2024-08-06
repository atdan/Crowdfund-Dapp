import { Route, Routes } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header.jsx"
import Home from "./views/Home.jsx"
import { Project } from "./views/Project.jsx"
import { useEffect, useState } from "react"
import { isWalletConnected } from "./services/blockchain.jsx"

const App = () => {
  const[loaded, setLoaded] = useState(false)
  useEffect(async() => {
    await isWalletConnected() // automatically connect to metamask wallet on load
    console.log('Blockchain loaded')
    setLoaded(true)
  }, [])

  return (
    <div className="min-h-screen">
      <Header/>
      { loaded ? (
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/projects/:id" element={<Project/>}/>
        </Routes>
        ): null}

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}

export default App