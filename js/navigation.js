var adminURL = "http://192.168.1.121:1337/";
var imgURL = "upload/";

var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function($http) {
    var navigation = [{
        name: "Dashboard",
        classis: "active",
        anchor: "dashboard",
        icon: "dashboard",
        subnav: []
    }, {
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
        name: "Age Groups",
        classis: "active",
        anchor: "agegroup",
        icon: "users",
        subnav: []
    }];

    return {
        getnav: function() {
            return navigation;
        },
        getCurrentPosition: function(callback) {
            $http({
                url: "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDCa1LUe1vOczX1hO_iGYgyo8p_jYuGOPU",
                method: 'POST'
            }).success(callback);
        },
        loginAdmin: function(formData, callback) {
            $http({
                url: adminURL + 'admin/login',
                method: 'POST',
                data: formData
            }).success(callback);
        },
        getAllSportList: function(callback) {
            $http({
                url: adminURL + 'sportslist/getAll',
                method: 'POST'
            }).success(callback);
        },
        getOneSportList: function(id, callback) {
            $http({
                url: adminURL + 'sportslist/getOne',
                method: 'POST',
                data: {
                    _id: id
                }
            }).success(callback);
        },
        saveSportList: function(formData, callback) {
            $http({
                url: adminURL + 'sportslist/saveData',
                method: 'POST',
                data: formData
            }).success(callback);
        },
        getAllSport: function(callback) {
            $http({
                url: adminURL + 'sport/getAll',
                method: 'POST'
            }).success(callback);
        },
        getOneSport: function(id, callback) {
            $http({
                url: adminURL + 'sport/getOne',
                method: 'POST',
                data: {
                    _id: id
                }
            }).success(callback);
        },
        saveSport: function(formData, callback) {
            $http({
                url: adminURL + 'sport/saveData',
                method: 'POST',
                data: formData
            }).success(callback);
        },
        getAllAgeGroup: function(callback) {
            $http({
                url: adminURL + 'agegroup/getAll',
                method: 'POST'
            }).success(callback);
        },
        getOneAgeGroup: function(id, callback) {
            $http({
                url: adminURL + 'agegroup/getOne',
                method: 'POST',
                data: {
                    _id: id
                }
            }).success(callback);
        },
        saveAgeGroup: function(formData, callback) {
            $http({
                url: adminURL + 'agegroup/saveData',
                method: 'POST',
                data: formData
            }).success(callback);
        },
        getFirstCategories: function(obj, callback) {
            $http({
                url: adminURL + 'firstcategory/findForDrop',
                method: 'POST',
                data: obj
            }).success(callback);
        },
        saveFirstCategory: function(obj, callback) {
            $http({
                url: adminURL + 'firstcategory/saveData',
                method: 'POST',
                data: obj
            }).success(callback);
        },
        getSecondCategories: function(obj, callback) {
            $http({
                url: adminURL + 'secondcategory/findForDrop',
                method: 'POST',
                data: obj
            }).success(callback);
        },
        saveSecondCategory: function(obj, callback) {
            $http({
                url: adminURL + 'secondcategory/saveData',
                method: 'POST',
                data: obj
            }).success(callback);
        },
        getAgeGroups: function(obj, callback) {
            $http({
                url: adminURL + 'agegroup/findForDrop',
                method: 'POST',
                data: obj
            }).success(callback);
        },
        getLastId: function(callback) {
            $http({
                url: adminURL + 'school/getLastId',
                method: 'POST'
            }).success(callback);
        },
        saveSchool: function(obj, callback) {
            $http({
                url: adminURL + 'school/saveData',
                method: 'POST',
                data: obj
            }).success(callback);
        },
        getAllSchool: function(callback) {
            $http({
                url: adminURL + 'school/getAll',
                method: 'POST'
            }).success(callback);
        },
        getSchoolList: function(callback) {
            $http({
                url: adminURL + 'school/getSchool',
                method: 'POST'
            }).success(callback);
        },
        getOneSchool: function(id, callback) {
            $http({
                url: adminURL + 'school/getOne',
                method: 'POST',
                data: {
                    _id: id
                }
            }).success(callback);
        },
        getLastStudentId: function(callback) {
            $http({
                url: adminURL + 'student/getLastId',
                method: 'POST'
            }).success(callback);
        },
        getAllStudent: function(callback) {
            $http({
                url: adminURL + 'student/getAll',
                method: 'POST'
            }).success(callback);
        },
        getOneStudent: function(id, callback) {
            $http({
                url: adminURL + 'student/getOne',
                method: 'POST',
                data: {
                    _id: id
                }
            }).success(callback);
        },
        saveStudent: function(obj, callback) {
            $http({
                url: adminURL + 'student/saveData',
                method: 'POST',
                data: obj
            }).success(callback);
        },
        getSchoolSports: function(id, callback) {
            $http({
                url: adminURL + 'school/getSchoolSport',
                method: 'POST',
                data: {
                    _id: id
                }
            }).success(callback);
        },
        getSports: function(obj, callback) {
            $http({
                url: adminURL + 'sport/getSports',
                method: 'POST',
                data: obj
            }).success(callback);
        },
        hideSchool: function(data, callback) {
            $http({
                url: adminURL + 'school/hide',
                method: 'POST',
                data: data
            }).success(callback);
        },
        hideStudent: function(data, callback) {
            $http({
                url: adminURL + 'student/hide',
                method: 'POST',
                data: data
            }).success(callback);
        },
        deleteSportsList: function(id, callback) {
            $http({
                url: adminURL + 'sportslist/deleteData',
                method: 'POST',
                data: {
                    _id: id
                }
            }).success(callback);
        },
        deleteSport: function(id, callback) {
            $http({
                url: adminURL + 'sport/deleteData',
                method: 'POST',
                data: {
                    _id: id
                }
            }).success(callback);
        },
        deleteAgegroup: function(id, callback) {
            $http({
                url: adminURL + 'agegroup/deleteData',
                method: 'POST',
                data: {
                    _id: id
                }
            }).success(callback);
        },
        deleteSchool: function(callback) {
            $http({
                url: adminURL + 'school/deleteData',
                method: 'POST',
                data: {
                    _id: $.jStorage.get("deleteSchool")
                }
            }).success(callback);
        },
        deleteStudent: function(callback) {
            $http({
                url: adminURL + 'student/deleteData',
                method: 'POST',
                data: {
                    _id: $.jStorage.get("deleteStudent")
                }
            }).success(callback);
        },
        getStudentList: function(callback) {
            $http({
                url: adminURL + 'student/getStud',
                method: 'POST'
            }).success(callback);
        },
        makeactive: function(menuname) {
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
