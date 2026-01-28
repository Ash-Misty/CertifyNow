export interface CertificateData {
  id: string;
  studentName: string;
  certificateId: string;
  email: string;
  domain: string;
  grade: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'allocated' | 'verified';
  createdAt: string;
}

export interface CertificateDesign {
  title: string;
  description: string;
  fontFamily: string;
  logoUrl: string | null;
  signatureUrl: string | null;
  organizationName: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
}

export interface VerificationResult {
  valid: boolean;
  certificate?: CertificateData;
  message: string;
}


export interface CertificateData {
  id: string;
  studentName: string;
  certificateId: string;
  email: string;
  domain: string;
  grade: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'allocated' | 'verified';
  createdAt: string;
  issueDate?: string;
 }

// export interface CertificateDesign {
//   title: string;
//   description: string;
//   fontFamily: string;
//   logoUrl: string | null;
//   signatureUrl: string | null;
//   organizationName: string;
// }

// export interface CertificateSettings {
//   companyName: string;
//   companyAddress: string;
//   authorizedBy: string;
// }

// export interface AdminUser {
//   id: string;
//   email: string;
//   name: string;
// }

// export interface VerificationResult {
//   valid: boolean;
//   certificate?: CertificateData;
//   message: string;
// }
