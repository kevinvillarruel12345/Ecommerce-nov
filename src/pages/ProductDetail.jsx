import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { createProductThunk } from '../store/slices/car.slice'
import { useDispatch } from 'react-redux'

const ProductDetail = () => {
  const { id } = useParams()
  const [detail, setdetail] = useState({})
  const [counter, setCounter] = useState(1)
  const dispatch = useDispatch()
 
  useEffect(() => {
    axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
    .then(res => setdetail(res.data))
    .catch(error => console.error(error) )
  }, [])

  const addProduct = () => {
    const data = {
      quantity : counter,
      productId : id
    }
    dispatch( createProductThunk(data) )
  }
  
  return (
    <>
    
    <div><h1>{detail.title}</h1></div>
    <section>
    <img src={detail.images?.[0].url} alt="" />
      <p>{detail.description}</p>
    </section>
    <div className='mb-3'>
      <button onClick={() => setCounter(counter + 1)} >+</button>
          {counter}
      <button onClick={() => setCounter(counter - 1  )}>-</button>
    </div>
    <div className='mb-3'>
    <button onClick={ () =>  addProduct()} >añadir al carrito </button>
    </div>
    
    </>
  )
}

export default ProductDetail