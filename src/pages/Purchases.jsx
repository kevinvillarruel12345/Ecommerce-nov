import axios from 'axios'
import { useEffect, useState } from 'react'
import getConfig from '../utils/getConfig'
import Card from 'react-bootstrap/Card';




const Purchases = () => {
    const [getPurchases, setgetPruchases] = useState([])

    useEffect(() => {
      axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/purchases', getConfig())
      .then( (res) => setgetPruchases(res.data) )
      .catch( (error) => console.error(error)
       )
    }, [])
    


  return (
    <div>
        {getPurchases.map((item) => (
             <Card style={{ width: '100%', display: 'flex', flexDirection: 'row' }} key={item.id}>
             <Card.Img variant="top" style={{ width: '30%' }} src={item.product.images?.[0].url} />
             <Card.Body>
               <Card.Title>{item.product.title} N:{item.quantity}</Card.Title>
               <Card.Text>
                 Some quick example text to build on the card title and make up the
                 bulk of the card's content.
               </Card.Text>
             </Card.Body>
           </Card>
        ))
        
        }
    </div>
  )
}

export default Purchases