import { useState, useEffect } from 'react'
import api from '../../utils/axios'
import { useParams } from 'react-router-dom'
import ProductList from '../../components/productList'
import getUserInfo from '../../utils/getUserInfo'

const UserProduct = (props) => {
  const { userId } = useParams()
  const [products, setProducts] = useState([])
  const [isSeller, setIsSeller] = useState(false)

  useEffect(() => {
    api('GET', `api/products?seller=${userId}`)
      .then(res => {
        if (res.data && res.data.status) {
          setProducts(res.data.products)
          setIsSeller(res.data.isSeller)
        } else {
          console.log('manh')
        }
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div id='search-page'>
      {
        products && products.length > 0 &&
        <>
          <p className='alert alert-success container'>Danh sách sản phẩm: </p>
          <ProductList isSeller={isSeller} products={products} setProducts={setProducts} />
        </>
        ||
        <div className='search-result container'>
          <p className='alert alert-warning'>Không có sản phẩm nào</p>
        </div>
      }
    </div>
  )
}

export default UserProduct