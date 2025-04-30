/**
 * A collection of utility functions for formatting data
 */

/**
 * Format a date to a readable string
 * @param date - Date to format
 * @param locale - Locale to use for formatting (default: 'en-US')
 * @returns Formatted date string
 */
export function formatDate(date: Date, locale = 'en-US'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Truncate a string if it exceeds the maximum length
 * @param text - String to truncate
 * @param maxLength - Maximum length (default: 100)
 * @param ellipsis - String to add at the end (default: '...')
 * @returns Truncated string
 */
export function truncateText(text: string, maxLength = 100, ellipsis = '...'): string {
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.slice(0, maxLength - ellipsis.length) + ellipsis;
}