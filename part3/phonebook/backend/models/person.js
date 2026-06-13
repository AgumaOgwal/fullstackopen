const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI


mongoose.connect(url, { family : 4 } )
    .then(() => {
        console.log('connected to mongo')
    })
    .catch(error => {
        console.log('could not connect to mongo', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: (value) => {
                return /\d+-\d+/.test(value)
            },
            message: (props) => {
                return `${props.value} is not a valid phone number`
            }
        }
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
