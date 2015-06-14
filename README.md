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
- **position**: the position you wand to scroll to (the number of the element, for example, the number of the first element is 0, or simple the id, for example "my_id")<br>
- **func**: the function will be triggered once the setPosition function will be called. This parameter is optionnal.

### Basic example

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
    ScrollBetweenElements.init(400, "linear", true);
    ScrollBetweenElements.addElement($("#div1"));
    ScrollBetweenElements.addElement($("#div2"));
    ScrollBetweenElements.addElement($("#div3"));
    ScrollBetweenElements.addElement($("#div4"));
});
```
[run this example!](http://guillaume-m.com/scrolldemo/basic-example.html)

### Example with small elements

You don't need to have 100% height elements, you can set a custom size.
it's the same html and javascript code, just the CSS code changed, check it out by looking at the source-code of the page, the css is displayed for every example inside the html file.

[run this example!](http://guillaume-m.com/scrolldemo/small-div-example.html)

### Easing example

You can change the easing of the scroll simply by changing the second parameter of the init method.
Thanks to [jqueryui](https://jqueryui.com/easing/) for the easings

``` javascript
$(document).ready(function(){
    ScrollBetweenElements.init(900, "easeOutBounce", true);
    ScrollBetweenElements.addElement($("#div1"));
    ScrollBetweenElements.addElement($("#div2"));
    ScrollBetweenElements.addElement($("#div3"));
    ScrollBetweenElements.addElement($("#div4"));
});
```
[run this example!](http://guillaume-m.com/scrolldemo/easing-example.html)

### Height correction examples

you could have a navbar for example in your website which would hide the top of your page. So juste set how much pixel you want to shift the top of your element with the third parameter of the init method. You might need to reduce the size of your elements aswell (with CSS), the is different technics for it, you're free the use the one you prefer.<br><br>

In the example, the "navbar" is 90 pixels heigh so i shifted the top to 90 pixels.

``` html
<body>
    <div id="navbar">
        HELLO, I'M NAVBAR!
    </div>
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
    ScrollBetweenElements.init(700, "easeInOutCubic", true, 90);
    ScrollBetweenElements.addElement($("#div1"));
    ScrollBetweenElements.addElement($("#div2"));
    ScrollBetweenElements.addElement($("#div3"));
    ScrollBetweenElements.addElement($("#div4"));
});
```

[run this example!](http://guillaume-m.com/scrolldemo/height-correction-example.html)

### Horizontal scroll example

You can also choose to scroll to an element horizontally. For this you need to put those elements into a parent element. The parent element must be in relative position. and then add all your elements with the addElement method like in the example below.

``` html
<body>
    <div id="div1">
    </div>
    <div id="div2"><!-- PARENT ELEMENT -->
        <div id="div3"><!-- CHILD ELEMENT -->
        </div>
        <div id="div4"><!-- CHILD ELEMENT -->
        </div>
    </div>
    <div id="div5"><!-- PARENT ELEMENT -->
        <div id="div6"><!-- CHILD ELEMENT -->
        </div>
        <div id="div7"><!-- CHILD ELEMENT -->
        </div>
    </div>
    <div id="div8">
    </div>
</body>
```

``` javascript
$(document).ready(function(){
    $('body,html').animate({ scrollTop: 0 }, 500);
    ScrollBetweenElements.init(900, "easeOutBounce", true);
    ScrollBetweenElements.addElement($("#div1"));
    ScrollBetweenElements.addElement($("#div2"));
    ScrollBetweenElements.addElement($("#div3"), 1); /* From right to left */
    ScrollBetweenElements.addElement($("#div4"), 1); /* From right to left */
    ScrollBetweenElements.addElement($("#div5"));
    ScrollBetweenElements.addElement($("#div6"), -1);/* From right to left */
    ScrollBetweenElements.addElement($("#div7"), -1);/* From right to left */
    ScrollBetweenElements.addElement($("#div8"));
});
```

For the moment you are not able to add elements that scroll from the right and from the left in a row, because it doesn't make sense for me.(if it's not clear why it doesn't make sens, have a look the this awesome paint basic schema about how this plugin work at the bottom of this readme.)

**to be clear you can't do the following**

``` javascript
$(document).ready(function(){
    $('body,html').animate({ scrollTop: 0 }, 500);
    ScrollBetweenElements.init(900, "easeOutBounce", true);
    ScrollBetweenElements.addElement($("#div1"));
    ScrollBetweenElements.addElement($("#div2", 1));
    ScrollBetweenElements.addElement($("#div3"), -1);
    ScrollBetweenElements.addElement($("#div4"), 1);
    ScrollBetweenElements.addElement($("#div5"), -1);
});
```

Actually, you can, but the result is not quite well.

[run this example!](http://guillaume-m.com/scrolldemo/translation-example.html)