const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    id: { type: Number },
    username: { type: String },
    password: { type: String },
    type: { type: String }
})

const ProductSchema = mongoose.Schema({
    name: String,
    description: String,
    cost: Number,
    gst: Number,
    totalprice: Number,
    img: String,
    status: {
        type: String,
        enum: ['Pending', 'verified', 'rejected'],
        default: 'Pending'
    }
})

const CartSchema = mongoose.Schema({
    id: Number,
    username: String,
    name: String,
    description: String,
    cost: Number,
    gst: Number,
    totalPrice: Number,
    img: String,
})


const User = mongoose.model('User', UserSchema);
const Product = mongoose.model('Product', ProductSchema);
const Cart = mongoose.model('Cart', CartSchema);

module.exports = {
    User: User,
    Product: Product,
    Cart:Cart
};

