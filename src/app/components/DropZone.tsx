"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface DropZoneProps {
  onFilesDrop: (files: File[]) => void;
  isUploading: boolean;
}

export default function DropZone({ onFilesDrop, isUploading }: DropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  // GSAP animation setup
  useGSAP(() => {
    gsap.from(".dropzone", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out",
    });
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const filesArray = Array.from(e.dataTransfer.files);
        const imageFiles = filesArray.filter((file) =>
          file.type.startsWith("image/")
        );

        if (imageFiles.length > 0) {
          onFilesDrop(imageFiles);
        }
      }
    },
    [onFilesDrop]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const filesArray = Array.from(e.target.files);
        onFilesDrop(filesArray);
      }
    },
    [onFilesDrop]
  );

  return (
    <div
      className={`dropzone w-full max-w-xl rounded-xl border-2 border-dashed transition-colors duration-300 p-10 text-center cursor-pointer 
        ${
          isDragOver
            ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
            : "border-gray-300 dark:border-gray-700"
        }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() =>
        !isUploading && document.getElementById("fileInput")?.click()
      }
    >
      <input
        type="file"
        id="fileInput"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleFileInputChange}
        disabled={isUploading}
      />

      <div className="flex flex-col items-center justify-center gap-4">
        <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <Image
            src="/upload-icon.svg"
            alt="Upload"
            width={40}
            height={40}
            className="opacity-70 dark:invert"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Drop your images here</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {isUploading
              ? "Uploading..."
              : "Drag & drop your image files or click to browse"}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            Supports: JPG, PNG, WebP, GIF, and more
          </p>
        </div>
      </div>
    </div>
  );
}
