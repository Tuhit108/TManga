import moment from "moment";

export const formatDate = (date:string)=>{
  return (parseInt(date) != 0 ? moment(parseInt(date + "000")).format("DD/MM/YYYY") : "")
}
