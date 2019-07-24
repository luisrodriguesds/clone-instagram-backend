const express 	= require('express');
const mongoose 	= require('mongoose');
const path		= require('path');
const cors		= require('cors');

const app = express();

const server = require('http').Server(app);
const io 	 = require('socket.io')(server);

mongoose.connect('mongodb+srv://luis:97646060ita@cluster0-btlqt.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser:true});

//Compartilhar o io
app.user((req, res, next) => {
	req.io = io;
	next();
})

//Para qualquer um acessar
app.use(cors());

//Caminho para acessar as imagens
app.use('/files', express.static(path.resolve(__dirname, '..', 'upload', 'resized')));

app.use(require('./routes'));

server.listen(3333);