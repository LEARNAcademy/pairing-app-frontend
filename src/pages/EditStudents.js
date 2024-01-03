import React, {useState} from 'react'
import { FaEdit } from "react-icons/fa";
import UpdateStudent from '../components/UpdateStudent';

const EditStudents = ({selectedCohort, editStudent}) => {

  const [editStudentModal, setEditStudentModal] = useState(false);
  const editStudentModalToggle = () => setEditStudentModal(!editStudentModal);
  return (
    <>
      <h3>Edit {selectedCohort.name} students:</h3>
      <ul>
      {selectedCohort.students?.map((student, index) => {
        return (
          <li>
            {student.first_name} {student.last_name}
            <FaEdit onClick={editStudentModalToggle}/>
            <UpdateStudent modal={editStudentModal} modalToggle={editStudentModalToggle} student={student} editStudent={editStudent}/>
          </li>
        )
      })}
      </ul>
    </>
  )
}

export default EditStudents