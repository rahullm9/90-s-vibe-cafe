import React, { useState, useEffect } from 'react';
import './GuestbookModal.css';

export interface GuestbookReview {
  id: string;
  name: string;
  rating: number;
  caption: string;
  tags?: string[];
  date: string;
}

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview?: (review: GuestbookReview) => void;
}

const RATING_LABELS: Record<number, string> = {
  1: '1/5 • Needs Tuning 📻',
  2: '2/5 • Okay Vibe ☕',
  3: '3/5 • Pretty Cool 📼',
  4: '4/5 • Super Rad! 🎸',
  5: '5/5 • Pure 90s Magic! 🌟',
};

const SUGGESTED_TAGS = ['☕ Cold Coffee', '🍕 Retro Pizza', '🎶 90s Playlist', '✨ Neon Vibe', '🕹️ Nostalgia'];

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview,
}) => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [caption, setCaption] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['☕ Cold Coffee', '✨ Neon Vibe']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset form when reopened
  useEffect(() => {
    if (isOpen) {
      setSubmittedSuccess(false);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption.trim()) return;

    setIsSubmitting(true);

    const newReview: GuestbookReview = {
      id: Date.now().toString(),
      name: name.trim() || 'Anonymous 90s Kid',
      rating,
      caption: caption.trim(),
      tags: selectedTags,
      date: 'Just now',
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      if (onSubmitReview) {
        onSubmitReview(newReview);
      }
      setTimeout(() => {
        onClose();
        setName('');
        setCaption('');
        setRating(5);
      }, 1400);
    }, 500);
  };

  return (
    <div className="guestbook-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="guestbook-modal-card review-card-popup" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="guestbook-modal-header">
          <div className="guestbook-header-title">
            <span className="diary-icon">⭐</span>
            <div>
              <span className="guestbook-badge">WRITE A REVIEW</span>
              <h2>Share Your Cafe Feedback</h2>
            </div>
          </div>
          <button className="guestbook-close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        {submittedSuccess ? (
          <div className="review-success-state">
            <div className="success-icon">🎉</div>
            <h3>Thank You For Your Review!</h3>
            <p>Your feedback & rating have been posted to the 90s Vibe Guestbook!</p>
            <div className="success-rating-pill">⭐ {rating}/5 Stars Recorded</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="review-form">
            {/* Rating Stars Section */}
            <div className="form-group rating-group">
              <label className="form-label">
                <span>Overall Rating</span>
                <span className="rating-label-text">
                  {RATING_LABELS[hoverRating || rating]}
                </span>
              </label>
              <div className="star-rating-picker" onMouseLeave={() => setHoverRating(0)}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`star-btn ${(hoverRating || rating) >= star ? 'active' : ''}`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    aria-label={`Rate ${star} star`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            {/* Author Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="reviewer-name">
                <span>Your Name / 90s Alias</span>
                <span className="optional-tag">(Optional)</span>
              </label>
              <input
                id="reviewer-name"
                type="text"
                className="retro-input"
                placeholder="e.g. DJ Rahul '95 / Coffee Lover"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={40}
              />
            </div>

            {/* Caption / Review Text */}
            <div className="form-group">
              <label className="form-label" htmlFor="review-caption">
                <span>Caption & Feedback <span className="required-star">*</span></span>
                <span className="char-count">{caption.length}/300</span>
              </label>
              <textarea
                id="review-caption"
                className="retro-textarea"
                rows={4}
                placeholder="Tell us about the coffee, the 90s songs, food taste, or ambiance... (use emojis too! ☕📼✨)"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                maxLength={300}
                required
              />
            </div>

            {/* Tags Selection */}
            <div className="form-group">
              <label className="form-label">
                <span>Tags & Highlights</span>
              </label>
              <div className="review-tag-selector">
                {SUGGESTED_TAGS.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      className={`tag-toggle-btn ${isSelected ? 'selected' : ''}`}
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Footer */}
            <div className="guestbook-modal-footer">
              <button type="button" className="guestbook-close-secondary-btn" onClick={onClose}>
                Cancel
              </button>
              <button
                type="submit"
                className="guestbook-primary-action-btn"
                disabled={isSubmitting || !caption.trim()}
              >
                <span>{isSubmitting ? 'Posting Review...' : '🚀 Post Review'}</span>
                <span className="btn-sparkle">✨</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
