import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import type { CompressedResult } from './compressor';

export const generateZip = async (
  results: CompressedResult[],
  onZipProgress?: (progress: number) => void
): Promise<void> => {
  try {
    const zip = new JSZip();

    results.forEach((item) => {
      const cleanPath = item.relativePath.startsWith('/') ? item.relativePath.substring(1) : item.relativePath;
      zip.file(cleanPath, item.compressedBlob);
    });

    const content = await zip.generateAsync(
      { type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 9 } },
      (metadata) => {
        if (onZipProgress) onZipProgress(metadata.percent);
      }
    );

    // Create a new Blob to ensure the MIME type is strictly application/zip
    const finalBlob = new Blob([content], { type: 'application/zip' });
    
    // Use file-saver's saveAs which is more robust than manual anchor clicks
    saveAs(finalBlob, 'compressed_images.zip');
    
    console.log('Download triggered successfully');
  } catch (error) {
    console.error('ZIP generation failed:', error);
    throw error;
  }
};
