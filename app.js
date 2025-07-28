const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");

 
const listings=require("./routes/listing");
const reviews = require("./routes/review");



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

// Home route
app.get("/", (req, res) => {
  res.send("Hello World This is Aryan");
});



// Listings routes
// Use the listings router for all routes starting with /listings
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);
  




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
