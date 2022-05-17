import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const SkeltonLoadinAnimation = () => {
    return (
        <Box  sx={{ p: 5, pt: 2 }} >
            <Skeleton sx={{height: "2.5rem"}} animation="pulse" />
            <Skeleton sx={{height: "2.5rem"}} animation="pulse" />
            <Skeleton sx={{height: "2.5rem"}} animation="pulse" />
            <Skeleton sx={{height: "2.5rem"}} animation="pulse" />
            <Skeleton sx={{height: "2.5rem"}} animation="pulse" />
            <Skeleton sx={{height: "2.5rem"}} animation="pulse" />
            <Skeleton sx={{height: "2.5rem"}} animation="pulse" />
        </Box>
    );
}

export default SkeltonLoadinAnimation;