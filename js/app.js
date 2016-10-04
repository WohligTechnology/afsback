// JavaScript Document
var firstapp = angular.module('firstapp', [
    'ui.router',
    'phonecatControllers',
    'templateservicemod',
    'navigationservice',
    'pascalprecht.translate',
    'angulartics',
    'angulartics.google.analytics',
    'imageupload'
]);

firstapp.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    // for http request with session
    $httpProvider.defaults.withCredentials = true;
    $stateProvider

        .state('dashboard', {
        url: "/dashboard",
        templateUrl: "views/template.html",
        controller: 'DashboardCtrl'
    })

    .state('login', {
        url: "/login",
        templateUrl: "views/template.html",
        controller: 'LoginCtrl'
    })

    .state('school', {
        url: "/school",
        templateUrl: "views/template.html",
        controller: 'schoolCtrl'
    })
    .state('banner', {
        url: "/banner",
        templateUrl: "views/template.html",
        controller: 'bannerCtrl'
    })

    .state('createschool', {
        url: "/createschool",
        templateUrl: "views/template.html",
        controller: 'createSchoolCtrl'
    })
    .state('createbanner', {
        url: "/createbanner",
        templateUrl: "views/template.html",
        controller: 'createBannerCtrl'
    })
    .state('editbanner', {
        url: "/editbanner/:id",
        templateUrl: "views/template.html",
        controller: 'editBannerCtrl'
    })

    .state('editschool', {
        url: "/editschool/:id",
        templateUrl: "views/template.html",
        controller: 'editSchoolCtrl'
    })

    .state('student', {
        url: "/student",
        templateUrl: "views/template.html",
        controller: 'studentCtrl'
    })

    .state('createstudent', {
        url: "/createstudent",
        templateUrl: "views/template.html",
        controller: 'createStudentCtrl'
    })
    .state('createteam', {
        url: "/createteam",
        templateUrl: "views/template.html",
        controller: 'createTeamCtrl'
    })
    .state('createknockout', {
        url: "/createknockout/:sportid",
        templateUrl: "views/template.html",
        controller: 'createKnockoutCtrl'
    })
    .state('createheat', {
        url: "/createheat/:sportid/:round/:order",
        templateUrl: "views/template.html",
        controller: 'createHeatCtrl'
    })
    .state('editheat', {
        url: "/editheat/:id/:sportid/:round/:order",
        templateUrl: "views/template.html",
        controller: 'editHeatCtrl'
    })

    .state('heataddround', {
        url: "/heataddround/:id",
        templateUrl: "views/template.html",
        controller: 'heatAddRoundCtrl'
    })
    .state('team', {
        url: "/team",
        templateUrl: "views/template.html",
        controller: 'teamCtrl'
    })
    .state('media', {
        url: "/media",
        templateUrl: "views/template.html",
        controller: 'mediaCtrl'
    })
    .state('viewknockout', {
        url: "/viewknockout/:id",
        templateUrl: "views/template.html",
        controller: 'knockoutCtrl'
    })
    .state('knockoutdashboard', {
        url: "/knockoutdashboard",
        templateUrl: "views/template.html",
        controller: 'knockoutDashboardCtrl'
    })
    .state('heatdashboard', {
        url: "/heatdashboard",
        templateUrl: "views/template.html",
        controller: 'heatDashboardCtrl'
    })
    .state('knockoutsport', {
        url: "/knockoutsport/:id",
        templateUrl: "views/template.html",
        controller: 'knockoutSportCtrl'
    })
    .state('heatsport', {
        url: "/heatsport/:id",
        templateUrl: "views/template.html",
        controller: 'heatSportCtrl'
    })

    .state('editstudent', {
        url: "/editstudent/:id",
        templateUrl: "views/template.html",
        controller: 'editStudentCtrl'
    })
    .state('editteam', {
        url: "/editteam/:id",
        templateUrl: "views/template.html",
        controller: 'editTeamCtrl'
    })
    .state('editknockout', {
        url: "/editknockout/:id/:sportid",
        templateUrl: "views/template.html",
        controller: 'editKnockoutCtrl'
    })

    .state('studentsport', {
        url: "/studentsport/:id/:school",
        templateUrl: "views/template.html",
        controller: 'studentSportCtrl'
    })

    .state('createstudentsport', {
        url: "/createstudentsport/:id/:school",
        templateUrl: "views/template.html",
        controller: 'createStudentSportCtrl'
    })

    .state('editstudentsport', {
        url: "/editstudentsport/:id/:sport/:school",
        templateUrl: "views/template.html",
        controller: 'editStudentSportCtrl'
    })

    .state('sport', {
        url: "/sport",
        templateUrl: "views/template.html",
        controller: 'sportCtrl'
    })

    .state('createsport', {
        url: "/createsport",
        templateUrl: "views/template.html",
        controller: 'createSportCtrl'
    })

    .state('editsport', {
        url: "/editsport/:id",
        templateUrl: "views/template.html",
        controller: 'editSportCtrl'
    })

    .state('sportlist', {
        url: "/sportlist",
        templateUrl: "views/template.html",
        controller: 'sportListCtrl'
    })

    .state('createsportlist', {
        url: "/createsportlist",
        templateUrl: "views/template.html",
        controller: 'createSportListCtrl'
    })

    .state('editsportlist', {
        url: "/editsportlist/:id",
        templateUrl: "views/template.html",
        controller: 'editSportListCtrl'
    })

    .state('agegroup', {
        url: "/agegroup",
        templateUrl: "views/template.html",
        controller: 'ageGroupCtrl'
    })

    .state('createagegroup', {
        url: "/createagegroup",
        templateUrl: "views/template.html",
        controller: 'createAgeGroupCtrl'
    })

    .state('editagegroup', {
        url: "/editagegroup/:id",
        templateUrl: "views/template.html",
        controller: 'editAgeGroupCtrl'
    })

    .state('showstudent', {
        url: "/showstudent",
        templateUrl: "views/template.html",
        controller: 'showStudentCtrl'
    })

    .state('sportrule', {
        url: "/sportrule",
        templateUrl: "views/template.html",
        controller: 'SportRuleCtrl'
    })

    .state('createsportrule', {
        url: "/createsportrule",
        templateUrl: "views/template.html",
        controller: 'createSportRuleCtrl'
    })

    .state('editsportrule', {
        url: "/editsportrule/:id",
        templateUrl: "views/template.html",
        controller: 'editSportRuleCtrl'
    })

    ;
    $urlRouterProvider.otherwise("/dashboard");
    $locationProvider.html5Mode(isproduction);
});

firstapp.filter('uploadpath', function() {
    return function(input, width, height, style) {
        var other = "";
        if (width && width !== "") {
            other += "&width=" + width;
        }
        if (height && height !== "") {
            other += "&height=" + height;
        }
        if (style && style !== "") {
            other += "&style=" + style;
        }
        if (input) {
            if (input.indexOf('https://') == -1) {
                return uploadurl + "readFile?file=" + input + other;
            } else {
                return input;
            }
        }
    };
});
firstapp.directive('img', function($compile, $parse) {
    return {
        restrict: 'E',
        replace: false,
        link: function($scope, element, attrs) {
            var $element = $(element);
            if (!attrs.noloading) {
                $element.after("<img src='img/loading.gif' class='loading' />");
                var $loading = $element.next(".loading");
                $element.load(function() {
                    $loading.remove();
                    $(this).addClass("doneLoading");
                });
            } else {
                $($element).addClass("doneLoading");
            }
        }
    };
});
firstapp.filter('letterLimit',function(){
  return function (value,limit) {
    console.log(value);
    if(value.length < limit){
      return value;
    }else{
      return value.slice(0,limit - 2)+ "..";
    }
  };
});
firstapp.directive('fancyboxBox', function($document) {
    return {
        restrict: 'EA',
        replace: false,
        link: function(scope, element, attr) {
            var $element = $(element);
            var target;
            if (attr.rel) {
                target = $("[rel='" + attr.rel + "']");
            } else {
                target = element;
            }

            target.fancybox({
                openEffect: 'fade',
                closeEffect: 'fade',
                closeBtn: true,
                helpers: {
                    media: {}
                }
            });
        }
    };
});

firstapp.directive('menuOptions', function($document) {
    return {
        restrict: 'C',
        replace: false,
        link: function(scope, element, attr) {
            var $element = $(element);
            $(element).on("click", function() {
                $(".side-header.opened-menu").toggleClass('slide-menu');
                $(".main-content").toggleClass('wide-content');
                $("footer").toggleClass('wide-footer');
                $(".menu-options").toggleClass('active');
            });

        }
    };
});

firstapp.directive('onlyDigits', function() {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, element, attr, ctrl) {
            function inputValue(val) {
                if (val) {
                    var digits = val.replace(/[^0-9]/g, '');

                    if (digits !== val) {
                        ctrl.$setViewValue(digits);
                        ctrl.$render();
                    }
                    return parseInt(digits, 10);
                }
                return undefined;
            }
            ctrl.$parsers.push(inputValue);
        }
    };
});

firstapp.directive('oI', function($document) {
    return {
        restrict: 'C',
        replace: false,
        link: function(scope, element, attr) {
            var $element = $(element);
            $element.click(function() {
                $element.parent().siblings().children("ul").slideUp();
                $element.parent().siblings().removeClass("active");
                $element.parent().children("ul").slideToggle();
                $element.parent().toggleClass("active");
                return false;
            });

        }
    };
});

firstapp.directive('capitalizeFirst', function($parse) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            var capitalize = function(inputValue) {
                if (inputValue === undefined) {
                    inputValue = '';
                }
                var capitalized = inputValue.charAt(0).toUpperCase() +
                    inputValue.substring(1);
                if (capitalized !== inputValue) {
                    modelCtrl.$setViewValue(capitalized);
                    modelCtrl.$render();
                }
                return capitalized;
            }
            modelCtrl.$parsers.push(capitalize);
            capitalize($parse(attrs.ngModel)(scope)); // capitalize initial value
        }
    };
});
firstapp.directive('imageonload', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('load', function() {
                scope.$apply(attrs.imageonload);
            });
        }
    };
});
firstapp.directive('uploadImage', function($http, $filter) {
    return {
        templateUrl: 'views/directive/uploadFile.html',
        scope: {
            model: '=ngModel',
            callback: "=ngCallback",
            uploadurl: "=uploadhere",
            state:"=currentState"
        },
        link: function($scope, element, attrs) {

            $scope.showImage = function() {
                console.log($scope.image);
            };

            if($scope.uploadurl){
              uploadurl = $scope.uploadurl;
            }
            $scope.isMultiple = false;
            $scope.inObject = false;
            if (attrs.multiple || attrs.multiple === "") {
                $scope.isMultiple = true;
                $("#inputImage").attr("multiple", "ADD");
            }
            if (attrs.noView || attrs.noView === "") {
                $scope.noShow = true;
            }

            $scope.$watch("image", function(newVal, oldVal) {
                if (newVal && newVal.file) {
                    $scope.uploadNow(newVal);
                }
            });

            if ($scope.model) {
                if (_.isArray($scope.model)) {
                    $scope.image = [];
                    _.each($scope.model, function(n) {
                        $scope.image.push({
                            url: n
                        });
                    });
                }

            }
            if (attrs.inobj || attrs.inobj === "") {
                $scope.inObject = true;
            }
            $scope.clearOld = function() {
                $scope.model = [];
            };
            $scope.uploadNow = function(image) {
                $scope.uploadStatus = "uploading";

                var Template = this;
                image.hide = true;
                var formData = new FormData();
                formData.append('file', image.file, image.name);
                $http.post(uploadurl, formData, {
                    headers: {
                        'Content-Type': undefined
                    },
                    transformRequest: angular.identity
                }).success(function(data) {
                    if ($scope.callback) {
                        $scope.callback(data);
                    } else {
                        $scope.uploadStatus = "uploaded";
                        if ($scope.isMultiple) {
                            if ($scope.inObject) {
                                $scope.model.push({
                                    "image": data.data[0]
                                });
                            } else {
                                $scope.model.push(data.data[0]);
                            }
                        } else {
                            $scope.model = data.data[0];
                        }
                        if($scope.state){
                          $scope.state.reload();
                        }
                    }
                });
            };
        }
    };
});

// firstapp.directive('uploadImage', function($http, $filter) {
//     return {
//         templateUrl: 'views/directive/uploadFile.html',
//         scope: {
//             model: '=ngModel',
//             callback: "=ngCallback"
//         },
//         link: function($scope, element, attrs) {
//             $scope.isMultiple = false;
//             $scope.inObject = false;
//             if (attrs.multiple || attrs.multiple === "") {
//                 $scope.isMultiple = true;
//                 $("#inputImage").attr("multiple", "ADD");
//             }
//             if (attrs.noView || attrs.noView === "") {
//                 $scope.noShow = true;
//             }
//             if ($scope.model) {
//                 if (_.isArray($scope.model)) {
//                     $scope.image = [];
//                     _.each($scope.model, function(n) {
//                         $scope.image.push({
//                             url: $filter("uploadpath")(n)
//                         });
//                     });
//                 }
//
//             }
//             if (attrs.inobj || attrs.inobj === "") {
//                 $scope.inObject = true;
//             }
//             $scope.clearOld = function() {
//                 $scope.model = [];
//             };
//             $scope.uploadNow = function(image) {
//                 console.log(image);
//                 var Template = this;
//                 image.hide = true;
//                 var formData = new FormData();
//                 formData.append('file', image.file, image.name);
//                 $http.post(uploadurl, formData, {
//                     headers: {
//                         'Content-Type': undefined
//                     },
//                     transformRequest: angular.identity
//                 }).success(function(data) {
//                     console.log("success");
//                     if ($scope.callback) {
//                         $scope.callback(data);
//                     } else {
//                         if ($scope.isMultiple) {
//                             if ($scope.inObject) {
//                                 $scope.model.push({
//                                     "image": data.data[0]
//                                 });
//                             } else {
//                                 $scope.model.push(data.data[0]);
//                             }
//                         } else {
//                             $scope.model = data.data[0];
//                         }
//                     }
//                 });
//             };
//         }
//     };
// });
firstapp.config(function($translateProvider) {
    $translateProvider.translations('en', LanguageEnglish);
    $translateProvider.translations('hi', LanguageHindi);
    $translateProvider.preferredLanguage('en');
});
