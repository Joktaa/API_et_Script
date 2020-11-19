const express = require('express') //recuperation du module express
const bodyParser = require('body-parser') //recuperation du module body-parser pour le post

const sqlite3 = require('sqlite3').verbose() //recuperation du module sqlite3

//initialisation de la db
let db = new sqlite3.Database('./MyDB.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err){
        console.error(err.message)
    }
    console.log('connected to database')
})

//variables
const hostname = 'localhost'
const port = 3000;
const app = express() //création d'un objet express
const router = express.Router()

//DATABASE
//recupere les données de la db et affiche dans la console
db.each('SELECT * FROM users', (err, rows) => {
    if (err) {
    console.error(err.message);
    }
    console.log(rows);
});


//GET
router.route('/api/test/:user_id')
    .get((req,res) => {
        db.each("SELECT * FROM users WHERE id = " + req.params.user_id ,(err, rows) => {
            if(err){
                console.log(err.message)
            }
            res.json(rows)
        })
    })


//POST
router.route('/api/test')
    .post((req, res) => {
        //recupere le post
        console.log('New user : ')
        console.log('first name : ' + req.body.post_first_name)
        console.log('last name : ' + req.body.post_last_name)

        console.log("INSERT INTO users(\"first_name\", \"last_name\") VALUES ('" + req.body.post_first_name + "', '" + req.body.post_last_name + "')")
        
        db.run("INSERT INTO users(\"first_name\", \"last_name\") VALUES ('" + req.body.post_first_name + "', '" + req.body.post_last_name + "')")
        res.end()
    })


//UPDATE
router.route('/api/test')
    .put((req, res) => {
        console.log('Update user : ')
        console.log('id : ' + req.body.update_id)
        console.log('first name : ' + req.body.update_first_name)
        console.log('last name : ' + req.body.update_last_name)

        console.log("UPDATE users SET first_name = \'" + req.body.update_first_name + "\', last_name = \'" + req.body.update_last_name + "\' WHERE id = "+ req.body.update_id)

        db.run("UPDATE users SET first_name = \'" + req.body.update_first_name + "\', last_name = \'" + req.body.update_last_name + "\' WHERE id = "+ req.body.update_id)
        res.end()
    })


//DELETE
router.route('/api/test')
    .delete((req, res) => {
        console.log('Delete user : ')
        console.log('id : ' + req.body.delete_id)

        console.log("DELETE FROM users WHERE id IS " + req.body.delete_id)

        db.run("DELETE FROM users WHERE id IS " + req.body.delete_id)
        res.end()
    })


app.use(bodyParser.urlencoded({extended : false}))
app.use(router) //demande à l'application d'utiliser notre routeur

//demarre le serveur
app.listen(port, hostname, function(){
    console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port)
})