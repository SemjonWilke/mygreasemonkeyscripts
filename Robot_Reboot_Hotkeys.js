// ==UserScript==
// @name     Robot Reboot Hotkeys
// @version  1
// @grant    none
// @include  http://www.robotreboot.com/challenge
// ==/UserScript==

// https://stackoverflow.com/questions/6157929/how-to-simulate-a-mouse-click-using-javascript
function simulate(element, eventName) {
    var options = extend(defaultOptions, arguments[2] || {});
    var oEvent, eventType = null;

    for (var name in eventMatchers) {
        if (eventMatchers[name].test(eventName)) { eventType = name; break; }
    }

    if (!eventType) throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

    if (document.createEvent) {
        oEvent = document.createEvent(eventType);
        if (eventType == 'HTMLEvents') {
            oEvent.initEvent(eventName, options.bubbles, options.cancelable);
        }
        else {
            oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
            options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
            options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
        }
        element.dispatchEvent(oEvent);
    }
    else {
        options.clientX = options.pointerX;
        options.clientY = options.pointerY;
        var evt = document.createEventObject();
        oEvent = extend(evt, options);
        element.fireEvent('on' + eventName, oEvent);
    }
    return element;
}

function extend(destination, source) {
    for (var property in source) destination[property] = source[property];
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

playmode = document.getElementsByClassName('play-mode')
playmode[0].style.display="flex"
playmode[0].firstChild.style.margin="auto"

window.addEventListener('load', function() {
    records = document.getElementsByClassName('flex-box robots-container flex-wrap')[0].getElementsByClassName('record')
    robots = document.getElementsByClassName('robot')
    reset = document.getElementsByClassName("redo fa fa-refresh")[0]

    robots[0].style.textAlign="center";
  	robots[0].innerHTML="A";
    robots[1].style.textAlign="center";
  	robots[1].innerHTML="S";
    robots[2].style.textAlign="center";
  	robots[2].innerHTML="D";
    robots[3].style.textAlign="center";
  	robots[3].innerHTML="W";

    document.addEventListener('keydown', (e) => {
        if (e.code === "Digit1") simulate(records[0], "click")
        else if (e.code === "Digit2") simulate(records[1], "click")
        else if (e.code === "Digit3") simulate(records[2], "click")
        else if (e.code === "Digit4") simulate(records[3], "click")
        else if (e.code === "Digit5") simulate(records[4], "click")
        else if (e.code === "Escape") simulate(reset, "click")
        else if (e.code === "KeyA") simulate(robots[0], "click")
        else if (e.code === "KeyS") simulate(robots[1], "click")
        else if (e.code === "KeyD") simulate(robots[2], "click")
        else if (e.code === "KeyW") simulate(robots[3], "click")
    });

    for (var i = 0; i < 5; i++) {
        var newdiv = document.createElement("div")    
        newdiv.Class = "recordnumber"
        newdiv.innerHTML = "<center>"+(i+1)+"</center>"
        records[i].appendChild(newdiv)
    }

  	setTimeout(() => {
      document.getElementById("rufous-sandbox").remove();
  		document.querySelector('[title="Twitter settings iframe"]').remove()

			var iframe = document.createElement("iframe");
      iframe.src = "http://www.robotreboot.com/highscore";
      iframe.width = document.body.offsetWidth;
      iframe.height = window.innerHeight - document.body.offsetHeight;
      document.body.appendChild(iframe);
      document.getElementById("footer").remove()


			iframe.addEventListener('load', () => {
        iframedoc = iframe.contentWindow.document
        iframedoc.getElementsByClassName("content-container")[0].style.paddingTop = "0px";
        console.log(iframedoc.getElementsByClassName("nav-container"))
        iframedoc.getElementsByClassName("nav-container")[0].remove()
        iframedoc.getElementById("rufous-sandbox").remove()
        iframedoc.querySelector('[title="Twitter settings iframe"]').remove()
        iframedoc.getElementById("fb_reset").remove()
      }, true)
      //navBar.parentNode.removeChild(navBar);
    }, 1000);

}, false);
