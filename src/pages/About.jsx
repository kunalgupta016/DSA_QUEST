import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { FaCrown, FaTools, FaHandsHelping } from "react-icons/fa";
import SwiperCore from "swiper";
import { Autoplay } from "swiper/modules";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Navbar from "../components/Navbar";
import bg_image from "../assets/bg.png";
import Footer from "../components/Footer";
import GeneralManager from "../assets/GeneralManager.png";
import HeadChef from "../assets/HeadChef.png";
import headofmedical from "../assets/headofmedical.png";

const About = () => {
  // Example data arrays
  const timelineEvents = [
    { year: 1921, label: "Founded", img: `${bg_image}` },
    { year: 1950, label: "Renovation", img: `${bg_image}` },
    { year: 2000, label: "Awarded 5⭐", img: `${bg_image}` },
    { year: 2000, label: "Awarded 5⭐", img: `${bg_image}` },


  ];

  const values = [
    {
      icon: <FaCrown size={40} />,
      title: "Heritage",
      desc: "A century of timeless tradition.",
    },
    {
      icon: <FaTools size={40} />,
      title: "Craftsmanship",
      desc: "Meticulous attention to detail.",
    },
    {
      icon: <FaHandsHelping size={40} />,
      title: "Service",
      desc: "Personalized, warm hospitality.",
    },
  ];

  const team = [
    {
      name: "Amrita",
      role: "General Manager",
      photo: `${GeneralManager}`,
      quote: "Leading with passion.",
    },
    {
      name: "Aarav",
      role: "Head Chef",
      photo: `${HeadChef}`,
      quote: "Crafting culinary art.",
    },
    {
      name: "Rani",
      role: "Head of Medical",
      photo: `${headofmedical}`,
      quote: "Your wish, our command.",
    },
  ];

  const awards = [
    { logo: `${bg_image}`, caption: "Best Luxury Hotel 2010" },
    { logo: `${bg_image}`, caption: "Global Hospitality Award 2012" },
    { logo: `${bg_image}`, caption: "Best Luxury Hotel 2013" },
    { logo: `${bg_image}`, caption: "Global Hospitality Award 2015" },
    { logo: `${bg_image}`, caption: "Best Luxury Hotel 2019" },
    { logo: `${bg_image}`, caption: "Global Hospitality Award 2021" },
  ];

  const galleryImages = [
    "https://chokhidhani.com/wp-content/uploads/2024/08/CD-Resort.jpg",
    "https://chokhidhani.com/wp-content/uploads/2024/08/CD-Indore.jpg",
    "https://chokhidhani.com/wp-content/uploads/2024/08/CD-village.jpg",
    "https://chokhidhani.com/wp-content/uploads/2024/08/Pink-Pearl-Water-Park.jpg",
  ];
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const videoref = useRef(null);
  const handlePlay = ()=>{
    if (videoref.current) {
      videoref.current.play();
    }
  }

  SwiperCore.use([Autoplay, Pagination, Navigation]);
  return (
    <>
      <div className="text-gray-100 bg-gray-900">
        <Navbar />

        {/* Hero Intro */}
        <section className="relative h-screen bg-cover bg-center  " style={{ backgroundImage: `url(${bg_image})` }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent flex items-center justify-center">
            <h1 className="text-5xl md:text-6xl font-serif text-yellow-400">
              Our Legacy
            </h1>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 px-6 lg:px-24">
          <h2 className="text-4xl font-serif text-yellow-400 text-center mb-8">
            Timeline
          </h2>
          <div className="flex space-x-8 overflow-x-auto pb-4">
            {timelineEvents.map((e, i) => (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                key={i}
                className="relative min-w-[200px] bg-gray-800 p-4 rounded-2xl cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-2xl font-bold text-yellow-400 mb-2">
                  {e.year}
                </h3>
                <p className="text-gray-300">{e.label}</p>
                <motion.img
                  src={e.img}
                  alt={e.label}
                  className="absolute top-0 right-0 w-16 h-16 object-cover rounded-full border-2 border-yellow-400"
                  initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                  
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Our Philosophy / Values */}
        <section className="py-20 px-6 lg:px-24 bg-gray-800">
          <h2 className="text-4xl font-serif text-yellow-400 text-center mb-8">
            Our Philosophy
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
              initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
                key={i}
                className="bg-gray-700 p-6 rounded-2xl perspective"
                whileHover={{ rotateY: 180 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="front backface-hidden flex flex-col items-center">
                  <div className="text-yellow-400 mb-4">{v.icon}</div>
                  <h3 className="text-2xl font-semibold text-gray-100 mb-2">
                    {v.title}
                  </h3>
                </div>
                <div className="back absolute inset-0 p-6 bg-gray-700 rounded-2xl backface-hidden rotateY-180 flex items-center justify-center">
                  <p className="text-gray-300 text-center">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Gallery */}
        <section className="py-20 px-6 lg:px-24">
          <h2 className="text-4xl font-serif text-yellow-400 text-center mb-8">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {team.map((t, i) => (
              <motion.div initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }} key={i} className="relative group">
                <img
                  src={t.photo}
                  alt={t.name}
                  className="w-full h-80 object-cover rounded-full border-4 border-yellow-400"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center rounded-full">
                  <h3 className="text-xl font-semibold text-yellow-400">
                    {t.name}
                  </h3>
                  <p className="text-gray-300">{t.role}</p>
                  <p className="italic text-gray-400 mt-2 text-center px-4">
                    "{t.quote}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Awards Carousel */}
        <section className="py-20 px-6 lg:px-24 bg-gray-800" >
  <h2 className="text-4xl font-serif text-yellow-400 text-center mb-8">
    Awards & Recognition
  </h2>
  <Swiper
    modules={[Autoplay, Pagination, Navigation]}
    slidesPerView={2}
    spaceBetween={30}
    autoplay={{ delay: 3000 }}
    pagination={{ clickable: true }}
    navigation
    className="px-4"
    
  >
    {awards.map((a, i) => (
      <SwiperSlide
      initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }} 
        key={i}
        className="flex flex-col items-center bg-gray-700 p-6 rounded-2xl border border-yellow-400"
      >
        <img
          src={a.logo}
          alt={a.caption}
          className="h-24 mb-4 object-contain"
        />
        <p className="text-gray-200 text-center">{a.caption}</p>
      </SwiperSlide>
    ))}
  </Swiper>
</section>


        {/* Behind-the-Scenes Video */}
        <section className="py-20 px-6 lg:px-24">
          <h2 className="text-4xl font-serif text-yellow-400 text-center mb-8">
            Behind the Scenes
          </h2>
          <div className="relative w-full max-w-4xl mx-auto">
            <video
            ref = {videoref}
              src="https://videos.pexels.com/video-files/16517887/16517887-sd_640_360_30fps.mp4"
              controls={false}
              muted
              className="w-full rounded-2xl"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="text-6xl text-yellow-400 opacity-80 hover:opacity-100" onClick={handlePlay} >
                ▶︎
              </button>
            </div>
          </div>
        </section>

        {/* Photo Collage with Lightbox */}
        <section className="py-20 px-6 lg:px-24 bg-gray-800">
          <h2 className="text-4xl font-serif text-yellow-400 text-center mb-8">
            Gallery
          </h2>
          <div className="columns-2 md:columns-4 gap-4">
            {galleryImages.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Gallery ${idx}`}
                className="mb-4 w-full rounded-lg cursor-pointer"
                onClick={() => {
                  setPhotoIndex(idx);
                  setLightboxOpen(true);
                }}
              />
            ))}
          </div>

          {lightboxOpen && (
            <Lightbox
              open={lightboxOpen}
              close={() => setLightboxOpen(false)}
              index={photoIndex}
              slides={galleryImages.map((src) => ({ src }))}
            />
          )}
        </section>

        {/* Map & Location */}
        <section className="py-20 px-6 lg:px-24">
          <h2 className="text-4xl font-serif text-yellow-400 text-center mb-8">
            Location
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.797879156727!2d75.84867361033794!3d26.81456367660865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dc92769194891%3A0x8a004224dc719321!2sShiv%20Mandir%20-%20Jagatpura!5e0!3m2!1sen!2sin!4v1746537921490!5m2!1sen!2sin"
                width="100%"
                height="100%"
                allowFullScreen="true"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="w-full md:w-1/2 text-gray-300">
              <p className="mb-2">123 radha Nagar , Krishn Marg</p>
              <a
                href="https://maps.app.goo.gl/v4Vf7oXpuckx4ZLa7"
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-4 px-6 py-3 bg-yellow-500 text-gray-900 rounded-lg font-semibold"
              >
                Get Directions 
              </a>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-6 lg:px-24 bg-gradient-to-r from-gray-800 to-gray-900 text-center">
          <h2 className="text-4xl font-serif text-yellow-400 mb-6">
            Join Our Story
          </h2>
          <p className="text-gray-300 mb-8">
            Subscribe for exclusive packages or book a legendary stay today.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-yellow-500 text-gray-900 font-semibold rounded-lg shadow-lg"
          >
            Subscribe / Book Now
          </motion.button>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default About;
