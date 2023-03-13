jQuery(document).ready(function ($) {

    let error_message = '<div class="tc_field_errors">'+tc_ajax.tc_field_error+'</div>';

    // Check age restriction
    if (tc_ajax.tc_show_age_check == 'yes' && jQuery('#tc_age_check').length !== 0) {

        var checkout_form = $('form.checkout');

        checkout_form.on('checkout_place_order', function () {
            var tc_get_check = jQuery("#tc_age_check").is(':checked');
            if (tc_get_check == false) {
                jQuery('.tc-age-check-error').each(function () {
                    jQuery(this).remove();
                });
                jQuery('.tc-age-check-label').after('<div class="tc-age-check-error">' + tc_ajax.tc_error_message + '</div>');
                return false;
            } else {
                return true;
            }
        });
    }

    if (jQuery(".tc_cart_widget").length > 0){

        function tc_update_cart_ajax(){

            jQuery(".tc_cart_ul").css('opacity', '0.5');

                        var data = {
                                'action': 'tc_update_widget_cart'
                        };

                        // since 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php
                        jQuery.post(tc_ajax.ajaxUrl, data, function(response) {
                            jQuery(".tc_cart_ul").css('opacity', '1');
                                jQuery(".tc_cart_ul").html('');
                                jQuery(".tc_cart_ul").html(response);
                        });
                        
                            }


        // Listen DOM changes
        $('.event_tickets, .cart_form').bind("DOMSubtreeModified", tc_update_cart_ajax);
    }

    /**
     * payment gateway show order
     */
    var $tc_payment_gateway_wrapper = $('#tc_payment_form');

    $tc_payment_gateway_wrapper.find('.tickera.tickera-payment-gateways').sort(function (a, b) {
        return +a.dataset.gateway_show_priority - +b.dataset.gateway_show_priority;
    }).appendTo($tc_payment_gateway_wrapper);

    $( document ).on( 'submit', '#tc_payment_form', function ( event ) {
        $( '#tc_payment_confirm' ).attr( 'disabled', 'disabled' );
    });

    /**
     * Check if cart update is needed
     * @returns {Boolean}
     */
    function tc_check_cart_update() {
        var total_quantity = 0;

        if ($("#tickera_cart").length) {//make sure tickera standalone version is active

            $('.ticket-quantity .quantity').each(function (index) {
                total_quantity = parseInt(total_quantity) + parseInt($(this).val());
            });

            if (total_quantity != $('.owner-info-wrap').length) {

                $('.tc_cart_errors').html('<ul><li><a href="cjsea" class="cjsea"></a>' + tc_ajax.update_cart_message + '</li></ul>');

                let target = $('.cjsea');

                $('html, body').stop().animate({
                    'scrollTop': (target.offset().top) - 40
                }, 350, 'swing', function () {
                    window.location.hash = target;
                });

                return false;

            } else {
                return true;
            }

        } else {
            return true;
        }
    }

    /**
     * Increase the quantity
     */
    $('body').on('click', 'input.tickera_button.plus', function (event) {
        var quantity = $(this).parent().find('.quantity').val();
        $(this).parent().find('.quantity').val(parseInt(quantity) + 1);
    });

    /**
     * Decrease the quantity
     */
    $('body').on('click', 'input.tickera_button.minus', function (event) {
        var quantity = $(this).parent().find('.quantity').val();
        if (quantity >= 1) {
            $(this).parent().find('.quantity').val(parseInt(quantity) - 1);
        }
    });

    /**
     * When user clicks on the empty cart button
     */
    $('body').on('click', '#empty_cart', function (event) {
        $('input[name="cart_action"]').val('empty_cart');
    });

    /**
     * When user clicks on the update button
     */
    $('body').on('click', '#update_cart', function (event) {
        $('input[name="cart_action"]').val('update_cart');
    });

    /**
     * Toggle Customer Age Checkbox
     */
    $( document ).on( 'change', '#tc_age_check', function() {
        if ( $(this).is(':checked') ) {
            $(this).removeClass('has-error');
            $('.tc-age-check-error').remove();

        } else {
            $(this).addClass('has-error');
            $('.tc-age-check-error').remove();
            $(this).parent().append('<div class="tc-age-check-error">' + tc_ajax.tc_error_message + '</div>');
        }
    });

    /**
     * when user click on the proceed to checkout button
     */
    $(document).on('click', '#proceed_to_checkout', function (event) {

        /*
         *  Make sure to update the cart if there's some changes before moving to checkout page.
         */
        if ( ! tc_check_cart_update() ) {
            event.preventDefault();
            return false;
        }

        // Check Validation Fields
        $('#tickera_cart .tickera-input-field').each(function() {

            let required_field = ( typeof $(this).attr('name') !== "undefined" ) ?
                $('input[value="'+ $(this).attr('name').split('[')[0] + '"]').attr('name') :
                $('input[value="'+ $(this).parent().siblings('.checkbox_values').attr('name').split('[')[0] +'"]').attr('name');
            // IF: Required fields
            if ( typeof required_field !== 'undefined') {


                if ( $(this).is('select') && !$(this).children('option:selected').val() && !$(this).parent().siblings('.tc_field_errors').length ) {

                    /**
                     * IF: Select fields
                     */
                    $(this).addClass('has-error');
                    $(this).closest('div').append(error_message);

                } else if ( $(this).is('input[type="checkbox"]') && !$(this).parent().siblings('.checkbox_values').val() && !$(this).parent().siblings('.tc_field_errors').length ) {

                    /**
                     * IF: Checkbox fields
                     */
                    $(this).addClass('has-error');
                    $(this).closest('div').append(error_message);

                } else if ( ( $(this).is('textarea') && !$(this).val() || ( $(this).is('input') ) && !$(this).val() ) ) {

                    /**
                     * IF: Input and Textarea fields
                     */
                    $(this).addClass('has-error');
                    $(this).css('border-left', '2px solid rgb(225, 0, 0)');
                }

                event.preventDefault();
            }

            // IF: Field has value - Remove required notification
            if ( $(this).parent().siblings('.checkbox_values').val() || $(this).children('option:selected').val() ) {
                $(this).removeClass('has-error');
                $(this).parent().siblings('.tc_field_errors').remove();
            }
        });

        // Validate Customer Age
        if ( $('#tc_age_check').is(':checked') ) {
            $('#tc_age_check').removeClass('has-error');
            $('.tc-age-check-error').remove();

        } else {
            $('#tc_age_check').addClass('has-error');
            $('.tc-age-check-error').remove();
            $('#tc_age_check').parent().append('<div class="tc-age-check-error">' + tc_ajax.tc_error_message + '</div>');
        }

        // Check email verification for buyer field
        if ( $( '#tickera_cart input' ).hasClass( "tc_validate_field_type_confirm_email" ) ) {
            var buyer_email = $('.tc_validate_field_type_email').val();
            var buyer_confirm_email = $('.tc_validate_field_type_confirm_email ').val();
            if ( (buyer_email) != (buyer_confirm_email) || buyer_email == "" || buyer_confirm_email == "" ){
                $('.tc_validate_field_type_email,.tc_validate_field_type_confirm_email').addClass('has-error');
                jQuery('.tc_validate_field_type_email,.tc_validate_field_type_confirm_email').css('border-left','2px solid #ff0000');

            }else {
                $('.tc_validate_field_type_email,.tc_validate_field_type_confirm_email').removeClass('has-error');
                jQuery('.tc_validate_field_type_email,.tc_validate_field_type_confirm_email').css('border-left','2px solid #09a10f');
            }
        }

        // Check email verification for owner field
        if ( $( '#tickera_cart input' ).hasClass( "tc_owner_confirm_email" ) ) {
            var owner_email = $('.tc_owner_email').val();
            var owner_confirm_email = $('.tc_owner_confirm_email ').val();
            if ( (owner_email) != (owner_confirm_email) || owner_email == "" || owner_confirm_email == "" ){
                $('.tc_owner_email,.tc_owner_confirm_email').addClass('has-error');
                jQuery('.tc_owner_email,.tc_owner_confirm_email').css('border-left','2px solid #ff0000');

            }else {
                $('.tc_owner_email,.tc_owner_confirm_email').removeClass('has-error');
                jQuery('.tc_owner_email,.tc_owner_confirm_email').css('border-left','2px solid #09a10f');
            }
        }

        // Proceed to checkout if no error found
        if ( !$('.has-error').length ) {
            $('input[name="cart_action"]').val('proceed_to_checkout');
            $('#tickera_cart').submit();
        }
    });

    /**
     * Validate Cart Select and Checkbox Fields
     */
    $(document).on('change', '.tickera_additional_info .tickera-input-field', function() {

        if($(this).parent().siblings('span').children().hasClass('required')) {        
        // IF: Select field
        if ( $(this).is('select') && $(this).children('option:selected').val() ) {
            $(this).removeClass('has-error');
            $(this).parent().siblings('.tc_field_errors').remove();

            // IF: Checkbox fields
        } else if ( $(this).is('input[type="checkbox"]') && $(this).parent().siblings('.checkbox_values').val() ) {
            $(this).removeClass('has-error');
            $(this).parent().siblings('.tc_field_errors').remove();

            // IF: Field has error
        } else if ( $(this).is('select') || $(this).is('input[type="checkbox"]') ) {
            $(this).addClass('has-error');
            $(this).closest('div').append(error_message);
        }
    }
    });

    /**
     * When user fill form check validation
     */
    $( document ).on( 'keyup', '.tc-owner-field,.owner-field-textarea,.buyer-field-text,.buyer-field-textarea', function() {

        if ( !$( this ).val() ){
            var req_fld = $( this ).prev().html();

            if ( req_fld.indexOf('*') != -1 ) {
                $( this ).addClass( 'has-error' );
                $( this ).css( 'border-left','2px solid #ff0000' );
            }

        } else {
            $( this ).removeClass( 'has-error' );
            $( this ).css( 'border-left','2px solid #09a10f' );
        }
    });

    /**
     * Check email-verification for buyer field
     */
    if ( $( '#tickera_cart input' ).hasClass( 'tc_validate_field_type_confirm_email' ) ) {

        $( document ).on( 'keyup', '.tc_validate_field_type_email,.tc_validate_field_type_confirm_email', function() {

            if ( ( $( this ).val() != $( '.tc_validate_field_type_email' ).val() ) || ( !$( this ).val() ) || ( $( this ).val() != $( '.tc_validate_field_type_confirm_email' ).val() ) ) {
                $( '.tc_validate_field_type_email,.tc_validate_field_type_confirm_email' ).addClass( 'has-error' );
                $( '.tc_validate_field_type_email,.tc_validate_field_type_confirm_email' ).css( 'border-left', '2px solid #ff0000' );

            } else {

                if ( ( $( '.tc_validate_field_type_confirm_email' ).val() != '' ) || ( $( '.tc_validate_field_type_email' ).val() != '' ) ) {
                    $( '.tc_validate_field_type_email,.tc_validate_field_type_confirm_email' ).removeClass( 'has-error' );
                    $( '.tc_validate_field_type_email,.tc_validate_field_type_confirm_email' ).css( 'border-left', '2px solid #09a10f' );
                }
            }
        });
    }

    /**
     * Check email-verification for owner field
     */
    if ( $( '#tickera_cart input' ).hasClass( 'tc_owner_confirm_email' ) ) {

        $( document ).on( 'keyup', '.tc_owner_email,.tc_owner_confirm_email', function() {

            if ( ( $( this ).val() != $( '.tc_owner_email' ).val()) || ( !$( this ).val()) || ( $( this ).val() != $( '.tc_owner_confirm_email' ).val() ) ) {
                $( '.tc_owner_email,.tc_owner_confirm_email' ).addClass( 'has-error' );
                $( '.tc_owner_email,.tc_owner_confirm_email' ).css( 'border-left','2px solid #ff0000' );

            } else {

                if ( ( $( '.tc_owner_confirm_email' ).val() != '' ) || ( $( '.tc_owner_email' ).val() != '' ) ) {
                    $( '.tc_owner_email,.tc_owner_confirm_email' ).removeClass( 'has-error' );
                    $( '.tc_owner_email,.tc_owner_confirm_email' ).css( 'border-left', '2px solid #09a10f' );
                }
            }
        });
    }

    /**
     * when user click on the proceed to checkout button
     */
    $('body').on('click', '#apply_coupon', function (event) {
        $('input[name="cart_action"]').val('apply_coupon');
    });

    /**
     * Add to cart button
     */
    $('body').on('click', 'a.add_to_cart', function (event) {
        event.preventDefault();

        $(this).fadeOut('fast').fadeIn('fast');
        var button_type = $(this).attr('data-button-type');
        var open_method = $(this).attr('data-open-method');
        var current_form = $(this).parents('form.cart_form');
        var ticket_id = current_form.find(".ticket_id").val();
        var qty = $(this).closest('tr').find('.tc_quantity_selector').val();

        if (typeof qty == 'undefined') {
            var qty = $(this).closest('.cart_form').find('.tc_quantity_selector').val();
        }

        $.post(tc_ajax.ajaxUrl, {action: "add_to_cart", ticket_id: ticket_id, tc_qty: qty}, function (data) {
            if (data != 'error') {
                current_form.html(data);
                if ($('.tc_cart_contents').length > 0) {
                    $.post(tc_ajax.ajaxUrl, {action: "update_cart_widget"}, function (widget_data) {
                        $('.tc_cart_contents').html(widget_data);
                    });
                }

                if (open_method == 'new' && button_type == 'buynow') {
                    window.open(tc_ajax.cart_url, '_blank');
                }

                if (button_type == 'buynow' && open_method !== 'new') {
                    window.location = tc_ajax.cart_url;
                }

            } else {
                current_form.html(data);
            }
        });
    });

    /**
     * Empty Cart
     * @returns {undefined}
     */
    function tc_empty_cart() {
        if ($("a.tc_empty_cart").attr("onClick") != undefined) {
            return;
        }

        $('body').on('click', 'a.tc_empty_cart', function (event) {
            var answer = confirm(tc_ajax.emptyCartMsg);
            if (answer) {
                $(this).html('<img src="' + tc_ajax.imgUrl + '" />');
                $.post(tc_ajax.ajaxUrl, {action: 'mp-update-cart', empty_cart: 1}, function (data) {
                    $("div.tc_cart_widget_content").html(data);
                });
            }
            return false;
        });
    }

    /**
     * Listeners for add item to cart
     * @returns {undefined}
     */
    function tc_cart_listeners() {
        $('body').on('click', 'input.tc_button_addcart', function (event) {
            var input = $(this);
            var formElm = $(input).parents('form.tc_buy_form');
            var tempHtml = formElm.html();
            var serializedForm = formElm.serialize();
            formElm.html('<img src="' + tc_ajax.imgUrl + '" alt="' + tc_ajax.addingMsg + '" />');
            $.post(tc_ajax.ajaxUrl, serializedForm, function (data) {
                var result = data.split('||', 2);
                if (result[0] == 'error') {
                    alert(result[1]);
                    formElm.html(tempHtml);
                    tc_cart_listeners();
                } else {
                    formElm.html('<span class="tc_adding_to_cart">' + tc_ajax.successMsg + '</span>');
                    $("div.tc_cart_widget_content").html(result[1]);
                    if (result[0] > 0) {
                        formElm.fadeOut(2000, function () {
                            formElm.html(tempHtml).fadeIn('fast');
                            tc_cart_listeners();
                        });
                    } else {
                        formElm.fadeOut(2000, function () {
                            formElm.html('<span class="tc_no_stock">' + tc_ajax.outMsg + '</span>').fadeIn('fast');
                            tc_cart_listeners();
                        });
                    }
                    tc_empty_cart(); //re-init empty script as the widget was reloaded
                }
            });
            return false;
        });
    }

    /**
     * add listeners
     */
    tc_empty_cart();
    tc_cart_listeners();

    if (tc_ajax.show_filters == 1) {
        tc_ajax_products_list();
    }

    /**
     * Cart Widget
     */
    $('body').on('click', '.tc_widget_cart_button', function (event) {
        window.location.href = $(this).data('url');
    });

    /**
     * Proceed to checkout button
     */
    $('body').on('click', '#proceed_to_checkout', function (event) {
        $('input[name="cart_action"]').val('proceed_to_checkout');
    });
	
	// check email-verification for owner field with woocommerce
	jQuery( function($){
		var fc = 'form.checkout',
			pl = 'button[type="submit"][name="woocommerce_checkout_place_order"]';
		$(fc).on( 'click', pl, function(e){
			// // Disable "Place Order" button
			var owner_email = $('.tc_owner_email').val();
			var owner_confirm_email = $('.tc_owner_confirm_email ').val();
			if( (owner_email && owner_confirm_email)){
				if ( (owner_email !== owner_confirm_email) || owner_email === "" || owner_confirm_email === "" ){
					jQuery('.tc_owner_email,.tc_owner_confirm_email').css('border-left','2px solid #ff0000');

				}else {
					jQuery('.tc_owner_email,.tc_owner_confirm_email').css('border-left','2px solid #09a10f');
				}

			}
		});
	});
});

/**
 * Payment Step
 */
jQuery(document).ready(function ($) {
    var gateways_count = $('.tc_gateway_form').length;

    if (gateways_count > 1) {
        $('div.tc_gateway_form').css('max-height', 'auto');
    }

    // Payment method choice
    $( document ).on( 'change', '.tickera-payment-gateways input.tc_choose_gateway', function () {
        var gid = $('input.tc_choose_gateway:checked').val();

        $('div.tc_gateway_form').removeClass('tickera-height');
        $('div#' + gid).addClass('tickera-height');
    });

    $( '.tc_choose_gateway' ).each(function () {

        $( this ).on( 'change', function () {
            if ( this.checked ) {
                $( '.payment-option-wrap' ).removeClass( 'active-gateway' );
                $( this ).closest( '.payment-option-wrap' ).addClass( 'active-gateway' );

            } else {
                $( this ).closest( '.payment-option-wrap' ).toggleClass( 'active-gateway' );
            }
        });
    });

    $('body').on('change', '.buyer-field-checkbox, .owner-field-checkbox', function (event) {
        var checkbox_values_field = $(this).parent().parent().find('.checkbox_values');
        checkbox_values_field.val('');

        $(this).parent().parent().find('input').each(function (key, value) {
            if ($(this).is(":checked")) {
                checkbox_values_field.val(checkbox_values_field.val() + '' + $(this).val() + ', ');
            }
        });
        checkbox_values_field.val(checkbox_values_field.val().substring(0, checkbox_values_field.val().length - 2));

    });

});

/**
 * Form validation
 */
jQuery(document).ready(function ($) {

    if ($('form#tickera_cart').length) {
        $('#tickera_cart').validate({
            // your other plugin options
            debug: false
        });


        $('.tc_validate_field_type_email').each(function () {
            $(this).rules('add', {
                email: true,
            });
        });

        $('.tc_owner_email').each(function () {
            $(this).rules('add', {
                email: true,
            });
        });

        $('#tickera_cart .required').each(function () {
            $(this).rules('add', {
                required: true,
            });
        });
    }

});

/**
 * Tickear Cart: Preventing Default button to trigger on Enter Key
 */
jQuery(document).on('keypress','#tickera_cart input', function (e) {
    if (e.keyCode === 13) {
        e.preventDefault()
        jQuery('#proceed_to_checkout').trigger('click');
    }
});

/**
 * Check custom form error notification
 */
jQuery( document ).ready( function ( $ ) {

    let error_message = '<div class="tc_field_errors">'+tc_ajax.tc_field_error+'</div>';

    function custom_validation() {

        $( document ).on( 'change', '.tc-owner-field,.owner-field-textarea,.buyer-field-text,.buyer-field-textarea', function () {

            if ( !$( this ).val() ) {
                var req_fld = $( this ).prev().html();

                if ( req_fld.indexOf('*') != -1 ) {
                    $( this ).addClass( 'has-error' );
                    $( this ).css( 'border-left','2px solid #ff0000' );
                }

            } else {
                $( this ).removeClass( 'has-error' );
                $( this ).css( 'border-left','2px solid #09a10f' );
            }
        });
    }

    setTimeout( function() {
        custom_validation();
    }, 2000 );

    /**
     * After click place order check error notification
     */
    $( document ).on( 'click', '#place_order', function ( event ) {

        // Check Validation Fields
        $('form.woocommerce-checkout .tickera_additional_info input,form.woocommerce-checkout .tickera_additional_info textarea').each(function() {
            let required_field = ( typeof $(this).attr('name') !== "undefined" ) ?
                $('input[value="'+ $(this).attr('name').split('[')[0] + '"]').attr('name') :
                $('input[value="'+ $(this).parent().siblings('.checkbox_values').attr('name').split('[')[0] +'"]').attr('name');

            // IF: Required fields
            if ( typeof required_field !== 'undefined') {

                // IF: Select fields
                if ( $(this).is('select') && !$(this).children('option:selected').val() && !$(this).parent().siblings('.tc_field_errors').length ) {
                    $(this).addClass('has-error');
                    $(this).closest('div').append(error_message);

                    // IF: Checkbox fields
                } else if ( $(this).is('input[type="checkbox"]') && !$(this).parent().siblings('.checkbox_values').val() && !$(this).parent().siblings('.tc_field_errors').length ) {
                    $(this).addClass('has-error');
                    $(this).closest('div').append(error_message);

                    // IF: Input and Textarea fields
                } else if ( ( $(this).is('textarea') && !$(this).val() || ( $(this).is('input') ) && !$(this).val() ) ) {
                    $(this).addClass('has-error');
                    $(this).css('border-left', '2px solid rgb(225, 0, 0)');
                }
            }
            // IF: Field has value - Remove required notification
            if ( $(this).parent().siblings('.checkbox_values').val() || $(this).children('option:selected').val() ) {
                $(this).removeClass('has-error');
                $(this).parent().siblings('.tc_field_errors').remove();
            }
        });
    }); // Place order
}); // End ready function