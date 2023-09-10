const baseLink = 'https://wa.me/'
const dfaultPhoneNumber = '972732198802'
const defaultText = 'שלום, יש ברשותי תרופות שאשמח לתרום'
export const generateWALink = (message?: string, number?: string) => {
  const phoneNumber = number || dfaultPhoneNumber
  const text = message || defaultText
  return `${baseLink}/${phoneNumber}/?text=${encodeURIComponent(text)}`
}
