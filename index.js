const express = require("express")
const cors = require("cors")
const app = express()

const PORT = 8080
app.listen(8080)

app.use(cors())
app.use(express.json())
app.use(express.static('build'))


const persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
        "id": 4,
        "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/persons", (req, res) => {
    res.json(persons)
})

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if(person){
        res.json(person)
    }else{
        return res.status(404).json({
            error: "User not found"
        })
    }
})

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    const updatedList = persons.filter(person => person.id !== id)
    res.json(updatedList)
})

app.post("/api/persons", (req, res) => {
    const content = req.body
    const personId = persons.length


    if(!content.name){
        res.status(404).json({
            error: "Name is missing"
        })
    } else if (!content.number){
        res.status(404).json({
            error: "Phone number is missing"
        })
    } else if (persons.find(person => person.name === content.name)){
        res.status(404).json({
            error: `${content.name} already exists`
        })
    }

    person = {
        id: personId,
        name: content.name,
        number: content.number
    }

    persons.concat(person)
    res.json(person)
})

app.get("/info", (req, res) => {
    const timeStamp = new Date()
    const infoDetails = `<h2>Phonebook has info for ${persons.length} people <br> ${timeStamp}</h2>`
    res.send(infoDetails)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)