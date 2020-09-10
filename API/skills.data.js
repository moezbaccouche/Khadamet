import {
  DIY_COLOR,
  PLUMBING_COLOR,
  CLEANING_COLOR,
  COOKING_COLOR,
  ELECTRICITY_COLOR,
  PRIMARY_COLOR,
  PAINTING_COLOR,
  BABYSITTING_COLOR,
} from '../assets/colors';

export const skills = [
  {
    id: '5f512ddab138f130a069a465',
    title: 'Jardinage',
    icon: require('../assets/gard.png'),
    isSelected: false,
    salary: 0,
    color: PRIMARY_COLOR,
    borderColor: '#2ECC71',
  },
  {
    id: '5f512de7b138f130a069a466',
    title: 'Electricité',
    icon: require('../assets/electricity.png'),
    isSelected: false,
    salary: 0,
    color: ELECTRICITY_COLOR,
  },
  {
    id: '5f56433580ec3e0252ae14df',
    title: 'Cuisine',
    icon: require('../assets/hamburger.png'),
    isSelected: false,
    salary: 0,
    color: COOKING_COLOR,
  },
  {
    id: '5f56434580ec3e0252ae14e0',
    title: 'Nettoyage',
    icon: require('../assets/bucket.png'),
    isSelected: false,
    salary: 0,
    color: CLEANING_COLOR,
  },
  {
    id: '5f56434c80ec3e0252ae14e1',
    title: 'Plomberie',
    icon: require('../assets/water.png'),
    isSelected: false,
    salary: 0,
    color: PLUMBING_COLOR,
  },
  {
    id: '5f56438280ec3e0252ae14e2',
    title: 'Bricolage',
    icon: require('../assets/drill2.png'),
    isSelected: false,
    salary: 0,
    color: DIY_COLOR,
  },
  {
    id: '5f56438d80ec3e0252ae14e3',
    title: 'Baby-Sitting',
    icon: require('../assets/baby.png'),
    isSelected: false,
    salary: 0,
    color: BABYSITTING_COLOR,
  },
  {
    id: '5f56439580ec3e0252ae14e4',
    title: 'Peinture',
    icon: require('../assets/paint.png'),
    isSelected: false,
    salary: 0,
    color: PAINTING_COLOR,
  },
];

export const getSkillById = (id) => {
  const skill = skills.find((item) => item.id === id);
  return skill;
};
