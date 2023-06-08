def triple_and_filter(nums):
    """Return new list of tripled nums for those nums divisible by 4.

        Return every number in list that is divisible by 4 in a new list,
        except multipled by 3.
        
            >>> triple_and_filter([1, 2, 3, 4])
            [12]
            
            >>> triple_and_filter([6, 8, 10, 12])
            [24, 36]
            
            >>> triple_and_filter([1, 2])
            []
    """
    def divisible_by_4(num) :
        return ((num/4).is_integer()) 
    def triple(num) :
        return(num * 3)
    to_be_tripled = filter(divisible_by_4, nums)
    tripled_list = list(map(triple,to_be_tripled))
    return(tripled_list)