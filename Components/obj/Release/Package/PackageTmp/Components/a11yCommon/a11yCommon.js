'use strict';
var a11yModule = angular.module('a11yModule', []);
a11yModule.factory('a11yCommon', ['$q', '$timeout', function ($q, $timeout) {
    /*var currentUser = {};

    function cloneObject(object) {
        return JSON.parse(JSON.stringify(object));
    };*/


    return {
        getKeyCodes: function () {
            return {
                "backspace": 8,
                "tab": 9,
                "enter": 13,
                "shift": 16,
                "ctrl": 17,
                "alt": 18,
                "esc": 27,
                "space": 32,
                "pageup": 33,
                "pagedown": 34,
                "end": 35,
                "home": 36,
                "left": 37,
                "up": 38,
                "right": 39,
                "down": 40,
                "del": 46,
            };
        },

        getFilteredStates: function (searchString) {
            var testPattern = new RegExp('^' + searchString, 'i');
            var filteredUSStates = this.USStates.filter(function (item) {
                return testPattern.test(item.name);
            });
            return filteredUSStates;
        },

        getFilteredCountries: function (searchString) {
            var testPattern = new RegExp('^' + searchString, 'i');
            var filteredAsianCountries = this.AsianCountries.filter(function (item) {
                return testPattern.test(item.name);
            });
            return filteredAsianCountries;
        },

        USStates: [
            { "code": "AL", "name": "Alabama" },
            { "code": "AK", "name": "Alaska" },
            { "code": "AS", "name": "American Samoa" },
            { "code": "AZ", "name": "Arizona" },
            { "code": "AR", "name": "Arkansas" },
            { "code": "CA", "name": "California" },
            { "code": "CO", "name": "Colorado" },
            { "code": "CT", "name": "Connecticut" },
            { "code": "DE", "name": "Delaware" },
            { "code": "DC", "name": "District of Columbia" },
            { "code": "FL", "name": "Florida" },
            { "code": "GA", "name": "Georgia" },
            { "code": "GU", "name": "Guam" },
            { "code": "HI", "name": "Hawaii" },
            { "code": "ID", "name": "Idaho" },
            { "code": "IL", "name": "Illinois" },
            { "code": "IN", "name": "Indiana" },
            { "code": "IA", "name": "Iowa" },
            { "code": "KS", "name": "Kansas" },
            { "code": "KY", "name": "Kentucky" },
            { "code": "LA", "name": "Louisiana" },
            { "code": "ME", "name": "Maine" },
            { "code": "MD", "name": "Maryland" },
            { "code": "MA", "name": "Massachusetts" },
            { "code": "MI", "name": "Michigan" },
            { "code": "MN", "name": "Minnesota" },
            { "code": "MS", "name": "Mississippi" },
            { "code": "MO", "name": "Missouri" },
            { "code": "MT", "name": "Montana" },
            { "code": "NE", "name": "Nebraska" },
            { "code": "NV", "name": "Nevada" },
            { "code": "NH", "name": "New Hampshire" },
            { "code": "NJ", "name": "New Jersey" },
            { "code": "NM", "name": "New Mexico" },
            { "code": "NY", "name": "New York" },
            { "code": "NC", "name": "North Carolina" },
            { "code": "ND", "name": "North Dakota" },
            { "code": "MP", "name": "Northern Marianas Islands" },
            { "code": "OH", "name": "Ohio" },
            { "code": "OK", "name": "Oklahoma" },
            { "code": "OR", "name": "Oregon" },
            { "code": "PA", "name": "Pennsylvania" },
            { "code": "PR", "name": "Puerto Rico" },
            { "code": "RI", "name": "Rhode Island" },
            { "code": "SC", "name": "South Carolina" },
            { "code": "SD", "name": "South Dakota" },
            { "code": "TN", "name": "Tennessee" },
            { "code": "TX", "name": "Texas" },
            { "code": "UT", "name": "Utah" },
            { "code": "VT", "name": "Vermont" },
            { "code": "VA", "name": "Virginia" },
            { "code": "VI", "name": "Virgin Islands" },
            { "code": "WA", "name": "Washington" },
            { "code": "WV", "name": "West Virginia" },
            { "code": "WI", "name": "Wisconsin" },
            { "code": "WY", "name": "Wyoming" },
            { "code": "OR", "name": "New Oregon" },
            { "code": "PA", "name": "New Pennsylvania" },
            { "code": "PR", "name": "New Puerto Rico" },
            { "code": "RI", "name": "New Rhode Island" },
            { "code": "SC", "name": "New South Carolina" },
            { "code": "SD", "name": "New South Dakota" },
            { "code": "OK", "name": "New Oklahoma New Oklahoma New Oklahoma New Oklahoma New Oklahoma" },
            { "code": "TN", "name": "New Tennessee" },
            { "code": "TX", "name": "New Texas" },
            { "code": "UT", "name": "New Utah" },
            { "code": "VT", "name": "New Vermont" },
            { "code": "VA", "name": "New Virginia" },
            { "code": "VI", "name": "New Virgin Islands" },
            { "code": "WA", "name": "New Washington" },
            { "code": "WV", "name": "New West Virginia" },
            { "code": "WI", "name": "New Wisconsin" },
            { "code": "WY", "name": "New Wyoming" }
        ],

        AsianCountries: [
            { "code": "AF", "name": "Afghanistan" },
            { "code": "AR", "name": "Armenia" },
            { "code": "AZ", "name": "Azerbaijan" },
            { "code": "BA", "name": "Bahrain" },
            { "code": "BN", "name": "Bangladesh" },
            { "code": "BH", "name": "Bhutan" },
            { "code": "BR", "name": "Brunei" },
            { "code": "CA", "name": "Cambodia" },
            { "code": "CH", "name": "China" },
            { "code": "CY", "name": "Cyprus" },
            { "code": "GE", "name": "Georgia" },
            { "code": "IN", "name": "India" },
            { "code": "ID", "name": "Indonesia" },
            { "code": "IR", "name": "Iran" },
            { "code": "IA", "name": "Iraq" },
            { "code": "IS", "name": "Israel" },
            { "code": "JA", "name": "Japan" },
            { "code": "JO", "name": "Jordan" },
            { "code": "KA", "name": "Kazakhstan" },
            { "code": "KU", "name": "Kuwait" },
            { "code": "KY", "name": "Kyrgyzstan" },
            { "code": "LA", "name": "Laos" },
            { "code": "LE", "name": "Lebanon" },
            { "code": "MA", "name": "Malaysia" },
            { "code": "ML", "name": "Maldives" },
            { "code": "MO", "name": "Mongolia" },
            { "code": "MY", "name": "Myanmar (Burma)" },
            { "code": "NE", "name": "Nepal" },
            { "code": "NO", "name": "North Korea" },
            { "code": "OM", "name": "Oman" },
            { "code": "PA", "name": "Pakistan" },
            { "code": "PL", "name": "Palestine" },
            { "code": "PH", "name": "Philippines" },
            { "code": "QA", "name": "Qatar" },
            { "code": "RU", "name": "Russia" },
            { "code": "SA", "name": "Saudi Arabia" },
            { "code": "SI", "name": "Singapore" },
            { "code": "SO", "name": "South Korea" },
            { "code": "SR", "name": "Sri Lanka" },
            { "code": "SY", "name": "Syria" },
            { "code": "TA", "name": "Taiwan" },
            { "code": "TJ", "name": "Tajikistan" },
            { "code": "TH", "name": "Thailand" },
            { "code": "TI", "name": "Timor-Leste" },
            { "code": "TU", "name": "Turkey" },
            { "code": "TK", "name": "Turkmenistan" },
            { "code": "UA", "name": "United Arab Emirates" },
            { "code": "UZ", "name": "Uzbekistan" },
            { "code": "VI", "name": "Vietnam" },
            { "code": "YE", "name": "Yemen" }
        ],

        WeekDays: [
            { "abbr": "Sun", "fullName": "Sunday" },
            { "abbr": "Mon", "fullName": "Monday" },
            { "abbr": "Tue", "fullName": "Tuesday" },
            { "abbr": "Wed", "fullName": "Wednesday" },
            { "abbr": "Thu", "fullName": "Thrusday" },
            { "abbr": "Fri", "fullName": "Friday" },
            { "abbr": "Sat", "fullName": "Saturday" }
        ],

        CalenderMonths: [
            { "abbr": "Jan", "fullName": "January" },
            { "abbr": "Feb", "fullName": "February" },
            { "abbr": "Mar", "fullName": "March" },
            { "abbr": "Apr", "fullName": "April" },
            { "abbr": "May", "fullName": "May" },
            { "abbr": "Jun", "fullName": "June" },
            { "abbr": "Jul", "fullName": "July" },
            { "abbr": "Aug", "fullName": "August" },
            { "abbr": "Sep", "fullName": "September" },
            { "abbr": "Oct", "fullName": "October" },
            { "abbr": "Nov", "fullName": "November" },
            { "abbr": "Dec", "fullName": "December" }
        ]
    };
}])