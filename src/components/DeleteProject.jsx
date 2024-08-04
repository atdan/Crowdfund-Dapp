import { FaTimes } from "react-icons/fa"
import { useGlobalState, setGlobalState } from "../store"

export const DeleteProject = () => {
    const [deleteModal] = useGlobalState('deleteModal')
  return (
    <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
         bg-black bg-opacity-50 transform transition-transform scale-100 ${deleteModal}`}>

            <div className="bg-white shadow-xl shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
                <form className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">#Project Title</p>
                        <button type="button" className="border-0 bg-transparent focus:outline-none"
                            onClick={() => setGlobalState('deleteModal', 'scale-0')}>
                            <FaTimes />
                        </button>
                    </div>

                    <div className="flex justify-center items-center mt-5">
                        <div className="rounded-xl overflow-hidden h-20 w-20">
                             <img
                                src='https://www.chainalysis.com/wp-content/uploads/2022/02/bloggraphic-blockchains-01-1-1500x818.png'
                                alt='project title'
                                className='rounded-xl h-64 object-cover cursor-pointer'/> 
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center  rounded-xl mt-5">
                        <p>Are you sure?</p>
                        <small className="text-red-400">This is irreversible</small>
                    </div>

                    <button type="submit" className='inline-block px-6 py-2.5 bg-red-600 mt-5
                    text-white font-medium text-md leading-tight rounded-full shadow-md hover:bg-red-700'>
                    Delete Project
                </button>
                </form>
            </div>
         </div>
  )
}
