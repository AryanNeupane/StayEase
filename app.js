const express = require("express")
const app = express()
const mongoose = require('mongoose');
const path=require("path")
const Listing = require("./models/listing")
const methodOverride=require("method-override")

const MONGO_URL = 'mongodb://127.0.0.1:27017/StayEase'


async function main() {
  await mongoose.connect(MONGO_URL);
}
main().then(() => {
  console.log("Database Connected")
}).catch((err) => {
  console.log(err)
})

app. set ("view engine", "ejs");
app. set ("views", path. join(__dirname, "views"));
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))





// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My New Villa",
//     description: "By the beach",
//     price: 1200,
//     location: "Calangute, Goa",
//     country: "India",
//   })

//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successful testing");
// })



app.get('/', (req, res) => {
  res.send('Hello World This is Aryan')
})

// Index Route
app.get('/listings', async (req, res) => {
const allListings = await Listing.find({})
res.render("listings/index.ejs",{allListings})
});
  
// New Route 
app.get('/listings/new', (req, res) => {
  res.render("listings/new.ejs")
})




// Show Route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  id = id.trim(); 

  try {
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).send("Listing not found");
    }
    res.render("listings/show.ejs", { listing });
  } catch (err) {
    console.error("Invalid ID format:", err.message);
    res.status(400).send("Invalid listing ID.");
  }
});


//Create Route 

app.post("/listings",async(req,res)=>{
  const newListing=new Listing(req.body.listing)
  await newListing.save()
  res.redirect("/listings")
})


//Edit Route
app.get("/listings/:id/edit", async (req, res)=>{
let { id }= req.params;
const listing = await Listing. findById(id) ;
res.render( "listings/edit.ejs" ,{ listing } ) ;
})

//Update Route

app.put("/listings/:id", async (req, res) => {
  let {id} = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect("/listings")

})

// Delete Route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});




app.listen(3000, () => {
  console.log("Server is running.")
})
