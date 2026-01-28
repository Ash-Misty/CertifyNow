import React, { useState, useEffect } from "react";
import { Palette, Type, Image as ImageIcon, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "@/components/common/FileUpload";
import { CertificateTemplate } from "@/components/common/CertificateTemplate";
import { useCertificates } from "@/context/CertificateContext";
import { useToast } from "@/hooks/use-toast";
import { CertificateData } from "@/types/certificate";

/* -------------------- Fonts -------------------- */

const fonts = [
  { value: "Playfair Display", label: "Playfair Display (Classic)" },
  { value: "Georgia", label: "Georgia (Traditional)" },
  { value: "Times New Roman", label: "Times New Roman (Formal)" },
  { value: "Libre Baskerville", label: "Libre Baskerville (Elegant)" },
];

/* -------------------- Sample Certificate (Preview) -------------------- */

const sampleCertificate: CertificateData = {
  id: "preview",
  studentName: "Sample Student Name",
  certificateId: "CERT-2024-XXXX",
  email: "student@example.com",
  domain: "Web Development",
  grade: "A+",
  startDate: "2024-01-01",
  endDate: "2024-03-31",
  status: "allocated",
  createdAt: new Date().toISOString(),
};

/* -------------------- DEFAULT DESIGN (🔥 IMPORTANT) -------------------- */

const defaultDesign = {
  organizationName: "",
  title: "Certificate of Completion",
  description:
    "This is to certify that the above named candidate has successfully completed the program.",
  fontFamily: "Playfair Display",
  logoUrl: "",
  signatureUrl: "",
};

const CertificateDesigner: React.FC = () => {
  const { design, updateDesign } = useCertificates();
  const { toast } = useToast();

  // ✅ SAFE INITIAL STATE
  const [localDesign, setLocalDesign] = useState(defaultDesign);

  // 🔁 Sync backend design when it arrives
  useEffect(() => {
    if (design) {
      setLocalDesign(design);
    }
  }, [design]);

  // 💾 Save design
  const handleSave = () => {
    updateDesign(localDesign);
    toast({
      title: "Design Saved",
      description: "Your certificate design has been updated successfully.",
    });
  };

  // 🖼 Logo upload
  const handleLogoUpload = (_file: File, previewUrl: string) => {
    setLocalDesign(prev => ({ ...prev, logoUrl: previewUrl }));
  };

  // ✍ Signature upload
  const handleSignatureUpload = (_file: File, previewUrl: string) => {
    setLocalDesign(prev => ({ ...prev, signatureUrl: previewUrl }));
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Certificate Designer
          </h1>
          <p className="text-muted-foreground mt-1">
            Customize your certificate template
          </p>
        </div>
        <Button onClick={handleSave} variant="gradient" size="lg">
          <Save className="w-4 h-4 mr-2" />
          Save Design
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        {/* -------------------- Settings Panel -------------------- */}
        <div className="space-y-6">
          {/* Text Settings */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
                <Type className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">
                Text Content
              </h2>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <Label>Organization Name</Label>
                <Input
                  value={localDesign.organizationName}
                  onChange={e =>
                    setLocalDesign(prev => ({
                      ...prev,
                      organizationName: e.target.value,
                    }))
                  }
                  placeholder="Tech Academy"
                />
              </div>

              <div className="space-y-2">
                <Label>Certificate Title</Label>
                <Input
                  value={localDesign.title}
                  onChange={e =>
                    setLocalDesign(prev => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  placeholder="Certificate of Completion"
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={localDesign.description}
                  onChange={e =>
                    setLocalDesign(prev => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Font Family</Label>
                <Select
                  value={localDesign.fontFamily}
                  onValueChange={value =>
                    setLocalDesign(prev => ({
                      ...prev,
                      fontFamily: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    {fonts.map(font => (
                      <SelectItem key={font.value} value={font.value}>
                        {font.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Image Settings */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10">
                <ImageIcon className="w-5 h-5 text-accent" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">
                Images
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ImageUpload
                label="Organization Logo"
                currentImage={localDesign.logoUrl}
                onImageSelect={handleLogoUpload}
              />
              <ImageUpload
                label="Authorized Signature"
                currentImage={localDesign.signatureUrl}
                onImageSelect={handleSignatureUpload}
              />
            </div>
          </div>
        </div>

        {/* -------------------- Live Preview -------------------- */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-success/10">
              <Palette className="w-5 h-5 text-success" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">
              Live Preview
            </h2>
          </div>

          <div className="bg-muted/30 rounded-xl p-4 sm:p-6">
            <CertificateTemplate
              data={sampleCertificate}
              design={localDesign}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateDesigner;
