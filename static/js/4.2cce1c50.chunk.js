(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{274:function(e,n,t){"use strict";var a=t(278);n.a=a.a},275:function(e,n,t){"use strict";t.d(n,"a",function(){return i}),t.d(n,"b",function(){return c});var a=t(1),r=t.n(a),o=(t(276),"red-green"),i="orange-blue";function c(e){return r.a.createElement("label",{className:"switch ".concat(e.disabled?"disabled":"")},r.a.createElement("input",{type:"checkbox",id:"togBtn",onChange:function(n){e.onChange(n.target.checked)},defaultChecked:e.isOnByDefault}),r.a.createElement("div",{className:"slider round ".concat(e.colorScheme?e.colorScheme:o)},r.a.createElement("span",{className:"off"},e.value1),r.a.createElement("span",{className:"on"},e.value2)))}c.defaultProps={value1:"",value2:"",colorScheme:o,isOnByDefault:!1,disabled:!1}},276:function(e,n,t){},278:function(e,n,t){"use strict";t.d(n,"a",function(){return s});var a=t(49),r=t(45),o=t(78);function i(){var e=Object(a.a)(["\n  background-color: ",";\n  border: none;\n  color: ",";\n  padding: 15px 32px;\n  text-align: center;\n  text-decoration: none;\n  display: inline-block;\n  font-size: 16px;\n  border-radius: ","px;\n  font-weight: 500;\n"]);return i=function(){return e},e}var c={regular:o.a.colorAccent1,warning:o.a.colorAccent2,error:o.a.colorAccent3},s=r.c.button(i(),function(e){return e.colorType?c[e.colorType]:o.a.colorAccent1},o.a.colorMainText,function(e){return e.withRoundedCorners?3:0})},279:function(e,n,t){"use strict";t.d(n,"a",function(){return s}),t.d(n,"b",function(){return l});var a=t(49),r=t(45);function o(){var e=Object(a.a)([""]);return o=function(){return e},e}function i(){var e=Object(a.a)(["\n  text-overflow: ellipsis;\n"]);return i=function(){return e},e}function c(){var e=Object(a.a)(["\n  position: relative;\n  width: 240px;\n  height: 40px;\n  margin: 20px 0;\n  flex-grow: 1;\n  max-width: 300px;\n"]);return c=function(){return e},e}var s=r.c.div(c()),l=(r.c.input(i()),r.c.label(o()))},280:function(e,n,t){},285:function(e,n,t){"use strict";t.d(n,"b",function(){return o}),t.d(n,"c",function(){return i}),t.d(n,"d",function(){return c}),t.d(n,"a",function(){return s});var a=t(13),r=t(53),o=function(e){return Object(a.action)(r.b,e)},i=function(){return Object(a.action)(r.c)},c=function(){return Object(a.action)(r.d)},s=function(e){return Object(a.action)(r.a,e)}},286:function(e,n,t){"use strict";t.d(n,"a",function(){return c});var a=t(64),r=t(1),o=t.n(r),i=t(279);t(280);function c(e){e.placeholder;var n=Object(a.a)(e,["placeholder"]);return o.a.createElement(i.a,null,o.a.createElement("input",Object.assign({type:"number",value:e.value,onChange:e.onChange,className:"effect-20",required:!0},n)),o.a.createElement(i.b,null,e.placeholder),o.a.createElement("span",{className:"focus-border"},o.a.createElement("i",null)))}},290:function(e,n,t){e.exports={CenterMarker:"styles_CenterMarker__136W5",ParkingsControlButtonsContainer:"styles_ParkingsControlButtonsContainer__1wXj9",LoadParkingsButton:"styles_LoadParkingsButton__39lc2",CreateNewParkingButton:"styles_CreateNewParkingButton__aystF",ClearAllFreeSlotsButton:"styles_ClearAllFreeSlotsButton__2xZxK",ClearVisibleFreeSlotsButton:"styles_ClearVisibleFreeSlotsButton__ZVvwS",NoParkingsWarning:"styles_NoParkingsWarning__3h16Y"}},303:function(e,n,t){e.exports={MapWrapper:"Map_MapWrapper__3dhGH"}},316:function(e,n,t){e.exports={SidebarContainer:"Sidebar_SidebarContainer__2-n7-",SidebarContainerOpened:"Sidebar_SidebarContainerOpened__3Cppy",SidebarContainerClosed:"Sidebar_SidebarContainerClosed__25mhs",OpenSidebarButton:"Sidebar_OpenSidebarButton__3jnLr",CloseSidebarButton:"Sidebar_CloseSidebarButton__37F7t"}},318:function(e,n,t){e.exports=t.p+"static/media/magnifier.2931e6af.svg"},319:function(e,n){e.exports="data:image/png;base64,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"},320:function(e,n,t){e.exports={CursorMapCenterContainer:"CursorMapCenter_CursorMapCenterContainer__tVQh6",magnifierPulse:"CursorMapCenter_magnifierPulse__1FofQ",pulse:"CursorMapCenter_pulse__2Kuja",zoomInMessage:"CursorMapCenter_zoomInMessage__2_9g8",YourMarkerImage:"CursorMapCenter_YourMarkerImage__3MkkI"}},322:function(e,n,t){},324:function(e,n,t){e.exports={PopupContainer:"SelectedParkingPopup_PopupContainer__32XzO",PopupCloseButton:"SelectedParkingPopup_PopupCloseButton__ILsdw"}},329:function(e,n,t){"use strict";t.r(n);var a=t(1),r=t.n(a),o=t(12),i=t(28),c=t(35),s=t(10),l=t(50),u=t(11),p=t(36),d=t(7),g=t(326),m=t(281),A=t(19),h=t(108),f=a.createContext(null),b=function(e){return function(n){return a.createElement(f.Consumer,null,function(t){return a.createElement(e,Object.assign({MapboxMap:t},n))})}},k=t(303),P=t(31),C=function(e){function n(e){var t;return Object(i.a)(this,n),(t=Object(s.a)(this,Object(l.a)(n).call(this,e))).onMoveEnd=function(e){var n=e.getCenter(),a=n.lat,r=n.lng;t.props.reCenter(a,r)},t.onMapLoad=function(e){t.setState(function(){return{MapboxMapRef:e}}),t.props.onMapLoad(e)},t.onZoomEnd=function(e){t.props.onZoomEnd(e)},t.state={center:[e.centerLon,e.centerLat],zoomLevel:[P.e],MapboxMapRef:null},t}return Object(u.a)(n,e),Object(c.a)(n,[{key:"componentWillReceiveProps",value:function(e,n){(this.props.centerLat!==e.centerLat||this.props.centerLon!==e.centerLon)&&this.setState({center:[e.centerLon,e.centerLat]}),this.props.zoomLevel!==e.zoomLevel&&this.setState({zoomLevel:[e.zoomLevel]})}},{key:"render",value:function(){return r.a.createElement("div",{className:k.MapWrapper},r.a.createElement(v,{style:n.stylesUrl,containerStyle:n.mapStyle,center:this.state.center,zoom:this.state.zoomLevel,onMoveEnd:this.onMoveEnd,onStyleLoad:this.onMapLoad,onZoomEnd:this.onZoomEnd},r.a.createElement(f.Provider,{value:this.state.MapboxMapRef},this.state.MapboxMapRef?this.props.children:r.a.createElement(h.a,null))))}}]),n}(r.a.PureComponent);C.mapToken="pk.eyJ1IjoiY2xvdWRtYWRlIiwiYSI6ImNqcG56a3VoZTA0dTc0OHF0d21rOTk0eHoifQ.sB4G-WjZ1JdB_fqAaPeULQ",C.stylesUrl="mapbox://styles/mapbox/dark-v9",C.defaultProps={},C.mapStyle={width:"100%",height:"100%"};var v=Object(m.e)({accessToken:C.mapToken}),E=C,y=t(40),L=t(66),O=t(13),S=function(e){return Object(O.action)(P.d,e)},j=function(){return Object(O.action)(P.a)},w=function(e){function n(){var e,t;Object(i.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(t=Object(s.a)(this,(e=Object(l.a)(n)).call.apply(e,[this].concat(r)))).onZoomEnd=function(e){t.recalculateSearchRadius(e),t.props.setZoomLevel(e.getZoom())},t.onMapLoad=function(e){t.recalculateSearchRadius(e)},t}return Object(u.a)(n,e),Object(c.a)(n,[{key:"recalculateSearchRadius",value:function(e){var n=e.getBounds(),t=[n.getNorthWest(),n.getCenter()],a=t[0],r=t[1],o=Object(g.a)([a.lng,a.lat],[r.lng,r.lat],{units:"meters"}),i=Math.floor(o);this.props.setSearchRadius(i)}},{key:"render",value:function(){return r.a.createElement(E,{reCenter:this.props.setParkingsPageCenter,centerLat:this.props.centerLat,centerLon:this.props.centerLon,onZoomEnd:this.onZoomEnd,onMapLoad:this.onMapLoad,zoomLevel:this.props.zoomLevel},this.props.children,r.a.createElement(m.d,{position:"bottom-right"}))}}]),n}(r.a.PureComponent),B=Object(A.b)({zoomLevel:L.j,centerLat:L.b,centerLon:L.c}),x={setZoomLevel:y.m,setSearchRadius:S,setParkingsPageCenter:y.l},F=Object(d.c)(B,x),M=Object(p.compose)(F)(w),N=t(15),R=t(62),I=t(305),Q=t.n(I),D=t(49),z=t(45),T=t(78);function X(){var e=Object(D.a)(["\n  cursor: pointer;\n  font-size: 13px;\n  padding: 4px 0px;\n"]);return X=function(){return e},e}function U(){var e=Object(D.a)(["\n  background-color: ",";\n  color: ",";\n  opacity: 0.8;\n  list-style-type: none;\n  padding: 6px 20px;\n"]);return U=function(){return e},e}function K(){var e=Object(D.a)(["\n  height: 48px;\n  left: 50%;\n  max-width: 480px;\n  position: absolute;\n  top: 20px;\n  transform: translateX(-50%);\n  width: 100%;\n  z-index: var(--zIndexSearchContainer);\n  \n  @media (max-width: 768px) {\n    max-width: 80%;\n  }\n"]);return K=function(){return e},e}function H(){var e=Object(D.a)(["\n  background-color: ",";\n  border-radius: 3px;\n  color: ",";\n  font-size: 15px;\n  font-weight: 500;\n  height: 100%;\n  opacity: 0.8;\n  outline: none;\n  padding: 0 20px 0 10px;\n  width: 100%;\n\n  ::placeholder {\n    color: #bbb;\n  }\n"]);return H=function(){return e},e}var V=Object(z.c)("input")(H(),T.a.colorMainText,T.a.colorAntiMain),W=z.c.div(K()),q=z.c.ul(U(),T.a.colorMainText,T.a.colorAntiMain),Y=z.c.li(X()),G=function(e){function n(){var e,t;Object(i.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(t=Object(s.a)(this,(e=Object(l.a)(n)).call.apply(e,[this].concat(r)))).state={value:""},t.onKeyPress=function(e){13===(e.which||e.keyCode)&&t.searchByLatLon()},t.onSelectItem=function(e){t.setState({value:""}),t.props.onSelectItem(e)},t.searchByLatLon=function(){var e=t.state.value.split(",").map(Q.a);if(e&&2===e.length&&e.every(Boolean)){var n=e.map(Number),a=Object(R.a)(n,2),r=a[0],o=void 0===r?0:r,i=a[1],c=void 0===i?0:i;o>=-90&&o<=90&&(c>=-180&&c<=180)&&(t.props.onLatLonSearch(o,c),t.setState({value:""}))}},t.onSearchInputChange=function(e){t.setState({value:e.target.value}),e.target.value.length>2&&t.props.onPoiSearch(e.target.value)},t}return Object(u.a)(n,e),Object(c.a)(n,[{key:"render",value:function(){var e=this,n=this.props.options,t=this.state.value;return a.createElement(W,null,a.createElement(V,{onChange:this.onSearchInputChange,value:t,placeholder:"Search",onKeyPress:this.onKeyPress,title:"Lat: [-90..90], Lon: [-180..180]"}),t.length>2&&n.length>0&&a.createElement(q,null,n.map(function(n,t){return a.createElement(Y,{key:t,onClick:function(){return e.onSelectItem(t)}},n.name)})))}}]),n}(a.Component),Z=t(274),J=t(57),_=t(290),$=t(39),ee=t(315),ne=t.n(ee),te=t(316),ae=function(e){function n(){return Object(i.a)(this,n),Object(s.a)(this,Object(l.a)(n).apply(this,arguments))}return Object(u.a)(n,e),Object(c.a)(n,[{key:"render",value:function(){var e,n=ne()(te.SidebarContainer,(e={},Object($.a)(e,te.SidebarContainerOpened,this.props.isOpen),Object($.a)(e,te.SidebarContainerClosed,!this.props.isOpen),e));return r.a.createElement("aside",{className:n},r.a.createElement("button",{className:this.props.isOpen?te.OpenSidebarButton:te.CloseSidebarButton,onClick:this.props.isOpen?this.props.closeSidebar:this.props.openSidebar},"<"),this.props.children)}}]),n}(r.a.PureComponent),re=t(52);var oe=Object(A.b)({isSidebarOpen:re.c}),ie={openSidebar:function(){return Object(O.action)(P.b)},closeSidebar:j,clearAllFreeSlots:y.c,clearVisibleFreeSlots:y.e},ce=Object(d.c)(oe,ie),se=Object(p.compose)(o.g,ce)(function(e){return r.a.createElement(ae,{isOpen:e.isSidebarOpen,openSidebar:e.openSidebar,closeSidebar:e.closeSidebar},r.a.createElement(J.a,{to:{pathname:N.a.createParkingPageUrl,search:e.location.search}},r.a.createElement(Z.a,{className:_.CreateNewParkingButton},"Create new parking")),r.a.createElement(Z.a,{onClick:e.clearAllFreeSlots,className:_.ClearAllFreeSlotsButton},"Clear All Free Slots"),r.a.createElement(Z.a,{onClick:e.clearVisibleFreeSlots,className:_.ClearVisibleFreeSlotsButton},"Clear Visible Free Slots"))}),le=t(318),ue=t.n(le),pe=t(319),de=t.n(pe),ge=t(320),me=function(e){function n(){return Object(i.a)(this,n),Object(s.a)(this,Object(l.a)(n).apply(this,arguments))}return Object(u.a)(n,e),Object(c.a)(n,[{key:"render",value:function(){return r.a.createElement("div",{className:ge.CursorMapCenterContainer},this.props.isSearchRadiusTooBig?n.renderMagnifierPulsed():n.renderCoordinatesMarker())}}],[{key:"renderMagnifierPulsed",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("img",{src:ue.a,alt:"",className:ge.magnifierPulse}),r.a.createElement("br",null),r.a.createElement("h2",{className:ge.zoomInMessage},"Please zoom in to load parkings"))}},{key:"renderCoordinatesMarker",value:function(){return r.a.createElement("img",{src:de.a,alt:"You're here",className:ge.YourMarkerImage})}}]),n}(r.a.PureComponent);function Ae(e){return e.map(function(e){return e.slice().reverse()})}var he=function(e){function n(){var e,t;Object(i.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(t=Object(s.a)(this,(e=Object(l.a)(n)).call.apply(e,[this].concat(r)))).onParkingClick=function(e){return function(n){var a={lat:n.lngLat.lat,lon:n.lngLat.lng};t.props.openPopup(e,a)}},t.onMouseEnter=function(){t.props.MapboxMap.getCanvasContainer().style.cursor="pointer"},t.onMouseOut=function(){t.props.MapboxMap.getCanvasContainer().style.cursor=""},t}return Object(u.a)(n,e),Object(c.a)(n,[{key:"renderAllParkings",value:function(){return r.a.createElement(m.b,{type:"line",layout:n.lineLayout,paint:n.getLinePaint(this.props.zoomLevel,!1,!1),id:n.allParkingsLayerId},this.props.parkings.map(function(e){return r.a.createElement(m.a,{key:e.id,coordinates:Ae(e.geometry)})}))}},{key:"renderAllParkingsClickableArea",value:function(){var e=this;return r.a.createElement(m.b,{type:"line",layout:n.lineLayout,paint:n.getLinePaint(this.props.zoomLevel,!1,!0),id:n.allParkingsClickableAreaLayerId},this.props.parkings.map(function(n){return r.a.createElement(m.a,{key:n.id,coordinates:Ae(n.geometry),onClick:e.onParkingClick(n),onMouseEnter:e.onMouseEnter,onMouseLeave:e.onMouseOut})}))}},{key:"renderFreeParkings",value:function(){return r.a.createElement(m.b,{type:"line",layout:n.lineLayout,paint:n.getLinePaint(this.props.zoomLevel,!0,!1),id:n.freeParkingsLayerId},this.props.freeParkings.map(function(e){return r.a.createElement(m.a,{key:e.id,coordinates:Ae(e.geometry)})}))}},{key:"renderFreeParkingsClickableArea",value:function(){var e=this;return r.a.createElement(m.b,{type:"line",layout:n.lineLayout,paint:n.getLinePaint(this.props.zoomLevel,!0,!0),id:n.freeParkingsClickableAreaLayerId},this.props.freeParkings.map(function(n){return r.a.createElement(m.a,{key:n.id,coordinates:Ae(n.geometry),onClick:e.onParkingClick(n),onMouseEnter:e.onMouseEnter,onMouseLeave:e.onMouseOut})}))}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,this.renderAllParkings(),this.renderAllParkingsClickableArea(),this.renderFreeParkings(),this.renderFreeParkingsClickableArea())}}],[{key:"getLinePaint",value:function(e,n,t){var a;return a=e<14.5?1:e<15?2:e<15.5?3:e<16?4:5,n&&(a+=2),t&&(a*=3),{"line-color":t?"transparent":n?T.a.colorAccent1:T.a.colorAccent4,"line-width":a}}}]),n}(r.a.PureComponent);he.allParkingsLayerId="all-parkings-layer",he.freeParkingsLayerId="free-parkings-layer",he.allParkingsClickableAreaLayerId="all-parkings-clickable-layer",he.freeParkingsClickableAreaLayerId="free-parkings-clickable-layer",he.lineLayout={"line-cap":"round","line-join":"round"};var fe=Object(p.compose)(b)(he),be=(t(322),t(324)),ke=function(e){function n(){var e,t;Object(i.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(t=Object(s.a)(this,(e=Object(l.a)(n)).call.apply(e,[this].concat(r)))).keyPressHandler=function(e){27===e.keyCode&&t.props.selectedParking&&t.props.closePopup()},t.openPopupDetails=function(){t.props.selectedParking&&t.props.openPopupDetails(t.props.selectedParking)},t}return Object(u.a)(n,e),Object(c.a)(n,[{key:"componentDidMount",value:function(){document.addEventListener("keyup",this.keyPressHandler)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keyup",this.keyPressHandler)}},{key:"render",value:function(){return this.props.selectedParking&&this.props.popupCoordinates?r.a.createElement(m.c,{coordinates:(e=this.props.popupCoordinates,[e.lon,e.lat]),className:be.PopupContainer,offset:10},r.a.createElement("button",{className:be.PopupCloseButton,onClick:this.props.closePopup},"\xd7"),n.renderParkopediaParkingPopup(this.props.selectedParking),r.a.createElement(Z.a,{onClick:this.openPopupDetails},"Details")):null;var e}}],[{key:"renderParkopediaParkingPopup",value:function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"Cost:"),r.a.createElement("p",null,e.costPerHour?"$".concat(e.costPerHour," per hour"):"N/A"),r.a.createElement("p",null,"Max stay duration:"),r.a.createElement("p",null,e.maxStayDuration?e.maxStayDuration+" min":"N/A"),r.a.createElement("p",null,"Restrictions:"),r.a.createElement("p",null,e.restrictions.length>0?e.restrictions.join(", "):"N/A"),r.a.createElement("p",null,"Features:"),r.a.createElement("p",null,e.features.length>0?e.features.join(", "):"N/A"))}}]),n}(r.a.PureComponent),Pe=t(285),Ce=function(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"GET";return new Request(e,{method:t,headers:new Headers({Accept:"application/json","Content-Type":"application/json","Accept-Charset":"utf-8"}),body:n})},ve=function(e){return"".concat("https://api.mapbox.com/geocoding/v5","/mapbox.places/").concat(encodeURIComponent(e),".json?access_token=").concat(E.mapToken)},Ee=function(e){function n(e){var t;return Object(i.a)(this,n),(t=Object(s.a)(this,Object(l.a)(n).call(this,e))).fetchPlaces=function(e){fetch(Ce(ve(e))).then(function(e){return e.json()}).then(function(e){0!==e.features.length&&t.setState({options:e.features.map(function(e){return{id:e.id,center:e.center,name:e.place_name}})})}).catch(console.error)},t.onSelectItem=function(e){var n=t.state.options[e],a=Object(R.a)(n.center,2),r=a[0],o=a[1];t.props.setParkingsPageCenter(o,r),t.props.setZoomLevel(P.e),t.setState(function(){return{selected:n}})},t.onPoiSearch=function(e){t.setState({query:e}),t.fetchPlaces(e)},t.onLatLonSearch=function(e,n){t.props.setParkingsPageCenter(e,n),t.props.setZoomLevel(P.e)},t.openPopup=function(e,n){t.setState({selectedParking:e,popupCoordinates:n})},t.openPopupDetails=function(e){t.props.history.push({pathname:N.a.editParkingPageUrlWithParams(e.id),search:t.props.location.search})},t.closePopup=function(){t.setState({selectedParking:null,popupCoordinates:null})},t.state={query:"",options:[],selected:void 0,selectedParking:null,popupCoordinates:null},t}return Object(u.a)(n,e),Object(c.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.props.synchronizeLatLon(),this.props.startCheckingParkopediaUpdates(),setTimeout(function(){e.props.fetchParkings()},100)}},{key:"componentWillUnmount",value:function(){this.props.stopCheckingParkopediaUpdates(),this.props.closeSidebar()}},{key:"renderNoParkingsWarning",value:function(){return this.props.wasFetchPerformedOnce&&this.props.radius<P.i&&!this.props.isParkingFetchInProgress&&0===this.props.allParkingsList.length&&r.a.createElement("h3",{className:_.NoParkingsWarning},"No parkings nearby",r.a.createElement("br",null),"Try to get parkings for another location")}},{key:"renderControlButtons",value:function(){return r.a.createElement("div",{className:_.ParkingsControlButtonsContainer},r.a.createElement(Z.a,{onClick:this.props.fetchParkings,disabled:this.props.isParkingFetchInProgress||this.props.isSearchRadiusTooBig,className:_.LoadParkingsButton,withRoundedCorners:!0},"Load parkings"))}},{key:"renderSidebar",value:function(){return r.a.createElement(se,null)}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(G,{onPoiSearch:this.onPoiSearch,onSelectItem:this.onSelectItem,options:this.state.options,onLatLonSearch:this.onLatLonSearch}),r.a.createElement("div",{className:_.CenterMarker},this.props.isParkingFetchInProgress?r.a.createElement(h.a,null):r.a.createElement(me,{isSearchRadiusTooBig:this.props.isSearchRadiusTooBig}),this.renderNoParkingsWarning()),this.renderControlButtons(),r.a.createElement(fe,{parkings:this.props.allParkingsList,freeParkings:this.props.freeParkingsList,zoomLevel:this.props.zoomLevel,openPopup:this.openPopup,closePopup:this.closePopup}),r.a.createElement(ke,{selectedParking:this.state.selectedParking,popupCoordinates:this.state.popupCoordinates,openPopupDetails:this.openPopupDetails,closePopup:this.closePopup}),this.renderSidebar())}}]),n}(r.a.Component);Ee.defaultProps={};var ye=Object(A.b)({radius:re.d,zoomLevel:L.j,allParkingsList:L.a,freeParkingsList:L.e,isSearchRadiusTooBig:re.b,wasFetchPerformedOnce:L.i,isParkingFetchInProgress:L.f}),Le={closeSidebar:j,setZoomLevel:y.m,setSearchRadius:S,fetchParkings:y.f,synchronizeLatLon:y.n,setParkingsPageCenter:y.l,checkParkopediaUpdates:y.b,askPermissionForGeoLocation:y.a,startCheckingParkopediaUpdates:Pe.c,stopCheckingParkopediaUpdates:Pe.d},Oe=Object(d.c)(ye,Le),Se=Object(p.compose)(o.g,Oe)(Ee),je=t(6);function we(){var e=Object(D.a)(["\n  background-color: transparent;\n  grid-column: 1 / -1;\n  height: 200px;\n  \n  &::placeholder {\n    color: #ffffff88;\n  }\n"]);return we=function(){return e},e}function Be(){var e=Object(D.a)(["\n  display: flex;\n  grid-column: 1 / -1;\n  justify-content: space-between;\n  \n  & button {\n    color: #000 !important;\n  }\n"]);return Be=function(){return e},e}function xe(){var e=Object(D.a)(["\n  display: flex;\n  grid-column: 1 / -1;\n  justify-content: space-between;\n  \n  &&& > * {\n    margin-right: 10px;\n  \n    &:last-child {\n      margin-right: 0;\n    }\n  }\n"]);return xe=function(){return e},e}function Fe(){var e=Object(D.a)(["\n  grid-column: 1 / -1;\n  font-size: 1.5rem;\n"]);return Fe=function(){return e},e}function Me(){var e=Object(D.a)(["\n  grid-column: 1 / -1;\n  font-size: 2.5rem;\n  text-align: center;\n"]);return Me=function(){return e},e}function Ne(){var e=Object(D.a)(["\n  background-color: #0004;\n  border-radius: 50px;\n  color: #ffffff;\n  display: grid;\n  grid-gap: 10px;\n  grid: 2fr 1fr 2fr 1fr 2fr 1fr 5fr 2fr / 1fr 1fr;\n  left: 10%;\n  padding: 50px;\n  position: absolute;\n  top: 10%;\n  transition: all 0.25s ease-in;\n  right: 10%;\n  bottom: 10%;\n  \n  &:focus-within,\n  &:hover {\n    background-color: #0008;\n  }\n\n  & * {\n    color: #ffffff !important;\n    font-weight: bold;\n  }\n"]);return Ne=function(){return e},e}var Re=z.c.form(Ne()),Ie=z.c.h2(Me()),Qe=z.c.p(Fe()),De=z.c.section(xe()),ze=z.c.section(Be()),Te=z.c.textarea(we()),Xe=t(286),Ue=t(275),Ke="lat1, lon1\nlat2, lon2\n...\nlatN, lonN",He="lon1, lat1\nlon2, lat2\n...\nlonN, latN";var Ve=Object(A.b)({selectedParking:L.h}),We={postParking:y.i,deleteParking:y.d},qe=Object(d.c)(Ve,We),Ye=Object(p.compose)(qe,o.g)(function(e){var n=function(){e.history.push({pathname:N.a.findParkingsPageUrl,search:e.location.search})},t=r.a.useState(Boolean(e.selectedParking)),a=Object(R.a)(t,2),o=a[0],i=a[1],c=e.selectedParking?r.a.useState(e.selectedParking.geometry.map(function(e){return e.join(", ")}).join("\n")):r.a.useState(""),s=Object(R.a)(c,2),l=s[0],u=s[1],p=e.selectedParking?r.a.useState(e.selectedParking.length):r.a.useState(0),d=Object(R.a)(p,2),g=d[0],m=d[1],A=e.selectedParking?r.a.useState(e.selectedParking.width):r.a.useState(0),h=Object(R.a)(A,2),f=h[0],b=h[1],k=e.selectedParking?r.a.useState(e.selectedParking.height):r.a.useState(0),P=Object(R.a)(k,2),C=P[0],v=P[1],E=e.selectedParking?r.a.useState(e.selectedParking.costPerHour):r.a.useState(0),y=Object(R.a)(E,2),L=y[0],O=y[1],S=e.selectedParking?r.a.useState(e.selectedParking.maxStayDuration):r.a.useState(0),j=Object(R.a)(S,2),w=j[0],B=j[1],x=Boolean(l&&g&&f&&C&&L&&w),F=r.a.useCallback(function(e){27===e.keyCode&&n()},[]);return r.a.useEffect(function(){return window.addEventListener("keyup",F),function(){window.removeEventListener("keyup",F)}},[F]),r.a.createElement(Re,{onSubmit:function(e){e.preventDefault()}},r.a.createElement(Ie,null,e.selectedParking?"Edit parking":"Create new parking"),r.a.createElement(Qe,null,"Parking size"),r.a.createElement(De,null,r.a.createElement(Xe.a,{value:g,onChange:function(e){return m(e.target.valueAsNumber)},placeholder:"Enter parking length (mm)",min:0}),r.a.createElement(Xe.a,{value:f,onChange:function(e){return b(e.target.valueAsNumber)},placeholder:"Enter parking width (mm)",min:0}),r.a.createElement(Xe.a,{value:C,onChange:function(e){return v(e.target.valueAsNumber)},placeholder:"Enter parking height (mm)",min:0})),r.a.createElement(Qe,null,"Cost and stay duration"),r.a.createElement(De,null,r.a.createElement(Xe.a,{value:L,onChange:function(e){return O(e.target.valueAsNumber)},placeholder:"Enter cost per hour ($)",min:0,step:.01}),r.a.createElement(Xe.a,{value:w,onChange:function(e){return B(e.target.valueAsNumber)},placeholder:"Enter maximum stay duration (min)",min:0,step:5})),r.a.createElement(Qe,null,"Parking location"),r.a.createElement(Te,{value:l,onChange:function(e){u(e.target.value)},placeholder:o?Ke:He}),r.a.createElement(ze,null,r.a.createElement(Ue.b,{value1:"lon, lat",value2:"lat, lon",onChange:function(){return i(!o)},colorScheme:Ue.a,isOnByDefault:o}),r.a.createElement("div",null,e.selectedParking&&r.a.createElement(Z.a,{onClick:function(){e.selectedParking&&e.deleteParking(e.selectedParking.id),n()},withRoundedCorners:!0,colorType:"warning"},"DELETE")," ",r.a.createElement(Z.a,{onClick:function(){x&&e.postParking(Object(je.a)({},e.selectedParking?{id:e.selectedParking.id}:{},{parkingsGeoJsonSource:l,isLatLon:o,parkingLength:g,parkingWidth:f,parkingHeight:C,costPerHour:L,maxStayDuration:w,features:[],restrictions:[]})),n()},withRoundedCorners:!0,disabled:!x},e.selectedParking?"SAVE":"ADD"))))});n.default=function(){return r.a.createElement(M,null,r.a.createElement(o.d,null,r.a.createElement(o.b,{path:N.a.findParkingsPageUrl,component:Se}),r.a.createElement(o.b,{path:N.a.createParkingPageUrl,component:Ye}),r.a.createElement(o.b,{path:N.a.editParkingPageUrlRoute,component:Ye})))}}}]);
//# sourceMappingURL=4.2cce1c50.chunk.js.map