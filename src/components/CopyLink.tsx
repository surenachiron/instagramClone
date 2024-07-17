'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';

import Button from './Button';

const CopyLink = ({ text = 'Copy', customPath, classes }: { text?: string; customPath?: string; classes?: string }) => {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);

  const copyLinkFun = async () => {
    try {
      const link = 'https://instagram-clone-alpha-one.vercel.app' + (customPath ? customPath : pathname);
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      console.log('');
    }
  };

  return (
    <Button onClick={copyLinkFun} classes={`py-1 px-2 rounded-lg block ${classes}`} direction="row" justify="start">
      {copied ? <span className="text-green-500">Link copied.</span> : text}
    </Button>
  );
};

export default CopyLink;
