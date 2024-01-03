import { useState } from 'react';
import { Button, Modal, Form, FormGroup, Label, Input } from 'reactstrap';

const UpdateActivity = ({modal, modalToggle, editActivity, activity}) => {
  const [updatedActivity, setUpdatedActivity] = useState({
    name: activity?.name
  })

  const handleChange = (e) => {
    setUpdatedActivity({...updatedActivity, [e.target.name]: e.target.value})
  }

  const handleSubmit = () => {
    editActivity(updatedActivity, activity.id)
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
              value={updatedActivity.name}
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

export default UpdateActivity