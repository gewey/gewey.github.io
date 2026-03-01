from PIL import Image, ImageEnhance, ImageFilter
import numpy as np

def ai_merge_images(bg_path, fg_path, output_path):
    """Intelligently merge two images using AI-like blending techniques."""
    try:
        # Open both images
        bg_img = Image.open(bg_path)
        fg_img = Image.open(fg_path)
        
        print(f"Background size: {bg_img.size}")
        print(f"Foreground size: {fg_img.size}")
        
        # Convert to RGBA
        if bg_img.mode != 'RGBA':
            bg_img = bg_img.convert('RGBA')
        if fg_img.mode != 'RGBA':
            fg_img = fg_img.convert('RGBA')
        
        base = bg_img.copy()
        base_w, base_h = base.size
        
        # Scale foreground to fit intelligently (35% of width)
        scale_width = int(base_w * 0.35)
        aspect_ratio = fg_img.height / fg_img.width
        scale_height = int(scale_width * aspect_ratio)
        fg_scaled = fg_img.resize((scale_width, scale_height), Image.Resampling.LANCZOS)
        
        # Position in bottom right area
        x_pos = int(base_w * 0.58)
        y_pos = int(base_h * 0.50)
        
        # Create multiple blend layers for depth
        # Convert to numpy arrays for advanced blending
        bg_array = np.array(base, dtype=np.float32)
        fg_array = np.array(fg_scaled, dtype=np.float32)
        
        # Create a temporary image for the foreground at the right position
        temp = Image.new('RGBA', base.size, (0, 0, 0, 0))
        temp.paste(fg_scaled, (x_pos, y_pos), fg_scaled)
        temp_array = np.array(temp, dtype=np.float32)
        
        # Screen blend mode for the overlay (makes it glow into the scene)
        fg_alpha = temp_array[:,:,3] / 255.0
        fg_alpha_3d = np.stack([fg_alpha] * 3, axis=-1)
        
        # Screen blend: result = 1 - (1 - a) * (1 - b)
        result_rgb = 1.0 - (1.0 - bg_array[:,:,:3]/255.0) * (1.0 - temp_array[:,:,:3]/255.0)
        
        # Blend based on foreground alpha
        blended_rgb = bg_array[:,:,:3]/255.0 * (1 - fg_alpha_3d) + result_rgb * fg_alpha_3d
        
        # Keep original alpha or use foreground alpha where it's visible
        blended_alpha = np.maximum(bg_array[:,:,3], temp_array[:,:,3])
        
        # Reconstruct the image
        blended = np.stack([blended_rgb[:,:,0], blended_rgb[:,:,1], blended_rgb[:,:,2], blended_alpha], axis=-1)
        blended = (blended * 255).astype(np.uint8)
        
        result_img = Image.fromarray(blended, 'RGBA')
        
        # Apply subtle sharpening for cohesion
        result_img = result_img.filter(ImageFilter.SHARPEN)
        
        # Enhance contrast slightly
        enhancer = ImageEnhance.Contrast(result_img)
        result_img = enhancer.enhance(1.05)
        
        # Convert to RGB for final save
        rgb_result = Image.new('RGB', result_img.size, (0, 0, 0))
        rgb_result.paste(result_img, mask=result_img.split()[3])
        
        rgb_result.save(output_path, quality=98)
        print(f"AI merged image created: {output_path}")
        return True
    except Exception as e:
        print(f"Error in AI merge: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    bg = r"C:\Users\Gewey\OneDrive\Documents\RimWorld by Ludeon Studios\Preview (1).png"
    fg = r"C:\Users\Gewey\OneDrive\gewey.github.io\img\logo\gewey\AI Enhanced\geweyLogo_transparent.png"
    output = r"C:\Users\Gewey\OneDrive\gewey.github.io\img\logo\gewey\AI Enhanced\geweyLogo_AI_merged.png"
    
    ai_merge_images(bg, fg, output)
