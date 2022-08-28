import React, { useState, useEffect, useRef } from 'react'

export const CustomDrop = ({ arrcat, varia, setVaria, category }) => {
  const [show, setShow] = useState(false)
  const select = useRef(null)

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
    <div className='choosecat'>
      <h5>{category}</h5>
      <p>Choose a {category} for your feedback</p>
      <section className='select-option' name='' id=''>
        <span
          ref={select}
          onClick={() => {
            setShow(!show)
          }}
        >
          {varia}
        </span>
        {show && (
          <div>
            {' '}
            {arrcat.map((item, index) => {
              return (
                <button
                  onClick={() => {
                    setVaria(item)
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
  )
}
