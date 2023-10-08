import { promises as fs } from 'fs';
import path from 'path';

export const config = {
  api: {
    responseLimit: false,
  },
}

export default async function handler(req, res) {
  //Find the absolute path of the json directory
  const appDirectory = path.join(process.cwd(), 'public');
  //Read the json data file data.json
  const fileContents = await fs.readFile(appDirectory + '/data/01.json', 'utf8');
  //Return the content of the data file in json format
  res.status(200).json(fileContents);
}