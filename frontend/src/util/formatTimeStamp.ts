type Format = 'YYYY' | 'YY' | 'MM' | 'DD' | 'hour' | 'min' | 'sec' | 'ms';

const formatTimeStamp = (data: any, format?: Format): string => {
  const timeStamp = new Date(data);

  switch (format) {
    case 'YYYY':
      return timeStamp.getFullYear().toString();
    case 'YY':
      return timeStamp.getFullYear().toString().slice(-2);
    case 'MM':
      return ('0' + (timeStamp.getMonth() + 1)).slice(-2);
    case 'DD':
      return ('0' + timeStamp.getDate()).slice(-2);
    case 'hour':
      return ('0' + timeStamp.getHours()).slice(-2);
    case 'min':
      return ('0' + timeStamp.getMinutes()).slice(-2);
    case 'sec':
      return ('0' + timeStamp.getSeconds()).slice(-2);
    case 'ms':
      return timeStamp.getMilliseconds().toString();
    default: {
      const YY = timeStamp.getFullYear().toString().slice(-2); //년도 뒤에 두자리
      const MM = ('0' + (timeStamp.getMonth() + 1)).slice(-2); //월 2자리 (01, 02 ... 12)
      const DD = ('0' + timeStamp.getDate()).slice(-2); //일 2자리 (01, 02 ... 31)
      const hour = ('0' + timeStamp.getHours()).slice(-2); //시 2자리 (00, 01 ... 23)
      const minute = ('0' + timeStamp.getMinutes()).slice(-2); //분 2자리 (00, 01 ... 59)
      const second = ('0' + timeStamp.getSeconds()).slice(-2); //초 2자리 (00, 01 ... 59)
      return `${YY}.${MM}.${DD} ${hour}:${minute}:${second}`;
    }
  }
};
export default formatTimeStamp;
