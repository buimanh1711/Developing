import TextareaAutosize from 'react-textarea-autosize'
import { useState, useRef, useEffect, useContext } from 'react'
import api from '../../utils/axios'
import toSlug from '../../utils/toSlug'
import { useHistory, Link, useLocation } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { DataContext } from '../../store/index'
const defaultValue = {
  select: 'Choose',
  name: 'Product\'s name',
  category: 'Category',
  source: null,
  minPrice: '<start price>',
  quickPrice: '<sell price>',
  producer: 'Product\'s producer'
}

const Create = () => {
  const history = useHistory()
  const { state, dispatch } = useContext(DataContext)

  const [name, setName] = useState(defaultValue.name)
  const [cate, setCate] = useState(defaultValue.category)
  const [time, setTime] = useState(null)
  const [minPrice, setMinPrice] = useState(defaultValue.minPrice)
  const [quickPrice, setQuickPrice] = useState(defaultValue.quickPrice)
  const [producer, setProducer] = useState(defaultValue.producer)
  const [file, setFile] = useState('')
  const [data, getData] = useState({ name: '', path: '/images/default_img.jpg' })
  const [categories, setCategories] = useState([])
  const [select, setSelect] = useState(false)
  const [content, setContent] = useState('')

  const nameEl = useRef(null)
  const cateEl = useRef(null)
  const minPriceEl = useRef(null)
  const quickPriceEl = useRef(null)
  const priceStepEl = useRef(null)
  const producerEl = useRef(null)
  const newCateEl = useRef(null)
  const timeEl = useRef(null)

  useEffect(() => {
    api('GET', '/api/auth')
      .then(res => {
        if (res.data && !res.data.status) {
          setTimeout(() => {
            history.replace({ pathname: '/login' })
          }, 1000)
        }
      })
      .then(() => {
        api('GET', 'api/categories')
          .then(res => {
            if (res.data && res.data.category) {
              setCategories(res.data.category)
            }
          })
      })
      .catch(err => console.log(err))
  }, [])

  const handleChange = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)
    const reader = new FileReader()
    reader.onloadend = (e) => {
      const url = reader.result
      getData({ name: 'manh', path: url })
    }

    if (selectedFile && selectedFile.type.match('image.*')) {
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault(e)
    e.preventDefault()
    const formData = new FormData()

    const currentName = nameEl.current.value
    const currentContent = content
    const cateObj = cateEl.current.value
    const newCate = newCateEl.current.value.length > 0 && newCateEl.current.value || null
    const slug = toSlug(currentName)
    const currentCate = cateObj !== defaultValue.select && JSON.parse(cateObj) || null
    if(!currentCate && !newCate) return alert('Y??u c???u ch???n th??? lo???i')

    formData.append('name', currentName)
    formData.append('content', currentContent)
    currentCate && formData.append('categoryId', currentCate._id)
    formData.append('image', file)
    formData.append('time', timeEl.current.value)
    formData.append('minPrice', minPriceEl.current.value)
    formData.append('quickPrice', quickPriceEl.current.value)
    formData.append('priceStep', priceStepEl.current.value || 1000)
    formData.append('producer', producerEl.current.value)
    formData.append('slug', slug)
    newCate && formData.append('newCate', newCate)
    if (minPriceEl.current.value >= quickPriceEl.current.value) return alert('Gi?? tr???n ph???i l???n h??n gi?? t???i thi???u')
    api('POST', '/api/products/create', formData)
      .then(res => {
        if (res.data && res.data.status) {
          state.socket.emit('user create product', {name})
          history.replace({ pathname: '/' })
          if(res.data.message) {
            alert('T???o s???n ph???m th??nh c??ng')
          }
        } else {
          alert(res.data.message)
        }
      })
      .catch(err => console.log('this is err: ', err))

  }

  const changeName = (e) => {
    let value = e.target.value
    if (value === '') {
      value = defaultValue.name
    }
    setName(value)
  }

  const changeMinPrice = (e) => {
    let value = e.target.value
    setMinPrice(value)
  }

  const changeQuickPrice = (e) => {
    let value = e.target.value
    setQuickPrice(value)
  }

  const changeProducer = (e) => {
    let value = e.target.value
    value.trim()
    setProducer(value)
  }

  const changeTime = (e) => {
    let value = e.target.value
    setTime(value)
  }

  const createNewCate = (e) => {
    let value = e.target.value
    value = value.trim()
    if (value.length > 0) {
      setSelect(true)
      setCate(value)
    } else {
      if (cateEl.current.value !== defaultValue.select) {
        setCate(JSON.parse(cateEl.current.value).name)
      } else {
        setCate(defaultValue.category)
      }
      setSelect(false)
    }
  }

  const changeCate = (e) => {
    let value = e.target.value
    value = JSON.parse(value)

    if (value.name === '') {
      value = defaultValue.category
    }

    setCate(value.name)
  }

  const handlePrice = (e) => {
    const value = e.target.value 
    if(value < 0) {
      e.target.value = 0
    }
  }

  const handleQuickPrice = (e) => {
    const value = e.target.value 
    if(value < 0 || value < minPrice && minPrice > 0) {
      e.target.value = minPrice
      alert('Vui l??ng nh???p gi?? tr???n cao h??n m???c gi?? t???i thi???u')
    }
  }

  return (
    <div className='create-post'>
      <div className='container'>
        <div className='create-container'>
          <Link className='back-to-home' to='/'>
            <i className="fas fa-arrow-left"></i>
          </Link>
          <h1> Create your own product</h1>
          <div className='row' style={{ justifyContent: 'center' }}>
            <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
              <form onSubmit={handleSubmit} className='create-form'>
                <div className='create-title'>
                  <label htmlFor='create_title'>T??n</label>
                  <input required ref={nameEl} onChange={(e) => { changeName(e) }} placeholder='ex: How to create React app' id='create_title' />
                  <p>T??n s???n ph???m</p>
                </div>
                <div className='create-category'>
                  <label htmlFor='crate-cate-select'>Th??? lo???i:</label>
                  <select required={!select} disabled={select} onChange={(e) => changeCate(e)} id='create-cate-select' ref={cateEl} name="categories" id="categories">
                    <option defaultValue="" selected disabled hidden>{defaultValue.select}</option>
                    {
                      categories && categories.length > 0 &&
                      categories.map(item =>
                        <option key={item.id} value={JSON.stringify(item)}>
                          {item.name}
                        </option>
                      )
                      ||
                      <option defaultValue="" disabled>Th??m m???i</option>
                    }
                  </select>
                  <label style={{ marginLeft: 20 }} htmlFor='create-cate-create'>Th??m m???i</label>
                  <input required={select} ref={newCateEl} onChange={createNewCate} id='create-cate-create' />
                </div>
                <div className='create-producer'>
                  <label htmlFor='create_producer'>Nh??n hi???u</label>
                  <input onChange={changeProducer} ref={producerEl} id='create_producer' />
                  <p>T??n h??ng, nh?? s???n xu???t</p>
                </div>
                <div className='create-price'>
                  <label htmlFor='create_price'>Gi?? s??n</label>
                  <input onBlur={handlePrice} required onChange={changeMinPrice} ref={minPriceEl} type='number' id='create_price' />
                  <p>M???c gi?? t???i thi???u c???a s???n ph???m</p>
                </div>
                <div className='create-price'>
                  <label htmlFor='create_price'>B?????c gi??</label>
                  <input onBlur={handlePrice} required ref={priceStepEl} type='number' id='create_price' />
                  <p>B?????c gi?? m???i l???n ?????u gi??</p>
                </div>
                <div className='create-price'>
                  <label htmlFor='create_price'>Gi?? tr???n</label>
                  <input onBlur={handleQuickPrice} onChange={changeQuickPrice} ref={quickPriceEl} type='number' min={minPrice} id='create_price' />
                  <p>M???c gi?? mua lu??n c???a s???n ph???m</p>
                </div>
                <div className='create-time'>
                  <label htmlFor='create_price'>Th???i gian</label>
                  <input required onChange={changeTime} ref={timeEl} type='date' id='create_price' />
                  <p>Th???i gian h???t h???n ?????u gi??</p>
                </div>

                <div className='create-img'>
                  <label htmlFor='create_image'>???nh</label>
                  <input onChange={handleChange} type='file' id='create_image' />
                  <p>???nh s???n ph??m</p>
                </div>
                <div className='create-content'>
                  <label htmlFor='create_content'>M?? t???</label>
                  <CKEditor
                    className='about'
                    editor={ClassicEditor}
                    data="<p>Type and edit your the content!</p>"
                    onReady={editor => {
                      // You can store the "editor" and use when it is needed.
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setContent(data)
                    }}
                    onBlur={(event, editor) => {
                    }}
                    onFocus={(event, editor) => {
                    }}
                  />
                  <p>The Content on the thumb</p>
                </div>
                <button>Post</button>
              </form>
            
            </div>
            <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4'>
              <div className='create-demo'>
                <div className='first-container'>
                  <div className='first-thumb'>
                    <img onError="../images/default_img.jpg" src={`${data.path}`} alt='img' />
                  </div>
                  <div className='first-infor'>
                    <p to='/' className='first-category'>
                      {cate}
                    </p>
                    <span to='/' className='first-title'>
                      {name}
                    </span>
                    <span to='/' className='first-title'>
                      {producer}
                    </span>
                    <p color='black'>
                      {minPrice}
                    </p>
                    <p color='black'>
                      {quickPrice}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div>
  )
}

export default Create