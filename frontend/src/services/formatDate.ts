/** @format */

import { format } from "date-fns";

function formatDate(date: string) {
  return format(new Date(date), "dd/MM/yyyy");
}

export default formatDate;
