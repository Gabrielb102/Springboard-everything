def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase.

        >>> flip_case('Aaaahhh', 'a')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'A')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'h')
        'AaaaHHH'

    """
    phrase_list = list(phrase)
    result_phrase = []
    for letter in phrase_list :
        if letter.lower() == to_swap.lower() :
            if letter == letter.upper() :
                result_phrase.append(letter.lower())
            else :
                result_phrase.append(letter.upper())
        else: 
          result_phrase.append(letter)
    return "".join(result_phrase)