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
import ProfileEditPageAbout from './Pages/ProfileEditPageAbout';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

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
    },
    experiens: []
  })
  const [userKey, setUserKey] = useState()

  const [allData, setAllData] = useState()


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    // setShow(true)
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
                about:{
                  text: "",
                  skills: [],
                  lang: "",
                },
                experiens: []
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
              <div className="d-flex flex-row w-100 justify-content-between mt-4">
                <button>Специалист</button>
                <button>Работадатель</button>
                <button>Пользователь</button>
              </div>
            </Modal.Body>
            {/* <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary">Understood</Button>
            </Modal.Footer> */}
          </Modal>

          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/profile" element={<ProfilePage formData={formData}/>} />
            <Route path="/profile/edit/personal" element={<ProfileEditPage formData={formData} onUserDataChange={handleUserDataChange } userKey={userKey}/>} />
            <Route path="/profile/edit/about" element={<ProfileEditPageAbout formData={formData} onUserDataChange={handleUserDataChange } userKey={userKey}/>} />
          </Routes>
          <button onClick={handleDeleteAllProfiles}>Delete all</button><br />
        </BrowserRouter>
      </div>
      
    )

}

export default App
