export function buildDeletionEmail({ serviceName, contactEmail, userEmail, userName }) {
  const name = serviceName || 'your service';
  const subject = `Data Deletion Request - ${name}`;

  const lines = [
    'To Whom It May Concern,',
    '',
    `I am requesting that you delete all personal data you hold about me in connection with my account or use of ${name}, in accordance with applicable data protection law (including, where applicable, the GDPR right to erasure and the CCPA right to delete).`,
    '',
    'Please confirm in writing once this request has been completed, and let me know if you need anything to verify my identity.',
  ];
  if (userEmail) lines.push('', `My account email: ${userEmail}`);
  lines.push('', 'Thank you,', (userName || '').trim() || '[Your name]');

  const body = lines.join('\n');
  const mailto = `mailto:${encodeURIComponent(contactEmail || '')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return { subject, body, mailto, hasContact: !!contactEmail };
}
