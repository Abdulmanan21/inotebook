
const express= require('express')
var cors= require('cors')
const app = express()
const port = 4000;
const connectdb = require('./db');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/login', require('./Route/auth'))
app.use('/notes',require('./Route/Note'))

connectdb();
app.get('/', (req, res)=>{
    res.send('hello world')
})

app.listen(port,()=>{
    console.log(`This iNotebook backend is running on http://localhost:${port}/`)
})