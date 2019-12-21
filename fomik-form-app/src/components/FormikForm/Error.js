import React from "react";

const Error = ({ touched, message}) => {
    if(!touched) {
        return <p className='error'>&nbsp;</p>
    }
    if(message) {
        return <p className='error'>{message}</p>
    }
    return <p className='error'></p>
};

export default Error;