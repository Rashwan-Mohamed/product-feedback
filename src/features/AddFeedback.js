import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Addfeedback } from './productRequests/productRequestsrSlice'
export const AddFeedback = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [category, setCategory] = useState('Feature')
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [alert, setAlert] = useState(false)
  const select = useRef(null)
  const dispatch = useDispatch()
  const categories = []

  useSelector((state) =>
    state.productRequests.map((item) => {
      const { category } = item
      if (categories.indexOf(category) === -1) {
        categories.push(category)
      }
    })
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title && category && desc) {
      dispatch(Addfeedback(title, desc, category))
      setDesc('')
      setTitle('')
      navigate('../')
    } else {
      setAlert(true)
    }
  }

  const clost = () => {
    setAlert(false)
  }
  useEffect(() => {
    let pd = setTimeout(clost, 1500)
    return () => clearTimeout(pd)
  }, [alert])

  useEffect(() => {
    const closeIt = (e) => {
      if (e.target.isEqualNode(select.current) === false && show === true) {
        setShow(false)
      }
    }
    window.addEventListener('click', closeIt)

    return () => {
      window.removeEventListener('click', closeIt)
    }
  }, [show])

  return (
    <section onClick={(e) => {}} className='addFeedback'>
      <button
        onClick={() => {
          setDesc('')
          setTitle('')
          navigate('../')
        }}
      >
        <span>
          <svg width='7' height='10' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M6 9L2 5l4-4'
              stroke='#4661E6'
              strokeWidth='2'
              fill='none'
              fillRule='evenodd'
            />
          </svg>
        </span>
        Go Back
      </button>
      <form onSubmit={handleSubmit}>
        <h2>Create New Feedback</h2>
        <div className=''>
          <h5>Feedback Title</h5>
          <p>Add a short, descriptive headline</p>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type='text'
            name=''
            id=''
          />
        </div>
        <div className='choosecat'>
          <h5>Category</h5>
          <p>Choose a category for your feedback</p>
          <section className='select-option' name='' id=''>
            <span
              ref={select}
              onClick={() => {
                setShow(!show)
              }}
            >
              {category}
            </span>
            {show && (
              <div>
                {' '}
                {categories.map((item, index) => {
                  return (
                    <button
                      onClick={() => {
                        setCategory(item)
                        setShow(false)
                      }}
                      key={index}
                    >
                      {item}
                    </button>
                  )
                })}
              </div>
            )}
          </section>
        </div>
        <div className=''>
          <h5>Feedback Detail</h5>
          <p>
            Include any specific comments on what should be improved, added,
            etc.
          </p>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            name=''
            id=''
          ></textarea>
        </div>
        <div className='form-btns'>
          <button onClick={() => navigate('../')}>Cancel</button>
          <button>Add Feedback</button>
        </div>
        {alert && <p className='form-alert'>please fill all fields.</p>}
      </form>
    </section>
  )
}
