import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Error boundary to catch frontend crashes
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: any }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "2rem", fontFamily: "sans-serif", color: "#c00" }}>
          <h1>Something went wrong.</h1>
          <p>{String(this.state.error)}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Preload critical assets
const preloadCriticalAssets = () => {
  const criticalImages = [
    '/images/celia-portrait-optimized.webp',
    '/images/logo.png'
  ];

  criticalImages.forEach(imagePath => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = imagePath;
    document.head.appendChild(link);
  });
};

// Preload critical fonts
const preloadFonts = () => {
  const fontFiles = [
    '/fonts/inter-var.woff2'
  ];

  fontFiles.forEach(fontPath => {
    if (fontPath) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.href = fontPath;
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
  });
};

// Redirect certain direct paths to homepage
const directAccessPaths = ["/booking", "/fees", "/faq", "/services", "/client-diversity", "/meet-celia", "/contact"];

if (directAccessPaths.includes(window.location.pathname) && !window.location.search && !window.location.hash) {
  if (!document.referrer || new URL(document.referrer).host !== window.location.host) {
    window.history.replaceState({}, "", "/");
  }
}

// Execute preloading
preloadCriticalAssets();
preloadFonts();

// Render with error boundary
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);