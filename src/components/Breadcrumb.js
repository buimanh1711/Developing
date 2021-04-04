import { Link } from 'react-router-dom'
const Breadcrumb = () => {
  return (
    <div id='breadcrumb'>
      <div className='container'>
        <div className='breadcrumb-container'>
          <Link className='home' to='/'>
            <i className="fas fa-home"></i>
            <span>
              Trang chủ
            </span>
          </Link>
          <Link to='/product'>
            <i className="fas fa-angle-right"></i>
            <span>
              Sản phẩm
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Breadcrumb