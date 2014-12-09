CoursePlanning
==============
Demo at https://course-planning.herokuapp.com/

Planning classes and their pre-requisites to fit 4-year schedule can be a painful task. NYUAD Course Planner populates pre-requisites of specified classes and allows interactive class sequencing.

1) Process data

The data is scraped using BeautifulSoup with Python. Information includes the pre-requisites classes, course code, and course name. Fortunately, the names for classes described on the websites are consistent. In other words, the pre-requisites listed for one class actually refer exactly and uniquely to one the classes listed. In this way, the data is actually a network/graph of classes, where each node represents a class.

One problem with the data is that, there are redundancies on the class pre-requisites. Some classes need pre-requisites, a set of classes, but these set of classes have, in turn, pre-requisite relations among themselves. Suppose A depends on B and C:  B -> A, and C -> A. However, B also depends on C: C -> B. The redundant part is C -> A. The whole relation can be described as a linear sequence of C -> B -> A. The problem then is to remove every link between a pair of nodes that has distance not equal to the longest path between that pair of nodes. Effectively, one checks if a direct jump from one node to the other node could have been reached through a longer route. This means that we would not want edge short-cut C -> A, because we know C can reach A via a longer path.

To solve this problem, one can give -1 to all the existing edge, and infinity to the rest in an adjacency matrix. Then one uses Floyd algorithm which finds the minimum path length between all pairs of nodes. Afterwards, traverse the graph passing through all the edges and remove those that are short-cuts. This is implemented in shortestPath.js

2) D3 visualization

The force layout take in two parts of data. The nodes and their edges. The node contains data about classes. The edges contain value of source and target, specifying to which pair of nodes the edge connects them. 

The control of movement comes from tick() function which would be run for a certain period of time after any interactions with the nodes. Information of how the nodes are being moved are from drag call back. For example, to know which direction the node is being moved involves checking current position with the previous one.

These are the functionalities that are implemented

2.1) Making the node bounded vertically and aligned with the semester

This involves changing the force layout library to turn off the repulsion force in X direction. Each node is assigned a group according to the position it is being dragged to. With these known groups, the nodes moves to a specific point along X-axis depending on its group.

2.2) Making the node spatially spaced in Y direction

This involves specifying a rule such that nodes spread out more if they have more siblings. In other words, three nodes leading to a node would spread out more than two nodes would. 

2.3) Pushing forward a basic classes would push forward  specialized classes, and pushing backwards specialized classes would push back basic classes

This involves checking the links connecting the nodes as it is moved whether it violates the sequential structure (basic classes come before specialized classes)

2.4) Deleting one class will delete all the classes that depend on it

This involves depth-first graph traversal starting from the node that is being deleted

2.5) Waiving basic classes

This involves checking if a class is the root of the graph i.e there are no edges pointing towards it.

3) Integrating Database and Facebook Login

Facebook login is used to get unique identification of a user to create id for the document to be stored in cloudant. Each document then contains the list of classes IDs of the nodes and their corresponding positions. With these two information, one is able to load the saved classes and put them at the right semester.

All the interactions with database from the front-end actually sends ajax call to the server which then sends request to database and return the data accordingly. 

