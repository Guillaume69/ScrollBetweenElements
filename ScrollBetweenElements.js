function ScrollBetweenElements(duration, isScrollbarHidden)
    {
      if (isScrollbarHidden){
        var scrollPosition = [
        self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
        self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
        ];
        var html = jQuery('html');
        html.data('scroll-position', scrollPosition);
        html.css('overflow', 'hidden');
      }
      var duration = duration;
      var isFinished = true;
      var elements = [];
      var index = 0;
      var previousIndex = 0;
      this.addElement = function(element)
      {
        elements.push(element);
      }
      $(window).on("mousewheel", function(e) {
           var oEvent = e.originalEvent,
               delta  = oEvent.deltaY || oEvent.wheelDelta;
           if (isFinished == true)
           {
             if (delta > 0 && previousIndex != ((elements.length - 1))) {
               if (index < (elements.length - 1))
                 ++index;
               else
                 --index;
               $('body').animate({
                   scrollTop: $(elements[index]).offset().top
                   }, {
                     duration: duration,
                     start: function(){
                       isFinished = false;
                       previousIndex = index;
                     },
                     done: function(){
                       isFinished = true;
                     }
                   }
               );
             }
             if (delta <= 0 && previousIndex != 0){
              if (index > 0)
                 --index;  
               else
                 ++index;
               $('body').animate({
                   scrollTop: $(elements[index]).offset().top
                   }, {
                     duration: duration,
                     start: function(){
                       isFinished = false;
                       previousIndex = index;
                     },
                     done: function(){
                       isFinished = true;
                     }
                  }
               );
            }
          }
      });
    }