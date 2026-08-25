'use client';

import Button from '@/components/ui/Button';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { cn } from '@/lib/cn';
import { hasWhatsAppConfigured, getWhatsAppUrl, trackWhatsAppContact } from '@/lib/whatsapp';

export default function WhatsAppCTA({ message = 'Hola, me gustaría consultar sobre renovación de cocinas.', size = 'md', className, label = 'WhatsApp' }) {
  const waUrl = hasWhatsAppConfigured() ? getWhatsAppUrl(message) : null;

  if (!waUrl) {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-soft rounded-xl text-neutral-muted text-sm">
        <WhatsAppIcon className="w-5 h-5" />
        Configurar WhatsApp
      </div>
    );
  }

  return (
    <Button
      href={waUrl}
      onClick={trackWhatsAppContact}
      variant="whatsapp"
      size={size}
      className={cn('inline-flex items-center gap-2', className)}
    >
      <WhatsAppIcon className="w-5 h-5 shrink-0" />
      {label}
    </Button>
  );
}
