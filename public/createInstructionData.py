offset = 1034
code = ["MATH-AD","MATH-AD","ECON-AD","ECON-AD","ECON-AD","ECON-AD"]
code += ["CS-AD", "CS-AD","CS-AD","CS-AD","CS-AD"]
group = [5,5,11,8,8,14]
group += [8,11,14,17,20]
name = ["Waive basic class", "TRY! Drag to the left to waive", "TRY! Push forward", "Pre-req","Pre-req", "TRY! Move advanced"]
name += ["TRY! Double-click and delete/backspace", "Remove class sequence", "advanced","advanced","advanced"]

source = [4, 4, 5, 5, 5, 7, 8, 9, 9]
target = [0, 1, 2, 3, 4, 6, 7, 8, 10]
source = [each+offset for each in source]
target = [each+offset for each in target]


theIDs = range(offset,offset+len(code))
print theIDs
allNodes = []
for i, eachID in enumerate(theIDs):
	thisNode = {}
	
	thisNode["cid"] = eachID
	thisNode["code"] = code[i]
	thisNode["group"] = group[i]
	thisNode["name"] = name[i]
	allNodes.append(thisNode)

allLinks = []
for i in range(len(source)):
	print i
	thisLink = {}
	thisLink["source"] = source[i]
	thisLink["target"] = target[i]
	thisLink["value"] = 0
	allLinks.append(thisLink)
addDict = {}
addDict["nodes"] = allNodes
addDict["links"] = allLinks

n = len(name)
revAdj = [[] for i in range(n)]
for i, each in enumerate(target):
	whichNode = each-offset
	print whichNode
	revAdj[whichNode].append(source[i])
print revAdj
print "----"
adjList = [[] for i in range(n)]
for i, each in enumerate(source):
	whichNode = each-offset
	adjList[whichNode].append(target[i])
print adjList
adjListDict = {}
adjListDict["revAdj"] = revAdj
adjListDict["adjList"] = adjList

import json
with open('instructionAdd.json', 'w') as outfile:
	json.dump(addDict, outfile)

with open('adjListAdd.json','w') as outfile:
	json.dump(adjListDict, outfile)