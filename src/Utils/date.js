import moment from "moment";

export const generateDate = () => {
  return moment().add(8, "hours").format('YYYY-MM-DD HH:mm:ss');
}