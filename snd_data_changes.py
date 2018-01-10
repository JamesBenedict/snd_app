# rename csv headers
# open csv
# loop through each row
# for each row
# 	if blank fill in null
# 	if not, fill in dictonary item
# 	create img path etc. from data 
# for item in dictonary plug into csv
# save csv

# rename csv headers
	# ref, img, img_path, (name: the, publication) city, state, country, award, section, multiple_section, category, specific_category, designer 1-10, title 1-10
	# imports
import os
import pandas as pd
import numpy as np
from shutil import copyfile

# open data
path = os.getcwd() + '/'
# d = csv.DictReader(open('static/snd_winners.csv', 'r'))
snd_data = pd.read_csv('static/snd_winners.csv', encoding = 'ISO-8859-1')
# snd_data = pd.read_csv('static/snd_winners.csv', encoding = 'mac_latin2')

def null_format(item):
	if pd.isnull(item):
		item = ""
	else:
		item = item
	return item
	# print(item)
	
def ref_format(num):
	# utility to make all numbers four digits, 1 becomes 0001
	num = str(num)
	if len(num) < 4:
		zeros = 4 - int(len(num))
		num = str('0' * zeros) + num
	else:
		num = num 
	return num

def name_format(the, publication):
	if(pd.isnull(the)):
		the = ""
	else:
		the = the
	if(pd.isnull(publication)):
		print('publication name error')
	if len(str(the)) < 0:
		return publication
	else:
		return str(the) + ' ' + publication

def state_format(state):
	return null_format(state)

def country_format(country):
	if pd.isnull(country):
		country = "United States"
	else:
		country = country.capitalize()
	return country

def award_format(award):
	award = null_format(award)
	if award.strip() == "World's Best-Designed":
		award = "World's Best-Designed"
	elif award.strip() == "World's Best-DesignedÂª":
		award = "World's Best-Designed"
	elif award.strip() == "World's Best-Designedª":
		award = "World's Best-Designed"
	elif award.strip() == "World's Best-DesignedÂ":
		award = "World's Best-Designed"
	else:
		award = award 
	return award

def award_sinlge_word_format(award):
	award_single_word = ""
	if award.strip() == "World's Best-Designed":
		award_single_word = "WBD"
	elif award.strip() == "World's Best-DesignedÂª":
		award_single_word = "WBD"
	elif award.strip() == "World's Best-Designedª":
		award_single_word = "WBD"
	elif award.strip() == "World's Best-DesignedÂ":
		award_single_word = "WBD"
	elif award.strip() == "Award of Excellence & JSR":
		award_single_word = "AEJSR"
	elif award.strip() == "JSR (Overall)":
		award_single_word = "JSR"
	elif award.strip() == "Award of Excellence":
		award_single_word = "AE"
	elif award.strip() == "Silver":
		award_single_word = "S"
	elif award.strip() == "Gold":
		award_single_word = "G"
	elif award.strip() == "Gold & JSR":
		award_single_word = "GJSR"
	return award_single_word

def award_weight_format(award):
	award_weight = 8
	if award == "WBD":
		award_weight = 1
	elif award == "GJSR":
		award_weight = 2
	elif award == "G":
		award_weight = 3
	elif award == "S":
		award_weight = 4
	elif award == "JSR":
		award_weight = 5
	elif award == "AEJSR":
		award_weight = 6
	elif award == "AE":
		award_weight = 7
	return award_weight

def general_category_format(category):
	category = category.replace('[', ', ')
	category = category.replace(']', '')
	category = category.replace(' , ', ', ')
	if category == "World's Best-Designedª":
		category = "World's Best-Designed"
		print('flag')
	return category

def category_single_word_format(category):
	category_single_word = ""
	if category == "World's Best-Designed":
		category_single_word = "WBD"
	elif category == "Miscellaneous":
		category_single_word = "MIS"
	elif category == "Opinion Design":
		category_single_word = "OPD"
	elif category == "Special News Topics":
		category_single_word = "SNT"
	elif category == "Special Sections":
		category_single_word = "SPS"
	elif category == "News Design, Pages":
		category_single_word = "NDP"
	elif category.strip() == "Photography, Multiple Photos":
		category_single_word ="PMP"
	elif category == "Photography, Single Photos":
		category_single_word = "PSP"
	elif category == "Page Design, Individual Portfolio":
		category_single_word = "PDP"
	elif category == "Special Coverage":
		category_single_word = "SPC"
	elif category == "Combination Print & Digital":
		category_single_word = "CPD"
	elif category == "Information Graphics, Single":
		category_single_word = "IGS"
	elif category == "Editorial Cartoons":
		category_single_word = "EDC"
	elif category == "Features Design, Pages":
		category_single_word = "FDP"
	elif category == "Breaking News Topics":
		category_single_word = "BNT"
	elif category == "Illustration":
		category_single_word = "ILL"
	elif category == "Multiple Illustrations":
		category_single_word = "MIL"
	elif category == "Page Design, Staff Portfolio":
		category_single_word = "PDS"
	elif category == "Reprints":
		category_single_word = "RPR"
	elif category == "Magazines":
		category_single_word = "MAG"
	elif category == "Information Graphics, Multiple":
		category_single_word = "IGM"
	elif category == "Features Design, Sections":
		category_single_word = "FDS"
	elif category == "Redesigns":
		category_single_word = "RED"
	elif category == "News Design, Sections":
		category_single_word = "NDS"
	elif category.strip() == "Opinion":
		category_single_word = "OPI"
	elif category == "Opinion section":
		category_single_word = "OPS"
	return category_single_word

def item_formater():
	# loops through the data and formats each column item correctly
	data = []
	for index, row in snd_data.iterrows():
		row['ref'] = ref_format(row['ref'])
		# print(row['ref'])
		row['publication'] = name_format(row['the'], row['publication']).strip()
		# print(row['publication'])
		# print(row['city'])
		row['state'] = state_format(row['state'])
		# print(row['state'])
		row['country'] = country_format(row['country'])
		# print(row['country'])
		# row['award'] = null_format(row['award'])
		row['award'] = award_format(row['award'])
		# print(row['award'])

		row['award_single_word'] = award_sinlge_word_format(row['award'])
		# print(row['award_single_word'])
		row['award_weight'] = award_weight_format(row['award_single_word'])
		row['general_category'] = general_category_format(row['general_category'])
		# print(row['general_category'])

		row['general_category_single_word'] = category_single_word_format(row['general_category'])
		# print(row['general_category_single_word'])
		
		row['name1'] = null_format(row['name1']).strip()
		row['name2'] = null_format(row['name2']).strip()
		row['name3'] = null_format(row['name3']).strip()
		row['name4'] = null_format(row['name4']).strip()
		row['name5'] = null_format(row['name5']).strip()
		row['name6'] = null_format(row['name6']).strip()
		row['name7'] = null_format(row['name7']).strip()
		row['name8'] = null_format(row['name8']).strip()
		row['name9'] = null_format(row['name9']).strip()
		row['name10'] = null_format(row['name10']).strip()

		row['title1'] = null_format(row['title1']).strip()
		row['title2'] = null_format(row['title2']).strip()
		row['title3'] = null_format(row['title3']).strip()
		row['title4'] = null_format(row['title4']).strip()
		row['title5'] = null_format(row['title5']).strip()
		row['title6'] = null_format(row['title6']).strip()
		row['title7'] = null_format(row['title7']).strip()
		row['title8'] = null_format(row['title8']).strip()
		row['title9'] = null_format(row['title9']).strip()
		row['title10'] = null_format(row['title10']).strip()

		
		
		snd_entry = [ row['ref'], row['publication'], row['city'], row['state'], row['country'], row['award'], row['award_single_word'], row['award_weight'], row['general_category'], row['general_category_single_word'], row['specific_category'], row['name1'], row['title1'], row['name2'], row['title2'], row['name3'], row['title3'], row['name4'], row['title4'], row['name5'], row['title5'], row['name6'], row['title6'], row['name7'], row['title7'], row['name8'], row['title8'], row['name9'], row['title9'], row['name10'], row['title10'] ]
		data.append(snd_entry)	
	# print(data)
	snd_data_filtered = pd.DataFrame(data = data, index=None, columns=['ref', 'publication', 'city', 'state', 'country', 'award', 'award_single_word', 'award_weight', 'general_category', 'general_category_single_word', 'specific_category', 'name1', 'title1', 'name2', 'title2', 'name3', 'title3', 'name4', 'title4', 'name5', 'title5', 'name6', 'title6', 'name7', 'title7', 'name8', 'title8', 'name9', 'title9', 'name10', 'title10'])

	# print(snd_data_filtered.head())
	snd_data_filtered.to_csv('snd_data_filtered.csv')

item_formater()
# data_test()