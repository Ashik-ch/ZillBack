const mongoose = require('mongoose')
mongoose.set('strictQuery', true);

const DB_URI = 'mongodb+srv://ashikch:71177117@cluster0.pwmdsoj.mongodb.net/mynodejsdb?retryWrites=true&w=majority'
                 
const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI)
        console.log("DB Connected");
    } catch (error) {
        console.log("Error while connecting" + error.message);
    }
}
module.exports = connectDB





// const mongoose = require('mongoose')
// mongoose.set('strictQuery', true);
// mongoose.connect('mongodb://127.0.0.1:27017/ZillCart', {
//     useNewUrlParser: true
// })
// const User = mongoose.model('User', {
//     id: Number,
//     username: String,
//     password: String,
//     type: String,
// })
// const Product = mongoose.model('Product', {
//     // id: Number,
//     name: String,
//     description: String,
//     cost: Number,
//     gst: Number,
//     totalprice: Number,
//     img: String,
//     // status: String
//     status: {
//         type: String,
//         enum: ['Pending', 'verified', 'rejected'],
//         default: 'Pending'
//     }
// })


// const Cart = mongoose.model('Cart', {
//     id: Number,
//     username: String,
//     name: String,
//     description: String,
//     cost: Number,
//     gst: Number,
//     totalPrice: Number,
//     img: String,
// })

// module.exports = { User, Product, Cart }



