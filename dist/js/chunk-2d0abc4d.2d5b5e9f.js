(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0abc4d"],{"174e":function(e,a,t){"use strict";t.r(a);var r=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{class:e.className,style:{height:e.height,width:e.width}})},i=[],n=t("313e"),l=t.n(n),o=t("ed08");t("817d");var s={props:{className:{type:String,default:"chart"},width:{type:String,default:"100%"},height:{type:String,default:"100%"}},data:function(){return{chart:null}},mounted:function(){var e=this;this.initChart(),this.__resizeHanlder=Object(o["a"])((function(){e.chart&&e.chart.resize()}),100),window.addEventListener("resize",this.__resizeHanlder)},beforeDestroy:function(){this.chart&&(window.removeEventListener("resize",this.__resizeHanlder),this.chart.dispose(),this.chart=null)},methods:{initChart:function(){this.chart=l.a.init(this.$el,"macarons"),this.chart.setOption({tooltip:{trigger:"item",formatter:"{a} <br/>{b}: {c} ({d}%)"},legend:{orient:"vertical",x:"left",data:["直达","营销广告","搜索引擎","邮件营销","联盟广告","视频广告","百度","谷歌","必应","其他"]},series:[{name:"访问来源",type:"pie",selectedMode:"single",radius:[0,"30%"],label:{normal:{position:"inner"}},labelLine:{normal:{show:!1}},data:[{value:335,name:"直达",selected:!0},{value:679,name:"营销广告"},{value:1548,name:"搜索引擎"}]},{name:"访问来源",type:"pie",radius:["60%","75%"],labelxxx:{normal:{formatter:"{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",backgroundColor:"#eee",borderColor:"#aaa",borderWidth:1,borderRadius:4,rich:{a:{color:"#999",lineHeight:22,align:"center"},hr:{borderColor:"#aaa",width:"100%",borderWidth:.5,height:0},b:{fontSize:16,lineHeight:33},per:{color:"#eee",backgroundColor:"#334455",padding:[2,4],borderRadius:2}}}},data:[{value:335,name:"直达"},{value:310,name:"邮件营销"},{value:234,name:"联盟广告"},{value:135,name:"视频广告"},{value:1048,name:"百度"},{value:251,name:"谷歌"},{value:147,name:"必应"},{value:102,name:"其他"}]}]})}}},d=s,h=t("2877"),c=Object(h["a"])(d,r,i,!1,null,null,null);a["default"]=c.exports}}]);
//# sourceMappingURL=chunk-2d0abc4d.2d5b5e9f.js.map