export const USER_SESSION_KEY = 'pal-user-session';
export const SESSION_STORAGE_KEY = 'user_session_data';
export const BUSINESS_DATA_KEY = 'business_data';
export const BUSINESS_ACCOUNT_DATA_KEY = 'business_acc_data';
export const SUMMARY_DATA_KEY = 'summary_data';

export const PAYOUT_TABLE_LABELS = [
  {
    text: 'Pending',
    textClass: 'text-primary',
    cssClasses: ['text-primary', 'bg-primary-light'],
    bgClass: 'bg-primary-light',
    previewClass: 'bg-primary',
  },
  {
    text: 'Completed',
    textClass: 'text-green',
    cssClasses: ['text-green', 'bg-cyan-light'],
    bgClass: 'bg-cyan-light',
    previewClass: 'bg-green',
  },
  {
    text: 'Cancelled',
    cssClasses: ['text-purple', 'bg-purple-light'],
    textClass: 'text-purple',
    bgClass: 'bg-puple-light',
    previewClass: 'bg-cyan',
  },
];

export const TRANSACTION_TABLE_LABELS = [
  {
    text: 'Pending',
    textClass: 'text-primary',
    cssClasses: ['text-primary', 'bg-primary-light'],
    bgClass: 'bg-primary-light',
    previewClass: 'bg-primary',
  },
  {
    text: 'Processing',
    cssClasses: ['text-teal', 'bg-teal-light'],
    textClass: 'text-teal',
    bgClass: 'bg-teal-light',
    previewClass: 'bg-teal',
  },
  {
    text: 'Completed',
    textClass: 'text-green',
    cssClasses: ['text-green', 'bg-cyan-light'],
    bgClass: 'bg-cyan-light',
    previewClass: 'bg-green',
  },
  {
    text: 'Cancelled',
    cssClasses: ['text-purple', 'bg-purple-light'],
    textClass: 'text-purple',
    bgClass: 'bg-puple-light',
    previewClass: 'bg-cyan',
  },
  {
    text: 'Refunded',
    cssClasses: ['text-purple', 'bg-purple-light'],
    textClass: 'text-purple',
    bgClass: 'bg-puple-light',
    previewClass: 'bg-cyan',
  },
  {
    text: 'Re-Processing',
    cssClasses: ['text-teal', 'bg-teal-light'],
    textClass: 'text-teal',
    bgClass: 'bg-teal-light',
    previewClass: 'bg-teal',
  },
  {
    text: 'Error',
    cssClasses: ['text-red', 'bg-red-light'],
    textClass: 'text-red',
    bgClass: 'bg-red-light',
    previewClass: 'bg-red',
  },
  {
    text: 'Network Error',
    cssClasses: ['text-red', 'bg-red-light'],
    textClass: 'text-red',
    bgClass: 'bg-red-light',
    previewClass: 'bg-red',
  },
  {
    text: 'Denied',
    cssClasses: ['text-red', 'bg-red-light'],
    textClass: 'text-red',
    bgClass: 'bg-red-light',
    previewClass: 'bg-red',
  },
  {
    text: 'Approved',
    textClass: 'text-green',
    cssClasses: ['text-green', 'bg-cyan-light'],
    bgClass: 'bg-cyan-light',
    previewClass: 'bg-green',
  },
];

export const INDUSTRIES = [
  'Agriculture',
  'Commerce',
  'Education',
  'Gaming',
  'Financial Services',
  'Health',
  'Hospitality',
  'Non-profits',
  'Leisure & Entertainment',
  'Logistics',
  'Travel',
  'Utilities',
  'Retail',
];

export const CATEGORIES = [
  'Retail',
  'Online shopping',
  'Financial Cooperatives',
  'Corporate Services',
  'Payment Solution Service Providers',
  'Insurance',
  'Investments',
  'Agricultural Investments',
  'Lending',
  'Bill Payments',
  'Payroll',
  'Remittances',
  'Savings',
  'Mobile Wallets',
];

export const NATIONALITIES = [
  'Afghan',
  'Albanian',
  'Algerian',
  'American',
  'Andorran',
  'Angolan',
  'Antiguans',
  'Argentinean',
  'Armenian',
  'Australian',
  'Austrian',
  'Azerbaijani',
  'Bahamian',
  'Bahraini',
  'Bangladeshi',
  'Barbadian',
  'Barbudans',
  'Batswana',
  'Belarusian',
  'Belgian',
  'Belizean',
  'Beninese',
  'Bhutanese',
  'Bolivian',
  'Bosnian',
  'Brazilian',
  'British',
  'Bruneian',
  'Bulgarian',
  'Burkinabe',
  'Burmese',
  'Burundian',
  'Cambodian',
  'Cameroonian',
  'Canadian',
  'Cape Verdean',
  'Central African',
  'Chadian',
  'Chilean',
  'Chinese',
  'Colombian',
  'Comoran',
  'Congolese',
  'Costa Rican',
  'Croatian',
  'Cuban',
  'Cypriot',
  'Czech',
  'Danish',
  'Djibouti',
  'Dominican',
  'Dutch',
  'East Timorese',
  'Ecuadorean',
  'Egyptian',
  'Emirian',
  'Equatorial Guinean',
  'Eritrean',
  'Estonian',
  'Ethiopian',
  'Fijian',
  'Filipino',
  'Finnish',
  'French',
  'Gabonese',
  'Gambian',
  'Georgian',
  'German',
  'Ghanaian',
  'Greek',
  'Grenadian',
  'Guatemalan',
  'Guinea-Bissauan',
  'Guinean',
  'Guyanese',
  'Haitian',
  'Herzegovinian',
  'Honduran',
  'Hungarian',
  'I-Kiribati',
  'Icelander',
  'Indian',
  'Indonesian',
  'Iranian',
  'Iraqi',
  'Irish',
  'Israeli',
  'Italian',
  'Ivorian',
  'Jamaican',
  'Japanese',
  'Jordanian',
  'Kazakhstani',
  'Kenyan',
  'Kittian and Nevisian',
  'Kuwaiti',
  'Kyrgyz',
  'Laotian',
  'Latvian',
  'Lebanese',
  'Liberian',
  'Libyan',
  'Liechtensteiner',
  'Lithuanian',
  'Luxembourger',
  'Macedonian',
  'Malagasy',
  'Malawian',
  'Malaysian',
  'Maldivan',
  'Malian',
  'Maltese',
  'Marshallese',
  'Mauritanian',
  'Mauritian',
  'Mexican',
  'Micronesian',
  'Moldovan',
  'Monacan',
  'Mongolian',
  'Moroccan',
  'Mosotho',
  'Motswana',
  'Mozambican',
  'Namibian',
  'Nauruan',
  'Nepalese',
  'New Zealander',
  'Nicaraguan',
  'Nigerian',
  'Nigerien',
  'North Korean',
  'Northern Irish',
  'Norwegian',
  'Omani',
  'Pakistani',
  'Palauan',
  'Panamanian',
  'Papua New Guinean',
  'Paraguayan',
  'Peruvian',
  'Polish',
  'Portuguese',
  'Qatari',
  'Romanian',
  'Russian',
  'Rwandan',
  'Saint Lucian',
  'Salvadoran',
  'Samoan',
  'San Marinese',
  'Sao Tomean',
  'Saudi',
  'Scottish',
  'Senegalese',
  'Serbian',
  'Seychellois',
  'Sierra Leonean',
  'Singaporean',
  'Slovakian',
  'Slovenian',
  'Solomon Islander',
  'Somali',
  'South African',
  'South Korean',
  'Spanish',
  'Sri Lankan',
  'Sudanese',
  'Surinamer',
  'Swazi',
  'Swedish',
  'Swiss',
  'Syrian',
  'Taiwanese',
  'Tajik',
  'Tanzanian',
  'Thai',
  'Togolese',
  'Tongan',
  'Trinidadian or Tobagonian',
  'Tunisian',
  'Turkish',
  'Tuvaluan',
  'Ugandan',
  'Ukrainian',
  'Uruguayan',
  'Uzbekistani',
  'Venezuelan',
  'Vietnamese',
  'Welsh',
  'Yemenite',
  'Zambian',
  'Zimbabwean',
];

export const COUNTRIES = [
  { name: 'Albania', code: 'AL' },
  { name: 'Åland Islands', code: 'AX' },
  { name: 'Algeria', code: 'DZ' },
  { name: 'American Samoa', code: 'AS' },
  { name: 'Andorra', code: 'AD' },
  { name: 'Angola', code: 'AO' },
  { name: 'Anguilla', code: 'AI' },
  { name: 'Antarctica', code: 'AQ' },
  { name: 'Antigua and Barbuda', code: 'AG' },
  { name: 'Argentina', code: 'AR' },
  { name: 'Armenia', code: 'AM' },
  { name: 'Aruba', code: 'AW' },
  { name: 'Australia', code: 'AU' },
  { name: 'Austria', code: 'AT' },
  { name: 'Azerbaijan', code: 'AZ' },
  { name: 'Bahamas (the)', code: 'BS' },
  { name: 'Bahrain', code: 'BH' },
  { name: 'Bangladesh', code: 'BD' },
  { name: 'Barbados', code: 'BB' },
  { name: 'Belarus', code: 'BY' },
  { name: 'Belgium', code: 'BE' },
  { name: 'Belize', code: 'BZ' },
  { name: 'Benin', code: 'BJ' },
  { name: 'Bermuda', code: 'BM' },
  { name: 'Bhutan', code: 'BT' },
  { name: 'Bolivia (Plurinational State of)', code: 'BO' },
  { name: 'Bonaire, Sint Eustatius and Saba', code: 'BQ' },
  { name: 'Bosnia and Herzegovina', code: 'BA' },
  { name: 'Botswana', code: 'BW' },
  { name: 'Bouvet Island', code: 'BV' },
  { name: 'Brazil', code: 'BR' },
  { name: 'British Indian Ocean Territory (the)', code: 'IO' },
  { name: 'Brunei Darussalam', code: 'BN' },
  { name: 'Bulgaria', code: 'BG' },
  { name: 'Burkina Faso', code: 'BF' },
  { name: 'Burundi', code: 'BI' },
  { name: 'Cabo Verde', code: 'CV' },
  { name: 'Cambodia', code: 'KH' },
  { name: 'Cameroon', code: 'CM' },
  { name: 'Canada', code: 'CA' },
  { name: 'Cayman Islands (the)', code: 'KY' },
  { name: 'Central African Republic (the)', code: 'CF' },
  { name: 'Chad', code: 'TD' },
  { name: 'Chile', code: 'CL' },
  { name: 'China', code: 'CN' },
  { name: 'Christmas Island', code: 'CX' },
  { name: 'Cocos (Keeling) Islands (the)', code: 'CC' },
  { name: 'Colombia', code: 'CO' },
  { name: 'Comoros (the)', code: 'KM' },
  { name: 'Congo (the Democratic Republic of the)', code: 'CD' },
  { name: 'Congo (the)', code: 'CG' },
  { name: 'Cook Islands (the)', code: 'CK' },
  { name: 'Costa Rica', code: 'CR' },
  { name: 'Croatia', code: 'HR' },
  { name: 'Cuba', code: 'CU' },
  { name: 'Curaçao', code: 'CW' },
  { name: 'Cyprus', code: 'CY' },
  { name: 'Czechia', code: 'CZ' },
  { name: 'Côte d\'Ivoire', code: 'CI' },
  { name: 'Denmark', code: 'DK' },
  { name: 'Djibouti', code: 'DJ' },
  { name: 'Dominica', code: 'DM' },
  { name: 'Dominican Republic (the)', code: 'DO' },
  { name: 'Ecuador', code: 'EC' },
  { name: 'Egypt', code: 'EG' },
  { name: 'El Salvador', code: 'SV' },
  { name: 'Equatorial Guinea', code: 'GQ' },
  { name: 'Eritrea', code: 'ER' },
  { name: 'Estonia', code: 'EE' },
  { name: 'Eswatini', code: 'SZ' },
  { name: 'Ethiopia', code: 'ET' },
  { name: 'Falkland Islands (the) [Malvinas]', code: 'FK' },
  { name: 'Faroe Islands (the)', code: 'FO' },
  { name: 'Fiji', code: 'FJ' },
  { name: 'Finland', code: 'FI' },
  { name: 'France', code: 'FR' },
  { name: 'French Guiana', code: 'GF' },
  { name: 'French Polynesia', code: 'PF' },
  { name: 'French Southern Territories (the)', code: 'TF' },
  { name: 'Gabon', code: 'GA' },
  { name: 'Gambia (the)', code: 'GM' },
  { name: 'Georgia', code: 'GE' },
  { name: 'Germany', code: 'DE' },
  { name: 'Ghana', code: 'GH' },
  { name: 'Gibraltar', code: 'GI' },
  { name: 'Greece', code: 'GR' },
  { name: 'Greenland', code: 'GL' },
  { name: 'Grenada', code: 'GD' },
  { name: 'Guadeloupe', code: 'GP' },
  { name: 'Guam', code: 'GU' },
  { name: 'Guatemala', code: 'GT' },
  { name: 'Guernsey', code: 'GG' },
  { name: 'Guinea', code: 'GN' },
  { name: 'Guinea-Bissau', code: 'GW' },
  { name: 'Guyana', code: 'GY' },
  { name: 'Haiti', code: 'HT' },
  { name: 'Heard Island and McDonald Islands', code: 'HM' },
  { name: 'Holy See (the)', code: 'VA' },
  { name: 'Honduras', code: 'HN' },
  { name: 'Hong Kong', code: 'HK' },
  { name: 'Hungary', code: 'HU' },
  { name: 'Iceland', code: 'IS' },
  { name: 'India', code: 'IN' },
  { name: 'Indonesia', code: 'ID' },
  { name: 'Iran (Islamic Republic of)', code: 'IR' },
  { name: 'Iraq', code: 'IQ' },
  { name: 'Ireland', code: 'IE' },
  { name: 'Isle of Man', code: 'IM' },
  { name: 'Israel', code: 'IL' },
  { name: 'Italy', code: 'IT' },
  { name: 'Jamaica', code: 'JM' },
  { name: 'Japan', code: 'JP' },
  { name: 'Jersey', code: 'JE' },
  { name: 'Jordan', code: 'JO' },
  { name: 'Kazakhstan', code: 'KZ' },
  { name: 'Kenya', code: 'KE' },
  { name: 'Kiribati', code: 'KI' },
  { name: 'Korea (the Democratic People\'s Republic of)', code: 'KP' },
  { name: 'Korea (the Republic of)', code: 'KR' },
  { name: 'Kuwait', code: 'KW' },
  { name: 'Kyrgyzstan', code: 'KG' },
  { name: 'Lao People\'s Democratic Republic (the)', code: 'LA' },
  { name: 'Latvia', code: 'LV' },
  { name: 'Lebanon', code: 'LB' },
  { name: 'Lesotho', code: 'LS' },
  { name: 'Liberia', code: 'LR' },
  { name: 'Libya', code: 'LY' },
  { name: 'Liechtenstein', code: 'LI' },
  { name: 'Lithuania', code: 'LT' },
  { name: 'Luxembourg', code: 'LU' },
  { name: 'Macao', code: 'MO' },
  { name: 'Madagascar', code: 'MG' },
  { name: 'Malawi', code: 'MW' },
  { name: 'Malaysia', code: 'MY' },
  { name: 'Maldives', code: 'MV' },
  { name: 'Mali', code: 'ML' },
  { name: 'Malta', code: 'MT' },
  { name: 'Marshall Islands (the)', code: 'MH' },
  { name: 'Martinique', code: 'MQ' },
  { name: 'Mauritania', code: 'MR' },
  { name: 'Mauritius', code: 'MU' },
  { name: 'Mayotte', code: 'YT' },
  { name: 'Mexico', code: 'MX' },
  { name: 'Micronesia (Federated States of)', code: 'FM' },
  { name: 'Moldova (the Republic of)', code: 'MD' },
  { name: 'Monaco', code: 'MC' },
  { name: 'Mongolia', code: 'MN' },
  { name: 'Montenegro', code: 'ME' },
  { name: 'Montserrat', code: 'MS' },
  { name: 'Morocco', code: 'MA' },
  { name: 'Mozambique', code: 'MZ' },
  { name: 'Myanmar', code: 'MM' },
  { name: 'Namibia', code: 'NA' },
  { name: 'Nauru', code: 'NR' },
  { name: 'Nepal', code: 'NP' },
  { name: 'Netherlands (the)', code: 'NL' },
  { name: 'New Caledonia', code: 'NC' },
  { name: 'New Zealand', code: 'NZ' },
  { name: 'Nicaragua', code: 'NI' },
  { name: 'Niger (the)', code: 'NE' },
  { name: 'Nigeria', code: 'NG' },
  { name: 'Niue', code: 'NU' },
  { name: 'Norfolk Island', code: 'NF' },
  { name: 'Northern Mariana Islands (the)', code: 'MP' },
  { name: 'Norway', code: 'NO' },
  { name: 'Oman', code: 'OM' },
  { name: 'Pakistan', code: 'PK' },
  { name: 'Palau', code: 'PW' },
  { name: 'Palestine, State of', code: 'PS' },
  { name: 'Panama', code: 'PA' },
  { name: 'Papua New Guinea', code: 'PG' },
  { name: 'Paraguay', code: 'PY' },
  { name: 'Peru', code: 'PE' },
  { name: 'Philippines (the)', code: 'PH' },
  { name: 'Pitcairn', code: 'PN' },
  { name: 'Poland', code: 'PL' },
  { name: 'Portugal', code: 'PT' },
  { name: 'Puerto Rico', code: 'PR' },
  { name: 'Qatar', code: 'QA' },
  { name: 'Republic of North Macedonia', code: 'MK' },
  { name: 'Romania', code: 'RO' },
  { name: 'Russian Federation (the)', code: 'RU' },
  { name: 'Rwanda', code: 'RW' },
  { name: 'Réunion', code: 'RE' },
  { name: 'Saint Barthélemy', code: 'BL' },
  { name: 'Saint Helena, Ascension and Tristan da Cunha', code: 'SH' },
  { name: 'Saint Kitts and Nevis', code: 'KN' },
  { name: 'Saint Lucia', code: 'LC' },
  { name: 'Saint Martin (French part)', code: 'MF' },
  { name: 'Saint Pierre and Miquelon', code: 'PM' },
  { name: 'Saint Vincent and the Grenadines', code: 'VC' },
  { name: 'Samoa', code: 'WS' },
  { name: 'San Marino', code: 'SM' },
  { name: 'Sao Tome and Principe', code: 'ST' },
  { name: 'Saudi Arabia', code: 'SA' },
  { name: 'Senegal', code: 'SN' },
  { name: 'Serbia', code: 'RS' },
  { name: 'Seychelles', code: 'SC' },
  { name: 'Sierra Leone', code: 'SL' },
  { name: 'Singapore', code: 'SG' },
  { name: 'Sint Maarten (Dutch part)', code: 'SX' },
  { name: 'Slovakia', code: 'SK' },
  { name: 'Slovenia', code: 'SI' },
  { name: 'Solomon Islands', code: 'SB' },
  { name: 'Somalia', code: 'SO' },
  { name: 'South Africa', code: 'ZA' },
  { name: 'South Georgia and the South Sandwich Islands', code: 'GS' },
  { name: 'South Sudan', code: 'SS' },
  { name: 'Spain', code: 'ES' },
  { name: 'Sri Lanka', code: 'LK' },
  { name: 'Sudan (the)', code: 'SD' },
  { name: 'Suriname', code: 'SR' },
  { name: 'Svalbard and Jan Mayen', code: 'SJ' },
  { name: 'Sweden', code: 'SE' },
  { name: 'Switzerland', code: 'CH' },
  { name: 'Syrian Arab Republic', code: 'SY' },
  { name: 'Taiwan (Province of China)', code: 'TW' },
  { name: 'Tajikistan', code: 'TJ' },
  { name: 'Tanzania, United Republic of', code: 'TZ' },
  { name: 'Thailand', code: 'TH' },
  { name: 'Timor-Leste', code: 'TL' },
  { name: 'Togo', code: 'TG' },
  { name: 'Tokelau', code: 'TK' },
  { name: 'Tonga', code: 'TO' },
  { name: 'Trinidad and Tobago', code: 'TT' },
  { name: 'Tunisia', code: 'TN' },
  { name: 'Turkey', code: 'TR' },
  { name: 'Turkmenistan', code: 'TM' },
  { name: 'Turks and Caicos Islands (the)', code: 'TC' },
  { name: 'Tuvalu', code: 'TV' },
  { name: 'Uganda', code: 'UG' },
  { name: 'Ukraine', code: 'UA' },
  { name: 'United Arab Emirates (the)', code: 'AE' },
  {
    name: 'United Kingdom of Great Britain and Northern Ireland (the)',
    code: 'GB',
  },
  { name: 'United States Minor Outlying Islands (the)', code: 'UM' },
  { name: 'United States of America (the)', code: 'US' },
  { name: 'Uruguay', code: 'UY' },
  { name: 'Uzbekistan', code: 'UZ' },
  { name: 'Vanuatu', code: 'VU' },
  { name: 'Venezuela (Bolivarian Republic of)', code: 'VE' },
  { name: 'Viet Nam', code: 'VN' },
  { name: 'Virgin Islands (British)', code: 'VG' },
  { name: 'Virgin Islands (U.S.)', code: 'VI' },
  { name: 'Wallis and Futuna', code: 'WF' },
  { name: 'Western Sahara', code: 'EH' },
  { name: 'Yemen', code: 'YE' },
  { name: 'Zambia', code: 'ZM' },
  { name: 'Zimbabwe', code: 'ZW' },
];

export const countryISO = {
  BD: '880',
  BE: '32',
  BF: '226',
  BG: '359',
  BA: '387',
  BB: '+1-246',
  WF: '681',
  BL: '590',
  BM: '+1-441',
  BN: '673',
  BO: '591',
  BH: '973',
  BI: '257',
  BJ: '229',
  BT: '975',
  JM: '+1-876',
  BV: '',
  BW: '267',
  WS: '685',
  BQ: '599',
  BR: '55',
  BS: '+1-242',
  JE: '+44-1534',
  BY: '375',
  BZ: '501',
  RU: '7',
  RW: '250',
  RS: '381',
  TL: '670',
  RE: '262',
  TM: '993',
  TJ: '992',
  RO: '40',
  TK: '690',
  GW: '245',
  GU: '+1-671',
  GT: '502',
  GS: '',
  GR: '30',
  GQ: '240',
  GP: '590',
  JP: '81',
  GY: '592',
  GG: '+44-1481',
  GF: '594',
  GE: '995',
  GD: '+1-473',
  GB: '44',
  GA: '241',
  SV: '503',
  GN: '224',
  GM: '220',
  GL: '299',
  GI: '350',
  GH: '233',
  OM: '968',
  TN: '216',
  JO: '962',
  HR: '385',
  HT: '509',
  HU: '36',
  HK: '852',
  HN: '504',
  HM: ' ',
  VE: '58',
  PR: '+1-787 and 1-939',
  PS: '970',
  PW: '680',
  PT: '351',
  SJ: '47',
  PY: '595',
  IQ: '964',
  PA: '507',
  PF: '689',
  PG: '675',
  PE: '51',
  PK: '92',
  PH: '63',
  PN: '870',
  PL: '48',
  PM: '508',
  ZM: '260',
  EH: '212',
  EE: '372',
  EG: '20',
  ZA: '27',
  EC: '593',
  IT: '39',
  VN: '84',
  SB: '677',
  ET: '251',
  SO: '252',
  ZW: '263',
  SA: '966',
  ES: '34',
  ER: '291',
  ME: '382',
  MD: '373',
  MG: '261',
  MF: '590',
  MA: '212',
  MC: '377',
  UZ: '998',
  MM: '95',
  ML: '223',
  MO: '853',
  MN: '976',
  MH: '692',
  MK: '389',
  MU: '230',
  MT: '356',
  MW: '265',
  MV: '960',
  MQ: '596',
  MP: '+1-670',
  MS: '+1-664',
  MR: '222',
  IM: '+44-1624',
  UG: '256',
  TZ: '255',
  MY: '60',
  MX: '52',
  IL: '972',
  FR: '33',
  IO: '246',
  SH: '290',
  FI: '358',
  FJ: '679',
  FK: '500',
  FM: '691',
  FO: '298',
  NI: '505',
  NL: '31',
  NO: '47',
  NA: '264',
  VU: '678',
  NC: '687',
  NE: '227',
  NF: '672',
  NG: '234',
  NZ: '64',
  NP: '977',
  NR: '674',
  NU: '683',
  CK: '682',
  XK: '',
  CI: '225',
  CH: '41',
  CO: '57',
  CN: '86',
  CM: '237',
  CL: '56',
  CC: '61',
  CA: '1',
  CG: '242',
  CF: '236',
  CD: '243',
  CZ: '420',
  CY: '357',
  CX: '61',
  CR: '506',
  CW: '599',
  CV: '238',
  CU: '53',
  SZ: '268',
  SY: '963',
  SX: '599',
  KG: '996',
  KE: '254',
  SS: '211',
  SR: '597',
  KI: '686',
  KH: '855',
  KN: '+1-869',
  KM: '269',
  ST: '239',
  SK: '421',
  KR: '82',
  SI: '386',
  KP: '850',
  KW: '965',
  SN: '221',
  SM: '378',
  SL: '232',
  SC: '248',
  KZ: '7',
  KY: '+1-345',
  SG: '65',
  SE: '46',
  SD: '249',
  DO: '+1-809 and 1-829',
  DM: '+1-767',
  DJ: '253',
  DK: '45',
  VG: '+1-284',
  DE: '49',
  YE: '967',
  DZ: '213',
  US: '1',
  UY: '598',
  YT: '262',
  UM: '1',
  LB: '961',
  LC: '+1-758',
  LA: '856',
  TV: '688',
  TW: '886',
  TT: '+1-868',
  TR: '90',
  LK: '94',
  LI: '423',
  LV: '371',
  TO: '676',
  LT: '370',
  LU: '352',
  LR: '231',
  LS: '266',
  TH: '66',
  TF: '',
  TG: '228',
  TD: '235',
  TC: '+1-649',
  LY: '218',
  VA: '379',
  VC: '+1-784',
  AE: '971',
  AD: '376',
  AG: '+1-268',
  AF: '93',
  AI: '+1-264',
  VI: '+1-340',
  IS: '354',
  IR: '98',
  AM: '374',
  AL: '355',
  AO: '244',
  AQ: '',
  AS: '+1-684',
  AR: '54',
  AU: '61',
  AT: '43',
  AW: '297',
  IN: '91',
  AX: '+358-18',
  AZ: '994',
  IE: '353',
  ID: '62',
  UA: '380',
  QA: '974',
  MZ: '258',
};

export const COUNTRY_CODES = [
  {
    name: 'Afghanistan',
    dial_code: '+93',
    code: 'AF',
  },
  {
    name: 'Aland Islands',
    dial_code: '+358',
    code: 'AX',
  },
  {
    name: 'Albania',
    dial_code: '+355',
    code: 'AL',
  },
  {
    name: 'Algeria',
    dial_code: '+213',
    code: 'DZ',
  },
  {
    name: 'AmericanSamoa',
    dial_code: '+1684',
    code: 'AS',
  },
  {
    name: 'Andorra',
    dial_code: '+376',
    code: 'AD',
  },
  {
    name: 'Angola',
    dial_code: '+244',
    code: 'AO',
  },
  {
    name: 'Anguilla',
    dial_code: '+1264',
    code: 'AI',
  },
  {
    name: 'Antarctica',
    dial_code: '+672',
    code: 'AQ',
  },
  {
    name: 'Antigua and Barbuda',
    dial_code: '+1268',
    code: 'AG',
  },
  {
    name: 'Argentina',
    dial_code: '+54',
    code: 'AR',
  },
  {
    name: 'Armenia',
    dial_code: '+374',
    code: 'AM',
  },
  {
    name: 'Aruba',
    dial_code: '+297',
    code: 'AW',
  },
  {
    name: 'Australia',
    dial_code: '+61',
    code: 'AU',
  },
  {
    name: 'Austria',
    dial_code: '+43',
    code: 'AT',
  },
  {
    name: 'Azerbaijan',
    dial_code: '+994',
    code: 'AZ',
  },
  {
    name: 'Bahamas',
    dial_code: '+1242',
    code: 'BS',
  },
  {
    name: 'Bahrain',
    dial_code: '+973',
    code: 'BH',
  },
  {
    name: 'Bangladesh',
    dial_code: '+880',
    code: 'BD',
  },
  {
    name: 'Barbados',
    dial_code: '+1246',
    code: 'BB',
  },
  {
    name: 'Belarus',
    dial_code: '+375',
    code: 'BY',
  },
  {
    name: 'Belgium',
    dial_code: '+32',
    code: 'BE',
  },
  {
    name: 'Belize',
    dial_code: '+501',
    code: 'BZ',
  },
  {
    name: 'Benin',
    dial_code: '+229',
    code: 'BJ',
  },
  {
    name: 'Bermuda',
    dial_code: '+1441',
    code: 'BM',
  },
  {
    name: 'Bhutan',
    dial_code: '+975',
    code: 'BT',
  },
  {
    name: 'Bolivia, Plurinational State of',
    dial_code: '+591',
    code: 'BO',
  },
  {
    name: 'Bosnia and Herzegovina',
    dial_code: '+387',
    code: 'BA',
  },
  {
    name: 'Botswana',
    dial_code: '+267',
    code: 'BW',
  },
  {
    name: 'Brazil',
    dial_code: '+55',
    code: 'BR',
  },
  {
    name: 'British Indian Ocean Territory',
    dial_code: '+246',
    code: 'IO',
  },
  {
    name: 'Brunei Darussalam',
    dial_code: '+673',
    code: 'BN',
  },
  {
    name: 'Bulgaria',
    dial_code: '+359',
    code: 'BG',
  },
  {
    name: 'Burkina Faso',
    dial_code: '+226',
    code: 'BF',
  },
  {
    name: 'Burundi',
    dial_code: '+257',
    code: 'BI',
  },
  {
    name: 'Cambodia',
    dial_code: '+855',
    code: 'KH',
  },
  {
    name: 'Cameroon',
    dial_code: '+237',
    code: 'CM',
  },
  {
    name: 'Canada',
    dial_code: '+1',
    code: 'CA',
  },
  {
    name: 'Cape Verde',
    dial_code: '+238',
    code: 'CV',
  },
  {
    name: 'Cayman Islands',
    dial_code: '+ 345',
    code: 'KY',
  },
  {
    name: 'Central African Republic',
    dial_code: '+236',
    code: 'CF',
  },
  {
    name: 'Chad',
    dial_code: '+235',
    code: 'TD',
  },
  {
    name: 'Chile',
    dial_code: '+56',
    code: 'CL',
  },
  {
    name: 'China',
    dial_code: '+86',
    code: 'CN',
  },
  {
    name: 'Christmas Island',
    dial_code: '+61',
    code: 'CX',
  },
  {
    name: 'Cocos (Keeling) Islands',
    dial_code: '+61',
    code: 'CC',
  },
  {
    name: 'Colombia',
    dial_code: '+57',
    code: 'CO',
  },
  {
    name: 'Comoros',
    dial_code: '+269',
    code: 'KM',
  },
  {
    name: 'Congo',
    dial_code: '+242',
    code: 'CG',
  },
  {
    name: 'Congo, The Democratic Republic of the Congo',
    dial_code: '+243',
    code: 'CD',
  },
  {
    name: 'Cook Islands',
    dial_code: '+682',
    code: 'CK',
  },
  {
    name: 'Costa Rica',
    dial_code: '+506',
    code: 'CR',
  },
  {
    name: 'Cote d\'Ivoire',
    dial_code: '+225',
    code: 'CI',
  },
  {
    name: 'Croatia',
    dial_code: '+385',
    code: 'HR',
  },
  {
    name: 'Cuba',
    dial_code: '+53',
    code: 'CU',
  },
  {
    name: 'Cyprus',
    dial_code: '+357',
    code: 'CY',
  },
  {
    name: 'Czech Republic',
    dial_code: '+420',
    code: 'CZ',
  },
  {
    name: 'Denmark',
    dial_code: '+45',
    code: 'DK',
  },
  {
    name: 'Djibouti',
    dial_code: '+253',
    code: 'DJ',
  },
  {
    name: 'Dominica',
    dial_code: '+1767',
    code: 'DM',
  },
  {
    name: 'Dominican Republic',
    dial_code: '+1849',
    code: 'DO',
  },
  {
    name: 'Ecuador',
    dial_code: '+593',
    code: 'EC',
  },
  {
    name: 'Egypt',
    dial_code: '+20',
    code: 'EG',
  },
  {
    name: 'El Salvador',
    dial_code: '+503',
    code: 'SV',
  },
  {
    name: 'Equatorial Guinea',
    dial_code: '+240',
    code: 'GQ',
  },
  {
    name: 'Eritrea',
    dial_code: '+291',
    code: 'ER',
  },
  {
    name: 'Estonia',
    dial_code: '+372',
    code: 'EE',
  },
  {
    name: 'Ethiopia',
    dial_code: '+251',
    code: 'ET',
  },
  {
    name: 'Falkland Islands (Malvinas)',
    dial_code: '+500',
    code: 'FK',
  },
  {
    name: 'Faroe Islands',
    dial_code: '+298',
    code: 'FO',
  },
  {
    name: 'Fiji',
    dial_code: '+679',
    code: 'FJ',
  },
  {
    name: 'Finland',
    dial_code: '+358',
    code: 'FI',
  },
  {
    name: 'France',
    dial_code: '+33',
    code: 'FR',
  },
  {
    name: 'French Guiana',
    dial_code: '+594',
    code: 'GF',
  },
  {
    name: 'French Polynesia',
    dial_code: '+689',
    code: 'PF',
  },
  {
    name: 'Gabon',
    dial_code: '+241',
    code: 'GA',
  },
  {
    name: 'Gambia',
    dial_code: '+220',
    code: 'GM',
  },
  {
    name: 'Georgia',
    dial_code: '+995',
    code: 'GE',
  },
  {
    name: 'Germany',
    dial_code: '+49',
    code: 'DE',
  },
  {
    name: 'Ghana',
    dial_code: '+233',
    code: 'GH',
  },
  {
    name: 'Gibraltar',
    dial_code: '+350',
    code: 'GI',
  },
  {
    name: 'Greece',
    dial_code: '+30',
    code: 'GR',
  },
  {
    name: 'Greenland',
    dial_code: '+299',
    code: 'GL',
  },
  {
    name: 'Grenada',
    dial_code: '+1473',
    code: 'GD',
  },
  {
    name: 'Guadeloupe',
    dial_code: '+590',
    code: 'GP',
  },
  {
    name: 'Guam',
    dial_code: '+1671',
    code: 'GU',
  },
  {
    name: 'Guatemala',
    dial_code: '+502',
    code: 'GT',
  },
  {
    name: 'Guernsey',
    dial_code: '+44',
    code: 'GG',
  },
  {
    name: 'Guinea',
    dial_code: '+224',
    code: 'GN',
  },
  {
    name: 'Guinea-Bissau',
    dial_code: '+245',
    code: 'GW',
  },
  {
    name: 'Guyana',
    dial_code: '+595',
    code: 'GY',
  },
  {
    name: 'Haiti',
    dial_code: '+509',
    code: 'HT',
  },
  {
    name: 'Holy See (Vatican City State)',
    dial_code: '+379',
    code: 'VA',
  },
  {
    name: 'Honduras',
    dial_code: '+504',
    code: 'HN',
  },
  {
    name: 'Hong Kong',
    dial_code: '+852',
    code: 'HK',
  },
  {
    name: 'Hungary',
    dial_code: '+36',
    code: 'HU',
  },
  {
    name: 'Iceland',
    dial_code: '+354',
    code: 'IS',
  },
  {
    name: 'India',
    dial_code: '+91',
    code: 'IN',
  },
  {
    name: 'Indonesia',
    dial_code: '+62',
    code: 'ID',
  },
  {
    name: 'Iran, Islamic Republic of Persian Gulf',
    dial_code: '+98',
    code: 'IR',
  },
  {
    name: 'Iraq',
    dial_code: '+964',
    code: 'IQ',
  },
  {
    name: 'Ireland',
    dial_code: '+353',
    code: 'IE',
  },
  {
    name: 'Isle of Man',
    dial_code: '+44',
    code: 'IM',
  },
  {
    name: 'Israel',
    dial_code: '+972',
    code: 'IL',
  },
  {
    name: 'Italy',
    dial_code: '+39',
    code: 'IT',
  },
  {
    name: 'Jamaica',
    dial_code: '+1876',
    code: 'JM',
  },
  {
    name: 'Japan',
    dial_code: '+81',
    code: 'JP',
  },
  {
    name: 'Jersey',
    dial_code: '+44',
    code: 'JE',
  },
  {
    name: 'Jordan',
    dial_code: '+962',
    code: 'JO',
  },
  {
    name: 'Kazakhstan',
    dial_code: '+77',
    code: 'KZ',
  },
  {
    name: 'Kenya',
    dial_code: '+254',
    code: 'KE',
  },
  {
    name: 'Kiribati',
    dial_code: '+686',
    code: 'KI',
  },
  {
    name: 'Korea, Democratic People\'s Republic of Korea',
    dial_code: '+850',
    code: 'KP',
  },
  {
    name: 'Korea, Republic of South Korea',
    dial_code: '+82',
    code: 'KR',
  },
  {
    name: 'Kuwait',
    dial_code: '+965',
    code: 'KW',
  },
  {
    name: 'Kyrgyzstan',
    dial_code: '+996',
    code: 'KG',
  },
  {
    name: 'Laos',
    dial_code: '+856',
    code: 'LA',
  },
  {
    name: 'Latvia',
    dial_code: '+371',
    code: 'LV',
  },
  {
    name: 'Lebanon',
    dial_code: '+961',
    code: 'LB',
  },
  {
    name: 'Lesotho',
    dial_code: '+266',
    code: 'LS',
  },
  {
    name: 'Liberia',
    dial_code: '+231',
    code: 'LR',
  },
  {
    name: 'Libyan Arab Jamahiriya',
    dial_code: '+218',
    code: 'LY',
  },
  {
    name: 'Liechtenstein',
    dial_code: '+423',
    code: 'LI',
  },
  {
    name: 'Lithuania',
    dial_code: '+370',
    code: 'LT',
  },
  {
    name: 'Luxembourg',
    dial_code: '+352',
    code: 'LU',
  },
  {
    name: 'Macao',
    dial_code: '+853',
    code: 'MO',
  },
  {
    name: 'Macedonia',
    dial_code: '+389',
    code: 'MK',
  },
  {
    name: 'Madagascar',
    dial_code: '+261',
    code: 'MG',
  },
  {
    name: 'Malawi',
    dial_code: '+265',
    code: 'MW',
  },
  {
    name: 'Malaysia',
    dial_code: '+60',
    code: 'MY',
  },
  {
    name: 'Maldives',
    dial_code: '+960',
    code: 'MV',
  },
  {
    name: 'Mali',
    dial_code: '+223',
    code: 'ML',
  },
  {
    name: 'Malta',
    dial_code: '+356',
    code: 'MT',
  },
  {
    name: 'Marshall Islands',
    dial_code: '+692',
    code: 'MH',
  },
  {
    name: 'Martinique',
    dial_code: '+596',
    code: 'MQ',
  },
  {
    name: 'Mauritania',
    dial_code: '+222',
    code: 'MR',
  },
  {
    name: 'Mauritius',
    dial_code: '+230',
    code: 'MU',
  },
  {
    name: 'Mayotte',
    dial_code: '+262',
    code: 'YT',
  },
  {
    name: 'Mexico',
    dial_code: '+52',
    code: 'MX',
  },
  {
    name: 'Micronesia, Federated States of Micronesia',
    dial_code: '+691',
    code: 'FM',
  },
  {
    name: 'Moldova',
    dial_code: '+373',
    code: 'MD',
  },
  {
    name: 'Monaco',
    dial_code: '+377',
    code: 'MC',
  },
  {
    name: 'Mongolia',
    dial_code: '+976',
    code: 'MN',
  },
  {
    name: 'Montenegro',
    dial_code: '+382',
    code: 'ME',
  },
  {
    name: 'Montserrat',
    dial_code: '+1664',
    code: 'MS',
  },
  {
    name: 'Morocco',
    dial_code: '+212',
    code: 'MA',
  },
  {
    name: 'Mozambique',
    dial_code: '+258',
    code: 'MZ',
  },
  {
    name: 'Myanmar',
    dial_code: '+95',
    code: 'MM',
  },
  {
    name: 'Namibia',
    dial_code: '+264',
    code: 'NA',
  },
  {
    name: 'Nauru',
    dial_code: '+674',
    code: 'NR',
  },
  {
    name: 'Nepal',
    dial_code: '+977',
    code: 'NP',
  },
  {
    name: 'Netherlands',
    dial_code: '+31',
    code: 'NL',
  },
  {
    name: 'Netherlands Antilles',
    dial_code: '+599',
    code: 'AN',
  },
  {
    name: 'New Caledonia',
    dial_code: '+687',
    code: 'NC',
  },
  {
    name: 'New Zealand',
    dial_code: '+64',
    code: 'NZ',
  },
  {
    name: 'Nicaragua',
    dial_code: '+505',
    code: 'NI',
  },
  {
    name: 'Niger',
    dial_code: '+227',
    code: 'NE',
  },
  {
    name: 'Nigeria',
    dial_code: '+234',
    code: 'NG',
  },
  {
    name: 'Niue',
    dial_code: '+683',
    code: 'NU',
  },
  {
    name: 'Norfolk Island',
    dial_code: '+672',
    code: 'NF',
  },
  {
    name: 'Northern Mariana Islands',
    dial_code: '+1670',
    code: 'MP',
  },
  {
    name: 'Norway',
    dial_code: '+47',
    code: 'NO',
  },
  {
    name: 'Oman',
    dial_code: '+968',
    code: 'OM',
  },
  {
    name: 'Pakistan',
    dial_code: '+92',
    code: 'PK',
  },
  {
    name: 'Palau',
    dial_code: '+680',
    code: 'PW',
  },
  {
    name: 'Palestinian Territory, Occupied',
    dial_code: '+970',
    code: 'PS',
  },
  {
    name: 'Panama',
    dial_code: '+507',
    code: 'PA',
  },
  {
    name: 'Papua New Guinea',
    dial_code: '+675',
    code: 'PG',
  },
  {
    name: 'Paraguay',
    dial_code: '+595',
    code: 'PY',
  },
  {
    name: 'Peru',
    dial_code: '+51',
    code: 'PE',
  },
  {
    name: 'Philippines',
    dial_code: '+63',
    code: 'PH',
  },
  {
    name: 'Pitcairn',
    dial_code: '+872',
    code: 'PN',
  },
  {
    name: 'Poland',
    dial_code: '+48',
    code: 'PL',
  },
  {
    name: 'Portugal',
    dial_code: '+351',
    code: 'PT',
  },
  {
    name: 'Puerto Rico',
    dial_code: '+1939',
    code: 'PR',
  },
  {
    name: 'Qatar',
    dial_code: '+974',
    code: 'QA',
  },
  {
    name: 'Romania',
    dial_code: '+40',
    code: 'RO',
  },
  {
    name: 'Russia',
    dial_code: '+7',
    code: 'RU',
  },
  {
    name: 'Rwanda',
    dial_code: '+250',
    code: 'RW',
  },
  {
    name: 'Reunion',
    dial_code: '+262',
    code: 'RE',
  },
  {
    name: 'Saint Barthelemy',
    dial_code: '+590',
    code: 'BL',
  },
  {
    name: 'Saint Helena, Ascension and Tristan Da Cunha',
    dial_code: '+290',
    code: 'SH',
  },
  {
    name: 'Saint Kitts and Nevis',
    dial_code: '+1869',
    code: 'KN',
  },
  {
    name: 'Saint Lucia',
    dial_code: '+1758',
    code: 'LC',
  },
  {
    name: 'Saint Martin',
    dial_code: '+590',
    code: 'MF',
  },
  {
    name: 'Saint Pierre and Miquelon',
    dial_code: '+508',
    code: 'PM',
  },
  {
    name: 'Saint Vincent and the Grenadines',
    dial_code: '+1784',
    code: 'VC',
  },
  {
    name: 'Samoa',
    dial_code: '+685',
    code: 'WS',
  },
  {
    name: 'San Marino',
    dial_code: '+378',
    code: 'SM',
  },
  {
    name: 'Sao Tome and Principe',
    dial_code: '+239',
    code: 'ST',
  },
  {
    name: 'Saudi Arabia',
    dial_code: '+966',
    code: 'SA',
  },
  {
    name: 'Senegal',
    dial_code: '+221',
    code: 'SN',
  },
  {
    name: 'Serbia',
    dial_code: '+381',
    code: 'RS',
  },
  {
    name: 'Seychelles',
    dial_code: '+248',
    code: 'SC',
  },
  {
    name: 'Sierra Leone',
    dial_code: '+232',
    code: 'SL',
  },
  {
    name: 'Singapore',
    dial_code: '+65',
    code: 'SG',
  },
  {
    name: 'Slovakia',
    dial_code: '+421',
    code: 'SK',
  },
  {
    name: 'Slovenia',
    dial_code: '+386',
    code: 'SI',
  },
  {
    name: 'Solomon Islands',
    dial_code: '+677',
    code: 'SB',
  },
  {
    name: 'Somalia',
    dial_code: '+252',
    code: 'SO',
  },
  {
    name: 'South Africa',
    dial_code: '+27',
    code: 'ZA',
  },
  {
    name: 'South Sudan',
    dial_code: '+211',
    code: 'SS',
  },
  {
    name: 'South Georgia and the South Sandwich Islands',
    dial_code: '+500',
    code: 'GS',
  },
  {
    name: 'Spain',
    dial_code: '+34',
    code: 'ES',
  },
  {
    name: 'Sri Lanka',
    dial_code: '+94',
    code: 'LK',
  },
  {
    name: 'Sudan',
    dial_code: '+249',
    code: 'SD',
  },
  {
    name: 'Suriname',
    dial_code: '+597',
    code: 'SR',
  },
  {
    name: 'Svalbard and Jan Mayen',
    dial_code: '+47',
    code: 'SJ',
  },
  {
    name: 'Swaziland',
    dial_code: '+268',
    code: 'SZ',
  },
  {
    name: 'Sweden',
    dial_code: '+46',
    code: 'SE',
  },
  {
    name: 'Switzerland',
    dial_code: '+41',
    code: 'CH',
  },
  {
    name: 'Syrian Arab Republic',
    dial_code: '+963',
    code: 'SY',
  },
  {
    name: 'Taiwan',
    dial_code: '+886',
    code: 'TW',
  },
  {
    name: 'Tajikistan',
    dial_code: '+992',
    code: 'TJ',
  },
  {
    name: 'Tanzania, United Republic of Tanzania',
    dial_code: '+255',
    code: 'TZ',
  },
  {
    name: 'Thailand',
    dial_code: '+66',
    code: 'TH',
  },
  {
    name: 'Timor-Leste',
    dial_code: '+670',
    code: 'TL',
  },
  {
    name: 'Togo',
    dial_code: '+228',
    code: 'TG',
  },
  {
    name: 'Tokelau',
    dial_code: '+690',
    code: 'TK',
  },
  {
    name: 'Tonga',
    dial_code: '+676',
    code: 'TO',
  },
  {
    name: 'Trinidad and Tobago',
    dial_code: '+1868',
    code: 'TT',
  },
  {
    name: 'Tunisia',
    dial_code: '+216',
    code: 'TN',
  },
  {
    name: 'Turkey',
    dial_code: '+90',
    code: 'TR',
  },
  {
    name: 'Turkmenistan',
    dial_code: '+993',
    code: 'TM',
  },
  {
    name: 'Turks and Caicos Islands',
    dial_code: '+1649',
    code: 'TC',
  },
  {
    name: 'Tuvalu',
    dial_code: '+688',
    code: 'TV',
  },
  {
    name: 'Uganda',
    dial_code: '+256',
    code: 'UG',
  },
  {
    name: 'Ukraine',
    dial_code: '+380',
    code: 'UA',
  },
  {
    name: 'United Arab Emirates',
    dial_code: '+971',
    code: 'AE',
  },
  {
    name: 'United Kingdom',
    dial_code: '+44',
    code: 'GB',
  },
  {
    name: 'United States',
    dial_code: '+1',
    code: 'US',
  },
  {
    name: 'Uruguay',
    dial_code: '+598',
    code: 'UY',
  },
  {
    name: 'Uzbekistan',
    dial_code: '+998',
    code: 'UZ',
  },
  {
    name: 'Vanuatu',
    dial_code: '+678',
    code: 'VU',
  },
  {
    name: 'Venezuela, Bolivarian Republic of Venezuela',
    dial_code: '+58',
    code: 'VE',
  },
  {
    name: 'Vietnam',
    dial_code: '+84',
    code: 'VN',
  },
  {
    name: 'Virgin Islands, British',
    dial_code: '+1284',
    code: 'VG',
  },
  {
    name: 'Virgin Islands, U.S.',
    dial_code: '+1340',
    code: 'VI',
  },
  {
    name: 'Wallis and Futuna',
    dial_code: '+681',
    code: 'WF',
  },
  {
    name: 'Yemen',
    dial_code: '+967',
    code: 'YE',
  },
  {
    name: 'Zambia',
    dial_code: '+260',
    code: 'ZM',
  },
  {
    name: 'Zimbabwe',
    dial_code: '+263',
    code: 'ZW',
  },
];
