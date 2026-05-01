/* ─── Types ─────────────────────────────────────────────────── */
export type Language = "en" | "fr" | "es";
export type MarkerType = "problem" | "info" | "escalation" | "resolution";
export type CallOutcome = "resolved" | "escalated" | "follow-up";

export interface CallMarker {
  id: string;
  timestampSec: number;
  type: MarkerType;
  label: string;
  detail: string;
}

export interface CallTranscriptMessage {
  id: string;
  sender: "agent" | "customer";
  timestampSec: number;
  translations: Record<Language, string>;
}

export interface CallRecord {
  id: string;
  contactName: string;
  contactLocation: string;
  agentName: string;
  agentAvatar: string;
  dateLabel: string;
  durationSec: number;
  topic: string;
  outcome: CallOutcome;
  summary: string;
  actionItems: string[];
  markers: CallMarker[];
  messages: CallTranscriptMessage[];
}

/* ─── Call 1 — Alex K. · Wrong Shoe Size ───────────────────── */
export const CALL_ALEX_K: CallRecord = {
  id: "alex-k",
  contactName: "Alex K.",
  contactLocation: "Los Angeles, CA",
  agentName: "Sarah M.",
  agentAvatar: "https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80",
  dateLabel: "Today, 2:14 PM",
  durationSec: 210,
  topic: "Wrong item",
  outcome: "resolved",
  summary:
    "Customer received size 8 shoes despite ordering size 9 for order #58421. Agent confirmed the warehouse error, arranged an expedited size-9 replacement arriving Thursday, and included a prepaid return label — no pre-return required. Issue fully resolved on call.",
  actionItems: [
    "Ship size 9 replacement with priority delivery by Thursday",
    "Include prepaid return label for size 8 pair",
    "Send order confirmation email within 30 minutes",
  ],
  markers: [
    { id: "m1", timestampSec: 0,   type: "info",       label: "Order opened",         detail: "Customer provides order #58421 and describes size mismatch." },
    { id: "m2", timestampSec: 52,  type: "problem",    label: "Wrong size confirmed",  detail: "Agent confirms warehouse shipped size 8 instead of size 9." },
    { id: "m3", timestampSec: 68,  type: "escalation", label: "Event deadline raised", detail: "Customer needs correct size for a weekend event — urgency escalates." },
    { id: "m4", timestampSec: 136, type: "resolution", label: "Replacement confirmed", detail: "Priority exchange approved; prepaid return label included." },
  ],
  messages: [
    { id: "t1",  sender: "customer", timestampSec: 0,   translations: { en: "Hi, I recently placed an order for shoes in size 9 — order #58421 — but I received size 8 instead. This is quite frustrating.", fr: "Bonjour, j'ai commandé des chaussures en pointure 9 — commande n°58421 — mais j'ai reçu la pointure 8 à la place. C'est très frustrant.", es: "Hola, pedí zapatos talla 9 — pedido #58421 — pero recibí talla 8. Es muy frustrante." } },
    { id: "t2",  sender: "agent",    timestampSec: 18,  translations: { en: "I'm so sorry to hear that! Let me pull up your order right away. Just a moment please.", fr: "Je suis vraiment désolé d'entendre ça ! Laissez-moi accéder à votre commande immédiatement.", es: "¡Lamento mucho escuchar eso! Déjame consultar tu pedido de inmediato." } },
    { id: "t3",  sender: "agent",    timestampSec: 34,  translations: { en: "I can see your order here. You ordered size 9, but our warehouse shipped size 8 by mistake. I sincerely apologize for this error.", fr: "Je vois votre commande. Vous avez commandé la pointure 9 mais notre entrepôt a expédié la pointure 8 par erreur. Toutes mes excuses.", es: "Veo tu pedido. Pediste talla 9 pero nuestro almacén envió talla 8 por error. Me disculpo sinceramente." } },
    { id: "t4",  sender: "customer", timestampSec: 52,  translations: { en: "Yes, and I needed them for an event this weekend. I really can't show up without the right size.", fr: "Oui, et j'en avais besoin pour un événement ce week-end. Je ne peux vraiment pas y aller sans la bonne pointure.", es: "Sí, los necesitaba para un evento este fin de semana. Realmente no puedo ir sin la talla correcta." } },
    { id: "t5",  sender: "agent",    timestampSec: 68,  translations: { en: "I completely understand the urgency. I'm flagging this as priority and arranging an expedited shipment of size 9 to arrive by Thursday. Would that work?", fr: "Je comprends tout à fait l'urgence. Je marque ceci comme prioritaire et j'organise un envoi accéléré de la pointure 9 pour jeudi.", es: "Entiendo completamente la urgencia. Estoy marcando esto como prioritario y organizando un envío urgente de talla 9 para el jueves." } },
    { id: "t6",  sender: "customer", timestampSec: 88,  translations: { en: "Thursday works. But do I need to send back the wrong pair before you ship the replacement?", fr: "Jeudi convient. Mais dois-je renvoyer la paire incorrecte avant que vous expédiiez le remplacement ?", es: "El jueves está bien. ¿Necesito devolver el par incorrecto antes de que envíen el reemplazo?" } },
    { id: "t7",  sender: "agent",    timestampSec: 104, translations: { en: "No, not at all! We'll ship the correct size immediately and include a prepaid return label for the size 8 pair.", fr: "Non, pas du tout ! Nous expédierons la bonne pointure immédiatement et inclurons une étiquette de retour prépayée pour la pointure 8.", es: "¡No, para nada! Enviaremos la talla correcta de inmediato e incluiremos una etiqueta de devolución prepagada." } },
    { id: "t8",  sender: "customer", timestampSec: 124, translations: { en: "That's great! Much easier. Thank you so much.", fr: "C'est super ! C'est beaucoup plus simple. Merci beaucoup.", es: "¡Genial! Es mucho más fácil. Muchas gracias." } },
    { id: "t9",  sender: "agent",    timestampSec: 136, translations: { en: "Absolutely! I'm creating a priority exchange ticket now. You'll receive a confirmation email with tracking within 30 minutes.", fr: "Absolument ! Je crée un ticket d'échange prioritaire maintenant. Vous recevrez un e-mail de confirmation avec suivi sous 30 minutes.", es: "¡Por supuesto! Estoy creando un ticket de intercambio prioritario ahora. Recibirás confirmación con seguimiento en 30 minutos." } },
    { id: "t10", sender: "customer", timestampSec: 158, translations: { en: "Perfect. I really appreciate how quickly you handled this.", fr: "Parfait. J'apprécie vraiment la rapidité avec laquelle vous avez géré ça.", es: "Perfecto. Realmente aprecio la rapidez con la que manejaste esto." } },
    { id: "t11", sender: "agent",    timestampSec: 172, translations: { en: "Of course — and I apologize again for the inconvenience. Is there anything else I can help you with today?", fr: "Bien sûr — et je m'excuse encore pour la gêne. Y a-t-il autre chose que je puisse faire pour vous ?", es: "Por supuesto — y me disculpo de nuevo por las molestias. ¿Hay algo más en lo que pueda ayudarte?" } },
    { id: "t12", sender: "customer", timestampSec: 188, translations: { en: "No, that's everything. Thanks again!", fr: "Non, c'est tout. Merci encore !", es: "No, eso es todo. ¡Gracias de nuevo!" } },
    { id: "t13", sender: "agent",    timestampSec: 197, translations: { en: "Have a wonderful day and enjoy your event this weekend!", fr: "Passez une excellente journée et profitez de votre événement ce week-end !", es: "¡Que tenga un maravilloso día y disfrute de su evento este fin de semana!" } },
  ],
};

/* ─── Call 2 — Maria Torres · Double Billing ───────────────── */
export const CALL_MARIA_TORRES: CallRecord = {
  id: "maria-torres",
  contactName: "Maria Torres",
  contactLocation: "Miami, FL",
  agentName: "David R.",
  agentAvatar: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80",
  dateLabel: "Yesterday, 11:02 AM",
  durationSec: 255,
  topic: "Billing dispute",
  outcome: "resolved",
  summary:
    "Customer was charged twice ($79.99 each) on the same day for her monthly subscription — the second billing incident in three months. Agent obtained supervisor approval, issued a full $79.99 refund, and applied a $20 courtesy credit. Account flagged for manual billing review for the next 90 days.",
  actionItems: [
    "Process $79.99 refund — 3 to 5 business days",
    "Apply $20 courtesy credit to account",
    "Flag account for manual billing review (90 days)",
  ],
  markers: [
    { id: "m1", timestampSec: 15,  type: "info",       label: "Account verified",        detail: "Identity and subscription details confirmed." },
    { id: "m2", timestampSec: 62,  type: "problem",    label: "Duplicate charge found",  detail: "Two $79.99 charges identified on March 15th — second incident this quarter." },
    { id: "m3", timestampSec: 90,  type: "escalation", label: "Supervisor approval",     detail: "Agent requests manager sign-off for expedited out-of-cycle refund." },
    { id: "m4", timestampSec: 155, type: "resolution", label: "Refund + credit issued",  detail: "$79.99 refund processed and $20 courtesy credit applied on call." },
  ],
  messages: [
    { id: "t1",  sender: "customer", timestampSec: 0,   translations: { en: "Hi, I'm calling about a charge on my account. I was billed twice for my subscription this month — both charges appeared on the same day.", fr: "Bonjour, j'appelle concernant un prélèvement sur mon compte. J'ai été facturée deux fois pour mon abonnement ce mois-ci.", es: "Hola, llamo por un cargo en mi cuenta. Me cobraron dos veces la suscripción este mes." } },
    { id: "t2",  sender: "agent",    timestampSec: 20,  translations: { en: "Thank you for calling, Maria. I'm really sorry to hear about this. Let me pull up your account right away.", fr: "Merci d'appeler, Maria. Je suis vraiment désolé d'apprendre ça. Laissez-moi accéder à votre compte.", es: "Gracias por llamar, Maria. Lamento mucho escuchar esto. Déjame acceder a tu cuenta ahora mismo." } },
    { id: "t3",  sender: "agent",    timestampSec: 38,  translations: { en: "I can see two charges of $79.99 on March 15th. You're absolutely right — this is a duplicate charge. I sincerely apologize.", fr: "Je vois deux prélèvements de 79,99 $ le 15 mars. Vous avez absolument raison — c'est un double prélèvement. Je m'en excuse sincèrement.", es: "Veo dos cargos de $79.99 el 15 de marzo. Tiene razón — es un cargo duplicado. Me disculpo sinceramente." } },
    { id: "t4",  sender: "customer", timestampSec: 62,  translations: { en: "Yes, and this is the second time this has happened. Last time it took two weeks to get resolved. I need this fixed today.", fr: "Oui, et c'est la deuxième fois que ça arrive. La dernière fois, il a fallu deux semaines pour résoudre le problème. J'ai besoin que ce soit réglé aujourd'hui.", es: "Sí, y esta es la segunda vez que ocurre. La última vez tardaron dos semanas. Necesito que se resuelva hoy." } },
    { id: "t5",  sender: "agent",    timestampSec: 82,  translations: { en: "Completely understandable, especially given the history. I want to make this right quickly. I'll need supervisor approval for an immediate refund — can you hold for just one minute?", fr: "Tout à fait compréhensible, surtout vu l'historique. Je veux régler ça rapidement. J'ai besoin de l'approbation de mon supérieur pour un remboursement immédiat.", es: "Completamente comprensible, especialmente dado el historial. Quiero solucionar esto rápidamente. Necesito aprobación del supervisor para un reembolso inmediato." } },
    { id: "t6",  sender: "customer", timestampSec: 105, translations: { en: "Sure, I'll hold.", fr: "D'accord, je reste en ligne.", es: "Claro, esperaré." } },
    { id: "t7",  sender: "agent",    timestampSec: 125, translations: { en: "Thank you for your patience, Maria. I have supervisor approval. I'm processing the full $79.99 refund right now.", fr: "Merci pour votre patience, Maria. J'ai l'approbation du superviseur. Je traite le remboursement intégral de 79,99 $ maintenant.", es: "Gracias por su paciencia, Maria. Tengo aprobación del supervisor. Estoy procesando el reembolso completo de $79.99 ahora mismo." } },
    { id: "t8",  sender: "agent",    timestampSec: 148, translations: { en: "I'm also adding a $20 credit to your account for the inconvenience. Your refund should appear within 3 to 5 business days.", fr: "J'ajoute également un crédit de 20 $ sur votre compte pour le désagrément. Votre remboursement devrait apparaître sous 3 à 5 jours ouvrables.", es: "También estoy agregando un crédito de $20 en su cuenta por las molestias. Su reembolso debería aparecer en 3 a 5 días hábiles." } },
    { id: "t9",  sender: "customer", timestampSec: 173, translations: { en: "That's appreciated. Is there anything I should do to prevent this from happening again?", fr: "C'est apprécié. Y a-t-il quelque chose que je devrais faire pour éviter que cela se reproduise ?", es: "Se lo agradezco. ¿Hay algo que pueda hacer para evitar que esto vuelva a ocurrir?" } },
    { id: "t10", sender: "agent",    timestampSec: 190, translations: { en: "Absolutely — I've flagged your account for manual review before any billing occurs for the next 90 days. Our team will verify before any charge goes through.", fr: "Absolument — j'ai signalé votre compte pour un examen manuel avant toute facturation pendant les 90 prochains jours.", es: "Absolutamente — he marcado su cuenta para revisión manual antes de cualquier facturación durante los próximos 90 días." } },
    { id: "t11", sender: "customer", timestampSec: 215, translations: { en: "That's reassuring. Thank you for taking care of this so quickly.", fr: "C'est rassurant. Merci de vous en être occupé si rapidement.", es: "Es reconfortante. Gracias por encargarse de esto tan rápidamente." } },
    { id: "t12", sender: "agent",    timestampSec: 228, translations: { en: "Of course! I've sent a confirmation email with the refund details and credit note. Is there anything else I can help with?", fr: "Bien sûr ! J'ai envoyé un e-mail de confirmation avec les détails du remboursement et la note de crédit.", es: "¡Por supuesto! He enviado un correo de confirmación con los detalles del reembolso y la nota de crédito." } },
    { id: "t13", sender: "customer", timestampSec: 248, translations: { en: "No, that covers it. Have a good day.", fr: "Non, c'est tout. Bonne journée.", es: "No, con eso es suficiente. Que tenga buen día." } },
  ],
};

/* ─── Call 3 — James Chen · Return Not Processed ───────────── */
export const CALL_JAMES_CHEN: CallRecord = {
  id: "james-chen",
  contactName: "James Chen",
  contactLocation: "Seattle, WA",
  agentName: "David R.",
  agentAvatar: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80",
  dateLabel: "2 days ago, 3:45 PM",
  durationSec: 168,
  topic: "Return missing",
  outcome: "escalated",
  summary:
    "Customer shipped back a jacket 3 weeks ago with confirmed delivery to the warehouse, but the return never appeared in the system. Agent could not locate the item and was unable to issue a refund on the spot. Escalation ticket ESC-4821 created; fulfillment manager to call within 24 hours.",
  actionItems: [
    "Fulfillment manager to call James Chen within 24 hours",
    "Investigate warehouse receipt for tracking 9400111899223450024799",
    "Issue refund manually once item is located — do not wait for system update",
  ],
  markers: [
    { id: "m1", timestampSec: 22,  type: "info",       label: "Tracking confirmed",     detail: "Return tracking 9400111899223450024799 shows delivered to warehouse March 1st." },
    { id: "m2", timestampSec: 55,  type: "problem",    label: "Return not in system",   detail: "Warehouse has no record of the return after 3 weeks despite delivery confirmation." },
    { id: "m3", timestampSec: 98,  type: "escalation", label: "Customer demands supervisor", detail: "Customer insists on speaking with a supervisor after waiting 3 weeks." },
    { id: "m4", timestampSec: 145, type: "info",       label: "Escalation ticket ESC-4821", detail: "Urgent ticket raised; fulfillment manager to follow up within 24 hours." },
  ],
  messages: [
    { id: "t1",  sender: "customer", timestampSec: 0,   translations: { en: "Hi, I shipped back a jacket three weeks ago and I still haven't received my refund. Tracking shows it was delivered to your warehouse on March 1st.", fr: "Bonjour, j'ai renvoyé une veste il y a trois semaines et je n'ai toujours pas reçu mon remboursement. Le suivi montre qu'elle a été livrée à votre entrepôt le 1er mars.", es: "Hola, devolví una chaqueta hace tres semanas y todavía no he recibido mi reembolso. El seguimiento muestra que fue entregada al almacén el 1 de marzo." } },
    { id: "t2",  sender: "agent",    timestampSec: 18,  translations: { en: "I'm sorry to hear that, James. Let me check on the status of your return. Do you have your order number?", fr: "Je suis désolé d'apprendre ça, James. Laissez-moi vérifier l'état de votre retour. Avez-vous votre numéro de commande ?", es: "Lamento escuchar eso, James. Déjame verificar el estado de tu devolución. ¿Tienes tu número de pedido?" } },
    { id: "t3",  sender: "customer", timestampSec: 30,  translations: { en: "Order #74392. Return tracking is 9400111899223450024799.", fr: "Commande n°74392. Le numéro de suivi du retour est le 9400111899223450024799.", es: "Pedido #74392. El número de seguimiento de la devolución es 9400111899223450024799." } },
    { id: "t4",  sender: "agent",    timestampSec: 46,  translations: { en: "Thank you. I'm searching our system... I'm not seeing this return logged in our warehouse records. That's unusual after three weeks.", fr: "Merci. Je recherche dans notre système... Je ne vois pas ce retour enregistré dans notre entrepôt. C'est inhabituel après trois semaines.", es: "Gracias. Estoy buscando en nuestro sistema... No veo este retorno registrado en nuestro almacén. Eso es inusual después de tres semanas." } },
    { id: "t5",  sender: "customer", timestampSec: 68,  translations: { en: "This is unacceptable. I have delivery confirmation right here. Why is this taking so long?", fr: "C'est inacceptable. J'ai la confirmation de livraison ici. Pourquoi ça prend-il autant de temps ?", es: "Esto es inaceptable. Tengo la confirmación de entrega aquí mismo. ¿Por qué está tardando tanto?" } },
    { id: "t6",  sender: "agent",    timestampSec: 82,  translations: { en: "You're absolutely right to be frustrated. I want to escalate this to our fulfillment team immediately so they can investigate what happened to your return.", fr: "Vous avez tout à fait raison d'être frustré. Je veux escalader cela à notre équipe d'exécution immédiatement pour qu'elle enquête.", es: "Tiene toda la razón de estar frustrado. Quiero escalar esto a nuestro equipo de cumplimiento de inmediato para que investiguen." } },
    { id: "t7",  sender: "customer", timestampSec: 98,  translations: { en: "I'd like to speak to a supervisor. I've been waiting three weeks and I want this resolved today.", fr: "Je voudrais parler à un superviseur. J'attends depuis trois semaines et je veux que ce soit résolu aujourd'hui.", es: "Me gustaría hablar con un supervisor. Llevo tres semanas esperando y quiero que esto se resuelva hoy." } },
    { id: "t8",  sender: "agent",    timestampSec: 112, translations: { en: "I understand completely. Let me connect you with my supervisor right now — she has full authority to issue the refund manually if needed.", fr: "Je comprends tout à fait. Laissez-moi vous mettre en contact avec mon superviseur — elle a toute autorité pour émettre le remboursement manuellement si nécessaire.", es: "Lo entiendo completamente. Déjame conectarte con mi supervisora ahora mismo — ella tiene autoridad plena para emitir el reembolso manualmente." } },
    { id: "t9",  sender: "agent",    timestampSec: 128, translations: { en: "While you hold, I'm creating an urgent escalation ticket with all your return tracking details so nothing gets lost.", fr: "Pendant que vous attendez, je crée un ticket d'escalade urgent avec tous les détails de votre retour pour que rien ne se perde.", es: "Mientras espera, estoy creando un ticket de escalada urgente con todos los detalles de su devolución para que nada se pierda." } },
    { id: "t10", sender: "customer", timestampSec: 142, translations: { en: "Please make sure this actually gets resolved this time.", fr: "Assurez-vous que ça se règle vraiment cette fois.", es: "Por favor asegúrese de que esto se resuelva realmente esta vez." } },
    { id: "t11", sender: "agent",    timestampSec: 152, translations: { en: "Escalation ticket ESC-4821 is created. You'll receive a call from our fulfillment manager within 24 hours. My name is David if you need to follow up.", fr: "Le ticket d'escalade ESC-4821 est créé. Vous recevrez un appel de notre responsable exécution sous 24 heures. Mon nom est David si vous avez besoin de faire un suivi.", es: "El ticket de escalada ESC-4821 ha sido creado. Recibirá una llamada de nuestro gerente de cumplimiento en 24 horas. Mi nombre es David si necesita hacer seguimiento." } },
    { id: "t12", sender: "customer", timestampSec: 162, translations: { en: "Fine. Thank you, David.", fr: "Bien. Merci, David.", es: "De acuerdo. Gracias, David." } },
  ],
};

/* ─── Call 4 — Sarah Williams · Order Never Arrived ────────── */
export const CALL_SARAH_WILLIAMS: CallRecord = {
  id: "sarah-williams",
  contactName: "Sarah Williams",
  contactLocation: "Chicago, IL",
  agentName: "Sarah M.",
  agentAvatar: "https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80",
  dateLabel: "3 days ago, 9:28 AM",
  durationSec: 312,
  topic: "Delivery missing",
  outcome: "follow-up",
  summary:
    "Customer's order hasn't arrived 10 days after shipping; tracking stalled in Memphis since April 14th. Order was needed for daughter's birthday on April 23rd. Agent opened a carrier trace request, created complimentary priority replacement order #89215-R estimated April 21st, and committed to a personal follow-up call the next morning.",
  actionItems: [
    "Carrier trace request active — 24–48 hour response window",
    "Priority replacement order #89215-R — estimated delivery April 21st",
    "Agent personal follow-up call to Sarah Williams tomorrow at noon",
    "If original arrives: provide prepaid return label, no penalty",
  ],
  markers: [
    { id: "m1", timestampSec: 48,  type: "info",       label: "Package stalled Memphis",   detail: "Tracking stuck at Memphis distribution center since April 14th — 6 days with no update." },
    { id: "m2", timestampSec: 72,  type: "problem",    label: "Birthday deadline Apr 23",  detail: "Order needed for daughter's birthday — hard deadline creates urgency." },
    { id: "m3", timestampSec: 110, type: "escalation", label: "Carrier trace + replacement", detail: "Agent opens carrier investigation and simultaneously creates complimentary priority replacement." },
    { id: "m4", timestampSec: 248, type: "resolution", label: "Personal follow-up committed", detail: "Agent commits to calling Sarah personally at noon the next day to confirm replacement status." },
  ],
  messages: [
    { id: "t1",  sender: "customer", timestampSec: 0,   translations: { en: "Hello, I placed an order 10 days ago and it still hasn't arrived. The tracking stopped updating 6 days ago and just shows 'in transit'.", fr: "Bonjour, j'ai passé une commande il y a 10 jours et elle n'est toujours pas arrivée. Le suivi n'a plus été mis à jour depuis 6 jours.", es: "Hola, hice un pedido hace 10 días y todavía no ha llegado. El seguimiento dejó de actualizarse hace 6 días." } },
    { id: "t2",  sender: "agent",    timestampSec: 22,  translations: { en: "I'm sorry to hear that, Sarah. Let me look at your order right away. Can I get your order number?", fr: "Je suis désolé d'apprendre ça, Sarah. Laissez-moi consulter votre commande. Puis-je avoir votre numéro de commande ?", es: "Lamento escuchar eso, Sarah. Déjame revisar tu pedido. ¿Puedes darme tu número de pedido?" } },
    { id: "t3",  sender: "customer", timestampSec: 32,  translations: { en: "Yes, it's order #89215.", fr: "Oui, c'est la commande n°89215.", es: "Sí, es el pedido #89215." } },
    { id: "t4",  sender: "agent",    timestampSec: 44,  translations: { en: "I found your order. The tracking shows it's been stuck in transit since April 14th in Memphis. This looks like a distribution center delay.", fr: "J'ai trouvé votre commande. Le suivi montre qu'elle est bloquée en transit depuis le 14 avril à Memphis. Cela ressemble à un retard au centre de distribution.", es: "Encontré tu pedido. El seguimiento muestra que está bloqueado en tránsito desde el 14 de abril en Memphis. Parece un retraso en el centro de distribución." } },
    { id: "t5",  sender: "customer", timestampSec: 64,  translations: { en: "I've never had this happen before. I ordered this specifically for my daughter's birthday on April 23rd.", fr: "Ça ne m'est jamais arrivé. J'ai commandé ça spécifiquement pour l'anniversaire de ma fille le 23 avril.", es: "Nunca me había pasado esto. Pedí esto específicamente para el cumpleaños de mi hija el 23 de abril." } },
    { id: "t6",  sender: "agent",    timestampSec: 82,  translations: { en: "I completely understand the urgency. I'm opening an investigation with the carrier right now. Given the birthday deadline, I also want to prepare a complimentary replacement order.", fr: "Je comprends tout à fait l'urgence. J'ouvre une enquête avec le transporteur maintenant. Étant donné la date d'anniversaire, je veux aussi préparer une commande de remplacement gratuite.", es: "Entiendo completamente la urgencia. Estoy abriendo una investigación con el transportista ahora. Dado el plazo del cumpleaños, también quiero preparar un pedido de reemplazo gratuito." } },
    { id: "t7",  sender: "agent",    timestampSec: 108, translations: { en: "The carrier trace request has been submitted. Given the birthday deadline, I'm creating a complimentary priority replacement order right now. Estimated delivery April 21st.", fr: "La demande de traçage du transporteur a été soumise. Étant donné la date d'anniversaire, je crée maintenant une commande de remplacement prioritaire gratuite. Livraison estimée le 21 avril.", es: "La solicitud de rastreo del transportista ha sido enviada. Dado el plazo del cumpleaños, estoy creando un pedido de reemplazo prioritario gratuito ahora. Entrega estimada el 21 de abril." } },
    { id: "t8",  sender: "customer", timestampSec: 132, translations: { en: "Will I be charged for the replacement?", fr: "Serai-je facturée pour le remplacement ?", es: "¿Me cobrarán por el reemplazo?" } },
    { id: "t9",  sender: "agent",    timestampSec: 142, translations: { en: "Absolutely not — the replacement is completely complimentary with priority shipping at no charge to you.", fr: "Absolument pas — le remplacement est totalement gratuit avec expédition prioritaire sans frais pour vous.", es: "En absoluto — el reemplazo es completamente gratuito con envío prioritario sin costo para usted." } },
    { id: "t10", sender: "customer", timestampSec: 160, translations: { en: "That's great. But what if both packages end up arriving?", fr: "C'est super. Mais que se passe-t-il si les deux colis arrivent finalement ?", es: "Excelente. Pero ¿qué pasa si ambos paquetes terminan llegando?" } },
    { id: "t11", sender: "agent",    timestampSec: 172, translations: { en: "No problem at all — if the original arrives after the replacement, you can keep both or return one with a prepaid label. No pressure either way.", fr: "Aucun problème — si l'original arrive après le remplacement, vous pouvez garder les deux ou retourner l'un avec une étiquette prépayée. Pas de pression.", es: "No hay problema — si el original llega después del reemplazo, puede quedarse con ambos o devolver uno con etiqueta prepagada. Sin presión." } },
    { id: "t12", sender: "customer", timestampSec: 192, translations: { en: "That's very generous. I really appreciate that.", fr: "C'est très généreux. Je l'apprécie vraiment.", es: "Es muy generoso. Realmente lo aprecio." } },
    { id: "t13", sender: "agent",    timestampSec: 202, translations: { en: "Replacement order #89215-R has been created and confirmed. A confirmation email is on its way to you now.", fr: "La commande de remplacement n°89215-R a été créée et confirmée. Un e-mail de confirmation vous est envoyé maintenant.", es: "El pedido de reemplazo #89215-R ha sido creado y confirmado. Un correo de confirmación está en camino ahora." } },
    { id: "t14", sender: "customer", timestampSec: 222, translations: { en: "I got it. The estimated delivery says April 21st — that's cutting it close for the 23rd.", fr: "Je l'ai reçu. La livraison estimée indique le 21 avril — c'est juste pour le 23.", es: "Lo recibí. La entrega estimada dice el 21 de abril — eso es bastante ajustado para el 23." } },
    { id: "t15", sender: "agent",    timestampSec: 236, translations: { en: "I hear you. I'm flagging this to our priority dispatch team to push it through the first morning delivery window on the 21st.", fr: "Je vous comprends. Je le signale à notre équipe de dispatch prioritaire pour le passer par la première fenêtre de livraison matinale du 21.", es: "Lo entiendo. Estoy marcando esto para nuestro equipo de despacho prioritario para enviarlo por la primera ventana de entrega matutina del día 21." } },
    { id: "t16", sender: "customer", timestampSec: 258, translations: { en: "Thank you so much. I feel much better about this now.", fr: "Merci beaucoup. Je me sens beaucoup mieux à ce sujet maintenant.", es: "Muchas gracias. Ahora me siento mucho mejor al respecto." } },
    { id: "t17", sender: "agent",    timestampSec: 268, translations: { en: "I'll personally follow up with you tomorrow at noon to confirm the replacement is on schedule. Is this the best number to reach you?", fr: "Je vous rappellerai personnellement demain à midi pour confirmer que le remplacement est dans les délais. Est-ce le meilleur numéro pour vous joindre ?", es: "Le haré un seguimiento personal mañana al mediodía para confirmar que el reemplazo está en camino. ¿Es este el mejor número para contactarla?" } },
    { id: "t18", sender: "customer", timestampSec: 286, translations: { en: "Yes, this is my mobile.", fr: "Oui, c'est mon portable.", es: "Sí, este es mi móvil." } },
    { id: "t19", sender: "agent",    timestampSec: 294, translations: { en: "Perfect — I'll call you tomorrow. Have a wonderful evening, Sarah.", fr: "Parfait — je vous appellerai demain. Bonne soirée, Sarah.", es: "Perfecto — la llamaré mañana. Que tenga una maravillosa noche, Sarah." } },
    { id: "t20", sender: "customer", timestampSec: 306, translations: { en: "You too, thank you so much!", fr: "Vous aussi, merci beaucoup !", es: "¡Usted también, muchas gracias!" } },
  ],
};

/* ─── Registry ──────────────────────────────────────────────── */
export const ALL_CALLS: CallRecord[] = [
  CALL_ALEX_K,
  CALL_MARIA_TORRES,
  CALL_JAMES_CHEN,
  CALL_SARAH_WILLIAMS,
];

export const CALL_BY_ID: Record<string, CallRecord> = Object.fromEntries(
  ALL_CALLS.map((c) => [c.id, c])
);
