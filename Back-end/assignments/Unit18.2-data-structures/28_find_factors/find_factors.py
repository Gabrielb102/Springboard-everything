def find_factors(num):
    """Find factors of num, in increasing order.

    >>> find_factors(10)
    [1, 2, 5, 10]

    >>> find_factors(11)
    [1, 11]

    >>> find_factors(111)
    [1, 3, 37, 111]

    >>> find_factors(321421)
    [1, 293, 1097, 321421]
    """
    factors = []
    potential_factors = list(range(num))
    potential_factors.pop(0)
    potential_factors.append(num)
    for n in potential_factors :
        if ( num / n ).is_integer() :
            factors.append(n)
    return factors