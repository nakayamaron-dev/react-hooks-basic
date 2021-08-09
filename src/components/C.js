import React, {useContext} from 'react'
import AppContext from '../contexts/AppContext'

const C = () => {

    //親コンポーネント以外から情報を受取る場合の書き方
    const value = useContext(AppContext)

    return (
        <div>
            <h3>{value}</h3>
        </div>
    )
}

export default C
