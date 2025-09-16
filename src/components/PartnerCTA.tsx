import { Building, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
const PartnerCTA = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  return;
};
export default PartnerCTA;