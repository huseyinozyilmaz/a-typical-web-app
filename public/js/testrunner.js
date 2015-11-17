$(function(){

    function Runner(iframeSelector) {
        var logEvent = 'test.log';
        var testEvent = 'test.finish';
        var $iframe = $(iframeSelector).contents();
        this.assertions = [];
        this.selectedElement = null;
        this.currentSelector = null;
        
        this.element = function (selector) {
            this.currentSelector = selector;
            this.selectedElement = $iframe.find(selector);
            this.logElementEvent(selector);
            
            return this;
        };
        this.click = function() {
            this.selectedElement.get(0).click();
        };
        this.text = function() {
            return this;
        };
        this.enter = function(text) {
            this.selectedElement.val(text);
        };
        this.waitForPage = function() {
            var deferred = $.Deferred();
            $(iframeSelector).one("load", function() {
                //Refresh the content
                $iframe = $(iframeSelector).contents();
                //Resolve the promise
                deferred.resolve();
            });
            return deferred.promise();
        };
        this.shouldBe = function (arg) {
            this.logAssertion(arg);
            return arg === this.selectedElement.text();
        };
        this.end = function(){
            var passedAssertions = $.grep(this.assertions, function(item, index) {
                return item.success;
            });
            var failedAssertions = $.grep(this.assertions, function(item, index) {
                return !item.success;
            });;
            $(this).trigger(testEvent, {
                success : !failedAssertions && passedAssertions,
                msg : 'Verified <strong>' + this.assertions.length + '</strong> assertions: <strong>' + passedAssertions.length + '</strong> passed, <strong>' + failedAssertions.length + '</strong> failed' 
            });
        };
        this.logAssertion = function(arg) { 
            var log = {};
            if(arg == this.selectedElement.text()) {
                log = { 
                    success: true,
                    expected: arg, 
                    actual: this.selectedElement.text(),
                    msg: 'Testing if element ' + this.currentSelector + ' has text <strong>' + arg + '</strong>'
                };
            }
            else {
                log = { 
                    success: false,
                    expected:arg, 
                    actual:this.selectedElement.text(),
                    msg: 'Testing if element ' + this.currentSelector + ' has text <strong>' + arg + '</strong>. Failed: I found <strong>' + this.selectedElement.text() + '</strong> instead!'
                };   
            }
            this.assertions.push(log);
            $(this).trigger(logEvent, log);
        };
        this.logElementEvent = function(selector) {
            if(this.selectedElement.length ) {
                $(this).trigger(logEvent, {
                    assertion: false,
                    success:true,
                    msg : "I found the element using " + selector 
                });
            }
            else {
                $(this).trigger(logEvent, { 
                    success:false, 
                    assertion: false,
                    msg:'I cannot found any element using ' + selector 
                });
            }
        };
    }

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
            verify: function(runner) {
                runner.element('#btn-login').click();
                runner.waitForPage().then(function(){
                    runner.element('#email').enter('valid@email.com');
                    runner.element('#pwd').enter('secret');
                    runner.element('#submit-btn').click();
                    runner.waitForPage().then(function() {
                        runner.element('.login-welcome-msg').text().shouldBe('Your login is successfuls');
                        runner.end();
                    });
                });
            }
        }
    ];

    

    $('#tests').html('');

    for (var i = 0; i < tests.length; i++) {
        var test = tests[i];
        var id   = i + 1;
        var template = '';
        template+= '<h2 class="test-suite">' + test.suite + '</h2>';
        template+= '<div class="test-container test-run" id="test-case-'+ id +'">';
        template+= '<a href="#" title="Run this test">';
        template+= '<span class="test-status"></span>';
        template+= test.title;
        template+= '</a>';
        template+= '<ul class="test-logs"></ul>';
        template+= '</div>';

        $('#tests').append(template);
        $("#test-case-"+id).data( "test", test);
    };



    $('.test-run').click(function() {
        var runner = new Runner($("iframe#scaled-frame"));
        var $logs = $(this).find('.test-logs');
        $(runner).bind("test.log", function(e, log){
            $logs.append('<li class="success-' + log.success + '">' + log.msg + '</li>');
        });
        $(runner).bind("test.finish", function(e, result){
            $('.test-status').addClass('test-failed');
            if(result.success){
                $('.test-status').addClass('test-passed');    
            }
        });
            
        
        var test = $(this).data('test');
        test.verify(runner);
    });
    
    $('#btn').click(function() {
    
        /**    
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
**/
    });
});