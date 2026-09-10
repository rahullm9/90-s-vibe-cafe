import React, { useState, useEffect, useRef } from 'react';
import './DiaryModal.css';

export interface DiaryEntry {
  id: string;
  author: string;
  avatar?: string;
  moodEmoji: string;
  date: string;
  caption: string;
  image?: string;
  tags: string[];
  likes: number;
  isLiked?: boolean;
}

interface DiaryPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitEntry: (entry: DiaryEntry) => void;
}

const EMOJI_OPTIONS = ['☕', '📼', '🍕', '🎸', '🛹', '💖', '🕶️', '📻', '✨', '🕺'];
const PRESET_TAGS = ['#90sVibeCafe', '#CoffeeAdda', '#NostalgiaNights', '#RetroDiaries', '#CassetteMoments', '#PolaroidVibe'];

export const DiaryPostModal: React.FC<DiaryPostModalProps> = ({
  isOpen,
  onClose,
  onSubmitEntry,
}) => {
  const [author, setAuthor] = useState('');
  const [moodEmoji, setMoodEmoji] = useState('☕');
  const [caption, setCaption] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['#90sVibeCafe', '#CoffeeAdda']);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setSubmittedSuccess(false);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

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

    const newEntry: DiaryEntry = {
      id: Date.now().toString(),
      author: author.trim() || '90s Dreamer',
      moodEmoji,
      date: 'Just now',
      caption: caption.trim(),
      image: selectedImage || undefined,
      tags: selectedTags,
      likes: 1,
      isLiked: true,
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      onSubmitEntry(newEntry);
      setTimeout(() => {
        onClose();
        setAuthor('');
        setCaption('');
        setSelectedImage(null);
        setMoodEmoji('☕');
      }, 1200);
    }, 500);
  };

  return (
    <div className="diary-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="diary-modal-card diary-create-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="diary-modal-header">
          <div className="diary-header-title">
            <span className="diary-icon">📸</span>
            <div>
              <span className="diary-badge">NEW MEMORY ENTRY</span>
              <h2>Add to the 90s Diary</h2>
            </div>
          </div>
          <button className="diary-close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        {submittedSuccess ? (
          <div className="diary-success-state">
            <div className="success-icon">📼</div>
            <h3>Memory Recorded in Scrapbook!</h3>
            <p>Your polaroid & story have been posted to the cafe timeline.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="diary-post-form">
            {/* Author & Mood row */}
            <div className="form-row-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="entry-author">
                  <span>Your Name / Alias</span>
                  <span className="optional-tag">(Optional)</span>
                </label>
                <input
                  id="entry-author"
                  type="text"
                  className="retro-input"
                  placeholder="e.g. Simran & Friends '96"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  maxLength={40}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <span>Mood Vibe</span>
                </label>
                <div className="mood-emoji-selector">
                  {EMOJI_OPTIONS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      className={`mood-btn ${moodEmoji === emoji ? 'active' : ''}`}
                      onClick={() => setMoodEmoji(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Story Caption */}
            <div className="form-group">
              <label className="form-label" htmlFor="entry-caption">
                <span>Story & Memories <span className="required-star">*</span></span>
                <span className="char-count">{caption.length}/350</span>
              </label>
              <textarea
                id="entry-caption"
                className="retro-textarea"
                rows={3}
                placeholder="Share what happened at your table, the songs on tape, laughter with friends, and cozy coffee moments... ☕✨"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                maxLength={350}
                required
              />
            </div>

            {/* Polaroid / Photo Upload */}
            <div className="form-group">
              <label className="form-label">
                <span>Attach Photo / Polaroid</span>
                <span className="optional-tag">(Optional)</span>
              </label>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="diary-photo-input"
              />

              {selectedImage ? (
                <div className="image-preview-card">
                  <img src={selectedImage} alt="Uploaded Polaroid memory" className="review-preview-img" />
                  <div className="preview-overlay">
                    <span className="preview-filename">📸 Polaroid Attached</span>
                    <button type="button" className="remove-img-btn" onClick={removeImage}>
                      Remove ✕
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  className="upload-dropzone-btn"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <span className="upload-icon">📷</span>
                  <span className="upload-text">Upload a cafe polaroid or snap</span>
                  <span className="upload-hint">PNG, JPG, WebP</span>
                </button>
              )}
            </div>

            {/* Tags Selection */}
            <div className="form-group">
              <label className="form-label">
                <span>Memory Hashtags</span>
              </label>
              <div className="review-tag-selector">
                {PRESET_TAGS.map((tag) => {
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

            {/* Action Buttons */}
            <div className="guestbook-modal-footer">
              <button type="button" className="guestbook-close-secondary-btn" onClick={onClose}>
                Cancel
              </button>
              <button
                type="submit"
                className="guestbook-primary-action-btn"
                disabled={isSubmitting || !caption.trim()}
              >
                <span>{isSubmitting ? 'Posting Memory...' : '📸 Post to Diary'}</span>
                <span className="btn-sparkle">✨</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
