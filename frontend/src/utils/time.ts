export const convertTo12HourFormat = (time24h: string): string => {
    let [hours, minutes] = time24h.split(':');
    let period = 'AM';
  
    let hoursNumber = parseInt(hours, 10);
  
    if (hoursNumber >= 12) {
      period = 'PM';
      if (hoursNumber > 12) {
        hoursNumber -= 12;
      }
    } else if (hoursNumber === 0) {
      hoursNumber = 12;
    }
  
    return `${hoursNumber}:${minutes.padStart(2, '0')} ${period}`;
  };