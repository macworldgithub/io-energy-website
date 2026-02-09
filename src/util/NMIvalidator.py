class NMIValidator:

    """
    Class to assess if supplied NMI's are valid, and append a checksum if necessary.
    """

    def __init__(self, _NMI):

        self.is_valid = False
        self.NMI = self.validate_NMI(_NMI)
        self.checksum = self.calculate_checksum(_NMI)
        # print(f"validated NMI is {self.NMI}")

    def validate_NMI(self, NMI):

        if(NMI.isdigit() == False):
            # print("NMI must be digits only...")
            return None

        length = len(NMI)
        # print(f"NMI len is {length}")
        
        if(length < 10 or length > 11):
            # print("Invalid NMI (should be 10 or 11 digits)...")
            return None

        if(length == 11):
            # print("Checksum is valid")
            self.is_valid = True
            return NMI

        else:
            # print("Appended checksum")
            self.is_valid = True
            NMI = NMI + self.calculate_checksum(NMI)
            return NMI

    def sum_of_list(self, l):
        """Helper function to calculate sum of list of integers"""

        total = 0
        for val in l:
            total = total + val
        return total

    def calculate_checksum(self, NMI):
    
        """
        The checksum formula is: 
        1. Reverse the number order then take the ASCII value of each digit
        2. Double every second ASCII value
        3. Sum the digits making up each value (eg. 48 becomes 4+8=12)
        4. Sum all of these values together
        5. Round this total up to the nearest 10
        6. The amount required to round up to 10 is the checksum, eg. if total is 72 the checksum is 8
        """
        
        NMI_reversed = NMI[::-1]
        
        ASCII_values = []
            
        for character in NMI_reversed:
            ASCII_values.append(ord(character))
            
        # Double every second ASCII value
        double_ASCII = [n if i%2 else 2*n for i,n in enumerate(ASCII_values)]
        
        sum_digit = []
        for ele in double_ASCII:
            sum = 0
            for digit in str(ele):
                sum += int(digit)
            sum_digit.append(sum)

        list_sum = self.sum_of_list(sum_digit)
        
        # Round list_sum to the nearest 10 and find the distance
        check_sum = round(list_sum,-1) - list_sum
        
        if check_sum < 0:
            check_sum = check_sum + 10

        self.checksum = check_sum
        return str(check_sum)