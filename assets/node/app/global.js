$(function() {
    setEditor();
    buildingTree();
    $(document).contextmenu(false);
})

function confirmDel() {
    if (confirm('Are you sure to delete this')) {
        return true;
    };
    return false;
}

function confirmActor(a) {
    if (name == a) {
        return true;
    };
    return false;
};

function confirmPath(a) {
    if (path == a) {
        return true;
    };
    return false;
}