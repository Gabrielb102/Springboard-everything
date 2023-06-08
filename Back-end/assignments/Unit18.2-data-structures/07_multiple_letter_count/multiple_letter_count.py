def multiple_letter_count(phrase):
    """Return dict of {ltr: frequency} from phrase.

        >>> multiple_letter_count('yay')
        {'y': 2, 'a': 1}

        >>> multiple_letter_count('Yay')
        {'Y': 1, 'a': 1, 'y': 1}
    """
    count_dict = {}
    for letter in phrase :
        if count_dict.get(letter) == None :
            count_dict[letter] = 1
        elif count_dict[letter] > 0 :
            count_dict[letter] += 1
    return count_dict
