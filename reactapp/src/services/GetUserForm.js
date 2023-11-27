import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const GetUserForm = () => {
    const [email, setEmail] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    const handleGetUser = async (event) => {
        event.preventDefault();

        const encodedEmail = encodeURIComponent(email);
        const apiUrl = `http://localhost:5056/api/experts/${encodedEmail}`; 
        try {
            // Request
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },          
            });

            if (response.ok) {
                const userData = await response.json();
                setResponseMessage(`User retrieved successfully! Username: ${userData.username}, Email: ${userData.email}`);
                setSeverity('success');
            } else {
                const errorData = await response.json();
                console.error('Failed to retrieve user:', errorData);
                setResponseMessage('Failed to retrieve user: ' + errorData.message);
                setSeverity('error');
            }

        } catch (error) {
            console.error('Error retrieving user:', error);
            setResponseMessage('Error retrieving user: ' + error.message);
            setSeverity('error');
        }
        setOpenSnackbar(true);

        setEmail('');
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <div>
            <Box component="form" onSubmit={handleGetUser} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    required
                    id="email"
                    label="Email"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary">
                    Get User
                </Button>
            </Box>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={severity} sx={{ width: '100%' }}>
                    {responseMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default GetUserForm;
