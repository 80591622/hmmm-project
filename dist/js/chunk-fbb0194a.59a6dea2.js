(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fbb0194a"],{"0c39":function(t,e,o){"use strict";o("99af"),o("4160"),o("a630"),o("3ca3"),o("159b");var i=o("2b0e");function n(t){if(!(this instanceof n))return new n(t,null,null)}n.treeToArray=function(t,e,o,a){var s=[];return Array.from(t).forEach((function(t){void 0===t._expanded&&i["default"].set(t,"_expanded",a),e&&i["default"].set(t,"_parent",e);var l=0;if(void 0!==o&&null!==o&&(l=o+1),i["default"].set(t,"_level",l),s.push(t),t.childs&&t.childs.length>0){var r=n.treeToArray(t.childs,t,l,a);s=s.concat(r)}if(t.points&&t.points.length>0){var d=n.treeToArray(t.points,t,l,a);s=s.concat(d)}})),s},e["a"]=n},"19b4":function(t,e,o){"use strict";var i=o("fa5f"),n=o.n(i);n.a},"36a5":function(t,e,o){"use strict";var i=o("f9d0"),n=o.n(i);n.a},d957:function(t,e,o){"use strict";o.r(e);var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"add-form"},[o("el-dialog",{attrs:{title:t.text+t.pageTitle,visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[o("el-form",{ref:"formMenu",staticStyle:{width:"400px","margin-left":"120px"},attrs:{rules:t.ruleInline,model:t.formMenu,"label-position":"left","label-width":"120px"}},[o("el-form-item",{attrs:{label:t.$t("table.permissionUser")}},[o("el-radio-group",{staticClass:"choose-type",on:{change:t.handleChooseType},model:{value:t.type,callback:function(e){t.type=e},expression:"type"}},[o("el-radio",{staticClass:"choose-item",attrs:{label:"menu",disabled:t.typeStatus}},[t._v("菜单")]),o("el-radio",{staticClass:"choose-item",attrs:{label:"points",disabled:t.typeStatus}},[t._v("权限点")])],1)],1),o("el-form-item",{attrs:{label:t.$t("table.permissionUser")}},[o("el-select",{model:{value:t.formMenu.pid,callback:function(e){t.$set(t.formMenu,"pid",e)},expression:"formMenu.pid"}},[o("el-option",{attrs:{value:0,label:t.$t("table.powerNav")}},[t._v("主导航")]),t._l(t.notPointDataList,(function(e){return o("el-option",{key:e.id,class:"moveIn"+e.layer,attrs:{value:e.id,label:e.title,disabled:"points"===t.type&&!!e.childs}})}))],2)],1),t.showMenuBlock?o("div",[o("el-form-item",{attrs:{label:t.$t("table.powerCode"),prop:"code"}},[o("el-input",{model:{value:t.formMenu.code,callback:function(e){t.$set(t.formMenu,"code",e)},expression:"formMenu.code"}})],1),o("el-form-item",{attrs:{label:t.$t("table.powerTitle"),prop:"title"}},[o("el-input",{model:{value:t.formMenu.title,callback:function(e){t.$set(t.formMenu,"title",e)},expression:"formMenu.title"}})],1)],1):t._e(),t.showPointBlock?o("div",{attrs:{model:t.formPoints}},[o("el-form-item",{attrs:{label:t.$t("table.powerCode"),prop:"code"}},[o("el-input",{model:{value:t.formPoints.code,callback:function(e){t.$set(t.formPoints,"code",e)},expression:"formPoints.code"}})],1),o("el-form-item",{attrs:{label:t.$t("table.powerTitle"),prop:"title"}},[o("el-input",{model:{value:t.formPoints.title,callback:function(e){t.$set(t.formPoints,"title",e)},expression:"formPoints.title"}})],1)],1):t._e()],1),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:t.handleClose}},[t._v(t._s(t.$t("table.cancel")))]),o("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.handleSubmit("formMenu")}}},[t._v(t._s(t.$t("table.confirm")))])],1)],1)],1)},n=[],a=(o("a9e3"),o("a394")),s=(o("0c39"),[]),l={name:"items",props:{treeStructure:{type:Boolean,default:function(){return!1}},text:{type:String},pageTitle:{type:String},PermissionGroupsList:{type:Array}},data:function(){var t=function t(e,o,i){var n=s.formMenu.code;if(""===o)i(new Error("代码不能为空"));else{t.ifHave=!1;var a=s.formMenu.pid;t.ifHaveCodeExciting=function(e){for(var o=0;o<e.length;o++)e[o].childs&&e[o].childs.length>0&&t.ifHaveCodeExciting(e[o].childs),e[o].points&&e[o].points.length>0&&e[o].id===a&&t.doPoints(e[o].points)},t.doPoints=function(e){for(var o=0;o<e.length;o++)e[o].code&&e[o].code===n&&(t.ifHave=!0)},t.ifHaveCodeExciting(s.parentDataList),i()}};return{type:"menu",showMenuBlock:!0,showPointBlock:!1,dialogFormVisible:!1,typeStatus:!1,notPointDataList:[],parentDataList:[],formMenu:{pid:"",is_point:"",code:"",title:""},formPoints:{pid:"",is_point:"",code:"",title:""},codepast:"",ruleInline:{title:[{required:!0,message:"标题不能为空",trigger:"blur"}],code:[{required:!0,validator:t,trigger:"blur"}]},leafCount:[]}},computed:{},methods:{dialogFormV:function(){this.dialogFormVisible=!0},dialogFormH:function(){this.dialogFormVisible=!1},handleChooseType:function(){"menu"===this.type&&s.changeToMenu(),"points"===this.type&&s.changeToPoints()},changeType:function(t){"menu"===t&&(this.type="menu",s.changeToMenu()),"points"===t&&(this.type="points",s.changeToPoints()),this.typeStatus=!0},changeArays:function(){var t=function t(e){for(var o=0;o<e.length;o++)void 0!==e[o].code&&s.notPointDataList.push(e[o]),e[o].childs&&e[o].childs.length>0&&t(e[o].childs)};t(s.parentDataList)},changeToMenu:function(){s.showMenuBlock=!0,s.showPointBlock=!1,s.notPointDataList=[],this.changeArays()},changeToPoints:function(){s.showMenuBlock=!1,s.showPointBlock=!0,s.formMenu=s.formPoints,s.formMenu.pid=s.formPoints.pid,s.formMenu.code=s.formPoints.code,s.formMenu.title=s.formPoints.title,s.notPointDataList=[],this.changeArays()},handleClose:function(){this.$emit("handleCloseModal")},handle_Edit:function(t){var e=this;Object(a["f"])(this.formMenu).then((function(){e.$emit("handleCloseModal"),e.$emit("newDataes",e.formMenu)}))},select_Add:function(){var t=this;Object(a["a"])(this.formMenu).then((function(){s.handleResetForm(),t.$emit("handleCloseModal"),t.$emit("newDataes",t.formMenu)}))},handle_Add:function(t){"points"===s.type?(this.formMenu.is_point=!0,this.select_Add()):(this.formMenu.is_point=!1,this.select_Add())},handleSubmit:function(t){var e=this;if(s.formMenu.pid=Number(s.formMenu.pid),s.formMenu.id){var o=s.formMenu.code;o===this.codepast?(this.$refs.formMenu.validateField("title"),s.handle_Edit(t)):s.$refs[t].validate((function(o){o?s.handle_Edit(t):e.$Message.error("表单验证失败")}))}else s.$refs[t].validate((function(o){o?s.handle_Add(t):e.$Message.error("表单验证失败")}))},dataRest:function(t){for(var e=0;e<t.length;e++){if(t[e].childs&&t[e].childs.length>0)for(var o=0;o<t[e].childs.length;o++)this.$set(t[e].childs[o],"layer",1);this.$set(t[e],"layer",0)}},hanldeEditForm:function(t){var e=this;this.formMenu.id=t,Object(a["c"])().then((function(t){s.parentDataList=t.data,s.notPointDataList=[],e.dataRest(t.data),e.changeArays()})),Object(a["b"])({id:t}).then((function(t){e.formMenu.id=t.data.id,e.formMenu.pid=t.data.pid,e.formMenu.title=t.data.title,e.formMenu.code=t.data.code,e.formMenu.is_point=t.data.is_point;var o=t.data,i=e.type;"points"===i&&(e.formMenu.code=t.data.code),null===o.pid&&(e.formMenu.pid=0)}))},handleResetForm:function(){var t=this;this.formMenu.id="",this.formMenu.pid=0,this.formMenu.title="",this.formMenu.code="",s.typeStatus=!1,s.type="menu",Object(a["c"])().then((function(e){s.parentDataList=e.data,s.notPointDataList=s.parentDataList,t.dataRest(e.data),s.changeToMenu()}))}},mounted:function(){},created:function(){s=this},updated:function(){}},r=l,d=(o("36a5"),o("19b4"),o("2877")),c=Object(d["a"])(r,i,n,!1,null,"701fabc8",null);e["default"]=c.exports},f9d0:function(t,e,o){},fa5f:function(t,e,o){}}]);
//# sourceMappingURL=chunk-fbb0194a.59a6dea2.js.map