var programDiagram;
var programLifetimeData;

$(function() {
	initProgramDiagram();

});

var colors = {
	darkGreen : '#006400',
	greenApple : '#4CC417',
	darkBlue : '#0000A0',
	purple : '#800080',
	burgundy : '#8C001A',
	blue : "#00B5CB",
	orange : "#FFA500",
	silver : "#C0C0C0",
	white : "#F5F5F5",
	dodgerblue : "dodgerblue",
	firebrick : "#F62817",
	chocolate : '#C85A17',
	blueGray : '#98AFC7',
	cobaltBlue : '#0020C2',
	lightStateBlue : '#736AFF',
	butterflyBlue : '#38ACEC',
	venomGreen : '#728C00',
	sandstone : '#786D5F',
	green : '#00FF00',
	yellow : '#FFFF00',
	deepSkyBlue : '#3BB9FF',
	red : '#FF0000',
	lavendar : '#E6E6FA',
	lightBlue : '#00A9C9'
	
}

function initProgramDiagram() {	

	var gojs = go.GraphObject.make;

	for (var k in icons) {
		icons[k] = go.Geometry.fillPath(icons[k]);
	}

	function geoFunc(geoname) {
		if (icons[geoname]) return icons[geoname];
		else return icons["heart"]; // default icon
	}

	programDiagram = gojs(go.Diagram, "programDiagram", {
		initialContentAlignment : go.Spot.Center,
		allowDrop : true, // must be true to accept drops from the Palette
		/*"LinkDrawn" : showLinkLabel,*/ // this DiagramEvent listener is defined below
		/*"LinkRelinked" : showLinkLabel,*/
		"animationManager.duration" : 800, // slightly longer than default (600ms) animation
		"undoManager.isEnabled" : true // enable undo & redo
	});

	// when the document is modified, add a "*" to the title and enable the "Save" button
	programDiagram.addDiagramListener("Modified", function(e) {
		var button = document.getElementById("SaveButton");
		if (button)
			button.disabled = !programDiagram.isModified;
		var idx = document.title.indexOf("*");
		if (programDiagram.isModified) {
			if (idx < 0)
				document.title += "*";
		} else {
			if (idx >= 0)
				document.title = document.title.substr(0, idx);
		}
	});

	programDiagram.addDiagramListener("ObjectDoubleClicked", onNodeSelected);

	function nodeStyle() {
		return [
			new go.Binding("location", "loc", go.Point.parse)
					.makeTwoWay(go.Point.stringify), {
				locationSpot : go.Spot.Center,
				mouseEnter : function(e, obj) {
					showPorts(obj.part, true);
				},
				mouseLeave : function(e, obj) {
					showPorts(obj.part, false);
				}
			} 
		];
	}

	function makePort(name, spot, output, input) {
		return gojs(go.Shape, "Circle", {
			fill : "transparent",
			strokeWidth : 2,
			stroke : null, // this is changed to "white" in the showPorts function
			desiredSize : new go.Size(8, 8),
			alignment : spot,
			alignmentFocus : spot, // align the port on the main Shape
			portId : name, // declare this object to be a "port"
			fromSpot : spot,
			toSpot : spot, // declare where links may connect at this port
			fromLinkable : output,
			toLinkable : input, // declare whether the user may draw links to/from here
			cursor : "pointer" // show a different cursor to indicate potential link point
		});
	}

	var lightText = '#FFFFFF';

	programDiagram.nodeTemplateMap.add("generator", 
		gojs(go.Node, "Spot", nodeStyle(),
			// the main object is a Panel that surrounds a TextBlock with a rectangular Shape
			gojs(go.Panel, "Auto", 
				gojs(go.Shape, "Rectangle", {
						height : 50,
						stroke : null
					},
					new go.Binding("fill", "color")
				), 
				gojs(go.TextBlock, {
						font : "bold 9pt Helvetica, Arial, sans-serif",
						stroke : lightText,
						margin : 8,
						maxSize : new go.Size(160, NaN),
						wrap : go.TextBlock.WrapFit,
						editable : false
					}, 
					new go.Binding("text", "text").makeTwoWay()
				)
			),
			// four named ports, one on each side:
			makePort("L", go.Spot.Left, true, true), 
			makePort("R", go.Spot.Right, true, true)//,
			//makePort("T", go.Spot.Top, true, true), 
			//makePort("B", go.Spot.Bottom, true, true)
		)
	);
	
	programDiagram.nodeTemplateMap.add("Start", gojs(go.Node, "Spot", nodeStyle(),
			gojs(go.Panel, "Auto", gojs(go.Shape, "Circle", {
				fill : colors["red"],
				width : 45,
				height : 45,
				stroke : null
			}), gojs(go.TextBlock, {
				font : "bold 9pt Helvetica, Arial, sans-serif",
				stroke : lightText,
				margin : 8,
				maxSize : new go.Size(160, NaN),
				wrap : go.TextBlock.WrapFit,
				editable : true
			}, new go.Binding("text", "text").makeTwoWay())),
			// makePort("R", go.Spot.Right, true, false),
			makePort("B", go.Spot.Bottom, true, true)));

	programDiagram.nodeTemplateMap.add("End", gojs(go.Node, "Spot", nodeStyle(),
			gojs(go.Panel, "Auto", gojs(go.Shape, "Circle", {
				fill : colors['red'],
				width : 45,
				height : 45,
				stroke : null
			}), gojs(go.TextBlock, {
				font : "bold 9pt Helvetica, Arial, sans-serif",
				stroke : lightText,
				margin : 8,
				maxSize : new go.Size(160, NaN),
				wrap : go.TextBlock.WrapFit,
				editable : true
			}, new go.Binding("text", "text").makeTwoWay())), makePort("T",
					go.Spot.Top, false, true)
	// makePort("L", go.Spot.Left, false, true),
	// makePort("R", go.Spot.Right, true, false)
	// makePort("B", go.Spot.Bottom, true, true)
	));
	
	programDiagram.nodeTemplateMap.add("SegmentCriteria", gojs(go.Node, "Spot",
			nodeStyle(),
			// the main object is a Panel that surrounds a TextBlock with a
			// rectangular Shape
			gojs(go.Panel, "Auto", gojs(go.Shape, "RoundedRectangle", {
				height : 50,
				stroke : null
			}, new go.Binding("fill", "color")),
			// success green circle
			gojs(go.Shape, "Circle", {
				alignment : go.Spot.TopRight,
				fill : "green",
				width : 10,
				height : 10,
				visible : false,
				click : function(e, obj) {
					alert("Success");
				}
			}, new go.Binding("visible", "success")),

			// error red circle
			gojs(go.Shape, "Circle", {
				alignment : go.Spot.TopRight,
				fill : "red",
				width : 10,
				height : 10,
				visible : false,
				click : function(e, obj) {
					alert("Failure");
				}
			}, new go.Binding("visible", "error")),

			// notify yellow circle
			gojs(go.Shape, "Rectangle", {
				alignment : go.Spot.TopLeft,
				fill : "yellow",
				width : 50,
				height : 11,
				visible : false
			}, new go.Binding("visible", "list")),
			// kruz

			// text in yellow box
			gojs(go.TextBlock, {
				textAlign : "center",
				alignment : go.Spot.TopLeft,
				font : "bold 8pt serif",
				click : function(e, obj) {
					alert(obj.text);
				}
			},

			new go.Binding("text", "number")),

			gojs(go.TextBlock, {
				font : "bold 9pt Helvetica, Arial, sans-serif",
				stroke : lightText,
				margin : 8,
				maxSize : new go.Size(160, NaN),
				wrap : go.TextBlock.WrapFit,
				editable : true
			}, new go.Binding("text", "text").makeTwoWay())),
			// four named ports, one on each side:
			makePort("T", go.Spot.Top, true, true), makePort("L", go.Spot.Left,
					true, true), makePort("R", go.Spot.Right, true, true),
			makePort("B", go.Spot.Bottom, true, true)));

	programDiagram.nodeTemplateMap.add("FilterCriteria", gojs(go.Node, "Spot",
			nodeStyle(),
			// the main object is a Panel that surrounds a TextBlock with a
			// rectangular Shape
			gojs(go.Panel, "Auto", gojs(go.Shape, "RoundedRectangle", {
				height : 50,
				stroke : null
			}, new go.Binding("fill", "color")),
			// success green circle
			gojs(go.Shape, "Circle", {
				alignment : go.Spot.TopRight,
				fill : "green",
				width : 10,
				height : 10,
				visible : false,
				click : function(e, obj) {
					alert("Success");
				}
			}, new go.Binding("visible", "success")),

			// error red circle
			gojs(go.Shape, "Circle", {
				alignment : go.Spot.TopRight,
				fill : "red",
				width : 10,
				height : 10,
				visible : false,
				click : function(e, obj) {
					alert("Failure");
				}
			}, new go.Binding("visible", "error")),

			// notify yellow circle
			gojs(go.Shape, "Rectangle", {
				alignment : go.Spot.TopLeft,
				fill : "yellow",
				width : 50,
				height : 11,
				visible : false
			}, new go.Binding("visible", "list")),
			// kruz

			// text in yellow box
			gojs(go.TextBlock, {
				textAlign : "center",
				alignment : go.Spot.TopLeft,
				font : "bold 8pt serif",
				click : function(e, obj) {
					alert(obj.text);
				}
			},

			new go.Binding("text", "number")),

			gojs(go.TextBlock, {
				font : "bold 9pt Helvetica, Arial, sans-serif",
				stroke : lightText,
				margin : 8,
				maxSize : new go.Size(160, NaN),
				wrap : go.TextBlock.WrapFit,
				editable : true
			}, new go.Binding("text", "text").makeTwoWay())),
			// four named ports, one on each side:
			makePort("L", go.Spot.Left, true, true), makePort("R",
					go.Spot.Right, true, true), makePort("T", go.Spot.Top,
					true, true), makePort("B", go.Spot.Bottom, true, true)));

	programDiagram.nodeTemplateMap.add("ControlGroup", gojs(go.Node, "Spot",
			nodeStyle(), gojs(go.Panel, "Auto", gojs(go.Shape,
					"RoundedRectangle", {
						height : 50,
						stroke : null
					}, new go.Binding("fill", "color")),
			// success green circle
			gojs(go.Shape, "Circle", {
				alignment : go.Spot.TopRight,
				fill : "green",
				width : 10,
				height : 10,
				visible : false,
				click : function(e, obj) {
					alert("Success");
				}
			}, new go.Binding("visible", "success")),

			// error red circle
			gojs(go.Shape, "Circle", {
				alignment : go.Spot.TopRight,
				fill : "red",
				width : 10,
				height : 10,
				visible : false,
				click : function(e, obj) {
					alert("Failure");
				}
			}, new go.Binding("visible", "error")),

			// notify yellow circle
			gojs(go.Shape, "Rectangle", {
				alignment : go.Spot.TopLeft,
				fill : "yellow",
				width : 50,
				height : 11,
				visible : false
			}, new go.Binding("visible", "list")),
			// kruz

			// text in yellow box
			gojs(go.TextBlock, {
				textAlign : "center",
				alignment : go.Spot.TopLeft,
				font : "bold 8pt serif",
				click : function(e, obj) {
					alert(obj.text);
				}
			},

			new go.Binding("text", "number")),

			gojs(go.TextBlock, {
				font : "bold 9pt Helvetica, Arial, sans-serif",
				stroke : lightText,
				margin : 8,
				maxSize : new go.Size(160, NaN),
				wrap : go.TextBlock.WrapFit,
				editable : true
			}, new go.Binding("text", "text").makeTwoWay())),
			// four named ports, one on each side:
			makePort("L", go.Spot.Left, true, true), makePort("R",
					go.Spot.Right, true, true), makePort("T", go.Spot.Top,
					true, true), makePort("B", go.Spot.Bottom, true, true)));

	programDiagram.nodeTemplateMap.add("OutputController", gojs(go.Node, "Spot",
			nodeStyle(), gojs(go.Panel, "Auto", gojs(go.Shape,
					"RoundedRectangle", {
						height : 50,
						stroke : null
					}, new go.Binding("fill", "color")),
			// success green circle
			gojs(go.Shape, "Circle", {
				alignment : go.Spot.TopRight,
				fill : "green",
				width : 10,
				height : 10,
				visible : false,
				click : function(e, obj) {
					alert("Success");
				}
			}, new go.Binding("visible", "success")),

			// error red circle
			gojs(go.Shape, "Circle", {
				alignment : go.Spot.TopRight,
				fill : "red",
				width : 10,
				height : 10,
				visible : false,
				click : function(e, obj) {
					alert("Failure");
				}
			}, new go.Binding("visible", "error")),

			// notify yellow circle
			gojs(go.Shape, "Rectangle", {
				alignment : go.Spot.TopLeft,
				fill : "yellow",
				width : 50,
				height : 11,
				visible : false
			}, new go.Binding("visible", "list")),
			// kruz

			// text in yellow box
			gojs(go.TextBlock, {
				textAlign : "center",
				alignment : go.Spot.TopLeft,
				font : "bold 8pt serif",
				click : function(e, obj) {
					alert(obj.text);
				}
			},

			new go.Binding("text", "number")),

			gojs(go.TextBlock, {
				font : "bold 9pt Helvetica, Arial, sans-serif",
				stroke : lightText,
				margin : 8,
				maxSize : new go.Size(160, NaN),
				wrap : go.TextBlock.WrapFit,
				editable : true
			}, new go.Binding("text", "text").makeTwoWay())),
			// four named ports, one on each side:
			makePort("L", go.Spot.Left, true, true), makePort("R",
					go.Spot.Right, true, true), makePort("T", go.Spot.Top,
					true, true), makePort("B", go.Spot.Bottom, true, true)));
	
	programDiagram.nodeTemplateMap.add("JoinData", gojs(go.Node, "Spot",
			nodeStyle(), gojs(go.Panel, "Auto", gojs(go.Shape,
					"RoundedRectangle", {
						height : 50,
						stroke : null
					}, new go.Binding("fill", "color")),
			// success green circle
			gojs(go.Shape, "Circle", {
				alignment : go.Spot.TopRight,
				fill : "green",
				width : 10,
				height : 10,
				visible : false,
				click : function(e, obj) {
					alert("Success");
				}
			}, new go.Binding("visible", "success")),

			// error red circle
			gojs(go.Shape, "Circle", {
				alignment : go.Spot.TopRight,
				fill : "red",
				width : 10,
				height : 10,
				visible : false,
				click : function(e, obj) {
					alert("Failure");
				}
			}, new go.Binding("visible", "error")),

			// notify yellow circle
			gojs(go.Shape, "Rectangle", {
				alignment : go.Spot.TopLeft,
				fill : "yellow",
				width : 50,
				height : 11,
				visible : false
			}, new go.Binding("visible", "list")),
			// kruz

			// text in yellow box
			gojs(go.TextBlock, {
				textAlign : "center",
				alignment : go.Spot.TopLeft,
				font : "bold 8pt serif",
				click : function(e, obj) {
					alert(obj.text);
				}
			},

			new go.Binding("text", "number")),

			gojs(go.TextBlock, {
				font : "bold 9pt Helvetica, Arial, sans-serif",
				stroke : lightText,
				margin : 8,
				maxSize : new go.Size(160, NaN),
				wrap : go.TextBlock.WrapFit,
				editable : true
			}, new go.Binding("text", "text").makeTwoWay())),
			// four named ports, one on each side:
			makePort("L", go.Spot.Left, true, true), makePort("R",
					go.Spot.Right, true, true), makePort("T", go.Spot.Top,
					true, true), makePort("B", go.Spot.Bottom, true, true)));


	programDiagram.linkTemplate = gojs(go.Link, {
		routing : go.Link.AvoidsNodes,
		curve : go.Link.JumpOver,
		corner : 5,
		toShortLength : 4,
		relinkableFrom : true,
		relinkableTo : true,
		reshapable : true
	}, new go.Binding("points").makeTwoWay(), gojs(go.Shape, {
		isPanelMain : true,
		stroke : "gray",
		strokeWidth : 2
	}), gojs(go.Shape, {
		toArrow : "standard",
		stroke : null,
		fill : "gray"
	}), gojs(go.Panel, "Auto", {
		visible : false,
		name : "LABEL",
		segmentIndex : 2,
		segmentFraction : 0.5
	}, new go.Binding("visible", "visible").makeTwoWay(), gojs(go.Shape,
			"RoundedRectangle", {
				fill : "#F8F8F8",
				stroke : null
			}), gojs(go.TextBlock, "Delay", {
		textAlign : "center",
		font : "10pt helvetica, arial, sans-serif",
		stroke : "#333333",
		editable : true
	}, new go.Binding("text", "text").makeTwoWay())));

	// temporary links used by LinkingTool and RelinkingTool are also
	// orthogonal:
	programDiagram.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal;
	programDiagram.toolManager.relinkingTool.temporaryLink.routing = go.Link.Orthogonal;
	
	programDiagram.toolManager.linkingTool.linkValidation = linkValidator;
	programDiagram.toolManager.relinkingTool.linkValidation = linkValidator;
}

function loadExistingDiagramDetails() {

	var url = window.rootContext + 'secure/program/edit/' + $('#programId').val() + '/diagram/json';
	var token = $("meta[name='_csrf']").attr("content");
		
	$.ajax({
  	  	type: 'get',
  	  	url: url,
  	  	headers: {
	  		"X-CSRF-TOKEN":token
	  	},
		async: false,
  	  	dataType: 'json',
  		
  	  	success: function(data) {

			var existingDiagramData = [];

  	  		$.each(data, function(key, value) {
  	  			if (key == 'nodes') {
  	  				existingDiagramData = value;
  	  			}
  	  		});

			if (programDiagram == undefined) {
				initProgramDiagram();
			}
			
			updateProgramDiagram(existingDiagramData);

			var svg = programDiagram.makeSvg({
				scale: 1
			});
			$('#programDiagramImg').html('');
			$('#programDiagramImg').html(svg);
  	  	},
  	  	error: function (request, status, error) {
	  	
  	  	}
    });
}

// Make link labels visible if coming out of a "conditional" node.
// This listener is called by the "LinkDrawn" and "LinkRelinked"
// DiagramEvents.
function showLinkLabel(e) {
	var label = e.subject.findObject("LABEL");
	if (label !== null)
		label.visible = (e.subject.fromNode.data.figure === "Diamond");
}

// Make all ports on a node visible when the mouse is over the node
function showPorts(node, show) {
	var diagram = node.diagram;
	if (!diagram || diagram.isReadOnly || !diagram.allowLink)
		return;
	node.ports.each(function(port) {
		port.stroke = (show ? "white" : null);
	});
}

function geoFunc(geoname) {
	if (icons[geoname]) {
		return icons[geoname];
	} else {
		return icons["heart"]; // default icon
	}
}

function searchIndicatorInstance(form, msisdn, programId) {

	var token = $("meta[name='_csrf']").attr("content");
	var url = window.rootContext + "secure/indicatorinstance/json/" + msisdn;
	
	$('#Spinner').spin(spinnerOptions);

	$.ajax({
  	  	type: 'get',
  	  	url: url,
  	  	headers: {
	  		"X-CSRF-TOKEN":token
	  	},
  	  	dataType: 'json',
  	  	success: function(data) {
			$.each(data, function(key, value) {

				if (key == 'PROGRAMS_LifeTime-L') {
					$.each(value, function(key1, value1) {
						if (key1 == programId) {
							programLifetimeData = value1;
						}
					});
				}
			});

			if (programLifetimeData != undefined) {
				loadExistingDiagramDetails();
			}

			$("#Spinner").spin(false);

  	  	},
  	  	error: function (request, status, error) {
	  		$("#Spinner").spin(false);
  	  	}
    });
}

function updateProgramDiagram(existingDiagramData) {
	if (existingDiagramData) {
		programDiagram.model = go.Model.fromJson(existingDiagramData);
		
		if (programDiagram.model != null) {
			var nodeDataArray = programDiagram.model.nodeDataArray;
			var nodeData;
			var minNodeKeyValue = 0;
			for (var i = 0; i < nodeDataArray.length; i ++) {
				nodeData = nodeDataArray[i];
				
				if (Number(nodeData.key) < minNodeKeyValue) {
					minNodeKeyValue = Number(nodeData.key);
				}
			}

			var offerNodeCommentObjArray = getOfferCommentNodes(minNodeKeyValue);

			updateNodeDataArray(nodeDataArray, offerNodeCommentObjArray);

			for (var i = 0; i < offerNodeCommentObjArray.length; i ++) {
				programDiagram.model.addNodeData(offerNodeCommentObjArray[i]);
			}
		}
	}
}

function getOfferCommentNodes(minNodeKeyValue) {

	var offerNodeCommentObjArray = [];

	var tempNodeDataArray = programDiagram.model.nodeDataArray;

	if (programLifetimeData != undefined) {

		var offerNodeCommentObj;
		var bestPossibleLoc;

		for (var j = 0; j < programLifetimeData.length; j ++) {
			var offerObj = programLifetimeData[j];

			$.each(offerObj, function(programOfferId, offerValueObj) {

				minNodeKeyValue -= 1;

				offerNodeCommentObj = { 
					category : "StateInfo", 
					offerId : '',
					text : '', 
					key : minNodeKeyValue, 
					loc : '',
					isEndNodeExecuted : false,
					reminderIds : []
				}

				bestPossibleLoc = getBestPossibleLocForOfferNodeCommentObj(programOfferId, tempNodeDataArray);

				offerNodeCommentObj['offerId'] = programOfferId;
				offerNodeCommentObj['loc'] = bestPossibleLoc;
				var flowCount = 0;
				var text = '';
				var reminderIds = [];

				$.each(offerValueObj, function(flowId, flowObj) {
					
					flowCount ++;
					text += '-------------------------------------------------------\n';
					text += 'Flow ' + flowCount + '\n';
					text += '-------------------------------------------------------\n';

					$.each(flowObj, function(actionKey, actionValueObj) {
						
						$.each(actionValueObj, function(actionTime, actionType) {

							if (actionType  == 'Notification Action') {
								text += '\t Offer sent on : ' + actionTime + '   \n';

							} else if (actionType  == 'Monitoring Action') {
								text += '\t Offer sent on : ' + actionTime + '   \n';

							} else if (actionType  == 'Fulfillment Action') {
								text += '\t Fulfillement sent on : ' + actionTime + '   \n';
								offerNodeCommentObj['isEndNodeExecuted'] = true;

							} else {
								text += '\t Reminder sent on : ' + actionTime + '   \n';
								offerNodeCommentObj['isEndNodeExecuted'] = true;
								reminderIds.push(actionType);

							}
						});	
					});	
				});

				offerNodeCommentObj['text'] = text;
				offerNodeCommentObj['reminderIds'] = reminderIds;

				tempNodeDataArray.push(offerNodeCommentObj);

				offerNodeCommentObjArray.push(offerNodeCommentObj);
			});
		}
	}


	return offerNodeCommentObjArray;
}

function getBestPossibleLocForOfferNodeCommentObj(offerId, nodeDataArray) {

//	alert('getBestPossibleLocForOfferNodeCommentObj : Start : offerId=' + offerId);

	var bestPossibleLoc;

	var nodeData;
	var offerNodeDataLoc;

	for (var i = 0; i < nodeDataArray.length; i ++) {
		nodeData = nodeDataArray[i];

		if (nodeData.offerId == offerId && nodeData.category == 'Offer') {
			offerNodeDataLoc = nodeData.loc;
			break;
		}
	}

	var index = offerNodeDataLoc.indexOf(' ');
	var x = Number(offerNodeDataLoc.substring(0, index));
	var y = Number(offerNodeDataLoc.substring(index + 1));

	var checkForTOPPosition = checkForPosition(x, y - 80, nodeDataArray);

	if (checkForTOPPosition) {
		bestPossibleLoc = x + ' ' + (y - 80);
	
	} else {
		
		var checkForBOTTOMPosition = checkForPosition(x, y + 80, nodeDataArray);

		if (checkForBOTTOMPosition) {
			bestPossibleLoc = x + ' ' + (y + 80);

		} else {
			var checkForLEFTPosition = checkForPosition(x - 100, y, nodeDataArray);

			if (checkForLEFTPosition) {
				bestPossibleLoc = (x - 100) + ' ' + y;

			} else {
				var checkForRIGHTPosition = checkForPosition(x + 100, y, nodeDataArray);

				if (checkForRIGHTPosition) {
					bestPossibleLoc = (x + 100) + ' ' + y;
				
				} else {

					var checkForTOP_RIGHTPosition = checkForPosition(x + 150, y - 120, nodeDataArray);

					if (checkForTOP_RIGHTPosition) {
						bestPossibleLoc = (x + 150) + ' ' + y - 120;
				
					} else {

						var checkForBOTTOM_RIGHTPosition = checkForPosition(x + 150, y + 120, nodeDataArray);

						if (checkForBOTTOM_RIGHTPosition) {
							bestPossibleLoc = (x + 150) + ' ' + y + 120;
					
						} else {

							var checkForBOTTOM_LEFTPosition = checkForPosition(x - 150, y + 120, nodeDataArray);

							if (checkForBOTTOM_LEFTPosition) {
								bestPossibleLoc = (x - 150) + ' ' + y + 120;
						
							} else {

								var checkForTOP_LEFTPosition = checkForPosition(x - 150, y - 120, nodeDataArray);

								if (checkForTOP_LEFTPosition) {
									bestPossibleLoc = (x - 150) + ' ' + y - 120;
							
								} else {
									var rightmostNodeXPosition;

									for (var i = 0; i < nodeDataArray.length; i ++) {
										nodeData = nodeDataArray[i];
										offerNodeDataLoc = nodeData.loc;
										index = offerNodeDataLoc.indexOf(' ');
										x = Number(offerNodeDataLoc.substring(0, index));
										
										if (rightmostNodeXPosition == undefined) {
											rightmostNodeXPosition = x;

										} else {
											if (x > rightmostNodeXPosition ) {
												rightmostNodeXPosition = x;
											}
										}
									}

									bestPossibleLoc = (rightmostNodeXPosition + 200) + ' ' + y;

								}
							}
						}
					}
				}
			}
		}
	}

//	alert('getBestPossibleLocForOfferNodeCommentObj : End : bestPossibleLoc=' + bestPossibleLoc);

	return bestPossibleLoc;
}

function checkForPosition(x, y, nodeDataArray) {

//	alert('checkForPosition : ' + x + ' ' + y);
	var checkForPosition = true;
	var nodeData;
	var nodeDataLoc;

	var minXVal = x - 200;
	var minYVal = y - 100;
	var maxXVal = x + 200;
	var maxYVal = y + 100;

	var index;
	var minX1Val = 0;
	var minY1Val = 0;
	var maxX1Val = 0;
	var maxY1Val = 0;
	var x1 = 0;
	var y1 = 0;
	var offerNodeDataLoc;

	for (var i = 0; i < nodeDataArray.length; i ++) {
		nodeData = nodeDataArray[i];
		offerNodeDataLoc = nodeData.loc;

		index = offerNodeDataLoc.indexOf(' ');
		x1 = Number(offerNodeDataLoc.substring(0, index));
		y1 = Number(offerNodeDataLoc.substring(index + 1));

		if (nodeData.category == 'Start' || nodeData.category == 'End' || nodeData.category == 'Reminder') {
			minX1Val = x1 - 23;
			minY1Val = y1 - 23;
			maxX1Val = x1 + 23;
			maxY1Val = y1 + 23;

		} else if (nodeData.category == 'Trigger' || nodeData.category == 'Offer' || nodeData.category == 'StateInfo') {
			minX1Val = x1 - 160;
			minY1Val = y1 - 50;
			maxX1Val = x1 + 160;
			maxY1Val = y1 + 50;

		}

//		alert('minXVal : ' + minXVal + ', minYVal : ' + minYVal + ', maxXVal : ' + maxXVal + ', maxYVal : ' + maxYVal + 'minX1Val : ' + minX1Val + ', minY1Val : ' + minY1Val + ', maxX1Val : ' + maxX1Val + ', maxY1Val : ' + maxY1Val);

		if (x1 <= x) {
			if (maxX1Val >= minXVal) {
				if (y1 <= y) {
					 if (maxY1Val >= minYVal) {
						 checkForPosition = false;
						 break;
					 }
				} else {
					 if (minY1Val <= maxYVal) {
						 checkForPosition = false;
						 break;	
					 }
				}
			}
		} else {
			 if (minX1Val <= maxXVal) {
				if (y1 <= y) {
					 if (maxY1Val >= minYVal) {
						 checkForPosition = false;
						 break;
					 }
				} else {
					 if (minY1Val <= maxYVal) {
						 checkForPosition = false;
						 break;	
					 }
				}
			 }
		}
	}

//	alert('checkForPosition : ' + checkForPosition);
		
	return checkForPosition;
}

function updateNodeDataArray(nodeDataArray, offerNodeCommentObjArray) {
	var updatedNodeDataArray = [];
	var nodeData;

	var executedPathKeys = [];
	var offerKeyMappingArray = [];

	for (var i = 0; i < nodeDataArray.length; i ++) {
		nodeData = nodeDataArray[i];
		nodeData.color = colors['blueGray'];
		
		if (nodeData.category == 'Start') {

			if (programLifetimeData.length > 0){ 
				nodeData.color = colors['greenApple'];
				executedPathKeys.push(nodeData.key);
			}
			
		} else if (nodeData.category == 'Trigger') {

			if (programLifetimeData.length > 0){ 
				nodeData.color = colors['greenApple'];
				executedPathKeys.push(nodeData.key);
			}

		} else if (nodeData.category == 'Offer') {

			var offerId = nodeData.offerId;

			for (var j = 0; j < offerNodeCommentObjArray.length; j ++) {
				var offerNodeCommentObj = offerNodeCommentObjArray[j];

				if (offerId == offerNodeCommentObj.offerId) {
					nodeData.color = colors['greenApple'];
					executedPathKeys.push(nodeData.key);
					offerKeyMappingArray.push({'offerId' : offerId, 'key' : nodeData.key});
				}
			}

		} else if (nodeData.category == 'Reminder') {
			var reminderName = $('#programId').val() + '_' + nodeData.reminderName;

			for (var j = 0; j < offerNodeCommentObjArray.length; j ++) {
				var offerNodeCommentObj = offerNodeCommentObjArray[j];
				var reminderIds = offerNodeCommentObj.reminderIds;

				if (reminderIds != undefined) {
					var programReminderId;
					
					for (var k = 0; k < reminderIds.length; k ++) {
						programReminderId = reminderIds[k];
						
						if (programReminderId.indexOf(reminderName) != -1) {
							nodeData.color = colors['greenApple'];
							executedPathKeys.push(nodeData.key);
						}
					}
				}
			}
		} else if (nodeData.category == 'End') {

			for (var j = 0; j < offerNodeCommentObjArray.length; j ++) {
				var offerNodeCommentObj = offerNodeCommentObjArray[j];

				if (offerNodeCommentObj.isEndNodeExecuted) {
					nodeData.color = colors['greenApple'];
					executedPathKeys.push(nodeData.key);
				}
			}
		}

		updatedNodeDataArray.push(nodeData);
	}

	programDiagram.model.nodeDataArray = updatedNodeDataArray;
	
	var offerNodeLinkDataArray = [];

	var offerNodeLinkDataObj;
	for (var i = 0; i < offerKeyMappingArray.length; i ++) {
		for (var j = 0; j < offerNodeCommentObjArray.length; j++) {
			
			if (offerKeyMappingArray[i].offerId == offerNodeCommentObjArray[j].offerId) {
				offerNodeLinkDataObj = { 
					from : offerKeyMappingArray[i].key, 
					to : offerNodeCommentObjArray[j].key, 
					curve : go.Link.Bezier, 
					strokeWidth : 0.2,
					color : colors['red']
				};

				offerNodeLinkDataArray.push(offerNodeLinkDataObj);
			}
		}
	}
	
	updateLinkNodeArray(executedPathKeys, offerNodeLinkDataArray);
}

function updateLinkNodeArray(executedPathKeys, offerNodeLinkDataArray) {

	var linkDataArray = programDiagram.model.linkDataArray;

	if (linkDataArray != undefined) {

		var updatedLinkDataArray = [];
		var linkDataObj;
		var updatedLinkDataObj;
		var fromKey;
		var toKey;

		var executedPathLinkArray = [];

		for (var i = 0; i < linkDataArray.length; i ++) {
			linkDataObj = linkDataArray[i];
			fromKey = linkDataObj.from;
			toKey = linkDataObj.to;

			updatedLinkDataObj = linkDataArray[i];
			
			if ($.inArray(fromKey, executedPathKeys) > -1 && $.inArray(toKey, executedPathKeys) > -1) {			
				executedPathLinkArray.push(updatedLinkDataObj);
			} else {
				updatedLinkDataObj.color = colors['lavendar'];
				updatedLinkDataObj.stroke = colors['lavendar'];

				updatedLinkDataArray.push(updatedLinkDataObj);
			}
			
		}

		for (var i = 0; i < executedPathLinkArray.length; i ++) {
			updatedLinkDataObj = executedPathLinkArray[i];
			updatedLinkDataObj.color = colors['greenApple'];
			updatedLinkDataObj.stroke = colors['greenApple'];
			updatedLinkDataArray.push(updatedLinkDataObj);
		}

		for (var i = 0; i < offerNodeLinkDataArray.length; i ++) {
			updatedLinkDataArray.push(offerNodeLinkDataArray[i]);
		}

		updatedLinkDataArray.push(updatedLinkDataObj);
		programDiagram.model.linkDataArray = updatedLinkDataArray;
	}

}