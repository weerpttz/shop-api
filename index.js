import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import router from './routes/api/index.js'
import adminRouter from './routes/api/backoffice/index.js'


const app = express()
const port = 3000
let startAt = ''
app.use(cors())
app.use(bodyParser.json())


app.get('/', (req, res) => {
    let server = {
        started: startAt,
        status: 'OK'
    }
    res.send(server)
})

app.use('/backoffice/api', adminRouter)
app.use('/api', router)


app.listen(port, () => {
    startAt = new Date()
    console.log(`Example app listening on port ${port}`)
})