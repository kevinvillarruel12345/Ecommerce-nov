import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const submit = (data) => {
    axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/users/login', data)
      .then(res => {
        //esta parte es la que guarda la información
        localStorage.setItem("token", res.data.token)
        // navigate nos redirecciona en la parte funcional. En este caso al home
        navigate('/')
       })
      .catch(error => {
        if (error.response?.status === 401) {
          alert('datos incorrectos');
        } else {
          console.log(error.response?.status);
        }
      });
  };
  
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }


  return (
    <>
    {
      token ? <Button onClick={logout} >cerrar sesión </Button> :

    <div>
      <Form
        style={{
          maxWidth: 500,
          margin: "7rem auto",
          border: "1px solid balck",
          padding: "1rem",
        }}
        onSubmit={handleSubmit(submit)}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password")}
          /> 
        </Form.Group>
        <Button variant="primary" type="submit">
          Iniciar sesión
        </Button>
      </Form>
    </div>
    }
    </>
  );
};

export default Login;
