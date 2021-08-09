import React from 'react'

const CountClick = ({handleClick, children}) => {

    return (
        <div>
            <button onClick={handleClick}>{children}</button>
        </div>
    )
}

export default React.memo(CountClick)
