import { Crown, TrendingUp, Users, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import tiersData from "@/data/tiers.json";
const Tiers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ambassadorCompanies = tiersData.tiers[0].empresasDestaque;
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % Math.ceil(ambassadorCompanies.length / 4));
    }, 3000);
    return () => clearInterval(interval);
  }, [ambassadorCompanies.length]);
  const tierIcons = {
    T1: Crown,
    T2: TrendingUp,
    T3: Users
  };
  return;
};
export default Tiers;