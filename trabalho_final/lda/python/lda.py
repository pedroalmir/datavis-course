import csv
import pyLDAvis
import pyLDAvis.sklearn
	
with open('D:/Git/datavis-course/trabalho_final/data/PostsTreated.csv', mode='r') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    line_count = 0
    for row in csv_reader:
        print(row["text"])
        line_count += 1
    print(line_count)