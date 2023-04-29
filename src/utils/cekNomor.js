export function cekNomor(nomor) {
  if (nomor.length >= 10 && nomor.length <= 12) return true;
  return false;
}
