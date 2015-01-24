var RightClick = (function() {
    function RightClick() {};
    RightClick.prototype.check = function(e) {
        rc.clear();
        if (e.which == 3) {
            return true;
        }
        return false;
    };
    RightClick.prototype.clear = function() {
        $('#dirRightClick').removeClass('show');
        $('#fileRightClick').removeClass('show');
        $('#rootRightClick').removeClass('show');
    };
    RightClick.prototype.input = function(a, b, c, d, e, f,g) {
        rc.clear();
        $('#inputNameContainer').addClass('show');
        $('#inputName').attr({
            'data-target': a,
            'data-path'  : b,
            'parent-path': c,
            'data-method': d,
            'parent-id'  : e,
        })
        $('#inputName').val(f);
        $('#inputName').focus();
        $('#inputNameLabel').text(g);
    };
    RightClick.prototype.folder = function(e) {
        rc.clear();
        var parent = e.target.rel.split('/');
        parent.pop();parent.pop();
        parent = parent.join('/');
        $('#dirRightClick').addClass('show');
        $('#dirRightClick').attr({
            "style": "left:" + e.clientX + "px;top:" + e.clientY + "px;",
            "data-path": e.target.rel,
            "data-id": e.target.id,
            "parent-path" : parent,
            "parent-id" : e.target.parentElement.parentElement.parentElement.id
        });
    };
    RightClick.prototype.file = function(e) {
        rc.clear();
        var parent = e.target.rel.split('/');
        parent.pop();
        parent = parent.join('/');
        $('#fileRightClick').addClass('show');
        $('#fileRightClick').attr({
            "style": "left:" + e.clientX + "px;top:" + e.clientY + "px;",
            "data-path": e.target.rel,
            "data-id": e.target.id,
            "parent-path" : parent,
            "parent-id" : e.target.parentElement.parentElement.parentElement.id
        });
    };

    RightClick.prototype.root = function(e) {
        rc.clear();
        $('#rootRightClick').addClass('show');
        $('#rootRightClick').attr({
            "style": "left:" + e.clientX + "px;top:" + e.clientY + "px;",
            "data-path": e.target.rel,
            "data-id": e.target.id
        });
    };
    return RightClick;
})();