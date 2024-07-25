export function getDaysDiff(start , end){
    const date1 = new Date(start)
    const date2 = new Date(end)
   const diffTime = Math.abs(date2 - date1);
   const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
   return diffDays 
  }