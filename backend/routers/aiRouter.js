const { GoogleGenAI } = require('@google/genai');
const express = require('express');
const router = express.Router();
require('dotenv').config();

// Initialize the AI model
const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API });

// Create route for AI processing
router.post('/generate', async (req, res) => {
    const { brand, model, year, mileage, condition } = req.body;
    try {
        const prompt = `As a car scrap value expert, calculate the estimated scrap value for:
        - Brand: ${brand}
        - Model: ${model}
        - Year: ${year}
        - Mileage: ${mileage} km
        - Condition: ${condition}
        
        Consider factors like:
        1. Current market rates for scrap metal
        2. Salvageable parts value
        3. Vehicle age and condition impact
        
        Provide the result in this format:
        {
            "price": [numerical value in INR],
            "explanation": [detailed explanation of calculation]
        }`;
        const response = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        // const model = await genAI.getGenerativeModel({ model: "gemini-pro" });
        // const response = await model.generateContent(req.body.prompt);
        const result = response.text;
        res.json({ text: result });
    } catch (error) {
        console.error('AI generation error:', error);
        res.status(500).json({ error: 'Failed to generate content' });
    }
});

module.exports = router;