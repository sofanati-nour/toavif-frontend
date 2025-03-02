"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export interface ConversionResult {
  originalName: string;
  convertedName: string;
  originalSize: number;
  convertedSize: number;
  savings: string;
  previewBase64: string;
}

interface ResultsViewProps {
  results: ConversionResult[];
  apiBaseUrl: string;
}

export default function ResultsView({ results, apiBaseUrl }: ResultsViewProps) {
  const resultsRef = useRef<HTMLDivElement>(null);

  // Format bytes to human-readable format
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // GSAP animations
  useGSAP(() => {
    if (resultsRef.current && results.length > 0) {
      gsap.fromTo(
        ".result-card",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    }
  }, [results]);

  // Download handler
  const handleDownload = (filename: string) => {
    window.open(`${apiBaseUrl}/api/download/${filename}`, "_blank");
  };

  if (results.length === 0) {
    return null;
  }

  return (
    <div ref={resultsRef} className="w-full mt-12">
      <h2 className="text-2xl font-bold mb-6">Conversion Results</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {results.map((result, index) => (
          <div
            key={index}
            className="result-card flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative aspect-square bg-gray-200 dark:bg-gray-700">
              {result.previewBase64 && (
                <Image
                  src={result.previewBase64}
                  alt={result.originalName}
                  fill
                  objectFit="contain"
                  className="p-2"
                />
              )}
            </div>

            <div className="p-4 flex-1">
              <h3
                className="font-semibold text-sm mb-2 truncate"
                title={result.originalName}
              >
                {result.originalName}
              </h3>

              <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">
                    Original Size
                  </p>
                  <p className="font-medium">
                    {formatBytes(result.originalSize)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">AVIF Size</p>
                  <p className="font-medium">
                    {formatBytes(result.convertedSize)}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500 dark:text-gray-400">
                    Size Reduction
                  </p>
                  <p className="font-medium text-green-600 dark:text-green-400">
                    {result.savings}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleDownload(result.convertedName)}
                className="w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm transition-colors"
              >
                Download AVIF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
