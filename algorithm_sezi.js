/**
* Sezi algorithm
*
* Dependencies
* -
* -
*/
function preprocess(seatmap, preference){
  var clusterofseat = new Map();  //<sleepy, arrayofseat[22A,22B,22C, etc.]
  clusterofseat=createclustermap(seatmap);
  var freeseat= []; //arrayofseat[21A,21B,21C, etc.]
  freeseat=calculatefreeseat(seatmap);
  return assignseat(freeseat,clusterofseat,preference);
}

function calculatefreeseat(seatmap){
  var freeseat= [];
  var seat= {};
  var col;
  for(i=0;i<seatmap.length;i++){
    for(j=0;j<seatmap[i].length;j++){
      if(seatmap[i][j] !== "_" && seatmap[i][j] !== "/0"){
        if(seatmap[i][j] === "a"){
          if(j<3)
            col=j-1;
          else if(j>7)
            col=j+1;
          seat.row=i;
          seat.column=col;
          freeseat.push(seat);
        }
      }
    }
  }
  return freeseat;
}

function createclustermap(seatmap){
  var clusterofseat = new Map();
  var seat= {};
  var col;
  var seats=[];
  for(i=0;i<seatmap.length;i++){
    for(j=0;j<seatmap[i].length;j++){//<sleepy, arrayofseat[22A,22B,22C, etc.]
      if((seatmap[i][j] !== "_") && (seatmap[i][j] !== "/0") && (seatmap[i][j] !== "a")){
        if(j<3)
          col=j-1;
        else if(j>7)
          col=j+1;
        seat.row=i;
        seat.column=col
        seats=clusterofseat.get(seatmap[i][j]);
        if(seats){
          seats.push(seat);
          clusterofseat.set(seatmap[i][j],seats);
        }else{
          var filfrocio=[];
          filfrocio.push(seat);
          clusterofseat.set(seatmap[i][j],filfrocio);
        }
        }
      }
    }
    return clusterofseat;
  }


function assignseat(freeseat, clusterofseat, preference){
  var seat={};
  var existingcluster=false;
  clusterofseat.forEach(function(value, key) {
      if(key === preference){
        existingcluster=true;
        seat=grouptocluster(freeseat, value);
        if(seat.row== -1){
          seat=calculatefarestseat(freeseat, clusterofseat);
          var seatgroup= [];
          seatgroup=myMap.get(preference);
          seatgroup.push(seat);
          clusterofseat.set(preference,seatgroup);
        }
      }
    });
    if(!existingcluster){
      seat=calculatefarestseat(freeseat, clusterofseat);
      var newseatgroup= [];
      newseatgroup.push(seat);
      clusterofseat.set(preference,newseatgroup);
    }
    return seat;
}

function grouptocluster(freeseat, seatgroup){
  var seat= {};
  var max=0, tmp;

  for(i=0;i<freeseat.length;i++){
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
    for(i=0;i<seatgroup.length;i++){
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
  for(i=0;i<freeseat.length;i++){
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
    for(i=0;i<value.length;i++){
      tmpdistance=distancecalculator(seat,value[i]);
      if(tmpdistance<maxdist)
        maxdist=tmpdistance;
    }
  });
return mindist;
}

function distancecalculator(freeseat,occseat){  //22A
  var row_distance=0, column_distance=0;
  row_distance=freeseat.row - occseat.row;
  column_distance=freeseat.column - occseat.column;
  return (row_distance + column_distance);
}
