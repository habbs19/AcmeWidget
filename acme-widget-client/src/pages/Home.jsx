import React, { useState } from 'react'
import { Route, Routes, Link } from 'react-router-dom';
import Listing from './Listing';
import SignUp from './SignUp';

export const SignupContext = React.createContext({
    registered: false,
    setRegistered: (value) => { }
})

const Home = () => {

    const [registered, setRegistered] = useState(false)

    return (
        <>
            <div className='card-container'>
                <div className='flex align-items-center justify-content-center mt-6'>
                        <ul className='nav-ul'>
                            <li> <Link to='/'>Home</Link></li>
                            <li> <Link to='/home/signup'>SignUp</Link></li>
                            <li>  <Link to="/home/listing">Listing</Link></li>
                        </ul>
                </div>
            </div>
            <SignupContext.Provider value={{ registered, setRegistered }}>
                <div className='main'>
                    <Routes>
                        <Route exact path='/signup' key='signup' element={<SignUp />} />
                        <Route exact path='/listing' key='listing' element={<Listing />} />
                    </Routes>
                </div>
            </SignupContext.Provider>
        </>
    )
}

export default Home;