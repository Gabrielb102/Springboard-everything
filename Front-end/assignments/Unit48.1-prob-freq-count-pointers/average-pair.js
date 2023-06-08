
function average (n,m) {
    return (n + m)/2
}

function averagePair(nums, target) {
    let i = 0;
    let j = nums.length - 1;
    let mean = average(nums[i], nums[j]);
    while (i < j) {
        if (mean === target) {
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
    return false;
}
