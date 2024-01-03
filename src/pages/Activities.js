import { useState } from 'react';
import { Button, Modal, Form, FormGroup, Label, Input } from 'reactstrap';
import CreateActivity from '../components/CreateActivity'
import UpdateActivity from '../components/UpdateActivity'
import { FaEdit } from "react-icons/fa";

const Activities = ({activities, createActivity, editActivity}) => {
  const [createActivityModal, setCreateActivityModal] = useState(false);
  const createActivityModalToggle = () => setCreateActivityModal(!createActivityModal);

  const [editActivityModal, setEditActivityModal] = useState(false);
  const editActivityModalToggle = () => setEditActivityModal(!editActivityModal);

  return (
    <>
      <Button onClick={createActivityModalToggle}>Add Activity</Button>
      <CreateActivity modal={createActivityModal} modalToggle={createActivityModalToggle} createActivity={createActivity}/>
      <h1>Current Activities:</h1> 
      {activities.map((activity, index) => {
        return (
          <div key={index} className='flex-row'>
            <p className='side-padding'>{activity.name}</p>
            <FaEdit onClick={editActivityModalToggle}/>
            <UpdateActivity modal={editActivityModal} modalToggle={editActivityModalToggle} activity={activity} editActivity={editActivity}/>
          </div>
        )
      })}
    </>
  )
}

export default Activities