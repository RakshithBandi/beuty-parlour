import React from 'react';
import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    {
      icon: '✨',
      title: 'Quick Confirmation',
      desc: 'Instant digital confirmation for your parlour appointments.'
    },
    {
      icon: '📋',
      title: 'Digital Records',
      desc: 'Secure customer profiles and service history management.'
    },
    {
      icon: '🎁',
      title: 'Seasonal Offers',
      desc: 'Affordable service packages and special seasonal discounts.'
    }
  ];

  return (
    <section style={styles.section}>
      <div className="container" style={styles.container}>
        <div style={styles.titleArea}>
          <h3 style={styles.whyTitle}>WHY CHOOSE US</h3>
          <div style={styles.line}></div>
        </div>
        <div style={styles.featuresList}>
          {features.map((feature, idx) => (
            <motion.div 
              key={idx} 
              style={styles.featureItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <div style={styles.iconCircle}>{feature.icon}</div>
              <div>
                <h4 style={styles.title}>{feature.title}</h4>
                <p style={styles.desc}>{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: '4rem 0',
    backgroundColor: 'var(--bg-main)',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3rem',
  },
  '@media (min-width: 768px)': {
    container: {
      flexDirection: 'row',
    }
  },
  titleArea: {
    width: '100%',
    maxWidth: '250px',
  },
  whyTitle: {
    fontSize: '0.9rem',
    color: 'var(--text-sub)',
    letterSpacing: '2px',
    marginBottom: '1rem',
    fontFamily: '"Outfit", sans-serif',
  },
  line: {
    width: '50px',
    height: '1px',
    backgroundColor: 'var(--secondary)',
  },
  featuresList: {
    display: 'flex',
    flex: 1,
    gap: '2rem',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  featureItem: {
    display: 'flex',
    gap: '1.5rem',
    flex: '1 1 250px',
  },
  iconCircle: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: 'var(--secondary)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.5rem',
    flexShrink: 0,
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
    color: 'var(--text-title)',
  },
  desc: {
    color: 'var(--text-muted)',
    fontSize: '0.95rem',
    lineHeight: 1.6,
  }
};

export default Features;
