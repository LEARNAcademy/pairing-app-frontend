import { useState } from 'react';
import { Button, Modal, Form, FormGroup, Label, Input } from 'reactstrap';

const AddCohortModal = ({modal, modalToggle, createCohort}) => {
    const [newCohort, setNewCohort] = useState({
    name: "",
    year: ""
  })

    const handleChange = (e) => {
    setNewCohort({...newCohort, [e.target.name]: e.target.value})
  }

  const handleSubmit = () => {
    createCohort(newCohort)
    modalToggle()
  }

  return (
    <>
      <Modal isOpen={modal} >
        <h1>Add New Cohort</h1>
        <Form>
          <FormGroup>
            <Label for="name">
              Cohort Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Ex: Alpha"
              value={newCohort.name}
              type="text"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="year">
              Cohort Year
            </Label>
            <Input
              id="year"
              name="year"
              placeholder="Ex: 2023"
              value={newCohort.year}
              type="text"
              onChange={handleChange}
            />
          </FormGroup>
          <Button onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
        <Button onClick={modalToggle}>
          Cancel
        </Button>
      </Modal>
    </>
  )
}

export default AddCohortModal