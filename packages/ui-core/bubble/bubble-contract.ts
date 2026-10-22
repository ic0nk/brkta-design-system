export interface BubbleContract { variant?: 'incoming'|'outgoing'|'system'; children?: unknown; timestamp?: string; status?: 'sent'|'delivered'|'read'|'error'; }
