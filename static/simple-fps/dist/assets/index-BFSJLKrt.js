(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ac="160",Qf=0,su=1,ep=2,mh=1,gh=2,Fi=3,yr=0,Bn=1,vi=2,ar=0,Ts=1,ou=2,au=3,lu=4,tp=5,Cr=100,np=101,ip=102,cu=103,uu=104,rp=200,sp=201,op=202,ap=203,lc=204,cc=205,lp=206,cp=207,up=208,dp=209,hp=210,fp=211,pp=212,mp=213,gp=214,_p=0,yp=1,vp=2,wa=3,xp=4,Mp=5,Sp=6,Ep=7,Wa=0,wp=1,bp=2,lr=0,Tp=1,Ap=2,Rp=3,Pp=4,Cp=5,Lp=6,du="attached",Dp="detached",_h=300,Fs=301,Ns=302,ba=303,uc=304,Xa=306,mo=1e3,Vn=1001,dc=1002,gn=1003,hu=1004,pl=1005,Jn=1006,Ip=1007,go=1008,cr=1009,Up=1010,Fp=1011,Rc=1012,yh=1013,nr=1014,Oi=1015,_o=1016,vh=1017,xh=1018,Nr=1020,Np=1021,Qn=1023,Op=1024,Bp=1025,Or=1026,Os=1027,zp=1028,Mh=1029,kp=1030,Sh=1031,Eh=1033,ml=33776,gl=33777,_l=33778,yl=33779,fu=35840,pu=35841,mu=35842,gu=35843,wh=36196,_u=37492,yu=37496,vu=37808,xu=37809,Mu=37810,Su=37811,Eu=37812,wu=37813,bu=37814,Tu=37815,Au=37816,Ru=37817,Pu=37818,Cu=37819,Lu=37820,Du=37821,vl=36492,Iu=36494,Uu=36495,Gp=36283,Fu=36284,Nu=36285,Ou=36286,Ta=2300,Aa=2301,xl=2302,Bu=2400,zu=2401,ku=2402,Hp=2500,bh=3e3,Br=3001,Vp=3200,Wp=3201,ja=0,Xp=1,ei="",jt="srgb",Hi="srgb-linear",Pc="display-p3",qa="display-p3-linear",Ra="linear",Lt="srgb",Pa="rec709",Ca="p3",Jr=7680,Gu=519,jp=512,qp=513,$p=514,Th=515,Yp=516,Zp=517,Kp=518,Jp=519,Hu=35044,Vu="300 es",hc=1035,Bi=2e3,La=2001;class $r{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Mn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Wu=1234567;const oo=Math.PI/180,Bs=180/Math.PI;function xr(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Mn[i&255]+Mn[i>>8&255]+Mn[i>>16&255]+Mn[i>>24&255]+"-"+Mn[e&255]+Mn[e>>8&255]+"-"+Mn[e>>16&15|64]+Mn[e>>24&255]+"-"+Mn[t&63|128]+Mn[t>>8&255]+"-"+Mn[t>>16&255]+Mn[t>>24&255]+Mn[n&255]+Mn[n>>8&255]+Mn[n>>16&255]+Mn[n>>24&255]).toLowerCase()}function _n(i,e,t){return Math.max(e,Math.min(t,i))}function Cc(i,e){return(i%e+e)%e}function Qp(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function em(i,e,t){return i!==e?(t-i)/(e-i):0}function ao(i,e,t){return(1-t)*i+t*e}function tm(i,e,t,n){return ao(i,e,1-Math.exp(-t*n))}function nm(i,e=1){return e-Math.abs(Cc(i,e*2)-e)}function im(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function rm(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function sm(i,e){return i+Math.floor(Math.random()*(e-i+1))}function om(i,e){return i+Math.random()*(e-i)}function am(i){return i*(.5-Math.random())}function lm(i){i!==void 0&&(Wu=i);let e=Wu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function cm(i){return i*oo}function um(i){return i*Bs}function fc(i){return(i&i-1)===0&&i!==0}function dm(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Da(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function hm(i,e,t,n,r){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),u=a((e+n)/2),d=s((e-n)/2),h=a((e-n)/2),f=s((n-e)/2),g=a((n-e)/2);switch(r){case"XYX":i.set(o*u,l*d,l*h,o*c);break;case"YZY":i.set(l*h,o*u,l*d,o*c);break;case"ZXZ":i.set(l*d,l*h,o*u,o*c);break;case"XZX":i.set(o*u,l*g,l*f,o*c);break;case"YXY":i.set(l*f,o*u,l*g,o*c);break;case"ZYZ":i.set(l*g,l*f,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function ys(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Cn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Ct={DEG2RAD:oo,RAD2DEG:Bs,generateUUID:xr,clamp:_n,euclideanModulo:Cc,mapLinear:Qp,inverseLerp:em,lerp:ao,damp:tm,pingpong:nm,smoothstep:im,smootherstep:rm,randInt:sm,randFloat:om,randFloatSpread:am,seededRandom:lm,degToRad:cm,radToDeg:um,isPowerOfTwo:fc,ceilPowerOfTwo:dm,floorPowerOfTwo:Da,setQuaternionFromProperEuler:hm,normalize:Cn,denormalize:ys};class ot{constructor(e=0,t=0){ot.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(_n(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Qe{constructor(e,t,n,r,s,a,o,l,c){Qe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c)}set(e,t,n,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],d=n[7],h=n[2],f=n[5],g=n[8],_=r[0],p=r[3],m=r[6],v=r[1],y=r[4],M=r[7],P=r[2],A=r[5],R=r[8];return s[0]=a*_+o*v+l*P,s[3]=a*p+o*y+l*A,s[6]=a*m+o*M+l*R,s[1]=c*_+u*v+d*P,s[4]=c*p+u*y+d*A,s[7]=c*m+u*M+d*R,s[2]=h*_+f*v+g*P,s[5]=h*p+f*y+g*A,s[8]=h*m+f*M+g*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*s*u+n*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=u*a-o*c,h=o*l-u*s,f=c*s-a*l,g=t*d+n*h+r*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=d*_,e[1]=(r*c-u*n)*_,e[2]=(o*n-r*a)*_,e[3]=h*_,e[4]=(u*t-r*l)*_,e[5]=(r*s-o*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(a*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Ml.makeScale(e,t)),this}rotate(e){return this.premultiply(Ml.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ml.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ml=new Qe;function Ah(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function yo(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function fm(){const i=yo("canvas");return i.style.display="block",i}const Xu={};function lo(i){i in Xu||(Xu[i]=!0,console.warn(i))}const ju=new Qe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),qu=new Qe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Xo={[Hi]:{transfer:Ra,primaries:Pa,toReference:i=>i,fromReference:i=>i},[jt]:{transfer:Lt,primaries:Pa,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[qa]:{transfer:Ra,primaries:Ca,toReference:i=>i.applyMatrix3(qu),fromReference:i=>i.applyMatrix3(ju)},[Pc]:{transfer:Lt,primaries:Ca,toReference:i=>i.convertSRGBToLinear().applyMatrix3(qu),fromReference:i=>i.applyMatrix3(ju).convertLinearToSRGB()}},pm=new Set([Hi,qa]),bt={enabled:!0,_workingColorSpace:Hi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!pm.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=Xo[e].toReference,r=Xo[t].fromReference;return r(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return Xo[i].primaries},getTransfer:function(i){return i===ei?Ra:Xo[i].transfer}};function As(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Sl(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Qr;class Rh{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Qr===void 0&&(Qr=yo("canvas")),Qr.width=e.width,Qr.height=e.height;const n=Qr.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Qr}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=yo("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=As(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(As(t[n]/255)*255):t[n]=As(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let mm=0;class Ph{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:mm++}),this.uuid=xr(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(El(r[a].image)):s.push(El(r[a]))}else s=El(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function El(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Rh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let gm=0;class on extends $r{constructor(e=on.DEFAULT_IMAGE,t=on.DEFAULT_MAPPING,n=Vn,r=Vn,s=Jn,a=go,o=Qn,l=cr,c=on.DEFAULT_ANISOTROPY,u=ei){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:gm++}),this.uuid=xr(),this.name="",this.source=new Ph(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ot(0,0),this.repeat=new ot(1,1),this.center=new ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(lo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===Br?jt:ei),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==_h)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case mo:e.x=e.x-Math.floor(e.x);break;case Vn:e.x=e.x<0?0:1;break;case dc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case mo:e.y=e.y-Math.floor(e.y);break;case Vn:e.y=e.y<0?0:1;break;case dc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return lo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===jt?Br:bh}set encoding(e){lo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Br?jt:ei}}on.DEFAULT_IMAGE=null;on.DEFAULT_MAPPING=_h;on.DEFAULT_ANISOTROPY=1;class yt{constructor(e=0,t=0,n=0,r=1){yt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],f=l[5],g=l[9],_=l[2],p=l[6],m=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+_)<.1&&Math.abs(g+p)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(c+1)/2,M=(f+1)/2,P=(m+1)/2,A=(u+h)/4,R=(d+_)/4,I=(g+p)/4;return y>M&&y>P?y<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(y),r=A/n,s=R/n):M>P?M<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),n=A/r,s=I/r):P<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(P),n=R/s,r=I/s),this.set(n,r,s,t),this}let v=Math.sqrt((p-g)*(p-g)+(d-_)*(d-_)+(h-u)*(h-u));return Math.abs(v)<.001&&(v=1),this.x=(p-g)/v,this.y=(d-_)/v,this.z=(h-u)/v,this.w=Math.acos((c+f+m-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class _m extends $r{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new yt(0,0,e,t),this.scissorTest=!1,this.viewport=new yt(0,0,e,t);const r={width:e,height:t,depth:1};n.encoding!==void 0&&(lo("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Br?jt:ei),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Jn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new on(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Ph(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class kr extends _m{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Ch extends on{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=gn,this.minFilter=gn,this.wrapR=Vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ym extends on{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=gn,this.minFilter=gn,this.wrapR=Vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Qt{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],u=n[r+2],d=n[r+3];const h=s[a+0],f=s[a+1],g=s[a+2],_=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(o===1){e[t+0]=h,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(d!==_||l!==h||c!==f||u!==g){let p=1-o;const m=l*h+c*f+u*g+d*_,v=m>=0?1:-1,y=1-m*m;if(y>Number.EPSILON){const P=Math.sqrt(y),A=Math.atan2(P,m*v);p=Math.sin(p*A)/P,o=Math.sin(o*A)/P}const M=o*v;if(l=l*p+h*M,c=c*p+f*M,u=u*p+g*M,d=d*p+_*M,p===1-o){const P=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=P,c*=P,u*=P,d*=P}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,r,s,a){const o=n[r],l=n[r+1],c=n[r+2],u=n[r+3],d=s[a],h=s[a+1],f=s[a+2],g=s[a+3];return e[t]=o*g+u*d+l*f-c*h,e[t+1]=l*g+u*h+c*d-o*f,e[t+2]=c*g+u*f+o*h-l*d,e[t+3]=u*g-o*d-l*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(r/2),d=o(s/2),h=l(n/2),f=l(r/2),g=l(s/2);switch(a){case"XYZ":this._x=h*u*d+c*f*g,this._y=c*f*d-h*u*g,this._z=c*u*g+h*f*d,this._w=c*u*d-h*f*g;break;case"YXZ":this._x=h*u*d+c*f*g,this._y=c*f*d-h*u*g,this._z=c*u*g-h*f*d,this._w=c*u*d+h*f*g;break;case"ZXY":this._x=h*u*d-c*f*g,this._y=c*f*d+h*u*g,this._z=c*u*g+h*f*d,this._w=c*u*d-h*f*g;break;case"ZYX":this._x=h*u*d-c*f*g,this._y=c*f*d+h*u*g,this._z=c*u*g-h*f*d,this._w=c*u*d+h*f*g;break;case"YZX":this._x=h*u*d+c*f*g,this._y=c*f*d+h*u*g,this._z=c*u*g-h*f*d,this._w=c*u*d-h*f*g;break;case"XZY":this._x=h*u*d-c*f*g,this._y=c*f*d-h*u*g,this._z=c*u*g+h*f*d,this._w=c*u*d+h*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=n+o+d;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-l)*f,this._y=(s-c)*f,this._z=(a-r)*f}else if(n>o&&n>d){const f=2*Math.sqrt(1+n-o-d);this._w=(u-l)/f,this._x=.25*f,this._y=(r+a)/f,this._z=(s+c)/f}else if(o>d){const f=2*Math.sqrt(1+o-n-d);this._w=(s-c)/f,this._x=(r+a)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+d-n-o);this._w=(a-r)/f,this._x=(s+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(_n(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-r*o,this._w=a*u-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+n*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*r+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),d=Math.sin((1-t)*u)/c,h=Math.sin(t*u)/c;return this._w=a*d+this._w*h,this._x=n*d+this._x*h,this._y=r*d+this._y*h,this._z=s*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),n*Math.sin(s),n*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class E{constructor(e=0,t=0,n=0){E.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion($u.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion($u.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*n),u=2*(o*t-s*r),d=2*(s*n-a*t);return this.x=t+l*c+a*d-o*u,this.y=n+l*u+o*c-s*d,this.z=r+l*d+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return wl.copy(this).projectOnVector(e),this.sub(wl)}reflect(e){return this.sub(wl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(_n(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const wl=new E,$u=new Qt;class dt{constructor(e=new E(1/0,1/0,1/0),t=new E(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(oi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(oi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=oi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,oi):oi.fromBufferAttribute(s,a),oi.applyMatrix4(e.matrixWorld),this.expandByPoint(oi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),jo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),jo.copy(n.boundingBox)),jo.applyMatrix4(e.matrixWorld),this.union(jo)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,oi),oi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Js),qo.subVectors(this.max,Js),es.subVectors(e.a,Js),ts.subVectors(e.b,Js),ns.subVectors(e.c,Js),ji.subVectors(ts,es),qi.subVectors(ns,ts),Er.subVectors(es,ns);let t=[0,-ji.z,ji.y,0,-qi.z,qi.y,0,-Er.z,Er.y,ji.z,0,-ji.x,qi.z,0,-qi.x,Er.z,0,-Er.x,-ji.y,ji.x,0,-qi.y,qi.x,0,-Er.y,Er.x,0];return!bl(t,es,ts,ns,qo)||(t=[1,0,0,0,1,0,0,0,1],!bl(t,es,ts,ns,qo))?!1:($o.crossVectors(ji,qi),t=[$o.x,$o.y,$o.z],bl(t,es,ts,ns,qo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,oi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(oi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Pi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Pi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Pi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Pi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Pi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Pi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Pi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Pi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Pi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Pi=[new E,new E,new E,new E,new E,new E,new E,new E],oi=new E,jo=new dt,es=new E,ts=new E,ns=new E,ji=new E,qi=new E,Er=new E,Js=new E,qo=new E,$o=new E,wr=new E;function bl(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){wr.fromArray(i,s);const o=r.x*Math.abs(wr.x)+r.y*Math.abs(wr.y)+r.z*Math.abs(wr.z),l=e.dot(wr),c=t.dot(wr),u=n.dot(wr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const vm=new dt,Qs=new E,Tl=new E;class Yr{constructor(e=new E,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):vm.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Qs.subVectors(e,this.center);const t=Qs.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Qs,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Tl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Qs.copy(e.center).add(Tl)),this.expandByPoint(Qs.copy(e.center).sub(Tl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ci=new E,Al=new E,Yo=new E,$i=new E,Rl=new E,Zo=new E,Pl=new E;class zo{constructor(e=new E,t=new E(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ci)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Ci.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ci.copy(this.origin).addScaledVector(this.direction,t),Ci.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Al.copy(e).add(t).multiplyScalar(.5),Yo.copy(t).sub(e).normalize(),$i.copy(this.origin).sub(Al);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Yo),o=$i.dot(this.direction),l=-$i.dot(Yo),c=$i.lengthSq(),u=Math.abs(1-a*a);let d,h,f,g;if(u>0)if(d=a*l-o,h=a*o-l,g=s*u,d>=0)if(h>=-g)if(h<=g){const _=1/u;d*=_,h*=_,f=d*(d+a*h+2*o)+h*(a*d+h+2*l)+c}else h=s,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;else h=-s,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;else h<=-g?(d=Math.max(0,-(-a*s+o)),h=d>0?-s:Math.min(Math.max(-s,-l),s),f=-d*d+h*(h+2*l)+c):h<=g?(d=0,h=Math.min(Math.max(-s,-l),s),f=h*(h+2*l)+c):(d=Math.max(0,-(a*s+o)),h=d>0?s:Math.min(Math.max(-s,-l),s),f=-d*d+h*(h+2*l)+c);else h=a>0?-s:s,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Al).addScaledVector(Yo,h),f}intersectSphere(e,t){Ci.subVectors(e.center,this.origin);const n=Ci.dot(this.direction),r=Ci.dot(Ci)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Ci)!==null}intersectTriangle(e,t,n,r,s){Rl.subVectors(t,e),Zo.subVectors(n,e),Pl.crossVectors(Rl,Zo);let a=this.direction.dot(Pl),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;$i.subVectors(this.origin,e);const l=o*this.direction.dot(Zo.crossVectors($i,Zo));if(l<0)return null;const c=o*this.direction.dot(Rl.cross($i));if(c<0||l+c>a)return null;const u=-o*$i.dot(Pl);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ee{constructor(e,t,n,r,s,a,o,l,c,u,d,h,f,g,_,p){Ee.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c,u,d,h,f,g,_,p)}set(e,t,n,r,s,a,o,l,c,u,d,h,f,g,_,p){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=r,m[1]=s,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=u,m[10]=d,m[14]=h,m[3]=f,m[7]=g,m[11]=_,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ee().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/is.setFromMatrixColumn(e,0).length(),s=1/is.setFromMatrixColumn(e,1).length(),a=1/is.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const h=a*u,f=a*d,g=o*u,_=o*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=f+g*c,t[5]=h-_*c,t[9]=-o*l,t[2]=_-h*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){const h=l*u,f=l*d,g=c*u,_=c*d;t[0]=h+_*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=f*o-g,t[6]=_+h*o,t[10]=a*l}else if(e.order==="ZXY"){const h=l*u,f=l*d,g=c*u,_=c*d;t[0]=h-_*o,t[4]=-a*d,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*u,t[9]=_-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const h=a*u,f=a*d,g=o*u,_=o*d;t[0]=l*u,t[4]=g*c-f,t[8]=h*c+_,t[1]=l*d,t[5]=_*c+h,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const h=a*l,f=a*c,g=o*l,_=o*c;t[0]=l*u,t[4]=_-h*d,t[8]=g*d+f,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*d+g,t[10]=h-_*d}else if(e.order==="XZY"){const h=a*l,f=a*c,g=o*l,_=o*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+_,t[5]=a*u,t[9]=f*d-g,t[2]=g*d-f,t[6]=o*u,t[10]=_*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(xm,e,Mm)}lookAt(e,t,n){const r=this.elements;return kn.subVectors(e,t),kn.lengthSq()===0&&(kn.z=1),kn.normalize(),Yi.crossVectors(n,kn),Yi.lengthSq()===0&&(Math.abs(n.z)===1?kn.x+=1e-4:kn.z+=1e-4,kn.normalize(),Yi.crossVectors(n,kn)),Yi.normalize(),Ko.crossVectors(kn,Yi),r[0]=Yi.x,r[4]=Ko.x,r[8]=kn.x,r[1]=Yi.y,r[5]=Ko.y,r[9]=kn.y,r[2]=Yi.z,r[6]=Ko.z,r[10]=kn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],d=n[5],h=n[9],f=n[13],g=n[2],_=n[6],p=n[10],m=n[14],v=n[3],y=n[7],M=n[11],P=n[15],A=r[0],R=r[4],I=r[8],S=r[12],T=r[1],G=r[5],V=r[9],J=r[13],L=r[2],U=r[6],z=r[10],Z=r[14],q=r[3],Y=r[7],$=r[11],re=r[15];return s[0]=a*A+o*T+l*L+c*q,s[4]=a*R+o*G+l*U+c*Y,s[8]=a*I+o*V+l*z+c*$,s[12]=a*S+o*J+l*Z+c*re,s[1]=u*A+d*T+h*L+f*q,s[5]=u*R+d*G+h*U+f*Y,s[9]=u*I+d*V+h*z+f*$,s[13]=u*S+d*J+h*Z+f*re,s[2]=g*A+_*T+p*L+m*q,s[6]=g*R+_*G+p*U+m*Y,s[10]=g*I+_*V+p*z+m*$,s[14]=g*S+_*J+p*Z+m*re,s[3]=v*A+y*T+M*L+P*q,s[7]=v*R+y*G+M*U+P*Y,s[11]=v*I+y*V+M*z+P*$,s[15]=v*S+y*J+M*Z+P*re,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],f=e[14],g=e[3],_=e[7],p=e[11],m=e[15];return g*(+s*l*d-r*c*d-s*o*h+n*c*h+r*o*f-n*l*f)+_*(+t*l*f-t*c*h+s*a*h-r*a*f+r*c*u-s*l*u)+p*(+t*c*d-t*o*f-s*a*d+n*a*f+s*o*u-n*c*u)+m*(-r*o*u-t*l*d+t*o*h+r*a*d-n*a*h+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],f=e[11],g=e[12],_=e[13],p=e[14],m=e[15],v=d*p*c-_*h*c+_*l*f-o*p*f-d*l*m+o*h*m,y=g*h*c-u*p*c-g*l*f+a*p*f+u*l*m-a*h*m,M=u*_*c-g*d*c+g*o*f-a*_*f-u*o*m+a*d*m,P=g*d*l-u*_*l-g*o*h+a*_*h+u*o*p-a*d*p,A=t*v+n*y+r*M+s*P;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/A;return e[0]=v*R,e[1]=(_*h*s-d*p*s-_*r*f+n*p*f+d*r*m-n*h*m)*R,e[2]=(o*p*s-_*l*s+_*r*c-n*p*c-o*r*m+n*l*m)*R,e[3]=(d*l*s-o*h*s-d*r*c+n*h*c+o*r*f-n*l*f)*R,e[4]=y*R,e[5]=(u*p*s-g*h*s+g*r*f-t*p*f-u*r*m+t*h*m)*R,e[6]=(g*l*s-a*p*s-g*r*c+t*p*c+a*r*m-t*l*m)*R,e[7]=(a*h*s-u*l*s+u*r*c-t*h*c-a*r*f+t*l*f)*R,e[8]=M*R,e[9]=(g*d*s-u*_*s-g*n*f+t*_*f+u*n*m-t*d*m)*R,e[10]=(a*_*s-g*o*s+g*n*c-t*_*c-a*n*m+t*o*m)*R,e[11]=(u*o*s-a*d*s-u*n*c+t*d*c+a*n*f-t*o*f)*R,e[12]=P*R,e[13]=(u*_*r-g*d*r+g*n*h-t*_*h-u*n*p+t*d*p)*R,e[14]=(g*o*r-a*_*r-g*n*l+t*_*l+a*n*p-t*o*p)*R,e[15]=(a*d*r-u*o*r+u*n*l-t*d*l-a*n*h+t*o*h)*R,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+n,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,d=o+o,h=s*c,f=s*u,g=s*d,_=a*u,p=a*d,m=o*d,v=l*c,y=l*u,M=l*d,P=n.x,A=n.y,R=n.z;return r[0]=(1-(_+m))*P,r[1]=(f+M)*P,r[2]=(g-y)*P,r[3]=0,r[4]=(f-M)*A,r[5]=(1-(h+m))*A,r[6]=(p+v)*A,r[7]=0,r[8]=(g+y)*R,r[9]=(p-v)*R,r[10]=(1-(h+_))*R,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let s=is.set(r[0],r[1],r[2]).length();const a=is.set(r[4],r[5],r[6]).length(),o=is.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],ai.copy(this);const c=1/s,u=1/a,d=1/o;return ai.elements[0]*=c,ai.elements[1]*=c,ai.elements[2]*=c,ai.elements[4]*=u,ai.elements[5]*=u,ai.elements[6]*=u,ai.elements[8]*=d,ai.elements[9]*=d,ai.elements[10]*=d,t.setFromRotationMatrix(ai),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,r,s,a,o=Bi){const l=this.elements,c=2*s/(t-e),u=2*s/(n-r),d=(t+e)/(t-e),h=(n+r)/(n-r);let f,g;if(o===Bi)f=-(a+s)/(a-s),g=-2*a*s/(a-s);else if(o===La)f=-a/(a-s),g=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=Bi){const l=this.elements,c=1/(t-e),u=1/(n-r),d=1/(a-s),h=(t+e)*c,f=(n+r)*u;let g,_;if(o===Bi)g=(a+s)*d,_=-2*d;else if(o===La)g=s*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const is=new E,ai=new Ee,xm=new E(0,0,0),Mm=new E(1,1,1),Yi=new E,Ko=new E,kn=new E,Yu=new Ee,Zu=new Qt;class _t{constructor(e=0,t=0,n=0,r=_t.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],d=r[2],h=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(_n(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-_n(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(_n(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-_n(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(_n(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-_n(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Yu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Yu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Zu.setFromEuler(this),this.setFromQuaternion(Zu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}_t.DEFAULT_ORDER="XYZ";class Lc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Sm=0;const Ku=new E,rs=new Qt,Li=new Ee,Jo=new E,eo=new E,Em=new E,wm=new Qt,Ju=new E(1,0,0),Qu=new E(0,1,0),ed=new E(0,0,1),bm={type:"added"},Tm={type:"removed"};class pt extends $r{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Sm++}),this.uuid=xr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=pt.DEFAULT_UP.clone();const e=new E,t=new _t,n=new Qt,r=new E(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ee},normalMatrix:{value:new Qe}}),this.matrix=new Ee,this.matrixWorld=new Ee,this.matrixAutoUpdate=pt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Lc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return rs.setFromAxisAngle(e,t),this.quaternion.multiply(rs),this}rotateOnWorldAxis(e,t){return rs.setFromAxisAngle(e,t),this.quaternion.premultiply(rs),this}rotateX(e){return this.rotateOnAxis(Ju,e)}rotateY(e){return this.rotateOnAxis(Qu,e)}rotateZ(e){return this.rotateOnAxis(ed,e)}translateOnAxis(e,t){return Ku.copy(e).applyQuaternion(this.quaternion),this.position.add(Ku.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ju,e)}translateY(e){return this.translateOnAxis(Qu,e)}translateZ(e){return this.translateOnAxis(ed,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Li.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Jo.copy(e):Jo.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),eo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Li.lookAt(eo,Jo,this.up):Li.lookAt(Jo,eo,this.up),this.quaternion.setFromRotationMatrix(Li),r&&(Li.extractRotation(r.matrixWorld),rs.setFromRotationMatrix(Li),this.quaternion.premultiply(rs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(bm)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Tm)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Li.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Li.multiply(e.parent.matrixWorld)),e.applyMatrix4(Li),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(eo,e,Em),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(eo,wm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++){const o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),d=a(e.shapes),h=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=r,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}pt.DEFAULT_UP=new E(0,1,0);pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const li=new E,Di=new E,Cl=new E,Ii=new E,ss=new E,os=new E,td=new E,Ll=new E,Dl=new E,Il=new E;let Qo=!1;class di{constructor(e=new E,t=new E,n=new E){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),li.subVectors(e,t),r.cross(li);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){li.subVectors(r,t),Di.subVectors(n,t),Cl.subVectors(e,t);const a=li.dot(li),o=li.dot(Di),l=li.dot(Cl),c=Di.dot(Di),u=Di.dot(Cl),d=a*c-o*o;if(d===0)return s.set(0,0,0),null;const h=1/d,f=(c*l-o*u)*h,g=(a*u-o*l)*h;return s.set(1-f-g,g,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Ii)===null?!1:Ii.x>=0&&Ii.y>=0&&Ii.x+Ii.y<=1}static getUV(e,t,n,r,s,a,o,l){return Qo===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Qo=!0),this.getInterpolation(e,t,n,r,s,a,o,l)}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,Ii)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Ii.x),l.addScaledVector(a,Ii.y),l.addScaledVector(o,Ii.z),l)}static isFrontFacing(e,t,n,r){return li.subVectors(n,t),Di.subVectors(e,t),li.cross(Di).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return li.subVectors(this.c,this.b),Di.subVectors(this.a,this.b),li.cross(Di).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return di.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return di.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,r,s){return Qo===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Qo=!0),di.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}getInterpolation(e,t,n,r,s){return di.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return di.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return di.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,o;ss.subVectors(r,n),os.subVectors(s,n),Ll.subVectors(e,n);const l=ss.dot(Ll),c=os.dot(Ll);if(l<=0&&c<=0)return t.copy(n);Dl.subVectors(e,r);const u=ss.dot(Dl),d=os.dot(Dl);if(u>=0&&d<=u)return t.copy(r);const h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(ss,a);Il.subVectors(e,s);const f=ss.dot(Il),g=os.dot(Il);if(g>=0&&f<=g)return t.copy(s);const _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(os,o);const p=u*g-f*d;if(p<=0&&d-u>=0&&f-g>=0)return td.subVectors(s,r),o=(d-u)/(d-u+(f-g)),t.copy(r).addScaledVector(td,o);const m=1/(p+_+h);return a=_*m,o=h*m,t.copy(n).addScaledVector(ss,a).addScaledVector(os,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Lh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zi={h:0,s:0,l:0},ea={h:0,s:0,l:0};function Ul(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Te{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=jt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,bt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=bt.workingColorSpace){return this.r=e,this.g=t,this.b=n,bt.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=bt.workingColorSpace){if(e=Cc(e,1),t=_n(t,0,1),n=_n(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Ul(a,s,e+1/3),this.g=Ul(a,s,e),this.b=Ul(a,s,e-1/3)}return bt.toWorkingColorSpace(this,r),this}setStyle(e,t=jt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=jt){const n=Lh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=As(e.r),this.g=As(e.g),this.b=As(e.b),this}copyLinearToSRGB(e){return this.r=Sl(e.r),this.g=Sl(e.g),this.b=Sl(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=jt){return bt.fromWorkingColorSpace(Sn.copy(this),e),Math.round(_n(Sn.r*255,0,255))*65536+Math.round(_n(Sn.g*255,0,255))*256+Math.round(_n(Sn.b*255,0,255))}getHexString(e=jt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=bt.workingColorSpace){bt.fromWorkingColorSpace(Sn.copy(this),t);const n=Sn.r,r=Sn.g,s=Sn.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case n:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-n)/d+2;break;case s:l=(n-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=bt.workingColorSpace){return bt.fromWorkingColorSpace(Sn.copy(this),t),e.r=Sn.r,e.g=Sn.g,e.b=Sn.b,e}getStyle(e=jt){bt.fromWorkingColorSpace(Sn.copy(this),e);const t=Sn.r,n=Sn.g,r=Sn.b;return e!==jt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Zi),this.setHSL(Zi.h+e,Zi.s+t,Zi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Zi),e.getHSL(ea);const n=ao(Zi.h,ea.h,t),r=ao(Zi.s,ea.s,t),s=ao(Zi.l,ea.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Sn=new Te;Te.NAMES=Lh;let Am=0;class Xi extends $r{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Am++}),this.uuid=xr(),this.name="",this.type="Material",this.blending=Ts,this.side=yr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=lc,this.blendDst=cc,this.blendEquation=Cr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Te(0,0,0),this.blendAlpha=0,this.depthFunc=wa,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Gu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Jr,this.stencilZFail=Jr,this.stencilZPass=Jr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ts&&(n.blending=this.blending),this.side!==yr&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==lc&&(n.blendSrc=this.blendSrc),this.blendDst!==cc&&(n.blendDst=this.blendDst),this.blendEquation!==Cr&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==wa&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Gu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Jr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Jr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Jr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class pi extends Xi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Wa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Kt=new E,ta=new ot;class Si{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Hu,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Oi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ta.fromBufferAttribute(this,t),ta.applyMatrix3(e),this.setXY(t,ta.x,ta.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyMatrix3(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyMatrix4(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyNormalMatrix(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.transformDirection(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ys(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Cn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ys(t,this.array)),t}setX(e,t){return this.normalized&&(t=Cn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ys(t,this.array)),t}setY(e,t){return this.normalized&&(t=Cn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ys(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Cn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ys(t,this.array)),t}setW(e,t){return this.normalized&&(t=Cn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Cn(t,this.array),n=Cn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Cn(t,this.array),n=Cn(n,this.array),r=Cn(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=Cn(t,this.array),n=Cn(n,this.array),r=Cn(r,this.array),s=Cn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Hu&&(e.usage=this.usage),e}}class Dc extends Si{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Dh extends Si{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class en extends Si{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Rm=0;const Yn=new Ee,Fl=new pt,as=new E,Gn=new dt,to=new dt,dn=new E;class jn extends $r{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Rm++}),this.uuid=xr(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ah(e)?Dh:Dc)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Qe().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Yn.makeRotationFromQuaternion(e),this.applyMatrix4(Yn),this}rotateX(e){return Yn.makeRotationX(e),this.applyMatrix4(Yn),this}rotateY(e){return Yn.makeRotationY(e),this.applyMatrix4(Yn),this}rotateZ(e){return Yn.makeRotationZ(e),this.applyMatrix4(Yn),this}translate(e,t,n){return Yn.makeTranslation(e,t,n),this.applyMatrix4(Yn),this}scale(e,t,n){return Yn.makeScale(e,t,n),this.applyMatrix4(Yn),this}lookAt(e){return Fl.lookAt(e),Fl.updateMatrix(),this.applyMatrix4(Fl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(as).negate(),this.translate(as.x,as.y,as.z),this}setFromPoints(e){const t=[];for(let n=0,r=e.length;n<r;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new en(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new dt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new E(-1/0,-1/0,-1/0),new E(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];Gn.setFromBufferAttribute(s),this.morphTargetsRelative?(dn.addVectors(this.boundingBox.min,Gn.min),this.boundingBox.expandByPoint(dn),dn.addVectors(this.boundingBox.max,Gn.max),this.boundingBox.expandByPoint(dn)):(this.boundingBox.expandByPoint(Gn.min),this.boundingBox.expandByPoint(Gn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Yr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new E,1/0);return}if(e){const n=this.boundingSphere.center;if(Gn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];to.setFromBufferAttribute(o),this.morphTargetsRelative?(dn.addVectors(Gn.min,to.min),Gn.expandByPoint(dn),dn.addVectors(Gn.max,to.max),Gn.expandByPoint(dn)):(Gn.expandByPoint(to.min),Gn.expandByPoint(to.max))}Gn.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)dn.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(dn));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)dn.fromBufferAttribute(o,c),l&&(as.fromBufferAttribute(e,c),dn.add(as)),r=Math.max(r,n.distanceToSquared(dn))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,r=t.position.array,s=t.normal.array,a=t.uv.array,o=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Si(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let T=0;T<o;T++)c[T]=new E,u[T]=new E;const d=new E,h=new E,f=new E,g=new ot,_=new ot,p=new ot,m=new E,v=new E;function y(T,G,V){d.fromArray(r,T*3),h.fromArray(r,G*3),f.fromArray(r,V*3),g.fromArray(a,T*2),_.fromArray(a,G*2),p.fromArray(a,V*2),h.sub(d),f.sub(d),_.sub(g),p.sub(g);const J=1/(_.x*p.y-p.x*_.y);isFinite(J)&&(m.copy(h).multiplyScalar(p.y).addScaledVector(f,-_.y).multiplyScalar(J),v.copy(f).multiplyScalar(_.x).addScaledVector(h,-p.x).multiplyScalar(J),c[T].add(m),c[G].add(m),c[V].add(m),u[T].add(v),u[G].add(v),u[V].add(v))}let M=this.groups;M.length===0&&(M=[{start:0,count:n.length}]);for(let T=0,G=M.length;T<G;++T){const V=M[T],J=V.start,L=V.count;for(let U=J,z=J+L;U<z;U+=3)y(n[U+0],n[U+1],n[U+2])}const P=new E,A=new E,R=new E,I=new E;function S(T){R.fromArray(s,T*3),I.copy(R);const G=c[T];P.copy(G),P.sub(R.multiplyScalar(R.dot(G))).normalize(),A.crossVectors(I,G);const J=A.dot(u[T])<0?-1:1;l[T*4]=P.x,l[T*4+1]=P.y,l[T*4+2]=P.z,l[T*4+3]=J}for(let T=0,G=M.length;T<G;++T){const V=M[T],J=V.start,L=V.count;for(let U=J,z=J+L;U<z;U+=3)S(n[U+0]),S(n[U+1]),S(n[U+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Si(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);const r=new E,s=new E,a=new E,o=new E,l=new E,c=new E,u=new E,d=new E;if(e)for(let h=0,f=e.count;h<f;h+=3){const g=e.getX(h+0),_=e.getX(h+1),p=e.getX(h+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),a.fromBufferAttribute(t,p),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),o.add(u),l.add(u),c.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let h=0,f=t.count;h<f;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)dn.fromBufferAttribute(e,t),dn.normalize(),e.setXYZ(t,dn.x,dn.y,dn.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,d=o.normalized,h=new c.constructor(l.length*u);let f=0,g=0;for(let _=0,p=l.length;_<p;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*u;for(let m=0;m<u;m++)h[g++]=c[f++]}return new Si(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new jn,n=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,d=c.length;u<d;u++){const h=c[u],f=e(h,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){const f=c[d];u.push(f.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const nd=new Ee,br=new zo,na=new Yr,id=new E,ls=new E,cs=new E,us=new E,Nl=new E,ia=new E,ra=new ot,sa=new ot,oa=new ot,rd=new E,sd=new E,od=new E,aa=new E,la=new E;class X extends pt{constructor(e=new jn,t=new pi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){ia.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],d=s[l];u!==0&&(Nl.fromBufferAttribute(d,e),a?ia.addScaledVector(Nl,u):ia.addScaledVector(Nl.sub(t),u))}t.add(ia)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),na.copy(n.boundingSphere),na.applyMatrix4(s),br.copy(e.ray).recast(e.near),!(na.containsPoint(br.origin)===!1&&(br.intersectSphere(na,id)===null||br.origin.distanceToSquared(id)>(e.far-e.near)**2))&&(nd.copy(s).invert(),br.copy(e.ray).applyMatrix4(nd),!(n.boundingBox!==null&&br.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,br)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,h=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=h.length;g<_;g++){const p=h[g],m=a[p.materialIndex],v=Math.max(p.start,f.start),y=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let M=v,P=y;M<P;M+=3){const A=o.getX(M),R=o.getX(M+1),I=o.getX(M+2);r=ca(this,m,e,n,c,u,d,A,R,I),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let p=g,m=_;p<m;p+=3){const v=o.getX(p),y=o.getX(p+1),M=o.getX(p+2);r=ca(this,a,e,n,c,u,d,v,y,M),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=h.length;g<_;g++){const p=h[g],m=a[p.materialIndex],v=Math.max(p.start,f.start),y=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let M=v,P=y;M<P;M+=3){const A=M,R=M+1,I=M+2;r=ca(this,m,e,n,c,u,d,A,R,I),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let p=g,m=_;p<m;p+=3){const v=p,y=p+1,M=p+2;r=ca(this,a,e,n,c,u,d,v,y,M),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}}function Pm(i,e,t,n,r,s,a,o){let l;if(e.side===Bn?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,e.side===yr,o),l===null)return null;la.copy(o),la.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(la);return c<t.near||c>t.far?null:{distance:c,point:la.clone(),object:i}}function ca(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,ls),i.getVertexPosition(l,cs),i.getVertexPosition(c,us);const u=Pm(i,e,t,n,ls,cs,us,aa);if(u){r&&(ra.fromBufferAttribute(r,o),sa.fromBufferAttribute(r,l),oa.fromBufferAttribute(r,c),u.uv=di.getInterpolation(aa,ls,cs,us,ra,sa,oa,new ot)),s&&(ra.fromBufferAttribute(s,o),sa.fromBufferAttribute(s,l),oa.fromBufferAttribute(s,c),u.uv1=di.getInterpolation(aa,ls,cs,us,ra,sa,oa,new ot),u.uv2=u.uv1),a&&(rd.fromBufferAttribute(a,o),sd.fromBufferAttribute(a,l),od.fromBufferAttribute(a,c),u.normal=di.getInterpolation(aa,ls,cs,us,rd,sd,od,new E),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new E,materialIndex:0};di.getNormal(ls,cs,us,d.normal),u.face=d}return u}class Ue extends jn{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],d=[];let h=0,f=0;g("z","y","x",-1,-1,n,t,e,a,s,0),g("z","y","x",1,-1,n,t,-e,a,s,1),g("x","z","y",1,1,e,n,t,r,a,2),g("x","z","y",1,-1,e,n,-t,r,a,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new en(c,3)),this.setAttribute("normal",new en(u,3)),this.setAttribute("uv",new en(d,2));function g(_,p,m,v,y,M,P,A,R,I,S){const T=M/R,G=P/I,V=M/2,J=P/2,L=A/2,U=R+1,z=I+1;let Z=0,q=0;const Y=new E;for(let $=0;$<z;$++){const re=$*G-J;for(let ie=0;ie<U;ie++){const W=ie*T-V;Y[_]=W*v,Y[p]=re*y,Y[m]=L,c.push(Y.x,Y.y,Y.z),Y[_]=0,Y[p]=0,Y[m]=A>0?1:-1,u.push(Y.x,Y.y,Y.z),d.push(ie/R),d.push(1-$/I),Z+=1}}for(let $=0;$<I;$++)for(let re=0;re<R;re++){const ie=h+re+U*$,W=h+re+U*($+1),K=h+(re+1)+U*($+1),ae=h+(re+1)+U*$;l.push(ie,W,ae),l.push(W,K,ae),q+=6}o.addGroup(f,q,S),f+=q,h+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ue(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function zs(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Ln(i){const e={};for(let t=0;t<i.length;t++){const n=zs(i[t]);for(const r in n)e[r]=n[r]}return e}function Cm(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Ih(i){return i.getRenderTarget()===null?i.outputColorSpace:bt.workingColorSpace}const Lm={clone:zs,merge:Ln};var Dm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Im=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Gr extends Xi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Dm,this.fragmentShader=Im,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=zs(e.uniforms),this.uniformsGroups=Cm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Uh extends pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ee,this.projectionMatrix=new Ee,this.projectionMatrixInverse=new Ee,this.coordinateSystem=Bi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class In extends Uh{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Bs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(oo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Bs*2*Math.atan(Math.tan(oo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(oo*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ds=-90,hs=1;class Um extends pt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new In(ds,hs,e,t);r.layers=this.layers,this.add(r);const s=new In(ds,hs,e,t);s.layers=this.layers,this.add(s);const a=new In(ds,hs,e,t);a.layers=this.layers,this.add(a);const o=new In(ds,hs,e,t);o.layers=this.layers,this.add(o);const l=new In(ds,hs,e,t);l.layers=this.layers,this.add(l);const c=new In(ds,hs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===Bi)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===La)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,a),e.setRenderTarget(n,2,r),e.render(t,o),e.setRenderTarget(n,3,r),e.render(t,l),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,r),e.render(t,u),e.setRenderTarget(d,h,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Fh extends on{constructor(e,t,n,r,s,a,o,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:Fs,super(e,t,n,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Fm extends kr{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];t.encoding!==void 0&&(lo("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Br?jt:ei),this.texture=new Fh(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Jn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ue(5,5,5),s=new Gr({name:"CubemapFromEquirect",uniforms:zs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Bn,blending:ar});s.uniforms.tEquirect.value=t;const a=new X(r,s),o=t.minFilter;return t.minFilter===go&&(t.minFilter=Jn),new Um(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}const Ol=new E,Nm=new E,Om=new Qe;class Rr{constructor(e=new E(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=Ol.subVectors(n,t).cross(Nm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Ol),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Om.getNormalMatrix(e),r=this.coplanarPoint(Ol).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Tr=new Yr,ua=new E;class Ic{constructor(e=new Rr,t=new Rr,n=new Rr,r=new Rr,s=new Rr,a=new Rr){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Bi){const n=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],u=r[5],d=r[6],h=r[7],f=r[8],g=r[9],_=r[10],p=r[11],m=r[12],v=r[13],y=r[14],M=r[15];if(n[0].setComponents(l-s,h-c,p-f,M-m).normalize(),n[1].setComponents(l+s,h+c,p+f,M+m).normalize(),n[2].setComponents(l+a,h+u,p+g,M+v).normalize(),n[3].setComponents(l-a,h-u,p-g,M-v).normalize(),n[4].setComponents(l-o,h-d,p-_,M-y).normalize(),t===Bi)n[5].setComponents(l+o,h+d,p+_,M+y).normalize();else if(t===La)n[5].setComponents(o,d,_,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Tr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Tr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Tr)}intersectsSprite(e){return Tr.center.set(0,0,0),Tr.radius=.7071067811865476,Tr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Tr)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(ua.x=r.normal.x>0?e.max.x:e.min.x,ua.y=r.normal.y>0?e.max.y:e.min.y,ua.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ua)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Nh(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Bm(i,e){const t=e.isWebGL2,n=new WeakMap;function r(c,u){const d=c.array,h=c.usage,f=d.byteLength,g=i.createBuffer();i.bindBuffer(u,g),i.bufferData(u,d,h),c.onUploadCallback();let _;if(d instanceof Float32Array)_=i.FLOAT;else if(d instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)_=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=i.UNSIGNED_SHORT;else if(d instanceof Int16Array)_=i.SHORT;else if(d instanceof Uint32Array)_=i.UNSIGNED_INT;else if(d instanceof Int32Array)_=i.INT;else if(d instanceof Int8Array)_=i.BYTE;else if(d instanceof Uint8Array)_=i.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)_=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:_,bytesPerElement:d.BYTES_PER_ELEMENT,version:c.version,size:f}}function s(c,u,d){const h=u.array,f=u._updateRange,g=u.updateRanges;if(i.bindBuffer(d,c),f.count===-1&&g.length===0&&i.bufferSubData(d,0,h),g.length!==0){for(let _=0,p=g.length;_<p;_++){const m=g[_];t?i.bufferSubData(d,m.start*h.BYTES_PER_ELEMENT,h,m.start,m.count):i.bufferSubData(d,m.start*h.BYTES_PER_ELEMENT,h.subarray(m.start,m.start+m.count))}u.clearUpdateRanges()}f.count!==-1&&(t?i.bufferSubData(d,f.offset*h.BYTES_PER_ELEMENT,h,f.offset,f.count):i.bufferSubData(d,f.offset*h.BYTES_PER_ELEMENT,h.subarray(f.offset,f.offset+f.count)),f.count=-1),u.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);u&&(i.deleteBuffer(u.buffer),n.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const h=n.get(c);(!h||h.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const d=n.get(c);if(d===void 0)n.set(c,r(c,u));else if(d.version<c.version){if(d.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(d.buffer,c,u),d.version=c.version}}return{get:a,remove:o,update:l}}class ko extends jn{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,u=l+1,d=e/o,h=t/l,f=[],g=[],_=[],p=[];for(let m=0;m<u;m++){const v=m*h-a;for(let y=0;y<c;y++){const M=y*d-s;g.push(M,-v,0),_.push(0,0,1),p.push(y/o),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let v=0;v<o;v++){const y=v+c*m,M=v+c*(m+1),P=v+1+c*(m+1),A=v+1+c*m;f.push(y,M,A),f.push(M,P,A)}this.setIndex(f),this.setAttribute("position",new en(g,3)),this.setAttribute("normal",new en(_,3)),this.setAttribute("uv",new en(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ko(e.width,e.height,e.widthSegments,e.heightSegments)}}var zm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,km=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Gm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Hm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Vm=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Wm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Xm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,jm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,qm=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,$m=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Ym=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Zm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Km=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Jm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Qm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,eg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,tg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ng=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ig=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,rg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,sg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,og=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,ag=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,lg=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cg=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ug=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,dg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,hg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,fg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,pg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,mg="gl_FragColor = linearToOutputTexel( gl_FragColor );",gg=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,_g=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,yg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,vg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,xg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Mg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Sg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Eg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,wg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,bg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Tg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ag=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Rg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Pg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Cg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Lg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Dg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Ig=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ug=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Fg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ng=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Og=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Bg=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,zg=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,kg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Gg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Hg=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Vg=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wg=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Xg=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,jg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,qg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,$g=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Yg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Zg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Kg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Jg=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Qg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,e0=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,t0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,n0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,i0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,r0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,s0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,o0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,a0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,l0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,c0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,u0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,d0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,h0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,f0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,p0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,m0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,g0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,_0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,y0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,v0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,x0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,M0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,S0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,E0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,w0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,b0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,T0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,A0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,R0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,P0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,C0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,L0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,D0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,I0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,U0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,F0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,N0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,O0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const B0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,z0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,k0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,G0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,H0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,V0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,W0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,X0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,j0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,q0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,$0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Y0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Z0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,K0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,J0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Q0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,e_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,t_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,n_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,i_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,r_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,s_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,o_=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,a_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,l_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,c_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,u_=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,d_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,h_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,f_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,p_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,m_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,g_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,__=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,je={alphahash_fragment:zm,alphahash_pars_fragment:km,alphamap_fragment:Gm,alphamap_pars_fragment:Hm,alphatest_fragment:Vm,alphatest_pars_fragment:Wm,aomap_fragment:Xm,aomap_pars_fragment:jm,batching_pars_vertex:qm,batching_vertex:$m,begin_vertex:Ym,beginnormal_vertex:Zm,bsdfs:Km,iridescence_fragment:Jm,bumpmap_pars_fragment:Qm,clipping_planes_fragment:eg,clipping_planes_pars_fragment:tg,clipping_planes_pars_vertex:ng,clipping_planes_vertex:ig,color_fragment:rg,color_pars_fragment:sg,color_pars_vertex:og,color_vertex:ag,common:lg,cube_uv_reflection_fragment:cg,defaultnormal_vertex:ug,displacementmap_pars_vertex:dg,displacementmap_vertex:hg,emissivemap_fragment:fg,emissivemap_pars_fragment:pg,colorspace_fragment:mg,colorspace_pars_fragment:gg,envmap_fragment:_g,envmap_common_pars_fragment:yg,envmap_pars_fragment:vg,envmap_pars_vertex:xg,envmap_physical_pars_fragment:Dg,envmap_vertex:Mg,fog_vertex:Sg,fog_pars_vertex:Eg,fog_fragment:wg,fog_pars_fragment:bg,gradientmap_pars_fragment:Tg,lightmap_fragment:Ag,lightmap_pars_fragment:Rg,lights_lambert_fragment:Pg,lights_lambert_pars_fragment:Cg,lights_pars_begin:Lg,lights_toon_fragment:Ig,lights_toon_pars_fragment:Ug,lights_phong_fragment:Fg,lights_phong_pars_fragment:Ng,lights_physical_fragment:Og,lights_physical_pars_fragment:Bg,lights_fragment_begin:zg,lights_fragment_maps:kg,lights_fragment_end:Gg,logdepthbuf_fragment:Hg,logdepthbuf_pars_fragment:Vg,logdepthbuf_pars_vertex:Wg,logdepthbuf_vertex:Xg,map_fragment:jg,map_pars_fragment:qg,map_particle_fragment:$g,map_particle_pars_fragment:Yg,metalnessmap_fragment:Zg,metalnessmap_pars_fragment:Kg,morphcolor_vertex:Jg,morphnormal_vertex:Qg,morphtarget_pars_vertex:e0,morphtarget_vertex:t0,normal_fragment_begin:n0,normal_fragment_maps:i0,normal_pars_fragment:r0,normal_pars_vertex:s0,normal_vertex:o0,normalmap_pars_fragment:a0,clearcoat_normal_fragment_begin:l0,clearcoat_normal_fragment_maps:c0,clearcoat_pars_fragment:u0,iridescence_pars_fragment:d0,opaque_fragment:h0,packing:f0,premultiplied_alpha_fragment:p0,project_vertex:m0,dithering_fragment:g0,dithering_pars_fragment:_0,roughnessmap_fragment:y0,roughnessmap_pars_fragment:v0,shadowmap_pars_fragment:x0,shadowmap_pars_vertex:M0,shadowmap_vertex:S0,shadowmask_pars_fragment:E0,skinbase_vertex:w0,skinning_pars_vertex:b0,skinning_vertex:T0,skinnormal_vertex:A0,specularmap_fragment:R0,specularmap_pars_fragment:P0,tonemapping_fragment:C0,tonemapping_pars_fragment:L0,transmission_fragment:D0,transmission_pars_fragment:I0,uv_pars_fragment:U0,uv_pars_vertex:F0,uv_vertex:N0,worldpos_vertex:O0,background_vert:B0,background_frag:z0,backgroundCube_vert:k0,backgroundCube_frag:G0,cube_vert:H0,cube_frag:V0,depth_vert:W0,depth_frag:X0,distanceRGBA_vert:j0,distanceRGBA_frag:q0,equirect_vert:$0,equirect_frag:Y0,linedashed_vert:Z0,linedashed_frag:K0,meshbasic_vert:J0,meshbasic_frag:Q0,meshlambert_vert:e_,meshlambert_frag:t_,meshmatcap_vert:n_,meshmatcap_frag:i_,meshnormal_vert:r_,meshnormal_frag:s_,meshphong_vert:o_,meshphong_frag:a_,meshphysical_vert:l_,meshphysical_frag:c_,meshtoon_vert:u_,meshtoon_frag:d_,points_vert:h_,points_frag:f_,shadow_vert:p_,shadow_frag:m_,sprite_vert:g_,sprite_frag:__},oe={common:{diffuse:{value:new Te(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qe}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qe},normalScale:{value:new ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Te(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Te(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0},uvTransform:{value:new Qe}},sprite:{diffuse:{value:new Te(16777215)},opacity:{value:1},center:{value:new ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}}},yi={basic:{uniforms:Ln([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:Ln([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new Te(0)}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:Ln([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new Te(0)},specular:{value:new Te(1118481)},shininess:{value:30}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:Ln([oe.common,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.roughnessmap,oe.metalnessmap,oe.fog,oe.lights,{emissive:{value:new Te(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:Ln([oe.common,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.gradientmap,oe.fog,oe.lights,{emissive:{value:new Te(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:Ln([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:Ln([oe.points,oe.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:Ln([oe.common,oe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:Ln([oe.common,oe.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:Ln([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:Ln([oe.sprite,oe.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new Qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distanceRGBA:{uniforms:Ln([oe.common,oe.displacementmap,{referencePosition:{value:new E},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distanceRGBA_vert,fragmentShader:je.distanceRGBA_frag},shadow:{uniforms:Ln([oe.lights,oe.fog,{color:{value:new Te(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};yi.physical={uniforms:Ln([yi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qe},clearcoatNormalScale:{value:new ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qe},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qe},sheen:{value:0},sheenColor:{value:new Te(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qe},transmissionSamplerSize:{value:new ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qe},attenuationDistance:{value:0},attenuationColor:{value:new Te(0)},specularColor:{value:new Te(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qe},anisotropyVector:{value:new ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qe}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag};const da={r:0,b:0,g:0};function y_(i,e,t,n,r,s,a){const o=new Te(0);let l=s===!0?0:1,c,u,d=null,h=0,f=null;function g(p,m){let v=!1,y=m.isScene===!0?m.background:null;y&&y.isTexture&&(y=(m.backgroundBlurriness>0?t:e).get(y)),y===null?_(o,l):y&&y.isColor&&(_(y,1),v=!0);const M=i.xr.getEnvironmentBlendMode();M==="additive"?n.buffers.color.setClear(0,0,0,1,a):M==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||v)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),y&&(y.isCubeTexture||y.mapping===Xa)?(u===void 0&&(u=new X(new Ue(1,1,1),new Gr({name:"BackgroundCubeMaterial",uniforms:zs(yi.backgroundCube.uniforms),vertexShader:yi.backgroundCube.vertexShader,fragmentShader:yi.backgroundCube.fragmentShader,side:Bn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(P,A,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=y,u.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,u.material.toneMapped=bt.getTransfer(y.colorSpace)!==Lt,(d!==y||h!==y.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,d=y,h=y.version,f=i.toneMapping),u.layers.enableAll(),p.unshift(u,u.geometry,u.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new X(new ko(2,2),new Gr({name:"BackgroundMaterial",uniforms:zs(yi.background.uniforms),vertexShader:yi.background.vertexShader,fragmentShader:yi.background.fragmentShader,side:yr,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,c.material.toneMapped=bt.getTransfer(y.colorSpace)!==Lt,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(d!==y||h!==y.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,d=y,h=y.version,f=i.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))}function _(p,m){p.getRGB(da,Ih(i)),n.buffers.color.setClear(da.r,da.g,da.b,m,a)}return{getClearColor:function(){return o},setClearColor:function(p,m=1){o.set(p),l=m,_(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,_(o,l)},render:g}}function v_(i,e,t,n){const r=i.getParameter(i.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),a=n.isWebGL2||s!==null,o={},l=p(null);let c=l,u=!1;function d(L,U,z,Z,q){let Y=!1;if(a){const $=_(Z,z,U);c!==$&&(c=$,f(c.object)),Y=m(L,Z,z,q),Y&&v(L,Z,z,q)}else{const $=U.wireframe===!0;(c.geometry!==Z.id||c.program!==z.id||c.wireframe!==$)&&(c.geometry=Z.id,c.program=z.id,c.wireframe=$,Y=!0)}q!==null&&t.update(q,i.ELEMENT_ARRAY_BUFFER),(Y||u)&&(u=!1,I(L,U,z,Z),q!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(q).buffer))}function h(){return n.isWebGL2?i.createVertexArray():s.createVertexArrayOES()}function f(L){return n.isWebGL2?i.bindVertexArray(L):s.bindVertexArrayOES(L)}function g(L){return n.isWebGL2?i.deleteVertexArray(L):s.deleteVertexArrayOES(L)}function _(L,U,z){const Z=z.wireframe===!0;let q=o[L.id];q===void 0&&(q={},o[L.id]=q);let Y=q[U.id];Y===void 0&&(Y={},q[U.id]=Y);let $=Y[Z];return $===void 0&&($=p(h()),Y[Z]=$),$}function p(L){const U=[],z=[],Z=[];for(let q=0;q<r;q++)U[q]=0,z[q]=0,Z[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:z,attributeDivisors:Z,object:L,attributes:{},index:null}}function m(L,U,z,Z){const q=c.attributes,Y=U.attributes;let $=0;const re=z.getAttributes();for(const ie in re)if(re[ie].location>=0){const K=q[ie];let ae=Y[ie];if(ae===void 0&&(ie==="instanceMatrix"&&L.instanceMatrix&&(ae=L.instanceMatrix),ie==="instanceColor"&&L.instanceColor&&(ae=L.instanceColor)),K===void 0||K.attribute!==ae||ae&&K.data!==ae.data)return!0;$++}return c.attributesNum!==$||c.index!==Z}function v(L,U,z,Z){const q={},Y=U.attributes;let $=0;const re=z.getAttributes();for(const ie in re)if(re[ie].location>=0){let K=Y[ie];K===void 0&&(ie==="instanceMatrix"&&L.instanceMatrix&&(K=L.instanceMatrix),ie==="instanceColor"&&L.instanceColor&&(K=L.instanceColor));const ae={};ae.attribute=K,K&&K.data&&(ae.data=K.data),q[ie]=ae,$++}c.attributes=q,c.attributesNum=$,c.index=Z}function y(){const L=c.newAttributes;for(let U=0,z=L.length;U<z;U++)L[U]=0}function M(L){P(L,0)}function P(L,U){const z=c.newAttributes,Z=c.enabledAttributes,q=c.attributeDivisors;z[L]=1,Z[L]===0&&(i.enableVertexAttribArray(L),Z[L]=1),q[L]!==U&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,U),q[L]=U)}function A(){const L=c.newAttributes,U=c.enabledAttributes;for(let z=0,Z=U.length;z<Z;z++)U[z]!==L[z]&&(i.disableVertexAttribArray(z),U[z]=0)}function R(L,U,z,Z,q,Y,$){$===!0?i.vertexAttribIPointer(L,U,z,q,Y):i.vertexAttribPointer(L,U,z,Z,q,Y)}function I(L,U,z,Z){if(n.isWebGL2===!1&&(L.isInstancedMesh||Z.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;y();const q=Z.attributes,Y=z.getAttributes(),$=U.defaultAttributeValues;for(const re in Y){const ie=Y[re];if(ie.location>=0){let W=q[re];if(W===void 0&&(re==="instanceMatrix"&&L.instanceMatrix&&(W=L.instanceMatrix),re==="instanceColor"&&L.instanceColor&&(W=L.instanceColor)),W!==void 0){const K=W.normalized,ae=W.itemSize,_e=t.get(W);if(_e===void 0)continue;const ge=_e.buffer,De=_e.type,Ge=_e.bytesPerElement,we=n.isWebGL2===!0&&(De===i.INT||De===i.UNSIGNED_INT||W.gpuType===yh);if(W.isInterleavedBufferAttribute){const ct=W.data,O=ct.stride,nn=W.offset;if(ct.isInstancedInterleavedBuffer){for(let Se=0;Se<ie.locationSize;Se++)P(ie.location+Se,ct.meshPerAttribute);L.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let Se=0;Se<ie.locationSize;Se++)M(ie.location+Se);i.bindBuffer(i.ARRAY_BUFFER,ge);for(let Se=0;Se<ie.locationSize;Se++)R(ie.location+Se,ae/ie.locationSize,De,K,O*Ge,(nn+ae/ie.locationSize*Se)*Ge,we)}else{if(W.isInstancedBufferAttribute){for(let ct=0;ct<ie.locationSize;ct++)P(ie.location+ct,W.meshPerAttribute);L.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let ct=0;ct<ie.locationSize;ct++)M(ie.location+ct);i.bindBuffer(i.ARRAY_BUFFER,ge);for(let ct=0;ct<ie.locationSize;ct++)R(ie.location+ct,ae/ie.locationSize,De,K,ae*Ge,ae/ie.locationSize*ct*Ge,we)}}else if($!==void 0){const K=$[re];if(K!==void 0)switch(K.length){case 2:i.vertexAttrib2fv(ie.location,K);break;case 3:i.vertexAttrib3fv(ie.location,K);break;case 4:i.vertexAttrib4fv(ie.location,K);break;default:i.vertexAttrib1fv(ie.location,K)}}}}A()}function S(){V();for(const L in o){const U=o[L];for(const z in U){const Z=U[z];for(const q in Z)g(Z[q].object),delete Z[q];delete U[z]}delete o[L]}}function T(L){if(o[L.id]===void 0)return;const U=o[L.id];for(const z in U){const Z=U[z];for(const q in Z)g(Z[q].object),delete Z[q];delete U[z]}delete o[L.id]}function G(L){for(const U in o){const z=o[U];if(z[L.id]===void 0)continue;const Z=z[L.id];for(const q in Z)g(Z[q].object),delete Z[q];delete z[L.id]}}function V(){J(),u=!0,c!==l&&(c=l,f(c.object))}function J(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:V,resetDefaultState:J,dispose:S,releaseStatesOfGeometry:T,releaseStatesOfProgram:G,initAttributes:y,enableAttribute:M,disableUnusedAttributes:A}}function x_(i,e,t,n){const r=n.isWebGL2;let s;function a(u){s=u}function o(u,d){i.drawArrays(s,u,d),t.update(d,s,1)}function l(u,d,h){if(h===0)return;let f,g;if(r)f=i,g="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[g](s,u,d,h),t.update(d,s,h)}function c(u,d,h){if(h===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<h;g++)this.render(u[g],d[g]);else{f.multiDrawArraysWEBGL(s,u,0,d,0,h);let g=0;for(let _=0;_<h;_++)g+=d[_];t.update(g,s,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function M_(i,e,t){let n;function r(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const l=s(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),h=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),_=i.getParameter(i.MAX_VERTEX_ATTRIBS),p=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),m=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),y=h>0,M=a||e.has("OES_texture_float"),P=y&&M,A=a?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:r,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:u,maxTextures:d,maxVertexTextures:h,maxTextureSize:f,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:p,maxVaryings:m,maxFragmentUniforms:v,vertexTextures:y,floatFragmentTextures:M,floatVertexTextures:P,maxSamples:A}}function S_(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new Rr,o=new Qe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const f=d.length!==0||h||n!==0||r;return r=h,n=d.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,f){const g=d.clippingPlanes,_=d.clipIntersection,p=d.clipShadows,m=i.get(d);if(!r||g===null||g.length===0||s&&!p)s?u(null):c();else{const v=s?0:n,y=v*4;let M=m.clippingState||null;l.value=M,M=u(g,h,y,f);for(let P=0;P!==y;++P)M[P]=t[P];m.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,h,f,g){const _=d!==null?d.length:0;let p=null;if(_!==0){if(p=l.value,g!==!0||p===null){const m=f+_*4,v=h.matrixWorldInverse;o.getNormalMatrix(v),(p===null||p.length<m)&&(p=new Float32Array(m));for(let y=0,M=f;y!==_;++y,M+=4)a.copy(d[y]).applyMatrix4(v,o),a.normal.toArray(p,M),p[M+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}function E_(i){let e=new WeakMap;function t(a,o){return o===ba?a.mapping=Fs:o===uc&&(a.mapping=Ns),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===ba||o===uc)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Fm(l.height/2);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",r),t(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class Uc extends Uh{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ms=4,ad=[.125,.215,.35,.446,.526,.582],Lr=20,Bl=new Uc,ld=new Te;let zl=null,kl=0,Gl=0;const Pr=(1+Math.sqrt(5))/2,fs=1/Pr,cd=[new E(1,1,1),new E(-1,1,1),new E(1,1,-1),new E(-1,1,-1),new E(0,Pr,fs),new E(0,Pr,-fs),new E(fs,0,Pr),new E(-fs,0,Pr),new E(Pr,fs,0),new E(-Pr,fs,0)];class ud{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){zl=this._renderer.getRenderTarget(),kl=this._renderer.getActiveCubeFace(),Gl=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=hd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(zl,kl,Gl),e.scissorTest=!1,ha(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Fs||e.mapping===Ns?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),zl=this._renderer.getRenderTarget(),kl=this._renderer.getActiveCubeFace(),Gl=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Jn,minFilter:Jn,generateMipmaps:!1,type:_o,format:Qn,colorSpace:Hi,depthBuffer:!1},r=dd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=dd(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=w_(s)),this._blurMaterial=b_(s,e,t)}return r}_compileMaterial(e){const t=new X(this._lodPlanes[0],e);this._renderer.compile(t,Bl)}_sceneToCubeUV(e,t,n,r){const o=new In(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,h=u.toneMapping;u.getClearColor(ld),u.toneMapping=lr,u.autoClear=!1;const f=new pi({name:"PMREM.Background",side:Bn,depthWrite:!1,depthTest:!1}),g=new X(new Ue,f);let _=!1;const p=e.background;p?p.isColor&&(f.color.copy(p),e.background=null,_=!0):(f.color.copy(ld),_=!0);for(let m=0;m<6;m++){const v=m%3;v===0?(o.up.set(0,l[m],0),o.lookAt(c[m],0,0)):v===1?(o.up.set(0,0,l[m]),o.lookAt(0,c[m],0)):(o.up.set(0,l[m],0),o.lookAt(0,0,c[m]));const y=this._cubeSize;ha(r,v*y,m>2?y:0,y,y),u.setRenderTarget(r),_&&u.render(g,o),u.render(e,o)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=h,u.autoClear=d,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===Fs||e.mapping===Ns;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=fd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=hd());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new X(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;ha(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Bl)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=cd[(r-1)%cd.length];this._blur(e,r-1,r,s,a)}t.autoClear=n}_blur(e,t,n,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new X(this._lodPlanes[r],c),h=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Lr-1),_=s/g,p=isFinite(s)?1+Math.floor(u*_):Lr;p>Lr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Lr}`);const m=[];let v=0;for(let R=0;R<Lr;++R){const I=R/_,S=Math.exp(-I*I/2);m.push(S),R===0?v+=S:R<p&&(v+=2*S)}for(let R=0;R<m.length;R++)m[R]=m[R]/v;h.envMap.value=e.texture,h.samples.value=p,h.weights.value=m,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:y}=this;h.dTheta.value=g,h.mipInt.value=y-n;const M=this._sizeLods[r],P=3*M*(r>y-Ms?r-y+Ms:0),A=4*(this._cubeSize-M);ha(t,P,A,3*M,2*M),l.setRenderTarget(t),l.render(d,Bl)}}function w_(i){const e=[],t=[],n=[];let r=i;const s=i-Ms+1+ad.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let l=1/o;a>i-Ms?l=ad[a-i+Ms-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],f=6,g=6,_=3,p=2,m=1,v=new Float32Array(_*g*f),y=new Float32Array(p*g*f),M=new Float32Array(m*g*f);for(let A=0;A<f;A++){const R=A%3*2/3-1,I=A>2?0:-1,S=[R,I,0,R+2/3,I,0,R+2/3,I+1,0,R,I,0,R+2/3,I+1,0,R,I+1,0];v.set(S,_*g*A),y.set(h,p*g*A);const T=[A,A,A,A,A,A];M.set(T,m*g*A)}const P=new jn;P.setAttribute("position",new Si(v,_)),P.setAttribute("uv",new Si(y,p)),P.setAttribute("faceIndex",new Si(M,m)),e.push(P),r>Ms&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function dd(i,e,t){const n=new kr(i,e,t);return n.texture.mapping=Xa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ha(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function b_(i,e,t){const n=new Float32Array(Lr),r=new E(0,1,0);return new Gr({name:"SphericalGaussianBlur",defines:{n:Lr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Fc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ar,depthTest:!1,depthWrite:!1})}function hd(){return new Gr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Fc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ar,depthTest:!1,depthWrite:!1})}function fd(){return new Gr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Fc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ar,depthTest:!1,depthWrite:!1})}function Fc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function T_(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===ba||l===uc,u=l===Fs||l===Ns;if(c||u)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let d=e.get(o);return t===null&&(t=new ud(i)),d=c?t.fromEquirectangular(o,d):t.fromCubemap(o,d),e.set(o,d),d.texture}else{if(e.has(o))return e.get(o).texture;{const d=o.image;if(c&&d&&d.height>0||u&&d&&r(d)){t===null&&(t=new ud(i));const h=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,h),o.addEventListener("dispose",s),h.texture}else return null}}}return o}function r(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function A_(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const r=t(n);return r===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function R_(i,e,t,n){const r={},s=new WeakMap;function a(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);for(const g in h.morphAttributes){const _=h.morphAttributes[g];for(let p=0,m=_.length;p<m;p++)e.remove(_[p])}h.removeEventListener("dispose",a),delete r[h.id];const f=s.get(h);f&&(e.remove(f),s.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,t.memory.geometries++),h}function l(d){const h=d.attributes;for(const g in h)e.update(h[g],i.ARRAY_BUFFER);const f=d.morphAttributes;for(const g in f){const _=f[g];for(let p=0,m=_.length;p<m;p++)e.update(_[p],i.ARRAY_BUFFER)}}function c(d){const h=[],f=d.index,g=d.attributes.position;let _=0;if(f!==null){const v=f.array;_=f.version;for(let y=0,M=v.length;y<M;y+=3){const P=v[y+0],A=v[y+1],R=v[y+2];h.push(P,A,A,R,R,P)}}else if(g!==void 0){const v=g.array;_=g.version;for(let y=0,M=v.length/3-1;y<M;y+=3){const P=y+0,A=y+1,R=y+2;h.push(P,A,A,R,R,P)}}else return;const p=new(Ah(h)?Dh:Dc)(h,1);p.version=_;const m=s.get(d);m&&e.remove(m),s.set(d,p)}function u(d){const h=s.get(d);if(h){const f=d.index;f!==null&&h.version<f.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function P_(i,e,t,n){const r=n.isWebGL2;let s;function a(f){s=f}let o,l;function c(f){o=f.type,l=f.bytesPerElement}function u(f,g){i.drawElements(s,g,o,f*l),t.update(g,s,1)}function d(f,g,_){if(_===0)return;let p,m;if(r)p=i,m="drawElementsInstanced";else if(p=e.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[m](s,g,o,f*l,_),t.update(g,s,_)}function h(f,g,_){if(_===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<_;m++)this.render(f[m]/l,g[m]);else{p.multiDrawElementsWEBGL(s,g,0,o,f,0,_);let m=0;for(let v=0;v<_;v++)m+=g[v];t.update(m,s,1)}}this.setMode=a,this.setIndex=c,this.render=u,this.renderInstances=d,this.renderMultiDraw=h}function C_(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function L_(i,e){return i[0]-e[0]}function D_(i,e){return Math.abs(e[1])-Math.abs(i[1])}function I_(i,e,t){const n={},r=new Float32Array(8),s=new WeakMap,a=new yt,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,u,d){const h=c.morphTargetInfluences;if(e.isWebGL2===!0){const g=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,_=g!==void 0?g.length:0;let p=s.get(u);if(p===void 0||p.count!==_){let U=function(){J.dispose(),s.delete(u),u.removeEventListener("dispose",U)};var f=U;p!==void 0&&p.texture.dispose();const y=u.morphAttributes.position!==void 0,M=u.morphAttributes.normal!==void 0,P=u.morphAttributes.color!==void 0,A=u.morphAttributes.position||[],R=u.morphAttributes.normal||[],I=u.morphAttributes.color||[];let S=0;y===!0&&(S=1),M===!0&&(S=2),P===!0&&(S=3);let T=u.attributes.position.count*S,G=1;T>e.maxTextureSize&&(G=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const V=new Float32Array(T*G*4*_),J=new Ch(V,T,G,_);J.type=Oi,J.needsUpdate=!0;const L=S*4;for(let z=0;z<_;z++){const Z=A[z],q=R[z],Y=I[z],$=T*G*4*z;for(let re=0;re<Z.count;re++){const ie=re*L;y===!0&&(a.fromBufferAttribute(Z,re),V[$+ie+0]=a.x,V[$+ie+1]=a.y,V[$+ie+2]=a.z,V[$+ie+3]=0),M===!0&&(a.fromBufferAttribute(q,re),V[$+ie+4]=a.x,V[$+ie+5]=a.y,V[$+ie+6]=a.z,V[$+ie+7]=0),P===!0&&(a.fromBufferAttribute(Y,re),V[$+ie+8]=a.x,V[$+ie+9]=a.y,V[$+ie+10]=a.z,V[$+ie+11]=Y.itemSize===4?a.w:1)}}p={count:_,texture:J,size:new ot(T,G)},s.set(u,p),u.addEventListener("dispose",U)}let m=0;for(let y=0;y<h.length;y++)m+=h[y];const v=u.morphTargetsRelative?1:1-m;d.getUniforms().setValue(i,"morphTargetBaseInfluence",v),d.getUniforms().setValue(i,"morphTargetInfluences",h),d.getUniforms().setValue(i,"morphTargetsTexture",p.texture,t),d.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}else{const g=h===void 0?0:h.length;let _=n[u.id];if(_===void 0||_.length!==g){_=[];for(let M=0;M<g;M++)_[M]=[M,0];n[u.id]=_}for(let M=0;M<g;M++){const P=_[M];P[0]=M,P[1]=h[M]}_.sort(D_);for(let M=0;M<8;M++)M<g&&_[M][1]?(o[M][0]=_[M][0],o[M][1]=_[M][1]):(o[M][0]=Number.MAX_SAFE_INTEGER,o[M][1]=0);o.sort(L_);const p=u.morphAttributes.position,m=u.morphAttributes.normal;let v=0;for(let M=0;M<8;M++){const P=o[M],A=P[0],R=P[1];A!==Number.MAX_SAFE_INTEGER&&R?(p&&u.getAttribute("morphTarget"+M)!==p[A]&&u.setAttribute("morphTarget"+M,p[A]),m&&u.getAttribute("morphNormal"+M)!==m[A]&&u.setAttribute("morphNormal"+M,m[A]),r[M]=R,v+=R):(p&&u.hasAttribute("morphTarget"+M)===!0&&u.deleteAttribute("morphTarget"+M),m&&u.hasAttribute("morphNormal"+M)===!0&&u.deleteAttribute("morphNormal"+M),r[M]=0)}const y=u.morphTargetsRelative?1:1-v;d.getUniforms().setValue(i,"morphTargetBaseInfluence",y),d.getUniforms().setValue(i,"morphTargetInfluences",r)}}return{update:l}}function U_(i,e,t,n){let r=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,d=e.get(l,u);if(r.get(d)!==c&&(e.update(d),r.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return d}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}class Oh extends on{constructor(e,t,n,r,s,a,o,l,c,u){if(u=u!==void 0?u:Or,u!==Or&&u!==Os)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Or&&(n=nr),n===void 0&&u===Os&&(n=Nr),super(null,r,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:gn,this.minFilter=l!==void 0?l:gn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Bh=new on,zh=new Oh(1,1);zh.compareFunction=Th;const kh=new Ch,Gh=new ym,Hh=new Fh,pd=[],md=[],gd=new Float32Array(16),_d=new Float32Array(9),yd=new Float32Array(4);function Xs(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=pd[r];if(s===void 0&&(s=new Float32Array(r),pd[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function an(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function ln(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function $a(i,e){let t=md[e];t===void 0&&(t=new Int32Array(e),md[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function F_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function N_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;i.uniform2fv(this.addr,e),ln(t,e)}}function O_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(an(t,e))return;i.uniform3fv(this.addr,e),ln(t,e)}}function B_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;i.uniform4fv(this.addr,e),ln(t,e)}}function z_(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(an(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),ln(t,e)}else{if(an(t,n))return;yd.set(n),i.uniformMatrix2fv(this.addr,!1,yd),ln(t,n)}}function k_(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(an(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),ln(t,e)}else{if(an(t,n))return;_d.set(n),i.uniformMatrix3fv(this.addr,!1,_d),ln(t,n)}}function G_(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(an(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),ln(t,e)}else{if(an(t,n))return;gd.set(n),i.uniformMatrix4fv(this.addr,!1,gd),ln(t,n)}}function H_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function V_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;i.uniform2iv(this.addr,e),ln(t,e)}}function W_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(an(t,e))return;i.uniform3iv(this.addr,e),ln(t,e)}}function X_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;i.uniform4iv(this.addr,e),ln(t,e)}}function j_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function q_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;i.uniform2uiv(this.addr,e),ln(t,e)}}function $_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(an(t,e))return;i.uniform3uiv(this.addr,e),ln(t,e)}}function Y_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;i.uniform4uiv(this.addr,e),ln(t,e)}}function Z_(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);const s=this.type===i.SAMPLER_2D_SHADOW?zh:Bh;t.setTexture2D(e||s,r)}function K_(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Gh,r)}function J_(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Hh,r)}function Q_(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||kh,r)}function ey(i){switch(i){case 5126:return F_;case 35664:return N_;case 35665:return O_;case 35666:return B_;case 35674:return z_;case 35675:return k_;case 35676:return G_;case 5124:case 35670:return H_;case 35667:case 35671:return V_;case 35668:case 35672:return W_;case 35669:case 35673:return X_;case 5125:return j_;case 36294:return q_;case 36295:return $_;case 36296:return Y_;case 35678:case 36198:case 36298:case 36306:case 35682:return Z_;case 35679:case 36299:case 36307:return K_;case 35680:case 36300:case 36308:case 36293:return J_;case 36289:case 36303:case 36311:case 36292:return Q_}}function ty(i,e){i.uniform1fv(this.addr,e)}function ny(i,e){const t=Xs(e,this.size,2);i.uniform2fv(this.addr,t)}function iy(i,e){const t=Xs(e,this.size,3);i.uniform3fv(this.addr,t)}function ry(i,e){const t=Xs(e,this.size,4);i.uniform4fv(this.addr,t)}function sy(i,e){const t=Xs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function oy(i,e){const t=Xs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function ay(i,e){const t=Xs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function ly(i,e){i.uniform1iv(this.addr,e)}function cy(i,e){i.uniform2iv(this.addr,e)}function uy(i,e){i.uniform3iv(this.addr,e)}function dy(i,e){i.uniform4iv(this.addr,e)}function hy(i,e){i.uniform1uiv(this.addr,e)}function fy(i,e){i.uniform2uiv(this.addr,e)}function py(i,e){i.uniform3uiv(this.addr,e)}function my(i,e){i.uniform4uiv(this.addr,e)}function gy(i,e,t){const n=this.cache,r=e.length,s=$a(t,r);an(n,s)||(i.uniform1iv(this.addr,s),ln(n,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||Bh,s[a])}function _y(i,e,t){const n=this.cache,r=e.length,s=$a(t,r);an(n,s)||(i.uniform1iv(this.addr,s),ln(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Gh,s[a])}function yy(i,e,t){const n=this.cache,r=e.length,s=$a(t,r);an(n,s)||(i.uniform1iv(this.addr,s),ln(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Hh,s[a])}function vy(i,e,t){const n=this.cache,r=e.length,s=$a(t,r);an(n,s)||(i.uniform1iv(this.addr,s),ln(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||kh,s[a])}function xy(i){switch(i){case 5126:return ty;case 35664:return ny;case 35665:return iy;case 35666:return ry;case 35674:return sy;case 35675:return oy;case 35676:return ay;case 5124:case 35670:return ly;case 35667:case 35671:return cy;case 35668:case 35672:return uy;case 35669:case 35673:return dy;case 5125:return hy;case 36294:return fy;case 36295:return py;case 36296:return my;case 35678:case 36198:case 36298:case 36306:case 35682:return gy;case 35679:case 36299:case 36307:return _y;case 35680:case 36300:case 36308:case 36293:return yy;case 36289:case 36303:case 36311:case 36292:return vy}}class My{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=ey(t.type)}}class Sy{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=xy(t.type)}}class Ey{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],n)}}}const Hl=/(\w+)(\])?(\[|\.)?/g;function vd(i,e){i.seq.push(e),i.map[e.id]=e}function wy(i,e,t){const n=i.name,r=n.length;for(Hl.lastIndex=0;;){const s=Hl.exec(n),a=Hl.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){vd(t,c===void 0?new My(o,i,e):new Sy(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new Ey(o),vd(t,d)),t=d}}}class Ma{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);wy(s,a,this)}}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function xd(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const by=37297;let Ty=0;function Ay(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function Ry(i){const e=bt.getPrimaries(bt.workingColorSpace),t=bt.getPrimaries(i);let n;switch(e===t?n="":e===Ca&&t===Pa?n="LinearDisplayP3ToLinearSRGB":e===Pa&&t===Ca&&(n="LinearSRGBToLinearDisplayP3"),i){case Hi:case qa:return[n,"LinearTransferOETF"];case jt:case Pc:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Md(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+Ay(i.getShaderSource(e),a)}else return r}function Py(i,e){const t=Ry(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Cy(i,e){let t;switch(e){case Tp:t="Linear";break;case Ap:t="Reinhard";break;case Rp:t="OptimizedCineon";break;case Pp:t="ACESFilmic";break;case Lp:t="AgX";break;case Cp:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Ly(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ss).join(`
`)}function Dy(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Ss).join(`
`)}function Iy(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Uy(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Ss(i){return i!==""}function Sd(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ed(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Fy=/^[ \t]*#include +<([\w\d./]+)>/gm;function pc(i){return i.replace(Fy,Oy)}const Ny=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Oy(i,e){let t=je[e];if(t===void 0){const n=Ny.get(e);if(n!==void 0)t=je[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return pc(t)}const By=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function wd(i){return i.replace(By,zy)}function zy(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function bd(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function ky(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===mh?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===gh?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Fi&&(e="SHADOWMAP_TYPE_VSM"),e}function Gy(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Fs:case Ns:e="ENVMAP_TYPE_CUBE";break;case Xa:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Hy(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ns:e="ENVMAP_MODE_REFRACTION";break}return e}function Vy(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Wa:e="ENVMAP_BLENDING_MULTIPLY";break;case wp:e="ENVMAP_BLENDING_MIX";break;case bp:e="ENVMAP_BLENDING_ADD";break}return e}function Wy(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Xy(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=ky(t),c=Gy(t),u=Hy(t),d=Vy(t),h=Wy(t),f=t.isWebGL2?"":Ly(t),g=Dy(t),_=Iy(s),p=r.createProgram();let m,v,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ss).join(`
`),m.length>0&&(m+=`
`),v=[f,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ss).join(`
`),v.length>0&&(v+=`
`)):(m=[bd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ss).join(`
`),v=[f,bd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==lr?"#define TONE_MAPPING":"",t.toneMapping!==lr?je.tonemapping_pars_fragment:"",t.toneMapping!==lr?Cy("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,Py("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ss).join(`
`)),a=pc(a),a=Sd(a,t),a=Ed(a,t),o=pc(o),o=Sd(o,t),o=Ed(o,t),a=wd(a),o=wd(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,v=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Vu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Vu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const M=y+m+a,P=y+v+o,A=xd(r,r.VERTEX_SHADER,M),R=xd(r,r.FRAGMENT_SHADER,P);r.attachShader(p,A),r.attachShader(p,R),t.index0AttributeName!==void 0?r.bindAttribLocation(p,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(p,0,"position"),r.linkProgram(p);function I(V){if(i.debug.checkShaderErrors){const J=r.getProgramInfoLog(p).trim(),L=r.getShaderInfoLog(A).trim(),U=r.getShaderInfoLog(R).trim();let z=!0,Z=!0;if(r.getProgramParameter(p,r.LINK_STATUS)===!1)if(z=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,p,A,R);else{const q=Md(r,A,"vertex"),Y=Md(r,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(p,r.VALIDATE_STATUS)+`

Program Info Log: `+J+`
`+q+`
`+Y)}else J!==""?console.warn("THREE.WebGLProgram: Program Info Log:",J):(L===""||U==="")&&(Z=!1);Z&&(V.diagnostics={runnable:z,programLog:J,vertexShader:{log:L,prefix:m},fragmentShader:{log:U,prefix:v}})}r.deleteShader(A),r.deleteShader(R),S=new Ma(r,p),T=Uy(r,p)}let S;this.getUniforms=function(){return S===void 0&&I(this),S};let T;this.getAttributes=function(){return T===void 0&&I(this),T};let G=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return G===!1&&(G=r.getProgramParameter(p,by)),G},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ty++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=A,this.fragmentShader=R,this}let jy=0;class qy{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new $y(e),t.set(e,n)),n}}class $y{constructor(e){this.id=jy++,this.code=e,this.usedTimes=0}}function Yy(i,e,t,n,r,s,a){const o=new Lc,l=new qy,c=[],u=r.isWebGL2,d=r.logarithmicDepthBuffer,h=r.vertexTextures;let f=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return S===0?"uv":`uv${S}`}function p(S,T,G,V,J){const L=V.fog,U=J.geometry,z=S.isMeshStandardMaterial?V.environment:null,Z=(S.isMeshStandardMaterial?t:e).get(S.envMap||z),q=Z&&Z.mapping===Xa?Z.image.height:null,Y=g[S.type];S.precision!==null&&(f=r.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const $=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,re=$!==void 0?$.length:0;let ie=0;U.morphAttributes.position!==void 0&&(ie=1),U.morphAttributes.normal!==void 0&&(ie=2),U.morphAttributes.color!==void 0&&(ie=3);let W,K,ae,_e;if(Y){const Rn=yi[Y];W=Rn.vertexShader,K=Rn.fragmentShader}else W=S.vertexShader,K=S.fragmentShader,l.update(S),ae=l.getVertexShaderID(S),_e=l.getFragmentShaderID(S);const ge=i.getRenderTarget(),De=J.isInstancedMesh===!0,Ge=J.isBatchedMesh===!0,we=!!S.map,ct=!!S.matcap,O=!!Z,nn=!!S.aoMap,Se=!!S.lightMap,Oe=!!S.bumpMap,ue=!!S.normalMap,ut=!!S.displacementMap,Fe=!!S.emissiveMap,b=!!S.metalnessMap,x=!!S.roughnessMap,F=S.anisotropy>0,te=S.clearcoat>0,ee=S.iridescence>0,ne=S.sheen>0,ye=S.transmission>0,de=F&&!!S.anisotropyMap,pe=te&&!!S.clearcoatMap,Le=te&&!!S.clearcoatNormalMap,Ze=te&&!!S.clearcoatRoughnessMap,Q=ee&&!!S.iridescenceMap,Et=ee&&!!S.iridescenceThicknessMap,it=ne&&!!S.sheenColorMap,ke=ne&&!!S.sheenRoughnessMap,be=!!S.specularMap,me=!!S.specularColorMap,Xe=!!S.specularIntensityMap,Mt=ye&&!!S.transmissionMap,zt=ye&&!!S.thicknessMap,tt=!!S.gradientMap,se=!!S.alphaMap,C=S.alphaTest>0,le=!!S.alphaHash,ce=!!S.extensions,Ie=!!U.attributes.uv1,Pe=!!U.attributes.uv2,At=!!U.attributes.uv3;let Rt=lr;return S.toneMapped&&(ge===null||ge.isXRRenderTarget===!0)&&(Rt=i.toneMapping),{isWebGL2:u,shaderID:Y,shaderType:S.type,shaderName:S.name,vertexShader:W,fragmentShader:K,defines:S.defines,customVertexShaderID:ae,customFragmentShaderID:_e,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Ge,instancing:De,instancingColor:De&&J.instanceColor!==null,supportsVertexTextures:h,outputColorSpace:ge===null?i.outputColorSpace:ge.isXRRenderTarget===!0?ge.texture.colorSpace:Hi,map:we,matcap:ct,envMap:O,envMapMode:O&&Z.mapping,envMapCubeUVHeight:q,aoMap:nn,lightMap:Se,bumpMap:Oe,normalMap:ue,displacementMap:h&&ut,emissiveMap:Fe,normalMapObjectSpace:ue&&S.normalMapType===Xp,normalMapTangentSpace:ue&&S.normalMapType===ja,metalnessMap:b,roughnessMap:x,anisotropy:F,anisotropyMap:de,clearcoat:te,clearcoatMap:pe,clearcoatNormalMap:Le,clearcoatRoughnessMap:Ze,iridescence:ee,iridescenceMap:Q,iridescenceThicknessMap:Et,sheen:ne,sheenColorMap:it,sheenRoughnessMap:ke,specularMap:be,specularColorMap:me,specularIntensityMap:Xe,transmission:ye,transmissionMap:Mt,thicknessMap:zt,gradientMap:tt,opaque:S.transparent===!1&&S.blending===Ts,alphaMap:se,alphaTest:C,alphaHash:le,combine:S.combine,mapUv:we&&_(S.map.channel),aoMapUv:nn&&_(S.aoMap.channel),lightMapUv:Se&&_(S.lightMap.channel),bumpMapUv:Oe&&_(S.bumpMap.channel),normalMapUv:ue&&_(S.normalMap.channel),displacementMapUv:ut&&_(S.displacementMap.channel),emissiveMapUv:Fe&&_(S.emissiveMap.channel),metalnessMapUv:b&&_(S.metalnessMap.channel),roughnessMapUv:x&&_(S.roughnessMap.channel),anisotropyMapUv:de&&_(S.anisotropyMap.channel),clearcoatMapUv:pe&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:Le&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ze&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Q&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:Et&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:it&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:ke&&_(S.sheenRoughnessMap.channel),specularMapUv:be&&_(S.specularMap.channel),specularColorMapUv:me&&_(S.specularColorMap.channel),specularIntensityMapUv:Xe&&_(S.specularIntensityMap.channel),transmissionMapUv:Mt&&_(S.transmissionMap.channel),thicknessMapUv:zt&&_(S.thicknessMap.channel),alphaMapUv:se&&_(S.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(ue||F),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,vertexUv1s:Ie,vertexUv2s:Pe,vertexUv3s:At,pointsUvs:J.isPoints===!0&&!!U.attributes.uv&&(we||se),fog:!!L,useFog:S.fog===!0,fogExp2:L&&L.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:J.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:re,morphTextureStride:ie,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&G.length>0,shadowMapType:i.shadowMap.type,toneMapping:Rt,useLegacyLights:i._useLegacyLights,decodeVideoTexture:we&&S.map.isVideoTexture===!0&&bt.getTransfer(S.map.colorSpace)===Lt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===vi,flipSided:S.side===Bn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionDerivatives:ce&&S.extensions.derivatives===!0,extensionFragDepth:ce&&S.extensions.fragDepth===!0,extensionDrawBuffers:ce&&S.extensions.drawBuffers===!0,extensionShaderTextureLOD:ce&&S.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ce&&S.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()}}function m(S){const T=[];if(S.shaderID?T.push(S.shaderID):(T.push(S.customVertexShaderID),T.push(S.customFragmentShaderID)),S.defines!==void 0)for(const G in S.defines)T.push(G),T.push(S.defines[G]);return S.isRawShaderMaterial===!1&&(v(T,S),y(T,S),T.push(i.outputColorSpace)),T.push(S.customProgramCacheKey),T.join()}function v(S,T){S.push(T.precision),S.push(T.outputColorSpace),S.push(T.envMapMode),S.push(T.envMapCubeUVHeight),S.push(T.mapUv),S.push(T.alphaMapUv),S.push(T.lightMapUv),S.push(T.aoMapUv),S.push(T.bumpMapUv),S.push(T.normalMapUv),S.push(T.displacementMapUv),S.push(T.emissiveMapUv),S.push(T.metalnessMapUv),S.push(T.roughnessMapUv),S.push(T.anisotropyMapUv),S.push(T.clearcoatMapUv),S.push(T.clearcoatNormalMapUv),S.push(T.clearcoatRoughnessMapUv),S.push(T.iridescenceMapUv),S.push(T.iridescenceThicknessMapUv),S.push(T.sheenColorMapUv),S.push(T.sheenRoughnessMapUv),S.push(T.specularMapUv),S.push(T.specularColorMapUv),S.push(T.specularIntensityMapUv),S.push(T.transmissionMapUv),S.push(T.thicknessMapUv),S.push(T.combine),S.push(T.fogExp2),S.push(T.sizeAttenuation),S.push(T.morphTargetsCount),S.push(T.morphAttributeCount),S.push(T.numDirLights),S.push(T.numPointLights),S.push(T.numSpotLights),S.push(T.numSpotLightMaps),S.push(T.numHemiLights),S.push(T.numRectAreaLights),S.push(T.numDirLightShadows),S.push(T.numPointLightShadows),S.push(T.numSpotLightShadows),S.push(T.numSpotLightShadowsWithMaps),S.push(T.numLightProbes),S.push(T.shadowMapType),S.push(T.toneMapping),S.push(T.numClippingPlanes),S.push(T.numClipIntersection),S.push(T.depthPacking)}function y(S,T){o.disableAll(),T.isWebGL2&&o.enable(0),T.supportsVertexTextures&&o.enable(1),T.instancing&&o.enable(2),T.instancingColor&&o.enable(3),T.matcap&&o.enable(4),T.envMap&&o.enable(5),T.normalMapObjectSpace&&o.enable(6),T.normalMapTangentSpace&&o.enable(7),T.clearcoat&&o.enable(8),T.iridescence&&o.enable(9),T.alphaTest&&o.enable(10),T.vertexColors&&o.enable(11),T.vertexAlphas&&o.enable(12),T.vertexUv1s&&o.enable(13),T.vertexUv2s&&o.enable(14),T.vertexUv3s&&o.enable(15),T.vertexTangents&&o.enable(16),T.anisotropy&&o.enable(17),T.alphaHash&&o.enable(18),T.batching&&o.enable(19),S.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.skinning&&o.enable(4),T.morphTargets&&o.enable(5),T.morphNormals&&o.enable(6),T.morphColors&&o.enable(7),T.premultipliedAlpha&&o.enable(8),T.shadowMapEnabled&&o.enable(9),T.useLegacyLights&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),S.push(o.mask)}function M(S){const T=g[S.type];let G;if(T){const V=yi[T];G=Lm.clone(V.uniforms)}else G=S.uniforms;return G}function P(S,T){let G;for(let V=0,J=c.length;V<J;V++){const L=c[V];if(L.cacheKey===T){G=L,++G.usedTimes;break}}return G===void 0&&(G=new Xy(i,T,S,s),c.push(G)),G}function A(S){if(--S.usedTimes===0){const T=c.indexOf(S);c[T]=c[c.length-1],c.pop(),S.destroy()}}function R(S){l.remove(S)}function I(){l.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:M,acquireProgram:P,releaseProgram:A,releaseShaderCache:R,programs:c,dispose:I}}function Zy(){let i=new WeakMap;function e(s){let a=i.get(s);return a===void 0&&(a={},i.set(s,a)),a}function t(s){i.delete(s)}function n(s,a,o){i.get(s)[a]=o}function r(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:r}}function Ky(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Td(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Ad(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(d,h,f,g,_,p){let m=i[e];return m===void 0?(m={id:d.id,object:d,geometry:h,material:f,groupOrder:g,renderOrder:d.renderOrder,z:_,group:p},i[e]=m):(m.id=d.id,m.object=d,m.geometry=h,m.material=f,m.groupOrder=g,m.renderOrder=d.renderOrder,m.z=_,m.group=p),e++,m}function o(d,h,f,g,_,p){const m=a(d,h,f,g,_,p);f.transmission>0?n.push(m):f.transparent===!0?r.push(m):t.push(m)}function l(d,h,f,g,_,p){const m=a(d,h,f,g,_,p);f.transmission>0?n.unshift(m):f.transparent===!0?r.unshift(m):t.unshift(m)}function c(d,h){t.length>1&&t.sort(d||Ky),n.length>1&&n.sort(h||Td),r.length>1&&r.sort(h||Td)}function u(){for(let d=e,h=i.length;d<h;d++){const f=i[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:o,unshift:l,finish:u,sort:c}}function Jy(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new Ad,i.set(n,[a])):r>=s.length?(a=new Ad,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Qy(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new E,color:new Te};break;case"SpotLight":t={position:new E,direction:new E,color:new Te,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new E,color:new Te,distance:0,decay:0};break;case"HemisphereLight":t={direction:new E,skyColor:new Te,groundColor:new Te};break;case"RectAreaLight":t={color:new Te,position:new E,halfWidth:new E,halfHeight:new E};break}return i[e.id]=t,t}}}function ev(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let tv=0;function nv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function iv(i,e){const t=new Qy,n=ev(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)r.probe.push(new E);const s=new E,a=new Ee,o=new Ee;function l(u,d){let h=0,f=0,g=0;for(let V=0;V<9;V++)r.probe[V].set(0,0,0);let _=0,p=0,m=0,v=0,y=0,M=0,P=0,A=0,R=0,I=0,S=0;u.sort(nv);const T=d===!0?Math.PI:1;for(let V=0,J=u.length;V<J;V++){const L=u[V],U=L.color,z=L.intensity,Z=L.distance,q=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=U.r*z*T,f+=U.g*z*T,g+=U.b*z*T;else if(L.isLightProbe){for(let Y=0;Y<9;Y++)r.probe[Y].addScaledVector(L.sh.coefficients[Y],z);S++}else if(L.isDirectionalLight){const Y=t.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity*T),L.castShadow){const $=L.shadow,re=n.get(L);re.shadowBias=$.bias,re.shadowNormalBias=$.normalBias,re.shadowRadius=$.radius,re.shadowMapSize=$.mapSize,r.directionalShadow[_]=re,r.directionalShadowMap[_]=q,r.directionalShadowMatrix[_]=L.shadow.matrix,M++}r.directional[_]=Y,_++}else if(L.isSpotLight){const Y=t.get(L);Y.position.setFromMatrixPosition(L.matrixWorld),Y.color.copy(U).multiplyScalar(z*T),Y.distance=Z,Y.coneCos=Math.cos(L.angle),Y.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),Y.decay=L.decay,r.spot[m]=Y;const $=L.shadow;if(L.map&&(r.spotLightMap[R]=L.map,R++,$.updateMatrices(L),L.castShadow&&I++),r.spotLightMatrix[m]=$.matrix,L.castShadow){const re=n.get(L);re.shadowBias=$.bias,re.shadowNormalBias=$.normalBias,re.shadowRadius=$.radius,re.shadowMapSize=$.mapSize,r.spotShadow[m]=re,r.spotShadowMap[m]=q,A++}m++}else if(L.isRectAreaLight){const Y=t.get(L);Y.color.copy(U).multiplyScalar(z),Y.halfWidth.set(L.width*.5,0,0),Y.halfHeight.set(0,L.height*.5,0),r.rectArea[v]=Y,v++}else if(L.isPointLight){const Y=t.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity*T),Y.distance=L.distance,Y.decay=L.decay,L.castShadow){const $=L.shadow,re=n.get(L);re.shadowBias=$.bias,re.shadowNormalBias=$.normalBias,re.shadowRadius=$.radius,re.shadowMapSize=$.mapSize,re.shadowCameraNear=$.camera.near,re.shadowCameraFar=$.camera.far,r.pointShadow[p]=re,r.pointShadowMap[p]=q,r.pointShadowMatrix[p]=L.shadow.matrix,P++}r.point[p]=Y,p++}else if(L.isHemisphereLight){const Y=t.get(L);Y.skyColor.copy(L.color).multiplyScalar(z*T),Y.groundColor.copy(L.groundColor).multiplyScalar(z*T),r.hemi[y]=Y,y++}}v>0&&(e.isWebGL2?i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=oe.LTC_FLOAT_1,r.rectAreaLTC2=oe.LTC_FLOAT_2):(r.rectAreaLTC1=oe.LTC_HALF_1,r.rectAreaLTC2=oe.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=oe.LTC_FLOAT_1,r.rectAreaLTC2=oe.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=oe.LTC_HALF_1,r.rectAreaLTC2=oe.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=h,r.ambient[1]=f,r.ambient[2]=g;const G=r.hash;(G.directionalLength!==_||G.pointLength!==p||G.spotLength!==m||G.rectAreaLength!==v||G.hemiLength!==y||G.numDirectionalShadows!==M||G.numPointShadows!==P||G.numSpotShadows!==A||G.numSpotMaps!==R||G.numLightProbes!==S)&&(r.directional.length=_,r.spot.length=m,r.rectArea.length=v,r.point.length=p,r.hemi.length=y,r.directionalShadow.length=M,r.directionalShadowMap.length=M,r.pointShadow.length=P,r.pointShadowMap.length=P,r.spotShadow.length=A,r.spotShadowMap.length=A,r.directionalShadowMatrix.length=M,r.pointShadowMatrix.length=P,r.spotLightMatrix.length=A+R-I,r.spotLightMap.length=R,r.numSpotLightShadowsWithMaps=I,r.numLightProbes=S,G.directionalLength=_,G.pointLength=p,G.spotLength=m,G.rectAreaLength=v,G.hemiLength=y,G.numDirectionalShadows=M,G.numPointShadows=P,G.numSpotShadows=A,G.numSpotMaps=R,G.numLightProbes=S,r.version=tv++)}function c(u,d){let h=0,f=0,g=0,_=0,p=0;const m=d.matrixWorldInverse;for(let v=0,y=u.length;v<y;v++){const M=u[v];if(M.isDirectionalLight){const P=r.directional[h];P.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),P.direction.sub(s),P.direction.transformDirection(m),h++}else if(M.isSpotLight){const P=r.spot[g];P.position.setFromMatrixPosition(M.matrixWorld),P.position.applyMatrix4(m),P.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),P.direction.sub(s),P.direction.transformDirection(m),g++}else if(M.isRectAreaLight){const P=r.rectArea[_];P.position.setFromMatrixPosition(M.matrixWorld),P.position.applyMatrix4(m),o.identity(),a.copy(M.matrixWorld),a.premultiply(m),o.extractRotation(a),P.halfWidth.set(M.width*.5,0,0),P.halfHeight.set(0,M.height*.5,0),P.halfWidth.applyMatrix4(o),P.halfHeight.applyMatrix4(o),_++}else if(M.isPointLight){const P=r.point[f];P.position.setFromMatrixPosition(M.matrixWorld),P.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const P=r.hemi[p];P.direction.setFromMatrixPosition(M.matrixWorld),P.direction.transformDirection(m),p++}}}return{setup:l,setupView:c,state:r}}function Rd(i,e){const t=new iv(i,e),n=[],r=[];function s(){n.length=0,r.length=0}function a(d){n.push(d)}function o(d){r.push(d)}function l(d){t.setup(n,d)}function c(d){t.setupView(n,d)}return{init:s,state:{lightsArray:n,shadowsArray:r,lights:t},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function rv(i,e){let t=new WeakMap;function n(s,a=0){const o=t.get(s);let l;return o===void 0?(l=new Rd(i,e),t.set(s,[l])):a>=o.length?(l=new Rd(i,e),o.push(l)):l=o[a],l}function r(){t=new WeakMap}return{get:n,dispose:r}}class sv extends Xi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Vp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class ov extends Xi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const av=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,lv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function cv(i,e,t){let n=new Ic;const r=new ot,s=new ot,a=new yt,o=new sv({depthPacking:Wp}),l=new ov,c={},u=t.maxTextureSize,d={[yr]:Bn,[Bn]:yr,[vi]:vi},h=new Gr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ot},radius:{value:4}},vertexShader:av,fragmentShader:lv}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const g=new jn;g.setAttribute("position",new Si(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new X(g,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=mh;let m=this.type;this.render=function(A,R,I){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||A.length===0)return;const S=i.getRenderTarget(),T=i.getActiveCubeFace(),G=i.getActiveMipmapLevel(),V=i.state;V.setBlending(ar),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const J=m!==Fi&&this.type===Fi,L=m===Fi&&this.type!==Fi;for(let U=0,z=A.length;U<z;U++){const Z=A[U],q=Z.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;r.copy(q.mapSize);const Y=q.getFrameExtents();if(r.multiply(Y),s.copy(q.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/Y.x),r.x=s.x*Y.x,q.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/Y.y),r.y=s.y*Y.y,q.mapSize.y=s.y)),q.map===null||J===!0||L===!0){const re=this.type!==Fi?{minFilter:gn,magFilter:gn}:{};q.map!==null&&q.map.dispose(),q.map=new kr(r.x,r.y,re),q.map.texture.name=Z.name+".shadowMap",q.camera.updateProjectionMatrix()}i.setRenderTarget(q.map),i.clear();const $=q.getViewportCount();for(let re=0;re<$;re++){const ie=q.getViewport(re);a.set(s.x*ie.x,s.y*ie.y,s.x*ie.z,s.y*ie.w),V.viewport(a),q.updateMatrices(Z,re),n=q.getFrustum(),M(R,I,q.camera,Z,this.type)}q.isPointLightShadow!==!0&&this.type===Fi&&v(q,I),q.needsUpdate=!1}m=this.type,p.needsUpdate=!1,i.setRenderTarget(S,T,G)};function v(A,R){const I=e.update(_);h.defines.VSM_SAMPLES!==A.blurSamples&&(h.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new kr(r.x,r.y)),h.uniforms.shadow_pass.value=A.map.texture,h.uniforms.resolution.value=A.mapSize,h.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(R,null,I,h,_,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(R,null,I,f,_,null)}function y(A,R,I,S){let T=null;const G=I.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(G!==void 0)T=G;else if(T=I.isPointLight===!0?l:o,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const V=T.uuid,J=R.uuid;let L=c[V];L===void 0&&(L={},c[V]=L);let U=L[J];U===void 0&&(U=T.clone(),L[J]=U,R.addEventListener("dispose",P)),T=U}if(T.visible=R.visible,T.wireframe=R.wireframe,S===Fi?T.side=R.shadowSide!==null?R.shadowSide:R.side:T.side=R.shadowSide!==null?R.shadowSide:d[R.side],T.alphaMap=R.alphaMap,T.alphaTest=R.alphaTest,T.map=R.map,T.clipShadows=R.clipShadows,T.clippingPlanes=R.clippingPlanes,T.clipIntersection=R.clipIntersection,T.displacementMap=R.displacementMap,T.displacementScale=R.displacementScale,T.displacementBias=R.displacementBias,T.wireframeLinewidth=R.wireframeLinewidth,T.linewidth=R.linewidth,I.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const V=i.properties.get(T);V.light=I}return T}function M(A,R,I,S,T){if(A.visible===!1)return;if(A.layers.test(R.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&T===Fi)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,A.matrixWorld);const J=e.update(A),L=A.material;if(Array.isArray(L)){const U=J.groups;for(let z=0,Z=U.length;z<Z;z++){const q=U[z],Y=L[q.materialIndex];if(Y&&Y.visible){const $=y(A,Y,S,T);A.onBeforeShadow(i,A,R,I,J,$,q),i.renderBufferDirect(I,null,J,$,A,q),A.onAfterShadow(i,A,R,I,J,$,q)}}}else if(L.visible){const U=y(A,L,S,T);A.onBeforeShadow(i,A,R,I,J,U,null),i.renderBufferDirect(I,null,J,U,A,null),A.onAfterShadow(i,A,R,I,J,U,null)}}const V=A.children;for(let J=0,L=V.length;J<L;J++)M(V[J],R,I,S,T)}function P(A){A.target.removeEventListener("dispose",P);for(const I in c){const S=c[I],T=A.target.uuid;T in S&&(S[T].dispose(),delete S[T])}}}function uv(i,e,t){const n=t.isWebGL2;function r(){let C=!1;const le=new yt;let ce=null;const Ie=new yt(0,0,0,0);return{setMask:function(Pe){ce!==Pe&&!C&&(i.colorMask(Pe,Pe,Pe,Pe),ce=Pe)},setLocked:function(Pe){C=Pe},setClear:function(Pe,At,Rt,cn,Rn){Rn===!0&&(Pe*=cn,At*=cn,Rt*=cn),le.set(Pe,At,Rt,cn),Ie.equals(le)===!1&&(i.clearColor(Pe,At,Rt,cn),Ie.copy(le))},reset:function(){C=!1,ce=null,Ie.set(-1,0,0,0)}}}function s(){let C=!1,le=null,ce=null,Ie=null;return{setTest:function(Pe){Pe?Ge(i.DEPTH_TEST):we(i.DEPTH_TEST)},setMask:function(Pe){le!==Pe&&!C&&(i.depthMask(Pe),le=Pe)},setFunc:function(Pe){if(ce!==Pe){switch(Pe){case _p:i.depthFunc(i.NEVER);break;case yp:i.depthFunc(i.ALWAYS);break;case vp:i.depthFunc(i.LESS);break;case wa:i.depthFunc(i.LEQUAL);break;case xp:i.depthFunc(i.EQUAL);break;case Mp:i.depthFunc(i.GEQUAL);break;case Sp:i.depthFunc(i.GREATER);break;case Ep:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ce=Pe}},setLocked:function(Pe){C=Pe},setClear:function(Pe){Ie!==Pe&&(i.clearDepth(Pe),Ie=Pe)},reset:function(){C=!1,le=null,ce=null,Ie=null}}}function a(){let C=!1,le=null,ce=null,Ie=null,Pe=null,At=null,Rt=null,cn=null,Rn=null;return{setTest:function(Pt){C||(Pt?Ge(i.STENCIL_TEST):we(i.STENCIL_TEST))},setMask:function(Pt){le!==Pt&&!C&&(i.stencilMask(Pt),le=Pt)},setFunc:function(Pt,Pn,gi){(ce!==Pt||Ie!==Pn||Pe!==gi)&&(i.stencilFunc(Pt,Pn,gi),ce=Pt,Ie=Pn,Pe=gi)},setOp:function(Pt,Pn,gi){(At!==Pt||Rt!==Pn||cn!==gi)&&(i.stencilOp(Pt,Pn,gi),At=Pt,Rt=Pn,cn=gi)},setLocked:function(Pt){C=Pt},setClear:function(Pt){Rn!==Pt&&(i.clearStencil(Pt),Rn=Pt)},reset:function(){C=!1,le=null,ce=null,Ie=null,Pe=null,At=null,Rt=null,cn=null,Rn=null}}}const o=new r,l=new s,c=new a,u=new WeakMap,d=new WeakMap;let h={},f={},g=new WeakMap,_=[],p=null,m=!1,v=null,y=null,M=null,P=null,A=null,R=null,I=null,S=new Te(0,0,0),T=0,G=!1,V=null,J=null,L=null,U=null,z=null;const Z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,Y=0;const $=i.getParameter(i.VERSION);$.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec($)[1]),q=Y>=1):$.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),q=Y>=2);let re=null,ie={};const W=i.getParameter(i.SCISSOR_BOX),K=i.getParameter(i.VIEWPORT),ae=new yt().fromArray(W),_e=new yt().fromArray(K);function ge(C,le,ce,Ie){const Pe=new Uint8Array(4),At=i.createTexture();i.bindTexture(C,At),i.texParameteri(C,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(C,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Rt=0;Rt<ce;Rt++)n&&(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)?i.texImage3D(le,0,i.RGBA,1,1,Ie,0,i.RGBA,i.UNSIGNED_BYTE,Pe):i.texImage2D(le+Rt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Pe);return At}const De={};De[i.TEXTURE_2D]=ge(i.TEXTURE_2D,i.TEXTURE_2D,1),De[i.TEXTURE_CUBE_MAP]=ge(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(De[i.TEXTURE_2D_ARRAY]=ge(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),De[i.TEXTURE_3D]=ge(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Ge(i.DEPTH_TEST),l.setFunc(wa),Fe(!1),b(su),Ge(i.CULL_FACE),ue(ar);function Ge(C){h[C]!==!0&&(i.enable(C),h[C]=!0)}function we(C){h[C]!==!1&&(i.disable(C),h[C]=!1)}function ct(C,le){return f[C]!==le?(i.bindFramebuffer(C,le),f[C]=le,n&&(C===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=le),C===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=le)),!0):!1}function O(C,le){let ce=_,Ie=!1;if(C)if(ce=g.get(le),ce===void 0&&(ce=[],g.set(le,ce)),C.isWebGLMultipleRenderTargets){const Pe=C.texture;if(ce.length!==Pe.length||ce[0]!==i.COLOR_ATTACHMENT0){for(let At=0,Rt=Pe.length;At<Rt;At++)ce[At]=i.COLOR_ATTACHMENT0+At;ce.length=Pe.length,Ie=!0}}else ce[0]!==i.COLOR_ATTACHMENT0&&(ce[0]=i.COLOR_ATTACHMENT0,Ie=!0);else ce[0]!==i.BACK&&(ce[0]=i.BACK,Ie=!0);Ie&&(t.isWebGL2?i.drawBuffers(ce):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ce))}function nn(C){return p!==C?(i.useProgram(C),p=C,!0):!1}const Se={[Cr]:i.FUNC_ADD,[np]:i.FUNC_SUBTRACT,[ip]:i.FUNC_REVERSE_SUBTRACT};if(n)Se[cu]=i.MIN,Se[uu]=i.MAX;else{const C=e.get("EXT_blend_minmax");C!==null&&(Se[cu]=C.MIN_EXT,Se[uu]=C.MAX_EXT)}const Oe={[rp]:i.ZERO,[sp]:i.ONE,[op]:i.SRC_COLOR,[lc]:i.SRC_ALPHA,[hp]:i.SRC_ALPHA_SATURATE,[up]:i.DST_COLOR,[lp]:i.DST_ALPHA,[ap]:i.ONE_MINUS_SRC_COLOR,[cc]:i.ONE_MINUS_SRC_ALPHA,[dp]:i.ONE_MINUS_DST_COLOR,[cp]:i.ONE_MINUS_DST_ALPHA,[fp]:i.CONSTANT_COLOR,[pp]:i.ONE_MINUS_CONSTANT_COLOR,[mp]:i.CONSTANT_ALPHA,[gp]:i.ONE_MINUS_CONSTANT_ALPHA};function ue(C,le,ce,Ie,Pe,At,Rt,cn,Rn,Pt){if(C===ar){m===!0&&(we(i.BLEND),m=!1);return}if(m===!1&&(Ge(i.BLEND),m=!0),C!==tp){if(C!==v||Pt!==G){if((y!==Cr||A!==Cr)&&(i.blendEquation(i.FUNC_ADD),y=Cr,A=Cr),Pt)switch(C){case Ts:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ou:i.blendFunc(i.ONE,i.ONE);break;case au:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case lu:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",C);break}else switch(C){case Ts:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ou:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case au:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case lu:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",C);break}M=null,P=null,R=null,I=null,S.set(0,0,0),T=0,v=C,G=Pt}return}Pe=Pe||le,At=At||ce,Rt=Rt||Ie,(le!==y||Pe!==A)&&(i.blendEquationSeparate(Se[le],Se[Pe]),y=le,A=Pe),(ce!==M||Ie!==P||At!==R||Rt!==I)&&(i.blendFuncSeparate(Oe[ce],Oe[Ie],Oe[At],Oe[Rt]),M=ce,P=Ie,R=At,I=Rt),(cn.equals(S)===!1||Rn!==T)&&(i.blendColor(cn.r,cn.g,cn.b,Rn),S.copy(cn),T=Rn),v=C,G=!1}function ut(C,le){C.side===vi?we(i.CULL_FACE):Ge(i.CULL_FACE);let ce=C.side===Bn;le&&(ce=!ce),Fe(ce),C.blending===Ts&&C.transparent===!1?ue(ar):ue(C.blending,C.blendEquation,C.blendSrc,C.blendDst,C.blendEquationAlpha,C.blendSrcAlpha,C.blendDstAlpha,C.blendColor,C.blendAlpha,C.premultipliedAlpha),l.setFunc(C.depthFunc),l.setTest(C.depthTest),l.setMask(C.depthWrite),o.setMask(C.colorWrite);const Ie=C.stencilWrite;c.setTest(Ie),Ie&&(c.setMask(C.stencilWriteMask),c.setFunc(C.stencilFunc,C.stencilRef,C.stencilFuncMask),c.setOp(C.stencilFail,C.stencilZFail,C.stencilZPass)),F(C.polygonOffset,C.polygonOffsetFactor,C.polygonOffsetUnits),C.alphaToCoverage===!0?Ge(i.SAMPLE_ALPHA_TO_COVERAGE):we(i.SAMPLE_ALPHA_TO_COVERAGE)}function Fe(C){V!==C&&(C?i.frontFace(i.CW):i.frontFace(i.CCW),V=C)}function b(C){C!==Qf?(Ge(i.CULL_FACE),C!==J&&(C===su?i.cullFace(i.BACK):C===ep?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):we(i.CULL_FACE),J=C}function x(C){C!==L&&(q&&i.lineWidth(C),L=C)}function F(C,le,ce){C?(Ge(i.POLYGON_OFFSET_FILL),(U!==le||z!==ce)&&(i.polygonOffset(le,ce),U=le,z=ce)):we(i.POLYGON_OFFSET_FILL)}function te(C){C?Ge(i.SCISSOR_TEST):we(i.SCISSOR_TEST)}function ee(C){C===void 0&&(C=i.TEXTURE0+Z-1),re!==C&&(i.activeTexture(C),re=C)}function ne(C,le,ce){ce===void 0&&(re===null?ce=i.TEXTURE0+Z-1:ce=re);let Ie=ie[ce];Ie===void 0&&(Ie={type:void 0,texture:void 0},ie[ce]=Ie),(Ie.type!==C||Ie.texture!==le)&&(re!==ce&&(i.activeTexture(ce),re=ce),i.bindTexture(C,le||De[C]),Ie.type=C,Ie.texture=le)}function ye(){const C=ie[re];C!==void 0&&C.type!==void 0&&(i.bindTexture(C.type,null),C.type=void 0,C.texture=void 0)}function de(){try{i.compressedTexImage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function pe(){try{i.compressedTexImage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Le(){try{i.texSubImage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Ze(){try{i.texSubImage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Q(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Et(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function it(){try{i.texStorage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function ke(){try{i.texStorage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function be(){try{i.texImage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function me(){try{i.texImage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Xe(C){ae.equals(C)===!1&&(i.scissor(C.x,C.y,C.z,C.w),ae.copy(C))}function Mt(C){_e.equals(C)===!1&&(i.viewport(C.x,C.y,C.z,C.w),_e.copy(C))}function zt(C,le){let ce=d.get(le);ce===void 0&&(ce=new WeakMap,d.set(le,ce));let Ie=ce.get(C);Ie===void 0&&(Ie=i.getUniformBlockIndex(le,C.name),ce.set(C,Ie))}function tt(C,le){const Ie=d.get(le).get(C);u.get(le)!==Ie&&(i.uniformBlockBinding(le,Ie,C.__bindingPointIndex),u.set(le,Ie))}function se(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},re=null,ie={},f={},g=new WeakMap,_=[],p=null,m=!1,v=null,y=null,M=null,P=null,A=null,R=null,I=null,S=new Te(0,0,0),T=0,G=!1,V=null,J=null,L=null,U=null,z=null,ae.set(0,0,i.canvas.width,i.canvas.height),_e.set(0,0,i.canvas.width,i.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:Ge,disable:we,bindFramebuffer:ct,drawBuffers:O,useProgram:nn,setBlending:ue,setMaterial:ut,setFlipSided:Fe,setCullFace:b,setLineWidth:x,setPolygonOffset:F,setScissorTest:te,activeTexture:ee,bindTexture:ne,unbindTexture:ye,compressedTexImage2D:de,compressedTexImage3D:pe,texImage2D:be,texImage3D:me,updateUBOMapping:zt,uniformBlockBinding:tt,texStorage2D:it,texStorage3D:ke,texSubImage2D:Le,texSubImage3D:Ze,compressedTexSubImage2D:Q,compressedTexSubImage3D:Et,scissor:Xe,viewport:Mt,reset:se}}function dv(i,e,t,n,r,s,a){const o=r.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap;let d;const h=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,x){return f?new OffscreenCanvas(b,x):yo("canvas")}function _(b,x,F,te){let ee=1;if((b.width>te||b.height>te)&&(ee=te/Math.max(b.width,b.height)),ee<1||x===!0)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap){const ne=x?Da:Math.floor,ye=ne(ee*b.width),de=ne(ee*b.height);d===void 0&&(d=g(ye,de));const pe=F?g(ye,de):d;return pe.width=ye,pe.height=de,pe.getContext("2d").drawImage(b,0,0,ye,de),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+b.width+"x"+b.height+") to ("+ye+"x"+de+")."),pe}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+b.width+"x"+b.height+")."),b;return b}function p(b){return fc(b.width)&&fc(b.height)}function m(b){return o?!1:b.wrapS!==Vn||b.wrapT!==Vn||b.minFilter!==gn&&b.minFilter!==Jn}function v(b,x){return b.generateMipmaps&&x&&b.minFilter!==gn&&b.minFilter!==Jn}function y(b){i.generateMipmap(b)}function M(b,x,F,te,ee=!1){if(o===!1)return x;if(b!==null){if(i[b]!==void 0)return i[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let ne=x;if(x===i.RED&&(F===i.FLOAT&&(ne=i.R32F),F===i.HALF_FLOAT&&(ne=i.R16F),F===i.UNSIGNED_BYTE&&(ne=i.R8)),x===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(ne=i.R8UI),F===i.UNSIGNED_SHORT&&(ne=i.R16UI),F===i.UNSIGNED_INT&&(ne=i.R32UI),F===i.BYTE&&(ne=i.R8I),F===i.SHORT&&(ne=i.R16I),F===i.INT&&(ne=i.R32I)),x===i.RG&&(F===i.FLOAT&&(ne=i.RG32F),F===i.HALF_FLOAT&&(ne=i.RG16F),F===i.UNSIGNED_BYTE&&(ne=i.RG8)),x===i.RGBA){const ye=ee?Ra:bt.getTransfer(te);F===i.FLOAT&&(ne=i.RGBA32F),F===i.HALF_FLOAT&&(ne=i.RGBA16F),F===i.UNSIGNED_BYTE&&(ne=ye===Lt?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&(ne=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(ne=i.RGB5_A1)}return(ne===i.R16F||ne===i.R32F||ne===i.RG16F||ne===i.RG32F||ne===i.RGBA16F||ne===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ne}function P(b,x,F){return v(b,F)===!0||b.isFramebufferTexture&&b.minFilter!==gn&&b.minFilter!==Jn?Math.log2(Math.max(x.width,x.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?x.mipmaps.length:1}function A(b){return b===gn||b===hu||b===pl?i.NEAREST:i.LINEAR}function R(b){const x=b.target;x.removeEventListener("dispose",R),S(x),x.isVideoTexture&&u.delete(x)}function I(b){const x=b.target;x.removeEventListener("dispose",I),G(x)}function S(b){const x=n.get(b);if(x.__webglInit===void 0)return;const F=b.source,te=h.get(F);if(te){const ee=te[x.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&T(b),Object.keys(te).length===0&&h.delete(F)}n.remove(b)}function T(b){const x=n.get(b);i.deleteTexture(x.__webglTexture);const F=b.source,te=h.get(F);delete te[x.__cacheKey],a.memory.textures--}function G(b){const x=b.texture,F=n.get(b),te=n.get(x);if(te.__webglTexture!==void 0&&(i.deleteTexture(te.__webglTexture),a.memory.textures--),b.depthTexture&&b.depthTexture.dispose(),b.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(F.__webglFramebuffer[ee]))for(let ne=0;ne<F.__webglFramebuffer[ee].length;ne++)i.deleteFramebuffer(F.__webglFramebuffer[ee][ne]);else i.deleteFramebuffer(F.__webglFramebuffer[ee]);F.__webglDepthbuffer&&i.deleteRenderbuffer(F.__webglDepthbuffer[ee])}else{if(Array.isArray(F.__webglFramebuffer))for(let ee=0;ee<F.__webglFramebuffer.length;ee++)i.deleteFramebuffer(F.__webglFramebuffer[ee]);else i.deleteFramebuffer(F.__webglFramebuffer);if(F.__webglDepthbuffer&&i.deleteRenderbuffer(F.__webglDepthbuffer),F.__webglMultisampledFramebuffer&&i.deleteFramebuffer(F.__webglMultisampledFramebuffer),F.__webglColorRenderbuffer)for(let ee=0;ee<F.__webglColorRenderbuffer.length;ee++)F.__webglColorRenderbuffer[ee]&&i.deleteRenderbuffer(F.__webglColorRenderbuffer[ee]);F.__webglDepthRenderbuffer&&i.deleteRenderbuffer(F.__webglDepthRenderbuffer)}if(b.isWebGLMultipleRenderTargets)for(let ee=0,ne=x.length;ee<ne;ee++){const ye=n.get(x[ee]);ye.__webglTexture&&(i.deleteTexture(ye.__webglTexture),a.memory.textures--),n.remove(x[ee])}n.remove(x),n.remove(b)}let V=0;function J(){V=0}function L(){const b=V;return b>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+r.maxTextures),V+=1,b}function U(b){const x=[];return x.push(b.wrapS),x.push(b.wrapT),x.push(b.wrapR||0),x.push(b.magFilter),x.push(b.minFilter),x.push(b.anisotropy),x.push(b.internalFormat),x.push(b.format),x.push(b.type),x.push(b.generateMipmaps),x.push(b.premultiplyAlpha),x.push(b.flipY),x.push(b.unpackAlignment),x.push(b.colorSpace),x.join()}function z(b,x){const F=n.get(b);if(b.isVideoTexture&&ut(b),b.isRenderTargetTexture===!1&&b.version>0&&F.__version!==b.version){const te=b.image;if(te===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(te.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ae(F,b,x);return}}t.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+x)}function Z(b,x){const F=n.get(b);if(b.version>0&&F.__version!==b.version){ae(F,b,x);return}t.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+x)}function q(b,x){const F=n.get(b);if(b.version>0&&F.__version!==b.version){ae(F,b,x);return}t.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+x)}function Y(b,x){const F=n.get(b);if(b.version>0&&F.__version!==b.version){_e(F,b,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+x)}const $={[mo]:i.REPEAT,[Vn]:i.CLAMP_TO_EDGE,[dc]:i.MIRRORED_REPEAT},re={[gn]:i.NEAREST,[hu]:i.NEAREST_MIPMAP_NEAREST,[pl]:i.NEAREST_MIPMAP_LINEAR,[Jn]:i.LINEAR,[Ip]:i.LINEAR_MIPMAP_NEAREST,[go]:i.LINEAR_MIPMAP_LINEAR},ie={[jp]:i.NEVER,[Jp]:i.ALWAYS,[qp]:i.LESS,[Th]:i.LEQUAL,[$p]:i.EQUAL,[Kp]:i.GEQUAL,[Yp]:i.GREATER,[Zp]:i.NOTEQUAL};function W(b,x,F){if(F?(i.texParameteri(b,i.TEXTURE_WRAP_S,$[x.wrapS]),i.texParameteri(b,i.TEXTURE_WRAP_T,$[x.wrapT]),(b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY)&&i.texParameteri(b,i.TEXTURE_WRAP_R,$[x.wrapR]),i.texParameteri(b,i.TEXTURE_MAG_FILTER,re[x.magFilter]),i.texParameteri(b,i.TEXTURE_MIN_FILTER,re[x.minFilter])):(i.texParameteri(b,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(b,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY)&&i.texParameteri(b,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(x.wrapS!==Vn||x.wrapT!==Vn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(b,i.TEXTURE_MAG_FILTER,A(x.magFilter)),i.texParameteri(b,i.TEXTURE_MIN_FILTER,A(x.minFilter)),x.minFilter!==gn&&x.minFilter!==Jn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),x.compareFunction&&(i.texParameteri(b,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(b,i.TEXTURE_COMPARE_FUNC,ie[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const te=e.get("EXT_texture_filter_anisotropic");if(x.magFilter===gn||x.minFilter!==pl&&x.minFilter!==go||x.type===Oi&&e.has("OES_texture_float_linear")===!1||o===!1&&x.type===_o&&e.has("OES_texture_half_float_linear")===!1)return;(x.anisotropy>1||n.get(x).__currentAnisotropy)&&(i.texParameterf(b,te.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy)}}function K(b,x){let F=!1;b.__webglInit===void 0&&(b.__webglInit=!0,x.addEventListener("dispose",R));const te=x.source;let ee=h.get(te);ee===void 0&&(ee={},h.set(te,ee));const ne=U(x);if(ne!==b.__cacheKey){ee[ne]===void 0&&(ee[ne]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,F=!0),ee[ne].usedTimes++;const ye=ee[b.__cacheKey];ye!==void 0&&(ee[b.__cacheKey].usedTimes--,ye.usedTimes===0&&T(x)),b.__cacheKey=ne,b.__webglTexture=ee[ne].texture}return F}function ae(b,x,F){let te=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(te=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(te=i.TEXTURE_3D);const ee=K(b,x),ne=x.source;t.bindTexture(te,b.__webglTexture,i.TEXTURE0+F);const ye=n.get(ne);if(ne.version!==ye.__version||ee===!0){t.activeTexture(i.TEXTURE0+F);const de=bt.getPrimaries(bt.workingColorSpace),pe=x.colorSpace===ei?null:bt.getPrimaries(x.colorSpace),Le=x.colorSpace===ei||de===pe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Le);const Ze=m(x)&&p(x.image)===!1;let Q=_(x.image,Ze,!1,r.maxTextureSize);Q=Fe(x,Q);const Et=p(Q)||o,it=s.convert(x.format,x.colorSpace);let ke=s.convert(x.type),be=M(x.internalFormat,it,ke,x.colorSpace,x.isVideoTexture);W(te,x,Et);let me;const Xe=x.mipmaps,Mt=o&&x.isVideoTexture!==!0&&be!==wh,zt=ye.__version===void 0||ee===!0,tt=P(x,Q,Et);if(x.isDepthTexture)be=i.DEPTH_COMPONENT,o?x.type===Oi?be=i.DEPTH_COMPONENT32F:x.type===nr?be=i.DEPTH_COMPONENT24:x.type===Nr?be=i.DEPTH24_STENCIL8:be=i.DEPTH_COMPONENT16:x.type===Oi&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),x.format===Or&&be===i.DEPTH_COMPONENT&&x.type!==Rc&&x.type!==nr&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),x.type=nr,ke=s.convert(x.type)),x.format===Os&&be===i.DEPTH_COMPONENT&&(be=i.DEPTH_STENCIL,x.type!==Nr&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),x.type=Nr,ke=s.convert(x.type))),zt&&(Mt?t.texStorage2D(i.TEXTURE_2D,1,be,Q.width,Q.height):t.texImage2D(i.TEXTURE_2D,0,be,Q.width,Q.height,0,it,ke,null));else if(x.isDataTexture)if(Xe.length>0&&Et){Mt&&zt&&t.texStorage2D(i.TEXTURE_2D,tt,be,Xe[0].width,Xe[0].height);for(let se=0,C=Xe.length;se<C;se++)me=Xe[se],Mt?t.texSubImage2D(i.TEXTURE_2D,se,0,0,me.width,me.height,it,ke,me.data):t.texImage2D(i.TEXTURE_2D,se,be,me.width,me.height,0,it,ke,me.data);x.generateMipmaps=!1}else Mt?(zt&&t.texStorage2D(i.TEXTURE_2D,tt,be,Q.width,Q.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,Q.width,Q.height,it,ke,Q.data)):t.texImage2D(i.TEXTURE_2D,0,be,Q.width,Q.height,0,it,ke,Q.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Mt&&zt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,tt,be,Xe[0].width,Xe[0].height,Q.depth);for(let se=0,C=Xe.length;se<C;se++)me=Xe[se],x.format!==Qn?it!==null?Mt?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,me.width,me.height,Q.depth,it,me.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,se,be,me.width,me.height,Q.depth,0,me.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Mt?t.texSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,me.width,me.height,Q.depth,it,ke,me.data):t.texImage3D(i.TEXTURE_2D_ARRAY,se,be,me.width,me.height,Q.depth,0,it,ke,me.data)}else{Mt&&zt&&t.texStorage2D(i.TEXTURE_2D,tt,be,Xe[0].width,Xe[0].height);for(let se=0,C=Xe.length;se<C;se++)me=Xe[se],x.format!==Qn?it!==null?Mt?t.compressedTexSubImage2D(i.TEXTURE_2D,se,0,0,me.width,me.height,it,me.data):t.compressedTexImage2D(i.TEXTURE_2D,se,be,me.width,me.height,0,me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Mt?t.texSubImage2D(i.TEXTURE_2D,se,0,0,me.width,me.height,it,ke,me.data):t.texImage2D(i.TEXTURE_2D,se,be,me.width,me.height,0,it,ke,me.data)}else if(x.isDataArrayTexture)Mt?(zt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,tt,be,Q.width,Q.height,Q.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,it,ke,Q.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,be,Q.width,Q.height,Q.depth,0,it,ke,Q.data);else if(x.isData3DTexture)Mt?(zt&&t.texStorage3D(i.TEXTURE_3D,tt,be,Q.width,Q.height,Q.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,it,ke,Q.data)):t.texImage3D(i.TEXTURE_3D,0,be,Q.width,Q.height,Q.depth,0,it,ke,Q.data);else if(x.isFramebufferTexture){if(zt)if(Mt)t.texStorage2D(i.TEXTURE_2D,tt,be,Q.width,Q.height);else{let se=Q.width,C=Q.height;for(let le=0;le<tt;le++)t.texImage2D(i.TEXTURE_2D,le,be,se,C,0,it,ke,null),se>>=1,C>>=1}}else if(Xe.length>0&&Et){Mt&&zt&&t.texStorage2D(i.TEXTURE_2D,tt,be,Xe[0].width,Xe[0].height);for(let se=0,C=Xe.length;se<C;se++)me=Xe[se],Mt?t.texSubImage2D(i.TEXTURE_2D,se,0,0,it,ke,me):t.texImage2D(i.TEXTURE_2D,se,be,it,ke,me);x.generateMipmaps=!1}else Mt?(zt&&t.texStorage2D(i.TEXTURE_2D,tt,be,Q.width,Q.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,it,ke,Q)):t.texImage2D(i.TEXTURE_2D,0,be,it,ke,Q);v(x,Et)&&y(te),ye.__version=ne.version,x.onUpdate&&x.onUpdate(x)}b.__version=x.version}function _e(b,x,F){if(x.image.length!==6)return;const te=K(b,x),ee=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,b.__webglTexture,i.TEXTURE0+F);const ne=n.get(ee);if(ee.version!==ne.__version||te===!0){t.activeTexture(i.TEXTURE0+F);const ye=bt.getPrimaries(bt.workingColorSpace),de=x.colorSpace===ei?null:bt.getPrimaries(x.colorSpace),pe=x.colorSpace===ei||ye===de?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,pe);const Le=x.isCompressedTexture||x.image[0].isCompressedTexture,Ze=x.image[0]&&x.image[0].isDataTexture,Q=[];for(let se=0;se<6;se++)!Le&&!Ze?Q[se]=_(x.image[se],!1,!0,r.maxCubemapSize):Q[se]=Ze?x.image[se].image:x.image[se],Q[se]=Fe(x,Q[se]);const Et=Q[0],it=p(Et)||o,ke=s.convert(x.format,x.colorSpace),be=s.convert(x.type),me=M(x.internalFormat,ke,be,x.colorSpace),Xe=o&&x.isVideoTexture!==!0,Mt=ne.__version===void 0||te===!0;let zt=P(x,Et,it);W(i.TEXTURE_CUBE_MAP,x,it);let tt;if(Le){Xe&&Mt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,zt,me,Et.width,Et.height);for(let se=0;se<6;se++){tt=Q[se].mipmaps;for(let C=0;C<tt.length;C++){const le=tt[C];x.format!==Qn?ke!==null?Xe?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,C,0,0,le.width,le.height,ke,le.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,C,me,le.width,le.height,0,le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Xe?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,C,0,0,le.width,le.height,ke,be,le.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,C,me,le.width,le.height,0,ke,be,le.data)}}}else{tt=x.mipmaps,Xe&&Mt&&(tt.length>0&&zt++,t.texStorage2D(i.TEXTURE_CUBE_MAP,zt,me,Q[0].width,Q[0].height));for(let se=0;se<6;se++)if(Ze){Xe?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,Q[se].width,Q[se].height,ke,be,Q[se].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,me,Q[se].width,Q[se].height,0,ke,be,Q[se].data);for(let C=0;C<tt.length;C++){const ce=tt[C].image[se].image;Xe?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,C+1,0,0,ce.width,ce.height,ke,be,ce.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,C+1,me,ce.width,ce.height,0,ke,be,ce.data)}}else{Xe?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,ke,be,Q[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,me,ke,be,Q[se]);for(let C=0;C<tt.length;C++){const le=tt[C];Xe?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,C+1,0,0,ke,be,le.image[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,C+1,me,ke,be,le.image[se])}}}v(x,it)&&y(i.TEXTURE_CUBE_MAP),ne.__version=ee.version,x.onUpdate&&x.onUpdate(x)}b.__version=x.version}function ge(b,x,F,te,ee,ne){const ye=s.convert(F.format,F.colorSpace),de=s.convert(F.type),pe=M(F.internalFormat,ye,de,F.colorSpace);if(!n.get(x).__hasExternalTextures){const Ze=Math.max(1,x.width>>ne),Q=Math.max(1,x.height>>ne);ee===i.TEXTURE_3D||ee===i.TEXTURE_2D_ARRAY?t.texImage3D(ee,ne,pe,Ze,Q,x.depth,0,ye,de,null):t.texImage2D(ee,ne,pe,Ze,Q,0,ye,de,null)}t.bindFramebuffer(i.FRAMEBUFFER,b),ue(x)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,te,ee,n.get(F).__webglTexture,0,Oe(x)):(ee===i.TEXTURE_2D||ee>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,te,ee,n.get(F).__webglTexture,ne),t.bindFramebuffer(i.FRAMEBUFFER,null)}function De(b,x,F){if(i.bindRenderbuffer(i.RENDERBUFFER,b),x.depthBuffer&&!x.stencilBuffer){let te=o===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(F||ue(x)){const ee=x.depthTexture;ee&&ee.isDepthTexture&&(ee.type===Oi?te=i.DEPTH_COMPONENT32F:ee.type===nr&&(te=i.DEPTH_COMPONENT24));const ne=Oe(x);ue(x)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ne,te,x.width,x.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,ne,te,x.width,x.height)}else i.renderbufferStorage(i.RENDERBUFFER,te,x.width,x.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,b)}else if(x.depthBuffer&&x.stencilBuffer){const te=Oe(x);F&&ue(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,te,i.DEPTH24_STENCIL8,x.width,x.height):ue(x)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,te,i.DEPTH24_STENCIL8,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,b)}else{const te=x.isWebGLMultipleRenderTargets===!0?x.texture:[x.texture];for(let ee=0;ee<te.length;ee++){const ne=te[ee],ye=s.convert(ne.format,ne.colorSpace),de=s.convert(ne.type),pe=M(ne.internalFormat,ye,de,ne.colorSpace),Le=Oe(x);F&&ue(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Le,pe,x.width,x.height):ue(x)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Le,pe,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,pe,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ge(b,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,b),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(x.depthTexture).__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),z(x.depthTexture,0);const te=n.get(x.depthTexture).__webglTexture,ee=Oe(x);if(x.depthTexture.format===Or)ue(x)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,te,0,ee):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,te,0);else if(x.depthTexture.format===Os)ue(x)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,te,0,ee):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,te,0);else throw new Error("Unknown depthTexture format")}function we(b){const x=n.get(b),F=b.isWebGLCubeRenderTarget===!0;if(b.depthTexture&&!x.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");Ge(x.__webglFramebuffer,b)}else if(F){x.__webglDepthbuffer=[];for(let te=0;te<6;te++)t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[te]),x.__webglDepthbuffer[te]=i.createRenderbuffer(),De(x.__webglDepthbuffer[te],b,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer=i.createRenderbuffer(),De(x.__webglDepthbuffer,b,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function ct(b,x,F){const te=n.get(b);x!==void 0&&ge(te.__webglFramebuffer,b,b.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&we(b)}function O(b){const x=b.texture,F=n.get(b),te=n.get(x);b.addEventListener("dispose",I),b.isWebGLMultipleRenderTargets!==!0&&(te.__webglTexture===void 0&&(te.__webglTexture=i.createTexture()),te.__version=x.version,a.memory.textures++);const ee=b.isWebGLCubeRenderTarget===!0,ne=b.isWebGLMultipleRenderTargets===!0,ye=p(b)||o;if(ee){F.__webglFramebuffer=[];for(let de=0;de<6;de++)if(o&&x.mipmaps&&x.mipmaps.length>0){F.__webglFramebuffer[de]=[];for(let pe=0;pe<x.mipmaps.length;pe++)F.__webglFramebuffer[de][pe]=i.createFramebuffer()}else F.__webglFramebuffer[de]=i.createFramebuffer()}else{if(o&&x.mipmaps&&x.mipmaps.length>0){F.__webglFramebuffer=[];for(let de=0;de<x.mipmaps.length;de++)F.__webglFramebuffer[de]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(ne)if(r.drawBuffers){const de=b.texture;for(let pe=0,Le=de.length;pe<Le;pe++){const Ze=n.get(de[pe]);Ze.__webglTexture===void 0&&(Ze.__webglTexture=i.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&b.samples>0&&ue(b)===!1){const de=ne?x:[x];F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let pe=0;pe<de.length;pe++){const Le=de[pe];F.__webglColorRenderbuffer[pe]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[pe]);const Ze=s.convert(Le.format,Le.colorSpace),Q=s.convert(Le.type),Et=M(Le.internalFormat,Ze,Q,Le.colorSpace,b.isXRRenderTarget===!0),it=Oe(b);i.renderbufferStorageMultisample(i.RENDERBUFFER,it,Et,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.RENDERBUFFER,F.__webglColorRenderbuffer[pe])}i.bindRenderbuffer(i.RENDERBUFFER,null),b.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),De(F.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ee){t.bindTexture(i.TEXTURE_CUBE_MAP,te.__webglTexture),W(i.TEXTURE_CUBE_MAP,x,ye);for(let de=0;de<6;de++)if(o&&x.mipmaps&&x.mipmaps.length>0)for(let pe=0;pe<x.mipmaps.length;pe++)ge(F.__webglFramebuffer[de][pe],b,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+de,pe);else ge(F.__webglFramebuffer[de],b,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0);v(x,ye)&&y(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ne){const de=b.texture;for(let pe=0,Le=de.length;pe<Le;pe++){const Ze=de[pe],Q=n.get(Ze);t.bindTexture(i.TEXTURE_2D,Q.__webglTexture),W(i.TEXTURE_2D,Ze,ye),ge(F.__webglFramebuffer,b,Ze,i.COLOR_ATTACHMENT0+pe,i.TEXTURE_2D,0),v(Ze,ye)&&y(i.TEXTURE_2D)}t.unbindTexture()}else{let de=i.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(o?de=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(de,te.__webglTexture),W(de,x,ye),o&&x.mipmaps&&x.mipmaps.length>0)for(let pe=0;pe<x.mipmaps.length;pe++)ge(F.__webglFramebuffer[pe],b,x,i.COLOR_ATTACHMENT0,de,pe);else ge(F.__webglFramebuffer,b,x,i.COLOR_ATTACHMENT0,de,0);v(x,ye)&&y(de),t.unbindTexture()}b.depthBuffer&&we(b)}function nn(b){const x=p(b)||o,F=b.isWebGLMultipleRenderTargets===!0?b.texture:[b.texture];for(let te=0,ee=F.length;te<ee;te++){const ne=F[te];if(v(ne,x)){const ye=b.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,de=n.get(ne).__webglTexture;t.bindTexture(ye,de),y(ye),t.unbindTexture()}}}function Se(b){if(o&&b.samples>0&&ue(b)===!1){const x=b.isWebGLMultipleRenderTargets?b.texture:[b.texture],F=b.width,te=b.height;let ee=i.COLOR_BUFFER_BIT;const ne=[],ye=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,de=n.get(b),pe=b.isWebGLMultipleRenderTargets===!0;if(pe)for(let Le=0;Le<x.length;Le++)t.bindFramebuffer(i.FRAMEBUFFER,de.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Le,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,de.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Le,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,de.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,de.__webglFramebuffer);for(let Le=0;Le<x.length;Le++){ne.push(i.COLOR_ATTACHMENT0+Le),b.depthBuffer&&ne.push(ye);const Ze=de.__ignoreDepthValues!==void 0?de.__ignoreDepthValues:!1;if(Ze===!1&&(b.depthBuffer&&(ee|=i.DEPTH_BUFFER_BIT),b.stencilBuffer&&(ee|=i.STENCIL_BUFFER_BIT)),pe&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,de.__webglColorRenderbuffer[Le]),Ze===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[ye]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[ye])),pe){const Q=n.get(x[Le]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Q,0)}i.blitFramebuffer(0,0,F,te,0,0,F,te,ee,i.NEAREST),c&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ne)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),pe)for(let Le=0;Le<x.length;Le++){t.bindFramebuffer(i.FRAMEBUFFER,de.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Le,i.RENDERBUFFER,de.__webglColorRenderbuffer[Le]);const Ze=n.get(x[Le]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,de.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Le,i.TEXTURE_2D,Ze,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,de.__webglMultisampledFramebuffer)}}function Oe(b){return Math.min(r.maxSamples,b.samples)}function ue(b){const x=n.get(b);return o&&b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function ut(b){const x=a.render.frame;u.get(b)!==x&&(u.set(b,x),b.update())}function Fe(b,x){const F=b.colorSpace,te=b.format,ee=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||b.format===hc||F!==Hi&&F!==ei&&(bt.getTransfer(F)===Lt?o===!1?e.has("EXT_sRGB")===!0&&te===Qn?(b.format=hc,b.minFilter=Jn,b.generateMipmaps=!1):x=Rh.sRGBToLinear(x):(te!==Qn||ee!==cr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),x}this.allocateTextureUnit=L,this.resetTextureUnits=J,this.setTexture2D=z,this.setTexture2DArray=Z,this.setTexture3D=q,this.setTextureCube=Y,this.rebindTextures=ct,this.setupRenderTarget=O,this.updateRenderTargetMipmap=nn,this.updateMultisampleRenderTarget=Se,this.setupDepthRenderbuffer=we,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=ue}function hv(i,e,t){const n=t.isWebGL2;function r(s,a=ei){let o;const l=bt.getTransfer(a);if(s===cr)return i.UNSIGNED_BYTE;if(s===vh)return i.UNSIGNED_SHORT_4_4_4_4;if(s===xh)return i.UNSIGNED_SHORT_5_5_5_1;if(s===Up)return i.BYTE;if(s===Fp)return i.SHORT;if(s===Rc)return i.UNSIGNED_SHORT;if(s===yh)return i.INT;if(s===nr)return i.UNSIGNED_INT;if(s===Oi)return i.FLOAT;if(s===_o)return n?i.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===Np)return i.ALPHA;if(s===Qn)return i.RGBA;if(s===Op)return i.LUMINANCE;if(s===Bp)return i.LUMINANCE_ALPHA;if(s===Or)return i.DEPTH_COMPONENT;if(s===Os)return i.DEPTH_STENCIL;if(s===hc)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(s===zp)return i.RED;if(s===Mh)return i.RED_INTEGER;if(s===kp)return i.RG;if(s===Sh)return i.RG_INTEGER;if(s===Eh)return i.RGBA_INTEGER;if(s===ml||s===gl||s===_l||s===yl)if(l===Lt)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===ml)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===gl)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===_l)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===yl)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===ml)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===gl)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===_l)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===yl)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===fu||s===pu||s===mu||s===gu)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===fu)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===pu)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===mu)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===gu)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===wh)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===_u||s===yu)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(s===_u)return l===Lt?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===yu)return l===Lt?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===vu||s===xu||s===Mu||s===Su||s===Eu||s===wu||s===bu||s===Tu||s===Au||s===Ru||s===Pu||s===Cu||s===Lu||s===Du)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(s===vu)return l===Lt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===xu)return l===Lt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Mu)return l===Lt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Su)return l===Lt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Eu)return l===Lt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===wu)return l===Lt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===bu)return l===Lt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Tu)return l===Lt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Au)return l===Lt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Ru)return l===Lt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Pu)return l===Lt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Cu)return l===Lt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Lu)return l===Lt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Du)return l===Lt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===vl||s===Iu||s===Uu)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(s===vl)return l===Lt?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Iu)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Uu)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Gp||s===Fu||s===Nu||s===Ou)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(s===vl)return o.COMPRESSED_RED_RGTC1_EXT;if(s===Fu)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Nu)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Ou)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Nr?n?i.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):i[s]!==void 0?i[s]:null}return{convert:r}}class fv extends In{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class tn extends pt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const pv={type:"move"};class Vl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new tn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new tn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new E,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new E),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new tn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new E,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new E),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const p=t.getJointPose(_,n),m=this._getHandJoint(c,_);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&h>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(pv)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new tn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class mv extends $r{constructor(e,t){super();const n=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,h=null,f=null,g=null;const _=t.getContextAttributes();let p=null,m=null;const v=[],y=[],M=new ot;let P=null;const A=new In;A.layers.enable(1),A.viewport=new yt;const R=new In;R.layers.enable(2),R.viewport=new yt;const I=[A,R],S=new fv;S.layers.enable(1),S.layers.enable(2);let T=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let K=v[W];return K===void 0&&(K=new Vl,v[W]=K),K.getTargetRaySpace()},this.getControllerGrip=function(W){let K=v[W];return K===void 0&&(K=new Vl,v[W]=K),K.getGripSpace()},this.getHand=function(W){let K=v[W];return K===void 0&&(K=new Vl,v[W]=K),K.getHandSpace()};function V(W){const K=y.indexOf(W.inputSource);if(K===-1)return;const ae=v[K];ae!==void 0&&(ae.update(W.inputSource,W.frame,c||a),ae.dispatchEvent({type:W.type,data:W.inputSource}))}function J(){r.removeEventListener("select",V),r.removeEventListener("selectstart",V),r.removeEventListener("selectend",V),r.removeEventListener("squeeze",V),r.removeEventListener("squeezestart",V),r.removeEventListener("squeezeend",V),r.removeEventListener("end",J),r.removeEventListener("inputsourceschange",L);for(let W=0;W<v.length;W++){const K=y[W];K!==null&&(y[W]=null,v[W].disconnect(K))}T=null,G=null,e.setRenderTarget(p),f=null,h=null,d=null,r=null,m=null,ie.stop(),n.isPresenting=!1,e.setPixelRatio(P),e.setSize(M.width,M.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){s=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){o=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(W){if(r=W,r!==null){if(p=e.getRenderTarget(),r.addEventListener("select",V),r.addEventListener("selectstart",V),r.addEventListener("selectend",V),r.addEventListener("squeeze",V),r.addEventListener("squeezestart",V),r.addEventListener("squeezeend",V),r.addEventListener("end",J),r.addEventListener("inputsourceschange",L),_.xrCompatible!==!0&&await t.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(M),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const K={antialias:r.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,K),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),m=new kr(f.framebufferWidth,f.framebufferHeight,{format:Qn,type:cr,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let K=null,ae=null,_e=null;_.depth&&(_e=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,K=_.stencil?Os:Or,ae=_.stencil?Nr:nr);const ge={colorFormat:t.RGBA8,depthFormat:_e,scaleFactor:s};d=new XRWebGLBinding(r,t),h=d.createProjectionLayer(ge),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),m=new kr(h.textureWidth,h.textureHeight,{format:Qn,type:cr,depthTexture:new Oh(h.textureWidth,h.textureHeight,ae,void 0,void 0,void 0,void 0,void 0,void 0,K),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const De=e.properties.get(m);De.__ignoreDepthValues=h.ignoreDepthValues}m.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),ie.setContext(r),ie.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function L(W){for(let K=0;K<W.removed.length;K++){const ae=W.removed[K],_e=y.indexOf(ae);_e>=0&&(y[_e]=null,v[_e].disconnect(ae))}for(let K=0;K<W.added.length;K++){const ae=W.added[K];let _e=y.indexOf(ae);if(_e===-1){for(let De=0;De<v.length;De++)if(De>=y.length){y.push(ae),_e=De;break}else if(y[De]===null){y[De]=ae,_e=De;break}if(_e===-1)break}const ge=v[_e];ge&&ge.connect(ae)}}const U=new E,z=new E;function Z(W,K,ae){U.setFromMatrixPosition(K.matrixWorld),z.setFromMatrixPosition(ae.matrixWorld);const _e=U.distanceTo(z),ge=K.projectionMatrix.elements,De=ae.projectionMatrix.elements,Ge=ge[14]/(ge[10]-1),we=ge[14]/(ge[10]+1),ct=(ge[9]+1)/ge[5],O=(ge[9]-1)/ge[5],nn=(ge[8]-1)/ge[0],Se=(De[8]+1)/De[0],Oe=Ge*nn,ue=Ge*Se,ut=_e/(-nn+Se),Fe=ut*-nn;K.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(Fe),W.translateZ(ut),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert();const b=Ge+ut,x=we+ut,F=Oe-Fe,te=ue+(_e-Fe),ee=ct*we/x*b,ne=O*we/x*b;W.projectionMatrix.makePerspective(F,te,ee,ne,b,x),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}function q(W,K){K===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(K.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(r===null)return;S.near=R.near=A.near=W.near,S.far=R.far=A.far=W.far,(T!==S.near||G!==S.far)&&(r.updateRenderState({depthNear:S.near,depthFar:S.far}),T=S.near,G=S.far);const K=W.parent,ae=S.cameras;q(S,K);for(let _e=0;_e<ae.length;_e++)q(ae[_e],K);ae.length===2?Z(S,A,R):S.projectionMatrix.copy(A.projectionMatrix),Y(W,S,K)};function Y(W,K,ae){ae===null?W.matrix.copy(K.matrixWorld):(W.matrix.copy(ae.matrixWorld),W.matrix.invert(),W.matrix.multiply(K.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(K.projectionMatrix),W.projectionMatrixInverse.copy(K.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=Bs*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(W){l=W,h!==null&&(h.fixedFoveation=W),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=W)};let $=null;function re(W,K){if(u=K.getViewerPose(c||a),g=K,u!==null){const ae=u.views;f!==null&&(e.setRenderTargetFramebuffer(m,f.framebuffer),e.setRenderTarget(m));let _e=!1;ae.length!==S.cameras.length&&(S.cameras.length=0,_e=!0);for(let ge=0;ge<ae.length;ge++){const De=ae[ge];let Ge=null;if(f!==null)Ge=f.getViewport(De);else{const ct=d.getViewSubImage(h,De);Ge=ct.viewport,ge===0&&(e.setRenderTargetTextures(m,ct.colorTexture,h.ignoreDepthValues?void 0:ct.depthStencilTexture),e.setRenderTarget(m))}let we=I[ge];we===void 0&&(we=new In,we.layers.enable(ge),we.viewport=new yt,I[ge]=we),we.matrix.fromArray(De.transform.matrix),we.matrix.decompose(we.position,we.quaternion,we.scale),we.projectionMatrix.fromArray(De.projectionMatrix),we.projectionMatrixInverse.copy(we.projectionMatrix).invert(),we.viewport.set(Ge.x,Ge.y,Ge.width,Ge.height),ge===0&&(S.matrix.copy(we.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),_e===!0&&S.cameras.push(we)}}for(let ae=0;ae<v.length;ae++){const _e=y[ae],ge=v[ae];_e!==null&&ge!==void 0&&ge.update(_e,K,c||a)}$&&$(W,K),K.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:K}),g=null}const ie=new Nh;ie.setAnimationLoop(re),this.setAnimationLoop=function(W){$=W},this.dispose=function(){}}}function gv(i,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,Ih(i)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function r(p,m,v,y,M){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(p,m):m.isMeshToonMaterial?(s(p,m),d(p,m)):m.isMeshPhongMaterial?(s(p,m),u(p,m)):m.isMeshStandardMaterial?(s(p,m),h(p,m),m.isMeshPhysicalMaterial&&f(p,m,M)):m.isMeshMatcapMaterial?(s(p,m),g(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),_(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?l(p,m,v,y):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Bn&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Bn&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const v=e.get(m).envMap;if(v&&(p.envMap.value=v,p.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap){p.lightMap.value=m.lightMap;const y=i._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=m.lightMapIntensity*y,t(m.lightMap,p.lightMapTransform)}m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,v,y){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*v,p.scale.value=y*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function d(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function h(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),e.get(m).envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,v){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Bn&&p.clearcoatNormalScale.value.negate())),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=v.texture,p.transmissionSamplerSize.value.set(v.width,v.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function _(p,m){const v=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(v.matrixWorld),p.nearDistance.value=v.shadow.camera.near,p.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function _v(i,e,t,n){let r={},s={},a=[];const o=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(v,y){const M=y.program;n.uniformBlockBinding(v,M)}function c(v,y){let M=r[v.id];M===void 0&&(g(v),M=u(v),r[v.id]=M,v.addEventListener("dispose",p));const P=y.program;n.updateUBOMapping(v,P);const A=e.render.frame;s[v.id]!==A&&(h(v),s[v.id]=A)}function u(v){const y=d();v.__bindingPointIndex=y;const M=i.createBuffer(),P=v.__size,A=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,P,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,M),M}function d(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(v){const y=r[v.id],M=v.uniforms,P=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let A=0,R=M.length;A<R;A++){const I=Array.isArray(M[A])?M[A]:[M[A]];for(let S=0,T=I.length;S<T;S++){const G=I[S];if(f(G,A,S,P)===!0){const V=G.__offset,J=Array.isArray(G.value)?G.value:[G.value];let L=0;for(let U=0;U<J.length;U++){const z=J[U],Z=_(z);typeof z=="number"||typeof z=="boolean"?(G.__data[0]=z,i.bufferSubData(i.UNIFORM_BUFFER,V+L,G.__data)):z.isMatrix3?(G.__data[0]=z.elements[0],G.__data[1]=z.elements[1],G.__data[2]=z.elements[2],G.__data[3]=0,G.__data[4]=z.elements[3],G.__data[5]=z.elements[4],G.__data[6]=z.elements[5],G.__data[7]=0,G.__data[8]=z.elements[6],G.__data[9]=z.elements[7],G.__data[10]=z.elements[8],G.__data[11]=0):(z.toArray(G.__data,L),L+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,V,G.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(v,y,M,P){const A=v.value,R=y+"_"+M;if(P[R]===void 0)return typeof A=="number"||typeof A=="boolean"?P[R]=A:P[R]=A.clone(),!0;{const I=P[R];if(typeof A=="number"||typeof A=="boolean"){if(I!==A)return P[R]=A,!0}else if(I.equals(A)===!1)return I.copy(A),!0}return!1}function g(v){const y=v.uniforms;let M=0;const P=16;for(let R=0,I=y.length;R<I;R++){const S=Array.isArray(y[R])?y[R]:[y[R]];for(let T=0,G=S.length;T<G;T++){const V=S[T],J=Array.isArray(V.value)?V.value:[V.value];for(let L=0,U=J.length;L<U;L++){const z=J[L],Z=_(z),q=M%P;q!==0&&P-q<Z.boundary&&(M+=P-q),V.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=M,M+=Z.storage}}}const A=M%P;return A>0&&(M+=P-A),v.__size=M,v.__cache={},this}function _(v){const y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),y}function p(v){const y=v.target;y.removeEventListener("dispose",p);const M=a.indexOf(y.__bindingPointIndex);a.splice(M,1),i.deleteBuffer(r[y.id]),delete r[y.id],delete s[y.id]}function m(){for(const v in r)i.deleteBuffer(r[v]);a=[],r={},s={}}return{bind:l,update:c,dispose:m}}class Vh{constructor(e={}){const{canvas:t=fm(),context:n=null,depth:r=!0,stencil:s=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let h;n!==null?h=n.getContextAttributes().alpha:h=a;const f=new Uint32Array(4),g=new Int32Array(4);let _=null,p=null;const m=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=jt,this._useLegacyLights=!1,this.toneMapping=lr,this.toneMappingExposure=1;const y=this;let M=!1,P=0,A=0,R=null,I=-1,S=null;const T=new yt,G=new yt;let V=null;const J=new Te(0);let L=0,U=t.width,z=t.height,Z=1,q=null,Y=null;const $=new yt(0,0,U,z),re=new yt(0,0,U,z);let ie=!1;const W=new Ic;let K=!1,ae=!1,_e=null;const ge=new Ee,De=new ot,Ge=new E,we={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function ct(){return R===null?Z:1}let O=n;function nn(w,D){for(let k=0;k<w.length;k++){const H=w[k],B=t.getContext(H,D);if(B!==null)return B}return null}try{const w={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ac}`),t.addEventListener("webglcontextlost",se,!1),t.addEventListener("webglcontextrestored",C,!1),t.addEventListener("webglcontextcreationerror",le,!1),O===null){const D=["webgl2","webgl","experimental-webgl"];if(y.isWebGL1Renderer===!0&&D.shift(),O=nn(D,w),O===null)throw nn(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&O instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),O.getShaderPrecisionFormat===void 0&&(O.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let Se,Oe,ue,ut,Fe,b,x,F,te,ee,ne,ye,de,pe,Le,Ze,Q,Et,it,ke,be,me,Xe,Mt;function zt(){Se=new A_(O),Oe=new M_(O,Se,e),Se.init(Oe),me=new hv(O,Se,Oe),ue=new uv(O,Se,Oe),ut=new C_(O),Fe=new Zy,b=new dv(O,Se,ue,Fe,Oe,me,ut),x=new E_(y),F=new T_(y),te=new Bm(O,Oe),Xe=new v_(O,Se,te,Oe),ee=new R_(O,te,ut,Xe),ne=new U_(O,ee,te,ut),it=new I_(O,Oe,b),Ze=new S_(Fe),ye=new Yy(y,x,F,Se,Oe,Xe,Ze),de=new gv(y,Fe),pe=new Jy,Le=new rv(Se,Oe),Et=new y_(y,x,F,ue,ne,h,l),Q=new cv(y,ne,Oe),Mt=new _v(O,ut,Oe,ue),ke=new x_(O,Se,ut,Oe),be=new P_(O,Se,ut,Oe),ut.programs=ye.programs,y.capabilities=Oe,y.extensions=Se,y.properties=Fe,y.renderLists=pe,y.shadowMap=Q,y.state=ue,y.info=ut}zt();const tt=new mv(y,O);this.xr=tt,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const w=Se.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=Se.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return Z},this.setPixelRatio=function(w){w!==void 0&&(Z=w,this.setSize(U,z,!1))},this.getSize=function(w){return w.set(U,z)},this.setSize=function(w,D,k=!0){if(tt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}U=w,z=D,t.width=Math.floor(w*Z),t.height=Math.floor(D*Z),k===!0&&(t.style.width=w+"px",t.style.height=D+"px"),this.setViewport(0,0,w,D)},this.getDrawingBufferSize=function(w){return w.set(U*Z,z*Z).floor()},this.setDrawingBufferSize=function(w,D,k){U=w,z=D,Z=k,t.width=Math.floor(w*k),t.height=Math.floor(D*k),this.setViewport(0,0,w,D)},this.getCurrentViewport=function(w){return w.copy(T)},this.getViewport=function(w){return w.copy($)},this.setViewport=function(w,D,k,H){w.isVector4?$.set(w.x,w.y,w.z,w.w):$.set(w,D,k,H),ue.viewport(T.copy($).multiplyScalar(Z).floor())},this.getScissor=function(w){return w.copy(re)},this.setScissor=function(w,D,k,H){w.isVector4?re.set(w.x,w.y,w.z,w.w):re.set(w,D,k,H),ue.scissor(G.copy(re).multiplyScalar(Z).floor())},this.getScissorTest=function(){return ie},this.setScissorTest=function(w){ue.setScissorTest(ie=w)},this.setOpaqueSort=function(w){q=w},this.setTransparentSort=function(w){Y=w},this.getClearColor=function(w){return w.copy(Et.getClearColor())},this.setClearColor=function(){Et.setClearColor.apply(Et,arguments)},this.getClearAlpha=function(){return Et.getClearAlpha()},this.setClearAlpha=function(){Et.setClearAlpha.apply(Et,arguments)},this.clear=function(w=!0,D=!0,k=!0){let H=0;if(w){let B=!1;if(R!==null){const he=R.texture.format;B=he===Eh||he===Sh||he===Mh}if(B){const he=R.texture.type,ve=he===cr||he===nr||he===Rc||he===Nr||he===vh||he===xh,Ce=Et.getClearColor(),Ne=Et.getClearAlpha(),Ke=Ce.r,He=Ce.g,Ve=Ce.b;ve?(f[0]=Ke,f[1]=He,f[2]=Ve,f[3]=Ne,O.clearBufferuiv(O.COLOR,0,f)):(g[0]=Ke,g[1]=He,g[2]=Ve,g[3]=Ne,O.clearBufferiv(O.COLOR,0,g))}else H|=O.COLOR_BUFFER_BIT}D&&(H|=O.DEPTH_BUFFER_BIT),k&&(H|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",se,!1),t.removeEventListener("webglcontextrestored",C,!1),t.removeEventListener("webglcontextcreationerror",le,!1),pe.dispose(),Le.dispose(),Fe.dispose(),x.dispose(),F.dispose(),ne.dispose(),Xe.dispose(),Mt.dispose(),ye.dispose(),tt.dispose(),tt.removeEventListener("sessionstart",Rn),tt.removeEventListener("sessionend",Pt),_e&&(_e.dispose(),_e=null),Pn.stop()};function se(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function C(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const w=ut.autoReset,D=Q.enabled,k=Q.autoUpdate,H=Q.needsUpdate,B=Q.type;zt(),ut.autoReset=w,Q.enabled=D,Q.autoUpdate=k,Q.needsUpdate=H,Q.type=B}function le(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function ce(w){const D=w.target;D.removeEventListener("dispose",ce),Ie(D)}function Ie(w){Pe(w),Fe.remove(w)}function Pe(w){const D=Fe.get(w).programs;D!==void 0&&(D.forEach(function(k){ye.releaseProgram(k)}),w.isShaderMaterial&&ye.releaseShaderCache(w))}this.renderBufferDirect=function(w,D,k,H,B,he){D===null&&(D=we);const ve=B.isMesh&&B.matrixWorld.determinant()<0,Ce=Yf(w,D,k,H,B);ue.setMaterial(H,ve);let Ne=k.index,Ke=1;if(H.wireframe===!0){if(Ne=ee.getWireframeAttribute(k),Ne===void 0)return;Ke=2}const He=k.drawRange,Ve=k.attributes.position;let Vt=He.start*Ke,zn=(He.start+He.count)*Ke;he!==null&&(Vt=Math.max(Vt,he.start*Ke),zn=Math.min(zn,(he.start+he.count)*Ke)),Ne!==null?(Vt=Math.max(Vt,0),zn=Math.min(zn,Ne.count)):Ve!=null&&(Vt=Math.max(Vt,0),zn=Math.min(zn,Ve.count));const un=zn-Vt;if(un<0||un===1/0)return;Xe.setup(B,H,Ce,k,Ne);let Ri,Ft=ke;if(Ne!==null&&(Ri=te.get(Ne),Ft=be,Ft.setIndex(Ri)),B.isMesh)H.wireframe===!0?(ue.setLineWidth(H.wireframeLinewidth*ct()),Ft.setMode(O.LINES)):Ft.setMode(O.TRIANGLES);else if(B.isLine){let nt=H.linewidth;nt===void 0&&(nt=1),ue.setLineWidth(nt*ct()),B.isLineSegments?Ft.setMode(O.LINES):B.isLineLoop?Ft.setMode(O.LINE_LOOP):Ft.setMode(O.LINE_STRIP)}else B.isPoints?Ft.setMode(O.POINTS):B.isSprite&&Ft.setMode(O.TRIANGLES);if(B.isBatchedMesh)Ft.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else if(B.isInstancedMesh)Ft.renderInstances(Vt,un,B.count);else if(k.isInstancedBufferGeometry){const nt=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,ul=Math.min(k.instanceCount,nt);Ft.renderInstances(Vt,un,ul)}else Ft.render(Vt,un)};function At(w,D,k){w.transparent===!0&&w.side===vi&&w.forceSinglePass===!1?(w.side=Bn,w.needsUpdate=!0,Wo(w,D,k),w.side=yr,w.needsUpdate=!0,Wo(w,D,k),w.side=vi):Wo(w,D,k)}this.compile=function(w,D,k=null){k===null&&(k=w),p=Le.get(k),p.init(),v.push(p),k.traverseVisible(function(B){B.isLight&&B.layers.test(D.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),w!==k&&w.traverseVisible(function(B){B.isLight&&B.layers.test(D.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),p.setupLights(y._useLegacyLights);const H=new Set;return w.traverse(function(B){const he=B.material;if(he)if(Array.isArray(he))for(let ve=0;ve<he.length;ve++){const Ce=he[ve];At(Ce,k,B),H.add(Ce)}else At(he,k,B),H.add(he)}),v.pop(),p=null,H},this.compileAsync=function(w,D,k=null){const H=this.compile(w,D,k);return new Promise(B=>{function he(){if(H.forEach(function(ve){Fe.get(ve).currentProgram.isReady()&&H.delete(ve)}),H.size===0){B(w);return}setTimeout(he,10)}Se.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let Rt=null;function cn(w){Rt&&Rt(w)}function Rn(){Pn.stop()}function Pt(){Pn.start()}const Pn=new Nh;Pn.setAnimationLoop(cn),typeof self<"u"&&Pn.setContext(self),this.setAnimationLoop=function(w){Rt=w,tt.setAnimationLoop(w),w===null?Pn.stop():Pn.start()},tt.addEventListener("sessionstart",Rn),tt.addEventListener("sessionend",Pt),this.render=function(w,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),tt.enabled===!0&&tt.isPresenting===!0&&(tt.cameraAutoUpdate===!0&&tt.updateCamera(D),D=tt.getCamera()),w.isScene===!0&&w.onBeforeRender(y,w,D,R),p=Le.get(w,v.length),p.init(),v.push(p),ge.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),W.setFromProjectionMatrix(ge),ae=this.localClippingEnabled,K=Ze.init(this.clippingPlanes,ae),_=pe.get(w,m.length),_.init(),m.push(_),gi(w,D,0,y.sortObjects),_.finish(),y.sortObjects===!0&&_.sort(q,Y),this.info.render.frame++,K===!0&&Ze.beginShadows();const k=p.state.shadowsArray;if(Q.render(k,w,D),K===!0&&Ze.endShadows(),this.info.autoReset===!0&&this.info.reset(),Et.render(_,w),p.setupLights(y._useLegacyLights),D.isArrayCamera){const H=D.cameras;for(let B=0,he=H.length;B<he;B++){const ve=H[B];Qc(_,w,ve,ve.viewport)}}else Qc(_,w,D);R!==null&&(b.updateMultisampleRenderTarget(R),b.updateRenderTargetMipmap(R)),w.isScene===!0&&w.onAfterRender(y,w,D),Xe.resetDefaultState(),I=-1,S=null,v.pop(),v.length>0?p=v[v.length-1]:p=null,m.pop(),m.length>0?_=m[m.length-1]:_=null};function gi(w,D,k,H){if(w.visible===!1)return;if(w.layers.test(D.layers)){if(w.isGroup)k=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(D);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||W.intersectsSprite(w)){H&&Ge.setFromMatrixPosition(w.matrixWorld).applyMatrix4(ge);const ve=ne.update(w),Ce=w.material;Ce.visible&&_.push(w,ve,Ce,k,Ge.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||W.intersectsObject(w))){const ve=ne.update(w),Ce=w.material;if(H&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Ge.copy(w.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),Ge.copy(ve.boundingSphere.center)),Ge.applyMatrix4(w.matrixWorld).applyMatrix4(ge)),Array.isArray(Ce)){const Ne=ve.groups;for(let Ke=0,He=Ne.length;Ke<He;Ke++){const Ve=Ne[Ke],Vt=Ce[Ve.materialIndex];Vt&&Vt.visible&&_.push(w,ve,Vt,k,Ge.z,Ve)}}else Ce.visible&&_.push(w,ve,Ce,k,Ge.z,null)}}const he=w.children;for(let ve=0,Ce=he.length;ve<Ce;ve++)gi(he[ve],D,k,H)}function Qc(w,D,k,H){const B=w.opaque,he=w.transmissive,ve=w.transparent;p.setupLightsView(k),K===!0&&Ze.setGlobalState(y.clippingPlanes,k),he.length>0&&$f(B,he,D,k),H&&ue.viewport(T.copy(H)),B.length>0&&Vo(B,D,k),he.length>0&&Vo(he,D,k),ve.length>0&&Vo(ve,D,k),ue.buffers.depth.setTest(!0),ue.buffers.depth.setMask(!0),ue.buffers.color.setMask(!0),ue.setPolygonOffset(!1)}function $f(w,D,k,H){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;const he=Oe.isWebGL2;_e===null&&(_e=new kr(1,1,{generateMipmaps:!0,type:Se.has("EXT_color_buffer_half_float")?_o:cr,minFilter:go,samples:he?4:0})),y.getDrawingBufferSize(De),he?_e.setSize(De.x,De.y):_e.setSize(Da(De.x),Da(De.y));const ve=y.getRenderTarget();y.setRenderTarget(_e),y.getClearColor(J),L=y.getClearAlpha(),L<1&&y.setClearColor(16777215,.5),y.clear();const Ce=y.toneMapping;y.toneMapping=lr,Vo(w,k,H),b.updateMultisampleRenderTarget(_e),b.updateRenderTargetMipmap(_e);let Ne=!1;for(let Ke=0,He=D.length;Ke<He;Ke++){const Ve=D[Ke],Vt=Ve.object,zn=Ve.geometry,un=Ve.material,Ri=Ve.group;if(un.side===vi&&Vt.layers.test(H.layers)){const Ft=un.side;un.side=Bn,un.needsUpdate=!0,eu(Vt,k,H,zn,un,Ri),un.side=Ft,un.needsUpdate=!0,Ne=!0}}Ne===!0&&(b.updateMultisampleRenderTarget(_e),b.updateRenderTargetMipmap(_e)),y.setRenderTarget(ve),y.setClearColor(J,L),y.toneMapping=Ce}function Vo(w,D,k){const H=D.isScene===!0?D.overrideMaterial:null;for(let B=0,he=w.length;B<he;B++){const ve=w[B],Ce=ve.object,Ne=ve.geometry,Ke=H===null?ve.material:H,He=ve.group;Ce.layers.test(k.layers)&&eu(Ce,D,k,Ne,Ke,He)}}function eu(w,D,k,H,B,he){w.onBeforeRender(y,D,k,H,B,he),w.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),B.onBeforeRender(y,D,k,H,w,he),B.transparent===!0&&B.side===vi&&B.forceSinglePass===!1?(B.side=Bn,B.needsUpdate=!0,y.renderBufferDirect(k,D,H,B,w,he),B.side=yr,B.needsUpdate=!0,y.renderBufferDirect(k,D,H,B,w,he),B.side=vi):y.renderBufferDirect(k,D,H,B,w,he),w.onAfterRender(y,D,k,H,B,he)}function Wo(w,D,k){D.isScene!==!0&&(D=we);const H=Fe.get(w),B=p.state.lights,he=p.state.shadowsArray,ve=B.state.version,Ce=ye.getParameters(w,B.state,he,D,k),Ne=ye.getProgramCacheKey(Ce);let Ke=H.programs;H.environment=w.isMeshStandardMaterial?D.environment:null,H.fog=D.fog,H.envMap=(w.isMeshStandardMaterial?F:x).get(w.envMap||H.environment),Ke===void 0&&(w.addEventListener("dispose",ce),Ke=new Map,H.programs=Ke);let He=Ke.get(Ne);if(He!==void 0){if(H.currentProgram===He&&H.lightsStateVersion===ve)return nu(w,Ce),He}else Ce.uniforms=ye.getUniforms(w),w.onBuild(k,Ce,y),w.onBeforeCompile(Ce,y),He=ye.acquireProgram(Ce,Ne),Ke.set(Ne,He),H.uniforms=Ce.uniforms;const Ve=H.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Ve.clippingPlanes=Ze.uniform),nu(w,Ce),H.needsLights=Kf(w),H.lightsStateVersion=ve,H.needsLights&&(Ve.ambientLightColor.value=B.state.ambient,Ve.lightProbe.value=B.state.probe,Ve.directionalLights.value=B.state.directional,Ve.directionalLightShadows.value=B.state.directionalShadow,Ve.spotLights.value=B.state.spot,Ve.spotLightShadows.value=B.state.spotShadow,Ve.rectAreaLights.value=B.state.rectArea,Ve.ltc_1.value=B.state.rectAreaLTC1,Ve.ltc_2.value=B.state.rectAreaLTC2,Ve.pointLights.value=B.state.point,Ve.pointLightShadows.value=B.state.pointShadow,Ve.hemisphereLights.value=B.state.hemi,Ve.directionalShadowMap.value=B.state.directionalShadowMap,Ve.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Ve.spotShadowMap.value=B.state.spotShadowMap,Ve.spotLightMatrix.value=B.state.spotLightMatrix,Ve.spotLightMap.value=B.state.spotLightMap,Ve.pointShadowMap.value=B.state.pointShadowMap,Ve.pointShadowMatrix.value=B.state.pointShadowMatrix),H.currentProgram=He,H.uniformsList=null,He}function tu(w){if(w.uniformsList===null){const D=w.currentProgram.getUniforms();w.uniformsList=Ma.seqWithValue(D.seq,w.uniforms)}return w.uniformsList}function nu(w,D){const k=Fe.get(w);k.outputColorSpace=D.outputColorSpace,k.batching=D.batching,k.instancing=D.instancing,k.instancingColor=D.instancingColor,k.skinning=D.skinning,k.morphTargets=D.morphTargets,k.morphNormals=D.morphNormals,k.morphColors=D.morphColors,k.morphTargetsCount=D.morphTargetsCount,k.numClippingPlanes=D.numClippingPlanes,k.numIntersection=D.numClipIntersection,k.vertexAlphas=D.vertexAlphas,k.vertexTangents=D.vertexTangents,k.toneMapping=D.toneMapping}function Yf(w,D,k,H,B){D.isScene!==!0&&(D=we),b.resetTextureUnits();const he=D.fog,ve=H.isMeshStandardMaterial?D.environment:null,Ce=R===null?y.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Hi,Ne=(H.isMeshStandardMaterial?F:x).get(H.envMap||ve),Ke=H.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,He=!!k.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Ve=!!k.morphAttributes.position,Vt=!!k.morphAttributes.normal,zn=!!k.morphAttributes.color;let un=lr;H.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(un=y.toneMapping);const Ri=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,Ft=Ri!==void 0?Ri.length:0,nt=Fe.get(H),ul=p.state.lights;if(K===!0&&(ae===!0||w!==S)){const $n=w===S&&H.id===I;Ze.setState(H,w,$n)}let kt=!1;H.version===nt.__version?(nt.needsLights&&nt.lightsStateVersion!==ul.state.version||nt.outputColorSpace!==Ce||B.isBatchedMesh&&nt.batching===!1||!B.isBatchedMesh&&nt.batching===!0||B.isInstancedMesh&&nt.instancing===!1||!B.isInstancedMesh&&nt.instancing===!0||B.isSkinnedMesh&&nt.skinning===!1||!B.isSkinnedMesh&&nt.skinning===!0||B.isInstancedMesh&&nt.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&nt.instancingColor===!1&&B.instanceColor!==null||nt.envMap!==Ne||H.fog===!0&&nt.fog!==he||nt.numClippingPlanes!==void 0&&(nt.numClippingPlanes!==Ze.numPlanes||nt.numIntersection!==Ze.numIntersection)||nt.vertexAlphas!==Ke||nt.vertexTangents!==He||nt.morphTargets!==Ve||nt.morphNormals!==Vt||nt.morphColors!==zn||nt.toneMapping!==un||Oe.isWebGL2===!0&&nt.morphTargetsCount!==Ft)&&(kt=!0):(kt=!0,nt.__version=H.version);let Mr=nt.currentProgram;kt===!0&&(Mr=Wo(H,D,B));let iu=!1,Ks=!1,dl=!1;const xn=Mr.getUniforms(),Sr=nt.uniforms;if(ue.useProgram(Mr.program)&&(iu=!0,Ks=!0,dl=!0),H.id!==I&&(I=H.id,Ks=!0),iu||S!==w){xn.setValue(O,"projectionMatrix",w.projectionMatrix),xn.setValue(O,"viewMatrix",w.matrixWorldInverse);const $n=xn.map.cameraPosition;$n!==void 0&&$n.setValue(O,Ge.setFromMatrixPosition(w.matrixWorld)),Oe.logarithmicDepthBuffer&&xn.setValue(O,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&xn.setValue(O,"isOrthographic",w.isOrthographicCamera===!0),S!==w&&(S=w,Ks=!0,dl=!0)}if(B.isSkinnedMesh){xn.setOptional(O,B,"bindMatrix"),xn.setOptional(O,B,"bindMatrixInverse");const $n=B.skeleton;$n&&(Oe.floatVertexTextures?($n.boneTexture===null&&$n.computeBoneTexture(),xn.setValue(O,"boneTexture",$n.boneTexture,b)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}B.isBatchedMesh&&(xn.setOptional(O,B,"batchingTexture"),xn.setValue(O,"batchingTexture",B._matricesTexture,b));const hl=k.morphAttributes;if((hl.position!==void 0||hl.normal!==void 0||hl.color!==void 0&&Oe.isWebGL2===!0)&&it.update(B,k,Mr),(Ks||nt.receiveShadow!==B.receiveShadow)&&(nt.receiveShadow=B.receiveShadow,xn.setValue(O,"receiveShadow",B.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(Sr.envMap.value=Ne,Sr.flipEnvMap.value=Ne.isCubeTexture&&Ne.isRenderTargetTexture===!1?-1:1),Ks&&(xn.setValue(O,"toneMappingExposure",y.toneMappingExposure),nt.needsLights&&Zf(Sr,dl),he&&H.fog===!0&&de.refreshFogUniforms(Sr,he),de.refreshMaterialUniforms(Sr,H,Z,z,_e),Ma.upload(O,tu(nt),Sr,b)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Ma.upload(O,tu(nt),Sr,b),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&xn.setValue(O,"center",B.center),xn.setValue(O,"modelViewMatrix",B.modelViewMatrix),xn.setValue(O,"normalMatrix",B.normalMatrix),xn.setValue(O,"modelMatrix",B.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const $n=H.uniformsGroups;for(let fl=0,Jf=$n.length;fl<Jf;fl++)if(Oe.isWebGL2){const ru=$n[fl];Mt.update(ru,Mr),Mt.bind(ru,Mr)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Mr}function Zf(w,D){w.ambientLightColor.needsUpdate=D,w.lightProbe.needsUpdate=D,w.directionalLights.needsUpdate=D,w.directionalLightShadows.needsUpdate=D,w.pointLights.needsUpdate=D,w.pointLightShadows.needsUpdate=D,w.spotLights.needsUpdate=D,w.spotLightShadows.needsUpdate=D,w.rectAreaLights.needsUpdate=D,w.hemisphereLights.needsUpdate=D}function Kf(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(w,D,k){Fe.get(w.texture).__webglTexture=D,Fe.get(w.depthTexture).__webglTexture=k;const H=Fe.get(w);H.__hasExternalTextures=!0,H.__hasExternalTextures&&(H.__autoAllocateDepthBuffer=k===void 0,H.__autoAllocateDepthBuffer||Se.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(w,D){const k=Fe.get(w);k.__webglFramebuffer=D,k.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(w,D=0,k=0){R=w,P=D,A=k;let H=!0,B=null,he=!1,ve=!1;if(w){const Ne=Fe.get(w);Ne.__useDefaultFramebuffer!==void 0?(ue.bindFramebuffer(O.FRAMEBUFFER,null),H=!1):Ne.__webglFramebuffer===void 0?b.setupRenderTarget(w):Ne.__hasExternalTextures&&b.rebindTextures(w,Fe.get(w.texture).__webglTexture,Fe.get(w.depthTexture).__webglTexture);const Ke=w.texture;(Ke.isData3DTexture||Ke.isDataArrayTexture||Ke.isCompressedArrayTexture)&&(ve=!0);const He=Fe.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(He[D])?B=He[D][k]:B=He[D],he=!0):Oe.isWebGL2&&w.samples>0&&b.useMultisampledRTT(w)===!1?B=Fe.get(w).__webglMultisampledFramebuffer:Array.isArray(He)?B=He[k]:B=He,T.copy(w.viewport),G.copy(w.scissor),V=w.scissorTest}else T.copy($).multiplyScalar(Z).floor(),G.copy(re).multiplyScalar(Z).floor(),V=ie;if(ue.bindFramebuffer(O.FRAMEBUFFER,B)&&Oe.drawBuffers&&H&&ue.drawBuffers(w,B),ue.viewport(T),ue.scissor(G),ue.setScissorTest(V),he){const Ne=Fe.get(w.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+D,Ne.__webglTexture,k)}else if(ve){const Ne=Fe.get(w.texture),Ke=D||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ne.__webglTexture,k||0,Ke)}I=-1},this.readRenderTargetPixels=function(w,D,k,H,B,he,ve){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=Fe.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ve!==void 0&&(Ce=Ce[ve]),Ce){ue.bindFramebuffer(O.FRAMEBUFFER,Ce);try{const Ne=w.texture,Ke=Ne.format,He=Ne.type;if(Ke!==Qn&&me.convert(Ke)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ve=He===_o&&(Se.has("EXT_color_buffer_half_float")||Oe.isWebGL2&&Se.has("EXT_color_buffer_float"));if(He!==cr&&me.convert(He)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_TYPE)&&!(He===Oi&&(Oe.isWebGL2||Se.has("OES_texture_float")||Se.has("WEBGL_color_buffer_float")))&&!Ve){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=w.width-H&&k>=0&&k<=w.height-B&&O.readPixels(D,k,H,B,me.convert(Ke),me.convert(He),he)}finally{const Ne=R!==null?Fe.get(R).__webglFramebuffer:null;ue.bindFramebuffer(O.FRAMEBUFFER,Ne)}}},this.copyFramebufferToTexture=function(w,D,k=0){const H=Math.pow(2,-k),B=Math.floor(D.image.width*H),he=Math.floor(D.image.height*H);b.setTexture2D(D,0),O.copyTexSubImage2D(O.TEXTURE_2D,k,0,0,w.x,w.y,B,he),ue.unbindTexture()},this.copyTextureToTexture=function(w,D,k,H=0){const B=D.image.width,he=D.image.height,ve=me.convert(k.format),Ce=me.convert(k.type);b.setTexture2D(k,0),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,k.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,k.unpackAlignment),D.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,H,w.x,w.y,B,he,ve,Ce,D.image.data):D.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,H,w.x,w.y,D.mipmaps[0].width,D.mipmaps[0].height,ve,D.mipmaps[0].data):O.texSubImage2D(O.TEXTURE_2D,H,w.x,w.y,ve,Ce,D.image),H===0&&k.generateMipmaps&&O.generateMipmap(O.TEXTURE_2D),ue.unbindTexture()},this.copyTextureToTexture3D=function(w,D,k,H,B=0){if(y.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const he=w.max.x-w.min.x+1,ve=w.max.y-w.min.y+1,Ce=w.max.z-w.min.z+1,Ne=me.convert(H.format),Ke=me.convert(H.type);let He;if(H.isData3DTexture)b.setTexture3D(H,0),He=O.TEXTURE_3D;else if(H.isDataArrayTexture||H.isCompressedArrayTexture)b.setTexture2DArray(H,0),He=O.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,H.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,H.unpackAlignment);const Ve=O.getParameter(O.UNPACK_ROW_LENGTH),Vt=O.getParameter(O.UNPACK_IMAGE_HEIGHT),zn=O.getParameter(O.UNPACK_SKIP_PIXELS),un=O.getParameter(O.UNPACK_SKIP_ROWS),Ri=O.getParameter(O.UNPACK_SKIP_IMAGES),Ft=k.isCompressedTexture?k.mipmaps[B]:k.image;O.pixelStorei(O.UNPACK_ROW_LENGTH,Ft.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Ft.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,w.min.x),O.pixelStorei(O.UNPACK_SKIP_ROWS,w.min.y),O.pixelStorei(O.UNPACK_SKIP_IMAGES,w.min.z),k.isDataTexture||k.isData3DTexture?O.texSubImage3D(He,B,D.x,D.y,D.z,he,ve,Ce,Ne,Ke,Ft.data):k.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),O.compressedTexSubImage3D(He,B,D.x,D.y,D.z,he,ve,Ce,Ne,Ft.data)):O.texSubImage3D(He,B,D.x,D.y,D.z,he,ve,Ce,Ne,Ke,Ft),O.pixelStorei(O.UNPACK_ROW_LENGTH,Ve),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Vt),O.pixelStorei(O.UNPACK_SKIP_PIXELS,zn),O.pixelStorei(O.UNPACK_SKIP_ROWS,un),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Ri),B===0&&H.generateMipmaps&&O.generateMipmap(He),ue.unbindTexture()},this.initTexture=function(w){w.isCubeTexture?b.setTextureCube(w,0):w.isData3DTexture?b.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?b.setTexture2DArray(w,0):b.setTexture2D(w,0),ue.unbindTexture()},this.resetState=function(){P=0,A=0,R=null,ue.reset(),Xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Bi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Pc?"display-p3":"srgb",t.unpackColorSpace=bt.workingColorSpace===qa?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===jt?Br:bh}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Br?jt:Hi}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class yv extends Vh{}yv.prototype.isWebGL1Renderer=!0;class Ya{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Te(e),this.near=t,this.far=n}clone(){return new Ya(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class vv extends pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}const Pd=new E,Cd=new yt,Ld=new yt,xv=new E,Dd=new Ee,fa=new E,Wl=new Yr,Id=new Ee,Xl=new zo;class Mv extends X{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=du,this.bindMatrix=new Ee,this.bindMatrixInverse=new Ee,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new dt),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,fa),this.boundingBox.expandByPoint(fa)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Yr),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,fa),this.boundingSphere.expandByPoint(fa)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Wl.copy(this.boundingSphere),Wl.applyMatrix4(r),e.ray.intersectsSphere(Wl)!==!1&&(Id.copy(r).invert(),Xl.copy(e.ray).applyMatrix4(Id),!(this.boundingBox!==null&&Xl.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Xl)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new yt,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===du?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Dp?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,r=this.geometry;Cd.fromBufferAttribute(r.attributes.skinIndex,e),Ld.fromBufferAttribute(r.attributes.skinWeight,e),Pd.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const a=Ld.getComponent(s);if(a!==0){const o=Cd.getComponent(s);Dd.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(xv.copy(Pd).applyMatrix4(Dd),a)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}}class mc extends pt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Sv extends on{constructor(e=null,t=1,n=1,r,s,a,o,l,c=gn,u=gn,d,h){super(null,a,o,l,c,u,r,s,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ud=new Ee,Ev=new Ee;class Nc{constructor(e=[],t=[]){this.uuid=xr(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,r=this.bones.length;n<r;n++)this.boneInverses.push(new Ee)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Ee;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let s=0,a=e.length;s<a;s++){const o=e[s]?e[s].matrixWorld:Ev;Ud.multiplyMatrices(o,t[s]),Ud.toArray(n,s*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new Nc(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Sv(t,e,e,Qn,Oi);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const r=this.bones[t];if(r.name===e)return r}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){const s=e.bones[n];let a=t[s];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),a=new mc),this.bones.push(a),this.boneInverses.push(new Ee().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let r=0,s=t.length;r<s;r++){const a=t[r];e.bones.push(a.uuid);const o=n[r];e.boneInverses.push(o.toArray())}return e}}class Wh extends Xi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Te(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Fd=new E,Nd=new E,Od=new Ee,jl=new zo,pa=new Yr;class wv extends pt{constructor(e=new jn,t=new Wh){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)Fd.fromBufferAttribute(t,r-1),Nd.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Fd.distanceTo(Nd);e.setAttribute("lineDistance",new en(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),pa.copy(n.boundingSphere),pa.applyMatrix4(r),pa.radius+=s,e.ray.intersectsSphere(pa)===!1)return;Od.copy(r).invert(),jl.copy(e.ray).applyMatrix4(Od);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new E,u=new E,d=new E,h=new E,f=this.isLineSegments?2:1,g=n.index,p=n.attributes.position;if(g!==null){const m=Math.max(0,a.start),v=Math.min(g.count,a.start+a.count);for(let y=m,M=v-1;y<M;y+=f){const P=g.getX(y),A=g.getX(y+1);if(c.fromBufferAttribute(p,P),u.fromBufferAttribute(p,A),jl.distanceSqToSegment(c,u,h,d)>l)continue;h.applyMatrix4(this.matrixWorld);const I=e.ray.origin.distanceTo(h);I<e.near||I>e.far||t.push({distance:I,point:d.clone().applyMatrix4(this.matrixWorld),index:y,face:null,faceIndex:null,object:this})}}else{const m=Math.max(0,a.start),v=Math.min(p.count,a.start+a.count);for(let y=m,M=v-1;y<M;y+=f){if(c.fromBufferAttribute(p,y),u.fromBufferAttribute(p,y+1),jl.distanceSqToSegment(c,u,h,d)>l)continue;h.applyMatrix4(this.matrixWorld);const A=e.ray.origin.distanceTo(h);A<e.near||A>e.far||t.push({distance:A,point:d.clone().applyMatrix4(this.matrixWorld),index:y,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}class bv extends on{constructor(e,t,n,r,s,a,o,l,c){super(e,t,n,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Tv{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let r=0;const s=n.length;let a;t?a=t:a=e*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,n[r]===a)return r/(s-1);const u=n[r],h=n[r+1]-u,f=(a-u)/h;return(r+f)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new ot:new E);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new E,r=[],s=[],a=[],o=new E,l=new Ee;for(let f=0;f<=e;f++){const g=f/e;r[f]=this.getTangentAt(g,new E)}s[0]=new E,a[0]=new E;let c=Number.MAX_VALUE;const u=Math.abs(r[0].x),d=Math.abs(r[0].y),h=Math.abs(r[0].z);u<=c&&(c=u,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),h<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(r[f-1],r[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(_n(r[f-1].dot(r[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(r[f],s[f])}if(t===!0){let f=Math.acos(_n(s[0].dot(s[e]),-1,1));f/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(f=-f);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],f*g)),a[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Bt extends jn{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],d=[],h=[],f=[];let g=0;const _=[],p=n/2;let m=0;v(),a===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(u),this.setAttribute("position",new en(d,3)),this.setAttribute("normal",new en(h,3)),this.setAttribute("uv",new en(f,2));function v(){const M=new E,P=new E;let A=0;const R=(t-e)/n;for(let I=0;I<=s;I++){const S=[],T=I/s,G=T*(t-e)+e;for(let V=0;V<=r;V++){const J=V/r,L=J*l+o,U=Math.sin(L),z=Math.cos(L);P.x=G*U,P.y=-T*n+p,P.z=G*z,d.push(P.x,P.y,P.z),M.set(U,R,z).normalize(),h.push(M.x,M.y,M.z),f.push(J,1-T),S.push(g++)}_.push(S)}for(let I=0;I<r;I++)for(let S=0;S<s;S++){const T=_[S][I],G=_[S+1][I],V=_[S+1][I+1],J=_[S][I+1];u.push(T,G,J),u.push(G,V,J),A+=6}c.addGroup(m,A,0),m+=A}function y(M){const P=g,A=new ot,R=new E;let I=0;const S=M===!0?e:t,T=M===!0?1:-1;for(let V=1;V<=r;V++)d.push(0,p*T,0),h.push(0,T,0),f.push(.5,.5),g++;const G=g;for(let V=0;V<=r;V++){const L=V/r*l+o,U=Math.cos(L),z=Math.sin(L);R.x=S*z,R.y=p*T,R.z=S*U,d.push(R.x,R.y,R.z),h.push(0,T,0),A.x=U*.5+.5,A.y=z*.5*T+.5,f.push(A.x,A.y),g++}for(let V=0;V<r;V++){const J=P+V,L=G+V;M===!0?u.push(L,L+1,J):u.push(L+1,L,J),I+=3}c.addGroup(m,I,M===!0?1:2),m+=I}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Zr extends Bt{constructor(e=1,t=1,n=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Zr(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}const Av={triangulate:function(i,e,t=2){const n=e&&e.length,r=n?e[0]*t:i.length;let s=Xh(i,0,r,t,!0);const a=[];if(!s||s.next===s.prev)return a;let o,l,c,u,d,h,f;if(n&&(s=Dv(i,e,s,t)),i.length>80*t){o=c=i[0],l=u=i[1];for(let g=t;g<r;g+=t)d=i[g],h=i[g+1],d<o&&(o=d),h<l&&(l=h),d>c&&(c=d),h>u&&(u=h);f=Math.max(c-o,u-l),f=f!==0?32767/f:0}return vo(s,a,t,o,l,f,0),a}};function Xh(i,e,t,n,r){let s,a;if(r===Vv(i,e,t,n)>0)for(s=e;s<t;s+=n)a=Bd(s,i[s],i[s+1],a);else for(s=t-n;s>=e;s-=n)a=Bd(s,i[s],i[s+1],a);return a&&Za(a,a.next)&&(Mo(a),a=a.next),a}function Hr(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Za(t,t.next)||Nt(t.prev,t,t.next)===0)){if(Mo(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function vo(i,e,t,n,r,s,a){if(!i)return;!a&&s&&Ov(i,n,r,s);let o=i,l,c;for(;i.prev!==i.next;){if(l=i.prev,c=i.next,s?Pv(i,n,r,s):Rv(i)){e.push(l.i/t|0),e.push(i.i/t|0),e.push(c.i/t|0),Mo(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=Cv(Hr(i),e,t),vo(i,e,t,n,r,s,2)):a===2&&Lv(i,e,t,n,r,s):vo(Hr(i),e,t,n,r,s,1);break}}}function Rv(i){const e=i.prev,t=i,n=i.next;if(Nt(e,t,n)>=0)return!1;const r=e.x,s=t.x,a=n.x,o=e.y,l=t.y,c=n.y,u=r<s?r<a?r:a:s<a?s:a,d=o<l?o<c?o:c:l<c?l:c,h=r>s?r>a?r:a:s>a?s:a,f=o>l?o>c?o:c:l>c?l:c;let g=n.next;for(;g!==e;){if(g.x>=u&&g.x<=h&&g.y>=d&&g.y<=f&&Es(r,o,s,l,a,c,g.x,g.y)&&Nt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Pv(i,e,t,n){const r=i.prev,s=i,a=i.next;if(Nt(r,s,a)>=0)return!1;const o=r.x,l=s.x,c=a.x,u=r.y,d=s.y,h=a.y,f=o<l?o<c?o:c:l<c?l:c,g=u<d?u<h?u:h:d<h?d:h,_=o>l?o>c?o:c:l>c?l:c,p=u>d?u>h?u:h:d>h?d:h,m=gc(f,g,e,t,n),v=gc(_,p,e,t,n);let y=i.prevZ,M=i.nextZ;for(;y&&y.z>=m&&M&&M.z<=v;){if(y.x>=f&&y.x<=_&&y.y>=g&&y.y<=p&&y!==r&&y!==a&&Es(o,u,l,d,c,h,y.x,y.y)&&Nt(y.prev,y,y.next)>=0||(y=y.prevZ,M.x>=f&&M.x<=_&&M.y>=g&&M.y<=p&&M!==r&&M!==a&&Es(o,u,l,d,c,h,M.x,M.y)&&Nt(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;y&&y.z>=m;){if(y.x>=f&&y.x<=_&&y.y>=g&&y.y<=p&&y!==r&&y!==a&&Es(o,u,l,d,c,h,y.x,y.y)&&Nt(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;M&&M.z<=v;){if(M.x>=f&&M.x<=_&&M.y>=g&&M.y<=p&&M!==r&&M!==a&&Es(o,u,l,d,c,h,M.x,M.y)&&Nt(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function Cv(i,e,t){let n=i;do{const r=n.prev,s=n.next.next;!Za(r,s)&&jh(r,n,n.next,s)&&xo(r,s)&&xo(s,r)&&(e.push(r.i/t|0),e.push(n.i/t|0),e.push(s.i/t|0),Mo(n),Mo(n.next),n=i=s),n=n.next}while(n!==i);return Hr(n)}function Lv(i,e,t,n,r,s){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&kv(a,o)){let l=qh(a,o);a=Hr(a,a.next),l=Hr(l,l.next),vo(a,e,t,n,r,s,0),vo(l,e,t,n,r,s,0);return}o=o.next}a=a.next}while(a!==i)}function Dv(i,e,t,n){const r=[];let s,a,o,l,c;for(s=0,a=e.length;s<a;s++)o=e[s]*n,l=s<a-1?e[s+1]*n:i.length,c=Xh(i,o,l,n,!1),c===c.next&&(c.steiner=!0),r.push(zv(c));for(r.sort(Iv),s=0;s<r.length;s++)t=Uv(r[s],t);return t}function Iv(i,e){return i.x-e.x}function Uv(i,e){const t=Fv(i,e);if(!t)return e;const n=qh(t,i);return Hr(n,n.next),Hr(t,t.next)}function Fv(i,e){let t=e,n=-1/0,r;const s=i.x,a=i.y;do{if(a<=t.y&&a>=t.next.y&&t.next.y!==t.y){const h=t.x+(a-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=s&&h>n&&(n=h,r=t.x<t.next.x?t:t.next,h===s))return r}t=t.next}while(t!==e);if(!r)return null;const o=r,l=r.x,c=r.y;let u=1/0,d;t=r;do s>=t.x&&t.x>=l&&s!==t.x&&Es(a<c?s:n,a,l,c,a<c?n:s,a,t.x,t.y)&&(d=Math.abs(a-t.y)/(s-t.x),xo(t,i)&&(d<u||d===u&&(t.x>r.x||t.x===r.x&&Nv(r,t)))&&(r=t,u=d)),t=t.next;while(t!==o);return r}function Nv(i,e){return Nt(i.prev,i,e.prev)<0&&Nt(e.next,i,i.next)<0}function Ov(i,e,t,n){let r=i;do r.z===0&&(r.z=gc(r.x,r.y,e,t,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,Bv(r)}function Bv(i){let e,t,n,r,s,a,o,l,c=1;do{for(t=i,i=null,s=null,a=0;t;){for(a++,n=t,o=0,e=0;e<c&&(o++,n=n.nextZ,!!n);e++);for(l=c;o>0||l>0&&n;)o!==0&&(l===0||!n||t.z<=n.z)?(r=t,t=t.nextZ,o--):(r=n,n=n.nextZ,l--),s?s.nextZ=r:i=r,r.prevZ=s,s=r;t=n}s.nextZ=null,c*=2}while(a>1);return i}function gc(i,e,t,n,r){return i=(i-t)*r|0,e=(e-n)*r|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function zv(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Es(i,e,t,n,r,s,a,o){return(r-a)*(e-o)>=(i-a)*(s-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(n-o)}function kv(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Gv(i,e)&&(xo(i,e)&&xo(e,i)&&Hv(i,e)&&(Nt(i.prev,i,e.prev)||Nt(i,e.prev,e))||Za(i,e)&&Nt(i.prev,i,i.next)>0&&Nt(e.prev,e,e.next)>0)}function Nt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Za(i,e){return i.x===e.x&&i.y===e.y}function jh(i,e,t,n){const r=ga(Nt(i,e,t)),s=ga(Nt(i,e,n)),a=ga(Nt(t,n,i)),o=ga(Nt(t,n,e));return!!(r!==s&&a!==o||r===0&&ma(i,t,e)||s===0&&ma(i,n,e)||a===0&&ma(t,i,n)||o===0&&ma(t,e,n))}function ma(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function ga(i){return i>0?1:i<0?-1:0}function Gv(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&jh(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function xo(i,e){return Nt(i.prev,i,i.next)<0?Nt(i,e,i.next)>=0&&Nt(i,i.prev,e)>=0:Nt(i,e,i.prev)<0||Nt(i,i.next,e)<0}function Hv(i,e){let t=i,n=!1;const r=(i.x+e.x)/2,s=(i.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function qh(i,e){const t=new _c(i.i,i.x,i.y),n=new _c(e.i,e.x,e.y),r=i.next,s=e.prev;return i.next=e,e.prev=i,t.next=r,r.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Bd(i,e,t,n){const r=new _c(i,e,t);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function Mo(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function _c(i,e,t){this.i=i,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Vv(i,e,t,n){let r=0;for(let s=e,a=t-n;s<t;s+=n)r+=(i[a]-i[s])*(i[s+1]+i[a+1]),a=s;return r}class Oc{static area(e){const t=e.length;let n=0;for(let r=t-1,s=0;s<t;r=s++)n+=e[r].x*e[s].y-e[s].x*e[r].y;return n*.5}static isClockWise(e){return Oc.area(e)<0}static triangulateShape(e,t){const n=[],r=[],s=[];zd(e),kd(n,e);let a=e.length;t.forEach(zd);for(let l=0;l<t.length;l++)r.push(a),a+=t[l].length,kd(n,t[l]);const o=Av.triangulate(n,r);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function zd(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function kd(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class Zt extends jn{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const u=[],d=new E,h=new E,f=[],g=[],_=[],p=[];for(let m=0;m<=n;m++){const v=[],y=m/n;let M=0;m===0&&a===0?M=.5/t:m===n&&l===Math.PI&&(M=-.5/t);for(let P=0;P<=t;P++){const A=P/t;d.x=-e*Math.cos(r+A*s)*Math.sin(a+y*o),d.y=e*Math.cos(a+y*o),d.z=e*Math.sin(r+A*s)*Math.sin(a+y*o),g.push(d.x,d.y,d.z),h.copy(d).normalize(),_.push(h.x,h.y,h.z),p.push(A+M,1-y),v.push(c++)}u.push(v)}for(let m=0;m<n;m++)for(let v=0;v<t;v++){const y=u[m][v+1],M=u[m][v],P=u[m+1][v],A=u[m+1][v+1];(m!==0||a>0)&&f.push(y,M,A),(m!==n-1||l<Math.PI)&&f.push(M,P,A)}this.setIndex(f),this.setAttribute("position",new en(g,3)),this.setAttribute("normal",new en(_,3)),this.setAttribute("uv",new en(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zt(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Ye extends Xi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Te(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ja,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ql extends Xi{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Te(16777215),this.specular=new Te(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ja,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Wa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class yn extends Xi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ja,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Wa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}function _a(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Wv(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Xv(i){function e(r,s){return i[r]-i[s]}const t=i.length,n=new Array(t);for(let r=0;r!==t;++r)n[r]=r;return n.sort(e),n}function Gd(i,e,t){const n=i.length,r=new i.constructor(n);for(let s=0,a=0;a!==n;++s){const o=t[s]*e;for(let l=0;l!==e;++l)r[a++]=i[o+l]}return r}function $h(i,e,t,n){let r=1,s=i[0];for(;s!==void 0&&s[n]===void 0;)s=i[r++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(e.push(s.time),t.push.apply(t,a)),s=i[r++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=i[r++];while(s!==void 0);else do a=s[n],a!==void 0&&(e.push(s.time),t.push(a)),s=i[r++];while(s!==void 0)}class Ka{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,r=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<r)){for(let o=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=r,r=t[++n],e<r)break e}a=t.length;break t}if(!(e>=s)){const o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(r=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class jv extends Ka{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Bu,endingEnd:Bu}}intervalChanged_(e,t,n){const r=this.parameterPositions;let s=e-2,a=e+1,o=r[s],l=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case zu:s=e,o=2*t-n;break;case ku:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case zu:a=e,l=2*n-t;break;case ku:a=1,l=n+r[1]-r[0];break;default:a=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=a*u}interpolate_(e,t,n,r){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,f=this._weightNext,g=(n-t)/(r-t),_=g*g,p=_*g,m=-h*p+2*h*_-h*g,v=(1+h)*p+(-1.5-2*h)*_+(-.5+h)*g+1,y=(-1-f)*p+(1.5+f)*_+.5*g,M=f*p-f*_;for(let P=0;P!==o;++P)s[P]=m*a[u+P]+v*a[c+P]+y*a[l+P]+M*a[d+P];return s}}class qv extends Ka{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(n-t)/(r-t),d=1-u;for(let h=0;h!==o;++h)s[h]=a[c+h]*d+a[l+h]*u;return s}}class $v extends Ka{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}}class Ti{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=_a(t,this.TimeBufferType),this.values=_a(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:_a(e.times,Array),values:_a(e.values,Array)};const r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new $v(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new qv(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new jv(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Ta:t=this.InterpolantFactoryMethodDiscrete;break;case Aa:t=this.InterpolantFactoryMethodLinear;break;case xl:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ta;case this.InterpolantFactoryMethodLinear:return Aa;case this.InterpolantFactoryMethodSmooth:return xl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){const n=this.times,r=n.length;let s=0,a=r-1;for(;s!==r&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);const o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,r=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(r!==void 0&&Wv(r))for(let o=0,l=r.length;o!==l;++o){const c=r[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===xl,s=e.length-1;let a=1;for(let o=1;o<s;++o){let l=!1;const c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(r)l=!0;else{const d=o*n,h=d-n,f=d+n;for(let g=0;g!==n;++g){const _=t[d+g];if(_!==t[h+g]||_!==t[f+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const d=o*n,h=a*n;for(let f=0;f!==n;++f)t[h+f]=t[d+f]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}}Ti.prototype.TimeBufferType=Float32Array;Ti.prototype.ValueBufferType=Float32Array;Ti.prototype.DefaultInterpolation=Aa;class js extends Ti{}js.prototype.ValueTypeName="bool";js.prototype.ValueBufferType=Array;js.prototype.DefaultInterpolation=Ta;js.prototype.InterpolantFactoryMethodLinear=void 0;js.prototype.InterpolantFactoryMethodSmooth=void 0;class Yh extends Ti{}Yh.prototype.ValueTypeName="color";class So extends Ti{}So.prototype.ValueTypeName="number";class Yv extends Ka{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(r-t);let c=e*o;for(let u=c+o;c!==u;c+=4)Qt.slerpFlat(s,0,a,c-o,a,c,l);return s}}class Vr extends Ti{InterpolantFactoryMethodLinear(e){return new Yv(this.times,this.values,this.getValueSize(),e)}}Vr.prototype.ValueTypeName="quaternion";Vr.prototype.DefaultInterpolation=Aa;Vr.prototype.InterpolantFactoryMethodSmooth=void 0;class qs extends Ti{}qs.prototype.ValueTypeName="string";qs.prototype.ValueBufferType=Array;qs.prototype.DefaultInterpolation=Ta;qs.prototype.InterpolantFactoryMethodLinear=void 0;qs.prototype.InterpolantFactoryMethodSmooth=void 0;class Eo extends Ti{}Eo.prototype.ValueTypeName="vector";class Zv{constructor(e,t=-1,n,r=Hp){this.name=e,this.tracks=n,this.duration=t,this.blendMode=r,this.uuid=xr(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,r=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(Jv(n[a]).scale(r));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,a=n.length;s!==a;++s)t.push(Ti.toJSON(n[s]));return r}static CreateFromMorphTargetSequence(e,t,n,r){const s=t.length,a=[];for(let o=0;o<s;o++){let l=[],c=[];l.push((o+s-1)%s,o,(o+1)%s),c.push(0,1,0);const u=Xv(l);l=Gd(l,1,u),c=Gd(c,1,u),!r&&l[0]===0&&(l.push(s),c.push(c[0])),a.push(new So(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const r=e;n=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<n.length;r++)if(n[r].name===t)return n[r];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const r={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],u=c.name.match(s);if(u&&u.length>1){const d=u[1];let h=r[d];h||(r[d]=h=[]),h.push(c)}}const a=[];for(const o in r)a.push(this.CreateFromMorphTargetSequence(o,r[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(d,h,f,g,_){if(f.length!==0){const p=[],m=[];$h(f,p,m,g),p.length!==0&&_.push(new d(h,p,m))}},r=[],s=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let d=0;d<c.length;d++){const h=c[d].keys;if(!(!h||h.length===0))if(h[0].morphTargets){const f={};let g;for(g=0;g<h.length;g++)if(h[g].morphTargets)for(let _=0;_<h[g].morphTargets.length;_++)f[h[g].morphTargets[_]]=-1;for(const _ in f){const p=[],m=[];for(let v=0;v!==h[g].morphTargets.length;++v){const y=h[g];p.push(y.time),m.push(y.morphTarget===_?1:0)}r.push(new So(".morphTargetInfluence["+_+"]",p,m))}l=f.length*a}else{const f=".bones["+t[d].name+"]";n(Eo,f+".position",h,"pos",r),n(Vr,f+".quaternion",h,"rot",r),n(Eo,f+".scale",h,"scl",r)}}return r.length===0?null:new this(s,l,r,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,r=e.length;n!==r;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function Kv(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return So;case"vector":case"vector2":case"vector3":case"vector4":return Eo;case"color":return Yh;case"quaternion":return Vr;case"bool":case"boolean":return js;case"string":return qs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Jv(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Kv(i.type);if(i.times===void 0){const t=[],n=[];$h(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const Ia={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class Qv{constructor(e,t,n){const r=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){o++,s===!1&&r.onStart!==void 0&&r.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,r.onProgress!==void 0&&r.onProgress(u,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){const d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=c.length;d<h;d+=2){const f=c[d],g=c[d+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null}}}const ex=new Qv;class Wr{constructor(e){this.manager=e!==void 0?e:ex,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Wr.DEFAULT_MATERIAL_NAME="__DEFAULT";const Ui={};class tx extends Error{constructor(e,t){super(e),this.response=t}}class nx extends Wr{constructor(e){super(e)}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=Ia.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Ui[e]!==void 0){Ui[e].push({onLoad:t,onProgress:n,onError:r});return}Ui[e]=[],Ui[e].push({onLoad:t,onProgress:n,onError:r});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=Ui[e],d=c.body.getReader(),h=c.headers.get("Content-Length")||c.headers.get("X-File-Size"),f=h?parseInt(h):0,g=f!==0;let _=0;const p=new ReadableStream({start(m){v();function v(){d.read().then(({done:y,value:M})=>{if(y)m.close();else{_+=M.byteLength;const P=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:f});for(let A=0,R=u.length;A<R;A++){const I=u[A];I.onProgress&&I.onProgress(P)}m.enqueue(M),v()}})}}});return new Response(p)}else throw new tx(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return c.json();default:if(o===void 0)return c.text();{const d=/charset="?([^;"\s]*)"?/i.exec(o),h=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(h);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{Ia.add(e,c);const u=Ui[e];delete Ui[e];for(let d=0,h=u.length;d<h;d++){const f=u[d];f.onLoad&&f.onLoad(c)}}).catch(c=>{const u=Ui[e];if(u===void 0)throw this.manager.itemError(e),c;delete Ui[e];for(let d=0,h=u.length;d<h;d++){const f=u[d];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class ix extends Wr{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=Ia.get(e);if(a!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a;const o=yo("img");function l(){u(),Ia.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(d){u(),r&&r(d),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),s.manager.itemStart(e),o.src=e,o}}class rx extends Wr{constructor(e){super(e)}load(e,t,n,r){const s=new on,a=new ix(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,r),s}}class Ja extends pt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Te(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const $l=new Ee,Hd=new E,Vd=new E;class Bc{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ot(512,512),this.map=null,this.mapPass=null,this.matrix=new Ee,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ic,this._frameExtents=new ot(1,1),this._viewportCount=1,this._viewports=[new yt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Hd.setFromMatrixPosition(e.matrixWorld),t.position.copy(Hd),Vd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Vd),t.updateMatrixWorld(),$l.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix($l),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply($l)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class sx extends Bc{constructor(){super(new In(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Bs*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||r!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=r,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class ox extends Ja{constructor(e,t,n=0,r=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.target=new pt,this.distance=n,this.angle=r,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new sx}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Wd=new Ee,no=new E,Yl=new E;class ax extends Bc{constructor(){super(new In(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ot(4,2),this._viewportCount=6,this._viewports=[new yt(2,1,1,1),new yt(0,1,1,1),new yt(3,1,1,1),new yt(1,1,1,1),new yt(3,0,1,1),new yt(1,0,1,1)],this._cubeDirections=[new E(1,0,0),new E(-1,0,0),new E(0,0,1),new E(0,0,-1),new E(0,1,0),new E(0,-1,0)],this._cubeUps=[new E(0,1,0),new E(0,1,0),new E(0,1,0),new E(0,1,0),new E(0,0,1),new E(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,r=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),no.setFromMatrixPosition(e.matrixWorld),n.position.copy(no),Yl.copy(n.position),Yl.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Yl),n.updateMatrixWorld(),r.makeTranslation(-no.x,-no.y,-no.z),Wd.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Wd)}}class Xd extends Ja{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new ax}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class lx extends Bc{constructor(){super(new Uc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Zh extends Ja{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.target=new pt,this.shadow=new lx}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Kh extends Ja{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class cx{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,r=e.length;n<r;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const zc="\\[\\]\\.:\\/",ux=new RegExp("["+zc+"]","g"),kc="[^"+zc+"]",dx="[^"+zc.replace("\\.","")+"]",hx=/((?:WC+[\/:])*)/.source.replace("WC",kc),fx=/(WCOD+)?/.source.replace("WCOD",dx),px=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",kc),mx=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",kc),gx=new RegExp("^"+hx+fx+px+mx+"$"),_x=["material","materials","bones","map"];class yx{constructor(e,t,n){const r=n||ht.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class ht{constructor(e,t,n){this.path=t,this.parsedPath=n||ht.parseTrackName(t),this.node=ht.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new ht.Composite(e,t,n):new ht(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(ux,"")}static parseTrackName(e){const t=gx.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){const s=n.nodeName.substring(r+1);_x.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let a=0;a<s.length;a++){const o=s[a];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,r=t.propertyName;let s=t.propertyIndex;if(e||(e=ht.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[r];if(a===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ht.Composite=yx;ht.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ht.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ht.prototype.GetterByBindingType=[ht.prototype._getValue_direct,ht.prototype._getValue_array,ht.prototype._getValue_arrayElement,ht.prototype._getValue_toArray];ht.prototype.SetterByBindingTypeAndVersioning=[[ht.prototype._setValue_direct,ht.prototype._setValue_direct_setNeedsUpdate,ht.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ht.prototype._setValue_array,ht.prototype._setValue_array_setNeedsUpdate,ht.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ht.prototype._setValue_arrayElement,ht.prototype._setValue_arrayElement_setNeedsUpdate,ht.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ht.prototype._setValue_fromArray,ht.prototype._setValue_fromArray_setNeedsUpdate,ht.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class $s{constructor(e,t,n=0,r=1/0){this.ray=new zo(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Lc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return yc(e,this,n,t),n.sort(jd),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)yc(e[r],this,n,t);return n.sort(jd),n}}function jd(i,e){return i.distance-e.distance}function yc(i,e,t,n){if(i.layers.test(e.layers)&&i.raycast(e,t),n===!0){const r=i.children;for(let s=0,a=r.length;s<a;s++)yc(r[s],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ac}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ac);const ps=new _t(0,0,0,"YXZ"),ms=new E,vx={type:"change"},xx={type:"lock"},Mx={type:"unlock"},qd=Math.PI/2;class Sx extends $r{constructor(e,t){super(),this.camera=e,this.domElement=t,this.isLocked=!1,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.pointerSpeed=1,this.sensitivity=.002,this._onMouseMove=Ex.bind(this),this._onPointerlockChange=wx.bind(this),this._onPointerlockError=bx.bind(this),this.connect()}connect(){this.domElement.ownerDocument.addEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.addEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.addEventListener("pointerlockerror",this._onPointerlockError)}disconnect(){this.domElement.ownerDocument.removeEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.removeEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.removeEventListener("pointerlockerror",this._onPointerlockError)}dispose(){this.disconnect()}getObject(){return this.camera}getDirection(e){return e.set(0,0,-1).applyQuaternion(this.camera.quaternion)}moveForward(e){const t=this.camera;ms.setFromMatrixColumn(t.matrix,0),ms.crossVectors(t.up,ms),t.position.addScaledVector(ms,e)}moveRight(e){const t=this.camera;ms.setFromMatrixColumn(t.matrix,0),t.position.addScaledVector(ms,e)}lock(){this.domElement.requestPointerLock()}unlock(){this.domElement.ownerDocument.exitPointerLock()}}function Ex(i){if(this.isLocked===!1||window.isOnPlane&&window.isOnPlane===!0)return;const e=i.movementX||i.mozMovementX||i.webkitMovementX||0,t=i.movementY||i.mozMovementY||i.webkitMovementY||0,n=this.camera;ps.setFromQuaternion(n.quaternion),ps.y-=e*this.sensitivity*this.pointerSpeed,ps.x-=t*this.sensitivity*this.pointerSpeed,ps.x=Math.max(qd-this.maxPolarAngle,Math.min(qd-this.minPolarAngle,ps.x)),n.quaternion.setFromEuler(ps),this.dispatchEvent(vx)}function wx(){this.domElement.ownerDocument.pointerLockElement===this.domElement?(this.dispatchEvent(xx),this.isLocked=!0):(this.dispatchEvent(Mx),this.isLocked=!1)}function bx(){console.error("THREE.PointerLockControls: Unable to use Pointer Lock API")}/*!
fflate - fast JavaScript compression/decompression
<https://101arrowz.github.io/fflate>
Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
version 0.6.9
*/var $d=function(i){return URL.createObjectURL(new Blob([i],{type:"text/javascript"}))};try{URL.revokeObjectURL($d(""))}catch{$d=function(e){return"data:application/javascript;charset=UTF-8,"+encodeURI(e)}}var ti=Uint8Array,ir=Uint16Array,vc=Uint32Array,Jh=new ti([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Qh=new ti([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Tx=new ti([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),ef=function(i,e){for(var t=new ir(31),n=0;n<31;++n)t[n]=e+=1<<i[n-1];for(var r=new vc(t[30]),n=1;n<30;++n)for(var s=t[n];s<t[n+1];++s)r[s]=s-t[n]<<5|n;return[t,r]},tf=ef(Jh,2),nf=tf[0],Ax=tf[1];nf[28]=258,Ax[258]=28;var Rx=ef(Qh,0),Px=Rx[0],xc=new ir(32768);for(var It=0;It<32768;++It){var Ki=(It&43690)>>>1|(It&21845)<<1;Ki=(Ki&52428)>>>2|(Ki&13107)<<2,Ki=(Ki&61680)>>>4|(Ki&3855)<<4,xc[It]=((Ki&65280)>>>8|(Ki&255)<<8)>>>1}var co=function(i,e,t){for(var n=i.length,r=0,s=new ir(e);r<n;++r)++s[i[r]-1];var a=new ir(e);for(r=0;r<e;++r)a[r]=a[r-1]+s[r-1]<<1;var o;if(t){o=new ir(1<<e);var l=15-e;for(r=0;r<n;++r)if(i[r])for(var c=r<<4|i[r],u=e-i[r],d=a[i[r]-1]++<<u,h=d|(1<<u)-1;d<=h;++d)o[xc[d]>>>l]=c}else for(o=new ir(n),r=0;r<n;++r)i[r]&&(o[r]=xc[a[i[r]-1]++]>>>15-i[r]);return o},Go=new ti(288);for(var It=0;It<144;++It)Go[It]=8;for(var It=144;It<256;++It)Go[It]=9;for(var It=256;It<280;++It)Go[It]=7;for(var It=280;It<288;++It)Go[It]=8;var rf=new ti(32);for(var It=0;It<32;++It)rf[It]=5;var Cx=co(Go,9,1),Lx=co(rf,5,1),Zl=function(i){for(var e=i[0],t=1;t<i.length;++t)i[t]>e&&(e=i[t]);return e},ci=function(i,e,t){var n=e/8|0;return(i[n]|i[n+1]<<8)>>(e&7)&t},Kl=function(i,e){var t=e/8|0;return(i[t]|i[t+1]<<8|i[t+2]<<16)>>(e&7)},Dx=function(i){return(i/8|0)+(i&7&&1)},Ix=function(i,e,t){(t==null||t>i.length)&&(t=i.length);var n=new(i instanceof ir?ir:i instanceof vc?vc:ti)(t-e);return n.set(i.subarray(e,t)),n},Ux=function(i,e,t){var n=i.length;if(!n||t&&!t.l&&n<5)return e||new ti(0);var r=!e||t,s=!t||t.i;t||(t={}),e||(e=new ti(n*3));var a=function(_e){var ge=e.length;if(_e>ge){var De=new ti(Math.max(ge*2,_e));De.set(e),e=De}},o=t.f||0,l=t.p||0,c=t.b||0,u=t.l,d=t.d,h=t.m,f=t.n,g=n*8;do{if(!u){t.f=o=ci(i,l,1);var _=ci(i,l+1,3);if(l+=3,_)if(_==1)u=Cx,d=Lx,h=9,f=5;else if(_==2){var y=ci(i,l,31)+257,M=ci(i,l+10,15)+4,P=y+ci(i,l+5,31)+1;l+=14;for(var A=new ti(P),R=new ti(19),I=0;I<M;++I)R[Tx[I]]=ci(i,l+I*3,7);l+=M*3;for(var S=Zl(R),T=(1<<S)-1,G=co(R,S,1),I=0;I<P;){var V=G[ci(i,l,T)];l+=V&15;var p=V>>>4;if(p<16)A[I++]=p;else{var J=0,L=0;for(p==16?(L=3+ci(i,l,3),l+=2,J=A[I-1]):p==17?(L=3+ci(i,l,7),l+=3):p==18&&(L=11+ci(i,l,127),l+=7);L--;)A[I++]=J}}var U=A.subarray(0,y),z=A.subarray(y);h=Zl(U),f=Zl(z),u=co(U,h,1),d=co(z,f,1)}else throw"invalid block type";else{var p=Dx(l)+4,m=i[p-4]|i[p-3]<<8,v=p+m;if(v>n){if(s)throw"unexpected EOF";break}r&&a(c+m),e.set(i.subarray(p,v),c),t.b=c+=m,t.p=l=v*8;continue}if(l>g){if(s)throw"unexpected EOF";break}}r&&a(c+131072);for(var Z=(1<<h)-1,q=(1<<f)-1,Y=l;;Y=l){var J=u[Kl(i,l)&Z],$=J>>>4;if(l+=J&15,l>g){if(s)throw"unexpected EOF";break}if(!J)throw"invalid length/literal";if($<256)e[c++]=$;else if($==256){Y=l,u=null;break}else{var re=$-254;if($>264){var I=$-257,ie=Jh[I];re=ci(i,l,(1<<ie)-1)+nf[I],l+=ie}var W=d[Kl(i,l)&q],K=W>>>4;if(!W)throw"invalid distance";l+=W&15;var z=Px[K];if(K>3){var ie=Qh[K];z+=Kl(i,l)&(1<<ie)-1,l+=ie}if(l>g){if(s)throw"unexpected EOF";break}r&&a(c+131072);for(var ae=c+re;c<ae;c+=4)e[c]=e[c-z],e[c+1]=e[c+1-z],e[c+2]=e[c+2-z],e[c+3]=e[c+3-z];c=ae}}t.l=u,t.p=Y,t.b=c,u&&(o=1,t.m=h,t.d=d,t.n=f)}while(!o);return c==e.length?e:Ix(e,0,c)},Fx=new ti(0),Nx=function(i){if((i[0]&15)!=8||i[0]>>>4>7||(i[0]<<8|i[1])%31)throw"invalid zlib data";if(i[1]&32)throw"invalid zlib data: preset dictionaries not supported"};function Ox(i,e){return Ux((Nx(i),i.subarray(2,-4)),e)}var Bx=typeof TextDecoder<"u"&&new TextDecoder,zx=0;try{Bx.decode(Fx,{stream:!0}),zx=1}catch{}function sf(i,e,t){const n=t.length-i-1;if(e>=t[n])return n-1;if(e<=t[i])return i;let r=i,s=n,a=Math.floor((r+s)/2);for(;e<t[a]||e>=t[a+1];)e<t[a]?s=a:r=a,a=Math.floor((r+s)/2);return a}function kx(i,e,t,n){const r=[],s=[],a=[];r[0]=1;for(let o=1;o<=t;++o){s[o]=e-n[i+1-o],a[o]=n[i+o]-e;let l=0;for(let c=0;c<o;++c){const u=a[c+1],d=s[o-c],h=r[c]/(u+d);r[c]=l+u*h,l=d*h}r[o]=l}return r}function Gx(i,e,t,n){const r=sf(i,n,e),s=kx(r,n,i,e),a=new yt(0,0,0,0);for(let o=0;o<=i;++o){const l=t[r-i+o],c=s[o],u=l.w*c;a.x+=l.x*u,a.y+=l.y*u,a.z+=l.z*u,a.w+=l.w*c}return a}function Hx(i,e,t,n,r){const s=[];for(let d=0;d<=t;++d)s[d]=0;const a=[];for(let d=0;d<=n;++d)a[d]=s.slice(0);const o=[];for(let d=0;d<=t;++d)o[d]=s.slice(0);o[0][0]=1;const l=s.slice(0),c=s.slice(0);for(let d=1;d<=t;++d){l[d]=e-r[i+1-d],c[d]=r[i+d]-e;let h=0;for(let f=0;f<d;++f){const g=c[f+1],_=l[d-f];o[d][f]=g+_;const p=o[f][d-1]/o[d][f];o[f][d]=h+g*p,h=_*p}o[d][d]=h}for(let d=0;d<=t;++d)a[0][d]=o[d][t];for(let d=0;d<=t;++d){let h=0,f=1;const g=[];for(let _=0;_<=t;++_)g[_]=s.slice(0);g[0][0]=1;for(let _=1;_<=n;++_){let p=0;const m=d-_,v=t-_;d>=_&&(g[f][0]=g[h][0]/o[v+1][m],p=g[f][0]*o[m][v]);const y=m>=-1?1:-m,M=d-1<=v?_-1:t-d;for(let A=y;A<=M;++A)g[f][A]=(g[h][A]-g[h][A-1])/o[v+1][m+A],p+=g[f][A]*o[m+A][v];d<=v&&(g[f][_]=-g[h][_-1]/o[v+1][d],p+=g[f][_]*o[d][v]),a[_][d]=p;const P=h;h=f,f=P}}let u=t;for(let d=1;d<=n;++d){for(let h=0;h<=t;++h)a[d][h]*=u;u*=t-d}return a}function Vx(i,e,t,n,r){const s=r<i?r:i,a=[],o=sf(i,n,e),l=Hx(o,n,i,s,e),c=[];for(let u=0;u<t.length;++u){const d=t[u].clone(),h=d.w;d.x*=h,d.y*=h,d.z*=h,c[u]=d}for(let u=0;u<=s;++u){const d=c[o-i].clone().multiplyScalar(l[u][0]);for(let h=1;h<=i;++h)d.add(c[o-i+h].clone().multiplyScalar(l[u][h]));a[u]=d}for(let u=s+1;u<=r+1;++u)a[u]=new yt(0,0,0);return a}function Wx(i,e){let t=1;for(let r=2;r<=i;++r)t*=r;let n=1;for(let r=2;r<=e;++r)n*=r;for(let r=2;r<=i-e;++r)n*=r;return t/n}function Xx(i){const e=i.length,t=[],n=[];for(let s=0;s<e;++s){const a=i[s];t[s]=new E(a.x,a.y,a.z),n[s]=a.w}const r=[];for(let s=0;s<e;++s){const a=t[s].clone();for(let o=1;o<=s;++o)a.sub(r[s-o].clone().multiplyScalar(Wx(s,o)*n[o]));r[s]=a.divideScalar(n[0])}return r}function jx(i,e,t,n,r){const s=Vx(i,e,t,n,r);return Xx(s)}class qx extends Tv{constructor(e,t,n,r,s){super(),this.degree=e,this.knots=t,this.controlPoints=[],this.startKnot=r||0,this.endKnot=s||this.knots.length-1;for(let a=0;a<n.length;++a){const o=n[a];this.controlPoints[a]=new yt(o.x,o.y,o.z,o.w)}}getPoint(e,t=new E){const n=t,r=this.knots[this.startKnot]+e*(this.knots[this.endKnot]-this.knots[this.startKnot]),s=Gx(this.degree,this.knots,this.controlPoints,r);return s.w!==1&&s.divideScalar(s.w),n.set(s.x,s.y,s.z)}getTangent(e,t=new E){const n=t,r=this.knots[0]+e*(this.knots[this.knots.length-1]-this.knots[0]),s=jx(this.degree,this.knots,this.controlPoints,r,1);return n.copy(s[1]).normalize(),n}}let Je,Wt,Dn;class $x extends Wr{constructor(e){super(e)}load(e,t,n,r){const s=this,a=s.path===""?cx.extractUrlBase(e):s.path,o=new nx(this.manager);o.setPath(s.path),o.setResponseType("arraybuffer"),o.setRequestHeader(s.requestHeader),o.setWithCredentials(s.withCredentials),o.load(e,function(l){try{t(s.parse(l,a))}catch(c){r?r(c):console.error(c),s.manager.itemError(e)}},n,r)}parse(e,t){if(eM(e))Je=new Qx().parse(e);else{const r=cf(e);if(!tM(r))throw new Error("THREE.FBXLoader: Unknown format.");if(Zd(r)<7e3)throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: "+Zd(r));Je=new Jx().parse(r)}const n=new rx(this.manager).setPath(this.resourcePath||t).setCrossOrigin(this.crossOrigin);return new Yx(n,this.manager).parse(Je)}}class Yx{constructor(e,t){this.textureLoader=e,this.manager=t}parse(){Wt=this.parseConnections();const e=this.parseImages(),t=this.parseTextures(e),n=this.parseMaterials(t),r=this.parseDeformers(),s=new Zx().parse(r);return this.parseScene(r,s,n),Dn}parseConnections(){const e=new Map;return"Connections"in Je&&Je.Connections.connections.forEach(function(n){const r=n[0],s=n[1],a=n[2];e.has(r)||e.set(r,{parents:[],children:[]});const o={ID:s,relationship:a};e.get(r).parents.push(o),e.has(s)||e.set(s,{parents:[],children:[]});const l={ID:r,relationship:a};e.get(s).children.push(l)}),e}parseImages(){const e={},t={};if("Video"in Je.Objects){const n=Je.Objects.Video;for(const r in n){const s=n[r],a=parseInt(r);if(e[a]=s.RelativeFilename||s.Filename,"Content"in s){const o=s.Content instanceof ArrayBuffer&&s.Content.byteLength>0,l=typeof s.Content=="string"&&s.Content!=="";if(o||l){const c=this.parseImage(n[r]);t[s.RelativeFilename||s.Filename]=c}}}}for(const n in e){const r=e[n];t[r]!==void 0?e[n]=t[r]:e[n]=e[n].split("\\").pop()}return e}parseImage(e){const t=e.Content,n=e.RelativeFilename||e.Filename,r=n.slice(n.lastIndexOf(".")+1).toLowerCase();let s;switch(r){case"bmp":s="image/bmp";break;case"jpg":case"jpeg":s="image/jpeg";break;case"png":s="image/png";break;case"tif":s="image/tiff";break;case"tga":this.manager.getHandler(".tga")===null&&console.warn("FBXLoader: TGA loader not found, skipping ",n),s="image/tga";break;default:console.warn('FBXLoader: Image type "'+r+'" is not supported.');return}if(typeof t=="string")return"data:"+s+";base64,"+t;{const a=new Uint8Array(t);return window.URL.createObjectURL(new Blob([a],{type:s}))}}parseTextures(e){const t=new Map;if("Texture"in Je.Objects){const n=Je.Objects.Texture;for(const r in n){const s=this.parseTexture(n[r],e);t.set(parseInt(r),s)}}return t}parseTexture(e,t){const n=this.loadTexture(e,t);n.ID=e.id,n.name=e.attrName;const r=e.WrapModeU,s=e.WrapModeV,a=r!==void 0?r.value:0,o=s!==void 0?s.value:0;if(n.wrapS=a===0?mo:Vn,n.wrapT=o===0?mo:Vn,"Scaling"in e){const l=e.Scaling.value;n.repeat.x=l[0],n.repeat.y=l[1]}if("Translation"in e){const l=e.Translation.value;n.offset.x=l[0],n.offset.y=l[1]}return n}loadTexture(e,t){let n;const r=this.textureLoader.path,s=Wt.get(e.id).children;s!==void 0&&s.length>0&&t[s[0].ID]!==void 0&&(n=t[s[0].ID],(n.indexOf("blob:")===0||n.indexOf("data:")===0)&&this.textureLoader.setPath(void 0));let a;const o=e.FileName.slice(-3).toLowerCase();if(o==="tga"){const l=this.manager.getHandler(".tga");l===null?(console.warn("FBXLoader: TGA loader not found, creating placeholder texture for",e.RelativeFilename),a=new on):(l.setPath(this.textureLoader.path),a=l.load(n))}else if(o==="dds"){const l=this.manager.getHandler(".dds");l===null?(console.warn("FBXLoader: DDS loader not found, creating placeholder texture for",e.RelativeFilename),a=new on):(l.setPath(this.textureLoader.path),a=l.load(n))}else o==="psd"?(console.warn("FBXLoader: PSD textures are not supported, creating placeholder texture for",e.RelativeFilename),a=new on):a=this.textureLoader.load(n);return this.textureLoader.setPath(r),a}parseMaterials(e){const t=new Map;if("Material"in Je.Objects){const n=Je.Objects.Material;for(const r in n){const s=this.parseMaterial(n[r],e);s!==null&&t.set(parseInt(r),s)}}return t}parseMaterial(e,t){const n=e.id,r=e.attrName;let s=e.ShadingModel;if(typeof s=="object"&&(s=s.value),!Wt.has(n))return null;const a=this.parseParameters(e,t,n);let o;switch(s.toLowerCase()){case"phong":o=new ql;break;case"lambert":o=new yn;break;default:console.warn('THREE.FBXLoader: unknown material type "%s". Defaulting to MeshPhongMaterial.',s),o=new ql;break}return o.setValues(a),o.name=r,o}parseParameters(e,t,n){const r={};e.BumpFactor&&(r.bumpScale=e.BumpFactor.value),e.Diffuse?r.color=new Te().fromArray(e.Diffuse.value).convertSRGBToLinear():e.DiffuseColor&&(e.DiffuseColor.type==="Color"||e.DiffuseColor.type==="ColorRGB")&&(r.color=new Te().fromArray(e.DiffuseColor.value).convertSRGBToLinear()),e.DisplacementFactor&&(r.displacementScale=e.DisplacementFactor.value),e.Emissive?r.emissive=new Te().fromArray(e.Emissive.value).convertSRGBToLinear():e.EmissiveColor&&(e.EmissiveColor.type==="Color"||e.EmissiveColor.type==="ColorRGB")&&(r.emissive=new Te().fromArray(e.EmissiveColor.value).convertSRGBToLinear()),e.EmissiveFactor&&(r.emissiveIntensity=parseFloat(e.EmissiveFactor.value)),e.Opacity&&(r.opacity=parseFloat(e.Opacity.value)),r.opacity<1&&(r.transparent=!0),e.ReflectionFactor&&(r.reflectivity=e.ReflectionFactor.value),e.Shininess&&(r.shininess=e.Shininess.value),e.Specular?r.specular=new Te().fromArray(e.Specular.value).convertSRGBToLinear():e.SpecularColor&&e.SpecularColor.type==="Color"&&(r.specular=new Te().fromArray(e.SpecularColor.value).convertSRGBToLinear());const s=this;return Wt.get(n).children.forEach(function(a){const o=a.relationship;switch(o){case"Bump":r.bumpMap=s.getTexture(t,a.ID);break;case"Maya|TEX_ao_map":r.aoMap=s.getTexture(t,a.ID);break;case"DiffuseColor":case"Maya|TEX_color_map":r.map=s.getTexture(t,a.ID),r.map!==void 0&&(r.map.colorSpace=jt);break;case"DisplacementColor":r.displacementMap=s.getTexture(t,a.ID);break;case"EmissiveColor":r.emissiveMap=s.getTexture(t,a.ID),r.emissiveMap!==void 0&&(r.emissiveMap.colorSpace=jt);break;case"NormalMap":case"Maya|TEX_normal_map":r.normalMap=s.getTexture(t,a.ID);break;case"ReflectionColor":r.envMap=s.getTexture(t,a.ID),r.envMap!==void 0&&(r.envMap.mapping=ba,r.envMap.colorSpace=jt);break;case"SpecularColor":r.specularMap=s.getTexture(t,a.ID),r.specularMap!==void 0&&(r.specularMap.colorSpace=jt);break;case"TransparentColor":case"TransparencyFactor":r.alphaMap=s.getTexture(t,a.ID),r.transparent=!0;break;case"AmbientColor":case"ShininessExponent":case"SpecularFactor":case"VectorDisplacementColor":default:console.warn("THREE.FBXLoader: %s map is not supported in three.js, skipping texture.",o);break}}),r}getTexture(e,t){return"LayeredTexture"in Je.Objects&&t in Je.Objects.LayeredTexture&&(console.warn("THREE.FBXLoader: layered textures are not supported in three.js. Discarding all but first layer."),t=Wt.get(t).children[0].ID),e.get(t)}parseDeformers(){const e={},t={};if("Deformer"in Je.Objects){const n=Je.Objects.Deformer;for(const r in n){const s=n[r],a=Wt.get(parseInt(r));if(s.attrType==="Skin"){const o=this.parseSkeleton(a,n);o.ID=r,a.parents.length>1&&console.warn("THREE.FBXLoader: skeleton attached to more than one geometry is not supported."),o.geometryID=a.parents[0].ID,e[r]=o}else if(s.attrType==="BlendShape"){const o={id:r};o.rawTargets=this.parseMorphTargets(a,n),o.id=r,a.parents.length>1&&console.warn("THREE.FBXLoader: morph target attached to more than one geometry is not supported."),t[r]=o}}}return{skeletons:e,morphTargets:t}}parseSkeleton(e,t){const n=[];return e.children.forEach(function(r){const s=t[r.ID];if(s.attrType!=="Cluster")return;const a={ID:r.ID,indices:[],weights:[],transformLink:new Ee().fromArray(s.TransformLink.a)};"Indexes"in s&&(a.indices=s.Indexes.a,a.weights=s.Weights.a),n.push(a)}),{rawBones:n,bones:[]}}parseMorphTargets(e,t){const n=[];for(let r=0;r<e.children.length;r++){const s=e.children[r],a=t[s.ID],o={name:a.attrName,initialWeight:a.DeformPercent,id:a.id,fullWeights:a.FullWeights.a};if(a.attrType!=="BlendShapeChannel")return;o.geoID=Wt.get(parseInt(s.ID)).children.filter(function(l){return l.relationship===void 0})[0].ID,n.push(o)}return n}parseScene(e,t,n){Dn=new tn;const r=this.parseModels(e.skeletons,t,n),s=Je.Objects.Model,a=this;r.forEach(function(l){const c=s[l.ID];a.setLookAtProperties(l,c),Wt.get(l.ID).parents.forEach(function(d){const h=r.get(d.ID);h!==void 0&&h.add(l)}),l.parent===null&&Dn.add(l)}),this.bindSkeleton(e.skeletons,t,r),this.addGlobalSceneSettings(),Dn.traverse(function(l){if(l.userData.transformData){l.parent&&(l.userData.transformData.parentMatrix=l.parent.matrix,l.userData.transformData.parentMatrixWorld=l.parent.matrixWorld);const c=af(l.userData.transformData);l.applyMatrix4(c),l.updateWorldMatrix()}});const o=new Kx().parse();Dn.children.length===1&&Dn.children[0].isGroup&&(Dn.children[0].animations=o,Dn=Dn.children[0]),Dn.animations=o}parseModels(e,t,n){const r=new Map,s=Je.Objects.Model;for(const a in s){const o=parseInt(a),l=s[a],c=Wt.get(o);let u=this.buildSkeleton(c,e,o,l.attrName);if(!u){switch(l.attrType){case"Camera":u=this.createCamera(c);break;case"Light":u=this.createLight(c);break;case"Mesh":u=this.createMesh(c,t,n);break;case"NurbsCurve":u=this.createCurve(c,t);break;case"LimbNode":case"Root":u=new mc;break;case"Null":default:u=new tn;break}u.name=l.attrName?ht.sanitizeNodeName(l.attrName):"",u.userData.originalName=l.attrName,u.ID=o}this.getTransformData(u,l),r.set(o,u)}return r}buildSkeleton(e,t,n,r){let s=null;return e.parents.forEach(function(a){for(const o in t){const l=t[o];l.rawBones.forEach(function(c,u){if(c.ID===a.ID){const d=s;s=new mc,s.matrixWorld.copy(c.transformLink),s.name=r?ht.sanitizeNodeName(r):"",s.userData.originalName=r,s.ID=n,l.bones[u]=s,d!==null&&s.add(d)}})}}),s}createCamera(e){let t,n;if(e.children.forEach(function(r){const s=Je.Objects.NodeAttribute[r.ID];s!==void 0&&(n=s)}),n===void 0)t=new pt;else{let r=0;n.CameraProjectionType!==void 0&&n.CameraProjectionType.value===1&&(r=1);let s=1;n.NearPlane!==void 0&&(s=n.NearPlane.value/1e3);let a=1e3;n.FarPlane!==void 0&&(a=n.FarPlane.value/1e3);let o=window.innerWidth,l=window.innerHeight;n.AspectWidth!==void 0&&n.AspectHeight!==void 0&&(o=n.AspectWidth.value,l=n.AspectHeight.value);const c=o/l;let u=45;n.FieldOfView!==void 0&&(u=n.FieldOfView.value);const d=n.FocalLength?n.FocalLength.value:null;switch(r){case 0:t=new In(u,c,s,a),d!==null&&t.setFocalLength(d);break;case 1:t=new Uc(-o/2,o/2,l/2,-l/2,s,a);break;default:console.warn("THREE.FBXLoader: Unknown camera type "+r+"."),t=new pt;break}}return t}createLight(e){let t,n;if(e.children.forEach(function(r){const s=Je.Objects.NodeAttribute[r.ID];s!==void 0&&(n=s)}),n===void 0)t=new pt;else{let r;n.LightType===void 0?r=0:r=n.LightType.value;let s=16777215;n.Color!==void 0&&(s=new Te().fromArray(n.Color.value).convertSRGBToLinear());let a=n.Intensity===void 0?1:n.Intensity.value/100;n.CastLightOnObject!==void 0&&n.CastLightOnObject.value===0&&(a=0);let o=0;n.FarAttenuationEnd!==void 0&&(n.EnableFarAttenuation!==void 0&&n.EnableFarAttenuation.value===0?o=0:o=n.FarAttenuationEnd.value);const l=1;switch(r){case 0:t=new Xd(s,a,o,l);break;case 1:t=new Zh(s,a);break;case 2:let c=Math.PI/3;n.InnerAngle!==void 0&&(c=Ct.degToRad(n.InnerAngle.value));let u=0;n.OuterAngle!==void 0&&(u=Ct.degToRad(n.OuterAngle.value),u=Math.max(u,1)),t=new ox(s,a,o,c,u,l);break;default:console.warn("THREE.FBXLoader: Unknown light type "+n.LightType.value+", defaulting to a PointLight."),t=new Xd(s,a);break}n.CastShadows!==void 0&&n.CastShadows.value===1&&(t.castShadow=!0)}return t}createMesh(e,t,n){let r,s=null,a=null;const o=[];return e.children.forEach(function(l){t.has(l.ID)&&(s=t.get(l.ID)),n.has(l.ID)&&o.push(n.get(l.ID))}),o.length>1?a=o:o.length>0?a=o[0]:(a=new ql({name:Wr.DEFAULT_MATERIAL_NAME,color:13421772}),o.push(a)),"color"in s.attributes&&o.forEach(function(l){l.vertexColors=!0}),s.FBX_Deformer?(r=new Mv(s,a),r.normalizeSkinWeights()):r=new X(s,a),r}createCurve(e,t){const n=e.children.reduce(function(s,a){return t.has(a.ID)&&(s=t.get(a.ID)),s},null),r=new Wh({name:Wr.DEFAULT_MATERIAL_NAME,color:3342591,linewidth:1});return new wv(n,r)}getTransformData(e,t){const n={};"InheritType"in t&&(n.inheritType=parseInt(t.InheritType.value)),"RotationOrder"in t?n.eulerOrder=lf(t.RotationOrder.value):n.eulerOrder="ZYX","Lcl_Translation"in t&&(n.translation=t.Lcl_Translation.value),"PreRotation"in t&&(n.preRotation=t.PreRotation.value),"Lcl_Rotation"in t&&(n.rotation=t.Lcl_Rotation.value),"PostRotation"in t&&(n.postRotation=t.PostRotation.value),"Lcl_Scaling"in t&&(n.scale=t.Lcl_Scaling.value),"ScalingOffset"in t&&(n.scalingOffset=t.ScalingOffset.value),"ScalingPivot"in t&&(n.scalingPivot=t.ScalingPivot.value),"RotationOffset"in t&&(n.rotationOffset=t.RotationOffset.value),"RotationPivot"in t&&(n.rotationPivot=t.RotationPivot.value),e.userData.transformData=n}setLookAtProperties(e,t){"LookAtProperty"in t&&Wt.get(e.ID).children.forEach(function(r){if(r.relationship==="LookAtProperty"){const s=Je.Objects.Model[r.ID];if("Lcl_Translation"in s){const a=s.Lcl_Translation.value;e.target!==void 0?(e.target.position.fromArray(a),Dn.add(e.target)):e.lookAt(new E().fromArray(a))}}})}bindSkeleton(e,t,n){const r=this.parsePoseNodes();for(const s in e){const a=e[s];Wt.get(parseInt(a.ID)).parents.forEach(function(l){if(t.has(l.ID)){const c=l.ID;Wt.get(c).parents.forEach(function(d){n.has(d.ID)&&n.get(d.ID).bind(new Nc(a.bones),r[d.ID])})}})}}parsePoseNodes(){const e={};if("Pose"in Je.Objects){const t=Je.Objects.Pose;for(const n in t)if(t[n].attrType==="BindPose"&&t[n].NbPoseNodes>0){const r=t[n].PoseNode;Array.isArray(r)?r.forEach(function(s){e[s.Node]=new Ee().fromArray(s.Matrix.a)}):e[r.Node]=new Ee().fromArray(r.Matrix.a)}}return e}addGlobalSceneSettings(){if("GlobalSettings"in Je){if("AmbientColor"in Je.GlobalSettings){const e=Je.GlobalSettings.AmbientColor.value,t=e[0],n=e[1],r=e[2];if(t!==0||n!==0||r!==0){const s=new Te(t,n,r).convertSRGBToLinear();Dn.add(new Kh(s,1))}}"UnitScaleFactor"in Je.GlobalSettings&&(Dn.userData.unitScaleFactor=Je.GlobalSettings.UnitScaleFactor.value)}}}class Zx{constructor(){this.negativeMaterialIndices=!1}parse(e){const t=new Map;if("Geometry"in Je.Objects){const n=Je.Objects.Geometry;for(const r in n){const s=Wt.get(parseInt(r)),a=this.parseGeometry(s,n[r],e);t.set(parseInt(r),a)}}return this.negativeMaterialIndices===!0&&console.warn("THREE.FBXLoader: The FBX file contains invalid (negative) material indices. The asset might not render as expected."),t}parseGeometry(e,t,n){switch(t.attrType){case"Mesh":return this.parseMeshGeometry(e,t,n);case"NurbsCurve":return this.parseNurbsGeometry(t)}}parseMeshGeometry(e,t,n){const r=n.skeletons,s=[],a=e.parents.map(function(d){return Je.Objects.Model[d.ID]});if(a.length===0)return;const o=e.children.reduce(function(d,h){return r[h.ID]!==void 0&&(d=r[h.ID]),d},null);e.children.forEach(function(d){n.morphTargets[d.ID]!==void 0&&s.push(n.morphTargets[d.ID])});const l=a[0],c={};"RotationOrder"in l&&(c.eulerOrder=lf(l.RotationOrder.value)),"InheritType"in l&&(c.inheritType=parseInt(l.InheritType.value)),"GeometricTranslation"in l&&(c.translation=l.GeometricTranslation.value),"GeometricRotation"in l&&(c.rotation=l.GeometricRotation.value),"GeometricScaling"in l&&(c.scale=l.GeometricScaling.value);const u=af(c);return this.genGeometry(t,o,s,u)}genGeometry(e,t,n,r){const s=new jn;e.attrName&&(s.name=e.attrName);const a=this.parseGeoNode(e,t),o=this.genBuffers(a),l=new en(o.vertex,3);if(l.applyMatrix4(r),s.setAttribute("position",l),o.colors.length>0&&s.setAttribute("color",new en(o.colors,3)),t&&(s.setAttribute("skinIndex",new Dc(o.weightsIndices,4)),s.setAttribute("skinWeight",new en(o.vertexWeights,4)),s.FBX_Deformer=t),o.normal.length>0){const c=new Qe().getNormalMatrix(r),u=new en(o.normal,3);u.applyNormalMatrix(c),s.setAttribute("normal",u)}if(o.uvs.forEach(function(c,u){const d=u===0?"uv":`uv${u}`;s.setAttribute(d,new en(o.uvs[u],2))}),a.material&&a.material.mappingType!=="AllSame"){let c=o.materialIndex[0],u=0;if(o.materialIndex.forEach(function(d,h){d!==c&&(s.addGroup(u,h-u,c),c=d,u=h)}),s.groups.length>0){const d=s.groups[s.groups.length-1],h=d.start+d.count;h!==o.materialIndex.length&&s.addGroup(h,o.materialIndex.length-h,c)}s.groups.length===0&&s.addGroup(0,o.materialIndex.length,o.materialIndex[0])}return this.addMorphTargets(s,e,n,r),s}parseGeoNode(e,t){const n={};if(n.vertexPositions=e.Vertices!==void 0?e.Vertices.a:[],n.vertexIndices=e.PolygonVertexIndex!==void 0?e.PolygonVertexIndex.a:[],e.LayerElementColor&&(n.color=this.parseVertexColors(e.LayerElementColor[0])),e.LayerElementMaterial&&(n.material=this.parseMaterialIndices(e.LayerElementMaterial[0])),e.LayerElementNormal&&(n.normal=this.parseNormals(e.LayerElementNormal[0])),e.LayerElementUV){n.uv=[];let r=0;for(;e.LayerElementUV[r];)e.LayerElementUV[r].UV&&n.uv.push(this.parseUVs(e.LayerElementUV[r])),r++}return n.weightTable={},t!==null&&(n.skeleton=t,t.rawBones.forEach(function(r,s){r.indices.forEach(function(a,o){n.weightTable[a]===void 0&&(n.weightTable[a]=[]),n.weightTable[a].push({id:s,weight:r.weights[o]})})})),n}genBuffers(e){const t={vertex:[],normal:[],colors:[],uvs:[],materialIndex:[],vertexWeights:[],weightsIndices:[]};let n=0,r=0,s=!1,a=[],o=[],l=[],c=[],u=[],d=[];const h=this;return e.vertexIndices.forEach(function(f,g){let _,p=!1;f<0&&(f=f^-1,p=!0);let m=[],v=[];if(a.push(f*3,f*3+1,f*3+2),e.color){const y=ya(g,n,f,e.color);l.push(y[0],y[1],y[2])}if(e.skeleton){if(e.weightTable[f]!==void 0&&e.weightTable[f].forEach(function(y){v.push(y.weight),m.push(y.id)}),v.length>4){s||(console.warn("THREE.FBXLoader: Vertex has more than 4 skinning weights assigned to vertex. Deleting additional weights."),s=!0);const y=[0,0,0,0],M=[0,0,0,0];v.forEach(function(P,A){let R=P,I=m[A];M.forEach(function(S,T,G){if(R>S){G[T]=R,R=S;const V=y[T];y[T]=I,I=V}})}),m=y,v=M}for(;v.length<4;)v.push(0),m.push(0);for(let y=0;y<4;++y)u.push(v[y]),d.push(m[y])}if(e.normal){const y=ya(g,n,f,e.normal);o.push(y[0],y[1],y[2])}e.material&&e.material.mappingType!=="AllSame"&&(_=ya(g,n,f,e.material)[0],_<0&&(h.negativeMaterialIndices=!0,_=0)),e.uv&&e.uv.forEach(function(y,M){const P=ya(g,n,f,y);c[M]===void 0&&(c[M]=[]),c[M].push(P[0]),c[M].push(P[1])}),r++,p&&(h.genFace(t,e,a,_,o,l,c,u,d,r),n++,r=0,a=[],o=[],l=[],c=[],u=[],d=[])}),t}getNormalNewell(e){const t=new E(0,0,0);for(let n=0;n<e.length;n++){const r=e[n],s=e[(n+1)%e.length];t.x+=(r.y-s.y)*(r.z+s.z),t.y+=(r.z-s.z)*(r.x+s.x),t.z+=(r.x-s.x)*(r.y+s.y)}return t.normalize(),t}getNormalTangentAndBitangent(e){const t=this.getNormalNewell(e),r=(Math.abs(t.z)>.5?new E(0,1,0):new E(0,0,1)).cross(t).normalize(),s=t.clone().cross(r).normalize();return{normal:t,tangent:r,bitangent:s}}flattenVertex(e,t,n){return new ot(e.dot(t),e.dot(n))}genFace(e,t,n,r,s,a,o,l,c,u){let d;if(u>3){const h=[];for(let p=0;p<n.length;p+=3)h.push(new E(t.vertexPositions[n[p]],t.vertexPositions[n[p+1]],t.vertexPositions[n[p+2]]));const{tangent:f,bitangent:g}=this.getNormalTangentAndBitangent(h),_=[];for(const p of h)_.push(this.flattenVertex(p,f,g));d=Oc.triangulateShape(_,[])}else d=[[0,1,2]];for(const[h,f,g]of d)e.vertex.push(t.vertexPositions[n[h*3]]),e.vertex.push(t.vertexPositions[n[h*3+1]]),e.vertex.push(t.vertexPositions[n[h*3+2]]),e.vertex.push(t.vertexPositions[n[f*3]]),e.vertex.push(t.vertexPositions[n[f*3+1]]),e.vertex.push(t.vertexPositions[n[f*3+2]]),e.vertex.push(t.vertexPositions[n[g*3]]),e.vertex.push(t.vertexPositions[n[g*3+1]]),e.vertex.push(t.vertexPositions[n[g*3+2]]),t.skeleton&&(e.vertexWeights.push(l[h*4]),e.vertexWeights.push(l[h*4+1]),e.vertexWeights.push(l[h*4+2]),e.vertexWeights.push(l[h*4+3]),e.vertexWeights.push(l[f*4]),e.vertexWeights.push(l[f*4+1]),e.vertexWeights.push(l[f*4+2]),e.vertexWeights.push(l[f*4+3]),e.vertexWeights.push(l[g*4]),e.vertexWeights.push(l[g*4+1]),e.vertexWeights.push(l[g*4+2]),e.vertexWeights.push(l[g*4+3]),e.weightsIndices.push(c[h*4]),e.weightsIndices.push(c[h*4+1]),e.weightsIndices.push(c[h*4+2]),e.weightsIndices.push(c[h*4+3]),e.weightsIndices.push(c[f*4]),e.weightsIndices.push(c[f*4+1]),e.weightsIndices.push(c[f*4+2]),e.weightsIndices.push(c[f*4+3]),e.weightsIndices.push(c[g*4]),e.weightsIndices.push(c[g*4+1]),e.weightsIndices.push(c[g*4+2]),e.weightsIndices.push(c[g*4+3])),t.color&&(e.colors.push(a[h*3]),e.colors.push(a[h*3+1]),e.colors.push(a[h*3+2]),e.colors.push(a[f*3]),e.colors.push(a[f*3+1]),e.colors.push(a[f*3+2]),e.colors.push(a[g*3]),e.colors.push(a[g*3+1]),e.colors.push(a[g*3+2])),t.material&&t.material.mappingType!=="AllSame"&&(e.materialIndex.push(r),e.materialIndex.push(r),e.materialIndex.push(r)),t.normal&&(e.normal.push(s[h*3]),e.normal.push(s[h*3+1]),e.normal.push(s[h*3+2]),e.normal.push(s[f*3]),e.normal.push(s[f*3+1]),e.normal.push(s[f*3+2]),e.normal.push(s[g*3]),e.normal.push(s[g*3+1]),e.normal.push(s[g*3+2])),t.uv&&t.uv.forEach(function(_,p){e.uvs[p]===void 0&&(e.uvs[p]=[]),e.uvs[p].push(o[p][h*2]),e.uvs[p].push(o[p][h*2+1]),e.uvs[p].push(o[p][f*2]),e.uvs[p].push(o[p][f*2+1]),e.uvs[p].push(o[p][g*2]),e.uvs[p].push(o[p][g*2+1])})}addMorphTargets(e,t,n,r){if(n.length===0)return;e.morphTargetsRelative=!0,e.morphAttributes.position=[];const s=this;n.forEach(function(a){a.rawTargets.forEach(function(o){const l=Je.Objects.Geometry[o.geoID];l!==void 0&&s.genMorphGeometry(e,t,l,r,o.name)})})}genMorphGeometry(e,t,n,r,s){const a=t.PolygonVertexIndex!==void 0?t.PolygonVertexIndex.a:[],o=n.Vertices!==void 0?n.Vertices.a:[],l=n.Indexes!==void 0?n.Indexes.a:[],c=e.attributes.position.count*3,u=new Float32Array(c);for(let g=0;g<l.length;g++){const _=l[g]*3;u[_]=o[g*3],u[_+1]=o[g*3+1],u[_+2]=o[g*3+2]}const d={vertexIndices:a,vertexPositions:u},h=this.genBuffers(d),f=new en(h.vertex,3);f.name=s||n.attrName,f.applyMatrix4(r),e.morphAttributes.position.push(f)}parseNormals(e){const t=e.MappingInformationType,n=e.ReferenceInformationType,r=e.Normals.a;let s=[];return n==="IndexToDirect"&&("NormalIndex"in e?s=e.NormalIndex.a:"NormalsIndex"in e&&(s=e.NormalsIndex.a)),{dataSize:3,buffer:r,indices:s,mappingType:t,referenceType:n}}parseUVs(e){const t=e.MappingInformationType,n=e.ReferenceInformationType,r=e.UV.a;let s=[];return n==="IndexToDirect"&&(s=e.UVIndex.a),{dataSize:2,buffer:r,indices:s,mappingType:t,referenceType:n}}parseVertexColors(e){const t=e.MappingInformationType,n=e.ReferenceInformationType,r=e.Colors.a;let s=[];n==="IndexToDirect"&&(s=e.ColorIndex.a);for(let a=0,o=new Te;a<r.length;a+=4)o.fromArray(r,a).convertSRGBToLinear().toArray(r,a);return{dataSize:4,buffer:r,indices:s,mappingType:t,referenceType:n}}parseMaterialIndices(e){const t=e.MappingInformationType,n=e.ReferenceInformationType;if(t==="NoMappingInformation")return{dataSize:1,buffer:[0],indices:[0],mappingType:"AllSame",referenceType:n};const r=e.Materials.a,s=[];for(let a=0;a<r.length;++a)s.push(a);return{dataSize:1,buffer:r,indices:s,mappingType:t,referenceType:n}}parseNurbsGeometry(e){const t=parseInt(e.Order);if(isNaN(t))return console.error("THREE.FBXLoader: Invalid Order %s given for geometry ID: %s",e.Order,e.id),new jn;const n=t-1,r=e.KnotVector.a,s=[],a=e.Points.a;for(let d=0,h=a.length;d<h;d+=4)s.push(new yt().fromArray(a,d));let o,l;if(e.Form==="Closed")s.push(s[0]);else if(e.Form==="Periodic"){o=n,l=r.length-1-o;for(let d=0;d<n;++d)s.push(s[d])}const u=new qx(n,r,s,o,l).getPoints(s.length*12);return new jn().setFromPoints(u)}}class Kx{parse(){const e=[],t=this.parseClips();if(t!==void 0)for(const n in t){const r=t[n],s=this.addClip(r);e.push(s)}return e}parseClips(){if(Je.Objects.AnimationCurve===void 0)return;const e=this.parseAnimationCurveNodes();this.parseAnimationCurves(e);const t=this.parseAnimationLayers(e);return this.parseAnimStacks(t)}parseAnimationCurveNodes(){const e=Je.Objects.AnimationCurveNode,t=new Map;for(const n in e){const r=e[n];if(r.attrName.match(/S|R|T|DeformPercent/)!==null){const s={id:r.id,attr:r.attrName,curves:{}};t.set(s.id,s)}}return t}parseAnimationCurves(e){const t=Je.Objects.AnimationCurve;for(const n in t){const r={id:t[n].id,times:t[n].KeyTime.a.map(nM),values:t[n].KeyValueFloat.a},s=Wt.get(r.id);if(s!==void 0){const a=s.parents[0].ID,o=s.parents[0].relationship;o.match(/X/)?e.get(a).curves.x=r:o.match(/Y/)?e.get(a).curves.y=r:o.match(/Z/)?e.get(a).curves.z=r:o.match(/DeformPercent/)&&e.has(a)&&(e.get(a).curves.morph=r)}}}parseAnimationLayers(e){const t=Je.Objects.AnimationLayer,n=new Map;for(const r in t){const s=[],a=Wt.get(parseInt(r));a!==void 0&&(a.children.forEach(function(l,c){if(e.has(l.ID)){const u=e.get(l.ID);if(u.curves.x!==void 0||u.curves.y!==void 0||u.curves.z!==void 0){if(s[c]===void 0){const d=Wt.get(l.ID).parents.filter(function(h){return h.relationship!==void 0})[0].ID;if(d!==void 0){const h=Je.Objects.Model[d.toString()];if(h===void 0){console.warn("THREE.FBXLoader: Encountered a unused curve.",l);return}const f={modelName:h.attrName?ht.sanitizeNodeName(h.attrName):"",ID:h.id,initialPosition:[0,0,0],initialRotation:[0,0,0],initialScale:[1,1,1]};Dn.traverse(function(g){g.ID===h.id&&(f.transform=g.matrix,g.userData.transformData&&(f.eulerOrder=g.userData.transformData.eulerOrder))}),f.transform||(f.transform=new Ee),"PreRotation"in h&&(f.preRotation=h.PreRotation.value),"PostRotation"in h&&(f.postRotation=h.PostRotation.value),s[c]=f}}s[c]&&(s[c][u.attr]=u)}else if(u.curves.morph!==void 0){if(s[c]===void 0){const d=Wt.get(l.ID).parents.filter(function(m){return m.relationship!==void 0})[0].ID,h=Wt.get(d).parents[0].ID,f=Wt.get(h).parents[0].ID,g=Wt.get(f).parents[0].ID,_=Je.Objects.Model[g],p={modelName:_.attrName?ht.sanitizeNodeName(_.attrName):"",morphName:Je.Objects.Deformer[d].attrName};s[c]=p}s[c][u.attr]=u}}}),n.set(parseInt(r),s))}return n}parseAnimStacks(e){const t=Je.Objects.AnimationStack,n={};for(const r in t){const s=Wt.get(parseInt(r)).children;s.length>1&&console.warn("THREE.FBXLoader: Encountered an animation stack with multiple layers, this is currently not supported. Ignoring subsequent layers.");const a=e.get(s[0].ID);n[r]={name:t[r].attrName,layer:a}}return n}addClip(e){let t=[];const n=this;return e.layer.forEach(function(r){t=t.concat(n.generateTracks(r))}),new Zv(e.name,-1,t)}generateTracks(e){const t=[];let n=new E,r=new E;if(e.transform&&e.transform.decompose(n,new Qt,r),n=n.toArray(),r=r.toArray(),e.T!==void 0&&Object.keys(e.T.curves).length>0){const s=this.generateVectorTrack(e.modelName,e.T.curves,n,"position");s!==void 0&&t.push(s)}if(e.R!==void 0&&Object.keys(e.R.curves).length>0){const s=this.generateRotationTrack(e.modelName,e.R.curves,e.preRotation,e.postRotation,e.eulerOrder);s!==void 0&&t.push(s)}if(e.S!==void 0&&Object.keys(e.S.curves).length>0){const s=this.generateVectorTrack(e.modelName,e.S.curves,r,"scale");s!==void 0&&t.push(s)}if(e.DeformPercent!==void 0){const s=this.generateMorphTrack(e);s!==void 0&&t.push(s)}return t}generateVectorTrack(e,t,n,r){const s=this.getTimesForAllAxes(t),a=this.getKeyframeTrackValues(s,t,n);return new Eo(e+"."+r,s,a)}generateRotationTrack(e,t,n,r,s){let a,o;if(t.x!==void 0&&t.y!==void 0&&t.z!==void 0){const d=this.interpolateRotations(t.x,t.y,t.z,s);a=d[0],o=d[1]}n!==void 0&&(n=n.map(Ct.degToRad),n.push(s),n=new _t().fromArray(n),n=new Qt().setFromEuler(n)),r!==void 0&&(r=r.map(Ct.degToRad),r.push(s),r=new _t().fromArray(r),r=new Qt().setFromEuler(r).invert());const l=new Qt,c=new _t,u=[];if(!o||!a)return new Vr(e+".quaternion",[],[]);for(let d=0;d<o.length;d+=3)c.set(o[d],o[d+1],o[d+2],s),l.setFromEuler(c),n!==void 0&&l.premultiply(n),r!==void 0&&l.multiply(r),d>2&&new Qt().fromArray(u,(d-3)/3*4).dot(l)<0&&l.set(-l.x,-l.y,-l.z,-l.w),l.toArray(u,d/3*4);return new Vr(e+".quaternion",a,u)}generateMorphTrack(e){const t=e.DeformPercent.curves.morph,n=t.values.map(function(s){return s/100}),r=Dn.getObjectByName(e.modelName).morphTargetDictionary[e.morphName];return new So(e.modelName+".morphTargetInfluences["+r+"]",t.times,n)}getTimesForAllAxes(e){let t=[];if(e.x!==void 0&&(t=t.concat(e.x.times)),e.y!==void 0&&(t=t.concat(e.y.times)),e.z!==void 0&&(t=t.concat(e.z.times)),t=t.sort(function(n,r){return n-r}),t.length>1){let n=1,r=t[0];for(let s=1;s<t.length;s++){const a=t[s];a!==r&&(t[n]=a,r=a,n++)}t=t.slice(0,n)}return t}getKeyframeTrackValues(e,t,n){const r=n,s=[];let a=-1,o=-1,l=-1;return e.forEach(function(c){if(t.x&&(a=t.x.times.indexOf(c)),t.y&&(o=t.y.times.indexOf(c)),t.z&&(l=t.z.times.indexOf(c)),a!==-1){const u=t.x.values[a];s.push(u),r[0]=u}else s.push(r[0]);if(o!==-1){const u=t.y.values[o];s.push(u),r[1]=u}else s.push(r[1]);if(l!==-1){const u=t.z.values[l];s.push(u),r[2]=u}else s.push(r[2])}),s}interpolateRotations(e,t,n,r){const s=[],a=[];s.push(e.times[0]),a.push(Ct.degToRad(e.values[0])),a.push(Ct.degToRad(t.values[0])),a.push(Ct.degToRad(n.values[0]));for(let o=1;o<e.values.length;o++){const l=[e.values[o-1],t.values[o-1],n.values[o-1]];if(isNaN(l[0])||isNaN(l[1])||isNaN(l[2]))continue;const c=l.map(Ct.degToRad),u=[e.values[o],t.values[o],n.values[o]];if(isNaN(u[0])||isNaN(u[1])||isNaN(u[2]))continue;const d=u.map(Ct.degToRad),h=[u[0]-l[0],u[1]-l[1],u[2]-l[2]],f=[Math.abs(h[0]),Math.abs(h[1]),Math.abs(h[2])];if(f[0]>=180||f[1]>=180||f[2]>=180){const _=Math.max(...f)/180,p=new _t(...c,r),m=new _t(...d,r),v=new Qt().setFromEuler(p),y=new Qt().setFromEuler(m);v.dot(y)&&y.set(-y.x,-y.y,-y.z,-y.w);const M=e.times[o-1],P=e.times[o]-M,A=new Qt,R=new _t;for(let I=0;I<1;I+=1/_)A.copy(v.clone().slerp(y.clone(),I)),s.push(M+I*P),R.setFromQuaternion(A,r),a.push(R.x),a.push(R.y),a.push(R.z)}else s.push(e.times[o]),a.push(Ct.degToRad(e.values[o])),a.push(Ct.degToRad(t.values[o])),a.push(Ct.degToRad(n.values[o]))}return[s,a]}}class Jx{getPrevNode(){return this.nodeStack[this.currentIndent-2]}getCurrentNode(){return this.nodeStack[this.currentIndent-1]}getCurrentProp(){return this.currentProp}pushStack(e){this.nodeStack.push(e),this.currentIndent+=1}popStack(){this.nodeStack.pop(),this.currentIndent-=1}setCurrentProp(e,t){this.currentProp=e,this.currentPropName=t}parse(e){this.currentIndent=0,this.allNodes=new of,this.nodeStack=[],this.currentProp=[],this.currentPropName="";const t=this,n=e.split(/[\r\n]+/);return n.forEach(function(r,s){const a=r.match(/^[\s\t]*;/),o=r.match(/^[\s\t]*$/);if(a||o)return;const l=r.match("^\\t{"+t.currentIndent+"}(\\w+):(.*){",""),c=r.match("^\\t{"+t.currentIndent+"}(\\w+):[\\s\\t\\r\\n](.*)"),u=r.match("^\\t{"+(t.currentIndent-1)+"}}");l?t.parseNodeBegin(r,l):c?t.parseNodeProperty(r,c,n[++s]):u?t.popStack():r.match(/^[^\s\t}]/)&&t.parseNodePropertyContinued(r)}),this.allNodes}parseNodeBegin(e,t){const n=t[1].trim().replace(/^"/,"").replace(/"$/,""),r=t[2].split(",").map(function(l){return l.trim().replace(/^"/,"").replace(/"$/,"")}),s={name:n},a=this.parseNodeAttr(r),o=this.getCurrentNode();this.currentIndent===0?this.allNodes.add(n,s):n in o?(n==="PoseNode"?o.PoseNode.push(s):o[n].id!==void 0&&(o[n]={},o[n][o[n].id]=o[n]),a.id!==""&&(o[n][a.id]=s)):typeof a.id=="number"?(o[n]={},o[n][a.id]=s):n!=="Properties70"&&(n==="PoseNode"?o[n]=[s]:o[n]=s),typeof a.id=="number"&&(s.id=a.id),a.name!==""&&(s.attrName=a.name),a.type!==""&&(s.attrType=a.type),this.pushStack(s)}parseNodeAttr(e){let t=e[0];e[0]!==""&&(t=parseInt(e[0]),isNaN(t)&&(t=e[0]));let n="",r="";return e.length>1&&(n=e[1].replace(/^(\w+)::/,""),r=e[2]),{id:t,name:n,type:r}}parseNodeProperty(e,t,n){let r=t[1].replace(/^"/,"").replace(/"$/,"").trim(),s=t[2].replace(/^"/,"").replace(/"$/,"").trim();r==="Content"&&s===","&&(s=n.replace(/"/g,"").replace(/,$/,"").trim());const a=this.getCurrentNode();if(a.name==="Properties70"){this.parseNodeSpecialProperty(e,r,s);return}if(r==="C"){const l=s.split(",").slice(1),c=parseInt(l[0]),u=parseInt(l[1]);let d=s.split(",").slice(3);d=d.map(function(h){return h.trim().replace(/^"/,"")}),r="connections",s=[c,u],rM(s,d),a[r]===void 0&&(a[r]=[])}r==="Node"&&(a.id=s),r in a&&Array.isArray(a[r])?a[r].push(s):r!=="a"?a[r]=s:a.a=s,this.setCurrentProp(a,r),r==="a"&&s.slice(-1)!==","&&(a.a=Ql(s))}parseNodePropertyContinued(e){const t=this.getCurrentNode();t.a+=e,e.slice(-1)!==","&&(t.a=Ql(t.a))}parseNodeSpecialProperty(e,t,n){const r=n.split('",').map(function(u){return u.trim().replace(/^\"/,"").replace(/\s/,"_")}),s=r[0],a=r[1],o=r[2],l=r[3];let c=r[4];switch(a){case"int":case"enum":case"bool":case"ULongLong":case"double":case"Number":case"FieldOfView":c=parseFloat(c);break;case"Color":case"ColorRGB":case"Vector3D":case"Lcl_Translation":case"Lcl_Rotation":case"Lcl_Scaling":c=Ql(c);break}this.getPrevNode()[s]={type:a,type2:o,flag:l,value:c},this.setCurrentProp(this.getPrevNode(),s)}}class Qx{parse(e){const t=new Yd(e);t.skip(23);const n=t.getUint32();if(n<6400)throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: "+n);const r=new of;for(;!this.endOfContent(t);){const s=this.parseNode(t,n);s!==null&&r.add(s.name,s)}return r}endOfContent(e){return e.size()%16===0?(e.getOffset()+160+16&-16)>=e.size():e.getOffset()+160+16>=e.size()}parseNode(e,t){const n={},r=t>=7500?e.getUint64():e.getUint32(),s=t>=7500?e.getUint64():e.getUint32();t>=7500?e.getUint64():e.getUint32();const a=e.getUint8(),o=e.getString(a);if(r===0)return null;const l=[];for(let h=0;h<s;h++)l.push(this.parseProperty(e));const c=l.length>0?l[0]:"",u=l.length>1?l[1]:"",d=l.length>2?l[2]:"";for(n.singleProperty=s===1&&e.getOffset()===r;r>e.getOffset();){const h=this.parseNode(e,t);h!==null&&this.parseSubNode(o,n,h)}return n.propertyList=l,typeof c=="number"&&(n.id=c),u!==""&&(n.attrName=u),d!==""&&(n.attrType=d),o!==""&&(n.name=o),n}parseSubNode(e,t,n){if(n.singleProperty===!0){const r=n.propertyList[0];Array.isArray(r)?(t[n.name]=n,n.a=r):t[n.name]=r}else if(e==="Connections"&&n.name==="C"){const r=[];n.propertyList.forEach(function(s,a){a!==0&&r.push(s)}),t.connections===void 0&&(t.connections=[]),t.connections.push(r)}else if(n.name==="Properties70")Object.keys(n).forEach(function(s){t[s]=n[s]});else if(e==="Properties70"&&n.name==="P"){let r=n.propertyList[0],s=n.propertyList[1];const a=n.propertyList[2],o=n.propertyList[3];let l;r.indexOf("Lcl ")===0&&(r=r.replace("Lcl ","Lcl_")),s.indexOf("Lcl ")===0&&(s=s.replace("Lcl ","Lcl_")),s==="Color"||s==="ColorRGB"||s==="Vector"||s==="Vector3D"||s.indexOf("Lcl_")===0?l=[n.propertyList[4],n.propertyList[5],n.propertyList[6]]:l=n.propertyList[4],t[r]={type:s,type2:a,flag:o,value:l}}else t[n.name]===void 0?typeof n.id=="number"?(t[n.name]={},t[n.name][n.id]=n):t[n.name]=n:n.name==="PoseNode"?(Array.isArray(t[n.name])||(t[n.name]=[t[n.name]]),t[n.name].push(n)):t[n.name][n.id]===void 0&&(t[n.name][n.id]=n)}parseProperty(e){const t=e.getString(1);let n;switch(t){case"C":return e.getBoolean();case"D":return e.getFloat64();case"F":return e.getFloat32();case"I":return e.getInt32();case"L":return e.getInt64();case"R":return n=e.getUint32(),e.getArrayBuffer(n);case"S":return n=e.getUint32(),e.getString(n);case"Y":return e.getInt16();case"b":case"c":case"d":case"f":case"i":case"l":const r=e.getUint32(),s=e.getUint32(),a=e.getUint32();if(s===0)switch(t){case"b":case"c":return e.getBooleanArray(r);case"d":return e.getFloat64Array(r);case"f":return e.getFloat32Array(r);case"i":return e.getInt32Array(r);case"l":return e.getInt64Array(r)}const o=Ox(new Uint8Array(e.getArrayBuffer(a))),l=new Yd(o.buffer);switch(t){case"b":case"c":return l.getBooleanArray(r);case"d":return l.getFloat64Array(r);case"f":return l.getFloat32Array(r);case"i":return l.getInt32Array(r);case"l":return l.getInt64Array(r)}break;default:throw new Error("THREE.FBXLoader: Unknown property type "+t)}}}class Yd{constructor(e,t){this.dv=new DataView(e),this.offset=0,this.littleEndian=t!==void 0?t:!0,this._textDecoder=new TextDecoder}getOffset(){return this.offset}size(){return this.dv.buffer.byteLength}skip(e){this.offset+=e}getBoolean(){return(this.getUint8()&1)===1}getBooleanArray(e){const t=[];for(let n=0;n<e;n++)t.push(this.getBoolean());return t}getUint8(){const e=this.dv.getUint8(this.offset);return this.offset+=1,e}getInt16(){const e=this.dv.getInt16(this.offset,this.littleEndian);return this.offset+=2,e}getInt32(){const e=this.dv.getInt32(this.offset,this.littleEndian);return this.offset+=4,e}getInt32Array(e){const t=[];for(let n=0;n<e;n++)t.push(this.getInt32());return t}getUint32(){const e=this.dv.getUint32(this.offset,this.littleEndian);return this.offset+=4,e}getInt64(){let e,t;return this.littleEndian?(e=this.getUint32(),t=this.getUint32()):(t=this.getUint32(),e=this.getUint32()),t&2147483648?(t=~t&4294967295,e=~e&4294967295,e===4294967295&&(t=t+1&4294967295),e=e+1&4294967295,-(t*4294967296+e)):t*4294967296+e}getInt64Array(e){const t=[];for(let n=0;n<e;n++)t.push(this.getInt64());return t}getUint64(){let e,t;return this.littleEndian?(e=this.getUint32(),t=this.getUint32()):(t=this.getUint32(),e=this.getUint32()),t*4294967296+e}getFloat32(){const e=this.dv.getFloat32(this.offset,this.littleEndian);return this.offset+=4,e}getFloat32Array(e){const t=[];for(let n=0;n<e;n++)t.push(this.getFloat32());return t}getFloat64(){const e=this.dv.getFloat64(this.offset,this.littleEndian);return this.offset+=8,e}getFloat64Array(e){const t=[];for(let n=0;n<e;n++)t.push(this.getFloat64());return t}getArrayBuffer(e){const t=this.dv.buffer.slice(this.offset,this.offset+e);return this.offset+=e,t}getString(e){const t=this.offset;let n=new Uint8Array(this.dv.buffer,t,e);this.skip(e);const r=n.indexOf(0);return r>=0&&(n=new Uint8Array(this.dv.buffer,t,r)),this._textDecoder.decode(n)}}class of{add(e,t){this[e]=t}}function eM(i){const e="Kaydara FBX Binary  \0";return i.byteLength>=e.length&&e===cf(i,0,e.length)}function tM(i){const e=["K","a","y","d","a","r","a","\\","F","B","X","\\","B","i","n","a","r","y","\\","\\"];let t=0;function n(r){const s=i[r-1];return i=i.slice(t+r),t++,s}for(let r=0;r<e.length;++r)if(n(1)===e[r])return!1;return!0}function Zd(i){const e=/FBXVersion: (\d+)/,t=i.match(e);if(t)return parseInt(t[1]);throw new Error("THREE.FBXLoader: Cannot find the version number for the file given.")}function nM(i){return i/46186158e3}const iM=[];function ya(i,e,t,n){let r;switch(n.mappingType){case"ByPolygonVertex":r=i;break;case"ByPolygon":r=e;break;case"ByVertice":r=t;break;case"AllSame":r=n.indices[0];break;default:console.warn("THREE.FBXLoader: unknown attribute mapping type "+n.mappingType)}n.referenceType==="IndexToDirect"&&(r=n.indices[r]);const s=r*n.dataSize,a=s+n.dataSize;return sM(iM,n.buffer,s,a)}const Jl=new _t,gs=new E;function af(i){const e=new Ee,t=new Ee,n=new Ee,r=new Ee,s=new Ee,a=new Ee,o=new Ee,l=new Ee,c=new Ee,u=new Ee,d=new Ee,h=new Ee,f=i.inheritType?i.inheritType:0;if(i.translation&&e.setPosition(gs.fromArray(i.translation)),i.preRotation){const T=i.preRotation.map(Ct.degToRad);T.push(i.eulerOrder||_t.DEFAULT_ORDER),t.makeRotationFromEuler(Jl.fromArray(T))}if(i.rotation){const T=i.rotation.map(Ct.degToRad);T.push(i.eulerOrder||_t.DEFAULT_ORDER),n.makeRotationFromEuler(Jl.fromArray(T))}if(i.postRotation){const T=i.postRotation.map(Ct.degToRad);T.push(i.eulerOrder||_t.DEFAULT_ORDER),r.makeRotationFromEuler(Jl.fromArray(T)),r.invert()}i.scale&&s.scale(gs.fromArray(i.scale)),i.scalingOffset&&o.setPosition(gs.fromArray(i.scalingOffset)),i.scalingPivot&&a.setPosition(gs.fromArray(i.scalingPivot)),i.rotationOffset&&l.setPosition(gs.fromArray(i.rotationOffset)),i.rotationPivot&&c.setPosition(gs.fromArray(i.rotationPivot)),i.parentMatrixWorld&&(d.copy(i.parentMatrix),u.copy(i.parentMatrixWorld));const g=t.clone().multiply(n).multiply(r),_=new Ee;_.extractRotation(u);const p=new Ee;p.copyPosition(u);const m=p.clone().invert().multiply(u),v=_.clone().invert().multiply(m),y=s,M=new Ee;if(f===0)M.copy(_).multiply(g).multiply(v).multiply(y);else if(f===1)M.copy(_).multiply(v).multiply(g).multiply(y);else{const G=new Ee().scale(new E().setFromMatrixScale(d)).clone().invert(),V=v.clone().multiply(G);M.copy(_).multiply(g).multiply(V).multiply(y)}const P=c.clone().invert(),A=a.clone().invert();let R=e.clone().multiply(l).multiply(c).multiply(t).multiply(n).multiply(r).multiply(P).multiply(o).multiply(a).multiply(s).multiply(A);const I=new Ee().copyPosition(R),S=u.clone().multiply(I);return h.copyPosition(S),R=h.clone().multiply(M),R.premultiply(u.invert()),R}function lf(i){i=i||0;const e=["ZYX","YZX","XZY","ZXY","YXZ","XYZ"];return i===6?(console.warn("THREE.FBXLoader: unsupported Euler Order: Spherical XYZ. Animations and rotations may be incorrect."),e[0]):e[i]}function Ql(i){return i.split(",").map(function(t){return parseFloat(t)})}function cf(i,e,t){return e===void 0&&(e=0),t===void 0&&(t=i.byteLength),new TextDecoder().decode(new Uint8Array(i,e,t))}function rM(i,e){for(let t=0,n=i.length,r=e.length;t<r;t++,n++)i[n]=e[t]}function sM(i,e,t,n){for(let r=t,s=0;r<n;r++,s++)i[s]=e[r];return i}class vn{constructor(e){this.seed=e}next(){let e=this.seed+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}nextInt(e,t){return Math.floor(this.next()*(t-e+1))+e}randFloat(e,t){return e+this.next()*(t-e)}}let N=null,wi=null,Be=null;const ec=12345,oM=54321,aM=98765,lM=13579;function Xr(){if(Re==="singleplayer"||!Ut)return ec;let i=0;for(let n=0;n<Ut.length;n++){const r=Ut.charCodeAt(n);i=(i<<5)-i+r,i=i&i}const e=Math.abs(i)%4;return[ec,oM,aM,lM][e]}let j,$e,Zn,xe,Ht;const ks=new Map,Ua=new Map,rr=[],sr=[];let Fa=performance.now();const Mc=new E,Ar=new E,uf=50,Ir=[];let ur=!1,dr=!1,hr=!1,fr=!1,ni=!1,ii=!1,ri=!1,Qa=!1,el=!1,tl=!1,nl=!1,wo=!1,bo=!1,To=!1,Ao=!1,Ro=!1,Po=!1,Co=!1,Lo=!1,ws=!0,Ji=0,mt=new E,St=!1,lt=null,mn=0,df=1e3,hf=.35,ff=1.5,cM=180,uM=4,zi=0,$t=new E,Kd=["handgun","smg","spear"],xi=100,Gc=100,Jd=0,dM=100,Tt=!1;window.isOnPlane=!1;let Hn,hn=new E(0,100,0),Dt=new Qt,Jt=new E(0,0,50),Nn=new E(0,0,0),tc=2410,uo=22.44,hM=.025,fM=1.2,pM=8.5,mM=1.225,Qd=25e3,io=0,wt={pitch:0,roll:0,yaw:0,throttle:.5};const gM=1.225;function _M(i,e){const t=new E,n=new E,r=new E,s=i.length();if(s<.1)return{drag:t,lift:n,sideForce:r};const a=new E(0,0,1).applyQuaternion(e),o=new E(0,1,0).applyQuaternion(e),l=new E(1,0,0).applyQuaternion(e),c=i.clone().normalize(),u=Math.acos(Math.max(-1,Math.min(1,a.dot(c)))),d=u*180/Math.PI,h=i.clone().projectOnPlane(l),f=Math.atan2(i.dot(l),h.length()),g=.5*mM*s*s,_=hM+.1*Math.abs(Math.sin(u))+.05*Math.abs(Math.sin(f)),p=pM+uo*Math.abs(Math.sin(u)),m=_*g*p;if(t.copy(c).multiplyScalar(-m),d<90){const P=fM*Math.sin(2*u)*g*uo,A=c.clone().cross(l).normalize();A.dot(o)<0&&A.multiplyScalar(-1),n.copy(A).multiplyScalar(P)}const y=.1*g*uo*Math.sin(f);return r.copy(l).multiplyScalar(-y),{drag:t,lift:n,sideForce:r}}const pf=[];let eh=0,yM=600,th=0,nh=500,Na=!1;function mf(i,e=!0){if(!j)return;console.log("🔥 BIKE EXPLOSION TRIGGERED! 🔥");const t=i||$t.clone(),n=e?80:60,r=[];for(let a=0;a<n;a++){const o=new Zt(.1+Math.random()*.2,4,4),l=new pi({color:new Te().setHSL(Math.random()*.1,1,.5+Math.random()*.5)}),c=new X(o,l);c.position.copy(t),c.position.y+=Math.random()*2;const u=new E((Math.random()-.5)*30,Math.random()*20+8,(Math.random()-.5)*30);c.velocity=u,c.life=2,r.push(c),j.add(c)}const s=()=>{for(let o=r.length-1;o>=0;o--){const l=r[o],c=l.velocity;let u=l.life;l.position.addScaledVector(c,.016),c.y-=9.8*.016,u-=.016,l.life=u,l.material instanceof pi&&(l.material.opacity=Math.max(0,u/2),l.material.transparent=!0),u<=0&&(j.remove(l),l.geometry&&l.geometry.dispose(),l.material&&l.material.dispose(),r.splice(o,1))}r.length>0&&requestAnimationFrame(s)};if(s(),e&&$e){const a=$e.position.clone();let o=0;const l=1,c=.5,u=()=>{if(o<l){o+=.016;const d=c*(1-o/l);$e.position.x=a.x+(Math.random()-.5)*d,$e.position.y=a.y+(Math.random()-.5)*d,$e.position.z=a.z+(Math.random()-.5)*d,requestAnimationFrame(u)}else $e.position.copy(a)};u()}}function vM(i){xi=Math.max(0,xi-i),lt&&lt.traverse(e=>{if(e instanceof X&&e.material instanceof Ye){const t=e.material.color.getHex();e.material.color.setHex(16711680),setTimeout(()=>{e instanceof X&&e.material instanceof Ye&&e.material.color.setHex(t)},200)}}),xi<=0&&(mf(),rt=0,lt&&lt.parent&&(j.remove(lt),lt.traverse(e=>{e instanceof X&&(e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose()))}),lt=null),St&&(St=!1,$e&&$e.position&&($e.position.y=$t.y+gt)),Re==="multiplayer"&&Zs({type:"bike_exploded",data:{playerPosition:{x:$t.x,y:$t.y,z:$t.z}}}),Ot("Bike exploded! You have been killed!",500),xi=Gc,$t.set(0,0,0),setTimeout(()=>{rt<=0&&(rt=Fn,Kr())},2e3))}function xM(){const i=hf,e=ff,t=-df,n=e*e-4*i*t,r=(-e+Math.sqrt(n))/(2*i);return Math.max(r,20)}let Dr=0,vs=0,nc=Math.PI/6,MM=.8,SM=.6;const Fn=100,qn=[],ih=50;let Sa=0,Sc=5e3,Ec=1,Vi=0,Oa=0,Rs=0,Ba=1;const EM=1.05;let rt=Fn,za=0,Hc=0,Qi=!1,er=!1;const wM=5,bM=5e3,TM=10,ho=.2,gf=1,AM=.6,RM=60,PM=80,gt=1.8,rn=.4,CM=5*1.5,_f=5,il=.08,Do=9.8,LM=7,DM=45,rh=.5;function yf(i,e,t,n=1.225){const r=1e-6*n/t;return i*Math.exp(-r*e)}function sh(i,e,t){const n=e/t;return i*n}const Vc=new Zt(il,8,8),IM=new pi({color:16776960}),UM=new pi({color:65535,wireframe:!0}),FM=new pi({color:16753920}),vf=new pi({color:16711680});let Io,xf,pr,Mf,Uo,Sf,ka,Ef;new $s;let st={};const Wc=75,_s=10,rl=[2,4,8,16],NM=40;let Gs=0;function OM(){const i=rl[Gs];return NM/i}function BM(){Gs=(Gs+1)%rl.length,wf()}function wf(){const i=document.getElementById("zoom-display");if(i){const e=rl[Gs];i.textContent=`${e}x`,i.setAttribute("data-zoom",`${e}x`)}}function zM(){if(ic)if(St){const i=Math.abs(mn*3.6),e=document.getElementById("speed-value");e&&(e.textContent=Math.round(i).toString()),ic.style.display="block"}else ic.style.display="none"}function kM(){const i=document.getElementById("bike-durability-indicator");if(i)if(St){const e=document.getElementById("bike-durability-value");e&&(e.textContent=Math.round(xi).toString());const t=xi/Gc;t>.6?i.style.color="#00ff00":t>.3?i.style.color="#ffff00":i.style.color="#ff0000",i.style.display="block"}else i.style.display="none"}function GM(){const i=document.getElementById("aircraft-hud");if(i)if(Tt){i.style.display="block";const e=document.getElementById("altitude-value");if(e){const P=Math.round(hn.y*3.28084);e.textContent=P.toString()}const t=Jt.length(),n=Math.round(t*1.94384),r=document.getElementById("airspeed-value");r&&(r.textContent=n.toString());const s=Math.round(wt.throttle*100),a=document.getElementById("throttle-value");a&&(a.textContent=s.toString());const o=new E(0,0,1).applyQuaternion(Dt),c=(t>.1?Jt.clone().normalize():o.clone()).clone().multiplyScalar(-1),u=Math.acos(Math.max(-1,Math.min(1,o.dot(c)))),d=Ct.radToDeg(u),h=document.getElementById("aoa-value"),f=document.getElementById("aoa-indicator");h&&(h.textContent=Math.round(d).toString());const g=document.getElementById("pitch-value");if(g){const P=new _t().setFromQuaternion(Dt),A=Ct.radToDeg(P.x);g.textContent=Math.round(A).toString()}const _=document.getElementById("altimeter"),p=document.getElementById("airspeed-indicator"),m=document.getElementById("stall-warning"),v=hn.y*3.28084;_&&(v<164?(_.style.color="#ff4444",_.style.borderColor="#ff4444"):v<656?(_.style.color="#ff9900",_.style.borderColor="#ff9900"):(_.style.color="#00ff88",_.style.borderColor="#00ff88"));const y=22,M=y*1.94384;p&&(t<y?(p.style.color="#ff4444",p.style.borderColor="#ff4444"):n<M+20?(p.style.color="#ff9900",p.style.borderColor="#ff9900"):(p.style.color="#00ff88",p.style.borderColor="#00ff88")),f&&(d>20?f.className="instrument stall":d>18?f.className="instrument critical":f.className="instrument"),m&&((t<y?(y-t)/y:0)>.3||d>18?m.style.display="block":m.style.display="none")}else i.style.display="none"}function bf(){return at==="sniper"&&(ii||ni)?1/rl[Gs]:1}let at="handgun",Ps=0,Ei={},Cs=100,Gi=!1,Xc=0,xs=new E,Ea=0,ui=new E,Kn=0,vr=!1,Ni=0,zr=!1,Ur=0,tr=new E(0,0,0),Re="idle",Hs=!1;const Yt=document.getElementById("main-menu"),Xn=document.getElementById("instruction-overlay"),Wi=document.getElementById("game-container"),oh=document.getElementById("start-singleplayer"),ah=document.getElementById("start-multiplayer"),ki=document.getElementById("instruction-text"),Un=document.getElementById("p2p-instruction"),bs=document.getElementById("player-count-display"),lh=document.getElementById("player-count"),Fr=document.getElementById("start-game-request-btn"),mr=document.getElementById("scope-overlay"),ic=document.getElementById("speed-indicator"),xt=document.getElementById("webrtc-signaling-panel"),Me=document.getElementById("p2p-status"),HM=document.getElementById("create-offer-btn"),VM=document.getElementById("create-answer-btn"),Mi=document.getElementById("local-sdp"),gr=document.getElementById("remote-sdp"),WM=document.getElementById("set-remote-sdp-btn"),Tn=document.getElementById("local-ice"),Ls=document.getElementById("remote-ice"),XM=document.getElementById("add-remote-ice-btn"),jM=document.getElementById("close-signaling-btn"),ro=document.getElementById("copy-local-sdp-btn"),so=document.getElementById("copy-local-ice-btn"),An=new Map,fi=new Map;let et=null,ze=null,sn=null,Ut=null,fo=null,Ga=!1,Ds=null;const va=[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun1.l.google.com:19302"}];async function Tf(){const i="d51424dc9b80232dbc239f680b412cdbfe33";try{const e=await fetch(`https://p2p-sample.metered.live/api/v1/turn/credentials?apiKey=${i}`);if(!e.ok)return console.warn(`Failed to fetch TURN credentials: ${e.status} ${e.statusText}. Using fallback STUN servers.`),{iceServers:va};const t=await e.json();return Array.isArray(t)&&t.length>0?(console.log("Successfully fetched TURN credentials. Combining with fallback STUN."),{iceServers:[...t,...va]}):(console.warn("Fetched TURN credentials but the list is empty or invalid. Using fallback STUN servers only."),{iceServers:va})}catch(e){return console.error("Error fetching TURN credentials, using fallback STUN servers:",e),{iceServers:va}}}const mi=new Map;let qe=null,En=null,wn=null,bn=null,Gt=null;const Is=.25,ft=new E(.5,.8,.3),qM=gt-Is*2-ft.y,qt=new E(.4,qM,.25),Af=new E(ft.x/2+.05,qt.y+ft.y*.3,ft.z/2-.05),Rf=new E(0,qt.y+ft.y*.8,ft.z/2+.2),Pf=new E(ft.x/2+.08,qt.y+ft.y*.35,ft.z/2-.03),Cf=new E(0,qt.y+ft.y*.75,ft.z/2+.35),Lf=new E(ft.x/2+.04,qt.y+ft.y*.32,ft.z/2-.02),Df=new E(0,qt.y+ft.y*.77,ft.z/2+.25),$M=new E(ft.x/2+.15,qt.y+ft.y*.4,ft.z/2-.1),YM=new E(0,qt.y+ft.y*.8,ft.z/2+.4);let ch=0;const ZM=uf;let pn=null;const Wn=new Map;function Ai(){return Array.from(Wn.keys()).filter(i=>{var e;return(e=Wn.get(i))==null?void 0:e.isConnected})}function If(){const i=Ai();return i.length>0?i[0]:null}function _r(){const i=If();i&&(et=An.get(i)||et,ze=fi.get(i)||ze)}function jc(){Re==="multiplayer"&&(Wn.has("opponent")&&(Wn.delete("opponent"),Ws("opponent")),xt&&(xt.style.display="none"),bs&&(bs.style.display="none"),Fr&&(Fr.style.display="none"),!(!Yt||!Xn||!Wi||!ki)&&(Yt.style.display="none",Wi.style.display="block",vt=!1,ki.textContent="Multiplayer Game Starting...",Un&&(Un.style.display="none"),Xn.style.display="flex",Hs||Wf()))}function hi(){const i=Ai().length;lh?lh.textContent=i.toString():console.warn("[UI Update] playerCountSpan element not found"),bs&&Re==="multiplayer"?(bs.style.display=i>0?"block":"none",Fr?Fr.style.display=i>0?"block":"none":console.warn("[UI Update] startGameRequestBtn element not found"),Un?i>0?Un.textContent=`${i} player(s) connected. Click "Start Game" to begin!`:Un.textContent="Use P2P controls below to connect, then click to start.":console.warn("[UI Update] p2pInstructionText element not found")):(bs&&(bs.style.display="none"),Fr&&(Fr.style.display="none"))}function Ys(){switch(fe){case 0:return 160;case 1:return 190;case 2:return 170;case 3:return 900;case 4:return 200;default:return 160}}function Uf(){if(!wi)return console.warn("generateRandomSpawnPosition called before spawn PRNG initialized"),new E(0,gt,0);const e=Ys()*.8,t=(Be||Date.now())+(Ut?Ut.split("").reduce((a,o)=>a+o.charCodeAt(0),0):0)+performance.now(),n=new vn(t),r=n.randFloat(-e,e),s=n.randFloat(-e,e);return new E(r,gt,s)}function KM(i=1,e=0){const t=new tn;t.scale.set(i,i,i);const n={body:4873507,head:7044146,arms:5925672,legs:4016671},r=(e-.5)*.6,s=I=>{const S=Math.max(0,Math.min(1,(I>>16&255)/255+r)),T=Math.max(0,Math.min(1,(I>>8&255)/255+r)),G=Math.max(0,Math.min(1,(I&255)/255+r));return Math.floor(S*255)<<16|Math.floor(T*255)<<8|Math.floor(G*255)},a=.3/i-1.5,o=(.6+.6)/i-1.5,l=(.6+1.2+.2)/i-1.5,c=(.6+.6)/i-1.5,u=new Ue(.6,1.2,.4),d=new yn({color:s(n.body)}),h=new X(u,d);h.position.y=o,t.add(h);const f=new Ue(.4,.4,.4),g=new yn({color:s(n.head)}),_=new X(f,g);_.position.y=l,t.add(_);const p=new Ue(.2,.8,.2),m=new yn({color:s(n.arms)}),v=new X(p,m);v.position.set(-.5,c,0),t.add(v);const y=new X(p,m);y.position.set(.5,c,0),t.add(y);const M=new Ue(.2,.6,.2),P=new yn({color:s(n.legs)}),A=new X(M,P);A.position.set(-.2,a,0),t.add(A);const R=new X(M,P);return R.position.set(.2,a,0),t.add(R),{group:t,leftArm:v,rightArm:y}}function JM(){return new Promise(i=>{const e=Vi?(performance.now()-Vi)/1e3:0,t=1+Math.min(e/120,1),n=.8+Math.random()*.4,r=t*n,s=Math.random();console.log(`Creating zombie: TimeSurvived=${e.toFixed(1)}s, TimeScaling=${t.toFixed(2)}x, FinalScale=${r.toFixed(2)}`),i(KM(r,s))})}async function QM(i){const e=await JM();e.group.position.copy(i),j.add(e.group);const t=Vi?(performance.now()-Vi)/1e3:0,n=1+Math.min(t/180,190);console.log(`Zombie Stats: TimeSurvived=${t.toFixed(1)}s, TimeMultiplier=${n.toFixed(2)}x`);const r=200,s=1,a=5,o=2,l=1500,c=()=>.8+Math.random()*.4,u=Math.floor(r*n*c()),d=s*n*c(),h=Math.floor(a*n*c()),f=o*c(),g=Math.max(500,l/(n*c())),_={id:Math.random().toString(36).substring(2,9),mesh:e.group,position:i.clone(),velocity:new E,health:u,maxHealth:u,speed:d,attackRange:f,attackDamage:h,lastAttackTime:0,attackCooldown:g,isAlive:!0,spawnTime:performance.now(),isAttacking:!1,attackAnimationStart:0,attackAnimationDuration:800,originalArmPositions:{left:e.leftArm.position.clone(),right:e.rightArm.position.clone()},hasDealtDamage:!1,movementNoise:{x:Math.random()*.5-.25,z:Math.random()*.5-.25},limping:Math.random()<.7,limpCycle:Math.random()*Math.PI*2};return _.mesh.leftArm=e.leftArm,_.mesh.rightArm=e.rightArm,console.log(`Spawned zombie: HP=${u}, Speed=${d.toFixed(1)}, Damage=${h}, Range=${f.toFixed(1)}, Cooldown=${g}ms, Scale=${e.group.scale.x.toFixed(2)}x`),_}function eS(i){i.isAttacking||(i.isAttacking=!0,i.attackAnimationStart=performance.now(),i.hasDealtDamage=!1,console.log(`Zombie ${i.id} started attack animation`))}function tS(i){if(!i.isAttacking)return!1;const e=performance.now()-i.attackAnimationStart,t=Math.min(e/i.attackAnimationDuration,1);let n=!1;t>=.4&&t<=.6&&!i.hasDealtDamage&&(n=!0,i.hasDealtDamage=!0);const r=i.mesh.leftArm,s=i.mesh.rightArm;if(r&&s){let a,o,l;if(t<.3){const c=t/.3;a=-c*.3,o=c*.4,l=-c*.2}else if(t<.7){const c=(t-.3)/.4;a=-.3+c*1,o=.4-c*.6,l=-.2+c*.8}else{const c=(t-.7)/.3;a=.7-c*.7,o=-.2+c*.2,l=.6-c*.6}if(r.position.x=i.originalArmPositions.left.x+a,r.position.y=i.originalArmPositions.left.y+o,r.position.z=i.originalArmPositions.left.z+l,s.position.x=i.originalArmPositions.right.x+a*.8,s.position.y=i.originalArmPositions.right.y+o*1.1,s.position.z=i.originalArmPositions.right.z+l*.9,r.rotation&&s.rotation){const c=Math.sin(t*Math.PI)*.5;r.rotation.x=c,s.rotation.x=c}}return t>=1&&(i.isAttacking=!1,i.hasDealtDamage=!1,r&&s&&(r.position.copy(i.originalArmPositions.left),s.position.copy(i.originalArmPositions.right),r.rotation&&s.rotation&&(r.rotation.x=0,s.rotation.x=0))),n}async function nS(){if(Re!=="singleplayer")return;if(qn.length>=ih){console.log("Max zombie limit reached, skipping spawn");return}const i=Uf();i.y=gt;const e=xe.getObject().position;if(i.distanceTo(e)<15){const n=new E().subVectors(i,e).normalize().multiplyScalar(20);i.add(n)}try{const n=await QM(i);qn.push(n),console.log(`Spawned zombie. Total: ${qn.length}/${ih}`)}catch(n){console.error("Failed to spawn zombie:",n)}}function iS(i){if(Re!=="singleplayer")return;const e=xe.getObject().position,t=performance.now();for(let n=qn.length-1;n>=0;n--){const r=qn[n];if(!r.isAlive){j.remove(r.mesh),r.mesh.traverse(o=>{o instanceof X&&(o.geometry&&o.geometry.dispose(),o.material&&(Array.isArray(o.material)?o.material.forEach(l=>l.dispose()):o.material.dispose()))}),qn.splice(n,1);continue}const s=r.position.distanceTo(e),a=tS(r);if(s<=r.attackRange)!r.isAttacking&&t-r.lastAttackTime>=r.attackCooldown&&(eS(r),r.lastAttackTime=t),a&&(rt-=r.attackDamage,Ot(`Zombie attacked! Health: ${rt}`,1e3),rt<=0&&sS());else{const o=new E().subVectors(e,r.position).normalize(),l=Math.atan2(o.x,o.z);r.mesh.rotation.y=l,r.limpCycle+=i*(r.limping?3:4);let c=r.speed;if(r.limping){const d=Math.sin(r.limpCycle)*.4+.6;c*=d,Math.sin(r.limpCycle)<-.5&&(c*=.3)}r.movementNoise.x+=(Math.random()-.5)*.02,r.movementNoise.z+=(Math.random()-.5)*.02,r.movementNoise.x=Math.max(-.3,Math.min(.3,r.movementNoise.x)),r.movementNoise.z=Math.max(-.3,Math.min(.3,r.movementNoise.z));const u=o.clone();if(u.x+=r.movementNoise.x,u.z+=r.movementNoise.z,u.normalize(),r.velocity.copy(u).multiplyScalar(c),r.position.add(r.velocity.clone().multiplyScalar(i)),r.mesh.position.copy(r.position),r.limping){const d=Math.sin(r.limpCycle*1.5)*.05;r.mesh.rotation.z=d,r.mesh.rotation.x=0}else r.mesh.rotation.x=0,r.mesh.rotation.z=0}}}function Ff(i,e,t=!1){const n=qn.find(s=>s.id===i);if(!n)return;n.health-=e;const r=t?`HEADSHOT! -${e} HP`:`HIT! -${e} HP`;if(Ot(r,300),n.health<=0){n.isAlive=!1,Rs++,rS(n.position);const s=t?`Zombie headshot kill! Total: ${Rs}`:`Zombie killed! Total: ${Rs}`;Ot(s,500)}}function rS(i){const e=new Zt(.3,8,8),t=new yn({color:16739125}),n=new X(e,t);n.position.copy(i),n.position.y+=.5,j.add(n);const r=()=>{const s=xe.getObject().position;n.position.distanceTo(s)<2?(Ba*=EM,j.remove(n),n.geometry.dispose(),n.material.dispose(),Ot(`Weapon upgraded! Damage x${Ba.toFixed(2)}`,1e3)):requestAnimationFrame(r)};requestAnimationFrame(r)}function sS(){bi++,Oa=(performance.now()-Vi)/1e3;const i=Math.floor(Rs*100+Oa*10);oS(i),bi>=ol?(Re="idle",Nf()):setTimeout(()=>{rt=Fn,Kr()},3e3)}function oS(i){const e=document.createElement("div");e.style.cssText=`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 30px;
    border-radius: 10px;
    text-align: center;
    font-family: Arial, sans-serif;
    z-index: 1000;
  `,e.innerHTML=`
    <h2>Game Over!</h2>
    <p>Survived: ${Oa.toFixed(1)} seconds</p>
    <p>Zombies Killed: ${Rs}</p>
    <p>Final Score: ${i}</p>
    <p>Deaths: ${bi}/${ol}</p>
    <button onclick="this.parentElement.remove()" style="
      background: #ff6b35;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 10px;
    ">Close</button>
  `,document.body.appendChild(e)}function Nf(){qn.forEach(i=>{j.remove(i.mesh),i.mesh.traverse(e=>{e instanceof X&&(e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose()))})}),qn.length=0,Rs=0,Ba=1,Oa=0,Vi=0,Sa=0,Sc=5e3,Ec=1}function Ha(){const i=[];for(let t=0;t<20;t++)i.push(Uf());return i}function Vs(i,e){if(fe!==4||jr.length===0)return gt;const t=new $s,n=new E(i,1e3,e),r=new E(0,-1,0);t.set(n,r);const s=[];jr.forEach(o=>{o.traverse(l=>{l instanceof X&&s.push(l)})});const a=t.intersectObjects(s);return a.length>0?a[0].point.y+gt:gt+10}function uh(i){if(fe===4){const e=Vs(i.x,i.z);return new E(i.x,e,i.z)}return i.clone()}function aS(){if(!St)return;const i=Date.now();if(i-Jd<dM)return;const e=2,t=new Yr($t,e),n=[];We&&We.length>0&&n.push(...We),fe===4&&si.length>0&&n.push(...si),Xt&&n.push(Xt);let r=0;const s=20;for(const a of n){if(r>=s)break;if(a.userData.isCollidable===!1)continue;const o=a.position;if($t.distanceTo(o)>e+5)continue;r++;const c=new dt().setFromObject(a);if(t.intersectsBox(c)){const u=Math.abs(mn)*3.6,d=lS(u);if(d>0){cS(d),Jd=i,mn*=.3;break}}}}function lS(i){return i<70?0:i<100?50:80}function cS(i,e){xi-=i,lt&&(lt.userData.originalColor,lt.traverse(t=>{t instanceof X&&(t.userData.originalColor||(t.userData.originalColor=t.material.color.getHex()),t.material.color.setHex(16711680))}),setTimeout(()=>{lt&&lt.traverse(t=>{t instanceof X&&t.userData.originalColor&&t.material.color.setHex(t.userData.originalColor)})},200)),xi<=0&&uS()}function uS(i){if(dS($t),Va(rt),rt<=0){if(Re==="multiplayer"&&(bi++,ll({type:"i_was_defeated",data:{defeatedPlayerId:Ut||"unknown"}}),al())){qr(!1);return}rt=Fn,Kr()}}function dS(i){const e=new Zt(5,16,16),t=new Ye({color:16729088,emissive:16720384,transparent:!0,opacity:.8}),n=new X(e,t);n.position.copy(i),j.add(n);let r=.1,s=.8;const a=setInterval(()=>{r+=.5,s-=.1,n.scale.setScalar(r),t.opacity=Math.max(0,s),s<=0&&(clearInterval(a),j.remove(n),e.dispose(),t.dispose())},50);for(let o=0;o<10;o++){const l=new Ue(.2,.2,.2),c=new Ye({color:3355443}),u=new X(l,c);u.position.copy(i),u.position.add(new E((Math.random()-.5)*2,Math.random()*2,(Math.random()-.5)*2)),j.add(u);const d=new E((Math.random()-.5)*10,Math.random()*10,(Math.random()-.5)*10);let h=2e3;const f=setInterval(()=>{u.position.add(d.clone().multiplyScalar(.05)),d.y-=.2,h-=50,h<=0&&(clearInterval(f),j.remove(u),l.dispose(),c.dispose())},50)}}const We=[],jr=[];let si=[];const dh=new Ye({color:6323595,roughness:.8,metalness:.2});function sl(){const e=Ys()*.85;return{minX:-e,maxX:e,minZ:-e,maxZ:e}}function Ho(){const i=Ys();return Math.max(1,i/160)}function Of(){Xt&&j&&(j.remove(Xt),Xt.geometry&&Xt.geometry.dispose(),Xt.material instanceof Xi&&Xt.material.dispose());const i=fe===3?1e4:500,e=new ko(i,i),t=new Ye({color:Bf,roughness:.9});Xt=new X(e,t),Xt.rotation.x=-Math.PI/2,Xt.receiveShadow=!0,Xt.name="ground",j&&j.add(Xt)}const hS=new Ye({color:7901340,roughness:.7,metalness:.1}),fS=new Ye({color:5533306,roughness:.8,metalness:.1}),pS=new Ye({color:9127187,roughness:.9,metalness:.1}),rc=new Ye({color:2263842,roughness:.8,metalness:0}),mS=new Ye({color:6908265,roughness:.9,metalness:.2}),gS=new Ye({color:9139029,roughness:.8,metalness:.1}),sc=new Ye({color:10145074,roughness:.9,metalness:0}),_S=new Ye({color:9127187,roughness:.8,metalness:.1});let Xt;const Bf=2635591,yS=4342338,vS=5597999,xS=7048739,MS=6114871;var qc=(i=>(i[i.ARENA=0]="ARENA",i[i.URBAN=1]="URBAN",i[i.FOREST=2]="FOREST",i[i.PLAINS=3]="PLAINS",i[i.MOUNTAIN=4]="MOUNTAIN",i))(qc||{});let fe,On="random";const ol=10;let vt=!1;const $c=new Map;let bi=0;function wc(i){return $c.get(i)||0}function SS(i){const e=wc(i)+1;return $c.set(i,e),e}function ES(){const i=Ai();if(i.length===0)return!1;for(const e of i)if(console.log(`Checking deaths for player ${e}: ${wc(e)}`),wc(e)<ol)return!1;return!0}function al(){return bi>=ol}function Us(i,e){if(e==="random"){const n=new vn(i).next();return n<.2?0:n<.4?1:n<.6?2:n<.8?3:4}return e}function oc(i){const e=new dt().setFromCenterAndSize(new E(i.x,i.y-gt/2+rn,i.z),new E(rn*2,gt-rn*2,rn*2));for(const t of We){const n=new dt().setFromObject(t);if(e.intersectsBox(n))return!1}return!0}function Fo(i,e,t,n){var l;if(!wi){console.warn("selectRandomSpawnPoint called before spawn PRNG initialized. Using temporary PRNG.");const c=new vn(Date.now());return((l=i[c.nextInt(0,i.length-1)])==null?void 0:l.clone())||new E(0,gt,0)}if(i.length===0)return new E(0,gt,0);let r=i;if(r.length===0&&i.length>0&&(r=i),r.length===0)return new E(0,gt,0);let s=[];e&&typeof t=="number"&&t>0&&(s=r.filter(c=>{const u=c.x-e.x,d=c.z-e.z;return Math.sqrt(u*u+d*d)>=t}));let a=[];const o=s.length>0?s:r;for(const c of o)oc(c)&&a.push(c);if(a.length===0&&s.length>0)for(const c of r)oc(c)&&a.push(c);if(a.length===0)for(const c of i)oc(c)&&a.push(c);if(a.length>0){const c=a[wi.nextInt(0,a.length-1)].clone();return uh(c)}else{console.warn("No safe spawn points found! Using fallback position.");const c=new E(0,gt+5,0);return uh(c)}}function Ot(i,e=500){if(vt)return;let t=document.getElementById("corner-notification");t||(t=document.createElement("div"),t.id="corner-notification",t.style.cssText=`
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-family: monospace;
            font-size: 12px;
            z-index: 1001;
            border: 1px solid rgba(255, 255, 255, 0.3);
            max-width: 200px;
            word-wrap: break-word;
            display: none;
        `,document.body.appendChild(t)),t.textContent=i,t.style.display="block",setTimeout(()=>{t&&(t.style.display="none")},e)}function wS(){return new Promise((i,e)=>{if(sn&&sn.readyState===WebSocket.OPEN){i();return}const n=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws`;sn=new WebSocket(n),sn.onopen=()=>{console.log("Connected to signaling server"),Me&&(Me.textContent="Status: Connected to server"),i()},sn.onmessage=r=>{try{const s=JSON.parse(r.data);bS(s)}catch(s){console.error("Error parsing signaling message:",s)}},sn.onclose=()=>{console.log("Disconnected from signaling server"),Me&&(Me.textContent="Status: Disconnected"),sn=null,Ut=null},sn.onerror=r=>{console.error("WebSocket error:",r),e(r)},setTimeout(()=>{sn&&sn.readyState!==WebSocket.OPEN&&e(new Error("Connection timeout"))},1e4)})}function bS(i){switch(i.msg_type){case"welcome":Ut=i.data.client_id;break;case"room-joined":fo=i.data.room_id;const e=i.data.players,t=i.data.player_count;hi(),Me&&(Me.textContent=`Status: In room ${fo} with ${t} players`);for(const s of e)s!==Ut&&!An.has(s)&&(console.log("Establishing connection to existing player:",s),FS(!0,s));break;case"room-error":console.error("Room join error:",i.data.error),Me&&(Me.textContent=`Error: ${i.data.error}`),Ga=!1;break;case"user-joined":console.log("New user joined room:",i.data),i.data.user_id;const n=i.data.player_count;hi(),Me&&(Me.textContent=`Status: In room ${fo} with ${n} players`);break;case"user-left":const r=i.data.user_id;if(An.has(r)){const s=An.get(r);s==null||s.close(),An.delete(r)}if(fi.has(r)){const s=fi.get(r);s==null||s.close(),fi.delete(r)}Wn.delete(r),Ws(r),_r();break;case"offer":i.sender!==Ut&&NS(i.data,i.sender);break;case"answer":i.sender!==Ut&&OS(i.data,i.sender);break;case"ice-candidate":i.sender!==Ut&&BS(i.data,i.sender);break}}function TS(i,e=6){if(!sn||sn.readyState!==WebSocket.OPEN){console.error("Not connected to signaling server");return}fo=i,Ga=!0;const t={msg_type:"join-room",data:{room_id:i,max_players:e},target:null,sender:Ut};sn.send(JSON.stringify(t)),console.log("Joining room:",i,"with max players:",e),Me&&(Me.textContent=`Status: Joining room ${i}...`),Ds&&clearTimeout(Ds),Ds=window.setTimeout(()=>{Ga&&(console.log("Matchmaking timeout, starting game with default settings"),Me&&(Me.textContent="Status: Timeout, starting solo"))},3e4)}let hh=null,po=1;async function zf(i){if(console.log("Initializing PeerConnection for player:",i),An.has(i)){const r=An.get(i);r&&r.signalingState!=="closed"&&(console.log("Closing existing PeerConnection for:",i),r.close())}const e=await Tf(),t=new RTCPeerConnection(e);console.log("PeerConnection created for player:",i,"with configuration:",e),An.set(i,t),t.onicecandidate=r=>{r.candidate&&(console.log("Local ICE candidate gathered for player:",i,r.candidate),Yc("ice-candidate",r.candidate,i))},t.onconnectionstatechange=()=>{console.log(`Connection state for ${i}:`,t.connectionState),t.connectionState==="connected"?(console.log(`P2P connection established with ${i}`),hi(),Me&&(Me.textContent=`Status: Connected to ${Ai().length} players`)):(t.connectionState==="disconnected"||t.connectionState==="failed")&&(console.log(`P2P connection lost with ${i}`),An.delete(i),fi.delete(i),Wn.delete(i),Ws(i),_r(),hi())};const n=t.createDataChannel("gameData",{ordered:!1});return fh(n,i),fi.set(i,n),t.ondatachannel=r=>{const s=r.channel;fh(s,i),fi.set(i,s)},t}async function AS(i){const e=An.get(i);if(!e){console.error("No peer connection found for player:",i);return}try{console.log("Creating offer for player:",i);const t=await e.createOffer();await e.setLocalDescription(t),console.log("Local description set, sending offer to:",i),Yc("offer",t,i)}catch(t){console.error("Error creating offer for player:",i,t)}}function fh(i,e){i.onopen=()=>{console.log(`Data channel opened for player: ${e}`),Wn.set(e,{playerId:e,isConnected:!0}),_r(),hi(),Me&&(Me.textContent=`Status: Connected to ${Ai().length} players`)},i.onclose=()=>{console.log(`Data channel closed for player: ${e}`),Wn.delete(e),_r(),hi()},i.onmessage=t=>{if(!(vt&&JSON.parse(t.data).type!=="game_over_notif"))try{const n=JSON.parse(t.data);US(n,e)}catch(n){console.error(`Error parsing message from ${e}:`,n)}}}function Yc(i,e,t){if(!sn||sn.readyState!==WebSocket.OPEN){console.error("Cannot send signaling message: not connected to server");return}const n={msg_type:i,data:e,target:t,sender:Ut};sn.send(JSON.stringify(n))}function RS(i){const e=i.substring(0,8),t=document.createElement("canvas"),n=t.getContext("2d");t.width=256,t.height=64,n.fillStyle="rgba(0, 0, 0, 0.8)",n.fillRect(0,0,t.width,t.height),n.fillStyle="white",n.font="bold 24px Arial",n.textAlign="center",n.textBaseline="middle",n.fillText(e,t.width/2,t.height/2);const r=new bv(t);r.needsUpdate=!0;const s=new pi({map:r,transparent:!0,alphaTest:.1,side:vi}),a=new ko(1,.25),o=new X(a,s);return o.name=`playerIdLabel_${i}`,o.lookAt($e.position),o}function PS(){$e&&j.traverse(i=>{i.name&&i.name.startsWith("playerIdLabel_")&&i.lookAt($e.position)})}function CS(i){const e=new Ye({color:16729344,roughness:.6,metalness:.3}),t=new tn;t.name=`remotePlayer_${i}`;const n=new Zt(Is,16,12),r=new X(n,e);r.position.y=qt.y+ft.y+Is,r.castShadow=!0,r.receiveShadow=!0,t.add(r);const s=new Ue(ft.x,ft.y,ft.z),a=new X(s,e);a.position.y=qt.y+ft.y/2,a.castShadow=!0,a.receiveShadow=!0,t.add(a);const o=new Ue(qt.x,qt.y,qt.z),l=new X(o,e);l.position.y=qt.y/2,l.castShadow=!0,l.receiveShadow=!0,t.add(l);const c=new Ye({color:5592405}),u=new Bt(.05,.05,.4,8),d=new X(u,c);d.castShadow=!0,d.visible=!0,t.add(d);const h=new Bt(.04,.04,.8,8),f=new X(h,c);f.castShadow=!0,f.visible=!1,t.add(f);const g=new Ue(.08,.08,.5),_=new X(g,c);_.castShadow=!0,_.visible=!1,t.add(_);const p=new tn,m=new yn({color:9127187}),v=new yn({color:12632256}),y=new Bt(.015,.015,2,8),M=new X(y,m);M.castShadow=!0,p.add(M);const P=new Zr(.03,.2,8),A=new X(P,v);A.position.y=1.1,A.castShadow=!0,p.add(A);const R=new Bt(.02,.02,.05,8),I=new X(R,v);I.position.y=.9,p.add(I),p.scale.set(.8,.8,.8),p.rotation.z=Math.PI/6,p.visible=!1,t.add(p);const S=RS(i);S.position.set(0,qt.y+ft.y+Is*2+.5,0),t.add(S),j.add(t);const T={mainMesh:t,handgunMesh:d,sniperMesh:f,smgMesh:_,spearMesh:p};return mi.set(i,T),Zc(),T}function Ws(i){const e=mi.get(i);e&&(j.remove(e.mainMesh),e.bikeModel&&j.remove(e.bikeModel),e.mainMesh.traverse(t=>{t instanceof X&&(t.geometry.dispose(),Array.isArray(t.material)?t.material.forEach(n=>n.dispose()):t.material.dispose())}),mi.delete(i),Zc())}function Zc(){const i=If();if(i&&mi.has(i)){const e=mi.get(i);qe=e.mainMesh,En=e.handgunMesh,wn=e.sniperMesh,bn=e.smgMesh,Gt=e.bikeModel||null}else qe=null,En=null,wn=null,bn=null,Gt=null}function LS(i,e,t){const n=mi.get(i);if(!n)return;n.handgunMesh.visible=!1,n.sniperMesh.visible=!1,n.smgMesh.visible=!1,n.spearMesh.visible=!1;let r,s,a;switch(t){case"handgun":r=n.handgunMesh,s=Af,a=Rf;break;case"sniper":r=n.sniperMesh,s=Pf,a=Cf;break;case"smg":r=n.smgMesh,s=Lf,a=Df;break;case"spear":r=n.spearMesh,s=$M,a=YM;break}if(Tt){r.visible=!1;return}r.visible=!0,e?(r.position.copy(a),r.rotation.x=0):(r.position.copy(s),r.rotation.x=Math.PI/2)}function DS(i,e){const t=mi.get(i);if(t)if(e.isOnBike){t.bikeModel||(t.bikeModel=Kc(),t.bikeModel.name=`remoteBike_${i}`,j.add(t.bikeModel));const n=e.bikePosition||e.position;let r=n.y;if(fe===4&&e.bikePosition){const a=Vs(n.x,n.z);r<a-1&&(r=a)}t.bikeModel.position.set(n.x,r,n.z),typeof e.bikeDirection=="number"&&(t.bikeModel.rotation.y=e.bikeDirection),typeof e.bikeBankAngle=="number"&&(t.bikeModel.rotation.z=e.bikeBankAngle);const s={x:n.x,y:r+.7,z:n.z};t.mainMesh.position.set(s.x,s.y,s.z),typeof e.bikeDirection=="number"&&(t.mainMesh.rotation.y=e.bikeDirection),typeof e.bikeBankAngle=="number"&&(t.mainMesh.rotation.z=e.bikeBankAngle),t.mainMesh.rotation.x=0,t.bikeModel.visible=!0,t.mainMesh.visible=!0}else t.bikeModel&&(t.bikeModel.visible=!1),t.mainMesh.visible=!0}function IS(i,e){if(i.type==="map_seed"&&!pn){const t=i.data;Be=t.seed,fe=t.mapType,N=new vn(Be),wi=new vn(Be+Xr()),console.log("Received and set map seed:",Be,"and map type:",fe),Oo()}else if(i.type==="shoot"&&i.data){const t=i.data;if(t.muzzlePosition&&t.direction){const n=new X(Vc,vf);n.castShadow=!0,n.position.set(t.muzzlePosition.x,t.muzzlePosition.y,t.muzzlePosition.z);let r=st.handgun.projectileSpeed;t.weaponType==="sniper"&&st.sniper.projectileSpeed?r=st.sniper.projectileSpeed:t.weaponType==="smg"&&st.smg.projectileSpeed&&(r=st.smg.projectileSpeed);const s={mesh:n,velocity:new E(t.direction.x,t.direction.y,t.direction.z).multiplyScalar(r),lifeTime:0,spawnTime:performance.now(),weaponType:t.weaponType,distanceTraveled:0,initialPosition:new E(t.muzzlePosition.x,t.muzzlePosition.y,t.muzzlePosition.z)};j.add(n),sr.push(s)}}else if(i.type==="hit_opponent"){if(vt)return;const t=i.data;Va(t.damageDealt);const n=document.createElement("div");n.style.position="absolute",n.style.top="0",n.style.left="0",n.style.width="100%",n.style.height="100%",n.style.zIndex="1000",document.body.appendChild(n),setTimeout(()=>{document.body.contains(n)&&document.body.removeChild(n)},150);const r=t.isHeadshot?`HEADSHOT! -${t.damageDealt} HP | Health: ${Math.round(rt)}`:`HIT! -${t.damageDealt} HP | Health: ${Math.round(rt)}`;if(Ot(r,500),rt<=0){if(bi++,console.log(`myDeaths incremented to: ${bi}`),ll({type:"i_was_defeated",data:{defeatedPlayerId:Ut||"unknown"}}),al()){qr(!1);return}rt=Fn,Kr()}}else if(i.type==="i_was_defeated"){if(vt)return;const t=i.data;if(t&&t.defeatedPlayerId&&(SS(t.defeatedPlayerId),ES())){qr(!0);return}Ot("Enemy player defeated!",500)}else if(i.type==="game_over_notif"){const t=i.data;console.log("Received game over notification:",t),t.defeatedPlayerId?(console.log(`Removing mesh for defeated player: ${t.defeatedPlayerId}`),Ws(t.defeatedPlayerId)):e&&(console.log(`Removing mesh for defeated player (fallback): ${e}`),Ws(e))}else if(i.type==="bike_hit"){const t=i.data;Va(t.damageDealt),Ot(`Bike collision! -${t.damageDealt} HP`,500)}else if(i.type==="bike_exploded")i.data,Ot("Enemy bike exploded!",500);else if(i.type==="start_game_request"){const t=i.data;Ot(`${t.requesterId} wants to start the game`,500),Re==="multiplayer"&&jc()}}function US(i,e){if(i.type==="playerState"){const t=i.data;mi.has(e)||CS(e);const n=mi.get(e);let r=t.position.y-gt;if(fe===4){const s=Vs(t.position.x,t.position.z);r=Math.max(r,s)}n.mainMesh.position.set(t.position.x,r,t.position.z),n.mainMesh.quaternion.set(t.quaternion.x,t.quaternion.y,t.quaternion.z,t.quaternion.w),LS(e,t.aiming,t.weaponType),DS(e,t),Zc()}else i.type==="gameEvent"&&IS(i.data,e)}async function FS(i,e){try{if(!e){console.error("Target opponent ID is required for peer connection");return}if(An.has(e)){console.log("Connection already exists for:",e);return}console.log("Starting peer connection to:",e),await zf(e),i&&await AS(e),Ga=!1,Ds&&(clearTimeout(Ds),Ds=null)}catch(t){console.error("Error in automatic peer connection:",t),Me&&(Me.textContent="Status: Connection failed")}}async function NS(i,e){console.log("Received offer from:",e),An.has(e)||await zf(e);const t=An.get(e);if(!t){console.error("Failed to get peer connection for:",e);return}try{await t.setRemoteDescription(new RTCSessionDescription(i));const n=await t.createAnswer();await t.setLocalDescription(n),console.log("Created answer for:",e),Yc("answer",n,e)}catch(n){console.error("Error handling remote offer:",n)}}async function OS(i,e){const t=An.get(e);if(!t){console.error("Peer connection not found for sender:",e);return}try{await t.setRemoteDescription(new RTCSessionDescription(i)),console.log("Set remote answer successfully for peer:",e),_r()}catch(n){console.error("Error handling remote answer from",e,":",n)}}async function BS(i,e){const t=An.get(e);if(!t){console.error("Peer connection not found for sender:",e);return}try{const n=new RTCIceCandidate(i);await t.addIceCandidate(n),console.log("Added remote ICE candidate for peer:",e)}catch(n){console.error("Error adding remote ICE candidate from",e,":",n)}}function zS(){if(!Yt||!Xn||!Wi||!oh||!ah||!xt||!Mi||!gr||!Tn||!Ls||!Me||!mr||!ro||!so){console.error("Required UI elements not found!");return}pn=null,oh.addEventListener("click",()=>{Re="singleplayer",xt&&(xt.style.display="none"),Un&&(Un.style.display="none"),ac()}),ah.addEventListener("click",async()=>{Re="multiplayer";try{Me&&(Me.textContent="Status: Connecting to server..."),await wS();const m=`${On==="random"?"any":On.toString()}_${Math.floor(Date.now()/6e4)}`;TS(m),xt&&(xt.style.display="none"),Un&&(Un.style.display="none"),ac()}catch(p){console.error("Failed to connect to signaling server:",p),Me&&(Me.textContent="Status: Connection failed, using manual mode"),xt&&(xt.style.display="block"),Un&&(Un.style.display="block"),ac()}}),HM.addEventListener("click",dE),VM.addEventListener("click",hE),WM.addEventListener("click",fE),XM.addEventListener("click",pE),Fr.addEventListener("click",()=>{const p=Ai().length;p>0&&Re==="multiplayer"?(Be=Date.now(),fe=Us(Be,On),N=new vn(Be),wi=new vn(Be+Xr()),console.log(`Game initiator: Generated seed=${Be}, type=${fe}`),bc({type:"map_seed",data:{seed:Be,mapType:fe}}),bc({type:"start_game_request",data:{requesterId:Ut||"unknown"}}),jc(),Oo(),Ot(`Game starting! Sent request to ${p} player(s).`,500)):alert("No connected players to start the game with!")}),jM.addEventListener("click",()=>{ze&&ze.readyState==="open"?xt.style.display="none":alert("Connect to a peer first!")}),ro.addEventListener("click",async()=>{if(Mi&&Mi.value)try{await navigator.clipboard.writeText(Mi.value);const p=ro.textContent;ro.textContent="Copied!",setTimeout(()=>{ro.textContent=p},1500)}catch(p){console.error("Failed to copy local SDP: ",p),alert("Failed to copy local SDP. See console for details.")}}),so.addEventListener("click",async()=>{if(Tn&&Tn.value)try{await navigator.clipboard.writeText(Tn.value);const p=so.textContent;so.textContent="Copied!",setTimeout(()=>{so.textContent=p},1500)}catch(p){console.error("Failed to copy local ICE candidates: ",p),alert("Failed to copy local ICE candidates. See console for details.")}});const i=document.getElementById("map-arena-btn"),e=document.getElementById("map-urban-btn"),t=document.getElementById("map-forest-btn"),n=document.getElementById("map-plains-btn"),r=document.getElementById("map-mountain-btn"),s=document.getElementById("map-random-btn"),a=[i,e,t,n,r,s],o=document.getElementById("settings-btn"),l=document.getElementById("settings-panel"),c=document.getElementById("back-to-menu-btn"),u=document.getElementById("mouse-sensitivity-slider"),d=document.getElementById("sensitivity-value"),h=document.getElementById("instructions-btn"),f=document.getElementById("instructions-modal"),g=document.getElementById("close-instructions-btn");if(!i||!e||!t||!n||!r||!s||!o||!l||!c||!u||!d||!h||!f||!g){console.error("UI elements not found!");return}else{let p=function(m){a.forEach(v=>{v&&v.classList.remove("selected-map")}),m&&m.classList.add("selected-map")};i.addEventListener("click",()=>{On=0,p(i)}),e.addEventListener("click",()=>{On=1,p(e)}),t.addEventListener("click",()=>{On=2,p(t)}),n.addEventListener("click",()=>{On=3,p(n)}),r.addEventListener("click",()=>{On=4,p(r)}),s.addEventListener("click",()=>{On="random",p(s)}),p(s)}o.addEventListener("click",()=>{Yt.style.display="none",l.style.display="flex"}),c.addEventListener("click",()=>{l.style.display="none",Yt.style.display="flex"}),u.addEventListener("input",()=>{const p=parseFloat(u.value);d.textContent=p.toFixed(1),po=p,xe&&(xe.sensitivity=.002*po),localStorage.setItem("mouseSensitivity",p.toString())}),h.addEventListener("click",()=>{Yt.style.display="none",f.style.display="flex"}),g.addEventListener("click",()=>{f.style.display="none",Yt.style.display="flex"});const _=localStorage.getItem("mouseSensitivity");if(_){const p=parseFloat(_);po=p,u.value=p.toString(),d.textContent=p.toFixed(1)}}function ac(){!Yt||!Xn||!Wi||!ki||(Yt.style.display="none",Wi.style.display="block",vt=!1,Re==="singleplayer"?(ki.textContent="Click to Start Single Player",Be=Date.now(),fe=Us(Be,On),N=new vn(Be),wi=new vn(Be+Xr()),console.log(`SP Start: Seed=${Be}, Type=${fe}, Selected=${On}`),Vi=performance.now()):Re==="multiplayer"&&(ki.textContent="Connect via P2P, then Click to Start",Un&&(Un.style.display="block"),xt&&(!ze||ze.readyState!=="open")&&(xt.style.display="block"),hi()),Xn.style.display="flex",Hs||Wf(),Re==="singleplayer"&&Oo())}function No(){console.log("Attempting to reset P2P state..."),ze&&(console.log("Closing data channel"),ze.close(),ze=null),et&&(console.log("Closing peer connection"),et.close(),et=null),Mi&&(Mi.value=""),gr&&(gr.value=""),Tn&&(Tn.value=""),Ls&&(Ls.value=""),pn=null,Be=null,N=null,fe=void 0,Me&&(Me.textContent="Status: Disconnected"),Re==="multiplayer"&&xt&&(!ze||ze.readyState!=="open")&&(xt.style.display="block"),console.log("P2P State Reset Complete")}function Oo(){if(rt=Fn,vt=!1,bi=0,$c.clear(),Ps=0,ri=!1,Re==="singleplayer"&&(Nf(),Vi=performance.now()),Re==="singleplayer"?!N||Be===null||Be===void 0?(console.warn("SP resetGameScene: PRNG or MapSeed missing. This should have been set by startGame. Re-initializing as a fallback."),Be=Be??Date.now(),fe=Us(Be,On),N=new vn(Be),wi=new vn(Be+Xr())):fe==null&&(console.warn("SP resetGameScene: currentMapType missing, but PRNG/seed exists. Re-determining map type."),fe=Us(Be,On)):Re==="multiplayer"&&((!N||Be===null||Be===void 0)&&console.error("MP resetGameScene: PRNG or map seed is NOT INITIALIZED. Map generation may fail or desync."),fe==null&&console.error("MP resetGameScene: currentMapType is NOT SET. Map features might not generate as expected or desync.")),N||(console.warn("resetGameScene Fallback: PRNG still not initialized. Using random seed and Arena map as last resort."),Be=Date.now(),fe=Us(Be,"random"),N=new vn(Be),wi=new vn(Be+Xr())),console.log(`Resetting scene with: Mode=${Re}, Seed=${Be}, Type=${fe}, PRNG Valid: ${!!N}`),N&&console.log(`PRNG Next (consumed for log): ${N.next()}`),Of(),Xt&&Xt.material instanceof Ye){let t=Bf;fe===1?t=yS:fe===2?t=vS:fe===3?t=xS:fe===4&&(t=MS),Xt.material.color.setHex(t)}if(j&&j.fog instanceof Ya&&(fe===1?(j.fog.color.setHex(10526880),j.fog.near=0,j.fog.far=180):fe===2?(j.fog.color.setHex(3100463),j.fog.near=0,j.fog.far=120):fe===3?(j.fog.color.setHex(8900331),j.fog.near=0,j.fog.far=8e3):fe===4?(j.fog.color.setHex(7048800),j.fog.near=0,j.fog.far=400):(j.fog.color.setHex(8900331),j.fog.near=0,j.fog.far=250)),j){let t=8900331;fe===1?t=6323595:fe===2?t=3825419:fe===4&&(t=4620980),j.background=new Te(t)}if(ks.forEach(t=>{j.remove(t),t.geometry&&t.geometry.dispose(),Array.isArray(t.material)?t.material.forEach(n=>n.dispose()):t.material&&t.material.dispose()}),ks.clear(),Ua.clear(),rr.forEach(t=>{j.remove(t.mesh),t.mesh.geometry&&t.mesh.geometry.dispose()}),rr.length=0,sr.forEach(t=>{j.remove(t.mesh),t.mesh.geometry&&t.mesh.geometry.dispose()}),sr.length=0,Ir.length=0,We.forEach(t=>{t.parent===j?j.remove(t):t.parent&&t.parent.remove(t),t instanceof X&&t.geometry&&t.geometry.dispose(),t.name.startsWith("forest_bush_")&&t instanceof X&&t.material&&!Array.isArray(t.material)&&t.material.dispose()}),We.length=0,jr.forEach(t=>{t.parent===j&&j.remove(t),t.traverse(n=>{n instanceof X&&(n.geometry&&n.geometry.dispose(),n.material&&(Array.isArray(n.material)?n.material.forEach(r=>r.dispose()):n.material.dispose()))})}),jr.length=0,si.length=0,aE(),ur=!1,dr=!1,hr=!1,fr=!1,ni=!1,ii=!1,lE(),xe){const t=xe.getObject();let n;if(Re==="multiplayer"){const r=Ha();n=Fo(r)}else{const r=Ha();n=Fo(r)}t.position.copy(n),Ht&&(Ht.rotation.x=0),t.rotation.y=0}or("handgun"),vr=!1,Ni=0,ui.set(0,0,0),Kn=0,zr=!1,Ur=0,tr.set(0,0,0),$e.fov=Wc,$e.updateProjectionMatrix(),mr&&(mr.style.display="none");const i=j.getObjectByName("remotePlayer_1");i&&(j.remove(i),i.traverse(t=>{t instanceof X&&t.geometry&&t.geometry.dispose()})),qe=null,En=null,wn=null,bn=null;let e=!0;if(et&&Re==="multiplayer"){const t=et;(t.connectionState==="connecting"||t.connectionState==="connected"||t.iceConnectionState==="checking"||t.iceConnectionState==="connected"||t.iceConnectionState==="completed"||t.iceGatheringState==="gathering"||t.signalingState==="have-local-offer"||t.signalingState==="have-remote-offer"||t.signalingState==="stable"&&t.connectionState!=="closed"&&t.connectionState!=="failed"&&t.connectionState!=="disconnected")&&(e=!1)}else Re!=="multiplayer"&&!et&&(e=!1);Re==="multiplayer"?(uE(),e&&(!ze||ze.readyState!=="open")&&No()):e&&No(),Fa=performance.now()}function kS(){const i=new tn,e=new Ye({color:3947580,metalness:.7,roughness:.35}),t=new Ue(.07,.1,.22),n=new X(t,e);n.castShadow=!0,i.add(n);const r=new Ue(.06,.13,.06),s=new X(r,e);s.position.set(0,-.08,.03),s.rotation.x=-.2,s.castShadow=!0,n.add(s);const a=.13,o=.025,l=new Bt(o,o,a,16),c=new X(l,e);c.position.set(0,.02,-(t.parameters.depth/2-a/2+.005)),c.rotation.x=Math.PI/2,c.castShadow=!0,n.add(c);const u=new pt;u.position.set(0,a/2,0),c.add(u);const d=.018,h=new Ue(.01,d,.01),f=new X(h,e);f.position.set(0,o+d/2,-.045),c.add(f);const g=new Ue(.007,.015,.01),_=new X(g,e);_.position.set(-.015/2-.007/2,t.parameters.height/2+.015/2,t.parameters.depth/2-.01/2-.01),n.add(_);const p=new X(g,e);return p.position.set(.015/2+.007/2,t.parameters.height/2+.015/2,t.parameters.depth/2-.01/2-.01),n.add(p),{model:i,muzzlePoint:u}}function Kc(){const i=new tn;return GS(i),i}function kf(){lt&&(j.remove(lt),lt.traverse(i=>{i instanceof X&&(i.geometry&&i.geometry.dispose(),i.material&&(Array.isArray(i.material)?i.material.forEach(e=>e.dispose()):i.material.dispose()))})),lt=Kc(),lt.visible=!1,j.add(lt)}function GS(i){const e=new Ye({color:26316,metalness:.8,roughness:.2}),t=new Ye({color:2236962,metalness:.3,roughness:.8}),n=new Ye({color:16711680,metalness:.6,roughness:.3}),r=new Ye({color:8947848,metalness:.9,roughness:.1}),s=new Ue(.4,.6,4),a=new X(s,e);a.position.set(0,.6,0),a.castShadow=!0,i.add(a);const o=new Bt(.5,.5,.25,16),l=new X(o,t);l.position.set(0,.5,-1.8),l.rotation.z=Math.PI/2,l.castShadow=!0,i.add(l);const c=new X(o,t);c.position.set(0,.5,1.8),c.rotation.z=Math.PI/2,c.castShadow=!0,i.add(c);const u=new Ue(.6,.5,1.2),d=new X(u,e);d.position.set(0,.4,0),d.castShadow=!0,i.add(d);const h=new Bt(.03,.03,1.2,8),f=new X(h,r);f.position.set(0,1.4,-1.4),f.rotation.z=Math.PI/2,f.castShadow=!0,i.add(f);const g=new Ue(.6,.1,1),_=new X(g,n);_.position.set(0,1,.5),_.castShadow=!0,i.add(_);const p=new Ue(.6,.8,.1),m=new Ye({color:39423,transparent:!0,opacity:.7,metalness:.1,roughness:.1}),v=new X(p,m);v.position.set(0,1.2,-1.6),v.castShadow=!0,i.add(v);const y=new Zt(.2),M=new Ye({color:16777130,emissive:16777028,emissiveIntensity:.8}),P=new X(y,M);P.position.set(0,.8,-2.1),P.castShadow=!0,i.add(P);const A=new Zt(.12),R=new Ye({color:16711680,emissive:4456448,emissiveIntensity:.5}),I=new X(A,R);I.position.set(0,1,2),I.castShadow=!0,i.add(I)}function HS(){const i=new tn,e=new Ye({color:2631720,metalness:.6,roughness:.4}),t=new Ue(.08,.1,.7),n=new X(t,e);n.position.y=.03,n.castShadow=!0,i.add(n);const r=.6,s=.02,a=new Bt(s,s,r,12),o=new X(a,e);o.rotation.x=Math.PI/2,o.position.set(0,.01,-(t.parameters.depth/2+r/2-.05)),o.castShadow=!0,n.add(o);const l=new pt;l.position.set(0,r/2,0),o.add(l);const c=.25,u=.03,d=new Bt(u,u,c,12),h=new X(d,e);h.name="sniperScopeMesh",h.rotation.x=Math.PI/2,h.position.set(0,t.parameters.height/2+u-.01,-.1),h.castShadow=!0,n.add(h);const f=new Ue(.07,.08,.25),g=new X(f,e);return g.position.set(0,-.02,t.parameters.depth/2+.05),g.rotation.x=.3,g.castShadow=!0,n.add(g),{model:i,muzzlePoint:l}}function VS(){const i=new tn,e=new Ye({color:3355443,metalness:.65,roughness:.4}),t=new Ue(.07,.09,.35),n=new X(t,e);n.position.y=.01,n.castShadow=!0,i.add(n);const r=.15,s=.02,a=new Bt(s,s*.9,r,10),o=new X(a,e);o.rotation.x=Math.PI/2,o.position.set(0,.005,-(t.parameters.depth/2+r/2-.02)),o.castShadow=!0,n.add(o);const l=new pt;l.position.set(0,r/2,0),o.add(l);const c=new Ue(.035,.12,.07),u=new X(c,e);u.position.set(0,-.06,-.05),u.rotation.x=.15,u.castShadow=!0,n.add(u);const d=new Ue(.05,.07,.1),h=new X(d,e);h.position.set(0,-.03,t.parameters.depth/2-.03),h.castShadow=!0,n.add(h);const f=new Ue(.02,.015,.15),g=new X(f,e);return g.position.set(0,t.parameters.height/2+.0075,-.05),n.add(g),{model:i,muzzlePoint:l}}function WS(){const i=new tn,e=new yn({color:9127187}),t=new yn({color:12632256}),n=new Bt(.015,.015,2,8),r=new X(n,e);r.castShadow=!0,i.add(r);const s=new Zr(.03,.2,8),a=new X(s,t);a.position.y=1.1,a.castShadow=!0,i.add(a);const o=new Bt(.02,.02,.05,8),l=new X(o,t);l.position.y=.9,i.add(l);const c=new pt;return c.position.set(0,1.2,0),i.add(c),i.scale.set(.8,.8,.8),i.rotation.z=Math.PI/6,{model:i,tipPoint:c}}function XS(){const i=new tn,e=new yn({color:4873507}),t=new yn({color:2894892}),n=new yn({color:9127187}),r=new yn({color:8900331,transparent:!0,opacity:.3}),s=new yn({color:4873507}),a=new Bt(.4,.2,8,16),o=new X(a,e);o.rotation.x=Math.PI/2,o.castShadow=!0,i.add(o);const l=new Bt(.45,.4,1.5,12),c=new X(l,t);c.position.z=3.75,c.rotation.x=Math.PI/2,c.castShadow=!0,i.add(c);const u=new Bt(.1,.1,.2,8),d=new X(u,t);d.position.z=4.7,d.rotation.x=Math.PI/2,i.add(d);for(let L=0;L<3;L++){const U=new Ue(.05,.8,2),z=new X(U,n);z.position.z=4.8,z.rotation.z=L*2*Math.PI/3,z.castShadow=!0,i.add(z)}const h=new Zt(.35,12,8,0,Math.PI*2,0,Math.PI/2),f=new X(h,r);f.position.y=.2,f.position.z=1,i.add(f);const g=new Ue(4.5,.1,1.2),_=new X(g,s);_.position.x=-2.8,_.position.z=.2,_.castShadow=!0,i.add(_);const p=new Ue(4.5,.1,1.2),m=new X(p,s);m.position.x=2.8,m.position.z=.2,m.castShadow=!0,i.add(m);const v=new Ue(.1,1.5,.8),y=new X(v,s);y.position.y=.5,y.position.z=-3.5,y.castShadow=!0,i.add(y);const M=new Ue(1.8,.05,.6),P=new X(M,s);P.position.z=-3.2,P.castShadow=!0,i.add(P);const A=new yn({color:2236962}),R=new Ue(.1,.4,.1),I=new X(R,A);I.position.set(-1,-.5,.5),i.add(I);const S=new Ue(.1,.4,.1),T=new X(S,A);T.position.set(1,-.5,.5),i.add(T);const G=new Ue(.05,.2,.05),V=new X(G,A);V.position.set(0,-.3,-3),i.add(V);const J=new pt;return J.position.set(0,0,0),i.add(J),i.scale.set(.8,.8,.8),{model:i,centerPoint:J}}function jS(){if(!j)return;const i=200;for(let e=0;e<i;e++){const t=new tn,n=Math.floor(Math.random()*5)+3;for(let r=0;r<n;r++){const s=new Zt(10+Math.random()*15,8,6),a=new yn({color:16777215,transparent:!0,opacity:.6+Math.random()*.3,depthWrite:!1}),o=new X(s,a);o.position.set((Math.random()-.5)*30,(Math.random()-.5)*10,(Math.random()-.5)*30);const l=.8+Math.random()*.4;o.scale.setScalar(l),t.add(o)}t.position.set((Math.random()-.5)*15e3,80+Math.random()*200,(Math.random()-.5)*15e3),t.rotation.y=Math.random()*Math.PI*2,t.driftVelocity=new E((Math.random()-.5)*2,0,(Math.random()-.5)*2),pf.push(t),j.add(t)}}function qS(i){eh+=i;for(const e of pf){const t=e.driftVelocity;t&&e.position.add(t.clone().multiplyScalar(i)),e.position.x>7500&&(e.position.x=-7500),e.position.x<-7500&&(e.position.x=7500),e.position.z>7500&&(e.position.z=-7500),e.position.z<-7500&&(e.position.z=7500),e.position.y+=Math.sin(eh*.5+e.position.x*.001)*.1*i}}function Gf(){if(!Tt||nh<=0)return;const i=performance.now(),e=6e4/yM;if(i-th<e)return;th=i,nh--;const t=new E(0,-.2,3.5),n=hn.clone().add(t.applyQuaternion(Dt)),r=new E(0,0,1).applyQuaternion(Dt),s=new Zt(.02,4,4),a=new pi({color:16766720}),o=new X(s,a);o.position.copy(n),j.add(o);const c=r.clone().multiplyScalar(800),u={mesh:o,velocity:c,lifeTime:3e3,spawnTime:i,weaponType:"smg",distanceTraveled:0,initialPosition:n.clone()};rr.push(u);const d=new Zt(.1,4,4),h=new pi({color:16777215}),f=new X(d,h);f.position.copy(n),j.add(f),setTimeout(()=>{j.remove(f),d.dispose(),h.dispose()},50)}function $S(){st={handgun:{hipPosition:new E(.2,-.2,-.4),adsPosition:new E(0,-.065,-.38),hipRotation:new _t(0,-Math.PI/45,0),adsRotation:new _t(0,0,0),adsFov:50,recoilAmount:new E(.01,.025,.06),recoilDuration:.05,recoilReturnSpeed:18,fireRate:200,projectileSpeed:250,projectileMaterial:IM,model:Io,muzzlePoint:xf,damage:25,magazineCapacity:15,reloadTime:500,ballisticCoefficient:.15,airDensity:1.225},sniper:{hipPosition:new E(.3,-.22,-.6),adsPosition:new E(0,-.11,-.4),hipRotation:new _t(0,-Math.PI/60,0),adsRotation:new _t(0,0,0),adsFov:20,recoilAmount:new E(.005,.07,.15),recoilDuration:.15,recoilReturnSpeed:12,fireRate:500,projectileSpeed:850,projectileMaterial:UM,model:pr,muzzlePoint:Mf,damage:105,magazineCapacity:5,reloadTime:1500,zeroingDistance:100,ballisticCoefficient:.5,airDensity:1.225},smg:{hipPosition:new E(.25,-.18,-.45),adsPosition:new E(.01,-.075,-.39),hipRotation:new _t(0,-Math.PI/50,0),adsRotation:new _t(0,0,0),adsFov:60,recoilAmount:new E(.025,.035,.04),recoilDuration:.06,recoilReturnSpeed:16,fireRate:100,projectileSpeed:300,projectileMaterial:FM,model:Uo,muzzlePoint:Sf,damage:20,spreadAngle:Ct.degToRad(7),adsSpreadMultiplier:.45,magazineCapacity:30,reloadTime:1e3,ballisticCoefficient:.18,airDensity:1.225},spear:{hipPosition:new E(.8,-.2,-.4),adsPosition:new E(0,-.1,-.3),hipRotation:new _t(0,0,0),adsRotation:new _t(0,0,0),hipQuaternion:new Qt().setFromEuler(new _t(-Math.PI/4,-Math.PI/8,0)),adsQuaternion:new Qt().setFromEuler(new _t(-Math.PI/2,0,0)),adsFov:65,recoilAmount:new E(0,0,0),recoilDuration:0,recoilReturnSpeed:0,fireRate:300,projectileSpeed:0,model:ka,muzzlePoint:Ef,damage:200,magazineCapacity:999,reloadTime:0,thrustRange:3,thrustSpeed:15}},Ei={handgun:st.handgun.magazineCapacity||15,sniper:st.sniper.magazineCapacity||5,smg:st.smg.magazineCapacity||30,spear:999}}function or(i){if(!st[i]||!st[i].model){console.error(`Weapon type ${i} or its model is not initialized.`);return}if(St&&!Kd.includes(i)){Ot(`Cannot use ${i} while on bike! Only ${Kd.join(", ")} allowed.`,500);return}ri&&at==="smg"&&i!=="smg"&&(ri=!1),at=i;const e=st[at];Io.visible=i==="handgun",pr.visible=i==="sniper",Uo.visible=i==="smg",ka.visible=i==="spear";const t=pr.getObjectByName("sniperScopeMesh");t&&(t.visible=!0),ni=!1,ii=!1,e.model&&e.hipPosition&&(e.model.position.copy(e.hipPosition),i==="spear"&&e.hipQuaternion?e.model.quaternion.copy(e.hipQuaternion):e.hipRotation&&e.model.rotation.copy(e.hipRotation)),vr=!1,Ni=0,ui.set(0,0,0),Kn=0,zr=!1,Ur=0,tr.set(0,0,0),Object.keys(Ei).length===0&&(Ei={handgun:st.handgun.magazineCapacity||15,sniper:st.sniper.magazineCapacity||5,smg:st.smg.magazineCapacity||30,spear:999}),mr&&(mr.style.display="none");const n=document.getElementById("zeroing-display");n&&(i==="sniper"?(n.style.display="block",Hf()):n.style.display="none");const r=document.getElementById("zoom-display");r&&(i==="sniper"?(Gs=0,r.style.display="block",wf()):r.style.display="none")}function Hf(){const i=document.getElementById("second-zero"),e=document.getElementById("first-zero");if(i&&e&&at==="sniper"){const t=st.sniper;if(t&&t.projectileSpeed){const n=YS(Cs,t.projectileSpeed);i.textContent=`${Cs}m (2nd)`,e.textContent=`${Math.round(n)}m (1st)`}}}function Vf(){const i=document.getElementById("ammo-text"),e=document.getElementById("reload-progress-container"),t=document.getElementById("reload-progress-bar");if(!(!i||!e||!t))if(Gi){i.style.display="none",e.style.display="block";const n=st[at];if(n&&n.reloadTime){const r=performance.now()-Xc,s=Math.min(r/n.reloadTime,1),a=Math.round(s*100);t.style.setProperty("--progress",`${a}%`)}}else{i.style.display="block",e.style.display="none";const n=st[at],r=Ei[at]||0,s=(n==null?void 0:n.magazineCapacity)||0;i.textContent=`${r}/${s}`}}function YS(i,e){const n=i*.1;return Math.max(5,n)}function ZS(i,e){const t=Do,n=e,r=i,s=t*r/(n*n);return s>1?(console.warn(`Zeroing distance ${r}m is too far for velocity ${n}m/s`),Math.atan(t*r/(n*n))):.5*Math.asin(s)}function ph(i){at==="sniper"&&(Cs=Math.max(50,Math.min(300,Cs+i)),Hf(),Ot(`Zeroing: ${Cs}m`))}function KS(){if(!(!xe||!xe.isLocked||vt))if(St=!St,St){const i=xe.getObject();$t.copy(i.position),zi=i.rotation.y,mn=0,lt||kf(),lt&&(lt.visible=!0,lt.position.copy($t),lt.position.y+=.5,lt.rotation.y=zi),at!=="handgun"&&or("handgun"),Ot("Bike ON - W/S: Accelerate/Brake, A/D: Turn",500)}else{if(lt&&(lt.visible=!1),mn=0,Qa=!1,el=!1,tl=!1,nl=!1,Dr=0,vs=0,xe){const i=xe.getObject();i.rotation.order="YXZ",i.rotation.z=0}Ot("Bike OFF",500)}}function JS(){if(!(!xe||!xe.isLocked||vt)){if(St){Ot("Cannot enter aircraft while on bike!",500);return}if(Tt=!Tt,window.isOnPlane=Tt,Tt){const i=xe.getObject();hn.copy(i.position),hn.y+=10,Dt.setFromEuler(new _t(0,i.rotation.y,0)),Jt.set(0,0,50),Jt.applyQuaternion(Dt),Nn.set(0,0,0),wt.pitch=0,wt.roll=0,wt.yaw=0,wt.throttle=.5,Hn&&(Hn.visible=!0,Hn.position.copy(hn),Hn.quaternion.copy(Dt)),wo=!1,bo=!1,To=!1,Ao=!1,Ro=!1,Po=!1,Co=!1,Lo=!1,Ot("Aircraft ON - WASD: Pitch/Roll, QE: Yaw, ZX: Throttle",1e3)}else Hn&&(Hn.visible=!1),wo=!1,bo=!1,To=!1,Ao=!1,Ro=!1,Po=!1,Co=!1,Lo=!1,xe&&Ht&&(Ht.rotation.x=0),or(at),Ot("Aircraft OFF",500)}}function QS(){if(Gi||vt)return;const i=st[at];!i||!i.magazineCapacity||!i.reloadTime||Ei[at]>=i.magazineCapacity||(Gi=!0,Xc=performance.now(),at==="smg"&&(ri=!1))}function Wf(){if(Hs)return;if(j=new vv,j.background=new Te(8900331),j.fog=new Ya(8900331,0,250),$e=new In(Wc,window.innerWidth/window.innerHeight,.1,1e3),!Wi){console.error("Game container not found for renderer!");return}Zn=new Vh({antialias:!0}),Zn.setPixelRatio(window.devicePixelRatio),Zn.setSize(window.innerWidth,window.innerHeight),Zn.shadowMap.enabled=!0,Zn.shadowMap.type=gh,Wi.appendChild(Zn.domElement),xe=new Sx($e,Zn.domElement),xe.sensitivity=.002*po;const i=xe.onMouseMove;xe.onMouseMove=function(l){if(this.isLocked===!1)return;const c=bf(),u={...l,movementX:l.movementX*c,movementY:l.movementY*c};i.call(this,u)},setTimeout(()=>{if(Ht=$e.parent,!(Ht&&Ht instanceof pt&&Ht.parent===xe.getObject())){console.warn("Primary method for pitchObject (camera.parent) failed or structure unexpected. Trying fallback.");const l=xe.getObject();l&&l.children&&l.children.length>0&&l.children[0]instanceof pt?Ht=l.children[0]:(Ht=new pt,Ht.add($e),xe.getObject().add(Ht))}},0),Xn&&(Xn.addEventListener("click",()=>{if(!vt){if(Re==="multiplayer"&&(!ze||ze.readyState!=="open")){alert("Please connect to a peer first using the P2P controls.");return}xe.lock()}}),xe.addEventListener("lock",()=>{if(vt)return;Xn.style.display="none",Re==="multiplayer"&&xt&&(xt.style.display="none");const l=document.getElementById("ammo-counter");l&&(l.style.display="block",Vf()),Fa=performance.now(),Ir.length=0,ri=!1}),xe.addEventListener("unlock",()=>{if(vt)return;Xn.style.display="flex";const l=document.getElementById("ammo-counter");l&&(l.style.display="none"),Re==="multiplayer"&&xt&&(!ze||ze.readyState!=="open")&&(xt.style.display="block"),ur=!1,dr=!1,hr=!1,fr=!1,ni=!1,ii=!1,ri=!1,Yt&&Re!=="idle"?Yt.style.display="none":Yt&&(Yt.style.display="flex",Re="idle",et&&No())})),j.add(xe.getObject());const e=kS();Io=e.model,xf=e.muzzlePoint,$e.add(Io);const t=HS();pr=t.model,Mf=t.muzzlePoint,$e.add(pr);const n=VS();Uo=n.model,Sf=n.muzzlePoint,$e.add(Uo);const r=WS();ka=r.model,Ef=r.tipPoint,$e.add(ka),kf(),Hn=XS().model,Hn.visible=!1,j.add(Hn),jS(),$S(),or("handgun");const a=new Kh(16777215,.7);j.add(a);const o=new Zh(16777215,1.2);o.position.set(25,40,30),o.castShadow=!0,o.shadow.mapSize.width=4096,o.shadow.mapSize.height=4096,o.shadow.camera.near=.5,o.shadow.camera.far=150,o.shadow.camera.left=-60,o.shadow.camera.right=60,o.shadow.camera.top=60,o.shadow.camera.bottom=-60,j.add(o),Of(),document.addEventListener("keydown",wE),document.addEventListener("keyup",bE),document.addEventListener("mousedown",TE),document.addEventListener("mouseup",AE),document.addEventListener("contextmenu",l=>l.preventDefault()),window.addEventListener("resize",gE),Hs=!0,Tc()}function eE(){if(!N){console.error("ArenaMap: PRNG not initialized!");return}const i=sl(),e=Ho(),t=N.nextInt(Math.floor(15*e),Math.floor(24*e));for(let r=0;r<t;r++){const s=N.randFloat(2,10),a=N.randFloat(1,6),o=N.randFloat(2,10),l=new Ue(s,a,o),c=new X(l,dh);c.position.x=N.randFloat(i.minX,i.maxX),c.position.y=a/2,c.position.z=N.randFloat(i.minZ,i.maxZ),c.rotation.y=N.next()*Math.PI*2,c.castShadow=!0,c.receiveShadow=!0,c.name=`arena_obstacle_${r}`,j.add(c),We.push(c)}const n=N.nextInt(2,3);for(let r=0;r<n;r++){const s=N.randFloat(3,5),a=N.randFloat(1.5,3),o=N.randFloat(8,15),l=new Ue(s,a,o),c=new X(l,dh);c.position.x=N.randFloat(i.minX/2,i.maxX/2),c.position.z=N.randFloat(i.minZ/2,i.maxZ/2),c.position.y=a/2;const u=N.next()*Math.PI*2,d=new pt;d.position.copy(c.position),d.rotation.y=u,c.position.set(0,0,0),d.add(c),d.name=`arena_ramp_wrapper_${r}`;const h=Math.atan2(a,o);c.geometry.computeBoundingBox();const f=c.geometry.boundingBox.max.z;c.position.y=f*Math.sin(h/2)+a*.1,c.rotation.x=-h*.8,c.castShadow=!0,c.receiveShadow=!0,c.name=`arena_ramp_${r}`,j.add(d),We.push(c)}}function tE(){if(!N){console.error("UrbanMap: PRNG not initialized!");return}const i=sl(),e=Ho(),t=N.nextInt(Math.floor(20*e),Math.floor(35*e)),n=8,r=25,s=10,a=40;for(let l=0;l<t;l++){const c=N.randFloat(n,r),u=N.randFloat(s,a),d=N.randFloat(n,r),h=new Ue(c,u,d),f=new X(h,hS);f.position.x=N.randFloat(i.minX+c/2,i.maxX-c/2),f.position.y=u/2,f.position.z=N.randFloat(i.minZ+d/2,i.maxZ-d/2);let g=!1;const _=new dt().setFromObject(f);for(const p of We){const m=new dt().setFromObject(p);if(_.intersectsBox(m)){const v=_.clone().intersect(m),y=new E;if(v.getSize(y),y.x>1&&y.y>1&&y.z>1){g=!0;break}}}if(g&&N.next()<.7){f.geometry&&f.geometry.dispose();continue}f.castShadow=!0,f.receiveShadow=!0,f.name=`urban_building_${l}`,j.add(f),We.push(f)}const o=N.nextInt(10,18);for(let l=0;l<o;l++){const c=N.next();let u,d,h;c<.6?(u=N.randFloat(1.8,2.5),d=N.randFloat(1.2,1.8),h=N.randFloat(3.5,5)):(u=N.randFloat(3,6),d=N.randFloat(.8,1.5),h=N.randFloat(.5,1));const f=new Ue(u,d,h),g=new X(f,fS);g.position.x=N.randFloat(i.minX,i.maxX),g.position.y=d/2,g.position.z=N.randFloat(i.minZ,i.maxZ),g.rotation.y=N.next()*Math.PI*.5;let _=!1;const p=new dt().setFromObject(g);for(const m of We)if(m.name.startsWith("urban_building_")){const v=new dt().setFromObject(m);if(p.intersectsBox(v)){_=!0;break}}if(_){g.geometry&&g.geometry.dispose();continue}g.castShadow=!0,g.receiveShadow=!0,g.name=`urban_obstacle_${l}`,j.add(g),We.push(g)}}function nE(){if(!N){console.error("ForestMap: PRNG not initialized!");return}const i=sl(),e=Ho(),t=N.nextInt(Math.floor(35*e),Math.floor(50*e));for(let s=0;s<t;s++){const a=new tn;a.name=`forest_tree_group_${s}`;const o=N.randFloat(3,10),l=N.randFloat(.3,.8),c=new Bt(l,l*.8,o,12),u=new X(c,pS);u.castShadow=!0,u.receiveShadow=!0,u.position.y=o/2,u.name=`forest_trunk_${s}`,a.add(u);const d=N.next();let h;if(d<.6){const g=N.randFloat(o*.6,o*1.2),_=N.randFloat(l*3,l*5),p=new Zr(_,g,16);h=new X(p,rc),h.position.y=o+g*.4}else{const g=N.randFloat(l*2.5,l*4),_=N.next()<.5?8:12,p=new Zt(g,_,_/2);h=new X(p,rc),h.position.y=o+g*.6}h.castShadow=!0,h.name=`forest_foliage_${s}`,a.add(h),We.push(u),We.push(h),a.position.x=N.randFloat(i.minX,i.maxX),a.position.z=N.randFloat(i.minZ,i.maxZ),a.position.y=0;let f=!1;for(const g of We)if(!(g.parent===a||!g.parent)&&g.parent&&g.parent!==j&&g.parent.name.startsWith("forest_tree_group")&&a.position.distanceTo(g.parent.position)<l*2+2){f=!0;break}if(f&&N.next()<.6){u.geometry.dispose(),h.geometry.dispose(),We.pop(),We.pop(),j.remove(a);continue}j.add(a)}const n=N.nextInt(15,25);for(let s=0;s<n;s++){const a=N.randFloat(.5,3),o=N.randFloat(.5,2.5),l=N.randFloat(.5,3),c=new Ue(a,o,l),u=new X(c,mS);u.position.x=N.randFloat(i.minX,i.maxX),u.position.y=o/2,u.position.z=N.randFloat(i.minZ,i.maxZ),u.rotation.y=N.next()*Math.PI,u.rotation.x=(N.next()-.5)*.3,u.rotation.z=(N.next()-.5)*.3,u.castShadow=!0,u.receiveShadow=!0,u.name=`forest_rock_${s}`,j.add(u),We.push(u)}const r=N.nextInt(8,15);for(let s=0;s<r;s++){const a=N.randFloat(.8,2),o=N.next()<.5?6:8,l=new Zt(a,o,o/2),c=Number(rc.color.getHex()),u=N.nextInt(0,4352),d=new Ye({color:c*.8+u,roughness:.9,metalness:0}),h=new X(l,d);h.position.x=N.randFloat(i.minX,i.maxX),h.position.y=a*.6,h.position.z=N.randFloat(i.minZ,i.maxZ),h.castShadow=!0,h.name=`forest_bush_${s}`,j.add(h),We.push(h)}}function iE(){if(!N){console.error("PlainsMap: PRNG not initialized!");return}const i=sl(),e=Ho(),t=N.nextInt(Math.floor(8*e),Math.floor(15*e));for(let a=0;a<t;a++){const o=N.randFloat(15,40),l=N.randFloat(3,12),c=new Zt(o,16,8,0,Math.PI*2,0,Math.PI*.5),u=new X(c,sc);u.position.x=N.randFloat(i.minX+o,i.maxX-o),u.position.y=0,u.position.z=N.randFloat(i.minZ+o,i.maxZ-o),u.scale.y=l/o,u.castShadow=!0,u.receiveShadow=!0,u.name=`plains_hill_${a}`,j.add(u),We.push(u)}const n=N.nextInt(Math.floor(12*e),Math.floor(20*e));for(let a=0;a<n;a++){const o=new tn;o.name=`plains_rocks_${a}`;const l=N.nextInt(2,6);for(let c=0;c<l;c++){const u=N.randFloat(1.5,4.5),d=N.randFloat(u*.8,u*2),h=new Ue(u,d,u*N.randFloat(.7,1.3)),f=new X(h,gS);f.position.x=N.randFloat(-6,6),f.position.y=d/2,f.position.z=N.randFloat(-6,6),f.rotation.y=N.randFloat(0,Math.PI*2),f.castShadow=!0,f.receiveShadow=!0,f.name=`plains_rock_${a}_${c}`,o.add(f)}o.position.x=N.randFloat(i.minX,i.maxX),o.position.z=N.randFloat(i.minZ,i.maxZ),j.add(o),We.push(o)}const r=N.nextInt(8,15);for(let a=0;a<r;a++){const o=new tn;o.name=`plains_tree_${a}`;const l=N.randFloat(8,16),c=N.randFloat(.4,1),u=new Bt(c,c*.9,l,12),d=new X(u,_S);d.position.y=l/2,d.castShadow=!0,d.receiveShadow=!0,o.add(d);const h=N.randFloat(c*4,c*7),f=new Zt(h,12,8),g=new X(f,sc);g.position.y=l+h*.5,g.scale.y=.6,g.castShadow=!0,g.receiveShadow=!0,o.add(g),o.position.x=N.randFloat(i.minX,i.maxX),o.position.z=N.randFloat(i.minZ,i.maxZ),j.add(o),We.push(o)}const s=N.nextInt(20,35);for(let a=0;a<s;a++){const o=N.randFloat(.8,2.5),l=new Zt(o,8,6),c=new X(l,sc);c.position.x=N.randFloat(i.minX,i.maxX),c.position.y=o*.3,c.position.z=N.randFloat(i.minZ,i.maxZ),c.scale.y=.4,c.castShadow=!0,c.receiveShadow=!0,c.name=`plains_vegetation_${a}`,j.add(c),We.push(c)}}function rE(){if(!N){console.error("generateMountainMap: PRNG not initialized!");return}const i="/assets/89-terrain/uploads_files_2708212_terrain.fbx";fetch(i,{method:"HEAD"}).then(e=>{if(!e.ok)throw new Error(`File not accessible: ${e.status}`);return sE(i)}).catch(e=>{Xf()})}function sE(i){new $x().load(i,t=>{t.traverse(s=>{s instanceof X&&s.geometry});const n=new Ye({color:9139029,roughness:.8,metalness:.1});t.traverse(s=>{s instanceof X&&(s.material&&(Array.isArray(s.material)?s.material.forEach(a=>a.dispose()):s.material.dispose()),s.material=n,s.castShadow=!0,s.receiveShadow=!0)});const r=2;t.scale.set(r,r,r),t.position.set(0,0,0),j.add(t),jr.push(t),si=[],t.traverse(s=>{s instanceof X&&si.push(s)}),xe&&j&&setTimeout(()=>{Kr()},100)},t=>{Xf()})}function oE(){if(!N)return;const i=new Ye({color:6908265,roughness:.9,metalness:.1}),e=250,t=N.nextInt(15,25);for(let r=0;r<t;r++){const s=N.randFloat(1.5,6),a=new Zt(s,8,8),o=new X(a,i);let l,c,u=0;do l=N.randFloat(-e,e),c=N.randFloat(-e,e),u++;while(u<10&&We.some(d=>Math.abs(d.position.x-l)<8&&Math.abs(d.position.z-c)<8));o.position.set(l,s/2,c),o.scale.set(1,N.randFloat(.7,1.3),1),o.castShadow=!0,o.receiveShadow=!0,j.add(o),We.push(o)}const n=N.nextInt(3,8);for(let r=0;r<n;r++){const s=N.randFloat(6,12),a=N.randFloat(1.5,3),o=new Bt(a*.3,a*.4,s*.6),l=new X(o,new Ye({color:9127187,roughness:.8}));let c,u,d=0;do c=N.randFloat(-e+20,e-20),u=N.randFloat(-e+20,e-20),d++;while(d<10&&We.some(g=>Math.abs(g.position.x-c)<12&&Math.abs(g.position.z-u)<12));l.position.set(c,s*.3,u),l.castShadow=!0,j.add(l),We.push(l);const h=new Zr(a,s*.6,8),f=new X(h,new Ye({color:2263842,roughness:.8}));f.position.set(c,s*.8,u),f.castShadow=!0,j.add(f),We.push(f)}}function Xf(){if(!N)return;const i=new Ye({color:6908265,roughness:.9,metalness:.1}),e=350,t=N.nextInt(2,4);for(let n=0;n<t;n++){const r=N.randFloat(30,60),s=N.randFloat(20,35),a=new Zr(s,r,8),o=new X(a,i);let l,c,u=0;do l=N.randFloat(-e,e),c=N.randFloat(-e,e),u++;while(u<15&&We.some(d=>Math.abs(d.position.x-l)<50&&Math.abs(d.position.z-c)<50));o.position.set(l,r/2,c),o.castShadow=!0,o.receiveShadow=!0,j.add(o),We.push(o)}oE(),console.log(`Generated fallback procedural mountain map with ${We.length} features`)}function aE(){if(We.forEach(t=>{t.parent===j?j.remove(t):t.parent&&t.parent!==j?j.getObjectById(t.parent.id)&&j.remove(t.parent):j.getObjectById(t.id)&&j.remove(t),t instanceof X&&t.geometry&&t.geometry.dispose(),t.name.startsWith("forest_bush_")&&t instanceof X&&t.material&&!Array.isArray(t.material)&&t.material.dispose()}),We.length=0,jr.forEach(t=>{t.parent===j&&j.remove(t),t.traverse(n=>{n instanceof X&&(n.geometry&&n.geometry.dispose(),n.material&&(Array.isArray(n.material)?n.material.forEach(r=>r.dispose()):n.material.dispose()))})}),jr.length=0,si.length=0,j.children.filter(t=>t.name.startsWith("forest_tree_group")).forEach(t=>j.remove(t)),j.children.filter(t=>t.name.startsWith("arena_ramp_wrapper_")).forEach(t=>j.remove(t)),!N){console.error("generateMapFeatures: PRNG not initialized! Cannot generate map.");return}fe==null&&(console.error("generateMapFeatures: currentMapType is not set! Cannot determine which map to generate. Defaulting to Arena."),fe=0),console.log(`Generating map features for type: ${qc[fe]} (Seed: ${Be})`),fe===1?tE():fe===2?nE():fe===3?iE():fe===4?rE():eE(),console.log(`Generated ${We.length} map features.`)}function lE(){if(!N){console.error("CreateTargets: PRNG not initialized!");return}const i=new Ue(1.5,1.5,1.5);let e=15;fe===3&&(e=25);const t=Ho(),n=Ys();let r=Math.floor(40*t),s=n;.75+N.next()*12,fe===1?.75+N.next()*25:fe===2?.75+N.next()*8:fe===3?.75+N.next()*15:fe===4&&.75+N.next()*20,console.log(`Creating ${r} targets for map type ${fe!==void 0?qc[fe]:"undefined"}`);for(let a=0;a<r;a++)for(let o=0;o<e;o++){const l=N.next(),c=N.next(),u=N.next(),d=new Ye({color:new Te(l,c,u)}),h=new X(i,d);h.position.x=(N.next()-.5)*s,fe===1?h.position.y=.75+N.next()*25:fe===2?h.position.y=.75+N.next()*5:fe===4?h.position.y=.75+N.next()*20:h.position.y=.75+N.next()*12,h.position.z=(N.next()-.5)*s,h.castShadow=!0,h.receiveShadow=!0;const f=new dt().setFromObject(h);let g=!1;for(const _ of We){const p=new dt().setFromObject(_);if(f.intersectsBox(p)){g=!0;break}}if(g)h.geometry&&h.geometry.dispose(),h.material&&!Array.isArray(h.material)&&h.material.dispose();else{const _=`target_${a}_${Be}_${N.next().toString(36).substring(7)}`;h.name=_,j.add(h),ks.set(_,h);const p=new dt().setFromObject(h);Ua.set(_,p.clone().expandByScalar(il));break}}console.log(`Placed ${ks.size} targets.`)}function cE(){const i=document.getElementById("enemy-compass"),e=document.getElementById("compass-arrow"),t=document.getElementById("compass-distance");if(!(!i||!e||!t))if(Re==="multiplayer"&&qe&&xe&&$e){i.style.display="block";const n=xe.getObject().position,r=qe.position,s=new E().subVectors(r,n).normalize(),a=new E;$e.getWorldDirection(a);const o=new E(a.x,0,a.z).normalize(),l=new E(s.x,0,s.z).normalize(),c=o.x*l.z-o.z*l.x,u=o.dot(l),h=-Math.atan2(c,u)*(180/Math.PI);e.style.transform=`rotate(${h}deg)`;const f=Math.round(n.distanceTo(r));t.textContent=`${f}m`}else i.style.display="none"}function uE(){qe&&(j.remove(qe),qe.traverse(p=>{p instanceof X&&p.geometry&&p.geometry.dispose()})),En&&En.parent&&En.parent.remove(En),wn&&wn.parent&&wn.parent.remove(wn),bn&&bn.parent&&bn.parent.remove(bn),Gt&&(j.remove(Gt),Gt.traverse(p=>{p instanceof X&&(p.geometry&&p.geometry.dispose(),p.material&&(Array.isArray(p.material)?p.material.forEach(m=>m.dispose()):p.material.dispose()))}),Gt=null);const i=new Ye({color:16729344,roughness:.6,metalness:.3});qe=new tn;const e=new Zt(Is,16,12),t=new X(e,i);t.position.y=qt.y+ft.y+Is,t.castShadow=!0,t.receiveShadow=!0,qe.add(t);const n=new Ue(ft.x,ft.y,ft.z),r=new X(n,i);r.position.y=qt.y+ft.y/2,r.castShadow=!0,r.receiveShadow=!0,qe.add(r);const s=new Ue(qt.x,qt.y,qt.z),a=new X(s,i);a.position.y=qt.y/2,a.castShadow=!0,a.receiveShadow=!0,qe.add(a);let o;const l=Ha(),c=xe?xe.getObject().position:new E(0,gt,0),u=Ys(),d=Math.max(50,u*.15);o=Fo(l,c,d),qe.position.set(o.x,o.y,o.z),qe.castShadow=!0,qe.receiveShadow=!0,qe.name="remotePlayer_1";const h=new Ye({color:5592405}),f=new Bt(.05,.05,.4,8);En=new X(f,h),En.castShadow=!0,En.visible=!0,qe.add(En);const g=new Bt(.04,.04,.8,8);wn=new X(g,h),wn.castShadow=!0,wn.visible=!1,qe.add(wn);const _=new Ue(.08,.08,.5);bn=new X(_,h),bn.castShadow=!0,bn.visible=!1,qe.add(bn),j.add(qe)}async function Jc(){console.log("Initializing PeerConnection..."),et&&et.signalingState!=="closed"&&(console.log("Closing existing PeerConnection."),et.close());const i=await Tf();et=new RTCPeerConnection(i),console.log("PeerConnection created with configuration:",i),An.set("opponent",et),Me&&(Me.textContent="Status: Initializing..."),et.onicecandidate=t=>{if(t.candidate){if(console.log("Local ICE candidate gathered:",t.candidate),Tn&&(Tn.value+=JSON.stringify(t.candidate)+`
`),sn&&sn.readyState===WebSocket.OPEN&&fo){const n={msg_type:"ice-candidate",data:t.candidate,target:hh,sender:Ut};sn.send(JSON.stringify(n)),console.log("Sent ICE candidate automatically to",hh)}}else console.log("Local ICE candidate gathering complete (event.candidate is null).")},et.onicecandidateerror=t=>{console.error("ICE candidate error:",t),Me&&(Me.textContent=`Status: ICE Error - ${t.errorCode}`)},et.onicegatheringstatechange=()=>{et&&(console.log(`ICE gathering state changed: ${et.iceGatheringState}`),Me&&(Me.textContent=`Status: ICE Gathering - ${et.iceGatheringState}`))},et.onconnectionstatechange=()=>{if(!et||!Me)return;const t=et.connectionState;if(console.log(`Connection state changed: ${t}`),Me.textContent=`Status: ${t}`,t==="connected"){console.log("PeerConnection: Connected");const n="opponent";Wn.set(n,{playerId:n,isConnected:!0}),_r(),hi()}else if(t==="disconnected"){console.warn("PeerConnection: Disconnected. This might be temporary. Waiting for potential auto-reconnect or closure.");const n="opponent",r=Wn.get(n);r&&Wn.set(n,{...r,isConnected:!1}),hi(),xt&&Re==="multiplayer"&&(xt.style.display="block")}else t==="failed"?(console.error("PeerConnection: Failed. Attempting to reset P2P state."),Wn.delete("opponent"),_r(),hi(),xt&&Re==="multiplayer"&&(xt.style.display="block"),qe&&j.remove(qe),qe=null,En=null,wn=null,bn=null,vt||No()):t==="closed"&&(console.log("PeerConnection: Closed."),Wn.delete("opponent"),_r(),hi(),xt&&Re==="multiplayer"&&(xt.style.display="block"),qe&&qe.parent&&j.remove(qe),qe=null,En=null,wn=null,bn=null)},et.ondatachannel=t=>{console.log("Data channel received:",t.channel.label),ze=t.channel,fi.set("opponent",t.channel),jf()}}function jf(){!ze||!Me||(console.log("Setting up data channel events for:",ze.label),ze.onopen=()=>{console.log(`Data channel '${ze==null?void 0:ze.label}' opened.`),Me.textContent="Status: Connected (Data Channel Open)",Re==="multiplayer"&&pn?(Be=Date.now(),fe=Us(Be,On),N=new vn(Be),wi=new vn(Be+Xr()),console.log("P1: Sending map seed:",Be,"and map type:",fe),Zs({type:"map_seed",data:{seed:Be,mapType:fe}}),Oo(),xt&&(xt.style.display="none")):Re==="multiplayer"&&!pn&&(console.log("P2: Data channel open, waiting for map seed."),xt&&(xt.style.display="none"))},ze.onclose=()=>{console.log(`Data channel '${ze==null?void 0:ze.label}' closed.`)},ze.onerror=i=>{console.error(`Data channel '${ze==null?void 0:ze.label}' error:`,i),Me&&(Me.textContent="Status: Data Channel Error")},ze.onmessage=i=>{if(!(vt&&JSON.parse(i.data).type!=="game_over_notif"))try{const e=JSON.parse(i.data);if(e.type==="playerState"&&qe){const t=e.data;let n=t.position.y-gt;if(fe===4){const r=Vs(t.position.x,t.position.z);n=Math.max(n,r)}if(t.isOnBike||(qe.position.set(t.position.x,n,t.position.z),qe.rotation.set(0,t.quaternion.y*2,0)),En&&wn&&bn){En.visible=t.weaponType==="handgun",wn.visible=t.weaponType==="sniper",bn.visible=t.weaponType==="smg";let r=null,s=null,a=null;if(t.weaponType==="handgun"?(r=En,s=Af,a=Rf):t.weaponType==="sniper"?(r=wn,s=Pf,a=Cf):t.weaponType==="smg"&&(r=bn,s=Lf,a=Df),r&&s&&a)if(t.aiming)r.position.copy(a),r.rotation.set(Math.PI/2,0,0);else{r.position.copy(s);let o=Math.PI/2+.3,l=.1;t.weaponType==="sniper"?l=.05:t.weaponType==="smg"&&(o=Math.PI/2+.25,l=.08),r.rotation.set(o,0,l)}}if(t.isOnBike){console.log("Received bike state:",{isOnBike:t.isOnBike,bikePosition:t.bikePosition,bikeDirection:t.bikeDirection,bikeBankAngle:t.bikeBankAngle}),Gt||(Gt=Kc(),Gt.name="remoteBike",j.add(Gt));const r=t.bikePosition||t.position;let s=r.y;if(fe===4&&t.bikePosition){const a=Vs(r.x,r.z);s=Math.max(s,a-1)}Gt.visible=!0,Gt.position.set(r.x,s,r.z),t.bikeDirection!==void 0&&(Gt.rotation.y=t.bikeDirection+Math.PI),t.bikeBankAngle!==void 0&&(Gt.rotation.z=t.bikeBankAngle),qe.position.set(r.x,s,r.z),t.bikeDirection!==void 0&&qe.rotation.set(0,t.bikeDirection+Math.PI,0),t.bikeBankAngle!==void 0&&(qe.rotation.z=t.bikeBankAngle*.3)}else Gt&&(Gt.visible=!1),qe.position.set(t.position.x,n,t.position.z),qe.rotation.set(0,t.quaternion.y*2,0)}else if(e.type==="gameEvent"){const t=e.data;if(t.type==="map_seed"&&!pn){const n=t.data;Be=n.seed,fe=n.mapType,N=new vn(Be),wi=new vn(Be+Xr()),console.log("P2: Received and set map seed:",Be,"and map type:",fe),Oo()}else if(t.type==="shoot"&&t.data){const n=t.data;if(n.muzzlePosition&&n.direction){const r=new X(Vc,vf);r.castShadow=!0,r.position.set(n.muzzlePosition.x,n.muzzlePosition.y,n.muzzlePosition.z);let s=st.handgun.projectileSpeed;n.weaponType==="sniper"&&st.sniper.projectileSpeed?s=st.sniper.projectileSpeed:n.weaponType==="smg"&&st.smg.projectileSpeed&&(s=st.smg.projectileSpeed);const a={mesh:r,velocity:new E(n.direction.x,n.direction.y,n.direction.z).multiplyScalar(s),lifeTime:0,spawnTime:performance.now(),weaponType:n.weaponType,distanceTraveled:0,initialPosition:new E(n.muzzlePosition.x,n.muzzlePosition.y,n.muzzlePosition.z)};j.add(r),sr.push(a)}}else if(t.type==="hit_opponent"){if(vt)return;const n=t.data;Va(n.damageDealt);const r=document.createElement("div");r.style.position="absolute",r.style.top="0",r.style.left="0",r.style.width="100%",r.style.height="100%",r.style.zIndex="1000",document.body.appendChild(r),setTimeout(()=>{document.body.contains(r)&&document.body.removeChild(r)},150);const s=n.isHeadshot?`HEADSHOT! -${n.damageDealt} HP | Health: ${Math.round(rt)}`:`HIT! -${n.damageDealt} HP | Health: ${Math.round(rt)}`;Ot(s,500),rt<=0&&(bi++,ll({type:"i_was_defeated",data:{defeatedPlayerId:Ut||"unknown"}}),al()?qr(!1):(rt=Fn,Kr()))}else if(t.type!=="i_was_defeated"){if(t.type==="game_over_notif"){const n=t.data;if(n.winnerIsPlayerOne!==null&&!vt){const r=pn===n.winnerIsPlayerOne;n.defeatedPlayerId&&(console.log(`Removing mesh for defeated player: ${n.defeatedPlayerId}`),Ws(n.defeatedPlayerId)),qr(r)}}else if(t.type==="bike_hit"){const n=t.data;vM(n.damageDealt),Ot(`Bike Hit! -${n.damageDealt} HP | Bike Health: ${Math.round(xi)}`,500)}else if(t.type==="start_game_request"){const n=t.data;console.log(`Received game start request from player: ${n.requesterId}`),Ot(`Game starting! Request from ${n.requesterId}`,500),jc()}else if(t.type==="bike_exploded"){const n=t.data;Gt&&Gt.parent&&mf(new E(n.playerPosition.x,n.playerPosition.y,n.playerPosition.z),!1),console.log("Remote player's bike exploded!")}}}}catch(e){console.error("Failed to parse message or update remote player:",e)}})}async function dE(){if(console.log("Creating offer..."),pn=!0,Tn&&(Tn.value=""),await Jc(),!et||!Mi||!Me){console.error("Cannot create offer: PeerConnection or UI elements missing.");return}console.log("Creating data channel 'gameData'."),ze=et.createDataChannel("gameData"),fi.set("opponent",ze),jf();try{const e=await et.createOffer();console.log("Offer created:",e),await et.setLocalDescription(e),console.log("Local description set with offer."),Mi.value=JSON.stringify(e),Me.textContent="Status: Offer created. Send to Peer 2."}catch(e){console.error("Error creating offer or setting local description:",e),Me&&(Me.textContent="Status: Error creating offer."),pn=null}}async function hE(){if(console.log("Creating answer..."),pn=!1,Tn&&(Tn.value=""),await Jc(),!et||!gr||!Mi||!Me){console.error("Cannot create answer: PeerConnection or UI elements missing.");return}const i=gr.value;if(!i){alert("Paste Peer 1's offer first!"),console.warn("Remote offer text is empty.");return}try{console.log("Parsing remote offer:",i);const e=JSON.parse(i);await et.setRemoteDescription(new RTCSessionDescription(e)),console.log("Remote description (offer) set.");const t=await et.createAnswer();console.log("Answer created:",t),await et.setLocalDescription(t),console.log("Local description set with answer."),Mi.value=JSON.stringify(t),Me.textContent="Status: Answer created. Send to Peer 1."}catch(e){console.error("Error creating answer or setting descriptions:",e),Me&&(Me.textContent="Status: Error creating answer."),pn=null}}async function fE(){if(!gr||!Me){console.error("Cannot set remote SDP: UI elements missing.");return}const i=gr.value;if(!i){alert("Paste remote SDP first!"),console.warn("Remote SDP text is empty.");return}console.log("Setting remote description with SDP:",i);let e;try{e=JSON.parse(i)}catch(t){alert("Invalid JSON in remote SDP textarea."),console.error("Error parsing remote SDP JSON:",t,`
Input:`,i),Me&&(Me.textContent="Status: Invalid remote SDP format.");return}if(!et)if(e.type==="offer")console.log("PeerConnection not initialized, and received an offer. Initializing as Peer 2."),pn=!1,Tn&&(Tn.value=""),await Jc();else{alert("Connection not initialized. Player 1 should 'Create Offer' first if this is an answer."),console.warn("Received non-offer SDP but PeerConnection is not initialized.");return}if(!et){alert("PeerConnection failed to initialize after attempting for offer."),console.error("PeerConnection still null after conditional init for offer.");return}try{e.type==="offer"&&!pn?(console.log("Setting remote offer. This client is Peer 2."),Tn&&et.signalingState==="stable"&&(Tn.value="")):e.type==="answer"&&pn&&console.log("Setting remote answer. This client is Peer 1."),await et.setRemoteDescription(new RTCSessionDescription(e)),console.log(`Remote description (${e.type}) set successfully.`),Me.textContent=`Status: Remote ${e.type} set.`,gr.value=""}catch(t){console.error("Error setting remote description:",t,`
SDP:`,e),Me&&(Me.textContent="Status: Error setting remote description.")}}async function pE(){if(!et||!Ls||!Me){alert("Initialize connection or UI elements missing for adding ICE candidate."),console.warn("Cannot add remote ICE: PeerConnection or UI elements missing.");return}const i=Ls.value.trim();if(!i){alert("Paste remote ICE candidate(s) first! Each candidate JSON should be on a new line."),console.warn("Remote ICE textarea is empty.");return}console.log(`Attempting to add remote ICE candidates from textarea:
`,i);const e=i.split(`
`);let t=0,n=0,r=0;for(const a of e){const o=a.trim();if(!o){console.log("Skipping empty line in ICE candidates input.");continue}r++,console.log(`Processing ICE candidate string (line ${r}): ${o}`);try{const l=JSON.parse(o);l&&(typeof l.candidate=="string"||typeof l.sdpMid=="string"||typeof l.sdpMLineIndex=="number")?(await et.addIceCandidate(new RTCIceCandidate(l)),console.log("Successfully added remote ICE candidate:",l),t++):(console.warn("Skipping invalid ICE candidate structure (parsed but not valid RTCIceCandidateInit):",o,`
Parsed:`,l),n++)}catch(l){console.error(`Error parsing or adding remote ICE candidate: "${o}"`,l),n++}}let s="Status: ";r===0?s+="No ICE candidates found in input.":(s+=`Processed ${r} candidate(s). Added: ${t}. Failed: ${n}.`,n>0&&(s+=" Check console for details.")),Me.textContent=s,console.log(s),(t>0||r>0)&&(Ls.value="")}function mE(){if(xe.isLocked&&!vt){const i=xe.getObject(),e=St?$t:i.position,t={position:{x:e.x,y:e.y,z:e.z},quaternion:{x:i.quaternion.x,y:i.quaternion.y,z:i.quaternion.z,w:i.quaternion.w},aiming:ii||ni,weaponType:at,isOnBike:St,bikeDirection:St?zi:void 0,bikeBankAngle:St?Dr:void 0,bikePosition:St?{x:$t.x,y:$t.y,z:$t.z}:void 0},n=Ai();let r=0;for(const s of n){const a=fi.get(s);if(a&&a.readyState==="open")try{a.send(JSON.stringify({type:"playerState",data:t})),r++}catch(o){console.error(`Error sending player state to ${s}:`,o)}}if(r===0&&ze&&ze.readyState==="open")try{ze.send(JSON.stringify({type:"playerState",data:t})),console.log("Sent player state via legacy channel")}catch(s){console.error("Error sending player state via legacy channel:",s)}}}function bc(i){const e=Ai();for(const t of e)cl(t,i)}function ll(i){const e=Ai();for(const t of e)t!==Ut&&cl(t,i)}function cl(i,e){const t=fi.get(i);if(t&&t.readyState==="open")try{t.send(JSON.stringify({type:"gameEvent",data:e}))}catch(n){console.error(`Error sending game event to player ${i}:`,n,`
Event:`,e)}else console.warn(`Cannot send game event to player ${i}: channel not available or not open`)}function Zs(i){if(ze&&ze.readyState==="open")try{ze.send(JSON.stringify({type:"gameEvent",data:i}))}catch(e){console.error("Error sending game event:",e,`
Event:`,i)}else bc(i)}function Kr(){const i=Ha();if(!xe||!j||i.length===0||!N)return;const e=xe.getObject();let t;if(Re==="multiplayer"&&qe&&qe.parent){const n=new E;qe.getWorldPosition(n);const r=Ys(),s=Math.max(50,r*.15);t=Fo(i,n,s)}else t=Fo(i);if(e.position.copy(t),rt=Fn,za=0,Hc=0,Qi=!1,er=!1,Bo(),e.rotation.y=0,Ht&&(Ht.rotation.x=0),St){lt&&(j.remove(lt),lt=null),St=!1,xi=Gc,mn=0;const n=document.getElementById("speedometer"),r=document.getElementById("bike-durability");n&&(n.style.display="none"),r&&(r.style.display="none")}Mc.set(0,0,0),Ot("RESPAWNED!",500)}function qr(i){if(vt)return;vt=!0,ri=!1,xe.unlock(),console.log(`Game Over. Player ${i?"WON":"LOST"}. My PlayerOne status: ${pn}`);const e=i?"YOU WIN!":"YOU LOSE!";if(Xn&&ki&&(Xn.style.display="flex",ki.textContent=e,Un&&(Un.style.display="none")),ze){const t={winnerIsPlayerOne:i?pn:pn===null?null:!pn,defeatedPlayerId:i?void 0:Ut||"unknown"};console.log("Sending game_over_notif, data:",t),Zs({type:"game_over_notif",data:t})}setTimeout(()=>{Re="idle",Yt&&(Yt.style.display="flex"),Wi&&(Wi.style.display="none"),Xn&&ki&&(Xn.style.display="none",ki.textContent="Click to Start"),xt&&(xt.style.display="none")},5e3)}function gE(){!$e||!Zn||($e.aspect=window.innerWidth/window.innerHeight,$e.updateProjectionMatrix(),Zn.setSize(window.innerWidth,window.innerHeight))}function Ae(i){Ir.push({timestamp:performance.now(),action:i})}function _E(){ws&&xe&&(Ji=LM,ws=!1)}function yE(i,e,t){return Math.acos(Math.abs(t.y))*(180/Math.PI)<=DM}function vE(i,e){if(fe!==4||si.length===0)return null;const t=e.clone();t.y=i.y+rh;const n=new $s;n.set(new E(t.x,t.y+1,t.z),new E(0,-1,0));const r=n.intersectObjects(si);if(r.length>0){const s=r[0].point.y,a=s-i.y+gt;if(a>0&&a<=rh)return new E(e.x,s+gt,e.z)}return null}function xE(i,e){var a;if(fe!==4||si.length===0)return{canMove:!0};const t=i.clone();t.y+=gt*.5;const n=e.clone().normalize(),s=new $s(t,n,0,rn*2).intersectObjects(si);if(s.length>0){const o=s[0],l=(a=o.face)==null?void 0:a.normal;if(l){const c=l.clone().transformDirection(o.object.matrixWorld);if(yE(i,o.point,c)){const u=i.clone().add(e),d=vE(i,u);return d?{canMove:!0,adjustedPos:d}:{canMove:!0}}return{canMove:!1}}}return{canMove:!0}}function Va(i){rt=Math.max(0,rt-i),za=performance.now(),Qi=!1,Bo()}function ME(){const i=performance.now(),e=er,t=ur||dr||hr||fr,n=mt.length()>.1;er=t||n,er&&(Hc=i),e!==er&&console.log(`Movement status changed: ${er?"Moving":"Stopped"}`)}function Bo(){const i=document.getElementById("health-bar-container"),e=document.getElementById("health-bar-fill"),t=document.getElementById("health-text"),n=document.getElementById("speed-text");if(!i||!e||!t||!n)return;if(SE(),xe&&xe.isLocked&&!vt)i.style.display="block";else{i.style.display="none";return}const r=rt/Fn*100;e.style.width=`${r}%`,t.textContent=`${Math.round(rt)}/${Fn}`;const s=Math.max(ho,ho+r/100*(gf-ho)),a=Math.round(s*100);n.textContent=`Movement: ${a}%`,a<=RM?n.style.color="#ff8888":a<=PM?n.style.color="#ffff88":n.style.color="#88ff88",e.className="",rt<=20?e.classList.add("health-critical"):rt<=40?e.classList.add("health-low"):rt<=70?e.classList.add("health-medium"):e.classList.add("health-high")}function SE(){let i=document.getElementById("player-id-container");if(i||(i=document.createElement("div"),i.id="player-id-container",i.style.position="absolute",i.style.top="80px",i.style.left="20px",i.style.color="white",i.style.fontFamily="monospace",i.style.fontSize="14px",i.style.background="rgba(0, 0, 0, 0.7)",i.style.padding="10px",i.style.borderRadius="5px",i.style.zIndex="1000",i.style.pointerEvents="none",document.body.appendChild(i)),xe&&xe.isLocked&&!vt){i.style.display="block";const e=Ut?Ut.substring(0,8):"Unknown",t=Ai();let n=`My ID: ${e}
`;n+=`Connected Players: ${t.length}
`,t.forEach((r,s)=>{const a=r.substring(0,8);n+=`Player ${s+1}: ${a}
`}),i.textContent=n}else i.style.display="none"}function EE(i){const e=performance.now(),t=e-za,n=e-Hc;if(rt<Fn&&rt>0){if(er){const s=wM*i;if(rt=Math.max(0,rt-s),Qi=!1,za=e,Bo(),rt<=0){console.log("Player died from movement while injured"),Re==="multiplayer"?(bi++,ze&&ze.readyState==="open"&&ll({type:"i_was_defeated",data:{defeatedPlayerId:Ut||"unknown"}}),al()?qr(!1):(rt=Fn,Kr())):qr(!1);return}}if(Math.max(t,n)>bM&&!er){Qi||(Qi=!0,console.log("Health regeneration started"));const s=TM*i;rt=Math.min(Fn,rt+s),Bo(),rt>=Fn&&(Qi=!1,console.log("Health fully regenerated"))}else Qi=!1}else Qi=!1}function wE(i){if(!(!xe||!xe.isLocked||vt))switch(i.code){case"KeyW":case"ArrowUp":Ae(Tt?()=>wo=!0:St?()=>Qa=!0:()=>ur=!0);break;case"KeyA":case"ArrowLeft":Ae(Tt?()=>To=!0:St?()=>tl=!0:()=>hr=!0);break;case"KeyS":case"ArrowDown":Ae(Tt?()=>bo=!0:St?()=>el=!0:()=>dr=!0);break;case"KeyD":case"ArrowRight":Ae(Tt?()=>Ao=!0:St?()=>nl=!0:()=>fr=!0);break;case"KeyQ":Tt&&Ae(()=>Ro=!0);break;case"KeyE":Tt&&Ae(()=>Po=!0);break;case"KeyZ":Tt&&Ae(()=>Lo=!0);break;case"KeyX":Tt&&Ae(()=>Co=!0);break;case"ShiftLeft":Ae(()=>ni=!0);break;case"Space":Ae(()=>_E());break;case"Digit1":Ae(()=>or("handgun"));break;case"Digit2":Ae(()=>or("sniper"));break;case"Digit3":Ae(()=>or("smg"));break;case"Digit4":Ae(()=>or("spear"));break;case"KeyR":Ae(()=>QS());break;case"KeyB":at==="sniper"&&Ae(()=>BM());break;case"PageUp":Ae(()=>ph(25));break;case"PageDown":Ae(()=>ph(-25));break;case"KeyV":Ae(()=>KS());break;case"KeyF":Ae(()=>JS());break}}function bE(i){if(vt){i.code==="ShiftLeft"&&Ae(()=>ni=!1);return}switch(i.code){case"KeyW":case"ArrowUp":Ae(Tt?()=>wo=!1:St?()=>Qa=!1:()=>ur=!1);break;case"KeyA":case"ArrowLeft":Ae(Tt?()=>To=!1:St?()=>tl=!1:()=>hr=!1);break;case"KeyS":case"ArrowDown":Ae(Tt?()=>bo=!1:St?()=>el=!1:()=>dr=!1);break;case"KeyD":case"ArrowRight":Ae(Tt?()=>Ao=!1:St?()=>nl=!1:()=>fr=!1);break;case"KeyQ":Tt&&Ae(()=>Ro=!1);break;case"KeyE":Tt&&Ae(()=>Po=!1);break;case"KeyZ":Tt&&Ae(()=>Lo=!1);break;case"KeyX":Tt&&Ae(()=>Co=!1);break;case"ShiftLeft":Ae(()=>ni=!1);break}}function TE(i){if(!(!xe||!xe.isLocked||vt||!N))if(i.button===0){if(Tt){Na=!0,Gf();return}if(at==="smg")ri=!0;else{const e=performance.now(),t=st[at];if(!t||!t.fireRate||e-Ps<t.fireRate)return;Ae(()=>{if(vt)return;const n=performance.now();if(n-Ps<t.fireRate)return;Ps=n;const r=new E;if(t.muzzlePoint.getWorldPosition(r),Ei[at]<=0||Gi)return;const s=new E;if($e.getWorldDirection(s),qf(r,s.clone(),at),Ei[at]--,Re==="multiplayer"){const a={muzzlePosition:{x:r.x,y:r.y,z:r.z},direction:{x:s.x,y:s.y,z:s.z},weaponType:at};Zs({type:"shoot",data:a})}t.model&&!vr&&(vr=!0,Ni=0)})}}else i.button===2&&Ae(()=>ii=!0)}function AE(i){if(vt){i.button===2&&Ae(()=>ii=!1);return}i.button===0?(ri&&(ri=!1),Na&&(Na=!1)):i.button===2&&Ae(()=>ii=!1)}function RE(i,e){if(!j||!$e||!xe)return;const t=st.spear;if(!t)return;let n=0;St&&Mc?n=Mc.length():(xe.getObject().position,n=t.thrustSpeed||15);const r=new $s;r.set(i,e),r.far=t.thrustRange||3;let s=!1;if(console.log(`Spear attack - Game mode: ${Re}, Zombies count: ${qn.length}`),Re==="singleplayer"&&qn.length>0)for(const a of qn){if(!a.isAlive)continue;const o=new dt().setFromObject(a.mesh),l=new E;if(r.ray.intersectBox(o,l)){const c=t.damage||60,u=1+n/20,d=Math.floor(c*u);console.log(`Spear thrust hit! Velocity: ${n.toFixed(1)} m/s, Damage: ${d}, Zombie Health: ${a.health}`),Ff(a.id,d,!1),console.log(`After damage - Zombie Health: ${a.health}, Is Alive: ${a.isAlive}`),s=!0;break}}if(Re==="multiplayer")for(const[a,o]of mi){if(!o.mainMesh.visible)continue;const l=new dt().setFromObject(o.mainMesh),c=new E;if(r.ray.intersectBox(l,c)){const u=t.damage||60,d=1+n/20,h=Math.floor(u*d);console.log(`Spear thrust hit player! Velocity: ${n.toFixed(1)} m/s, Damage: ${h}`),cl(a,{type:"hit_opponent",data:{damageDealt:h,isHeadshot:!1,attackerVelocity:n}}),s=!0;break}}PE(),s&&Ot(`Spear thrust hit! (${n.toFixed(1)} m/s)`,300)}function PE(){zr||(zr=!0,Ur=0,tr.set(0,0,0))}function qf(i,e,t){if(!j||!st[t]||!$e||!N)return;if(t==="spear"){RE(i,e);return}const n=st[t],r=e.clone();if(t==="smg"&&n.spreadAngle&&n.projectileMaterial){const d=(ii||ni)&&n.adsSpreadMultiplier!==void 0?n.adsSpreadMultiplier:1,h=n.spreadAngle*d;if(h>.001){const f=$e.quaternion,g=new E(1,0,0).applyQuaternion(f),_=new E(0,1,0).applyQuaternion(f),p=N.next()*2*Math.PI,m=Math.tan(h/2),v=N.next()*m,y=Math.cos(p)*v,M=Math.sin(p)*v;r.addScaledVector(g,y),r.addScaledVector(_,M),r.normalize()}}if(t==="sniper"&&n.projectileSpeed){const u=ZS(Cs,n.projectileSpeed),d=$e.quaternion.clone(),h=new E(0,1,0).applyQuaternion(d);r.addScaledVector(h,Math.sin(u)),r.normalize()}const s=new X(Vc,n.projectileMaterial);s.castShadow=!0,s.position.copy(i);const a=r.multiplyScalar(n.projectileSpeed),o=new E;St?(o.x=-Math.sin(zi)*mn,o.z=-Math.cos(zi)*mn):o.copy(mt);const l=a.add(o),c={mesh:s,velocity:l,lifeTime:0,spawnTime:performance.now(),weaponType:t,distanceTraveled:0,initialPosition:i.clone()};j.add(c.mesh),rr.push(c)}const fn=new zo,_i=new E;function CE(i){if(j)for(let e=rr.length-1;e>=0;e--){const t=rr[e],n=t.mesh.position.clone(),r=t.velocity.length()*i;t.distanceTraveled+=r;const s=st[t.weaponType];if(s&&s.ballisticCoefficient&&s.airDensity){const u=t.velocity.length(),d=yf(u,r,s.ballisticCoefficient,s.airDensity);u>0&&t.velocity.multiplyScalar(d/u)}if(t.velocity.y-=Do*i,t.mesh.position.addScaledVector(t.velocity,i),t.lifeTime+=i,t.lifeTime>_f){j.remove(t.mesh),t.mesh.geometry&&t.mesh.geometry.dispose(),rr.splice(e,1);continue}fn.origin.copy(n),fn.direction.copy(t.mesh.position).sub(n);const a=fn.direction.length();a>=1e-4&&fn.direction.normalize();let o=!1;const l=t.mesh.position,c=50;for(const[u,d]of ks.entries()){if(l.distanceTo(d.position)>c)continue;const f=Ua.get(u);if(!f)continue;let g=!1;if(a>=1e-4){const _=fn.intersectBox(f,_i);_&&n.distanceTo(_)<=a&&(g=!0)}if(g||f.containsPoint(l)){j.remove(d),d.geometry&&d.geometry.dispose(),d.material&&!Array.isArray(d.material)&&d.material.dispose(),ks.delete(u),Ua.delete(u),o=!0;break}}if(!o&&Re==="multiplayer"){let u=!1,d=!1,h=null;for(const[f,g]of mi){if(!g.mainMesh.visible||d)continue;let _=null;if(g.mainMesh.traverse(p=>{p instanceof X&&p.geometry instanceof Zt&&(_=p)}),_){const m=new dt().setFromObject(_).clone().expandByScalar(rn*.8);if(a>=1e-4){const v=fn.intersectBox(m,_i);if(v&&n.distanceTo(v)<=a){u=!0,d=!0,h=f;break}}if(!d&&m.containsPoint(t.mesh.position)){u=!0,d=!0,h=f;break}}if(!d){const m=new dt().setFromObject(g.mainMesh).clone().expandByScalar(rn);if(a>=1e-4){const v=fn.intersectBox(m,_i);v&&n.distanceTo(v)<=a&&(d=!0,h=f)}!d&&m.containsPoint(t.mesh.position)&&(d=!0,h=f)}if(d)break}if(d){const f=st[t.weaponType];if(f&&typeof f.damage=="number"){const g=t.velocity.length(),p=f.projectileSpeed||250;let m=sh(f.damage,g,p);u&&(m*=5),h?(cl(h,{type:"hit_opponent",data:{damageDealt:m,isHeadshot:u,fromPlayerId:Ut||"unknown"}}),console.log(`HitPlayerId: ${h}, Distance: ${t.distanceTraveled.toFixed(1)}m, Speed: ${g.toFixed(1)}/${p}, Damage: ${m.toFixed(1)}`)):console.warn("Hit detected but no hitPlayerId set")}o=!0,qe&&qe.traverse(g=>{if(g instanceof X&&g.material instanceof Ye){const _=g.material.color.getHex(),p=u?16776960:16711680;g.material.color.setHex(p),setTimeout(()=>{g instanceof X&&g.material instanceof Ye&&g.material.color.setHex(_)},150)}})}}if(!o&&Re==="multiplayer"&&Gt&&Gt.parent){const d=new dt().setFromObject(Gt).clone().expandByScalar(.5);let h=!1;if(a>=1e-4){const f=fn.intersectBox(d,_i);f&&n.distanceTo(f)<=a&&(h=!0)}if(h||d.containsPoint(t.mesh.position)){const f=st[t.weaponType];if(f&&typeof f.damage=="number"){let g=sh(f.damage,t.velocity.length(),f.projectileSpeed||250);console.log(`Hit remote bike for ${g} damage`),Zs({type:"bike_hit",data:{damageDealt:g}}),Gt.traverse(_=>{if(_ instanceof X&&_.material instanceof Ye){const p=_.material.color.getHex();_.material.color.setHex(16746496),setTimeout(()=>{_&&_.material instanceof Ye&&_.material.color.setHex(p)},200)}})}o=!0}}if(!o&&Re==="singleplayer")for(const u of qn){if(!u.isAlive)continue;let d=!1,h=!1,f=null;if(u.mesh.traverse(g=>{if(g instanceof X&&g.geometry instanceof Ue){const p=g.geometry.parameters;p.width===.4&&p.height===.4&&p.depth===.4&&(f=g)}}),f){const _=new dt().setFromObject(f).clone().expandByScalar(.1);if(a>=1e-4){const p=fn.intersectBox(_,_i);p&&n.distanceTo(p)<=a&&(d=!0,h=!0)}!h&&_.containsPoint(t.mesh.position)&&(d=!0,h=!0)}if(!h){const _=new dt().setFromObject(u.mesh).clone().expandByScalar(.2);let p=!1;if(a>=1e-4){const m=fn.intersectBox(_,_i);m&&n.distanceTo(m)<=a&&(p=!0)}(p||_.containsPoint(t.mesh.position))&&(h=!0)}if(h){const g=st[t.weaponType];if(g&&typeof g.damage=="number"){let _=Math.floor(g.damage*Ba);d&&(_*=5),Ff(u.id,_,d)}o=!0;break}}if(!o)for(const u of We){const d=new dt().setFromObject(u),h=il;d.expandByScalar(h);let f=!1;if(a>=1e-4){const g=fn.intersectBox(d,_i);g&&n.distanceTo(g)<=a&&(f=!0)}if(f||d.containsPoint(t.mesh.position)){o=!0;break}}if(!o&&Xt){const u=new dt().setFromObject(Xt);let d=!1;if(a>=1e-4){const h=fn.intersectBox(u,_i);h&&n.distanceTo(h)<=a&&(d=!0)}(d||u.containsPoint(t.mesh.position))&&(o=!0)}o&&(j.remove(t.mesh),t.mesh.geometry&&t.mesh.geometry.dispose(),rr.splice(e,1))}}function LE(i){if(j)for(let e=sr.length-1;e>=0;e--){const t=sr[e],n=t.mesh.position.clone(),r=t.velocity.length()*i;t.distanceTraveled+=r;const s=st[t.weaponType];if(s&&s.ballisticCoefficient&&s.airDensity){const l=t.velocity.length(),c=yf(l,r,s.ballisticCoefficient,s.airDensity);l>0&&t.velocity.multiplyScalar(c/l)}if(t.velocity.y-=Do*i,t.mesh.position.addScaledVector(t.velocity,i),t.lifeTime+=i,t.lifeTime>_f){j.remove(t.mesh),t.mesh.geometry&&t.mesh.geometry.dispose(),sr.splice(e,1);continue}let a=!1;fn.origin.copy(n),fn.direction.copy(t.mesh.position).sub(n);const o=fn.direction.length();o>=1e-4&&fn.direction.normalize();for(const l of We){const c=new dt().setFromObject(l);c.expandByScalar(il);let u=!1;if(o>=1e-4){const d=fn.intersectBox(c,_i);d&&n.distanceTo(d)<=o&&(u=!0)}if(u||c.containsPoint(t.mesh.position)){a=!0;break}}if(!a&&Xt){const l=new dt().setFromObject(Xt);let c=!1;if(o>=1e-4){const u=fn.intersectBox(l,_i);u&&n.distanceTo(u)<=o&&(c=!0)}(c||l.containsPoint(t.mesh.position))&&(a=!0)}a&&(j.remove(t.mesh),t.mesh.geometry&&t.mesh.geometry.dispose(),sr.splice(e,1))}}function DE(i){if(!$e||!st[at]||!mr||!Io||!pr||!Uo||!N)return;const e=st[at],t=e.model,n=ii||ni;let r;n?at==="sniper"?r=OM():r=e.adsFov:r=Wc,$e.fov=Ct.lerp($e.fov,r,_s*i),$e.updateProjectionMatrix();const s=pr.getObjectByName("sniperScopeMesh");if(at==="sniper"?(mr.style.display=n?"block":"none",s&&pr.visible&&(s.visible=!n)):mr.style.display="none",vr){Ni+=i;let o=0;const l=new E;if(Ni<=e.recoilDuration)if(l.x=(N.next()-.5)*2*(e.recoilAmount.x||0),l.z=e.recoilAmount.z,at==="sniper"&&n)o=e.recoilAmount.y;else{l.y=e.recoilAmount.y;let d=.015;at==="sniper"?d=.02:at==="smg"&&(d=.025),o=d}const c=e.recoilReturnSpeed*i,u=Ni<=e.recoilDuration?c*2.5:c*1.5;if(Kn=Ct.lerp(Kn,o,u),ui.lerp(l,u),Ni>e.recoilDuration){const d=Math.abs(Kn)<.001&&Math.abs(o)<.001,h=ui.lengthSq()<1e-5&&l.lengthSq()<1e-5;d&&h&&(vr=!1,Ni=0,Kn=0,ui.set(0,0,0))}}else Kn=Ct.lerp(Kn,0,e.recoilReturnSpeed*i*1.5),ui.lerp(new E(0,0,0),e.recoilReturnSpeed*i*1.5);const a=n?e.adsPosition:e.hipPosition;if(t.position.lerp(a,_s*i),at==="spear"){const o=n?e.adsQuaternion:e.hipQuaternion;t.quaternion.slerp(o,_s*i)}else{const o=n?e.adsRotation:e.hipRotation;t.rotation.x=Ct.lerp(t.rotation.x,o.x,_s*i),t.rotation.y=Ct.lerp(t.rotation.y,o.y,_s*i),t.rotation.z=Ct.lerp(t.rotation.z,o.z,_s*i)}if(at==="sniper"&&n?(t.rotation.x+=Kn,t.position.x-=ui.x,t.position.z-=ui.z):(t.position.x-=ui.x,t.position.y-=ui.y,t.position.z-=ui.z),Gi&&e.reloadTime){Ea+=i;const o=Math.min(Ea/(e.reloadTime/1e3),1),l=Math.sin(o*Math.PI),c=Math.sin(o*Math.PI*2)*.5;xs.y=-.25*l,xs.z=.15*c,xs.x=Math.sin(o*Math.PI*3)*.05,t.position.add(xs)}else Gi||(Ea=0,xs.set(0,0,0));if(zr&&at==="spear"){Ur+=i;const l=Math.min(Ur/.2,1);if(l<.3){const c=l/.3;tr.z=-.5*Math.sin(c*Math.PI*.5)}else if(l<1){const c=(l-.3)/.7;tr.z=-.5*Math.cos(c*Math.PI*.5)}else zr=!1,Ur=0,tr.set(0,0,0);t.position.add(tr)}else zr||(Ur=0,tr.set(0,0,0))}function IE(){const i=performance.now();let e=0;for(;e<Ir.length;)i>=Ir[e].timestamp+uf?(Ir[e].action(),Ir.splice(e,1)):e++}const xa=new dt;function Tc(){if(!Hs||!Zn||!j||!$e||!xe){if(Re==="idle"&&Hs&&(!(Yt!=null&&Yt.style.display)||(Yt==null?void 0:Yt.style.display)==="flex")){et&&!vt&&No();return}requestAnimationFrame(Tc);return}if(requestAnimationFrame(Tc),vt){Zn.render(j,$e);return}const i=performance.now(),e=xe.isLocked?Math.min((i-Fa)/1e3,.05):0;if(Fa=i,xe.isLocked){if(IE(),xe.sensitivity=.002*po*bf(),Na&&Tt&&!vt&&Gf(),ri&&at==="smg"&&!vt&&N){const o=st.smg;if(o&&o.fireRate&&i-Ps>=o.fireRate){Ps=i;const l=new E;if(o.muzzlePoint.getWorldPosition(l),Ei.smg<=0||Gi){ri=!1;return}const c=new E;if($e.getWorldDirection(c),qf(l,c.clone(),"smg"),Ei.smg--,Re==="multiplayer"){const u={muzzlePosition:{x:l.x,y:l.y,z:l.z},direction:{x:c.x,y:c.y,z:c.z},weaponType:"smg"};Zs({type:"shoot",data:u})}o.model&&!vr&&(vr=!0,Ni=0)}}if(Gi){const o=st[at];o&&o.reloadTime&&i-Xc>=o.reloadTime&&(Ei[at]=o.magazineCapacity||0,Gi=!1,Ea=0,xs.set(0,0,0))}const t=xe.getObject(),n=rt/Fn,r=ho+n*(gf-ho),a=CM*(ni||ii?AM:1)*r;if(St){let o=0;Qa?o=df:el&&(o=-12e3);const l=hf*mn*Math.abs(mn),c=ff*mn,d=(o-l-c)/cM;mn+=d*e,mn<-15&&(mn=-15);const h=xe.getObject();tl?vs=nc:nl?vs=-nc:vs=0;const f=vs-Dr,g=vs===0?SM:MM;Dr+=Math.sign(f)*Math.min(Math.abs(f),g*e);const _=xM(),p=Math.abs(mn)/_,v=Math.max(.3,p),y=Dr*v*uM/nc;if(Math.abs(mn)>.01){const S=y*e;zi+=S,h.rotateY(S)}const M=mn*e,P=new E;P.x=-Math.sin(zi)*M,P.z=-Math.cos(zi)*M,$t.add(P);const A=Vs($t.x,$t.z);$t.y=A-gt,t.position.copy($t),t.position.y+=2.3;const R=h.rotation.x,I=h.rotation.y;h.rotation.order="YXZ",h.rotation.set(R,I,Dr),lt&&lt.visible&&(lt.position.copy($t),lt.position.y+=.5,lt.rotation.y=zi,lt.rotation.z=Dr),aS()}else Ar.z=Number(ur)-Number(dr),Ar.x=Number(hr)-Number(fr),Ar.normalize(),ws?(mt.x-=mt.x*8*e,mt.z-=mt.z*8*e,(ur||dr)&&(mt.z-=Ar.z*a*12*e),(hr||fr)&&(mt.x-=Ar.x*a*12*e)):(mt.x-=mt.x*2*e,mt.z-=mt.z*2*e,(ur||dr)&&(mt.z-=Ar.z*a*.3*12*e),(hr||fr)&&(mt.x-=Ar.x*a*.3*12*e));if(Tt){wt.pitch=0,wt.roll=0,wt.yaw=0,wo&&(wt.pitch+=1.5),bo&&(wt.pitch-=1.5),To&&(wt.roll-=1),Ao&&(wt.roll+=1),Ro&&(wt.roll-=.8,wt.yaw-=.3,wt.pitch+=.2),Po&&(wt.roll+=.8,wt.yaw+=.3,wt.pitch+=.2),Co&&(wt.throttle=Math.min(1,wt.throttle+2*e)),Lo&&(wt.throttle=Math.max(0,wt.throttle-2*e));const o=hn.y,l=gM*Math.pow(1-o*.0065/288.15,4.255);io=wt.throttle;const c=io*Qd,u=new E(0,0,1).applyQuaternion(Dt);new E(1,0,0).applyQuaternion(Dt);const d=Jt.length(),h=d>.1?Jt.clone().normalize():u.clone(),f=h.clone().multiplyScalar(-1),g=Math.acos(Math.max(-1,Math.min(1,u.dot(f)))),_=Ct.radToDeg(g),p=18,m=20;let v=0;if(_<=p)v=.15*_+.4;else if(_<=m){const ue=(m-_)/(m-p);v=(.15*p+.4)*ue}else v=.5*Math.cos(Ct.degToRad(_-m)),v=Math.max(v,.2);v=Math.max(v,.1);const y=.5*l*d*d,M=v*y*uo,P=new E(0,1,0).applyQuaternion(Dt),A=h.clone().normalize(),R=A.dot(P),I=P.clone().sub(A.clone().multiplyScalar(R)).normalize();I.length()<.1&&I.copy(P);const S=I.multiplyScalar(M),T=.025,G=v*v/(Math.PI*7),J=(T+G)*y*uo,L=h.clone().multiplyScalar(-J),U=new E;io>0&&U.add(u.clone().multiplyScalar(c)),U.add(S),U.add(L),U.add(new E(0,-9.81*tc,0));const z=_M(Jt,Dt);U.add(z.drag),U.add(z.lift),U.add(z.sideForce);const Z=U.divideScalar(tc);Jt.add(Z.multiplyScalar(e));const q=Math.min(d/30,1),Y=wt.pitch*q*12e4,$=wt.roll*q*18e4,re=wt.yaw*q*12e4,ie=6e3,W=1e4,K=12e3,ae=Y/W,_e=$/ie,ge=re/K;Nn.x+=ae*e,Nn.z+=_e*e,Nn.y+=ge*e;const De=.92-d*.002;Nn.multiplyScalar(Math.max(De,.75)),hn.add(Jt.clone().multiplyScalar(e));const Ge=new Qt().setFromEuler(new _t(Nn.x*e,Nn.y*e,Nn.z*e));Dt.multiplyQuaternions(Dt,Ge),Dt.normalize(),Hn&&Hn.visible&&(Hn.position.copy(hn),Hn.quaternion.copy(Dt));const we=xe.getObject();if(ii||ni){const ue=new E(0,.5,1).applyQuaternion(Dt);we.position.copy(hn.clone().add(ue));const ut=Dt.clone(),Fe=new Qt().setFromEuler(new _t(0,Math.PI,0));ut.multiply(Fe),we.quaternion.copy(ut)}else{const Fe=new E(0,0,-1).applyQuaternion(Dt),b=new E(0,1,0),x=hn.clone().add(Fe.multiplyScalar(25)).add(b.multiplyScalar(8));we.position.copy(x);const F=hn.clone().add(new E(0,2,0));we.lookAt(F)}const O=new _t().setFromQuaternion(Dt);Ht&&(Ht.rotation.x=O.x);const nn=22;if(d<nn){const ue=(nn-d)/nn;Nn.multiplyScalar(1-ue*.8),Math.random()<ue*.1&&(Nn.x+=(Math.random()-.5)*ue*.2,Nn.z+=(Math.random()-.5)*ue*.1),ue>.5&&console.log("STALL WARNING - Airspeed too low!")}if(hn.y<20){const ue=1+(20-hn.y)/20*.15;S.multiplyScalar(ue)}const Se=2,Oe=hn.y<=Se+.1;if(hn.y<=Se)if(hn.y=Se,(Math.abs(Jt.y)>15||Math.abs(Jt.y)>8&&d>60)&&console.log("CRASH LANDING!"),Oe&&hn.y<=Se+.05){if(Jt.y=Math.max(0,Jt.y),io>0){const b=io*Qd*3,F=new E(0,0,1).applyQuaternion(Dt).clone().multiplyScalar(b/tc);Jt.add(F.multiplyScalar(e))}const ue=.995;if(Jt.x*=ue,Jt.z*=ue,Math.abs(wt.yaw)>.1){const b=wt.yaw*1*e,x=new Qt().setFromAxisAngle(new E(0,1,0),b);Dt.multiplyQuaternions(Dt,x),Dt.normalize()}const ut=new _t().setFromQuaternion(Dt);ut.x=Math.max(-.1,Math.min(.1,ut.x)),ut.z=Math.max(-.05,Math.min(.05,ut.z)),Dt.setFromEuler(ut),Nn.x*=.8,Nn.z*=.8,Nn.y*=.9}else Jt.y=Math.max(0,Jt.y*-.3),Jt.x*=.8,Jt.z*=.8}if(!St&&!Tt){const o=a*1.2,l=Math.sqrt(mt.x*mt.x+mt.z*mt.z);l>o&&(mt.x=mt.x/l*o,mt.z=mt.z/l*o);const c=new E;c.x=mt.x*e,c.z=mt.z*e;const u=t.position.clone();if(fe===4&&(c.x!==0||c.z!==0)){const p=xE(u,c);p.canMove?p.adjustedPos?t.position.copy(p.adjustedPos):(t.translateX(c.x),t.translateZ(c.z)):(mt.x=0,mt.z=0)}else t.translateX(c.x);if(fe!==4||c.x===0&&c.z===0){xa.setFromCenterAndSize(new E(t.position.x,u.y-gt/2+rn,t.position.z),new E(rn*2,gt-rn*2,rn*2));for(const p of We){const m=new dt().setFromObject(p);if(xa.intersectsBox(m)){t.position.x=u.x,mt.x=0;break}}}if(fe!==4){t.translateZ(c.z),xa.setFromCenterAndSize(new E(t.position.x,u.y-gt/2+rn,t.position.z),new E(rn*2,gt-rn*2,rn*2));for(const p of We){const m=new dt().setFromObject(p);if(xa.intersectsBox(m)){t.position.z=u.z,mt.z=0;break}}}if(fe!==4){const p=new dt().setFromCenterAndSize(new E(t.position.x,u.y-gt/2+rn,t.position.z),new E(rn*2,gt-rn*2,rn*2));for(const m of We){const v=new dt().setFromObject(m);if(p.intersectsBox(v)){t.position.x=u.x,t.position.z=u.z,mt.x=0,mt.z=0;break}}}const d=t.position.clone();d.y+=gt*.5;const h=new E(0,-1,0),f=new $s(d,h,0,gt*2),g=[Xt];We.forEach(p=>{new dt().setFromObject(p).max.y<d.y+gt*.5&&g.push(p)}),fe===4&&si.length>0&&g.push(...si);const _=f.intersectObjects(g,!1);if(_.length>0){const m=_[0].point.y+gt;Ji-=Do*e;const v=t.position.y+Ji*e;v<=m?(t.position.y=m,Ji<0&&(Ji=0,ws=!0)):(t.position.y=v,ws=!1)}else Ji-=Do*e,t.position.y+=Ji*e,ws=!1;if(Ht){let m=Ht.rotation.x-Kn;Ht.rotation.x=Math.max(-Math.PI/2,Math.min(Math.PI/2,m))}}}else if(mt.set(0,0,0),Ji=0,Ht&&Kn!==0){let n=Ht.rotation.x-Kn;Ht.rotation.x=Math.max(-Math.PI/2,Math.min(Math.PI/2,n))}if(Re==="multiplayer"&&i-ch>ZM&&(mE(),ch=i),DE(e),CE(e),Re==="multiplayer"&&LE(e),qS(e),Re==="singleplayer"&&(iS(e),Sa+=e*1e3,Sa>=Sc)){for(let n=0;n<Ec;n++)nS();Sa=0;const t=(performance.now()-Vi)/1e3;t>60&&(Sc=Math.max(2500,5e3-(t-60)*50),Ec=Math.min(2,1+Math.floor((t-60)/60)))}Vf(),cE(),ME(),EE(e),Bo(),zM(),kM(),GM(),PS(),Zn.render(j,$e)}zS();
