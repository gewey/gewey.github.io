from PIL import Image
import sys

def make_white_transparent(input_path, output_path):
    """Convert white pixels to transparent."""
    try:
        # Open the image
        img = Image.open(input_path)
        
        # Convert to RGBA if not already
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        # Get pixel data
        data = img.getdata()
        
        # Create new pixel data with transparent white
        new_data = []
        for pixel in data:
            # Check if pixel is white or near-white (considering R, G, B values)
            if pixel[0] > 240 and pixel[1] > 240 and pixel[2] > 240:  # Near white
                new_data.append((255, 255, 255, 0))  # Make transparent
            else:
                new_data.append(pixel)
        
        img.putdata(new_data)
        
        # Save as PNG with transparency
        img.save(output_path, 'PNG')
        print(f"Transparent version saved: {output_path}")
        return True
    except Exception as e:
        print(f"Error: {str(e)}")
        return False

if __name__ == "__main__":
    if len(sys.argv) > 1:
        input_file = sys.argv[1]
        output_file = sys.argv[2] if len(sys.argv) > 2 else input_file.replace('.png', '_transparent.png')
    else:
        input_file = "gewey.png"
        output_file = "gewey_transparent.png"
    
    make_white_transparent(input_file, output_file)
