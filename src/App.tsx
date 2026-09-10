import { useState, useEffect } from 'react'
import './App.css'
import { Navbar } from './components/Navbar'
import { MusicPlayer } from './components/MusicPlayer'
import { RetroLoader } from './components/RetroLoader'
import { DiaryModal, DiaryPostModal, type DiaryEntry } from './components/DiaryModal'
import { GuestbookInfoModal, ReviewModal, type GuestbookReview } from './components/GuestbookModal'

import polaroidCoffeeTape from './assets/images/polaroid-coffee-tape.jpg'
import polaroidFriendsCafe from './assets/images/polaroid-friends-cafe.jpg'
import desktopBg from './assets/images/90s-vibe-desktop-screen.png'
import mobileBg from './assets/images/90s-vibe-mobile-screen.png'

const INITIAL_DIARY_ENTRIES: DiaryEntry[] = [
  {
    id: '1',
    author: 'Rohan & Kabir',
    moodEmoji: '☕',
    date: 'Oct 14, 1995 • 8:30 PM',
    caption: 'Chilling at table 4 with hot cappuccino and vintage cassette mix #94 playing Kumar Sanu hits! The neon cafe sign outside looks magical tonight. 📼✨',
    image: polaroidCoffeeTape,
    tags: ['#90sVibeCafe', '#CassetteMoments', '#CoffeeAdda'],
    likes: 24,
    isLiked: false,
  },
  {
    id: '2',
    author: 'Ananya, Priya & Gang',
    moodEmoji: '🍕',
    date: 'July 19, 1997 • 6:15 PM',
    caption: 'Reunion evening! Pepperoni pizza, chocolate thick shakes, and non-stop Galaga high scores at the arcade booth. Best weekend ever! 🍕🛹🎉',
    image: polaroidFriendsCafe,
    tags: ['#90sVibeCafe', '#RetroDiaries', '#NostalgiaNights'],
    likes: 42,
    isLiked: true,
  },
];

const INITIAL_REVIEWS: GuestbookReview[] = [
  {
    id: '1',
    name: 'Aarav (Vibe Master)',
    rating: 5,
    caption: 'The Kumar Sanu cassette tracks playing while sipping hot caramel cappuccino is pure nostalgia! Best cafe in town. ☕📼✨',
    tags: ['☕ Cold Coffee', '🎶 90s Playlist', '✨ Neon Vibe'],
    date: '2 hours ago',
  },
  {
    id: '2',
    name: 'Pooja RetroKid',
    rating: 5,
    caption: 'Loved the 90s theme decor and polaroid wall! The crispy crust pizza and vintage lights are 10/10! 🍕💖',
    tags: ['🍕 Retro Pizza', '🕹️ Nostalgia'],
    date: 'Yesterday',
  },
];

function App() {
  const [activeTab, setActiveTab] = useState<string>('home')
  const [loadingTab, setLoadingTab] = useState<string>('home')
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [isDiaryModalOpen, setIsDiaryModalOpen] = useState<boolean>(false)
  const [isDiaryPostModalOpen, setIsDiaryPostModalOpen] = useState<boolean>(false)
  const [isGuestbookInfoOpen, setIsGuestbookInfoOpen] = useState<boolean>(false)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false)

  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>(INITIAL_DIARY_ENTRIES)
  const [reviews, setReviews] = useState<GuestbookReview[]>(INITIAL_REVIEWS)

  // Initial 2.5s loader on app boot
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  const handleNavigate = (id: string) => {
    if (id === activeTab && !isLoading) return;
    setIsLoading(true);
    setLoadingTab(id);

    setTimeout(() => {
      setActiveTab(id);
      setIsLoading(false);
      if (id === 'diary') {
        setIsDiaryModalOpen(true);
      } else if (id === 'guestbook') {
        setIsGuestbookInfoOpen(true);
      }
    }, 2500);
  }

  const handleAddDiaryEntry = (newEntry: DiaryEntry) => {
    setDiaryEntries([newEntry, ...diaryEntries])
  }

  const handleToggleLike = (id: string) => {
    setDiaryEntries(diaryEntries.map(entry => {
      if (entry.id === id) {
        const isLiked = !entry.isLiked;
        return {
          ...entry,
          isLiked,
          likes: isLiked ? entry.likes + 1 : Math.max(0, entry.likes - 1),
        };
      }
      return entry;
    }))
  }

  const handleAddReview = (newReview: GuestbookReview) => {
    setReviews([newReview, ...reviews])
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'menu':
        return (
          <div className="content-box">
            <div className="badge-pill">🍕 RETRO BITES & SIPS</div>
            <h1>Food & Drinks Menu</h1>
            <p className="subtitle">
              Savor classic 90s comfort meals, neon milkshakes, and vinyl espresso.
            </p>
          </div>
        )
      case 'diary':
        return (
          <div className="content-box diary-content-box">
            <div className="badge-pill">📖 90s MEMORY SCRAPBOOK</div>
            <h1>Client Memories & Diary</h1>
            <p className="subtitle">
              Polaroids, handwritten moments, and nostalgic tales from our visitors.
            </p>

            <div className="content-actions">
              <button
                className="retro-action-btn primary-pulse"
                onClick={() => setIsDiaryPostModalOpen(true)}
              >
                <span>📸 Post a Memory</span>
                <span className="btn-glow-dot">✨</span>
              </button>
              <button
                className="retro-action-btn secondary-btn"
                onClick={() => setIsDiaryModalOpen(true)}
              >
                <span>ℹ️ Posting Guidelines</span>
              </button>
            </div>

            {/* List of Client Diary Posts */}
            <div className="diary-feed">
              <div className="feed-header">
                <span className="feed-title">COMMUNITY MEMORY ENTRIES</span>
                <span className="feed-count">{diaryEntries.length} Polaroids</span>
              </div>

              <div className="diary-entries-grid">
                {diaryEntries.map((entry) => (
                  <article key={entry.id} className="polaroid-diary-card">
                    {/* Retro Washi Tape effect */}
                    <div className="washi-tape-strip" />

                    {/* Image / Polaroid Frame */}
                    {entry.image && (
                      <div className="polaroid-media-container">
                        <img src={entry.image} alt={entry.caption} className="polaroid-photo-img" />
                        <span className="polaroid-vibe-tag">{entry.moodEmoji} VIBE</span>
                      </div>
                    )}

                    {/* Author & Header */}
                    <div className="diary-card-body">
                      <div className="diary-entry-header">
                        <div className="diary-author-info">
                          <span className="diary-mood-avatar">{entry.moodEmoji}</span>
                          <div>
                            <h4 className="diary-author-name">{entry.author}</h4>
                            <time className="diary-entry-date">{entry.date}</time>
                          </div>
                        </div>

                        {/* Interactive Like Button */}
                        <button
                          type="button"
                          className={`diary-like-btn ${entry.isLiked ? 'liked' : ''}`}
                          onClick={() => handleToggleLike(entry.id)}
                          aria-label={`Like post by ${entry.author}`}
                        >
                          <span className="heart-icon">{entry.isLiked ? '💖' : '🤍'}</span>
                          <span className="like-count">{entry.likes}</span>
                        </button>
                      </div>

                      {/* Story Caption */}
                      <p className="diary-story-text">"{entry.caption}"</p>

                      {/* Tags */}
                      {entry.tags && entry.tags.length > 0 && (
                        <div className="diary-tags-container">
                          {entry.tags.map((tag, idx) => (
                            <span key={idx} className="diary-tag-pill">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        )
      case 'guestbook':
        return (
          <div className="content-box guestbook-content-box">
            <div className="badge-pill">✍️ COMMUNITY FEEDBACK</div>
            <h1>Cyber Guestbook & Reviews</h1>
            <p className="subtitle">
              Leave your rating, memories, and feedback for 90s Vibe Cafe!
            </p>

            <div className="content-actions">
              <button
                className="retro-action-btn primary-pulse"
                onClick={() => setIsReviewModalOpen(true)}
              >
                <span>⭐ Write a Review</span>
                <span className="btn-glow-dot">✍️</span>
              </button>
              <button
                className="retro-action-btn secondary-btn"
                onClick={() => setIsGuestbookInfoOpen(true)}
              >
                <span>ℹ️ How It Works</span>
              </button>
            </div>

            {/* Live Review Feed */}
            <div className="guestbook-feed">
              <div className="feed-header">
                <span className="feed-title">RECENT REVIEWS & RATINGS</span>
                <span className="feed-count">{reviews.length} Notes</span>
              </div>

              <div className="reviews-list">
                {reviews.map((rev) => (
                  <div key={rev.id} className="review-card-item">
                    <div className="review-card-header">
                      <div className="reviewer-info">
                        <span className="reviewer-avatar">📼</span>
                        <div>
                          <h4 className="reviewer-name">{rev.name}</h4>
                          <span className="review-date">{rev.date}</span>
                        </div>
                      </div>
                      <div className="review-stars-badge">
                        {'★'.repeat(rev.rating)}
                        {'☆'.repeat(5 - rev.rating)}
                      </div>
                    </div>

                    <p className="review-caption-text">"{rev.caption}"</p>

                    {rev.tags && rev.tags.length > 0 && (
                      <div className="review-tags-list">
                        {rev.tags.map((t, idx) => (
                          <span key={idx} className="review-tag-badge">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case 'contact':
        return (
          <div className="content-box">
            <div className="badge-pill">📟 PAGER & HOTLINE</div>
            <h1>Get In Touch</h1>
            <p className="subtitle">
              Dial our payphone or beep us on the cyber hotline. We're open 24/7.
            </p>
          </div>
        )
      case 'home':
      default:
        return (
          <div className="home-hero-text">
            <div className="badge-pill">☕ CYBER DINER & LOUNGE</div>
            <h1 className="hero-title">
              <span className="hero-word">90's</span>
              <span className="hero-word">Vibe</span>
              <span className="hero-word">Cafe</span>
            </h1>
            <p className="subtitle">
              Step back into the golden era of synth tunes, analog warmth, and neon dreams.
            </p>
            <div className="home-location-pill">
              <div className="location-header-tag">
                <span className="location-pin-icon">📍</span>
                <span className="location-label">Location:</span>
              </div>
              <span className="location-address">Ranchi road, Purulia, 723102</span>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="app">
      {/* ─── Responsive Dynamic Background Layer ────────── */}
      <div className="retro-bg-container" aria-hidden="true">
        <picture>
          <source media="(max-width: 768px), (orientation: portrait)" srcSet={mobileBg} />
          <img src={desktopBg} alt="90s Vibe Cafe Ambiance" className="retro-bg-img" />
        </picture>
        <div className="retro-bg-overlay" />
      </div>

      <Navbar activeId={isLoading ? loadingTab : activeTab} onNavigate={handleNavigate} />
      <main className="main-content">
        {isLoading ? (
          <RetroLoader sectionName={loadingTab} />
        ) : (
          renderContent()
        )}
      </main>
      <MusicPlayer visible={!isLoading && activeTab === 'home'} />

      {/* Diary Instructions Modal */}
      <DiaryModal
        isOpen={isDiaryModalOpen}
        onClose={() => setIsDiaryModalOpen(false)}
      />

      {/* Diary Post Memory Modal */}
      <DiaryPostModal
        isOpen={isDiaryPostModalOpen}
        onClose={() => setIsDiaryPostModalOpen(false)}
        onSubmitEntry={handleAddDiaryEntry}
      />

      {/* Guestbook Instructions Modal */}
      <GuestbookInfoModal
        isOpen={isGuestbookInfoOpen}
        onClose={() => setIsGuestbookInfoOpen(false)}
        onOpenReviewModal={() => setIsReviewModalOpen(true)}
      />

      {/* Review Submission Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmitReview={handleAddReview}
      />
    </div>
  )
}

export default App
