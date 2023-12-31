import { Box, Button, FormControl, Input, InputLabel, MenuItem, Select, TextField, Typography, useTheme } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Formik } from 'formik';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { createNews } from '~/api/newsService';
import AdminHeader from '~/component/Layout/components/AdminHeader/AdminHeader';
import { tokens } from '~/theme';
import uploadFile from '~/utils/transferFile';
import CustomToolbar from '../../../component/Layout/components/QuillEditor/CustomToolbar';

function NewsPostForm() {
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
    const [editorContent, setEditorContent] = useState('');

    const handleEditorChange = (content) => {
        setEditorContent(content);
    };
    const initialValues = {
        title: '',
        shortDescription: '',
        content: '',
        type: 'Event',
        imgUrl: '',
        thumbnailUrl: '',
        status: true,
        content: "",
    };
    const FILE_SIZE = 1920 * 1080;
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
    const typeOptions = ['Event', 'Info'];
    const userSchema = yup.object().shape({
        title: yup.string().required('Title is required'),
        shortDescription: yup.string().required('Short Description is required').max(250, "Short Description max is 250 words."),
        content: yup.string().required('Content is required'),
        type: yup.string().required('Type is required'),
        imgUrl: yup
            .mixed()
            .required('A file is required')
            .test('fileSize', 'File too large', (value) => value && value.size <= FILE_SIZE)
            .test('fileFormat', 'Unsupported Format', (value) => value && SUPPORTED_FORMATS.includes(value.type)),
        thumbnailUrl: yup
            .mixed()
            .required('A file is required')
            .test('fileSize', 'File too large', (value) => value && value.size <= FILE_SIZE)
            .test('fileFormat', 'Unsupported Format', (value) => value && SUPPORTED_FORMATS.includes(value.type))
    });

    const handleFormSubmit = async (values) => {
        try {
            console.log(values);
            values.imgUrl = await uploadFile(values.imgUrl, 'create-news');
            values.thumbnailUrl = await uploadFile(values.thumbnailUrl, 'create-news');
            const response = await createNews(values);
            if (response.data.status === "Ok") {
                setOpen(true);
            }

        } catch (error) {
            console.error('Error submitting form:', error.message);
        }
    };

    const handleClose = () => {
        navigate('/home/news');
    };
    const modules = {
        toolbar: {
            container: '#toolbar',
        },
    };
    const formats = [
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'color',
        'background',
        'script',
        'header',
        'blockquote',
        'code-block',
        'indent',
        'list',
        'direction',
        'align',
        'link',
        'image',
        'video',
        'formula',
    ];
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
                        <h2 id="parent-modal-title">"Create News Successfully!"</h2>
                        <p id="parent-modal-description">New news have been add to DataBase!</p>
                        <Button color='secondary' style={{ fontSize: '0.9rem', fontWeight: 'bold' }} onClick={handleClose}>Close</Button>
                    </Box>
                </Modal>
            </div>
            <Box m="20px">
                <AdminHeader title="Create News" subtitle="Create a news content" />
                <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={userSchema}>
                    {({ values, errors, handleBlur, handleChange, handleSubmit, setFieldValue, touched }) => (
                        <form onSubmit={handleSubmit} >
                            <Box>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Title"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.title}
                                    error={!!touched.title && !!errors.title}
                                    helperText={touched.title && errors.title}
                                    name="title"
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="ShortDescription"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.shortDescription}
                                    error={!!touched.shortDescription && !!errors.shortDescription}
                                    helperText={touched.shortDescription && errors.shortDescription}
                                    name="shortDescription"
                                />
                                <Box mt={2} overflow="auto">
                                    <label htmlFor="content" style={{ marginLeft: '0.8vw' }}>
                                        Content
                                    </label>
                                    <Box border="1px solid #ced4da" borderRadius="4px">
                                        <CustomToolbar />
                                        <ReactQuill
                                            theme="snow"
                                            // value={editorContent}
                                            // onChange={handleEditorChange}
                                            value={values.content}
                                            onChange={(e) => {
                                                setFieldValue('content', e);
                                            }}
                                            modules={modules}
                                            formats={formats}
                                            style={{ height: '25vh' }}
                                        />
                                    </Box>
                                </Box>
                                <FormControl fullWidth variant="filled">
                                    <InputLabel id="type-label">Type</InputLabel>
                                    <Select
                                        labelId="type-label"
                                        id="type"
                                        value={values.type}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        label="Type"
                                        name="type"
                                        error={!!touched.type && !!errors.type}
                                    >
                                        {typeOptions.map((type) => (
                                            <MenuItem key={type} value={type}>
                                                {type}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {touched.type && errors.type && (
                                        <div style={{ color: 'red' }}>{errors.type}</div>
                                    )}
                                </FormControl>
                                <FormControl component="fieldset" >
                                    <Typography variant="h6" color={colors.grey[300]} sx={{ width: '100px', marginTop: "10px" }}>
                                        imgUrl
                                    </Typography>
                                    <Input
                                        type="file"
                                        label="imgUrl"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            setFieldValue('imgUrl', e.currentTarget.files[0]);
                                        }}
                                        name="imgUrl"
                                        error={!!touched.imgUrl && !!errors.imgUrl}
                                    />
                                    {touched.imgUrl && errors.imgUrl && (
                                        <div style={{ color: 'red' }}>{errors.imgUrl}</div>
                                    )}
                                </FormControl>

                                <FormControl component="fieldset">
                                    <Typography variant="h6" color={colors.grey[300]} sx={{ width: '100px', marginTop: "10px" }}>
                                        thumbnailUrl
                                    </Typography>
                                    <Input
                                        type="file"
                                        label="thumbnailUrl"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            setFieldValue('thumbnailUrl', e.currentTarget.files[0]);
                                        }}
                                        name="thumbnailUrl"
                                        error={!!touched.thumbnailUrl && !!errors.thumbnailUrl}
                                    />
                                    {touched.thumbnailUrl && errors.thumbnailUrl && (
                                        <div style={{ color: 'red' }}>{errors.thumbnailUrl}</div>
                                    )}
                                </FormControl>
                            </Box>

                            <Box display="flex" justifyContent="space-between" mt="20px">
                                <Button
                                    type="button"
                                    color="secondary"
                                    variant="contained"
                                    onClick={() => navigate('/home/news')}
                                >
                                    VIEW All NEWS
                                </Button>
                                <Button type="submit" color="secondary" variant="contained">
                                    CREATE NEWS
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </>
    );
}

export default NewsPostForm;