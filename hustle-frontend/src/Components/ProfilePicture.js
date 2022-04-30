import React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const ProfilePicture = ({ profile }) => {
    return (
        <Avatar
            alt="Remy Sharp"
            src={profile}
            sx={{ width: 40, height: 40 }}
        />
    )
}

export default ProfilePicture