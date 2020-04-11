export const twoSum = (nums: number[] = [], target: number): number[] => {
  const numsIndexes = nums.reduce((acc, num, index) => {
    acc[num] = index;
    return acc;
  }, {});

  for (let i = 0; i < nums.length; i += 1) {
    const compliment = target - nums[i];
    const complimentIndex = numsIndexes[compliment];
    if (complimentIndex && complimentIndex !== i) {
      return [i, complimentIndex];
    }
  }
  return [];
};
