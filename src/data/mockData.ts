export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  image: string;
  dealership: string;
  dealershipId: string;
  features: string[];
  fuelType: string;
  transmission: string;
  exteriorColor: string;
  interiorColor: string;
  vin: string;
}

export interface Dealer {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  image: string;
  description: string;
  services: string[];
  hours: {
    [key: string]: string;
  };
  specialties: string[];
}

export interface Business {
  id: string;
  name: string;
  category: string;
  address: string;
  phone: string;
  website?: string;
  description: string;
  services: string[];
}

export interface WeeklySpecial {
  id: string;
  title: string;
  dealership: string;
  videoUrl: string;
  thumbnail: string;
  date: string;
  description: string;
}

export const mockCars: Car[] = [
  {
    id: '1',
    make: 'Honda',
    model: 'Civic',
    year: 2020,
    price: 18995,
    mileage: 32000,
    image: 'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg',
    dealership: 'Vegas Premier Auto',
    dealershipId: '1',
    features: ['Backup Camera', 'Bluetooth', 'Apple CarPlay', 'Lane Keeping Assist'],
    fuelType: 'Gasoline',
    transmission: 'CVT Automatic',
    exteriorColor: 'Pearl White',
    interiorColor: 'Black Cloth',
    vin: '2HGFC2F59LH123456'
  },
  {
    id: '2',
    make: 'Toyota',
    model: 'Camry',
    year: 2019,
    price: 22495,
    mileage: 28500,
    image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
    dealership: 'Thunderbird Motors',
    dealershipId: '2',
    features: ['Navigation', 'Heated Seats', 'Sunroof', 'Toyota Safety Sense'],
    fuelType: 'Gasoline',
    transmission: '8-Speed Automatic',
    exteriorColor: 'Midnight Black',
    interiorColor: 'Beige Leather',
    vin: '4T1B11HK6KU123456'
  },
  {
    id: '3',
    make: 'Nissan',
    model: 'Altima',
    year: 2021,
    price: 19895,
    mileage: 15000,
    image: 'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg',
    dealership: 'Desert Auto Sales',
    dealershipId: '3',
    features: ['ProPILOT Assist', 'Remote Start', 'Intelligent All-Wheel Drive'],
    fuelType: 'Gasoline',
    transmission: 'CVT',
    exteriorColor: 'Storm Blue',
    interiorColor: 'Charcoal Cloth',
    vin: '1N4BL4BV8MN123456'
  },
  {
    id: '4',
    make: 'Ford',
    model: 'F-150',
    year: 2020,
    price: 34995,
    mileage: 42000,
    image: 'https://images.pexels.com/photos/1166979/pexels-photo-1166979.jpeg',
    dealership: 'Vegas Premier Auto',
    dealershipId: '1',
    features: ['4WD', 'Tow Package', 'Ford Co-Pilot360', 'Power Tailgate'],
    fuelType: 'Gasoline',
    transmission: '10-Speed Automatic',
    exteriorColor: 'Oxford White',
    interiorColor: 'Medium Earth Gray',
    vin: '1FTEW1EP5LFC12345'
  },
  {
    id: '5',
    make: 'Chevrolet',
    model: 'Malibu',
    year: 2019,
    price: 16995,
    mileage: 38000,
    image: 'https://images.pexels.com/photos/248747/pexels-photo-248747.jpeg',
    dealership: 'Silver State Auto',
    dealershipId: '4',
    features: ['Teen Driver', 'Wireless Charging', 'Bose Audio', 'OnStar'],
    fuelType: 'Gasoline',
    transmission: '9-Speed Automatic',
    exteriorColor: 'Summit White',
    interiorColor: 'Jet Black Cloth',
    vin: '1G1ZD5ST6KF123456'
  },
  
  {
    id: '6',
    make: 'Subaru',
    model: 'Outback',
    year: 2021,
    price: 28995,
    mileage: 22000,
    image: 'https://images.pexels.com/photos/1974596/pexels-photo-1974596.jpeg',
    dealership: 'Mountain View Motors',
    dealershipId: '5',
    features: ['EyeSight Driver Assist', 'All-Wheel Drive', 'X-Mode', 'Harman Kardon Audio'],
    fuelType: 'Gasoline',
    transmission: 'CVT',
    exteriorColor: 'Magnetite Gray Metallic',
    interiorColor: 'Black Leather',
    vin: '4S4BTANC9M3123456'
  }
];

export const mockDealers: Dealer[] = [
  {
    id: '1',
    name: 'Vegas Premier Auto',
    address: '4250 Nellis Blvd, Las Vegas, NV 89115',
    phone: '(702) 555-0101',
    email: 'sales@vegaspremierauto.com',
    website: 'www.vegaspremierauto.com',
    image: 'https://images.pexels.com/photos/1077785/pexels-photo-1077785.jpeg',
    description: 'Family-owned dealership serving Las Vegas for over 20 years. Specializing in quality pre-owned vehicles with excellent customer service.',
    services: ['Sales', 'Financing', 'Service', 'Parts', 'Trade-ins'],
    hours: {
      'Monday': '8:00 AM - 8:00 PM',
      'Tuesday': '8:00 AM - 8:00 PM',
      'Wednesday': '8:00 AM - 8:00 PM',
      'Thursday': '8:00 AM - 8:00 PM',
      'Friday': '8:00 AM - 8:00 PM',
      'Saturday': '8:00 AM - 6:00 PM',
      'Sunday': '10:00 AM - 5:00 PM'
    },
    specialties: ['Honda', 'Toyota', 'Ford', 'Chevrolet']
  },
  {
    id: '2',
    name: 'Thunderbird Motors',
    address: '3875 Nellis Blvd, Las Vegas, NV 89115',
    phone: '(702) 555-0202',
    email: 'info@thunderbirdmotors.com',
    website: 'www.thunderbirdmotors.com',
    image: 'https://images.pexels.com/photos/193999/pexels-photo-193999.jpeg',
    description: 'Proudly serving the Las Vegas community with honor and integrity. We specialize in reliable vehicles for military families.',
    services: ['Sales', 'Financing', 'Military Discounts', 'Extended Warranties'],
    hours: {
      'Monday': '9:00 AM - 7:00 PM',
      'Tuesday': '9:00 AM - 7:00 PM',
      'Wednesday': '9:00 AM - 7:00 PM',
      'Thursday': '9:00 AM - 7:00 PM',
      'Friday': '9:00 AM - 7:00 PM',
      'Saturday': '9:00 AM - 6:00 PM',
      'Sunday': 'Closed'
    },
    specialties: ['Toyota', 'Nissan', 'Hyundai', 'Military Sales']
  },
  {
    id: '3',
    name: 'Desert Auto Sales',
    address: '5120 Nellis Blvd, Las Vegas, NV 89119',
    phone: '(702) 555-0303',
    email: 'sales@desertautolv.com',
    website: 'www.desertautolv.com',
    image: 'https://images.pexels.com/photos/1077785/pexels-photo-1077785.jpeg',
    description: 'Your neighborhood auto dealer with competitive prices and flexible financing options for all credit situations.',
    services: ['Sales', 'Buy Here Pay Here', 'Credit Rebuilding', 'Trade-ins'],
    hours: {
      'Monday': '8:30 AM - 8:00 PM',
      'Tuesday': '8:30 AM - 8:00 PM',
      'Wednesday': '8:30 AM - 8:00 PM',
      'Thursday': '8:30 AM - 8:00 PM',
      'Friday': '8:30 AM - 8:00 PM',
      'Saturday': '8:30 AM - 7:00 PM',
      'Sunday': '11:00 AM - 5:00 PM'
    },
    specialties: ['Affordable Cars', 'Bad Credit OK', 'First Time Buyers']
  },
  {
    id: '4',
    name: 'Silver State Auto',
    address: '6890 Nellis Blvd, Las Vegas, NV 89156',
    phone: '(702) 555-0404',
    email: 'contact@silverstateauto.com',
    website: 'www.silverstateauto.com',
    image: 'https://images.pexels.com/photos/193999/pexels-photo-193999.jpeg',
    description: 'Premium pre-owned vehicles with comprehensive inspections and warranties. Quality you can trust.',
    services: ['Sales', 'Certified Pre-Owned', 'Extended Warranties', 'Vehicle History Reports'],
    hours: {
      'Monday': '9:00 AM - 7:00 PM',
      'Tuesday': '9:00 AM - 7:00 PM',
      'Wednesday': '9:00 AM - 7:00 PM',
      'Thursday': '9:00 AM - 7:00 PM',
      'Friday': '9:00 AM - 7:00 PM',
      'Saturday': '9:00 AM - 6:00 PM',
      'Sunday': '12:00 PM - 5:00 PM'
    },
    specialties: ['Luxury Vehicles', 'Certified Pre-Owned', 'Low Mileage Cars']
  },
  {
    id: '5',
    name: 'Mountain View Motors',
    address: '2650 Nellis Blvd, Las Vegas, NV 89104',
    phone: '(702) 555-0505',
    email: 'service@mountainviewmotors.com',
    website: 'www.mountainviewmotors.com',
    image: 'https://images.pexels.com/photos/1077785/pexels-photo-1077785.jpeg',
    description: 'Specializing in SUVs and trucks for the adventurous Las Vegas lifestyle. Full service and parts department.',
    services: ['Sales', 'Service', 'Parts', 'Off-Road Accessories', '4WD Specialists'],
    hours: {
      'Monday': '8:00 AM - 7:00 PM',
      'Tuesday': '8:00 AM - 7:00 PM',
      'Wednesday': '8:00 AM - 7:00 PM',
      'Thursday': '8:00 AM - 7:00 PM',
      'Friday': '8:00 AM - 7:00 PM',
      'Saturday': '8:00 AM - 6:00 PM',
      'Sunday': '10:00 AM - 4:00 PM'
    },
    specialties: ['SUVs', 'Trucks', '4WD Vehicles', 'Subaru Specialist']
  }
];

export const mockBusinesses: Business[] = [
  {
    id: '1',
    name: 'Nellis Quick Lube',
    category: 'Oil Change',
    address: '4455 Nellis Blvd, Las Vegas, NV 89115',
    phone: '(702) 555-LUBE',
    description: 'Fast and reliable oil changes with quality Valvoline products.',
    services: ['Oil Change', 'Filter Replacement', 'Fluid Top-offs', 'Multi-point Inspection']
  },
  {
    id: '2',
    name: 'Thunderwash Car Wash',
    category: 'Car Wash',
    address: '3200 Nellis Blvd, Las Vegas, NV 89115',
    phone: '(702) 555-WASH',
    website: 'www.thunderwash.com',
    description: 'Premium car wash services with eco-friendly products and detail packages.',
    services: ['Exterior Wash', 'Interior Detail', 'Wax Services', 'Tire Shine']
  },
  {
    id: '3',
    name: 'Desert Tire & Auto',
    category: 'Tire Shop',
    address: '5567 Nellis Blvd, Las Vegas, NV 89119',
    phone: '(702) 555-TIRE',
    description: 'Complete tire services and automotive repairs for all makes and models.',
    services: ['Tire Installation', 'Wheel Alignment', 'Brake Service', 'Oil Changes']
  },
  {
    id: '4',
    name: 'AutoZone Nellis',
    category: 'Parts Store',
    address: '4890 Nellis Blvd, Las Vegas, NV 89115',
    phone: '(702) 555-ZONE',
    website: 'www.autozone.com',
    description: 'Your neighborhood auto parts store with everything you need for DIY repairs.',
    services: ['Auto Parts', 'Battery Testing', 'Tool Rental', 'Free Installation']
  },
  {
    id: '5',
    name: 'Precision Auto Repair',
    category: 'Auto Repair',
    address: '6234 Nellis Blvd, Las Vegas, NV 89156',
    phone: '(702) 555-FIX1',
    description: 'ASE certified technicians providing honest and reliable automotive repairs.',
    services: ['Engine Repair', 'Transmission Service', 'A/C Repair', 'Electrical Diagnostics']
  }
];

export const weeklySpecials: WeeklySpecial[] = [
  {
    id: '1',
    title: 'This Week\'s Hot Deals at Vegas Premier Auto',
    dealership: 'Vegas Premier Auto',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg',
    date: '2024-01-15',
    description: 'Check out our incredible deals on Honda Civics and Ford F-150s this week!'
  },
  {
    id: '2',
    title: 'Military Appreciation Special - Thunderbird Motors',
    dealership: 'Thunderbird Motors',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
    date: '2024-01-14',
    description: 'Special financing rates for military members on select Toyota and Nissan vehicles.'
  },
  {
    id: '3',
    title: 'Credit Rebuilding Program at Desert Auto',
    dealership: 'Desert Auto Sales',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg',
    date: '2024-01-13',
    description: 'Get approved today with our guaranteed financing program - no credit, bad credit, no problem!'
  }
];