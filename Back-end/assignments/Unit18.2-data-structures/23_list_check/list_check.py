def list_check(lst):
    """Are all items in lst a list?

        >>> list_check([[1], [2, 3]])
        True

        >>> list_check([[1], "nope"])
        False
    """
    def is_list(item) :
        return(type(item) == list)

    all_list = all(map(is_list, lst))
    return all_list