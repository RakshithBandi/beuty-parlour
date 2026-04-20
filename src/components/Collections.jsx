import React from 'react';
import { motion } from 'framer-motion';

const Collections = ({ gender, onShopClick }) => {
  const currentCategories = [
    { id: 'hair', name: 'Hair Cut & Style', img: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=300&h=300' },
    { id: 'skin', name: 'Skin Care', img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=300&h=300' },
    { id: 'massage_1', name: 'Swedish Massage', img: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=300&h=300' },
    { id: 'pedi', name: 'Royal Pedicure', img: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=300&h=300' },
    { id: 'bridal', name: 'Bridal Perfection', img: 'https://images.unsplash.com/photo-1522337360788-8b13df793f1f?auto=format&fit=crop&q=80&w=300&h=300' },
    { id: 'color', name: 'Global Colour', img: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=300&h=300' }
  ];

  return (
    <section className="section" style={styles.section}>
      <div className="container" style={styles.container}>
        <h3 style={styles.sectionTitle}>Explore Our Categories</h3>
        <div className="no-scrollbar" style={styles.categoryGrid}>
          {currentCategories.map((cat) => (
            <motion.div 
              key={cat.id} 
              style={styles.categoryItem}
              whileHover={{ y: -5 }}
              onClick={() => onShopClick('SERVICES')}
            >
              <div style={{...styles.iconCircle, backgroundImage: `url(${cat.img})`}}>
                {cat.isNew && <span style={styles.newBadge}>New</span>}
              </div>
              <span style={styles.categoryName}>{cat.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: '3rem 0',
    backgroundColor: 'var(--bg-main)',
  },
  container: {
    textAlign: 'left',
  },
  sectionTitle: {
    fontSize: '1.8rem',
    fontFamily: '"Playfair Display", serif',
    fontWeight: '700',
    marginBottom: '2rem',
    color: 'var(--text-title)',
  },
  categoryGrid: {
    display: 'flex',
    gap: '2rem',
    overflowX: 'auto',
    paddingBottom: '1rem',
  },
  categoryItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    minWidth: '120px',
    cursor: 'pointer',
  },
  iconCircle: {
    width: '100px',
    height: '100px',
    borderRadius: '20px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#F7F2F0',
    position: 'relative',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
  },
  categoryName: {
    fontSize: '0.9rem',
    fontWeight: '600',
    textAlign: 'center',
    color: 'var(--text-main)',
    width: '100%',
  },
  newBadge: {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    backgroundColor: '#ff4d4d',
    color: 'white',
    fontSize: '0.65rem',
    padding: '2px 8px',
    borderRadius: '10px',
    fontWeight: '700',
    textTransform: 'uppercase',
  }
};

export default Collections;
