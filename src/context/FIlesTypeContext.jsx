import React, { useState,createContext, useContext, useEffect } from 'react'
import axios from 'axios'

const FilesContext = createContext()

const FIlesTypeContext = ({children}) => {
    const [fileType, setFileType] = useState([])

    const getInitFileTypes = async()=>{
        const {data} = await axios.get('http://localhost:3000/get-init-file-types')
        setFileType(data)
    }

    useEffect(()=>{
        getInitFileTypes()
    },[])

    return (
        <FilesContext.Provider value={[fileType,setFileType ]}>
            {children}
        </FilesContext.Provider>
    )
}

const useFileContext = ()=>useContext(FilesContext)

export default FIlesTypeContext
export {useFileContext}
