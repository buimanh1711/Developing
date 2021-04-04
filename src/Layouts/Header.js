import { Link } from 'react-router-dom'
import { useState } from 'react'

const Header = () => {
  const [childMenu, setChildMenu] = useState(false)
  const [mbMenu, setMbMenu] = useState(false)
  return (
    <>
      <div id='header'>
        <div className='container'>
          <div id='desktop'>
            <div className='header-container'>
              <div className='avt-wrapper'>
                <a href='/'>
                  <img src='/images/desktop_logo.png' alt='' />
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
                <button onClick={() => setChildMenu(!childMenu)}>
                  <i className="fas fa-user"></i>
                  <span>
                    Mạnh
                </span>
                  <i className="fas fa-caret-down"></i>
                  <div className='child-menu' hidden={!childMenu}>
                    <div className='child-menu-container'>
                      <ul>
                        <li>
                          <Link to=''>
                            <i className="fas fa-user"></i>
                            <span>
                              Cá nhân
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link to=''>
                            <i className="fas fa-map-marker-alt"></i>
                            <span>
                              Địa chỉ
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link to=''>
                            <i className="fas fa-sign-out-alt"></i>
                            <span>
                              Đăng xuất
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div id='mobile'>
            <div className='mobile-menu' hidden={!mbMenu}>
              <div className='menu-overlay' onClick={() => setMbMenu(false)}>
              </div>
              <div className='menu-container'>
                <ul>
                  <li>
                    <Link to=''>
                      <i className="fas fa-gavel"></i>
                      <span>
                        Đấu giá của tôi
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to=''>
                      <i className="fas fa-shopping-cart"></i>
                      <span>
                        Rỏ hàng
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to=''>
                      <i className="fas fa-user"></i>
                      <span>
                        Cá nhân
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to=''>
                      <i className="fas fa-map-marker-alt"></i>
                      <span>
                        Địa chỉ
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to=''>
                      <i className="fas fa-sign-out-alt"></i>
                      <span>
                        Đăng xuất
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className='header-container'>
              <div className='avt-wrapper'>
                <a href='/'>
                  <img src='/images/mb_logo.png' alt='' />
                </a>
              </div>
              <div className='btn-wrapper'>
                <button onClick={() => setMbMenu(true)}>
                  <i className="fas fa-bars"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header