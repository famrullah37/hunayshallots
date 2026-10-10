import type { Metadata } from "next";
import WholesaleLocalized, { type WholesaleCopy } from "@/components/WholesaleLocalized";
import { WHOLESALE_LANGUAGES } from "@/lib/i18n/hreflang";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hunayshallots.com";
const PATH = "/ko/wholesale";

// TODO: 원어민 검수 권장 (native review before promoting)
const copy: WholesaleCopy = {
  lang: "ko",
  path: PATH,
  breadcrumbHome: "홈",
  breadcrumbSelf: "도매·수출",
  englishLink: "English",
  h1: "인도네시아산 튀긴 샬롯 도매·수출",
  intro:
    "Hunay(후나이)는 인도네시아 동부 자바 프로볼링고산 비루 란초르 품종 샬롯으로 바삭한 튀긴 샬롯과 튀긴 마늘을 생산합니다. 할랄(MUI), HACCP, ISO 9001 인증을 받았으며 방부제를 사용하지 않습니다. 한국, 일본, 캐나다, 싱가포르, 미국, 호주로 수출하고 있습니다.",
  ctaQuote: "견적 요청하기",
  ctaSpec: "제품 사양서 (PDF·영문)",
  productsTitle: "공급 제품",
  products: [
    { name: "튀긴 샬롯", image: "/products/bawang-merah-goreng-pouch.jpg", spec: "비루 란초르 샬롯 100%, 코코넛 오일, 소금. 밀가루·방부제 무첨가." },
    { name: "튀긴 마늘", image: "/products/bawang-putih-goreng-pouch.jpg", spec: "엄선한 마늘, 코코넛 오일, 소금. 첨가물·방부제 무첨가." },
    { name: "자체 브랜드(OEM)", image: "/products/bawang-merah-goreng-toples-150.jpg", spec: "고객사의 브랜드와 포장으로 생산합니다. 원료부터 완제품까지 대응합니다." },
  ],
  specsTitle: "제품 사양",
  specs: [
    { label: "원료", value: "동부 자바 프로볼링고산 비루 란초르 샬롯 (원료 수분 62~65%)" },
    { label: "원재료", value: "샬롯 또는 마늘, 코코넛 오일, 소금" },
    { label: "방부제", value: "무첨가" },
    { label: "유통기한", value: "미개봉 시 6~12개월 (진공 포장)" },
    { label: "소매 포장", value: "파우치 100g · 병 150g · 보틀 75g" },
    { label: "대용량 포장", value: "문의 바랍니다" },
    { label: "인증", value: "할랄 MUI, BPOM, ISO 9001:2015, HACCP, GMP, GAP" },
  ],
  termsTitle: "거래 조건",
  terms: [
    { label: "최소 주문 수량(MOQ)", value: "10 kg" },
    { label: "생산 능력", value: "월 1톤 이상" },
    { label: "인코텀즈", value: "문의 바랍니다 (FOB / CIF 등)" },
    { label: "납기", value: "문의 바랍니다" },
    { label: "샘플", value: "요청 시 제공" },
  ],
  certsTitle: "인증",
  marketsTitle: "수출 국가",
  markets: ["한국", "일본", "캐나다", "싱가포르", "미국", "호주"],
  faqTitle: "자주 묻는 질문",
  faqs: [
    { q: "한국으로 수출한 실적이 있나요?", a: "네. Hunay는 한국, 일본, 캐나다, 싱가포르, 미국, 호주로 튀긴 샬롯을 수출하고 있습니다." },
    { q: "원재료는 무엇인가요?", a: "프로볼링고산 비루 란초르 샬롯, 코코넛 오일, 소금만 사용합니다. 밀가루나 방부제는 넣지 않습니다." },
    { q: "할랄 인증이 있나요?", a: "네. 할랄 MUI 인증과 함께 BPOM, ISO 9001:2015, HACCP, GMP, GAP 인증을 보유하고 있습니다. 인증서 사본은 요청 시 보내드립니다." },
    { q: "유통기한은 얼마나 되나요?", a: "미개봉 시 6~12개월입니다. 개봉 후에는 밀폐 용기에 담아 서늘하고 건조한 곳에 보관하세요. 냉장 보관은 습기 때문에 피해 주세요." },
    { q: "최소 주문 수량은 얼마인가요?", a: "최소 주문 수량은 10 kg입니다. 대량 주문과 자체 브랜드 생산은 별도로 견적을 드립니다." },
    { q: "자체 브랜드로 생산할 수 있나요?", a: "네. OEM(자체 브랜드) 생산이 가능합니다." },
  ],
  quoteTitle: "견적 요청",
  quoteIntro: "필요한 내용을 입력해 주세요. 가격, 사양, 샘플에 대해 이메일로 답변드립니다 (영어 또는 인도네시아어로 응대합니다).",
  form: {
    name: "성함",
    company: "회사명",
    email: "이메일",
    phone: "전화번호 / WhatsApp (선택)",
    country: "배송 국가",
    product: "제품",
    productOptions: ["튀긴 샬롯", "튀긴 마늘", "둘 다", "자체 브랜드(OEM)"],
    volume: "예상 수량 (예: 월 200 kg)",
    packaging: "포장",
    packagingOptions: ["소매 포장", "대용량(벌크)", "자체 브랜드", "미정"],
    message: "메시지 (선택)",
    submit: "보내기",
    sending: "보내는 중…",
    success: "문의해 주셔서 감사합니다. 영업일 기준 1~2일 이내에 이메일로 답변드리겠습니다.",
    errors: {
      missing: "필수 항목을 모두 입력해 주세요.",
      email: "올바른 이메일 주소를 입력해 주세요.",
      rate: "요청이 너무 많습니다. 잠시 후 다시 시도하거나 이메일로 연락해 주세요.",
      server: "오류가 발생했습니다. 이메일로 직접 연락해 주세요.",
    },
    required: "필수",
  },
  contactTitle: "이메일·WhatsApp 문의",
};

export const metadata: Metadata = {
  title: { absolute: "튀긴 샬롯 도매·수출 | 인도네시아산 할랄 인증 | Hunay" },
  description:
    "인도네시아 프로볼링고산 튀긴 샬롯과 튀긴 마늘 도매·수출. 할랄 MUI, HACCP, ISO 9001 인증, 방부제 무첨가. 최소 주문 10 kg, OEM 가능.",
  alternates: { canonical: `${BASE_URL}${PATH}`, languages: WHOLESALE_LANGUAGES },
  openGraph: {
    type: "website",
    url: `${BASE_URL}${PATH}`,
    locale: "ko_KR",
    siteName: "Hunay Fried Onions",
    title: "튀긴 샬롯 도매·수출 | Hunay (인도네시아)",
    description: "할랄 인증, 방부제 무첨가 튀긴 샬롯. 한국 수출 실적 보유.",
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Hunay 튀긴 샬롯" }],
  },
};

export default function KoWholesalePage() {
  return <WholesaleLocalized copy={copy} />;
}
