angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'angular-flexslider', 'ui.select'])

.controller('headerctrl', function($scope, TemplateService, $state) {
    $scope.template = TemplateService;
    if (!$.jStorage.get("user")) {
        $state.go("login");
    }
    $scope.logout = function() {
        $.jStorage.flush();
        $state.go("login");
    }
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
    }
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

    function reload() {
        NavigationService.getAllSchool(function(data) {
            if (data.value !== false) {
                $scope.contentLoaded = true;
                $scope.schools = data.data;
            }
        });
    }
    reload();
    $scope.hideSchool = function(id, status) {
        NavigationService.hideSchool({
            _id: id,
            status: status
        }, function(data2) {
            console.log(data2);
            reload();
        });
    }
    $scope.confDelete = function() {
        NavigationService.deleteSchool(function(data, status) {
            console.log(data);
            reload();
        });
    }
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
    $scope.status = [{ id: "", name: "Is Verified?" }, { id: "true", name: "Yes" }, { id: "false", name: "No" }];
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
    $scope.status = [{ id: "", name: "Is Verified?" }, { id: true, name: "Yes" }, { id: false, name: "No" }];
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

.controller('studentCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("student");
    $scope.menutitle = NavigationService.makeactive("Students");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.template.type = 1;
    $scope.contentLoaded = false;

    function reload() {
        NavigationService.getAllStudent(function(data) {
            if (data.value !== false) {
                $scope.contentLoaded = true;
                $scope.students = data.data;
            }
        });
    }
    reload();
    $scope.hideStudent = function(id, status) {
        NavigationService.hideStudent({
            _id: id,
            status: status
        }, function(data2) {
            console.log(data2);
            reload();
        });
    }
    $scope.confDelete = function() {
        NavigationService.deleteStudent(function(data, status) {
            console.log(data);
            reload();
        });
    }
    $scope.deleteFunc = function(id) {
        console.log(id);
        $.jStorage.set("deleteStudent", id);
        $.jStorage.get("deleteStudent");
        $uibModal.open({
            animation: true,
            templateUrl: "views/content/delete.html",
            scope: $scope
        })
    }
})

.controller('createStudentCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("createstudent");
    $scope.menutitle = NavigationService.makeactive("Students");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.template.type = 1;
    $scope.pageName = "Create Student";

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

    NavigationService.getLastStudentId(function(data) {
        console.log(data);
        if (data.value != false) {
            $scope.student.sfaid = data.data;
        }
    });

    NavigationService.getSchoolList(function(data) {
        if (data.value != false) {
            $scope.schools = data.data;
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
        if (data.value != false) {
            $scope.schools = data.data;
        }
    })
    NavigationService.getOneStudent($stateParams.id, function(data) {
        if (data.value != false) {
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
    })

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
            if (data.value != false) {
                $state.go("studentsport", { id: $stateParams.id });
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
                $state.go("studentsport", { id: $scope.sport.student });
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
    }

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
        if (data.value != false) {
            $scope.sportsList = data.data;
        }
    })

    $scope.saveSport = function() {
        console.log($scope.sport);
        NavigationService.saveSport($scope.sport, function(data) {
            console.log(data);
            if (data.value != false) {
                $state.go('sport');
            }
        })
    }

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
