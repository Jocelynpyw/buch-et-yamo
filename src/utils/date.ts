import { DateFormat, Dates } from '@KwSrc/typings';

import moment from 'moment';
import 'moment/min/locales';

moment.locale('en');
const formateDate: DateFormat = (dateMoment: Dates) => {
  switch (dateMoment.type) {
    case 'FROMNOW':
      return moment(dateMoment.date).fromNow();
    default:
      return moment(dateMoment.date).format(dateMoment.format);
  }
};

export const dateDifference = (sdate: Date, edate: Date) => {
  const diffTime = edate.getTime() - sdate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

export const timeSpan = (sdate: Date, edate: Date): number => {
  // const span = moment(edate).diff(moment(sdate));
  const span = dateDifference(sdate, edate);
  return span;
};

export default formateDate;
