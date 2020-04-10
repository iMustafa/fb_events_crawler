from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common.exceptions import NoSuchElementException
from bs4 import BeautifulSoup
from urllib.parse import urlparse
import csv
import re
from sys import argv
from datetime import datetime, timedelta
from time import sleep
import bs4
from lxml import html
import json 

from utils import *


def main(_username,
		_password,
		city_id,
		year,
		month,
		day,
		pagination_threshold=100):
	
	selected_date = datetime(year, month, day)
	browser = webdriver.Chrome()
	try:
		browser.maximize_window()
		browser.get("http://facebook.com")

		username = browser.find_element_by_id("email")
		password = browser.find_element_by_id("pass")
		submit = browser.find_element_by_id("u_0_b")

		username.send_keys(_username)
		password.send_keys(_password)
		submit.click()

		results_url = append_city_id(main_url, city_id)
		results_url = append_dates(results_url, year, month, day)

		# browser.implicitly_wait(3)
		sleep(3)
		browser.get(results_url)
		browser.implicitly_wait(9)

		##################################
		# scrape and refine results
		##################################

		# {name, url}
		single_event = True
		
		body = browser.find_element_by_css_selector('body')
		body.send_keys(Keys.ESCAPE)

		if not single_event:
			return 'Crawler Engine: No events found'


		while single_event != "<div></div>" :
			try:
				body.send_keys(Keys.END)
				browser.implicitly_wait(5)

				single_event = browser.find_element_by_xpath('//ul[@class="uiList _4kg _6-i _6-h _6-j"]//li[last()]').get_attribute('innerHTML').strip()

				# single_event = WebDriverWait(browser, 3).until(
				# 	EC.presence_of_element_located((By.XPATH, xpath_pattern))

				body.send_keys(Keys.END)
				browser.implicitly_wait(2)

				if pagination_threshold <= 0:
					break

			except NoSuchElementException:
				print('[*] End of page, or no events found')
				break			

			except Exception as e:
				# hide warnings

				print('[-] First Exception')
				print(e.__str__())
				pass


			# decrease pagination_threshold
			pagination_threshold -= 1


		print('[-] Exit while loop!')

		browser.implicitly_wait(7)


		# scraping each event here
		events = []
		try:
			xpath_pattern = '//ul[@class="uiList _4kg _6-i _6-h _6-j"]'

			single_event = browser.find_element_by_xpath(xpath_pattern).get_attribute('innerHTML')
			soup = BeautifulSoup(single_event, 'lxml')
			
			events_info = soup.findAll('a', {'_class', '_7ty'})
			events_img = iter(soup.findAll('img'))

			for i in events_info:
				secondary_info = i.next_element.next_element.find('span').text
				date_time  = secondary_info.split('·')[0]
				if 'Today' in secondary_info:
					date_time = selected_date.strftime('%d %b')
					secondary_info = secondary_info.replace('Today', date_time) 
				elif 'Tomorrow' in secondary_info:
					date_time = (selected_date + timedelta(days=1)).strftime('%d %b')
					secondary_info = secondary_info.replace('Tomorrow', date_time)
				elif 'Yesterday' in secondary_info:
					date_time = (selected_date - timedelta(days=1)).strftime('%d %b')
					secondary_info = secondary_info.replace('Yesterday', date_time)

				events.append({
					'name': i.text,
					'id': urlparse(i['href']).path.split('/')[2],
					'image': next(events_img)['src'],
					'info': secondary_info,
					'date_time': date_time
				})

				print('[*] Scraping a record..')

		except Exception as e:
			# print('ops')
			print('[-] Second Exception')
			print(e)
			pass
		
		## last output to the disk
		# with open('events.csv', 'w') as f:
		# 	wr = csv.writer(f, quoting=csv.QUOTE_ALL)
		# 	wr.writerow(events)#
	finally:
		# terminate the browser
		browser.quit()
		print(events)
		return events

if __name__ == '__main__':
	_creds = ['uknano2019@gmail.com', '159753@asd']
	city_id = '115351105145884'
	y = 2020
	m = 4
	d = 11
	pag_thrld = 100

	main(_username=_creds[0],
			_password=_creds[1],
			city_id=city_id,
			year=y,
			month=m,
			day=d,
			pagination_threshold=pag_thrld)