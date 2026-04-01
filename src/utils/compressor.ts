import imageCompression from 'browser-image-compression';

export interface CompressedResult {
  originalFile: File;
  compressedBlob: Blob;
  originalSize: number;
  compressedSize: number;
  relativePath: string;
}

export const compressImage = async (
  file: File,
  quality: number,
  onProgress?: (progress: number) => void
): Promise<CompressedResult> => {
  // webkitRelativePath contains the folder structure if uploaded via a folder input
  const relativePath = (file as any).webkitRelativePath || file.name;

  // browser-image-compression options
  const options = {
    maxSizeMB: 10, // heuristic upper bound
    maxWidthOrHeight: 4096, // keep decent resolution
    useWebWorker: true,
    initialQuality: quality / 100, // translate 25-90 to 0.25-0.9
    onProgress: onProgress,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    
    return {
      originalFile: file,
      compressedBlob: compressedFile,
      originalSize: file.size,
      compressedSize: compressedFile.size,
      relativePath: relativePath,
    };
  } catch (error) {
    console.error('Compression failed for', file.name, error);
    // If it fails (some images are already tiny or unsupported), return original
    return {
      originalFile: file,
      compressedBlob: file,
      originalSize: file.size,
      compressedSize: file.size,
      relativePath: relativePath,
    };
  }
};

export const formatSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
