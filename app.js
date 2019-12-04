const express =require('express');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');

const app = express();
app.use(express.json());

//MySQL details
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tasks',
    multipleStatements: true
    });

mysqlConnection.connect((err)=> {
    if(!err)
    console.log('Connection Established Successfully');
    else
    console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
    });

app.get('/api',(req,res)=>{
    res.send('hello world');
});

//Creating GET Router to fetch all the tasks details from the MySQL Database for userid 1
app.get('/api/allTasks',verifyToken,(req,res)=>{

    jwt.verify(req.token,'secretKey',(err,authData)=>{
        if(err){
            console.log(err);
            res.sendStatus(403)
        }else{
            mysqlConnection.query('SELECT * FROM tasks where user_id=1', (err, rows, fields) => {
                if (!err)
                    res.send(rows);
                else
                console.log(err);
            })
       }           
    })
});

//Creating GET Router to fetch all the tasks details from the MySQL Database for specific task id
app.get('/api/allTasks/:id',verifyToken,(req,res)=>{

    jwt.verify(req.token,'secretKey',(err,authData)=>{
        if(err){
            console.log(err);
            res.sendStatus(403)
        }else{
            mysqlConnection.query('SELECT * FROM tasks where user_id=1 and id=?',[req.params.id] ,(err, rows, fields) => {
                if (!err)
                    res.send(rows);
                else
                console.log(err);
            })
       }           
    })
});
//delete router to delete based on task id
app.delete('/api/allTasks/:id',verifyToken,(req,res)=>{

    jwt.verify(req.token,'secretKey',(err,authData)=>{
        if(err){
            console.log(err);
            res.sendStatus(403)
        }else{
            mysqlConnection.query('SELECT * FROM tasks where user_id=1 and id=?',[req.params.id] ,(err, rows, fields) => {
                if (!err)
                    res.send('Task Record deleted successfully.');
                else
                    console.log(err);
            })
       }           
    })
});

//update details of the task
app.put('/api/allTasks',verifyToken,(req,res)=>{

    var taskName = req.body.taskName;
    var taskId = req.body.taskId;

    jwt.verify(req.token,'secretKey',(err,authData)=>{
        if(err){
            console.log(err);
            res.sendStatus(403)
        }else{
            mysqlConnection.query('update tasks set task_name= ? where user_id=1 and id=?',[taskName,taskId] ,(err, rows, fields) => {
                if (!err)
                    res.send('Task Record updated successfully.');
                else
                    console.log(err);
            })
       }           
    })
});

//update details of the task
app.put('/api/allTasks',verifyToken,(req,res)=>{

    var taskName = req.body.taskName;
    var taskId = req.body.taskId;

    jwt.verify(req.token,'secretKey',(err,authData)=>{
        if(err){
            console.log(err);
            res.sendStatus(403)
        }else{
            mysqlConnection.query('update tasks set task_name= ? where user_id=1 and id=?',[taskName,taskId] ,(err, rows, fields) => {
                if (!err)
                    res.send('Task Record updated successfully.');
                else
                    console.log(err);
            })
       }           
    })
});

//insert new task
app.post('/api/allTasks',verifyToken,(req,res)=>{

    var taskName = req.body.taskName;
    var taskDate = req.body.taskDate;

    jwt.verify(req.token,'secretKey',(err,authData)=>{
        if(err){
            console.log(err);
            res.sendStatus(403)
        }else{
            mysqlConnection.query('insert into tasks values(?,?,?,1)',[,taskName,taskDate,1] ,(err, rows, fields) => {
                if (!err)
                    res.send('Task inserted successfully.');
                else
                    console.log(err);
            })
       }           
    })
});

//Login Route to create jwt token
app.post('/api/login',(req,res)=>{

    const user ={
        id : 1,
        username: 'pointy',
        email: 'pointy@gmail.com'
    }
    jwt.sign({user:user},'secretKey',(err,token)=>{
        res.json({
            token
        })

    });

})
//function verifytoken

function verifyToken(req,res,next){
    console.log(req.headers);
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);
    if(typeof bearerHeader != 'undefined'){

        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        
        req.token = bearerToken;
        next();

    }else{
        res.sendStatus(403);
    }
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}..`));


