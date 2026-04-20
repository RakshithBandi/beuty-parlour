import React, { useState } from 'react';
import { ShoppingBag, User, Sun, Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    setIsMenuOpen(false);
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
        
        <nav className="nav-desktop">
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

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={styles.mobileMenu}
            >
              <button style={styles.closeMenuBtn} onClick={() => setIsMenuOpen(false)}>
                <X size={24} />
              </button>
              <ul style={styles.mobileNavList}>
                {navItems.map((item) => (
                  <li key={item} style={styles.mobileNavItem}>
                    <a 
                      href="#" 
                      onClick={(e) => handleNavClick(e, item)}
                      style={{
                        ...styles.mobileNavLink,
                        color: activeTab === item ? 'var(--primary)' : 'var(--text-main)'
                      }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

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
            <span className="cart-price-desktop" style={styles.price}>${cartTotal.toFixed(2)}</span>
            <button style={styles.actionBtn}>
              <ShoppingBag size={20} color="var(--icon-color)" />
              <span style={styles.cartBadge}>{cartCount}</span>
            </button>
          </div>

          <button className="menu-toggle" style={styles.menuToggle} onClick={() => setIsMenuOpen(true)}>
            <Menu size={24} color="var(--icon-color)" />
          </button>
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
    backgroundColor: '#1E90FF',
    color: '#fff',
    fontSize: '0.65rem',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  menuToggle: {
    padding: '0.5rem',
    marginLeft: '0.5rem',
  },
  mobileMenu: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: '85%',
    maxWidth: '400px',
    backgroundColor: 'var(--bg-card)',
    zIndex: 1000,
    padding: '5rem 3rem',
    boxShadow: '-10px 0 50px rgba(0,0,0,0.15)',
    display: 'flex',
    flexDirection: 'column',
    gap: '3rem',
  },
  closeMenuBtn: {
    position: 'absolute',
    top: '2rem',
    right: '2rem',
    color: 'var(--text-main)',
  },
  mobileNavList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '2.5rem',
  },
  mobileNavLink: {
    fontSize: '1.8rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontFamily: '"Playfair Display", serif',
  }
};

export default Header;
