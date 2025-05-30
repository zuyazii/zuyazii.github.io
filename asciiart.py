from PIL import Image

ASCII_CHARS = "@%#*+=-:. "
ASPECT_RATIO = 0.43  # Adjust as needed

def resize_image(image, new_width=100):
    width, height = image.size
    new_height = int(height * new_width * ASPECT_RATIO / width)
    return image.resize((new_width, new_height))

def grayify(image):
    return image.convert("L")

def pixels_to_ascii(image):
    pixels = image.getdata()
    ascii_str = "".join([ASCII_CHARS[pixel // 32] for pixel in pixels])
    return ascii_str

def image_to_ascii(path, new_width=100):
    image = Image.open(path)
    image = resize_image(image, new_width)
    image = grayify(image)
    ascii_str = pixels_to_ascii(image)
    img_width = image.width
    ascii_img = "\n".join([ascii_str[i:(i+img_width)] for i in range(0, len(ascii_str), img_width)])
    return ascii_img

if __name__ == "__main__":
    ascii_art = image_to_ascii("Photo.jpeg", new_width=100)
    # Save to a text file
    with open("ascii_art.txt", "w") as f:
        f.write(ascii_art)
    print("ASCII art saved to ascii_art.txt")