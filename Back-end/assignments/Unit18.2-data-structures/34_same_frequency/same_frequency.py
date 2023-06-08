def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?
    
        >>> same_frequency(551122, 221515)
        True
        
        >>> same_frequency(321142, 3212215)
        False
        
        >>> same_frequency(1212, 2211)
        True
    """
    
    def find_frequency(num) :
        frequency = {}
        for dig in str(num) :
            if frequency.get(dig) == None :
                frequency[dig] = 1
            elif frequency[dig] > 0 :
                frequency[dig] += 1
        return frequency
    freq1 = find_frequency(num1)
    freq2 = find_frequency(num2)
    return freq1 == freq2