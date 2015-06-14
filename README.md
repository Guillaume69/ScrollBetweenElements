# ScrollBetweenElements
a jquery animate overlay that makes you scroll between HTML elements smoothly and without scrollbar, it allows you to translate elements into your div parents aswell.

### Some things to know before using it

- As mentionned before, you need jQuery to use ScrollBetweenElemens, so don't forget to link jQuery before this plugin.
- If you need multi browser support for this plugin, i recommand you to use [jquery-mousewheel](https://github.com/jquery/jquery-mousewheel) which is awesome. Link it before ScrollBetweenElements aswell.
- For more awesomeness, i'm using jqueryUI for for its cool easing. So i recommand you to link it to be able to use more easing in ScrollBetweenElements(link it before ScrollBetweenElements of course)

## How to use it

### Prototype of the available functions

``` javascript
ScrollBetweenElements.init(Duration, Easing, IsScrollBarHidden, HeightCorrection);
```

- **Duration**: Time between each scrolls (in millisecond)<br />
- **Easin**: Name of the easing<br />
- **isScrollbarHidden**: Do i hide the scrollbar for you or not ? (true or false)<br />
- **HeightCorrection**: Correction in pixel of the height value of the scroll. For example if you have a navbar (an example is shown further)<br />

``` javascript
ScrollBetweenElements.addElement(element, isVerticalScroll, callback);
```

- **element**: jquery dom selector containing the id of your element (and only id for obvious reason)<br>
- **isVerticalScroll** : parameter to determine if your element will scroll vertically or horizontally (set nothing or null for a vertical scroll, 1 for a right to left horizontal scroll and -1 for a left to right horizontal scroll)<br>
- **callBack**: function which will be called once the scroll to the corresponding element will be triggered.<br>
**note**: *If you want to stay on the same element and just call the callback function with the scroll event, just set the element parameter to null.*
	
``` javascript
ScrollBetweenElements.resetPosition();
```

It will reset the position to the top of the page and it will trigger back all the functions just like you scrolled manually to the top.

``` javascript
ScrollBetweenElements.setPosition(position, func);
```
- **position**: the position you wand to scroll to (the number of the element, for example, the number of the first element is 0, or simple the id for example "my_id")

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
