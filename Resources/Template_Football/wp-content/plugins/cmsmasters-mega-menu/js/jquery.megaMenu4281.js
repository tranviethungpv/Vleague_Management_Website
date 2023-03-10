/**
 * @package 	WordPress Plugin
 * @subpackage 	CMSMasters Mega Menu
 * @version 	1.2.7
 * 
 * Mega Menu Script
 * Created by CMSMasters
 * 
 */


var header = jQuery('#header .header_mid_inner'), 
	nav = jQuery('#navigation'), 
	nav_left = nav.offset().left, 
	mega = nav.find('> li.menu-item-mega'), 
	header_width = header.width(), 
	firstRun = true, 
	rtl = jQuery('html').attr('dir');


jQuery(document).ready(function() { 
	cmsmastersMegaMenu();
} );


jQuery(window).on('debouncedresize', function () { 
	setTimeout(function () {
		cmsmastersMegaMenu();
	}, 150);
} );


jQuery(window).on('debouncedscroll', function () { 
	cmsmastersMegaMenu();
} );


function cmsmastersMegaMenu() { 
	var win_width = jQuery(window).width(), 
		new_header_width = header.width(), 
		header_pad_left = Number(header.css('padding-left').replace('px', '')), 
		header_left = header.offset().left + header_pad_left, 
		header_right = header_left + new_header_width, 
		new_nav_left = nav.offset().left;
	
	
	if (
		firstRun || 
		new_header_width !== header_width || 
		new_nav_left !== nav_left
	) {
		mega.each(function () { 
			var li = jQuery(this), 
				full = li.hasClass('menu-item-mega-fullwidth'), 
				drop_right = li.hasClass('menu-item-dropdown-right'), 
				li_left = li.offset().left, 
				mega = li.find('> div');
			
			
			if (mega.length === 1) {
				var mega_width = mega.outerWidth(), 
					mega_left = mega.offset().left, 
					mega_right = mega_left + mega_width;
				
				
				if (full) {
					mega.css( { 
						width : 	new_header_width + 'px', 
						right : 	'auto', 
						left : 		'-' + (li_left - header_left) + 'px' 
					} );
				} else {
					if (mega_width >= new_header_width) {
						li.addClass('menu-item-mega-fullwidth menu-item-mega-dynamic-fullwidth').find('> div').css( { 
							width : 	new_header_width + 'px', 
							right : 	'auto', 
							left : 		'-' + ((typeof(rtl) === 'undefined') ? (li_left - header_left) : (mega_right - header_right)) + 'px' 
						} );
					} else {
						if (drop_right) {
							if (typeof(rtl) === 'undefined') {
								if (mega_left < header_left) {
									mega.css( { 
										right : 	'auto', 
										left : 		'-' + (li_left - header_left) + 'px' 
									} );
								}
							} else {
								if (mega_right > header_right) {
									mega.css( { 
										left : 	'-' + (mega_right - header_right) + 'px' 
									} );
								}
							}
						} else {
							if (typeof(rtl) === 'undefined') {
								if (mega_right > header_right) {
									mega.css( { 
										left : 	'-' + (mega_right - header_right) + 'px' 
									} );
								} else if (mega_left < header_left) {
									mega.css( { 
										left : 	'-' + (li_left - header_left) + 'px' 
									} );
								}
							} else {
								if (mega_left < header_left) {
									mega.css( { 
										right : 	'auto', 
										left : 		'-' + (li_left - header_left) + 'px' 
									} );
								}
							}
						}
					}
				}
				
				
				if (win_width < 1008) {
					mega.css( { 
						width : 	'', 
						right : 	'', 
						left : 		'' 
					} );
					
					
					mega.find('a').each(function () { 
						var a_style = jQuery(this).attr('style'), 
							span_tag = jQuery(this).find('span');
						
						
						jQuery(this).removeAttr('style').attr('data-style', a_style);
						
						
						span_tag.each(function () { 
							var span_style = jQuery(this).attr('style');
							
							
							jQuery(this).removeAttr('style').attr('data-style', span_style);
						} );
					} );
				} else {
					mega.find('a').each(function () { 
						var a_style = jQuery(this).attr('data-style'), 
							span_tag = jQuery(this).find('span');
						
						
						jQuery(this).removeAttr('data-style').attr('style', a_style);
						
						
						span_tag.each(function () { 
							var span_style = jQuery(this).attr('data-style');
							
							
							jQuery(this).removeAttr('data-style').attr('style', span_style);
						} );
					} );
				}
			}
		} );
		
		
		nav_left = new_nav_left;
	}
	
	
	firstRun = false;
}


function cmsmastersMegaMenuDestroy() { 
	mega.each(function () { 
		var li = jQuery(this), 
			mega = li.find('> div');
		
		
		mega.css( { 
			width : 	'', 
			right : 	'', 
			left : 		'' 
		} );
	} );
	
	
	firstRun = true;
}

