export interface Module {
  id: string
  label: string
  muscleGroups: string[]  // tom array = ingen filter (Fri)
}

export const MODULES: Module[] = [
  {
    id: 'fri',
    label: 'Fri',
    muscleGroups: [],
  },
  {
    id: 'rygg',
    label: 'Rygg',
    muscleGroups: ['Thoracolumbar', 'QL', 'Rygg', 'Obliques'],
  },
  {
    id: 'hofter',
    label: 'Hofter',
    muscleGroups: ['Gluteus', 'Hofterotatorer', 'Piriformis'],
  },
  {
    id: 'fremside',
    label: 'Fremside',
    muscleGroups: ['Quadriceps', 'Hoftebøyere', 'Psoas'],
  },
  {
    id: 'hamstrings',
    label: 'Hamstrings',
    muscleGroups: ['Hamstrings', 'Adductorer'],
  },
]
