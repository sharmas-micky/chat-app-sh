const socket = io()


let username;
let textarea = document.querySelector('#textarea')
let messagearea = document.querySelector('.message_area')
do {
    username = prompt('please enter your name: ');
} while (!username);


textarea.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: username,
        message: message.trim()
    }
    //append to the message area
    appendMessage(msg, 'outgo')
    textarea.value = ''
    scrollTobottom()

    // send to server
    socket.emit('message',msg)

}



function appendMessage(msg,type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'message')
    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messagearea.appendChild(mainDiv)
}

// receive the message

socket.on('message',(msg)=>{
    appendMessage(msg, 'inco')
    scrollTobottom()
})

function scrollTobottom() {
    messagearea.scrollTop = messagearea.scrollHeight
}