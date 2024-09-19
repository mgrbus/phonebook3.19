import axios from 'axios'
const baseUrl = '/api/persons'
const { setMessage } = '../App.jsx'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
    .catch(error=>{setMessage(error.response.data.error)
    })
}

const update = (id,newObject) => {
    const request= axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const removeP = id => {
    const request= axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}


export {getAll,create,update,removeP}