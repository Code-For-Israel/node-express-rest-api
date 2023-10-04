const baseLink = 'https://wa.me/'
const dfaultPhoneNumber = '972732198802'

export const generateWALink = (message: string, number?: string) => {
  const phoneNumber = number || dfaultPhoneNumber
  return `${baseLink}/${phoneNumber}/?text=${encodeURIComponent(message)}`
}
