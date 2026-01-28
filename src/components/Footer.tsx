"use client";

import React from "react";
import { Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer id="kontak" className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-golden-yellow mb-4">
              Hunay
            </h3>
            <p className="text-gray-400 mb-4">{t("footer.tagline")}</p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">
              {t("footer.contactTitle")}
            </h4>
            <div className="space-y-3 text-gray-400">
              <a
                href="https://api.whatsapp.com/send/?phone=6285233658619&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-golden-yellow transition"
              >
                <Phone size={20} />
                <span>+62 852-3365-8619</span>
              </a>
              <a
                href="mailto:cvduaputrisholehah@gmail.com"
                className="flex items-center gap-2 hover:text-golden-yellow transition"
              >
                <Mail size={20} />
                <span>cvduaputrisholehah@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-lg font-bold mb-4">
              {t("footer.addressTitle")}
            </h4>
            <p className="text-gray-400">
              Desa Tegalrejo, RT/RW 002/003
              <br />
              Dusun Tesnan, Kecamatan Dringu
              <br />
              Kabupaten Probolinggo
            </p>
          </div>

          {/* Marketplace Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">{t("footer.shopTitle")}</h4>
            <div className="space-y-3">
              <a
                href="https://shopee.co.id/hunay.id"
                className="flex items-center gap-3 text-gray-400 hover:text-golden-yellow transition"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                  <svg className="w-10 h-10" viewBox="0 0 109.59 122.88">
                    <path
                      fill="#EE4D2D"
                      d="M74.98,91.98C76.15,82.36,69.96,76.22,53.6,71c-7.92-2.7-11.66-6.24-11.57-11.12 c0.33-5.4,5.36-9.34,12.04-9.47c4.63,0.09,9.77,1.22,14.76,4.56c0.59,0.37,1.01,0.32,1.35-0.2c0.46-0.74,1.61-2.53,2-3.17 c0.26-0.42,0.31-0.96-0.35-1.44c-0.95-0.7-3.6-2.13-5.03-2.72c-3.88-1.62-8.23-2.64-12.86-2.63c-9.77,0.04-17.47,6.22-18.12,14.47 c-0.42,5.95,2.53,10.79,8.86,14.47c1.34,0.78,8.6,3.67,11.49,4.57c9.08,2.83,13.8,7.9,12.69,13.81c-1.01,5.36-6.65,8.83-14.43,8.93 c-6.17-0.24-11.71-2.75-16.02-6.1c-0.11-0.08-0.65-0.5-0.72-0.56c-0.53-0.42-1.11-0.39-1.47,0.15c-0.26,0.4-1.92,2.8-2.34,3.43 c-0.39,0.55-0.18,0.86,0.23,1.2c1.8,1.5,4.18,3.14,5.81,3.97c4.47,2.28,9.32,3.53,14.48,3.72c3.32,0.22,7.5-0.49,10.63-1.81 C70.63,102.67,74.25,97.92,74.98,91.98L74.98,91.98z M54.79,7.18c-10.59,0-19.22,9.98-19.62,22.47h39.25 C74.01,17.16,65.38,7.18,54.79,7.18L54.79,7.18z M94.99,122.88l-0.41,0l-80.82-0.01h0c-5.5-0.21-9.54-4.66-10.09-10.19l-0.05-1 l-3.61-79.5v0C0,32.12,0,32.06,0,32c0-1.28,1.03-2.33,2.3-2.35l0,0h25.48C28.41,13.15,40.26,0,54.79,0s26.39,13.15,27.01,29.65 h25.4h0.04c1.3,0,2.35,1.05,2.35,2.35c0,0.04,0,0.08,0,0.12v0l-3.96,79.81l-0.04,0.68C105.12,118.21,100.59,122.73,94.99,122.88 L94.99,122.88z"
                    />
                  </svg>
                </div>
                <span>Shopee</span>
              </a>
              <a
                href="https://www.tokopedia.com/hunay-1"
                className="flex items-center gap-3 text-gray-400 hover:text-golden-yellow transition"
              >
                <Image
                  src={"/tokopedia.svg"}
                  alt="Tokopedia Logo"
                  width={40}
                  height={40}
                />
                <span>Tokopedia</span>
              </a>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex justify-center items-center gap-4">
            <motion.a
              href="https://www.instagram.com/hunay.id/"
              className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-forest-green transition"
              aria-label="Instagram"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </motion.a>
            <motion.a
              href="https://www.tiktok.com/@hunay_id"
              className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-forest-green transition"
              aria-label="TikTok"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
              </svg>
            </motion.a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Hunay - CV Dua Putri Sholehah. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
