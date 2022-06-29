// ==UserScript==
// @name     Robot Reboot Hotkeys
// @version  1
// @grant    none
// @include  http://www.robotreboot.com/challenge
// ==/UserScript==

// https://stackoverflow.com/questions/6157929/how-to-simulate-a-mouse-click-using-javascript
function simulate(element, eventName)
{
    var options = extend(defaultOptions, arguments[2] || {});
    var oEvent, eventType = null;

    for (var name in eventMatchers)
    {
        if (eventMatchers[name].test(eventName)) { eventType = name; break; }
    }

    if (!eventType)
        throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

    if (document.createEvent)
    {
        oEvent = document.createEvent(eventType);
        if (eventType == 'HTMLEvents')
        {
            oEvent.initEvent(eventName, options.bubbles, options.cancelable);
        }
        else
        {
            oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
            options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
            options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
        }
        element.dispatchEvent(oEvent);
    }
    else
    {
        options.clientX = options.pointerX;
        options.clientY = options.pointerY;
        var evt = document.createEventObject();
        oEvent = extend(evt, options);
        element.fireEvent('on' + eventName, oEvent);
    }
    return element;
}

function extend(destination, source) {
    for (var property in source)
      destination[property] = source[property];
    return destination;
}

var eventMatchers = {
    'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
    'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
}
var defaultOptions = {
    pointerX: 0,
    pointerY: 0,
    button: 0,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    bubbles: true,
    cancelable: true
}

records = document.getElementsByClassName('flex-box robots-container flex-wrap')[0].getElementsByClassName('record')

document.addEventListener('keydown', (e) => {
  if (e.code === "Digit1") simulate(records[0], "click")
  else if (e.code === "Digit2") simulate(records[1], "click")
  else if (e.code === "Digit3") simulate(records[2], "click")
  else if (e.code === "Digit4") simulate(records[3], "click")
  else if (e.code === "Digit5") simulate(records[4], "click")
  else if (e.code === "Escape") simulate(document.getElementsByClassName("redo fa fa-refresh")[0], "click")
});