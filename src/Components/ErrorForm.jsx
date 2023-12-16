import React from 'react'

const ErrorForm = ({ setErrorPage }) => {
    const removePage = () => {
        setErrorPage(false)
    }
    return (
        <div onClick={removePage} className='bg-red-600 w-64 cursor-pointer  flex absolute top-[20%] hover:bg-red-700 justify-between shadow-lg rounded-lg  py-3 px-4'>
            <p className='font-bold text-white   '>Please Fill the form</p>
            <p className='font-bold  text-xl text-black'><i className="fa-solid fa-x"></i></p>
        </div>
    )
}

export default ErrorForm