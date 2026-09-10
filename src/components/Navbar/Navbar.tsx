import React, { useState, useEffect } from 'react';
import './Navbar.css';

export interface NavItem {
  id: string;
  label: string;
  href: string;
  badge?: string;
  icon?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home', icon: '🏠' },
  { id: 'menu', label: 'Food Menu', href: '#menu', icon: '🍕' },
  { id: 'diary', label: 'Diary', href: '#diary', icon: '📖' },
  { id: 'guestbook', label: 'Guestbook', href: '#guestbook', badge: 'NEW', icon: '✍️' },
  { id: 'contact', label: 'Contact', href: '#contact', icon: '📟' },
];

export interface NavbarProps {
  activeId?: string;
  onNavigate?: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeId = 'home',
  onNavigate,
}) => {
  const [currentTab, setCurrentTab] = useState<string>(activeId);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    setCurrentTab(activeId);
  }, [activeId]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemClick = (e: React.MouseEvent, item: NavItem) => {
    e.preventDefault();
    setCurrentTab(item.id);
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(item.id);
    }
  };

  return (
    <header className={`retro-navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>
      <nav className="retro-navbar" aria-label="Main Navigation">
        {/* Brand / Logo */}
        <a href="#home" className="navbar-brand" onClick={(e) => handleItemClick(e, NAV_ITEMS[0])}>
          <span className="brand-icon">📼</span>
          <div className="brand-text-group">
            <span className="brand-title">90s VIBE CAFÉ</span>
            <span className="brand-tagline">EST. 2026 • COFFEE ADDA</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="nav-links">
          {NAV_ITEMS.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <li key={item.id} className="nav-item">
                <a
                  href={item.href}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  onClick={(e) => handleItemClick(e, item)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                  {item.badge && <span className="nav-badge">{item.badge}</span>}
                  {isActive && <span className="active-glow-bar" />}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right Status / Action Section */}
        <div className="navbar-actions">
          <div className="status-indicator" title="Open 24/7 in Cyber Space">
            <span className="status-dot"></span>
            <span className="status-text">OPEN '95</span>
          </div>
          <a
            href="#contact"
            className="retro-order-btn"
            onClick={(e) => handleItemClick(e, NAV_ITEMS[4])}
          >
            <span className="btn-glitch-text">TABLE BOOK</span>
            <span className="btn-neon-glow"></span>
          </a>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className={`hamburger-btn ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="hamburger-line line-1"></span>
            <span className="hamburger-line line-2"></span>
            <span className="hamburger-line line-3"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          {NAV_ITEMS.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <li key={`mobile-${item.id}`} className="mobile-nav-item">
                <a
                  href={item.href}
                  className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                  onClick={(e) => handleItemClick(e, item)}
                >
                  <span className="mobile-nav-icon">{item.icon}</span>
                  <span className="mobile-nav-label">{item.label}</span>
                  {item.badge && <span className="nav-badge mobile-badge">{item.badge}</span>}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="mobile-footer-info">
          <div className="status-indicator">
            <span className="status-dot"></span>
            <span className="status-text">90s VIBE CAFÉ • ALL NIGHTS OPEN</span>
          </div>
        </div>
      </div>
    </header>
  );
};
