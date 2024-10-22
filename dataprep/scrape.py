//this was used manually to scrape all the relevant articles

import requests
from bs4 import BeautifulSoup

url = 'https://www.ifixit.com/Device/Google_Phone'

response = requests.get(url)

soup = BeautifulSoup(response.text, 'html.parser')
section = soup.find('div', class_='grid')

grid_objects = section.find_all('div', class_='categoryListCell')

for grid in grid_objects:
    link = grid.find('a')
    if link:
        href = link.get('href')
        title = grid.find('h5', class_='title')
        title_text = title.get_text(strip=True) if title else ""
        
        subresponse = requests.get(root_url + href)
        subsoup = BeautifulSoup(subresponse.text, 'html.parser')
        subsection = subsoup.find('div', class_='grid')
        subgrid_objects = subsection.find_all('div', class_=['categoryListCell', 'cell'])
        for subgrid in subgrid_objects:
            sublink = subgrid.find('a')
            if sublink:
                subhref = sublink.get('href')
                subtitle = subgrid.find(['h5', 'div'], class_=['title', 'title-text'])
                subtitle_text = subtitle.get_text(strip=True) if subtitle else ""

                print(f"{subtitle_text} repair for {title_text}: {'https://www.ifixit.com' + subhref}")
