/**
 * @package 	WordPress
 * @subpackage 	Sports Club
 * @version		1.1.4
 * 
 * Woocommerce Scripts
 * Created by CMSMasters
 * 
 */


"use strict";

jQuery(document).ready(function () { 
	jQuery(window).scroll(function () { 
		if (jQuery(this).scrollTop() + jQuery(this).height() > jQuery('.footer_copyright').offset().top) {
			jQuery('.woocommerce-store-notice').css({'position' : 'relative'});
		} else {
			jQuery('.woocommerce-store-notice').css({'position' : 'fixed'});
		}
	} );
	
	
	setTimeout(function () { 
		if ( 
			jQuery('.cmsmasters_dynamic_cart .widget_shopping_cart_content > ul li').length != 0 && 
			jQuery('.cmsmasters_dynamic_cart .widget_shopping_cart_content > ul li').hasClass('empty') != true 
		) {
			jQuery('.cmsmasters_dynamic_cart').css( { 
				opacity : 		'1', 
				visibility : 	'visible' 
			} );
		}
	}, 2000);
	
	
	cmsmasters_ajax_add_to_cart();
	
	
	jQuery('.cmsmasters_add_to_cart_button').on('click', function () { 
		jQuery('.cmsmasters_dynamic_cart').css( { 
			opacity : 		'1', 
			visibility : 	'visible' 
		} );
	} );
	
	
	jQuery('body').on('added_to_cart', update_dynamic_cart);
} );


var cmsmasters_added_product = {};


function cmsmasters_ajax_add_to_cart() {
	"use strict";
	
	jQuery('.cmsmasters_add_to_cart_button').on('click', function() {	
		var productInfo = jQuery(this).parents('.product_inner'), 
			productAmount = productInfo.find('.price > .amount, .price > ins > .amount').text(), 
			addedToCart = jQuery(this).parents('.cmsmasters_img_btns_rollover').find('.added_to_cart'), 
			product = {};
		
		
		product.name = productInfo.find('.cmsmasters_product_title a').text();
		
		product.price = productAmount.replace(cmsmasters_woo_script.currency_symbol, '');
		
		product.image = productInfo.find('figure img');
		
		
		addedToCart.addClass('cmsmasters_to_show');
		
		
		if (product.image.length) {
			/* Dynamic Cart Update Img Src */
			var str = product.image.get(0).src, 
				ext = /(\..{3,4})$/i.exec(str), 
				extLength = ext[1].length, 
				url = str.slice(0, -extLength), 
				newURL = /(-\d{2,}x\d{2,})$/i.exec(url), 
				newSize = '-' + cmsmasters_woo_script.thumbnail_image_width + 'x' + cmsmasters_woo_script.thumbnail_image_height, 
				buildURL = '';
			
			
			if (newURL !== null) {
				buildURL += url.slice(0, -newURL[1].length) + newSize + ext[1];
			} else {
				buildURL += url + ext[1];
			}
			
			
			product.image = '<img class="cmsmasters_added_product_info_img" src="' + buildURL + '" />';
		}
		
		
		cmsmasters_added_product = product;
	} );
}


function update_dynamic_cart(event) { 
	"use strict";
	
	var product = jQuery.extend( { 
		name : 		'', 
		price : 		'', 
		image : 	'' 
	}, cmsmasters_added_product);
	
	
	if (typeof event != 'undefined') {
		var cart_button = jQuery('.cmsmasters_dynamic_cart .cmsmasters_dynamic_cart_button'), 
			amount = cart_button.find('.amount').text(), 
			count = cart_button.find('.count').text(), 
			template = jQuery( 
				'<div class="cmsmasters_added_product_info">' + 
					product.image + 
					'<span class="cmsmasters_added_product_info_text">' + product.name + '</span>' + 
				'</div>' 
			);
		
		
		jQuery(event.currentTarget).find('a.cmsmasters_to_show').removeClass('cmsmasters_to_show').addClass('cmsmasters_visible');
		
		
		template.appendTo('.cmsmasters_dynamic_cart').css('visibility', 'visible').animate( { 
			top : 		0, 
			opacity : 	1 
		}, 500, function () { 
			cart_button.find('.amount').text(parseFloat(amount) + parseFloat(product.price));
			
			
			cart_button.find('.count').text(Number(count) + 1);
		} );
		
		
		template.on('mouseenter cmsmasters_hide', function () { 
			template.animate( { 
				top : 		'-30px', 
				opacity : 	0 
			}, 500, function () { 
				template.remove();
			} );
		} );
		
		
		setTimeout(function () { 
			template.trigger('cmsmasters_hide');
		}, 2000);
	}
}


jQuery(document).ready(function() {
	"use strict";
	
	(function ($) {
		$('.touch .product .product_inner figure').on('click', function() { 
			$('*:not(this)').removeClass('cmsmasters_mobile_hover');
			
			
			$(this).addClass('cmsmasters_mobile_hover');
		} );
		
		
		$('.cmsmasters_woo_tabs .description_tab').addClass('current_tab');
		
		$('.cmsmasters_woo_tabs #tab-description').addClass('active_tab');
	} )(jQuery);
} );

