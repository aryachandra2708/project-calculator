// ==========================================================
// Nama  : Arya Chandra Wibowo Mukti
// NIM   : 250202099
// Kelas : 2D
// Modul 5: Praktikum Pemrograman Web Dasar (JavaScript Dasar)
// Logic Modifikasi Mini Project Kalkulator Interaktif
// ==========================================================

// 1. Inisialisasi Elemen DOM Dasar (Sesuai Modul)
const angkaA = document.getElementById("angka-a");
const angkaB = document.getElementById("angka-b");
const tombolTambah = document.getElementById("tombol-tambah");
const tombolKurang = document.getElementById("tombol-kurang");
const tombolKali = document.getElementById("tombol-kali");
const tombolBagi = document.getElementById("tombol-bagi");
const tombolHapus = document.getElementById("tombol-hapus");
const hasil = document.getElementById("hasil");
const statistik = document.getElementById("statistik");
const sifatHasil = document.getElementById("sifat-hasil");
const panduan = document.getElementById("panduan");
const tombolPanduan = document.getElementById("tombol-panduan");
const infoPembuat = document.getElementById("info-pembuat");

// 2. Inisialisasi Elemen Fitur Tambahan (Modifikasi)
const tombolModulus = document.getElementById("tombol-modulus");
const tombolPangkat = document.getElementById("tombol-pangkat");
const tombolTukar = document.getElementById("tombol-tukar");
const tombolAcak = document.getElementById("tombol-acak");
const analisisBilangan = document.getElementById("analisis-bilangan");
const daftarRiwayat = document.getElementById("daftar-riwayat");
const tombolBersihkanRiwayat = document.getElementById("tombol-bersihkan-riwayat");

// 3. State Aplikasi
let jumlahPerhitungan = 0;
let panduanTampil = false;
const riwayatPerhitungan = [];

// 4. Fungsi Utama Perhitungan
function hitung(operasi) {
  // Validasi input jika kosong
  if (angkaA.value === "" || angkaB.value === "") {
    hasil.textContent = "Masukkan kedua angka terlebih dahulu.";
    sifatHasil.textContent = "Sifat hasil: -";
    if (analisisBilangan) analisisBilangan.textContent = "Tipe: -";
    return;
  }

  // Mengubah input menjadi tipe Number
  const a = Number(angkaA.value);
  const b = Number(angkaB.value);

  // Validasi jika bukan angka valid
  if (isNaN(a) || isNaN(b)) {
    hasil.textContent = "Input harus berupa angka valid.";
    sifatHasil.textContent = "Sifat hasil: -";
    if (analisisBilangan) analisisBilangan.textContent = "Tipe: -";
    return;
  }

  let hasilHitung;
  let simbolOperasi = "";

  // Percabangan operasi hitung (Modifikasi: Ditambah modulus dan pangkat)
  if (operasi === "tambah") {
    hasilHitung = a + b;
    simbolOperasi = "+";
  } else if (operasi === "kurang") {
    hasilHitung = a - b;
    simbolOperasi = "-";
  } else if (operasi === "kali") {
    hasilHitung = a * b;
    simbolOperasi = "×";
  } else if (operasi === "bagi") {
    if (b === 0) {
      hasil.textContent = "Tidak bisa dibagi dengan nol.";
      sifatHasil.textContent = "Sifat hasil: -";
      if (analisisBilangan) analisisBilangan.textContent = "Tipe: -";
      return;
    }
    hasilHitung = a / b;
    simbolOperasi = "÷";
  } else if (operasi === "modulus") {
    if (b === 0) {
      hasil.textContent = "Modulus nol tidak terdefinisi.";
      sifatHasil.textContent = "Sifat hasil: -";
      if (analisisBilangan) analisisBilangan.textContent = "Tipe: -";
      return;
    }
    hasilHitung = a % b;
    simbolOperasi = "%";
  } else if (operasi === "pangkat") {
    hasilHitung = Math.pow(a, b);
    simbolOperasi = "^";
  }

  // Pembulatan rapi jika desimal panjang (maksimal 4 desimal)
  if (!Number.isInteger(hasilHitung)) {
    hasilHitung = Number(hasilHitung.toFixed(4));
  }

  // Menampilkan hasil pada halaman
  hasil.textContent = "Hasil: " + hasilHitung;

  // Menambah counter statistik
  jumlahPerhitungan++;
  statistik.textContent = "Jumlah perhitungan: " + jumlahPerhitungan;

  // Memeriksa sifat hasil (Positif / Negatif / Nol)
  if (hasilHitung > 0) {
    sifatHasil.textContent = "Sifat hasil: Positif";
  } else if (hasilHitung < 0) {
    sifatHasil.textContent = "Sifat hasil: Negatif";
  } else {
    sifatHasil.textContent = "Sifat hasil: Nol";
  }

  // Modifikasi: Analisis Tambahan (Ganjil, Genap, Desimal)
  if (analisisBilangan) {
    if (Number.isInteger(hasilHitung)) {
      if (hasilHitung % 2 === 0) {
        analisisBilangan.textContent = "Tipe: Bilangan Bulat (Genap)";
      } else {
        analisisBilangan.textContent = "Tipe: Bilangan Bulat (Ganjil)";
      }
    } else {
      analisisBilangan.textContent = "Tipe: Bilangan Desimal";
    }
  }

  // Modifikasi: Catat ke Riwayat
  catatRiwayat(a, simbolOperasi, b, hasilHitung);
}

// 5. Fungsi Riwayat Perhitungan (Modifikasi Baru)
function catatRiwayat(a, op, b, res) {
  const item = `${a} ${op} ${b} = ${res}`;
  riwayatPerhitungan.unshift(item); // Masukkan ke urutan teratas

  if (daftarRiwayat) {
    // Bersihkan placeholder jika ini perhitungan pertama
    if (riwayatPerhitungan.length === 1) {
      daftarRiwayat.innerHTML = "";
    }

    const li = document.createElement("li");
    li.className = "history-item";
    li.innerHTML = `
      <span class="history-expr">${a} ${op} ${b}</span>
      <span class="history-res">= ${res}</span>
    `;
    daftarRiwayat.prepend(li);
  }
}

// 6. Event Listener Tombol Operasi Utama
tombolTambah.addEventListener("click", function () {
  hitung("tambah");
});

tombolKurang.addEventListener("click", function () {
  hitung("kurang");
});

tombolKali.addEventListener("click", function () {
  hitung("kali");
});

tombolBagi.addEventListener("click", function () {
  hitung("bagi");
});

// Event Listener Tombol Operasi Tambahan Modifikasi
if (tombolModulus) {
  tombolModulus.addEventListener("click", function () {
    hitung("modulus");
  });
}

if (tombolPangkat) {
  tombolPangkat.addEventListener("click", function () {
    hitung("pangkat");
  });
}

// 7. Event Listener Tombol Aksi Tambahan
if (tombolTukar) {
  tombolTukar.addEventListener("click", function () {
    const temp = angkaA.value;
    angkaA.value = angkaB.value;
    angkaB.value = temp;
  });
}

if (tombolAcak) {
  tombolAcak.addEventListener("click", function () {
    angkaA.value = Math.floor(Math.random() * 50) + 1;
    angkaB.value = Math.floor(Math.random() * 10) + 1;
  });
}

// 8. Event Listener Tombol Hapus / Reset
tombolHapus.addEventListener("click", function () {
  angkaA.value = "";
  angkaB.value = "";
  hasil.textContent = "Hasil: 0";
  sifatHasil.textContent = "Sifat hasil: -";
  if (analisisBilangan) analisisBilangan.textContent = "Tipe: -";
  angkaA.focus();
});

// 9. Event Listener Tombol Panduan (Tampil / Sembunyi)
tombolPanduan.addEventListener("click", function () {
  if (panduanTampil === false) {
    panduan.style.display = "block";
    tombolPanduan.textContent = "📕 Sembunyikan Panduan";
    panduanTampil = true;
  } else {
    panduan.style.display = "none";
    tombolPanduan.textContent = "📖 Tampilkan Panduan";
    panduanTampil = false;
  }
});

// 10. Event Listener Bersihkan Riwayat
if (tombolBersihkanRiwayat) {
  tombolBersihkanRiwayat.addEventListener("click", function () {
    riwayatPerhitungan.length = 0;
    daftarRiwayat.innerHTML = `<li class="empty-history">Riwayat telah dibersihkan.</li>`;
  });
}

// 11. Shortcut Keyboard (Enter untuk menghitung tambah, Esc untuk reset)
window.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    hitung("tambah");
  } else if (e.key === "Escape") {
    tombolHapus.click();
  }
});

// 12. Informasi Pembuat Dinamis (Modifikasi Identitas Mahasiswa)
infoPembuat.textContent =
  "© 2026 Praktikum Pemrograman Web Dasar | Dibuat oleh Arya Chandra Wibowo Mukti (NIM: 250202099 - Kelas 2D TI PNC)";
