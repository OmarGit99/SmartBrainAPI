const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');



const app  = express();
app.use(cors());
app.use(bodyParser.json());
const database = {
    users: [
        {
            id: '123',
            name: 'john',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req,res) =>{
    res.send(database.users);
})

app.post('/image',(req,res) => {
    database.users.forEach(user => {
        const {id} = req.body;
        if(user.id === id){
            user.entries += 1;
            return res.json(user);
        }
    })
})

app.get('/profile/:id', (req,res) =>{
    const {id} = req.params;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            return res.json(user);
        }
        
    })
    if(!found){
        res.status(404).json('user not found');
    }

})
app.post('/signin',(req, res) =>{
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json('success');
    }
    else{
        res.status(400).json('error logging in');
    }
})
app.post('/register', (req, res) => {
    const {email,name,password} = req.body;

    
    
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1]);
})



app.listen(3000, () => {
    console.log('app is running on port 3000');
})


/*
bcrypt.hash(password, null, null, function(err, hash) {
        
    });
// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});
*/


/*
/ --> = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT ---> user
*/
