//COPIES THE <BODY> OF ANOTHER PAGE USING:
//<div id="storage" style="display:none;">
//</div>
//<FORM name="ajax" method="POST" action="">
//	<p>		
//    <INPUT type="BUTTON" value="Load HTML and get data"  ONCLICK="loadWholePage('../bookmarks/index.html')">
//	</p>		
//</FORM>
//<div id="displayed">

/**
	responseHTML
	(c) 2007-2008 xul.fr		
	Licence Mozilla 1.1
*/	


/**
	Searches for body, extracts and return the content
	New version contributed by users
*/


function createXHR() 
{
    var request = false;
        try {
            request = new ActiveXObject('Msxml2.XMLHTTP');
        }
        catch (err2) {
            try {
                request = new ActiveXObject('Microsoft.XMLHTTP');
            }
            catch (err3) {
		try {
			request = new XMLHttpRequest();
		}
		catch (err1) 
		{
			request = false;
		}
            }
        }
    return request;
}

function getBody(content) 
{
   test = content.toLowerCase();    // to eliminate case sensitivity
   var x = test.indexOf("<body");
   if(x == -1) return "";

   x = test.indexOf(">", x);
   if(x == -1) return "";

   var y = test.lastIndexOf("</body>");
   if(y == -1) y = test.lastIndexOf("</html>");
   if(y == -1) y = content.length;    // If no HTML then just grab everything till end

   return content.slice(x + 1, y);   
} 

/**
	Loads a HTML page
	Put the content of the body tag into the current page.
	Arguments:
		url of the other HTML page to load
		id of the tag that has to hold the content
*/		

function loadHTML(url, fun, storage, param)
{
	var xhr = createXHR();
	xhr.onreadystatechange=function()
	{ 
		if(xhr.readyState == 4)
		{
			//if(xhr.status == 200)
			{
				storage.innerHTML = getBody(xhr.responseText);
				fun(storage, param);
			}
		} 
	}; 

	xhr.open("GET", url , true);
	xhr.send(null); 

} 

	/**
		Callback
		Assign directly a tag
	*/		


	function processHTML(temp, target)
	{
		target.innerHTML = temp.innerHTML;
	}

	function loadWholePage(url)
	{
		var y = document.getElementById("storage");
		var x = document.getElementById("displayed");
		loadHTML(url, processHTML, x, y);
	}	



