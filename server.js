const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, showListen);

function showListen(){
	const port = server.address().port;
	console.log("ecouter port:"+port);
}
app.use(express.static('public'));

//webSocket
const io = require('socket.io')(server);
//(arguments) =>{ le code de la fonction}
io.sockets.on('connection', (socket) => {
//in the callback function
console.log("nouvelle connection websocket"+ socket.id);

socket.on('trigger-click-cell',(info)=> {
	console.log(info);
	io.sockets.emit('click-cell', info);
})
});

