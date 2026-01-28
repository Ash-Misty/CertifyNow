import React, { useState } from "react";
import { FileSpreadsheet, AlertCircle } from "lucide-react";
import { FileUpload } from "@/components/common/FileUpload";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "@/components/common/Loader";
import { Badge } from "@/components/ui/badge";

const UploadCertificates: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedCount, setUploadedCount] = useState<number | null>(null);
  const { toast } = useToast();

  // 🔥 REAL FILE UPLOAD HANDLER
  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);
    setUploadedCount(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(
        "http://localhost:5000/api/admin/upload-excel",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Upload failed");
      }

      setUploadedCount(data.recordsInserted);

      toast({
        title: "Upload Successful",
        description: `${data.recordsInserted} certificates saved successfully.`,
      });
    } catch (err: any) {
      toast({
        title: "Upload Error",
        description: err.message || "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Upload Certificates
        </h1>
        <p className="text-muted-foreground mt-1">
          Upload Excel file containing student certificate data
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10">
            <FileSpreadsheet className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Upload Excel File
            </h2>
            <p className="text-sm text-muted-foreground">
              Supported format: .xlsx or .xls
            </p>
          </div>
        </div>

        <FileUpload
          accept=".xlsx,.xls"
          onFileSelect={handleFileSelect}
          label="Upload Certificate Excel"
          description="Drag & drop your Excel file here or click to browse"
        />

        {/* Processing Indicator */}
        {isProcessing && (
          <div className="flex items-center justify-center gap-3 mt-6 p-4 bg-muted/50 rounded-xl">
            <Loader size="sm" />
            <span className="text-muted-foreground">
              Processing file, please wait...
            </span>
          </div>
        )}

        {/* Success Info */}
        {uploadedCount !== null && !isProcessing && (
          <div className="flex items-center gap-3 mt-6 p-4 bg-success/10 border border-success/20 rounded-xl">
            <Badge variant="secondary">
              {uploadedCount} records inserted
            </Badge>
            <span className="text-success text-sm">
              Certificates stored successfully
            </span>
          </div>
        )}

        {/* Info Box */}
        <div className="flex items-start gap-3 mt-6 p-4 bg-accent/5 rounded-xl border border-accent/20">
          <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-foreground">
              Expected Excel Columns
            </p>
            <p className="text-muted-foreground mt-1">
              certificateId, studentName, email, domain, grade, startDate,
              endDate
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadCertificates;

