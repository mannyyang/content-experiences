/**
 * Content management routes
 **/
'use strict'

const MongoClient = require('mongodb').MongoClient

let contentCollection
if (process.env.MONGO_URI) {
  // Connect to MongoDB Database and return user connection
  MongoClient.connect(process.env.MONGO_URI, (err, mongoClient) => {
    if (err) throw new Error(err)
    const dbName = process.env.MONGO_URI.split('/').pop().split('?').shift()
    const db = mongoClient.db(dbName)
    contentCollection = db.collection('content')
  })
}

module.exports = (expressApp, functions) => {

  if (expressApp === null) {
    throw new Error('expressApp option must be an express server instance')
  }

  // Expose a route to return user profile if logged in with a session
  expressApp.get('/content/[id]', (req, res) => {
    if (req.user) {
      functions.find({ id: req.user.id })
        .then(user => {
          if (!user) return res.status(500).json({ error: 'Unable to fetch profile' })
          res.json({
            name: user.name,
            email: user.email,
            emailVerified: (user.emailVerified && user.emailVerified === true) ? true : false
          })
        })
        .catch(err => {
          return res.status(500).json({ error: 'Unable to fetch profile' })
        })
    } else {
      return res.status(403).json({ error: 'Must be signed in to get profile' })
    }
  })

  // Expose a route to allow users to update their profiles (name, email)
  expressApp.post('/content/:id', (req, res) => {
    if (req.user) {
      const {
        query: { id },
      } = req;

      return contentCollection
        .findOneAndUpdate(
          { _id: id, },
          {
            $setOnInsert: req.body
          },
          {
            upsert: true,
          }
        )
        .catch(err => {
          return res.status(500).json(err)
        })
    } else {
      return res.status(403).json({ error: 'Must be signed in to update profile' })
    }
  });

}