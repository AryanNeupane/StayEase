const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:String,
    description: String,
    image: {
        type: String,
        default:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set: (v) => {
            return v === ""
                ? "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                : v;
        }
    },
    price: Number,
    location: String,
    country: String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review",
    }],
});

listingSchema.post("findOneAndDelete", async(listing)=> {
    if (listing) {
        await review.deleteMany({
            _id: {
                $in: listing.reviews,
            },
        });
    }
} );


const Listing = mongoose.model("Listing", listingSchema);

module.exports= Listing; 
