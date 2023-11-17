import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { createProductThunk } from "../store/slices/car.slice";
import { useDispatch } from "react-redux";
import Carousel from "react-bootstrap/Carousel";

//import recomendaciones
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const ProductDetail = () => {
  const { id } = useParams();
  const [detail, setdetail] = useState({});
  const [counter, setCounter] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
      .then((res) => setdetail(res.data))
      .catch((error) => console.error(error));
  }, []);

  const addProduct = () => {
    const data = {
      quantity: counter,
      productId: id,
    };
    dispatch(createProductThunk(data));
  };

  return (
    <div className="product-detail">
      <Carousel
        data-bs-theme="dark"
        style={{ width: "300px", height: "270px", margin: "65px" }}
      >
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={detail.images?.[0].url}
            alt="First slide"
            style={{ maxHeight: "220px", minHeight: "220px" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={detail.images?.[1].url}
            alt="First slide"
            style={{ maxHeight: "220px", minHeight: "220px" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={detail.images?.[2].url}
            alt="First slide"
            style={{ maxHeight: "220px", minHeight: "220px" }}
          />
        </Carousel.Item>
      </Carousel>
      <div className="product-detail-solo">
        <section className="detail-description">
          <h6>{detail.brand}</h6>
          <h5>{detail.title}</h5>
          <p className="p-detail">{detail.description}</p>
        </section>
        <section className="quantity-detail">
          <h6>Price:</h6>
          <h6 className="quantity-side" >quantity:</h6>
          <h5>{detail.price}</h5>
          <div className="mb-3">
            <button className="mat-detail" onClick={() => setCounter(counter + 1)}>+</button>
            {counter}
            <button className="mat-detail" onClick={() => setCounter(counter - 1)}>-</button>
          </div>
          <div className="mb-3"></div>
        </section>
        <button className="btn-detail" onClick={() => addProduct()}>
          añadir al carrito{" "}
        </button>
      </div>
      {/*recomendaciones*/}
      
    </div>
  );
};

export default ProductDetail;
