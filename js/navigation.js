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
        loginAdmin: function(formData, callback) {
            $http({
                url: adminURL + 'admin/login',
                method: 'POST',
                data: formData
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
