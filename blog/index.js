const express = require('express')
const app = express()
const port = 3000

// router
app.get('/', (req, res) => {
  res.send('Hello World 123!')
})
// start project [node index.js]
// start project with nodemon [npm start]
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})