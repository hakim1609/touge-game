var gf={ROTATE:0,DOLLY:1,PAN:2},vf={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},zl="attached",xn=1e3,hi=1001,yn=1002,Rt=1003,Vl=1004,Hl=1005,Ut=1006,Gl=1007,Nn=1008,bi=1009,kl=1010,Wl=1011,So=1012,Xl=1013,Ui=1014,pr=1015,Ti=1016,bo=1017,To=1018,Eo=1020,jl=35902,ql=35899,Yl=1021,Jl=1022,lr=1023,Ir=1026,wo=1027,Ao=1028,Ro=1029,Ta=1030,Co=1031,Po=1033,Zl=33776,Kl=33777,$l=33778,Ql=33779,eh=35840,th=35841,ih=35842,rh=35843,ah=36196,nh=37492,sh=37496,oh=37488,lh=37489,hh=37490,uh=37491,ch=37808,dh=37809,ph=37810,fh=37811,mh=37812,gh=37813,vh=37814,_h=37815,xh=37816,yh=37817,Mh=37818,Sh=37819,bh=37820,Th=37821,Eh=36492,wh=36494,Ah=36495,Rh=36283,Ch=36284,Ph=36285,Lh=36286,Ea=2300,Mn=2301,Oa=2302,ts=2303,is=2400,rs=2401,as=2402,Nh=2500,Ih=3200,kt="srgb",Sn="srgb-linear",wa="linear",Aa="srgb",Fa=7680,Lo=35044,_f=35048,hr=2e3;function Uh(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function Dh(t){return ArrayBuffer.isView(t)&&!(t instanceof DataView)}function Ur(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function Oh(){let t=Ur("canvas");return t.style.display="block",t}var ns={};function Ra(...t){let e="THREE."+t.shift();console.log(e,...t)}function No(t){let e=t[0];if(typeof e=="string"&&e.startsWith("TSL:")){let i=t[1];i&&i.isStackTrace?t[0]+=" "+i.getLocation():t[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return t}function we(...t){t=No(t);let e="THREE."+t.shift();{let i=t[0];i&&i.isStackTrace?console.warn(i.getError(e)):console.warn(e,...t)}}function Fe(...t){t=No(t);let e="THREE."+t.shift();{let i=t[0];i&&i.isStackTrace?console.error(i.getError(e)):console.error(e,...t)}}function sr(...t){let e=t.join(" ");e in ns||(ns[e]=!0,we(...t))}function Fh(t,e,i){return new Promise(function(r,a){function n(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:a();break;case t.TIMEOUT_EXPIRED:setTimeout(n,i);break;default:r()}}setTimeout(n,i)})}var Bh={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},Ei=class{addEventListener(e,i){this._listeners===void 0&&(this._listeners={});let r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(i)===-1&&r[e].push(i)}hasEventListener(e,i){let r=this._listeners;return r!==void 0&&r[e]!==void 0&&r[e].indexOf(i)!==-1}removeEventListener(e,i){let r=this._listeners;if(r===void 0)return;let a=r[e];if(a!==void 0){let n=a.indexOf(i);n!==-1&&a.splice(n,1)}}dispatchEvent(e){let i=this._listeners;if(i===void 0)return;let r=i[e.type];if(r!==void 0){e.target=this;let a=r.slice(0);for(let n=0,s=a.length;n<s;n++)a[n].call(this,e);e.target=null}}},Tt="00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff".split("."),ss=1234567,Cr=Math.PI/180,ur=180/Math.PI;function Bt(){let t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Tt[t&255]+Tt[t>>8&255]+Tt[t>>16&255]+Tt[t>>24&255]+"-"+Tt[e&255]+Tt[e>>8&255]+"-"+Tt[e>>16&15|64]+Tt[e>>24&255]+"-"+Tt[i&63|128]+Tt[i>>8&255]+"-"+Tt[i>>16&255]+Tt[i>>24&255]+Tt[r&255]+Tt[r>>8&255]+Tt[r>>16&255]+Tt[r>>24&255]).toLowerCase()}function Xe(t,e,i){return Math.max(e,Math.min(i,t))}function In(t,e){return(t%e+e)%e}function zh(t,e,i,r,a){return r+(t-e)*(a-r)/(i-e)}function Vh(t,e,i){return t===e?0:(i-t)/(e-t)}function Pr(t,e,i){return(1-i)*t+i*e}function Hh(t,e,i,r){return Pr(t,e,1-Math.exp(-i*r))}function Gh(t,e=1){return e-Math.abs(In(t,e*2)-e)}function kh(t,e,i){return t<=e?0:t>=i?1:(t=(t-e)/(i-e),t*t*(3-2*t))}function Wh(t,e,i){return t<=e?0:t>=i?1:(t=(t-e)/(i-e),t*t*t*(t*(t*6-15)+10))}function Xh(t,e){return t+Math.floor(Math.random()*(e-t+1))}function jh(t,e){return t+Math.random()*(e-t)}function qh(t){return t*(.5-Math.random())}function Yh(t){t!==void 0&&(ss=t);let e=ss+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Jh(t){return t*Cr}function Zh(t){return t*ur}function Kh(t){return t>0&&Number.isInteger(t)&&2**Math.round(Math.log2(t))===t}function $h(t){return 2**Math.ceil(Math.log(t)/Math.LN2)}function Qh(t){return 2**Math.floor(Math.log(t)/Math.LN2)}function eu(t,e,i,r,a){let n=Math.cos,s=Math.sin,o=n(i/2),l=s(i/2),h=n((e+r)/2),u=s((e+r)/2),d=n((e-r)/2),c=s((e-r)/2),p=n((r-e)/2),g=s((r-e)/2);switch(a){case"XYX":t.set(o*u,l*d,l*c,o*h);break;case"YZY":t.set(l*c,o*u,l*d,o*h);break;case"ZXZ":t.set(l*d,l*c,o*u,o*h);break;case"XZX":t.set(o*u,l*g,l*p,o*h);break;case"YXY":t.set(l*p,o*u,l*g,o*h);break;case"ZYZ":t.set(l*g,l*p,o*u,o*h);break;default:we("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+a)}}function Wt(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:case Uint8ClampedArray:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw Error("THREE.MathUtils: Invalid component type.")}}function at(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw Error("THREE.MathUtils: Invalid component type.")}}var yf={DEG2RAD:Cr,RAD2DEG:ur,generateUUID:Bt,clamp:Xe,euclideanModulo:In,mapLinear:zh,inverseLerp:Vh,lerp:Pr,damp:Hh,pingpong:Gh,smoothstep:kh,smootherstep:Wh,randInt:Xh,randFloat:jh,randFloatSpread:qh,seededRandom:Yh,degToRad:Jh,radToDeg:Zh,isPowerOfTwo:Kh,ceilPowerOfTwo:$h,floorPowerOfTwo:Qh,setQuaternionFromProperEuler:eu,normalize:at,denormalize:Wt},he=class Io{static{Io.prototype.isVector2=!0}constructor(e=0,i=0){this.x=e,this.y=i}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,i){return this.x=e,this.y=i,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;default:throw Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let i=this.x,r=this.y,a=e.elements;return this.x=a[0]*i+a[3]*r+a[6],this.y=a[1]*i+a[4]*r+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,i){return this.x=Xe(this.x,e.x,i.x),this.y=Xe(this.y,e.y,i.y),this}clampScalar(e,i){return this.x=Xe(this.x,e,i),this.y=Xe(this.y,e,i),this}clampLength(e,i){let r=this.length();return this.divideScalar(r||1).multiplyScalar(Xe(r,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;let r=this.dot(e)/i;return Math.acos(Xe(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let i=this.x-e.x,r=this.y-e.y;return i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this}lerpVectors(e,i,r){return this.x=e.x+(i.x-e.x)*r,this.y=e.y+(i.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this}rotateAround(e,i){let r=Math.cos(i),a=Math.sin(i),n=this.x-e.x,s=this.y-e.y;return this.x=n*r-s*a+e.x,this.y=n*a+s*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Fi=class{constructor(e=0,i=0,r=0,a=1){this.isQuaternion=!0,this._x=e,this._y=i,this._z=r,this._w=a}static slerpFlat(e,i,r,a,n,s,o){let l=r[a+0],h=r[a+1],u=r[a+2],d=r[a+3],c=n[s+0],p=n[s+1],g=n[s+2],M=n[s+3];if(d!==M||l!==c||h!==p||u!==g){let m=l*c+h*p+u*g+d*M;m<0&&(c=-c,p=-p,g=-g,M=-M,m=-m);let f=1-o;if(m<.9995){let T=Math.acos(m),w=Math.sin(T);f=Math.sin(f*T)/w,o=Math.sin(o*T)/w,l=l*f+c*o,h=h*f+p*o,u=u*f+g*o,d=d*f+M*o}else{l=l*f+c*o,h=h*f+p*o,u=u*f+g*o,d=d*f+M*o;let T=1/Math.sqrt(l*l+h*h+u*u+d*d);l*=T,h*=T,u*=T,d*=T}}e[i]=l,e[i+1]=h,e[i+2]=u,e[i+3]=d}static multiplyQuaternionsFlat(e,i,r,a,n,s){let o=r[a],l=r[a+1],h=r[a+2],u=r[a+3],d=n[s],c=n[s+1],p=n[s+2],g=n[s+3];return e[i]=o*g+u*d+l*p-h*c,e[i+1]=l*g+u*c+h*d-o*p,e[i+2]=h*g+u*p+o*c-l*d,e[i+3]=u*g-o*d-l*c-h*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,i,r,a){return this._x=e,this._y=i,this._z=r,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,i=!0){let r=e._x,a=e._y,n=e._z,s=e._order,o=Math.cos,l=Math.sin,h=o(r/2),u=o(a/2),d=o(n/2),c=l(r/2),p=l(a/2),g=l(n/2);switch(s){case"XYZ":this._x=c*u*d+h*p*g,this._y=h*p*d-c*u*g,this._z=h*u*g+c*p*d,this._w=h*u*d-c*p*g;break;case"YXZ":this._x=c*u*d+h*p*g,this._y=h*p*d-c*u*g,this._z=h*u*g-c*p*d,this._w=h*u*d+c*p*g;break;case"ZXY":this._x=c*u*d-h*p*g,this._y=h*p*d+c*u*g,this._z=h*u*g+c*p*d,this._w=h*u*d-c*p*g;break;case"ZYX":this._x=c*u*d-h*p*g,this._y=h*p*d+c*u*g,this._z=h*u*g-c*p*d,this._w=h*u*d+c*p*g;break;case"YZX":this._x=c*u*d+h*p*g,this._y=h*p*d+c*u*g,this._z=h*u*g-c*p*d,this._w=h*u*d-c*p*g;break;case"XZY":this._x=c*u*d-h*p*g,this._y=h*p*d-c*u*g,this._z=h*u*g+c*p*d,this._w=h*u*d+c*p*g;break;default:we("Quaternion: .setFromEuler() encountered an unknown order: "+s)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,i){let r=i/2,a=Math.sin(r);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){let i=e.elements,r=i[0],a=i[4],n=i[8],s=i[1],o=i[5],l=i[9],h=i[2],u=i[6],d=i[10],c=r+o+d;if(c>0){let p=.5/Math.sqrt(c+1);this._w=.25/p,this._x=(u-l)*p,this._y=(n-h)*p,this._z=(s-a)*p}else if(r>o&&r>d){let p=2*Math.sqrt(1+r-o-d);this._w=(u-l)/p,this._x=.25*p,this._y=(a+s)/p,this._z=(n+h)/p}else if(o>d){let p=2*Math.sqrt(1+o-r-d);this._w=(n-h)/p,this._x=(a+s)/p,this._y=.25*p,this._z=(l+u)/p}else{let p=2*Math.sqrt(1+d-r-o);this._w=(s-a)/p,this._x=(n+h)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,i){let r=e.dot(i)+1;return r<1e-8?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*i.z-e.z*i.y,this._y=e.z*i.x-e.x*i.z,this._z=e.x*i.y-e.y*i.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Xe(this.dot(e),-1,1)))}rotateTowards(e,i){let r=this.angleTo(e);if(r===0)return this;let a=Math.min(1,i/r);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,i){let r=e._x,a=e._y,n=e._z,s=e._w,o=i._x,l=i._y,h=i._z,u=i._w;return this._x=r*u+s*o+a*h-n*l,this._y=a*u+s*l+n*o-r*h,this._z=n*u+s*h+r*l-a*o,this._w=s*u-r*o-a*l-n*h,this._onChangeCallback(),this}slerp(e,i){let r=e._x,a=e._y,n=e._z,s=e._w,o=this.dot(e);o<0&&(r=-r,a=-a,n=-n,s=-s,o=-o);let l=1-i;if(o<.9995){let h=Math.acos(o),u=Math.sin(h);l=Math.sin(l*h)/u,i=Math.sin(i*h)/u,this._x=this._x*l+r*i,this._y=this._y*l+a*i,this._z=this._z*l+n*i,this._w=this._w*l+s*i,this._onChangeCallback()}else this._x=this._x*l+r*i,this._y=this._y*l+a*i,this._z=this._z*l+n*i,this._w=this._w*l+s*i,this.normalize();return this}slerpQuaternions(e,i,r){return this.copy(e).slerp(i,r)}random(){let e=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),r=Math.random(),a=Math.sqrt(1-r),n=Math.sqrt(r);return this.set(a*Math.sin(e),a*Math.cos(e),n*Math.sin(i),n*Math.cos(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,i=0){return this._x=e[i],this._y=e[i+1],this._z=e[i+2],this._w=e[i+3],this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._w,e}fromBufferAttribute(e,i){return this._x=e.getX(i),this._y=e.getY(i),this._z=e.getZ(i),this._w=e.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},I=class Uo{static{Uo.prototype.isVector3=!0}constructor(e=0,i=0,r=0){this.x=e,this.y=i,this.z=r}set(e,i,r){return r===void 0&&(r=this.z),this.x=e,this.y=i,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,i){return this.x=e.x*i.x,this.y=e.y*i.y,this.z=e.z*i.z,this}applyEuler(e){return this.applyQuaternion(os.setFromEuler(e))}applyAxisAngle(e,i){return this.applyQuaternion(os.setFromAxisAngle(e,i))}applyMatrix3(e){let i=this.x,r=this.y,a=this.z,n=e.elements;return this.x=n[0]*i+n[3]*r+n[6]*a,this.y=n[1]*i+n[4]*r+n[7]*a,this.z=n[2]*i+n[5]*r+n[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let i=this.x,r=this.y,a=this.z,n=e.elements,s=1/(n[3]*i+n[7]*r+n[11]*a+n[15]);return this.x=(n[0]*i+n[4]*r+n[8]*a+n[12])*s,this.y=(n[1]*i+n[5]*r+n[9]*a+n[13])*s,this.z=(n[2]*i+n[6]*r+n[10]*a+n[14])*s,this}applyQuaternion(e){let i=this.x,r=this.y,a=this.z,n=e.x,s=e.y,o=e.z,l=e.w,h=2*(s*a-o*r),u=2*(o*i-n*a),d=2*(n*r-s*i);return this.x=i+l*h+s*d-o*u,this.y=r+l*u+o*h-n*d,this.z=a+l*d+n*u-s*h,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let i=this.x,r=this.y,a=this.z,n=e.elements;return this.x=n[0]*i+n[4]*r+n[8]*a,this.y=n[1]*i+n[5]*r+n[9]*a,this.z=n[2]*i+n[6]*r+n[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,i){return this.x=Xe(this.x,e.x,i.x),this.y=Xe(this.y,e.y,i.y),this.z=Xe(this.z,e.z,i.z),this}clampScalar(e,i){return this.x=Xe(this.x,e,i),this.y=Xe(this.y,e,i),this.z=Xe(this.z,e,i),this}clampLength(e,i){let r=this.length();return this.divideScalar(r||1).multiplyScalar(Xe(r,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this}lerpVectors(e,i,r){return this.x=e.x+(i.x-e.x)*r,this.y=e.y+(i.y-e.y)*r,this.z=e.z+(i.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,i){let r=e.x,a=e.y,n=e.z,s=i.x,o=i.y,l=i.z;return this.x=a*l-n*o,this.y=n*s-r*l,this.z=r*o-a*s,this}projectOnVector(e){let i=e.lengthSq();if(i===0)return this.set(0,0,0);let r=e.dot(this)/i;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return Ba.copy(this).projectOnVector(e),this.sub(Ba)}reflect(e){return this.sub(Ba.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;let r=this.dot(e)/i;return Math.acos(Xe(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let i=this.x-e.x,r=this.y-e.y,a=this.z-e.z;return i*i+r*r+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,i,r){let a=Math.sin(i)*e;return this.x=a*Math.sin(r),this.y=Math.cos(i)*e,this.z=a*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,i,r){return this.x=e*Math.sin(i),this.y=r,this.z=e*Math.cos(i),this}setFromMatrixPosition(e){let i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(e){let i=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=i,this.y=r,this.z=a,this}setFromMatrixColumn(e,i){return this.fromArray(e.elements,i*4)}setFromMatrix3Column(e,i){return this.fromArray(e.elements,i*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,i=Math.random()*2-1,r=Math.sqrt(1-i*i);return this.x=r*Math.cos(e),this.y=i,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ba=new I,os=new Fi,We=class Do{static{Do.prototype.isMatrix3=!0}constructor(e,i,r,a,n,s,o,l,h){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,i,r,a,n,s,o,l,h)}set(e,i,r,a,n,s,o,l,h){let u=this.elements;return u[0]=e,u[1]=a,u[2]=o,u[3]=i,u[4]=n,u[5]=l,u[6]=r,u[7]=s,u[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let i=this.elements,r=e.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],this}extractBasis(e,i,r){return e.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let i=e.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){let r=e.elements,a=i.elements,n=this.elements,s=r[0],o=r[3],l=r[6],h=r[1],u=r[4],d=r[7],c=r[2],p=r[5],g=r[8],M=a[0],m=a[3],f=a[6],T=a[1],w=a[4],_=a[7],E=a[2],A=a[5],R=a[8];return n[0]=s*M+o*T+l*E,n[3]=s*m+o*w+l*A,n[6]=s*f+o*_+l*R,n[1]=h*M+u*T+d*E,n[4]=h*m+u*w+d*A,n[7]=h*f+u*_+d*R,n[2]=c*M+p*T+g*E,n[5]=c*m+p*w+g*A,n[8]=c*f+p*_+g*R,this}multiplyScalar(e){let i=this.elements;return i[0]*=e,i[3]*=e,i[6]*=e,i[1]*=e,i[4]*=e,i[7]*=e,i[2]*=e,i[5]*=e,i[8]*=e,this}determinant(){let e=this.elements,i=e[0],r=e[1],a=e[2],n=e[3],s=e[4],o=e[5],l=e[6],h=e[7],u=e[8];return i*s*u-i*o*h-r*n*u+r*o*l+a*n*h-a*s*l}invert(){let e=this.elements,i=e[0],r=e[1],a=e[2],n=e[3],s=e[4],o=e[5],l=e[6],h=e[7],u=e[8],d=u*s-o*h,c=o*l-u*n,p=h*n-s*l,g=i*d+r*c+a*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let M=1/g;return e[0]=d*M,e[1]=(a*h-u*r)*M,e[2]=(o*r-a*s)*M,e[3]=c*M,e[4]=(u*i-a*l)*M,e[5]=(a*n-o*i)*M,e[6]=p*M,e[7]=(r*l-h*i)*M,e[8]=(s*i-r*n)*M,this}transpose(){let e,i=this.elements;return e=i[1],i[1]=i[3],i[3]=e,e=i[2],i[2]=i[6],i[6]=e,e=i[5],i[5]=i[7],i[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let i=this.elements;return e[0]=i[0],e[1]=i[3],e[2]=i[6],e[3]=i[1],e[4]=i[4],e[5]=i[7],e[6]=i[2],e[7]=i[5],e[8]=i[8],this}setUvTransform(e,i,r,a,n,s,o){let l=Math.cos(n),h=Math.sin(n);return this.set(r*l,r*h,-r*(l*s+h*o)+s+e,-a*h,a*l,-a*(-h*s+l*o)+o+i,0,0,1),this}scale(e,i){return sr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(za.makeScale(e,i)),this}rotate(e){return sr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(za.makeRotation(-e)),this}translate(e,i){return sr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(za.makeTranslation(e,i)),this}makeTranslation(e,i){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,i,0,0,1),this}makeRotation(e){let i=Math.cos(e),r=Math.sin(e);return this.set(i,-r,0,r,i,0,0,0,1),this}makeScale(e,i){return this.set(e,0,0,0,i,0,0,0,1),this}equals(e){let i=this.elements,r=e.elements;for(let a=0;a<9;a++)if(i[a]!==r[a])return!1;return!0}fromArray(e,i=0){for(let r=0;r<9;r++)this.elements[r]=e[r+i];return this}toArray(e=[],i=0){let r=this.elements;return e[i]=r[0],e[i+1]=r[1],e[i+2]=r[2],e[i+3]=r[3],e[i+4]=r[4],e[i+5]=r[5],e[i+6]=r[6],e[i+7]=r[7],e[i+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}},za=new We,ls=new We().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),hs=new We().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function tu(){let t={enabled:!0,workingColorSpace:Sn,spaces:{},convert:function(a,n,s){return this.enabled===!1||n===s||!n||!s||(this.spaces[n].transfer==="srgb"&&(a.r=ci(a.r),a.g=ci(a.g),a.b=ci(a.b)),this.spaces[n].primaries!==this.spaces[s].primaries&&(a.applyMatrix3(this.spaces[n].toXYZ),a.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer==="srgb"&&(a.r=or(a.r),a.g=or(a.g),a.b=or(a.b))),a},workingToColorSpace:function(a,n){return this.convert(a,this.workingColorSpace,n)},colorSpaceToWorking:function(a,n){return this.convert(a,n,this.workingColorSpace)},getPrimaries:function(a){return this.spaces[a].primaries},getTransfer:function(a){return a===""?wa:this.spaces[a].transfer},getToneMappingMode:function(a){return this.spaces[a].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(a,n=this.workingColorSpace){return a.fromArray(this.spaces[n].luminanceCoefficients)},define:function(a){Object.assign(this.spaces,a)},_getMatrix:function(a,n,s){return a.copy(this.spaces[n].toXYZ).multiply(this.spaces[s].fromXYZ)},_getDrawingBufferColorSpace:function(a){return this.spaces[a].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(a=this.workingColorSpace){return this.spaces[a].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(a,n){return sr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),t.workingToColorSpace(a,n)},toWorkingColorSpace:function(a,n){return sr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),t.colorSpaceToWorking(a,n)}},e=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],r=[.3127,.329];return t.define({[Sn]:{primaries:e,whitePoint:r,transfer:wa,toXYZ:ls,fromXYZ:hs,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:kt},outputColorSpaceConfig:{drawingBufferColorSpace:kt}},[kt]:{primaries:e,whitePoint:r,transfer:Aa,toXYZ:ls,fromXYZ:hs,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:kt}}}),t}var Ke=tu();function ci(t){return t<.04045?t*.0773993808:(t*.9478672986+.0521327014)**2.4}function or(t){return t<.0031308?t*12.92:1.055*t**.41666-.055}var Vi,iu=class{static getDataURL(e,i="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let r;if(e instanceof HTMLCanvasElement)r=e;else{Vi===void 0&&(Vi=Ur("canvas")),Vi.width=e.width,Vi.height=e.height;let a=Vi.getContext("2d");e instanceof ImageData?a.putImageData(e,0,0):a.drawImage(e,0,0,e.width,e.height),r=Vi}return r.toDataURL(i)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let i=Ur("canvas");i.width=e.width,i.height=e.height;let r=i.getContext("2d");r.drawImage(e,0,0,e.width,e.height);let a=r.getImageData(0,0,e.width,e.height),n=a.data;for(let s=0;s<n.length;s++)n[s]=ci(n[s]/255)*255;return r.putImageData(a,0,0),i}if(e.data){let i=e.data.slice(0);for(let r=0;r<i.length;r++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[r]=Math.floor(ci(i[r]/255)*255):i[r]=ci(i[r]);return{data:i,width:e.width,height:e.height}}return we("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},ru=0,Un=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:ru++}),this.uuid=Bt(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let i=this.data;return typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement?e.set(i.videoWidth,i.videoHeight,0):typeof VideoFrame<"u"&&i instanceof VideoFrame?e.set(i.displayWidth,i.displayHeight,0):i===null?e.set(0,0,0):e.set(i.width,i.height,i.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let i=e===void 0||typeof e=="string";if(!i&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let r={uuid:this.uuid,url:""},a=this.data;if(a!==null){let n;if(Array.isArray(a)){n=[];for(let s=0,o=a.length;s<o;s++)a[s].isDataTexture?n.push(Va(a[s].image)):n.push(Va(a[s]))}else n=Va(a);r.url=n}return i||(e.images[this.uuid]=r),r}};function Va(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?iu.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(we("Texture: Unable to serialize Texture."),{})}var au=0,Ha=new I,Dt=class ya extends Ei{constructor(e=ya.DEFAULT_IMAGE,i=ya.DEFAULT_MAPPING,r=hi,a=hi,n=Ut,s=Nn,o=lr,l=bi,h=ya.DEFAULT_ANISOTROPY,u=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:au++}),this.uuid=Bt(),this.name="",this.source=new Un(e),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=r,this.wrapT=a,this.magFilter=n,this.minFilter=s,this.anisotropy=h,this.format=o,this.internalFormat=null,this.type=l,this.offset=new he(0,0),this.repeat=new he(1,1),this.center=new he(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ha).x}get height(){return this.source.getSize(Ha).y}get depth(){return this.source.getSize(Ha).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let i in e){let r=e[i];if(r===void 0){we(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}let a=this[i];if(a===void 0){we(`Texture.setValues(): property '${i}' does not exist.`);continue}a&&r&&a.isVector2&&r.isVector2||a&&r&&a.isVector3&&r.isVector3||a&&r&&a.isMatrix3&&r.isMatrix3?a.copy(r):this[i]=r}}toJSON(e){let i=e===void 0||typeof e=="string";if(!i&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let r={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),i||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case xn:e.x-=Math.floor(e.x);break;case hi:e.x=e.x<0?0:1;break;case yn:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case xn:e.y-=Math.floor(e.y);break;case hi:e.y=e.y<0?0:1;break;case yn:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Dt.DEFAULT_IMAGE=null,Dt.DEFAULT_MAPPING=300,Dt.DEFAULT_ANISOTROPY=1;var ht=class Oo{static{Oo.prototype.isVector4=!0}constructor(e=0,i=0,r=0,a=1){this.x=e,this.y=i,this.z=r,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,i,r,a){return this.x=e,this.y=i,this.z=r,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this.w=e.w+i.w,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this.w+=e.w*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this.w=e.w-i.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let i=this.x,r=this.y,a=this.z,n=this.w,s=e.elements;return this.x=s[0]*i+s[4]*r+s[8]*a+s[12]*n,this.y=s[1]*i+s[5]*r+s[9]*a+s[13]*n,this.z=s[2]*i+s[6]*r+s[10]*a+s[14]*n,this.w=s[3]*i+s[7]*r+s[11]*a+s[15]*n,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let i=Math.sqrt(1-e.w*e.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/i,this.y=e.y/i,this.z=e.z/i),this}setAxisAngleFromRotationMatrix(e){let i,r,a,n,s=.01,o=.1,l=e.elements,h=l[0],u=l[4],d=l[8],c=l[1],p=l[5],g=l[9],M=l[2],m=l[6],f=l[10];if(Math.abs(u-c)<s&&Math.abs(d-M)<s&&Math.abs(g-m)<s){if(Math.abs(u+c)<o&&Math.abs(d+M)<o&&Math.abs(g+m)<o&&Math.abs(h+p+f-3)<o)return this.set(1,0,0,0),this;i=Math.PI;let w=(h+1)/2,_=(p+1)/2,E=(f+1)/2,A=(u+c)/4,R=(d+M)/4,v=(g+m)/4;return w>_&&w>E?w<s?(r=0,a=.707106781,n=.707106781):(r=Math.sqrt(w),a=A/r,n=R/r):_>E?_<s?(r=.707106781,a=0,n=.707106781):(a=Math.sqrt(_),r=A/a,n=v/a):E<s?(r=.707106781,a=.707106781,n=0):(n=Math.sqrt(E),r=R/n,a=v/n),this.set(r,a,n,i),this}let T=Math.sqrt((m-g)*(m-g)+(d-M)*(d-M)+(c-u)*(c-u));return Math.abs(T)<.001&&(T=1),this.x=(m-g)/T,this.y=(d-M)/T,this.z=(c-u)/T,this.w=Math.acos((h+p+f-1)/2),this}setFromMatrixPosition(e){let i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,i){return this.x=Xe(this.x,e.x,i.x),this.y=Xe(this.y,e.y,i.y),this.z=Xe(this.z,e.z,i.z),this.w=Xe(this.w,e.w,i.w),this}clampScalar(e,i){return this.x=Xe(this.x,e,i),this.y=Xe(this.y,e,i),this.z=Xe(this.z,e,i),this.w=Xe(this.w,e,i),this}clampLength(e,i){let r=this.length();return this.divideScalar(r||1).multiplyScalar(Xe(r,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this.w+=(e.w-this.w)*i,this}lerpVectors(e,i,r){return this.x=e.x+(i.x-e.x)*r,this.y=e.y+(i.y-e.y)*r,this.z=e.z+(i.z-e.z)*r,this.w=e.w+(i.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this.w=e[i+3],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e[i+3]=this.w,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this.w=e.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},nu=class extends Ei{constructor(e=1,i=1,r={}){super(),r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ut,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},r),this.isRenderTarget=!0,this.width=e,this.height=i,this.depth=r.depth,this.scissor=new ht(0,0,e,i),this.scissorTest=!1,this.viewport=new ht(0,0,e,i),this.textures=[];let a=new Dt({width:e,height:i,depth:r.depth}),n=r.count;for(let s=0;s<n;s++)this.textures[s]=a.clone(),this.textures[s].isRenderTargetTexture=!0,this.textures[s].renderTarget=this;this._setTextureOptions(r),this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveColorBuffer=r.resolveColorBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this.storeMultisampledColorBuffer=r.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=r.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=r.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=r.depthTexture,this.samples=r.samples,this.multiview=r.multiview,this.useArrayDepthTexture=r.useArrayDepthTexture}_setTextureOptions(e={}){let i={minFilter:Ut,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(i.mapping=e.mapping),e.wrapS!==void 0&&(i.wrapS=e.wrapS),e.wrapT!==void 0&&(i.wrapT=e.wrapT),e.wrapR!==void 0&&(i.wrapR=e.wrapR),e.magFilter!==void 0&&(i.magFilter=e.magFilter),e.minFilter!==void 0&&(i.minFilter=e.minFilter),e.format!==void 0&&(i.format=e.format),e.type!==void 0&&(i.type=e.type),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(i.colorSpace=e.colorSpace),e.flipY!==void 0&&(i.flipY=e.flipY),e.generateMipmaps!==void 0&&(i.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(i.internalFormat=e.internalFormat);for(let r=0;r<this.textures.length;r++)this.textures[r].setValues(i)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,i,r=1){if(this.width!==e||this.height!==i||this.depth!==r){this.width=e,this.height=i,this.depth=r;for(let a=0,n=this.textures.length;a<n;a++)this.textures[a].image.width=e,this.textures[a].image.height=i,this.textures[a].image.depth=r,this.textures[a].isData3DTexture!==!0&&(this.textures[a].isArrayTexture=this.textures[a].image.depth>1);this.dispose()}this.viewport.set(0,0,e,i),this.scissor.set(0,0,e,i)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++){this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;let a=Object.assign({},e.textures[i].image);this.textures[i].source=new Un(a)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let i=e.depthTexture.clone();i.renderTarget=null,this.depthTexture=i}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},jt=class extends nu{constructor(e=1,i=1,r={}){super(e,i,r),this.isWebGLRenderTarget=!0}},Fo=class extends Dt{constructor(e=null,i=1,r=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:i,height:r,depth:a},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},su=class extends Dt{constructor(e=null,i=1,r=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:i,height:r,depth:a},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},Je=class bn{static{bn.prototype.isMatrix4=!0}constructor(e,i,r,a,n,s,o,l,h,u,d,c,p,g,M,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,i,r,a,n,s,o,l,h,u,d,c,p,g,M,m)}set(e,i,r,a,n,s,o,l,h,u,d,c,p,g,M,m){let f=this.elements;return f[0]=e,f[4]=i,f[8]=r,f[12]=a,f[1]=n,f[5]=s,f[9]=o,f[13]=l,f[2]=h,f[6]=u,f[10]=d,f[14]=c,f[3]=p,f[7]=g,f[11]=M,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new bn().fromArray(this.elements)}copy(e){let i=this.elements,r=e.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],i[9]=r[9],i[10]=r[10],i[11]=r[11],i[12]=r[12],i[13]=r[13],i[14]=r[14],i[15]=r[15],this}copyPosition(e){let i=this.elements,r=e.elements;return i[12]=r[12],i[13]=r[13],i[14]=r[14],this}setFromMatrix3(e){let i=e.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(e,i,r){return this.determinantAffine()===0?(e.set(1,0,0),i.set(0,1,0),r.set(0,0,1),this):(e.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this)}makeBasis(e,i,r){return this.set(e.x,i.x,r.x,0,e.y,i.y,r.y,0,e.z,i.z,r.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let i=this.elements,r=e.elements,a=1/Hi.setFromMatrixColumn(e,0).length(),n=1/Hi.setFromMatrixColumn(e,1).length(),s=1/Hi.setFromMatrixColumn(e,2).length();return i[0]=r[0]*a,i[1]=r[1]*a,i[2]=r[2]*a,i[3]=0,i[4]=r[4]*n,i[5]=r[5]*n,i[6]=r[6]*n,i[7]=0,i[8]=r[8]*s,i[9]=r[9]*s,i[10]=r[10]*s,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(e){let i=this.elements,r=e.x,a=e.y,n=e.z,s=Math.cos(r),o=Math.sin(r),l=Math.cos(a),h=Math.sin(a),u=Math.cos(n),d=Math.sin(n);if(e.order==="XYZ"){let c=s*u,p=s*d,g=o*u,M=o*d;i[0]=l*u,i[4]=-l*d,i[8]=h,i[1]=p+g*h,i[5]=c-M*h,i[9]=-o*l,i[2]=M-c*h,i[6]=g+p*h,i[10]=s*l}else if(e.order==="YXZ"){let c=l*u,p=l*d,g=h*u,M=h*d;i[0]=c+M*o,i[4]=g*o-p,i[8]=s*h,i[1]=s*d,i[5]=s*u,i[9]=-o,i[2]=p*o-g,i[6]=M+c*o,i[10]=s*l}else if(e.order==="ZXY"){let c=l*u,p=l*d,g=h*u,M=h*d;i[0]=c-M*o,i[4]=-s*d,i[8]=g+p*o,i[1]=p+g*o,i[5]=s*u,i[9]=M-c*o,i[2]=-s*h,i[6]=o,i[10]=s*l}else if(e.order==="ZYX"){let c=s*u,p=s*d,g=o*u,M=o*d;i[0]=l*u,i[4]=g*h-p,i[8]=c*h+M,i[1]=l*d,i[5]=M*h+c,i[9]=p*h-g,i[2]=-h,i[6]=o*l,i[10]=s*l}else if(e.order==="YZX"){let c=s*l,p=s*h,g=o*l,M=o*h;i[0]=l*u,i[4]=M-c*d,i[8]=g*d+p,i[1]=d,i[5]=s*u,i[9]=-o*u,i[2]=-h*u,i[6]=p*d+g,i[10]=c-M*d}else if(e.order==="XZY"){let c=s*l,p=s*h,g=o*l,M=o*h;i[0]=l*u,i[4]=-d,i[8]=h*u,i[1]=c*d+M,i[5]=s*u,i[9]=p*d-g,i[2]=g*d-p,i[6]=o*u,i[10]=M*d+c}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ou,e,lu)}lookAt(e,i,r){let a=this.elements;return Lt.subVectors(e,i),Lt.lengthSq()===0&&(Lt.z=1),Lt.normalize(),gi.crossVectors(r,Lt),gi.lengthSq()===0&&(Math.abs(r.z)===1?Lt.x+=1e-4:Lt.z+=1e-4,Lt.normalize(),gi.crossVectors(r,Lt)),gi.normalize(),Wr.crossVectors(Lt,gi),a[0]=gi.x,a[4]=Wr.x,a[8]=Lt.x,a[1]=gi.y,a[5]=Wr.y,a[9]=Lt.y,a[2]=gi.z,a[6]=Wr.z,a[10]=Lt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){let r=e.elements,a=i.elements,n=this.elements,s=r[0],o=r[4],l=r[8],h=r[12],u=r[1],d=r[5],c=r[9],p=r[13],g=r[2],M=r[6],m=r[10],f=r[14],T=r[3],w=r[7],_=r[11],E=r[15],A=a[0],R=a[4],v=a[8],S=a[12],B=a[1],P=a[5],O=a[9],X=a[13],N=a[2],V=a[6],J=a[10],G=a[14],oe=a[3],j=a[7],Y=a[11],Q=a[15];return n[0]=s*A+o*B+l*N+h*oe,n[4]=s*R+o*P+l*V+h*j,n[8]=s*v+o*O+l*J+h*Y,n[12]=s*S+o*X+l*G+h*Q,n[1]=u*A+d*B+c*N+p*oe,n[5]=u*R+d*P+c*V+p*j,n[9]=u*v+d*O+c*J+p*Y,n[13]=u*S+d*X+c*G+p*Q,n[2]=g*A+M*B+m*N+f*oe,n[6]=g*R+M*P+m*V+f*j,n[10]=g*v+M*O+m*J+f*Y,n[14]=g*S+M*X+m*G+f*Q,n[3]=T*A+w*B+_*N+E*oe,n[7]=T*R+w*P+_*V+E*j,n[11]=T*v+w*O+_*J+E*Y,n[15]=T*S+w*X+_*G+E*Q,this}multiplyScalar(e){let i=this.elements;return i[0]*=e,i[4]*=e,i[8]*=e,i[12]*=e,i[1]*=e,i[5]*=e,i[9]*=e,i[13]*=e,i[2]*=e,i[6]*=e,i[10]*=e,i[14]*=e,i[3]*=e,i[7]*=e,i[11]*=e,i[15]*=e,this}determinant(){let e=this.elements,i=e[0],r=e[4],a=e[8],n=e[12],s=e[1],o=e[5],l=e[9],h=e[13],u=e[2],d=e[6],c=e[10],p=e[14],g=e[3],M=e[7],m=e[11],f=e[15],T=l*p-h*c,w=o*p-h*d,_=o*c-l*d,E=s*p-h*u,A=s*c-l*u,R=s*d-o*u;return i*(M*T-m*w+f*_)-r*(g*T-m*E+f*A)+a*(g*w-M*E+f*R)-n*(g*_-M*A+m*R)}determinantAffine(){let e=this.elements,i=e[0],r=e[4],a=e[8],n=e[1],s=e[5],o=e[9],l=e[2],h=e[6],u=e[10];return i*(s*u-o*h)-r*(n*u-o*l)+a*(n*h-s*l)}transpose(){let e=this.elements,i;return i=e[1],e[1]=e[4],e[4]=i,i=e[2],e[2]=e[8],e[8]=i,i=e[6],e[6]=e[9],e[9]=i,i=e[3],e[3]=e[12],e[12]=i,i=e[7],e[7]=e[13],e[13]=i,i=e[11],e[11]=e[14],e[14]=i,this}setPosition(e,i,r){let a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=i,a[14]=r),this}invert(){let e=this.elements,i=e[0],r=e[1],a=e[2],n=e[3],s=e[4],o=e[5],l=e[6],h=e[7],u=e[8],d=e[9],c=e[10],p=e[11],g=e[12],M=e[13],m=e[14],f=e[15],T=i*o-r*s,w=i*l-a*s,_=i*h-n*s,E=r*l-a*o,A=r*h-n*o,R=a*h-n*l,v=u*M-d*g,S=u*m-c*g,B=u*f-p*g,P=d*m-c*M,O=d*f-p*M,X=c*f-p*m,N=T*X-w*O+_*P+E*B-A*S+R*v;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let V=1/N;return e[0]=(o*X-l*O+h*P)*V,e[1]=(a*O-r*X-n*P)*V,e[2]=(M*R-m*A+f*E)*V,e[3]=(c*A-d*R-p*E)*V,e[4]=(l*B-s*X-h*S)*V,e[5]=(i*X-a*B+n*S)*V,e[6]=(m*_-g*R-f*w)*V,e[7]=(u*R-c*_+p*w)*V,e[8]=(s*O-o*B+h*v)*V,e[9]=(r*B-i*O-n*v)*V,e[10]=(g*A-M*_+f*T)*V,e[11]=(d*_-u*A-p*T)*V,e[12]=(o*S-s*P-l*v)*V,e[13]=(i*P-r*S+a*v)*V,e[14]=(M*w-g*E-m*T)*V,e[15]=(u*E-d*w+c*T)*V,this}scale(e){let i=this.elements,r=e.x,a=e.y,n=e.z;return i[0]*=r,i[4]*=a,i[8]*=n,i[1]*=r,i[5]*=a,i[9]*=n,i[2]*=r,i[6]*=a,i[10]*=n,i[3]*=r,i[7]*=a,i[11]*=n,this}getMaxScaleOnAxis(){let e=this.elements,i=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(i,r,a))}makeTranslation(e,i,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,i,0,0,1,r,0,0,0,1),this}makeRotationX(e){let i=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,i,-r,0,0,r,i,0,0,0,0,1),this}makeRotationY(e){let i=Math.cos(e),r=Math.sin(e);return this.set(i,0,r,0,0,1,0,0,-r,0,i,0,0,0,0,1),this}makeRotationZ(e){let i=Math.cos(e),r=Math.sin(e);return this.set(i,-r,0,0,r,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,i){let r=Math.cos(i),a=Math.sin(i),n=1-r,s=e.x,o=e.y,l=e.z,h=n*s,u=n*o;return this.set(h*s+r,h*o-a*l,h*l+a*o,0,h*o+a*l,u*o+r,u*l-a*s,0,h*l-a*o,u*l+a*s,n*l*l+r,0,0,0,0,1),this}makeScale(e,i,r){return this.set(e,0,0,0,0,i,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,i,r,a,n,s){return this.set(1,r,n,0,e,1,s,0,i,a,1,0,0,0,0,1),this}compose(e,i,r){let a=this.elements,n=i._x,s=i._y,o=i._z,l=i._w,h=n+n,u=s+s,d=o+o,c=n*h,p=n*u,g=n*d,M=s*u,m=s*d,f=o*d,T=l*h,w=l*u,_=l*d,E=r.x,A=r.y,R=r.z;return a[0]=(1-(M+f))*E,a[1]=(p+_)*E,a[2]=(g-w)*E,a[3]=0,a[4]=(p-_)*A,a[5]=(1-(c+f))*A,a[6]=(m+T)*A,a[7]=0,a[8]=(g+w)*R,a[9]=(m-T)*R,a[10]=(1-(c+M))*R,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,i,r){let a=this.elements;e.x=a[12],e.y=a[13],e.z=a[14];let n=this.determinantAffine();if(n===0)return r.set(1,1,1),i.identity(),this;let s=Hi.set(a[0],a[1],a[2]).length(),o=Hi.set(a[4],a[5],a[6]).length(),l=Hi.set(a[8],a[9],a[10]).length();n<0&&(s=-s),Vt.copy(this);let h=1/s,u=1/o,d=1/l;return Vt.elements[0]*=h,Vt.elements[1]*=h,Vt.elements[2]*=h,Vt.elements[4]*=u,Vt.elements[5]*=u,Vt.elements[6]*=u,Vt.elements[8]*=d,Vt.elements[9]*=d,Vt.elements[10]*=d,i.setFromRotationMatrix(Vt),r.x=s,r.y=o,r.z=l,this}makePerspective(e,i,r,a,n,s,o=hr,l=!1){let h=this.elements,u=2*n/(i-e),d=2*n/(r-a),c=(i+e)/(i-e),p=(r+a)/(r-a),g,M;if(l)g=n/(s-n),M=s*n/(s-n);else if(o===2e3)g=-(s+n)/(s-n),M=-2*s*n/(s-n);else if(o===2001)g=-s/(s-n),M=-s*n/(s-n);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return h[0]=u,h[4]=0,h[8]=c,h[12]=0,h[1]=0,h[5]=d,h[9]=p,h[13]=0,h[2]=0,h[6]=0,h[10]=g,h[14]=M,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(e,i,r,a,n,s,o=hr,l=!1){let h=this.elements,u=2/(i-e),d=2/(r-a),c=-(i+e)/(i-e),p=-(r+a)/(r-a),g,M;if(l)g=1/(s-n),M=s/(s-n);else if(o===2e3)g=-2/(s-n),M=-(s+n)/(s-n);else if(o===2001)g=-1/(s-n),M=-n/(s-n);else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return h[0]=u,h[4]=0,h[8]=0,h[12]=c,h[1]=0,h[5]=d,h[9]=0,h[13]=p,h[2]=0,h[6]=0,h[10]=g,h[14]=M,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(e){let i=this.elements,r=e.elements;for(let a=0;a<16;a++)if(i[a]!==r[a])return!1;return!0}fromArray(e,i=0){for(let r=0;r<16;r++)this.elements[r]=e[r+i];return this}toArray(e=[],i=0){let r=this.elements;return e[i]=r[0],e[i+1]=r[1],e[i+2]=r[2],e[i+3]=r[3],e[i+4]=r[4],e[i+5]=r[5],e[i+6]=r[6],e[i+7]=r[7],e[i+8]=r[8],e[i+9]=r[9],e[i+10]=r[10],e[i+11]=r[11],e[i+12]=r[12],e[i+13]=r[13],e[i+14]=r[14],e[i+15]=r[15],e}},Hi=new I,Vt=new Je,ou=new I(0,0,0),lu=new I(1,1,1),gi=new I,Wr=new I,Lt=new I,us=new Je,cs=new Fi,Di=class Bo{constructor(e=0,i=0,r=0,a=Bo.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=i,this._z=r,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,i,r,a=this._order){return this._x=e,this._y=i,this._z=r,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,i=this._order,r=!0){let a=e.elements,n=a[0],s=a[4],o=a[8],l=a[1],h=a[5],u=a[9],d=a[2],c=a[6],p=a[10];switch(i){case"XYZ":this._y=Math.asin(Xe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-s,n)):(this._x=Math.atan2(c,h),this._z=0);break;case"YXZ":this._x=Math.asin(-Xe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,h)):(this._y=Math.atan2(-d,n),this._z=0);break;case"ZXY":this._x=Math.asin(Xe(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-s,h)):(this._y=0,this._z=Math.atan2(l,n));break;case"ZYX":this._y=Math.asin(-Xe(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(c,p),this._z=Math.atan2(l,n)):(this._x=0,this._z=Math.atan2(-s,h));break;case"YZX":this._z=Math.asin(Xe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,h),this._y=Math.atan2(-d,n)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Xe(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(c,h),this._y=Math.atan2(o,n)):(this._x=Math.atan2(-u,p),this._y=0);break;default:we("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,i,r){return us.makeRotationFromQuaternion(e),this.setFromRotationMatrix(us,i,r)}setFromVector3(e,i=this._order){return this.set(e.x,e.y,e.z,i)}reorder(e){return cs.setFromEuler(this),this.setFromQuaternion(cs,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Di.DEFAULT_ORDER="XYZ";var Dn=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},hu=0,ds=new I,Gi=new Fi,ii=new Je,Xr=new I,gr=new I,uu=new I,cu=new Fi,ps=new I(1,0,0),fs=new I(0,1,0),ms=new I(0,0,1),gs={type:"added"},du={type:"removed"},ki={type:"childadded",child:null},Ga={type:"childremoved",child:null},Mt=class Ma extends Ei{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:hu++}),this.uuid=Bt(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ma.DEFAULT_UP.clone();let e=new I,i=new Di,r=new Fi,a=new I(1,1,1);function n(){r.setFromEuler(i,!1)}function s(){i.setFromQuaternion(r,void 0,!1)}i._onChange(n),r._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new Je},normalMatrix:{value:new We}}),this.matrix=new Je,this.matrixWorld=new Je,this.matrixAutoUpdate=Ma.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ma.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Dn,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,i){this.quaternion.setFromAxisAngle(e,i)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,i){return Gi.setFromAxisAngle(e,i),this.quaternion.multiply(Gi),this}rotateOnWorldAxis(e,i){return Gi.setFromAxisAngle(e,i),this.quaternion.premultiply(Gi),this}rotateX(e){return this.rotateOnAxis(ps,e)}rotateY(e){return this.rotateOnAxis(fs,e)}rotateZ(e){return this.rotateOnAxis(ms,e)}translateOnAxis(e,i){return ds.copy(e).applyQuaternion(this.quaternion),this.position.add(ds.multiplyScalar(i)),this}translateX(e){return this.translateOnAxis(ps,e)}translateY(e){return this.translateOnAxis(fs,e)}translateZ(e){return this.translateOnAxis(ms,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ii.copy(this.matrixWorld).invert())}lookAt(e,i,r){e.isVector3?Xr.copy(e):Xr.set(e,i,r);let a=this.parent;this.updateWorldMatrix(!0,!1),gr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ii.lookAt(gr,Xr,this.up):ii.lookAt(Xr,gr,this.up),this.quaternion.setFromRotationMatrix(ii),a&&(ii.extractRotation(a.matrixWorld),Gi.setFromRotationMatrix(ii),this.quaternion.premultiply(Gi.invert()))}add(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return e===this?(Fe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(gs),ki.child=e,this.dispatchEvent(ki),ki.child=null):Fe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}let i=this.children.indexOf(e);return i!==-1&&(e.parent=null,this.children.splice(i,1),e.dispatchEvent(du),Ga.child=e,this.dispatchEvent(Ga),Ga.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ii.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ii.multiply(e.parent.matrixWorld)),e.applyMatrix4(ii),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(gs),ki.child=e,this.dispatchEvent(ki),ki.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,i){if(this[e]===i)return this;for(let r=0,a=this.children.length;r<a;r++){let n=this.children[r].getObjectByProperty(e,i);if(n!==void 0)return n}}getObjectsByProperty(e,i,r=[]){this[e]===i&&r.push(this);let a=this.children;for(let n=0,s=a.length;n<s;n++)a[n].getObjectsByProperty(e,i,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gr,e,uu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gr,cu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let i=this.matrixWorld.elements;return e.set(i[8],i[9],i[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].traverseVisible(e)}traverseAncestors(e){let i=this.parent;i!==null&&(e(i),i.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let i=e.x,r=e.y,a=e.z,n=this.matrix.elements;n[12]+=i-n[0]*i-n[4]*r-n[8]*a,n[13]+=r-n[1]*i-n[5]*r-n[9]*a,n[14]+=a-n[2]*i-n[6]*r-n[10]*a}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateMatrixWorld(e)}updateWorldMatrix(e,i,r=!1){let a=this.parent;if(e===!0&&a!==null&&a.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||r)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,r=!0),i===!0){let n=this.children;for(let s=0,o=n.length;s<o;s++)n[s].updateWorldMatrix(!1,!0,r)}}toJSON(e){let i=e===void 0||typeof e=="string",r={};i&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let a={};a.uuid=this.uuid,a.type=this.type,a.name=this.name,a.castShadow=this.castShadow,a.receiveShadow=this.receiveShadow,a.visible=this.visible,a.frustumCulled=this.frustumCulled,a.renderOrder=this.renderOrder,a.static=this.static,a.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.pivot!==null&&(a.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(a.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(a.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),a.instanceInfo=this._instanceInfo.map(o=>({...o})),a.availableInstanceIds=this._availableInstanceIds.slice(),a.availableGeometryIds=this._availableGeometryIds.slice(),a.nextIndexStart=this._nextIndexStart,a.nextVertexStart=this._nextVertexStart,a.geometryCount=this._geometryCount,a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.matricesTexture=this._matricesTexture.toJSON(e),a.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(a.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(a.boundingBox=this.boundingBox.toJSON()));function n(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=n(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let h=0,u=l.length;h<u;h++){let d=l[h];n(e.shapes,d)}else n(e.shapes,l)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(n(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,h=this.material.length;l<h;l++)o.push(n(e.materials,this.material[l]));a.material=o}else a.material=n(e.materials,this.material);if(this.children.length>0){a.children=[];for(let o=0;o<this.children.length;o++)a.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];a.animations.push(n(e.animations,l))}}if(i){let o=s(e.geometries),l=s(e.materials),h=s(e.textures),u=s(e.images),d=s(e.shapes),c=s(e.skeletons),p=s(e.animations),g=s(e.nodes);o.length>0&&(r.geometries=o),l.length>0&&(r.materials=l),h.length>0&&(r.textures=h),u.length>0&&(r.images=u),d.length>0&&(r.shapes=d),c.length>0&&(r.skeletons=c),p.length>0&&(r.animations=p),g.length>0&&(r.nodes=g)}return r.object=a,r;function s(o){let l=[];for(let h in o){let u=o[h];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,i=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),i===!0)for(let r=0;r<e.children.length;r++){let a=e.children[r];this.add(a.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Mt.DEFAULT_UP=new I(0,1,0),Mt.DEFAULT_MATRIX_AUTO_UPDATE=!0,Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var jr=class extends Mt{constructor(){super(),this.isGroup=!0,this.type="Group"}},pu={type:"move"},ka=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new jr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new jr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new jr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let i=this._hand;if(i)for(let r of e.hand.values())this._getHandJoint(i,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,i,r){let a=null,n=null,s=null,o=this._targetRay,l=this._grip,h=this._hand;if(e&&i.session.visibilityState!=="visible-blurred"){if(h&&e.hand){s=!0;for(let p of e.hand.values()){let g=i.getJointPose(p,r),M=this._getHandJoint(h,p);g!==null&&(M.matrix.fromArray(g.transform.matrix),M.matrix.decompose(M.position,M.rotation,M.scale),M.matrixWorldNeedsUpdate=!0,M.jointRadius=g.radius),M.visible=g!==null}let u=h.joints["index-finger-tip"],d=h.joints["thumb-tip"],c=u.position.distanceTo(d.position);h.inputState.pinching&&c>.025?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!h.inputState.pinching&&c<=.015&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(n=i.getPose(e.gripSpace,r),n!==null&&(l.matrix.fromArray(n.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,n.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(n.linearVelocity)):l.hasLinearVelocity=!1,n.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(n.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(a=i.getPose(e.targetRaySpace,r),a===null&&n!==null&&(a=n),a!==null&&(o.matrix.fromArray(a.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,a.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(a.linearVelocity)):o.hasLinearVelocity=!1,a.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(a.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(pu)))}return o!==null&&(o.visible=a!==null),l!==null&&(l.visible=n!==null),h!==null&&(h.visible=s!==null),this}_getHandJoint(e,i){if(e.joints[i.jointName]===void 0){let r=new jr;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[i.jointName]=r,e.add(r)}return e.joints[i.jointName]}},zo={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},vi={h:0,s:0,l:0},qr={h:0,s:0,l:0};function Wa(t,e,i){return i<0&&(i+=1),i>1&&--i,i<1/6?t+(e-t)*6*i:i<1/2?e:i<2/3?t+(e-t)*6*(2/3-i):t}var ke=class{constructor(e,i,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,i,r)}set(e,i,r){if(i===void 0&&r===void 0){let a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,i,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,i=kt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.colorSpaceToWorking(this,i),this}setRGB(e,i,r,a=Ke.workingColorSpace){return this.r=e,this.g=i,this.b=r,Ke.colorSpaceToWorking(this,a),this}setHSL(e,i,r,a=Ke.workingColorSpace){if(e=In(e,1),i=Xe(i,0,1),r=Xe(r,0,1),i===0)this.r=this.g=this.b=r;else{let n=r<=.5?r*(1+i):r+i-r*i,s=2*r-n;this.r=Wa(s,n,e+1/3),this.g=Wa(s,n,e),this.b=Wa(s,n,e-1/3)}return Ke.colorSpaceToWorking(this,a),this}setStyle(e,i=kt){function r(n){n!==void 0&&parseFloat(n)<1&&we("Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let n,s=a[1],o=a[2];switch(s){case"rgb":case"rgba":if(n=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return r(n[4]),this.setRGB(Math.min(255,parseInt(n[1],10))/255,Math.min(255,parseInt(n[2],10))/255,Math.min(255,parseInt(n[3],10))/255,i);if(n=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return r(n[4]),this.setRGB(Math.min(100,parseInt(n[1],10))/100,Math.min(100,parseInt(n[2],10))/100,Math.min(100,parseInt(n[3],10))/100,i);break;case"hsl":case"hsla":if(n=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return r(n[4]),this.setHSL(parseFloat(n[1])/360,parseFloat(n[2])/100,parseFloat(n[3])/100,i);break;default:we("Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=a[1],s=n.length;if(s===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,i);if(s===6)return this.setHex(parseInt(n,16),i);we("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,i);return this}setColorName(e,i=kt){let r=zo[e.toLowerCase()];return r===void 0?we("Color: Unknown color "+e):this.setHex(r,i),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ci(e.r),this.g=ci(e.g),this.b=ci(e.b),this}copyLinearToSRGB(e){return this.r=or(e.r),this.g=or(e.g),this.b=or(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=kt){return Ke.workingToColorSpace(Et.copy(this),e),Math.round(Xe(Et.r*255,0,255))*65536+Math.round(Xe(Et.g*255,0,255))*256+Math.round(Xe(Et.b*255,0,255))}getHexString(e=kt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,i=Ke.workingColorSpace){Ke.workingToColorSpace(Et.copy(this),i);let r=Et.r,a=Et.g,n=Et.b,s=Math.max(r,a,n),o=Math.min(r,a,n),l,h,u=(o+s)/2;if(o===s)l=0,h=0;else{let d=s-o;switch(h=u<=.5?d/(s+o):d/(2-s-o),s){case r:l=(a-n)/d+(a<n?6:0);break;case a:l=(n-r)/d+2;break;case n:l=(r-a)/d+4}l/=6}return e.h=l,e.s=h,e.l=u,e}getRGB(e,i=Ke.workingColorSpace){return Ke.workingToColorSpace(Et.copy(this),i),e.r=Et.r,e.g=Et.g,e.b=Et.b,e}getStyle(e=kt){Ke.workingToColorSpace(Et.copy(this),e);let i=Et.r,r=Et.g,a=Et.b;return e==="srgb"?`rgb(${Math.round(i*255)},${Math.round(r*255)},${Math.round(a*255)})`:`color(${e} ${i.toFixed(3)} ${r.toFixed(3)} ${a.toFixed(3)})`}offsetHSL(e,i,r){return this.getHSL(vi),this.setHSL(vi.h+e,vi.s+i,vi.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,i){return this.r=e.r+i.r,this.g=e.g+i.g,this.b=e.b+i.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,i){return this.r+=(e.r-this.r)*i,this.g+=(e.g-this.g)*i,this.b+=(e.b-this.b)*i,this}lerpColors(e,i,r){return this.r=e.r+(i.r-e.r)*r,this.g=e.g+(i.g-e.g)*r,this.b=e.b+(i.b-e.b)*r,this}lerpHSL(e,i){this.getHSL(vi),e.getHSL(qr);let r=Pr(vi.h,qr.h,i),a=Pr(vi.s,qr.s,i),n=Pr(vi.l,qr.l,i);return this.setHSL(r,a,n),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let i=this.r,r=this.g,a=this.b,n=e.elements;return this.r=n[0]*i+n[3]*r+n[6]*a,this.g=n[1]*i+n[4]*r+n[7]*a,this.b=n[2]*i+n[5]*r+n[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,i=0){return this.r=e[i],this.g=e[i+1],this.b=e[i+2],this}toArray(e=[],i=0){return e[i]=this.r,e[i+1]=this.g,e[i+2]=this.b,e}fromBufferAttribute(e,i){return this.r=e.getX(i),this.g=e.getY(i),this.b=e.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Et=new ke;ke.NAMES=zo;var Nf=class Vo{constructor(e,i=25e-5){this.isFogExp2=!0,this.name="",this.color=new ke(e),this.density=i}clone(){return new Vo(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}},If=class Ho{constructor(e,i=1,r=1e3){this.isFog=!0,this.name="",this.color=new ke(e),this.near=i,this.far=r}clone(){return new Ho(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Uf=class extends Mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Di,this.environmentIntensity=1,this.environmentRotation=new Di,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,i){return super.copy(e,i),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let i=super.toJSON(e);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),i.object.backgroundBlurriness=this.backgroundBlurriness,i.object.backgroundIntensity=this.backgroundIntensity,i.object.backgroundRotation=this.backgroundRotation.toArray(),i.object.environmentIntensity=this.environmentIntensity,i.object.environmentRotation=this.environmentRotation.toArray(),i}},Ht=new I,ri=new I,Xa=new I,ai=new I,Wi=new I,Xi=new I,vs=new I,ja=new I,qa=new I,Ya=new I,Ja=new ht,Za=new ht,Ka=new ht,vr=class tr{constructor(e=new I,i=new I,r=new I){this.a=e,this.b=i,this.c=r}static getNormal(e,i,r,a){a.subVectors(r,i),Ht.subVectors(e,i),a.cross(Ht);let n=a.lengthSq();return n>0?a.multiplyScalar(1/Math.sqrt(n)):a.set(0,0,0)}static getBarycoord(e,i,r,a,n){Ht.subVectors(a,i),ri.subVectors(r,i),Xa.subVectors(e,i);let s=Ht.dot(Ht),o=Ht.dot(ri),l=Ht.dot(Xa),h=ri.dot(ri),u=ri.dot(Xa),d=s*h-o*o;if(d===0)return n.set(0,0,0),null;let c=1/d,p=(h*l-o*u)*c,g=(s*u-o*l)*c;return n.set(1-p-g,g,p)}static containsPoint(e,i,r,a){return this.getBarycoord(e,i,r,a,ai)!==null&&ai.x>=0&&ai.y>=0&&ai.x+ai.y<=1}static getInterpolation(e,i,r,a,n,s,o,l){return this.getBarycoord(e,i,r,a,ai)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(n,ai.x),l.addScaledVector(s,ai.y),l.addScaledVector(o,ai.z),l)}static getInterpolatedAttribute(e,i,r,a,n,s){return Ja.setScalar(0),Za.setScalar(0),Ka.setScalar(0),Ja.fromBufferAttribute(e,i),Za.fromBufferAttribute(e,r),Ka.fromBufferAttribute(e,a),s.setScalar(0),s.addScaledVector(Ja,n.x),s.addScaledVector(Za,n.y),s.addScaledVector(Ka,n.z),s}static isFrontFacing(e,i,r,a){return Ht.subVectors(r,i),ri.subVectors(e,i),Ht.cross(ri).dot(a)<0}set(e,i,r){return this.a.copy(e),this.b.copy(i),this.c.copy(r),this}setFromPointsAndIndices(e,i,r,a){return this.a.copy(e[i]),this.b.copy(e[r]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,i,r,a){return this.a.fromBufferAttribute(e,i),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ht.subVectors(this.c,this.b),ri.subVectors(this.a,this.b),Ht.cross(ri).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return tr.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,i){return tr.getBarycoord(e,this.a,this.b,this.c,i)}getInterpolation(e,i,r,a,n){return tr.getInterpolation(e,this.a,this.b,this.c,i,r,a,n)}containsPoint(e){return tr.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return tr.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,i){let r=this.a,a=this.b,n=this.c,s,o;Wi.subVectors(a,r),Xi.subVectors(n,r),ja.subVectors(e,r);let l=Wi.dot(ja),h=Xi.dot(ja);if(l<=0&&h<=0)return i.copy(r);qa.subVectors(e,a);let u=Wi.dot(qa),d=Xi.dot(qa);if(u>=0&&d<=u)return i.copy(a);let c=l*d-u*h;if(c<=0&&l>=0&&u<=0)return s=l/(l-u),i.copy(r).addScaledVector(Wi,s);Ya.subVectors(e,n);let p=Wi.dot(Ya),g=Xi.dot(Ya);if(g>=0&&p<=g)return i.copy(n);let M=p*h-l*g;if(M<=0&&h>=0&&g<=0)return o=h/(h-g),i.copy(r).addScaledVector(Xi,o);let m=u*g-p*d;if(m<=0&&d-u>=0&&p-g>=0)return vs.subVectors(n,a),o=(d-u)/(d-u+(p-g)),i.copy(a).addScaledVector(vs,o);let f=1/(m+M+c);return s=M*f,o=c*f,i.copy(r).addScaledVector(Wi,s).addScaledVector(Xi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},wi=class{constructor(e=new I(1/0,1/0,1/0),i=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=i}set(e,i){return this.min.copy(e),this.max.copy(i),this}setFromArray(e){this.makeEmpty();for(let i=0,r=e.length;i<r;i+=3)this.expandByPoint(Gt.fromArray(e,i));return this}setFromBufferAttribute(e){this.makeEmpty();for(let i=0,r=e.count;i<r;i++)this.expandByPoint(Gt.fromBufferAttribute(e,i));return this}setFromPoints(e){this.makeEmpty();for(let i=0,r=e.length;i<r;i++)this.expandByPoint(e[i]);return this}setFromCenterAndSize(e,i){let r=Gt.copy(i).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,i=!1){return this.makeEmpty(),this.expandByObject(e,i)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,i=!1){e.updateWorldMatrix(!1,!1);let r=e.geometry;if(r!==void 0){let n=r.getAttribute("position");if(i===!0&&n!==void 0&&e.isInstancedMesh!==!0)for(let s=0,o=n.count;s<o;s++)e.isMesh===!0?e.getVertexPosition(s,Gt):Gt.fromBufferAttribute(n,s),Gt.applyMatrix4(e.matrixWorld),this.expandByPoint(Gt);else e.boundingBox===void 0?(r.boundingBox===null&&r.computeBoundingBox(),Yr.copy(r.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),Yr.copy(e.boundingBox)),Yr.applyMatrix4(e.matrixWorld),this.union(Yr)}let a=e.children;for(let n=0,s=a.length;n<s;n++)this.expandByObject(a[n],i);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,i){return i.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Gt),Gt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let i,r;return e.normal.x>0?(i=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(i=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(i+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(i+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(i+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(i+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),i<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(_r),Jr.subVectors(this.max,_r),ji.subVectors(e.a,_r),qi.subVectors(e.b,_r),Yi.subVectors(e.c,_r),_i.subVectors(qi,ji),xi.subVectors(Yi,qi),Ri.subVectors(ji,Yi);let i=[0,-_i.z,_i.y,0,-xi.z,xi.y,0,-Ri.z,Ri.y,_i.z,0,-_i.x,xi.z,0,-xi.x,Ri.z,0,-Ri.x,-_i.y,_i.x,0,-xi.y,xi.x,0,-Ri.y,Ri.x,0];return!$a(i,ji,qi,Yi,Jr)||(i=[1,0,0,0,1,0,0,0,1],!$a(i,ji,qi,Yi,Jr))?!1:(Zr.crossVectors(_i,xi),i=[Zr.x,Zr.y,Zr.z],$a(i,ji,qi,Yi,Jr))}clampPoint(e,i){return i.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Gt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Gt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ni[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ni[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ni[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ni[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ni[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ni[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ni[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ni[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ni),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ni=[new I,new I,new I,new I,new I,new I,new I,new I],Gt=new I,Yr=new wi,ji=new I,qi=new I,Yi=new I,_i=new I,xi=new I,Ri=new I,_r=new I,Jr=new I,Zr=new I,Ci=new I;function $a(t,e,i,r,a){for(let n=0,s=t.length-3;n<=s;n+=3){Ci.fromArray(t,n);let o=a.x*Math.abs(Ci.x)+a.y*Math.abs(Ci.y)+a.z*Math.abs(Ci.z),l=e.dot(Ci),h=i.dot(Ci),u=r.dot(Ci);if(Math.max(-Math.max(l,h,u),Math.min(l,h,u))>o)return!1}return!0}var li=fu();function fu(){let t=new ArrayBuffer(4),e=new Float32Array(t),i=new Uint32Array(t),r=new Uint32Array(512),a=new Uint32Array(512);for(let l=0;l<256;++l){let h=l-127;h<-27?(r[l]=0,r[l|256]=32768,a[l]=24,a[l|256]=24):h<-14?(r[l]=1024>>-h-14,r[l|256]=1024>>-h-14|32768,a[l]=-h-1,a[l|256]=-h-1):h<=15?(r[l]=h+15<<10,r[l|256]=h+15<<10|32768,a[l]=13,a[l|256]=13):h<128?(r[l]=31744,r[l|256]=64512,a[l]=24,a[l|256]=24):(r[l]=31744,r[l|256]=64512,a[l]=13,a[l|256]=13)}let n=new Uint32Array(2048),s=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let h=l<<13,u=0;for(;!(h&8388608);)h<<=1,u-=8388608;h&=-8388609,u+=947912704,n[l]=h|u}for(let l=1024;l<2048;++l)n[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)s[l]=l<<23;s[31]=1199570944,s[32]=2147483648;for(let l=33;l<63;++l)s[l]=2147483648+(l-32<<23);s[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:i,baseTable:r,shiftTable:a,mantissaTable:n,exponentTable:s,offsetTable:o}}function mu(t){Math.abs(t)>65504&&we("DataUtils.toHalfFloat(): Value out of range."),t=Xe(t,-65504,65504),li.floatView[0]=t;let e=li.uint32View[0],i=e>>23&511;return li.baseTable[i]+((e&8388607)>>li.shiftTable[i])}function gu(t){let e=t>>10;return li.uint32View[0]=li.mantissaTable[li.offsetTable[e]+(t&1023)]+li.exponentTable[e],li.floatView[0]}var Ff=class{static toHalfFloat(e){return mu(e)}static fromHalfFloat(e){return gu(e)}},gt=new I,Kr=new he,vu=0,qt=class extends Ei{constructor(e,i,r=!1){if(super(),Array.isArray(e))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:vu++}),this.name="",this.array=e,this.itemSize=i,this.count=e===void 0?0:e.length/i,this.normalized=r,this.usage=Lo,this.updateRanges=[],this.gpuType=pr,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,i,r){e*=this.itemSize,r*=i.itemSize;for(let a=0,n=this.itemSize;a<n;a++)this.array[e+a]=i.array[r+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let i=0,r=this.count;i<r;i++)Kr.fromBufferAttribute(this,i),Kr.applyMatrix3(e),this.setXY(i,Kr.x,Kr.y);else if(this.itemSize===3)for(let i=0,r=this.count;i<r;i++)gt.fromBufferAttribute(this,i),gt.applyMatrix3(e),this.setXYZ(i,gt.x,gt.y,gt.z);return this}applyMatrix4(e){for(let i=0,r=this.count;i<r;i++)gt.fromBufferAttribute(this,i),gt.applyMatrix4(e),this.setXYZ(i,gt.x,gt.y,gt.z);return this}applyNormalMatrix(e){for(let i=0,r=this.count;i<r;i++)gt.fromBufferAttribute(this,i),gt.applyNormalMatrix(e),this.setXYZ(i,gt.x,gt.y,gt.z);return this}transformDirection(e){for(let i=0,r=this.count;i<r;i++)gt.fromBufferAttribute(this,i),gt.transformDirection(e),this.setXYZ(i,gt.x,gt.y,gt.z);return this}set(e,i=0){return this.array.set(e,i),this}getComponent(e,i){let r=this.array[e*this.itemSize+i];return this.normalized&&(r=Wt(r,this.array)),r}setComponent(e,i,r){return this.normalized&&(r=at(r,this.array)),this.array[e*this.itemSize+i]=r,this}getX(e){let i=this.array[e*this.itemSize];return this.normalized&&(i=Wt(i,this.array)),i}setX(e,i){return this.normalized&&(i=at(i,this.array)),this.array[e*this.itemSize]=i,this}getY(e){let i=this.array[e*this.itemSize+1];return this.normalized&&(i=Wt(i,this.array)),i}setY(e,i){return this.normalized&&(i=at(i,this.array)),this.array[e*this.itemSize+1]=i,this}getZ(e){let i=this.array[e*this.itemSize+2];return this.normalized&&(i=Wt(i,this.array)),i}setZ(e,i){return this.normalized&&(i=at(i,this.array)),this.array[e*this.itemSize+2]=i,this}getW(e){let i=this.array[e*this.itemSize+3];return this.normalized&&(i=Wt(i,this.array)),i}setW(e,i){return this.normalized&&(i=at(i,this.array)),this.array[e*this.itemSize+3]=i,this}setXY(e,i,r){return e*=this.itemSize,this.normalized&&(i=at(i,this.array),r=at(r,this.array)),this.array[e+0]=i,this.array[e+1]=r,this}setXYZ(e,i,r,a){return e*=this.itemSize,this.normalized&&(i=at(i,this.array),r=at(r,this.array),a=at(a,this.array)),this.array[e+0]=i,this.array[e+1]=r,this.array[e+2]=a,this}setXYZW(e,i,r,a,n){return e*=this.itemSize,this.normalized&&(i=at(i,this.array),r=at(r,this.array),a=at(a,this.array),n=at(n,this.array)),this.array[e+0]=i,this.array[e+1]=r,this.array[e+2]=a,this.array[e+3]=n,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}},Go=class extends qt{constructor(e,i,r){super(new Uint16Array(e),i,r)}},ko=class extends qt{constructor(e,i,r){super(new Uint32Array(e),i,r)}},tt=class extends qt{constructor(e,i,r){super(new Float32Array(e),i,r)}},_u=new wi,xr=new I,Qa=new I,di=class{constructor(e=new I,i=-1){this.isSphere=!0,this.center=e,this.radius=i}set(e,i){return this.center.copy(e),this.radius=i,this}setFromPoints(e,i){let r=this.center;i===void 0?_u.setFromPoints(e).getCenter(r):r.copy(i);let a=0;for(let n=0,s=e.length;n<s;n++)a=Math.max(a,r.distanceToSquared(e[n]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let i=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=i*i}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,i){let r=this.center.distanceToSquared(e);return i.copy(e),r>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;xr.subVectors(e,this.center);let i=xr.lengthSq();if(i>this.radius*this.radius){let r=Math.sqrt(i),a=(r-this.radius)*.5;this.center.addScaledVector(xr,a/r),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Qa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(xr.copy(e.center).add(Qa)),this.expandByPoint(xr.copy(e.center).sub(Qa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},xu=0,Ft=new Je,en=new Mt,Ji=new I,Nt=new wi,yr=new wi,yt=new I,St=class Wo extends Ei{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:xu++}),this.uuid=Bt(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Uh(e)?ko:Go)(e,1):e,this}setIndirect(e,i=0){return this.indirect=e,this.indirectOffset=i,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,i){return this.attributes[e]=i,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,i,r=0){this.groups.push({start:e,count:i,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,i){this.drawRange.start=e,this.drawRange.count=i}applyMatrix4(e){let i=this.attributes.position;i!==void 0&&(i.applyMatrix4(e),i.needsUpdate=!0);let r=this.attributes.normal;if(r!==void 0){let n=new We().getNormalMatrix(e);r.applyNormalMatrix(n),r.needsUpdate=!0}let a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Ft.makeRotationFromQuaternion(e),this.applyMatrix4(Ft),this}rotateX(e){return Ft.makeRotationX(e),this.applyMatrix4(Ft),this}rotateY(e){return Ft.makeRotationY(e),this.applyMatrix4(Ft),this}rotateZ(e){return Ft.makeRotationZ(e),this.applyMatrix4(Ft),this}translate(e,i,r){return Ft.makeTranslation(e,i,r),this.applyMatrix4(Ft),this}scale(e,i,r){return Ft.makeScale(e,i,r),this.applyMatrix4(Ft),this}lookAt(e){return en.lookAt(e),en.updateMatrix(),this.applyMatrix4(en.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ji).negate(),this.translate(Ji.x,Ji.y,Ji.z),this}setFromPoints(e){let i=this.getAttribute("position");if(i===void 0){let r=[];for(let a=0,n=e.length;a<n;a++){let s=e[a];r.push(s.x,s.y,s.z||0)}this.setAttribute("position",new tt(r,3))}else{let r=Math.min(e.length,i.count);for(let a=0;a<r;a++){let n=e[a];i.setXYZ(a,n.x,n.y,n.z||0)}e.length>i.count&&we("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new wi);let e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Fe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),i)for(let r=0,a=i.length;r<a;r++){let n=i[r];Nt.setFromBufferAttribute(n),this.morphTargetsRelative?(yt.addVectors(this.boundingBox.min,Nt.min),this.boundingBox.expandByPoint(yt),yt.addVectors(this.boundingBox.max,Nt.max),this.boundingBox.expandByPoint(yt)):(this.boundingBox.expandByPoint(Nt.min),this.boundingBox.expandByPoint(Nt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Fe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new di);let e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Fe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){let r=this.boundingSphere.center;if(Nt.setFromBufferAttribute(e),i)for(let n=0,s=i.length;n<s;n++){let o=i[n];yr.setFromBufferAttribute(o),this.morphTargetsRelative?(yt.addVectors(Nt.min,yr.min),Nt.expandByPoint(yt),yt.addVectors(Nt.max,yr.max),Nt.expandByPoint(yt)):(Nt.expandByPoint(yr.min),Nt.expandByPoint(yr.max))}Nt.getCenter(r);let a=0;for(let n=0,s=e.count;n<s;n++)yt.fromBufferAttribute(e,n),a=Math.max(a,r.distanceToSquared(yt));if(i)for(let n=0,s=i.length;n<s;n++){let o=i[n],l=this.morphTargetsRelative;for(let h=0,u=o.count;h<u;h++)yt.fromBufferAttribute(o,h),l&&(Ji.fromBufferAttribute(e,h),yt.add(Ji)),a=Math.max(a,r.distanceToSquared(yt))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&Fe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,i=this.attributes;if(e===null||i.position===void 0||i.normal===void 0||i.uv===void 0){Fe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let r=i.position,a=i.normal,n=i.uv,s=this.getAttribute("tangent");(s===void 0||s.count!==r.count)&&(s=new qt(new Float32Array(4*r.count),4),this.setAttribute("tangent",s));let o=[],l=[];for(let v=0;v<r.count;v++)o[v]=new I,l[v]=new I;let h=new I,u=new I,d=new I,c=new he,p=new he,g=new he,M=new I,m=new I;function f(v,S,B){h.fromBufferAttribute(r,v),u.fromBufferAttribute(r,S),d.fromBufferAttribute(r,B),c.fromBufferAttribute(n,v),p.fromBufferAttribute(n,S),g.fromBufferAttribute(n,B),u.sub(h),d.sub(h),p.sub(c),g.sub(c);let P=1/(p.x*g.y-g.x*p.y);isFinite(P)&&(M.copy(u).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(P),m.copy(d).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(P),o[v].add(M),o[S].add(M),o[B].add(M),l[v].add(m),l[S].add(m),l[B].add(m))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let v=0,S=T.length;v<S;++v){let B=T[v],P=B.start,O=B.count;for(let X=P,N=P+O;X<N;X+=3)f(e.getX(X+0),e.getX(X+1),e.getX(X+2))}let w=new I,_=new I,E=new I,A=new I;function R(v){E.fromBufferAttribute(a,v),A.copy(E);let S=o[v];w.copy(S),w.sub(E.multiplyScalar(E.dot(S))).normalize(),_.crossVectors(A,S);let B=_.dot(l[v])<0?-1:1;s.setXYZW(v,w.x,w.y,w.z,B)}for(let v=0,S=T.length;v<S;++v){let B=T[v],P=B.start,O=B.count;for(let X=P,N=P+O;X<N;X+=3)R(e.getX(X+0)),R(e.getX(X+1)),R(e.getX(X+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,i=this.getAttribute("position");if(i!==void 0){let r=this.getAttribute("normal");if(r===void 0||r.count!==i.count)r=new qt(new Float32Array(i.count*3),3),this.setAttribute("normal",r);else for(let c=0,p=r.count;c<p;c++)r.setXYZ(c,0,0,0);let a=new I,n=new I,s=new I,o=new I,l=new I,h=new I,u=new I,d=new I;if(e)for(let c=0,p=e.count;c<p;c+=3){let g=e.getX(c+0),M=e.getX(c+1),m=e.getX(c+2);a.fromBufferAttribute(i,g),n.fromBufferAttribute(i,M),s.fromBufferAttribute(i,m),u.subVectors(s,n),d.subVectors(a,n),u.cross(d),o.fromBufferAttribute(r,g),l.fromBufferAttribute(r,M),h.fromBufferAttribute(r,m),o.add(u),l.add(u),h.add(u),r.setXYZ(g,o.x,o.y,o.z),r.setXYZ(M,l.x,l.y,l.z),r.setXYZ(m,h.x,h.y,h.z)}else for(let c=0,p=i.count;c<p;c+=3)a.fromBufferAttribute(i,c+0),n.fromBufferAttribute(i,c+1),s.fromBufferAttribute(i,c+2),u.subVectors(s,n),d.subVectors(a,n),u.cross(d),r.setXYZ(c+0,u.x,u.y,u.z),r.setXYZ(c+1,u.x,u.y,u.z),r.setXYZ(c+2,u.x,u.y,u.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let i=0,r=e.count;i<r;i++)yt.fromBufferAttribute(e,i),yt.normalize(),e.setXYZ(i,yt.x,yt.y,yt.z)}toNonIndexed(){function e(o,l){let h=o.array,u=o.itemSize,d=o.normalized,c=new h.constructor(l.length*u),p=0,g=0;for(let M=0,m=l.length;M<m;M++){p=o.isInterleavedBufferAttribute?l[M]*o.data.stride+o.offset:l[M]*u;for(let f=0;f<u;f++)c[g++]=h[p++]}return new qt(c,u,d)}if(this.index===null)return we("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let i=new Wo,r=this.index.array,a=this.attributes;for(let o in a){let l=a[o],h=e(l,r);i.setAttribute(o,h)}let n=this.morphAttributes;for(let o in n){let l=[],h=n[o];for(let u=0,d=h.length;u<d;u++){let c=h[u],p=e(c,r);l.push(p)}i.morphAttributes[o]=l}i.morphTargetsRelative=this.morphTargetsRelative;let s=this.groups;for(let o=0,l=s.length;o<l;o++){let h=s[o];i.addGroup(h.start,h.count,h.materialIndex)}return i}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let h in l)l[h]!==void 0&&(e[h]=l[h]);return e}e.data={attributes:{}};let i=this.index;i!==null&&(e.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});let r=this.attributes;for(let l in r){let h=r[l];e.data.attributes[l]=h.toJSON(e.data)}let a={},n=!1;for(let l in this.morphAttributes){let h=this.morphAttributes[l],u=[];for(let d=0,c=h.length;d<c;d++){let p=h[d];u.push(p.toJSON(e.data))}u.length>0&&(a[l]=u,n=!0)}n&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);let s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let i={};this.name=e.name;let r=e.index;r!==null&&this.setIndex(r.clone());let a=e.attributes;for(let h in a){let u=a[h];this.setAttribute(h,u.clone(i))}let n=e.morphAttributes;for(let h in n){let u=[],d=n[h];for(let c=0,p=d.length;c<p;c++)u.push(d[c].clone(i));this.morphAttributes[h]=u}this.morphTargetsRelative=e.morphTargetsRelative;let s=e.groups;for(let h=0,u=s.length;h<u;h++){let d=s[h];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Wf=class{constructor(e,i){this.isInterleavedBuffer=!0,this.array=e,this.stride=i,this.count=e===void 0?0:e.length/i,this.usage=Lo,this.updateRanges=[],this.version=0,this.uuid=Bt()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,i,r){e*=this.stride,r*=i.stride;for(let a=0,n=this.stride;a<n;a++)this.array[e+a]=i.array[r+a];return this}set(e,i=0){return this.array.set(e,i),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let i=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),r=new this.constructor(i,this.stride);return r.setUsage(this.usage),r}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let i={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return i.usage=this.usage,i}},wt=new I,jf=class Xo{constructor(e,i,r,a=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=i,this.offset=r,this.normalized=a}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let i=0,r=this.data.count;i<r;i++)wt.fromBufferAttribute(this,i),wt.applyMatrix4(e),this.setXYZ(i,wt.x,wt.y,wt.z);return this}applyNormalMatrix(e){for(let i=0,r=this.count;i<r;i++)wt.fromBufferAttribute(this,i),wt.applyNormalMatrix(e),this.setXYZ(i,wt.x,wt.y,wt.z);return this}transformDirection(e){for(let i=0,r=this.count;i<r;i++)wt.fromBufferAttribute(this,i),wt.transformDirection(e),this.setXYZ(i,wt.x,wt.y,wt.z);return this}getComponent(e,i){let r=this.array[e*this.data.stride+this.offset+i];return this.normalized&&(r=Wt(r,this.array)),r}setComponent(e,i,r){return this.normalized&&(r=at(r,this.array)),this.data.array[e*this.data.stride+this.offset+i]=r,this}setX(e,i){return this.normalized&&(i=at(i,this.array)),this.data.array[e*this.data.stride+this.offset]=i,this}setY(e,i){return this.normalized&&(i=at(i,this.array)),this.data.array[e*this.data.stride+this.offset+1]=i,this}setZ(e,i){return this.normalized&&(i=at(i,this.array)),this.data.array[e*this.data.stride+this.offset+2]=i,this}setW(e,i){return this.normalized&&(i=at(i,this.array)),this.data.array[e*this.data.stride+this.offset+3]=i,this}getX(e){let i=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(i=Wt(i,this.array)),i}getY(e){let i=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(i=Wt(i,this.array)),i}getZ(e){let i=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(i=Wt(i,this.array)),i}getW(e){let i=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(i=Wt(i,this.array)),i}setXY(e,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(i=at(i,this.array),r=at(r,this.array)),this.data.array[e+0]=i,this.data.array[e+1]=r,this}setXYZ(e,i,r,a){return e=e*this.data.stride+this.offset,this.normalized&&(i=at(i,this.array),r=at(r,this.array),a=at(a,this.array)),this.data.array[e+0]=i,this.data.array[e+1]=r,this.data.array[e+2]=a,this}setXYZW(e,i,r,a,n){return e=e*this.data.stride+this.offset,this.normalized&&(i=at(i,this.array),r=at(r,this.array),a=at(a,this.array),n=at(n,this.array)),this.data.array[e+0]=i,this.data.array[e+1]=r,this.data.array[e+2]=a,this.data.array[e+3]=n,this}clone(e){if(e===void 0){Ra("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let i=[];for(let r=0;r<this.count;r++){let a=r*this.data.stride+this.offset;for(let n=0;n<this.itemSize;n++)i.push(this.data.array[a+n])}return new qt(new this.array.constructor(i),this.itemSize,this.normalized)}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Xo(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Ra("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let i=[];for(let r=0;r<this.count;r++){let a=r*this.data.stride+this.offset;for(let n=0;n<this.itemSize;n++)i.push(this.data.array[a+n])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:i,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},tn=new I,yu=new I,Mu=new We,Mi=class{constructor(e=new I(1,0,0),i=0){this.isPlane=!0,this.normal=e,this.constant=i}set(e,i){return this.normal.copy(e),this.constant=i,this}setComponents(e,i,r,a){return this.normal.set(e,i,r),this.constant=a,this}setFromNormalAndCoplanarPoint(e,i){return this.normal.copy(e),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(e,i,r){let a=tn.subVectors(r,i).cross(yu.subVectors(e,i)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,i){return i.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,i,r=!0){let a=e.delta(tn),n=this.normal.dot(a);if(n===0)return this.distanceToPoint(e.start)===0?i.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/n;return r===!0&&(s<0||s>1)?null:i.copy(e.start).addScaledVector(a,s)}intersectsLine(e){let i=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return i<0&&r>0||r<0&&i>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,i){let r=i||Mu.getNormalMatrix(e),a=this.coplanarPoint(tn).applyMatrix4(e),n=this.normal.applyMatrix3(r).normalize();return this.constant=-a.dot(n),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Su=0,pi=class extends Ei{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Su++}),this.uuid=Bt(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ke(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Fa,this.stencilZFail=Fa,this.stencilZPass=Fa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let i in e){let r=e[i];if(r===void 0){we(`Material: parameter '${i}' has value of undefined.`);continue}let a=this[i];if(a===void 0){we(`Material: '${i}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(r):a&&a.isVector2&&r&&r.isVector2||a&&a.isEuler&&r&&r.isEuler||a&&a.isVector3&&r&&r.isVector3?a.copy(r):this[i]=r}}toJSON(e){let i=e===void 0||typeof e=="string";i&&(e={textures:{},images:{}});let r={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,r.blending=this.blending,r.side=this.side,r.shadowSide=this.shadowSide,r.vertexColors=this.vertexColors,r.opacity=this.opacity,r.transparent=this.transparent,r.blendSrc=this.blendSrc,r.blendDst=this.blendDst,r.blendEquation=this.blendEquation,r.blendSrcAlpha=this.blendSrcAlpha,r.blendDstAlpha=this.blendDstAlpha,r.blendEquationAlpha=this.blendEquationAlpha,r.blendColor=this.blendColor.getHex(),r.blendAlpha=this.blendAlpha,r.depthFunc=this.depthFunc,r.depthTest=this.depthTest,r.depthWrite=this.depthWrite,r.colorWrite=this.colorWrite,r.clipIntersection=this.clipIntersection,r.clipShadows=this.clipShadows,r.stencilWriteMask=this.stencilWriteMask,r.stencilFunc=this.stencilFunc,r.stencilRef=this.stencilRef,r.stencilFuncMask=this.stencilFuncMask,r.stencilFail=this.stencilFail,r.stencilZFail=this.stencilZFail,r.stencilZPass=this.stencilZPass,r.stencilWrite=this.stencilWrite,r.polygonOffset=this.polygonOffset,r.polygonOffsetFactor=this.polygonOffsetFactor,r.polygonOffsetUnits=this.polygonOffsetUnits,r.dithering=this.dithering,r.alphaTest=this.alphaTest,r.alphaHash=this.alphaHash,r.alphaToCoverage=this.alphaToCoverage,r.premultipliedAlpha=this.premultipliedAlpha,r.forceSinglePass=this.forceSinglePass,r.allowOverride=this.allowOverride,r.visible=this.visible,r.toneMapped=this.toneMapped,r.name=this.name,this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(r.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(r.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(r.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(r.clippingPlanes=this.clippingPlanes.map(n=>n.toJSON())),this.rotation!==void 0&&(r.rotation=this.rotation),this.depthPacking!==void 0&&(r.depthPacking=this.depthPacking),this.linewidth!==void 0&&(r.linewidth=this.linewidth),this.linecap!==void 0&&(r.linecap=this.linecap),this.linejoin!==void 0&&(r.linejoin=this.linejoin),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.wireframe!==void 0&&(r.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(r.flatShading=this.flatShading),this.fog!==void 0&&(r.fog=this.fog),Object.keys(this.userData).length>0&&(r.userData=this.userData);function a(n){let s=[];for(let o in n){let l=n[o];delete l.metadata,s.push(l)}return s}if(i){let n=a(e.textures),s=a(e.images);n.length>0&&(r.textures=n),s.length>0&&(r.images=s)}return r}fromJSON(e,i){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new ke().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(r=>new Mi().fromJSON(r))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors=="number"?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=i[e.map]||null),e.matcap!==void 0&&(this.matcap=i[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=i[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=i[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=i[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let r=e.normalScale;Array.isArray(r)===!1&&(r=[r,r]),this.normalScale=new he().fromArray(r)}return e.displacementMap!==void 0&&(this.displacementMap=i[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=i[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=i[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=i[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=i[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=i[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=i[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=i[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=i[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=i[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=i[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=i[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=i[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=i[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new he().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=i[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=i[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=i[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=i[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=i[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=i[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=i[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let i=e.clippingPlanes,r=null;if(i!==null){let a=i.length;r=Array(a);for(let n=0;n!==a;++n)r[n]=i[n].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};new Je;var si=new I,rn=new I,$r=new I,Qr=new I,zr=class{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,si)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=si.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(si.copy(this.origin).addScaledVector(this.direction,e),si.distanceToSquared(t))}distanceSqToSegment(t,e,i,r){rn.copy(t).add(e).multiplyScalar(.5),$r.copy(e).sub(t).normalize(),Qr.copy(this.origin).sub(rn);let a=t.distanceTo(e)*.5,n=-this.direction.dot($r),s=Qr.dot(this.direction),o=-Qr.dot($r),l=Qr.lengthSq(),h=Math.abs(1-n*n),u,d,c,p;if(h>0)if(u=n*o-s,d=n*s-o,p=a*h,u>=0)if(d>=-p)if(d<=p){let g=1/h;u*=g,d*=g,c=u*(u+n*d+2*s)+d*(n*u+d+2*o)+l}else d=a,u=Math.max(0,-(n*d+s)),c=-u*u+d*(d+2*o)+l;else d=-a,u=Math.max(0,-(n*d+s)),c=-u*u+d*(d+2*o)+l;else d<=-p?(u=Math.max(0,-(-n*a+s)),d=u>0?-a:Math.min(Math.max(-a,-o),a),c=-u*u+d*(d+2*o)+l):d<=p?(u=0,d=Math.min(Math.max(-a,-o),a),c=d*(d+2*o)+l):(u=Math.max(0,-(n*a+s)),d=u>0?a:Math.min(Math.max(-a,-o),a),c=-u*u+d*(d+2*o)+l);else d=n>0?-a:a,u=Math.max(0,-(n*d+s)),c=-u*u+d*(d+2*o)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(rn).addScaledVector($r,d),c}intersectSphere(t,e){if(t.radius<0)return null;si.subVectors(t.center,this.origin);let i=si.dot(this.direction),r=si.dot(si)-i*i,a=t.radius*t.radius;if(r>a)return null;let n=Math.sqrt(a-r),s=i-n,o=i+n;return o<0?null:s<0?this.at(o,e):this.at(s,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,r,a,n,s,o,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(i=(t.min.x-d.x)*l,r=(t.max.x-d.x)*l):(i=(t.max.x-d.x)*l,r=(t.min.x-d.x)*l),h>=0?(a=(t.min.y-d.y)*h,n=(t.max.y-d.y)*h):(a=(t.max.y-d.y)*h,n=(t.min.y-d.y)*h),i>n||a>r||((a>i||isNaN(i))&&(i=a),(n<r||isNaN(r))&&(r=n),u>=0?(s=(t.min.z-d.z)*u,o=(t.max.z-d.z)*u):(s=(t.max.z-d.z)*u,o=(t.min.z-d.z)*u),i>o||s>r)||((s>i||i!==i)&&(i=s),(o<r||r!==r)&&(r=o),r<0)?null:this.at(i>=0?i:r,e)}intersectsBox(t){return this.intersectBox(t,si)!==null}intersectTriangle(t,e,i,r,a){let n=this.origin,s=this.direction,o=s.x,l=s.y,h=s.z,u=t.x-n.x,d=t.y-n.y,c=t.z-n.z,p=e.x-n.x,g=e.y-n.y,M=e.z-n.z,m=i.x-n.x,f=i.y-n.y,T=i.z-n.z,w=Math.abs(o),_=Math.abs(l),E=Math.abs(h),A,R,v,S,B,P,O,X,N,V,J,G;if(w>=_&&w>=E?(v=o,P=u,N=p,G=m,o>=0?(A=l,R=h,S=d,B=c,O=g,X=M,V=f,J=T):(A=h,R=l,S=c,B=d,O=M,X=g,V=T,J=f)):_>=E?(v=l,P=d,N=g,G=f,l>=0?(A=h,R=o,S=c,B=u,O=M,X=p,V=T,J=m):(A=o,R=h,S=u,B=c,O=p,X=M,V=m,J=T)):(v=h,P=c,N=M,G=T,h>=0?(A=o,R=l,S=u,B=d,O=p,X=g,V=m,J=f):(A=l,R=o,S=d,B=u,O=g,X=p,V=f,J=m)),v===0)return null;let oe=A/v,j=R/v,Y=1/v,Q=S-oe*P,ze=B-j*P,Ae=O-oe*N,nt=X-j*N,Ve=V-oe*G,q=J-j*G,ie=Ve*nt-q*Ae,ne=Q*q-ze*Ve,Ce=Ae*ze-nt*Q;if(r){if(ie<0||ne<0||Ce<0)return null}else if((ie<0||ne<0||Ce<0)&&(ie>0||ne>0||Ce>0))return null;let Ue=ie+ne+Ce;if(Ue===0)return null;let de=Y*(ie*P+ne*N+Ce*G);return(Ue>0?de<0:de>0)?null:this.at(de/Ue,a)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},jo=class extends pi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Di,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},_s=new Je,Pi=new zr,ea=new di,xs=new I,ta=new I,ia=new I,ra=new I,an=new I,aa=new I,ys=new I,na=new I,zt=class extends Mt{constructor(t=new St,e=new jo){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,e=Object.keys(t);if(e.length>0){let i=t[e[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let n=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[n]=r}}}}getVertexPosition(t,e){let i=this.geometry,r=i.attributes.position,a=i.morphAttributes.position,n=i.morphTargetsRelative;e.fromBufferAttribute(r,t);let s=this.morphTargetInfluences;if(a&&s){aa.set(0,0,0);for(let o=0,l=a.length;o<l;o++){let h=s[o],u=a[o];h!==0&&(an.fromBufferAttribute(u,t),n?aa.addScaledVector(an,h):aa.addScaledVector(an.sub(e),h))}e.add(aa)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,r=this.material,a=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ea.copy(i.boundingSphere),ea.applyMatrix4(a),Pi.copy(t.ray).recast(t.near),!(ea.containsPoint(Pi.origin)===!1&&(Pi.intersectSphere(ea,xs)===null||Pi.origin.distanceToSquared(xs)>(t.far-t.near)**2))&&(_s.copy(a).invert(),Pi.copy(t.ray).applyMatrix4(_s),(i.boundingBox===null||Pi.intersectsBox(i.boundingBox)!==!1)&&this._computeIntersections(t,e,Pi)))}_computeIntersections(t,e,i){let r,a=this.geometry,n=this.material,s=a.index,o=a.attributes.position,l=a.attributes.uv,h=a.attributes.uv1,u=a.attributes.normal,d=a.groups,c=a.drawRange;if(s!==null)if(Array.isArray(n))for(let p=0,g=d.length;p<g;p++){let M=d[p],m=n[M.materialIndex],f=Math.max(M.start,c.start),T=Math.min(s.count,Math.min(M.start+M.count,c.start+c.count));for(let w=f,_=T;w<_;w+=3){let E=s.getX(w),A=s.getX(w+1),R=s.getX(w+2);r=sa(this,m,t,i,l,h,u,E,A,R),r&&(r.faceIndex=Math.floor(w/3),r.face.materialIndex=M.materialIndex,e.push(r))}}else{let p=Math.max(0,c.start),g=Math.min(s.count,c.start+c.count);for(let M=p,m=g;M<m;M+=3){let f=s.getX(M),T=s.getX(M+1),w=s.getX(M+2);r=sa(this,n,t,i,l,h,u,f,T,w),r&&(r.faceIndex=Math.floor(M/3),e.push(r))}}else if(o!==void 0)if(Array.isArray(n))for(let p=0,g=d.length;p<g;p++){let M=d[p],m=n[M.materialIndex],f=Math.max(M.start,c.start),T=Math.min(o.count,Math.min(M.start+M.count,c.start+c.count));for(let w=f,_=T;w<_;w+=3){let E=w,A=w+1,R=w+2;r=sa(this,m,t,i,l,h,u,E,A,R),r&&(r.faceIndex=Math.floor(w/3),r.face.materialIndex=M.materialIndex,e.push(r))}}else{let p=Math.max(0,c.start),g=Math.min(o.count,c.start+c.count);for(let M=p,m=g;M<m;M+=3){let f=M,T=M+1,w=M+2;r=sa(this,n,t,i,l,h,u,f,T,w),r&&(r.faceIndex=Math.floor(M/3),e.push(r))}}}};function bu(t,e,i,r,a,n,s,o){let l;if(l=e.side===1?r.intersectTriangle(s,n,a,!0,o):r.intersectTriangle(a,n,s,e.side===0,o),l===null)return null;na.copy(o),na.applyMatrix4(t.matrixWorld);let h=i.ray.origin.distanceTo(na);return h<i.near||h>i.far?null:{distance:h,point:na.clone(),object:t}}function sa(t,e,i,r,a,n,s,o,l,h){t.getVertexPosition(o,ta),t.getVertexPosition(l,ia),t.getVertexPosition(h,ra);let u=bu(t,e,i,r,ta,ia,ra,ys);if(u){let d=new I;vr.getBarycoord(ys,ta,ia,ra,d),a&&(u.uv=vr.getInterpolatedAttribute(a,o,l,h,d,new he)),n&&(u.uv1=vr.getInterpolatedAttribute(n,o,l,h,d,new he)),s&&(u.normal=vr.getInterpolatedAttribute(s,o,l,h,d,new I),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let c={a:o,b:l,c:h,normal:new I,materialIndex:0};vr.getNormal(ta,ia,ra,c.normal),u.face=c,u.barycoord=d}return u}var Mr=new ht,Ms=new ht,Ss=new ht,Tu=new ht,bs=new Je,oa=new I,nn=new di,Ts=new Je,sn=new zr,Jf=class extends zt{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=zl,this.bindMatrix=new Je,this.bindMatrixInverse=new Je,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let t=this.geometry;this.boundingBox===null&&(this.boundingBox=new wi),this.boundingBox.makeEmpty();let e=t.getAttribute("position");for(let i=0;i<e.count;i++)this.getVertexPosition(i,oa),this.boundingBox.expandByPoint(oa)}computeBoundingSphere(){let t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new di),this.boundingSphere.makeEmpty();let e=t.getAttribute("position");for(let i=0;i<e.count;i++)this.getVertexPosition(i,oa),this.boundingSphere.expandByPoint(oa)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){let i=this.material,r=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),nn.copy(this.boundingSphere),nn.applyMatrix4(r),t.ray.intersectsSphere(nn)!==!1&&(Ts.copy(r).invert(),sn.copy(t.ray).applyMatrix4(Ts),(this.boundingBox===null||sn.intersectsBox(this.boundingBox)!==!1)&&this._computeIntersections(t,e,sn)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let t=new ht,e=this.geometry.attributes.skinWeight;for(let i=0,r=e.count;i<r;i++){t.fromBufferAttribute(e,i);let a=1/t.manhattanLength();a===1/0?t.set(1,0,0,0):t.multiplyScalar(a),e.setXYZW(i,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode==="attached"?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode==="detached"?this.bindMatrixInverse.copy(this.bindMatrix).invert():we("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){let i=this.skeleton,r=this.geometry;Ms.fromBufferAttribute(r.attributes.skinIndex,t),Ss.fromBufferAttribute(r.attributes.skinWeight,t),e.isVector4?(Mr.copy(e),e.set(0,0,0,0)):(Mr.set(...e,1),e.set(0,0,0)),Mr.applyMatrix4(this.bindMatrix);for(let a=0;a<4;a++){let n=Ss.getComponent(a);if(n!==0){let s=Ms.getComponent(a);bs.multiplyMatrices(i.bones[s].matrixWorld,i.boneInverses[s]),e.addScaledVector(Tu.copy(Mr).applyMatrix4(bs),n)}}return e.isVector4&&(e.w=Mr.w),e.applyMatrix4(this.bindMatrixInverse)}},Eu=class extends Mt{constructor(){super(),this.isBone=!0,this.type="Bone"}},On=class extends Dt{constructor(t=null,e=1,i=1,r,a,n,s,o,l=Rt,h=Rt,u,d){super(null,n,s,o,l,h,r,a,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Es=new Je,wu=new Je,Zf=class qo{constructor(e=[],i=[]){this.uuid=Bt(),this.bones=e.slice(0),this.boneInverses=i,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,i=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),i.length===0)this.calculateInverses();else if(e.length!==i.length){we("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let r=0,a=this.bones.length;r<a;r++)this.boneInverses.push(new Je)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,i=this.bones.length;e<i;e++){let r=new Je;this.bones[e]&&r.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(r)}}pose(){for(let e=0,i=this.bones.length;e<i;e++){let r=this.bones[e];r&&r.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,i=this.bones.length;e<i;e++){let r=this.bones[e];r&&(r.parent&&r.parent.isBone?(r.matrix.copy(r.parent.matrixWorld).invert(),r.matrix.multiply(r.matrixWorld)):r.matrix.copy(r.matrixWorld),r.matrix.decompose(r.position,r.quaternion,r.scale))}}update(){let e=this.bones,i=this.boneInverses,r=this.boneMatrices,a=this.boneTexture;for(let n=0,s=e.length;n<s;n++){let o=e[n]?e[n].matrixWorld:wu;Es.multiplyMatrices(o,i[n]),Es.toArray(r,n*16)}a!==null&&(a.needsUpdate=!0)}clone(){return new qo(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let i=new Float32Array(e*e*4);i.set(this.boneMatrices);let r=new On(i,e,e,lr,pr);return r.needsUpdate=!0,this.boneMatrices=i,this.boneTexture=r,this}getBoneByName(e){for(let i=0,r=this.bones.length;i<r;i++){let a=this.bones[i];if(a.name===e)return a}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,i){this.uuid=e.uuid;for(let r=0,a=e.bones.length;r<a;r++){let n=e.bones[r],s=i[n];s===void 0&&(we("Skeleton: No bone found with UUID:",n),s=new Eu),this.bones.push(s),this.boneInverses.push(new Je().fromArray(e.boneInverses[r]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let i=this.bones,r=this.boneInverses;for(let a=0,n=i.length;a<n;a++){let s=i[a];e.bones.push(s.uuid);let o=r[a];e.boneInverses.push(o.toArray())}return e}},ws=class extends qt{constructor(t,e,i,r=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Zi=new Je,As=new Je,la=[],Rs=new wi,Au=new Je,Sr=new zt,br=new di,Kf=class extends zt{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new ws(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,Au)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new wi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Zi),Rs.copy(t.boundingBox).applyMatrix4(Zi),this.boundingBox.union(Rs)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new di),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Zi),br.copy(t.boundingSphere).applyMatrix4(Zi),this.boundingSphere.union(br)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let i=e.morphTargetInfluences,r=this.morphTexture.source.data.data,a=t*(i.length+1)+1;for(let n=0;n<i.length;n++)i[n]=r[a+n]}raycast(t,e){let i=this.matrixWorld,r=this.count;if(Sr.geometry=this.geometry,Sr.material=this.material,Sr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),br.copy(this.boundingSphere),br.applyMatrix4(i),t.ray.intersectsSphere(br)!==!1))for(let a=0;a<r;a++){this.getMatrixAt(a,Zi),As.multiplyMatrices(i,Zi),Sr.matrixWorld=As,Sr.raycast(t,la);for(let n=0,s=la.length;n<s;n++){let o=la[n];o.instanceId=a,o.object=this,e.push(o)}la.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new ws(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let i=e.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new On(new Float32Array(r*this.count),r,this.count,Ao,pr));let a=this.morphTexture.source.data.data,n=0;for(let l=0;l<i.length;l++)n+=i[l];let s=this.geometry.morphTargetsRelative?1:1-n,o=r*t;return a[o]=s,a.set(i,o+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Li=new di,Ru=new he(.5,.5),ha=new I,Fn=class{constructor(t=new Mi,e=new Mi,i=new Mi,r=new Mi,a=new Mi,n=new Mi){this.planes=[t,e,i,r,a,n]}set(t,e,i,r,a,n){let s=this.planes;return s[0].copy(t),s[1].copy(e),s[2].copy(i),s[3].copy(r),s[4].copy(a),s[5].copy(n),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=hr,i=!1){let r=this.planes,a=t.elements,n=a[0],s=a[1],o=a[2],l=a[3],h=a[4],u=a[5],d=a[6],c=a[7],p=a[8],g=a[9],M=a[10],m=a[11],f=a[12],T=a[13],w=a[14],_=a[15];if(r[0].setComponents(l-n,c-h,m-p,_-f).normalize(),r[1].setComponents(l+n,c+h,m+p,_+f).normalize(),r[2].setComponents(l+s,c+u,m+g,_+T).normalize(),r[3].setComponents(l-s,c-u,m-g,_-T).normalize(),i)r[4].setComponents(o,d,M,w).normalize(),r[5].setComponents(l-o,c-d,m-M,_-w).normalize();else if(r[4].setComponents(l-o,c-d,m-M,_-w).normalize(),e===2e3)r[5].setComponents(l+o,c+d,m+M,_+w).normalize();else if(e===2001)r[5].setComponents(o,d,M,w).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Li.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Li.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Li)}intersectsSprite(t){return Li.center.set(0,0,0),Li.radius=.7071067811865476+Ru.distanceTo(t.center),Li.applyMatrix4(t.matrixWorld),this.intersectsSphere(Li)}intersectsSphere(t){let e=this.planes,i=t.center,r=-t.radius;for(let a=0;a<6;a++)if(e[a].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let r=e[i];if(ha.x=r.normal.x>0?t.max.x:t.min.x,ha.y=r.normal.y>0?t.max.y:t.min.y,ha.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(ha)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Cu=class extends pi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ke(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Ca=new I,Pa=new I,Cs=new Je,Tr=new zr,ua=new di,on=new I,Ps=new I,Yo=class extends Mt{constructor(t=new St,e=new Cu){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[0];for(let r=1,a=e.count;r<a;r++)Ca.fromBufferAttribute(e,r-1),Pa.fromBufferAttribute(e,r),i[r]=i[r-1],i[r]+=Ca.distanceTo(Pa);t.setAttribute("lineDistance",new tt(i,1))}else we("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,r=this.matrixWorld,a=t.params.Line.threshold,n=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ua.copy(i.boundingSphere),ua.applyMatrix4(r),ua.radius+=a,t.ray.intersectsSphere(ua)===!1)return;Cs.copy(r).invert(),Tr.copy(t.ray).applyMatrix4(Cs);let s=a/((this.scale.x+this.scale.y+this.scale.z)/3),o=s*s,l=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){let d=Math.max(0,n.start),c=Math.min(h.count,n.start+n.count);for(let p=d,g=c-1;p<g;p+=l){let M=h.getX(p),m=h.getX(p+1),f=ca(this,t,Tr,o,M,m,p);f&&e.push(f)}if(this.isLineLoop){let p=h.getX(c-1),g=h.getX(d),M=ca(this,t,Tr,o,p,g,c-1);M&&e.push(M)}}else{let d=Math.max(0,n.start),c=Math.min(u.count,n.start+n.count);for(let p=d,g=c-1;p<g;p+=l){let M=ca(this,t,Tr,o,p,p+1,p);M&&e.push(M)}if(this.isLineLoop){let p=ca(this,t,Tr,o,c-1,d,c-1);p&&e.push(p)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,e=Object.keys(t);if(e.length>0){let i=t[e[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let n=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[n]=r}}}}};function ca(t,e,i,r,a,n,s){let o=t.geometry.attributes.position;if(Ca.fromBufferAttribute(o,a),Pa.fromBufferAttribute(o,n),i.distanceSqToSegment(Ca,Pa,on,Ps)>r)return;on.applyMatrix4(t.matrixWorld);let l=e.ray.origin.distanceTo(on);if(!(l<e.near||l>e.far))return{distance:l,point:Ps.clone().applyMatrix4(t.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:t}}var Ls=new I,Ns=new I,$f=class extends Yo{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[];for(let r=0,a=e.count;r<a;r+=2)Ls.fromBufferAttribute(e,r),Ns.fromBufferAttribute(e,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Ls.distanceTo(Ns);t.setAttribute("lineDistance",new tt(i,1))}else we("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Qf=class extends Yo{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}},Pu=class extends pi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ke(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Is=new Je,Tn=new zr,da=new di,pa=new I,em=class extends Mt{constructor(t=new St,e=new Pu){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,r=this.matrixWorld,a=t.params.Points.threshold,n=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),da.copy(i.boundingSphere),da.applyMatrix4(r),da.radius+=a,t.ray.intersectsSphere(da)===!1)return;Is.copy(r).invert(),Tn.copy(t.ray).applyMatrix4(Is);let s=a/((this.scale.x+this.scale.y+this.scale.z)/3),o=s*s,l=i.index,h=i.attributes.position;if(l!==null){let u=Math.max(0,n.start),d=Math.min(l.count,n.start+n.count);for(let c=u,p=d;c<p;c++){let g=l.getX(c);pa.fromBufferAttribute(h,g),Us(pa,g,o,r,t,e,this)}}else{let u=Math.max(0,n.start),d=Math.min(h.count,n.start+n.count);for(let c=u,p=d;c<p;c++)pa.fromBufferAttribute(h,c),Us(pa,c,o,r,t,e,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,e=Object.keys(t);if(e.length>0){let i=t[e[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let n=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[n]=r}}}}};function Us(t,e,i,r,a,n,s){let o=Tn.distanceSqToPoint(t);if(o<i){let l=new I;Tn.closestPointToPoint(t,l),l.applyMatrix4(r);let h=a.ray.origin.distanceTo(l);if(h<a.near||h>a.far)return;n.push({distance:h,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:s})}}var Jo=class extends Dt{constructor(t=[],e=301,i,r,a,n,s,o,l,h){super(t,e,i,r,a,n,s,o,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},tm=class extends Dt{constructor(t,e,i,r,a,n,s,o,l){super(t,e,i,r,a,n,s,o,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},Dr=class extends Dt{constructor(t,e,i=Ui,r,a,n,s=Rt,o=Rt,l,h=Ir,u=1){if(h!==1026&&h!==1027)throw Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super({width:t,height:e,depth:u},r,a,n,s,o,h,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Un(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Lu=class extends Dr{constructor(t,e=Ui,i=301,r,a,n=Rt,s=Rt,o,l=Ir){let h={width:t,height:t,depth:1},u=[h,h,h,h,h,h];super(t,t,e,i,r,a,n,s,o,l),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Zo=class extends Dt{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Bn=class Ko extends St{constructor(e=1,i=1,r=1,a=1,n=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:i,depth:r,widthSegments:a,heightSegments:n,depthSegments:s};let o=this;a=Math.floor(a),n=Math.floor(n),s=Math.floor(s);let l=[],h=[],u=[],d=[],c=0,p=0;g("z","y","x",-1,-1,r,i,e,s,n,0),g("z","y","x",1,-1,r,i,-e,s,n,1),g("x","z","y",1,1,e,r,i,a,s,2),g("x","z","y",1,-1,e,r,-i,a,s,3),g("x","y","z",1,-1,e,i,r,a,n,4),g("x","y","z",-1,-1,e,i,-r,a,n,5),this.setIndex(l),this.setAttribute("position",new tt(h,3)),this.setAttribute("normal",new tt(u,3)),this.setAttribute("uv",new tt(d,2));function g(M,m,f,T,w,_,E,A,R,v,S){let B=_/R,P=E/v,O=_/2,X=E/2,N=A/2,V=R+1,J=v+1,G=0,oe=0,j=new I;for(let Y=0;Y<J;Y++){let Q=Y*P-X;for(let ze=0;ze<V;ze++)j[M]=(ze*B-O)*T,j[m]=Q*w,j[f]=N,h.push(j.x,j.y,j.z),j[M]=0,j[m]=0,j[f]=A>0?1:-1,u.push(j.x,j.y,j.z),d.push(ze/R),d.push(1-Y/v),G+=1}for(let Y=0;Y<v;Y++)for(let Q=0;Q<R;Q++){let ze=c+Q+V*Y,Ae=c+Q+V*(Y+1),nt=c+(Q+1)+V*(Y+1),Ve=c+(Q+1)+V*Y;l.push(ze,Ae,Ve),l.push(Ae,nt,Ve),oe+=6}o.addGroup(p,oe,S),p+=oe,c+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ko(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},im=class $o extends St{constructor(e=1,i=32,r=0,a=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:i,thetaStart:r,thetaLength:a},i=Math.max(3,i);let n=[],s=[],o=[],l=[],h=new I,u=new he;s.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,c=3;d<=i;d++,c+=3){let p=r+d/i*a;h.x=e*Math.cos(p),h.y=e*Math.sin(p),s.push(h.x,h.y,h.z),o.push(0,0,1),u.x=(s[c]/e+1)/2,u.y=(s[c+1]/e+1)/2,l.push(u.x,u.y)}for(let d=1;d<=i;d++)n.push(d,d+1,0);this.setIndex(n),this.setAttribute("position",new tt(s,3)),this.setAttribute("normal",new tt(o,3)),this.setAttribute("uv",new tt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $o(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Nu=class Qo extends St{constructor(e=1,i=1,r=1,a=32,n=1,s=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:i,height:r,radialSegments:a,heightSegments:n,openEnded:s,thetaStart:o,thetaLength:l};let h=this;a=Math.floor(a),n=Math.floor(n);let u=[],d=[],c=[],p=[],g=0,M=[],m=r/2,f=0;T(),s===!1&&(e>0&&w(!0),i>0&&w(!1)),this.setIndex(u),this.setAttribute("position",new tt(d,3)),this.setAttribute("normal",new tt(c,3)),this.setAttribute("uv",new tt(p,2));function T(){let _=new I,E=new I,A=0,R=(i-e)/r;for(let v=0;v<=n;v++){let S=[],B=v/n,P=B*(i-e)+e;for(let O=0;O<=a;O++){let X=O/a,N=X*l+o,V=Math.sin(N),J=Math.cos(N);E.x=P*V,E.y=-B*r+m,E.z=P*J,d.push(E.x,E.y,E.z),_.set(V,R,J).normalize(),c.push(_.x,_.y,_.z),p.push(X,1-B),S.push(g++)}M.push(S)}for(let v=0;v<a;v++)for(let S=0;S<n;S++){let B=M[S][v],P=M[S+1][v],O=M[S+1][v+1],X=M[S][v+1];(e>0||S!==0)&&(u.push(B,P,X),A+=3),(i>0||S!==n-1)&&(u.push(P,O,X),A+=3)}h.addGroup(f,A,0),f+=A}function w(_){let E=g,A=new he,R=new I,v=0,S=_===!0?e:i,B=_===!0?1:-1;for(let O=1;O<=a;O++)d.push(0,m*B,0),c.push(0,B,0),p.push(.5,.5),g++;let P=g;for(let O=0;O<=a;O++){let X=O/a*l+o,N=Math.cos(X),V=Math.sin(X);R.x=S*V,R.y=m*B,R.z=S*N,d.push(R.x,R.y,R.z),c.push(0,B,0),A.x=N*.5+.5,A.y=V*.5*B+.5,p.push(A.x,A.y),g++}for(let O=0;O<a;O++){let X=E+O,N=P+O;_===!0?u.push(N,N+1,X):u.push(N+1,N,X),v+=3}h.addGroup(f,v,_===!0?1:2),f+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qo(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},rm=class el extends Nu{constructor(e=1,i=1,r=32,a=1,n=!1,s=0,o=Math.PI*2){super(0,e,i,r,a,n,s,o),this.type="ConeGeometry",this.parameters={radius:e,height:i,radialSegments:r,heightSegments:a,openEnded:n,thetaStart:s,thetaLength:o}}static fromJSON(e){return new el(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Iu=class tl extends St{constructor(e=[],i=[],r=1,a=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:i,radius:r,detail:a};let n=[],s=[];o(a),h(r),u(),this.setAttribute("position",new tt(n,3)),this.setAttribute("normal",new tt(n.slice(),3)),this.setAttribute("uv",new tt(s,2)),a===0?this.computeVertexNormals():this.normalizeNormals();function o(T){let w=new I,_=new I,E=new I;for(let A=0;A<i.length;A+=3)p(i[A+0],w),p(i[A+1],_),p(i[A+2],E),l(w,_,E,T)}function l(T,w,_,E){let A=E+1,R=[];for(let v=0;v<=A;v++){R[v]=[];let S=T.clone().lerp(_,v/A),B=w.clone().lerp(_,v/A),P=A-v;for(let O=0;O<=P;O++)O===0&&v===A?R[v][O]=S:R[v][O]=S.clone().lerp(B,O/P)}for(let v=0;v<A;v++)for(let S=0;S<2*(A-v)-1;S++){let B=Math.floor(S/2);S%2==0?(c(R[v][B+1]),c(R[v+1][B]),c(R[v][B])):(c(R[v][B+1]),c(R[v+1][B+1]),c(R[v+1][B]))}}function h(T){let w=new I;for(let _=0;_<n.length;_+=3)w.x=n[_+0],w.y=n[_+1],w.z=n[_+2],w.normalize().multiplyScalar(T),n[_+0]=w.x,n[_+1]=w.y,n[_+2]=w.z}function u(){let T=new I;for(let w=0;w<n.length;w+=3){T.x=n[w+0],T.y=n[w+1],T.z=n[w+2];let _=m(T)/2/Math.PI+.5,E=f(T)/Math.PI+.5;s.push(_,1-E)}g(),d()}function d(){for(let T=0;T<s.length;T+=6){let w=s[T+0],_=s[T+2],E=s[T+4];Math.max(w,_,E)>.9&&Math.min(w,_,E)<.1&&(w<.2&&(s[T+0]+=1),_<.2&&(s[T+2]+=1),E<.2&&(s[T+4]+=1))}}function c(T){n.push(T.x,T.y,T.z)}function p(T,w){let _=T*3;w.x=e[_+0],w.y=e[_+1],w.z=e[_+2]}function g(){let T=new I,w=new I,_=new I,E=new I,A=new he,R=new he,v=new he;for(let S=0,B=0;S<n.length;S+=9,B+=6){T.set(n[S+0],n[S+1],n[S+2]),w.set(n[S+3],n[S+4],n[S+5]),_.set(n[S+6],n[S+7],n[S+8]),A.set(s[B+0],s[B+1]),R.set(s[B+2],s[B+3]),v.set(s[B+4],s[B+5]),E.copy(T).add(w).add(_).divideScalar(3);let P=m(E);M(A,B+0,T,P),M(R,B+2,w,P),M(v,B+4,_,P)}}function M(T,w,_,E){E<0&&T.x===1&&(s[w]=T.x-1),_.x===0&&_.z===0&&(s[w]=E/2/Math.PI+.5)}function m(T){return Math.atan2(T.z,-T.x)}function f(T){return Math.atan2(-T.y,Math.sqrt(T.x*T.x+T.z*T.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new tl(e.vertices,e.indices,e.radius,e.detail)}},ei=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){we("Curve: .getPoint() not implemented.")}getPointAt(t,e){let i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],i,r=this.getPoint(0),a=0;e.push(0);for(let n=1;n<=t;n++)i=this.getPoint(n/t),a+=i.distanceTo(r),e.push(a),r=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let i=this.getLengths(),r=0,a=i.length,n;n=e||t*i[a-1];let s=0,o=a-1,l;for(;s<=o;)if(r=Math.floor(s+(o-s)/2),l=i[r]-n,l<0)s=r+1;else if(l>0)o=r-1;else{o=r;break}if(r=o,i[r]===n)return r/(a-1);let h=i[r],u=i[r+1]-h,d=(n-h)/u;return(r+d)/(a-1)}getTangent(t,e){let i=1e-4,r=t-i,a=t+i;r<0&&(r=0),a>1&&(a=1);let n=this.getPoint(r),s=this.getPoint(a),o=e||(n.isVector2?new he:new I);return o.copy(s).sub(n).normalize(),o}getTangentAt(t,e){let i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){let i=new I,r=[],a=[],n=[],s=new I,o=new Je;for(let c=0;c<=t;c++){let p=c/t;r[c]=this.getTangentAt(p,new I)}a[0]=new I,n[0]=new I;let l=Number.MAX_VALUE,h=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);h<=l&&(l=h,i.set(1,0,0)),u<=l&&(l=u,i.set(0,1,0)),d<=l&&i.set(0,0,1),s.crossVectors(r[0],i).normalize(),a[0].crossVectors(r[0],s),n[0].crossVectors(r[0],a[0]);for(let c=1;c<=t;c++){if(a[c]=a[c-1].clone(),n[c]=n[c-1].clone(),s.crossVectors(r[c-1],r[c]),s.length()>2**-52){s.normalize();let p=Math.acos(Xe(r[c-1].dot(r[c]),-1,1));a[c].applyMatrix4(o.makeRotationAxis(s,p))}n[c].crossVectors(r[c],a[c])}if(e===!0){let c=Math.acos(Xe(a[0].dot(a[t]),-1,1));c/=t,r[0].dot(s.crossVectors(a[0],a[t]))>0&&(c=-c);for(let p=1;p<=t;p++)a[p].applyMatrix4(o.makeRotationAxis(r[p],c*p)),n[p].crossVectors(r[p],a[p])}return{tangents:r,normals:a,binormals:n}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},zn=class extends ei{constructor(t=0,e=0,i=1,r=1,a=0,n=Math.PI*2,s=!1,o=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=r,this.aStartAngle=a,this.aEndAngle=n,this.aClockwise=s,this.aRotation=o}getPoint(t,e=new he){let i=e,r=Math.PI*2,a=this.aEndAngle-this.aStartAngle,n=Math.abs(a)<2**-52;for(;a<0;)a+=r;for(;a>r;)a-=r;a<2**-52&&(a=n?0:r),this.aClockwise===!0&&!n&&(a===r?a=-r:a-=r);let s=this.aStartAngle+t*a,o=this.aX+this.xRadius*Math.cos(s),l=this.aY+this.yRadius*Math.sin(s);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=o-this.aX,c=l-this.aY;o=d*h-c*u+this.aX,l=d*u+c*h+this.aY}return i.set(o,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Uu=class extends zn{constructor(t,e,i,r,a,n){super(t,e,i,i,r,a,n),this.isArcCurve=!0,this.type="ArcCurve"}};function Vn(){let t=0,e=0,i=0,r=0;function a(n,s,o,l){t=n,e=o,i=-3*n+3*s-2*o-l,r=2*n-2*s+o+l}return{initCatmullRom:function(n,s,o,l,h){a(s,o,h*(o-n),h*(l-s))},initNonuniformCatmullRom:function(n,s,o,l,h,u,d){let c=(s-n)/h-(o-n)/(h+u)+(o-s)/u,p=(o-s)/u-(l-s)/(u+d)+(l-o)/d;c*=u,p*=u,a(s,o,c,p)},calc:function(n){let s=n*n,o=s*n;return t+e*n+i*s+r*o}}}var Ds=new I,Os=new I,ln=new Vn,hn=new Vn,un=new Vn,Du=class extends ei{constructor(t=[],e=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=r}getPoint(t,e=new I){let i=e,r=this.points,a=r.length,n=(a-+!this.closed)*t,s=Math.floor(n),o=n-s;this.closed?s+=s>0?0:(Math.floor(Math.abs(s)/a)+1)*a:o===0&&s===a-1&&(s=a-2,o=1);let l,h;this.closed||s>0?l=r[(s-1)%a]:(Os.subVectors(r[0],r[1]).add(r[0]),l=Os);let u=r[s%a],d=r[(s+1)%a];if(this.closed||s+2<a?h=r[(s+2)%a]:(Ds.subVectors(r[a-1],r[a-2]).add(r[a-1]),h=Ds),this.curveType==="centripetal"||this.curveType==="chordal"){let c=this.curveType==="chordal"?.5:.25,p=l.distanceToSquared(u)**+c,g=u.distanceToSquared(d)**+c,M=d.distanceToSquared(h)**+c;g<1e-4&&(g=1),p<1e-4&&(p=g),M<1e-4&&(M=g),ln.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,p,g,M),hn.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,p,g,M),un.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,p,g,M)}else this.curveType==="catmullrom"&&(ln.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),hn.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),un.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return i.set(ln.calc(o),hn.calc(o),un.calc(o)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let r=t.points[e];this.points.push(r.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let r=this.points[e];t.points.push(r.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let r=t.points[e];this.points.push(new I().fromArray(r))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Fs(t,e,i,r,a){let n=(r-e)*.5,s=(a-i)*.5,o=t*t,l=t*o;return(2*i-2*r+n+s)*l+(-3*i+3*r-2*n-s)*o+n*t+i}function Ou(t,e){let i=1-t;return i*i*e}function Fu(t,e){return 2*(1-t)*t*e}function Bu(t,e){return t*t*e}function Lr(t,e,i,r){return Ou(t,e)+Fu(t,i)+Bu(t,r)}function zu(t,e){let i=1-t;return i*i*i*e}function Vu(t,e){let i=1-t;return 3*i*i*t*e}function Hu(t,e){return 3*(1-t)*t*t*e}function Gu(t,e){return t*t*t*e}function Nr(t,e,i,r,a){return zu(t,e)+Vu(t,i)+Hu(t,r)+Gu(t,a)}var il=class extends ei{constructor(t=new he,e=new he,i=new he,r=new he){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=r}getPoint(t,e=new he){let i=e,r=this.v0,a=this.v1,n=this.v2,s=this.v3;return i.set(Nr(t,r.x,a.x,n.x,s.x),Nr(t,r.y,a.y,n.y,s.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},ku=class extends ei{constructor(t=new I,e=new I,i=new I,r=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=r}getPoint(t,e=new I){let i=e,r=this.v0,a=this.v1,n=this.v2,s=this.v3;return i.set(Nr(t,r.x,a.x,n.x,s.x),Nr(t,r.y,a.y,n.y,s.y),Nr(t,r.z,a.z,n.z,s.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},rl=class extends ei{constructor(t=new he,e=new he){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new he){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new he){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Wu=class extends ei{constructor(t=new I,e=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new I){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new I){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},al=class extends ei{constructor(t=new he,e=new he,i=new he){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new he){let i=e,r=this.v0,a=this.v1,n=this.v2;return i.set(Lr(t,r.x,a.x,n.x),Lr(t,r.y,a.y,n.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Xu=class extends ei{constructor(t=new I,e=new I,i=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new I){let i=e,r=this.v0,a=this.v1,n=this.v2;return i.set(Lr(t,r.x,a.x,n.x),Lr(t,r.y,a.y,n.y),Lr(t,r.z,a.z,n.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},nl=class extends ei{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new he){let i=e,r=this.points,a=(r.length-1)*t,n=Math.floor(a),s=a-n,o=r[n===0?n:n-1],l=r[n],h=r[n>r.length-2?r.length-1:n+1],u=r[n>r.length-3?r.length-1:n+2];return i.set(Fs(s,o.x,l.x,h.x,u.x),Fs(s,o.y,l.y,h.y,u.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let r=t.points[e];this.points.push(r.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let r=this.points[e];t.points.push(r.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let r=t.points[e];this.points.push(new he().fromArray(r))}return this}},En=Object.freeze({__proto__:null,ArcCurve:Uu,CatmullRomCurve3:Du,CubicBezierCurve:il,CubicBezierCurve3:ku,EllipseCurve:zn,LineCurve:rl,LineCurve3:Wu,QuadraticBezierCurve:al,QuadraticBezierCurve3:Xu,SplineCurve:nl}),ju=class extends ei{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new En[i](e,t))}return this}getPoint(t,e){let i=t*this.getLength(),r=this.getCurveLengths(),a=0;for(;a<r.length;){if(r[a]>=i){let n=r[a]-i,s=this.curves[a],o=s.getLength(),l=o===0?0:1-n/o;return s.getPointAt(l,e)}a++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let i=0,r=this.curves.length;i<r;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],i;for(let r=0,a=this.curves;r<a.length;r++){let n=a[r],s=n.isEllipseCurve?t*2:n.isLineCurve||n.isLineCurve3?1:n.isSplineCurve?t*n.points.length:t,o=n.getPoints(s);for(let l=0;l<o.length;l++){let h=o[l];i&&i.equals(h)||(e.push(h),i=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let r=t.curves[e];this.curves.push(r.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){let r=this.curves[e];t.curves.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let r=t.curves[e];this.curves.push(new En[r.type]().fromJSON(r))}return this}},Bs=class extends ju{constructor(t){super(),this.type="Path",this.currentPoint=new he,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let i=new rl(this.currentPoint.clone(),new he(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,r){let a=new al(this.currentPoint.clone(),new he(t,e),new he(i,r));return this.curves.push(a),this.currentPoint.set(i,r),this}bezierCurveTo(t,e,i,r,a,n){let s=new il(this.currentPoint.clone(),new he(t,e),new he(i,r),new he(a,n));return this.curves.push(s),this.currentPoint.set(a,n),this}splineThru(t){let e=new nl([this.currentPoint.clone()].concat(t));return this.curves.push(e),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,r,a,n){let s=this.currentPoint.x,o=this.currentPoint.y;return this.absarc(t+s,e+o,i,r,a,n),this}absarc(t,e,i,r,a,n){return this.absellipse(t,e,i,i,r,a,n),this}ellipse(t,e,i,r,a,n,s,o){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,i,r,a,n,s,o),this}absellipse(t,e,i,r,a,n,s,o){let l=new zn(t,e,i,r,a,n,s,o);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},sl=class extends Bs{constructor(t){super(t),this.uuid=Bt(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let i=0,r=this.holes.length;i<r;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let r=t.holes[e];this.holes.push(r.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){let r=this.holes[e];t.holes.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let r=t.holes[e];this.holes.push(new Bs().fromJSON(r))}return this}};function qu(t,e,i=2){let r=e&&e.length,a=r?e[0]*i:t.length,n=ol(t,0,a,i,!0),s=[];if(!n||n.next===n.prev)return s;let o,l,h;if(r&&(n=$u(t,e,n,i)),t.length>80*i){o=t[0],l=t[1];let u=o,d=l;for(let c=i;c<a;c+=i){let p=t[c],g=t[c+1];p<o&&(o=p),g<l&&(l=g),p>u&&(u=p),g>d&&(d=g)}h=Math.max(u-o,d-l),h=h===0?0:32767/h}return Or(n,s,i,o,l,h,0),s}function ol(t,e,i,r,a){let n;if(a===hc(t,e,i,r)>0)for(let s=e;s<i;s+=r)n=zs(s/r|0,t[s],t[s+1],n);else for(let s=i-r;s>=e;s-=r)n=zs(s/r|0,t[s],t[s+1],n);return n&&cr(n,n.next)&&(Br(n),n=n.next),n}function Oi(t,e){if(!t)return t;e||=t;let i=t,r;do if(r=!1,!i.steiner&&(cr(i,i.next)||dt(i.prev,i,i.next)===0)){if(Br(i),i=e=i.prev,i===i.next)break;r=!0}else i=i.next;while(r||i!==e);return e}function Or(t,e,i,r,a,n,s){if(!t)return;!s&&n&&rc(t,r,a,n);let o=t;for(;t.prev!==t.next;){let l=t.prev,h=t.next;if(n?Ju(t,r,a,n):Yu(t)){e.push(l.i,t.i,h.i),Br(t),t=h.next,o=h.next;continue}if(t=h,t===o){s?s===1?(t=Zu(Oi(t),e),Or(t,e,i,r,a,n,2)):s===2&&Ku(t,e,i,r,a,n):Or(Oi(t),e,i,r,a,n,1);break}}}function Yu(t){let e=t.prev,i=t,r=t.next;if(dt(e,i,r)>=0)return!1;let a=e.x,n=i.x,s=r.x,o=e.y,l=i.y,h=r.y,u=Math.min(a,n,s),d=Math.min(o,l,h),c=Math.max(a,n,s),p=Math.max(o,l,h),g=r.next;for(;g!==e;){if(g.x>=u&&g.x<=c&&g.y>=d&&g.y<=p&&Ar(a,o,n,l,s,h,g.x,g.y)&&dt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Ju(t,e,i,r){let a=t.prev,n=t,s=t.next;if(dt(a,n,s)>=0)return!1;let o=a.x,l=n.x,h=s.x,u=a.y,d=n.y,c=s.y,p=Math.min(o,l,h),g=Math.min(u,d,c),M=Math.max(o,l,h),m=Math.max(u,d,c),f=wn(p,g,e,i,r),T=wn(M,m,e,i,r),w=t.prevZ,_=t.nextZ;for(;w&&w.z>=f&&_&&_.z<=T;){if(w.x>=p&&w.x<=M&&w.y>=g&&w.y<=m&&w!==a&&w!==s&&Ar(o,u,l,d,h,c,w.x,w.y)&&dt(w.prev,w,w.next)>=0||(w=w.prevZ,_.x>=p&&_.x<=M&&_.y>=g&&_.y<=m&&_!==a&&_!==s&&Ar(o,u,l,d,h,c,_.x,_.y)&&dt(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;w&&w.z>=f;){if(w.x>=p&&w.x<=M&&w.y>=g&&w.y<=m&&w!==a&&w!==s&&Ar(o,u,l,d,h,c,w.x,w.y)&&dt(w.prev,w,w.next)>=0)return!1;w=w.prevZ}for(;_&&_.z<=T;){if(_.x>=p&&_.x<=M&&_.y>=g&&_.y<=m&&_!==a&&_!==s&&Ar(o,u,l,d,h,c,_.x,_.y)&&dt(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function Zu(t,e){let i=t;do{let r=i.prev,a=i.next.next;!cr(r,a)&&hl(r,i,i.next,a)&&Fr(r,a)&&Fr(a,r)&&(e.push(r.i,i.i,a.i),Br(i),Br(i.next),i=t=a),i=i.next}while(i!==t);return Oi(i)}function Ku(t,e,i,r,a,n){let s=t;do{let o=s.next.next;for(;o!==s.prev;){if(s.i!==o.i&&sc(s,o)){let l=ul(s,o);s=Oi(s,s.next),l=Oi(l,l.next),Or(s,e,i,r,a,n,0),Or(l,e,i,r,a,n,0);return}o=o.next}s=s.next}while(s!==t)}function $u(t,e,i,r){let a=[];for(let n=0,s=e.length;n<s;n++){let o=ol(t,e[n]*r,n<s-1?e[n+1]*r:t.length,r,!1);o===o.next&&(o.steiner=!0),a.push(nc(o))}a.sort(Qu);for(let n=0;n<a.length;n++)i=ec(a[n],i);return i}function Qu(t,e){let i=t.x-e.x;return i===0&&(i=t.y-e.y,i===0&&(i=(t.next.y-t.y)/(t.next.x-t.x)-(e.next.y-e.y)/(e.next.x-e.x))),i}function ec(t,e){let i=tc(t,e);if(!i)return e;let r=ul(i,t);return Oi(r,r.next),Oi(i,i.next)}function tc(t,e){let i=e,r=t.x,a=t.y,n=-1/0,s;if(cr(t,i))return i;do{if(cr(t,i.next))return i.next;if(a<=i.y&&a>=i.next.y&&i.next.y!==i.y){let d=i.x+(a-i.y)*(i.next.x-i.x)/(i.next.y-i.y);if(d<=r&&d>n&&(n=d,s=i.x<i.next.x?i:i.next,d===r))return s}i=i.next}while(i!==e);if(!s)return null;let o=s,l=s.x,h=s.y,u=1/0;i=s;do{if(r>=i.x&&i.x>=l&&r!==i.x&&ll(a<h?r:n,a,l,h,a<h?n:r,a,i.x,i.y)){let d=Math.abs(a-i.y)/(r-i.x);Fr(i,t)&&(d<u||d===u&&(i.x>s.x||i.x===s.x&&ic(s,i)))&&(s=i,u=d)}i=i.next}while(i!==o);return s}function ic(t,e){return dt(t.prev,t,e.prev)<0&&dt(e.next,t,t.next)<0}function rc(t,e,i,r){let a=t;do a.z===0&&(a.z=wn(a.x,a.y,e,i,r)),a.prevZ=a.prev,a.nextZ=a.next,a=a.next;while(a!==t);a.prevZ.nextZ=null,a.prevZ=null,ac(a)}function ac(t){let e,i=1;do{let r=t,a;t=null;let n=null;for(e=0;r;){e++;let s=r,o=0;for(let h=0;h<i&&(o++,s=s.nextZ,s);h++);let l=i;for(;o>0||l>0&&s;)o!==0&&(l===0||!s||r.z<=s.z)?(a=r,r=r.nextZ,o--):(a=s,s=s.nextZ,l--),n?n.nextZ=a:t=a,a.prevZ=n,n=a;r=s}n.nextZ=null,i*=2}while(e>1);return t}function wn(t,e,i,r,a){return t=(t-i)*a|0,e=(e-r)*a|0,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t|e<<1}function nc(t){let e=t,i=t;do(e.x<i.x||e.x===i.x&&e.y<i.y)&&(i=e),e=e.next;while(e!==t);return i}function ll(t,e,i,r,a,n,s,o){return(a-s)*(e-o)>=(t-s)*(n-o)&&(t-s)*(r-o)>=(i-s)*(e-o)&&(i-s)*(n-o)>=(a-s)*(r-o)}function Ar(t,e,i,r,a,n,s,o){return(t!==s||e!==o)&&ll(t,e,i,r,a,n,s,o)}function sc(t,e){return t.next.i!==e.i&&t.prev.i!==e.i&&!oc(t,e)&&(Fr(t,e)&&Fr(e,t)&&lc(t,e)&&(dt(t.prev,t,e.prev)||dt(t,e.prev,e))||cr(t,e)&&dt(t.prev,t,t.next)>0&&dt(e.prev,e,e.next)>0)}function dt(t,e,i){return(e.y-t.y)*(i.x-e.x)-(e.x-t.x)*(i.y-e.y)}function cr(t,e){return t.x===e.x&&t.y===e.y}function hl(t,e,i,r){let a=ma(dt(t,e,i)),n=ma(dt(t,e,r)),s=ma(dt(i,r,t)),o=ma(dt(i,r,e));return!!(a!==n&&s!==o||a===0&&fa(t,i,e)||n===0&&fa(t,r,e)||s===0&&fa(i,t,r)||o===0&&fa(i,e,r))}function fa(t,e,i){return e.x<=Math.max(t.x,i.x)&&e.x>=Math.min(t.x,i.x)&&e.y<=Math.max(t.y,i.y)&&e.y>=Math.min(t.y,i.y)}function ma(t){return t>0?1:t<0?-1:0}function oc(t,e){let i=t;do{if(i.i!==t.i&&i.next.i!==t.i&&i.i!==e.i&&i.next.i!==e.i&&hl(i,i.next,t,e))return!0;i=i.next}while(i!==t);return!1}function Fr(t,e){return dt(t.prev,t,t.next)<0?dt(t,e,t.next)>=0&&dt(t,t.prev,e)>=0:dt(t,e,t.prev)<0||dt(t,t.next,e)<0}function lc(t,e){let i=t,r=!1,a=(t.x+e.x)/2,n=(t.y+e.y)/2;do i.y>n!=i.next.y>n&&i.next.y!==i.y&&a<(i.next.x-i.x)*(n-i.y)/(i.next.y-i.y)+i.x&&(r=!r),i=i.next;while(i!==t);return r}function ul(t,e){let i=An(t.i,t.x,t.y),r=An(e.i,e.x,e.y),a=t.next,n=e.prev;return t.next=e,e.prev=t,i.next=a,a.prev=i,r.next=i,i.prev=r,n.next=r,r.prev=n,r}function zs(t,e,i,r){let a=An(t,e,i);return r?(a.next=r.next,a.prev=r,r.next.prev=a,r.next=a):(a.prev=a,a.next=a),a}function Br(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ)}function An(t,e,i){return{i:t,x:e,y:i,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function hc(t,e,i,r){let a=0;for(let n=e,s=i-r;n<i;n+=r)a+=(t[s]-t[n])*(t[n+1]+t[s+1]),s=n;return a}var uc=class{static triangulate(t,e,i=2){return qu(t,e,i)}},Ii=class cl{static area(e){let i=e.length,r=0;for(let a=i-1,n=0;n<i;a=n++)r+=e[a].x*e[n].y-e[n].x*e[a].y;return r*.5}static isClockWise(e){return cl.area(e)<0}static triangulateShape(e,i){let r=[],a=[],n=[];Vs(e),Hs(r,e);let s=e.length;i.forEach(Vs);for(let l=0;l<i.length;l++)a.push(s),s+=i[l].length,Hs(r,i[l]);let o=uc.triangulate(r,a);for(let l=0;l<o.length;l+=3)n.push(o.slice(l,l+3));return n}};function Vs(t){let e=t.length;e>2&&t[e-1].equals(t[0])&&t.pop()}function Hs(t,e){for(let i=0;i<e.length;i++)t.push(e[i].x),t.push(e[i].y)}var am=class dl extends St{constructor(e=new sl([new he(.5,.5),new he(-.5,.5),new he(-.5,-.5),new he(.5,-.5)]),i={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:i},e=Array.isArray(e)?e:[e];let r=this,a=[],n=[];for(let o=0,l=e.length;o<l;o++){let h=e[o];s(h)}this.setAttribute("position",new tt(a,3)),this.setAttribute("uv",new tt(n,2)),this.computeVertexNormals();function s(o){let l=[],h=i.curveSegments===void 0?12:i.curveSegments,u=i.steps===void 0?1:i.steps,d=i.depth===void 0?1:i.depth,c=i.bevelEnabled===void 0||i.bevelEnabled,p=i.bevelThickness===void 0?.2:i.bevelThickness,g=i.bevelSize===void 0?p-.1:i.bevelSize,M=i.bevelOffset===void 0?0:i.bevelOffset,m=i.bevelSegments===void 0?3:i.bevelSegments,f=i.extrudePath,T=i.UVGenerator===void 0?cc:i.UVGenerator,w,_=!1,E,A,R,v;if(f){w=f.getSpacedPoints(u),_=!0,c=!1;let ee=f.isCatmullRomCurve3?f.closed:!1;E=f.computeFrenetFrames(u,ee),A=new I,R=new I,v=new I}c||(m=0,p=0,g=0,M=0);let S=o.extractPoints(h),B=S.shape,P=S.holes;if(!Ii.isClockWise(B)){B=B.reverse();for(let ee=0,Z=P.length;ee<Z;ee++){let se=P[ee];Ii.isClockWise(se)&&(P[ee]=se.reverse())}}function O(ee){let Z=ee[0];for(let se=1;se<=ee.length;se++){let ye=se%ee.length,ve=ee[ye],Re=ve.x-Z.x,Ie=ve.y-Z.y,He=Re*Re+Ie*Ie,Ge=Math.max(Math.abs(ve.x),Math.abs(ve.y),Math.abs(Z.x),Math.abs(Z.y));if(He<=10000000000000001e-36*Ge*Ge){ee.splice(ye,1),se--;continue}Z=ve}}O(B),P.forEach(O);let X=P.length,N=B;for(let ee=0;ee<X;ee++){let Z=P[ee];B=B.concat(Z)}function V(ee,Z,se){return Z||Fe("ExtrudeGeometry: vec does not exist"),ee.clone().addScaledVector(Z,se)}let J=B.length;function G(ee,Z,se){let ye,ve,Re,Ie=ee.x-Z.x,He=ee.y-Z.y,Ge=se.x-ee.x,C=se.y-ee.y,ct=Ie*Ie+He*He,$e=Ie*C-He*Ge;if(Math.abs($e)>2**-52){let Ze=Math.sqrt(ct),b=Math.sqrt(Ge*Ge+C*C),x=Z.x-He/Ze,L=Z.y+Ie/Ze,k=se.x-C/b,$=se.y+Ge/b,ce=((k-x)*C-($-L)*Ge)/(Ie*C-He*Ge);ye=x+Ie*ce-ee.x,ve=L+He*ce-ee.y;let pe=ye*ye+ve*ve;if(pe<=2)return new he(ye,ve);Re=Math.sqrt(pe/2)}else{let Ze=!1;Ie>2**-52?Ge>2**-52&&(Ze=!0):Ie<-2220446049250313e-31?Ge<-2220446049250313e-31&&(Ze=!0):Math.sign(He)===Math.sign(C)&&(Ze=!0),Ze?(ye=-He,ve=Ie,Re=Math.sqrt(ct)):(ye=Ie,ve=He,Re=Math.sqrt(ct/2))}return new he(ye/Re,ve/Re)}let oe=[];for(let ee=0,Z=N.length,se=Z-1,ye=ee+1;ee<Z;ee++,se++,ye++)se===Z&&(se=0),ye===Z&&(ye=0),oe[ee]=G(N[ee],N[se],N[ye]);let j=[],Y,Q=oe.concat();for(let ee=0,Z=X;ee<Z;ee++){let se=P[ee];Y=[];for(let ye=0,ve=se.length,Re=ve-1,Ie=ye+1;ye<ve;ye++,Re++,Ie++)Re===ve&&(Re=0),Ie===ve&&(Ie=0),Y[ye]=G(se[ye],se[Re],se[Ie]);j.push(Y),Q=Q.concat(Y)}let ze;if(m===0)ze=Ii.triangulateShape(N,P);else{let ee=[],Z=[];for(let se=0;se<m;se++){let ye=se/m,ve=p*Math.cos(ye*Math.PI/2),Re=g*Math.sin(ye*Math.PI/2)+M;for(let Ie=0,He=N.length;Ie<He;Ie++){let Ge=V(N[Ie],oe[Ie],Re);ne(Ge.x,Ge.y,-ve),ye===0&&ee.push(Ge)}for(let Ie=0,He=X;Ie<He;Ie++){let Ge=P[Ie];Y=j[Ie];let C=[];for(let ct=0,$e=Ge.length;ct<$e;ct++){let Ze=V(Ge[ct],Y[ct],Re);ne(Ze.x,Ze.y,-ve),ye===0&&C.push(Ze)}ye===0&&Z.push(C)}}ze=Ii.triangulateShape(ee,Z)}let Ae=ze.length,nt=g+M;for(let ee=0;ee<J;ee++){let Z=c?V(B[ee],Q[ee],nt):B[ee];_?(R.copy(E.normals[0]).multiplyScalar(Z.x),A.copy(E.binormals[0]).multiplyScalar(Z.y),v.copy(w[0]).add(R).add(A),ne(v.x,v.y,v.z)):ne(Z.x,Z.y,0)}for(let ee=1;ee<=u;ee++)for(let Z=0;Z<J;Z++){let se=c?V(B[Z],Q[Z],nt):B[Z];_?(R.copy(E.normals[ee]).multiplyScalar(se.x),A.copy(E.binormals[ee]).multiplyScalar(se.y),v.copy(w[ee]).add(R).add(A),ne(v.x,v.y,v.z)):ne(se.x,se.y,d/u*ee)}for(let ee=m-1;ee>=0;ee--){let Z=ee/m,se=p*Math.cos(Z*Math.PI/2),ye=g*Math.sin(Z*Math.PI/2)+M;for(let ve=0,Re=N.length;ve<Re;ve++){let Ie=V(N[ve],oe[ve],ye);ne(Ie.x,Ie.y,d+se)}for(let ve=0,Re=P.length;ve<Re;ve++){let Ie=P[ve];Y=j[ve];for(let He=0,Ge=Ie.length;He<Ge;He++){let C=V(Ie[He],Y[He],ye);_?ne(C.x,C.y+w[u-1].y,w[u-1].x+se):ne(C.x,C.y,d+se)}}}Ve(),q();function Ve(){let ee=a.length/3;if(c){let Z=0,se=J*Z;for(let ye=0;ye<Ae;ye++){let ve=ze[ye];Ce(ve[2]+se,ve[1]+se,ve[0]+se)}Z=u+m*2,se=J*Z;for(let ye=0;ye<Ae;ye++){let ve=ze[ye];Ce(ve[0]+se,ve[1]+se,ve[2]+se)}}else{for(let Z=0;Z<Ae;Z++){let se=ze[Z];Ce(se[2],se[1],se[0])}for(let Z=0;Z<Ae;Z++){let se=ze[Z];Ce(se[0]+J*u,se[1]+J*u,se[2]+J*u)}}r.addGroup(ee,a.length/3-ee,0)}function q(){let ee=a.length/3,Z=0;ie(N,Z),Z+=N.length;for(let se=0,ye=P.length;se<ye;se++){let ve=P[se];ie(ve,Z),Z+=ve.length}r.addGroup(ee,a.length/3-ee,1)}function ie(ee,Z){let se=ee.length;for(;--se>=0;){let ye=se,ve=se-1;ve<0&&(ve=ee.length-1);for(let Re=0,Ie=u+m*2;Re<Ie;Re++){let He=J*Re,Ge=J*(Re+1);Ue(Z+ye+He,Z+ve+He,Z+ve+Ge,Z+ye+Ge)}}}function ne(ee,Z,se){l.push(ee),l.push(Z),l.push(se)}function Ce(ee,Z,se){de(ee),de(Z),de(se);let ye=a.length/3,ve=T.generateTopUV(r,a,ye-3,ye-2,ye-1);qe(ve[0]),qe(ve[1]),qe(ve[2])}function Ue(ee,Z,se,ye){de(ee),de(Z),de(ye),de(Z),de(se),de(ye);let ve=a.length/3,Re=T.generateSideWallUV(r,a,ve-6,ve-3,ve-2,ve-1);qe(Re[0]),qe(Re[1]),qe(Re[3]),qe(Re[1]),qe(Re[2]),qe(Re[3])}function de(ee){a.push(l[ee*3+0]),a.push(l[ee*3+1]),a.push(l[ee*3+2])}function qe(ee){n.push(ee.x),n.push(ee.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),i=this.parameters.shapes,r=this.parameters.options;return dc(i,r,e)}static fromJSON(e,i){let r=[];for(let n=0,s=e.shapes.length;n<s;n++){let o=i[e.shapes[n]];r.push(o)}let a=e.options.extrudePath;return a!==void 0&&(e.options.extrudePath=new En[a.type]().fromJSON(a)),new dl(r,e.options)}},cc={generateTopUV:function(t,e,i,r,a){let n=e[i*3],s=e[i*3+1],o=e[r*3],l=e[r*3+1],h=e[a*3],u=e[a*3+1];return[new he(n,s),new he(o,l),new he(h,u)]},generateSideWallUV:function(t,e,i,r,a,n){let s=e[i*3],o=e[i*3+1],l=e[i*3+2],h=e[r*3],u=e[r*3+1],d=e[r*3+2],c=e[a*3],p=e[a*3+1],g=e[a*3+2],M=e[n*3],m=e[n*3+1],f=e[n*3+2];return Math.abs(o-u)<Math.abs(s-h)?[new he(s,1-l),new he(h,1-d),new he(c,1-g),new he(M,1-f)]:[new he(o,1-l),new he(u,1-d),new he(p,1-g),new he(m,1-f)]}};function dc(t,e,i){if(i.shapes=[],Array.isArray(t))for(let r=0,a=t.length;r<a;r++){let n=t[r];i.shapes.push(n.uuid)}else i.shapes.push(t.uuid);return i.options=Object.assign({},e),e.extrudePath!==void 0&&(i.options.extrudePath=e.extrudePath.toJSON()),i}var nm=class pl extends Iu{constructor(e=1,i=0){let r=(1+Math.sqrt(5))/2,a=[-1,r,0,1,r,0,-1,-r,0,1,-r,0,0,-1,r,0,1,r,0,-1,-r,0,1,-r,r,0,-1,r,0,1,-r,0,-1,-r,0,1];super(a,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,i),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:i}}static fromJSON(e){return new pl(e.radius,e.detail)}},fl=class ml extends St{constructor(e=1,i=1,r=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:i,widthSegments:r,heightSegments:a};let n=e/2,s=i/2,o=Math.floor(r),l=Math.floor(a),h=o+1,u=l+1,d=e/o,c=i/l,p=[],g=[],M=[],m=[];for(let f=0;f<u;f++){let T=f*c-s;for(let w=0;w<h;w++){let _=w*d-n;g.push(_,-T,0),M.push(0,0,1),m.push(w/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let T=0;T<o;T++){let w=T+h*f,_=T+h*(f+1),E=T+1+h*(f+1),A=T+1+h*f;p.push(w,_,A),p.push(_,E,A)}this.setIndex(p),this.setAttribute("position",new tt(g,3)),this.setAttribute("normal",new tt(M,3)),this.setAttribute("uv",new tt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ml(e.width,e.height,e.widthSegments,e.heightSegments)}},sm=class gl extends St{constructor(e=.5,i=1,r=32,a=1,n=0,s=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:i,thetaSegments:r,phiSegments:a,thetaStart:n,thetaLength:s},r=Math.max(3,r),a=Math.max(1,a);let o=[],l=[],h=[],u=[],d=e,c=(i-e)/a,p=new I,g=new he;for(let M=0;M<=a;M++){for(let m=0;m<=r;m++){let f=n+m/r*s;p.x=d*Math.cos(f),p.y=d*Math.sin(f),l.push(p.x,p.y,p.z),h.push(0,0,1),g.x=(p.x/i+1)/2,g.y=(p.y/i+1)/2,u.push(g.x,g.y)}d+=c}for(let M=0;M<a;M++){let m=M*(r+1);for(let f=0;f<r;f++){let T=f+m,w=T,_=T+r+1,E=T+r+2,A=T+1;o.push(w,_,A),o.push(_,E,A)}}this.setIndex(o),this.setAttribute("position",new tt(l,3)),this.setAttribute("normal",new tt(h,3)),this.setAttribute("uv",new tt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gl(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},om=class vl extends St{constructor(e=new sl([new he(0,.5),new he(-.5,-.5),new he(.5,-.5)]),i=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:i};let r=[],a=[],n=[],s=[],o=0,l=0;if(Array.isArray(e)===!1)h(e);else for(let u=0;u<e.length;u++)h(e[u]),this.addGroup(o,l,u),o+=l,l=0;this.setIndex(r),this.setAttribute("position",new tt(a,3)),this.setAttribute("normal",new tt(n,3)),this.setAttribute("uv",new tt(s,2));function h(u){let d=a.length/3,c=u.extractPoints(i),p=c.shape,g=c.holes;Ii.isClockWise(p)===!1&&(p=p.reverse());for(let m=0,f=g.length;m<f;m++){let T=g[m];Ii.isClockWise(T)===!0&&(g[m]=T.reverse())}let M=Ii.triangulateShape(p,g);for(let m=0,f=g.length;m<f;m++){let T=g[m];p=p.concat(T)}for(let m=0,f=p.length;m<f;m++){let T=p[m];a.push(T.x,T.y,0),n.push(0,0,1),s.push(T.x,T.y)}for(let m=0,f=M.length;m<f;m++){let T=M[m],w=T[0]+d,_=T[1]+d,E=T[2]+d;r.push(w,_,E),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),i=this.parameters.shapes;return pc(i,e)}static fromJSON(e,i){let r=[];for(let a=0,n=e.shapes.length;a<n;a++){let s=i[e.shapes[a]];r.push(s)}return new vl(r,e.curveSegments)}};function pc(t,e){if(e.shapes=[],Array.isArray(t))for(let i=0,r=t.length;i<r;i++){let a=t[i];e.shapes.push(a.uuid)}else e.shapes.push(t.uuid);return e}var lm=class _l extends St{constructor(e=1,i=32,r=16,a=0,n=Math.PI*2,s=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:i,heightSegments:r,phiStart:a,phiLength:n,thetaStart:s,thetaLength:o},i=Math.max(3,Math.floor(i)),r=Math.max(2,Math.floor(r));let l=Math.min(s+o,Math.PI),h=0,u=[],d=new I,c=new I,p=[],g=[],M=[],m=[];for(let f=0;f<=r;f++){let T=[],w=f/r,_=s+w*o,E=e*Math.cos(_),A=Math.sqrt(e*e-E*E),R=0;f===0&&s===0?R=.5/i:f===r&&l===Math.PI&&(R=-.5/i);for(let v=0;v<=i;v++){let S=v/i,B=a+S*n;d.x=-A*Math.cos(B),d.y=E,d.z=A*Math.sin(B),g.push(d.x,d.y,d.z),c.copy(d).normalize(),M.push(c.x,c.y,c.z),m.push(S+R,1-w),T.push(h++)}u.push(T)}for(let f=0;f<r;f++)for(let T=0;T<i;T++){let w=u[f][T+1],_=u[f][T],E=u[f+1][T],A=u[f+1][T+1];(f!==0||s>0)&&p.push(w,_,A),(f!==r-1||l<Math.PI)&&p.push(_,E,A)}this.setIndex(p),this.setAttribute("position",new tt(g,3)),this.setAttribute("normal",new tt(M,3)),this.setAttribute("uv",new tt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _l(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};function dr(t){let e={};for(let i in t){e[i]={};for(let r in t[i]){let a=t[i][r];if(Gs(a))a.isRenderTargetTexture?(we("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[i][r]=null):e[i][r]=a.clone();else if(Array.isArray(a))if(Gs(a[0])){let n=[];for(let s=0,o=a.length;s<o;s++)n[s]=a[s].clone();e[i][r]=n}else e[i][r]=a.slice();else e[i][r]=a}}return e}function At(t){let e={};for(let i=0;i<t.length;i++){let r=dr(t[i]);for(let a in r)e[a]=r[a]}return e}function Gs(t){return t&&(t.isColor||t.isMatrix3||t.isMatrix4||t.isVector2||t.isVector3||t.isVector4||t.isTexture||t.isQuaternion)}function fc(t){let e=[];for(let i=0;i<t.length;i++)e.push(t[i].clone());return e}function xl(t){let e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ke.workingColorSpace}var mc={clone:dr,merge:At},gc=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,vc=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Qt=class extends pi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=gc,this.fragmentShader=vc,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=dr(t.uniforms),this.uniformsGroups=fc(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let r in this.uniforms){let a=this.uniforms[r].value;a&&a.isTexture?e.uniforms[r]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[r]={type:"m4",value:a.toArray()}:e.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let i in t.uniforms){let r=t.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=e[r.value]||null;break;case"c":this.uniforms[i].value=new ke().setHex(r.value);break;case"v2":this.uniforms[i].value=new he().fromArray(r.value);break;case"v3":this.uniforms[i].value=new I().fromArray(r.value);break;case"v4":this.uniforms[i].value=new ht().fromArray(r.value);break;case"m3":this.uniforms[i].value=new We().fromArray(r.value);break;case"m4":this.uniforms[i].value=new Je().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},_c=class extends Qt{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},xc=class extends pi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ke(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ke(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new he(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Di,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},hm=class extends xc{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new he(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Xe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ke(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ke(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ke(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(t){this._retroreflectivity>0!=t>0&&this.version++,this._retroreflectivity=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.retroreflectivity=t.retroreflectivity,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}},um=class extends pi{constructor(t){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new he(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(t)}copy(t){return super.copy(t),this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.flatShading=t.flatShading,this}},cm=class extends pi{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ke(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new he(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Di,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},yc=class extends pi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ih,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Mc=class extends pi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Si(t,e){return!t||t.constructor===e?t:typeof e.BYTES_PER_ELEMENT=="number"?new e(t):Array.prototype.slice.call(t)}function Sa(t){return t!==void 0&&t.inTangents!==void 0&&t.outTangents!==void 0}function Sc(t){function e(a,n){return t[a]-t[n]}let i=t.length,r=Array(i);for(let a=0;a!==i;++a)r[a]=a;return r.sort(e),r}function ks(t,e,i){let r=t.length,a=new t.constructor(r);for(let n=0,s=0;s!==r;++n){let o=i[n]*e;for(let l=0;l!==e;++l)a[s++]=t[o+l]}return a}function bc(t,e,i,r){let a=1,n=t[0];for(;n!==void 0&&n[r]===void 0;)n=t[a++];if(n===void 0)return;let s=n[r];if(s!==void 0)if(Array.isArray(s))do s=n[r],s!==void 0&&(e.push(n.time),i.push(...s)),n=t[a++];while(n!==void 0);else if(s.toArray!==void 0)do s=n[r],s!==void 0&&(e.push(n.time),s.toArray(i,i.length)),n=t[a++];while(n!==void 0);else do s=n[r],s!==void 0&&(e.push(n.time),i.push(s)),n=t[a++];while(n!==void 0)}var Vr=class{constructor(t,e,i,r){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=r===void 0?new e.constructor(i):r,this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,r=e[i],a=e[i-1];i:{e:{let n;t:{r:if(!(t<r)){for(let s=i+2;;){if(r===void 0){if(t<a)break r;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===s)break;if(a=r,r=e[++i],t<r)break e}n=e.length;break t}if(!(t>=a)){let s=e[1];t<s&&(i=2,a=s);for(let o=i-2;;){if(a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===o)break;if(r=a,a=e[--i-1],t>=a)break e}n=i,i=0;break t}break i}for(;i<n;){let s=i+n>>>1;t<e[s]?n=s:i=s+1}if(r=e[i],a=e[i-1],a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,a,r)}return this.interpolate_(i,a,t,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,r=this.valueSize,a=t*r;for(let n=0;n!==r;++n)e[n]=i[a+n];return e}interpolate_(){throw Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Tc=class extends Vr{constructor(t,e,i,r){super(t,e,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:is,endingEnd:is}}intervalChanged_(t,e,i){let r=this.parameterPositions,a=t-2,n=t+1,s=r[a],o=r[n];if(s===void 0)switch(this.getSettings_().endingStart){case rs:a=t,s=2*e-i;break;case as:a=r.length-2,s=e+r[a]-r[a+1];break;default:a=t,s=i}if(o===void 0)switch(this.getSettings_().endingEnd){case rs:n=t,o=2*i-e;break;case as:n=1,o=i+r[1]-r[0];break;default:n=t-1,o=e}let l=(i-e)*.5,h=this.valueSize;this._weightPrev=l/(e-s),this._weightNext=l/(o-i),this._offsetPrev=a*h,this._offsetNext=n*h}interpolate_(t,e,i,r){let a=this.resultBuffer,n=this.sampleValues,s=this.valueSize,o=t*s,l=o-s,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,c=this._weightNext,p=(i-e)/(r-e),g=p*p,M=g*p,m=-d*M+2*d*g-d*p,f=(1+d)*M+(-1.5-2*d)*g+(-.5+d)*p+1,T=(-1-c)*M+(1.5+c)*g+.5*p,w=c*M-c*g;for(let _=0;_!==s;++_)a[_]=m*n[h+_]+f*n[l+_]+T*n[o+_]+w*n[u+_];return a}},Ec=class extends Vr{constructor(t,e,i,r){super(t,e,i,r)}interpolate_(t,e,i,r){let a=this.resultBuffer,n=this.sampleValues,s=this.valueSize,o=t*s,l=o-s,h=(i-e)/(r-e),u=1-h;for(let d=0;d!==s;++d)a[d]=n[l+d]*u+n[o+d]*h;return a}},wc=class extends Vr{constructor(t,e,i,r){super(t,e,i,r)}interpolate_(t){return this.copySampleValue_(t-1)}},Ac=class extends Vr{interpolate_(t,e,i,r){let a=this.resultBuffer,n=this.sampleValues,s=this.valueSize,o=t*s,l=o-s,h=this.inTangents,u=this.outTangents;if(!h||!u){let p=(i-e)/(r-e),g=1-p;for(let M=0;M!==s;++M)a[M]=n[l+M]*g+n[o+M]*p;return a}let d=s*2,c=t-1;for(let p=0;p!==s;++p){let g=n[l+p],M=n[o+p],m=c*d+p*2,f=u[m],T=u[m+1],w=t*d+p*2,_=h[w],E=h[w+1],A=Cc(i,e,f,_,r);a[p]=yl(A,g,T,E,M)}return a}};function yl(t,e,i,r,a){let n=1-t;return n*n*n*e+3*n*n*t*i+3*n*t*t*r+t*t*t*a}function Rc(t,e,i,r,a){let n=1-t;return 3*n*n*(i-e)+6*n*t*(r-i)+3*t*t*(a-r)}function Cc(t,e,i,r,a){let n=(t-e)/(a-e);for(let s=0;s<8;s++){let o=yl(n,e,i,r,a)-t;if(Math.abs(o)<1e-10)break;let l=Rc(n,e,i,r,a);if(Math.abs(l)<1e-10)break;n=Math.max(0,Math.min(1,n-o/l))}return n}var Xt=class{constructor(t,e,i,r){if(t===void 0)throw Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Si(e,this.TimeBufferType),this.values=Si(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:Si(t.times,Array),values:Si(t.values,Array)};let r=t.getInterpolation();r!==t.DefaultInterpolation&&(i.interpolation=r),Sa(t.settings)&&(i.settings={inTangents:Si(t.settings.inTangents,Array),outTangents:Si(t.settings.outTangents,Array)})}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new wc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Ec(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Tc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Ac(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Ea:e=this.InterpolantFactoryMethodDiscrete;break;case Mn:e=this.InterpolantFactoryMethodLinear;break;case Oa:e=this.InterpolantFactoryMethodSmooth;break;case ts:e=this.InterpolantFactoryMethodBezier}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(i);return we("KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ea;case this.InterpolantFactoryMethodLinear:return Mn;case this.InterpolantFactoryMethodSmooth:return Oa;case this.InterpolantFactoryMethodBezier:return ts}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,r=e.length;i!==r;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,r=e.length;i!==r;++i)e[i]*=t;Sa(this.settings)&&(Ws(this.settings.inTangents,t),Ws(this.settings.outTangents,t))}return this}trim(t,e){let i=this.times,r=i.length,a=0,n=r-1;for(;a!==r&&i[a]<t;)++a;for(;n!==-1&&i[n]>e;)--n;if(++n,a!==0||n!==r){a>=n&&(n=Math.max(n,1),a=n-1);let s=this.getValueSize();this.times=i.slice(a,n),this.values=this.values.slice(a*s,n*s)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Fe("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,r=this.values,a=i.length;a===0&&(Fe("KeyframeTrack: Track is empty.",this),t=!1);let n=null;for(let s=0;s!==a;s++){let o=i[s];if(typeof o=="number"&&isNaN(o)){Fe("KeyframeTrack: Time is not a valid number.",this,s,o),t=!1;break}if(n!==null&&n>o){Fe("KeyframeTrack: Out of order keys.",this,s,o,n),t=!1;break}n=o}if(r!==void 0&&Dh(r))for(let s=0,o=r.length;s!==o;++s){let l=r[s];if(isNaN(l)){Fe("KeyframeTrack: Value is not a valid number.",this,s,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===Oa,a=t.length-1,n=1;for(let s=1;s<a;++s){let o=!1,l=t[s];if(l!==t[s+1]&&(s!==1||l!==t[0]))if(r)o=!0;else{let h=s*i,u=h-i,d=h+i;for(let c=0;c!==i;++c){let p=e[h+c];if(p!==e[u+c]||p!==e[d+c]){o=!0;break}}}if(o){if(s!==n){t[n]=t[s];let h=s*i,u=n*i;for(let d=0;d!==i;++d)e[u+d]=e[h+d]}++n}}if(a>0){t[n]=t[a];for(let s=a*i,o=n*i,l=0;l!==i;++l)e[o+l]=e[s+l];++n}return n===t.length?(this.times=t,this.values=e):(this.times=t.slice(0,n),this.values=e.slice(0,n*i)),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,r=new i(this.name,t,e);return r.createInterpolant=this.createInterpolant,Sa(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Ws(t,e){for(let i=0,r=t.length;i!==r;i+=2)t[i]*=e}Xt.prototype.ValueTypeName="",Xt.prototype.TimeBufferType=Float32Array,Xt.prototype.ValueBufferType=Float32Array,Xt.prototype.DefaultInterpolation=Mn;var ir=class extends Xt{constructor(t,e,i){super(t,e,i)}};ir.prototype.ValueTypeName="bool",ir.prototype.ValueBufferType=Array,ir.prototype.DefaultInterpolation=Ea,ir.prototype.InterpolantFactoryMethodLinear=void 0,ir.prototype.InterpolantFactoryMethodSmooth=void 0;var Ml=class extends Xt{constructor(t,e,i,r){super(t,e,i,r)}};Ml.prototype.ValueTypeName="color";var Hn=class extends Xt{constructor(t,e,i,r){super(t,e,i,r)}};Hn.prototype.ValueTypeName="number";var Pc=class extends Vr{constructor(t,e,i,r){super(t,e,i,r)}interpolate_(t,e,i,r){let a=this.resultBuffer,n=this.sampleValues,s=this.valueSize,o=(i-e)/(r-e),l=t*s;for(let h=l+s;l!==h;l+=4)Fi.slerpFlat(a,0,n,l-s,n,l,o);return a}},Rn=class extends Xt{constructor(t,e,i,r){super(t,e,i,r)}InterpolantFactoryMethodLinear(t){return new Pc(this.times,this.values,this.getValueSize(),t)}};Rn.prototype.ValueTypeName="quaternion",Rn.prototype.InterpolantFactoryMethodSmooth=void 0;var rr=class extends Xt{constructor(t,e,i){super(t,e,i)}};rr.prototype.ValueTypeName="string",rr.prototype.ValueBufferType=Array,rr.prototype.DefaultInterpolation=Ea,rr.prototype.InterpolantFactoryMethodLinear=void 0,rr.prototype.InterpolantFactoryMethodSmooth=void 0;var Sl=class extends Xt{constructor(t,e,i,r){super(t,e,i,r)}};Sl.prototype.ValueTypeName="vector";var dm=class{constructor(t="",e=-1,i=[],r=Nh){this.name=t,this.tracks=i,this.duration=e,this.blendMode=r,this.uuid=Bt(),this.userData={},this.duration<0&&this.resetDuration()}static parse(t){let e=[],i=t.tracks,r=1/(t.fps||1);for(let n=0,s=i.length;n!==s;++n)e.push(Nc(i[n]).scale(r));let a=new this(t.name,t.duration,e,t.blendMode);return a.uuid=t.uuid,a.userData=JSON.parse(t.userData||"{}"),a}static toJSON(t){let e=[],i=t.tracks,r={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode,userData:JSON.stringify(t.userData)};for(let a=0,n=i.length;a!==n;++a)e.push(Xt.toJSON(i[a]));return r}static CreateFromMorphTargetSequence(t,e,i,r){let a=e.length,n=[];for(let s=0;s<a;s++){let o=[],l=[];o.push((s+a-1)%a,s,(s+1)%a),l.push(0,1,0);let h=Sc(o);o=ks(o,1,h),l=ks(l,1,h),!r&&o[0]===0&&(o.push(a),l.push(l[0])),n.push(new Hn(".morphTargetInfluences["+e[s].name+"]",o,l).scale(1/i))}return new this(t,-1,n)}static findByName(t,e){let i=t;if(!Array.isArray(t)){let r=t;i=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<i.length;r++)if(i[r].name===e)return i[r];return null}static CreateClipsFromMorphTargetSequences(t,e,i){let r={},a=/^([\w-]*?)([\d]+)$/;for(let s=0,o=t.length;s<o;s++){let l=t[s],h=l.name.match(a);if(h&&h.length>1){let u=h[1],d=r[u];d||(r[u]=d=[]),d.push(l)}}let n=[];for(let s in r)n.push(this.CreateFromMorphTargetSequence(s,r[s],e,i));return n}resetDuration(){let t=this.tracks,e=0;for(let i=0,r=t.length;i!==r;++i){let a=this.tracks[i];e=Math.max(e,a.times[a.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t&&=this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){let t=[];for(let i=0;i<this.tracks.length;i++)t.push(this.tracks[i].clone());let e=new this.constructor(this.name,this.duration,t,this.blendMode);return e.userData=JSON.parse(JSON.stringify(this.userData)),e}toJSON(){return this.constructor.toJSON(this)}};function Lc(t){switch(t.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Hn;case"vector":case"vector2":case"vector3":case"vector4":return Sl;case"color":return Ml;case"quaternion":return Rn;case"bool":case"boolean":return ir;case"string":return rr}throw Error("THREE.KeyframeTrack: Unsupported typeName: "+t)}function Nc(t){if(t.type===void 0)throw Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=Lc(t.type);if(t.times===void 0){let r=[],a=[];bc(t.keys,r,a,"value"),t.times=r,t.values=a}let i;return i=e.parse===void 0?new e(t.name,t.times,t.values,t.interpolation):e.parse(t),Sa(t.settings)&&(i.settings={inTangents:Si(t.settings.inTangents,Float32Array),outTangents:Si(t.settings.outTangents,Float32Array)}),i}var ui={enabled:!1,files:{},add:function(t,e){this.enabled!==!1&&(Xs(t)||(this.files[t]=e))},get:function(t){if(this.enabled!==!1&&!Xs(t))return this.files[t]},remove:function(t){delete this.files[t]},clear:function(){this.files={}}};function Xs(t){try{let e=t.slice(t.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var Ic=new class{constructor(t,e,i){let r=this,a=!1,n=0,s=0,o,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this._abortController=null,this.itemStart=function(h){s++,a===!1&&r.onStart!==void 0&&r.onStart(h,n,s),a=!0},this.itemEnd=function(h){n++,r.onProgress!==void 0&&r.onProgress(h,n,s),n===s&&(a=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),o?o(h):h},this.setURLModifier=function(h){return o=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let c=l[u],p=l[u+1];if(c.global&&(c.lastIndex=0),c.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||=new AbortController,this._abortController}},Hr=class{constructor(t){this.manager=t===void 0?Ic:t,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let i=this;return new Promise(function(r,a){i.load(t,r,e,a)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Hr.DEFAULT_MATERIAL_NAME="__DEFAULT";var oi={},Uc=class extends Error{constructor(t,e){super(t),this.response=e}},pm=class extends Hr{constructor(t){super(t),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(t,e,i,r){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let a=ui.get(`file:${t}`);if(a!==void 0){this.manager.itemStart(t),setTimeout(()=>{e&&e(a),this.manager.itemEnd(t)},0);return}if(oi[t]!==void 0){oi[t].push({onLoad:e,onProgress:i,onError:r});return}oi[t]=[],oi[t].push({onLoad:e,onProgress:i,onError:r});let n=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),s=this.mimeType,o=this.responseType;fetch(n).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&we("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=oi[t],u=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),c=d?parseInt(d):0,p=c!==0,g=0,M=new ReadableStream({start(m){f();function f(){u.read().then(({done:T,value:w})=>{if(T)m.close();else{g+=w.byteLength;let _=new ProgressEvent("progress",{lengthComputable:p,loaded:g,total:c});for(let E=0,A=h.length;E<A;E++){let R=h[E];R.onProgress&&R.onProgress(_)}m.enqueue(w),f()}},T=>{m.error(T)})}}});return new Response(M)}throw new Uc(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(o){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,s));case"json":return l.json();default:if(s==="")return l.text();{let h=/charset="?([^;"\s]*)"?/i.exec(s),u=h&&h[1]?h[1].toLowerCase():void 0,d=new TextDecoder(u);return l.arrayBuffer().then(c=>d.decode(c))}}}).then(l=>{ui.add(`file:${t}`,l);let h=oi[t];delete oi[t];for(let u=0,d=h.length;u<d;u++){let c=h[u];c.onLoad&&c.onLoad(l)}}).catch(l=>{let h=oi[t];if(h===void 0)throw this.manager.itemError(t),l;delete oi[t];for(let u=0,d=h.length;u<d;u++){let c=h[u];c.onError&&c.onError(l)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},Ki=new WeakMap,Dc=class extends Hr{constructor(t){super(t)}load(t,e,i,r){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let a=this,n=ui.get(`image:${t}`);if(n!==void 0){if(n.complete===!0)a.manager.itemStart(t),setTimeout(function(){e&&e(n),a.manager.itemEnd(t)},0);else{let u=Ki.get(n);u===void 0&&(u=[],Ki.set(n,u)),u.push({onLoad:e,onError:r})}return n}let s=Ur("img");function o(){h(),e&&e(this);let u=Ki.get(this)||[];for(let d=0;d<u.length;d++){let c=u[d];c.onLoad&&c.onLoad(this)}Ki.delete(this),a.manager.itemEnd(t)}function l(u){h(),r&&r(u),ui.remove(`image:${t}`);let d=Ki.get(this)||[];for(let c=0;c<d.length;c++){let p=d[c];p.onError&&p.onError(u)}Ki.delete(this),a.manager.itemError(t),a.manager.itemEnd(t)}function h(){s.removeEventListener("load",o,!1),s.removeEventListener("error",l,!1)}return s.addEventListener("load",o,!1),s.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(s.crossOrigin=this.crossOrigin),ui.add(`image:${t}`,s),a.manager.itemStart(t),s.src=t,s}},fm=class extends Hr{constructor(t){super(t)}load(t,e,i,r){let a=new Dt,n=new Dc(this.manager);return n.setCrossOrigin(this.crossOrigin),n.setPath(this.path),n.load(t,function(s){a.image=s,a.needsUpdate=!0,e!==void 0&&e(a)},i,r),a}},La=class extends Mt{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ke(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},mm=class extends La{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ke(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},cn=new Je,js=new I,qs=new I,Gn=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new he(512,512),this.mapType=bi,this.map=null,this.mapPass=null,this.matrix=new Je,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Fn,this._frameExtents=new he(1,1),this._viewportCount=1,this._viewports=[new ht(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;js.setFromMatrixPosition(t.matrixWorld),e.position.copy(js),qs.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(qs),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,i,r){cn.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),i.setFromProjectionMatrix(cn,t.coordinateSystem,t.reversedDepth);let a=this._frameExtents,n=r?r.z/a.x:1,s=r?r.w/a.y:1,o=r?r.x/a.x:0,l=r?r.y/a.y:0;t.coordinateSystem===2001||t.reversedDepth?e.set(.5*n,0,0,.5*n+o,0,.5*s,0,.5*s+l,0,0,1,0,0,0,0,1):e.set(.5*n,0,0,.5*n+o,0,.5*s,0,.5*s+l,0,0,.5,.5,0,0,0,1),e.multiply(cn)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},ga=new I,va=new Fi,Zt=new I,bl=class extends Mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Je,this.projectionMatrix=new Je,this.projectionMatrixInverse=new Je,this.coordinateSystem=hr,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(ga,va,Zt),Zt.x===1&&Zt.y===1&&Zt.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ga,va,Zt.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(ga,va,Zt),Zt.x===1&&Zt.y===1&&Zt.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ga,va,Zt.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},yi=new I,Ys=new he,Js=new he,It=class extends bl{constructor(t=50,e=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=ur*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Cr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ur*2*Math.atan(Math.tan(Cr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){yi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(yi.x,yi.y).multiplyScalar(-t/yi.z),yi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(yi.x,yi.y).multiplyScalar(-t/yi.z)}getViewSize(t,e){return this.getViewBounds(t,Ys,Js),e.subVectors(Js,Ys)}setViewOffset(t,e,i,r,a,n){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=n,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Cr*.5*this.fov)/this.zoom,i=2*e,r=this.aspect*i,a=-.5*r,n=this.view;if(this.view!==null&&this.view.enabled){let o=n.fullWidth,l=n.fullHeight;a+=n.offsetX*r/o,e-=n.offsetY*i/l,r*=n.width/o,i*=n.height/l}let s=this.filmOffset;s!==0&&(a+=t*s/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Oc=class extends Gn{constructor(){super(new It(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){let e=this.camera,i=ur*2*t.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,a=t.distance||e.far;(i!==e.fov||r!==e.aspect||a!==e.far)&&(e.fov=i,e.aspect=r,e.far=a,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this.aspect=t.aspect,this}toJSON(){let t=super.toJSON();return t.focus=this.focus,t.aspect=this.aspect,t}},gm=class extends La{constructor(t,e,i=0,r=Math.PI/3,a=0,n=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.target=new Mt,this.distance=i,this.angle=r,this.penumbra=a,this.decay=n,this.map=null,this.shadow=new Oc}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.map=t.map,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.angle=this.angle,e.object.decay=this.decay,e.object.penumbra=this.penumbra,e.object.target=this.target.uuid,this.map&&this.map.isTexture&&(e.object.map=this.map.toJSON(t).uuid),e.object.shadow=this.shadow.toJSON(),e}},Fc=class extends Gn{constructor(){super(new It(90,1,.5,500)),this.isPointLightShadow=!0}},vm=class extends La{constructor(t,e,i=0,r=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new Fc}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}},kn=class extends bl{constructor(t=-1,e=1,i=1,r=-1,a=.1,n=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=r,this.near=a,this.far=n,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,r,a,n){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=n,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,a=i-t,n=i+t,s=r+e,o=r-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=l*this.view.offsetX,n=a+l*this.view.width,s-=h*this.view.offsetY,o=s-h*this.view.height}this.projectionMatrix.makeOrthographic(a,n,s,o,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Bc=class extends Gn{constructor(){super(new kn(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},_m=class extends La{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.target=new Mt,this.shadow=new Bc}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}},xm=class{static extractUrlBase(t){let e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}},ym=class extends St{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){let t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}},dn=new WeakMap,Mm=class extends Hr{constructor(t){super(t),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&we("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&we("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(t){return this.options=t,this}load(t,e,i,r){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let a=this,n=ui.get(`image-bitmap:${t}`);if(n!==void 0){if(a.manager.itemStart(t),n.then){n.then(l=>{dn.has(n)===!0?(r&&r(dn.get(n)),a.manager.itemError(t),a.manager.itemEnd(t)):(e&&e(l),a.manager.itemEnd(t))});return}setTimeout(function(){e&&e(n),a.manager.itemEnd(t)},0);return}let s={};s.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",s.headers=this.requestHeader,s.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let o=fetch(t,s).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign({},a.options,{colorSpaceConversion:"none"}))}).then(function(l){return ui.add(`image-bitmap:${t}`,l),e&&e(l),a.manager.itemEnd(t),l}).catch(function(l){r&&r(l),dn.set(o,l),ui.remove(`image-bitmap:${t}`),a.manager.itemError(t),a.manager.itemEnd(t)});ui.add(`image-bitmap:${t}`,o),a.manager.itemStart(t)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},$i=-90,Qi=1,zc=class extends Mt{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new It($i,Qi,t,e);r.layers=this.layers,this.add(r);let a=new It($i,Qi,t,e);a.layers=this.layers,this.add(a);let n=new It($i,Qi,t,e);n.layers=this.layers,this.add(n);let s=new It($i,Qi,t,e);s.layers=this.layers,this.add(s);let o=new It($i,Qi,t,e);o.layers=this.layers,this.add(o);let l=new It($i,Qi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,r,a,n,s,o]=e;for(let l of e)this.remove(l);if(t===2e3)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),n.up.set(0,0,1),n.lookAt(0,-1,0),s.up.set(0,1,0),s.lookAt(0,0,1),o.up.set(0,1,0),o.lookAt(0,0,-1);else if(t===2001)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),n.up.set(0,0,-1),n.lookAt(0,-1,0),s.up.set(0,-1,0),s.lookAt(0,0,1),o.up.set(0,-1,0),o.lookAt(0,0,-1);else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[a,n,s,o,l,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),c=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;let g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let M=!1;M=t.isWebGLRenderer===!0?t.state.buffers.depth.getReversed():t.reversedDepthBuffer,t.setRenderTarget(i,0,r),M&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,1,r),M&&t.autoClear===!1&&t.clearDepth(),t.render(e,n),t.setRenderTarget(i,2,r),M&&t.autoClear===!1&&t.clearDepth(),t.render(e,s),t.setRenderTarget(i,3,r),M&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,4,r),M&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),i.texture.generateMipmaps=g,t.setRenderTarget(i,5,r),M&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(u,d,c),t.xr.enabled=p,i.texture.needsPMREMUpdate=!0}},Vc=class extends It{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}},Sm=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(t){this._document=t,t.hidden!==void 0&&(this._pageVisibilityHandler=Hc.bind(this),t.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(t){return this._timescale=t,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(t){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(t===void 0?performance.now():t)-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function Hc(){this._document.hidden===!1&&this.reset()}var Gc="\\[\\]\\.:\\/",kc=RegExp("[\\[\\]\\.:\\/]","g"),Wn="[^\\[\\]\\.:\\/]",Wc="[^"+Gc.replace("\\.","")+"]",Xc="((?:WC+[\\/:])*)".replace("WC",Wn),jc="(WCOD+)?".replace("WCOD",Wc),qc="(?:\\.(WC+)(?:\\[(.+)\\])?)?".replace("WC",Wn),Yc="\\.(WC+)(?:\\[(.+)\\])?".replace("WC",Wn),Jc=RegExp("^"+Xc+jc+qc+Yc+"$"),Zc=["material","materials","bones","map"],Kc=class{constructor(t,e,i){let r=i||pt.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,r)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,a=i.length;r!==a;++r)i[r].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},pt=class ar{constructor(e,i,r){this.path=i,this.parsedPath=r||ar.parseTrackName(i),this.node=ar.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,i,r){return e&&e.isAnimationObjectGroup?new ar.Composite(e,i,r):new ar(e,i,r)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(kc,"")}static parseTrackName(e){let i=Jc.exec(e);if(i===null)throw Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let r={nodeName:i[2],objectName:i[3],objectIndex:i[4],propertyName:i[5],propertyIndex:i[6]},a=r.nodeName&&r.nodeName.lastIndexOf(".");if(a!==void 0&&a!==-1){let n=r.nodeName.substring(a+1);Zc.indexOf(n)!==-1&&(r.nodeName=r.nodeName.substring(0,a),r.objectName=n)}if(r.propertyName===null||r.propertyName.length===0)throw Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return r}static findNode(e,i){if(i===void 0||i===""||i==="."||i===-1||i===e.name||i===e.uuid)return e;if(e.skeleton){let r=e.skeleton.getBoneByName(i);if(r!==void 0)return r}if(e.children){let r=function(n){for(let s=0;s<n.length;s++){let o=n[s];if(o.name===i||o.uuid===i)return o;let l=r(o.children);if(l)return l}return null},a=r(e.children);if(a)return a}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,i){e[i]=this.targetObject[this.propertyName]}_getValue_array(e,i){let r=this.resolvedProperty;for(let a=0,n=r.length;a!==n;++a)e[i++]=r[a]}_getValue_arrayElement(e,i){e[i]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,i){this.resolvedProperty.toArray(e,i)}_setValue_direct(e,i){this.targetObject[this.propertyName]=e[i]}_setValue_direct_setNeedsUpdate(e,i){this.targetObject[this.propertyName]=e[i],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,i){this.targetObject[this.propertyName]=e[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,i){let r=this.resolvedProperty;for(let a=0,n=r.length;a!==n;++a)r[a]=e[i++]}_setValue_array_setNeedsUpdate(e,i){let r=this.resolvedProperty;for(let a=0,n=r.length;a!==n;++a)r[a]=e[i++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,i){let r=this.resolvedProperty;for(let a=0,n=r.length;a!==n;++a)r[a]=e[i++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,i){this.resolvedProperty[this.propertyIndex]=e[i]}_setValue_arrayElement_setNeedsUpdate(e,i){this.resolvedProperty[this.propertyIndex]=e[i],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,i){this.resolvedProperty[this.propertyIndex]=e[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,i){this.resolvedProperty.fromArray(e,i)}_setValue_fromArray_setNeedsUpdate(e,i){this.resolvedProperty.fromArray(e,i),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,i){this.resolvedProperty.fromArray(e,i),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,i){this.bind(),this.getValue(e,i)}_setValue_unbound(e,i){this.bind(),this.setValue(e,i)}bind(){let e=this.node,i=this.parsedPath,r=i.objectName,a=i.propertyName,n=i.propertyIndex;if(e||(e=ar.findNode(this.rootNode,i.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){we("PropertyBinding: No target node found for track: "+this.path+".");return}if(r){let h=i.objectIndex;switch(r){case"materials":if(!e.material){Fe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Fe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Fe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===h){h=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Fe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Fe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[r]===void 0){Fe("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[r]}if(h!==void 0){if(e[h]===void 0){Fe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[h]}}let s=e[a];if(s===void 0){let h=i.nodeName;Fe("PropertyBinding: Trying to update property for track: "+h+"."+a+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(n!==void 0){if(a==="morphTargetInfluences"){if(!e.geometry){Fe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Fe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[n]!==void 0&&(n=e.morphTargetDictionary[n])}l=this.BindingType.ArrayElement,this.resolvedProperty=s,this.propertyIndex=n}else s.fromArray!==void 0&&s.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=s):Array.isArray(s)?(l=this.BindingType.EntireArray,this.resolvedProperty=s):this.propertyName=a;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};pt.Composite=Kc,pt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},pt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},pt.prototype.GetterByBindingType=[pt.prototype._getValue_direct,pt.prototype._getValue_array,pt.prototype._getValue_arrayElement,pt.prototype._getValue_toArray],pt.prototype.SetterByBindingTypeAndVersioning=[[pt.prototype._setValue_direct,pt.prototype._setValue_direct_setNeedsUpdate,pt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[pt.prototype._setValue_array,pt.prototype._setValue_array_setNeedsUpdate,pt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[pt.prototype._setValue_arrayElement,pt.prototype._setValue_arrayElement_setNeedsUpdate,pt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[pt.prototype._setValue_fromArray,pt.prototype._setValue_fromArray_setNeedsUpdate,pt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Zs=new Je,bm=class{constructor(t,e,i=0,r=1/0){this.ray=new zr(t,e),this.near=i,this.far=r,this.camera=null,this.layers=new Dn,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):Fe("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Zs.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Zs),this}intersectObject(t,e=!0,i=[]){return Cn(t,this,i,e),i.sort(Ks),i}intersectObjects(t,e=!0,i=[]){for(let r=0,a=t.length;r<a;r++)Cn(t[r],this,i,e);return i.sort(Ks),i}};function Ks(t,e){return t.distance-e.distance}function Cn(t,e,i,r){let a=!0;if(t.layers.test(e.layers)&&t.raycast(e,i)===!1&&(a=!1),a===!0&&r===!0){let n=t.children;for(let s=0,o=n.length;s<o;s++)Cn(n[s],e,i,!0)}}var Tm=class{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){let t=1e-6;return this.phi=Xe(this.phi,t,Math.PI-t),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Xe(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};(class Tl{static{Tl.prototype.isMatrix2=!0}constructor(e,i,r,a){this.elements=[1,0,0,1],e!==void 0&&this.set(e,i,r,a)}identity(){return this.set(1,0,0,1),this}fromArray(e,i=0){for(let r=0;r<4;r++)this.elements[r]=e[r+i];return this}set(e,i,r,a){let n=this.elements;return n[0]=e,n[2]=i,n[1]=r,n[3]=a,this}});var Em=class extends Ei{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function $s(t,e,i,r){let a=$c(r);switch(i){case Yl:return t*e;case Ao:return t*e/a.components*a.byteLength;case Ro:return t*e/a.components*a.byteLength;case Ta:return t*e*2/a.components*a.byteLength;case Co:return t*e*2/a.components*a.byteLength;case Jl:return t*e*3/a.components*a.byteLength;case lr:return t*e*4/a.components*a.byteLength;case Po:return t*e*4/a.components*a.byteLength;case Zl:case Kl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case $l:case Ql:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case th:case rh:return Math.max(t,16)*Math.max(e,8)/4;case eh:case ih:return Math.max(t,8)*Math.max(e,8)/2;case ah:case nh:case oh:case lh:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case sh:case hh:case uh:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case ch:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case dh:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case ph:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case fh:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case mh:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case gh:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case vh:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case _h:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case xh:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case yh:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case Mh:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case Sh:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case bh:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case Th:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case Eh:case wh:case Ah:return Math.ceil(t/4)*Math.ceil(e/4)*16;case Rh:case Ch:return Math.ceil(t/4)*Math.ceil(e/4)*8;case Ph:case Lh:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw Error(`Unable to determine texture byte length for ${i} format.`)}function $c(t){switch(t){case bi:case kl:return{byteLength:1,components:1};case So:case Wl:case Ti:return{byteLength:2,components:1};case bo:case To:return{byteLength:2,components:4};case Ui:case Xl:case pr:return{byteLength:4,components:1};case jl:case ql:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}})),typeof window<"u"&&(window.__THREE__?we("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function El(){let t=null,e=!1,i=null,r=null;function a(n,s){r=t.requestAnimationFrame(a),i(n,s)}return{start:function(){e!==!0&&i!==null&&t!==null&&(r=t.requestAnimationFrame(a),e=!0)},stop:function(){t!==null&&t.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(n){i=n},setContext:function(n){t=n}}}function Qc(t){let e=new WeakMap;function i(o,l){let h=o.array,u=o.usage,d=h.byteLength,c=t.createBuffer();t.bindBuffer(l,c),t.bufferData(l,h,u),o.onUploadCallback();let p;if(h instanceof Float32Array)p=t.FLOAT;else if(typeof Float16Array<"u"&&h instanceof Float16Array)p=t.HALF_FLOAT;else if(h instanceof Uint16Array)p=o.isFloat16BufferAttribute?t.HALF_FLOAT:t.UNSIGNED_SHORT;else if(h instanceof Int16Array)p=t.SHORT;else if(h instanceof Uint32Array)p=t.UNSIGNED_INT;else if(h instanceof Int32Array)p=t.INT;else if(h instanceof Int8Array)p=t.BYTE;else if(h instanceof Uint8Array)p=t.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)p=t.UNSIGNED_BYTE;else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:c,type:p,bytesPerElement:h.BYTES_PER_ELEMENT,version:o.version,size:d}}function r(o,l,h){let u=l.array,d=l.updateRanges;if(t.bindBuffer(h,o),d.length===0)t.bufferSubData(h,0,u);else{d.sort((p,g)=>p.start-g.start);let c=0;for(let p=1;p<d.length;p++){let g=d[c],M=d[p];M.start<=g.start+g.count+1?g.count=Math.max(g.count,M.start+M.count-g.start):(++c,d[c]=M)}d.length=c+1;for(let p=0,g=d.length;p<g;p++){let M=d[p];t.bufferSubData(h,M.start*u.BYTES_PER_ELEMENT,u,M.start,M.count)}l.clearUpdateRanges()}l.onUploadCallback()}function a(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function n(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(t.deleteBuffer(l.buffer),e.delete(o))}function s(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let h=e.get(o);if(h===void 0)e.set(o,i(o,l));else if(h.version<o.version){if(h.size!==o.array.byteLength)throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(h.buffer,o,l),h.version=o.version}}return{get:a,remove:n,update:s}}var je={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
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
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
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
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
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
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
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
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
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
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
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
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
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
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
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
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
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
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
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
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:"gl_FragColor = linearToOutputTexel( gl_FragColor );",colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
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
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
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
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
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
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
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
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
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
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
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
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
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
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
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
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
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
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
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
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
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
		return 0.5 / max( gv + gl, EPSILON );
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
	vec3 f0 = material.specularColorBlended;
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
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
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
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
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
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
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
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
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
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
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
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
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
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#ifdef DOUBLE_SIDED
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
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
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
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
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
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
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
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
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
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
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
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
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
vec3 CineonToneMapping( vec3 color ) {
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
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
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
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
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
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
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
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
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
	#include <morphinstance_vertex>
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
}`,depth_frag:`#if DEPTH_PACKING == 3200
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
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
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
	#include <morphinstance_vertex>
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
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
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
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
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
	#include <morphinstance_vertex>
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
}`,meshbasic_frag:`uniform vec3 diffuse;
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
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
}`,meshlambert_vert:`#define LAMBERT
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
	#include <morphinstance_vertex>
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
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
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
}`,meshmatcap_vert:`#define MATCAP
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
	#include <morphinstance_vertex>
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
}`,meshmatcap_frag:`#define MATCAP
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
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
}`,meshnormal_vert:`#define NORMAL
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
	#include <morphinstance_vertex>
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
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
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
	#include <morphinstance_vertex>
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
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
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
}`,meshphysical_vert:`#define STANDARD
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
	#include <morphinstance_vertex>
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
}`,meshphysical_frag:`#define STANDARD
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
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
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
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
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
}`,meshtoon_vert:`#define TOON
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
	#include <morphinstance_vertex>
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
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
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
}`,points_vert:`uniform float size;
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
	#include <morphinstance_vertex>
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
}`,points_frag:`uniform vec3 diffuse;
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
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
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
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
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
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
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
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
}`,sprite_frag:`uniform vec3 diffuse;
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
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
}`},fe={common:{diffuse:{value:new ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},envMapRotation:{value:new We},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new he(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new I},probesMax:{value:new I},probesResolution:{value:new I}},points:{diffuse:{value:new ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new ke(16777215)},opacity:{value:1},center:{value:new he(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},$t={basic:{uniforms:At([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:At([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new ke(0)},envMapIntensity:{value:1}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:At([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new ke(0)},specular:{value:new ke(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:At([fe.common,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.roughnessmap,fe.metalnessmap,fe.fog,fe.lights,{emissive:{value:new ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:At([fe.common,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.gradientmap,fe.fog,fe.lights,{emissive:{value:new ke(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:At([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:At([fe.points,fe.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:At([fe.common,fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:At([fe.common,fe.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:At([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:At([fe.sprite,fe.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new We}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distance:{uniforms:At([fe.common,fe.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distance_vert,fragmentShader:je.distance_frag},shadow:{uniforms:At([fe.lights,fe.fog,{color:{value:new ke(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};$t.physical={uniforms:At([$t.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new he(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new he},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new ke(0)},specularColor:{value:new ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new he},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag};var _a={r:0,b:0,g:0},ed=new Je,wl=new We;wl.set(-1,0,0,0,1,0,0,0,1);function td(t,e,i,r,a,n){let s=new ke(0),o=a===!0?0:1,l,h,u=null,d=0,c=null;function p(T){let w=T.isScene===!0?T.background:null;if(w&&w.isTexture){let _=T.backgroundBlurriness>0;w=e.get(w,_)}return w}function g(T){let w=!1,_=p(T);_===null?m(s,o):_&&_.isColor&&(m(_,1),w=!0);let E=t.xr.getEnvironmentBlendMode();E==="additive"?i.buffers.color.setClear(0,0,0,1,n):E==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,n),(t.autoClear||w)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function M(T,w){let _=p(w);_&&(_.isCubeTexture||_.mapping===306)?(h===void 0&&(h=new zt(new Bn(1,1,1),new Qt({name:"BackgroundCubeMaterial",uniforms:dr($t.backgroundCube.uniforms),vertexShader:$t.backgroundCube.vertexShader,fragmentShader:$t.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,A,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),h.material.uniforms.envMap.value=_,h.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(ed.makeRotationFromEuler(w.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&h.material.uniforms.backgroundRotation.value.premultiply(wl),h.material.toneMapped=Ke.getTransfer(_.colorSpace)!==Aa,(u!==_||d!==_.version||c!==t.toneMapping)&&(h.material.needsUpdate=!0,u=_,d=_.version,c=t.toneMapping),h.layers.enableAll(),T.unshift(h,h.geometry,h.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new zt(new fl(2,2),new Qt({name:"BackgroundMaterial",uniforms:dr($t.background.uniforms),vertexShader:$t.background.vertexShader,fragmentShader:$t.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=Ke.getTransfer(_.colorSpace)!==Aa,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(u!==_||d!==_.version||c!==t.toneMapping)&&(l.material.needsUpdate=!0,u=_,d=_.version,c=t.toneMapping),l.layers.enableAll(),T.unshift(l,l.geometry,l.material,0,0,null))}function m(T,w){T.getRGB(_a,xl(t)),i.buffers.color.setClear(_a.r,_a.g,_a.b,w,n)}function f(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return s},setClearColor:function(T,w=1){s.set(T),o=w,m(s,o)},getClearAlpha:function(){return o},setClearAlpha:function(T){o=T,m(s,o)},render:g,addToRenderList:M,dispose:f}}function id(t,e){let i=t.getParameter(t.MAX_VERTEX_ATTRIBS),r={},a=c(null),n=a,s=!1;function o(P,O,X,N,V){let J=!1,G=d(P,N,X,O);n!==G&&(n=G,h(n.object)),J=p(P,N,X,V),J&&g(P,N,X,V),V!==null&&e.update(V,t.ELEMENT_ARRAY_BUFFER),(J||s)&&(s=!1,_(P,O,X,N),V!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function l(){return t.createVertexArray()}function h(P){return t.bindVertexArray(P)}function u(P){return t.deleteVertexArray(P)}function d(P,O,X,N){let V=N.wireframe===!0,J=r[O.id];J===void 0&&(J={},r[O.id]=J);let G=P.isInstancedMesh===!0?P.id:0,oe=J[G];oe===void 0&&(oe={},J[G]=oe);let j=oe[X.id];j===void 0&&(j={},oe[X.id]=j);let Y=j[V];return Y===void 0&&(Y=c(l()),j[V]=Y),Y}function c(P){let O=[],X=[],N=[];for(let V=0;V<i;V++)O[V]=0,X[V]=0,N[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:X,attributeDivisors:N,object:P,attributes:{},index:null}}function p(P,O,X,N){let V=n.attributes,J=O.attributes,G=0,oe=X.getAttributes();for(let j in oe)if(oe[j].location>=0){let Y=V[j],Q=J[j];if(Q===void 0&&(j==="instanceMatrix"&&P.instanceMatrix&&(Q=P.instanceMatrix),j==="instanceColor"&&P.instanceColor&&(Q=P.instanceColor)),Y===void 0||Y.attribute!==Q||Q&&Y.data!==Q.data)return!0;G++}return n.attributesNum!==G||n.index!==N}function g(P,O,X,N){let V={},J=O.attributes,G=0,oe=X.getAttributes();for(let j in oe)if(oe[j].location>=0){let Y=J[j];Y===void 0&&(j==="instanceMatrix"&&P.instanceMatrix&&(Y=P.instanceMatrix),j==="instanceColor"&&P.instanceColor&&(Y=P.instanceColor));let Q={};Q.attribute=Y,Y&&Y.data&&(Q.data=Y.data),V[j]=Q,G++}n.attributes=V,n.attributesNum=G,n.index=N}function M(){let P=n.newAttributes;for(let O=0,X=P.length;O<X;O++)P[O]=0}function m(P){f(P,0)}function f(P,O){let X=n.newAttributes,N=n.enabledAttributes,V=n.attributeDivisors;X[P]=1,N[P]===0&&(t.enableVertexAttribArray(P),N[P]=1),V[P]!==O&&(t.vertexAttribDivisor(P,O),V[P]=O)}function T(){let P=n.newAttributes,O=n.enabledAttributes;for(let X=0,N=O.length;X<N;X++)O[X]!==P[X]&&(t.disableVertexAttribArray(X),O[X]=0)}function w(P,O,X,N,V,J,G){G===!0?t.vertexAttribIPointer(P,O,X,V,J):t.vertexAttribPointer(P,O,X,N,V,J)}function _(P,O,X,N){M();let V=N.attributes,J=X.getAttributes(),G=O.defaultAttributeValues;for(let oe in J){let j=J[oe];if(j.location>=0){let Y=V[oe];if(Y===void 0&&(oe==="instanceMatrix"&&P.instanceMatrix&&(Y=P.instanceMatrix),oe==="instanceColor"&&P.instanceColor&&(Y=P.instanceColor)),Y!==void 0){let Q=Y.normalized,ze=Y.itemSize,Ae=e.get(Y);if(Ae===void 0)continue;let nt=Ae.buffer,Ve=Ae.type,q=Ae.bytesPerElement,ie=Ve===t.INT||Ve===t.UNSIGNED_INT||Y.gpuType===1013;if(Y.isInterleavedBufferAttribute){let ne=Y.data,Ce=ne.stride,Ue=Y.offset;if(ne.isInstancedInterleavedBuffer){for(let de=0;de<j.locationSize;de++)f(j.location+de,ne.meshPerAttribute);P.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let de=0;de<j.locationSize;de++)m(j.location+de);t.bindBuffer(t.ARRAY_BUFFER,nt);for(let de=0;de<j.locationSize;de++)w(j.location+de,ze/j.locationSize,Ve,Q,Ce*q,(Ue+ze/j.locationSize*de)*q,ie)}else{if(Y.isInstancedBufferAttribute){for(let ne=0;ne<j.locationSize;ne++)f(j.location+ne,Y.meshPerAttribute);P.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let ne=0;ne<j.locationSize;ne++)m(j.location+ne);t.bindBuffer(t.ARRAY_BUFFER,nt);for(let ne=0;ne<j.locationSize;ne++)w(j.location+ne,ze/j.locationSize,Ve,Q,ze*q,ze/j.locationSize*ne*q,ie)}}else if(G!==void 0){let Q=G[oe];if(Q!==void 0)switch(Q.length){case 2:t.vertexAttrib2fv(j.location,Q);break;case 3:t.vertexAttrib3fv(j.location,Q);break;case 4:t.vertexAttrib4fv(j.location,Q);break;default:t.vertexAttrib1fv(j.location,Q)}}}}T()}function E(){S();for(let P in r){let O=r[P];for(let X in O){let N=O[X];for(let V in N){let J=N[V];for(let G in J)u(J[G].object),delete J[G];delete N[V]}}delete r[P]}}function A(P){if(r[P.id]===void 0)return;let O=r[P.id];for(let X in O){let N=O[X];for(let V in N){let J=N[V];for(let G in J)u(J[G].object),delete J[G];delete N[V]}}delete r[P.id]}function R(P){for(let O in r){let X=r[O];for(let N in X){let V=X[N];if(V[P.id]===void 0)continue;let J=V[P.id];for(let G in J)u(J[G].object),delete J[G];delete V[P.id]}}}function v(P){for(let O in r){let X=r[O],N=P.isInstancedMesh===!0?P.id:0,V=X[N];if(V!==void 0){for(let J in V){let G=V[J];for(let oe in G)u(G[oe].object),delete G[oe];delete V[J]}delete X[N],Object.keys(X).length===0&&delete r[O]}}}function S(){B(),s=!0,n!==a&&(n=a,h(n.object))}function B(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:o,reset:S,resetDefaultState:B,dispose:E,releaseStatesOfGeometry:A,releaseStatesOfObject:v,releaseStatesOfProgram:R,initAttributes:M,enableAttribute:m,disableUnusedAttributes:T}}function rd(t,e,i){let r;function a(l){r=l}function n(l,h){t.drawArrays(r,l,h),i.update(h,r,1)}function s(l,h,u){u!==0&&(t.drawArraysInstanced(r,l,h,u),i.update(h,r,u))}function o(l,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,l,0,h,0,u);let d=0;for(let c=0;c<u;c++)d+=h[c];i.update(d,r,1)}this.setMode=a,this.render=n,this.renderInstances=s,this.renderMultiDraw=o}function ad(t,e,i,r){let a;function n(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){let R=e.get("EXT_texture_filter_anisotropic");a=t.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function s(R){return R===1023||r.convert(R)===t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT)}function o(R){let v=R===1016&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==1009&&R!==1015&&!v&&r.convert(R)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE))}function l(R){if(R==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=i.precision===void 0?"highp":i.precision,u=l(h);u!==h&&(we("WebGLRenderer:",h,"not supported, using",u,"instead."),h=u);let d=i.logarithmicDepthBuffer===!0,c=i.reversedDepthBuffer===!0&&e.has("EXT_clip_control");i.reversedDepthBuffer===!0&&c===!1&&we("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let p=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),g=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=t.getParameter(t.MAX_TEXTURE_SIZE),m=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),f=t.getParameter(t.MAX_VERTEX_ATTRIBS),T=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),w=t.getParameter(t.MAX_VARYING_VECTORS),_=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),E=t.getParameter(t.MAX_SAMPLES),A=t.getParameter(t.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:n,getMaxPrecision:l,textureFormatReadable:s,textureTypeReadable:o,precision:h,logarithmicDepthBuffer:d,reversedDepthBuffer:c,maxTextures:p,maxVertexTextures:g,maxTextureSize:M,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:T,maxVaryings:w,maxFragmentUniforms:_,maxSamples:E,samples:A}}function nd(t){let e=this,i=null,r=0,a=!1,n=!1,s=new Mi,o=new We,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,c){let p=d.length!==0||c||r!==0||a;return a=c,r=d.length,p},this.beginShadows=function(){n=!0,u(null)},this.endShadows=function(){n=!1},this.setGlobalState=function(d,c){i=u(d,c,0)},this.setState=function(d,c,p){let g=d.clippingPlanes,M=d.clipIntersection,m=d.clipShadows,f=t.get(d);if(!a||g===null||g.length===0||n&&!m)n?u(null):h();else{let T=n?0:r,w=T*4,_=f.clippingState||null;l.value=_,_=u(g,c,w,p);for(let E=0;E!==w;++E)_[E]=i[E];f.clippingState=_,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=T}};function h(){l.value!==i&&(l.value=i,l.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function u(d,c,p,g){let M=d===null?0:d.length,m=null;if(M!==0){if(m=l.value,g!==!0||m===null){let f=p+M*4,T=c.matrixWorldInverse;o.getNormalMatrix(T),(m===null||m.length<f)&&(m=new Float32Array(f));for(let w=0,_=p;w!==M;++w,_+=4)s.copy(d[w]).applyMatrix4(T,o),s.normal.toArray(m,_),m[_+3]=s.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,m}}var nr=4,sd=6,od=20,ld=256,Er=new kn,Qs=new ke,pn=null,fn=0,mn=0,gn=!1,hd=new I,Ni=new I,eo=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,r=100,a={}){let{size:n=256,position:s=hd}=a;pn=this._renderer.getRenderTarget(),fn=this._renderer.getActiveCubeFace(),mn=this._renderer.getActiveMipmapLevel(),gn=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(n);let o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(t,i,r,o,s),e>0&&this._blur(o,0,0,e),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ro(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=io(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(pn,fn,mn),this._renderer.xr.enabled=gn,t.scissorTest=!1,er(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===301||t.mapping===302?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),pn=this._renderer.getRenderTarget(),fn=this._renderer.getActiveCubeFace(),mn=this._renderer.getActiveMipmapLevel(),gn=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Ut,minFilter:Ut,generateMipmaps:!1,type:Ti,format:lr,colorSpace:Sn,depthBuffer:!1},r=to(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=to(t,e,i);let{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=ud(a)),this._blurMaterial=dd(a,t,e),this._ggxMaterial=cd(a,t,e)}return r}_compileMaterial(t){let e=new zt(new St,t);this._renderer.compile(e,Er)}_sceneToCubeUV(t,e,i,r,a){let n=new It(90,1,e,i),s=[1,-1,1,1,1,1],o=[1,1,1,-1,-1,-1],l=this._renderer,h=l.autoClear,u=l.toneMapping;l.getClearColor(Qs),l.toneMapping=0,l.autoClear=!1,l.state.buffers.depth.getReversed()&&(l.setRenderTarget(r),l.clearDepth(),l.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new zt(new Bn,new jo({name:"PMREM.Background",side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,c=d.material,p=!1,g=t.background;g?g.isColor&&(c.color.copy(g),t.background=null,p=!0):(c.color.copy(Qs),p=!0);for(let M=0;M<6;M++){let m=M%3;m===0?(n.up.set(0,s[M],0),n.position.set(a.x,a.y,a.z),n.lookAt(a.x+o[M],a.y,a.z)):m===1?(n.up.set(0,0,s[M]),n.position.set(a.x,a.y,a.z),n.lookAt(a.x,a.y+o[M],a.z)):(n.up.set(0,s[M],0),n.position.set(a.x,a.y,a.z),n.lookAt(a.x,a.y,a.z+o[M]));let f=this._cubeSize;er(r,m*f,M>2?f:0,f,f),l.setRenderTarget(r),p&&l.render(d,n),l.render(t,n)}l.toneMapping=u,l.autoClear=h,t.background=g}_textureToCubeUV(t,e){let i=this._renderer,r=t.mapping===301||t.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=ro()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=io());let a=r?this._cubemapMaterial:this._equirectMaterial,n=this._lodMeshes[0];n.material=a;let s=a.uniforms;s.envMap.value=t;let o=this._cubeSize;er(e,0,0,3*o,2*o),i.setRenderTarget(e),i.render(n,Er)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let r=this._lodMeshes.length;for(let a=1;a<r;a++)this._applyGGXFilter(t,a-1,a);e.autoClear=i}_applyGGXFilter(t,e,i){let r=this._renderer,a=this._pingPongRenderTarget,n=this._ggxMaterial,s=this._lodMeshes[i];s.material=n;let o=n.uniforms,l=i/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),u=Math.sqrt(l*l-h*h)*(l*1.25),{_lodMax:d}=this,c=this._sizeLods[i],p=3*c*(i>d-nr?i-d+nr:0),g=4*(this._cubeSize-c);o.envMap.value=t.texture,o.roughness.value=u,o.mipInt.value=d-e,er(a,p,g,3*c,2*c),r.setRenderTarget(a),r.render(s,Er),o.envMap.value=a.texture,o.roughness.value=0,o.mipInt.value=d-i,er(t,p,g,3*c,2*c),r.setRenderTarget(t),r.render(s,Er)}_blur(t,e,i,r){let a=this._pingPongRenderTarget,n=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(t,a,e,i,n),this._blurPass(a,t,i,i,n)}_blurPass(t,e,i,r,a){let n=this._renderer,s=this._blurMaterial,o=this._lodMeshes[r];o.material=s;let l=s.uniforms;l.envMap.value=t.texture,l.sigma.value=a,l.mipInt.value=this._lodMax-i;let h=this._sizeLods[r];er(e,3*h*(r>this._lodMax-nr?r-this._lodMax+nr:0),4*(this._cubeSize-h),3*h,2*h),n.setRenderTarget(e),n.render(o,Er)}};function ud(t){let e=[],i=[],r=t,a=t-nr+1+sd;for(let n=0;n<a;n++){let s=2**r;e.push(s);let o=1/(s-2),l=-o,h=1+o,u=[l,l,h,l,h,h,l,l,h,h,l,h],d=new Float32Array(108),c=new Float32Array(108);for(let g=0;g<6;g++){let M=g%3*2/3-1,m=g>2?0:-1,f=[M,m,0,M+2/3,m,0,M+2/3,m+1,0,M,m,0,M+2/3,m+1,0,M,m+1,0];d.set(f,18*g);for(let T=0;T<6;T++){let w=u[T*2]*2-1,_=u[T*2+1]*2-1;g===0?Ni.set(1,_,w):g===1?Ni.set(-w,1,-_):g===2?Ni.set(-w,_,1):g===3?Ni.set(-1,_,-w):g===4?Ni.set(-w,-1,_):Ni.set(w,_,-1),Ni.toArray(c,(g*6+T)*3)}}let p=new St;p.setAttribute("position",new qt(d,3)),p.setAttribute("outputDirection",new qt(c,3)),i.push(new zt(p,null)),r>nr&&r--}return{lodMeshes:i,sizeLods:e}}function to(t,e,i){let r=new jt(t,e,i);return r.texture.mapping=306,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function er(t,e,i,r,a){t.viewport.set(e,i,r,a),t.scissor.set(e,i,r,a)}function cd(t,e,i){return new Qt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:ld,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Na(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function dd(t,e,i){return new Qt({name:"SphericalGaussianBlur",defines:{SAMPLES:od,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Na(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function io(){return new Qt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Na(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function ro(){return new Qt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Na(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Na(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Al=class extends jt{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new Jo(r),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Bn(5,5,5),a=new Qt({name:"CubemapFromEquirect",uniforms:dr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:1,blending:0});a.uniforms.tEquirect.value=e;let n=new zt(r,a),s=e.minFilter;return e.minFilter===1008&&(e.minFilter=Ut),new zc(1,10,this).update(t,n),e.minFilter=s,n.geometry.dispose(),n.material.dispose(),this}clear(t,e=!0,i=!0,r=!0){let a=t.getRenderTarget();for(let n=0;n<6;n++)t.setRenderTarget(this,n),t.clear(e,i,r);t.setRenderTarget(a)}};function pd(t){let e=new WeakMap,i=new WeakMap,r=null;function a(c,p=!1){return c==null?null:p?s(c):n(c)}function n(c){if(c&&c.isTexture){let p=c.mapping;if(p===303||p===304){if(e.has(c)){let g=e.get(c).texture;return o(g,c.mapping)}{let g=c.image;if(g&&g.height>0){let M=new Al(g.height);return M.fromEquirectangularTexture(t,c),e.set(c,M),c.addEventListener("dispose",h),o(M.texture,c.mapping)}return null}}}return c}function s(c){if(c&&c.isTexture){let p=c.mapping,g=p===303||p===304,M=p===301||p===302;if(g||M){let m=i.get(c),f=m===void 0?0:m.texture.pmremVersion;if(c.isRenderTargetTexture&&c.pmremVersion!==f)return r===null&&(r=new eo(t)),m=g?r.fromEquirectangular(c,m):r.fromCubemap(c,m),m.texture.pmremVersion=c.pmremVersion,i.set(c,m),m.texture;if(m!==void 0)return m.texture;{let T=c.image;return g&&T&&T.height>0||M&&T&&l(T)?(r===null&&(r=new eo(t)),m=g?r.fromEquirectangular(c):r.fromCubemap(c),m.texture.pmremVersion=c.pmremVersion,i.set(c,m),c.addEventListener("dispose",u),m.texture):null}}}return c}function o(c,p){return p===303?c.mapping=301:p===304&&(c.mapping=302),c}function l(c){let p=0;for(let g=0;g<6;g++)c[g]!==void 0&&p++;return p===6}function h(c){let p=c.target;p.removeEventListener("dispose",h);let g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function u(c){let p=c.target;p.removeEventListener("dispose",u);let g=i.get(p);g!==void 0&&(i.delete(p),g.dispose())}function d(){e=new WeakMap,i=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:a,dispose:d}}function fd(t){let e={};function i(r){if(e[r]!==void 0)return e[r];let a=t.getExtension(r);return e[r]=a,a}return{has:function(r){return i(r)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(r){let a=i(r);return a===null&&sr("WebGLRenderer: "+r+" extension not supported."),a}}}function md(t,e,i,r){let a={},n=new WeakMap;function s(d){let c=d.target;c.index!==null&&e.remove(c.index);for(let g in c.attributes)e.remove(c.attributes[g]);c.removeEventListener("dispose",s),delete a[c.id];let p=n.get(c);p&&(e.remove(p),n.delete(c)),r.releaseStatesOfGeometry(c),c.isInstancedBufferGeometry===!0&&delete c._maxInstanceCount,i.memory.geometries--}function o(d,c){return a[c.id]===!0||(c.addEventListener("dispose",s),a[c.id]=!0,i.memory.geometries++),c}function l(d){let c=d.attributes;for(let p in c)e.update(c[p],t.ARRAY_BUFFER)}function h(d){let c=[],p=d.index,g=d.attributes.position,M=0;if(g===void 0)return;if(p!==null){let T=p.array;M=p.version;for(let w=0,_=T.length;w<_;w+=3){let E=T[w+0],A=T[w+1],R=T[w+2];c.push(E,A,A,R,R,E)}}else{let T=g.array;M=g.version;for(let w=0,_=T.length/3-1;w<_;w+=3){let E=w+0,A=w+1,R=w+2;c.push(E,A,A,R,R,E)}}let m=new(g.count>=65535?ko:Go)(c,1);m.version=M;let f=n.get(d);f&&e.remove(f),n.set(d,m)}function u(d){let c=n.get(d);if(c){let p=d.index;p!==null&&c.version<p.version&&h(d)}else h(d);return n.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function gd(t,e,i){let r;function a(d){r=d}let n,s;function o(d){n=d.type,s=d.bytesPerElement}function l(d,c){t.drawElements(r,c,n,d*s),i.update(c,r,1)}function h(d,c,p){p!==0&&(t.drawElementsInstanced(r,c,n,d*s,p),i.update(c,r,p))}function u(d,c,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,c,0,n,d,0,p);let g=0;for(let M=0;M<p;M++)g+=c[M];i.update(g,r,1)}this.setMode=a,this.setIndex=o,this.render=l,this.renderInstances=h,this.renderMultiDraw=u}function vd(t){let e={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function r(n,s,o){switch(i.calls++,s){case t.TRIANGLES:i.triangles+=n/3*o;break;case t.LINES:i.lines+=n/2*o;break;case t.LINE_STRIP:i.lines+=o*(n-1);break;case t.LINE_LOOP:i.lines+=o*n;break;case t.POINTS:i.points+=o*n;break;default:Fe("WebGLInfo: Unknown draw mode:",s)}}function a(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:e,render:i,programs:null,autoReset:!0,reset:a,update:r}}function _d(t,e,i){let r=new WeakMap,a=new ht;function n(s,o,l){let h=s.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u===void 0?0:u.length,c=r.get(o);if(c===void 0||c.count!==d){let S=function(){R.dispose(),r.delete(o),o.removeEventListener("dispose",S)};c!==void 0&&c.texture.dispose();let p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,M=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],T=o.morphAttributes.color||[],w=0;p===!0&&(w=1),g===!0&&(w=2),M===!0&&(w=3);let _=o.attributes.position.count*w,E=1;_>e.maxTextureSize&&(E=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let A=new Float32Array(_*E*4*d),R=new Fo(A,_,E,d);R.type=pr,R.needsUpdate=!0;let v=w*4;for(let B=0;B<d;B++){let P=m[B],O=f[B],X=T[B],N=_*E*4*B;for(let V=0;V<P.count;V++){let J=V*v;p===!0&&(a.fromBufferAttribute(P,V),A[N+J+0]=a.x,A[N+J+1]=a.y,A[N+J+2]=a.z,A[N+J+3]=0),g===!0&&(a.fromBufferAttribute(O,V),A[N+J+4]=a.x,A[N+J+5]=a.y,A[N+J+6]=a.z,A[N+J+7]=0),M===!0&&(a.fromBufferAttribute(X,V),A[N+J+8]=a.x,A[N+J+9]=a.y,A[N+J+10]=a.z,A[N+J+11]=X.itemSize===4?a.w:1)}}c={count:d,texture:R,size:new he(_,E)},r.set(o,c),o.addEventListener("dispose",S)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",s.morphTexture,i);else{let p=0;for(let M=0;M<h.length;M++)p+=h[M];let g=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(t,"morphTargetBaseInfluence",g),l.getUniforms().setValue(t,"morphTargetInfluences",h)}l.getUniforms().setValue(t,"morphTargetsTexture",c.texture,i),l.getUniforms().setValue(t,"morphTargetsTextureSize",c.size)}return{update:n}}function xd(t,e,i,r,a){let n=new WeakMap;function s(h){let u=a.render.frame,d=h.geometry,c=e.get(h,d);if(n.get(c)!==u&&(e.update(c),n.set(c,u)),h.isInstancedMesh&&(h.hasEventListener("dispose",l)===!1&&h.addEventListener("dispose",l),n.get(h)!==u&&(i.update(h.instanceMatrix,t.ARRAY_BUFFER),h.instanceColor!==null&&i.update(h.instanceColor,t.ARRAY_BUFFER),n.set(h,u))),h.isSkinnedMesh){let p=h.skeleton;n.get(p)!==u&&(p.update(),n.set(p,u))}return c}function o(){n=new WeakMap}function l(h){let u=h.target;u.removeEventListener("dispose",l),r.releaseStatesOfObject(u),i.remove(u.instanceMatrix),u.instanceColor!==null&&i.remove(u.instanceColor)}return{update:s,dispose:o}}var yd={1:"LINEAR_TONE_MAPPING",2:"REINHARD_TONE_MAPPING",3:"CINEON_TONE_MAPPING",4:"ACES_FILMIC_TONE_MAPPING",6:"AGX_TONE_MAPPING",7:"NEUTRAL_TONE_MAPPING",5:"CUSTOM_TONE_MAPPING"};function Md(t,e,i,r,a,n){let s=new jt(e,i,{type:t,depthBuffer:a,stencilBuffer:n,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,h=new St;h.setAttribute("position",new tt([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new tt([0,2,0,0,2,0],2));let u=new _c({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new zt(h,u),c=new kn(-1,1,1,-1,0,1),p=null,g=null,M=!1,m,f=null,T=[],w=!1;this.setSize=function(_,E){s.setSize(_,E),o!==null&&o.setSize(_,E),l!==null&&l.setSize(_,E);for(let A=0;A<T.length;A++){let R=T[A];R.setSize&&R.setSize(_,E)}},this.setEffects=function(_){T=_,w=T.length>0&&T[0].isRenderPass===!0;let E=s.width,A=s.height;T.length>0&&o===null&&(o=new jt(E,A,{type:Ti,depthBuffer:!1,stencilBuffer:!1}),l=new jt(E,A,{type:Ti,depthBuffer:!1,stencilBuffer:!1}));for(let R=0;R<T.length;R++){let v=T[R];v.setSize&&v.setSize(E,A)}},this.begin=function(_,E){if(M||_.toneMapping===0&&T.length===0)return!1;if(f=E,E!==null){let A=E.width,R=E.height;(s.width!==A||s.height!==R)&&this.setSize(A,R)}return w===!1&&_.setRenderTarget(s),m=_.toneMapping,_.toneMapping=0,!0},this.hasRenderPass=function(){return w},this.end=function(_,E){_.toneMapping=m,M=!0;let A=s,R=o;for(let v=0;v<T.length;v++){let S=T[v];S.enabled!==!1&&(S.render(_,R,A,E),S.needsSwap!==!1&&(A=R,R=R===o?l:o))}if(p!==_.outputColorSpace||g!==_.toneMapping){p=_.outputColorSpace,g=_.toneMapping,u.defines={},Ke.getTransfer(p)==="srgb"&&(u.defines.SRGB_TRANSFER="");let v=yd[g];v&&(u.defines[v]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=A.texture,_.setRenderTarget(f),_.render(d,c),f=null,M=!1},this.isCompositing=function(){return M},this.dispose=function(){s.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),h.dispose(),u.dispose()}}var Rl=new Dt,Pn=new Dr(1,1),Cl=new Fo,Pl=new su,Ll=new Jo,ao=[],no=[],so=new Float32Array(16),oo=new Float32Array(9),lo=new Float32Array(4);function fr(t,e,i){let r=t[0];if(r<=0||r>0)return t;let a=e*i,n=ao[a];if(n===void 0&&(n=new Float32Array(a),ao[a]=n),e!==0){r.toArray(n,0);for(let s=1,o=0;s!==e;++s)o+=i,t[s].toArray(n,o)}return n}function _t(t,e){if(t.length!==e.length)return!1;for(let i=0,r=t.length;i<r;i++)if(t[i]!==e[i])return!1;return!0}function xt(t,e){for(let i=0,r=e.length;i<r;i++)t[i]=e[i]}function Ia(t,e){let i=no[e];i===void 0&&(i=new Int32Array(e),no[e]=i);for(let r=0;r!==e;++r)i[r]=t.allocateTextureUnit();return i}function Sd(t,e){let i=this.cache;i[0]!==e&&(t.uniform1f(this.addr,e),i[0]=e)}function bd(t,e){let i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(_t(i,e))return;t.uniform2fv(this.addr,e),xt(i,e)}}function Td(t,e){let i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else if(e.r!==void 0)(i[0]!==e.r||i[1]!==e.g||i[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),i[0]=e.r,i[1]=e.g,i[2]=e.b);else{if(_t(i,e))return;t.uniform3fv(this.addr,e),xt(i,e)}}function Ed(t,e){let i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(_t(i,e))return;t.uniform4fv(this.addr,e),xt(i,e)}}function wd(t,e){let i=this.cache,r=e.elements;if(r===void 0){if(_t(i,e))return;t.uniformMatrix2fv(this.addr,!1,e),xt(i,e)}else{if(_t(i,r))return;lo.set(r),t.uniformMatrix2fv(this.addr,!1,lo),xt(i,r)}}function Ad(t,e){let i=this.cache,r=e.elements;if(r===void 0){if(_t(i,e))return;t.uniformMatrix3fv(this.addr,!1,e),xt(i,e)}else{if(_t(i,r))return;oo.set(r),t.uniformMatrix3fv(this.addr,!1,oo),xt(i,r)}}function Rd(t,e){let i=this.cache,r=e.elements;if(r===void 0){if(_t(i,e))return;t.uniformMatrix4fv(this.addr,!1,e),xt(i,e)}else{if(_t(i,r))return;so.set(r),t.uniformMatrix4fv(this.addr,!1,so),xt(i,r)}}function Cd(t,e){let i=this.cache;i[0]!==e&&(t.uniform1i(this.addr,e),i[0]=e)}function Pd(t,e){let i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(_t(i,e))return;t.uniform2iv(this.addr,e),xt(i,e)}}function Ld(t,e){let i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(_t(i,e))return;t.uniform3iv(this.addr,e),xt(i,e)}}function Nd(t,e){let i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(_t(i,e))return;t.uniform4iv(this.addr,e),xt(i,e)}}function Id(t,e){let i=this.cache;i[0]!==e&&(t.uniform1ui(this.addr,e),i[0]=e)}function Ud(t,e){let i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(_t(i,e))return;t.uniform2uiv(this.addr,e),xt(i,e)}}function Dd(t,e){let i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(_t(i,e))return;t.uniform3uiv(this.addr,e),xt(i,e)}}function Od(t,e){let i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(_t(i,e))return;t.uniform4uiv(this.addr,e),xt(i,e)}}function Fd(t,e,i){let r=this.cache,a=i.allocateTextureUnit();r[0]!==a&&(t.uniform1i(this.addr,a),r[0]=a);let n;this.type===t.SAMPLER_2D_SHADOW?(Pn.compareFunction=i.isReversedDepthBuffer()?518:515,n=Pn):n=Rl,i.setTexture2D(e||n,a)}function Bd(t,e,i){let r=this.cache,a=i.allocateTextureUnit();r[0]!==a&&(t.uniform1i(this.addr,a),r[0]=a),i.setTexture3D(e||Pl,a)}function zd(t,e,i){let r=this.cache,a=i.allocateTextureUnit();r[0]!==a&&(t.uniform1i(this.addr,a),r[0]=a),i.setTextureCube(e||Ll,a)}function Vd(t,e,i){let r=this.cache,a=i.allocateTextureUnit();r[0]!==a&&(t.uniform1i(this.addr,a),r[0]=a),i.setTexture2DArray(e||Cl,a)}function Hd(t){switch(t){case 5126:return Sd;case 35664:return bd;case 35665:return Td;case 35666:return Ed;case 35674:return wd;case 35675:return Ad;case 35676:return Rd;case 5124:case 35670:return Cd;case 35667:case 35671:return Pd;case 35668:case 35672:return Ld;case 35669:case 35673:return Nd;case 5125:return Id;case 36294:return Ud;case 36295:return Dd;case 36296:return Od;case 35678:case 36198:case 36298:case 36306:case 35682:return Fd;case 35679:case 36299:case 36307:return Bd;case 35680:case 36300:case 36308:case 36293:return zd;case 36289:case 36303:case 36311:case 36292:return Vd}}function Gd(t,e){t.uniform1fv(this.addr,e)}function kd(t,e){let i=fr(e,this.size,2);t.uniform2fv(this.addr,i)}function Wd(t,e){let i=fr(e,this.size,3);t.uniform3fv(this.addr,i)}function Xd(t,e){let i=fr(e,this.size,4);t.uniform4fv(this.addr,i)}function jd(t,e){let i=fr(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,i)}function qd(t,e){let i=fr(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,i)}function Yd(t,e){let i=fr(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,i)}function Jd(t,e){t.uniform1iv(this.addr,e)}function Zd(t,e){t.uniform2iv(this.addr,e)}function Kd(t,e){t.uniform3iv(this.addr,e)}function $d(t,e){t.uniform4iv(this.addr,e)}function Qd(t,e){t.uniform1uiv(this.addr,e)}function ep(t,e){t.uniform2uiv(this.addr,e)}function tp(t,e){t.uniform3uiv(this.addr,e)}function ip(t,e){t.uniform4uiv(this.addr,e)}function rp(t,e,i){let r=this.cache,a=e.length,n=Ia(i,a);_t(r,n)||(t.uniform1iv(this.addr,n),xt(r,n));let s;s=this.type===t.SAMPLER_2D_SHADOW?Pn:Rl;for(let o=0;o!==a;++o)i.setTexture2D(e[o]||s,n[o])}function ap(t,e,i){let r=this.cache,a=e.length,n=Ia(i,a);_t(r,n)||(t.uniform1iv(this.addr,n),xt(r,n));for(let s=0;s!==a;++s)i.setTexture3D(e[s]||Pl,n[s])}function np(t,e,i){let r=this.cache,a=e.length,n=Ia(i,a);_t(r,n)||(t.uniform1iv(this.addr,n),xt(r,n));for(let s=0;s!==a;++s)i.setTextureCube(e[s]||Ll,n[s])}function sp(t,e,i){let r=this.cache,a=e.length,n=Ia(i,a);_t(r,n)||(t.uniform1iv(this.addr,n),xt(r,n));for(let s=0;s!==a;++s)i.setTexture2DArray(e[s]||Cl,n[s])}function op(t){switch(t){case 5126:return Gd;case 35664:return kd;case 35665:return Wd;case 35666:return Xd;case 35674:return jd;case 35675:return qd;case 35676:return Yd;case 5124:case 35670:return Jd;case 35667:case 35671:return Zd;case 35668:case 35672:return Kd;case 35669:case 35673:return $d;case 5125:return Qd;case 36294:return ep;case 36295:return tp;case 36296:return ip;case 35678:case 36198:case 36298:case 36306:case 35682:return rp;case 35679:case 36299:case 36307:return ap;case 35680:case 36300:case 36308:case 36293:return np;case 36289:case 36303:case 36311:case 36292:return sp}}var lp=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Hd(e.type)}},hp=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=op(e.type)}},up=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let r=this.seq;for(let a=0,n=r.length;a!==n;++a){let s=r[a];s.setValue(t,e[s.id],i)}}},vn=/(\w+)(\])?(\[|\.)?/g;function ho(t,e){t.seq.push(e),t.map[e.id]=e}function cp(t,e,i){let r=t.name,a=r.length;for(vn.lastIndex=0;;){let n=vn.exec(r),s=vn.lastIndex,o=n[1],l=n[2]==="]",h=n[3];if(l&&(o|=0),h===void 0||h==="["&&s+2===a){ho(i,h===void 0?new lp(o,t,e):new hp(o,t,e));break}{let u=i.map[o];u===void 0&&(u=new up(o),ho(i,u)),i=u}}}var ba=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let n=0;n<i;++n){let s=t.getActiveUniform(e,n);cp(s,t.getUniformLocation(e,s.name),this)}let r=[],a=[];for(let n of this.seq)n.type===t.SAMPLER_2D_SHADOW||n.type===t.SAMPLER_CUBE_SHADOW||n.type===t.SAMPLER_2D_ARRAY_SHADOW?r.push(n):a.push(n);r.length>0&&(this.seq=r.concat(a))}setValue(t,e,i,r){let a=this.map[e];a!==void 0&&a.setValue(t,i,r)}setOptional(t,e,i){let r=e[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,e,i,r){for(let a=0,n=e.length;a!==n;++a){let s=e[a],o=i[s.id];o.needsUpdate!==!1&&s.setValue(t,o.value,r)}}static seqWithValue(t,e){let i=[];for(let r=0,a=t.length;r!==a;++r){let n=t[r];n.id in e&&i.push(n)}return i}};function uo(t,e,i){let r=t.createShader(e);return t.shaderSource(r,i),t.compileShader(r),r}var dp=37297,pp=0;function fp(t,e){let i=t.split(`
`),r=[],a=Math.max(e-6,0),n=Math.min(e+6,i.length);for(let s=a;s<n;s++){let o=s+1;r.push(`${o===e?">":" "} ${o}: ${i[s]}`)}return r.join(`
`)}var co=new We;function mp(t){Ke._getMatrix(co,Ke.workingColorSpace,t);let e=`mat3( ${co.elements.map(i=>i.toFixed(4))} )`;switch(Ke.getTransfer(t)){case wa:return[e,"LinearTransferOETF"];case Aa:return[e,"sRGBTransferOETF"];default:return we("WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function po(t,e,i){let r=t.getShaderParameter(e,t.COMPILE_STATUS),a=(t.getShaderInfoLog(e)||"").trim();if(r&&a==="")return"";let n=/ERROR: 0:(\d+)/.exec(a);if(n){let s=parseInt(n[1]);return i.toUpperCase()+`

`+a+`

`+fp(t.getShaderSource(e),s)}return a}function gp(t,e){let i=mp(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}var vp={1:"Linear",2:"Reinhard",3:"Cineon",4:"ACESFilmic",6:"AgX",7:"Neutral",5:"Custom"};function _p(t,e){let i=vp[e];return i===void 0?(we("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+t+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+t+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}var xa=new I;function xp(){return Ke.getLuminanceCoefficients(xa),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${xa.x.toFixed(4)}, ${xa.y.toFixed(4)}, ${xa.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function yp(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Rr).join(`
`)}function Mp(t){let e=[];for(let i in t){let r=t[i];r!==!1&&e.push("#define "+i+" "+r)}return e.join(`
`)}function Sp(t,e){let i={},r=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let a=0;a<r;a++){let n=t.getActiveAttrib(e,a),s=n.name,o=1;n.type===t.FLOAT_MAT2&&(o=2),n.type===t.FLOAT_MAT3&&(o=3),n.type===t.FLOAT_MAT4&&(o=4),i[s]={type:n.type,location:t.getAttribLocation(e,s),locationSize:o}}return i}function Rr(t){return t!==""}function fo(t,e){let i=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function mo(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var bp=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ln(t){return t.replace(bp,Ep)}var Tp=new Map;function Ep(t,e){let i=je[e];if(i===void 0){let r=Tp.get(e);if(r!==void 0)i=je[r],we('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Ln(i)}var wp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function go(t){return t.replace(wp,Ap)}function Ap(t,e,i,r){let a="";for(let n=parseInt(e);n<parseInt(i);n++)a+=r.replace(/\[\s*i\s*\]/g,"[ "+n+" ]").replace(/UNROLLED_LOOP_INDEX/g,n);return a}function vo(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var Rp={1:"SHADOWMAP_TYPE_PCF",3:"SHADOWMAP_TYPE_VSM"};function Cp(t){return Rp[t.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Pp={301:"ENVMAP_TYPE_CUBE",302:"ENVMAP_TYPE_CUBE",306:"ENVMAP_TYPE_CUBE_UV"};function Lp(t){return t.envMap===!1?"ENVMAP_TYPE_CUBE":Pp[t.envMapMode]||"ENVMAP_TYPE_CUBE"}var Np={302:"ENVMAP_MODE_REFRACTION"};function Ip(t){return t.envMap===!1?"ENVMAP_MODE_REFLECTION":Np[t.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Up={0:"ENVMAP_BLENDING_MULTIPLY",1:"ENVMAP_BLENDING_MIX",2:"ENVMAP_BLENDING_ADD"};function Dp(t){return t.envMap===!1?"ENVMAP_BLENDING_NONE":Up[t.combine]||"ENVMAP_BLENDING_NONE"}function Op(t){let e=t.envMapCubeUVHeight;if(e===null)return null;let i=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(2**i,112)),texelHeight:r,maxMip:i}}function Fp(t,e,i,r){let a=t.getContext(),n=i.defines,s=i.vertexShader,o=i.fragmentShader,l=Cp(i),h=Lp(i),u=Ip(i),d=Dp(i),c=Op(i),p=yp(i),g=Mp(n),M=a.createProgram(),m,f,T=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(m=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,g].filter(Rr).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,g].filter(Rr).join(`
`),f.length>0&&(f+=`
`)):(m=[vo(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,g,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+u:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexNormals?"#define HAS_NORMAL":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+l:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Rr).join(`
`),f=[vo(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,g,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+h:"",i.envMap?"#define "+u:"",i.envMap?"#define "+d:"",c?"#define CUBEUV_TEXEL_WIDTH "+c.texelWidth:"",c?"#define CUBEUV_TEXEL_HEIGHT "+c.texelHeight:"",c?"#define CUBEUV_MAX_MIP "+c.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.retroreflection?"#define USE_RETROREFLECTION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas||i.batchingColor?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+l:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping===0?"":"#define TONE_MAPPING",i.toneMapping===0?"":je.tonemapping_pars_fragment,i.toneMapping===0?"":_p("toneMapping",i.toneMapping),i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,gp("linearToOutputTexel",i.outputColorSpace),xp(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(Rr).join(`
`)),s=Ln(s),s=fo(s,i),s=mo(s,i),o=Ln(o),o=fo(o,i),o=mo(o,i),s=go(s),o=go(o),i.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",i.glslVersion==="300 es"?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion==="300 es"?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let w=T+m+s,_=T+f+o,E=uo(a,a.VERTEX_SHADER,w),A=uo(a,a.FRAGMENT_SHADER,_);a.attachShader(M,E),a.attachShader(M,A),i.index0AttributeName===void 0?i.hasPositionAttribute===!0&&a.bindAttribLocation(M,0,"position"):a.bindAttribLocation(M,0,i.index0AttributeName),a.linkProgram(M);function R(P){if(t.debug.checkShaderErrors){let O=a.getProgramInfoLog(M)||"",X=a.getShaderInfoLog(E)||"",N=a.getShaderInfoLog(A)||"",V=O.trim(),J=X.trim(),G=N.trim(),oe=!0,j=!0;if(a.getProgramParameter(M,a.LINK_STATUS)===!1)if(oe=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(a,M,E,A);else{let Y=po(a,E,"vertex"),Q=po(a,A,"fragment");Fe("WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(M,a.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+V+`
`+Y+`
`+Q)}else V===""?(J===""||G==="")&&(j=!1):we("WebGLProgram: Program Info Log:",V);j&&(P.diagnostics={runnable:oe,programLog:V,vertexShader:{log:J,prefix:m},fragmentShader:{log:G,prefix:f}})}a.deleteShader(E),a.deleteShader(A),v=new ba(a,M),S=Sp(a,M)}let v;this.getUniforms=function(){return v===void 0&&R(this),v};let S;this.getAttributes=function(){return S===void 0&&R(this),S};let B=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return B===!1&&(B=a.getProgramParameter(M,dp)),B},this.destroy=function(){r.releaseStatesOfProgram(this),a.deleteProgram(M),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=pp++,this.cacheKey=e,this.usedTimes=1,this.program=M,this.vertexShader=E,this.fragmentShader=A,this}var Bp=0,zp=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){let r=this._getShaderCacheForMaterial(t);return r.has(e)===!1&&(r.add(e),e.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new Vp(t),e.set(t,i)),i}},Vp=class{constructor(t){this.id=Bp++,this.code=t,this.usedTimes=0}};function Hp(t){return t===1030||t===37490||t===36285}function Gp(t,e,i,r,a,n){let s=new Dn,o=new zp,l=new Set,h=[],u=new Map,d=r.logarithmicDepthBuffer,c=r.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return l.add(v),v===0?"uv":`uv${v}`}function M(v,S,B,P,O,X){let N=P.fog,V=O.geometry,J=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?P.environment:null,G=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,oe=e.get(v.envMap||J,G),j=oe&&oe.mapping===306?oe.image.height:null,Y=p[v.type];v.precision!==null&&(c=r.getMaxPrecision(v.precision),c!==v.precision&&we("WebGLProgram.getParameters:",v.precision,"not supported, using",c,"instead."));let Q=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,ze=Q===void 0?0:Q.length,Ae=0;V.morphAttributes.position!==void 0&&(Ae=1),V.morphAttributes.normal!==void 0&&(Ae=2),V.morphAttributes.color!==void 0&&(Ae=3);let nt,Ve,q,ie;if(Y){let vt=$t[Y];nt=vt.vertexShader,Ve=vt.fragmentShader}else{nt=v.vertexShader,Ve=v.fragmentShader;let vt=o.getVertexShaderStage(v),rt=o.getFragmentShaderStage(v);o.update(v,vt,rt),q=vt.id,ie=rt.id}let ne=t.getRenderTarget(),Ce=t.state.buffers.depth.getReversed(),Ue=O.isInstancedMesh===!0,de=O.isBatchedMesh===!0,qe=!!v.map,ee=!!v.matcap,Z=!!oe,se=!!v.aoMap,ye=!!v.lightMap,ve=!!v.bumpMap&&v.wireframe===!1,Re=!!v.normalMap,Ie=!!v.displacementMap,He=!!v.emissiveMap,Ge=!!v.metalnessMap,C=!!v.roughnessMap,ct=v.anisotropy>0,$e=v.clearcoat>0,Ze=v.dispersion>0,b=v.retroreflectivity>0,x=v.iridescence>0,L=v.sheen>0,k=v.transmission>0,$=ct&&!!v.anisotropyMap,ce=$e&&!!v.clearcoatMap,pe=$e&&!!v.clearcoatNormalMap,F=$e&&!!v.clearcoatRoughnessMap,le=x&&!!v.iridescenceMap,me=x&&!!v.iridescenceThicknessMap,Se=L&&!!v.sheenColorMap,re=L&&!!v.sheenRoughnessMap,Le=!!v.specularMap,Ne=!!v.specularColorMap,Be=!!v.specularIntensityMap,it=k&&!!v.transmissionMap,D=k&&!!v.thicknessMap,K=!!v.gradientMap,te=!!v.alphaMap,xe=v.alphaTest>0,Ee=!!v.alphaHash,ae=!!v.extensions,_e=0;v.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(_e=t.toneMapping);let Oe={shaderID:Y,shaderType:v.type,shaderName:v.name,vertexShader:nt,fragmentShader:Ve,defines:v.defines,customVertexShaderID:q,customFragmentShaderID:ie,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:c,batching:de,batchingColor:de&&O._colorsTexture!==null,instancing:Ue,instancingColor:Ue&&O.instanceColor!==null,instancingMorph:Ue&&O.morphTexture!==null,outputColorSpace:ne===null?t.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:Ke.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:qe,matcap:ee,envMap:Z,envMapMode:Z&&oe.mapping,envMapCubeUVHeight:j,aoMap:se,lightMap:ye,bumpMap:ve,normalMap:Re,displacementMap:Ie,emissiveMap:He,normalMapObjectSpace:Re&&v.normalMapType===1,normalMapTangentSpace:Re&&v.normalMapType===0,packedNormalMap:Re&&v.normalMapType===0&&Hp(v.normalMap.format),metalnessMap:Ge,roughnessMap:C,anisotropy:ct,anisotropyMap:$,clearcoat:$e,clearcoatMap:ce,clearcoatNormalMap:pe,clearcoatRoughnessMap:F,dispersion:Ze,retroreflection:b,iridescence:x,iridescenceMap:le,iridescenceThicknessMap:me,sheen:L,sheenColorMap:Se,sheenRoughnessMap:re,specularMap:Le,specularColorMap:Ne,specularIntensityMap:Be,transmission:k,transmissionMap:it,thicknessMap:D,gradientMap:K,opaque:v.transparent===!1&&v.blending===1&&v.alphaToCoverage===!1,alphaMap:te,alphaTest:xe,alphaHash:Ee,combine:v.combine,mapUv:qe&&g(v.map.channel),aoMapUv:se&&g(v.aoMap.channel),lightMapUv:ye&&g(v.lightMap.channel),bumpMapUv:ve&&g(v.bumpMap.channel),normalMapUv:Re&&g(v.normalMap.channel),displacementMapUv:Ie&&g(v.displacementMap.channel),emissiveMapUv:He&&g(v.emissiveMap.channel),metalnessMapUv:Ge&&g(v.metalnessMap.channel),roughnessMapUv:C&&g(v.roughnessMap.channel),anisotropyMapUv:$&&g(v.anisotropyMap.channel),clearcoatMapUv:ce&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:pe&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:F&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:le&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:me&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:Se&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:re&&g(v.sheenRoughnessMap.channel),specularMapUv:Le&&g(v.specularMap.channel),specularColorMapUv:Ne&&g(v.specularColorMap.channel),specularIntensityMapUv:Be&&g(v.specularIntensityMap.channel),transmissionMapUv:it&&g(v.transmissionMap.channel),thicknessMapUv:D&&g(v.thicknessMap.channel),alphaMapUv:te&&g(v.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(Re||ct),vertexNormals:!!V.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!V.attributes.uv&&(qe||te),fog:!!N,useFog:v.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||V.attributes.normal===void 0&&Re===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Ce,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:V.attributes.position!==void 0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:ze,morphTextureStride:Ae,numSunLights:S.sun.length,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numSunLightShadows:S.sunShadowMap.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:X.length,numClippingPlanes:n.numPlanes,numClipIntersection:n.numIntersection,dithering:v.dithering,shadowMapEnabled:t.shadowMap.enabled&&B.length>0,shadowMapType:t.shadowMap.type,toneMapping:_e,decodeVideoTexture:qe&&v.map.isVideoTexture===!0&&Ke.getTransfer(v.map.colorSpace)==="srgb",decodeVideoTextureEmissive:He&&v.emissiveMap.isVideoTexture===!0&&Ke.getTransfer(v.emissiveMap.colorSpace)==="srgb",premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===2,flipSided:v.side===1,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:ae&&v.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ae&&v.extensions.multiDraw===!0||de)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Oe.vertexUv1s=l.has(1),Oe.vertexUv2s=l.has(2),Oe.vertexUv3s=l.has(3),l.clear(),Oe}function m(v){let S=[];if(v.shaderID?S.push(v.shaderID):(S.push(v.customVertexShaderID),S.push(v.customFragmentShaderID)),v.defines!==void 0)for(let B in v.defines)S.push(B),S.push(v.defines[B]);return v.isRawShaderMaterial===!1&&(f(S,v),T(S,v),S.push(t.outputColorSpace)),S.push(v.customProgramCacheKey),S.join()}function f(v,S){v.push(S.precision),v.push(S.outputColorSpace),v.push(S.envMapMode),v.push(S.envMapCubeUVHeight),v.push(S.mapUv),v.push(S.alphaMapUv),v.push(S.lightMapUv),v.push(S.aoMapUv),v.push(S.bumpMapUv),v.push(S.normalMapUv),v.push(S.displacementMapUv),v.push(S.emissiveMapUv),v.push(S.metalnessMapUv),v.push(S.roughnessMapUv),v.push(S.anisotropyMapUv),v.push(S.clearcoatMapUv),v.push(S.clearcoatNormalMapUv),v.push(S.clearcoatRoughnessMapUv),v.push(S.iridescenceMapUv),v.push(S.iridescenceThicknessMapUv),v.push(S.sheenColorMapUv),v.push(S.sheenRoughnessMapUv),v.push(S.specularMapUv),v.push(S.specularColorMapUv),v.push(S.specularIntensityMapUv),v.push(S.transmissionMapUv),v.push(S.thicknessMapUv),v.push(S.combine),v.push(S.fogExp2),v.push(S.sizeAttenuation),v.push(S.morphTargetsCount),v.push(S.morphAttributeCount),v.push(S.numSunLights),v.push(S.numDirLights),v.push(S.numPointLights),v.push(S.numSpotLights),v.push(S.numSpotLightMaps),v.push(S.numHemiLights),v.push(S.numRectAreaLights),v.push(S.numSunLightShadows),v.push(S.numDirLightShadows),v.push(S.numPointLightShadows),v.push(S.numSpotLightShadows),v.push(S.numSpotLightShadowsWithMaps),v.push(S.numLightProbes),v.push(S.shadowMapType),v.push(S.toneMapping),v.push(S.numClippingPlanes),v.push(S.numClipIntersection),v.push(S.depthPacking)}function T(v,S){s.disableAll(),S.instancing&&s.enable(0),S.instancingColor&&s.enable(1),S.instancingMorph&&s.enable(2),S.matcap&&s.enable(3),S.envMap&&s.enable(4),S.normalMapObjectSpace&&s.enable(5),S.normalMapTangentSpace&&s.enable(6),S.clearcoat&&s.enable(7),S.iridescence&&s.enable(8),S.alphaTest&&s.enable(9),S.vertexColors&&s.enable(10),S.vertexAlphas&&s.enable(11),S.vertexUv1s&&s.enable(12),S.vertexUv2s&&s.enable(13),S.vertexUv3s&&s.enable(14),S.vertexTangents&&s.enable(15),S.anisotropy&&s.enable(16),S.alphaHash&&s.enable(17),S.batching&&s.enable(18),S.dispersion&&s.enable(19),S.retroreflection&&s.enable(24),S.batchingColor&&s.enable(20),S.gradientMap&&s.enable(21),S.packedNormalMap&&s.enable(22),S.vertexNormals&&s.enable(23),v.push(s.mask),s.disableAll(),S.fog&&s.enable(0),S.useFog&&s.enable(1),S.flatShading&&s.enable(2),S.logarithmicDepthBuffer&&s.enable(3),S.reversedDepthBuffer&&s.enable(4),S.skinning&&s.enable(5),S.morphTargets&&s.enable(6),S.morphNormals&&s.enable(7),S.morphColors&&s.enable(8),S.premultipliedAlpha&&s.enable(9),S.shadowMapEnabled&&s.enable(10),S.doubleSided&&s.enable(11),S.flipSided&&s.enable(12),S.useDepthPacking&&s.enable(13),S.dithering&&s.enable(14),S.transmission&&s.enable(15),S.sheen&&s.enable(16),S.opaque&&s.enable(17),S.pointsUvs&&s.enable(18),S.decodeVideoTexture&&s.enable(19),S.decodeVideoTextureEmissive&&s.enable(20),S.alphaToCoverage&&s.enable(21),S.numLightProbeGrids>0&&s.enable(22),S.hasPositionAttribute&&s.enable(23),v.push(s.mask)}function w(v){let S=p[v.type],B;if(S){let P=$t[S];B=mc.clone(P.uniforms)}else B=v.uniforms;return B}function _(v,S){let B=u.get(S);return B===void 0?(B=new Fp(t,S,v,a),h.push(B),u.set(S,B)):++B.usedTimes,B}function E(v){if(--v.usedTimes===0){let S=h.indexOf(v);h[S]=h[h.length-1],h.pop(),u.delete(v.cacheKey),v.destroy()}}function A(v){o.remove(v)}function R(){o.dispose()}return{getParameters:M,getProgramCacheKey:m,getUniforms:w,acquireProgram:_,releaseProgram:E,releaseShaderCache:A,programs:h,dispose:R}}function kp(){let t=new WeakMap;function e(s){return t.has(s)}function i(s){let o=t.get(s);return o===void 0&&(o={},t.set(s,o)),o}function r(s){t.delete(s)}function a(s,o,l){t.get(s)[o]=l}function n(){t=new WeakMap}return{has:e,get:i,remove:r,update:a,dispose:n}}function Wp(t,e){return t.groupOrder===e.groupOrder?t.renderOrder===e.renderOrder?t.material.id===e.material.id?t.materialVariant===e.materialVariant?t.z===e.z?t.id-e.id:t.z-e.z:t.materialVariant-e.materialVariant:t.material.id-e.material.id:t.renderOrder-e.renderOrder:t.groupOrder-e.groupOrder}function _o(t,e){return t.groupOrder===e.groupOrder?t.renderOrder===e.renderOrder?t.z===e.z?t.id-e.id:e.z-t.z:t.renderOrder-e.renderOrder:t.groupOrder-e.groupOrder}function xo(){let t=[],e=0,i=[],r=[],a=[];function n(){e=0,i.length=0,r.length=0,a.length=0}function s(c){let p=0;return c.isInstancedMesh&&(p+=2),c.isSkinnedMesh&&(p+=1),p}function o(c,p,g,M,m,f){let T=t[e];return T===void 0?(T={id:c.id,object:c,geometry:p,material:g,materialVariant:s(c),groupOrder:M,renderOrder:c.renderOrder,z:m,group:f},t[e]=T):(T.id=c.id,T.object=c,T.geometry=p,T.material=g,T.materialVariant=s(c),T.groupOrder=M,T.renderOrder=c.renderOrder,T.z=m,T.group=f),e++,T}function l(c,p,g,M,m,f,T){T.reversedDepth===!0&&(m=-m);let w=o(c,p,g,M,m,f);g.transmission>0?r.push(w):g.transparent===!0?a.push(w):i.push(w)}function h(c,p,g,M,m,f){let T=o(c,p,g,M,m,f);g.transmission>0?r.unshift(T):g.transparent===!0?a.unshift(T):i.unshift(T)}function u(c,p){i.length>1&&i.sort(c||Wp),r.length>1&&r.sort(p||_o),a.length>1&&a.sort(p||_o)}function d(){for(let c=e,p=t.length;c<p;c++){let g=t[c];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:i,transmissive:r,transparent:a,init:n,push:l,unshift:h,finish:d,sort:u}}function Xp(){let t=new WeakMap;function e(r,a){let n=t.get(r),s;return n===void 0?(s=new xo,t.set(r,[s])):a>=n.length?(s=new xo,n.push(s)):s=n[a],s}function i(){t=new WeakMap}return{get:e,dispose:i}}function jp(){let t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let i;switch(e.type){case"SunLight":case"DirectionalLight":i={direction:new I,color:new ke};break;case"SpotLight":i={position:new I,direction:new I,color:new ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new I,color:new ke,distance:0,decay:0};break;case"HemisphereLight":i={direction:new I,skyColor:new ke,groundColor:new ke};break;case"RectAreaLight":i={color:new ke,position:new I,halfWidth:new I,halfHeight:new I}}return t[e.id]=i,i}}}function qp(){let t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let i;switch(e.type){case"SunLight":case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he,shadowCameraNear:1,shadowCameraFar:1e3}}return t[e.id]=i,i}}}var Yp=0;function Jp(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+ +!!e.map-!!t.map}function Zp(t){let e=new jp,i=qp(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)r.probe.push(new I);let a=new I,n=new Je,s=new Je;function o(h){let u=0,d=0,c=0;for(let O=0;O<9;O++)r.probe[O].set(0,0,0);let p=0,g=0,M=0,m=0,f=0,T=0,w=0,_=0,E=0,A=0,R=0,v=0,S=0,B=0;h.sort(Jp);for(let O=0,X=h.length;O<X;O++){let N=h[O],V=N.color,J=N.intensity,G=N.distance,oe=null;if(N.shadow&&N.shadow.map&&(oe=N.shadow.map.texture.format===1030?N.shadow.map.texture:N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)u+=V.r*J,d+=V.g*J,c+=V.b*J;else if(N.isLightProbe){for(let j=0;j<9;j++)r.probe[j].addScaledVector(N.sh.coefficients[j],J);B++}else if(N.isSunLight){let j=e.get(N);if(j.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let Y=N.shadow,Q=i.get(N);Q.shadowIntensity=Y.intensity,Q.shadowBias=Y.bias,Q.shadowNormalBias=Y.normalBias,Q.shadowRadius=Y.radius,Q.shadowMapSize.copy(Y.mapSize).multiply(Y.getFrameExtents()),r.sunShadow[g]=Q,r.sunShadowMap[g]=oe;let ze=Y.getViewportCount();for(let Ae=0;Ae<ze;Ae++)r.sunShadowMatrix[M+Ae]=Y.getMatrix(Ae),r.sunShadowCascade[M+Ae]=Y._cascadeData[Ae];M+=ze,g++}r.sun[p]=j,p++}else if(N.isDirectionalLight){let j=e.get(N);if(j.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let Y=N.shadow,Q=i.get(N);Q.shadowIntensity=Y.intensity,Q.shadowBias=Y.bias,Q.shadowNormalBias=Y.normalBias,Q.shadowRadius=Y.radius,Q.shadowMapSize=Y.mapSize,r.directionalShadow[m]=Q,r.directionalShadowMap[m]=oe,r.directionalShadowMatrix[m]=N.shadow.matrix,E++}r.directional[m]=j,m++}else if(N.isSpotLight){let j=e.get(N);j.position.setFromMatrixPosition(N.matrixWorld),j.color.copy(V).multiplyScalar(J),j.distance=G,j.coneCos=Math.cos(N.angle),j.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),j.decay=N.decay,r.spot[T]=j;let Y=N.shadow;if(N.map&&(r.spotLightMap[v]=N.map,v++,Y.updateMatrices(N),N.castShadow&&S++),r.spotLightMatrix[T]=Y.matrix,N.castShadow){let Q=i.get(N);Q.shadowIntensity=Y.intensity,Q.shadowBias=Y.bias,Q.shadowNormalBias=Y.normalBias,Q.shadowRadius=Y.radius,Q.shadowMapSize=Y.mapSize,r.spotShadow[T]=Q,r.spotShadowMap[T]=oe,R++}T++}else if(N.isRectAreaLight){let j=e.get(N);j.color.copy(V).multiplyScalar(J),j.halfWidth.set(N.width*.5,0,0),j.halfHeight.set(0,N.height*.5,0),r.rectArea[w]=j,w++}else if(N.isPointLight){let j=e.get(N);if(j.color.copy(N.color).multiplyScalar(N.intensity),j.distance=N.distance,j.decay=N.decay,N.castShadow){let Y=N.shadow,Q=i.get(N);Q.shadowIntensity=Y.intensity,Q.shadowBias=Y.bias,Q.shadowNormalBias=Y.normalBias,Q.shadowRadius=Y.radius,Q.shadowMapSize=Y.mapSize,Q.shadowCameraNear=Y.camera.near,Q.shadowCameraFar=Y.camera.far,r.pointShadow[f]=Q,r.pointShadowMap[f]=oe,r.pointShadowMatrix[f]=N.shadow.matrix,A++}r.point[f]=j,f++}else if(N.isHemisphereLight){let j=e.get(N);j.skyColor.copy(N.color).multiplyScalar(J),j.groundColor.copy(N.groundColor).multiplyScalar(J),r.hemi[_]=j,_++}}w>0&&(t.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=fe.LTC_FLOAT_1,r.rectAreaLTC2=fe.LTC_FLOAT_2):(r.rectAreaLTC1=fe.LTC_HALF_1,r.rectAreaLTC2=fe.LTC_HALF_2)),r.ambient[0]=u,r.ambient[1]=d,r.ambient[2]=c;let P=r.hash;(P.sunLength!==p||P.directionalLength!==m||P.pointLength!==f||P.spotLength!==T||P.rectAreaLength!==w||P.hemiLength!==_||P.numSunShadows!==g||P.numDirectionalShadows!==E||P.numPointShadows!==A||P.numSpotShadows!==R||P.numSpotMaps!==v||P.numLightProbes!==B)&&(r.sun.length=p,r.directional.length=m,r.spot.length=T,r.rectArea.length=w,r.point.length=f,r.hemi.length=_,r.sunShadow.length=g,r.sunShadowMap.length=g,r.sunShadowMatrix.length=M,r.sunShadowCascade.length=M,r.directionalShadow.length=E,r.directionalShadowMap.length=E,r.directionalShadowMatrix.length=E,r.pointShadow.length=A,r.pointShadowMap.length=A,r.pointShadowMatrix.length=A,r.spotShadow.length=R,r.spotShadowMap.length=R,r.spotLightMatrix.length=R+v-S,r.spotLightMap.length=v,r.numSpotLightShadowsWithMaps=S,r.numLightProbes=B,P.sunLength=p,P.directionalLength=m,P.pointLength=f,P.spotLength=T,P.rectAreaLength=w,P.hemiLength=_,P.numSunShadows=g,P.numDirectionalShadows=E,P.numPointShadows=A,P.numSpotShadows=R,P.numSpotMaps=v,P.numLightProbes=B,r.version=Yp++)}function l(h,u){let d=0,c=0,p=0,g=0,M=0,m=0,f=u.matrixWorldInverse;for(let T=0,w=h.length;T<w;T++){let _=h[T];if(_.isSunLight){let E=r.sun[d];E.direction.setFromMatrixPosition(_.matrixWorld),E.direction.transformDirection(f),d++}else if(_.isDirectionalLight){let E=r.directional[c];E.direction.setFromMatrixPosition(_.matrixWorld),a.setFromMatrixPosition(_.target.matrixWorld),E.direction.sub(a),E.direction.transformDirection(f),c++}else if(_.isSpotLight){let E=r.spot[g];E.position.setFromMatrixPosition(_.matrixWorld),E.position.applyMatrix4(f),E.direction.setFromMatrixPosition(_.matrixWorld),a.setFromMatrixPosition(_.target.matrixWorld),E.direction.sub(a),E.direction.transformDirection(f),g++}else if(_.isRectAreaLight){let E=r.rectArea[M];E.position.setFromMatrixPosition(_.matrixWorld),E.position.applyMatrix4(f),s.identity(),n.copy(_.matrixWorld),n.premultiply(f),s.extractRotation(n),E.halfWidth.set(_.width*.5,0,0),E.halfHeight.set(0,_.height*.5,0),E.halfWidth.applyMatrix4(s),E.halfHeight.applyMatrix4(s),M++}else if(_.isPointLight){let E=r.point[p];E.position.setFromMatrixPosition(_.matrixWorld),E.position.applyMatrix4(f),p++}else if(_.isHemisphereLight){let E=r.hemi[m];E.direction.setFromMatrixPosition(_.matrixWorld),E.direction.transformDirection(f),m++}}}return{setup:o,setupView:l,state:r}}function yo(t){let e=new Zp(t),i=[],r=[],a=[];function n(c){d.camera=c,i.length=0,r.length=0,a.length=0}function s(c){i.push(c)}function o(c){r.push(c)}function l(c){a.push(c)}function h(){e.setup(i)}function u(c){e.setupView(i,c)}let d={lightsArray:i,shadowsArray:r,lightProbeGridArray:a,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:n,state:d,setupLights:h,setupLightsView:u,pushLight:s,pushShadow:o,pushLightProbeGrid:l}}function Kp(t){let e=new WeakMap;function i(a,n=0){let s=e.get(a),o;return s===void 0?(o=new yo(t),e.set(a,[o])):n>=s.length?(o=new yo(t),s.push(o)):o=s[n],o}function r(){e=new WeakMap}return{get:i,dispose:r}}var $p=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Qp=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,ef=[new I(1,0,0),new I(-1,0,0),new I(0,1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1)],tf=[new I(0,-1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1),new I(0,-1,0),new I(0,-1,0)],Mo=new Je,wr=new I,_n=new I;function rf(t,e,i){let r=new Fn,a=new he,n=new he,s=new ht,o=new yc,l=new Mc,h={},u=i.maxTextureSize,d={0:1,1:0,2:2},c=new Qt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new he},radius:{value:4}},vertexShader:$p,fragmentShader:Qp}),p=c.clone();p.defines.HORIZONTAL_PASS=1;let g=new St;g.setAttribute("position",new qt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let M=new zt(g,c),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let f=this.type;this.render=function(A,R,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;this.type===2&&(we("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=1);let S=t.getRenderTarget(),B=t.getActiveCubeFace(),P=t.getActiveMipmapLevel(),O=t.state;O.setBlending(0),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let X=f!==this.type;X&&R.traverse(function(N){N.material&&(Array.isArray(N.material)?N.material.forEach(V=>V.needsUpdate=!0):N.material.needsUpdate=!0)});for(let N=0,V=A.length;N<V;N++){let J=A[N],G=J.shadow;if(G===void 0){we("WebGLShadowMap:",J,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;a.copy(G.mapSize);let oe=G.getFrameExtents();a.multiply(oe),n.copy(G.mapSize),(a.x>u||a.y>u)&&(a.x>u&&(n.x=Math.floor(u/oe.x),a.x=n.x*oe.x,G.mapSize.x=n.x),a.y>u&&(n.y=Math.floor(u/oe.y),a.y=n.y*oe.y,G.mapSize.y=n.y));let j=t.state.buffers.depth.getReversed();if(G.camera._reversedDepth=j,G.map===null||X===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===3){if(J.isPointLight){we("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new jt(a.x,a.y,{format:Ta,type:Ti,minFilter:Ut,magFilter:Ut,generateMipmaps:!1}),G.map.texture.name=J.name+".shadowMap",G.map.depthTexture=new Dr(a.x,a.y,pr),G.map.depthTexture.name=J.name+".shadowMapDepth",G.map.depthTexture.format=Ir,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Rt,G.map.depthTexture.magFilter=Rt}else J.isPointLight?(G.map=new Al(a.x),G.map.depthTexture=new Lu(a.x,Ui)):(G.map=new jt(a.x,a.y),G.map.depthTexture=new Dr(a.x,a.y,Ui)),G.map.depthTexture.name=J.name+".shadowMap",G.map.depthTexture.format=Ir,this.type===1?(G.map.depthTexture.compareFunction=j?518:515,G.map.depthTexture.minFilter=Ut,G.map.depthTexture.magFilter=Ut):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Rt,G.map.depthTexture.magFilter=Rt);G.camera.updateProjectionMatrix()}G.map.isWebGLCubeRenderTarget!==!0&&(G.map.width!==a.x||G.map.height!==a.y)&&G.map.setSize(a.x,a.y);let Y=G.map.isWebGLCubeRenderTarget?6:G.getViewportCount();J.isPointLight!==!0&&G.updateMatrices(J,v);for(let Q=0;Q<Y;Q++){let ze=G.getCamera(Q);if(J.isPointLight){let Ae=G.camera,nt=G.matrix,Ve=J.distance||Ae.far;Ve!==Ae.far&&(Ae.far=Ve,Ae.updateProjectionMatrix()),wr.setFromMatrixPosition(J.matrixWorld),Ae.position.copy(wr),_n.copy(Ae.position),_n.add(ef[Q]),Ae.up.copy(tf[Q]),Ae.lookAt(_n),Ae.updateMatrixWorld(),nt.makeTranslation(-wr.x,-wr.y,-wr.z),Mo.multiplyMatrices(Ae.projectionMatrix,Ae.matrixWorldInverse),G._frustum.setFromProjectionMatrix(Mo,Ae.coordinateSystem,Ae.reversedDepth)}if(G.map.isWebGLCubeRenderTarget)t.setRenderTarget(G.map,Q),t.clear();else{Q===0&&(t.setRenderTarget(G.map),t.clear());let Ae=G.getViewport(Q);s.set(n.x*Ae.x,n.y*Ae.y,n.x*Ae.z,n.y*Ae.w),O.viewport(s)}r=G.getFrustum(Q),_(R,v,ze,J,this.type)}G.isPointLightShadow!==!0&&this.type===3&&T(G,v),G.needsUpdate=!1}f=this.type,m.needsUpdate=!1,t.setRenderTarget(S,B,P)};function T(A,R){let v=e.update(M);c.defines.VSM_SAMPLES!==A.blurSamples&&(c.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,c.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null?A.mapPass=new jt(a.x,a.y,{format:Ta,type:Ti}):(A.mapPass.width!==A.map.width||A.mapPass.height!==A.map.height)&&A.mapPass.setSize(A.map.width,A.map.height),c.uniforms.shadow_pass.value=A.map.depthTexture,c.uniforms.resolution.value.set(A.map.width,A.map.height),c.uniforms.radius.value=A.radius,t.setRenderTarget(A.mapPass),t.clear(),t.renderBufferDirect(R,null,v,c,M,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value.set(A.map.width,A.map.height),p.uniforms.radius.value=A.radius,t.setRenderTarget(A.map),t.clear(),t.renderBufferDirect(R,null,v,p,M,null)}function w(A,R,v,S){let B=null,P=v.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(P!==void 0)B=P;else if(B=v.isPointLight===!0?l:o,t.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let O=B.uuid,X=R.uuid,N=h[O];N===void 0&&(N={},h[O]=N);let V=N[X];V===void 0&&(V=B.clone(),N[X]=V,R.addEventListener("dispose",E)),B=V}if(B.visible=R.visible,B.wireframe=R.wireframe,S===3?B.side=R.shadowSide===null?R.side:R.shadowSide:B.side=R.shadowSide===null?d[R.side]:R.shadowSide,B.alphaMap=R.alphaMap,B.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,B.map=R.map,B.clipShadows=R.clipShadows,B.clippingPlanes=R.clippingPlanes,B.clipIntersection=R.clipIntersection,B.displacementMap=R.displacementMap,B.displacementScale=R.displacementScale,B.displacementBias=R.displacementBias,B.wireframeLinewidth=R.wireframeLinewidth,B.linewidth=R.linewidth,v.isPointLight===!0&&B.isMeshDistanceMaterial===!0){let O=t.properties.get(B);O.light=v}return B}function _(A,R,v,S,B){if(A.visible===!1)return;if(A.layers.test(R.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&B===3)&&(!A.frustumCulled||A.intersectsFrustum(r))){A.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,A.matrixWorld);let O=e.update(A),X=A.material;if(Array.isArray(X)){let N=O.groups;for(let V=0,J=N.length;V<J;V++){let G=N[V],oe=X[G.materialIndex];if(oe&&oe.visible){let j=w(A,oe,S,B);A.onBeforeShadow(t,A,R,v,O,j,G),t.renderBufferDirect(v,null,O,j,A,G),A.onAfterShadow(t,A,R,v,O,j,G)}}}else if(X.visible){let N=w(A,X,S,B);A.onBeforeShadow(t,A,R,v,O,N,null),t.renderBufferDirect(v,null,O,N,A,null),A.onAfterShadow(t,A,R,v,O,N,null)}}let P=A.children;for(let O=0,X=P.length;O<X;O++)_(P[O],R,v,S,B)}function E(A){A.target.removeEventListener("dispose",E);for(let R in h){let v=h[R],S=A.target.uuid;S in v&&(v[S].dispose(),delete v[S])}}}function af(t,e){function i(){let D=!1,K=new ht,te=null,xe=new ht(0,0,0,0);return{setMask:function(Ee){te!==Ee&&!D&&(t.colorMask(Ee,Ee,Ee,Ee),te=Ee)},setLocked:function(Ee){D=Ee},setClear:function(Ee,ae,_e,Oe,vt){vt===!0&&(Ee*=Oe,ae*=Oe,_e*=Oe),K.set(Ee,ae,_e,Oe),xe.equals(K)===!1&&(t.clearColor(Ee,ae,_e,Oe),xe.copy(K))},reset:function(){D=!1,te=null,xe.set(-1,0,0,0)}}}function r(){let D=!1,K=!1,te=null,xe=null,Ee=null;return{setReversed:function(ae){if(K!==ae){let _e=e.get("EXT_clip_control");ae?_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.ZERO_TO_ONE_EXT):_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.NEGATIVE_ONE_TO_ONE_EXT),K=ae;let Oe=Ee;Ee=null,this.setClear(Oe)}},getReversed:function(){return K},setTest:function(ae){ae?ne(t.DEPTH_TEST):Ce(t.DEPTH_TEST)},setMask:function(ae){te!==ae&&!D&&(t.depthMask(ae),te=ae)},setFunc:function(ae){if(K&&(ae=Bh[ae]),xe!==ae){switch(ae){case 0:t.depthFunc(t.NEVER);break;case 1:t.depthFunc(t.ALWAYS);break;case 2:t.depthFunc(t.LESS);break;case 3:t.depthFunc(t.LEQUAL);break;case 4:t.depthFunc(t.EQUAL);break;case 5:t.depthFunc(t.GEQUAL);break;case 6:t.depthFunc(t.GREATER);break;case 7:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}xe=ae}},setLocked:function(ae){D=ae},setClear:function(ae){Ee!==ae&&(Ee=ae,K&&(ae=1-ae),t.clearDepth(ae))},reset:function(){D=!1,te=null,xe=null,Ee=null,K=!1}}}function a(){let D=!1,K=null,te=null,xe=null,Ee=null,ae=null,_e=null,Oe=null,vt=null;return{setTest:function(rt){D||(rt?ne(t.STENCIL_TEST):Ce(t.STENCIL_TEST))},setMask:function(rt){K!==rt&&!D&&(t.stencilMask(rt),K=rt)},setFunc:function(rt,Yt,ti){(te!==rt||xe!==Yt||Ee!==ti)&&(t.stencilFunc(rt,Yt,ti),te=rt,xe=Yt,Ee=ti)},setOp:function(rt,Yt,ti){(ae!==rt||_e!==Yt||Oe!==ti)&&(t.stencilOp(rt,Yt,ti),ae=rt,_e=Yt,Oe=ti)},setLocked:function(rt){D=rt},setClear:function(rt){vt!==rt&&(t.clearStencil(rt),vt=rt)},reset:function(){D=!1,K=null,te=null,xe=null,Ee=null,ae=null,_e=null,Oe=null,vt=null}}}let n=new i,s=new r,o=new a,l=new WeakMap,h=new WeakMap,u={},d={},c={},p=new WeakMap,g=[],M=null,m=!1,f=null,T=null,w=null,_=null,E=null,A=null,R=null,v=new ke(0,0,0),S=0,B=!1,P=null,O=null,X=null,N=null,V=null,J=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,oe=0,j=t.getParameter(t.VERSION);j.indexOf("WebGL")===-1?j.indexOf("OpenGL ES")!==-1&&(oe=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),G=oe>=2):(oe=parseFloat(/^WebGL (\d)/.exec(j)[1]),G=oe>=1);let Y=null,Q={},ze=t.getParameter(t.SCISSOR_BOX),Ae=t.getParameter(t.VIEWPORT),nt=new ht().fromArray(ze),Ve=new ht().fromArray(Ae);function q(D,K,te,xe){let Ee=new Uint8Array(4),ae=t.createTexture();t.bindTexture(D,ae),t.texParameteri(D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(D,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let _e=0;_e<te;_e++)D===t.TEXTURE_3D||D===t.TEXTURE_2D_ARRAY?t.texImage3D(K,0,t.RGBA,1,1,xe,0,t.RGBA,t.UNSIGNED_BYTE,Ee):t.texImage2D(K+_e,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,Ee);return ae}let ie={};ie[t.TEXTURE_2D]=q(t.TEXTURE_2D,t.TEXTURE_2D,1),ie[t.TEXTURE_CUBE_MAP]=q(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),ie[t.TEXTURE_2D_ARRAY]=q(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),ie[t.TEXTURE_3D]=q(t.TEXTURE_3D,t.TEXTURE_3D,1,1),n.setClear(0,0,0,1),s.setClear(1),o.setClear(0),ne(t.DEPTH_TEST),s.setFunc(3),ve(!1),Re(1),ne(t.CULL_FACE),se(0);function ne(D){u[D]!==!0&&(t.enable(D),u[D]=!0)}function Ce(D){u[D]!==!1&&(t.disable(D),u[D]=!1)}function Ue(D,K){return c[D]!==K&&(t.bindFramebuffer(D,K),c[D]=K,D===t.DRAW_FRAMEBUFFER&&(c[t.FRAMEBUFFER]=K),D===t.FRAMEBUFFER&&(c[t.DRAW_FRAMEBUFFER]=K),!0)}function de(D,K){let te=g,xe=!1;if(D){te=p.get(K),te===void 0&&(te=[],p.set(K,te));let Ee=D.textures;if(te.length!==Ee.length||te[0]!==t.COLOR_ATTACHMENT0){for(let ae=0,_e=Ee.length;ae<_e;ae++)te[ae]=t.COLOR_ATTACHMENT0+ae;te.length=Ee.length,xe=!0}}else te[0]!==t.BACK&&(te[0]=t.BACK,xe=!0);xe&&t.drawBuffers(te)}function qe(D){return M!==D&&(t.useProgram(D),M=D,!0)}let ee={100:t.FUNC_ADD,101:t.FUNC_SUBTRACT,102:t.FUNC_REVERSE_SUBTRACT};ee[103]=t.MIN,ee[104]=t.MAX;let Z={200:t.ZERO,201:t.ONE,202:t.SRC_COLOR,204:t.SRC_ALPHA,210:t.SRC_ALPHA_SATURATE,208:t.DST_COLOR,206:t.DST_ALPHA,203:t.ONE_MINUS_SRC_COLOR,205:t.ONE_MINUS_SRC_ALPHA,209:t.ONE_MINUS_DST_COLOR,207:t.ONE_MINUS_DST_ALPHA,211:t.CONSTANT_COLOR,212:t.ONE_MINUS_CONSTANT_COLOR,213:t.CONSTANT_ALPHA,214:t.ONE_MINUS_CONSTANT_ALPHA};function se(D,K,te,xe,Ee,ae,_e,Oe,vt,rt){if(D===0){m===!0&&(Ce(t.BLEND),m=!1);return}if(m===!1&&(ne(t.BLEND),m=!0),D!==5){if(D!==f||rt!==B){if((T!==100||E!==100)&&(t.blendEquation(t.FUNC_ADD),T=100,E=100),rt)switch(D){case 1:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case 2:t.blendFunc(t.ONE,t.ONE);break;case 3:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case 4:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:Fe("WebGLState: Invalid blending: ",D)}else switch(D){case 1:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case 2:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case 3:Fe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case 4:Fe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Fe("WebGLState: Invalid blending: ",D)}w=null,_=null,A=null,R=null,v.set(0,0,0),S=0,f=D,B=rt}return}Ee||=K,ae||=te,_e||=xe,(K!==T||Ee!==E)&&(t.blendEquationSeparate(ee[K],ee[Ee]),T=K,E=Ee),(te!==w||xe!==_||ae!==A||_e!==R)&&(t.blendFuncSeparate(Z[te],Z[xe],Z[ae],Z[_e]),w=te,_=xe,A=ae,R=_e),(Oe.equals(v)===!1||vt!==S)&&(t.blendColor(Oe.r,Oe.g,Oe.b,vt),v.copy(Oe),S=vt),f=D,B=!1}function ye(D,K){D.side===2?Ce(t.CULL_FACE):ne(t.CULL_FACE);let te=D.side===1;K&&(te=!te),ve(te),D.blending===1&&D.transparent===!1?se(0):se(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),s.setFunc(D.depthFunc),s.setTest(D.depthTest),s.setMask(D.depthWrite),n.setMask(D.colorWrite);let xe=D.stencilWrite;o.setTest(xe),xe&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),He(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ne(t.SAMPLE_ALPHA_TO_COVERAGE):Ce(t.SAMPLE_ALPHA_TO_COVERAGE)}function ve(D){P!==D&&(D?t.frontFace(t.CW):t.frontFace(t.CCW),P=D)}function Re(D){D===0?Ce(t.CULL_FACE):(ne(t.CULL_FACE),D!==O&&(D===1?t.cullFace(t.BACK):D===2?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))),O=D}function Ie(D){D!==X&&(G&&t.lineWidth(D),X=D)}function He(D,K,te){D?(ne(t.POLYGON_OFFSET_FILL),(N!==K||V!==te)&&(N=K,V=te,s.getReversed()&&(K=-K),t.polygonOffset(K,te))):Ce(t.POLYGON_OFFSET_FILL)}function Ge(D){D?ne(t.SCISSOR_TEST):Ce(t.SCISSOR_TEST)}function C(D){D===void 0&&(D=t.TEXTURE0+J-1),Y!==D&&(t.activeTexture(D),Y=D)}function ct(D,K,te){te===void 0&&(te=Y===null?t.TEXTURE0+J-1:Y);let xe=Q[te];xe===void 0&&(xe={type:void 0,texture:void 0},Q[te]=xe),(xe.type!==D||xe.texture!==K)&&(Y!==te&&(t.activeTexture(te),Y=te),t.bindTexture(D,K||ie[D]),xe.type=D,xe.texture=K)}function $e(){let D=Q[Y];D!==void 0&&D.type!==void 0&&(t.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function Ze(){try{t.compressedTexImage2D(...arguments)}catch(D){Fe("WebGLState:",D)}}function b(){try{t.compressedTexImage3D(...arguments)}catch(D){Fe("WebGLState:",D)}}function x(){try{t.texSubImage2D(...arguments)}catch(D){Fe("WebGLState:",D)}}function L(){try{t.texSubImage3D(...arguments)}catch(D){Fe("WebGLState:",D)}}function k(){try{t.compressedTexSubImage2D(...arguments)}catch(D){Fe("WebGLState:",D)}}function $(){try{t.compressedTexSubImage3D(...arguments)}catch(D){Fe("WebGLState:",D)}}function ce(){try{t.texStorage2D(...arguments)}catch(D){Fe("WebGLState:",D)}}function pe(){try{t.texStorage3D(...arguments)}catch(D){Fe("WebGLState:",D)}}function F(){try{t.texImage2D(...arguments)}catch(D){Fe("WebGLState:",D)}}function le(){try{t.texImage3D(...arguments)}catch(D){Fe("WebGLState:",D)}}function me(D){return d[D]===void 0?t.getParameter(D):d[D]}function Se(D,K){d[D]!==K&&(t.pixelStorei(D,K),d[D]=K)}function re(D){nt.equals(D)===!1&&(t.scissor(D.x,D.y,D.z,D.w),nt.copy(D))}function Le(D){Ve.equals(D)===!1&&(t.viewport(D.x,D.y,D.z,D.w),Ve.copy(D))}function Ne(D,K){let te=h.get(K);te===void 0&&(te=new WeakMap,h.set(K,te));let xe=te.get(D);xe===void 0&&(xe=t.getUniformBlockIndex(K,D.name),te.set(D,xe))}function Be(D,K){let te=h.get(K).get(D);l.get(K)!==te&&(t.uniformBlockBinding(K,te,D.__bindingPointIndex),l.set(K,te))}function it(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),s.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),t.pixelStorei(t.PACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.BROWSER_DEFAULT_WEBGL),t.pixelStorei(t.PACK_ROW_LENGTH,0),t.pixelStorei(t.PACK_SKIP_PIXELS,0),t.pixelStorei(t.PACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_ROW_LENGTH,0),t.pixelStorei(t.UNPACK_IMAGE_HEIGHT,0),t.pixelStorei(t.UNPACK_SKIP_PIXELS,0),t.pixelStorei(t.UNPACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_SKIP_IMAGES,0),u={},d={},Y=null,Q={},c={},p=new WeakMap,g=[],M=null,m=!1,f=null,T=null,w=null,_=null,E=null,A=null,R=null,v=new ke(0,0,0),S=0,B=!1,P=null,O=null,X=null,N=null,V=null,nt.set(0,0,t.canvas.width,t.canvas.height),Ve.set(0,0,t.canvas.width,t.canvas.height),n.reset(),s.reset(),o.reset()}return{buffers:{color:n,depth:s,stencil:o},enable:ne,disable:Ce,bindFramebuffer:Ue,drawBuffers:de,useProgram:qe,setBlending:se,setMaterial:ye,setFlipSided:ve,setCullFace:Re,setLineWidth:Ie,setPolygonOffset:He,setScissorTest:Ge,activeTexture:C,bindTexture:ct,unbindTexture:$e,compressedTexImage2D:Ze,compressedTexImage3D:b,texImage2D:F,texImage3D:le,pixelStorei:Se,getParameter:me,updateUBOMapping:Ne,uniformBlockBinding:Be,texStorage2D:ce,texStorage3D:pe,texSubImage2D:x,texSubImage3D:L,compressedTexSubImage2D:k,compressedTexSubImage3D:$,scissor:re,viewport:Le,reset:it}}function nf(t,e,i,r,a,n,s){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new he,u=new WeakMap,d=new Set,c,p=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(b,x){return g?new OffscreenCanvas(b,x):Ur("canvas")}function m(b,x,L){let k=1,$=Ze(b);if(($.width>L||$.height>L)&&(k=L/Math.max($.width,$.height)),k<1){if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){let ce=Math.floor(k*$.width),pe=Math.floor(k*$.height);c===void 0&&(c=M(ce,pe));let F=x?M(ce,pe):c;return F.width=ce,F.height=pe,F.getContext("2d").drawImage(b,0,0,ce,pe),we("WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+ce+"x"+pe+")."),F}return"data"in b&&we("WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),b}return b}function f(b){return b.generateMipmaps}function T(b){t.generateMipmap(b)}function w(b){return b.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?t.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function _(b,x,L,k,$,ce=!1){if(b!==null){if(t[b]!==void 0)return t[b];we("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let pe;k&&(pe=e.get("EXT_texture_norm16"),pe||we("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let F=x;if(x===t.RED&&(L===t.FLOAT&&(F=t.R32F),L===t.HALF_FLOAT&&(F=t.R16F),L===t.UNSIGNED_BYTE&&(F=t.R8),L===t.UNSIGNED_SHORT&&pe&&(F=pe.R16_EXT),L===t.SHORT&&pe&&(F=pe.R16_SNORM_EXT)),x===t.RED_INTEGER&&(L===t.UNSIGNED_BYTE&&(F=t.R8UI),L===t.UNSIGNED_SHORT&&(F=t.R16UI),L===t.UNSIGNED_INT&&(F=t.R32UI),L===t.BYTE&&(F=t.R8I),L===t.SHORT&&(F=t.R16I),L===t.INT&&(F=t.R32I)),x===t.RG&&(L===t.FLOAT&&(F=t.RG32F),L===t.HALF_FLOAT&&(F=t.RG16F),L===t.UNSIGNED_BYTE&&(F=t.RG8),L===t.UNSIGNED_SHORT&&pe&&(F=pe.RG16_EXT),L===t.SHORT&&pe&&(F=pe.RG16_SNORM_EXT)),x===t.RG_INTEGER&&(L===t.UNSIGNED_BYTE&&(F=t.RG8UI),L===t.UNSIGNED_SHORT&&(F=t.RG16UI),L===t.UNSIGNED_INT&&(F=t.RG32UI),L===t.BYTE&&(F=t.RG8I),L===t.SHORT&&(F=t.RG16I),L===t.INT&&(F=t.RG32I)),x===t.RGB_INTEGER&&(L===t.UNSIGNED_BYTE&&(F=t.RGB8UI),L===t.UNSIGNED_SHORT&&(F=t.RGB16UI),L===t.UNSIGNED_INT&&(F=t.RGB32UI),L===t.BYTE&&(F=t.RGB8I),L===t.SHORT&&(F=t.RGB16I),L===t.INT&&(F=t.RGB32I)),x===t.RGBA_INTEGER&&(L===t.UNSIGNED_BYTE&&(F=t.RGBA8UI),L===t.UNSIGNED_SHORT&&(F=t.RGBA16UI),L===t.UNSIGNED_INT&&(F=t.RGBA32UI),L===t.BYTE&&(F=t.RGBA8I),L===t.SHORT&&(F=t.RGBA16I),L===t.INT&&(F=t.RGBA32I)),x===t.RGB&&(L===t.UNSIGNED_SHORT&&pe&&(F=pe.RGB16_EXT),L===t.SHORT&&pe&&(F=pe.RGB16_SNORM_EXT),L===t.UNSIGNED_INT_5_9_9_9_REV&&(F=t.RGB9_E5),L===t.UNSIGNED_INT_10F_11F_11F_REV&&(F=t.R11F_G11F_B10F)),x===t.RGBA){let le=ce?wa:Ke.getTransfer($);L===t.FLOAT&&(F=t.RGBA32F),L===t.HALF_FLOAT&&(F=t.RGBA16F),L===t.UNSIGNED_BYTE&&(F=le==="srgb"?t.SRGB8_ALPHA8:t.RGBA8),L===t.UNSIGNED_SHORT&&pe&&(F=pe.RGBA16_EXT),L===t.SHORT&&pe&&(F=pe.RGBA16_SNORM_EXT),L===t.UNSIGNED_SHORT_4_4_4_4&&(F=t.RGBA4),L===t.UNSIGNED_SHORT_5_5_5_1&&(F=t.RGB5_A1)}return(F===t.R16F||F===t.R32F||F===t.RG16F||F===t.RG32F||F===t.RGBA16F||F===t.RGBA32F)&&e.get("EXT_color_buffer_float"),F}function E(b,x){let L;return b?x===null||x===1014||x===1020?L=t.DEPTH24_STENCIL8:x===1015?L=t.DEPTH32F_STENCIL8:x===1012&&(L=t.DEPTH24_STENCIL8,we("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===1014||x===1020?L=t.DEPTH_COMPONENT24:x===1015?L=t.DEPTH_COMPONENT32F:x===1012&&(L=t.DEPTH_COMPONENT16),L}function A(b,x){return f(b)===!0||b.isFramebufferTexture&&b.minFilter!==1003&&b.minFilter!==1006?Math.log2(Math.max(x.width,x.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?x.mipmaps.length:1}function R(b){let x=b.target;x.removeEventListener("dispose",R),S(x),x.isVideoTexture&&u.delete(x),x.isHTMLTexture&&d.delete(x)}function v(b){let x=b.target;x.removeEventListener("dispose",v),P(x)}function S(b){let x=r.get(b);if(x.__webglInit===void 0)return;let L=b.source,k=p.get(L);if(k){let $=k[x.__cacheKey];$.usedTimes--,$.usedTimes===0&&B(b),Object.keys(k).length===0&&p.delete(L)}r.remove(b)}function B(b){let x=r.get(b);t.deleteTexture(x.__webglTexture);let L=b.source,k=p.get(L);delete k[x.__cacheKey],s.memory.textures--}function P(b){let x=r.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),r.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let k=0;k<6;k++){if(Array.isArray(x.__webglFramebuffer[k]))for(let $=0;$<x.__webglFramebuffer[k].length;$++)t.deleteFramebuffer(x.__webglFramebuffer[k][$]);else t.deleteFramebuffer(x.__webglFramebuffer[k]);x.__webglDepthbuffer&&t.deleteRenderbuffer(x.__webglDepthbuffer[k])}else{if(Array.isArray(x.__webglFramebuffer))for(let k=0;k<x.__webglFramebuffer.length;k++)t.deleteFramebuffer(x.__webglFramebuffer[k]);else t.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&t.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&t.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let k=0;k<x.__webglColorRenderbuffer.length;k++)x.__webglColorRenderbuffer[k]&&t.deleteRenderbuffer(x.__webglColorRenderbuffer[k]);x.__webglDepthRenderbuffer&&t.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let L=b.textures;for(let k=0,$=L.length;k<$;k++){let ce=r.get(L[k]);ce.__webglTexture&&(t.deleteTexture(ce.__webglTexture),s.memory.textures--),r.remove(L[k])}r.remove(b)}let O=0;function X(){O=0}function N(){return O}function V(b){O=b}function J(){let b=O;return b>=a.maxTextures&&we("WebGLTextures: Trying to use "+(b+1)+" texture units while this GPU supports only "+a.maxTextures),O+=1,b}function G(b){let x=[];return x.push(b.wrapS),x.push(b.wrapT),x.push(b.wrapR||0),x.push(b.magFilter),x.push(b.minFilter),x.push(b.anisotropy),x.push(b.internalFormat),x.push(b.format),x.push(b.type),x.push(b.generateMipmaps),x.push(b.premultiplyAlpha),x.push(b.flipY),x.push(b.unpackAlignment),x.push(b.colorSpace),x.join()}function oe(b,x){let L=r.get(b);if(b.isVideoTexture&&ct(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&L.__version!==b.version){let k=b.image;if(k===null)we("WebGLRenderer: Texture marked for update but no image data found.");else if(k.complete===!1)we("WebGLRenderer: Texture marked for update but image is incomplete");else{Ce(L,b,x);return}}else b.isExternalTexture&&(L.__webglTexture=b.sourceTexture?b.sourceTexture:null);i.bindTexture(t.TEXTURE_2D,L.__webglTexture,t.TEXTURE0+x)}function j(b,x){let L=r.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&L.__version!==b.version){Ce(L,b,x);return}b.isExternalTexture&&(L.__webglTexture=b.sourceTexture?b.sourceTexture:null),i.bindTexture(t.TEXTURE_2D_ARRAY,L.__webglTexture,t.TEXTURE0+x)}function Y(b,x){let L=r.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&L.__version!==b.version){Ce(L,b,x);return}i.bindTexture(t.TEXTURE_3D,L.__webglTexture,t.TEXTURE0+x)}function Q(b,x){let L=r.get(b);if(b.isCubeDepthTexture!==!0&&b.version>0&&L.__version!==b.version){Ue(L,b,x);return}i.bindTexture(t.TEXTURE_CUBE_MAP,L.__webglTexture,t.TEXTURE0+x)}let ze={[xn]:t.REPEAT,[hi]:t.CLAMP_TO_EDGE,[yn]:t.MIRRORED_REPEAT},Ae={[Rt]:t.NEAREST,[Vl]:t.NEAREST_MIPMAP_NEAREST,[Hl]:t.NEAREST_MIPMAP_LINEAR,[Ut]:t.LINEAR,[Gl]:t.LINEAR_MIPMAP_NEAREST,[Nn]:t.LINEAR_MIPMAP_LINEAR},nt={512:t.NEVER,519:t.ALWAYS,513:t.LESS,515:t.LEQUAL,514:t.EQUAL,518:t.GEQUAL,516:t.GREATER,517:t.NOTEQUAL};function Ve(b,x){if(x.type===1015&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===1006||x.magFilter===1007||x.magFilter===1005||x.magFilter===1008||x.minFilter===1006||x.minFilter===1007||x.minFilter===1005||x.minFilter===1008)&&we("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(b,t.TEXTURE_WRAP_S,ze[x.wrapS]),t.texParameteri(b,t.TEXTURE_WRAP_T,ze[x.wrapT]),(b===t.TEXTURE_3D||b===t.TEXTURE_2D_ARRAY)&&t.texParameteri(b,t.TEXTURE_WRAP_R,ze[x.wrapR]),t.texParameteri(b,t.TEXTURE_MAG_FILTER,Ae[x.magFilter]),t.texParameteri(b,t.TEXTURE_MIN_FILTER,Ae[x.minFilter]),x.compareFunction&&(t.texParameteri(b,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(b,t.TEXTURE_COMPARE_FUNC,nt[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===1003||x.minFilter!==1005&&x.minFilter!==1008||x.type===1015&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||r.get(x).__currentAnisotropy){let L=e.get("EXT_texture_filter_anisotropic");t.texParameterf(b,L.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,a.getMaxAnisotropy())),r.get(x).__currentAnisotropy=x.anisotropy}}}function q(b,x){let L=!1;b.__webglInit===void 0&&(b.__webglInit=!0,x.addEventListener("dispose",R));let k=x.source,$=p.get(k);$===void 0&&($={},p.set(k,$));let ce=G(x);if(ce!==b.__cacheKey){$[ce]===void 0&&($[ce]={texture:t.createTexture(),usedTimes:0},s.memory.textures++,L=!0),$[ce].usedTimes++;let pe=$[b.__cacheKey];pe!==void 0&&($[b.__cacheKey].usedTimes--,pe.usedTimes===0&&B(x)),b.__cacheKey=ce,b.__webglTexture=$[ce].texture}return L}function ie(b,x,L){return Math.floor(Math.floor(b/L)/x)}function ne(b,x,L,k){let $=b.updateRanges;if($.length===0)i.texSubImage2D(t.TEXTURE_2D,0,0,0,x.width,x.height,L,k,x.data);else{$.sort((me,Se)=>me.start-Se.start);let ce=0;for(let me=1;me<$.length;me++){let Se=$[ce],re=$[me],Le=Se.start+Se.count,Ne=ie(re.start,x.width,4),Be=ie(Se.start,x.width,4);re.start<=Le+1&&Ne===Be&&ie(re.start+re.count-1,x.width,4)===Ne?Se.count=Math.max(Se.count,re.start+re.count-Se.start):(++ce,$[ce]=re)}$.length=ce+1;let pe=i.getParameter(t.UNPACK_ROW_LENGTH),F=i.getParameter(t.UNPACK_SKIP_PIXELS),le=i.getParameter(t.UNPACK_SKIP_ROWS);i.pixelStorei(t.UNPACK_ROW_LENGTH,x.width);for(let me=0,Se=$.length;me<Se;me++){let re=$[me],Le=Math.floor(re.start/4),Ne=Math.ceil(re.count/4),Be=Le%x.width,it=Math.floor(Le/x.width),D=Ne;i.pixelStorei(t.UNPACK_SKIP_PIXELS,Be),i.pixelStorei(t.UNPACK_SKIP_ROWS,it),i.texSubImage2D(t.TEXTURE_2D,0,Be,it,D,1,L,k,x.data)}b.clearUpdateRanges(),i.pixelStorei(t.UNPACK_ROW_LENGTH,pe),i.pixelStorei(t.UNPACK_SKIP_PIXELS,F),i.pixelStorei(t.UNPACK_SKIP_ROWS,le)}}function Ce(b,x,L){let k=t.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(k=t.TEXTURE_2D_ARRAY),x.isData3DTexture&&(k=t.TEXTURE_3D);let $=q(b,x),ce=x.source;i.bindTexture(k,b.__webglTexture,t.TEXTURE0+L);let pe=r.get(ce);if(ce.version!==pe.__version||$===!0){if(i.activeTexture(t.TEXTURE0+L),!(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)){let K=Ke.getPrimaries(Ke.workingColorSpace),te=x.colorSpace===""?null:Ke.getPrimaries(x.colorSpace),xe=x.colorSpace===""||K===te?t.NONE:t.BROWSER_DEFAULT_WEBGL;i.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe)}i.pixelStorei(t.UNPACK_ALIGNMENT,x.unpackAlignment);let F=m(x.image,!1,a.maxTextureSize);F=$e(x,F);let le=n.convert(x.format,x.colorSpace),me=n.convert(x.type),Se=_(x.internalFormat,le,me,x.normalized,x.colorSpace,x.isVideoTexture);Ve(k,x);let re,Le=x.mipmaps,Ne=x.isVideoTexture!==!0,Be=pe.__version===void 0||$===!0,it=ce.dataReady,D=A(x,F);if(x.isDepthTexture)Se=E(x.format===wo,x.type),Be&&(Ne?i.texStorage2D(t.TEXTURE_2D,1,Se,F.width,F.height):i.texImage2D(t.TEXTURE_2D,0,Se,F.width,F.height,0,le,me,null));else if(x.isDataTexture)if(Le.length>0){Ne&&Be&&i.texStorage2D(t.TEXTURE_2D,D,Se,Le[0].width,Le[0].height);for(let K=0,te=Le.length;K<te;K++)re=Le[K],Ne?it&&i.texSubImage2D(t.TEXTURE_2D,K,0,0,re.width,re.height,le,me,re.data):i.texImage2D(t.TEXTURE_2D,K,Se,re.width,re.height,0,le,me,re.data);x.generateMipmaps=!1}else Ne?(Be&&i.texStorage2D(t.TEXTURE_2D,D,Se,F.width,F.height),it&&ne(x,F,le,me)):i.texImage2D(t.TEXTURE_2D,0,Se,F.width,F.height,0,le,me,F.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Ne&&Be&&i.texStorage3D(t.TEXTURE_2D_ARRAY,D,Se,Le[0].width,Le[0].height,F.depth);for(let K=0,te=Le.length;K<te;K++)if(re=Le[K],x.format!==1023)if(le!==null)if(Ne){if(it)if(x.layerUpdates.size>0){let xe=$s(re.width,re.height,x.format,x.type);for(let Ee of x.layerUpdates){let ae=re.data.subarray(Ee*xe/re.data.BYTES_PER_ELEMENT,(Ee+1)*xe/re.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,K,0,0,Ee,re.width,re.height,1,le,ae)}}else i.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,K,0,0,0,re.width,re.height,F.depth,le,re.data)}else i.compressedTexImage3D(t.TEXTURE_2D_ARRAY,K,Se,re.width,re.height,F.depth,0,re.data,0,0);else we("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ne?it&&i.texSubImage3D(t.TEXTURE_2D_ARRAY,K,0,0,0,re.width,re.height,F.depth,le,me,re.data):i.texImage3D(t.TEXTURE_2D_ARRAY,K,Se,re.width,re.height,F.depth,0,le,me,re.data);x.layerUpdates.size>0&&x.clearLayerUpdates()}else{Ne&&Be&&i.texStorage2D(t.TEXTURE_2D,D,Se,Le[0].width,Le[0].height);for(let K=0,te=Le.length;K<te;K++)re=Le[K],x.format===1023?Ne?it&&i.texSubImage2D(t.TEXTURE_2D,K,0,0,re.width,re.height,le,me,re.data):i.texImage2D(t.TEXTURE_2D,K,Se,re.width,re.height,0,le,me,re.data):le===null?we("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ne?it&&i.compressedTexSubImage2D(t.TEXTURE_2D,K,0,0,re.width,re.height,le,re.data):i.compressedTexImage2D(t.TEXTURE_2D,K,Se,re.width,re.height,0,re.data)}else if(x.isDataArrayTexture)if(Ne){if(Be&&i.texStorage3D(t.TEXTURE_2D_ARRAY,D,Se,F.width,F.height,F.depth),it)if(x.layerUpdates.size>0){let K=$s(F.width,F.height,x.format,x.type);for(let te of x.layerUpdates){let xe=F.data.subarray(te*K/F.data.BYTES_PER_ELEMENT,(te+1)*K/F.data.BYTES_PER_ELEMENT);i.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,te,F.width,F.height,1,le,me,xe)}x.clearLayerUpdates()}else i.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,F.width,F.height,F.depth,le,me,F.data)}else i.texImage3D(t.TEXTURE_2D_ARRAY,0,Se,F.width,F.height,F.depth,0,le,me,F.data);else if(x.isData3DTexture)Ne?(Be&&i.texStorage3D(t.TEXTURE_3D,D,Se,F.width,F.height,F.depth),it&&i.texSubImage3D(t.TEXTURE_3D,0,0,0,0,F.width,F.height,F.depth,le,me,F.data)):i.texImage3D(t.TEXTURE_3D,0,Se,F.width,F.height,F.depth,0,le,me,F.data);else if(x.isFramebufferTexture){if(Be)if(Ne)i.texStorage2D(t.TEXTURE_2D,D,Se,F.width,F.height);else{let K=F.width,te=F.height;for(let xe=0;xe<D;xe++)i.texImage2D(t.TEXTURE_2D,xe,Se,K,te,0,le,me,null),K>>=1,te>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in t){let K=t.canvas;if(K.hasAttribute("layoutsubtree")||K.setAttribute("layoutsubtree","true"),F.parentNode!==K){K.appendChild(F),d.add(x),K.onpaint=te=>{let xe=te.changedElements;for(let Ee of d)xe.includes(Ee.image)&&(Ee.needsUpdate=!0)},K.requestPaint();return}if(t.texElementImage2D.length===3)t.texElementImage2D(t.TEXTURE_2D,t.RGBA8,F);else{let te=t.RGBA,xe=t.RGBA,Ee=t.UNSIGNED_BYTE;t.texElementImage2D(t.TEXTURE_2D,0,te,xe,Ee,F)}t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)}}else if(Le.length>0){if(Ne&&Be){let K=Ze(Le[0]);i.texStorage2D(t.TEXTURE_2D,D,Se,K.width,K.height)}for(let K=0,te=Le.length;K<te;K++)re=Le[K],Ne?it&&i.texSubImage2D(t.TEXTURE_2D,K,0,0,le,me,re):i.texImage2D(t.TEXTURE_2D,K,Se,le,me,re);x.generateMipmaps=!1}else if(Ne){if(Be){let K=Ze(F);i.texStorage2D(t.TEXTURE_2D,D,Se,K.width,K.height)}it&&i.texSubImage2D(t.TEXTURE_2D,0,0,0,le,me,F)}else i.texImage2D(t.TEXTURE_2D,0,Se,le,me,F);f(x)&&T(k),pe.__version=ce.version,x.onUpdate&&x.onUpdate(x)}b.__version=x.version}function Ue(b,x,L){if(x.image.length!==6)return;let k=q(b,x),$=x.source;i.bindTexture(t.TEXTURE_CUBE_MAP,b.__webglTexture,t.TEXTURE0+L);let ce=r.get($);if($.version!==ce.__version||k===!0){i.activeTexture(t.TEXTURE0+L);let pe=Ke.getPrimaries(Ke.workingColorSpace),F=x.colorSpace===""?null:Ke.getPrimaries(x.colorSpace),le=x.colorSpace===""||pe===F?t.NONE:t.BROWSER_DEFAULT_WEBGL;i.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(t.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,le);let me=x.isCompressedTexture||x.image[0].isCompressedTexture,Se=x.image[0]&&x.image[0].isDataTexture,re=[];for(let ae=0;ae<6;ae++)!me&&!Se?re[ae]=m(x.image[ae],!0,a.maxCubemapSize):re[ae]=Se?x.image[ae].image:x.image[ae],re[ae]=$e(x,re[ae]);let Le=re[0],Ne=n.convert(x.format,x.colorSpace),Be=n.convert(x.type),it=_(x.internalFormat,Ne,Be,x.normalized,x.colorSpace),D=x.isVideoTexture!==!0,K=ce.__version===void 0||k===!0,te=$.dataReady,xe=A(x,Le);Ve(t.TEXTURE_CUBE_MAP,x);let Ee;if(me){D&&K&&i.texStorage2D(t.TEXTURE_CUBE_MAP,xe,it,Le.width,Le.height);for(let ae=0;ae<6;ae++){Ee=re[ae].mipmaps;for(let _e=0;_e<Ee.length;_e++){let Oe=Ee[_e];x.format===1023?D?te&&i.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,_e,0,0,Oe.width,Oe.height,Ne,Be,Oe.data):i.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,_e,it,Oe.width,Oe.height,0,Ne,Be,Oe.data):Ne===null?we("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?te&&i.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,_e,0,0,Oe.width,Oe.height,Ne,Oe.data):i.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,_e,it,Oe.width,Oe.height,0,Oe.data)}}}else{if(Ee=x.mipmaps,D&&K){Ee.length>0&&xe++;let ae=Ze(re[0]);i.texStorage2D(t.TEXTURE_CUBE_MAP,xe,it,ae.width,ae.height)}for(let ae=0;ae<6;ae++)if(Se){D?te&&i.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,re[ae].width,re[ae].height,Ne,Be,re[ae].data):i.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,it,re[ae].width,re[ae].height,0,Ne,Be,re[ae].data);for(let _e=0;_e<Ee.length;_e++){let Oe=Ee[_e].image[ae].image;D?te&&i.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,_e+1,0,0,Oe.width,Oe.height,Ne,Be,Oe.data):i.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,_e+1,it,Oe.width,Oe.height,0,Ne,Be,Oe.data)}}else{D?te&&i.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,Ne,Be,re[ae]):i.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,it,Ne,Be,re[ae]);for(let _e=0;_e<Ee.length;_e++){let Oe=Ee[_e];D?te&&i.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,_e+1,0,0,Ne,Be,Oe.image[ae]):i.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,_e+1,it,Ne,Be,Oe.image[ae])}}}f(x)&&T(t.TEXTURE_CUBE_MAP),ce.__version=$.version,x.onUpdate&&x.onUpdate(x)}b.__version=x.version}function de(b,x,L,k,$,ce){let pe=n.convert(L.format,L.colorSpace),F=n.convert(L.type),le=_(L.internalFormat,pe,F,L.normalized,L.colorSpace),me=r.get(x),Se=r.get(L);if(Se.__renderTarget=x,!me.__hasExternalTextures){let re=Math.max(1,x.width>>ce),Le=Math.max(1,x.height>>ce);$===t.TEXTURE_3D||$===t.TEXTURE_2D_ARRAY?i.texImage3D($,ce,le,re,Le,x.depth,0,pe,F,null):i.texImage2D($,ce,le,re,Le,0,pe,F,null)}i.bindFramebuffer(t.FRAMEBUFFER,b),C(x)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,k,$,Se.__webglTexture,0,Ge(x)):($===t.TEXTURE_2D||$>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,k,$,Se.__webglTexture,ce),i.bindFramebuffer(t.FRAMEBUFFER,null)}function qe(b,x,L){if(t.bindRenderbuffer(t.RENDERBUFFER,b),x.depthBuffer){let k=x.depthTexture,$=k&&k.isDepthTexture?k.type:null,ce=E(x.stencilBuffer,$),pe=x.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;C(x)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Ge(x),ce,x.width,x.height):L?t.renderbufferStorageMultisample(t.RENDERBUFFER,Ge(x),ce,x.width,x.height):t.renderbufferStorage(t.RENDERBUFFER,ce,x.width,x.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,pe,t.RENDERBUFFER,b)}else{let k=x.textures;for(let $=0;$<k.length;$++){let ce=k[$],pe=n.convert(ce.format,ce.colorSpace),F=n.convert(ce.type),le=_(ce.internalFormat,pe,F,ce.normalized,ce.colorSpace);C(x)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Ge(x),le,x.width,x.height):L?t.renderbufferStorageMultisample(t.RENDERBUFFER,Ge(x),le,x.width,x.height):t.renderbufferStorage(t.RENDERBUFFER,le,x.width,x.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function ee(b,x,L){let k=x.isWebGLCubeRenderTarget===!0;if(i.bindFramebuffer(t.FRAMEBUFFER,b),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let $=r.get(x.depthTexture);if($.__renderTarget=x,(!$.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),k){if($.__webglInit===void 0&&($.__webglInit=!0,x.depthTexture.addEventListener("dispose",R)),$.__webglTexture===void 0){$.__webglTexture=t.createTexture(),i.bindTexture(t.TEXTURE_CUBE_MAP,$.__webglTexture),Ve(t.TEXTURE_CUBE_MAP,x.depthTexture);let me=n.convert(x.depthTexture.format),Se=n.convert(x.depthTexture.type),re;x.depthTexture.format===1026?re=t.DEPTH_COMPONENT24:x.depthTexture.format===1027&&(re=t.DEPTH24_STENCIL8);for(let Le=0;Le<6;Le++)t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0,re,x.width,x.height,0,me,Se,null)}}else oe(x.depthTexture,0);let ce=$.__webglTexture,pe=Ge(x),F=k?t.TEXTURE_CUBE_MAP_POSITIVE_X+L:t.TEXTURE_2D,le=x.depthTexture.format===1027?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;if(x.depthTexture.format===1026)C(x)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,le,F,ce,0,pe):t.framebufferTexture2D(t.FRAMEBUFFER,le,F,ce,0);else if(x.depthTexture.format===1027)C(x)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,le,F,ce,0,pe):t.framebufferTexture2D(t.FRAMEBUFFER,le,F,ce,0);else throw Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Z(b){let x=r.get(b),L=b.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==b.depthTexture){let k=b.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),k){let $=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,k.removeEventListener("dispose",$)};k.addEventListener("dispose",$),x.__depthDisposeCallback=$}x.__boundDepthTexture=k}if(b.depthTexture&&!x.__autoAllocateDepthBuffer)if(L)for(let k=0;k<6;k++)ee(x.__webglFramebuffer[k],b,k);else{let k=b.texture.mipmaps;k&&k.length>0?ee(x.__webglFramebuffer[0],b,0):ee(x.__webglFramebuffer,b,0)}else if(L){x.__webglDepthbuffer=[];for(let k=0;k<6;k++)if(i.bindFramebuffer(t.FRAMEBUFFER,x.__webglFramebuffer[k]),x.__webglDepthbuffer[k]===void 0)x.__webglDepthbuffer[k]=t.createRenderbuffer(),qe(x.__webglDepthbuffer[k],b,!1);else{let $=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ce=x.__webglDepthbuffer[k];t.bindRenderbuffer(t.RENDERBUFFER,ce),t.framebufferRenderbuffer(t.FRAMEBUFFER,$,t.RENDERBUFFER,ce)}}else{let k=b.texture.mipmaps;if(k&&k.length>0?i.bindFramebuffer(t.FRAMEBUFFER,x.__webglFramebuffer[0]):i.bindFramebuffer(t.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=t.createRenderbuffer(),qe(x.__webglDepthbuffer,b,!1);else{let $=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ce=x.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,ce),t.framebufferRenderbuffer(t.FRAMEBUFFER,$,t.RENDERBUFFER,ce)}}i.bindFramebuffer(t.FRAMEBUFFER,null)}function se(b,x,L){let k=r.get(b);x!==void 0&&de(k.__webglFramebuffer,b,b.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),L!==void 0&&Z(b)}function ye(b){let x=b.texture,L=r.get(b),k=r.get(x);b.addEventListener("dispose",v);let $=b.textures,ce=b.isWebGLCubeRenderTarget===!0,pe=$.length>1;if(pe||(k.__webglTexture===void 0&&(k.__webglTexture=t.createTexture()),k.__version=x.version,s.memory.textures++),ce){L.__webglFramebuffer=[];for(let F=0;F<6;F++)if(x.mipmaps&&x.mipmaps.length>0){L.__webglFramebuffer[F]=[];for(let le=0;le<x.mipmaps.length;le++)L.__webglFramebuffer[F][le]=t.createFramebuffer()}else L.__webglFramebuffer[F]=t.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){L.__webglFramebuffer=[];for(let F=0;F<x.mipmaps.length;F++)L.__webglFramebuffer[F]=t.createFramebuffer()}else L.__webglFramebuffer=t.createFramebuffer();if(pe)for(let F=0,le=$.length;F<le;F++){let me=r.get($[F]);me.__webglTexture===void 0&&(me.__webglTexture=t.createTexture(),s.memory.textures++)}if(b.samples>0&&C(b)===!1){L.__webglMultisampledFramebuffer=t.createFramebuffer(),L.__webglColorRenderbuffer=[],i.bindFramebuffer(t.FRAMEBUFFER,L.__webglMultisampledFramebuffer);for(let F=0;F<$.length;F++){let le=$[F];L.__webglColorRenderbuffer[F]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,L.__webglColorRenderbuffer[F]);let me=n.convert(le.format,le.colorSpace),Se=n.convert(le.type),re=_(le.internalFormat,me,Se,le.normalized,le.colorSpace,b.isXRRenderTarget===!0),Le=Ge(b);t.renderbufferStorageMultisample(t.RENDERBUFFER,Le,re,b.width,b.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+F,t.RENDERBUFFER,L.__webglColorRenderbuffer[F])}t.bindRenderbuffer(t.RENDERBUFFER,null),b.depthBuffer&&(L.__webglDepthRenderbuffer=t.createRenderbuffer(),qe(L.__webglDepthRenderbuffer,b,!0)),i.bindFramebuffer(t.FRAMEBUFFER,null)}}if(ce){i.bindTexture(t.TEXTURE_CUBE_MAP,k.__webglTexture),Ve(t.TEXTURE_CUBE_MAP,x);for(let F=0;F<6;F++)if(x.mipmaps&&x.mipmaps.length>0)for(let le=0;le<x.mipmaps.length;le++)de(L.__webglFramebuffer[F][le],b,x,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+F,le);else de(L.__webglFramebuffer[F],b,x,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+F,0);f(x)&&T(t.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(pe){for(let F=0,le=$.length;F<le;F++){let me=$[F],Se=r.get(me),re=t.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(re=b.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),i.bindTexture(re,Se.__webglTexture),Ve(re,me),de(L.__webglFramebuffer,b,me,t.COLOR_ATTACHMENT0+F,re,0),f(me)&&T(re)}i.unbindTexture()}else{let F=t.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(F=b.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),i.bindTexture(F,k.__webglTexture),Ve(F,x),x.mipmaps&&x.mipmaps.length>0)for(let le=0;le<x.mipmaps.length;le++)de(L.__webglFramebuffer[le],b,x,t.COLOR_ATTACHMENT0,F,le);else de(L.__webglFramebuffer,b,x,t.COLOR_ATTACHMENT0,F,0);f(x)&&T(F),i.unbindTexture()}b.depthBuffer&&Z(b)}function ve(b){let x=b.textures;for(let L=0,k=x.length;L<k;L++){let $=x[L];if(f($)){let ce=w(b),pe=r.get($).__webglTexture;i.bindTexture(ce,pe),T(ce),i.unbindTexture()}}}let Re=[],Ie=[];function He(b){if(b.samples>0){if(C(b)===!1){let x=b.textures,L=b.width,k=b.height,$=t.COLOR_BUFFER_BIT,ce=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,pe=r.get(b),F=x.length>1;if(F)for(let me=0;me<x.length;me++)i.bindFramebuffer(t.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+me,t.RENDERBUFFER,null),i.bindFramebuffer(t.FRAMEBUFFER,pe.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+me,t.TEXTURE_2D,null,0);i.bindFramebuffer(t.READ_FRAMEBUFFER,pe.__webglMultisampledFramebuffer);let le=b.texture.mipmaps;le&&le.length>0?i.bindFramebuffer(t.DRAW_FRAMEBUFFER,pe.__webglFramebuffer[0]):i.bindFramebuffer(t.DRAW_FRAMEBUFFER,pe.__webglFramebuffer);for(let me=0;me<x.length;me++){if(b.resolveDepthBuffer&&(b.depthBuffer&&($|=t.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&($|=t.STENCIL_BUFFER_BIT)),F){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,pe.__webglColorRenderbuffer[me]);let Se=r.get(x[me]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Se,0)}t.blitFramebuffer(0,0,L,k,0,0,L,k,$,t.NEAREST),l===!0&&(Re.length=0,Ie.length=0,Re.push(t.COLOR_ATTACHMENT0+me),b.depthBuffer&&b.storeMultisampledDepthBuffer===!1&&(Re.push(ce),Ie.push(ce),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,Ie)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,Re))}if(i.bindFramebuffer(t.READ_FRAMEBUFFER,null),i.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),F)for(let me=0;me<x.length;me++){i.bindFramebuffer(t.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+me,t.RENDERBUFFER,pe.__webglColorRenderbuffer[me]);let Se=r.get(x[me]).__webglTexture;i.bindFramebuffer(t.FRAMEBUFFER,pe.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+me,t.TEXTURE_2D,Se,0)}i.bindFramebuffer(t.DRAW_FRAMEBUFFER,pe.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.storeMultisampledDepthBuffer===!1&&l){let x=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[x])}}}function Ge(b){return Math.min(a.maxSamples,b.samples)}function C(b){let x=r.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function ct(b){let x=s.render.frame;u.get(b)!==x&&(u.set(b,x),b.update())}function $e(b,x){let L=b.colorSpace,k=b.format,$=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||L!=="srgb-linear"&&L!==""&&(Ke.getTransfer(L)==="srgb"?(k!==1023||$!==1009)&&we("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Fe("WebGLTextures: Unsupported texture color space:",L)),x}function Ze(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(h.width=b.naturalWidth||b.width,h.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(h.width=b.displayWidth,h.height=b.displayHeight):(h.width=b.width,h.height=b.height),h}this.allocateTextureUnit=J,this.resetTextureUnits=X,this.getTextureUnits=N,this.setTextureUnits=V,this.setTexture2D=oe,this.setTexture2DArray=j,this.setTexture3D=Y,this.setTextureCube=Q,this.rebindTextures=se,this.setupRenderTarget=ye,this.updateRenderTargetMipmap=ve,this.updateMultisampleRenderTarget=He,this.setupDepthRenderbuffer=Z,this.setupFrameBufferTexture=de,this.useMultisampledRTT=C,this.isReversedDepthBuffer=function(){return i.buffers.depth.getReversed()}}function sf(t,e){function i(r,a=""){let n,s=Ke.getTransfer(a);if(r===1009)return t.UNSIGNED_BYTE;if(r===1017)return t.UNSIGNED_SHORT_4_4_4_4;if(r===1018)return t.UNSIGNED_SHORT_5_5_5_1;if(r===35902)return t.UNSIGNED_INT_5_9_9_9_REV;if(r===35899)return t.UNSIGNED_INT_10F_11F_11F_REV;if(r===1010)return t.BYTE;if(r===1011)return t.SHORT;if(r===1012)return t.UNSIGNED_SHORT;if(r===1013)return t.INT;if(r===1014)return t.UNSIGNED_INT;if(r===1015)return t.FLOAT;if(r===1016)return t.HALF_FLOAT;if(r===1021)return t.ALPHA;if(r===1022)return t.RGB;if(r===1023)return t.RGBA;if(r===1026)return t.DEPTH_COMPONENT;if(r===1027)return t.DEPTH_STENCIL;if(r===1028)return t.RED;if(r===1029)return t.RED_INTEGER;if(r===1030)return t.RG;if(r===1031)return t.RG_INTEGER;if(r===1033)return t.RGBA_INTEGER;if(r===33776||r===33777||r===33778||r===33779)if(s==="srgb")if(n=e.get("WEBGL_compressed_texture_s3tc_srgb"),n!==null){if(r===33776)return n.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===33777)return n.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===33778)return n.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===33779)return n.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(n=e.get("WEBGL_compressed_texture_s3tc"),n!==null){if(r===33776)return n.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===33777)return n.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===33778)return n.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===33779)return n.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===35840||r===35841||r===35842||r===35843)if(n=e.get("WEBGL_compressed_texture_pvrtc"),n!==null){if(r===35840)return n.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===35841)return n.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===35842)return n.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===35843)return n.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===36196||r===37492||r===37496||r===37488||r===37489||r===37490||r===37491)if(n=e.get("WEBGL_compressed_texture_etc"),n!==null){if(r===36196||r===37492)return s==="srgb"?n.COMPRESSED_SRGB8_ETC2:n.COMPRESSED_RGB8_ETC2;if(r===37496)return s==="srgb"?n.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:n.COMPRESSED_RGBA8_ETC2_EAC;if(r===37488)return n.COMPRESSED_R11_EAC;if(r===37489)return n.COMPRESSED_SIGNED_R11_EAC;if(r===37490)return n.COMPRESSED_RG11_EAC;if(r===37491)return n.COMPRESSED_SIGNED_RG11_EAC}else return null;if(r===37808||r===37809||r===37810||r===37811||r===37812||r===37813||r===37814||r===37815||r===37816||r===37817||r===37818||r===37819||r===37820||r===37821)if(n=e.get("WEBGL_compressed_texture_astc"),n!==null){if(r===37808)return s==="srgb"?n.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:n.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===37809)return s==="srgb"?n.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:n.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===37810)return s==="srgb"?n.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:n.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===37811)return s==="srgb"?n.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:n.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===37812)return s==="srgb"?n.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:n.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===37813)return s==="srgb"?n.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:n.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===37814)return s==="srgb"?n.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:n.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===37815)return s==="srgb"?n.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:n.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===37816)return s==="srgb"?n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:n.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===37817)return s==="srgb"?n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:n.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===37818)return s==="srgb"?n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:n.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===37819)return s==="srgb"?n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:n.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===37820)return s==="srgb"?n.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:n.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===37821)return s==="srgb"?n.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:n.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===36492||r===36494||r===36495)if(n=e.get("EXT_texture_compression_bptc"),n!==null){if(r===36492)return s==="srgb"?n.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:n.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===36494)return n.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===36495)return n.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===36283||r===36284||r===36285||r===36286)if(n=e.get("EXT_texture_compression_rgtc"),n!==null){if(r===36283)return n.COMPRESSED_RED_RGTC1_EXT;if(r===36284)return n.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===36285)return n.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===36286)return n.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===1020?t.UNSIGNED_INT_24_8:t[r]===void 0?null:t[r]}return{convert:i}}var of=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,lf=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,hf=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let i=new Zo(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new Qt({vertexShader:of,fragmentShader:lf,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new zt(new fl(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},uf=class extends Ei{constructor(t,e){super();let i=this,r=null,a=1,n=null,s="local-floor",o=1,l=null,h=null,u=null,d=null,c=null,p=null,g=typeof XRWebGLBinding<"u",M=new hf,m={},f=e.getContextAttributes(),T=null,w=null,_=[],E=[],A=new he,R=null,v=null,S=new It;S.viewport=new ht;let B=new It;B.viewport=new ht;let P=[S,B],O=new Vc,X=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let ie=_[q];return ie===void 0&&(ie=new ka,_[q]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(q){let ie=_[q];return ie===void 0&&(ie=new ka,_[q]=ie),ie.getGripSpace()},this.getHand=function(q){let ie=_[q];return ie===void 0&&(ie=new ka,_[q]=ie),ie.getHandSpace()};function V(q){let ie=E.indexOf(q.inputSource);if(ie===-1)return;let ne=_[ie];ne!==void 0&&(ne.update(q.inputSource,q.frame,l||n),ne.dispatchEvent({type:q.type,data:q.inputSource}))}function J(){r.removeEventListener("select",V),r.removeEventListener("selectstart",V),r.removeEventListener("selectend",V),r.removeEventListener("squeeze",V),r.removeEventListener("squeezestart",V),r.removeEventListener("squeezeend",V),r.removeEventListener("end",J),r.removeEventListener("inputsourceschange",G);for(let q=0;q<_.length;q++){let ie=E[q];ie!==null&&(E[q]=null,_[q].disconnect(ie))}X=null,N=null,M.reset();for(let q in m)delete m[q];if(t.setRenderTarget(T),c=null,d=null,u=null,r=null,w=null,Ve.stop(),i.isPresenting=!1,t.setPixelRatio(R),t.setSize(A.width,A.height,!1),v!==null){let q=v.camera;q.fov=v.fov,q.zoom=v.zoom,q.updateProjectionMatrix(),v=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){a=q,i.isPresenting===!0&&we("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){s=q,i.isPresenting===!0&&we("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||n},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return d===null?c:d},this.getBinding=function(){return u===null&&g&&(u=new XRWebGLBinding(r,e)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(q){if(r=q,r!==null){if(T=t.getRenderTarget(),r.addEventListener("select",V),r.addEventListener("selectstart",V),r.addEventListener("selectend",V),r.addEventListener("squeeze",V),r.addEventListener("squeezestart",V),r.addEventListener("squeezeend",V),r.addEventListener("end",J),r.addEventListener("inputsourceschange",G),f.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(A),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let ie=null,ne=null,Ce=null;f.depth&&(Ce=f.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ie=f.stencil?wo:Ir,ne=f.stencil?Eo:Ui);let Ue={colorFormat:e.RGBA8,depthFormat:Ce,scaleFactor:a};u=this.getBinding(),d=u.createProjectionLayer(Ue),r.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),w=new jt(d.textureWidth,d.textureHeight,{format:lr,type:bi,depthTexture:new Dr(d.textureWidth,d.textureHeight,ne,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:f.stencil,colorSpace:t.outputColorSpace,samples:f.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let ie={antialias:f.antialias,alpha:!0,depth:f.depth,stencil:f.stencil,framebufferScaleFactor:a};c=new XRWebGLLayer(r,e,ie),r.updateRenderState({baseLayer:c}),t.setPixelRatio(1),t.setSize(c.framebufferWidth,c.framebufferHeight,!1),w=new jt(c.framebufferWidth,c.framebufferHeight,{format:lr,type:bi,colorSpace:t.outputColorSpace,stencilBuffer:f.stencil,resolveDepthBuffer:c.ignoreDepthValues===!1,resolveStencilBuffer:c.ignoreDepthValues===!1,storeMultisampledDepthBuffer:c.ignoreDepthValues===!1,storeMultisampledStencilBuffer:c.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(o),l=null,n=await r.requestReferenceSpace(s),Ve.setContext(r),Ve.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return M.getDepthTexture()};function G(q){for(let ie=0;ie<q.removed.length;ie++){let ne=q.removed[ie],Ce=E.indexOf(ne);Ce>=0&&(E[Ce]=null,_[Ce].disconnect(ne))}for(let ie=0;ie<q.added.length;ie++){let ne=q.added[ie],Ce=E.indexOf(ne);if(Ce===-1){for(let de=0;de<_.length;de++)if(de>=E.length){E.push(ne),Ce=de;break}else if(E[de]===null){E[de]=ne,Ce=de;break}if(Ce===-1)break}let Ue=_[Ce];Ue&&Ue.connect(ne)}}let oe=new I,j=new I;function Y(q,ie,ne){oe.setFromMatrixPosition(ie.matrixWorld),j.setFromMatrixPosition(ne.matrixWorld);let Ce=oe.distanceTo(j),Ue=ie.projectionMatrix.elements,de=ne.projectionMatrix.elements,qe=Ue[14]/(Ue[10]-1),ee=Ue[14]/(Ue[10]+1),Z=(Ue[9]+1)/Ue[5],se=(Ue[9]-1)/Ue[5],ye=(Ue[8]-1)/Ue[0],ve=(de[8]+1)/de[0],Re=qe*ye,Ie=qe*ve,He=Ce/(-ye+ve),Ge=He*-ye;if(ie.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Ge),q.translateZ(He),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),Ue[10]===-1)q.projectionMatrix.copy(ie.projectionMatrix),q.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{let C=qe+He,ct=ee+He,$e=Re-Ge,Ze=Ie+(Ce-Ge),b=Z*ee/ct*C,x=se*ee/ct*C;q.projectionMatrix.makePerspective($e,Ze,b,x,C,ct),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function Q(q,ie){ie===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(ie.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(r===null)return;let ie=q.near,ne=q.far;M.texture!==null&&(M.depthNear>0&&(ie=M.depthNear),M.depthFar>0&&(ne=M.depthFar)),O.near=B.near=S.near=ie,O.far=B.far=S.far=ne,(X!==O.near||N!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),X=O.near,N=O.far),O.layers.mask=q.layers.mask|6,S.layers.mask=O.layers.mask&-5,B.layers.mask=O.layers.mask&-3;let Ce=q.parent,Ue=O.cameras;Q(O,Ce);for(let de=0;de<Ue.length;de++)Q(Ue[de],Ce);Ue.length===2?Y(O,S,B):O.projectionMatrix.copy(S.projectionMatrix),v===null&&q.isPerspectiveCamera&&(v={camera:q,fov:q.fov,zoom:q.zoom}),ze(q,O,Ce)};function ze(q,ie,ne){ne===null?q.matrix.copy(ie.matrixWorld):(q.matrix.copy(ne.matrixWorld),q.matrix.invert(),q.matrix.multiply(ie.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(ie.projectionMatrix),q.projectionMatrixInverse.copy(ie.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=ur*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(d!==null||c!==null)return o},this.setFoveation=function(q){o=q,d!==null&&(d.fixedFoveation=q),c!==null&&c.fixedFoveation!==void 0&&(c.fixedFoveation=q)},this.hasDepthSensing=function(){return M.texture!==null},this.getDepthSensingMesh=function(){return M.getMesh(O)},this.getCameraTexture=function(q){return m[q]};let Ae=null;function nt(q,ie){if(h=ie.getViewerPose(l||n),p=ie,h!==null){let ne=h.views;c!==null&&(t.setRenderTargetFramebuffer(w,c.framebuffer),t.setRenderTarget(w));let Ce=!1;ne.length!==O.cameras.length&&(O.cameras.length=0,Ce=!0);for(let de=0;de<ne.length;de++){let qe=ne[de],ee=null;if(c!==null)ee=c.getViewport(qe);else{let se=u.getViewSubImage(d,qe);ee=se.viewport,de===0&&(t.setRenderTargetTextures(w,se.colorTexture,se.depthStencilTexture),t.setRenderTarget(w))}let Z=P[de];Z===void 0&&(Z=new It,Z.layers.enable(de),Z.viewport=new ht,P[de]=Z),Z.matrix.fromArray(qe.transform.matrix),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.projectionMatrix.fromArray(qe.projectionMatrix),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert(),Z.viewport.set(ee.x,ee.y,ee.width,ee.height),de===0&&(O.matrix.copy(Z.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Ce===!0&&O.cameras.push(Z)}let Ue=r.enabledFeatures;if(Ue&&Ue.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&g){u=i.getBinding();let de=u.getDepthInformation(ne[0]);de&&de.isValid&&de.texture&&M.init(de,r.renderState)}if(Ue&&Ue.includes("camera-access")&&g){t.state.unbindTexture(),u=i.getBinding();for(let de=0;de<ne.length;de++){let qe=ne[de].camera;if(qe){let ee=m[qe];ee||(ee=new Zo,m[qe]=ee);let Z=u.getCameraImage(qe);ee.sourceTexture=Z}}}}for(let ne=0;ne<_.length;ne++){let Ce=E[ne],Ue=_[ne];Ce!==null&&Ue!==void 0&&Ue.update(Ce,ie,l||n)}Ae&&Ae(q,ie),ie.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ie}),p=null}let Ve=new El;Ve.setAnimationLoop(nt),this.setAnimationLoop=function(q){Ae=q},this.dispose=function(){}}},cf=new Je,Nl=new We;Nl.set(-1,0,0,0,1,0,0,0,1);function df(t,e){function i(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function r(m,f){f.color.getRGB(m.fogColor.value,xl(t)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function a(m,f,T,w,_){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?n(m,f):f.isMeshLambertMaterial?(n(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(n(m,f),d(m,f)):f.isMeshPhongMaterial?(n(m,f),u(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(n(m,f),c(m,f),f.isMeshPhysicalMaterial&&p(m,f,_)):f.isMeshMatcapMaterial?(n(m,f),g(m,f)):f.isMeshDepthMaterial?n(m,f):f.isMeshDistanceMaterial?(n(m,f),M(m,f)):f.isMeshNormalMaterial?n(m,f):f.isLineBasicMaterial?(s(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,T,w):f.isSpriteMaterial?h(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function n(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,i(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,i(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,i(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===1&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,i(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===1&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,i(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,i(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,i(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let T=e.get(f),w=T.envMap,_=T.envMapRotation;w&&(m.envMap.value=w,m.envMapRotation.value.setFromMatrix4(cf.makeRotationFromEuler(_)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Nl),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,i(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,i(f.aoMap,m.aoMapTransform))}function s(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,i(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,T,w){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*T,m.scale.value=w*.5,f.map&&(m.map.value=f.map,i(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,i(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,i(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,i(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function c(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,i(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,i(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,T){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,i(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,i(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,i(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,i(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,i(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===1&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.retroreflectivity>0&&(m.retroreflectivity.value=f.retroreflectivity),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,i(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,i(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,i(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,i(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,i(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,i(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,i(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function M(m,f){let T=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:a}}function pf(t,e,i,r){let a={},n={},s=[],o=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,E){let A=E.program;r.uniformBlockBinding(_,A)}function h(_,E){let A=a[_.id];A===void 0&&(m(_),A=u(_),a[_.id]=A,_.addEventListener("dispose",T));let R=E.program;r.updateUBOMapping(_,R);let v=e.render.frame;n[_.id]!==v&&(c(_),n[_.id]=v)}function u(_){let E=d();_.__bindingPointIndex=E;let A=t.createBuffer(),R=_.__size,v=_.usage;return t.bindBuffer(t.UNIFORM_BUFFER,A),t.bufferData(t.UNIFORM_BUFFER,R,v),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,E,A),A}function d(){for(let _=0;_<o;_++)if(s.indexOf(_)===-1)return s.push(_),_;return Fe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function c(_){let E=a[_.id],A=_.uniforms,R=_.__cache;t.bindBuffer(t.UNIFORM_BUFFER,E);for(let v=0,S=A.length;v<S;v++){let B=A[v];if(Array.isArray(B))for(let P=0,O=B.length;P<O;P++)p(B[P],v,P,R);else p(B,v,0,R)}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(_,E,A,R){if(M(_,E,A,R)===!0){let v=_.__offset,S=_.value;if(Array.isArray(S)){let B=0;for(let P=0;P<S.length;P++){let O=S[P],X=f(O);g(O,_.__data,B),typeof O!="number"&&typeof O!="boolean"&&!O.isMatrix3&&!ArrayBuffer.isView(O)&&(B+=X.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(S,_.__data,0);t.bufferSubData(t.UNIFORM_BUFFER,v,_.__data)}}function g(_,E,A){typeof _=="number"||typeof _=="boolean"?E[0]=_:_.isMatrix3?(E[0]=_.elements[0],E[1]=_.elements[1],E[2]=_.elements[2],E[3]=0,E[4]=_.elements[3],E[5]=_.elements[4],E[6]=_.elements[5],E[7]=0,E[8]=_.elements[6],E[9]=_.elements[7],E[10]=_.elements[8],E[11]=0):ArrayBuffer.isView(_)?E.set(new _.constructor(_.buffer,_.byteOffset,E.length)):_.toArray(E,A)}function M(_,E,A,R){let v=_.value,S=E+"_"+A;if(R[S]===void 0)return R[S]=typeof v=="number"||typeof v=="boolean"?v:ArrayBuffer.isView(v)?v.slice():v.clone(),!0;{let B=R[S];if(typeof v=="number"||typeof v=="boolean"){if(B!==v)return R[S]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(B.equals(v)===!1)return B.copy(v),!0}}return!1}function m(_){let E=_.uniforms,A=0;for(let v=0,S=E.length;v<S;v++){let B=Array.isArray(E[v])?E[v]:[E[v]];for(let P=0,O=B.length;P<O;P++){let X=B[P],N=Array.isArray(X.value)?X.value:[X.value];for(let V=0,J=N.length;V<J;V++){let G=N[V],oe=f(G),j=A%16,Y=j%oe.boundary,Q=j+Y;A+=Y,Q!==0&&16-Q<oe.storage&&(A+=16-Q),X.__data=new Float32Array(oe.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=A,A+=oe.storage}}}let R=A%16;return R>0&&(A+=16-R),_.__size=A,_.__cache={},this}function f(_){let E={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(E.boundary=4,E.storage=4):_.isVector2?(E.boundary=8,E.storage=8):_.isVector3||_.isColor?(E.boundary=16,E.storage=12):_.isVector4?(E.boundary=16,E.storage=16):_.isMatrix3?(E.boundary=48,E.storage=48):_.isMatrix4?(E.boundary=64,E.storage=64):_.isTexture?we("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(E.boundary=16,E.storage=_.byteLength):we("WebGLRenderer: Unsupported uniform value type.",_),E}function T(_){let E=_.target;E.removeEventListener("dispose",T);let A=s.indexOf(E.__bindingPointIndex);s.splice(A,1),t.deleteBuffer(a[E.id]),delete a[E.id],delete n[E.id]}function w(){for(let _ in a)t.deleteBuffer(a[_]);s=[],a={},n={}}return{bind:l,update:h,dispose:w}}var ff=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Kt=null;function mf(){return Kt===null&&(Kt=new On(ff,16,16,Ta,Ti),Kt.name="DFG_LUT",Kt.minFilter=Ut,Kt.magFilter=Ut,Kt.wrapS=hi,Kt.wrapT=hi,Kt.generateMipmaps=!1,Kt.needsUpdate=!0),Kt}var wm=class{constructor(t={}){let{canvas:e=Oh(),context:i=null,depth:r=!0,stencil:a=!1,alpha:n=!1,antialias:s=!1,premultipliedAlpha:o=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:c=bi}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=n;let g=c,M=new Set([Po,Co,Ro]),m=new Set([bi,Ui,So,Eo,bo,To]),f=new Uint32Array(4),T=new Int32Array(4),w=new I,_=null,E=null,A=[],R=[],v=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let S=this,B=!1,P=null,O=null,X=null,N=null;this._outputColorSpace=kt;let V=0,J=0,G=null,oe=-1,j=null,Y=new ht,Q=new ht,ze=null,Ae=new ke(0),nt=0,Ve=e.width,q=e.height,ie=1,ne=null,Ce=null,Ue=new ht(0,0,Ve,q),de=new ht(0,0,Ve,q),qe=!1,ee=new Fn,Z=!1,se=!1,ye=new Je,ve=new I,Re=new ht,Ie={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},He=!1;function Ge(){return G===null?ie:1}let C=i;function ct(y,U){return e.getContext(y,U)}let $e,Ze,b,x,L,k,$,ce,pe,F,le,me,Se,re,Le,Ne,Be,it,D,K,te,xe,Ee;try{let y={alpha:!0,depth:r,stencil:a,antialias:s,premultipliedAlpha:o,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine","three.js r186"),e.addEventListener("webglcontextlost",Oe,!1),e.addEventListener("webglcontextrestored",vt,!1),e.addEventListener("webglcontextcreationerror",rt,!1),C===null){let U="webgl2";if(C=ct(U,y),C===null)throw ct(U)?Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):Error("THREE.WebGLRenderer: Error creating WebGL context.")}ae()}catch(y){throw e.removeEventListener("webglcontextlost",Oe,!1),e.removeEventListener("webglcontextrestored",vt,!1),e.removeEventListener("webglcontextcreationerror",rt,!1),Fe("WebGLRenderer: "+y.message),y}function ae(){$e=new fd(C),$e.init(),te=new sf(C,$e),Ze=new ad(C,$e,t,te),b=new af(C,$e),Ze.reversedDepthBuffer&&d&&b.buffers.depth.setReversed(!0),O=C.createFramebuffer(),X=C.createFramebuffer(),N=C.createFramebuffer(),x=new vd(C),L=new kp,k=new nf(C,$e,b,L,Ze,te,x),$=new pd(S),ce=new Qc(C),xe=new id(C,ce),pe=new md(C,ce,x,xe),F=new xd(C,pe,ce,xe,x),it=new _d(C,Ze,k),Le=new nd(L),le=new Gp(S,$,$e,Ze,xe,Le),me=new df(S,L),Se=new Xp,re=new Kp($e),Be=new td(S,$,b,F,p,o),Ne=new rf(S,F,Ze),Ee=new pf(C,x,Ze,b),D=new rd(C,$e,x),K=new gd(C,$e,x),x.programs=le.programs,S.capabilities=Ze,S.extensions=$e,S.properties=L,S.renderLists=Se,S.shadowMap=Ne,S.state=b,S.info=x}g!==1009&&(v=new Md(g,e.width,e.height,s,r,a));let _e=new uf(S,C);this.xr=_e,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){let y=$e.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){let y=$e.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return ie},this.setPixelRatio=function(y){y!==void 0&&(ie=y,this.setSize(Ve,q,!1))},this.getSize=function(y){return y.set(Ve,q)},this.setSize=function(y,U,W=!0){if(_e.isPresenting){we("WebGLRenderer: Can't change size while VR device is presenting.");return}Ve=y,q=U,e.width=Math.floor(y*ie),e.height=Math.floor(U*ie),W===!0&&(e.style.width=y+"px",e.style.height=U+"px"),v!==null&&v.setSize(e.width,e.height),this.setViewport(0,0,y,U)},this.getDrawingBufferSize=function(y){return y.set(Ve*ie,q*ie).floor()},this.setDrawingBufferSize=function(y,U,W){Ve=y,q=U,ie=W,e.width=Math.floor(y*W),e.height=Math.floor(U*W),this.setViewport(0,0,y,U)},this.setEffects=function(y){if(g===1009){Fe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(y){for(let U=0;U<y.length;U++)if(y[U].isOutputPass===!0){we("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}v.setEffects(y||[])},this.getCurrentViewport=function(y){return y.copy(Y)},this.getViewport=function(y){return y.copy(Ue)},this.setViewport=function(y,U,W,H){y.isVector4?Ue.set(y.x,y.y,y.z,y.w):Ue.set(y,U,W,H),b.viewport(Y.copy(Ue).multiplyScalar(ie).round())},this.getScissor=function(y){return y.copy(de)},this.setScissor=function(y,U,W,H){y.isVector4?de.set(y.x,y.y,y.z,y.w):de.set(y,U,W,H),b.scissor(Q.copy(de).multiplyScalar(ie).round())},this.getScissorTest=function(){return qe},this.setScissorTest=function(y){b.setScissorTest(qe=y)},this.setOpaqueSort=function(y){ne=y},this.setTransparentSort=function(y){Ce=y},this.getClearColor=function(y){return y.copy(Be.getClearColor())},this.setClearColor=function(){Be.setClearColor(...arguments)},this.getClearAlpha=function(){return Be.getClearAlpha()},this.setClearAlpha=function(){Be.setClearAlpha(...arguments)},this.clear=function(y=!0,U=!0,W=!0){let H=0;if(y){let z=!1;if(G!==null){let ue=G.texture.format;z=M.has(ue)}if(z){let ue=G.texture.type,ge=m.has(ue),Me=Be.getClearColor(),be=Be.getClearAlpha(),De=Me.r,Ye=Me.g,Qe=Me.b;ge?(f[0]=De,f[1]=Ye,f[2]=Qe,f[3]=be,C.clearBufferuiv(C.COLOR,0,f)):(T[0]=De,T[1]=Ye,T[2]=Qe,T[3]=be,C.clearBufferiv(C.COLOR,0,T))}else H|=C.COLOR_BUFFER_BIT}U&&(H|=C.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),W&&(H|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&C.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(y){y.setRenderer(this),P=y},this.dispose=function(){e.removeEventListener("webglcontextlost",Oe,!1),e.removeEventListener("webglcontextrestored",vt,!1),e.removeEventListener("webglcontextcreationerror",rt,!1),Be.dispose(),Se.dispose(),re.dispose(),L.dispose(),$.dispose(),F.dispose(),xe.dispose(),Ee.dispose(),le.dispose(),_e.dispose(),_e.removeEventListener("sessionstart",jn),_e.removeEventListener("sessionend",qn),Ai.stop()};function Oe(y){y.preventDefault(),Ra("WebGLRenderer: Context Lost."),B=!0}function vt(){Ra("WebGLRenderer: Context Restored."),B=!1;let y=x.autoReset,U=Ne.enabled,W=Ne.autoUpdate,H=Ne.needsUpdate,z=Ne.type;ae(),x.autoReset=y,Ne.enabled=U,Ne.autoUpdate=W,Ne.needsUpdate=H,Ne.type=z}function rt(y){Fe("WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Yt(y){let U=y.target;U.removeEventListener("dispose",Yt),ti(U)}function ti(y){Il(y),L.remove(y)}function Il(y){let U=L.get(y).programs;U!==void 0&&(U.forEach(function(W){le.releaseProgram(W)}),y.isShaderMaterial&&le.releaseShaderCache(y))}this.renderBufferDirect=function(y,U,W,H,z,ue){U===null&&(U=Ie);let ge=z.isMesh&&z.matrixWorld.determinantAffine()<0,Me=Ol(y,U,W,H,z);b.setMaterial(H,ge);let be=W.index,De=1;if(H.wireframe===!0){if(be=pe.getWireframeAttribute(W),be===void 0)return;De=2}let Ye=W.drawRange,Qe=W.attributes.position,Pe=Ye.start*De,st=(Ye.start+Ye.count)*De;ue!==null&&(Pe=Math.max(Pe,ue.start*De),st=Math.min(st,(ue.start+ue.count)*De)),be===null?Qe!=null&&(Pe=Math.max(Pe,0),st=Math.min(st,Qe.count)):(Pe=Math.max(Pe,0),st=Math.min(st,be.count));let ft=st-Pe;if(ft<0||ft===1/0)return;xe.setup(z,H,Me,W,be);let ut,et=D;if(be!==null&&(ut=ce.get(be),et=K,et.setIndex(ut)),z.isMesh)H.wireframe===!0?(b.setLineWidth(H.wireframeLinewidth*Ge()),et.setMode(C.LINES)):et.setMode(C.TRIANGLES);else if(z.isLine){let bt=H.linewidth;bt===void 0&&(bt=1),b.setLineWidth(bt*Ge()),z.isLineSegments?et.setMode(C.LINES):z.isLineLoop?et.setMode(C.LINE_LOOP):et.setMode(C.LINE_STRIP)}else z.isPoints?et.setMode(C.POINTS):z.isSprite&&et.setMode(C.TRIANGLES);if(z.isBatchedMesh)if($e.get("WEBGL_multi_draw"))et.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{let bt=z._multiDrawStarts,Te=z._multiDrawCounts,Ct=z._multiDrawCount,Pt=be?ce.get(be).bytesPerElement:1,Ot=L.get(H).currentProgram.getUniforms();for(let Jt=0;Jt<Ct;Jt++)Ot.setValue(C,"_gl_DrawID",Jt),et.render(bt[Jt]/Pt,Te[Jt])}else if(z.isInstancedMesh)et.renderInstances(Pe,ft,z.count);else if(W.isInstancedBufferGeometry){let bt=W._maxInstanceCount===void 0?1/0:W._maxInstanceCount,Te=Math.min(W.instanceCount,bt);et.renderInstances(Pe,ft,Te)}else et.render(Pe,ft)};function Xn(y,U,W,H){P!==null&&y.isNodeMaterial&&P.setObject(H,y),Z===!0&&Le.setState(y,W,!1),y.transparent===!0&&y.side===2&&y.forceSinglePass===!1?(y.side=1,y.needsUpdate=!0,kr(y,U,H),y.side=0,y.needsUpdate=!0,kr(y,U,H),y.side=2):kr(y,U,H)}this.compile=function(y,U,W=null){W===null&&(W=y),P!==null&&P.renderStart(y,U,W),E=re.get(W),E.init(U),R.push(E),W.traverseVisible(function(z){z.isLight&&z.layers.test(U.layers)&&(E.pushLight(z),z.castShadow&&E.pushShadow(z))}),y!==W&&y.traverseVisible(function(z){z.isLight&&z.layers.test(U.layers)&&(E.pushLight(z),z.castShadow&&E.pushShadow(z))}),E.setupLights(),P!==null&&P.updateLights(E.state.lightsArray),se=this.localClippingEnabled,Z=Le.init(this.clippingPlanes,se),Z===!0&&Le.setGlobalState(this.clippingPlanes,U),P!==null&&Ne.render(E.state.shadowsArray,W,U);let H=new Set;return y.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;let ue=z.material;if(ue)if(Array.isArray(ue))for(let ge=0;ge<ue.length;ge++){let Me=ue[ge];Xn(Me,W,U,z),H.add(Me)}else Xn(ue,W,U,z),H.add(ue)}),E=R.pop(),P!==null&&P.renderEnd(),H},this.compileAsync=function(y,U,W=null){let H=this.compile(y,U,W);return new Promise(z=>{function ue(){if(H.forEach(function(ge){let Me=L.get(ge).currentProgram;(Me===void 0||Me.isReady())&&H.delete(ge)}),H.size===0){z(y);return}setTimeout(ue,10)}$e.get("KHR_parallel_shader_compile")===null?setTimeout(ue,10):ue()})};let Ua=null;function Ul(y){Ua&&Ua(y)}function jn(){Ai.stop()}function qn(){Ai.start()}let Ai=new El;Ai.setAnimationLoop(Ul),typeof self<"u"&&Ai.setContext(self),this.setAnimationLoop=function(y){Ua=y,_e.setAnimationLoop(y),y===null?Ai.stop():Ai.start()},_e.addEventListener("sessionstart",jn),_e.addEventListener("sessionend",qn),this.render=function(y,U){if(U!==void 0&&U.isCamera!==!0){Fe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(B===!0)return;P!==null&&P.renderStart(y,U);let W=_e.enabled===!0&&_e.isPresenting===!0,H=v!==null&&(G===null||W)&&v.begin(S,G);if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),_e.enabled===!0&&_e.isPresenting===!0&&(v===null||v.isCompositing()===!1)&&(_e.cameraAutoUpdate===!0&&_e.updateCamera(U),U=_e.getCamera()),y.isScene===!0&&y.onBeforeRender(S,y,U,G),E=re.get(y,R.length),E.init(U),E.state.textureUnits=k.getTextureUnits(),R.push(E),ye.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),ee.setFromProjectionMatrix(ye,hr,U.reversedDepth),se=this.localClippingEnabled,Z=Le.init(this.clippingPlanes,se),_=Se.get(y,A.length),_.init(),A.push(_),_e.enabled===!0&&_e.isPresenting===!0){let ue=S.xr.getDepthSensingMesh();ue!==null&&Da(ue,U,-1/0,S.sortObjects)}Da(y,U,0,S.sortObjects),_.finish(),P!==null&&P.updateLights(E.state.lightsArray),S.sortObjects===!0&&_.sort(ne,Ce),He=_e.enabled===!1||_e.isPresenting===!1||_e.hasDepthSensing()===!1,He&&Be.addToRenderList(_,y),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Z===!0&&Le.beginShadows();let z=E.state.shadowsArray;if(Ne.render(z,y,U),Z===!0&&Le.endShadows(),(H&&v.hasRenderPass())===!1){let ue=_.opaque,ge=_.transmissive;if(E.setupLights(),U.isArrayCamera){let Me=U.cameras;if(ge.length>0)for(let be=0,De=Me.length;be<De;be++){let Ye=Me[be];Jn(ue,ge,y,Ye)}He&&Be.render(y);for(let be=0,De=Me.length;be<De;be++){let Ye=Me[be];Yn(_,y,Ye,Ye.viewport)}}else ge.length>0&&Jn(ue,ge,y,U),He&&Be.render(y),Yn(_,y,U)}G!==null&&J===0&&(k.updateMultisampleRenderTarget(G),k.updateRenderTargetMipmap(G)),H&&v.end(S),y.isScene===!0&&y.onAfterRender(S,y,U),xe.resetDefaultState(),oe=-1,j=null,R.pop(),R.length>0?(E=R[R.length-1],k.setTextureUnits(E.state.textureUnits),Z===!0&&Le.setGlobalState(S.clippingPlanes,E.state.camera)):E=null,A.pop(),_=A.length>0?A[A.length-1]:null,P!==null&&P.renderEnd()};function Da(y,U,W,H){if(y.visible===!1)return;if(y.layers.test(U.layers)){if(y.isGroup)W=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(U);else if(y.isLightProbeGrid)E.pushLightProbeGrid(y);else if(y.isLight)E.pushLight(y),y.castShadow&&E.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||y.intersectsFrustum(ee)){H&&Re.setFromMatrixPosition(y.matrixWorld).applyMatrix4(ye);let ue=F.update(y),ge=y.material;ge.visible&&_.push(y,ue,ge,W,Re.z,null,U)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||y.intersectsFrustum(ee))){let ue=F.update(y),ge=y.material;if(H&&(y.boundingSphere===void 0?(ue.boundingSphere===null&&ue.computeBoundingSphere(),Re.copy(ue.boundingSphere.center)):(y.boundingSphere===null&&y.computeBoundingSphere(),Re.copy(y.boundingSphere.center)),Re.applyMatrix4(y.matrixWorld).applyMatrix4(ye)),Array.isArray(ge)){let Me=ue.groups;for(let be=0,De=Me.length;be<De;be++){let Ye=Me[be],Qe=ge[Ye.materialIndex];Qe&&Qe.visible&&_.push(y,ue,Qe,W,Re.z,Ye,U)}}else ge.visible&&_.push(y,ue,ge,W,Re.z,null,U)}}let z=y.children;for(let ue=0,ge=z.length;ue<ge;ue++)Da(z[ue],U,W,H)}function Yn(y,U,W,H){let{opaque:z,transmissive:ue,transparent:ge}=y;E.setupLightsView(W),Z===!0&&Le.setGlobalState(S.clippingPlanes,W),H&&b.viewport(Y.copy(H)),z.length>0&&Gr(z,U,W),ue.length>0&&Gr(ue,U,W),ge.length>0&&Gr(ge,U,W),b.buffers.depth.setTest(!0),b.buffers.depth.setMask(!0),b.buffers.color.setMask(!0),b.setPolygonOffset(!1)}function Jn(y,U,W,H){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[H.id]===void 0){let Qe=$e.has("EXT_color_buffer_half_float")||$e.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[H.id]=new jt(1,1,{generateMipmaps:!0,type:Qe?Ti:bi,minFilter:Nn,samples:Math.max(4,Ze.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ke.workingColorSpace})}let z=E.state.transmissionRenderTarget[H.id],ue=H.viewport||Y;z.setSize(ue.z*S.transmissionResolutionScale,ue.w*S.transmissionResolutionScale);let ge=S.getRenderTarget(),Me=S.getActiveCubeFace(),be=S.getActiveMipmapLevel();S.setRenderTarget(z),S.getClearColor(Ae),nt=S.getClearAlpha(),nt<1&&S.setClearColor(16777215,.5),S.clear(),He&&Be.render(W);let De=S.toneMapping;S.toneMapping=0;let Ye=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),E.setupLightsView(H),Z===!0&&Le.setGlobalState(S.clippingPlanes,H),Gr(y,W,H),k.updateMultisampleRenderTarget(z),k.updateRenderTargetMipmap(z),$e.has("WEBGL_multisampled_render_to_texture")===!1){let Qe=!1;for(let Pe=0,st=U.length;Pe<st;Pe++){let{object:ft,geometry:ut,material:et,group:bt}=U[Pe];if(et.side===2&&ft.layers.test(H.layers)){let Te=et.side;et.side=1,et.needsUpdate=!0,Zn(ft,W,H,ut,et,bt),et.side=Te,et.needsUpdate=!0,Qe=!0}}Qe===!0&&(k.updateMultisampleRenderTarget(z),k.updateRenderTargetMipmap(z))}S.setRenderTarget(ge,Me,be),S.setClearColor(Ae,nt),Ye!==void 0&&(H.viewport=Ye),S.toneMapping=De}function Gr(y,U,W){let H=U.isScene===!0?U.overrideMaterial:null;for(let z=0,ue=y.length;z<ue;z++){let ge=y[z],{object:Me,geometry:be,group:De}=ge,Ye=ge.material;Ye.allowOverride===!0&&H!==null&&(Ye=H),Me.layers.test(W.layers)&&Zn(Me,U,W,be,Ye,De)}}function Zn(y,U,W,H,z,ue){P!==null&&z.isNodeMaterial&&P.setObject(y,z),y.onBeforeRender(S,U,W,H,z,ue),y.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),z.onBeforeRender(S,U,W,H,y,ue),z.transparent===!0&&z.side===2&&z.forceSinglePass===!1?(z.side=1,z.needsUpdate=!0,S.renderBufferDirect(W,U,H,z,y,ue),z.side=0,z.needsUpdate=!0,S.renderBufferDirect(W,U,H,z,y,ue),z.side=2):S.renderBufferDirect(W,U,H,z,y,ue),y.onAfterRender(S,U,W,H,z,ue)}function kr(y,U,W){U.isScene!==!0&&(U=Ie);let H=L.get(y),z=E.state.lights,ue=E.state.shadowsArray,ge=z.state.version,Me=le.getParameters(y,z.state,ue,U,W,E.state.lightProbeGridArray),be=le.getProgramCacheKey(Me),De=H.programs;H.environment=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?U.environment:null,H.fog=U.fog;let Ye=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap;H.envMap=$.get(y.envMap||H.environment,Ye),H.envMapRotation=H.environment!==null&&y.envMap===null?U.environmentRotation:y.envMapRotation,De===void 0&&(y.addEventListener("dispose",Yt),De=new Map,H.programs=De);let Qe=De.get(be);if(Qe!==void 0){if(H.currentProgram===Qe&&H.lightsStateVersion===ge)return $n(y,Me),Qe}else Me.uniforms=le.getUniforms(y),P!==null&&y.isNodeMaterial&&P.build(y,W,Me),y.onBeforeCompile(Me,S),Qe=le.acquireProgram(Me,be),De.set(be,Qe),H.uniforms=Me.uniforms;let Pe=H.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Pe.clippingPlanes=Le.uniform),$n(y,Me),H.needsLights=Bl(y),H.lightsStateVersion=ge,H.needsLights&&(Pe.ambientLightColor.value=z.state.ambient,Pe.lightProbe.value=z.state.probe,Pe.sunLights.value=z.state.sun,Pe.sunLightShadows.value=z.state.sunShadow,Pe.directionalLights.value=z.state.directional,Pe.directionalLightShadows.value=z.state.directionalShadow,Pe.spotLights.value=z.state.spot,Pe.spotLightShadows.value=z.state.spotShadow,Pe.rectAreaLights.value=z.state.rectArea,Pe.ltc_1.value=z.state.rectAreaLTC1,Pe.ltc_2.value=z.state.rectAreaLTC2,Pe.pointLights.value=z.state.point,Pe.pointLightShadows.value=z.state.pointShadow,Pe.hemisphereLights.value=z.state.hemi,Pe.sunShadowMatrix.value=z.state.sunShadowMatrix,Pe.sunShadowCascade.value=z.state.sunShadowCascade,Pe.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Pe.spotLightMatrix.value=z.state.spotLightMatrix,Pe.spotLightMap.value=z.state.spotLightMap,Pe.pointShadowMatrix.value=z.state.pointShadowMatrix),H.lightProbeGrid=E.state.lightProbeGridArray.length>0,H.currentProgram=Qe,H.uniformsList=null,Qe}function Kn(y){if(y.uniformsList===null){let U=y.currentProgram.getUniforms();y.uniformsList=ba.seqWithValue(U.seq,y.uniforms)}return y.uniformsList}function $n(y,U){let W=L.get(y);W.outputColorSpace=U.outputColorSpace,W.batching=U.batching,W.batchingColor=U.batchingColor,W.instancing=U.instancing,W.instancingColor=U.instancingColor,W.instancingMorph=U.instancingMorph,W.skinning=U.skinning,W.morphTargets=U.morphTargets,W.morphNormals=U.morphNormals,W.morphColors=U.morphColors,W.morphTargetsCount=U.morphTargetsCount,W.numClippingPlanes=U.numClippingPlanes,W.numIntersection=U.numClipIntersection,W.vertexAlphas=U.vertexAlphas,W.vertexTangents=U.vertexTangents,W.toneMapping=U.toneMapping}function Dl(y,U){if(y.length===0)return null;if(y.length===1)return y[0].texture===null?null:y[0];w.setFromMatrixPosition(U.matrixWorld);for(let W=0,H=y.length;W<H;W++){let z=y[W];if(z.texture!==null&&z.boundingBox.containsPoint(w))return z}return null}function Ol(y,U,W,H,z){U.isScene!==!0&&(U=Ie),k.resetTextureUnits();let ue=U.fog,ge=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?U.environment:null,Me=G===null?S.outputColorSpace:G.isXRRenderTarget===!0?G.texture.colorSpace:Ke.workingColorSpace,be=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,De=$.get(H.envMap||ge,be),Ye=H.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Qe=!!W.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Pe=!!W.morphAttributes.position,st=!!W.morphAttributes.normal,ft=!!W.morphAttributes.color,ut=0;H.toneMapped&&(G===null||G.isXRRenderTarget===!0)&&(ut=S.toneMapping);let et=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,bt=et===void 0?0:et.length,Te=L.get(H),Ct=E.state.lights;if(Z===!0&&(se===!0||y!==j)){let lt=y===j&&H.id===oe;Le.setState(H,y,lt)}let Pt=!1;H.version===Te.__version?Te.needsLights&&Te.lightsStateVersion!==Ct.state.version?Pt=!0:Te.outputColorSpace===Me?z.isBatchedMesh&&Te.batching===!1||!z.isBatchedMesh&&Te.batching===!0||z.isBatchedMesh&&Te.batchingColor===!0&&z._colorsTexture===null||z.isBatchedMesh&&Te.batchingColor===!1&&z._colorsTexture!==null||z.isInstancedMesh&&Te.instancing===!1||!z.isInstancedMesh&&Te.instancing===!0||z.isSkinnedMesh&&Te.skinning===!1||!z.isSkinnedMesh&&Te.skinning===!0||z.isInstancedMesh&&Te.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Te.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&Te.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&Te.instancingMorph===!1&&z.morphTexture!==null?Pt=!0:Te.envMap===De?H.fog===!0&&Te.fog!==ue||Te.numClippingPlanes!==void 0&&(Te.numClippingPlanes!==Le.numPlanes||Te.numIntersection!==Le.numIntersection)?Pt=!0:Te.vertexAlphas===Ye&&Te.vertexTangents===Qe&&Te.morphTargets===Pe&&Te.morphNormals===st&&Te.morphColors===ft&&Te.toneMapping===ut&&Te.morphTargetsCount===bt?!!Te.lightProbeGrid!=E.state.lightProbeGridArray.length>0&&(Pt=!0):Pt=!0:Pt=!0:Pt=!0:(Pt=!0,Te.__version=H.version);let Ot=Te.currentProgram;Pt===!0&&(Ot=kr(H,U,z),P&&H.isNodeMaterial&&P.onUpdateProgram(H,Ot,Te));let Jt=!1,fi=!1,Bi=!1,ot=Ot.getUniforms(),mt=Te.uniforms;if(b.useProgram(Ot.program)&&(Jt=!0,fi=!0,Bi=!0),H.id!==oe&&(oe=H.id,fi=!0),Te.needsLights){let lt=Dl(E.state.lightProbeGridArray,z);Te.lightProbeGrid!==lt&&(Te.lightProbeGrid=lt,fi=!0)}if(Jt||j!==y){b.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),ot.setValue(C,"projectionMatrix",y.projectionMatrix),ot.setValue(C,"viewMatrix",y.matrixWorldInverse);let lt=ot.map.cameraPosition;lt!==void 0&&lt.setValue(C,ve.setFromMatrixPosition(y.matrixWorld)),Ze.logarithmicDepthBuffer&&ot.setValue(C,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&ot.setValue(C,"isOrthographic",y.isOrthographicCamera===!0),j!==y&&(j=y,fi=!0,Bi=!0)}if(Te.needsLights&&(Ct.state.sunShadowMap.length>0&&ot.setValue(C,"sunShadowMap",Ct.state.sunShadowMap,k),Ct.state.directionalShadowMap.length>0&&ot.setValue(C,"directionalShadowMap",Ct.state.directionalShadowMap,k),Ct.state.spotShadowMap.length>0&&ot.setValue(C,"spotShadowMap",Ct.state.spotShadowMap,k),Ct.state.pointShadowMap.length>0&&ot.setValue(C,"pointShadowMap",Ct.state.pointShadowMap,k)),z.isSkinnedMesh){ot.setOptional(C,z,"bindMatrix"),ot.setOptional(C,z,"bindMatrixInverse");let lt=z.skeleton;lt&&(lt.boneTexture===null&&lt.computeBoneTexture(),ot.setValue(C,"boneTexture",lt.boneTexture,k))}z.isBatchedMesh&&(ot.setOptional(C,z,"batchingTexture"),ot.setValue(C,"batchingTexture",z._matricesTexture,k),ot.setOptional(C,z,"batchingIdTexture"),ot.setValue(C,"batchingIdTexture",z._indirectTexture,k),ot.setOptional(C,z,"batchingColorTexture"),z._colorsTexture!==null&&ot.setValue(C,"batchingColorTexture",z._colorsTexture,k));let mi=W.morphAttributes;if((mi.position!==void 0||mi.normal!==void 0||mi.color!==void 0)&&it.update(z,W,Ot),(fi||Te.receiveShadow!==z.receiveShadow)&&(Te.receiveShadow=z.receiveShadow,ot.setValue(C,"receiveShadow",z.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&U.environment!==null&&(mt.envMapIntensity.value=U.environmentIntensity),mt.dfgLUT!==void 0&&(mt.dfgLUT.value=mf()),fi){if(ot.setValue(C,"toneMappingExposure",S.toneMappingExposure),Te.needsLights&&Fl(mt,Bi),ue&&H.fog===!0&&me.refreshFogUniforms(mt,ue),me.refreshMaterialUniforms(mt,H,ie,q,E.state.transmissionRenderTarget[y.id]),Te.needsLights&&Te.lightProbeGrid){let lt=Te.lightProbeGrid;mt.probesSH.value=lt.texture,mt.probesMin.value.copy(lt.boundingBox.min),mt.probesMax.value.copy(lt.boundingBox.max),mt.probesResolution.value.copy(lt.resolution)}ba.upload(C,Kn(Te),mt,k)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(ba.upload(C,Kn(Te),mt,k),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&ot.setValue(C,"center",z.center),ot.setValue(C,"modelViewMatrix",z.modelViewMatrix),ot.setValue(C,"normalMatrix",z.normalMatrix),ot.setValue(C,"modelMatrix",z.matrixWorld),H.uniformsGroups!==void 0){let lt=H.uniformsGroups;for(let mr=0,zi=lt.length;mr<zi;mr++){let es=lt[mr];Ee.update(es,Ot),Ee.bind(es,Ot)}}return Ot}function Fl(y,U){y.ambientLightColor.needsUpdate=U,y.lightProbe.needsUpdate=U,y.sunLights.needsUpdate=U,y.sunLightShadows.needsUpdate=U,y.directionalLights.needsUpdate=U,y.directionalLightShadows.needsUpdate=U,y.pointLights.needsUpdate=U,y.pointLightShadows.needsUpdate=U,y.spotLights.needsUpdate=U,y.spotLightShadows.needsUpdate=U,y.rectAreaLights.needsUpdate=U,y.hemisphereLights.needsUpdate=U}function Bl(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return V},this.getActiveMipmapLevel=function(){return J},this.getRenderTarget=function(){return G},this.setRenderTargetTextures=function(y,U,W){let H=L.get(y);H.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),L.get(y.texture).__webglTexture=U,L.get(y.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:W,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,U){let W=L.get(y);W.__webglFramebuffer=U,W.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(y,U=0,W=0){G=y,V=U,J=W;let H=null,z=!1,ue=!1;if(y){let ge=L.get(y);if(ge.__useDefaultFramebuffer!==void 0){b.bindFramebuffer(C.FRAMEBUFFER,ge.__webglFramebuffer),Y.copy(y.viewport),Q.copy(y.scissor),ze=y.scissorTest,b.viewport(Y),b.scissor(Q),b.setScissorTest(ze),oe=-1;return}if(ge.__webglFramebuffer===void 0)k.setupRenderTarget(y);else if(ge.__hasExternalTextures)k.rebindTextures(y,L.get(y.texture).__webglTexture,L.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){let De=y.depthTexture;if(ge.__boundDepthTexture!==De){if(De!==null&&L.has(De)&&(y.width!==De.image.width||y.height!==De.image.height))throw Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");k.setupDepthRenderbuffer(y)}}let Me=y.texture;(Me.isData3DTexture||Me.isDataArrayTexture||Me.isCompressedArrayTexture)&&(ue=!0);let be=L.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(H=Array.isArray(be[U])?be[U][W]:be[U],z=!0):H=y.samples>0&&k.useMultisampledRTT(y)===!1?L.get(y).__webglMultisampledFramebuffer:Array.isArray(be)?be[W]:be,Y.copy(y.viewport),Q.copy(y.scissor),ze=y.scissorTest}else Y.copy(Ue).multiplyScalar(ie).floor(),Q.copy(de).multiplyScalar(ie).floor(),ze=qe;if(W!==0&&(H=O),b.bindFramebuffer(C.FRAMEBUFFER,H)&&b.drawBuffers(y,H),b.viewport(Y),b.scissor(Q),b.setScissorTest(ze),z){let ge=L.get(y.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+U,ge.__webglTexture,W)}else if(ue){let ge=U;for(let Me=0;Me<y.textures.length;Me++){let be=L.get(y.textures[Me]);C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0+Me,be.__webglTexture,W,ge)}}else if(y!==null&&W!==0){let ge=L.get(y.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,ge.__webglTexture,W)}oe=-1};function Qn(y){let U=L.get(y);return(U.__readFormat!==y.format||U.__readType!==y.type)&&(U.__readFormat=y.format,U.__readType=y.type,U.__formatReadable=Ze.textureFormatReadable(y.format),U.__typeReadable=Ze.textureTypeReadable(y.type)),U}this.readRenderTargetPixels=function(y,U,W,H,z,ue,ge,Me=0){if(!(y&&y.isWebGLRenderTarget)){Fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=L.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ge!==void 0&&(be=be[ge]),be){b.bindFramebuffer(C.FRAMEBUFFER,be);try{let De=y.textures[Me],Ye=De.format,Qe=De.type;y.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+Me);let Pe=Qn(De);if(Pe.__formatReadable===!1){Fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Pe.__typeReadable===!1){Fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=y.width-H&&W>=0&&W<=y.height-z&&C.readPixels(U,W,H,z,te.convert(Ye),te.convert(Qe),ue)}finally{let De=G===null?null:L.get(G).__webglFramebuffer;b.bindFramebuffer(C.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=async function(y,U,W,H,z,ue,ge,Me=0){if(!(y&&y.isWebGLRenderTarget))throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let be=L.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ge!==void 0&&(be=be[ge]),be){if(U>=0&&U<=y.width-H&&W>=0&&W<=y.height-z){b.bindFramebuffer(C.FRAMEBUFFER,be);let De=y.textures[Me],Ye=De.format,Qe=De.type;y.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+Me);let Pe=Qn(De);if(Pe.__formatReadable===!1)throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Pe.__typeReadable===!1)throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let st=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,st),C.bufferData(C.PIXEL_PACK_BUFFER,ue.byteLength,C.STREAM_READ),C.readPixels(U,W,H,z,te.convert(Ye),te.convert(Qe),0),C.bindBuffer(C.PIXEL_PACK_BUFFER,null);let ft=G===null?null:L.get(G).__webglFramebuffer;b.bindFramebuffer(C.FRAMEBUFFER,ft);let ut=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await Fh(C,ut,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,st),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,ue),C.bindBuffer(C.PIXEL_PACK_BUFFER,null),C.deleteBuffer(st),C.deleteSync(ut),ue}throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(y,U=null,W=0){let H=2**-W,z=Math.floor(y.image.width*H),ue=Math.floor(y.image.height*H),ge=U===null?0:U.x,Me=U===null?0:U.y;k.setTexture2D(y,0),C.copyTexSubImage2D(C.TEXTURE_2D,W,0,0,ge,Me,z,ue),b.unbindTexture()},this.copyTextureToTexture=function(y,U,W=null,H=null,z=0,ue=0){let ge,Me,be,De,Ye,Qe,Pe,st,ft,ut=y.isCompressedTexture?y.mipmaps[ue]:y.image;if(W!==null)ge=W.max.x-W.min.x,Me=W.max.y-W.min.y,be=W.isBox3?W.max.z-W.min.z:1,De=W.min.x,Ye=W.min.y,Qe=W.isBox3?W.min.z:0;else{let mt=2**-z;ge=Math.floor(ut.width*mt),Me=Math.floor(ut.height*mt),be=y.isDataArrayTexture?ut.depth:y.isData3DTexture?Math.floor(ut.depth*mt):1,De=0,Ye=0,Qe=0}H===null?(Pe=0,st=0,ft=0):(Pe=H.x,st=H.y,ft=H.z);let et=te.convert(U.format),bt=te.convert(U.type),Te;U.isData3DTexture?(k.setTexture3D(U,0),Te=C.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(k.setTexture2DArray(U,0),Te=C.TEXTURE_2D_ARRAY):(k.setTexture2D(U,0),Te=C.TEXTURE_2D),b.activeTexture(C.TEXTURE0),b.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,U.flipY),b.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),b.pixelStorei(C.UNPACK_ALIGNMENT,U.unpackAlignment);let Ct=b.getParameter(C.UNPACK_ROW_LENGTH),Pt=b.getParameter(C.UNPACK_IMAGE_HEIGHT),Ot=b.getParameter(C.UNPACK_SKIP_PIXELS),Jt=b.getParameter(C.UNPACK_SKIP_ROWS),fi=b.getParameter(C.UNPACK_SKIP_IMAGES);b.pixelStorei(C.UNPACK_ROW_LENGTH,ut.width),b.pixelStorei(C.UNPACK_IMAGE_HEIGHT,ut.height),b.pixelStorei(C.UNPACK_SKIP_PIXELS,De),b.pixelStorei(C.UNPACK_SKIP_ROWS,Ye),b.pixelStorei(C.UNPACK_SKIP_IMAGES,Qe);let Bi=y.isDataArrayTexture||y.isData3DTexture,ot=U.isDataArrayTexture||U.isData3DTexture;if(y.isDepthTexture){let mt=L.get(y),mi=L.get(U),lt=L.get(mt.__renderTarget),mr=L.get(mi.__renderTarget);b.bindFramebuffer(C.READ_FRAMEBUFFER,lt.__webglFramebuffer),b.bindFramebuffer(C.DRAW_FRAMEBUFFER,mr.__webglFramebuffer);for(let zi=0;zi<be;zi++)Bi&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,L.get(y).__webglTexture,z,Qe+zi),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,L.get(U).__webglTexture,ue,ft+zi)),C.blitFramebuffer(De,Ye,ge,Me,Pe,st,ge,Me,C.DEPTH_BUFFER_BIT,C.NEAREST);b.bindFramebuffer(C.READ_FRAMEBUFFER,null),b.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(z!==0||y.isRenderTargetTexture||L.has(y)){let mt=L.get(y),mi=L.get(U);b.bindFramebuffer(C.READ_FRAMEBUFFER,X),b.bindFramebuffer(C.DRAW_FRAMEBUFFER,N);for(let lt=0;lt<be;lt++)Bi?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,mt.__webglTexture,z,Qe+lt):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,mt.__webglTexture,z),ot?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,mi.__webglTexture,ue,ft+lt):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,mi.__webglTexture,ue),z===0?ot?C.copyTexSubImage3D(Te,ue,Pe,st,ft+lt,De,Ye,ge,Me):C.copyTexSubImage2D(Te,ue,Pe,st,De,Ye,ge,Me):C.blitFramebuffer(De,Ye,ge,Me,Pe,st,ge,Me,C.COLOR_BUFFER_BIT,C.NEAREST);b.bindFramebuffer(C.READ_FRAMEBUFFER,null),b.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else ot?y.isDataTexture||y.isData3DTexture?C.texSubImage3D(Te,ue,Pe,st,ft,ge,Me,be,et,bt,ut.data):U.isCompressedArrayTexture?C.compressedTexSubImage3D(Te,ue,Pe,st,ft,ge,Me,be,et,ut.data):C.texSubImage3D(Te,ue,Pe,st,ft,ge,Me,be,et,bt,ut):y.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,ue,Pe,st,ge,Me,et,bt,ut.data):y.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,ue,Pe,st,ut.width,ut.height,et,ut.data):C.texSubImage2D(C.TEXTURE_2D,ue,Pe,st,ge,Me,et,bt,ut);b.pixelStorei(C.UNPACK_ROW_LENGTH,Ct),b.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Pt),b.pixelStorei(C.UNPACK_SKIP_PIXELS,Ot),b.pixelStorei(C.UNPACK_SKIP_ROWS,Jt),b.pixelStorei(C.UNPACK_SKIP_IMAGES,fi),ue===0&&U.generateMipmaps&&C.generateMipmap(Te),b.unbindTexture()},this.initRenderTarget=function(y){L.get(y).__webglFramebuffer===void 0&&k.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?k.setTextureCube(y,0):y.isData3DTexture?k.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?k.setTexture2DArray(y,0):k.setTexture2D(y,0),b.unbindTexture()},this.resetState=function(){V=0,J=0,G=null,b.reset(),xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return hr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=Ke._getDrawingBufferColorSpace(t),e.unpackColorSpace=Ke._getUnpackColorSpace()}};export{lm as $,jr as A,Fo as B,zt as C,lr as D,Bn as E,St as F,je as G,he as H,hi as I,nm as J,ke as K,Nf as L,yf as M,Sm as N,Nu as O,mc as P,um as Q,Dr as R,qt as S,wo as T,I as U,ws as V,Je as W,fm as X,tt as Y,Eo as Z,_m as _,kt as a,_c as a0,Ke as a1,Fi as a2,_f as a3,If as a4,mm as a5,cm as a6,fe as a7,Mi as a8,ht as a9,Hl as aA,Gl as aB,Vl as aC,yn as aD,Dt as aE,Pu as aF,pi as aG,pt as aH,Jf as aI,Yo as aJ,Qf as aK,Zf as aL,dm as aM,Eu as aN,Mn as aO,Ea as aP,Rn as aQ,jf as aR,Sl as aS,Hn as aT,Vr as aU,am as aV,Ff as aW,bm as aX,ym as aY,om as aa,sl as ab,em as ac,wm as ad,rm as ae,sm as af,Al as ag,zc as ah,Em as ai,gf as aj,vf as ak,Tm as al,zr as am,Du as an,ko as ao,Go as ap,Hr as aq,xm as ar,pm as as,di as at,hm as au,Sn as av,vm as aw,Mt as ax,Mm as ay,Wf as az,On as b,jo as c,Nn as d,wi as e,jt as f,bi as g,kn as h,tm as i,Cu as j,fl as k,Ut as l,yc as m,Qt as n,Rt as o,It as p,im as q,xn as r,gm as s,eo as t,xc as u,pr as v,$f as w,Kf as x,Ti as y,Uf as z};
