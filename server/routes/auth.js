import express from 'express'
import User from '../models/User.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import middleware from '../middleware/middleware.js';
import crypto from "crypto";
import nodemailer from "nodemailer";

const router = express.Router()

router.post('/signup', async (req,res) => {
    try {
        const {name, email, password} = req.body;
        const user = await User.findOne({email})
        if(user) {
            return res.status(401).json({success: false, message: "User already exist"})
        }
        /* change normal password in hash like bcrypt password */
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            name, email, password: hashPassword
        })

        await newUser.save()

        return res.status(200).json({success: true, message: "Accounted Created Successfully"})

    } catch(error) {
        console.log(error.message) /* Show error in console on server side*/
        return res.status(500).json({success: true, message: "Error is Adding User"}) /* Server Error */
    }
});

router.post('/login', async (req,res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email})
        if(!user) {
            return res.status(401).json({success: false, message: "User Not exist"})
        }
        /* change normal password in hash like bcrypt password */
        const checkPassword = await bcrypt.compare(password, user.password)
        if(!checkPassword) {
            return res.status(401).json({success: false, message: "Wrong Credentials"})
        }

        /* Generte tokens */
        const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "5h" }
)

        return res.status(200).json({success: true, token, user: {name: user.name}, message: "Login Successfully"})

    } catch(error) {
        console.log(error.message) /* Show error in console on server side*/
        return res.status(500).json({success: true, message: "Error in Login Server"}) /* Server Error */

    }

});

router.get('/verify', middleware, async (req,res) => {
    return res.status(200).json({success: true, user: req.user})

})
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    console.log("Email:", email); // DEBUG

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rjcirshadkhan12sci624@gmail.com",
        pass: "udnligmrfgxzkypq",
      },
    });

    const link = `http://localhost:5173/reset/${token}`;

    // ✅ FIXED MAIL
    const info = await transporter.sendMail({
      from: "yourgmail@gmail.com", // 🔥 IMPORTANT
      to: user.email,
      subject: "Password Reset",
      html: `
        <h3>Password Reset</h3>
        <p>Click below link to reset password:</p>
        <a href="${link}">${link}</a>
      `,
    });

    console.log("Mail Sent:", info); // DEBUG

    res.json({
      success: true,
      message: "Reset link sent to email",
    });

  } catch (error) {
    console.log("❌ ERROR:", error); // FULL ERROR PRINT
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Token expired",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    user.password = hashPassword;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    res.json({ success: true });
  } catch (error) {
    console.log("Reset Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});
export default router