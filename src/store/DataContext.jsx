import React, { useState } from 'react'


const DataContext = ({children}) => {

    const [loading,setLoading] = useState(true)
  return (
    <DataContext.provider value={{loading, setLoading}}>
        {children}
    </DataContext.provider>
  )
}

export default DataContext
