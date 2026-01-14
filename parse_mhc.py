#!/usr/bin/env python3
"""
Parse Matthew Henry's Commentary HTML files and convert to JSON format.
This script extracts commentary from the HTML files and formats them for use in the Bible study app.
"""

import re
import json
import glob
import os
from html.parser import HTMLParser
from html import unescape

# Book mapping from file numbers to book names
BOOK_MAP = {
    40: "Matthew", 41: "Mark", 42: "Luke", 43: "John", 44: "Acts",
    45: "Romans", 46: "1 Corinthians", 47: "2 Corinthians", 48: "Galatians",
    49: "Ephesians", 50: "Philippians", 51: "Colossians",
    52: "1 Thessalonians", 53: "2 Thessalonians", 54: "1 Timothy",
    55: "2 Timothy", 56: "Titus", 57: "Philemon", 58: "Hebrews",
    59: "James", 60: "1 Peter", 61: "2 Peter", 62: "1 John",
    63: "2 John", 64: "3 John", 65: "Jude", 66: "Revelation"
}

def parse_filename(filename):
    """Extract book number and chapter from filename like MHC45003.HTM"""
    match = re.search(r'MHC(\d{2})(\d{3})\.HTM', filename)
    if match:
        book_num = int(match.group(1))
        chapter_num = int(match.group(2))
        return book_num, chapter_num
    return None, None

def clean_text(text):
    """Clean up HTML entities and extra whitespace"""
    text = unescape(text)
    text = re.sub(r'\s+', ' ', text)  # Collapse whitespace
    text = text.strip()
    return text

def extract_commentary_from_html(filepath):
    """Extract commentary text from HTML file"""
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    book_num, chapter_num = parse_filename(os.path.basename(filepath))
    if not book_num or book_num not in BOOK_MAP:
        return []

    book_name = BOOK_MAP[book_num]

    # Skip intro files (chapter 000)
    if chapter_num == 0:
        return []

    # Extract commentary paragraphs (basic approach)
    # MHC groups verses together, so we'll extract the main commentary sections

    # Remove HTML tags but keep structure
    text_content = re.sub(r'<[^>]+>', ' ', content)
    text_content = clean_text(text_content)

    # For now, create one entry per chapter
    # This is a simplified approach - Matthew Henry comments on verse groups, not individual verses
    commentary_entry = {
        "reference": f"{book_name} {chapter_num}",
        "tradition": "reformed",
        "author": "Matthew Henry",
        "source": "Commentary on the Whole Bible",
        "year": 1706,
        "text": text_content[:2000]  # Limit to 2000 chars for now
    }

    return [commentary_entry]

def process_new_testament():
    """Process all New Testament files"""
    all_commentary = []

    # Find all HTML files and filter for New Testament (books 40-66)
    all_files = glob.glob("matthew_henry_extracted/MHC*.HTM")
    files = []
    for f in all_files:
        book_num, _ = parse_filename(os.path.basename(f))
        if book_num and 40 <= book_num <= 66:
            files.append(f)

    print(f"Found {len(files)} New Testament files")

    for filepath in sorted(files)[:10]:  # Process first 10 files as a test
        print(f"Processing {os.path.basename(filepath)}...")
        entries = extract_commentary_from_html(filepath)
        all_commentary.extend(entries)

    return all_commentary

if __name__ == "__main__":
    print("Parsing Matthew Henry's Commentary - New Testament")
    print("=" * 60)

    commentary = process_new_testament()

    print(f"\nExtracted {len(commentary)} commentary entries")

    # Save to JSON file
    output_file = "mhc_new_testament_sample.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(commentary, f, indent=2, ensure_ascii=False)

    print(f"Saved to {output_file}")
    print("\nSample entry:")
    if commentary:
        print(json.dumps(commentary[0], indent=2))
