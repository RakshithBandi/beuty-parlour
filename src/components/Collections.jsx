import React from 'react';
import { motion } from 'framer-motion';

const Collections = () => {
  return (
    <section className="section" style={styles.section}>
      <div className="container" style={styles.container}>
        
        <motion.div 
          style={{...styles.card, backgroundImage: 'url("/images/makeup.png")'}}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div style={styles.cardContent}>
            <span style={styles.subtitle}>NEW COLLECTIONS</span>
            <h3 style={styles.title}>Awesome<br/>Makeup<br/>Kit Gift<br/>Sets</h3>
            <p style={styles.desc}>Find your unique style.</p>
            <button className="btn-primary" style={styles.button}>SHOP NOW</button>
          </div>
        </motion.div>

        <motion.div 
          style={{...styles.card, backgroundImage: 'url("/images/skincare.png")'}}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div style={styles.cardContent}>
            <span style={styles.subtitle}>NEW COLLECTIONS</span>
            <h3 style={styles.title}>The<br/>Ultimate<br/>Skincare<br/>Regime</h3>
            <p style={styles.desc}>Find your unique style.</p>
            <button className="btn-primary" style={styles.button}>SHOP NOW</button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

const styles = {
  section: {
    backgroundColor: 'var(--bg-main)',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  '@media (min-width: 768px)': {
    container: {
      flexDirection: 'row',
    }
  },
  card: {
    flex: 1,
    height: '600px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '4rem',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: 'var(--bg-card)', // fallback
  },
  cardContent: {
    position: 'relative',
    zIndex: 2,
    color: '#fff',
  },
  subtitle: {
    fontSize: '0.8rem',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    marginBottom: '1.5rem',
    display: 'block',
  },
  title: {
    fontSize: '3.5rem',
    lineHeight: 1.1,
    marginBottom: '1.5rem',
    fontFamily: '"Playfair Display", serif',
  },
  desc: {
    fontSize: '1.2rem',
    marginBottom: '2.5rem',
  },
  button: {
    fontWeight: '600'
  }
};

export default Collections;
