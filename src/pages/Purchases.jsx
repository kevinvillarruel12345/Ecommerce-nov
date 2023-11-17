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
  <Card.Img variant="top" style={{ width: '22%', maxHeight: '140px' }} src={item.product.images?.[0].url} />
  <Card.Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '500px', marginLeft:'400px' }}>
    <Card.Title style={{ fontSize: '14px', marginBottom: '8px' }}>{item.product.title}</Card.Title>
    <div style={{ display: 'flex',  width: '100%', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center',  }}>
        <Card style={{ height: '10%', width: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
          {item.quantity}
        </Card>
        <Card.Text>
          ${item.product.price}
        </Card.Text>
      </div>
    </div>
  </Card.Body>
</Card>

        ))
        
        }
    </div>
  )
}

export default Purchases