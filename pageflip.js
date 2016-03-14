var pageflip = function(dom) {

  var pages = dom.getElementsByClassName('pages');
  //console.log(pages);
  var index = Array.from(pages).map(function(p){
    return p.id
  })

  console.log('built page index',index);

  dom.addEventListener('wheel',function(event){

    var direction = event.deltaY/Math.abs(event.deltaY);
    //when wheeling really fast, event.deltaY = -0 can happen sometimes

    var element = dom.getElementsByClassName('show')[0];
    //should only be 1 element at any given time

    var cursor = ( index.indexOf(element.id) + direction < 0 ) ? 0:Math.min(index.indexOf(element.id) + direction , index.length - 1);

    /*making the animation*/

    if ((index.indexOf(element.id) - cursor) < 0) {
      //
      //exit
      //
      console.log('showing',index[cursor]);

      document.getElementById(index[cursor]).classList.add('show');

      element.classList.add('exit');

      var endtransition = function(event) {

        element.classList.remove('show');

        event.target.removeEventListener('transitionend',endtransition);

      }

      element.addEventListener('transitionend',endtransition);

    }

    if ((index.indexOf(element.id) - cursor) == 0) console.log('dont move',index[cursor]);

    if ((index.indexOf(element.id) - cursor) > 0) {
      //
      //enter
      //
      console.log('showing',index[cursor]);

      document.getElementById(index[cursor]).classList.add('enter');

      var endtransition = function(event) {

        document.getElementById(index[cursor]).classList.remove('exit','enter');

        document.getElementById(index[cursor]).classList.add('show');

        element.classList.remove('show');

        event.target.removeEventListener('transitionend',endtransition);

      }

      document.getElementById(index[cursor]).addEventListener('transitionend',endtransition)

    }

  })

  Array.from(dom.getElementsByClassName('scrollable')).forEach(function(s){
    s.addEventListener('wheel',function(event){
      event.stopPropagation();
    })
  })

}
