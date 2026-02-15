import React from "react";
import "../styles/tutorial-content.css";
import aiImg from "../assets/tutorial-images/ai.png";
import handsImg from "../assets/tutorial-images/hands.jpg";
import aiHandsImg from "../assets/tutorial-images/ai-hands.webp";
import teensImg from "../assets/tutorial-images/teens.webp";

export function PanelOne() {
  return (
    <div>
      <h2>What is AI?</h2>
      <div className="tutorial-p-text">
        <p>
          AI is created when people teach machines to think, solve problems, and
          make decisions.
        </p>

        <p>
          AI can even be used to generate images and videos! In this tutorial,
          you'll learn how to spot AI-generated images.
        </p>
        <div style={{ textAlign: "center" }}>
          <img src={aiImg} alt="Image of an AI symbol" style={{ width: 400 }} />
        </div>
      </div>
    </div>
  );
}

export function PanelTwo() {
  return (
    <div>
      <h2>Questions to ask yourself when looking at images</h2>
      <div className="tutorial-p-text">
        <p>- What do you see in this picture?</p>
        <p>- Does it make sense?</p>
        <p>
          - When outside of this game, where did you find the image? Who posted
          it?
        </p>
      </div>
    </div>
  );
}

export function PanelThree() {
  return (
    <div>
      <h2>Tips for Spotting AI-Generated Images</h2>
      <div className="tutorial-p-text">
        <p>- Weird details</p>
        <p>- Texture and Patterns</p>
        <p>- Light and Shadows</p>
        <p>- Text</p>
      </div>
    </div>
  );
}

export function PanelFour() {
  return (
    <div>
      <h2>Weird Details</h2>
      <div className="panel-row">
        <div className="tutorial-p-text">
          <p>Look for:</p>
          <p>- Distorted faces</p>
          <p>- Extra or missing fingers</p>
        </div>

        <div className="panel-image-wrapper">
          <img
            className="panel2-image"
            src={handsImg}
            alt="Image of hands with extra fingers"
          />
        </div>
      </div>
    </div>
  );
}

export function PanelFive({ onAnswer }: { onAnswer?: (correct: boolean) => void }) {
  const handleLeftClick = () => {
    if (onAnswer) onAnswer(false)
  }

  const handleRightClick = () => {
    if (onAnswer) onAnswer(true)
  }

  const handleLeftKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (onAnswer) onAnswer(false)
    }
  }

  const handleRightKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (onAnswer) onAnswer(true)
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
      <h2>Try it Yourself!</h2>
      <p style={{ marginTop: "0px" }}>Select the image that is <strong>AI-generated</strong>.</p>

      <div className="panel-row-compare">
        <div className="panel-image-wrapper">
          <img
            className="panel2-image"
            src={teensImg}
            alt="Image of teens"
            role="button"
            tabIndex={0}
            onClick={handleLeftClick}
            onKeyDown={handleLeftKey}
            style={{ cursor: 'pointer' }}
          />
        </div>

        <div className="panel-image-wrapper">
          <img
            className="panel2-image"
            src={aiHandsImg}
            alt="Image of hands with extra fingers"
            role="button"
            tabIndex={0}
            onClick={handleRightClick}
            onKeyDown={handleRightKey}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
    </div>
  );
}
export function PanelSix({ lastAnswer }: { lastAnswer?: boolean | null }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Result</h2>
        <img
          className="panel2-image"
          src={aiHandsImg}
          alt="Image of hands with extra fingers"
          role="button"
          tabIndex={0}
        />

        {lastAnswer === null || typeof lastAnswer === 'undefined' ? (
          <p className="tutorial-p-text"></p>
        ) : lastAnswer ? (
          <p className="tutorial-p-text" style={{ color: 'green', fontWeight: 600 }}>Correct — this image is AI-generated.</p>
        ) : (
          <p className="tutorial-p-text" style={{ color: 'crimson', fontWeight: 600 }}>Incorrect — this is the image that was AI-generated.</p>
        )}

        <p>If you look closely at the image, you'll notice that the hands are not quite right — they have an unnatural number of fingers.</p>

      </div>
    </div>
  )
}

// Export a `panels` array so other modules can programmatically get every panel.
export const panels = [PanelOne, PanelTwo, PanelThree, PanelFour, PanelFive, PanelSix];

export default null;
