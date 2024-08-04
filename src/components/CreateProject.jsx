import { FaTimes } from "react-icons/fa"
import { useGlobalState, setGlobalState } from "../store"
import { useState } from "react"
import { createProject } from "../services/blockchain"
import { toast } from "react-toastify"

export const CreateProject = () => {
    const [createModal] = useGlobalState('createModal')

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [cost, setCost] = useState('')
    const [date, setDate] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    const toTimestamp = (dateStr) => {
        const dateObj = Date.parse(dateStr);
        return dateObj/1000
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!title || !description || !cost || !date || !imageUrl) return

        const params = {
            title,
            description,
            cost,
            expiresAt: toTimestamp(date),
            imageUrl
        }
        console.log(params)

        await createProject(params);
        toast.success('Project created successfully, will reflect in 30 seconds')
        onClose()
    }

    const onClose = () => {
        setGlobalState('createModal', 'scale-0')
        reset()
    }

    const reset = () => {
        setTitle('')
        setDescription('')
        setCost('')
        setImageUrl('')
        setDate('')
    }
  return (
    <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
         bg-black bg-opacity-50 transform transition-transform scale-100 ${createModal}`}>

            <div className="bg-white shadow-xl shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">Add Project</p>
                        <button type="button" className="border-0 bg-transparent focus:outline-none"
                            onClick={onClose}>
                            <FaTimes />
                        </button>
                    </div>

                    <div className="flex justify-center items-center mt-3">
                        <div className="rounded-xl overflow-hidden h-20 w-20 flex justify-center items-center">
                             <img
                                src={imageUrl || 
                                    'https://www.chainalysis.com/wp-content/uploads/2022/02/bloggraphic-blockchains-01-1-1500x818.png'
                                }
                                alt='project title'
                                className='rounded-xl h-64 object-cover cursor-pointer'/> 
                        </div>
                    </div>

                    <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
                
                        <input className="block w-full bg-transparent border-0 
                            text-sm text-slate-500 focus:outline-none focus:ring-0 p-2"
                            type="text"
                            name="title"
                            placeholder="Title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            required/>
                    </div>

                    <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
                
                        <input className="block w-full bg-transparent border-0 
                            text-sm text-slate-500 focus:outline-none focus:ring-0 p-2"
                            type="number"
                            step={0.01}
                            min={0.01}
                            name="cost"
                            placeholder="Cost (ETH)"
                            onChange={(e) => setCost(e.target.value)}
                            value={cost}
                            required/>
                    </div>

                    <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
                
                        <input className="block w-full bg-transparent border-0 
                            text-sm text-slate-500 focus:outline-none focus:ring-0 p-2"
                            type="date"
                            name="date"
                            placeholder="Expires"
                            onChange={(e) => setDate(e.target.value)}
                            value={date}
                            required/>
                    </div>

                    <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
                
                        <input className="block w-full bg-transparent border-0 
                            text-sm text-slate-500 focus:outline-none focus:ring-0 p-2"
                            type="url"
                            name="imageUrl"
                            placeholder="Image URL"
                            onChange={(e) => setImageUrl(e.target.value)}
                            value={imageUrl}
                            required/>
                    </div>

                    <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
                
                        <textarea className="block w-full bg-transparent border-0 
                            text-sm text-slate-500 focus:outline-none focus:ring-0 p-2"
                            type="text"
                            name="description"
                            placeholder="Description"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            required></textarea>
                    </div>

                    <button type="submit" className='inline-block px-6 py-2.5 bg-green-600 mt-5
                    text-white font-medium text-md leading-tight rounded-full shadow-md hover:bg-green-700'>
                    Submit Project
                </button>
                </form>
            </div>
         </div>
  )
}
