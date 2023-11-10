import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import getConfig from '../../utils/getConfig';


export const carSlice = createSlice({
		name: 'products',
    initialState: [],
    reducers: {
      setCar: (state, action) => {
        return action.payload
      },
      removeCar: (state, action) => {
        const id = action.payload;
        return state.filter((car) => car.id !== id); 
      },
      editCar: (state, action) => {
        const {productId, newQuantity} = action.payload

        return state.map((product) => (
          product.id === productId ? { ...product, quantity: newQuantity } : product
        ))
      },
        }
})
export const getCarThunk = () => dispatch => {
   // aquí se añade getToken porque es una ruta protegida y es necesario pasarle el token para que nos de acceso
   axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/cart', getConfig())
   .then( res => dispatch(setCar(res.data)) )
   .catch(error => console.error(error))
 }
 //getconfig me envía la validación del token para poder acceder
 export const createProductThunk = data => dispatch => {
    axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/cart', data, getConfig() )
    .then(() => dispatch( getCarThunk() ) )
    .catch(error => console.error(error))
 }
 //importante hay que dejar un objeto vacio, lo toma como un boddy pero vacio y no lo toma en cuenta, pero funciona la app
 export const addProductsThunk = () => dispatch =>  {
  axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/purchases', null, getConfig() )
  .then(() => dispatch(getCarThunk() ) )
  .catch((error) => console.error(error))
 }

 //toma el id de removeCar 
 export const deleteSideProductThunk = (id) => dispatch => {
  axios.delete(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}`,  getConfig())
  .then(() => {
    
    dispatch(getCarThunk())
  })
  .catch(error => console.error(error))
 }

 
 export const editSideProductThunk = (productId, newQuantity) => (dispatch) => {
  axios
    .put(
      `https://e-commerce-api-v2.academlo.tech/api/v1/cart/${productId}`,
      { quantity: newQuantity },
      getConfig()
    )
    .then(() => dispatch(getCarThunk()))
    .catch((error) => console.error(error));
};
 

export const { setCar, editCar } = carSlice.actions;

export default carSlice.reducer;