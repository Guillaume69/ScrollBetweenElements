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
  var scrollDownFunctions = [];
  scrollDownFunctions.push(scrollNext);
  scrollDownFunctions.push(translateToZero);

  function translateToZero()
  {
    $(elements[index]["element"]).animate({'left': '0'}, {
      start: function(){
        isFinished = false;
        previousIndex = index;
      },
      done: function(){
        isFinished = true;
      },
        duration:duration
    },'linear');
  }

  function translate()
  {
    $(elements[index]["element"]).animate({'left': '100%'}, {
      start: function(){
        isFinished = false;
        previousIndex = index;
        --index;
      },
      done: function(){
        isFinished = true;
      },
        duration:duration
    },'linear');
  }

  function scrollNext()
  {
    $('body').animate({
        scrollTop: $(elements[index]["element"]).offset().top
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
  this.addElement = function(element, elementType)
  {
    elements.push({"element": element, "elementType": elementType});
  }
  $(window).on("mousewheel", function(e) {
    var oEvent = e.originalEvent;
    var delta  = oEvent.deltaY || oEvent.wheelDelta;
        if (isFinished == true)
        {
          if (delta > 0 && previousIndex != ((elements.length - 1)))
          {
            if (index < (elements.length - 1))
              ++index;
            else
              --index;
            scrollDownFunctions[elements[index]["elementType"]]();
          }
          if (delta <= 0)
          {
            if (elements[index]["elementType"] == 1)
              translate();
            else if (elements[index]["elementType"] == 0 && previousIndex != 0)
            {
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