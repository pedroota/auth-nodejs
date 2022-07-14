const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
// Importing all Routes
const authRoute = require("./routes/auth")
const postsRoute = require("./routes/posts")

dotenv.config()

mongoose.connect(process.env.DB_CONNECT)

app.use(express.json())

app.use("/api/user", authRoute)
app.use("/api/posts", postsRoute)

app.listen(3000, () => console.log("🚀 Server's running!"))