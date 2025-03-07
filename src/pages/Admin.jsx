import React, { useEffect, useState } from 'react'
import { Select, Space, Input, Button } from 'antd';
import { useFileContext } from '../context/FIlesTypeContext';
import axios from 'axios';
import { toast } from 'react-toastify';



const Admin = () => {
  // FILES TYPES LIST
  const [options, setOptions] = useState([])

  const [files, setFiles] = useFileContext()
  const [newFileExtension, setnewFileExnsion] = useState('')



  const getAllOptions = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/get-all-file-types')
      setOptions(data)
    } catch (error) {
      toast.error("Error fetching all options")
    }
  }

  const handleInputChange = (e) => {
    setnewFileExnsion(e.target.value)
  }

  const submitNewExtension = async () => {
    try {
      const { data } = await axios.post('http://localhost:3000/add-new-file-types', { newFileExtension })
      if (data?.message) {
        return toast?.error("Extension already in list")
      }
      setOptions(data)
      setnewFileExnsion('')
      toast?.success('Extension added successfully')
    } catch (error) {
      toast?.error("Error in Updating List")
    }
  }

  const handleAcceptedFileTypes = async (value) => {
    try {
      const { data } = await axios.post('http://localhost:3000/update-file-types', { value })
      setFiles(data)
    } catch (error) {
      toast?.error("Error in Updating List")
    }

  };

  useEffect(() => {
    getAllOptions()
  }, [])



  return (
    <div className='bg-gradient-to-r from-[#A1C4FD] to-[#E2F3FF]'>
      <div className='flex flex-col items-center justify-center h-[100vh] gap-6 w-full max-w-[400px] mx-auto'>
        <div className='w-full '>
          <h3 className='mb-2'>File Types</h3>
          <div className='shrink-0'>
            <Space
              style={{
                width: '100%',
              }}
              direction="vertical"
            >
              <Select
                mode="multiple"
                allowClear
                style={{
                  width: '100%',
                }}
                placeholder="Please select"
                defaultValue={files}
                onChange={handleAcceptedFileTypes}
                options={options}
                value={files}
              />
            </Space>
          </div>
        </div>
        <div className='w-[100%] border border-black p-4 rounded-lg'>
          <h3 className='mb-2'>New Type</h3>
          <Input value={newFileExtension} onChange={handleInputChange} placeholder="Basic usage" className='mb-2 rounded-md bg-[#F3F9FF] border border-[#D1E4F8]' />
          <Button type="primary" onClick={submitNewExtension} disabled={!newFileExtension}>Submit</Button>
        </div>
      </div>
    </div>

  )
}

export default Admin