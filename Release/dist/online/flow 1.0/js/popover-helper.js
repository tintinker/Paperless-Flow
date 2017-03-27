$.fn.extend({
  initPopover: function(indexAC, indexNC, indexAR, response, speech) {
    $(this).popover({
      title: "Response From Blocks",
      content: response,
      trigger: 'manual',
      template: '<div class="popover" role="tooltip"><div class="pop-head"><div class="popover-arrow"></div><div class="text-right"><button class="btn" onclick="closePopup(event)">&times;</button></div></div><div class="popover-content"></div></div>'
    });
  }
});
function closePopup(event) {
  $(event.target).closest('.row').find('[data-toggle="popover"]').popover('hide');
}
function addBlockResponse(indexAC, indexNC, indexAR, response, speech) {
  if(speech == 1)
    angular.element($(document.body)).scope().addNcArg(response, indexAC);
  if(speech == 2)
    angular.element($(document.body)).scope().addArArg(response, indexAC, indexNC);
  if(speech == 3)
    angular.element($(document.body)).scope().addNrArg(response, indexAC, indexNC, indexAR);
  closePopup(indexAC, indexNC, indexAR, speech);
}
