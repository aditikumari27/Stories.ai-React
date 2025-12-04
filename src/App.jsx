import React from "react";
import StoryGenerator from "./components/StoryGenerator.jsx";
import { motion } from "framer-motion";

function App() {
  return (
    <div className="app-root d-flex align-items-center justify-content-center position-relative overflow-hidden">
      {/* Moving glowing background objects */}
      <motion.div
        className="glowing-orb orb-1"
        animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="glowing-orb orb-2"
        animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container position-relative z-2">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="app-card shadow-lg rounded-4 p-4 p-md-5">
              <header className="text-center mb-4">
                <h1 className="app-title mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                  Neon Story & AI Image
                </h1>
                <p className="app-subtitle mb-0">
                  Enter a topic. Watch the AI generate a scene & story.
                </p>
              </header>

              <StoryGenerator />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;