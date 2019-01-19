import http.client, urllib.request, urllib.parse, urllib.error, base64, requests, time, json

import sys

# This is based heaily on the tutorial on https://nordicapis.com/digitize-your-notes-with-microsoft-vision-api/


#---Setting up the connection---
# Keys
endpoint = 'https://westcentralus.api.cognitive.microsoft.com/vision/v1.0'

#Replace this with your API key!!!
api_key = 'cf70bc8dedd748edb657e9ad81555a73'

# HTTP request to send to the API
# Look at the RecognizeText function from Microsoft
headers = {
    # Request headers.
    # Another valid content type is "application/octet-stream".
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': api_key,
}

#Gets the first argument as the url of the picture to process
body = {'url' : sys.argv[1]}

#If you set the handwriting param to be false, it will use OCR on the text instead (NOT good for handwritten text). 
params = {'handwriting' : 'true'}

#---Handwriting analysis---
#Try sending the image to the CV API
try:
    response = requests.request('POST', endpoint + '/RecognizeText', json=body, data=None, headers=headers, params=params)

    #202 is the success status code
    if response.status_code != 202:
        # Display JSON data and exit if the REST API call was not successful.
        parsed = json.loads(response.text)
        print ("Error:")
        print (json.dumps(parsed, sort_keys=True, indent=2))
        exit()

    # grab the 'Operation-Location' from the response
    operationLocation = response.headers['Operation-Location']

    #It will take a little bit of time to load so just make the user wait
    print('\nHandwritten text submitted. Waiting 10 seconds to retrieve the recognized text.\n')
    time.sleep(10)


    # GET the response.
    response = requests.request('GET', operationLocation, json=None, data=None, headers=headers, params=None)

    # 'data' contains the JSON data. The following formats the JSON data for display.
    parsed = json.loads(response.text)

    # Get the transcribed lines of text
    lines = parsed['recognitionResult']['lines']

    #parsed['recognitionResult']['lines'] contains an array of all the lines of processed text. We can print those out now:
    for line in lines:
        print (line['text'])
        
    # This opens the file specified by the second argument for writing
    with open(sys.argv[2], "w") as f:
        for line in lines:
            print(line['text'])
            # write the value to the file
            f.write(line['text'])
        
#Catch any exceptions that might happen
except Exception as e:
    print('Error:')
    print(e)
