from PIL import Image, ImageDraw, ImageFilter
import numpy as np

def create_composite(image1_path, image2_path, output_path):
    """Creates a composite merge of two images."""
    try:
        # Open both images
        img1 = Image.open(image1_path)
        img2 = Image.open(image2_path)
        
        print(f"Image 1 size: {img1.size}")
        print(f"Image 2 size: {img2.size}")
        
        # Convert both to RGBA
        if img1.mode != 'RGBA':
            img1 = img1.convert('RGBA')
        if img2.mode != 'RGBA':
            img2 = img2.convert('RGBA')
        
        # Use image2 as base (larger space scene)
        base = img2.copy()
        base_w, base_h = base.size
        
        # Scale image1 to fit on top (logo), maintaining aspect ratio
        # Make it about 40% of the base width
        scale_width = int(base_w * 0.4)
        aspect_ratio = img1.height / img1.width
        scale_height = int(scale_width * aspect_ratio)
        img1_scaled = img1.resize((scale_width, scale_height), Image.Resampling.LANCZOS)
        
        # Position the scaled image1 in the center-top area
        x_pos = (base_w - scale_width) // 2
        y_pos = int(base_h * 0.15)  # 15% from top
        
        # Create a soft glow effect around the logo
        glow = Image.new('RGBA', base.size, (0, 0, 0, 0))
        glow_img = Image.new('RGBA', img1_scaled.size, (255, 100, 255, 100))
        glow_img = glow_img.filter(ImageFilter.GaussianBlur(radius=20))
        glow.paste(glow_img, (x_pos, y_pos), glow_img)
        base = Image.alpha_composite(base, glow)
        
        # Paste image1 on top with transparency blending
        base.paste(img1_scaled, (x_pos, y_pos), img1_scaled)
        
        # Convert to RGB for final save (if needed)
        if base.mode == 'RGBA':
            rgb_base = Image.new('RGB', base.size, (0, 0, 0))
            rgb_base.paste(base, mask=base.split()[3])
            rgb_base.save(output_path, quality=95)
        else:
            base.save(output_path, quality=95)
        
        print(f"Composite image created: {output_path}")
        return True
    except Exception as e:
        print(f"Error creating composite: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    img1 = r"C:\Users\Gewey\OneDrive\gewey.github.io\img\logo\gewey\AI Enhanced\geweyLogo2.png"
    img2 = r"C:\Users\Gewey\OneDrive\Documents\RimWorld by Ludeon Studios\Preview (1).png"
    output = r"C:\Users\Gewey\OneDrive\gewey.github.io\img\logo\gewey\AI Enhanced\geweyLogo_composite.png"
    
    create_composite(img1, img2, output)
