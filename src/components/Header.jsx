import React, { useState } from 'react';
import { ShoppingBag, User, Sun, Moon } from 'lucide-react';

const Header = ({ activeTab, setActiveTab, cartItems = [], theme = 'light', toggleTheme }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const navItems = ['SHOP ALL', 'MAKEUP', 'SKIN CARE', 'HAIR CARE', 'SERVICES', 'ABOUT'];

  const handleNavClick = (e, item) => {
    e.preventDefault();
    setActiveTab(item);
  };

  const handleUserClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
    setShowProfileMenu(false);
  };

  return (
    <header style={styles.header}>
      <div className="container" style={styles.container}>
        <div style={styles.logoContainer}>
          <h1 style={styles.logoText}>Be Bold</h1>
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
                {isLoggedIn ? (
                  <>
                    <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>Hello, User!</p>
                    <button onClick={toggleLogin} style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0', color: '#666', cursor: 'pointer' }}>Sign Out</button>
                  </>
                ) : (
                  <>
                    <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Not logged in</p>
                    <button onClick={toggleLogin} className="btn-dark" style={{ width: '100%', padding: '0.5rem', fontSize: '0.8rem' }}>Log In</button>
                  </>
                )}
              </div>
            )}
          </div>
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
