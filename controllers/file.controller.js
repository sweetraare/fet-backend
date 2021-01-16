const multer = require('../config/multer.config.js');

const upload = multer.single('file');

const path = require('path');

const fs = require('fs');

const {exec} = require("child_process");

const pathToFile = path.join(__dirname, '../csv/file/')

exports.uploadFile = (req, res) => {
	upload(req, res, function (err) {
		if (err) {
			res.json({status: 'error', message: err.message});
		} else {
			const {file} = req;
			exec(`rm ${pathToFile}file_timetable.csv & fet-cl --inputfile=../public/archives/file.fet --htmllevel=1 --writetimetableconflicts=false --writetimetablesstatistics=false --writetimetablesxml=true --writetimetablesdayshorizontal=false --writetimetablesdaysvertical=false--writetimetablestimehorizontal=false --writetimetablestimevertical=false --writetimetablessubgroups=false --writetimetablesgroups=false --writetimetablesyears=false --writetimetablesteachers=false --writetimetablesteachersfreeperiods=false --writetimetablesrooms=false --writetimetablessubjects=false --writetimetablesactivities=false --printdetailedtimetables=false --printdetailedteachersfreeperiodstimetables=false --exportcsv=true --overwritecsv=true --language=es`, (error, stdout, stderr) => {
				if (error) console.log(`error: ${error.message}`);
				if (stderr) console.log(`stderr: ${stderr}`);
				try {
					if (fs.existsSync(`${pathToFile}file_timetable.csv`)) {
					res.sendFile(`${pathToFile}file_timetable.csv` )
					}
					else {
						res.json({status: 'error', message: stdout })
					}
				} catch(e){
					console.log('estoy en el catch')
						res.json({status: 'error', message: stdout })
				}
			});

		}
	});
};

