import re
from datetime import datetime, timedelta

main_url = r"https://www.facebook.com/events/discovery/?suggestion_token=%7B%22city%22%3A%22115351105145884%22%2C%22time%22%3A%22%7B%5C%22start%5C%22%3A%5C%222000-01-30%5C%22%2C%5C%22end%5C%22%3A%5C%222000-05-05%5C%22%7D%22%2C%22timezone%22%3A%22Africa%2FCairo%22%7D&acontext=%7B%22ref%22%3A2%2C%22ref_dashboard_filter%22%3A%22upcoming%22%2C%22source%22%3A2%2C%22source_dashboard_filter%22%3A%22discovery%22%2C%22action_history%22%3A%22[%7B%5C%22surface%5C%22%3A%5C%22dashboard%5C%22%2C%5C%22mechanism%5C%22%3A%5C%22main_list%5C%22%2C%5C%22extra_data%5C%22%3A%7B%5C%22dashboard_filter%5C%22%3A%5C%22upcoming%5C%22%7D%7D%2C%7B%5C%22surface%5C%22%3A%5C%22discover_filter_list%5C%22%2C%5C%22mechanism%5C%22%3A%5C%22surface%5C%22%2C%5C%22extra_data%5C%22%3A%7B%5C%22dashboard_filter%5C%22%3A%5C%22discovery%5C%22%7D%7D%2C%7B%5C%22surface%5C%22%3A%5C%22discover_filter_list%5C%22%2C%5C%22mechanism%5C%22%3A%5C%22surface%5C%22%2C%5C%22extra_data%5C%22%3A%7B%5C%22dashboard_filter%5C%22%3A%5C%22discovery%5C%22%7D%7D]%22%2C%22has_source%22%3Atrue%7D"

date_pattern = r"%5C%22%3A%5C%22\d\d\d\d-\d\d-\d\d%5C"
date_left_part = r"%5C%22%3A%5C%22"
date_right_part = "%5C"

city_pattern = r"%7B%22city%22%3A%22\d*%"
city_left_part = r"%7B%22city%22%3A%22"
city_right_part = r"%"


def fetch_city_id(url):

	return re.search(city_pattern, url).group(0).lstrip(city_left_part).rstrip(city_right_part)

def append_city_id(url, city_id):

	return re.sub(city_pattern, city_left_part+city_id+city_right_part, url)


def append_dates(url, year, month, day, period_by_days=1):
	start_date = datetime(int(year), int(month), int(day))

	end_date = start_date + timedelta(days=period_by_days)

	url = re.sub('start' + date_pattern,
			'start' + date_left_part + start_date.strftime('%Y-%m-%d') + date_right_part,
			url
	)

	url = re.sub('end' + date_pattern,
			'end' + date_left_part + end_date.strftime('%Y-%m-%d') + date_right_part,
			url
		)

	return url
