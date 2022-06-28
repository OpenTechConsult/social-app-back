const express = require('express')
const router = express.Router()

const PostModel = require('../models/postModel')

router.post('/post', async (req, res) => {
    const post = new PostModel({
        user: req.body.user,
        imgName: req.body.imgName,
        text: req.body.text,
        avatar: req.body.avatar,
        timestamp: req.body.timestamp
    })
    try {
        const postDataToSave = await post.save();
        res.status(200).json(postDataToSave)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.get('/posts', async (req, res) => {
    try {
        const postData = await PostModel.find()
        postData.sort((b, a) => a.timestamp - b.timestamp)
        res.json(postData)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = router