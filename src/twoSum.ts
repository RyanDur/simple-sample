const range = (size: number) => {
  return [...Array(size).keys()];
};

export const twoSum = (nums: number[] = [], target: number): number[] => {
  const hash = new Map();
  return nums.reduce((acc, num, index) => {
    const compliment = target - num;
    const values = Array.from(hash.values());
    const complimentIndex = values.indexOf(compliment);
    if (values.includes(compliment) && complimentIndex != index) {
      return [values.indexOf(compliment), index];
    } else {
      hash.set(index, num);
      return acc;
    };
  }, []);
};
