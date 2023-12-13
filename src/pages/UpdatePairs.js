import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Modal,
  Form,
  FormGroup,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const UpdatePairs = ({ selectedCohort, activities }) => {
  const { id } = useParams();
  let activity = activities?.find((activity) => activity.id === +id);

  // Sets array of pair objects associated only to the selected activity and selectd cohort (pairs only have student id association)
  let filteredActivityPairs = activity?.pairs?.filter(
    (pair) =>
      pair.cohort_id === selectedCohort?.id &&
      (pair.student_one_id !== null || pair.student_two_id !== null)
  );

  // Sets array of pairs based on the filteredActivityPairs with the student's complete object
  let groups = filteredActivityPairs?.map((pair) => {
    var studentOne = selectedCohort.students?.find(
      (student) => student.id === pair.student_one_id
    );
    var studentTwo = selectedCohort.students?.find(
      (student) => student.id === pair.student_two_id
    );
    return new Array(studentOne, studentTwo);
  });

  const [unPairedStudents, setUnpairedStudents] = useState([]);
  const [activityPairs, setActivityPairs] = useState(groups);

  // Default values for draggable elements
  const dragPerson = useRef([]);
  const draggedOverGroup = useRef();

  useEffect(() => {
    let unPaired = selectedCohort?.students?.filter((student) => {
      return !filteredActivityPairs?.some(
        (pair) =>
          pair.student_one_id === student?.id ||
          pair.student_two_id === student?.id
      );
    });

    setUnpairedStudents(unPaired);
  }, []);

  const handleSort = () => {
    if (draggedOverGroup.current !== null) {
      const updateActivityPairs = [...activityPairs];
      const [sourcePairIndex, sourceStudentIndex] = dragPerson.current;

      if (sourcePairIndex === null && sourceStudentIndex !== null) {
        // Dragging an unpaired student
        const draggedStudent = unPairedStudents[sourceStudentIndex];

        // Check if the student is not already in the target group
        const isStudentAlreadyInTargetGroup = updateActivityPairs[
          draggedOverGroup.current
        ]?.some((student) => student && student.id === draggedStudent.id);

        // Add the student to the target group only if not already present
        if (!isStudentAlreadyInTargetGroup) {
          updateActivityPairs[draggedOverGroup.current].push(draggedStudent);
          setActivityPairs(updateActivityPairs);

          // Remove the student from the unpaired list
          setUnpairedStudents((prevUnpaired) =>
            prevUnpaired.filter((_, index) => index !== sourceStudentIndex)
          );
        }
      } else {
        // Dragging a student within the paired groups
        const draggedStudent =
          updateActivityPairs[sourcePairIndex][sourceStudentIndex];

        // Remove the student from its original location
        const originalGroupIndex = activityPairs.findIndex(
          (group, index) =>
            index !== draggedOverGroup.current && group.includes(draggedStudent)
        );

        if (originalGroupIndex !== -1) {
          const originalGroup = updateActivityPairs[originalGroupIndex];
          const studentIndexInOriginalGroup =
            originalGroup.indexOf(draggedStudent);
          originalGroup.splice(studentIndexInOriginalGroup, 1);
        }

        // Check if the student is not already in the target group
        const isStudentAlreadyInTargetGroup = updateActivityPairs[
          draggedOverGroup.current
        ]?.some((student) => student && student.id === draggedStudent.id);

        // Add the student to the target group only if not already present
        if (!isStudentAlreadyInTargetGroup) {
          updateActivityPairs[draggedOverGroup.current].push(draggedStudent);
          setActivityPairs(updateActivityPairs);
        }
      }
    }

    // Reset the draggedOverGroup reference
    draggedOverGroup.current = null;
  };

  const removeStudent = (student, pairIndex, studentIndex) => {
    let updateActivityPairs = [...activityPairs];
    updateActivityPairs[pairIndex].splice(studentIndex, 1);
    setActivityPairs(updateActivityPairs);
    setUnpairedStudents([...unPairedStudents, student]);
  };

  const addGroup = () => {
    let updateActivityPairs = [...activityPairs, []];
    setActivityPairs(updateActivityPairs);
  };

  const removeGroup = () => {
    let updateActivityPairs = [...activityPairs];
    updateActivityPairs.pop()
    setActivityPairs(updateActivityPairs)
  }

  const handleDrop = (targetPairIndex) => {
    const [sourcePairIndex, sourceStudentIndex] = dragPerson.current;

    // Ensure the source and target pairs are different
    if (sourcePairIndex !== targetPairIndex) {
      const updatedPairs = [...activityPairs];
      let draggedStudent;

      if (sourcePairIndex !== null && sourceStudentIndex !== null) {
        // Move student from one group to another
        draggedStudent = updatedPairs[sourcePairIndex].splice(
          sourceStudentIndex,
          1
        )[0];
      } else {
        // Move student from unpaired list to a group
        draggedStudent = unPairedStudents[sourceStudentIndex];
        setUnpairedStudents((prevUnpaired) =>
          prevUnpaired.filter((_, index) => index !== sourceStudentIndex)
        );
      }

      // Insert the dragged student into the target pair
      updatedPairs[targetPairIndex].push(draggedStudent);

      // Update the state with the new pairs arrangement
      setActivityPairs(updatedPairs);
    }

    // Reset the dragPerson and draggedOverGroup references
    dragPerson.current = null;
    draggedOverGroup.current = null;
  };

  return (
    <>
      <h1>Current Pairs for {activity?.name}</h1>
      <ul>
        {activityPairs &&
          activityPairs.map((pair, pairIndex) => {
            return (
              <li className="flex-row list-spacing" key={pairIndex}>
                <p>Group {pairIndex + 1}:</p>
                {pair.length > 0 ? (
                  pair?.map((student, studentIndex) => {
                    return (
                      <p
                        className="student-box"
                        key={studentIndex}
                        draggable
                        onDragStart={() =>
                          (dragPerson.current = [pairIndex, studentIndex])
                        }
                        onDragOver={() =>
                          (draggedOverGroup.current = pairIndex)
                        }
                        onDragEnd={handleSort}
                      >
                        {student.first_name} {student.last_name.slice(0, 1)}
                        <button
                          className="delete-button"
                          onClick={() =>
                            removeStudent(student, pairIndex, studentIndex)
                          }
                        >
                          x
                        </button>
                      </p>
                    );
                  })
                ) : (
                  <div
                    className="student-drag-here"
                    onDragOver={() => (draggedOverGroup.current = pairIndex)}
                    onDrop={() => handleDrop(pairIndex)}
                  >
                    {" "}
                    Drag student here to add
                    <button
                      className="delete-button"
                      onClick={removeGroup}
                    >
                      x
                    </button>
                  </div>
                )}
              </li>
            );
          })}
      </ul>
      <button onClick={addGroup}>Add group</button>
      <h4>Unpaired Students:</h4>
      <ul>
        {unPairedStudents?.map((student, index) => {
          return (
            <li
              className="student-box"
              style={{ width: "10%" }}
              key={index}
              draggable
              onDragStart={() => (dragPerson.current = [null, index])}
              onDragOver={() =>
                (draggedOverGroup.current = activityPairs.filter(
                  (pair, pairIndex) => pairIndex
                ))
              }
              onDragEnd={handleSort}
            >
              {student.first_name} {student.last_name.slice(0, 1)}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default UpdatePairs;
