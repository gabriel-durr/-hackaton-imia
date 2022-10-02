import requests
#from requests import HTTPError
# Make an API call  and store the response #
url = 'https://jmod-s.herokuapp.com/jmod'

r = requests.get(url)
print("Status code:", r.status_code)

response = requests.get('https://jmod-s.herokuapp.com/jmod')

print(response.json())
