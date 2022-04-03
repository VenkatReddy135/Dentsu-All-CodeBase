import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal, Button, ToastContainer, Toast } from "react-bootstrap";

const EmployeesList = () => {
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState([]);
  const [filteredData, setFilteredData] = useState(employeeData);
  const [show, setShow] = useState({ show: false, id: null });
  const [showToast, setShowToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  
  const resource = "https://dummy.restapiexample.com/api/v1";

  const handleClose = () =>
    setShow((prevState) => ({ ...prevState, show: false }));
  const handleShow = (user) => {
    setShow((prevState) => ({ ...prevState, show: true, id: user.id }));
  };

  const handleSuccess = useCallback(() => {
    const clickedId = show.id;
    console.log(clickedId);
    axios
      .delete(`${resource}/delete/${clickedId}`)
      .then(function (response) {
        setSuccessMessage(response?.data.message);
        setShowToast(true);
      })
      .catch(function (error) {
        console.log(error);
      });
    setShow((prevState) => ({ ...prevState, show: false }));
  }, [show.id]);

  useEffect(() => {
    axios
      .get(`${resource}/employees`)
      .then(function (response) {
        const details = response.data;
        setEmployeeData(details.data);
        setFilteredData(details.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const viewEmployeeDetails = (empData) => {
    navigate(`/${empData.id}`);
  };

  const searchData = (e) => {
    const { value } = e.target;
    const searchString = value.toLowerCase();
    if (searchString.length > 0) {
      setFilteredData((prevState) => {
        const filteredValue = prevState.filter((el) =>
          el.employee_name.toLowerCase().includes(searchString)
        );
        return filteredValue;
      });
    } else {
      setFilteredData(employeeData);
    }
  };

  return (
    <div className={`container border border-info mt-4 mb-4`}>
      <h2>Employee List</h2>
      <div className="row">
        <div className="col">
          <input
            type="text"
            placeholder="Search"
            data-test-id="search"
            onChange={searchData}
            className={`form-control searchField marginClass`}
          />
        </div>
      </div>
      <table className={`table table-striped marginClass`}>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Employee Age</th>
            <th>Employee Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.length > 0 ? (
            filteredData?.map((user) => (
              <tr key={user?.id}>
                <td>{user?.employee_name}</td>
                <td>{user?.employee_age}</td>
                <td>{user?.employee_salary}</td>
                <td>
                  <button
                    onClick={() => {
                      viewEmployeeDetails(user);
                    }}
                    data-test-id="view"
                    className="button btn btn-info"
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      handleShow(user);
                    }}
                    data-test-id="delete"
                    className={`button btn btn-danger marginLeftClass`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No Employees Found</td>
            </tr>
          )}
        </tbody>
      </table>
      <Modal
        show={show.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <h5>Are you sure you want to delete?</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleSuccess}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          bg="success"
          autohide
        >
          <Toast.Body className="text-white">
            {successMessage || null}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default React.memo(EmployeesList);
