import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

export const getBasePath = () => path.dirname(fileURLToPath(import.meta.url));

export const findFile = async (directoryName, fileName) => {
  try {
    const __dirname = getBasePath();
    const files = await fs.readdir(path.join(__dirname, '..', 'uploads', directoryName));
    const foundFile = files.find(file => file === fileName);
    return foundFile ? path.join(directoryName, foundFile) : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}