/*\
title: $:/core/modules/parsers/wikiparser/wikiparserclassic.js
type: application/javascript
module-type: parser

parser for tiddlywiki classic markup

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var ParserPrimer = function(type,text,options) {
	var returns={};

	// Initialise the classes if we don't have them already
	if(!this.pragmaRuleClasses) {
		ParserPrimer.prototype.pragmaRuleClasses = $tw.modules.createClassesFromModules("wikirule","pragmaclassic",$tw.WikiRuleBase);
	}
	if(!this.blockRuleClasses) {
		ParserPrimer.prototype.blockRuleClasses = $tw.modules.createClassesFromModules("wikirule","blockclassic",$tw.WikiRuleBase);
	}
	if(!this.inlineRuleClasses) {
		ParserPrimer.prototype.inlineRuleClasses = $tw.modules.createClassesFromModules("wikirule","inlineclassic",$tw.WikiRuleBase);
	}
	// Save the parse text
	returns.type = type;
	returns.source = text || "";
	returns.options = options;
	
	returns.pragmaRuleClasses=this.pragmaRuleClasses;
	returns.blockRuleClasses=this.blockRuleClasses;
	returns.inlineRuleClasses=this.inlineRuleClasses;
	return returns;
	
};

var  WikiParserClassic= function (type,text,options) { 
	require("$:/core/modules/parsers/wikiparser/basewikiparser.js")["baseWikiParser"].
												call(this,new ParserPrimer(type,text,options));
}

WikiParserClassic.prototype =Object.create( 
	require("$:/core/modules/parsers/wikiparser/basewikiparser.js")["baseWikiParser"].prototype);

exports["text/x-tiddlywiki"]= WikiParserClassic;
})();

