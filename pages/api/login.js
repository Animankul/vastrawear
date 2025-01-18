import connectDb from "../../middleware/mongoose";
import User from "../../models/User";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      // Find the user in the database
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ success: false, error: "No user found" });
      }

      // Decrypt the stored password
      const bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
      const decryptedPass = bytes.toString(CryptoJS.enc.Utf8);

      // Compare the decrypted password with the input password
      if (password === decryptedPass) {
        // Generate a JWT token
        const token = jwt.sign(
          { email: user.email, id: user._id },
         process.env.JWT_SECRET, // Replace with your JWT secret key
          { expiresIn: "2h" } // Token expiry time
        );

        return res.status(200).json({
          success: true,
          token: token,
          email: user.email,
          name: user.name,
        });
      } else {
        return res.status(401).json({ success: false, error: "Invalid Credentials" });
      }
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  } else {
    return res.status(400).json({ success: false, error: "This method is not allowed" });
  }
};

export default connectDb(handler);