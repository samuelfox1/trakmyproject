import { createContext } from 'react'

export const UserContext = createContext({ loggedInUser: { loggedIn: false } })
UserContext.displayName = 'UserData'