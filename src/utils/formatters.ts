
/**
 * Formate un prix en dirhams marocains
 * @param price - Le prix à formater
 * @returns Le prix formaté en MAD
 */
export const formatPrice = (price: number): string => {
  return `${price.toFixed(2)} MAD`;
};

/**
 * Formate une date au format français
 * @param date - La date à formater
 * @returns La date formatée au format français
 */
export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('fr-FR');
};
