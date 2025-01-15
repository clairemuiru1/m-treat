import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Box, Avatar } from "@mui/material";
import axios from "axios";

const ProfilePage = () => {
  const [profile, setProfile] = useState({});
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    // Fetch profile data after login
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8000/login/validate/");
        setProfile(response.data);
      } catch (error) {
        alert("Error fetching profile: " + error.response.data.message);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await axios.put("http://localhost:8000/api/profile/", profile);
      alert("Profile updated successfully!");
      setEditable(false);
    } catch (error) {
      alert("Error updating profile: " + error.response.data.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
          {profile.name?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant="h5">{profile.name}</Typography>
      </Box>
      <TextField
        fullWidth
        label="Name"
        name="name"
        value={profile.name || ""}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        // disabled={!editable}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Phone"
        name="phone"
        value={profile.phone || ""}
        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
        // disabled={!editable}
        margin="normal"
      />
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
