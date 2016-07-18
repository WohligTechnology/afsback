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
            if (data.value == true) {
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
    }
})

.controller('DashboardCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("dashboard");
    $scope.menutitle = NavigationService.makeactive("Dashboard");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
})

.controller('schoolCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("school");
    $scope.menutitle = NavigationService.makeactive("Schools");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.template.type = 1;

    NavigationService.getAllSchool(function(data) {
        if (data.value != false) {
            $scope.schools = data.data;
        }
    })
})

.controller('createSchoolCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("createschool");
    $scope.menutitle = NavigationService.makeactive("Schools");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.template.type = 1;
    $scope.pageName = "Create School";

    $scope.school = {};
    var schoolSports = [];

    NavigationService.getLastId(function(data) {
        console.log(data);
        if (data.value != false) {
            $scope.school.sfaid = data.data;
        }
    })

    $scope.saveSchool = function() {
        schoolSports = [];
        _.each($scope.sportsArr, function(n) {
            _.each(n.sports, function(z) {
                if (z.checked == true) {
                    schoolSports.push(z);
                }
            })
        })
        $scope.school.sports = schoolSports;
        console.log($scope.school);
        NavigationService.saveSchool($scope.school, function(data) {
            if (data.value != false) {
                $state.go('school');
            }
        })
    }

    $scope.sportsArr = [{
        sporttype: "Team",
        sports: [{
            name: "Basketball",
            sporttype: "Team",
            checked: false
        }, {
            name: "Handball",
            sporttype: "Team",
            checked: false
        }, {
            name: "Volleyball",
            sporttype: "Team",
            checked: false
        }, {
            name: "Football",
            sporttype: "Team",
            checked: false
        }, {
            name: "Throwball",
            sporttype: "Team",
            checked: false
        }, {
            name: "Hockey",
            sporttype: "Team",
            checked: false
        }, {
            name: "Kho Kho",
            sporttype: "Team",
            checked: false
        }, {
            name: "Kabaddi",
            sporttype: "Team",
            checked: false
        }]
    }, {
        sporttype: "Racquet",
        sports: [{
            name: "Tennis (Singles & Doubles)",
            sporttype: "Racquet",
            checked: false
        }, {
            name: "Table Tennis (Singles & Doubles)",
            sporttype: "Racquet",
            checked: false
        }, {
            name: "Badminton (Singles & Doubles)",
            sporttype: "Racquet",
            checked: false
        }, {
            name: "Squash",
            sporttype: "Racquet",
            checked: false
        }]
    }, {
        sporttype: "Combat",
        sports: [{
            name: "Karate",
            sporttype: "Combat",
            checked: false
        }, {
            name: "Judo",
            sporttype: "Combat",
            checked: false
        }, {
            name: "Taekwondo",
            sporttype: "Combat",
            checked: false
        }, {
            name: "Boxing",
            sporttype: "Combat",
            checked: false
        }, {
            name: "Sport Mix Martial Arts",
            sporttype: "Combat",
            checked: false
        }, {
            name: "Fencing",
            sporttype: "Combat",
            checked: false
        }]
    }, {
        sporttype: "Target",
        sports: [{
            name: "Shooting",
            sporttype: "Target",
            checked: false
        }, {
            name: "Archery",
            sporttype: "Target",
            checked: false
        }]
    }, {
        sporttype: "Aquatics",
        sports: [{
            name: "Swimming",
            sporttype: "Aquatics",
            checked: false
        }, {
            name: "Water Polo",
            sporttype: "Aquatics",
            checked: false
        }]
    }, {
        sporttype: "Individual",
        sports: [{
            name: "Carrom",
            sporttype: "Individual",
            checked: false
        }, {
            name: "Chess",
            sporttype: "Individual",
            checked: false
        }, {
            name: "Athletics",
            sporttype: "Individual",
            checked: false
        }, {
            name: "Gymnastics",
            sporttype: "Individual",
            checked: false
        }]
    }];

})

.controller('editSchoolCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("createschool");
    $scope.menutitle = NavigationService.makeactive("Schools");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.template.type = 2;
    $scope.subMenuList = [{
        title: "Back to School",
        redirect: "school"
    }, {
        title: "Whislist Folder",
        redirect: "edituser"
    }, {
        title: "Wishlist",
        redirect: "edituser"
    }, {
        title: "Artwork",
        redirect: "edituser"
    }, {
        title: "Cart",
        redirect: "edituser"
    }];
    $scope.pageName = "Edit School";

    $scope.school = {};
    var schoolSports = [];

    $scope.saveSchool = function() {
        schoolSports = [];
        _.each($scope.sportsArr, function(n) {
            _.each(n.sports, function(z) {
                if (z.checked == true) {
                    schoolSports.push(z);
                }
            })
        })
        $scope.school.sports = schoolSports;
        console.log($scope.school);
        NavigationService.saveSchool($scope.school, function(data) {
            if (data.value != false) {
                $state.go('school');
            }
        })
    }

    NavigationService.getOneSchool($stateParams.id, function(data) {
        console.log(data);
        if (data.value != false) {
            $scope.school = data.data;
        }
    })

    $scope.sportsArr = [{
        sporttype: "Team",
        sports: [{
            name: "Basketball",
            sporttype: "Team",
            checked: false
        }, {
            name: "Handball",
            sporttype: "Team",
            checked: false
        }, {
            name: "Volleyball",
            sporttype: "Team",
            checked: false
        }, {
            name: "Football",
            sporttype: "Team",
            checked: false
        }, {
            name: "Throwball",
            sporttype: "Team",
            checked: false
        }, {
            name: "Hockey",
            sporttype: "Team",
            checked: false
        }, {
            name: "Kho Kho",
            sporttype: "Team",
            checked: false
        }, {
            name: "Kabaddi",
            sporttype: "Team",
            checked: false
        }]
    }, {
        sporttype: "Racquet",
        sports: [{
            name: "Tennis (Singles & Doubles)",
            sporttype: "Racquet",
            checked: false
        }, {
            name: "Table Tennis (Singles & Doubles)",
            sporttype: "Racquet",
            checked: false
        }, {
            name: "Badminton (Singles & Doubles)",
            sporttype: "Racquet",
            checked: false
        }, {
            name: "Squash",
            sporttype: "Racquet",
            checked: false
        }]
    }, {
        sporttype: "Combat",
        sports: [{
            name: "Karate",
            sporttype: "Combat",
            checked: false
        }, {
            name: "Judo",
            sporttype: "Combat",
            checked: false
        }, {
            name: "Taekwondo",
            sporttype: "Combat",
            checked: false
        }, {
            name: "Boxing",
            sporttype: "Combat",
            checked: false
        }, {
            name: "Sport Mix Martial Arts",
            sporttype: "Combat",
            checked: false
        }, {
            name: "Fencing",
            sporttype: "Combat",
            checked: false
        }]
    }, {
        sporttype: "Target",
        sports: [{
            name: "Shooting",
            sporttype: "Target",
            checked: false
        }, {
            name: "Archery",
            sporttype: "Target",
            checked: false
        }]
    }, {
        sporttype: "Aquatics",
        sports: [{
            name: "Swimming",
            sporttype: "Aquatics",
            checked: false
        }, {
            name: "Water Polo",
            sporttype: "Aquatics",
            checked: false
        }]
    }, {
        sporttype: "Individual",
        sports: [{
            name: "Carrom",
            sporttype: "Individual",
            checked: false
        }, {
            name: "Chess",
            sporttype: "Individual",
            checked: false
        }, {
            name: "Athletics",
            sporttype: "Individual",
            checked: false
        }, {
            name: "Gymnastics",
            sporttype: "Individual",
            checked: false
        }]
    }];

})

.controller('studentCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("student");
    $scope.menutitle = NavigationService.makeactive("Students");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.template.type = 1;
})

.controller('createStudentCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("createstudent");
    $scope.menutitle = NavigationService.makeactive("Students");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.template.type = 1;
    $scope.pageName = "Create Student";

    $scope.student = {};

    $scope.popup1 = {
        opened: false
    };

    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };

    $scope.today = function() {
        $scope.student.dob = new Date();
    };
    $scope.today();

    $scope.dateOptions = {
        maxDate: new Date()
    };

})

.controller('editStudentCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("createstudent");
    $scope.menutitle = NavigationService.makeactive("Students");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.template.type = 2;
    $scope.subMenuList = [{
        title: "Back to School",
        redirect: "student"
    }, {
        title: "Whislist Folder",
        redirect: "edituser"
    }, {
        title: "Wishlist",
        redirect: "edituser"
    }, {
        title: "Artwork",
        redirect: "edituser"
    }, {
        title: "Cart",
        redirect: "edituser"
    }];
    $scope.pageName = "Edit School";
})


.controller('studentSportCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("studentSports");
    $scope.menutitle = NavigationService.makeactive("Students");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.template.type = 1;
})

.controller('createStudentSportCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("createstudentSports");
    $scope.menutitle = NavigationService.makeactive("Students");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.template.type = 1;
    $scope.pageName = "Create Student";

    $scope.popup1 = {
        opened: false
    };

    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };

    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.dateOptions = {
        maxDate: new Date()
    };

})

.controller('editStudentSportCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("createstudentSports");
    $scope.menutitle = NavigationService.makeactive("Students");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.template.type = 2;
    $scope.subMenuList = [{
        title: "Back to School",
        redirect: "student"
    }, {
        title: "Whislist Folder",
        redirect: "edituser"
    }, {
        title: "Wishlist",
        redirect: "edituser"
    }, {
        title: "Artwork",
        redirect: "edituser"
    }, {
        title: "Cart",
        redirect: "edituser"
    }];
    $scope.pageName = "Edit School";
})

.controller('sportCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("sport");
    $scope.menutitle = NavigationService.makeactive("Sports");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.template.type = 1;

    NavigationService.getAllSport(function(data) {
        console.log(data);
        if (data.value != false) {
            $scope.sports = data.data;
        }
    })

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

    NavigationService.getAllAgeGroup(function(data) {
        console.log(data);
        if (data.value != false) {
            $scope.ageGroups = data.data;
        }
    })

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
