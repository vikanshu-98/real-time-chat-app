const express =  require('express')
const path     = require('path')
const app     = express() 
const httpServer  = require('http').createServer(app);
const port   = process.env.PORT ||3300
 

app.use(express.static(__dirname+'/public'))
app.get('/',(req,res)=>{ 
    res.sendFile(__dirname+'/index.html') 
})

const io =require('socket.io')(httpServer)
io.on('connection',(socket)=>{ 
    console.log(socket.id);
    socket.on('message',(message)=>{
        socket.broadcast.emit('message',message);
    })
 
})

 

// const io =require('socket.io')(httpServer);
// io.on('connection',(socket)=>{
//     console.log("connected"+socket.id);
//     console.log(socket.rooms); 
    
//     const listener  = (...args)=>{
//         console.log(args);
//     }
//     socket.on('message',(value,callback)=>{
//         console.log(value);
//         callback({
//             status:"ok"
//         });
//     }); 
//     socket.emit('message-reply','Hi client how are you?',(response)=>{
//         console.log(response.status);
//     })

// })

// io.use((socket,next)=>{
//     if((socket.request)) next() 
//     else{
//         const err =  new Error('not authorized')
//         err.data={content:"please retry later"}
//         next(err)
//     }
// })


httpServer.listen(port,()=>{console.log(`${port}`);})


