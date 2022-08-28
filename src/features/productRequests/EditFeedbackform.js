import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { EditFeedback, DeleteFeedback } from './productRequestsrSlice'
import { CustomDrop } from './customDrop'
export const EditFeedbackform = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [scategory, setScategory] = useState('Feature')
  const [sstatus, setSstatus] = useState('')
  const [desc, setDesc] = useState('')
  const [alert, setAlert] = useState(false)
  const select = useRef(null)
  const dispatch = useDispatch()
  const categories = []

  const { id } = useParams()
  let one = useSelector((state) => {
    return state.productRequests.find((item) => {
      if (item.id === id) {
        return item
      }
    })
  })

  useSelector((state) =>
    state.productRequests.map((item) => {
      const { category } = item
      if (categories.indexOf(category) === -1) {
        categories.push(category)
      }
    })
  )
  const { title, category, description, status } = one

  const statuses = ['suggestion', 'planned', 'in-progress', 'live']

  const handleDelete = () => {
    dispatch(DeleteFeedback({ id }))
    navigate('../')
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (scategory && desc) {
      dispatch(EditFeedback({ id, desc, scategory, sstatus }))
      //   setDesc('')
      //   setStitle('')
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

  useEffect(() => {
    setScategory(category)
    setDesc(description)
    setSstatus(status)
  }, [])
  return (
    <section className='addFeedback edit-form'>
      <form onSubmit={handleSubmit}>
        <h2>Editing {`'${title}'`}</h2>
        <div className=''>
          <h5>Feedback Title</h5>
          <p>Feedback title cannot be changed.</p>
          <input readOnly value={title} />
        </div>

        <CustomDrop
          arrcat={categories}
          varia={scategory}
          setVaria={setScategory}
          category={'category'}
        />
        <CustomDrop
          arrcat={statuses}
          category={'status'}
          varia={status}
          setVaria={setSstatus}
        />
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
          <button>Update Feedback</button>
          <button onClick={handleDelete} className='delete-form'>
            Delete
          </button>
        </div>
        {alert && (
          <p className='form-alert'>blank fields can't be submitted!</p>
        )}
      </form>
    </section>
  )
}
