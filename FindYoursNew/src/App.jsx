import { useState } from 'react'
import './assets/css/App.scss'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from 'react';
import axios from 'axios';
import Header from './UI/Header';
import Dashboard from './Pages/Dashboard';
import ProfilePage from './Pages/Profile/ProfilePage';
import ProfileEditPage from './Pages/Profile/ProfileEditPage';
import ProfileEditPageAbout from './Pages/Profile/ProfileEditPageAbout';
import ProfileExperiens from './Pages/Profile/ProfileExperiens';
import Modal from 'react-bootstrap/Modal';
import Selection from './Pages/Selection';
import ProfileShow from './Pages/Profile/ProfileShow';
import ComparePage from './Pages/ComparePage';
import ProfileServicePage from './Pages/Profile/ProfileServicePage';
import ProfileVacancy from './Pages/Employer/ProfileVacancy';
import AllVacancy from './Pages/Employer/AllVacancy';
import VacancyShow from './Pages/Employer/VacancyShow';
import AdminPage from './Pages/Admin/AdminPage';

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
    about:{
      text: "",
      skills: [],
      lang: "",
      sphere: "",
    },
    experiens: {
      
    },
  })
  const [userKey, setUserKey] = useState()

  const [role, setRole] = useState('')

  const [addToCheck, setAddToCheck] = useState([])


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    
    const fetchData = async (userId) => {
      try {
        const response = await axios.get(`http://localhost:8000/profiles`);
        const data = response.data.data;
        const foundKey = Object.keys(data).find(key => data[key].userId === userId);
        if (foundKey) {
          setFormData(data[foundKey]);
          setUserKey(foundKey);
          setRole(data[foundKey].role)
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
          if(userId === "103223268131768123604"){
            setRole('admin')
          }
          setShow(true);
        }
      })
    };
    // console.log("User data", formData);
  }, [isAuthenticated, user]);
  

  const handleSetRole = (role) => {
    // setFormData(prevState => ({ ...prevState, role: role }));
    const userSub = user.sub;
    const userId = userSub.substring(userSub.indexOf("|") + 1);
    // if(userId === "103223268131768123604"){
    //   createNewProfile('admin', userId);
    // }
    // else{
    // }
    createNewProfile(role, userId);

    setShow(false);
  };

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

  const createNewProfile = async (role, userId) =>{
    if (isAuthenticated && user) {
        try {
        const response = await axios.post('http://localhost:8000/profiles', {
          formData: {
            email: user.email,
            name: user.given_name ? user?.given_name : user.email.split("@")[0],
            family_name: user.family_name ? user.family_name : '',
            userId: userId,
            status: "Не сформирован",
            role: role,
            birthday: '',
            location: '',
            contacts: {},
            links: {},
            service: {},
            allRate: {},
            rateSum: '',
            tel: '',
            about:{
              text: "",
              skills: [],
              lang: "",
            },
            experiens: {},
          }
        });
        const success = response.status === 200;
        if (success) {
          console.log("User created");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error posting data:", error);
      }
    }
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
          <Header userData={formData} role={role}/>

          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
            >
            <Modal.Header>
            {/* closeButton */}
              <Modal.Title className='w-100 d-flex align-items-center text-center'>
                Приветствуем Вас в сервисе FindYours!
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="w-100 text-center">
                Определите свою роль(ее можно будет сменить в профиле, если вдруг передумаете)
              </div>
              {
                role === 'admin' ? (
                  <div className="d-flex flex-row w-100 justify-content-center mt-4">
                    <a 
                      onClick={() => handleSetRole('admin')}
                      className="mt-3 rounded py-3 px-4 mx-2 bg-light-subtle border"
                      role="button">
                        Администратор
                    </a>
                  </div>
                  
                )
                :
                  (
                    <div className="d-flex flex-row w-100 justify-content-between mt-4">
                    <a 
                      onClick={() => handleSetRole('spec')}
                      className="mt-3 rounded py-3 px-4 mx-2 bg-light-subtle border"
                      role="button">
                        Специалист
                    </a>
                    <a 
                      onClick={() => handleSetRole('employer')}
                      className="mt-3 rounded py-3 px-4 mx-2 bg-light-subtle border"
                      role="button">
                        Работодатель
                    </a>
                    {/* <button>Пользователь</button> */}
                  </div>
                  )
              }
            </Modal.Body>
          </Modal>

          <Routes>
            <Route 
              path="/" 
              element={
              <Dashboard/>} />
            <Route 
              path="/profile" 
              element={
              <ProfilePage 
              formData={formData}
              role={role}/>} />
            <Route 
              path="/profile/edit/personal" 
              element={
              <ProfileEditPage 
              formData={formData} 
              onUserDataChange={handleUserDataChange } 
              userKey={userKey}/>} />
            <Route 
              path="/profile/edit/about" 
              element={
              <ProfileEditPageAbout 
              formData={formData} 
              onUserDataChange={handleUserDataChange } 
              userKey={userKey}/>} />
            <Route 
              path="/profile/add/experiens" 
              element={
              <ProfileExperiens 
              formData={formData} 
              onUserDataChange={handleUserDataChange } 
              userKey={userKey}/>} />
            <Route
              path="/profile/edit/experiens/:id"
              element={
              <ProfileExperiens 
              formData={formData} 
              onUserDataChange={handleUserDataChange } 
              userKey={userKey}
              editMode={true}/>}
            />
            <Route 
              path="/profile/service" 
              element={
              <ProfileServicePage
              formData={formData} 
              onUserDataChange={handleUserDataChange } 
              userKey={userKey}/>} />
            <Route
              path="/selection"
              element={
              <Selection
              addToCheck = {addToCheck}
              setAddToCheck = {setAddToCheck}
              role = {role}
              />}
            />
            <Route
              path="/compare"
              element={
              <ComparePage
              addToCheck = {addToCheck}
              setAddToCheck = {setAddToCheck}
              userKey={userKey}
              />}
            />
            <Route
              path="/show/profile/:id"
              element={
              <ProfileShow/>}
            />
            <Route 
              path="/employer/vacancy" 
              element={
              <ProfileVacancy
              formData={formData} 
              onUserDataChange={handleUserDataChange } 
              userKey={userKey}/>} />
            <Route 
              path="/show/vacancy" 
              element={
              <AllVacancy
            />} />
            <Route 
              path="/show/vacancy" 
              element={
              <AllVacancy
              formData={formData} 
              onUserDataChange={handleUserDataChange } 
              userKey={userKey}/>} />
            <Route 
              path="/show/vacancy/:id" 
              element={
              <VacancyShow
              userKey={userKey}
              />} />
            <Route 
              path="/admin/panel" 
              element={
              <AdminPage
            />} />
          </Routes>
          {/* <button onClick={handleDeleteAllProfiles}>Delete all</button><br /> */}
        </BrowserRouter>
      </div>
      
    )

}

export default App
