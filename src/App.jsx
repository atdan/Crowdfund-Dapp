import { Route, Routes } from "react-router-dom"
import Header from "./components/Header.jsx"
import Home from "./views/Home.jsx"
import { Project } from "./views/Project.jsx"

const App = () => {
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