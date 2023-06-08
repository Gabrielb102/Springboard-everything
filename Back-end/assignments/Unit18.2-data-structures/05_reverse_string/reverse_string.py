def reverse_string(phrase):
    """Reverse string,

        >>> reverse_string('awesome')
        'emosewa'

        >>> reverse_string('sauce')
        'ecuas'
    """
    letter_list = []
    for letter in phrase :
        letter_list.append(letter)
    letter_list.reverse()
    result_string = "".join(letter_list)
    return result_string