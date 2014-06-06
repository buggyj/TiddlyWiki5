/*\
title: $:/macros/classic/macroadapter.js
type: application/javascript
module-type: module
\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";
/*
Information about this module:
rename macros and
re-jig macro params from tw2 to tw5 style
new macros created as a result of adapting tw2 should be 
prepended "mangled" to distinguish them from the actual used name
TODO - maybe change the prefix to __system__ 
*/
var sliceSeparator = "::";
var sectionSeparator = "##";

function getsectionname(title) {
	if(!title)
		return "";
	var pos = title.indexOf(sectionSeparator);
	if(pos != -1) {
		return title.substr(pos + sectionSeparator.length);
	}
	return "";
}
function getslicename(title) { 
	if(!title)
		return "";
	var pos = title.indexOf(sliceSeparator);
	if(pos != -1) {
		return title.substr(pos + sliceSeparator.length);
	}
	return "";
};
function gettiddlername(title) {
	if(!title)
		return "";
	var pos = title.indexOf(sectionSeparator);

	if(pos != -1) {
		return title.substr(0,pos);
	}
	pos = title.indexOf(sliceSeparator);
	if(pos != -1) {
		return title.substr(0,pos);
	}
	return title;
}

var parserparams = function(paramString) {
	var params = [],
		reParam = /\s*(?:([A-Za-z0-9\-_]+)\s*:)?(?:\s*(?:"([^"]*)"|'([^']*)'|\[\[([^\]]*)\]\]|([^"'\s]+)))/mg,
		paramMatch = reParam.exec(paramString);
	while(paramMatch) {
		// Process this parameter
		var paramInfo = {
			value: paramMatch[2] || paramMatch[3] || paramMatch[4] || paramMatch[5]
		};
		if(paramMatch[1]) {
			paramInfo.name = paramMatch[1];
		}
		params.push(paramInfo);
		// Find the next match
		paramMatch = reParam.exec(paramString);
	}
	return params;
}
var tabshandler = function(paramstring) {
	var params = parserparams(paramstring);
	var cookie = params[0].value;
	var numTabs = (params.length-1)/3;
	var t;
	var labeltid = cookie+"/label";
	var prompttid = cookie+"/prompt";
	var tabscontent = "";
	var labelarray = {};
    var promptarray = {};
	for(t=0; t<numTabs; t++) {
		var content = params[t*3+3].value;
		tabscontent = tabscontent+" " + content;
		labelarray[content] = params[t*3+1].value;
		promptarray[content] = params[t*3+2].value;
	} 
	//create a json files containing labels and prompts that will be retrieved later
	$tw.wiki.addTiddler(new $tw.Tiddler({title: labeltid, type: "application/json", text: JSON.stringify(labelarray)}));
	$tw.wiki.addTiddler(new $tw.Tiddler({title: prompttid, type: "application/json", text: JSON.stringify(promptarray)}));
	return '"'+tabscontent +'" "'+cookie+'"';
};
var namedapter = {tabs:'mangled_tabs'};
var paramadapter = {
	tabs: tabshandler
}
exports.name = 'macroadapter';
exports.namedapter = namedapter;
exports.paramadapter = paramadapter;
})();
