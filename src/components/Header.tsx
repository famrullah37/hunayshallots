"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-forest-green">
          Hunay
        </Link>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
          <Link
            href="#tentang-kami"
            className="text-gray-700 hover:text-forest-green transition"
          >
            Tentang Kami
          </Link>
          <Link
            href="#produk"
            className="text-gray-700 hover:text-forest-green transition"
          >
            Produk
          </Link>
          <Link
            href="#sertifikat"
            className="text-gray-700 hover:text-forest-green transition"
          >
            Sertifikat
          </Link>
          <Link
            href="#kontak"
            className="text-gray-700 hover:text-forest-green transition"
          >
            Kontak
          </Link>
        </nav>

        {/* CTA Button - Right Side */}
        <a
          href="https://linktr.ee/hunaybawanggoreng?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnNMCOOLVAOcBihTLFe1HZkVGetZ5mjYLtKEuaYUMvkVbZ1rlcmytu4M3oQYM_aem_KzN7PxybTFJ5y1HlWXYmtA"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block bg-forest-green text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
        >
          Beli Sekarang
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-gray-700"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
          >
            <nav className="flex flex-col space-y-4 px-4 py-4">
              <Link
                href="/tentang-kami"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-forest-green transition"
              >
                Tentang Kami
              </Link>
              <Link
                href="#produk"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-forest-green transition"
              >
                Produk
              </Link>
              <Link
                href="#sertifikat"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-forest-green transition"
              >
                Sertifikat
              </Link>
              <Link
                href="#kontak"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-forest-green transition"
              >
                Kontak
              </Link>
              <a
                href="https://api.whatsapp.com/send/?phone=6285233658619&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-forest-green text-white px-6 py-2 rounded-full hover:bg-green-700 transition text-center"
              >
                Beli Sekarang
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
