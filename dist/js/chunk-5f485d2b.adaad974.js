(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5f485d2b"],{"0117":function(e,t,a){},"07b5":function(e,t,a){"use strict";var n=a("0117"),r=a.n(n);r.a},"546c":function(e,t,a){"use strict";a.d(t,"d",(function(){return r})),a.d(t,"a",(function(){return s})),a.d(t,"f",(function(){return i})),a.d(t,"e",(function(){return l})),a.d(t,"b",(function(){return o})),a.d(t,"c",(function(){return c}));a("99af");var n=a("b775"),r=function(e){return Object(n["a"])("/companys","get",e)},s=function(e){return Object(n["a"])("/companys","post",e)},i=function(e){return Object(n["a"])("/companys/".concat(e.id),"put",e)},l=function(e){return Object(n["a"])("/companys/".concat(e.id),"delete",e)},o=function(e){return Object(n["a"])("/companys/".concat(e.id),"get",e)},c=function(e){return Object(n["a"])("/companys/".concat(e.id,"/").concat(e.state),"post",e)}},"6af7":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"dashboard-container"},[a("div",{staticClass:"app-container"},[a("el-card",{attrs:{shadow:"never"}},[a("el-form",{ref:"requestParameters",attrs:{model:e.requestParameters}},[a("div",{staticClass:"filter-container"},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:5}},[a("el-form-item",{attrs:{label:"标签名称：",prop:"tags"}},[a("el-input",{staticClass:"filter-item",staticStyle:{width:"180px"},attrs:{placeholder:"请输入"},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.requestParameters.tags,callback:function(t){e.$set(e.requestParameters,"tags",t)},expression:"requestParameters.tags"}})],1)],1),a("el-col",{attrs:{span:3}},[a("el-form-item",{attrs:{label:"省：",prop:"province"}},[a("el-select",{staticClass:"filter-item",staticStyle:{width:"120px"},attrs:{filterable:""},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)},change:e.handleProvince},model:{value:e.requestParameters.province,callback:function(t){e.$set(e.requestParameters,"province",t)},expression:"requestParameters.province"}},e._l(e.citySelect.province,(function(e){return a("el-option",{key:e,attrs:{label:e,value:e}})})),1)],1)],1),a("el-col",{attrs:{span:3}},[a("el-form-item",{attrs:{label:"市：",prop:"city"}},[a("el-select",{staticClass:"filter-item",staticStyle:{width:"120px"},attrs:{filterable:""},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.requestParameters.city,callback:function(t){e.$set(e.requestParameters,"city",t)},expression:"requestParameters.city"}},e._l(e.citySelect.cityDate,(function(e){return a("el-option",{key:e,attrs:{label:e,value:e}})})),1)],1)],1),a("el-col",{attrs:{span:5}},[a("el-form-item",{attrs:{label:"企业简称：",prop:"shortName"}},[a("el-input",{staticStyle:{width:"180px"},model:{value:e.requestParameters.shortName,callback:function(t){e.$set(e.requestParameters,"shortName",t)},expression:"requestParameters.shortName"}})],1)],1),a("el-col",{attrs:{span:3}},[a("el-form-item",{attrs:{label:"状态：",prop:"state"}},[a("el-select",{staticClass:"filter-item",staticStyle:{width:"100px"},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.requestParameters.state,callback:function(t){e.$set(e.requestParameters,"state",t)},expression:"requestParameters.state"}},e._l(e.status,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)],1),a("el-col",{attrs:{span:2}},[a("el-form-item",{attrs:{label:"操作："}},[a("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v("搜索")])],1)],1)],1),a("el-button",{staticClass:"filter-item fr",staticStyle:{"margin-left":"10px"},attrs:{size:"small",type:"primary",icon:"el-icon-edit"},on:{click:function(t){return e.handleChange("add")}}},[e._v("新增用户")])],1)]),""!==e.alertText?a("el-alert",{staticClass:"alert",attrs:{title:e.alertText,type:"info",closable:!1,"show-icon":""}}):e._e(),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.dataList,"element-loading-text":"给我一点时间",fit:"","highlight-current-row":"",border:""}},[a("el-table-column",{attrs:{align:"center",label:"序号"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.id))])]}}])}),a("el-table-column",{attrs:{align:"center",label:"企业编号"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.number))])]}}])}),a("el-table-column",{attrs:{align:"center",label:"企业简称"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.shortName))])]}}])}),a("el-table-column",{attrs:{label:"标签"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.tags))])]}}])}),a("el-table-column",{attrs:{align:"center",label:"创建者"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.creatorID))])]}}])}),a("el-table-column",{attrs:{align:"center",label:"创建日期"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.addDate))])]}}])}),a("el-table-column",{attrs:{align:"center",label:"备注"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.remarks))])]}}])}),a("el-table-column",{attrs:{align:"center",label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.state?a("span",[e._v("启用")]):a("span",[e._v("禁用")])]}}])}),a("el-table-column",{attrs:{align:"center",label:"操作",width:"280","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return e.handleChange(t.row.id)}}},[e._v("编辑")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return e.handleStatus(t.row)}}},[0==t.row.state?a("span",[e._v("启用")]):a("span",[e._v("禁用")])]),"deleted"!=t.row.status?a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.removeUser(t.row.id)}}},[e._v("删除")]):e._e()]}}])})],1),a("div",{staticClass:"pagination"},[a("div",{staticClass:"pages"},[a("el-pagination",{attrs:{background:"","current-page":Number(e.requestParameters.page),total:Number(e.total),"page-size":Number(e.requestParameters.pagesize),"page-sizes":[10,20,30,50],layout:"sizes, prev, pager, next, jumper"},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)]),a("Dialog",{ref:"editUser",attrs:{titleInfo:e.titleInfo,formBase:e.formData},on:{newDataes:e.getList}})],1)],1)])},r=[],s=(a("a434"),a("96cf"),a("1da1")),i=a("72a0"),l=a("546c"),o=a("b59c"),c=a("0737"),u={name:"CompanysList",components:{Dialog:c["default"]},data:function(){return{tableKey:0,dataList:[],total:null,listLoading:!0,alertText:"",requestParameters:{page:1,pagesize:10},titleInfo:{pageTitle:"用户",text:""},formData:{isFamous:"",shortName:"",company:"",province:"",city:"",tags:"",remarks:""},citySelect:{province:[],cityDate:[]}}},computed:{status:function(){return i["a"]}},methods:{initialDate:function(){this.getList()},getList:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.listLoading=!0,e.next=3,Object(l["d"])(t.requestParameters);case 3:a=e.sent,n=a.data,t.dataList=n.items,t.total=n.counts,t.alertText="共 ".concat(t.total," 条记录"),t.listLoading=!1;case 9:case"end":return e.stop()}}),e)})))()},resetForm:function(){this.$refs.requestParameters.resetFields()},handleFilter:function(){this.requestParameters.page=1,this.getList(this.requestParameters)},handleSizeChange:function(e){this.requestParameters.pagesize=e,1===this.requestParameters.page&&this.getList(this.requestParameters)},handleCurrentChange:function(e){this.requestParameters.page=e,this.getList()},query:function(){this.formData={}},handleChange:function(e){this.query(),this.$refs.editUser.dialogFormV(),"add"===e?this.titleInfo.text="创建":(this.titleInfo.text="编辑",this.hanldeEditForm(e))},hanldeEditForm:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var n,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.formData.id=e,a.next=3,Object(l["b"])({id:e});case 3:n=a.sent,r=n.data,t.formData=r;case 6:case"end":return a.stop()}}),a)})))()},removeUser:function(e){var t=this;this.$confirm("此操作将永久删除用户 , 是否继续?","提示",{type:"warning"}).then(Object(s["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,Object(l["e"])({id:e}).then((function(a){t.$message.success("成功删除了用户!"),t.dataList.splice(e,1),t.getList(t.requestParameters)})).catch((function(e){t.$message.error("删除失败!")}));case 2:case"end":return a.stop()}}),a)})))).catch((function(){t.$message.info("已取消操作!")}))},handleStatus:function(e){var t=this,a="";!0===e.state?(e.state=0,a="禁用"):(e.state=1,a="启用");var n={id:e.id,state:e.state};this.$confirm("已成功"+a+", 是否继续?","提示",{type:"warning"}).then(Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(l["c"])(n).then((function(e){t.$message.success("已成功"+a+"!"),t.getList(t.requestParameters)})).catch((function(e){t.$message.error(a+"失败!")}));case 2:case"end":return e.stop()}}),e)})))).catch((function(){t.$message.info("已取消操作!")}))},getCityData:function(){this.citySelect.province=Object(o["b"])()},handleProvince:function(e){this.citySelect.cityDate=Object(o["a"])(e),this.requestParameters.city=this.citySelect.cityDate[0]}},mounted:function(){},created:function(){var e=this;this.initialDate(),this.getCityData(),document.onkeydown=function(t){var a=window.event.keyCode;13===a&&e.handleFilter(this.requestParameters)}},updated:function(){}},f=u,d=(a("6b00"),a("07b5"),a("2877")),m=Object(d["a"])(f,n,r,!1,null,"4a7a0229",null);t["default"]=m.exports},"6b00":function(e,t,a){"use strict";var n=a("f1af"),r=a.n(n);r.a},"72a0":function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var n=[{value:1,label:"启用"},{value:0,label:"禁用"}]},f1af:function(e,t,a){}}]);
//# sourceMappingURL=chunk-5f485d2b.adaad974.js.map