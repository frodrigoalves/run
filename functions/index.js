const {onCall} = require("firebase-functions/v2/https");
const {VertexAI} = require("@google-cloud/vertexai");

// Initialize Vertex AI
const vertex_ai = new VertexAI({project: process.env.GCLOUD_PROJECT, location: "us-central1"});
const model = "gemini-pro";

// Instantiate the model
const generativeModel = vertex_ai.getGenerativeModel({
    model: model,
});

exports.gemini = onCall(async (request) => {
    const prompt = request.data.prompt;

    const req = {
        contents: [{role: "user", parts: [{text: prompt}]}],
    };

    const streamingResp = await generativeModel.generateContentStream(req);

    const aggregatedResponse = await streamingResp.response;
    const text = aggregatedResponse.candidates[0].content.parts[0].text;

    return {
        "text": text,
    };
});
