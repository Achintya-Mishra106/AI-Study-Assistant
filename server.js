require("dotenv").config();

const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(express.json());
app.use(express.static("."));

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.post("/ask", async (req, res) => {
    console.log("ASK ROUTE RECEIVED");
    try {
        const question = req.body.question;

        if (!question) {
            return res.status(400).json({
                error: "Please enter a question."
            });
        }

       const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: `Answer this study question briefly and clearly in simple language. Question: ${question}`
});

res.json({
    answer: response.text
});

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: error.message        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
