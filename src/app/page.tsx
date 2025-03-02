"use client";

import { useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import DropZone from "./components/DropZone";
import ResultsView, { ConversionResult } from "./components/ResultsView";
import QualitySettings from "./components/QualitySettings";
import { convertToAvif, API_BASE_URL } from "./utils/api";

export default function Home() {
  const [quality, setQuality] = useState(80);
  const [effort, setEffort] = useState(4); // Default effort of 4 (mid-range)
  const [isUploading, setIsUploading] = useState(false);
  const [results, setResults] = useState<ConversionResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  // GSAP animations
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".hero-title", {
      opacity: 0,
      y: -30,
      duration: 0.8,
      ease: "power3.out",
    })
      .from(
        ".hero-subtitle",
        { opacity: 0, y: -20, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      )
      .from(
        ".hero-description",
        { opacity: 0, y: -10, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      )
      .from(
        ".features",
        { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );
  }, []);

  const handleFilesDrop = async (files: File[]) => {
    try {
      setIsUploading(true);
      setError(null);

      // Process files and send to API
      const conversionResults = await convertToAvif(files, quality, effort);
      setResults(conversionResults);
    } catch (err) {
      console.error("Error processing files:", err);
      setError("Failed to convert images. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleQualityChange = (newQuality: number) => {
    setQuality(newQuality);
  };

  const handleEffortChange = (newEffort: number) => {
    setEffort(newEffort);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="hero-title text-4xl sm:text-5xl font-bold mb-4">
            ToAVIF
            <span className="text-blue-600 dark:text-blue-400"> Converter</span>
          </h1>
          <p className="hero-subtitle text-xl sm:text-2xl font-medium mb-4">
            Convert your images to the modern AVIF format
          </p>
          <p className="hero-description text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            AVIF offers superior compression and quality compared to JPEG and
            WebP. Reduce your image file sizes while maintaining excellent
            visual quality.
          </p>
        </header>

        <main className="flex flex-col items-center">
          {/* Settings */}
          <div className="w-full max-w-xl flex justify-end mb-4">
            <QualitySettings
              quality={quality}
              effort={effort}
              onQualityChange={handleQualityChange}
              onEffortChange={handleEffortChange}
            />
          </div>

          {/* Upload Area */}
          <DropZone onFilesDrop={handleFilesDrop} isUploading={isUploading} />

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md">
              {error}
            </div>
          )}

          {/* Loading Indicator */}
          {isUploading && (
            <div className="mt-8 flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-blue-600 dark:border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Converting your images...
              </p>
            </div>
          )}

          {/* Results View */}
          <ResultsView results={results} apiBaseUrl={API_BASE_URL} />

          {/* Features Section */}
          <div className="features mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Smaller File Size</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Reduce image size by up to 50% compared to JPEG and 20% compared
                to WebP.
              </p>
            </div>

            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Better Quality</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Maintain high visual quality even at lower file sizes with
                advanced compression.
              </p>
            </div>

            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Modern Format</h3>
              <p className="text-gray-600 dark:text-gray-400">
                AVIF is supported in Chrome, Firefox, and other modern browsers
                for optimal web performance.
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-24 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} ToAVIF. All rights reserved.</p>
          <p className="mt-2">
            AVIF is an open-source image format developed by the Alliance for
            Open Media.
          </p>
          <div className="mt-6 flex justify-center">
            <a
              href="https://buymeacoffee.com/noursofanati"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors duration-200"
            >
              <Image
                src="/coffee-icon.svg"
                alt="Coffee icon"
                width={20}
                height={20}
                className="mr-2"
              />
              Buy me a coffee
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
