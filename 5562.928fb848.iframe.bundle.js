"use strict";(globalThis.webpackChunk_danskernesdigitalebibliotek_dpl_react=globalThis.webpackChunk_danskernesdigitalebibliotek_dpl_react||[]).push([[5562],{"./src/apps/opening-hours-editor/helper.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{As:()=>getInitialDateFromUrl,DH:()=>formatFullCalendarEventToCmsEventEdit,DT:()=>updateDateTime,GY:()=>formatFullCalendarEventToCmsEventAdd,Ne:()=>adjustEndDateBasedOnStartDate,Ni:()=>adjustEndDateToStartDayTimeGridWeek,W:()=>formatCmsEventsToFullCalendar,bu:()=>getStringForDateInput,sD:()=>getWeekDayName,sK:()=>adjustEndDateToStartDayGridMonth,sq:()=>getDateString,te:()=>formatDateStr,vO:()=>extractTime,zp:()=>isOpeningHourWeeklyRepetition});var dayjs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/dayjs/dayjs.min.js"),dayjs__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__),_core_dpl_cms_model__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/core/dpl-cms/model/index.ts");const formatDateTimeString=(date,time)=>`${date}T${time}:00`,formatCmsEventsToFullCalendar=data=>data.map((({category,date,start_time,end_time,id,repetition})=>({id:id.toString(),title:category.title,start:formatDateTimeString(date,start_time),end:formatDateTimeString(date,end_time),color:category.color,repetition}))),formatFullCalendarEventToCmsEventAdd=event=>{if(!event.title||!event.color)throw new Error("Invalid event format");const startDate=dayjs__WEBPACK_IMPORTED_MODULE_0___default()(event.startStr),endDate=dayjs__WEBPACK_IMPORTED_MODULE_0___default()(event.endStr);return{id:Number(event.id),category:{title:event.title,color:event.color},date:startDate.format("YYYY-MM-DD"),start_time:startDate.format("HH:mm"),end_time:endDate.format("HH:mm"),repetition:event.repetition,branch_id:0}},formatFullCalendarEventToCmsEventEdit=event=>{if(!event.title||!event.backgroundColor)throw new Error("Invalid event format");const startDate=dayjs__WEBPACK_IMPORTED_MODULE_0___default()(event.startStr),endDate=dayjs__WEBPACK_IMPORTED_MODULE_0___default()(event.endStr);return{id:Number(event.id),category:{title:event.title,color:event.backgroundColor},date:startDate.format("YYYY-MM-DD"),start_time:startDate.format("HH:mm"),end_time:endDate.format("HH:mm"),repetition:event.repetition,branch_id:0}},formatDateStr=date=>dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date).format("YYYY-MM-DDTHH:mm:ssZ"),adjustEndDateBasedOnStartDate=(startDay,endDay)=>{const start=dayjs__WEBPACK_IMPORTED_MODULE_0___default()(startDay),end=dayjs__WEBPACK_IMPORTED_MODULE_0___default()(endDay);return start.isSame(end,"day")?endDay:start.hour(end.hour()).minute(end.minute()).second(end.second()).toDate()},adjustEndDateToStartDayTimeGridWeek=(startDay,endDay)=>{let adjustedEndDay;const start=dayjs__WEBPACK_IMPORTED_MODULE_0___default()(startDay),end=dayjs__WEBPACK_IMPORTED_MODULE_0___default()(endDay);return adjustedEndDay=start.isSame(end,"day")?end:start.add(1,"day").startOf("day"),{end:adjustedEndDay.toDate(),endStr:formatDateStr(adjustedEndDay.toDate())}},adjustEndDateToStartDayGridMonth=(startDay,endDay)=>{const adjustedEndDay=adjustEndDateBasedOnStartDate(startDay,endDay);return{end:adjustedEndDay,endStr:formatDateStr(adjustedEndDay)}},extractTime=date=>dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date).format("HH:mm"),updateDateTime=(date,timeStr)=>{const[hours,minutes]=timeStr.split(":").map(Number);return dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date).hour(hours).minute(minutes).toDate()},getWeekDayName=date=>dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date).format("dddd"),getDateString=date=>dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date).format("DD-MM-YYYY"),getStringForDateInput=date=>dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date).format("YYYY-MM-DD"),isOpeningHourWeeklyRepetition=event=>{var _event$extendedProps,_event$extendedProps$,_event$event$extended,_event$event$extended2;return"event"in event?(null===(_event$event$extended=event.event.extendedProps)||void 0===_event$event$extended||null===(_event$event$extended2=_event$event$extended.repetition)||void 0===_event$event$extended2?void 0:_event$event$extended2.type)===_core_dpl_cms_model__WEBPACK_IMPORTED_MODULE_1__._$.weekly:(null===(_event$extendedProps=event.extendedProps)||void 0===_event$extendedProps||null===(_event$extendedProps$=_event$extendedProps.repetition)||void 0===_event$extendedProps$?void 0:_event$extendedProps$.type)===_core_dpl_cms_model__WEBPACK_IMPORTED_MODULE_1__._$.weekly},getInitialDateFromUrl=()=>{const initialDateString=new URLSearchParams(window.location.search).get("initialDate");if(!initialDateString)return null;const date=new Date(initialDateString);return Number.isNaN(date.getTime())?(console.debug("Invalid date format in URL parameter: initialDate =",initialDateString),null):date}},"./src/core/dpl-cms/dpl-cms.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{J0:()=>getDplOpeningHoursListGETQueryKey,Fg:()=>useCampaignMatchPOST,hi:()=>useDplOpeningHoursCreatePOST,v2:()=>useDplOpeningHoursDeleteDELETE,Dp:()=>useDplOpeningHoursListGET,I1:()=>useDplOpeningHoursUpdatePATCH,vS:()=>useProxyUrlGET});var es=__webpack_require__("./node_modules/react-query/es/index.js"),FetchFailedError=__webpack_require__("./src/core/fetchers/FetchFailedError.ts"),helpers=__webpack_require__("./src/core/fetchers/helpers.ts"),core_token=__webpack_require__("./src/core/token.js"),extractServiceBaseUrls=__webpack_require__("./src/core/utils/reduxMiddleware/extractServiceBaseUrls.ts"),FetcherHttpError=__webpack_require__("./src/core/fetchers/FetcherHttpError.ts");function _defineProperty(e,r,t){return(r=function _toPropertyKey(t){var i=function _toPrimitive(t,r){if("object"!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}(t,"string");return"symbol"==typeof i?i:i+""}(r))in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}class DplCmsServiceHttpError extends FetcherHttpError.A{constructor(...args){super(...args),_defineProperty(this,"name","DplCmsServiceHttpError")}}const fetcher_fetcher=async({url,method,headers,params,data})=>{const token=(0,core_token.gf)(core_token.CI)??(0,core_token.gf)(core_token._L),authHeaders=token?{Authorization:`Bearer ${token}`}:{},body=data?JSON.stringify(data):null,serviceUrl=(0,helpers.Z4)({baseUrl:(0,extractServiceBaseUrls.aW)(extractServiceBaseUrls.TJ.dplCms),url,params});try{const response=await fetch(serviceUrl,{method,headers:{...headers,...authHeaders},body});if(!response.ok)throw new DplCmsServiceHttpError(response.status,response.statusText,serviceUrl);try{return await response.json()}catch(e){if(!(e instanceof SyntaxError))throw e}}catch(error){if(error instanceof DplCmsServiceHttpError)throw error;const message=error instanceof Error?error.message:"Unknown error";throw new FetchFailedError.A(message,serviceUrl)}return null},getCampaignMatchPOSTMutationOptions=options=>{const{mutation:mutationOptions}=options??{};return{mutationFn:props=>{const{data,params}=props??{};return((campaignMatchPOSTBodyItem,params)=>fetcher_fetcher({url:"/dpl_campaign/match",method:"POST",headers:{"Content-Type":"application/json"},data:campaignMatchPOSTBodyItem,params}))(data,params)},...mutationOptions}},useCampaignMatchPOST=options=>{const mutationOptions=getCampaignMatchPOSTMutationOptions(options);return(0,es.useMutation)(mutationOptions)},getDplOpeningHoursCreatePOSTMutationOptions=options=>{const{mutation:mutationOptions}=options??{};return{mutationFn:props=>{const{data,params}=props??{};return((dplOpeningHoursCreatePOSTOpeningHoursInstanceBody,params)=>fetcher_fetcher({url:"/api/v1/opening_hours",method:"POST",headers:{"Content-Type":"application/json"},data:dplOpeningHoursCreatePOSTOpeningHoursInstanceBody,params}))(data,params)},...mutationOptions}},useDplOpeningHoursCreatePOST=options=>{const mutationOptions=getDplOpeningHoursCreatePOSTMutationOptions(options);return(0,es.useMutation)(mutationOptions)},getDplOpeningHoursListGETQueryKey=params=>["/api/v1/opening_hours",...params?[params]:[]],getDplOpeningHoursListGETQueryOptions=(params,queryOptions)=>({queryKey:(null==queryOptions?void 0:queryOptions.queryKey)??getDplOpeningHoursListGETQueryKey(params),queryFn:({signal})=>((params,signal)=>fetcher_fetcher({url:"/api/v1/opening_hours",method:"GET",params,signal}))(params,signal),...queryOptions});function useDplOpeningHoursListGET(params,queryOptions){const options=getDplOpeningHoursListGETQueryOptions(params,queryOptions),query=(0,es.useQuery)(options);return query.queryKey=options.queryKey,query}const getDplOpeningHoursDeleteDELETEMutationOptions=options=>{const{mutation:mutationOptions}=options??{};return{mutationFn:props=>{const{id,params}=props??{};return((id,params)=>fetcher_fetcher({url:`/api/v1/opening_hours/${id}`,method:"DELETE",params}))(id,params)},...mutationOptions}},useDplOpeningHoursDeleteDELETE=options=>{const mutationOptions=getDplOpeningHoursDeleteDELETEMutationOptions(options);return(0,es.useMutation)(mutationOptions)},getDplOpeningHoursUpdatePATCHMutationOptions=options=>{const{mutation:mutationOptions}=options??{};return{mutationFn:props=>{const{id,data,params}=props??{};return((id,dplOpeningHoursCreatePOSTOpeningHoursInstanceBody,params)=>fetcher_fetcher({url:`/api/v1/opening_hours/${id}`,method:"PATCH",headers:{"Content-Type":"application/json"},data:dplOpeningHoursCreatePOSTOpeningHoursInstanceBody,params}))(id,data,params)},...mutationOptions}},useDplOpeningHoursUpdatePATCH=options=>{const mutationOptions=getDplOpeningHoursUpdatePATCHMutationOptions(options);return(0,es.useMutation)(mutationOptions)};const getProxyUrlGETQueryOptions=(params,queryOptions)=>{const queryKey=(null==queryOptions?void 0:queryOptions.queryKey)??(params=>["/dpl-url-proxy",...params?[params]:[]])(params);return{queryKey,queryFn:({signal})=>((params,signal)=>fetcher_fetcher({url:"/dpl-url-proxy",method:"GET",params,signal}))(params,signal),...queryOptions}};function useProxyUrlGET(params,queryOptions){const options=getProxyUrlGETQueryOptions(params,queryOptions),query=(0,es.useQuery)(options);return query.queryKey=options.queryKey,query}},"./src/core/dpl-cms/model/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Jw:()=>DplOpeningHoursCreatePOSTOpeningHoursInstanceBodyRepetitionType,_$:()=>DplOpeningHoursListGET200ItemRepetitionType});const DplOpeningHoursCreatePOSTOpeningHoursInstanceBodyRepetitionType={none:"none",weekly:"weekly"},DplOpeningHoursListGET200ItemRepetitionType={none:"none",weekly:"weekly"}},"./src/core/storybook/serviceUrlArgs.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__,U:()=>argTypes});var _utils_reduxMiddleware_extractServiceBaseUrls__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/core/utils/reduxMiddleware/extractServiceBaseUrls.ts"),process=__webpack_require__("./node_modules/process/browser.js");const argTypes={[_utils_reduxMiddleware_extractServiceBaseUrls__WEBPACK_IMPORTED_MODULE_0__.TJ.fbs]:{description:"Base url for the FBS API",control:{type:"text"},table:{type:{summary:"text"},defaultValue:{summary:"https://fbs-openplatform.dbc.dk"}}},[_utils_reduxMiddleware_extractServiceBaseUrls__WEBPACK_IMPORTED_MODULE_0__.TJ.publizon]:{description:"Base url for the Publizon API",control:{type:"text"},table:{type:{summary:"text"},defaultValue:{summary:"https://pubhub-openplatform.dbc.dk"}}},[_utils_reduxMiddleware_extractServiceBaseUrls__WEBPACK_IMPORTED_MODULE_0__.TJ.dplCms]:{description:"Base url for the DPL CMS API",control:{type:"text"},table:{type:{summary:"text"},defaultValue:{summary:"https://dpl-cms.docker"}}},[_utils_reduxMiddleware_extractServiceBaseUrls__WEBPACK_IMPORTED_MODULE_0__.TJ.cover]:{description:"Base url for the cover service",control:{type:"text"},table:{type:{summary:"text"},defaultValue:{summary:"https://cover.dandigbib.org"}}},[_utils_reduxMiddleware_extractServiceBaseUrls__WEBPACK_IMPORTED_MODULE_0__.TJ.materialList]:{description:"Base url for the material list service",control:{type:"text"},table:{type:{summary:"text"},defaultValue:{summary:"https://prod.materiallist.dandigbib.org"}}},[_utils_reduxMiddleware_extractServiceBaseUrls__WEBPACK_IMPORTED_MODULE_0__.TJ.fbi]:{description:"Base url for the FBI API",control:{type:"text"},table:{type:{summary:"text"},defaultValue:{summary:"https://temp.fbi-api.dbc.dk/next-present/graphql"}}},[_utils_reduxMiddleware_extractServiceBaseUrls__WEBPACK_IMPORTED_MODULE_0__.TJ.fbiLocal]:{description:"Base url for the FBI API (local inventory)",control:{type:"text"},table:{type:{summary:"text"},defaultValue:{summary:"https://temp.fbi-api.dbc.dk/next/graphql"}}},[_utils_reduxMiddleware_extractServiceBaseUrls__WEBPACK_IMPORTED_MODULE_0__.TJ.fbiGlobal]:{description:"Base url for the FBI API (global inventory)",control:{type:"text"},table:{type:{summary:"text"},defaultValue:{summary:"https://temp.fbi-api.dbc.dk/next-present/graphql"}}}},__WEBPACK_DEFAULT_EXPORT__={[_utils_reduxMiddleware_extractServiceBaseUrls__WEBPACK_IMPORTED_MODULE_0__.TJ.fbs]:process.env.FBS_BASEURL??"https://fbs-openplatform.dbc.dk",[_utils_reduxMiddleware_extractServiceBaseUrls__WEBPACK_IMPORTED_MODULE_0__.TJ.publizon]:process.env.PUBLIZON_BASEURL??"https://pubhub-openplatform.dbc.dk",[_utils_reduxMiddleware_extractServiceBaseUrls__WEBPACK_IMPORTED_MODULE_0__.TJ.dplCms]:process.env.CMS_BASEURL??"https://dpl-cms.docker",[_utils_reduxMiddleware_extractServiceBaseUrls__WEBPACK_IMPORTED_MODULE_0__.TJ.cover]:"https://cover.dandigbib.org",[_utils_reduxMiddleware_extractServiceBaseUrls__WEBPACK_IMPORTED_MODULE_0__.TJ.materialList]:"https://prod.materiallist.dandigbib.org",[_utils_reduxMiddleware_extractServiceBaseUrls__WEBPACK_IMPORTED_MODULE_0__.TJ.fbi]:"https://temp.fbi-api.dbc.dk/next-present/graphql",[_utils_reduxMiddleware_extractServiceBaseUrls__WEBPACK_IMPORTED_MODULE_0__.TJ.fbiLocal]:"https://temp.fbi-api.dbc.dk/next/graphql",[_utils_reduxMiddleware_extractServiceBaseUrls__WEBPACK_IMPORTED_MODULE_0__.TJ.fbiGlobal]:"https://temp.fbi-api.dbc.dk/next-present/graphql"}},"./src/core/utils/url.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ik:()=>useUrls,nU:()=>withUrls});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_store__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/core/store.ts"),_url_slice__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/core/url.slice.ts"),_helpers_url__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/core/utils/helpers/url.ts"),_withSuffix__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/core/utils/withSuffix.tsx");const useUrls=()=>{const{data}=(0,_store__WEBPACK_IMPORTED_MODULE_1__.d4)((state=>state.url)),urls=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>(0,_helpers_url__WEBPACK_IMPORTED_MODULE_4__.tP)(data)),[data]);return(name,returnFalseIfUndefined=!1)=>{if(returnFalseIfUndefined)return urls[name]||!1;if(!urls[name])throw new Error(`The url ${name} is not defined`);return urls[name]}},withUrls=Component=>(0,_withSuffix__WEBPACK_IMPORTED_MODULE_3__.A)(Component,"Url",_url_slice__WEBPACK_IMPORTED_MODULE_2__.hx);try{withUrls.displayName="withUrls",withUrls.__docgenInfo={description:"",displayName:"withUrls",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/core/utils/url.tsx#withUrls"]={docgenInfo:withUrls.__docgenInfo,name:"withUrls",path:"src/core/utils/url.tsx#withUrls"})}catch(__react_docgen_typescript_loader_error){}}}]);