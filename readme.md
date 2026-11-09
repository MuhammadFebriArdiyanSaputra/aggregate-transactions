# Aggregate Transactions

Fungsi TypeScript untuk menghitung total transaksi per pengguna, lalu mengurutkannya dari total terbesar. Jika total sama, pengguna diurutkan berdasarkan `userId` terkecil.

## Data Masukan

```typescript
const transactions: Transaction[] = [
  { id: 1, userId: 101, amount: 100000 },
  { id: 2, userId: 102, amount: 200000 },
  { id: 3, userId: 101, amount: 150000 },
  { id: 4, userId: 103, amount: 300000 },
  { id: 5, userId: 102, amount: 50000 }
];
```

## Cara Kerja

Fungsi `aggregateTransactions` bekerja dalam tiga tahap:

1. **Menjumlahkan per pengguna (`reduce`).**
   Seluruh transaksi ditelusuri satu per satu, lalu `amount` dijumlahkan ke dalam sebuah objek dengan `userId` sebagai key. Hasil tahap ini:
   `{ 101: 250000, 102: 250000, 103: 300000 }`

2. **Mengubah menjadi array (`Object.entries` dan `map`).**
   Objek diubah menjadi array berisi `{ userId, total }`. Nilai `userId` dikonversi kembali ke tipe angka dengan `Number()` karena key objek selalu bertipe string.

3. **Mengurutkan (`sort`).**
   Array diurutkan dari `total` terbesar ke terkecil dengan `b.total - a.total`. Jika dua pengguna memiliki total yang sama, pembanding kedua `a.userId - b.userId` mengurutkan berdasarkan `userId` terkecil, sehingga urutan hasil selalu pasti.

## Struktur Tipe Data

| Tipe | Properti | Keterangan |
|------|----------|------------|
| `Transaction` | `id`, `userId`, `amount` | Satu data transaksi |
| `UserTotal` | `userId`, `total` | Hasil total per pengguna |

## Kompleksitas

O(n + k log k), dengan n adalah jumlah transaksi dan k adalah jumlah pengguna unik.

## Hasil

```
[
  { userId: 103, total: 300000 },
  { userId: 101, total: 250000 },
  { userId: 102, total: 250000 }
]
```

![Hasil eksekusi](hasil.png)

## Penjelasan Hasil

- Pengguna **103** berada di urutan pertama dengan total 300000 (satu transaksi).
- Pengguna **101** memiliki total 250000 (100000 + 150000).
- Pengguna **102** juga memiliki total 250000 (200000 + 50000). Karena totalnya sama dengan 101, urutannya ditentukan oleh `userId`, sehingga 101 tampil lebih dulu.