import { useState, useEffect } from 'react';
import CohortDropdown from '../components/CohortDropdown'
import CreateStudentsModal from '../components/CreateStudentsModal'
import CreatePairs from '../components/CreatePairs'
import { NavLink } from 'react-router-dom'


const Home = ({ readCohorts, currentCohort, current_user, selectedCohort, cohorts, students, activities, createCohort, createStudent }) => {
  const [studentModal, setStudentModal] = useState(false);

  const studentModalToggle = () => setStudentModal(!studentModal);

useEffect(() => {
  readCohorts()
}, [])

  return (
    <>
    {current_user && 
      <>
        <h1>Pairing Randomizer</h1>
        <CohortDropdown 
          currentCohort={currentCohort} 
          cohorts={cohorts} 
          createCohort={createCohort}/>
        <h3>{selectedCohort?.name} {selectedCohort?.year}</h3>
        <h3>Students:</h3>
        <button onClick={studentModalToggle}>Add Students</button>
        <CreateStudentsModal 
          studentModal={studentModal} 
          studentModalToggle={studentModalToggle} 
          createStudent ={createStudent} 
          selectedCohort={selectedCohort}/>
        <ul>
          {selectedCohort.students?.map((student, index)=> {
            return <li key={index}>{student.first_name} {student.last_name}</li>
          })}
        </ul>
        <h3>Pairings:</h3>
        {activities?.map((activity, index) => {
          return (
            <div key={activity.id}>
              <h5>{activity.name}</h5>
              <button>
                <NavLink to={`/createpairs/${activity.id}`}>
                  Create Pair
                </NavLink>
              </button>
              <ul>
                {activity?.pairs.filter(pair => selectedCohort?.id === pair?.cohort_id).map((pair, index) => {
                  var studentOne = selectedCohort.students?.find(student => student.id === pair.student_one_id)
                  var studentTwo = selectedCohort.students?.find(student => student.id === pair.student_two_id)
                  return <li key={index}>{studentOne?.first_name}, {studentTwo?.first_name}</li>
                })}  
              </ul>
            </div>
          )
        })}
      </>
    }
     {!current_user && 
      <>
        <h1>Please log in or sign up:</h1>
        <button>
          <NavLink to="/login" className="nav-link">
                Sign In
          </NavLink>
        </button>
        <button>
          <NavLink to="/signup" className="nav-link">
                Sign Up
          </NavLink>
        </button>
      </>
     } 
        
    </>
  )
}

export default Home