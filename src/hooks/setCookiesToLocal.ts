'use client';

import { useUtilAction } from '@/store/util';
import { useEffect } from 'react';

export default function CookiesToLocal({ namVal, val }: { namVal: string; val: string | undefined }) {
  const { setUsername } = useUtilAction();
  useEffect(() => {
    if (val !== undefined) localStorage.setItem(namVal, val);
  }, []);
  if (val !== undefined) setUsername(val);
  return true;
}
