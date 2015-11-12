$(function(){
    var $container = $('.page-body');
    var $iframe = $('#scaled-frame');
    var $window = $(window).on('resize', function(){
        var height = $(this).height()-100;
        $container.height(height);
        $iframe.height(height * 1.3);
        $iframe.width($(this).width()/2 * 1.3);
    }).trigger('resize'); //on page load

    var tests = [
    	{
    		suite:'login',
    		title:'Verify user can login with valid user account',
    		verify: function($dom) {
    			console.log('Runnuning');
    			console.log($dom);
    			$dom.find('a[href$="/login"]').trigger('click');
    		}
    	}
    ];

    $('#tests').html('');

    for (var i = 0; i < tests.length; i++) {
    	var test = tests[i];
    	$('#tests').append('<h2 class="test-suite">' + test.suite + '</h2>');
    	$('#tests').append('<p><span class="test-status"></span>' + test.title + '</p>');
    	//test.verify($('#scaled-frame').contents());
    };

    $("iframe").ready(function () {
    	console.log('iframe is ready');
    	console.log($('iframe').contents());
    	if($('iframe').contents().find('a').length) {
    		console.log('found the element');
    	}
    	else {
    		console.log('cannot found the element');	
    	}
    	$('#scaled-frame').contents().find('a[href="/login"]').trigger('click');
	});

    
    
});