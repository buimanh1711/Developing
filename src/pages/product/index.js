import { Link, useParams } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import { useState, useEffect, useContext } from 'react'
import api from '../../utils/axios'
import getImage from '../../utils/getImage'
import date from '../../utils/getDate'
import { DataContext } from '../../store/index'
import { toggleLoading } from '../../store/actions'
import getUserInfo from '../../utils/getUserInfo'

const Product = () => {
  const { state, dispatch } = useContext(DataContext)
  const { slug } = useParams()

  const [price, setPrice] = useState(null)
  const [minPrice, setMinPrice] = useState(null)
  const [product, setProduct] = useState({})
  const [playingList, setPlayingList] = useState([])

  useEffect(() => {
    state.socket.on('receive auction', (data) => {
      console.log(playingList)
      const { user } = data
      const newPlayingList = [
        {
          firstName: user.firstName,
          lastName: user.lastName,
          price: data.price,
          time: Date.now()
        },
        ...data.currentList
      ]
      setMinPrice(data.price)
      setPlayingList(newPlayingList)
    })

    dispatch(toggleLoading(true))
    api('GET', `api/products/${slug}`)
      .then(res => {
        if (res.data && res.data.status) {
          setProduct(res.data.product)
          setPlayingList(res.data.product.playingList.reverse())
          setMinPrice(res.data.product.minPrice)
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

  const handleChange = (e) => {
    let value = e.target.value
    if (value > product.minPrice) {
      setPrice(value)
    }
  }

  const handleBlur = (e) => {
    let value = e.target.value
    if (value < product.minPrice) {
      e.target.value = minPrice
    }
  }

  const createAuction = () => {
    if (price > minPrice) {
      const { id, firstName, lastName } = getUserInfo()
      const data = {
        productId: product._id,
        user: {
          id, firstName, lastName,
        },
        price: price,
        playingList,
      }
      state.socket.emit('create auction', data)
    } else {
      alert('Giá không hợp lệ!')
    }

  }

  return (
    <>
      <Breadcrumb />
      <div id='product'>
        <div className='container'>
          <div className='detail-container'>
            <div className='show'>
              <div className='image-wrapper'>
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
                    <h6>{minPrice}đ</h6>
                    <div className='auction'>
                      <label htmlFor='product_auct'>Trả giá: </label>
                      <input key={minPrice} onChange={handleChange} onBlur={handleBlur} type='number' id='product_auct' defaultValue={minPrice} step={product.priceStep || 1000} min={minPrice}></input>
                      <p>Bước giá: {product.priceStep || 1000}đ</p>
                      <button onClick={createAuction}>Xác nhận</button>
                    </div>
                    <div className='winner'>
                      {
                        product.sold &&
                        <div className='won-winner'>
                          <div>
                            <span>Người thắng:</span>
                            <i className="fas fa-trophy"></i>
                            <Link to='' className='user-name'>{`${product.winner.firstName} ${product.winner.lastName}`}</Link>
                          </div>
                        </div>
                        ||
                        <>
                          {
                            playingList && playingList.length > 0
                            &&
                            <div className='won-winner'>
                              <div>
                                <span>Dẫn đầu:</span>
                                <i className="fas fa-trophy"></i>
                                <Link to='' className='user-name'>{`${playingList[0].firstName} ${playingList[0].lastName}`}</Link>
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
                playingList && playingList.length > 0 &&
                <div className='player-list scroll'>
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
                        <div className='player-quantity col-1'>
                          <span>
                            Số lượng
                        </span>
                        </div>
                        <div className='player-time col-3'>
                          <span>
                            Thời gian
                        </span>
                        </div>
                      </div>
                    </li>
                    {
                      playingList.map(item =>
                        <li>
                          <div className='row'>
                            <div className='player-name col-6'>
                              <Link to=''>
                                {`${item.firstName} ${item.lastName}`}
                              </Link>
                            </div>
                            <div className='player-price col-2'>
                              <span>
                                {item.price}
                              </span>
                            </div>
                            <div className='player-quantity col-1'>
                              <span>
                                1
                            </span>
                            </div>
                            <div className='player-time col-3'>
                              <span>
                                {date(item.time)}
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