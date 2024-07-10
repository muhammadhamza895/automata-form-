import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useFileContext } from '../context/FIlesTypeContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const UploadFile = () => {
    const navigate = useNavigate()

    const [selectedFile, setSelectedFile] = useState(null);

    const [allowedExtensionsTest, setAllowedExtensionTest] = useState([]);
    const [regex, setRegex] = useState()


    // FETCH ACCEPABLE FILE LIST
    const getAcceptedFileTypes = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/get-init-file-types')
            setAllowedExtensionTest(data)
        } catch (error) {
            toast.error("Ann error Occures")
        }
    }

    useEffect(() => {
        getAcceptedFileTypes()
    }, [])


    // CREATING REGEX
    useEffect(() => {
        if (allowedExtensionsTest) {
            const extensionsRegexPattern = `\\.(${allowedExtensionsTest.join('|')})$`;
            const testRegex = new RegExp(extensionsRegexPattern, 'i');
            setRegex(testRegex)
        }
    }, [allowedExtensionsTest])


    // FILE DROP
    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];

        if (!file) {
            setSelectedFile(null);
            return;
        }

        const fileName = file.name.toLowerCase();
        if (!regex.test(fileName)) {
            setSelectedFile(null);
            toast.error("Please upload correct file type")
        } else {
            setSelectedFile(file);
        }
    }, [regex])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })


    const sumbutFileUpload = ()=>{
        setSelectedFile(null)
        toast.success('file submitted Successfully')
        navigate('/')
    }

    return (
        <div className='h-[100vh] flex flex-col items-center justify-center'>
            <h1 className='mb-6'><span className='text-blue-300'>Acceptable types :</span> {' '}{JSON.stringify(allowedExtensionsTest)}</h1>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    !selectedFile ?
                        <div className='border border-black p-6 w-[500px] flex items-center justify-center rounded-md cursor-pointer
                        '>
                            <p>Drop the files here ...</p>
                        </div> :
                        <div className='border border-black p-6 w-[500px] flex items-center justify-center rounded-md'>
                            <p>{selectedFile?.name}</p>
                        </div>
                }
            </div>
            <Button type="primary" danger className='mt-6' disabled={!selectedFile} onClick={()=>setSelectedFile(null)}>
                Remove File
            </Button>
            <Button  type="primary" className='mt-6' disabled={!selectedFile} onClick={sumbutFileUpload}>Submit</Button>
        </div>
    )
}

export default UploadFile