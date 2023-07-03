const express = require('express');
const app = express();
const morgan = require('morgan')
const {products , movies} = require ('./data')
const logger = require('./logger')
const authorize = require('./authorize')

// app.use([authorize , logger]) //authorize + gets the method/url/year
app.use(morgan('tiny'))

// req => middleware => res
//Home Page
app.get('/', (req, res) => {
    res.send('<h1> Home Page </h1><a href="/api/products">Products</a>\n<a href="/api/movies">Movies</a>')
    // res.send('Home')
})

//About Page
app.get('/about', (req, res) => {
    res.send('About')
})

//Products Page
app.get('/api/products', (req, res) => {
    res.send('Products')
})


// http://localhost:5000/api/items?user=john
// app.get('/api/items', [authorize , logger], (req, res) => {
app.get('/api/items', (req, res) => {

    res.send('Items')
})

//Movies Page
app.get('/api/movies', (req, res) => {
    res.send(movies)
})

// http://localhost:5000/api/products?user=john
app.get('/api/products', (req,res) => {
    const newProducts = products.map((product) => {
        const {id,name,image,price,desc} = product;
        return {id,name,image,price,desc}
    })
    res.json(newProducts)
})

// http://localhost:5000/api/products/1?user=john
app.get('/api/products/:productID', (req,res) => {
    // console.log(req)
    // console.log(req.params) //gives the parameter of the productIs entered
    const {productID} = req.params;

    const singleProduct = products.find(
        (product) => product.id === Number(productID)
    )
    if(!singleProduct){
        return res.status(404).send('Product does not exist')
    }
    return res.json(singleProduct)
    })

app.get('/api/products/:productID/reviews/:reviewsID', (req,res) => {
    console.log(req.params)
    res.send('hello world')
})

//  http://localhost:5000/api/v1/query?search=a?user=john
// http://localhost:5000/api/v1/query?limit=2?user=john
app.get('/api/v1/query', (req,res) => {
    const {search, limit} = req.query
    let sortedProducts = [...products]


    //Filters the search URL of the user
    if(search){
        sortedProducts = sortedProducts.filter((product)=>{
            return product.name.startsWith(search)
        })
    }

    //Limits the number of id's shown on the screen 
    if(limit){
        sortedProducts = sortedProducts.slice(0,Number(limit))
    }
    if(sortedProducts.length < 1) {
        return res.status(200).json({ success: true, data: []})
    }
    return res.status(200).json(sortedProducts)
})

app.listen(5000, () => {
    console.log('Server is listening to port 5000...')
})
