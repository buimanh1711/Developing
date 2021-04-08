import { Link } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../store'
import Notify from '../components/Notify'
import SearchModal from '../components/SearchModal'
import api from '../utils/axios'
import getImage from '../utils/getImage'

const Header = () => {
  const { state, dispatch } = useContext(DataContext)

  const [childMenu, setChildMenu] = useState(false)
  const [manageMenu, setManageMenu] = useState(false)
  const [mbMenu, setMbMenu] = useState(false)
  const [notify, setNotify] = useState(false)
  const [notifyList, setNotifyList] = useState([])
  const [searchModal, setSearchModal] = useState(false)

  const userId = localStorage.getItem('id')
  useEffect(() => {
    let tempNotifList = []
    api('GET', 'api/users/v/notify')
      .then(res => {
        if (res.data && res.data.status) {
          tempNotifList = res.data.notifyList
          setNotifyList(res.data.notifyList)
        }
      })
    state.socket.on('pass product notify', data => {
      const { sellerId, name, err } = data
      if (sellerId === userId) {
        const notif = `Sản phẩm ${name} của bạn đã được quản trị viên duyệt.`
        setNotifyList([
          ...tempNotifList,
          {
            value: notif
          }
        ])
      }
    })

    state.socket.on('get product notify', data => {
      const { sellerId, name, err } = data
      if (sellerId === userId) {
        const notif = `Sản phẩm ${name} của bạn đã được bán. Hãy liên lạc với người mua để giao dịch`
        setNotifyList([
          ...tempNotifList,
          {
            value: notif
          }
        ])
      }
    })

  }, [])

  return (
    <>
      <SearchModal status={searchModal} setSearchModal={setSearchModal} />
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
                <div className='search'>
                  <i onClick={() => setSearchModal(true)} style={{ color: 'white', fontSize: '1.1rem', marginRight: 12, cursor: 'pointer' }} className="fas fa-search"></i>
                </div>
                <Link to='/products/create'>
                  <i className="fas fa-money-bill-wave"></i>
                  <span>
                    Mở đấu giá
                </span>
                </Link>
                {
                  state.login &&
                  <>
                    {
                      state.user.role !== 'admin' &&
                      <div className='header-notify'>
                        <button onClick={() => setNotify(!notify)} className='notify-btn'>
                          <i className="fas fa-bell"></i>
                          <span>{notifyList.length}</span>
                        </button>
                        {
                          notify &&
                          <Notify notifyList={notifyList} />
                        }
                      </div>
                    }
                    <button onClick={() => setChildMenu(!childMenu)}>
                      <img src={getImage(state.user && state.user.image || null)} />
                      <span>
                        {`${state.user && state.user.firstName} ${state.user && state.user.lastName}`}
                      </span>
                      {
                        childMenu &&
                        <i className="fas fa-sort-up"></i>
                        ||
                        <i className="fas fa-caret-down"></i>
                      }
                      <div className='child-menu' hidden={!childMenu}>
                        <div className='child-menu-container'>
                          <ul>
                            <li>
                              <Link to={`/profile/${userId}`}>
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
                              <Link to='/login'>
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
                  </>
                  ||
                  <div className='sign-container'>
                    <Link to='/login' className='login-btn'>Đăng nhập</Link>
                    <Link to='/register' className='login-btn'>Đăng kí</Link>
                  </div>
                }
                {
                  state.login && state.user.role === 'admin' &&
                  <button className='admin-btn' onClick={() => setManageMenu(!manageMenu)} style={{ marginLeft: 16 }}>
                    <i style={{ marginRight: 8 }} className="fas fa-tasks"></i>
                    <span>
                      Quản lý
                    </span>
                    {
                      manageMenu &&
                      <i className="fas fa-sort-up"></i>
                      ||
                      <i className="fas fa-caret-down"></i>
                    }
                    <div className='child-menu' hidden={!manageMenu}>
                      <div className='child-menu-container'>
                        <ul>
                          <li>
                            <Link to='/admin/products'>
                              <i className="fas fa-shopping-bag"></i>
                              <span>
                                Sản phẩm
                            </span>
                            </Link>
                          </li>
                          <li>
                            <Link to='/admin/users'>
                              <i className="fas fa-users"></i>
                              <span>
                                Người dùng
                            </span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </button>
                }
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
                    <i className="fas fa-search" onClick={() => {setSearchModal(true); setMbMenu(false)}}></i>
                  </li>
                  <li>
                    <Link to='/products/create'>
                      <i className="fas fa-money-bill-wave"></i>
                      <span>
                        Mở đấu giá
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to={`/profile/${userId}`}>
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
                    <Link to='/login'>
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