import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionUtilsService {
  tanzanianFirstNames = [
    'Juma',
    'Fatuma',
    'Mwanaidi',
    'Saidi',
    'Amina',
    'Rashidi',
    'Zainabu',
    'Hassan',
    'Hadija',
    'Yusuf',
    'Mariam',
    'Idris',
    'Khadija',
    'Ali',
    'Zuhura',
    'Suleiman',
    'Salma',
    'Riziki',
    'Mustafa',
    'Mwanahija',
    'Nuru',
    'Kassim',
    'Leyla',
    'Rashid',
    'Zahra',
    'Khalid',
    'Neema',
    'Hamisi',
    'Aisha',
    'Ismail',
    'Naima',
    'Jabir',
    'Farida',
    'Abdallah',
    'Zulekha',
    'Nassor',
    'Lulu',
    'Ramadhan',
    'Shadia',
    'Musa',
    'Naima',
    'Aziz',
    'Zuwena',
    'Hussein',
    'Maimuna',
    'Rajab',
    'Amina',
    'Khamis',
    'Mwajuma',
    'Mbaraka',
    'Hawa',
    'Abubakar',
    'Subira',
    'Jumanne',
    'Rahma',
    'Rashid',
    'Zakia',
    'Iddi',
    'Jenifa',
    'Yahya',
    'Rehema',
    'Nasibu',
    'Mwanaisha',
    'Omari',
    'Zaina',
    'Mwinyi',
    'Sabrina',
    'Harith',
    'Jihan',
    'Hilali',
    'Najma',
    'Nuru',
    'Dunia',
    'Salum',
    'Lina',
    'Tariq',
    'Zuhura',
    'Rashidi',
    'Lulu',
    'Hakim',
    'Naila',
    'Fahad',
    'Zuwena',
    'Aziza',
    'Haruna',
    'Zainab',
    'Jasiri',
    'Leyla',
    'Rahim',
    'Muna',
    'Yahya',
    'Fatma',
    'Nasir',
    'Salima',
    'Amani',
    'Zahra',
    'Amin',
    'Naima',
    'Simba',
    'Nuru',
    'Tumaini',
    'Nadia',
    'Rafiki',
    'Mwanajuma',
    'Bakari',
    'Jamila',
    'Muhidin',
    'Safiya',
    'Hafidh',
    'Zuleikha',
    'Yusuph',
    'Lulu',
    'Umar',
    'Amina',
    'Jabali',
    'Mwanamisi',
    'Majid',
    'Farida',
    'Saidi',
    'Rahma',
    'Mwana',
    'Amani',
    'Riziki',
    'Kulthum',
    'Hamisi',
    'Zara',
    'Nassor',
    'Amina',
    'Nizar',
    'Nuru',
    'Bashir',
    'Halima',
    'Twahir',
    'Naima',
    'Nashir',
    'Lina',
    'Ameir',
    'Fatma',
    'Rashid',
    'Zaynab',
    'Makame',
    'Najat',
    'Amin',
    'Zainab',
    'Abbas',
    'Saida',
    'Rashidi',
    'Khadija',
    'Rafiq',
    'Salma',
    'Jamil',
    'Mwanahawa',
    'Nassir',
    'Lulu',
    'Mkubwa',
    'Sara',
    'Hashim',
    'Zuwena',
    'Arafat',
    'Maimuna',
    'Rajab',
    'Amina',
    'Abdul',
    'Safiya',
    'Ibrahim',
    'Zahra',
    'Hamza',
    'Leyla',
    'Jamil',
    'Mwajuma',
    'Amiri',
    'Hawa',
    'Mbwana',
    'Rehema',
    'Rashidi',
    'Zainabu',
    'Kassim',
    'Jenifa',
    'Jabir',
    'Rahma',
    'Musa',
    'Zakia',
    'Aziz',
    'Naima',
    'Hussein',
    'Mwanaisha',
    'Rajab',
    'Sabrina',
    'Jumanne',
    'Jihan',
    'Yahya',
    'Najma',
    'Nasibu',
    'Dunia',
    'Omari',
    'Lina',
    'Mwinyi',
    'Zuhura',
    'Harith',
    'Lulu',
    'Hilali',
    'Naila',
    'Salum',
    'Zuwena',
    'Tariq',
    'Zuhura',
    'Rashidi',
    'Zahra',
    'Hakim',
    'Lulu',
    'Fahad',
    'Zuwena',
    'Aziza',
    'Riziki',
    'Zainab',
    'Jasiri',
    'Leyla',
    'Rahim',
    'Muna',
    'Yahya',
    'Fatma',
    'Nasir',
    'Nuru',
    'Amani',
    'Zahra',
    'Amin',
    'Naima',
    'Simba',
    'Nuru',
    'Tumaini',
    'Nadia',
    'Rafiki',
    'Mwanajuma',
    'Bakari',
    'Jamila',
    'Muhidin',
    'Safiya',
    'Hafidh',
    'Zuleikha',
    'Yusuph',
    'Lulu',
    'Umar',
    'Amina',
    'Jabali',
    'Mwanamisi',
    'Majid',
    'Farida',
    'Saidi',
    'Rahma',
    'Mwana',
    'Amani',
    'Riziki',
    'Kulthum',
    'Hamisi',
    'Zara',
    'Nassor',
    'Amina',
    'Nizar',
    'Nuru',
    'Bashir',
    'Halima',
    'Twahir',
    'Naima',
    'Nashir',
    'Lina',
    'Ameir',
    'Fatma',
    'Rashid',
    'Zaynab',
    'Makame',
    'Najat',
    'Amin',
    'Zainab',
    'Abbas',
    'Saida',
    'Rashidi',
    'Khadija',
    'Rafiq',
    'Salma',
    'Jamil',
    'Mwanahawa',
    'Nassir',
    'Lulu',
    'Mkubwa',
    'Sara',
    'Hashim',
    'Zuwena',
    'Arafat',
    'Maimuna',
    'Rajab',
    'Amina',
    'Abdul',
    'Safiya',
    'Ibrahim',
    'Zahra',
    'Hamza',
    'Leyla',
    'Jamil',
    'Mwajuma',
    'Amiri',
    'Hawa',
    'Mbwana',
    'Rehema',
    'Rashidi',
    'Zainabu',
    'Kassim',
    'Jenifa',
    'Jabir',
    'Rahma',
    'Musa',
    'Zakia',
    'Aziz',
    'Naima',
    'Hussein',
    'Mwanaisha',
    'Rajab',
    'Sabrina',
    'Jumanne',
    'Jihan',
    'Yahya',
    'Najma',
    'Nasibu',
    'Dunia',
    'Omari',
    'Lina',
    'Mwinyi',
    'Zuhura',
    'Harith',
    'Lulu',
    'Hilali',
    'Naila',
    'Salum',
    'Zuwena',
    'Tariq',
    'Zuhura',
    'Rashidi',
    'Zahra',
    'Hakim',
    'Lulu',
    'Fahad',
    'Zuwena',
    'Aziza',
    'Riziki',
    'Zainab',
    'Jasiri',
    'Leyla',
    'Rahim',
    'Muna',
    'Yahya',
    'Fatma',
    'Nasir',
    'Nuru',
    'Amani',
    'Zahra',
    'Amin',
    'Naima',
    'Simba',
    'Nuru',
    'Tumaini',
    'Nadia',
    'Rafiki',
    'Mwanajuma',
    'Bakari',
    'Jamila',
    'Muhidin',
    'Safiya',
    'Hafidh',
    'Zuleikha',
    'Yusuph',
    'Lulu',
    'Umar',
    'Amina',
    'Jabali',
    'Mwanamisi',
    'Majid',
    'Farida',
    'Saidi',
    'Rahma',
    'Mwana',
    'Amani',
    'Riziki',
    'Kulthum',
    'Hamisi',
    'Zara',
    'Nassor',
    'Amina',
    'Nizar',
    'Nuru',
  ];

  tanzanianLastNames = [
    'Kamungo',
    'Wangwe',
    'Mcharo',
    'Kashanda',
    'Ruzoka',
    'Ally',
    'Juma',
    'Kambona',
    'Malecela',
    'Nyembea',
    'Kilumile',
    'Lwiza',
    'Majura',
    'Marando',
    'Matata',
    'Mchome',
    'Mnyika',
    'Mroso',
    'Mwacha',
    'Mwalukasa',
    'Mwambungu',
    'Mwania',
    'Mwarabu',
    'Mwasha',
    'Nkya',
    'Nnko',
    'Nnunduma',
    'Pinda',
    'Rajabu',
    'Shomari',
    'Sijaona',
    'Simalenga',
    'Sitta',
    'Sokoni',
    'Suwedi',
    'Tambwe',
    'Teule',
    'Ukawa',
    'Ulaya',
    'Upendo',
    'Wakareba',
    'Yunus',
    'Zitto',
    'Zuberi',
    'Zuhura',
    'Lugendo',
    'Majaliwa',
    'Masanja',
    'Masha',
    'Mkapa',
  ];

  constructor() {}

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  generateRandomDate(
    startMonth: number,
    endMonth: number,
    startDay: number,
    endDay: number
  ): Date {
    const randomMonth =
      Math.floor(Math.random() * (endMonth - startMonth + 1)) + startMonth;
    const randomDay =
      Math.floor(Math.random() * (endDay - startDay + 1)) + startDay;

    return new Date(
      `2023-${this.padZero(randomMonth)}-${this.padZero(randomDay)}`
    );
  }

  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  formatDate(date: Date): string {
    return `${date.getFullYear()}-${this.padZero(
      date.getMonth() + 1
    )}-${this.padZero(date.getDate())}`;
  }
}
