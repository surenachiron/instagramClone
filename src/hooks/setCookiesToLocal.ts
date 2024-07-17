'use client';

import { useEffect } from 'react';

import { useUtilAction } from '@/store/util';

export default function CookiesToLocal({ namVal, val }: { namVal: string; val: string | undefined }) {
  const { setUsername } = useUtilAction();
  useEffect(() => {
    if (val !== undefined) localStorage.setItem(namVal, val);
  }, []);
  if (val !== undefined) setUsername(val);
  return true;
}
