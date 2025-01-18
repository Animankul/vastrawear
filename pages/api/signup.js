import connectDb from "../../middleware/mongoose";
import User from "../../models/User";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    // Debugging Step: Check if the password is received correctly
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    try {
      // Encrypt the password using CryptoJS
      const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.AES_SECRET ).toString();

      // Save the user to the database
      let u = new User({ name, email, password: encryptedPassword });
      await u.save();

      res.status(200).json({ success: "User created successfully" });
    } catch (error) {
      console.error("Error while saving user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
