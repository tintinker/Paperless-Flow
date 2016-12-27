$.fn.extend({
  initPopover: function(indexAC, indexNC, indexAR, response, speech) {
    $(this).popover({
      title: "Response From Blocks",
      content: response,
      trigger: 'manual',
      template: '<div class="popover"  role="tooltip"><div class="popover-arrow"></div><div class="pop-head"><div class="popover-content"></div><button onclick="addBlockResponse('+indexAC+','+indexNC+','+indexAR+',\''+response+'\','+speech+')" class="btn btn-success">Add</button>&nbsp;<button class="btn" onclick="closePopup('+indexAC+','+indexNC+','+indexAR+','+speech+')">&times;</button></div></div>'
    });
  }
});
function closePopup(indexAC, indexNC, indexAR, speech) {
  if(speech == 1)
    angular.element($(document.body)).scope().toCloseACPopovers[indexAC].popover('hide');
  else if(speech == 2)
    angular.element($(document.body)).scope().toCloseNCPopovers[indexNC].popover('hide');
  else if(speech == 3)
    angular.element($(document.body)).scope().toCloseARPopovers[indexAR].popover('hide');
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
