require('dotenv').config()
const express = require('express')
const morgan = require('morgan')

const Person = require('./models/person')


const app = express()

app.use(express.static('dist'))

app.use(express.json())

morgan.token('reqbody', (req, res) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :response-time :reqbody'))


app.get('/info', (request, response, next) => {
    Person.find({}).then(persons => {
        const res = `<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date().toString()}</p>`

    response.send(res)

    })
    
})

app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {

    const id = request.params.id
    Person.findById(id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))

})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id

    Person.findByIdAndDelete(id)
        .then(person => {
            response.status(204).end()
        })
        .catch(error => next(error))

})

app.post('/api/persons/', (request, response, next) => {
    console.log('req body content', request.body)
    const name = request.body.name
    const number = request.body.number
    if (!name || !number) {
        response.status(400).json({ error: "name or number missing" })
        return
    }


    const person = new Person({
        name: name,
        number: number
    })

    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        response.json('success')
    })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {

    const id = request.params.id

    const { name, number } = request.body

    Person.findById(id)
        .then(person => {
            if (!person) {
                return response.status(404).send()
            }

            person.name = name
            person.number = number

            person.save().then(result => {
                response.json(result)
            })
                .catch(error => next(error))
        })

})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformed id' })
    }

    next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

