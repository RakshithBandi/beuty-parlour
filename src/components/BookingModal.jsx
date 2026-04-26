import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Clock, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BookingModal = ({ isOpen, onClose, services, onBookingSubmit, userName }) => {
  const [formData, setFormData] = useState({
    serviceId: services.length > 0 ? services[0].id : '',
    clientName: userName || '',
    date: '',
    time: '',
  });

  // Sync default service when services load
  useEffect(() => {
    if (services.length > 0 && !formData.serviceId) {
      setFormData(prev => ({ ...prev, serviceId: services[0].id }));
    }
  }, [services]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const service = services.find(s => s.id === parseInt(formData.serviceId));
    onBookingSubmit({
      id: Date.now(),
      serviceId: parseInt(formData.serviceId),
      serviceName: service?.name,
      price: service?.price,
      client: formData.clientName,
      date: `${formData.date}, ${formData.time}`,
    });
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      setFormData({ serviceId: services[0]?.id || '', clientName: '', date: '', time: '' });
    }, 2000);
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

          {isSubmitted ? (
            <div style={styles.successMessage}>
              <CheckCircle size={60} color="var(--primary)" />
              <h2 style={styles.modalTitle}>Booking Confirmed!</h2>
              <p style={styles.modalDesc}>Your appointment has been successfully scheduled. We look forward to seeing you!</p>
            </div>
          ) : (
            <>
              <h2 style={styles.modalTitle}>Book an Appointment</h2>
              <p style={styles.modalDesc}>Schedule your high-end beauty treatment with our expert team.</p>

              <form style={styles.form} onSubmit={handleSubmit}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Select Service</label>
                  <select 
                    name="serviceId" 
                    style={styles.input} 
                    value={formData.serviceId} 
                    onChange={handleChange}
                    required
                  >
                    {services.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Full Name</label>
                  <div style={styles.iconInput}>
                    <User size={18} style={styles.icon} />
                    <input 
                      type="text" 
                      name="clientName"
                      placeholder="Enter your name" 
                      style={styles.input} 
                      value={formData.clientName}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ ...styles.inputGroup, flex: 1 }}>
                    <label style={styles.label}>Date</label>
                    <div style={styles.iconInput}>
                      <Calendar size={18} style={styles.icon} />
                      <input 
                        type="date" 
                        name="date"
                        style={styles.input} 
                        value={formData.date}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                  </div>
                  <div style={{ ...styles.inputGroup, flex: 1 }}>
                    <label style={styles.label}>Time</label>
                    <div style={styles.iconInput}>
                      <Clock size={18} style={styles.icon} />
                      <input 
                        type="time" 
                        name="time"
                        style={styles.input} 
                        value={formData.time}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn-dark" style={styles.submitBtn}>
                  CONFIRM BOOKING
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(5px)',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 2000,
  },
  modal: {
    backgroundColor: 'var(--bg-card)',
    padding: '3rem',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '500px',
    position: 'relative',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  },
  closeBtn: {
    position: 'absolute', top: '1.5rem', right: '1.5rem',
    background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)',
  },
  modalTitle: {
    fontSize: '2rem', marginBottom: '0.5rem', fontWeight: '700',
    color: 'var(--text-title)', textAlign: 'center',
  },
  modalDesc: {
    color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem', textAlign: 'center',
  },
  form: {
    display: 'flex', flexDirection: 'column', gap: '1.5rem',
  },
  inputGroup: {
    display: 'flex', flexDirection: 'column', gap: '0.5rem',
  },
  label: {
    fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)', letterSpacing: '0.5px', textTransform: 'uppercase',
  },
  iconInput: {
    position: 'relative', display: 'flex', alignItems: 'center',
  },
  icon: {
    position: 'absolute', left: '1rem', color: 'var(--primary)',
  },
  input: {
    width: '100%', padding: '0.8rem 1rem 0.8rem 3rem',
    borderRadius: '8px', border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-main)', color: 'var(--text-main)',
    fontSize: '0.95rem', outline: 'none',
  },
  submitBtn: {
    width: '100%', height: '55px', fontSize: '0.9rem', fontWeight: '700',
    letterSpacing: '1.5px', marginTop: '1rem', borderRadius: '4px',
  },
  successMessage: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem', padding: '2rem 0',
  }
};

export default BookingModal;
