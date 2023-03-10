/**
 * @package 	WordPress
 * @subpackage 	Sports Club
 * @version		1.2.2
 * 
 * Modes & Functions for jQuery Isotope Plugin
 * Created by CMSMasters
 * 
 */


"use strict";

/* iLightbox Settings */
var ilightbox_settings = { 
	skin : 					cmsmasters_isotope_mode.ilightbox_skin, 
	path : 					cmsmasters_isotope_mode.ilightbox_path, 
	infinite : 				(cmsmasters_isotope_mode.ilightbox_infinite == '1') ? true : false, 
	keepAspectRatio : 		(cmsmasters_isotope_mode.ilightbox_aspect_ratio == '1') ? true : false, 
	mobileOptimizer : 		(cmsmasters_isotope_mode.ilightbox_mobile_optimizer == '1') ? true : false, 
	maxScale : 				Number(cmsmasters_isotope_mode.ilightbox_max_scale), 
	minScale : 				Number(cmsmasters_isotope_mode.ilightbox_min_scale), 
	innerToolbar : 			(cmsmasters_isotope_mode.ilightbox_inner_toolbar == '1') ? true : false, 
	smartRecognition : 		(cmsmasters_isotope_mode.ilightbox_mobile_optimizer == '1') ? true : false, 
	fullAlone : 			(cmsmasters_isotope_mode.ilightbox_fullscreen_one_slide == '1') ? true : false, 
	fullViewPort : 			cmsmasters_isotope_mode.ilightbox_fullscreen_viewport, 
	controls : { 
		toolbar : 			(cmsmasters_isotope_mode.ilightbox_controls_toolbar == '1') ? true : false, 
		arrows : 			(cmsmasters_isotope_mode.ilightbox_controls_arrows == '1') ? true : false, 
		fullscreen : 		(cmsmasters_isotope_mode.ilightbox_controls_fullscreen == '1') ? true : false, 
		thumbnail : 		(cmsmasters_isotope_mode.ilightbox_controls_thumbnail == '1') ? true : false, 
		keyboard : 			(cmsmasters_isotope_mode.ilightbox_controls_keyboard == '1') ? true : false, 
		mousewheel : 		(cmsmasters_isotope_mode.ilightbox_controls_mousewheel == '1') ? true : false, 
		swipe : 			(cmsmasters_isotope_mode.ilightbox_controls_swipe == '1') ? true : false, 
		slideshow : 		(cmsmasters_isotope_mode.ilightbox_controls_slideshow == '1') ? true : false 
	}, 
	text : { 
		close : 			cmsmasters_isotope_mode.ilightbox_close_text, 
		enterFullscreen : 	cmsmasters_isotope_mode.ilightbox_enter_fullscreen_text, 
		exitFullscreen : 	cmsmasters_isotope_mode.ilightbox_exit_fullscreen_text, 
		slideShow : 		cmsmasters_isotope_mode.ilightbox_slideshow_text, 
		next : 				cmsmasters_isotope_mode.ilightbox_next_text, 
		previous : 			cmsmasters_isotope_mode.ilightbox_previous_text 
	}, 
	errors : { 
		loadImage : 		cmsmasters_isotope_mode.ilightbox_load_image_error, 
		loadContents : 		cmsmasters_isotope_mode.ilightbox_load_contents_error, 
		missingPlugin : 	cmsmasters_isotope_mode.ilightbox_missing_plugin_error 
	} 
};


/* Isotope Timeline Layout Mode */
(function(window, factory) {
	factory(window.Isotope.LayoutMode);
} (window, function factory(LayoutMode) {
	'use strict';
	
	
	var Timeline = LayoutMode.create('Timeline'), 
		proto = Timeline.prototype;
	
	
	proto._resetLayout = function () { 
		this.Timeline = { 
			colA : 0, 
			colB : 0, 
			arrayLeft : [], 
			arrayRight : [], 
			postMargin : 40, 
			dateHeight : 110 
		};
	};
	
	
	proto._getItemLayoutPosition = function (item) {
		item.getSize();
		
		
		var props = 	this.Timeline, 
			centerX = 	Math.round(this.isotope.size.innerWidth / 2), 
			isColA = 	props.colA <= props.colB, 
			x = 		isColA ? 
							centerX - item.size.outerWidth : // left side 
							centerX, // right side 
			yCache = 	isColA ? props.colA : props.colB, 
			y = 		yCache, 
			minMargin = props.postMargin;
		
		
		if (isColA) {
			jQuery(item.element).addClass('cmsmasters_timeline_left');
			jQuery(item.element).removeClass('cmsmasters_timeline_right');
			
			
			if (props.arrayRight.length > 0) {
				for (var i = 0, il = props.arrayRight.length; i < il; i += 1) {
					if (y < props.arrayRight[i] + props.dateHeight) {
						minMargin = props.dateHeight;
						
						
						y = props.arrayRight[i] + minMargin;
					} else {
						y = yCache + minMargin;
					}
				}
			}
			
			
			props.arrayLeft.push(y);
		} else {
			jQuery(item.element).addClass('cmsmasters_timeline_right');
			jQuery(item.element).removeClass('cmsmasters_timeline_left');
			
			
			if (props.arrayLeft.length > 0) {
				for (var j = 0, jl = props.arrayLeft.length; j < jl; j += 1) {
					if (y < props.arrayLeft[j] + props.dateHeight) {
						minMargin = props.dateHeight;
						
						
						y = props.arrayLeft[j] + minMargin;
					} else {
						y = yCache + minMargin;
					}
				}
			}
			
			
			props.arrayRight.push(y);
		}
		
		
		props[(isColA ? 'colA' : 'colB')] = item.size.outerHeight + y;
		
		
		var position = {
			x: x,
			y: y
		};
		
		
		return position;
	};
	
	
	proto._getContainerSize = function () { 
		var size = {};
		
		
		size.height = this.Timeline[(this.Timeline.colB > this.Timeline.colA ? 'colB' : 'colA')];
		
		
		return size;
	};


	return Timeline;
}));


/* ========== Isotope Run ========== */

/* Get Columns Width Function */
function getNumbColumns(container) { 
	var containerWidth = container.width(), 
		firstPost = container.find('> article:eq(0), .cmsmasters_gallery_item:eq(0)'), 
		postMinWidth = Number(firstPost.css('minWidth').replace('px', '')), 
		maxColumnNumb = Math.floor(containerWidth / postMinWidth), 
		columnNumb = 1, 
		layoutGrid = false;
	
	
	if (
		container.parent().data('layoutMode') === 'perfect' || 
		container.parent().data('layoutMode') === 'grid' || 
		container.parent().data('type') === 'grid' 
	) {
		layoutGrid = true;
	}
	
	
	maxColumnNumb = (maxColumnNumb !== 0) ? maxColumnNumb : 1;
	
	
	if (container.hasClass('cmsmasters_5')) {
		columnNumb = 5;
	} else if (container.hasClass('cmsmasters_4')) {
		columnNumb = 4;
	} else if (container.hasClass('cmsmasters_3')) {
		columnNumb = 3;
	} else if (container.hasClass('cmsmasters_2')) {
		columnNumb = 2;
	}
	
	
	if (maxColumnNumb < columnNumb) {
		if (layoutGrid && columnNumb == 4 && maxColumnNumb == 3) {
			columnNumb = 2;
		} else if (layoutGrid && columnNumb == 3 && maxColumnNumb == 2) {
			columnNumb = 1;
		} else {
			columnNumb = maxColumnNumb;
		}
	}
	
	
	return columnNumb;
}



/* Set Columns Width Function */
function setColumnWidth(container) { 
	var containerWidth = container.width(), 
		columnNumb = getNumbColumns(container), 
		postWidth = Math.floor(containerWidth / columnNumb) - 1;
	
	
	container.find('> article, .cmsmasters_gallery_item').each(function () { 
		jQuery(this).css( { 
			width : postWidth + 'px' 
		} );
	} );
}



/* Rearrange Posts Function */
function reArrangePosts(blog, blogColumns) { 
	if (blogColumns) {
		setColumnWidth(blog);
	}
	
	
	blog.isotope('layout');
}



/* Set Puzzle Columns Width Function */
function setPuzzleColumnWidth(container) { 
	var containerWidth = container.width(), 
		firstPost = container.find('> article:eq(0)'), 
		postMinWidth = Number(firstPost.css('minWidth').replace('px', '')), 
		postPaddingLeft = Number(firstPost.css('paddingLeft').replace('px', '')), 
		postPaddingRight = Number(firstPost.css('paddingRight').replace('px', '')), 
		postStaticWidth = Math.floor(containerWidth / 4), 
		postStaticHeight = Math.floor((postStaticWidth / 100) * 100/* preloader padding bottom in % */), 
		postStaticPadding = Math.floor(((postPaddingLeft + postPaddingRight) / 100) * 100/* preloader padding bottom in % */), 
		postWidth = postStaticWidth, 
		postHeight = postStaticHeight;
	
	
	if (containerWidth < postMinWidth * 4) {
		container.addClass('resp_portfolio_puzzle');
	} else {
		container.removeClass('resp_portfolio_puzzle');
	}
	
	
	container.find('article.project').each(function () { 
		if (jQuery(this).hasClass('four_x_four')) {
			postWidth = postStaticWidth * 4;
			postHeight = (postStaticHeight * 4) - postStaticPadding;
		} else if (jQuery(this).hasClass('three_x_three')) {
			if (containerWidth > postMinWidth * 4) {
				postWidth = postStaticWidth * 3;
				postHeight = (postStaticHeight * 3) - postStaticPadding;
			} else if (containerWidth > postMinWidth * 2) {
				postWidth = postStaticWidth * 2;
				postHeight = (postStaticHeight * 2) - postStaticPadding;
			} else {
				postWidth = postStaticWidth * 4;
				postHeight = (postStaticHeight * 4) - postStaticPadding;
			}
		} else if (jQuery(this).hasClass('three_x_two')) {
			if (containerWidth > postMinWidth * 4) {
				postWidth = postStaticWidth * 3;
				postHeight = (postStaticHeight * 2) - postStaticPadding;
			} else if (containerWidth > postMinWidth * 2) {
				postWidth = postStaticWidth * 2;
				postHeight = Math.floor((postStaticHeight * 4) / 3) - postStaticPadding;
			} else {
				postWidth = postStaticWidth * 4;
				postHeight = Math.floor((postStaticHeight * 8) / 3) - postStaticPadding;
			}
		} else if (jQuery(this).hasClass('three_x_one')) {
			if (containerWidth > postMinWidth * 4) {
				postWidth = postStaticWidth * 3;
				postHeight = postStaticHeight - postStaticPadding;
			} else if (containerWidth > postMinWidth * 2) {
				postWidth = postStaticWidth * 2;
				postHeight = Math.floor((postStaticHeight * 2) / 3) - postStaticPadding;
			} else {
				postWidth = postStaticWidth * 4;
				postHeight = Math.floor((postStaticHeight * 4) / 3) - postStaticPadding;
			}
		} else if (jQuery(this).hasClass('two_x_three')) {
			if (containerWidth > postMinWidth * 2) {
				postWidth = postStaticWidth * 2;
				postHeight = (postStaticHeight * 3) - postStaticPadding;
			} else {
				postWidth = postStaticWidth * 4;
				postHeight = (postStaticHeight * 6) - postStaticPadding;
			}
		} else if (jQuery(this).hasClass('two_x_two')) {
			if (containerWidth > postMinWidth * 2) {
				postWidth = postStaticWidth * 2;
				postHeight = (postStaticHeight * 2) - postStaticPadding;
			} else {
				postWidth = postStaticWidth * 4;
				postHeight = (postStaticHeight * 4) - postStaticPadding;
			}
		} else if (jQuery(this).hasClass('two_x_one')) {
			if (containerWidth > postMinWidth * 2) {
				postWidth = postStaticWidth * 2;
				postHeight = postStaticHeight - postStaticPadding;
			} else {
				postWidth = postStaticWidth * 4;
				postHeight = (postStaticHeight * 2) - postStaticPadding;
			}
		} else if (jQuery(this).hasClass('one_x_three')) {
			if (containerWidth > postMinWidth * 4) {
				postWidth = postStaticWidth;
				postHeight = (postStaticHeight * 3) - postStaticPadding;
			} else if (containerWidth > postMinWidth * 2) {
				postWidth = postStaticWidth * 2;
				postHeight = (postStaticHeight * 6) - postStaticPadding;
			} else {
				postWidth = postStaticWidth * 4;
				postHeight = (postStaticHeight * 12) - postStaticPadding;
			}
		} else if (jQuery(this).hasClass('one_x_two')) {
			if (containerWidth > postMinWidth * 4) {
				postWidth = postStaticWidth;
				postHeight = (postStaticHeight * 2) - postStaticPadding;
			} else if (containerWidth > postMinWidth * 2) {
				postWidth = postStaticWidth * 2;
				postHeight = (postStaticHeight * 4) - postStaticPadding;
			} else {
				postWidth = postStaticWidth * 4;
				postHeight = (postStaticHeight * 8) - postStaticPadding;
			}
		} else if (jQuery(this).hasClass('one_x_one')) {
			if (containerWidth > postMinWidth * 4) {
				postWidth = postStaticWidth;
				postHeight = postStaticHeight - postStaticPadding;
			} else if (containerWidth > postMinWidth * 2) {
				postWidth = postStaticWidth * 2;
				postHeight = (postStaticHeight * 2) - postStaticPadding;
			} else {
				postWidth = postStaticWidth * 4;
				postHeight = (postStaticHeight * 4) - postStaticPadding;
			}
		}
		
		
		jQuery(this).css( { 
			width : postWidth + 'px' 
		} );
		
		
		jQuery(this).find('.project_outer').css( { 
			height : postHeight + 'px' 
		} );
		
		
		jQuery(this).find('.preloader').css( { 
			paddingBottom : postHeight + 'px' 
		} );
		
		
		jQuery(this).find('.project_inner').css( { 
			bottom : '-' + jQuery(this).find('.project_inner').outerHeight() + 'px' 
		} );
		
		
		jQuery(this).find('.cmsmasters_img_rollover .cmsmasters_image_link, .cmsmasters_img_rollover .cmsmasters_open_link').css( { 
			bottom : jQuery(this).find('.project_inner').outerHeight() + 'px' 
		} );
	} );
}



/* Rearrange Projects Function */
function reArrangeProjects(portfolio, portfolioGrid, portfolioPuzzle) { 
	if (portfolioGrid) {
		setColumnWidth(portfolio);
	} else if (portfolioPuzzle) {
		setPuzzleColumnWidth(portfolio);
	}
	
	
	portfolio.isotope('layout');
}



/* Start Blog Isotope Function */
function startBlog(id, layout, layoutMode, url, orderby, order, count, categories, metadata) { 
	var blogContainer = 	jQuery('#blog_' + id), 
		blog = 				blogContainer.find('> .blog'), 
		blogColumns = 		(layout === 'columns') ? true : false;
	
	
	if (blogContainer.find('article').length == 0) {
		return false;
	}
	
	
	if (blogColumns) {
		setColumnWidth(blog);
	}
	
	
	blog.imagesLoaded(function () { 
		blog.isotope( { 
			itemSelector : 	'article.post' 
		} );
		
		
		if (!blog.hasClass('isotope')) {
			blog.addClass('isotope');
		}
		
		
		if (layout === 'columns' && (layoutMode === 'grid' || layoutMode === 'puzzle')) {
			blog.isotope( { 
				layoutMode : 	'fitRows', 
				resizable : 	false 
			} );
		} else if (layout === 'columns' && layoutMode === 'masonry') {
			blog.isotope( { 
				layoutMode : 	'masonry', 
				resizable : 	true 
			} );
		} else if (layout === 'timeline') {
			blog.isotope( { 
				layoutMode : 	'Timeline', 
				resizable : 	true 
			} );
		}
	} );
	
	
	blogContainer.find('.cmsmasters_post_filter_block .cmsmasters_post_filter_list a').on('click', function () { 
		var filter = 			jQuery(this), 
			filterSelector = 	filter.attr('data-filter');
		
		
		filter.parent().parent().find('> li.current').removeClass('current');
		
		
		filter.parent().addClass('current');
		
		
		blog.isotope( { 
			filter : 	filterSelector 
		} );
		
		
		setTimeout(function () { 
			reArrangePosts(blog, blogColumns);
		}, 300);
		
		
		return false;
	} );
	
	
	blogContainer.find('.cmsmasters_post_filter_but').on('click', function () { 
		if (blogContainer.find('.cmsmasters_post_filter_but').hasClass('current')) {
			blogContainer.find('.cmsmasters_post_filter_but').removeClass('current');
		} else {
			blogContainer.find('.cmsmasters_post_filter_but').addClass('current');
		}
	} );
	
	
	blogContainer.find('.cmsmasters_post_loader').on('click', function () { 
		jQuery.ajax( { 
			type : 		'POST', 
			dataType : 	'html', 
			url : 		url + 'inc/post/posts-loader.php', 
			data : { 
				layout : 		layout, 
				layoutmode: 	layoutMode, 
				orderby : 		orderby, 
				order : 		order, 
				count : 		count, 
				categories : 	categories, 
				metadata : 		metadata, 
				offset : 		blog.find('.post').length 
			}, 
			success : function (data) { 
				if (data !== '') {
					var newHTML = '', 
						lightboxVars = [];
					
					
					if (data.slice(0, 6) === 'finish') {
						newHTML = jQuery(data.replace(/cmsmasters_timeline_type/g, 'cmsmasters_timeline_type shortcode_animated').replace(/cmsmasters_masonry_type/g, 'cmsmasters_masonry_type shortcode_animated').slice(6, -1));
						
						
						blogContainer.find('.cmsmasters_wrap_more_posts').hide();
					} else {
						newHTML = jQuery(data.replace(/cmsmasters_timeline_type/g, 'cmsmasters_timeline_type shortcode_animated').replace(/cmsmasters_masonry_type/g, 'cmsmasters_masonry_type shortcode_animated'));
					}
					
					
					newHTML.find('a[rel^="ilightbox["]').each(function () { 
						if (jQuery.inArray(jQuery(this).attr('rel'), lightboxVars) === -1) {
							lightboxVars.push(jQuery(this).attr('rel'));
						}
					} );
					
					
					newHTML.imagesLoaded(function () { 
						blogContainer.find('.blog').isotope('insert', newHTML);
						
						
						setTimeout(function () { 
							jQuery('body').trigger('debouncedresize');
							
							
							reArrangePosts(blog, blogColumns);
							
							
							var settings = {};
							
							
							if (typeof _wpmejsSettings !== 'undefined') {
								settings.pluginPath = _wpmejsSettings.pluginPath;
							}
							
							
							jQuery('.wp-audio-shortcode, .wp-video-shortcode').filter(':not(.mejs-container)').mediaelementplayer(settings);
							
							
							for (var i = 0, il = lightboxVars.length; i < il; i += 1) { 
								blogContainer.find('a[rel="' + lightboxVars[i] + '"]').iLightBox(ilightbox_settings);
							}
						}, 300);
					} );
				}
			} 
		} );
		
		
		return false;
	} );


	jQuery(window).on('debouncedresize', function () { 
		reArrangePosts(blog, blogColumns);
	} );
}



/* Start Portfolio Isotope Function */
function startPortfolio(id, layout, layoutMode, url, orderby, order, count, categories, metadata) { 
	var portfolioContainer = 	jQuery('#portfolio_' + id), 
		portfolio = 			portfolioContainer.find('> .portfolio'), 
		portfolioGrid = 		(layout === 'grid') ? true : false, 
		portfolioPuzzle = 		(layout === 'puzzle') ? true : false;
	
	
	if (portfolioContainer.find('article').length == 0) {
		return false;
	}
	
	
	if (portfolioGrid) {
		setColumnWidth(portfolio);
	} else if (portfolioPuzzle) {
		setPuzzleColumnWidth(portfolio);
	}
	
	
	portfolio.imagesLoaded(function () {
		if (!portfolio.hasClass('isotope')) {
			portfolio.addClass('isotope');
		}
		
		
		if (portfolioGrid) {
			portfolio.isotope( { 
				itemSelector : 	'article.project', 
				getSortData : { 
					project_name : function (el) { 
						return jQuery(el).find('.entry-title > a').text();
					}, 
					project_date : function (el) { 
						return parseInt(jQuery(el).find('.meta-date').text());
					} 
				} 
			} );
			
			
			if (layoutMode === 'perfect') {
				portfolio.isotope( { 
					layoutMode : 	'fitRows', 
					resizable : 	false 
				} );
			} else if (layoutMode === 'masonry') {
				portfolio.isotope( { 
					layoutMode : 	'masonry', 
					resizable : 	true 
				} );
			}
		} else if (portfolioPuzzle) {
			portfolio.isotope( { 
				itemSelector : 	'article.project', 
				layoutMode : 	'masonry', 
				resizable : 	false, 
				masonry : { 
					columnWidth : Math.floor(portfolio.width() / 4) 
				}
			} );
		}
		
		
		if ( 
			!checker.os.iphone && 
			!checker.os.ipod && 
			!checker.os.ipad && 
			!checker.os.blackberry && 
			!checker.os.android 
		) {
			portfolio.waypoint(function (dir) { 
				if (dir === 'down') {
					var el = 		jQuery(this), 
						items = 	el.find('article.project'), 
						delay = 	200, 
						i = 		1;
					
					
					items.each(function () { 
						var item = 	jQuery(this);
						
						
						setTimeout(function () { 
							item.addClass('shortcode_animated');
						}, delay * i);
						
						
						i += 1;
					} );
				}
			}, { 
				offset : 		'100%' 
			} ).waypoint(function (dir) { 
				if (dir === 'up') {
					var el = 		jQuery(this), 
						items = 	el.find('article.project'), 
						delay = 	200, 
						i = 		1;
					
					
					items.each(function () { 
						var item = 	jQuery(this);
						
						
						setTimeout(function () { 
							item.addClass('shortcode_animated');
						}, delay * i);
						
						
						i += 1;
					} );
				}
			}, { 
				offset : 		'25%' 
			} );
		} else {
			portfolio.find('article.project').addClass('shortcode_animated');
		}
		
		
		setTimeout(function () { 
			reArrangeProjects(portfolio, portfolioGrid, portfolioPuzzle);
		}, 500);
	} );
	
	
	portfolioContainer.find('.cmsmasters_project_filter_block .cmsmasters_project_filter_list a').on('click', function () { 
		var filter = 			jQuery(this), 
			filterSelector = 	filter.attr('data-filter');
		
		
		filter.parent().parent().find('> li.current').removeClass('current');
		
		
		filter.parent().addClass('current');
		
		
		portfolio.isotope( { 
			filter : 	filterSelector 
		} );
		
		
		setTimeout(function () { 
			reArrangeProjects(portfolio, portfolioGrid, portfolioPuzzle);
		}, 300);
		
		
		return false;
	} );
	
	
	portfolioContainer.find('.cmsmasters_project_filter_but').on('click', function () { 
		if (portfolioContainer.find('.cmsmasters_project_filter_but').hasClass('current')) {
			portfolioContainer.find('.cmsmasters_project_filter_but').removeClass('current');
		} else {
			portfolioContainer.find('.cmsmasters_project_filter_but').addClass('current');
		}
	} );
	
	
	portfolioContainer.find('.cmsmasters_project_sort_block .cmsmasters_project_sort_but').on('click', function () { 
		var type = jQuery(this).attr('name'), 
			asc = (type === 'project_name') ? true : false, 
			current = (jQuery(this).hasClass('current')) ? true : false, 
			reversed = (jQuery(this).hasClass('reversed')) ? true : false;
		
		
		if (current) { 
			if (reversed) { 
				jQuery(this).removeClass('reversed');
				
				asc = true;
			} else { 
				jQuery(this).addClass('reversed');
				
				asc = false;
			}
		} else { 
			jQuery(this).parent().find('.current').removeClass('current');
			
			jQuery(this).parent().find('.reversed').removeClass('reversed');
			
			
			if (type === 'project_name') { 
				jQuery(this).addClass('current');
			} else { 
				jQuery(this).addClass('current reversed');
			}
		}
		
		
		portfolio.isotope( { 
			sortBy : type, 
			sortAscending : asc 
		} );
		
		
		setTimeout(function () { 
			reArrangeProjects(portfolio, portfolioGrid, portfolioPuzzle);
		}, 300);
		
		
		return false;
	} );
	
	
	portfolioContainer.find('.cmsmasters_project_loader').on('click', function () { 
		jQuery.ajax( { 
			type : 		'POST', 
			dataType : 	'html', 
			url : 		url + 'inc/project/projects-loader.php', 
			data : { 
				layout : 		layout, 
				layoutmode: 	layoutMode, 
				orderby : 		orderby, 
				order : 		order, 
				count : 		count, 
				categories : 	categories, 
				metadata : 		metadata, 
				offset : 		portfolio.find('.project').length 
			}, 
			success : 	function (data) { 
				if (data !== '') {
					var newHTML = '', 
						lightboxVars = [];
					
					
					if (data.slice(0, 6) === 'finish') {
						newHTML = jQuery(data.replace(/type-project/g, 'type-project shortcode_animated').slice(6, -1));
						
						
						portfolioContainer.find('.cmsmasters_wrap_more_projects').hide();
					} else {
						newHTML = jQuery(data.replace(/type-project/g, 'type-project shortcode_animated'));
					}
					
					
					newHTML.find('a[rel^="ilightbox["]').each(function () { 
						if (jQuery.inArray(jQuery(this).attr('rel'), lightboxVars) === -1) {
							lightboxVars.push(jQuery(this).attr('rel'));
						}
					} );
					
					
					newHTML.imagesLoaded(function () { 
						portfolioContainer.find('.portfolio').isotope('insert', newHTML);
						
						
						setTimeout(function () { 
							reArrangeProjects(portfolio, portfolioGrid, portfolioPuzzle);
							
							
							var settings = {};
							
							
							if (typeof _wpmejsSettings !== 'undefined') {
								settings.pluginPath = _wpmejsSettings.pluginPath;
							}
							
							
							jQuery('.wp-audio-shortcode, .wp-video-shortcode').filter(':not(.mejs-container)').mediaelementplayer(settings);
							
							
							for (var i = 0, il = lightboxVars.length; i < il; i += 1) { 
								portfolioContainer.find('a[rel="' + lightboxVars[i] + '"]').iLightBox(ilightbox_settings);
							}
						}, 300);
					} );
				}
			} 
		} );
		
		
		return false;
	} );


	jQuery(window).on('debouncedresize', function () { 
		reArrangeProjects(portfolio, portfolioGrid, portfolioPuzzle);
		
		
		if (portfolioPuzzle) {
			portfolio.isotope( { 
				masonry : { 
					columnWidth : Math.floor(portfolio.width() / 4) 
				}
			} );
		}
	} );
}



/* Start Gallery Isotope Function */
function startGallery(id, gallery_type, gallery_count, gallery_arr) { 
	var galleryContainer = 	jQuery('#cmsmasters_gallery_' + id), 
		gallery = 			galleryContainer.find('> .cmsmasters_gallery'), 
		gallery_count = 	gallery_count, 
		gallery_arr = 		gallery_arr, 
		gallery_items = 	'', 
		gallery_new_item = 	'', 
		ilightbox_run = 	'';
	
	
	setColumnWidth(gallery);
	
	
	gallery.imagesLoaded(function () {
		gallery.isotope( { 
			itemSelector : 	'.cmsmasters_gallery_item' 
		} );
		
		if (!gallery.hasClass('isotope')) {
			gallery.addClass('isotope');
		}
		
		
		if (gallery_type === 'grid') {
			gallery.isotope( { 
				layoutMode : 	'fitRows', 
				resizable : 	false 
			} );
		} else if (gallery_type === 'masonry') {
			gallery.isotope( { 
				layoutMode : 	'masonry', 
				resizable : 	true 
			} );
		}
	} );
	
	
	ilightbox_run = gallery.find('[rel^="ilightbox["]').iLightBox(ilightbox_settings);
	
	if (gallery_count !== 'false' && gallery_arr !== 'false') {		
		galleryContainer.find('.cmsmasters_gallery_items_loader').on('click', function () {
			gallery_items = gallery_arr.splice(0, gallery_count);
			
			
			jQuery(gallery_items).each(function () {
				gallery_new_item = jQuery(this.replace(/cmsmasters_gallery_item/g, 'cmsmasters_gallery_item shortcode_animated'));
				
				gallery.isotope('insert', gallery_new_item);
			} );
			
			
			ilightbox_run.refresh();
			
			setTimeout(function () { 
				reArrangePosts(gallery, true);
			}, 300);

			ilightbox_run = gallery.find('[rel^="ilightbox["]').iLightBox(ilightbox_settings);
			
			
			if (gallery_arr.length == 0) {
				galleryContainer.find('.cmsmasters_more_gallery_items').hide();
			}
		} );
	}
	
	
	jQuery(window).on('debouncedresize', function () { 
		reArrangePosts(gallery, true);
	} );
}

