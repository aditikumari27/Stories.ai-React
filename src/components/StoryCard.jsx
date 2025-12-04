import React from "react";
import { motion } from "framer-motion";

function StoryCard({ title, story, imageUrl }) {
  const storyLines = story.split("\n");

  return (
    <motion.div
      className="card story-card border-0 overflow-hidden mt-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      <div className="position-relative">
        <motion.img
          src={imageUrl}
          alt={title}
          className="story-image w-100"
          initial={{ filter: "blur(10px)" }}
          animate={{ filter: "blur(0px)" }}
          transition={{ duration: 1 }}
        />
        <div className="image-overlay-gradient"></div>
      </div>

      <div className="card-body p-4 position-relative">
        <h2 className="card-title text-info fw-bold mb-3">{title}</h2>
        <div className="card-text">
          {storyLines.map((line, index) => (
            <motion.p
              key={index}
              className="mb-2 text-light"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.2 }}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default StoryCard;