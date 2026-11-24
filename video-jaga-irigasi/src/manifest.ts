export type Line = { who: 'ian' | 'sari' | 'pak'; text: string; src: string; duration: number };
export const lines: Line[] = [
  { who: 'ian', text: "Hai teman-teman! Ini irigasi Riam Kanan.", src: 'audio/line0.mp3', duration: 3.864 },
  { who: 'sari', text: "Wah, airnya bening dan segar sekali!", src: 'audio/line1.mp3', duration: 3.648 },
  { who: 'pak', text: "Betul. Air irigasi ini mengairi sawah kita.", src: 'audio/line2.mp3', duration: 4.272 },
  { who: 'ian', text: "Eh, lihat! Ada yang mau membuang sampah di irigasi!", src: 'audio/line3.mp3', duration: 4.8 },
  { who: 'sari', text: "Jangan! Buang sampah di tempatnya!", src: 'audio/line4.mp3', duration: 3.168 },
  { who: 'pak', text: "Kalau irigasi kotor, air sawah ikut kotor.", src: 'audio/line5.mp3', duration: 4.272 },
  { who: 'ian', text: "Ayo kita jaga kebersihan irigasi Riam Kanan bersama-sama!", src: 'audio/line6.mp3', duration: 4.584 },
  { who: 'sari', text: "Irigasi bersih, panen kita selamat!", src: 'audio/line7.mp3', duration: 3.528 },
  { who: 'pak', text: "Jangan buang sampah di irigasi Riam Kanan!", src: 'audio/line8.mp3', duration: 3.504 },
];
