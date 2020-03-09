const app = require('express')()
const db = require('./config/db')
const consing = require('consign');

consing()
.include('./config/passport.js')
.then('./config/middlewares.js')
.then('./api')
.then('./config/routes.js')
.into(app)

app.db = db

app.listen(33000, () => {
    console.log('Exercutando backend...')
});