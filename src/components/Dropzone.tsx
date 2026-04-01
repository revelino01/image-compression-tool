import React, { useRef } from 'react';
import { Upload, Folder } from 'lucide-react';

interface DropzoneProps {
  onFilesSelected: (files: File[]) => void;
}

export const Dropzone: React.FC<DropzoneProps> = ({ onFilesSelected }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
      onFilesSelected(files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).filter(f => f.type.startsWith('image/'));
      onFilesSelected(files);
    }
  };

  return (
    <div 
      className="dropzone"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <Upload className="dropzone-icon" />
      <div className="dropzone-text">
        <h2 style={{ marginBottom: '0.5rem' }}>Drop your images here</h2>
        <p style={{ color: 'var(--text-muted)' }}>Files or entire folders supported</p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button 
          className="btn btn-secondary"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload size={18} /> Select Files
        </button>
        <button 
          className="btn btn-secondary"
          onClick={() => folderInputRef.current?.click()}
        >
          <Folder size={18} /> Select Folder
        </button>
      </div>

      <input 
        type="file" 
        multiple 
        accept="image/*" 
        className="hidden" 
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <input 
        type="file" 
        multiple 
        {...{ webkitdirectory: "", directory: "" }}
        className="hidden" 
        ref={folderInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
};
