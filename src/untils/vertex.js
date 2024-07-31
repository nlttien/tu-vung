import { initializeApp } from "firebase/app";
import { getVertexAI, getGenerativeModel } from "firebase/vertexai-preview";

// TODO(developer) Replace the following with your app's Firebase configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyDiSJZEohouFf663y7FDDJi9im3tvmeeUA",
    authDomain: "tu-vung-447ad.firebaseapp.com",
    projectId: "tu-vung-447ad",
    storageBucket: "tu-vung-447ad.appspot.com",
    messagingSenderId: "495745716768",
    appId: "1:495745716768:web:f79197a069025b0863e245",
    measurementId: "G-7701ZQ11EV"
};

// Initialize the generative model with a model that supports your use case
// Gemini 1.5 models are versatile and can be used with all API capabilities
const model = getGenerativeModel(vertexAI, { model: "gemini-1.5-flash" });

// Initialize FirebaseApp
const firebaseApp = initializeApp(firebaseConfig);

// Initialize the Vertex AI service
const vertexAI = getVertexAI(firebaseApp);

// Wrap in an async function so you can use await
async function run() {
    // Provide a prompt that contains text
    const prompt = "Write a story about a magic backpack."

    // To generate text output, call generateContent with the text input
    const result = await model.generateContent(prompt);

    const response = result.response;
    const text = response.text();
    console.log(text);
}

run();