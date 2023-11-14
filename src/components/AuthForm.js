// AuthForm.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Updated import
import { Container, Paper, TextField, Button, Box } from "@material-ui/core";

const AuthForm = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [credentials, setCredentials] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, let's simulate successful login/register with a redirect.

    if (credentials.username === 'admin' && credentials.password === 'admin') {
      // If credentials match, navigate to the homepage
      navigate('/homepage');
    } else {
      // If credentials do not match, alert the user
      alert('Invalid username or password');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        height="100vh"
      >
        <Paper
          elevation={6}
          style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}
        >
          <Box display="flex" justifyContent="center" mb={2}>
            <Button
              onClick={() => setIsLogin(true)}
              color={isLogin ? "primary" : "default"}
            >
              Login
            </Button>
            <Button
              onClick={() => setIsLogin(false)}
              color={!isLogin ? "primary" : "default"}
            >
              Register
            </Button>
          </Box>
          <form onSubmit={handleSubmit} noValidate>
            {!isLogin && (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={credentials.email}
                onChange={handleInputChange}
              />
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={credentials.username}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: "24px" }}
            >
              {isLogin ? "Login" : "Register"}
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default AuthForm;
