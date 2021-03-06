// JavaScript Document
var firstapp = angular.module('firstapp', [
    'ui.router',
    'ngAnimate',
    'ngSanitize',
    'phonecatControllers',
    'templateservicemod',
    'navigationservice',
    'pascalprecht.translate',
    'angulartics',
    'angulartics.google.analytics',
    'imageupload'
]);

firstapp.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
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
        .state('createticker', {
            url: "/createticker/:id",
            templateUrl: "views/template.html",
            controller: 'createTickerCtrl'
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
        .state('createleague', {
            url: "/createleague/:sportid",
            templateUrl: "views/template.html",
            controller: 'createLeagueCtrl'
        })
        .state('createleagueknockout', {
            url: "/createleagueknockout/:sportid/:round/:order",
            templateUrl: "views/template.html",
            controller: 'createLeagueKnockoutCtrl'
        })
        .state('createknockout', {
            url: "/createknockout/:sportid",
            templateUrl: "views/template.html",
            controller: 'createKnockoutCtrl'
        })
        .state('createmedal', {
            url: "/createmedal/:sportid",
            templateUrl: "views/template.html",
            controller: 'createMedalCtrl'
        })
        .state('createheat', {
            url: "/createheat/:sportid/:round/:order",
            templateUrl: "views/template.html",
            controller: 'createHeatCtrl'
        })
        .state('createswissleague', {
            url: "/createswissleague/:sportid",
            templateUrl: "views/template.html",
            controller: 'createSwissLeagueCtrl'
        })
        .state('createqualifyinground', {
            url: "/createqualifyinground/:sportid/:round/:order",
            templateUrl: "views/template.html",
            controller: 'createQualifyingRoundCtrl'
        })
        .state('createqualifyingknockout', {
            url: "/createqualifyingknockout/:sportid/:round/:order",
            templateUrl: "views/template.html",
            controller: 'createQualifyingKnockoutCtrl'
        })
        .state('editheat', {
            url: "/editheat/:id/:sportid/:round/:order",
            templateUrl: "views/template.html",
            controller: 'editHeatCtrl'
        })
        .state('editswissleague', {
            url: "/editswissleague/:id/:sportid",
            templateUrl: "views/template.html",
            controller: 'editSwissLeagueCtrl'
        })
        .state('editqualifyinground', {
            url: "/editqualifyinground/:id/:sportid/:round/:order",
            templateUrl: "views/template.html",
            controller: 'editQualifyingRoundCtrl'
        })
        .state('editqualifyingknockout', {
            url: "/editqualifyingknockout/:id/:sportid/:round/:order",
            templateUrl: "views/template.html",
            controller: 'editQualifyingKnockoutCtrl'
        })
        .state('editleagueknockout', {
            url: "/editleagueknockout/:id/:sportid/:round/:order",
            templateUrl: "views/template.html",
            controller: 'editLeagueKnockoutCtrl'
        })

        .state('heataddround', {
            url: "/heataddround/:id",
            templateUrl: "views/template.html",
            controller: 'heatAddRoundCtrl'
        })
        .state('swissaddround', {
            url: "/swissaddround/:id",
            templateUrl: "views/template.html",
            controller: 'swissAddRoundCtrl'
        })
        .state('qualifyingroundaddround', {
            url: "/qualifyingroundaddround/:id",
            templateUrl: "views/template.html",
            controller: 'qualifyingroundAddRoundCtrl'
        })
        .state('qualifyingknockoutaddround', {
            url: "/qualifyingknockoutaddround/:id",
            templateUrl: "views/template.html",
            controller: 'qualifyingknockoutAddRoundCtrl'
        })
        .state('leagueknockoutaddround', {
            url: "/leagueknockoutaddround/:id",
            templateUrl: "views/template.html",
            controller: 'leagueknockoutAddRoundCtrl'
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
        .state('viewleague', {
            url: "/viewleague/:id",
            templateUrl: "views/template.html",
            controller: 'leagueCtrl'
        })
        .state('viewmedal', {
            url: "/viewmedal/:id",
            templateUrl: "views/template.html",
            controller: 'medalCtrl'
        })
        .state('knockoutdashboard', {
            url: "/knockoutdashboard",
            templateUrl: "views/template.html",
            controller: 'knockoutDashboardCtrl'
        })
        .state('medaldashboard', {
            url: "/medaldashboard",
            templateUrl: "views/template.html",
            controller: 'medalDashboardCtrl'
        })
        .state('heatdashboard', {
            url: "/heatdashboard",
            templateUrl: "views/template.html",
            controller: 'heatDashboardCtrl'
        })
        .state('swissdashboard', {
            url: "/swissdashboard",
            templateUrl: "views/template.html",
            controller: 'swissDashboardCtrl'
        })
        .state('qualifyingrounddashboard', {
            url: "/qualifyingrounddashboard",
            templateUrl: "views/template.html",
            controller: 'qualifyingroundDashboardCtrl'
        })
        .state('qualifyingknockoutdashboard', {
            url: "/qualifyingknockoutdashboard",
            templateUrl: "views/template.html",
            controller: 'qualifyingknockoutDashboardCtrl'
        })
        .state('leaguedashboard', {
            url: "/leaguedashboard",
            templateUrl: "views/template.html",
            controller: 'leagueDashboardCtrl'
        })
        .state('leagueknockoutdashboard', {
            url: "/leagueknockoutdashboard",
            templateUrl: "views/template.html",
            controller: 'leagueKnockoutDashboardCtrl'
        })
        .state('leaguesport', {
            url: "/leaguesport/:id",
            templateUrl: "views/template.html",
            controller: 'leagueSportCtrl'
        })
        .state('leagueknockoutsport', {
            url: "/leagueknockoutsport/:id",
            templateUrl: "views/template.html",
            controller: 'leagueKnockoutSportCtrl'
        })
        .state('knockoutsport', {
            url: "/knockoutsport/:id",
            templateUrl: "views/template.html",
            controller: 'knockoutSportCtrl'
        })
        .state('medalsport', {
            url: "/medalsport/:id",
            templateUrl: "views/template.html",
            controller: 'medalSportCtrl'
        })
        .state('heatsport', {
            url: "/heatsport/:id",
            templateUrl: "views/template.html",
            controller: 'heatSportCtrl'
        })
        .state('swisssport', {
            url: "/swisssport/:id",
            templateUrl: "views/template.html",
            controller: 'swissSportCtrl'
        })
        .state('qualifyingroundsport', {
            url: "/qualifyingroundsport/:id",
            templateUrl: "views/template.html",
            controller: 'qualifyingroundSportCtrl'
        })
        .state('qualifyingknockoutsport', {
            url: "/qualifyingknockoutsport/:id",
            templateUrl: "views/template.html",
            controller: 'qualifyingknockoutSportCtrl'
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
        .state('editleague', {
            url: "/editleague/:id/:sportid",
            templateUrl: "views/template.html",
            controller: 'editLeagueCtrl'
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

        .state('cityrule', {
            url: "/cityrule/:city/:type",
            templateUrl: "views/template.html",
            controller: 'CityRuleCtrl'
        })

        .state('detailcityrule', {
            url: "/detailcityrule/:city/:type/:id",
            templateUrl: "views/template.html",
            controller: 'detailCityRuleCtrl'
        })
        .state('rankingTabledashboard', {
            url: "/rankingtabledashboard",
            templateUrl: "views/template.html",
            controller: 'rankingTableDashboardCtrl'
        })
        .state('createrankingtable', {
            url: "/rankingtable/:type/:id",
            templateUrl: "views/template.html",
            controller: 'createRankingTableCtrl'
        })
        .state('createspecialevent', {
            url: "/createspecialevent/:id",
            templateUrl: "views/template.html",
            controller: 'createSpecialEventCtrl'
        })
        .state('createalbum', {
            url: "/createalbum/:id",
            templateUrl: "views/template.html",
            controller: 'createAlbumCtrl'
        })
        .state('createphotos', {
            url: "/createphotos/:id",
            templateUrl: "views/template.html",
            controller: 'createPhotosCtrl'
        })
        .state('createvideo', {
            url: "/createvideo/:id",
            templateUrl: "views/template.html",
            controller: 'createVideoCtrl'
        })
        .state('ticker', {
            url: "/ticker",
            templateUrl: "views/template.html",
            controller: 'tickerdashboardCtrl'
        })
        .state('liveAlbumdashboard', {
            url: "/liveAlbumdashboard",
            templateUrl: "views/template.html",
            controller: 'liveAlbumDashboardCtrl'
        })
        .state('livePhotosdashboard', {
            url: "/livePhotosdashboard",
            templateUrl: "views/template.html",
            controller: 'livePhotosdashboardCtrl'
        })
        .state('liveVideosdashboard', {
            url: "/videosdashboard",
            templateUrl: "views/template.html",
            controller: 'liveVideosdashboardCtrl'
        })
        .state('specialEventsdashboard', {
            url: "/specialEvents",
            templateUrl: "views/template.html",
            controller: 'specialEventsdashboardCtrl'
        });
    $urlRouterProvider.otherwise("/dashboard");
    $locationProvider.html5Mode(isproduction);
});

firstapp.filter('uploadpath', function () {
    return function (input, width, height, style) {
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
firstapp.directive('img', function ($compile, $parse) {
    return {
        restrict: 'E',
        replace: false,
        link: function ($scope, element, attrs) {
            var $element = $(element);
            if (!attrs.noloading) {
                $element.after("<img src='img/loading.gif' class='loading' />");
                var $loading = $element.next(".loading");
                $element.load(function () {
                    $loading.remove();
                    $(this).addClass("doneLoading");
                });
            } else {
                $($element).addClass("doneLoading");
            }
        }
    };
});
firstapp.filter('letterLimit', function () {
    return function (value, limit) {
        console.log(value);
        if (value.length < limit) {
            return value;
        } else {
            return value.slice(0, limit - 2) + "..";
        }
    };
});
firstapp.filter('firstcapitalize', function () {
    return function (input, all) {
        var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
        return (!!input) ? input.replace(reg, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }) : '';
    };
});
firstapp.directive('fancyboxBox', function ($document) {
    return {
        restrict: 'EA',
        replace: false,
        link: function (scope, element, attr) {
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

firstapp.directive('menuOptions', function ($document) {
    return {
        restrict: 'C',
        replace: false,
        link: function (scope, element, attr) {
            var $element = $(element);
            $(element).on("click", function () {
                $(".side-header.opened-menu").toggleClass('slide-menu');
                $(".main-content").toggleClass('wide-content');
                $("footer").toggleClass('wide-footer');
                $(".menu-options").toggleClass('active');
            });

        }
    };
});

firstapp.directive('onlyDigits', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attr, ctrl) {
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

firstapp.directive('oI', function ($document) {
    return {
        restrict: 'C',
        replace: false,
        link: function (scope, element, attr) {
            var $element = $(element);
            $element.click(function () {
                $element.parent().siblings().children("ul").slideUp();
                $element.parent().siblings().removeClass("active");
                $element.parent().children("ul").slideToggle();
                $element.parent().toggleClass("active");
                return false;
            });

        }
    };
});

firstapp.directive('capitalizeFirst', function ($parse) {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            var capitalize = function (inputValue) {
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
            };
            modelCtrl.$parsers.push(capitalize);
            capitalize($parse(attrs.ngModel)(scope)); // capitalize initial value
        }
    };
});
firstapp.directive('imageonload', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('load', function () {
                scope.$apply(attrs.imageonload);
            });
        }
    };
});
firstapp.directive('uploadImage', function ($http, $filter) {
    return {
        templateUrl: 'views/directive/uploadFile.html',
        scope: {
            model: '=ngModel',
            callback: "=ngCallback",
            uploadurl: "=uploadhere",
            state: "=currentState"
        },
        link: function ($scope, element, attrs) {

            $scope.showImage = function () {
                console.log($scope.image);
            };

            if ($scope.uploadurl) {
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

            $scope.$watch("image", function (newVal, oldVal) {
                if (newVal && newVal.file) {
                    $scope.uploadNow(newVal);
                }
            });

            if ($scope.model) {
                if (_.isArray($scope.model)) {
                    $scope.image = [];
                    _.each($scope.model, function (n) {
                        $scope.image.push({
                            url: n
                        });
                    });
                }

            }
            if (attrs.inobj || attrs.inobj === "") {
                $scope.inObject = true;
            }
            $scope.clearOld = function () {
                $scope.model = [];
            };
            $scope.uploadNow = function (image) {
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
                }).success(function (data) {
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
                        if ($scope.state) {
                            $scope.state.reload();
                        }
                    }
                });
            };
        }
    };
});
firstapp.directive('uploadImages', function ($http, $filter, $timeout) {
    return {
        templateUrl: 'views/directive/uploadFile2.html',
        scope: {
            model: '=ngModel',
            type: "@type",
            ispdf: "@ispdf",
            callback: "&ngCallback"
        },
        link: function ($scope, element, attrs) {
            console.log($scope.model, attrs);
            $scope.showImage = function () {};
            $scope.check = true;
            if (!$scope.type) {
                $scope.type = "image";
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
            // if (attrs.required) {
            //     $scope.required = true;
            // } else {
            //     $scope.required = false;
            // }

            $scope.$watch("image", function (newVal, oldVal) {
                console.log(newVal, oldVal);
                isArr = _.isArray(newVal);
                if (!isArr && newVal && newVal.file) {
                    if ($scope.type === 'pdf' && $scope.ispdf == 'true') {
                        $scope.uploadStatus = '';
                        if (_.endsWith(newVal.file.name, ".pdf")) {
                            $scope.uploadNow(newVal);
                            console.log("pdf Successs");
                            $scope.incorrectFile = false;
                        } else {
                            console.log("Incorrect Filesssssss");
                            $scope.incorrectFile = true;
                        }
                    } else {

                        $scope.uploadNow(newVal);
                    }
                } else if (isArr && newVal.length > 0 && newVal[0].file) {

                    $timeout(function () {
                        console.log(oldVal, newVal);
                        console.log(newVal.length);
                        _.each(newVal, function (newV, key) {
                            if (newV && newV.file) {
                                $scope.uploadNow(newV);
                            }
                        });
                    }, 100);

                }
            });

            if ($scope.model) {
                if (_.isArray($scope.model)) {
                    $scope.image = [];
                    _.each($scope.model, function (n) {
                        $scope.image.push({
                            url: n
                        });
                    });
                } else {
                    if (_.endsWith($scope.model, ".pdf")) {
                        $scope.type = "pdf";
                    }
                }

            }
            if (attrs.inobj || attrs.inobj === "") {
                $scope.inObject = true;
            }
            $scope.clearOld = function () {
                $scope.model = [];
            };
            $scope.uploadNow = function (image) {
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
                }).then(function (data) {
                    data = data.data;
                    $scope.uploadStatus = "uploaded";
                    if ($scope.isMultiple) {
                        if ($scope.inObject) {
                            console.log('data', data, $scope.model);
                            $scope.model.push({
                                "image": data.data[0]
                            });
                        } else {
                            if (!$scope.model) {
                                $scope.clearOld();
                            }
                            $scope.model.push(data.data[0]);
                        }
                    } else {
                        if (_.endsWith(data.data[0], ".pdf")) {
                            $scope.type = "pdf";
                        } else {
                            $scope.type = "image";
                        }
                        $scope.model = data.data[0];
                        console.log($scope.model, 'model means blob')

                    }
                    $timeout(function () {
                        $scope.callback();
                    }, 100);

                });
            };
        }
    };
});
firstapp.directive('uploadExcel', function ($http, $filter) {
    return {
        templateUrl: 'views/directive/uploadExcel.html',
        scope: {
            model: '=ngModel',
            callback: "=ngCallback",
            uploadurl: "=uploadhere",
            state: "=currentState",
            buttonText: "=buttonText"
        },
        link: function ($scope, element, attrs) {

            $scope.showImage = function () {
                console.log($scope.image);
            };

            if ($scope.uploadurl) {
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

            $scope.$watch("image", function (newVal, oldVal) {
                if (newVal && newVal.file) {
                    $scope.uploadNow(newVal);
                }
            });

            if ($scope.model) {
                if (_.isArray($scope.model)) {
                    $scope.image = [];
                    _.each($scope.model, function (n) {
                        $scope.image.push({
                            url: n
                        });
                    });
                }

            }
            if (attrs.inobj || attrs.inobj === "") {
                $scope.inObject = true;
            }
            $scope.clearOld = function () {
                $scope.model = [];
            };
            $scope.uploadNow = function (image) {
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
                }).success(function (data) {
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
                        if ($scope.state) {
                            $scope.state.reload();
                        }
                    }
                });
            };
        }
    };
});
firstapp.filter('linkvideo', function () {
    return function (input, type) {
        var videourl;
        if (type == 'youtube') {
            videourl = "https://www.youtube.com/embed/" + input + "?autoplay=1&modestbranding=0&showinfo=0&rel=0&loop=1";
        } else {
            videourl = "https://player.vimeo.com/video/" + input + "?autoplay=1&loop=1&autopause=0";
        }
        return videourl;
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
firstapp.config(function ($translateProvider) {
    $translateProvider.translations('en', LanguageEnglish);
    $translateProvider.translations('hi', LanguageHindi);
    $translateProvider.preferredLanguage('en');
});