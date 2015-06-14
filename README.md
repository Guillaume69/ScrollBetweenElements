# ScrollBetweenElements
a jquery animate overlay that makes you scroll between HTML elements smoothly and without scrollbar, it allows you to translate elements into your div parents aswell.

## Some things to know before using it

- As mentionned before, you need jQuery to use ScrollBetweenElemens, so don't forget to link jQuery before this plugin.
- If you need multi browser support for this plugin, i recommand you to use [jquery-mousewheel](https://github.com/jquery/jquery-mousewheel) which is awesome. Link it before ScrollBetweenElements aswell.
- For more awesomeness, i'm using jqueryUI for for its cool easing. So i recommand you to link it to be able to use more easing in ScrollBetweenElements(link it before ScrollBetweenElements of course)

## How to use it

``` javascript
ScrollBetweenElements.init(Duration, Easing, IsScrollBarHidden, HeightCorrection);
```

**-Duration** : Time between each scrolls (in millisecond)<br />
**-Easin** : Name of the easing<br />
**-isScrollbarHidden** : Do i hide the scrollbar for you or not ? (true or false)<br />
**-HeightCorrection**  : Correction in pixel of the height value of the scroll. For example if you have a navbar (an example is shown further)<br />

### Prototype of the available functions
	
### Basic Example

``` html
<body>
    <div id="div1">
    </div>
    <div id="div2">
    </div>
    <div id="div3">
    </div>
    <div id="div4">
    </div>
</body>
```
``` javascript
$(document).ready(function(){
    $('body,html').animate({ scrollTop: 0 }, 500);
    ScrollBetweenElements.init(400, "linear", true);
    ScrollBetweenElements.addElement($("#div1"));
    ScrollBetweenElements.addElement($("#div2"));
    ScrollBetweenElements.addElement($("#div3"));
    ScrollBetweenElements.addElement($("#div4"));
});
```
in the addElement method, the first parameter is the elements you want to animate, the second parameters indicate which animation you want. 0 means scroll from an element to the next one, 1 means translate from the right to the left. of course the elements you want to translate must have a 100% translation to the right to be hidden and an absolute position, and each elements (that you could call scene), must be 100% height and 100% height.

simple right ?

here is an example: http://guillaume-m.com/scrolldemo/

of course you must have at least 2 elements, and if you're using it, you have to link all your elements, otherwise you won't be able to scroll between all the elements.
