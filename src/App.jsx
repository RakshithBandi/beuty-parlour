import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Collections from './components/Collections';
import Features from './components/Features';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

function App() {
  const [activeTab, setActiveTab] = useState('SHOP ALL');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => t === 'light' ? 'dark' : 'light');
  };
  const [cartItems, setCartItems] = useState([]);
  const [expandedService, setExpandedService] = useState(null);
  const [services, setServices] = useState([
    { id: 1, name: 'Hair Styling & Cutting', img: '/images/salon_service.png', price: '$85.00', duration: '60 min', staff: 'Samantha W.' },
    { id: 2, name: 'Luxury Spa Facial', img: '/images/spa_service.png', price: '$120.00', duration: '90 min', staff: 'Jessica K.' },
    { id: 3, name: 'Premium Manicure', img: '/images/nail_service.png', price: '$45.00', duration: '45 min', staff: 'Lisa T.' }
  ]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const [bookings, setBookings] = useState({
    1: [{ id: 101, client: 'Alice Johnson', date: 'Oct 24, 10:00 AM', price: '$85.00' }, { id: 102, client: 'Mary Smith', date: 'Oct 24, 11:30 AM', price: '$85.00' }],
    2: [{ id: 201, client: 'Sarah Connor', date: 'Oct 25, 02:00 PM', price: '$120.00' }],
    3: [{ id: 301, client: 'Linda Ray', date: 'Oct 26, 09:00 AM', price: '$45.00' }]
  });
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleLoginSuccess = (name) => {
    setIsLoggedIn(true);
    setUserName(name);
    setIsAuthModalOpen(false);
    setShowWelcome(true);
    setTimeout(() => setShowWelcome(false), 4000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
  };

  const handleBookingSubmit = (newBooking) => {
    setBookings(prev => ({
      ...prev,
      [newBooking.serviceId]: [...(prev[newBooking.serviceId] || []), {
        id: newBooking.id,
        client: newBooking.client,
        date: newBooking.date,
        price: newBooking.price
      }]
    }));
  };

  const handleEditStaff = (id, currentStaff) => {
    const newStaff = prompt('Assign new staff member to this service:', currentStaff);
    if (newStaff && newStaff.trim() !== '') {
      setServices(prev => prev.map(svc => svc.id === id ? { ...svc, staff: newStaff } : svc));
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
      case 'SHOP ALL':
        return (
          <>
            <Hero onShopNow={() => setActiveTab('MAKEUP')} />
            <Collections onShopClick={(tab) => setActiveTab(tab)} />
            <Features />
          </>
        );
      case 'MAKEUP':
      case 'SKIN CARE':
      case 'HAIR CARE':
        return (
          <section style={{ padding: '8rem 2rem', textAlign: 'center', minHeight: '60vh', backgroundColor: 'var(--bg-main)' }}>
            <h2 style={{ fontSize: '3rem', fontFamily: '"Playfair Display", serif', marginBottom: '1rem' }}>{activeTab} Collection</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Explore our handpicked curation of luxurious {activeTab.toLowerCase()} products.</p>
            <div style={{ marginTop: '3rem', display: 'flex', gap: '3rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {(() => {
                const products = {
                  'MAKEUP': [
                    { id: 'mk-1', name: 'Velvet Matte Lipstick', price: 24.99, img: '/images/lipstick.png' },
                    { id: 'mk-2', name: 'Luminous Foundation', price: 45.00, img: '/images/makeup_item.png' },
                    { id: 'mk-3', name: 'Silk Finish Powder', price: 32.50, img: '/images/makeup_item.png' },
                    { id: 'mk-4', name: 'Eyeshadow Palette', price: 55.00, img: '/images/eyeshadow.png' },
                    { id: 'mk-5', name: 'Volumizing Mascara', price: 18.99, img: '/images/lipstick.png' },
                    { id: 'mk-6', name: 'Glow Highlighter', price: 29.00, img: '/images/makeup_item.png' }
                  ],
                  'SKIN CARE': [
                    { id: 'sk-1', name: 'Hydrating Serum', price: 65.00, img: '/images/skincare_item.png' },
                    { id: 'sk-2', name: 'Rosewater Cleanser', price: 28.00, img: '/images/skincare_item.png' },
                    { id: 'sk-3', name: 'Night Repair Cream', price: 89.00, img: '/images/moisturizer.png' },
                    { id: 'sk-4', name: 'Vitamin C Toner', price: 34.00, img: '/images/skincare_item.png' },
                    { id: 'sk-5', name: 'Sun Defense SPF 50', price: 42.00, img: '/images/skincare_item.png' },
                    { id: 'sk-6', name: 'Detox Face Mask', price: 38.00, img: '/images/facemask.png' }
                  ],
                  'HAIR CARE': [
                    { id: 'hr-1', name: 'Keratin Shampoo', price: 22.00, img: '/images/shampoo.png' },
                    { id: 'hr-2', name: 'Argan Oil Serum', price: 35.50, img: '/images/haircare_item.png' },
                    { id: 'hr-3', name: 'Revitalizing Mask', price: 48.00, img: '/images/conditioner.png' },
                    { id: 'hr-4', name: 'Color Protect Spray', price: 26.00, img: '/images/haircare_item.png' },
                    { id: 'hr-5', name: 'Leave-in Conditioner', price: 19.99, img: '/images/shampoo.png' },
                    { id: 'hr-6', name: 'Scalp Therapy Oil', price: 44.00, img: '/images/haircare_item.png' }
                  ]
                };

                return (products[activeTab] || []).map(product => {
                  const cartItem = cartItems.find(c => c.id === product.id);
                  const quantity = cartItem ? cartItem.quantity : 0;

                  return (
                    <div key={product.id} style={{ width: '280px', textAlign: 'left', marginBottom: '2rem' }}>
                       <div style={{ width: '100%', height: '350px', backgroundColor: 'var(--bg-card)', backgroundImage: `url(${product.img})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '8px', marginBottom: '1rem', transition: 'transform 0.3s ease' }} className="product-card"></div>
                       <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{product.name}</h4>
                       <p style={{ fontWeight: '600', color: 'var(--primary)', marginBottom: '1rem' }}>${product.price.toFixed(2)}</p>
                       
                       {quantity > 0 ? (
                         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid var(--border-color)', borderRadius: '4px', height: '45px' }}>
                           <button onClick={() => handleUpdateQuantity(product.id, -1)} style={{ fontSize: '1.2rem', flex: 1, height: '100%' }}>-</button>
                           <span style={{ fontSize: '1rem', fontWeight: '600', width: '30px', textAlign: 'center' }}>{quantity}</span>
                           <button onClick={() => handleUpdateQuantity(product.id, 1)} style={{ fontSize: '1.2rem', flex: 1, height: '100%' }}>+</button>
                         </div>
                       ) : (
                         <button 
                           className="btn-dark" 
                           style={{ width: '100%', height: '45px', fontSize: '0.85rem', borderRadius: '4px' }}
                           onClick={() => handleAddToCart(product)}
                         >
                           Add To Cart
                         </button>
                       )}
                    </div>
                  );
                });
              })()}
            </div>
          </section>
        );
      case 'SERVICES':
        return (
          <section style={{ padding: '6rem 2rem', backgroundColor: 'var(--bg-main)', minHeight: '60vh' }}>
            <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '3rem', fontFamily: '"Playfair Display", serif', marginBottom: '1rem', textAlign: 'center' }}>Parlour Management</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', textAlign: 'center', marginBottom: '4rem' }}>Manage your high-end salon services, staff assignments, and client bookings.</p>
              
              {/* Recent Bookings Summary */}
              {Object.values(bookings).some(arr => arr.length > 0) && (
                <div style={{ marginBottom: '3rem', padding: '2rem', backgroundColor: '#FDF7F5', border: '1px solid #EED4C8', borderRadius: '12px' }}>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'var(--primary)' }}>✔</span> Your Recent Confirmations
                  </h4>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {Object.keys(bookings).map(svcId => (
                      bookings[svcId].map(b => (
                        <div key={b.id} style={{ backgroundColor: '#fff', padding: '0.8rem 1.2rem', borderRadius: '8px', border: '1px solid #eee', fontSize: '0.9rem' }}>
                          <strong>{services.find(s => s.id === parseInt(svcId))?.name}:</strong> {b.date}
                        </div>
                      ))
                    )).flat().slice(-3)} {/* Show last 3 */}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {services.map((svc) => (
                  <div key={svc.id} style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-card-alt)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.5rem', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                      <div style={{ width: '150px', height: '150px', borderRadius: '8px', backgroundImage: `url(${svc.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                      <div style={{ flex: 1, minWidth: '300px' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.8rem', fontFamily: '"Playfair Display", serif' }}>{svc.name}</h3>
                        <div style={{ display: 'flex', gap: '2rem', color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                          <span><strong>Price:</strong> {svc.price}</span>
                          <span><strong>Duration:</strong> {svc.duration}</span>
                          <span><strong>Assigned to:</strong> <span style={{ backgroundColor: 'var(--bg-footer)', padding: '2px 8px', borderRadius: '4px', color: 'var(--primary)', fontWeight: '500' }}>{svc.staff}</span></span>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                          <button onClick={() => handleEditStaff(svc.id, svc.staff)} className="btn-dark" style={{ padding: '0.6rem 1.5rem', fontSize: '0.8rem', borderRadius: '4px' }}>Edit Staff</button>
                          <button onClick={() => toggleBookings(svc.id)} style={{ padding: '0.6rem 1.5rem', fontSize: '0.8rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', cursor: 'pointer', fontWeight: '600', borderRadius: '4px' }}>
                            {expandedService === svc.id ? 'Hide Bookings' : 'View Bookings'}
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Expandable Bookings Menu */}
                    {expandedService === svc.id && (
                      <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--primary)' }}>Upcoming Bookings</h4>
                        {bookings[svc.id]?.length > 0 ? (
                          <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {bookings[svc.id].map(booking => (
                              <li key={booking.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem 1rem', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-color)', marginBottom: '0.5rem', borderRadius: '4px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                  <span style={{ fontWeight: '600' }}>{booking.client}</span>
                                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{booking.date}</span>
                                </div>
                                <div style={{ backgroundColor: 'rgba(179, 142, 125, 0.1)', padding: '4px 10px', borderRadius: '4px', color: 'var(--primary)', fontWeight: '700', fontSize: '0.9rem' }}>
                                  {booking.price || svc.price}
                                </div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p style={{ color: 'var(--text-sub)', fontSize: '0.95rem' }}>No upcoming bookings.</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
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
