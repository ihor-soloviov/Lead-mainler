import fs from 'fs';
import path from 'path';

export const findImageByIdInDirectory = (directoryPath, docName) => {
  if (!fs.existsSync(directoryPath)) {
    console.error(`Директорія ${directoryPath} не існує`)
    return null
  }

  const filesFromDirectory = fs.readdirSync(directoryPath)
  console.log(filesFromDirectory, docName)

}