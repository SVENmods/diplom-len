import { useState } from 'react'
import './assets/css/App.css'
import AuthenticationButton from './UI/buttons/AuthenticationButton'
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from 'react';
import axios from 'axios';
import ProfilePic from './UI/user/ProfilePic';

function App() {
  
  const { user, isAuthenticated } = useAuth0();
  const [formData, setFormData] = useState({
    email:'',
    userId:'',
  })

  


  useEffect(() => {
    const fetchData = async (userId) => {
      try {
        const response = await axios.get(`http://localhost:8000/profiles`);
        const data = response.data.data;
        console.log(data)
        const foundKey = Object.keys(data).find(key => data[key].userId === userId);
        return foundKey || null;
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    };
  
    if (isAuthenticated && user) {
      const userSub = user.sub;
      const userId = userSub.substring(userSub.indexOf("|") + 1);
      setFormData(prevState => ({ ...prevState, email: user.email, userId: userId }));
      fetchData(userId).then(async (foundKey) => {
        if (foundKey) {
          console.log("Found key:", foundKey);
        } else {
          try {
            const response = await axios.post('http://localhost:8000/profiles', {
              formData: {
                email: user.email,
                userId: userId,
              }
            });
            const success = response.status === 200;
            if (success) {
              console.log("YES")
            }
          } catch (error) {
            console.error("Error posting data:", error);
          }
        }
      });
    }
  }, [isAuthenticated, user]);
  

  const handleLogin = async () => {
    if (isAuthenticated) {
      const response = await axios.post('http://localhost:8000/profiles', {
        formData
      })
      const success = response.status === 200
      if (success) {
        console.log("YES")
      }
      
      const foundKey = await fetchData(user.sub.substring(user.sub.indexOf("|") + 1));
      if (foundKey) {
        console.log("Found key:", foundKey);
      } else {
        console.log("Key not found.");
      }
    }
    
  }

  const handleDeleteAllProfiles = async () => {
    try {
      const response = await axios.delete('http://localhost:8000/profiles');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    
      <div className="App">
        <AuthenticationButton/>
        <button onClick={handleLogin}>Login</button><br />
        <button onClick={handleDeleteAllProfiles}>Delete all</button><br />
        <ProfilePic />
      </div>
      
    )

}

export default App
