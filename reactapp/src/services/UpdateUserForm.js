import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const UpdateUserForm = () => {
    const [oldUsername, setOldUsername] = useState('');
    const [oldEmail, setOldEmail] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    const handleUpdateUser = async (event) => {
        event.preventDefault();
        
        const updatedUserData = {
            oldUsername,
            oldEmail,
            newUsername,
            newEmail,
        };
        const apiUrl = 'http://localhost:5056/api/experts/update';
        try {
            // request
            const response = await fetch(apiUrl, {
                method: 'PUT', // Use the PUT method for updates
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUserData),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                console.log('User updated:', updatedUser);
                setResponseMessage('User updated successfully!');
                setSeverity('success');
            } else {
                const errorData = await response.json();
                console.error('Failed to update user:', errorData);
                setResponseMessage('Failed to update user: ' + errorData.message);
                setSeverity('error');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            setResponseMessage('Error updating user: ' + error.message);
            setSeverity('error');
        }
        setOpenSnackbar(true);

        setOldUsername('');
        setOldEmail('');
        setNewUsername('');
        setNewEmail('');
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <div>
            <Box component="form" onSubmit={handleUpdateUser} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    required
                    id="old-username"
                    label="Old Username"
                    variant="outlined"
                    value={oldUsername}
                    onChange={(e) => setOldUsername(e.target.value)}
                />
                <TextField
                    required
                    id="old-email"
                    label="Old Email"
                    variant="outlined"
                    type="email"
                    value={oldEmail}
                    onChange={(e) => setOldEmail(e.target.value)}
                />
                <TextField
                    required
                    id="new-username"
                    label="New Username"
                    variant="outlined"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                />
                <TextField
                    required
                    id="new-email"
                    label="New Email"
                    variant="outlined"
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary">
                    Update
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

export default UpdateUserForm;
