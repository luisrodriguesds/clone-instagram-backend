const multer = require('multer');
const path = require('path');

module.exports = {
	storage: new multer.diskStorage({
		destination: path.resolve(__dirname, '..', '..', 'upload'),
		filename: (req, file, callback) =>{
			//Primeiro p é err, segundo é o nome
			const [name, ext] = file.originalname.split('.');
			callback(null, Date.now().toString()+'.'+ext)
		}
	})
}