import React, {useState} from 'react'


const Basic1 = () => {
    const [product, setProducts] = useState({name: "", oprice: ""})

    return (
        // 必ず<div>で囲む必要がある
        <div>
            <form>
                <input type="text" value={product.name}
                onChange={evt => setProducts({...product, name: evt.target.value})}></input>
                
                <input type="text" value={product.price}
                onChange={evt => setProducts({...product, price: evt.target.value})}></input>
            </form>
            <h3>Product name is {product.name}</h3>
            <h3>Product price is {product.price}</h3>
        </div>
    )
}

export default Basic1
