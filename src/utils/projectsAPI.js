import axios from 'axios'
import { ApiURL } from './getApiUrl'

// const API_PREFIX = `${process.env.REACT_APP_API_PREFIX}/api/project`
const API_PREFIX = `${ApiURL}/api/project`

export const addProjectToUser = (project) => {
    return (
        axios.post(API_PREFIX, project)
            .then(({ data }) => data)
            .catch(error => error)
    )
}