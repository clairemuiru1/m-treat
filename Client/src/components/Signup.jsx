import React, { useState } from "react";
import { TextField, Button, Typography, Box, InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Material-UI Icons
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LockIcon from "@mui/icons-material/Lock";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    address: "",
    date_of_birth: "",
    password: "",
  });

  const navigate = useNavigate(); // For navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/signup/validate", formData);
      alert("Registration Successful!");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      alert("Error during registration: " + (error.response?.data?.message || "Unknown error"));
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Patient Registration
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          margin="normal"
          value={formData.name}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          margin="normal"
          value={formData.email}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Phone Number"
          name="phone_number"
          margin="normal"
          value={formData.phone_number}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Address"
          name="address"
          margin="normal"
          value={formData.address}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <HomeIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          type="date"
          label="Date of Birth"
          name="date_of_birth"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={formData.date_of_birth}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarTodayIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          name="password"
          margin="normal"
          value={formData.password}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Signup;
