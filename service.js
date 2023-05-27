// const db = require('./db')

const connectDB = require('./db')
const db = require("./models/model")
connectDB()

// login

const login = (username, password) => {
    return db.User.findOne({ username, password })
        .then(data => {
            console.log("data:", data);
            if (data) {
                return {
                    status: true,
                    statuscode: 200,
                    message: "Succesfull",
                    data
                }
            }
            else {
                return {
                    status: false,
                    statuscode: 400,
                    message: "Incorrect password / username"
                }
            }
        })
}



// product posting
const postproduct = (name, description, cost, gst, totalprice, img, status) => {
    return  db.Product.findOne({ name })
        .then(data => {
            if (data) {
                console.log("Dadata", data);
                return {
                    statuscode: 400,
                    status: false,
                    message: "Already exist"
                }
            }
            else {
                const newProduct = new db.Product({ name, description, cost, gst, totalprice, img, status })
                console.log("newProduct", newProduct);
                newProduct.save()
                return {

                    statuscode: 200,
                    status: true,
                    message: "Product Add successfully",
                    data

                }
            }
        })
}






// product geting
const getproduct = () => {
    return db.Product.find()
        .then(data => {
            console.log("products",data);
            return {
                statuscode: 200,
                status: true,
                message: "Shown successfull",
                data
            }
        })
}



const updateproduct = (name, description, cost, gst, totalprice, img, status) => {
    return db.Product.findOne({ name })
        .then(data => {
            if (data) {
                const newProduct = new db.Product({ name, description, cost, gst, totalprice, img, status })
                newProduct.save()
                return {
                    statuscode: 200,
                    status: true,
                    message: "Product update successfully",
                }
            }
            else return {
                statuscode: 400,
                status: false,
                message: "not exist"
            }

        })
}

// delete
const deleteproduct = (name) => {
    return db.Product.deleteOne({ name })
        .then((result) => {
            console.log("result", result);
            if (result) {
                return {
                    result,
                    status: true,
                    message: "Deletered  successfully",
                    statuscode: 200,
                    "id": name
                }
            }
            else {
                return {
                    status: false, message: "Deletered  failed", statuscode: 400
                }
            }
        })
}




const buys = (username, name, description, cost, gst, discount, totalPrice, img) => {
    return db.Cart.create({
        username,
        name,
        description,
        cost,
        gst,
        discount,
        totalPrice,
        img
    }).then(newCart => {
        console.log("ED: ", newCart);
        return {
            statuscode: 200,
            status: true,
            message: `${name} added to Cart`,
            newCart
        };
    });
}





const mycart = (username) => {
    return db.Cart.find({ username })
        .then((data) => {
            if (data) {
                console.log("da", data);
                return {
                    statuscode: 200,
                    status: true,
                    message: " showlist ",
                    data
                }
            }
            else {
                return {
                    statuscode: 400,
                    status: false,
                    message: "not show"
                }
            }
        })
}




const deleteCartItem = async (username, name) => {
    try {
        const result = await db.Cart.deleteOne({ username, name });
        if (result.deletedCount === 1) {
            return {
                statuscode: 200,
                status: true,
                message: `Item with name ${name} has been deleted from the cart.`,
            };
        } else {
            return {
                statuscode: 404,
                status: false,
                message: `No item found with name ${name} in the cart of user ${username}.`,
            };
        }
    } catch (error) {
        console.error(error);
        return {
            statuscode: 500,
            status: false,
            message: "An error occurred while deleting the item from the cart.",
        };
    }
};


const productview = (name) => {
    return db.Product.find({ name })
        .then(result => {
            if (result) {
                console.log("resltt", result)
                return {
                    statuscode: 200,
                    status: true,
                    message: "data found",
                    result
                }
            }
            else {
                return {
                    statuscode: 400,
                    status: false,
                    message: "not data",
                }
            }
        })
}






module.exports = { login, postproduct, getproduct, updateproduct, deleteproduct, mycart, buys, deleteCartItem, productview }


