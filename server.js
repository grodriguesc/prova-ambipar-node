// server.js
const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors')

const app = express()

// Use cors middleware to enable CORS
app.use(cors())

app.get('/api/getItems/item-list', (req, res) => {
  const itemIds = {}
  const file = path.resolve(__dirname, './item-list.txt')
  console.log(`Reading from file: ${file}`)
  const lines = fs.readFileSync(file, 'utf-8').split('\n').filter(Boolean)

  lines.forEach(line => {
    const parts = line.split('\t')
    const itemName = parts[0].toLowerCase()
    const itemId = parts[1].split(',')[0].replace(/\r/g, "") // remove all "\r" from the string
    itemIds[itemName] = itemId
  })

  res.json(itemIds)
})

app.listen(3001, () => {
  console.log('API server running on http://localhost:3001')
})
