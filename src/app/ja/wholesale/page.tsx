import type { Metadata } from "next";
import WholesaleLocalized, { type WholesaleCopy } from "@/components/WholesaleLocalized";
import { WHOLESALE_LANGUAGES } from "@/lib/i18n/hreflang";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hunayshallots.com";
const PATH = "/ja/wholesale";

// TODO: ネイティブスピーカーによる校正を推奨 (native review before promoting)
const copy: WholesaleCopy = {
  lang: "ja",
  path: PATH,
  breadcrumbHome: "ホーム",
  breadcrumbSelf: "卸売・輸出",
  englishLink: "English",
  h1: "インドネシア産フライドエシャロット（揚げエシャロット）の卸売・輸出",
  intro:
    "Hunay（フナイ）は、インドネシア東ジャワ州プロボリンゴ産のビルランチョール種エシャロットを使った、サクサクのフライドエシャロットとフライドガーリックを製造しています。ハラル（MUI）、HACCP、ISO 9001認証取得、保存料不使用。日本をはじめ、韓国、カナダ、シンガポール、アメリカ、オーストラリアへ輸出しています。",
  ctaQuote: "見積もりを依頼する",
  ctaSpec: "製品仕様書（PDF・英語）",
  productsTitle: "取扱製品",
  products: [
    { name: "フライドエシャロット", image: "/products/bawang-merah-goreng-pouch.jpg", spec: "ビルランチョール種エシャロット100%、ココナッツオイル、塩。小麦粉・保存料不使用。" },
    { name: "フライドガーリック", image: "/products/bawang-putih-goreng-pouch.jpg", spec: "厳選したニンニク、ココナッツオイル、塩。添加物・保存料不使用。" },
    { name: "プライベートブランド（OEM）", image: "/products/bawang-merah-goreng-toples-150.jpg", spec: "お客様のブランド・パッケージで製造。原料から完成品まで対応します。" },
  ],
  specsTitle: "製品仕様",
  specs: [
    { label: "原料", value: "東ジャワ州プロボリンゴ産ビルランチョール種エシャロット（原料水分62〜65%）" },
    { label: "原材料", value: "エシャロットまたはニンニク、ココナッツオイル、塩" },
    { label: "保存料", value: "不使用" },
    { label: "賞味期限", value: "未開封で6〜12ヶ月（真空包装）" },
    { label: "小売パック", value: "パウチ100g・ジャー150g・ボトル75g" },
    { label: "業務用パック", value: "お問い合わせください" },
    { label: "認証", value: "ハラルMUI、BPOM、ISO 9001:2015、HACCP、GMP、GAP" },
  ],
  termsTitle: "取引条件",
  terms: [
    { label: "最小注文数量（MOQ）", value: "10 kg" },
    { label: "生産能力", value: "月1トン以上" },
    { label: "インコタームズ", value: "お問い合わせください（FOB／CIFなど）" },
    { label: "納期", value: "お問い合わせください" },
    { label: "サンプル", value: "ご依頼に応じて提供" },
  ],
  certsTitle: "認証",
  marketsTitle: "輸出先",
  markets: ["日本", "韓国", "カナダ", "シンガポール", "アメリカ", "オーストラリア"],
  faqTitle: "よくある質問",
  faqs: [
    { q: "日本への輸出実績はありますか？", a: "はい。Hunayは日本、韓国、カナダ、シンガポール、アメリカ、オーストラリアへフライドエシャロットを輸出しています。" },
    { q: "原材料は何ですか？", a: "プロボリンゴ産ビルランチョール種エシャロット、ココナッツオイル、塩のみです。小麦粉や保存料は使用していません。" },
    { q: "ハラル認証はありますか？", a: "はい。ハラルMUI認証のほか、BPOM、ISO 9001:2015、HACCP、GMP、GAPを取得しています。証明書の写しはご依頼に応じてお送りします。" },
    { q: "賞味期限はどのくらいですか？", a: "未開封で6〜12ヶ月です。開封後は密閉容器に入れ、涼しく乾燥した場所で保存してください。冷蔵庫での保存は湿気の原因になるため避けてください。" },
    { q: "最小注文数量はどのくらいですか？", a: "最小注文数量は10 kgです。大口注文やプライベートブランドについては個別にお見積もりします。" },
    { q: "自社ブランドで製造できますか？", a: "はい。OEM（プライベートブランド）製造に対応しています。" },
  ],
  quoteTitle: "見積もり依頼",
  quoteIntro: "必要事項をご記入ください。価格・仕様・サンプルについてメールでご連絡します（英語またはインドネシア語での対応となります）。",
  form: {
    name: "お名前",
    company: "会社名",
    email: "メールアドレス",
    phone: "電話番号／WhatsApp（任意）",
    country: "配送先の国",
    product: "製品",
    productOptions: ["フライドエシャロット", "フライドガーリック", "両方", "プライベートブランド（OEM）"],
    volume: "予定数量（例：月200 kg）",
    packaging: "包装",
    packagingOptions: ["小売パック", "業務用（バルク）", "プライベートブランド", "未定"],
    message: "メッセージ（任意）",
    submit: "送信する",
    sending: "送信中…",
    success: "お問い合わせありがとうございます。1〜2営業日以内にメールでご連絡いたします。",
    errors: {
      missing: "必須項目をすべてご入力ください。",
      email: "有効なメールアドレスをご入力ください。",
      rate: "送信回数が多すぎます。しばらくしてから再度お試しいただくか、メールでご連絡ください。",
      server: "エラーが発生しました。お手数ですがメールで直接ご連絡ください。",
    },
    required: "必須",
  },
  contactTitle: "メール・WhatsAppでのお問い合わせ",
};

export const metadata: Metadata = {
  title: { absolute: "フライドエシャロット 卸売・輸出｜インドネシア産 ハラル認証｜Hunay" },
  description:
    "インドネシア・プロボリンゴ産のフライドエシャロットとフライドガーリックを卸売・輸出。ハラルMUI、HACCP、ISO 9001認証、保存料不使用。最小注文10 kg、OEM対応。",
  alternates: { canonical: `${BASE_URL}${PATH}`, languages: WHOLESALE_LANGUAGES },
  openGraph: {
    type: "website",
    url: `${BASE_URL}${PATH}`,
    locale: "ja_JP",
    siteName: "Hunay Fried Onions",
    title: "フライドエシャロット 卸売・輸出｜Hunay（インドネシア）",
    description: "ハラル認証・保存料不使用のフライドエシャロット。日本への輸出実績あり。",
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Hunay フライドエシャロット" }],
  },
};

export default function JaWholesalePage() {
  return <WholesaleLocalized copy={copy} />;
}
