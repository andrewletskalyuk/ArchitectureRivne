import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import './HomeStyle.scss';

const Home = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    const handleCreateUser = async (event) => {
        event.preventDefault();
        const expertData = {
            username, 
            email
        };

        const apiUrl = 'http://localhost:5056/api/experts';
        try {
            // Perform the POST request to the server
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(expertData)
            });

            // Check if the request was successful
            if (response.ok) {
                const createdExpert = await response.json();
                console.log('Expert created:', createdExpert);
                setResponseMessage('User created successfully!');
                setSeverity('success');
            } else {
                // Handle errors if the server response wasn't ok
                const errorData = await response.json();
                console.error('Failed to create expert:', errorData);
                setResponseMessage('Failed to create user: ' + errorData.message);
                setSeverity('error');
            }
        } catch (error) {
            // Handle network errors or other unexpected issues
            console.error('Error creating expert:', error);
            setResponseMessage('Error creating user: ' + error.message);
            setSeverity('error');
        }
        setOpenSnackbar(true);

        // Reset fields
        setUsername('');
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
            <main>
                <ol className="gradient-list">
                    <li>
                        <p>Create New User in DB (PostgreSQL) with validation on UI side</p>
                        <div className="home-container">
                            <Box component="form" onSubmit={handleCreateUser} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <TextField
                                    required
                                    id="username"
                                    label="Username"
                                    variant="outlined"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
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
                                    Create
                                </Button>
                            </Box>
                            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                                <Alert onClose={handleCloseSnackbar} severity={severity} sx={{ width: '100%' }}>
                                    {responseMessage}
                                </Alert>
                            </Snackbar>
                        </div>
                    </li>
                    <li>Aenean tincidunt elit at ipsum cursus, vitae interdum nulla suscipit.</li>
                    <li>Curabitur in orci vel risus facilisis accumsan.</li>
                    <li>Morbi eleifend tortor lacinia sapien sagittis, quis pellentesque felis egestas.</li>
                    <li>Aenean viverra dui quis leo lacinia fringilla.</li>
                    <li>Sed varius lectus ac condimentum egestas.</li>
                </ol>
            </main>
        </div>
    );
};

export default Home;