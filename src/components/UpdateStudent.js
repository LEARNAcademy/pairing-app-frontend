import { useState } from 'react';
import { Button, Modal, Form, FormGroup, Label, Input } from 'reactstrap';

const UpdateStudent = ({student, modal, modalToggle}) => {
  return (
    <>
      <Modal isOpen={modal} >
        <h1>Add new activity</h1>
        <Form>
          <FormGroup>
            <Label for="first-name">
              Student First Name
            </Label>
            <Input
              id="first_name"
              name="first_name"
              value={student.first_name}
              type="text"
              // onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="last-name">
              Student Last Name
            </Label>
            <Input
              id="first_name"
              name="first_name"
              value={student.first_name}
              type="text"
              // onChange={handleChange}
            />
          </FormGroup>
          {/* <Button onClick={handleSubmit}>
            Submit
          </Button> */}
        </Form>
        <Button onClick={modalToggle}>
          Cancel
        </Button>
      </Modal>
    </>
  )
}

export default UpdateStudent