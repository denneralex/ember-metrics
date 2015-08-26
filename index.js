/* jshint node: true */
'use strict';

var Funnel = require('broccoli-funnel');


function dasherize(key){
	var STRING_DASHERIZE_REGEXP = (/[ _]/g);

	return decamelize(key).replace(STRING_DASHERIZE_REGEXP, '-');
}

function decamelize(str){
	var STRING_DECAMELIZE_REGEXP = (/([a-z\d])([A-Z])/g);

	return str.replace(STRING_DECAMELIZE_REGEXP, '$1_$2').toLowerCase();
}

module.exports = {
  name: 'ember-metrics',

  treeForAddon: function(tree) {
  	var configAdapters = this.project.config(process.env.EMBER_ENV || 'development').metricsAdapters;
	
	var names = configAdapters.map(function (value){
  		return dasherize(value.name);
  	});

  	//Keep base class on the folder
  	names.push('base');

  	console.log(names);

  	var newTree = new Funnel(tree, {
  		exclude: [function (relativePath){
  			//Ignore if not metrics-adapters folder
  			if (relativePath.indexOf('metrics-adapters') < 0){
  				return false;
  			}

  			//Filename without extension from path
  			var onlyFileName = relativePath.split('\/').pop().replace(/\..+$/, '');

  			console.log(onlyFileName);

  			//Exclude if file is not in config names
  			return names.indexOf(onlyFileName) < 0;
  		}]
  	});

	return this._super.treeForAddon.call(this, newTree);
  }
};
