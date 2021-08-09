import React from 'react'

const CountDisplay = ({name, count}) => {

    return (
        <div>
            {count}
        </div>
    )
}

export default React.memo(CountDisplay)
