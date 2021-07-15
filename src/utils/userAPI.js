import axios from 'axios'

const API_PREFIX = `${process.env.REACT_APP_API_PREFIX}/api/user`

// check if a username is available when signing up or changing
export const checkAvailableEmail = (email) => {
    const URL = `${API_PREFIX}/email`
    const payload = { email: email }

    return (
        axios.post(URL, payload)
            .then(data => data.data)
            .catch(err => err)
    )
}

// check if a username is available when signing up or changing
export const checkAvailableUsername = (username) => {
    const URL = `${API_PREFIX}/username`
    const payload = { username: username }

    return (
        axios.post(URL, payload)
            .then(({ data }) => data)
            .catch(err => err)
    )
}

// creates a new user from the signUpForm data
export const createUser = (user) => {
    const URL = `${API_PREFIX}`
    const payload = {
        username: user.username,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    }

    return (
        axios.post(URL, payload)
            .then(data => data)
            .catch(err => err)
    )
}

export const loginUser = ({ username, password }) => {
    const URL = `${API_PREFIX}/login`
    const payload = { username: username, password: password }

    return (
        axios.post(URL, payload)
            .then(data => data)
            .catch(err => err)
    )
}

export const checkToken = token => {
    const URL = `${API_PREFIX}`
    const authorization = { authorization: `Bearer: ${token}` }

    return (
        axios.get(URL, { headers: authorization })
            .then(data => data)
            .catch(err => err)
    )
}

export const logoutUser = () => {

}