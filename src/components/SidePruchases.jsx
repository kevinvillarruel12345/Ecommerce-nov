import { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import {
  getCarThunk,
  addProductsThunk,
  deleteSideProductThunk,
  editSideProductThunk,
  editCar,
} from "../store/slices/car.slice";
import Button from "react-bootstrap/Button";

// SidePruchases.js
// ... importaciones ...

const SidePruchases = ({ show, handleClose }) => {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(getCarThunk());
    }
  }, []);

  // Cambia state.quantity a state.car para reflejar la estructura del estado
  const totalProduct = useSelector((state) => state.car.length);

  const addProduct = () => {
    dispatch(addProductsThunk(totalProduct));
  };

  // Cambia state.quantity a state.car
  const products = useSelector((state) => state.car);

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Carrito de compras</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ul style={{ display:'initial'}} >
          {products.map((item) => (
            <li className="side-purchases"
              key={item.id}
              style={{  marginBottom: "1rem" }}
            >
              <img
                src={item.product.images?.[0].url}
                alt=""
                style={{ width: '100px', objectFit: "contain" }}
              />
              <h5 className="title-side">{item.product.title}</h5>
              
              <button className="btn-side"
                onClick={() =>
                  dispatch(
                    editCar({
                      productId: item.id,
                      newQuantity: item.quantity + 1,
                    })
                  )
                }
              >
                +
              </button>
              <h5 className="quantity-sides">{item.quantity}</h5>
              <button className="btn-side"
                onClick={() =>
                  dispatch(
                    editCar({
                      productId: item.id,
                      newQuantity: item.quantity - 1,
                    })
                  )
                }
              >
                -
              </button>
              <button className="delete-side" onClick={() => dispatch(deleteSideProductThunk(item.id))}>
                de
              </button>
              <h5 className="price-side">${item.product.price}</h5>
            </li>
          ))}
        </ul>
        <div className="check-side">

          <button style={{backgroundColor:'#2789E3', border:'none', width:'300px', height:'40px',  }} onClick={() => dispatch(addProduct())}>Checkout</button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SidePruchases;
