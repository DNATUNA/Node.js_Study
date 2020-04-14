function textReset(target) {
  target.focus(function() {
      if($(this).val() == $(this).attr('value')) {
         $(this).val('');
      }
   })
   .blur(function() {
      if($(this).val().length == 0) {
         $(this).val($(this).attr('value'));
      }
   });
}
