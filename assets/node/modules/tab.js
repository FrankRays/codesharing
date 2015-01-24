var Tab = (function() {
    function Tab() {};
    Tab.prototype.open = function(a, b, c) {
        if (!tab.check(a)) {
            var data = {
                dataid: a,
                tabid: 'tab' + a,
                name: b,
                path: c,
                data: ""
            }
            tabs.push(data);
            if (b.length > 15) {
                e = b.split('.').pop();
                b = b.slice(0, 10) + ('...') + e;
            };
            $('#tabContainer').append('<tab class="tab" id="tab' + a + '" data-path="' + c + '"><label class="tabname" id="labeltab' + a + '">' + b 
            	+ '</label><div class="tabclose" id="closetab' + a + '"></div></tab>');
            tab.active('tab' + a);
        } else {
            tab.active('tab' + a);
        }
    };
    Tab.prototype.check = function(e) {
        for (i in tabs) if (tabs[i].tabid == 'tab' + e) return true
        return false
    };
    Tab.prototype.setData = function(a, b) {
        if (a) {
            for (i in tabs) if (tabs[i].tabid == a) tabs[i].data = b
        } else {
            for (i in tabs) if (tabs[i].path == path) tabs[i].data = b
        }
    };
    Tab.prototype.rmData = function(a, b) {
        for (i in tabs) {
            if (tabs[i].tabid == a) {
                tabs.splice(i, 1);
                if (b) {
                    if (tabs.length >= 1) {
                        if (tabs[i] != undefined) {
                            $('#' + tabs[i].tabid).addClass('tabActive');
                            path = tabs[i].path;
                            editor.setValue(tabs[i].data)
                        }else{
                        	$('#' + tabs[i-1].tabid).addClass('tabActive');
                            path = tabs[i-1].path;
                            editor.setValue(tabs[i-1].data)
                        }
                    } else {
                    	tab.rmBreadcum();
                    	editor.setValue();
                    	editor.setReadOnly(true);
                    }
                }
            }
        }
    };
    Tab.prototype.getData = function(a) {
        for (i in tabs) if (tabs[i].tabid == a) editor.setValue(tabs[i].data)
    };
    Tab.prototype.active = function(a) {
    	editor.setReadOnly(false);
        for (i in tabs) {
            if (tabs[i].tabid == a) {
                $('#' + tabs[i].tabid).addClass('tabActive');
                path = tabs[i].path;
                tab.setBreadcum();
            } else {
                $('#' + tabs[i].tabid).removeClass('tabActive');
            }
        }
    };
    Tab.prototype.close = function(e) {
        var target = $('#' + e);
        if (target.hasClass('tabActive')) {
            tab.rmData(e, true);
        } else {
            tab.rmData(e);
        };
        target.remove();
    };
    Tab.prototype.renamefile = function(a,b,c,d) {
    	for(i in tabs) {
    		if (tabs[i].dataid == a) {
    			tabs[i].dataid = b;
    			tabs[i].name = c;
    			tab.renamefile.path(i,c);
    			tab.renamefile.id(i,b);
    		}
    	}
    };
	Tab.prototype.renamefile.path = function(a,b) {
		var ee = tabs[a].path.split('/');
	    ee.pop()
	    ee.push(b)
	    tabs[a].path = ee.join('/');
    };
	Tab.prototype.renamefile.id = function(a,b) {
		var oldid = tabs[a].tabid;
		tabs[a].tabid = 'tab'+b;
		$('#'+oldid).attr('id', tabs[a].tabid);
		$('#label'+oldid).attr('id', 'label'+tabs[a].tabid);
		$('#close'+oldid).attr('id', 'close'+tabs[a].tabid);
		tab.renamefile.label(tabs[a].tabid,tabs[a].name);
		if ($('#'+tabs[a].tabid).hasClass('tabActive')) {
			path = tabs[a].path;
			tab.setBreadcum();
		};
    };
	Tab.prototype.renamefile.label = function(a,b) {
		if (b.length > 15) {var e = b.split('.').pop();b = b.slice(0, 10);$('#label'+a).text(b+'...'+e);
		}else{ $('#label'+a).text(b);}
    };

    Tab.prototype.renamefolder = function(a) {
    	for(i in tabs){
            var p = tabs[i].path.split('/'),q = a.old.split('/').length ,r = p.splice(0,q), s = p.splice(q,p.length)
            if(r.join('/') == a.old) {
                tabs[i].path = a.rel+'/'+s.join('/')
            }
        }
    };

    Tab.prototype.setBreadcum = function() {
    	var vhost = 'vhost/'+ path.split('/').splice(root.split('/').length-1,path.split('/').length-1).join('/');
    	$('#breadcum').text(vhost);
    };

    Tab.prototype.rmBreadcum = function() {
    	$('#breadcum').text('');
    };
    return Tab;
})()