import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, Check, Clock, MapPin, AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Benefit {
  id: string;
  empresa: string;
  segmento: string;
  site: string;
  logo: string;
  beneficio: string;
  beneficioDetalhado: string;
  tiersElegiveis: string[];
  validade: string;
  comoResgatar: string;
  observacoes: string;
  ctaLink: string;
  cupom: string | null;
  beneficiosPorTier?: {
    [key: string]: string;
  };
}

interface BenefitModalProps {
  benefit: Benefit | null;
  isOpen: boolean;
  onClose: () => void;
}

const BenefitModal = ({ benefit, isOpen, onClose }: BenefitModalProps) => {
  if (!benefit) return null;

  const handleAccessBenefit = () => {
    window.open(benefit.ctaLink, "_blank");
    toast.success("Redirecionando para o parceiro...");
  };

  const tierColors = {
    T1: "bg-tier-1",
    T2: "bg-tier-2",
    T3: "bg-tier-3",
  };

  const tierNames = {
    T1: "Embaixadores",
    T2: "Alta Performance",
    T3: "Base Ativa",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4 mb-4">
            <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-primary">
                {benefit.empresa.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl font-heading font-bold text-foreground mb-2">
                {benefit.empresa}
              </DialogTitle>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                  {benefit.segmento}
                </span>
                <a
                  href={benefit.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
                >
                  Visitar site
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Benefit Description */}
          <div className="bg-muted/50 rounded-xl p-6">
            <h3 className="font-heading font-semibold text-xl text-foreground mb-3">
              {benefit.beneficio}
            </h3>
            <p className="text-muted-foreground">
              {benefit.beneficioDetalhado}
            </p>
          </div>

          {/* Eligible Tiers */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Elegível para
            </h4>
            <div className="space-y-3">
              {benefit.tiersElegiveis.map((tier) => (
                <div key={tier} className="flex items-start gap-4">
                  <div
                    className={`${tierColors[tier as keyof typeof tierColors]} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
                  >
                    {tier.replace("T", "")}
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-foreground mb-1">
                      {tierNames[tier as keyof typeof tierNames]}
                    </h5>
                    <p className="text-sm text-muted-foreground">
                      {benefit.beneficiosPorTier?.[tier] || 
                       `Benefício disponível para clientes ${tierNames[tier as keyof typeof tierNames]}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How to Redeem */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Check className="w-5 h-5 text-primary" />
              Como resgatar
            </h4>
            <p className="text-muted-foreground bg-card rounded-xl p-4">
              {benefit.comoResgatar}
            </p>
          </div>


          {/* Validity */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Validade
            </h4>
            <p className="text-muted-foreground">
              {benefit.validade}
            </p>
          </div>

          {/* Observations */}
          {benefit.observacoes && (
            <div className="bg-warning/10 border border-warning/20 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                {benefit.observacoes}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleAccessBenefit}
              size="lg"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full"
            >
              Solicitar benefício
              <ExternalLink className="ml-2 w-5 h-5" />
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              size="lg"
              className="rounded-full"
            >
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BenefitModal;