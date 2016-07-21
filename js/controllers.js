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

})

.controller('schoolCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("school");
    $scope.menutitle = NavigationService.makeactive("Schools");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.template.type = 1;
    $scope.contentLoaded = false;
    $scope.schools = [];

    NavigationService.getAllSchool(function(data) {
        $scope.contentLoaded = true;
        if (data.value !== false) {
            $scope.schools = data.data;
        }
    });
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

    $scope.add = function(crdv) {
        if (!crdv.contingentLeader) {
            crdv.contingentLeader = [{
                "year": "",
                "name": ""
            }];
        } else {
            crdv.contingentLeader.push({
                "year": "",
                "name": ""
            });
        }
    };
    $scope.remove = function(i, dev) {
        dev.splice(i, 1);
    };

    NavigationService.getAllSportList(function(data) {
        if (data.value !== false) {
            $scope.sportsList = _.groupBy(data.data, "sporttype");
        }
    });

    NavigationService.getLastId(function(data) {
        if (data.value !== false) {
            $scope.school.sfaid = data.data;
        }
    });
    $scope.showError = false;
    $scope.saveSchool = function() {
        schoolSports = [];
        _.each($scope.sportsList, function(n) {
            schoolSports.push(_.filter(n, "checked"));
        });
        schoolSports = _.flatten(schoolSports);
        $scope.school.sports = schoolSports;
        $scope.school.contact = $scope.school.contact.toString();
        var split = $scope.school.contact.split(",");
        _.each(split, function(n) {
            if (n.length != 10) {
                $scope.error = true;
            } else {
                $scope.error = false;
            }
        });
        if ($scope.error == true) {
            $scope.showError = true;
            $timeout(function() {
                $scope.showError = false;
            }, 3000);
        } else {
            NavigationService.saveSchool($scope.school, function(data) {
                if (data.value !== false) {
                    $scope.showError = false;
                    $state.go('school');
                }
            });
        }
    };
})

.controller('editSchoolCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("createschool");
    $scope.menutitle = NavigationService.makeactive("Schools");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.template.type = 1;
    $scope.pageName = "Edit School";
    $scope.school = {};

    $scope.add = function(crdv) {
        if (!crdv.contingentLeader) {
            crdv.contingentLeader = [{
                "year": "",
                "name": ""
            }];
        } else {
            crdv.contingentLeader.push({
                "year": "",
                "name": ""
            });
        }
    };
    $scope.remove = function(i, dev) {
        dev.splice(i, 1);
    };

    var schoolSports = [];
    $scope.showError = false;
    $scope.saveSchool = function() {
        schoolSports = [];
        _.each($scope.sportsList, function(n) {
            schoolSports.push(_.filter(n, "checked"));
        });
        schoolSports = _.flatten(schoolSports);
        $scope.school.sports = schoolSports;
        var split = $scope.school.contact.split(",");
        _.each(split, function(n) {
            if (n.length != 10) {
                $scope.error = true;
            } else {
                $scope.error = false;
            }
        });
        if ($scope.error == true) {
            $scope.showError = true;
            $timeout(function() {
                $scope.showError = false;
            }, 3000);
        } else {
            NavigationService.saveSchool($scope.school, function(data) {
                if (data.value !== false) {
                    $scope.showError = false;
                    $state.go('school');
                }
            });
        }
    };


    NavigationService.getOneSchool($stateParams.id, function(data) {
        if (data.value !== false) {
            $scope.school = data.data;
            NavigationService.getAllSportList(function(sportdata) {
                _.each(data.data.sports, function(n) {
                    var num = _.findIndex(sportdata.data, function(m) {

                        return n._id == m._id;
                    });
                    if (num >= 0) {
                        sportdata.data[num].checked = true;
                    }
                });
                if (sportdata.value !== false) {
                    $scope.sportsList = _.groupBy(sportdata.data, "sporttype");
                    console.log($scope.sportsList);
                }
            });
        }
    });
})

.controller('studentCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("student");
    $scope.menutitle = NavigationService.makeactive("Students");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.template.type = 1;

    NavigationService.getAllStudent(function(data) {
        if (data.value != false) {
            $scope.students = data.data;
        }
    })
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

    NavigationService.getLastStudentId(function(data) {
        console.log(data);
        if (data.value != false) {
            $scope.student.sfaid = data.data;
        }
    })

    NavigationService.getSchoolList(function(data) {
        if (data.value != false) {
            $scope.schools = data.data;
        }
    })

    $scope.saveStudent = function() {
        $scope.showError = false;
        schoolSports = [];
        _.each($scope.sportsList, function(n) {
            schoolSports.push(_.filter(n, "checked"));
        });
        schoolSports = _.flatten(schoolSports);
        $scope.school.sports = schoolSports;
        $scope.school.contact = $scope.school.contact.toString();
        var split = $scope.school.contact.split(",");
        _.each(split, function(n) {
            if (n.length != 10) {
                $scope.error = true;
            } else {
                $scope.error = false;
            }
        });
        if ($scope.error == true) {
            $scope.showError = true;
            $timeout(function() {
                $scope.showError = false;
            }, 3000);
        } else {
            NavigationService.saveStudent($scope.student, function(data) {
                if (data.value != false) {
                    $scope.showError = false;
                    $state.go('student');
                }
            });
        }
    }

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

.controller('editStudentCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("createstudent");
    $scope.menutitle = NavigationService.makeactive("Students");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.template.type = 2;

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
        }
    })

    $scope.saveStudent = function() {
        $scope.showError = false;
        schoolSports = [];
        _.each($scope.sportsList, function(n) {
            schoolSports.push(_.filter(n, "checked"));
        });
        schoolSports = _.flatten(schoolSports);
        $scope.school.sports = schoolSports;
        $scope.school.contact = $scope.school.contact.toString();
        var split = $scope.school.contact.split(",");
        _.each(split, function(n) {
            if (n.length != 10) {
                $scope.error = true;
            } else {
                $scope.error = false;
            }
        });
        if ($scope.error == true) {
            $scope.showError = true;
            $timeout(function() {
                $scope.showError = false;
            }, 3000);
        } else {
            NavigationService.saveStudent($scope.student, function(data) {
                if (data.value != false) {
                    $scope.showError = false;
                    $state.go('student');
                }
            });
        }
    }
})


.controller('studentSportCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("studentsports");
    $scope.menutitle = NavigationService.makeactive("Students");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.template.type = 1;

    $scope.studentId = $stateParams.id;

    NavigationService.getOneStudent($stateParams.id, function(data) {
        console.log(data);
        if (data.value != false) {
            $scope.sports = data.data.sport;
        }
    })
})

.controller('createStudentSportCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams) {
    $scope.template = TemplateService.changecontent("createstudentsports");
    $scope.menutitle = NavigationService.makeactive("Student - Sports");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.template.type = 1;
    $scope.pageName = "Create Student Sports";

    NavigationService.getOneStudent($stateParams.id, function(data) {
        console.log(data);
        if (data.value != false) {
            $scope.sports = data.data;
        }
    })

    NavigationService.getSchoolList(function(data) {
        if (data.value != false) {
            $scope.schools = data.data;
        }
    })

    $scope.getSchoolSports = function(school) {
        console.log(school);
        NavigationService.getSchoolSports(school._id, function(data) {
            console.log(data);
            if (data.value != false) {
                $scope.schoolSports = data.data;
            }
        })
    }

    $scope.firstcategories = [];
    $scope.secondcategories = [];
    $scope.thirdcategories = [];
    $scope.agegroups = [];
    $scope.getFirstCategory = function(sport) {
        var obj = {}
        obj.sportslist = sport._id;
        obj.gender = $scope.sports.gender;
        NavigationService.getSports(obj, function(data) {
            console.log(data);
            if (data.value != false) {
                _.each(data.data, function(n) {
                    if (n.firstcategory) {
                        n.firstcategory.sport = n._id;
                        $scope.firstcategories.push(n.firstcategory);
                    }
                    if (n.secondcategory) {
                        n.secondcategory.sport = n._id;
                        $scope.secondcategories.push(n.secondcategory);
                    }
                    if (n.thirdcategory) {
                        n.thirdcategory.sport = n._id;
                        $scope.thirdcategories.push(n.thirdcategory);
                    }
                    if (n.agegroup) {
                        n.agegroup.sport = n._id;
                        $scope.agegroups.push(n.agegroup);
                    }
                })
            }
            console.log($scope.firstcategories);
            console.log($scope.secondcategories);
            console.log($scope.thirdcategories);
            console.log($scope.agegroups);
        })
    }

})

.controller('editStudentSportCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("createstudentsports");
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

.controller('sportListCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("sportlist");
    $scope.menutitle = NavigationService.makeactive("Sports List");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.template.type = 1;

    NavigationService.getAllSportList(function(data) {
        console.log(data);
        if (data.value != false) {
            $scope.sportsList = data.data;
        }
    })

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
