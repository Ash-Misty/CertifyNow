import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CertificateData, CertificateDesign } from '@/types/certificate';

// Mock data
const mockCertificates: CertificateData[] = [
  {
    id: '1',
    studentName: 'John Smith',
    certificateId: 'CERT-2024-001',
    email: 'john.smith@email.com',
    domain: 'Web Development',
    grade: 'A+',
    startDate: '2024-01-15',
    endDate: '2024-03-15',
    status: 'allocated',
    createdAt: '2024-01-10',
  },
  {
    id: '2',
    studentName: 'Sarah Johnson',
    certificateId: 'CERT-2024-002',
    email: 'sarah.j@email.com',
    domain: 'Data Science',
    grade: 'A',
    startDate: '2024-02-01',
    endDate: '2024-04-01',
    status: 'verified',
    createdAt: '2024-01-25',
  },
  {
    id: '3',
    studentName: 'Michael Chen',
    certificateId: 'CERT-2024-003',
    email: 'michael.chen@email.com',
    domain: 'Machine Learning',
    grade: 'B+',
    startDate: '2024-02-15',
    endDate: '2024-05-15',
    status: 'pending',
    createdAt: '2024-02-10',
  },
  {
    id: '4',
    studentName: 'Emily Davis',
    certificateId: 'CERT-2024-004',
    email: 'emily.d@email.com',
    domain: 'UI/UX Design',
    grade: 'A',
    startDate: '2024-03-01',
    endDate: '2024-05-30',
    status: 'allocated',
    createdAt: '2024-02-28',
  },
  {
    id: '5',
    studentName: 'David Wilson',
    certificateId: 'CERT-2024-005',
    email: 'david.w@email.com',
    domain: 'Cloud Computing',
    grade: 'A-',
    startDate: '2024-03-10',
    endDate: '2024-06-10',
    status: 'pending',
    createdAt: '2024-03-05',
  },
];

const defaultDesign: CertificateDesign = {
  title: 'Certificate of Completion',
  description: 'This is to certify that the above named student has successfully completed the program',
  fontFamily: 'Playfair Display',
  logoUrl: null,
  signatureUrl: null,
  organizationName: 'Tech Academy',
};

interface CertificateContextType {
  certificates: CertificateData[];
  design: CertificateDesign;
  addCertificates: (data: CertificateData[]) => void;
  updateCertificateStatus: (id: string, status: CertificateData['status']) => void;
  updateDesign: (design: Partial<CertificateDesign>) => void;
  verifyCertificate: (certificateId: string) => CertificateData | null;
  stats: {
    total: number;
    allocated: number;
    verified: number;
    pending: number;
  };
}

const CertificateContext = createContext<CertificateContextType | undefined>(undefined);

export const CertificateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [certificates, setCertificates] = useState<CertificateData[]>(mockCertificates);
  const [design, setDesign] = useState<CertificateDesign>(defaultDesign);

  const addCertificates = (data: CertificateData[]) => {
    setCertificates(prev => [...prev, ...data]);
  };

  const updateCertificateStatus = (id: string, status: CertificateData['status']) => {
    setCertificates(prev =>
      prev.map(cert => (cert.id === id ? { ...cert, status } : cert))
    );
  };

  const updateDesign = (newDesign: Partial<CertificateDesign>) => {
    setDesign(prev => ({ ...prev, ...newDesign }));
  };

  const verifyCertificate = (certificateId: string): CertificateData | null => {
    return certificates.find(cert => cert.certificateId === certificateId) || null;
  };

  const stats = {
    total: certificates.length,
    allocated: certificates.filter(c => c.status === 'allocated').length,
    verified: certificates.filter(c => c.status === 'verified').length,
    pending: certificates.filter(c => c.status === 'pending').length,
  };

  return (
    <CertificateContext.Provider
      value={{
        certificates,
        design,
        addCertificates,
        updateCertificateStatus,
        updateDesign,
        verifyCertificate,
        stats,
      }}
    >
      {children}
    </CertificateContext.Provider>
  );
};

export const useCertificates = () => {
  const context = useContext(CertificateContext);
  if (!context) {
    throw new Error('useCertificates must be used within a CertificateProvider');
  }
  return context;
};