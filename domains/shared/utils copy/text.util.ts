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
  }).format(amount)

  // Tambahkan simbol Rp jika withSymbol true
  return withSymbol ? `Rp. ${formatted}` : formatted
}

// Contoh penggunaan:
// formatToRupiah(10000) // "Rp10.000"
// formatToRupiah(2500000) // "Rp2.500.000"
// formatToRupiah(1500000, false) // "1.500.000"