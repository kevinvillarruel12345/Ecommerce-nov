import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useSelector, useDispatch } from "react-redux";
import { filterCategoryThukn, getProductThunk, filterHeadlineThunk } from "../store/slices/products.slice";
import { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCartShopping } from '@fortawesome/free-solid-svg-icons'

const Home = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [categoryId, setCategoryId] = useState([])  

  //Buscador
  const [inputSearch, setInputSearch] = useState("")  

  useEffect(() => {
    dispatch(getProductThunk());

    axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/categories')
    .then(res =>  setCategoryId(res.data) )
    .catch(error => console.error(error))
  }, []);

 
 

  return (
   
      <Container>
        
        
        <Row className="py-3" >
          {
            categoryId.map(res => (
          <Col key={res.id}>
            <Button className="w-100" onClick={() => dispatch(filterCategoryThukn(res.id) )}> {res.name}</Button>
          </Col>

            ))
          }
            <Col>
              <Button onClick={() => dispatch(getProductThunk())} className="w-100">All</Button>
            </Col>
        </Row>
        <Row className="py-3" >
          <Col>
              <InputGroup className="mb-3">
              <Form.Control
                placeholder="Busca un producto"
                aria-label="Product"
                aria-describedby="basic-addon2"
                value={ inputSearch }
                onChange={e => setInputSearch(e.target.value)  }
              />
              <Button variant="outline-primary" onClick={ () => dispatch( filterHeadlineThunk(inputSearch))}>Buscar</Button>
            </InputGroup>
          </Col>
        </Row>
        <Row xs={1} md={2} lg={3} className="py-3">
          {products.map((res) => (
            <Col className='mb-3 ' key={res.id}  style={{ maxWidth: '400px',  maxHeight: '500px'  }} >
              <Card as={Link} to={`/product/${res.id}`}  style={{  maxWidth: '400px',  maxHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration:'none', minHeight:'500px' }}> 
                    <Card.Img variant="top" src={res.images[0]?.url}  key={res.id} style={{ maxWidth: '208.52px',  maxHeight: '199px',  minWidth: '208px', minHeight: '199px', width: '80%', height: '80%',  margin: 'auto', objectFit: 'contain'  }}/>
                <Card.Body className="body-home">
                  <Card.Title >{res.brand}</Card.Title>
                  <Card.Text >
                    <h6 >
                    {res.title}
                      </h6>
                  </Card.Text>
                  <Card.Text >
                    <h5>Price:</h5>
                   <h6 > ${res.price}</h6> 
                  </Card.Text>
                </Card.Body>
                  <Button className="buy-home" as={Link} to={`/product/${res.id}`} variant="primary" style={{ borderRadius:'100%'  } }><FontAwesomeIcon style={{color:'white',  width:'20px', height:'30px', display:'flex', alignItems:'center', borderRadius:'100%' } } icon={faCartShopping}/> </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </Container> 
  );
};

export default Home;