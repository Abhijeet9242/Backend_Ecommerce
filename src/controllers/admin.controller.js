const express = require('express');
const router = express.Router();

const Admin = require("../models/admin.model")

router.get('/', async (req, res) => {
    try {
        const admin = await Admin.find();
        return res.status(200).json({
            admin
        });
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});

router.post('/register', async (req, res) => {
    try {
        const {email,password} = req.body
        Admin.findOne({ email })
        .then((existingAdmin) => {
          if (existingAdmin) {
            res.status(400).json({ error: 'Email already in use' });
          } else {
            const newAdmin = new Admin({email, password });
            newAdmin.save()
              .then(() => res.json({ message: 'Admin registered successfully' }))
              .catch((err) => res.status(500).json({ error: err.message }));
          }
        })
        .catch((err) => res.status(500).json({ error: err.message }));
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});




router.post("/login",async(req,res)=>{
    const { email, password } = req.body;
    try {
      const admin = await Admin.findOne({ email });
      if (!admin || admin.password !== password) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
    res.json({admin});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
})

module.exports = router