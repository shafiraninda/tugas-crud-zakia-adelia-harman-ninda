const express = require('express')
const app = express()
const fs= require('fs')
const {uuid} = require('uuidv4');
const bcrypt = require('bcrypt');

app.set('view engine', 'ejs')
app.set('views', './public/views')
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.get('/', (req,res)=>{
    res.render('main', {
        pageTitle: "Main Page",
    })
})

app.get('/add', (req,res)=>{
    const data = fs.readFileSync('./data/data.json','utf-8')
    const dataParsed = JSON.parse(data)
    res.render('add', {
        pageTitle: "User Register"
    })
})

app.post('/add', (req,res)=>{
    const { name , email, password }=req.body
    const data = fs.readFileSync('./data/data.json','utf-8')
    const dataParsed = JSON.parse(data)
    const hashedPassword = bcrypt.hashSync(password, 10)
    const newData = {
        id : uuid(),
        name,
        email,
        hashedPassword
    }
    dataParsed.push(newData)
    fs.writeFileSync('./data/data.json', JSON.stringify(dataParsed) )
    res.send("SUCCESSFULLY REGISTERED")
    
})


const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})