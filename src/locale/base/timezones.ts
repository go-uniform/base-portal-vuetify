export interface Timezone {
    local: boolean;
    daylightSavings: boolean;
    offset: number;
    value: string;
    text: string;
    name: string;
    utc: string;
    time: string;
}

const timezones = [
    {
        name: 'Africa/Abidjan',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'Africa/Accra',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'Africa/Addis_Ababa',
        offset: 10800,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Africa/Algiers',
        offset: 3600,
        offsetDaylightSavings: 3600
    },
    {
        name: 'Africa/Asmara',
        offset: 10800,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Africa/Asmera',
        offset: 10800,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Africa/Bamako',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'Africa/Bangui',
        offset: 3600,
        offsetDaylightSavings: 3600
    },
    {
        name: 'Africa/Banjul',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'Africa/Bissau',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'Africa/Blantyre',
        offset: 7200,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Africa/Brazzaville',
        offset: 3600,
        offsetDaylightSavings: 3600
    },
    {
        name: 'Africa/Bujumbura',
        offset: 7200,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Africa/Cairo',
        offset: 7200,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Africa/Casablanca',
        offset: 0,
        offsetDaylightSavings: 3600
    },
    {
        name: 'Africa/Ceuta',
        offset: 3600,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Africa/Conakry',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'Africa/Dakar',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'Africa/Dar_es_Salaam',
        offset: 10800,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Africa/Djibouti',
        offset: 10800,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Africa/Douala',
        offset: 3600,
        offsetDaylightSavings: 3600
    },
    {
        name: 'Africa/El_Aaiun',
        offset: 0,
        offsetDaylightSavings: 3600
    },
    {
        name: 'Africa/Freetown',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'Africa/Gaborone',
        offset: 7200,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Africa/Harare',
        offset: 7200,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Africa/Johannesburg',
        offset: 7200,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Africa/Juba',
        offset: 10800,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Africa/Kampala',
        offset: 10800,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Africa/Khartoum',
        offset: 10800,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Africa/Kigali',
        offset: 7200,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Africa/Kinshasa',
        offset: 3600,
        offsetDaylightSavings: 3600
    },
    {
        name: 'Africa/Lagos',
        offset: 3600,
        offsetDaylightSavings: 3600
    },
    {
        name: 'Africa/Libreville',
        offset: 3600,
        offsetDaylightSavings: 3600
    },
    {
        name: 'Africa/Lome',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'Africa/Luanda',
        offset: 3600,
        offsetDaylightSavings: 3600
    },
    {
        name: 'Africa/Lubumbashi',
        offset: 7200,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Africa/Lusaka',
        offset: 7200,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Africa/Malabo',
        offset: 3600,
        offsetDaylightSavings: 3600
    },
    {
        name: 'Africa/Maputo',
        offset: 7200,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Africa/Maseru',
        offset: 7200,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Africa/Mbabane',
        offset: 7200,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Africa/Mogadishu',
        offset: 10800,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Africa/Monrovia',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'Africa/Nairobi',
        offset: 10800,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Africa/Ndjamena',
        offset: 3600,
        offsetDaylightSavings: 3600
    },
    {
        name: 'Africa/Niamey',
        offset: 3600,
        offsetDaylightSavings: 3600
    },
    {
        name: 'Africa/Nouakchott',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'Africa/Ouagadougou',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'Africa/Porto-Novo',
        offset: 3600,
        offsetDaylightSavings: 3600
    },
    {
        name: 'Africa/Sao_Tome',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'Africa/Timbuktu',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'Africa/Tripoli',
        offset: 7200,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Africa/Tunis',
        offset: 3600,
        offsetDaylightSavings: 3600
    },
    {
        name: 'Africa/Windhoek',
        offset: 3600,
        offsetDaylightSavings: 7200
    },
    {
        name: 'America/Adak',
        offset: -36000,
        offsetDaylightSavings: -32400
    },
    {
        name: 'America/Anchorage',
        offset: -32400,
        offsetDaylightSavings: -28800
    },
    {
        name: 'America/Anguilla',
        offset: -14400,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Antigua',
        offset: -14400,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Araguaina',
        offset: -10800,
        offsetDaylightSavings: -10800
    },
    {
        name: 'America/Argentina/Buenos_Aires',
        offset: -10800,
        offsetDaylightSavings: -10800
    },
    {
        name: 'America/Argentina/Catamarca',
        offset: -10800,
        offsetDaylightSavings: -10800
    },
    {
        name: 'America/Argentina/ComodRivadavia',
        offset: -10800,
        offsetDaylightSavings: -10800
    },
    {
        name: 'America/Argentina/Cordoba',
        offset: -10800,
        offsetDaylightSavings: -10800
    },
    {
        name: 'America/Argentina/Jujuy',
        offset: -10800,
        offsetDaylightSavings: -10800
    },
    {
        name: 'America/Argentina/La_Rioja',
        offset: -10800,
        offsetDaylightSavings: -10800
    },
    {
        name: 'America/Argentina/Mendoza',
        offset: -10800,
        offsetDaylightSavings: -10800
    },
    {
        name: 'America/Argentina/Rio_Gallegos',
        offset: -10800,
        offsetDaylightSavings: -10800
    },
    {
        name: 'America/Argentina/Salta',
        offset: -10800,
        offsetDaylightSavings: -10800
    },
    {
        name: 'America/Argentina/San_Juan',
        offset: -10800,
        offsetDaylightSavings: -10800
    },
    {
        name: 'America/Argentina/San_Luis',
        offset: -10800,
        offsetDaylightSavings: -10800
    },
    {
        name: 'America/Argentina/Tucuman',
        offset: -10800,
        offsetDaylightSavings: -10800
    },
    {
        name: 'America/Argentina/Ushuaia',
        offset: -10800,
        offsetDaylightSavings: -10800
    },
    {
        name: 'America/Aruba',
        offset: -14400,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Asuncion',
        offset: -10800,
        offsetDaylightSavings: -10800
    },
    {
        name: 'America/Atikokan',
        offset: -18000,
        offsetDaylightSavings: -18000
    },
    {
        name: 'America/Atka',
        offset: -36000,
        offsetDaylightSavings: -32400
    },
    {
        name: 'America/Bahia',
        offset: -10800,
        offsetDaylightSavings: -10800
    },
    {
        name: 'America/Bahia_Banderas',
        offset: -21600,
        offsetDaylightSavings: -18000
    },
    {
        name: 'America/Barbados',
        offset: -14400,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Belem',
        offset: -10800,
        offsetDaylightSavings: -10800
    },
    {
        name: 'America/Belize',
        offset: -21600,
        offsetDaylightSavings: -21600
    },
    {
        name: 'America/Blanc-Sablon',
        offset: -14400,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Boa_Vista',
        offset: -14400,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Bogota',
        offset: -18000,
        offsetDaylightSavings: -18000
    },
    {
        name: 'America/Boise',
        offset: -25200,
        offsetDaylightSavings: -21600
    },
    {
        name: 'America/Buenos_Aires',
        offset: -10800,
        offsetDaylightSavings: -10800
    },
    {
        name: 'America/Cambridge_Bay',
        offset: -25200,
        offsetDaylightSavings: -21600
    },
    {
        name: 'America/Campo_Grande',
        offset: -14400,
        offsetDaylightSavings: -10800
    },
    {
        name: 'America/Cancun',
        offset: -18000,
        offsetDaylightSavings: -18000
    },
    {
        name: 'America/Caracas',
        offset: -16200,
        offsetDaylightSavings: -16200
    },
    {
        name: 'America/Catamarca',
        offset: -10800,
        offsetDaylightSavings: -10800
    },
    {
        name: 'America/Cayenne',
        offset: -10800,
        offsetDaylightSavings: -10800
    },
    {
        name: 'America/Cayman',
        offset: -18000,
        offsetDaylightSavings: -18000
    },
    {
        name: 'America/Chicago',
        offset: -21600,
        offsetDaylightSavings: -18000
    },
    {
        name: 'America/Chihuahua',
        offset: -25200,
        offsetDaylightSavings: -21600
    },
    {
        name: 'America/Coral_Harbour',
        offset: -18000,
        offsetDaylightSavings: -18000
    },
    {
        name: 'America/Cordoba',
        offset: -10800,
        offsetDaylightSavings: -10800
    },
    {
        name: 'America/Costa_Rica',
        offset: -21600,
        offsetDaylightSavings: -21600
    },
    {
        name: 'America/Creston',
        offset: -25200,
        offsetDaylightSavings: -25200
    },
    {
        name: 'America/Cuiaba',
        offset: -14400,
        offsetDaylightSavings: -10800
    },
    {
        name: 'America/Curacao',
        offset: -14400,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Danmarkshavn',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'America/Dawson',
        offset: -28800,
        offsetDaylightSavings: -25200
    },
    {
        name: 'America/Dawson_Creek',
        offset: -25200,
        offsetDaylightSavings: -25200
    },
    {
        name: 'America/Denver',
        offset: -25200,
        offsetDaylightSavings: -21600
    },
    {
        name: 'America/Detroit',
        offset: -18000,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Dominica',
        offset: -14400,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Edmonton',
        offset: -25200,
        offsetDaylightSavings: -21600
    },
    {
        name: 'America/Eirunepe',
        offset: -18000,
        offsetDaylightSavings: -18000
    },
    {
        name: 'America/El_Salvador',
        offset: -21600,
        offsetDaylightSavings: -21600
    },
    {
        name: 'America/Ensenada',
        offset: -28800,
        offsetDaylightSavings: -25200
    },
    {
        name: 'America/Fort_Nelson',
        offset: -25200,
        offsetDaylightSavings: -25200
    },
    {
        name: 'America/Fort_Wayne',
        offset: -18000,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Fortaleza',
        offset: -10800,
        offsetDaylightSavings: -10800
    },
    {
        name: 'America/Glace_Bay',
        offset: -14400,
        offsetDaylightSavings: -10800
    },
    {
        name: 'America/Godthab',
        offset: -10800,
        offsetDaylightSavings: -7200
    },
    {
        name: 'America/Goose_Bay',
        offset: -14400,
        offsetDaylightSavings: -10800
    },
    {
        name: 'America/Grand_Turk',
        offset: -14400,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Grenada',
        offset: -14400,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Guadeloupe',
        offset: -14400,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Guatemala',
        offset: -21600,
        offsetDaylightSavings: -21600
    },
    {
        name: 'America/Guayaquil',
        offset: -18000,
        offsetDaylightSavings: -18000
    },
    {
        name: 'America/Guyana',
        offset: -14400,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Halifax',
        offset: -14400,
        offsetDaylightSavings: -10800
    },
    {
        name: 'America/Havana',
        offset: -18000,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Hermosillo',
        offset: -25200,
        offsetDaylightSavings: -25200
    },
    {
        name: 'America/Indiana/Indianapolis',
        offset: -18000,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Indiana/Knox',
        offset: -21600,
        offsetDaylightSavings: -18000
    },
    {
        name: 'America/Indiana/Marengo',
        offset: -18000,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Indiana/Petersburg',
        offset: -18000,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Indiana/Tell_City',
        offset: -21600,
        offsetDaylightSavings: -18000
    },
    {
        name: 'America/Indiana/Vevay',
        offset: -18000,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Indiana/Vincennes',
        offset: -18000,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Indiana/Winamac',
        offset: -18000,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Indianapolis',
        offset: -18000,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Inuvik',
        offset: -25200,
        offsetDaylightSavings: -21600
    },
    {
        name: 'America/Iqaluit',
        offset: -18000,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Jamaica',
        offset: -18000,
        offsetDaylightSavings: -18000
    },
    {
        name: 'America/Jujuy',
        offset: -10800,
        offsetDaylightSavings: -10800
    },
    {
        name: 'America/Juneau',
        offset: -32400,
        offsetDaylightSavings: -28800
    },
    {
        name: 'America/Kentucky/Louisville',
        offset: -18000,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Kentucky/Monticello',
        offset: -18000,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Knox_IN',
        offset: -21600,
        offsetDaylightSavings: -18000
    },
    {
        name: 'America/Kralendijk',
        offset: -14400,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/La_Paz',
        offset: -14400,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Lima',
        offset: -18000,
        offsetDaylightSavings: -18000
    },
    {
        name: 'America/Los_Angeles',
        offset: -28800,
        offsetDaylightSavings: -25200
    },
    {
        name: 'America/Louisville',
        offset: -18000,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Lower_Princes',
        offset: -14400,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Maceio',
        offset: -10800,
        offsetDaylightSavings: -10800
    },
    {
        name: 'America/Managua',
        offset: -21600,
        offsetDaylightSavings: -21600
    },
    {
        name: 'America/Manaus',
        offset: -14400,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Marigot',
        offset: -14400,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Martinique',
        offset: -14400,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Matamoros',
        offset: -21600,
        offsetDaylightSavings: -18000
    },
    {
        name: 'America/Mazatlan',
        offset: -25200,
        offsetDaylightSavings: -21600
    },
    {
        name: 'America/Mendoza',
        offset: -10800,
        offsetDaylightSavings: -10800
    },
    {
        name: 'America/Menominee',
        offset: -21600,
        offsetDaylightSavings: -18000
    },
    {
        name: 'America/Merida',
        offset: -21600,
        offsetDaylightSavings: -18000
    },
    {
        name: 'America/Metlakatla',
        offset: -28800,
        offsetDaylightSavings: -28800
    },
    {
        name: 'America/Mexico_City',
        offset: -21600,
        offsetDaylightSavings: -18000
    },
    {
        name: 'America/Miquelon',
        offset: -10800,
        offsetDaylightSavings: -7200
    },
    {
        name: 'America/Moncton',
        offset: -14400,
        offsetDaylightSavings: -10800
    },
    {
        name: 'America/Monterrey',
        offset: -21600,
        offsetDaylightSavings: -18000
    },
    {
        name: 'America/Montevideo',
        offset: -10800,
        offsetDaylightSavings: -7200
    },
    {
        name: 'America/Montreal',
        offset: -18000,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Montserrat',
        offset: -14400,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Nassau',
        offset: -18000,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/New_York',
        offset: -18000,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Nipigon',
        offset: -18000,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Nome',
        offset: -32400,
        offsetDaylightSavings: -28800
    },
    {
        name: 'America/Noronha',
        offset: -7200,
        offsetDaylightSavings: -7200
    },
    {
        name: 'America/North_Dakota/Beulah',
        offset: -21600,
        offsetDaylightSavings: -18000
    },
    {
        name: 'America/North_Dakota/Center',
        offset: -21600,
        offsetDaylightSavings: -18000
    },
    {
        name: 'America/North_Dakota/New_Salem',
        offset: -21600,
        offsetDaylightSavings: -18000
    },
    {
        name: 'America/Ojinaga',
        offset: -25200,
        offsetDaylightSavings: -21600
    },
    {
        name: 'America/Panama',
        offset: -18000,
        offsetDaylightSavings: -18000
    },
    {
        name: 'America/Pangnirtung',
        offset: -18000,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Paramaribo',
        offset: -10800,
        offsetDaylightSavings: -10800
    },
    {
        name: 'America/Phoenix',
        offset: -25200,
        offsetDaylightSavings: -25200
    },
    {
        name: 'America/Port-au-Prince',
        offset: -18000,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Port_of_Spain',
        offset: -14400,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Porto_Acre',
        offset: -18000,
        offsetDaylightSavings: -18000
    },
    {
        name: 'America/Porto_Velho',
        offset: -14400,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Puerto_Rico',
        offset: -14400,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Rainy_River',
        offset: -21600,
        offsetDaylightSavings: -18000
    },
    {
        name: 'America/Rankin_Inlet',
        offset: -21600,
        offsetDaylightSavings: -18000
    },
    {
        name: 'America/Recife',
        offset: -10800,
        offsetDaylightSavings: -10800
    },
    {
        name: 'America/Regina',
        offset: -21600,
        offsetDaylightSavings: -21600
    },
    {
        name: 'America/Resolute',
        offset: -21600,
        offsetDaylightSavings: -18000
    },
    {
        name: 'America/Rio_Branco',
        offset: -18000,
        offsetDaylightSavings: -18000
    },
    {
        name: 'America/Rosario',
        offset: -10800,
        offsetDaylightSavings: -10800
    },
    {
        name: 'America/Santa_Isabel',
        offset: -28800,
        offsetDaylightSavings: -25200
    },
    {
        name: 'America/Santarem',
        offset: -10800,
        offsetDaylightSavings: -10800
    },
    {
        name: 'America/Santiago',
        offset: -10800,
        offsetDaylightSavings: -10800
    },
    {
        name: 'America/Santo_Domingo',
        offset: -14400,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Sao_Paulo',
        offset: -10800,
        offsetDaylightSavings: -7200
    },
    {
        name: 'America/Scoresbysund',
        offset: -3600,
        offsetDaylightSavings: 0
    },
    {
        name: 'America/Shiprock',
        offset: -25200,
        offsetDaylightSavings: -21600
    },
    {
        name: 'America/Sitka',
        offset: -32400,
        offsetDaylightSavings: -28800
    },
    {
        name: 'America/St_Barthelemy',
        offset: -14400,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/St_Johns',
        offset: -12600,
        offsetDaylightSavings: -9000
    },
    {
        name: 'America/St_Kitts',
        offset: -14400,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/St_Lucia',
        offset: -14400,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/St_Thomas',
        offset: -14400,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/St_Vincent',
        offset: -14400,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Swift_Current',
        offset: -21600,
        offsetDaylightSavings: -21600
    },
    {
        name: 'America/Tegucigalpa',
        offset: -21600,
        offsetDaylightSavings: -21600
    },
    {
        name: 'America/Thule',
        offset: -14400,
        offsetDaylightSavings: -10800
    },
    {
        name: 'America/Thunder_Bay',
        offset: -18000,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Tijuana',
        offset: -28800,
        offsetDaylightSavings: -25200
    },
    {
        name: 'America/Toronto',
        offset: -18000,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Tortola',
        offset: -14400,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Vancouver',
        offset: -28800,
        offsetDaylightSavings: -25200
    },
    {
        name: 'America/Virgin',
        offset: -14400,
        offsetDaylightSavings: -14400
    },
    {
        name: 'America/Whitehorse',
        offset: -28800,
        offsetDaylightSavings: -25200
    },
    {
        name: 'America/Winnipeg',
        offset: -21600,
        offsetDaylightSavings: -18000
    },
    {
        name: 'America/Yakutat',
        offset: -32400,
        offsetDaylightSavings: -28800
    },
    {
        name: 'America/Yellowknife',
        offset: -25200,
        offsetDaylightSavings: -21600
    },
    {
        name: 'Antarctica/Casey',
        offset: 28800,
        offsetDaylightSavings: 28800
    },
    {
        name: 'Antarctica/Davis',
        offset: 25200,
        offsetDaylightSavings: 25200
    },
    {
        name: 'Antarctica/DumontDUrville',
        offset: 36000,
        offsetDaylightSavings: 36000
    },
    {
        name: 'Antarctica/Macquarie',
        offset: 39600,
        offsetDaylightSavings: 39600
    },
    {
        name: 'Antarctica/Mawson',
        offset: 18000,
        offsetDaylightSavings: 18000
    },
    {
        name: 'Antarctica/McMurdo',
        offset: 43200,
        offsetDaylightSavings: 46800
    },
    {
        name: 'Antarctica/Palmer',
        offset: -10800,
        offsetDaylightSavings: -10800
    },
    {
        name: 'Antarctica/Rothera',
        offset: -10800,
        offsetDaylightSavings: -10800
    },
    {
        name: 'Antarctica/South_Pole',
        offset: 43200,
        offsetDaylightSavings: 46800
    },
    {
        name: 'Antarctica/Syowa',
        offset: 10800,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Antarctica/Troll',
        offset: 0,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Antarctica/Vostok',
        offset: 21600,
        offsetDaylightSavings: 21600
    },
    {
        name: 'Arctic/Longyearbyen',
        offset: 3600,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Asia/Aden',
        offset: 10800,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Asia/Almaty',
        offset: 21600,
        offsetDaylightSavings: 21600
    },
    {
        name: 'Asia/Amman',
        offset: 7200,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Asia/Anadyr',
        offset: 43200,
        offsetDaylightSavings: 43200
    },
    {
        name: 'Asia/Aqtau',
        offset: 18000,
        offsetDaylightSavings: 18000
    },
    {
        name: 'Asia/Aqtobe',
        offset: 18000,
        offsetDaylightSavings: 18000
    },
    {
        name: 'Asia/Ashgabat',
        offset: 18000,
        offsetDaylightSavings: 18000
    },
    {
        name: 'Asia/Ashkhabad',
        offset: 18000,
        offsetDaylightSavings: 18000
    },
    {
        name: 'Asia/Baghdad',
        offset: 10800,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Asia/Bahrain',
        offset: 10800,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Asia/Baku',
        offset: 14400,
        offsetDaylightSavings: 18000
    },
    {
        name: 'Asia/Bangkok',
        offset: 25200,
        offsetDaylightSavings: 25200
    },
    {
        name: 'Asia/Beirut',
        offset: 7200,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Asia/Bishkek',
        offset: 21600,
        offsetDaylightSavings: 21600
    },
    {
        name: 'Asia/Brunei',
        offset: 28800,
        offsetDaylightSavings: 28800
    },
    {
        name: 'Asia/Calcutta',
        offset: 19800,
        offsetDaylightSavings: 19800
    },
    {
        name: 'Asia/Chita',
        offset: 28800,
        offsetDaylightSavings: 28800
    },
    {
        name: 'Asia/Choibalsan',
        offset: 28800,
        offsetDaylightSavings: 32400
    },
    {
        name: 'Asia/Chongqing',
        offset: 28800,
        offsetDaylightSavings: 28800
    },
    {
        name: 'Asia/Chungking',
        offset: 28800,
        offsetDaylightSavings: 28800
    },
    {
        name: 'Asia/Colombo',
        offset: 19800,
        offsetDaylightSavings: 19800
    },
    {
        name: 'Asia/Dacca',
        offset: 21600,
        offsetDaylightSavings: 21600
    },
    {
        name: 'Asia/Damascus',
        offset: 7200,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Asia/Dhaka',
        offset: 21600,
        offsetDaylightSavings: 21600
    },
    {
        name: 'Asia/Dili',
        offset: 32400,
        offsetDaylightSavings: 32400
    },
    {
        name: 'Asia/Dubai',
        offset: 14400,
        offsetDaylightSavings: 14400
    },
    {
        name: 'Asia/Dushanbe',
        offset: 18000,
        offsetDaylightSavings: 18000
    },
    {
        name: 'Asia/Gaza',
        offset: 7200,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Asia/Harbin',
        offset: 28800,
        offsetDaylightSavings: 28800
    },
    {
        name: 'Asia/Hebron',
        offset: 7200,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Asia/Ho_Chi_Minh',
        offset: 25200,
        offsetDaylightSavings: 25200
    },
    {
        name: 'Asia/Hong_Kong',
        offset: 28800,
        offsetDaylightSavings: 28800
    },
    {
        name: 'Asia/Hovd',
        offset: 25200,
        offsetDaylightSavings: 28800
    },
    {
        name: 'Asia/Irkutsk',
        offset: 28800,
        offsetDaylightSavings: 28800
    },
    {
        name: 'Asia/Istanbul',
        offset: 7200,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Asia/Jakarta',
        offset: 25200,
        offsetDaylightSavings: 25200
    },
    {
        name: 'Asia/Jayapura',
        offset: 32400,
        offsetDaylightSavings: 32400
    },
    {
        name: 'Asia/Jerusalem',
        offset: 7200,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Asia/Kabul',
        offset: 16200,
        offsetDaylightSavings: 16200
    },
    {
        name: 'Asia/Kamchatka',
        offset: 43200,
        offsetDaylightSavings: 43200
    },
    {
        name: 'Asia/Karachi',
        offset: 18000,
        offsetDaylightSavings: 18000
    },
    {
        name: 'Asia/Kashgar',
        offset: 21600,
        offsetDaylightSavings: 21600
    },
    {
        name: 'Asia/Kathmandu',
        offset: 20700,
        offsetDaylightSavings: 20700
    },
    {
        name: 'Asia/Katmandu',
        offset: 20700,
        offsetDaylightSavings: 20700
    },
    {
        name: 'Asia/Khandyga',
        offset: 32400,
        offsetDaylightSavings: 32400
    },
    {
        name: 'Asia/Kolkata',
        offset: 19800,
        offsetDaylightSavings: 19800
    },
    {
        name: 'Asia/Krasnoyarsk',
        offset: 25200,
        offsetDaylightSavings: 25200
    },
    {
        name: 'Asia/Kuala_Lumpur',
        offset: 28800,
        offsetDaylightSavings: 28800
    },
    {
        name: 'Asia/Kuching',
        offset: 28800,
        offsetDaylightSavings: 28800
    },
    {
        name: 'Asia/Kuwait',
        offset: 10800,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Asia/Macao',
        offset: 28800,
        offsetDaylightSavings: 28800
    },
    {
        name: 'Asia/Macau',
        offset: 28800,
        offsetDaylightSavings: 28800
    },
    {
        name: 'Asia/Magadan',
        offset: 36000,
        offsetDaylightSavings: 36000
    },
    {
        name: 'Asia/Makassar',
        offset: 28800,
        offsetDaylightSavings: 28800
    },
    {
        name: 'Asia/Manila',
        offset: 28800,
        offsetDaylightSavings: 28800
    },
    {
        name: 'Asia/Muscat',
        offset: 14400,
        offsetDaylightSavings: 14400
    },
    {
        name: 'Asia/Nicosia',
        offset: 7200,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Asia/Novokuznetsk',
        offset: 25200,
        offsetDaylightSavings: 25200
    },
    {
        name: 'Asia/Novosibirsk',
        offset: 21600,
        offsetDaylightSavings: 21600
    },
    {
        name: 'Asia/Omsk',
        offset: 21600,
        offsetDaylightSavings: 21600
    },
    {
        name: 'Asia/Oral',
        offset: 18000,
        offsetDaylightSavings: 18000
    },
    {
        name: 'Asia/Phnom_Penh',
        offset: 25200,
        offsetDaylightSavings: 25200
    },
    {
        name: 'Asia/Pontianak',
        offset: 25200,
        offsetDaylightSavings: 25200
    },
    {
        name: 'Asia/Pyongyang',
        offset: 30600,
        offsetDaylightSavings: 30600
    },
    {
        name: 'Asia/Qatar',
        offset: 10800,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Asia/Qyzylorda',
        offset: 21600,
        offsetDaylightSavings: 21600
    },
    {
        name: 'Asia/Rangoon',
        offset: 23400,
        offsetDaylightSavings: 23400
    },
    {
        name: 'Asia/Riyadh',
        offset: 10800,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Asia/Riyadh87',
        offset: 10800,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Asia/Riyadh88',
        offset: 10800,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Asia/Riyadh89',
        offset: 10800,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Asia/Saigon',
        offset: 25200,
        offsetDaylightSavings: 25200
    },
    {
        name: 'Asia/Sakhalin',
        offset: 36000,
        offsetDaylightSavings: 36000
    },
    {
        name: 'Asia/Samarkand',
        offset: 18000,
        offsetDaylightSavings: 18000
    },
    {
        name: 'Asia/Seoul',
        offset: 32400,
        offsetDaylightSavings: 32400
    },
    {
        name: 'Asia/Shanghai',
        offset: 28800,
        offsetDaylightSavings: 28800
    },
    {
        name: 'Asia/Singapore',
        offset: 28800,
        offsetDaylightSavings: 28800
    },
    {
        name: 'Asia/Srednekolymsk',
        offset: 39600,
        offsetDaylightSavings: 39600
    },
    {
        name: 'Asia/Taipei',
        offset: 28800,
        offsetDaylightSavings: 28800
    },
    {
        name: 'Asia/Tashkent',
        offset: 18000,
        offsetDaylightSavings: 18000
    },
    {
        name: 'Asia/Tbilisi',
        offset: 14400,
        offsetDaylightSavings: 14400
    },
    {
        name: 'Asia/Tehran',
        offset: 12600,
        offsetDaylightSavings: 16200
    },
    {
        name: 'Asia/Tel_Aviv',
        offset: 7200,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Asia/Thimbu',
        offset: 21600,
        offsetDaylightSavings: 21600
    },
    {
        name: 'Asia/Thimphu',
        offset: 21600,
        offsetDaylightSavings: 21600
    },
    {
        name: 'Asia/Tokyo',
        offset: 32400,
        offsetDaylightSavings: 32400
    },
    {
        name: 'Asia/Ujung_Pandang',
        offset: 28800,
        offsetDaylightSavings: 28800
    },
    {
        name: 'Asia/Ulaanbaatar',
        offset: 28800,
        offsetDaylightSavings: 32400
    },
    {
        name: 'Asia/Ulan_Bator',
        offset: 28800,
        offsetDaylightSavings: 32400
    },
    {
        name: 'Asia/Urumqi',
        offset: 21600,
        offsetDaylightSavings: 21600
    },
    {
        name: 'Asia/Vientiane',
        offset: 25200,
        offsetDaylightSavings: 25200
    },
    {
        name: 'Asia/Vladivostok',
        offset: 36000,
        offsetDaylightSavings: 36000
    },
    {
        name: 'Asia/Yakutsk',
        offset: 32400,
        offsetDaylightSavings: 32400
    },
    {
        name: 'Asia/Yekaterinburg',
        offset: 18000,
        offsetDaylightSavings: 18000
    },
    {
        name: 'Asia/Yerevan',
        offset: 14400,
        offsetDaylightSavings: 14400
    },
    {
        name: 'Atlantic/Azores',
        offset: -3600,
        offsetDaylightSavings: 0
    },
    {
        name: 'Atlantic/Bermuda',
        offset: -14400,
        offsetDaylightSavings: -10800
    },
    {
        name: 'Atlantic/Canary',
        offset: 0,
        offsetDaylightSavings: 3600
    },
    {
        name: 'Atlantic/Cape_Verde',
        offset: -3600,
        offsetDaylightSavings: -3600
    },
    {
        name: 'Atlantic/Faeroe',
        offset: 0,
        offsetDaylightSavings: 3600
    },
    {
        name: 'Atlantic/Faroe',
        offset: 0,
        offsetDaylightSavings: 3600
    },
    {
        name: 'Atlantic/Jan_Mayen',
        offset: 3600,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Atlantic/Madeira',
        offset: 0,
        offsetDaylightSavings: 3600
    },
    {
        name: 'Atlantic/Reykjavik',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'Atlantic/South_Georgia',
        offset: -7200,
        offsetDaylightSavings: -7200
    },
    {
        name: 'Atlantic/St_Helena',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'Atlantic/Stanley',
        offset: -10800,
        offsetDaylightSavings: -10800
    },
    {
        name: 'Australia/ACT',
        offset: 36000,
        offsetDaylightSavings: 39600
    },
    {
        name: 'Australia/Adelaide',
        offset: 34200,
        offsetDaylightSavings: 37800
    },
    {
        name: 'Australia/Brisbane',
        offset: 36000,
        offsetDaylightSavings: 36000
    },
    {
        name: 'Australia/Broken_Hill',
        offset: 34200,
        offsetDaylightSavings: 37800
    },
    {
        name: 'Australia/Canberra',
        offset: 36000,
        offsetDaylightSavings: 39600
    },
    {
        name: 'Australia/Currie',
        offset: 36000,
        offsetDaylightSavings: 39600
    },
    {
        name: 'Australia/Darwin',
        offset: 34200,
        offsetDaylightSavings: 34200
    },
    {
        name: 'Australia/Eucla',
        offset: 31500,
        offsetDaylightSavings: 31500
    },
    {
        name: 'Australia/Hobart',
        offset: 36000,
        offsetDaylightSavings: 39600
    },
    {
        name: 'Australia/LHI',
        offset: 37800,
        offsetDaylightSavings: 39600
    },
    {
        name: 'Australia/Lindeman',
        offset: 36000,
        offsetDaylightSavings: 36000
    },
    {
        name: 'Australia/Lord_Howe',
        offset: 37800,
        offsetDaylightSavings: 39600
    },
    {
        name: 'Australia/Melbourne',
        offset: 36000,
        offsetDaylightSavings: 39600
    },
    {
        name: 'Australia/NSW',
        offset: 36000,
        offsetDaylightSavings: 39600
    },
    {
        name: 'Australia/North',
        offset: 34200,
        offsetDaylightSavings: 34200
    },
    {
        name: 'Australia/Perth',
        offset: 28800,
        offsetDaylightSavings: 28800
    },
    {
        name: 'Australia/Queensland',
        offset: 36000,
        offsetDaylightSavings: 36000
    },
    {
        name: 'Australia/South',
        offset: 34200,
        offsetDaylightSavings: 37800
    },
    {
        name: 'Australia/Sydney',
        offset: 36000,
        offsetDaylightSavings: 39600
    },
    {
        name: 'Australia/Tasmania',
        offset: 36000,
        offsetDaylightSavings: 39600
    },
    {
        name: 'Australia/Victoria',
        offset: 36000,
        offsetDaylightSavings: 39600
    },
    {
        name: 'Australia/West',
        offset: 28800,
        offsetDaylightSavings: 28800
    },
    {
        name: 'Australia/Yancowinna',
        offset: 34200,
        offsetDaylightSavings: 37800
    },
    {
        name: 'Brazil/Acre',
        offset: -18000,
        offsetDaylightSavings: -18000
    },
    {
        name: 'Brazil/DeNoronha',
        offset: -7200,
        offsetDaylightSavings: -7200
    },
    {
        name: 'Brazil/East',
        offset: -10800,
        offsetDaylightSavings: -7200
    },
    {
        name: 'Brazil/West',
        offset: -14400,
        offsetDaylightSavings: -14400
    },
    {
        name: 'CET',
        offset: 3600,
        offsetDaylightSavings: 7200
    },
    {
        name: 'CST6CDT',
        offset: -21600,
        offsetDaylightSavings: -18000
    },
    {
        name: 'Canada/Atlantic',
        offset: -14400,
        offsetDaylightSavings: -10800
    },
    {
        name: 'Canada/Central',
        offset: -21600,
        offsetDaylightSavings: -18000
    },
    {
        name: 'Canada/East-Saskatchewan',
        offset: -21600,
        offsetDaylightSavings: -21600
    },
    {
        name: 'Canada/Eastern',
        offset: -18000,
        offsetDaylightSavings: -14400
    },
    {
        name: 'Canada/Mountain',
        offset: -25200,
        offsetDaylightSavings: -21600
    },
    {
        name: 'Canada/Newfoundland',
        offset: -12600,
        offsetDaylightSavings: -9000
    },
    {
        name: 'Canada/Pacific',
        offset: -28800,
        offsetDaylightSavings: -25200
    },
    {
        name: 'Canada/Saskatchewan',
        offset: -21600,
        offsetDaylightSavings: -21600
    },
    {
        name: 'Canada/Yukon',
        offset: -28800,
        offsetDaylightSavings: -25200
    },
    {
        name: 'Chile/Continental',
        offset: -10800,
        offsetDaylightSavings: -10800
    },
    {
        name: 'Chile/EasterIsland',
        offset: -18000,
        offsetDaylightSavings: -18000
    },
    {
        name: 'Cuba',
        offset: -18000,
        offsetDaylightSavings: -14400
    },
    {
        name: 'EET',
        offset: 7200,
        offsetDaylightSavings: 10800
    },
    {
        name: 'EST',
        offset: -18000,
        offsetDaylightSavings: -18000
    },
    {
        name: 'EST5EDT',
        offset: -18000,
        offsetDaylightSavings: -14400
    },
    {
        name: 'Egypt',
        offset: 7200,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Eire',
        offset: 0,
        offsetDaylightSavings: 3600
    },
    {
        name: 'Etc/GMT',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'Etc/GMT+0',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'Etc/GMT+1',
        offset: -3600,
        offsetDaylightSavings: -3600
    },
    {
        name: 'Etc/GMT+10',
        offset: -36000,
        offsetDaylightSavings: -36000
    },
    {
        name: 'Etc/GMT+11',
        offset: -39600,
        offsetDaylightSavings: -39600
    },
    {
        name: 'Etc/GMT+12',
        offset: -43200,
        offsetDaylightSavings: -43200
    },
    {
        name: 'Etc/GMT+2',
        offset: -7200,
        offsetDaylightSavings: -7200
    },
    {
        name: 'Etc/GMT+3',
        offset: -10800,
        offsetDaylightSavings: -10800
    },
    {
        name: 'Etc/GMT+4',
        offset: -14400,
        offsetDaylightSavings: -14400
    },
    {
        name: 'Etc/GMT+5',
        offset: -18000,
        offsetDaylightSavings: -18000
    },
    {
        name: 'Etc/GMT+6',
        offset: -21600,
        offsetDaylightSavings: -21600
    },
    {
        name: 'Etc/GMT+7',
        offset: -25200,
        offsetDaylightSavings: -25200
    },
    {
        name: 'Etc/GMT+8',
        offset: -28800,
        offsetDaylightSavings: -28800
    },
    {
        name: 'Etc/GMT+9',
        offset: -32400,
        offsetDaylightSavings: -32400
    },
    {
        name: 'Etc/GMT-0',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'Etc/GMT-1',
        offset: 3600,
        offsetDaylightSavings: 3600
    },
    {
        name: 'Etc/GMT-10',
        offset: 36000,
        offsetDaylightSavings: 36000
    },
    {
        name: 'Etc/GMT-11',
        offset: 39600,
        offsetDaylightSavings: 39600
    },
    {
        name: 'Etc/GMT-12',
        offset: 43200,
        offsetDaylightSavings: 43200
    },
    {
        name: 'Etc/GMT-13',
        offset: 46800,
        offsetDaylightSavings: 46800
    },
    {
        name: 'Etc/GMT-14',
        offset: 50400,
        offsetDaylightSavings: 50400
    },
    {
        name: 'Etc/GMT-2',
        offset: 7200,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Etc/GMT-3',
        offset: 10800,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Etc/GMT-4',
        offset: 14400,
        offsetDaylightSavings: 14400
    },
    {
        name: 'Etc/GMT-5',
        offset: 18000,
        offsetDaylightSavings: 18000
    },
    {
        name: 'Etc/GMT-6',
        offset: 21600,
        offsetDaylightSavings: 21600
    },
    {
        name: 'Etc/GMT-7',
        offset: 25200,
        offsetDaylightSavings: 25200
    },
    {
        name: 'Etc/GMT-8',
        offset: 28800,
        offsetDaylightSavings: 28800
    },
    {
        name: 'Etc/GMT-9',
        offset: 32400,
        offsetDaylightSavings: 32400
    },
    {
        name: 'Etc/GMT0',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'Etc/Greenwich',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'Etc/UCT',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'Etc/UTC',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'Etc/Universal',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'Etc/Zulu',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'Europe/Amsterdam',
        offset: 3600,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Europe/Andorra',
        offset: 3600,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Europe/Athens',
        offset: 7200,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Europe/Belfast',
        offset: 0,
        offsetDaylightSavings: 3600
    },
    {
        name: 'Europe/Belgrade',
        offset: 3600,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Europe/Berlin',
        offset: 3600,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Europe/Bratislava',
        offset: 3600,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Europe/Brussels',
        offset: 3600,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Europe/Bucharest',
        offset: 7200,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Europe/Budapest',
        offset: 3600,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Europe/Busingen',
        offset: 3600,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Europe/Chisinau',
        offset: 7200,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Europe/Copenhagen',
        offset: 3600,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Europe/Dublin',
        offset: 0,
        offsetDaylightSavings: 3600
    },
    {
        name: 'Europe/Gibraltar',
        offset: 3600,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Europe/Guernsey',
        offset: 0,
        offsetDaylightSavings: 3600
    },
    {
        name: 'Europe/Helsinki',
        offset: 7200,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Europe/Isle_of_Man',
        offset: 0,
        offsetDaylightSavings: 3600
    },
    {
        name: 'Europe/Istanbul',
        offset: 7200,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Europe/Jersey',
        offset: 0,
        offsetDaylightSavings: 3600
    },
    {
        name: 'Europe/Kaliningrad',
        offset: 7200,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Europe/Kiev',
        offset: 7200,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Europe/Lisbon',
        offset: 0,
        offsetDaylightSavings: 3600
    },
    {
        name: 'Europe/Ljubljana',
        offset: 3600,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Europe/London',
        offset: 0,
        offsetDaylightSavings: 3600
    },
    {
        name: 'Europe/Luxembourg',
        offset: 3600,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Europe/Madrid',
        offset: 3600,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Europe/Malta',
        offset: 3600,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Europe/Mariehamn',
        offset: 7200,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Europe/Minsk',
        offset: 10800,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Europe/Monaco',
        offset: 3600,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Europe/Moscow',
        offset: 10800,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Europe/Nicosia',
        offset: 7200,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Europe/Oslo',
        offset: 3600,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Europe/Paris',
        offset: 3600,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Europe/Podgorica',
        offset: 3600,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Europe/Prague',
        offset: 3600,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Europe/Riga',
        offset: 7200,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Europe/Rome',
        offset: 3600,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Europe/Samara',
        offset: 14400,
        offsetDaylightSavings: 14400
    },
    {
        name: 'Europe/San_Marino',
        offset: 3600,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Europe/Sarajevo',
        offset: 3600,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Europe/Simferopol',
        offset: 7200,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Europe/Skopje',
        offset: 3600,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Europe/Sofia',
        offset: 7200,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Europe/Stockholm',
        offset: 3600,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Europe/Tallinn',
        offset: 7200,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Europe/Tirane',
        offset: 3600,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Europe/Tiraspol',
        offset: 7200,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Europe/Uzhgorod',
        offset: 7200,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Europe/Vaduz',
        offset: 3600,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Europe/Vatican',
        offset: 3600,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Europe/Vienna',
        offset: 3600,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Europe/Vilnius',
        offset: 7200,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Europe/Volgograd',
        offset: 10800,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Europe/Warsaw',
        offset: 3600,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Europe/Zagreb',
        offset: 3600,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Europe/Zaporozhye',
        offset: 7200,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Europe/Zurich',
        offset: 3600,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Factory',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'GB',
        offset: 0,
        offsetDaylightSavings: 3600
    },
    {
        name: 'GB-Eire',
        offset: 0,
        offsetDaylightSavings: 3600
    },
    {
        name: 'GMT',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'GMT+0',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'GMT-0',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'GMT0',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'Greenwich',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'HST',
        offset: -36000,
        offsetDaylightSavings: -36000
    },
    {
        name: 'Hongkong',
        offset: 28800,
        offsetDaylightSavings: 28800
    },
    {
        name: 'Iceland',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'Indian/Antananarivo',
        offset: 10800,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Indian/Chagos',
        offset: 21600,
        offsetDaylightSavings: 21600
    },
    {
        name: 'Indian/Christmas',
        offset: 25200,
        offsetDaylightSavings: 25200
    },
    {
        name: 'Indian/Cocos',
        offset: 23400,
        offsetDaylightSavings: 23400
    },
    {
        name: 'Indian/Comoro',
        offset: 10800,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Indian/Kerguelen',
        offset: 18000,
        offsetDaylightSavings: 18000
    },
    {
        name: 'Indian/Mahe',
        offset: 14400,
        offsetDaylightSavings: 14400
    },
    {
        name: 'Indian/Maldives',
        offset: 18000,
        offsetDaylightSavings: 18000
    },
    {
        name: 'Indian/Mauritius',
        offset: 14400,
        offsetDaylightSavings: 14400
    },
    {
        name: 'Indian/Mayotte',
        offset: 10800,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Indian/Reunion',
        offset: 14400,
        offsetDaylightSavings: 14400
    },
    {
        name: 'Iran',
        offset: 12600,
        offsetDaylightSavings: 16200
    },
    {
        name: 'Israel',
        offset: 7200,
        offsetDaylightSavings: 10800
    },
    {
        name: 'Jamaica',
        offset: -18000,
        offsetDaylightSavings: -18000
    },
    {
        name: 'Japan',
        offset: 32400,
        offsetDaylightSavings: 32400
    },
    {
        name: 'Kwajalein',
        offset: 43200,
        offsetDaylightSavings: 43200
    },
    {
        name: 'Libya',
        offset: 7200,
        offsetDaylightSavings: 7200
    },
    {
        name: 'MET',
        offset: 3600,
        offsetDaylightSavings: 7200
    },
    {
        name: 'MST',
        offset: -25200,
        offsetDaylightSavings: -25200
    },
    {
        name: 'MST7MDT',
        offset: -25200,
        offsetDaylightSavings: -21600
    },
    {
        name: 'Mexico/BajaNorte',
        offset: -28800,
        offsetDaylightSavings: -25200
    },
    {
        name: 'Mexico/BajaSur',
        offset: -25200,
        offsetDaylightSavings: -21600
    },
    {
        name: 'Mexico/General',
        offset: -21600,
        offsetDaylightSavings: -18000
    },
    {
        name: 'Mideast/Riyadh87',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'Mideast/Riyadh88',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'Mideast/Riyadh89',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'NZ',
        offset: 43200,
        offsetDaylightSavings: 46800
    },
    {
        name: 'NZ-CHAT',
        offset: 45900,
        offsetDaylightSavings: 49500
    },
    {
        name: 'Navajo',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'PRC',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'PST8PDT',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'Pacific/Apia',
        offset: 46800,
        offsetDaylightSavings: 50400
    },
    {
        name: 'Pacific/Auckland',
        offset: 43200,
        offsetDaylightSavings: 46800
    },
    {
        name: 'Pacific/Bougainville',
        offset: 39600,
        offsetDaylightSavings: 39600
    },
    {
        name: 'Pacific/Chatham',
        offset: 45900,
        offsetDaylightSavings: 49500
    },
    {
        name: 'Pacific/Chuuk',
        offset: 36000,
        offsetDaylightSavings: 36000
    },
    {
        name: 'Pacific/Easter',
        offset: -18000,
        offsetDaylightSavings: -18000
    },
    {
        name: 'Pacific/Efate',
        offset: 39600,
        offsetDaylightSavings: 39600
    },
    {
        name: 'Pacific/Enderbury',
        offset: 46800,
        offsetDaylightSavings: 46800
    },
    {
        name: 'Pacific/Fakaofo',
        offset: 46800,
        offsetDaylightSavings: 46800
    },
    {
        name: 'Pacific/Fiji',
        offset: 43200,
        offsetDaylightSavings: 46800
    },
    {
        name: 'Pacific/Funafuti',
        offset: 43200,
        offsetDaylightSavings: 43200
    },
    {
        name: 'Pacific/Galapagos',
        offset: -21600,
        offsetDaylightSavings: -21600
    },
    {
        name: 'Pacific/Gambier',
        offset: -32400,
        offsetDaylightSavings: -32400
    },
    {
        name: 'Pacific/Guadalcanal',
        offset: 39600,
        offsetDaylightSavings: 39600
    },
    {
        name: 'Pacific/Guam',
        offset: 36000,
        offsetDaylightSavings: 36000
    },
    {
        name: 'Pacific/Honolulu',
        offset: -36000,
        offsetDaylightSavings: -36000
    },
    {
        name: 'Pacific/Johnston',
        offset: -36000,
        offsetDaylightSavings: -36000
    },
    {
        name: 'Pacific/Kiritimati',
        offset: 50400,
        offsetDaylightSavings: 50400
    },
    {
        name: 'Pacific/Kosrae',
        offset: 39600,
        offsetDaylightSavings: 39600
    },
    {
        name: 'Pacific/Kwajalein',
        offset: 43200,
        offsetDaylightSavings: 43200
    },
    {
        name: 'Pacific/Majuro',
        offset: 43200,
        offsetDaylightSavings: 43200
    },
    {
        name: 'Pacific/Marquesas',
        offset: -34200,
        offsetDaylightSavings: -34200
    },
    {
        name: 'Pacific/Midway',
        offset: -39600,
        offsetDaylightSavings: -39600
    },
    {
        name: 'Pacific/Nauru',
        offset: 43200,
        offsetDaylightSavings: 43200
    },
    {
        name: 'Pacific/Niue',
        offset: -39600,
        offsetDaylightSavings: -39600
    },
    {
        name: 'Pacific/Norfolk',
        offset: 39600,
        offsetDaylightSavings: 39600
    },
    {
        name: 'Pacific/Noumea',
        offset: 39600,
        offsetDaylightSavings: 39600
    },
    {
        name: 'Pacific/Pago_Pago',
        offset: -39600,
        offsetDaylightSavings: -39600
    },
    {
        name: 'Pacific/Palau',
        offset: 32400,
        offsetDaylightSavings: 32400
    },
    {
        name: 'Pacific/Pitcairn',
        offset: -28800,
        offsetDaylightSavings: -28800
    },
    {
        name: 'Pacific/Ponape',
        offset: 39600,
        offsetDaylightSavings: 39600
    },
    {
        name: 'Pacific/Port_Moresby',
        offset: 36000,
        offsetDaylightSavings: 36000
    },
    {
        name: 'Pacific/Rarotonga',
        offset: -36000,
        offsetDaylightSavings: -36000
    },
    {
        name: 'Pacific/Saipan',
        offset: 36000,
        offsetDaylightSavings: 36000
    },
    {
        name: 'Pacific/Samoa',
        offset: -39600,
        offsetDaylightSavings: -39600
    },
    {
        name: 'Pacific/Tahiti',
        offset: -36000,
        offsetDaylightSavings: -36000
    },
    {
        name: 'Pacific/Tarawa',
        offset: 43200,
        offsetDaylightSavings: 43200
    },
    {
        name: 'Pacific/Tongatapu',
        offset: 46800,
        offsetDaylightSavings: 46800
    },
    {
        name: 'Pacific/Truk',
        offset: 36000,
        offsetDaylightSavings: 36000
    },
    {
        name: 'Pacific/Wake',
        offset: 43200,
        offsetDaylightSavings: 43200
    },
    {
        name: 'Pacific/Wallis',
        offset: 43200,
        offsetDaylightSavings: 43200
    },
    {
        name: 'Pacific/Yap',
        offset: 36000,
        offsetDaylightSavings: 36000
    },
    {
        name: 'Poland',
        offset: 3600,
        offsetDaylightSavings: 7200
    },
    {
        name: 'Portugal',
        offset: 0,
        offsetDaylightSavings: 3600
    },
    {
        name: 'ROC',
        offset: 28800,
        offsetDaylightSavings: 28800
    },
    {
        name: 'ROK',
        offset: 32400,
        offsetDaylightSavings: 32400
    },
    {
        name: 'Singapore',
        offset: 28800,
        offsetDaylightSavings: 28800
    },
    {
        name: 'Turkey',
        offset: 7200,
        offsetDaylightSavings: 10800
    },
    {
        name: 'UCT',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'US/Alaska',
        offset: -32400,
        offsetDaylightSavings: -28800
    },
    {
        name: 'US/Aleutian',
        offset: -36000,
        offsetDaylightSavings: -32400
    },
    {
        name: 'US/Arizona',
        offset: -25200,
        offsetDaylightSavings: -25200
    },
    {
        name: 'US/Central',
        offset: -21600,
        offsetDaylightSavings: -18000
    },
    {
        name: 'US/East-Indiana',
        offset: -18000,
        offsetDaylightSavings: -14400
    },
    {
        name: 'US/Eastern',
        offset: -18000,
        offsetDaylightSavings: -14400
    },
    {
        name: 'US/Hawaii',
        offset: -36000,
        offsetDaylightSavings: -36000
    },
    {
        name: 'US/Indiana-Starke',
        offset: -21600,
        offsetDaylightSavings: -18000
    },
    {
        name: 'US/Michigan',
        offset: -18000,
        offsetDaylightSavings: -14400
    },
    {
        name: 'US/Mountain',
        offset: -25200,
        offsetDaylightSavings: -21600
    },
    {
        name: 'US/Pacific',
        offset: -28800,
        offsetDaylightSavings: -25200
    },
    {
        name: 'US/Pacific-New',
        offset: -28800,
        offsetDaylightSavings: -25200
    },
    {
        name: 'US/Samoa',
        offset: -39600,
        offsetDaylightSavings: -39600
    },
    {
        name: 'UTC',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'Universal',
        offset: 0,
        offsetDaylightSavings: 0
    },
    {
        name: 'W-SU',
        offset: 10800,
        offsetDaylightSavings: 10800
    },
    {
        name: 'WET',
        offset: 0,
        offsetDaylightSavings: 3600
    },
    {
        name: 'Zulu',
        offset: 0,
        offsetDaylightSavings: 0
    }
];

function padLeft(value: number, maxLength?: number): string {
    if (!maxLength) {
        maxLength = 2;
    }
    return value.toString().padStart(maxLength, '0');
}

export function loadTimezones(): Timezone[] {
    const list: Timezone[] = [];
    timezones.forEach((timezone) => {
        // todo: check if timezone is currently inside of daylight savings
        const daylightSavings = false;
        const offset = daylightSavings ? timezone.offset : timezone.offsetDaylightSavings;
        const local = Intl.DateTimeFormat().resolvedOptions().timeZone === timezone.name;
        const offsetSign = offset < 0 ? '-' : '+';
        const offsetHours = Math.floor(Math.abs(offset) / 3600);
        const offsetMinutes = Math.floor(Math.abs(offset) % 3600 / 60);
        const utc = offsetSign + padLeft(offsetHours) + ':' + padLeft(offsetMinutes);
        const timestamp = new Date().getTime() + (offset * 1000);
        const date = new Date(timestamp);
        let dateHours = date.getUTCHours();
        let dateMeridiem = 'AM';
        if (dateHours >= 12) {
            dateMeridiem = 'PM';
        }
        if (dateHours > 12) {
            dateHours = dateHours - 12;
        }
        const dateMinutes = date.getUTCMinutes();
        const time = padLeft(Math.floor(dateHours)) + ':' + padLeft(dateMinutes) + ' ' + dateMeridiem;
        const text = '(' + utc + ') ' + timezone.name + (local ? ' [local]' : '');
        list.push({
            local: local,
            daylightSavings: daylightSavings,
            offset: offset,
            value: timezone.name,
            text: text,
            name: timezone.name,
            utc: utc,
            time: time,
        })
    })
    return list;
}

export function findTimezoneByName(name: string): Timezone|null {
    const filteredList = loadTimezones().filter(
      (timezone) => {
        return timezone.name === name;
      }
    );
    if (filteredList.length === 0) return null;
    return filteredList[0];
}
