import { configureStore } from "@reduxjs/toolkit";
import products from "./slices/products.slice";
import car from './slices/car.slice'
//pendiente de solucionar
import loading from './slices/Loading.slice'

export default configureStore({
  reducer: {
    products,
    car,
 
  },
});
