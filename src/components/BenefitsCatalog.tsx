import { useState, useMemo } from "react";
import { Search, Filter, ExternalLink, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BenefitModal from "./BenefitModal";
import beneficiosData from "@/data/beneficios.json";

const BenefitsCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSegment, setSelectedSegment] = useState("all");
  const [selectedTier, setSelectedTier] = useState("all");
  const [selectedBenefit, setSelectedBenefit] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const segments = useMemo(() => {
    const uniqueSegments = [...new Set(beneficiosData.map((b) => b.segmento))];
    return ["all", ...uniqueSegments];
  }, []);

  const filteredBenefits = useMemo(() => {
    return beneficiosData.filter((benefit) => {
      const matchesSearch =
        searchTerm === "" ||
        benefit.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        benefit.beneficio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        benefit.segmento.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSegment =
        selectedSegment === "all" || benefit.segmento === selectedSegment;

      const matchesTier =
        selectedTier === "all" || benefit.tiersElegiveis.includes(selectedTier);

      return matchesSearch && matchesSegment && matchesTier;
    });
  }, [searchTerm, selectedSegment, selectedTier]);

  const handleCardClick = (benefit: any) => {
    setSelectedBenefit(benefit);
    setIsModalOpen(true);
  };

  const tierColors = {
    T1: "bg-tier-1 text-white",
    T2: "bg-tier-2 text-white",
    T3: "bg-tier-3 text-white",
  };

  return (
    <section id="beneficios" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
              Catálogo de Benefícios
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Encontre as melhores soluções com condições exclusivas para acelerar seu e-commerce
            </p>
          </div>

          {/* Filters */}
          <div className="bg-card rounded-2xl p-6 shadow-lg mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar por empresa ou benefício..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-xl border-border"
                />
              </div>

              {/* Segment Filter */}
              <Select value={selectedSegment} onValueChange={setSelectedSegment}>
                <SelectTrigger className="rounded-xl">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Todos os segmentos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os segmentos</SelectItem>
                  {segments.slice(1).map((segment) => (
                    <SelectItem key={segment} value={segment}>
                      {segment}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Tier Filter */}
              <Select value={selectedTier} onValueChange={setSelectedTier}>
                <SelectTrigger className="rounded-xl">
                  <Tag className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Todos os tiers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tiers</SelectItem>
                  <SelectItem value="T1">Tier 1 - Embaixadores</SelectItem>
                  <SelectItem value="T2">Tier 2 - Alta Performance</SelectItem>
                  <SelectItem value="T3">Tier 3 - Base Ativa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-muted-foreground">
              {filteredBenefits.length} benefícios encontrados
            </div>
          </div>

          {/* Featured Banner */}
          <div className="bg-gradient-primary text-primary-foreground rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-semibold text-xl mb-2">
                  🎉 Empresas já confirmadas nesta fase
                </h3>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBenefits.map((benefit) => (
              <div
                key={benefit.id}
                onClick={() => handleCardClick(benefit)}
                className="bg-card hover:bg-card-hover rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
              >
                {/* Logo/Company Initial */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-gradient-card rounded-xl flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">
                      {benefit.empresa.charAt(0)}
                    </span>
                  </div>
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                {/* Company Name & Segment */}
                <h3 className="font-heading font-semibold text-xl text-foreground mb-1">
                  {benefit.empresa}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {benefit.segmento}
                </p>

                {/* Benefit */}
                <div className="bg-primary/10 rounded-xl p-3 mb-4">
                  <p className="font-semibold text-primary">
                    {benefit.beneficio}
                  </p>
                </div>

                {/* Tiers */}
                <div className="flex gap-2 mb-4">
                  {benefit.tiersElegiveis.map((tier) => (
                    <span
                      key={tier}
                      className={`${
                        tierColors[tier as keyof typeof tierColors]
                      } px-3 py-1 rounded-full text-xs font-semibold`}
                    >
                      {tier}
                    </span>
                  ))}
                </div>

                {/* Validity */}
                <p className="text-xs text-muted-foreground">
                  Válido até 30/04/2026
                </p>

                {/* CTA */}
                <Button
                  className="w-full mt-4 bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(benefit);
                  }}
                >
                  Solicitar benefício
                </Button>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredBenefits.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground mb-4">
                Nenhum benefício encontrado com os filtros selecionados
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedSegment("all");
                  setSelectedTier("all");
                }}
                variant="outline"
                className="rounded-full"
              >
                Limpar filtros
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Benefit Modal */}
      <BenefitModal
        benefit={selectedBenefit}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedBenefit(null);
        }}
      />
    </section>
  );
};

export default BenefitsCatalog;