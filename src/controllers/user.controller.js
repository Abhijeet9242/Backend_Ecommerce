const express = require("express");
const router = express.Router();

const User = require("../models/user.model");

router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    return res.status(200).json({
      user,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    User.findOne({ email })
      .then((existingUser) => {
        if (existingUser) {
          res.status(400).json({ error: "Email already in use" });
        } else {
          const newUser = new User({ name, email, password });
          newUser
            .save()
            .then(() => res.status(201).json({ message: "User registered successfully",status:200,data:newUser}))
            .catch((err) => res.status(500).json({ error: err.message }));
        }
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res.json({ user , status:201})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//add to cart


router.get("/cart/:id", async (req, res) => {
  const userId = req.params.id
  try {
    const user = await User.findById(userId).populate("cart")
    return res.status(200).json({
      user,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

//delete user specific cart item
router.patch("/cart/delete/:userId",async(req,res)=>{
  try {
    const userId = req.params.userId;
    const productId = req.body.productId;

    console.log(userId,"us")
    console.log(productId,"po")

    const user = await User.findById(userId);

    user.cart = user.cart.filter(item => item._id.toString() !== productId);

    await user.save();

    res.status(200).json({ message: 'Product deleted from cart' });
      } catch (error) {
        console.error('Error deleting product from cart:', error);
        res.status(500).json({ error: 'Something went wrong' });
      }
    });


    //delete user specific whole cart
    router.patch(("/cart/deletecart/:userId"), async(req,res)=>{
      try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
    
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        user.cart = [];
        await user.save();
    
        res.json({ message: 'Cart cleared successfully' });
    } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  




router.patch("/cart", async (req, res) => {
  console.log(req.body);
  const { userId, productId } = req.body;
  try {
    const data = await User.findByIdAndUpdate(
      userId,
      {
        $push: { cart: [productId] },
      },
      { new: true }

     
    );

   res.status(200).json({
      message: "Product Added Successfully",
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});



module.exports = router;
