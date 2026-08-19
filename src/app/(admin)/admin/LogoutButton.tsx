'use client';

import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-gray-500 hover:text-gray-700"
    >
      Sair
    </button>
  );
}
