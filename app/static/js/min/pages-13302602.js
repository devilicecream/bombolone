var b = b || {};
b.pages = {
    init: function() {
    },
    init_language : function(){
	    t.get('ul.dropdown-menu li').on('click', function(e) {
	        console.log('ciao')
	        var li_press = e.currentTarget;
            var code = li_press.className.split('_')[0];
            
            console.log('ciao')
            
            for (var i = 12; i--;) {
	            var lan = pages.list_languages[i];
	            t.get('.h3_'+lan).css({ 'display' : 'none' });
                t.get('.section_'+lan).css({ 'display' : 'none' });
                t.get('li.'+lan+'_lan').attr('class' , lan+'_lan' );
            }
            
            t.get('.h3_'+code).css({ 'display' : 'block' });
            t.get('.section_'+code).css({ 'display' : 'block' });
            t.get('.list_language').css({ 'display' : 'none' });
            t.get('li.'+code+'_lan').attr('class' , code+'_lan active' );
            var val = t.get('li.'+code+'_lan').html();
            t.get('.list_language_button').html(val);
            
	    });
	},
	number_of_label : 0,
	list_languages : ['ar','cn','de','en','es','fr','gr','it','jp','pt','ru','tr'],
	init_change_label : function(){
	    
	    var len = t.get('.label_form').length / 12;
	    
	    for (var i = len; i--;){
	        this.add_on_change(i);
	    }
	    
	    this.number_of_label = len - 1;
	    
	},
	init_add_label : function(){
	    
	    t.get('.pages_add_label').on('click', function(e){
	        b.pages.number_of_label += 1; 
	        t.ajax({
	            'url' : '/admin/pages/add_label/'+b.pages.number_of_label+'/',
	            'success' : function(data){
	                for (var i = 1; i<=12; i++){
	                    t.get('.pages_'+b.pages.list_languages[i]).before(data.split('__Bombolone__')[i])         		        
        		    }
	                b.pages.add_on_change(b.pages.number_of_label);
	                b.pages.init_remove_label();
	                b.pages.init_change_name_label();
	            }
	        });		            
	    });
	    
	},
	init_remove_label : function(){
	    
	    t.get('.pages_remove_label').on('click', function(e){
            var button_click = e.currentTarget.value;
            var num_label = t.get(this).attr('id');
            t.get('.section_num_'+num_label).destroy() 
        });
	    
	},
	init_change_name_label : function(){
	    
	    t.get('.name_label').on('keyup', function(e){
            var label_press = e.currentTarget
            var label_value = label_press.value
            var label_num = label_press.className.split('_')[4]
            t.get('.label_en_name_'+label_num).value(label_value);
            t.get('.label_it_name_'+label_num).value(label_value);
        });
	    
	},
	add_on_change : function(i) {
	    
	    t.get('.label_'+i+'_0').on('change', function(e){
            var chosen = e.currentTarget.value;
            var chosen_num = e.currentTarget.name.split('_')[2];
            t.get('.label_'+chosen_num+'_1').css({ 'display' : 'none' });
            t.get('.label_'+chosen_num+'_2').css({ 'display' : 'none' });
            t.get('.label_'+chosen_num+'_3').css({ 'display' : 'none' });
            t.get('.label_'+chosen_num+'_'+chosen).css({ 'display' : 'inline' });
            t.get('.label_'+i+'_0').value(chosen)
        });
        
	},
    init_remove: function() {

        t.get('.remove_item').on('click', function(e) {
            var chosen = e.currentTarget.value;
            var item_id = e.currentTarget.className.split('_')[2];
            b.admin.check_remove( item_id, 'pages' );
        });

    }
}