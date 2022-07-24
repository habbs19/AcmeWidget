import React from 'react'
import ActivityForm from '../components/ActivityForm';

const SignUp = () => {

    return (
        <>
            <div className='card-container overflow-hidden'>
                <div className='flex align-items-center justify-content-center'>
                    <div className='card m-6 w-30rem border-round border-1 border-double border-primary p-2'>
                        <ActivityForm />
                    </div>
                </div>
            </div>

        </>
    )
}

export default SignUp;