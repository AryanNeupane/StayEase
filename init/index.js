
const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");


const MONGO_URL = 'mongodb://127.0.0.1:27017/StayEase'


async function main() {
  await mongoose.connect(MONGO_URL);
}
main().then(() => {
  console.log("Database Connected")
}).catch((err) => {
  console.log(err)
})

const initDB=async()=>{
     await Listing.deleteMany({})
     initData.data=initData.data.map((item) => ({...item, owner: '688e3d0ddb6071c57d53dd7d'}) )
    await Listing.insertMany(initData.data)
    console.log("intitalized")
    console.log(initData.data)
}
initDB()