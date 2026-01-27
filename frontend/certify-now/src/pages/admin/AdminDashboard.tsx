import React from 'react';
import { FileText, Award, CheckCircle, Clock } from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';
import { useCertificates } from '@/context/CertificateContext';
import { DataTable } from '@/components/common/DataTable';
import { Badge } from '@/components/ui/badge';
import { CertificateData } from '@/types/certificate';

const AdminDashboard: React.FC = () => {
  const { certificates, stats } = useCertificates();

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
      key: 'status',
      header: 'Status',
      render: (item: CertificateData) => {
        const variants: Record<string, 'default' | 'secondary' | 'outline'> = {
          pending: 'secondary',
          allocated: 'default',
          verified: 'outline',
        };
        const colors: Record<string, string> = {
          pending: 'bg-warning/10 text-warning border-warning/30',
          allocated: 'bg-accent/10 text-accent border-accent/30',
          verified: 'bg-success/10 text-success border-success/30',
        };
        return (
          <Badge className={colors[item.status]} variant={variants[item.status]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Badge>
        );
      },
    },
  ];

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your certificate management system
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatCard
          title="Total Certificates"
          value={stats.total}
          icon={FileText}
          variant="primary"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Allocated"
          value={stats.allocated}
          icon={Award}
          variant="accent"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Verified"
          value={stats.verified}
          icon={CheckCircle}
          variant="success"
          trend={{ value: 15, isPositive: true }}
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          icon={Clock}
          variant="warning"
        />
      </div>

      {/* Recent Certificates */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Certificates</h2>
        <DataTable
          data={certificates.slice(0, 10)}
          columns={columns}
          searchable
          searchKeys={['studentName', 'certificateId', 'domain']}
          pageSize={5}
        />
      </div>
    </div>
  );
};

 export default AdminDashboard;
