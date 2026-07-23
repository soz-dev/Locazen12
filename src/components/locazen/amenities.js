import { Wifi, Car, Waves, Utensils, Tv, Snowflake, Coffee, PawPrint, Sun, Dumbbell, WashingMachine } from "lucide-react";

export const AMENITIES = [
  { key: "wifi", label: "Wi-Fi", Icon: Wifi },
  { key: "parking", label: "Parking", Icon: Car },
  { key: "pool", label: "Piscine", Icon: Waves },
  { key: "kitchen", label: "Cuisine", Icon: Utensils },
  { key: "tv", label: "Télévision", Icon: Tv },
  { key: "ac", label: "Climatisation", Icon: Snowflake },
  { key: "breakfast", label: "Petit-déjeuner", Icon: Coffee },
  { key: "pets", label: "Animaux acceptés", Icon: PawPrint },
  { key: "terrace", label: "Terrasse", Icon: Sun },
  { key: "gym", label: "Salle de sport", Icon: Dumbbell },
  { key: "washer", label: "Lave-linge", Icon: WashingMachine },
];

export const getAmenity = (key) => AMENITIES.find((a) => a.key === key);
