import React, { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import DebugInfo from './DebugInfo';
const AnimatedBackground = lazy(() => import('./3D/AnimatedBackground'));

// Main layout component that wraps all pages
const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <Suspense fallback={null}>
        <AnimatedBackground className="absolute inset-0 -z-10" />
      </Suspense>
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <DebugInfo />
    </div>
  );
};

export default Layout;
