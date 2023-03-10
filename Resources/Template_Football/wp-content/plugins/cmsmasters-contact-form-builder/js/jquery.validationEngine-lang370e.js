/**
 * @package 	WordPress Plugin
 * @subpackage 	CMSMasters Contact Form Builder
 * @version 	1.2.7
 * 
 * CMSMasters Donations Validation Engine Language File
 * Created by CMSMasters
 * 
 */


(function ($) { 
    $.fn.validationEngineLanguage = function () { 
		// empty function
	};
	
	
    $.validationEngineLanguage = { 
        newLang : function () { 
            $.validationEngineLanguage.allRules = { 
                "required" : { 
                    "regex" : 						"none", 
                    "alertText" : 					cmsmasters_ve_lang.required, 
                    "alertTextCheckboxMultiple" : 	cmsmasters_ve_lang.select_option, 
                    "alertTextCheckboxe" : 			cmsmasters_ve_lang.required_checkbox 
                }, 
                "minSize" : { 
                    "regex" : 						"none", 
                    "alertText" : 					cmsmasters_ve_lang.min, 
                    "alertText2" : 					cmsmasters_ve_lang.allowed 
                }, 
                "maxSize" : { 
                    "regex" : 						"none", 
                    "alertText" : 					cmsmasters_ve_lang.max, 
                    "alertText2" : 					cmsmasters_ve_lang.allowed 
                }, 
                "email" : { 
                    "regex" : 						/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
                    "alertText" : 					cmsmasters_ve_lang.invalid_email 
                }, 
                "number" : { 
                    "regex" : 						/^[\-\+]?((([0-9]{1,3})([,][0-9]{3})*)|([0-9]+))?([\.]([0-9]+))?$/, 
                    "alertText" : 					cmsmasters_ve_lang.invalid_number 
                }, 
                "url" : { 
                    "regex" : 						/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i, 
                    "alertText" : 					cmsmasters_ve_lang.invalid_url 
                }, 
                "onlyNumberSp" : { 
                    "regex" : 						/^[0-9\ ]+$/, 
                    "alertText" : 					cmsmasters_ve_lang.numbers_spaces 
                }, 
                "onlyLetterSp" : { 
                    "regex" : 						/^[a-zA-Z\ \']+$/, 
                    "alertText" : 					cmsmasters_ve_lang.letters_spaces 
                } 
            };
        } 
    };
	
	
    $.validationEngineLanguage.newLang();
} )(jQuery);

