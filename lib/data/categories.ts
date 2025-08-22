import { LucideIcon, Shirt, Baby, Watch, Footprints, Glasses, Gift } from 'lucide-react';

interface NestedMenuItem {
  name: string;
  href: string;
}

interface SubMenuItem {
  name: string;
  href: string;
  items?: NestedMenuItem[];
}

interface MenuItem {
  name: string;
  href: string;
  icon?: LucideIcon;
  subItems?: SubMenuItem[];
}

interface CategoryData {
  [key: string]: MenuItem[];
}

export const categoryData: CategoryData = {
  "Men's Fashion": [
    {
      name: 'Shirt',
      href: '/category/mens/shirts',
      icon: Shirt,
      subItems: [
        {
          name: 'Half Sleeve',
          href: '/category/mens/shirts/half-sleeve',
        },
        {
          name: 'Full Sleeve',
          href: '/category/mens/shirts/full-sleeve',
          items: [
            { name: 'Casual Shirt', href: '/category/mens/shirts/casual' },
            { name: 'Formal Shirt', href: '/category/mens/shirts/formal' },
            { name: 'Hawaii Shirt', href: '/category/mens/shirts/hawaii' },
            { name: 'Bamboo Silk', href: '/category/mens/shirts/bamboo-silk' },
            { name: 'Digital Print', href: '/category/mens/shirts/digital-print' },
          ]
        },
      ]
    },
    {
      name: 'T-Shirt',
      href: '/category/mens/t-shirts',
      icon: Shirt,
      subItems: [
        {
          name: 'Half Sleeve',
          href: '/category/mens/t-shirts/half-sleeve',
        },
        {
          name: 'Full Sleeve',
          href: '/category/mens/t-shirts/full-sleeve',
          items: [
            { name: 'Marsalaize', href: '/category/mens/t-shirts/marsalaize' },
            { name: 'Double Marsalaize', href: '/category/mens/t-shirts/double-marsalaize' },
            { name: 'China Marsalaize', href: '/category/mens/t-shirts/china-marsalaize' },
            { name: 'Lecrafine', href: '/category/mens/t-shirts/lecrafine' },
          ]
        },
      ]
    },
    {
      name: 'Polo',
      href: '/category/mens/polo',
      icon: Shirt,
      subItems: [
        {
          name: 'Half Sleeve',
          href: '/category/mens/polo/half-sleeve',
        },
        {
          name: 'Full Sleeve',
          href: '/category/mens/polo/full-sleeve',
          items: [
            { name: 'Marsalaize', href: '/category/mens/polo/marsalaize' },
            { name: 'Double Marsalaize', href: '/category/mens/polo/double-marsalaize' },
            { name: 'China Marsalaize', href: '/category/mens/polo/china-marsalaize' },
            { name: 'Lecrafine', href: '/category/mens/polo/lecrafine' },
          ]
        },
      ]
    },
    {
      name: 'Panjabi',
      href: '/category/mens/panjabi',
      icon: Shirt,
      subItems: [
        { name: 'Bamboo Silk', href: '/category/mens/panjabi/bamboo-silk' },
        { name: 'Digital Print', href: '/category/mens/panjabi/digital-print' },
        { name: 'Ambroydari', href: '/category/mens/panjabi/ambroydari' },
        { name: 'Karchupi', href: '/category/mens/panjabi/karchupi' },
        { name: 'Sequience', href: '/category/mens/panjabi/sequience' },
        { name: 'Basic', href: '/category/mens/panjabi/basic' },
      ]
    },
    { name: 'Koti', href: '/category/mens/koti', icon: Shirt },
    { name: 'Payjama', href: '/category/mens/payjama', icon: Shirt },
    { name: 'Bonded Jacket', href: '/category/mens/jackets/bonded', icon: Shirt },
    { name: 'Valbet Jacket', href: '/category/mens/jackets/valbet', icon: Shirt },
    { name: 'Perasuit Jacket', href: '/category/mens/jackets/perasuit', icon: Shirt },
    { name: 'Micro Jacket', href: '/category/mens/jackets/micro', icon: Shirt },
    { name: 'Hoodie Jacket', href: '/category/mens/jackets/hoodie', icon: Shirt },
  ],
  "Kid's Fashion": [
    {
      name: 'Baby T-Shirt',
      href: '/category/kids/baby-t-shirts',
      icon: Baby,
      subItems: [
        {
          name: 'Half Sleeve',
          href: '/category/kids/baby-t-shirts/half-sleeve',
        },
        {
          name: 'Full Sleeve',
          href: '/category/kids/baby-t-shirts/full-sleeve',
          items: [
            { name: 'Marsalaize', href: '/category/kids/baby-t-shirts/marsalaize' },
            { name: 'Double Marsalaize', href: '/category/kids/baby-t-shirts/double-marsalaize' },
            { name: 'China Marsalaize', href: '/category/kids/baby-t-shirts/china-marsalaize' },
            { name: 'Lecrafine', href: '/category/kids/baby-t-shirts/lecrafine' },
          ]
        },
      ]
    },
    { name: 'Baby Hoodie Jacket', href: '/category/kids/baby-hoodie-jacket', icon: Baby },
    { name: 'Baby Hoodie', href: '/category/kids/baby-hoodie', icon: Baby },
  ],
};