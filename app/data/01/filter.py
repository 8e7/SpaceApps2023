import json

def filter_json(json_file):
    with open(json_file, 'r') as file:
        data = json.load(file)

    # Filter out elements with "px > 100" and "py > 100"
    filtered_data = [element for element in data if element.get('px', 0) <= 100 and element.get('py', 0) <= 100]

    with open(json_file, 'w') as file:
        json.dump(filtered_data, file, indent=2)

# Replace 'your_file.json' with the actual file name
filter_json('data.json')
