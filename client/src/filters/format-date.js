import moment from 'moment';

const timeFormat = 'HH:mm';
const readDateFormat = 'MM-DD-YYYY';
const dateTimeFormats = [
  readDateFormat,
  'MM/dd/yyyy',
  'YYYY-MM-DD',
  `YYYY-MM-DD ${timeFormat}`,
  `YYYY-MM-DD ${timeFormat}:ss`,
  `YYYY-MM-DD ${timeFormat}Z`,
  `YYYY-MM-DD ${timeFormat}:ssZ`,
  `${readDateFormat} ${timeFormat}`,
  `MM/dd/yyyy ${timeFormat}`,
  `${readDateFormat} HH:MM`,
  `${readDateFormat} HH:MM A`
];

export default (value, format = 'MM/DD/YYYY', parseFormat = null) => {
  let formatted = null;
  const regex = /^(([0-1]{0,1}[0-9]( )?(AM|am|aM|Am|PM|pm|pM|Pm))|(([0]?[1-9]|1[0-2])(:|\.)[0-5][0-9]( )?(AM|am|aM|Am|PM|pm|pM|Pm))|(([0]?[0-9]|1[0-9]|2[0-3])(:|\.)[0-5][0-9]))$/;

  if (value) {
    if (value.match && value.match(regex)) {
      formatted = moment(value, 'HH:mm');
    } else {
      if (parseFormat) {
        formatted = moment(value, [parseFormat]);
      } else {
        formatted = moment(value, dateTimeFormats);
      }
    }

    if (format === 'fromNow') {
      formatted = formatted.fromNow();
    } else {
      formatted = formatted.format(format);
    }
  }

  return formatted;
};
