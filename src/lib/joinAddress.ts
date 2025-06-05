export const joinAddress = (
  addressList: string[],
  separator = ", "
): string => {
  if (!Array.isArray(addressList)) return "";
  return addressList.join(separator);
};
