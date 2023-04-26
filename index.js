const AppoinmtentRouter = require('./routers/appointment.router');
const LawyerRouter = require('./routers/lawyer.router');
const GoogleRouter = require("./routers/googleAuth.router")
const AdminRouter = require('./routers/admin.router');
const UserRouter = require('./routers/user.router');
const passport = require("./config/google.auth");
const cookieSession = require("cookie-session");
const connection = require('./config/db');
const express = require('express');
const cors = require('cors');

require('dotenv').config()
const PORT = process.env.PORT;

const app = express();

app.use(cors({
  origin: "https://acelegalservices.vercel.app",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', "Authorization", "Access-Control-Allow-Credentials", "Access-Control-Allow-Origin"],
  credentials: true
}));

app.use(express.json())

app.use(cookieSession({
  name: 'google-auth-session',
  keys: ["key1", "key2"],
}))

app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req, res) => {
  try {
    res.status(200).json({ Message: "Welcome to Ace-Legal-Services Backend" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ Error: err })
  }
});


//? --------Routes------------->
app.use('/user', UserRouter)
app.use('/lawyer', LawyerRouter)
app.use('/admin', AdminRouter)
app.use("/auth", GoogleRouter)
app.use("/appointment", AppoinmtentRouter)


app.listen(PORT, async () => {
  try {
    await connection
    console.log(`ALS Server running at PORT : ${PORT}`)
  } catch (error) {
    console.log({ error: error.message })
  }
})
