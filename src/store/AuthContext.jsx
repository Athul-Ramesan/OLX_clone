import React, { createContext, useState } from 'react'

export const MyAuth = createContext()

const AuthContext = ({children}) => {
    const [user,setUser] = useState('')
  return (
    <MyAuth.Provider value={{user,setUser}}>
        {children}
    </MyAuth.Provider>
  )
}

export default AuthContext
