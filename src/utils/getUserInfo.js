const getUserInfo = () => {
  const login = localStorage.getItem('login')
  const id = localStorage.getItem('id')
  const firstName = localStorage.getItem('firstName')
  const lastName = localStorage.getItem('lastName')

  return {
    login, id, firstName, lastName
  }
}

export default getUserInfo