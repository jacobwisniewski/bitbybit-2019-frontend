(window.webpackJsonptest1=window.webpackJsonptest1||[]).push([[0],{117:function(e,t,a){e.exports={outerContainer:"Note_outerContainer__25H6e"}},122:function(e,t,a){e.exports=a(275)},15:function(e,t,a){e.exports={outerContainer:"Session_outerContainer__23fE5",fadein:"Session_fadein__33Gg3",buttonContainer:"Session_buttonContainer__3b0IC",activity:"Session_activity__24fBh",timer:"Session_timer__3l8P5",button:"Session_button__BUWuM",selector:"Session_selector__3ed6q",header:"Session_header__3RF3P",buttContainer:"Session_buttContainer__3j9P7",smallButton:"Session_smallButton__TRBXt"}},23:function(e,t,a){e.exports={innerContainer:"FileDir_innerContainer__2Hbur",fileHeader:"FileDir_fileHeader__1ZLv0",sadMessage:"FileDir_sadMessage__KNxga",outerContainer:"FileDir_outerContainer__3x_rJ",outerFileList:"FileDir_outerFileList__2uDN4",buttonContainer:"FileDir_buttonContainer__18CaM"}},271:function(e,t){},274:function(e,t,a){},275:function(e,t,a){"use strict";a.r(t);var n=a(1),i=a.n(n),s=a(34),r=a.n(s),o=a(9),c=a(10),l=a(12),u=a(11),m=a(13),d=a(8),b=a(121),h=a(23),f=a.n(h),v=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(i)))).onButtonPress=function(){a.props.onPress(a.props.name)},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props,t=e.active,a=e.name;return i.a.createElement("div",{className:f.a.innerContainer,style:t?{color:"white",fontSize:"19px"}:{},onClick:this.onButtonPress.bind(this)},a)}}]),t}(n.Component),p=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(l.a)(this,Object(u.a)(t).call(this))).fileList=function(){return 0!==e.state.files.length?e.state.files.map(function(t){return i.a.createElement(v,{name:t,onPress:e.changeFileState.bind(Object(d.a)(e)),active:t===e.state.currentFileOpen,key:t})}):i.a.createElement("div",{className:f.a.sadMessage},"No files :(")},e.state={isLoaded:!1,files:[],currentFileOpen:void 0},e.addNewFile=e.addNewFile.bind(Object(d.a)(e)),e}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("https://note-by-note.herokuapp.com/ls").then(function(e){return e.json()}).then(function(t){e.setState({isLoaded:!0,files:t.filenames})},function(t){e.setState({isLoaded:!0,error:t})})}},{key:"changeFileState",value:function(e){this.setState({currentFileOpen:e}),this.props.callbackCurrentFile(e)}},{key:"addNewFile",value:function(){var e=this,t=window.prompt("What is the file name:");null!==t&&fetch("https://note-by-note.herokuapp.com/file/"+t,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:"Hey you made a new file!"})}).then(function(a){e.setState(function(e){return{files:[].concat(Object(b.a)(e.files),[t])}})})}},{key:"render",value:function(){return i.a.createElement("div",{className:f.a.outerContainer},i.a.createElement("div",{className:f.a.fileHeader},"FILES"),this.state.isLoaded?i.a.createElement("div",{className:f.a.outerFileList},this.fileList()):null,i.a.createElement("div",{className:f.a.buttonContainer,onClick:this.addNewFile},"New File"))}}]),t}(n.Component),k=a(119),S=a(20),C=a(35),_=a.n(C),O=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(l.a)(this,Object(u.a)(t).call(this))).loadData=function(){fetch("https://note-by-note.herokuapp.com/file/"+e.props.file).then(function(e){return e.json()}).then(function(t){e.setState({isLoaded:!0,value:S.a.deserialize(t.content)})},function(t){e.setState({isLoaded:!0,error:t})})},e.saveData=function(){fetch("https://note-by-note.herokuapp.com/file/"+e.props.file,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:S.a.serialize(e.state.value)})})},e.onChange=function(t){var a=t.value;a.document!==e.state.value.document&&Z.emit("text",{text:S.a.serialize(a)}),e.setState({value:a})},e.state={isLoaded:!1,value:void 0},e}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){void 0!==this.props.file&&this.loadData(this.props.file)}},{key:"componentDidUpdate",value:function(e){this.props.file!==e.file&&(void 0!==this.state.value?(fetch("https://note-by-note.herokuapp.com/file/"+e.file,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:S.a.serialize(this.state.value)})}),this.loadData()):this.loadData(this.props.file))}},{key:"render",value:function(){var e=this.state,t=e.value,a=e.isLoaded;return i.a.createElement("div",{className:_.a.outerContainer},i.a.createElement("div",{className:_.a.button,onClick:this.saveData},"Save"),void 0!==t&&a?i.a.createElement("div",null,i.a.createElement(k.a,{className:_.a.editor,value:this.state.value,onChange:this.onChange,autoFocus:!0,spellCheck:!0,tabIndex:!0,autoCorrect:!0})):i.a.createElement("div",{className:_.a.helpfulMessage},"Try create a file or open an existing one!"))}}]),t}(n.Component),j=a(117),E=a.n(j),y=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(l.a)(this,Object(u.a)(t).call(this))).callbackCurrentFile=function(t){e.setState({currentFileOpen:t})},e.state={currentFileOpen:void 0},e.callbackCurrentFile=e.callbackCurrentFile.bind(Object(d.a)(e)),e}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:E.a.outerContainer},i.a.createElement(p,{callbackCurrentFile:this.callbackCurrentFile}),i.a.createElement(O,{file:this.state.currentFileOpen}))}}]),t}(n.Component),N=a(120),T=a(15),g=a.n(T),L=a(16),F=a(70),w=function(e){var t=new Date(null);return t.setSeconds(e),t.toISOString().substr(11,8)};function B(e){var t=Object(n.useState)(.05),a=Object(N.a)(t,2),s=a[0],r=a[1];function o(t){r(t+1>1?t:t+1),e.callbackSetTime(t)}return i.a.createElement(F.Spring,{to:{value:s}},function(e){return i.a.createElement(L.CircularInput,{value:e.value,onChange:o,radius:130},i.a.createElement(L.CircularTrack,{strokeWidth:40}),i.a.createElement(L.CircularProgress,{strokeWidth:40,stroke:"#00adb5"}),i.a.createElement(L.CircularThumb,{r:25,fill:"#435055"}))})}var D=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(l.a)(this,Object(u.a)(t).call(this))).sessionEnd=e.sessionEnd.bind(Object(d.a)(e)),e.sessionBreak=e.sessionBreak.bind(Object(d.a)(e)),e}return Object(m.a)(t,e),Object(c.a)(t,[{key:"sessionEnd",value:function(){Z.emit("end_session"),this.props.callbackSessionEnd()}},{key:"sessionBreak",value:function(){this.props.break||(Z.emit("break",{duration:20}),this.props.callbackSessionBreak(20))}},{key:"render",value:function(){var e=this.props.activity;return i.a.createElement("div",{className:g.a.outerContainer},i.a.createElement("div",{className:g.a.header},"Active Session"),i.a.createElement("div",{className:g.a.selector},i.a.createElement(F.Spring,{from:{value:1},to:{value:0},config:{duration:1e3*this.props.timeLeft},key:this.props.sessionTime},function(e){return i.a.createElement(L.CircularInput,{value:e.value,radius:130},i.a.createElement(L.CircularTrack,{strokeWidth:40}),i.a.createElement(L.CircularProgress,{strokeWidth:40,stroke:"#00adb5",strokeLinecap:"butt"}))})),i.a.createElement("div",{className:g.a.timer},w(this.props.timeLeft)),i.a.createElement("div",{className:g.a.buttContainer},i.a.createElement("div",{className:g.a.smallButton,onClick:this.sessionEnd},"Session end"),i.a.createElement("div",{className:g.a.smallButton,onClick:this.sessionBreak},"5  min break")),i.a.createElement("div",{className:g.a.activity,style:{color:"none"===e?"red":"low"===e?"orange":"medium"===e?"#E9E43E":"green"}},"Your activity: ",this.props.activity))}}]),t}(n.Component),x=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(l.a)(this,Object(u.a)(t).call(this))).callbackSetTime=function(t){e.setState({setTime:t})},e.state={setTime:.05},e.callbackSetTime=e.callbackSetTime.bind(Object(d.a)(e)),e.startSession=e.startSession.bind(Object(d.a)(e)),e}return Object(m.a)(t,e),Object(c.a)(t,[{key:"startSession",value:function(){Z.emit("start_session",{duration:60*this.state.setTime*60}),this.props.callbackSessionState(60*this.state.setTime*60*2)}},{key:"render",value:function(){return i.a.createElement("div",{className:g.a.outerContainer},i.a.createElement("div",{className:g.a.header},"Create Session"),i.a.createElement("div",{className:g.a.selector},i.a.createElement(B,{callbackSetTime:this.callbackSetTime})),i.a.createElement("div",{className:g.a.timer},w(60*this.state.setTime*60*2)),i.a.createElement("div",{className:g.a.button,onClick:this.startSession},"Start"))}}]),t}(n.Component),I=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(l.a)(this,Object(u.a)(t).call(this))).callbackSessionBreak=function(t){e.setState({breakTime:t,activeBreak:!0,breakLength:t,reset:!0}),clearInterval(e.timer),e.breakTimer=setInterval(e.breakCountdown,1e3)},e.callbackSessionEnd=function(){e.setState({activeSession:!1,activeBreak:!1,sessionTime:0,setTime:0,activity:"low",timeLeft:0,breakTime:0,breakLength:0}),clearInterval(e.breakTimer),clearInterval(e.timer)},e.callbackSessionState=function(t){e.setState({activeSession:!e.state.activeSession,timeLeft:t,sessionTime:t}),e.timer=setInterval(e.countdown,1e3)},e.countdown=function(){e.state.timeLeft<=0?(e.setState({timeLeft:0}),clearInterval(e.timer),e.callbackSessionEnd()):e.setState({timeLeft:e.state.timeLeft-1})},e.breakCountdown=function(){e.state.breakTime<=0?(e.setState({breakTime:0,activeBreak:!1,sessionTime:e.state.timeLeft}),clearInterval(e.breakTimer),e.timer=setInterval(e.countdown,1e3)):e.setState({breakTime:e.state.breakTime-1})},e.state={activeSession:!1,activeBreak:!1,sessionTime:0,setTime:0,activity:"low",timeLeft:0,breakTime:0,breakLength:0},e.callbackSessionState=e.callbackSessionState.bind(Object(d.a)(e)),e.countDown=e.countdown.bind(Object(d.a)(e)),e.breakCountdown=e.breakCountdown.bind(Object(d.a)(e)),e.callbackSessionEnd=e.callbackSessionEnd.bind(Object(d.a)(e)),e.callbackSessionBreak=e.callbackSessionBreak.bind(Object(d.a)(e)),e}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;Z.on("activity",function(t){e.setState({activity:t})})}},{key:"render",value:function(){var e=this.state.activeSession;return i.a.createElement("div",{className:g.a.outerContainer},e?i.a.createElement(D,{break:this.state.activeBreak,activity:this.state.activity,timeLeft:this.state.activeBreak?this.state.breakTime:this.state.timeLeft,sessionTime:this.state.activeBreak?this.state.breakLength:this.state.sessionTime,callbackSessionEnd:this.callbackSessionEnd,callbackSessionBreak:this.callbackSessionBreak}):i.a.createElement(x,{callbackSessionState:this.callbackSessionState}))}}]),t}(n.Component),P=a(118),M=a.n(P),W=a(71),H=a.n(W),J=a(72),z=a.n(J),A=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:z.a.outerContainer},i.a.createElement("div",{className:z.a.header},"Note-by-Note"))}}]),t}(n.Component),Z=M()("http://bitbybit-2019.herokuapp.com"),K=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){Z.emit("text",{text:"This is a text message"}),Z.on("activity",function(e){return console.log(e)})}},{key:"render",value:function(){return i.a.createElement("div",{className:H.a.outerContainer},i.a.createElement(A,null),i.a.createElement("div",{className:H.a.noteContainer},i.a.createElement(y,null),i.a.createElement(I,null)))}}]),t}(n.Component);a(274);r.a.render(i.a.createElement(K,null),document.getElementById("root"))},35:function(e,t,a){e.exports={outerContainer:"Writing_outerContainer__27wZ5",editor:"Writing_editor__36gHj",helpfulMessage:"Writing_helpfulMessage__1DKg5",button:"Writing_button__10WPW"}},71:function(e,t,a){e.exports={noteContainer:"App_noteContainer__1it6t",outerContainer:"App_outerContainer__1ynt3"}},72:function(e,t,a){e.exports={outerContainer:"Header_outerContainer__358Zy",header:"Header_header__3mObx"}}},[[122,1,2]]]);
//# sourceMappingURL=main.13cfdc24.chunk.js.map