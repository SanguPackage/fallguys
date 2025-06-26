$(function() {
    var firstFilter = true;

    $('.crown-rewards-filters button').click(function() {
        var btn = $(this);
        var type = btn.data('type');

        if (firstFilter) {
            // First time filtering: only show those types
            firstFilter = false;

            $('table.crown-rewards tbody tr').each(function() {
                var row = $(this);
                if ((type !== 'other' && row.hasClass(type))
                    || (type === 'other' && (row.hasClass('faceplate') || row.hasClass('phrase') || row.hasClass('emoticon')))) {
                    row.show();
                } else {
                    row.hide();
                }
            });

            btn.removeClass('btn-light');
            btn.addClass('btn-primary');
        } else {
            // Subsequent filtering, toggle the type on/off
            var isVisible = btn.hasClass('btn-primary');
            if (isVisible) {
                btn.removeClass('btn-primary');
                btn.addClass('btn-light');
                if (type !== 'other') {
                    $('table.crown-rewards tbody tr.' + type).hide();
                } else {
                    $('table.crown-rewards tbody tr.faceplate').hide();
                    $('table.crown-rewards tbody tr.phrase').hide();
                    $('table.crown-rewards tbody tr.emoticon').hide();
                }

                // None selected == show all
                var nonSelected = $('.crown-rewards-filters button.btn-primary').length === 0;
                if (nonSelected) {
                    $('table.crown-rewards tbody tr').each(function() { $(this).show(); });
                    firstFilter = true;
                }
            } else {
                btn.removeClass('btn-light');
                btn.addClass('btn-primary');
                if (type !== 'other') {
                    $('table.crown-rewards tbody tr.' + type).show();
                } else {
                    $('table.crown-rewards tbody tr.faceplate').show();
                    $('table.crown-rewards tbody tr.phrase').show();
                    $('table.crown-rewards tbody tr.emoticon').show();
                }
            }
        }
    });


    // Color row based on hash on page load
    var startLevel = document.location.hash;
    if (startLevel) {
        $('.level-' + startLevel.slice(1)).addClass('table-primary');
    }
});
