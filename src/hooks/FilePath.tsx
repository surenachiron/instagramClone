'use client';

const FilePath = (url: string, baseOf: string): string => {
  const startIndex = url.indexOf(baseOf);
  const fileName = url.substring(startIndex + baseOf.length);
  return fileName;
};

export default FilePath;
