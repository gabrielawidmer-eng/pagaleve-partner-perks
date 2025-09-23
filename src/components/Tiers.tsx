import { Crown, TrendingUp, Users, ChevronRight, Edit2, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import tiersData from "@/data/tiers.json";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
const Tiers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tiers, setTiers] = useState(tiersData.tiers);
  const [editingTier, setEditingTier] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<any>({});
  const ambassadorCompanies = tiers[0]?.empresasDestaque || [];
  useEffect(() => {
    if (ambassadorCompanies.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % Math.ceil(ambassadorCompanies.length / 4));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [ambassadorCompanies.length]);
  const tierIcons = {
    "Embaixadores": Crown,
    "Alta Performance": TrendingUp,
    "Base Ativa": Users
  };

  const handleEdit = (tier: any) => {
    setEditingTier(tier.id);
    setEditedData({
      nome: tier.nome,
      descricao: tier.descricao
    });
  };

  const handleSave = (tierId: string) => {
    setTiers(tiers.map(tier => 
      tier.id === tierId 
        ? { ...tier, ...editedData }
        : tier
    ));
    setEditingTier(null);
    setEditedData({});
  };

  const handleCancel = () => {
    setEditingTier(null);
    setEditedData({});
  };
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
            Nossos Tiers de Parceiros
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conheça as categorias de parceiros e suas empresas destaque
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier) => {
            const Icon = tierIcons[tier.nome as keyof typeof tierIcons];
            const isEditing = editingTier === tier.id;
            
            return (
              <div
                key={tier.id}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow relative"
              >
                {/* Edit Button */}
                {!isEditing && (
                  <Button
                    onClick={() => handleEdit(tier)}
                    size="sm"
                    variant="ghost"
                    className="absolute top-4 right-4 p-2"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                )}
                
                {/* Action Buttons when editing */}
                {isEditing && (
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      onClick={() => handleSave(tier.id)}
                      size="sm"
                      variant="ghost"
                      className="p-2 text-green-600 hover:text-green-700"
                    >
                      <Save className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={handleCancel}
                      size="sm"
                      variant="ghost"
                      className="p-2 text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                
                <div className="flex items-center justify-between mb-4">
                  {isEditing ? (
                    <Input
                      value={editedData.nome}
                      onChange={(e) => setEditedData({...editedData, nome: e.target.value})}
                      className="font-heading font-bold text-2xl w-3/4"
                    />
                  ) : (
                    <h3 className="font-heading font-bold text-2xl text-foreground">
                      {tier.nome}
                    </h3>
                  )}
                  {!isEditing && <Icon className="w-8 h-8 text-primary" />}
                </div>
                
                {isEditing ? (
                  <Textarea
                    value={editedData.descricao}
                    onChange={(e) => setEditedData({...editedData, descricao: e.target.value})}
                    className="text-muted-foreground mb-6 min-h-[80px]"
                  />
                ) : (
                  <p className="text-muted-foreground mb-6">{tier.descricao}</p>
                )}
                
                <div>
                  <h4 className="font-semibold text-foreground mb-3">
                    Empresas Destaque:
                  </h4>
                  <div className="space-y-2">
                    {tier.empresasDestaque.slice(0, 3).map((empresa) => (
                      <div
                        key={empresa}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <ChevronRight className="w-4 h-4 text-primary" />
                        <span>{empresa}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel de empresas embaixadoras */}
        <div className="mt-16">
          <h3 className="font-heading font-bold text-2xl text-center text-foreground mb-8">
            Empresas Embaixadoras
          </h3>
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`
              }}
            >
              {Array.from({
                length: Math.ceil(ambassadorCompanies.length / 4)
              }).map((_, pageIndex) => (
                <div
                  key={pageIndex}
                  className="w-full flex-shrink-0 grid grid-cols-2 md:grid-cols-4 gap-4 px-4"
                >
                  {ambassadorCompanies
                    .slice(pageIndex * 4, (pageIndex + 1) * 4)
                    .map((empresa) => (
                      <div
                        key={empresa}
                        className="bg-card border border-border rounded-lg p-4 text-center"
                      >
                        <span className="text-sm font-medium text-foreground">
                          {empresa}
                        </span>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Tiers;