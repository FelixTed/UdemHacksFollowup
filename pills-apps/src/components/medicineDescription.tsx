import React, { useState, useEffect } from 'react';
import { Medicine } from '../classes/Medecine';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const geminiApiKey: string = process.env.GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(geminiApiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

const medicineDescription = (medicine: Medicine) => {
  const [description, setDescription] = useState<string>(medicine.description || '');

  useEffect(() => {
    if (medicine.description == null) {
      const generateDescription = async () => {
        try {
          const chatSession = model.startChat({
            generationConfig,
            history: [],
          });
          const result = await chatSession.sendMessage(`Describe the medicine: ${medicine.medicineName} in  under 100 words for users`);
          const drugDescription = result.response.text();
          const shortDescription = drugDescription.split(' ').slice(0, 100).join(' ') + (drugDescription.split(' ').length > 100 ? '...' : '');
          setDescription(shortDescription);
        } catch (error) {
          console.error('Error generating description with Gemini API:', error);
          setDescription('Error generating description');
        }
      };

      generateDescription();
    }
  }, [medicine]);

  return (
    <div>
      <h1>{medicine.medicineName}</h1>
      <p>{medicine.description}</p>
    </div>
  );
};

export default medicineDescription;