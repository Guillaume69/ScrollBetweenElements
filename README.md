# ScrollBetweenElements
a jquery animate overlay that makes you scroll between HTML elements smoothly and without scrollbar, it allows you to translate elements into your div parents aswell.

simply link the script(make sure it is linked after jquery) and then enjoy(or not)

example:
``` html
<div id="div1"></div>
<div id="div2"></div>
<div id="div3">
	<div id="div4"></div>
</div>
```
``` javascript
var scroller = new ScrollBetweenElements(500, true);
scroller.addElement("#div1", 0);
scroller.addElement("#div2", 0);
scroller.addElement("#div3", 0);
scroller.addElement("#div4", 1);
```
in the addElement method, the first parameter is the elements you want to animate, the second parameters indicate which animation you want. 0 means scroll from an element to the next one, 1 means translate from the right to the left. of course the elements you want to translate must have a 100% translation to the right to be hidden and an absolute position, and each elements (that you could call scene), must be 100% height and 100% height.

simple right ?

here is an example: http://guillaume-m.com/scrolldemo/

of course you must have at least 2 elements, and if you're using it, you have to link all your elements, otherwise you won't be able to scroll between all the elements.
