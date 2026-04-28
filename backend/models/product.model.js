import mongoose from 'mongoose'

const productSchema = mongoose.model("Product", {
    id: String,
    name: String,
    price: Number,
    image: String,
    productAvailability: Boolean,
    description: String
})


export default productSchema;