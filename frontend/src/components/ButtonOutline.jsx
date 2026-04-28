import React from 'react'

const ButtonOutline = ({text}) => {
    return (
        <button className="text-slate-500 cursor-pointer w-fit py-2.5 px-5 border bordr-slate-500 hover:bg-slate-100 rounded">
            {text}
        </button>
    )
}

export default ButtonOutline