import React from 'react';
import { Send, CheckCircle, Clock, XCircle } from 'lucide-react';
import { DataTable } from '@/components/common/DataTable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCertificates } from '@/context/CertificateContext';
import { useToast } from '@/hooks/use-toast';
import { CertificateData } from '@/types/certificate';

const AllocateCertificates: React.FC = () => {
  const { certificates, updateCertificateStatus } = useCertificates();
  const { toast } = useToast();

  const handleAllocate = (id: string) => {
    updateCertificateStatus(id, 'allocated');
    toast({
      title: 'Certificate Allocated',
      description: 'The certificate has been allocated successfully.',
    });
  };

  const handleRevoke = (id: string) => {
    updateCertificateStatus(id, 'pending');
    toast({
      title: 'Allocation Revoked',
      description: 'The certificate allocation has been revoked.',
    });
  };

  const columns = [
    {
      key: 'studentName',
      header: 'Student Name',
      render: (item: CertificateData) => (
        <div>
          <span className="font-medium text-foreground">{item.studentName}</span>
          <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">{item.email}</p>
        </div>
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
      key: 'domain',
      header: 'Domain',
      className: 'hidden md:table-cell',
    },
    {
      key: 'grade',
      header: 'Grade',
      render: (item: CertificateData) => (
        <span className="font-semibold text-accent">{item.grade}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: CertificateData) => {
        const config = {
          pending: {
            icon: Clock,
            label: 'Pending',
            className: 'bg-warning/10 text-warning border-warning/30',
          },
          allocated: {
            icon: CheckCircle,
            label: 'Allocated',
            className: 'bg-success/10 text-success border-success/30',
          },
          verified: {
            icon: CheckCircle,
            label: 'Verified',
            className: 'bg-accent/10 text-accent border-accent/30',
          },
        };
        const { icon: Icon, label, className } = config[item.status];
        return (
          <Badge className={className} variant="outline">
            <Icon className="w-3 h-3 mr-1" />
            {label}
          </Badge>
        );
      },
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (item: CertificateData) => (
        <div className="flex items-center gap-2">
          {item.status === 'pending' ? (
            <Button
              size="sm"
              variant="success"
              onClick={() => handleAllocate(item.id)}
            >
              <Send className="w-3 h-3 mr-1" />
              Allocate
            </Button>
          ) : item.status === 'allocated' ? (
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleRevoke(item.id)}
              className="text-destructive hover:bg-destructive/10"
            >
              <XCircle className="w-3 h-3 mr-1" />
              Revoke
            </Button>
          ) : (
            <span className="text-sm text-muted-foreground">Verified</span>
          )}
        </div>
      ),
    },
  ];

  const pendingCount = certificates.filter(c => c.status === 'pending').length;
  const allocatedCount = certificates.filter(c => c.status === 'allocated').length;

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Allocate Certificates</h1>
        <p className="text-muted-foreground mt-1">
          Assign certificates to students who have completed their programs
        </p>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-warning/10 rounded-lg border border-warning/20">
          <Clock className="w-4 h-4 text-warning" />
          <span className="text-sm font-medium text-foreground">{pendingCount} Pending</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-success/10 rounded-lg border border-success/20">
          <CheckCircle className="w-4 h-4 text-success" />
          <span className="text-sm font-medium text-foreground">{allocatedCount} Allocated</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <DataTable
          data={certificates}
          columns={columns}
          searchable
          searchKeys={['studentName', 'certificateId', 'domain', 'email']}
          pageSize={10}
        />
      </div>
    </div>
  );
};

export default AllocateCertificates;