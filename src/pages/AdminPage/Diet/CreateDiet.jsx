import { Box, Button, TextField, useTheme } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Formik } from 'formik';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { createDiet } from '~/api/dietService';
import AdminHeader from '~/component/Layout/components/AdminHeader/AdminHeader';
import { tokens } from '~/theme';
import { decode } from '~/utils/axiosClient';

function CreateDiet() {
    const navigate = useNavigate();
    const theme = useTheme({ isDashboard: false });
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: colors.grey[500],
        border: '2px solid #000',
        color: colors.grey[100],
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };
    const userRole = decode(localStorage.getItem('token')).roles[0];
    const initialValues = {
        type: '',
        foodListIds: '',
    };

    const userSchema = yup.object().shape({
        type: yup.string().required('Type is not empty'),
        foodListIds: yup
            .string()
            .transform((value, originalValue) => {
                if (typeof originalValue === 'string') {
                    const ids = originalValue
                        .split(',')
                        .map((id) => id.trim()) // Trim leading/trailing spaces
                        .filter((id) => id !== '') // Remove empty values
                        .map(Number);

                    return ids;
                }
                return value;
            })
            .required('FoodListIds is not empty'),
    });

    const handleFormSubmit = async (values, { resetForm }) => {
        console.log(values);
        try {
            const submitValue = {
                type: values.type,
                foodListIds: values.foodListIds,
            };
            const response = await createDiet(submitValue);
            console.log(submitValue);
            if (response?.status === 200) {
                setOpen(true);
                resetForm();
            }
        } catch (error) {
            console.error('Error submitting form:', error.message);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{ ...style, width: 400 }}>
                        <h2 id="parent-modal-title">"Create Diet Successfully!"</h2>
                        <p id="parent-modal-description">New diet have been add to DataBase!</p>
                        <Button onClick={handleClose}>Close</Button>
                    </Box>
                </Modal>
            </div>
            <Box m="20px">
                <AdminHeader title="Create Diet" subtitle="Create new diet" />
                <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={userSchema}>
                    {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <Box>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Type"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.type}
                                    name="type"
                                    error={!!touched.type && !!errors.type}
                                    helperText={touched.type && errors.type}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="FoodListIds"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.foodListIds}
                                    name="foodListIds"
                                    error={!!touched.foodListIds && !!errors.foodListIds}
                                    helperText={touched.foodListIds && errors.foodListIds}
                                />
                            </Box>
                            <Box display="flex" justifyContent="space-between" mt="20px">
                                <Button
                                    type="button"
                                    color="secondary"
                                    variant="contained"
                                    onClick={() => navigate('/viewdiets')}
                                >
                                    VIEW DIETS
                                </Button>
                                <Button type="submit" color="secondary" variant="contained">
                                    CREATE DIET
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </>
    );
}

export default CreateDiet;
