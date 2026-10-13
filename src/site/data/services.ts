export interface Service {
  id: string;
  name: string;
  category: 'facial' | 'body' | 'massage' | 'ritual' | 'hair' | 'nail';
  duration: number; // minutes
  price: number;
  tagline: string;
  description: string;
  sensoryDescription: string;
  benefits: string[];
  whatToExpect: string;
  image: string;
  featured: boolean;
  addOns: string[]; // ids of add-on services
}

export const services: Service[] = [
  {
    id: 'luminous-facial',
    name: 'Luminous Renewal Facial',
    category: 'facial',
    duration: 90,
    price: 285,
    tagline: 'Radiance, restored.',
    description:
      'A deeply restorative facial that merges ancient botanical wisdom with modern skin science. Crafted for those who seek visible transformation without compromise.',
    sensoryDescription:
      'Warm rose quartz tools glide across your skin as the scent of neroli and white tea fills the air — a ritual of pure luminosity.',
    benefits: [
      'Deep cellular renewal',
      'Visible radiance boost',
      'Hydration lock for 72 hours',
      'Reduced fine lines and texture',
    ],
    whatToExpect:
      'Your journey begins with a warm botanical cleanse, followed by a custom enzyme exfoliation. A jade-cooled serum infusion and hand-pressed facial massage complete the experience, leaving skin visibly lifted and luminous.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
    featured: true,
    addOns: ['eye-ritual', 'scalp-ceremony'],
  },
  {
    id: 'ritual-body-wrap',
    name: 'Sacred Earth Body Ritual',
    category: 'ritual',
    duration: 120,
    price: 340,
    tagline: 'Grounded. Renewed. Transformed.',
    description:
      'An immersive full-body ceremony drawing on mineral-rich clays, warm botanical oils, and ancient wrapping techniques to detoxify, sculpt, and deeply nourish.',
    sensoryDescription:
      'Warm volcanic clay envelops your body as sandalwood and vetiver transport you to a state of profound stillness. Emerge reborn.',
    benefits: [
      'Deep detoxification',
      'Skin softening and smoothing',
      'Mineral replenishment',
      'Stress and tension release',
    ],
    whatToExpect:
      'Beginning with a dry-brush exfoliation, warm mineral clay is applied from décolletage to feet. You are cocooned in warm linen while the clay draws impurities and infuses minerals. A warm shower and full-body oil massage complete the ritual.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    featured: true,
    addOns: ['aromatherapy-upgrade', 'scalp-ceremony'],
  },
  {
    id: 'signature-massage',
    name: 'Serenova Signature Massage',
    category: 'massage',
    duration: 75,
    price: 195,
    tagline: 'Tension dissolved. Stillness found.',
    description:
      'Our signature full-body massage weaves Swedish, deep tissue, and lymphatic techniques into a seamless, intuitive flow — tailored entirely to your body\'s needs.',
    sensoryDescription:
      'Warm organic oils infused with lavender and eucalyptus melt into your skin as skilled hands release every layer of held tension.',
    benefits: [
      'Full-body tension release',
      'Improved circulation',
      'Lymphatic drainage',
      'Deep nervous system reset',
    ],
    whatToExpect:
      'Your therapist begins with a brief consultation to understand your body\'s needs. The massage flows from scalp to sole, using warm oil and intuitive pressure to dissolve tension and restore balance.',
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80',
    featured: true,
    addOns: ['aromatherapy-upgrade', 'hot-stone-add'],
  },
  {
    id: 'hot-stone-massage',
    name: 'Volcanic Stone Therapy',
    category: 'massage',
    duration: 90,
    price: 245,
    tagline: 'Ancient heat. Modern serenity.',
    description:
      'Smooth basalt stones, heated to the perfect temperature, are placed along energy meridians and used in flowing massage strokes to melt deep muscular tension.',
    sensoryDescription:
      'The weight of warm volcanic stone against your skin creates an almost meditative heaviness — a profound release that reaches far beyond the physical.',
    benefits: [
      'Deep muscle release',
      'Improved energy flow',
      'Reduced chronic tension',
      'Profound relaxation',
    ],
    whatToExpect:
      'Heated basalt stones are placed along your spine and energy points while your therapist uses additional stones in flowing massage strokes. The combination of heat and pressure creates an unparalleled depth of release.',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80',
    featured: false,
    addOns: ['aromatherapy-upgrade', 'scalp-ceremony'],
  },
  {
    id: 'botanical-peel',
    name: 'Botanical Resurfacing Peel',
    category: 'facial',
    duration: 60,
    price: 185,
    tagline: 'Reveal your most radiant skin.',
    description:
      'A gentle yet powerful resurfacing treatment using plant-derived AHAs and enzymes to dissolve dead skin cells, refine texture, and illuminate the complexion.',
    sensoryDescription:
      'A warm tingle of papaya and lactic acid awakens the skin as a cooling aloe mask soothes and seals in luminosity.',
    benefits: [
      'Refined skin texture',
      'Reduced pigmentation',
      'Brightened complexion',
      'Minimised pores',
    ],
    whatToExpect:
      'After a thorough cleanse, a custom botanical peel blend is applied and left to work for 10–15 minutes. A neutralising mask follows, then a hydrating serum and SPF finish.',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80',
    featured: false,
    addOns: ['eye-ritual', 'led-therapy'],
  },
  {
    id: 'scalp-ceremony',
    name: 'Scalp & Crown Ceremony',
    category: 'hair',
    duration: 45,
    price: 120,
    tagline: 'Nourish from the root.',
    description:
      'A deeply nourishing scalp ritual combining warm oil infusion, acupressure, and gentle steam to stimulate circulation, reduce tension, and restore hair vitality.',
    sensoryDescription:
      'Warm rosemary and argan oil is worked into the scalp with firm, rhythmic pressure — a sensation of pure release from crown to neck.',
    benefits: [
      'Stimulated hair growth',
      'Reduced scalp tension',
      'Deep nourishment',
      'Stress relief',
    ],
    whatToExpect:
      'Warm botanical oil is applied to the scalp and worked in with acupressure techniques. A warm towel wrap allows the oils to penetrate deeply before a gentle cleanse and conditioning treatment.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
    featured: false,
    addOns: ['aromatherapy-upgrade'],
  },
  {
    id: 'eye-ritual',
    name: 'Revive Eye Ritual',
    category: 'facial',
    duration: 30,
    price: 85,
    tagline: 'Brighten. Lift. Awaken.',
    description:
      'A targeted treatment for the delicate eye area using cooling jade rollers, peptide-rich serums, and lymphatic drainage to reduce puffiness and dark circles.',
    sensoryDescription:
      'Cool jade glides beneath your eyes as a peptide-rich serum sinks in — a moment of pure awakening for tired, stressed eyes.',
    benefits: [
      'Reduced puffiness',
      'Brightened dark circles',
      'Lifted appearance',
      'Deep hydration',
    ],
    whatToExpect:
      'A gentle eye cleanse is followed by a cooling eye mask and jade roller massage. A targeted peptide serum is pressed in with fingertip tapping before a final cooling gel finish.',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80',
    featured: false,
    addOns: ['led-therapy'],
  },
  {
    id: 'aromatherapy-upgrade',
    name: 'Aromatherapy Enhancement',
    category: 'ritual',
    duration: 0,
    price: 35,
    tagline: 'Elevate any treatment.',
    description:
      'Add a bespoke aromatherapy blend to any treatment. Choose from our curated collection of pure essential oil blends, each crafted for a specific mood or intention.',
    sensoryDescription:
      'A custom blend of pure essential oils, chosen for your mood and intention, woven seamlessly into your treatment.',
    benefits: ['Enhanced relaxation', 'Mood elevation', 'Personalised experience'],
    whatToExpect:
      'Your therapist will guide you through our scent library to select a blend that resonates. The oils are then incorporated into your treatment through diffusion and topical application.',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80',
    featured: false,
    addOns: [],
  },
  {
    id: 'hot-stone-add',
    name: 'Hot Stone Add-On',
    category: 'massage',
    duration: 15,
    price: 45,
    tagline: 'Deepen any massage.',
    description:
      'Enhance any massage with the addition of heated basalt stones, placed along key energy points to deepen relaxation and amplify the therapeutic effect.',
    sensoryDescription:
      'The grounding weight of warm volcanic stone placed along your spine — a simple addition that transforms the entire experience.',
    benefits: ['Deeper muscle release', 'Enhanced energy flow', 'Amplified relaxation'],
    whatToExpect:
      'Heated stones are placed along your spine and energy meridians at the start of your massage, remaining throughout to maintain warmth and deepen the therapeutic effect.',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80',
    featured: false,
    addOns: [],
  },
  {
    id: 'led-therapy',
    name: 'LED Light Therapy',
    category: 'facial',
    duration: 20,
    price: 65,
    tagline: 'Science meets serenity.',
    description:
      'A non-invasive light therapy treatment using red and near-infrared wavelengths to stimulate collagen production, reduce inflammation, and accelerate skin healing.',
    sensoryDescription:
      'Warm, gentle light washes over your skin — a deeply meditative experience that works at a cellular level while you simply rest.',
    benefits: [
      'Stimulated collagen',
      'Reduced inflammation',
      'Accelerated healing',
      'Improved skin tone',
    ],
    whatToExpect:
      'You will lie comfortably beneath our professional LED panel for 20 minutes. The light is warm and soothing — many clients drift into a light sleep during this treatment.',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80',
    featured: false,
    addOns: [],
  },
];

export const categories = [
  { value: 'all', label: 'All Experiences' },
  { value: 'facial', label: 'Facials' },
  { value: 'body', label: 'Body' },
  { value: 'massage', label: 'Massage' },
  { value: 'ritual', label: 'Rituals' },
  { value: 'hair', label: 'Hair & Scalp' },
  { value: 'nail', label: 'Nail Care' },
] as const;

export function getServiceById(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}

export function getFeaturedServices(): Service[] {
  return services.filter((s) => s.featured);
}

export function getServicesByCategory(category: string): Service[] {
  if (category === 'all') return services;
  return services.filter((s) => s.category === category);
}
