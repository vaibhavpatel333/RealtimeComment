const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

const dbConnect = require('./db')
const commentModel = require('./model/blogcomment')

app.use(express.json())

app.post('/api/comment',(req,res,next)=>{

    const saveComment = new commentModel({username:req.body.username,comment:req.body.comment});
    saveComment.save()
    .then(data=>{
        res.send(data);
    })
})

app.get('/api/comment', (req, res) => {
    commentModel.find().then(function(data) {
        res.send(data)
    })
})


const server = app.listen(port, () => {
    console.log(`Server app listening on ${port}`)
})

//const connection= require('./db');
const io = require('socket.io')(server);
//const commentModel = require('./model/blogcomment');
const { response } = require('express')
    
io.on("connection",(socket)=>{
    console.log("New Connection of"+socket.id)
    socket.on('emitcomment',(data)=>{     //come from client whoever comment
             
        data.time = Date()  // add current time
        socket.broadcast.emit('brodcomment',data)              // send to other online users
    })

    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing',data) 
    })
})





 
