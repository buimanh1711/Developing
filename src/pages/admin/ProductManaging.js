import ProductList from '../../components/productList'
import ManageFilter from '../../components/ManageFilter'
import { useState, useEffect } from 'react'
import api from '../../utils/axios'

const ProductManager = () => {
  const [products, setProducts] = useState([])
  const [checkPassed, setCheckPassed] = useState(true)

  useEffect(() => {
    api('GET', 'api/auth/admin')
      .then(res => {
        if(res.data && res.data.status) {
          api('GET', `api/products`)
            .then(productRes => {
              if(productRes.data && productRes.data.status) {
                setProducts(productRes.data.products)
              }
            })
        } else {
          alert('You are not Administrator!')
        }
      })
  }, [])
  return (
    <div id='admin-product'>
      <div className='container'>
        <ManageFilter checkPassed={checkPassed} setCheckPassed={setCheckPassed} />
        <ProductList checkPassed={checkPassed} setProducts={setProducts} products={products} />
      </div>
    </div>
  )
}

export default ProductManager