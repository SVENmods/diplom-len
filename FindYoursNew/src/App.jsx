import { useState } from 'react'
import './assets/css/App.scss'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from 'react';
import axios from 'axios';
import Header from './UI/Header';
import Dashboard from './Pages/Dashboard';
import ProfilePage from './Pages/ProfilePage';
import ProfileEditPage from './Pages/ProfileEditPage';

function App() {
  
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [formData, setFormData] = useState({
    name:'',
    family_name:'',
    email:'',
    userId:'',
    status:'',
    role:'',
    birthday: '',
    location: '', 
    contacts: {},
    links: {},
    service: {},
    allRate: {},
    rateSum: '',
    tel: '',
  })
  const [userKey, setUserKey] = useState()

  const [allData, setAllData] = useState()


  useEffect(() => {
    const fetchData = async (userId) => {
      try {
        const response = await axios.get(`http://localhost:8000/profiles`)
        const data = response.data.data
        // setAllData(response.data.data)
        console.log(data)
        const foundKey = Object.keys(data).find(key => data[key].userId === userId)
        if (foundKey) {
          setFormData(data[foundKey])
          setUserKey(foundKey)
        }
        return foundKey || null;
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    };
  
    if (isAuthenticated && user) {
      const userSub = user.sub;
      const userId = userSub.substring(userSub.indexOf("|") + 1);
      setFormData(prevState => ({ ...prevState, email: user.email }));
      fetchData(userId).then(async (foundKey) => {
        if (foundKey) {
          console.log("Found key:", foundKey);
        } else {
          try {
            const response = await axios.post('http://localhost:8000/profiles', {
              formData: {
                email: user.email,
                name: user.given_name,
                family_name: user.family_name,
                userId: userId,
                status: "Не сформирован",
                role: 'user',
                birthday: '',
                location: '',
                contacts: {},
                links: {},
                service: {},
                allRate: {},
                rateSum: '',
                tel: '',
              }
            });
            const success = response.status === 200;
            if (success) {
              console.log("User created")
            }
          } catch (error) {
            console.error("Error posting data:", error);
          }
        }
      })
    };
    console.log("User data", formData)

  }, [isAuthenticated, user]);
  

  const handleDeleteAllProfiles = async () => {
    try {
      const response = await axios.delete('http://localhost:8000/profiles');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleUserDataChange  = (newUserData) => {
    setFormData((prevState) => ({
      ...prevState,
      ...newUserData,
    }))
  }

  return (
    
      <div className="App">
        <BrowserRouter>
          {/* {
            isLoading && (
              <div className="loader-wrapper">
                <div className='d-flex flex-column align-items-center'>
                  <div className="loader"></div>
                  <p className='mt-5'>
                    Минуточку, контент загружается :)
                  </p>
                </div>
              </div>
            )
          } */}
          <Header userData={formData}/>
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/profile" element={<ProfilePage/>} />
            <Route path="/profile/edit" element={<ProfileEditPage formData={formData} onUserDataChange={handleUserDataChange } userKey={userKey}/>} />
          </Routes>
          <button onClick={handleDeleteAllProfiles}>Delete all</button><br />
        </BrowserRouter>
      </div>
      
    )

}

export default App
