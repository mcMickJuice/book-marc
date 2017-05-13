require('dotenv').config();
const { connect } = require('../src/server-app/data/bookmarcDbClient')
const { insertUser } = require('../src/server-app/auth/authHelper')


connect()
    .then(db => {

        //add text index
        const createIndexTask = db.collection('bookmarks')
            .createIndex({ title: 'text' })
            .then(() => {
                console.log('text index created on bookmarks.title')
            })

        //add user
        const insertUserTask = insertUser('mike', 'pw')
            .then(() => {
                console.log('user \'mike\' created with pw \'pw\'')
            })

        return Promise.all([createIndexTask, insertUserTask])
            .then(() => {
                console.log('db has been initialized')
                process.exit()
            })
            
    })
    .catch(err => {
        console.error('an error occurred initializing db', err)
    })

//seed with user data

