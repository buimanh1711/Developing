import { Link } from 'react-router-dom'
import getImage from '../../utils/getImage'

const ProductList = (props) => {
  const { products } = props

  return (
    <div id='product-list'>
      <div className='container'>
        <div className='productList-container'>
          <div className='row'>
            {
              products && products.length > 0 && products.map(item => {
                if(item.passed)
                return (
                  <div key={item._id} className='col col-sm-12 col-md-6 col-lg-3 col-xl-3'>
                    <div className='item'>
                      <div className='item-container'>
                        <div className='thumb'>
                          <Link to={`/products/${item.slug || ''}`}>
                            <img src={getImage(item.image)} alt='' />
                          </Link>
                        </div>
                        <div className='info'>
                          <Link to={`/products/${item.slug || ''}`}>{item.name}</Link>
                          <i className='producer'>#{item.category && item.category.name || 'Đang cập nhật...'}</i>
                          <p>{item.producer || 'Đang cập nhật...'}</p>
                          <div className='auct-info'>
                            <span>00:00:00</span>
                            <div className='min-price'>
                              <Link to={`/products/${item.slug || ''}`}>
                                <i className="fas fa-gavel"></i>
                                <span>{item.minPrice || 0}đ</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList