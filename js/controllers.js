angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'angular-flexslider', 'ui.select', 'imageupload', 'ui.tinymce'])

.controller('headerctrl', function($scope, TemplateService, $state) {
    $scope.template = TemplateService;
    if (!$.jStorage.get("user")) {
        $state.go("login");
    }
    $scope.logout = function() {
        $.jStorage.flush();
        $state.go("login");
    };
})

.controller('LoginCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("login");
    $scope.menutitle = NavigationService.makeactive("Login");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.login = {};
    $scope.showError = false;
    $scope.loginAdmin = function() {
        NavigationService.loginAdmin($scope.login, function(data) {
            if (data.value === true) {
                $scope.showError = false;
                $.jStorage.set("user", data.data);
                $state.go("dashboard");
            } else {
                $scope.showError = true;
                $timeout(function() {
                    $scope.showError = false;
                }, 3000);
            }
        });
    };
})

.controller('DashboardCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("dashboard");
    $scope.menutitle = NavigationService.makeactive("Dashboard");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.dash = {};
    $scope.dash.year = "2015";
    $scope.allYears = NavigationService.getAllYears();
    NavigationService.countStatic(function(data) {
        console.log(data);
        $scope.static = data.data;
    });

    $scope.onChange = function() {
        NavigationService.countForDashboard($scope.dash.year, function(data) {
            console.log(data);
            $scope.dynamic = data.data;
        });
    };
    $scope.onChange();
})

.controller('schoolCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("school");
    $scope.menutitle = NavigationService.makeactive("Schools");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.template.type = 1;
    $scope.contentLoaded = false;
    $scope.schools = [];
    $scope.pagination = {};
    $scope.pagination.pagenumber = 1;

    $scope.reload = function(val) {
        if (val === 1) {
            $scope.pagination.name = "";
        } else if (val === 2) {
            $scope.pagination.sfaid = "";
        }
        NavigationService.getLimitedSchool($scope.pagination, function(data) {
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
    $scope.hideSchool = function(id, status) {
        NavigationService.hideSchool({
            _id: id,
            status: status
        }, function(data2) {
            console.log(data2);
            $scope.reload();
        });
    };
    $scope.confDelete = function() {
        NavigationService.deleteSchool(function(data, status) {
            console.log(data);
            $scope.reload();
        });
    };
    $scope.deleteFunc = function(id) {
        $.jStorage.set("deleteSchool", id);
        $uibModal.open({
            animation: true,
            templateUrl: "views/content/delete.html",
            scope: $scope
        });
    };
})

.controller('createSchoolCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $uibModal) {
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
    $scope.allYears = NavigationService.getAllYears();
    $scope.deleteId = 0;
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
    $scope.add = function(crdv) {
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
    $scope.addDept = function(crdv) {
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
    $scope.confDelete = function() {
        if ($scope.deleteId === 1) {
            $scope.school.department.splice($.jStorage.get("deleteDept"), 1);
        } else {
            $scope.school.contingentLeader.splice($.jStorage.get("deleteLeader"), 1);
        }
    };
    $scope.deleteFunc = function(id, value) {
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

    NavigationService.getAllSportListSchool(function(data) {
        console.log(data);
        $scope.sportsListArr = data;
    });

    NavigationService.getLastId(function(data) {
        if (data.value !== false) {
            $scope.school.sfaid = data.data;
        }
    });
    NavigationService.getStudentList(function(data) {
        if (data.value !== false) {
            $scope.students = data.data;
        }
    });
    $scope.showError = false;
    $scope.errorContact = false;
    $scope.errorEmail = false;
    $scope.errorSportContact = false;
    $scope.saveSchool = function() {
        var schoolSports = [];
        _.each($scope.sportsListArr, function(years) {
            _.each(years, function(category) {
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
            NavigationService.saveSchool($scope.school, function(data) {
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
            $timeout(function() {
                $scope.showError = false;
            }, 3000);
        }
    };
})

.controller('editSchoolCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createschool");
        $scope.menutitle = NavigationService.makeactive("Schools");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.pageName = "Edit School";
        $scope.school = {};
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
        $scope.add = function(crdv) {
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

        $scope.addDept = function(crdv) {
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

        $scope.confDelete = function() {
            if ($scope.deleteId === 1) {
                $scope.school.department.splice($.jStorage.get("deleteDept"), 1);
            } else {
                $scope.school.contingentLeader.splice($.jStorage.get("deleteLeader"), 1);
            }
        };
        $scope.deleteFunc = function(id, value) {
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
        NavigationService.getStudentList(function(data) {
            if (data.value !== false) {
                $scope.students = data.data;
            }
        });
        var schoolSports = [];
        $scope.showError = false;
        $scope.errorContact = false;
        $scope.errorEmail = false;
        $scope.errorSportContact = false;
        $scope.saveSchool = function() {
            var schoolSports = [];
            _.each($scope.sportsListArr, function(years) {
                _.each(years, function(category) {
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
                NavigationService.saveSchool($scope.school, function(data) {
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
                $timeout(function() {
                    $scope.showError = false;
                }, 3000);
            }
        };


        NavigationService.getOneSchool($stateParams.id, function(data) {
            if (data.value !== false) {
                $scope.school = data.data;
                NavigationService.getAllSportListSchool(function(data2) {
                    $scope.sportsListArr = data2;
                    _.each($scope.sportsListArr, function(year) {
                        _.each(year, function(category) {
                            _.each(category, function(n) {
                                console.log(data);
                                var num = _.findIndex(data.data.sports, function(m) {
                                    return (n._id == m._id && n.year == m.year);
                                });
                                if (num >= 0) {
                                    n.checked = true;
                                }
                            });
                        });
                    });
                });
            }
        });
    })
    .controller('editTeamCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, $uibModal) {
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
        if ($stateParams.id) {
            NavigationService.getOneTeam($stateParams, function(response) {
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
        /////////////////// CODE FROM CREATE TEAM
        $scope.setTeamName = function(teamName) {
            $scope.team.name = teamName;
        };
        NavigationService.getSchoolList(function(data) {
            if (data.value !== false) {
                $scope.schools = data.data;
            }
        });
        $scope.callme = function() {
            console.log("called me");
            console.log($scope.team.year);
            if ($scope.team.year && $scope.team.school && $scope.team.school._id) {
                console.log("team.year");
                NavigationService.getSchoolSports($scope.team.year.toString(), $scope.team.school._id, function(data2) {
                    console.log(data2);
                    $scope.sportsList = data2.data;
                });
            }
        };
        $scope.teamNameGenerate = function() {
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

        };
        $scope.sportSelected = function() {
            $scope.team.name = $scope.team.school.name + $scope.team;
            $scope.teamNameGenerate();
            NavigationService.filterCategory($scope.team.sport, function(data) {
                if (data) {
                    console.log(data);
                    $scope.firstcategories = data.data[0].firstcategory;
                    console.log($scope.firstcategories);
                }
            });
        };
        $scope.getCaptain = function(search) {
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

            NavigationService.findForDropSingle(obj, function(data) {
                if (data && data.value !== false) {
                    $scope.students = data.data;
                    console.log($scope.students);
                } else {
                    $scope.students = [];
                }
            });

        };
        $scope.addPlayer = function(selected) {

            $scope.team.playersArray.push(selected);
            console.log($scope.team.playersArray);
        };
        $scope.getOneSport = function(sport) {
            NavigationService.getOneSport(sport, function(data) {
                if (data.value !== false) {
                    $scope.sport = data.data;
                }
            });
        };
        $scope.getPlayers = function(search) {

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
            NavigationService.getStudentBySchool(obj, function(data) {
                if (data && data.value !== false) {
                    $scope.players = data.data;
                } else {
                    $scope.players = [];
                }
            });

        };

        NavigationService.getAllAgeGroup(function(data) {
            if (data.value) {
                $scope.agegroups = data.data;
            }
        });
        $scope.getMinMaxForTeam = function() {
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
            NavigationService.getMinMaxForTeam(minmaxforteam, function(data) {
                if (data.value) {
                    if (data.data) {
                        $scope.sport = data.data[0];
                    }
                } else {

                }
            });
        };

        $scope.savePlayer = function(data, select) {
            if ($scope.team.playersArray.length < $scope.sport.minPlayers) {
                $scope.minValid = true;
            } else {
                $scope.minValid = false;
            }
        };
        /////////////////// END CODE FROM CREATE TEAM

        $scope.checkTeam = function() {
            console.log($scope.team);
            if (!$scope.minValid) {
                $scope.team.players = _.map($scope.team.playersArray, function(key) {
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
                NavigationService.saveTeam(request, function(data) {
                    if (data.value) {
                        $state.go('team');
                    } else {

                    }
                });
            } else {

            }
        };
    })

.controller('studentCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("student");
        $scope.menutitle = NavigationService.makeactive("Students");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.contentLoaded = false;
        $scope.pagination = {};
        $scope.pagination.pagenumber = 1;

        $scope.reload = function(val) {
            if (val === 1) {
                $scope.pagination.name = "";
            } else if (val === 2) {
                $scope.pagination.sfaid = "";
            }
            NavigationService.getLimitedStudent($scope.pagination, function(data) {
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
        $scope.hideStudent = function(id, status) {
            NavigationService.hideStudent({
                _id: id,
                status: status
            }, function(data2) {
                console.log(data2);
                $scope.reload();
            });
        };
        $scope.confDelete = function() {
            NavigationService.deleteStudent(function(data, status) {
                console.log(data);
                $scope.reload();
            });
        };
        $scope.deleteFunc = function(id) {
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
    .controller('teamCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("team");
        $scope.menutitle = NavigationService.makeactive("Teams");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.contentLoaded = false;
        $scope.pagination = {};
        $scope.pagination.pagenumber = 1;

        $scope.reload = function(val) {
            if (val === 1) {
                $scope.pagination.name = "";
            } else if (val === 2) {
                $scope.pagination.sfaid = "";
            }
            NavigationService.getLimitedTeam($scope.pagination, function(data) {
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
        $scope.hideStudent = function(id, status) {
            NavigationService.hideStudent({
                _id: id,
                status: status
            }, function(data2) {
                console.log(data2);
                $scope.reload();
            });
        };
        $scope.confDelete = function() {
            NavigationService.deleteTeam($.jStorage.get("deleteTeam"), function(data, status) {
                console.log(data);
                $scope.reload();
            });
        };
        $scope.deleteFunc = function(id) {
            console.log(id);
            $.jStorage.set("deleteTeam", id);
            $uibModal.open({
                animation: true,
                templateUrl: "views/content/delete.html",
                scope: $scope
            });
        };

    })
    .controller('knockoutCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("knockout");
        $scope.menutitle = NavigationService.makeactive("Knockout");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.contentLoaded = false;
        $scope.pagination = {};
        $scope.pagination.pagenumber = 1;

        $scope.reload = function(val) {
            if (val === 1) {
                $scope.pagination.name = "";
            } else if (val === 2) {
                $scope.pagination.sfaid = "";
            }
            NavigationService.getLimitedKnockout($scope.pagination, function(data) {
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

        $scope.reload();
        $scope.hideStudent = function(id, status) {
            NavigationService.hideStudent({
                _id: id,
                status: status
            }, function(data2) {
                console.log(data2);
                $scope.reload();
            });
        };
        $scope.confDelete = function() {
            NavigationService.deleteKnockout($.jStorage.get("deleteTeam"), function(data, status) {
                console.log(data);
                $scope.reload();
            });
        };
        $scope.deleteFunc = function(id) {
            console.log(id);
            $.jStorage.set("deleteTeam", id);
            $uibModal.open({
                animation: true,
                templateUrl: "views/content/delete.html",
                scope: $scope
            });
        };

    })

.controller('createStudentCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $uibModal) {
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
        $scope.payment = ["Paid", "Unpaid"];
        $scope.student.via = "via School";
        $scope.student.payment = "Unpaid";
        $scope.validateError = {};
        $scope.validateError.valid = false;

        NavigationService.getLastStudentId(function(data) {
            console.log(data);
            if (data.value !== false) {
                $scope.student.sfaid = data.data;
            }
        });

        NavigationService.getSchoolList(function(data) {
            if (data.value !== false) {
                $scope.schools = data.data;
            }
        });

        $scope.checkStud = function() {
            if ($scope.student.school && !_.isEmpty($scope.student.school) && $scope.student.lastname && $scope.student.firstname) {
                $scope.validateError.valid = false;
                $scope.findStudObj = _.cloneDeep($scope.student);
                $scope.findStudObj.school = $scope.findStudObj.school._id;
                NavigationService.findStud($scope.findStudObj, function(data) {
                    if (data.value !== false) {
                        console.log(data.data);
                        $.jStorage.set("showstudent", data.data);
                        window.open(openTab);
                    } else {
                        $scope.validateError.valid = true;
                        $scope.validateError.message = "Student Was Not Found";
                        $timeout(function() {
                            $scope.validateError.valid = false;
                        }, 3000);
                    }
                });
            } else {
                console.log('test');
                $scope.validateError.valid = true;
                $scope.validateError.message = "Please enter required fields for checking.";
                $timeout(function() {
                    $scope.validateError.valid = false;
                }, 3000);
            }
        };
        $scope.showError = false;
        $scope.errorContact = false;
        $scope.errorEmail = false;
        $scope.errorSportContact = false;
        $scope.saveStudent = function() {

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
                NavigationService.saveStudent($scope.student, function(data) {
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
                $timeout(function() {
                    $scope.showError = false;
                }, 3000);
            }
        };
    })
    .controller('createTeamCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createteam");
        $scope.menutitle = NavigationService.makeactive("Teams");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.team = {};
        $scope.team.playersArray = [];
        // $scope.team.captain = [];
        // $scope.team.agegroup = {};
        $scope.minValid = false;

        // NavigationService.getStudentList(function(data) {
        //     if (data.value !== false) {
        //         $scope.students = data.data;
        //     }
        // });

        $scope.setTeamName = function(teamName) {
            $scope.team.name = teamName;
        };
        NavigationService.getSchoolList(function(data) {
            if (data.value !== false) {
                $scope.schools = data.data;
            }
        });
        $scope.callme = function() {
            console.log("called me");
            console.log($scope.team.year);
            if ($scope.team.year && $scope.team.school && $scope.team.school._id) {
                console.log("team.year");
                NavigationService.getSchoolSports($scope.team.year.toString(), $scope.team.school._id, function(data2) {
                    console.log(data2);
                    $scope.sportsList = data2.data;
                });
            }
        };
        $scope.teamNameGenerate = function() {
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

        };
        $scope.sportSelected = function() {
            $scope.team.name = $scope.team.school.name + $scope.team;
            $scope.teamNameGenerate();
            NavigationService.filterCategory($scope.team.sport, function(data) {
                if (data) {
                    console.log(data);
                    $scope.firstcategories = data.data[0].firstcategory;
                    console.log($scope.firstcategories);
                }
            });
        };
        $scope.getCaptain = function(search) {
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

            NavigationService.findForDropSingle(obj, function(data) {
                if (data && data.value !== false) {
                    $scope.students = data.data;
                    console.log($scope.students);
                } else {
                    $scope.students = [];
                }
            });

        };
        $scope.addPlayer = function(selected) {

            $scope.team.playersArray.push(selected);
            console.log($scope.team.playersArray);
        };
        $scope.getOneSport = function(sport) {
            NavigationService.getOneSport(sport, function(data) {
                if (data.value !== false) {
                    $scope.sport = data.data;
                }
            });
        };
        $scope.getPlayers = function(search) {

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
            NavigationService.getStudentBySchool(obj, function(data) {
                if (data && data.value !== false) {
                    $scope.players = data.data;
                } else {
                    $scope.players = [];
                }
            });

        };

        NavigationService.getAllAgeGroup(function(data) {
            if (data.value) {
                $scope.agegroups = data.data;
            }
        });
        $scope.getMinMaxForTeam = function() {
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
            NavigationService.getMinMaxForTeam(minmaxforteam, function(data) {
                if (data.value) {
                    if (data.data) {
                        $scope.sport = data.data[0];
                    }
                } else {

                }
            });
        };

        $scope.savePlayer = function(data, select) {
            if ($scope.team.playersArray.length < $scope.sport.minPlayers) {
                $scope.minValid = true;
            } else {
                $scope.minValid = false;
            }
        };

        $scope.checkTeam = function() {
            console.log($scope.team);
            if (!$scope.minValid) {
                $scope.team.players = _.map($scope.team.playersArray, function(key) {
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
                NavigationService.saveTeam(request, function(data) {
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
    .controller('createKnockoutCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createknockout");
        $scope.menutitle = NavigationService.makeactive("Teams");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.knockout  = {};
        $scope.knockout.roundno = 0;
        $scope.statuses = {};
        $scope.statuses.inedit = false;
        $scope.knockout.event = "Knockout";
        $scope.sportSelected = function() {

        };

        NavigationService.getAllSportList(function(response) {
            if (response.value) {
                $scope.sportsList = response.data;
            }
        });
        NavigationService.getAllAgeGroup(function(data) {
            if (data.value) {
                $scope.agegroups = data.data;
            }
        });
        $scope.getLastOrder = function() {
            var constraints = {};
            constraints = {
                "sport": $scope.knockout.sport._id,
                "agegroup": $scope.knockout.agegroup._id,
                "participantType": $scope.knockout.participantType,
                "gender": $scope.knockout.gender,
                "event": $scope.knockout.event,
                "roundno": $scope.knockout.roundno
            };
            NavigationService.getLastOrder(constraints, function(response) {
                if (response.value) {
                    $scope.knockout.order = parseInt(response.data) + 1;
                } else {
                    $scope.knockout.order = 0;
                }
            });
        };
        $scope.getParticipants = function() {
            if ($scope.knockout.year && $scope.knockout.participantType && $scope.knockout.sport && $scope.knockout.sport._id) {
                if ($scope.knockout.participantType == "player") {
                    $scope.getPlayers();
                } else {

                }
            }
        };
        $scope.getKnockoutPlayer = function(search) {
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
                constraints.sport = $scope.knockout.sport._id;
            }
            if ($scope.knockout.gender) {
                constraints.gender = $scope.knockout.gender;
            }
            constraints.year = $scope.knockout.year.toString();
            NavigationService.getStudentsbySport(constraints, function(data) {
                if (data && data.value !== false) {
                    $scope.students = data.data;
                } else {
                    $scope.students = [];
                }
            });

        };
        $scope.submitKnockout = function() {
            console.log($scope.knockout);
            var request = {};
            request = $scope.knockout;
            request.sport = $scope.knockout.sport._id;
            request.player1 = $scope.knockout.player1._id;
            request.player2 = $scope.knockout.player2._id;
            request.agegroup = $scope.knockout.agegroup._id;
            request.year = $scope.knockout.year.toString();
            NavigationService.submitKnockout(request, function(data) {
                if (data.value) {
                    $state.go("knockout");
                } else {
                    //error
                }
            });
        };



    })
    .controller('editKnockoutCtrl', function($scope, TemplateService, $stateParams, NavigationService, $timeout, $state, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createknockout");
        $scope.menutitle = NavigationService.makeactive("Teams");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.knockout  = {};
        $scope.knockout.roundno = 0;
        $scope.statuses = {};
        $scope.statuses.inedit = true;
        $scope.knockout.event = "Knockout";


        NavigationService.getAllSportList(function(response) {
            if (response.value) {
                $scope.sportsList = response.data;
            }
        });
        NavigationService.getAllAgeGroup(function(data) {
            if (data.value) {
                $scope.agegroups = data.data;
            }
        });
        $scope.getLastOrder = function() {
            var constraints = {};
            if(!$stateParams.id){
              constraints = {
                  "sport": $scope.knockout.sport._id,
                  "agegroup": $scope.knockout.agegroup._id,
                  "participantType": $scope.knockout.participantType,
                  "gender": $scope.knockout.gender,
                  "event": $scope.knockout.event,
                  "roundno": $scope.knockout.roundno
              };
              NavigationService.getLastOrder(constraints, function(response) {
                  if (response.value) {
                      $scope.knockout.order = parseInt(response.data) + 1;
                  } else {
                      $scope.knockout.order = 0;
                  }
              });
            }
        };
        $scope.getParticipants = function() {
            if ($scope.knockout.year && $scope.knockout.participantType && $scope.knockout.sport && $scope.knockout.sport._id) {
                if ($scope.knockout.participantType == "player") {
                    $scope.getPlayers();
                } else {

                }
            }
        };
        $scope.getKnockoutPlayer = function(search) {
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
                constraints.sport = $scope.knockout.sport._id;
            }
            if ($scope.knockout.gender) {
                constraints.gender = $scope.knockout.gender;
            }
            constraints.year = $scope.knockout.year.toString();
            NavigationService.getStudentsbySport(constraints, function(data) {
                if (data && data.value !== false) {
                    $scope.students = data.data;
                } else {
                    $scope.students = [];
                }
            });

        };
        $scope.submitKnockout = function() {
            console.log($scope.knockout);
            var request = {};
            request = $scope.knockout;
            request.sport = $scope.knockout.sport._id;
            request.player1 = $scope.knockout.player1._id;
            request.player2 = $scope.knockout.player2._id;
            request.agegroup = $scope.knockout.agegroup._id;
            request.year = $scope.knockout.year.toString();
            NavigationService.submitKnockout(request, function(data) {
                if (data.value) {
                    $state.go("knockout");
                } else {
                    //error
                }
            });
        };
        if ($stateParams.id) {
            NavigationService.getOneKnockout($stateParams, function(response) {
                if (response.value) {
                    $scope.knockout = response.data;
                    $scope.knockout.date = new Date($scope.knockout.date);
                    $scope.getParticipants();
                    $scope.getKnockoutPlayer("");
                } else {

                }
            });
        }


    })

.controller('editStudentCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state) {
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
    $scope.payment = ["Paid", "Unpaid"];
    $scope.subMenuList = [{
        title: "Back to Student",
        redirect: "student"
    }, {
        title: "Sports",
        redirect: "",
        url: "#/studentsport/" + $stateParams.id
    }];
    $scope.pageName = "Edit School";

    NavigationService.getSchoolList(function(data) {
        if (data.value !== false) {
            $scope.schools = data.data;
        }
    });
    NavigationService.getOneStudent($stateParams.id, function(data) {
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
            if (!$scope.student.payment) {
                $scope.student.payment = "Unpaid";
            }
        }
    });

    $scope.showError = false;
    $scope.errorContact = false;
    $scope.errorEmail = false;
    $scope.errorSportContact = false;
    $scope.saveStudent = function() {

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
            NavigationService.saveStudent($scope.student, function(data) {
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
            $timeout(function() {
                $scope.showError = false;
            }, 3000);
        }
    };
})


.controller('studentSportCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $uibModal) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("studentsport");
    $scope.menutitle = NavigationService.makeactive("Students");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.template.type = 1;

    $scope.studentId = $stateParams.id;

    NavigationService.getStudentSports($stateParams.id, function(data2) {
        console.log(data2);
        $scope.sports = data2.data;
    });

    $scope.confDelete = function() {
        NavigationService.deleteStudentSport(function(data, status) {
            console.log(data);
            reload();
        });
    }
    $scope.deleteFunc = function(id) {
        console.log(id);
        $.jStorage.set("deleteStudentSport", id);
        $uibModal.open({
            animation: true,
            templateUrl: "views/content/delete.html",
            scope: $scope
        })
    }
})

.controller('createStudentSportCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state) {
    $scope.template = TemplateService.changecontent("createstudentsports");
    $scope.menutitle = NavigationService.makeactive("Student - Sports");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.template.type = 1;
    $scope.pageName = "Create Student Sports";
    $scope.sport = {};
    $scope.allYears = NavigationService.getAllYears();
    NavigationService.getSchoolList(function(data) {
        if (data.value !== false) {
            $scope.schools = data.data;
        }
    });

    $scope.sportsList = [];

    $scope.callme = function() {
        if ($scope.sport.year && $scope.sport.school && $scope.sport.school._id) {
            NavigationService.getSchoolSports($scope.sport.year, $scope.sport.school._id, function(data2) {
                console.log(data2);
                $scope.sportsList = data2.data;
            });
        }
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

    $scope.saveSport = function() {
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
        NavigationService.saveStudentSport($scope.sport, function(data) {
            console.log(data);
            if (data.value !== false) {
                $state.go("studentsport", {
                    id: $stateParams.id
                });
            }
        });
    }

    $scope.getFirstCategory = function(search) {
        if (search.length >= 2) {
            var obj = {};
            obj.search = search;
            obj.firstcategory = $scope.sport.firstcategory;
            console.log(obj);
            NavigationService.getFirstCategories(obj, function(data) {
                if (data && data.value !== false) {
                    $scope.firstcategories = data.data;
                } else {
                    $scope.firstcategories = [];
                }
            });
        } else {
            $scope.firstcategories = [];
        }
    };

    $scope.saveFirstCategory = function(data, select) {
        _.each(data, function(n, key) {
            if (typeof n == 'string') {
                var item = {
                    name: _.capitalize(n)
                };
                NavigationService.saveFirstCategory(item, function(data) {
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

    $scope.getSecondCategory = function(search) {
        if (search.length >= 2) {
            var obj = {};
            obj.search = search;
            obj.secondcategory = $scope.sport.secondcategory;
            NavigationService.getSecondCategories(obj, function(data) {
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

    $scope.saveSecondCategory = function(data, select) {
        _.each(data, function(n, key) {
            if (typeof n == 'string') {
                var item = {
                    name: _.capitalize(n)
                };
                NavigationService.saveSecondCategory(item, function(data) {
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

    $scope.getAgeGroup = function(search) {
        if (search.length >= 2) {
            var obj = {};
            obj.search = search;
            obj.agegroup = $scope.sport.agegroup;
            NavigationService.getAgeGroups(obj, function(data) {
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

    $scope.saveAgeGroup = function(data, select) {
        _.each(data, function(n, key) {
            if (typeof n == 'string') {
                var item = {
                    name: _.capitalize(n)
                };
                NavigationService.saveAgeGroup(item, function(data) {
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

.controller('editStudentSportCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("createstudentsports");
    $scope.menutitle = NavigationService.makeactive("Students");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.template.type = 1;
    $scope.pageName = "Edit School";
    $scope.sport = {};
    $scope.allYears = NavigationService.getAllYears();
    NavigationService.getSchoolList(function(data) {
        if (data.value != false) {
            $scope.schools = data.data;
        }
    });

    $scope.sportsList = [];

    $scope.callme = function() {
        if ($scope.sport.year && $scope.sport.school && $scope.sport.school._id) {
            NavigationService.getSchoolSports($scope.sport.year, $scope.sport.school._id, function(data2) {
                console.log(data2);
                $scope.sportsList = data2.data;
            });
        }
    }

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
    NavigationService.getOneStudentSport($stateParams.id, function(data) {
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
            $scope.callme();
        }
    });
    $scope.saveSport = function() {
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
        NavigationService.saveStudentSport($scope.sport, function(data) {
            console.log(data);
            if (data.value != false) {
                $state.go("studentsport", {
                    id: $scope.sport.student
                });
            }
        });
    }

    $scope.getFirstCategory = function(search) {
        if (search.length >= 2) {
            var obj = {};
            obj.search = search;
            obj.firstcategory = $scope.sport.firstcategory;
            console.log(obj);
            NavigationService.getFirstCategories(obj, function(data) {
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

    $scope.saveFirstCategory = function(data, select) {
        _.each(data, function(n, key) {
            if (typeof n == 'string') {
                var item = {
                    name: _.capitalize(n)
                };
                NavigationService.saveFirstCategory(item, function(data) {
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

    $scope.getSecondCategory = function(search) {
        if (search.length >= 2) {
            var obj = {};
            obj.search = search;
            obj.secondcategory = $scope.sport.secondcategory;
            NavigationService.getSecondCategories(obj, function(data) {
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

    $scope.saveSecondCategory = function(data, select) {
        _.each(data, function(n, key) {
            if (typeof n == 'string') {
                var item = {
                    name: _.capitalize(n)
                };
                NavigationService.saveSecondCategory(item, function(data) {
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

    $scope.getAgeGroup = function(search) {
        if (search.length >= 2) {
            var obj = {};
            obj.search = search;
            obj.agegroup = $scope.sport.agegroup;
            NavigationService.getAgeGroups(obj, function(data) {
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

    $scope.saveAgeGroup = function(data, select) {
        _.each(data, function(n, key) {
            if (typeof n == 'string') {
                var item = {
                    name: _.capitalize(n)
                };
                NavigationService.saveAgeGroup(item, function(data) {
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

.controller('sportListCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("sportlist");
    $scope.menutitle = NavigationService.makeactive("Sports List");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.template.type = 1;

    function reload() {
        NavigationService.getAllSportList(function(data) {
            console.log(data);
            if (data.value != false) {
                $scope.sportsList = data.data;
            }
        });
    }
    reload();

    $scope.deleteFunc = function(id) {
        NavigationService.deleteSportsList(id, function(data2) {
            reload();
        });
    }
})

.controller('createSportListCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("createsportlist");
    $scope.menutitle = NavigationService.makeactive("Sports List");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.template.type = 1;
    $scope.pageName = "Create Sports List";

    $scope.sportList = {};

    $scope.saveSportList = function() {
        console.log($scope.sportList);
        NavigationService.saveSportList($scope.sportList, function(data) {
            console.log(data);
            if (data.value != false) {
                $state.go('sportlist');
            }
        })
    }
    $scope.addContent = function(select) {
        $scope.sportList.tableContent = select.selected;
    }
})

.controller('editSportListCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("createsportlist");
    $scope.menutitle = NavigationService.makeactive("Sports List");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.template.type = 1;
    $scope.pageName = "Edit Sports List";

    $scope.sportList = {};

    NavigationService.getOneSportList($stateParams.id, function(data) {
        console.log(data);
        if (data.value != false) {
            $scope.sportList = data.data;
        }
    });

    $scope.saveSportList = function() {
        console.log($scope.sport);
        NavigationService.saveSportList($scope.sportList, function(data) {
            console.log(data);
            if (data.value != false) {
                $state.go('sportlist');
            }
        })
    }
})

.controller('sportCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("sport");
    $scope.menutitle = NavigationService.makeactive("Sports");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.template.type = 1;

    function reload() {
        NavigationService.getAllSport(function(data) {
            console.log(data);
            if (data.value != false) {
                $scope.sports = data.data;
            }
        });
    }
    reload();

    $scope.deleteFunc = function(id) {
        NavigationService.deleteSport(id, function(data2) {
            reload();
        });
    };
})

.controller('createSportCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("createsport");
    $scope.menutitle = NavigationService.makeactive("Sports");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.template.type = 1;
    $scope.pageName = "Create Sport";

    $scope.sport = {};

    NavigationService.getAllSportList(function(data) {
        console.log(data);
        if (data.value !== false) {
            $scope.sportsList = data.data;
        }
    });

    $scope.saveSport = function() {
        console.log($scope.sport);
        NavigationService.saveSport($scope.sport, function(data) {
            console.log(data);
            if (data.value !== false) {
                $state.go('sport');
            }
        });
    };

})

.controller('editSportCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $stateParams) {
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

    NavigationService.getAllSportList(function(data) {
        console.log(data);
        if (data.value != false) {
            $scope.sportsList = data.data;
        }
    })

    NavigationService.getOneSport($stateParams.id, function(data) {
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

    $scope.saveSport = function() {
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
        NavigationService.saveSport($scope.sport, function(data) {
            console.log(data);
            if (data.value != false) {
                $state.go('sport');
            }
        })
    }

    $scope.getFirstCategory = function(search) {
        if (search.length >= 2) {
            var obj = {};
            obj.search = search;
            obj.firstcategory = $scope.sport.firstcategory;
            console.log(obj);
            NavigationService.getFirstCategories(obj, function(data) {
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

    $scope.saveFirstCategory = function(data, select) {
        console.log(select.selected);
        _.each(data, function(n, key) {
            if (typeof n == 'string') {
                var item = {
                    name: _.capitalize(n)
                };
                NavigationService.saveFirstCategory(item, function(data) {
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

    $scope.getSecondCategory = function(search) {
        if (search.length >= 2) {
            var obj = {};
            obj.search = search;
            obj.secondcategory = $scope.sport.secondcategory;
            NavigationService.getSecondCategories(obj, function(data) {
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

    $scope.saveSecondCategory = function(data, select) {
        console.log(select.selected);
        _.each(data, function(n, key) {
            if (typeof n == 'string') {
                var item = {
                    name: _.capitalize(n)
                };
                NavigationService.saveSecondCategory(item, function(data) {
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

    $scope.getThirdCategory = function(search) {
        if (search.length >= 2) {
            var obj = {};
            obj.search = search;
            obj.thirdcategory = $scope.sport.thirdcategory;
            NavigationService.getThirdCategories(obj, function(data) {
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

    $scope.getAgeGroup = function(search) {
        if (search.length >= 2) {
            var obj = {};
            obj.search = search;
            obj.agegroup = $scope.sport.agegroup;
            NavigationService.getAgeGroups(obj, function(data) {
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

    $scope.saveAgeGroup = function(data, select) {
        console.log(select.selected);
        _.each(data, function(n, key) {
            if (typeof n == 'string') {
                var item = {
                    name: _.capitalize(n)
                };
                NavigationService.saveAgeGroup(item, function(data) {
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


.controller('ageGroupCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("agegroup");
    $scope.menutitle = NavigationService.makeactive("Age Groups");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.template.type = 1;

    function reload() {
        NavigationService.getAllAgeGroup(function(data) {
            console.log(data);
            if (data.value != false) {
                $scope.ageGroups = data.data;
            }
        });
    }
    reload();

    $scope.deleteFunc = function(id) {
        NavigationService.deleteAgegroup(id, function(data2) {
            reload();
        });
    }

})

.controller('createAgeGroupCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("createagegroup");
    $scope.menutitle = NavigationService.makeactive("Age Groups");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.template.type = 1;
    $scope.pageName = "Create Age Group";

    $scope.agegroup = {};

    $scope.saveAgeGroup = function() {
        console.log($scope.agegroup);
        NavigationService.saveAgeGroup($scope.agegroup, function(data) {
            console.log(data);
            if (data.value != false) {
                $state.go('agegroup');
            }
        })
    }

})

.controller('editAgeGroupCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("createagegroup");
    $scope.menutitle = NavigationService.makeactive("Age Groups");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.template.type = 1;
    $scope.pageName = "Edit Age Group";

    $scope.agegroup = {};

    NavigationService.getOneAgeGroup($stateParams.id, function(data) {
        console.log(data);
        if (data.value != false) {
            $scope.agegroup = data.data;
        }
    })

    $scope.saveAgeGroup = function() {
        console.log($scope.agegroup);
        NavigationService.saveAgeGroup($scope.agegroup, function(data) {
            console.log(data);
            if (data.value != false) {
                $state.go('agegroup');
            }
        })
    }

})

.controller('showStudentCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $stateParams) {
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

.controller('SportRuleCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("sportrule");
    $scope.menutitle = NavigationService.makeactive("Sport Rule");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.template.type = 1;
    $scope.contentLoaded = false;

    $scope.reload = function() {
        NavigationService.getAllSportRule(function(data) {
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

    $scope.confDelete = function() {
        NavigationService.deleteSportRule(function(data, status) {
            console.log(data);
            $scope.reload();
        });
    }
    $scope.deleteFunc = function(id) {
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

.controller('createSportRuleCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $uibModal) {
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

    NavigationService.getAllSportList(function(data) {
        $scope.sportlist = data.data;
    });

    $scope.selectContent = function(id) {
        NavigationService.getOneSportList(id, function(data) {
            console.log(data.data);
            $scope.contentheader = data.data.tableContent;
        });
    };

    $scope.removeimage = function(i) {
        $scope.sportrule.images.splice(i, 1);
    };

    NavigationService.getAllAgeGroups(function(data) {
        console.log(data);
        if (data.value != false) {
            $scope.agegroup = data.data;
        } else {
            $scope.agegroup = [];
        }
    });

    NavigationService.getSchoolList(function(data) {
        console.log(data);
        if (data.value != false) {
            $scope.school = data.data;
        } else {
            $scope.school = [];
        }
    });


    $scope.getStudent = function(search) {
        if (search.length >= 2) {
            var obj = {};
            obj.search = search;
            obj.student = $scope.sportrule.featured;
            console.log($scope.sportrule.featured);
            NavigationService.getStudent(obj, function(data) {
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
    $scope.getTeam = function(search) {
        if (search.length >= 2) {
            var obj = {};
            obj.search = search;
            obj.team = $scope.sportrule.featuredTeam;
            NavigationService.getTeam(obj, function(data) {
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

    $scope.saveStudent = function(data, select) {
        console.log(select);
        $scope.sportrule.student = select.selected;
    }
    $scope.saveTeam = function(data, select) {
        console.log(select);
        $scope.sportrule.team = select.selected;
    }

    $scope.addCont = function(crdv) {
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

    $scope.addWin = function(crdv) {
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

    $scope.addTeam = function(crdv) {
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

    $scope.addAge = function(crdv) {
        if (!crdv.ageGroupTable) {
            crdv.ageGroupTable = [{}];
        } else {
            crdv.ageGroupTable.push({});
        }
    };

    $scope.confDelete = function(val) {
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

    $scope.deleteFunc = function(id, value) {
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

    $scope.saveSportRule = function() {
        NavigationService.saveSportRule($scope.sportrule, function(data) {
            if (data.value != false) {
                $state.go('sportrule');
            }
        });
    };
})

.controller('editSportRuleCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $stateParams, $uibModal) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("createsportrule");
    $scope.menutitle = NavigationService.makeactive("Sport Rule");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.template.type = 1;
    $scope.pageName = "Edit Sport Rule";
    $scope.sportrule = {};
    $scope.deleteVal = "";

    NavigationService.getAllSportList(function(data) {
        $scope.sportlist = data.data;
    });

    $scope.removeimage = function(i) {
        $scope.sportrule.images.splice(i, 1);
    };

    $scope.selectContent = function(id) {
        NavigationService.getOneSportList(id, function(data) {
            console.log(data.data);
            if (data.value != false) {
                $scope.contentheader = data.data.tableContent;
            } else {
                $scope.contentheader = [];
            }
        });
    };

    NavigationService.getOneSportRule($stateParams.id, function(data) {
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
            if ($scope.sportrule.eligibilityTable && $scope.sportrule.eligibilityTable.length > 0) {
                _.each($scope.sportrule.eligibilityTable, function(n) {
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
    NavigationService.getAllAgeGroups(function(data) {
        console.log(data);
        if (data.value != false) {
            $scope.agegroup = data.data;
        } else {
            $scope.agegroup = [];
        }
    });

    NavigationService.getSchoolList(function(data) {
        console.log(data);
        if (data.value != false) {
            $scope.school = data.data;
        } else {
            $scope.school = [];
        }
    });

    $scope.getStudent = function(search) {
        if (search.length >= 2) {
            var obj = {};
            obj.search = search;
            obj.student = $scope.sportrule.featured;
            NavigationService.getStudent(obj, function(data) {
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
    $scope.getTeam = function(search) {
        if (search.length >= 2) {
            var obj = {};
            obj.search = search;
            obj.team = $scope.sportrule.featuredTeam;
            NavigationService.getTeam(obj, function(data) {
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

    $scope.saveStudent = function(data, select) {
        console.log(select);
        $scope.sportrule.student = select.selected;
    }
    $scope.saveTeam = function(data, select) {
        console.log(select);
        $scope.sportrule.team = select.selected;
    }

    $scope.addCont = function(crdv) {
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

    $scope.addWin = function(crdv) {
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

    $scope.addTeam = function(crdv) {
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

    $scope.addAge = function(crdv) {
        if (!crdv.ageGroupTable) {
            crdv.ageGroupTable = [{}];
        } else {
            crdv.ageGroupTable.push({});
        }
    };

    $scope.confDelete = function(val) {
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

    $scope.deleteFunc = function(id, value) {
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

    $scope.saveSportRule = function() {
        console.log($scope.sportrule);
        NavigationService.saveSportRule($scope.sportrule, function(data) {
            console.log(data);
            if (data.value != false) {
                $state.go('sportrule');
            }
        });
    };

})

.controller('languageCtrl', function($scope, TemplateService, $translate, $rootScope) {

    $scope.changeLanguage = function() {
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
});
