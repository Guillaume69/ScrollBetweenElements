/**
 * Created by guillaume on 08/04/2015.
 */
/**
 * Scroll Between elements
 * @param duration
 * @param isScrollbarHidden
 * @param pEasing
 * @param pHeightCorrection
 * @constructor
 */

ScrollBetweenElements = (function ($) {

    var translateAnchor = 0;
    var duration = 0;
    var isScrollBarHidden = false;
    var isFinished = true;
    var elements = [];
    var index = 0;
    var height = 0;
    var previousIndex = 0;
    var body;
    var win;
    var easing = null;
    var previousElement = null;

    function checkPreviousElement(){
        if (previousElement == elements[index]["element"]){
            if (elements[index]["callback"] != null && elements[index]["isEndOfAnimation"] == false){
                isFinished = false;
                elements[index]["callback"]();
            }
            setTimeout(function(){isFinished = true}, duration);
            return true;
        }
        return false;
    }

    function initWithScrollBarHidden() {
        var scrollPosition = [
            self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
            self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        ];

        var html = jQuery('html');
        html.data('scroll-position', scrollPosition);
        html.css('overflow', 'hidden');
    }


    function translateToZero() {
        var translateValue = -100 * elements[index]["translateAnchor"] * elements[index]["isVerticalTranslation"];
        elements[index - elements[index]["translateAnchor"]]["element"].animate({'left': translateValue.toString() + "%"}, {
            start: function () {
                isFinished = false;
                previousIndex = index;
            },
            done: function () {
                isFinished = true;
                if (elements[index]["callback"] != null){
                    elements[index]["callback"]();
                }
            },
            queue: false,
            duration: duration,
            easing: easing
        });
    }

    function translate() {
        var translateValue = (100 * elements[index]["translateAnchor"] - 100) * -1 * elements[index]["isVerticalTranslation"];
        elements[index - elements[index]["translateAnchor"]]["element"].animate({'left': translateValue.toString() + "%"}, {
            start: function () {
                isFinished = false;
                --index;
                previousIndex = index;
            },
            done: function () {
                isFinished = true;
                if (elements[index] && elements[index]["callback"]){
                    elements[index]["callback"]();
                }
            },
            queue: false,
            duration: duration,
            easing: easing
        });
    }

    function scrollNext() {
        if (!checkPreviousElement()){
           body.animate({
                    scrollTop: elements[index]["element"].offset().top - height
                }, {
                    duration: duration,
                    start: function () {
                        if (elements[index]["callback"] != null && elements[index]["isEndOfAnimation"] == false)
                            elements[index]["callback"]();
                        isFinished = false;
                        previousIndex = index;
                    },
                    done: function () {
                        isFinished = true;
                        if (elements[index]["callback"] != null && elements[index]["isEndOfAnimation"] == true){
                            elements[index]["callback"]();
                        }
                    },
                    easing: easing
                }
            );
        } 
    }


    /**
     *
     * @param pDuration
     * @param pIsScrollBarHidden
     * @param pEasing
     * @param pHeightCorrection
     */
    function init(pDuration, pEasing, pIsScrollBarHidden, pHeightCorrection) {

        window.addEventListener("keydown", function(e) {
            if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                e.preventDefault();
            }
        }, false);
        body = $('body,html');
        win = $(window);
        height = pHeightCorrection || 0;
        duration = pDuration;
        easing = pEasing;
        isScrollBarHidden = pIsScrollBarHidden;


        if (isScrollBarHidden)
            initWithScrollBarHidden();

        win.on("mousewheel", function (e) {
            var oEvent = e.originalEvent;
            var delta = oEvent.deltaY || oEvent.wheelDelta;
            if (isFinished == true) {
                if (delta > 0 && previousIndex != ((elements.length - 1))) {
                    previousElement = elements[index]["element"];
                    if (index < (elements.length - 1))
                        ++index;
                    else
                        --index;
                    if (elements[index]["isVerticalTranslation"] != null){
                        translateToZero();
                    } else {
                        scrollNext();
                    }
                }
                if (delta <= 0) {
                    if (elements[index]["isVerticalTranslation"] != null && index != 0)
                        translate();
                    else if (elements[index]["isVerticalTranslation"] == null && previousIndex != 0) {
                        previousElement = elements[index]["element"];
                        if (index > 0)
                            --index;
                        else
                            ++index;
                        scrollNext();
                    }
                }
            }
        });
        win.keydown(function(e){
            if (isFinished == true){
                if (e.keyCode == 40){
                    if (previousIndex != ((elements.length - 1))) {
                        if (index < (elements.length - 1))
                            ++index;
                        else
                            --index;
                        if (elements[index]["isVerticalTranslation"] != null){
                            translateToZero();
                        } else {
                            scrollNext();
                        }
                    }
                }
                if (e.keyCode == 38){
                    if (elements[index]["isVerticalTranslation"] != null && index != 0)
                        translate();
                    else if (elements[index]["isVerticalTranslation"] == null && previousIndex != 0) {
                        if (index > 0)
                            --index;
                        else
                            ++index;
                        scrollNext();
                    }
                }
            }
        });
    }


    function resetPosition(){
        var resetTranslation = false;
        if (index != 0){
            body.animate({
                    scrollTop: 0
                }, {
                    start: function () {
                        isFinished = false;
                    },
                    done: function () {
                        isFinished = true;
                    },
                    duration: duration,
                    easing: "easeInOutQuart"
                }
            );
            for (index; index >= 0; index--) {
                if (elements[index]["callback"] != null && elements[index]["isEndOfAnimation"] == false) {
                    elements[index]["callback"]();
                }
                if (elements[index]["isVerticalTranslation"] != null && resetTranslation === false) {
                    resetTranslation = true;
                } else if(resetTranslation === true && elements[index]["isVerticalTranslation"] == null){
                    elements[index]["element"].css({"left": 0});
                }
            }
            translateAnchor = 0;
            previousIndex = 0;
            index = 0;
        }
    }

    function findElement(element){
        for(var i = 0; i < elements.length; i++) {
            if(elements[i]["element"].attr("id") === element) {
                return i;
            }
        }
    }

    function triggerAnimationsUntil(position){
        var resetTranslation = 0;
        var transValue = 0;
        var isTranslation = 0;
        if (index < position){
            for (index; index <= position; index++) {
                if (elements[index]["callback"] != null && elements[index]["isEndOfAnimation"] == false) {
                    elements[index]["callback"]();
                }
                if (elements[index]["isVerticalTranslation"] != null) {
                    ++resetTranslation;
                }
                if (resetTranslation > 0 && (elements[index]["isVerticalTranslation"] == null || index == position)) {
                    if (elements[index]["isVerticalTranslation"] == null)
                        ++isTranslation
                    transValue = (100 * resetTranslation) * -1 * elements[index - (resetTranslation - 1)]["isVerticalTranslation"];
                    elements[index - resetTranslation - isTranslation]["element"].css({"left": transValue.toString() + "%"});
                    resetTranslation = 0;
                    isTranslation = 0;
                }
            }
            previousIndex = index - 1;
        } else {
            for (index; index >= position; index--) {
                if (elements[index]["callback"] != null && elements[index]["isEndOfAnimation"] == false) {
                    elements[index]["callback"]();
                }
                if (elements[index]["isVerticalTranslation"] != null && resetTranslation === false) {
                    resetTranslation = true;
                } else if(resetTranslation === true && elements[index]["isVerticalTranslation"] == null){
                    elements[index]["element"].css({"left": 0});
                }
            }
            previousIndex = index;
        }
    }

    function setPosition(position, func){
        var pos;
        func = func || null;
        if (isNaN(position))
            pos = findElement(position);
        else
            pos = position;
        if (pos != index) {
            body.animate({
                    scrollTop: elements[pos]["element"].offset().top - height
                }, {
                    start: function () {
                        isFinished = false;
                    },
                    done: function () {
                        isFinished = true;
                        if (func != null)
                            func();
                    },
                    duration: duration,
                    easing: "easeInOutQuart"
                }
            );
            triggerAnimationsUntil(pos);
            index = pos;
        }
    }

    function setTranslationPosition(element, transAnchor, isVerticalTranslation){
        var translateValue = 100 * transAnchor * isVerticalTranslation;

        element.css({"position": "absolute", "left": translateValue.toString() + "%"});
    }

    function addElement(element, isVerticalTranslation, callback, isEndOfAnimation) {
        var translateAnchorValue;
        callback = callback || null;
        isVerticalTranslation = isVerticalTranslation || null;
        isEndOfAnimation = isEndOfAnimation || false;

        if (isVerticalTranslation != null){
            ++translateAnchor;
            setTranslationPosition(element, translateAnchor, isVerticalTranslation);
            translateAnchorValue = translateAnchor;
        }
        else if (translateAnchor > 0 && isVerticalTranslation == null){
            translateAnchor = 0;
            translateAnchorValue = null;
        }
        if (element == null)
            elements.push({
                "element": elements[elements.length - 1]["element"],
                "isVerticalTranslation": isVerticalTranslation,
                "callback": callback,
                "isEndOfAnimation": isEndOfAnimation,
                "translateAnchor": translateAnchorValue});
        else
            elements.push({
                "element": element,
                "isVerticalTranslation": isVerticalTranslation,
                "callback": callback,
                "isEndOfAnimation": isEndOfAnimation,
                "translateAnchor": translateAnchorValue});
    }


    return {
        init: init,
        addElement: addElement,
        resetPosition: resetPosition,
        setPosition: setPosition
    }
})(jQuery);
