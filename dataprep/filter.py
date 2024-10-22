//this was used to filter all the data and only get relevant entries

input_file_path = 't.txt'
output_file_path = 'out.txt'

words_to_include = ["Galaxy S8", "Galaxy S8+", "Galaxy S9", "Galaxy S9+", "Galaxy S10", "Galaxy S10e", "Galaxy S10+", "Galaxy S20", "Galaxy S20+", "Galaxy S20 Ultra", "Galaxy S21", "Galaxy S21+", "Galaxy S21 Ultra", "Galaxy S22", "Galaxy S22+", "Galaxy S22 Ultra", "Galaxy S23", "Galaxy S23+", "Galaxy S23 Ultra", "Galaxy Note 8", "Galaxy Note 9", "Galaxy Note 10", "Galaxy Note 10+", "Galaxy Note 20", "Galaxy Note 20 Ultra", "Google Pixel 2", "Google Pixel 2 XL", "Google Pixel 3", "Google Pixel 3 XL", "Google Pixel 3a", "Google Pixel 3a XL", "Google Pixel 4", "Google Pixel 4 XL", "Google Pixel 5", "Google Pixel 5a", "Google Pixel 6", "Google Pixel 6 Pro", "Google Pixel 6a", "Google Pixel 7", "Google Pixel 7 Pro", "Google Pixel 8", "Google Pixel 8 Pro", "iPhone 8", "iPhone 8 Plus", "iPhone X", "iPhone XR", "iPhone XS", "iPhone XS Max", "iPhone 11", "iPhone 11 Pro", "iPhone 11 Pro Max", "iPhone SE", "iPhone 12", "iPhone 12 Mini", "iPhone 12 Pro", "iPhone 12 Pro Max", "iPhone 13", "iPhone 13 Mini", "iPhone 13 Pro", "iPhone 13 Pro Max", "iPhone 14", "iPhone 14 Plus", "iPhone 14 Pro", "iPhone 14 Pro Max", "iPhone 15", "iPhone 15 Plus", "iPhone 15 Pro", "iPhone 15 Pro Max"]

with open(input_file_path, 'r') as infile, open(output_file_path, 'w') as outfile:
    for line in infile:
        if any(word in line for word in words_to_include):
            outfile.write(line)

print("done")
