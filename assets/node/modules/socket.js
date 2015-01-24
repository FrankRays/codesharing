$(function() {
    client.on('open', function(a) {
        if (confirmActor(a.name)) {
            if (confirmPath(a.path)) {
                var e = a.path.split('.').pop();
                var target = a.path.replace(/\.|\/|\ |\-/g, '');
                var mode = 'plain';
                var modes = ['coffe', 'css', 'html', 'js', 'json', 'less', 'php', 'sql', 'ts', 'ejs'];
                for (i in modes) {
                    if (e == modes[i]) mode = modes[i]
                }
                if (mode == 'js' || 'ejs') mode = 'javascript';
                if (mode == 'sql') mode = 'mysql';
                editor.session.setMode("ace/mode/" + mode);
                editor.setValue(a.data);
                tab.setData('tab' + target, a.data);
            };
        };
    })
    client.on('update', function(a) {
        if (!confirmActor(a.name)) {
            if (confirmPath(a.path)) {
                editor.setValue(a.data);
            };
        };
        tab.setData('', a.data, a.path);
    })
    client.on('renameFile', function(a) {
        $('#' + a.target).text(a.newname);
        $('#' + a.target).attr({
            'rel': a.rel,
            'id': a.rel.replace(/\.|\/|\ |\-/g, '')
        });
    })
    client.on('deleteFile', function(a) {
        $('#' + a.target).remove();
    })
    client.on('newFile', function(a) {
        if ($('#' + a.target).hasClass('expanded')) buildingTree(a.path, a.target)
    })
    client.on('newFolder', function(a) {
        if ($('#' + a.target).hasClass('expanded')) buildingTree(a.path, a.target)
    })
    client.on('deleteFolder', function(a) {
        $('#' + a.target).remove();
    })
    client.on('renameFolder', function(a) {
        $('#RFI').hide()
        $('#dir' + a.target).attr('id', 'dir' + a.rel.replace(/\.|\/|\ |\-/g, ''));
        $('#' + a.target).text(a.newname);
        $('#' + a.target).attr({
            'rel': a.rel + '/',
            'id': a.rel.replace(/\.|\/|\ |\-/g, '')
        });
        if ($('#dir' + a.rel.replace(/\.|\/|\ |\-/g, '')).hasClass('expanded')) {
            buildingTree(a.rel + '/', $('#dir' + a.rel.replace(/\.|\/|\ |\-/g, '')).attr('id'));
        };
        tab.renamefolder(a);
    })
    client.on('renameFolderInit', function() {
        $('#RFI').show()
    })
    client.on('scan', function(a) {
        buildTree(a);
    })
})