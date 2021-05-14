// implement your posts router here
const express = require('express');
const Posts = require('./posts-model');

const router = express.Router();

router.get("/", (req, res) => {
  const messageOfTheDay = process.env.MOTD || 'Hello welcome to my API server! ٩(｡•́‿•̀｡)۶'
  res.status(200).json({ messageOfTheDay, api: "up" });
});


router.get('/', (req, res) => {
  // console.log(req)
  // console.log(res)
  Posts.find(req)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      console.log('catch errors: ',err)
      res.status(500).json({message: 'Error retrieving posts'})
    })
})

router.get('/:id', (req, res)=>{
  const {id} = req.params
  console.log(id)

  Posts.findById(id)
    .then(id => {
      if(id){
        // status 200 => typically for gets, head, put or post, trace
        // status 201 => for POST and some put
        res.status(200).json(id)
      }else{
        res.status(404).json({message: 'Post does not exist'})
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: 'Error retrieving post'})
    })
})

router.post('/', (req, res)=>{
  // posting the request body, have to see the model to see what needs to be posted
  Posts.insert(req.body)
    .then(post => {
      console.log(req.body)
      res.status(201).json(post)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: 'Error creating post'
      })
    })
})

router.put('/:id', (req, res)=>{
  const {id} = req.params
  // when updating DONT FORGET TO MAKE A CONST FOR THE REQ BODY
  const changes = req.body
  Posts.update(id, changes)
    .then(post => {
      if(post){
        res.status(201).json(post)
      }else{
        res.status(404).json({
          message: 'The post you tried to update could not be found'
        })
      }
    })
    .catch(err=> {
      console.log(err)
      res.status(500).json({
        message: 'Could not update post'
      })
    })
})

router.delete('/:id', (req, res)=>{
  const {id} = req.params
  Posts.remove(id)
    .then(post => {
      if(post > 0){
        res.status(200).json({message: 'Post deleted'})
      }else{
        res.status(404).json({message: 'Post does not exist'})
      }
    })
    .catch(err=>{
      console.log(err)
      res.status(500).json({message: 'Error removing post'})
    })
})

router.get('/:id/comments', (req, res)=>{
  const {id} = req.params
  Posts.findPostComments(id)
    .then(comments => {
      if(comments.length > 0){
        res.status(200).json(comments)
      }else{
        res.status(404).json({message: 'Comments not found'})
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: 'Error retrieving comments'})
    })
})


module.exports = router;