import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import api from '../../utils/axios'
import toSlug from '../../utils/toSlug'
import ProductList from '../../components/productList'

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const Search = (props) => {
  const param = useQuery().get('q')
  const slug = toSlug(param)
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState(true)

  useEffect(() => {
    api('GET', `api/products/search/${slug}`)
      .then(res => {
        if (res.data && res.data.status) {
          setProducts(res.data.products)
        } else {
          setStatus(false)
        }
      })
  }, [])

  return (
    <div id='search-page'>
      {
        status &&
        <>
          {
            products && products.length > 0 &&
            <>
              <div className='search-result container'>
                <p className='alert alert-success'>Result for '{param}' : </p>
              </div>
              <ProductList search={true} products={products} />
            </>
            ||
            <div className='search-result'>
              <p className='alert alert-warning' style={{ color: 'rgb(223, 83, 83)' }}>No result for '{param}'!</p>
            </div>
          }
        </>
        ||
        <div className='search-result container'>
          <p className='alert alert-warning'>Vui lòng nhập từ khóa phù hợp</p>
        </div>
      }
    </div>
  )
}

export default Search