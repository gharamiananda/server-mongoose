
const express = require('express')
const app = express()
const port = 8000
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
dotenv.config()

// mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).
//     then(() => {
//         console.log('db conneted')
//     })
//     ;
app.use(express.json())
main().
    then(() => {
        console.log('db conneted')
    }).catch(err => console.log(err));

async function main() {
    await mongoose.connect(`${process.env.MONGO_URL}`)
}



app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})