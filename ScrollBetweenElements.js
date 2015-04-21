/**
 * Scroll Between elements
 * @param duration
 * @param isScrollbarHidden
 * @constructor
 */


/**
 * Package general _Sk.Utils permettant de retrouver ces bibliothèques.
 * @type {{Utils: {}}}
 * @private
 */
window._Sk = {
    Utils: {}
}


/**
 * Pattern Revealing Module
 * https://packagecontrol.io/packages/JavaScript%20Patterns
 */
_Sk.Utils.ScrollBetweenElements = (function ($) {


    /**
     * use strict permet de forcer les vérifications de rigueur dans intellij idea et dans le navigateur.
     */
    "use strict"


    /**
     * Par defaut on va mettre toutes les variables globales au package en premier.
     *
     */
    var duration = 0;
    var isScrollBarHidden = false;
    var isFinished = true;
    var elements = [];
    var index = 0;
    var previousIndex = 0;
    var scrollDownFunctions = [];

    // On met la variable that qui se réfère à l'instance du Module.
    var that = this;


    function initWithScrollBarHidden() {


        /**
         * TODO - GENERALE : Est tu sur qu'on aura pas besoin de cette variable à un autre moment ? Si oui alors on la met en haut dans
         * le package.
         * @type {*[]}
         */
        var scrollPosition = [
            self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
            self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        ];

        /**
         * TODO : Pareil,
         */
        var html = jQuery('html');
        html.data('scroll-position', scrollPosition);
        html.css('overflow', 'hidden');
    }


    function translateToZero() {
        /**
         * TODO : Repetition d'un appel à jQuery si on l'appelle plusieurs fois un sélecteur jQuery c'est
         * peut être le moment de le mettre en cache.
         */
        $(elements[index]["element"]).animate({'left': '0'}, {
            start: function () {
                isFinished = false;
                previousIndex = index;
            },
            done: function () {
                isFinished = true;
            },
            duration: duration
        });
    }

    function translate() {

        /**
         * TODO : Repetition d'un appel à jQuery si on l'appelle plusieurs fois un sélecteur jQuery c'est
         * peut être le moment de le mettre en cache.
         */
        $(elements[index]["element"]).animate({'left': '100%'}, {
            start: function () {
                isFinished = false;
                previousIndex = index;
                --index;
            },
            done: function () {
                isFinished = true;
            },
            duration: duration
        });
    }

    function scrollNext() {
        $('body').animate({
                scrollTop: $(elements[index]["element"]).offset().top
            }, {
                duration: duration,
                start: function () {
                    isFinished = false;
                    previousIndex = index;
                },
                done: function () {
                    isFinished = true;
                }
            }
        );
    }


    /**
     * TODO - CONSEIL : Toujours faire une méthode d'init
     * @param pDuration
     * @param pIsScrollBarHidden
     */
    function init(pDuration, pIsScrollBarHidden) {

        /**
         * Init options
         */
        duration = pDuration;
        isScrollBarHidden = pIsScrollBarHidden


        if (isScrollBarHidden)
            initWithScrollBarHidden()


        scrollDownFunctions.push(scrollNext);
        scrollDownFunctions.push(translateToZero);


        $(window).on("mousewheel", function (e) {

            /**
             * TODO : Que fait cette méthode ? faire des sous-méthodes.
             */

            var oEvent = e.originalEvent;
            var delta = oEvent.deltaY || oEvent.wheelDelta;


            if (isFinished == true) {
                if (delta > 0 && previousIndex != ((elements.length - 1))) {
                    if (index < (elements.length - 1))
                        ++index;
                    else
                        --index;
                    scrollDownFunctions[elements[index]["elementType"]]();
                }
                if (delta <= 0) {
                    if (elements[index]["elementType"] == 1)
                        translate();
                    else if (elements[index]["elementType"] == 0 && previousIndex != 0) {
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


    /**
     * TODO - CONSEIL : Toujours faire une méthode de resize, que se passe t'il lors d'un resize
     */
    function onResize(){}


    function addElement(element, elementType) {
        elements.push({"element": element, "elementType": elementType});
    }


    return {
        init: init,
        addElement: addElement
    }


})(jQuery)

