import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-3 rounded-full mb-8">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-primary font-semibold">Lançamento Novembro 2025</span>
          </div>

          {/* Headline */}
          <h1 className="font-heading font-black text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
            <span className="text-primary">Clube de Benefícios</span>
            <span className="block text-foreground">
              Pagaleve
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            Benefícios que potencializam seu e-commerce com condições exclusivas para quem é Pagaleve
          </p>

          {/* CTAs */}
          <div className="flex justify-center mb-12">
            <Button
              onClick={() => scrollToSection("beneficios")}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full px-10 py-6 text-lg shadow-glow"
            >
              Explorar benefícios
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;