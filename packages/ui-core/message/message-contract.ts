export interface MessageContract { variant?: 'incoming'|'outgoing'|'system'; avatar?: string; name?: string; timestamp?: string; body?: unknown; status?: 'sent'|'delivered'|'read'|'error'; }
