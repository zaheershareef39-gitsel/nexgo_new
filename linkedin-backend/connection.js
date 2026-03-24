const mongoose = require('mongoose');




mongoose.connect('mongodb://localhost:27017/linkedinClone').then(res => {
    console.log("Database successfully Connected")
}).catch(err => {
    console.log(err)
})