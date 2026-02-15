	var aliasConfig = {
appName : ["", "", ""],
totalPageCount : [],
largePageWidth : [],
largePageHeight : [],
normalPath : [],
largePath : [],
thumbPath : [],

ToolBarsSettings:[],
TitleBar:[],
appLogoIcon:["appLogoIcon"],
appLogoLinkURL:["appLogoLinkURL"],
bookTitle : [],
bookDescription : [],
ButtonsBar : [],
ShareButton : [],
ShareButtonVisible : ["socialShareButtonVisible"],
ThumbnailsButton : [],
ThumbnailsButtonVisible : ["enableThumbnail"],
ZoomButton : [],
ZoomButtonVisible : ["enableZoomIn"],
FlashDisplaySettings : [],
MainBgConfig : [],
bgBeginColor : ["bgBeginColor"],
bgEndColor : ["bgEndColor"],
bgMRotation : ["bgMRotation"],
backGroundImgURL : ["mainbgImgUrl","innerMainbgImgUrl"],
pageBackgroundColor : ["pageBackgroundColor"],
flipshortcutbutton : [],
BookMargins : [],
topMargin : [],
bottomMargin : [],
leftMargin : [],
rightMargin : [],
HTMLControlSettings : [],
linkconfig : [],
LinkDownColor : ["linkOverColor"],
LinkAlpha : ["linkOverColorAlpha"],
OpenWindow : ["linkOpenedWindow"],
searchColor : [],
searchAlpha : [],
SearchButtonVisible : ["searchButtonVisible"],

productName : [],
homePage : [],
enableAutoPlay : ["autoPlayAutoStart"],
autoPlayDuration : ["autoPlayDuration"],
autoPlayLoopCount : ["autoPlayLoopCount"],
BookMarkButtonVisible : [],
googleAnalyticsID : ["googleAnalyticsID"],
OriginPageIndex : [],	
HardPageEnable : ["isHardCover"],	
UIBaseURL : [],	
RightToLeft: ["isRightToLeft"],	

LeftShadowWidth : ["leftPageShadowWidth"],	
LeftShadowAlpha : ["pageShadowAlpha"],
RightShadowWidth : ["rightPageShadowWidth"],
RightShadowAlpha : ["pageShadowAlpha"],
ShortcutButtonHeight : [],	
ShortcutButtonWidth : [],
AutoPlayButtonVisible : ["enableAutoPlay"],	
DownloadButtonVisible : ["enableDownload"],	
DownloadURL : ["downloadURL"],
HomeButtonVisible :["homeButtonVisible"],
HomeURL:['btnHomeURL'],
BackgroundSoundURL:['bacgroundSoundURL'],
//TableOfContentButtonVisible:["BookMarkButtonVisible"],
PrintButtonVisible:["enablePrint"],
toolbarColor:["mainColor","barColor"],
loadingBackground:["mainColor","barColor"],
BackgroundSoundButtonVisible:["enableFlipSound"],
FlipSound:["enableFlipSound"],
MiniStyle:["userSmallMode"],
retainBookCenter:["moveFlipBookToCenter"],
totalPagesCaption:["totalPageNumberCaptionStr"],
pageNumberCaption:["pageIndexCaptionStrs"]
};
var aliasLanguage={
frmPrintbtn:["frmPrintCaption"],
frmPrintall : ["frmPrintPrintAll"],
frmPrintcurrent : ["frmPrintPrintCurrentPage"],
frmPrintRange : ["frmPrintPrintRange"],
frmPrintexample : ["frmPrintExampleCaption"],
btnLanguage:["btnSwicthLanguage"],
btnTableOfContent:["btnBookMark"]
}
;
	var bookConfig = {
	appName:'flippdf',
	totalPageCount : 0,
	largePageWidth : 1080,
	largePageHeight : 1440,
	normalPath : "files/page/",
	largePath : "files/large/",
	thumbPath : "files/thumb/",
	
	ToolBarsSettings:"",
	TitleBar:"",
	appLogoLinkURL:"",
	bookTitle:"FLIPBUILDER",
	bookDescription:"",
	ButtonsBar:"",
	ShareButton:"",
	
	ThumbnailsButton:"",
	ThumbnailsButtonVisible:"Show",
	ZoomButton:"",
	ZoomButtonVisible:"Yes",
	FlashDisplaySettings:"",
	MainBgConfig:"",
	bgBeginColor:"#cccccc",
	bgEndColor:"#eeeeee",
	bgMRotation:45,
	pageBackgroundColor:"#FFFFFF",
	flipshortcutbutton:"Show",
	BookMargins:"",
	topMargin:10,
	bottomMargin:10,
	leftMargin:10,
	rightMargin:10,
	HTMLControlSettings:"",
	linkconfig:"",
	LinkDownColor:"#808080",
	LinkAlpha:0.5,
	OpenWindow:"_Blank",

	BookMarkButtonVisible:'true',
	productName : 'Demo created by Flip PDF',
	homePage : 'http://www.flipbuilder.com/',
	isFlipPdf : "true",
	TableOfContentButtonVisible:"true",
	searchTextJS:'javascript/search_config.js',
	searchPositionJS:undefined
};
	
	
	;bookConfig.BookTemplateName="metro";bookConfig.loadingCaptionColor="#DDDDDD";bookConfig.loadingBackground="#1F2232";bookConfig.appLogoIcon="../files/mobile-ext/appLogoIcon.png";bookConfig.appLogoOpenWindow="Blank";bookConfig.logoHeight="40";bookConfig.logoPadding="0";bookConfig.logoTop="0";bookConfig.toolbarColor="#000000";bookConfig.iconColor="#ECF5FB";bookConfig.pageNumColor="#000000";bookConfig.iconFontColor="#C6C6C6";bookConfig.toolbarAlwaysShow="No";bookConfig.formFontColor="#FFFFFF";bookConfig.formBackgroundColor="#27181A";bookConfig.ToolBarAlpha="1";bookConfig.CurlingPageCorner="Yes";bookConfig.showBookInstructionOnStart="false";bookConfig.InstructionsButtonVisible="Show";bookConfig.showInstructionOnStart="No";bookConfig.showGotoButtonsAtFirst="No";bookConfig.QRCode="Hide";bookConfig.HomeButtonVisible="Hide";bookConfig.HomeURL="%first page%";bookConfig.aboutButtonVisible="Hide";bookConfig.aboutContactInfoTxt="<info><title>Q29udGFjdCB1cw</title><desc>WW91IGNhbiBjb250YWN0IHVzIGluOg0KRmFjZWJvb2s6DQpCcml0YW5pYyBDbGFzZXMgZGUgSW5nbMOpcy4NCg0KT3VyIFBob25lIG51bWJlcjoNCjkxNSA4NTUgODQ0DQogDQogDQogDQoNCg0KLg</desc><logo>Li9maWxlcy9leHRmaWxlcy9hYm91dC8</logo><keys/></info> ";bookConfig.enablePageBack="Hide";bookConfig.ShareButtonVisible="hide";shareObj = [];bookConfig.isInsertFrameLinkEnable=" Hide";bookConfig.addCurrentPage="No";bookConfig.EmailButtonVisible="hide";bookConfig.btnShareWithEmailBody="{link}";bookConfig.ThumbnailsButtonVisible="Show";bookConfig.thumbnailColor="#333333";bookConfig.thumbnailAlpha="70";bookConfig.BookMarkButtonVisible="Hide";bookConfig.TableOfContentButtonVisible="Show";bookConfig.isHideTabelOfContentNodes="yes";bookConfig.SearchButtonVisible="Hide";bookConfig.leastSearchChar="3";bookConfig.searchKeywordFontColor="#FFB000";bookConfig.searchHightlightColor="#ffff00";bookConfig.SelectTextButtonVisible="Hide";bookConfig.PrintButtonVisible="Hide";bookConfig.BackgroundSoundButtonVisible="Show";bookConfig.FlipSound="Yes";bookConfig.BackgroundSoundLoop="-1";bookConfig.AutoPlayButtonVisible="Show";bookConfig.autoPlayAutoStart="No";bookConfig.autoPlayDuration="9";bookConfig.autoPlayLoopCount="1";bookConfig.ZoomButtonVisible="Show";bookConfig.maxZoomWidth="1400";bookConfig.defaultZoomWidth="700";bookConfig.mouseWheelFlip="Yes";bookConfig.ZoomMapVisible="Hide";bookConfig.DownloadButtonVisible="Hide";bookConfig.PhoneButtonVisible="Hide";bookConfig.AnnotationButtonVisible="Show";bookConfig.FullscreenButtonVisible="Show";bookConfig.MagnifierButtonVisible="Show";bookConfig.bgBeginColor="#E2E2E2";bookConfig.bgEndColor="#E2E2E2";bookConfig.bgMRotation="90";bookConfig.backGroundImgURL="../files/mobile-ext/backGroundImgURL.jpg";bookConfig.backgroundPosition="stretch";bookConfig.backgroundOpacity="100";bookConfig.backgroundScene="None";bookConfig.LeftShadowWidth="90";bookConfig.LeftShadowAlpha="0.6";bookConfig.RightShadowWidth="55";bookConfig.RightShadowAlpha="0.6";bookConfig.ShowTopLeftShadow="Yes";bookConfig.HardPageEnable="No";bookConfig.hardCoverBorderWidth="8";bookConfig.borderColor="#572F0D";bookConfig.outerCoverBorder="Yes";bookConfig.cornerRound="8";bookConfig.leftMarginOnMobile="0";bookConfig.topMarginOnMobile="0";bookConfig.rightMarginOnMobile="0";bookConfig.bottomMarginOnMobile="0";bookConfig.pageBackgroundColor="#E8E8E8";bookConfig.flipshortcutbutton="Show";bookConfig.BindingType="side";bookConfig.RightToLeft="No";bookConfig.FlipDirection="0";bookConfig.flippingTime="0.6";bookConfig.retainBookCenter="Yes";bookConfig.FlipStyle="Flip";bookConfig.autoDoublePage="Yes";bookConfig.isTheBookOpen="No";bookConfig.thicknessWidthType="Thinner";bookConfig.thicknessColor="#ffffff";bookConfig.SingleModeBanFlipToLastPage="No";bookConfig.showThicknessOnMobile="No";bookConfig.isSingleBookFullWindowOnMobile="no";bookConfig.isStopMouseMenu="yes";bookConfig.restorePageVisible="No";bookConfig.topMargin="10";bookConfig.bottomMargin="10";bookConfig.leftMargin="10";bookConfig.rightMargin="10";bookConfig.hideMiniFullscreen="no";bookConfig.maxWidthToSmallMode="400";bookConfig.maxHeightToSmallMode="300";bookConfig.leftRightPnlShowOption="None";bookConfig.highDefinitionConversion="yes";bookConfig.LargeLogoPosition="top-left";bookConfig.LargeLogoTarget="Blank";bookConfig.isFixLogoSize="No";bookConfig.logoFixWidth="0";bookConfig.logoFixHeight="0";bookConfig.SupportOperatePageZoom="Yes";bookConfig.showHelpContentAtFirst="No";bookConfig.updateURLForPage="No";bookConfig.LinkDownColor="#800080";bookConfig.LinkAlpha="0.2";bookConfig.OpenWindow="Blank";bookConfig.showLinkHint="No";bookConfig.MidBgColor="#870254";bookConfig.useTheAliCloudChart ="no";bookConfig.totalPageCount=16;bookConfig.largePageWidth=1800;bookConfig.largePageHeight=2379;;bookConfig.securityType="1";bookConfig.CreatedTime ="250329164902";bookConfig.bookTitle="Unit 1 - 2";bookConfig.bookmarkCR="d64654569afaf8458e6a1acca97b2976b78f3d6e";bookConfig.productName="Flip PDF Corporate Edition";bookConfig.homePage="http://www.flipbuilder.com";bookConfig.searchPositionJS="javascript/text_position[1].js";bookConfig.searchTextJS="javascript/search_config.js";bookConfig.normalPath="../files/mobile/";bookConfig.largePath="../files/mobile/";bookConfig.thumbPath="../files/thumb/";bookConfig.userListPath="../files/extfiles/users.js";var language = [];;function orgt(s){ return binl2hex(core_hx(str2binl(s), s.length * chrsz));};; var pageEditor = {"setting":{"annoPlaying":"true","shoppingCartHTML":"false","shoppingCartOptinon":{"type":"PayPal","paypal":"","method":"POST","sandbox":"false","address":"","theme":"","body":"Hi xxx     I'm going to buy below product(s):      ${shopping}  Full Name","showPrice":"true","showTime":"true"}}, "pageAnnos":[[],[],[{"annotype":"com.mobiano.flipbook.pageeditor::TAnnoPlugIn","annoId":"2025291648101129","alpha":"1","location":{"tannoName":"sound5","x":"0.0833842251139193","y":"0.08440168092610856","width":"0.16340176320445968","height":"0.024429139184909306","rotation":"0","reflection":"false","reflectionType":"0","reflectionAlpha":"0","pageWidth":"851.48","pageHeight":"1125.57"},"hint":{"hintShapeColor":"0","hintShapeColor2":"8388736","hintShapeAlpha":"1","hintW":"0","hintH":"0","hintAuto":"true","hintShapeType":"2","text":""},"shadow":{"hasDropShadow":"false","shadowDistance":"4","shadowAngle":"270","shadowColor":"0","shadowAlpha":"0.6","shadowBlurX":"4","shadowBlurY":"4"},"cpName":"StandardAudioPlayer","className":"StandardAudioPlayer","H5Replay":"false","H5PlaybackNumber":"1","componentData":{"playEvt":"none","stopEvt":"EVT_PageOffView","songs":{"song":{"url":"./files/pageConfig/1-02_C_Photo_story_p03.mp3"}}}}],[{"annotype":"com.mobiano.flipbook.pageeditor::TAnnoPlugIn","annoId":"2025291648108923","alpha":"1","location":{"tannoName":"sound5","x":"0.09512848217221778","y":"0.141261760707908","width":"0.16340176320445968","height":"0.0244467077855457","rotation":"0","reflection":"false","reflectionType":"0","reflectionAlpha":"0","pageWidth":"851.48","pageHeight":"1125.57"},"hint":{"hintShapeColor":"0","hintShapeColor2":"8388736","hintShapeAlpha":"1","hintW":"0","hintH":"0","hintAuto":"true","hintShapeType":"2","text":""},"shadow":{"hasDropShadow":"false","shadowDistance":"4","shadowAngle":"270","shadowColor":"0","shadowAlpha":"0.6","shadowBlurX":"4","shadowBlurY":"4"},"cpName":"StandardAudioPlayer","className":"StandardAudioPlayer","H5Replay":"false","H5PlaybackNumber":"1","componentData":{"playEvt":"none","stopEvt":"EVT_PageOffView","songs":{"song":{"url":"./files/pageConfig/1-03_A_Conversation_mode_p04.mp3"}}}},{"annotype":"com.mobiano.flipbook.pageeditor::TAnnoPlugIn","annoId":"202529164810591","alpha":"1","location":{"tannoName":"sound5","x":"0.09512848217221778","y":"0.3216148262658031","width":"0.16340176320445968","height":"0.0244467077855457","rotation":"0","reflection":"false","reflectionType":"0","reflectionAlpha":"0","pageWidth":"851.48","pageHeight":"1125.57"},"hint":{"hintShapeColor":"0","hintShapeColor2":"8388736","hintShapeAlpha":"1","hintW":"0","hintH":"0","hintAuto":"true","hintShapeType":"2","text":""},"shadow":{"hasDropShadow":"false","shadowDistance":"4","shadowAngle":"270","shadowColor":"0","shadowAlpha":"0.6","shadowBlurX":"4","shadowBlurY":"4"},"cpName":"StandardAudioPlayer","className":"StandardAudioPlayer","H5Replay":"false","H5PlaybackNumber":"1","componentData":{"playEvt":"none","stopEvt":"EVT_PageOffView","songs":{"song":{"url":"./files/pageConfig/1-04_B_Rhythm_and_intona_p04.mp3"}}}}],[{"annotype":"com.mobiano.flipbook.pageeditor::TAnnoPlugIn","annoId":"2025291648102395","alpha":"1","location":{"tannoName":"sound5","x":"0.0880819279372387","y":"0.5339516867009604","width":"0.16340176320445968","height":"0.024429139184909306","rotation":"0","reflection":"false","reflectionType":"0","reflectionAlpha":"0","pageWidth":"851.48","pageHeight":"1125.57"},"hint":{"hintShapeColor":"0","hintShapeColor2":"8388736","hintShapeAlpha":"1","hintW":"0","hintH":"0","hintAuto":"true","hintShapeType":"2","text":""},"shadow":{"hasDropShadow":"false","shadowDistance":"4","shadowAngle":"270","shadowColor":"0","shadowAlpha":"0.6","shadowBlurX":"4","shadowBlurY":"4"},"cpName":"StandardAudioPlayer","className":"StandardAudioPlayer","H5Replay":"false","H5PlaybackNumber":"1","componentData":{"playEvt":"none","stopEvt":"EVT_PageOffView","songs":{"song":{"url":"./files/pageConfig/1-05_A_Pronunciation_p05.mp3"}}}}],[{"annotype":"com.mobiano.flipbook.pageeditor::TAnnoPlugIn","annoId":"2025291648104797","alpha":"1","location":{"tannoName":"sound5","x":"0.0880819279372387","y":"0.1421501994544986","width":"0.16343308122328182","height":"0.024433821339041536","rotation":"0","reflection":"false","reflectionType":"0","reflectionAlpha":"0","pageWidth":"851.48","pageHeight":"1125.57"},"hint":{"hintShapeColor":"0","hintShapeColor2":"8388736","hintShapeAlpha":"1","hintW":"0","hintH":"0","hintAuto":"true","hintShapeType":"2","text":""},"shadow":{"hasDropShadow":"false","shadowDistance":"4","shadowAngle":"270","shadowColor":"0","shadowAlpha":"0.6","shadowBlurX":"4","shadowBlurY":"4"},"cpName":"StandardAudioPlayer","className":"StandardAudioPlayer","H5Replay":"false","H5PlaybackNumber":"1","componentData":{"playEvt":"none","stopEvt":"EVT_PageOffView","songs":{"song":{"url":"./files/pageConfig/1-06_A_Vocabulary_p06.mp3"}}}}],[{"annotype":"com.mobiano.flipbook.pageeditor::TAnnoPlugIn","annoId":"202529164810921","alpha":"1","location":{"tannoName":"sound5","x":"0.08937093176071047","y":"0.011322176709599927","width":"0.15600288125773162","height":"0.02331859130235721","rotation":"0","reflection":"false","reflectionType":"0","reflectionAlpha":"0","pageWidth":"851.48","pageHeight":"1125.57"},"hint":{"hintShapeColor":"0","hintShapeColor2":"8388736","hintShapeAlpha":"1","hintW":"0","hintH":"0","hintAuto":"true","hintShapeType":"2","text":""},"shadow":{"hasDropShadow":"false","shadowDistance":"4","shadowAngle":"270","shadowColor":"0","shadowAlpha":"0.6","shadowBlurX":"4","shadowBlurY":"4"},"cpName":"StandardAudioPlayer","className":"StandardAudioPlayer","H5Replay":"false","H5PlaybackNumber":"1","componentData":{"playEvt":"none","stopEvt":"EVT_PageOffView","songs":{"song":{"url":"./files/pageConfig/1-07_B_Listening_compreh_p07.mp3"}}}},{"annotype":"com.mobiano.flipbook.pageeditor::TAnnoPlugIn","annoId":"2025291648102594","alpha":"1","location":{"tannoName":"sound5","x":"0.08897164438104917","y":"0.41527780806546233","width":"0.14880507522730474","height":"0.02227376895854504","rotation":"0","reflection":"false","reflectionType":"0","reflectionAlpha":"0","pageWidth":"851.48","pageHeight":"1125.57"},"hint":{"hintShapeColor":"0","hintShapeColor2":"8388736","hintShapeAlpha":"1","hintW":"0","hintH":"0","hintAuto":"true","hintShapeType":"2","text":""},"shadow":{"hasDropShadow":"false","shadowDistance":"4","shadowAngle":"270","shadowColor":"0","shadowAlpha":"0.6","shadowBlurX":"4","shadowBlurY":"4"},"cpName":"StandardAudioPlayer","className":"StandardAudioPlayer","H5Replay":"false","H5PlaybackNumber":"1","componentData":{"playEvt":"none","stopEvt":"EVT_PageOffView","songs":{"song":{"url":"./files/pageConfig/1-08_A_Conversation_mode_p07.mp3"}}}},{"annotype":"com.mobiano.flipbook.pageeditor::TAnnoPlugIn","annoId":"2025291648101776","alpha":"1","location":{"tannoName":"sound5","x":"0.08986136082485967","y":"0.5640239921537398","width":"0.14880507522730474","height":"0.02225618903040096","rotation":"0","reflection":"false","reflectionType":"0","reflectionAlpha":"0","pageWidth":"851.48","pageHeight":"1125.57"},"hint":{"hintShapeColor":"0","hintShapeColor2":"8388736","hintShapeAlpha":"1","hintW":"0","hintH":"0","hintAuto":"true","hintShapeType":"2","text":""},"shadow":{"hasDropShadow":"false","shadowDistance":"4","shadowAngle":"270","shadowColor":"0","shadowAlpha":"0.6","shadowBlurX":"4","shadowBlurY":"4"},"cpName":"StandardAudioPlayer","className":"StandardAudioPlayer","H5Replay":"false","H5PlaybackNumber":"1","componentData":{"playEvt":"none","stopEvt":"EVT_PageOffView","songs":{"song":{"url":"./files/pageConfig/1-09_B_Rhythm_and_intona_p07.mp3"}}}}],[{"annotype":"com.mobiano.flipbook.pageeditor::TAnnoPlugIn","annoId":"2025291648106630","alpha":"1","location":{"tannoName":"sound5","x":"0.11121455547631146","y":"0.14268864717970503","width":"0.14880507522730474","height":"0.02225618903040096","rotation":"0","reflection":"false","reflectionType":"0","reflectionAlpha":"0","pageWidth":"851.48","pageHeight":"1125.57"},"hint":{"hintShapeColor":"0","hintShapeColor2":"8388736","hintShapeAlpha":"1","hintW":"0","hintH":"0","hintAuto":"true","hintShapeType":"2","text":""},"shadow":{"hasDropShadow":"false","shadowDistance":"4","shadowAngle":"270","shadowColor":"0","shadowAlpha":"0.6","shadowBlurX":"4","shadowBlurY":"4"},"cpName":"StandardAudioPlayer","className":"StandardAudioPlayer","H5Replay":"false","H5PlaybackNumber":"1","componentData":{"playEvt":"none","stopEvt":"EVT_PageOffView","songs":{"song":{"url":"./files/pageConfig/1-11_A_Vocabulary_p10.mp3"}}}},{"annotype":"com.mobiano.flipbook.pageeditor::TAnnoPlugIn","annoId":"2025291648107834","alpha":"1","location":{"tannoName":"sound5","x":"0.11329753868005604","y":"0.6213845115860251","width":"0.13958394933113005","height":"0.0208876146048371","rotation":"0","reflection":"false","reflectionType":"0","reflectionAlpha":"0","pageWidth":"851.48","pageHeight":"1125.57"},"hint":{"hintShapeColor":"0","hintShapeColor2":"8388736","hintShapeAlpha":"1","hintW":"0","hintH":"0","hintAuto":"true","hintShapeType":"2","text":""},"shadow":{"hasDropShadow":"false","shadowDistance":"4","shadowAngle":"270","shadowColor":"0","shadowAlpha":"0.6","shadowBlurX":"4","shadowBlurY":"4"},"cpName":"StandardAudioPlayer","className":"StandardAudioPlayer","H5Replay":"false","H5PlaybackNumber":"1","componentData":{"playEvt":"none","stopEvt":"EVT_PageOffView","songs":{"song":{"url":"./files/pageConfig/1-12_A_Listen_to_associa_p10.mp3"}}}}],[{"annotype":"com.mobiano.flipbook.pageeditor::TAnnoPlugIn","annoId":"2025291648109073","alpha":"1","location":{"tannoName":"sound5","x":"0.08674735327152294","y":"0.01639573323253592","width":"0.13958394933113005","height":"0.02087882721964365","rotation":"0","reflection":"false","reflectionType":"0","reflectionAlpha":"0","pageWidth":"851.48","pageHeight":"1125.57"},"hint":{"hintShapeColor":"0","hintShapeColor2":"8388736","hintShapeAlpha":"1","hintW":"0","hintH":"0","hintAuto":"true","hintShapeType":"2","text":""},"shadow":{"hasDropShadow":"false","shadowDistance":"4","shadowAngle":"270","shadowColor":"0","shadowAlpha":"0.6","shadowBlurX":"4","shadowBlurY":"4"},"cpName":"StandardAudioPlayer","className":"StandardAudioPlayer","H5Replay":"false","H5PlaybackNumber":"1","componentData":{"playEvt":"none","stopEvt":"EVT_PageOffView","songs":{"song":{"url":"./files/pageConfig/1-13_B_Listen_for_detail_p11.mp3"}}}}],[],[{"annotype":"com.mobiano.flipbook.pageeditor::TAnnoPlugIn","annoId":"202529164810854","alpha":"1","location":{"tannoName":"sound5","x":"0.08744133209769513","y":"0.045956513346369146","width":"0.13958394933113005","height":"0.02087882721964365","rotation":"0","reflection":"false","reflectionType":"0","reflectionAlpha":"0","pageWidth":"851.48","pageHeight":"1125.57"},"hint":{"hintShapeColor":"0","hintShapeColor2":"8388736","hintShapeAlpha":"1","hintW":"0","hintH":"0","hintAuto":"true","hintShapeType":"2","text":""},"shadow":{"hasDropShadow":"false","shadowDistance":"4","shadowAngle":"270","shadowColor":"0","shadowAlpha":"0.6","shadowBlurX":"4","shadowBlurY":"4"},"cpName":"StandardAudioPlayer","className":"StandardAudioPlayer","H5Replay":"false","H5PlaybackNumber":"1","componentData":{"playEvt":"none","stopEvt":"EVT_PageOffView","songs":{"song":{"url":"./files/pageConfig/1-17_C_Photo_story_p15.mp3"}}}}],[{"annotype":"com.mobiano.flipbook.pageeditor::TAnnoPlugIn","annoId":"2025291648109120","alpha":"1","location":{"tannoName":"sound5","x":"0.08968341753609757","y":"0.6493679565989595","width":"0.13958394933113005","height":"0.02087882721964365","rotation":"0","reflection":"false","reflectionType":"0","reflectionAlpha":"0","pageWidth":"851.48","pageHeight":"1125.57"},"hint":{"hintShapeColor":"0","hintShapeColor2":"8388736","hintShapeAlpha":"1","hintW":"0","hintH":"0","hintAuto":"true","hintShapeType":"2","text":""},"shadow":{"hasDropShadow":"false","shadowDistance":"4","shadowAngle":"270","shadowColor":"0","shadowAlpha":"0.6","shadowBlurX":"4","shadowBlurY":"4"},"cpName":"StandardAudioPlayer","className":"StandardAudioPlayer","H5Replay":"false","H5PlaybackNumber":"1","componentData":{"playEvt":"none","stopEvt":"EVT_PageOffView","songs":{"song":{"url":"./files/pageConfig/1-18_A_Vocabulary_p16.mp3"}}}}],[{"annotype":"com.mobiano.flipbook.pageeditor::TAnnoPlugIn","annoId":"2025291648103221","alpha":"1","location":{"tannoName":"sound5","x":"0.08861575780352499","y":"0.015345760168383371","width":"0.13958394933113005","height":"0.02087882721964365","rotation":"0","reflection":"false","reflectionType":"0","reflectionAlpha":"0","pageWidth":"851.48","pageHeight":"1125.57"},"hint":{"hintShapeColor":"0","hintShapeColor2":"8388736","hintShapeAlpha":"1","hintW":"0","hintH":"0","hintAuto":"true","hintShapeType":"2","text":""},"shadow":{"hasDropShadow":"false","shadowDistance":"4","shadowAngle":"270","shadowColor":"0","shadowAlpha":"0.6","shadowBlurX":"4","shadowBlurY":"4"},"cpName":"StandardAudioPlayer","className":"StandardAudioPlayer","H5Replay":"false","H5PlaybackNumber":"1","componentData":{"playEvt":"none","stopEvt":"EVT_PageOffView","songs":{"song":{"url":"./files/pageConfig/1-19_C_Listening_compreh_p17.mp3"}}}},{"annotype":"com.mobiano.flipbook.pageeditor::TAnnoPlugIn","annoId":"2025291648107009","alpha":"1","location":{"tannoName":"sound5","x":"0.065127243686928","y":"0.1405348562788793","width":"0.13958394933113005","height":"0.02087882721964365","rotation":"0","reflection":"false","reflectionType":"0","reflectionAlpha":"0","pageWidth":"851.48","pageHeight":"1125.57"},"hint":{"hintShapeColor":"0","hintShapeColor2":"8388736","hintShapeAlpha":"1","hintW":"0","hintH":"0","hintAuto":"true","hintShapeType":"2","text":""},"shadow":{"hasDropShadow":"false","shadowDistance":"4","shadowAngle":"270","shadowColor":"0","shadowAlpha":"0.6","shadowBlurX":"4","shadowBlurY":"4"},"cpName":"StandardAudioPlayer","className":"StandardAudioPlayer","H5Replay":"false","H5PlaybackNumber":"1","componentData":{"playEvt":"none","stopEvt":"EVT_PageOffView","songs":{"song":{"url":"./files/pageConfig/1-20_Pronunciation_p17.mp3"}}}},{"annotype":"com.mobiano.flipbook.pageeditor::TAnnoPlugIn","annoId":"202529164810749","alpha":"1","location":{"tannoName":"sound5","x":"0.08648043833837979","y":"0.2980308159017613","width":"0.13958394933113005","height":"0.02087882721964365","rotation":"0","reflection":"false","reflectionType":"0","reflectionAlpha":"0","pageWidth":"851.48","pageHeight":"1125.57"},"hint":{"hintShapeColor":"0","hintShapeColor2":"8388736","hintShapeAlpha":"1","hintW":"0","hintH":"0","hintAuto":"true","hintShapeType":"2","text":""},"shadow":{"hasDropShadow":"false","shadowDistance":"4","shadowAngle":"270","shadowColor":"0","shadowAlpha":"0.6","shadowBlurX":"4","shadowBlurY":"4"},"cpName":"StandardAudioPlayer","className":"StandardAudioPlayer","H5Replay":"false","H5PlaybackNumber":"1","componentData":{"playEvt":"none","stopEvt":"EVT_PageOffView","songs":{"song":{"url":"./files/pageConfig/1-21_A_Conversation_mode_p17.mp3"}}}},{"annotype":"com.mobiano.flipbook.pageeditor::TAnnoPlugIn","annoId":"2025291648108302","alpha":"1","location":{"tannoName":"sound5","x":"0.09181873700124274","y":"0.5039870707932224","width":"0.13958394933113005","height":"0.02087882721964365","rotation":"0","reflection":"false","reflectionType":"0","reflectionAlpha":"0","pageWidth":"851.48","pageHeight":"1125.57"},"hint":{"hintShapeColor":"0","hintShapeColor2":"8388736","hintShapeAlpha":"1","hintW":"0","hintH":"0","hintAuto":"true","hintShapeType":"2","text":""},"shadow":{"hasDropShadow":"false","shadowDistance":"4","shadowAngle":"270","shadowColor":"0","shadowAlpha":"0.6","shadowBlurX":"4","shadowBlurY":"4"},"cpName":"StandardAudioPlayer","className":"StandardAudioPlayer","H5Replay":"false","H5PlaybackNumber":"1","componentData":{"playEvt":"none","stopEvt":"EVT_PageOffView","songs":{"song":{"url":"./files/pageConfig/1-22_B_Rhythm_and_intona_p17.mp3"}}}}],[{"annotype":"com.mobiano.flipbook.pageeditor::TAnnoPlugIn","annoId":"2025291648107319","alpha":"1","location":{"tannoName":"sound5","x":"0.1073933609351625","y":"0.1429287282530574","width":"0.13958394933113005","height":"0.02087882721964365","rotation":"0","reflection":"false","reflectionType":"0","reflectionAlpha":"0","pageWidth":"851.48","pageHeight":"1125.57"},"hint":{"hintShapeColor":"0","hintShapeColor2":"8388736","hintShapeAlpha":"1","hintW":"0","hintH":"0","hintAuto":"true","hintShapeType":"2","text":""},"shadow":{"hasDropShadow":"false","shadowDistance":"4","shadowAngle":"270","shadowColor":"0","shadowAlpha":"0.6","shadowBlurX":"4","shadowBlurY":"4"},"cpName":"StandardAudioPlayer","className":"StandardAudioPlayer","H5Replay":"false","H5PlaybackNumber":"1","componentData":{"playEvt":"none","stopEvt":"EVT_PageOffView","songs":{"song":{"url":"./files/pageConfig/1-23_A_Vocabulary_p18.mp3"}}}},{"annotype":"com.mobiano.flipbook.pageeditor::TAnnoPlugIn","annoId":"2025291648104021","alpha":"1","location":{"tannoName":"sound5","x":"0.09800380027959431","y":"0.495687548959868","width":"0.13958394933113005","height":"0.02087882721964365","rotation":"0","reflection":"false","reflectionType":"0","reflectionAlpha":"0","pageWidth":"851.48","pageHeight":"1125.57"},"hint":{"hintShapeColor":"0","hintShapeColor2":"8388736","hintShapeAlpha":"1","hintW":"0","hintH":"0","hintAuto":"true","hintShapeType":"2","text":""},"shadow":{"hasDropShadow":"false","shadowDistance":"4","shadowAngle":"270","shadowColor":"0","shadowAlpha":"0.6","shadowBlurX":"4","shadowBlurY":"4"},"cpName":"StandardAudioPlayer","className":"StandardAudioPlayer","H5Replay":"false","H5PlaybackNumber":"1","componentData":{"playEvt":"none","stopEvt":"EVT_PageOffView","songs":{"song":{"url":"./files/pageConfig/1-24_C_Listening_compreh_p18.mp3"}}}}],[{"annotype":"com.mobiano.flipbook.pageeditor::TAnnoPlugIn","annoId":"2025291648101053","alpha":"1","location":{"tannoName":"sound5","x":"0.07937497873884498","y":"0.26898248948502107","width":"0.13958394933113005","height":"0.02087882721964365","rotation":"0","reflection":"false","reflectionType":"0","reflectionAlpha":"0","pageWidth":"851.48","pageHeight":"1125.57"},"hint":{"hintShapeColor":"0","hintShapeColor2":"8388736","hintShapeAlpha":"1","hintW":"0","hintH":"0","hintAuto":"true","hintShapeType":"2","text":""},"shadow":{"hasDropShadow":"false","shadowDistance":"4","shadowAngle":"270","shadowColor":"0","shadowAlpha":"0.6","shadowBlurX":"4","shadowBlurY":"4"},"cpName":"StandardAudioPlayer","className":"StandardAudioPlayer","H5Replay":"false","H5PlaybackNumber":"1","componentData":{"playEvt":"none","stopEvt":"EVT_PageOffView","songs":{"song":{"url":"./files/pageConfig/1-25_A_Conversation_mode_p19.mp3"}}}},{"annotype":"com.mobiano.flipbook.pageeditor::TAnnoPlugIn","annoId":"202529164810568","alpha":"1","location":{"tannoName":"sound5","x":"0.09071426141582282","y":"0.5735025288336668","width":"0.13958394933113005","height":"0.02087882721964365","rotation":"0","reflection":"false","reflectionType":"0","reflectionAlpha":"0","pageWidth":"851.48","pageHeight":"1125.57"},"hint":{"hintShapeColor":"0","hintShapeColor2":"8388736","hintShapeAlpha":"1","hintW":"0","hintH":"0","hintAuto":"true","hintShapeType":"2","text":""},"shadow":{"hasDropShadow":"false","shadowDistance":"4","shadowAngle":"270","shadowColor":"0","shadowAlpha":"0.6","shadowBlurX":"4","shadowBlurY":"4"},"cpName":"StandardAudioPlayer","className":"StandardAudioPlayer","H5Replay":"false","H5PlaybackNumber":"1","componentData":{"playEvt":"none","stopEvt":"EVT_PageOffView","songs":{"song":{"url":"./files/pageConfig/1-26_B_Rhythm_and_intona_p19.mp3"}}}}],[]]}; bookConfig.isFlipPdf=true; var pages_information =[{pageColor:"16777215",pageIsStrech:"no"},{pageColor:"16777215",pageIsStrech:"no"},{pageColor:"16777215",pageIsStrech:"no"},{pageColor:"16777215",pageIsStrech:"no"},{pageColor:"16777215",pageIsStrech:"no"},{pageColor:"16777215",pageIsStrech:"no"},{pageColor:"16777215",pageIsStrech:"no"},{pageColor:"16777215",pageIsStrech:"no"},{pageColor:"16777215",pageIsStrech:"no"},{pageColor:"16777215",pageIsStrech:"no"},{pageColor:"16777215",pageIsStrech:"no"},{pageColor:"16777215",pageIsStrech:"no"},{pageColor:"16777215",pageIsStrech:"no"},{pageColor:"16777215",pageIsStrech:"no"},{pageColor:"16777215",pageIsStrech:"no"},{pageColor:"16777215",pageIsStrech:"no"}];	
	if(language&&language.length>0&&language[0]&&language[0].language){
		bookConfig.language=language[0].language;
	}
	
try{
	for(var i=0;pageEditor!=undefined&&i<pageEditor.length;i++){
		if(pageEditor[i].length==0){
			continue;
		}
		for(var j=0;j<pageEditor[i].length;j++){
			var anno=pageEditor[i][j];
			if(anno==undefined)continue;
			if(anno.overAlpha==undefined){
				anno.overAlpha=bookConfig.LinkAlpha;
			}
			if(anno.outAlpha==undefined){
				anno.outAlpha=0;
			}
			if(anno.downAlpha==undefined){
				anno.downAlpha=bookConfig.LinkAlpha;
			}
			if(anno.overColor==undefined){
				anno.overColor=bookConfig.LinkDownColor;
			}
			if(anno.downColor==undefined){
				anno.downColor=bookConfig.LinkDownColor;
			}
			if(anno.outColor==undefined){
				anno.outColor=bookConfig.LinkDownColor;
			}
			if(anno.annotype=='com.mobiano.flipbook.pageeditor.TAnnoLink'){
				anno.alpha=bookConfig.LinkAlpha;
			}
		}
	}
}catch(e){
}
try{
	$.browser.device = 2;
}catch(ee){
}