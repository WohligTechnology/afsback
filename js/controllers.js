angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'angular-flexslider', 'ui.select', 'imageupload', 'ui.tinymce', 'toastr', 'textAngular'])

    .controller('headerctrl', function ($scope, TemplateService, $state) {
        $scope.template = TemplateService;
        if (!$.jStorage.get("user")) {
            $state.go("login");
        }
        $scope.logout = function () {
            $.jStorage.flush();
            $state.go("login");
        };
    })

    .controller('LoginCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("login");
        $scope.menutitle = NavigationService.makeactive("Login");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.login = {};
        $scope.showError = false;
        $scope.loginAdmin = function () {
            NavigationService.loginAdmin($scope.login, function (data) {
                if (data.value === true) {
                    $scope.showError = false;
                    $.jStorage.set("user", data.data);
                    $state.go("dashboard");
                } else {
                    $scope.showError = true;
                    $timeout(function () {
                        $scope.showError = false;
                    }, 3000);
                }
            });
        };
    })

    .controller('DashboardCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("dashboard");
        $scope.menutitle = NavigationService.makeactive("Dashboard");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.dash = {};
        $scope.dash.year = "2015";
        $scope.filter = {};
        $scope.dropdowns = {};
        $scope.urls = {};
        $scope.urls.excel = "#";
        NavigationService.getAllSportList(function (response) {
            if (response.value) {
                $scope.dropdowns.sport = response.data;
            } else {
                $scope.dropdowns.sport = [];
            }
        });
        $scope.exportIt = function () {
            $scope.urls.excel = "#";
            console.log($scope.filter);
            if ($scope.filter.sport) {
                $scope.filter.sportname = _.find($scope.dropdowns.sport, function (key) {
                    return key._id == $scope.filter.sport;
                }).name;
                console.log($scope.filter);
            }
            if ($scope.filter.sport && $scope.filter.year) {
                $scope.urls.excel = adminURL + 'studentsport/exportSport?sport=' + $scope.filter.sport + '&year=' + $scope.filter.year;
            }
        };
        $scope.dropdowns.year = NavigationService.getAllYears();
        NavigationService.countStatic(function (data) {
            console.log(data);
            $scope.static = data.data;
        });
        $scope.onChange = function () {
            NavigationService.countForDashboard($scope.dash.year, function (data) {
                console.log(data);
                $scope.dynamic = data.data;
            });
        };
        $scope.onChange();
    })

    .controller('schoolCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("school");
        $scope.menutitle = NavigationService.makeactive("Schools");
        TemplateService.title = $scope.menutitle;
        $scope.adminURL = adminURL;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.contentLoaded = false;
        $scope.schools = [];
        $scope.pagination = {};
        $scope.pagination.pagenumber = 1;

        $scope.reload = function (val) {
            if (val === 1) {
                $scope.pagination.name = "";
            } else if (val === 2) {
                $scope.pagination.sfaid = "";
            }
            NavigationService.getLimitedSchool($scope.pagination, function (data) {
                if (data.value !== false) {
                    $scope.contentLoaded = true;
                    $scope.schools = data.data;
                } else {
                    $scope.schools = {
                        data: []
                    };
                }
            });
        };
        $scope.reload();
        $scope.hideSchool = function (id, status) {
            NavigationService.hideSchool({
                _id: id,
                status: status
            }, function (data2) {
                console.log(data2);
                $scope.reload();
            });
        };
        $scope.confDelete = function () {
            NavigationService.deleteSchool(function (data, status) {
                console.log(data);
                $scope.reload();
            });
        };
        $scope.deleteFunc = function (id) {
            $.jStorage.set("deleteSchool", id);
            $uibModal.open({
                animation: true,
                templateUrl: "views/content/delete.html",
                scope: $scope
            });
        };
    })
    .controller('bannerCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("banner");
        $scope.menutitle = NavigationService.makeactive("Schools");
        TemplateService.title = $scope.menutitle;
        $scope.adminURL = adminURL;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.contentLoaded = false;
        $scope.banners = [];
        $scope.pagination = {};
        $scope.pagination.pagenumber = 1;

        $scope.reload = function (val) {
            NavigationService.getAllBanners(function (response) {
                if (response.value) {
                    $scope.contentLoaded = true;
                    $scope.banners = response.data;
                } else {
                    $scope.banners = [];
                }
            });
        };
        $scope.reload();
        $scope.hideSchool = function (id, status) {
            NavigationService.hideSchool({
                _id: id,
                status: status
            }, function (data2) {
                console.log(data2);
                $scope.reload();
            });
        };
        $scope.confDelete = function () {
            NavigationService.deleteBanner(function (data, status) {
                console.log(data);
                $scope.reload();
            });
        };
        $scope.deleteFunc = function (id) {
            $.jStorage.set("deleteBanner", id);
            $uibModal.open({
                animation: true,
                templateUrl: "views/content/delete.html",
                scope: $scope
            });
        };
    })
    .controller('heatAddRoundCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal, $stateParams, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("heat-add-round");
        $scope.menutitle = NavigationService.makeactive("Heats");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.contentLoaded = false;
        $scope.schools = [];
        $scope.heat = {};
        $scope.adminURL = adminURL;
        $scope.cs = $state;
        $scope.uploadurl = adminURL + "heat/updateVideoURL/";

        $scope.buttonText = "Update Video URLs";

        $scope.heat.sport = $stateParams.id;
        $scope.pagination = {};
        $scope.pagination.pagenumber = 1;
        NavigationService.getOneSport($stateParams.id, function (response) {
            if (response.value) {
                $scope.selectedsport = response.data;
                $scope.heat.year = $scope.selectedsport.year;
            }
        });
        $scope.addRound = function () {

            NavigationService.saveHeat($scope.heat, function (response) {
                if (response.value) {
                    $scope.heat.order = null;
                    $scope.heat.round = null;
                    $scope.getHeats();
                } else {

                }
            });
        };
        $scope.confDelete = function () {
            NavigationService.deleteHeat($.jStorage.get("deleteTeam"), function (data, status) {
                console.log(data);
                $scope.getHeats();
            });
        };
        $scope.deleteFunc = function (id) {
            console.log(id);
            $.jStorage.set("deleteTeam", id);
            $uibModal.open({
                animation: true,
                templateUrl: "views/content/delete.html",
                scope: $scope
            });
        };
        $scope.getHeats = function () {
            NavigationService.getHeats({
                sport: $stateParams.id
            }, function (response) {
                if (response.value) {
                    $scope.heats = _.chain(response.data)
                        .groupBy("round")
                        .toPairs()
                        .map(function (currentItem) {
                            currentItem[2] = currentItem[1][0].order;
                            return _.zipObject(["round", "heats", "order"], currentItem);
                        })
                        .value();
                    console.log($scope.heats);
                }
            });
        };
        $scope.getHeats();
    })
    .controller('leagueknockoutAddRoundCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal, $stateParams, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("leagueknockout-add-round");
        $scope.menutitle = NavigationService.makeactive("League Knockout");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.contentLoaded = false;
        $scope.schools = [];
        $scope.leagueknockout = {};
        $scope.adminURL = adminURL;
        $scope.cs = $state;
        $scope.uploadurl = adminURL + "leagueknockout/updateVideoURL/";

        $scope.buttonText = "Update Video URLs";

        $scope.leagueknockout.sport = $stateParams.id;
        $scope.pagination = {};
        $scope.pagination.pagenumber = 1;
        NavigationService.getOneSport($stateParams.id, function (response) {
            if (response.value) {
                $scope.selectedsport = response.data;
                $scope.leagueknockout.year = $scope.selectedsport.year;
            }
        });
        $scope.addRound = function () {

            NavigationService.saveLeagueKnockout($scope.leagueknockout, function (response) {
                if (response.value) {
                    $scope.leagueknockout.leagueknockoutorder = null;
                    $scope.leagueknockout.leagueknockoutround = null;
                    $scope.getLeagueKnockout();
                } else {

                }
            });
        };
        $scope.confDelete = function () {
            NavigationService.deleteLeagueKnockout($.jStorage.get("deleteLeagueKnockout"), function (data, status) {
                $scope.getLeagueKnockout();
            });
        };
        $scope.deleteFunc = function (id) {
            console.log(id);
            $.jStorage.set("deleteLeagueKnockout", id);
            $uibModal.open({
                animation: true,
                templateUrl: "views/content/delete.html",
                scope: $scope
            });
        };
        $scope.getLeagueKnockout = function () {
            NavigationService.getLeagueKnockout({
                sport: $stateParams.id
            }, function (response) {
                if (response.value) {
                    $scope.leagueknockouts = _.chain(response.data)
                        .groupBy("leagueknockoutround")
                        .toPairs()
                        .map(function (currentItem) {
                            currentItem[2] = currentItem[1][0].leagueknockoutorder;
                            return _.zipObject(["leagueknockoutround", "leagueknockouts", "leagueknockoutorder"], currentItem);
                        })
                        .value();
                    console.log($scope.leagueknockouts);
                }
            });
        };
        $scope.getLeagueKnockout();
    })
    .controller('swissAddRoundCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal, $stateParams, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("swiss-add-round");
        $scope.menutitle = NavigationService.makeactive("Swiss League");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.contentLoaded = false;
        $scope.schools = [];
        $scope.swissleague = {};
        $scope.adminURL = adminURL;
        $scope.cs = $state;
        $scope.uploadurl = adminURL + "swissleague/updateVideoURL/";

        $scope.buttonText = "Update Video URLs";

        $scope.swissleague.sport = $stateParams.id;
        $scope.pagination = {};
        $scope.pagination.pagenumber = 1;
        NavigationService.getOneSport($stateParams.id, function (response) {
            if (response.value) {
                $scope.selectedsport = response.data;
                $scope.swissleague.year = $scope.selectedsport.year;
            }
        });
        $scope.addRound = function () {

            NavigationService.saveSwissLeague($scope.swissleague, function (response) {
                if (response.value) {
                    $scope.swissleague.order = null;
                    $scope.swissleague.round = null;
                    $scope.getSwissLeague();
                } else {

                }
            });
        };
        $scope.confDelete = function () {
            NavigationService.deleteSwissLeague($.jStorage.get("deleteSwiss"), function (data, status) {
                $scope.getSwissLeague();
            });
        };
        $scope.deleteFunc = function (id) {
            console.log(id);
            $.jStorage.set("deleteSwiss", id);
            $uibModal.open({
                animation: true,
                templateUrl: "views/content/delete.html",
                scope: $scope
            });
        };
        $scope.getSwissLeague = function () {
            NavigationService.getSwissLeague({
                sport: $stateParams.id
            }, function (response) {
                if (response.value) {
                    $scope.swissleagues = response.data;
                    //     .groupBy("round")
                    //     .toPairs()
                    //     .map(function (currentItem) {
                    //         currentItem[2] = currentItem[1][0].order;
                    //         return _.zipObject(["round", "swissleagues", "order"], currentItem);
                    //     })
                    //     .value();
                    // console.log($scope.swissleagues);
                }
            });
        };
        $scope.getSwissLeague();
    })
    .controller('qualifyingroundAddRoundCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal, $stateParams, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("qualifyinground-add-round");
        $scope.menutitle = NavigationService.makeactive("Qualifying Round");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.contentLoaded = false;
        $scope.schools = [];
        $scope.qualifyinground = {};
        $scope.adminURL = adminURL;
        $scope.cs = $state;
        $scope.uploadurl = adminURL + "qualifyinground/updateVideoURL/";

        $scope.buttonText = "Update Video URLs";

        $scope.qualifyinground.sport = $stateParams.id;
        $scope.pagination = {};
        $scope.pagination.pagenumber = 1;
        NavigationService.getOneSport($stateParams.id, function (response) {
            if (response.value) {
                $scope.selectedsport = response.data;
                $scope.qualifyinground.year = $scope.selectedsport.year;
            }
        });
        $scope.addRound = function () {

            NavigationService.saveQualifyingRound($scope.qualifyinground, function (response) {
                if (response.value) {
                    $scope.qualifyinground.order = null;
                    $scope.qualifyinground.round = null;
                    $scope.getQualifyingRound();
                } else {

                }
            });
        };
        $scope.confDelete = function () {
            NavigationService.deleteQualifyingRound($.jStorage.get("deleteQualifyingRound"), function (data, status) {
                $scope.getQualifyingRound();
            });
        };
        $scope.deleteFunc = function (id) {
            console.log(id);
            $.jStorage.set("deleteQualifyingRound", id);
            $uibModal.open({
                animation: true,
                templateUrl: "views/content/delete.html",
                scope: $scope
            });
        };
        $scope.getQualifyingRound = function () {
            NavigationService.getQualifyingRound({
                sport: $stateParams.id
            }, function (response) {
                if (response.value) {
                    $scope.qualifyingrounds = _.chain(response.data)
                        .groupBy("round")
                        .toPairs()
                        .map(function (currentItem) {
                            currentItem[2] = currentItem[1][0].order;
                            return _.zipObject(["round", "qualifyingrounds", "order"], currentItem);
                        })
                        .value();
                    console.log($scope.qualifyingrounds);
                }
            });
        };
        $scope.getQualifyingRound();
    })
    .controller('qualifyingknockoutAddRoundCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal, $stateParams, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("qualifyingknockout-add-knockout");
        $scope.menutitle = NavigationService.makeactive("Qualifying Knockout");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.contentLoaded = false;
        $scope.schools = [];
        $scope.qualifyinground = {};
        $scope.adminURL = adminURL;
        $scope.cs = $state;
        $scope.uploadurl = adminURL + "qualifyingknockout/updateVideoURL/";

        $scope.buttonText = "Update Video URLs";

        $scope.qualifyinground.sport = $stateParams.id;
        $scope.pagination = {};
        $scope.pagination.pagenumber = 1;
        NavigationService.getOneSport($stateParams.id, function (response) {
            if (response.value) {
                $scope.selectedsport = response.data;
                $scope.qualifyinground.year = $scope.selectedsport.year;
            }
        });
        $scope.addRound = function () {

            NavigationService.saveQualifyingKnockout($scope.qualifyinground, function (response) {
                if (response.value) {
                    $scope.qualifyinground.order = null;
                    $scope.qualifyinground.round = null;
                    $scope.getQualifyingRound();
                } else {

                }
            });
        };
        $scope.confDelete = function () {
            NavigationService.deleteQualifyingKnockout($.jStorage.get("deleteQualifyingKnockout"), function (data, status) {
                $scope.getQualifyingRound();
            });
        };
        $scope.deleteFunc = function (id) {
            console.log(id);
            $.jStorage.set("deleteQualifyingKnockout", id);
            $uibModal.open({
                animation: true,
                templateUrl: "views/content/delete.html",
                scope: $scope
            });
        };
        $scope.getQualifyingRound = function () {
            NavigationService.getQualifyingKnockout({
                sport: $stateParams.id
            }, function (response) {
                if (response.value) {
                    $scope.qualifyingrounds = _.chain(response.data)
                        .groupBy("round")
                        .toPairs()
                        .map(function (currentItem) {
                            currentItem[2] = currentItem[1][0].order;
                            return _.zipObject(["round", "qualifyingrounds", "order"], currentItem);
                        })
                        .value();
                    console.log($scope.qualifyingrounds);
                }
            });
        };
        $scope.getQualifyingRound();
    })
    .controller('createSchoolCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createschool");
        $scope.menutitle = NavigationService.makeactive("Schools");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.pageName = "Create School";
        $scope.sportsListArr = [];
        $scope.school = {};
        var schoolSports = [];
        $scope.checked = {};
        $scope.allYears = NavigationService.getAllYears();
        $scope.deleteId = 0;
        $scope.school.year = [];
        $scope.status = [{
            id: "",
            name: "Is Verified?"
        }, {
            id: "true",
            name: "Yes"
        }, {
            id: "false",
            name: "No"
        }];
        $scope.add = function (crdv) {
            if (!crdv.contingentLeader) {
                crdv.contingentLeader = [{
                    "year": "",
                    "student": ""
                }];
            } else {
                crdv.contingentLeader.push({
                    "year": "",
                    "student": ""
                });
            }
        };
        $scope.addYear = function () {
            $scope.school.year = [];
            _.each($scope.checked, function (key, property) {
                if (key) {
                    $scope.school.year.push(property);
                }
            });
            console.log($scope.school.year);
        };
        $scope.addDept = function (crdv) {
            if (!crdv.department) {
                crdv.department = [{
                    "year": "",
                    "name": "",
                    "designation": "",
                    "contact": "",
                    "email": ""
                }];
            } else {
                crdv.department.push({
                    "year": "",
                    "name": "",
                    "designation": "",
                    "contact": "",
                    "email": ""
                });
            }
        };
        $scope.confDelete = function () {
            if ($scope.deleteId === 1) {
                $scope.school.department.splice($.jStorage.get("deleteDept"), 1);
            } else {
                $scope.school.contingentLeader.splice($.jStorage.get("deleteLeader"), 1);
            }
        };
        $scope.deleteFunc = function (id, value) {
            if (value === 1) {
                $scope.deleteId = 1;
                $.jStorage.set("deleteDept", id);
            } else {
                $scope.deleteId = 2;
                $.jStorage.set("deleteLeader", id);
            }
            $uibModal.open({
                animation: true,
                templateUrl: "views/content/delete.html",
                scope: $scope
            });
        };

        NavigationService.getAllSportListSchool(function (data) {
            console.log(data);
            $scope.sportsListArr = data;
        });

        NavigationService.getLastId(function (data) {
            if (data.value !== false) {
                $scope.school.sfaid = data.data;
            }
        });
        NavigationService.getStudentList(function (data) {
            if (data.value !== false) {
                $scope.students = data.data;
            }
        });
        $scope.showError = false;
        $scope.errorContact = false;
        $scope.errorEmail = false;
        $scope.errorSportContact = false;
        $scope.saveSchool = function () {
            var schoolSports = [];
            _.each($scope.sportsListArr, function (years) {
                _.each(years, function (category) {
                    schoolSports.push(_.filter(category, "checked"));
                });
            });
            $scope.school.sports = schoolSports = _.flattenDeep(schoolSports);

            function checkContact() {
                $scope.school.contact = $scope.school.contact.toString();
                var split = $scope.school.contact.split(",");
                for (var i = 0; i < split.length; i++) {
                    if (split[i].length != 10) {
                        $scope.errorContact = true;
                        break;
                    } else {
                        $scope.errorContact = false;
                    }
                }
            }

            function checkEmail() {
                var splitEmail = $scope.school.email.split(",");
                for (var i = 0; i < splitEmail.length; i++) {
                    var x = splitEmail[i];
                    var atpos = x.indexOf("@");
                    var dotpos = x.lastIndexOf(".");
                    if (atpos <= 1 || dotpos <= atpos + 2 || dotpos + 2 >= x.length) {
                        $scope.errorEmail = true;
                        break;
                    } else {
                        $scope.errorEmail = false;
                    }
                }
            }

            function checkSportContact() {
                for (var i = 0; i < $scope.school.department.length; i++) {
                    $scope.school.department[i].contact = $scope.school.department[i].contact.toString();
                    if ($scope.school.department[i].contact) {
                        if ($scope.school.department[i].contact.length != 10) {
                            $scope.errorSportContact = true;
                            break;
                        } else {
                            $scope.errorSportContact = false;
                        }
                    }
                }
            }

            function callSave() {
                NavigationService.saveSchool($scope.school, function (data) {
                    if (data.value !== false) {
                        $scope.showError = false;
                        $state.go('school');
                    }
                });
            }

            if ($scope.school.email) {
                checkEmail();
            } else {
                $scope.errorEmail = false;
            }
            if ($scope.school.department && $scope.school.department.length > 0) {
                checkSportContact();
            } else {
                $scope.errorSportContact = false;
            }
            if ($scope.school.contact) {
                checkContact();
            } else {
                $scope.errorContact = false;
            }
            if ($scope.errorContact === false && $scope.errorEmail === false && $scope.errorSportContact === false) {
                console.log($scope.school);
                callSave();
            } else {
                $scope.showError = true;
                $timeout(function () {
                    $scope.showError = false;
                }, 3000);
            }
        };
    })
    .controller('createSchoolCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createschool");
        $scope.menutitle = NavigationService.makeactive("Schools");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.pageName = "Create School";
        $scope.sportsListArr = [];
        $scope.school = {};
        var schoolSports = [];
        $scope.checked = {};
        $scope.allYears = NavigationService.getAllYears();
        $scope.deleteId = 0;
        $scope.school.year = [];
        $scope.status = [{
            id: "",
            name: "Is Verified?"
        }, {
            id: "true",
            name: "Yes"
        }, {
            id: "false",
            name: "No"
        }];
        $scope.add = function (crdv) {
            if (!crdv.contingentLeader) {
                crdv.contingentLeader = [{
                    "year": "",
                    "student": ""
                }];
            } else {
                crdv.contingentLeader.push({
                    "year": "",
                    "student": ""
                });
            }
        };
        $scope.addYear = function () {
            $scope.school.year = [];
            _.each($scope.checked, function (key, property) {
                if (key) {
                    $scope.school.year.push(property);
                }
            });
            console.log($scope.school.year);
        };
        $scope.addDept = function (crdv) {
            if (!crdv.department) {
                crdv.department = [{
                    "year": "",
                    "name": "",
                    "designation": "",
                    "contact": "",
                    "email": ""
                }];
            } else {
                crdv.department.push({
                    "year": "",
                    "name": "",
                    "designation": "",
                    "contact": "",
                    "email": ""
                });
            }
        };
        $scope.confDelete = function () {
            if ($scope.deleteId === 1) {
                $scope.school.department.splice($.jStorage.get("deleteDept"), 1);
            } else {
                $scope.school.contingentLeader.splice($.jStorage.get("deleteLeader"), 1);
            }
        };
        $scope.deleteFunc = function (id, value) {
            if (value === 1) {
                $scope.deleteId = 1;
                $.jStorage.set("deleteDept", id);
            } else {
                $scope.deleteId = 2;
                $.jStorage.set("deleteLeader", id);
            }
            $uibModal.open({
                animation: true,
                templateUrl: "views/content/delete.html",
                scope: $scope
            });
        };

        NavigationService.getAllSportListSchool(function (data) {
            console.log(data);
            $scope.sportsListArr = data;
        });

        NavigationService.getLastId(function (data) {
            if (data.value !== false) {
                $scope.school.sfaid = data.data;
            }
        });
        NavigationService.getStudentList(function (data) {
            if (data.value !== false) {
                $scope.students = data.data;
            }
        });
        $scope.showError = false;
        $scope.errorContact = false;
        $scope.errorEmail = false;
        $scope.errorSportContact = false;
        $scope.saveSchool = function () {
            var schoolSports = [];
            _.each($scope.sportsListArr, function (years) {
                _.each(years, function (category) {
                    schoolSports.push(_.filter(category, "checked"));
                });
            });
            $scope.school.sports = schoolSports = _.flattenDeep(schoolSports);

            function checkContact() {
                $scope.school.contact = $scope.school.contact.toString();
                var split = $scope.school.contact.split(",");
                for (var i = 0; i < split.length; i++) {
                    if (split[i].length != 10) {
                        $scope.errorContact = true;
                        break;
                    } else {
                        $scope.errorContact = false;
                    }
                }
            }

            function checkEmail() {
                var splitEmail = $scope.school.email.split(",");
                for (var i = 0; i < splitEmail.length; i++) {
                    var x = splitEmail[i];
                    var atpos = x.indexOf("@");
                    var dotpos = x.lastIndexOf(".");
                    if (atpos <= 1 || dotpos <= atpos + 2 || dotpos + 2 >= x.length) {
                        $scope.errorEmail = true;
                        break;
                    } else {
                        $scope.errorEmail = false;
                    }
                }
            }

            function checkSportContact() {
                for (var i = 0; i < $scope.school.department.length; i++) {
                    $scope.school.department[i].contact = $scope.school.department[i].contact.toString();
                    if ($scope.school.department[i].contact) {
                        if ($scope.school.department[i].contact.length != 10) {
                            $scope.errorSportContact = true;
                            break;
                        } else {
                            $scope.errorSportContact = false;
                        }
                    }
                }
            }

            function callSave() {
                NavigationService.saveSchool($scope.school, function (data) {
                    if (data.value !== false) {
                        $scope.showError = false;
                        $state.go('school');
                    }
                });
            }

            if ($scope.school.email) {
                checkEmail();
            } else {
                $scope.errorEmail = false;
            }
            if ($scope.school.department && $scope.school.department.length > 0) {
                checkSportContact();
            } else {
                $scope.errorSportContact = false;
            }
            if ($scope.school.contact) {
                checkContact();
            } else {
                $scope.errorContact = false;
            }
            if ($scope.errorContact === false && $scope.errorEmail === false && $scope.errorSportContact === false) {
                console.log($scope.school);
                callSave();
            } else {
                $scope.showError = true;
                $timeout(function () {
                    $scope.showError = false;
                }, 3000);
            }
        };
    })
    .controller('editSchoolCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createschool");
        $scope.menutitle = NavigationService.makeactive("Schools");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.pageName = "Edit School";
        $scope.school = {};
        $scope.checked = {};
        $scope.allYears = NavigationService.getAllYears();
        $scope.status = [{
            id: "",
            name: "Is Verified?"
        }, {
            id: true,
            name: "Yes"
        }, {
            id: false,
            name: "No"
        }];
        $scope.deleteId = 0;
        $scope.add = function (crdv) {
            if (!crdv.contingentLeader) {
                crdv.contingentLeader = [{
                    "year": "",
                    "student": ""
                }];
            } else {
                crdv.contingentLeader.push({
                    "year": "",
                    "student": ""
                });
            }
        };
        $scope.addYear = function () {
            $scope.school.year = [];
            _.each($scope.checked, function (key, property) {
                if (key) {
                    $scope.school.year.push(property);
                }
            });
            console.log($scope.school.year);
        };
        $scope.addDept = function (crdv) {
            if (!crdv.department) {
                crdv.department = [{
                    "year": "",
                    "name": "",
                    "designation": "",
                    "contact": "",
                    "email": ""
                }];
            } else {
                crdv.department.push({
                    "year": "",
                    "name": "",
                    "designation": "",
                    "contact": "",
                    "email": ""
                });
            }
        };

        $scope.confDelete = function () {
            if ($scope.deleteId === 1) {
                $scope.school.department.splice($.jStorage.get("deleteDept"), 1);
            } else {
                $scope.school.contingentLeader.splice($.jStorage.get("deleteLeader"), 1);
            }
        };
        $scope.deleteFunc = function (id, value) {
            if (value === 1) {
                $scope.deleteId = 1;
                $.jStorage.set("deleteDept", id);
            } else {
                $scope.deleteId = 2;
                $.jStorage.set("deleteLeader", id);
            }
            $uibModal.open({
                animation: true,
                templateUrl: "views/content/delete.html",
                scope: $scope
            });
        };
        NavigationService.getStudentList(function (data) {
            if (data.value !== false) {
                $scope.students = data.data;
            }
        });
        var schoolSports = [];
        $scope.showError = false;
        $scope.errorContact = false;
        $scope.errorEmail = false;
        $scope.errorSportContact = false;
        $scope.saveSchool = function () {
            var schoolSports = [];
            _.each($scope.sportsListArr, function (years) {
                _.each(years, function (category) {
                    schoolSports.push(_.filter(category, "checked"));
                });
            });
            $scope.school.sports = schoolSports = _.flattenDeep(schoolSports);

            function checkContact() {
                $scope.school.contact = $scope.school.contact.toString();
                var split = $scope.school.contact.split(",");
                for (var i = 0; i < split.length; i++) {
                    if (split[i].length != 10) {
                        $scope.errorContact = true;
                        break;
                    } else {
                        $scope.errorContact = false;
                    }
                }
            }

            function checkEmail() {
                var splitEmail = $scope.school.email.split(",");
                for (var i = 0; i < splitEmail.length; i++) {
                    var x = splitEmail[i];
                    var atpos = x.indexOf("@");
                    var dotpos = x.lastIndexOf(".");
                    if (atpos <= 1 || dotpos <= atpos + 2 || dotpos + 2 >= x.length) {
                        $scope.errorEmail = true;
                        break;
                    } else {
                        $scope.errorEmail = false;
                    }
                }
            }

            function checkSportContact() {
                for (var i = 0; i < $scope.school.department.length; i++) {
                    $scope.school.department[i].contact = $scope.school.department[i].contact.toString();
                    if ($scope.school.department[i].contact) {
                        if ($scope.school.department[i].contact.toString().length != 10) {
                            $scope.errorSportContact = true;
                            break;
                        } else {
                            $scope.errorSportContact = false;
                        }
                    }
                }
            }

            function callSave() {
                NavigationService.saveSchool($scope.school, function (data) {
                    if (data.value !== false) {
                        $scope.showError = false;
                        $state.go('school');
                    }
                });
            }

            if ($scope.school.email) {
                checkEmail();
            } else {
                $scope.errorEmail = false;
            }
            if ($scope.school.department && $scope.school.department.length > 0) {
                checkSportContact();
            } else {
                $scope.errorSportContact = false;
            }
            if ($scope.school.contact) {
                checkContact();
            } else {
                $scope.errorContact = false;
            }
            if ($scope.errorContact === false && $scope.errorEmail === false && $scope.errorSportContact === false) {
                console.log($scope.school);
                callSave();
            } else {
                $scope.showError = true;
                $timeout(function () {
                    $scope.showError = false;
                }, 3000);
            }
        };


        NavigationService.getOneSchool($stateParams.id, function (data) {
            if (data.value !== false) {
                $scope.school = data.data;
                NavigationService.getAllSportListSchool(function (data2) {
                    $scope.sportsListArr = data2;
                    _.each($scope.sportsListArr, function (year) {
                        _.each(year, function (category) {
                            _.each(category, function (n) {
                                console.log(data);
                                var num = _.findIndex(data.data.sports, function (m) {
                                    return (n._id == m._id && n.year == m.year);
                                });
                                if (num >= 0) {
                                    n.checked = true;
                                }
                            });
                        });
                    });
                    _.each($scope.school.year, function (key) {
                        $scope.checked[key] = true;
                    });
                });
            }
        });
    })
    .controller('editTeamCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createteam");
        $scope.menutitle = NavigationService.makeactive("Teams");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.pageName = "Edit Team";
        $scope.school = {};
        $scope.allYears = NavigationService.getAllYears();
        console.log($stateParams);
        $scope.dropdowns = {};
        if ($stateParams.id) {
            NavigationService.getOneTeam($stateParams, function (response) {
                if (response.value) {
                    $scope.tempTeam = response.data;
                    $scope.team = $scope.tempTeam;
                    $scope.team.playersArray = $scope.team.players;
                    $scope.callme();
                    console.log($scope.team);
                } else {

                }
            });
        }

        $scope.forSimilarNamesBackend = function () {
            $scope.dropdowns.teams = [];
            NavigationService.forSimilarNamesBackend({
                name: $scope.team.name
            }, function (response) {
                if (response.value) {
                    $scope.dropdowns.teams = response.data;
                } else {
                    $scope.dropdowns.teams = [];
                }
            });
        };
        /////////////////// CODE FROM CREATE TEAM
        $scope.setTeamName = function (teamName) {
            $scope.team.name = teamName;
        };
        NavigationService.getSchoolList(function (data) {
            if (data.value !== false) {
                $scope.schools = data.data;
            }
        });
        $scope.callme = function () {
            console.log("called me");
            console.log($scope.team.year);
            if ($scope.team.year && $scope.team.school && $scope.team.school._id) {
                console.log("team.year");
                NavigationService.getSchoolSports($scope.team.year.toString(), $scope.team.school._id, function (data2) {
                    console.log(data2);
                    $scope.sportsList = data2.data;
                });
            }
        };
        $scope.teamNameGenerate = function () {
            $scope.team.name = '';
            if ($scope.team.school) {
                $scope.team.name += $scope.team.school.name;
            }
            if ($scope.team.sport) {
                $scope.team.name += " " + $scope.team.sport.name;
            }
            if ($scope.team.gender !== undefined && $scope.team.gender !== null) {
                $scope.team.name += " " + $scope.team.gender;
            }
            if ($scope.team.category !== undefined && $scope.team.category.name !== null) {
                $scope.team.name += " " + $scope.team.category.name;
            }
            if ($scope.team.agegroup) {
                $scope.team.name += " " + $scope.team.agegroup.name;
            }
            $scope.forSimilarNamesBackend();

        };
        $scope.sportSelected = function () {
            $scope.team.name = $scope.team.school.name + $scope.team;
            $scope.teamNameGenerate();
            NavigationService.filterCategory($scope.team.sport, function (data) {
                if (data) {
                    console.log(data);
                    $scope.firstcategories = data.data[0].firstcategory;
                    console.log($scope.firstcategories);
                }
            });
        };
        $scope.getCaptain = function (search) {
            console.log(search.length);
            $scope.students = [];


            var obj = {};
            obj.search = search;
            if (isNaN(search)) {
                obj.search = search;
                obj.sfaid = undefined;
            } else {
                obj.search = undefined;
                obj.sfaid = parseInt(search);
            }
            obj.school = $scope.team.school._id;

            NavigationService.findForDropSingle(obj, function (data) {
                if (data && data.value !== false) {
                    $scope.students = data.data;
                    console.log($scope.students);
                } else {
                    $scope.students = [];
                }
            });

        };
        $scope.addPlayer = function (selected) {

            $scope.team.playersArray.push(selected);
            console.log($scope.team.playersArray);
        };
        $scope.getOneSport = function (sport) {
            NavigationService.getOneSport(sport, function (data) {
                if (data.value !== false) {
                    $scope.sport = data.data;
                }
            });
        };
        $scope.getPlayers = function (search) {

            var obj = {};
            obj.search = search;
            if (isNaN(search)) {
                obj.search = search;
                obj.sfaid = undefined;
            } else {
                obj.search = undefined;
                obj.sfaid = parseInt(search);
            }
            obj.student = $scope.team.playersArray;
            obj.school = $scope.team.school._id;
            NavigationService.getStudentBySchool(obj, function (data) {
                if (data && data.value !== false) {
                    $scope.players = data.data;
                } else {
                    $scope.players = [];
                }
            });

        };

        NavigationService.getAllAgeGroup(function (data) {
            if (data.value) {
                $scope.agegroups = data.data;
            }
        });
        $scope.getMinMaxForTeam = function () {
            console.log($scope.team);
            var minmaxforteam = {};
            $scope.teamNameGenerate();
            if ($scope.team.category) {
                minmaxforteam = {
                    "sport": $scope.team.sport._id,
                    "category": $scope.team.category._id,
                    "agegroup": $scope.team.agegroup._id,
                    "gender": $scope.team.gender
                };
            } else {
                minmaxforteam = {
                    "sport": $scope.team.sport._id,
                    "agegroup": $scope.team.agegroup._id,
                    "gender": $scope.team.gender
                };
            }
            NavigationService.getMinMaxForTeam(minmaxforteam, function (data) {
                if (data.value) {
                    if (data.data) {
                        $scope.sport = data.data[0];
                    }
                } else {

                }
            });
        };

        $scope.savePlayer = function (data, select) {
            if ($scope.team.playersArray.length < $scope.sport.minPlayers) {
                $scope.minValid = true;
            } else {
                $scope.minValid = false;
            }
        };
        /////////////////// END CODE FROM CREATE TEAM

        $scope.checkTeam = function () {
            console.log($scope.team);
            if (!$scope.minValid) {
                $scope.team.players = _.map($scope.team.playersArray, function (key) {
                    return key._id;
                });
                var request = {};
                request = {
                    _id: $scope.team._id,
                    school: $scope.team.school._id,
                    sport: $scope.team.sport._id,
                    players: $scope.team.players,
                    agegroup: $scope.team.agegroup._id,
                    gender: $scope.team.gender,
                    name: $scope.team.name,
                    coach: $scope.team.coach,
                    captain: $scope.team.captain._id,
                    year: $scope.team.year
                };
                if ($scope.team.category) {
                    request.category = $scope.team.category._id;
                } else {

                }
                NavigationService.saveTeam(request, function (data) {
                    if (data.value) {
                        $state.go('team');
                    } else {

                    }
                });
            } else {

            }
        };
    })

    .controller('studentCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("student");
        $scope.menutitle = NavigationService.makeactive("Students");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.contentLoaded = false;
        $scope.pagination = {};
        $scope.pagination.pagenumber = 1;
        $scope.adminURL = adminURL;
        $scope.reload = function (val) {
            if (val === 1) {
                $scope.pagination.name = "";
            } else if (val === 2) {
                $scope.pagination.sfaid = "";
            }
            NavigationService.getLimitedStudent($scope.pagination, function (data) {
                if (data.value !== false) {
                    $scope.contentLoaded = true;
                    $scope.students = data.data;
                } else {
                    $scope.students = {
                        data: []
                    };
                }
            });
        };
        $scope.reload();
        $scope.hideStudent = function (id, status) {
            NavigationService.hideStudent({
                _id: id,
                status: status
            }, function (data2) {
                console.log(data2);
                $scope.reload();
            });
        };
        $scope.confDelete = function () {
            NavigationService.deleteStudent(function (data, status) {
                console.log(data);
                $scope.reload();
            });
        };
        $scope.deleteFunc = function (id) {
            console.log(id);
            $.jStorage.set("deleteStudent", id);
            $.jStorage.get("deleteStudent");
            $uibModal.open({
                animation: true,
                templateUrl: "views/content/delete.html",
                scope: $scope
            });
        };
    })
    .controller('teamCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("team");
        $scope.menutitle = NavigationService.makeactive("Teams");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.contentLoaded = false;
        $scope.pagination = {};
        $scope.filter = {};
        $scope.pagination.pagenumber = 1;
        $scope.adminURL = adminURL;
        $scope.reload = function (search) {
            if (isNaN(search) || search === '') {
                $scope.pagination.name = search;
                $scope.pagination.sfaid = undefined;
            } else {
                $scope.pagination.sfaid = parseInt(search);
                $scope.pagination.name = undefined;
            }
            NavigationService.getLimitedTeam($scope.pagination, function (data) {
                if (data.value !== false) {
                    console.log(data);
                    $scope.contentLoaded = true;
                    $scope.teams = data.data.data;
                    $scope.team = data.data;
                    console.log($scope.teams);
                } else {
                    $scope.teams = {
                        data: []
                    };
                }
            });
        };
        $scope.reload();
        $scope.hideStudent = function (id, status) {
            NavigationService.hideStudent({
                _id: id,
                status: status
            }, function (data2) {
                console.log(data2);
                $scope.reload();
            });
        };
        $scope.confDelete = function () {
            NavigationService.deleteTeam($.jStorage.get("deleteTeam"), function (data, status) {
                console.log(data);
                $scope.reload();
            });
        };
        $scope.deleteFunc = function (id) {
            console.log(id);
            $.jStorage.set("deleteTeam", id);
            $uibModal.open({
                animation: true,
                templateUrl: "views/content/delete.html",
                scope: $scope
            });
        };

    })
    .controller('knockoutCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal, $stateParams, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("knockout");
        $scope.menutitle = NavigationService.makeactive("Knockout");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.contentLoaded = false;
        $scope.pagination = {};
        $scope.adminURL = adminURL;
        $scope.uploadurl = adminURL + "knockout/updateVideoURL/";
        $scope.buttonText = "Update Video URLs";
        $scope.cs = $state;
        $scope.pagination.pagenumber = 1;
        $scope.pagination.sport = $stateParams.id;
        NavigationService.getOneSport($stateParams.id, function (response) {
            if (response.value) {
                $scope.selectedsport = response.data;
            }
        });
        $scope.reload = function (val) {
            if (val === 1) {
                $scope.pagination.name = "";
            } else if (val === 2) {
                $scope.pagination.sfaid = "";
            }
            NavigationService.getLimitedKnockout($scope.pagination, function (data) {
                if (data.value !== false) {
                    $scope.knockouts = data.data.data;
                    $scope.knockout = data.data;
                } else {
                    $scope.teams = {
                        data: []
                    };
                }
            });
        };
        $scope.createNewThirdPlace = function () {
            var constraints = {};
            constraints.sport = $stateParams.id;
            constraints.round = 'Third Place';
            constraints.roundno = -1;
            constraints.order = 0;
            constraints.year = $scope.selectedsport.year;
            NavigationService.submitKnockout(constraints, function (response) {
                if (response.value) {
                    $scope.reload();
                } else {

                }
            });
        };

        $scope.reload();
        $scope.hideStudent = function (id, status) {
            NavigationService.hideStudent({
                _id: id,
                status: status
            }, function (data2) {
                console.log(data2);
                $scope.reload();
            });
        };
        $scope.confDelete = function () {
            NavigationService.deleteKnockout($.jStorage.get("deleteTeam"), function (data, status) {
                console.log(data);
                $scope.reload();
            });
        };
        $scope.deleteFunc = function (id) {
            console.log(id);
            $.jStorage.set("deleteTeam", id);
            $uibModal.open({
                animation: true,
                templateUrl: "views/content/delete.html",
                scope: $scope
            });
        };

    })
    .controller('leagueCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("league");
        $scope.menutitle = NavigationService.makeactive("League");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.contentLoaded = false;
        $scope.pagination = {};
        $scope.pagination.pagenumber = 1;
        $scope.pagination.sport = $stateParams.id;
        NavigationService.getOneSport($stateParams.id, function (response) {
            if (response.value) {
                $scope.selectedsport = response.data;
            }
        });
        $scope.reload = function (val) {
            if (val === 1) {
                $scope.pagination.name = "";
            } else if (val === 2) {
                $scope.pagination.sfaid = "";
            }
            NavigationService.getLimitedLeague($scope.pagination, function (data) {
                if (data.value !== false) {
                    $scope.leagues = data.data.data;
                    $scope.league = data.data;
                } else {
                    $scope.teams = {
                        data: []
                    };
                }
            });
        };
        $scope.createNewThirdPlace = function () {
            var constraints = {};
            constraints.sport = $stateParams.id;
            constraints.round = 'Third Place';
            constraints.roundno = -1;
            constraints.order = -1;
            constraints.year = $scope.selectedsport.year;
            NavigationService.submitLeague(constraints, function (response) {
                if (response.value) {
                    $scope.reload();
                } else {

                }
            });
        };

        $scope.reload();
        $scope.hideStudent = function (id, status) {
            NavigationService.hideStudent({
                _id: id,
                status: status
            }, function (data2) {
                console.log(data2);
                $scope.reload();
            });
        };
        $scope.confDelete = function () {
            NavigationService.deleteLeague($.jStorage.get("deleteLeague"), function (data, status) {
                console.log(data);
                $scope.reload();
            });
        };
        $scope.deleteFunc = function (id) {
            console.log(id);
            $.jStorage.set("deleteLeague", id);
            $uibModal.open({
                animation: true,
                templateUrl: "views/content/delete.html",
                scope: $scope
            });
        };

    })
    .controller('medalCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("medal");
        $scope.menutitle = NavigationService.makeactive("Knockout");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.contentLoaded = false;
        $scope.pagination = {};
        $scope.pagination.pagenumber = 1;
        $scope.pagination.sport = $stateParams.id;
        NavigationService.getOneSport($stateParams.id, function (response) {
            if (response.value) {
                $scope.selectedsport = response.data;
            }
        });
        $scope.reload = function (val) {
            // if (val === 1) {
            //     $scope.pagination.name = "";
            // } else if (val === 2) {
            //     $scope.pagination.sfaid = "";
            // }
            // NavigationService.getLimitedKnockout($scope.pagination, function(data) {
            //     if (data.value !== false) {
            //         $scope.medals = data.data.data;
            //         $scope.medal = data.data;
            //     } else {
            //         $scope.teams = {
            //             data: []
            //         };
            //     }
            // });
            NavigationService.getMedalBySport($scope.pagination, function (response) {
                if (response.value !== false) {
                    $scope.medals = response.data;
                } else {
                    $scope.medals = [];
                }
            });
        };

        $scope.reload();
        // $scope.hideStudent = function(id, status) {
        //     NavigationService.hideStudent({
        //         _id: id,
        //         status: status
        //     }, function(data2) {
        //         console.log(data2);
        //         $scope.reload();
        //     });
        // };
        $scope.confDelete = function () {
            NavigationService.deleteMedal($.jStorage.get("deleteMedal"), function (data, status) {
                console.log(data);
                $scope.reload();
            });
        };
        $scope.deleteFunc = function (id) {
            console.log(id);
            $.jStorage.set("deleteMedal", id);
            $uibModal.open({
                animation: true,
                templateUrl: "views/content/delete.html",
                scope: $scope
            });
        };

    })
    .controller('medalDashboardCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("medal-dashboard");
        $scope.menutitle = NavigationService.makeactive("Medals");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.getSportList = function () {
            NavigationService.getAllSportList(function (response) {
                if (response.value) {
                    $scope.sports = response.data;
                    $scope.sports = _.chain(response.data)
                        .groupBy("sporttype")
                        .toPairs()
                        .map(function (currentItem) {
                            return _.zipObject(["sporttype", "name"], currentItem);
                        })
                        .value();
                }
            });
        };
        $scope.getSportList();
    })
    .controller('knockoutDashboardCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("knockout-dashboard");
        $scope.menutitle = NavigationService.makeactive("Knockout");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.getSportList = function () {
            NavigationService.getAllKnockoutSport(function (response) {
                if (response.value) {
                    $scope.sports = response.data;
                    $scope.sports = _.chain(response.data)
                        .groupBy("sporttype")
                        .toPairs()
                        .map(function (currentItem) {
                            return _.zipObject(["sporttype", "name"], currentItem);
                        })
                        .value();
                }
            });
        };
        $scope.getSportList();
    })
    .controller('leagueDashboardCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("league-dashboard");
        $scope.menutitle = NavigationService.makeactive("Knockout");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.getSportList = function () {
            NavigationService.getSportByDrawFormat({
                drawFormat: "League"
            }, function (response) {
                if (response.value) {
                    $scope.sports = response.data;
                    $scope.sports = _.chain(response.data)
                        .groupBy("sporttype")
                        .toPairs()
                        .map(function (currentItem) {
                            return _.zipObject(["sporttype", "name"], currentItem);
                        })
                        .value();
                }
            });
        };
        $scope.getSportList();
    })
    .controller('leagueKnockoutDashboardCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("leagueknockout-dashboard");
        $scope.menutitle = NavigationService.makeactive("League Knockout");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.getSportList = function () {
            NavigationService.getSportByDrawFormat({
                drawFormat: "League cum Knockout"
            }, function (response) {
                if (response.value) {
                    $scope.sports = response.data;
                    $scope.sports = _.chain(response.data)
                        .groupBy("sporttype")
                        .toPairs()
                        .map(function (currentItem) {
                            return _.zipObject(["sporttype", "name"], currentItem);
                        })
                        .value();
                }
            });
        };
        $scope.getSportList();
    })
    .controller('swissDashboardCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("swiss-dashboard");
        $scope.menutitle = NavigationService.makeactive("Swiss League");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.getSportList = function () {
            NavigationService.getSportByDrawFormat({
                drawFormat: "Swiss League"
            }, function (response) {
                if (response.value) {
                    $scope.sports = response.data;
                    $scope.sports = _.chain(response.data)
                        .groupBy("sporttype")
                        .toPairs()
                        .map(function (currentItem) {
                            return _.zipObject(["sporttype", "name"], currentItem);
                        })
                        .value();
                }
            });
        };
        $scope.getSportList();
    })
    .controller('qualifyingroundDashboardCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("qualifyinground-dashboard");
        $scope.menutitle = NavigationService.makeactive("Qualifying Round");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.getSportList = function () {
            NavigationService.getSportByDrawFormat({
                drawFormat: "Qualifying Round"
            }, function (response) {
                if (response.value) {
                    $scope.sports = response.data;
                    $scope.sports = _.chain(response.data)
                        .groupBy("sporttype")
                        .toPairs()
                        .map(function (currentItem) {
                            return _.zipObject(["sporttype", "name"], currentItem);
                        })
                        .value();
                }
            });
        };
        $scope.getSportList();
    })
    .controller('qualifyingknockoutDashboardCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("qualifyingknockout-dashboard");
        $scope.menutitle = NavigationService.makeactive("Qualifying Knockout");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.getSportList = function () {
            NavigationService.getSportByDrawFormat({
                drawFormat: "Qualifying Knockout"
            }, function (response) {
                if (response.value) {
                    $scope.sports = response.data;
                    $scope.sports = _.chain(response.data)
                        .groupBy("sporttype")
                        .toPairs()
                        .map(function (currentItem) {
                            return _.zipObject(["sporttype", "name"], currentItem);
                        })
                        .value();
                }
            });
        };
        $scope.getSportList();
    })
    .controller('knockoutSportCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("knockout-sport");
        $scope.menutitle = NavigationService.makeactive("Knockout");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.getOneSport = function (id) {
            NavigationService.getOneSportList(id, function (response) {
                if (response.value) {
                    $scope.sportSelected = response.data;
                    $scope.knockoutSports($stateParams);
                }
            });
        };
        $scope.getOneSport($stateParams.id);
        $scope.knockoutSports = function (constraints) {
            $scope.sports = [];
            NavigationService.knockoutSports(constraints, function (response) {
                if (response.value) {
                    $scope.sports = _.chain(response.data)
                        .groupBy("year")
                        .toPairs()
                        .map(function (currentItem) {
                            return _.zipObject(["year", "sports"], currentItem);
                        })
                        .value();
                    _.each($scope.sports, function (key) {
                        key.sports = _.chain(key.sports)
                            .groupBy("agegroup.name")
                            .toPairs()
                            .map(function (currentItem) {
                                return _.zipObject(["agegroup", "sports"], currentItem);
                            })
                            .value();

                    });
                    console.log($scope.sports);
                }
            });
        };

    })
    .controller('medalSportCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("medal-sport");
        $scope.menutitle = NavigationService.makeactive("Medals");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.getOneSport = function (id) {
            NavigationService.getOneSportList(id, function (response) {
                if (response.value) {
                    $scope.sportSelected = response.data;
                    $scope.medalSports($stateParams);
                }
            });
        };
        $scope.getOneSport($stateParams.id);
        $scope.medalSports = function (constraints) {
            $scope.sports = [];
            NavigationService.medalSports(constraints, function (response) {
                if (response.value) {
                    $scope.sports = _.chain(response.data)
                        .groupBy("year")
                        .toPairs()
                        .map(function (currentItem) {
                            return _.zipObject(["year", "sports"], currentItem);
                        })
                        .value();
                    _.each($scope.sports, function (key) {
                        key.sports = _.chain(key.sports)
                            .groupBy("agegroup.name")
                            .toPairs()
                            .map(function (currentItem) {
                                return _.zipObject(["agegroup", "sports"], currentItem);
                            })
                            .value();

                    });
                    console.log($scope.sports);
                }
            });
        };

    })
    .controller('heatDashboardCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("heat-dashboard");
        $scope.menutitle = NavigationService.makeactive("Heat");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.getSportList = function () {
            NavigationService.getAllHeatSport(function (response) {
                if (response.value) {
                    $scope.sports = response.data;
                    $scope.sports = _.chain(response.data)
                        .groupBy("sporttype")
                        .toPairs()
                        .map(function (currentItem) {
                            return _.zipObject(["sporttype", "name"], currentItem);
                        })
                        .value();
                }
            });
        };
        $scope.getSportList();
    })
    .controller('leagueSportCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("league-sport");
        $scope.menutitle = NavigationService.makeactive("Heat");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.getOneSport = function (id) {
            NavigationService.getOneSportList(id, function (response) {
                if (response.value) {
                    $scope.sportSelected = response.data;
                    $scope.leagueSports($stateParams);
                }
            });
        };
        $scope.getOneSport($stateParams.id);
        $scope.leagueSports = function (constraints) {
            $scope.sports = [];
            NavigationService.leagueSports(constraints, function (response) {
                if (response.value) {
                    $scope.sports = _.chain(response.data)
                        .groupBy("year")
                        .toPairs()
                        .map(function (currentItem) {
                            return _.zipObject(["year", "sports"], currentItem);
                        })
                        .value();
                    _.each($scope.sports, function (key) {
                        key.sports = _.chain(key.sports)
                            .groupBy("agegroup.name")
                            .toPairs()
                            .map(function (currentItem) {
                                return _.zipObject(["agegroup", "sports"], currentItem);
                            })
                            .value();

                    });
                    console.log($scope.sports);
                }
            });
        };
    })
    .controller('swissSportCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("swiss-sport");
        $scope.menutitle = NavigationService.makeactive("Heat");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.getOneSport = function (id) {
            NavigationService.getOneSportList(id, function (response) {
                if (response.value) {
                    $scope.sportSelected = response.data;
                    $scope.swissSports({
                        sportlist: $stateParams.id,
                        drawFormat: "Swiss League"
                    });
                }
            });
        };
        $scope.getOneSport($stateParams.id);
        $scope.swissSports = function (constraints) {
            $scope.sports = [];
            NavigationService.swissSports(constraints, function (response) {
                if (response.value) {
                    $scope.sports = _.chain(response.data)
                        .groupBy("year")
                        .toPairs()
                        .map(function (currentItem) {
                            return _.zipObject(["year", "sports"], currentItem);
                        })
                        .value();
                    _.each($scope.sports, function (key) {
                        key.sports = _.chain(key.sports)
                            .groupBy("agegroup.name")
                            .toPairs()
                            .map(function (currentItem) {
                                return _.zipObject(["agegroup", "sports"], currentItem);
                            })
                            .value();

                    });
                    console.log($scope.sports);
                }
            });
        };
    })
    .controller('qualifyingroundSportCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("qualifyinground-sport");
        $scope.menutitle = NavigationService.makeactive("Qualifying Round");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.getOneSport = function (id) {
            NavigationService.getOneSportList(id, function (response) {
                if (response.value) {
                    $scope.sportSelected = response.data;
                    $scope.swissSports({
                        sportlist: $stateParams.id,
                        drawFormat: "Qualifying Round"
                    });
                }
            });
        };
        $scope.getOneSport($stateParams.id);
        $scope.swissSports = function (constraints) {
            $scope.sports = [];
            NavigationService.swissSports(constraints, function (response) {
                if (response.value) {
                    $scope.sports = _.chain(response.data)
                        .groupBy("year")
                        .toPairs()
                        .map(function (currentItem) {
                            return _.zipObject(["year", "sports"], currentItem);
                        })
                        .value();
                    _.each($scope.sports, function (key) {
                        key.sports = _.chain(key.sports)
                            .groupBy("agegroup.name")
                            .toPairs()
                            .map(function (currentItem) {
                                return _.zipObject(["agegroup", "sports"], currentItem);
                            })
                            .value();

                    });
                    console.log($scope.sports);
                }
            });
        };
    })
    .controller('qualifyingknockoutSportCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("qualifyingknockout-sport");
        $scope.menutitle = NavigationService.makeactive("Qualifying Knockout");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.getOneSport = function (id) {
            NavigationService.getOneSportList(id, function (response) {
                if (response.value) {
                    $scope.sportSelected = response.data;
                    $scope.swissSports({
                        sportlist: $stateParams.id,
                        drawFormat: "Qualifying Knockout"
                    });
                }
            });
        };
        $scope.getOneSport($stateParams.id);
        $scope.swissSports = function (constraints) {
            $scope.sports = [];
            NavigationService.swissSports(constraints, function (response) {
                if (response.value) {
                    $scope.sports = _.chain(response.data)
                        .groupBy("year")
                        .toPairs()
                        .map(function (currentItem) {
                            return _.zipObject(["year", "sports"], currentItem);
                        })
                        .value();
                    _.each($scope.sports, function (key) {
                        key.sports = _.chain(key.sports)
                            .groupBy("agegroup.name")
                            .toPairs()
                            .map(function (currentItem) {
                                return _.zipObject(["agegroup", "sports"], currentItem);
                            })
                            .value();

                    });
                    console.log($scope.sports);
                }
            });
        };
    })
    .controller('leagueKnockoutSportCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("leagueknockout-sport");
        $scope.menutitle = NavigationService.makeactive("League Knockout");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.getOneSport = function (id) {
            NavigationService.getOneSportList(id, function (response) {
                if (response.value) {
                    $scope.sportSelected = response.data;
                    $scope.leagueKnockoutSports({
                        sportlist: $stateParams.id,
                        drawFormat: "League cum Knockout"
                    });
                }
            });
        };
        $scope.getOneSport($stateParams.id);
        $scope.leagueKnockoutSports = function (constraints) {
            $scope.sports = [];
            NavigationService.leagueKnockoutSports(constraints, function (response) {
                if (response.value) {
                    $scope.sports = _.chain(response.data)
                        .groupBy("year")
                        .toPairs()
                        .map(function (currentItem) {
                            return _.zipObject(["year", "sports"], currentItem);
                        })
                        .value();
                    _.each($scope.sports, function (key) {
                        key.sports = _.chain(key.sports)
                            .groupBy("agegroup.name")
                            .toPairs()
                            .map(function (currentItem) {
                                return _.zipObject(["agegroup", "sports"], currentItem);
                            })
                            .value();

                    });
                    console.log($scope.sports);
                }
            });
        };
    })
    .controller('heatSportCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("heat-sport");
        $scope.menutitle = NavigationService.makeactive("Heat");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.getOneSport = function (id) {
            NavigationService.getOneSportList(id, function (response) {
                if (response.value) {
                    $scope.sportSelected = response.data;
                    $scope.heatSports($stateParams);
                }
            });
        };
        $scope.getOneSport($stateParams.id);
        $scope.heatSports = function (constraints) {
            $scope.sports = [];
            NavigationService.heatSports(constraints, function (response) {
                if (response.value) {
                    $scope.sports = _.chain(response.data)
                        .groupBy("year")
                        .toPairs()
                        .map(function (currentItem) {
                            return _.zipObject(["year", "sports"], currentItem);
                        })
                        .value();
                    _.each($scope.sports, function (key) {
                        key.sports = _.chain(key.sports)
                            .groupBy("agegroup.name")
                            .toPairs()
                            .map(function (currentItem) {
                                return _.zipObject(["agegroup", "sports"], currentItem);
                            }).value();
                        _.each(key.sports, function (iteratee) {
                            iteratee.sports = _.chain(iteratee.sports)
                                .groupBy("gender")
                                .toPairs()
                                .map(function (currentItem) {
                                    return _.zipObject(["gender", "sports"], currentItem);
                                }).value();
                        });
                    });
                    console.log($scope.sports);
                }
            });
        };

    })

    .controller('createStudentCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createstudent");
        $scope.menutitle = NavigationService.makeactive("Students");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.pageName = "Create Student";
        $scope.create = true;
        $scope.student = {};
        $scope.student.hours = "1";
        $scope.student.minutes = "1";
        $scope.student.timer = "am";
        $scope.hours = _.times(13, String);
        $scope.minutes = _.times(60, String);
        $scope.hours.shift();
        $scope.timer = ["am", "pm"];
        $scope.via = ["via School", "Individual"];
        $scope.payment = ["", "Paid", "Unpaid"];
        $scope.student.via = "via School";
        $scope.validateError = {};
        $scope.validateError.valid = false;

        NavigationService.getLastStudentId(function (data) {
            console.log(data);
            if (data.value !== false) {
                $scope.student.sfaid = data.data;
            }
        });

        // NavigationService.getSchoolList(function(data) {
        //     if (data.value !== false) {
        //         $scope.schools = data.data;
        //     }
        // });

        $scope.getSchools = function (search) {

            var obj = {};
            obj.search = search;
            if (isNaN(search)) {
                obj.search = search;
                obj.sfaid = undefined;
            } else {
                obj.search = undefined;
                obj.sfaid = parseInt(search);
            }
            NavigationService.getSchoolLimited(obj, function (data) {
                if (data && data.value !== false) {
                    $scope.schools = data.data;
                } else {
                    $scope.schools = [];
                }
            });

        };
        $scope.checkStud = function () {
            if ($scope.student.school && !_.isEmpty($scope.student.school) && $scope.student.lastname && $scope.student.firstname) {
                $scope.validateError.valid = false;
                $scope.findStudObj = _.cloneDeep($scope.student);
                $scope.findStudObj.school = $scope.findStudObj.school._id;
                NavigationService.findStud($scope.findStudObj, function (data) {
                    if (data.value !== false) {
                        console.log(data.data);
                        $.jStorage.set("showstudent", data.data);
                        window.open(openTab);
                    } else {
                        $scope.validateError.valid = true;
                        $scope.validateError.message = "Student Was Not Found";
                        $timeout(function () {
                            $scope.validateError.valid = false;
                        }, 3000);
                    }
                });
            } else {
                console.log('test');
                $scope.validateError.valid = true;
                $scope.validateError.message = "Please enter required fields for checking.";
                $timeout(function () {
                    $scope.validateError.valid = false;
                }, 3000);
            }
        };
        $scope.showError = false;
        $scope.errorContact = false;
        $scope.errorEmail = false;
        $scope.errorSportContact = false;
        $scope.saveStudent = function () {

            function checkContact() {
                $scope.student.contact = $scope.student.contact.toString();
                var split = $scope.student.contact.split(",");
                for (var i = 0; i < split.length; i++) {
                    if (split[i].length != 10) {
                        $scope.errorContact = true;
                        break;
                    } else {
                        $scope.errorContact = false;
                    }
                }
            }

            function checkEmail() {
                var splitEmail = $scope.student.email.split(",");
                for (var i = 0; i < splitEmail.length; i++) {
                    var x = splitEmail[i];
                    var atpos = x.indexOf("@");
                    var dotpos = x.lastIndexOf(".");
                    if (atpos <= 1 || dotpos <= atpos + 2 || dotpos + 2 >= x.length) {
                        $scope.errorEmail = true;
                        break;
                    } else {
                        $scope.errorEmail = false;
                    }
                }
            }

            function callSave() {
                NavigationService.saveStudent($scope.student, function (data) {
                    if (data.value !== false) {
                        $scope.showError = false;
                        $state.go('student');
                    }
                });
            }

            if ($scope.student.email) {
                checkEmail();
            } else {
                $scope.errorEmail = false;
            }
            if ($scope.student.contact) {
                checkContact();
            } else {
                $scope.errorContact = false;
            }
            if ($scope.errorContact === false && $scope.errorEmail === false) {
                console.log($scope.student);
                callSave();
            } else {
                $scope.showError = true;
                $timeout(function () {
                    $scope.showError = false;
                }, 3000);
            }
        };
    })
    .controller('createTeamCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createteam");
        $scope.menutitle = NavigationService.makeactive("Teams");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.team = {};
        $scope.team.playersArray = [];
        // $scope.team.captain = [];
        // $scope.team.agegroup = {};
        $scope.dropdowns = {};
        $scope.minValid = false;
        $scope.forSimilarNamesBackend = function () {
            $scope.dropdowns.teams = [];
            NavigationService.forSimilarNamesBackend({
                name: $scope.team.name
            }, function (response) {
                if (response.value) {
                    $scope.dropdowns.teams = response.data;
                } else {
                    $scope.dropdowns.teams = [];
                }
            });
        };
        // NavigationService.getStudentList(function(data) {
        //     if (data.value !== false) {
        //         $scope.students = data.data;
        //     }
        // });

        $scope.setTeamName = function (teamName) {
            $scope.team.name = teamName;
        };
        NavigationService.getSchoolList(function (data) {
            if (data.value !== false) {
                $scope.schools = data.data;
            }
        });
        $scope.callme = function () {
            console.log("called me");
            console.log($scope.team.year);
            if ($scope.team.year && $scope.team.school && $scope.team.school._id) {
                console.log("team.year");
                NavigationService.getSchoolSports($scope.team.year.toString(), $scope.team.school._id, function (data2) {
                    console.log(data2);
                    $scope.sportsList = data2.data;
                });
            }
        };
        $scope.teamNameGenerate = function () {
            $scope.team.name = '';
            if ($scope.team.school) {
                $scope.team.name += $scope.team.school.name;
            }
            if ($scope.team.sport) {
                $scope.team.name += " " + $scope.team.sport.name;
            }
            if ($scope.team.gender !== undefined && $scope.team.gender !== null) {
                $scope.team.name += " " + $scope.team.gender;
            }
            if ($scope.team.category !== undefined && $scope.team.category.name !== null) {
                $scope.team.name += " " + $scope.team.category.name;
            }
            if ($scope.team.agegroup) {
                $scope.team.name += " " + $scope.team.agegroup.name;
            }
            $scope.forSimilarNamesBackend();
        };
        $scope.sportSelected = function () {
            $scope.team.name = $scope.team.school.name + $scope.team;
            $scope.teamNameGenerate();
            NavigationService.filterCategory($scope.team.sport, function (data) {
                if (data) {
                    console.log(data);
                    $scope.firstcategories = data.data[0].firstcategory;
                    console.log($scope.firstcategories);
                }
            });
        };
        $scope.getCaptain = function (search) {
            console.log(search.length);
            $scope.students = [];


            var obj = {};
            obj.search = search;
            if (isNaN(search)) {
                obj.search = search;
                obj.sfaid = undefined;
            } else {
                obj.search = undefined;
                obj.sfaid = parseInt(search);
            }
            obj.school = $scope.team.school._id;

            NavigationService.findForDropSingle(obj, function (data) {
                if (data && data.value !== false) {
                    $scope.students = data.data;
                    console.log($scope.students);
                } else {
                    $scope.students = [];
                }
            });

        };
        $scope.addPlayer = function (selected) {

            $scope.team.playersArray.push(selected);
            console.log($scope.team.playersArray);
        };
        $scope.getOneSport = function (sport) {
            NavigationService.getOneSport(sport, function (data) {
                if (data.value !== false) {
                    $scope.sport = data.data;
                }
            });
        };
        $scope.getPlayers = function (search) {

            var obj = {};
            obj.search = search;
            if (isNaN(search)) {
                obj.search = search;
                obj.sfaid = undefined;
            } else {
                obj.search = undefined;
                obj.sfaid = parseInt(search);
            }
            obj.student = $scope.team.playersArray;
            obj.school = $scope.team.school._id;
            NavigationService.getStudentBySchool(obj, function (data) {
                if (data && data.value !== false) {
                    $scope.players = data.data;
                } else {
                    $scope.players = [];
                }
            });

        };

        NavigationService.getAllAgeGroup(function (data) {
            if (data.value) {
                $scope.agegroups = data.data;
            }
        });
        $scope.getMinMaxForTeam = function () {
            console.log($scope.team);
            var minmaxforteam = {};
            $scope.teamNameGenerate();
            if ($scope.team.category) {
                minmaxforteam = {
                    "sport": $scope.team.sport._id,
                    "category": $scope.team.category._id,
                    "agegroup": $scope.team.agegroup._id,
                    "gender": $scope.team.gender
                };
            } else {
                minmaxforteam = {
                    "sport": $scope.team.sport._id,
                    "agegroup": $scope.team.agegroup._id,
                    "gender": $scope.team.gender
                };
            }
            NavigationService.getMinMaxForTeam(minmaxforteam, function (data) {
                if (data.value) {
                    if (data.data) {
                        $scope.sport = data.data[0];
                    }
                } else {

                }
            });
        };

        $scope.savePlayer = function (data, select) {
            if ($scope.team.playersArray.length < $scope.sport.minPlayers) {
                $scope.minValid = true;
            } else {
                $scope.minValid = false;
            }
        };

        $scope.checkTeam = function () {
            console.log($scope.team);
            if (!$scope.minValid) {
                $scope.team.players = _.map($scope.team.playersArray, function (key) {
                    return key._id;
                });
                var request = {};
                if ($scope.team.category) {
                    request = {
                        category: $scope.team.category._id,
                        school: $scope.team.school._id,
                        sport: $scope.team.sport._id,
                        players: $scope.team.players,
                        agegroup: $scope.team.agegroup._id,
                        gender: $scope.team.gender,
                        name: $scope.team.name,
                        coach: $scope.team.coach,
                        captain: $scope.team.captain._id,
                        year: $scope.team.year
                    };
                } else {
                    request = {
                        school: $scope.team.school._id,
                        sport: $scope.team.sport._id,
                        players: $scope.team.players,
                        agegroup: $scope.team.agegroup._id,
                        gender: $scope.team.gender,
                        name: $scope.team.name,
                        coach: $scope.team.coach,
                        captain: $scope.team.captain._id,
                        year: $scope.team.year
                    };
                }
                NavigationService.saveTeam(request, function (data) {
                    if (data.value) {
                        $state.go('team');
                    } else {

                    }
                });
            } else {

            }
        };
        $scope.showError = false;
        $scope.errorContact = false;
        $scope.errorEmail = false;
        $scope.errorSportContact = false;

    })
    .controller('createKnockoutCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $uibModal, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createknockout");
        $scope.menutitle = NavigationService.makeactive("Knockout");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.knockout = {};
        $scope.knockout.roundno = 0;
        $scope.statuses = {};
        $scope.statuses.inedit = false;
        $scope.knockout.event = "Knockout";
        $scope.sportSelected = function () {

        };
        $scope.sportid = $stateParams.sportid;
        if ($stateParams.sportid) {
            NavigationService.getOneSport($stateParams.sportid, function (response) {
                if (response.value) {
                    $scope.knockout.sport = response.data;
                    $scope.knockout.year = response.data.year;
                }
            });
        }

        $scope.addNoMatch = function (participantType, model) {
            if (participantType == 'player') {
                NavigationService.getOneStudentByName({
                    name: "No Match "
                }, function (response) {
                    if (response.value) {
                        $scope.knockout[model] = response.data;
                    }
                });
            } else {
                NavigationService.getOneTeamByName({
                    name: "No Match "
                }, function (response) {
                    if (response.value) {
                        $scope.knockout[model] = response.data;
                    }
                });
            }
        };
        NavigationService.getLastKnockout({}, function (response) {
            if (response.value) {
                $scope.knockout.matchid = response.data + 1;
            }
        });
        $scope.getSportsByYear = function () {
            $scope.sportsList = [];

            NavigationService.getSportsByYear($scope.knockout, function (response) {
                if (response.value) {
                    $scope.sportsList = response.data;
                } else {
                    $scope.sportsList = [];
                }
            });
        };
        $scope.getLastOrder = function () {
            var constraints = {};
            constraints = {
                "year": $scope.knockout.year,
                "sport": $scope.knockout.sport._id,
                "participantType": $scope.knockout.participantType,
                "event": $scope.knockout.event,
                "roundno": $scope.knockout.roundno
            };
            NavigationService.getLastOrder(constraints, function (response) {
                if (response.value) {
                    $scope.knockout.order = parseInt(response.data) + 1;
                } else {
                    $scope.knockout.order = 0;
                }
            });
        };
        $scope.getParticipants = function () {
            if ($scope.knockout.year && $scope.knockout.participantType && $scope.knockout.sport && $scope.knockout.sport._id) {
                if ($scope.knockout.participantType == "player") {
                    $scope.getKnockoutPlayer("");
                } else {
                    $scope.getKnockoutTeam("");
                }
            }
        };
        $scope.getKnockoutPlayer = function (search) {
            $scope.students = [];
            var constraints = {};
            constraints.search = search;
            if (isNaN(search) || search === null || search === undefined || search === "") {
                constraints.search = search;
                constraints.sfaid = undefined;
            } else {
                constraints.search = undefined;
                constraints.sfaid = parseInt(search);
            }
            if ($scope.knockout.sport) {
                constraints.sport = $scope.knockout.sport.sportslist._id;
            }
            if ($scope.knockout.sport.gender) {
                constraints.gender = $scope.knockout.sport.gender;
            }
            constraints.year = $scope.knockout.year.toString();
            NavigationService.getStudentsbySport(constraints, function (data) {
                if (data && data.value !== false) {
                    $scope.students = data.data;
                } else {
                    $scope.students = [];
                }
            });
        };
        $scope.getKnockoutTeam = function (search) {
            $scope.teams = [];
            var constraints = {};
            constraints.search = search;
            if (isNaN(search) || search === null || search === undefined || search === "") {
                constraints.search = search;
                constraints.sfaid = undefined;
            } else {
                constraints.search = undefined;
                constraints.sfaid = parseInt(search);
            }
            if ($scope.knockout.sport) {
                constraints.sport = $scope.knockout.sport.sportslist._id;
                // constraints.agegroup = $scope.knockout.sport.agegroup;
            }
            if ($scope.knockout.sport.gender) {
                constraints.gender = $scope.knockout.sport.gender;
            }
            constraints.year = $scope.knockout.year.toString();
            console.log(constraints);
            NavigationService.getTeamsbySport(constraints, function (data) {
                if (data && data.value !== false) {
                    $scope.teams = data.data;
                } else {
                    $scope.teams = [];
                }
            });
        };
        $scope.submitKnockout = function () {
            console.log($scope.knockout);
            var request = {};
            request = $scope.knockout;
            request.sport = $scope.knockout.sport._id;
            if ($scope.knockout.participantType == "player") {
                if ($scope.knockout.player1) {
                    request.player1 = $scope.knockout.player1._id;
                }
                if ($scope.knockout.player2) {
                    request.player2 = $scope.knockout.player2._id;
                }
            } else {
                if ($scope.knockout.team1) {
                    request.team1 = $scope.knockout.team1._id;
                }
                if ($scope.knockout.team2) {
                    request.team2 = $scope.knockout.team2._id;
                }
            }
            request.year = $scope.knockout.year.toString();
            NavigationService.submitKnockout(request, function (data) {
                if (data.value) {
                    console.log({
                        id: request.sport
                    });
                    $state.go("viewknockout", {
                        id: request.sport
                    });
                } else {
                    //error
                }
            });
        };



    })
    .controller('createLeagueCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $uibModal, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createleague");
        $scope.menutitle = NavigationService.makeactive("League");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.league = {};
        $scope.statuses = {};
        $scope.statuses.inedit = false;
        $scope.sportid = $stateParams.sportid;
        if ($stateParams.sportid) {
            NavigationService.getOneSport($stateParams.sportid, function (response) {
                if (response.value) {
                    $scope.league.sport = response.data;
                    $scope.league.year = response.data.year;
                }
            });
        }
        $scope.addNoMatch = function (participantType, model) {
            if (participantType == 'player') {
                NavigationService.getOneStudentByName({
                    name: "No Match "
                }, function (response) {
                    if (response.value) {
                        $scope.league[model] = response.data;
                    }
                });
            } else {
                NavigationService.getOneTeamByName({
                    name: "No Match "
                }, function (response) {
                    if (response.value) {
                        $scope.league[model] = response.data;
                    }
                });
            }
        };
        NavigationService.getLastLeague({}, function (response) {
            if (response.value) {
                $scope.league.matchid = response.data + 1;
            }
        });
        $scope.getSportsByYear = function () {
            $scope.sportsList = [];

            NavigationService.getSportsByYear($scope.league, function (response) {
                if (response.value) {
                    $scope.sportsList = response.data;
                } else {
                    $scope.sportsList = [];
                }
            });
        };
        $scope.getLastOrder = function () {
            var constraints = {};
            constraints = {
                "year": $scope.league.year,
                "sport": $scope.league.sport._id,
                "participantType": $scope.league.participantType,
                "event": $scope.league.event,
                "roundno": $scope.league.roundno
            };
            NavigationService.getLastOrder(constraints, function (response) {
                if (response.value) {
                    $scope.league.order = parseInt(response.data) + 1;
                } else {
                    $scope.league.order = 0;
                }
            });
        };
        $scope.getParticipants = function () {
            if ($scope.league.year && $scope.league.participantType && $scope.league.sport && $scope.league.sport._id) {
                if ($scope.league.participantType == "player") {
                    $scope.getLeaguePlayer("");
                } else {
                    $scope.getLeagueTeam("");
                }
            }
        };
        $scope.getLeaguePlayer = function (search) {
            $scope.students = [];
            var constraints = {};
            constraints.search = search;
            if (isNaN(search) || search === null || search === undefined || search === "") {
                constraints.search = search;
                constraints.sfaid = undefined;
            } else {
                constraints.search = undefined;
                constraints.sfaid = parseInt(search);
            }
            if ($scope.league.sport) {
                constraints.sport = $scope.league.sport.sportslist._id;
            }
            if ($scope.league.sport.gender) {
                constraints.gender = $scope.league.sport.gender;
            }
            constraints.year = $scope.league.year.toString();
            NavigationService.getStudentsbySport(constraints, function (data) {
                if (data && data.value !== false) {
                    $scope.students = data.data;
                } else {
                    $scope.students = [];
                }
            });
        };
        $scope.getLeagueTeam = function (search) {
            $scope.teams = [];
            var constraints = {};
            constraints.search = search;
            if (isNaN(search) || search === null || search === undefined || search === "") {
                constraints.search = search;
                constraints.sfaid = undefined;
            } else {
                constraints.search = undefined;
                constraints.sfaid = parseInt(search);
            }
            if ($scope.league.sport) {
                constraints.sport = $scope.league.sport.sportslist._id;
                constraints.agegroup = $scope.league.sport.agegroup;
            }
            if ($scope.league.sport.gender) {
                constraints.gender = $scope.league.sport.gender;
            }
            constraints.year = $scope.league.year.toString();
            NavigationService.getTeamsbySport(constraints, function (data) {
                if (data && data.value !== false) {
                    $scope.teams = data.data;
                } else {
                    $scope.teams = [];
                }
            });
        };
        $scope.submitLeague = function () {
            console.log($scope.league);
            var request = {};
            request = $scope.league;
            request.sport = $scope.league.sport._id;
            if ($scope.league.participantType == "player") {
                if ($scope.league.player1) {
                    request.player1 = $scope.league.player1._id;
                }
                if ($scope.league.player2) {
                    request.player2 = $scope.league.player2._id;
                }
            } else {
                if ($scope.league.team1) {
                    request.team1 = $scope.league.team1._id;
                }
                if ($scope.league.team2) {
                    request.team2 = $scope.league.team2._id;
                }
            }
            request.year = $scope.league.year.toString();
            NavigationService.submitLeague(request, function (data) {
                if (data.value) {
                    console.log({
                        id: request.sport
                    });
                    $state.go("viewleague", {
                        id: request.sport
                    });
                } else {
                    //error
                }
            });
        };



    })
    .controller('createLeagueKnockoutCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $uibModal, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createleagueknockout");
        $scope.menutitle = NavigationService.makeactive("League Knockout");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.leagueknockout = {};
        $scope.statuses = {};
        $scope.statuses.inedit = false;
        $scope.sportid = $stateParams.sportid;
        if ($stateParams.sportid) {
            NavigationService.getOneSport($stateParams.sportid, function (response) {
                if (response.value) {
                    $scope.leagueknockout.sport = response.data;
                    $scope.leagueknockout.year = response.data.year;
                }
            });
        }
        if ($stateParams.round) {
            $scope.leagueknockout.leagueknockoutround = $stateParams.round;
        }
        if ($stateParams.order) {
            $scope.leagueknockout.leagueknockoutorder = $stateParams.order;
        }
        $scope.getSportsByYear = function () {
            $scope.sportsList = [];

            NavigationService.getSportsByYear($scope.leagueknockout, function (response) {
                if (response.value) {
                    $scope.sportsList = response.data;
                } else {
                    $scope.sportsList = [];
                }
            });
        };
        $scope.getParticipants = function () {
            if ($scope.leagueknockout.year && $scope.leagueknockout.participantType && $scope.leagueknockout.sport && $scope.leagueknockout.sport._id) {
                if ($scope.leagueknockout.participantType == "player") {
                    $scope.getLeagueKnockoutPlayer("");
                } else {
                    $scope.getLeagueKnockoutTeam("");
                }
            }
        };
        $scope.getLeagueKnockoutPlayer = function (search) {
            $scope.students = [];
            var constraints = {};
            constraints.search = search;
            if (isNaN(search) || search === null || search === undefined || search === "") {
                constraints.search = search;
                constraints.sfaid = undefined;
            } else {
                constraints.search = undefined;
                constraints.sfaid = parseInt(search);
            }
            if ($scope.leagueknockout.sport) {
                constraints.sport = $scope.leagueknockout.sport.sportslist._id;
            }
            if ($scope.leagueknockout.sport.gender) {
                constraints.gender = $scope.leagueknockout.sport.gender;
            }
            constraints.year = $scope.leagueknockout.year.toString();
            NavigationService.getStudentsbySport(constraints, function (data) {
                if (data && data.value !== false) {
                    $scope.students = data.data;
                } else {
                    $scope.students = [];
                }
            });
        };
        $scope.getLeagueKnockoutTeam = function (search) {
            $scope.teams = [];
            var constraints = {};
            constraints.search = search;
            if (isNaN(search) || search === null || search === undefined || search === "") {
                constraints.search = search;
                constraints.sfaid = undefined;
            } else {
                constraints.search = undefined;
                constraints.sfaid = parseInt(search);
            }
            if ($scope.leagueknockout.sport) {
                constraints.sport = $scope.leagueknockout.sport.sportslist._id;
                constraints.agegroup = $scope.leagueknockout.sport.agegroup;
            }
            if ($scope.leagueknockout.sport.gender) {
                constraints.gender = $scope.leagueknockout.sport.gender;
            }
            constraints.year = $scope.leagueknockout.year.toString();
            NavigationService.getTeamsbySport(constraints, function (data) {
                if (data && data.value !== false) {
                    $scope.teams = data.data;
                } else {
                    $scope.teams = [];
                }
            });
        };
        $scope.submitLeagueKnockout = function () {
            console.log($scope.leagueknockout);
            var request = {};
            request = $scope.leagueknockout;
            request.sport = $scope.leagueknockout.sport._id;
            if ($scope.leagueknockout.participantType == "player") {
                if ($scope.leagueknockout.player1) {
                    request.player1 = $scope.leagueknockout.player1._id;
                }
                if ($scope.leagueknockout.player2) {
                    request.player2 = $scope.leagueknockout.player2._id;
                }
            } else {
                if ($scope.leagueknockout.team1) {
                    request.team1 = $scope.leagueknockout.team1._id;
                }
                if ($scope.leagueknockout.team2) {
                    request.team2 = $scope.leagueknockout.team2._id;
                }
            }
            request.year = $scope.leagueknockout.year.toString();
            NavigationService.submitLeagueKnockout(request, function (data) {
                if (data.value) {
                    console.log({
                        id: request.sport
                    });
                    $state.go("leagueknockoutaddround", {
                        id: request.sport
                    });
                } else {
                    //error
                }
            });
        };



    })
    .controller('editLeagueKnockoutCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $uibModal, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createleagueknockout");
        $scope.menutitle = NavigationService.makeactive("League Knockout");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.leagueknockout = {};
        $scope.statuses = {};
        $scope.statuses.inedit = false;
        $scope.sportid = $stateParams.sportid;
        if ($stateParams.sportid) {
            NavigationService.getOneSport($stateParams.sportid, function (response) {
                if (response.value) {
                    $scope.leagueknockout.sport = response.data;
                    $scope.leagueknockout.year = response.data.year;
                }
            });
        }
        if ($stateParams.round) {
            $scope.leagueknockout.leagueknockoutround = $stateParams.round;
        }
        if ($stateParams.order) {
            $scope.leagueknockout.leagueknockoutorder = $stateParams.order;
        }

        $scope.getSportsByYear = function () {
            $scope.sportsList = [];

            NavigationService.getSportsByYear($scope.leagueknockout, function (response) {
                if (response.value) {
                    $scope.sportsList = response.data;
                } else {
                    $scope.sportsList = [];
                }
            });
        };
        $scope.getParticipants = function () {
            if ($scope.leagueknockout.year && $scope.leagueknockout.participantType && $scope.leagueknockout.sport && $scope.leagueknockout.sport._id) {
                if ($scope.leagueknockout.participantType == "player") {
                    $scope.getLeagueKnockoutPlayer("");
                } else {
                    $scope.getLeagueKnockoutTeam("");
                }
            }
        };
        $scope.getLeagueKnockoutPlayer = function (search) {
            $scope.students = [];
            var constraints = {};
            constraints.search = search;
            if (isNaN(search) || search === null || search === undefined || search === "") {
                constraints.search = search;
                constraints.sfaid = undefined;
            } else {
                constraints.search = undefined;
                constraints.sfaid = parseInt(search);
            }
            if ($scope.leagueknockout.sport) {
                constraints.sport = $scope.leagueknockout.sport.sportslist._id;
            }
            if ($scope.leagueknockout.sport.gender) {
                constraints.gender = $scope.leagueknockout.sport.gender;
            }
            constraints.year = $scope.leagueknockout.year.toString();
            NavigationService.getStudentsbySport(constraints, function (data) {
                if (data && data.value !== false) {
                    $scope.students = data.data;
                } else {
                    $scope.students = [];
                }
            });
        };
        $scope.getLeagueKnockoutTeam = function (search) {
            $scope.teams = [];
            var constraints = {};
            constraints.search = search;
            if (isNaN(search) || search === null || search === undefined || search === "") {
                constraints.search = search;
                constraints.sfaid = undefined;
            } else {
                constraints.search = undefined;
                constraints.sfaid = parseInt(search);
            }
            if ($scope.leagueknockout.sport) {
                constraints.sport = $scope.leagueknockout.sport.sportslist._id;
                constraints.agegroup = $scope.leagueknockout.sport.agegroup;
            }
            if ($scope.leagueknockout.sport.gender) {
                constraints.gender = $scope.leagueknockout.sport.gender;
            }
            constraints.year = $scope.leagueknockout.year.toString();
            NavigationService.getTeamsbySport(constraints, function (data) {
                if (data && data.value !== false) {
                    $scope.teams = data.data;
                } else {
                    $scope.teams = [];
                }
            });
        };
        $scope.submitLeagueKnockout = function () {
            console.log($scope.leagueknockout);
            var request = {};
            request = $scope.leagueknockout;
            request.sport = $scope.leagueknockout.sport._id;
            if ($scope.leagueknockout.participantType == "player") {
                if ($scope.leagueknockout.player1) {
                    request.player1 = $scope.leagueknockout.player1._id;
                }
                if ($scope.leagueknockout.player2) {
                    request.player2 = $scope.leagueknockout.player2._id;
                }
            } else {
                if ($scope.leagueknockout.team1) {
                    request.team1 = $scope.leagueknockout.team1._id;
                }
                if ($scope.leagueknockout.team2) {
                    request.team2 = $scope.leagueknockout.team2._id;
                }
            }
            request.year = $scope.leagueknockout.year.toString();
            NavigationService.submitLeagueKnockout(request, function (data) {
                if (data.value) {
                    console.log({
                        id: request.sport
                    });
                    $state.go("leagueknockoutaddround", {
                        id: request.sport
                    });
                } else {
                    //error
                }
            });
        };

        if ($stateParams.id) {
            NavigationService.getOneLeagueKnockout($stateParams, function (response) {
                if (response.value) {
                    $scope.leagueknockout = response.data;
                    if ($scope.leagueknockout.date)
                        $scope.leagueknockout.date = new Date($scope.leagueknockout.date);
                    if ($scope.leagueknockout.startTime)
                        $scope.leagueknockout.startTime = new Date($scope.leagueknockout.startTime);
                    if ($scope.leagueknockout.endTime)
                        $scope.leagueknockout.endTime = new Date($scope.leagueknockout.endTime);
                    // $scope.getParticipants();
                    $scope.getLeagueKnockoutPlayer("");
                } else {

                }
            });
        }

    })

    .controller('editLeagueCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $uibModal, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createleague");
        $scope.menutitle = NavigationService.makeactive("League");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.league = {};
        $scope.statuses = {};
        $scope.statuses.inedit = true;
        $scope.sportid = $stateParams.sportid;
        if ($stateParams.sportid) {
            NavigationService.getOneSport($stateParams.sportid, function (response) {
                if (response.value) {
                    $scope.league.sport = response.data;
                    $scope.league.year = response.data.year;
                }
            });
        }
        $scope.addNoMatch = function (participantType, model) {
            if (participantType == 'player') {
                NavigationService.getOneStudentByName({
                    name: "No Match "
                }, function (response) {
                    if (response.value) {
                        $scope.league[model] = response.data;
                    }
                });
            } else {
                NavigationService.getOneTeamByName({
                    name: "No Match "
                }, function (response) {
                    if (response.value) {
                        $scope.league[model] = response.data;
                    }
                });
            }
        };
        NavigationService.getLastLeague({}, function (response) {
            if (response.value) {
                $scope.league.matchid = response.data + 1;
            }
        });
        $scope.getSportsByYear = function () {
            $scope.sportsList = [];

            NavigationService.getSportsByYear($scope.league, function (response) {
                if (response.value) {
                    $scope.sportsList = response.data;
                } else {
                    $scope.sportsList = [];
                }
            });
        };
        $scope.getLastOrder = function () {
            var constraints = {};
            constraints = {
                "year": $scope.league.year,
                "sport": $scope.league.sport._id,
                "participantType": $scope.league.participantType,
                "event": $scope.league.event,
                "roundno": $scope.league.roundno
            };
            NavigationService.getLastOrder(constraints, function (response) {
                if (response.value) {
                    $scope.league.order = parseInt(response.data) + 1;
                } else {
                    $scope.league.order = 0;
                }
            });
        };
        $scope.getParticipants = function () {
            if ($scope.league.year && $scope.league.participantType && $scope.league.sport && $scope.league.sport._id) {
                if ($scope.league.participantType == "player") {
                    $scope.getLeaguePlayer("");
                } else {
                    $scope.getLeagueTeam("");
                }
            }
        };
        $scope.getLeaguePlayer = function (search) {
            $scope.students = [];
            var constraints = {};
            constraints.search = search;
            if (isNaN(search) || search === null || search === undefined || search === "") {
                constraints.search = search;
                constraints.sfaid = undefined;
            } else {
                constraints.search = undefined;
                constraints.sfaid = parseInt(search);
            }
            if ($scope.league.sport) {
                constraints.sport = $scope.league.sport.sportslist._id;
                constraints.agegroup = $scope.league.sport.agegroup;
            }
            if ($scope.league.sport.gender) {
                constraints.gender = $scope.league.sport.gender;
            }
            constraints.year = $scope.league.year.toString();
            NavigationService.getStudentsbySport(constraints, function (data) {
                if (data && data.value !== false) {
                    $scope.students = data.data;
                } else {
                    $scope.students = [];
                }
            });
        };
        $scope.getLeagueTeam = function (search) {
            $scope.teams = [];
            var constraints = {};
            constraints.search = search;
            if (isNaN(search) || search === null || search === undefined || search === "") {
                constraints.search = search;
                constraints.sfaid = undefined;
            } else {
                constraints.search = undefined;
                constraints.sfaid = parseInt(search);
            }
            if ($scope.league.sport) {
                constraints.sport = $scope.league.sport.sportslist._id;
            }
            if ($scope.league.sport.gender) {
                constraints.gender = $scope.league.sport.gender;
            }
            constraints.year = $scope.league.year.toString();
            NavigationService.getTeamsbySport(constraints, function (data) {
                if (data && data.value !== false) {
                    $scope.teams = data.data;
                } else {
                    $scope.teams = [];
                }
            });
        };
        $scope.submitLeague = function () {
            console.log($scope.league);
            var request = {};
            request = $scope.league;
            request.sport = $scope.league.sport._id;
            if ($scope.league.participantType == "player") {
                if ($scope.league.player1) {
                    request.player1 = $scope.league.player1._id;
                }
                if ($scope.league.player2) {
                    request.player2 = $scope.league.player2._id;
                }
            } else {
                if ($scope.league.team1) {
                    request.team1 = $scope.league.team1._id;
                }
                if ($scope.league.team2) {
                    request.team2 = $scope.league.team2._id;
                }
            }
            request.year = $scope.league.year.toString();
            NavigationService.submitLeague(request, function (data) {
                if (data.value) {
                    console.log({
                        id: request.sport
                    });
                    $state.go("viewleague", {
                        id: request.sport
                    });
                } else {
                    //error
                }
            });
        };
        if ($stateParams.id) {
            NavigationService.getOneLeague($stateParams, function (response) {
                if (response.value) {
                    $scope.league = response.data;
                    if ($scope.league.date)
                        $scope.league.date = new Date($scope.league.date);
                    if ($scope.league.startTime)
                        $scope.league.startTime = new Date($scope.league.startTime);
                    if ($scope.league.endTime)
                        $scope.league.endTime = new Date($scope.league.endTime);
                    // $scope.getParticipants();
                    $scope.getLeaguePlayer("");
                } else {

                }
            });
        }


    })
    .controller('createMedalCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $uibModal, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createmedal");
        $scope.menutitle = NavigationService.makeactive("Knockout");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.medal = {};
        $scope.statuses = {};
        $scope.statuses.inedit = false;
        $scope.sportSelected = function () {

        };
        $scope.sportid = $stateParams.sportid;
        if ($stateParams.sportid) {
            NavigationService.getOneSport($stateParams.sportid, function (response) {
                if (response.value) {
                    $scope.medal.sport = response.data;
                    console.log($scope.medal);
                    $scope.medal.year = response.data.year;
                    console.log($scope.medal);
                }
            });
        }



        $scope.getParticipants = function () {
            if ($scope.medal.year && $scope.medal.participantType && $scope.medal.sport && $scope.medal.sport._id) {
                if ($scope.medal.participantType == "player") {
                    $scope.getMedalPlayer("");
                } else {
                    $scope.getMedalTeam("");
                }
            }
        };
        $scope.getMedalPlayer = function (search) {
            $scope.students = [];
            var constraints = {};
            constraints.search = search;
            if (isNaN(search) || search === null || search === undefined || search === "") {
                constraints.search = search;
                constraints.sfaid = undefined;
            } else {
                constraints.search = undefined;
                constraints.sfaid = parseInt(search);
            }
            if ($scope.medal.sport) {
                constraints.sport = $scope.medal.sport.sportslist._id;
            }
            if ($scope.medal.sport.gender) {
                constraints.gender = $scope.medal.sport.gender;
            }
            constraints.year = $scope.medal.year.toString();
            NavigationService.getStudentsbySport(constraints, function (data) {
                if (data && data.value !== false) {
                    $scope.students = data.data;
                } else {
                    $scope.students = [];
                }
            });
        };
        $scope.getMedalTeam = function (search) {
            $scope.teams = [];
            var constraints = {};
            constraints.search = search;
            if (isNaN(search) || search === null || search === undefined || search === "") {
                constraints.search = search;
                constraints.sfaid = undefined;
            } else {
                constraints.search = undefined;
                constraints.sfaid = parseInt(search);
            }
            if ($scope.medal.sport) {
                constraints.sport = $scope.medal.sport.sportslist._id;
                // constraints.agegroup = $scope.medal.sport.agegroup;
            }
            if ($scope.medal.sport.gender) {
                constraints.gender = $scope.medal.sport.gender;
            }
            constraints.year = $scope.medal.year.toString();
            console.log(constraints);
            NavigationService.getTeamsbySport(constraints, function (data) {
                if (data && data.value !== false) {
                    $scope.teams = data.data;
                } else {
                    $scope.teams = [];
                }
            });
        };
        $scope.submitMedal = function () {
            console.log($scope.medal);
            var request = {};
            request = $scope.medal;
            if ($scope.medal.sport) {
                console.log($scope.medal.sport);
                request.sport = $scope.medal.sport._id;

            }
            if ($scope.medal.participantType == 'player') {
                request.player = $scope.medal.player._id;
            } else {
                request.team = $scope.medal.team._id;
            }
            console.log(request);
            NavigationService.submitMedal(request, function (data) {
                if (data.value) {
                    console.log({
                        id: request.sport
                    });
                    $state.go("viewmedal", {
                        id: request.sport
                    });
                } else {
                    //error
                }
            });
        };



    })
    .controller('editHeatCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $uibModal, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createheat");
        $scope.menutitle = NavigationService.makeactive("Heats");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.heat = {};
        $scope.heat.roundno = 0;
        $scope.statuses = {};
        $scope.statuses.inedit = false;
        $scope.heat.event = "Heats";
        $scope.heat.heats = [];
        $scope.sportid = $stateParams.sportid;
        $scope.addParticipant = function () {
            $scope.heat.heats.push({});
        };
        $scope.getSportsByYearHeat = function () {
            $scope.sportsList = [];

            NavigationService.getSportsByYearHeat($scope.heat, function (response) {
                if (response.value) {
                    $scope.sportsList = response.data;
                } else {
                    $scope.sportsList = [];
                }
            });
        };

        if ($stateParams.round) {
            $scope.heat.round = $stateParams.round;
        }
        if ($stateParams.order) {
            $scope.heat.order = $stateParams.order;
            console.log($scope.heat.order);
            console.log(parseInt($scope.heat.order));
        }
        $scope.getHeatTeam = function (search) {
            $scope.teams = [];
            var constraints = {};
            constraints.search = search;
            if (isNaN(search) || search === null || search === undefined || search === "") {
                constraints.search = search;
                constraints.sfaid = undefined;
            } else {
                constraints.search = undefined;
                constraints.sfaid = parseInt(search);
            }
            if ($scope.heat.sport) {
                constraints.sport = $scope.heat.sport.sportslist._id;
                // constraints.agegroup = $scope.heat.sport.agegroup;
            }
            if ($scope.heat.sport.gender) {
                constraints.gender = $scope.heat.sport.gender;
            }
            constraints.year = $scope.heat.year.toString();
            console.log(constraints);
            NavigationService.getTeamsbySport(constraints, function (data) {
                if (data && data.value !== false) {
                    $scope.teams = data.data;
                } else {
                    $scope.teams = [];
                }
            });
        };

        $scope.getHeatPlayer = function (search) {
            $scope.students = [];
            var constraints = {};
            constraints.search = search;
            if (isNaN(search) || search === null || search === undefined || search === "") {
                constraints.search = search;
                constraints.sfaid = undefined;
            } else {
                constraints.search = undefined;
                constraints.sfaid = parseInt(search);
            }
            if ($scope.heat.sport) {
                constraints.sport = $scope.heat.sport.sportslist._id;
            }
            if ($scope.heat.sport.gender) {
                constraints.gender = $scope.heat.sport.gender;
            }
            constraints.year = $scope.heat.year.toString();
            NavigationService.getStudentsbySport(constraints, function (data) {
                if (data && data.value !== false) {
                    $scope.students = data.data;
                } else {
                    $scope.students = [];
                }
            });
        };
        $scope.submitHeat = function () {
            console.log($scope.heat);
            var request = $scope.heat;
            request.sport = $scope.heat.sport._id;

            request.heats = _.map(request.heats, function (key) {
                console.log(key);
                key[request.participantType] = key[request.participantType]._id;
                return key;
            });
            NavigationService.saveHeat(request, function (response) {
                if (response.value) {
                    $state.go('heataddround', {
                        id: request.sport
                    });
                } else {
                    // do nothing
                }
            });
        };
        if ($stateParams.id) {
            NavigationService.getOneHeat($stateParams, function (response) {
                if (response.value) {
                    $scope.heat = response.data;
                    // NavigationService.getOneSport($stateParams.sportid,function (response) {
                    //   if(response.value){
                    //     $scope.heat.sport = response.data;
                    //     $scope.heat.year = response.data.year;
                    //     $scope.getSportsByYearHeat();
                    //   }
                    // });
                    if ($scope.heat.date) {
                        $scope.heat.date = new Date($scope.heat.date);
                    }
                } else {

                }
            });
        }

    })
    .controller('createHeatCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $uibModal, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createheat");
        $scope.menutitle = NavigationService.makeactive("Heats");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.heat = {};
        $scope.heat.roundno = 0;
        $scope.statuses = {};
        $scope.statuses.inedit = false;
        $scope.heat.event = "Heats";
        $scope.heat.heats = [];
        $scope.sportid = $stateParams.sportid;
        $scope.addParticipant = function () {
            $scope.heat.heats.push({});
        };
        // $scope.getSportsByYearHeat = function() {
        //     $scope.sportsList = [];
        //
        //     NavigationService.getSportsByYearHeat($scope.heat, function(response) {
        //         if (response.value) {
        //             $scope.sportsList = response.data;
        //         } else {
        //             $scope.sportsList = [];
        //         }
        //     });
        // };
        if ($stateParams.sportid) {
            NavigationService.getOneSport($stateParams.sportid, function (response) {
                if (response.value) {
                    $scope.heat.sport = response.data;
                    $scope.heat.year = response.data.year;
                    // $scope.getSportsByYearHeat();
                    // for (var i = 0; i < 8; i++) {
                    //     $scope.heat.heats.push({});
                    // }
                    console.log($scope.heat.heats);
                }
            });
        }
        if ($stateParams.round) {
            $scope.heat.round = $stateParams.round;
        }
        if ($stateParams.order) {
            $scope.heat.order = $stateParams.order;
            console.log($scope.heat.order);
            console.log(parseInt($scope.heat.order));
        }
        $scope.getHeatTeam = function (search) {
            $scope.teams = [];
            var constraints = {};
            constraints.search = search;
            if (isNaN(search) || search === null || search === undefined || search === "") {
                constraints.search = search;
                constraints.sfaid = undefined;
            } else {
                constraints.search = undefined;
                constraints.sfaid = parseInt(search);
            }
            if ($scope.heat.sport) {
                constraints.sport = $scope.heat.sport.sportslist._id;
                // constraints.agegroup = $scope.heat.sport.agegroup;
            }
            if ($scope.heat.sport.gender) {
                constraints.gender = $scope.heat.sport.gender;
            }
            constraints.year = $scope.heat.year.toString();
            console.log(constraints);
            NavigationService.getTeamsbySport(constraints, function (data) {
                if (data && data.value !== false) {
                    $scope.teams = data.data;
                } else {
                    $scope.teams = [];
                }
            });
        };

        $scope.getHeatPlayer = function (search) {
            $scope.students = [];
            var constraints = {};
            constraints.search = search;
            if (isNaN(search) || search === null || search === undefined || search === "") {
                constraints.search = search;
                constraints.sfaid = undefined;
            } else {
                constraints.search = undefined;
                constraints.sfaid = parseInt(search);
            }
            if ($scope.heat.sport) {
                constraints.sport = $scope.heat.sport.sportslist._id;
            }
            if ($scope.heat.sport.gender) {
                constraints.gender = $scope.heat.sport.gender;
            }
            constraints.year = $scope.heat.year.toString();
            NavigationService.getStudentsbySport(constraints, function (data) {
                if (data && data.value !== false) {
                    $scope.students = data.data;
                } else {
                    $scope.students = [];
                }
            });
        };
        $scope.submitHeat = function () {
            console.log($scope.heat);
            var request = $scope.heat;
            request.sport = $scope.heat.sport._id;

            request.heats = _.map(request.heats, function (key) {
                console.log(key);
                key[request.participantType] = key[request.participantType]._id;
                return key;
            });
            NavigationService.saveHeat(request, function (response) {
                if (response.value) {
                    $state.go('heataddround', {
                        id: request.sport
                    });
                } else {
                    // do nothing
                }
            });
        };

    })
    .controller('createSwissLeagueCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $uibModal, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createswissleague");
        $scope.menutitle = NavigationService.makeactive("Swiss League");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.swissleague = {};
        $scope.swissleague.roundno = 0;
        $scope.statuses = {};
        $scope.statuses.inedit = false;
        $scope.swissleague.event = "Swiss League";
        $scope.sportid = $stateParams.sportid;
        if ($stateParams.sportid) {
            NavigationService.getOneSport($stateParams.sportid, function (response) {
                if (response.value) {
                    $scope.swissleague.sport = response.data;
                    $scope.swissleague.year = response.data.year;
                }
            });
        }

        $scope.getSwissLeaguePlayer = function (search) {
            $scope.students = [];
            var constraints = {};
            constraints.search = search;
            if (isNaN(search) || search === null || search === undefined || search === "") {
                constraints.search = search;
                constraints.sfaid = undefined;
            } else {
                constraints.search = undefined;
                constraints.sfaid = parseInt(search);
            }
            if ($scope.swissleague.sport) {
                constraints.sport = $scope.swissleague.sport.sportslist._id;
            }
            if ($scope.swissleague.sport.gender) {
                constraints.gender = $scope.swissleague.sport.gender;
            }
            constraints.year = $scope.swissleague.year.toString();
            console.log(constraints);
            NavigationService.getStudentsbySport(constraints, function (data) {
                if (data && data.value !== false) {
                    $scope.students = data.data;
                } else {
                    $scope.students = [];
                }
            });
        };
        $scope.submitSwissLeague = function () {
            console.log($scope.swissleague);
            var request = $scope.swissleague;
            request.sport = $scope.swissleague.sport._id;
            if ($scope.swissleague.player1) {
                request.player1 = $scope.swissleague.player1._id;
            }
            if ($scope.swissleague.player2) {
                request.player2 = $scope.swissleague.player2._id;
            }
            NavigationService.saveSwissLeague(request, function (response) {
                if (response.value) {
                    $state.go('swissaddround', {
                        id: request.sport
                    });
                } else {
                    // do nothing
                }
            });
        };

    })
    .controller('createQualifyingRoundCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $uibModal, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createqualifyinground");
        $scope.menutitle = NavigationService.makeactive("Qualifying Round");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.qualifyinground = {};
        $scope.statuses = {};
        $scope.statuses.inedit = false;
        $scope.sportid = $stateParams.sportid;
        if ($stateParams.sportid) {
            NavigationService.getOneSport($stateParams.sportid, function (response) {
                if (response.value) {
                    $scope.qualifyinground.sport = response.data;
                    $scope.qualifyinground.year = response.data.year;
                }
            });
        }
        if ($stateParams.round) {
            $scope.qualifyinground.round = $stateParams.round;
        }
        if ($stateParams.order) {
            $scope.qualifyinground.order = $stateParams.order;
        }

        $scope.getQualifyingRoundPlayer = function (search) {
            $scope.students = [];
            var constraints = {};
            constraints.search = search;
            if (isNaN(search) || search === null || search === undefined || search === "") {
                constraints.search = search;
                constraints.sfaid = undefined;
            } else {
                constraints.search = undefined;
                constraints.sfaid = parseInt(search);
            }
            if ($scope.qualifyinground.sport) {
                constraints.sport = $scope.qualifyinground.sport.sportslist._id;
            }
            if ($scope.qualifyinground.sport.gender) {
                constraints.gender = $scope.qualifyinground.sport.gender;
            }
            constraints.year = $scope.qualifyinground.year.toString();
            console.log(constraints);
            NavigationService.getStudentsbySport(constraints, function (data) {
                if (data && data.value !== false) {
                    $scope.students = data.data;
                } else {
                    $scope.students = [];
                }
            });
        };
        $scope.submitQualifyingRound = function () {
            console.log($scope.qualifyinground);
            var request = $scope.qualifyinground;
            request.sport = $scope.qualifyinground.sport._id;
            if ($scope.qualifyinground.player) {
                request.player1 = $scope.qualifyinground.player._id;
            }

            NavigationService.saveQualifyingRound(request, function (response) {
                if (response.value) {
                    $state.go('qualifyingroundaddround', {
                        id: request.sport
                    });
                } else {
                    // do nothing
                }
            });
        };

    })
    .controller('editQualifyingRoundCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $uibModal, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createqualifyinground");
        $scope.menutitle = NavigationService.makeactive("Qualifying Round");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.qualifyinground = {};
        $scope.statuses = {};
        $scope.statuses.inedit = false;
        $scope.sportid = $stateParams.sportid;
        if ($stateParams.sportid) {
            NavigationService.getOneSport($stateParams.sportid, function (response) {
                if (response.value) {
                    $scope.qualifyinground.sport = response.data;
                    $scope.qualifyinground.year = response.data.year;
                }
            });
        }
        if ($stateParams.round) {
            $scope.qualifyinground.round = $stateParams.round;
        }
        if ($stateParams.order) {
            $scope.qualifyinground.order = $stateParams.order;
        }

        $scope.getQualifyingRoundTeam = function (search) {
            $scope.teams = [];
            var constraints = {};
            constraints.search = search;
            if (isNaN(search) || search === null || search === undefined || search === "") {
                constraints.search = search;
                constraints.sfaid = undefined;
            } else {
                constraints.search = undefined;
                constraints.sfaid = parseInt(search);
            }
            if ($scope.qualifyinground.sport) {
                constraints.sport = $scope.qualifyinground.sport.sportslist._id;
                // constraints.agegroup = $scope.heat.sport.agegroup;
            }
            if ($scope.qualifyinground.sport.gender) {
                constraints.gender = $scope.qualifyinground.sport.gender;
            }
            constraints.year = $scope.qualifyinground.year.toString();
            console.log(constraints);
            NavigationService.getTeamsbySport(constraints, function (data) {
                if (data && data.value !== false) {
                    $scope.teams = data.data;
                } else {
                    $scope.teams = [];
                }
            });
        };

        $scope.getQualifyingRoundPlayer = function (search) {
            $scope.students = [];
            var constraints = {};
            constraints.search = search;
            if (isNaN(search) || search === null || search === undefined || search === "") {
                constraints.search = search;
                constraints.sfaid = undefined;
            } else {
                constraints.search = undefined;
                constraints.sfaid = parseInt(search);
            }
            if ($scope.qualifyinground.sport) {
                constraints.sport = $scope.qualifyinground.sport.sportslist._id;
            }
            if ($scope.qualifyinground.sport.gender) {
                constraints.gender = $scope.qualifyinground.sport.gender;
            }
            constraints.year = $scope.qualifyinground.year.toString();
            console.log(constraints);
            NavigationService.getStudentsbySport(constraints, function (data) {
                if (data && data.value !== false) {
                    $scope.students = data.data;
                } else {
                    $scope.students = [];
                }
            });
        };
        $scope.submitQualifyingRound = function () {
            console.log($scope.qualifyinground);
            var request = $scope.qualifyinground;
            request.sport = $scope.qualifyinground.sport._id;
            if ($scope.qualifyinground.player) {
                request.player1 = $scope.qualifyinground.player._id;
            }

            NavigationService.saveQualifyingRound(request, function (response) {
                if (response.value) {
                    $state.go('qualifyingroundaddround', {
                        id: request.sport
                    });
                } else {
                    // do nothing
                }
            });
        };
        if ($stateParams.id) {
            NavigationService.getOneQualifyingRound($stateParams, function (response) {
                if (response.value) {
                    $scope.qualifyinground = response.data;
                    if ($scope.qualifyinground.date) {
                        $scope.qualifyinground.date = new Date($scope.qualifyinground.date);
                    }
                } else {

                }
            });
        }
    })
    .controller('createQualifyingKnockoutCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $uibModal, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createqualifyingknockout");
        $scope.menutitle = NavigationService.makeactive("Qualifying Knockout");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.qualifyinground = {};
        $scope.qualifyinground.heats = [];
        $scope.statuses = {};
        $scope.statuses.inedit = false;
        $scope.sportid = $stateParams.sportid;

        $scope.addParticipant = function () {
            $scope.qualifyinground.heats.push({});
        };

        if ($stateParams.sportid) {
            NavigationService.getOneSport($stateParams.sportid, function (response) {
                if (response.value) {
                    $scope.qualifyinground.sport = response.data;
                    $scope.qualifyinground.year = response.data.year;
                }
            });
        }
        if ($stateParams.round) {
            $scope.qualifyinground.round = $stateParams.round;
        }
        if ($stateParams.order) {
            $scope.qualifyinground.order = $stateParams.order;
        }

        $scope.getQualifyingRoundTeam = function (search) {
            $scope.teams = [];
            var constraints = {};
            constraints.search = search;
            if (isNaN(search) || search === null || search === undefined || search === "") {
                constraints.search = search;
                constraints.sfaid = undefined;
            } else {
                constraints.search = undefined;
                constraints.sfaid = parseInt(search);
            }
            if ($scope.qualifyinground.sport) {
                constraints.sport = $scope.qualifyinground.sport.sportslist._id;
                // constraints.agegroup = $scope.heat.sport.agegroup;
            }
            if ($scope.qualifyinground.sport.gender) {
                constraints.gender = $scope.qualifyinground.sport.gender;
            }
            constraints.year = $scope.qualifyinground.year.toString();
            console.log(constraints);
            NavigationService.getTeamsbySport(constraints, function (data) {
                if (data && data.value !== false) {
                    $scope.teams = data.data;
                } else {
                    $scope.teams = [];
                }
            });
        };

        $scope.getQualifyingRoundPlayer = function (search) {
            $scope.students = [];
            var constraints = {};
            constraints.search = search;
            if (isNaN(search) || search === null || search === undefined || search === "") {
                constraints.search = search;
                constraints.sfaid = undefined;
            } else {
                constraints.search = undefined;
                constraints.sfaid = parseInt(search);
            }
            if ($scope.qualifyinground.sport) {
                constraints.sport = $scope.qualifyinground.sport.sportslist._id;
            }
            if ($scope.qualifyinground.sport.gender) {
                constraints.gender = $scope.qualifyinground.sport.gender;
            }
            constraints.year = $scope.qualifyinground.year.toString();
            console.log(constraints);
            NavigationService.getStudentsbySport(constraints, function (data) {
                if (data && data.value !== false) {
                    $scope.students = data.data;
                } else {
                    $scope.students = [];
                }
            });
        };
        $scope.submitQualifyingRound = function () {
            console.log($scope.qualifyinground);
            var request = $scope.qualifyinground;
            request.sport = $scope.qualifyinground.sport._id;
            if ($scope.qualifyinground.player) {
                request.player1 = $scope.qualifyinground.player._id;
            }

            NavigationService.saveQualifyingKnockout(request, function (response) {
                if (response.value) {
                    $state.go('qualifyingknockoutaddround', {
                        id: request.sport
                    });
                } else {
                    // do nothing
                }
            });
        };

    })
    .controller('editQualifyingKnockoutCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $uibModal, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createqualifyingknockout");
        $scope.menutitle = NavigationService.makeactive("Qualifying Knockout");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.qualifyinground = {};
        $scope.qualifyinground.heats = [];
        $scope.statuses = {};
        $scope.statuses.inedit = false;
        $scope.sportid = $stateParams.sportid;

        $scope.addParticipant = function () {
            $scope.qualifyinground.heats.push({});
        };

        if ($stateParams.sportid) {
            NavigationService.getOneSport($stateParams.sportid, function (response) {
                if (response.value) {
                    $scope.qualifyinground.sport = response.data;
                    $scope.qualifyinground.year = response.data.year;
                }
            });
        }
        if ($stateParams.round) {
            $scope.qualifyinground.round = $stateParams.round;
        }
        if ($stateParams.order) {
            $scope.qualifyinground.order = $stateParams.order;
        }
        $scope.getQualifyingRoundTeam = function (search) {
            $scope.teams = [];
            var constraints = {};
            constraints.search = search;
            if (isNaN(search) || search === null || search === undefined || search === "") {
                constraints.search = search;
                constraints.sfaid = undefined;
            } else {
                constraints.search = undefined;
                constraints.sfaid = parseInt(search);
            }
            if ($scope.qualifyinground.sport) {
                constraints.sport = $scope.qualifyinground.sport.sportslist._id;
                // constraints.agegroup = $scope.heat.sport.agegroup;
            }
            if ($scope.qualifyinground.sport.gender) {
                constraints.gender = $scope.qualifyinground.sport.gender;
            }
            constraints.year = $scope.qualifyinground.year.toString();
            console.log(constraints);
            NavigationService.getTeamsbySport(constraints, function (data) {
                if (data && data.value !== false) {
                    $scope.teams = data.data;
                } else {
                    $scope.teams = [];
                }
            });
        };

        $scope.getQualifyingRoundPlayer = function (search) {
            $scope.students = [];
            var constraints = {};
            constraints.search = search;
            if (isNaN(search) || search === null || search === undefined || search === "") {
                constraints.search = search;
                constraints.sfaid = undefined;
            } else {
                constraints.search = undefined;
                constraints.sfaid = parseInt(search);
            }
            if ($scope.qualifyinground.sport) {
                constraints.sport = $scope.qualifyinground.sport.sportslist._id;
            }
            if ($scope.qualifyinground.sport.gender) {
                constraints.gender = $scope.qualifyinground.sport.gender;
            }
            constraints.year = $scope.qualifyinground.year.toString();
            console.log(constraints);
            NavigationService.getStudentsbySport(constraints, function (data) {
                if (data && data.value !== false) {
                    $scope.students = data.data;
                } else {
                    $scope.students = [];
                }
            });
        };
        $scope.submitQualifyingRound = function () {
            console.log($scope.qualifyinground);
            var request = $scope.qualifyinground;
            request.sport = $scope.qualifyinground.sport._id;
            if ($scope.qualifyinground.player) {
                request.player1 = $scope.qualifyinground.player._id;
            }

            NavigationService.saveQualifyingKnockout(request, function (response) {
                if (response.value) {
                    $state.go('qualifyingknockoutaddround', {
                        id: request.sport
                    });
                } else {
                    // do nothing
                }
            });
        };
        if ($stateParams.id) {
            NavigationService.getOneQualifyingKnockout($stateParams, function (response) {
                if (response.value) {
                    $scope.qualifyinground = response.data;
                    if ($scope.qualifyinground.date) {
                        $scope.qualifyinground.date = new Date($scope.qualifyinground.date);
                    }
                } else {

                }
            });
        }
    })
    .controller('editSwissLeagueCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $uibModal, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createswissleague");
        $scope.menutitle = NavigationService.makeactive("Swiss League");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.swissleague = {};
        $scope.swissleague.roundno = 0;
        $scope.statuses = {};
        $scope.statuses.inedit = false;
        $scope.swissleague.event = "Swiss League";
        $scope.sportid = $stateParams.sportid;
        if ($stateParams.sportid) {
            NavigationService.getOneSport($stateParams.sportid, function (response) {
                if (response.value) {
                    $scope.swissleague.sport = response.data;
                    $scope.swissleague.year = response.data.year;
                }
            });
        }

        $scope.getSwissLeaguePlayer = function (search) {
            $scope.students = [];
            var constraints = {};
            constraints.search = search;
            if (isNaN(search) || search === null || search === undefined || search === "") {
                constraints.search = search;
                constraints.sfaid = undefined;
            } else {
                constraints.search = undefined;
                constraints.sfaid = parseInt(search);
            }
            if ($scope.swissleague.sport) {
                constraints.sport = $scope.swissleague.sport.sportslist._id;
            }
            if ($scope.swissleague.sport.gender) {
                constraints.gender = $scope.swissleague.sport.gender;
            }
            constraints.year = $scope.swissleague.year.toString();
            console.log(constraints);
            NavigationService.getStudentsbySport(constraints, function (data) {
                if (data && data.value !== false) {
                    $scope.students = data.data;
                } else {
                    $scope.students = [];
                }
            });
        };
        $scope.submitSwissLeague = function () {
            console.log($scope.swissleague);
            var request = $scope.swissleague;
            request.sport = $scope.swissleague.sport._id;
            if ($scope.swissleague.player1) {
                request.player1 = $scope.swissleague.player1._id;
            }
            if ($scope.swissleague.player2) {
                request.player2 = $scope.swissleague.player2._id;
            }
            NavigationService.saveSwissLeague(request, function (response) {
                if (response.value) {
                    $state.go('swissaddround', {
                        id: request.sport
                    });
                } else {
                    // do nothing
                }
            });
        };
        // if()
        if ($stateParams.id) {
            NavigationService.getOneSwissLeague($stateParams, function (response) {
                if (response.value) {
                    $scope.swissleague = response.data;
                    if ($scope.swissleague.date) {
                        $scope.swissleague.date = new Date($scope.swissleague.date);
                    }
                    if ($scope.swissleague.startTime)
                        $scope.swissleague.startTime = new Date($scope.swissleague.startTime);
                    if ($scope.swissleague.endTime)
                        $scope.swissleague.endTime = new Date($scope.swissleague.endTime);
                } else {

                }
            });
        }
    })
    .controller('editKnockoutCtrl', function ($scope, TemplateService, $stateParams, NavigationService, $timeout, $state, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createknockout");
        $scope.menutitle = NavigationService.makeactive("Knockout");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.knockout = {};
        $scope.knockout.roundno = 0;
        $scope.statuses = {};
        $scope.statuses.inedit = true;
        $scope.knockout.event = "Knockout";
        $scope.sportid = $stateParams.sportid;
        // if($stateParams.sportid){
        //   NavigationService.getOneSport($stateParams.sportid,function (response) {
        //     if(response.value){
        //       $scope.knockout.sport = response.data;
        //     }
        //   });
        // }
        $scope.confDelete = function () {
            var constraints = {};
            if ($.jStorage.get("participantType") == "player") {
                constraints.student = $.jStorage.get("participantId");
            } else {
                constraints.team = $.jStorage.get("participantId");
            }
            constraints.knockout = $scope.knockout._id;
            NavigationService.removeThisStat(constraints, function (response) {
                if (response.value) {
                    $scope.knockout[$.jStorage.get("participantModel")] = null;
                }
            });
        };
        $scope.deleteParticipant = function (participantType, model, id) {
            var r = confirm("Removing participant removes stats! Use carefully. Save knockout after removing.");
            if (r === true) {
                $.jStorage.set("participantModel", model);
                $.jStorage.set("participantType", participantType);
                $.jStorage.set("participantId", id);
                $uibModal.open({
                    animation: true,
                    templateUrl: "views/content/delete.html",
                    scope: $scope
                });
            } else {
                txt = "You pressed Cancel!";
            }

        };
        NavigationService.getAllSportList(function (response) {
            if (response.value) {
                $scope.sportsList = response.data;
            }
        });
        NavigationService.getAllAgeGroup(function (data) {
            if (data.value) {
                $scope.agegroups = data.data;
            }
        });
        $scope.getLastOrder = function () {
            var constraints = {};
            constraints = {
                "year": $scope.knockout.year,
                "sport": $scope.knockout.sport._id,
                "participantType": $scope.knockout.participantType,
                "event": $scope.knockout.event,
                "roundno": $scope.knockout.roundno
            };
            NavigationService.getLastOrder(constraints, function (response) {
                if (response.value) {
                    $scope.knockout.order = parseInt(response.data) + 1;
                } else {
                    $scope.knockout.order = 0;
                }
            });
        };
        $scope.addNoMatch = function (participantType, model) {
            if (participantType == 'player') {
                NavigationService.getOneStudentByName({
                    name: "No Match "
                }, function (response) {
                    if (response.value) {
                        $scope.knockout[model] = response.data;
                    }
                });
            } else {
                NavigationService.getOneTeamByName({
                    name: "No Match "
                }, function (response) {
                    if (response.value) {
                        $scope.knockout[model] = response.data;
                    }
                });
            }
        };
        $scope.getParticipants = function () {
            if ($scope.knockout.year && $scope.knockout.participantType && $scope.knockout.sport && $scope.knockout.sport._id) {
                if ($scope.knockout.participantType == "player") {
                    $scope.getKnockoutPlayer("");
                } else {
                    $scope.getKnockoutTeam("");
                }
            }
        };
        $scope.getKnockoutTeam = function (search) {
            $scope.teams = [];
            var constraints = {};
            constraints.search = search;
            if (isNaN(search) || search === null || search === undefined || search === "") {
                constraints.search = search;
                constraints.sfaid = undefined;
            } else {
                constraints.search = undefined;
                constraints.sfaid = parseInt(search);
            }
            if ($scope.knockout.sport) {
                constraints.sport = $scope.knockout.sport.sportslist._id;
                // constraints.agegroup = $scope.knockout.sport.agegroup;
            }
            if ($scope.knockout.sport.gender) {
                constraints.gender = $scope.knockout.sport.gender;
            }
            constraints.year = $scope.knockout.year.toString();
            console.log(constraints);
            NavigationService.getTeamsbySport(constraints, function (data) {
                if (data && data.value !== false) {
                    $scope.teams = data.data;
                } else {
                    $scope.teams = [];
                }
            });
        };
        $scope.getKnockoutPlayer = function (search) {
            $scope.students = [];
            var constraints = {};
            constraints.search = search;
            if (isNaN(search) || search === null || search === undefined || search === "") {
                constraints.search = search;
                constraints.sfaid = undefined;
            } else {
                constraints.search = undefined;
                constraints.sfaid = parseInt(search);
            }
            if ($scope.knockout.sport) {
                constraints.sport = $scope.knockout.sport.sportslist._id;
            }
            if ($scope.knockout.sport.gender) {
                constraints.gender = $scope.knockout.sport.gender;
            }
            constraints.year = $scope.knockout.year.toString();
            NavigationService.getStudentsbySport(constraints, function (data) {
                if (data && data.value !== false) {
                    $scope.students = data.data;
                } else {
                    $scope.students = [];
                }
            });
        };
        $scope.submitKnockout = function () {
            console.log($scope.knockout);
            var request = {};
            request = $scope.knockout;
            request.sport = $scope.knockout.sport._id;
            if ($scope.knockout.participantType == "player") {
                if ($scope.knockout.player1) {
                    request.player1 = $scope.knockout.player1._id;
                }
                if ($scope.knockout.player2) {
                    request.player2 = $scope.knockout.player2._id;
                }
            } else {
                if ($scope.knockout.team1) {
                    request.team1 = $scope.knockout.team1._id;
                }
                if ($scope.knockout.team2) {
                    request.team2 = $scope.knockout.team2._id;
                }
            }
            request.year = $scope.knockout.year.toString();
            NavigationService.submitKnockout(request, function (data) {
                if (data.value) {
                    console.log({
                        id: request.sport
                    });
                    $state.go("viewknockout", {
                        id: request.sport
                    });
                } else {
                    //error
                }
            });
        };
        if ($stateParams.id) {
            NavigationService.getOneKnockout($stateParams, function (response) {
                if (response.value) {
                    $scope.knockout = response.data;
                    if ($scope.knockout.date)
                        $scope.knockout.date = new Date($scope.knockout.date);
                    if ($scope.knockout.startTime)
                        $scope.knockout.startTime = new Date($scope.knockout.startTime);
                    if ($scope.knockout.endTime)
                        $scope.knockout.endTime = new Date($scope.knockout.endTime);
                    // $scope.getParticipants();
                    $scope.getKnockoutPlayer("");
                } else {

                }
            });
        }


    })

    .controller('editStudentCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createstudent");
        $scope.menutitle = NavigationService.makeactive("Students");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 2;
        $scope.student = {};

        $scope.hours = _.times(13, String);
        $scope.minutes = _.times(60, String);
        $scope.hours.shift();
        $scope.timer = ["am", "pm"];
        $scope.via = ["via School", "Individual"];
        $scope.payment = ["", "Paid", "Unpaid"];
        $scope.subMenuList = [{
            title: "Back to Student",
            redirect: "student"
        }, {
            title: "Sports",
            redirect: "",
            url: "#/studentsport/" + $stateParams.id + "/" + $scope.school
        }];
        $scope.pageName = "Edit School";

        // NavigationService.getSchoolList(function(data) {
        //     if (data.value !== false) {
        //         $scope.schools = data.data;
        //     }
        // });

        $scope.getSchools = function (search) {

            var obj = {};
            obj.search = search;
            if (isNaN(search)) {
                obj.search = search;
                obj.sfaid = undefined;
            } else {
                obj.search = undefined;
                obj.sfaid = parseInt(search);
            }
            NavigationService.getSchoolLimited(obj, function (data) {
                if (data && data.value !== false) {
                    $scope.schools = data.data;
                } else {
                    $scope.schools = [];
                }
            });

        };
        NavigationService.getOneStudent($stateParams.id, function (data) {
            if (data.value !== false) {
                $scope.student = data.data;
                if ($scope.student.dob) {
                    $scope.student.dob = new Date($scope.student.dob);
                }
                if ($scope.student.dateOfForm) {
                    $scope.student.dateOfForm = new Date($scope.student.dateOfForm);
                }
                if ($scope.student.timeOfForm) {
                    $scope.student.timeOfForm = new Date($scope.student.timeOfForm);
                }
                if (!$scope.student.hours) {
                    $scope.student.hours = "1";
                }
                if (!$scope.student.minutes) {
                    $scope.student.minutes = "1";
                }
                if (!$scope.student.timer) {
                    $scope.student.timer = "am";
                }
                if (!$scope.student.via) {
                    $scope.student.via = "via School";
                }
                $scope.school = $scope.student.school._id;
                $scope.subMenuList[1].url = "#/studentsport/" + $stateParams.id + "/" + $scope.school;

            }
        });

        $scope.showError = false;
        $scope.errorContact = false;
        $scope.errorEmail = false;
        $scope.errorSportContact = false;
        $scope.saveStudent = function () {

            function checkContact() {
                $scope.student.contact = $scope.student.contact.toString();
                var split = $scope.student.contact.split(",");
                for (var i = 0; i < split.length; i++) {
                    if (split[i].length != 10) {
                        $scope.errorContact = true;
                        break;
                    } else {
                        $scope.errorContact = false;
                    }
                }
            }

            function checkEmail() {
                var splitEmail = $scope.student.email.split(",");
                for (var i = 0; i < splitEmail.length; i++) {
                    var x = splitEmail[i];
                    var atpos = x.indexOf("@");
                    var dotpos = x.lastIndexOf(".");
                    if (atpos <= 1 || dotpos <= atpos + 2 || dotpos + 2 >= x.length) {
                        $scope.errorEmail = true;
                        break;
                    } else {
                        $scope.errorEmail = false;
                    }
                }
            }

            function callSave() {
                NavigationService.saveStudent($scope.student, function (data) {
                    if (data.value !== false) {
                        $scope.showError = false;
                        $state.go('student');
                    }
                });
            }

            if ($scope.student.email) {
                checkEmail();
            } else {
                $scope.errorEmail = false;
            }
            if ($scope.student.contact) {
                checkContact();
            } else {
                $scope.errorContact = false;
            }
            if ($scope.errorContact === false && $scope.errorEmail === false) {
                console.log($scope.student);
                callSave();
            } else {
                $scope.showError = true;
                $timeout(function () {
                    $scope.showError = false;
                }, 3000);
            }
        };
    })


    .controller('studentSportCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("studentsport");
        $scope.menutitle = NavigationService.makeactive("Students");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.school = $stateParams.school;
        $scope.template.type = 1;
        $scope.studentId = $stateParams.id;
        NavigationService.getStudentSports($stateParams.id, function (data2) {
            console.log(data2);
            $scope.sports = data2.data;
        });

        $scope.confDelete = function () {
            NavigationService.deleteStudentSport(function (data, status) {
                console.log(data);
                reload();
            });
        };
        $scope.deleteFunc = function (id) {
            console.log(id);
            $.jStorage.set("deleteStudentSport", id);
            $uibModal.open({
                animation: true,
                templateUrl: "views/content/delete.html",
                scope: $scope
            });
        };
    })

    .controller('createStudentSportCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state) {
        $scope.template = TemplateService.changecontent("createstudentsports");
        $scope.menutitle = NavigationService.makeactive("Student - Sports");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.pageName = "Create Student Sports";
        $scope.sport = {};
        $scope.oneSchool = {};
        $scope.school = $stateParams.school;
        $scope.studentId = $stateParams.id;
        NavigationService.getOneSchool($stateParams.school, function (response) {
            if (response.value) {
                $scope.sport.school = response.data;
                $scope.callme();
            }
        });
        $scope.allYears = NavigationService.getAllYears();
        NavigationService.getSchoolList(function (data) {
            if (data.value !== false) {
                $scope.schools = data.data;
            }
        });

        $scope.sportsList = [];

        $scope.callme = function () {
            if ($scope.sport.year && $scope.sport.school && $scope.sport.school._id) {
                NavigationService.getSchoolSports($scope.sport.year, $scope.sport.school._id, function (data2) {
                    console.log(data2);
                    $scope.sportsList = data2.data;

                });
            }
            NavigationService.getOneSchool($scope.sport.school._id, function (response) {
                if (response.value) {
                    $scope.oneSchool = response.data;
                    console.log($scope.oneSchool);
                } else {
                    $scope.oneSchool = {};
                }
            });
        };

        $scope.sport = {};
        $scope.sport.year = "2015";
        $scope.sport.firstcategory = [];
        $scope.sport.secondcategory = [];
        $scope.sport.thirdcategory = [];
        $scope.sport.agegroup = [];

        $scope.firstcategories = [];
        $scope.secondcategories = [];
        $scope.thirdcategories = [];
        $scope.agegroups = [];

        $scope.saveSport = function () {
            if ($scope.sport.firstcategory && $scope.sport.firstcategory.length > 0) {
                $scope.sport.firstcategory = $scope.sport.firstcategory[0];
            } else {
                delete $scope.sport.firstcategory;
            }

            if ($scope.sport.secondcategory && $scope.sport.secondcategory.length > 0) {
                $scope.sport.secondcategory = $scope.sport.secondcategory[0];
            } else {
                delete $scope.sport.secondcategory;
            }

            if ($scope.sport.thirdcategory && $scope.sport.thirdcategory.length > 0) {
                $scope.sport.thirdcategory = $scope.sport.thirdcategory[0];
            } else {
                delete $scope.sport.thirdcategory;
            }

            if ($scope.sport.agegroup && $scope.sport.agegroup.length > 0) {
                $scope.sport.agegroup = $scope.sport.agegroup[0];
            } else {
                delete $scope.sport.agegroup;
            }
            $scope.sport.student = {};
            $scope.sport.student._id = $stateParams.id;
            console.log($scope.sport);
            NavigationService.saveStudentSport($scope.sport, function (data) {
                console.log(data);
                if (data.value !== false) {
                    $state.go("studentsport", {
                        id: $stateParams.id
                    });
                }
            });
        };

        $scope.getFirstCategory = function () {
            console.log("getFirstCategory");
            var obj = {};
            obj.sport = $scope.sport.sportslist._id;
            // console.log(obj);
            NavigationService.getFirstCategoryFromSport(obj, function (data) {
                if (data && data.value !== false) {
                    $scope.firstcategories = _.uniqBy(data.data[0].category, function (key) {
                        return key._id;
                    });
                    console.log($scope.firstcategories);
                } else {
                    $scope.firstcategories = [];
                }
            });

        };

        $scope.saveFirstCategory = function (data, select) {
            _.each(data, function (n, key) {
                if (typeof n == 'string') {
                    var item = {
                        name: _.capitalize(n)
                    };
                    NavigationService.saveFirstCategory(item, function (data) {
                        if (data.value !== false) {
                            item._id = data.data._id;
                        }
                    });
                    select.selected = _.without(select.selected, n);
                    select.selected.push(item);
                    $scope.sport.firstcategory = select.selected;
                }
            });
        };

        $scope.getSecondCategory = function (search) {
            if (search.length >= 2) {
                var obj = {};
                obj.search = search;
                obj.secondcategory = $scope.sport.secondcategory;
                NavigationService.getSecondCategories(obj, function (data) {
                    if (data && data.value !== false) {
                        $scope.secondcategories = data.data;
                    } else {
                        $scope.secondcategories = [];
                    }
                });
            } else {
                $scope.secondcategories = [];
            }
        };

        $scope.saveSecondCategory = function (data, select) {
            _.each(data, function (n, key) {
                if (typeof n == 'string') {
                    var item = {
                        name: _.capitalize(n)
                    };
                    NavigationService.saveSecondCategory(item, function (data) {
                        if (data.value != false) {
                            item._id = data.data._id;
                        }
                    });
                    select.selected = _.without(select.selected, n);
                    select.selected.push(item);
                    $scope.sport.secondcategory = select.selected;
                }
            });
        }

        $scope.getAgeGroup = function (search) {
            if (search.length >= 2) {
                var obj = {};
                obj.search = search;
                obj.agegroup = $scope.sport.agegroup;
                NavigationService.getAgeGroups(obj, function (data) {
                    if (data && data.value != false) {
                        $scope.agegroups = data.data;
                    } else {
                        $scope.agegroups = [];
                    }
                });
            } else {
                $scope.agegroups = [];
            }
        }

        $scope.saveAgeGroup = function (data, select) {
            _.each(data, function (n, key) {
                if (typeof n == 'string') {
                    var item = {
                        name: _.capitalize(n)
                    };
                    NavigationService.saveAgeGroup(item, function (data) {
                        if (data.value != false) {
                            item._id = data.data._id;
                        }
                    });
                    select.selected = _.without(select.selected, n);
                    select.selected.push(item);
                    $scope.sport.agegroup = select.selected;
                }
            });
        }
    })

    .controller('editStudentSportCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createstudentsports");
        $scope.menutitle = NavigationService.makeactive("Students");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.studentId = $stateParams.id;
        $scope.school = $stateParams.school;
        $scope.pageName = "Edit School";
        $scope.sport = {};
        $scope.oneSchool = {};

        $scope.allYears = NavigationService.getAllYears();
        NavigationService.getSchoolList(function (data) {
            if (data.value !== false) {
                $scope.schools = data.data;
            }
        });

        $scope.sportsList = [];

        $scope.callme = function () {
            if ($scope.sport.year && $scope.sport.school && $scope.sport.school._id) {
                NavigationService.getSchoolSports($scope.sport.year, $scope.sport.school._id, function (data2) {
                    $scope.sportsList = data2.data;
                });
            }
            NavigationService.getOneSchool($scope.sport.school._id, function (response) {
                if (response.value) {
                    $scope.oneSchool = response.data;
                } else {
                    $scope.oneSchool = {};
                }
            });
        };

        $scope.sport = {};
        $scope.sport.year = "2015";
        $scope.sport.firstcategory = [];
        $scope.sport.secondcategory = [];
        $scope.sport.thirdcategory = [];
        $scope.sport.agegroup = [];

        $scope.firstcategories = [];
        $scope.secondcategories = [];
        $scope.thirdcategories = [];
        $scope.agegroups = [];
        NavigationService.getOneStudentSport($stateParams.id, function (data) {
            console.log(data);
            if (data.value !== false) {
                $scope.sport = data.data;
                if (!$scope.sport.firstcategory) {
                    $scope.sport.firstcategory = [];
                } else {
                    $scope.sport.firstcategory = [$scope.sport.firstcategory];
                }

                if (!$scope.sport.secondcategory) {
                    $scope.sport.secondcategory = [];
                } else {
                    $scope.sport.secondcategory = [$scope.sport.secondcategory];
                }

                if (!$scope.sport.thirdcategory) {
                    $scope.sport.thirdcategory = [];
                } else {
                    $scope.sport.thirdcategory = [$scope.sport.thirdcategory];
                }

                if (!$scope.sport.agegroup) {
                    $scope.sport.agegroup = [];
                } else {
                    $scope.sport.agegroup = [$scope.sport.agegroup];
                }
                console.log($scope.sport);
                $scope.studentId = $scope.sport.student;

                $scope.callme();
            }
        });
        $scope.saveSport = function () {
            if ($scope.sport.firstcategory && $scope.sport.firstcategory.length > 0) {
                $scope.sport.firstcategory = $scope.sport.firstcategory[0];
            } else {
                delete $scope.sport.firstcategory;
            }

            if ($scope.sport.secondcategory && $scope.sport.secondcategory.length > 0) {
                $scope.sport.secondcategory = $scope.sport.secondcategory[0];
            } else {
                delete $scope.sport.secondcategory;
            }

            if ($scope.sport.thirdcategory && $scope.sport.thirdcategory.length > 0) {
                $scope.sport.thirdcategory = $scope.sport.thirdcategory[0];
            } else {
                delete $scope.sport.thirdcategory;
            }

            if ($scope.sport.agegroup && $scope.sport.agegroup.length > 0) {
                $scope.sport.agegroup = $scope.sport.agegroup[0];
            } else {
                delete $scope.sport.agegroup;
            }
            $scope.sport._id = $stateParams.id;
            console.log($scope.sport);
            NavigationService.saveStudentSport($scope.sport, function (data) {
                console.log(data);
                if (data.value != false) {
                    $state.go("studentsport", {
                        id: $scope.sport.student
                    });
                }
            });
        }

        $scope.getFirstCategory = function (search) {
            if (search.length >= 2) {
                var obj = {};
                obj.search = search;
                obj.firstcategory = $scope.sport.firstcategory;
                console.log(obj);
                NavigationService.getFirstCategories(obj, function (data) {
                    if (data && data.value != false) {
                        $scope.firstcategories = data.data;
                    } else {
                        $scope.firstcategories = [];
                    }
                });
            } else {
                $scope.firstcategories = [];
            }
        }

        $scope.saveFirstCategory = function (data, select) {
            _.each(data, function (n, key) {
                if (typeof n == 'string') {
                    var item = {
                        name: _.capitalize(n)
                    };
                    NavigationService.saveFirstCategory(item, function (data) {
                        if (data.value != false) {
                            item._id = data.data._id;
                        }
                    });
                    select.selected = _.without(select.selected, n);
                    select.selected.push(item);
                    $scope.sport.firstcategory = select.selected;
                }
            });
        }

        $scope.getSecondCategory = function (search) {
            if (search.length >= 2) {
                var obj = {};
                obj.search = search;
                obj.secondcategory = $scope.sport.secondcategory;
                NavigationService.getSecondCategories(obj, function (data) {
                    if (data && data.value != false) {
                        $scope.secondcategories = data.data;
                    } else {
                        $scope.secondcategories = [];
                    }
                });
            } else {
                $scope.secondcategories = [];
            }
        }

        $scope.saveSecondCategory = function (data, select) {
            _.each(data, function (n, key) {
                if (typeof n == 'string') {
                    var item = {
                        name: _.capitalize(n)
                    };
                    NavigationService.saveSecondCategory(item, function (data) {
                        if (data.value != false) {
                            item._id = data.data._id;
                        }
                    });
                    select.selected = _.without(select.selected, n);
                    select.selected.push(item);
                    $scope.sport.secondcategory = select.selected;
                }
            });
        }

        $scope.getAgeGroup = function (search) {
            if (search.length >= 2) {
                var obj = {};
                obj.search = search;
                obj.agegroup = $scope.sport.agegroup;
                NavigationService.getAgeGroups(obj, function (data) {
                    if (data && data.value != false) {
                        $scope.agegroups = data.data;
                    } else {
                        $scope.agegroups = [];
                    }
                });
            } else {
                $scope.agegroups = [];
            }
        }

        $scope.saveAgeGroup = function (data, select) {
            _.each(data, function (n, key) {
                if (typeof n == 'string') {
                    var item = {
                        name: _.capitalize(n)
                    };
                    NavigationService.saveAgeGroup(item, function (data) {
                        if (data.value != false) {
                            item._id = data.data._id;
                        }
                    });
                    select.selected = _.without(select.selected, n);
                    select.selected.push(item);
                    $scope.sport.agegroup = select.selected;
                }
            });
        }
    })

    .controller('sportListCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("sportlist");
        $scope.menutitle = NavigationService.makeactive("Sports List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;

        function reload() {
            NavigationService.getAllSportList(function (data) {
                console.log(data);
                if (data.value != false) {
                    $scope.sportsList = data.data;
                }
            });
        }
        reload();

        $scope.deleteFunc = function (id) {
            NavigationService.deleteSportsList(id, function (data2) {
                reload();
            });
        };
    })
    .controller('mediaCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("media");
        $scope.menutitle = NavigationService.makeactive("Media");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.pagination = {};
        $scope.adminURL = adminURL;
        $scope.buttonText = "Upload Media Excel";
        $scope.cs = $state;
        $scope.uploadurl = adminURL + "media/uploadMedia/";
        // $scope.yefunctioncallkiya = function () {
        //   console.log($scope.thismodel);
        // }
        $scope.pagination.pagenumber = 1;
        $scope.reload = function (val) {
            if (val === 1) {
                $scope.pagination.name = "";
            } else if (val === 2) {
                $scope.pagination.sfaid = "";
            }
            NavigationService.getLimitedMedia($scope.pagination, function (data) {
                if (data.value !== false) {
                    console.log(data);
                    $scope.contentLoaded = true;
                    $scope.medias = data.data.data;
                    $scope.media = data.data;
                    console.log($scope.teams);
                } else {
                    $scope.teams = {
                        data: []
                    };
                }
            });
        };
        $scope.reload();
        $scope.confDelete = function () {
            NavigationService.deleteMedia($.jStorage.get("deleteMedia"), function (data, status) {
                $scope.reload();
            });
        };
        $scope.deleteFunc = function (id) {
            console.log(id);
            $.jStorage.set("deleteMedia", id);
            $uibModal.open({
                animation: true,
                templateUrl: "views/content/delete.html",
                scope: $scope
            });
        };
    })

    .controller('createSportListCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createsportlist");
        $scope.menutitle = NavigationService.makeactive("Sports List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.pageName = "Create Sports List";

        $scope.sportList = {};

        $scope.saveSportList = function () {
            console.log($scope.sportList);
            NavigationService.saveSportList($scope.sportList, function (data) {
                console.log(data);
                if (data.value !== false) {
                    $state.go('sportlist');
                }
            });
        };
        $scope.addContent = function (select) {
            $scope.sportList.tableContent = select.selected;
        };
    })
    .controller('createBannerCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createbanner");
        $scope.menutitle = NavigationService.makeactive("Banner");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.pageName = "Create Banner";
        $scope.banner = {};
        $scope.sportList = {};

        $scope.saveBanner = function () {
            NavigationService.saveBanner($scope.banner, function (data) {
                if (data.value !== false) {
                    $state.go('banner');
                }
            });
        };
        $scope.addContent = function (select) {
            $scope.sportList.tableContent = select.selected;
        };
    })
    .controller('editBannerCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createbanner");
        $scope.menutitle = NavigationService.makeactive("Banner");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.pageName = "Edit Banner";
        $scope.banner = {};
        $scope.sportList = {};
        $scope.getOneBanner = function () {
            NavigationService.getOneBanner($stateParams.id, function (response) {
                if (response.value) {
                    $scope.banner = response.data;
                    $scope.banner.status = $scope.banner.status.toString();
                }
            });
        };
        $scope.getOneBanner();
        $scope.saveBanner = function () {
            NavigationService.saveBanner($scope.banner, function (data) {
                if (data.value !== false) {
                    $state.go('banner');
                }
            });
        };
        $scope.addContent = function (select) {
            $scope.sportList.tableContent = select.selected;
        };
    })

    .controller('editSportListCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createsportlist");
        $scope.menutitle = NavigationService.makeactive("Sports List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.pageName = "Edit Sports List";

        $scope.sportList = {};

        NavigationService.getOneSportList($stateParams.id, function (data) {
            console.log(data);
            if (data.value != false) {
                $scope.sportList = data.data;
            }
        });

        $scope.saveSportList = function () {
            console.log($scope.sport);
            NavigationService.saveSportList($scope.sportList, function (data) {
                console.log(data);
                if (data.value != false) {
                    $state.go('sportlist');
                }
            })
        }
    })

    .controller('sportCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("sport");
        $scope.menutitle = NavigationService.makeactive("Sports");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.adminURL = adminURL;

        // function reload() {
        //     NavigationService.getAllSport(function(data) {
        //         console.log(data);
        //         if (data.value != false) {
        //             $scope.sports = data.data;
        //         }
        //     });
        // }
        // reload();
        //
        $scope.deleteFunc = function (id) {
            NavigationService.deleteSport(id, function (data2) {
                $scope.reload();
            });
        };
        $scope.contentLoaded = false;
        $scope.pagination = {};
        $scope.pagination.pagenumber = 1;

        $scope.reload = function (val) {
            if (val === 1) {
                $scope.pagination.name = "";
            }
            NavigationService.getLimitedSport($scope.pagination, function (data) {
                if (data.value !== false) {
                    console.log(data);
                    $scope.contentLoaded = true;
                    $scope.sports = data.data.data;
                    $scope.sport = data.data;
                    console.log($scope.teams);
                } else {
                    $scope.teams = {
                        data: []
                    };
                    $scope.sport = {};
                }
            });
        };
        $scope.reload();
        $scope.hideStudent = function (id, status) {
            NavigationService.hideStudent({
                _id: id,
                status: status
            }, function (data2) {
                console.log(data2);
                $scope.reload();
            });
        };
        $scope.confDelete = function () {
            NavigationService.deleteSport($.jStorage.get("deleteTeam"), function (data, status) {
                console.log(data);
                $scope.reload();
            });
        };
        $scope.deleteFunc = function (id) {
            console.log(id);
            $.jStorage.set("deleteTeam", id);
            $uibModal.open({
                animation: true,
                templateUrl: "views/content/delete.html",
                scope: $scope
            });
        };

    })

    .controller('createSportCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createsport");
        $scope.menutitle = NavigationService.makeactive("Sports");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.pageName = "Create Sport";

        $scope.sport = {};

        NavigationService.getAllSportList(function (data) {
            console.log(data);
            if (data.value !== false) {
                $scope.sportsList = data.data;
            }
        });

        $scope.saveSport = function () {
            console.log($scope.sport);
            NavigationService.saveSport($scope.sport, function (data) {
                console.log(data);
                if (data.value !== false) {
                    $state.go('sport');
                }
            });
        };

    })

    .controller('editSportCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("editsport");
        $scope.menutitle = NavigationService.makeactive("Sports");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.pageName = "Edit Sport";

        $scope.sport = {};
        $scope.sport.firstcategory = [];
        $scope.sport.secondcategory = [];
        $scope.sport.thirdcategory = [];
        $scope.sport.agegroup = [];

        $scope.firstcategories = [];
        $scope.secondcategories = [];
        $scope.thirdcategories = [];
        $scope.agegroups = [];

        NavigationService.getAllSportList(function (data) {
            console.log(data);
            if (data.value != false) {
                $scope.sportsList = data.data;
            }
        })

        NavigationService.getOneSport($stateParams.id, function (data) {
            console.log(data);
            if (data.value != false) {
                $scope.sport = data.data;
                if (!$scope.sport.firstcategory) {
                    $scope.sport.firstcategory = [];
                } else {
                    $scope.sport.firstcategory = [$scope.sport.firstcategory];
                }

                if (!$scope.sport.secondcategory) {
                    $scope.sport.secondcategory = [];
                } else {
                    $scope.sport.secondcategory = [$scope.sport.secondcategory];
                }

                if (!$scope.sport.thirdcategory) {
                    $scope.sport.thirdcategory = [];
                } else {
                    $scope.sport.thirdcategory = [$scope.sport.thirdcategory];
                }

                if (!$scope.sport.agegroup) {
                    $scope.sport.agegroup = [];
                } else {
                    $scope.sport.agegroup = [$scope.sport.agegroup];
                }
                console.log($scope.sport);
            }
        })

        $scope.saveSport = function () {
            if ($scope.sport.firstcategory && $scope.sport.firstcategory.length > 0) {
                $scope.sport.firstcategory = $scope.sport.firstcategory[0];
            } else {
                delete $scope.sport.firstcategory;
            }

            if ($scope.sport.secondcategory && $scope.sport.secondcategory.length > 0) {
                $scope.sport.secondcategory = $scope.sport.secondcategory[0];
            } else {
                delete $scope.sport.secondcategory;
            }

            if ($scope.sport.thirdcategory && $scope.sport.thirdcategory.length > 0) {
                $scope.sport.thirdcategory = $scope.sport.thirdcategory[0];
            } else {
                delete $scope.sport.thirdcategory;
            }

            if ($scope.sport.agegroup && $scope.sport.agegroup.length > 0) {
                $scope.sport.agegroup = $scope.sport.agegroup[0];
            } else {
                delete $scope.sport.agegroup;
            }
            console.log($scope.sport);
            NavigationService.saveSport($scope.sport, function (data) {
                console.log(data);
                if (data.value != false) {
                    $state.go('sport');
                }
            })
        }

        $scope.getFirstCategory = function (search) {
            if (search.length >= 2) {
                var obj = {};
                obj.search = search;
                obj.firstcategory = $scope.sport.firstcategory;
                console.log(obj);
                NavigationService.getFirstCategories(obj, function (data) {
                    if (data && data.value != false) {
                        $scope.firstcategories = data.data;
                    } else {
                        $scope.firstcategories = [];
                    }
                });
            } else {
                $scope.firstcategories = [];
            }
        }

        $scope.saveFirstCategory = function (data, select) {
            console.log(select.selected);
            _.each(data, function (n, key) {
                if (typeof n == 'string') {
                    var item = {
                        name: _.capitalize(n)
                    };
                    NavigationService.saveFirstCategory(item, function (data) {
                        if (data.value != false) {
                            item._id = data.data._id;
                        }
                    });
                    select.selected = _.without(select.selected, n);
                    select.selected.push(item);
                    $scope.sport.firstcategory = select.selected;
                }
            });
        }

        $scope.getSecondCategory = function (search) {
            if (search.length >= 2) {
                var obj = {};
                obj.search = search;
                obj.secondcategory = $scope.sport.secondcategory;
                NavigationService.getSecondCategories(obj, function (data) {
                    if (data && data.value != false) {
                        $scope.secondcategories = data.data;
                    } else {
                        $scope.secondcategories = [];
                    }
                });
            } else {
                $scope.secondcategories = [];
            }
        }

        $scope.saveSecondCategory = function (data, select) {
            console.log(select.selected);
            _.each(data, function (n, key) {
                if (typeof n == 'string') {
                    var item = {
                        name: _.capitalize(n)
                    };
                    NavigationService.saveSecondCategory(item, function (data) {
                        if (data.value != false) {
                            item._id = data.data._id;
                        }
                    });
                    select.selected = _.without(select.selected, n);
                    select.selected.push(item);
                    $scope.sport.secondcategory = select.selected;
                }
            });
        }

        $scope.getThirdCategory = function (search) {
            if (search.length >= 2) {
                var obj = {};
                obj.search = search;
                obj.thirdcategory = $scope.sport.thirdcategory;
                NavigationService.getThirdCategories(obj, function (data) {
                    if (data && data.value != false) {
                        $scope.thirdcategories = data.data;
                    } else {
                        $scope.thirdcategories = [];
                    }
                });
            } else {
                $scope.thirdcategories = [];
            }
        }

        $scope.getAgeGroup = function (search) {
            if (search.length >= 2) {
                var obj = {};
                obj.search = search;
                obj.agegroup = $scope.sport.agegroup;
                NavigationService.getAgeGroups(obj, function (data) {
                    if (data && data.value != false) {
                        $scope.agegroups = data.data;
                    } else {
                        $scope.agegroups = [];
                    }
                });
            } else {
                $scope.agegroups = [];
            }
        }

        $scope.saveAgeGroup = function (data, select) {
            console.log(select.selected);
            _.each(data, function (n, key) {
                if (typeof n == 'string') {
                    var item = {
                        name: _.capitalize(n)
                    };
                    NavigationService.saveAgeGroup(item, function (data) {
                        if (data.value != false) {
                            item._id = data.data._id;
                        }
                    });
                    select.selected = _.without(select.selected, n);
                    select.selected.push(item);
                    $scope.sport.agegroup = select.selected;
                }
            });
        }

    })


    .controller('ageGroupCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("agegroup");
        $scope.menutitle = NavigationService.makeactive("Age Groups");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;

        function reload() {
            NavigationService.getAllAgeGroup(function (data) {
                console.log(data);
                if (data.value != false) {
                    $scope.ageGroups = data.data;
                }
            });
        }
        reload();

        $scope.deleteFunc = function (id) {
            NavigationService.deleteAgegroup(id, function (data2) {
                reload();
            });
        }

    })

    .controller('createAgeGroupCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createagegroup");
        $scope.menutitle = NavigationService.makeactive("Age Groups");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.pageName = "Create Age Group";

        $scope.agegroup = {};

        $scope.saveAgeGroup = function () {
            console.log($scope.agegroup);
            NavigationService.saveAgeGroup($scope.agegroup, function (data) {
                console.log(data);
                if (data.value != false) {
                    $state.go('agegroup');
                }
            })
        }

    })

    .controller('editAgeGroupCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createagegroup");
        $scope.menutitle = NavigationService.makeactive("Age Groups");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.pageName = "Edit Age Group";

        $scope.agegroup = {};

        NavigationService.getOneAgeGroup($stateParams.id, function (data) {
            console.log(data);
            if (data.value != false) {
                $scope.agegroup = data.data;
            }
        })

        $scope.saveAgeGroup = function () {
            console.log($scope.agegroup);
            NavigationService.saveAgeGroup($scope.agegroup, function (data) {
                console.log(data);
                if (data.value != false) {
                    $state.go('agegroup');
                }
            })
        }

    })

    .controller('showStudentCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("showstudent");
        $scope.menutitle = NavigationService.makeactive("Student");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.showstudent = $.jStorage.get("showstudent");
        console.log($scope.showstudent);
        if ($scope.showstudent.dob) {
            $scope.showstudent.dob = new Date($scope.showstudent.dob);
        }
        if ($scope.showstudent.dateOfForm) {
            $scope.showstudent.dateOfForm = new Date($scope.showstudent.dateOfForm);
        }
        if ($scope.showstudent.timeOfForm) {
            $scope.showstudent.timeOfForm = new Date($scope.showstudent.timeOfForm);
        }
    })

    .controller('SportRuleCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("sportrule");
        $scope.menutitle = NavigationService.makeactive("Sport Rule");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.contentLoaded = false;

        $scope.reload = function () {
            NavigationService.getAllSportRule(function (data) {
                console.log(data);
                if (data.value != false) {
                    $scope.contentLoaded = true;
                    $scope.sportrule = data.data;
                } else {
                    $scope.sportrule = [];
                }
            });
        }
        $scope.reload();

        $scope.confDelete = function () {
            NavigationService.deleteSportRule(function (data, status) {
                console.log(data);
                $scope.reload();
            });
        }
        $scope.deleteFunc = function (id) {
            console.log(id);
            $.jStorage.set("deleteSportRule", id);
            $.jStorage.get("deleteSportRule");
            $uibModal.open({
                animation: true,
                templateUrl: "views/content/delete.html",
                scope: $scope
            })
        }
    })

    .controller('createSportRuleCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createsportrule");
        $scope.menutitle = NavigationService.makeactive("Sport Rule");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.pageName = "Create Sport Rule";
        $scope.sportrule = {};
        $scope.deleteVal = "";
        $scope.sportrule.featured = [];
        $scope.sportrule.featuredTeam = [];
        $scope.contentheader = [];
        $scope.tinymceOptions = {
            selector: 'textarea',
            height: 500,
            theme: 'modern',
            plugins: [
                'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                'searchreplace wordcount visualblocks visualchars code fullscreen',
                'insertdatetime media nonbreaking save table contextmenu directionality',
                'emoticons template paste textcolor colorpicker textpattern imagetools '
            ],
            toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
            toolbar2: 'print preview media | forecolor backcolor emoticons',
            image_advtab: true,
            templates: [{
                title: 'Test template 1',
                content: 'Test 1'
            }, {
                title: 'Test template 2',
                content: 'Test 2'
            }],
            content_css: [
                '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                '//www.tinymce.com/css/codepen.min.css'
            ]
        };
        NavigationService.getAllSportList(function (data) {
            $scope.sportlist = data.data;
        });

        $scope.selectContent = function (id) {
            NavigationService.getOneSportList(id, function (data) {
                console.log(data.data);
                $scope.contentheader = data.data.tableContent;
            });
        };

        $scope.removeimage = function (i) {
            $scope.sportrule.images.splice(i, 1);
        };

        NavigationService.getAllAgeGroups(function (data) {
            console.log(data);
            if (data.value != false) {
                $scope.agegroup = data.data;
            } else {
                $scope.agegroup = [];
            }
        });

        NavigationService.getSchoolList(function (data) {
            console.log(data);
            if (data.value != false) {
                $scope.school = data.data;
            } else {
                $scope.school = [];
            }
        });


        $scope.getStudent = function (search) {
            if (search.length >= 2) {
                var obj = {};
                obj.search = search;
                obj.student = $scope.sportrule.featured;
                console.log($scope.sportrule.featured);
                NavigationService.getStudent(obj, function (data) {
                    if (data && data.value != false) {
                        $scope.students = data.data;
                    } else {
                        $scope.students = [];
                    }
                });
            } else {
                $scope.students = [];
            }
        }
        $scope.getTeam = function (search) {
            if (search.length >= 2) {
                var obj = {};
                obj.search = search;
                obj.team = $scope.sportrule.featuredTeam;
                NavigationService.getTeam(obj, function (data) {
                    if (data && data.value != false) {
                        $scope.teams = data.data;
                    } else {
                        $scope.teams = [];
                    }
                });
            } else {
                $scope.students = [];
            }
        }

        $scope.saveStudent = function (data, select) {
            console.log(select);
            $scope.sportrule.student = select.selected;
        }
        $scope.saveTeam = function (data, select) {
            console.log(select);
            $scope.sportrule.team = select.selected;
        }

        $scope.addCont = function (crdv) {
            if (!crdv.eligibilityTable) {
                crdv.eligibilityTable = [{
                    "agegroup": "",
                    "date": ""
                }];
            } else {
                crdv.eligibilityTable.push({
                    "agegroup": "",
                    "date": ""
                });
            }
        };

        $scope.addWin = function (crdv) {
            if (!crdv.winnerTable) {
                crdv.winnerTable = [{
                    "category": "",
                    "school": ""
                }];
            } else {
                crdv.winnerTable.push({
                    "category": "",
                    "school": ""
                });
            }
        };

        $scope.addTeam = function (crdv) {
            if (!crdv.teamTable) {
                crdv.teamTable = [{
                    "category": "",
                    "school": ""
                }];
            } else {
                crdv.teamTable.push({
                    "category": "",
                    "school": ""
                });
            }
        };

        $scope.addAge = function (crdv) {
            if (!crdv.ageGroupTable) {
                crdv.ageGroupTable = [{}];
            } else {
                crdv.ageGroupTable.push({});
            }
        };

        $scope.confDelete = function (val) {
            if ($scope.deleteVal === 1) {
                $scope.sportrule.eligibilityTable.splice($.jStorage.get("deleteEligibilityTable"), 1);
            } else if ($scope.deleteVal === 2) {
                $scope.sportrule.winnerTable.splice($.jStorage.get("deleteWinnerTable"), 1);
            } else if ($scope.deleteVal === 3) {
                $scope.sportrule.teamTable.splice($.jStorage.get("deleteTeamTable"), 1);
            } else if ($scope.deleteVal === 4) {
                $scope.sportrule.ageGroupTable.splice($.jStorage.get("deleteAgeGroupTable"), 1);
            }
        };

        $scope.deleteFunc = function (id, value) {
            if (value === 1) {
                $scope.deleteVal = 1;
                $.jStorage.set("deleteEligibilityTable", id);
            } else if (value === 2) {
                $scope.deleteVal = 2;
                $.jStorage.set("deleteWinnerTable", id);
            } else if (value === 3) {
                $scope.deleteVal = 3;
                $.jStorage.set("deleteTeamTable", id);
            } else if (value === 4) {
                $scope.deleteVal = 4;
                $.jStorage.set("deleteAgeGroupTable", id);
            }
            $uibModal.open({
                animation: true,
                templateUrl: "views/content/delete.html",
                scope: $scope
            });
        };

        $scope.saveSportRule = function () {
            NavigationService.saveSportRule($scope.sportrule, function (data) {
                if (data.value != false) {
                    $state.go('sportrule');
                }
            });
        };
    })

    .controller('editSportRuleCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $stateParams, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createsportrule");
        $scope.menutitle = NavigationService.makeactive("Sport Rule");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.pageName = "Edit Sport Rule";
        $scope.sportrule = {};
        $scope.deleteVal = "";
        $scope.tinymceOptions = {
            selector: 'textarea',
            height: 500,
            theme: 'modern',
            plugins: [
                'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                'searchreplace wordcount visualblocks visualchars code fullscreen',
                'insertdatetime media nonbreaking save table contextmenu directionality',
                'emoticons template paste textcolor colorpicker textpattern imagetools '
            ],
            toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
            toolbar2: 'print preview media | forecolor backcolor emoticons',
            image_advtab: true,
            templates: [{
                title: 'Test template 1',
                content: 'Test 1'
            }, {
                title: 'Test template 2',
                content: 'Test 2'
            }],
            content_css: [
                '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                '//www.tinymce.com/css/codepen.min.css'
            ]
        };
        NavigationService.getAllSportList(function (data) {
            $scope.sportlist = data.data;
        });

        $scope.removeimage = function (i) {
            $scope.sportrule.images.splice(i, 1);
        };

        $scope.selectContent = function (id) {
            NavigationService.getOneSportList(id, function (data) {
                console.log(data.data);
                if (data.value != false) {
                    $scope.contentheader = data.data.tableContent;
                } else {
                    $scope.contentheader = [];
                }
            });
        };



        NavigationService.getOneSportRule($stateParams.id, function (data) {
            console.log(data);
            if (data.value != false) {
                $scope.sportrule = data.data;
                $scope.contentheader = _.cloneDeep($scope.sportrule.sportid.tableContent);
                if ($scope.sportrule.fromDate) {
                    $scope.sportrule.fromDate = new Date($scope.sportrule.fromDate);
                }
                if ($scope.sportrule.toDate) {
                    $scope.sportrule.toDate = new Date($scope.sportrule.toDate);
                }
                if ($scope.sportrule.lastDate) {
                    $scope.sportrule.lastDate = new Date($scope.sportrule.lastDate);
                }
                if ($scope.sportrule.eligibilityTable && $scope.sportrule.eligibilityTable.length > 0) {
                    _.each($scope.sportrule.eligibilityTable, function (n) {
                        if (n.date) {
                            n.date = new Date(n.date);
                        }
                    });
                }
                if (!$scope.sportrule.featured) {
                    $scope.sportrule.featured = [];
                }
            }
        })
        NavigationService.getAllAgeGroups(function (data) {
            console.log(data);
            if (data.value != false) {
                $scope.agegroup = data.data;
            } else {
                $scope.agegroup = [];
            }
        });

        NavigationService.getSchoolList(function (data) {
            console.log(data);
            if (data.value != false) {
                $scope.school = data.data;
            } else {
                $scope.school = [];
            }
        });

        $scope.getStudent = function (search) {
            if (search.length >= 2) {
                var obj = {};
                obj.search = search;
                obj.student = $scope.sportrule.featured;
                NavigationService.getStudent(obj, function (data) {
                    if (data && data.value != false) {
                        $scope.students = data.data;
                    } else {
                        $scope.students = [];
                    }
                });
            } else {
                $scope.students = [];
            }
        }
        $scope.getTeam = function (search) {
            if (search.length >= 2) {
                var obj = {};
                obj.search = search;
                obj.team = $scope.sportrule.featuredTeam;
                NavigationService.getTeam(obj, function (data) {
                    if (data && data.value != false) {
                        $scope.teams = data.data;
                    } else {
                        $scope.teams = [];
                    }
                });
            } else {
                $scope.teams = [];
            }
        }

        $scope.saveStudent = function (data, select) {
            console.log(select);
            $scope.sportrule.student = select.selected;
        }
        $scope.saveTeam = function (data, select) {
            console.log(select);
            $scope.sportrule.team = select.selected;
        }

        $scope.addCont = function (crdv) {
            if (!crdv.eligibilityTable) {
                crdv.eligibilityTable = [{
                    "agegroup": "",
                    "date": ""
                }];
            } else {
                crdv.eligibilityTable.push({
                    "agegroup": "",
                    "date": ""
                });
            }
        };

        $scope.addWin = function (crdv) {
            if (!crdv.winnerTable) {
                crdv.winnerTable = [{
                    "category": "",
                    "school": ""
                }];
            } else {
                crdv.winnerTable.push({
                    "category": "",
                    "school": ""
                });
            }
        };

        $scope.addTeam = function (crdv) {
            if (!crdv.teamTable) {
                crdv.teamTable = [{
                    "category": "",
                    "school": ""
                }];
            } else {
                crdv.teamTable.push({
                    "category": "",
                    "school": ""
                });
            }
        };

        $scope.addAge = function (crdv) {
            if (!crdv.ageGroupTable) {
                crdv.ageGroupTable = [{}];
            } else {
                crdv.ageGroupTable.push({});
            }
        };

        $scope.confDelete = function (val) {
            if ($scope.deleteVal === 1) {
                $scope.sportrule.eligibilityTable.splice($.jStorage.get("deleteEligibilityTable"), 1);
            } else if ($scope.deleteVal === 2) {
                $scope.sportrule.winnerTable.splice($.jStorage.get("deleteWinnerTable"), 1);
            } else if ($scope.deleteVal === 3) {
                $scope.sportrule.teamTable.splice($.jStorage.get("deleteTeamTable"), 1);
            } else if ($scope.deleteVal === 4) {
                $scope.sportrule.ageGroupTable.splice($.jStorage.get("deleteAgeGroupTable"), 1);
            }
        };

        $scope.deleteFunc = function (id, value) {
            if (value === 1) {
                $scope.deleteVal = 1;
                $.jStorage.set("deleteEligibilityTable", id);
            } else if (value === 2) {
                $scope.deleteVal = 2;
                $.jStorage.set("deleteWinnerTable", id);
            } else if (value === 3) {
                $scope.deleteVal = 3;
                $.jStorage.set("deleteTeamTable", id);
            } else if (value === 4) {
                $scope.deleteVal = 4;
                $.jStorage.set("deleteAgeGroupTable", id);
            }
            $uibModal.open({
                animation: true,
                templateUrl: "views/content/delete.html",
                scope: $scope
            });
        };

        $scope.saveSportRule = function () {
            console.log($scope.sportrule);
            NavigationService.saveSportRule($scope.sportrule, function (data) {
                console.log(data);
                if (data.value != false) {
                    $state.go('sportrule');
                }
            });
        };

    })

    .controller('languageCtrl', function ($scope, TemplateService, $translate, $rootScope) {

        $scope.changeLanguage = function () {
            console.log("Language CLicked");

            if (!$.jStorage.get("language")) {
                $translate.use("hi");
                $.jStorage.set("language", "hi");
            } else {
                if ($.jStorage.get("language") == "en") {
                    $translate.use("hi");
                    $.jStorage.set("language", "hi");
                } else {
                    $translate.use("en");
                    $.jStorage.set("language", "en");
                }
            }
        };
    })

    .controller('CityRuleCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal, $stateParams, toastr, $state, $rootScope) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("city-rule");
        $scope.menutitle = NavigationService.makeactive("City Rule");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.city = $stateParams.city;
        $scope.institutionType = $stateParams.type;
        $scope.contentLoaded = false;
        $scope.formData = {};
        $scope.formData.page = 1;
        $scope.formData.type = '';
        $scope.formData.keyword = '';
        $scope.value = '';
        // $scope.selectedStatus = 'All';
        $scope.searchInTable = function (data) {
            $scope.formData.page = 1;
            if (data.length >= 2) {
                $scope.formData.keyword = data;
                $scope.viewTable();
            } else if (data.length == '') {
                $scope.formData.keyword = data;
                $scope.viewTable();
            }
        }
        $scope.viewTable = function () {
            $scope.formData.page = $scope.formData.page++;
            $scope.formData.city = $stateParams.city;
            $scope.formData.institutionType = $stateParams.type;
            NavigationService.getAllRules($scope.formData, function (data) {
                console.log("data.value", data);
                if (_.isEmpty(data.data.data)) {
                    $scope.cityrule = data.data.data;
                    $scope.value = 'null';
                } else {
                    $scope.contentLoaded = true;
                    $scope.cityrule = data.data.data;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = 10;
                }

            });

        }
        $scope.viewTable();
        $scope.deleteFunc = function (data) {
            console.log(data);
            $rootScope.id = data;
            $scope.modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/content/delete.html',
                backdrop: 'static',
                keyboard: false,
                size: 'sm',
                scope: $scope

            });
        };

        $scope.noDelete = function () {
            $scope.modalInstance.close();
        }
        $scope.confDelete = function (data) {
            console.log(data);
            $scope.constraints = {};
            $scope.constraints._id = $rootScope.id;
            console.log($scope.constraints)
            NavigationService.deleteRules($scope.constraints, function (data) {
                console.log("data.value", data);
                if (data.value) {
                    toastr.success('Successfully Deleted', 'Rules Message');
                    $scope.modalInstance.close();
                    $scope.viewTable();
                } else {
                    toastr.error('Something went wrong while Deleting', 'Rules Message');
                }
            });
        }
    })

    .controller('detailCityRuleCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $uibModal, $stateParams, $filter, $state, $stateParams, toastr, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("detail-rule");
        $scope.menutitle = NavigationService.makeactive("Detail City Rule");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.formData = {};
        $scope.formData.city = $stateParams.city;
        $scope.formData.institutionType = $stateParams.type;
        $scope.tinymceOptions = {
            selector: 'textarea',
            height: 500,
            theme: 'modern',
            plugins: [
                'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                'searchreplace wordcount visualblocks visualchars code fullscreen',
                'insertdatetime media nonbreaking save table contextmenu directionality',
                'emoticons template paste textcolor colorpicker textpattern imagetools '
            ],
            toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
            toolbar2: 'print preview media | forecolor backcolor emoticons',
            image_advtab: true,
            templates: [{
                title: 'Test template 1',
                content: 'Test 1'
            }, {
                title: 'Test template 2',
                content: 'Test 2'
            }],
            content_css: [
                '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                '//www.tinymce.com/css/codepen.min.css'
            ]
        };
        $scope.deleteVal = "";
        console.log('enter');

        if ($stateParams.id !== '') {
            //edit
            $scope.title = 'Edit';
            $scope.getOneOldSchoolById = function () {
                // $scope.url = "Rules/getOne";
                $scope.constraints = {};
                $scope.constraints._id = $stateParams.id;
                // $scope.constraints.city = $stateParams.city;
                // $scope.constraints.institutionType = $stateParams.type;
                NavigationService.getRules($scope.constraints, function (data) {
                    console.log(data);
                    $scope.formData = data.data;
                });

            };
            $scope.getOneOldSchoolById();
            $scope.saveData = function (data) {
                if (data) {
                    NavigationService.saveRules(data, function (data) {
                        // console.log("data.value", data);
                        // if (data.data.nModified == '1') {


                        // }
                        toastr.success(" Updated Successfully", "Rules Message");
                        $state.go('cityrule', {
                            city: $stateParams.city,
                            type: $stateParams.type
                        });

                    });
                } else {
                    toastr.error("invalid data", "Rules Message");
                }
            };
            //edit
        } else {
            $scope.title = "Create";
            $scope.saveData = function (data) {
                if (data) {
                    console.log(data);
                    NavigationService.saveRules(data, function (data) {
                        console.log("data.value", data);
                        if (data.value === true) {
                            toastr.success(" Saved Successfully", "Rules Message");
                            $state.go('cityrule', {
                                city: $stateParams.city,
                                type: $stateParams.type
                            });
                        }
                    });
                } else {
                    toastr.error("invalid data", "Rules Message");
                }
            };
        }
        //cancel
        $scope.onCancel = function (sendTo) {
            $state.go(sendTo, {
                city: $stateParams.city,
                type: $stateParams.type
            });
        };
        $scope.addCont = function (crdv) {
            console.log('enter', crdv)
            if (!crdv.eligibilityTable) {
                crdv.eligibilityTable = [{
                    "agegroup": "",
                    "date": ""
                }];
            } else {
                crdv.eligibilityTable.push({
                    "agegroup": "",
                    "date": ""
                });
            }
        };
        $scope.addAge = function (crdv) {
            if (!crdv.ageGroupTable) {
                crdv.ageGroupTable = [{
                    "agegroup": "",
                    "weight": ""
                }];
            } else {
                crdv.ageGroupTable.push({
                    "agegroup": "",
                    "weight": ""
                });
            }
        };

        $scope.confDelete = function (val) {
            if ($scope.deleteVal === 1) {
                $scope.formData.eligibilityTable.splice($.jStorage.get("deleteEligibilityTable"), 1);
            }
            // else if ($scope.deleteVal === 2) {
            //     $scope.formData.winnerTable.splice($.jStorage.get("deleteWinnerTable"), 1);
            // } else if ($scope.deleteVal === 3) {
            //     $scope.formData.teamTable.splice($.jStorage.get("deleteTeamTable"), 1);
            // }
            else if ($scope.deleteVal === 4) {
                $scope.formData.ageGroupTable.splice($.jStorage.get("deleteAgeGroupTable"), 1);
            }
        };

        $scope.deleteFunc = function (id, value) {
            if (value === 1) {
                $scope.deleteVal = 1;
                $.jStorage.set("deleteEligibilityTable", id);
                // $scope.confDel($.jStorage.set("deleteEligibilityTable", id));
            }
            //  else if (value === 2) {
            //     $scope.deleteVal = 2;
            //     $.jStorage.set("deleteWinnerTable", id);
            // } else if (value === 3) {
            //     $scope.deleteVal = 3;
            //     $.jStorage.set("deleteTeamTable", id);
            // }
            else if (value === 4) {
                $scope.deleteVal = 4;
                $.jStorage.set("deleteAgeGroupTable", id);
            }
            $scope.modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/content/delete.html',
                backdrop: 'static',
                keyboard: false,
                size: 'sm',
                scope: $scope

            });
        };
        $scope.noDelete = function () {
            $scope.modalInstance.close();
        };
        //end cancel


    })
    .controller('rankingTableDashboardCtrl', function ($scope, TemplateService, NavigationService, $timeout, $rootScope, toastr, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("rankingtable-dashboard");
        $scope.menutitle = NavigationService.makeactive("Ranking Table");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.value = '';
        $scope.getAllRankingTable = function () {
            NavigationService.getAllRankingTables(function (response) {
                if (response.value) {
                    if (response.data) {
                        $scope.rankingtableData = response.data;
                        console.log("response", response);
                    } else {
                        $scope.value = null;
                    }

                }
            });
        };
        $scope.getAllRankingTable();

        $scope.deleteFunc = function (data) {
            console.log(data);
            $rootScope.deleteId = data;
            $scope.modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/content/delete.html',
                backdrop: 'static',
                keyboard: false,
                size: 'sm',
                scope: $scope

            });
        };

        $scope.noDelete = function () {
            $scope.modalInstance.close();
        }
        $scope.confDelete = function (data) {
            console.log(data);
            $scope.constraints = {};
            $scope.constraints._id = $rootScope.deleteId;
            console.log($scope.constraints)
            $scope.url = 'LiveUpdate/deleteData',
                NavigationService.deleteRecord($scope.constraints, $scope.url, function (data) {
                    console.log("data.value", data);
                    if (data.value) {
                        toastr.success('Successfully Deleted', 'Rules Message');
                        $scope.modalInstance.close();
                        $scope.getAllRankingTable();
                    } else {
                        toastr.error('Something went wrong while Deleting', 'Rules Message');
                    }
                });
        }
    })
    .controller('createRankingTableCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr, $stateParams, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createrankingtable");
        $scope.menutitle = NavigationService.makeactive("Ranking Table");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.cityList = ['mumbai', 'hyderabad', 'ahmedabad'];
        $scope.institutionType = ['school', 'college'];
        $scope.formData = {};
        $scope.formData.rankingTable = [];
        $scope.addRow = function (formData) {
            if (!formData) {
                $scope.formData.rankingTable.push(
                    {
                        "rank": '',
                        "schoolName": '',
                        "goldPoints": '',
                        "silverPoints": '',
                        "bronzePoints": '',
                        "totalPoints": ''
                    },
                )
            } else {
                formData.rankingTable.push(
                    {
                        "rank": '',
                        "schoolName": '',
                        "goldPoints": '',
                        "silverPoints": '',
                        "bronzePoints": '',
                        "totalPoints": ''
                    },
                )
            }


        }
        $scope.addRow();

        if (!$stateParams.id) {
            //Create
            $scope.pageName = "Create";
            $scope.saveData = function (formData) {
                console.log('formData', formData);
                if (formData && formData.city && formData.institutionType) {
                    NavigationService.saveRankingTable(formData, function (response) {
                        console.log("response", response);
                        if (response.value) {
                            toastr.success("Saved successfully", 'Success Message');
                            $state.go('rankingTabledashboard');
                        }
                    })
                } else {
                    toastr.error('Please fill all fields', 'Error Message');
                }

            }

        } else {
            //edit
            $scope.pageName = "Edit";
            if ($stateParams.id) {
                $scope.constraints = {};

                $scope.constraints._id = $stateParams.id;
                $scope.url = 'LiveUpdate/getOne';
                NavigationService.getOneRecord($scope.constraints, $scope.url, function (response) {
                    console.log(response, "response");
                    if (response.value) {
                        $scope.formData = response.data;
                    }
                })

                $scope.saveData = function (formData) {
                    console.log('formData', formData);
                    formData._id = $stateParams.id;
                    if (formData && formData.city && formData.institutionType) {
                        NavigationService.saveRankingTable(formData, function (response) {
                            console.log("response", response);
                            if (response.value) {

                                toastr.success("Saved successfully", 'Success Message');
                                $state.go('rankingTabledashboard');
                            }
                        })

                    } else {
                        toastr.error('Please fill all fields', 'Error Message');
                    }

                }
            }

        }

        $scope.deleteRow = function (formData, index) {
            formData.rankingTable.splice(index, 1);
        }




    })
    .controller('createSpecialEventCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr, $stateParams, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createspecialevent");
        $scope.menutitle = NavigationService.makeactive("Special Event");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.cityList = ['mumbai', 'hyderabad', 'ahmedabad'];
        $scope.formData = {};
        if (!$stateParams.id) {
            //Create
            $scope.saveData = function (formData) {
                $scope.url = 'SpecialEvents/saveData',
                    NavigationService.saveLiveData(formData, $scope.url, function (response) {
                        console.log("response", response);
                        if (response.value) {
                            toastr.success("Saved successfully", 'Success Message');
                            $state.go('specialEventsdashboard');
                        }
                    })
            }


        } else {
            //edit
            $scope.pageName = "Edit";
            if ($stateParams.id) {
                $scope.constraints = {};

                $scope.constraints._id = $stateParams.id;
                $scope.url = 'SpecialEvents/getOne';
                NavigationService.getOneRecord($scope.constraints, $scope.url, function (response) {
                    console.log(response, "response");
                    if (response.value) {
                        $scope.formData = response.data;
                        $scope.formData.eventDate = new Date(response.data.eventDate);
                    }
                })

                $scope.saveData = function (formData) {
                    console.log('formData', formData);
                    $scope.url = 'SpecialEvents/saveData',
                        formData._id = $stateParams.id;
                    if (formData) {
                        NavigationService.saveLiveData(formData, $scope.url, function (response) {
                            console.log("response", response);
                            if (response.value) {

                                toastr.success("Saved successfully", 'Success Message');
                                $state.go('specialEventsdashboard');
                            }
                        })

                    } else {
                        toastr.error('Please fill all fields', 'Error Message');
                    }

                }
            }
        }
    })

    .controller('createAlbumCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr, $stateParams, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createalbum");
        $scope.menutitle = NavigationService.makeactive("Create Album");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.formData = {};
        $scope.formData.albumImages = [];


        $scope.cityList = ['mumbai', 'hyderabad', 'ahmedabad'];
        if (!$stateParams.id) {
            //Create
            $scope.saveData = function (formData) {
                $scope.url = 'LiveAlbum/saveData'
                NavigationService.saveLiveData(formData, $scope.url, function (response) {
                    console.log("response", response);
                    if (response.value) {
                        toastr.success("Saved successfully", 'Success Message');
                        $state.go('liveAlbumdashboard');
                    }
                })
            }
        } else {
            //edit
            $scope.pageName = "Edit";
            if ($stateParams.id) {
                $scope.constraints = {};

                $scope.constraints._id = $stateParams.id;
                $scope.url = 'LiveAlbum/getOne';
                NavigationService.getOneRecord($scope.constraints, $scope.url, function (response) {
                    console.log(response, "response");
                    if (response.value) {
                        $scope.formData = response.data;
                    }
                })

                $scope.saveData = function (formData) {
                    $scope.url = 'LiveAlbum/saveData';
                    console.log('formData', formData);
                    formData._id = $stateParams.id;
                    if (formData) {
                        NavigationService.saveLiveData(formData, $scope.url, function (response) {
                            console.log("response", response);
                            if (response.value) {

                                toastr.success("Saved successfully", 'Success Message');
                                $state.go('liveAlbumdashboard');
                            }
                        })

                    } else {
                        toastr.error('Please fill all fields', 'Error Message');
                    }

                }
            }
        }

    })
    .controller('createPhotosCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr, $stateParams, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createphotos");
        $scope.menutitle = NavigationService.makeactive("Create Photos");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.formData = {};


        $scope.cityList = ['mumbai', 'hyderabad', 'ahmedabad'];
        if (!$stateParams.id) {
            //Create
            $scope.saveData = function (formData) {
                $scope.url = 'LivePhotos/saveData',
                    NavigationService.saveLiveData(formData, $scope.url, function (response) {
                        console.log("response", response);
                        if (response.value) {
                            toastr.success("Saved successfully", 'Success Message');
                            $state.go('livePhotosdashboard');
                        }
                    })
            }


        } else {
            //edit
            $scope.pageName = "Edit";
            if ($stateParams.id) {
                $scope.constraints = {};

                $scope.constraints._id = $stateParams.id;
                $scope.url = 'LivePhotos/getOne';
                NavigationService.getOneRecord($scope.constraints, $scope.url, function (response) {
                    console.log(response, "response");
                    if (response.value) {
                        $scope.formData = response.data;
                    }
                })

                $scope.saveData = function (formData) {
                    console.log('formData', formData);
                    $scope.url = 'LivePhotos/saveData',
                        formData._id = $stateParams.id;
                    if (formData) {
                        NavigationService.saveLiveData(formData, $scope.url, function (response) {
                            console.log("response", response);
                            if (response.value) {

                                toastr.success("Saved successfully", 'Success Message');
                                $state.go('livePhotosdashboard');
                            }
                        })

                    } else {
                        toastr.error('Please fill all fields', 'Error Message');
                    }

                }
            }
        }

    })
    .controller('createTickerCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr, $stateParams, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createticker");
        $scope.menutitle = NavigationService.makeactive("Create Ticker");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.formData = {};
        $scope.formData.tickerDetails = [];
        // $scope.formData.


        $scope.cityList = ['mumbai', 'hyderabad', 'ahmedabad'];
        if (!$stateParams.id) {
            //Create
            $scope.saveData = function (formData) {
                console.log('formData', formData);
                $scope.url = 'Ticker/saveData'
                NavigationService.saveLiveData(formData, $scope.url, function (response) {
                    console.log("response", response);
                    if (response.value) {
                        toastr.success("Saved successfully", 'Success Message');
                        $state.go('ticker');
                    }
                })
            }
        } else {
            //edit
            $scope.pageName = "Edit";
            if ($stateParams.id) {
                $scope.constraints = {};
                $scope.constraints._id = $stateParams.id;
                $scope.url = 'Ticker/getOne';
                NavigationService.getOneRecord($scope.constraints, $scope.url, function (response) {
                    console.log(response, "response");
                    if (response.value) {
                        $scope.formData = response.data;
                    }
                })
                $scope.saveData = function (formData) {
                    $scope.url = 'Ticker/saveData';
                    console.log('formData', formData);
                    formData._id = $stateParams.id;
                    if (formData) {
                        NavigationService.saveLiveData(formData, $scope.url, function (response) {
                            console.log("response", response);
                            if (response.value) {

                                toastr.success("Saved successfully", 'Success Message');
                                $state.go('ticker');
                            }
                        })

                    } else {
                        toastr.error('Please fill all fields', 'Error Message');
                    }

                }
            }
        }

        $scope.addRow = function (formData) {
            if (formData) {
                formData.tickerDetails.push(
                    {
                        'tickerContent': ''
                    }
                )
            } else {
                $scope.formData.tickerDetails = [
                    {
                        'tickerContent': ''
                    }
                ]


            }
        }
        $scope.addRow();
        $scope.deleteRow = function (formData, index) {
            if (formData) {
                formData.tickerDetails.splice(index, 1);
            }
        }

    })
    .controller('createVideoCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr, $stateParams, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createvideo");
        $scope.menutitle = NavigationService.makeactive("Create Video");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.formData = {};

        $scope.cityList = ['mumbai', 'hyderabad', 'ahmedabad'];
        $scope.videoSource = ['vimeo', 'youtube'];
        if (!$stateParams.id) {
            //Create
            $scope.saveData = function (formData) {
                $scope.url = 'LiveVideos/saveData',
                    NavigationService.saveLiveData(formData, $scope.url, function (response) {
                        console.log("response", response);
                        if (response.value) {
                            toastr.success("Saved successfully", 'Success Message');
                            $state.go('liveVideosdashboard');
                        }
                    })
            }


        } else {
            //edit
            $scope.pageName = "Edit";
            if ($stateParams.id) {
                $scope.constraints = {};

                $scope.constraints._id = $stateParams.id;
                $scope.url = 'LiveVideos/getOne';
                NavigationService.getOneRecord($scope.constraints, $scope.url, function (response) {
                    console.log(response, "response");
                    if (response.value) {
                        $scope.formData = response.data;
                    }
                })

                $scope.saveData = function (formData) {
                    console.log('formData', formData);
                    $scope.url = 'LiveVideos/saveData',
                        formData._id = $stateParams.id;
                    if (formData) {
                        NavigationService.saveLiveData(formData, $scope.url, function (response) {
                            console.log("response", response);
                            if (response.value) {

                                toastr.success("Saved successfully", 'Success Message');
                                $state.go('liveVideosdashboard');
                            }
                        })

                    } else {
                        toastr.error('Please fill all fields', 'Error Message');
                    }

                }
            }
        }
    })

    .controller('liveAlbumDashboardCtrl', function ($scope, TemplateService, NavigationService, $timeout, $rootScope, toastr, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("livealbum-dashboard");
        $scope.menutitle = NavigationService.makeactive("Album Table");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.value = '';
        $scope.getAllPhotos = function () {
            $scope.url = 'LiveAlbum/getAllAlbums',
                NavigationService.getAllAlbumsOrPhotos($scope.url, function (response) {
                    console.log(response, "response");
                    if (response.value) {
                        if (response.data) {
                            $scope.liveAlbum = response.data;

                        } else {
                            $scope.value = null;
                        }

                    }
                });
        };
        $scope.getAllPhotos();

        $scope.deleteFunc = function (data) {
            console.log(data);
            $rootScope.deleteId = data;
            $scope.modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/content/delete.html',
                backdrop: 'static',
                keyboard: false,
                size: 'sm',
                scope: $scope

            });
        };

        $scope.noDelete = function () {
            $scope.modalInstance.close();
        }
        $scope.confDelete = function (data) {
            console.log(data);
            $scope.constraints = {};
            $scope.url = 'LiveAlbum/deleteData'
            $scope.constraints._id = $rootScope.deleteId;
            console.log($scope.constraints)
            NavigationService.deleteRecord($scope.constraints, $scope.url, function (data) {
                console.log("data.value", data);
                if (data.value) {
                    toastr.success('Successfully Deleted', 'Rules Message');
                    $scope.modalInstance.close();
                    $scope.getAllPhotos();
                } else {
                    toastr.error('Something went wrong while Deleting', 'Rules Message');
                }
            });
        }
    })
    .controller('livePhotosdashboardCtrl', function ($scope, TemplateService, NavigationService, $timeout, $rootScope, toastr, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("livephotos-dashboard");
        $scope.menutitle = NavigationService.makeactive("Photos Table");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.value = '';
        $scope.getAllPhotos = function () {
            $scope.url = 'LivePhotos/getAll',
                NavigationService.getAllAlbumsOrPhotos($scope.url, function (response) {
                    console.log(response, "response");
                    if (response.value) {
                        if (response.data) {
                            $scope.allPhotos = response.data;
                            console.log(" $scope.allPhotos", $scope.allPhotos);
                        } else {
                            $scope.value = null;
                        }

                    }
                });
        };
        $scope.getAllPhotos();

        $scope.deleteFunc = function (data) {
            console.log(data);
            $rootScope.deleteId = data;
            $scope.modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/content/delete.html',
                backdrop: 'static',
                keyboard: false,
                size: 'sm',
                scope: $scope

            });
        };

        $scope.noDelete = function () {
            $scope.modalInstance.close();
        }
        $scope.confDelete = function (data) {
            console.log(data);
            $scope.constraints = {};
            $scope.constraints._id = $rootScope.deleteId;
            console.log($scope.constraints)
            $scope.url = 'LivePhotos/deleteData';
            NavigationService.deleteRecord($scope.constraints, $scope.url, function (data) {
                console.log("data.value", data);
                if (data.value) {
                    toastr.success('Successfully Deleted', 'Rules Message');
                    $scope.modalInstance.close();
                    $scope.getAllPhotos();
                } else {
                    toastr.error('Something went wrong while Deleting', 'Rules Message');
                }
            });
        }
    })
    .controller('tickerdashboardCtrl', function ($scope, TemplateService, NavigationService, $timeout, $rootScope, toastr, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("ticker-dashboard");
        $scope.menutitle = NavigationService.makeactive("Ticker Table");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.value = '';
        $scope.getAllTicker = function () {
            $scope.url = 'Ticker/getAll',
                NavigationService.getAllAlbumsOrPhotos($scope.url, function (response) {
                    console.log(response, "response");
                    if (response.value) {
                        if (response.data) {
                            $scope.alltickers = response.data;
                            console.log(" $scope.alltickers", $scope.alltickers);
                        } else {
                            $scope.value = null;
                        }

                    }
                });
        };
        $scope.getAllTicker();

        $scope.deleteFunc = function (data) {
            console.log(data);
            $rootScope.deleteId = data;
            $scope.modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/content/delete.html',
                backdrop: 'static',
                keyboard: false,
                size: 'sm',
                scope: $scope

            });
        };

        $scope.noDelete = function () {
            $scope.modalInstance.close();
        }
        $scope.confDelete = function (data) {
            console.log(data);
            $scope.constraints = {};
            $scope.constraints._id = $rootScope.deleteId;
            console.log($scope.constraints)
            $scope.url = 'Ticker/deleteData';
            NavigationService.deleteRecord($scope.constraints, $scope.url, function (data) {
                console.log("data.value", data);
                if (data.value) {
                    toastr.success('Successfully Deleted', 'Rules Message');
                    $scope.modalInstance.close();
                    $scope.getAllTicker();
                } else {
                    toastr.error('Something went wrong while Deleting', 'Rules Message');
                }
            });
        }
    })
    .controller('liveVideosdashboardCtrl', function ($scope, TemplateService, NavigationService, $timeout, $rootScope, toastr, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("livevideos-dashboard");
        $scope.menutitle = NavigationService.makeactive("Videos Table");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.value = '';
        $scope.formData = {};
        $scope.getAllVideos = function () {
            $scope.url = 'LiveVideos/getAll',
                NavigationService.getAllAlbumsOrPhotos($scope.url, function (response) {
                    console.log(response, "response");
                    if (response.value) {
                        if (response.data) {
                            $scope.allVideos = response.data;
                            console.log(" $scope.allPhotos", $scope.allVideos);
                        } else {
                            $scope.value = null;
                        }

                    }
                });
        };
        $scope.getAllVideos();

        $scope.deleteFunc = function (data) {
            console.log(data);
            $rootScope.deleteId = data;
            $scope.modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/content/delete.html',
                backdrop: 'static',
                keyboard: false,
                size: 'sm',
                scope: $scope

            });
        };

        $scope.noDelete = function () {
            $scope.modalInstance.close();
        }
        $scope.confDelete = function (data) {
            console.log(data);
            $scope.constraints = {};
            $scope.constraints._id = $rootScope.deleteId;
            console.log($scope.constraints)
            $scope.url = 'LiveVideos/deleteData';
            NavigationService.deleteRecord($scope.constraints, $scope.url, function (data) {
                console.log("data.value", data);
                if (data.value) {
                    $scope.getAllVideos();
                    toastr.success('Successfully Deleted', 'Rules Message');
                    $scope.modalInstance.close();

                } else {
                    toastr.error('Something went wrong while Deleting', 'Rules Message');
                }
            });
        }
    })
    .controller('specialEventsdashboardCtrl', function ($scope, TemplateService, NavigationService, $timeout, $rootScope, toastr, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("specialevents-dashboard");
        $scope.menutitle = NavigationService.makeactive("Special Events Table");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.value = '';
        $scope.getAllSpecialEvents = function () {
           
            $scope.url = 'SpecialEvents/getAllSpecialEvents',
                NavigationService.getAllAlbumsOrPhotos($scope.url, function (response) {
                    console.log(response, "response");
                    if (response.value) {
                        if (response.data) {
                            $scope.allEvents = response.data;
                            console.log(" $scope.allEvents", $scope.allEvents);
                        } else {
                            $scope.value = null;
                        }

                    }
                });
        };
        $scope.getAllSpecialEvents();

        $scope.deleteFunc = function (data) {
            console.log(data);
            $rootScope.deleteId = data;
            $scope.modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/content/delete.html',
                backdrop: 'static',
                keyboard: false,
                size: 'sm',
                scope: $scope

            });
        };

        $scope.noDelete = function () {
            $scope.modalInstance.close();
        }
        $scope.confDelete = function (data) {
            console.log(data);
            $scope.constraints = {};
            $scope.constraints._id = $rootScope.deleteId;
            console.log($scope.constraints)
            $scope.url = 'SpecialEvents/deleteData';
            NavigationService.deleteRecord($scope.constraints, $scope.url, function (data) {
                console.log("data.value", data);
                if (data.value) {
                    toastr.success('Successfully Deleted', 'Rules Message');
                    $scope.modalInstance.close();
                    $scope.getAllSpecialEvents();
                } else {
                    toastr.error('Something went wrong while Deleting', 'Rules Message');
                }
            });
        }
    });