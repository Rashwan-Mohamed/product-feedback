import React, { useState, useEffect, useRef } from 'react'

import { useDispatch } from 'react-redux'

import { AddReplay } from './productRequestsrSlice'

export const Replay = ({ manga,root, item }) => {
  const [isReplaying, setIsReplaying] = useState(false)
  const [feedback, setFeedBack] = useState('')
  const dispatch = useDispatch()
  const text = useRef('')

  const {
    content,
    replyingTo,
    user: { image, name, username },
  } = item

  useEffect(() => {
    if (isReplaying) {
      text.current.style.height = `${text.current.scrollHeight}px`
    } else {
      text.current.style.height = `${0}px`
    }
  }, [isReplaying])
  const handleReplay = (e) => {
    e.preventDefault()
    dispatch(
      AddReplay({
        id: root,
        replyingTo: manga,
        usersame: username,
        content: feedback,
      })
    )
    setIsReplaying(false)
    setFeedBack('')
  }

  return (
    <div className='replayTC'>
      <img src={image} alt='' />
      <span>
        <h5> {name}</h5>
        <p>{username}</p>
      </span>
      <p>
        {' '}
        <span>@{replyingTo}</span> {content}
      </p>
      <button
        onClick={() => {
          setIsReplaying(!isReplaying)
        }}
      >
        {isReplaying ? (
          <span className='cancel-replay'>Cancel</span>
        ) : (
          <span className='replay-span'>Replay</span>
        )}
      </button>
      <section ref={text} className='form-container'>
        <form
          className='addIt resite'
          onSubmit={(e) => handleReplay(e)}
          action=''
        >
          <textarea
            placeholder='Replay...'
            value={feedback}
            onChange={(e) => {
              setFeedBack(e.target.value)
            }}
            name=''
            id=''
          ></textarea>
          <button type='submit'>Post Replay</button>
        </form>
      </section>
    </div>
  )
}
