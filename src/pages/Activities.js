import { useState } from 'react';
import { Button, Modal, Form, FormGroup, Label, Input } from 'reactstrap';
import CreateActivity from '../components/CreateActivity'

const Activities = ({activities, createActivity}) => {
  const [modal, setModal] = useState(false);
  const modalToggle = () => setModal(!modal);


  return (
    <>
      <Button onClick={modalToggle}>Add Activity</Button>
      <CreateActivity modal={modal} modalToggle={modalToggle} createActivity={createActivity}/>
      <h1>Current Activities:</h1> 
      {activities.map((activity, index) => {
        return <p key={index}>{activity.name}</p>
      })}
    </>
  )
}

export default Activities