const express = require('express')
const mysql = require('mysql')
const morgan = require('morgan')
const bodyParter = require('body-parser')
const app = express()

var hostname = 'localhost'
var port = 3000
var myRouter = express.Router()

const connection = mysql.createConnection({
    host: hostname,
    user: 'root',
    password: 'root',
    database: 'users',
    //port: '3306'
})


//GET
app.get('/user/:id',(req,res) => {
    const queryString = "SELECT * FROM users.users WHERE id = " + req.params.id

    connection.query(queryString, (err,rows,fields)=>{
      if(err){
          console.log(err)
          res.send(500)
          return
      }
      res.json(rows)
    })
})


//POST
app.post('/user', (req, res) => {
    //recupere le post
    console.log('New user : ')
    console.log('first name : ' + req.body.first_name)
    console.log('last name : ' + req.body.last_name)

    const queryString = "INSERT INTO users(\"first_name\", \"last_name\") VALUES ('" + req.body.first_name + "', '" + req.body.last_name + "')"

    console.log(queryString)

    connection.query(queryString, (err, result, field) => {
        if (err){
            res.send(500)
            console.log(err)
        }

        res.end()
    })
})


app.use(bodyParter.urlencoded({extended:false}))
app.use(express.static('./public'))
app.use(morgan('short'))
app.use(myRouter)

app.listen(port, hostname, function(){
    console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port)
})