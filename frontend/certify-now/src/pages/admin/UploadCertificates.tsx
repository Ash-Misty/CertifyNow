import React, { useState } from 'react';
import { Upload, FileSpreadsheet, AlertCircle } from 'lucide-react';
import { FileUpload } from '@/components/common/FileUpload';
import { DataTable } from '@/components/common/DataTable';
import { Button } from '@/components/ui/button';
import { useCertificates } from '@/context/CertificateContext';
import { useToast } from '@/hooks/use-toast';
import { CertificateData } from '@/types/certificate';
import { Loader } from '@/components/common/Loader';
import { Badge } from '@/components/ui/badge';

// Mock function to simulate parsing uploaded file
const parseUploadedFile = async (file: File): Promise<CertificateData[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Return mock data (in real app, this would parse the Excel/PDF)
  return [
    {
      id: `new-${Date.now()}-1`,
      studentName: 'Alice Brown',
      certificateId: `CERT-2024-${Math.floor(Math.random() * 1000)}`,
      email: 'alice.brown@email.com',
      domain: 'Full Stack Development',
      grade: 'A',
      startDate: '2024-04-01',
      endDate: '2024-06-30',
      status: 'pending',
      createdAt: new Date().toISOString(),
    },
    {
      id: `new-${Date.now()}-2`,
      studentName: 'Bob Taylor',
      certificateId: `CERT-2024-${Math.floor(Math.random() * 1000)}`,
      email: 'bob.taylor@email.com',
      domain: 'Data Analytics',
      grade: 'A-',
      startDate: '2024-04-15',
      endDate: '2024-07-15',
      status: 'pending',
      createdAt: new Date().toISOString(),
    },
    {
      id: `new-${Date.now()}-3`,
      studentName: 'Carol White',
      certificateId: `CERT-2024-${Math.floor(Math.random() * 1000)}`,
      email: 'carol.white@email.com',
      domain: 'Cybersecurity',
      grade: 'B+',
      startDate: '2024-05-01',
      endDate: '2024-08-01',
      status: 'pending',
      createdAt: new Date().toISOString(),
    },
  ];
};

const UploadCertificates: React.FC = () => {
  const [uploadedData, setUploadedData] = useState<CertificateData[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { addCertificates } = useCertificates();
  const { toast } = useToast();

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setIsProcessing(true);

    try {
      const data = await parseUploadedFile(file);
      setUploadedData(data);
      toast({
        title: 'File Processed',
        description: `Extracted ${data.length} certificate records.`,
      });
    } catch (error) {
      toast({
        title: 'Processing Error',
        description: 'Failed to parse the file. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveData = () => {
    addCertificates(uploadedData);
    toast({
      title: 'Certificates Saved',
      description: `${uploadedData.length} certificates have been added.`,
    });
    setUploadedData([]);
    setSelectedFile(null);
  };

  const columns = [
    {
      key: 'studentName',
      header: 'Student Name',
      render: (item: CertificateData) => (
        <span className="font-medium text-foreground">{item.studentName}</span>
      ),
    },
    {
      key: 'certificateId',
      header: 'Certificate ID',
      render: (item: CertificateData) => (
        <span className="font-mono text-sm text-muted-foreground">{item.certificateId}</span>
      ),
    },
    {
      key: 'email',
      header: 'Email',
      className: 'hidden md:table-cell',
    },
    {
      key: 'domain',
      header: 'Domain',
    },
    {
      key: 'grade',
      header: 'Grade',
      render: (item: CertificateData) => (
        <span className="font-semibold text-accent">{item.grade}</span>
      ),
    },
    {
      key: 'endDate',
      header: 'End Date',
      className: 'hidden lg:table-cell',
      render: (item: CertificateData) => new Date(item.endDate).toLocaleDateString(),
    },
  ];

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Upload Certificates</h1>
        <p className="text-muted-foreground mt-1">
          Upload Excel or PDF files containing certificate data
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10">
            <FileSpreadsheet className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Upload File</h2>
            <p className="text-sm text-muted-foreground">
              Supported formats: Excel (.xlsx, .xls) or PDF
            </p>
          </div>
        </div>

        <FileUpload
          accept=".xlsx,.xls,.pdf"
          onFileSelect={handleFileSelect}
          label="Upload Certificate Data"
          description="Drag and drop your file here, or click to browse"
        />

        {/* Processing indicator */}
        {isProcessing && (
          <div className="flex items-center justify-center gap-3 mt-6 p-4 bg-muted/50 rounded-xl">
            <Loader size="sm" />
            <span className="text-muted-foreground">Processing file...</span>
          </div>
        )}

        {/* Info box */}
        <div className="flex items-start gap-3 mt-6 p-4 bg-accent/5 rounded-xl border border-accent/20">
          <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-foreground">Expected file format</p>
            <p className="text-muted-foreground mt-1">
              Your file should contain columns: Student Name, Certificate ID, Email, Domain, Grade, Start Date, End Date
            </p>
          </div>
        </div>
      </div>

      {/* Extracted Data */}
      {uploadedData.length > 0 && (
        <div className="bg-card rounded-2xl border border-border p-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Extracted Data</h2>
              <p className="text-sm text-muted-foreground">
                Review the data before saving
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="px-3 py-1">
                {uploadedData.length} records
              </Badge>
              <Button onClick={handleSaveData} variant="gradient">
                <Upload className="w-4 h-4 mr-2" />
                Save All
              </Button>
            </div>
          </div>

          <DataTable
            data={uploadedData}
            columns={columns}
            searchable
            searchKeys={['studentName', 'certificateId', 'email']}
            pageSize={10}
          />
        </div>
      )}
    </div>
  );
};

export default UploadCertificates;
