'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => router.push('/int/en-gb'), [router]);

  return <>Redirecting to international store...</>;
}
