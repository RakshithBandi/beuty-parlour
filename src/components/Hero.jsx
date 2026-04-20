import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ onShopNow }) => {
  return (
    <section style={styles.hero}>
      <div className="container" style={styles.container}>
        <motion.div 
          style={styles.content}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span style={styles.subtitle}>MODERNIZING SALON OPERATIONS</span>
          <h2 style={styles.title}>Beauty Flow<br/>Management</h2>
          <p style={styles.description}>
            Automating daily operations to eliminate errors, data loss, and inefficient manual record keeping.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const styles = {
  hero: {
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    backgroundImage: 'url("/images/hero.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  container: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
  },
  content: {
    maxWidth: '500px',
    padding: '2rem 0',
  },
  subtitle: {
    fontSize: '0.85rem',
    letterSpacing: '3px',
    color: '#fff',
    textTransform: 'uppercase',
    marginBottom: '1rem',
    display: 'block',
  },
  title: {
    fontSize: '4.5rem',
    lineHeight: 1.1,
    color: '#fff',
    marginBottom: '1.5rem',
    fontFamily: '"Playfair Display", serif',
  },
  description: {
    fontSize: '1.1rem',
    color: '#f0f0f0',
    marginBottom: '2.5rem',
  },
  button: {
    fontWeight: '600',
  }
};

export default Hero;
