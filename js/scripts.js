var cur;
var no_of_links;
var links_str = new Array();
var links_img = new Array();
function init()
{
	no_of_links = ReadCookie('_linkNum');
	if(no_of_links == null) no_of_links = 0;
	DisplayLinks();
	cur=ReadCookie('_no');
	changeBG();	
}
function DisplayLinks()
{
	var temp=1;
	if(temp <= no_of_links) 
	{
		var str = ReadCookie('_linkNames');
		var img = ReadCookie('_linkImages');
		//document.write(str);
		//document.write(img);
		links_str = str.split("|");
		links_img = img.split("|");
	}
	while(temp < links_str.length)
	{
		$("#links").append("<a href='" + links_str[temp-1] + "' target='_blank'><img src='" + links_img[temp-1] + "' border='none' width='50' height='50' alt='Icon'></a>");
		if(temp % 4 == 0) $("#links").append("<br />");
		temp++;
	}	
}
function SaveLinks()
{
	no_of_links++;
	createCookie("_linkNum",no_of_links,365);
	var name = document.getElementById("url_name").value;
	var img = document.getElementById("url_img").value;
	//document.write(name);
	//document.write(img);
	var strs = ReadCookie('_linkNames');
	var imgs = ReadCookie('_linkImages');
	if(strs != 0 && name != null)
		strs += name + "|";
	if(imgs != 0 && img != null)
		imgs += img + "|";
	if(strs == 0 && name != null)
		strs = name + "|";
	if(imgs == 0 && img != null)
		imgs = img + "|";

	//document.write(strs);
	//document.write(imgs);
	createCookie("_linkNames",strs,365);
	createCookie("_linkImages",imgs,365);
	window.location.reload();
}
function resetAll() 
{
	createCookie("_linkNum",0,365);							//resets the links to null		
	createCookie("_linkNames",0,365);							//resets the links to null		
	createCookie("_linkImages",0,365);							//resets the links to null
	window.location.reload();
}
function changeBG()
{
	if (document.body)
	{
		document.body.background = cur;
	}
	createCookie("_no",cur,30);
}
function makeVisible(id)
{
	var dom1 = document.getElementById(id).style;
	if(dom1.visibility == "visible") dom1.visibility = "hidden";
	else dom1.visibility = "visible";
}
function extractCookieValue(val) 
{
  	if ((endOfCookie = document.cookie.indexOf(";", val)) == -1) 
  	{
     		endOfCookie = document.cookie.length;
  	}
  	return unescape(document.cookie.substring(val,endOfCookie));
}
function ReadCookie(cookiename) 
{
  	var numOfCookies = document.cookie.length;
  	var nameOfCookie = cookiename + "=";
  	var cookieLen = nameOfCookie.length;
  	var x = 0;
  	while (x <= numOfCookies) 
  	{
        	var y = (x + cookieLen);
        	if (document.cookie.substring(x, y) == nameOfCookie)
           		return (extractCookieValue(y));
           	x = document.cookie.indexOf(" ", x) + 1;
           	if (x == 0)
           	{
              		break;
           	}
  	}
  	return (null);
}
function createCookie(name1, value, expiredays) 
{
  	var todayDate = new Date();
  	todayDate.setDate(todayDate.getDate() + expiredays);
  	document.cookie = name1 + "=" + value + "; expires=" +todayDate.toGMTString() + ";"
}
function StringBuffer() 
{
    	this.__strings__ = new Array;
}

StringBuffer.prototype.append = function (str) 
{
    	this.__strings__.push(str);
};

StringBuffer.prototype.toString = function() 
{
    	return this.__strings__.join("");
};
function parsePath()
{
	var temp = document.getElementById("path").value;
	//document.write(temp);
	var p = new String(temp);
	//p = "file:///" + p;
	var x = 0;
	var buffer = new StringBuffer();
	while(x < p.length)
	{
		if(p.charAt(x) == '\\') buffer.append("/");
		else buffer.append(p.charAt(x));
		x++;
	}
	cur = buffer.toString();
}