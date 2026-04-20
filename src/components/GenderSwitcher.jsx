import React from 'react';
import { motion } from 'framer-motion';

const GenderSwitcher = ({ gender, setGender }) => {
  return (
    <div style={styles.container}>
      <div style={styles.switcher}>
        <button 
          style={{
            ...styles.btn,
            backgroundColor: gender === 'Women' ? '#FDF2F7' : 'transparent',
            borderColor: gender === 'Women' ? '#E91E63' : '#ddd',
            color: gender === 'Women' ? '#E91E63' : '#666'
          }}
          onClick={() => setGender('Women')}
        >
          <img src="https://cdn-icons-png.flaticon.com/512/6997/6997662.png" alt="Women" style={styles.icon} />
          Women
        </button>
        <button 
          style={{
            ...styles.btn,
            backgroundColor: gender === 'Men' ? '#F2F6FD' : 'transparent',
            borderColor: gender === 'Men' ? '#1E90FF' : '#ddd',
            color: gender === 'Men' ? '#1E90FF' : '#666'
          }}
          onClick={() => setGender('Men')}
        >
          <img src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png" alt="Men" style={styles.icon} />
          Men
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    margin: '2rem 0',
  },
  switcher: {
    display: 'flex',
    gap: '12px',
    backgroundColor: 'var(--bg-card)',
    padding: '8px',
    borderRadius: '12px',
    border: '1px solid var(--border-color)',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 24px',
    borderRadius: '8px',
    border: '1px solid',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  icon: {
    width: '20px',
    height: '20px',
  }
};

export default GenderSwitcher;
