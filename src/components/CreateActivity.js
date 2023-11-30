import { useState } from 'react';
import { Button, Modal, Form, FormGroup, Label, Input } from 'reactstrap';

const CreateActivity = ({modal, modalToggle, createActivity}) => {
  const [newActivity, setNewActivity] = useState({
    name: ""
  })

  const handleChange = (e) => {
    setNewActivity({...newActivity, [e.target.name]: e.target.value})
  }

  const handleSubmit = () => {
    createActivity(newActivity)
    modalToggle()
  }
  return (
    <>
      <Modal isOpen={modal} >
        <h1>Add new activity</h1>
        <Form>
          <FormGroup>
            <Label for="name">
              Activity Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Ex: Javascript Intro"
              value={newActivity.name}
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

export default CreateActivity