import React, { useState } from "react";
import StoryCard from "./StoryCard.jsx";

function StoryGenerator() {
  const [topic, setTopic] = useState("");
  const [story, setStory] = useState("");
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function buildMicroStory(topicText, quoteText) {
    const trimmed = topicText.trim();
    const niceTopic = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);

    const microStory =
      `In a world where ${niceTopic.toLowerCase()} defines reality, everything shifted.\n` +
      `A voice whispered from the void: "${quoteText}"\n` +
      `Suddenly, the colors of the universe aligned, proving that even ${niceTopic.toLowerCase()} has a soul.`;

    const title = `The Legend of ${niceTopic}`;
    return { title, story: microStory };
  }

  function generateImageUrlFromTopic(topicText) {
    // Generate a unique seed to prevent caching the same image
    const seed = Math.floor(Math.random() * 1000);
    const encoded = encodeURIComponent(topicText + " cinematic lighting neon glowing 4k realistic");
    // Uses Pollinations AI to actually GENERATE an image based on prompt
    return `https://image.pollinations.ai/prompt/${encoded}?width=800&height=500&nologo=true&seed=${seed}`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStory("");
    setImageUrl("");
    const cleanedTopic = topic.trim();

    if (!cleanedTopic) {
      setError("Please enter a topic first.");
      return;
    }

    setLoading(true);

    let quoteText = "The future belongs to those who believe in the beauty of their dreams."; // Default backup

    try {
      // 1. Try a more reliable API first
      const quoteResponse = await fetch("https://dummyjson.com/quotes/random");
      
      if (quoteResponse.ok) {
        const quoteData = await quoteResponse.json();
        // dummyjson returns { quote: "...", author: "..." }
        if (quoteData.quote) {
            quoteText = quoteData.quote;
        }
      } else {
        console.warn("API Error, using backup quote.");
      }
    } catch (err) {
      console.warn("Network Error, using backup quote.");
      // We do NOT set error here anymore. We just use the backup quote so the app works.
    }

    // 2. Generate content (Will work even if API failed)
    try {
        const { title: generatedTitle, story: generatedStory } = buildMicroStory(cleanedTopic, quoteText);
        const generatedImageUrl = generateImageUrlFromTopic(cleanedTopic);

        // Pre-load image to avoid pop-in
        const img = new Image();
        img.src = generatedImageUrl;
        
        // Timeout to ensure we don't wait forever for an image
        const imageTimeout = new Promise((resolve) => setTimeout(resolve, 3000));
        
        const imageLoad = new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve; // Show content even if image breaks
        });

        // Wait for image load OR 3 seconds, whichever comes first
        await Promise.race([imageLoad, imageTimeout]);

        setTitle(generatedTitle);
        setStory(generatedStory);
        setImageUrl(generatedImageUrl);
    } catch (finalError) {
        setError("Something went wrong. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-4">
        <label className="form-label fw-bold text-light">Create Your World</label>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control form-control-lg bg-dark text-white border-secondary"
            placeholder="Cyberpunk city, lonely robot, magical forest..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-lg btn-gradient text-white fw-bold px-4"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate 🚀"}
          </button>
        </div>
        
        {error && <div className="text-danger small mt-2">{error}</div>}
      </form>

      {loading && (
        <div className="text-center py-5">
            <div className="spinner-border text-info" role="status"></div>
            <p className="mt-3 text-info">Dreaming up a new reality...</p>
        </div>
      )}

      {!loading && story && imageUrl && (
        <StoryCard title={title} story={story} imageUrl={imageUrl} />
      )}
    </div>
  );
}

export default StoryGenerator;