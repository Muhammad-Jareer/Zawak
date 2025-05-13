import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { generateReactHelpers } from "@uploadthing/react";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const { useUploadThing, uploadFiles } = generateReactHelpers();
