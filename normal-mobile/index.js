;(function(win, doc){
  function fontSizeModify() {
    var idealWidth = doc.documentElement.clientWidth,
      htmlEle = doc.children[0];
      fontSize   = 32 * idealWidth/750;
      // 当宽度大于600时, font-size保持不变
      // if (idealWidth >=600) {
      //   fontSize = 32 * 600/750;
      // }
    htmlEle.style.fontSize = fontSize + "px";
  }
  function throttle(method, content) {
    clearTimeout(method.tId);
    method.tId = setTimeout(function() {
      method.call(content);
    }, 100);
  }
  fontSizeModify();
  win.addEventListener("resize", function(){
    throttle(fontSizeModify);
  });
})(this, document);