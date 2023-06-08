function countPairs(nums, target) {
    const sortedNums = nums.sort();
    let i = 0;
    let j = sortedNums.length - 1;
    while (i < j) {
        if (sum === target) {
            return true
        } 
        if (mean < target) {
            i++;
            mean = average(nums[i], nums[j]);
        } else {
            j--;
            mean = average(nums[i], nums[j]);
        }
    }

}
