$(document).on({
    ajaxStart: function() { 
        console.log("ajax started");
        $("body").addClass("loading");    },
    ajaxStop : function() { $("body").removeClass("loading"); }    
});