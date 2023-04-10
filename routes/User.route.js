const express=require("express")
const {UserModel}=require("../models/User.model")

const userRouter=express.Router()

userRouter.post ("/",async(req,res)=>{
    try {
        const { name, email, bio } = req.body;
        const user = new UserModel({ name, email, bio });
        await user.save();
        res.status(201);
        res.send("Registered")
      } catch (error) {
        res.status(400);
        console.log(error)
        console.log("Error in registering the user")
      }
})

userRouter.get('/', async (req, res) => {
    try {
      const users = await UserModel.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


userRouter.get('/:id', async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id);
      if (!user) throw new Error('User not found');
      res.json(user);
    } catch (error) {
        res.status(404)
        res.send({ message: "User not Found" })
    }
});

userRouter.put('/:id', async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id);
      if (!user) throw new Error('User not found');
      const { name, bio } = req.body;
      if (name) user.name = name;
      if (bio) user.bio = bio;
      await user.save();
      res.json(user);
    } catch (error) {
        res.status(404)
        res.send({ message: "User not Found" })
    }
  });

userRouter.delete('/:id', async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id);
      if (!user) throw new Error('User not found');
      await UserModel.findByIdAndDelete(req.params.id);
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(404)
        res.send({ message: "User not Found" })
    }
});
  

module.exports={
    userRouter
}