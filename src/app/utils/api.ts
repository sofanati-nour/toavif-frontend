"use client";

import axios from "axios";
import { ConversionResult } from "../components/ResultsView";

// You would typically set this in your environment variables
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://toavif-api.fly.dev";

/**
 * Uploads images to the API for conversion to AVIF format
 */
export async function convertToAvif(
  files: File[],
  quality: number,
  effort: number
): Promise<ConversionResult[]> {
  try {
    const formData = new FormData();

    // Append each file to the form data
    files.forEach((file) => {
      formData.append("images", file);
    });

    // Append quality and effort parameters
    formData.append("quality", quality.toString());
    formData.append("effort", effort.toString());

    // Make the API request
    const response = await axios.post(`${API_BASE_URL}/api/convert`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data.success) {
      return response.data.results;
    } else {
      throw new Error(response.data.error || "Failed to convert images");
    }
  } catch (error) {
    console.error("Error converting images:", error);
    throw error;
  }
}

/**
 * Gets the download URL for a converted image
 */
export function getDownloadUrl(filename: string): string {
  return `${API_BASE_URL}/api/download/${filename}`;
}
