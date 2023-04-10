const express=require("express")
const {PostModel}=require("../models/Post.model")

const postRouter=express.Router()

postRouter.post('/', async(req, res) => {
    const { user_id, content } = req.body;
    
    // Validation
    if (!user_id || !content) {
      return res.status(400).json({ message: 'Both user_id and content are required.' });
    }
    if (content.length > 300) {
      return res.status(400).json({ message: 'Content should be maximum 300 characters.' });
    }
    try{
        const post = new PostModel({ user_id, content });
        await post.save()
        res.status(201).json(post);
    }catch(err){
        console.error(err);
        res.status(400).json({ message: 'Error creating post' });
      }
  });

postRouter.get('/', async (req, res) => {
    try {
      const posts = await PostModel.find();
      res.json(posts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

postRouter.get('/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const post = await PostModel.findById(req.params.id);
        if (!post) throw new Error('Post not found');
        res.json(post);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
  });

postRouter.put('/:id', async (req, res) => {
    try {
      const post = await PostModel.findById(req.params.id);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      post.content = req.body.content;
  
      await post.save();
  
      res.json(post);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });

postRouter.delete('/:id', async (req, res) => {
    try {
      const post = await PostModel.findById(req.params.id);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      await PostModel.findByIdAndDelete(req.params.id);
  
      res.json({ message: 'Post deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });

postRouter.post('/:id/like', async (req, res) => {
    try {
      const post = await PostModel.findById(req.params.id);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      post.likes++;
  
      await post.save();
  
      res.json(post);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  postRouter.post('/:id/unlike', async (req, res) => {
    try {
      const post = await PostModel.findById(req.params.id);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      if (post.likes > 0) {
        post.likes--;
      }
  
      await post.save();
  
      res.json(post);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });


  module.exports={postRouter}