var adminURL = "https://api.sfanow.in/api/";
// var adminURL = "http://sfa3.wohlig.co.in/api/";
// var adminURL = "http://sfa3.sfanow.in/api/";
// var adminURL = "http://192.168.2.51:1337/api/";
// var adminURL = "http://localhost:1337/api/";
var uploadurl = adminURL + "upload/";
var openTab = "http://wohlig.co.in/sfanodeback/#/showstudent";
// var openTab = "http://localhost:808/#/showstudent"

var navigationservice = angular.module('navigationservice', [])

    .factory('NavigationService', function ($http) {
        var navigation = [{
            name: "Dashboard",
            classis: "active",
            anchor: "dashboard",
            icon: "dashboard",
            subnav: []
        },
        {
            name: "Live Updates",
            classis: "active",
            anchor: "",
            icon: "users",
            subnav: [{
                name: "Home Banner",
                classis: "active",
                anchor: "/#/banner",
                icon: "banner",
                subnav: []
            },
            {
                name: "Ranking Table",
                classis: "",
                anchor: "/#/rankingtabledashboard",
                icon: "users",
                subnav: []
            }, {
                name: "Album",
                classis: "active",
                anchor: "/#/liveAlbumdashboard",
                icon: "users",
                subnav: []
            },
            {
                name: "Photos",
                classis: "active",
                anchor: "/#/livePhotosdashboard",
                icon: "users",
                subnav: []
            },
            {
                name: "Videos",
                classis: "active",
                anchor: "/#/videosdashboard",
                icon: "users",
                subnav: []
            },
            {
                name: "Special Events",
                classis: "active",
                anchor: "/#/specialEvents",
                icon: "users",
                subnav: []
            },
            {
                name: "Ticker",
                classis: "active",
                anchor: "/#/ticker",
                icon: "users",
                subnav: []
            }
            ]
        },
        {
            name: "City Rule",
            classis: "active",
            anchor: "",
            icon: "users",
            subnav: [{
                name: "Mumbai School",
                classis: "",
                anchor: "#/cityrule/mumbai/school",
                icon: ""
            }, {
                name: "Mumbai College",
                classis: "",
                anchor: "#/cityrule/mumbai/college",
                icon: ""
            }, {
                name: "Hyderabad School",
                classis: "",
                anchor: "#/cityrule/hyderabad/school",
                icon: ""
            }, {
                name: "Hyderabad College",
                classis: "",
                anchor: "#/cityrule/hyderabad/college",
                icon: ""
            }, {
                name: "Ahmedabad School",
                classis: "",
                anchor: "#/cityrule/ahmedabad/school",
                icon: ""
            }, {
                name: "Ahmedabad College",
                classis: "",
                anchor: "#/cityrule/ahmedabad/college",
                icon: ""
            }]
        },
        {
            name: "Schools",
            classis: "active",
            anchor: "school",
            icon: "building",
            subnav: []
        }, {
            name: "Students",
            classis: "active",
            anchor: "student",
            icon: "users",
            subnav: []
        }, {
            name: "Teams",
            classis: "active",
            anchor: "team",
            icon: "users",
            subnav: []
        }, {
            name: "Medals",
            classis: "active",
            anchor: "medaldashboard",
            icon: "users",
            subnav: []
        }, {
            name: "Sports List",
            classis: "active",
            anchor: "sportlist",
            icon: "users",
            subnav: []
        }, {
            name: "Sports",
            classis: "active",
            anchor: "sport",
            icon: "users",
            subnav: []
        }, {
            name: "Media",
            classis: "active",
            anchor: "media",
            icon: "users",
            subnav: []
        }, {
            name: "Age Groups",
            classis: "active",
            anchor: "agegroup",
            icon: "users",
            subnav: []
        }, {
            name: "Sport Rule",
            classis: "active",
            anchor: "sportrule",
            icon: "users",
            subnav: []
        }, {
            name: "Knockout",
            classis: "active",
            anchor: "knockoutdashboard",
            icon: "users",
            subnav: []
        }, {
            name: "Heats",
            classis: "active",
            anchor: "heatdashboard",
            icon: "users",
            subnav: []
        }, {
            name: "Leagues",
            classis: "active",
            anchor: "leaguedashboard",
            icon: "users",
            subnav: []
        }, {
            name: "Swiss League",
            classis: "active",
            anchor: "swissdashboard",
            icon: "users",
            subnav: []
        }, {
            name: "League Knockout",
            classis: "active",
            anchor: "leagueknockoutdashboard",
            icon: "users",
            subnav: []
        }, {
            name: "Qualifying Round",
            classis: "active",
            anchor: "qualifyingrounddashboard",
            icon: "users",
            subnav: []
        }, {
            name: "Qualifying Knockout",
            classis: "active",
            anchor: "qualifyingknockoutdashboard",
            icon: "users",
            subnav: []
        }
        ];

        var currentYears = ["2015", "2016"];

        return {
            getnav: function () {
                return navigation;
            },
            getAllYears: function () {
                return currentYears;
            },
            loginAdmin: function (formData, callback) {
                $http({
                    url: adminURL + 'admin/login',
                    method: 'POST',
                    data: formData
                }).success(callback);
            },
            getAllSportList: function (callback) {
                $http({
                    url: adminURL + 'sportslist/getAll',
                    method: 'POST'
                }).success(callback);
            },
            getMedia: function (callback) {
                $http({
                    url: adminURL + 'media/getLimited',
                    method: 'POST'
                }).success(callback);
            },
            getAllKnockoutSport: function (callback) {
                $http({
                    url: adminURL + 'sportslist/getAllKnockoutSport',
                    method: 'POST'
                }).success(callback);
            },
            getSportByDrawFormat: function (request, callback) {
                $http({
                    url: adminURL + 'sportslist/getSportByDrawFormat',
                    method: 'POST',
                    data: request
                }).success(callback);
            },
            getAllHeatSport: function (callback) {
                $http({
                    url: adminURL + 'sportslist/getAllHeatSport',
                    method: 'POST'
                }).success(callback);
            },
            getAllSportListSchool: function (callback) {
                $http({
                    url: adminURL + 'sportslist/getAll',
                    method: 'POST'
                }).success(function (data) {
                    var sportsListArr = [];
                    if (data.value !== false) {
                        _.each(currentYears, function (n, key) {
                            var listArr = _.cloneDeep(data.data);
                            _.each(listArr, function (m) {
                                m.year = n;
                            });
                            sportsListArr.push(_.groupBy(listArr, "sporttype"));
                        });
                    }
                    callback(sportsListArr);
                });
            },
            getOneSportList: function (id, callback) {
                $http({
                    url: adminURL + 'sportslist/getOne',
                    method: 'POST',
                    data: {
                        _id: id
                    }
                }).success(callback);
            },
            getOneBanner: function (id, callback) {
                $http({
                    url: adminURL + 'banner/getOne',
                    method: 'POST',
                    data: {
                        _id: id
                    }
                }).success(callback);
            },
            getOneTeamByName: function (request, callback) {
                $http({
                    url: adminURL + 'team/getOneTeamByName',
                    method: 'POST',
                    data: request
                }).success(callback);
            },
            forSimilarNamesBackend: function (request, callback) {
                $http({
                    url: adminURL + 'team/forSimilarNamesBackend',
                    method: 'POST',
                    data: request
                }).success(callback);
            },
            getOneStudentByName: function (request, callback) {
                $http({
                    url: adminURL + 'student/getOneStudentByName',
                    method: 'POST',
                    data: request
                }).success(callback);
            },
            saveSportList: function (formData, callback) {
                $http({
                    url: adminURL + 'sportslist/saveData',
                    method: 'POST',
                    data: formData
                }).success(callback);
            },
            saveBanner: function (formData, callback) {
                console.log(formData);
                $http({
                    url: adminURL + 'banner/saveData',
                    method: 'POST',
                    data: formData
                }).success(callback);
            },
            getAllBanners: function (callback) {
                $http({
                    url: adminURL + 'banner/getall',
                    method: 'POST'
                }).success(callback);
            },
            getFirstCategoryFromSport: function (formData, callback) {
                $http({
                    url: adminURL + 'studentsport/getFirstCategoryFromSport',
                    method: 'POST',
                    data: formData
                }).success(callback);
            },
            getAllSport: function (callback) {
                $http({
                    url: adminURL + 'sport/getAll',
                    method: 'POST'
                }).success(callback);
            },
            getOneSport: function (id, callback) {
                $http({
                    url: adminURL + 'sport/getOne',
                    method: 'POST',
                    data: {
                        _id: id
                    }
                }).success(callback);
            },
            saveSport: function (formData, callback) {
                $http({
                    url: adminURL + 'sport/saveData',
                    method: 'POST',
                    data: formData
                }).success(callback);
            },
            getAllAgeGroup: function (callback) {
                $http({
                    url: adminURL + 'agegroup/getAll',
                    method: 'POST'
                }).success(callback);
            },
            getOneAgeGroup: function (id, callback) {
                $http({
                    url: adminURL + 'agegroup/getOne',
                    method: 'POST',
                    data: {
                        _id: id
                    }
                }).success(callback);
            },
            saveAgeGroup: function (formData, callback) {
                $http({
                    url: adminURL + 'agegroup/saveData',
                    method: 'POST',
                    data: formData
                }).success(callback);
            },
            getFirstCategories: function (obj, callback) {
                $http({
                    url: adminURL + 'firstcategory/findForDrop',
                    method: 'POST',
                    data: obj
                }).success(callback);
            },
            filterCategory: function (request, callback) {
                $http({
                    url: adminURL + 'sport/filterCategory',
                    method: 'POST',
                    data: {
                        sportList: request._id
                    }
                }).success(callback);
            },
            findForDropSingle: function (request, callback) {
                $http({
                    url: adminURL + 'student/findForDropSingle',
                    method: 'POST',
                    data: request
                }).success(callback);
            },
            getLastOrder: function (request, callback) {
                $http({
                    url: adminURL + 'knockout/getLastOrder',
                    method: 'POST',
                    data: request
                }).success(callback);
            },
            getLastKnockout: function (request, callback) {
                $http({
                    url: adminURL + 'knockout/getLastKnockout',
                    method: 'POST',
                    data: request
                }).success(callback);
            },
            getLastLeague: function (request, callback) {
                $http({
                    url: adminURL + 'league/getLastLeague',
                    method: 'POST',
                    data: request
                }).success(callback);
            },
            getAllFirstCategories: function (callback) {
                $http({
                    url: adminURL + 'firstcategory/getAll',
                    method: 'POST'
                }).success(callback);
            },
            saveFirstCategory: function (obj, callback) {
                $http({
                    url: adminURL + 'firstcategory/saveData',
                    method: 'POST',
                    data: obj
                }).success(callback);

            },
            getMinMaxForTeam: function (obj, callback) {
                $http({
                    url: adminURL + 'sport/getMinMaxForTeam',
                    method: 'POST',
                    data: obj
                }).success(callback);
            },
            getSecondCategories: function (obj, callback) {
                $http({
                    url: adminURL + 'secondcategory/findForDrop',
                    method: 'POST',
                    data: obj
                }).success(callback);
            },
            saveSecondCategory: function (obj, callback) {
                $http({
                    url: adminURL + 'secondcategory/saveData',
                    method: 'POST',
                    data: obj
                }).success(callback);
            },
            saveTeam: function (obj, callback) {
                $http({
                    url: adminURL + 'team/saveData',
                    method: 'POST',
                    data: obj
                }).success(callback);
            },
            getAgeGroups: function (obj, callback) {
                $http({
                    url: adminURL + 'agegroup/findForDrop',
                    method: 'POST',
                    data: obj
                }).success(callback);
            },
            getStudent: function (obj, callback) {
                $http({
                    url: adminURL + 'student/findForDrop',
                    method: 'POST',
                    data: obj
                }).success(callback);
            },
            getStudentBySchool: function (obj, callback) {
                $http({
                    url: adminURL + 'student/findForDropBySchool',
                    method: 'POST',
                    data: obj
                }).success(callback);
            },
            getStudentsbySport: function (request, callback) {
                $http({
                    url: adminURL + 'studentsport/getStudentsbySport',
                    method: 'POST',
                    data: request
                }).success(callback);
            },
            getTeamsbySport: function (request, callback) {
                $http({
                    url: adminURL + 'team/getTeamsbySport',
                    method: 'POST',
                    data: request
                }).success(callback);
            },
            getTeam: function (obj, callback) {
                console.log(obj);
                $http({
                    url: adminURL + 'student/findForDrop',
                    method: 'POST',
                    data: obj
                }).success(callback);
            },
            getOneTeam: function (request, callback) {
                $http({
                    url: adminURL + 'team/getOne',
                    method: 'POST',
                    data: {
                        _id: request.id
                    }
                }).success(callback);
            },
            getOneKnockout: function (request, callback) {
                $http({
                    url: adminURL + 'knockout/getOne',
                    method: 'POST',
                    data: {
                        _id: request.id
                    }
                }).success(callback);
            },
            getOneLeague: function (request, callback) {
                $http({
                    url: adminURL + 'league/getOne',
                    method: 'POST',
                    data: {
                        _id: request.id
                    }
                }).success(callback);
            },
            getOneLeagueKnockout: function (request, callback) {
                $http({
                    url: adminURL + 'leagueknockout/getOne',
                    method: 'POST',
                    data: {
                        _id: request.id
                    }
                }).success(callback);
            },
            getOneHeat: function (request, callback) {
                $http({
                    url: adminURL + 'heat/getOne',
                    method: 'POST',
                    data: {
                        _id: request.id
                    }
                }).success(callback);
            },
            getOneSwissLeague: function (request, callback) {
                $http({
                    url: adminURL + 'swissleague/getOne',
                    method: 'POST',
                    data: {
                        _id: request.id
                    }
                }).success(callback);
            },
            getOneQualifyingRound: function (request, callback) {
                $http({
                    url: adminURL + 'qualifyinground/getOne',
                    method: 'POST',
                    data: {
                        _id: request.id
                    }
                }).success(callback);
            },
            getOneQualifyingKnockout: function (request, callback) {
                $http({
                    url: adminURL + 'qualifyingknockout/getOne',
                    method: 'POST',
                    data: {
                        _id: request.id
                    }
                }).success(callback);
            },
            getAllAgeGroups: function (callback) {
                $http({
                    url: adminURL + 'agegroup/getAll',
                    method: 'POST'
                }).success(callback);
            },
            getLastId: function (callback) {
                $http({
                    url: adminURL + 'school/getLastId',
                    method: 'POST'
                }).success(callback);
            },
            saveSchool: function (obj, callback) {
                $http({
                    url: adminURL + 'school/saveData',
                    method: 'POST',
                    data: obj
                }).success(callback);
            },
            getAllSchool: function (callback) {
                $http({
                    url: adminURL + 'school/getAll',
                    method: 'POST'
                }).success(callback);
            },
            getSchoolList: function (callback) {
                $http({
                    url: adminURL + 'school/getSchool',
                    method: 'POST'
                }).success(callback);
            },
            getOneSchool: function (id, callback) {
                $http({
                    url: adminURL + 'school/getOne',
                    method: 'POST',
                    data: {
                        _id: id
                    }
                }).success(callback);
            },
            getSchoolLimited: function (request, callback) {
                $http({
                    url: adminURL + 'school/getLimitedSchool',
                    method: 'POST',
                    data: request
                }).success(callback);
            },
            knockoutSports: function (request, callback) {
                $http({
                    url: adminURL + 'sport/knockoutSports',
                    method: 'POST',
                    data: {
                        sportlist: request.id
                    }
                }).success(callback);
            },
            swissSports: function (request, callback) {
                $http({
                    url: adminURL + 'sport/drawSports',
                    method: 'POST',
                    data: request
                }).success(callback);
            },
            leagueKnockoutSports: function (request, callback) {
                $http({
                    url: adminURL + 'sport/drawSports',
                    method: 'POST',
                    data: request
                }).success(callback);
            },
            medalSports: function (request, callback) {
                $http({
                    url: adminURL + 'sport/getSportBySportlist',
                    method: 'POST',
                    data: {
                        sportlist: request.id
                    }
                }).success(callback);
            },
            heatSports: function (request, callback) {
                $http({
                    url: adminURL + 'sport/heatSports',
                    method: 'POST',
                    data: {
                        sportlist: request.id
                    }
                }).success(callback);
            },
            leagueSports: function (request, callback) {
                $http({
                    url: adminURL + 'sport/leagueSports',
                    method: 'POST',
                    data: {
                        sportlist: request.id
                    }
                }).success(callback);
            },
            getSportsByYear: function (request, callback) {
                $http({
                    url: adminURL + 'sport/getSportsByYear',
                    method: 'POST',
                    data: {
                        year: request.year
                    }
                }).success(callback);
            },
            getSportsByYearHeat: function (request, callback) {
                $http({
                    url: adminURL + 'sport/getSportsByYearHeat',
                    method: 'POST',
                    data: {
                        year: request.year
                    }
                }).success(callback);
            },
            getLastStudentId: function (callback) {
                $http({
                    url: adminURL + 'student/getLastId',
                    method: 'POST'
                }).success(callback);
            },
            getAllStudent: function (callback) {
                $http({
                    url: adminURL + 'student/getAll',
                    method: 'POST'
                }).success(callback);
            },
            getLimitedStudent: function (data, callback) {
                $http({
                    url: adminURL + 'student/getLimited',
                    method: 'POST',
                    data: data
                }).success(callback);
            },
            getLimitedTeam: function (data, callback) {
                $http({
                    url: adminURL + 'team/getLimited',
                    method: 'POST',
                    data: data
                }).success(callback);
            },
            getLimitedMedia: function (data, callback) {
                $http({
                    url: adminURL + 'media/getLimited',
                    method: 'POST',
                    data: data
                }).success(callback);
            },
            getLimitedSport: function (data, callback) {
                $http({
                    url: adminURL + 'sport/getLimited',
                    method: 'POST',
                    data: data
                }).success(callback);
            },
            getLimitedKnockout: function (request, callback) {
                $http({
                    url: adminURL + 'knockout/getLimited',
                    method: 'POST',
                    data: request
                }).success(callback);
            },
            getLimitedLeague: function (request, callback) {
                $http({
                    url: adminURL + 'league/getLimited',
                    method: 'POST',
                    data: request
                }).success(callback);
            },
            getMedalBySport: function (request, callback) {
                $http({
                    url: adminURL + 'medal/getAllBySport',
                    method: 'POST',
                    data: request
                }).success(callback);
            },
            getHeats: function (request, callback) {
                $http({
                    url: adminURL + 'heat/getAll',
                    method: 'POST',
                    data: request
                }).success(callback);
            },
            getLeagueKnockout: function (request, callback) {
                $http({
                    url: adminURL + 'leagueknockout/getAll',
                    method: 'POST',
                    data: request
                }).success(callback);
            },
            getSwissLeague: function (request, callback) {
                $http({
                    url: adminURL + 'swissleague/getAll',
                    method: 'POST',
                    data: request
                }).success(callback);
            },
            getQualifyingRound: function (request, callback) {
                $http({
                    url: adminURL + 'QualifyingRound/getAll',
                    method: 'POST',
                    data: request
                }).success(callback);
            },
            getQualifyingKnockout: function (request, callback) {
                $http({
                    url: adminURL + 'QualifyingKnockout/getAll',
                    method: 'POST',
                    data: request
                }).success(callback);
            },
            getLimitedSchool: function (data, callback) {
                $http({
                    url: adminURL + 'school/getLimited',
                    method: 'POST',
                    data: data
                }).success(callback);
            },
            getOneStudent: function (id, callback) {
                $http({
                    url: adminURL + 'student/getOne',
                    method: 'POST',
                    data: {
                        _id: id
                    }
                }).success(callback);
            },
            saveStudent: function (obj, callback) {
                $http({
                    url: adminURL + 'student/saveData',
                    method: 'POST',
                    data: obj
                }).success(callback);
            },
            getSports: function (obj, callback) {
                $http({
                    url: adminURL + 'sport/getSports',
                    method: 'POST',
                    data: obj
                }).success(callback);
            },
            hideSchool: function (data, callback) {
                $http({
                    url: adminURL + 'school/hide',
                    method: 'POST',
                    data: data
                }).success(callback);
            },
            hideStudent: function (data, callback) {
                $http({
                    url: adminURL + 'student/hide',
                    method: 'POST',
                    data: data
                }).success(callback);
            },
            deleteSportsList: function (id, callback) {
                $http({
                    url: adminURL + 'sportslist/deleteData',
                    method: 'POST',
                    data: {
                        _id: id
                    }
                }).success(callback);
            },
            deleteMedia: function (id, callback) {
                $http({
                    url: adminURL + 'media/deleteData',
                    method: 'POST',
                    data: {
                        _id: id
                    }
                }).success(callback);
            },
            deleteSport: function (id, callback) {
                $http({
                    url: adminURL + 'sport/deleteData',
                    method: 'POST',
                    data: {
                        _id: id
                    }
                }).success(callback);
            },
            deleteTeam: function (id, callback) {
                $http({
                    url: adminURL + 'team/deleteData',
                    method: 'POST',
                    data: {
                        _id: id
                    }
                }).success(callback);
            },
            deleteKnockout: function (id, callback) {
                $http({
                    url: adminURL + 'knockout/deleteKnockoutCompletely',
                    method: 'POST',
                    data: {
                        _id: id
                    }
                }).success(callback);
            },
            deleteMedal: function (id, callback) {
                $http({
                    url: adminURL + 'medal/deleteData',
                    method: 'POST',
                    data: {
                        _id: id
                    }
                }).success(callback);
            },
            deleteHeat: function (id, callback) {
                $http({
                    url: adminURL + 'heat/deleteData',
                    method: 'POST',
                    data: {
                        _id: id
                    }
                }).success(callback);
            },
            deleteSwissLeague: function (id, callback) {
                $http({
                    url: adminURL + 'swissleague/deleteData',
                    method: 'POST',
                    data: {
                        _id: id
                    }
                }).success(callback);
            },
            deleteQualifyingRound: function (id, callback) {
                $http({
                    url: adminURL + 'qualifyinground/deleteData',
                    method: 'POST',
                    data: {
                        _id: id
                    }
                }).success(callback);
            },
            deleteQualifyingKnockout: function (id, callback) {
                $http({
                    url: adminURL + 'qualifyingknockout/deleteData',
                    method: 'POST',
                    data: {
                        _id: id
                    }
                }).success(callback);
            },
            deleteLeagueKnockout: function (id, callback) {
                $http({
                    url: adminURL + 'leagueknockout/deleteData',
                    method: 'POST',
                    data: {
                        _id: id
                    }
                }).success(callback);
            },
            deleteLeague: function (id, callback) {
                $http({
                    url: adminURL + 'league/deleteData',
                    method: 'POST',
                    data: {
                        _id: id
                    }
                }).success(callback);
            },
            deleteAgegroup: function (id, callback) {
                $http({
                    url: adminURL + 'agegroup/deleteData',
                    method: 'POST',
                    data: {
                        _id: id
                    }
                }).success(callback);
            },
            deleteSchool: function (callback) {
                $http({
                    url: adminURL + 'school/deleteData',
                    method: 'POST',
                    data: {
                        _id: $.jStorage.get("deleteSchool")
                    }
                }).success(callback);
            },
            deleteBanner: function (callback) {
                $http({
                    url: adminURL + 'banner/deleteData',
                    method: 'POST',
                    data: {
                        _id: $.jStorage.get("deleteBanner")
                    }
                }).success(callback);
            },
            deleteStudent: function (callback) {
                $http({
                    url: adminURL + 'student/deleteData',
                    method: 'POST',
                    data: {
                        _id: $.jStorage.get("deleteStudent")
                    }
                }).success(callback);
            },
            deleteSportRule: function (callback) {
                $http({
                    url: adminURL + 'sportrule/deleteData',
                    method: 'POST',
                    data: {
                        _id: $.jStorage.get("deleteSportRule")
                    }
                }).success(callback);
            },
            getStudentList: function (callback) {
                $http({
                    url: adminURL + 'student/getStud',
                    method: 'POST'
                }).success(callback);
            },
            getSchoolSports: function (year, schoolid, callback) {
                $http({
                    url: adminURL + 'school/getSchoolSport',
                    method: 'POST',
                    data: {
                        year: year,
                        _id: schoolid
                    }
                }).success(callback);
            },
            saveStudentSport: function (data, callback) {
                $http({
                    url: adminURL + 'studentsport/saveData',
                    method: 'POST',
                    data: data
                }).success(callback);
            },
            submitKnockout: function (request, callback) {
                $http({
                    url: adminURL + 'knockout/saveData',
                    method: 'POST',
                    data: request
                }).success(callback);
            },
            removeThisStat: function (request, callback) {
                $http({
                    url: adminURL + 'studentstats/removeThisStat',
                    method: 'POST',
                    data: request
                }).success(callback);
            },
            submitLeague: function (request, callback) {
                $http({
                    url: adminURL + 'league/saveData',
                    method: 'POST',
                    data: request
                }).success(callback);
            },
            submitLeagueKnockout: function (request, callback) {
                $http({
                    url: adminURL + 'leagueknockout/saveData',
                    method: 'POST',
                    data: request
                }).success(callback);
            },
            submitMedal: function (request, callback) {
                $http({
                    url: adminURL + 'medal/saveData',
                    method: 'POST',
                    data: request
                }).success(callback);
            },
            saveHeat: function (request, callback) {
                $http({
                    url: adminURL + 'heat/saveData',
                    method: 'POST',
                    data: request
                }).success(callback);
            },
            saveLeagueKnockout: function (request, callback) {
                $http({
                    url: adminURL + 'leagueknockout/saveData',
                    method: 'POST',
                    data: request
                }).success(callback);
            },
            saveSwissLeague: function (request, callback) {
                $http({
                    url: adminURL + 'swissleague/saveData',
                    method: 'POST',
                    data: request
                }).success(callback);
            },
            saveQualifyingRound: function (request, callback) {
                $http({
                    url: adminURL + 'qualifyinground/saveData',
                    method: 'POST',
                    data: request
                }).success(callback);
            },
            saveQualifyingKnockout: function (request, callback) {
                $http({
                    url: adminURL + 'qualifyingknockout/saveData',
                    method: 'POST',
                    data: request
                }).success(callback);
            },
            getStudentSports: function (data, callback) {
                $http({
                    url: adminURL + 'studentsport/getSports',
                    method: 'POST',
                    data: {
                        student: data
                    }
                }).success(callback);
            },
            getOneStudentSport: function (data, callback) {
                $http({
                    url: adminURL + 'studentsport/getOne',
                    method: 'POST',
                    data: {
                        _id: data
                    }
                }).success(callback);
            },
            deleteStudentSport: function (callback) {
                $http({
                    url: adminURL + 'studentsport/deleteData',
                    method: 'POST',
                    data: {
                        _id: $.jStorage.get("deleteStudentSport")
                    }
                }).success(callback);
            },
            countStatic: function (callback) {
                $http({
                    url: adminURL + 'config/countStatic',
                    method: 'POST'
                }).success(callback);
            },
            countForDashboard: function (year, callback) {
                $http({
                    url: adminURL + 'config/countForDashboard',
                    method: 'POST',
                    data: {
                        year: year
                    }
                }).success(callback);
            },
            findStud: function (data, callback) {
                $http({
                    url: adminURL + 'student/findStud',
                    method: 'POST',
                    data: data
                }).success(callback);
            },
            getAllSportRule: function (callback) {
                $http({
                    url: adminURL + 'sportrule/getAll',
                    method: 'POST'
                }).success(callback);
            },
            saveSportRule: function (data, callback) {
                $http({
                    url: adminURL + 'sportrule/saveData',
                    method: 'POST',
                    data: data
                }).success(callback);
            },
            getOneSportRule: function (data, callback) {
                $http({
                    url: adminURL + 'sportrule/getOne',
                    method: 'POST',
                    data: {
                        _id: data
                    }
                }).success(callback);
            },
            getRules: function (data, callback) {
                $http({
                    url: adminURL + 'cityrule/getOne',
                    method: 'POST',
                    data: data
                }).success(callback);
            },
            saveRules: function (data, callback) {
                $http({
                    url: adminURL + 'cityrule/saveData',
                    method: 'POST',
                    data: data
                }).success(callback);
            },
            saveRule: function (data, callback) {
                $http({
                    url: adminURL + 'cityrule/saveData',
                    method: 'POST',
                    data: data
                }).success(callback);
            },
            deleteRules: function (data, callback) {
                console.log(data);
                $http({
                    url: adminURL + 'cityrule/deleteData',
                    method: 'POST',
                    data: data
                }).success(callback);
            },
            getAllRules: function (data, callback) {
                $http({
                    url: adminURL + 'cityrule/getAllRules',
                    method: 'POST',
                    data: data
                }).success(callback);
            },
            saveRankingTable: function (formData, callback) {
                $http({
                    url: adminURL + 'LiveUpdate/saveData',
                    method: 'POST',
                    data: formData
                }).success(callback);
            },
            saveLiveData: function (formData, url, callback) {
                $http({
                    url: adminURL + url,
                    method: 'POST',
                    data: formData
                }).success(callback);
            },
            deleteRecord: function (formData, url, callback) {
                $http({
                    url: adminURL + url,
                    method: 'POST',
                    data: formData
                }).success(callback);
            },
            getOneRecord: function (id, url, callback) {
                $http({
                    url: adminURL + url,
                    method: 'POST',
                    data: id
                }).success(callback);
            },
            getAllRankingTables: function (callback) {
                $http({
                    url: adminURL + 'LiveUpdate/getAllRankingTables',
                    method: 'POST',
                }).success(callback);
            },
            getAllAlbumsOrPhotos: function (url, callback) {
                $http({
                    url: adminURL + url,
                    method: 'POST',
                }).success(callback);
            },
            // NEW GENRATE EXCEL
            // generateSportVideoExcel: function (id, url, callback) {
            //     $http({
            //         url: adminURL + 'student/getDrawFormats',
            //         method: 'POST',
            //         data: id
            //     }).success(callback);
            // },

            generateSportVideoExcelWithData: function (data, callback) {
                console.log('from Controller', data);
                $http.post(adminURL + 'student/getDrawFormats', data, {
                    responseType: 'arraybuffer'
                }).then(function (response) {
                    var header = response.headers('Content-Disposition')
                    var fileName = "Video" + "-" + moment().format("MMM-DD-YYYY-hh-mm-ss-a") + ".xlsx";
                    console.log(fileName);
    
                    var blob = new Blob([response.data], {
                        type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation;charset=UTF-8'
                    });
                    var objectUrl = (window.URL || window.webkitURL).createObjectURL(blob);
                    var link = angular.element('<a/>');
                    link.attr({
                        href: objectUrl,
                        download: fileName
                    })[0].click();
                    callback(null, fileName);
                });
            },
    
            generateSportVideoExcelWithoutData: function (url, data, callback) {
                $http.post(adminURL + url, data, {
                    responseType: 'arraybuffer'
                }).then(function (response) {
                    var header = response.headers('Content-Disposition')
                    var fileName = data.file + "-" + moment().format("MMM-DD-YYYY-hh-mm-ss-a") + ".xlsx";
                    console.log(fileName);
    
                    var blob = new Blob([response.data], {
                        type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation;charset=UTF-8'
                    });
                    var objectUrl = (window.URL || window.webkitURL).createObjectURL(blob);
                    var link = angular.element('<a/>');
                    link.attr({
                        href: objectUrl,
                        download: fileName
                    })[0].click();
                    callback(null, fileName);
                })
            },

            makeactive: function (menuname) {
                for (var i = 0; i < navigation.length; i++) {
                    if (navigation[i].name == menuname) {
                        navigation[i].classis = "active";
                    } else {
                        navigation[i].classis = "";
                    }
                }
                return menuname;
            }
        };
    });