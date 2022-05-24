

 
let name,enterValue;
const socket = io();
do{
name = prompt('Enter your name...');

}
while(!name); 
 

const getInputValue = (messageSender)=>{
    document.querySelector('#message').addEventListener('keypress',function(e){
        if(e.key=="Enter"){
            enterValue = document.getElementById('message').value;
            let obj= {
                name:name,
                msg:enterValue,
                by:'receiver'
                
            }
            appendHtml(name,enterValue,messageSender);
            sendMessage(obj);
            document.getElementById('message').value='';
        }
    })
}
getInputValue('sender');

const appendHtml = function(name,enterValue,messageSender){
 
    const firstElement = document.createElement('div');
    const figureElement = document.createElement('figure');
    const imgElement = document.createElement('img'); 
    const MessageDiv = document.createElement('div'); 
    const firstPara = document.createElement('p'); 
    const secondPara = document.createElement('p'); 
    MessageDiv.className = "name-message-area";
    imgElement.setAttribute('src','img/c.jpg');
    imgElement.setAttribute('alt',' ');
    firstPara.innerText=name;
    secondPara.innerText=enterValue;
    if(messageSender=="sender"){
        firstElement.className="img-row recevier-message"; 
        MessageDiv.appendChild(firstPara);
        MessageDiv.appendChild(secondPara); 
        firstElement.appendChild(MessageDiv); 
        figureElement.appendChild(imgElement);
        firstElement.appendChild(figureElement);   
        document.getElementsByClassName('message-area')[0].appendChild(firstElement);
    }else{
        firstElement.className="img-row sender-message";  
        figureElement.appendChild(imgElement);
        firstElement.appendChild(figureElement);  
        MessageDiv.appendChild(firstPara);
        MessageDiv.appendChild(secondPara); 
        firstElement.appendChild(MessageDiv);   
        document.getElementsByClassName('message-area')[0].appendChild(firstElement);
    }
  
    document.querySelector('.message-area').lastElementChild.scrollIntoView()
}

socket.on('connect',()=>{
    console.log(socket.id);
    socket.on('totalOnlineUser',(data)=>{  
        console.log(data);
        document.getElementById('totalOnline').innerHTML= `${data.length} online`
    })

    
    socket.on('message',(object)=>{ 
        appendHtml(object.name,object.msg,object.by)
    });

})

const sendMessage = function(object){
    socket.emit('message',object);
}

//middleware
// socket.on("connect_error",(err)=>{
//     console.log(err instanceof Error);
//     console.log(err.message);
//     console.log(err.data);
// })

 

 
