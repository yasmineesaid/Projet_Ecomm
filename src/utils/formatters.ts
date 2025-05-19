
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

/**
 * Convertit un objet en paramètres de requête URL
 * @param params - L'objet contenant les paramètres
 * @returns La chaîne de requête URL
 */
export const toQueryString = (params: Record<string, any>): string => {
  return Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null && value !== '')
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&');
};
