import axios from 'axios'

const API_PREFIX = process.env.REACT_APP_API_PREFIX

// check if a username is available when signing up or changing
export const checkAvailableEmail = (email) => {
    const URL = `${API_PREFIX}/api/email`
    const data = { email: email }

    return (
        axios.post(URL, data)
            .then(data => data.data)
            .catch(err => err)
    )
}

// check if a username is available when signing up or changing
export const checkAvailableUsername = (username) => {
    const URL = `${API_PREFIX}/api/username`
    const data = { username: username }

    return (
        axios.post(URL, data)
            .then(({ data }) => data)
            .catch(err => err)
    )
}

// creates a new user from the signUpForm data
export const createUser = (user) => {
    const URL = `${API_PREFIX}/api/user`
    const formatted = {
        username: user.username,
        password: user.password,
        data: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }
    }

    return (
        axios.post(URL, formatted)
            .then(({ data }) => data)
            .catch(err => err)
    )
}

export const loginUser = ({ username, password }) => {
    const URL = `${API_PREFIX}/api/login`
    const data = { username: username, password: password }

    return (
        axios.post(URL, data)
            .then(data => data)
            .catch(err => err)
    )
}

export const logoutUser = () => {

}