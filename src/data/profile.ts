import type { LucideIconName } from '../components/atoms/Icon/Icon'

export interface QuickFact {
  icon: LucideIconName
  label: string
}

export const profile = {
  name: 'Igor Otávio Cetano Diniz',
  greeting: 'Olá, eu sou',
  titles: [
    'Senior Software Engineer',
    'Tech Lead',
    'React Specialist',
    'Flutter Developer',
    'Mobile Engineer',
  ],
  bio: [
    'Engenheiro de software com 7+ anos construindo produtos digitais de alto impacto. Especializado em aplicações mobile e web com React Native, Flutter e React.',
    'Atualmente em transição para o Canadá, buscando oportunidades onde possa combinar liderança técnica com desenvolvimento de produtos que fazem a diferença.',
  ],
  location: 'Canada 🍁',
  available: true,
  quickFacts: [
    { icon: 'MapPin' as LucideIconName,      label: 'Canada (relocating)' },
    { icon: 'Briefcase' as LucideIconName,   label: '7+ anos de experiência' },
    { icon: 'Users' as LucideIconName,       label: 'Tech Lead' },
    { icon: 'Smartphone' as LucideIconName,  label: 'React Native & Flutter' },
  ] satisfies QuickFact[],
}
