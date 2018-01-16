publications = ["(Lisbon) Expresso", "(Mexico City) Centro", "Al Shabiba", "Battle Creek Enquirer", "Beijing News Agency", "Bergens Tidende", "Berliner Morgenpost", "Bild am Sonntag", "Chatelaine", "Chicago Tribune", "Chillicothe Gazette", "China Daily", "Clarín", "Crain’s Cleveland Business", "Dagens Nyheter", "Der Tagesspiegel", "Di Weekend", "Die Welt", "Die Zeit", "El (Lima) Comercio", "El Colombiano", "El Columbiano", "El Diario de Hoy", "El Financiero", "El TelÂŽgrafo", "Excelsior", "Folha de São Paulo", "Galileu", "Greenville News", "Gulf News", "Helsingin Sanomaat", "Het Parool", "Honolulu Star-Bulletin", "La Nación", "La Prensa Gráfica", "La Razón de México", "La Repubblica", "La Voz del Interior", "LEQ Law Enforcement Quarterly", "Los Angeles Times", "Metro São Paulo", "Ming Pao Daily News", "Minneapolis Star Tribune", "Minneapolis/St. Paul Business Journal", "Mundo Estranho", "National Geographic Magazine", "National Geographic Traveler", "National Post", "New York Times Magazine", "O Estado de Sao Paulo", "O Globo", "Omaha World-Herald", "Orlando Sentinel", "Philippine Daily Inquirer", "Pittsburgh Post-Gazette", "Politico Europe", "Politico Magazine", "Politiken", "Prensa Libre", "Provincia", "Reporte Indigo", "Revista SaÂœde", "San Francisco Business Times", "San Francisco Chronicle", "Scenario Magazine", "Science", "South China Morning Post", "Stuttgarter Zeitung", "Sun Sentinel", "Svenska Dagbladet", "Tampa Bay Times", "The (Colorado Springs) Gazette", "The (London) Sunday Times", "The (New York) Wall Street Journal", "The Arizona Republic", "The Boston Globe", "The Buffalo News", "The Business Times", "The Chronicle of Higher Education", "The Dallas Morning News", "The Denver Post", "The Economic Observer", "The Globe and Mail", "The Guardian", "The Indianapolis Star", "The Louisville Courier-Journal", "The Mercury News", "The National", "The New York Times", "The New York Times Magazine", "Omaha World-Herald", "The Plain Dealer", "The San Diego Union-Tribune", "The Seattle Times", "The Sunday", "The Sydney Morning Herald", "The Tennessean", "The Times Polska", "The Villages Daily Sun", "The Virginian-Pilot", "The Washington Post", "Times of Oman", "Today", "USA Today", "Variety", "Verdens Gang", "Washington Business Journal", "Welt am Sonntag", "Zhejiang Daily"]
formated_publications = []
for item in publications:
	start = '{"publication": "'
	end = '"},'
	string = start + item + end
	formated_publications.append(string)
	# print(string)


mystring = ''.join(formated_publications)
f = open("json_publications", "w")
f.write(mystring)