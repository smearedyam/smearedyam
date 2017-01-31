"use strict";angular.module("mpqPartyPlannerApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ngMaterial"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main",reloadOnSearch:!1}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).otherwise({redirectTo:"/"})}]),angular.module("mpqPartyPlannerApp").controller("MainCtrl",["$scope","$http","$location",function(a,b,c){a.mpqModel={characters:[],selectedCharacters:[],teamActiveAbilities:{},teamActiveColors:[],sortPredicate:"rank"},a.colors=["yellow","red","blue","purple","green","black"];var d=function(a){return angular.isDefined(a.name)?a.name.concat(",",a.stars):""},e=function(){var b=_.flatten(_.map(a.mpqModel.selectedCharacters,function(a){return a.abilities}));return _.groupBy(_.filter(b,function(a){return 0!==a.cost}),function(a){return a.color.toLowerCase()})},f=function(){a.mpqModel.teamActiveAbilities=e(),a.mpqModel.teamActiveColors=_.keys(a.mpqModel.teamActiveAbilities)};a.isActive=function(b){var c=-1!==a.mpqModel.teamActiveColors.indexOf(b.toLowerCase());return c},a.isIneligible=function(b){if(-1!==a.mpqModel.selectedCharacters.indexOf(b))return!1;var c=_.every(b.abilities,function(b){var c=0===b.cost||-1!==a.mpqModel.teamActiveColors.indexOf(b.color.toLowerCase());return c});return c},a.isCandidate=function(b){if(-1!==a.mpqModel.selectedCharacters.indexOf(b)||a.mpqModel.selectedCharacters.length>2)return!1;var c=_.map(_.filter(b.abilities,function(a){return 0!==a.cost}),function(a){return a.color.toLowerCase()}),d=_.union(c,a.mpqModel.teamActiveColors);if(d.length>=6)return!0;if(a.mpqModel.selectedCharacters.length<2){var e=_.every(b.abilities,function(b){var c=0===b.cost||-1===a.mpqModel.teamActiveColors.indexOf(b.color.toLowerCase());return c});return e}return!1},b.get("data/characters.json").success(function(b){a.mpqModel.characters=b;var e=c.search().selection||[];a.mpqModel.selectedCharacters=_.filter(a.mpqModel.characters,function(a){var b=d(a);return""!==a.name&&-1!==e.indexOf(b)?!0:!1}),f()}),a.select=function(b){var e=a.mpqModel.selectedCharacters.indexOf(b);e>-1?a.mpqModel.selectedCharacters.splice(e,1):a.mpqModel.selectedCharacters.length<3&&a.mpqModel.selectedCharacters.push(b);var g=_.map(a.mpqModel.selectedCharacters,function(a){return d(a)});c.search({selection:g}),f()},a.clearSelection=function(){a.mpqModel.selectedCharacters=[],c.search("selection",null),f()},a.isSelectedCharacter=function(b){return a.mpqModel.selectedCharacters.indexOf(b)>-1},a.isSelectedCharacterName=function(b){return-1!==a.mpqModel.selectedCharacters.indexOf(b)?!1:!_.every(a.mpqModel.selectedCharacters,function(a){var c=a.name!==b.name;return c})};var g={yellow:"images/YellowTile.82c1b383.png",red:"images/RedTile.1bbd4cea.png",blue:"images/BlueTile.1776553c.png",purple:"images/PurpleTile.cb847cf6.png",green:"images/GreenTile.334c6a53.png",black:"images/BlackTile.cf6fa774.png"};a.getTileImage=function(a){return g[a]};var h={yellow:"images/YellowFlag.c61f7280.png",red:"images/RedFlag.cf95e17c.png",blue:"images/BlueFlag.0fdc5c37.png",purple:"images/PurpleFlag.58acc4cb.png",green:"images/GreenFlag.d98a5fa0.png",black:"images/BlackFlag.ec7dd1b4.png"};a.getFlagImage=function(a){return h[a]}}]),angular.module("mpqPartyPlannerApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("mpqPartyPlannerApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/main.html",'<md-toolbar layout="row" layout-fill layout-align="center center"> <div class="md-toolbar-tools container" layout="row" layout-align="space-between center"> <h1 flex>MPQ Planner</h1> <div layout="row" layout-align="space-around center"> <div layout="column"> </div> <md-button class="md-icon-button" href="//github.com/infomofo/mpq-party-planner" target="_blank"> <md-tooltip>Contribute on Github</md-tooltip> <i class="fa fa-github fa-2x"></i> </md-button> </div> </div> </md-toolbar> <md-content layout="column" flex class="md-padding" layout-fill layout-align="start center"> <div class="raison container"> <p> This is a tool to help you plan your <a href="http://d3go.com/games/marvelpuzzlequest/">Marvel Puzzle Quest</a> Party. </p> <p> Start by selecting a character that you want to build a team around using the checkboxes on the left side of the table. When you select that character, other characters that would become available (i.e. different versions of the same character) will become unselectable. Also, characters whose active ability colors are already present in your team will be greyed out. Characters highlighted in blue are good candidates towards selecting a team with a full "Rainbow" of active ability colors. The characters are sorted by the most recent <a href="http://d3go.com/forums/viewtopic.php?f=14&t=29852" target="_blank">community sourced character rankings</a>. As you select characters, the in your browser will update so you can paste this link and share it with your friends or on a forum. <!--For example- <a--> <!--href="/#/?selection=Thor,3&selection=Iron%20Fist,3&selection=Luke%20Cage,3">here</a>\'s a team I plan on using--> <!--soon.--> </p> <p> If you find any issues or have any suggestions, please let me know on <a href="http://github.com/infomofo/mpq-party-planner/issues">this project\'s github issues page</a>. Thanks! </p> </div> <div class="chart" layout-fill layout="column" layout-align="start center"> <table class="character_table"> <tr> <td class="zero"> <md-button class="md-icon-button md-warn" aria-label="unselect all" ng-click="clearSelection()"> <md-tooltip> Clear all selected characters </md-tooltip> <i class="fa fa-undo"></i> </md-button> </td> <th hide-sm class="rank"> <a href="https://d3go.com/forums/viewtopic.php?f=14&t=29852" target="_blank"> <md-tooltip>This character\'s standing in the most recent rankings</md-tooltip> #</a> <md-button class="md-icon-button md-accent" ng-click="mpqModel.sortPredicate = \'rank\'"> <i class="fa fa-sort-numeric-asc"></i> </md-button> </th> <th> Character <md-button class="md-icon-button md-accent" ng-click="mpqModel.sortPredicate = \'name\'" hide-sm> <i class="fa fa-sort-alpha-asc"></i> </md-button> </th> <th> <img src="images/YellowFlag.c61f7280.png" aria-label="yellow"> <md-tooltip> Filled = Active; Shaded = Passive </md-tooltip> </th> <th> <md-tooltip> Filled = Active; Shaded = Passive </md-tooltip> <img src="images/RedFlag.cf95e17c.png" aria-label="red"> </th> <th> <md-tooltip> Filled = Active; Shaded = Passive </md-tooltip> <img src="images/BlueFlag.0fdc5c37.png" aria-label="red"> </th> <th> <md-tooltip> Filled = Active; Shaded = Passive </md-tooltip> <img src="images/PurpleFlag.58acc4cb.png" aria-label="red"> </th> <th> <md-tooltip> Filled = Active; Shaded = Passive </md-tooltip> <img src="images/GreenFlag.d98a5fa0.png" aria-label="red"> </th> <th> <md-tooltip> Filled = Active; Shaded = Passive </md-tooltip> <img src="images/BlackFlag.ec7dd1b4.png" aria-label="red"> </th> </tr> <tr ng-repeat="character in mpqModel.characters track by $index | orderBy: mpqModel.sortPredicate" ng-class="{\'ineligible\': isIneligible(character), \'candidate\': isCandidate(character), \'selected\': isSelectedCharacter(character), \'unique\': isSelectedCharacterName(character)}"> <td> <md-checkbox ng-checked="isSelectedCharacter(character)" aria-label="{{character.name}}" ng-click="select(character);" ng-disabled="!isSelectedCharacter(character) && (mpqModel.selectedCharacters.length >= 3 || isSelectedCharacterName(character))"> </md-checkbox> <md-tooltip ng-if="isSelectedCharacterName(character)"> You already have a different cover of the same character in your party. </md-tooltip> <md-tooltip ng-if="!isSelectedCharacterName(character) && mpqModel.selectedCharacters.length >= 3 && !isSelectedCharacter(character)"> You can only have 3 characters in your party. </md-tooltip> </td> <td hide-sm class="rank"> <span ng-switch="character.rank" layout-fill> <span ng-switch-when="0"> <md-tooltip> This character is new and not yet ranked </md-tooltip> NEW </span> <span ng-switch-default ng-bind="character.rank"></span> </span> </td> <td class="character"> <div layout="row" layout-align="space-between center"> <p> <strong class="name" ng-bind="character.name"></strong> <span class="title" hide-sm>({{character.cover}})</span> <span class="stars" ng-switch="character.stars"> <span ng-switch-when="1"> <i class="fa-star fa"></i> </span> <span ng-switch-when="2"> <i class="fa-star fa"></i><i class="fa-star fa"></i> <i hide-sm>(Uncommon)</i> </span> <span ng-switch-when="3"> <i class="fa-star fa"></i><i class="fa-star fa"></i><i class="fa-star fa"></i> <i hide-sm>(Rare)</i> </span> <span ng-switch-when="4"> <i class="fa-star fa"></i><i class="fa-star fa"></i><i class="fa-star fa"></i><i class="fa-star fa"></i> <i hide-sm>(Legendary)</i> </span> <span ng-switch-when="5"> <i class="fa-star fa"></i><i class="fa-star fa"></i><i class="fa-star fa"></i><i class="fa-star fa"></i><i class="fa-star fa"></i> <i hide-sm>(Epic)</i> </span> </span> </p> <div layout="row" layout-align="space-around center" hide-sm> <small> <md-button ng-href="{{character.forum}}" target="_blank">forum</md-button> </small> <small> <md-button ng-href="http://marvelpuzzlequest.wikia.com/wiki/{{character.name}}_({{character.cover}})" target="_blank">wiki</md-button> </small> </div> </div> </td> <td class="{{color}} ability" ng-repeat="color in colors"> <div layout-fill layout-fill ng-repeat="ability in character.abilities | filter:{color:color}" ng-class="{\'active\': ability.cost !== 0, \'passive\': ability.cost === 0, \'taken\': isActive(color)}"> <span ng-if="ability.cost === 0">P</span> <md-tooltip> {{ability.name}} <span ng-if="ability.cost === 0"> &nbsp;(Passive) </span> </md-tooltip> </div> </td> </tr> </table> </div> <div class="container selection" layout-gt-sm="column" layout-align="space-between center" layout-sm="column" ng-if="mpqModel.selectedCharacters.length > 0"> <h2> Your Team</h2> <div layout="row" layout-align="space-between center"> <div ng-repeat="character in mpqModel.selectedCharacters" class="character" layout="column" layout-align="start center"> <div ng-bind="character.name"> </div> <img ng-src="{{character.image}}"> <div layout="row" layout-align="space-around center" layout-fill class="abilities"> <div ng-repeat="ability in character.abilities" ng-class="{\'active\': ability.cost !== 0, \'passive\': ability.cost === 0}" class="ability"> <md-tooltip> {{ability.name}} <span ng-if="ability.cost === 0"> &nbsp;(Passive) </span> </md-tooltip> <img ng-src="{{getFlagImage(ability.color)}}"> </div> </div> </div> </div> <div class="team_abilities"> <div> <h3>Active Abilities</h3> <div ng-repeat="(color, abilities) in mpqModel.teamActiveAbilities" layout="row" class="active_color"> <div class="color"><img ng-src="{{getTileImage(color)}}"></div> <div layout="column"> <div ng-repeat="ability in abilities"> <strong ng-bind="ability.name"></strong> (Cost: {{ability.cost}}): <span ng-bind="ability.description"></span> </div> </div> </div> </div> <div> <h3>Passive Abilities</h3> <div ng-repeat="character in mpqModel.selectedCharacters" class="passive_abilities"> <div ng-repeat="ability in character.abilities | filter:{\'cost\':0}"> <strong ng-bind="ability.name"></strong>: <span ng-bind="ability.description"></span> </div> </div> </div> </div> </div> <div class="container" layout-fill> <h2>References/Resources</h2> <p>The idea for this tool and a lot of the data came from the following sources</p> <div layout="column" layout-align="start start"> <a href="http://d3go.com/forums/viewtopic.php?f=6&t=17105" target="_blank"> Most Compatible Character/Team Compositions </a> <a href="http://d3go.com/forums/viewtopic.php?f=6&t=19921" target="_blank"> List of Rainbow Teams with 3 Passives </a> <a href="http://d3go.com/forums/viewtopic.php?f=6&t=30692" target="_blank"> 3* Synergy/Rainbow Combinations </a> <a href="http://d3go.com/forums/viewtopic.php?f=14&t=29852" target="_blank"> Character Rankings May 2015 Edition: The Results! </a> <a href="http://d3go.com/forums/viewtopic.php?f=6&t=23635" target="_blank"> Best Characters for Two Colour Combinations </a> <a href="http://d3go.com/games/marvelpuzzlequest/" target="_blank"> The official site. </a> </div> </div> </md-content>')}]);