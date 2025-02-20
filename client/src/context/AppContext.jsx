import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const backendUrl = "http://localhost:5000";

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

    // Fetch Jobs
    const fetchJobs = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/jobs`);
            if (data.success) {
                setJobs(data.jobs);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Fetch Company Data
    const fetchCompanyData = async () => {
        if (!companyToken) return;
        try {
            const { data } = await axios.get(`${backendUrl}/api/company/company`, { 
                headers: { token: companyToken }
            });
            if (data.success) {
                setCompanyData(data.company);
            } else {
                setCompanyToken(null);
                localStorage.removeItem('companyToken');
                toast.error(data.message);
            }
        } catch (error) {
            setCompanyToken(null);
            localStorage.removeItem('companyToken');
            toast.error(error.message);
        }
    };

    // Fetch User Data
    const fetchUserData = async () => {
        if (!userToken) return;
        try {
            const { data } = await axios.get(`${backendUrl}/api/users/user`, {
                headers: { Authorization: `Bearer ${userToken}` }
            });
            if (data.success) {
                setUserData(data.user);
            } else {
                setUserToken(null);
                localStorage.removeItem('userToken');
                toast.error(data.message);
            }
        } catch (error) {
            setUserToken(null);
            localStorage.removeItem('userToken');
            toast.error(error.message);
        }
    };

    // Fetch User's Applications
    const fetchUserApplications = async () => {
        if (!userToken) return;
        try {
            const { data } = await axios.get(`${backendUrl}/api/users/applications`, {
                headers: { Authorization: `Bearer ${userToken}` }
            });
            if (data.success) {
                setUserApplications(data.applications);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    useEffect(() => {
        if (companyToken) {
            fetchCompanyData();
        }
    }, [companyToken]);

    useEffect(() => {
        if (userToken) {
            fetchUserData();
            fetchUserApplications();
        }
    }, [userToken]);

    const value = {
        setSearchFilter, searchFilter,
        isSearched, setIsSearched,
        jobs, setJobs,
        showRecruiterLogin, setShowRecruiterLogin,
        companyToken, setCompanyToken,
        companyData, setCompanyData,
        backendUrl,
        userData, setUserData,
        userApplications, setUserApplications,
        fetchUserData, fetchUserApplications,
        userToken, setUserToken
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};