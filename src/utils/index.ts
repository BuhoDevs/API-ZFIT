export const getIsoDate = (date: string) :string => {
    const toDateFormat = new Date(date);
      return toDateFormat.toISOString()
}