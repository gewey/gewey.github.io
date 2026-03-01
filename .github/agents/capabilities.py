import os
import re

def format_match_with_context(file_path, line_number, context_lines=3):
    """
    Implementation of the OMC 'formatMatch' logic.
    Provides a numbered code block with the matching line highlighted.
    """
    if not os.path.exists(file_path):
        return f"ERROR: File {file_path} not found."
        
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()
            
        start = max(0, line_number - context_lines - 1)
        end = min(len(lines), line_number + context_lines)
        
        result = [f"File: {file_path}"]
        result.append("```")
        for i in range(start, end):
            prefix = "> " if i == line_number - 1 else "  "
            result.append(f"{i+1:4} | {prefix}{lines[i].rstrip()}")
        result.append("```")
        
        return "\n".join(result)
    except Exception as e:
        return f"ERROR reading file: {str(e)}"

if __name__ == "__main__":
    # Test on StickyNotes
    print("--- TEST: formatMatch Pattern ---")
    print(format_match_with_context("V:/StickyNotes.txt", 5))
