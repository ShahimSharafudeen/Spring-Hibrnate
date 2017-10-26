var isProgramBuilderModalOn = false;
var existingDiagramData;
var runhistory = {};

var generators;

var propertiesObj = {
	backdrop : 'static',
	show : true,
	width : '670px'
};

$(function() {

	$('#programBuilderButton').click(function(e) {
		$("#programBuilderModal").modal({
			backdrop : 'static',
			show : true,
			width : '1250px'
		});
	});

	$('#programBuilderModal').on('shown', function(e) {
		if (!isProgramBuilderModalOn) {
			init();
			isProgramBuilderModalOn = true;
		}
	});

	$('#modalResetButton').click(function(e) {
		myDiagram.clear();
	});

	$('#modalSaveButton').click(function(e) {
		save();
	});

	$('#modalRunButton').click(function(e) {
		run();
	});

	$('#modalPreviewButton').click(function(e) {
		var d = myDiagram.documentBounds;
		var svg = myDiagram.makeSvg({
			position : new go.Point(d.x, d.y),
			size : new go.Size(d.width, d.height)
		});
		$('#printableDiagram').html('');
		$('#printableDiagram').html(svg);

		$("#programDiagramPrinterModal").modal({
			backdrop : 'static',
			show : true,
			width : '1250px',
			height : '600px'
		});
	});
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
	lightBlue : '#00A9C9'

}

function init() {
	var gojs = go.GraphObject.make;

	for ( var k in icons) {
		icons[k] = go.Geometry.fillPath(icons[k]);
	}

	function geoFunc(geoname) {
		if (icons[geoname])
			return icons[geoname];
		else
			return icons["heart"]; // default icon
	}

	myDiagram = gojs(go.Diagram, "myDiagram", {
		initialContentAlignment : go.Spot.Center,
		allowDrop : true, // must be true to accept drops from the Palette
		/* "LinkDrawn" : showLinkLabel, */// this DiagramEvent listener is
		// defined
		// below
		/* "LinkRelinked" : showLinkLabel, */
		"animationManager.duration" : 800, // slightly longer than default
		// (600ms) animation
		"undoManager.isEnabled" : true
	// enable undo & redo
	});

	// when the document is modified, add a "*" to the title and enable the
	// "Save" button
	myDiagram.addDiagramListener("Modified", function(e) {
		var button = document.getElementById("SaveButton");
		if (button)
			button.disabled = !myDiagram.isModified;
		var idx = document.title.indexOf("*");
		if (myDiagram.isModified) {
			if (idx < 0)
				document.title += "*";
		} else {
			if (idx >= 0)
				document.title = document.title.substr(0, idx);
		}
	});

	myDiagram.addDiagramListener("ObjectDoubleClicked", onNodeSelected);

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
				} ];
	}

	function makePort(name, spot, output, input) {
		return gojs(go.Shape, "Circle", {
			fill : "transparent",
			strokeWidth : 2,
			stroke : null, // this is changed to "white" in the showPorts
			// function
			desiredSize : new go.Size(8, 8),
			alignment : spot,
			alignmentFocus : spot, // align the port on the main Shape
			portId : name, // declare this object to be a "port"
			fromSpot : spot,
			toSpot : spot, // declare where links may connect at this port
			fromLinkable : output,
			toLinkable : input, // declare whether the user may draw links
			// to/from here
			cursor : "pointer" // show a different cursor to indicate potential
		// link point
		});
	}

	var lightText = '#FFFFFF';

	myDiagram.nodeTemplateMap.add("generator", gojs(go.Node, "Spot",
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
			// makePort("L", go.Spot.Left, true, true),
			// makePort("R", go.Spot.Right, true, true),
			makePort("T", go.Spot.Top, true, true), makePort("B",
					go.Spot.Bottom, true, true)

	));

	myDiagram.nodeTemplateMap.add("Start", gojs(go.Node, "Spot", nodeStyle(),
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

	myDiagram.nodeTemplateMap.add("End", gojs(go.Node, "Spot", nodeStyle(),
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

	myDiagram.nodeTemplateMap.add("SegmentCriteria", gojs(go.Node, "Spot",
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

	myDiagram.nodeTemplateMap.add("FilterCriteria", gojs(go.Node, "Spot",
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

	myDiagram.nodeTemplateMap.add("ControlGroup", gojs(go.Node, "Spot",
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

	myDiagram.nodeTemplateMap.add("OutputController", gojs(go.Node, "Spot",
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
	myDiagram.nodeTemplateMap.add("JoinData", gojs(go.Node, "Spot",
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

	myDiagram.linkTemplate = gojs(go.Link, {
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
	myDiagram.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal;
	myDiagram.toolManager.relinkingTool.temporaryLink.routing = go.Link.Orthogonal;

	myDiagram.toolManager.linkingTool.linkValidation = linkValidator;
	myDiagram.toolManager.relinkingTool.linkValidation = linkValidator;

	if (existingDiagramData) {
		myDiagram.model = go.Model.fromJson(existingDiagramData);
	}

	var paletteArray = [];

	myPalette = gojs(go.Palette, "myPalette", {
		"animationManager.duration" : 800,
		nodeTemplateMap : myDiagram.nodeTemplateMap,
		model : new go.GraphLinksModel([ /*
											 * { category : "generator", text :
											 * "Define Step", color :
											 * colors['lightBlue'] },
											 */{
			category : "Start",
			text : "Start"
		}, {
			category : "SegmentCriteria",
			text : "Segment Criteria",
			color : colors['lightBlue']
		}, {
			category : "FilterCriteria",
			text : "Filter Criteria",
			color : colors['black']
		}, /*
			 * { category : "ControlGroup", text : "Control Group", color :
			 * colors['purple'] },
			 */{
			category : "OutputController",
			text : "Output Controller",
			color : colors['orange']
		}, {
			category : "JoinData",
			text : "Join Data",
			color : colors['darkBlue']
		}, {
			category : "End",
			text : 'End'
		},
		// { category : "Comment", text : 'Comment' }
		])
	});

	// initialize the Palette that is on the left side of the page
	/*
	 * myPalette = gojs(go.Palette, "myPalette", { "animationManager.duration" :
	 * 800, nodeTemplateMap : myDiagram.nodeTemplateMap, model : new
	 * go.GraphLinksModel(paletteArray) });
	 */
}

function geoFunc(geoname) {
	if (icons[geoname]) {
		return icons[geoname];
	} else {
		return icons["heart"]; // default icon
	}
}

function onNodeSelected(e) {
	var node = e.diagram.selection.first();

	if (node instanceof go.Node) {
		if (node.category == "Start") {

		} else if (node.category == "SegmentCriteria") {
			console.log("Selected configuration: "
					+ node.data.configurationName);
			populateSegmentCriteriaPropertiesModal(node);

		} else if (node.category == "FilterCriteria") {
			console.log("Selected configuration: "
					+ node.data.configurationName);
			populateFilterCriteriaPropertiesModal(node);

		} else if (node.category == "ControlGroup") {
			console.log("Selected configuration: "
					+ node.data.configurationName);
			populateControlGroupPropertiesModal(node);

		} else if (node.category == "OutputController") {
			console.log("Selected configuration: "
					+ node.data.configurationName);
			populateOutputControllerPropertiesModal(node);

		} else if (node.category == "JoinData") {
			console.log("Selected configuration: "
					+ node.data.configurationName);
			populateJoinDataPropertiesModal(node);

		} else if (node.category == "End") {

		} else if (node.category == "generator") {
			console.log("Selected configuration: "
					+ node.data.configurationName);
			populateQueryPropertiesModal(node);
		}
	}
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

function updateModelFromUI(field, text) {
	var node = myDiagram.selection.first();
	var data = node.data;

	if ((node instanceof go.Node) && data !== null) {
		var model = myDiagram.model;
		model.startTransaction("modified " + field);
		model.setDataProperty(data, field, text);
		model.commitTransaction("modified " + field);
	}
}

//Save the segment flow diagram
function save() {
	// if(ProgramValidation()){
	existingDiagramData = myDiagram.model.toJson();
	console.log(existingDiagramData);
	var svg = myDiagram.makeSvg({
		scale : 1
	});
	$('#programDiagramImg').html('');
	$('#programDiagramImg').html(svg);
	$('#programDIagramDiv').show();

	$('#programBuilderModal').modal('toggle');
	$('#successMsg').html('Segment Flow Successfully saved');
	$('#successMsg').show();
	// }
}

var nodeDataObjectMap = {};
var linkFromDataObjectMap = {};
var linkToDataObjectMap = {};
var existingDiagramDataJson;
var startNode = {};

function getNodeDataObjectMap(m) {
	return nodeDataObjectMap[m];
}

function getLinkFromDataObjectMap(n) {
	return linkFromDataObjectMap[n];
}

function getLinkToDataObjectMap(o) {
	return linkToDataObjectMap[o];
}

// Run the segment flow diagram 
function run() {

	var token = $("meta[name='_csrf']").attr("content");
	existingDiagramData = myDiagram.model.toJson();
	existingDiagramDataJson = JSON.parse(existingDiagramData);
	if (existingDiagramDataJson.nodeDataArray == undefined
			|| existingDiagramDataJson.linkDataArray == undefined
			|| existingDiagramDataJson.nodeDataArray == ""
			|| existingDiagramDataJson.linkDataArray == "") {
		alert("Please create aleast one flow")
	} else {
		$('#Spinner').spin(spinnerOptions);
		var startTime;
		var endTime;
		var outputFileName;
		var outputFileSize;
		$.ajax({
			url : window.rootContext + "secure/getCurrentTimeStamp.do",
			headers : {
				"X-CSRF-TOKEN" : token
			},
			type : "post",
			async : false,
			success : function(data, textStatus, jqXHR) {
				runhistory.startTime = data;
				console.log("startTime");
				console.log(runhistory.startTime);
			},
			error : function(jqXHR, textStatus, errorThrown) {
			}
		});

		nodeDataObjectMap = {};
		linkFromDataObjectMap = {};
		linkToDataObjectMap = {};
		var startNode;
		var startNodeArray;

		var nodeDataArray = existingDiagramDataJson.nodeDataArray;

		for (var i = 0; i < nodeDataArray.length; i++) {
			nodeDataObjectMap[nodeDataArray[i].key] = nodeDataArray[i];
		}

		var linkDataArray = existingDiagramDataJson.linkDataArray;

		var currentFrom;
		var currentTo;
		for (var j = 0; j < linkDataArray.length; j++) {
			currentFrom = getLinkFromDataObjectMap(linkDataArray[j].from);
			currentTo = getLinkToDataObjectMap(linkDataArray[j].to);
			if (currentFrom == undefined) {
				currentFrom = [];
			}

			if (currentTo == undefined) {
				currentTo = [];
			}

			currentFrom.push(linkDataArray[j]);
			currentTo.push(linkDataArray[j])
			linkFromDataObjectMap[linkDataArray[j].from] = currentFrom;
			linkToDataObjectMap[linkDataArray[j].to] = currentTo;

		}
		console.log(nodeDataArray);
		console.log(nodeDataObjectMap);
		console.log(linkFromDataObjectMap);
		console.log(linkToDataObjectMap);

		$.each(nodeDataObjectMap, function(key, value) {
			// console.log(key, value);
			var linkToCurrentNode = getLinkToDataObjectMap(key);
			if (linkToCurrentNode == undefined) {
				startNode = value;
				return false; // To break the loop
			}
		});

		console.log(startNode);
		var SplitAcrossDays = false;
		var TotalSegmentCountPerRun = null;
		var OutputContollorDatabase = null;
		var OutputContollorNoOfEntry = null;
		var OutputContollorSiftFilePath = null;
		var campaignId = null;
		var filterStartDate = null;
		var filterEndDate = null;
		var contactStatus = null;
		var NodeQuery = null;
		var NodeDatabase = null;
		var NodeTempTable = null;
		var NodeQueue = null;

		var nextLink;
		var isCurrentFlowSuccess = false;
		var check = false;
		var flowname = $('#segmentName').val();
		var processTime = $('#segmentProcessTime').val();
		while (true) {
			if (check) {
				break;
			}

			if (startNode.category == 'Start') {
				isCurrentFlowSuccess = true;
				startNodeArray = getLinkFromDataObjectMap(startNode.key);
				for (var i = 0; i < startNodeArray.length; i++) {
					nextLink = startNodeArray[i];
					if (nextLink != undefined && isCurrentFlowSuccess) {
						startNode = getNodeDataObjectMap(nextLink.to);

						console.log(startNode);
						console.log(startNode.text);
						if (startNode.category == 'SegmentCriteria') {
							NodeQuery = startNode.segmentCriteriaQuery;
							NodeDatabase = startNode.segmentCriteriaDatabaseName;
							NodeTempTable = startNode.segmentCriteriaTemporaryTableName;
							OutputContollorDatabase = startNode.segmentCriteriaDatabaseName;
							NodeQueue = null;
						} else if (startNode.category == 'FilterCriteria') {
							campaignId = startNode.campaignId;
							filterStartDate = startNode.filterStartDate;
							filterEndDate = startNode.filterEndDate;
							contactStatus = startNode.contactStatus;
							NodeQuery = null;
							NodeDatabase = null;
							NodeTempTable = null;
							NodeQueue = null;
						} else if (startNode.category == 'ControlGroup') {
							NodeQuery = startNode.controlGroupQuery;
							NodeDatabase = null;
							NodeTempTable = null;
							NodeQueue = null;
						} else if (startNode.category == 'OutputController') {
							NodeQuery = flowname;
							NodeDatabase = null;
							NodeTempTable = null;
							NodeQueue = startNode.outputControllerQueue;
							SplitAcrossDays = startNode.splitAcrossDays;
							TotalSegmentCountPerRun = startNode.totalSegmentCountPerRun;
							OutputContollorNoOfEntry = startNode.outputControllerNoOfEntry;
							OutputContollorSiftFilePath = startNode.outputControllerSiftFilePath;
						} else if (startNode.category == 'JoinData') {
							NodeQuery = startNode.joinDataQuery;
							NodeDatabase = startNode.joinDataDatabaseName;
							NodeTempTable = startNode.joinDataTemporaryTableName;
							NodeQueue = null;
							OutputContollorDatabase = NodeDatabase;

						} else {
							break;
						}
						console.log(startNode.category);
						console.log(NodeQuery);
						$
								.ajax({
									url : window.rootContext
											+ "secure/segmentFlowRun.do",
									headers : {
										"X-CSRF-TOKEN" : token
									},
									type : "post",
									data : {
										query : NodeQuery,
										stepCategory : startNode.category,
										stepName : startNode.text,
										flowName : flowname,
										database : NodeDatabase,
										tempTable : NodeTempTable,
										queueName : NodeQueue,
										CampaignId : campaignId,
										FilterStartDate : filterStartDate,
										FilterEndDate : filterEndDate,
										ContactStatus : contactStatus,
										splitAcrossDays : SplitAcrossDays,
										totalSegmentCountPerRun : TotalSegmentCountPerRun,
										outputContollorDatabase : OutputContollorDatabase,
										outputContollorNoOfEntry : OutputContollorNoOfEntry,
										outputContollorSiftFilePath : OutputContollorSiftFilePath,
										ProcessTime : processTime

									},
									async : false,
									success : function(data, textStatus, jqXHR) {
										console.log(data);
										if (data.status == 'success') {
											isCurrentFlowSuccess = true;
											delete startNode.error;
											delete startNode.description;
											startNode.success = "true";
											startNode.list = true;
											startNode.number = data.resultCount;
											startNode.outputFile = data.outputFilePath;

											if (data.outputFileSize != undefined
													&& data.outputFileSize != null
													&& data.outputFileSize != '') {
												runhistory.outputFileSize = data.outputFileSize;
											}
											if (data.outputFileName != undefined
													&& data.outputFileName != null
													&& data.outputFileName != '') {
												runhistory.outputFileName = data.outputFileName;
											}
											if (data.outputSiftFilePath != undefined
													&& data.outputSiftFilePath != null
													&& data.outputSiftFilePath != '') {
												runhistory.outputSiftFilePath = data.outputSiftFilePath;
											}
											for (var i = 0; i < nodeDataArray.length; i++) {
												if (nodeDataArray[i].key == startNode.key) {
													nodeDataArray[i] = startNode;
													break;
												}
											}
											existingDiagramDataJson.nodeDataArray = nodeDataArray;
										} else {
											isCurrentFlowSuccess = false;
											delete startNode.success;
											delete startNode.list;
											delete startNode.number;
											startNode.error = "true";
											startNode.description = data.description;
											for (var i = 0; i < nodeDataArray.length; i++) {
												if (nodeDataArray[i].key == startNode.key) {
													nodeDataArray[i] = startNode;
													break;
												}
											}

											existingDiagramDataJson.nodeDataArray = nodeDataArray;
										}
									},
									error : function(jqXHR, textStatus,
											errorThrown) {
										alert("Error");
									}
								});

					} else {
						console.log(nextLink);
						startNode = getNodeDataObjectMap(nextLink.to);
						console.log(startNode);
						delete startNode.success;
						delete startNode.error;
						delete startNode.list;
						delete startNode.number;
						delete startNode.description;
						
					}

				}

			} else if (startNode.category == 'End') {
				break;
			} else {
				startNodeArray = getLinkFromDataObjectMap(startNode.key);
				for (var i = 0; i < startNodeArray.length; i++) {
					nextLink = startNodeArray[i];
					if (nextLink != undefined && isCurrentFlowSuccess) {
						startNode = getNodeDataObjectMap(nextLink.to);

						console.log(startNode);
						console.log(startNode.text);
						if (startNode.category == 'SegmentCriteria') {
							NodeQuery = startNode.segmentCriteriaQuery;
							NodeDatabase = startNode.segmentCriteriaDatabaseName;
							NodeTempTable = startNode.segmentCriteriaTemporaryTableName;
							OutputContollorDatabase = startNode.segmentCriteriaDatabaseName;
							NodeQueue = null;
						} else if (startNode.category == 'FilterCriteria') {
							campaignId = startNode.campaignId;
							filterStartDate = startNode.filterStartDate;
							filterEndDate = startNode.filterEndDate;
							contactStatus = startNode.contactStatus;
							NodeQuery = null;
							NodeDatabase = null;
							NodeTempTable = null;
							NodeQueue = null;
						} else if (startNode.category == 'ControlGroup') {
							NodeQuery = startNode.controlGroupQuery;
							NodeDatabase = null;
							NodeTempTable = null;
							NodeQueue = null;
						} else if (startNode.category == 'OutputController') {
							NodeQuery = flowname;
							NodeDatabase = null;
							NodeTempTable = null;
							NodeQueue = startNode.outputControllerQueue;
							SplitAcrossDays = startNode.splitAcrossDays;
							TotalSegmentCountPerRun = startNode.totalSegmentCountPerRun;
							OutputContollorNoOfEntry = startNode.outputControllerNoOfEntry;
							OutputContollorSiftFilePath = startNode.outputControllerSiftFilePath;
						} else if (startNode.category == 'JoinData') {
							NodeQuery = startNode.joinDataQuery;
							NodeDatabase = startNode.joinDataDatabaseName;
							NodeTempTable = startNode.joinDataTemporaryTableName;
							NodeQueue = null;
							OutputContollorDatabase = NodeDatabase;
						} else {
							break;
						}
						console.log(startNode.category);
						console.log(NodeQuery);
						$
								.ajax({
									url : window.rootContext
											+ "secure/segmentFlowRun.do",
									headers : {
										"X-CSRF-TOKEN" : token
									},
									type : "post",
									data : {
										query : NodeQuery,
										stepCategory : startNode.category,
										stepName : startNode.text,
										flowName : flowname,
										database : NodeDatabase,
										tempTable : NodeTempTable,
										queueName : NodeQueue,
										CampaignId : campaignId,
										FilterStartDate : filterStartDate,
										FilterEndDate : filterEndDate,
										ContactStatus : contactStatus,
										splitAcrossDays : SplitAcrossDays,
										totalSegmentCountPerRun : TotalSegmentCountPerRun,
										outputContollorDatabase : OutputContollorDatabase,
										outputContollorNoOfEntry : OutputContollorNoOfEntry,
										outputContollorSiftFilePath : OutputContollorSiftFilePath,
										ProcessTime : processTime

									},
									async : false,
									success : function(data, textStatus, jqXHR) {
										console.log(data);
										if (data.status == 'success') {
											isCurrentFlowSuccess = true;
											delete startNode.error;
											delete startNode.description;
											startNode.success = "true";
											startNode.list = true;
											startNode.number = data.resultCount;
											startNode.outputFile = data.outputFilePath;
											if (data.outputFileSize != undefined
													&& data.outputFileSize != null
													&& data.outputFileSize != '') {
												runhistory.outputFileSize = data.outputFileSize;
											}
											if (data.outputFileName != undefined
													&& data.outputFileName != null
													&& data.outputFileName != '') {
												runhistory.outputFileName = data.outputFileName;
											}
											if (data.outputSiftFilePath != undefined
													&& data.outputSiftFilePath != null
													&& data.outputSiftFilePath != '') {
												runhistory.outputSiftFilePath = data.outputSiftFilePath;
											}
											for (var i = 0; i < nodeDataArray.length; i++) {
												if (nodeDataArray[i].key == startNode.key) {
													nodeDataArray[i] = startNode;
													break;
												}
											}
											existingDiagramDataJson.nodeDataArray = nodeDataArray;
										} else {
											isCurrentFlowSuccess = false;
											delete startNode.success;
											delete startNode.list;
											delete startNode.number;
											startNode.error = "true";
											startNode.description = data.description;
											for (var i = 0; i < nodeDataArray.length; i++) {
												if (nodeDataArray[i].key == startNode.key) {
													nodeDataArray[i] = startNode;
													break;
												}
											}

											existingDiagramDataJson.nodeDataArray = nodeDataArray;
										}
									},
									error : function(jqXHR, textStatus,
											errorThrown) {
										alert("Error");
									}
								});
					} else {
						console.log(nextLink);
						startNode = getNodeDataObjectMap(nextLink.to);
						console.log(startNode);
						delete startNode.success;
						delete startNode.error;
						delete startNode.list;
						delete startNode.number;
						delete startNode.description;
					}

				}

			}
		}

		existingDiagramData = JSON.stringify(existingDiagramDataJson);
		console.log(existingDiagramData);
		myDiagram.model = go.Model.fromJson(existingDiagramData);
		$.ajax({
			url : window.rootContext + "secure/deleteTemptable.do",
			headers : {
				"X-CSRF-TOKEN" : token
			},
			type : "post",
			data : {
				flowName : flowname,
				Database : OutputContollorDatabase
			},
			async : false,
			success : function(data, textStatus, jqXHR) {
			},
			error : function(jqXHR, textStatus, errorThrown) {
			}
		});
		$.ajax({
			url : window.rootContext + "secure/getCurrentTimeStamp.do",
			headers : {
				"X-CSRF-TOKEN" : token
			},
			type : "post",
			async : false,
			success : function(data, textStatus, jqXHR) {
				runhistory.endTime = data;
				console.log("end Date");
				console.log(runhistory.endTime);
			},
			error : function(jqXHR, textStatus, errorThrown) {
			}
		});
		$("#Spinner").spin(false);

	}

}

var hi = {
	"class" : "go.GraphLinksModel",
	"nodeDataArray" : [ {
		"category" : "generator",
		"text" : "Define Step",
		"color" : "#00A9C9",
		"key" : -1,
		"loc" : "-174.5 -183.765625"
	}, {
		"category" : "generator",
		"text" : "Define Step",
		"color" : "#00A9C9",
		"key" : -2,
		"loc" : "0.5 -181.765625"
	} ],
	"linkDataArray" : [ {
		"from" : -1,
		"to" : -2,
		"points" : [ -133, -183.765625, -123, -183.765625, -87, -183.765625,
				-87, -181.765625, -51, -181.765625, -41, -181.765625 ]
	} ]
};

function updateProgramDiagram(existingDiagramData) {
	if (existingDiagramData) {
		programDiagram.model = go.Model.fromJson(existingDiagramData);

		if (programDiagram.model != null) {
			var nodeDataArray = programDiagram.model.nodeDataArray;
			var nodeData;
			var minNodeKeyValue = 0;
			for (var i = 0; i < nodeDataArray.length; i++) {
				nodeData = nodeDataArray[i];

				if (Number(nodeData.key) < minNodeKeyValue) {
					minNodeKeyValue = Number(nodeData.key);
				}
			}

			var offerNodeCommentObjArray = getOfferCommentNodes(minNodeKeyValue);

			updateNodeDataArray(nodeDataArray, offerNodeCommentObjArray);

			for (var i = 0; i < offerNodeCommentObjArray.length; i++) {
				programDiagram.model.addNodeData(offerNodeCommentObjArray[i]);
			}
		}
	}
}