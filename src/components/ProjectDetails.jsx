import Identicon from 'react-identicons'
import { FaEthereum } from 'react-icons/fa'
export const ProjectDetails = () => {
  return (
    <div className='py-24 px-6 flex justify-center'>
        <div className='flex justify-center flex-col md:w-2/3'>
            <div className="flex justify-start items-start sm:space-x-4 flex-wrap">
                <img
                src='https://www.chainalysis.com/wp-content/uploads/2022/02/bloggraphic-blockchains-01-1-1500x818.png'
                alt='project title'
                className='rounded-xl h-64 object-cover w-full sm:w-1/3'/> 

                <div className="flex-1 sm:py-0 py-4">
                    <div className="flex flex-col justify-start flex-wrap">
                        <h5 className="text-gray-900 text-sm font-medium mb-2">Creating a File Blockchain</h5>
                        <small className="text-gray-500">2 days left</small>
                    </div>

                    <div className="flex justify-between items-center w-full pt-1">
                        <div className="flex justify-start space-x-2">
                            <Identicon className='rounded-full shadow-md' string='0x9e...13af' size={15}/>
                            <small className="text-gray-700">0x9e...13af</small>
                            <small className="text-gray-500 font-bold">{16} Backing</small>
                        </div>


                        <div className="font-bold">
                            <small className="text-gray-500">Open</small>
                        </div>
                    </div>
                    
                </div>
            </div>

            <p className='text-sm font-light mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam doloremque labore nihil. Totam alias modi distinctio consectetur ut, beatae est enim eum recusandae saepe debitis nisi facilis quisquam. Alias, iure.</p>
            <div>
                <div className='w-full bg-gray-300 mt-4'>
                    <div className='bg-green-600 text-xs font-medium text-green-100 
                    text-center p-0.5 leading-none rounded-l-full h-1' style={{width: '50%'}}>
                    </div>
                </div>
            </div>

            <div className='flex justify-between items-center font-bold mt-2'>
                <small>{3} ETH Raised</small>
                <small className='flex justify-start items-center'>
                    <FaEthereum />
                    <span>{10} ETH</span>
                </small>
            </div>

            <div className='flex justify-start items-center space-x-2 mt-4'>
                <button className='inline-block px-6 py-2.5 bg-green-600
                text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-green-700'>
                    Back Project
                </button>

                <button className='inline-block px-6 py-2.5 bg-gray-600
                text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-700'>
                    Edit
                </button>

                <button className='inline-block px-6 py-2.5 bg-red-600
                text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700'>
                    Delete
                </button>

                <button className='inline-block px-6 py-2.5 bg-orange-600
                text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-orange-700'>
                    Payout
                </button>
            </div>
        </div>
    </div>
  )
}
