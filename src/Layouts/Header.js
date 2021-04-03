import { Link } from 'react-router-dom'

const Header = () => {

  return (
    <>
      <div id='header'>
        <div id='desktop'>
          <div className='header-container'>
            <div className='avt-wrapper'>
              <a href='/'>
                <img src='' alt='' />
              </a>
            </div>
            <div className='header-right-wrapper'>
              <Link to=''>
                <i className="fas fa-gavel"></i>
                <span>
                  Đấu giá của tôi
                </span>
              </Link>
              <Link to=''>
                <i className="fas fa-shopping-cart"></i>
                <span>
                  Rỏ hàng
                </span>
              </Link>
              <button>
                <i className="fas fa-user"></i>
                <span>
                  Mạnh
                </span>
                <i className="fas fa-caret-down"></i>
              </button>
            </div>
          </div>
        </div>
        <div id='mobile'></div>
      </div>
    </>
  )
}

export default Header