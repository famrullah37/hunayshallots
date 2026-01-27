import React from "react";
import { Globe, Award, Package, Users, Building2 } from "lucide-react";

export default function CompanyProfile() {
  const achievements = [
    {
      icon: Globe,
      label: "Ekspor ke 4 Negara",
      desc: "Jepang, Korea, Kanada, Singapura",
    },
    {
      icon: Award,
      label: "Sertifikasi Lengkap",
      desc: "Halal, BPOM, HACCP, GMP, GAP, ISO 9001",
    },
    {
      icon: Package,
      label: "Bawang Lokal",
      desc: "Varietas Biru Lancor Berkualitas",
    },
    {
      icon: Users,
      label: "Pemberdayaan",
      desc: "Perempuan Desa & Generasi Muda",
    },
  ];

  return (
    <section className="bg-linear-to-b from-white to-green-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Tentang{" "}
              <span className="text-forest-green">CV. Dua Putri Sholehah</span>
            </h2>
            <div className="mx-auto h-1 w-24 rounded-full bg-golden-yellow"></div>
          </div>

          {/* Main Content */}
          <div className="mb-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left: Company Story */}
            <div className="flex flex-col justify-center">
              <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-forest-green/10 px-4 py-2 text-sm font-semibold text-forest-green">
                <Building2 size={24} />
                <span>Berdiri Sejak 17 Oktober 2010</span>
              </div>

              <p className="mb-4 text-lg leading-relaxed text-gray-700">
                <strong className="text-forest-green">
                  CV. Dua Putri Sholehah
                </strong>{" "}
                adalah UMKM olahan bawang merah dengan merek{" "}
                <strong>Hunay</strong>, yang berdiri di Tegalrejo, Dringu,
                Probolinggo.
              </p>

              <p className="mb-4 leading-relaxed text-gray-600">
                Usaha ini berkembang dari skala kecil hingga berhasil{" "}
                <strong>ekspor ke Jepang, Korea, Kanada, dan Singapura</strong>.
                Produk utama berupa bawang goreng kemasan berkualitas tinggi
                dari varietas lokal <em>biru lancor</em>.
              </p>

              <p className="leading-relaxed text-gray-600">
                Proses produksi terintegrasi dari budidaya hingga distribusi,
                dengan komitmen memberdayakan perempuan desa dan generasi muda.
              </p>
            </div>

            {/* Right: Image Placeholder */}
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-3xl bg-linear-to-br from-golden-yellow/20 to-forest-green/20 shadow-xl">
                <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                  <div className="mb-4 text-8xl">🏢</div>
                  <p className="text-sm text-gray-600">
                    Tempatkan foto fasilitas produksi atau team Hunay di sini
                  </p>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-3xl bg-forest-green/10"></div>
            </div>
          </div>

          {/* Achievement Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {achievements.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white p-6 text-center shadow-lg transition hover:shadow-xl"
              >
                <div className="mb-3 w-16 h-16 bg-linear-to-br from-golden-yellow/20 to-forest-green/20 rounded-2xl flex items-center justify-center mx-auto">
                  <item.icon size={32} className="text-forest-green" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900">
                  {item.label}
                </h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Vision Statement */}
          <div className="mt-12 rounded-3xl bg-linear-to-r from-forest-green to-green-700 p-8 text-center text-white shadow-2xl md:p-12">
            <h3 className="mb-4 text-2xl font-bold md:text-3xl">Visi Kami</h3>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed">
              Terus tumbuh sebagai{" "}
              <strong>
                UMKM ekspor yang inovatif, berdaya saing, dan berkelanjutan
              </strong>
              , menghadirkan produk bawang goreng berkualitas tinggi untuk pasar
              lokal dan internasional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
