import React, { useContext, useEffect, useState } from 'react'
import { Card } from 'primereact/card';
import API from '../adapters/AcmeWidgetAPI';
import { SignupContext } from './Home';
import ParticipantCard from '../components/ParticipantCard';

import '../styles/Pages.css'

const Listing = () => {
    
    const [list, setList] = useState()
    const {registered} = useContext(SignupContext)

    useEffect(() => {
        if (registered) {
            API.get('/activity/list').then(res => {
                setList(res.data)
            })
        }
       
    }, [])
    
    return (
        <>
            {registered &&
                list?.map((p, i) =>
                    <div className='card-wrapper' key={i}>
                        <ParticipantCard id={p.employee.emailAddress}
                            title={`${p.employee.firstName} ${p.employee.lastName}`}
                            subtitle={p.activity.name}
                            content={p.comments} />
                    </div>
                )
            }

            {!registered &&
                <div className='card-container overflow-hidden'>
                    <div className='flex align-items-center justify-content-center'>
                        <div className='card p-2'>
                            <div>
                                Please sign up to see other participants.
                            </div>
                        </div>
                    </div>
                </div>
            }

        </>
    )
}

export default Listing;