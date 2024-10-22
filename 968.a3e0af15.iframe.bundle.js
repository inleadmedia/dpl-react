"use strict";(globalThis.webpackChunk_danskernesdigitalebibliotek_dpl_react=globalThis.webpackChunk_danskernesdigitalebibliotek_dpl_react||[]).push([[968],{"./src/components/button-favourite/button-favourite.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>button_favourite});var react=__webpack_require__("./node_modules/react/index.js"),es=__webpack_require__("./node_modules/react-query/es/index.js"),Reload=__webpack_require__("./node_modules/@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Reload.svg"),Reload_default=__webpack_require__.n(Reload);const IconFavourite=({fill,darkBackground})=>{let classes=fill?"icon-favourite icon-favourite--filled":"icon-favourite";return darkBackground&&(classes=fill?"icon-favourite--bright-filled":"icon-favourite--bright"),react.createElement("svg",{height:"24",width:"24",className:classes,viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},react.createElement("path",{d:"M11.5 20L10.2675 18.921C5.89 15.1035 3 12.5858 3 9.49591C3 6.9782 5.057 5 7.675 5C9.154 5 10.5735 5.66213 11.5 6.70845C12.4265 5.66213 13.846 5 15.325 5C17.943 5 20 6.9782 20 9.49591C20 12.5858 17.11 15.1035 12.7325 18.9292L11.5 20Z",strokeWidth:"2"}))};try{IconFavourite.displayName="IconFavourite",IconFavourite.__docgenInfo={description:"",displayName:"IconFavourite",props:{fill:{defaultValue:null,description:"",name:"fill",required:!1,type:{name:"boolean | undefined"}},darkBackground:{defaultValue:null,description:"",name:"darkBackground",required:!1,type:{name:"boolean | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/icon-favourite/icon-favourite.tsx#IconFavourite"]={docgenInfo:IconFavourite.__docgenInfo,name:"IconFavourite",path:"src/components/icon-favourite/icon-favourite.tsx#IconFavourite"})}catch(__react_docgen_typescript_loader_error){}var material_list=__webpack_require__("./src/core/material-list-api/material-list.ts"),utils_text=__webpack_require__("./src/core/utils/text.tsx"),useStatistics=__webpack_require__("./src/core/statistics/useStatistics.ts"),statistics=__webpack_require__("./src/core/statistics/statistics.ts");const button_favourite=({id,addToListRequest,darkBackground,title})=>{const queryClient=(0,es.useQueryClient)(),[fillState,setFillState]=(0,react.useState)(!1),[isLoadingHeart,setIsLoadingHeart]=(0,react.useState)(!0),t=(0,utils_text.F)(),{mutate}=(0,material_list.Xi)(),{track}=(0,useStatistics.B)();(0,react.useEffect)((()=>{setIsLoadingHeart(!0),mutate({listId:"default",itemId:id},{onSuccess:()=>{setFillState(!0),setIsLoadingHeart(!1)},onError:()=>{setFillState(!1),setIsLoadingHeart(!1)}})}),[id,mutate]);const handleClick=(0,react.useCallback)((e=>{fillState?((0,material_list.Ai)("default",id,queryClient),setFillState(!1)):(track("click",{id:statistics.o.addToFavorites.id,name:statistics.o.addToFavorites.name,trackedData:id}),addToListRequest(id),setFillState(!0)),e.stopPropagation()}),[addToListRequest,fillState,id,queryClient,track]);return react.createElement("button",{type:"button","aria-label":t(fillState?"removeFromFavoritesAriaLabelText":"addToFavoritesAriaLabelText",{placeholders:{"@title":title}}),onClick:handleClick,className:"button-favourite"},isLoadingHeart&&react.createElement("img",{src:Reload_default(),alt:t("isLoadingHeartText")}),!isLoadingHeart&&react.createElement(IconFavourite,{darkBackground,fill:fillState}))};try{buttonfavourite.displayName="buttonfavourite",buttonfavourite.__docgenInfo={description:"",displayName:"buttonfavourite",props:{id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"ButtonFavouriteId"}},darkBackground:{defaultValue:null,description:"",name:"darkBackground",required:!1,type:{name:"boolean | undefined"}},addToListRequest:{defaultValue:null,description:"",name:"addToListRequest",required:!0,type:{name:"(id: ButtonFavouriteId) => void"}},title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/button-favourite/button-favourite.tsx#buttonfavourite"]={docgenInfo:buttonfavourite.__docgenInfo,name:"buttonfavourite",path:"src/components/button-favourite/button-favourite.tsx#buttonfavourite"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/cover/cover.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Y:()=>Cover});var react=__webpack_require__("./node_modules/react/index.js"),clsx=__webpack_require__("./node_modules/clsx/dist/clsx.mjs"),es=__webpack_require__("./node_modules/react-query/es/index.js"),FetchFailedError=__webpack_require__("./src/core/fetchers/FetchFailedError.ts"),token=__webpack_require__("./src/core/token.js"),extractServiceBaseUrls=__webpack_require__("./src/core/utils/reduxMiddleware/extractServiceBaseUrls.ts"),FetcherHttpError=__webpack_require__("./src/core/fetchers/FetcherHttpError.ts");function _defineProperty(e,r,t){return(r=function _toPropertyKey(t){var i=function _toPrimitive(t,r){if("object"!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}(t,"string");return"symbol"==typeof i?i:i+""}(r))in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}class CoverServiceHttpError extends FetcherHttpError.A{constructor(...args){super(...args),_defineProperty(this,"name","CoverServiceHttpError")}}const fetcher=async({url,method,params,data})=>{const additionalHeaders="object"===(null==data?void 0:data.headers)?null==data?void 0:data.headers:{},libraryToken=(0,token.gf)(token._L),headers={...libraryToken?{Authorization:`Bearer ${libraryToken}`}:{},...additionalHeaders},body=data?JSON.stringify(data):null,serviceUrl=(({baseUrl,url,params})=>`${baseUrl}${url}?${new URLSearchParams(params)}`)({baseUrl:(0,extractServiceBaseUrls.aW)(extractServiceBaseUrls.TJ.cover),url,params});try{const response=await fetch(serviceUrl,{method,headers,body});if(!response.ok)throw new CoverServiceHttpError(response.status,response.statusText,serviceUrl);try{return await response.json()}catch(e){if(!(e instanceof SyntaxError))throw e}}catch(error){if(error instanceof CoverServiceHttpError)throw error;const message=error instanceof Error?error.message:"Unknown error";throw new FetchFailedError.A(message,serviceUrl)}return null},getGetCoverCollectionQueryOptions=(params,options)=>{const{query:queryOptions}=options??{},queryKey=(null==queryOptions?void 0:queryOptions.queryKey)??(params=>["/api/v2/covers",...params?[params]:[]])(params);return{queryKey,queryFn:({signal})=>((params,signal)=>fetcher({url:"/api/v2/covers",method:"GET",params,signal}))(params,signal),...queryOptions}};var LinkNoStyle=__webpack_require__("./src/components/atoms/links/LinkNoStyle.tsx");const cover_image=({src,altText,animate,setImageLoaded,shadow})=>react.createElement("img",{onLoad:setImageLoaded,className:(0,clsx.A)("cover__img",{"cover__img--animate":animate},{"cover__img--shadow-small":"small"===shadow,"cover__img--shadow-medium":"medium"===shadow}),src,alt:altText||""});try{coverimage.displayName="coverimage",coverimage.__docgenInfo={description:"",displayName:"coverimage",props:{src:{defaultValue:null,description:"",name:"src",required:!0,type:{name:"string"}},altText:{defaultValue:null,description:"",name:"altText",required:!1,type:{name:"string | undefined"}},animate:{defaultValue:null,description:"",name:"animate",required:!0,type:{name:"boolean"}},setImageLoaded:{defaultValue:null,description:"",name:"setImageLoaded",required:!0,type:{name:"() => void"}},shadow:{defaultValue:null,description:"",name:"shadow",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"small"'},{value:'"medium"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/cover/cover-image.tsx#coverimage"]={docgenInfo:coverimage.__docgenInfo,name:"coverimage",path:"src/components/cover/cover-image.tsx#coverimage"})}catch(__react_docgen_typescript_loader_error){}var first=__webpack_require__("./node_modules/lodash/first.js"),first_default=__webpack_require__.n(first);const getUrl=(cover,size)=>{var _cover$imageUrls,_cover$imageUrls$size;return null===(_cover$imageUrls=cover.imageUrls)||void 0===_cover$imageUrls||null===(_cover$imageUrls$size=_cover$imageUrls[size])||void 0===_cover$imageUrls$size?void 0:_cover$imageUrls$size.url},getCoverUrl=({coverData,bestRepresentation,size})=>{if(!coverData)return null;const covers=(({coverData,size})=>coverData?coverData.filter((cover=>getUrl(cover,size))):[])({coverData,size}),firstCover=first_default()(covers);if(!bestRepresentation&&firstCover&&getUrl(firstCover,size))return getUrl(firstCover,size);const bestRepresentationCover=first_default()(covers.filter((cover=>bestRepresentation&&cover.id===bestRepresentation.pid)));return bestRepresentationCover&&getUrl(bestRepresentationCover,size)?getUrl(bestRepresentationCover,size):firstCover&&getUrl(firstCover,size)?getUrl(firstCover,size):null};const Cover=({url,alt,size,displaySize,animate,tint,ids,bestRepresentation,idType="pid",shadow,linkAriaLabelledBy})=>{const[imageLoaded,setImageLoaded]=(0,react.useState)(null),handleSetImageLoaded=(0,react.useCallback)((()=>{setImageLoaded(!0)}),[]);let dataSize=size;"xsmall"===dataSize?dataSize="small":"xlarge"===dataSize&&(dataSize="large");const{data}=((params,options)=>{const queryOptions=getGetCoverCollectionQueryOptions(params,options),query=(0,es.useQuery)(queryOptions);return query.queryKey=queryOptions.queryKey,query})({type:idType,identifiers:ids,sizes:[dataSize]}),coverSrc=getCoverUrl({coverData:data,bestRepresentation,size:dataSize}),coverDisplaySize=displaySize||size,classes={wrapper:(0,clsx.A)("cover",`cover--size-${coverDisplaySize}`,`cover--aspect-${coverDisplaySize}`,imageLoaded||{default:"bg-identity-tint-120",120:"bg-identity-tint-120",100:"bg-identity-tint-100",80:"bg-identity-tint-80",40:"bg-identity-tint-40",20:"bg-identity-tint-20"}[tint||"default"])};return url?react.createElement(LinkNoStyle.A,{className:classes.wrapper,url,ariaLabelledBy:linkAriaLabelledBy,isHiddenFromScreenReaders:!alt},coverSrc&&react.createElement(cover_image,{setImageLoaded:handleSetImageLoaded,src:coverSrc,altText:alt,animate,shadow})):react.createElement("div",{className:classes.wrapper},coverSrc&&react.createElement(cover_image,{setImageLoaded:handleSetImageLoaded,src:coverSrc,altText:alt,animate,shadow}))};try{Cover.displayName="Cover",Cover.__docgenInfo={description:"",displayName:"Cover",props:{animate:{defaultValue:null,description:"",name:"animate",required:!0,type:{name:"boolean"}},size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"xsmall"'},{value:'"small"'},{value:'"medium"'},{value:'"large"'},{value:'"xlarge"'},{value:'"original"'}]}},displaySize:{defaultValue:null,description:"",name:"displaySize",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"xsmall"'},{value:'"small"'},{value:'"medium"'},{value:'"large"'},{value:'"xlarge"'},{value:'"original"'},{value:'"2xsmall"'}]}},tint:{defaultValue:null,description:"",name:"tint",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"20"'},{value:'"40"'},{value:'"80"'},{value:'"100"'},{value:'"120"'}]}},ids:{defaultValue:null,description:"",name:"ids",required:!0,type:{name:"string[]"}},bestRepresentation:{defaultValue:null,description:"",name:"bestRepresentation",required:!1,type:{name:"Manifestation | undefined"}},alt:{defaultValue:null,description:"",name:"alt",required:!1,type:{name:"string | undefined"}},url:{defaultValue:null,description:"",name:"url",required:!1,type:{name:"URL | undefined"}},idType:{defaultValue:{value:"pid"},description:"",name:"idType",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"pid"'},{value:'"faust"'},{value:'"isbn"'},{value:'"issn"'}]}},shadow:{defaultValue:null,description:"",name:"shadow",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"small"'},{value:'"medium"'}]}},linkAriaLabelledBy:{defaultValue:null,description:"",name:"linkAriaLabelledBy",required:!1,type:{name:"string | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/cover/cover.tsx#Cover"]={docgenInfo:Cover.__docgenInfo,name:"Cover",path:"src/components/cover/cover.tsx#Cover"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/guarded-app.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),react_redux__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react-redux/es/index.js"),_core_guardedRequests_slice__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/core/guardedRequests.slice.ts"),_core_utils_helpers_date__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/core/utils/helpers/date.ts"),_core_utils_helpers_url__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/core/utils/helpers/url.ts"),_core_utils_helpers_user__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/core/utils/helpers/user.ts");const __WEBPACK_DEFAULT_EXPORT__=({app,children})=>{const dispatch=(0,react_redux__WEBPACK_IMPORTED_MODULE_1__.wA)(),{request:persistedRequest}=(0,react_redux__WEBPACK_IMPORTED_MODULE_1__.d4)((state=>state.guardedRequests)),isApplicationBlocked=persistedRequest&&!(0,_core_utils_helpers_user__WEBPACK_IMPORTED_MODULE_4__.ok)(),didAuthenticate=(0,_core_utils_helpers_url__WEBPACK_IMPORTED_MODULE_5__.d6)(_core_guardedRequests_slice__WEBPACK_IMPORTED_MODULE_2__.l0);return console.debug("PERSISTED REQUEST:",persistedRequest),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{persistedRequest&&(console.debug("HAS REQUEST EXPIRED?",(0,_core_guardedRequests_slice__WEBPACK_IMPORTED_MODULE_2__.d2)(persistedRequest)),console.debug("CURRENT TIMESTAMP",(0,_core_utils_helpers_date__WEBPACK_IMPORTED_MODULE_3__.Ay)()),console.debug("EXPIRE TIMESTAMP",persistedRequest.expire),(0,_core_guardedRequests_slice__WEBPACK_IMPORTED_MODULE_2__.d2)(persistedRequest)&&dispatch((0,_core_guardedRequests_slice__WEBPACK_IMPORTED_MODULE_2__.ss)()))}),[dispatch,persistedRequest]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{if(!isApplicationBlocked)return;const{app:persistedRequestApp}=persistedRequest;didAuthenticate&&app===persistedRequestApp&&(dispatch((0,_core_guardedRequests_slice__WEBPACK_IMPORTED_MODULE_2__.Cp)(persistedRequest)),(0,_core_utils_helpers_url__WEBPACK_IMPORTED_MODULE_5__.MR)(_core_guardedRequests_slice__WEBPACK_IMPORTED_MODULE_2__.l0),dispatch((0,_core_guardedRequests_slice__WEBPACK_IMPORTED_MODULE_2__.ss)()))}),[app,didAuthenticate,dispatch,isApplicationBlocked,persistedRequest]),isApplicationBlocked?react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",null):react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,children)};try{guardedapp.displayName="guardedapp",guardedapp.__docgenInfo={description:"",displayName:"guardedapp",props:{app:{defaultValue:null,description:"",name:"app",required:!0,type:{name:"enum",value:[{value:'"material"'},{value:'"search-result"'},{value:'"advanced-search"'},{value:'"recommender"'},{value:'"something-similar"'},{value:'"favorites-list-mc"'},{value:'"inspiration-recommender"'},{value:'"recommended-material"'},{value:'"recommendation"'},{value:'"material-grid-automatic"'},{value:'"material-grid-manual"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/guarded-app.tsx#guardedapp"]={docgenInfo:guardedapp.__docgenInfo,name:"guardedapp",path:"src/components/guarded-app.tsx#guardedapp"})}catch(__react_docgen_typescript_loader_error){}},"./src/core/statistics/statistics.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{o:()=>statistics});const statistics={searchQuery:{id:10,name:"OSS"},searchResultCount:{id:11,name:"OSS Results"},searchFacets:{id:20,name:"Søgning Facet"},materialType:{id:24,name:"Materialetype"},materialGenre:{id:25,name:"Materiale Genre"},materialLanguage:{id:29,name:"Materiale Sprog"},materialSource:{id:30,name:"Materiale Kilde"},materialTargetAudience:{id:31,name:"Materiale Målgruppe"},materialTopicNumber:{id:32,name:"Materiale - DK5-nummer (Emnetal)"},materialFictionNonFiction:{id:33,name:"Materiale Fiktion/nonfiktion"},materialStatus:{id:38,name:"Materiale Status"},searchResultNumberClick:{id:42,name:"Søgning - Resultatnummer klik"},campaignClick:{id:48,name:"Kampagneklik"},reservation:{id:50,name:"Reserver"},onlineReservation:{id:51,name:"Se online"},autosuggestClick:{id:54,name:"Autosuggest - klik"},campaignShown:{id:62,name:"KampagnePlus Titel"},renewSelectedMaterials:{id:55,name:"Forny valgte materialer"},renewAllMaterials:{id:56,name:"Forny alle materialer"},addToFavorites:{id:61,name:"Tilføj til liste"}}},"./src/core/statistics/useStatistics.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function useStatistics(){return window.wts||(window.wts={push(trackingProps){console.log(`Tracking: ${trackingProps[0]}, ${trackingProps[1]}, ${JSON.stringify(trackingProps[2])}`)}}),{track:(eventType,trackParameters)=>{const eventData={linkId:trackParameters.name,customClickParameter:{}};return eventData.customClickParameter[trackParameters.id]=trackParameters.trackedData,window.wts.push(["send",eventType,eventData]),new Promise((resolve=>{setTimeout((()=>{resolve("resolved")}),500)}))}}}__webpack_require__.d(__webpack_exports__,{B:()=>useStatistics})}}]);