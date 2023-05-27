const express = require('express')
const service = require('./service')
const app = express()
const cors = require('cors')
// const db = require('./db')

const connectDB = require('./db')
const db = require("./models/model")
connectDB()
app.use(cors({
    origin: '*'
}))
app.use(express.json())


app.get('/', (req, res) => {
    try {
        res.send('Hello, World!');
    }
    catch (error) {
        console.log("failed", error);
    }
})


app.get('/register', async (req, res) => {
    try {
        const users = await db.User.find({})
        res.json(users)
    } catch (error) {
        console.log("the error is:", error);
    }
})

app.post('/register', async (req, res) => {
    try {
        await User.create({
            id: req.body.id,
            username: req.body.username,
            password: req.body.password,
            type: req.body.type,
        })
        res.send("User created")
    }
    catch (error) {
        console.log("error is", error);
    }
})



app.post('/login', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user = await db.User.findOne({ username, password }).exec();
        if (!user) {
            res.status(401).send({
                error: 'Incorrect username or password'
            });
        } else {
            res.send({
                message: 'Login successful',
                status: true,
                "statuscode": 400,
                result: user
            });
        }
    } catch (err) {
        res.status(500).send({
            error: 'Error finding user in database'
        });
    }
});


// addproduct
app.post('/product', (req, res) => {
    const cost = parseFloat(req.body.cost);
    const gst = parseFloat(req.body.gst);
    const totalPrice = cost + cost * (gst / 100);
    const status = "Pending"
    service.postproduct(req.body.name, req.body.description, req.body.cost, req.body.gst, totalPrice, req.body.img, status)
        .then(data => {
            res.status(data.statuscode).json(data)
        })
})


// // getlist product
app.get('/product', (req, res) => {
    service.getproduct()
        .then(data => {
            res.status(data.statuscode).json(data)
        })
})





// login
// app.post('/login', (req, res) => {
//     const name = req.body.username;
//     const password = req.body.password;
//     db.User.findOne({ name, password }, (err, result) => {
//         if (err) {
//             res.status(500).send({ error: 'Error finding user in database' });
//         } else if (!result) {
//             res.status(401).send({ error: 'Incorrect username or password' });
//         } else {
//             res.send({ message: 'Login successful', status: true, "statuscode": 400, result });
//         }
//     });
// });


// app.post('/login', (req, res) => {
//     service.login(req.body.username, req.body.password)
//         .then(data => {
//             res.status(data.statuscode).json(data)
//         })
// })



// addproduct
// app.post('/product', (req, res) => {
//     const cost = parseFloat(req.body.cost);
//     const gst = parseFloat(req.body.gst);
//     const totalPrice = cost + cost * (gst / 100);
//     const status = "Pending"
//     service.postproduct(req.body.name, req.body.description, req.body.cost, req.body.gst, totalPrice, req.body.img, status)
//         .then(data => {
//             console.log("datA", data);
//             res.status(data.statuscode).json(data)
//         })
// })

// // //  addproduct
// // app.post('/products', async (req, res) => {
// //     const { name, description, cost } = req.body;
// //     const product = new db.Product({ name, description, cost });
// //     try {
// //         await product.save();
// //         res.status(201).send(product);
// //     } catch (error) {
// //         res.status(500).send(error);
// //     }
// // });




// // getlist product
// app.get('/product', (req, res) => {
//     service.getproduct()
//         .then(data => {
//             res.status(data.statuscode).json(data)
//         })
// })

// // admin status
app.put('/approvestatus', async (req, res) => {
    try {
        const item = req.body;
        console.log("item", item);
        db.Product.updateOne(
            { name: item.name },
            { status: item.status })
            .then((document) => {
                res.json(document);
            });
    } catch (err) {
        next(err);
    }
})

// // superAdmin status
app.put('/verifystatus', async (req, res) => {
    try {
        const item = req.body;
        console.log("item", item);
        db.Product.updateOne(
            { name: item.name },
            { status: item.status })
            .then((document) => {
                res.json(document);
            });
    } catch (err) {
        next(err);
    }
})


// // app.delete('/delete', async (req, res) => {
// //     service.deleteproduct(req.body.name)
// //         .then(data => {
// //             if (data) {
// //                 res.status(data.statuscode).json(data)
// //             }
// //         })
// // })


app.delete('/products/:id', (req, res) => {
    const id = req.params.id;
    db.Product.deleteOne({ _id: id })
        .then(() => {
            res.status(200).json({ message: 'Product deleted successfully!' });
        })
        .catch((error) => {
            res.status(500).json({ error: error });
        });
});



// // adding cart
app.post('/cart', (req, res) => {
    const cost = parseFloat(req.body.cost);
    const gst = parseFloat(req.body.gst);
    const totalPrice = cost + cost * (gst / 100);
    console.log("aa",cost,gst,totalPrice);
    service.buys(req.body.username, req.body.name, req.body.description, req.body.cost, req.body.gst, req.body.discount, totalPrice, req.body.img,)
        .then(data => {
            res.json(data)
        })
})

// geting cart
app.get('/mycart/:username', (req, res) => {
    service.mycart(req.params.username)
        .then(data => {
            console.log("daa", data);
            res.status(data.statuscode).json(data)
        })
})

// // delete in cart 
app.delete('/mycart/:username/:name', (req, res) => {
    const { username, name } = req.params;
    service.deleteCartItem(username, name)
        .then(data => {
            console.log("daa", data);
            res.status(data.statuscode).json(data);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({
                statuscode: 500,
                status: false,
                message: "An error occurred while deleting the item from the cart."
            });
        });
});

// // clear cart
app.delete('/mycart/:username', (req, res) => {
    const username = req.params.username;
    db.Cart.deleteMany({ username })
        .then((data) => {
            res.status(200).json({ message: 'Cart deleted  successfully!', data });
        })
        .catch((error) => {
            res.status(500).json({ error: error });
        });
});


app.get('/adminuserhome/:name', (req, res) => {
    service.productview(req.params.name)
        .then(data => {
            console.log("view", data);
            res.status(data.statuscode).json({
                statuscode: data.statuscode,
                status: data.status,
                data: data.result
            });
        })
})


// //  app.get('/product/:name', (req, res) => {
// //     service.productview(req.params.name)
// //         .then(data => {
// //             console.log("view", data);
// //             res.status(data.statuscode).json(data)
// //         })
// // })


// // app.delete('/cart', function (req, res) {

// //       if (err) throw err;
// //       const db = client.db(dbName);
// //       db.collection('cart').deleteMany({}, function (err, result) {
// //         if (err) throw err;
// //         res.send(result);
// //         client.close();
// //       });
// //     });











const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`running port ${PORT}`);
})