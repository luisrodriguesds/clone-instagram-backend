const Post 	= require('../models/Post');
const sharp = require('sharp');
const path 	= require('path');
const fs	= require('fs');

module.exports = {
	async index(req, res){
		const post = await Post.find().sort('-createdAt');
		return res.json(post);
	},

	async store(req, res){
		const {author, place, description, hastag} = req.body;
		const {filename: image} = req.file;

		//Para reduzir o tamanho da imagem
		await sharp(req.file.path)
				.resize(500).jpeg({quality:70})
				.toFile(path.resolve(req.file.destination, 'resized', image));

		fs.unlinkSync(req.file.path);

		const post = await Post.create({author, place, description, hastag, image});

		//emitir para todos os usuários connectados
		req.io.emit('post', post);

		return res.json(post);
	}
}