import { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import { getCarThunk, addProductsThunk, deleteSideProductThunk, editSideProductThunk, editCar } from "../store/slices/car.slice";
import Button from "react-bootstrap/Button";

// SidePruchases.js
// ... importaciones ...

const SidePruchases = ({ show, handleClose }) => {
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');

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
        <Offcanvas.Title>Tus productos</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ul>
          {products.map((item) => (
            <li
              key={item.id}
              style={{ border: "1px solid black", marginBottom: "1rem" }}
            >
              <h5>{item.product.title}</h5>
              <img
                src={item.product.images?.[0].url}
                alt=""
                style={{ width: 100, objectFit: "contain" }}
              />
              <h5>{item.quantity}</h5>
              <button
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

              <button
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
              <h5>${item.product.price}</h5>
              <button onClick={() => dispatch(deleteSideProductThunk(item.id))}>
                delete
              </button>
            </li>
          ))}
        </ul>
        <button onClick={() => dispatch(addProduct())}>Checkout</button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SidePruchases;
