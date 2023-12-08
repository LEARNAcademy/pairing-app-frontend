import React from 'react'
import { useState, useEffect } from 'react';
import { Routes, Route, NavLink } from "react-router-dom"
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Footer from './components/Footer'
import Header from './components/Header'
import Login from './components/Login'
import Signup from './components/Signup'
import Activities from './pages/Activities'
import CreatePairs from './components/CreatePairs';

const App = () => {
  const [currUser, setCurrUser] = useState(true);
  const [cohorts, setCohorts] = useState([])
  const [pairs, setPairs] = useState([])
  const [activities, setActivities] = useState([])
  const [selectedCohort, setSelectedCohort] = useState([]) 
  const [students, setStudents] = useState()

  useEffect(() => {
    readCohorts()
    readActivities()
  }, [])


  const url = "http://localhost:3000"
  const login = async (userInfo) => {
    try{
        const response = await fetch(`${url}/login`, {
            method: "POST",
            headers: {
              'content-type': 'application/json',
              'accept': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
        const data = await response.json()
        if(!response.ok) 
        throw data.error
        localStorage.setItem("token", response.headers.get("Authorization"))
          setCurrUser(data)        
    }catch (error) {
        console.log("error", error)
    }
  }

  const signup = async (userInfo) => {
    try{
        const response = await fetch(`${url}/signup`, {
            method: 'post',
            headers: {
                "content-type": 'application/json',
                "accept": "application/json"
            },
            body: JSON.stringify(userInfo)
        }) 
        const data = await response.json()
        if(!response.ok) throw data.error
        localStorage.setItem('token', response.headers.get("Authorization"))
        setCurrUser(data)
    } catch (error){
        console.log("error", error)
    }
  }

  const logout = async () => {
    try {
        const response = await fetch(`${url}/logout`,{
            method: "delete",
            headers: {
                "content-type": "application/json",
                "authorization": localStorage.getItem("token")
            },
        })
        const data = await response.json()
        if(!response.ok) throw data.error
        localStorage.removeItem("token")
        setCurrUser(null)
    } catch (error) {
        console.log("error", error)
    }
  }

  const readCohorts = () => {
    fetch(`${url}/cohorts`)
      .then((response) => response.json())
      .then((payload) => {
        setCohorts(payload)
      })
      .catch((error) => console.log(error))
  }

  const currentCohort = (id) => {
    let findCohort = cohorts.find(cohort => cohort.id === +id)
    setSelectedCohort(findCohort)
  }

  const createCohort = (cohort) => {
    fetch(`${url}/cohorts`, {
      body: JSON.stringify(cohort),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    })
    .then((response) => response.json())
    .then((response) => setSelectedCohort(response))
    .then(() => readCohorts())
    .catch((error) => console.log(error))
  }

  const createStudent = (student, cohortID) => {
    fetch(`${url}/students`, {
      body: JSON.stringify(student),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    })
    .then((response) => response.json())
    .catch((error) => console.log(error))
  }

  const readActivities = () => {
    fetch(`${url}/activities`)
      .then((response) => response.json())
      .then((payload) => setActivities(payload))
      .catch((errors) => console.log(errors))
  }

  const createActivity = (activity) => {
    fetch(`${url}/activities`, {
      body: JSON.stringify(activity),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    })
    .then((response) => response.json())
    .then(() => readActivities())
    .catch((error) => console.log(error))
  }

  const createPair = (pair) => {
    fetch(`${url}/pairs`, {
      body: JSON.stringify(pair),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    })
    .then((response) => response.json())
    .then(() => readActivities())
    .catch((error) => console.log(error))
  }

  return (
    <>    
      <Header current_user={currUser} logout={logout} setCurrUser={setCurrUser}/>
        <Routes>
          <Route 
            exact path="/" 
            element={<Home current_user={currUser} cohorts={cohorts} currentCohort={currentCohort} selectedCohort={selectedCohort} activities={activities} createCohort={createCohort} createStudent= {createStudent} createPair={createPair} readCohorts={readCohorts}/>} 
          />
          <Route path="/activities" element={<Activities activities={activities} createActivity={createActivity}/>}/>
          <Route path="/login" element={<Login login={login}/>} />
          <Route path="/signup" element={<Signup signup={signup}/>} />
          <Route path="/createpairs/:id" element={
              <CreatePairs 
                  selectedCohort={selectedCohort}
                  currentCohort={currentCohort}
                  activities={activities}
                  students={students}
                  createPair={createPair}
                />
                }/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      <Footer />
    </>
  );
}

export default App