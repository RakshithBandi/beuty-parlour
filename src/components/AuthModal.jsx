import React, { useState } from 'react';
import { X, Mail, Lock, User, Globe, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const endpoint = isLogin ? 'https://beuty-backend.onrender.com/api/login' : 'https://beuty-backend.onrender.com/api/signup';
    
    // Prepare payload
    const payload = isLogin 
      ? { username: formData.email, password: formData.password } 
      : { username: formData.name.replace(/\s/g, '').toLowerCase(), email: formData.email, password: formData.password };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        onLoginSuccess(data.username, data.role === 'admin');
        onClose();
      } else {
        setError(data.detail || 'Authentication failed');
      }
    } catch (err) {
      setError('Connection to server failed');
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div style={styles.overlay} onClick={onClose}>
        <motion.div 
          style={styles.modal} 
          onClick={e => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
        >
          <button style={styles.closeBtn} onClick={onClose}>
            <X size={24} />
          </button>

          <div style={styles.tabs}>
            <button 
              style={{ ...styles.tab, borderBottom: isLogin ? '2px solid var(--primary)' : 'none', color: isLogin ? 'var(--text-main)' : 'var(--text-muted)' }}
              onClick={() => setIsLogin(true)}
            >
              LOGIN
            </button>
            <button 
              style={{ ...styles.tab, borderBottom: !isLogin ? '2px solid var(--primary)' : 'none', color: !isLogin ? 'var(--text-main)' : 'var(--text-muted)' }}
              onClick={() => setIsLogin(false)}
            >
              SIGN UP
            </button>
          </div>

          {error && <div style={{ color: '#F44336', backgroundColor: '#FFEBEE', padding: '0.8rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.85rem', textAlign: 'center', fontWeight: '500' }}>{error}</div>}

          <form style={styles.form} onSubmit={handleSubmit}>
            {!isLogin && (
              <div style={styles.inputGroup}>
                <User size={18} style={styles.icon} />
                <input 
                  type="text" 
                  name="name"
                  placeholder="Full Name" 
                  style={styles.input} 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>
            )}
            <div style={styles.inputGroup}>
              <Mail size={18} style={styles.icon} />
              <input 
                type="text" 
                name="email"
                placeholder="Username or Email" 
                style={styles.input} 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>
            <div style={styles.inputGroup}>
              <Lock size={18} style={styles.icon} />
              <input 
                type={showPassword ? "text" : "password"} 
                name="password"
                placeholder="Password" 
                style={styles.input} 
                value={formData.password}
                onChange={handleChange}
                required 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeBtn}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {isLogin && (
              <div style={styles.forgotPass}>
                <a href="#" style={styles.forgotLink}>Forgot Password?</a>
              </div>
            )}

            <button type="submit" className="btn-dark" style={styles.submitBtn}>
              {isLogin ? 'LOGIN' : 'CREATE ACCOUNT'}
            </button>
          </form>

          <div style={styles.divider}>
            <span style={styles.dividerText}>OR</span>
          </div>

          <div style={styles.socialButtons}>
            <button style={styles.socialBtn}>
              <Globe size={20} />
              <span>Google</span>
            </button>
            <button style={styles.socialBtn}>
              <User size={20} />
              <span>GitHub</span>
            </button>
          </div>

          <p style={styles.footerText}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              style={styles.toggleBtn} 
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(5px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'var(--bg-card)',
    padding: '2.5rem',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '450px',
    position: 'relative',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  },
  closeBtn: {
    position: 'absolute',
    top: '1.5rem',
    right: '1.5rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--text-muted)',
    transition: 'color 0.2s',
  },
  tabs: {
    display: 'flex',
    gap: '2rem',
    marginBottom: '2rem',
    borderBottom: '1px solid var(--border-color)',
  },
  tab: {
    fontSize: '0.9rem',
    fontWeight: '700',
    letterSpacing: '1px',
    padding: '0.5rem 0 1rem 0',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  inputGroup: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    left: '1rem',
    color: 'var(--text-muted)',
  },
  input: {
    width: '100%',
    padding: '1rem 1rem 1rem 3rem',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-main)',
    color: 'var(--text-main)',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  forgotPass: {
    textAlign: 'right',
  },
  forgotLink: {
    fontSize: '0.85rem',
    color: 'var(--primary)',
    textDecoration: 'none',
  },
  submitBtn: {
    width: '100%',
    height: '50px',
    fontSize: '1rem',
    fontWeight: '600',
    letterSpacing: '1px',
    marginTop: '0.5rem',
  },
  divider: {
    position: 'relative',
    textAlign: 'center',
    margin: '2rem 0',
  },
  dividerText: {
    backgroundColor: 'var(--bg-card)',
    padding: '0 1rem',
    color: 'var(--text-muted)',
    fontSize: '0.85rem',
    position: 'relative',
    zIndex: 1,
  },
  socialButtons: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
  },
  socialBtn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'transparent',
    color: 'var(--text-main)',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  footerText: {
    textAlign: 'center',
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
  },
  toggleBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--primary)',
    fontWeight: '600',
    cursor: 'pointer',
    padding: 0,
    marginLeft: '4px',
  },
  eyeBtn: {
    position: 'absolute',
    right: '1rem',
    color: 'var(--text-muted)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
  }
};

export default AuthModal;
