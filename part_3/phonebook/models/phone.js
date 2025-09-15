require('dotenv').config();
const mongoose = require(`mongoose`)

mongoose.set(`strictQuery`, false)

// const user = encodeURIComponent(process.env.MONGO_USER);
// const password = encodeURIComponent(process.env.MONGO_PASSWORD);
// const url = encodeURIComponent(process.env.MONGO_URL)

// console.log("Connection to", url)

// mongoose.connect(url)
//     .then(result => {
//         console.log("connected to MongoDB")
//     })
//     .catch(error => {
//         console.log("error connecting to MongoDB", error.message)
//     })

const phoneSchema = new mongoose.Schema({
    name: String,
    number: String,
})

// const Phone = mongoose.model('Phone', phoneSchema)

phoneSchema.set('toJSON', { 
    virtuals: true,
    versionKey: false,
    transform: function (document, returnedObject){
        delete returnedObject._id
    }
});

phoneSchema.virtual('id').get(function() {
    return this._id.toHexString();
})

module.exports = mongoose.model("Phone", phoneSchema)