# !/usr/bin/python
#  -*- coding: UTF-8 -*-
import json
import xlrd
import xlwt
import argparse
import sys
import os
import time
import urllib.parse
import urllib

today = time.strftime("%Y-%m-%d", time.localtime())


workbook = xlrd.open_workbook('植物档案.xlsx')

data = workbook.sheets()[0]

rowNum = data.nrows  # sheet行数
colNum = data.ncols  # sheet列数

#  获取所有单元格的内容
data_list = []
for i in range(1, rowNum):
    rowlist = []
    for j in range(colNum):
        ctype = data.cell(i, j).ctype
        cell = data.cell_value(i, j)
        if data.cell(i, j).ctype == 3:
            dt = xlrd.xldate.xldate_as_tuple(data.cell_value(i, j), 0)
            rowlist.append('%04d-%02d-%02d' % dt[0:3])
            continue
        if ctype == 2 and cell % 1 == 0.0:  # ctype为2且为浮点
            cell = int(cell)
            rowlist.append(cell)
            continue
        rowlist.append(data.cell_value(i, j))
    data_list.append(rowlist)


# 输出所有单元格的内容

rowNum -= 1


# for i in range(rowNum):
#     for j in range(colNum):
#         print(data_list[i][j], ' ', end="")
#     print('\n')


labels = [
    [0, '名字', lambda x:x],
    [1, 'latin', lambda x:x],
    [2, '是否写入图鉴', lambda x:x],
    [3, '属', lambda x:x],
    [4, '科', lambda x:x],
    [5, '目', lambda x:x],
    [6, '纲', lambda x:x],
    [7, '门', lambda x:x],
    [8, '观赏时间', lambda x:x],
    [9, '地点', lambda x:x],
    [10, '坐标', lambda x:x],
    [11, '关系', lambda x:x],


    # [9, '状况', lambda x:'不明' if len(x) < 1 else x],

]

data_json = []

for i in range(rowNum):
    json_line = {}

    for j in labels:
        json_line[j[1]] = j[2](data_list[i][j[0]])

    data_json.append(json_line)

# print(data_json)


# 创建猫文件夹
if not os.path.exists('vegetations'):
    os.makedirs('vegetations')

#  用于搜索关系链接
names = []

for line in data_json:
    if line['是否写入图鉴'] != '':
        names.append(line['名字'])
# print(names)


for line in data_json:
    if line['是否写入图鉴'] != '':
        if not os.path.exists('vegetations/' + line['名字']):
            os.makedirs('vegetations/' + line['名字'])
            # 创建每只猫的文件夹
        # 创建js文件
        with open('vegetations/' + line['名字'] + '/' + line['名字'] + '.js', 'w', encoding='utf-8') as f:
            f.write('Page({ \n data: {\n' 'name:"' +
                    line['名字'] + '",\n nameit:"' + line['latin'] + '",\n')
            # 地图坐标
            f.write('markers: [\n')
            maps = line['坐标']
            coor = maps.split(";")
            coor.remove("")
            for point in coor:
                x, y = point.split(",")
                # print(x, y)
                f.write('\n{iconPath: "/pages/images/' +
                        line['名字'] + '_circle.png",\n')
                f.write('latitude:"' + x + '",\n')
                f.write('longitude:"' + y + '",\n')
                f.write('width: 50,\nheight: 50\n},],\n')
            # 各个属性
            f.write(" items:[ \n")
            for j in labels:
                if j[1] == '名字' or j[1] == 'latin':
                    # print('{ name:"'+str(line[j[1]])+'"},')
                    continue
                if str(line[j[1]]) == '' or j[1] == '是否写入图鉴' or j[1] == '坐标':
                    continue
                # print(j[1] + " " + str(line[j[1]]))
                f.write(
                    '{category:"' + j[1] + '",\n content:" ' + str(line[j[1]]) + '",},\n')
            f.write('\n], \n')
            # 增加关系跳转项
            f.write('relationship:[')
            for i in names:
                if i in line['关系'] and i != line['名字']:
                    f.write('{ rela:"' + i + '"},\n')
            f.write('], \n')
            #  后面的图片数
            f.write('nums:[\n')
            for i in range(int(line['是否写入图鉴'])):
                f.write('{ ' + 'num: {} '.format(i + 1) + '},\n')
            f.write('],\n')
            # 音频数
            # if line['是否加音频']:
            #     audio = '//pku-lostangel.oss-cn-beijing.aliyuncs.com/' + \
            #         line['名字']
            #     audio = urllib.parse.quote(audio)
            #     f.write('audioArr: [\n')
            #     for i in range(line['是否加音频']):
            #         f.write('{\n ' + "src: 'https:" + audio +
            #                 "{}.m4a'".format(i + 1) + ',\nbl: false\n},\n')
            #     f.write("],\n  audKey: '', \n},\n")
            # else:
            f.write('},')
            with open('js.txt', 'r', encoding='utf-8') as f2:
                f.write(f2.read())

        # 补充另外两个文件
        with open('vegetations/' + line['名字'] + '/' + line['名字'] + '.json', 'w', encoding='utf-8') as f:
            with open('json.txt', 'r', encoding='utf-8') as f2:
                f.write(f2.read())
        with open('vegetations/' + line['名字'] + '/' + line['名字'] + '.wxml', 'w', encoding='utf-8') as f:
            with open('wxml.txt', 'r', encoding='utf-8') as f2:
                f.write(f2.read())
                if line['名字'] == '小黄鸭':
                    with open('文案/小黄鸭.txt', 'r', encoding='utf-8') as f2:
                        f.write(f2.read())


# 创建地图文件夹
if not os.path.exists('map'):
    os.makedirs('map')


mapid = 0

# 创建js文件
with open('map/' + 'map.js', 'w', encoding='utf-8') as f:
    f.write('Page({ \n data: {\n markers: [ \n')
    for line in data_json:
        maps = line['坐标']
        coor = maps.split(";")
        coor.remove("")
        for point in coor:
            x, y = point.split(",")
            print(x, y)
            f.write('\n{iconPath: "/pages/images/' +
                    line['名字'] + '_circle.png",\n')
            f.write('id:"' + str(mapid) + '",\n')
            f.write('name:"' + line['名字'] + '",\n')
            f.write('latitude:"' + x + '",\n')
            f.write('longitude:"' + y + '",\n')
            f.write('width: 50,\nheight: 50\n},\n')
            mapid += 1
    with open('js-map.txt', 'r', encoding='utf-8') as f2:
        f.write(f2.read())

"""
# 几个分页的index内容（显示哪些猫）
health = []
fostered = []
dead = []
unknown = []
nainiu = []
sanhua = []
chunse = []
lihua = []
ju = []
suoyou = []


#  分类
for i in range(rowNum):
    if data_list[i][3] != '':
        if data_list[i][9] == '离世':
            dead.append((data_list[i][2], data_list[i][21]))
        if data_list[i][9] == '送养':
            fostered.append((data_list[i][2], data_list[i][20]))
        if (data_list[i][9] == '不明' or data_list[i][9] == '许久未见'or data_list[i][9] == '失踪') and data_list[i][2] != '花灵灵':
            unknown.append(data_list[i][2])
        if (data_list[i][9] == '健康' or data_list[i][9] == '口炎') and data_list[i][2] != '出竹':
            if data_list[i][6] == 1:
                lihua.append(data_list[i][2])
            if data_list[i][6] == 2:
                ju.append(data_list[i][2])
            if data_list[i][6] == 3:
                nainiu.append(data_list[i][2])
            if data_list[i][6] == 4:
                sanhua.append(data_list[i][2])
            if data_list[i][6] == 5:
                chunse.append(data_list[i][2])

lihua.insert(0, '出竹')
unknown.insert(0, '花灵灵')
health = lihua + ju + nainiu + sanhua + chunse
suoyou = health

# 调整寄养的时间顺序
fostered = sorted(fostered, key=lambda student: student[1], reverse=True)

# 调整离世的时间顺序
dead = sorted(dead, key=lambda student: student[1], reverse=True)


# 创建毛色分类的js文件
# 奶牛
if not os.path.exists('index/奶牛'):
    os.makedirs('index/' + '奶牛')  # 创建每只猫的文件夹
    # 创建js文件
with open('index/奶牛/奶牛' + '.js', 'w', encoding='utf-8') as f:
    f.write('Page({\ndata: { \n catlist: [\n')
    for name in nainiu:
        f.write('{ name:"' + name + '"},')
    with open('js2.txt', 'r', encoding='utf-8') as f2:
        f.write(f2.read())

# 狸花
if not os.path.exists('index/狸花'):
    os.makedirs('index/' + '狸花')  # 创建每只猫的文件夹
    # 创建js文件
with open('index/狸花/狸花' + '.js', 'w', encoding='utf-8') as f:
    f.write('Page({\ndata: { \n catlist: [\n')
    for name in lihua:
        f.write('{ name:"' + name + '"},')
    with open('js2.txt', 'r', encoding='utf-8') as f2:
        f.write(f2.read())

# 玳瑁及三花
if not os.path.exists('index/玳瑁及三花'):
    os.makedirs('index/' + '玳瑁及三花')  # 创建每只猫的文件夹
    # 创建js文件
with open('index/玳瑁及三花/玳瑁及三花' + '.js', 'w', encoding='utf-8') as f:
    f.write('Page({\ndata: { \n catlist: [\n')
    for name in sanhua:
        f.write('{ name:"' + name + '"},')
    with open('js2.txt', 'r', encoding='utf-8') as f2:
        f.write(f2.read())

# 纯色
if not os.path.exists('index/纯色'):
    os.makedirs('index/' + '纯色')  # 创建每只猫的文件夹
    # 创建js文件
with open('index/纯色/纯色' + '.js', 'w', encoding='utf-8') as f:
    f.write('Page({\ndata: { \n catlist: [\n')
    for name in chunse:
        f.write('{ name:"' + name + '"},')
    with open('js2.txt', 'r', encoding='utf-8') as f2:
        f.write(f2.read())

# 橘猫及橘白
if not os.path.exists('index/橘猫及橘白'):
    os.makedirs('index/' + '橘猫及橘白')  # 创建每只猫的文件夹
    # 创建js文件
with open('index/橘猫及橘白/橘猫及橘白' + '.js', 'w', encoding='utf-8') as f:
    f.write('Page({\ndata: { \n catlist: [\n')
    for name in ju:
        f.write('{ name:"' + name + '"},')
    with open('js2.txt', 'r', encoding='utf-8') as f2:
        f.write(f2.read())

# 所有
if not os.path.exists('index/所有'):
    os.makedirs('index/' + '所有')  # 创建每只猫的文件夹
    # 创建js文件
with open('index/所有/所有' + '.js', 'w', encoding='utf-8') as f:
    f.write('Page({\ndata: { \n catlist: [\n')
    for name in suoyou:
        f.write('{ name:"' + name + '"},')
    with open('js2.txt', 'r', encoding='utf-8') as f2:
        f.write(f2.read())

# 创建状态分类的js文件
with open('index/index' + '.js', 'w', encoding='utf-8') as f:
    f.write('Page({\ndata: { \n')
    #  fostered
    f.write(' fostered_catlist: [\n')
    for name in fostered:
        f.write('{ name:"' + name[0] + '"},\n')
    f.write('],\n')
    #  unknown
    f.write(' unknown_catlist: [\n')
    for name in unknown:
        f.write('{ name:"' + name + '"},\n')
    f.write('],\n')
    #  dead
    f.write(' dead_catlist: [\n')
    for name in dead:
        f.write('{ name:"' + name[0] + '"},\n')
    f.write('],\n')
    with open('js_index.txt', 'r', encoding='utf-8') as f2:
        f.write(f2.read())


# print(fostered)
"""
