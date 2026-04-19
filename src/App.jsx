import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Collections from './components/Collections';
import Features from './components/Features';
import Footer from './components/Footer';

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

  const mockBookings = {
    1: [{ id: 101, client: 'Alice Johnson', date: 'Oct 24, 10:00 AM' }, { id: 102, client: 'Mary Smith', date: 'Oct 24, 11:30 AM' }],
    2: [{ id: 201, client: 'Sarah Connor', date: 'Oct 25, 02:00 PM' }],
    3: [{ id: 301, client: 'Linda Ray', date: 'Oct 26, 09:00 AM' }]
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
            <Hero />
            <Collections />
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
               {[1, 2, 3].map(item => {
                 let imageSrc = '';
                 if (activeTab === 'MAKEUP') imageSrc = '/images/makeup_item.png';
                 else if (activeTab === 'SKIN CARE') imageSrc = '/images/skincare_item.png';
                 else if (activeTab === 'HAIR CARE') imageSrc = '/images/haircare_item.png';

                 const productPrice = 19.99 * item;
                 const productId = `${activeTab}-${item}`;
                 const cartItem = cartItems.find(c => c.id === productId);
                 const quantity = cartItem ? cartItem.quantity : 0;

                 return (
                   <div key={item} style={{ width: '280px', textAlign: 'left' }}>
                      <div style={{ width: '100%', height: '350px', backgroundColor: 'var(--bg-card)', backgroundImage: `url(${imageSrc})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '8px', marginBottom: '1rem' }}></div>
                      <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Premium {activeTab} {item}</h4>
                      <p style={{ fontWeight: '600', color: 'var(--primary)', marginBottom: '1rem' }}>${productPrice.toFixed(2)}</p>
                      
                      {quantity > 0 ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid var(--border-color)', borderRadius: '4px', height: '45px' }}>
                          <button onClick={() => handleUpdateQuantity(productId, -1)} style={{ fontSize: '1.2rem', flex: 1, height: '100%' }}>-</button>
                          <span style={{ fontSize: '1rem', fontWeight: '600', width: '30px', textAlign: 'center' }}>{quantity}</span>
                          <button onClick={() => handleUpdateQuantity(productId, 1)} style={{ fontSize: '1.2rem', flex: 1, height: '100%' }}>+</button>
                        </div>
                      ) : (
                        <button 
                          className="btn-dark" 
                          style={{ width: '100%', height: '45px', fontSize: '0.9rem', borderRadius: '4px' }}
                          onClick={() => handleAddToCart({ id: productId, name: `Premium ${activeTab} ${item}`, price: productPrice })}
                        >
                          Add To Cart
                        </button>
                      )}
                   </div>
                 );
               })}
            </div>
          </section>
        );
      case 'SERVICES':
        return (
          <section style={{ padding: '6rem 2rem', backgroundColor: 'var(--bg-main)', minHeight: '60vh' }}>
            <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '3rem', fontFamily: '"Playfair Display", serif', marginBottom: '1rem', textAlign: 'center' }}>Parlour Management</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', textAlign: 'center', marginBottom: '4rem' }}>Manage your high-end salon services, staff assignments, and client bookings.</p>
              
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
                        {mockBookings[svc.id].length > 0 ? (
                          <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {mockBookings[svc.id].map(booking => (
                              <li key={booking.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.8rem 1rem', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-color)', marginBottom: '0.5rem', borderRadius: '4px' }}>
                                <span style={{ fontWeight: '500' }}>{booking.client}</span>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{booking.date}</span>
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
              <h2 style={{ fontSize: '3.5rem', fontFamily: '"Playfair Display", serif', marginBottom: '2rem' }}>About Be Bold</h2>
              <p style={{ color: 'var(--text-sub)', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                At Be Bold, we believe that beauty is a true expression of individuality. Established in 2023, our boutique parlour has been dedicated to providing a sanctuary where luxury meets personalized care.
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
            <Hero />
            <Collections />
            <Features />
          </>
        );
    }
  };

  return (
    <>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} cartItems={cartItems} theme={theme} toggleTheme={toggleTheme} />
      <main>
        {renderContent()}
      </main>
      <Footer />
    </>
  );
}

export default App;
