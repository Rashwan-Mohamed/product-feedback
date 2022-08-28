import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Vote } from './vote'
import { AddComment } from './productRequestsrSlice'

import { useNavigate, useParams } from 'react-router-dom'
import { SingelComment } from './singleComment'

export const SingleProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [total, setTotal] = useState(0)
  const [feedback, setFeedBack] = useState('')
  const dispatch = useDispatch()

  let one = useSelector((state) => {
    return state.productRequests.find((item) => {
      if (item.id === id) {
        return item
      }
    })
  })
  const { title, category, upvotes, description, comments } = one
  const handleReplay = (e) => {
    e.preventDefault()
    dispatch(
      AddComment({
        root: id,
        content: feedback,
      })
    )
    setFeedBack('')
  }
  useEffect(() => {
    let totcomm = 0
    if (comments) {
      comments.forEach((item) => {
        if (item.replies) {
          totcomm = totcomm + item.replies.length
        }
      })

      setTotal(() => {
        return comments.length + totcomm
      })
    }
  }, [comments])
  return (
    <section className='single-product-page'>
      <div className='nav-btns'>
        <button
          className='goBack-btn'
          onClick={() => {
            navigate(-1)
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
        <button
          className='edit-feedback-btn'
          onClick={() => {
            navigate(`../editFeedBack/${id}`)
          }}
        >
          Edit Feedback
        </button>
      </div>
      <article key={id}>
        <Vote id={id} upvotes={upvotes} />
        <h4>{title}</h4>
        <p>{description}</p>
        <span>{category}</span>
        <div className='comment'>
          <svg width='18' height='16' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M2.62 16H1.346l.902-.91c.486-.491.79-1.13.872-1.823C1.036 11.887 0 9.89 0 7.794 0 3.928 3.52 0 9.03 0 14.87 0 18 3.615 18 7.455c0 3.866-3.164 7.478-8.97 7.478-1.017 0-2.078-.137-3.025-.388A4.705 4.705 0 012.62 16z'
              fill='#CDD2EE'
              fillRule='nonzero'
            />
          </svg>
          {comments ? total : 0}
        </div>
      </article>

      <section className='comments'>
        <h4> {total} comments</h4>

        {comments
          ? comments.map((item) => {
              return <SingelComment key={item.id} root={id} comment={item} />
            })
          : ''}
      </section>
      <section className='add-comment-section '>
        <h4>Add Comment</h4>
        <form
          onSubmit={(e) => handleReplay(e)}
          className='add-comment-from '
          action=''
        >
          <textarea
            value={feedback}
            onChange={(e) => {
              setFeedBack(e.target.value)
            }}
            name=''
            id=''
          ></textarea>
          <button type='submit'>Add Comment</button>
        </form>
      </section>
    </section>
  )
}
