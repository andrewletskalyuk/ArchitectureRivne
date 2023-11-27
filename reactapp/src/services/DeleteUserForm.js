import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const DeleteUserForm = () => {
    const [email, setEmail] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    const handleDeleteUser = async (event) => {
        event.preventDefault();

        const apiUrl = 'http://localhost:5056/api/experts/delete'; 
        try {
            // Request
            const response = await fetch(apiUrl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                const result = await response.json();
                if (result.message === "Expert was not found") {
                    setResponseMessage('Expert was not found'); // Set the specific message
                    setSeverity('error');
                } else {
                    setResponseMessage('User deleted successfully!');
                    setSeverity('success');
                }
            } else {
                const errorData = await response.json();
                console.error('Failed to delete user:', errorData);
                setResponseMessage('Failed to delete user: ' + errorData.message);
                setSeverity('error');
            }

        } catch (error) {
            console.error('Error deleting user:', error);
            setResponseMessage('Error deleting user: ' + error.message);
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
            <Box component="form" onSubmit={handleDeleteUser} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    required
                    id="email"
                    label="Email"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="submit" variant="contained" color="secondary">
                    Delete
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

export default DeleteUserForm;
