import os
from PIL import Image, ImageEnhance, ImageFilter
import numpy as np

# Define paths
source_dir = os.path.dirname(os.path.abspath(__file__))
output_dir = os.path.join(source_dir, "AI Enhanced")

# Supported image extensions
image_extensions = {'.png', '.jpg', '.jpeg', '.bmp', '.ico', '.gif', '.tiff'}

def enhance_image(input_path, output_path):
    """Enhance an image using advanced resampling and processing."""
    try:
        # Open the image
        img = Image.open(input_path)
        
        # Convert to RGB if needed (for RGBA or other modes)
        if img.mode in ('RGBA', 'LA', 'P'):
            # Create white background
            background = Image.new('RGB', img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
            img = background
        elif img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Upscale 2x using high-quality LANCZOS resampling
        new_size = (img.width * 2, img.height * 2)
        enhanced = img.resize(new_size, Image.Resampling.LANCZOS)
        
        # Enhance sharpness
        sharpness_enhancer = ImageEnhance.Sharpness(enhanced)
        enhanced = sharpness_enhancer.enhance(1.5)
        
        # Enhance contrast slightly
        contrast_enhancer = ImageEnhance.Contrast(enhanced)
        enhanced = contrast_enhancer.enhance(1.1)
        
        # Enhance color
        color_enhancer = ImageEnhance.Color(enhanced)
        enhanced = color_enhancer.enhance(1.05)
        
        # Apply slight smoothing to reduce noise while preserving edges
        enhanced = enhanced.filter(ImageFilter.MedianFilter(size=3))
        
        # Save the enhanced image
        enhanced.save(output_path, quality=95)
        print(f"Enhanced: {os.path.basename(input_path)} -> {os.path.basename(output_path)}")
        return True
    except Exception as e:
        print(f"Error processing {input_path}: {str(e)}")
        return False

def main():
    """Process all images in the source directory."""
    processed = 0
    failed = 0
    
    # Get all image files
    for filename in os.listdir(source_dir):
        file_path = os.path.join(source_dir, filename)
        
        # Skip if not a file or if it's in the output directory
        if not os.path.isfile(file_path) or filename == 'enhance_images.py':
            continue
        
        # Check if it's an image file
        _, ext = os.path.splitext(filename)
        if ext.lower() not in image_extensions:
            continue
        
        # Create output filename
        name, ext = os.path.splitext(filename)
        output_filename = f"{name}{ext}"
        output_path = os.path.join(output_dir, output_filename)
        
        # Enhance and save
        if enhance_image(file_path, output_path):
            processed += 1
        else:
            failed += 1
    
    print(f"\nDone! Processed: {processed}, Failed: {failed}")

if __name__ == "__main__":
    main()
