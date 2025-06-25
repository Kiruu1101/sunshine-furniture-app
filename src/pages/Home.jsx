import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import {useNavigate} from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'swiper/css';
import 'swiper/css/pagination';
import '../styles/Home.css';

const slides = [
    {
        img: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1600',
        title: 'Modern Living Room',
    },
    {
        img: 'https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg?auto=compress&cs=tinysrgb&w=1600',
        title: 'Elegant Bedroom Designs',
    },
    {
        img: 'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=1600',
        title: 'Dining in Style',
    },
];

export default function Home() {
    useEffect(() => {
        AOS.init({ duration: 1000 });
        const hash = window.location.hash;
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth' });
            }, 300);
            }
        }
    }, []);
    const navigate = useNavigate();

    return (
        <div>
            {/* 🔁 Slider */}
            <div className="home-slider">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    loop
                >
                    {slides.map((slide, idx) => (
                        <SwiperSlide key={idx}>
                            <div
                                className="slider-image"
                                style={{
                                    backgroundImage: `url(${slide.img})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    height: '60vh',
                                }}
                            >
                                
                                <div className="overlay" onClick={() => navigate('/allproducts')}>
                                    <h2>{slide.title}</h2>
                                    <button className="shop-btn" >Shop Now</button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* 🌟 New Launches */}
            <div className="info-sections">
                <section id="new-launches" data-aos="fade-up">
                    <h2>🌟 New Launches</h2>
                    <p>Explore our exclusive new arrivals that blend comfort, tech, and style.</p>
                    <div className="product-grid" onClick={() => navigate('/allproducts')}>
                        <div className="product-card1" data-aos="zoom-in">
                            <img src="https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Sofa Set" />
                            <h5>Urban Luxe Sofa</h5>
                            <p>Ergonomic build | Premium Fabric | Bold Colors</p>
                        </div>
                        <div className="product-card1" data-aos="zoom-in">
                            <img src="https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Dining Set" />
                            <h5>Marble Dining Set</h5>
                            <p>Italian Marble | 6-Seater | Scratch-resistant</p>
                        </div>
                        <div className="product-card1" data-aos="zoom-in">
                            <img src="https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Bed" />
                            <h5>Smart Storage Bed</h5>
                            <p>Hydraulic Lift | USB Charging | Under-bed Storage</p>
                        </div>
                    </div>
                </section>

                {/* 🪑 Categories */}
                <section id="categories" data-aos="fade-up" onClick={() => navigate('/allproducts')}>
                    <h2>🪑 Popular Categories</h2>
                    <ul className="category-list">
                        <li>Sofas</li>
                        <li>Beds</li>
                        <li>Dining Tables</li>
                        <li>Office Chairs</li>
                        <li>TV Units</li>
                        <li>Study Desks</li>
                    </ul>
                </section>

                {/* 🧾 About */}
                <section id="about" data-aos="fade-up">
                    <h2>About Us</h2>
                    <p>Sunshine Furniture was born out of a passion for timeless design and lasting comfort. Since our founding in 2010, we’ve helped transform over a million houses into homes across India, one room at a time.</p>
                    <p> What started as a modest family-run furniture shop has now evolved into a nationwide brand with 150+ stores and a growing online presence. Yet, our core mission remains unchanged — to make high-quality, beautifully designed furniture accessible and affordable to everyone.</p>
                    <p>We believe your furniture should not only look great but also serve a meaningful purpose in your daily life. That’s why we focus on smart designs, modular solutions, and materials that stand the test of time.</p>
                    <p>Our products are crafted using sustainably sourced wood, eco-friendly finishes, and cutting-edge techniques that blend craftsmanship with innovation. From compact urban apartments to sprawling villas, we cater to every style, every need, and every corner of your home.</p>
                    <p>At Sunshine, we’re not just selling furniture—we're building trust. Our commitment to customer satisfaction drives us to offer personalized design consultations, easy returns, free installation, and a dedicated after-sales support team that truly cares.</p>
                    <p>Join thousands of happy customers who’ve chosen Sunshine as their home styling partner. Let’s create a space that tells your story—with comfort, character, and charm.</p>
                </section>


                {/* 🏬 Stores */}
                <section id="stores" data-aos="fade-up">
                    <h2>🏬 Our Stores</h2>
                    <p>Come feel the furniture before you bring it home. Our flagship experience zones are located in:</p>
                    <ul className="store-list">
                        <li><strong>Pune:</strong> Phoenix Mall, Viman Nagar</li>
                        <li><strong>Bangalore:</strong> Indiranagar Main Road</li>
                        <li><strong>Mumbai:</strong> Linking Road, Bandra</li>
                        <li><strong>Hyderabad:</strong> Gachibowli Central Mall</li>
                        <li><strong>Delhi:</strong> Connaught Place</li>
                    </ul>
                    <p>Try out recliners, smart beds, modular kitchens, and more in real-time. Walk in, relax, explore.</p>
                </section>

                {/* 💼 Careers */}
                <section id="careers" data-aos="fade-up">
                    <h2>💼 Careers</h2>
                    <p>We're always on the lookout for passionate, driven talent. Whether you're a creative designer, a tech enthusiast, or a people person—there's a space for you at Sunshine.</p>
                    <ul>
                        <li>🌟 Roles: Interior Designer, Sales Executive, UI/UX Developer, Warehouse Coordinator</li>
                        <li>🏠 Remote and In-store roles available</li>
                        <li>🎓 Continuous learning, mentorship, and career growth</li>
                    </ul>
                </section>

                {/* 💡 Why Us */}
                <section id="why-us" data-aos="fade-up">
                    <h2>💡 Why Choose Sunshine Furniture?</h2>
                    <ul>
                        <li>🌱 Eco-friendly and certified wood</li>
                        <li>🎨 Custom-built options & color palettes</li>
                        <li>🚚 Free delivery & expert installation</li>
                        <li>💳 Easy EMI plans and Pay Later options</li>
                        <li>🛠 5-Year comprehensive warranty</li>
                    </ul>
                </section>

                {/* 💬 Testimonials */}
                <section id="testimonials" data-aos="fade-up">
                    <h2>💬 What Our Customers Say</h2>
                    <blockquote>
                        "Both Shop and online experience were seamless. The sofa is so comfortable!"
                        <footer>— Kiran C., Mumbai</footer>
                    </blockquote>
                    <blockquote>
                        "Loved the shopping experience! The team helped me redesign my living room beautifully."
                        <footer>— Aarti S., Pune</footer>
                    </blockquote>
                    <blockquote>
                        "Their quality and delivery time is unmatched. Highly recommended!"
                        <footer>— Rajeev M., Bangalore</footer>
                    </blockquote>

                </section>
                {/* 🆘 Help & Support */}
                <section id="help" data-aos="fade-up">
                    <h2>🆘 Help & Support</h2>
                    <p>We're here for you every step of the way — from your first click to post-purchase care. Browse our support options below to get answers or assistance fast.</p>
                </section>

                {/* 📦 Track Your Order */}
                <section id="track-order" data-aos="fade-up">
                    <h3>📦 Track Your Order</h3>
                    <p>Stay updated on your order status with our easy-to-use tracking system.</p>
                    <p>Simply <a href="">click here</a> and enter your order ID and mobile number to get real-time updates on dispatch, shipping, and delivery.</p>
                </section>

                {/* 🔄 Returns & Exchange */}
                <section id="returns" data-aos="fade-up">
                    <h3>🔄 Returns & Exchange</h3>
                    <p>Not satisfied with your purchase? We’ve got your back.</p>
                    <ul>
                        <li>Easy 7-day return window for most products</li>
                        <li>Free pick-up service from your doorstep</li>
                        <li>Instant replacement for damaged or incorrect items</li>
                    </ul>
                    <p>Read our <a href="">Returns Policy</a> for complete details.</p>
                </section>

                {/* 🛡 Warranty Information */}
                <section id="warranty" data-aos="fade-up">
                    <h3>🛡 Warranty Information</h3>
                    <p>We stand by the quality of our products. Every major furniture piece comes with a warranty of up to 5 years covering manufacturing defects.</p>
                    <ul>
                        <li>✅ 5-Year warranty on sofas, beds, dining sets, wardrobes</li>
                        <li>✅ 1-Year coverage for minor accessories and decor</li>
                        <li>✅ Hassle-free claims with online form & support team</li>
                    </ul>
                    <p>Check our <a href="">Warranty Terms</a> for full coverage.</p>
                </section>

                {/* ❓ Frequently Asked Questions */}
                <section id="faqs" data-aos="fade-up">
                    <h3>❓ Frequently Asked Questions</h3>
                    <p>Find quick answers to common questions about delivery, customization, payment, and more.</p>
                    <ul className="faq-list">
                        <li><strong>Q:</strong> Can I customize the fabric or color of my furniture?<br /><strong>A:</strong> Yes! Many of our items have customizable options. Look for the “Customise Now” button on product pages.</li>
                        <li><strong>Q:</strong> Do you deliver to tier-2 and tier-3 cities?<br /><strong>A:</strong> Yes, we ship pan-India. Delivery timelines may vary based on your location.</li>
                        <li><strong>Q:</strong> What payment methods do you accept?<br /><strong>A:</strong> We accept Credit/Debit Cards, UPI, Net Banking, Wallets, and No Cost EMI.</li>
                        <li><strong>Q:</strong> What if I receive a damaged item?<br /><strong>A:</strong> Contact us within 48 hours of delivery for a free replacement or refund.</li>
                    </ul>
                    <p>Need more help? <a href="/contact">Contact our support team</a>.</p>
                </section>

            </div>
        </div>
    );
}
