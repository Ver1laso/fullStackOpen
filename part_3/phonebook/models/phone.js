require('dotenv').config();
const mongoose = require(`mongoose`)

mongoose.set(`strictQuery`, false)


const phoneSchema = new mongoose.Schema({
    name: String,
    number: String,
})


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

module.exports = mongoose.model("Phone", phoneSchema, "testPhone")