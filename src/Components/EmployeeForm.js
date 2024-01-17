import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, 
  TextField, Radio, RadioGroup, FormControlLabel, FormLabel,
   FormControl ,FormHelperText} from "@material-ui/core";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Table from './Table';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  gender: Yup.string().required("Gender is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  salary: Yup.number().required("Salary is required"),
  dob: Yup.date().required("Date of Birth is required"),
  city: Yup.string().required("City is required"),
  address: Yup.string().required("Address is required"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  gender: "",
  email: "",
  salary: "",
  dob: "",
  city: "",
  address: "",
};

const columns = [
  { name: "firstName", label: "First Name" },
  { name: "lastName", label: "Last Name" },
  { name: "gender", label: "Gender" },
  { name: "email", label: "Email" },
  { name: "salary", label: "Salary" },
  { name: "dob", label: "Date of Birth" },
  { name: "city", label: "City" },
  { name: "address", label: "Address" },
];

const EmployeeForm = () => {
  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editId, setEditId] = useState(null);

  const openModal = () => {
    setOpenDialog(true);
  };

  const closeModal = () => {
    setOpenDialog(false);
    setEditId(null);
  };

  const addData = (values) => {
    if (editId !== null) {
      const updatedData = data.map((item) =>
        item.id === editId ? { ...item, ...values } : item
      );
      setData(updatedData);
      localStorage.setItem('data', JSON.stringify(updatedData));
    } else {
      const newData = [...data, { id: Date.now(), ...values }];
      setData(newData);
      localStorage.setItem('data', JSON.stringify(newData));
    }
    closeModal();
  };

  const editData = (id) => {
    const itemToEdit = data.find((item) => item.id === id);
    setEditId(id);
    openModal();
  };

  const deleteData = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
    localStorage.setItem('data', JSON.stringify(newData));
  };

  const handleGenderChange = (id, newGender) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, gender: newGender } : item
    );
    setData(updatedData);
    localStorage.setItem('data', JSON.stringify(updatedData));
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('data')) || [];
    setData(storedData);
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: 35, margin: 20 }}>Employees Data</h1>
      <div style={{ textAlign: 'right' }}>
        <Button onClick={openModal} style={{ margin: 30, marginRight: 80 }} variant='contained' color='primary'>
          Add Employee
        </Button>
      </div>
      <div > 
      <Dialog open={openDialog} onClose={closeModal} PaperProps={{ style: { width: '900px' } }}>


        <DialogTitle>{editId !== null ? 'Edit Employee' : 'Add Employee'}</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={editId !== null ? data.find((item) => item.id === editId) : initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => addData(values)}
          >
             {({ errors, touched }) => (
            <Form>
              <div>
                <Field
                  as={TextField}
                  type="text"
                  label="First Name"
                  name="firstName"
                  fullWidth
                  margin="normal"
                  // error={<ErrorMessage name="firstName"/>}
                  
                  helperText={
                    <FormHelperText style={{ color: 'red' }}>
                      <ErrorMessage name="firstName" />
                    </FormHelperText>
                  }
                />
              </div>
              <div>
                <Field
                  as={TextField}
                  type="text"
                  label="Last Name"
                  name="lastName"
                  fullWidth
                  margin="normal"
                  error={errors.lastName && touched.lastName}
                  helperText={
                    <FormHelperText style={{ color: 'red' }}>
                      <ErrorMessage name="lastName" />
                    </FormHelperText>
                  }
                />
              </div>
              <div>
                <FormControl component="fieldset" margin="normal">
                  <FormLabel component="legend">Gender</FormLabel>
                  <Field as={RadioGroup} name="gender">
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="others" control={<Radio />} label="Others" />
                  </Field>
                  <ErrorMessage name="gender" component="div" style={{ color: 'red' }} />
                  
                </FormControl>
              </div>
              <div>
                <Field
                  as={TextField}
                  type="text"
                  label="Email"
                  name="email"
                  fullWidth
                  margin="normal"
                  // error={<ErrorMessage name="email" />}
                  helperText={
                    <FormHelperText style={{ color: 'red' }}>
                      <ErrorMessage name="email" />
                    </FormHelperText>
                  }
                />
              </div>
              <div>
                <Field
                  as={TextField}
                  type="number"
                  label="Salary"
                  name="salary"
                  fullWidth
                  margin="normal"
                  // error={<ErrorMessage name="salary" />}
                  helperText={
                    <FormHelperText style={{ color: 'red' }}>
                      <ErrorMessage name="salary" />
                    </FormHelperText>
                  }
                />
              </div>
              <div>
                <Field
                  as={TextField}
                  type="date"
                  label="Date Of Birth"
                  name="dob"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  // error={<ErrorMessage name="dob" />}
                  helperText={
                    <FormHelperText style={{ color: 'red' }}>
                      <ErrorMessage name="dob" />
                    </FormHelperText>
                  }
                />
              </div>
              <div>
                <Field
                  as={TextField}
                  type="text"
                  label="City"
                  name="city"
                  fullWidth
                  margin="normal"
                  // error={<ErrorMessage name="city" />}
                  helperText={
                    <FormHelperText style={{ color: 'red' }}>
                      <ErrorMessage name="city" />
                    </FormHelperText>
                  }
                />
              </div>
              <div>
                <Field
                  as={TextField}
                  type="text"
                  label="Address"
                  name="address"
                  fullWidth
                  margin="normal"
                  // error={<ErrorMessage name="address" />}
                  helperText={
                    <FormHelperText style={{ color: 'red' }}>
                      <ErrorMessage name="address" />
                    </FormHelperText>
                  }
                />
              </div>
              <DialogActions>
                <Button variant="contained" onClick={closeModal}>
                  Close
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  Save
                </Button>
              </DialogActions>
            </Form>
             )}
          </Formik>
        </DialogContent>
      </Dialog>
      <Table data={data} columns={columns} editData={editData} deleteData={deleteData} handleGenderChange={handleGenderChange} />
    </div>
    </div>
  );
};

export default EmployeeForm;
