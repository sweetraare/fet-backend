const multer = require('multer');
const path = require('path');
const util = require('util');

const DIR = '../../public/archives';

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, DIR));
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '.fet')
	}
});

const generateXML = () => {
	const myPromise =  util.promosify(storage)
	myPromise.then(() => console.log('se ejecuto la promesa'))
	.catch(e => console.error(e))

}

module.exports = multer({
	storage: storage
});
