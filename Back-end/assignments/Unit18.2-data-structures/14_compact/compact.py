def compact(lst):
    """Return a copy of lst with non-true elements removed.

        >>> compact([0, 1, 2, '', [], False, (), None, 'All done'])
        [1, 2, 'All done']
    """
    result_list = []
    for element in lst :
        if element :
            result_list.append(element)

    return result_list
