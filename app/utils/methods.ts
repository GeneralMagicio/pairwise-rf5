export const truncate = (text: string, maxChar: number) => {
  if (text.length < maxChar) return text

  const slice = text.slice(0, maxChar)

  return `${slice}...`
}
