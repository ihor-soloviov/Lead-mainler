import { readFile } from 'fs/promises';

export const convertFileToBase64 = async (filePath) => {
  try {
    const fileBuffer = await readFile(filePath);
    return fileBuffer.toString('base64');
  } catch (error) {
    console.error('Error converting file to Base64:', error);
    throw error;
  }
}