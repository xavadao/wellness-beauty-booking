export interface Practitioner {
  id: string;
  name: string;
  title: string;
  bio: string;
  shortBio: string;
  expertise: string[];
  certifications: string[];
  signatureTreatments: string[]; // service ids
  image: string;
  yearsExperience: number;
  philosophy: string;
}

export const practitioners: Practitioner[] = [
  {
    id: 'elena-vasquez',
    name: 'Elena Vasquez',
    title: 'Master Aesthetician & Skin Therapist',
    bio: 'With over 14 years of experience in advanced skin therapy, Elena has trained at the Institut de Beauté in Paris and the International Dermal Institute in London. Her approach blends European precision with a deeply intuitive understanding of each client\'s unique skin story. Elena believes that true skin health begins with listening — to the skin, and to the person within it.',
    shortBio: 'European-trained skin therapist with 14 years of transformative facial expertise.',
    expertise: ['Advanced Facials', 'Chemical Peels', 'Skin Analysis', 'Anti-Ageing Protocols'],
    certifications: [
      'Institut de Beauté Paris — Advanced Aesthetics',
      'International Dermal Institute — Skin Therapy',
      'CIDESCO International Diploma',
      'LED Phototherapy Certification',
    ],
    signatureTreatments: ['luminous-facial', 'botanical-peel', 'eye-ritual'],
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80',
    yearsExperience: 14,
    philosophy:
      'Skin is a living story. My role is to help it tell its most radiant chapter.',
  },
  {
    id: 'marcus-chen',
    name: 'Marcus Chen',
    title: 'Senior Massage Therapist & Bodywork Specialist',
    bio: 'Marcus brings a rare combination of Eastern and Western bodywork traditions to every session. Trained in traditional Chinese medicine, Swedish massage, and myofascial release, he approaches the body as an integrated system of energy, structure, and emotion. His sessions are known for their intuitive depth — clients often describe feeling as though he knows exactly where to go before they say a word.',
    shortBio: 'Integrative bodywork specialist blending Eastern and Western healing traditions.',
    expertise: [
      'Deep Tissue Massage',
      'Myofascial Release',
      'Hot Stone Therapy',
      'Lymphatic Drainage',
    ],
    certifications: [
      'Traditional Chinese Medicine — Bodywork Module',
      'ITEC Diploma in Massage Therapy',
      'Myofascial Release Certification — John F. Barnes Method',
      'Hot Stone Therapy Advanced Certification',
    ],
    signatureTreatments: ['signature-massage', 'hot-stone-massage'],
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80',
    yearsExperience: 11,
    philosophy:
      'The body holds everything we\'ve ever experienced. My work is to help it let go.',
  },
  {
    id: 'amara-osei',
    name: 'Amara Osei',
    title: 'Holistic Wellness Practitioner & Ritual Specialist',
    bio: 'Amara\'s practice is rooted in the healing traditions of West Africa, Ayurveda, and modern wellness science. She specialises in full-body rituals that honour the whole person — body, mind, and spirit. Her Sacred Earth Body Ritual has become one of Serenova\'s most sought-after experiences, drawing clients from across the world who seek genuine transformation rather than mere relaxation.',
    shortBio: 'Holistic ritual specialist weaving ancestral wisdom with modern wellness science.',
    expertise: [
      'Body Rituals',
      'Ayurvedic Treatments',
      'Aromatherapy',
      'Energy Balancing',
    ],
    certifications: [
      'Ayurvedic Wellness Practitioner — Kerala Ayurveda Academy',
      'VTCT Level 3 Body Massage',
      'Aromatherapy Certification — IFA',
      'Holistic Wellness Coaching — Institute of Integrative Nutrition',
    ],
    signatureTreatments: ['ritual-body-wrap', 'scalp-ceremony', 'aromatherapy-upgrade'],
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80',
    yearsExperience: 9,
    philosophy:
      'Healing is not something done to you — it is something awakened within you.',
  },
  {
    id: 'sofia-laurent',
    name: 'Sofia Laurent',
    title: 'Advanced Skin Therapist & LED Specialist',
    bio: 'Sofia trained at the prestigious Académie Scientifique de Beauté in Paris before completing advanced certifications in LED phototherapy and cosmeceutical skin care. Her approach is quietly scientific — she believes that the most luxurious thing you can give your skin is evidence-based care, delivered with warmth and precision. Her clients trust her implicitly, returning season after season for her signature results.',
    shortBio: 'Paris-trained skin scientist specialising in light therapy and advanced skin protocols.',
    expertise: [
      'LED Phototherapy',
      'Cosmeceutical Skin Care',
      'Skin Resurfacing',
      'Collagen Induction',
    ],
    certifications: [
      'Académie Scientifique de Beauté Paris',
      'Advanced LED Phototherapy — Dermalux Certified',
      'Cosmeceutical Skin Care Specialist',
      'CIDESCO International Diploma',
    ],
    signatureTreatments: ['botanical-peel', 'led-therapy', 'luminous-facial'],
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80',
    yearsExperience: 8,
    philosophy:
      'Beautiful skin is the result of great science, delivered with great care.',
  },
];

export function getPractitionerById(id: string): Practitioner | undefined {
  return practitioners.find((p) => p.id === id);
}

export function getPractitionersForService(serviceId: string): Practitioner[] {
  return practitioners.filter((p) => p.signatureTreatments.includes(serviceId));
}
