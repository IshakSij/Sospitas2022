import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'

export const registerUser = async (req, res) => {
  const { username, password, repeatPassword } = req.body

  if (!username) {
    res.status(400)
    throw new Error("Invalid user data.")
  }

  if (password !== repeatPassword) {
    res.status(400)
    throw new Error("Passwords must match!")
  }

  const userExists = await User.findOne({ username })

  if (userExists) {
    res.status(400).json({ error: "User already exists" })
  }

  const user = await User.create({
    username,
    password,
    repeatPassword,
    notes: []
  })

  if (user) {
    res.status(200)
    res.json({
      _id: user._id,
      username: user.username,
      password: user.password,
      notes: []
    })
  } else {
    res.status(400).json({ error: "Invalid credentials" })
  }
}

export const loginUser = async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })

  const isPasswordCorrect = user && await bcrypt.compare(password, user.password)

  if (user && isPasswordCorrect) {
    res.status(200).json(user)
  } else {
    res.status(400).json({ error: "Invalid credentials" })
  }
}
