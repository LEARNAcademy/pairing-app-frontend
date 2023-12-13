import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Button,
  Modal, 
  Form, 
  FormGroup,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, } from 'reactstrap';

const CreatePairs = ({selectedCohort, activities, createPair}) => {
  const { id } = useParams()
  let activity = activities?.find((activity) => activity.id === +id)

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [newPair, setNewPair] = useState({
    activity_id: activity?.id,
    cohort_id: selectedCohort?.id,
    student_one_id: null,
    student_two_id: null
  })
  const [selectedStudents, setSelectedStudents] = useState([])
  const [unPairedStudents, setUnpairedStudents] = useState([])


  let filteredActivityPairs = activity?.pairs?.filter(pair => pair.cohort_id === selectedCohort?.id && (pair.student_one_id !== null || pair.student_two_id !== null))


  useEffect(() => {
    let unPaired = selectedCohort?.students?.filter(student => {
      return !filteredActivityPairs?.some(pair =>
        pair.student_one_id === student?.id || pair.student_two_id === student?.id
      );
    });
    
    setUnpairedStudents(unPaired)
}, [])


const selectStudent = (selectedStudentID) => {
  let updatedUnpairedStudents = unPairedStudents?.filter(student => student?.id !== selectedStudentID)
  setUnpairedStudents(updatedUnpairedStudents)
  newPair.cohort_id = selectedCohort?.id
  var selectedStudent = selectedCohort.students?.find(student => student.id === parseInt(selectedStudentID))
  if(newPair.student_one_id === null) {
    newPair.student_one_id = parseInt(selectedStudentID)
    setNewPair(newPair)
    let addSelectedStudent = [...selectedStudents, selectedStudent.first_name]
    setSelectedStudents(addSelectedStudent)
  } else if(newPair.student_two_id === null) {
    newPair.student_two_id = parseInt(selectedStudentID)
    setNewPair(newPair)
    let addSelectedStudent = [...selectedStudents, selectedStudent.first_name]
    setSelectedStudents(addSelectedStudent)
  }
}

  const handleSubmit = () => {
    createPair(newPair)
    let updatedUnpairedStudents = unPairedStudents?.filter(student => student?.first_name !== selectedStudents[0] && student?.first_name !== selectedStudents[1])
    setUnpairedStudents(updatedUnpairedStudents)
    setNewPair({
      activity_id: activity?.id,
      cohort_id: selectedCohort?.id,
      student_one_id: null,
      student_two_id: null
    })
    setSelectedStudents([])
  }

  const handleClick = (e) => {
    selectStudent(e.target.value)
  }


  return (
    <>
        <h1>Current Pairs for {activity?.name}</h1>
        <ul>
            {filteredActivityPairs && filteredActivityPairs.map((pair, index) => {
                var studentOne = selectedCohort.students?.find(student => student.id === pair.student_one_id)
                var studentTwo = selectedCohort.students?.find(student => student.id === pair.student_two_id)
                return <li key={index}>{studentOne?.first_name}, {studentTwo?.first_name}</li>
            })}
          </ul>
        <h1>Add pairs</h1>
        <h3>Selected</h3>
        <ul>
            {selectedStudents && selectedStudents.map((student, index) => {
              return <li key={index}>{student}</li>
            })
            }
        </ul>
        <Form>
          <FormGroup>
            <Dropdown isOpen={dropdownOpen} toggle={toggle} >
              <DropdownToggle caret size="lg">
                Select Student
              </DropdownToggle>
              <DropdownMenu>
                {unPairedStudents ?
                 unPairedStudents.map((student, index) => {
                  return (
                    <DropdownItem 
                            key={index} 
                            value={student.id}
                            onClick={handleClick}>
                              {student.first_name}
                    </DropdownItem>
                  )
                })
                : <></>
              }
              </DropdownMenu>
            </Dropdown>
          </FormGroup>
          <Button onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
    </>
  )
}

export default CreatePairs