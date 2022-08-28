import React, { useState, useEffect, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { useNavigate, useParams } from 'react-router-dom'
import { AddReplay } from './productRequestsrSlice'
import { Replay } from './replay'
export const SingelComment = ({ comment, root }) => {
  const [exist, setExist] = useState(false)
  const [isReplaying, setIsReplaying] = useState(false)
  const [feedback, setFeedBack] = useState('')
  const dispatch = useDispatch()
  const text = useRef('')
  const {
    id,
    content,
    user: { image, name, username },
  } = comment

  useEffect(() => {
    setExist(comment.replies)
    if (isReplaying) {
      text.current.style.height = `${text.current.scrollHeight}px`
    } else {
      text.current.style.height = `${0}px`
    }
  }, [isReplaying])

  const handleReplay = (e) => {
    e.preventDefault()
    let reg = new RegExp(`@${username}`)
    dispatch(
      AddReplay({
        id: root,
        replyingTo: id,
        usersame:username,
        content: feedback,
      })
    )
    setIsReplaying(false)
    setFeedBack('')
  }
  return (
    <>
      <div>
        <img src={image} alt='' />
        <span>
          <h5> {name}</h5>
          <p>{username}</p>
        </span>
        <p>{content}</p>
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
        </button>{' '}
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
      {exist &&
        comment.replies.map((item, index) => {
          return <Replay key={index} root={root} manga={id} item={item}></Replay>
        })}
    </>
  )
}
