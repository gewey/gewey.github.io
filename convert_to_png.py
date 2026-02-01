import os
from pathlib import Path

folder = Path(r"c:\Users\Gewey\OneDrive\gewey.github.io\twitter profile pictures")
os.chdir(folder)

jpg_files = list(folder.glob('*.jpg'))
print(f"Converting {len(jpg_files)} JPG files to PNG...")

success = 0
failed = 0

for jpg_file in jpg_files:
    try:
        png_file = jpg_file.with_suffix('.png')
        # Use magick command (ImageMagick)
        exit_code = os.system(f'magick convert "{jpg_file}" "{png_file}" 2>nul')
        if exit_code == 0 and png_file.exists() and png_file.stat().st_size > 1000:
            jpg_file.unlink()
            print(f"✓ {jpg_file.name}")
            success += 1
        else:
            print(f"✗ {jpg_file.name}")
            failed += 1
    except Exception as e:
        print(f"✗ {jpg_file.name}: {str(e)}")
        failed += 1

print(f"\nSuccess: {success} | Failed: {failed}")
png_count = len(list(folder.glob('*.png')))
print(f"Total PNG files: {png_count}")
