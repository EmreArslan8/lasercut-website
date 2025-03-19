'use client'

import { useState, useEffect } from "react";
import { CircularProgress, Box  } from "@mui/material";

const Loading = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (!isLoading) return null;

    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                backgroundColor: "rgba(255, 255, 255, 1)", // Yarı şeffaf arka plan
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999, // Öncelikli görünüm
            }}
        >
            <CircularProgress size={60} color="primary" />
        </Box>
    );
};

export default Loading;
