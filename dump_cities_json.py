import json

data = {
	'London, United Kingdom': '106078429431815',
	'La Paz, Bolivia': '112118618814985',
	'Shanghai, China': '106324046073002',
	'San Juan, Argentina': '104032629633440',
	'Chiang Mai, Thailand': '111591762192643',
	'Mumbai, Maharashtra': '114759761873412',
	'Bangkok, Thailand': '110585945628334',
	'Gdansk, Poland': '112082238810004' ,
	"N'Djamena, Chad": '106511226050901',
	'Surabaya, Indonesia': '107934015907468',
	'Istanbul, Turkey': '106012156106461',
	'Da Nang, Vietnam': '111711568847056',
	'Oakland, California': '108363292521622',
	'Sanaa, Yemen': '115292248485081',
	'Cairo, Egypt': '115351105145884',
	'São Paulo, Brazil': '112047398814697',
	'Nashville, Tennessee': '106220079409935',
	'Ndola, Zambia': '112173828801255',
	'Kyiv, Ukraine': '111227078906045',
	'Paris, France': '110774245616525',
	'La Paz, Bolivia': '112118618814985',
	'Tokyo, Japan': '121336244603804',
	'Gothenburg, Sweden' : '104005829635705',
	'Phuket, Thailand':'110729412288885',
	'Smögen, Sweden': '112106535472826',
	'Los Angeles, United States':'110970792260960',
	'San Fransisco, United States': '110274138992583',
	'Tanta, Egypt': '105529376148316',
	
}



with open('cities.json', 'w') as f:
	json.dump(data, f)