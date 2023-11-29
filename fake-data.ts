export interface Doctor {
    userID: number;
    firstName: string;
    lastName: string;
    phone: string;
    specialty: string;
    regNo?: string;
    dateOfBirth?: string | null;
    email?: string;
    password?: string;
    gender?: string;
    age?: number;
    regionID?: string;
    street?: string;
    lat?: string;
    longt?: string;
    geo?: string;
    timeSt?: string;
    doctorsIDnumber?: string;
    doctorsIDverificationStatus?: string;
    status?: string;
    userRole?: number;
    userNhifNumber?: string;
    onlineStatus?: number;
    specializationID?: number;
    lastOnlineTime?: string;
    user_image?: string;
    height?: number;
    weight?: number;
    blood_group?: string;
    doctorPromotionCode?: string;
    userPromotionCode?: string;
    allergy?: string;
    doctor_bio?: string;
    specilizationAreaID?: number;
    experience?: string;
    consultation_fee?: number;
    call_fee?: string;
    no_initial_consultation?: string;
    no_remain_consulatation?: string;
    consultation_availabiliy?: string;
    phone_availability?: string;
    patient_no?: string;
    registration_source?: string;
    ip_address?: string;
    deleted?: number;
    country?: string;
    currency?: string;
    rate?: number;
    call_payment_id?: string;
    consultation_payment_id?: string;
    subscription_payment_id?: string;
    incentive_doctor?: number;
    qrcode?: string;
    incentive_percentage?: string;
    consultation_payments?: ConsultationPayment[];
    subscription_payments?: SubscriptionPayment[];
  }
  

  interface ConsultationPayment {
    id: number;
    doctor_id: number;
    consultation_type: string;
    amount: number;
    gpay_id: string;
    created_at: string;
    updated_at: string;
  }
  
  interface SubscriptionPayment {
    id: number;
    doctor_id: number;
    subscription_period: string;
    amount: number;
    gpay_id: string;
    created_at: string;
    updated_at: string;
  }

  function getRandomDate(startDate: Date, endDate: Date): string {
    const startMillis = startDate.getTime();
    const endMillis = endDate.getTime();
    const randomMillis = startMillis + Math.random() * (endMillis - startMillis);
    const randomDate = new Date(randomMillis);
    return randomDate.toISOString().slice(0, 19).replace("T", " "); // Format as 'YYYY-MM-DD HH:mm:ss'
  }
  

  const startDate = new Date('2022-01-01');
  const endDate = new Date('2023-10-31');
  

   const doctorsData = [
    {
        "Doctor Name": "Ahaz Kabura",
        "Phone Number ": "255739387391",
        "Specialty": "GP",
        "Reg No": "MCT 4263"
    },
    {
        "Doctor Name": "Kenneth Mlay",
        "Phone Number ": "255718742688",
        "Specialty": "ENT Medicine",
        "Reg No": "MCTOL61"
    },
    {
        "Doctor Name": "Elizabeth Nyangeta",
        "Phone Number ": "255769301633",
        "Specialty": "Peadiatrician ",
        "Reg No": "MCTOL195"
    },
    {
        "Doctor Name": "Anna Mahecha",
        "Phone Number ": "255749242415",
        "Specialty": "OBGYN",
        "Reg No": "MCT2515"
    },
    {
        "Doctor Name": "Ahmed Kawambwa",
        "Phone Number ": "255712672279",
        "Specialty": "GP",
        "Reg No": "MCTOL182"
    },
    {
        "Doctor Name": "Peter Gabriel Mandu",
        "Phone Number ": "255732190347",
        "Specialty": "Orthopedic ",
        "Reg No": "MCT2633"
    },
    {
        "Doctor Name": "Azza Awadh Naif",
        "Phone Number ": "255718399118",
        "Specialty": "Radiologist",
        "Reg No": "MCT2368"
    },
    {
        "Doctor Name": "Damas Juma Kayera",
        "Phone Number ": "255269174104",
        "Specialty": "GP",
        "Reg No": "MCTOL3289"
    },
    {
        "Doctor Name": " Iddy Ramadhan",
        "Phone Number ": "255682649294",
        "Specialty": "GP",
        "Reg No": "MCTOL139"
    },
    {
        "Doctor Name": "Emanuel Tapantu",
        "Phone Number ": "255683916331",
        "Specialty": "GP",
        "Reg No": "MCTER4778"
    },
    {
        "Doctor Name": "Maisara Adam",
        "Phone Number ": "255749742451",
        "Specialty": "Dentist",
        "Reg No": "MCTOL22"
    },
    {
        "Doctor Name": "Asteri Dangat",
        "Phone Number ": "255759259314",
        "Specialty": "GP",
        "Reg No": "MCTOL185"
    },
    {
        "Doctor Name": "Sebastian Uvetie",
        "Phone Number ": "255714493528",
        "Specialty": "GP",
        "Reg No": "MCTOL1829"
    },
    {
        "Doctor Name": "Leah Lekoringo",
        "Phone Number ": "255785683441",
        "Specialty": "GP",
        "Reg No": "MCTOL54"
    },
    {
        "Doctor Name": "Fatma Lijohi",
        "Phone Number ": "255649497802",
        "Specialty": "OBGYN",
        "Reg No": "MCT4786"
    },
    {
        "Doctor Name": "Bosco Mapunda",
        "Phone Number ": "255785294219",
        "Specialty": "OBGYN",
        "Reg No": "MCTOL63"
    },
    {
        "Doctor Name": "Deogratias Elias",
        "Phone Number ": "255690352426",
        "Specialty": "Dentist",
        "Reg No": "MCTOL21"
    },
    {
        "Doctor Name": "Vivienne Mlawi",
        "Phone Number ": "255748904258",
        "Specialty": "Peadiatrician ",
        "Reg No": "MCTOL299"
    },
    {
        "Doctor Name": "Frank Martin Sudai",
        "Phone Number ": "255759104817",
        "Specialty": "Surgeon",
        "Reg No": "MCTOL141"
    },
    {
        "Doctor Name": "Sarah Nyagabona",
        "Phone Number ": "255739603850",
        "Specialty": "Oncologist",
        "Reg No": "MCTOL175"
    },
    {
        "Doctor Name": "Mercy Tawale",
        "Phone Number ": "255729528125",
        "Specialty": "GP",
        "Reg No": "MCT0600"
    },
    {
        "Doctor Name": "Simplice AHarusha",
        "Phone Number ": "255745294834",
        "Specialty": "OBGYN",
        "Reg No": "MCTLR148"
    },
    {
        "Doctor Name": "Ally  Qassim",
        "Phone Number ": "255583652627",
        "Specialty": "GP",
        "Reg No": "MCTOL39772"
    },
    {
        "Doctor Name": "Ferdinard Machibya",
        "Phone Number ": "255746293813",
        "Specialty": "GP",
        "Reg No": "MCT440"
    },
    {
        "Doctor Name": "Ezekia Zyunga",
        "Phone Number ": "255789756430",
        "Specialty": "GP",
        "Reg No": "MCT2347"
    },
    {
        "Doctor Name": " Elizabeth Kwiyolecha",
        "Phone Number ": "255698564436",
        "Specialty": "Peadiatrician ",
        "Reg No": "MCTOL195"
    },
    {
        "Doctor Name": "Neema Minja",
        "Phone Number ": "255773891218",
        "Specialty": "Internal medicine",
        "Reg No": "MCT2376"
    },
    {
        "Doctor Name": "Eva Mbwilo",
        "Phone Number ": "255678514375",
        "Specialty": "Pathologist",
        "Reg No": "MCT4571"
    },
    {
        "Doctor Name": "Fridah Mtui",
        "Phone Number ": "255671841633",
        "Specialty": "Pyschiatry",
        "Reg No": "MCTOL77"
    },
    {
        "Doctor Name": "Frank Kiwara",
        "Phone Number ": "255789248257",
        "Specialty": "Urologist",
        "Reg No": "MCTOL462"
    },
    {
        "Doctor Name": "Leyla Miskry",
        "Phone Number ": "255740827491",
        "Specialty": "Dermatology",
        "Reg No": "MCTOL75"
    },
    {
        "Doctor Name": "Gilbert Ngua",
        "Phone Number ": "255796264955",
        "Specialty": "GP",
        "Reg No": "MCTOL1114"
    },
    {
        "Doctor Name": "Joseph Soka",
        "Phone Number ": "255763495495",
        "Specialty": "GP",
        "Reg No": "MCTOL255"
    },
    {
        "Doctor Name": "Lulyritha Kin",
        "Phone Number ": "255694888051",
        "Specialty": "Dermatology",
        "Reg No": "MCT4765"
    },
    {
        "Doctor Name": "Ewaldo Komba",
        "Phone Number ": "255757240577",
        "Specialty": "Gastroenterlogist",
        "Reg No": "MCTOL13083"
    },
    {
        "Doctor Name": "Sylvia Killenga",
        "Phone Number ": "255658385621",
        "Specialty": "GP",
        "Reg No": "MCTOL285"
    },
    {
        "Doctor Name": "Asha Varghese",
        "Phone Number ": "255648249288",
        "Specialty": "Internal medicine",
        "Reg No": "MCTOL33046"
    },
    {
        "Doctor Name": "Filbert Isaiman",
        "Phone Number ": "255748913704",
        "Specialty": "GP",
        "Reg No": "MCTOL433"
    },
    {
        "Doctor Name": "Rosta Gama",
        "Phone Number ": "255756274134",
        "Specialty": "GP",
        "Reg No": "MCT9047"
    },
    {
        "Doctor Name": "Revocatus Machumu",
        "Phone Number ": "255793344599",
        "Specialty": "OBGYN",
        "Reg No": "MCTOL14229"
    },
    {
        "Doctor Name": "Herbert Mngoma",
        "Phone Number ": "255784556822",
        "Specialty": "GP",
        "Reg No": "MCTOL230"
    },
    {
        "Doctor Name": "Noel Mlalasi",
        "Phone Number ": "255756398493",
        "Specialty": "GP",
        "Reg No": "MCT0563"
    },
    {
        "Doctor Name": "Prisca Belege",
        "Phone Number ": "255674927438",
        "Specialty": "GP",
        "Reg No": "MCTOL3325"
    },
    {
        "Doctor Name": "Osmundi Dyegura",
        "Phone Number ": "255694849526",
        "Specialty": "Surgeon",
        "Reg No": "MCTOL1341"
    },
    {
        "Doctor Name": "Fortunatus Mazigo",
        "Phone Number ": "255749247915",
        "Specialty": "GP",
        "Reg No": "MCTOL1965"
    },
    {
        "Doctor Name": "Susan Moshi ",
        "Phone Number ": "255629471934",
        "Specialty": "GP",
        "Reg No": "MCTOL264"
    },
    {
        "Doctor Name": "Hamza Mbilinyi",
        "Phone Number ": "255759371197",
        "Specialty": "GP",
        "Reg No": "MCTOL177"
    },
    {
        "Doctor Name": "Kenedy Donald",
        "Phone Number ": "255789374100",
        "Specialty": "OBGYN",
        "Reg No": "MCTOL99"
    },
    {
        "Doctor Name": "Asha Mwami",
        "Phone Number ": "255795047761",
        "Specialty": "GP",
        "Reg No": "MCTOL670"
    },
    {
        "Doctor Name": "Zebedayo Mwenzegule",
        "Phone Number ": "255758389246",
        "Specialty": "GP",
        "Reg No": "MCTOL738"
    },
    {
        "Doctor Name": "Simon Gregory",
        "Phone Number ": "255763961768",
        "Specialty": "Internal medicine",
        "Reg No": "MCTOL1511"
    },
    {
        "Doctor Name": "Grace Kinabo",
        "Phone Number ": "255695724595",
        "Specialty": "Peadiatrician ",
        "Reg No": "MCT4393"
    },
    {
        "Doctor Name": "Mustansir Kaderbhai",
        "Phone Number ": "255695017548",
        "Specialty": "Dentist",
        "Reg No": "MCT349"
    },
    {
        "Doctor Name": "Living Living",
        "Phone Number ": "255758920471",
        "Specialty": "OBGYN",
        "Reg No": "MCT4790"
    },
    {
        "Doctor Name": "Benjamin Chota",
        "Phone Number ": "255759252345",
        "Specialty": "GP",
        "Reg No": "MCT0522"
    },
    {
        "Doctor Name": "Witness Mchwampaka",
        "Phone Number ": "255696878135",
        "Specialty": "GP",
        "Reg No": "MCTOL52"
    },
    {
        "Doctor Name": "Lazaro Gatahwa",
        "Phone Number ": "255769816766",
        "Specialty": "GP",
        "Reg No": "MCTOL337"
    },
    {
        "Doctor Name": "Lilian Mnabwiru",
        "Phone Number ": "255695837500",
        "Specialty": "OBGYN",
        "Reg No": "MCTOL1996"
    },
    {
        "Doctor Name": "Fransisco Noya",
        "Phone Number ": "255768494382",
        "Specialty": "GP",
        "Reg No": "MCTER11931"
    },
    {
        "Doctor Name": "Hilda Mlay",
        "Phone Number ": "255796246315",
        "Specialty": "GP",
        "Reg No": "MCT4580"
    },
    {
        "Doctor Name": "Kazim Dhalla",
        "Phone Number ": "255787395919",
        "Specialty": "Ophthalmologist",
        "Reg No": "MCTOL1749"
    },
    {
        "Doctor Name": "Puneet Bramania",
        "Phone Number ": "255879376632",
        "Specialty": "Internal medicine",
        "Reg No": "MCT0558"
    },
    {
        "Doctor Name": "Diana Melanyi",
        "Phone Number ": "255798274155",
        "Specialty": "GP",
        "Reg No": "MCTER1998"
    },
    {
        "Doctor Name": "Lenia Mwambeso",
        "Phone Number ": "255658963345",
        "Specialty": "GP",
        "Reg No": "MCTER1839"
    },
    {
        "Doctor Name": "Emanuel Nuwass",
        "Phone Number ": "255695040524",
        "Specialty": "Surgeon",
        "Reg No": "MCT3784"
    },
    {
        "Doctor Name": "Sabato Ojwang'",
        "Phone Number ": "255789474940",
        "Specialty": "GP",
        "Reg No": "MCTER0023"
    },
    {
        "Doctor Name": "Cinzia Tonetti",
        "Phone Number ": "255958386105",
        "Specialty": "GP",
        "Reg No": "MCTLR1126"
    },
    {
        "Doctor Name": "Evaristo Lupumbwe",
        "Phone Number ": "255793852925",
        "Specialty": "GP",
        "Reg No": "MCTOL198"
    },
    {
        "Doctor Name": "John Ngendahayo",
        "Phone Number ": "255685723350",
        "Specialty": "Gastroenterlogist",
        "Reg No": "MCTOL41635"
    },
    {
        "Doctor Name": "Simon Opondo",
        "Phone Number ": "255756945588",
        "Specialty": "GP",
        "Reg No": "MCT2898"
    },

    {
        "Doctor Name": "Judith Isaria Mwende",
        "Phone Number ": "255674968244",
        "Specialty": "Ophthalmologist",
        "Reg No": "MCTOL41646"
    },
    {
        "Doctor Name": "William Mgisha",
        "Phone Number ": "255777249146",
        "Specialty": "Orthopedic ",
        "Reg No": "MCT6054"
    },
    {
        "Doctor Name": "Aziza Othman",
        "Phone Number ": "255678485387",
        "Specialty": "GP",
        "Reg No": "MCT6386"
    },
    {
        "Doctor Name": "Bushra Kaporo",
        "Phone Number ": "255689467761",
        "Specialty": "GP",
        "Reg No": "MCT20221157"
    },
    {
        "Doctor Name": "Anna Msafiri",
        "Phone Number ": "255797383714",
        "Specialty": "Peadiatrician ",
        "Reg No": "MCTOL2259"
    },
    {
        "Doctor Name": "Fatuma Kibao",
        "Phone Number ": "255798572619",
        "Specialty": "ENT Medicine",
        "Reg No": "MCTOL2507"
    },
    {
        "Doctor Name": "Vivienne Mlawi",
        "Phone Number ": "255758948313",
        "Specialty": "Peadiatrician ",
        "Reg No": "MCTOL299"
    },
    {
        "Doctor Name": "Deogratias Elias",
        "Phone Number ": "255695066727",
        "Specialty": "Dentist",
        "Reg No": "MCTOL21"
    },
    {
        "Doctor Name": "Agness Shayo",
        "Phone Number ": "255767291566",
        "Specialty": "Oncologist",
        "Reg No": "MCT5183"
    },
    {
        "Doctor Name": "Iddy Ramadhan",
        "Phone Number ": "255689517381",
        "Specialty": "Surgeon",
        "Reg No": "MCTOL139"
    },
    {
        "Doctor Name": "Elly Nyangoya",
        "Phone Number ": "255794827496",
        "Specialty": "GP",
        "Reg No": "MCTER6915"
    },
    {
        "Doctor Name": "Penuel Obeid",
        "Phone Number ": "255798256448",
        "Specialty": "GP",
        "Reg No": "MCTER10545"
    },
    {
        "Doctor Name": "Larry Onyango",
        "Phone Number ": "255683750205",
        "Specialty": "Oncologist",
        "Reg No": "MCT3805"
    },
    {
        "Doctor Name": "Marry Massawe",
        "Phone Number ": "255736728100",
        "Specialty": "GP",
        "Reg No": "MCTER5073"
    },
    {
        "Doctor Name": "Christina Malima",
        "Phone Number ": "255694296547",
        "Specialty": "GP",
        "Reg No": "MCT2229"
    },
    {
        "Doctor Name": "Said Omary",
        "Phone Number ": "255625822786",
        "Specialty": "Nephrologist",
        "Reg No": "MCT4704"
    },
    {
        "Doctor Name": "Mohammed Salim",
        "Phone Number ": "255761349499",
        "Specialty": "Surgeon",
        "Reg No": "MCT2865"
    },
    {
        "Doctor Name": "Glory Joseph",
        "Phone Number ": "255695011111",
        "Specialty": "Peadiatric Cardiologist ",
        "Reg No": "MCT4112"
    },
    {
        "Doctor Name": "Nasra Batchu",
        "Phone Number ": "255728945712",
        "Specialty": "OBGYN",
        "Reg No": "MCT3007"
    },
    {
        "Doctor Name": "Shukuru Jesto",
        "Phone Number ": "255712732403",
        "Specialty": "GP",
        "Reg No": "MCT4514"
    },
    {
        "Doctor Name": "Irene Sharau",
        "Phone Number ": "255719262881",
        "Specialty": "GP",
        "Reg No": "MCT5995"
    },
    {
        "Doctor Name": "Kelvin Respicias",
        "Phone Number ": "255739505052",
        "Specialty": "GP",
        "Reg No": "MCT11292"
    },
    {
        "Doctor Name": "Mapendo Providence",
        "Phone Number ": "255672931143",
        "Specialty": "GP",
        "Reg No": "MCT2636"
    },
    {
        "Doctor Name": "Beatrice Abell Urio",
        "Phone Number ": "255788452963",
        "Specialty": "GP",
        "Reg No": "MCTER6344"
    },
    {
        "Doctor Name": "Husna Juma Kolilo",
        "Phone Number ": "255735627926",
        "Specialty": "GP",
        "Reg No": "MCTER14336"
    },
    {
        "Doctor Name": "Walter Mshomi",
        "Phone Number ": "255749471494",
        "Specialty": "GP",
        "Reg No": "MCTOL3692"
    },
    {
        "Doctor Name": "Agnes Vomo",
        "Phone Number ": "255723073417",
        "Specialty": "GP",
        "Reg No": "MCTER7836"
    },
    {
        "Doctor Name": "Halima Uddy",
        "Phone Number ": "255680482355",
        "Specialty": "GP",
        "Reg No": "MCT0101"
    },
    {
        "Doctor Name": "Nelly Mwageni",
        "Phone Number ": "255052749525",
        "Specialty": "Dermatologist",
        "Reg No": "MCTOL1746"
    },
    {
        "Doctor Name": "Murete Lukumay",
        "Phone Number ": "255684058027",
        "Specialty": "OBGYN",
        "Reg No": "MCTOL107"
    },
    {
        "Doctor Name": "Kessy Ngarawa",
        "Phone Number ": "255740528525",
        "Specialty": "Internal medicine",
        "Reg No": "MCT3680"
    },
    {
        "Doctor Name": "Gladys Yonah",
        "Phone Number ": "255672963154",
        "Specialty": "GP",
        "Reg No": "MCTOL1148"
    },
    {
        "Doctor Name": "Thomas Peter",
        "Phone Number ": "255652950909",
        "Specialty": "Dentist",
        "Reg No": "MCTOL393"
    },
    {
        "Doctor Name": "James Mselle",
        "Phone Number ": "255794853248",
        "Specialty": "Ophthalmologist",
        "Reg No": "MCTOL913"
    },
    {
        "Doctor Name": "Yoel Elias",
        "Phone Number ": "255715975826",
        "Specialty": "GP",
        "Reg No": "MCT9322"
    },
    {
        "Doctor Name": "Irene Kato",
        "Phone Number ": "255653057230",
        "Specialty": "Internal medicine",
        "Reg No": "MCTOL6170"
    },
    {
        "Doctor Name": "Maimuna Simbauranga",
        "Phone Number ": "255658229250",
        "Specialty": "GP",
        "Reg No": "MCT0041"
    },
    {
        "Doctor Name": "Allen Alex Kabuhaya",
        "Phone Number ": "255749572946",
        "Specialty": "GP",
        "Reg No": "MCTER9260"
    }
]

const doctors = doctorsData.map((doctor, index) => {
  const [firstName, lastName] = doctor["Doctor Name"].split(' ');
  return {
      userID: 478 + index,
      firstName: firstName,
      lastName: lastName,
      phone: doctor["Phone Number "].trim(),
      specialty: doctor["Specialty"].trim(),
      doctorsIDnumber: doctor["Reg No"].trim(),
      timeSt: getRandomDate(startDate, endDate),
      doctorsIDverificationStatus:"Verified"
  };
});


export const additionalDoctors = doctors;
  