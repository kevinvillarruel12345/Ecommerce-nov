import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { setLoading } from './Loading.slice';


export const productSlice = createSlice({
		name: 'products',
    initialState: [],
    reducers: {
        setProduct: (state, action) => {
            return action.payload
        }
    }
})

export const getProductThunk = () => dispatch => {
    dispatch(setLoading(true))

    axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/products')
    .then(res => dispatch(setProduct(res.data)))
    .catch(error => console.error(error))
    .finally(() => dispatch(setLoading(false)))
}

export const filterCategoryThukn = id => dispatch =>  {
    axios.get(` https://e-commerce-api-v2.academlo.tech/api/v1/products?categoryId=${id}` )
    .then(res => dispatch(setProduct(res.data)))
    .catch(error => console.error(error))
}

export const filterHeadlineThunk = valueInput => dispatch =>{
    // ojo hay que añadir en todos el loading, mira el video de la profe.
    axios.get(` https://e-commerce-api-v2.academlo.tech/api/v1/products?title=${valueInput}` )
    .then(res => dispatch(setProduct(res.data)))
    .catch(error => console.error(error))
}
 
export const { setProduct } = productSlice.actions;

export default productSlice.reducer;