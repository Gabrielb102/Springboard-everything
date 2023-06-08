"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self, start=100) :
        """generates the SerialGenerator number with the current number and the starting value"""
        self.start = start
        self.number = start - 1
    
    def generate(self) :
        """presents the number augmented by one"""
        self.number += 1
        return self.number
    
    def reset(self) :
        """resets the number to the starting value"""
        self.number = self.start - 1

    
