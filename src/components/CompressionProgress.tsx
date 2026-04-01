import { Zap } from 'lucide-react';

interface ProgressProps {
  currentFile: string;
  processedCount: number;
  totalCount: number;
}

export const CompressionProgress: React.FC<ProgressProps> = ({ 
  currentFile, 
  processedCount, 
  totalCount 
}) => {
  const percentage = Math.round((processedCount / totalCount) * 100);

  return (
    <div className="progress-card">
      <div className="progress-header">
        <div>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <Zap size={24} color="var(--primary)" fill="var(--primary)" /> Smart Auto-Optimizing
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Processing {processedCount} of {totalCount} images...
          </p>
        </div>
      </div>

      <div className="progress-container">
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: `${percentage}%` }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
          <span>{percentage}% Complete</span>
          <span style={{ fontWeight: 600, color: 'var(--text)' }}>Est. Savings: ~65%</span>
        </div>
      </div>

      <div className="current-file-box">
        <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--primary)', fontWeight: 800, marginBottom: '0.25rem' }}>
          Current File
        </div>
        <div className="file-name" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {currentFile}
        </div>
      </div>
    </div>
  );
};
