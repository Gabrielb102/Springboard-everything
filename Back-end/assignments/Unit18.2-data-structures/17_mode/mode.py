def mode(nums):
    """Return most-common number in list.

    For this function, there will always be a single-most-common value;
    you do not need to worry about handling cases where more than one item
    occurs the same number of times.

        >>> mode([1, 2, 1])
        1

        >>> mode([2, 2, 3, 3, 2])
        2
    """
    count_dict = {}
    for num in nums :
        if count_dict.get(num) == None :
            count_dict[num] = 1
        elif count_dict[num] > 0 :
            count_dict[num] += 1
    max_value = 0
    mode = ''
    for key in count_dict.keys() :
        if count_dict[key] > max_value :
            max_value = count_dict[key]
            mode = key
    return mode
