const mongoose = require ('mongoose')
// const User = require('./models/User')
const Product = require('./models/product')


mongoose.connect('mongodb://localhost:27017/User', {useNewUrlParser : true, useUnifiedTopology: true})
.then(()=>{
    console.log("CONNECTION OPEN :)");
})
.catch((err)=>{
    console.log("OH NO error");
})


const p = new Product({
    name: 'Tshirt',
    brandname: 'Roadster',
    gender: 'Men',
    stock: 3,
    price: 350,
    imageurl: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80'
})

p.save().then((p)=>{
    console.log(p);
});

const n = new Product({
    name: 'Jeans',
    brandname: 'Roadster',
    gender: 'Men',
    stock: 3,
    price: 350,
    imageurl: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80'
})

n.save().then((n)=>{
    console.log(n);
});
