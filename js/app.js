// JavaScript Document
var firstapp = angular.module('firstapp', [
    'ui.router',
    'phonecatControllers',
    'templateservicemod',
    'navigationservice',
    'pascalprecht.translate',
    'angulartics',
    'angulartics.google.analytics'
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

    .state('createschool', {
        url: "/createschool",
        templateUrl: "views/template.html",
        controller: 'createSchoolCtrl'
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

    .state('editstudent', {
        url: "/editstudent/:id",
        templateUrl: "views/template.html",
        controller: 'editStudentCtrl'
    })

    .state('studentsport', {
        url: "/studentsport/:id",
        templateUrl: "views/template.html",
        controller: 'studentSportCtrl'
    })

    .state('createstudentsport', {
        url: "/createstudentsport/:id",
        templateUrl: "views/template.html",
        controller: 'createStudentSportCtrl'
    })

    .state('editstudentsport', {
        url: "/editstudentsport/:id/:sport",
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
    });
    $urlRouterProvider.otherwise("/dashboard");
    $locationProvider.html5Mode(isproduction);
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


firstapp.config(function($translateProvider) {
    $translateProvider.translations('en', LanguageEnglish);
    $translateProvider.translations('hi', LanguageHindi);
    $translateProvider.preferredLanguage('en');
});
