/*



      ############# 
    ##            *## 
   #        %      **#
  #        %%%    ***#
 #       %%F%D%%   ****#
#          %%%    *****#
#   ###     %     ###***# 
#  # ####       #### #**# 
#  #     #     #     #**# 
#   #####  # #  #####***# 
#         #   #  *******# 
 ### #           **# ### 
     # - - - - - - #                 
      | | | | | | |
	
     freakdesign.com               



*/
(function(){
if(typeof Shopify != 'undefined'){
if (typeof jQuery != 'undefined') {	
if(!$('#shopifyjs').length){
var d = document,url = d.URL;
if(url.indexOf("myshopify.com/admin")>1){

	var _savelabel = 'Save',
		_editlabel = 'Edit',
		_deletelabel = 'Delete',
		jsvoid = 'javascript:void(0)';

	var metafieldform = '<label style="margin-top:1em">Add New Metafield</label><input class="ssb" maxlength="20" type="text" id="metafield_namespace" placeholder="namespace"><input class="ssb" maxlength="30" type="text" id="metafield_key" placeholder="key"><textarea class="ssb" id="metafield_value" placeholder="value"></textarea><input type="hidden" id="metafield_id"><a class="btn btn-slim savemymeta" id="shopifyjs_savemetafield">'+_savelabel+'</a> <a class="int btn btn-slim savemymeta" id="shopifyjs_savemetafield_int">Save as Integer</a> <a class="btn btn-slim hidden delete" id="shopifyjs_deletemetafield">'+_deletelabel+'</a><p style="margin-top:1em;line-height:1"><small><a id="advanced_meta_features" href="'+jsvoid+'">Toggle advanced features</a><br>Please note: Using the save button top right will NOT save these metafields. Be sure to click '+_savelabel+' above.</small></p><div id="advanced_meta" class="hidden"><p><a class="btn btn-slim hidden" data-action="convert_mf_type">Convert type</a></p><p style="border-bottom: 1px solid #ccc;">Handle Helper <a id="adv_clear_cache" style="float:right" href="'+jsvoid+'">Clear cache</a></p><p><a id="adv_get_collections" class="btn btn-slim" href="">Get collections</a></p><p><a id="adv_get_products" class="btn btn-slim" href="">Get products</a> <small>not suitable for large stores</small></p></div>';

	var metafieldloader = '<div class="sub_section-summary"><h1><strong>Metafields</strong> <span id="metacount">0</span></h1><div class="content"><i class="ico ico-20 ico-20-loading"></i></div></div>';

	var metafield_default = '<option value="">Select or create a metafield</option>';

	var metafield_copybox = '<div><a class="btn btn-slim" id="fd_copymetafields">Copy Metafields</a> <a class="btn btn-slim" id="fd_pastemetafields">Paste Metafields</a> <a class="btn btn-slim" title="What have I copied?" href="#" id="fd_whatmetafields">?</a></div>';

	var rte_menu = '<div id="rte_extra"><a class="btn btn-slim" title="Careful, this method is brutal..." id="clearformatting" href="#">Purge html</a> <a class="btn btn-slim" id="createbackup" href="#">Create Backup</a> <a class="btn btn-slim" style="display:none;" id="restorebackup" href="#">Restore Backup</a> <a class="btn btn-slim" title="Add any images in the description to a Metafield" id="save_images_to_meta" href="#">Images to Metafields</a></div>';

	var vbox = '<div class="vbox"><fieldset><select>'+metafield_default+'</select><input id="mv_namespace" placeholder="namespace" /><input id="mv_key" placeholder="key" /><input id="mv_value" placeholder="value" /></fieldset><span class="mybuttons"><a class="save btn btn-slim" href="#">'+_savelabel+'</a> <a class="btn btn-slim saveinteger" href="#">'+_savelabel+' as Integer</a> <a title="Delete" class="delete ico ico-16 ico-delete" href="#">delete</a></span></div>';

	var appnav = '<li><a title="About this tool" id="aboutapp" href="'+jsvoid+'">About ShopifyFD</a></li><li><a title="View recent news" id="getnotifications" href="'+jsvoid+'"><i class="ico ico-16 ico-announcements-inactive"></i></a></li><li><a id="togglestyle" href="'+jsvoid+'">Toggle CSS</a></li><li><a id="themesettings" href="'+jsvoid+'">Theme Settings</a></li><li><a id="manageinventory" href="'+jsvoid+'">Manage Inventory</a></li><li><a id="bulkmetafields" href="'+jsvoid+'">Bulk Metafields</a></li><li><a href="//freakdesign-us.s3.amazonaws.com/shopify/shopifyFD/freakdesign-shopifyfd-for-shopify-guide.pdf" target="_blank">Help</a></li><li><a title="This tool is free, consider leaving a tip" href="http://shopify.freakdesign.com.au/#donate" target="_blank">Use this free tool? Tip me! ($)</a></li>';

	var bulk_html_box = '<h2 class="warning"><strong>Warning:</strong> This section can make bulk changes to your product metafields. There is no undo should something go wrong so be very sure you want to attempt this.</h2><table><tr><td>Namespace</td><td><input id="bulk_namespace" placeholder="Namespace" type="text" /></td></tr><tr><td>Key</td><td><input id="bulk_key" placeholder="Key" type="text" /></td></tr><tr><td>Value</td><td><input id="bulk_value" type="text" placeholder="value" /></td></tr><tr><td colspan="2"><p><strong>Note:</strong> Any existing metafield with the same namespace and key will be overwritten. Have I given you enough warning?</p></td></tr><tr><td><a class="btn create">Save</a> <a class="btn createint">Save Integer</a></td><td><span style="display:none"><a class="btn delete">Delete</a> <input type="text" style="width:50%" placeholder="Type delete" /></span></td></tr><tr><td colspan="2"><textarea class="debug" placeholder="Data Output (future use only)"></textarea></td></tr></table>';

	var autosave_html = '<li><a id="autosave" tabindex="-1" class="btn btn-slim tooltip tooltip-bottom" href="#"><span class="tooltip-container"><span class="tooltip-label">Enable Autosave</span></span>Autosave</a></li>';

	var recent_emails_box = '<table><tr><td>How many days back do we search?</td><td><input value="30" id="from_recent_order_id" placeholder="days" type="text" /></td></tr><tr><td>Fulfillment Status</td><td><select id="recent_fulfillment_status"><option value="any">Any</option><option value="partial">Partial</option><option value="unshipped">Unshipped</option><option value="shipped">Shipped</option></select></td></tr><tr><td><a class="btn getdata">Get Emails</a></td><small>For now this grabs the email only and adds it to the box below. If you would like to see this work differently - let me know!</small><td></td></tr></table><textarea id="recent_emails_output" class="debug" placeholder="Email addresses will load here..."></textarea>';

	var welcome_message = '<ul><li>Jump quickly between editor for product and linklists via a dropdown menu</li><li>Autosave added for products RTE</li><li>Added linklist creator for collections, pages and vendors</li><li>Added a copy function to link lists</li><li>Bulk tag editing enabled on collections page.</li><li>Copy and paste for Shipping rates added.</li></ul>';
	
	var welcome_title='ShopifyFD: Recent updates and news';

	var html_about = '<p>ShopifyFD is "honor-ware", which means that we trust each other to be nice. As the developer of it, I\'m committed to keep the tool something that\'s actually useful. By releasing new features and correcting possible bugs on a constant basis I can do just that, but I need your support. If you use it and intend to keep it, please sponsor its development by making a small <a target="_blank" href="http://shopify.freakdesign.com.au/#donate">contribution</a>.</p><p>You can track changes by keeping an eye on the project page or following me on <a target="_blank" href="https://twitter.com/freakdesign">twitter</a>.</p><p><h4 style="margin-top:1em">Resources and links</h4><ul><li><a href="http://shopify.freakdesign.com.au" target="_blank">Project home page</a></li><li><a href="http://goo.gl/OsFK2d" target="_blank">Feature Request</a></li><li><a href="http://bit.ly/shopifyFD_forum" target="_blank">Shopify forum post</a></li></ul></p>';

	var aargh_msg = '<p>Do note that once you run this you are going to have to manually refresh to see the updates. Annoying I know, but I have not found a way around this...</p>';

	var bubble_html = '<div class="bubble ssb hide" style="bottom: 5px;"><div class="bubble-content p"><h3 class="large">Orders</h3><div class="fl pr"><ul class="unstyled"></ul></div></div><footer class="bubble-footer"><div class="bubble-arrow-wrap"><span class="bubble-arrow-border"></span><span class="bubble-arrow"></span></div></footer></div>';
	
	var bulk_tags = '<div><div class="clearfix em"><div class="half">Choose a collection</div><div class="half"><select data-action="collection"><option value="">Loading, please wait...</option></select></div></div><div class="clearfix em"><div class="half">Choose an action</div><div class="half"><select data-action="action"><option value="add">Add</option><option value="set">Set</option><option value="remove">Remove</option><option disabled value="toggle">Toggle</option><option value="purge" style="background:red;color:#fff">DELETE ALL</option></select></div></div><div class="clearfix em"><div class="half">Set the tag</div><div class="half"><input /></div></div><div class="half"><a class="btn" data-action="update_tags">Update tags</a></div><div class="half"><small>Add: Adds tags to the existing ones<br>Set: Replaces tags with new ones<br>Remove: Removes matching tags<br>Toggle: Future Use, disabled...</small></div></div>';

/* ===========================*/ 
var _ = (function(){

	var v = { 
		debug: false,
		drag_on:true,
		author: 'freakdesign',
		version: 20131111,
		alpha: false,
		omega: false,
		countries:false,
		wait: 1000,
		api_count:0, /* call count */
		api_limit:250,
		metafields:{},
		autosave: false,
		content: $('#content')
	};

return {
	escape:function (str) {
		return str
	    .replace(/[\\]/g, '\\\\')
	    .replace(/[\"]/g, '\\\"')
	    .replace(/[\/]/g, '\\/')
	    .replace(/[\b]/g, '\\b')
	    .replace(/[\f]/g, '\\f')
	    .replace(/[\n]/g, '\\n')
	    .replace(/[\r]/g, '\\r')
	    .replace(/[\t]/g, '\\t');
	},
	redirect:function(p){
		if(p){
			Batman.redirect(p);
		}
	},
	createCookie:function(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	},
	readCookie:function(name) {
		var nameEQ = name + "=",
			ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	},
	notice:function(m,err){
		/*
		Show message at bottom of the screen
		*/
		if(err){
			Shopify.Flash.error(m);
		}else{
			Shopify.Flash.notice(m);
		}
	},
	about_app:function(){
		_.fd_modal(true,html_about,'About this tool',true);
		return false;
	},
	show_notification:function(){
		_.fd_modal(true,welcome_message,welcome_title);
		$('#getnotifications').find('i').removeClass('blinker');
	},
	flash_notification:function(){
		$('#getnotifications').find('i').addClass('blinker');
	},
	createbackup:function(id){
	if(id){
		var mycontent = $("iframe").contents().find("#tinymce"),
			myhtml = mycontent.html(),
			metaJSON = {
				"metafield": {
					"namespace": 'backups',
					"key": id,
					"value": myhtml,
					"value_type": "string"
				}
		};

		$.ajax({
			type: "POST",
			url: d.URL+'/metafields.json',
			dataType: 'json',
			data: metaJSON,
			success: function(d){
				_.updatedropdown();
				_.notice('Backup saved');
			},
			error: function(d){
				var err = JSON.parse(d.responseText);
				_.notice(err.errors.value[0],true);
			}
		});

	
	}
},
	loadmeta:function(loadinto,v){

	var url = '/admin/'+_.data('alpha')+'/'+_.data('omega')+'/metafields.json';

	if(_.data('omega') ==='general'){url = '/admin/metafields.json';}
	if(_.data('alpha') ==='articles'){url = '/admin/articles/'+_.data('omega')+'/metafields.json';}

	$.getJSON(url, function(data) {
		var h = '',
			m = data.metafields;

			if(m){

			_.data('m',m);

			if(_.data('alpha')=='products'){
				_.setup_copypaste();	
			}

			$('#metacount').text(m.length).addClass('active');

			if(m.length === 0){
				$('#metacount').removeClass('active');
			}else{
				$('#metacount').addClass('active');
			}

			for (var i = 0, len = m.length; i < len; i++) {
				h+= '<option data-type="' +m[i].value_type + '" data-id="' +m[i].id + '">' +m[i].namespace + '.' + m[i].key + '</option>';
				v.metafields[m[i].id] = { namespace: m[i].namespace, value: m[i].value, key: m[i].key };
				if (m[i].namespace == "backups"){

					_.flog('hasbackup!');
					$('#restorebackup').show();
					_.data('hasbackup',true);

				}
			}
				h = '<select id="metafieldselect">' + metafield_default + h +'</select>';
			}else{
				h ='<select id="metafieldselect">' + metafield_default + '</select>';
			}

			loadinto.html(h).append(metafieldform);

		$('#advanced_meta_features').off('click').on('click',function(){
			var adv_meta = $('#advanced_meta').eq(0);
			adv_meta.toggleClass('hidden');
			return false;
		});

		$('#adv_clear_cache').off('click').on('click',function(){
			$('#advanced_meta').find('select').remove().end().find('a').show();
			_.data('products',false);
			_.data('collections',false);
			return false;
		});

		/* 
		note the double up functions 
		these should be merged into one
		*/
		$('#adv_get_products').off('click').on('click',function(){

			var t = $(this);
			if(!_.data('products')){
			$.ajax({
			type: "GET",
			url: '/admin/products.json',
			dataType: 'json',
			success: function(d){
				if(d.products.length){
					_.data('products',d);
					var toappend='',
						select=$('<select />',{}).change(function(){
							var t=$(this);
							$('#metafield_value').val(t.val());
						}).html('<option value="">Add product handle as value</option>');

					for (var i = 0, len = d.products.length; i < len; i++) {
						toappend+='<option value="'+d.products[i].handle+'">'+d.products[i].title+'</option>';
					}

					select.append(toappend);
					t.after(select).hide();
				}
			},
			fail: function(){
				_.notice('Failed to load products',true);
			}
			});
			}else{
				var d = _.data('products');
				var toappend='',
					select=$('<select />',{}).change(function(){
							var t=$(this);
							$('#metafield_value').val(t.val());
					}).html('<option value="">Add product handle as value</option>');

					for (var i = 0, len = d.products.length; i < len; i++) {
						toappend+='<option value="'+d.products[i].handle+'">'+d.products[i].title+'</option>';
					}

					select.append(toappend);
					t.after(select).hide();
			}

			return false;

		});

		$('#adv_get_collections').off('click').on('click',function(){
			var t = $(this);
			if(!_.data('collections')){
			$.ajax({
			type: "GET",
			url: '/admin/collections.json',
			dataType: 'json',
			success: function(d){
				if(d.collections.length){
					_.data('collections',d);
					var toappend='',
						select=$('<select />',{}).change(function(){
							var t=$(this);
							$('#metafield_value').val(t.val());
						}).html('<option value="">Add collection handle as value</option>');

					for (var i = 0, len = d.collections.length; i < len; i++) {
						toappend+='<option value="'+d.collections[i].handle+'">'+d.collections[i].title+'</option>';
					}

					select.append(toappend);
					t.after(select).hide();
				}
			},
			fail: function(){
				_.notice('Failed to load collections',true);
			}
			});
			}else{
				var d = _.data('collections');
				var toappend='',
					select=$('<select />',{}).change(function(){
							var t=$(this);
							$('#metafield_value').val(t.val());
					}).html('<option value="">Add collection handle as value</option>');

					for (var i = 0, len = d.collections.length; i < len; i++) {
						toappend+='<option value="'+d.collections[i].handle+'">'+d.collections[i].title+'</option>';
					}

					select.append(toappend);
					t.after(select).hide();
			}
			return false;

		});


		$('#metafieldselect').change(function(){
			var t = $(this).find(':selected');
			if(t.attr('data-id')){

				var m = v.metafields[t.attr('data-id')],
				mtype = 'string',
				mtype_text ='Convert to integer';

				if(t.attr('data-type')==='integer'){mtype = 'integer';mtype_text ='Convert to string'}
				$('a[data-action="convert_mf_type"]').text(mtype_text).attr('data-type',mtype);

				$('#metafield_namespace').val(m.namespace).prop("disabled", true);
				$('#metafield_key').val(m.key).prop("disabled", true);
				$('#metafield_value').val(m.value);
				$('#metafield_id').val(t.attr('data-id'));

				$('#shopifyjs_deletemetafield').removeClass('hidden');
				$('a[data-action="convert_mf_type"]').removeClass('hidden');

			}else{
				_.clearmetaform();
			}
		});



		$('#shopifyjs_deletemetafield').on('click',function(){
			
			var id=$('#metafield_id').val(),
			url = d.URL+'/metafields/'+id+'.json';

			if(_.data('omega') ==='general'){url = '/admin/metafields/'+id+'.json';}
			if(_.data('alpha') ==='articles'){url = '/admin/articles/'+_.data('omega')+'/metafields/'+id+'.json';}
			
			if(id){
				$.ajax({
				  type: "DELETE",
				  url: url,
				  success: function(d){
				  	_.flog(d);
				  	_.notice('Metafield deleted');
				  	_.updatedropdown();
				  },
					error:function(d){
						_.notice('Failed to delete',true);
					}
				});
			}
		});

		$('a[data-action="convert_mf_type"]').off('click').on('click',function(){

			var t = $(this),
			mf_type = 'string';

			if(t.attr('data-type')==='string'){mf_type='integer'}

			var	metafield_namespace = $('#metafield_namespace').val(),
			metafield_key = $('#metafield_key').val(),
			metafield_id = $('#metafield_id').val(),
			metaJSON = {
				"metafield": {
					"value_type": mf_type
				}
			};

		if(metafield_key && metafield_namespace){
			var url = d.URL+'/metafields/'+metafield_id+'.json';

			$.ajax({
				type: "PUT",
				url: url,
				dataType: 'json',
				data: metaJSON,
				success: function(d){
				  	_.updatedropdown();
				  	_.flog(d);
				  	_.notice('Metafield switched to '+mf_type);
				 },
				error: function(d){
					var err = JSON.parse(d.responseText);
					_.notice(err.errors.value[0],true);
				}
			});
		}else{
			_.notice('No metafield found',true);
		}
			return false;

		});

		$('div.sub_section-summary a.savemymeta').off('click').on('click',function(){

			var thistype = 'string';
			if($(this).hasClass('int')){thistype = 'integer'}

			var metafield_namespace = $('#metafield_namespace').val(),
				metafield_key = $('#metafield_key').val(),
				metafield_value = $('#metafield_value').val(),
				metafield_id = $('#metafield_id').val();

			var metaJSON = {
				"metafield": {
					"namespace": metafield_namespace,
					"key": metafield_key,
					"value": metafield_value,
					"value_type": thistype
				}
			};

			var metaupdateJSON = {
				"metafield": {
					"id": metafield_id,
					"value": metafield_value,
					"value_type": thistype
				}
			};


			if(metafield_id.length>5){

		var url = d.URL+'/metafields/'+metafield_id+'.json';



		if(_.data('omega') ==='general'){url = '/admin/metafields/'+metafield_id+'.json';}

			$.ajax({
				  type: "PUT",
				  url: url,
				  dataType: 'json',
				  data: metaupdateJSON,
				  success: function(d){
				  	_.updatedropdown();
				  	_.flog(d);
				  	_.notice('Metafield updated');
				  	Batman.DOM.Modal.hide();
				  }
			});


}else{

			var url = d.URL+'/metafields.json';
			if(_.data('omega') ==='general'){url = '/admin/metafields.json';}
			if(_.data('alpha') ==='articles'){url = '/admin/articles/'+_.data('omega')+'/metafields.json';}

			$.ajax({
				  type: "POST",
				  url: url,
				  dataType: 'json',
				  data: metaJSON,
				  success: function(d){
				  	_.updatedropdown();
				  	_.notice('Metafield saved');
				  },
				  error: function(d){
				  	var r = JSON.parse(d.responseText),
				  	e = '';
				  	
				  	if (r.errors.namespace){e+='Namespace '+_.escape(r.errors.namespace[0])+'. '}
				  	if (r.errors.key){e+='Key '+_.escape(r.errors.key[0])+'. '}
				  	if (r.errors.value){e+='Value '+_.escape(r.errors.value[0])+'. '}

				  	_.notice('Metafield failed to save: ' + e,true);
				  }
			});

}

			return false;
		});

		/* end of json get */
	});
},
	bulk_save_metafield_queue:function(m,i,debug_box){

						
		$.ajax({
			  type: "POST",
			  url: '/admin/products/'+_.data('products')[i].id+'/metafields.json',
			  dataType: 'json',
			  data: m,
			  success: function(d){
			  	if(debug_box){
			  		var fdmv = debug_box.val();
					debug_box.val(fdmv+i+': '+_.data('products')[i].id+': ok\n');
				}
			  	if(i+1 < _.data('products').length){
			  		_.bulk_save_metafield_queue(m,i+1,debug_box)
			  	}else{

			  		 if(_.data('alpha') == 'products'){
			  		 	_.updatedropdown();
			  		 }

			  		Shopify.Flash.notice("Bulk changes done!");
			  	}
			  }
		});


	},
	bulkmetafields:function(){

		var myhtml=$(bulk_html_box),
			nope = 'I did say these are not working right?',
			create_btn = myhtml.find('a.create'),
			createint_btn = myhtml.find('a.createint'),
			update_btn = myhtml.find('a.update'),
			delete_btn = myhtml.find('a.delete'),
			bulk_namespace=myhtml.find('#bulk_namespace'),
			bulk_key=myhtml.find('#bulk_key'),
			bulk_value=myhtml.find('#bulk_value'),
			debug_box = myhtml.find('textarea.debug'),
			ok=function(){return 1<bulk_namespace.val().length&&1<bulk_key.val().length&&1<bulk_value.val().length?!0:!1};


		create_btn.off('click').on('click',function(){

			if(ok){
				var metaJSON = {
					"metafield": {
						"namespace": bulk_namespace.val(),
						"key": bulk_key.val(),
						"value": bulk_value.val(),
						"value_type": 'string'
					}
				};
				_.bulk_save_metafield_queue(metaJSON,0,debug_box);
			}else{
				_.notice('No empty fields allowed');
			}

		});

		createint_btn.off('click').on('click',function(){
			if(ok){

				if(!isNaN(bulk_value.val())){
					debug_box.val(_.data('products'));
					var metaJSON = {
						"metafield": {
							"namespace": bulk_namespace.val(),
							"key": bulk_key.val(),
							"value": bulk_value.val(),
							"value_type": 'integer'
						}
					};
					_.bulk_save_metafield_queue(metaJSON,0,debug_box);
				}else{
					_.notice('Value not an integer',true);
				}

			}else{
				_.notice('No empty fields allowed',true);
			}	
		});


		$.ajax({
		type: "GET",
		url: '/admin/products.json?fields=id,title',
		dataType: 'json',
		success: function(d){
			if(d.products){
				if(d.products.length){
					_.data('products',d.products);
					_.fd_modal(true,myhtml,'Bulk Metafield editing (for '+ d.products.length +' products)',true);
				}else{
					_.notice('No products found',true);
				}
			}	
		},
		error:function(d){
			_.notice('Error getting products',true);
		}
		});


		/* -------------------- */

	},
	clearformatting:function(){
		var mycontent = $("iframe").contents().find("#tinymce"),
			div = document.createElement("div");

		div.innerHTML = mycontent.html();
		var text = div.textContent || div.innerText || "";
		mycontent.text(text);
	},
	clearmetaform: function(){
		$('#metafield_namespace').val('').prop("disabled", false);
		$('#metafield_key').val('').prop("disabled", false);
		$('#metafield_value').val('');
		$('#metafield_id').val('');
		$('#shopifyjs_deletemetafield').addClass('hidden');
		$('a[data-action="convert_mf_type"]').addClass('hidden');
	},
	supports_html5_storage:function(){
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
			return false;
		}
	},
	kill_drag_drop:function(){
		if(_.data('drag_on')){
			var doc = document.documentElement;
			doc.className = '';
			doc.ondragover = function () {return false;};
			doc.ondragleave = function () {return false;};
			doc.ondragend = function () {return false;};
			doc.ondrop = function () {}
		}
	},
	set_drag_drop:function(){if(_.data('drag_on')){
		var dndSupported = function () {
			var div = document.createElement('div');
			return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);
		};
		if(dndSupported()){
			_.flog('has dnd');

	/* --------------------------------------------- */

	var doc = document.documentElement;
	doc.ondragover = function () { 
		this.className = 'dragit'; return false; 
	};
	doc.ondragleave = function () { 
		this.className = ''; return false; 
	};
	doc.ondragend = function () { 
		this.className = '';
		return false; 
	};
	doc.ondrop = function (event) {
		
		

	event.preventDefault && event.preventDefault();

	var files = event.dataTransfer.files,
		files_count = files.length,
		files_index = 0,
		reader = new FileReader(),
		file_array = {};

		reader.onload = function (event) {
			_.flog('load');
			var fdata = event.target.result;
			var justdata = fdata.split(',')[1];

				file_array[files_index] = { "name": files[files_index].name, "data": justdata };
				files_index++;


			if(files_index < files_count){
				_.notice("Reading file ["+ (files_index+1 )+"] contents...");
				reader.readAsDataURL(files[files_index]);
			}else{
				_.do_upload(file_array);
			}

		};

		if(files_count){
			document.documentElement.className = 'dragit';
			_.notice("Reading file ["+ (files_index+1 )+"] contents...");
			reader.readAsDataURL(files[files_index]);
		}
	
	  return false;
	};



/* ---------------------------------------------- */

							}
						}/* end debug check */
	},
	do_upload:function(d){if(_.data('drag_on')){



		var files = d,
			files_count = Object.keys(d).length,
			files_index = 0,
			tid = _.data('themeID');

		if(_.data('alpha') == 'themes'){tid = _.data('omega');}
		if(_.data('omega') == 'settings' && !isNaN(_.data('alpha'))){tid = _.data('alpha');}

		

		if(tid){

		

		var doajax = function(){

		var myfile = {
			"asset": {"key": 'assets/'+files[files_index].name,"attachment": files[files_index].data}
		};

		$.ajax({
			type: "PUT",
			url: '/admin/themes/'+tid+'/assets.json',
			data: myfile,
			success: function(){
				_.notice(files[files_index].name + ' uploaded ('+(files_index+1)+'/'+files_count+')')

				files_index++;

				if(files_index < files_count){
					doajax();
				}
				
				if(files_index == files_count){
					document.documentElement.className = '';
				}

				
			},
			error:function(){
				_.notice('File upload failed',true);
				document.documentElement.className = '';
			}
		});

		}

		doajax();

	}else{
		_.notice('Theme ID not found',true);
	}

	}},
	get_product_count:function(){
		$.ajax({
			type: "GET",
			url: '/admin/products/count.json',
			success: function(d){
				if(d){
					_.data('product_count',d.count)
				}
			}
		});
	},
	get_all_product_metafields:function(){
		/* this may make the api limit kick in. hold on to your hats! */
		if(_.data('product_count')<=_.data('api_limit')){

		}else{
			/* we are going to have a bad time with the api limit. How slow should we run each one?
			500 per 5 minute block...*/
		}
	},
	save_variant_metafield:function(id,namespace,key,value,vid,type){
							/* add validation in here */

							_.flog(id,namespace,key,value,vid,type);
							var thistype = 'string';
							if(type){thistype = 'integer'}

							if(!vid.length){

								var meta = {"metafield": {"namespace": namespace,"key": key,"value": value,"value_type": thistype}};
								$.ajax({
										type: "POST",
										url: '/admin/variants/'+id+'/metafields.json',
										data: meta,
										success: function(d){
											_.flog(d);
											_.setup_vrow(id);
											_.notice('Metafield saved');
										},
										error:function(d){
											_.setup_vrow(id);
											_.notice('Error Saving',true);
										}
								});
							}else{

								var meta = {"metafield": {"id": vid,"value": value,"value_type": thistype}};

								$.ajax({
										type: "PUT",
										url: '/admin/variants/'+id+'/metafields/'+vid+'.json',
										data: meta,
										success: function(d){
											_.flog(d);
											_.setup_vrow(id);
											_.notice('Metafield updated');
										},
										error:function(d){
											_.setup_vrow(id);
											_.notice('Error saving',true);
										}
								});
							}

	},
	delete_variant_metafield:function(id,vid){
							$.ajax({
									type: "DELETE",
									url: '/admin/variants/'+id+'/metafields/'+vid+'.json',
									success: function(d){
										_.flog(d);
										_.setup_vrow(id);
										_.notice('Metafield deleted');
									},
									error:function(d){
										_.setup_vrow(id);
										_.notice('Failed to delete',true);
									}
							});
	},
	variant_fillfields:function(id){
							var found = false;
							for (var i = 0, len = _.data('vm').length; i < len; i++) {
								o = _.data('vm')[i];
								if(parseInt(o.id) == parseInt(id)){
									return(o);
								}
							};
							return found;

	},
	setup_vrow:function(v){

							$('#mv_namespace').val('').prop("disabled", false);
							$('#mv_key').val('').prop("disabled", false);
							$('#mv_value').val('');
							_.data('current_vid','');
							
							var option = function(o){
								return '<option class="meta" value="'+o.id+'">'+o.namespace+'.'+o.key+'</option>';
							}


	if(v){

			$.ajax({
				type: "GET",
				url: '/admin/variants/'+v+'/metafields.json',
				success: function(d){

					$('#vrow option.meta').remove();
					m = d.metafields;

					if(m){
						_.data('vm',m);

						if(m.length){
							$('#vrow select').addClass('active');
						}else{
							$('#vrow select').removeClass('active');
						}
					}

					for (var i = 0, len = m.length; i < len; i++) {
						$('#vrow select').append(option(m[i]));
					}
					
					$('#vrow .delete').hide();

					$('#vrow .save').off('click').on('click',function(){


						if(!_.data('current_vid')){
							_.data('current_vid','');
						}
						_.save_variant_metafield(v,$('#mv_namespace').val(),$('#mv_key').val(),$('#mv_value').val(),_.data('current_vid'));
						return false;
					});

					$('#vrow .saveinteger').off('click').on('click',function(){

						/*$('#vrow .mybuttons').hide();*/
						if(!_.data('current_vid')){
							_.data('current_vid','');
						}
						_.save_variant_metafield(v,$('#mv_namespace').val(),$('#mv_key').val(),$('#mv_value').val(),_.data('current_vid'),true);
						return false;
					});

					$('#vrow .delete').off('click').on('click',function(){

						/*$('#vrow .mybuttons').hide();*/
						_.delete_variant_metafield(v,_.data('current_vid'));
						return false;
					});

					$('#vrow select').eq(0).off('change').change(function(){
						var v_val = $(this).val();
						_.data('current_vid',v_val);
						_.flog(_.data('vm'));

						if(v_val.length){
							$('#mv_namespace').prop("disabled", true);
							$('#mv_key').prop("disabled", true);
							$('#vrow .delete').show();
							var o = _.variant_fillfields(v_val);
							if(o){
								$('#mv_namespace').val(o.namespace);
								$('#mv_key').val(o.key);
								$('#mv_value').val(o.value);
							}
						}else{
							$('#mv_namespace').prop("disabled", false);
							$('#mv_key').prop("disabled", false);
							$('#vrow .delete').hide();
						}



					});

					$('#vrow .mybuttons').fadeIn(function(){
						/*Batman.DOM.Modal.hide();*/
					});

					
				},
				error:function(d){
					Shopify.Flash.error("Error grabbing metafields");
				}
			});
							}else{
								Shopify.Flash.error("Could not find ID");
							}

						},
						panel_editvariantmeta:function(){

							$('.row.section.inventory .section-summary p').after('<p class="box notice">To edit metafields for the variant click in the variant ID number field.</p>');

							/* simple function to return val to default */
							$('td.vid input').on('change', function() {
								var t = $(this);
								t.val(t.attr('data-val'));
							});

							/* fire setup when field is clicked */
							$('td.vid input').on('click', function() {
								$('#vrow').remove();
								var t = $(this),
								v = t.attr('data-val');
								t.select();

								_.flog(v);
								_.data('currentvrow',v);

								$('tr.variant.active').removeClass('active');
								var tp = t.parent().parent();
								tp_td = tp.find('td').length+1;

								tp.addClass('active').after('<tr id="vrow"><td colspan="'+tp_td+'">'+vbox+'</td></tr>');
									_.setup_vrow(v);
							});

						},
						btn_removealltags:function(){
							$('div.row.section.tags div.section-summary').eq(0).append('<a id="addalltags" href="#" class="btn">Add all tags</a> <a id="removealltags" href="#" class="btn">Remove all tags</a>');

							$('#removealltags').on('click',function(){
								$('ul.tokenized-list').eq(0).find('a').click();
								return false;
							});

							$('#addalltags').on('click',function(){
								$('ul.addtags').eq(0).find('span:not(.inactive)').click();
								return false;
							});

						},
						flog:function(o){
							/* wrapper for a console - makes it easier to kill off the calls this way. */
							if(_.data('debug')){
								console.log(o);
							}
						},
	fd_modal_update:function(hide,content,title){
		/* hide gives us a chance to toggle content -- useful for hold states */
		var my_fdmodal = $('#fdmodal');
		if(my_fdmodal.length){ 
			my_fdmodal.remove(); 
		}

	},
	fd_modal:function(show,content,title,persist){

		_.flog('fdmodal');

		var my_fdmodal = $('#fdmodal');

		if(show){
			
			if(my_fdmodal.length){ my_fdmodal.remove(); }

			var m = $('<div id="fdmodal" class="modalWindow"><div class="main content"><header></header></div></div>');

			if(title){
				m.find('header').html('<h2>'+title+'</h2>');
			}
			if(content){
				var d = $('<div/>',{}).append(content);
				m.find('div.main.content').append(d);
			}

			if(!persist){
				m.fadeIn().on('click',function(){
					_.fd_modal(false);
				});
			}else{
				var mclose = $('<a href="#" class="close-modal">X</a>');
				mclose.on('click',function(){
					_.fd_modal(false);
					return false;
				});
				m.find('header').prepend(mclose).end().fadeIn();
			}
			$('body').append(m);
			
		}else{
			my_fdmodal.off('click').remove();
		}

	},
	create_discounts:function(quantity){


	},
	restorebackup:function(id){
		var mycontent = $("iframe").contents().find("#tinymce");
		var m = _.data('m');

		if(m){
			for (var i = 0, len = m.length; i < len; i++) {
			if(m[i].namespace == 'backups'){
			mycontent.html(m[i].value);
			_.notice('Backup restored');
			}}
		}else{
			_.notice('Error, nothing to restore');
		}
	},
	setup_discounts:function(){

		var u = $('<ul/>',{
			'class':'segmented',
			'id':'discount_buttons'
			}),
			l = $('<li/>'),
			a = $('<a/>',{
				'class':'btn btn-separate',
				'href':'#',
				'title':'Disable all codes below'
			}).html('Disable codes').on('click',function(){
				$('#discount-table a[data-event-click="discount.disable"]').click();
				return false;
			}),
			b = $('<a/>',{
				'class':'btn btn-separate',
				'href':'#',
				'title':'Enable all codes below'
			}).html('Enable codes').on('click',function(){
				$('#discount-table a[data-event-click="discount.enable"]').click();
				return false;
			}),
			c = $('<a/>',{
				'class':'btn btn-separate disabled',
				'href':'#'
			}).html('Bulk create').on('click',function(){
				if(_.data('debug')){
					/* <br><br><div><h2>Discount details</h2><div class="span1">How many times can this discount be used?</div><div class="span2"><input value="1" /></div><h2 class="clearfix">Discount type</h2><div class="span1">How many times can this discount be used?</div><div class="span2"><input /></div><h2>Date range</h2><div class="span1">How many times can this discount be used?</div><div class="span2"><input /></div> */
				}else{
					_.fd_modal(true,'<p>This is on the todo list. Will get to it soon(ish)</p></div>','Bulk create discount codes',true);
				}
				return false;
			});

			l.append(a,b,c);
			u.append(l);

			$('.header-right .segmented').eq(0).after(u);

	},
	setup_articles:function(){
		_.flog('setup_articles');
		$('div.span6.section-summary a.view-in-store').remove();
		$('div.span6.section-summary').eq(0).find('p, h1').remove().end().append(metafieldloader);

		var loadinto = $('div.sub_section-summary .content');
		_.loadmeta(loadinto,v);
	},
	setup_blogs:function(){
		var view_in_store = $('div.span6.section-summary a.view-in-store'),
		blog_title = $('h1.header-main span[data-bind="blog.title"]');

		blog_title.addClass('view-in-store').html('<a target="shopify_storeview" href="'+view_in_store.prop('href')+'">'+blog_title.text()+'</a>').prop('title', 'View in store');
		view_in_store.remove();
		$('div.span6.section-summary').eq(0).find('p, h1').remove().end().append(metafieldloader);
		var loadinto = $('div.sub_section-summary .content');

		/* 
		Blogs load slower in the admin that other sections - weird... 
		[update] this may not longer be true. Testing is required. 
		*/

		window.setTimeout(function(){
			_.loadmeta(loadinto,v);
		},250);

	},
	setup_rte:function(){

		if(_.data('hasbackup')){
			$('#restorebackup').show();
		}

		$('#clearformatting').on('click',function(){
			_.clearformatting();
			return false;
		});

		$('#createbackup').on('click',function(){
			_.createbackup(_.data('omega'));
			return false;
		});

		$('#restorebackup').on('click',function(){
			_.restorebackup(_.data('omega'));
			return false;
		});

		$('#save_images_to_meta').on('click',function(){
			_.save_images_to_meta();
			return false;
		});

	},
	save_images_to_meta:function(){
		var images = $("iframe").contents().find("#tinymce").find('img');

		if(images && images.length){
			var meta = '';

			images.each(function(i) {
				var src = $(this).prop('src').replace(/https:/i,'');
				meta += src;
				if(i < images.length-1){meta+=',';}
			});

			var metaJSON = {
			"metafield": {"namespace": 'helpers',"key": 'images',"value": meta,"value_type": "string"}
			};

			$.ajax({
				  type: "POST",
				  url: d.URL+'/metafields.json',
				  dataType: 'json',
				  data: metaJSON,
				  success: function(d){
				  	_.updatedropdown();
				  	_.notice('Images saved to metafield');
				  },
					error:function(d){
						_.notice('Error saving',true);
				}
			});
		}else{
			_.notice('No images found',true);
		}

	},
	array_unique:function(array){
		var a = array.concat();
		for(var i=0; i<a.length; ++i) {
		for(var j=i+1; j<a.length; ++j) {
		if(a[i] === a[j])
		a.splice(j--, 1);
		}}

		return a;
	},
	setup_products_list:function(){

			if(!$('#showsku').length){
				var u = $('<ul/>',{
					'class':'segmented',
					'id':'showsku'
					}),
					l = $('<li/>'),
					a = $('<a/>',{
						'class':'btn',
						'href':'#',
						'title':'Show SKU and Variant IDs'
					}).html('Show SKUs & ID').on('click',function(){
						var p = [],
							sku =[],
							a_list = $('#all-products td.name a');

						a_list.each(function(){
							p.push($(this).attr('href').split(/[/]+/).pop());
						});

						if(p.length){
							var i=0,
				getsku = function(p,i){


				$.ajax({
					type: "GET",
					url: '/admin/products/'+p[i]+'.json?fields=variants',
					dataType: 'json',
					success: function(d){
						var s = d.product.variants[0].sku,
							v = d.product.variants[0].id,
							skuspan ='';
						if(s || v){
							if(s){skuspan='<span title="SKU" class="sku label">'+s+'</span>'}
							a_list.eq(i).before(skuspan+'<span title="VariantID" class="variant label">'+v+'</span>');
						}

						if(i+1 < p.length){
							getsku(p,i+1);
						}else{
							_.fd_modal(false);
						}

					}	
					
				});

				};

				_.fd_modal(true,'Loading SKUs and Variant IDs, please wait...','Loading',true);
				getsku(p,i);

						}
						return false;
				});

				l.append(a);
				u.append(l);

				$('.header-right .segmented').eq(1).after(u);

			}
		},
		setup_link_lists_edit:function(){


			$.ajax({
				type: "GET",
				url: '/admin/link_lists.json',
				dataType: 'json',
				success: function(d){
					if(d){
						link_lists = d.link_lists;
						var response = '';
						for (var i = 0, len = link_lists.length; i < len; i++) {

							if(_.data('omega') !== link_lists[i].id.toString()){
								response +='<option value="'+link_lists[i].id+'">'+link_lists[i].title+'</option>';
							}
						}

						var llselect = $('<select />',{
							id:'shopifyjs_llselect',
							'class':'header-select'
						}).append('<option>Choose another linklist to edit</option>',response).change(function(){
							var v = $(this).val();
							if(v){
								 _.redirect('/link_lists/'+v);
							}
						});

						$('.header-row .header-right').prepend(llselect);
						
					}
					
				},
				error:function(d){
					_.notice('Error loading linklist data',true);
				}
			});


		},
		setup_link_lists:function(){
			/* Setup the button and actions for link list duplication and creation */
			var llf = $('div.linklist-container .box-footer'),
				create_collection_linklist = function(){

					$.ajax({
						type: "GET",
						url: '/admin/collections.json?limit=250',
						dataType: "json",
						success: function(d){

							var l = {"link_list":{"handle":"all-collections","title":"All Collections","links":[]}};

							for (var i = 0, len = d.collections.length; i < len; ++i) {
								l.link_list.links.push({
									'position':i+1,
									'title': d.collections[i].title,
									'link_type':'collection',
									'subject_id':d.collections[i].id
								})
							}

							create_a_linklist(l);

						},
						error:function(){
							_.notice('Error! Are you sure you have access to collections?',true);
						}
					});

					return false;
				},
				create_pages_linklist = function(){
					/* get the pages */

					$.ajax({
						type: "GET",
						url: '/admin/pages.json?limit=250',
						dataType: "json",
						success: function(d){

							var l = {"link_list":{"handle":"all-pages","title":"All Pages","links":[]}};

							for (var i = 0, len = d.pages.length; i < len; ++i) {
								l.link_list.links.push({
									'position':i+1,
									'title': d.pages[i].title,
									'link_type':'page',
									'subject_id':d.pages[i].id
								})
							}

							create_a_linklist(l);

						},
						error:function(){
							_.notice('Error! Are you sure you have access to pages?',true);
						}
					});

					return false;
				},
				create_vendors_linklist = function(){

					$.ajax({
						type: "GET",
						url: '/admin/products/vendors.json',
						dataType: "json",
						success: function(d){

							var l = {"link_list":{"handle":"all-vendors","title":"All Vendors","links":[]}};

							for (var i = 0, len = d.vendors.length; i < len; ++i) {
								l.link_list.links.push({
									'position':i+1,
									'title': d.vendors[i],
									'link_type':'http',
									'subject':'/collections/vendors?q='+(encodeURIComponent(d.vendors[i].toLowerCase()).replace(/%20/g, '+'))
								})
							}

							create_a_linklist(l);

						}	
					});

				},
				create_a_linklist = function(linklist){

					$.ajax({
						type: "POST",
						url: '/admin/link_lists.json',
						data:JSON.stringify(linklist),
						contentType: "application/json;charset=utf-8", /* required */
						dataType: "json",
						success: function(d){
							_.notice('Link list added');
							if(d.link_list.id){
								_.redirect('/link_lists/'+d.link_list.id); /* redirect to linklist */
							}
						}	
					});

				},
				a = $('<a/>',{
					'href':'#',
					'class':'btn btn-slim fr',
					'style':'margin-right:.5em'
				}).text('Copy').on('click',function(){
					var t = $(this),
						a = t.parent().find('a[data-route="link_list"]').eq(0);
						if(a.length){
							href = a.attr('href').split('/').pop();
							if(!isNaN(href)){
								$.ajax({
									type: "GET",
									url: '/admin/link_lists/'+href+'.json',
									dataType: 'json',
									success: function(d){
										delete d.link_list.id;
										delete d.link_list['default'];
										d.link_list.title += ' COPY';
										d.link_list.handle += '-copy';
										/*
										// Just in case we need to delete something later on
										for (var i = 0, len = d.link_list.links.length; i < len; ++i) {
											delete d.link_list.links[i].id;
											delete d.link_list.links[i].subject;
											delete d.link_list.links[i].subject_id;
											delete d.link_list.links[i].subject_params;
											
										}
										*/
										create_a_linklist(d);
									}	
								});
							}
						}
					return false;
				});

				llf.append(a);

				var d = $('.span6.section-summary').eq(0),
						a1 = $('<a/>',{
							'class':'btn',
							href:'#',
							title:'Create a linklist with every collection'
						}).text('Create Collections linklist').on('click',function(){
							create_collection_linklist();
							return false;
						}),
						a2 = $('<a/>',{
							'class':'btn',
							href:'#',
							title:'Create a linklist with every page'
						}).text('Create Pages linklist').on('click',function(){
							create_pages_linklist();
							return false;
						}),
						a3 = $('<a/>',{
							'class':'btn',
							href:'#',
							title:'Create a linklist with all vendors'
						}).text('Create Vendor linklist').on('click',function(){
							create_vendors_linklist();
							return false;
						}),
						warning = $('<p/>',{
							'class':'box warning',
							style:"margin-top:1em"
						}).text('If you use the trash can button to remove a linklist some ShopifyFD features will not reload. Navigate away from the page, and back again.');

				if(d){
					d.append('<br><br>',a1,'<br><br>',a2,'<br><br>',a3).find('p:eq(0)').append(warning);

				}


			/* end duplication setup */
		},
		setup_collections:function(){
			_.data('collections',false);
			var u = $('<ul/>',{
					'class':'segmented'
					}),
					l = $('<li/>'),
					a = $('<a/>',{
						'class':'btn',
						'href':'#',
						'title':'Add tags to entire collection'
					}).html('Bulk edit tags').on('click',function(){
						_.fd_modal(true,bulk_tags,'Edit tags for all products in a collection',true);
						var fdmodal = $("#fdmodal"),
							a = fdmodal.find('select[data-action="action"]'),
							b = fdmodal.find('a').eq(1),
							c = fdmodal.find('select[data-action="collection"]'),
							t = fdmodal.find('input').eq(0);

a.change(function(event) {
	"purge"==a.val()||"set"==a.val()?("purge"==a.val()&&t.val("").attr("disabled","disabled"),b.addClass("delete")):(t.removeAttr("disabled"),b.removeClass("delete"));
});

var set_tags = function(_d,i,t,callback){
	/* Overwrite the existing tags */
	var id = _d.products[i].id,
		data = {
			"product": {
			"id": id,
			"tags": t
			}
		};

	b.text(i+1+'/'+_d.products.length);

	$.ajax({
	type: "PUT",
	url: '/admin/products/'+id+'.json',
	data: data,
	dataType: 'json',
	success: function(d){
		++i;
		if(i<_d.products.length){
			set_tags(_d,i,t,callback)
		}else{
			callback();
		}
	}
	});
}

var delete_tags = function(_d,i,t,callback){

	if(_d.products[i].tags){

		var a1 = t.replace(/, /g, ',').split(','),
			a2 = _d.products[i].tags.replace(/, /g, ',').split(','),
			a3 = $(a2).not(a1).get() + '',
			id = _d.products[i].id,
			data = {
				"product": {
				"id": id,
				"tags": a3
				}
			};

		b.text(i+1+'/'+_d.products.length);

		$.ajax({
			type: "PUT",
			url: '/admin/products/'+id+'.json',
			data: data,
			dataType: 'json',
			success: function(d){
				++i;
				if(i<_d.products.length){
					delete_tags(_d,i,t,callback)
				}else{
					callback();
				}
			}
		});

	}else{

		++i;
		if(i<_d.products.length){
			delete_tags(_d,i,t,callback)
		}else{
			callback();
		}

	}

}

var put_tags = function(_d,i,t,callback){
	/*	
		Add tags (should they be unique) 
		*not the most efficient method running this every time. add this to the todo list 
	*/

	var a1 = t.replace(/, /g, ',').split(','),
		a2 = _d.products[i].tags.split(','),
		a3 = _.array_unique(a1.concat(a2))+'',
		id = _d.products[i].id,
		data = {
			"product": {
			"id": id,
			"tags": a3
			}
		};

		b.text(i+1+'/'+_d.products.length);

	$.ajax({
		type: "PUT",
		url: '/admin/products/'+id+'.json',
		data: data,
		dataType: 'json',
		success: function(d){
			++i;
			if(i<_d.products.length){
				put_tags(_d,i,t,callback)
			}else{
				callback();
			}
		}
	});

}

b.on('click',function(){

if(c.val().length){

	if(a.val()=='add' && t.val().length){

		$.ajax({
		type: "GET",
		url: '/admin/products.json?collection_id='+c.val()+'&fields=id,tags',
		dataType: 'json',
		success: function(d){
			b.addClass('disabled');	
			put_tags(d,0,t.val(),function(){
				_.notice('Done. Tags have been added');
				b.text('Update tags').removeClass('disabled');
			});
		}
		});
	}


	if(a.val()=='purge' || a.val()=='set'){

		$.ajax({
		type: "GET",
		url: '/admin/products.json?collection_id='+c.val()+'&fields=id',
		dataType: 'json',
		success: function(d){
			b.addClass('disabled');	
			set_tags(d,0,t.val(),function(){
				_.notice('Done.');
				b.text('Update tags').removeClass('disabled');
			});
		}
		});
	}

	if(a.val()=='remove'){

		$.ajax({
		type: "GET",
		url: '/admin/products.json?collection_id='+c.val()+'&fields=id,tags',
		dataType: 'json',
		success: function(d){
			b.addClass('disabled');	
			delete_tags(d,0,t.val(),function(){
				_.notice('Matched tags have been removed.');
				b.text('Update tags').removeClass('disabled');
			});
		}
		});
	}




}else{
	_.notice('Choose a collection',true);
}
	return false;

});


a.hide();
$.ajax({
	type: "GET",url: '/admin/collections.json',dataType: 'json',
	success: function(d){
	if(d.collections.length){
		_.data('collections',d);
		var toappend='';

for (var i = 0, len = d.collections.length; i < len; i++) {
toappend+='<option value="'+d.collections[i].id+'">'+d.collections[i].title+'</option>';
}
c.append(toappend).find('option:eq(0)').text('Select a collection');
a.show();
	}
}});

						return false;
					});

			l.append(a);
			u.append(l);

			$('.header-right .segmented').eq(1).after(u);
		},
		seo_description:function(){

			var sdt = $('#seo-description-tag');
			var sdt_textarea = $('<textarea/>');
			sdt_textarea.val(sdt.val()).keyup(function(){
				sdt.val($(this).val());
			});

			sdt.after(sdt_textarea).hide();

		},
		setup_copypaste:function(){

							var a = $(metafield_copybox),
								p = a.find('#fd_pastemetafields'),
								q = a.find('#fd_whatmetafields');

							a.find('#fd_copymetafields').on('click',function(){
								if(_.data('m')){
									_.data('m-copy',_.data('m'));
									_.notice(_.data('m-copy').length + " Metafields copied");
									p.show();
									q.show();
								}else{
									p.hide();
									q.hide();
								}
								return false;
							});

							q.on('click',function(){

								if(_.data('m-copy')){
									var h = '';
									var m = _.data('m-copy');
									for (var i = 0, len = m.length; i < len; i++) {
											h+= '<p><strong>'+m[i].namespace+'.'+m[i].key+' ('+m[i].value_type+')</strong><br>'+m[i].value+'</p><hr>';
									}
									_.fd_modal(true,h,'In the virtual clipboard...');
								}

								return false;
							});

							p.on('click',function(){
								
								if(_.data('m-copy')){
									_.save_metafield_queue(_.data('m-copy'),0);
								}						

								return false;
							});

							if(!_.data('m-copy')){
								p.hide();
								q.hide();
							}

							$('div.sub_section-summary').after(a);

		},
						save_metafield_queue:function(q,i){

								_.fd_modal(true,'','Please wait whilst we past the metafields',true);

								var metaJSON = {
									"metafield": {
										"namespace": q[i].namespace,
										"key": q[i].key,
										"value": q[i].value,
										"value_type": q[i].value_type
									}
								};

							

							$.ajax({
								  type: "POST",
								  url: d.URL+'/metafields.json',
								  dataType: 'json',
								  data: metaJSON,
								  success: function(d){
							
								  	if(i+1 < q.length){
								  		_.save_metafield_queue(q,i+1);
								  	}else{
								  		 _.updatedropdown();
								  		 _.fd_modal(false);
								  		Shopify.Flash.notice("Pasted!");
								  	}
								  }
							});		

						},
						setup_products:function(){

						clearInterval(_.data('autosave'));

						$.ajax({
							type: "GET",
							url: '/admin/products.json?limit=25',
							dataType: 'json',
							success: function(d){
								if(d){
									products = d.products;
									var response = '',
									len = products.length;
									if(len <= 25){
										for (var i = 0; i < len; i++) {

											if(_.data('omega') !== products[i].id.toString()){
												response +='<option value="'+products[i].id+'">'+products[i].title+'</option>';
											}
										}

										var pselect = $('<select />',{
											id:'shopifyjs_pselect',
											'class':'header-select'
										}).append('<option>Choose another product to edit</option>',response).change(function(){
											var v = $(this).val();
											if(v){
												 _.redirect('/products/'+v);
											}
										});

										$('.header-row .header-right').prepend(pselect);
									}
								}
								
							},
							error:function(d){
								_.notice('Error loading linklist data',true);
							}
						});


						$('div.span6.section-summary').eq(0).append(metafieldloader).find('div:first-child').remove();

						/*$('iframe')*/
						if ($('#rte_extra').length == 0){

							$('#product-body-html_ifr').eq(0).after(rte_menu);
							_.setup_rte();
							$('.rtetools-buttons ul.fr').eq(1).append(autosave_html);

							$('#autosave').on('click',function(){

								var t = $(this),
								rte_save_btn = false;

								if(t.hasClass('rte-command-active')){

									Shopify.Flash.notice("Autosave disabled");
									clearInterval(_.data('autosave'));

								}else{

									rte_save_btn = $('#products-show header input[type="submit"]');
									Shopify.Flash.notice("Autosave enabled");
									_.data('autosave',setInterval(function(){
										if(rte_save_btn.length){
											rte_save_btn.click();
										}else{
											clearInterval(_.data('autosave'));
											rte_save_btn = null;
											Shopify.Flash.notice("Autosave disabled");
										}
									},30000));

								}

								/* toggle class - not the nicest method */
								$(this).toggleClass('rte-command-active');


								return false;
							});

						}else{

							_.notice('Bug! I tried to load the content editor twice.',true);

						}

							_.btn_removealltags();
							_.seo_description();

							var view_in_store = $('div.span6.section-summary a.view-in-store'),
								page_title = $('h1.header-main span[data-bind="product.title"]'),
								loadinto = $('div.sub_section-summary .content'),
								variants_ids = {};

							page_title.addClass('view-in-store').html('<a target="shopify_storeview" href="'+view_in_store.prop('href')+'">'+page_title.text()+'</a>').prop('title', 'View in store');
							view_in_store.remove();

							/* load away! */
							_.loadmeta(loadinto,v);

							$('#product-inner-variants th:last-child').before('<th>Variant ID</th>');
							$('th.inventory.tc').text('#').prop('title', 'Quantity');
							
							$('tr.variant').each(function(i){

								var variant_id = $('td.sku input.mock-edit-on-hover').eq(i).prop('id').split(/[- ]+/).pop();
								variants_ids['variant_'+i] = {'id':variant_id};
								/*$(this).find('td:last-child ul').before('<td class="vid">'+variant_id+'</td>');*/
								$(this).find('td:last-child').before('<td class="vid tooltip tooltip-bottom"><input class="mock-edit-on-hover" data-action="selectall" data-val="'+variant_id+'" type="text" value="'+variant_id+'" /><span class="tooltip-container"><span class="tooltip-label">Click to edit Metafields</span></span></td>');
							}).promise().done(function(){
								_.panel_editvariantmeta();
							});

							/* here we can set what the default collection metafield should be */
							var tpc = $('table.product-collections').eq(0);
							tpc.find('tr').each(function(){
								var a=$('<a/>',{
									'class':'btn',
									'href':'#',
									'title':'Set a metafield with this collection handle'
								}).text('Set as preferred').on('click',function(){
									_.fd_modal(true,'soon...','Future function');
									return false;
								});
								$(this).find('td.col-remove').prepend(a);
							});

							/* add in buttons for additional bulk variant updates */
							var bulkpanel = $('table.variants .bulk-actions').eq(0);

							if(bulkpanel.length){
								var a=$('<a/>',{
									'href':'#',
									'class':'btn btn-slim hidden',
									'style':'padding-left:.5em'
								}).text('Edit weight').on('click',function(){
									_.fd_modal(true,'<label>New weight (grams)</label><input class="half" min="0" type="number" data-action="update-variant-weight" /><a data-action="update-variant-weight" href="#" class="btn btn-slim">Save</a><br><br><small>Note: You will need to reload this page before Shopify will show the new weight in the dashboard.</small>','Edit weight',true);

									var a = $('a[data-action="update-variant-weight"]'),
										w = $('input[data-action="update-variant-weight"]');

									if(a.length && w.length){
										a.on('click',function(){
											
											var checked = $('tr.variant input[type="checkbox"]:checked');
											if(checked.length && !isNaN(w.val())){
												var v = [];
												checked.each(function(){
													var id = $(this).parent().parent().find('td.vid').text();
													if(!isNaN(id)){v.push(parseInt(id))}
												});

												var update_weight = function(i,v){
												$.ajax({
													type: "PUT",
													url: '/admin/variants/'+v[i],
													dataType: 'json',
													data: {
														"variant": {
														"id": v[0],
														"grams": w.val()
														}
													},
													success: function(d){
														++i;
														if(i<v.length){
															update_weight(i,v);
														}else{
															_.notice('Weight updated');
															a.removeClass('is-loading').text('Save');
														}	
													
													}
												});

											};
											a.addClass('is-loading').text('');
											update_weight(0,v);

											}else{
												_.notice('Did you set a weight?',true);
											}
											return !1;
										});
									}
									return !1;
								}),
								b=$('<span/>',{
									'class':'hidden'
								}),
								m=$('<a/>',{
									'href':'#',
									'class':'btn btn-slim hidden',
									'style':'padding-left:.5em'
								}).text('Edit metafields').on('click',function(){
									var a = $('tr.variant input[type="checkbox"]:checked').eq(0);
									a.parent().parent().find('td.vid').click();
									return !1;
								});

								bulkpanel.append(a,m);

								/* check to see if we need to show our buttons */
								$('tr.variant input[type="checkbox"]').on('change',function(){
									var l = $('tr.variant input[type="checkbox"]:checked').length;

									if(l > 1){
										a.removeClass("hidden");
										m.addClass("hidden");
									}else{
										a.addClass("hidden");
										if(l===1){
											m.removeClass("hidden");
										}else{
											m.addClass("hidden");
										}
									}

								});
							}
							
						},
						setup_pages:function(){
								/* add new details box, and remove some of the extra crap we don't need to see that's taking up space... */

							var view_in_store = $('div.span6.section-summary a.view-in-store'),
								page_title = $('h1.header-main span[data-bind="page.title"]');


							
							$('#page-content_ifr').eq(0).after(rte_menu);
							
							_.setup_rte();

							page_title.addClass('view-in-store').html('<a target="shopify_storeview" href="'+view_in_store.prop('href')+'">'+page_title.text()+'</a>').prop('title', 'View in store');

							_.seo_description();
							view_in_store.remove();

							$('div.span6.section-summary').eq(0).find('p, h1').remove().end().append(metafieldloader);

							/* defined what we are loading into */
							var loadinto = $('div.sub_section-summary .content');

							/* load away! */
							_.loadmeta(loadinto,v);


							$.ajax({
								type: "GET",
								url: '/admin/pages.json',
								dataType: 'json',
								success: function(d){
									if(d){
										pages = d.pages;
										var response = '';
										for (var i = 0, len = pages.length; i < len; i++) {

											if(_.data('omega') !== pages[i].id.toString()){
												response +='<option value="'+pages[i].id+'">'+pages[i].title+'</option>';
											}
										}

										$('.header-row .header-right').prepend('<select id="shopifyjs_pageselect" class="header-select"><option>Choose another page to edit</option>'+response+'</select>');
										$('#shopifyjs_pageselect').change(function(){
											var v = $(this).val();
											if(v){
												 _.redirect('/pages/'+v);
											}
										});
									}
									
								},
								error:function(d){
									_.notice('Error loading page data',true);
								}
							});

						},
	shipping_remove_all:function(i,c){

			if(i>=0){
				$.ajax({
					type: "DELETE",
					url: '/admin/countries/'+c[i].id+'.json',
					dataType: 'json',
					success: function(d){
						Shopify.Flash.notice('removed '+c[i].name);
						i = i-1;
						_.shipping_remove_all(i,c);
					}
				});
			}else{
				var url = '/admin/settings/shipping';
				$.ajax({
					'url': url,
					'success': function(){
						$('div.shipping-rate-table').remove();
						_.redirect('/settings');
						setTimeout(function(){
							_.redirect('/settings/shipping');
						},2000);
					}
					});
			}

	},
	save_new_rates:function(to_add,i,t){

		if(to_add[i]){
			var d = to_add[i],
				o ={},
				type = d.type,
				path='';

				delete d.type; /* remove this */

			if(type){
			if(type === 'weight'){
				o = {weight_based_shipping_rate:{}};
				o.weight_based_shipping_rate = d;
				path='/admin/weight_based_shipping_rates.json';

			}else if(type === 'price'){
				o = {price_based_shipping_rate:{}}
				o.price_based_shipping_rate = d,
				path='/admin/price_based_shipping_rates.json';

			}else if (type === 'carrier'){
				o = {carrier_shipping_rate_provider:{}}
				o.carrier_shipping_rate_provider = d,
				path='/admin/carrier_shipping_rate_providers.json';
			}

			$.ajax({
				type: "POST",
				url: path,
				dataType: 'json',
				data: o,
				success: function(d){
					t.parent().parent().find('table').append('<tbody><tr style="background:#efefef"><td>'+to_add[i].name+'</td><td>Pasted a custom shipping rate. <a href=".">Refresh page</a> to view</td><td>'+to_add[i].price+'</td></tr></tbody>');

					if(i === (to_add.length-1)){
						_.notice('Paste complete');
					}else{
						i++;
						_.save_new_rates(to_add,i,t);
					}
				}
			});
			}else{
				_.notice('missing type: ' + type, true);
			}

		}else{
			_.notice('save_new_rates error - length',true);
		}


	},
	setup_shipping:function(go){
	if(go){

		_.fd_modal(false);

		$('div.span6.section-summary').eq(0).append('<p style="margin-top:1em" class="box warning">Warning: When you copy and paste over existing rates the old ones still show until the page is refreshed, even though they have been removed. <br><br>Be sure to do a test first. <strong>Use at own risk.</strong></p>');


		var shippingSettings = $('#settings-shipping'),
			new_buttons = $('<div class="header-right"><div class="header-action"><ul class="segmented"><li><a class="btn" href="#">Bulk Updates</a></li><li><a class="btn delete btn-separate" href="#">Delete all countries</a></li></ul></div></div>');

		new_buttons.find('a').eq(0).on('click',function(){
			var myhtml = $('<h2 class="warning"><strong>Warning:</strong> This section can make bulk changes to your Shipping rates. There is no undo.</h2><div><div class="span1"><p>Soon...</p></div><div class="span2">'+aargh_msg+'</div></div>');
			_.fd_modal(true,myhtml,'Bulk Updates',true);
			return false;
		}).hide();

		new_buttons.find('a').eq(1).on('click',function(){
			var myhtml = $('<h2 class="warning"><strong>Warning:</strong> This is a bad idea. It will delete ALL of your countries. There is no undo. Proceed at own risk!</h2><div><div class="span1"><a href="#" class="btn delete_all delete">Delete</a></div><div class="span2">'+aargh_msg+'</div></div>');

			myhtml.find('a.delete_all').on('click',function(){


				$.ajax({
					type: "GET",
					url: '/admin/countries.json',
					dataType: 'json',
					success: function(d){
						if(d.countries.length){
							v.countries = d.countries;
							_.notice(d.countries.length + " countries returned");
							_.shipping_remove_all(d.countries.length-1,d.countries);
						}
					}
				});


				return false;
			});

			_.fd_modal(true,myhtml,'Delete all countries',true);

			return false;
		});


		shippingSettings.find('header').eq(0).append(new_buttons);


			if($('div.shipping-rate-table').length === _.data('countries').countries.length){

				var shipping_rates = {
					weight_based_shipping_rates:[],
					price_based_shipping_rates:[],
					carrier_shipping_rate_providers:[]
				},
				shipping_types = ['weight','price','carrier'];


var create_shipping_rate = function(c,to_add,t){

	

	if(to_add.length){

	var to_delete = [];

	$.ajax({
		type: "GET",
		url: '/admin/countries/'+c+'.json',
		dataType: 'json',
		success: function(d){

			var w = d.country.weight_based_shipping_rates,
				p = d.country.price_based_shipping_rates,
				c = d.country.carrier_shipping_rate_providers;

			/* build up the delete list */
			for (var i = 0, len = w.length; i < len; i++) {
					to_delete.push([w[i].id,'weight']);
			}

			for (var i = 0, len = p.length; i < len; i++) {
					to_delete.push([p[i].id,'price']);
			}

			for (var i = 0, len = c.length; i < len; i++) {
					to_delete.push([c[i].id,'carrier']);
			}

			/* 
				now that we have the delete list - let's delete
				we should queue them up, but let's try mini burst 
				This could cause issues with api limit. watch carefully.

			*/

			for (var i = 0, len = to_delete.length; i < len; i++) {
				var path = '';
				if(to_delete[i][1] == 'weight'){path='/admin/weight_based_shipping_rates/'}
				if(to_delete[i][1] == 'price'){path='/admin/price_based_shipping_rates/'}
				if(to_delete[i][1] == 'carrier'){path='/admin/carrier_shipping_rate_providers/'}


				$.ajax({
					type: "DELETE",
					url: path+to_delete[i][0]+'.json',
					dataType: 'json',
					success: function(d){

					}
				});
			} /* end delete loop */

			_.save_new_rates(to_add,0,t);


		},
		fail:function(){
			_.notice('I failed to get the country.json',true);
		}
	}); /* end ajax */

	}else{
		_.notice('Missing items to add',true)
	}	
}; /* end create_shipping_rate() */
/* ================================================================================== */

				$('div.shipping-rate-table').each(function(index){
					var t=$(this);
					var copy = $('<a/>',{
						'href':'#',
						'data-country':_.data('countries').countries[index].name,
						'data-cid':_.data('countries').countries[index].id,
						'data-index':index,
						'class':'btn btn-slim copyrates',
						'style':'float:right;margin-right:.5em'
					}).text('Copy rates').on('click',function(){
						var t=$(this),
							i = t.attr('data-index'),
							cname = t.attr('data-country'),
							cid = t.attr('data-cid');

						/* lazy hide all */
						$('a.bulkpaste').hide();
						/*

						I had used the countries var to start with but I can't 
						be sure that new ones aren't added in the meantime.
						Sadly, more api calls needed...
						
						shipping_rates.weight_based_shipping_rates = _.data('countries').countries[i].weight_based_shipping_rates;
						shipping_rates.price_based_shipping_rates = _.data('countries').countries[i].price_based_shipping_rates;
						shipping_rates.carrier_shipping_rate_providers = _.data('countries').countries[i].carrier_shipping_rate_providers;
						_.notice('Copy of '+cname+' ready');

						*/

						$.ajax({
							type: "GET",
							url: '/admin/countries/'+cid+'.json',
							dataType: 'json',
							success: function(d){
								shipping_rates.weight_based_shipping_rates = d.country.weight_based_shipping_rates;
								shipping_rates.price_based_shipping_rates = d.country.price_based_shipping_rates;
								shipping_rates.carrier_shipping_rate_providers = d.country.carrier_shipping_rate_providers;
								_.notice('Copy of '+cname+' ready');
								/* lazy show all */
								$('a.bulkpaste').show();
							}
						});


						return false;
					});

					var paste = $('<a/>',{
						'href':'#',
						'data-country':_.data('countries').countries[index].name,
						'data-cid':_.data('countries').countries[index].id,
						'data-index':index,
						'class':'bulkpaste btn btn-slim',
						'style':'float:right;margin-right:.5em'
					}).text('Paste rates').on('click',function(){			

						var t=$(this),
							cid = t.attr('data-cid'),
							shipping_rates_copy = shipping_rates,
							weight = shipping_rates_copy.weight_based_shipping_rates,
							price = shipping_rates_copy.price_based_shipping_rates,
							carrier = shipping_rates_copy.carrier_shipping_rate_providers,
							to_add = [],
							count = 0;

							/* harsh, but may avoid conflicts */
							t.parent().parent().find('tbody').remove();
							t.parent().find('a.copyrates').remove();

							for (var i = 0, len = weight.length; i < len; i++) {
								weight[i].country_id=cid;
								delete weight[i].id;
								weight[i].type = 'weight';

								/* add to add list */
								to_add[count] = weight[i];
								count++;
							}

							for (var i = 0, len = price.length; i < len; i++) {
								price[i].country_id=cid;
								delete price[i].id;
								price[i].type = 'price';

								/* add to add list */
								to_add[count] = price[i];
								count++;

							}

							for (var i = 0, len = carrier.length; i < len; i++) {
								carrier[i].country_id=cid;
								delete carrier[i].id;
								carrier[i].type = 'carrier';

								/* add to add list */
								to_add[count] = carrier[i];
								count++;

							}					

						/* We have the add list, let's do this */
						create_shipping_rate(cid,to_add,t);

						return false;
					}).hide(); /* end paste button */
					
					/* add the buttons */
					t.find('a[data-event-click="setupNewShippingRateForm"]').after(paste, copy);
				});
			}else{_.notice("Mismatch in country count. Reload this page.",true)}

		}else{

			/* first time page run */
			$.ajax({
					type: "GET",
					url: '/admin/countries.json',
					dataType: 'json',
					success: function(d){
						if(d.countries.length){
							_.data('countries',d);
							_.notice(d.countries.length + " countries loaded");
							_.setup_shipping(true);
						}
					}
				});
		}
						},
						setup_custom_collections:function(){
							$('div.row.section.visibility').eq(0).after('<div class="row section" id="customer_meta_box"><div class="span12 section-summary">'+metafieldloader+'</div></div>');
							var loadinto = $('div.sub_section-summary .content');
							_.loadmeta(loadinto,v);


							if ($('#rte_extra').length == 0){
								$('#collection-body-html_ifr').eq(0).after(rte_menu);
								_.setup_rte();
							}

						},
						get_files:function(i,pic_pages){
							var table = $('#settings-general table');
							_.notice('Loading files...');
							$.ajax({
								type: "GET",
								url: '/admin/files.json?limit=50&direction=next&page='+i,
								success: function(d,textStatus, request){
									if(d){

										var rows = $('');

										for (var i = 0, len = d.files.length; i < len; i++) {
											var row = $('<tr />',{
												'class':'file_row'
											}),
											td_image = $('<td />'),
											td_src = $('<td />'),
											td_path = $('<td />'),
											td_size = $('<td />',{
												'class':'tr'
											}),
											td_delete = $('<td />'),
											file_link = $('<a />',{
												href:'#',
												'data-src':d.files[i].public_url.replace('http:','')
											});

											if(d.files[i].content_type.indexOf('image')>-1){

												file_link.on('click',function(){
													var t = $(this);
													_.fd_modal(true,'<img src="'+ t.attr('data-src') +'" />','Image Preview',true);
													return false;
												}).text(d.files[i].key.replace('files/',''));

												var thumb = d.files[i].public_url.replace(/(\.[^\.]+)$/, '_thumb$1').replace('http:','');

												td_image.html('<img src="'+thumb+'" />');
												td_src.append(file_link);
												td_path.html('<input class="select-all-on-focus" value="'+ d.files[i].public_url +'">');
												

											}else{

												file_link.attr('href',d.files[i].public_url).attr('target','_blank').text(d.files[i].key.replace('files/',''));

											}

											td_size.html(Math.floor(d.files[i].size/1024)+' kB');
											row.append(td_image,td_src,td_path,td_size,td_delete);
											table.append(row);
										}


										if(i >= pic_pages){
											_.notice('All loaded');
											$('.header-right .segmented').hide();
											/*
											var table = $('#settings-general table'),
											trhead = table.find('thead tr');
											trbody = table.find('tbody tr');
											trhead.prepend('<th><input type="checkbox" /></th>');
											trbody.prepend('<th><input type="checkbox" /></th>');
											*/

										}else{
											++i;
											_.get_files(i,pic_pages);
										}
									}
								}
							});	

						},
						setup_files:function(){
							/* not in this version! */
							var u = $('<ul/>',{
								'class':'segmented',
								'id':'get_all_images'
								}),
								l = $('<li/>'),
								a = $('<a/>',{
									'class':'btn',
									'href':'#',
									'style':'margin-left:1em'
								}).html('Show all files').on('click',function(){

									var t = $(this);
									t.addClass('is-loading').attr('style','margin-left:1em;text-indent: -9999px;')
									$.ajax({
										type: "GET",
										url: '/admin/files.json?limit=2&fields=id',
										success: function(d,textStatus, request){
											if(d){
												var limit = 50,
												total_pics = request.getResponseHeader('X-Total-Results');
												if(total_pics > limit){
													var pic_pages = Math.ceil(total_pics/limit);
													_.get_files(2,pic_pages);
												}else{
													_.notice('There are no more to load',true);
												}
											}

										},
										error:function(){
											t.removeClass('is-loading').attr('style','margin-left:1em');
											_.notice('Error loading files',true);
										}
									});

									return false;

								});
							l.append(a);
							u.append(l);
							$('.header-right .segmented').eq(0).after(u);
							$('#settings-general .info-message').prepend('<p class="box notice"><b>Bulk file deletion is coming soon to ShopifyFD...</b></p>');

						},
						setup_settings_general:function(){

							var section = $("<div>", {
								id: "general_metafields",
								'class':'row section description'
							}),
							summary = $('<div>', {
								'class':'span6 section-summary'
							}),
							sectionContent = $('<div>',{
								'class':'span18 section-content'
							});

							summary.html('<h1>Store Metafields</h1><p>Edit your most awesome shop level metafields here...</p>');
							sectionContent.html(metafieldloader);
							section.append(summary).append(sectionContent);

							$('div.row.section.description.first-section').eq(0).after(section);

							var loadinto = $('div.sub_section-summary .content');
							_.loadmeta(loadinto,v);

						},
						setup_customers:function(){
							$('section.customer-details.ssb .box-details').eq(0).after('<div id="customer_meta_box" class="box box-details"><div class="box-header p"><h3>Metafields</h3></div><div class="box-content p">'+metafieldloader+'</div>');
							var loadinto = $('div.sub_section-summary .content');
							_.loadmeta(loadinto,v);


						},
						setup_single_order:function(){
							$('div.order-sidebar .box-details').eq(0).after('<div id="customer_meta_box" class="box box-details"><div class="box-header p"><h3>Metafields</h3></div><div class="box-content p">'+metafieldloader+'</div>');
							var loadinto = $('div.sub_section-summary .content');
							_.loadmeta(loadinto,v);

							var billing_box = $('div.address[data-showif="order.billing_address"]').eq(0),
								email = billing_box.find('a[data-modal-view="ContactCustomerModalView"]'),
								input = $('<input />',{
									'value':email.text(),
									'class':'noprint',
									'style':'margin-top:1em'
								}).on('click',function(){
									$(this).select();
								});


								billing_box.append(input);

						},
						setup_orders:function(){

/*
http://ecommerce.shopify.com/c/shopify-discussion/t/export-email-addresses-from-costumers-156837#comment-157042
*/

							var u = $('<ul/>',{
								'class':'segmented',
								'id':'get_email_list'
								}),
								l = $('<li/>'),
								a = $('<a/>',{
									'class':'btn',
									'href':'#'
								}).html('Get emails').on('click',function(){

							var myhtml = $(recent_emails_box);

							myhtml.find('a.getdata').on('click',function(){

								var t = $('#recent_emails_output'),
									time = new Date(),
									o = 30,
									o_val = $('#from_recent_order_id').val(),
									f_status = $('#recent_fulfillment_status').val(); 

								/* reset the textarea */
								t.val('');

								if(o_val.length>0){o=parseInt(o_val)}

								time.setDate(time.getDate()- o);

								var d = time.getDate(),
									m = time.getMonth() + 1,
    								y = time.getFullYear();

								var strdate = y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d) +' 00:00';

								_.flog(time);
								_.flog(strdate);

								$.ajax({
									type: "GET",
									url: '/admin/orders.json?fields=email&fulfillment_status='+f_status+'&created_at_min='+strdate,
									success: function(d){
										if(d.orders.length){
											var orders = d.orders,
											output = '';

											for (var i = 0, len = orders.length; i < len; i++) {
												_.flog(orders[i].email);
												output+=orders[i].email+',\n';
											}

											t.val(output);

										}else{

											_.notice("Error. No results returned",true);

										}
									}
								});


							});



									
									_.fd_modal(true,myhtml,'Get recent order emails',true);
									return false;

								});

								l.append(a);
								u.append(l);

								$('.header-right .segmented').eq(1).after(u);

/* 
------------------- 
get order on hover
http://ecommerce.shopify.com/c/shopify-discussion/t/break-dance-in-public-for-hoover-on-order-number-shows-items-orders-in-admin-159836
------------------- 
*/

								var visible_orders = $('#all-orders a[data-bind="order.name"]'),
									order_timer = false; /* we should add a slight timeout to the box load */

								visible_orders.append(bubble_html).css({'position':'relative'}).hover(function(){
									var t = $(this);
									order_timer = setTimeout(function(){
									var l = t.find('ul').eq(0),
										a = t.attr('href');

										$('div.bubble').addClass('hide');

									if(!t.data('order')){
									$.ajax({
									type: "GET",
									url: a+'.json',
									success: function(d){
										if(d){
											var line_items = d.order.line_items,
												tracking_number=d.order.fulfillments,
												order_list = '';

											for (var i = 0, len = line_items.length; i < len; i++) {
												order_list +='<li style="white-space:normal">'+line_items[i].quantity + ' x '+line_items[i].name+'</li>';
											}

											if(d.order.fulfillment_status && tracking_number.length){
												order_list +='<li style="white-space:normal;border-top: 1px solid #ccc;margin-top: .5em;padding-top: .5em;">Tracking#: <b>'+tracking_number[0].tracking_number+'</b></li>';
											}

											t.data('order',order_list);
											l.html(order_list);
											t.find('div.bubble').removeClass('hide');
										}
									}});
									}else{
										t.find('div.bubble').removeClass('hide');	
									}

								},200);

								},function(){
									clearTimeout(order_timer);
									var t = $(this);
									t.find('div.bubble').addClass('hide');
								});

						},
						get_recent_emails:function(a){
							/* a = offset */
						},
						shortcut_to_open_orders:function(){
						/*

						Binds click event to the small box showing open orders.
						Makes it a one click method, rather than two.

						*/

							$('#sidebar span[data-bind="Order.openCount"]').on('click',function(){
								_.redirect('/orders?query=+financial_status%3Aany+status%3Aopen');
							}).prop('title','Jump to open orders');
							
						},
						updatedropdown:function(){
								var url = d.URL+'/metafields.json';
								if(_.data('omega') ==='general'){url = '/admin/metafields.json';}

								if(_.data('alpha') ==='articles'){url = '/admin/articles/'+_.data('omega')+'/metafields.json';}

								$.getJSON(url, function(data) {
									
								var response = '',
								m = data.metafields;
								

								if(m.length){

									_.data('m',m);
									$('#metacount').text(m.length).addClass('active');
									for (var i = 0, len = m.length; i < len; i++) {
										response+= '<option data-type="' +m[i].value_type + '" data-id="' +m[i].id + '">' +m[i].namespace + '.' + m[i].key + '</option>';
										v.metafields[m[i].id] = { namespace: m[i].namespace, value: m[i].value, key: m[i].key };

										if (m[i].namespace == 'backups'){
											$('#restorebackup').show();
										}
									}
									response = metafield_default + response;
								}else{
									$('#metacount').text('0').removeClass('active');
									_.data('m',false);
									$('#restorebackup').hide();
									response = metafield_default;
								}

								$('#metafieldselect').html(response);

								_.clearmetaform();

								});		



						},
						load_css:function(){
							/* Load the CSS */
							var shopifyCSS = document.createElement("link");
							shopifyCSS.type = "text/css";
							shopifyCSS.rel = "stylesheet";
							shopifyCSS.id = "shopifyjs";
							/* mirrors:
							//rawgithub.com/freakdesign/shopifyFD/master/shopifyFD.css
							//dl.dropboxusercontent.com/s/m9ur11hivel2sou/shopifyFD.css
							*/
							shopifyCSS.href = "//rawgithub.com/freakdesign/shopifyFD/master/shopifyFD.css";
							document.body.appendChild(shopifyCSS);
						},
						get_theme_data:function(){

							if(!_.data('themeID')){
								$.ajax({
									type: "GET",
									url: '/admin/themes.json',
									success: function(d){
										if(d){
											for (var i = 0, len = d.themes.length; i < len; i++) {
												if(d.themes[i].role ==='main'){
													_.flog(d.themes[i].id);
													_.data('themeID',d["themes"][i].id);
													_.data('themeName',d["themes"][i].name);
												}
											}
										}
									}
								});
							};

						},
	init:function(){
		_.shortcut_to_open_orders();
		_.set_drag_drop();
		_.get_theme_data();
		if(!_.data('debug')){
			if(!_.readCookie('shopifyfd')){
				/*
				notification flash
				*/
				_.flash_notification();
				_.createCookie('shopifyfd','loaded',3);
			}
		}
		/* enable the styles */
		$('#togglestyle').click(); 

		/* 

		Alpha Omega check. 
		This just keep an eye on the url so we know if something should be fired off or not...

		*/

setInterval(function(){

/* do nothing whilst the shopify is in loading mode. This is not the greatest method but it seems reliable enough to detect when Shopify has finished loading its stuff...
*/

if(!_.data('content').hasClass('loading')){ 
/* ========================================================================= */
	/*
	Was added for the autosave. Removed for now.
	clearInterval(_.data('autosave'));
	*/

	var u_array = d.URL.split('#')[0].split('?')[0].split('/'),
		alpha = u_array[u_array.length - 2],
		omega = d.URL.split('/').pop();


	if( alpha !== _.data('alpha') || omega !== _.data('omega') ){

		_.data('alpha',alpha);
		_.data('omega',omega);
		_.flog(_.data('alpha')+','+_.data('omega'));

/* ========================================================================= */

	if( _.data('alpha') == 'customers' && !isNaN(_.data('omega'))){
		_.setup_customers();
	} else if( _.data('alpha') == 'articles' && !isNaN(_.data('omega'))){
		_.setup_articles();
	} else if( _.data('alpha') == 'pages' && !isNaN(_.data('omega'))){
		_.setup_pages();
	} else 	if( _.data('alpha') == 'smart_collections' && !isNaN(_.data('omega'))){
		_.setup_custom_collections(); 
	} else if( _.data('alpha') == 'custom_collections' && !isNaN(_.data('omega'))){
		 _.setup_custom_collections(); 
	} else if( _.data('alpha') == 'blogs' && !isNaN(_.data('omega'))){
		_.setup_blogs();
	} else if( _.data('alpha') == 'products'){
		_.setup_products();
	} else if( _.data('alpha') == 'admin' && _.data('omega') == 'products' ){
		_.setup_products_list();
	} else if( _.data('alpha') == 'orders' && !isNaN(_.data('omega'))){
		_.setup_single_order();
	} else if( _.data('alpha') == 'admin' && _.data('omega') == 'orders' ){
		_.setup_orders();
	} else if( _.data('alpha') == 'admin' && _.data('omega') == 'collections' ){
		_.setup_collections();
	} else if( _.data('alpha') == 'admin' && _.data('omega') == 'link_lists' ){
		_.setup_link_lists();
	} else if( _.data('alpha') == 'link_lists' && !isNaN(_.data('omega'))){
		_.setup_link_lists_edit();
	} else if( _.data('alpha') == 'admin' && _.data('omega') == 'discounts' ){
		_.setup_discounts();
	} else if( _.data('alpha') == 'settings' && _.data('omega') == 'general' ){
		_.setup_settings_general();
	} else if( _.data('alpha') == 'settings' && _.data('omega') == 'files' ){
		_.setup_files();
	} else if( _.data('alpha') == 'settings' && _.data('omega') == 'shipping' ){
		_.setup_shipping();
	} else if( _.data('alpha') == 'settings' && _.data('omega') == 'taxes' ){
		/*_.setup_taxes();*/
	}


} /* end page change check */
} /* end hasclass loading */
}, _.data('wait')); /* end interval */
/* end init */},
	data: function(a,b){
		if("undefined"===typeof b)return v[a];v[a]=b
	},
	toggleStyle: function(){
		/* just in case this css breaks something, allow it to be disabled... */
		$('html').toggleClass('shopifyJSoverride');
	},
	isloading:function(){
		return _.data('content').hasClass('loading');
	}
}}());
				
_.load_css();

	/* create some elements */
	var b = $('body'),
		bar = $("<div>", {id: "shopifyJSbar",'class':'loading noprint'}),
		wrapper = $("<div>", {'class': "wrapper clearfix"}),
		nav = $("<ul>", {id: "shopifyJSnav"});

		nav.html(appnav);

		nav.find('a').on('click',function(){
			if(!_.isloading()){

			var t = $(this),
				id=t.prop('id');

			if(id){

			if(id=='manageinventory' && _.data('alpha') !== 'inventory'){_.redirect('/variants')}
			else if(id=='bulkmetafields'){_.bulkmetafields();}
			else if(id=='themesettings' && isNaN(_.data('alpha')) ){_.redirect('/themes/current/settings')}
			else if(id=='togglestyle'){_.toggleStyle();t.toggleClass('active')}
			else if(id=='aboutapp'){_.about_app()}
			else if(id=='getnotifications'){_.show_notification()}

			}else{return true}
			}else{_.notice("We better wait for this page to load first...",true);
			} /* end loading check */

			return false;
		});

			/* put the jigsaw together*/
			wrapper.append(nav);
			bar.append(wrapper);
			
			/* add to page */
			b.append(bar);
			bar.removeClass('loading');

			/* for developers */
			_.notice("ShopifyFD loaded");
			Batman.DOM.Modal.hide();
			_.init();

		}else{
			alert('Error. This should be run within the Shopify Admin page.');
		}

	}else{
		_.notice("Error. ShopifyFD already loaded!",true);
	}
}else{
	alert('Error. jQuery not found.')
}
}}());