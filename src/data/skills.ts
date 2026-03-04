export interface Skill {
  name: string
  level?: 'expert' | 'advanced' | 'intermediate'
}

export interface SkillCategory {
  label: string
  icon: string
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    label: 'Frontend',
    icon: 'Monitor',
    skills: [
      { name: 'React', level: 'expert' },
      { name: 'TypeScript', level: 'expert' },
      { name: 'Tailwind CSS', level: 'advanced' },
      { name: 'Next.js', level: 'advanced' },
    ],
  },
  {
    label: 'Mobile',
    icon: 'Smartphone',
    skills: [
      { name: 'React Native', level: 'expert' },
      { name: 'Flutter', level: 'advanced' },
      { name: 'Expo', level: 'advanced' },
    ],
  },
  {
    label: 'Backend',
    icon: 'Server',
    skills: [
      { name: 'Node.js', level: 'advanced' },
      { name: 'Firebase', level: 'advanced' },
      { name: 'REST APIs', level: 'expert' },
    ],
  },
  {
    label: 'Tooling & Ops',
    icon: 'Wrench',
    skills: [
      { name: 'Git', level: 'expert' },
      { name: 'Datadog', level: 'intermediate' },
      { name: 'CI/CD', level: 'advanced' },
      { name: 'Vite', level: 'advanced' },
    ],
  },
  {
    label: 'Liderança',
    icon: 'Users',
    skills: [
      { name: 'Tech Lead', level: 'expert' },
      { name: 'Code Review', level: 'expert' },
      { name: 'Mentoring', level: 'advanced' },
      { name: 'Agile', level: 'expert' },
    ],
  },
]
