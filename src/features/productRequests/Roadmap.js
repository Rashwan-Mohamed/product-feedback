import { Vote } from './vote'
import { useSelector } from 'react-redux/es/exports'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useWidth } from '../../useWidth'
export const Roadmap = () => {
  const navigate = useNavigate()
  const [phone, setPhone] = useState(false)
  const [selected, setSelected] = useState('planned')
  const width = useWidth()
  const productsReq = useSelector((state) => {
    return state.productRequests.map((request) => {
      return request
    })
  })

  const status = {
    cat: { planned: 0, 'in-progress': 0, live: 0 },
    desc: [
      {
        p: 'Ideas priortized for research',
      },
      {
        p: 'Currently being developed',
      },
      {
        p: 'Released features',
      },
    ],
  }

  productsReq.forEach((item) => {
    if (item.status === 'suggestion') return

    if (status.cat.hasOwnProperty(item.status)) {
      return (status.cat[item.status] += 1)
    }
  })
  console.log(status.cat)
  if (width <= 600) {
    return (
      <section className='road-map-page road-mobileView'>
        <header>
          <div>
            <button
              className='goBack-btn goback-roadmap'
              onClick={() => {
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
            <h1>Roadmap</h1>
          </div>
          <Link to='/addFeedBack' className='addFbv'>
            <svg width='9' height='9' xmlns='http://www.w3.org/2000/svg'>
              <text
                transform='translate(-24 -20)'
                fill='#F2F4FE'
                fillRule='evenodd'
                fontFamily='Jost-Bold, Jost'
                fontSize='14'
                fontWeight='bold'
              >
                <tspan x='24' y='27.5'>
                  +
                </tspan>
              </text>
            </svg>
            Add Feedback
          </Link>
        </header>
        <section className='road-map-products'>
          <div className='select-btns-road'>
            {Object.entries(status.cat).map(([key, value], index) => {
              return (
                <button
                  onClick={() => setSelected(key)}
                  className={`${selected === key ? 'selected' : 'undefined'}`}
                  key={index}
                >
                  {key} ({value})
                </button>
              )
            })}
          </div>
          {productsReq.map((item) => {
            const {
              id,
              title,
              category,
              upvotes,
              description,
              comments,
              status,
            } = item
            let totcomm = 0
            if (comments) {
              comments.forEach((item) => {
                if (item.replies) {
                  totcomm = totcomm + item.replies.length
                }
              })
            }
            if (status !== selected) return ''

            return (
              <article className={`roadmap-product ${selected}`} key={id}>
                <h3>
                  <p>{selected}</p>
                </h3>
                <Vote id={id} upvotes={upvotes} />
                <h4
                  onClick={() => {
                    navigate(`../feedback/${id}`)
                  }}
                >
                  {title}
                </h4>
                <p>{description}</p>
                <span>{category}</span>
                <div className='comment'>
                  <svg
                    width='18'
                    height='16'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M2.62 16H1.346l.902-.91c.486-.491.79-1.13.872-1.823C1.036 11.887 0 9.89 0 7.794 0 3.928 3.52 0 9.03 0 14.87 0 18 3.615 18 7.455c0 3.866-3.164 7.478-8.97 7.478-1.017 0-2.078-.137-3.025-.388A4.705 4.705 0 012.62 16z'
                      fill='#CDD2EE'
                      fillRule='nonzero'
                    />
                  </svg>
                  {comments ? comments.length + totcomm : 0}
                </div>
              </article>
            )
          })}
        </section>
      </section>
    )
  } else {
    return (
      <section className='road-map-page'>
        <header>
          <div>
            <button
              className='goBack-btn goback-roadmap'
              onClick={() => {
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
            <h1>Roadmap</h1>
          </div>
          <Link to='/addFeedBack' className='addFbv'>
            <svg width='9' height='9' xmlns='http://www.w3.org/2000/svg'>
              <text
                transform='translate(-24 -20)'
                fill='#F2F4FE'
                fillRule='evenodd'
                fontFamily='Jost-Bold, Jost'
                fontSize='14'
                fontWeight='bold'
              >
                <tspan x='24' y='27.5'>
                  +
                </tspan>
              </text>
            </svg>
            Add Feedback
          </Link>
        </header>
        <section className='road-map-products'>
          {Object.entries(status.cat).map(([key, value], index) => {
            return (
              <article key={key}>
                <div>
                  <h3>
                    {key} ({value})
                  </h3>
                  <p>{status.desc[index].p}</p>
                </div>
                {productsReq.map((item) => {
                  const {
                    id,
                    title,
                    category,
                    upvotes,
                    description,
                    comments,
                    status,
                  } = item
                  let totcomm = 0
                  if (comments) {
                    comments.forEach((item) => {
                      if (item.replies) {
                        totcomm = totcomm + item.replies.length
                      }
                    })
                  }
                  if (status !== key) return ''

                  return (
                    <article className={`roadmap-product ${key}`} key={id}>
                      <h3>
                        <p>{key}</p>
                      </h3>
                      <Vote id={id} upvotes={upvotes} />
                      <h4
                        onClick={() => {
                          navigate(`../feedback/${id}`)
                        }}
                      >
                        {title}
                      </h4>
                      <p>{description}</p>
                      <span>{category}</span>
                      <div className='comment'>
                        <svg
                          width='18'
                          height='16'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M2.62 16H1.346l.902-.91c.486-.491.79-1.13.872-1.823C1.036 11.887 0 9.89 0 7.794 0 3.928 3.52 0 9.03 0 14.87 0 18 3.615 18 7.455c0 3.866-3.164 7.478-8.97 7.478-1.017 0-2.078-.137-3.025-.388A4.705 4.705 0 012.62 16z'
                            fill='#CDD2EE'
                            fillRule='nonzero'
                          />
                        </svg>
                        {comments ? comments.length + totcomm : 0}
                      </div>
                    </article>
                  )
                })}
              </article>
            )
          })}
        </section>
      </section>
    )
  }
}
