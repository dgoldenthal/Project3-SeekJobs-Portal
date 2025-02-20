import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    // Use environment variable or fallback to localhost for development
    const backendUrl = import.meta.env.PROD 
        ? "https://project3-seekjobs-portal.onrender.com"  
        : "http://localhost:5000";

    const [searchFilter, setSearchFilter] = useState({
        title: '',
        location: ''
    });

    const [isSearched, setIsSearched] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
    const [companyToken, setCompanyToken] = useState(localStorage.getItem('companyToken'));
    const [companyData, setCompanyData] = useState(null);
    const [userData, setUserData] = useState(null);
    const [userApplications, setUserApplications] = useState([]);
    const [userToken, setUserToken] = useState(localStorage.getItem('userToken'));
    const [loading, setLoading] = useState(true); // Add loading state

    // Fetch Jobs with error handling and loading state
    const fetchJobs = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${backendUrl}/api/jobs`);
            if (data.success) {
                setJobs(data.jobs);
            } else {
                toast.error(data.message || 'Failed to fetch jobs');
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
            toast.error(error.response?.data?.message || 'Failed to connect to server');
        } finally {
            setLoading(false);
        }
    };

    // Fetch Company Data with better error handling
    const fetchCompanyData = async () => {
        if (!companyToken) return;
        try {
            const { data } = await axios.get(`${backendUrl}/api/company/company`, { 
                headers: { token: companyToken }
            });
            if (data.success) {
                setCompanyData(data.company);
            } else {
                handleLogout('company');
                toast.error(data.message || 'Company authentication failed');
            }
        } catch (error) {
            console.error('Error fetching company data:', error);
            handleLogout('company');
            toast.error(error.response?.data?.message || 'Failed to fetch company data');
        }
    };

    // Fetch User Data with better error handling
    const fetchUserData = async () => {
        if (!userToken) return;
        try {
            const { data } = await axios.get(`${backendUrl}/api/users/user`, {
                headers: { Authorization: `Bearer ${userToken}` }
            });
            if (data.success) {
                setUserData(data.user);
            } else {
                handleLogout('user');
                toast.error(data.message || 'User authentication failed');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            handleLogout('user');
            toast.error(error.response?.data?.message || 'Failed to fetch user data');
        }
    };

    // Fetch User's Applications with better error handling
    const fetchUserApplications = async () => {
        if (!userToken) return;
        try {
            const { data } = await axios.get(`${backendUrl}/api/users/applications`, {
                headers: { Authorization: `Bearer ${userToken}` }
            });
            if (data.success) {
                setUserApplications(data.applications);
            } else {
                toast.error(data.message || 'Failed to fetch applications');
            }
        } catch (error) {
            console.error('Error fetching applications:', error);
            toast.error(error.response?.data?.message || 'Failed to fetch applications');
        }
    };

    // Centralized logout handler
    const handleLogout = (type) => {
        if (type === 'user') {
            setUserToken(null);
            setUserData(null);
            setUserApplications([]);
            localStorage.removeItem('userToken');
        } else if (type === 'company') {
            setCompanyToken(null);
            setCompanyData(null);
            localStorage.removeItem('companyToken');
        }
    };

    // Initial data fetch
    useEffect(() => {
        fetchJobs();
    }, []);

    // Company data fetch
    useEffect(() => {
        if (companyToken) {
            fetchCompanyData();
        }
    }, [companyToken]);

    // User data fetch
    useEffect(() => {
        if (userToken) {
            fetchUserData();
            fetchUserApplications();
        }
    }, [userToken]);

    const value = {
        setSearchFilter,
        searchFilter,
        isSearched,
        setIsSearched,
        jobs,
        setJobs,
        showRecruiterLogin,
        setShowRecruiterLogin,
        companyToken,
        setCompanyToken,
        companyData,
        setCompanyData,
        backendUrl,
        userData,
        setUserData,
        userApplications,
        setUserApplications,
        fetchUserData,
        fetchUserApplications,
        userToken,
        setUserToken,
        loading,
        handleLogout  // Expose logout handler
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};