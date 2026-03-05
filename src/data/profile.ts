import type { LucideIconName } from '../components/atoms/Icon/Icon'

export interface QuickFact {
  icon: LucideIconName
  label: string
}

export const profile = {
  name: 'Igor Otávio Caetano Diniz',
  greeting: "Hi, I'm",
  titles: [
    'Senior Frontend Engineer',
    'Tech Lead',
    'React Specialist',
    'React Native Developer',
    'Mobile Engineer',
  ],
  bio: [
    'Software engineer with 7+ years delivering production-grade applications in React, React Native, and Flutter — across banking, healthcare, and B2B sectors.',
    'Based in Brazil, actively seeking opportunities as Senior Software Engineer or Tech Lead to combine technical leadership with products that make a real difference.',
  ],
  location: 'Brazil 🇧🇷',
  available: true,
  quickFacts: [
    { icon: 'MapPin' as LucideIconName,      label: 'Belo Horizonte, Brazil' },
    { icon: 'Briefcase' as LucideIconName,   label: '7+ years of experience' },
    { icon: 'Users' as LucideIconName,       label: 'Tech Lead' },
    { icon: 'Smartphone' as LucideIconName,  label: 'React Native & Flutter' },
  ] satisfies QuickFact[],
}
