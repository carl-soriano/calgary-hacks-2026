import React from "react";
import '../styles/tutorial-content.css'

export function PanelOne() {
  return (
    <div>
      <h2>What is AI?</h2>
      <div className="tutorial-p-text">
        <p>
          AI is created when people teach machines to think, solve problems, and
          make decisions.
        </p>
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
      <p>
        Check lighting, shadows, and small distortions. Pay attention to hands
        and text.
      </p>
      <div className="tutorial-image-placeholder">[image goes here]</div>
    </div>
  );
}

export function PanelFive() {
  return (
    <div>
      <h2>Artifacts</h2>
      <p>Search for repeating patterns, odd textures, and mismatched edges.</p>
      <div className="tutorial-image-placeholder">[image goes here]</div>
    </div>
  );
}

// Export a `panels` array so other modules can programmatically get every panel.
export const panels = [PanelOne, PanelTwo, PanelThree, PanelFour, PanelFive]

export default null;
