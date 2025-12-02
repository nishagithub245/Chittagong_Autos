$(document).ready(function(){

    // Enable Post button only if name and comment exist
    $('#name, #comment').on('input', function(){
        let name = $('#name').val().trim(); 
        let comment = $('#comment').val().trim(); 
        $('#post').prop('disabled', !(name && comment));
    });

    // Click handler for dynamically added Reply links
    $(document).on('click', '.reply-link', function(e){
        e.preventDefault();
        let commenter = $(this).data('commenter');
        let id = $(this).data('id');

        $('#replyto').val(id); // mark as reply to this comment

        let current = $('#comment').val();
        $('#comment').val(current + '@' + commenter + ' ').focus();
    });

    // Helper: calculate padding for nested replies
    function getPadding(level) {
        return 15 * level; // pixels
    }

    // Post comment or reply
    $('#post').click(function(){
        let name = $('#name').val().trim();
        let comment = $('#comment').val().trim();
        let replyto = $('#replyto').val();
        if(!replyto || replyto === "") replyto = 0;

        $.post("save_comments.php", {
            name: name,
            comment: comment,
            replyto: replyto
        }, function(data){
            let row = JSON.parse(data);
            let no = row.commentnumber;
            let parent = row.replyto;
            let time = row.commenttime;

            // Determine indentation level
            let level = 0;
            if(parent != 0){
                let parentRow = $(`#comment-body tr[data-id='${parent}']`);
                let parentPadding = parseInt(parentRow.find('td:eq(3)').css('padding-left')) || 0;
                level = Math.floor(parentPadding / 15) + 1;
            }

            // Build new table row
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
                // top-level comment → append to tbody
                $('#comment-body').append(newRow);
            } else {
                // reply → insert under parent
                let parentRow = $(`#comment-body tr[data-id='${parent}']`);
                let lastChild = parentRow;
                parentRow.nextAll('tr').each(function(){
                    let rowParent = parseInt($(this).data('parent'));
                    if(rowParent == 0 || rowParent != parent) return false;
                    lastChild = $(this);
                });
                $(newRow).insertAfter(lastChild);
            }

            // Reset form for next comment
            $('#name, #comment').val('');
            $('#replyto').val('0'); // default top-level for next comment
            $('#post').prop('disabled', true);

        }).fail(function(){
            alert("ERROR: save_comments.php not found or server issue!");
        });
    });

});
