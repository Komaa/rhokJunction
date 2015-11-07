/**
* Sezi algorithm
*
* Dependencies
* -
* -
*/
function preprocess(input){
  var clusterofseat = new Map();  //<sleepy, arrayofseat[22A,22B,22C, etc.]
  clusterofseat=createclustermap(!!!someinput);
  var freeseat= []; //arrayofseat[21A,21B,21C, etc.]
  freeseat=calculatefreeseat(!!!someinput);

  assignseat(freeseat,clusterofseat,user);
}

function assignseat(freeseat, clusterofseat, user){
  var seat={};
  var existingcluster=false;
  clusterofseat.forEach(function(value, key) {
      if(key === user.preference){
        existingcluster=true;
        seat=grouptocluster(freeseat, value);
        if(seat.row== -1){
          seat=calculatefarestseat(freeseat, clusterofseat);
          var seatgroup= [];
          seatgroup=myMap.get(user.preference);
          seatgroup.push(seat);
          clusterofseat.set(user.preference,seatgroup);
        }
      }
    }
    if(!existingcluster){
      seat=calculatefarestseat(freeseat, clusterofseat);
      var newseatgroup= [];
      newseatgroup.push(seat);
      clusterofseat.set(user.preference,newseatgroup);
    }
}

function grouptocluster(freeseat, seatgroup){
  var seat= {};
  var max=0, tmp;

  for(int i=0;i<freeseat.length;i++){
    tmp=closestseat(freeseat[i],seatgroup);
    if(tmp==1){
      return freeseat[i];
    }
  }
  seat.row=-1;
  return seat;
}

function closestseat(seat,seatgroup){
  var mindist=10000,tmpdistance;
    for(int i=0;i<seatgroup.length;i++){
      tmpdistance=distancecalculator(seat,seatgroup[i]);
      if(tmpdistance<maxdist){
        maxdist=tmpdistance;
      }
    }
  
  return mindist;
}

function calculatefarestseat(freeseat, clusterofseat){
  var max=0, tmp;
  var seattmp= {};
  for(int i=0;i<freeseat.length;i++){
    tmp=calculatemindistance(freeseat[i],clusterofseat);
    if(tmp>max){
      max=tmp;
      seattmp=freeseat[i];
    }
  }
  return seattmp;
}

function calculatemindistance(seat,clusterofseat){
  var mindist=10000,tmpdistance;
  clusterofseat.forEach(function(value, key) {
    for(int i=0;i<value.length;i++){
      tmpdistance=distancecalculator(seat,value[i]);
      if(tmpdistance<maxdist)
        maxdist=tmpdistance;
    }
  }
return mindist;
}

function distancecalculator(freeseat,occseat){  //22A
  var row_distance=0, column_distance=0;
  row_distance=freeseat.row - occseat.row;
  column_distance=freeseat.column - occseat.column;
  return (row_distance + column_distance);
}

