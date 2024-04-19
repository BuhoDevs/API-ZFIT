export const getOffSet = ({
  skip = 1,
  take = 1000,
}: {
  skip?: number;
  take?: number;
}): number => {
  const offSetBySkip = (skip - 1) * take;
  return offSetBySkip;
};
