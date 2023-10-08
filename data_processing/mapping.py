#output = 'm31.csv'#Command : python this_file.py data.csv

import sys
import pandas as pd
import math
import csv

output = 'input.csv'
jsonfile = 'input.json'

datacsv = sys.argv[1]
csvv=pd.read_csv(str(datacsv))

posx = csvv['px']
posy = csvv['py']
#raa = csvv['ra']
#decc = csvv['dec']
bass = csvv['w4n']
vol = csvv['wn_sum']
base = csvv['wl_normm']
chord = csvv['wn_std']
#ring = csvv['SF']

n = len(posx)

# the items in music array:

# volume for base_note (40-80 db)   vol_base_note
# bass (1-8 for c, to c)            bass_note
# volume for bass (45 db)           vol_bass_note
# base_note (1-15 for c to c'')     base_note
# chord_note (an array)             chord_note
# volume of chord note              vol_chord_note

music = []
for i in range(n):
    music.append([])


# for volume of base_note
highv = 120
lowv = 40
maxv = max(vol)
minv = min(vol)
dis = highv-lowv
v_be_n = []
for i in range(n):
    h2 = ((vol[i]-minv)/(maxv-minv))*(highv-lowv)+lowv
    music[i].append(h2)
    v_be_n.append(h2)

# for bass
highb = max(bass)
lowb = min(bass)
disb = (highb-lowb)/7
bs_n = []
for i in range(n):
    h3 = math.floor((base[i]-lowb)/disb)+1
    music[i].append(h3)
    bs_n.append(h3)

v_bs_n=[]
# for volume of bass_note
for i in range(n):
    music[i].append(45)
    v_bs_n.append(45)

c_n = []
b_n = []

# for chord of base_note
saturation_std = sum(chord)/len(chord)
mins = min(chord)
diss = (saturation_std-mins)/3

# for base note aand chord note
high = max(base)
low = min(base)
dis = (high-low)/14

for i in range(n):
    h = math.floor((base[i]-low)/dis)+1
    music[i].append(h)
    b_n.append(h)
    h4 = math.floor((chord[i]-mins)/diss)+1

    if h4 == 1:
        music[i].append([h+2])
        c_n.append([h+2])
    else:
        if h4 == 2:
            music[i].append([h+2,h+4])
            c_n.append([h+2,h+5])
        else:
            if h4 == 3:
                music[i].append([h+2,h+4,h+6,h+8])
                c_n.append([h+2,h+5,h+7,h+9])
            else:
                music[i].append([h+2,h+4,h+6,h+8,h+10,h+12])
                c_n.append([h-2,h+3,h+6,h+8,h+10,h+13])

# for volume of  chord_note
v_c_n = []
for i in range(n):
    music[i].append(55)
    v_c_n.append(55)

df = pd.DataFrame()
df['px'] = posx
df['py'] = posy
df['vol_base_note'] = v_be_n
df['bass_note'] = b_n
df['vol_bass_note'] = v_bs_n
df['base_note'] = b_n
df['chord_note'] = c_n
df['vol_chord_not'] = v_c_n

df.to_csv(output, index=False)
df.to_json(jsonfile,indent=4,orient='records')


'''
with open(output, 'a') as csvfile:
    w = csv.writer(csvfile)
    w.writerow(['px','py','vol_base_note','bass_note','vol_bass_note','base_note','chord_note','vol_chord_not'])
    for j in range(len(music)):
        row = []
        row.append(posx[j])
        row.append(posy[j])
        for k in range(len(music[j])):
            row.append(music[j][k])
        w.writerow(row)

df = pd.read_csv(output)
df.to_json(jsonfile,indent = 4,orient = 'records')
'''
