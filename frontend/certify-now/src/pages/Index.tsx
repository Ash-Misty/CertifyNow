import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Shield, CheckCircle, ArrowRight, Users, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6 animate-fade-in">
              <Shield className="w-4 h-4" />
              Secure & Trusted Verification
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-slide-up">
              Certificate Verification
              <span className="block mt-2 gradient-primary bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Instantly verify certificates with our secure platform. Designed for institutions,
              trusted by students worldwide.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/verify">
                <Button size="xl" variant="gradient" className="w-full sm:w-auto">
                  Verify Certificate
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/admin/login">
                <Button size="xl" variant="outline" className="w-full sm:w-auto">
                  Admin Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Choose CertVerify?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform provides a seamless experience for managing and verifying certificates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Shield,
                title: 'Secure Verification',
                description: 'Every certificate is verified against our secure database with encrypted certificate IDs.',
              },
              {
                icon: FileCheck,
                title: 'Easy Management',
                description: 'Upload bulk certificates, customize designs, and manage allocations from one dashboard.',
              },
              {
                icon: Users,
                title: 'Instant Access',
                description: 'Students can verify and download their certificates anytime, anywhere.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative bg-card rounded-2xl p-8 shadow-soft border border-border/50 hover:shadow-card transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-xl gradient-accent mb-6 transition-transform group-hover:scale-110">
                  <feature.icon className="w-7 h-7 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl gradient-primary p-8 sm:p-12 lg:p-16">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <Award className="w-16 h-16 text-primary-foreground/80 mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8">
                Join institutions that trust CertVerify for their certificate management needs.
              </p>
              <Link to="/admin/register">
                <Button size="xl" className="bg-white text-primary hover:bg-white/90">
                  Create Admin Account
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg gradient-primary">
                <Award className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-sm font-semibold text-foreground">CertVerify</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 CertVerify. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;