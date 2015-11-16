$(function(){
    chai.should();
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
                $dom.find('a[href$="/login"]').trigger('click');
            }
        }
    ];

    $('#tests').html('');

    for (var i = 0; i < tests.length; i++) {
        var test = tests[i];
        $('#tests').append('<h2 class="test-suite">' + test.suite + '</h2>');
        $('#tests').append('<p><span class="test-status"></span>' + test.title + '</p>');
        test.verify($('#scaled-frame').contents());
    };

    $("iframe#scaled-frame").load(function () {
        var $content = $("iframe").contents();
        var $element = $content.find('a[href="/login"]');
        if($element.length) {
            //$element.get(0).click();
        }

        
    });
    
    $('#btn').click(function(){
        console.log("1");
        $("iframe#scaled-frame").contents().find('#btn-login').get(0).click();
            console.log("2");

        $("iframe#scaled-frame").one( "load", function() { 
            console.log("3");
            $("iframe#scaled-frame").contents().find('#email').val('valid@email.com');
            console.log("4");
            $("iframe#scaled-frame").contents().find('#pwd').val('secret');
            console.log("5");
            $("iframe#scaled-frame").contents().find('#submit-btn').get(0).click();
            
            $("iframe#scaled-frame").one( "load", function() { 
                console.log("6");
                console.log($("iframe#scaled-frame").contents().find('.login-welcome-msg').text().should.equal('Your login is successful'));
            });
        });
    });
    
});