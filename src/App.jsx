import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Collections from './components/Collections';
import Features from './components/Features';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

function App() {
  const [activeTab, setActiveTab] = useState('CHOICES');
  const [theme, setTheme] = useState('light');
  const [gender] = useState('Women');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => t === 'light' ? 'dark' : 'light');
  };
  const [cartItems, setCartItems] = useState([]);
  const [expandedService, setExpandedService] = useState(null);
  const [services, setServices] = useState([
    { id: 1, name: 'Hair Styling & Cutting', img: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600', price: '$85.00', duration: '60 min', staffId: 1, targetGender: 'Women', description: 'Expert hair cutting and styling tailored to your face shape and personal style.' },
    { id: 2, name: 'Luxury Spa Facial', img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600', price: '$120.00', duration: '90 min', staffId: 2, targetGender: 'Women', description: 'Rejuvenating facial treatment using premium organic products to restore skin glow.' },
    { id: 3, name: 'Premium Manicure', img: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=600', price: '$45.00', duration: '45 min', staffId: 3, targetGender: 'Women', description: 'Complete nail care including shaping, cuticle work, and long-lasting polish.' },
    { id: 6, name: 'Swedish Wellness Massage', img: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=600', price: '$135.00', duration: '90 min', staffId: 3, targetGender: 'Women', description: 'Gentle and soothing Swedish massage to improve circulation and promote total relaxation.' },
    { id: 7, name: 'Aromatherapy Ritual', img: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=600', price: '$110.00', duration: '75 min', staffId: 1, targetGender: 'Women', description: 'Holistic treatment using essential oils to balance the body and mind during a soft-pressure massage.' },
    { id: 10, name: 'Royal Spa Pedicure', img: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=600', price: '$55.00', duration: '60 min', staffId: 1, targetGender: 'Women', description: 'Luxury foot soak, exfoliation, and massage followed by expert nail shaping and polishing.' },
    { id: 11, name: 'Bridal Perfection', img: 'https://images.unsplash.com/photo-1522337360788-8b13df793f1f?auto=format&fit=crop&q=80&w=600', price: '$350.00', duration: '240 min', staffId: 2, targetGender: 'Women', description: 'Comprehensive bridal package including hair, makeup, and pre-wedding skin prep.' }
  ]);
  const [staff, setStaff] = useState([
    { id: 1, name: 'Samantha W.', role: 'Senior Stylist', specialty: 'Hair' },
    { id: 2, name: 'Jessica K.', role: 'Skin Specialist', specialty: 'Facials' },
    { id: 3, name: 'Lisa T.', role: 'Nail Artist', specialty: 'Manicure' }
  ]);
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Khushi', email: 'khushi@gmail.com', phone: '9908123456', regDate: '2023-10-15 10:00:22' },
    { id: 2, name: 'Rohi Singh', email: 'rohi@gmail.com', phone: '9445234378', regDate: '2023-10-15 11:20:41' },
    { id: 3, name: 'Abhi Singh', email: 'abhi@gmail.com', phone: '234563849', regDate: '2023-10-15 14:15:20' },
    { id: 4, name: 'Test Sample', email: 'sample@gmail.com', phone: '234563849', regDate: '2023-08-08 11:15:30' },
    { id: 5, name: 'Anuj Kumar', email: 'test@test.com', phone: '1234547890', regDate: '2023-05-07 14:22:54' },
    { id: 6, name: 'Tisa Khan', email: 'tisa@gmail.com', phone: '978578788', regDate: '2023-09-11 14:31:44' },
    { id: 7, name: 'John Doe', email: 'johndoe@gmail.com', phone: '1452362341', regDate: '2023-09-23 13:50:50' }
  ]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const [bookings, setBookings] = useState([
    { id: 101, customer: 'Alice Johnson', service: 'Hair Styling & Cutting', date: 'Oct 24, 2023', time: '10:00 AM', price: 85, status: 'Confirmed' },
    { id: 102, customer: 'Mary Smith', service: 'Luxury Spa Facial', date: 'Oct 24, 2023', time: '11:30 AM', price: 120, status: 'Confirmed' },
    { id: 201, customer: 'Sarah Connor', service: 'Full Body Massage', date: 'Oct 25, 2023', time: '02:00 PM', price: 150, status: 'Confirmed' },
    { id: 301, customer: 'Linda Ray', service: 'Premium Manicure', date: 'Oct 26, 2023', time: '09:00 AM', price: 45, status: 'Confirmed' },
    { id: 401, customer: 'Khushi', service: 'Waxing', date: 'Oct 26, 2023', time: '12:30 PM', price: 40, status: 'Rejected' }
  ]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleLoginSuccess = (name) => {
    setIsLoggedIn(true);
    setUserName(name);
    setIsAdmin(name.toLowerCase().includes('admin'));
    setIsAuthModalOpen(false);
    setShowWelcome(true);
    setTimeout(() => setShowWelcome(false), 4000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
  };

  const handleBookingSubmit = (newBooking) => {
    const service = services.find(s => s.id === parseInt(newBooking.serviceId));
    setBookings(prev => [
      ...prev,
      {
        id: Date.now(),
        customer: newBooking.client,
        service: service ? service.name : 'Salon Service',
        date: newBooking.date,
        time: newBooking.time || '10:00 AM',
        price: service ? service.price : '$0.00',
        status: 'Pending'
      }
    ]);
  };

  const handleEditStaff = (serviceId) => {
    const service = services.find(s => s.id === serviceId);
    const staffNames = staff.map(s => `${s.id}: ${s.name}`).join('\n');
    const newStaffId = prompt(`Current staff: ${staff.find(s => s.id === service.staffId)?.name}\nAvailable Staff:\n${staffNames}\nEnter Staff ID:`, service.staffId);
    if (newStaffId && staff.find(s => s.id === parseInt(newStaffId))) {
      setServices(prev => prev.map(svc => svc.id === serviceId ? { ...svc, staffId: parseInt(newStaffId) } : svc));
    }
  };

  const toggleBookings = (id) => {
    setExpandedService(prev => prev === id ? null : id);
  };

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: Math.max(0, item.quantity + delta) };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'CHOICES':
        return (
          <>
            <Hero />
            {!isLoggedIn ? (
              <div style={{ padding: '4rem 2rem', textAlign: 'center', backgroundColor: 'var(--bg-main)' }}>
                <h2 style={{ fontSize: '2.5rem', fontFamily: '"Playfair Display", serif', marginBottom: '1.5rem' }}>Experience Luxury</h2>
                <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2rem' }}>Sign in to explore our personalized beauty services and exclusive grooming collections.</p>
                <button className="btn-dark" onClick={() => setIsAuthModalOpen(true)}>Login to Start</button>
              </div>
            ) : (
              <div style={{ padding: '4rem 0', backgroundColor: 'var(--bg-main)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                  <h3 style={{ fontSize: '2rem', fontFamily: '"Playfair Display", serif', marginBottom: '3rem' }}>Personalize Your Experience</h3>
                  
                  <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '5rem' }}>
                    <div 
                      style={{ 
                        width: '500px', 
                        height: '600px', 
                        backgroundImage: 'url("https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?auto=format&fit=crop&q=80&w=800")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '24px',
                        position: 'relative',
                        overflow: 'hidden',
                        border: '4px solid var(--primary)',
                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                      }}
                      className="gender-card"
                    >
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '3rem 2rem', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', color: 'white', textAlign: 'left' }}>
                        <h4 style={{ fontSize: '2.5rem', margin: 0, fontFamily: '"Playfair Display", serif' }}>Women's Haven</h4>
                        <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>Explores facials, hair styling, and bridal services designed for you.</p>
                      </div>
                    </div>
                  </div>

                  <Collections gender={gender} onShopClick={(tab) => setActiveTab(tab)} />

                  <div style={{ marginTop: '5rem', textAlign: 'left' }}>
                    <h3 style={{ fontSize: '1.8rem', fontFamily: '"Playfair Display", serif', marginBottom: '2rem' }}>Top Rated Services</h3>
                    <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem', scrollbarWidth: 'none' }}>
                      {services.filter(s => s.targetGender === gender).slice(0, 4).map(s => (
                        <div key={s.id} onClick={() => setActiveTab('SERVICES')} style={{ minWidth: '280px', cursor: 'pointer' }}>
                          <div style={{ width: '100%', height: '180px', borderRadius: '16px', backgroundImage: `url(${s.img})`, backgroundSize: 'cover', backgroundPosition: 'center', marginBottom: '1rem' }}></div>
                          <h4 style={{ fontSize: '1.1rem', margin: '0 0 0.5rem 0' }}>{s.name}</h4>
                          <div style={{ display: 'flex', gap: '5px', color: '#FFD700', fontSize: '0.8rem', marginBottom: '0.5rem' }}>★★★★★</div>
                          <p style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: '700' }}>{s.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <Features />
          </>
        );
      case 'HAIR CARE':
        return (
          <section style={{ padding: '6rem 2rem', backgroundColor: 'var(--bg-main)', minHeight: '80vh' }}>
            <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '3rem', fontFamily: '"Playfair Display", serif', marginBottom: '1rem', textAlign: 'center' }}>Professional Hair Care</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', textAlign: 'center', marginBottom: '4rem' }}>Expert styling and maintenance using modern digital management.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {[
                  { id: 'hc-1', name: 'Precision Haircut', img: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80&w=500', price: '$45.00' },
                  { id: 'hc-2', name: 'Deep Conditioning', img: 'https://images.unsplash.com/photo-1527799822367-3188572f344b?auto=format&fit=crop&q=80&w=500', price: '$65.00' }
                ].map(svc => (
                  <div key={svc.id} style={{ backgroundColor: 'var(--bg-card-alt)', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-color)' }} className="service-card">
                    <div style={{ height: '250px', backgroundImage: `url(${svc.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                    <div style={{ padding: '2rem', textAlign: 'left' }}>
                      <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', fontFamily: '"Playfair Display", serif' }}>{svc.name}</h3>
                      <p style={{ color: 'var(--primary)', fontWeight: '700', marginBottom: '1.5rem' }}>{svc.price}</p>
                      <button onClick={() => setIsBookingModalOpen(true)} className="btn-dark" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }}>Book Appointment</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      case 'SKIN CARE':
        return (
          <section style={{ padding: '6rem 2rem', backgroundColor: 'var(--bg-main)', minHeight: '80vh' }}>
            <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '3rem', fontFamily: '"Playfair Display", serif', marginBottom: '1rem', textAlign: 'center' }}>Advanced Skincare</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', textAlign: 'center', marginBottom: '4rem' }}>Rejuvenating treatments tracked via your unique digital profile.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {[
                  { id: 'sc-1', name: 'Hydra Glow Facial', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=500', price: '$110.00' },
                  { id: 'sc-2', name: 'Anti-Aging Therapy', img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=500', price: '$150.00' },
                  { id: 'sc-3', name: 'Skin Brightening', img: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=500', price: '$95.00' }
                ].map(svc => (
                  <div key={svc.id} style={{ backgroundColor: 'var(--bg-card-alt)', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-color)' }} className="service-card">
                    <div style={{ height: '250px', backgroundImage: `url(${svc.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                    <div style={{ padding: '2rem', textAlign: 'left' }}>
                      <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', fontFamily: '"Playfair Display", serif' }}>{svc.name}</h3>
                      <p style={{ color: 'var(--primary)', fontWeight: '700', marginBottom: '1.5rem' }}>{svc.price}</p>
                      <button onClick={() => setIsBookingModalOpen(true)} className="btn-dark" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }}>Book Appointment</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      case 'MAKEUP':
        return (
          <section style={{ padding: '6rem 2rem', backgroundColor: 'var(--bg-main)', minHeight: '80vh' }}>
            <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '3rem', fontFamily: '"Playfair Display", serif', marginBottom: '1rem', textAlign: 'center' }}>Exquisite Makeup</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', textAlign: 'center', marginBottom: '4rem' }}>Professional artistry for your most memorable moments.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {[
                  { id: 'mu-1', name: 'Bridal Transformation', img: 'https://images.unsplash.com/photo-1522337360788-8b13df793f1f?auto=format&fit=crop&q=80&w=500', price: '$250.00' },
                  { id: 'mu-2', name: 'Evening Glamour', img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=500', price: '$85.00' },
                  { id: 'mu-3', name: 'Special Occasion', img: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=500', price: '$120.00' }
                ].map(svc => (
                  <div key={svc.id} style={{ backgroundColor: 'var(--bg-card-alt)', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-color)' }} className="service-card">
                    <div style={{ height: '250px', backgroundImage: `url(${svc.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                    <div style={{ padding: '2rem', textAlign: 'left' }}>
                      <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', fontFamily: '"Playfair Display", serif' }}>{svc.name}</h3>
                      <p style={{ color: 'var(--primary)', fontWeight: '700', marginBottom: '1.5rem' }}>{svc.price}</p>
                      <button onClick={() => setIsBookingModalOpen(true)} className="btn-dark" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }}>Book Appointment</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      case 'SALON AT HOME':
        return (
          <section style={{ padding: '6rem 2rem', backgroundColor: 'var(--bg-main)', minHeight: '80vh' }}>
            <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '3rem', fontFamily: '"Playfair Display", serif', marginBottom: '1rem' }}>Salon at Home</h2>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
                   <button style={{ padding: '0.8rem 2.5rem', borderRadius: '30px', border: '1px solid var(--border-color)', backgroundColor: 'var(--primary)', color: 'white', fontWeight: '600' }}>Women</button>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Professional beauty services delivered at your doorstep.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                {[
                  { id: 'sah-1', name: 'Brazilian Waxing', img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=500', price: '$40.00', category: 'Waxing', target: 'Women' },
                  { id: 'sah-2', name: 'Expert Threading', img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=500', price: '$15.00', category: 'Threading', target: 'Women' },
                  { id: 'sah-3', name: 'Deluxe Mani-Pedi', img: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=500', price: '$75.00', category: 'Mani Pedi', target: 'Women' },
                  { id: 'sah-4', name: 'Insta-Glow CleanUp', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=500', price: '$45.00', category: 'Clean Up', target: 'Women' },
                  { id: 'sah-5', name: 'Keratin Hair Facial', img: 'https://images.unsplash.com/photo-1527799822367-3188572f344b?auto=format&fit=crop&q=80&w=500', price: '$90.00', category: 'Hair Facial', target: 'Women' },
                ].filter(s => s.target === gender).map(svc => (
                  <div key={svc.id} style={{ backgroundColor: 'var(--bg-card-alt)', borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }} className="service-card">
                    <div style={{ height: '220px', backgroundImage: `url(${svc.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                       <span style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: 'rgba(255,255,255,0.9)', padding: '5px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)' }}>{svc.category}</span>
                    </div>
                    <div style={{ padding: '2rem', textAlign: 'left' }}>
                      <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', fontFamily: '"Playfair Display", serif' }}>{svc.name}</h3>
                      <p style={{ color: 'var(--primary)', fontWeight: '700', marginBottom: '1.5rem', fontSize: '1.2rem' }}>{svc.price}</p>
                      <button onClick={() => setIsBookingModalOpen(true)} className="btn-dark" style={{ width: '100%', padding: '1rem', borderRadius: '12px', fontWeight: '600' }}>Schedule at Home</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      case 'OFFERS':
        return (
          <section style={{ padding: '6rem 2rem', backgroundColor: 'var(--bg-main)', minHeight: '80vh' }}>
            <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                <h2 style={{ fontSize: '3.5rem', fontFamily: '"Playfair Display", serif', marginBottom: '1.5rem' }}>Exclusive Offers</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>Indulge in our premium salon experiences with specially curated seasonal discounts and membership packages.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
                {[
                  {
                    id: 'offer-1',
                    title: 'Bridal Perfection Package',
                    desc: 'Full hair, makeup, and skin prep for your big day. Includes a complimentary trial.',
                    offer: '20% OFF',
                    img: 'https://images.unsplash.com/photo-1522337360788-8b13df793f1f?auto=format&fit=crop&q=80&w=800',
                    color: '#B38E7D'
                  },
                  {
                    id: 'offer-2',
                    title: 'Summer Glow Combo',
                    desc: 'Combine any Facial Ritual with a Full Body Massage for ultimate rejuvenation.',
                    offer: 'BUY 1 GET 1 AT 50%',
                    img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800',
                    color: '#E91E63'
                  },
                  {
                    id: 'offer-3',
                    title: 'First-Visit Welcome',
                    desc: 'A special welcome for our new guests on any service above $50.',
                    offer: 'FLAT $20 OFF',
                    img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800',
                    color: '#1E90FF'
                  },
                  {
                    id: 'offer-4',
                    title: 'The Duo Massage Deal',
                    desc: 'Bring a friend or partner for side-by-side Swedish or Deep Tissue massages.',
                    offer: '$40 GIFT CARD',
                    img: 'https://images.unsplash.com/photo-1544161515-4af6b1d462c2?auto=format&fit=crop&q=80&w=800',
                    color: '#4CAF50'
                  }
                ].map(item => (
                  <div key={item.id} style={{ backgroundColor: 'var(--bg-card-alt)', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border-color)', position: 'relative', transition: 'all 0.3s ease' }} className="service-card">
                    <div style={{ height: '300px', backgroundImage: `url(${item.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                      <div style={{ position: 'absolute', top: '20px', left: '20px', backgroundColor: item.color, color: 'white', padding: '8px 20px', borderRadius: '40px', fontWeight: '800', fontSize: '0.85rem', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', letterSpacing: '1px' }}>
                        {item.offer}
                      </div>
                    </div>
                    <div style={{ padding: '2.5rem', textAlign: 'left' }}>
                      <h3 style={{ fontSize: '1.6rem', marginBottom: '1rem', fontFamily: '"Playfair Display", serif' }}>{item.title}</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: '1.6' }}>{item.desc}</p>
                      <button onClick={() => { setActiveTab('SERVICES'); setIsBookingModalOpen(true); }} className="btn-dark" style={{ width: '100%', padding: '1.2rem', borderRadius: '12px', fontWeight: '700', fontSize: '0.9rem', letterSpacing: '1px' }}>CLAIM THIS OFFER</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      case 'BOOKINGS':
        return (
          <section style={{ padding: '6rem 2rem', backgroundColor: 'var(--bg-main)', minHeight: '80vh' }}>
            <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
                 <h2 style={{ fontSize: '3rem', fontFamily: '"Playfair Display", serif' }}>All Bookings</h2>
                 <button onClick={() => setIsBookingModalOpen(true)} className="btn-dark" style={{ padding: '0.8rem 1.8rem', borderRadius: '30px' }}>+ New Booking</button>
              </div>

              <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: '24px', padding: '2.5rem', border: '1px solid var(--border-color)', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                      <th style={{ padding: '1.5rem', color: 'var(--text-sub)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Client</th>
                      <th style={{ padding: '1.5rem', color: 'var(--text-sub)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Service</th>
                      <th style={{ padding: '1.5rem', color: 'var(--text-sub)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Date & Time</th>
                      <th style={{ padding: '1.5rem', color: 'var(--text-sub)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Status</th>
                      <th style={{ padding: '1.5rem', textAlign: 'right', color: 'var(--text-sub)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b) => (
                      <tr key={b.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s ease' }}>
                        <td style={{ padding: '1.5rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                             <div style={{ width: '35px', height: '35px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                               {b.customer ? b.customer[0] : '?'}
                             </div>
                             <span style={{ fontWeight: '600' }}>{b.customer || 'Unknown Client'}</span>
                          </div>
                        </td>
                        <td style={{ padding: '1.5rem' }}>{b.service}</td>
                        <td style={{ padding: '1.5rem' }}>
                          <p style={{ margin: 0, fontWeight: '500' }}>{b.date}</p>
                          <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{b.time}</p>
                        </td>
                        <td style={{ padding: '1.5rem' }}>
                          <span style={{ 
                            padding: '6px 12px', 
                            borderRadius: '20px', 
                            fontSize: '0.75rem', 
                            fontWeight: '700', 
                            backgroundColor: b.status === 'Confirmed' ? '#E8F5E9' : '#FFF3E0',
                            color: b.status === 'Confirmed' ? '#2E7D32' : '#EF6C00'
                          }}>
                            {b.status}
                          </span>
                        </td>
                        <td style={{ padding: '1.5rem', textAlign: 'right' }}>
                          <button style={{ color: 'var(--text-muted)', fontSize: '1.1rem', cursor: 'pointer' }}>⋯</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {Object.keys(bookings).length === 0 && (
                  <div style={{ padding: '5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <p>No active bookings found.</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      case 'SERVICES':
        return (
          <section style={{ padding: '6rem 2rem', backgroundColor: 'var(--bg-main)', minHeight: '60vh' }}>
            <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '3rem', fontFamily: '"Playfair Display", serif', marginBottom: '1rem', textAlign: 'center' }}>{gender}'s Services</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', textAlign: 'center', marginBottom: '4rem' }}>Exquisite treatments designed specifically for {gender.toLowerCase()}.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {services.filter(s => s.targetGender === gender).map((svc) => {
                  const assignedStaff = staff.find(s => s.id === svc.staffId);
                  return (
                    <div key={svc.id} style={{ backgroundColor: 'var(--bg-card-alt)', border: '1px solid var(--border-color)', borderRadius: '16px', overflow: 'hidden', transition: 'transform 0.3s ease' }} className="service-card">
                      <div style={{ height: '220px', backgroundImage: `url(${svc.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                      <div style={{ padding: '2rem' }}>
                        <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', fontFamily: '"Playfair Display", serif' }}>{svc.name}</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>{svc.description}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: '600' }}>
                          <span style={{ color: 'var(--primary)' }}>{svc.price}</span>
                          <span style={{ color: 'var(--text-main)' }}>{svc.duration}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', padding: '10px', backgroundColor: 'var(--bg-main)', borderRadius: '8px' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>{assignedStaff?.name[0]}</div>
                          <div>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0' }}>Assigned Stylist</p>
                            <p style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)' }}>{assignedStaff?.name}</p>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button onClick={() => setIsBookingModalOpen(true)} className="btn-dark" style={{ flex: 1, padding: '0.8rem', borderRadius: '8px' }}>Book Now</button>
                          {isAdmin && (
                            <button onClick={() => handleEditStaff(svc.id)} style={{ padding: '0.8rem', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer' }}>⚙</button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      case 'ADMIN':
        if (!isAdmin) {
          return <div style={{ padding: '10rem', textAlign: 'center' }}><h2>Access Denied</h2><p>You must be an administrator to view this page.</p></div>;
        }
        const stats = [
           { label: 'Total Customer', value: customers.length, color: '#3F51B5' },
           { label: 'Total Appointment', value: bookings.length, color: '#607D8B' },
           { label: 'Total Accepted Apt', value: bookings.filter(b => b.status === 'Confirmed').length, color: '#FF9800' },
           { label: 'Total Rejected Apt', value: bookings.filter(b => b.status === 'Rejected').length, color: '#673AB7' },
           { label: 'Total Services', value: services.length, color: '#009688' },
           { label: 'Today Sales', value: '$' + bookings.filter(b => b.date.includes('26')).reduce((acc, b) => acc + (typeof b.price === 'number' ? b.price : 0), 0), color: '#FF5722' },
           { label: 'Yesterday Sales', value: '$150', color: '#3F51B5' },
           { label: 'Last 7 Days Sale', value: '$5600', color: '#607D8B' },
           { label: 'Total Sales', value: '$10400', color: '#FF5722' }
        ];
        return (
          <section style={{ padding: '6rem 2rem', backgroundColor: 'var(--bg-main)', minHeight: '80vh' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '2.5rem', fontFamily: '"Playfair Display", serif', marginBottom: '3rem' }}>Admin Dashboard</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '5rem' }}>
                 {stats.map((stat, idx) => (
                   <div key={idx} style={{ 
                     display: 'flex', 
                     justifyContent: 'space-between', 
                     alignItems: 'center', 
                     padding: '2.5rem 2rem', 
                     backgroundColor: stat.color, 
                     color: 'white', 
                     borderRadius: '4px',
                     boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                   }}>
                      <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '500', opacity: 0.9 }}>{stat.label}</h4>
                      <span style={{ fontSize: '1.8rem', fontWeight: '700' }}>{stat.value}</span>
                   </div>
                 ))}
              </div>

              <div style={{ marginBottom: '5rem' }}>
                <h3 style={{ fontSize: '2rem', fontFamily: '"Playfair Display", serif', marginBottom: '2rem' }}>Customer List</h3>
                <div style={{ backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '4px', overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#F8F9FA', borderBottom: '1px solid #ddd' }}>
                        <th style={{ padding: '1rem', color: '#333', fontSize: '0.9rem', fontWeight: '700' }}>#</th>
                        <th style={{ padding: '1rem', color: '#333', fontSize: '0.9rem', fontWeight: '700' }}>Name</th>
                        <th style={{ padding: '1rem', color: '#333', fontSize: '0.9rem', fontWeight: '700' }}>Mobile Number</th>
                        <th style={{ padding: '1rem', color: '#333', fontSize: '0.9rem', fontWeight: '700' }}>Email</th>
                        <th style={{ padding: '1rem', color: '#333', fontSize: '0.9rem', fontWeight: '700' }}>Registration Date</th>
                        <th style={{ padding: '1rem', color: '#333', fontSize: '0.9rem', fontWeight: '700' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((c, idx) => (
                        <tr key={c.id} style={{ borderBottom: '1px solid #eee' }}>
                           <td style={{ padding: '1rem' }}>{idx + 1}</td>
                           <td style={{ padding: '1rem', fontWeight: '600' }}>{c.name}</td>
                           <td style={{ padding: '1rem' }}>{c.phone}</td>
                           <td style={{ padding: '1rem' }}>{c.email}</td>
                           <td style={{ padding: '1rem' }}>{c.regDate}</td>
                           <td style={{ padding: '1rem' }}>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                 <button style={{ padding: '5px 10px', backgroundColor: '#3F51B5', color: 'white', border: 'none', borderRadius: '3px', fontSize: '0.7rem' }}>Assign Services</button>
                                 <button style={{ padding: '5px 10px', backgroundColor: '#F44336', color: 'white', border: 'none', borderRadius: '3px', fontSize: '0.7rem' }}>Delete</button>
                              </div>
                           </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '2rem', fontFamily: '"Playfair Display", serif', marginBottom: '2rem' }}>Staff Management</h3>
                <div style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', display: 'grid', gap: '1.5rem' }}>
                   {staff.map(member => (
                     <div key={member.id} style={{ padding: '2rem', backgroundColor: 'var(--bg-card)', borderRadius: '16px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 'bold' }}>{member.name[0]}</div>
                        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>{member.name}</h4>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase' }}>{member.role}</p>
                        <p style={{ margin: '0.8rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Expertise: {member.specialty}</p>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </section>
        );
      case 'CHECKOUT':
        return (
          <section style={{ padding: '8rem 2rem', backgroundColor: 'var(--bg-main)', minHeight: '80vh' }}>
            <div className="container" style={{ maxWidth: '600px', margin: '0 auto' }}>
               <h2 style={{ fontSize: '2.5rem', fontFamily: '"Playfair Display", serif', marginBottom: '2rem', textAlign: 'center' }}>Secure Checkout</h2>
               <div style={{ backgroundColor: 'var(--bg-card)', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid var(--border-color)' }}>
                 <div style={{ marginBottom: '2rem' }}>
                    <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Order Summary</h4>
                    {cartItems.map(item => (
                      <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                        <span>{item.name} x {item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '1rem', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '1.2rem' }}>
                      <span>Total</span>
                      <span style={{ color: 'var(--primary)' }}>${cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0).toFixed(2)}</span>
                    </div>
                 </div>

                 <div style={{ marginBottom: '2rem' }}>
                   <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Payment Gateway</h4>
                   <div style={{ padding: '1rem', backgroundColor: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '1rem' }}>
                      <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Card Number</p>
                      <p style={{ margin: 0, fontSize: '1rem', letterSpacing: '2px' }}>•••• •••• •••• 4242</p>
                   </div>
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                     <div style={{ padding: '1rem', backgroundColor: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                        <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Expiry</p>
                        <p style={{ margin: 0 }}>12/25</p>
                     </div>
                     <div style={{ padding: '1rem', backgroundColor: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                        <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>CVV</p>
                        <p style={{ margin: 0 }}>•••</p>
                     </div>
                   </div>
                 </div>

                 <button className="btn-dark" style={{ width: '100%', padding: '1.2rem', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '600' }} onClick={() => { alert('Payment successful! Your order is being processed.'); setCartItems([]); setActiveTab('CHOICES'); }}>
                   Complete Purchase
                 </button>
                 <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1rem' }}>🔒 Encryption enabled. Your payment information is secure.</p>
               </div>
            </div>
          </section>
        );
      case 'ABOUT':
        return (
          <section style={{ padding: '8rem 2rem', backgroundColor: 'var(--bg-main)', minHeight: '60vh' }}>
            <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <h2 style={{ fontSize: '3.5rem', fontFamily: '"Playfair Display", serif', marginBottom: '2rem' }}>About Beauty Flow</h2>
              <p style={{ color: 'var(--text-sub)', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                At Beauty Flow, we believe that beauty is a true expression of individuality. Established in 2023, our boutique parlour has been dedicated to providing a sanctuary where luxury meets personalized care.
              </p>
              <p style={{ color: 'var(--text-sub)', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '3rem' }}>
                Our team of passionate experts specializes in premium hair styling, rejuvenating spa facials, and meticulous nail care, utilizing only the finest international product lines. We are committed to not just enhancing your natural beauty, but elevating your confidence every time you walk out our doors.
              </p>
              
              <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <div style={{ padding: '2rem', backgroundColor: 'var(--bg-card)', borderRadius: '8px', flex: '1 1 200px' }}>
                  <h4 style={{ fontSize: '2rem', fontFamily: '"Playfair Display", serif', marginBottom: '0.5rem', color: 'var(--primary)' }}>10k+</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>Happy Clients</p>
                </div>
                <div style={{ padding: '2rem', backgroundColor: 'var(--bg-card)', borderRadius: '8px', flex: '1 1 200px' }}>
                  <h4 style={{ fontSize: '2rem', fontFamily: '"Playfair Display", serif', marginBottom: '0.5rem', color: 'var(--primary)' }}>50+</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>Expert Stylists</p>
                </div>
                <div style={{ padding: '2rem', backgroundColor: 'var(--bg-card)', borderRadius: '8px', flex: '1 1 200px' }}>
                  <h4 style={{ fontSize: '2rem', fontFamily: '"Playfair Display", serif', marginBottom: '0.5rem', color: 'var(--primary)' }}>15+</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>Awards Won</p>
                </div>
              </div>
            </div>
          </section>
        );
      case 'CONTACT':
        return (
          <section style={{ padding: '8rem 2rem', textAlign: 'center', minHeight: '60vh', backgroundColor: 'var(--bg-main)' }}>
            <h2 style={{ fontSize: '3rem', fontFamily: '"Playfair Display", serif', marginBottom: '1rem' }}>CONTACT US</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Information about how to reach us will be available here.</p>
          </section>
        );
      default:
        return (
          <>
            <Hero onShopNow={() => setActiveTab('MAKEUP')} />
            <Collections onShopClick={(tab) => setActiveTab(tab)} />
            <Features />
          </>
        );
    }
  };

  return (
    <>
      <AnimatePresence>
        {showWelcome && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -50 }}
            style={{ 
              position: 'fixed', 
              top: '20px', 
              left: '50%', 
              transform: 'translateX(-50%)', 
              zIndex: 3000,
              backgroundColor: 'var(--primary)',
              color: 'white',
              padding: '1rem 2.5rem',
              borderRadius: '50px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontWeight: '600',
              pointerEvents: 'none'
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>✨</span>
            Welcome back, {userName}!
          </motion.div>
        )}
      </AnimatePresence>
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        cartItems={cartItems} 
        theme={theme} 
        toggleTheme={toggleTheme} 
        onOpenBooking={() => setIsBookingModalOpen(true)}
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        setIsLoggedIn={setIsLoggedIn}
        userName={userName}
        onLogout={handleLogout}
        onLoginSuccess={handleLoginSuccess}
        isAuthModalOpen={isAuthModalOpen}
        setIsAuthModalOpen={setIsAuthModalOpen}
      />
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        services={services} 
        onBookingSubmit={handleBookingSubmit}
      />
      <main>
        {renderContent()}
      </main>
      <Footer onLinkClick={(tab) => setActiveTab(tab)} />
    </>
  );
}

export default App;
