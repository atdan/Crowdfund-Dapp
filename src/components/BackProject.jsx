import { FaTimes } from "react-icons/fa"
import { useGlobalState, setGlobalState } from "../store"

export const BackProject = () => {
    const [backModal] = useGlobalState('backModal')
  return (
    <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
         bg-black bg-opacity-50 transform transition-transform scale-100 ${backModal}`}>

            <div className="bg-white shadow-xl shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
                <form className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">#Project Title</p>
                        <button type="button" className="border-0 bg-transparent focus:outline-none"
                            onClick={() => setGlobalState('backModal', 'scale-0')}>
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

                    <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
                
                        <input className="block w-full bg-transparent border-0 
                            text-sm text-slate-500 focus:outline-none focus:ring-0 p-2"
                            type="number"
                            step={0.01}
                            min={0.01}
                            name="amount"
                            placeholder="Amount (ETH)"
                            required/>
                    </div>

                    <button type="submit" className='inline-block px-6 py-2.5 bg-green-600 mt-5
                    text-white font-medium text-md leading-tight rounded-full shadow-md hover:bg-green-700'>
                    Back Project
                </button>
                </form>
            </div>
         </div>
  )
}
