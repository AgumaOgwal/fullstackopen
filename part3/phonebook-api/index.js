const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.json())

morgan.token('reqbody', (req, res) =>  JSON.stringify(req.body) )


app.use(morgan(':method :url :status :response-time :reqbody'))


let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    const res = `<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date().toString()}</p>`

    response.send(res)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {

    const id = request.params.id

    const person = persons.find(x => x.id === id)

    if (person) {
        response.json(person)
    } 
    else {
        response.status(404).end()
    } 
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(x => x.id === id)
    console.log('delete id', id)

    if (person) {
        persons = persons.filter(x => x.id !== id)
        response.status(204).end()
    } else {
        response.status(404).end()
    }
    
})

app.post('/api/persons/', (request, response) => {
    console.log('req body content', request.body)
    const name = request.body.name
    const number = request.body.number
    if (!name || !number) {
        response.status(400).json({error: "name or number missing"})
        return
    }
    
    const nameExists = persons.find(x => x.name === name)
    
    if (nameExists) {
        response.json({ error: "name already exists"})
        return
    }

    const newId = Math.floor(Math.random() * 100000).toString()
    const newEntry = {
        name: request.body.name,
        number: request.body.number,
        id: newId
    }       
    console.log('our id is ', newId)
    console.log('newEntry is ', newEntry)
    persons = persons.concat(...persons, newEntry)
    response.json(newEntry)
})


const PORT = 3001

app.listen(PORT)

console.log(`Server listening on port ${PORT}`)