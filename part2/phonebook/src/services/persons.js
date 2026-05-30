import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAllPersons = () => {
    return axios.get(baseUrl)
}

const createPerson = person => {
    return axios.post(baseUrl, person)

}

const deletePerson = person => {
    return axios.delete(`${baseUrl}/${person.id}` )
}

const updatePerson = person => {
    //console.log('Update Person ..', person)
    return axios.put(`${baseUrl}/${person.id}`, person)
}

export default { getAllPersons, createPerson, deletePerson, updatePerson }