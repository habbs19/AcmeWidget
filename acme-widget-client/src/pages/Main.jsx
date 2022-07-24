import React from 'react'
import { Link } from 'react-router-dom';

const Main = () => {
    return (
        <>
            <div className='card-container overflow-hidden'>
                <div className='flex align-items-center justify-content-center align-self-center h-screen'>
                    <div className='card m-6 w-30rem border-round border-1 border-double border-primary p-2 flex-initial justify-content-center'>
                        <div className='block flex justify-content-center'>Welcome to Acme Widget Inc.</div>
                        <div className='block flex justify-content-center'><Link to="/home/signup">Sign Up Here!</Link></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main;