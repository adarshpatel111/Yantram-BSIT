import Album from "../../public/Album.png";
import HeatPump from "../../public/HeatPump-Heater.webp";
import SolarCooker from "../../public/solarCooker.webp";
import OZO3Img from "../../public/ozo3.jpg";
import fanImg from "../../public/FAN2.png";
import EVBike from "../../public/skooter.png";
import InverterAC from "../../public/AC.png";
import SOLARPANEL from "../../public/solarPanel5.jpg";
import SmartTV from "../../public/TV.png";
import solarWaterPump from "../../public/waterMotor.png";
import waterPurifier from "../../public/waterPurifier.png";
export const featuredProducts = [
  // 1. Solar Panel
  {
    id: "solar-panel",
    name: "High Efficiency Solar Panel",
    model: "SP72-450",
    image: SOLARPANEL,
    price: "₹9,499",
    originalPrice: "₹11,999",
    features: [
      "High Conversion Efficiency",
      "Durable Tempered Glass",
      "Weather Resistant Build",
      "Perfect for Rooftop & Ground Mount",
      "Monocrystalline Technology",
    ],
    specs: {
      type: "Monocrystalline",
      powerOutput: "450W",
      voltage: "72 Cell",
      usage: "Home, Commercial",
    },
    badge: "Green Energy",
    variations: true,
  },

  // 2. Water Heater
  {
    id: "water-heater",
    name: "Solar Water Heater",
    model: "SunHeat Pro",
    image: HeatPump,
    price: "₹14,999",
    originalPrice: "₹19,999",
    features: [
      "Eco-Friendly Solar Heating",
      "Low Maintenance, Long Life",
      "No Electricity Required",
      "Weather Resistant Tank",
      "Quick Heating Efficiency",
    ],
    specs: {
      type: "Solar Thermal",
      capacity: "100–300 Liters",
      installation: "Rooftop",
      savings: "Up to 60% Energy",
    },
    badge: "Hot Savings",
    variations: true,
  },

  // 3. Parabolic Solar Cooker
  {
    id: "parabolic-solar-cooker",
    name: "Parabolic Solar Cooker",
    model: "SolarChef 360",
    image: SolarCooker,
    price: "₹6,499",
    originalPrice: "₹8,499",
    features: [
      "Eco-Friendly Cooking without Gas",
      "High Temperature Reflective Design",
      "Cook Meals with Only Sunlight",
      "Portable & Durable Frame",
      "Ideal for Outdoor Use",
    ],
    specs: {
      type: "Parabolic",
      heat: "Up to 350°C",
      material: "Aluminum Reflectors",
      usage: "Boil, Fry, Bake",
    },
    badge: "Sun Cook",
    variations: true,
  },

  // 4. Water Pump
  {
    id: "solar-water-pump",
    name: "Solar BLDC Water Pump",
    model: "BLDC-Pump",
    image: solarWaterPump,
    price: "₹39,999",
    originalPrice: "₹49,999",
    features: [
      "Available from 0.25 HP to 10 HP",
      "Runs on Solar & AC Current",
      "Consumes 80% Less Energy than AC Pump",
      "30000+ Hours Lifespan",
      "Submersible & Open Well Options",
    ],
    specs: {
      type: "BLDC, Submersible/Open Well",
      input: "Solar + AC",
      powerRange: "0.25 HP – 10 HP",
      lifespan: "30000+ Hours",
    },
    badge: "Eco Power",
    variations: true,
  },

  // 5. 4k TV
  {
    id: "4k-smart-tv",
    name: "4K Ultra HD Smart TV",
    model: "BS50WOS",
    image: SmartTV,
    price: "₹45,999",
    originalPrice: "₹55,999",
    features: [
      "126CM (50 INCH) 4K A+ Grade DLED Display",
      "webOS with Magic Remote & ThinQ AI",
      "Alexa Built-in, Personalized Sound & Picture",
      "Netflix, Prime Video, Disney+ Hotstar",
      "HDR10 & HLG, MEMC 4K @60Hz",
    ],
    specs: {
      resolution: "4K (3840×2160)",
      display: "DLED, A+ Grade Panel",
      processor: "ARM CA55 Quad Core, Mali G31 GPU",
      os: "webOS",
      connectivity: "Bluetooth 5.0, Wi-Fi",
    },
    badge: "Best Seller",
    variations: true,
  },

  // 6. Air Conditioner
  {
    id: "air-conditioner",
    name: "Inverter Air Conditioner",
    model: "AC-Bharat",
    image: InverterAC,
    price: "₹32,999",
    originalPrice: "₹42,999",
    features: [
      "1 Ton / 1.5 Ton / 2 Ton Options",
      "Dual Tone: Grey / White",
      "Inverter & Non-Inverter Variants",
      "Wi-Fi, Bluetooth, Remote Integration",
      "Self-Cleaning & Air Filters",
    ],
    specs: {
      type: "Split AC",
      control: "Smart AI + Remote",
      build: "Robust Metal Body",
      origin: "Made in Bharat",
    },
    badge: "Smart Cooling",
    variations: true,
  },

  // 7. Water Purifier
  {
    id: "water-purifier",
    name: "Alkaline Water Purifier",
    model: "Ultima Ganga",
    image: waterPurifier,
    price: "₹18,999",
    originalPrice: "₹24,999",
    features: [
      "Alkaline Water for TDS > 350",
      "Improves B12 Absorption & Digestion",
      "Reduces Acidity & Increases Bone Density",
      "Natural Pure Water Output",
      "RO + UV + Alkaline Filtration",
    ],
    specs: {
      filtration: "RO + UV + Alkaline",
      tds: "Above 350",
      capacity: "10 Liters",
      warranty: "2 Years",
    },
    badge: "Health+",
    variations: true,
  },

  // 8. EV bike
  {
    id: "ev-bike",
    name: "EV Bike",
    model: "Bold EV",
    image: EVBike,
    price: "₹79,999",
    originalPrice: "₹89,999",
    features: [
      "Electric Vehicle for Bold Riders",
      "Eco-Friendly, Low Maintenance",
      "Quiet Operation",
      "No Fuel Required",
      "Tagline: 'Bild for Bold'",
    ],
    specs: {
      type: "Electric Bike",
      fuel: "Battery",
      emission: "Zero",
      use: "Urban/Commuter",
    },
    badge: "Future Ride",
    variations: true,
  },

  // 9. BLDC Fan
  {
    id: "bldc-fan",
    name: "BLDC Ceiling Fan",
    model: "BL-24 Smart",
    image: fanImg,
    price: "₹4,999",
    originalPrice: "₹6,999",
    features: [
      "30 Watt Energy Consumption",
      "Auto Cleaning Blades",
      "Remote Controlled",
      "Hybrid 12V DC / 220V AC",
      "Smart 385 RPM Performance",
    ],
    specs: {
      power: "30 Watts",
      speed: "385 RPM",
      colors: "White, Brown",
      control: "Remote + Manual",
    },
    badge: "Energy Saver",
    variations: true,
  },

  // 10. Air Cooler
  {
    id: "air-cooler",
    name: "Air Cooler",
    model: "CoolBreeze 60",
    image: Album,
    price: "₹7,999",
    originalPrice: "₹10,999",
    features: [
      "High Air Delivery with Honeycomb Pads",
      "Energy Efficient Motor",
      "Water Level Indicator",
      "Remote Controlled Operation",
      "Suitable for Dry & Humid Conditions",
    ],
    specs: {
      capacity: "60 Liters",
      control: "Remote + Manual",
      coolingArea: "Up to 250 sq.ft.",
      power: "Low Wattage Motor",
    },
    badge: "Cool Comfort",
    variations: true,
  },

  // 11. Ionizer
  {
    id: "ozone-ionizer",
    name: "Ozone Ionizer",
    model: "OZO3 Green",
    image: OZO3Img,
    price: "₹5,499",
    originalPrice: "₹6,999",
    features: [
      "Removes 80–95% Pesticides",
      "Kills Viruses, Germs, Pathogens",
      "Deodorizes Air & Preserves Food",
      "Sterilizes Kitchen Utensils & Bottles",
      "User-Friendly Timer System",
    ],
    specs: {
      tech: "Ozone Green (OZO3)",
      usage: "Food, Air, Utensils",
      control: "Plug-and-Play with Timer",
    },
    badge: "FreshTech",
    variations: true,
  },
];
