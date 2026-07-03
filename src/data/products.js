// Hardcoded example data for section one. In a later section this gets replaced
// by localStorage backed configuration edited inside the app.

export const PRODUCTS = [
  {
    id: "nfc-cards",
    name: "NFC Business Cards",
    blurb: "Tap to share contact and links",
    basePrice: 0.25,
    variants: [
      { id: "black", name: "Matte Black", price: 0.25 },
      { id: "white", name: "Gloss White", price: 0.35 },
      { id: "metal", name: "Brushed Metal", price: 1.2 },
    ],
    addons: [
      { id: "sticker", name: "Sticker Printing", price: 0.15 },
      { id: "url", name: "Custom URL Encoding", price: 0.1 },
      { id: "rush", name: "Rush Turnaround", price: 0.2 },
    ],
    presets: [10, 20, 50, 100, 250],
  },
  {
    id: "vinyl-stickers",
    name: "Vinyl Stickers",
    blurb: "Die cut weatherproof vinyl",
    basePrice: 0.4,
    variants: [
      { id: "matte", name: "Matte", price: 0.4 },
      { id: "holo", name: "Holographic", price: 0.75 },
    ],
    addons: [
      { id: "laminate", name: "UV Laminate", price: 0.12 },
      { id: "kisscut", name: "Kiss Cut Sheet", price: 0.08 },
    ],
    presets: [25, 50, 100, 500],
  },
];
