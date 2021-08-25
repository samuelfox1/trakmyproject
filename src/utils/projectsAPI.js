import axios from 'axios'

const API_PREFIX = `${process.env.REACT_APP_API_PREFIX}/api/project`

export const addProjectToUser = (project) => {
    return (
        axios.post(API_PREFIX, project)
            .then(({ data }) => data)
            .catch(error => error)
    )
}