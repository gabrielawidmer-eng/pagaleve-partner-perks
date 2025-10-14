import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Upload, Loader2 } from "lucide-react";

const benefitSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(255),
  company_name: z.string().min(1, "Nome da empresa é obrigatório").max(255),
  company_website: z.string().url("URL inválida").optional().or(z.literal("")),
  company_contact: z.string().max(255).optional().or(z.literal("")),
  company_summary: z.string().optional(),
  description: z.string().min(1, "Descrição é obrigatória"),
  category: z.enum([
    "marketing",
    "logistica",
    "financas",
    "ferramentas",
    "tecnologia",
    "recursos_humanos",
    "outro",
  ]),
  benefit_type: z.enum(["desconto", "credito", "gratuidade", "mentoria", "outro"]),
  redemption_link: z.string().url("URL inválida").optional().or(z.literal("")),
  additional_info: z.string().optional(),
  is_active: z.boolean().default(true),
});

type BenefitFormValues = z.infer<typeof benefitSchema>;

interface BenefitFormProps {
  benefitId?: string | null;
  onSuccess: () => void;
}

export const BenefitForm = ({ benefitId, onSuccess }: BenefitFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const form = useForm<BenefitFormValues>({
    resolver: zodResolver(benefitSchema),
    defaultValues: {
      name: "",
      company_name: "",
      company_website: "",
      company_contact: "",
      company_summary: "",
      description: "",
      category: "outro",
      benefit_type: "outro",
      redemption_link: "",
      additional_info: "",
      is_active: true,
    },
  });

  useEffect(() => {
    if (benefitId) {
      loadBenefit();
    }
  }, [benefitId]);

  const loadBenefit = async () => {
    if (!benefitId) return;

    try {
      const { data, error } = await supabase
        .from("benefits")
        .select("*")
        .eq("id", benefitId)
        .single();

      if (error) throw error;

      if (data) {
        form.reset({
          name: data.name,
          company_name: data.company_name,
          company_website: data.company_website || "",
          company_contact: data.company_contact || "",
          company_summary: data.company_summary || "",
          description: data.description,
          category: data.category,
          benefit_type: data.benefit_type,
          redemption_link: data.redemption_link || "",
          additional_info: data.additional_info || "",
          is_active: data.is_active,
        });

        if (data.logo_url) {
          setLogoPreview(data.logo_url);
        }
      }
    } catch (error) {
      console.error("Error loading benefit:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar o benefício.",
        variant: "destructive",
      });
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadLogo = async (): Promise<string | null> => {
    if (!logoFile) return null;

    try {
      setUploading(true);
      const fileExt = logoFile.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("benefit-logos")
        .upload(filePath, logoFile);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("benefit-logos")
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error("Error uploading logo:", error);
      toast({
        title: "Erro",
        description: "Não foi possível fazer upload do logo.",
        variant: "destructive",
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (values: BenefitFormValues) => {
    try {
      setLoading(true);

      let logoUrl = logoPreview;
      if (logoFile) {
        const uploadedUrl = await uploadLogo();
        if (uploadedUrl) {
          logoUrl = uploadedUrl;
        }
      }

      const benefitData = {
        ...values,
        logo_url: logoUrl,
        company_website: values.company_website || null,
        company_contact: values.company_contact || null,
        company_summary: values.company_summary || null,
        redemption_link: values.redemption_link || null,
        additional_info: values.additional_info || null,
      };

      if (benefitId) {
        const { error } = await supabase
          .from("benefits")
          .update({
            name: benefitData.name,
            company_name: benefitData.company_name,
            company_website: benefitData.company_website,
            company_contact: benefitData.company_contact,
            company_summary: benefitData.company_summary,
            logo_url: benefitData.logo_url,
            description: benefitData.description,
            category: benefitData.category,
            benefit_type: benefitData.benefit_type,
            redemption_link: benefitData.redemption_link,
            additional_info: benefitData.additional_info,
            is_active: benefitData.is_active,
          })
          .eq("id", benefitId);

        if (error) throw error;

        toast({
          title: "Sucesso",
          description: "Benefício atualizado com sucesso!",
        });
      } else {
        const { error } = await supabase.from("benefits").insert([{
          name: benefitData.name,
          company_name: benefitData.company_name,
          company_website: benefitData.company_website,
          company_contact: benefitData.company_contact,
          company_summary: benefitData.company_summary,
          logo_url: benefitData.logo_url,
          description: benefitData.description,
          category: benefitData.category,
          benefit_type: benefitData.benefit_type,
          redemption_link: benefitData.redemption_link,
          additional_info: benefitData.additional_info,
          is_active: benefitData.is_active,
        }]);

        if (error) throw error;

        toast({
          title: "Sucesso",
          description: "Benefício cadastrado com sucesso!",
        });
      }

      onSuccess();
    } catch (error) {
      console.error("Error saving benefit:", error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o benefício.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-card p-6 rounded-lg border">
        {/* Logo Upload */}
        <div className="space-y-2">
          <FormLabel>Logo da Empresa</FormLabel>
          <div className="flex items-center gap-4">
            {logoPreview && (
              <img
                src={logoPreview}
                alt="Preview"
                className="w-24 h-24 object-contain rounded border"
              />
            )}
            <div className="flex-1">
              <Input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                disabled={uploading}
              />
              <FormDescription>
                Faça upload da logo da empresa (PNG, JPG ou SVG)
              </FormDescription>
            </div>
          </div>
        </div>

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Benefício *</FormLabel>
              <FormControl>
                <Input placeholder="Ex: 20% de desconto em todos os planos" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Company Name */}
        <FormField
          control={form.control}
          name="company_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Empresa *</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Empresa Parceira" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Company Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="company_website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Site da Empresa</FormLabel>
                <FormControl>
                  <Input placeholder="https://exemplo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company_contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contato</FormLabel>
                <FormControl>
                  <Input placeholder="contato@empresa.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="company_summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resumo da Empresa</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Breve descrição sobre a empresa parceira..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição do Benefício *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva detalhadamente o benefício oferecido..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category and Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="logistica">Logística</SelectItem>
                    <SelectItem value="financas">Finanças</SelectItem>
                    <SelectItem value="ferramentas">Ferramentas</SelectItem>
                    <SelectItem value="tecnologia">Tecnologia</SelectItem>
                    <SelectItem value="recursos_humanos">Recursos Humanos</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="benefit_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Benefício *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="desconto">Desconto</SelectItem>
                    <SelectItem value="credito">Crédito</SelectItem>
                    <SelectItem value="gratuidade">Gratuidade</SelectItem>
                    <SelectItem value="mentoria">Mentoria</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Redemption Link */}
        <FormField
          control={form.control}
          name="redemption_link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link de Resgate</FormLabel>
              <FormControl>
                <Input placeholder="https://exemplo.com/resgate" {...field} />
              </FormControl>
              <FormDescription>
                Link para o usuário acessar ou resgatar o benefício
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Additional Info */}
        <FormField
          control={form.control}
          name="additional_info"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Informações Adicionais</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Outras informações relevantes sobre o benefício..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Active Status */}
        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Benefício Ativo</FormLabel>
                <FormDescription>
                  Benefícios inativos não aparecem para os usuários
                </FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="flex gap-4">
          <Button type="submit" disabled={loading || uploading} className="flex-1">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              <>{benefitId ? "Atualizar" : "Cadastrar"} Benefício</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
