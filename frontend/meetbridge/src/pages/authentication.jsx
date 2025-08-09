import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from '@mui/material';

const defaultTheme = createTheme();

export default function Authentication() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [error, setError] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [formState, setFormState] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    const handleAuth = async () => {
        try {
            if (formState === 0) {
                await handleLogin(username, password);
            } else {
                const result = await handleRegister(name, username, password);
                setUsername("");
                setPassword("");
                setName("");
                setMessage(result);
                setOpen(true);
                setError("");
                setFormState(0);
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || "An unexpected error occurred.";
            setError(errorMessage);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            {/* 1. Add centering properties to the main Grid container */}
            <Grid
                container
                component="main"
                sx={{ height: '100vh' }}
                justifyContent="center"
                alignItems="center"
                style={{ backgroundColor: '#f0f2f5' }} // Optional: Add a light background color
            >
                <CssBaseline />
                {/* 2. The Grid item for the background image has been removed. */}

                {/* 3. This Grid item now holds the centered form */}
                <Grid
                    item
                    xs={11}
                    sm={8}
                    md={5}
                    lg={4}
                    component={Paper}
                    elevation={6}
                    square
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        p: 4, // Use padding for internal spacing
                        borderRadius: 2, // Add rounded corners
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Box sx={{ mb: 2 }}>
                        <Button
                            variant={formState === 0 ? "contained" : "outlined"}
                            onClick={() => setFormState(0)}
                            sx={{ mr: 1 }}
                        >
                            Sign In
                        </Button>
                        <Button
                            variant={formState === 1 ? "contained" : "outlined"}
                            onClick={() => setFormState(1)}
                        >
                            Sign Up
                        </Button>
                    </Box>

                    <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
                        {formState === 1 && (
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Full Name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoFocus
                            />
                        )}

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                            autoFocus={formState === 0}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            value={password}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            autoComplete="current-password"
                        />

                        {error && (
                            <p style={{ color: "red", textAlign: 'center', marginTop: '8px' }}>{error}</p>
                        )}

                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleAuth}
                        >
                            {formState === 0 ? "Login" : "Register"}
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={() => setOpen(false)}
                message={message}
            />
        </ThemeProvider>
    );
}
