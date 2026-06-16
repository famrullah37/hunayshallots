"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TrustSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { t, language } = useLanguage();

  const testimonials = [
    {
      name: "Bu Siti",
      location: "Jakarta",
      textId: "Bawang goreng Hunay enak banget! Renyah dan gurih, cocok buat taburan nasi goreng.",
      textEn: "Hunay fried onions are so delicious! Crispy and savory, perfect as a topping for fried rice.",
      rating: 5,
    },
    {
      name: "Pak Bambang",
      location: "Surabaya",
      textId: "Kualitas terbaik! Sudah langganan beli Hunay untuk warung makan saya.",
      textEn: "Top quality! I've been a regular Hunay customer for my restaurant.",
      rating: 5,
    },
    {
      name: "Ibu Rina",
      location: "Bandung",
      textId: "Higienis dan halal, anak-anak suka banget dijadikan camilan.",
      textEn: "Hygienic and halal certified — my kids love it as a snack.",
      rating: 5,
    },
    {
      name: "Pak Joko",
      location: "Semarang",
      textId: "Rasanya autentik dan tidak berminyak berlebihan. Cocok untuk pelengkap berbagai masakan.",
      textEn: "The taste is authentic and not overly oily. Great as a complement to various dishes.",
      rating: 5,
    },
    {
      name: "Ibu Dewi",
      location: "Yogyakarta",
      textId: "Harga terjangkau dengan kualitas premium. Kemasannya juga rapi dan aman.",
      textEn: "Affordable price with premium quality. The packaging is neat and secure too.",
      rating: 5,
    },
  ];

  // Auto-change testimonial every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handlePrevious = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const certifications = [
    { name: "Halal MUI", image: "/halalmui.png" },
    { name: "BPOM", image: "/bpom.png" },
    { name: "P-IRT", image: "/pirt.svg" },
    { name: "GMP", image: "/good.png" },
    { name: "Non-GMO", image: "/gmo.png" },
    { name: "FDA", image: "/fda.png" },
    { name: "HACCP", image: "/haccp.png" },
  ];

  return (
    <section id="sertifikat" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
          {t("trust.title")}{" "}
          <span className="text-forest-green">{t("trust.titleHighlight")}</span>
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          {t("trust.subtitle")}
        </p>

        {/* Certifications */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              className="rounded-2xl p-8 shadow-lg hover:shadow-xl transition text-center min-w-45"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative w-24 h-24 mx-auto mb-4">
                <Image
                  src={cert.image}
                  alt={cert.name}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <h3 className="font-bold text-gray-900">{cert.name}</h3>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Slider */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            {t("testimonial.title")}
          </h3>
          <div className="relative rounded-2xl p-8 shadow-lg">
            {/* Left Arrow */}
            <button
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-forest-green text-forest-green hover:text-white rounded-full p-2 shadow-lg transition"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Right Arrow */}
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-forest-green text-forest-green hover:text-white rounded-full p-2 shadow-lg transition"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="text-center px-12"
              >
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map(
                    (_, i) => (
                      <span key={i} className="text-golden-yellow text-2xl">
                        ⭐
                      </span>
                    ),
                  )}
                </div>
                <p className="text-lg text-gray-700 mb-6 italic">
                  &quot;{language === "id" ? testimonials[currentTestimonial].textId : testimonials[currentTestimonial].textEn}&quot;
                </p>
                <p className="font-bold text-gray-900">
                  {testimonials[currentTestimonial].name}
                </p>
                <p className="text-gray-600 text-sm">
                  {testimonials[currentTestimonial].location}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition ${
                    currentTestimonial === index
                      ? "bg-forest-green w-8"
                      : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
