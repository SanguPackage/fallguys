$(function() {
    $('.flybywrapper .flyby-btn, .flybywrapper flyby').click(function() {
        $('.flybywrapper').hide();
        $('.flyby-movie').show();
    });


    $('.level-detail .btn-group > button').click(function() {
        var self = $(this);

        // Button coloring & panel hiding/showing
        var allButtons = $('button', self.parent());
        allButtons.each(function() {
            $(this).removeClass('btn-secondary').addClass('btn-light');

            var id = $(this).data('id');
            $('.' + id).addClass('d-none');
        });

        var id = self.data('id');
        $('.' + id).removeClass('d-none');
        self.addClass('btn-secondary').removeClass('btn-light');

        // Save hash for page load restore
        history.pushState({}, '', '#' + self.data('id'));
    });

    $('#search').keyup(function() {
        // filtering: used in crown level rewards & levels
        var needle = $(this).val().toLowerCase();
        var rows = $('table.table tbody tr');

        if (needle === '') {
            rows.each(function() {
                $(this).show();
            });
            return;
        }

        rows.each(function() {
            var row = $(this);
            if (row.text().toLowerCase().includes(needle)) {
                row.show();
            } else {
                row.hide();
            }
        });
    });

    // Restore hash at page load
    var hash = document.location.hash;
    if (hash) {
        var button = $('.level-detail .btn-group > button[data-id="' + hash.slice(1) + '"]');
        if (button.length === 1) {
            button.click();
        }
    }
});
