$(function(){

    $(document).on({
        ajaxStart: function() { 
            $("body").addClass("loading");
        },
        ajaxStop : function() { 
            $("body").removeClass("loading"); 
        }
    });

    /*****************************************************
    *************   MOCK API CALLS   *********************
    *****************************************************/
    $.mockjax({
        url: "/api/subscribe",
        responseTime: 2000,
        responseText: {
            "status" : "success"
        }
    });
    
    $.mockjax({
        url: "/api/user",
        type: "post",
        responseTime: [1000, 5000], //random value between 1000ms and 5000ms
        responseText: {
            "status" : "success"
        }
    });
    
    $.mockjax({
        url: "/api/users",
        responseTime: 3000,
        responseText: {
            "users" : ["Dennis Nichols", "Nicholas Sims", "Amelia Gregory", "Perry Reed", "Emma Simmmons", "Kaylee Larson", "Harold Powell", "Lois Berry", "Jeremy Martinez", "Edna Lambert"]
        }
    });
    
    $.mockjax({
        url:"/api/cities",
        responseTime: [1000,2500],
        responseText: {
            "cities" : [
                { "continent":"Asia", "country":"China", "city":"Shanghai"},
                { "continent":"Asia", "country":"China", "city":"Beijing"},
                { "continent":"Asia", "country":"China", "city":"Tianjin"},
                { "continent":"Asia", "country":"China", "city":"Guangzhou"},
                { "continent":"Asia", "country":"China", "city":"Shenzhen"},
                { "continent":"Asia", "country":"India", "city":"Mumbai"},
                { "continent":"Asia", "country":"India", "city":"Kolkata"},
                { "continent":"Asia", "country":"India", "city":"Delhi"},
                { "continent":"Asia", "country":"India", "city":"Chennai"},
                { "continent":"Asia", "country":"India", "city":"Bangalore"},
                { "continent":"Europe", "country":"United Kingdom", "city":"London"},
                { "continent":"Europe", "country":"United Kingdom", "city":"Birmingham"},
                { "continent":"Europe", "country":"United Kingdom", "city":"Leeds"},
                { "continent":"Europe", "country":"United Kingdom", "city":"Glasgow"},
                { "continent":"Europe", "country":"United Kingdom", "city":"Sheffield"},
                { "continent":"Europe", "country":"Turkey", "city":"Istanbul"},
                { "continent":"Europe", "country":"Turkey", "city":"Ankara"},
                { "continent":"Europe", "country":"Turkey", "city":"Izmir"},
                { "continent":"Europe", "country":"Turkey", "city":"Bursa"},
                { "continent":"Europe", "country":"Turkey", "city":"Adana"}
            ]
        }
    });

    /*****************************************************
    ****************     subscribe   *********************
    *****************************************************/
    $("#subscribe-form" ).submit(function( event ) {
        $('.alert').addClass('hidden');
        event.preventDefault();

        if($('#subscribe-email').val()){
            $('#subscribe-email').val('');
            $('#subscribe-button').prop('disabled', true);
            $('#subscribe-email').prop('disabled', true);
            
            $.getJSON("/api/subscribe", function(response) {
                if (response.status === "success") {
                    $('.subscribe-form-success').removeClass('hidden');
                    $('#subscribe-button').prop('disabled', false);
                    $('#subscribe-email').prop('disabled', false);
                }
            });            
        }
        else {
            $('.subscribe-form-fail').removeClass('hidden');
        } 
    });

    /*****************************************************
    ******************     Users    **********************
    *****************************************************/
    $("#add-user").click( function () {
        var fullname = $('#user-fullname').val();
        if(fullname) {
            $('#user-fullname').val('');
            $.post( "/api/user", function(response) {
                $('#user-list').append('<li class="list-group-item">' + fullname + '</li>');
            });
        }
    });

    /*****************************************************
    ******************     Alert    **********************
    *****************************************************/
    $("#alert").click(function () {
        alert( "Alerting..." );
    });

    /*****************************************************
    ****************** Large Cities **********************
    *****************************************************/
    var largeCities;

    if($("#large-cities-panel").length) {
        $.getJSON("/api/cities", function(response) {
            largeCities = response.cities;
            
            var continents = $.unique(response.cities.map(function (d) { return d.continent; }));
            var countries = $.unique(response.cities.map(function (d) { return d.country; }));
            var cities = $.unique(response.cities.map(function (d) { return d.city; }));
            
            populateOptions('continent', continents);
            populateOptions('country', countries);
            populateOptions('city', cities);
            
            $("#continent, #country, #city").prop('disabled', false);
        });
    } 

    $("#continent").change(function() {
        $("#country, #city").val("");
        var selectedContinent = $(this).val();
        var filteredCountries = filterCountriesByContinent(selectedContinent);
        var filteredCities = filterCitiesByContinent(selectedContinent);
        populateOptions('country', filteredCountries);
        populateOptions('city', filteredCities);
    });
    $("#country").change(function() {
        $("#city").val("");
        var filteredCities = filterCitiesByCountry($(this).val());
        populateOptions('city', filteredCities);
    });
    
    function populateOptions(id, list){
        $("#"+id).find("option:gt(0)").remove();
        $.each(list, function(key, value) {
            $('#' + id)
                .append($("<option></option>")
                .attr("value",value)
                .text(value)
                );
        });
    }
    
    function filterCountriesByContinent(continent) {
        var result = [];
        $.each(largeCities, function(index, value) {
            if(value.continent === continent) {
                result.push(value.country);
            }
        });
        return $.unique(result);
    }
    function filterCitiesByContinent(continent) {
        var result = [];
        $.each(largeCities, function(index, value) {
            if(value.continent === continent) {
                result.push(value.city);
            }
        });
        return $.unique(result);
    }
    function filterCitiesByCountry(country) {
        var result = [];
        $.each(largeCities, function(index, value) {
            if(value.country === country) {
                result.push(value.city);
            }
        });
        return $.unique(result);
    }
});