import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import SearchIcon from '@mui/icons-material/Search';

const Home = ({ files, onSelectFile }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredFiles = files.filter(file =>
        file.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box sx={{ height: '100%', overflowY: 'auto', py: { xs: 4, md: 8 } }}>
            <Container maxWidth="lg">
                <Typography
                    variant="h3"
                    component="h1"
                    fontWeight="bold"
                    sx={{
                        mb: 1,
                        background: 'linear-gradient(to right, #60a5fa, #a855f7)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}
                >
                    Akustyka Egzamin
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Zbiór notatek przygotowujących do egzaminu. Wybierz temat z listy poniżej.
                </Typography>

                {/* Search Bar */}
                <Box sx={{ mb: 4 }}>
                    <TextField
                        fullWidth
                        placeholder="Szukaj w notatkach..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon color="action" />
                                    </InputAdornment>
                                ),
                                sx: {
                                    bgcolor: 'background.paper',
                                    borderRadius: 3,
                                    fontSize: '1.125rem',
                                    boxShadow: 3,
                                    '&.Mui-focused': {
                                        boxShadow: 6,
                                    }
                                }
                            }
                        }}
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-notchedOutline': { border: '1px solid rgba(255, 255, 255, 0.12)' }
                        }}
                    />
                </Box>

                {/* Topics List */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {filteredFiles.map((file) => (
                        <Card
                            key={file.id}
                            elevation={2}
                            sx={{
                                bgcolor: 'background.paper',
                                borderRadius: 3,
                                border: '1px solid',
                                borderColor: 'divider',
                                transition: 'all 0.2s',
                                '&:hover': {
                                    borderColor: 'primary.main',
                                    transform: 'translateY(-2px)',
                                    boxShadow: 6
                                }
                            }}
                        >
                            <CardActionArea
                                onClick={() => onSelectFile(file)}
                                sx={{ p: 2, display: 'block', textAlign: 'left' }}
                            >
                                <Typography
                                    variant="h6"
                                    component="h3"
                                    color="text.primary"
                                    fontWeight="bold"
                                    sx={{ mb: 1 }}
                                >
                                    {file.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        display: '-webkit-box',
                                        overflow: 'hidden',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 2,
                                    }}
                                >
                                    {/* Preview snippet */}
                                    {file.content.replace(/#/g, '').replace(/\*/g, '').substring(0, 150)}...
                                </Typography>
                            </CardActionArea>
                        </Card>
                    ))}

                    {filteredFiles.length === 0 && (
                        <Box sx={{ textAlign: 'center', py: 6 }}>
                            <Typography color="text.secondary">
                                Nie znaleziono notatek pasujących do wyszukiwania "{searchQuery}"
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Container>
        </Box>
    );
};

export default Home;
