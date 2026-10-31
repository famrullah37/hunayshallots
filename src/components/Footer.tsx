"use client";

import React from "react";
import { Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/contact";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer id="kontak" className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <Link href="/">
              <Image
                src="/hunay_logo.png"
                alt="Hunay Logo"
                width={80}
                height={80}
              />
            </Link>
            <p className="text-gray-400 my-4">{t("footer.tagline")}</p>
            <nav className="flex flex-col gap-2 text-gray-400">
              <Link href="/products" className="hover:text-golden-yellow transition">Products</Link>
              <Link href="/wholesale" className="hover:text-golden-yellow transition">Wholesale &amp; Export</Link>
              <Link href="/blog" className="hover:text-golden-yellow transition">Blog &amp; Articles</Link>
            </nav>
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
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-2 hover:text-golden-yellow transition"
              >
                <Mail size={20} />
                <span>{CONTACT_EMAIL}</span>
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

          {/* Indonesian buyers: this is the export site, local retail lives on bawanghunay.com */}
          <div>
            <h4 className="text-lg font-bold mb-4">Buying in Indonesia?</h4>
            <p className="text-gray-400 mb-4">
              For retail orders within Indonesia, visit our Indonesian store.
            </p>
            <a
              href="https://bawanghunay.com"
              hrefLang="id"
              className="inline-block rounded-full border border-gray-600 px-5 py-2 text-gray-200 hover:border-golden-yellow hover:text-golden-yellow transition"
            >
              bawanghunay.com →
            </a>
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
