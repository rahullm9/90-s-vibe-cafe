import React, { useEffect } from 'react';
import './GuestbookModal.css';

interface GuestbookInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenReviewModal: () => void;
}

export const GuestbookInfoModal: React.FC<GuestbookInfoModalProps> = ({
  isOpen,
  onClose,
  onOpenReviewModal,
}) => {
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

  const handleWriteReview = () => {
    onClose();
    onOpenReviewModal();
  };

  return (
    <div className="guestbook-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="guestbook-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Neon Header */}
        <div className="guestbook-modal-header">
          <div className="guestbook-header-title">
            <span className="guestbook-icon">✍️</span>
            <div>
              <span className="guestbook-badge">COMMUNITY GUESTBOOK</span>
              <h2>Welcome to the 90s Guestbook</h2>
            </div>
          </div>
          <button className="guestbook-close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        {/* Description */}
        <p className="guestbook-modal-subtitle">
          Your thoughts fuel our cyber cafe! Leave your authentic feedback, rate the retro atmosphere, and share suggestions with our team.
        </p>

        {/* What You Can Do Grid */}
        <div className="guestbook-steps-grid">
          {/* Card 1: Star Rating */}
          <div className="gb-step-card">
            <div className="gb-icon-wrapper star-glow">
              <span className="gb-emoji">⭐</span>
              <span className="gb-step-num">01</span>
            </div>
            <div className="gb-content">
              <h3>Rate the Cafe Vibe</h3>
              <p>Give us a 1 to 5 star rating on coffee, taste, 90s music playlist, and nostalgic ambience.</p>
            </div>
          </div>

          {/* Card 2: Review & Feedback */}
          <div className="gb-step-card">
            <div className="gb-icon-wrapper purple-glow">
              <span className="gb-emoji">💬</span>
              <span className="gb-step-num">02</span>
            </div>
            <div className="gb-content">
              <h3>Write Your Honest Review</h3>
              <p>Tell us what you loved, what we can improve, or your favorite dish and song from your visit.</p>
            </div>
          </div>

          {/* Card 3: Tag Highlights */}
          <div className="gb-step-card">
            <div className="gb-icon-wrapper cyan-glow">
              <span className="gb-emoji">🏷️</span>
              <span className="gb-step-num">03</span>
            </div>
            <div className="gb-content">
              <h3>Tag Cafe Highlights</h3>
              <p>Highlight your favorites like Cold Coffee, 90s Playlist, Retro Pizza, or Neon Ambiance.</p>
            </div>
          </div>

          {/* Card 4: Community Badge */}
          <div className="gb-step-card">
            <div className="gb-icon-wrapper pink-glow">
              <span className="gb-emoji">✨</span>
              <span className="gb-step-num">04</span>
            </div>
            <div className="gb-content">
              <h3>Get Featured on Wall</h3>
              <p>Your notes and feedback appear live on our community board for all retro lovers to read!</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="guestbook-modal-footer">
          <button className="guestbook-close-secondary-btn" onClick={onClose}>
            Close & Browse
          </button>
          <button className="guestbook-primary-action-btn" onClick={handleWriteReview}>
            <span>✍️ Write a Review Now</span>
            <span className="btn-sparkle">✨</span>
          </button>
        </div>
      </div>
    </div>
  );
};
