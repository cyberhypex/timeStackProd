const User=require('../Models/UserSchema')

const bcrypt=require('bcrypt')

const jwt=require('jsonwebtoken')

const userSignUp = async (req, res) => {
    const { username, email, password, age, gender,avatar } = req.body;

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Kindly fill in the required details" });
        }

        const emailNormalized = email.toLowerCase();

        const existingUser = await User.findOne({
            $or: [{ email: emailNormalized }, { username }]
        });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email: emailNormalized,
            password: hashedPassword,
            age,
            gender,
            avatar
        });

        const jwtToken = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        );

        const { password: _, ...userData } = newUser._doc;

        return res.status(201).json({
            message: "User created successfully",
            jwtToken,
            user: userData
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Kindly fill in the required details" });
        }

        const emailNormalized = email.toLowerCase();

        let existingUser = await User.findOne({ email: emailNormalized });
        if (!existingUser) {
            return res.status(401).json({ message: "Invalid credentials provided." });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials provided." });
        }

        const jwtToken = jwt.sign(
            { userId: existingUser._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "24h" }
        );

        const { password: _, ...userWithoutPassword } = existingUser.toObject();

        return res.status(200).json({
            jwtToken,
            user: userWithoutPassword
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
module.exports={userSignUp,userLogin};