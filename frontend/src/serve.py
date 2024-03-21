from flask import Flask, send_file

app = Flask(__name__)

@app.route('/')
def download_file():
    # Replace 'path/to/your/file.csv' with the actual path to your file
    file_path = './20k_5g_data_normalized.csv'
    # Set the filename that will be shown when downloaded
    filename = '20k_5g_data_normalized.csv'
    
    try:
        # Send the file as a response with the specified filename
        return send_file(file_path, as_attachment=True)
    except Exception as e:
        return str(e)

if __name__ == '__main__':
    app.run(debug=True)
