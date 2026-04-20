import React, { useState } from 'react';
import { ShoppingBag, User, Sun, Moon } from 'lucide-react';
import AuthModal from './AuthModal';

const Header = ({ 
  activeTab, 
  setActiveTab, 
  cartItems = [], 
  theme = 'light', 
  toggleTheme, 
  onOpenBooking,
  isLoggedIn,
  userName,
  onLogout,
  onLoginSuccess,
  isAuthModalOpen,
  setIsAuthModalOpen
}) => {

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const navItems = isLoggedIn 
    ? ['SHOP ALL', 'MAKEUP', 'SKIN CARE', 'HAIR CARE', 'SERVICES', 'BOOKINGS', 'ABOUT'] 
    : ['LOGIN', 'SIGN UP'];

  const handleNavClick = (e, item) => {
    e.preventDefault();
    if (item === 'BOOKINGS') {
      onOpenBooking();
    } else if (item === 'LOGIN' || item === 'SIGN UP') {
      setIsAuthModalOpen(true);
    } else {
      setActiveTab(item);
    }
  };

  const handleUserClick = () => {
    if (isLoggedIn) {
      setShowProfileMenu(!showProfileMenu);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <header style={styles.header}>
      <div className="container" style={styles.container}>
        <div style={styles.logoContainer}>
          <h1 style={styles.logoText}>Beauty Flow</h1>
          <span style={styles.logoSubText}>BEAUTY STORE</span>
        </div>
        
        <nav style={styles.nav}>
          <ul style={styles.navList}>
            {navItems.map((item) => (
              <li key={item} style={styles.navItem}>
                <a 
                  href="#" 
                  onClick={(e) => handleNavClick(e, item)}
                  style={{
                    ...styles.navLink,
                    color: activeTab === item ? 'var(--primary)' : 'var(--text-main)',
                    borderBottom: activeTab === item ? '2px solid #B38E7D' : '2px solid transparent'
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div style={styles.actions}>
          <div style={{ position: 'relative' }}>
            <button style={styles.actionBtn} onClick={handleUserClick}>
              <User size={20} color={isLoggedIn ? '#B38E7D' : '#000'} />
            </button>
            {showProfileMenu && (
              <div style={{ position: 'absolute', top: '100%', right: 0, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '150px', zIndex: 10 }}>
                <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>Hello, {userName}!</p>
                <button onClick={() => { onLogout(); setShowProfileMenu(false); }} style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0', color: '#666', cursor: 'pointer', border: 'none', background: 'none' }}>Sign Out</button>
              </div>
            )}
          </div>
          
          <AuthModal 
            isOpen={isAuthModalOpen} 
            onClose={() => setIsAuthModalOpen(false)} 
            onLoginSuccess={onLoginSuccess}
          />
          <button style={styles.actionBtn} onClick={toggleTheme}>
            {theme === 'light' ? <Moon size={20} color="var(--icon-color)" /> : <Sun size={20} color="var(--icon-color)" />}
          </button>
          <div style={styles.cartContainer}>
            <span style={styles.price}>${cartTotal.toFixed(2)}</span>
            <button style={styles.actionBtn}>
              <ShoppingBag size={20} color="var(--icon-color)" />
              <span style={styles.cartBadge}>{cartCount}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: 'var(--bg-header)',
    padding: '1.5rem 0',
    borderBottom: '1px solid var(--border-color)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
  },
  logoText: {
    fontFamily: '"Playfair Display", serif',
    fontSize: '2rem',
    fontWeight: '700',
    margin: 0,
    lineHeight: 1,
    color: 'var(--text-title)',
  },
  logoSubText: {
    fontSize: '0.7rem',
    letterSpacing: '2px',
    color: '#888',
    textTransform: 'uppercase',
  },
  nav: {
    display: 'block',
  },
  navList: {
    display: 'flex',
    gap: '2rem',
    margin: 0,
    padding: 0,
  },
  navItem: {},
  navLink: {
    fontSize: '0.9rem',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    paddingBottom: '4px',
    transition: 'all 0.2s ease',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  actionBtn: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    color: 'var(--icon-color)',
  },
  cartContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  price: {
    fontWeight: '600',
    fontSize: '0.95rem',
  },
  cartBadge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: '#1E90FF', // matching the blue button from image slightly or dark
    color: '#fff',
    fontSize: '0.65rem',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  }
};

export default Header;
