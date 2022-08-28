import { createSlice } from '@reduxjs/toolkit'
import data from '../../data.json'
import { nanoid } from 'nanoid'

const initialState = [...data.productRequests]
export const productRequestsSlice = createSlice({
  name: 'productRequests',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    Addfeedback: {
      reducer: (state, action) => {
        state.push(action.payload)
      },
      prepare: (title, desc, category) => {
        return {
          payload: {
            id: nanoid(),
            title,
            category,
            upvotes: 0,
            status: 'suggestion',
            description: desc,
            comments: [],
          },
        }
      },
    },
    upvote(state, action) {
      const { id } = action.payload
      const { username } = data.currentUser

      let selected = state.find((item) => {
        if (item.id === id) {
          return item
        }
      })
      if (selected.votes) {
        if (selected.votes.includes(`${username}`)) {
          selected.upvotes -= 1
          selected.votes.splice(selected.votes.indexOf[username], 1)
        } else {
          selected.votes.push(username)
          selected.upvotes += 1
        }
      } else {
        selected.votes = []
        selected.votes.push(username)
        selected.upvotes += 1
      }
    },
    AddReplay: {
      reducer: (state, action) => {
        const { id, replyingTo, replay } = action.payload
        const slelected = state.find((item) => item.id === id)
        let person = slelected.comments.find((item) => item.id === replyingTo)
        if (!person) {
          slelected.comments.forEach((item) => {
            if (item.replies) {
              item.replies.find((sero) => {
                if (sero.id === replyingTo) {
                  return (person = item)
                }
              })
            }
          })
        }
        if (person.replies) {
          person.replies.push(replay)
        } else {
          person.replies = []
          person.replies.push(replay)
        }
      },
      prepare: ({ id, replyingTo, usersame, content }) => {
        const { image, name, username } = data.currentUser
        return {
          payload: {
            id,
            replyingTo,
            replay: {
              content,
              replyingTo: usersame,
              user: {
                image,
                name,
                username,
              },
            },
          },
        }
      },
    },
    AddComment: {
      reducer: (state, action) => {
        const { root, comment } = action.payload

        const selected = state.find((item) => item.id === root)
        if (selected.comments) selected.comments.push(comment)
        else {
          selected.comments = []
          selected.comments.push(comment)
        }
      },
      prepare: ({ root, content }) => {
        const { image, name, username } = data.currentUser
        return {
          payload: {
            root,
            comment: {
              id: nanoid(),
              content,
              user: {
                image,
                name,
                username,
              },
            },
          },
        }
      },
    },
    EditFeedback: (state, action) => {
      const { id, desc, scategory, sstatus } = action.payload

      const feedback = state.find((item) => item.id === id)

      feedback.description = desc
      feedback.category = scategory
      feedback.status = sstatus
    },
    DeleteFeedback: (state, action) => {
      const { id } = action.payload
      return (state = state.filter((item) => {
        if (item.id !== id) {
          return item
        }
      }))
    },
  },
})

export const {
  Addfeedback,
  upvote,
  AddReplay,
  AddComment,
  EditFeedback,
  DeleteFeedback,
} = productRequestsSlice.actions

export default productRequestsSlice.reducer
