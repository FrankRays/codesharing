$(function() {
    $('#editor').on('keyup', function() {
        data = editor.getValue();
        file.update(data);
        console.log(data);
        tab.setData('', data, path);
    })
    $('#tree-view').on('mousedown', function(e) {
        if (rc.check(e)) {
            if (e.target.id == 'tree-view') {
                rc.root(e);
            } else {
                if ($(e.target).parent().hasClass("directory")) {
                    rc.folder(e);
                } else {
                    rc.file(e);
                };
            };
        } else {
            if (e.target.id != 'tree-view') {
                if (e.target.rel) {
                    treeClick(e);
                }
            };
        }
    })
    $('#tabContainer').on('mousedown', function(e) {
        if (e.target.parentElement.id != 'tabContainer') {
            if (e.target.id[0] == 'c') {
                tab.close(e.target.parentElement.id);
            } else {
                tab.active(e.target.parentElement.id);
                tab.getData(e.target.parentElement.id);
            }
        }
    })
    $('#inputName').on('keyup', function(e) {
        if (e.which == 27) {
            $('#inputNameContainer').removeClass('show');
        };
        if (e.which == 13) {
            $('#inputNameContainer').removeClass('show');
            var newName = $('#inputName').val();
            var target = $('#inputName').attr('data-target');
            var datapath = $('#inputName').attr('data-path');
            var method = $('#inputName').attr('data-method');
            var parent = $('#inputName').attr('parent-path');
            var parentid = $('#inputName').attr('parent-id');
            if (method == 'new-file') file.new(datapath, newName, target)
            if (method == 'new-folder') folder.new(datapath, newName, target)
            if (method == 'rename-file') file.rename(parent, newName, target, parentid)
            if (method == 'rename-folder') folder.rename(parent, newName, target, parentid)
        }
    })
    $('#nRootFile').on('click', function() {
        rc.input('tree-view', root, "", 'new-file', "", "", 'Name :');
    })
    $('#nRootFolder').on('click', function() {
        rc.input('tree-view', root, "", 'new-folder', "", "", 'Name :');
    })
    $('#nFile').on('click', function() {
        var data_path = $('#dirRightClick').attr('data-path');
        var target = $('#dirRightClick').attr('data-id');
        rc.input('dir' + target, data_path, "", 'new-file', "", "", 'Name :');
    })
    $('#rFile').on('click', function() {
        var parent_path = $('#fileRightClick').attr('parent-path');
        var parentid = $('#fileRightClick').attr('parent-id');
        var target = $('#fileRightClick').attr('data-id');
        var oldname = $("#" + target).text();
        rc.input(target, "", parent_path, 'rename-file', parentid, oldname, 'New Name :');
    })
    $('#dFile').on('click', function() {
        rc.clear();
        if (confirmDel()) {
            var data_path = $('#fileRightClick').attr('data-path')
            var target = $('#fileRightClick').attr('data-id');
            file.delete(data_path, target);
        };
    })
    $('#nFolder').on('click', function() {
        var data_path = $('#dirRightClick').attr('data-path');
        var target = $('#dirRightClick').attr('data-id');
        rc.input('dir' + target, data_path, "", 'new-folder', "", "", 'Name :');
    })
    $('#rFolder').on('click', function() {
        var parent_path = $('#dirRightClick').attr('parent-path');
        var target = $('#dirRightClick').attr('data-id');
        var oldname = $("#" + target).text();
        rc.input(target, "", parent_path, 'rename-folder', "", oldname, 'New Name :');
        hemb = [parent_path, target, oldname]
    })
    $('#dFolder').on('click', function() {
        rc.clear();
        if (confirmDel()) {
            var data_path = $('#dirRightClick').attr('data-path')
            var target = $('#dirRightClick').attr('data-id');
            folder.delete(data_path, target);
        };
    })
})