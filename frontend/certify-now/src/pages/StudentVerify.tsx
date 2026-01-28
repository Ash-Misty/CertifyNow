import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, CheckCircle, XCircle, Download, Award, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CertificateTemplate } from '@/components/common/CertificateTemplate';
import { useCertificates } from '@/context/CertificateContext';
import { CertificateData } from '@/types/certificate';
import { Loader } from '@/components/common/Loader';
import { Navbar } from '@/components/layout/Navbar';

const StudentVerify: React.FC = () => {
  const [certificateId, setCertificateId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<CertificateData | null | undefined>(undefined);
  const { verifyCertificate, design } = useCertificates();

  const handleVerify = async () => {
    // Prevent empty input
    if (!certificateId.trim()) return;

    setIsSearching(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const result = verifyCertificate(certificateId.trim());
    setSearchResult(result);
    setIsSearching(false);
  };

  const handleDownload = () => {
    alert('PDF download functionality would be implemented here');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleVerify();
    }
  };

  // Button is enabled if user typed something, disabled only while searching
  const isButtonDisabled = isSearching;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-6">
            <Award className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Verify Your Certificate
          </h1>
          <p className="text-lg text-muted-foreground">
            Enter your certificate ID to verify its authenticity and download a copy
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="bg-card rounded-2xl shadow-card border border-border p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter Certificate ID (e.g., CERT-2024-001)"
                  value={certificateId}
                  onChange={e => setCertificateId(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10 h-12"
                />
              </div>
              <Button
                onClick={handleVerify}
                size="lg"
                disabled={isButtonDisabled}
                className={`
                  h-12 flex items-center justify-center
                  bg-gradient-to-r from-blue-500 to-indigo-500
                  text-white font-semibold
                  transition-all duration-200
                  ${!isButtonDisabled ? 'hover:from-blue-600 hover:to-indigo-600' : 'opacity-70 cursor-not-allowed'}
                `}
              >
                {isSearching ? (
                  <Loader size="sm" className="mr-2" />
                ) : (
                  <Search className="w-4 h-4 mr-2" />
                )}
                Verify
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        {searchResult !== undefined && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            {searchResult === null ? (
              <div className="bg-card rounded-2xl shadow-card border border-destructive/20 p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-6">
                  <XCircle className="w-8 h-8 text-destructive" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  Certificate Not Found
                </h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  We couldn't find a certificate with the ID "{certificateId}". 
                  Please check the ID and try again.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setCertificateId('');
                    setSearchResult(undefined);
                  }}
                >
                  Try Again
                </Button>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Success Banner */}
                <div className="bg-success/5 border border-success/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-success/10">
                      <CheckCircle className="w-6 h-6 text-success" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">
                        Certificate Verified!
                      </h2>
                      <p className="text-muted-foreground">
                        This certificate is valid and authentic
                      </p>
                    </div>
                  </div>
                  <Button onClick={handleDownload} variant="success" size="lg">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>

                {/* Student Details */}
                <div className="bg-card rounded-2xl shadow-card border border-border p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Certificate Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 bg-muted/30 rounded-xl">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Student Name</p>
                      <p className="font-semibold text-foreground">{searchResult.studentName}</p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-xl">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Certificate ID</p>
                      <p className="font-mono font-semibold text-foreground">{searchResult.certificateId}</p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-xl">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Domain</p>
                      <p className="font-semibold text-foreground">{searchResult.domain}</p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-xl">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Grade</p>
                      <p className="font-semibold text-accent">{searchResult.grade}</p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-xl">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Start Date</p>
                      <p className="font-semibold text-foreground">
                        {new Date(searchResult.startDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-xl">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">End Date</p>
                      <p className="font-semibold text-foreground">
                        {new Date(searchResult.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Certificate Preview */}
                <div className="bg-card rounded-2xl shadow-card border border-border p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Certificate Preview</h3>
                  <div className="certificate-preview-container bg-muted/30 rounded-xl p-4 sm:p-8">
                    <div className="certificate-preview">
                      <CertificateTemplate data={searchResult} design={design} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentVerify;