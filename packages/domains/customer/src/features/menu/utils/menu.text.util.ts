/**
 * Truncates text in the middle and adds ellipsis
 * @param text - The text to be truncated
 * @param startLength - Number of characters to show at the start of the text
 * @param endLength - Number of characters to show at the end of the text
 * @returns Text truncated in the middle with ellipsis
 */
export const truncateMiddle = (
  text: string,
  startLength: number,
  endLength: number
): string => {
  if (text.length <= startLength + endLength) return text
  return `${text.substring(0, startLength)}...${text.substring(text.length - endLength)}` 
}