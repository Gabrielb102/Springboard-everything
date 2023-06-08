"""Word Finder: finds random words from a dictionary."""

file = open("words.txt", "r")
from random import randint
class WordFinder:
    """
        SpecialWordFinder(word_file)
        
        o.word_list = list of words in provided file
        o.word_count = total number of words in the provided file, excluding gaps and labels
    
        """
    
    def __init__(self, word_file) :
        self.word_list = str(word_file.read()).split("\n")
        self.word_count = len(self.word_list)
        print(f"{self.word_count} words read")

    def random(self) :
        """o.random() provides a random word from provided word file"""

        word_index = randint(0, self.word_count)
        return self.word_list[word_index]
    
class SpecialWordFinder(WordFinder) :
    """
        SpecialWordFinder(word_file)
        
        o.word_list = list of words in provided file
        o.word_count = total number of words in the provided file, excluding gaps and labels
        
        methods
        o.random() provides a random word from provided word file
        """

    def __init__(self, word_file) :
        super().__init__(word_file)
        self.word_list = [word for word in self.word_list if len(word) > 0 and word[0] in "abcdefghijklmnopqrstuvwxyz"]
        self.word_count = len(self.word_list)
        print(f"{self.word_count} English words found")