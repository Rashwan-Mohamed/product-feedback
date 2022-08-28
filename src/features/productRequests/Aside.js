import { nanoid } from 'nanoid'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import data from '../../data.json'
import { changeCat } from '../showCat/showCatSlice'
import { useWidth } from '../../useWidth'
export const Aside = () => {
  const { image, name, username } = data.currentUser
  const [open, setOpen] = useState(false)

  // const [phone,setPhone]=usState(false)
  const navigate = useNavigate()
  const width = useWidth()
  const categories = useSelector((state) =>
    state.productRequests.map((item) => {
      const { category, status } = item
      return { category, status }
    })
  )
  useEffect(() => {
    if (open && width <= 480) {
      document.body.style.overflowY = `hidden`
    } else {
      document.body.style.overflowY = `scroll`
    }
  }, [open])
  const cat = useSelector((state) => {
    return state.showCat
  })
  const dispatch = useDispatch()
  let uniqueCategories = []
  const status = {}

  categories.forEach((item) => {
    if (uniqueCategories.indexOf(item.category) === -1) {
      uniqueCategories.push(item.category)
    }

    if (item.category !== cat && cat !== 'All') return ''
    if (status[item.status]) {
      return (status[item.status] += 1)
    } else {
      status[item.status] = 1
    }
  })

  if (width < 500) {
    return (
      <aside className='new-aside'>
        <section>
          <div>
            <h4>Redux App</h4>
            <h6>Feedback Board</h6>
          </div>
        </section>
        <div
          onClick={() => setOpen(!open)}
          className={`${open ? 'mmenu open' : 'mmenu'}`}
        >
          <div className='mmenu-togg'></div>
        </div>
        <div className={`${open ? 'side-bar ' : 'side-bar translate'}`}>
          {open && <div className='overlay'></div>}
          <header>
            <div>
              <img src={image} alt={name} />
              <h4>{name}</h4>
              <p>@{username}</p>
              <span>
                <svg
                  stroke='currentColor'
                  fill='currentColor'
                  strokeWidth='0'
                  viewBox='0 0 13 16'
                  height='1em'
                  width='1em'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M1.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM13 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z'
                  ></path>
                </svg>
              </span>
            </div>
          </header>
          <section className='newAside-categories'>
            {uniqueCategories.map((item, index) => {
              return (
                <span
                  onClick={() => {
                    dispatch(changeCat({ showCat: item }))
                  }}
                  key={index}
                >
                  {item}
                </span>
              )
            })}
            <span
              onClick={() => {
                dispatch(changeCat({ showCat: 'All' }))
              }}
            >
              All
            </span>
          </section>
          <footer className='newAside-footer'>
            <section>
              <h4>Roadmap</h4>
              <button
                onClick={() => {
                  setOpen(false)
                  document.body.style.overflowY = `scroll`
                  navigate('../Roadmap')
                }}
              >
                view
              </button>
            </section>
            {Object.entries(status).map(([key, value], index) => {
              if (key === 'suggestion') return ''
              return (
                <div key={index}>
                  <span>{key}</span>
                  <span>{value} </span>
                </div>
              )
            })}
          </footer>
        </div>
      </aside>
    )
  } else {
    return (
      <aside>
        <header>
          <div>
            <img src={image} alt={name} />
            <h4>{name}</h4>
            <p>@{username}</p>
            <span>
              <svg
                stroke='currentColor'
                fill='currentColor'
                strokeWidth='0'
                viewBox='0 0 13 16'
                height='1em'
                width='1em'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M1.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM13 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z'
                ></path>
              </svg>
            </span>
          </div>
        </header>

        <section>
          <picture>
            <source
              srcSet='assets/suggestions/desktop/background-header.png'
              media='(min-width:1024px)  '
            />
            <source
              srcSet='assets/suggestions/tablet/background-header.png'
              media='(min-width:768px) and (max-width:1024px)  '
            />
            <source
              srcSet='assets/suggestions/mobile/background-header.png'
              media='(max-width:480px)  '
            />
            <img
              src='assets/suggestions/desktop/background-header.png'
              alt=''
            />
          </picture>
          <h4>Redux App</h4>
          <h6>Feedback Board</h6>
        </section>

        <section>
          {uniqueCategories.map((item, index) => {
            return (
              <span
                onClick={() => {
                  dispatch(changeCat({ showCat: item }))
                }}
                key={index}
              >
                {item}
              </span>
            )
          })}
          <span
            onClick={() => {
              dispatch(changeCat({ showCat: 'All' }))
            }}
          >
            All
          </span>
        </section>
        <footer>
          <section>
            <h4>Roadmap</h4>
            <button
              onClick={() => {
                navigate('../Roadmap')
              }}
            >
              view
            </button>
          </section>
          {Object.entries(status).map(([key, value], index) => {
            if (key === 'suggestion') return ''
            return (
              <div key={index}>
                <span>{key}</span>
                <span>{value} </span>
              </div>
            )
          })}
        </footer>
      </aside>
    )
  }
}
