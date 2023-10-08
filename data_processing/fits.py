from astropy.io import fits
import sys
import numpy as np
from astropy.nddata.utils import Cutout2D
from astropy.wcs import WCS
from astropy.coordinates import SkyCoord
import csv
from statistics import variance


filename=input()
output=(filename)

def getFiles(name,band):
    print(name)
    psf=fits.open(name)
    xd = psf[0].header['NAXIS1']
    yd = psf[0].header['NAXIS2']
    wcs = WCS(psf[0].header)
    filter=[]
    px=[]
    py=[]
    ints=[]
    ra=[]
    dec=[]
    for i in range(xd):
        for j in range(yd):
            filter.append(band)
            z = psf[0].data[j,i]
            px.append(i)
            py.append(j)
            ints.append(z)
            position = wcs.pixel_to_world(j,i)
            
            ra.append(position.ra.degree)
            dec.append(position.dec.degree)

    return(filter,px,py,ra,dec,ints,xd,yd)


data = getFiles(str(sys.argv[1]),1)
datatable=[[0]*16 for i in range(data[6]*data[7])]
for i in range(len(data[0])):
                datatable[i][0]=data[1][i]
                datatable[i][1]=data[2][i]
                datatable[i][2]=data[3][i]
                datatable[i][3]=data[4][i]
                datatable[i][4]=data[5][i]
                

for i in range(len(sys.argv)-2):
                data = getFiles(str(sys.argv[i+2]),i+2)
                for j in range(len(data[0])):
                    datatable[j][5+i]=data[5][j]


average=0

for i in range(len(sys.argv)-1):
    temp=0
    for j in range(data[6]*data[7]):
        temp=temp+datatable[j][4+i]   
    average=temp/(data[6]*data[7])
    for k in range(data[6]*data[7]):
        datatable[k][8+i]=datatable[k][4+i]/average

    


for i in range(data[6]*data[7]):
    
    for j in range(len(sys.argv)-1):
        datatable[i][12]=datatable[i][12]+datatable[i][j+8]
        
    datatable[i][13]=(3.4*datatable[i][8]+ 4.6*datatable[i][9]+12*datatable[i][10]+22*datatable[i][11])/datatable[i][12]
    datatable[i][14]=variance([datatable[i][8],datatable[i][9],datatable[i][10],datatable[i][11]])
    datatable[i][15]=datatable[i][10]-datatable[i][8]

              

with open(output, 'a') as csvfile:
                w = csv.writer(csvfile)
                header=['px','py','ra','dec','w1','w2','w3','w4','w1n','w2n','w3n','w4n','wn_sum','wl_normm','wn_std','SF']
                w.writerow(header)
                for j in range(len(datatable)):
                    w.writerow(datatable[j])


