"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { totalItems } = useCart();
  const pathname = usePathname();

  const navLinks = [
    { href: "/#tentang-kami", label: t("nav.about") },
    { href: "/products", label: t("nav.products") },
    { href: "/wholesale", label: "Wholesale" },
    { href: "/blog", label: "Blog" },
    { href: "/#sertifikat", label: t("nav.certificate") },
    { href: "/#kontak", label: t("nav.contact") },
  ];

  // On the homepage, scroll to the section ourselves: a <Link> to the hash the URL
  // already has (e.g. clicking "About Us" twice) does nothing.
  const handleNavClick = (e: React.MouseEvent, href: string) => {
    const menuWasOpen = isMenuOpen;
    setIsMenuOpen(false);
    if (pathname !== "/" || !href.startsWith("/#")) return;
    const target = document.getElementById(href.slice(2));
    if (!target) return;
    e.preventDefault();
    window.history.replaceState(null, "", href);
    // On mobile the menu's closing animation (0.3s) cancels a smooth scroll started
    // at the same time, so wait for it, then scroll to just below the fixed header.
    const scroll = () => {
      const header = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
      const top = target.getBoundingClientRect().top + window.scrollY - header - 8;
      window.scrollTo({ top, behavior: "smooth" });
    };
    if (menuWasOpen) setTimeout(scroll, 350);
    else scroll();
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/hunay_logo.png"
            alt="Hunay Logo"
            width={80}
            height={80}
          />
        </Link>

        {/* Desktop Navigation: in the flex flow (not absolutely centered) so it can't
            overlap the logo or the CTA; the hamburger menu takes over below lg. */}
        <nav className="hidden lg:flex flex-1 items-center justify-center gap-6 xl:gap-8 px-6">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={(e) => handleNavClick(e, l.href)}
              className="whitespace-nowrap text-gray-700 hover:text-forest-green transition"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button - Right Side */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/cart" className="relative p-2 text-gray-700 hover:text-forest-green transition" aria-label="Cart">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 7h12.8M7 13L5.4 5M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                {totalItems}
              </span>
            )}
          </Link>

          <Link
            href="/#quotation"
            onClick={(e) => handleNavClick(e, "/#quotation")}
            className="whitespace-nowrap bg-forest-green text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
          >
            Request a Quote
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-gray-700"
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
            className="lg:hidden bg-white border-t border-gray-200 overflow-hidden"
          >
            <nav className="flex flex-col space-y-4 px-4 py-4">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href)}
                  className="text-gray-700 hover:text-forest-green transition"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 text-gray-700 hover:text-forest-green transition"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 7h12.8M7 13L5.4 5M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z" />
                </svg>
                Cart {totalItems > 0 && <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">{totalItems}</span>}
              </Link>
              <Link
                href="/#quotation"
                onClick={(e) => handleNavClick(e, "/#quotation")}
                className="bg-forest-green text-white px-6 py-2 rounded-full hover:bg-green-700 transition text-center"
              >
                Request a Quote
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
