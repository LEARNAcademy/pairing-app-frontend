import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Button, Modal, Form, FormGroup, Label, Input } from 'reactstrap';

const CreateStudentsModal = ({studentModal, studentModalToggle, selectedCohort, handleCreateStudent}) => {
  const navigate = useNavigate()
  const [newStudent, setNewStudent] = useState({
    first_name: "",
    last_name: ""
  })

  const handleChange = (e) => {
    setNewStudent({...newStudent, [e.target.name]: e.target.value, cohort_id: selectedCohort?.id})
  }

  const handleSubmit = () => {
      handleCreateStudent(newStudent)
      setNewStudent({first_name: "", last_name: ""})
  }

  return (
    <>
      <Modal isOpen={studentModal} >
        <h1>Add New Student</h1>
        <Form>
          <FormGroup>
            <Label for="first_name">
              First Name
            </Label>
            <Input
              id="first_name"
              name="first_name"
              placeholder="Ex: Elsa"
              value={newStudent.first_name}
              type="text"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="last_name">
              Last Name
            </Label>
            <Input
              id="last_name"
              name="last_name"
              placeholder="Ex: Arendale"
              value={newStudent.last_name}
              type="text"
              onChange={handleChange}
            />
          </FormGroup>
          <Button onClick={handleSubmit}>
            Add Student
          </Button>
        </Form>
        <Button onClick={studentModalToggle}>
          Done
        </Button>
        <Button onClick={studentModalToggle}>
          Cancel
        </Button>
      </Modal>
    </>
  )
}

export default CreateStudentsModal