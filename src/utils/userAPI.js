import axios from 'axios'


const API_PREFIX = process.env.REACT_APP_API_PREFIX

export const checkAvailableUsername = (username) => {
    const URL = `${API_PREFIX}/api/username`
    const data = { username: username }

    return (
        axios.post(URL, data)
            .then(data => data.data)
            .catch(err => err)
    )
}