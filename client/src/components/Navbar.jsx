import { useContext } from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { setShowRecruiterLogin, userToken, setUserToken } = useContext(AppContext);

    // Simulated user object (replace with real authentication logic if needed)
    const user = userToken ? { firstName: "John", lastName: "Doe" } : null;

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        setUserToken(null);
        navigate('/');
    };

    return (
        <div className='shadow py-4'>
            <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
                <img onClick={() => navigate('/')} className='cursor-pointer' src={assets.logo} alt="" />
                {
                    user
                        ? <div className='flex items-center gap-3'>
                            <Link to={'/applications'}>Applied Jobs</Link>
                            <p>|</p>
                            <p className='max-sm:hidden'>Hi, {user.firstName + " " + user.lastName}</p>
                            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-1 rounded-full">Logout</button>
                        </div>
                        : <div className='flex gap-4 max-sm:text-xs'>
                            <button onClick={() => setShowRecruiterLogin(true)} className='text-gray-600'>Recruiter Login</button>
                            <button onClick={() => navigate('/login')} className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full'>Login</button>
                        </div>
                }
            </div>
        </div>
    );
};

export default Navbar;
