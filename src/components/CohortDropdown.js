import { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import AddCohortModal from './CreateCohortModal'

const CohortDropdown = ({cohorts, currentCohort, createCohort}) => {
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modal, setModal] = useState(false);

  const modalToggle = () => setModal(!modal);

  const selectCohort = (e) => {
    currentCohort(e.target.value)
  }

  return (
    <>
      <Dropdown isOpen={dropdownOpen} toggle={toggle} >
        <DropdownToggle caret size="lg">
          Select Cohort
        </DropdownToggle>
        <DropdownMenu>
          {cohorts ?
          cohorts.map((cohort, index) => {
            return (
              <DropdownItem 
                      key={index} 
                      value={cohort.id}
                      onClick={selectCohort}>
                        {cohort.name} {cohort.year}
              </DropdownItem>
            )
          })
            : 
            <></>
          }
          <DropdownItem divider />
          <DropdownItem onClick={modalToggle}>Add Cohort</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <AddCohortModal modal={modal} modalToggle={modalToggle} createCohort={createCohort} />
    </>
  )
}

export default CohortDropdown