import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#111827', // gray-900 from Tailwind
            paper: '#1F2937',   // gray-800 from Tailwind
        },
        primary: {
            main: '#3b82f6', // blue-500 from Tailwind
        },
        text: {
            primary: '#F3F4F6', // gray-100
            secondary: '#9CA3AF', // gray-400
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        display: 'block',
        h1: {
            fontWeight: 700,
            fontSize: '1.75rem', // Mobile default (smaller)
            '@media (min-width:600px)': {
                fontSize: '2.25rem', // Desktop
            },
            wordBreak: 'break-word',
        },
        h2: {
            fontWeight: 600,
            fontSize: '1.5rem', // Mobile default
            '@media (min-width:600px)': {
                fontSize: '1.875rem', // Desktop
            },
            wordBreak: 'break-word',
        },
        h3: {
            fontWeight: 600,
            fontSize: '1.25rem', // Mobile default
            '@media (min-width:600px)': {
                fontSize: '1.5rem', // Desktop
            },
            wordBreak: 'break-word',
        },
        body1: {
            fontSize: '0.95rem', // Slightly smaller on mobile
            lineHeight: 1.6,
            '@media (min-width:600px)': {
                fontSize: '1rem',
                lineHeight: 1.7,
            },
        },
        h4: {
            fontWeight: 700,
            fontSize: '1.5rem', // Mobile
            '@media (min-width:600px)': {
                fontSize: '2.125rem', // Desktop
            },
            wordBreak: 'break-word',
        },
        h5: {
            fontWeight: 600,
            fontSize: '1.25rem', // Mobile
            '@media (min-width:600px)': {
                fontSize: '1.5rem', // Desktop
            },
            wordBreak: 'break-word',
        },
        h6: {
            fontWeight: 600,
            fontSize: '1.1rem', // Mobile
            '@media (min-width:600px)': {
                fontSize: '1.25rem', // Desktop
            },
            wordBreak: 'break-word',
        },
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    scrollbarColor: "#6b7280 #1f2937",
                    "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                        backgroundColor: "#1f2937",
                        width: '8px',
                    },
                    "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                        borderRadius: 8,
                        backgroundColor: "#6b7280",
                        minHeight: 24,
                        border: "2px solid #1f2937",
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
    },
});

export default theme;
