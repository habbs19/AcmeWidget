import React, { useContext, useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import API from '../adapters/AcmeWidgetAPI'
import { SignupContext } from '../pages/Home';



const ActivityForm = () => {

    const { setRegistered } = useContext(SignupContext)
    const [activityOptions, setActivityOption] = useState([])
    const navigate = useNavigate()

    const defaultValues = {
        firstname: '',
        lastname: '',
        email: '',
        activity: [],
        comments: ''
    }
    const { control, formState: { errors }, handleSubmit, reset } = useForm(defaultValues);


    useEffect(() => {
        API.get('/activity/type').then((res) => {
            const options = Object.keys(res.data).map(key => ({ value: key, label: res.data[key] }))
            setActivityOption(options)
        })

    }, [])

    const submit = (data) => {

        const body = {
            Employee: {
                FirstName: data.firstname,
                LastName: data.lastname,
                EmailAddress: data.email
            },
            Activity: {
                Type: Number(data.activity)
            },
            Comments: data.comments
        }

        console.log('body', body)
        API.post('/activity', body, null).then((res) => {
            setRegistered(true)
            navigate('/home/listing')
        }).catch(err => {
            alert('Sorry, we received an error: ' + err.message)
        })


    }

    const errorMsg = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    return (
        <>
            <form>
                <h4>Please enter details to sign up:</h4>
                <div class="formgrid grid">
                    <div class="field col">
                        <label htmlFor='firstname'>Firstname</label>
                        <Controller name='firstname' control={control} defaultValue={defaultValues.firstname}
                            rules={{ required: 'First name required.' || true, pattern: { value: /^[a-zA-Z]+$/, message: 'Must be letters only' } }}
                            render={({ field }) => (
                                <>
                                    <div className=''></div>
                                    <InputText {...field} className='w-full' />


                                </>
                            )} />
                        {errorMsg('firstname')}
                    </div>
                    <div class="field col">
                        <label htmlFor="lastname">Lastname</label>
                        <Controller name='lastname' control={control} defaultValue={defaultValues.lastname}
                            rules={{ required: 'Last name required.' || true, pattern: { value: /^[a-zA-Z]+$/, message: 'Must be letters only' } }}
                            render={({ field }) => (
                                <>
                                    <InputText {...field} className='w-full' />
                                </>
                            )} />
                        {errorMsg('lastname')}
                    </div>
                </div>
                <div class="formgrid grid">
                    <div class="field col">
                        <label htmlFor="email">Email</label>
                        <Controller name='email' control={control} defaultValue={defaultValues.email}
                            rules={{ required: 'Email required.' || true, pattern: { value: /^.+@.+$/, message: 'Invalid email type' } }}
                            render={({ field }) => (
                                <>
                                    <InputText {...field} className='w-full' />
                                </>
                            )} />
                        {errorMsg('email')}
                    </div>
                    <div class="field col">
                        <label htmlFor='activity'>Activity</label>
                        <Controller name='activity' control={control} defaultValue={defaultValues.activity}
                            rules={{ required: 'Please select an activity.' || true }}
                            render={({ field }) => (
                                <>
                                    <Dropdown {...field} options={activityOptions} placeholder="Select an Activity" className='w-full' />
                                </>
                            )} />

                        {errorMsg('activity')}
                    </div>
                </div>
                <div class="formgrid grid">
                    <div class="field col">
                        <label htmlFor='comments'>Comments</label>
                        <Controller name='comments' control={control} defaultValue={defaultValues.comments}
                            rules={{ maxLength: 'Reached maximum length.' || 1000 }}
                            render={({ field }) => (
                                <>
                                    <InputTextarea rows={5} cols={30} {...field} autoResize={false} style={{ resize: 'none' }} className='w-full' />

                                </>
                            )} />

                        {errorMsg('comments')}
                    </div>
                </div>

            </form>
            <div className="flex flex-row-reverse flex-wrap card-container">
                <div className='m-1'> <Button icon="pi pi-check" iconPos="right" onClick={handleSubmit(submit)} label='Submit' /></div>
                <div className='m-1'>  <Button className='p-button-secondary' onClick={() => reset(defaultValues)} label='Clear' /></div>
            </div>

        </>
    )
}


export default ActivityForm;