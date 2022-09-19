export interface Dates {
  date: string | number | Date;
  format: string;
  type?: 'FROMNOW' | 'MOMENT';
}
export type DateFormat = (options: Dates) => string;
