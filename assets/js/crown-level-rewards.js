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
                if (row.hasClass(type)) {
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
                $('table.crown-rewards tbody tr.' + type).hide();

                // None selected == show all
                var nonSelected = $('.crown-rewards-filters button.btn-primary').length === 0;
                if (nonSelected) {
                    $('table.crown-rewards tbody tr').each(function() { $(this).show(); });
                    firstFilter = true;
                }
            } else {
                btn.removeClass('btn-light');
                btn.addClass('btn-primary');
                $('table.crown-rewards tbody tr.' + type).show();
            }
        }
    });


    var startLevel = document.location.hash;
    if (startLevel) {
        $('.level-' + startLevel.slice(1)).addClass('table-primary');
    }
});
