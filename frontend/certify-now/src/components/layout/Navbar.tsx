import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Award, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const isAuthPage = location.pathname.includes('/admin/login') || location.pathname.includes('/admin/register');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl gradient-primary transition-transform group-hover:scale-105">
              <Award className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground hidden sm:block">
              CertVerify
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/verify">
              <Button
                variant={location.pathname === '/verify' ? 'default' : 'ghost'}
                size="sm"
              >
                Verify Certificate
              </Button>
            </Link>

            {!isAuthPage && (
              <>
                <Link to="/admin/login">
                  <Button variant="ghost" size="sm" className="hidden sm:flex">
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/admin/register">
                  <Button variant="outline" size="sm">
                    <UserPlus className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">Register</span>
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};