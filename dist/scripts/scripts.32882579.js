"use strict";angular.module("a11yComponentsApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","a11yModule"]).controller("menuCtrl",["$scope","$location",function(a,b){a.getClass=function(a){return 1==a.length?b.path().substr(0)===a?"active":"":b.path().substr(0,a.length)===a?"active":""}}]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/a11yTypeAhead",{templateUrl:"views/a11yTypeAhead-main.html",controller:"a11yTypeAheadController"}).when("/a11yScroll",{templateUrl:"views/a11yScroll-main.html",controller:"a11yScrollController"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).otherwise({redirectTo:"/"})}]),angular.module("a11yComponentsApp").controller("MainCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("a11yComponentsApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("a11yComponentsApp").run(["$templateCache",function(a){a.put("views/a11yScroll-main.html",'<div class="jumbotron"> <h1>Accessible Dialog Scroll Area</h1> <p class="lead"> Angular directive to effect the scrolling using up / down arrow and pg up / pg down keys in dialog without focusing to the Div tag. </p> </div> <div class="row marketing"> <h4>HTML</h4> <pre>\r\n&lt;div a11y-scroll="id"&gt;&lt;/div&gt;\r\n</pre> </div> <div style="height:2000px"> <form autocomplete="off"> <input type="button" value="Show Dialog" ng-click="showDialog()"> </form> </div>'),a.put("views/a11yTypeAhead-main.html",'<div class="jumbotron"> <h1>Accessible Type Ahead</h1> <p class="lead"> Angular Type Ahead directive with Accessibility. </p> </div> <div class="row marketing"> <h4>HTML</h4> <pre>\r\n&lt;a11y-type-ahead selected-text="name" config="aclConfig"&gt;&lt;/a11y-type-ahead&gt;\r\n</pre> </div> <form autocomplete="off"> <a11y-type-ahead selected-text="name" config="aclConfig"></a11y-type-ahead> <a11y-type-ahead selected-text="name" config="ussConfig"></a11y-type-ahead> <a11y-type-ahead config="uscConfig"></a11y-type-ahead> </form>'),a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/main.html",'<div class="jumbotron hidden"> <h1>Accessible Type Ahead</h1> <p class="lead"> Angular Type Ahead directive with Accessibility. </p> </div> <div class="row marketing"> <h4>HTML</h4> <pre>\r\n&lt;a11y-type-ahead a11y-uid="AsianCountriesList"\r\n        a11y-aria-label="Asian Countries List"\r\n        on-search="onItemSearchCountries(searchString)"\r\n        get-option-template="getOptionTemplate1(suggestion)"\r\n        get-option-text="getSelectedItemText1(itemSelected)"\r\n        on-select="onItemSelected()"\r\n        selected-text="name" /&gt;\r\n  </pre> <h4>Angular</h4> <p> AngularJS is a toolset for building the framework most suited to your application development. </p> <h4>Karma</h4> <p>Spectacular Test Runner for JavaScript.</p> </div> <!--<div style="height:400px;width:100%" scroll-div ="childDiv">\r\n    <a href="#">close Link</a>\r\n    <div id="childDiv" style="height:250px;width:400px;overflow:auto">Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum </div>\r\n</div>-->')}]);