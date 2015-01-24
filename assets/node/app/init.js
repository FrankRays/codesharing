function setEditor() {
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    $('#editor').data('editor', editor);
    editor.setOptions({
        enableEmmet: true,
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
    });
    editor.setReadOnly(true);
}

function buildingTree(a,b) {
    if (!a) a = root;
    if (!b) b = 'tree-view'
    client.emit('scan', {actor : name, dir : a, target: b});
};

function treeClick(a) {
    if ($(a.target).parent().hasClass('directory')) {
        if ($(a.target).parent().hasClass('collapsed')) {
            $(a.target).parent().find('UL').remove();
            buildingTree($(a.target).attr('rel'),$(a.target).parent().attr('id'))
            $(a.target).parent().removeClass('collapsed').addClass('expanded');
        } else {
            $(a.target).parent().find('UL').slideUp();
            $(a.target).parent().removeClass('expanded').addClass('collapsed');
        };
    } else {
        file.open(a);
    };
}

function buildTree(a) {
    $('#'+a.target).find('UL').remove();
    show = '<ul class="treeview">';
    for(i in a.data.folder) show += '<li class="directory collapsed" id="dir'+a.data.folder[i].id+'"><a rel="' + a.data.folder[i].rel  + '/" id="' + a.data.folder[i].id  + '">' + a.data.folder[i].name + '</a></li>';  
    for(i in a.data.file) show += '<li class="file ext_' + a.data.file[i].e + '"><a rel="'+ a.data.file[i].rel + '" id="'+ a.data.file[i].id + '">' + a.data.file[i].name + '</a></li>';  
    show += '</ul>';
    $('#'+a.target).append(show).slideDown();
};