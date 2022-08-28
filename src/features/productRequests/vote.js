import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { upvote } from './productRequestsrSlice'
import data from '../../data.json'
export const Vote = ({ id, upvotes }) => {
  const [highLight, setHighLight] = useState(false)
  const dispatch = useDispatch()
  let selected = useSelector((state) => {
    return state.productRequests.find((item) => {
      if (item.id === id) return item
    })
  })
  useEffect(() => {
    if (selected.votes) {
      if (selected.votes.includes(data.currentUser.username)) {
        setHighLight(true)
      }
    }
  }, [])

  return (
    <>
      {' '}
      <span
        onClick={() => {
          dispatch(upvote({ id, type: 'downvote' }))
          if (selected.votes) {
            if (selected.votes.includes(data.currentUser.username)) {
              setHighLight(false)
            } else {
              setHighLight(true)
            }
          } else {
            setHighLight(true)
          }
        }}
        className={`${highLight ? 'voted vote' : 'undefined vote'}`}
      >
        <svg
          stroke='currentColor'
          fill='currentColor'
          strokeWidth='0'
          viewBox='0 0 10 16'
          height='1.3em'
          width='1.5em'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            d='M10 10l-1.5 1.5L5 7.75 1.5 11.5 0 10l5-5 5 5z'
          ></path>
        </svg>
        {upvotes}
      </span>
    </>
  )
}
