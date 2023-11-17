import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import userimg from '../assets/user.png'

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
    <div>
    {
        token ? <div  className="button-login" >
                    <img src={userimg} alt="" className="img-login"/>
                    <p  >kevin Villarruel</p>
                    <Button onClick={logout} style={{ marginTop:'10%', marginBottom:'5%', borderRadius:'5%' }} >cerrar sesión </Button>
                </div>  :
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
          <Form.Label style={{backgroundColor:'#d8f5fd', height: '90%', width: '90%',}}> 
            <h3>Test data</h3>
            <h6>Enter your email and password for continue</h6>
                <ul style={{ listStyle: 'none', textAlign: "left" }} >
                  <li>akevinkaiz@gmail.com</li>
                  <li>123456</li>
                </ul>
          </Form.Label>
          <h6 style={{textAlign: "left" }}>Email</h6>
          <Form.Control style={{textAlign: "left" }}
            type="email"
            placeholder=""
            {...register("email")}
          />
        </Form.Group >
        <Form.Group className="mb-3" controlId="formBasicPassword" style={{textAlign: "left" }} >
          <Form.Label >Password</Form.Label>
          <Form.Control
            type="password"
            //placeholder="Password"
            {...register("password")}
          /> 
        </Form.Group>
        <Button style={{ width: '100%', height: '100%' }} variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
    }
    </div>
  );
};

export default Login;
