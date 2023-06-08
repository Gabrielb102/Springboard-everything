

function separatePositive(nums) {
    let length = nums.length;
    for (let n = 0; n < length; n++) {
        if (nums[n] < 0) {
            num = (nums.splice(n, 1))
            nums.push(...num);
            n--;
            length--;
        }
    }
    return nums;
}
