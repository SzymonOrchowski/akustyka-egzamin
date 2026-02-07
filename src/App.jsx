import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import MarkdownViewer from './components/MarkdownViewer';
import Home from './components/Home';
import contentData from './data/content.json';
import theme from './theme';

function App() {
  const [files, setFiles] = useState(contentData);
  const [selectedFile, setSelectedFile] = useState(null); // Null means Home Screen

  const currentIndex = files.findIndex(f => f.id === selectedFile?.id);
  const hasNext = currentIndex < files.length - 1;
  const hasPrev = currentIndex > 0;

  const handleNext = () => {
    if (hasNext) {
      setSelectedFile(files[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (hasPrev) {
      setSelectedFile(files[currentIndex - 1]);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', bgcolor: 'background.default' }}>

        <Box component="main" sx={{ flexGrow: 1, height: '100%', position: 'relative', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {selectedFile ? (
            <MarkdownViewer
              file={selectedFile}
              onNext={handleNext}
              onPrev={handlePrev}
              hasNext={hasNext}
              hasPrev={hasPrev}
              onBack={() => setSelectedFile(null)}
            />
          ) : (
            <Box sx={{ height: '100%', overflow: 'hidden', position: 'relative' }}>
              <Home
                files={files}
                onSelectFile={setSelectedFile}
              />
            </Box>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
