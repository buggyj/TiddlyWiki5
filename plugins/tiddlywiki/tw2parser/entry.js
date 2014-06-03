/*\
title: $:/macros/buggyj/entry.js
type: application/javascript
module-type: macro

<<diary year month>>
<<diary year>> - year calendar
<<diary>> - this month

Options:$:/macros/diary/options.json
\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
Information about this macro
returns value of key in a data json tiddler
note that macros are not connected with the refresh mechanism -use with caution.
*/


exports.name = "entryof";

exports.params = [
	{ name: "key" }, { name: "tiddler" }
];
/*
Run the macro
*/

exports.run = function(key,tiddler) {
	try{
		return  $tw.wiki.getTiddlerData(tiddler)[key];
	} catch(e) {
		return "";
	}
}

})();
