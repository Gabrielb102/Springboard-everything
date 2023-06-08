def print_upper_words(word_list,must_start_with):
    """takes a list of words and prints each one in all caps"""
    for word in word_list :
        for letter in word :
            for char in must_start_with :
                if letter == char :
                    print(word.upper());
            break

print_upper_words(["hello", "hey", "goodbye", "yo", "yes"],
                   must_start_with={"h", "y"})