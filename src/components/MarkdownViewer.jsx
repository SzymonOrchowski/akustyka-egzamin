import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'katex/dist/katex.min.css';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';

const ImageRenderer = (props) => {
    const [loading, setLoading] = useState(true);

    return (
        <Box sx={{ my: 4, display: 'flex', justifyContent: 'center' }}>
            <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.paper', maxWidth: '100%', position: 'relative', minHeight: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {loading && (
                    <Box sx={{ position: 'absolute', zIndex: 1 }}>
                        <CircularProgress size={30} color="primary" />
                    </Box>
                )}
                <Box
                    component="img"
                    sx={{
                        maxWidth: '100%',
                        height: 'auto',
                        maxHeight: 500,
                        opacity: loading ? 0 : 1,
                        transition: 'opacity 0.3s ease-in-out',
                        display: 'block'
                    }}
                    onLoad={() => setLoading(false)}
                    {...props}
                />
            </Paper>
        </Box>
    );
};

const MarkdownViewer = ({ file, onNext, onPrev, hasNext, hasPrev, onToggleSidebar, onBack }) => {
    const scrollRef = useRef(null);
    const theme = useTheme();

    // Scroll to top when file changes
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo(0, 0);
        }
    }, [file.id]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: 'background.default' }}>

            {/* Top Navigation Bar */}
            <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'background.default', borderBottom: 1, borderColor: 'divider' }}>
                <Toolbar>

                    <Button
                        startIcon={<ChevronLeftIcon />}
                        onClick={onBack}
                        sx={{ color: 'text.secondary', mr: 2, display: { xs: 'none', sm: 'flex' } }}
                    >
                        Wróć
                    </Button>
                    <IconButton
                        onClick={onBack}
                        sx={{ color: 'text.secondary', mr: 1, display: { xs: 'flex', sm: 'none' } }}
                    >
                        <ChevronLeftIcon />
                    </IconButton>

                    <Typography variant="subtitle1" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 500, color: 'text.primary' }}>
                        {file.title}
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Content Area */}
            <Box
                ref={scrollRef}
                sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    px: { xs: 1, md: 2 },
                    py: { xs: 2, md: 4 },
                    width: '100%',
                    minWidth: 0
                }}
            >
                <Container maxWidth="lg" disableGutters>
                    <Box sx={{ color: 'text.primary' }}>
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm, remarkMath]}
                            rehypePlugins={[rehypeKatex, rehypeSlug]}
                            components={{
                                code({ node, inline, className, children, ...props }) {
                                    const match = /language-(\w+)/.exec(className || '')
                                    return !inline && match ? (
                                        <Box sx={{ my: 3, borderRadius: 2, overflow: 'hidden' }}>
                                            <SyntaxHighlighter
                                                {...props}
                                                style={vscDarkPlus}
                                                language={match[1]}
                                                PreTag="div"
                                            >
                                                {String(children).replace(/\n$/, '')}
                                            </SyntaxHighlighter>
                                        </Box>
                                    ) : (
                                        <Box component="code" sx={{
                                            bgcolor: 'action.hover',
                                            color: 'primary.light',
                                            px: 0.6,
                                            py: 0.2,
                                            borderRadius: 1,
                                            fontFamily: 'monospace',
                                            fontSize: '0.875em'
                                        }} {...props}>
                                            {children}
                                        </Box>
                                    )
                                },
                                h1: ({ node, ...props }) => (
                                    <Typography
                                        variant="h4"
                                        component="h1"
                                        sx={{
                                            mt: 4,
                                            mb: 3,
                                            pb: 2,
                                            fontWeight: 700,
                                            borderBottom: 2,
                                            borderColor: 'text.secondary'
                                        }}
                                        {...props}
                                    />
                                ),
                                h2: ({ node, ...props }) => (
                                    <Typography
                                        variant="h5"
                                        component="h2"
                                        sx={{
                                            mt: 6,
                                            mb: 2,
                                            pb: 1,
                                            fontWeight: 600,
                                            borderBottom: 1,
                                            borderColor: 'divider'
                                        }}
                                        {...props}
                                    />
                                ),
                                h3: ({ node, ...props }) => (
                                    <Typography variant="h6" component="h3" sx={{ mt: 4, mb: 2, fontWeight: 600 }} {...props} />
                                ),
                                p: ({ node, ...props }) => (
                                    <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 2 }} {...props} />
                                ),
                                ul: ({ node, ...props }) => (
                                    <Box component="ul" sx={{ pl: 4, mb: 2, listStyleType: 'disc' }} {...props} />
                                ),
                                ol: ({ node, ...props }) => (
                                    <Box component="ol" sx={{ pl: 4, mb: 2, listStyleType: 'decimal' }} {...props} />
                                ),
                                li: ({ node, ...props }) => (
                                    <Box component="li" sx={{ mb: 1, typography: 'body1' }}>
                                        <Typography component="span" variant="body1">{props.children}</Typography>
                                    </Box>
                                ),
                                a: ({ node, ...props }) => (
                                    <Typography
                                        component="a"
                                        variant="body1"
                                        sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                                        {...props}
                                    />
                                ),
                                blockquote: ({ node, ...props }) => (
                                    <Box
                                        component="blockquote"
                                        sx={{
                                            borderLeft: 4,
                                            borderColor: 'primary.main',
                                            pl: 2,
                                            py: 1,
                                            my: 3,
                                            bgcolor: 'action.hover',
                                            borderRadius: 1
                                        }}
                                        {...props}
                                    />
                                ),
                                img: ({ node, ...props }) => (
                                    <ImageRenderer {...props} />
                                ),
                                table: ({ node, ...props }) => (
                                    <Box sx={{ overflowX: 'auto', my: 4, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                                        <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', '& th, & td': { p: 1.5, borderBottom: 1, borderColor: 'divider', textAlign: 'left' } }} {...props} />
                                    </Box>
                                ),
                                hr: ({ node, ...props }) => (
                                    <Divider sx={{ my: 6, borderBottomWidth: 2 }} {...props} />
                                )
                            }}
                        >
                            {file.content}
                        </ReactMarkdown>
                    </Box>

                    {/* Navigation Footer */}
                    <Box sx={{ mt: 8, pt: 4, borderTop: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between' }}>
                        {hasPrev ? (
                            <Button
                                startIcon={<ChevronLeftIcon />}
                                onClick={onPrev}
                                color="inherit"
                                sx={{ color: 'text.secondary' }}
                            >
                                Poprzedni
                            </Button>
                        ) : (
                            <Box />
                        )}

                        {hasNext && (
                            <Button
                                endIcon={<ChevronRightIcon />}
                                onClick={onNext}
                                color="inherit"
                                sx={{ color: 'text.secondary' }}
                            >
                                Następny
                            </Button>
                        )}
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default MarkdownViewer;
