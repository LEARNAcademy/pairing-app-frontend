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
import CreatePairs from './pages/CreatePairs';
import UpdatePairs from './pages/UpdatePairs'
import './App.css'
import EditStudents from './pages/EditStudents'

const App = () => {
  const [currUser, setCurrUser] = useState(true);
  const [cohorts, setCohorts] = useState([])
  const [pairs, setPairs] = useState([])
  const [activities, setActivities] = useState([])
  const [selectedCohort, setSelectedCohort] = useState([]) 

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

  const createStudent = async (student) => {
    try {
      const response = await fetch(`${url}/students`, {
        body: JSON.stringify(student),
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      })
      await response.json();
      if(readCohorts()) {
        readCohorts()
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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

  const editActivity = (activity, id) => {
    fetch(`${url}/activities/${id}`, {
      body: JSON.stringify(activity),
      headers: {
        "Content-Type": "application/json"
      },
      method: "PATCH"
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

  

  const editPairs = async (activityPairs, activity, filteredActivityPairs) => {
    // Check if activity.pairs exists and is an array
    if (
      filteredActivityPairs &&
      Array.isArray(filteredActivityPairs) &&
      activityPairs.length === filteredActivityPairs.length
    ) {
      try {
        // Use map to create an array of fetch promises
        const updatePromises = filteredActivityPairs.map(async (pair, index) => {
          const pairId = pair.id;
  
          // Check if pairId is valid
          if (pairId !== undefined) {
            const response = await fetch(`http://localhost:3000/pairs/${pairId}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(activityPairs[index])
            });
  
            if (!response.ok) {
              throw new Error(`Failed to update pair with ID ${pairId}`);
            }
  
            return response.json();
          } else {
            console.error(`Invalid pair ID for index ${index}`);
            return null; // Return null for invalid pair IDs
          }
        });
  
        // Wait for all valid fetch calls to complete
        const updatedPairs = await Promise.all(updatePromises.filter(Boolean));
  
        // Log the updated pairs
        console.log("Updated Pairs:", updatedPairs);
  
        // Call readActivities after all valid fetch calls are complete
        readActivities();
      } catch (error) {
        console.log("Activity pair update errors:", error);
      }
    } else {
      // Handle the case where activity.pairs is undefined or not an array
      console.error("Invalid activity.pairs");
    }
  };
  

  return (
    <>    
      <Header current_user={currUser} logout={logout} setCurrUser={setCurrUser}/>
        <Routes>
          <Route 
            exact path="/" 
            element={<Home current_user={currUser} cohorts={cohorts} currentCohort={currentCohort} selectedCohort={selectedCohort} activities={activities} createCohort={createCohort} createStudent= {createStudent} createPair={createPair} readCohorts={readCohorts}/>} 
          />
          <Route path="/activities" element={<Activities activities={activities} createActivity={createActivity} editActivity={editActivity}/>}/>
          <Route path="/login" element={<Login login={login}/>} />
          <Route path="/signup" element={<Signup signup={signup}/>} />
          <Route path="/createpairs/:id" element={
            <CreatePairs 
                selectedCohort={selectedCohort}
                currentCohort={currentCohort}
                activities={activities}
                createPair={createPair}
              />
          }/>
          <Route path="/updatepairs/:id" element={<UpdatePairs selectedCohort={selectedCohort} currentCohort={currentCohort} activities={activities} editPairs={editPairs} createPair={createPair} />}/>
          <Route path="/editstudents" element={<EditStudents selectedCohort={selectedCohort} />}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      <Footer />
    </>
  );
}

export default App