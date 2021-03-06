var w = $(window).width(),
    h = $(window).height(),
    r = w*0.014, // radius of the class
    z = d3.scale.category10(); // color scheme
    dragEle = false, // whether it is being dragged
    prevPos = 0, // previous position of the node at drag
    originPos = 0, // starting position of the node at drag
    dir = 1, // direction of drag
    currentIsRoot = 0; // whehter the node at drag is the basic class


// graph-related

// input of classes
// from one node - what other advanced classes it gives
var revAdj = [ [],   [],   [],   [ 601 ],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [ 45 ],   [ 47 ],   [ 51 ],   [ 48 ],   [ 49, 50, 52, 55 ],   [ 54 ],   [],   [],   [ 53 ],   [ 54 ],   [],   [],   [],   [],   [],   [ 60, 63, 64, 67, 68, 71, 73 ],   [ 70 ],   [],   [],   [],   [],   [],   [ 67 ],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [ 86, 92, 98 ],   [ 90, 91, 95, 96, 97 ],   [ 89, 90 ],   [ 89, 90, 95 ],   [],   [],   [],   [ 93, 94 ],   [ 95 ],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [ 104 ],   [ 105 ],   [ 106 ],   [ 107 ],   [ 108 ],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [ 305, 307 ],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [ 300, 339, 377, 404, 405, 414, 416, 421 ],   [ 301, 311, 314, 316, 318, 322 ],   [ 303, 312, 313, 315, 317, 319, 320 ],   [ 301, 310, 311, 314, 316, 318, 322, 326, 613 ],   [],   [ 306, 309 ],   [ 306, 309 ],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [ 328, 331, 336, 339, 346, 349 ],   [ 329, 330, 345, 350, 357 ],   [],   [ 344 ],   [ 330, 348, 353, 354, 356, 358 ],   [],   [ 349, 860 ],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [ 352, 355 ],   [],   [],   [ 350 ],   [],   [],   [],   [],   [],   [ 347 ],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [ 402, 403 ],   [ 398, 400 ],   [ 386 ],   [],   [ 418, 437, 441 ],   [],   [],   [],   [ 376, 394, 396 ],   [],   [ 388, 422 ],   [ 382 ],   [],   [],   [ 390, 415, 417 ],   [ 389, 417, 422 ],   [ 395, 420, 442 ],   [ 391, 392, 393, 412 ],   [ 392 ],   [],   [ 310 ],   [],   [ 415 ],   [],   [],   [],   [ 401, 429, 431, 432, 436 ],   [],   [ 401 ],   [ 423 ],   [ 424, 425, 431, 432 ],   [ 399 ],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [ 426 ],   [ 427, 428 ],   [],   [],   [ 430 ],   [],   [],   [ 433 ],   [],   [ 435 ],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [ 446 ],   [],   [ 453, 464, 465, 471 ],   [],   [],   [ 464 ],   [],   [],   [ 473 ],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [ 489 ],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [ 551 ],   [],   [ 552 ],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [ 599 ],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [ 603 ],   [ 604 ],   [ 331, 377, 384, 409, 606, 607, 609, 622, 825, 898, 913, 916 ],   [ 331, 377, 384, 409, 606, 607, 609, 622, 825, 898, 913, 916 ],   [ 70, 87, 88, 383, 410, 608, 610, 615, 616, 617, 621, 812 ],   [ 413, 611, 614, 615, 617, 618, 620, 621, 811, 813 ],   [ 399, 431, 614, 619, 620, 811, 818 ],   [ 302 ],   [ 320, 868, 893, 927 ],   [ 612 ],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [ 623, 627 ],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [ 644 ],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [ 669, 680 ],   [],   [ 679 ],   [ 686, 700 ],   [],   [],   [ 686 ],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [ 699 ],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [ 773 ],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [ 730, 732 ],   [],   [],   [],   [],   [],   [],   [ 749 ],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [ 815, 816, 817, 820 ],   [],   [ 819 ],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [ 826 ],   [],   [],   [],   [],   [ 849 ],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [ 854, 855, 856, 860 ],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [ 860 ],   [],   [],   [],   [ 875,     876,     877,     878,     879,     880,     881,     883,     884,     885,     886,     887,     888,     889,     890,     891,     892,     894 ],   [ 883, 884, 885, 886, 887, 888, 889, 891, 892, 894 ],   [ 883 ],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [ 899 ],   [ 372, 373, 809, 900 ],   [ 901 ],   [ 85, 381, 902 ],   [ 903 ],   [ 59, 61, 62, 65, 66, 69, 87, 88, 98, 811, 812, 813, 814, 818 ],   [],   [],   [],   [],   [],   [ 810 ],   [ 331, 825, 913, 916 ],   [ 333, 346, 864, 868, 883, 893, 927, 945 ],   [ 917, 927 ],   [ 333, 346, 868, 883, 893, 927 ],   [],   [],   [ 349 ],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [ 445 ],   [],   [],   [ 976 ],   [ 976 ],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [ 977 ],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [ 1019 ],   [ 1019 ],   [ 1019 ],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [ 1018 ],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [],   [ 734, 735, 736, 737, 738, 739, 740, 741, 742, 743, 744, 745, 746, 747, 748 ],   [ 750, 751, 752 ] ];
// from one node - what classes it needs as pre-req
var adjList = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [44], [], [45], [47], [48], [48], [46], [48], [52], [53, 49], [48], [], [], [], [898, 899, 902, 903, 900, 901], [59], [898, 899, 902, 903, 900, 901], [898, 899, 902, 903, 900, 901], [59], [59], [898, 899, 902, 903, 900, 901], [898, 899, 902, 903, 900, 901], [66, 59], [898, 899, 902, 903, 900, 901, 59], [604, 605, 898, 899, 902, 903, 900, 901], [606, 60], [898, 899, 902, 903, 900, 901, 59], [], [59], [], [], [], [], [], [], [], [], [], [], [], [898, 899, 900, 901], [85], [898, 899, 902, 903, 606, 900, 901], [898, 899, 902, 903, 606, 900, 901], [87, 88], [85, 87, 88, 86], [86], [85], [92], [92], [85, 88, 93, 86], [85, 86], [85, 86], [898, 899, 902, 903, 85, 900, 901], [], [], [], [], [], [103], [104], [105], [106], [107], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [299], [302, 300], [609], [301, 302], [], [162], [305, 162, 304], [162], [], [305, 162, 304], [302, 392], [302, 300], [301, 302], [301, 302], [302, 300], [301, 302], [302, 300], [301, 302], [302, 300], [301], [301, 302, 610], [], [302, 300], [], [], [], [302], [], [327], [328, 327], [331, 328, 327], [604, 605, 910, 327], [], [911, 913], [], [], [327], [], [], [299, 327], [], [], [], [], [330], [328, 327], [911, 913, 327], [355, 346], [331], [913, 327, 333, 916], [913, 328, 327, 349, 916], [], [346], [604, 605, 331, 910], [331], [346], [331], [328, 327], [604, 605, 331, 910], [], [], [], [], [], [], [], [], [], [], [], [], [], [604, 605, 898, 899], [604, 605, 898, 899], [], [], [380], [604, 605, 299], [], [], [], [898, 899, 900, 901], [604, 605, 383], [606], [604, 605], [], [374], [], [382], [387], [386], [389], [389, 390], [389], [380], [388], [380], [], [373], [608, 403], [373], [398, 400], [372], [604, 605, 372], [299], [299], [], [], [], [604, 605], [606], [], [389], [607], [299], [394, 386], [299], [386, 387], [376], [], [388], [299], [387, 382], [401], [402], [402], [425], [426], [426], [398], [429], [608, 398, 402], [398, 402], [432], [], [434], [398], [376], [], [], [], [376], [388], [], [], [954], [954, 445], [], [], [], [], [], [], [447], [], [], [], [], [], [], [], [], [], [], [447, 450], [447], [], [], [], [], [], [447], [], [453], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [464], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [549], [549, 551], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [574], [], [3], [], [602], [603], [], [604, 605], [604, 605], [606], [604, 605], [606], [607], [611], [302], [608, 607], [606, 607], [606], [606, 607], [607], [608], [608, 607], [606, 607], [604, 605], [622], [], [], [], [622], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [642], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [667], [], [], [], [], [], [], [], [], [], [669], [667], [], [], [], [], [], [673, 670], [], [], [], [], [], [], [], [], [], [], [], [], [687], [670], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [726], [], [726], [], [1032], [1032], [1032], [1032], [1032], [1032], [1032], [1032], [1032], [1032], [1032], [1032], [1032], [1032], [1032], [733], [1033], [1033], [1033], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [711], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [604, 605, 898, 899], [909], [898, 899, 902, 903, 608, 900, 901, 607], [898, 899, 902, 903, 606, 900, 901], [898, 899, 902, 903, 900, 901, 607], [898, 899, 902, 903, 900, 901], [813], [813], [813], [898, 899, 902, 903, 608, 900, 901], [815], [813], [], [], [], [], [604, 605, 910], [825], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [830], [], [], [], [], [853], [853], [853], [], [], [], [853, 868, 333], [], [], [], [911], [], [], [], [911, 610, 913], [], [], [], [], [], [], [872], [872], [872], [872], [872], [872], [872], [], [872, 911, 873, 913, 874], [872, 873], [872, 873], [872, 873], [872, 873], [872, 873], [872, 873], [872], [872, 873], [872, 873], [911, 610, 913], [872, 873], [], [], [], [604, 605], [898], [899], [900], [901], [902], [], [], [], [], [], [], [], [], [], [604, 605, 910], [], [], [604, 605, 910], [912], [], [], [], [], [], [], [], [], [], [911, 610, 912, 913], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [911], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [957, 958], [971], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [1010], [991, 992, 993], [], [], [], [], [], [], [], [], [], [], [], [], [], []];

// toy data for instructions
var instructRevAdj = [[1038], [1038], [1039], [1039], [1039], [], [1041], [1042], [1043], [], [1043]];
var instructAdjList = [[], [], [], [], [1034, 1035], [1036, 1037, 1038], [], [1040], [1041], [1042, 1044], []];
var toyComp = [1034, 1035, 1036, 1037, 1038, 1039, 1040, 1041, 1042, 1043];
var instructData = {"nodes": [{"code": "MATH-AD", "group": 5, "name": "TRY! Waive this basic class too", "cid": 1034}, {"code": "MATH-AD", "group": 5, "name": "TRY! Drag to the left to waive", "cid": 1035}, {"code": "ECON-AD", "group": 11, "name": "TRY! Push forward", "cid": 1036}, {"code": "ECON-AD", "group": 8, "name": "Pre-req", "cid": 1037}, {"code": "ECON-AD", "group": 8, "name": "Pre-req", "cid": 1038}, {"code": "ECON-AD", "group": 14, "name": "TRY! Move around advanced class", "cid": 1039}, {"code": "CS-AD", "group": 8, "name": "Pre-req", "cid": 1040}, {"code": "CS-AD", "group": 11, "name": "TRY! Double-click and delete/backspace to remove a class sequence", "cid": 1041}, {"code": "CS-AD", "group": 14, "name": "Advanced Class", "cid": 1042}, {"code": "CS-AD", "group": 17, "name": "Advanced Class", "cid": 1043}, {"code": "CS-AD", "group": 20, "name": "Advanced Class", "cid": 1044}], "links": [{"source": 1038, "target": 1034, "value": 0}, {"source": 1038, "target": 1035, "value": 0}, {"source": 1039, "target": 1036, "value": 0}, {"source": 1039, "target": 1037, "value": 0}, {"source": 1039, "target": 1038, "value": 0}, {"source": 1041, "target": 1040, "value": 0}, {"source": 1042, "target": 1041, "value": 0}, {"source": 1043, "target": 1042, "value": 0}, {"source": 1043, "target": 1044, "value": 0}]};

// data structure for inputting more nodes
var newComp = []; // IDs of the node present
var oldComp = []; // IDs of the node present before drag
var source; // state before drag
var target; // state be fore drag
var visited = []; // check if class has already been added

// keep track of class names 
var dictClassId = {}; // dict class id for search box
var classType = {}; // keep track of types of classes
intializeState();

// initialize visit for getConnecetedComp
function intializeState(){
  visited = [];
  for (var i = 0; i < revAdj.length; i++) {
    visited.push(-1);
  };
}

// clean visit states
function cleanState(){
  visited = visited.map(function(d){
    if (d == Infinity) return Infinity;
    else return -1;
  });
}

// get adj list of the current graphs displayed
function getSubRevAdj(){
  var subRevAdj = node.data().map(function(d) {return {cid: d.cid, child: []};});
  for (var i = 0; i < link.data().length; i++) {
    subRevAdj[(link.data()[i].target.index)].child.push({cid: link.data()[i].source.cid, index: link.data()[i].source.index});
  }
  return subRevAdj;
}

// Get names for feeding to the search box
function getNames(){
  for (var i = 0; i < allData.nodes.length; i++) {
    dictClassId[allData.nodes[i].code+" "+allData.nodes[i].name] = allData.nodes[i].cid;
  };
  return Object.keys(dictClassId);
}

// Get advanced classes
function getSpecialized(){

  var checkRoots = gnodes.data().map(function(d){return 0;});
  var theseLinks = link.data();
  for (var i = 0; i < theseLinks.length; i++) {
    checkRoots[theseLinks[i].target]++;
  }
  checkRoots = checkRoots.map(function(d,i) {
    if (d===0) return i;
    else return - 1;
    })
    .filter(function(d) {
      return d != -1;});
  return checkRoots;

}


// DELETE OPERATION

// delete one node and subsequence classes that depend on it
function deleteNode(whichClass){

  // get adjacency list of the current graph
  // it is reversed - from basic to specialized classes
  var subRevAdj = getSubRevAdj();
  var whichNode = -1;
  for (var i = 0; i < subRevAdj.length; i++) {
    if (subRevAdj[i].cid == whichClass) whichNode = i;
  };

  // check for all classes that depends on it
  
  var arrayDelete = [];
  dfs(whichNode);
  function dfs(root){
    for (var i = 0; i < subRevAdj[root].child.length; i++) {
      dfs(subRevAdj[root].child[i].index); 
    }
    arrayDelete.push(subRevAdj[root].cid);
  }

  // display remaining classes
  newCompMinusDelete(arrayDelete);
  clearNodeEdge();
  cleanState();
  putInfo(-1);

}

// delete only one initial node at the root
function disConnect(indexNode){
  // check if can be waved
  // no edges depend on it
  var subRevAdj = getSubRevAdj();
  var root = 1;
  for (var i = 0; i < subRevAdj.length; i++) {
    for (var j = 0; j < subRevAdj[i].child.length; j++) {
      if (subRevAdj[indexNode].cid == subRevAdj[i].child[j].cid)
        root = 0;
    }
  }
  if (root == 1){

    newCompMinusDelete([subRevAdj[indexNode].cid]);
    clearNodeEdge();
    // intializeState()
    visited[[subRevAdj[indexNode].cid]] = Infinity;
    putInfo(-1);
    return true;
  }
  else{
    return false;
  }
}

// remove specified nodes from list of class IDs in the graph
function newCompMinusDelete(nodesToDelete){
  var remainComp = [];
  for (var i = 0; i < newComp.length; i++) {
    if( $.inArray(newComp[i],nodesToDelete) == -1)remainComp.push(newComp[i]);
  }
  oldComp = newComp;
  newComp = remainComp;
}

// INSERT OPERATION

// get subgraph that include this class
// this is actually dfs on the whole static data
function getConnectedComp(classIndex){

  if (visited[classIndex] != -1) return;
  var thisChild = adjList[classIndex];

  for (var i = 0; i < thisChild.length; i++) {
      getConnectedComp(thisChild[i]);
      visited[thisChild[i]] = 1;
  }
  if ($.inArray(classIndex,newComp) < 0) newComp.push(classIndex);
}

// construct json object from the subgraph (newComp)
function getObj(){
  var numNodes = 0;
  var thisLinks = [];

  for (var i = 0; i < newComp.length; i++) {
    for (var j = 0; j < revAdj[newComp[i]].length; j++) {
      var thisIndex = $.inArray(revAdj[newComp[i]][j],newComp);
      if (thisIndex > 0 ){
        thisLinks.push({"source": numNodes+thisIndex , "target": numNodes+i}); 
      }
    }
  }
  console.log("in getObj");
  console.log(thisLinks);
  return thisLinks;
}

// DRAG ACTIONS

// Drag and Click functionalities
function dragstarted(d) {
  source = [];
  target = [];
  for (var i = 0; i < link.data().length; i++) {
    var thisLink = link.data()[i];
    source.push(thisLink.source.group);
    target.push(thisLink.target.group);
  }
  currentIsRoot = isBasicClass(d.index);
  originPos = d.x;
}

function dragged(d) {
  dragEle = true;
  d.group = whichBox(d);
  dir = 1;
  if (prevPos > d.x) dir = -1;
  prevPos = d.x;
  if (dir == -1) updateLeft();
  else update();
  // var valid = update();
  this.classList.add("dragging");
}

function dragended(d) {
  if (dragEle) dragEle = false;
  this.classList.remove("dragging");
  for (var i = 0; i < node[0].length; i++) {
    node[0][i].classList.remove("bounded");
  };

  if (d.group == 0){
    if (!disConnect(d.index)){
      d.group = 1;
    }
  }

  dir = 1;
  if (originPos > d.x) dir = -1;
  originPos = d.x;
  console.log("end")
  if (dir == -1) {
    console.log("updateleft");
    updateLeft();
  }
  else update();
  force.resume();
}

// HELPER FUNCTIONS TO CHECK STATES

//Check state classes
function isDraggable(ele){
  if (ele.classList.contains("dragging")) return true;
  else return false;
}

function isBounded(ele){
  if (ele.classList.contains("bounded")) return true;
  else return false;
}

function whichBox(d){
  if (d.x - offSet < 0) return 0;
  return (1+ (( (d.x-offSet)/boxTri)|0));
}

function isBasicClass(indexNode){

  var subRevAdj = getSubRevAdj();
  var root = 1;
  for (var i = 0; i < subRevAdj.length; i++) {
    for (var j = 0; j < subRevAdj[i].child.length; j++) {
      if (subRevAdj[indexNode].cid == subRevAdj[i].child[j].cid)
        root = 0;
    }
  }
  return root;
}


// UPDATE NODE POSITIONS

// update behavior when node dragged to the left
function updateLeft(){
    var valid = 1;
    var thisLink;
    for (var i = link.data().length-1; i >= 0; i--) {
      thisLink = link.data()[i];
      if (thisLink.source.group <= thisLink.target.group) {
        console.log(thisLink.target.name+":"+ thisLink.target.group);
        console.log(thisLink.source.name+":"+ thisLink.source.group);
        thisLink.target.group = thisLink.source.group-1;
      }
      if (thisLink.target.group <= 0){
        valid = 0;
      }
    }
    // if we are not deleting it - not the basic class..
    if (currentIsRoot === 0){
      // put it back to previous place
      if ((valid == 0) && (source.length == link.data().length)){
        for (var i = 0; i < link.data().length; i++) {
          var thisLink = link.data()[i];
          thisLink.source.group = source[i];
          thisLink.target.group = target[i];
        }
      }
    }
  return;

}

// update behavior when node dragged to the right

function update(){

  var valid = 1;
  for (var i = 0; i < link.data().length; i++) {
    var thisLink = link.data()[i];
    if (thisLink.source.group <= thisLink.target.group) thisLink.source.group = thisLink.target.group+1;
    if (thisLink.source.group >= (numSemester/2)*3+1){
      valid = 0;
    }
  }
  if ((valid == 0) && (source.length == link.data().length)){
    console.log("invalidd");
    for (var i = 0; i < link.data().length; i++) {
      var thisLink = link.data()[i];
      // console.log(thisLink);
      thisLink.source.group = source[i];
      thisLink.target.group = target[i];
    }
  }
  else if (((valid == 0) && (source.length != link.data().length))){
    // adding of new edges to exceed
    cleanState();
    newComp = oldComp;
    clearNodeEdge();
    putInfo(-1);

  }
  return valid;
}

// Clear before adding
function clearNodeEdge(){
  link = svg.selectAll("line")
  .data([])
  .exit()
  .remove();

  gnodes = svg.selectAll("g.gnode")
  .data([])
  .exit()
  .remove();
}

// Compress the graph
function compress(){
  for (var i = 0; i < node.data().length; i++) node.data()[i].group = 1;
  force.start();
  update();
}

// Put the class and act on the data structures, and D3 force layout objects
function putInfo(classIndex, groups){

  oldComp = newComp.map(function(d){return d;});
  if (classIndex != -1){
    getConnectedComp(classIndex);
    document.getElementById('status').innerHTML = 
    allData.nodes[classIndex].name  +' is added!';
  }
  var thisLinks = getObj();
  var thisNodes = [];

  // get dicitonary of classes
  for (var i = 0; i < newComp.length; i++) {
    var thisNode = allData.nodes[newComp[i]];
    thisNodes.push(thisNode);
    if (classType.hasOwnProperty(thisNode.code.split("-")[0])){
      thisNode.classTypeIndex = classType[thisNode.code.split("-")[0]];
    }
    else{
      thisNode.classTypeIndex = Object.keys(classType).length+1;
      classType[thisNode.code.split("-")[0]] = thisNode.classTypeIndex;
    }
  };

  // if during load the groups argument is passed
  if (groups !== undefined){
    for (var i = 0; i < groups.length; i++) {
      thisNodes[i].group = groups[i];
    }
  }

  var json = {"nodes": thisNodes, "links": thisLinks};

  console.log(json);
  var svgLink  = svg.append("svg:defs")
    .append("linearGradient")                
    .attr("id", "line-gradient")            
    .attr("x1", "0%").attr("y1", "0%")         
    .attr("x2", "100%").attr("y2", "0%")        
    .selectAll("stop")                      
    .data([                             
        {offset: "0%", color: "rgba(32,32,32,1)"},       
        {offset: "100%", color: "rgba(32,32,32,0.1)"},   
    ])                  
    .enter().append("stop")         
    .attr("offset", function(d) { return d.offset; })   
    .attr("stop-color", function(d) { return d.color; }); 

  link = svg.selectAll("line")
  .data(json.links)
  .enter().append("svg:line")
  .attr("stroke", "url(#line-gradient)")
  .attr("stroke-width", "2px");

  gnodes = svg.selectAll("g.gnode")
  .data(json.nodes)
  .enter()
  .append("g")
  .classed('gnode', true);

  var specializedIndex = getSpecialized();
  for (var i = 0; i < specializedIndex.length; i++) {
    gnodes.data()[specializedIndex[i]].classTypeIndex*= -1;
  };

  node = gnodes.append("circle")
  .attr("class", "node")
  .attr("r", r - .75)
  .style("fill", function(d) {
    if  (d.classTypeIndex<0 ) return z(-1+d.classTypeIndex*-1);
    else return z(-1+d.classTypeIndex); 
  })
  .style("stroke", function(d) {
    if (d.classTypeIndex<0 ) return d3.rgb(z(-1+d.classTypeIndex*-1)).darker();
    else return d3.rgb(z(-1+d.classTypeIndex)).darker();
  })
  .style("stroke-width", function(d){
    if  (d.classTypeIndex<0 ) return "5px";
    else return "";
  })
  .call(force.drag)
  .on("dblclick", function(d) { 
    if (isBounded(this)) this.classList.remove("bounded");
    else {
      this.classList.add("bounded");
      $(".bounded")
      .attr("id", d.cid);
    }
  });

  gnodes.append("text")
  .text(function(d) {
    return d.name;
  });


  force
  .nodes(json.nodes)
  .links(json.links)
  .on("tick", tick)
  .start();
}

function tick(e) {

  var theseNodes = node.data();
  var kx = 1 * e.alpha, ky = .2 * e.alpha;
  // for x direction
  for (var i = 0; i < theseNodes.length; i++) {
    var d = theseNodes[i];
    d.x += ( offSet +boxTri*(d.group-1) + (boxTri/2) - d.x) * kx;

  };
  var theseLinks = link.data();
  var countEdgeIn = node.data().map(function(d){return 0;});
  for (var i = 0; i < theseLinks.length; i++) {
    var mult = 3;
    var sign = ((countEdgeIn[theseLinks[i].source.index]++) %2);
    if (sign != 0) mult*=-1;
    mult *= ((countEdgeIn[theseLinks[i].source.index]/2)|0)+1;
    theseLinks[i].target.y += (theseLinks[i].source.y +mult*r - theseLinks[i].target.y) *ky;
  };


  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node.attr("cx", function(d) {
      d.x = Math.max( r, Math.min(offSet + w*widthCov - r, d.x)); 
      $(this.nextSibling).attr("x",d.x+ r/2);
    return d.x;
    }
  )
  .attr("cy", function(d) { 
      d.y = Math.max(r, Math.min(h - r, d.y)); 
      $(this.nextSibling).attr("y",d.y);
      return  d.y;

    });

  link.attr("x1", function(d) { return d.source.x; })
  .attr("y1", function(d) { return d.source.y; })
  .attr("x2", function(d) { return d.target.x; })
  .attr("y2", function(d) { return d.target.y; });

}


//////////////////////////////////////////////////////////////////////

// Initialize set up
// (Initialize the graph is in document.ready)

var link, gnodes, node;
var allData;
var graph;

var outerSVG = d3.select("body").append("svg:svg")
.attr("width", w)
.attr("height", h);

var verColumnsCon = outerSVG.append("g");
var svg = outerSVG.append("svg:g");

// Dragging funcitonalities
var force = d3.layout.force()
.gravity(0)
.charge(0)
.linkStrength(0);

var drag = force.drag()
    .on("dragstart", dragstarted)
    .on("drag", dragged)
    .on("dragend", dragended);

// Create columns for the semesters
var widthCov = 0.7;
var numSemester = 16;
var boxWidth = (w*widthCov)/numSemester;
var boxTri = ((w*widthCov)/(numSemester/2)/3);
var offSet = w*(1-widthCov)/2;


svg.append("svg:rect")
.attr("width", widthCov*w)
.attr("height",h)
.attr("x", offSet)
.style("stroke", "#000");

for (var i = 1; i < numSemester; i++) {
    var columns = verColumnsCon
    .append("svg:line")
    .attr("id","semSep")
    .attr("x1", offSet+i*boxWidth)
    .attr("x2", offSet+i*boxWidth)
    .attr("y1", 0)
    .attr("y2", h);
    if (i%2 == 1)   columns.style("stroke-dasharray", ("3, 3"));
    else  columns.style("stroke", "#000");
}

for (var i = 0; i < numSemester; i++) {
    var textString = "";
    if (i%4 < 2) textString = "FA";
    else textString = "SP";
    if (i%2 ==1) textString += "2";
    else textString += "1";
    var textSem = verColumnsCon.append("svg:text")
    .text(textString)
    .attr("x", offSet+i*boxWidth + boxWidth/2)
    .attr("y", h*0.05)
    .attr("fill", "rgba(32,32,32,.3)")
    .style("text-anchor" ,"middle");
}

// Add text
verColumnsCon.append("svg:text")
.text("Drag class here to waive <-")
.attr("x", offSet/2)
.attr("y", h/2)
.attr("fill", "rgba(32,32,32,.3)")
.style("text-anchor" ,"middle");

var fourYears = ["Freshman", "Sophomore", "Junior", "Senior"];
for (var i = 0; i < 4; i++) {
  verColumnsCon.append("svg:text")
  .text(fourYears[i])
  .attr("x", offSet + (boxWidth*4)*i + (boxWidth*2))
  .attr("y", h*0.9)
  .attr("fill", "rgba(32,32,32,.3)")
  .style("text-anchor" ,"middle");
}




$(document).ready(function(){

  // Interact with back-end to get database

  // create document for the user
  function saveClass(userID, major, myclasses, wavedclasses){

    obj = {
      _id: userID,
      major: [],
      myclasses: newComp,
      wavedclasses: [],
      groups: [],
    };
    console.log(obj);
    $.ajax({
      url: '/saveClass',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(obj),
      error: function(resp){
        console.log("Oh no in client...");
        console.log(resp);
      },
      success: function(resp){
        console.log('WooHoo!');
        console.log(resp);
      }
    });

  };

  // updateClass - actually overwrite the exisiting document with specified id on database
  function updateClass(){

    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        document.getElementById('status').innerHTML = 
        'Saving ' + newComp.length + ' classes!';

        var userID= response.authResponse.userID;
        var groupsClass = node.data().map(function(d){return d.group;}); 
        console.log(groupsClass);
        var obj = {
                _id: userID,
                major: [],
                myclasses: newComp,
                wavedclasses: [],
                groups: groupsClass,
              };
        console.log(obj);
        $.ajax({
          url: '/updateClass',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(obj),
          error: function(resp){
            console.log("Oh no in client...");
            console.log(resp);
          },
          success: function(resp){
            console.log('WooHoo!');
            document.getElementById('status').innerHTML =
            'Saved ' + obj.myclasses.length + ' classes!';
        
          }
        });
      }
    else{
      document.getElementById('status').innerHTML = 
      'Please log into Facebook to save your classes.';

    }
    });
      
  };

  // retrieve saved data given the user

  function loadClass(){
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          document.getElementById('status').innerHTML =
          'Loading your classes ...';
    
          clearNodeEdge();
          var userID= response.authResponse.userID;


          console.log("sendAjax");
          $.ajax({
            url: '/loadClass/'+userID,
            type: 'GET',
            dataType: 'json',
            error: function(resp){
              console.log(resp);
              alert("Oh No! Try a refresh?");
            },
            success: function(resp){
              console.log(resp.error);
              if (resp.error === "not_found"){
                saveClass(userID,0,0,0); //args not needed yet
                newComp = toyComp;
                putInfo(-1)
                document.getElementById('status').innerHTML =
                'You do not have any classes saved. First, add classes from the search box.';
                
              }
              else{
                newComp = resp.myclasses;
                console.log(resp);
                if (newComp.length == 0) {
                  document.getElementById('status').innerHTML =
                  'You do not have any classes saved. First, add classes from the search box.';
                  newComp = toyComp;
                }
                else{
                  document.getElementById('status').innerHTML =
                  'Loaded ' + newComp.length + ' classes!';
                  

                }
                if (resp.groups.length !== 0) putInfo(-1,resp.groups);
                else putInfo(-1);
              }
              force.start();
              update();
            }
          });
      }
      else{

        document.getElementById('status').innerHTML = 
        'Please log into Facebook to load your classes. But try out classes from the search box.';
        
        clearNodeEdge();
        newComp = toyComp;
        putInfo(-1);
        force.start();
      }
    });
    

  };

  // Initialize graph

  d3.json("data.json", function(jsonData) {
  allData = jsonData;

  $("#searchClass").autocomplete({
      source: getNames(),
      multiple: true,
      mustMatch: false,

  });

  allData.nodes = (allData.nodes).concat(instructData.nodes);
  allData.links = (allData.links).concat(instructData.links);
  revAdj = revAdj.concat(instructRevAdj);
  adjList = adjList.concat(instructAdjList);

  newComp = [1034, 1035, 1036, 1037, 1038, 1039, 1040, 1041, 1042, 1043];
  putInfo(-1);
  force.start();

  });

  // bind actions to element on DOM

  $('#searchClass').attr('size', ((offSet/6)|0)-3 );

  $('#loadClass').click(function (){
    loadClass();
  });

  $('#saveClass').click(function (){
    updateClass();
  });


  $(document).on("keydown", function(e){

    // delete
    if (e.keyCode == 8) {
      if ($('.bounded').length > 0){
        e.preventDefault();
        var classToDelete = $('.bounded').attr("id");
        deleteNode(classToDelete);
      }
    }

    if (e.keyCode == 13){
      if ($('#searchClass').is(':focus')){
        var className = $('#searchClass').val();
        $("#searchClass").val("");

        if (className != ""){
          var whichClass = dictClassId[className];
          if (whichClass !== undefined){
            clearNodeEdge();
            putInfo(whichClass);
            force.start();
            update();
          }
        }

      }
    }

  });


    
});

