import moment from 'moment';

//IG GENERATOR
export function makeId(length: number) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// PARSE RETURN DATA FROM POSTGRES
export const parseData = (data: any) => {
  if (data !== undefined && data !== null) {
    return JSON.parse(JSON.stringify(data));
  } else {
    return {};
  }
};

export const parseJSONB = (data: any) => (data ? JSON.parse(data) : []);

export const stringifyJSONB = (data: any) => (typeof data == 'object' ? JSON.stringify(data) : JSON.stringify([]));

// RANGE OF YEARS OF EXPERIENCE
export const formatDate = (date: string, format: string) => moment(date).format(format);

// US TIMEZONE DATE
export const TimeZoneDate = (format?: string) => moment().format(format);
