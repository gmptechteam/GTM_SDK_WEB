var AndroidWebview = 'GA_Android';											// Android userAgent
var iOS_Webview_WK = 'GA_iOS_WK';												// WKWebView userAgent
var CommonData = new Object;
var isMoveFlag = false;
var browserInfo = navigator.userAgent;


function dimension7_SID(){
    var currenttime = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        currenttime += performance.now(); 
    }
    return 'xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (sessionID) {
        var r = (currenttime + Math.random() * 16) % 16 | 0;
        currenttime = Math.floor(currenttime / 16);
        return (sessionID === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });

}

   function dimension14_TimeStamp(){
	   var now = new Date();
     var tzo = -now.getTimezoneOffset();
     var dif = tzo >= 0 ? '+' : '-';
    var pad = function(num) {
        var norm = Math.abs(Math.floor(num));
        return (norm < 10 ? '0' : '') + norm;
    };
    return now.getFullYear() 
        + '-' + pad(now.getMonth()+1)
        + '-' + pad(now.getDate())
        + 'T' + pad(now.getHours())
        + ':' + pad(now.getMinutes()) 
        + ':' + pad(now.getSeconds()) 
         + pad(now.getMilliseconds())
        + dif + pad(tzo / 60) 
        + ':' + pad(tzo % 60);
	
	}

  function Convert_Element(RemoveValue){
    var return_Value = new Object();
    for(key in RemoveValue){
      if(RemoveValue[key] === "" || RemoveValue[key] === undefined || RemoveValue[key] === null){
        delete RemoveValue[key]
      }
    }
    return_Value = RemoveValue;
    return return_Value
  }

  function Hybrid(GADATA){
    var emptyObject = JSON.parse(JSON.stringify(Convert_Element(CommonData)));
    //emptyObject = $.extend(emptyObject, Convert_Element(GADATA))
	var jsonObject = { ...emptyObject, ...Convert_Element(GADATA)}
    if (browserInfo.indexOf(AndroidWebview) > -1) window.gascriptAndroid.GA_DATA(JSON.stringify(jsonObject));
    else if (browserInfo.indexOf(iOS_Webview_WK) > -1) webkit.messageHandlers.gascriptCallbackHandler.postMessage(JSON.stringify(jsonObject));  
  }

 

  function GADataScreen(Object){
    CommonData = Object;
    CommonData.dimension15 = 'pageview'
    if(browserInfo.indexOf('GA_iOS_WK') > -1 || browserInfo.indexOf('GA_Android') > -1){ 
      CommonData.type = "screen"
      Hybrid(CommonData); 
    }
    else{ 
    dataLayer = [CommonData]; 
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-XXXXXXX');
	}
  }
  


  function GA_Event(category, action, label, dimension8, dimension9, dimension11, dimension12){
    if(browserInfo.indexOf('GA_iOS_WK') > -1 || browserInfo.indexOf('GA_Android') > -1){ 
      var GAData = new Object();
      GAData.event_name = "click_event";
      GAData.category = category;
      GAData.action = action;
      GAData.label = label;
      GAData.dimension8 = dimension8;
      GAData.dimension9 = dimension9;
      GAData.dimension11 = dimension11;
      GAData.dimension12 = dimension12;
	    GAData.dimension15 = "event";
      GAData.type = "event";
      Hybrid(GAData); 
    }else{
      dataLayer.push({
        "event" : "ga_event",
        "event_name" : "click_event",
        "category" : category,
        "action" : action,
        "label" : label,
        "dimension8" : dimension8,
        "dimension9" : dimension9,
        "dimension11" : dimension11,
        "dimension12" : dimension12,
        "dimension15" : "event"
      });
    }
  }





  function EcommerceSet(E_step, Products, actionList, addDimension){
    if(browserInfo.indexOf('GA_iOS_WK') > -1 || browserInfo.indexOf('GA_Android') > -1){ 
      var APPData = new Object();
      APPData.EcommerceStep  = E_step;
      APPData.type  = 'ecommerce';
      APPData.Products = Products;
      APPData.transaction = actionList;
	  APPData.transaction.currencyCode = "KRW"
      //APPData = $.extend(APPData, addDimension);
	  var returnAPPData = {...APPData, ...addDimension};
      Hybrid(returnAPPData)
    }else{
       var EcommerceData = new Object();
       var Ecommerce = new Object();
       var EcommerceStep = E_step;

       //EcommerceData = $.extend({}, addDimension);
	   EcommerceData = {...{}, ...addDimension};
       EcommerceData.event = 'ga_ecommerce';

       Ecommerce[EcommerceStep] = {actionField : {}, products : []}
       Ecommerce[EcommerceStep].products = Products;
       Ecommerce[EcommerceStep].actionField = actionList;
       Ecommerce.currencyCode = "KRW"

       EcommerceData.ecommerce = Ecommerce;
      dataLayer.push(EcommerceData)
	  dataLayer.push({
		'ecommerce' : undefined,
		'nonInteraction' : false,
		'category' : undefined,
		'action' : undefined,
		'label' : undefined
	  })
	  
	  
	  
	  function GA_Virtual(VirtualObject) {
		var VirtualData = VirtualObject
		if(browserInfo.indexOf('GA_iOS_WK') > -1 || browserInfo.indexOf('GA_Android') > -1){
			VirtualData.type = "screen";
			Hybrid(VirtualData);
		}else{
			VirtualData.event = "ga_virtual";
			dataLayer.push(VirtualData);
		}
	}
	  
    }
  }

