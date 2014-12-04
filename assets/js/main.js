// JavaScript Document

$(document).ready(function(){
	
	var isMobile = {
	    Android: function() {
	        return navigator.userAgent.match(/Android/i);
	    },
	    BlackBerry: function() {
	        return navigator.userAgent.match(/BlackBerry/i);
	    },
	    iOS: function() {
	        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	    },
	    Opera: function() {
	        return navigator.userAgent.match(/Opera Mini/i);
	    },
	    Windows: function() {
	        return navigator.userAgent.match(/IEMobile/i);
	    },
	    any: function() {
	        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	    }
	};
	
	var siteSetup = {
		
		btnSetup : function(){
			$('#btn-contact').click(function(event) {
				event.preventDefault();

				$('html, body').animate({
					scrollTop: $("#map").offset().top
				}, 1000);
			});
		},
		
		slideBtnDown : function(){
			var hasLink = $('li#arrow-bottom').length;
			if ( hasLink > 0 ){
				$('li#arrow-bottom a').click(function(event) {
					event.preventDefault();
					if ( isMobile.any() == null || isMobile.any() == "null" ){
						$('html, body').animate({
							scrollTop: $("#slide-nav").offset().top
						}, 1000);
					}else{
						$('html, body').animate({
							scrollTop: $("#block-courses").offset().top
						}, 1000);
					};
				});
			};
		},
		
		navSetup : function(){
			$(window).scroll(function() {
				var getHeight = $(window).scrollTop();
				if ( getHeight > 100 ){
					$('div#nav').css('background-color', '#FFF');
					$('div#nav ul li a').css('color', '#485275');
					$('#logo-white').hide();
					$('#logo-blue').show();
				}else{
					$('div#nav').css('background-color', 'transparent');
					$('div#nav ul li a').css('color', '#FFF');
					$('#logo-white').show();
					$('#logo-blue').hide();
				};
			});
		},
		
		bannerTransition : null,
		
		slideIndex : 0,
		
		slideShowSetup : function(){
			var hasSlides = $('#slides').length;
			if ( hasSlides > 0 ){
				
				var slides = new Array();
				
				$('.slide').each(function(index) {
					$(this).hide();
					slides.push($(this));
				});
				
				slides[siteSetup.slideIndex].show();
				
				//CLICK SETUP
				$('#arrow-right a').click(function(event) {
					event.preventDefault();
					siteSetup.changeSlide(slides, "right");
				});
				
				$('#arrow-left a').click(function(event) {
					event.preventDefault();
					siteSetup.changeSlide(slides, "left");
				});
				
				//AUTOMATIC SETUP
				siteSetup.bannerTransition = self.setTimeout(function(){ siteSetup.changeSlide(slides, "right"); },7000);
				
				if ( navigator.userAgent.indexOf("Explorer") == -1 && navigator.userAgent.indexOf("Microsoft") == -1 ){
				    $(window).focus(function(){
						clearTimeout(siteSetup.bannerTransition); 
						siteSetup.bannerTransition = null;
					});

				    $(window).blur(function(){
						if (!siteSetup.bannerTransition){
							siteSetup.bannerTransition = self.setTimeout(function(){ siteSetup.changeSlide(slides, "right"); },7000);
						}
					});
				}
				
			};
		},
		
		changeSlide : function(slides, direction){
			if ( siteSetup.bannerTransition ){ clearTimeout(siteSetup.bannerTransition) };
			
			if ( direction == "right" ){
				if ( siteSetup.slideIndex < (slides.length - 1) ){
					siteSetup.slideIndex++;
				}else{
					siteSetup.slideIndex = 0;
				};
			}else{
				if ( siteSetup.slideIndex > 0 ){
					siteSetup.slideIndex--;
				}else{
					siteSetup.slideIndex = (slides.length - 1);
				};
			};
			
			$('#slide-nav').hide();
			$('#slide-transition').fadeIn('fast', function() {
				for (var i = 0; i < slides.length; i++) {
					if ( i != siteSetup.slideIndex ){
						slides[i].hide();
					}else{
						slides[i].show();
						$('#slide-transition').fadeOut('fast', function() {
							$('#slide-nav').fadeIn('fast');
						});

					};
				};
			});
			
			siteSetup.bannerTransition = self.setTimeout(function(){ siteSetup.changeSlide(slides, "right"); },7000);
		},
		
		randomBlock : function(){
			var hasRandom = $('#block-random').length;
			
			if ( hasRandom > 0 ){
				
				var random = siteSetup.getCookie("randomBlock");
				var randomSize = 2;
				var randomBlocks = new Array();
				var randomIndex = 0;
				
				for (var i = 0; i < randomSize; i++) {
					if ( $('#block-random').hasClass('random-block-0'+(i+1)) ){
						$('#block-random').removeClass('random-block-0'+(i+1));
					};
				};
				
				$('#block-random .block-unit').each(function(){
					randomBlocks.push($(this));
					$(this).hide();
				});
				
				if (random != "") {
					
					switch(random){
						case '1':
							$('#block-random').addClass('random-block-01');
						break;
						case '2':
							$('#block-random').addClass('random-block-02');
						break;
					}
					
					randomIndex = parseInt(random);
					randomBlocks[(randomIndex-1)].show();
					
					if ( randomIndex < randomBlocks.length ){
						randomIndex++;
					}else{
						randomIndex = 1;
					};
					
					siteSetup.setCookie("randomBlock", randomIndex, 365);
					
			    } else {
					siteSetup.setCookie("randomBlock", "1", 365);
					$('#block-random').addClass('random-block-01');
					randomBlocks[0].show();
				}
			
			};
		},
		
		setCookie : function(cname, cvalue, exdays) {
		    var d = new Date();
		    d.setTime(d.getTime() + (exdays*24*60*60*1000));
		    var expires = "expires="+d.toGMTString();
		    document.cookie = cname + "=" + cvalue + "; " + expires;
		},

		getCookie : function(cname) {
		    var name = cname + "=";
		    var ca = document.cookie.split(';');
		    for(var i=0; i<ca.length; i++) {
		        var c = ca[i];
		        while (c.charAt(0)==' ') c = c.substring(1);
		        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
		    }
		    return "";
		},
		
		setupFormClicks : function(){
			$('.to-form').click(function(event) {
				event.preventDefault();
				var navBarHeight = $('#nav').height();
				var finalPos = ($("#contact-block").offset().top) - navBarHeight;
				
				if ( isMobile.any() == null || isMobile.any() == "null" ){
					$('html, body').animate({
						scrollTop: finalPos
					}, 1000);
				}else{
					$('html, body').animate({
						scrollTop: $("#contact-block").offset().top
					}, 1000);
				};
				
			});
		},
		
		setupFormSender : function(){
			var hasSender = $('#contact-block').length;
			
			if ( hasSender > 0 ){
				
				$('#btn-submit').click(function(event) {
					
					var proceed = true;

					$("#contact-block input[required=true], #contact-block textarea[required=true]").each(function(index) {
						$(this).css('background-color', '#FFF');
						if(!$.trim($(this).val())){
							$(this).css('background-color', '#ece77d');
			                proceed = false;
			            }else{
							if ( $(this).attr('id') == "contact-msg" ){
								if ( $.trim($(this).val().indexOf("MENSAGEM *")) != -1 ){
									$(this).css('background-color', '#ece77d');
					                proceed = false;
								};
							};
						}
						
						//check invalid email
			            var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
			            if($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))){
			                $(this).css('background-color', '#ece77d');
			                proceed = false;
			            }
					});

					if(proceed) //everything looks good! proceed...
			        {
			            //setup load message
						$("#contact-block #form-holder").slideUp(); //hide form after success
						$("#contact-block #form-load").hide().slideDown();
			
						//get input field values data to be sent to server
			            post_data = {
			                'user_name'     : $('input[name=contact-name]').val(), 
			                'user_email'    : $('input[name=contact-mail]').val(), 
			                'phone'  		: $('input#contact-tel').val(),
			                'msg'           : $('textarea[name=contact-msg]').val()
			            };

			            //Email object data - LOG
			            console.log("\nEmail Data Obj: ");
			            console.log(post_data);

			            //Ajax post data to server
			            $.post('contact_me.php', post_data, function(response){

			            	console.log("\nEmail Send Response: ");
			            	console.log(response);

			                if(response.type == 'error'){ //load json data from server and output message     
			                    output = '<div class="error">'+response.text+'</div>';
			                }else{
			                    output = '<div class="success">'+response.text+'</div>';
			                    //reset values in all input fields
			                    $("#contact-block  input[required=true], #contact-block textarea[required=true]").val(''); 
			                    $("#contact-block #form-load").slideUp(); //hide form after success
			                }
			                $("#contact-block #form-response").hide().html(output).slideDown();
			            }, 'json').done(function(response){
			            },"json");
			        }
				});
				
			};
		},
		
		init : function(){
			this.btnSetup();
			this.navSetup();
			this.slideBtnDown();
			this.slideShowSetup();
			this.randomBlock();
			this.setupFormClicks();
			this.setupFormSender();
		}
		
	};
	
	siteSetup.init();
	
});
