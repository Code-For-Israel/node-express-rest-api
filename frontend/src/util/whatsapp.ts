const baseLink = 'https://wa.me/'
const dfaultPhoneNumber = '972732198802'
const defaultText = 'שלום, אני מעוניין לתרום תרופות, יש לי תרופה בקירור ואשמח לאיסוף ממני.'

export const generatWALink = (number?: number, message?: string) => {
  const phoneNumber = number || dfaultPhoneNumber
  const text = message || defaultText
  return `${baseLink}?phone=${phoneNumber}&text=${encodeURIComponent(text)}`
}
