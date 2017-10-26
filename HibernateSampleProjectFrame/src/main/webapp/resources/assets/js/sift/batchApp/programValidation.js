function ProgramValidation(){
	var fromnode;
	var tonode;
	nodeDataArray = myDiagram.model.nodeDataArray;
	linkDataArray = myDiagram.model.linkDataArray;
	if(linkDataArray != undefined && linkDataArray != ""){
		for (var i = 0; i < linkDataArray.length; i++) {
			fromnode = myDiagram.findNodeForKey(linkDataArray[i].from);
			tonode = myDiagram.findNodeForKey(linkDataArray[i].to);
			if(!linkValidator(fromnode,null,tonode,null)){
				bootbox.alert('The link from ' + fromnode.data.category + ' to ' + tonode.data.category + ' is invalid');
        			return false;			
			}
		
		}
	}
	if(nodeDataArray != undefined && nodeDataArray != ""){
		for (var i = 0; i < nodeDataArray.length; i++) {
			if(nodeDataArray[i].category == 'Trigger'){
				if(!(triggerNodeValidation(nodeDataArray[i]))){
					bootbox.alert('Please select Trigger Id for ' +nodeDataArray[i].category );
					return false
				}
			}
			else if(nodeDataArray[i].category == 'Offer'){
				if(!(offerNodeValidation(nodeDataArray[i]))){
					bootbox.alert('Please select Offer Id and Offer Priority Score for ' +nodeDataArray[i].offerType +" offer" );
					return false
				}
			}
			else if(nodeDataArray[i].category == 'Reminder'){
				if(!(reminderNodeValidation(nodeDataArray[i]))){
					bootbox.alert('Please select Reminder name, Reminder criteria and Reminder message for ' +nodeDataArray[i].reminderType +" reminder");
					return false
				}
			}
		}
	}
	
	return true;

}
function triggerNodeValidation(nodeData){
	if(!nodeData.hasOwnProperty("triggerId")){
		return false;
	}
	return true
	
}

function offerNodeValidation(nodeData){
	if(!(nodeData.hasOwnProperty("offerId") && nodeData.hasOwnProperty("offerPriorityScore"))){
		return false;
	}
	return true
}

function reminderNodeValidation(nodeData){
	if(!(nodeData.hasOwnProperty("reminderName") && nodeData.hasOwnProperty("reminderMessages") && nodeData.hasOwnProperty("reminderCriterias"))){
		return false;
	}
	return true
}



function linkValidator(fromnode, fromport, tonode, toport) {
	/*var fromData = fromnode.data;
	var toData = tonode.data;
	var fromCategory = fromData.category;
	var toCategory = toData.category;
	if(fromCategory == "Start" && toCategory != "Trigger"){
		return false;	
	}else if(fromCategory == "End" || toCategory == "Start"){
		return false;	
	}else if((fromCategory == "Trigger" || fromCategory == "NoEvent") && toCategory != "Offer"){
		return false;	
	}else if(fromCategory == "Reminder"){
		return false;	
	}else if(fromCategory=="Offer"){
		
		if(toCategory == "End"){

		}else if(fromData.offerType == "Conditional"){
			if((toCategory == "NoEvent" || toCategory == "Reminder" )){
				var linksConnected = fromnode.linksConnected;
				var status = true;
				linksConnected.each(function(link){
					if(link.toNode.data.key != toData.key ){
						if(link.toNode.data.category == toCategory){
							if(toCategory == "NoEvent"){
								status = false;
								return;
							}else if(toData.reminderType=="Scheduled"&&toData.reminderType==link.toNode.data.reminderType)
							{
								status = false;
								return ;	
							}
						}
					}
					
				});
				if(!status){
					return false;
				}
			}else{
				return false;			
			}
			
		}else{
				return false;
		}
			
			
	} 
*/

	return true;
}
