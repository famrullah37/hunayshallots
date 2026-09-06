"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";

const WHATSAPP_NUMBER = "6285233658619";

interface ShippingForm {
  nama: string;
  noWA: string;
  alamat: string;
  catatan: string;
  country: string;
}

const INTERNATIONAL_COUNTRIES = [
  { value: "Singapore", label: "🇸🇬 Singapore", region: "Southeast Asia", ratePerKg: 150000 },
  { value: "Malaysia", label: "🇲🇾 Malaysia", region: "Southeast Asia", ratePerKg: 120000 },
  { value: "Brunei", label: "🇧🇳 Brunei", region: "Southeast Asia", ratePerKg: 140000 },
  { value: "Japan", label: "🇯🇵 Japan", region: "East Asia", ratePerKg: 220000 },
  { value: "South Korea", label: "🇰🇷 South Korea", region: "East Asia", ratePerKg: 220000 },
  { value: "China", label: "🇨🇳 China", region: "East Asia", ratePerKg: 180000 },
  { value: "Taiwan", label: "🇹🇼 Taiwan", region: "East Asia", ratePerKg: 200000 },
  { value: "Australia", label: "🇦🇺 Australia", region: "Australia / NZ", ratePerKg: 280000 },
  { value: "New Zealand", label: "🇳🇿 New Zealand", region: "Australia / NZ", ratePerKg: 300000 },
  { value: "USA", label: "🇺🇸 United States", region: "Americas", ratePerKg: 350000 },
  { value: "Canada", label: "🇨🇦 Canada", region: "Americas", ratePerKg: 380000 },
  { value: "UK", label: "🇬🇧 United Kingdom", region: "Europe", ratePerKg: 320000 },
  { value: "Netherlands", label: "🇳🇱 Netherlands", region: "Europe", ratePerKg: 320000 },
  { value: "Germany", label: "🇩🇪 Germany", region: "Europe", ratePerKg: 320000 },
  { value: "France", label: "🇫🇷 France", region: "Europe", ratePerKg: 330000 },
  { value: "UAE", label: "🇦🇪 United Arab Emirates", region: "Middle East", ratePerKg: 260000 },
  { value: "Saudi Arabia", label: "🇸🇦 Saudi Arabia", region: "Middle East", ratePerKg: 260000 },
  { value: "Qatar", label: "🇶🇦 Qatar", region: "Middle East", ratePerKg: 260000 },
  { value: "Kuwait", label: "🇰🇼 Kuwait", region: "Middle East", ratePerKg: 280000 },
  { value: "Bahrain", label: "🇧🇭 Bahrain", region: "Middle East", ratePerKg: 270000 },
];

const COUNTRY_GROUPS = INTERNATIONAL_COUNTRIES.reduce<Record<string, typeof INTERNATIONAL_COUNTRIES>>((acc, c) => {
  if (!acc[c.region]) acc[c.region] = [];
  acc[c.region].push(c);
  return acc;
}, {});

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice, totalWeight } = useCart();
  const { formatPrice, formatDual } = useCurrency();

  const [form, setForm] = useState<ShippingForm>({ nama: "", noWA: "", alamat: "", catatan: "", country: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingForm, string>>>({});
  const [intlEstimate, setIntlEstimate] = useState<number | null>(null);

  useEffect(() => {
    if (!form.country) { setIntlEstimate(null); return; }
    const c = INTERNATIONAL_COUNTRIES.find(x => x.value === form.country);
    if (c) setIntlEstimate(c.ratePerKg * (totalWeight / 1000));
  }, [form.country, totalWeight]);

  const grandTotal = totalPrice + (intlEstimate ?? 0);

  const setField = (field: keyof ShippingForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<keyof ShippingForm, string>> = {};
    if (!form.nama.trim()) e.nama = "Required";
    if (!form.noWA.trim()) e.noWA = "Required";
    if (!form.alamat.trim()) e.alamat = "Required";
    if (!form.country) e.country = "Select destination country";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleWhatsAppOrder = () => {
    if (items.length === 0 || !validate()) return;

    const itemsList = items.map((item, i) => {
      return `${i + 1}. ${item.nameEn} (x${item.quantity}) — ${formatDual(item.price * item.quantity)}`;
    }).join("\n");

    const weightStr = totalWeight >= 1000
      ? `${(totalWeight / 1000).toFixed(2)} kg`
      : `${totalWeight} g`;

    const shippingLine = intlEstimate
      ? `International Shipping to ${form.country}: Est. ${formatDual(intlEstimate)} _(to be confirmed)_`
      : "Shipping: to be confirmed";
    const totalLine = intlEstimate
      ? `Subtotal: ${formatDual(totalPrice)} _(excl. final shipping)_`
      : `Subtotal: ${formatDual(totalPrice)} _(excl. shipping)_`;

    const shippingInfo = `📋 *Shipping Info:*\nName: ${form.nama}\nWhatsApp: ${form.noWA}\nAddress: ${form.alamat}\nDestination Country: ${form.country}${form.catatan ? `\nNotes: ${form.catatan}` : ""}`;

    const message = `Hello Hunay! I'd like to order:\n\n${itemsList}\n\nTotal Weight: ${weightStr}\n${shippingLine}\n${totalLine}\n\n${shippingInfo}\n\nThank you! 🙏`;

    window.open(`https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 pt-28 pb-20 max-w-5xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-24 flex flex-col items-center gap-6">
            <svg className="w-24 h-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 7h12.8M7 13L5.4 5M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
            <div>
              <p className="text-xl font-semibold text-gray-500 mb-1">Your cart is empty</p>
              <p className="text-gray-400 text-sm">Add products from the main page</p>
            </div>
            <Link href="/#produk" className="bg-forest-green text-white px-8 py-3 rounded-full font-medium hover:bg-green-700 transition">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 mt-8">

            {/* Left: items + shipping form */}
            <div className="flex-1 space-y-6">

              {/* Cart Items */}
              <div className="space-y-4">
                {items.map((item) => {
                  const imgSrc = item.imageUrl || `/products/${item.id}.jpg`;
                  return (
                    <div key={item.id} className="bg-white rounded-2xl shadow-sm p-4 flex gap-4 items-center">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                        <Image src={imgSrc} alt={item.nameEn} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1 line-clamp-2">{item.nameEn}</h3>
                        <p className="text-forest-green font-bold">{formatPrice(item.price)}</p>
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
                        <p className="text-sm font-semibold text-gray-700">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  );
                })}
                <button onClick={clearCart} className="text-sm text-red-400 hover:text-red-600 transition">
                  Clear cart
                </button>
              </div>

              {/* Shipping Form */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-5">Shipping Details</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.nama}
                      onChange={e => setField("nama", e.target.value)}
                      placeholder="Enter your full name"
                      className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest-green transition ${errors.nama ? "border-red-400" : "border-gray-200"}`}
                    />
                    {errors.nama && <p className="text-red-500 text-xs mt-1">{errors.nama}</p>}
                  </div>

                  {/* WhatsApp */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      WhatsApp Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={form.noWA}
                      onChange={e => setField("noWA", e.target.value)}
                      placeholder="+1 234 567 8900"
                      className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest-green transition ${errors.noWA ? "border-red-400" : "border-gray-200"}`}
                    />
                    {errors.noWA && <p className="text-red-500 text-xs mt-1">{errors.noWA}</p>}
                  </div>

                  {/* Address */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={form.alamat}
                      onChange={e => setField("alamat", e.target.value)}
                      placeholder="Street address, house number, city, postal code"
                      rows={3}
                      className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest-green transition resize-none ${errors.alamat ? "border-red-400" : "border-gray-200"}`}
                    />
                    {errors.alamat && <p className="text-red-500 text-xs mt-1">{errors.alamat}</p>}
                  </div>

                  {/* Destination country */}
                  <div className="sm:col-span-2 space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Destination Country <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={form.country}
                        onChange={e => setField("country", e.target.value)}
                        className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest-green transition bg-white ${errors.country ? "border-red-400" : "border-gray-200"}`}
                      >
                        <option value="">— Select Country —</option>
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
                        <p className="text-sm font-semibold text-blue-800">Shipping Estimate</p>
                        <p className="text-blue-700 text-xl font-bold mt-1">± {formatPrice(intlEstimate)}</p>
                        <p className="text-blue-600 text-xs mt-1">
                          Estimate for {totalWeight >= 1000 ? `${(totalWeight / 1000).toFixed(2)} kg` : `${totalWeight} g`}. Final cost confirmed by admin via WhatsApp.
                        </p>
                      </div>
                    )}

                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
                      <strong>Note:</strong>{" "}
                      International shipping via FedEx / DHL / EMS. Food products require halal certificate & export permit.
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                    <textarea
                      value={form.catatan}
                      onChange={e => setField("catatan", e.target.value)}
                      placeholder="Special delivery instructions (optional)"
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
                <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

                <div className="space-y-2 mb-4">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm text-gray-600">
                      <span className="truncate mr-2">{item.nameEn} ×{item.quantity}</span>
                      <span className="shrink-0">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-3 space-y-1.5 mb-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Total Weight</span>
                    <span className="font-medium">
                      {totalWeight >= 1000 ? `${(totalWeight / 1000).toFixed(2)} kg` : `${totalWeight} g`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    {intlEstimate !== null ? (
                      <span className="font-medium text-gray-800">± {formatPrice(intlEstimate)}</span>
                    ) : (
                      <span className="italic text-gray-400 text-xs">select country</span>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-3 mb-6">
                  <div className="flex justify-between font-bold text-gray-900 text-lg">
                    <span>Total</span>
                    <span>{formatPrice(grandTotal)}</span>
                  </div>
                  {intlEstimate === null && <p className="text-xs text-gray-400 mt-0.5">+ shipping</p>}
                  {intlEstimate !== null && <p className="text-xs text-amber-600 mt-0.5">* shipping is estimated</p>}
                </div>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Send Order via WhatsApp
                </button>

                <Link href="/#produk" className="block text-center text-sm text-gray-500 hover:text-forest-green transition mt-4">
                  ← Continue shopping
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
