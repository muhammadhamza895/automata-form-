import { input } from "@material-tailwind/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// const validateEmail = (email) => {
//     return email.match(
//         /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     );
// };

const validateEmail = (email) => {
    return email.match(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    );
};
const validateName = (userName) => {
    return userName.match(
        /^[A-Z][a-zA-Z-' ]{1,}$/
    )
}
const validatePass = (pass) => {
    return pass.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[_-])[A-Za-z\d_-]{8,}$/
    )
}
const validatePhone = (phone) => {
    return phone.match(
        /^03[0-9]{9}$/
    )
}
const validateDOB = (dob) => {
    return dob.match(
            /^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-(19|20)\d{2}$/
    )
}


const Form = () => {
    const navigate = useNavigate()
    const [inputData, setInputData] = useState({
        name: '',
        email: '',
        contact: '',
        password: '',
        dateOfBirth: '',
        ssn: ''
    })

    const handleChange = (e) => {
        setInputData(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (!validateName(inputData?.name)) {
            toast.error('Name first letter should be capital')
            return
        }
        if (!validatePhone(inputData?.contact)) {
            toast.error('Invalid Contact Format')
            return
        }
        if (!validateEmail(inputData?.email)) {
            toast.error('Invalid Email')
            return
        }
        if (!validatePass(inputData?.password)) {
            toast.error('Must contain _, -, alpha - numeric letters')
            return 
        }
        if (!validateDOB(inputData?.dateOfBirth)) {
            toast.error('Invalid DOB Format, it should be DD-MM-YYYY')
            return
        }
        toast.success('Form submitted successfully')
        navigate('/file-upload')
    }

    return (
        <div className="h-[100vh] flex items-center justify-center">
            <div className="max-w-md relative flex flex-col p-4 rounded-md text-black bg-white w-[400px]">
                <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">Welcome back to <span className="text-[#7747ff]">Portal</span></div>
                <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">Register your account</div>
                <form className="flex flex-col gap-3">
                    <div className="block relative">
                        <label htmlFor="email" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Name</label>
                        <input type="text" id="email" className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0" name='name' value={inputData?.name} onChange={handleChange} />

                    </div>
                    <div className="block relative">
                        <label htmlFor="password" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Contact</label>
                        <input placeholder="03XXXXXXXXX" type="text" id="password" className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0" name='contact' value={inputData?.contact} onChange={handleChange} />
                    </div>
                    <div className="block relative">
                        <label htmlFor="email" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Email</label>
                        <input type="text" id="email" className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0" name='email' value={inputData?.email} onChange={handleChange} />
                    </div>

                    <div className="block relative">
                        <label htmlFor="password" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Password</label>
                        <input type="password" id="password" className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                            name='password' value={inputData?.password} onChange={handleChange}
                        />
                    </div>


                    <div className="block relative">
                        <label htmlFor="password" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Date Of Birth</label>
                        <input type="text" id="password" className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                            name='dateOfBirth' value={inputData?.dateOfBirth} onChange={handleChange} placeholder="DD-MM-YYYY"
                        />
                    </div>
                    
                    <button type="submit" className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal" onClick={(e) => onSubmit(e)}>Submit</button>

                </form>
            </div>
        </div>

    );
}

export default Form