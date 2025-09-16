import { useRef, useCallback, useState } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

export const useFFmpeg = () => {
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadFFmpeg = useCallback(async () => {
    if (ffmpegRef.current || isLoading) return;
    
    setIsLoading(true);
    try {
      const ffmpeg = new FFmpeg();
      ffmpegRef.current = ffmpeg;

      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
      
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      });

      setIsLoaded(true);
    } catch (error) {
      console.error('Failed to load FFmpeg:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const convertVideo = useCallback(async (
    file: File,
    outputFormat: string,
    onProgress?: (progress: number) => void
  ): Promise<Blob | null> => {
    if (!ffmpegRef.current || !isLoaded) {
      throw new Error('FFmpeg not loaded');
    }

    const ffmpeg = ffmpegRef.current;
    const inputName = `input.${file.name.split('.').pop()}`;
    const outputName = `output.${outputFormat}`;

    try {
      // Write input file to FFmpeg FS
      await ffmpeg.writeFile(inputName, await fetchFile(file));

      // Set up progress callback
      ffmpeg.on('progress', ({ progress }) => {
        onProgress?.(Math.round(progress * 100));
      });

      // Execute conversion
      await ffmpeg.exec(['-i', inputName, '-c:v', 'libx264', '-c:a', 'aac', outputName]);

      // Read the output file
      const data = await ffmpeg.readFile(outputName);
      
      // Clean up
      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile(outputName);

      // Return as blob
      return new Blob([data], { type: `video/${outputFormat}` });
    } catch (error) {
      console.error('Conversion failed:', error);
      return null;
    }
  }, [isLoaded]);

  return {
    loadFFmpeg,
    convertVideo,
    isLoaded,
    isLoading
  };
};