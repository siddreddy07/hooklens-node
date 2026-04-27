
import express from 'express'
import {hooklens} from 'hooklens-node'

const app = express()

const hooks = hooklens({
  provider: 'slack'
})


app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use('/webhooks', hooks.capture(),(req, res) => {
    console.log('RAW:', req.body)
})


app.listen(8080, () => {
  console.log('🚀 App running on http://localhost:8080')
})

