# ScrollBetweenElements
a jquery animate overlay that makes you scroll between HTML elements smoothly and without scrollbar

simply link the script(make sure it is linked after jquery) and then enjoy(or not)

example:
<pre>
<div id="div1"></div>
<div id="div2"></div>
<div id="div3"></div>

var scroller = new ScrollBetweenElements(500, true);
scroller.addElement("#div1");
scroller.addElement("#div2");
scroller.addElement("#div3");
</pre>
simple right ?

of course you must have at least 2 elements, and if you're using it, you have to link all your elements, otherwise you won't be able to scroll between all the elements.
