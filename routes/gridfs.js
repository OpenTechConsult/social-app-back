const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const streamifier = require('streamifier')
const fs = require('fs')

router.post('/upload', (req, res) => {

    let filename = req.files.foo.name
    console.log(filename)

    const gridfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        chunkSizeBytes: 1024,
        bucketName: 'filesBucket'
    });

    streamifier.createReadStream(req.files.foo.data)
        .pipe(gridfsBucket.openUploadStream(filename))
        .on('error', (error) => {
            assert.ifError(error);
        })
        .on('finish', () => {
            console.log('done!');
            res.status(200).json({
                success: true,
                msg: 'File Uploaded successfully..'
            });
        });
})

router.get('/download/:filename', (req, res) => {

    const filename = req.params.filename;

    console.log(filename);


    const gridfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        chunkSizeBytes: 1014,
        bucketName: 'filesBucket'
    });

    gridfsBucket.openDownloadStreamByName(filename)
        .pipe(fs.createWriteStream('./' + filename))
        .on('error', (error) => {
            console.log('error: ' + error);
            res.status(404).json({
                msg: error.message
            });
        })
        .on('finish', () => {
            console.log('done!');
            res.send('Downloaded successfully!');
        });
});

module.exports = router