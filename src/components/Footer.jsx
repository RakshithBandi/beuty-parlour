import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div className="container">
        <div style={styles.newsletter}>
          <h3 style={styles.newsletterTitle}>Subscribe to our newsletter</h3>
          <form style={styles.form}>
            <input 
              type="email" 
              placeholder="Your email address *" 
              style={styles.input}
              required
            />
            <button type="submit" className="btn-dark" style={styles.submitBtn}>
              SUBSCRIBE
            </button>
          </form>
        </div>

        <div style={styles.bottomArea}>
          <div style={styles.logoArea}>
            <h2 style={styles.logo}>Be Bold</h2>
            <div style={styles.socials}>
              {/* Add social icons here if needed */}
            </div>
          </div>
          
          <div style={styles.linksArea}>
            <div style={styles.linksColumn}>
              <a href="#" style={styles.link}>Shop All</a>
              <a href="#" style={styles.link}>Makeup</a>
              <a href="#" style={styles.link}>Skin Care</a>
            </div>
            <div style={styles.linksColumn}>
              <a href="#" style={styles.link}>Refund Policy</a>
              <a href="#" style={styles.link}>Terms & Conditions</a>
              <a href="#" style={styles.link}>FAQ</a>
            </div>
            <div style={styles.linksColumn}>
              <a href="#" style={styles.link}>Facebook</a>
              <a href="#" style={styles.link}>Twitter</a>
              <a href="#" style={styles.link}>Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: 'var(--bg-footer)',
    padding: '5rem 0',
  },
  newsletter: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    marginBottom: '5rem',
  },
  '@media (min-width: 768px)': {
    newsletter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }
  },
  newsletterTitle: {
    fontSize: '1.8rem',
    color: 'var(--text-title)',
  },
  form: {
    display: 'flex',
    gap: '1rem',
    width: '100%',
    maxWidth: '500px',
  },
  input: {
    flex: 1,
    padding: '1rem',
    border: '1px solid var(--border-color)',
    backgroundColor: 'transparent',
    color: 'var(--text-main)',
    fontSize: '1rem',
    outline: 'none',
  },
  submitBtn: {
    fontWeight: '600'
  },
  bottomArea: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3rem',
    justifyContent: 'space-between',
  },
  logoArea: {
    flex: 1,
  },
  logo: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: 'var(--text-title)',
    margin: 0,
    lineHeight: 1,
  },
  linksArea: {
    display: 'flex',
    gap: '4rem',
    flexWrap: 'wrap',
  },
  linksColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  link: {
    fontSize: '0.95rem',
    color: 'var(--text-main)',
    textDecoration: 'none',
  }
};

export default Footer;
