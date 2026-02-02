"use client";

import React from "react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Image
        src="/hero-hunay.jpg"
        alt="Hunay Hero"
        fill
        className="object-cover"
        priority
        quality={100}
      />
    </section>
  );
}
