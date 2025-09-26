require('dotenv').config();

const mongoose = require('mongoose')

const user = encodeURIComponent(process.env.MONGO_USER);
const password = encodeURIComponent(process.env.MONGO_PASSWORD);
// const url = process.env.MONGO_URL
const url = process.env.TEST_MONGO_URI


mongoose.set('strictQuery', false)

mongoose.connect(url)
    .then(() =>{
        console.log("Connectiong to the db...")
    })
    .catch((error) => {
        console.log("Error connecting to the db: ", error.message)
    })



const phoneSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Phone = mongoose.model('Phone', phoneSchema)




const main = async () => {
    await mongoose.connect(url)

    const nameToDelete  = process.argv[3]

    if(process.argv.length === 2) {
        const allPhones = await Phone.find({})
        console.log("Phones:")
        allPhones.forEach(p =>{
            console.log("")
            console.log(`${p.name} ${p.number}`)
        })
    } else if(nameToDelete .toLocaleLowerCase() === `delete`){
        const result = await Phone.deleteOne({ name: nameToDelete })
        if(result.deletedCount === 1){
            console.log(`Deleted phone with number ${nameToDelete }`)
        } else {
            console.log(`No user found with the name ${nameToDelete }`);
        }
    } else if(process.argv.length === 4) {
        const phone = new Phone({
            name: process.argv[2],
            number: process.argv[3]
        })
        await phone.save()
        console.log(`added ${phone.name} number ${phone.number} to phonebook`)
    }

    mongoose.connection.close()
}

main()


