def vowel_count(phrase):
    """Return frequency map of vowels, case-insensitive.

        >>> vowel_count('rithm school')
        {'i': 1, 'o': 2}
        
        >>> vowel_count('HOW ARE YOU? i am great!') 
        {'o': 2, 'a': 3, 'e': 2, 'u': 1, 'i': 1}
    """
    count_dict = {}
    for letter in phrase.lower() :
        if count_dict.get(letter) == None :
            count_dict[letter] = 1
        elif count_dict[letter] > 0 :
            count_dict[letter] += 1
    vowels = "aeiou"
    vowel_dict = {}
    for k,v in count_dict.items() :
        if k in vowels :
            vowel_dict[k] = v
    return vowel_dict
            