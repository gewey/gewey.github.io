from PIL import Image, ImageFilter, ImageEnhance
import sys

def make_lines_crisp(input_path, output_path):
    """Make lines crisper by enhancing edges and sharpness."""
    try:
        # Open the image
        img = Image.open(input_path)
        
        # Convert to RGB if needed
        if img.mode in ('RGBA', 'LA'):
            background = Image.new('RGB', img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[-1])
            img = background
        elif img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Apply strong unsharp mask for crisp lines
        # Enhance sharpness significantly
        sharpness_enhancer = ImageEnhance.Sharpness(img)
        img = sharpness_enhancer.enhance(3.0)  # 3x sharpness
        
        # Apply edge enhancement with unsharp mask
        blurred = img.filter(ImageFilter.GaussianBlur(radius=0.5))
        img = Image.blend(img, blurred, 0.5)
        
        # Apply another sharpening pass
        img = img.filter(ImageFilter.SHARPEN)
        
        # Enhance contrast for line definition
        contrast_enhancer = ImageEnhance.Contrast(img)
        img = contrast_enhancer.enhance(1.3)
        
        # Save with high quality
        img.save(output_path, quality=99)
        print(f"Crisp version saved: {output_path}")
        return True
    except Exception as e:
        print(f"Error: {str(e)}")
        return False

if __name__ == "__main__":
    if len(sys.argv) > 1:
        input_file = sys.argv[1]
        output_file = sys.argv[2] if len(sys.argv) > 2 else "crisp_" + input_file.split('\\')[-1]
    else:
        input_file = "gewey_original.png"
        output_file = "gewey_crisp.png"
    
    make_lines_crisp(input_file, output_file)
