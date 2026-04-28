import React from 'react'

const Button = ({text}) => {
    return (
        <button className="cursor-pointer w-fit py-2.5 px-5 bg-blue-500 hover:bg-blue-600 text-white rounded">
            {text}
        </button>
    )
}

export default Button