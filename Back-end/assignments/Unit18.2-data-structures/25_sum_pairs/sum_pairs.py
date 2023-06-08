def sum_pairs(nums, goal):
    """Return tuple of first pair of nums that sum to goal.

    For example:

        >>> sum_pairs([1, 2, 2, 10], 4)
        (2, 2)

    (4, 2) sum to 6, and come before (5, 1):

        >>> sum_pairs([4, 2, 10, 5, 1], 6) # (4, 2)
        (4, 2)

    (4, 3) sum to 7, and finish before (5, 2): <- I don't get it, that's not the first pair

        >>> sum_pairs([5, 1, 4, 8, 3, 2], 7)
        (4, 3)

    No pairs sum to 100, so return empty tuple:

        >>> sum_pairs([11, 20, 4, 2, 1, 5], 100)
        ()
    """
    for index in range(len(nums) - 1) :
        x = nums[index]
        i = index + 1
        for n in range(len(nums) - 1) :
            if i == len(nums) :
                i -= (len(nums))
            y = nums[i]
            if x + y == goal :
                return (x, y)
            else :
                i += 1
    return(())