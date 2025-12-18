/**
 * Memotong teks dan menambahkan elipsis (...) jika melebihi panjang maksimum
 * @param text - Teks yang akan dipotong
 * @param maxLength - Panjang maksimum teks sebelum dipotong
 * @returns Teks yang sudah dipotong dengan elipsis jika melebihi maxLength
 */

export const truncateEnd = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Memotong teks di tengah dan menambahkan elipsis
 * @param text - Teks yang akan dipotong
 * @param startLength - Jumlah karakter yang ditampilkan di awal teks
 * @param endLength - Jumlah karakter yang ditampilkan di akhir teks
 * @returns Teks yang sudah dipotong di tengah dengan elipsis
 */
export const truncateMiddle = (
  text: string,
  startLength: number,
  endLength: number
): string => {
  if (text.length <= startLength + endLength) return text;
  return `${text.substring(0, startLength)}...${text.substring(text.length - endLength)}`;
};

// Contoh penggunaan:
// truncateText('Ini adalah contoh teks yang panjang', 10) // "Ini adalah..."
// truncateMiddle('0x1234567890abcdef1234567890abcdef', 6, 4) // "0x1234...cdef"

/**
 * Format angka ke dalam format Rupiah
 * @param amount - Jumlah uang yang akan diformat
 * @param withSymbol - Menampilkan simbol Rp (default: true)
 * @returns String yang sudah diformat dalam Rupiah
 */
export const formatToRupiah = (amount: number, withSymbol: boolean = true): string => {
  // Format angka dengan pemisah ribuan
  const formatted = new Intl.NumberFormat('id-ID', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);

  // Tambahkan simbol Rp jika withSymbol true
  return withSymbol ? `Rp. ${formatted}` : formatted;
};

// Contoh penggunaan:
// formatToRupiah(10000) // "Rp10.000"
// formatToRupiah(2500000) // "Rp2.500.000"
// formatToRupiah(1500000, false) // "1.500.000"