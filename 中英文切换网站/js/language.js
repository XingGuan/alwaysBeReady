$(function(){ 
    // do something 
  var script=document.createElement("script");  
  script.type="text/javascript";  
  script.src="/js/microsoft.js";  
  document.getElementsByTagName('head')[0].appendChild(script);  


  var value = sessionStorage.getItem("language");
  document.onreadystatechange = function () {
      if (document.readyState == 'complete') {
          if(value==="1"){
              Microsoft.Translator.Widget.Translate('zh-CHS', 'en', onProgress, onError, onComplete, onRestoreOriginal, 1000);
          }
      }
  }
  function onProgress(value) {
  }
  function onError(error) {
  }
  function onComplete() {
      $("#WidgetFloaterPanels").hide();
      $("#MicrosoftTranslatorCommunity").hide();
  }
  function onRestoreOriginal() { 
  }
});

function translate(){
  var value = sessionStorage.getItem("language");
  if(value==="1"){
      sessionStorage.setItem("language", "0"); 
  }else{
      sessionStorage.setItem("language", "1");
  }
  window.location.reload();//刷新当前页面.
}