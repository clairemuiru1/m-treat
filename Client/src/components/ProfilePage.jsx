import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
  InputAdornment,
} from "@mui/material";
import { Phone, Cake, LocationOn } from "@mui/icons-material";
import axios from "axios";

const ProfilePage = () => {
  const [user, setProfile] = useState({
    username: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    address: "",
  });
  const [editable, setEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8000/fetch/user");
        console.log(response.data);
        setProfile(response.data.user_data || {}); // Fallback to an empty object
      } catch (error) {
        alert("Error fetching profile: " + (error.response?.data?.message || error.message));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      await axios.put("http://localhost:8000/update/profile", {
        phone_number: user.phone_number,
        date_of_birth: user.date_of_birth,
        address: user.address,
      });
      alert("Profile updated successfully!");
      setEditable(false);
    } catch (error) {
      alert("Error updating profile: " + (error.response?.data?.message || error.message));
    }
  };

  if (isLoading) {
    return <Typography>Loading profile...</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
      {/* Avatar and Name */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
          {user.username?.charAt(0).toUpperCase() || "U"}
        </Avatar>
        <Typography variant="h5">{user.username || "User"}</Typography>
      </Box>

      {/* Phone Number (Editable) */}
      <TextField
        fullWidth
        label="Phone Number"
        name="phone_number"
        value={user.phone_number || ""}
        onChange={(e) => setProfile({ ...user, phone_number: e.target.value })}
        InputProps={{
          // readOnly: !editable,
          startAdornment: (
            <InputAdornment position="start">
              <Phone />
            </InputAdornment>
          ),
        }}
        margin="normal"
      />

      {/* Date of Birth (Editable) */}
      <TextField
        fullWidth
        label="Date of Birth"
        name="date_of_birth"
        type="date"
        value={user.date_of_birth || ""}
        onChange={(e) => setProfile({ ...user, date_of_birth: e.target.value })}
        InputProps={{
          // readOnly: !editable,
          startAdornment: (
            <InputAdornment position="start">
              <Cake />
            </InputAdornment>
          ),
        }}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />

      {/* Address (Editable) */}
      <TextField
        fullWidth
        label="Address"
        name="address"
        value={user.address || ""}
        onChange={(e) => setProfile({ ...user, address: e.target.value })}
        InputProps={{
          // readOnly: !editable,
          startAdornment: (
            <InputAdornment position="start">
              <LocationOn />
            </InputAdornment>
          ),
        }}
        margin="normal"
      />

      {/* Buttons */}
      {editable ? (
        <Button variant="contained" onClick={handleUpdate} sx={{ mt: 2 }}>
          Save Changes
        </Button>
      ) : (
        <Button variant="outlined" onClick={() => setEditable(true)} sx={{ mt: 2 }}>
          Edit Profile
        </Button>
      )}
    </Box>
  );
};

export default ProfilePage;
