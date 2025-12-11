#!/usr/bin/env python3
"""
Lab 5: Python & JSON Backend
Script to append reflection entries from console input to reflections.json
"""

import json
import os
from datetime import datetime

# Get the directory where this script is located
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
JSON_FILE = os.path.join(SCRIPT_DIR, 'reflections.json')

def load_reflections():
    """Load existing reflections from JSON file"""
    if os.path.exists(JSON_FILE):
        try:
            with open(JSON_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except (json.JSONDecodeError, IOError) as e:
            print(f"Error reading file: {e}")
            return []
    return []

def save_reflections(reflections):
    """Save reflections to JSON file"""
    try:
        with open(JSON_FILE, 'w', encoding='utf-8') as f:
            json.dump(reflections, f, indent=4, ensure_ascii=False)
        print(f"✓ Entry saved successfully!")
        return True
    except IOError as e:
        print(f"Error writing file: {e}")
        return False

def get_next_id(reflections):
    """Get the next available ID"""
    if not reflections:
        return 1
    return max(entry.get('id', 0) for entry in reflections) + 1

def add_entry():
    """Interactive function to add a new entry"""
    print("\n" + "="*50)
    print("Learning Journal - Add New Entry")
    print("="*50)
    
    # Load existing entries
    reflections = load_reflections()
    
    # Get entry details from user
    print("\nEnter entry details (press Enter to use defaults):")
    
    # Date
    date_input = input("Date (YYYY-MM-DD) [today]: ").strip()
    if not date_input:
        date_input = datetime.now().strftime('%Y-%m-%d')
    
    # Title
    title = input("Title: ").strip()
    if not title:
        print("Error: Title is required!")
        return
    
    # Content
    print("Content (press Enter twice to finish):")
    content_lines = []
    while True:
        line = input()
        if line == "" and content_lines and content_lines[-1] == "":
            break
        content_lines.append(line)
    
    content = "\n".join(content_lines[:-1]) if content_lines else ""
    if not content:
        print("Error: Content is required!")
        return
    
    # Tags
    tags_input = input("Tags (comma-separated): ").strip()
    tags = [tag.strip() for tag in tags_input.split(',') if tag.strip()] if tags_input else []
    
    # Create new entry
    new_entry = {
        "id": get_next_id(reflections),
        "date": date_input,
        "title": title,
        "content": content,
        "tags": tags
    }
    
    # Add to reflections list
    reflections.append(new_entry)
    
    # Save to file
    if save_reflections(reflections):
        print(f"\nEntry #{new_entry['id']} added successfully!")
        print(f"Total entries: {len(reflections)}")
    else:
        print("\nFailed to save entry.")

def list_entries():
    """List all entries"""
    reflections = load_reflections()
    
    if not reflections:
        print("\nNo entries found.")
        return
    
    print(f"\n{'='*50}")
    print(f"Total Entries: {len(reflections)}")
    print(f"{'='*50}\n")
    
    for entry in reflections:
        print(f"ID: {entry['id']}")
        print(f"Date: {entry['date']}")
        print(f"Title: {entry['title']}")
        print(f"Tags: {', '.join(entry.get('tags', []))}")
        print(f"Content: {entry['content'][:100]}..." if len(entry['content']) > 100 else f"Content: {entry['content']}")
        print("-" * 50)

def main():
    """Main function"""
    print("Learning Journal - Entry Manager")
    print("="*50)
    print("1. Add new entry")
    print("2. List all entries")
    print("3. Exit")
    
    choice = input("\nSelect an option (1-3): ").strip()
    
    if choice == '1':
        add_entry()
    elif choice == '2':
        list_entries()
    elif choice == '3':
        print("Goodbye!")
    else:
        print("Invalid choice!")

if __name__ == '__main__':
    main()

