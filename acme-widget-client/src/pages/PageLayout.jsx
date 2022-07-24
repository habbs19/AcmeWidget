import React, { useState } from "react";

export const PageLayout = (props) => {

    const [isRegistered, setRegistered] = useState(false)


    const Register = () => {
        
        return (
            <>
                <div>Please sign up to see other participants</div>
            </>
        )
    }


    return (
        <>
            {isRegistered ? props.children : <Register/>}

        </>
    );
};
