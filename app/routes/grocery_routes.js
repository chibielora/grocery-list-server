// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for grocery
const List = require('../models/list')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { grocery: { title: '', text: 'foo' } } -> { grocery: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', {
  session: false
})

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// CREATE
// POST /grocery/
router.post('/list/:list_id/grocery', requireToken, (req, res, next) => {
  // get the review data from the body of the request
  const groceryData = req.body.grocery
  // get the restaurant id from the review data
  const listId = req.params.list_id
  // find the restaurant by its id
  List.findById(listId)
    .then(handle404)
    .then(list => {
      // console.log(list)
      list.groceries.push(groceryData)
      return list.save()
    })
    .then(list => res.status(201).json({
      list: list
    }))
    // send response back to client
    .catch(next)
})

// UPDATE
// PATCH
router.patch('/list/:list_id/grocery/:id', requireToken, removeBlanks, (req, res, next) => {
  const id = req.params.id
  const listId = req.params.list_id
  const groceryData = req.body.grocery
  List.findById(listId)
    .then(handle404)
    .then(list => {
      requireOwnership(req, list)
      const grocery = list.groceries.id(id)
      grocery.set(groceryData)
      return list.save()
    })
    .then(list => res.status(200).json({
      list: list
    }))
    .catch(next)
})

// DESTROY
router.delete('/list/:list_id/grocery/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  const listId = req.params.list_id
  List.findById(listId)
    .then(handle404)
    .then(list => {
      requireOwnership(req, list)
      list.groceries.id(id).remove()
      return list.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
