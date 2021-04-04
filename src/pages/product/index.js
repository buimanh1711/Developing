import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'

const Product = () => {
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
                  <img src='/images/fake.jpg' />
                </div>
              </div>
              <div className='main-info'>
                <h1>Mô hình Iron Man</h1>
                <h3>00:00:30</h3>
                <div className='win'>
                  <div className='price'>
                    <span>Giá thầu hiện tại</span>
                    <h6>990.000đ</h6>
                    <div className='winner'>
                      <span>Người thắng</span>
                      <div>
                        <i className="fas fa-trophy"></i>
                        <Link to='' className='user-name'>Bùi Văn Mạnh</Link>
                      </div>
                    </div>
                  </div>
                  <div className='quick-buy'>
                    <span>Mua trực tiếp
                  <i className="fas fa-shopping-cart"></i>
                    </span>
                    <h4>
                      1.234.567đ
                  </h4>
                  </div>
                </div>
              </div>
            </div>
            <div className='detail-info'>
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
                  <li>
                    <div className='row'>
                      <div className='player-name col-6'>
                        <Link to=''>
                          Bùi Văn Mạnh
                      </Link>
                      </div>
                      <div className='player-price col-2'>
                        <span>
                          120000
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
                </ul>
                <span className='see-more'>Xem nhiều hơn</span>
              </div>
              <div className='description'>
                <div className='detail'>
                  <span>Đấu giá số: 1234567</span>
                  <span>Số lượng hiện tại: 100</span>
                </div>
                <div className='discribe'>
                  <div>
                    - Lưỡi câu cho cần câu.<br />
                  - Chứa trong hộp nhựa, dễ di động và gọn gàng.<br />
                  - Kích cỡ: 3 # đến 12 # / mỗi móc chứa 50 móc.<br />
                  - 500 chiếc / bộ.<br />
                  - Kích thước của hộp: 6,5 x 2 x 12,5 cm.
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