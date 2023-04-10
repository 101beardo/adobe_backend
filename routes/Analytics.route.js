const express=require("express")
const {UserModel}=require("../models/User.model")
const {PostModel}=require("../models/Post.model")

const analyticsRouter=express.Router()

analyticsRouter.get('/users', async (req, res) => {
    try {
      const count = await UserModel.countDocuments();
      res.json({ count });
    } catch (error) {
      res.status(500)
      console.log(error)
      console.log("Error in counting the total number of users")
    }
  });

// GET /analytics/users/top-active
analyticsRouter.get('/users/top-active', async (req, res) => {
    try {
      const users = await UserModel.aggregate([
        {
          $lookup: {
            from: 'posts',
            localField: '_id',
            foreignField: 'user_id',
            as: 'posts'
          }
        },
        {
          $project: {
            _id: 1,
            name: 1,
            email: 1,
            bio: 1,
            created_at: 1,
            updated_at: 1,
            post_count: { $size: '$posts' }
          }
        },
        {
          $sort: { post_count: -1 }
        },
        {
          $limit: 5
        }
      ]);
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
});

// GET /analytics/posts
analyticsRouter.get('/posts', async (req, res) => {
    try {
      const count = await PostModel.countDocuments();
      res.json({ count });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
});

// GET /analytics/posts/top-liked
analyticsRouter.get('/posts/top-liked', async (req, res) => {
    try {
      const posts = await PostModel.find().sort({ likes: -1 }).limit(5);
      res.json(posts);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
});
  
  module.exports={
    analyticsRouter
}