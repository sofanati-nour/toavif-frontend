"use client";

import { useState } from "react";

interface QualitySettingsProps {
  quality: number;
  effort: number;
  onQualityChange: (quality: number) => void;
  onEffortChange: (effort: number) => void;
}

export default function QualitySettings({
  quality,
  effort,
  onQualityChange,
  onEffortChange,
}: QualitySettingsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleQualityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuality = parseInt(e.target.value);
    onQualityChange(newQuality);
  };

  const handleEffortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEffort = parseInt(e.target.value);
    onEffortChange(newEffort);
  };

  return (
    <div className="relative w-full max-w-xl">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-sm px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        Settings
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg p-4 z-10 border border-gray-200 dark:border-gray-700">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">Quality: {quality}%</label>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {quality < 50
                  ? "Smaller file size"
                  : quality > 80
                  ? "Higher quality"
                  : "Balanced"}
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={quality}
              onChange={handleQualityChange}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>Smaller</span>
              <span>Better Quality</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">Effort: {effort}</label>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {effort < 3
                  ? "Faster conversion"
                  : effort > 6
                  ? "Better compression"
                  : "Balanced"}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="9"
              step="1"
              value={effort}
              onChange={handleEffortChange}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>Faster</span>
              <span>Better Compression</span>
            </div>
          </div>

          <div className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            <p>Recommended Settings:</p>
            <ul className="mt-1 list-disc list-inside">
              <li>Photos: 75-90% quality, 4-6 effort</li>
              <li>Graphics/UI: 80-95% quality, 6-8 effort</li>
              <li>Web Optimization: 60-75% quality, 3-5 effort</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
