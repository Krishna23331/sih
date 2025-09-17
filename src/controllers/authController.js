const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// create token
const genToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET || "secret", { expiresIn: "7d" });

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role, language } = req.body;
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "Email already registered" });
    const user = await User.create({ name, email, password, role, language });
    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token: genToken(user._id) });
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const matched = await user.matchPassword(password);
    if (!matched) return res.status(401).json({ message: "Invalid credentials" });
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token: genToken(user._id) });
  } catch (err) { next(err); }
};
