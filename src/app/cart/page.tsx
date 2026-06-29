"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";

const WHATSAPP_NUMBER = "6285233658619";

type ShippingType = "domestic" | "international";

interface Province { province_id: string; province: string; }
interface City { city_id: string; city_name: string; type: string; postal_code: string; }
interface ShippingService { service: string; description: string; cost: Array<{ value: number; etd: string; note: string }>; }
interface ShippingResult { code: string; name: string; costs: ShippingService[]; }
interface SelectedService { courierCode: string; courierName: string; service: string; description: string; cost: number; etd: string; }

interface ShippingForm {
  nama: string;
  noWA: string;
  alamat: string;
  catatan: string;
  provinsiId: string;
  provinsiName: string;
  kotaId: string;
  kotaName: string;
  country: string;
}

const INTERNATIONAL_COUNTRIES = [
  { value: "Singapore", label: "🇸🇬 Singapura", region: "Asia Tenggara", ratePerKg: 150000 },
  { value: "Malaysia", label: "🇲🇾 Malaysia", region: "Asia Tenggara", ratePerKg: 120000 },
  { value: "Brunei", label: "🇧🇳 Brunei", region: "Asia Tenggara", ratePerKg: 140000 },
  { value: "Japan", label: "🇯🇵 Jepang", region: "Asia Timur", ratePerKg: 220000 },
  { value: "South Korea", label: "🇰🇷 Korea Selatan", region: "Asia Timur", ratePerKg: 220000 },
  { value: "China", label: "🇨🇳 China", region: "Asia Timur", ratePerKg: 180000 },
  { value: "Taiwan", label: "🇹🇼 Taiwan", region: "Asia Timur", ratePerKg: 200000 },
  { value: "Australia", label: "🇦🇺 Australia", region: "Australia / NZ", ratePerKg: 280000 },
  { value: "New Zealand", label: "🇳🇿 Selandia Baru", region: "Australia / NZ", ratePerKg: 300000 },
  { value: "USA", label: "🇺🇸 Amerika Serikat", region: "Amerika", ratePerKg: 350000 },
  { value: "Canada", label: "🇨🇦 Kanada", region: "Amerika", ratePerKg: 380000 },
  { value: "UK", label: "🇬🇧 Inggris", region: "Eropa", ratePerKg: 320000 },
  { value: "Netherlands", label: "🇳🇱 Belanda", region: "Eropa", ratePerKg: 320000 },
  { value: "Germany", label: "🇩🇪 Jerman", region: "Eropa", ratePerKg: 320000 },
  { value: "France", label: "🇫🇷 Prancis", region: "Eropa", ratePerKg: 330000 },
  { value: "UAE", label: "🇦🇪 Uni Emirat Arab", region: "Timur Tengah", ratePerKg: 260000 },
  { value: "Saudi Arabia", label: "🇸🇦 Arab Saudi", region: "Timur Tengah", ratePerKg: 260000 },
  { value: "Qatar", label: "🇶🇦 Qatar", region: "Timur Tengah", ratePerKg: 260000 },
  { value: "Kuwait", label: "🇰🇼 Kuwait", region: "Timur Tengah", ratePerKg: 280000 },
  { value: "Bahrain", label: "🇧🇭 Bahrain", region: "Timur Tengah", ratePerKg: 270000 },
];

const COURIERS = [
  { value: "jne", label: "JNE" },
  { value: "tiki", label: "TIKI" },
  { value: "pos", label: "Pos Indonesia" },
  { value: "jnt", label: "J&T Express" },
  { value: "sicepat", label: "SiCepat" },
];

const COUNTRY_GROUPS = INTERNATIONAL_COUNTRIES.reduce<Record<string, typeof INTERNATIONAL_COUNTRIES>>((acc, c) => {
  if (!acc[c.region]) acc[c.region] = [];
  acc[c.region].push(c);
  return acc;
}, {});

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice, totalWeight } = useCart();
  const { language } = useLanguage();
  const id = language === "id";

  const [shippingType, setShippingType] = useState<ShippingType>("domestic");

  const [form, setForm] = useState<ShippingForm>({
    nama: "", noWA: "", alamat: "", catatan: "",
    provinsiId: "", provinsiName: "", kotaId: "", kotaName: "",
    country: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingForm, string>>>({});

  // Domestic calculator state
  const [hasApiKey, setHasApiKey] = useState<boolean | null>(null);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [courier, setCourier] = useState("jne");
  const [shippingResults, setShippingResults] = useState<ShippingResult[]>([]);
  const [selectedService, setSelectedService] = useState<SelectedService | null>(null);
  const [calculating, setCalculating] = useState(false);
  const [calcError, setCalcError] = useState<string | null>(null);
  const [loadingCities, setLoadingCities] = useState(false);

  // International estimate
  const [intlEstimate, setIntlEstimate] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/shipping/provinces")
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProvinces(data);
          setHasApiKey(true);
        } else {
          setHasApiKey(false);
        }
      })
      .catch(() => setHasApiKey(false));
  }, []);

  useEffect(() => {
    if (!form.provinsiId) { setCities([]); return; }
    setLoadingCities(true);
    setSelectedService(null);
    setShippingResults([]);
    fetch(`/api/shipping/cities?province=${form.provinsiId}`)
      .then(r => r.json())
      .then(data => setCities(Array.isArray(data) ? data : []))
      .finally(() => setLoadingCities(false));
  }, [form.provinsiId]);

  useEffect(() => {
    if (!form.country) { setIntlEstimate(null); return; }
    const c = INTERNATIONAL_COUNTRIES.find(x => x.value === form.country);
    if (c) setIntlEstimate(c.ratePerKg * (totalWeight / 1000));
  }, [form.country, totalWeight]);

  const calculateShipping = async () => {
    if (!form.kotaId) return;
    setCalculating(true);
    setCalcError(null);
    setShippingResults([]);
    setSelectedService(null);
    try {
      const res = await fetch("/api/shipping/cost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination: form.kotaId, weight: totalWeight, courier }),
      });
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setShippingResults(data);
      } else {
        setCalcError(data.error || (id ? "Layanan tidak tersedia. Coba kurir lain." : "Service unavailable. Try another courier."));
      }
    } catch {
      setCalcError(id ? "Gagal menghitung ongkir. Coba lagi." : "Failed to calculate. Try again.");
    } finally {
      setCalculating(false);
    }
  };

  const currentShippingCost = shippingType === "domestic" ? (selectedService?.cost ?? null) : intlEstimate;
  const grandTotal = totalPrice + (currentShippingCost ?? 0);

  const setField = (field: keyof ShippingForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<keyof ShippingForm, string>> = {};
    const req = id ? "Wajib diisi" : "Required";
    if (!form.nama.trim()) e.nama = req;
    if (!form.noWA.trim()) e.noWA = req;
    if (!form.alamat.trim()) e.alamat = req;
    if (shippingType === "domestic" && !form.kotaId && hasApiKey) e.kotaId = id ? "Pilih kota tujuan" : "Select destination city";
    if (shippingType === "international" && !form.country) e.country = id ? "Pilih negara tujuan" : "Select destination country";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleWhatsAppOrder = () => {
    if (items.length === 0 || !validate()) return;

    const itemsList = items.map((item, i) => {
      const name = language === "id" ? item.nameId : item.nameEn;
      return `${i + 1}. ${name} (x${item.quantity}) — Rp ${(item.price * item.quantity).toLocaleString("id-ID")}`;
    }).join("\n");

    const weightStr = totalWeight >= 1000
      ? `${(totalWeight / 1000).toFixed(2)} kg`
      : `${totalWeight} g`;

    let shippingLine = "";
    let totalLine = "";

    if (shippingType === "domestic" && selectedService) {
      shippingLine = id
        ? `Ongkir: ${selectedService.courierName} ${selectedService.service} — Rp ${selectedService.cost.toLocaleString("id-ID")} (est. ${selectedService.etd} hari)`
        : `Shipping: ${selectedService.courierName} ${selectedService.service} — Rp ${selectedService.cost.toLocaleString("id-ID")} (est. ${selectedService.etd} days)`;
      totalLine = id
        ? `*Total: Rp ${grandTotal.toLocaleString("id-ID")}* (sudah termasuk ongkir)`
        : `*Total: Rp ${grandTotal.toLocaleString("id-ID")}* (including shipping)`;
    } else if (shippingType === "international" && intlEstimate) {
      shippingLine = id
        ? `Ongkir Internasional ke ${form.country}: Estimasi Rp ${intlEstimate.toLocaleString("id-ID")} _(dikonfirmasi admin)_`
        : `International Shipping to ${form.country}: Est. Rp ${intlEstimate.toLocaleString("id-ID")} _(to be confirmed)_`;
      totalLine = id
        ? `Subtotal: Rp ${totalPrice.toLocaleString("id-ID")} _(belum termasuk ongkir final)_`
        : `Subtotal: Rp ${totalPrice.toLocaleString("id-ID")} _(excl. final shipping)_`;
    } else {
      shippingLine = id ? "Ongkir: dikonfirmasi kemudian" : "Shipping: to be confirmed";
      totalLine = id
        ? `Subtotal: Rp ${totalPrice.toLocaleString("id-ID")} _(belum termasuk ongkir)_`
        : `Subtotal: Rp ${totalPrice.toLocaleString("id-ID")} _(excl. shipping)_`;
    }

    const destinationInfo = shippingType === "domestic"
      ? (id ? `Kota: ${form.kotaName}, ${form.provinsiName}` : `City: ${form.kotaName}, ${form.provinsiName}`)
      : (id ? `Negara Tujuan: ${form.country}` : `Destination Country: ${form.country}`);

    const shippingInfo = id
      ? `📋 *Data Pengiriman:*\nNama: ${form.nama}\nNo. WhatsApp: ${form.noWA}\nAlamat: ${form.alamat}\n${destinationInfo}${form.catatan ? `\nCatatan: ${form.catatan}` : ""}`
      : `📋 *Shipping Info:*\nName: ${form.nama}\nWhatsApp: ${form.noWA}\nAddress: ${form.alamat}\n${destinationInfo}${form.catatan ? `\nNotes: ${form.catatan}` : ""}`;

    const message = id
      ? `Halo Hunay! Saya ingin memesan:\n\n${itemsList}\n\nTotal Berat: ${weightStr}\n${shippingLine}\n${totalLine}\n\n${shippingInfo}\n\nTerima kasih! 🙏`
      : `Hello Hunay! I'd like to order:\n\n${itemsList}\n\nTotal Weight: ${weightStr}\n${shippingLine}\n${totalLine}\n\n${shippingInfo}\n\nThank you! 🙏`;

    window.open(`https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 pt-28 pb-20 max-w-5xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {id ? "Keranjang Belanja" : "Shopping Cart"}
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-24 flex flex-col items-center gap-6">
            <svg className="w-24 h-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 7h12.8M7 13L5.4 5M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
            <div>
              <p className="text-xl font-semibold text-gray-500 mb-1">
                {id ? "Keranjang masih kosong" : "Your cart is empty"}
              </p>
              <p className="text-gray-400 text-sm">
                {id ? "Tambahkan produk dari halaman utama" : "Add products from the main page"}
              </p>
            </div>
            <Link href="/#produk" className="bg-forest-green text-white px-8 py-3 rounded-full font-medium hover:bg-green-700 transition">
              {id ? "Lihat Produk" : "Browse Products"}
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 mt-8">

            {/* Left: items + shipping form */}
            <div className="flex-1 space-y-6">

              {/* Cart Items */}
              <div className="space-y-4">
                {items.map((item) => {
                  const name = id ? item.nameId : item.nameEn;
                  const imgSrc = item.imageUrl || `/products/${item.id}.jpg`;
                  return (
                    <div key={item.id} className="bg-white rounded-2xl shadow-sm p-4 flex gap-4 items-center">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                        <Image src={imgSrc} alt={name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1 line-clamp-2">{name}</h3>
                        <p className="text-forest-green font-bold">Rp {item.price.toLocaleString("id-ID")}</p>
                      </div>
                      <div className="flex flex-col items-end gap-3 shrink-0">
                        <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 transition" aria-label="Remove">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <div className="flex items-center gap-2 border border-gray-200 rounded-xl overflow-hidden">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 transition font-bold">−</button>
                          <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 transition font-bold">+</button>
                        </div>
                        <p className="text-sm font-semibold text-gray-700">Rp {(item.price * item.quantity).toLocaleString("id-ID")}</p>
                      </div>
                    </div>
                  );
                })}
                <button onClick={clearCart} className="text-sm text-red-400 hover:text-red-600 transition">
                  {id ? "Kosongkan keranjang" : "Clear cart"}
                </button>
              </div>

              {/* Shipping Form */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-5">
                  {id ? "Data Pengiriman" : "Shipping Details"}
                </h2>

                {/* Shipping type toggle */}
                <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-xl w-fit">
                  <button
                    type="button"
                    onClick={() => { setShippingType("domestic"); setSelectedService(null); setIntlEstimate(null); setErrors({}); }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${shippingType === "domestic" ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
                  >
                    🇮🇩 {id ? "Dalam Negeri" : "Domestic"}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShippingType("international"); setSelectedService(null); setErrors({}); }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${shippingType === "international" ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
                  >
                    🌍 {id ? "Luar Negeri" : "International"}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Nama */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {id ? "Nama Lengkap" : "Full Name"} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.nama}
                      onChange={e => setField("nama", e.target.value)}
                      placeholder={id ? "Masukkan nama lengkap" : "Enter your full name"}
                      className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest-green transition ${errors.nama ? "border-red-400" : "border-gray-200"}`}
                    />
                    {errors.nama && <p className="text-red-500 text-xs mt-1">{errors.nama}</p>}
                  </div>

                  {/* No. WhatsApp */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {id ? "Nomor WhatsApp" : "WhatsApp Number"} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={form.noWA}
                      onChange={e => setField("noWA", e.target.value)}
                      placeholder="08xxxxxxxxxx"
                      className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest-green transition ${errors.noWA ? "border-red-400" : "border-gray-200"}`}
                    />
                    {errors.noWA && <p className="text-red-500 text-xs mt-1">{errors.noWA}</p>}
                  </div>

                  {/* Alamat */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {id ? "Alamat Lengkap" : "Full Address"} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={form.alamat}
                      onChange={e => setField("alamat", e.target.value)}
                      placeholder={id ? "Nama jalan, no. rumah, RT/RW, kelurahan, kecamatan" : "Street address, house number, district"}
                      rows={3}
                      className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest-green transition resize-none ${errors.alamat ? "border-red-400" : "border-gray-200"}`}
                    />
                    {errors.alamat && <p className="text-red-500 text-xs mt-1">{errors.alamat}</p>}
                  </div>

                  {/* ── DOMESTIC ── */}
                  {shippingType === "domestic" && (
                    <>
                      {/* Province */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {id ? "Provinsi" : "Province"} <span className="text-red-500">*</span>
                        </label>
                        {hasApiKey === false ? (
                          <div className="w-full px-4 py-2.5 border border-amber-300 bg-amber-50 rounded-xl text-xs text-amber-700">
                            {id ? "Kalkulator ongkir belum dikonfigurasi admin. Ongkir dikonfirmasi via WhatsApp." : "Shipping calculator not configured. Cost will be confirmed via WhatsApp."}
                          </div>
                        ) : (
                          <select
                            value={form.provinsiId}
                            onChange={e => {
                              const opt = provinces.find(p => p.province_id === e.target.value);
                              setField("provinsiId", e.target.value);
                              setField("provinsiName", opt?.province ?? "");
                              setField("kotaId", "");
                              setField("kotaName", "");
                            }}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest-green transition bg-white"
                          >
                            <option value="">{id ? "— Pilih Provinsi —" : "— Select Province —"}</option>
                            {provinces.map(p => (
                              <option key={p.province_id} value={p.province_id}>{p.province}</option>
                            ))}
                          </select>
                        )}
                      </div>

                      {/* City */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {id ? "Kota / Kabupaten" : "City"} <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={form.kotaId}
                          onChange={e => {
                            const opt = cities.find(c => c.city_id === e.target.value);
                            setField("kotaId", e.target.value);
                            setField("kotaName", opt ? `${opt.type} ${opt.city_name}` : "");
                          }}
                          disabled={!form.provinsiId || loadingCities || hasApiKey === false}
                          className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest-green transition bg-white disabled:bg-gray-50 disabled:text-gray-400 ${errors.kotaId ? "border-red-400" : "border-gray-200"}`}
                        >
                          <option value="">
                            {loadingCities
                              ? (id ? "Memuat kota..." : "Loading cities...")
                              : !form.provinsiId
                                ? (id ? "— Pilih provinsi dulu —" : "— Select province first —")
                                : (id ? "— Pilih Kota —" : "— Select City —")}
                          </option>
                          {cities.map(c => (
                            <option key={c.city_id} value={c.city_id}>{c.type} {c.city_name}</option>
                          ))}
                        </select>
                        {errors.kotaId && <p className="text-red-500 text-xs mt-1">{errors.kotaId}</p>}
                      </div>

                      {/* Courier + Calculate */}
                      {hasApiKey !== false && (
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {id ? "Pilih Kurir" : "Select Courier"}
                          </label>
                          <div className="flex gap-2 flex-wrap mb-3">
                            {COURIERS.map(c => (
                              <button
                                key={c.value}
                                type="button"
                                onClick={() => { setCourier(c.value); setShippingResults([]); setSelectedService(null); setCalcError(null); }}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${courier === c.value ? "bg-forest-green text-white border-forest-green" : "bg-white text-gray-600 border-gray-300 hover:border-forest-green"}`}
                              >
                                {c.label}
                              </button>
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={calculateShipping}
                            disabled={!form.kotaId || calculating}
                            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl text-sm font-medium transition flex items-center gap-2"
                          >
                            {calculating ? (
                              <>
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                {id ? "Menghitung..." : "Calculating..."}
                              </>
                            ) : (id ? "🔍 Cek Ongkir" : "🔍 Check Rate")}
                          </button>

                          {calcError && <p className="text-red-500 text-xs mt-2">{calcError}</p>}

                          {/* Shipping results list */}
                          {shippingResults.length > 0 && (
                            <div className="mt-4 space-y-2">
                              <p className="text-xs font-medium text-gray-600 mb-1">
                                {id ? "Pilih layanan pengiriman:" : "Select a shipping service:"}
                              </p>
                              {shippingResults.flatMap(result =>
                                result.costs.map(svc => {
                                  const cost = svc.cost[0];
                                  if (!cost || cost.value === 0) return null;
                                  const key = `${result.code}-${svc.service}`;
                                  const isSelected = selectedService?.courierCode === result.code && selectedService?.service === svc.service;
                                  return (
                                    <button
                                      key={key}
                                      type="button"
                                      onClick={() => setSelectedService({
                                        courierCode: result.code,
                                        courierName: result.name,
                                        service: svc.service,
                                        description: svc.description,
                                        cost: cost.value,
                                        etd: cost.etd,
                                      })}
                                      className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition ${isSelected ? "border-forest-green bg-green-50 ring-1 ring-forest-green" : "border-gray-200 hover:border-gray-300 bg-white"}`}
                                    >
                                      <div className="flex justify-between items-center">
                                        <div>
                                          <span className="font-semibold">{result.name} {svc.service}</span>
                                          <span className="text-gray-500 ml-2 text-xs">({svc.description})</span>
                                          <p className="text-xs text-gray-400 mt-0.5">
                                            {id ? `Est. ${cost.etd} hari` : `Est. ${cost.etd} days`}
                                          </p>
                                        </div>
                                        <div className="text-right shrink-0 ml-4">
                                          <p className="font-bold text-gray-900">Rp {cost.value.toLocaleString("id-ID")}</p>
                                          {isSelected && <p className="text-xs text-forest-green font-medium mt-0.5">✓ {id ? "Dipilih" : "Selected"}</p>}
                                        </div>
                                      </div>
                                    </button>
                                  );
                                })
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}

                  {/* ── INTERNATIONAL ── */}
                  {shippingType === "international" && (
                    <div className="sm:col-span-2 space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {id ? "Negara Tujuan" : "Destination Country"} <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={form.country}
                          onChange={e => setField("country", e.target.value)}
                          className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest-green transition bg-white ${errors.country ? "border-red-400" : "border-gray-200"}`}
                        >
                          <option value="">{id ? "— Pilih Negara —" : "— Select Country —"}</option>
                          {Object.entries(COUNTRY_GROUPS).map(([region, countries]) => (
                            <optgroup key={region} label={region}>
                              {countries.map(c => (
                                <option key={c.value} value={c.value}>{c.label}</option>
                              ))}
                            </optgroup>
                          ))}
                        </select>
                        {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                      </div>

                      {intlEstimate !== null && (
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                          <p className="text-sm font-semibold text-blue-800">
                            {id ? "Estimasi Ongkir Internasional" : "International Shipping Estimate"}
                          </p>
                          <p className="text-blue-700 text-xl font-bold mt-1">
                            ± Rp {intlEstimate.toLocaleString("id-ID")}
                          </p>
                          <p className="text-blue-600 text-xs mt-1">
                            {id
                              ? `Estimasi untuk ${totalWeight >= 1000 ? `${(totalWeight / 1000).toFixed(2)} kg` : `${totalWeight} g`}. Ongkir final dikonfirmasi admin via WhatsApp.`
                              : `Estimate for ${totalWeight >= 1000 ? `${(totalWeight / 1000).toFixed(2)} kg` : `${totalWeight} g`}. Final cost confirmed by admin via WhatsApp.`}
                          </p>
                        </div>
                      )}

                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
                        <strong>{id ? "Info:" : "Note:"}</strong>{" "}
                        {id
                          ? "Pengiriman internasional via FedEx / DHL / EMS. Produk makanan memerlukan sertifikat halal & izin ekspor."
                          : "International shipping via FedEx / DHL / EMS. Food products require halal certificate & export permit."}
                      </div>
                    </div>
                  )}

                  {/* Catatan */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {id ? "Catatan Tambahan" : "Additional Notes"}
                    </label>
                    <textarea
                      value={form.catatan}
                      onChange={e => setField("catatan", e.target.value)}
                      placeholder={id ? "Instruksi khusus untuk pengiriman (opsional)" : "Special delivery instructions (optional)"}
                      rows={2}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest-green transition resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:w-80 shrink-0">
              <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  {id ? "Ringkasan Pesanan" : "Order Summary"}
                </h2>

                <div className="space-y-2 mb-4">
                  {items.map(item => {
                    const name = id ? item.nameId : item.nameEn;
                    return (
                      <div key={item.id} className="flex justify-between text-sm text-gray-600">
                        <span className="truncate mr-2">{name} ×{item.quantity}</span>
                        <span className="shrink-0">Rp {(item.price * item.quantity).toLocaleString("id-ID")}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-gray-100 pt-3 space-y-1.5 mb-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{id ? "Total Berat" : "Total Weight"}</span>
                    <span className="font-medium">
                      {totalWeight >= 1000 ? `${(totalWeight / 1000).toFixed(2)} kg` : `${totalWeight} g`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{id ? "Ongkir" : "Shipping"}</span>
                    {currentShippingCost !== null ? (
                      <span className="font-medium text-gray-800">
                        {shippingType === "international" ? "± " : ""}Rp {currentShippingCost.toLocaleString("id-ID")}
                      </span>
                    ) : (
                      <span className="italic text-gray-400 text-xs">
                        {shippingType === "domestic"
                          ? (hasApiKey ? (id ? "cek ongkir dulu" : "check rate first") : (id ? "via WA" : "via WA"))
                          : (id ? "pilih negara" : "select country")}
                      </span>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-3 mb-6">
                  <div className="flex justify-between font-bold text-gray-900 text-lg">
                    <span>Total</span>
                    <span>Rp {grandTotal.toLocaleString("id-ID")}</span>
                  </div>
                  {currentShippingCost === null && (
                    <p className="text-xs text-gray-400 mt-0.5">{id ? "+ ongkir" : "+ shipping"}</p>
                  )}
                  {shippingType === "international" && currentShippingCost !== null && (
                    <p className="text-xs text-amber-600 mt-0.5">{id ? "* ongkir adalah estimasi" : "* shipping is estimated"}</p>
                  )}
                </div>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {id ? "Kirim Pesanan via WhatsApp" : "Send Order via WhatsApp"}
                </button>

                <Link href="/#produk" className="block text-center text-sm text-gray-500 hover:text-forest-green transition mt-4">
                  {id ? "← Lanjut belanja" : "← Continue shopping"}
                </Link>
              </div>
            </div>

          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
