import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";

import * as dotenv from "dotenv";
dotenv.config();

const template = `Task: Food

请列出图片中的所有食物项目，每个项目应在 Markdown 格式的食物-营养成分表中占据一行，表格包括四列：序号、食物、注意营养成分和推荐摄入量。其中，“主要营养成分”指的是食物中的主要成分，而“推荐摄入量”则是该成分的建议每日或每周摄入量。
** 示例食物-营养成分表
| 序号 | 食物         | 主要营养成分                                                                                     | 推荐摄入量               |
|-----|--------------|------------------------------------------------------------------------------------------|--------------------------------------|
`;

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

const image = [fileToGenerativePart("./messi.png", "image/jpeg")];

const result = await model.generateContent([template, ...image]);
const response = result.response;
const text = response.text();
console.log(text);
