import { format, parseISO } from 'date-fns';
import { DATETIME_FORMAT_DATEFNS_YMDHIS } from '../constants';

const formatISODate = (iso8601) =>
  iso8601 ? format(parseISO(iso8601), DATETIME_FORMAT_DATEFNS_YMDHIS) : '';

  export { formatISODate };
