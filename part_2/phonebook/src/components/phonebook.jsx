export  const handleNameChange = (event, setNewName) => {
    setNewName(event.target.value)
  }

export  const handlePhoneChange = (event, setNewPhoneNumber) => {
    setNewPhoneNumber(event.target.value)
  }

export  const searchPerson = (event, setSearchTerm) => {
    setSearchTerm(event.target.value)
  }