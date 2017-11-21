var TABHIDDENSTYLE = "x-hide-display";
var DEBUG = false;
var ACLChartNavigation = "ChartNavigation";
ddCtrl.isDashboard = true;
ddCtrl.isNewDashboard = true;
ddCtrl.colorManager = new ColorManager();
ddCtrl.legendManager = new LegendManager();
ddCtrl.speechRec = new SpeechRec(window);

ddCtrl.urlParams = {};
ddCtrl.pageList = {};
ddCtrl.widgetsByPage = {};
ddCtrl.comboOptionsByRole = {};
ddCtrl.dashboardLoadListeners = [];
ddCtrl.currentPageChangeListeners = [];
ddCtrl.currentPageLoadListeners = [];
ddCtrl.userLoggedListeners = [];
ddCtrl.closeFlowInWindowListeners = [];
ddCtrl.widgetHiddenListeners = [];
ddCtrl.widgetVisibleListeners = [];
ddCtrl.userACLs = {};
ddCtrl.userRoleACLs = {};

ddCtrl.setDashboardLocale = function(localeName)
{
	setLocale(localeName);
	var jsPropName = "js-dashboard-properties_" + localeName;
	if (!ddCtrl.useDevScripts && ddCtrl.version)
	{
		jsPropName += "-" + ddCtrl.version + ".js";
	}
	else
	{
		jsPropName += ".js";
	}
	loadJS(jsPropName, "messages/" + jsPropName);
}

ddCtrl.getLocalizedMessage = function(id, lang)
{
	if (ddCtrl.Properties[lang] && ddCtrl.Properties[lang][id])
	{
		return ddCtrl.Properties[lang][id];
	}
	if (ddCtrl.Properties["en"] && ddCtrl.Properties["en"][id])
	{
		return ddCtrl.Properties["en"][id];
	}
	return id;
}

ddCtrl.switchDashboardMode = function(mode, queryString)
{
	var url = window.location.origin + window.location.pathname;

	if (typeof(queryString) != "undefined" && queryString != null && queryString.length > 0)
	{
		var params = queryString.split('&');
		for (var i = 0; i < params.length; i++)
		{
			var pair = params[i].split('=');
			if (pair.length == 2)
			{
				var pName = decodeURIComponent(pair[0]);
				var pValue = decodeURIComponent(pair[1]);
				ddCtrl.urlParams[pName] = pValue;
			}
		}
	}

	if (mode == "editor")
	{
		url += "?mode=editor";
	}
	else if (mode == "analysis")
	{
		url += "?mode=analysis";
	}
	for (var key in ddCtrl.urlParams)
	{
		if (key != "mode")
		{
			if (url.indexOf("?") == -1)
			{
				url += "?"
			}
			else
			{
				url += "&";
			}
			url += key + "=" + ddCtrl.urlParams[key];
		}
	}
	window.location.href = url;
}

ddCtrl.addDashboardLoadListener = function(listener)
{
	ddCtrl.dashboardLoadListeners.push(listener);
}

ddCtrl.addCurrentPageChangeListener = function(listener)
{
	ddCtrl.currentPageChangeListeners.push(listener);
}

ddCtrl.addCurrentPageLoadListener = function(listener)
{
	ddCtrl.currentPageLoadListeners.push(listener);
}

ddCtrl.addUserLoggedListener = function(listener)
{
	ddCtrl.userLoggedListeners.push(listener);
}

ddCtrl.addCloseFlowInWindowListeners = function(listener)
{
	ddCtrl.closeFlowInWindowListeners.push(listener);
}

ddCtrl.addWidgetHiddenListeners = function(listener)
{
	ddCtrl.widgetHiddenListeners.push(listener);
}

ddCtrl.addWidgetVisibleListeners = function(listener)
{
	ddCtrl.widgetVisibleListeners.push(listener);
}

ddCtrl.ddHistory = new History();

ddCtrl.fireDashboardEvent = function(eventName, currentPage, bFirstTime)
{
	if (eventName == "currentPageChanged")
	{
		ddCtrl.pageID = currentPage;
		for (var i = 0; i < ddCtrl.currentPageChangeListeners.length; i++)
		{
			var listener = ddCtrl.currentPageChangeListeners[i];
			if (typeof(listener) == 'object' && typeof(listener.currentPageChanged) == 'function')
				listener.currentPageChanged(currentPage, bFirstTime);
			else
				listener(currentPage, bFirstTime);
		}
		if (typeof(currentPageChanged) == 'function')
		{ //a specified custom basic event handler
			currentPageChanged(currentPage, bFirstTime);
		}
	}
	else if (eventName == "currentPageLoaded")
	{
		for (var i = 0; i < ddCtrl.currentPageLoadListeners.length; i++)
		{
			var listener = ddCtrl.currentPageLoadListeners[i];
			if (typeof(listener) == 'object' && typeof(listener.currentPageLoaded) == 'function')
				listener.currentPageLoaded(currentPage);
			else
				listener(currentPage);
		}
	}
	else if (eventName == "dashboardLoaded")
	{
		for (var i = 0; i < ddCtrl.dashboardLoadListeners.length; i++)
		{
			var listener = ddCtrl.dashboardLoadListeners[i];
			listener();
		}
	}
}

ddCtrl.fireChartChangeEvent = function(doc, dm, dmsel, chart)
{
	for (var i = 0; i < ddCtrl.chartChangelisteners.length; i++)
	{
		var listener = ddCtrl.chartChangelisteners[i];
		listener(doc, dm, dmsel, chart);
	}
}

ddCtrl.fireUserLoggedEvent = function(userName)
{
	ddCtrl.username = userName;
	for (var i = 0; i < ddCtrl.userLoggedListeners.length; i++)
	{
		var listener = ddCtrl.userLoggedListeners[i];
		if (typeof(listener) == 'object' && typeof(listener.userLogged) == 'function')
			listener.userLogged(userName);
		else
			listener(userName);
	}
}

ddCtrl.fireCloseFlowInWindowEvent = function(flowId)
{
	for (var i = 0; i < ddCtrl.closeFlowInWindowListeners.length; i++)
	{
		var listener = ddCtrl.closeFlowInWindowListeners[i];
		listener(flowId);
	}
}

ddCtrl.fireWidgetHiddenEvent = function(portletId)
{
	for (var i = 0; i < ddCtrl.widgetHiddenListeners.length; i++)
	{
		var listener = ddCtrl.widgetHiddenListeners[i];
		listener(portletId);
	}
}

ddCtrl.fireWidgetVisibleEvent = function(portletId)
{
	for (var i = 0; i < ddCtrl.widgetVisibleListeners.length; i++)
	{
		var listener = ddCtrl.widgetVisibleListeners[i];
		listener(portletId);
	}
}

function getJSConstants()
{
	var jsURL = ddCtrl.servletFilePath + "/config/web/session/js-const.js?rand=" + Math.random();
	loadJS("js-const.js", jsURL);
}
ddCtrl.addUserLoggedListener(getJSConstants);

function extractURLParams()
{
	var p = location.search.substring(1).split('&');
	for (var i = 0; i < p.length; i++)
	{
		var pair = p[i].split('=');
		if (pair.length == 2)
		{
			var pName = decodeURIComponent(pair[0]);
			var pValue = decodeURIComponent(pair[1]);
			if (pName != "user" && pName != "pass")
				ddCtrl.urlParams[pName] = pValue;
		}
	}
}
ddCtrl.addUserLoggedListener(extractURLParams);

function loadDefaultJS()
{
	if (typeof(offlineMode) == 'undefined')
	{
		var jsURL = ddCtrl.servletFilePath + "/config/web/session/js-default.js?rand=" + Math.random();
		loadJS("js-default.js", jsURL);
	}
	else
	{
		var jsURL = ddCtrl.servletFilePath + "/config/web/session/js-default.js";
		var fileref = document.createElement("script");
		fileref.setAttribute("type", "text/ecmascript");
		fileref.setAttribute("language", "javascript");
		fileref.setAttribute("src", jsURL);
		document.getElementsByTagName("head")[0].appendChild(fileref);
	}
}

ddCtrl.getColorManager = function(bColorIndependant, useColorManager)
{
	if (!bColorIndependant)
		return ddCtrl.colorManager;
	else
		return new ColorManager(useColorManager);
}

function getLegendMembers()
{
	return ddCtrl.legendManager.getLegendMembers();
}

function setColorsMembers(roleId, members, colors, update)
{
	ddCtrl.colorManager.setColors(roleId, members, colors);
	if (update)
	{
		var iDM = 0;
		while (iDM < dmSelList.length)
		{
			var dmsel = dmSelList[iDM];
			dmsel.updated = true;
			iDM++;
		}
		refreshAllDocuments();
	}
}

ddCtrl.hidePage = function(pageId)
{
	if (ddCtrl.hideDashboardPage)
	{
		ddCtrl.hideDashboardPage(pageId);
	}
}

ddCtrl.showPage = function(pageId)
{
	if (ddCtrl.showDashboardPage)
	{
		ddCtrl.showDashboardPage(pageId);
	}
}

function registerDashboardPages(jsonDashboardPages)
{
	try
	{
		ddCtrl.dashboardPages = eval(jsonDashboardPages);
	}
	catch (e)
	{
		alert(e);
	}
}

function registerPageList(jsonPageList)
{
	var pages = eval(jsonPageList);
	for (var i = 0; i < pages.length; i++)
	{
		var page = new Page(pages[i].id, pages[i].roleid, pages[i].role, pages[i].roledisplay);
		page.pos = i;
		ddCtrl.pageList[page.id] = page;
	}
}

Page = function(id, roleid, role, roledisplay)
{
	this.id = id;
	this.roleId = roleid;
	this.role = role;
	this.roledisplay = roledisplay;
}

ddCtrl.isPageVisible = function(pageId, frameId)
{
	if (pageId == null)
	{
	  return true;
	}
	if (ddCtrl.pageID.indexOf("frame_") == 0)
	{	//case maximize portlet is the current page -> return true only for this maximized portlet
		//Bug #8327
		if (ddCtrl.pageID == frameId || ddCtrl.pageID == pageId)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	else
	{
		if (ddCtrl.pageID == pageId || pageId == "foreground_foreground" || pageId == "foreground.foreground")
		{
			return true;
		}
		else
		{
			//test if current page are maximized container
			var chart = ddCtrl.charts[frameId];
			if (chart && ddCtrl.pageID == chart.containerId)
			{
				return true;
			}
			else
			{
				return false;
			}
		}
	}
}

ddCtrl.getCurrentPage = function()
{
	return ddCtrl.pageID;
}

ddCtrl.isCurrentPage = function(page)
{
	if (page == ddCtrl.pageID || cleanNameForId(page) == ddCtrl.pageID)
	{
		return true;
	}
	return false;
}

ddCtrl.getCurrentRole = function()
{
	if (ddCtrl.pageList)
	{
		var pageObj = ddCtrl.pageList[ddCtrl.pageID];
		if (pageObj)
		{
			var role = pageObj.roleId;
			if (role == ddCtrl.username)
				role = "";
			return role;
		}
		return "";	//TODO null
	}
}

ddCtrl.getRole = function(pageId)
{
	if (ddCtrl.pageList)
	{
		var pageObj = ddCtrl.pageList[pageId];
		if (!pageObj)
		{
			pageObj = ddCtrl.pageList[cleanNameForId(pageId)];
		}
		if (pageObj)
		{
			var role = pageObj.roleId;
			if (role == ddCtrl.username)
				role = "";
			return role;
		}
		return "";	//TODO null
	}
}

ddCtrl.getUserRoles = function()
{
	var tmpRoles = new Object();
	var roles = new Array();
	for (var pageId in ddCtrl.pageList)
	{
		var page = ddCtrl.pageList[pageId];
		var roleId = page.roleId;
		if (roleId != "" && !tmpRoles[roleId])
		{
			roles.push(roleId);
			tmpRoles[roleId] = true;
		}
	}
	return roles;
}

ddCtrl.getUserACLs = function()
{
	return ddCtrl.userACLs;
}

ddCtrl.getUserRoleACLs = function()
{
	return ddCtrl.userRoleACLs;
}

function hideElement(elt)
{
	elt.style.visibility = 'hidden';
	var userAgent = navigator.userAgent.toLowerCase();
	if ((userAgent.indexOf("macintosh") != -1 || userAgent.indexOf("mac os x") != -1) && navigator.userAgent.indexOf("safari") != -1)
	{
		elt.style.opacity = 0;
	}
}

function showElement(elt)
{
	elt.style.visibility = 'inherit';
	var userAgent = navigator.userAgent.toLowerCase();
	if ((userAgent.indexOf("macintosh") != -1 || userAgent.indexOf("mac os x") != -1) && userAgent.indexOf("safari") != -1)
	{
		elt.style.opacity = 1;
	}
}

function changeCurrentPage(currentPage, bFirstTime)
{
	if (bFirstTime)
	{
		if (typeof(nbFlowsToLoadByPage) != 'undefined' && nbFlowsToLoadByPage[currentPage] == 0)
		{	//case: no datamodel on this page
			buildCombos();
			//allChartsLoaded();
			fireDashboardEvent("currentPageLoaded", currentPage);
			ddHistory.changePage();
		}
	}
	else
	{
		displayCombo(currentPage);
		updateVariablesOnCurrentPage();
	}

	//gwt set visibility:visible to all dom elements after switching page
	//pb: hidden charts are visible
	//fix: re-hide hidden charts
	if (ddCtrl.widgetsByPage[getCurrentPage()])
	{
		for (var portletId in ddCtrl.widgetsByPage[getCurrentPage()])
		{
			var widget = ddCtrl.widgetsByPage[getCurrentPage()][portletId];
			if (widget.hidden)
			{
				ddCtrl.hideChart(portletId);
			}
			else if (widget.portletContainerId)
			{
				var bHidden = widget.hidden;
				while (widget.portletContainerId && !bHidden)
				{
					widget = ddCtrl.widgetsByPage[ddCtrl.pageID][widget.portletContainerId];
					bHidden = widget.hidden;
				}
				if (bHidden)
				{
					var doc = document.getElementById(portletId);
					if (doc)
					{
						var frameId = "frame_" + portletId;
						var frame = document.getElementById(frameId);
						hideElement(doc);
						if (ddCtrl.charts[frameId])
						{
							hideElement(frame);
						}
					}
				}
			}
		}
	}
}
ddCtrl.addCurrentPageChangeListener(changeCurrentPage);

function changePage(page)
{
	if (switchPage)
	{
		switchPage(page);
	}
}

function nextPage()
{
	var currentPage = getCurrentPage();
	if (currentPage && ddCtrl.pageList[currentPage])
	{	//find next page
		for (var p in ddCtrl.pageList)
		{
			if (ddCtrl.pageList[p].role == ddCtrl.pageList[currentPage].role
			 && ddCtrl.pageList[p].pos == ddCtrl.pageList[currentPage].pos + 1)
			{
				switchPage(p);
				return;
			}
		}
	}
}

function prevPage()
{
	var currentPage = getCurrentPage();
	if (currentPage && ddCtrl.pageList[currentPage])
	{	//find next page
		for (var p in ddCtrl.pageList)
		{
			if (ddCtrl.pageList[p].role == ddCtrl.pageList[currentPage].role
			 && ddCtrl.pageList[p].pos == ddCtrl.pageList[currentPage].pos - 1)
			{
				switchPage(p);
				return;
			}
		}
	}
}

function registerWidget(pageId, portletId, bHidden, portletContainerId, zIndex)
{
	if (!ddCtrl.widgetsByPage[pageId])
		ddCtrl.widgetsByPage[pageId] = new Array();
	ddCtrl.widgetsByPage[pageId][portletId] = new Object();
	ddCtrl.widgetsByPage[pageId][portletId].portletId = portletId;
	ddCtrl.widgetsByPage[pageId][portletId].hidden = bHidden;
	ddCtrl.widgetsByPage[pageId][portletId].pageId = pageId;
	ddCtrl.widgetsByPage[pageId][portletId].portletContainerId = portletContainerId;
	ddCtrl.widgetsByPage[pageId][portletId].zIndex = zIndex;
}

function registerDataModel(dm, dmSel, flowName, flowId, pageId)
{
	if (!flowId)
		flowId = "";
	if (ddCtrl.addDataModel)
	{
		var xml = "<DataModel cubeid=\"" + dm.cubeId + "\" datamodelname=\"" + xmlEncode(dm.cubeName) + "\""
			+ " flowname=\"" + xmlEncode(flowName) + "\" flowid=\"" + flowId + "\" roleid=\"" + ddCtrl.getRole(pageId) + "\" pageid=\"" + xmlEncode(pageId) + "\">";
		xml += "<Dimensions>";
		for (var i = 0; i < dm.dimensions.length; i++)
		{
			var dim = dm.dimensions[i];
			if (dim.archived)
				continue;
			var membersOnServer = false;
			if (typeof(dim.membersOnServer) != 'undefined')
				membersOnServer = dim.membersOnServer;
			var time = dim.time;
			if (typeof(time) == 'undefined')
				time = false;
			var comment = getComboAttribute(dim.id, "comment", "true");
			xml += "<Dimension id=\"" + xmlEncode(dim.id) + "\" name=\"" + xmlEncode(dim.name) + "\" continuous=\"" + dim.continuous + "\" time=\"" + time + "\""
				+ " nbmembers=\"" + dim.members.length + "\" membersonserver=\"" + membersOnServer + "\" comment=\"" + comment + "\"";
			if (typeof(dim.min) != 'undefined' && typeof(dim.max) != 'undefined')
				xml += " min=\"" + dim.min + "\" max=\"" + dim.max + "\"";
			xml += ">";
			if (dim.hierarchies.length > 0)
			{
				var iH = 0;
				while (iH < dim.hierarchies.length)
				{
					var hierarchy = dim.hierarchies[iH];
					xml += "<hierarchy id=\"" + xmlEncode(hierarchy.id) + "\" name=\"" + xmlEncode(hierarchy.name) + "\" pos=\"" + iH + "\">";
					if (dim.displayRootLevel)
						xml += "<level id=\"Root\" name=\"" + Properties[getLocale()]['Root'] + "\" pos=\"-1\" />";
					for (var iL = 0; iL < hierarchy.levels.length; iL++)
					{
						var level = hierarchy.levels[iL];
						xml += "<level id=\"" + xmlEncode(level.id) + "\" name=\"" + xmlEncode(level.name) + "\" pos=\"" + level.depth + "\" />";
					}
					xml += "</hierarchy>";
					iH++;
				}
				xml += "</Dimension>";
			}
			else
			{
				xml += "</Dimension>";
			}
		}
		xml += "</Dimensions>";
		xml += "<Variables>";
		for (var varName in dm.variables)
		{
			var variable = dm.variables[varName];
			var displayName = '';
			if (variable.displayName)
				displayName = variable.displayName;
			xml += "<Variable name='" + xmlEncode(variable.name) + "' def='" + variable.def + "' cur='"+ variable.cur + "' min='"
				+ variable.min + "' max='" + variable.max + "' inc='" + variable.inc + "' displayName='" + xmlEncode(displayName) + "'";
			if (variable.format)
			{
				xml += " format='" + xmlEncode(variable.format.id) + "'"
			}
			if (variable.values)
			{
				xml += ">";
				for (varValue in variable.values)
				{
					xml += "<values value='" + varValue + "' name='" + xmlEncode(variable.values[varValue]) + "'/>"
				}
				xml += "</Variable>";
			}
			else
			{
				xml += "/>";
			}
		}
		xml += "</Variables>";
		xml += "</DataModel>";
		ddCtrl.addDataModel(xml);
	}
}

function updateVariablesOnCurrentPage()
{
	for (varName in ddCtrl.ddVars)
	{
		var ddVarUI = ddCtrl.ddVars[varName];
		if (ddVarUI.pageId == ddCtrl.getCurrentPage())
		{
			ddVarUI.update();
		}
	}
}

function BlockMove(event)
{
	event.preventDefault();
}

function loadTheme(cssFile, bLegacy)
{
	if (cssFile == null)
		return;

	if (!cssFile.endsWith(".css"))
		cssFile += ".css";

	ddCtrl.theme = cssFile;
	if (bLegacy && cssFile != "default.css")
	{
		//legacy: load theme from webapp directory
		var cssURL = cssFile + "?rand=" + Math.random();
		loadCSS(cssURL);
	}

	//new: load theme from app data folder on server
	var cssURL = ddCtrl.servletFilePath + "/config/web/public/" + cssFile + "?rand=" + Math.random();
	loadCSS(cssURL);
}

function removeTheme(cssFile)
{
	if (cssFile == null)
		return;

	if (!cssFile.endsWith(".css"))
		cssFile += ".css";

	for (var i = 0; i < document.styleSheets.length; i++)
	{
		var styleSheet = document.styleSheets[i];
		if (styleSheet.href != null)
		{
			var tCSS = styleSheet.href.split('/');
			var cssName = tCSS[tCSS.length-1];
			if (cssName.indexOf("?") > -1)
			{
				cssName = cssName.substring(0, cssName.indexOf("?"));
			}
			if (cssFile == cssName)
			{
				styleSheet.disabled = true;
			}
		}
	}
}

function loadCSS(cssFile)
{
	var fileref = document.createElement("link");
	fileref.setAttribute("rel", "stylesheet");
	fileref.setAttribute("type", "text/css");
	fileref.setAttribute("href", cssFile);
	document.getElementsByTagName("head")[0].appendChild(fileref);
}

function loadJS(jsFileName, jsFile)
{
	if (DEBUG)
	{
		var fileref = document.createElement("script");
		fileref.setAttribute("type", "text/ecmascript");
		fileref.setAttribute("language", "javascript");
		fileref.setAttribute("src", jsFile);
		document.getElementsByTagName("head")[0].appendChild(fileref);
	}
	else
	{
		var xmlRequest = null;
		if (window.XMLHttpRequest)
		{	//modern browser (and IE7+!)
			xmlRequest = new XMLHttpRequest();
			try
			{	//to avoid the result from being parsed as XML
				xmlRequest.overrideMimeType("text/ecmascript");
			}
			catch(e) {}
		}
		else if (window.ActiveXObject)
		{	//older browser
			xmlRequest = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlRequest.open("GET", jsFile, true);
		xmlRequest.onreadystatechange = function ()
		{
			if (xmlRequest.readyState === 4)
			{
				if ((xmlRequest.status === 0) || (xmlRequest.status >= 200 &&  xmlRequest.status <= 206))
				{
					xmlRequest.onreadystatechange = new Function();	//unlink callback because it can closures on some DOM elements
					jsText = xmlRequest.responseText;
					if (jsText && jsText.length > 0)
					{
						try
						{
							globalEval(jsText);
						}
						catch (e)
						{
							alert(Properties[getLocale()]["ErrorScript"] + jsFileName + "\n" + e.message);
						}
					}
					xmlRequest = null;
				}
			}
		};
		xmlRequest.send(null);
	}
}

ddCtrl.includeJS = function(jsFile)
{
	if (typeof(offlineMode) == 'undefined')
	{
		var jsURL = ddCtrl.servletFilePath + "/config/web/session/" + jsFile + "?rand=" + Math.random();
		loadJS(jsFile, jsURL);
	}
	else
	{
		var jsURL = ddCtrl.servletFilePath + "/config/web/session/" + jsFile;
		var fileref = document.createElement("script");
		fileref.setAttribute("type", "text/ecmascript");
		fileref.setAttribute("language", "javascript");
		fileref.setAttribute("src", jsURL);
		document.getElementsByTagName("head")[0].appendChild(fileref);
	}
}

function printChart(frameId)
{
	var doc = ddCtrl.getSVGDoc(frameId);
	if (doc && doc.printChart)
		doc.printChart();
}

function chartIsPrintable(frameId)
{
	var doc = ddCtrl.getSVGDoc(frameId);
	if (doc && doc.printChart)
		return true;
	return false;
}

function displayCombo(currentPage)
{
	var bSaveHistoryState = ddHistory.bSaveHistoryState;
	var bChangePage = true;
	if (!ddHistory.bSaveHistoryState)
		bChangePage = false;
	ddHistory.bSaveHistoryState = false;

	buildCombos();

	var panI = 0;
	while (panI < panelOrderedKey.length)
	{
		var panel = dimPanelList[panelOrderedKey[panI]];
		if (panel.isRegistered(currentPage))
		{	//test if dim sel panel are registered for the current page
			//not test hidden cause 'hidden' parameter is just a UI parameter
			panel.changePage = true;
			var bHasChanged = panel.updateDMSels();
			panel.changePage = false;
			if (bHasChanged)
			{
				panel.dimSelChangeHandler();
			}
		}
		panI++;
	}
	ddCtrl.refreshAllDocuments();

	ddHistory.bSaveHistoryState = bSaveHistoryState;
	if (bChangePage)
	{
		ddHistory.changePage();
	}
}

function registerChart(id, chartType, cubeURL, cubeViewURL, cubeServerURL, pageId, frameObj, flowId, callChangeHandler, containerId, roleId)
{
	//TODO: cubeServerURL = ddCtrl.servletAPIPath
	charts[id] = new ChartHandle(id, chartType, cubeURL, cubeViewURL, cubeServerURL, pageId, frameObj, containerId);
	charts[id].flowId = flowId;
	charts[id].roleId = roleId;
	if (typeof(callChangeHandler) != 'undefined')
		charts[id].callChangeHandler = callChangeHandler;
}

function drawLoading(id, parentId, text)
{
	var loadingElt = document.getElementById(id);
	if (!loadingElt)
	{
		loadingElt = document.createElement("div");
		loadingElt.id = id;
		var parentElt = document.getElementById(parentId);
		parentElt.appendChild(loadingElt);
		setStyle(loadingElt, "position: absolute; top: 0; left: 0; width: 100%; height: 100%");
	}
	loadingElt.innerHTML = "<table class=\"loading\"><tr><td class=\"loadingImg\"></td><td><span class=\"loadingTxt\">" + text + "</span></td></tr></table>";
}

function drawChart(id, parentId, templateURL, cubeURL, cubeViewURL, cubeServerURL, pageId, frameObj, flowId, callChangeHandler, containerId, roleId)
{
	var parentElt = document.getElementById(parentId);

	var loadingElt = document.getElementById(id + "_wait");
	if (loadingElt == null)
	{
		loadingElt = document.createElement("div");
		loadingElt.id = id + "_wait";
	}
	var text = "loading";
	loadingElt.innerHTML = "<table class=\"loading\"><tr><td class=\"loadingImg\"></td><td><span class=\"loadingTxt\">" + getLocMessage("Loading") + "</span></td></tr></table>";

	var iframe = document.createElement("iframe");
	iframe.className = "iframe";
	iframe.id = id;
	setStyle(iframe, "position: absolute; top: 0; left: 0; width: 100%; height: 100%");
	iframe.src = templateURL;	
	parentElt.appendChild(iframe);

	var breadcrumbElt = document.createElement("div");
	breadcrumbElt.id = id + "_breadcrumb";
	breadcrumbElt.className = "breadcrumbs";
	setStyle(breadcrumbElt, "display: none; position: absolute; top: 0; left: 0; width: 100%; height: 20px");
	parentElt.appendChild(breadcrumbElt);

	var editChartToolbarElt = document.createElement("div");
	editChartToolbarElt.id = id + "_editToolbar";
	editChartToolbarElt.className = "editToolbar";
	setStyle(editChartToolbarElt, "display: none; position: absolute; top: 0; left: 0; height: 100%; width: 200px");
	parentElt.appendChild(editChartToolbarElt);

	var editChartDropZonesElt = document.createElement("div");
	editChartDropZonesElt.id = id + "_dropZones";
	editChartDropZonesElt.className = "dropZones";
	setStyle(editChartDropZonesElt, "display: none; position: absolute; top: 0; left: 0");
	parentElt.appendChild(editChartDropZonesElt);

	registerChart(id, templateURL, cubeURL, cubeViewURL, cubeServerURL, pageId, frameObj, flowId, callChangeHandler, containerId, roleId)
}

ddCtrl.unregisterChart = function(frameId)
{
	var bFind = false;

	for (var i = 0; i < svgdocList.length; i++)
	{
		if (svgdocList[i].frameId == frameId)
		{	//found it !
			bFind = true;
			break;
		}
	}

	if (bFind)
	{
		ddCtrl.legendManager.unregisterChartLegend(frameId);
		ddCtrl.unregisterDM(frameId);
		if (ddCtrl.drillObjectList[frameId])
		{
			for (var id in ddCtrl.drillObjectList[frameId])
			{
				var drillObject = ddCtrl.drillObjectList[frameId][id];
				drillObject.unregister();
			}
			delete ddCtrl.drillObjectList[frameId];
		}
		return true;
	}
	return false;
}

function createSlicer(id, dimId, continuous, dmId, hierarchy, level, pageId, vizType, options)
{
	if (typeof(vizType) == 'undefined' || vizType == null || vizType.length == 0)
	{
		vizType = "Slicer";
	}

	var slicerClass = eval(vizType);
	slicer = new slicerClass(id, null, dimId, null, continuous, dmId, hierarchy, level, pageId, options)
	slicers[slicer.id] = slicer;
}

function createSlicerFromDashboard(id, dimId, continuous, dmId, hierarchy, level, vizType, options)
{
	var dimName = dimId;
	var dm = null;
	var t = 0;
	if (dmId)
	{
		var iDM = 0;
		while (iDM < dmList.length && dm == null)
		{
			var datamodel = dmList[iDM];
			var cubeId = datamodel.cubeId;
			if (dmByPage[ddCtrl.pageID] && dmByPage[ddCtrl.pageID][cubeId])
			{
				var index = cubeId.indexOf("_");
				var cubeId = cubeId.substr(0, index);
				index = datamodel.cubeId.lastIndexOf("_");
				var v = datamodel.cubeId;
				var timestamp = datamodel.cubeId.substr(index + 1);
				if (cubeId == dmId && datamodel.getDimensionById(dimId))
				{
					dimName = datamodel.getDimensionById(dimId).name;
					if (timestamp > t)
					{
						t = timestamp;
						dm = datamodel;
					}
				}
			}
			iDM++;
		}
	}
	var slicer = null;
	var panel = dimPanelList[dimId + continuous];
	if (panel && dm != null && dm.getDimensionById(dimId) != null
			&& dmByPage[ddCtrl.pageID] && dmByPage[ddCtrl.pageID][dm.cubeId])
	{
		if (typeof(vizType) != 'undefined' && vizType != null && vizType.length > 0)
		{
			var slicerClass = eval(vizType);
			slicer = new slicerClass(id, panel, dimId, dimName, continuous, dm, hierarchy, level, ddCtrl.pageID, options);
		}
		else
		{
			slicer = new Slicer(id, panel, dimId, dimName, continuous, dm, hierarchy, level, ddCtrl.pageID, options);
		}
		slicers[slicer.id] = slicer;
		slicer.drawMembers();
		slicer.updateSlicer();
	}
}

function showProperties(flowId)
{	//for admin console communication (tab dashboard editor)
	document.title = "FLOWID:" + flowId;
	try
	{
		window.top.flowid = flowId;
	}
	catch(e) {}
}
function getRefreshedFlowId()
{	//for admin console communication (tab dashboard editor)
	try
	{
		return window.top.flowid;
	}
	catch(e)
	{
		return null;
	}
}
function initRefreshedFlowId()
{	//for admin console communication (tab dashboard editor)
	document.title = "";
	try
	{
		window.top.flowid = "";
	}
	catch(e) {}
}

//TODO
function getSpecificFeature(frameId, name)
{
	var frameElt = document.getElementById(frameId);
	if (frameElt && frameElt.contentWindow
			&& frameElt.contentWindow.chart)
	{
		if (name == 'styleJSON' && frameElt.contentWindow.chart.getDashboardStyle)
		{
			return frameElt.contentWindow.chart.getDashboardStyle();
		}
		else if (name == 'tableLinesJSON' && frameElt.contentWindow.chart.getDashboardTableLines)
		{
			return frameElt.contentWindow.chart.getDashboardTableLines();
		}
	}
	return null;
}

function setSpecificFeature(frameId, name, value)
{
	var frameElt = document.getElementById(frameId);
	if (frameElt)
	{
		var specificFeatures = frameElt.specificFeatures;
		if (!specificFeatures)
		{
			specificFeatures = new Object();
			frameElt.specificFeatures = specificFeatures;
		}
		specificFeatures[name] = value;
	}
}

function getTableColWidth(id)
{
	if (document.getElementById(id)
			&& document.getElementById(id).contentWindow
			&& document.getElementById(id).contentWindow.tbReport
			&& document.getElementById(id).contentWindow.tbReport.getColWidth)
	{
		var colWidth = document.getElementById(id).contentWindow.tbReport.getColWidth() + "";
		return colWidth;
	}
}

//legacy - deprecated
function setTableColWidth(id, colWidth)
{
	if (document.getElementById(id))
	{
		document.getElementById(id).colWidthParam = colWidth;
	}
}

function getChartContentHeight(id)
{
	var frameElt = document.getElementById(id);
	if (frameElt && frameElt.contentWindow
			&& frameElt.contentWindow.chart)
	{
		if (frameElt.contentWindow.chart.getContentHeight)
		{
			return frameElt.contentWindow.chart.getContentHeight();
		}
	}
	return -1;
}

function applyTransparencyToPNG(objId)
{
	var obj = document.getElementById(objId);
	if (navigator.appVersion.indexOf("MSIE 6") > -1 && obj)
	{
		if (obj.currentStyle.backgroundImage.match(/\.png/i) !== null)
		{
			var mode = 'scale';
			var bg = obj.currentStyle.backgroundImage;
			var src = bg.substring(5, bg.length - 2);
			if (obj.currentStyle.backgroundRepeat == 'no-repeat')
			{
				mode = 'crop';
			}
			obj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + src + "', sizingMethod='" + mode + "')";
			obj.style.backgroundImage = 'url(' + shim + ')';
		}
		if (obj.tagName == 'IMG' && obj.src.match(/\.png$/i) !== null)
		{
			var src = obj.src;
			obj.style.width = obj.width + "px";
			obj.style.height = obj.height + "px";
			obj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + src + "', sizingMethod='scale')";
			obj.src = 'x.gif';
		}
	}
}

function initializeDMSels()
{
	dmSelList = [];
	dmList = [];
}

//history
function changeState(histCount)
{
	ddHistory.changeState(histCount);
}

function getState(stateIndex)
{
	return ddHistory.getState(stateIndex);
}

function registerNbFlowsByPage(pages, nbFlows)
{
	nbFlowsToLoadByPage = new Array();
	for (var i = 0; i < pages.length; i++)
	{
		nbFlowsToLoadByPage[pages[i]] = nbFlows[i];
	}
}

function incrementNbFlowsByPage(page)
{
	if (typeof (nbFlowsToLoadByPage) == 'undefined')
	{
		nbFlowsToLoadByPage = new Array();
	}
	if (typeof (nbFlowsToLoadByPage[page]) == 'undefined')
	{
		nbFlowsToLoadByPage[page] = 0;
	}
	nbFlowsToLoadByPage[page]++;
}

function registerNbFlows(pageId, nbFlows)
{
	nbFlowsToLoadByPage[pageId] = nbFlows;
}

function setInitialDashboardState(json)
{
	try
	{
		var dashboardState = eval("(" + json + ")");
		ddHistory.setInitialState(dashboardState);
	}
	catch (e)
	{
	}
}

function clearSelection()
{
	ddHistory.bSaveHistoryState = false;

	//clear selection
	for (dimKey in dimPanelList)
	{
		var dimSelPanel = dimPanelList[dimKey];
		dimSelPanel.selectMemberAll();
		dimSelPanel.updateOnChange = true;
	}

	//clear drill
	for (frameId in drillObjectList)
	{
		for (dimName in drillObjectList[frameId])
		{
			var drillObject = drillObjectList[frameId][dimName];
			drillObject.resetChart();
//			drillObject.drillTo(null);
			drillObject.dmSel.updated = true;
		}
	}

	//refresh documents
	refreshAllDocuments();

	//create new history state
	ddHistory.bSaveHistoryState = true;
	ddHistory.createState(ddCtrl.pageID, true);
}

function resetHistory()
{
	ddHistory.reset();
}

function findDimExplorer(dmSel, dimId)
{
	for (var i = 0; i < dmSel.dimsToExplore.length; i++)
	{
		var dimEx = dmSel.dimsToExplore[i];
		if (dimEx.dim.id == dimId)
			return dimEx;
	}
}

ddCtrl.chartError = function(doc, dm, dmsel, chart, errObj)
{
	if (doc && doc.frameId && charts[doc.frameId])
	{
		var pageId = charts[doc.frameId].pageId;
		if (typeof(nbFlowsToLoadByPage) != 'undefined' && nbFlowsToLoadByPage[pageId])
		{
			nbFlowsToLoadByPage[pageId]--;
			if (nbFlowsToLoadByPage[pageId] == 0)
			{	//all charts are drawn -> set all filters
				fireDashboardEvent("currentPageLoaded", pageId);
			}
		}
		displayChartError(doc, errObj);
		if (ddCtrl.checkSession && (errObj.errorCode == 401 || errObj.errorCode == 403))
		{
			ddCtrl.checkSession();
		}
	}
}

function chartDrawn(doc, dm, dmsel, chart)
{
	if (doc && doc.frameId && charts[doc.frameId])
	{
		var pageId = charts[doc.frameId].pageId;
		if (typeof(nbFlowsToLoadByPage) != 'undefined' && nbFlowsToLoadByPage[pageId])
		{
			nbFlowsToLoadByPage[pageId]--;
			if (nbFlowsToLoadByPage[pageId] == 0)
			{	//all charts are drawn -> set all filters
				fireDashboardEvent("currentPageLoaded", pageId);
			}
		}
	}
}

function initSlicers(pageId)
{
	//important: register this function before commitFilters cause commitFilters refresh initialized slicers
	//find slicers not initialized and find dm with dim to init slicer

	var slicerDateToInit = [];

	for (var slicerId in ddCtrl.slicers)
	{
		var slicer = ddCtrl.slicers[slicerId];
		if (slicer.pageId == pageId && !slicer.initialized)
		{
			var defaultDM = null;
			var datamodel = null;
			for (var iDM = 0; iDM < ddCtrl.dmList.length; iDM++)
			{
				var dm = ddCtrl.dmList[iDM];
				if (ddCtrl.dmByPage[pageId] && ddCtrl.dmByPage[pageId][dm.cubeId])
				{
					var dim = dm.getDimensionById(slicer.dimId);
					if (dim)
					{
						var dmId = dm.cubeId.substr(0, dm.cubeId.indexOf("_"));
						if (dmId == slicer.dmId)
						{
							if (typeof(slicer.oldOrLast) != 'undefined' && slicer.oldOrLast != null && slicer.oldOrLast != "")
							{
								if (datamodel == null)
								{
									datamodel = dm;
								}
								else
								{
									var curTS = dm.cubeId.split('_')[2];
									var dmTS = datamodel.cubeId.split('_')[2];
									if (slicer.oldOrLast == "lastest")
									{
										if (curTS > dmTS)
										{
											datamodel = dm;
										}
									}
									else if (slicer.oldOrLast = "oldest")
									{
										if (curTS < dmTS)
										{
											datamodel = dm;
										}
									}
								}
							}
							else
							{
								var panel = ddCtrl.dimPanelList[slicer.dimId+slicer.continuous];
								if (panel)
								{
									slicer.init(panel, dm);
									if (!slicer.dim.time)
									{
										slicer.drawMembers();
									}
									else
									{
										slicerDateToInit.push(slicer);
									}
									break;
								}
							}
						}
						else
						{
							datamodel = dm;
						}
					}
				}
			}
			if (!slicer.initialized && datamodel != null)
			{
				var panel = ddCtrl.dimPanelList[slicer.dimId+slicer.continuous];
				if (panel)
				{
					slicer.init(panel, datamodel);
					if (!slicer.dim.time)
					{
						slicer.drawMembers();
					}
					else
					{
						slicerDateToInit.push(slicer);
					}
				}
			}
		}
	}

	for (var i = 0; i < slicerDateToInit.length; i++)
	{
		var slicer = slicerDateToInit[i];
		slicer.findSlicersDate();
		slicer.drawMembers();
	}
}
ddCtrl.addCurrentPageLoadListener(initSlicers);

function commitFilters()
{
	for (dimSelPanel in dimSelChanged)
	{
		ddHistory.bSaveHistoryState = false;
		dimSelChanged[dimSelPanel].dimSelChangeHandler();
		ddHistory.bSaveHistoryState = true;
	}
	dimSelChanged = {};

	refreshAllDocuments();
}
ddCtrl.addCurrentPageLoadListener(commitFilters);


function resizeFrame(frameId, width, height)
{
	var fObj = document.getElementById(frameId);
	if (fObj)
	{
		if (isSafariMobile() && fObj.contentWindow && fObj.contentWindow.resize)
		{
			fObj.contentWindow.resize(width, height);
		}
	}
}

function openWindow(width, height)
{
	if (openWindowInDashboard)
	{
		/*var id = openWindowInDashboard(width, height);
    var elt = document.getElementById(id);
    var divText = document.createElement("div");
    setStyle(divText, "background-color:red");
    var txt = document.createTextNode("Ceci est un test");
    divText.appendChild(txt);
    elt.appendChild(divText);
    var divFlow = document.createElement("div");
    divFlow.id = "div_d9158fca";
    elt.appendChild(divFlow);
    openFlowInElement(divFlow.id, 'd9158fca', 500, 250);*/
	}
}

function getMembers(cubeId, dimId, h, l, formated, members)
{
	if (cubeId != null)
	{
		var dm = ddCtrl.getDataModel(cubeId);
		var dim = dm.getDimensionById(dimId);
		if (dim)
		{
			if (h != -1 && l != -1)
			{
				var hierarchy = dim.hierarchies[h];
				if (hierarchy && hierarchy.levels[l])
				{
					var level = hierarchy.levels[l];
					level.prepare(dim);
					var groups = level.groups;
					for (var iGrp = 0; iGrp < groups.length; iGrp++)
					{
						var group = groups[iGrp];
						var member = group.id;
						if (formated)
						{
							if (level.format)
								member = formatNum(member, level.format);
							else if (group.caption)
								member = group.caption;
						}
						members.push(member + "");
					}
				}
				else
				{
					for (var iMbr = 0; iMbr < dim.members.length; iMbr++)
					{
						var member = dim.members[iMbr];
						if (formated)
						{
							if (dim.format)
								member = formatNum(member, dim.format);
							else if (dim.captionDim && dim.captions[iMbr])
								member = dim.captions[iMbr];
						}
						members.push(member + "");
					}
				}
			}
			else
			{
				for (var iMbr = 0; iMbr < dim.members.length; iMbr++)
				{
					var member = dim.members[iMbr];
					if (formated)
					{
						if (dim.format)
							member = formatNum(member, dim.format);
						else if (dim.captionDim && dim.captions[iMbr])
							member = dim.captions[iMbr];
					}
					members.push(member + "");
				}
			}
		}
		return members;
	}
	else
	{
		var dimPanel = null;
		if (dimPanelList[dimId+'true'])
			dimPanel = dimPanelList[dimId+'true'];
		else if (dimPanelList[dimId+'false'])
			dimPanel = dimPanelList[dimId+'false'];
		if (dimPanel)
		{
			dimPanel.setLevel(h, l);
			var format = dimPanel.getComboMembers().format;
			dimPanelMembers = dimPanel.getMembersVal();
			if (formated)
				dimPanelMembers = dimPanel.getMembersFormated();
			for (var i = 0; i < dimPanelMembers.length; i++)
			{
				if (dimPanelMembers[i] != 'All' && dimPanelMembers[i] != Properties[getLocale()]['All'])
				{
					members.push(dimPanelMembers[i] + "");
				}
			}
			return members;
		}
	}
}

ddCtrl._callrest = function(query, onload_CB)
{
	var url = ddCtrl.servletAPIPath + "?" + query + "&nocache=" + Math.random();
	var xmlRequest = null;
	if (window.XMLHttpRequest)
	{
		xmlRequest = new XMLHttpRequest();
		try
		{
			xmlRequest.overrideMimeType("text/plain");
		}
		catch (e)
		{
		};
	}
	else if (window.ActiveXObject)
	{
		xmlRequest = new ActvieXObject("Microsoft.XMLHTTP");
	}

	xmlRequest.open("GET", url, onload_CB ? true: false);
	xmlRequest.send(null);

	if (onload_CB)
	{
		xmlRequest.onreadystatechange = function()
		{
			if (xmlRequest.readyState == 4)
			{
				var text = xmlRequest.responseText;
				xmlRequest.onreadystatechange = new Function;
				onload_CB(text);
				xmlRequest = null;
			}
		};
	}
	else
	{
		return xmlRequest.responseText;
	}
	return null;
}

function executeSelection(selJson)
{
	try
	{
		var selection = eval("(" + selJson + ")");
		if (selection.filters)
		{
			ddCtrl.beginSelection();
			for (var i = 0; i < selection.filters.length; i++)
			{
				var filter = selection.filters[i];
				if (filter.members && filter.members.length > 0)
				{
					var fO = new FilterOperand(filter.dimension, filter.members, filter.hierarchy, filter.level);
					ddCtrl.filter(fO);
				}
				else if (typeof(filter.min) != "undefined" && typeof(filter.max) != "undefined")
				{
					ddCtrl.setFilterMinMax(filter.dimension, filter.min, filter.max);
				}
			}
			ddCtrl.commitSelection();
		}
	}
	catch (e)
	{
	}
}

ddCtrl.showChart = function(portletId)
{
	var bDrawWidget = false;
	var doc = document.getElementById(portletId);
	if (!doc)
		return;

	var widget = null;
	var page = null;
	if (ddCtrl.widgetsByPage[getCurrentPage()] && ddCtrl.widgetsByPage[getCurrentPage()][portletId])
	{
		widget = ddCtrl.widgetsByPage[getCurrentPage()][portletId];
		bDrawWidget = true;
		page = getCurrentPage();
	}
	else
	{	//find widget in other pages
		for (var pageid in widgetsByPage)
		{
			var widgetList = widgetsByPage[pageid];
			for (var widgetId in widgetList)
			{
				if (widgetId == portletId)
				{
					widget = widgetList[portletId];
					page = pageid;
					break;
				}
			}
		}
	}

	if (widget == null || !widget.hidden)
		return;

	widget.hidden = false;
	showElement(doc);
	if (isIE() || isIE11())
	{
		doc.style.zIndex = widget.zIndex;
	}
	var frameId = "frame_" + portletId;
	var frame = document.getElementById(frameId);
	if (frame)
	{
		showElement(frame);
	}	
	if (ddCtrl.charts[frameId])
	{
		var svgdoc = ddCtrl.charts[frameId].getContentDocument();
		if (svgdoc)
		{
			if (bDrawWidget)
			{
				ddCtrl.legendManager.updateChartLegend(frameId);
				try
				{
					svgdoc.refreshDM();
				}
				catch(e)
				{
					//doc probably not yet loaded
				}
			}
		}
	}

	//find childs widgets
	var childWidgets = ddCtrl.getAllChildWidgets(page, widget.portletId, []);
	for (var i = 0; i < childWidgets.length; i++)
	{
		var curWidget = childWidgets[i];
		var widgetId = curWidget.portletId;
		if (!curWidget.hidden)
		{
			var doc = document.getElementById(widgetId);
			if (doc)
			{
				showElement(doc);
				if (isIE() || isIE11())
				{
					doc.style.zIndex = widget.zIndex;
				}
				var frameId = "frame_" + widgetId;
				var frame = document.getElementById(frameId);
				if (frame)
				{
					showElement(frame);
				}
				if (ddCtrl.charts[frameId])
				{
					var svgdoc = ddCtrl.charts[frameId].getContentDocument();
					ddCtrl.legendManager.updateChartLegend(frameId);
					try
					{
						svgdoc.refreshDM();
					}
					catch(e)
					{
						//doc probably not yet loaded
					}
				}
			}
		}
	}

	buildCombos();
	ddCtrl.fireWidgetVisibleEvent(portletId);
}

ddCtrl.hideChart = function(portletId)
{
	var doc = document.getElementById(portletId);
	if (!doc)
		return;

	var widget = null;
	var page = null;
	if (ddCtrl.widgetsByPage[getCurrentPage()] && ddCtrl.widgetsByPage[getCurrentPage()][portletId])
	{
		widget = ddCtrl.widgetsByPage[getCurrentPage()][portletId];
		page = getCurrentPage();
	}
	else
	{
		for (var pageid in widgetsByPage)
		{ //find widget in other pages
			var widgetList = widgetsByPage[pageid];
			for (var widgetId in widgetList)
			{
				if (widgetId == portletId)
				{
					widget = widgetList[portletId];
					page = pageid;
					break;
				}
			}
		}
	}

	if (widget == null)
		return;

	widget.hidden = true;
	hideElement(doc);
	if (isIE() || isIE11())
	{
		doc.style.zIndex = 0;
	}
	var frameId = "frame_" + portletId;
	var frame = document.getElementById(frameId);
	if (frame)
	{
		hideElement(frame);
	}
	if (ddCtrl.charts[frameId])
	{
		var svgdoc = ddCtrl.charts[frameId].getContentDocument();
		if (svgdoc)
		{
			ddCtrl.legendManager.updateChartLegend(frameId);
		}
	}

	//find childs widgets
	var childWidgets = ddCtrl.getAllChildWidgets(page, widget.portletId, []);
	for (var i = 0; i < childWidgets.length; i++)
	{
		var curWidget = childWidgets[i];
		var widgetId = curWidget.portletId;
		if (!curWidget.hidden)
		{
			var doc = document.getElementById(widgetId);
			if (doc)
			{
				hideElement(doc);
				if (isIE() || isIE11())
				{
					doc.style.zIndex = 0;
				}
				var frameId = "frame_" + widgetId;
				var frame = document.getElementById(frameId);
				if (frame)
				{
					hideElement(frame);
				}
				if (ddCtrl.charts[frameId])
				{
					hideElement(frame);
					ddCtrl.legendManager.updateChartLegend(frameId);
				}
			}
		}
	}

	buildCombos();
	ddCtrl.fireWidgetHiddenEvent(portletId);
}

ddCtrl.widgetIsHidden = function(portletId)
{
	if (ddCtrl.urlParams["mode"] == "editor")
	{
		return false;
	}

	var widget = null;
	if (ddCtrl.widgetsByPage)
	{
		if (ddCtrl.widgetsByPage[ddCtrl.pageID] && ddCtrl.widgetsByPage[ddCtrl.pageID][portletId])
		{
			widget = ddCtrl.widgetsByPage[ddCtrl.pageID][portletId];
		}
		else if (ddCtrl.widgetsByPage["foreground_foreground"] && ddCtrl.widgetsByPage["foreground_foreground"][portletId])
		{
			widget = ddCtrl.widgetsByPage["foreground_foreground"][portletId];
		}
	}
	if (widget)
	{
		if (widget.hidden)
		{
			return true;
		}
		else if (widget.portletContainerId)
		{
			var bHidden = widget.hidden;
			while (widget.portletContainerId && !bHidden)
			{
				widget = ddCtrl.widgetsByPage[ddCtrl.pageID][widget.portletContainerId];
				bHidden = widget.hidden;
			}
			return bHidden;
		}
		else
		{
			return false;
		}
	}
	return false;
}

ddCtrl.getAllChildWidgets = function(page, portletId, childs)
{
	for (var widgetId in widgetsByPage[page])
	{
		var curWidget = widgetsByPage[page][widgetId];
		if (curWidget.portletContainerId == portletId)
		{
			childs.push(curWidget);
			ddCtrl.getAllChildWidgets(page, curWidget.portletId, childs);
		}
	}
	return childs;
}

ddCtrl.getWidget = function(portletId)
{
	for (var page in ddCtrl.widgetsByPage)
	{
		for (var widgetId in ddCtrl.widgetsByPage[page])
		{
			if (widgetId == portletId)
			{
				return widgetsByPage[page][widgetId];
			}
		}
	}
	return null;
}

/* public SDK */
ddCtrl.chartIsHidden = function(portletId)
{
	if (ddCtrl && typeof(ddCtrl.getWidget) != "undefined")
	{
		var widget = ddCtrl.getWidget(portletId);
		if (widget && (ddCtrl.widgetIsHidden(portletId) || widget.hiddenLegend))
		{
			return true;
		}
	}
	return false;
}

ddCtrl.genTemplatePPT = function(flowId)
{
	ddCtrl.checkSession();

	if (openWindowWithIdInDashboard)
	{
		ddCtrl.__flowId = flowId;
		var windowElt = document.getElementById('gen_template_ppt_window');
		if (windowElt == null)
		{
			var id = openWindowWithIdInDashboard(300, 150, 'gen_template_ppt_window');
			windowElt = document.getElementById(id);
		}
		else
		{
			windowElt.style.visibility = "visible";
		}
		var frameElt = document.getElementById('gen_template_ppt_frame');
		if (frameElt == null)
		{
			frameElt = document.createElement("iframe");
			frameElt.id = 'gen_template_ppt_frame';
			setStyle(frameElt, "visibility: inherit; border: none; width: 280px; height: 120px");
			windowElt.appendChild(frameElt);
		}
		frameElt.src = './staticwebcontent/charts/template/dml/template-docbuilder-dashboard.html';
		setTimeout("closeWindow('gen_template_ppt_window')", 2000);
	}
}

ddCtrl.genTemplateXLS = function(flowId)
{
	ddCtrl.checkSession();

	if (openWindowWithIdInDashboard)
	{
		ddCtrl.__flowId = flowId;
		var windowElt = document.getElementById('gen_template_excel_window');
		if (windowElt == null)
		{
			var id = openWindowWithIdInDashboard(300, 150, 'gen_template_excel_window');
			windowElt = document.getElementById(id);
		}
		else
		{
			windowElt.style.visibility = "visible";
		}
		var frameElt = document.getElementById('gen_template_excel_frame');
		if (frameElt == null)
		{
			frameElt = document.createElement("iframe");
			frameElt.id = 'gen_template_excel_frame';
			setStyle(frameElt, "visibility: inherit; border: none; width: 280px; height: 120px");
			windowElt.appendChild(frameElt);
		}
		frameElt.src = './staticwebcontent/charts/template/xls/template-docbuilder-dashboard.html';
		setTimeout("closeWindow('gen_template_excel_window')", 2000);
	}
}

ddCtrl.exportAsPDF = function(flowId)
{
	ddCtrl.doExport(flowId, "PDF");
}

ddCtrl.exportAsPPT = function(flowId)
{
	ddCtrl.doExport(flowId, "PPT");
}

ddCtrl.exportAsXLS = function(flowId)
{
	ddCtrl.doExport(flowId, "XLS");
}

ddCtrl.exportAsXLSWithoutStyles = function(flowId)
{
	//same template as XLS
	ddCtrl.doExport(flowId, "XLSWITHOUTSTYLES");
}

ddCtrl.exportAsCSV = function(flowId)
{
	ddCtrl.doExport(flowId, "CSV");
}

ddCtrl.doExport = function(frameId, type)
{
	if (openWindowWithIdInDashboard)
	{
		var chartHandle = ddCtrl.charts[frameId];
		if (!chartHandle)
		{
			//legacy : frameId is a flowId
			for (id in ddCtrl.charts)
			{
				var cHandle = ddCtrl.charts[id];
				if (cHandle.flowId == frameId)
				{
					chartHandle = cHandle;
					break;
				}
			}
		}

		if (chartHandle)
		{
			var chart = ddCtrl.getChart(chartHandle.id);
			ddCtrl.__chart = chart;
			ddCtrl.__flowId = chartHandle.flowId;
			ddCtrl.__exportFormat = type;

			var windowId = type.toLowerCase() + "_" + chartHandle.id;
			var windowElt = document.getElementById(windowId);
			if (windowElt == null)
			{
				var id = openWindowWithIdInDashboard(300, 150, windowId);
				windowElt = document.getElementById(id);
			}
			else
			{
				windowElt.style.visibility = "visible";
			}
			var frameElt = document.getElementById('export_frame');
			if (frameElt == null)
			{
				frameElt = document.createElement("iframe");
				frameElt.id = 'export_frame';
				frameElt.className = "iframe";
				windowElt.appendChild(frameElt);
			}

			var template = null;
			if (type == "TOFLOW")
			{
				template = "staticwebcontent/charts/template/flow/template-dashboard.html";
			}
			else
			{
				template = ddCtrl.getChartTemplate(chartHandle.flowId, type);
			}
			if (template != null)
			{
				frameElt.src = template;
			}
		}
	}
}

ddCtrl.exportCurrentPageAsPPT = function()
{
  ddCtrl.exportPageAsPPT(getCurrentRole(), getCurrentPage());
}

ddCtrl.exportPageAsPPT = function(roleId, pageId)
{
	ddCtrl.checkSession();

	if (openWindowWithIdInDashboard)
	{
		ddCtrl.__roleId = roleId;
		ddCtrl.__pageId = pageId;
		var windowElt = document.getElementById('export_page_ppt_window');
		if (windowElt == null)
		{
			var id = openWindowWithIdInDashboard(300, 150, 'export_page_ppt_window');
			windowElt = document.getElementById(id);
		}
		else
		{
			windowElt.style.visibility = "visible";
		}
		var frameElt = document.getElementById('export_page_ppt_frame');
		if (frameElt == null)
		{
			frameElt = document.createElement("iframe");
			frameElt.id = 'export_page_ppt_frame';
			frameElt.className = "iframe";
			windowElt.appendChild(frameElt);
		}
		frameElt.src = './staticwebcontent/charts/template/dml/template-docbuilderpage-dashboard.html';
		setTimeout("closeWindow('export_page_ppt_window')", 2000);
	}
}

ddCtrl.exportCurrentPageAsPPTTemplate = function()
{
  ddCtrl.exportPageAsPPTTemplate(getCurrentRole(), getCurrentPage());
}

ddCtrl.exportPageAsPPTTemplate = function(roleId, pageId)
{
	ddCtrl.checkSession();
	
	if (openWindowWithIdInDashboard)
	{
		ddCtrl.__roleId = roleId;
		ddCtrl.__pageId = pageId;
		var windowElt = document.getElementById('export_page_ppttemplate_window');
		if (windowElt == null)
		{
			var id = openWindowWithIdInDashboard(300, 150, 'export_page_ppttemplate_window');
			windowElt = document.getElementById(id);
		}
		else
		{
			windowElt.style.visibility = "visible";
		}
		var frameElt = document.getElementById('export_page_ppttemplate_frame');
		if (frameElt == null)
		{
			frameElt = document.createElement("iframe");
			frameElt.id = 'export_page_ppttemplate_frame';
			frameElt.className = "iframe";
			windowElt.appendChild(frameElt);
		}
		frameElt.src = './staticwebcontent/charts/template/dml/template-docbuilderpagetemplate-dashboard.html';
		setTimeout("closeWindow('export_page_ppttemplate_window')", 2000);
	}
}

ddCtrl.logout = function()
{
	logoutDashboard();
}

ddCtrl.checkSession = function()
{
	checkDashboardSession();
}

ddCtrl.openDocument = function(serverName, fileName)
{
	var url = ddCtrl.servletFilePath + "?item=" + fileName + "&serverId=" + serverName;
	window.open(url);
}

ddCtrl.openDocumentInWindow = function(serverName, fileName)
{
	if (openWindowWithIdInDashboard)
	{
		var windowId = 'open_document_' + fileName;
		var id = openWindowWithIdInDashboard(300, 150, windowId);
		var windowElt = document.getElementById(id);
		var frameElt = document.createElement("iframe");
		frameElt.className = "iframe";
		var divElt = document.createElement("div");
		setStyle(divElt, "width: 100%; height: 80px; line-height: 80px; text-align: center; vertical-align: middle");
		divElt.appendChild(document.createTextNode("Chargement du fichier ...."));
		windowElt.appendChild(divElt);
		windowElt.appendChild(frameElt);
		frameElt.src = ddCtrl.servletFilePath + "?item=" + fileName + "&serverId=" + serverName;
		setTimeout(function() { closeWindow(windowId); }, 2000);
	}
}

ddCtrl.openFlowInWindowWithFilter = function(flowId, width, height/*, dimId..., mbrId...*/)
{
	if (!ddCtrl.filtersForFlowInWindow)
	{
		ddCtrl.filtersForFlowInWindow = new Object();
	}
	else if (ddCtrl.filtersForFlowInWindow["frame_popup_" + flowId])
	{
		delete ddCtrl.filtersForFlowInWindow["frame_popup_" + flowId];
	}

	if (arguments.length > 3)
	{
		//arguments may contains dimId/mbrId couples
		var i = 3;
		while (i < arguments.length)
		{
			var dimId = arguments[i];
			var mbrId = arguments[i+1];
			if (dimId !== undefined && dimId != null && mbrId !== undefined && mbrId != null)
			{
				var filter = null;
				if (typeof(mbrId) == 'string')
				{
					var h = null;
					var l = null;
					var memberFormated = null;
					if (ddCtrl.dimsToFilter && ddCtrl.dimsToFilter[dimId])
					{
						var fOperand = ddCtrl.dimsToFilter[dimId];
						h = fOperand.h;
						l = fOperand.l;
						memberFormated = fOperand.memberFormated;
						ddCtrl.dimsToFilter[dimId] = null;
					}
					filter = new FilterOperand(dimId, mbrId, h, l, memberFormated);
				}
				else
				{
					filter = mbrId;
				}
				if (!ddCtrl.filtersForFlowInWindow["frame_popup_" + flowId])
				{
					ddCtrl.filtersForFlowInWindow["frame_popup_" + flowId] = new Object();
				}
				ddCtrl.filtersForFlowInWindow["frame_popup_" + flowId][dimId] = filter;
			}
			i = i+2;
		}
	}

	openFlowInWindow(flowId, width, height);
}

function closeWindow(windowId)
{
	var windowElt = document.getElementById(windowId);
	if (windowElt && windowElt.parentElement)
	{
		windowElt.style.visibility = "hidden";	// don't remove the element which contains iframe (including form)
																						// or the http transaction will be interrupted
  }
}

function setComboOptions(json)
{
	try
	{
		var combos = eval("(" + json + ")");
		for (var i = 0; i < combos.length; i++)
		{
			var comboOptions = combos[i];
			var obj = new Object();
			obj.roleid = comboOptions.roleid;
			obj.sort = comboOptions.sort;
			obj.combos = new Array();
			for (var j = 0; j < comboOptions.combos.length; j++)
			{
				var combo = comboOptions.combos[j];
				obj.combos[combo.id] = combo;
			}
			ddCtrl.comboOptionsByRole[comboOptions.roleid] = obj;
		}
	}
	catch (e)
	{
	}
}

function sortCombos(a, b)
{
	var role = ddCtrl.getCurrentRole();
	var comboOpts = ddCtrl.comboOptionsByRole[role];
	if (comboOpts)
	{
		var sort = comboOpts.sort;
		if (sort == 0)
		{
			var combo1 = dimPanelList[a];
			var combo2 = dimPanelList[b];
			if (combo1 && combo2)
			{
				return combo1.name > combo2.name ? 1 : -1;
			}
			else
			{
				return a > b ? 1 : -1;
			}
		}
		else if (sort == 1)
		{
			var combo1 = dimPanelList[a];
			var combo2 = dimPanelList[b];
			if (combo1 && combo2)
			{
				return combo1.name > combo2.name ? -1 : 1;
			}
			else
			{
				return a > b ? -1 : 1;
			}
		}
		else if (sort == 2)
		{
			var combo1 = comboOpts.combos[dimPanelList[a].id];
			var combo2 = comboOpts.combos[dimPanelList[b].id];
			if (combo1 && combo2)
			{
				return combo1.pos - combo2.pos;
			}
			else if (!combo1 && !combo2)
			{
				return a > b ? 1 : -1;
			}
			else if (!combo1)
			{
				return 1;
			}
			else if (!combo2)
			{
				return -1;
			}
		}
	}
	else
	{
		return a > b ? 1 : -1;
	}
}

function getComboAttribute(comboName, attribute, defaultValue)
{
	var role = ddCtrl.getCurrentRole();
	var comboOpts = ddCtrl.comboOptionsByRole[role];
	if (comboOpts)
	{
		var combo = comboOpts.combos[comboName];
		if (combo)
		{
			return combo[attribute];
		}
	}
	return defaultValue;
}

function formatValue(value, formatId)
{
	for (var i = 0; i < ddCtrl.dmList.length; i++)
	{
		var dm = ddCtrl.dmList[i];
		var format = dm.formatList[formatId];
		if (format)
		{
			var valF = formatNum(value, format);
			return valF;
		}
	}
	return value + '';
}

ddCtrl.addChartModelReadyListener(
		function(doc, dm, dmsel, chart)
		{
			if (ddCtrl.charts[chart.frameId].forceChartType)
			{
				chart.type = ddCtrl.charts[chart.frameId].forceChartType;
				delete ddCtrl.charts[chart.frameId].forceChartType;
			}
			if (ddCtrl.charts[chart.frameId].forceDmsel)
			{
				dmsel.clear();
				ddCtrl.charts[chart.frameId].forceDmsel.copyTo(dmsel);
				delete ddCtrl.charts[chart.frameId].forceDmsel;
			}
		});

function changeTemplate(frameId, forceVizId, forceDmsel)
{
	if (!ddCtrl.vizRepo)
	{
		include_js('staticwebcontent/charts/template/scripts/vizrepo.js', true);
	}
	if (ddCtrl.vizRepo)
	{
		var vizDef = ddCtrl.vizRepo['' + forceVizId];
		if (vizDef)
		{
			var version = "";
			if (ddCtrl.version)
			{
				version = "-" + ddCtrl.version;
			}
			var template = vizDef.template;
			var bForceHTML = vizDef.html;
			if (bForceHTML)
			{
				template = "./staticwebcontent/charts/template/html/" + template + "-dashboard" + version + ".html";
			}
			else
			{
				if (isSVG())
				{
					//check if iphone
					if (isIPhone() || isIPod())
					{
						template = "./staticwebcontent/charts/template/svg/" + template + "-iphone.svg";
					}
					else
					{
						template = "./staticwebcontent/charts/template/svg/" + template + "-dashboard" + version + ".svg";
					}
				}
				else if (isVML())
				{
					template = "./staticwebcontent/charts/template/vml/" + template + "-dashboard" + version + ".html";
				}
				else if (isCanvas())
				{
					template = "./staticwebcontent/charts/template/canvas/" + template + "-dashboard.html";
				}
			}
			ddCtrl.charts[frameId].forceChartType = vizDef.chartclass;
			ddCtrl.charts[frameId].forceDmsel = forceDmsel;
			document.getElementById(ddCtrl.charts[frameId].id).src = template;
		}
	}
}

ddCtrl.createFilter = function(id, pageId, options, hiddenDimensions, bFillNow)
{
	new Filter(id, pageId, options, hiddenDimensions, bFillNow);
}

ddCtrl.createGlobalFilter = function(id, pageId, bFillNow)
{
	new GlobalFilter(id, pageId, bFillNow);
}

ddCtrl.createVariable = function(id, varName, vizType, hideVarName, pageId)
{
	if (/*typeof(ddCtrl.ddVars[id]) == "undefined" &&*/ document.getElementById(id) != null)
	{
		if (vizType == "slider")
		{
			ddCtrl.ddVars[id] = new DDVarSlider(id, varName, vizType, hideVarName, pageId);
		}
		else if (vizType == "verticalslider")
		{
			ddCtrl.ddVars[id] = new DDVarSliderVertical(id, varName, vizType, hideVarName, pageId);
		}
		else if (vizType == "textfield")
		{
			ddCtrl.ddVars[id] = new DDVarTextField(id, varName, vizType, hideVarName, pageId);
		}
		else if (vizType == "spinner")
		{
			ddCtrl.ddVars[id] = new DDVarSpinner(id, varName, vizType, hideVarName, pageId);
		}
		else if (vizType == "combo")
		{
			ddCtrl.ddVars[id] = new DDVarCombo(id, varName, vizType, hideVarName, pageId);
		}
		else if (vizType == "verticallist")
		{
			ddCtrl.ddVars[id] = new DDVarListVertical(id, varName, vizType, hideVarName, pageId);
		}
		else if (vizType == "horizontallist")
		{
			ddCtrl.ddVars[id] = new DDVarListHorizontal(id, varName, vizType, hideVarName, pageId);
		}
	}
}
