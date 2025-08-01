import React from "react";
import {
  IconBike,
  IconBottle,
  IconDeviceProjector,
  IconDeviceTv,
  IconDropletFilled,
  IconFlame,
  IconLeaf,
  IconSnowflake,
  IconSolarPanel,
  IconTemperature,
  IconWind,
  IconWindmill,
} from "@tabler/icons-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import Image from "next/image";

export function HeroBentoGrid() {
  return (
    <BentoGrid className="max-w-7xl mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
const items = [
  {
    title: "4K Ultra HD Smart TV",
    description: "50-inch display with webOS, Alexa, and Dolby Atmos",
    header: (
      <Image
        src={
          "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt="Tv"
        className="w-full h-[160px] border rounded-xl"
        width={200}
        height={200}
      />
    ),
    icon: <IconDeviceTv className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "4K Laser TV",
    description: "120-inch ALR screen with triple laser technology",
    header: (
      <Image
        src={
          "https://images.unsplash.com/photo-1593784991251-92ded75ea290?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt="Lasser Tvs"
        className="w-full h-[160px] border rounded-xl"
        width={200}
        height={200}
      />
    ),
    icon: <IconDeviceProjector className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Solar Water Pump",
    description: "BLDC pumps (0.25HP-10HP) with 30,000+ hours lifespan",
    header: (
      <Image
        src={
          "https://plus.unsplash.com/premium_photo-1682144321844-ee7d148c83f8?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt="Solar Water Pump"
        className="w-full h-[160px] border rounded-xl"
        width={200}
        height={200}
      />
    ),
    icon: <IconDropletFilled className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Inverter AC",
    description: "1-2 ton AI-enabled ACs with self-cleaning",
    header: (
      <Image
        src={
          "https://images.unsplash.com/photo-1662601699213-cb84f13d86df?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt="Inverter AC"
        className="w-full h-[160px] border rounded-xl"
        width={1200}
        height={200}
      />
    ),
    icon: <IconSnowflake className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Alkaline Water Purifier",
    description: "4 models for different TDS levels (300-350+)",
    header: (
      <Image
        src={
          "https://images.unsplash.com/photo-1669211659110-3f3db4119b65?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt="Alkaline Water Purifier"
        className="w-full h-[160px] border rounded-xl"
        width={1200}
        height={200}
      />
    ),
    icon: <IconBottle className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "BLDC Ceiling Fan",
    description: "30W smart fan with auto-cleaning blades",
    header: (
      <Image
        src={
          "https://images.unsplash.com/photo-1609519479841-5fd3b2884e17?q=80&w=986&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt="BLDC Ceiling Fan"
        className="w-full h-[160px] border rounded-xl"
        width={200}
        height={200}
      />
    ),
    icon: <IconWindmill className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Ozone Sterilizer",
    description: "Removes 95% pesticides from food and utensils",
    header: (
      <Image
        src={
          "https://images.unsplash.com/photo-1623682687595-d10051d8bd73?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt="Ozone Sterilizer"
        className="w-full h-[160px] border rounded-xl"
        width={200}
        height={200}
      />
    ),
    icon: <IconLeaf className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "EV Bike",
    description: "Eco-friendly electric mobility solution",
    header: (
      <Image
        src={
          "https://images.unsplash.com/photo-1676539223334-92a85b103dd7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt="EV Bike"
        className="w-full h-[160px] border rounded-xl"
        width={200}
        height={200}
      />
    ),
    icon: <IconBike className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Solar Panels",
    description: "3D-mounted residential/commercial solutions",
    header: (
      <Image
        src={
          "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt="Solar Panels"
        className="w-full h-[160px] border rounded-xl"
        width={200}
        height={200}
      />
    ),
    icon: <IconSolarPanel className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Solar Cooker",
    description: "Parabolic design for fuel-free cooking",
    header: (
      <Image
        src={
          "https://images.unsplash.com/photo-1556911220-dabc1f02913a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt="Solar Cooker"
        className="w-full h-[160px] border rounded-xl"
        width={200}
        height={200}
      />
    ),
    icon: <IconFlame className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Air Cooler",
    description: "Energy-efficient cooling solution",
    header: (
      <Image
        src={
          "https://images.unsplash.com/photo-1727886184122-8a451fffbd73?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt="Air Cooler"
        className="w-full h-[160px] border rounded-xl"
        width={200}
        height={200}
      />
    ),
    icon: <IconWind className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Water Heater",
    description: "Solar-powered heating systems",
    header: (
      <Image
        src={
          "https://images.unsplash.com/photo-1545259742-b4fd8fea67e4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt="Water Heater"
        className="w-full h-[160px] border rounded-xl"
        width={200}
        height={200}
      />
    ),
    icon: <IconTemperature className="h-4 w-4 text-neutral-500" />,
  },
];
