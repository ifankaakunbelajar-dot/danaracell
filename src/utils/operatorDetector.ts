export function detectCellularOperator(phone: string): string | null {
  // Clean phone number: remove spaces, dashes, +62 -> 08
  let clean = phone.replace(/[\s\-]/g, '');
  if (clean.startsWith('+62')) {
    clean = '0' + clean.slice(3);
  } else if (clean.startsWith('62')) {
    clean = '0' + clean.slice(2);
  }

  if (clean.length < 4) return null;
  const prefix4 = clean.substring(0, 4);

  // Telkomsel (SimPATI, KARTU As, Loop, by.U)
  const tsel = ['0811', '0812', '0813', '0821', '0822', '0823', '0852', '0853', '0851'];
  if (tsel.includes(prefix4)) return 'telkomsel';

  // Indosat Ooredoo Hutchison (IM3)
  const isat = ['0814', '0815', '0816', '0855', '0856', '0857', '0858'];
  if (isat.includes(prefix4)) return 'indosat';

  // XL Axiata
  const xl = ['0817', '0818', '0819', '0859', '0877', '0878'];
  if (xl.includes(prefix4)) return 'xl';

  // AXIS
  const axis = ['0831', '0832', '0833', '0838'];
  if (axis.includes(prefix4)) return 'axis';

  // Tri (3)
  const tri = ['0895', '0896', '0897', '0898', '0899'];
  if (tri.includes(prefix4)) return 'tri';

  // Smartfren
  const smart = ['0881', '0882', '0883', '0884', '0885', '0886', '0887', '0888', '0889'];
  if (smart.includes(prefix4)) return 'smartfren';

  return null;
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function sanitizePhone(phone: string): string {
  let cleaned = phone.replace(/[^\d+]/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.substring(1);
  } else if (cleaned.startsWith('+62')) {
    cleaned = '62' + cleaned.substring(3);
  }
  return cleaned;
}
