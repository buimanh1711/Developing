import { Link } from 'react-router-dom'

const ProductList = () => {
  const arr = [1, 2, 2, 2, 1, 1]
  console.log(arr)
  return (
    <div id='productLis'>
      <div className='container'>
        <div className='productList-container'>
          <div className='row'>
            {
              arr && arr.length > 0 && arr.map(item => (
                <div className='col col-sm-12 col-md-6 col-lg-3 col-xl-3'>
                  <div className='item'>
                    <div className='item-container'>
                      <div className='thumb'>
                        <Link to='/products/slug'>
                          <img src='' alt='' />
                        </Link>
                      </div>
                      <div className='info'>
                        <h1>Name</h1>
                        <p>Category</p>
                        <div className='auct-info'>
                          <span>12:11:11</span>
                          <div className='min-price'>
                            <Link to='/products/slug'>
                              <i className="fas fa-gavel"></i>
                              <span>200000đ</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList