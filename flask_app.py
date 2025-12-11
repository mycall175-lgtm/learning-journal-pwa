"""
Lab 6: Flask Backend + PythonAnywhere Deployment Readiness
Main Flask application serving templates and providing RESTful API
"""

from flask import Flask, render_template, request, jsonify
import json
import os
from datetime import datetime

# Initialize Flask app
app = Flask(__name__)

# Get the directory where this script is located (for PythonAnywhere compatibility)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.join(BASE_DIR, 'backend')
JSON_FILE = os.path.join(BACKEND_DIR, 'reflections.json')

# Ensure backend directory exists
os.makedirs(BACKEND_DIR, exist_ok=True)

def load_reflections():
    """Load reflections from JSON file"""
    if os.path.exists(JSON_FILE):
        try:
            with open(JSON_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except (json.JSONDecodeError, IOError):
            return []
    return []

def save_reflections(reflections):
    """Save reflections to JSON file"""
    try:
        with open(JSON_FILE, 'w', encoding='utf-8') as f:
            json.dump(reflections, f, indent=4, ensure_ascii=False)
        return True
    except IOError:
        return False

def get_next_id(reflections):
    """Get the next available ID"""
    if not reflections:
        return 1
    return max(entry.get('id', 0) for entry in reflections) + 1

# ============================================
# Route Handlers (Lab 2)
# ============================================

@app.route('/')
def index():
    """Home page"""
    return render_template('index.html')

@app.route('/journal')
def journal():
    """Journal page"""
    return render_template('journal.html')

@app.route('/projects')
def projects():
    """Projects page"""
    return render_template('projects.html')

@app.route('/about')
def about():
    """About page"""
    return render_template('about.html')

# ============================================
# API Routes (Lab 6)
# ============================================

@app.route('/api/reflections', methods=['GET'])
def get_reflections():
    """GET /api/reflections - Retrieve all reflections"""
    try:
        reflections = load_reflections()
        return jsonify(reflections), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/reflections', methods=['POST'])
def create_reflection():
    """POST /api/reflections - Create a new reflection"""
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data or not data.get('title') or not data.get('content'):
            return jsonify({'error': 'Title and content are required'}), 400
        
        # Load existing reflections
        reflections = load_reflections()
        
        # Create new entry
        new_entry = {
            'id': get_next_id(reflections),
            'date': data.get('date', datetime.now().strftime('%Y-%m-%d')),
            'title': data.get('title'),
            'content': data.get('content'),
            'tags': data.get('tags', [])
        }
        
        # Add to list
        reflections.append(new_entry)
        
        # Save to file
        if save_reflections(reflections):
            return jsonify(new_entry), 201
        else:
            return jsonify({'error': 'Failed to save entry'}), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/reflections/<int:entry_id>', methods=['PUT'])
def update_reflection(entry_id):
    """PUT /api/reflections/<id> - Update an existing reflection"""
    try:
        data = request.get_json()
        
        # Load existing reflections
        reflections = load_reflections()
        
        # Find entry
        entry_index = None
        for i, entry in enumerate(reflections):
            if entry.get('id') == entry_id:
                entry_index = i
                break
        
        if entry_index is None:
            return jsonify({'error': 'Entry not found'}), 404
        
        # Update entry
        if 'title' in data:
            reflections[entry_index]['title'] = data['title']
        if 'content' in data:
            reflections[entry_index]['content'] = data['content']
        if 'date' in data:
            reflections[entry_index]['date'] = data['date']
        if 'tags' in data:
            reflections[entry_index]['tags'] = data['tags']
        
        # Save to file
        if save_reflections(reflections):
            return jsonify(reflections[entry_index]), 200
        else:
            return jsonify({'error': 'Failed to update entry'}), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/reflections/<int:entry_id>', methods=['DELETE'])
def delete_reflection(entry_id):
    """DELETE /api/reflections/<id> - Delete a reflection"""
    try:
        # Load existing reflections
        reflections = load_reflections()
        
        # Find and remove entry
        original_length = len(reflections)
        reflections = [entry for entry in reflections if entry.get('id') != entry_id]
        
        if len(reflections) == original_length:
            return jsonify({'error': 'Entry not found'}), 404
        
        # Save to file
        if save_reflections(reflections):
            return jsonify({'message': 'Entry deleted successfully'}), 200
        else:
            return jsonify({'error': 'Failed to delete entry'}), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ============================================
# PWA Routes (Lab 7)
# ============================================

@app.route('/manifest.json')
def manifest():
    """Serve the web app manifest"""
    return app.send_static_file('manifest.json')

@app.route('/sw.js')
def service_worker():
    """Serve the service worker"""
    return app.send_static_file('js/sw.js'), 200, {'Content-Type': 'application/javascript'}

@app.route('/backend/reflections.json')
def serve_reflections_json():
    """Serve reflections.json file directly (Lab 5 requirement)"""
    try:
        return app.send_static_file('..' + os.sep + 'backend' + os.sep + 'reflections.json'), 200, {'Content-Type': 'application/json'}
    except:
        # Alternative path resolution
        json_path = os.path.join(BACKEND_DIR, 'reflections.json')
        if os.path.exists(json_path):
            with open(json_path, 'r', encoding='utf-8') as f:
                return f.read(), 200, {'Content-Type': 'application/json'}
        return jsonify([]), 200

# ============================================
# Error Handlers
# ============================================

@app.errorhandler(404)
def not_found(error):
    return render_template('index.html'), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

# ============================================
# Main Entry Point
# ============================================

if __name__ == '__main__':
    # Run in debug mode for development
    # For production (PythonAnywhere), set debug=False
    app.run(debug=True, host='0.0.0.0', port=5000)
