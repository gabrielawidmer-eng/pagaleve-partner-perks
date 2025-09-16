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
  return <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      
    </section>;
};
export default PartnerCTA;