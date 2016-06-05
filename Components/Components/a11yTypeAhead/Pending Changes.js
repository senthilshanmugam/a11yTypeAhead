scope.states = USStates-- > scope.suggestios

id="ta-item{{$index}}" -> to include the ctrlid as well -> id="{{a11yUid}}-item-{{$index}}"

var val = scope.taEdit.val();  -> var searchString = scope.taEdit.val();

textBoxKeyDown -> $timeout(function () { scope.taEdit.focus(); }, 500); -> 500 changed to 5

add animation and nicescroll

Removed listbox blur, textBoxKeyPress

fast typing replaces the text

DONE - tabbing, click, enter - event fires for not changed item.  On tab,click,enter only when new item then trigger onselect event.  
this done for alt up/down. same fix for tab, click, enter

check to write function for
scope.taOptions.removeClass('selected');
    currentItem.addClass('selected');