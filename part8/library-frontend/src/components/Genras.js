import React from 'react'

const Genras = ({genras, onGenraSelected, clear}) => {
    return (
        <div>
            {genras.map(genra => {
                return <button onClick={() => { onGenraSelected(genra) }} key={genra}>{genra}</button>
            })}
            <button onClick={() => { clear() }}>clear</button>
        </div>
    )
}

export default Genras;