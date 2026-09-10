import React, { useEffect } from 'react';
import './DiaryModal.css';

interface DiaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DiaryModal: React.FC<DiaryModalProps> = ({ isOpen, onClose }) => {
  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="diary-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="diary-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Neon Glow Header */}
        <div className="diary-modal-header">
          <div className="diary-header-title">
            <span className="diary-icon">📖</span>
            <div>
              <span className="diary-badge">MEMORIES ARCHIVE</span>
              <h2>Post Your 90s Diary Memory</h2>
            </div>
          </div>
          <button className="diary-close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        {/* Modal Description */}
        <p className="diary-modal-subtitle">
          Turn your cafe moments into timeless memories! Share your stories, polaroids, and thoughts with the 90s Vibe community.
        </p>

        {/* Instruction Steps Grid */}
        <div className="diary-steps-grid">
          {/* Step 1: Photos */}
          <div className="step-card">
            <div className="step-icon-wrapper pink-glow">
              <span className="step-emoji">📸</span>
              <span className="step-num">01</span>
            </div>
            <div className="step-content">
              <h3>Upload Your Photos</h3>
              <p>Snap your cafe vibes, vintage coffee cups, polaroids, or fun group photos with friends.</p>
            </div>
          </div>

          {/* Step 2: Captions */}
          <div className="step-card">
            <div className="step-icon-wrapper purple-glow">
              <span className="step-emoji">✍️</span>
              <span className="step-num">02</span>
            </div>
            <div className="step-content">
              <h3>Write a Nostalgic Caption</h3>
              <p>Describe your experience, express your mood, or write a short diary note from the 90s era.</p>
            </div>
          </div>

          {/* Step 3: Hashtags */}
          <div className="step-card">
            <div className="step-icon-wrapper cyan-glow">
              <span className="step-emoji">🏷️</span>
              <span className="step-num">03</span>
            </div>
            <div className="step-content">
              <h3>Add Trending Hashtags</h3>
              <p>Tag your post to get featured on our cafe wall:</p>
              <div className="hashtag-chips">
                <span>#90sVibeCafe</span>
                <span>#CoffeeAdda</span>
                <span>#Nostalgia90s</span>
                <span>#RetroDiaries</span>
              </div>
            </div>
          </div>

          {/* Step 4: Emojis */}
          <div className="step-card">
            <div className="step-icon-wrapper yellow-glow">
              <span className="step-emoji">✨</span>
              <span className="step-num">04</span>
            </div>
            <div className="step-content">
              <h3>Express with Retro Emojis</h3>
              <p>Sprinkle retro vibes into your diary entries:</p>
              <div className="emoji-picker-demo">
                <span>☕</span>
                <span>📼</span>
                <span>🍕</span>
                <span>🎸</span>
                <span>💖</span>
                <span>🕶️</span>
                <span>📻</span>
                <span>🛹</span>
              </div>
            </div>
          </div>
        </div>

        {/* Example Preview Card */}
        <div className="diary-preview-box">
          <div className="preview-label">💡 EXAMPLE DIARY POST</div>
          <div className="preview-polaroid">
            <div className="polaroid-photo">
              <span>☕ 📸 📼</span>
            </div>
            <div className="polaroid-caption">
              <p className="caption-text">
                "Best evening chai & 90s cassette tracks with friends! ✨ Nostalgia hits different here! 📼💖"
              </p>
              <p className="caption-tags">#90sVibeCafe #CoffeeAdda #RetroDiaries #Nostalgia90s</p>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="diary-modal-footer">
          <button className="diary-got-it-btn" onClick={onClose}>
            <span>Got It! Share Memory</span>
            <span className="btn-sparkle">✨</span>
          </button>
        </div>
      </div>
    </div>
  );
};
