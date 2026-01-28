"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TrustSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { t } = useLanguage();

  const testimonials = [
    {
      name: "Bu Siti",
      location: "Jakarta",
      text: "Bawang goreng Hunay enak banget! Renyah dan gurih, cocok buat taburan nasi goreng.",
      rating: 5,
    },
    {
      name: "Pak Bambang",
      location: "Surabaya",
      text: "Kualitas terbaik! Sudah langganan beli Hunay untuk warung makan saya.",
      rating: 5,
    },
    {
      name: "Ibu Rina",
      location: "Bandung",
      text: "Higienis dan halal, anak-anak suka banget dijadikan camilan.",
      rating: 5,
    },
  ];

  const certifications = [
    { name: "Halal MUI", image: "/halalmui.png" },
    { name: "BPOM", image: "/bpom.png" },
    { name: "P-IRT", image: "/pirt.svg" },
    { name: "ISO 9001", image: "/iso9001.jpg" },
    { name: "GMP", image: "/gmp.jpg" },
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
          <div className=" rounded-2xl p-8 shadow-lg">
            <div className="text-center">
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
                &quot;{testimonials[currentTestimonial].text}&quot;
              </p>
              <p className="font-bold text-gray-900">
                {testimonials[currentTestimonial].name}
              </p>
              <p className="text-gray-600 text-sm">
                {testimonials[currentTestimonial].location}
              </p>
            </div>

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
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
