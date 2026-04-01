import React, { useState } from 'react';
import './index.css';
import { Dropzone } from './components/Dropzone';
import { CompressionProgress } from './components/CompressionProgress';
import { ResultsSummary } from './components/ResultsSummary';
import { compressImage, type CompressedResult } from './utils/compressor';

type AppState = 'IDLE' | 'COMPRESSING' | 'DONE';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppState>('IDLE');
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<CompressedResult[]>([]);
  const [quality] = useState(78); // Smart Standard
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFilesSelected = (newFiles: File[]) => {
    setFiles(newFiles);
    // Directly start compression for Zero-Config workflow
    startCompression(newFiles);
  };

  const startCompression = async (filesToCompress: File[]) => {
    setStatus('COMPRESSING');
    setResults([]);
    setCurrentIndex(0);

    const compressedFiles: CompressedResult[] = [];
    
    for (let i = 0; i < filesToCompress.length; i++) {
      setCurrentIndex(i + 1);
      try {
        const res = await compressImage(filesToCompress[i], quality);
        compressedFiles.push(res);
      } catch (err) {
        console.error('Failed to compress', filesToCompress[i].name, err);
      }
    }
    
    setResults(compressedFiles);
    setStatus('DONE');
  };

  const reset = () => {
    setFiles([]);
    setResults([]);
    setStatus('IDLE');
    setCurrentIndex(0);
  };

  return (
    <div className="container">
      <div className="glass-card">
        <header className="header">
          <h1>ShrinkIt</h1>
          <p>The ultimate image compression tool</p>
        </header>

        {status === 'IDLE' && (
          <Dropzone onFilesSelected={handleFilesSelected} />
        )}

        {status === 'COMPRESSING' && (
          <CompressionProgress 
            currentFile={files[currentIndex - 1]?.name || 'Processing...'}
            processedCount={currentIndex}
            totalCount={files.length}
          />
        )}

        {status === 'DONE' && (
          <ResultsSummary 
            results={results} 
            onRestart={reset} 
          />
        )}
      </div>

      <footer style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
        &copy; {new Date().getFullYear()} ShrinkIt • Built with React & Browser Image Compression
      </footer>
    </div>
  );
};

export default App;
