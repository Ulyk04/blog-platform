const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;
const usersList = path.join(__dirname , 'users.js');

app.use(cors())
app.use(bodyParser.json());

function Loading() {
    if(!fs.existsSync(usersList)) return []

    const data = fs.readFileSync(usersList);
    return JSON.parse(data);
}

function Saving(user) {
    fs.writeFileSync(usersList , JSON.stringify(user , null , 2));
}

app.post('/' , (req , res) => {
    const {email , password} = req.body;
    const USING = Loading();
    
    const userExist = USING.find((u) => u.email === email);

    if(userExist){
        return res.status(400).json({message: 'This user is already registered'});
    }

    const NewUser = {email , password};

    USING.push(NewUser);
    Saving(USING);

    res.status(200).json({message: 'You registered succesfull'});

})

app.post('/login' , (req , res) => {
    const {email , password} = req.body;
    const USING = Loading();

    const user = USING.find((u) => u.email === email && u.password === password);

    if(!user){
        return res.status(400).json({message: 'Invalid credentials'});
    }

    res.status(200).json({message: 'Welcome'})

})

app.listen(PORT , () => {
    console.log(`You in server ${PORT}`)
})