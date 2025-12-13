$(document).ready(function(){

    // Enable Post button only if name and comment exist
    $('#name, #comment').on('input', function(){
        let name = $('#name').val().trim(); 
        let comment = $('#comment').val().trim(); 
        $('#post').prop('disabled', !(name && comment));
    });

    // Handle reply clicks dynamically
    $(document).on('click', '.reply-link', function(e){
        e.preventDefault();
        let commenter = $(this).data('commenter');
        let id = $(this).data('id');

        $('#replyto').val(id); // mark as reply
        let current = $('#comment').val();
        $('#comment').val(current + '@' + commenter + ' ').focus();
    });

    // Helper for indentation
    function getPadding(level) {
        return 15 * level;
    }

    // Function to count rows in a thread
    function countThreadRows(rootId){
        let count = 1; // include root
        $(`#comment-body tr[data-id='${rootId}']`).nextAll().each(function(){
            let parent = $(this).data('parent');
            if(parent == rootId) count++;
            else if(parent == 0) return false; // stop at next top-level
        });
        return count;
    }

    // Function to reposition thread based on number of entries
    function repositionThread(rootId){
        let rootRow = $(`#comment-body tr[data-id='${rootId}']`);
        let threadCount = countThreadRows(rootId);

        let topRows = $('#comment-body tr[data-parent="0"]');
        let inserted = false;

        topRows.each(function(){
            let id = $(this).data('id');
            if(id == rootId) return true; // skip self

            let otherCount = countThreadRows(id);
            if(threadCount > otherCount){
                $(rootRow).nextAll().each(function(){
                    if($(this).data('parent') != rootId) return false;
                    rootRow = $(this);
                });
                $(rootRow).insertBefore($(this));
                inserted = true;
                return false; // break loop
            }
        });
        if(!inserted){
            let lastRow = $('#comment-body tr[data-parent="0"]').last();
            $(rootRow).nextAll().each(function(){
                if($(this).data('parent') != rootId) return false;
                rootRow = $(this);
            });
            $(rootRow).insertAfter(lastRow);
        }
    }

    // Post comment/reply
    $('#post').click(function(e){
        e.preventDefault();

        let name = $('#name').val().trim();
        let comment = $('#comment').val().trim();
        let replyto = $('#replyto').val() || 0;

        $.post("save_comments.php", { name, comment, replyto }, function(data){
            let row = JSON.parse(data);
            let no = row.commentnumber;
            let parent = row.replyto;
            let time = row.commenttime;

            // Determine nesting level
            let level = 0;
            if(parent != 0){
                let parentRow = $(`#comment-body tr[data-id='${parent}']`);
                let parentPadding = parseInt(parentRow.find('td:eq(3)').css('padding-left')) || 0;
                level = Math.floor(parentPadding / 15) + 1;
            }

            // Build table row
            let newRow = `
                <tr class="comment-row" data-id="${no}" data-parent="${parent}">
                    <td>${no}</td>
                    <td>${row.commenter}</td>
                    <td>${time}</td>
                    <td style="padding-left: ${getPadding(level)}px">${row.comment}</td>
                    <td><a href="#" class="reply-link" data-id="${no}" data-commenter="${row.commenter}">[Reply]</a></td>
                </tr>
            `;

            // Insert new row
            if(parent == 0){
                $('#comment-body').append(newRow); // top-level comment
            } else {
                let parentRow = $(`#comment-body tr[data-id='${parent}']`);
                let lastChild = parentRow;
                parentRow.nextAll('tr').each(function(){
                    let rowParent = parseInt($(this).data('parent'));
                    if(rowParent == 0 || rowParent != parent) return false;
                    lastChild = $(this);
                });
                $(newRow).insertAfter(lastChild);

                // Reposition parent thread if needed
                repositionThread(parent);
            }

            // Reset form
            $('#name, #comment').val('');
            $('#replyto').val('0');
            $('#post').prop('disabled', true);

        }).fail(function(){
            alert("ERROR: Could not save comment. Check save_comments.php.");
        });
    });

});
