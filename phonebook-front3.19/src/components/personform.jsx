import { create, update } from '../services/persons'

const PersonForm = ({ setMessage, persons, newName, newNumber, setNewName, setNewNumber, setPersons, handleNameAdd, handleNumberAdd }) => {
    const addName = (e) => {
        e.preventDefault()
        const name = {
            name: newName, number: newNumber
        }
        let confirmation = true
        for (let person in persons) {
            const p = persons[person]
            if (p.name === newName) {
                confirmation = false
                if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                    const changedPerson = { ...p, number: newNumber }
                    update(p.id, changedPerson)
                        .then(returnedPerson => {
                            setPersons(persons.map(person => person.id !== p.id ? person : returnedPerson))
                            setMessage(`${newName} has been successfully changed`)
                            setTimeout(() => {
                                setMessage('')
                            }, 3000)

                        })
                        .catch(error => {
                            setMessage(`${newName} is too short, not a string or number is in wrong format. Please write 
                                more than three letters in name and number format xx-xxxxxxx`)
                            setTimeout(() => {
                                setMessage('')
                            }, 6000)
                        })
                    setNewName('')
                    setNewNumber('')
                }
            }
            setNewName('')
            setNewNumber('')
        }

        if (confirmation) {
            create(name)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setMessage(`Added ${newName}`)
                    setTimeout(() => {
                        setMessage('')
                    }, 3000)
                    setNewName('')
                    setNewNumber('')
                })
                .catch(error => {
                    setMessage(`Person validation failed: name ${newName} is shorter than minumum allowed length
                        , not a string, or number is in wrong format`)
                    setTimeout(() => {
                        setMessage('')
                    }, 5000)
                })
            setNewName('')
            setNewNumber('')

        }
    }

    return (
        <form onSubmit={addName}>
            <div>
                name: <input
                    value={newName}
                    onChange={handleNameAdd}
                />
            </div>
            <div>number: <input
                value={newNumber}
                onChange={handleNumberAdd}
            /></div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm