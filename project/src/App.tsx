import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Menu, X, Instagram, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';

import StallRegistrationModal from './StallRegistrationModal.tsx';
import Toast from './toast.tsx';


interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({ show: false, message: '', type: 'success' });


  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("http:localhost:5000/api/v1/createMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        alert("❌ Failed to send message: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Something went wrong. Please try again later.");
    }
  };

  // toast notification
  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ show: false, message: '', type: 'success' });
  };


  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-slate-950/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
        }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/gymkhana-logo.png" alt="Gymkhana Logo" className="h-12 w-auto" />
              <img src="/Recrave.png" alt="ReCrave Logo" className="h-10 w-auto" />
              <img src="/nit-logo.png" alt="NIT Logo" className="h-12 w-auto" />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('home')} className="hover:text-orange-400 transition-colors">Home</button>
              <button onClick={() => scrollToSection('about')} className="hover:text-orange-400 transition-colors">About</button>
              <button onClick={() => scrollToSection('gallery')} className="hover:text-orange-400 transition-colors">Gallery</button>
              <button onClick={() => scrollToSection('sponsors')} className="hover:text-orange-400 transition-colors">Sponsors</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-orange-400 transition-colors">Contact</button>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-yellow-500 text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-all duration-300 hover:scale-105"
            >
              Register Now
            </button>


            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4 animate-fadeIn">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left py-2 hover:text-orange-400 transition-colors">Home</button>
              <button onClick={() => scrollToSection('about')} className="block w-full text-left py-2 hover:text-orange-400 transition-colors">About</button>
              <button onClick={() => scrollToSection('gallery')} className="block w-full text-left py-2 hover:text-orange-400 transition-colors">Gallery</button>
              <button onClick={() => scrollToSection('sponsors')} className="block w-full text-left py-2 hover:text-orange-400 transition-colors">Sponsors</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-2 hover:text-orange-400 transition-colors">Contact</button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-yellow-500 text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-all duration-300 hover:scale-105"
              >
                Register Now
              </button>

            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/Screenshot\\ 2025-10-29\\ 134915.png)',
            filter: 'brightness(0.7)'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="animate-fadeInUp">
            <div className="mb-8 flex justify-center">
              <img src="/Recrave.png" alt="ReCrave" className="h-32 md:h-48 w-auto drop-shadow-2xl" />
            </div>
            <p className="text-2xl md:text-4xl mb-4 text-orange-400 font-bold uppercase tracking-wider">
              Students' Gymkhana Presents
            </p>
            <p className="text-3xl md:text-5xl mb-6 text-yellow-400 font-bold">
              The Annual Food Fest
            </p>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Experience the finest flavors, vibrant culture, and unforgettable memories
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-yellow-500 text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-all duration-300 hover:scale-105"
              >
                Register Now
              </button>

              <button onClick={() => scrollToSection('about')} className="border-2 border-yellow-500 text-yellow-400 px-10 py-4 rounded-lg text-xl font-bold hover:bg-yellow-500/20 transition-all duration-300">
                Learn More
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-yellow-400 text-xl font-bold">
              <div>📅 Date: 7-8 Nov</div>
              <div>📍 Venue: SAC</div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-orange-500 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 relative"
        style={{
          backgroundImage: 'url(/Screenshot\\ 2025-10-29\\ 014340.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/85"></div>
        <div className="relative z-10">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                What is ReCrave?
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed">
                  ReCrave is the flagship annual food festival organized by our college, bringing together students, local vendors, and food enthusiasts for a celebration of culinary excellence.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  From traditional delicacies to modern fusion cuisine, ReCrave showcases the best of food culture while providing a platform for local vendors and creating unforgettable experiences.
                </p>
                <div className="grid grid-cols-3 gap-6 pt-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-orange-500 mb-2">5000+</div>
                    <div className="text-gray-400">Visitors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-orange-500 mb-2">50+</div>
                    <div className="text-gray-400">Food Stalls</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-orange-500 mb-2">2</div>
                    <div className="text-gray-400">Days Event</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 p-6 rounded-2xl hover:scale-105 transition-transform duration-300 backdrop-blur-sm border border-orange-500/20">
                  <div className="text-4xl mb-3">🍔</div>
                  <h3 className="text-xl font-semibold mb-2">Diverse Cuisine</h3>
                  <p className="text-gray-400 text-sm">Experience flavors from around the world</p>
                </div>
                <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 p-6 rounded-2xl hover:scale-105 transition-transform duration-300 backdrop-blur-sm border border-orange-500/20">
                  <div className="text-4xl mb-3">🎵</div>
                  <h3 className="text-xl font-semibold mb-2">Live Entertainment</h3>
                  <p className="text-gray-400 text-sm">Music, performances, and more</p>
                </div>
                <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 p-6 rounded-2xl hover:scale-105 transition-transform duration-300 backdrop-blur-sm border border-orange-500/20">
                  <div className="text-4xl mb-3">🏆</div>
                  <h3 className="text-xl font-semibold mb-2">Competitions</h3>
                  <p className="text-gray-400 text-sm">Fun activities and prizes</p>
                </div>
                <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 p-6 rounded-2xl hover:scale-105 transition-transform duration-300 backdrop-blur-sm border border-orange-500/20">
                  <div className="text-4xl mb-3">🤝</div>
                  <h3 className="text-xl font-semibold mb-2">Community</h3>
                  <p className="text-gray-400 text-sm">Connect with food lovers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Event Gallery
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg">Moments from ReCrave 2024</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group relative overflow-hidden rounded-2xl aspect-square hover:scale-105 transition-transform duration-300">
              <img
                src="/png2.jpg"
                alt="ReCrave Event"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">ReCrave 2024</h3>
                  <p className="text-sm text-gray-300">Amazing moments captured</p>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl aspect-square hover:scale-105 transition-transform duration-300">
              <img
                src="/png1.jpg"
                alt="ReCrave Event"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">ReCrave 2024</h3>
                  <p className="text-sm text-gray-300">Fiery food fest experience</p>
                </div>
              </div>
            </div>
            {/* {[3, 4, 5, 6].map((item) => (
              <div key={item} className="group relative overflow-hidden rounded-2xl aspect-square bg-gradient-to-br from-orange-900/30 to-red-900/30 hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📸</div>
                    <p className="text-gray-400">Event Photo {item}</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">ReCrave 2024</h3>
                    <p className="text-sm text-gray-300">More photos coming soon</p>
                  </div>
                </div>
              </div>
            ))} */}
            <div className="group relative overflow-hidden rounded-2xl aspect-square hover:scale-105 transition-transform duration-300">
              <img
                src="/png3.jpg"
                alt="ReCrave Event"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">ReCrave 2024</h3>
                  <p className="text-sm text-gray-300">Fiery food fest experience</p>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl aspect-square hover:scale-105 transition-transform duration-300">
              <img
                src="/png4.jpg"
                alt="ReCrave Event"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">ReCrave 2024</h3>
                  <p className="text-sm text-gray-300">Fiery food fest experience</p>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl aspect-square hover:scale-105 transition-transform duration-300">
              <img
                src="/png5.jpg"
                alt="ReCrave Event"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">ReCrave 2024</h3>
                  <p className="text-sm text-gray-300">Fiery food fest experience</p>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl aspect-square hover:scale-105 transition-transform duration-300">
              <img
                src="/png6.jpg"
                alt="ReCrave Event"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">ReCrave 2024</h3>
                  <p className="text-sm text-gray-300">Fiery food fest experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Section
      <section id="sponsors" className="py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Our Sponsors
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg">Thank you to our amazing partners</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="bg-slate backdrop-blur-sm p-8 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="text-center border-2 border-white/10 rounded-lg p-4">
                <img
                  src="/morvee.png"
                  alt="ReCrave Event"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="bg-slate backdrop-blur-sm p-8 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="text-center border-2 border-white/10 rounded-lg p-4">
                <img
                  src="/wb-challish.png"
                  alt="ReCrave Event"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="bg-slate backdrop-blur-sm p-8 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="text-center border-2 border-white/10 rounded-lg p-4">
                <img
                  src="/grasim.png"
                  alt="ReCrave Event"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="bg-slate backdrop-blur-sm p-8 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="text-center border-2 border-white/10 rounded-lg p-4">
                <img
                  src="/ojas.png"
                  alt="ReCrave Event"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="bg-slate backdrop-blur-sm p-8 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="text-center border-2 border-white/10 rounded-lg p-4">
                <img
                  src="/jana.png"
                  alt="ReCrave Event"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-3xl p-12 text-center border border-orange-500/20">
            <h3 className="text-3xl font-bold mb-4">Become a Sponsor</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join us in making ReCrave 2025 the biggest food festival yet. Get your brand in front of thousands of students and food enthusiasts.
            </p>
            <button className="bg-gradient-to-r from-orange-500 to-red-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105">
              Partner With Us
            </button>
          </div>
        </div>
      </section> */}

      {/* Sponsors Section */}
      <section id="sponsors" className="py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Our Sponsors
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg">Thank you to our amazing partners</p>
          </div>

          {/* Sponsor Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-16">
            {[
              "/morvee.png",
              "/wb-challish.png",
              "/grasim.png",
              "/ojas.png",
              "/jana.png",
            ].map((logo, index) => (
              <div
                key={index}
                className="bg-slate-800/40 backdrop-blur-sm p-6 rounded-2xl flex items-center justify-center 
                     hover:bg-white/10 transition-all duration-300 hover:scale-105 border border-white/10"
              >
                <img
                  src={logo}
                  alt={`Sponsor ${index + 1}`}
                  className="w-32 h-32 object-contain rounded-xl"
                />
              </div>
            ))}
          </div>

          {/* Call-to-Action Card */}
          <div className="bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-3xl p-12 text-center border border-orange-500/20">
            <h3 className="text-3xl font-bold mb-4">Become a Sponsor</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join us in making ReCrave 2025 the biggest food festival yet. Get your brand in front of thousands of students and food enthusiasts.
            </p>
            <button className="bg-gradient-to-r from-orange-500 to-red-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105">
              Partner With Us
            </button>
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Phone</div>
                      <div className="text-gray-400">+91 8100375878</div>
                      <div className="text-gray-400">+91 9830652038</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Email</div>
                      <div className="text-gray-400">gymkhana@nitdgp.ac.in</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Location</div>
                      <div className="text-gray-400">SAC - Students Activity Center</div>
                      <div className="text-gray-400">Main Ground Area</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-6">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="https://www.instagram.com/recrave_nitdgp?igsh=ano2cGc4b3lvNjlu" className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                    <Instagram size={20} />
                  </a>
                  <a href="https://www.instagram.com/gymkhana_nitdgp?igsh=MXdvZDd0dG8wM3c5cA==" className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                    <Instagram size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* <div className="bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-3xl p-8 border border-orange-500/20">
              <h3 className="text-2xl font-semibold mb-6">Send us a Message</h3>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  onSubmit={sendMessage}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div> */}

            <div className="bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-3xl p-8 border border-orange-500/20">
              <h3 className="text-2xl font-semibold mb-6">Send us a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-white/10 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-3">
              <img src="/gymkhana-logo.png" alt="Gymkhana" className="h-10 w-auto" />
              <img src="/Recrave.png" alt="ReCrave" className="h-8 w-auto" />
              <img src="/nit-logo.png" alt="NIT" className="h-10 w-auto" />
            </div>
            <div className="text-gray-400 text-sm">
              Organized by Students' Gymkhana
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 ReCrave. All rights reserved.
            </div>
          </div>
        </div>
      </footer>


      {/* Stall Registration Modal */}
      <StallRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(msg) => showToast(msg, 'success')}
        onError={(msg) => showToast(msg, 'error')}
      />

      {/* Toast Notification */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </div>
  );
}

export default App;
