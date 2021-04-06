import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import { useState, useEffect, useContext } from 'react'
import api from '../../utils/axios'
import getImage from '../../utils/getImage'
import { DataContext } from '../../store/index'
import { toggleLoading } from '../../store/actions'
import { set } from 'js-cookie'

const Product = () => {
  const { state, dispatch } = useContext(DataContext)

  const [product, setProduct] = useState({})
  useEffect(() => {
    dispatch(toggleLoading(true))
    api('GET', 'api/products/test')
      .then(res => {
        console.log(res)
        if (res.data && res.data.status) {
          console.log(res.data.product)
          setProduct(res.data.product)
        }
      })
      .catch(err => {
        console.log(err)
        alert('Lỗi lấy thông tin sản phẩm.')
      })
      .then(() => {
        dispatch(toggleLoading(false))
      })
  }, [])

  return (
    <>
      <Breadcrumb />
      <div id='product'>
        <div className='container'>
          <div className='detail-container'>
            <div className='show'>
              <div className='image-wrapper'>
                <div className='image-list'>
                  <ul>
                    <li className='active'>
                      <img src='/images/fake.jpg' />
                    </li>
                    <li>
                      <img src='/images/fake.jpg' />
                    </li>
                    <li>
                      <img src='/images/fake.jpg' />
                    </li>
                    <li>
                      <img src='/images/fake.jpg' />
                    </li>
                  </ul>
                </div>
                <div className='main-image'>
                  <img src={getImage(product.image)} />
                </div>
              </div>
              <div className='main-info'>
                <h1>{product.name}</h1>
                <h3>{product.time}</h3>
                <div className='win'>
                  <div className='price'>
                    <span>Giá thầu hiện tại</span>
                    <h6>{product.minPrice}đ</h6>
                    <div className='auction'>
                      <label htmlFor='product_auct'>Trả giá: </label>
                      <input type='number' id='product_auct' defaultValue={product.minPrice} step={product.priceStep || 1000} min={product.minPrice}></input>
                      <p>Bước giá: {product.priceStep || 1000}đ</p>
                    </div>
                    <div className='winner'>
                      {
                        product.sole &&
                        <div className='won-winner'>
                          <div>
                            <span>Người thắng:</span>
                            <i className="fas fa-trophy"></i>
                            <Link to='' className='user-name'>Bùi Văn Mạnh</Link>
                          </div>
                        </div>
                        ||
                        <>
                          {
                            product.playingList && product.playingList.length > 0
                            &&
                            <div className='won-winner'>
                              <div>
                                <span>Dẫn đầu:</span>
                                <i className="fas fa-trophy"></i>
                                <Link to='' className='user-name'>Bùi Văn Mạnh</Link>
                              </div>
                            </div>
                          }
                        </>
                      }
                    </div>
                  </div>
                  <div className='quick-buy'>
                    <span>Mua trực tiếp
                  <i className="fas fa-shopping-cart"></i>
                    </span>
                    <h4>
                      {product.quickPrice}đ
                  </h4>
                  </div>
                </div>
              </div>
            </div>
            <div className='detail-info'>
              {
                product.playingList && product.playingList.length > 0 &&
                <div className='player-list'>
                  <ul>
                    <li className='title'>
                      <div className='row'>
                        <div className='player-name col-6'>
                          <span>
                            Tên
                        </span>
                        </div>
                        <div className='player-price col-2'>
                          <span>
                            Giá
                        </span>
                        </div>
                        <div className='player-quantity col-2'>
                          <span>
                            Số lượng
                        </span>
                        </div>
                        <div className='player-time col-2'>
                          <span>
                            Thời gian
                        </span>
                        </div>
                      </div>
                    </li>
                    {
                      product.playingList.map(item =>
                        <li>
                          <div className='row'>
                            <div className='player-name col-6'>
                              <Link to=''>
                                Thắng Vương
                            </Link>
                            </div>
                            <div className='player-price col-2'>
                              <span>
                                101000
                            </span>
                            </div>
                            <div className='player-quantity col-2'>
                              <span>
                                1
                            </span>
                            </div>
                            <div className='player-time col-2'>
                              <span>
                                17/11/2021
                            </span>
                            </div>
                          </div>
                        </li>
                      )
                    }
                  </ul>
                  <span className='see-more'>Xem nhiều hơn</span>
                </div>
                ||
                <p className='alert alert-warning'>Chưa có người tham gia đấu giá!</p>
              }
              <div className='description'>
                <div className='detail'>
                  <span>Mã đấu giá: {product._id}</span>
                </div>
                <div className='discribe'>
                  <p style={{ fontFamily: 'fontRegular', fontStyle: 'italic' }}>Mô tả sản phẩm:</p>
                  <div dangerouslySetInnerHTML={{ __html: product.content }}>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Product