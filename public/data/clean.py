import json

def remove_column(json_file, column_names):
    with open(json_file, 'r') as file:
        data = json.load(file)

    # Remove the specified column from each entry
    for entry in data:
        for column_name in column_names:
            entry.pop(column_name, None)

    with open(json_file, 'w') as file:
        json.dump(data, file, indent=2)

# Replace 'data.json' with your actual JSON file name
# Replace 'city' with the column name you want to remove
remove_column('m51.json', ["vol_bass_note", "vol_chord_not"])
