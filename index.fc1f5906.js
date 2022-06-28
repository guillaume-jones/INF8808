function t(t){return t&&t.__esModule?t.default:t}var e,a;a=function(t,e,a,n){var r=t[0],s=t[1],o=!1;void 0===a&&(a=0),void 0===n&&(n=e.length);for(var i=(n-a)/2,c=0,d=i-1;c<i;d=c++){var l=e[a+2*c+0],u=e[a+2*c+1],p=e[a+2*d+0],f=e[a+2*d+1];u>s!=f>s&&r<(p-l)*(s-u)/(f-u)+l&&(o=!o)}return o};var n;async function r(){return await d3.json("montreal.json")}async function s(){return await d3.json("reseau_cyclable.geojson")}function o(a,n,r){let s="";return r.forEach((r=>{t(e)([a,n],r.geometry.coordinates[0][0])&&(s=r.properties.NOM)})),s}function i(t){return d3.geoPath().projection(t)}function c(t,e,a){const n=a([t,e]);return{x:n[0],y:n[1]}}function d(t,e=""){return e&&(t=t.map((t=>t[e]))),t.reduce(((t,e)=>t+(isNaN(e)?0:e)),0)}function l(t,e,a){return t.reduce(((t,n)=>(t[n[e]]=(t[n[e]]||0)+(isNaN(n[a])?0:n[a]),t)),{})}async function u(t){const e={};return await Promise.all(t.map((async t=>{e[t]=await d3.csv("comptage_velo_"+t+".csv")}))),e}async function p(){return await d3.csv("localisation_des_compteurs_velo.csv")}function f(t,e,a){const n={};return a.forEach((a=>{const r=e[a];n[a]={};const s=Object.keys(r[0]).filter((t=>"Date"!==t&&""!==t));s.forEach((e=>{const r=t.find((t=>e.includes("compteur")?e.includes(t.ID):t.Nom===e));n[a][r.Nom]={name:r.Nom,longitude:r.Longitude,latitude:r.Latitude,counts:[]}})),r.forEach((e=>{let r,o="00:00";Object.entries(e).map((([t,e])=>{if("Date"===t){const t=e.split(" ");r=t[0],t.length>1&&(o=t[1])}return[t,e]})).filter((([t])=>s.includes(t))).forEach((([e,s])=>{parseInt(a)>2018&&(e=t.find((t=>e.includes(t.ID))).Nom),n[a][e].counts.push({date:r,time:o,count:parseInt(s)})}))}))})),n}function h(t,e,a){const n={};return Object.entries(t).forEach((([t,r])=>{n[t]=Object.entries(r).map((([t,n])=>({name:t,neighborhood:o(n.longitude,n.latitude,e),counts:d(n.counts,"count"),...c(n.longitude,n.latitude,a)})))})),n}function g(t,e){const a={};return Object.entries(t).forEach((([t,n])=>{let r;a[t]={},Object.entries(n).forEach((([n,s])=>{let i=[];i=s.counts.length>366?Object.values(l(s.counts,"date","count")):s.counts.map((t=>isNaN(t.count)?0:t.count)),r?i.map(((t,e)=>{r[e]+=t})):r=i,a[t][n]={name:n,neighborhood:o(s.longitude,s.latitude,e),counts:i.map(((t,e)=>({index:e,value:t})))}}));const s=Object.keys(n).length;a[t].Average={name:"All",neighborhood:"",counts:r.map(((t,e)=>({index:e,value:Math.round(t/s)})))}})),a}function m(t){const e={};return Object.entries(t).forEach((([t,a])=>{if(parseInt(t)<2019)return;let n;e[t]={},Object.entries(a).forEach((([a,r])=>{let s=Object.values(l(r.counts,"time","count"));n?s.map(((t,e)=>{n[e]+=t})):n=s,e[t][a]={name:a,counts:s.map(((t,e)=>({index:e,value:t})))}}));const r=Object.keys(a).length;e[t].Average={name:"All",counts:n.map(((t,e)=>({index:e,value:Math.round(t/r)})))}})),e}function v(t){const e={};return Object.entries(t).forEach((([t,a])=>{let n=0;Object.entries(a).forEach((([a,r])=>{const s={year:t,counts:d(r.counts,"count")};n+=s.counts,e[a]?e[a].push(s):e[a]=[s]}));const r={year:t,counts:Math.round(n/Object.keys(a).length)};e.Average?e.Average.push(r):e.Average=[r]})),e}function x(){const t=d3.select("#map-base-g").append("defs").append("filter").attr("id","drop-shadow");t.append("feGaussianBlur").attr("in","SourceAlpha").attr("stdDeviation",1).attr("result","blur"),t.append("feOffset").attr("in","blur").attr("dx",1).attr("dy",1).attr("result","offsetBlur");const e=t.append("feMerge");e.append("feMergeNode").attr("in","offsetBlur"),e.append("feMergeNode").attr("in","SourceGraphic")}function b(t,e){d3.select("#map-base-g").selectAll("path").data(t).enter().append("path").attr("d",e).attr("fill","#d8dbe3").attr("stroke","#ffffff").attr("stroke-width",1)}function w(t,e){d3.select("#map-lanes-g").selectAll("path").data(t).enter().append("path").attr("d",e).attr("fill","rgba(0,0,0,0)").attr("stroke","#0bb52d").attr("stroke-width",1.5).attr("filter","drop-shadow")}function y(t,e){const a=function(t){const e=d3.max(t.map((t=>t.counts)));return d3.scaleLinear().domain([0,e]).range([3,9])}(t);d3.select("#map-circles-g").selectAll("circle").remove(),d3.select("#map-circles-g").selectAll("circle").data(t).enter().append("circle").attr("class","circle").attr("r",(t=>a(t.counts))).attr("cx",(t=>t.x)).attr("cy",(t=>t.y)).attr("fill","rgb(18, 81, 153)").attr("stroke","#ffffff").attr("stroke-width",1).on("click",e).on("mouseover",(function(){d3.select(this).transition(500).ease(d3.easeCubicInOut).attr("r",(t=>1.5*a(t.counts)))})).on("mouseout",(function(){d3.select(this).transition(500).ease(d3.easeCubicInOut).attr("r",(t=>a(t.counts)))}))}function A(t){return d3.select("#dropdown").selectAll("myOptions").data(t).enter().append("option").text((function(t){return t})).attr("value",(function(t){return t})),t[0]}function j(t,e){d3.select("#map-svg").append("g").attr("id","line-svg").attr("width",t+80).attr("height",e+80)}function k(){const t=d3.select("#line-svg").append("defs").append("filter").attr("id","drop-shadow");t.append("feGaussianBlur").attr("in","SourceAlpha").attr("stdDeviation",1).attr("result","blur"),t.append("feOffset").attr("in","blur").attr("dx",1).attr("dy",1).attr("result","offsetBlur");const e=t.append("feMerge");e.append("feMergeNode").attr("in","offsetBlur"),e.append("feMergeNode").attr("in","SourceGraphic")}function O(t,e,a,n){const r=d3.select("#line-svg");r.selectAll("g").remove(),function(t,e,a,n,r){t.append("g").append("text").attr("class","axis-label").text("Jours de l'année").attr("x",e/2+30).attr("y",a),t.append("g").append("text").attr("class","axis-label").text("Comptes").attr("x",10).attr("y",a/2).attr("transform","rotate(-90)");const s=t.append("g").append("text").attr("class","graph-title").attr("x",e/2+30).attr("y",15);n?s.text(n+" - "+r):s.text("Moyenne de tous les compteurs")}(r,t+80,e+70,n&&n.name,n&&n.neighborhood);const s=r.append("g").attr("width",t+30).attr("height",e+20).attr("transform","translate(10, 30)"),o=function(t,e){return d3.scaleLinear().domain([0,e]).range([0,t])}(t,a.counts.length),i=function(t,e){return d3.scaleLinear().domain([0,d3.max(e)]).range([t,0]).nice()}(e,[...a.counts.map((t=>t.value)),...n?n.counts.map((t=>t.value)):[]]);!function(t,e,a,n){const r=d3.axisBottom(d3.scaleTime().domain([new Date(2e3,1,0),new Date(2e3,12,1)]).range([0,e]).nice()).ticks(12).tickFormat(d3.timeFormat("%b"));t.append("g").attr("class","axis").attr("transform","translate(59,"+a+")").call(r),t.attr("class","axis").append("g").attr("transform","translate(59,0)").call(d3.axisLeft(n))}(s,t,e,i);const c=s.append("g").attr("width",t).attr("height",e).attr("transform","translate(60, 0)");c.append("path").datum(a.counts).attr("fill","rgba(0, 0, 0, 0)").attr("stroke","#9a9a9a").attr("stroke-width",1).attr("filter","drop-shadow").attr("d",d3.line().x((function(t){return o(t.index)})).y((function(t){return i(t.value)}))),n&&c.append("path").datum(n.counts).attr("fill","rgba(0, 0, 0, 0)").attr("stroke","rgba(18, 81, 153, 1)").attr("stroke-width",1).attr("d",d3.line().x((function(t){return o(t.index)})).y((function(t){return i(t.value)})))}function M(t,e){!function(t,e){t.append("text").attr("class","graph-title").attr("x",e/2+30).attr("y",15).text("Comptes pendant la journée")}(d3.select("#area-svg").attr("width",t+80).attr("height",e+80),t)}function N(){const t=d3.select("#area-svg").append("defs").append("filter").attr("id","drop-shadow");t.append("feGaussianBlur").attr("in","SourceAlpha").attr("stdDeviation",1).attr("result","blur"),t.append("feOffset").attr("in","blur").attr("dx",1).attr("dy",1).attr("result","offsetBlur");const e=t.append("feMerge");e.append("feMergeNode").attr("in","offsetBlur"),e.append("feMergeNode").attr("in","SourceGraphic")}function B(t,e,a,n){const r=d3.select("#area-svg").attr("height",e+80);r.selectAll("g").remove(),function(t,e,a){t.append("g").append("text").attr("class","axis-label").text("Heures de la journée").attr("x",e/2+30).attr("y",a),t.append("g").append("text").attr("class","axis-label").text("Comptes").attr("x",10).attr("y",a/2).attr("transform","rotate(-90)")}(r,t+80,e+70,n&&n.name);const s=r.append("g").attr("width",t+30).attr("height",e+20).attr("transform","translate(10, 30)"),o=function(t){return d3.scaleLinear().domain([0,96]).range([0,t])}(t),i=function(t,e){return d3.scaleLinear().domain([0,d3.max(e)]).range([t,0]).nice()}(e,[...a.counts.map((t=>t.value)),...n?n.counts.map((t=>t.value)):[]]);!function(t,e,a,n){const r=d3.axisBottom(d3.scaleTime().range([0,e-7]).nice()).ticks(20).tickFormat(d3.timeFormat("%H:%M"));t.append("g").attr("class","axis").attr("transform","translate(59,"+a+")").call(r),t.attr("class","axis").append("g").attr("transform","translate(59,0)").call(d3.axisLeft(n))}(s,t,e,i);const c=s.append("g").attr("width",t).attr("height",e).attr("transform","translate(60, 0)");c.append("path").datum(a.counts).attr("fill","#c9c9c9").attr("stroke","#9a9a9a").attr("stroke-width",1).attr("filter","drop-shadow").attr("d",d3.area().x((function(t){return o(t.index)})).y0(e).y1((function(t){return i(t.value)}))),n&&c.append("path").datum(n.counts).attr("fill","rgba(77, 149, 232, 0.5)").attr("stroke","rgba(18, 81, 153, 0.5)").attr("stroke-width",1).attr("d",d3.area().x((function(t){return o(t.index)})).y0(e).y1((function(t){return i(t.value)})))}function C(t){const e=d3.select("#area-svg").attr("height",130);e.selectAll("g").remove(),e.append("g").append("text").attr("class","empty-label").text("Cette donnée n'est pas disponible pour l'année choisie.").attr("x",t/2+30).attr("y",80)}function E(t,e){!function(t,e){t.append("text").attr("class","graph-title").attr("x",e/2+30).attr("y",15).text("Comptes avant et après l'introduction de Bixis électriques")}(d3.select("#bar-svg").attr("width",t+80).attr("height",e+80),t)}function L(t,e,a,n,r){const s=d3.select("#bar-svg");s.selectAll("g").remove(),function(t,e,a){t.append("g").append("text").attr("class","axis-label").text("Années").attr("x",e/2+30).attr("y",a),t.append("g").append("text").attr("class","axis-label").text("Comptes").attr("x",10).attr("y",a/2).attr("transform","rotate(-90)")}(s,t+80,e+70,r&&r.name);const o=s.append("g").attr("width",t+30).attr("height",e+20).attr("transform","translate(10, 30)"),i=function(t,e){return d3.scaleBand().padding(.2).domain(e).range([0,t])}(t,n.map((t=>t.year))),c=function(t){return d3.scaleBand().padding(.02).domain(["Average","Counter"]).range([0,t.bandwidth()])}(i),d=function(t,e){return d3.scaleLinear().domain([0,d3.max(e)]).range([t,0]).nice()}(e,[...n.map((t=>t.counts)),...r?r.map((t=>t.counts)):[]]),l=d3.scaleOrdinal().domain([0,1,2,3]).range(["#c9c9c9","#9a9a9a","rgba(77, 149, 232)","rgba(18, 81, 153)"]);!function(t,e,a,n){t.append("g").attr("class","axis").attr("transform","translate(59,"+e+")").call(d3.axisBottom(a)),t.attr("class","axis").append("g").attr("transform","translate(59,0)").call(d3.axisLeft(n))}(o,e,i,d);const u=o.append("g").attr("width",t).attr("height",e).attr("transform","translate(60, 0)");u.append("g").attr("id","average-bars").selectAll("rect").data(n).enter().append("rect").attr("fill",(t=>t.year<a?l(0):l(1))).attr("x",(t=>i(t.year)+c("Average"))).attr("y",(t=>d(t.counts))).attr("width",c.bandwidth()).attr("height",(t=>e-d(t.counts))),r&&u.append("g").attr("id","counter-bars").selectAll("rect").data(r).enter().append("rect").attr("fill",(t=>t.year<a?l(2):l(3))).attr("x",(t=>i(t.year)+c("Counter"))).attr("y",(t=>d(t.counts))).attr("width",c.bandwidth()).attr("height",(t=>e-d(t.counts)))}async function D(){const t=await d3.json("https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/fr-CA.json");t.shortMonths=t.shortMonths.map((t=>t.slice(0,1).toUpperCase()+t.slice(1))),t.months=t.months.map((t=>t.slice(0,1).toUpperCase()+t.slice(1))),d3.timeFormatDefaultLocale(t)}(e=function(t,e,r,s){return e.length>0&&Array.isArray(e[0])?n(t,e,r,s):a(t,e,r,s)}).nested=n=function(t,e,a,n){var r=t[0],s=t[1],o=!1;void 0===a&&(a=0),void 0===n&&(n=e.length);for(var i=n-a,c=0,d=i-1;c<i;d=c++){var l=e[c+a][0],u=e[c+a][1],p=e[d+a][0],f=e[d+a][1];u>s!=f>s&&r<(p-l)*(s-u)/(f-u)+l&&(o=!o)}return o},e.flat=a,async function(){D();const t=800,e=625,a=400,n=250,o={width:800,height:350},c=o,d=[2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021],l=await r(),_=await s(),I=await p(),G=await u(d);var S,F;S=t,F=e,d3.select("#map-svg").attr("width",S).attr("height",F).append("g").attr("id","map-base-g").attr("width",S).attr("height",F).select((function(){return this.parentNode})).append("g").attr("id","map-lanes-g").attr("width",S).attr("height",F).select((function(){return this.parentNode})).append("g").attr("id","map-circles-g").attr("width",S).attr("height",F),M(o.width,o.height),j(a,n),E(c.width,c.height);const H=d3.geoMercator().center([-73.708879,45.579611]).scale(7e4),P=i(H);b(l,P),w(_,P),x(),k(),N();const T=f(I,G,d),U=h(T,l,H),q=g(T,l),z=m(T),J=v(T);function K(t){var e;y(U[t],(e=Q,t=>{const a=d3.select("#dropdown").property("value"),n=t.name;e(a,n)})),O(a,n,q[t].Average),t>2018?B(o.width,o.height,z[t].Average):C(o.width),L(c.width,c.height,2019,J.Average)}function Q(t,e){O(a,n,q[t].Average,q[t][e]),t>2018?B(o.width,o.height,z[t].Average,z[t][e]):C(o.width),L(c.width,c.height,2019,J.Average,J[e])}const R=A(d);var V;V=K,d3.select("#dropdown").on("change",(()=>{const t=d3.select("#dropdown").property("value");V(t)})),d3.select("#viz-container").style("visibility","visible"),d3.select("#spinner").style("display","none"),K(R)}(d3);
//# sourceMappingURL=index.fc1f5906.js.map
