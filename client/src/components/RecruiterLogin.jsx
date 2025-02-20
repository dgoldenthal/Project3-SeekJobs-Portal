import { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const RecruiterLogin = () => {
    const navigate = useNavigate()
    const [state, setState] = useState('Login')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState(null)

    const { setShowRecruiterLogin, backendUrl, setCompanyToken, setCompanyData } = useContext(AppContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {
            if (state === "Login") {
                if (!email || !password) {
                    return toast.error('Please provide email and password')
                }

                const { data } = await axios.post(backendUrl + '/api/company/login', { email, password })

                if (data.success) {
                    setCompanyData(data.company)
                    setCompanyToken(data.token)
                    localStorage.setItem('companyToken', data.token)
                    setShowRecruiterLogin(false)
                    navigate('/dashboard')
                } else {
                    toast.error(data.message)
                }
            } else {
                // Registration
                if (!name || !email || !password) {
                    return toast.error('Please provide name, email and password')
                }

                const formData = new FormData()
                formData.append('name', name)
                formData.append('password', password)
                formData.append('email', email)
                if (image) {
                    formData.append('image', image)
                }

                const { data } = await axios.post(backendUrl + '/api/company/register', formData)

                if (data.success) {
                    setCompanyData(data.company)
                    setCompanyToken(data.token)
                    localStorage.setItem('companyToken', data.token)
                    setShowRecruiterLogin(false)
                    navigate('/dashboard')
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm'>
            <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative'>
                {/* Close button */}
                <button 
                    onClick={() => setShowRecruiterLogin(false)}
                    className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
                >
                    <img src={assets.cross_icon} alt="close" className='w-4 h-4' />
                </button>

                {/* Logo */}
                <div className='flex justify-center mb-6'>
                    <img className='h-8' src={assets.logo} alt="SeekJobs" />
                </div>

                <h1 className='text-2xl font-bold text-center mb-2'>
                    {state === 'Login' ? 'Sign in to your account' : 'Create recruiter account'}
                </h1>
                <p className='text-sm text-center text-gray-600 mb-6'>
                    {state === 'Login' ? 'Welcome back! Please sign in to continue' : 'Join us to start hiring talent'}
                </p>

                <form onSubmit={onSubmitHandler}>
                    {state === "Sign Up" && (
                        <>
                            <div className='mb-4'>
                                <label className='block text-sm font-medium text-gray-700'>Company Name</label>
                                <input 
                                    className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className='mb-4'>
                                <label className='block text-sm font-medium text-gray-700'>Company Logo (Optional)</label>
                                <div className='mt-1 flex items-center justify-center'>
                                    <label htmlFor="image" className='cursor-pointer'>
                                        <div className='w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors'>
                                            {image ? (
                                                <img 
                                                    src={URL.createObjectURL(image)} 
                                                    alt="Preview" 
                                                    className='w-full h-full rounded-full object-cover'
                                                />
                                            ) : (
                                                <span className='text-gray-500'>Upload Logo</span>
                                            )}
                                        </div>
                                        <input 
                                            type="file"
                                            id="image"
                                            className='hidden'
                                            onChange={e => setImage(e.target.files[0])}
                                            accept="image/*"
                                        />
                                    </label>
                                </div>
                            </div>
                        </>
                    )}

                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>Email Address</label>
                        <input 
                            className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className='mb-6'>
                        <label className='block text-sm font-medium text-gray-700'>Password</label>
                        <input 
                            className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button 
                        type='submit'
                        className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors'
                    >
                        {state === 'Login' ? 'Sign in' : 'Create account'}
                    </button>

                    <div className='mt-4 text-center'>
                        {state === 'Login' ? (
                            <p className='text-sm text-gray-600'>
                                Don't have an account? 
                                <button 
                                    type="button"
                                    onClick={() => setState("Sign Up")}
                                    className='ml-1 text-blue-600 hover:text-blue-800'
                                >
                                    Sign Up
                                </button>
                            </p>
                        ) : (
                            <p className='text-sm text-gray-600'>
                                Already have an account? 
                                <button 
                                    type="button"
                                    onClick={() => setState("Login")}
                                    className='ml-1 text-blue-600 hover:text-blue-800'
                                >
                                    Sign in
                                </button>
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RecruiterLogin