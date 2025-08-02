const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const User = require("./models/user");
const LocalStrategy = require("passport-local").Strategy; 


const listingRouter=require("./routes/listing");
const reviewRouter = require("./routes/review");
const userRouter = require("./routes/user");

// Connect to MongoDB


const MONGO_URL = "mongodb://127.0.0.1:27017/StayEase";

async function main() {
  await mongoose.connect(MONGO_URL);
}
main()
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

const sessionOptions = {
  secret:"mysecretcode",
  resave: false,
  saveUninitialized: true,  
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: false, // Set to true if using HTTPS
  },
}


// Home route
app.get("/", (req, res) => {
  res.send("Hello World This is Aryan");
});


app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});


// app.get("/demouser", async (req, res) => {
//   let fakeuser = {
//     username: "demoUser",
//     email: "emailho@gmail.com",
//     password: "demopassword",
//   };
//   let registered= await User.register(fakeuser, fakeuser.password)
// res.send(registered);
// })


// Listings routes
// Use the listings router for all routes starting with /listings
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);




// 404 handler for all other routes
// v5
app.get('/{*splat}', async (req, res,next) => {
  next(new ExpressError(404, "Page Not Found !"));
})

// General error handler
app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong!" } = err;
  res.status(status).render("error", { errorMessage: message });
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
