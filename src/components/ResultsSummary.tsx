import React, { useState } from 'react';
import { Download, CheckCircle2, RotateCcw } from 'lucide-react';
import type { CompressedResult } from '../utils/compressor';
import { formatSize } from '../utils/compressor';
import { generateZip } from '../utils/zipGenerator';

interface ResultsSummaryProps {
  results: CompressedResult[];
  onRestart: () => void;
}

export const ResultsSummary: React.FC<ResultsSummaryProps> = ({ 
  results, 
  onRestart 
}) => {
  const [downloading, setDownloading] = useState(false);
  const [zipProgress, setZipProgress] = useState(0);

  const totalOriginal = results.reduce((acc, r) => acc + r.originalSize, 0);
  const totalCompressed = results.reduce((acc, r) => acc + r.compressedSize, 0);
  const totalSavings = totalOriginal - totalCompressed;
  const savingsPercent = Math.round((totalSavings / totalOriginal) * 100);

  const handleDownload = async () => {
    setDownloading(true);
    setZipProgress(0);
    try {
      await generateZip(results, (progress) => {
        setZipProgress(Math.round(progress));
      });
    } catch (error) {
      console.error('Failed to generate ZIP', error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="results-summary">
      <div className="results-header">
        <div>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <CheckCircle2 color="var(--success)" /> Compression Done!
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>{results.length} images processed successfully</p>
        </div>
        <div className="savings-badge">
          -{savingsPercent}% Saved
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Original Total</div>
          <div className="stat-value">{formatSize(totalOriginal)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Saved</div>
          <div className="stat-value" style={{ color: 'var(--success)' }}>{formatSize(totalSavings)}</div>
        </div>
        <div className="stat-card" style={{ gridColumn: 'span 2' }}>
          <div className="stat-label">Final Download Size</div>
          <div className="stat-value">{formatSize(totalCompressed)}</div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button 
            className="btn" 
            style={{ flex: 2 }} 
            onClick={handleDownload} 
            disabled={downloading}
          >
            {downloading ? (
              <>Generating ZIP ({zipProgress}%)...</>
            ) : (
              <>
                <Download size={18} /> Download All (ZIP)
              </>
            )}
          </button>
          
          {!downloading && (
            <button className="btn btn-secondary" onClick={onRestart}>
              <RotateCcw size={18} /> Start New
            </button>
          )}
        </div>
      </div>

      <div className="file-list">
        {results.slice(0, 10).map((res, index) => (
          <div className="file-item" key={index}>
            <div className="file-name" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%' }}>
              {res.relativePath}
            </div>
            <div className="file-status" style={{ fontSize: '0.75rem' }}>
              {formatSize(res.compressedSize)} 
              <span style={{ color: 'var(--text-muted)', marginLeft: '0.5rem' }}>(-{Math.round((res.originalSize - res.compressedSize) / res.originalSize * 100)}%)</span>
            </div>
          </div>
        ))}
        {results.length > 10 && (
          <div style={{ textAlign: 'center', padding: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            + {results.length - 10} more files
          </div>
        )}
      </div>
    </div>
  );
};
