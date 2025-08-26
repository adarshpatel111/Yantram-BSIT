import Album from "../../public/Album.png";
import HeatPumpHeater from "../../public/HeatPump-Heater.webp";
import HeatPump from "../../public/HeatPump.webp";
import SolarCooker from "../../public/solarCooker.webp";
import OZO3Img from "../../public/ozo3.jpg";
import fanImg from "../../public/FAN2.png";
import EVBike from "../../public/skooter.png";
import InverterAC from "../../public/AC.png";
import SOLARPANEL from "../../public/solarPanel5.jpg";
import SmartTV from "../../public/TV.png";
import solarWaterPump from "../../public/waterMotor.png";
import waterPurifier1 from "../../public/waterPurifier.png";
import waterPurifier from "../../public/Rama-Water-Purifier.jpg";
export const featuredProducts = [
  // 1. Solar Panel
  {
    id: "solar-panel",
    name: "High Efficiency Solar Panel",
    model: "SP72-450",
    image: SOLARPANEL,
    features: [
      "High Conversion Efficiency",
      "Durable Tempered Glass",
      "Weather Resistant Build",
      "Perfect for Rooftop & Ground Mount",
      "Monocrystalline Technology",
    ],
    status: 1,
    specs: {
      type: "Monocrystalline",
      powerOutput: "450W",
      voltage: "72 Cell",
      usage: "Home, Commercial",
    },
    badge: "Green Energy",
    variations: true,
    variants: [
      { placetype: "Residential", type: "Mono PERC", price: 28499 },
      {
        placetype: "Common Residential",
        type: "Mono PERC",
        price: 89999,
      },
      { placetype: "Commercial", type: "Mono PERC", price: 46999 },
      {
        placetype: "Captive/Ground Mounted",
        type: "Mono PERC",
        price: 89999,
      },
      { placetype: "Third party sell", type: "Mono PERC", price: 46999 },
      { placetype: "Industrial", type: "Mono PERC", price: 89999 },
    ],
  },

  // 2. Water Heater
  {
    id: "water-heater",
    name: "Solar Water Heater",
    model: "SunHeat Pro",
    image: HeatPumpHeater,
    features: [
      "Eco-Friendly Solar Heating",
      "Low Maintenance, Long Life",
      "No Electricity Required",
      "Weather Resistant Tank",
      "Quick Heating Efficiency",
    ],
    status: 1,
    specs: {
      type: "Solar Thermal",
      capacity: "100–300 Liters",
      installation: "Rooftop",
      savings: "Up to 60% Energy",
    },
    badge: "Hot Savings",
    variations: true,
    variants: [
      { placetype: "Residential", capacity: "200L", price: 18999 },
      { placetype: "Residential", capacity: "300L", price: 22499 },
      { placetype: "Commercial", capacity: "500L", price: 14999 },
    ],
  },

  // 3. Parabolic Solar Cooker
  {
    id: "parabolic-solar-cooker",
    name: "Parabolic Solar Cooker",
    model: "SolarChef 360",
    image: SolarCooker,
    features: [
      "Eco-Friendly Cooking without Gas",
      "High Temperature Reflective Design",
      "Cook Meals with Only Sunlight",
      "Portable & Durable Frame",
      "Ideal for Outdoor Use",
    ],
    status: 0,
    specs: {
      type: "Parabolic",
      heat: "Up to 350°C",
      material: "Aluminum Reflectors",
      usage: "Boil, Fry, Bake",
    },
    badge: "Sun Cook",
    variations: true,
    variants: [
      { size: "Medium", price: 6499 },
      { size: "Large", price: 7999 },
    ],
  },

  // 4. Water Pump
  {
    id: "solar-water-pump",
    name: "Solar Water Pump",
    model: "BLDC-Pump",
    image: solarWaterPump,
    features: [
      "Available from 0.25 HP to 10 HP",
      "Runs on Solar & AC Current",
      "Consumes 80% Less Energy than AC Pump",
      "30000+ Hours Lifespan",
      "Submersible & Open Well Options",
    ],
    status: 1,
    specs: {
      type: "BLDC, Submersible/Open Well",
      input: "Solar + AC",
      powerRange: "0.25 HP – 10 HP",
      lifespan: "30000+ Hours",
    },
    badge: "Eco Power",
    variations: true,
    variants: [
      { type: "BLDC", hp: "0.25 HP", price: 39999 },
      { type: "Solar", hp: "1 HP", price: 49999 },
    ],
  },

  // 5. 4K Smart TV
  {
    id: "4k-smart-tv",
    name: "4K Ultra HD Smart TV",
    model: "BS50WOS",
    image: SmartTV,
    features: [
      "126CM (50 INCH) 4K A+ Grade DLED Display",
      "webOS with Magic Remote & ThinQ AI",
      "Alexa Built-in, Personalized Sound & Picture",
      "Netflix, Prime Video, Disney+ Hotstar",
      "HDR10 & HLG, MEMC 4K @60Hz",
    ],
    status: 1,
    specs: {
      resolution: "4K (3840×2160)",
      display: "DLED, A+ Grade Panel",
      processor: "ARM CA55 Quad Core, Mali G31 GPU",
      os: "webOS",
      connectivity: "Bluetooth 5.0, Wi-Fi",
    },
    badge: "Best Seller",
    variations: true,
    variants: [
      { size: "50-inch", price: 28000 },
      { size: "55-inch", price: 32000 },
    ],
  },

  // 6. Air Conditioner
  {
    id: "air-conditioner",
    name: "Inverter Air Conditioner",
    model: "AC-Bharat",
    image: InverterAC,
    features: [
      "1 Ton / 1.5 Ton / 2 Ton Options",
      "Dual Tone: Grey / White",
      "Inverter & Non-Inverter Variants",
      "Wi-Fi, Bluetooth, Remote Integration",
      "Self-Cleaning & Air Filters",
    ],
    status: 0,
    specs: {
      type: "Split AC",
      control: "Smart AI + Remote",
      build: "Robust Metal Body",
      origin: "Made in Bharat",
    },
    badge: "Smart Cooling",
    variations: true,
    variants: [
      { tonnage: "1 Ton", price: 32999 },
      { tonnage: "1.5 Ton", price: 38499 },
      { tonnage: "2 Ton", price: 42999 },
    ],
  },

  // 7. Water Purifier
  {
    id: "water-purifier",
    name: "Alkaline Water Purifier",
    model: "Carbon 8 Filter",
    image: waterPurifier,
    features: [
      "Water is life, but polluted water can be deadly",
      "Removes 99.9% of bacteria while preserving essential minerals",
      "Powered by RAMA Carbon Candles",
      "8 litres per hour per pair filtration rate",
      "10-year housing warranty",
      "304-grade stainless steel build",
    ],
    status: 1,
    specs: {
      capacity: "12 L | 6L Storage (1 person)",
      dimensions: {
        "12L": "19cm x 19cm x 47cm",
        "17L": "22cm x 22cm x 50cm",
        "24L": "24cm x 24cm x 59cm",
        "32L": "27cm x 27cm x 67cm",
      },
      material: "304 Grade Stainless Steel",
      purificationMethod: "2 layers - Virgin Coconut Shell Activated Carbon",
      filtrationCapacity: "20000 Liters per pair of candles",
      powerSource: "Non-electric",
      typeOfCandles: "Virgin Coconut Shell Activated Carbon",
      warranty: "10-year warranty against defects in materials and workmanship",
      tapType: ["Plastic Tap", "Stainless Steel Tap", "Vision Tap"],
    },
    badge: "Health+",
    variations: true,
    variants: [
      // 12L | 6L Storage
      {
        capacity: "12L | 6L Storage",
        candles: 1,
        flowRate: "4 L/hr",
        type: "Plastic Tap",
        price: 4249,
      },
      {
        capacity: "12L | 6L Storage",
        candles: 1,
        flowRate: "4 L/hr",
        type: "Stainless Steel Tap",
        price: 4499,
      },
      {
        capacity: "12L | 6L Storage",
        candles: 1,
        flowRate: "4 L/hr",
        type: "Vision Tap",
        price: 4749,
      },

      {
        capacity: "12L | 6L Storage",
        candles: 2,
        flowRate: "8 L/hr",
        type: "Plastic Tap",
        price: 5015,
      },
      {
        capacity: "12L | 6L Storage",
        candles: 2,
        flowRate: "8 L/hr",
        type: "Stainless Steel Tap",
        price: 5265,
      },
      {
        capacity: "12L | 6L Storage",
        candles: 2,
        flowRate: "8 L/hr",
        type: "Vision Tap",
        price: 5499,
      },

      {
        capacity: "12L | 6L Storage",
        candles: 4,
        flowRate: "16 L/hr",
        type: "Plastic Tap",
        price: 5015,
      },
      {
        capacity: "12L | 6L Storage",
        candles: 4,
        flowRate: "16 L/hr",
        type: "Stainless Steel Tap",
        price: 5265,
      },
      {
        capacity: "12L | 6L Storage",
        candles: 4,
        flowRate: "16 L/hr",
        type: "Vision Tap",
        price: 5499,
      },

      {
        capacity: "12L | 6L Storage",
        candles: 6,
        flowRate: "24 L/hr",
        type: "Plastic Tap",
        price: 5015,
      },
      {
        capacity: "12L | 6L Storage",
        candles: 6,
        flowRate: "24 L/hr",
        type: "Stainless Steel Tap",
        price: 5265,
      },
      {
        capacity: "12L | 6L Storage",
        candles: 6,
        flowRate: "24 L/hr",
        type: "Vision Tap",
        price: 5499,
      },

      // 17L | 8L Storage
      {
        capacity: "17L | 8L Storage",
        candles: 1,
        flowRate: "4 L/hr",
        type: "Plastic Tap",
        price: 4499,
      },
      {
        capacity: "17L | 8L Storage",
        candles: 1,
        flowRate: "4 L/hr",
        type: "Stainless Steel Tap",
        price: 4749,
      },
      {
        capacity: "17L | 8L Storage",
        candles: 1,
        flowRate: "4 L/hr",
        type: "Vision Tap",
        price: 4999,
      },

      {
        capacity: "17L | 8L Storage",
        candles: 2,
        flowRate: "8 L/hr",
        type: "Plastic Tap",
        price: 5249,
      },
      {
        capacity: "17L | 8L Storage",
        candles: 2,
        flowRate: "8 L/hr",
        type: "Stainless Steel Tap",
        price: 5499,
      },
      {
        capacity: "17L | 8L Storage",
        candles: 2,
        flowRate: "8 L/hr",
        type: "Vision Tap",
        price: 5799,
      },

      {
        capacity: "17L | 8L Storage",
        candles: 4,
        flowRate: "16 L/hr",
        type: "Plastic Tap",
        price: 5999,
      },
      {
        capacity: "17L | 8L Storage",
        candles: 4,
        flowRate: "16 L/hr",
        type: "Stainless Steel Tap",
        price: 6249,
      },
      {
        capacity: "17L | 8L Storage",
        candles: 4,
        flowRate: "16 L/hr",
        type: "Vision Tap",
        price: 6499,
      },

      {
        capacity: "17L | 8L Storage",
        candles: 6,
        flowRate: "24 L/hr",
        type: "Plastic Tap",
        price: 6499,
      },
      {
        capacity: "17L | 8L Storage",
        candles: 6,
        flowRate: "24 L/hr",
        type: "Stainless Steel Tap",
        price: 6749,
      },
      {
        capacity: "17L | 8L Storage",
        candles: 6,
        flowRate: "24 L/hr",
        type: "Vision Tap",
        price: 6999,
      },

      // 24L | 12L Storage
      {
        capacity: "24L | 12L Storage",
        candles: 1,
        flowRate: "4 L/hr",
        type: "Plastic Tap",
        price: 5499,
      },
      {
        capacity: "24L | 12L Storage",
        candles: 1,
        flowRate: "4 L/hr",
        type: "Stainless Steel Tap",
        price: 5749,
      },
      {
        capacity: "24L | 12L Storage",
        candles: 1,
        flowRate: "4 L/hr",
        type: "Vision Tap",
        price: 5999,
      },

      {
        capacity: "24L | 12L Storage",
        candles: 2,
        flowRate: "8 L/hr",
        type: "Plastic Tap",
        price: 6249,
      },
      {
        capacity: "24L | 12L Storage",
        candles: 2,
        flowRate: "8 L/hr",
        type: "Stainless Steel Tap",
        price: 6499,
      },
      {
        capacity: "24L | 12L Storage",
        candles: 2,
        flowRate: "8 L/hr",
        type: "Vision Tap",
        price: 6799,
      },

      {
        capacity: "24L | 12L Storage",
        candles: 4,
        flowRate: "16 L/hr",
        type: "Plastic Tap",
        price: 6999,
      },
      {
        capacity: "24L | 12L Storage",
        candles: 4,
        flowRate: "16 L/hr",
        type: "Stainless Steel Tap",
        price: 7249,
      },
      {
        capacity: "24L | 12L Storage",
        candles: 4,
        flowRate: "16 L/hr",
        type: "Vision Tap",
        price: 7499,
      },

      {
        capacity: "24L | 12L Storage",
        candles: 6,
        flowRate: "24 L/hr",
        type: "Plastic Tap",
        price: 7499,
      },
      {
        capacity: "24L | 12L Storage",
        candles: 6,
        flowRate: "24 L/hr",
        type: "Stainless Steel Tap",
        price: 7749,
      },
      {
        capacity: "24L | 12L Storage",
        candles: 6,
        flowRate: "24 L/hr",
        type: "Vision Tap",
        price: 7999,
      },

      // 32L | 16L Storage
      {
        capacity: "32L | 16L Storage",
        candles: 1,
        flowRate: "4 L/hr",
        type: "Plastic Tap",
        price: 6499,
      },
      {
        capacity: "32L | 16L Storage",
        candles: 1,
        flowRate: "4 L/hr",
        type: "Stainless Steel Tap",
        price: 6749,
      },
      {
        capacity: "32L | 16L Storage",
        candles: 1,
        flowRate: "4 L/hr",
        type: "Vision Tap",
        price: 6999,
      },

      {
        capacity: "32L | 16L Storage",
        candles: 2,
        flowRate: "8 L/hr",
        type: "Plastic Tap",
        price: 7249,
      },
      {
        capacity: "32L | 16L Storage",
        candles: 2,
        flowRate: "8 L/hr",
        type: "Stainless Steel Tap",
        price: 7499,
      },
      {
        capacity: "32L | 16L Storage",
        candles: 2,
        flowRate: "8 L/hr",
        type: "Vision Tap",
        price: 7799,
      },

      {
        capacity: "32L | 16L Storage",
        candles: 4,
        flowRate: "16 L/hr",
        type: "Plastic Tap",
        price: 7999,
      },
      {
        capacity: "32L | 16L Storage",
        candles: 4,
        flowRate: "16 L/hr",
        type: "Stainless Steel Tap",
        price: 8249,
      },
      {
        capacity: "32L | 16L Storage",
        candles: 4,
        flowRate: "16 L/hr",
        type: "Vision Tap",
        price: 8499,
      },

      {
        capacity: "32L | 16L Storage",
        candles: 6,
        flowRate: "24 L/hr",
        type: "Plastic Tap",
        price: 8499,
      },
      {
        capacity: "32L | 16L Storage",
        candles: 6,
        flowRate: "24 L/hr",
        type: "Stainless Steel Tap",
        price: 8749,
      },
      {
        capacity: "32L | 16L Storage",
        candles: 6,
        flowRate: "24 L/hr",
        type: "Vision Tap",
        price: 8999,
      },
    ],
    manufacturer: "RAMA ENTERPRISES",
  },
  {
    id: "heat-pump",
    name: "Heat Pump Water Heater",
    model: "SC-H-60M",
    image: HeatPump,
    features: [
      "Energy efficient hot water using heat pump technology",
      "Operates in wide ambient range (down to -15°C for EVI models)",
      "Monoblock & split variants available for easy installation",
      "Eco-friendly refrigerants and high COP (Coefficient of Performance)",
      "Suitable for residential, commercial and industrial applications",
    ],
    status: 1,
    specs: {
      type: "Air Source / Monoblock / Split / EVI",
      capacityRange: "200L – 1650L (model dependent)",
      maxOutletTemp: "55°C – 65°C",
      typicalCOP: "3.0 – 5.0",
      refrigerant: "R410A / R32 (model dependent)",
      ambientOperatingRange: "-15°C to 45°C (EVI models to -15°C)",
      powerInputRange: "1.5 kW – 20 kW (model dependent)",
      installation:
        "Outdoor / Rooftop (monoblock) or Split (indoor tank + outdoor unit)",
      usage: "Domestic, Hotels, Hospitals, Industrial processes",
    },
    badge: "HeatSaver",
    variations: true,
    variants: [
      {
        model: "SC-H-40M",
        capacity: "200L",
        placetype: "Residential",
        price: 150000,
      },
      {
        model: "SC-H-60M",
        capacity: "300L",
        placetype: "Residential / Small Commercial",
        price: 180000,
      },
      {
        model: "SC-H-75M",
        capacity: "500L",
        placetype: "Commercial",
        price: 275000,
      },
      {
        model: "SC-H-100M",
        capacity: "800L",
        placetype: "Large Commercial",
        price: 450000,
      },
      {
        model: "SC-H-195",
        capacity: "195L",
        placetype: "Commercial (air-source)",
        price: 350000,
      },
      {
        model: "SC-H-350",
        capacity: "350L",
        placetype: "Hotels / Resorts",
        price: 600000,
      },
      {
        model: "SC-H-1000V",
        capacity: "1000L",
        placetype: "Industrial / Large Commercial",
        price: 1200000,
      },
      {
        model: "SC-HW-550",
        capacity: "550L",
        placetype: "Water Source",
        price: 750000,
      },
    ],
    manufacturer: "Suntec Energy Systems",
    warranty:
      "Typically 2 years on unit, extended compressor warranty varies by model",
  },
  // 8. EV Bike
  {
    id: "ev-bike",
    name: "EV Bike",
    model: "Nemo",
    image: EVBike,
    features: [
      "Electric Vehicle for Bold Riders",
      "Eco-Friendly, Low Maintenance",
      "Quiet Operation",
      "No Fuel Required",
      "Tagline: 'Bild for Bold'",
    ],
    status: 1,
    specs: {
      type: "Electric Bike",
      fuel: "Battery",
      emission: "Zero",
      use: "Urban/Commuter",
    },
    badge: "Future Ride",
    variations: true,
    variants: [
      { color: "grey", battery: "3.0 kWh", price: 99000 },
      { color: "white", battery: "3.0 kWh", price: 99000 },
    ],
  },

  // 9. BLDC Fan
  {
    id: "bldc-fan",
    name: "Ceiling Fan",
    model: "BL-24 Smart",
    image: fanImg,
    features: [
      "30 Watt Energy Consumption",
      "Auto Cleaning Blades",
      "Remote Controlled",
      "Hybrid 12V DC / 220V AC",
      "Smart 385 RPM Performance",
    ],
    status: 1,
    specs: {
      power: "30 Watts",
      speed: "385 RPM",
      colors: "White, Brown",
      control: "Remote + Manual",
    },
    badge: "Energy Saver",
    variations: true,
    variants: [
      { type: "BLDC", color: "White", size: "1200 mm", price: 5999 },
      { type: "BLDC", color: "Brown", size: "1200 mm", price: 4999 },
      { type: "Regular", color: "White", size: "1200 mm", price: 6999 },
      { type: "Regular", color: "Brown", size: "1200 mm", price: 5999 },
    ],
  },

  // 10. Air Cooler
  {
    id: "air-cooler",
    name: "Air Cooler",
    model: "CoolBreeze 60",
    image: Album,
    features: [
      "High Air Delivery with Honeycomb Pads",
      "Energy Efficient Motor",
      "Water Level Indicator",
      "Remote Controlled Operation",
      "Suitable for Dry & Humid Conditions",
    ],
    status: 0,
    specs: {
      capacity: "60 Liters",
      control: "Remote + Manual",
      coolingArea: "Up to 250 sq.ft.",
      power: "Low Wattage Motor",
    },
    badge: "Cool Comfort",
    variations: true,
    variants: [
      { capacity: "50L", price: 7499 },
      { capacity: "60L", price: 7999 },
      { capacity: "75L", price: 8999 },
    ],
  },

  // 11. Ionizer
  {
    id: "ozone-ionizer",
    name: "Ozone Ionizer",
    model: "OZO3 Green",
    image: OZO3Img,
    features: [
      "Removes 80–95% Pesticides",
      "Kills Viruses, Germs, Pathogens",
      "Deodorizes Air & Preserves Food",
      "Sterilizes Kitchen Utensils & Bottles",
      "User-Friendly Timer System",
    ],
    status: 1,
    specs: {
      tech: "Ozone Green (OZO3)",
      usage: "Food, Air, Utensils",
      control: "Plug-and-Play with Timer",
    },
    badge: "FreshTech",
    variations: true,
    variants: [{ size: "Standard", price: 6500 }],
  },
];
