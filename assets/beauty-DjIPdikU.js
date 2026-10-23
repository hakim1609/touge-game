const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./main-NQriH9Rc.js","./regionSprawl-5717mdAO.js","./three.module-lZIeIsMj.js"])))=>i.map(i=>d[i]);
import{a as Dr,at as lt,av as zr}from"./regionSprawl-5717mdAO.js";import{S as Rt,L as Rr,K as Ee,m as Qo,U as ne,H as je,a as mt,u as Ie,b as fo,D as uo,d as Ta,l as Da,X as wo,C as ot,c as It,e as Jo,A as ct,f as Ft,g as ho,z as er,h as tr,$ as ar,i as gt,r as xt,o as eo,j as Fr,F as it,Y as ze,k as ba,n as ft,M as Jt,O as to,v as Lr,p as Ar,q as Er,t as Nr,G as Gt,s as kr,E as ea,y as Wt,w as Or,W as Ze,V as or,x as rt,B as Ir,I as Ur,J as Hr,_ as Br,N as Gr,P as _t,Q as Wr,R as Vr,T as $r,Z as jr,a0 as Yr,a1 as Xr,a2 as ta,a3 as Kr}from"./three.module-lZIeIsMj.js";import{F as Aa,H as qr,I as po,L as Zr,J as Qr,a as aa,M as nt,B as st,N as St,O as Jr,P as ao,Q as rr,R as ei,Y as ti,Z as Ae,$ as ai,a0 as ir,A as oi,z as ri,a1 as mo,w as ua,a2 as ii,a3 as li,a4 as yo,a5 as si,a6 as zt,a7 as ni,a8 as ci}from"./main-NQriH9Rc.js";import{disposeTileVisual as Ea,t as fi,n as So,createTileVisual as di}from"./worldVisual-DBCg-DTy.js";import{o as ui,s as hi,a as pa}from"./forest-BwumWhLj.js";import{createLakeWater as pi,createLakeFlat as mi}from"./water-DYoVWBgE.js";var lr=class sr extends ot{constructor(){let e=sr.SkyShader,t=new ft({name:e.name,uniforms:_t.clone(e.uniforms),vertexShader:e.vertexShader,fragmentShader:e.fragmentShader,side:1,depthWrite:!1});super(new ea(1,1,1),t),this.isSky=!0}};lr.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new ne},cloudScale:{value:2e-4},cloudSpeed:{value:2e-5},cloudCoverage:{value:.4},cloudDensity:{value:.4},cloudElevation:{value:.5},showSunDisc:{value:1},skyGain:{value:1},time:{value:0}},vertexShader:`
		uniform vec3 sunPosition;
		uniform float rayleigh;
		uniform float turbidity;
		uniform float mieCoefficient;

		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		// constants for atmospheric scattering
		const float e = 2.71828182845904523536028747135266249775724709369995957;
		const float pi = 3.141592653589793238462643383279502884197169;

		// wavelength of used primaries, according to preetham
		const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );
		// this pre-calculation replaces older TotalRayleigh(vec3 lambda) function:
		// (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
		const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );

		// mie stuff
		// K coefficient for the primaries
		const float v = 4.0;
		const vec3 K = vec3( 0.686, 0.678, 0.666 );
		// MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
		const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );

		// earth shadow hack
		// cutoffAngle = pi / 1.95;
		const float cutoffAngle = 1.6110731556870734;
		const float steepness = 1.5;
		const float EE = 1000.0;

		float sunIntensity( float zenithAngleCos ) {
			zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
			return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );
		}

		vec3 totalMie( float T ) {
			float c = ( 0.2 * T ) * 10E-18;
			return 0.434 * c * MieConst;
		}

		void main() {

			vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
			vWorldPosition = worldPosition.xyz;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			gl_Position.z = gl_Position.w; // set z to camera.far

			vSunDirection = normalize( sunPosition );

			vSunE = sunIntensity( vSunDirection.y );

			vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );

			float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );

			// extinction (absorption + out scattering)
			// rayleigh coefficients
			vBetaR = totalRayleigh * rayleighCoefficient;

			// mie coefficients
			vBetaM = totalMie( turbidity ) * mieCoefficient;

		}`,fragmentShader:`
		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		uniform float mieDirectionalG;
		uniform float cloudScale;
		uniform float cloudSpeed;
		uniform float cloudCoverage;
		uniform float cloudDensity;
		uniform float cloudElevation;
		uniform float showSunDisc;
		uniform float skyGain;
		uniform float time;

		// gradient at a lattice corner; sinless hash so every GPU produces the same clouds
		vec2 gradient( vec2 i ) {
			vec3 p = fract( i.xyx * vec3( 0.1031, 0.1030, 0.0973 ) );
			p += dot( p, p.yzx + 33.33 );
			return fract( ( p.xx + p.yz ) * p.zy ) * 2.0 - 1.0;
		}

		// 2D gradient noise: isotropic lobes like Perlin at value-noise cost
		float noise( vec2 p ) {
			vec2 i = floor( p );
			vec2 f = fract( p );
			vec2 u = f * f * f * ( f * ( f * 6.0 - 15.0 ) + 10.0 ); // quintic fade
			float a = dot( gradient( i ), f );
			float b = dot( gradient( i + vec2( 1.0, 0.0 ) ), f - vec2( 1.0, 0.0 ) );
			float c = dot( gradient( i + vec2( 0.0, 1.0 ) ), f - vec2( 0.0, 1.0 ) );
			float d = dot( gradient( i + vec2( 1.0, 1.0 ) ), f - vec2( 1.0, 1.0 ) );
			return mix( mix( a, b, u.x ), mix( c, d, u.x ), u.y ) * 1.6; // ~[-1,1]
		}

		// fbm; per-octave drift makes clouds billow instead of scrolling as a rigid stamp
		float fbm( vec2 p, float drift ) {
			float result = 0.0;
			float amplitude = 1.0;
			for ( int i = 0; i < 4; i ++ ) {
				result += amplitude * noise( p );
				amplitude *= 0.5;
				p = p * 2.0 + drift;
			}
			return result;
		}

		// constants for atmospheric scattering
		const float pi = 3.141592653589793238462643383279502884197169;

		const float n = 1.0003; // refractive index of air
		const float N = 2.545E25; // number of molecules per unit volume for air at 288.15K and 1013mb (sea level -45 celsius)

		// optical length at zenith for molecules
		const float rayleighZenithLength = 8.4E3;
		const float mieZenithLength = 1.25E3;
		// 66 arc seconds -> degrees, and the cosine of that
		const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;

		// 3.0 / ( 16.0 * pi )
		const float THREE_OVER_SIXTEENPI = 0.05968310365946075;
		// 1.0 / ( 4.0 * pi )
		const float ONE_OVER_FOURPI = 0.07957747154594767;

		float rayleighPhase( float cosTheta ) {
			return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );
		}

		float hgPhase( float cosTheta, float g ) {
			float g2 = pow( g, 2.0 );
			float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );
			return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );
		}

		void main() {

			vec3 direction = normalize( vWorldPosition - cameraPosition );

			// optical length
			// cutoff angle at 90 to avoid singularity in next formula.
			float zenithAngle = acos( max( 0.0, direction.y ) );
			float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );
			float sR = rayleighZenithLength * inverse;
			float sM = mieZenithLength * inverse;

			// combined extinction factor
			vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );

			// in scattering
			float cosTheta = dot( direction, vSunDirection );

			float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );
			vec3 betaRTheta = vBetaR * rPhase;

			float mPhase = hgPhase( cosTheta, mieDirectionalG );
			vec3 betaMTheta = vBetaM * mPhase;

			vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
			Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - vSunDirection.y, 5.0 ), 0.0, 1.0 ) );

			// nightsky
			float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]
			float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]
			vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );
			vec3 L0 = vec3( 0.1 ) * Fex;

			// composition + solar disc
			float sundisc = clamp( ( cosTheta - sunAngularDiameterCos ) * 50000.0, 0.0, 1.0 ) * showSunDisc;
			vec3 sundiscColor = ( 760.0 * sundisc ) * min( vSunE * Fex, 80.0 );

			vec3 texColor = ( Lin + L0 ) * 0.04 + sundiscColor + vec3( 0.0, 0.0003, 0.00075 );

			// Clouds
			if ( direction.y > 0.0 && cloudCoverage > 0.0 ) {

				// Project to cloud plane (higher elevation = clouds appear lower/closer)
				float elevation = mix( 1.0, 0.1, cloudElevation );
				vec2 cloudUV = direction.xz / ( direction.y * elevation );
				cloudUV *= cloudScale;
				cloudUV += time * cloudSpeed;

				// Cloud density field
				float evolve = time * cloudSpeed * 300.0;
				float cloudNoise = clamp( fbm( cloudUV * 1000.0, evolve ) * 0.7 + 0.5, 0.0, 1.0 );

				// Large-scale coverage variation: clear gaps next to dense banks
				float region = noise( cloudUV * 300.0 ) * 0.37 + 0.5;
				float cov = clamp( cloudCoverage + ( region - 0.5 ) * 0.6, 0.0, 1.0 );

				// Carve clouds where noise rises above the coverage level
				float threshold = 1.0 - cov;
				float cloudMask = smoothstep( threshold, threshold + 0.3, cloudNoise );

				// Fade clouds near horizon (adjusted by elevation)
				float horizonFade = smoothstep( 0.0, 0.03 + 0.06 * cloudElevation, direction.y );
				cloudMask *= horizonFade;

				// Cloud lighting from the sky's own radiance
				float dayFactor = smoothstep( -0.08, 0.3, vSunDirection.y );
				vec3 sunColor = vSunE * Fex * 0.22 * 0.04; // 0.22 ~ albedo/pi, 0.04 = exposure; the aerial composite adds the eye-leg extinction
				vec3 skyAmbient = Lin * 0.04 + vec3( 0.0, 0.0003, 0.00075 );

				// Beer-powder self-shadow from the sampled density
				float depth = max( 0.0, cloudNoise - threshold );
				float beer = exp( depth * -4.0 );
				float powder = 1.0 - beer * beer; // beer*beer == exp(-8*depth)
				float shade = mix( 0.45, 1.0, clamp( beer * powder * 2.6, 0.0, 1.0 ) ); // 2.6 = 1/0.385, normalizes beer*powder peak to 1

				// Henyey-Greenstein forward lobe ( g = 0.7 ): silver lining on rims toward the sun
				float silver = clamp( 0.51 / pow( 1.49 - cosTheta * 1.4, 1.5 ), 0.0, 3.0 ); // 0.51=1-g^2, 1.49=1+g^2, 1.4=2g
				float edge = cloudMask * ( 1.0 - cloudMask ) * 4.0;

				vec3 cloudColor = skyAmbient + sunColor * shade;
				cloudColor += sunColor * silver * edge * 0.6;
				cloudColor *= max( dayFactor, 0.03 );

				// Cloud opacity via Beer's law: density sets how solid the clouds get
				float alpha = ( 1.0 - exp( depth * cloudDensity * -12.0 ) ) * horizonFade;

				// Occlude the sun disc/glow behind opaque cloud
				texColor -= L0 * 0.04 * alpha;

				// Composite through the atmosphere so distant clouds dissolve into haze
				vec3 cloudAerial = mix( texColor, cloudColor, Fex );
				texColor = mix( texColor, cloudAerial, alpha );

			}

			gl_FragColor = vec4( texColor * skyGain, 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};var Ma={day:{sun:[235,42],turbidity:2.8,rayleigh:1.9,mie:.003,clouds:.32,sunToSky:2.4,skyGain:1.25,rel:0,lights:0},sunset:{sun:[262,3.5],turbidity:5,rayleigh:3,mie:.007,clouds:.34,sunToSky:2.4,rel:7,lights:.3},dusk:{sun:[268,-1.2],turbidity:4.5,rayleigh:3.2,mie:.006,clouds:.28,sunToSky:0,rel:80,lights:.85},night:{moon:[140,38],sunToSky:2,rel:45,lights:1}},vi=5.73;function gi(a,e,t=new ne){let o=Jt.degToRad(a),i=Jt.degToRad(e);return t.set(Math.sin(o)*Math.cos(i),Math.sin(i),-Math.cos(o)*Math.cos(i))}var xi=`
varying vec3 vWorldPosition;
void main() {
	vec4 wp = modelMatrix * vec4( position, 1.0 );
	vWorldPosition = wp.xyz;
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
	gl_Position.z = gl_Position.w;
}`,wi=`
uniform vec3 moonDir;
uniform float showMoon;
uniform float time;
uniform float cityGlow;
uniform float uStars;
varying vec3 vWorldPosition;
float nh( vec3 p ) { return fract( sin( dot( p, vec3( 12.9898, 78.233, 45.164 ) ) ) * 43758.5453 ); }
void main() {
	vec3 d = normalize( vWorldPosition - cameraPosition );
	float el = d.y;
	vec3 col = mix( vec3( 0.010, 0.018, 0.044 ), vec3( 0.0022, 0.0042, 0.014 ), smoothstep( 0.0, 0.55, el ) );
	if ( el < 0.0 ) col = vec3( 0.006, 0.010, 0.022 );
	// звёзды: ячейки на сфере, в редких — точка со своей яркостью и цветом, мерцание
	vec3 sp = d * 240.0, cell = floor( sp );
	float r = nh( cell );
	if ( r > 0.984 && el > 0.02 && uStars > 0.0 ) {
		vec3 c = cell + vec3( nh( cell + 1.3 ), nh( cell + 2.7 ), nh( cell + 4.1 ) );
		float tw = 0.75 + 0.25 * sin( time * ( 1.3 + r * 3.0 ) + r * 50.0 );
		vec3 tint = mix( vec3( 1.0, 0.9, 0.8 ), vec3( 0.8, 0.88, 1.0 ), nh( cell + 9.0 ) );
		col += tint * smoothstep( 0.32, 0.0, length( sp - c ) ) * ( r - 0.984 ) / 0.016 * 0.16 * tw * smoothstep( 0.02, 0.2, el );
	}
	// луна: ореол и диск
	float cm = dot( d, moonDir );
	col += vec3( 0.50, 0.58, 0.78 ) * 0.025 * exp( ( cm - 1.0 ) * 25.0 ) + vec3( 0.75, 0.80, 0.95 ) * 0.08 * exp( ( cm - 1.0 ) * 500.0 );
	col += vec3( 1.1, 1.1, 1.05 ) * showMoon * smoothstep( 0.99985, 0.99992, cm );
	// зарево города у горизонта: в сторону центра мира, сильнее вблизи
	vec2 toC = - cameraPosition.xz;
	float dc = length( toC ), facing = max( 0.0, dot( normalize( d.xz + 1e-5 ), toC / max( dc, 1.0 ) ) );
	col += cityGlow * vec3( 0.050, 0.028, 0.012 ) * pow( facing, 3.0 ) * exp( - max( el, 0.0 ) * 12.0 ) * ( 0.25 + 0.75 * exp( - dc / 5000.0 ) );
	gl_FragColor = vec4( col, 1.0 );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`;function yi(a){let e=new ft({name:"NightSky",vertexShader:xi,fragmentShader:wi,side:1,depthWrite:!1,uniforms:{moonDir:{value:a.clone()},showMoon:{value:1},uStars:{value:1},time:{value:0},cityGlow:{value:1}}}),t=new ot(new ea(1,1,1),e);return t.frustumCulled=!1,t}function Si(a,e=Ma.day,{sunColor:t=16773340,moonColor:o=11122920,groundAlbedo:i=.15}={}){let r=!!e.moon,[s,n]=r?e.moon:e.sun,l=gi(s,n),c=()=>{if(r)return yi(l);let H=new lr,k=H.material.uniforms;return k.turbidity.value=e.turbidity,k.rayleigh.value=e.rayleigh,k.mieCoefficient.value=e.mie,k.mieDirectionalG.value=.8,k.sunPosition.value.copy(l),k.cloudCoverage.value=e.clouds,k.cloudDensity.value=.75,k.cloudElevation.value=.5,k.cloudScale.value=2e-4,k.cloudSpeed.value=3e-5,H.frustumCulled=!1,H},u=(H,k)=>{let V=H.material.uniforms;r?(V.showMoon.value=0,V.cityGlow.value=0):V.showSunDisc.value=0},f=c();!r&&(f.material.uniforms.skyGain.value=e.skyGain??1),f.scale.setScalar(1e3),f.renderOrder=1e3,f.name="sky";let m=c();u(m),m.scale.setScalar(10);let p=new er;p.add(m);let b=new Ft(32,32,{type:Lr}),P=new Float32Array(4096),S=new Ar(90,1,.1,100),M=new ne,B=new ne,D=new ne,L=new ne,A=new je(l.x,l.z).normalize(),_=new ne,v=new ne,h=new ne,d=0,g=0,x=0,w=0,y=a.getRenderTarget();for(let[H,k,V,F,j,ee]of[[0,1,0,0,0,-1],[1,0,0,0,1,0],[-1,0,0,0,1,0],[0,0,1,0,1,0],[0,0,-1,0,1,0]]){S.position.set(0,0,0),S.up.set(F,j,ee),S.lookAt(H,k,V),S.updateMatrixWorld(),a.setRenderTarget(b),a.render(p,S),a.readRenderTargetPixels(b,0,0,32,32,P);let K=S.matrixWorld.elements;M.set(K[0],K[1],K[2]),B.set(K[4],K[5],K[6]),D.set(-K[8],-K[9],-K[10]);for(let oe=0;oe<32;oe++)for(let J=0;J<32;J++){let fe=(J+.5)/32*2-1,se=(oe+.5)/32*2-1;L.copy(D).addScaledVector(M,fe).addScaledVector(B,se);let pe=L.length();if(L.divideScalar(pe),L.y<=0)continue;let we=(oe*32+J)*4,Me=P[we],Re=P[we+1],Ne=P[we+2],Ue=4/1024/(pe*pe*pe),ye=L.y*Ue,ge=.2126*Me+.7152*Re+.0722*Ne,ke=L.x*A.x+L.z*A.y;if(d+=ge*ye,ke>0&&(g+=ge*ke*Ue),h.x+=Me*ye,h.y+=Re*ye,h.z+=Ne*ye,L.y<.02||L.y>.09)continue;let We=Math.hypot(L.x,L.z),G=(L.x*A.x+L.z*A.y)/We;G>.92?(_.x+=Me,_.y+=Re,_.z+=Ne,x++):G<-.3&&(v.x+=Me,v.y+=Re,v.z+=Ne,w++)}}a.setRenderTarget(y),b.dispose(),_.divideScalar(Math.max(1,x)),v.divideScalar(Math.max(1,w));let E=new Ee(_.x,_.y,_.z).multiplyScalar(1/Math.max(1e-6,_.x,_.y,_.z)),R=1-Jt.smoothstep(n,2,20),T=r?new Ee(o):new Ee(t).lerp(E,R),I=i/Math.PI,N=e.sunToSky*d,C=new It({side:2,color:new Ee((h.x+T.r*N)*I,(h.y+T.g*N)*I,(h.z+T.b*N)*I)}),O=new ot(new Er(90,48),C);O.rotation.x=-Math.PI/2,O.position.y=-.3,p.add(O);let z=new Nr(a),U=z.fromScene(p,0,.1,100);return z.dispose(),m.geometry.dispose(),m.material.dispose(),O.geometry.dispose(),C.dispose(),{mesh:f,sunDir:l,night:r,envMap:U.texture,lightColor:T,groundColor:C.color.clone(),skyIrradiance:d,wallIrradiance:g+(.2126*C.color.r+.7152*C.color.g+.0722*C.color.b)*Math.PI/2,horizonAway:new Ee(v.x,v.y,v.z),horizonSun:new Ee(_.x,_.y,_.z),update(H,k){f.position.copy(H.position),f.material.uniforms.time.value=k},dispose(){f.removeFromParent(),f.geometry.dispose(),f.material.dispose(),U.dispose()}}}function bi({sunDir:a,sunColor:e,falloff:t=1/450}){let o=(i,r,s)=>`vec3( ${i.toFixed(6)}, ${r.toFixed(6)}, ${s.toFixed(6)} )`;Gt.fog_pars_vertex=`#ifdef USE_FOG
	varying vec3 vFogWorld;
#endif`,Gt.fog_vertex=`#ifdef USE_FOG
	vFogWorld = transpose( mat3( viewMatrix ) ) * mvPosition.xyz + cameraPosition;
#endif`,Gt.fog_pars_fragment=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying vec3 vFogWorld;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
	#define FOG_SUN_DIR ${o(a.x,a.y,a.z)}
	#define FOG_SUN_COLOR ${o(e.r,e.g,e.b)}
	#define FOG_FALLOFF ${t.toExponential(6)}
#endif`,Gt.fog_fragment=`#ifdef USE_FOG
	vec3 fogRay = vFogWorld - cameraPosition;
	float fogDist = length( fogRay );
	vec3 fogDir = fogRay / max( fogDist, 1e-4 );
	#ifdef FOG_EXP2
		float fogK = FOG_FALLOFF * fogDir.y * fogDist;
		float fogOD = fogDensity * exp( - FOG_FALLOFF * cameraPosition.y ) * fogDist * ( abs( fogK ) < 1e-4 ? 1.0 - 0.5 * fogK : ( 1.0 - exp( - fogK ) ) / fogK );
		float fogFactor = 1.0 - exp( - fogOD );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, fogDist );
	#endif
	float fogSun = pow( max( dot( fogDir, FOG_SUN_DIR ), 0.0 ), 6.0 );
	// дальние слои синеют (Г8.4: хребты уходят в синеву слоями)
	// Г11: воздух ступенями, как на фонах — средний план заметно бледнее, дальний выходит на плоскую сине-серую заливку
	float fogStep = mix( fogFactor, smoothstep( 0.2, 0.7, fogFactor ), 0.25 );
	vec3 fogCol = mix( fogColor, FOG_SUN_COLOR, fogSun ) * mix( vec3( 1.0 ), vec3( 0.8, 0.9, 1.1 ), fogStep );
	// дальний план — насыщенная синева от цвета неба (Initial D: хребты синими слоями), а не постоянный серый
	fogCol = mix( fogCol, fogColor * vec3( 0.72, 0.88, 1.18 ), smoothstep( 0.7, 1.0, fogStep ) * 0.55 );
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogCol, fogStep );
#endif`}var Na=new Ze,nr=class cr{constructor(e){e||={},this.zNear=e.webGL===!0?-1:0,this.zFar=1,this.vertices={near:[new ne,new ne,new ne,new ne],far:[new ne,new ne,new ne,new ne]},e.projectionMatrix!==void 0&&this.setFromProjectionMatrix(e.projectionMatrix,e.maxFar||1e4),e.reversedDepth===!0&&(this.zNear=1,this.zFar=0)}setFromProjectionMatrix(e,t){let o=this.zNear,i=this.zFar,r=e.elements[11]===0;return Na.copy(e).invert(),this.vertices.near[0].set(1,1,o),this.vertices.near[1].set(1,-1,o),this.vertices.near[2].set(-1,-1,o),this.vertices.near[3].set(-1,1,o),this.vertices.near.forEach(function(s){s.applyMatrix4(Na)}),this.vertices.far[0].set(1,1,i),this.vertices.far[1].set(1,-1,i),this.vertices.far[2].set(-1,-1,i),this.vertices.far[3].set(-1,1,i),this.vertices.far.forEach(function(s){s.applyMatrix4(Na);let n=Math.abs(s.z);r?s.z*=Math.min(t/n,1):s.multiplyScalar(Math.min(t/n,1))}),this.vertices}split(e,t){for(;e.length>t.length;)t.push(new cr);t.length=e.length;let o=this.vertices.near[0].z,i=this.vertices.far[0].z;for(let r=0;r<e.length;r++){let s=t[r];if(r===0)for(let n=0;n<4;n++)s.vertices.near[n].copy(this.vertices.near[n]);else{let n=(e[r-1]*i-o)/(i-o);for(let l=0;l<4;l++)s.vertices.near[l].lerpVectors(this.vertices.near[l],this.vertices.far[l],n)}if(r===e.length-1)for(let n=0;n<4;n++)s.vertices.far[n].copy(this.vertices.far[n]);else{let n=(e[r]*i-o)/(i-o);for(let l=0;l<4;l++)s.vertices.far[l].lerpVectors(this.vertices.near[l],this.vertices.far[l],n)}}}toSpace(e,t){for(let o=0;o<4;o++)t.vertices.near[o].copy(this.vertices.near[o]).applyMatrix4(e),t.vertices.far[o].copy(this.vertices.far[o]).applyMatrix4(e)}},bo={lights_fragment_begin:`
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
		// Iridescence F0 approximation
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

  		// spot lights are ordered [shadows with maps, shadows without maps, maps without shadows, none]
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

#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct ) && defined( USE_CSM ) && defined( CSM_CASCADES )

	DirectionalLight directionalLight;
	float linearDepth = (vViewPosition.z) / (shadowFar - cameraNear);
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif

	#if defined( USE_SHADOWMAP ) && defined( CSM_FADE )
		vec2 cascade;
		float cascadeCenter;
		float closestEdge;
		float margin;
		float csmx;
		float csmy;

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

			directionalLight = directionalLights[ i ];
			getDirectionalLightInfo( directionalLight, directLight );

			#if ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
				// NOTE: Depth gets larger away from the camera.
				// cascade.x is closer, cascade.y is further
				cascade = CSM_cascades[ i ];
				cascadeCenter = ( cascade.x + cascade.y ) / 2.0;
				closestEdge = linearDepth < cascadeCenter ? cascade.x : cascade.y;
				margin = 0.25 * pow( closestEdge, 2.0 );
				csmx = cascade.x - margin / 2.0;
				csmy = cascade.y + margin / 2.0;
				if( linearDepth >= csmx && ( linearDepth < csmy || UNROLLED_LOOP_INDEX == CSM_CASCADES - 1 ) ) {

					float dist = min( linearDepth - csmx, csmy - linearDepth );
					float ratio = clamp( dist / margin, 0.0, 1.0 );

					vec3 prevColor = directLight.color;
					directionalLightShadow = directionalLightShadows[ i ];
					directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;

					bool shouldFadeLastCascade = UNROLLED_LOOP_INDEX == CSM_CASCADES - 1 && linearDepth > cascadeCenter;
					directLight.color = mix( prevColor, directLight.color, shouldFadeLastCascade ? ratio : 1.0 );

					ReflectedLight prevLight = reflectedLight;
					RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

					bool shouldBlend = UNROLLED_LOOP_INDEX != CSM_CASCADES - 1 || UNROLLED_LOOP_INDEX == CSM_CASCADES - 1 && linearDepth < cascadeCenter;
					float blendRatio = shouldBlend ? ratio : 1.0;

					reflectedLight.directDiffuse = mix( prevLight.directDiffuse, reflectedLight.directDiffuse, blendRatio );
					reflectedLight.directSpecular = mix( prevLight.directSpecular, reflectedLight.directSpecular, blendRatio );
					reflectedLight.indirectDiffuse = mix( prevLight.indirectDiffuse, reflectedLight.indirectDiffuse, blendRatio );
					reflectedLight.indirectSpecular = mix( prevLight.indirectSpecular, reflectedLight.indirectSpecular, blendRatio );

				}
			#endif

		}
		#pragma unroll_loop_end
	#elif defined (USE_SHADOWMAP)

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

			directionalLight = directionalLights[ i ];
			getDirectionalLightInfo( directionalLight, directLight );

			#if ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )

				directionalLightShadow = directionalLightShadows[ i ];
				if(linearDepth >= CSM_cascades[UNROLLED_LOOP_INDEX].x && linearDepth < CSM_cascades[UNROLLED_LOOP_INDEX].y) directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;

				if(linearDepth >= CSM_cascades[UNROLLED_LOOP_INDEX].x && (linearDepth < CSM_cascades[UNROLLED_LOOP_INDEX].y || UNROLLED_LOOP_INDEX == CSM_CASCADES - 1)) RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

			#endif

		}
		#pragma unroll_loop_end

	#elif ( NUM_DIR_LIGHT_SHADOWS > 0 )
		// note: no loop here - all CSM lights are in fact one light only
		getDirectionalLightInfo( directionalLights[0], directLight );
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	#endif

	#if ( NUM_DIR_LIGHTS > NUM_DIR_LIGHT_SHADOWS)
		// compute the lights not casting shadows (if any)

		#pragma unroll_loop_start
		for ( int i = NUM_DIR_LIGHT_SHADOWS; i < NUM_DIR_LIGHTS; i ++ ) {

			directionalLight = directionalLights[ i ];

			getDirectionalLightInfo( directionalLight, directLight );

			RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

		}
		#pragma unroll_loop_end

	#endif

#endif


#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct ) && !defined( USE_CSM ) && !defined( CSM_CASCADES )

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

#endif

#if defined( RE_IndirectSpecular )

	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );

#endif
`,lights_pars_begin:`
#if defined( USE_CSM ) && defined( CSM_CASCADES )
uniform vec2 CSM_cascades[CSM_CASCADES];
uniform float cameraNear;
uniform float shadowFar;
#endif
	`+Gt.lights_pars_begin},Mo=new Ze,ka=new nr({webGL:!0}),Ct=new ne,Mi=new ne,na=new Jo,Oa=[],Ia=[],Ua=new Ze,_o=new Ze,_i=new ne(0,1,0),Ci=class{constructor(a){this.camera=a.camera,this.parent=a.parent,this.cascades=a.cascades||3,this.maxFar=a.maxFar||1e5,this.mode=a.mode||"practical",this.shadowMapSize=a.shadowMapSize||2048,this.shadowBias=a.shadowBias||1e-6,this.lightDirection=a.lightDirection||new ne(1,-1,1).normalize(),this.lightIntensity=a.lightIntensity||3,this.lightNear=a.lightNear||1,this.lightFar=a.lightFar||2e3,this.lightMargin=a.lightMargin||200,this.customSplitsCallback=a.customSplitsCallback,this.fade=!1,this.mainFrustum=new nr({webGL:!0}),this.frustums=[],this.breaks=[],this.lights=[],this.shaders=new Map,this._createLights(),this.updateFrustums(),this._injectInclude()}_createLights(){for(let a=0;a<this.cascades;a++){let e=new Br(16777215,this.lightIntensity);e.castShadow=!0,e.shadow.mapSize.width=this.shadowMapSize,e.shadow.mapSize.height=this.shadowMapSize,e.shadow.camera.near=this.lightNear,e.shadow.camera.far=this.lightFar,e.shadow.bias=this.shadowBias,this.parent.add(e),this.parent.add(e.target),this.lights.push(e)}}_initCascades(){let a=this.camera;a.updateProjectionMatrix(),this.mainFrustum.setFromProjectionMatrix(a.projectionMatrix,this.maxFar),this.mainFrustum.split(this.breaks,this.frustums)}_updateShadowBounds(){let a=this.frustums;for(let e=0;e<a.length;e++){let t=this.lights[e].shadow.camera,o=this.frustums[e],i=o.vertices.near,r=o.vertices.far,s=r[0],n;n=s.distanceTo(r[2])>s.distanceTo(i[2])?r[2]:i[2];let l=s.distanceTo(n);if(this.fade){let c=this.camera,u=Math.max(c.far,this.maxFar),f=.25*(o.vertices.far[0].z/(u-c.near))**2*(u-c.near);l+=f}t.left=-l/2,t.right=l/2,t.top=l/2,t.bottom=-l/2,t.updateProjectionMatrix()}}_getBreaks(){let a=this.camera,e=Math.min(a.far,this.maxFar);switch(this.breaks.length=0,this.mode){case"uniform":t(this.cascades,a.near,e,this.breaks);break;case"logarithmic":o(this.cascades,a.near,e,this.breaks);break;case"practical":i(this.cascades,a.near,e,.5,this.breaks);break;case"custom":this.customSplitsCallback===void 0&&console.error("CSM: Custom split scheme callback not defined."),this.customSplitsCallback(this.cascades,a.near,e,this.breaks)}function t(r,s,n,l){for(let c=1;c<r;c++)l.push((s+(n-s)*c/r)/n);l.push(1)}function o(r,s,n,l){for(let c=1;c<r;c++)l.push(s*(n/s)**(c/r)/n);l.push(1)}function i(r,s,n,l,c){Oa.length=0,Ia.length=0,o(r,s,n,Ia),t(r,s,n,Oa);for(let u=1;u<r;u++)c.push(Jt.lerp(Oa[u-1],Ia[u-1],l));c.push(1)}}update(){let a=this.camera,e=this.frustums;Ua.lookAt(Mi,this.lightDirection,_i),_o.copy(Ua).invert();for(let t=0;t<e.length;t++){let o=this.lights[t],i=o.shadow.camera,r=(i.right-i.left)/this.shadowMapSize,s=(i.top-i.bottom)/this.shadowMapSize;Mo.multiplyMatrices(_o,a.matrixWorld),e[t].toSpace(Mo,ka);let n=ka.vertices.near,l=ka.vertices.far;na.makeEmpty();for(let c=0;c<4;c++)na.expandByPoint(n[c]),na.expandByPoint(l[c]);na.getCenter(Ct),Ct.z=na.max.z+this.lightMargin,Ct.x=Math.floor(Ct.x/r)*r,Ct.y=Math.floor(Ct.y/s)*s,Ct.applyMatrix4(Ua),o.position.copy(Ct),o.target.position.copy(Ct),o.target.position.x+=this.lightDirection.x,o.target.position.y+=this.lightDirection.y,o.target.position.z+=this.lightDirection.z}}_injectInclude(){Gt.lights_fragment_begin=bo.lights_fragment_begin,Gt.lights_pars_begin=bo.lights_pars_begin}setupMaterial(a){a.defines=a.defines||{},a.defines.USE_CSM=1,a.defines.CSM_CASCADES=this.cascades,this.fade&&(a.defines.CSM_FADE="");let e=[],t=this,o=this.shaders;a.onBeforeCompile=function(i){let r=Math.min(t.camera.far,t.maxFar);t._getExtendedBreaks(e),i.uniforms.CSM_cascades={value:e},i.uniforms.cameraNear={value:t.camera.near},i.uniforms.shadowFar={value:r},o.set(a,i)},o.set(a,null)}_updateUniforms(){let a=Math.min(this.camera.far,this.maxFar);this.shaders.forEach(function(e,t){if(e!==null){let o=e.uniforms;this._getExtendedBreaks(o.CSM_cascades.value),o.cameraNear.value=this.camera.near,o.shadowFar.value=a}!this.fade&&"CSM_FADE"in t.defines?(delete t.defines.CSM_FADE,t.needsUpdate=!0):this.fade&&!("CSM_FADE"in t.defines)&&(t.defines.CSM_FADE="",t.needsUpdate=!0)},this)}_getExtendedBreaks(a){for(;a.length<this.breaks.length;)a.push(new je);a.length=this.breaks.length;for(let e=0;e<this.cascades;e++){let t=this.breaks[e],o=this.breaks[e-1]||0;a[e].x=o,a[e].y=t}}updateFrustums(){this._getBreaks(),this._initCascades(),this._updateShadowBounds(),this._updateUniforms()}remove(){for(let a=0;a<this.lights.length;a++)this.parent.remove(this.lights[a].target),this.parent.remove(this.lights[a])}dispose(){let a=this.shaders;a.forEach(function(e,t){delete t.onBeforeCompile,delete t.defines.USE_CSM,delete t.defines.CSM_CASCADES,delete t.defines.CSM_FADE,e!==null&&(delete e.uniforms.CSM_cascades,delete e.uniforms.cameraNear,delete e.uniforms.shadowFar),t.needsUpdate=!0}),a.clear()}},Pi=a=>a.isMeshStandardMaterial||a.isMeshLambertMaterial||a.isMeshPhongMaterial||a.isMeshToonMaterial;function Ti({scene:a,camera:e,sunDir:t,intensity:o,color:i,maxFar:r=2500,mapSize:s=2048,splits:n=[12,60,300]}){let l=n,c=new Ci({camera:e,parent:a,cascades:l.length+1,maxFar:r,mode:"custom",shadowMapSize:s,shadowBias:-5e-5,customSplitsCallback:(p,b,P,S)=>{for(let M of l)S.push(M/P);S.push(1)},lightDirection:t.clone().negate(),lightIntensity:o,lightNear:1,lightFar:8e3,lightMargin:3e3});c.fade=!0;for(let p of c.lights)p.color.copy(i),p.intensity=o;c.lights.length>=4&&s>=2048&&c.lights[c.lights.length-1].shadow.mapSize.set(s/2,s/2);let u=new WeakSet;function f(p){if(u.has(p)||(u.add(p),!Pi(p)))return;let b=p.onBeforeCompile,P=p.customProgramCacheKey();c.setupMaterial(p);let S=p.onBeforeCompile;p.onBeforeCompile=function(M,B){b.call(this,M,B),S.call(this,M,B)},p.customProgramCacheKey=()=>P+"|csm",p.needsUpdate=!0}let m=p=>{let b=p.material;if(b)if(Array.isArray(b))for(let P of b)f(P);else f(b)};return{csm:c,setup:f,scan(){a.traverse(m)},update(){e.updateMatrixWorld(),c.update();for(let p of c.lights){let b=p.shadow.camera;p.shadow.normalBias=1.5*(b.right-b.left)/p.shadow.mapSize.x,p.shadow.radius=4}},dispose(){c.remove(),c.dispose()}}}var Di={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new je(1/1024,1/512)}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec2 resolution;
		varying vec2 vUv;

		#define EDGE_STEP_COUNT 6
		#define EDGE_GUESS 8.0
		#define EDGE_STEPS 1.0, 1.5, 2.0, 2.0, 2.0, 4.0
		const float edgeSteps[EDGE_STEP_COUNT] = float[EDGE_STEP_COUNT]( EDGE_STEPS );

		float _ContrastThreshold = 0.0312;
		float _RelativeThreshold = 0.063;
		float _SubpixelBlending = 0.5;   // было 1,0 — мылило всю картинку (2026-10-21)

		vec4 Sample( sampler2D  tex2D, vec2 uv ) {

			return texture( tex2D, uv );

		}

		float SampleLuminance( sampler2D tex2D, vec2 uv ) {

			return dot( Sample( tex2D, uv ).rgb, vec3( 0.3, 0.59, 0.11 ) );

		}

		float SampleLuminance( sampler2D tex2D, vec2 texSize, vec2 uv, float uOffset, float vOffset ) {

			uv += texSize * vec2(uOffset, vOffset);
			return SampleLuminance(tex2D, uv);

		}

		struct LuminanceData {

			float m, n, e, s, w;
			float ne, nw, se, sw;
			float highest, lowest, contrast;

		};

		LuminanceData SampleLuminanceNeighborhood( sampler2D tex2D, vec2 texSize, vec2 uv ) {

			LuminanceData l;
			l.m = SampleLuminance( tex2D, uv );
			l.n = SampleLuminance( tex2D, texSize, uv,  0.0,  1.0 );
			l.e = SampleLuminance( tex2D, texSize, uv,  1.0,  0.0 );
			l.s = SampleLuminance( tex2D, texSize, uv,  0.0, -1.0 );
			l.w = SampleLuminance( tex2D, texSize, uv, -1.0,  0.0 );

			l.ne = SampleLuminance( tex2D, texSize, uv,  1.0,  1.0 );
			l.nw = SampleLuminance( tex2D, texSize, uv, -1.0,  1.0 );
			l.se = SampleLuminance( tex2D, texSize, uv,  1.0, -1.0 );
			l.sw = SampleLuminance( tex2D, texSize, uv, -1.0, -1.0 );

			l.highest = max( max( max( max( l.n, l.e ), l.s ), l.w ), l.m );
			l.lowest = min( min( min( min( l.n, l.e ), l.s ), l.w ), l.m );
			l.contrast = l.highest - l.lowest;
			return l;

		}

		bool ShouldSkipPixel( LuminanceData l ) {

			float threshold = max( _ContrastThreshold, _RelativeThreshold * l.highest );
			return l.contrast < threshold;

		}

		float DeterminePixelBlendFactor( LuminanceData l ) {

			float f = 2.0 * ( l.n + l.e + l.s + l.w );
			f += l.ne + l.nw + l.se + l.sw;
			f *= 1.0 / 12.0;
			f = abs( f - l.m );
			f = clamp( f / l.contrast, 0.0, 1.0 );

			float blendFactor = smoothstep( 0.0, 1.0, f );
			return blendFactor * blendFactor * _SubpixelBlending;

		}

		struct EdgeData {

			bool isHorizontal;
			float pixelStep;
			float oppositeLuminance, gradient;

		};

		EdgeData DetermineEdge( vec2 texSize, LuminanceData l ) {

			EdgeData e;
			float horizontal =
				abs( l.n + l.s - 2.0 * l.m ) * 2.0 +
				abs( l.ne + l.se - 2.0 * l.e ) +
				abs( l.nw + l.sw - 2.0 * l.w );
			float vertical =
				abs( l.e + l.w - 2.0 * l.m ) * 2.0 +
				abs( l.ne + l.nw - 2.0 * l.n ) +
				abs( l.se + l.sw - 2.0 * l.s );
			e.isHorizontal = horizontal >= vertical;

			float pLuminance = e.isHorizontal ? l.n : l.e;
			float nLuminance = e.isHorizontal ? l.s : l.w;
			float pGradient = abs( pLuminance - l.m );
			float nGradient = abs( nLuminance - l.m );

			e.pixelStep = e.isHorizontal ? texSize.y : texSize.x;

			if (pGradient < nGradient) {

				e.pixelStep = -e.pixelStep;
				e.oppositeLuminance = nLuminance;
				e.gradient = nGradient;

			} else {

				e.oppositeLuminance = pLuminance;
				e.gradient = pGradient;

			}

			return e;

		}

		float DetermineEdgeBlendFactor( sampler2D  tex2D, vec2 texSize, LuminanceData l, EdgeData e, vec2 uv ) {

			vec2 uvEdge = uv;
			vec2 edgeStep;
			if (e.isHorizontal) {

				uvEdge.y += e.pixelStep * 0.5;
				edgeStep = vec2( texSize.x, 0.0 );

			} else {

				uvEdge.x += e.pixelStep * 0.5;
				edgeStep = vec2( 0.0, texSize.y );

			}

			float edgeLuminance = ( l.m + e.oppositeLuminance ) * 0.5;
			float gradientThreshold = e.gradient * 0.25;

			vec2 puv = uvEdge + edgeStep * edgeSteps[0];
			float pLuminanceDelta = SampleLuminance( tex2D, puv ) - edgeLuminance;
			bool pAtEnd = abs( pLuminanceDelta ) >= gradientThreshold;

			for ( int i = 1; i < EDGE_STEP_COUNT && !pAtEnd; i++ ) {

				puv += edgeStep * edgeSteps[i];
				pLuminanceDelta = SampleLuminance( tex2D, puv ) - edgeLuminance;
				pAtEnd = abs( pLuminanceDelta ) >= gradientThreshold;

			}

			if ( !pAtEnd ) {

				puv += edgeStep * EDGE_GUESS;

			}

			vec2 nuv = uvEdge - edgeStep * edgeSteps[0];
			float nLuminanceDelta = SampleLuminance( tex2D, nuv ) - edgeLuminance;
			bool nAtEnd = abs( nLuminanceDelta ) >= gradientThreshold;

			for ( int i = 1; i < EDGE_STEP_COUNT && !nAtEnd; i++ ) {

				nuv -= edgeStep * edgeSteps[i];
				nLuminanceDelta = SampleLuminance( tex2D, nuv ) - edgeLuminance;
				nAtEnd = abs( nLuminanceDelta ) >= gradientThreshold;

			}

			if ( !nAtEnd ) {

				nuv -= edgeStep * EDGE_GUESS;

			}

			float pDistance, nDistance;
			if ( e.isHorizontal ) {

				pDistance = puv.x - uv.x;
				nDistance = uv.x - nuv.x;

			} else {

				pDistance = puv.y - uv.y;
				nDistance = uv.y - nuv.y;

			}

			float shortestDistance;
			bool deltaSign;
			if ( pDistance <= nDistance ) {

				shortestDistance = pDistance;
				deltaSign = pLuminanceDelta >= 0.0;

			} else {

				shortestDistance = nDistance;
				deltaSign = nLuminanceDelta >= 0.0;

			}

			if ( deltaSign == ( l.m - edgeLuminance >= 0.0 ) ) {

				return 0.0;

			}

			return 0.5 - shortestDistance / ( pDistance + nDistance );

		}

		vec4 ApplyFXAA( sampler2D  tex2D, vec2 texSize, vec2 uv ) {

			LuminanceData luminance = SampleLuminanceNeighborhood( tex2D, texSize, uv );
			if ( ShouldSkipPixel( luminance ) ) {

				return Sample( tex2D, uv );

			}

			float pixelBlend = DeterminePixelBlendFactor( luminance );
			EdgeData edge = DetermineEdge( texSize, luminance );
			float edgeBlend = DetermineEdgeBlendFactor( tex2D, texSize, luminance, edge, uv );
			float finalBlend = max( pixelBlend, edgeBlend );

			if (edge.isHorizontal) {

				uv.y += edge.pixelStep * finalBlend;

			} else {

				uv.x += edge.pixelStep * finalBlend;

			}

			return Sample( tex2D, uv );

		}

		void main() {

			gl_FragColor = ApplyFXAA( tDiffuse, resolution.xy, vUv );

		}`},Yt=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},zi=new tr(-1,1,1,-1,0,1),Ri=new class extends it{constructor(){super(),this.setAttribute("position",new ze([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ze([0,2,0,0,2,0],2))}},za=class{constructor(a){this._mesh=new ot(Ri,a)}dispose(){this._mesh.geometry.dispose()}render(a){a.render(this._mesh,zi)}get material(){return this._mesh.material}set material(a){this._mesh.material=a}},Ca=class extends Yt{constructor(a,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,a instanceof ft?(this.uniforms=a.uniforms,this.material=a):a&&(this.uniforms=_t.clone(a.uniforms),this.material=new ft({name:a.name===void 0?"unspecified":a.name,defines:Object.assign({},a.defines),uniforms:this.uniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader})),this._fsQuad=new za(this.material)}render(a,e,t){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=t.texture),this._fsQuad.material=this.material,this.renderToScreen?(a.setRenderTarget(null),this._fsQuad.render(a)):(a.setRenderTarget(e),this.clear&&a.clear(a.autoClearColor,a.autoClearDepth,a.autoClearStencil),this._fsQuad.render(a))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Fi=class extends Ca{constructor(){super(Di)}setSize(a,e){this.material.uniforms.resolution.value.set(1/a,1/e)}},ma={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

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

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},fr=class extends Yt{constructor(){super(),this.isOutputPass=!0,this.uniforms=_t.clone(ma.uniforms),this.material=new Yr({name:ma.name,uniforms:this.uniforms,vertexShader:ma.vertexShader,fragmentShader:ma.fragmentShader}),this._fsQuad=new za(this.material),this._outputColorSpace=null,this._toneMapping=null}render(a,e,t){this.uniforms.tDiffuse.value=t.texture,this.uniforms.toneMappingExposure.value=a.toneMappingExposure,(this._outputColorSpace!==a.outputColorSpace||this._toneMapping!==a.toneMapping)&&(this._outputColorSpace=a.outputColorSpace,this._toneMapping=a.toneMapping,this.material.defines={},Xr.getTransfer(this._outputColorSpace)==="srgb"&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(a.setRenderTarget(null),this._fsQuad.render(a)):(a.setRenderTarget(e),this.clear&&a.clear(a.autoClearColor,a.autoClearDepth,a.autoClearStencil),this._fsQuad.render(a))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},va={move:.04,turn:.045,maxFrames:[1,3,8,16]},Pt={step:.1,down:.87,up:1.02,downSec:2,upSec:3,warmup:6,lockSec:120};function Co(a,e,t,o){let i=a.setSize.bind(a);a.setSize=(r,s)=>i(Math.max(1,Math.round(r*e)),Math.max(1,Math.round(s*e))),a.setSize(t,o)}function Li({perf:a,renderer:e,post:t,shadows:o,camera:i,splits:r,maxFar:s,now:n=()=>performance.now()}){let l={ao:1,bloom:1,fxaa:!1,stagger:!1,shadowDraws:0,frames:0,dynamic:!1,scale:1,atFloor:!0,degrade:0,degradeText:"",fps:0};if(!a)return{info:l,tick(){},setScale(){}};let c=t.composer.renderTarget1,u=c.width,f=c.height;if(a.aoScale&&a.aoScale!==1&&t.gtao.enabled){Co(t.gtao,a.aoScale,u,f);let C=a.aoSamples||8;t.gtao.updateGtaoMaterial({samples:C}),t.gtao.updatePdMaterial({samples:C,radius:4}),l.ao=a.aoScale}if(a.bloomScale&&a.bloomScale!==1&&t.bloom.enabled&&(Co(t.bloom,a.bloomScale,u,f),l.bloom=a.bloomScale),a.fxaa){let C=t.composer.passes.findIndex(O=>O instanceof fr);if(C>=0){let O=new Fi;t.composer.insertPass(O,C+1),O.setSize(u,f),l.fxaa=!0}}let m=[],p=[...r,s],b=new ne,P=a.stagger?o.csm.lights:[];for(let C=0;C<P.length;C++)P[C].shadow.autoUpdate=!1,P[C].shadow.needsUpdate=!0,m.push({pos:new ne(1/0,0,0),dir:new ne,age:0});l.stagger=P.length>0;let S=a.dynamic&&a.dynamic.min<1?a.dynamic:null,M=e.getPixelRatio(),B=new je,D=1,L=1,A=0,_=-1e9,v=0,h=0,d=0,g=0,x=n(),w=x;l.dynamic=!!S,l.atFloor=!S;function y(C){D=Math.round(Math.min(1,Math.max(.3,C))*100)/100,e.getSize(B),t.composer._pixelRatio=M*D,t.composer.setSize(B.x,B.y),l.scale=D,l.atFloor=!S||D<=S.min+1e-6}function E(C){let O=Math.min(.5,(C-w)/1e3);if(w=C,C-x<Pt.warmup*1e3||O<=0||(d+=O,g++,d<1))return;let z=g/d;if(d=0,g=0,l.fps=Math.round(z),C>A&&(L=1),z<S.target*Pt.down?(v+=1,h=0):z>S.target*Pt.up?(h+=1,v=0):(v=0,h=0),v>=Pt.downSec&&D>S.min+1e-6){let U=Math.max(S.min,D-(z<S.target*.6?2:1)*Pt.step);C-_<15e3&&(L=U,A=C+Pt.lockSec*1e3),y(U),v=0}else if(v>=Pt.downSec&&D<=S.min+1e-6){if(v=0,++R>=2){R=0;let U=l.degrade|0;U===0&&T.gtao.enabled?(T.gtao.enabled=!1,l.degrade=1,l.degradeText="без затенения AO"):U<=1&&T.bloom.enabled?(T.bloom.enabled=!1,l.degrade=2,l.degradeText="без свечения"):U<=2&&I.csm&&I.csm.lights.length&&I.csm.lights[0].shadow.mapSize.x>768?(I.csm.lights.forEach(H=>{H.shadow.mapSize.set(768,768),H.shadow.map&&(H.shadow.map.dispose(),H.shadow.map=null),H.shadow.needsUpdate=!0}),l.degrade=3,l.degradeText="тени 768"):l.degrade=4}}else h>=Pt.upSec&&D<L-1e-6&&(y(Math.min(L,D+Pt.step)),h=0,_=C)}let R=0,T=t,I=o,N=0;return{info:l,setScale:y,tick(){let C=n();if(S&&E(C),D!==1||t.grade.uniforms.uSharpen.value!==Je.sharpen){let O=t.composer.renderTarget1;t.grade.uniforms.uTexel.value.set(1/O.width,1/O.height),t.grade.uniforms.uSharpen.value=Je.sharpen+Je.sharpenLow*(1-D)}if(P.length){N++,l.frames=N,i.getWorldDirection(b);for(let O=0;O<P.length;O++){let z=m[O],U=va.maxFrames[Math.min(O,va.maxFrames.length-1)];z.age++;let H=z.age>=U&&(U<=3||(N+O)%2==0),k=z.pos.distanceToSquared(i.position)>(va.move*p[O])**2,V=z.dir.dot(b)<Math.cos(va.turn);(O===0||H||k||V)&&(P[O].shadow.needsUpdate=!0,l.shadowDraws++,z.pos.copy(i.position),z.dir.copy(b),z.age=0)}}}}}var Vt={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},Po=class extends Yt{constructor(a,e){super(),this.scene=a,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(a,e,t){let o=a.getContext(),i=a.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let r,s;this.inverse?(r=0,s=1):(r=1,s=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(o.REPLACE,o.REPLACE,o.REPLACE),i.buffers.stencil.setFunc(o.ALWAYS,r,4294967295),i.buffers.stencil.setClear(s),i.buffers.stencil.setLocked(!0),a.setRenderTarget(t),this.clear&&a.clear(),a.render(this.scene,this.camera),a.setRenderTarget(e),this.clear&&a.clear(),a.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(o.EQUAL,1,4294967295),i.buffers.stencil.setOp(o.KEEP,o.KEEP,o.KEEP),i.buffers.stencil.setLocked(!0)}},Ai=class extends Yt{constructor(){super(),this.needsSwap=!1}render(a){a.state.buffers.stencil.setLocked(!1),a.state.buffers.stencil.setTest(!1)}},Ei=class{constructor(a,e){if(this.renderer=a,this._pixelRatio=a.getPixelRatio(),e===void 0){let t=a.getSize(new je);this._width=t.width,this._height=t.height,e=new Ft(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Wt}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Ca(Vt),this.copyPass.material.blending=0,this.timer=new Gr}swapBuffers(){let a=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=a}addPass(a){this.passes.push(a),a.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(a,e){this.passes.splice(e,0,a),a.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(a){let e=this.passes.indexOf(a);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(a){for(let e=a+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(a){this.timer.update(),a===void 0&&(a=this.timer.getDelta());let e=this.renderer.getRenderTarget(),t=!1;for(let o=0,i=this.passes.length;o<i;o++){let r=this.passes[o];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(o),r.render(this.renderer,this.writeBuffer,this.readBuffer,a,t),r.needsSwap){if(t){let s=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(s.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,a),n.setFunc(s.EQUAL,1,4294967295)}this.swapBuffers()}Po!==void 0&&(r instanceof Po?t=!0:r instanceof Ai&&(t=!1))}}this.renderer.setRenderTarget(e)}reset(a){if(a===void 0){let e=this.renderer.getSize(new je);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,a=this.renderTarget1.clone(),a.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=a,this.renderTarget2=a.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(a,e){this._width=a,this._height=e;let t=this._width*this._pixelRatio,o=this._height*this._pixelRatio;this.renderTarget1.setSize(t,o),this.renderTarget2.setSize(t,o);for(let i=0;i<this.passes.length;i++)this.passes[i].setSize(t,o)}setPixelRatio(a){this._pixelRatio=a,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},Ni=class extends Yt{constructor(a,e,t=null,o=null,i=null){super(),this.scene=a,this.camera=e,this.overrideMaterial=t,this.clearColor=o,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Ee}render(a,e,t){let o=a.autoClear;a.autoClear=!1;let i,r;this.overrideMaterial!==null&&(r=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(a.getClearColor(this._oldClearColor),a.setClearColor(this.clearColor,a.getClearAlpha())),this.clearAlpha!==null&&(i=a.getClearAlpha(),a.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&a.clearDepth(),a.setRenderTarget(this.renderToScreen?null:t),this.clear===!0&&a.clear(a.autoClearColor,a.autoClearDepth,a.autoClearStencil),a.render(this.scene,this.camera),this.clearColor!==null&&a.setClearColor(this._oldClearColor),this.clearAlpha!==null&&a.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=r),a.autoClear=o}},ga={defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new je},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new Ze},cameraProjectionMatrixInverse:{value:new Ze},cameraWorldMatrix:{value:new Ze},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new ne(-1,-1,-1)},sceneBoxMax:{value:new ne(1,1,1)}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		varying vec2 vUv;
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform mat4 cameraWorldMatrix;
		uniform float radius;
		uniform float distanceExponent;
		uniform float thickness;
		uniform float distanceFallOff;
		uniform float scale;
		#if SCENE_CLIP_BOX == 1
			uniform vec3 sceneBoxMin;
			uniform vec3 sceneBoxMax;
		#endif

		#include <common>
		#include <packing>

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(vec3(ao), 1.)
		#endif

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				vec4 clipSpacePosition = vec4( vec2( screenPosition ) * 2.0 - 1.0, depth, 1.0 );
			#else
				vec4 clipSpacePosition = vec4( vec3( screenPosition, depth ) * 2.0 - 1.0, 1.0 );
			#endif
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
			return textureLod(tDepth, uv.xy, 0.0).DEPTH_SWIZZLING;
		}

		float fetchDepth(const ivec2 uv) {
			return texelFetch(tDepth, uv.xy, 0).DEPTH_SWIZZLING;
		}

		float getViewZ(const in float depth) {
			#if PERSPECTIVE_CAMERA == 1
				return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
			#else
				return orthographicDepthToViewZ(depth, cameraNear, cameraFar);
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ? ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz : -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ? ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz : -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
			#if NORMAL_VECTOR_TYPE == 2
				return normalize(textureLod(tNormal, uv, 0.).rgb);
			#elif NORMAL_VECTOR_TYPE == 1
				return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
			#else
				return computeNormalFromDepth(uv);
			#endif
		}

		vec3 getSceneUvAndDepth(vec3 sampleViewPos) {
			vec4 sampleClipPos = cameraProjectionMatrix * vec4(sampleViewPos, 1.);
			vec2 sampleUv = sampleClipPos.xy / sampleClipPos.w * 0.5 + 0.5;
			float sampleSceneDepth = getDepth(sampleUv);
			return vec3(sampleUv, sampleSceneDepth);
		}

		void main() {
			float depth = getDepth(vUv.xy);

			#ifdef USE_REVERSED_DEPTH_BUFFER
				if (depth <= 0.0) {
					discard;
					return;
				}
			#else
				if (depth >= 1.0) {
					discard;
					return;
				}
			#endif
			
			vec3 viewPos = getViewPosition(vUv, depth);
			vec3 viewNormal = getViewNormal(vUv);

			float radiusToUse = radius;
			float distanceFalloffToUse = thickness;
			#if SCREEN_SPACE_RADIUS == 1
				float radiusScale = getViewPosition(vec2(0.5 + float(SCREEN_SPACE_RADIUS_SCALE) / resolution.x, 0.0), depth).x;
				radiusToUse *= radiusScale;
				distanceFalloffToUse *= radiusScale;
			#endif

			#if SCENE_CLIP_BOX == 1
				vec3 worldPos = (cameraWorldMatrix * vec4(viewPos, 1.0)).xyz;
				float boxDistance = length(max(vec3(0.0), max(sceneBoxMin - worldPos, worldPos - sceneBoxMax)));
				if (boxDistance > radiusToUse) {
					discard;
					return;
				}
			#endif

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
			vec3 randomVec = noiseTexel.xyz * 2.0 - 1.0;
			vec3 tangent = normalize(vec3(randomVec.xy, 0.));
			vec3 bitangent = vec3(-tangent.y, tangent.x, 0.);
			mat3 kernelMatrix = mat3(tangent, bitangent, vec3(0., 0., 1.));

			const int DIRECTIONS = SAMPLES < 30 ? 3 : 5;
			const int STEPS = (SAMPLES + DIRECTIONS - 1) / DIRECTIONS;
			float ao = 0.0;
			for (int i = 0; i < DIRECTIONS; ++i) {

				float angle = float(i) / float(DIRECTIONS) * PI;
				vec4 sampleDir = vec4(cos(angle), sin(angle), 0., 0.5 + 0.5 * noiseTexel.w);
				sampleDir.xyz = normalize(kernelMatrix * sampleDir.xyz);

				vec3 viewDir = normalize(-viewPos.xyz);
				vec3 sliceBitangent = normalize(cross(sampleDir.xyz, viewDir));
				vec3 sliceTangent = cross(sliceBitangent, viewDir);
				vec3 normalInSlice = normalize(viewNormal - sliceBitangent * dot(viewNormal, sliceBitangent));

				vec3 tangentToNormalInSlice = cross(normalInSlice, sliceBitangent);
				vec2 cosHorizons = vec2(dot(viewDir, tangentToNormalInSlice), dot(viewDir, -tangentToNormalInSlice));

				for (int j = 0; j < STEPS; ++j) {
					vec3 sampleViewOffset = sampleDir.xyz * radiusToUse * sampleDir.w * pow(float(j + 1) / float(STEPS), distanceExponent);

					vec3 sampleSceneUvDepth = getSceneUvAndDepth(viewPos + sampleViewOffset);
					vec3 sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					vec3 viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.x += max(0., (sampleCosHorizon - cosHorizons.x) * mix(1., 2. / float(j + 2), distanceFallOff));
					}

					sampleSceneUvDepth = getSceneUvAndDepth(viewPos - sampleViewOffset);
					sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.y += max(0., (sampleCosHorizon - cosHorizons.y) * mix(1., 2. / float(j + 2), distanceFallOff));
					}
				}

				vec2 sinHorizons = sqrt(1. - cosHorizons * cosHorizons);
				float nx = dot(normalInSlice, sliceTangent);
				float ny = dot(normalInSlice, viewDir);
				float nxb = 1. / 2. * (acos(cosHorizons.y) - acos(cosHorizons.x) + sinHorizons.x * cosHorizons.x - sinHorizons.y * cosHorizons.y);
				float nyb = 1. / 2. * (2. - cosHorizons.x * cosHorizons.x - cosHorizons.y * cosHorizons.y);
				float occlusion = nx * nxb + ny * nyb;
				ao += occlusion;
			}

			ao = clamp(ao / float(DIRECTIONS), 0., 1.);
		#if SCENE_CLIP_BOX == 1
			ao = mix(ao, 1., smoothstep(0., radiusToUse, boxDistance));
		#endif
			ao = pow(ao, scale);

			gl_FragColor = FRAGMENT_OUTPUT;
		}`},xa={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform sampler2D tDepth;
		uniform float cameraNear;
		uniform float cameraFar;
		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {
			#if PERSPECTIVE_CAMERA == 1
				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
			#else
				return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		void main() {
			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},Ha={uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform float intensity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;

		void main() {
			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = vec4(mix(vec3(1.), texel.rgb, intensity), texel.a);
		}`};function ki(a=5){let e=Math.floor(a)%2==0?Math.floor(a)+1:Math.floor(a),t=Oi(e),o=t.length,i=new Uint8Array(o*4);for(let s=0;s<o;++s){let n=t[s],l=2*Math.PI*n/o,c=new ne(Math.cos(l),Math.sin(l),0).normalize();i[s*4]=(c.x*.5+.5)*255,i[s*4+1]=(c.y*.5+.5)*255,i[s*4+2]=127,i[s*4+3]=255}let r=new fo(i,e,e);return r.wrapS=xt,r.wrapT=xt,r.needsUpdate=!0,r}function Oi(a){let e=Math.floor(a)%2==0?Math.floor(a)+1:Math.floor(a),t=e*e,o=Array(t).fill(0),i=Math.floor(e/2),r=e-1;for(let s=1;s<=t;){if(i===-1&&r===e?(r=e-2,i=0):(r===e&&(r=0),i<0&&(i=e-1)),o[i*e+r]!==0){r-=2,i++;continue}o[i*e+r]=s++,r++,i--}return o}var wa={defines:{SAMPLES:16,SAMPLE_VECTORS:dr(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new je},cameraProjectionMatrixInverse:{value:new Ze},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`

		varying vec2 vUv;

		uniform sampler2D tDiffuse;
		uniform sampler2D tNormal;
		uniform sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform float lumaPhi;
		uniform float depthPhi;
		uniform float normalPhi;
		uniform float radius;
		uniform int index;

		#include <common>
		#include <packing>

		#ifndef SAMPLE_LUMINANCE
		#define SAMPLE_LUMINANCE dot(vec3(0.2125, 0.7154, 0.0721), a)
		#endif

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(denoised, 1.)
		#endif

		float getLuminance(const in vec3 a) {
			return SAMPLE_LUMINANCE;
		}

		const vec3 poissonDisk[SAMPLES] = SAMPLE_VECTORS;

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				vec4 clipSpacePosition = vec4( vec2( screenPosition ) * 2.0 - 1.0, depth, 1.0 );
			#else
				vec4 clipSpacePosition = vec4( vec3( screenPosition, depth ) * 2.0 - 1.0, 1.0 );
			#endif
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
		#if DEPTH_VALUE_SOURCE == 1
			return textureLod(tDepth, uv.xy, 0.0).a;
		#else
			return textureLod(tDepth, uv.xy, 0.0).r;
		#endif
		}

		float fetchDepth(const ivec2 uv) {
			#if DEPTH_VALUE_SOURCE == 1
				return texelFetch(tDepth, uv.xy, 0).a;
			#else
				return texelFetch(tDepth, uv.xy, 0).r;
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ?  ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz
									: -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ?  ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz
									: -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
		#if NORMAL_VECTOR_TYPE == 2
			return normalize(textureLod(tNormal, uv, 0.).rgb);
		#elif NORMAL_VECTOR_TYPE == 1
			return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
		#else
			return computeNormalFromDepth(uv);
		#endif
		}

		void denoiseSample(in vec3 center, in vec3 viewNormal, in vec3 viewPos, in vec2 sampleUv, inout vec3 denoised, inout float totalWeight) {
			vec4 sampleTexel = textureLod(tDiffuse, sampleUv, 0.0);
			float sampleDepth = getDepth(sampleUv);
			vec3 sampleNormal = getViewNormal(sampleUv);
			vec3 neighborColor = sampleTexel.rgb;
			vec3 viewPosSample = getViewPosition(sampleUv, sampleDepth);

			float normalDiff = dot(viewNormal, sampleNormal);
			float normalSimilarity = pow(max(normalDiff, 0.), normalPhi);
			float lumaDiff = abs(getLuminance(neighborColor) - getLuminance(center));
			float lumaSimilarity = max(1.0 - lumaDiff / lumaPhi, 0.0);
			float depthDiff = abs(dot(viewPos - viewPosSample, viewNormal));
			float depthSimilarity = max(1. - depthDiff / depthPhi, 0.);
			float w = lumaSimilarity * depthSimilarity * normalSimilarity;

			denoised += w * neighborColor;
			totalWeight += w;
		}

		void main() {
			float depth = getDepth(vUv.xy);
			vec3 viewNormal = getViewNormal(vUv);
			if (depth == 1. || dot(viewNormal, viewNormal) == 0.) {
				discard;
				return;
			}
			vec4 texel = textureLod(tDiffuse, vUv, 0.0);
			vec3 center = texel.rgb;
			vec3 viewPos = getViewPosition(vUv, depth);

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
      		vec2 noiseVec = vec2(sin(noiseTexel[index % 4] * 2. * PI), cos(noiseTexel[index % 4] * 2. * PI));
    		mat2 rotationMatrix = mat2(noiseVec.x, -noiseVec.y, noiseVec.x, noiseVec.y);

			float totalWeight = 1.0;
			vec3 denoised = texel.rgb;
			for (int i = 0; i < SAMPLES; i++) {
				vec3 sampleDir = poissonDisk[i];
				vec2 offset = rotationMatrix * (sampleDir.xy * (1. + sampleDir.z * (radius - 1.)) / resolution);
				vec2 sampleUv = vUv + offset;
				denoiseSample(center, viewNormal, viewPos, sampleUv, denoised, totalWeight);
			}

			if (totalWeight > 0.) {
				denoised /= totalWeight;
			}
			gl_FragColor = FRAGMENT_OUTPUT;
		}`};function dr(a,e,t){let o=Ii(a,e,t),i="vec3[SAMPLES](";for(let r=0;r<a;r++){let s=o[r];i+=`vec3(${s.x}, ${s.y}, ${s.z})${r<a-1?",":")"}`}return i}function Ii(a,e,t){let o=[];for(let i=0;i<a;i++){let r=2*Math.PI*e*i/a,s=(i/(a-1))**t;o.push(new ne(Math.cos(r),Math.sin(r),s))}return o}var Ui=class{constructor(a=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let e=0;e<256;e++)this.p[e]=Math.floor(a.random()*256);this.perm=[];for(let e=0;e<512;e++)this.perm[e]=this.p[e&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(a,e){let t,o,i,r=.5*(Math.sqrt(3)-1),s=(a+e)*r,n=Math.floor(a+s),l=Math.floor(e+s),c=(3-Math.sqrt(3))/6,u=(n+l)*c,f=n-u,m=l-u,p=a-f,b=e-m,P,S;p>b?(P=1,S=0):(P=0,S=1);let M=p-P+c,B=b-S+c,D=p-1+2*c,L=b-1+2*c,A=n&255,_=l&255,v=this.perm[A+this.perm[_]]%12,h=this.perm[A+P+this.perm[_+S]]%12,d=this.perm[A+1+this.perm[_+1]]%12,g=.5-p*p-b*b;g<0?t=0:(g*=g,t=g*g*this._dot(this.grad3[v],p,b));let x=.5-M*M-B*B;x<0?o=0:(x*=x,o=x*x*this._dot(this.grad3[h],M,B));let w=.5-D*D-L*L;return w<0?i=0:(w*=w,i=w*w*this._dot(this.grad3[d],D,L)),70*(t+o+i)}noise3d(a,e,t){let o,i,r,s,n=(a+e+t)*.3333333333333333,l=Math.floor(a+n),c=Math.floor(e+n),u=Math.floor(t+n),f=1/6,m=(l+c+u)*f,p=l-m,b=c-m,P=u-m,S=a-p,M=e-b,B=t-P,D,L,A,_,v,h;S>=M?M>=B?(D=1,L=0,A=0,_=1,v=1,h=0):S>=B?(D=1,L=0,A=0,_=1,v=0,h=1):(D=0,L=0,A=1,_=1,v=0,h=1):M<B?(D=0,L=0,A=1,_=0,v=1,h=1):S<B?(D=0,L=1,A=0,_=0,v=1,h=1):(D=0,L=1,A=0,_=1,v=1,h=0);let d=S-D+f,g=M-L+f,x=B-A+f,w=S-_+2*f,y=M-v+2*f,E=B-h+2*f,R=S-1+3*f,T=M-1+3*f,I=B-1+3*f,N=l&255,C=c&255,O=u&255,z=this.perm[N+this.perm[C+this.perm[O]]]%12,U=this.perm[N+D+this.perm[C+L+this.perm[O+A]]]%12,H=this.perm[N+_+this.perm[C+v+this.perm[O+h]]]%12,k=this.perm[N+1+this.perm[C+1+this.perm[O+1]]]%12,V=.6-S*S-M*M-B*B;V<0?o=0:(V*=V,o=V*V*this._dot3(this.grad3[z],S,M,B));let F=.6-d*d-g*g-x*x;F<0?i=0:(F*=F,i=F*F*this._dot3(this.grad3[U],d,g,x));let j=.6-w*w-y*y-E*E;j<0?r=0:(j*=j,r=j*j*this._dot3(this.grad3[H],w,y,E));let ee=.6-R*R-T*T-I*I;return ee<0?s=0:(ee*=ee,s=ee*ee*this._dot3(this.grad3[k],R,T,I)),32*(o+i+r+s)}noise4d(a,e,t,o){let i=this.grad4,r=this.simplex,s=this.perm,n=(Math.sqrt(5)-1)/4,l=(5-Math.sqrt(5))/20,c,u,f,m,p,b=(a+e+t+o)*n,P=Math.floor(a+b),S=Math.floor(e+b),M=Math.floor(t+b),B=Math.floor(o+b),D=(P+S+M+B)*l,L=P-D,A=S-D,_=M-D,v=B-D,h=a-L,d=e-A,g=t-_,x=o-v,w=h>d?32:0,y=h>g?16:0,E=d>g?8:0,R=h>x?4:0,T=d>x?2:0,I=+(g>x),N=w+y+E+R+T+I,C=+(r[N][0]>=3),O=+(r[N][1]>=3),z=+(r[N][2]>=3),U=+(r[N][3]>=3),H=+(r[N][0]>=2),k=+(r[N][1]>=2),V=+(r[N][2]>=2),F=+(r[N][3]>=2),j=+(r[N][0]>=1),ee=+(r[N][1]>=1),K=+(r[N][2]>=1),oe=+(r[N][3]>=1),J=h-C+l,fe=d-O+l,se=g-z+l,pe=x-U+l,we=h-H+2*l,Me=d-k+2*l,Re=g-V+2*l,Ne=x-F+2*l,Ue=h-j+3*l,ye=d-ee+3*l,ge=g-K+3*l,ke=x-oe+3*l,We=h-1+4*l,G=d-1+4*l,X=g-1+4*l,Z=x-1+4*l,ae=P&255,he=S&255,Te=M&255,Se=B&255,Ve=s[ae+s[he+s[Te+s[Se]]]]%32,de=s[ae+C+s[he+O+s[Te+z+s[Se+U]]]]%32,Ce=s[ae+H+s[he+k+s[Te+V+s[Se+F]]]]%32,W=s[ae+j+s[he+ee+s[Te+K+s[Se+oe]]]]%32,re=s[ae+1+s[he+1+s[Te+1+s[Se+1]]]]%32,q=.6-h*h-d*d-g*g-x*x;q<0?c=0:(q*=q,c=q*q*this._dot4(i[Ve],h,d,g,x));let te=.6-J*J-fe*fe-se*se-pe*pe;te<0?u=0:(te*=te,u=te*te*this._dot4(i[de],J,fe,se,pe));let ce=.6-we*we-Me*Me-Re*Re-Ne*Ne;ce<0?f=0:(ce*=ce,f=ce*ce*this._dot4(i[Ce],we,Me,Re,Ne));let le=.6-Ue*Ue-ye*ye-ge*ge-ke*ke;le<0?m=0:(le*=le,m=le*le*this._dot4(i[W],Ue,ye,ge,ke));let $=.6-We*We-G*G-X*X-Z*Z;return $<0?p=0:($*=$,p=$*$*this._dot4(i[re],We,G,X,Z)),27*(c+u+f+m+p)}_dot(a,e,t){return a[0]*e+a[1]*t}_dot3(a,e,t,o){return a[0]*e+a[1]*t+a[2]*o}_dot4(a,e,t,o,i){return a[0]*e+a[1]*t+a[2]*o+a[3]*i}},ur=class Nt extends Yt{constructor(e,t,o=512,i=512,r,s,n){super(),this.width=o,this.height=i,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=ki(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new Ft(this.width,this.height,{type:Wt,depthBuffer:!1}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new ft({defines:Object.assign({},ga.defines),uniforms:_t.clone(ga.uniforms),vertexShader:ga.vertexShader,fragmentShader:ga.fragmentShader,blending:0,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=+!!this.camera.isPerspectiveCamera,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new Wr,this.normalMaterial.blending=0,this.pdMaterial=new ft({defines:Object.assign({},wa.defines),uniforms:_t.clone(wa.uniforms),vertexShader:wa.vertexShader,fragmentShader:wa.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new ft({defines:Object.assign({},xa.defines),uniforms:_t.clone(xa.uniforms),vertexShader:xa.vertexShader,fragmentShader:xa.fragmentShader,blending:0}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new ft({uniforms:_t.clone(Vt.uniforms),vertexShader:Vt.vertexShader,fragmentShader:Vt.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:208,blendDst:200,blendEquation:100,blendSrcAlpha:206,blendDstAlpha:200,blendEquationAlpha:100}),this.blendMaterial=new ft({uniforms:_t.clone(Ha.uniforms),vertexShader:Ha.vertexShader,fragmentShader:Ha.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:5,blendSrc:208,blendDst:200,blendEquation:100,blendSrcAlpha:206,blendDstAlpha:200,blendEquationAlpha:100}),this._fsQuad=new za(null),this._originalClearColor=new Ee,this.setGBuffer(r?r.depthTexture:void 0,r?r.normalTexture:void 0),s!==void 0&&this.updateGtaoMaterial(s),n!==void 0&&this.updatePdMaterial(n)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,t){e===void 0?(this.depthTexture=new Vr,this.depthTexture.format=$r,this.depthTexture.type=jr,this.normalRenderTarget=new Ft(this.width,this.height,{minFilter:eo,magFilter:eo,type:Wt,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0):(this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1);let o=+!!this.normalTexture,i=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=o,this.gtaoMaterial.defines.DEPTH_SWIZZLING=i,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=o,this.pdMaterial.defines.DEPTH_SWIZZLING=i,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&+!!e.screenSpaceRadius!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=+!!e.screenSpaceRadius,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=dr(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(e,t,o){switch(this._renderGBuffer&&(this._overrideVisibility(),this._renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(e,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(e,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case Nt.OUTPUT.Off:break;case Nt.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=o.texture,this.copyMaterial.blending=0,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case Nt.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=0,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case Nt.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=0,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case Nt.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case Nt.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=0,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case Nt.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=o.texture,this.copyMaterial.blending=0,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(e,this.blendMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}_renderPass(e,t,o,i,r){e.getClearColor(this._originalClearColor);let s=e.getClearAlpha(),n=e.autoClear;e.setRenderTarget(o),e.autoClear=!1,i!=null&&(e.setClearColor(i),e.setClearAlpha(r||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=n,e.setClearColor(this._originalClearColor),e.setClearAlpha(s)}_renderOverride(e,t,o,i,r){e.getClearColor(this._originalClearColor);let s=e.getClearAlpha(),n=e.autoClear;e.setRenderTarget(o),e.autoClear=!1,i=t.clearColor||i,r=t.clearAlpha||r,i!=null&&(e.setClearColor(i),e.setClearAlpha(r||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=n,e.setClearColor(this._originalClearColor),e.setClearAlpha(s)}_overrideVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(o){(o.isPoints||o.isLine||o.isLine2)&&o.visible&&(o.visible=!1,t.push(o))})}_restoreVisibility(){let e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}_generateNoise(e=64){let t=new Ui,o=e*e*4,i=new Uint8Array(o);for(let s=0;s<e;s++)for(let n=0;n<e;n++){let l=s,c=n;i[(s*e+n)*4]=(t.noise(l,c)*.5+.5)*255,i[(s*e+n)*4+1]=(t.noise(l+e,c)*.5+.5)*255,i[(s*e+n)*4+2]=(t.noise(l,c+e)*.5+.5)*255,i[(s*e+n)*4+3]=(t.noise(l+e,c+e)*.5+.5)*255}let r=new fo(i,e,e,uo,ho);return r.wrapS=xt,r.wrapT=xt,r.needsUpdate=!0,r}};ur.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};var Hi={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ee(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},oo=class ro extends Yt{constructor(e,t=1,o,i){super(),this.strength=t,this.radius=o,this.threshold=i,this.resolution=e===void 0?new je(256,256):new je(e.x,e.y),this.clearColor=new Ee(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);this.renderTargetBright=new Ft(r,s,{type:Wt,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){let f=new Ft(r,s,{type:Wt,depthBuffer:!1});f.texture.name="UnrealBloomPass.h"+u,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);let m=new Ft(r,s,{type:Wt,depthBuffer:!1});m.texture.name="UnrealBloomPass.v"+u,m.texture.generateMipmaps=!1,this.renderTargetsVertical.push(m),r=Math.round(r/2),s=Math.round(s/2)}let n=Hi;this.highPassUniforms=_t.clone(n.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ft({uniforms:this.highPassUniforms,vertexShader:n.vertexShader,fragmentShader:n.fragmentShader}),this.separableBlurMaterials=[];let l=[6,10,14,18,22];r=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new je(1/r,1/s),r=Math.round(r/2),s=Math.round(s/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new ne(1,1,1),new ne(1,1,1),new ne(1,1,1),new ne(1,1,1),new ne(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=_t.clone(Vt.uniforms),this.blendMaterial=new ft({uniforms:this.copyUniforms,vertexShader:Vt.vertexShader,fragmentShader:Vt.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Ee,this._oldClearAlpha=1,this._basic=new It,this._fsQuad=new za(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let o=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(o,i);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(o,i),this.renderTargetsVertical[r].setSize(o,i),this.separableBlurMaterials[r].uniforms.invSize.value=new je(1/o,1/i),o=Math.round(o/2),i=Math.round(i/2)}render(e,t,o,i,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();let s=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=o.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=o.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let n=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=n.texture,this.separableBlurMaterials[l].uniforms.direction.value=ro.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=ro.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),n=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(o),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=s}_getSeparableBlurMaterial(e){let t=[],o=e/3;for(let s=0;s<e;s++)t.push(.39894*Math.exp(-.5*s*s/(o*o))/o);let i=[],r=[];for(let s=1;s<e;s+=2){let n=t[s],l=s+1<e?t[s+1]:0,c=n+l;i.push((s*n+(s+1)*l)/c),r.push(c)}return new ft({defines:{KERNEL_PAIRS:i.length},uniforms:{colorTexture:{value:null},invSize:{value:new je(.5,.5)},direction:{value:new je(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:i},gaussianWeights:{value:r}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new ft({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};oo.BlurDirectionX=new je(1,0),oo.BlurDirectionY=new je(0,1);var Je={contrast:1.05,saturation:.94,greenSat:.84,warm:.03,lift:.018,gamma:.98,sharpen:.3,sharpenLow:1.2,vignette:.06,chroma:0},qt={contrast:1.12,saturation:1.12,greenSat:1,warm:.09,lift:0,gamma:1},Bt={samples:28,length:.55,decay:.965,strength:0,threshold:.78},Bi={uniforms:{tDiffuse:{value:null},uSun:{value:new je(.5,.5)},uOn:{value:0}},vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); }",fragmentShader:`
    uniform sampler2D tDiffuse; uniform vec2 uSun; uniform float uOn;
    varying vec2 vUv;
    void main() {
      vec3 c = texture2D( tDiffuse, vUv ).rgb;
      if ( uOn <= 0.0 ) { gl_FragColor = vec4( c, 1.0 ); return; }
      vec2 d = ( uSun - vUv ) * ${Bt.length.toFixed(2)} / ${Bt.samples.toFixed(1)};
      vec2 p = vUv; float w = 1.0; vec3 acc = vec3( 0.0 );
      for ( int i = 0; i < ${Bt.samples}; i ++ ) {
        p += d;
        vec3 s = texture2D( tDiffuse, p ).rgb;
        float l = dot( s, vec3( 0.2126, 0.7152, 0.0722 ) );
        acc += s * smoothstep( ${Bt.threshold.toFixed(2)}, 1.0, l ) * w;
        w *= ${Bt.decay.toFixed(3)};
      }
      gl_FragColor = vec4( c + acc * ${Bt.strength.toFixed(2)} * uOn / ${Bt.samples.toFixed(1)}, 1.0 );
    }`},Gi={uniforms:{tDiffuse:{value:null},uTexel:{value:new je(1/1600,1/900)},uContrast:{value:Je.contrast},uSat:{value:Je.saturation},uGreenSat:{value:Je.greenSat},uWarm:{value:Je.warm},uLift:{value:Je.lift},uGamma:{value:Je.gamma},uSharpen:{value:Je.sharpen},uVignette:{value:Je.vignette},uChroma:{value:Je.chroma},uSpeedBlur:{value:0}},vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); }",fragmentShader:`
    uniform sampler2D tDiffuse; uniform vec2 uTexel;
    uniform float uContrast, uSat, uGreenSat, uWarm, uLift, uGamma, uSharpen, uVignette, uChroma, uSpeedBlur;
    varying vec2 vUv;
    void main() {
      vec2 d = vUv - 0.5;
      // аберрация: красный и синий каналы — чуть в стороны от центра
      vec2 ca = d * uChroma * dot( d, d ) * 4.0;
      vec3 c = vec3( texture2D( tDiffuse, vUv + ca ).r, texture2D( tDiffuse, vUv ).g, texture2D( tDiffuse, vUv - ca ).b );
      // размытие скорости по краям (2026-10-17): 4 выборки к центру, центр экрана чёткий
      float sb = uSpeedBlur * smoothstep( 0.06, 0.45, dot( d, d ) * 2.0 );
      if ( sb > 0.002 ) {
        vec2 st = d * 0.045 * uSpeedBlur;
        vec3 acc = texture2D( tDiffuse, vUv - st * 0.25 ).rgb + texture2D( tDiffuse, vUv - st * 0.5 ).rgb
          + texture2D( tDiffuse, vUv - st * 0.75 ).rgb + texture2D( tDiffuse, vUv - st ).rgb;
        c = mix( c, ( c + acc ) * 0.2, clamp( sb * 1.6, 0.0, 1.0 ) );
      }
      // резкость с подстройкой по контрасту (как AMD CAS, 2026-10-21): соседи — на шаг пикселя рендера, поэтому при
      // пониженном разрешении растяжка на экран не мылит края; на контрастных границах вес меньше — без ореолов
      if ( uSharpen > 0.0 ) {
        vec3 sN = texture2D( tDiffuse, vUv - vec2( 0.0, uTexel.y ) ).rgb, sS = texture2D( tDiffuse, vUv + vec2( 0.0, uTexel.y ) ).rgb,
          sW = texture2D( tDiffuse, vUv - vec2( uTexel.x, 0.0 ) ).rgb, sE = texture2D( tDiffuse, vUv + vec2( uTexel.x, 0.0 ) ).rgb;
        vec3 mn = min( min( min( sN, sS ), min( sW, sE ) ), c ), mx = max( max( max( sN, sS ), max( sW, sE ) ), c );
        vec3 amp = sqrt( clamp( min( mn, 1.0 - mx ) / max( mx, vec3( 1e-4 ) ), 0.0, 1.0 ) );
        vec3 w = - amp * mix( 0.125, 0.2, clamp( uSharpen, 0.0, 1.0 ) ) * ( 1.0 - clamp( sb * 2.0, 0.0, 1.0 ) );
        c = ( c + ( sN + sS + sW + sE ) * w ) / ( 1.0 + 4.0 * w );
      }
      // плёночный носок и контраст
      c = uLift + c * ( 1.0 - uLift );
      c = pow( max( c, 0.0 ), vec3( uGamma ) );
      c = 0.5 + ( c - 0.5 ) * uContrast;
      c = clamp( c, 0.0, 1.0 );
      // насыщенность: общая и зелёных отдельно
      float l = dot( c, vec3( 0.2126, 0.7152, 0.0722 ) );
      float g = clamp( ( c.g - max( c.r, c.b ) ) * 4.0, 0.0, 1.0 );
      c = mix( vec3( l ), c, mix( uSat, uSat * uGreenSat, g ) );
      // тёплые света, холодные тени
      c += ( l - 0.65 ) * uWarm * vec3( 1.0, 0.35, -1.0 );   // тёплые — только света, тени чуть холоднее
      // виньетка
      c *= 1.0 - uVignette * smoothstep( 0.25, 0.95, dot( d, d ) * 2.0 );
      gl_FragColor = vec4( clamp( c, 0.0, 1.0 ), 1.0 );
    }`};function Wi(a,e,t,o,{samples:i=4,grading:r=!0}={}){let s=a.getSize(new je).multiplyScalar(a.getPixelRatio()).floor(),n=new Ft(s.x,s.y,{type:Wt,samples:i}),l=new Ei(a,n);l.addPass(new Ni(e,t));let c=new ur(e,t,s.x,s.y);c.updateGtaoMaterial({radius:2.5,distanceExponent:1.5,thickness:2,scale:1.2,samples:16,distanceFallOff:1}),c.updatePdMaterial({lumaPhi:10,depthPhi:2,normalPhi:3,radius:6,radiusExponent:1,rings:2,samples:16}),c.blendIntensity=.9;let u=c,f=u._overrideVisibility.bind(c);u._overrideVisibility=function(){f();let S=u._visibilityCache;e.traverse(M=>{M.userData.noAO&&M.visible&&(M.visible=!1,S.push(M))})},l.addPass(c);let m=new oo(new je(s.x,s.y),.22,.6,2.5/o);l.addPass(m),l.addPass(new fr);let p=new Ca(Bi),b=new Ca(Gi);b.uniforms.uTexel.value.set(1/s.x,1/s.y),r&&l.addPass(b);let P=()=>{l.setSize(innerWidth,innerHeight);let S=a.getSize(new je).multiplyScalar(a.getPixelRatio());b.uniforms.uTexel.value.set(1/S.x,1/S.y)};return addEventListener("resize",P),{composer:l,gtao:c,bloom:m,grade:b,rays:p,setSun(S,M,B){p.uniforms.uSun.value.set(S,M),p.uniforms.uOn.value=B},setNight(S){let M=b.uniforms,B=1-S;M.uLift.value=Je.lift*B+qt.lift*S,M.uContrast.value=Je.contrast*B+qt.contrast*S,M.uSat.value=Je.saturation*B+qt.saturation*S,M.uGreenSat.value=Je.greenSat*B+qt.greenSat*S,M.uWarm.value=Je.warm*B+qt.warm*S,M.uGamma.value=Je.gamma*B+qt.gamma*S},render(){l.render()},dispose(){removeEventListener("resize",P),l.dispose(),n.dispose()}}}var Mt=(a,e,t)=>{let o=Math.min(1,Math.max(0,(t-a)/(e-a)));return o*o*(3-2*o)},Xt=a=>new Ee(a),Vi=Xt(7031356),$i=Xt(15922424),ji=Xt(5795914),Yi=Xt(2637613),Xi=Xt(3164218),Ki=Xt(7039331),qi=Xt(6447453),Zi=`
uniform float uCityLights;
varying vec3 vFarW;
vec2 farCover( vec2 dist, vec2 halfW, vec2 fw ) { return clamp( ( halfW + 0.5 * fw - dist ) / fw, 0.0, 1.0 ); }
`,Qi=`
	if ( uCityLights > 0.0 ) {
		float rC = length( vFarW.xz );
		vec2 fw = max( fwidth( vFarW.xz ), vec2( 0.05 ) );
		vec3 glow = vec3( 0.0 ), sodium = vec3( 1.0, 0.42, 0.1 );
		// улицы города вдали светятся точками фонарей и окон (farLights.js) — сетки улиц здесь больше нет (план города неровный)
		float ringFw = max( fw.x, fw.y );
		float ring = farCover( vec2( abs( rC - RING_R ) ), vec2( RING_W ), vec2( ringFw ) ).x;
		glow += sodium * ring * 0.03;
		totalEmissiveRadiance += uCityLights * glow;
	}
`;function Ji(a,{cityRadius:e,edge:t,seed:o=7,city:i,ringRadius:r=0,built:s=null}){let n=ni(o),l=g=>{let x=1-Math.abs(2*g-1);return 2*x*x-1},c=(g,x)=>l(n(g/3e3+41,x/3e3-17))+l(n(g/1100-5,x/1100+23))*.3,u=(g,x)=>a(g,x)+Mt(t-800,t+2500,Math.max(Math.abs(g),Math.abs(x)))*(260+220*c(g,x)),f=51e3,m=350,p=null,b=null,P=new Ee,S={u:null,d:0,h:null,g:null,_:null,cx:0,cz:0},M=[],B=()=>!1,D={triangles:0,masks:0,rebuilds:0};const L=(g,x,w,y,E)=>{for(let R=0;R<E*E;R++){let T=g[3*R],I=g[3*R+2],N=x[R],C=y.getY(R),O=n(T/400+3,I/400-8);P.copy(ji).lerp(Yi,Mt(30,120,N)).lerp(Xi,O*.6*Mt(30,120,N)),P.lerp(Ki,Mt(.62,.42,C)),N>2100&&(P.lerp(Vi,Mt(2250,2650,N)),P.lerp($i,Mt(2750,3150,N+300*(O-.5)))),Math.hypot(T,I)<e+60&&P.lerp(qi,s?s(T,I):1),w[3*R]=P.r,w[3*R+1]=P.g,w[3*R+2]=P.b}},A=(g,x,w,y,E)=>{for(let R=0;R<E*E;R++){let T=g(x[3*R],x[3*R+2],w[R]);if(!T||T[0]<=0)continue;let I=T[0]*(1-Mt(2300,2700,w[R])),N=(T[1]+T[2]+T[3])/3;for(let C=0;C<3;C++)y[3*R+C]+=(N+(T[C+1]-N)*.8-y[3*R+C])*I}},_=(g,x,w)=>{let{n:y,step:E,x0:R,z0:T,heights:I}=g,N=new Float32Array(y*y*3),C=new Float32Array(y*y*3),O=So(g,B);for(let U=0;U<y;U++)for(let H=0;H<y;H++){let k=(U*y+H)*3;N[k]=R+H*E,N[k+1]=I[U*y+H],N[k+2]=T+U*E}let z=new it;z.setAttribute("position",new Rt(N,3)),z.setIndex(new Rt(O.indices,1)),z.computeVertexNormals(),L(N,I,C,z.getAttribute("normal"),y);for(let U of M)A(U,N,I,C,y);z.setAttribute("color",new Rt(C,3));for(let U=0;U<y*y;U++)O.low[U]&&(N[3*U+1]=I[U]-8);if(Object.assign(S,{u:g,d:y,h:I,g:N,_:C,cx:x,cz:w}),D.triangles=O.indices.length/3,b){let U=b.geometry;b.geometry=z,U.dispose()}p=z};_(fi(u,m,f,0,0),0,0);let v=new Ie({vertexColors:!0,roughness:1,metalness:0}),h={value:0};if(i){let g=x=>x.toFixed(2);v.onBeforeCompile=x=>{x.uniforms.uCityLights=h,x.defines={...x.defines,CITY_R:g(e-100),CITY_PLAZA:g(i.plaza),CITY_PX:g(i.blockW+i.streetW),CITY_PZ:g(i.blockH+i.streetW),CITY_SW:g(i.streetW),RING_R:g(r||-1e4),RING_W:g(2.5)},x.vertexShader=x.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vFarW;`).replace("#include <begin_vertex>",`#include <begin_vertex>
	vFarW = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;`),x.fragmentShader=x.fragmentShader.replace("#include <common>","#include <common>"+Zi).replace("#include <emissivemap_fragment>","#include <emissivemap_fragment>"+Qi)},v.customProgramCacheKey=()=>"farWorldLights"}b=new ot(p,v),b.name="farWorld",b.frustumCulled=!1,b.receiveShadow=!0,b.castShadow=!1;let d=!1;return{mesh:b,info:D,recolor(g){M.push(g),A(g,S.g,S.h,S._,S.d),p.getAttribute("color").needsUpdate=!0},setLights(g,x){h.value=g*x},setDetailed(g){B=g;let x=So(S.u,g),w=p.getAttribute("position");for(let y=0;y<S.d*S.d;y++)w.setY(y,S.h[y]-(x.low[y]?8:0));w.needsUpdate=!0,p.setIndex(new Rt(x.indices,1)),D.triangles=x.indices.length/3,D.masks++},follow(g,x){if(d||Math.abs(g-S.cx)<15e3&&Math.abs(x-S.cz)<15e3)return;d=!0;let w=Math.round(g/7e3)*7e3,y=Math.round(x/7e3)*7e3,E=Math.round(2*f/m)+1,R=new Float32Array(E*E),T=0,I=()=>{for(let N=Math.min(E,T+6);T<N;T++)for(let C=0;C<E;C++)R[T*E+C]=u(w-f+C*m,y-f+T*m);if(T<E)return setTimeout(I,0);_({x0:w-f,z0:y-f,step:m,n:E,heights:R},w,y),D.rebuilds++,d=!1};setTimeout(I,0)},dispose(){b.removeFromParent(),p.dispose(),v.dispose()}}}var el=["grass","forest","rock","gravel","asphalt","moss"];async function tl(a,e){let t=await(await fetch(a)).blob(),o=await createImageBitmap(t,{resizeWidth:e,resizeHeight:e,resizeQuality:"high"}),i=new OffscreenCanvas(e,e).getContext("2d");return i.drawImage(o,0,0),o.close(),i.getImageData(0,0,e,e).data}function To(a,e,t,o){let i=new Ir(a,e,e,t);return i.format=uo,i.type=ho,i.wrapS=i.wrapT=xt,i.minFilter=Ta,i.magFilter=Da,i.generateMipmaps=!0,i.anisotropy=8,i.colorSpace=o?mt:"",i.needsUpdate=!0,i}async function al(a,e,t=1024){let o=e.length,i=new Uint8Array(t*t*4*o),r=new Uint8Array(t*t*4*o),s=[];return await Promise.all(e.map(async(n,l)=>{let[c,u,f]=await Promise.all(["color","normal","rough"].map(M=>tl(`${a}textures/${n}_${M}.jpg`,t))),m=l*t*t*4;i.set(c,m);let p=0,b=0,P=0;for(let M=0;M<t*t*4;M+=4)r[m+M]=u[M],r[m+M+1]=u[M+1],r[m+M+2]=u[M+2],r[m+M+3]=f[M],p+=c[M],b+=c[M+1],P+=c[M+2];let S=1/(t*t*255);s[l]=new Ee().setRGB(p*S,b*S,P*S,mt)})),{albedo:To(i,t,o,!0),normalRough:To(r,t,o,!1),mean:s}}var Ba={dark:.36,edge0:.15,edge1:.45};function Ra(a,e={}){let t=e.dark??Ba.dark,o=e.edge0??Ba.edge0,i=e.edge1??Ba.edge1;return a.fragmentShader=a.fragmentShader.replace("#include <lights_physical_pars_fragment>",`#include <lights_physical_pars_fragment>
#undef RE_Direct
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float nl = dot( geometryNormal, directLight.direction );
	float lit = mix( ${t.toFixed(3)}, 1.0, smoothstep( ${o.toFixed(3)}, ${i.toFixed(3)}, nl ) );
	reflectedLight.directDiffuse += directLight.color * lit * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct RE_Direct_Toon`),a}var ol=[2.6,3.2,6,2.2,4,2.4],rl=[[.37,.47,.26],[.34,.29,.2],[.86,.86,.84],[.5,.5,.52],[1,1,1],[.25,.36,.19]],il=`
uniform float uSnow;
uniform float uAutumn;
uniform sampler2D tPhoto;
uniform vec4 uPhotoRect;
uniform float uPhotoOn;
// второй регион со своим снимком (Токийский залив; первый — Фудзи)
uniform sampler2D tPhoto2;
uniform vec4 uPhotoRect2;
uniform float uPhotoOn2;
// третий — Хаконе, четвёртый — центр Токио
uniform sampler2D tPhoto3;
uniform vec4 uPhotoRect3;
uniform float uPhotoOn3;
uniform sampler2D tPhoto4;
uniform vec4 uPhotoRect4;
uniform float uPhotoOn4;
// uPhotoHub — радиус хаба без снимка (у Канто хаба нет: −1e6); uPhotoNear — у Канто снимок 80 м/пкс, вблизи камеры
// он слабее (0,3 до 200 м → полный к 1,5 км), иначе земля у дороги — мыльные пятна
uniform float uPhotoHub;
uniform float uPhotoNear;
// аэрофото региона на рельефе: цвет снимка на средних масштабах; у хаба, у краёв снимка и выше ~2 400 м — не действует.
// Снимок — sRGB, раскодируется здесь (пространство текстуры у ImageBitmap не применяется); это освещённая сцена с большим
// диапазоном, а рельеф рассчитан на альбедо ~0,03–0,06: диапазон снимка сжимается в него
vec3 photoMix( vec3 c, sampler2D T, vec4 R, vec3 wp ) {
	vec2 pd = R.zw - R.xy, pu = ( wp.xz - R.xy ) / pd, eg = min( pu, 1.0 - pu ) * pd;
	float pw = smoothstep( uPhotoHub, uPhotoHub + 3000.0, length( wp.xz ) ) * smoothstep( 0.0, 1500.0, min( eg.x, eg.y ) ) * ( 1.0 - smoothstep( 2300.0, 2700.0, wp.y ) );
	pw *= mix( 1.0, mix( 0.3, 1.0, smoothstep( 200.0, 1500.0, distance( cameraPosition.xz, wp.xz ) ) ), uPhotoNear );
	if ( pw <= 0.001 ) return c;
	float l = dot( c, vec3( 0.2126, 0.7152, 0.0722 ) );
	vec3 ps = texture2D( T, pu ).rgb, ph = 0.032 + 0.15 * pow( ps, vec3( 2.2 ) );
	// Канто: облака на снимке (очень светлое) — без снимка
	pw *= 1.0 - uPhotoNear * smoothstep( 2.2, 2.5, ps.r + ps.g + ps.b );
	return mix( c, ph * clamp( 0.45 + l * 9.0, 0.6, 1.5 ), pw * 0.8 );
}
uniform sampler2DArray tAlbedo;
uniform sampler2DArray tNormalRough;
uniform float tScale[6];
uniform vec3 tTint[6];
varying vec3 vTWorld;
varying vec3 vTNormal;
varying vec4 vSplatA;
varying vec4 vSplatB;
float tHash( vec2 p ) { return fract( sin( dot( p, vec2( 127.1, 311.7 ) ) ) * 43758.5453 ); }
float tNoise( vec2 p ) {
	vec2 i = floor( p ), f = fract( p ), u = f * f * ( 3.0 - 2.0 * f );
	return mix( mix( tHash( i ), tHash( i + vec2( 1.0, 0.0 ) ), u.x ), mix( tHash( i + vec2( 0.0, 1.0 ) ), tHash( i + vec2( 1.0, 1.0 ) ), u.x ), u.y );
}
`,ll=`
	vec3 tAlbC = vec3( 0.0 ); float tRgh = 0.95;   // оптимизация 2026-10-11: шероховатость постоянная (свет рисованный, бликов нет), карты нормалей не читаются
	{
		float w[6];
		w[0] = vSplatA.x; w[1] = vSplatA.y; w[2] = vSplatA.z; w[3] = vSplatA.w; w[4] = vSplatB.x; w[5] = vSplatB.y;
		float ws = w[0] + w[1] + w[2] + w[3] + w[4] + w[5];
		vec3 gN = normalize( vTNormal ), tw = pow( abs( gN ), vec3( 4.0 ) );
		tw /= tw.x + tw.y + tw.z;
		vec2 dxz = dFdx( vTWorld.xz ), dyz = dFdy( vTWorld.xz );
		vec2 dxZY = dFdx( vTWorld.zy ), dyZY = dFdy( vTWorld.zy ), dxXY = dFdx( vTWorld.xy ), dyXY = dFdy( vTWorld.xy );
		for ( int i = 0; i < 6; i ++ ) {
			float wi = w[ i ] / max( ws, 1e-4 );
			if ( wi < 0.004 ) continue;
			float s = tScale[ i ], L = float( i );
			if ( i == 2 ) {                                   // скала: три проекции по нормали
				vec4 aX = textureGrad( tAlbedo, vec3( vTWorld.zy / s, L ), dxZY / s, dyZY / s );
				vec4 aY = textureGrad( tAlbedo, vec3( vTWorld.xz / s, L ), dxz / s, dyz / s );
				vec4 aZ = textureGrad( tAlbedo, vec3( vTWorld.xy / s, L ), dxXY / s, dyXY / s );
				tAlbC += ( aX.rgb * tw.x + aY.rgb * tw.y + aZ.rgb * tw.z ) * tTint[ i ] * wi;
			} else {                                          // по плоскости xz, второй масштаб против повторов
				vec2 uv = vTWorld.xz / s;
				vec4 a1 = textureGrad( tAlbedo, vec3( uv, L ), dxz / s, dyz / s );
				vec4 a2 = textureGrad( tAlbedo, vec3( uv * 0.27 + 0.31, L ), dxz * 0.27 / s, dyz * 0.27 / s );
				tAlbC += mix( a1.rgb, a2.rgb, 0.35 ) * tTint[ i ] * wi;
			}
		}
		float macro = tNoise( vTWorld.xz / 53.0 ) * 0.6 + tNoise( vTWorld.xz / 11.0 ) * 0.4;
		tAlbC *= 0.8 + 0.4 * macro;
		// тень крон (Г8.3г): под лесом земля в полутени — чем больше вес подстилки и мха, тем темнее
		float canopy = ( w[ 1 ] + w[ 5 ] ) / max( ws, 1e-4 );
		tAlbC *= 1.0 - 0.25 * canopy;
		// высокогорье (Фудзи): гравий и скала выше ~2 050 м — красно-бурый шлак, как дальний рельеф (farScoria)
		float scoria = smoothstep( 2050.0, 2350.0, vTWorld.y ) * ( w[ 2 ] + w[ 3 ] ) / max( ws, 1e-4 );
		if ( scoria > 0.0 ) tAlbC = mix( tAlbC, tAlbC * vec3( 0.86, 0.56, 0.45 ), scoria );
		// аэрофото региона (2026-10-21): цвет снимка на средних масштабах, текстуры — мелкая деталь; у хаба,
		// у краёв снимка и выше ~2 400 м (там свой снег и шлак) — не действует
		if ( uPhotoOn > 0.0 ) tAlbC = photoMix( tAlbC, tPhoto, uPhotoRect, vTWorld );
		if ( uPhotoOn2 > 0.0 ) tAlbC = photoMix( tAlbC, tPhoto2, uPhotoRect2, vTWorld );
		if ( uPhotoOn3 > 0.0 ) tAlbC = photoMix( tAlbC, tPhoto3, uPhotoRect3, vTWorld );
		if ( uPhotoOn4 > 0.0 ) tAlbC = photoMix( tAlbC, tPhoto4, uPhotoRect4, vTWorld );
		// сезон: осенью трава выгорает до соломенной; зимой снег на всём пологом (на крутом — пятнами)
		if ( uAutumn > 0.0 ) tAlbC = mix( tAlbC, tAlbC * vec3( 1.45, 1.05, 0.5 ), uAutumn * w[ 0 ] / max( ws, 1e-4 ) );
		if ( uSnow > 0.0 ) {
			float sn = uSnow * smoothstep( 0.45, 0.8, gN.y ) * ( 0.7 + 0.3 * tNoise( vTWorld.xz / 3.0 ) );
			tAlbC = mix( tAlbC, vec3( 0.32, 0.33, 0.35 ), clamp( sn, 0.0, 1.0 ) );
		}
		// бетонная решётка откоса (японская «норивaку»): балки 0,3 м через 2,5 м, в ячейках — трава или торкрет. Решётка —
		// в проекциях на вертикальные плоскости zy и xy (по склону, смотрящему по x или по z; смесь по нормали с резким
		// весом): прямые балки, не веером по изгибу склона. Края балок — по ширине пикселя (вдали — ровный средний цвет).
		float lat = vSplatB.z;
		float wx = pow( abs( gN.x ), 6.0 ), wz = pow( abs( gN.z ), 6.0 );
		wx /= max( wx + wz, 1e-5 ); wz = 1.0 - wx;
		vec2 lcX = vec2( vTWorld.z / 2.5, vTWorld.y / 2.2 ), lcZ = vec2( vTWorld.x / 2.5, vTWorld.y / 2.2 );
		vec2 fwX = fwidth( lcX ), fwZ = fwidth( lcZ );
		if ( lat > 0.01 ) {
			vec2 dX = abs( fract( lcX + 0.5 ) - 0.5 ), dZ = abs( fract( lcZ + 0.5 ) - 0.5 );
			vec2 bX = 1.0 - smoothstep( vec2( 0.06 ) - fwX, vec2( 0.06 ) + fwX, dX ), bZ = 1.0 - smoothstep( vec2( 0.06 ) - fwZ, vec2( 0.06 ) + fwZ, dZ );
			float beam = max( bX.x, bX.y ) * wx + max( bZ.x, bZ.y ) * wz;
			vec2 lcell = floor( wx > 0.5 ? lcX : lcZ );
			float sprayed = step( 0.55, tHash( lcell + floor( vTWorld.xz / 40.0 ) ) );
			vec3 cellC = mix( tAlbC, vec3( 0.42, 0.42, 0.40 ) * ( 0.85 + 0.3 * tNoise( vTWorld.xz * 1.7 ) ), sprayed * 0.85 );
			vec3 beamC = vec3( 0.62, 0.61, 0.58 ) * ( 0.9 + 0.1 * tHash( lcell ) );
			tAlbC = mix( tAlbC, mix( cellC, beamC, beam ), lat );
			tRgh = mix( tRgh, 0.9, lat * beam );
		}
		#ifdef CITY_PX
		// разметка улиц города (Г5): прерывистая белая по оси, «зебра» у перекрёстков — по сетке кварталов (src/world/city.js)
		float aw = w[ 4 ] / max( ws, 1e-4 );
		vec2 cp = vTWorld.xz;
		float cr = length( cp );
		if ( aw > 0.5 && cr > CITY_PLAZA && cr < CITY_BR + 6.0 ) {
			float dx = cp.x - floor( cp.x / CITY_PX + 0.5 ) * CITY_PX, dz = cp.y - floor( cp.y / CITY_PZ + 0.5 ) * CITY_PZ;
			bool inNS = abs( dx ) < CITY_HS, inEW = abs( dz ) < CITY_HS;
			float paint = 0.0;
			if ( inNS != inEW ) {
				float across = inNS ? dx : dz, along = inNS ? cp.y : cp.x, dIn = ( inNS ? abs( dz ) : abs( dx ) ) - CITY_HS;
				float axis = ( 1.0 - smoothstep( 0.06, 0.1, abs( across ) ) ) * step( 0.5, fract( along / 8.0 ) ) * step( 7.0, dIn );
				float zebra = ( dIn > 1.0 && dIn < 4.5 && abs( across ) < CITY_HS - 0.6 ) ? step( 0.5, fract( ( across + CITY_HS ) / 0.9 ) ) : 0.0;
				paint = max( axis, zebra );
			}
			tAlbC = mix( tAlbC, vec3( 0.86, 0.86, 0.83 ), paint * aw * 0.92 );
			tRgh = mix( tRgh, 0.55, paint * aw );
		}
		#endif
	}
	diffuseColor.rgb *= tAlbC;
`,sl=`
	normal = normalize( ( viewMatrix * vec4( normalize( vTNormal ), 0.0 ) ).xyz );   // Г11: без карт нормалей — рисованная плоская земля
`,Ut={uSnow:{value:0},uAutumn:{value:0},uWet:{value:0}},hr={value:0},Ga=new Map;function Do(a,e=po()){return e==="spring"&&a.spring?a.spring:e==="autumn"?a.autumn?a.autumn:a.kind==="broad"?"kouyou":"none":e==="winter"&&a.kind==="conifer"?"frost":"none"}function zo(a,e){if(!a?.image||e==="none")return a;let t=a.uuid+e;if(Ga.has(t))return Ga.get(t);let o=a.image,i=o.width,r=o.height,s=new OffscreenCanvas(i,r),n=s.getContext("2d");n.drawImage(o,0,0);let l=n.getImageData(0,0,i,r),c=l.data,u={sakura:[[.98,.66,.78],[.96,.8,.86]],momiji:[[.82,.12,.05],[.96,.4,.07]],kouyou:[[.95,.66,.12],[.78,.4,.08]]}[e];for(let m=0;m<c.length;m+=4){if(!c[m+3])continue;let p=(.3*c[m]+.59*c[m+1]+.11*c[m+2])/255;if(e==="frost"){for(let B=0;B<3;B++)c[m+B]+=(232-c[m+B])*.38;continue}let b=(m>>2)%i,P=(m>>2)/i,S=.5+.5*Math.sin(b/i*5.1+Math.sin(P/i*4.3)*1.7),M=.6+.9*p;for(let B=0;B<3;B++)c[m+B]=Math.min(255,(u[0][B]+(u[1][B]-u[0][B])*S)*255*M)}n.putImageData(l,0,0);let f=new gt(s);return f.colorSpace=a.colorSpace,f.flipY=a.flipY,f.wrapS=a.wrapS,f.wrapT=a.wrapT,f.needsUpdate=!0,Ga.set(t,f),f}function nl(a,e=1){let t=a==="snow",o=t?7e3:9e3,i=new Float32Array(o*6),r=new Float32Array(o*2);for(let c=0;c<o;c++){let u=Math.random(),f=Math.random(),m=Math.random();i.set([u,f,m,u,f,m],c*6),r.set([0,1],c*2)}let s=new it;s.setAttribute("position",new ze(i,3)),s.setAttribute("aEnd",new ze(r,1));let n=new Pr({transparent:!0,depthWrite:!1,fog:!1,uniforms:{uTime:{value:0},uCam:{value:new ne},uBright:{value:e}},vertexShader:`attribute float aEnd; uniform float uTime; uniform vec3 uCam; varying float vA;
void main() {
	float box = ${t?"46.0":"38.0"}, sp = ${t?"1.3":"11.0"};
	vec3 w = vec3( ${t?"0.35 * sin( uTime * 0.7 + position.z * 31.0 )":"1.4"}, - sp, ${t?"0.3 * cos( uTime * 0.6 + position.x * 23.0 )":"0.5"} ) * uTime;
	vec3 p = uCam + ( fract( position + ( w - uCam ) / box ) - 0.5 ) * box;
	p += aEnd * vec3( ${t?"0.0, 0.07, 0.0":"-0.04, 0.38, -0.015"} );
	vA = 1.0 - smoothstep( 0.25, 0.5, length( p - uCam ) / box );
	gl_Position = projectionMatrix * viewMatrix * vec4( p, 1.0 );
}`,fragmentShader:`uniform float uBright; varying float vA;
void main() { gl_FragColor = vec4( vec3( ${t?"0.95":"0.72, 0.76, 0.82"} ) * uBright, vA * ${t?"0.85":"0.22"} * ( 0.35 + 0.65 * uBright ) ); }`}),l=new Or(s,n);return l.frustumCulled=!1,l.name=t?"snowfall":"rainfall",{mesh:l,update(c,u){n.uniforms.uTime.value=u,n.uniforms.uCam.value.copy(c.position)},dispose(){l.removeFromParent(),s.dispose(),n.dispose()}}}var Be={uPhotoHub:{value:12e3},uPhotoNear:{value:0},tPhoto:{value:null},uPhotoRect:{value:new Float32Array(4)},uPhotoOn:{value:0},tPhoto2:{value:null},uPhotoRect2:{value:new Float32Array(4)},uPhotoOn2:{value:0},tPhoto3:{value:null},uPhotoRect3:{value:new Float32Array(4)},uPhotoOn3:{value:0},tPhoto4:{value:null},uPhotoRect4:{value:new Float32Array(4)},uPhotoOn4:{value:0}};function cl(a,e=null){let t=new Ie({roughness:1,metalness:0,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1});return t.name="worldTerrain",e&&(t.defines={CITY_PX:(e.blockW+e.streetW).toFixed(2),CITY_PZ:(e.blockH+e.streetW).toFixed(2),CITY_HS:(e.streetW/2).toFixed(2),CITY_PLAZA:e.plaza.toFixed(2),CITY_BR:e.blockRadius.toFixed(2)}),t.onBeforeCompile=o=>{o.uniforms.uSnow=Ut.uSnow,o.uniforms.uAutumn=Ut.uAutumn,o.uniforms.tPhoto=Be.tPhoto,o.uniforms.uPhotoRect=Be.uPhotoRect,o.uniforms.uPhotoOn=Be.uPhotoOn,o.uniforms.tPhoto2=Be.tPhoto2,o.uniforms.uPhotoRect2=Be.uPhotoRect2,o.uniforms.uPhotoOn2=Be.uPhotoOn2,o.uniforms.tPhoto3=Be.tPhoto3,o.uniforms.uPhotoRect3=Be.uPhotoRect3,o.uniforms.uPhotoOn3=Be.uPhotoOn3,o.uniforms.tPhoto4=Be.tPhoto4,o.uniforms.uPhotoRect4=Be.uPhotoRect4,o.uniforms.uPhotoOn4=Be.uPhotoOn4,o.uniforms.uPhotoHub=Be.uPhotoHub,o.uniforms.uPhotoNear=Be.uPhotoNear,o.uniforms.tAlbedo={value:a.albedo},o.uniforms.tNormalRough={value:a.normalRough},o.uniforms.tScale={value:ol},o.uniforms.tTint={value:rl.map(i=>new ne(i[0],i[1],i[2]))},o.vertexShader=`attribute vec4 splatA;
attribute vec4 splatB;
varying vec3 vTWorld;
varying vec3 vTNormal;
varying vec4 vSplatA;
varying vec4 vSplatB;
`+o.vertexShader.replace("#include <fog_vertex>",`#include <fog_vertex>
	vTWorld = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;
	vTNormal = normalize( mat3( modelMatrix ) * objectNormal );
	vSplatA = splatA; vSplatB = splatB;`),Ra(o,{dark:.45}),o.fragmentShader=il+o.fragmentShader.replace("#include <map_fragment>",ll).replace("#include <roughnessmap_fragment>","float roughnessFactor = roughness * tRgh;").replace("#include <normal_fragment_maps>",sl)},t.customProgramCacheKey=()=>"worldTerrainToon",t}var _e=2048,Zt=a=>Math.round(a*_e);async function fl(a){return createImageBitmap(await(await fetch(a)).blob())}async function dl(a){let[e,t,o]=await Promise.all(["asphalt","gravel","grass"].map(w=>Promise.all(["color","normal","rough"].map(y=>fl(`${a}textures/${w}_${y}.jpg`))))),i=[0,1,2].map(()=>new OffscreenCanvas(_e,_e)),[r,s,n]=i.map(w=>w.getContext("2d"));r.fillStyle="#8a8a86",r.fillRect(0,0,_e,_e),s.fillStyle="rgb(128,128,255)",s.fillRect(0,0,_e,_e),n.fillStyle="rgb(230,230,230)",n.fillRect(0,0,_e,_e);let l=(w,y,E,R,T,I=1)=>{[r,s,n].forEach((N,C)=>{N.save(),N.beginPath(),N.rect(y,0,E-y,_e),N.clip(),N.globalAlpha=I;for(let O=0;O<_e;O+=T)for(let z=y;z<E;z+=R)N.drawImage(w[C],z,O,R,T);N.restore()})},c=(w,y,E,R,T=1)=>{r.save(),r.globalAlpha=T,r.fillStyle=E,r.fillRect(w,0,y-w,_e),r.restore(),s.save(),s.globalAlpha=T,s.fillStyle="rgb(128,128,255)",s.fillRect(w,0,y-w,_e),s.restore(),n.save(),n.globalAlpha=T,n.fillStyle=`rgb(${R},${R},${R})`,n.fillRect(w,0,y-w,_e),n.restore()},u=12345,f=()=>(u=u*16807%2147483647)/2147483647,[m,p]=st.asphalt.map(Zt);l(e,m,p,(p-m)/2,_e/3),l(e,m,p,_e/2,_e/2,.45),r.fillStyle="rgba(142,145,150,0.5)",r.fillRect(m,0,p-m,_e),s.fillStyle="rgba(128,128,255,0.6)",s.fillRect(m,0,p-m,_e),n.fillStyle="rgba(235,235,235,0.8)",n.fillRect(m,0,p-m,_e);for(let w=0;w<40;w++){let y=m+f()*(p-m),E=f()*_e,R=120+f()*180,T=r.createRadialGradient(y,E,0,y,E,R),I=f()<.5,N=.05+f()*.05;T.addColorStop(0,I?`rgba(40,42,46,${N})`:`rgba(230,232,236,${N})`),T.addColorStop(1,"rgba(0,0,0,0)"),r.fillStyle=T,r.fillRect(y-R,E-R,2*R,2*R)}for(let w of[.17,.33,.67,.83]){let y=m+(p-m)*w,E=(p-m)*.07,R=r.createLinearGradient(y-E,0,y+E,0);R.addColorStop(0,"rgba(255,255,255,0)"),R.addColorStop(.5,"rgba(60,60,64,0.08)"),R.addColorStop(1,"rgba(255,255,255,0)"),r.fillStyle=R,r.fillRect(y-E,0,2*E,_e)}for(let[w,y]of[[m,m+(p-m)*.14],[p,p-(p-m)*.14]]){let E=r.createLinearGradient(w,0,y,0);E.addColorStop(0,"rgba(118,108,92,0.18)"),E.addColorStop(1,"rgba(118,108,92,0)"),r.fillStyle=E,r.fillRect(Math.min(w,y),0,Math.abs(y-w),_e);let R=n.createLinearGradient(w,0,y,0);R.addColorStop(0,"rgba(245,245,245,0.6)"),R.addColorStop(1,"rgba(245,245,245,0)"),n.fillStyle=R,n.fillRect(Math.min(w,y),0,Math.abs(y-w),_e)}r.lineCap="round",n.lineCap="round";for(let w=0;w<0;w++){let y=m+30+f()*(p-m-60),E=f()*_e,R=4+Math.floor(f()*7),T=2.5+f()*3;r.strokeStyle="rgba(22,22,24,0.6)",r.lineWidth=T,n.strokeStyle="rgba(70,70,70,0.9)",n.lineWidth=T+1,r.beginPath(),r.moveTo(y,E),n.beginPath(),n.moveTo(y,E);for(let I=0;I<R;I++)y+=(f()-.5)*70,E+=(f()-.3)*60,y=Math.max(m+20,Math.min(p-20,y)),r.lineTo(y,E),n.lineTo(y,E);r.stroke(),n.stroke()}for(let w=0;w<26;w++){let y=m+40+f()*(p-m-80),E=f()*_e,R=30+f()*120,T=r.createRadialGradient(y,E,0,y,E,R),I=f()<.5?"rgba(20,20,22,0.18)":"rgba(60,58,55,0.12)";T.addColorStop(0,I),T.addColorStop(1,"rgba(0,0,0,0)"),r.fillStyle=T,r.fillRect(y-R,E-R,2*R,2*R)}let b=(w,y,E)=>{r.fillStyle=E,r.fillRect(w,0,y,_e),s.fillStyle="rgba(128,128,255,0.7)",s.fillRect(w,0,y,_e),n.fillStyle="rgba(120,120,120,0.85)",n.fillRect(w,0,y,_e);for(let R=0;R<60;R++)r.fillStyle=`rgba(110,112,116,${.08+f()*.14})`,r.fillRect(w+f()*y,f()*_e,2+f()*4,2+f()*8)};b(m+8+11,17,"#ececea"),b(p-8-28,17,"#ececea"),b((m+p)/2-9,17,"#e3c440");let[P,S]=st.curb.map(Zt);c(P,S,"#efefea",150);for(let w=0;w<10;w++)r.fillStyle=w%2?"#e4e4df":"#a8453a",r.fillRect(P,w*_e/10,S-P,_e/10);let M=(w,y,E,R)=>{let[T,I]=st[w].map(Zt);l(y,T,I,_e/4,_e/4),E&&(r.fillStyle=E,r.globalAlpha=R,r.fillRect(T,0,I-T,_e),r.globalAlpha=1)};M("gravel",t,"#5f5d58",.72),M("dirt",t,"#5a4a3a",.4),M("sand",t,"#cfc3a6",.4),M("grass",o);let[B,D]=st.concrete.map(Zt);c(B,D,"#a3a29c",215);for(let w=0;w<9e3;w++){let y=110+f()*90;r.fillStyle=`rgba(${y},${y},${y-4},0.25)`,r.fillRect(B+f()*(D-B),f()*_e,2,2)}for(let w=0;w<40;w++)r.fillStyle="rgba(60,62,55,0.10)",r.fillRect(B+f()*(D-B),f()*_e,3+f()*10,40+f()*200);let[L,A]=st.rail.map(Zt),[_,v]=st.post.map(Zt);c(L,A,"#d4d4cf",90),c(_,v,"#8e8f8e",160),c(L,A,"#dcdcd7",150);for(let w=0;w<700;w++)r.fillStyle="rgba(105,100,88,0.13)",r.fillRect(L+f()*(A-L),f()*_e,2,20+f()*140);let h=(w,y)=>{let E=new gt(w);return E.colorSpace=y?mt:"",E.wrapS=Ur,E.wrapT=xt,E.anisotropy=8,E};for(let w of[e,t,o])for(let y of w)y.close();let d=new Ie({map:h(i[0],!0),normalMap:h(i[1],!1),roughnessMap:h(i[2],!1),roughness:1,metalness:0});d.name="worldRoad";let[g,x]=st.concrete;return d.onBeforeCompile=w=>{w.uniforms.uWet=Ut.uWet,w.uniforms.uSnowR=Ut.uSnow,w.uniforms.uRdLamp=hr,w.vertexShader=`varying vec3 vRWorld;
varying vec3 vRNormal;
varying float vRdLanes;
`+w.vertexShader.replace("#include <uv_vertex>",`#include <uv_vertex>
	// скоростная дорога: число полос — в развёртке v (+4096 на полосу, chunks.js hwLanes)
	vRdLanes = 0.0;
	#ifdef USE_MAP
	if ( vMapUv.y >= 4096.0 ) { vRdLanes = floor( vMapUv.y / 4096.0 ); vMapUv.y -= vRdLanes * 4096.0; }
	// площадка узла дорог (main.js kf, v = PAD_V): флаг −1, асфальт кладётся по мировым x/z
	else if ( vMapUv.y <= - 16384.0 ) { vRdLanes = - 1.0; vMapUv.y = 0.0; }
	#endif
	#ifdef USE_NORMALMAP
	vNormalMapUv.y -= floor( vNormalMapUv.y / 4096.0 ) * 4096.0;
	#endif
	#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv.y -= floor( vRoughnessMapUv.y / 4096.0 ) * 4096.0;
	#endif`).replace("#include <fog_vertex>",`#include <fog_vertex>
	vRWorld = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;
	vRNormal = normalize( mat3( modelMatrix ) * objectNormal );`),w.fragmentShader=`varying vec3 vRWorld;
varying vec3 vRNormal;
varying float vRdLanes;
uniform float uRdLamp;
uniform float uWet;
uniform float uSnowR;
float rHash( vec2 p ) { return fract( sin( dot( p, vec2( 127.1, 311.7 ) ) ) * 43758.5453 ); }
float rNoise( vec2 p ) {
	vec2 i = floor( p ), f = fract( p ), u = f * f * ( 3.0 - 2.0 * f );
	return mix( mix( rHash( i ), rHash( i + vec2( 1.0, 0.0 ) ), u.x ), mix( rHash( i + vec2( 0.0, 1.0 ) ), rHash( i + vec2( 1.0, 1.0 ) ), u.x ), u.y );
}
`+w.fragmentShader.replace("#include <opaque_fragment>",`outgoingLight += diffuseColor.rgb * vec3( ${St.color.join(", ")} ) * rdLamp * uRdLamp;
#include <opaque_fragment>`).replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
	roughnessFactor *= ( 1.0 - rdPolish ) * ( 1.0 - 0.85 * rdWet );`).replace("#include <fog_fragment>",`#include <fog_fragment>
	#ifdef USE_FOG
	if ( rdWet > 0.0 ) {
		float fr = pow( 1.0 - clamp( dot( normal, normalize( vViewPosition ) ), 0.0, 1.0 ), 4.0 );
		gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor * vec3( 0.88, 0.94, 1.02 ), rdWet * clamp( 0.03 + 0.75 * fr, 0.0, 0.6 ) );
	}
	#endif`).replace("#include <map_fragment>",`#include <map_fragment>
	float rdWet = 0.0;      // мокрая дорога (погода): темнее, глаже, отражает небо
	float rdLamp = 0.0;     // пятна света фонарей Сюто (скоростные ночью)
	float rdPolish = 0.0;   // износ дороги (2026-10-21): накатанные колеи глаже — см. roughnessmap ниже
	// Износ асфальта в метрах дороги: s — вдоль (развёртка v = s / 10, chunks.js E), lat — поперёк (−0,5…0,5 ширины).
	// Заплатки, колеи, следы шин, стёртая разметка, грязь у края; рисунок свой у каждого участка (сид — плитка 500 м).
	// площадка узла (2026-10-23; был светлый круг в полоску — развёртка поперёк постоянна): зерно атласа по мировым
	// x/z (по x — зеркально в чистой полосе между осью и краем, без шва), пятна и масло тоже по миру; колей и разметки нет
	#ifdef USE_MAP
	if ( vRdLanes < - 0.5 ) {
		vec2 w = vRWorld.xz, seed = floor( w / 500.0 ), wr = mat2( 0.866, 0.5, - 0.5, 0.866 ) * w;
		float tx = abs( fract( wr.x / 4.8 ) * 2.0 - 1.0 );
		diffuseColor.rgb = diffuse * texture2D( map, vec2( ${(st.asphalt[0]+.004+(st.asphalt[1]-st.asphalt[0]-.008)*.58).toFixed(4)} + tx * ${((st.asphalt[1]-st.asphalt[0]-.008)*.32).toFixed(4)}, wr.y / 10.0 ) ).rgb;
		diffuseColor.rgb *= 0.9 + 0.08 * rNoise( wr / 9.0 + seed ) + 0.04 * rNoise( wr / 2.3 );
		diffuseColor.rgb *= 1.0 - 0.18 * smoothstep( 0.7, 0.9, rNoise( wr / 3.1 + seed * 1.9 ) );
		rdPolish = 0.1;
		if ( uWet > 0.0 ) {
			rdWet = uWet * ( 0.55 + 0.45 * smoothstep( 0.55, 0.75, rNoise( w / 3.5 + seed * 2.3 ) ) );
			diffuseColor.rgb *= 1.0 - 0.45 * rdWet;
		}
		if ( uSnowR > 0.0 ) diffuseColor.rgb = mix( diffuseColor.rgb, vec3( 0.55, 0.57, 0.6 ), uSnowR * 0.35 * rNoise( w / 2.0 ) );
	} else
	#endif
	if ( vMapUv.x < ${(st.asphalt[1]-.001).toFixed(4)} ) {
		float s = vMapUv.y * 10.0, lat = ( vMapUv.x - ${st.asphalt[0].toFixed(4)} - 0.004 ) / ${(st.asphalt[1]-st.asphalt[0]-.008).toFixed(4)} - 0.5;
		vec2 seed = floor( vRWorld.xz / 500.0 );
		float lm = lat * 7.6;                                            // ≈ метры от оси
		// колеи: по два следа колёс в каждой полосе — темнее и глаже
		float wp = min( min( abs( lm - 1.1 ), abs( lm - 2.6 ) ), min( abs( lm + 1.1 ), abs( lm + 2.6 ) ) );
		float rut = 1.0 - smoothstep( 0.15, 0.55, wp );
		diffuseColor.rgb *= 1.0 - 0.16 * rut * ( 0.7 + 0.3 * rNoise( vec2( s / 8.0, lm ) + seed ) );
		rdPolish = 0.35 * rut;
		// заплатки: каждые 9 м с вероятностью ~20 % — прямоугольник на полполосы или полосу, свежие темнее, старые светлее
		{
			float c = floor( s / 9.0 ), h = rHash( vec2( c, 3.1 ) + seed );
			if ( h < 0.2 ) {
				float h2 = rHash( vec2( c, 7.7 ) + seed ), h3 = rHash( vec2( c, 11.3 ) + seed );
				float s0 = c * 9.0 + h2 * 3.0, s1 = s0 + 2.0 + h3 * 5.0;
				float a0 = h2 < 0.5 ? ( h3 < 0.5 ? 0.0 : - 3.8 ) : ( h3 < 0.5 ? - 1.9 : 0.4 ), a1 = a0 + ( h2 < 0.5 ? 3.8 : 1.5 + 2.0 * h3 );
				float inP = step( s0, s ) * step( s, s1 ) * step( a0, lm ) * step( lm, a1 );
				float edge = min( min( s - s0, s1 - s ), min( lm - a0, a1 - lm ) );
				vec3 pc = h3 < 0.55 ? vec3( 0.075, 0.075, 0.08 ) : vec3( 0.2, 0.2, 0.2 );
				diffuseColor.rgb = mix( diffuseColor.rgb, mix( pc * ( 0.9 + 0.2 * rNoise( vec2( s, lm ) * 1.7 ) ), vec3( 0.03 ), 1.0 - smoothstep( 0.0, 0.07, edge ) ), inP * 0.85 );
			}
		}
		// следы шин: пары тёмных дуг (заносы, торможения) группами через ~40 м, 15–35 м длиной
		{
			float c = floor( s / 40.0 ), h = rHash( vec2( c, 5.3 ) + seed );
			if ( h < 0.45 ) {
				float h2 = rHash( vec2( c, 9.1 ) + seed ), len = 15.0 + 20.0 * h2, t = ( s - c * 40.0 - 4.0 ) / len;
				if ( t > 0.0 && t < 1.0 ) {
					float side = h < 0.22 ? 1.0 : - 1.0, off = side * ( 1.0 + 1.6 * h2 ) + side * 1.4 * sin( t * 3.14159 ) * ( h2 - 0.4 );
					float m = 0.0;
					for ( int k = 0; k < 2; k ++ ) {
						float d = abs( lm - off - float( k ) * 1.45 * side );
						m = max( m, 1.0 - smoothstep( 0.08, 0.2, d ) );
					}
					float fade = smoothstep( 0.0, 0.15, t ) * smoothstep( 1.0, 0.7, t ) * ( 0.6 + 0.4 * rNoise( vec2( s * 0.8, c ) ) );
					diffuseColor.rgb *= 1.0 - 0.7 * m * fade;
				}
			}
		}
		// разметка стирается пятнами (ось и края)
		{
			float onLine = 1.0 - smoothstep( 0.0, 0.012, abs( lat ) ) + ( 1.0 - smoothstep( 0.0, 0.012, abs( abs( lat ) - 0.481 ) ) );
			// пятна износа и рваные края: краска осыпается кусками, под ней асфальт
			float wear = smoothstep( 0.45, 0.7, rNoise( vec2( s / 4.0, lat * 9.0 ) + seed * 3.7 ) + 0.35 * ( rNoise( vec2( s * 2.3, lat * 90.0 ) ) - 0.5 ) );
			diffuseColor.rgb = mix( diffuseColor.rgb, vec3( 0.075, 0.075, 0.08 ), clamp( onLine, 0.0, 1.0 ) * wear * 0.92 );
		}
		// скоростная (Сюто): на оси нет жёлтой линии (асфальт рядом), между полосами — белые прерывистые 8 м через 12 м;
		// двусторонняя (шоссе Канто, код 4 + полос в одну сторону, chunks.js hwCode) — жёлтая ось атласа остаётся
		#ifdef USE_MAP
		if ( vRdLanes > 0.5 ) {
			bool two = vRdLanes > 3.5;
			float nl = two ? 2.0 * ( vRdLanes - 4.0 ) : vRdLanes;
			// стирание шире вдали: мип-уровни размывают жёлтую линию атласа на несколько текселей
			float fw = 3.0 * fwidth( lat ), cm = two ? 0.0 : 1.0 - smoothstep( 0.009 + fw, 0.017 + 2.0 * fw, abs( lat ) );
			diffuseColor.rgb = mix( diffuseColor.rgb, diffuse * texture2D( map, vec2( vMapUv.x + 0.04, vMapUv.y ) ).rgb, cm );
			float ln = 0.0;
			for ( int k = 1; k < 6; k ++ ) {
				if ( float( k ) >= nl ) break;
				if ( two && 2 * k == int( nl + 0.5 ) ) continue;
				ln = max( ln, 1.0 - smoothstep( 0.005, 0.009, abs( lat + 0.481 - 0.962 * float( k ) / nl ) ) );
			}
			float dash = step( mod( s, 20.0 ), 8.0 ), wr = smoothstep( 0.5, 0.75, rNoise( vec2( s / 4.0, lat * 9.0 ) + seed * 5.1 ) );
			diffuseColor.rgb = mix( diffuseColor.rgb, vec3( 0.8, 0.8, 0.78 ), ln * dash * ( 1.0 - 0.6 * wr ) );
			// фонари (hwLights.js HW_LAMP): слева через ${St.step} м с ${St.first} м, на широких — и справа вразбежку;
			// пятно ~10 м вдоль, у своего края ярче
			if ( uRdLamp > 0.0 ) {
				float dl = mod( s - ${St.first.toFixed(1)}, ${St.step.toFixed(1)} );
				dl = min( dl, ${St.step.toFixed(1)} - dl );
				rdLamp = exp( - dl * dl / 70.0 ) * ( 0.5 + 0.5 * smoothstep( 0.45, - 0.45, lat ) );
				if ( vRdLanes > 2.5 ) {
					float dr = mod( s - ${(St.first+St.step/2).toFixed(1)}, ${St.step.toFixed(1)} );
					dr = min( dr, ${St.step.toFixed(1)} - dr );
					rdLamp = max( rdLamp, exp( - dr * dr / 70.0 ) * ( 0.5 + 0.5 * smoothstep( - 0.45, 0.45, lat ) ) );
				}
				rdLamp = 0.12 + 0.88 * rdLamp;
			}
		}
		#endif
		// мокрый асфальт: темнее и глаже, лужи в колеях и пятнами
		if ( uWet > 0.0 ) {
			float pud = smoothstep( 0.55, 0.75, rNoise( vec2( s / 3.5, lm * 0.8 ) + seed * 2.3 ) ) * ( 0.4 + 0.6 * rut );
			rdWet = uWet * ( 0.55 + 0.45 * pud );
			diffuseColor.rgb *= 1.0 - 0.45 * rdWet;
		}
		// зимой — слежавшийся снег и каша у краёв
		if ( uSnowR > 0.0 ) diffuseColor.rgb = mix( diffuseColor.rgb, vec3( 0.55, 0.57, 0.6 ), uSnowR * smoothstep( 0.36, 0.48, abs( lat ) ) * ( 0.55 + 0.45 * rNoise( vec2( s / 2.0, lat * 20.0 ) ) ) );
		// грязь, песок и листья у края, тёмные пятна масла по полосам
		{
			float ed = smoothstep( 0.38, 0.5, abs( lat ) ) * ( 0.5 + 0.5 * rNoise( vec2( s / 3.0, lat * 6.0 ) + seed ) );
			diffuseColor.rgb = mix( diffuseColor.rgb, vec3( 0.16, 0.14, 0.11 ), ed * 0.55 );
			float oil = smoothstep( 0.72, 0.9, rNoise( vec2( s / 2.5, lm * 0.9 ) + seed * 1.9 ) ) * ( 1.0 - smoothstep( 0.6, 1.6, abs( abs( lm ) - 1.85 ) ) );
			diffuseColor.rgb *= 1.0 - 0.25 * oil;
		}
	}
	{
		vec3 kn = normalize( vRNormal );
		if ( vMapUv.x > ${g.toFixed(4)} && vMapUv.x < ${x.toFixed(4)} && abs( kn.y ) < 0.35 ) {
			vec2 hz = normalize( vec2( - kn.z, kn.x ) + 1e-5 );
			float s = dot( vRWorld.xz, hz ), y = vRWorld.y;
			vec2 q = vec2( s + y, s - y ) * 0.70711 / 0.42, cell = floor( q ), f = fract( q );
			float g = min( min( f.x, 1.0 - f.x ), min( f.y, 1.0 - f.y ) ), grout = 1.0 - smoothstep( 0.025, 0.06, g );
			float shade = 0.82 + 0.26 * fract( sin( dot( cell, vec2( 12.9898, 78.233 ) ) ) * 43758.5453 );
			float stain = smoothstep( 0.0, 1.0, fract( sin( dot( floor( vec2( s / 3.0, 0.0 ) ), vec2( 7.13, 1.7 ) ) ) * 9182.31 ) ) * 0.12;
			vec3 block = vec3( 0.56, 0.555, 0.53 ) * ( shade - stain ) * ( 0.94 + 0.06 * smoothstep( 0.06, 0.25, g ) );
			diffuseColor.rgb = mix( block, vec3( 0.25, 0.25, 0.24 ), grout );
		}
	}`)},d.customProgramCacheKey=()=>"worldRoadHw",d}function ul(a,{lights:e=0,lampGain:t=1}={}){let o=new ct;o.name="landmarks";let i=new Ie({color:9082790,roughness:.4,metalness:.15}),r=new It({color:new Ee(1,.08,.05).multiplyScalar(e>0?6*t:1),toneMapped:e>0}),s=[];for(let n of ei(a)){let l=[],c=[];for(let p=0;p<n.boxes.length;p+=8){let b=new ea(n.boxes[p+3],n.boxes[p+4],n.boxes[p+5]).toNonIndexed();b.rotateY(n.boxes[p+6]),b.translate(n.boxes[p],n.boxes[p+1],n.boxes[p+2]);let P=b.getAttribute("position");for(let S=0;S<P.count;S++)c.push(l.length/3),l.push(P.getX(S),P.getY(S),P.getZ(S));b.dispose()}let u=new it;u.setAttribute("position",new ze(l,3)),u.setIndex(c),u.computeVertexNormals(),u.computeBoundingSphere();let f=new ot(u,i);f.castShadow=!1,f.receiveShadow=!1,o.add(f);let m=new ot(new ar(1.6,8,6),r);m.position.set(n.top[0],n.top[1]+1.6,n.top[2]),o.add(m),s.push({mesh:f,tile:ti(n.x,n.z)})}return{group:o,setDetailed(n){for(let l of s)l.mesh.visible=!n(l.tile)},dispose(){for(let n of o.children)n.geometry.dispose();i.dispose(),r.dispose()}}}var Ro=(()=>{try{let a=new URLSearchParams(location.search).get("trees");return a&&/^[a-z0-9]+$/.test(a)?`v-${a}/`:""}catch{return""}})(),hl={value:(()=>{try{let a=parseFloat(new URLSearchParams(location.search).get("leafsat"));return a>=0&&a<=1.5?a:.6}catch{return .6}})()},ca=6,pl=16,At=160,jt={sugi:[0,.5,.5,1],broad:[.5,.5,1,1],sasa:[0,0,.5,.5],sugi2:[.5,0,1,.5]},Wa=[{id:"sugi",kind:"conifer",w:3,hk:1},{id:"sugi2",kind:"conifer",w:2,hk:.92},{id:"sugi3",kind:"conifer",w:2,hk:.68},{id:"hinoki",kind:"conifer",w:2,hk:.8},{id:"akamatsu",kind:"conifer",w:1,hk:.78},{id:"maple",kind:"broad",w:2,hk:.85,autumn:"momiji"},{id:"maple2",kind:"broad",w:1,hk:.62,autumn:"momiji"},{id:"oak",kind:"broad",w:2,hk:1},{id:"konara",kind:"broad",w:2,hk:.95},{id:"keyaki",kind:"broad",w:1,hk:1.2},{id:"sakura",kind:"broad",w:2,hk:.7,spring:"sakura"}],$e={step:15,nearBand:150,stepMixed:9,stepCedar:6,cedarJitter:.15,mixedJitter:.7,sugiH:[22,34],broadH:[12,20],sasaStep:6,sasaBand:[2,35],sasaFar:20,tint:{sugi:[[.4,.5],[.46,.56],[.38,.48]],sugi2:[[.44,.54],[.5,.6],[.4,.5]],broad:[[.5,.62],[.52,.62],[.38,.48]],sasa:[[.26,.33],[.5,.58],[.2,.27]],take:[[.3,.37],[.44,.52],[.22,.28]]},minNy:.55},De=(a,e,t)=>{let o=a*374761393+e*668265263+t*2147483647|0;return o=Math.imul(o^o>>>13,1274126177),((o^o>>>16)>>>0)/4294967296};function oa(){let a=[],e=[],t=[],o=[],i=[],r=[];return{P:a,N:e,U:t,I:o,C:i,groups:r,quad(s,n,l,c,u,f,m=1){let p=a.length/3;for(let[b,P]of[[s,[u[0],u[1]]],[n,[u[2],u[1]]],[l,[u[2],u[3]]],[c,[u[0],u[3]]]]){a.push(b.x,b.y,b.z),t.push(P[0],P[1]);let S=typeof f=="function"?f(b):f;e.push(S.x,S.y,S.z);let M=typeof m=="function"?m(b):m;i.push(M,M,M)}o.push(p,p+1,p+2,p,p+2,p+3)},group(s,n){r.push([s,o.length-s,n])},geometry(){let s=new it;s.setAttribute("position",new ze(a,3)),s.setAttribute("normal",new ze(e,3)),s.setAttribute("uv",new ze(t,2)),s.setAttribute("color",new ze(i,3)),s.setIndex(o);for(let[n,l,c]of r)s.addGroup(n,l,c);return s.computeBoundingSphere(),s}}}var xe=(a,e,t)=>new ne(a,e,t);function Pa(a,e,t,o,i,r,s,n=0,l=0,c=0,u=0){for(let f=0;f<r;f++){let m=f/r*Math.PI*2,p=(f+1)/r*Math.PI*2,b=(M,B,D,L)=>xe(n+c*L+Math.cos(M)*B,D,l+u*L+Math.sin(M)*B),P=M=>xe(Math.cos(M),.2,Math.sin(M)).normalize(),S=a.P.length/3;for(let[M,B,D,L,A,_]of[[m,o,e,0,f/r,0],[p,o,e,0,(f+1)/r,0],[p,i,t,1,(f+1)/r,s],[m,i,t,1,f/r,s]]){let v=b(M,B,D,L),h=P(M);a.P.push(v.x,v.y,v.z),a.N.push(h.x,h.y,h.z),a.U.push(A*2,_),a.C.push(1,1,1)}a.I.push(S,S+2,S+1,S,S+3,S+2)}}function Fo(a){let e=oa(),t=a?jt.sugi2:jt.sugi;Pa(e,0,.97,.016,.003,6,9),e.group(0,0);let o=e.I.length;for(let i=0;i<12;i++){let r=(i+.5)/12,s=.4+.6*r,n=.09*(1-r)**.75+.014;for(let l=0;l<4;l++){let c=l/4*Math.PI*2+i*2.39996+(De(i,l,41)-.5)*.8,u=Math.cos(c),f=Math.sin(c),m=.85+.3*De(i,l,43),p=n*.05,b=n*1.05*m,P=b-p,S=-P*.18,M=xe(u*p,s-P*.2,f*p),B=xe(u*b,s-P*.2+S,f*b),D=xe(-f,0,u).multiplyScalar(P*.55),L=xe(0,P*.55,0),A=D.clone().multiplyScalar(.707).addScaledVector(L,.707),_=D.clone().multiplyScalar(.707).addScaledVector(L,-.707),v=g=>xe(g.x,(g.y-s)*.6+n*.6,g.z).normalize(),h=g=>(.35+.65*Math.min(1,Math.hypot(g.x,g.z)/Math.max(.001,b)))*(.75+.25*r),d=B.clone().sub(M).multiplyScalar(.12);e.quad(M.clone().sub(D),M.clone().add(D),B.clone().add(D),B.clone().sub(D),t,v,h),e.quad(M.clone().add(d).sub(A),M.clone().add(d).add(A),B.clone().add(A),B.clone().sub(A),t,v,h),e.quad(M.clone().sub(d).sub(_),M.clone().sub(d).add(_),B.clone().add(_),B.clone().sub(_),t,v,h)}}for(let i of[0,Math.PI/2]){let r=xe(Math.cos(i),0,Math.sin(i)).multiplyScalar(.022);e.quad(xe(-r.x,.92,-r.z),xe(r.x,.92,r.z),xe(r.x,1.03,r.z),xe(-r.x,1.03,-r.z),t,xe(0,1,0))}return e.group(o,1),e.geometry()}function ml(){let a=oa();Pa(a,0,.55,.022,.012,6,4);for(let t=0;t<3;t++){let o=t*2.094+.4;Pa(a,.45,.72,.011,.004,4,2,0,0,Math.cos(o)*.16,Math.sin(o)*.16)}a.group(0,0);let e=a.I.length;for(let[t,o,i,r,s]of[[0,.7,0,.26,.22],[.14,.6,.08,.2,.17],[-.12,.62,-.1,.19,.16]])for(let n=0;n<34;n++){let l=xe(t,o,i),c=xe(r,s,r),u=1-2*(n+.5)/34,f=Math.sqrt(1-u*u),m=n*2.39996+t*7,p=xe(Math.cos(m)*f,u,Math.sin(m)*f),b=xe(l.x+p.x*c.x*.85,l.y+p.y*c.y*.85,l.z+p.z*c.z*.85),P=new ne().crossVectors(p,Math.abs(p.y)>.9?xe(1,0,0):xe(0,1,0)).normalize(),S=new ne().crossVectors(p,P).normalize(),M=De(n,3,7)*Math.PI,B=.13,D=P.clone().multiplyScalar(Math.cos(M)).addScaledVector(S,Math.sin(M)).multiplyScalar(B),L=S.clone().multiplyScalar(Math.cos(M)).addScaledVector(P,-Math.sin(M)).multiplyScalar(B);a.quad(b.clone().sub(D).sub(L),b.clone().add(D).sub(L),b.clone().add(D).add(L),b.clone().sub(D).add(L),jt.broad,A=>A.clone().sub(l).normalize(),.4+.6*(b.y-.4)/.55)}return a.group(e,1),a.geometry()}function vl(){let a=oa(),e=[];for(let o=0;o<7;o++){let i=o*2.39996,r=o?.012+.03*De(o,5,71):0,s=Math.cos(i)*r,n=Math.sin(i)*r,l=(De(o,6,72)-.5)*.12,c=(De(o,7,73)-.5)*.12,u=.82+.18*De(o,8,74);Pa(a,0,u,.0055,.0035,5,1,s,n,l,c),e.push([s,n,l,c,u])}a.group(0,0);let t=a.I.length;for(let[o,i,r,s,n]of e)for(let l=0;l<10;l++){let c=(.4+.6*(l+.5)/10)*n,u=l*2.39996+o*40,f=Math.cos(u),m=Math.sin(u),p=xe(o+r*(c/n),c,i+s*(c/n)),b=.09+.06*De(l,9,75),P=xe(p.x+f*b*1.1,c-b*.35,p.z+m*b*1.1),S=xe(-m,0,f).multiplyScalar(b*.55);a.quad(p.clone().sub(S),p.clone().add(S),P.clone().add(S),P.clone().sub(S),jt.sasa,M=>xe(f,.6,m).normalize(),.55+.45*(c/n)),a.quad(p.clone().add(xe(0,b*.4,0)),p.clone().sub(xe(0,b*.4,0)),P.clone().sub(xe(0,b*.4,0)),P.clone().add(xe(0,b*.4,0)),jt.sasa,M=>xe(f,.6,m).normalize(),.55+.45*(c/n))}return a.group(t,1),a.geometry()}function gl(){let a=oa(),e=xe(0,.55,0);for(let t=0;t<3;t++){let o=t/3*Math.PI,i=xe(Math.cos(o)*1.25,0,Math.sin(o)*1.25);a.quad(xe(-i.x,-.05,-i.z),xe(i.x,-.05,i.z),xe(i.x,.95,i.z),xe(-i.x,.95,-i.z),jt.sasa,r=>xe(r.x,(r.y-e.y)*.7+.5,r.z).normalize(),r=>.4+.6*Math.max(0,r.y)/.95)}return a.group(0,1),a.geometry()}function xl(){let a=oa();for(let e=0;e<5;e++){let t=e/5*Math.PI*2+.3,o=Math.cos(t),i=Math.sin(t),r=xe(-i,0,o).multiplyScalar(.42),s=xe(o*.05,.05,i*.05),n=xe(o*.95,.55,i*.95);a.quad(s.clone().sub(r),s.clone().add(r),n.clone().add(r),n.clone().sub(r),jt.sasa,l=>xe(l.x,.8,l.z).normalize(),l=>.4+.6*Math.hypot(l.x,l.z))}return a.group(0,1),a.geometry()}function wl(a,e=!0){let t=oa();for(let o of e?[0]:[0,Math.PI/2]){let i=xe(Math.cos(o)*a/2,0,Math.sin(o)*a/2);t.quad(xe(-i.x,0,-i.z),xe(i.x,0,i.z),xe(i.x,1,i.z),xe(-i.x,1,-i.z),[0,0,1,1],r=>xe(r.x*1.5,.6,r.z*1.5).normalize())}return t.group(0,0),t.geometry()}var ya={swayAmp:.007,swaySpeed:1.1,flutterAmp:.0025,flutterSpeed:3.5};function Va(a,e={value:0},t=1,o={}){let i=o.wind!==!1,r=!!o.crownNormals,s=!!o.billboard,n=o.atlas||null,l=!!o.cards,c={value:new ne(+(t*.6).toFixed(3)-(t*.25).toFixed(3),+(1/t).toFixed(5),+(i?t:0).toFixed(3))};return a.onBeforeCompile=u=>{u.uniforms.uTime=e,u.uniforms.uLeaf=c,u.uniforms.uLeafSat=hl,Ra(u,{dark:.55}),r&&(u.vertexShader=u.vertexShader.replace("#include <beginnormal_vertex>",`#include <beginnormal_vertex>
	objectNormal = normalize( position - vec3( 0.0, uLeaf.x, 0.0 ) );`)),u.vertexShader=`uniform float uTime;
uniform vec3 uLeaf;
`+(l?`attribute vec3 _card;
`:"")+u.vertexShader.replace("#include <begin_vertex>","#include <begin_vertex>"+(l?`
	{
		float cw = length( position - _card ) * 1.41421;
		vec2 cu = ( uv - vec2( 0.5 ) ) * cw;
		float ca = ( fract( sin( dot( _card, vec3( 12.9898, 78.233, 37.719 ) ) ) * 43758.5453 ) - 0.5 ) * 1.2;
		cu = mat2( cos( ca ), sin( ca ), - sin( ca ), cos( ca ) ) * cu;
		#ifdef USE_INSTANCING
		mat3 cW = mat3( modelMatrix ) * mat3( instanceMatrix );
		#else
		mat3 cW = mat3( modelMatrix );
		#endif
		vec3 cR = vec3( viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0] ), cU = vec3( viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1] );
		transformed = _card + inverse( cW ) * ( ( cR * cu.x + cU * cu.y ) * length( cW[1] ) );
	}`:"")+`
	{
		#ifdef USE_INSTANCING
		vec3 iw = ( modelMatrix * instanceMatrix * vec4( 0.0, 0.0, 0.0, 1.0 ) ).xyz;
		#else
		vec3 iw = vec3( 0.0 );
		#endif
		float ph = uTime * ${ya.swaySpeed.toFixed(2)} + iw.x * 0.13 + iw.z * 0.09;
		float hgt = clamp( position.y * uLeaf.y, 0.0, 1.0 );
		vec2 sway = vec2( sin( ph ), sin( ph * 0.8 + 1.3 ) ) * ${ya.swayAmp.toFixed(4)} * hgt * hgt;
		float fl = sin( uTime * ${ya.flutterSpeed.toFixed(2)} + position.x * 37.0 + position.z * 29.0 + position.y * 11.0 ) * ${ya.flutterAmp.toFixed(4)} * hgt;
		transformed.xz += ( sway + fl ) * ${i?"uLeaf.z":"0.0"};
	}`),s&&(u.vertexShader=(n?`attribute float aSlot;
`:"")+u.vertexShader.replace("#include <uv_vertex>",`#include <uv_vertex>
	#ifdef USE_INSTANCING
	vec3 bbO = ( modelMatrix * instanceMatrix * vec4( 0.0, 0.0, 0.0, 1.0 ) ).xyz;
	vec3 bbC = normalize( instanceMatrix[0].xyz );
	#else
	vec3 bbO = ( modelMatrix * vec4( 0.0, 0.0, 0.0, 1.0 ) ).xyz;
	vec3 bbC = vec3( 1.0, 0.0, 0.0 );
	#endif
	vec2 bbW = normalize( cameraPosition.xz - bbO.xz + vec2( 1e-5, 0.0 ) );
	vec2 bbD = vec2( bbW.x * bbC.x + bbW.y * bbC.z, bbW.y * bbC.x - bbW.x * bbC.z ), bbR = vec2( bbD.y, - bbD.x );`+(n?`
	#ifdef USE_MAP
	{
		float bbK = mod( floor( atan( bbD.y, bbD.x ) / ${(2*Math.PI/n.v).toFixed(6)} + 0.5 ), ${n.v.toFixed(1)} ),
			cell = aSlot * ${n.v.toFixed(1)} + bbK;
		vMapUv = vec2( ( mod( cell, ${n.cols.toFixed(1)} ) + clamp( vMapUv.x, 0.004, 0.996 ) ) / ${n.cols.toFixed(1)},
			( floor( cell / ${n.cols.toFixed(1)} ) + clamp( vMapUv.y, 0.002, 0.998 ) ) / ${n.rows.toFixed(1)} );
	}
	#endif`:"")).replace("#include <beginnormal_vertex>",`#include <beginnormal_vertex>
	objectNormal = normalize( vec3( bbR.x, 0.0, bbR.y ) * position.x * 1.6 + vec3( 0.0, ( position.y - 0.55 ) * 1.3, 0.0 ) + vec3( bbD.x, 0.0, bbD.y ) * 0.75 );`).replace("#include <begin_vertex>",`#include <begin_vertex>
	transformed = vec3( position.x * bbR.x, position.y, position.x * bbR.y );`)),u.fragmentShader=`uniform float uLeafSat;
`+u.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
	diffuseColor.rgb = mix( vec3( dot( diffuseColor.rgb, vec3( 0.299, 0.587, 0.114 ) ) ), diffuseColor.rgb, uLeafSat );`),u.fragmentShader=u.fragmentShader.replace("#include <normal_fragment_begin>",`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
	vec3 normal = normalize( vNormal );
	vec3 nonPerturbedNormal = normal;`)},a.customProgramCacheKey=()=>"worldFoliageToon"+(i?"":"_still")+(r?"_crown":"")+(l?"_cards":"")+(s?"_bb"+(n?`${n.v}x${n.cols}x${n.rows}`:""):""),a}async function yl(a,e){let t=async T=>{let I=await createImageBitmap(await(await fetch(T)).blob()),N=new OffscreenCanvas(I.width,I.height),C=N.getContext("2d");return C.drawImage(I,0,0),I.close(),C.getImageData(0,0,N.width,N.height)},[o,i]=await Promise.all([t(`${e}textures/foliage_color.jpg`),t(`${e}textures/foliage_alpha.png`)]);for(let T=0;T<o.data.length;T+=4)o.data[T+3]=i.data[T];let r=new fo(o.data,o.width,o.height,uo);r.flipY=!1,r.colorSpace=mt,r.generateMipmaps=!0,r.minFilter=Ta,r.magFilter=Da,r.anisotropy=8,r.needsUpdate=!0;let s=new wo,n=(T,I)=>new Promise(N=>s.load(`${e}textures/cedar_bark_${T}.jpg`,C=>{C.colorSpace=I?mt:"",C.wrapS=C.wrapT=xt,C.anisotropy=4,N(C)})),[l,c,u]=await Promise.all([n("color",!0),n("normal",!1),n("rough",!1)]),f=new Ie({map:l,normalMap:c,roughnessMap:u,roughness:1,color:3813417,vertexColors:!0});f.name="worldBark",f.onBeforeCompile=T=>{Ra(T),T.vertexShader=T.vertexShader.replace("#include <color_vertex>",`#include <color_vertex>
#ifdef USE_INSTANCING_COLOR
	vColor.rgb = vec3( 1.0 );
	#ifdef USE_COLOR
	vColor.rgb *= color.rgb;   // затенение ствола внутри кроны (цвет вершин моделей)
	#endif
#endif`)},f.customProgramCacheKey=()=>"worldBarkNoTint";let m=new Ie({roughness:.85,color:5204522,vertexColors:!0});m.name="worldBambooCulm",m.onBeforeCompile=f.onBeforeCompile,m.customProgramCacheKey=()=>"worldBambooCulm";let p={value:0},b=Va(new Ie({map:r,alphaTest:.3,alphaToCoverage:!0,side:2,roughness:1,metalness:0,vertexColors:!0}),p);b.name="worldFoliage";let P={sugi:Fo(0),sugi2:Fo(1),broad:ml(),sasa:gl(),fern:xl(),take:vl()};for(let T of Object.values(P)){let I=T.getAttribute("uv"),N=T.groups.find(z=>z.materialIndex===1);if(!N)continue;let C=T.getIndex(),O=new Set;for(let z=N.start;z<N.start+N.count;z++){let U=C.getX(z);O.has(U)||(O.add(U),I.setY(U,1-I.getY(U)))}}let S=T=>new Ee((T[0][0]+T[0][1])/2,(T[1][0]+T[1][1])/2,(T[2][0]+T[2][1])/2),M=[];for(let[T,I,N,C]of[["sugi",P.sugi,.22,$e.tint.sugi],["broad",P.broad,.7,$e.tint.broad]])M.push({key:T,w:N,obj:new ot(I,[new It({map:l,color:3352863}),new It({map:r,alphaTest:.45,side:2,color:S(C),vertexColors:!0})])});let B={};if(Wa.length){let{GLTFLoader:T}=await Jr(async()=>{let{GLTFLoader:H}=await zr(()=>import("./main-NQriH9Rc.js").then(k=>k.af),__vite__mapDeps([0,1,2]),import.meta.url).then(k=>k.P);return{GLTFLoader:H}},[],import.meta.url),I=new T,N=async H=>{try{return await I.loadAsync(H)}catch(k){let V=await fetch(H+".json").catch(()=>null);if(!V?.ok)throw k;let F=Uint8Array.from(atob((await V.json()).glb),j=>j.charCodeAt(0));return I.parseAsync(F.buffer,H.slice(0,H.lastIndexOf("/")+1))}},C=new wo,O=new Map,z=(H,k)=>O.get(H)||O.set(H,new Promise(V=>C.load(`${e}world/trees/tex/${H}`,F=>(F.colorSpace=k?mt:"",F.wrapS=F.wrapT=xt,F.anisotropy=4,V(F)),void 0,()=>V(null)))).get(H),U=async H=>{let k=[];H.traverse(V=>{if(!V.isMesh)return;let F=Array.isArray(V.material)?V.material[0]:V.material,[j,ee]=(F.name||"").split("|");j==="leaves"&&!F.map&&k.push(z(`leaf_${ee}.png`,!0).then(K=>F.map=K)),j==="bark"&&!F.map&&k.push(z(`bark_${ee}.jpg`,!0).then(K=>F.map=K),z(`bark_${ee}_n.jpg`,!1).then(K=>F.normalMap=K))}),await Promise.all(k)};await Promise.all(Wa.map(async H=>{let k,V=null;try{k=await N(`${e}world/trees/${Ro}${H.id}.glb`),await U(k.scene)}catch{console.warn("лес: нет модели дерева",H.id);return}try{V=await N(`${e}world/trees/${Ro}${H.id}_lo.glb`),await U(V.scene)}catch{}let F=k.scene;F.updateMatrixWorld(!0);let j=new Jo().setFromObject(F),ee=j.max.y-j.min.y,K=Math.max(j.max.x-j.min.x,j.max.z-j.min.z),oe=[],J=[],fe=new ct,se=(pe,we,Me,Re=!0)=>{let Ne=new Map;pe.traverse(Ue=>{let ye=Ue;if(!ye.isMesh)return;let ge=ye.geometry.clone().applyMatrix4(ye.matrixWorld),ke=Array.isArray(ye.material)?ye.material[0]:ye.material,We=ke.alphaTest>0||ke.side===2;for(let Z of Object.keys(ge.attributes))Z!=="position"&&Z!=="normal"&&Z!=="uv"&&Z!=="color"&&Z!=="_card"&&ge.deleteAttribute(Z);ge.attributes.normal||ge.computeVertexNormals(),ge.attributes.uv||ge.setAttribute("uv",new Rt(new Float32Array(ge.attributes.position.count*2),2));let G=`${We?"L":"B"}:${ke.map?ke.map.uuid:"-"}:${ke.normalMap?ke.normalMap.uuid:"-"}:${ke.color?ke.color.getHex():0}`,X=Ne.get(G);X?X.geos.push(ge):Ne.set(G,{geos:[ge],src:ke,leafy:We})});for(let{geos:Ue,src:ye,leafy:ge}of Ne.values()){if(ge&&H.kind==="broad"&&po()==="winter")continue;let ke=Ue.some(Z=>!!Z.index)&&Ue.some(Z=>!Z.index)?Ue.map(Z=>Z.index?Z.toNonIndexed():Z):Ue,We=ke.length>1&&ai(ke,!1)||ke[0];if(ke.length>1&&We!==ke[0])for(let Z of ke)Z.dispose();let G=new Ie({map:(ge?zo(ye.map,Do(H)):ye.map)||null,normalMap:ge?null:ye.normalMap||null,color:ge?(ye.color?ye.color.clone():new Ee(1,1,1)).multiplyScalar(.74):(ye.color?ye.color.clone():new Ee(1,1,1)).multiply(new Ee(.6,.55,.5)),roughness:.95,metalness:0,side:ge?2:0,alphaTest:ge?.3:0,alphaToCoverage:ge,vertexColors:!!We.attributes.color});if(ge?Va(G,p,ee,{wind:Re,crownNormals:!0,cards:!!We.attributes._card}):(G.onBeforeCompile=f.onBeforeCompile,G.customProgramCacheKey=()=>"worldBarkNoTint"),G.name=`worldTree_${H.id}_${ge?"leaf":"bark"}${Re?"":"_lo"}`,we.push({geo:We,mat:G,leafy:ge}),!Me)continue;let X=new ot(We,new It({map:(ge?zo(ye.map,Do(H)):ye.map)||null,color:ye.color?ye.color.clone():new Ee(1,1,1),alphaTest:ge?.4:0,side:ge?2:0,vertexColors:!!We.attributes.color}));fe.add(X)}};se(F,oe,!0),V&&(V.scene.updateMatrixWorld(!0),se(V.scene,J,!1,!1)),fe.scale.setScalar(1/ee),B[H.id]={...H,parts:oe,loParts:J.length?J:oe,height:ee,width:K},M.push({key:H.id,obj:fe,w:K/ee*1.12})}))}let D=M.length*ca,L=Math.min(pl,D),A=Math.ceil(D/L),_=new Ft(At*L,At*2*A,{type:ho});_.texture.colorSpace="";let v={},h={};{let T=a.getRenderTarget(),I=a.getClearColor(new Ee),N=a.getClearAlpha(),C=a.autoClear;a.setRenderTarget(_),a.setClearColor(2899748,0),a.clear(),a.autoClear=!1,M.forEach(({key:O,obj:z,w:U},H)=>{v[O]=H,h[O]=U;let k=new er;k.add(z);let V=new tr(-U/2,U/2,1.02,-.02,-2,2);for(let F=0;F<ca;F++){let j=F/ca*2*Math.PI,ee=H*ca+F;V.position.set(Math.cos(j),0,Math.sin(j)),V.lookAt(0,0,0),V.updateMatrixWorld(),_.viewport.set(ee%L*At,Math.floor(ee/L)*At*2,At,At*2),a.setRenderTarget(_),a.render(k,V)}z.traverse(F=>{let j=F.material;j&&(Array.isArray(j)?j:[j]).forEach(ee=>ee.dispose())})}),_.viewport.set(0,0,At*L,At*2*A),a.autoClear=C,a.setRenderTarget(T),a.setClearColor(I,N)}let d=Va(new Ie({map:_.texture,alphaTest:.5,side:0,roughness:.9}),p,1,{billboard:!0,atlas:{v:ca,cols:L,rows:A}});d.name="worldTreeFar";let g={rt:_,mat:d,slot:v,width:h,n:M.length,geo:wl(1)},x=Wa.filter(T=>B[T.id]),w={conifer:x.filter(T=>T.kind==="conifer").flatMap(T=>Array(T.w||1).fill(T.id)),broad:x.filter(T=>T.kind==="broad").flatMap(T=>Array(T.w||1).fill(T.id)),hk:Object.fromEntries(x.map(T=>[T.id,T.hk||1]))},y=new ar(1,6,4),E=new It({colorWrite:!1,depthWrite:!1}),R=new Qo;return R.name="worldInstDepth",E.name="worldCrownShadow",{geo:P,imp:g,bark:f,culm:m,foliage:b,models:B,modelKinds:w,crownGeo:y,crownMat:E,instDepth:R,setTime(T){p.value=T},dispose(){for(let T of[...Object.values(P),g.geo])T.dispose();for(let T of[r,l,c,u])T.dispose();y.dispose(),E.dispose(),R.dispose(),f.dispose(),m.dispose(),b.dispose(),g.rt.dispose(),g.mat.dispose();for(let T of Object.values(B))for(let I of[...T.parts,...T.loParts===T.parts?[]:T.loParts])I.geo.dispose(),I.mat.dispose()}}}function*Sl(a,e,t=null){let o=a.terrain,[i,,r]=a.origin,s={sugi:[],sugi2:[],broad:[],sasa:[],fern:[],take:[]},n=(D,L,A)=>D[Math.floor(De(Math.floor(L*2),Math.floor(A*2),88)*D.length)%D.length],l=(D,L)=>{let A=Math.min(o.nx-1,Math.max(0,Math.round(D/o.cell))),_=Math.min(o.nz-1,Math.max(0,Math.round(L/o.cell)));return o.edge[_*o.nx+A]},c=(D,L)=>{let A=Math.min(o.nx-1,Math.max(0,Math.round(D/o.cell))),_=Math.min(o.nz-1,Math.max(0,Math.round(L/o.cell)));return o.normals[3*(_*o.nx+A)+1]},u=(D,L,A)=>{let _=D+i,v=L+r,h=e.cedar(_,v)>De(Math.floor(_*7),Math.floor(v*7),77),d=ua(o,D,L)-.2,g=e.alpine?e.alpine(_,v):0;if(h||g>.5){let x=$e.sugiH[0]+($e.sugiH[1]-$e.sugiH[0])*De(Math.floor(_*3),Math.floor(v*3),9);if(t?.broad?.length&&De(Math.floor(_*5),Math.floor(v*5),91)<.25*(1-g)){let w=n(t.broad,_,v);(s[w]||=[]).push(D,d,L,x*.6*(t.hk?.[w]??1),A)}else if(t?.conifer?.length){let w=n(t.conifer,_,v);(s[w]||=[]).push(D,d,L,x*(t.hk?.[w]??1),A)}else(De(Math.floor(_),Math.floor(v),21)<.2?s.sugi2:s.sugi).push(D,d,L,x,A)}else if(De(Math.floor(_*4),Math.floor(v*4),92)<.32){let x=$e.sugiH[0]*.85+($e.sugiH[1]-$e.sugiH[0])*.7*De(Math.floor(_*3),Math.floor(v*3),93),w=t?.conifer?.length?n(t.conifer,_,v):null;w?(s[w]||=[]).push(D,d,L,x*(t.hk?.[w]??1),A):(De(Math.floor(_),Math.floor(v),94)<.45?s.sugi2:s.sugi).push(D,d,L,x,A)}else{let x=$e.broadH[0]+($e.broadH[1]-$e.broadH[0])*De(Math.floor(_*3),Math.floor(v*3),11);if(t?.broad?.length){let w=n(t.broad,_,v);(s[w]||=[]).push(D,d,L,x*(t.hk?.[w]??1),A)}else s.broad.push(D,d,L,x,A)}},f=a.trees;for(let D=0;D<f.length;D+=5)u(f[D],f[D+2],f[D+4]);yield;function*m(D,L,A,_){let v=Math.ceil(D*1.5),h=Math.floor((i-v)/D),d=Math.floor((r-v)/D),g=Math.ceil((500+2*v)/D)+1;for(let x=0;x<g;x++){for(let w=0;w<g;w++){let y=h+w,E=d+x,R=(y+.5-L/2+L*De(y,E,1))*D,T=(E+.5-L/2+L*De(E,y,2))*D;if(_){let O=Math.floor(R/420)*420+210,z=Math.floor(T/420)*420+210,U=De(Math.floor(R/420),Math.floor(T/420),57)*Math.PI,H=Math.cos(U),k=Math.sin(U),V=R-O,F=T-z;R=O+V*H-F*k,T=z+V*k+F*H}let I=R-i,N=T-r;if(I<0||N<0||I>=500||N>=500)continue;let C=l(I,N);C<7||c(I,N)<$e.minNy||!A(C,R,T)||De(y,E,3)>e.density(R,T)||u(I,N,6.283*De(E,y,4))}yield}}let p=D=>D<$e.nearBand,b=(D,L)=>e.cedar(D,L)>.5;if(yield*m($e.step,.7,D=>!p(D),!1),yield*m($e.stepMixed,$e.mixedJitter,(D,L,A)=>p(D)&&!b(L,A),!1),yield*m($e.stepCedar,$e.cedarJitter,(D,L,A)=>p(D)&&b(L,A),!0),e.bamboo){let D=2.6,L=Math.ceil(i/D),A=Math.ceil(r/D),_=Math.round(500/D);for(let v=0;v<_;v++){for(let h=0;h<_;h++){let d=L+h,g=A+v,x=(d+.8*De(d,g,51))*D-i,w=(g+.8*De(g,d,52))*D-r;if(x<0||w<0||x>=500||w>=500)continue;let y=l(x,w);y<5||y>45||c(x,w)<.7||De(d,g,53)>e.bamboo(x+i,w+r)||s.take.push(x,ua(o,x,w)-.15,w,9+6*De(d,g,54),6.283*De(g,d,55))}(v&15)==15&&(yield)}}let P=$e.sasaStep,S=Math.ceil(i/P),M=Math.ceil(r/P),B=Math.round(500/P);for(let D=0;D<B;D++){for(let L=0;L<B;L++){let A=S+L,_=M+D,v=(A+De(A,_,31))*P-i,h=(_+De(_,A,32))*P-r;if(v<0||h<0||v>=500||h>=500)continue;let d=l(v,h);d<$e.sasaBand[0]||d>$e.sasaBand[1]||c(v,h)<.6||d>$e.sasaFar&&(A&1||_&1)||De(A,_,33)>e.density(v+i,h+r)*.95||(De(A,_,36)<.5?s.sasa:s.fern).push(v,ua(o,v,h)-.05,h,.55+.4*De(A,_,34),6.283*De(_,A,35))}(D&7)==7&&(yield)}return s}var Ke={cells:4,nearIn:120,nearOut:160,perFrame:2,modelCells:16,modelIn:40,modelOut:62,fullIn:7,fullOut:16,move:2,viewNear:45,viewTurn:.985},$t={near:1,shadows:!0};function Lo(a,e){let t=new ct;t.name="forest";let o=Ke.cells,i=500/o,r=(G,X)=>Math.min(o-1,Math.max(0,Math.floor(X/i)))*o+Math.min(o-1,Math.max(0,Math.floor(G/i))),s=Ke.modelCells,n=500/s,l=(G,X)=>Math.min(s-1,Math.max(0,Math.floor(X/n)))*s+Math.min(s-1,Math.max(0,Math.floor(G/n))),c=new Ze,u=new ta,f=new ne,m=new ne,p=new ne(0,1,0),b=new Ze().makeScale(0,0,0),P=(G,X)=>.8+.4*De(Math.floor(G[5*X]*3),Math.floor(G[5*X+2]*3),71),S=(G,X,Z=1)=>{let ae=G[5*X+3]*Z,he=ae*P(G,X);return c.compose(f.set(G[5*X],G[5*X+1],G[5*X+2]),u.setFromAxisAngle(p,G[5*X+4]),m.set(he,ae,he))},M=(G,X,Z)=>{let ae=G[5*X+3],he=ae*Z*P(G,X);return c.compose(f.set(G[5*X],G[5*X+1],G[5*X+2]),u.setFromAxisAngle(p,G[5*X+4]),m.set(he,ae,he))},B=new Ee,D=(G,X,Z)=>{let ae=$e.tint[G],he=De(Math.floor(X[5*Z]*3),Math.floor(X[5*Z+2]*3),61),Te=De(Math.floor(X[5*Z+2]*3),Math.floor(X[5*Z]*3),62);return B.setRGB(ae[0][0]+(ae[0][1]-ae[0][0])*he,ae[1][0]+(ae[1][1]-ae[1][0])*Te,ae[2][0]+(ae[2][1]-ae[2][0])*he)},L=(G,X,Z=!0)=>(G.castShadow=X,G.receiveShadow=Z,G.userData.noAO=!0,G.matrixAutoUpdate=!1,G.matrixWorldNeedsUpdate=!0,G.renderOrder=1,G.userData.instReady=!0,X&&(G.customDepthMaterial=e.instDepth),t.add(G),G),A=a.sugi.concat(a.sugi2),_=Object.keys(e.models||{}).filter(G=>a[G]?.length),v=[{key:"sugi",arr:A,model:!1},{key:"broad",arr:a.broad,model:!1},..._.map(G=>({key:G,arr:a[G],model:!0}))].filter(G=>G.arr.length),h=0;for(let G of v)h+=G.arr.length/5;let d=Array.from({length:o*o},()=>[]),g=Array.from({length:s*s},()=>[]),x=null;if(h){let G=e.imp.geo.clone(),X=new Float32Array(h),Z=new rt(G,e.imp.mat,h),ae=0;for(let{key:he,arr:Te,model:Se}of v){let Ve=Te.length/5,de=e.imp.width[he],Ce=e.imp.slot[he],W=Se?l:r,re=Array.from({length:Se?s*s:o*o},()=>[]);for(let q=0;q<Ve;q++)re[W(Te[5*q],Te[5*q+2])].push(q);re.forEach((q,te)=>{if(q.length){(Se?g:d)[te].push({arr:Te,w:de,start:ae,ids:q});for(let ce of q)Z.setMatrixAt(ae,M(Te,ce,de)),X[ae++]=Ce}})}G.setAttribute("aSlot",new or(X,1)),Z.computeBoundingSphere(),x=L(Z,!1)}let w=(G,X)=>{if(x&&G.length){for(let Z of G){for(let ae=0;ae<Z.ids.length;ae++)x.setMatrixAt(Z.start+ae,X?b:M(Z.arr,Z.ids[ae],Z.w));x.instanceMatrix.addUpdateRange(Z.start*16,Z.ids.length*16)}x.instanceMatrix.needsUpdate=!0}},y=[["sugi",e.geo.sugi,[e.bark,e.foliage]],["sugi2",e.geo.sugi2,[e.bark,e.foliage]],["broad",e.geo.broad,[e.bark,e.foliage]],["sasa",e.geo.sasa,[e.foliage,e.foliage]],["fern",e.geo.fern,[e.foliage,e.foliage]],["take",e.geo.take,[e.culm,e.foliage]]].filter(G=>a[G[0]]?.length),E=Array.from({length:o*o},()=>({sugi:[],sugi2:[],broad:[],sasa:[],fern:[],take:[]}));for(let[G]of y){let X=a[G];for(let Z=0;Z<X.length/5;Z++)E[r(X[5*Z],X[5*Z+2])][G].push(Z)}let R=Array.from({length:s*s},()=>({}));for(let G of _){let X=a[G];for(let Z=0;Z<X.length/5;Z++){let ae=R[l(X[5*Z],X[5*Z+2])];(ae[G]||(ae[G]=[])).push(Z)}}let T=new Uint8Array(o*o),I=new Uint8Array(s*s),N=0,C=(G,X,Z,ae,he,Te=!0)=>{let Se=new rt(G,X,Z);return Se.count=0,Se.visible=!1,Se.userData.leafy=he,Se.instanceMatrix.setUsage(Kr),L(Se,ae,Te)},O=(G,X)=>{G.count=X,G.visible=X>0,X&&(G.instanceMatrix.clearUpdateRanges(),G.instanceMatrix.addUpdateRange(0,X*16),G.instanceMatrix.needsUpdate=!0,G.instanceColor&&(G.instanceColor.clearUpdateRanges(),G.instanceColor.addUpdateRange(0,X*3),G.instanceColor.needsUpdate=!0),G.computeBoundingSphere())},z={},U=(G,X,Z)=>{let ae=a[G],he=z[G]||(z[G]=C(X,Z,ae.length/5,!1,!0)),Te=G==="fern"?"sasa":G,Se=0;for(let Ve=0;Ve<o*o;Ve++)if(T[Ve])for(let de of E[Ve][G])he.setMatrixAt(Se,S(ae,de)),he.setColorAt(Se,D(Te,ae,de)),Se++;O(he,Se)},H={},k=G=>{let X=e.models[G],Z=a[G],ae=Z.length/5,he=1/X.height,Te=X.kind==="conifer"?"sugi":"broad",Se=H[G]||(H[G]={lo:X.loParts.map(Ce=>C(Ce.geo,Ce.mat,ae,!1,Ce.leafy)),full:X.parts.map(Ce=>C(Ce.geo,Ce.mat,ae,!Ce.leafy,Ce.leafy))}),Ve=0,de=0;for(let Ce=0;Ce<s*s;Ce++){let W=I[Ce],re=W?R[Ce][G]:void 0;if(!re||W===1&&!We(Ce))continue;let q=W===2?Se.full:Se.lo;for(let te of re){let ce=W===2?de++:Ve++;S(Z,te,he);for(let le of q)le.setMatrixAt(ce,c),le.userData.leafy&&le.setColorAt(ce,D(Te,Z,te))}}for(let Ce of Se.lo)O(Ce,Ve);for(let Ce of Se.full)O(Ce,de)},V=(G,X,Z,ae,he,Te)=>{let Se=Z[5*ae+3],Ve=Se*he*(Te?.38:.45),de=Se*(Te?.34:.26);G.setMatrixAt(X,c.compose(f.set(Z[5*ae],Z[5*ae+1]+Se*(Te?.58:.64),Z[5*ae+2]),u.identity(),m.set(Ve,de,Ve)))},F=G=>{let X=C(e.crownGeo,e.crownMat,G,!0,!1,!1);return X.frustumCulled=!1,X.visible=$t.shadows,X.userData.noAO=!0,X},j=null,ee=null,K=a.sugi.length/5,oe=()=>{let G=A.length/5+a.broad.length/5;if(!G)return;let X=j||=F(G),Z=0;for(let ae=0;ae<o*o;ae++)if(T[ae]){for(let he of E[ae].sugi)V(X,Z++,A,he,.3,!0);for(let he of E[ae].sugi2)V(X,Z++,A,he+K,.3,!0);for(let he of E[ae].broad)V(X,Z++,a.broad,he,.6,!1)}O(X,Z)},J=0;for(let G of _)J+=a[G].length/5;let fe=()=>{if(!J)return;let G=ee||=F(J),X=0;for(let Z=0;Z<s*s;Z++)if(I[Z])for(let ae of _){let he=R[Z][ae];if(!he)continue;let Te=e.models[ae],Se=Te.width/Te.height,Ve=Te.kind==="conifer";for(let de of he)V(G,X++,a[ae],de,Se,Ve)}O(G,X)},se=NaN,pe=NaN,we=NaN,Me=!1,Re=0,Ne=0,Ue=0,ye=0,ge=-2,ke=0,We=G=>{if(ge<=-1)return!0;let X=(G%s+.5)*n-Re,Z=(Math.floor(G/s)+.5)*n-Ne,ae=Math.hypot(X,Z);return ae<Ke.viewNear||X*Ue+Z*ye+n>=ae*ge};return{group:t,get nearCells(){let G=0;for(let X of T)G+=X;return G},get modelCells(){let G=0;for(let X of I)X===2&&G++;return G},get loCells(){let G=0;for(let X of I)X===1&&G++;return G},update(G,X,Z=Ke.perFrame,ae=null){let he=$t.near;if(ae&&ke>0&&(ae.fx*Ue+ae.fz*ye<Ke.viewTurn||Math.abs(G-Re)>n/2||Math.abs(X-Ne)>n/2||ge!==ae.cos)){Re=G,Ne=X,Ue=ae.fx,ye=ae.fz,ge=ae.cos;for(let de of Object.keys(H))k(de)}if(!N){let de=Math.max(-G,0,G-500),Ce=Math.max(-X,0,X-500),W=Ke.nearIn*he;if(de*de+Ce*Ce>W*W)return 0}if(!Me&&he===we&&Math.abs(G-se)<Ke.move&&Math.abs(X-pe)<Ke.move)return 0;let Te=0,Se=!1,Ve=new Set;for(let de=0;de<o*o&&Te<Z;de++){let Ce=de%o*i,W=Math.floor(de/o)*i,re=Math.max(Ce-G,0,G-Ce-i),q=Math.max(W-X,0,X-W-i),te=Math.hypot(re,q),ce=T[de]===1,le=ce?te<Ke.nearOut*he:te<Ke.nearIn*he;le!==ce&&(T[de]=+!!le,N+=le?1:-1,w(d[de],le),Se=!0,Te++)}if(_.length)for(let de=0;de<s*s&&Te<Z*3;de++){let Ce=de%s*n,W=Math.floor(de/s)*n,re=Math.max(Ce-G,0,G-Ce-n),q=Math.max(W-X,0,X-W-n),te=Math.hypot(re,q),ce=I[de],le=ce;if(ce===2?te>=Ke.fullOut*he&&(le=+(te<Ke.modelOut*he)):ce===1?te<Ke.fullIn*he?le=2:te>=Ke.modelOut*he&&(le=0):te<Ke.fullIn*he?le=2:te<Ke.modelIn*he&&(le=1),le!==ce){ce>0!=le>0&&(w(g[de],le>0),N+=le>0?1:-1),ke+=(le===1)-+(ce===1),I[de]=le,Te++;for(let $ of _)R[de][$]&&Ve.add($)}}if(Se){for(let[de,Ce,W]of y)U(de,Ce,W);oe()}if(Ve.size){ae?(Re=G,Ne=X,Ue=ae.fx,ye=ae.fz,ge=ae.cos):ge=-2;for(let de of Ve)k(de);fe()}return Me=Te>=Z,Me||(se=G,pe=X,we=he),Te},dispose(){t.removeFromParent(),t.traverse(G=>{G.isInstancedMesh&&G.dispose()}),x&&x.geometry.dispose(),t.clear()}}}var Le={from:1,dense:6,mid:12,far:18,step:.65,stepMid:1.2,stepFar:1.9,w:[.8,1.3],h:[.45,.85],blades:5,segments:2,sparseSegments:2,sparseBlades:3,sparseFrom:8,sparseTo:11,sparseIn:30,sparseOut:42,minNy:.6,wind:{amp:.09,speed:1.4,len:7},tint:[[.34,.44],[.54,.64],[.2,.28]]},Tt=(a,e,t)=>{let o=a*374761393+e*668265263+t*2147483647|0;return o=Math.imul(o^o>>>13,1274126177),((o^o>>>16)>>>0)/4294967296};function Ao(a=Le.blades,e=Le.segments){let t=[],o=[],i=[],r=[],s=[],n=977,l=()=>(n=n*16807%2147483647)/2147483647,c=e;for(let f=0;f<a;f++){let m=l()*Math.PI*2,p=.12+.45*l(),b=.55+.45*l(),P=.035+.035*l(),S=Math.cos(m),M=Math.sin(m),B=-M,D=S,L=.8+.3*l(),A=(l()-.5)*.5,_=(l()-.5)*.5,v=t.length/3,h=E=>[A+S*p*E*E*b,E*b*(1-.2*p*E),_+M*p*E*E*b];for(let E=0;E<=c;E++){let R=E/(c+1),[T,I,N]=h(R),C=P*(1-R*.7),O=(.3+.7*R)*L,[z,U,H]=h(R+.1),k=z-T,V=U-I,F=H-N,j=V*D-F*0,ee=F*B-k*D,K=k*0-V*B,oe=Math.hypot(j,ee,K)||1,J=j/oe*.6,fe=ee/oe*.6+.8,se=K/oe*.6,pe=Math.hypot(J,fe,se);for(let we of[-1,1])t.push(T+B*C*we,I,N+D*C*we),o.push(J/pe,fe/pe,se/pe),i.push(+(we>0),R),r.push(O,O,O)}let[d,g,x]=h(1),w=L;t.push(d,g,x),o.push(0,1,0),i.push(.5,1),r.push(w,w,w);for(let E=0;E<c;E++){let R=v+2*E;s.push(R,R+1,R+2,R+1,R+3,R+2)}let y=v+2*c;s.push(y,y+1,v+2*(c+1))}let u=new it;return u.setAttribute("position",new ze(t,3)),u.setAttribute("normal",new ze(o,3)),u.setAttribute("uv",new ze(i,2)),u.setAttribute("color",new ze(r,3)),u.setIndex(s),u.computeBoundingSphere(),u}function bl(){let a=Ao(),e=Ao(Le.sparseBlades,Le.sparseSegments),t={value:0},o=new Ie({color:8161884,side:2,roughness:.9,metalness:0,vertexColors:!0});return o.name="worldGrass",o.onBeforeCompile=i=>{i.uniforms.uTime=t,Ra(i),i.vertexShader=`uniform float uTime;
`+i.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
	{
		vec3 iw = ( modelMatrix * instanceMatrix * vec4( 0.0, 0.0, 0.0, 1.0 ) ).xyz;
		float ph = ( iw.x + iw.z * 0.7 ) / ${Le.wind.len.toFixed(2)} + uTime * ${Le.wind.speed.toFixed(2)};
		float sway = ( sin( ph ) + 0.5 * sin( ph * 2.3 + 1.7 ) ) * ${Le.wind.amp.toFixed(3)} * uv.y * uv.y;
		transformed.x += sway; transformed.z += sway * 0.6;
	}`)},o.customProgramCacheKey=()=>"worldGrassToon",{geo:a,geoSparse:e,mat:o,setTime(i){t.value=i},dispose(){a.dispose(),e.dispose(),o.dispose()}}}function Ml(a,e,t=null){let o=a.terrain,[i,,r]=a.origin,s=[],n=(D,L,A,_=1,v=0)=>{let h=Math.min(o.nx-1,Math.max(0,Math.round(L/o.cell)));return D[_*(Math.min(o.nz-1,Math.max(0,Math.round(A/o.cell)))*o.nx+h)+v]},l=o.cell,c=o.nx-1,u=o.nz-1,f=t?Math.max(0,Math.floor(t.x0/l)):0,m=t?Math.min(c,Math.ceil(t.x1/l)):c,p=t?Math.max(0,Math.floor(t.z0/l)):0,b=t?Math.min(u,Math.ceil(t.z1/l)):u,P=t?t.x0:0,S=t?t.z0:0,M=t?t.x1:500,B=t?t.z1:500;for(let[D,L,A]of[[Le.step,Le.from,Le.dense],[Le.stepMid,Le.dense,Le.mid],[Le.stepFar,Le.mid,Le.far]])for(let _=p;_<b;_++)for(let v=f;v<m;v++){let h=_*o.nx+v;if(Math.min(o.edge[h],o.edge[h+1],o.edge[h+o.nx],o.edge[h+o.nx+1])>=A+1)continue;let d=Math.max(P,v*l),g=Math.max(S,_*l),x=Math.min(M,d+l,(v+1)*l),w=Math.min(B,g+l,(_+1)*l),y=Math.floor((i+d)/D),E=Math.floor((i+x)/D),R=Math.floor((r+g)/D),T=Math.floor((r+w)/D);for(let I=R;I<=T;I++)for(let N=y;N<=E;N++){let C=(N+.1+.8*Tt(N,I,1))*D-i,O=(I+.1+.8*Tt(I,N,2))*D-r;if(C<d||O<g||C>=x||O>=w)continue;let z=n(o.edge,C,O);if(z<L||z>=A||z===255||n(o.normals,C,O,3,1)<Le.minNy||rr(C+i,O+r)>Tt(N,I,8)*.6||ao(C+i,O+r)>.3)continue;let U=z<Le.mid?0:e.density(C+i,O+r)*e.clearing(z);if(U>.5||Tt(N,I,3)<U*.8||z>Le.mid&&Tt(N,I,4)<.3)continue;let H=Le.w[0]+(Le.w[1]-Le.w[0])*Tt(N,I,5),k=Le.h[0]+(Le.h[1]-Le.h[0])*Tt(I,N,6);s.push(C,ua(o,C,O)-.03,O,H,k,6.283*Tt(N,I,7))}}return s}function Eo(a,e){let t=new ct;t.name="grass";let o=Ke.modelCells,i=500/o,r=(h,d)=>Math.min(o-1,Math.max(0,Math.floor(d/i)))*o+Math.min(o-1,Math.max(0,Math.floor(h/i))),s=typeof a=="function",n=Array(o*o).fill(null),l=h=>{if(n[h])return n[h];if(s){let d=h%o*i,g=Math.floor(h/o)*i;return n[h]=a({x0:d,z0:g,x1:d+i,z1:g+i})}return n[h]=[]};if(!s){let h=Array.from({length:o*o},()=>[]);for(let d=0;d<a.length/6;d++){let g=6*d;h[r(a[g],a[g+2])].push(a[g],a[g+1],a[g+2],a[g+3],a[g+4],a[g+5])}h.forEach((d,g)=>{n[g]=d})}let c=s?-1:a.length/6,u=new Ze,f=new ta,m=new ne,p=new ne,b=new ne(0,1,0),P=new Ee,S=Array(o*o).fill(null),M=Array(o*o).fill(0),B=(h,d)=>{let g=S[h];if(g&&d&&M[h]){M[h]=d,g.geometry=d===2?e.geo:e.geoSparse,g.computeBoundingSphere();return}if(g&&(g.removeFromParent(),g.dispose()),S[h]=null,M[h]=d,!d)return;let x=l(h),w=x.length/6;if(!w)return;let y=new rt(d===2?e.geo:e.geoSparse,e.mat,w);for(let E=0;E<w;E++){let R=6*E;y.setMatrixAt(E,u.compose(m.set(x[R],x[R+1],x[R+2]),f.setFromAxisAngle(b,x[R+5]),p.set(x[R+3],x[R+4],x[R+3])));let T=Le.tint,I=Tt(Math.floor(x[R]*5),Math.floor(x[R+2]*5),9);y.setColorAt(E,P.setRGB(T[0][0]+(T[0][1]-T[0][0])*I,T[1][0]+(T[1][1]-T[1][0])*I,T[2][0]+(T[2][1]-T[2][0])*I))}y.computeBoundingSphere(),y.castShadow=!1,y.receiveShadow=!0,y.userData.noAO=!0,y.matrixAutoUpdate=!1,y.matrixWorldNeedsUpdate=!0,y.renderOrder=2,y.userData.instReady=!0,t.add(y),S[h]=y},D=0,L=NaN,A=NaN,_=NaN,v=!1;return{group:t,get count(){if(c<0){c=0;for(let h=0;h<o*o;h++)c+=l(h).length/6}return c},update(h,d,g=Ke.perFrame*3){let x=$t.near;if(!D){let y=Math.max(-h,0,h-500),E=Math.max(-d,0,d-500),R=Math.max(Le.sparseFrom,Le.sparseIn*x);if(y*y+E*E>R*R)return 0}if(!v&&x===_&&Math.abs(h-L)<1&&Math.abs(d-A)<1)return 0;let w=0;for(let y=0;y<o*o&&w<g;y++){let E=y%o*i,R=Math.floor(y/o)*i,T=Math.max(E-h,0,h-E-i),I=Math.max(R-d,0,d-R-i),N=Math.hypot(T,I),C=$t.near,O=M[y],z=O;O===2?N>=Le.sparseTo&&(z=+(N<Le.sparseOut*C)):O===1?N<Le.sparseFrom?z=2:N>=Le.sparseOut*C&&(z=0):N<Le.sparseFrom?z=2:N<Le.sparseIn*C&&(z=1),z!==O&&(O>0!=z>0&&(D+=z>0?1:-1),B(y,z),w++)}return v=w>=g,v||(L=h,A=d,_=x),w},dispose(){t.removeFromParent();for(let h of S)h?.dispose();t.clear()}}}var Et=(a,e,t)=>{let o=Math.min(1,Math.max(0,(t-a)/(e-a)));return o*o*(3-2*o)},_l=oi.indexOf("asphalt");function No(a,e,t,o=null,i=0,r=a.nx*a.nz){let s=a.nx*a.nz,n=o?o.a:new Float32Array(4*s),l=o?o.b:new Float32Array(4*s);for(let c=i;c<r;c++){let u=c%a.nx,f=(c-u)/a.nx;if(a.mask[c]===_l){l[4*c]=1;continue}let m=e[0]+(a.xz?a.xz[2*c]:u*a.cell),p=e[2]+(a.xz?a.xz[2*c+1]:f*a.cell),b=a.normals[3*c+1],P=a.edge[c],S=Et(.77,.62,b),M=(1-Et(.5,2.2,P))*(1-S),B=t.density(m,p)*t.clearing(P)*(1-ao(m,p)),D=B*(1-S)*(1-M),L=S*B*.5+D*.55;n[4*c]=Math.max(0,1-S-M-D),n[4*c+1]=D*.45,n[4*c+2]=S*(1-B*.5),n[4*c+3]=M,l[4*c+1]=L,a.cut&&(l[4*c+2]=Et(2,8,a.cut[c])*Et(.9,.75,b)*+(P>=1.5&&P<=45));let A=a.heights?Et(2050,2350,a.heights[c]):0;if(A>0){let h=n[4*c]*A;n[4*c]-=h,n[4*c+3]+=h*.65,n[4*c+2]+=h*.35,n[4*c+1]*=1-.6*A,l[4*c+1]*=1-.6*A}let _=ao(m,p),v=_<1?rr(m,p):0;if(v>0){let h=n[4*c]*v,d=ci(m,p),g=1-Et(.36,.5,d),x=Et(.36,.5,d)*(1-Et(.64,.78,d));n[4*c]-=h*(g+x),n[4*c+1]*=1-v,l[4*c+1]*=1-v,n[4*c+3]=n[4*c+3]*(1-v)+h*x,l[4*c]=Math.max(l[4*c],h*g)}if(_>0){for(let h=0;h<4;h++)n[4*c+h]*=1-_;l[4*c+1]*=1-_,l[4*c]=Math.max(l[4*c],_)}}return{a:n,b:l}}var io=[new Ee(1,.44,.07),new Ee(.86,.9,1),new Ee(.86*8,.9*8,8)],_a=io,yt={height:7.82,reach:1.75},ko={count:10,power:380,angle:1,penumbra:.5,range:36,ahead:30,far:320},pr={radius:1.3,minPx:2.5,peak:.45,floor:.5,fade:Math.LN2/7e3},mr=`
uniform float uRadius;
uniform float uMinPx;
uniform float uPxAngle;
uniform float uFade;
uniform float uFloor;
#ifdef FAR_MASK
uniform vec2 uNearTile;
uniform int uNearMask;
#endif
varying vec2 vUv;
varying float vScale;
varying vec3 vTint;
void main() {
	vec4 w = modelMatrix * instanceMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	float r0 = uRadius * length( instanceMatrix[ 0 ].xyz );
	#ifdef USE_INSTANCING_COLOR
		vTint = instanceColor;
	#else
		vTint = vec3( 1.0 );
	#endif
	#ifdef FAR_MASK
		vec2 t = floor( ( w.xz + HALF ) / TILE ) - uNearTile;
		if ( abs( t.x ) < 2.5 && abs( t.y ) < 2.5 && ( ( uNearMask >> int( ( t.y + 2.0 ) * 5.0 + t.x + 2.0 ) ) & 1 ) == 1 ) r0 = 0.0;
	#endif
	vec4 c = viewMatrix * w;
	float d = max( - c.z, 0.1 );
	float r = max( r0, uMinPx * d * uPxAngle );
	vScale = r0 > 0.0 ? max( r0 * r0 / ( r * r ), uFloor ) * exp( - uFade * d ) : 0.0;
	vUv = position.xy * 2.0;
	c.xy += position.xy * 2.0 * r;
	gl_Position = projectionMatrix * c;
}`,vr=`
uniform vec3 uColor;
varying vec2 vUv;
varying float vScale;
varying vec3 vTint;
void main() {
	float r2 = dot( vUv, vUv );
	if ( r2 > 1.0 ) discard;
	gl_FragColor = vec4( uColor * vTint * vScale * ( exp( - r2 * 6.0 ) - 0.0025 ), 1.0 );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`;function Cl(){let a=[],e=[],t=[],o=[],i=(P,S,M,B,D,L)=>{for(let[A,_,v]of[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]]){let h=a.length/3,d=A===0?_===0?[0,1,0]:[1,0,0]:[0,1,0],g=[_*d[2]-v*d[1],v*d[0]-A*d[2],A*d[1]-_*d[0]];for(let[x,w]of[[-1,-1],[1,-1],[1,1],[-1,1]])a.push(B+(A+d[0]*x+g[0]*w)*P/2,D+(_+d[1]*x+g[1]*w)*S/2,L+(v+d[2]*x+g[2]*w)*M/2),e.push(A,_,v);t.push(h,h+1,h+2,h,h+2,h+3)}};i(.14,9,.14,0,3.5,0),i(1.9,.08,.08,.95,7.9,0),o.push([0,t.length,0]);let r=t.length;i(.6,.14,.26,yt.reach,yt.height,0),o.push([r,t.length-r,1]);let s=new it;s.setAttribute("position",new ze(a,3)),s.setAttribute("normal",new ze(e,3)),s.setIndex(t);for(let[P,S,M]of o)s.addGroup(P,S,M);let n=new Ie({color:10132898,roughness:.5,metalness:.5}),l=_a.map((P,S)=>{let M=new Ie({color:14606046,roughness:.3,emissive:P,emissiveIntensity:0});return M.name=`lampHead${S}`,M});n.name="lampPost";let c=pr,u=new ba(1,1),f={uMinPx:{value:c.minPx},uPxAngle:{value:.001},uRadius:{value:c.radius},uFade:{value:c.fade},uFloor:{value:c.floor}},m=_a.map((P,S)=>new ft({name:`lampGlow${S}`,vertexShader:mr,fragmentShader:vr,uniforms:{...f,uColor:{value:new Ee}},transparent:!0,depthWrite:!1,blending:2})),p=0,b=0;return{geo:s,mats:l.map(P=>[n,P]),glowGeo:u,glows:m,view:f,get level(){return p},get gain(){return b},get lit(){return p>.2},setLights(P,S){p=P,b=S;for(let M of l)M.emissiveIntensity=P*S*.7;m.forEach((M,B)=>M.uniforms.uColor.value.copy(_a[B]).multiplyScalar(P*S*c.peak))},setView(P,S){f.uPxAngle.value=2*Math.tan(Jt.degToRad(P)/2)/Math.max(1,S)},dispose(){s.dispose(),n.dispose();for(let P of l)P.dispose();u.dispose();for(let P of m)P.dispose()}}}function vo(a,e){let t=new ct;t.name="lamps";let o=[],i=new Ze,r=new ta,s=new ne,n=new ne(1,1,1),l=new ne(0,1,0);for(let c of[0,1]){let u=a.filter(p=>+!!p[4]===c);if(!u.length)continue;let f=new rt(e.geo,e.mats[c],u.length),m=e.lit?new rt(e.glowGeo,e.glows[c],u.length):null;u.forEach(([p,b,P,S],M)=>{f.setMatrixAt(M,i.compose(s.set(p,b,P),r.setFromAxisAngle(l,S),n));let B=p+Math.cos(S)*yt.reach,D=P-Math.sin(S)*yt.reach;o.push(B,b+yt.height-.15,D,c),m?.setMatrixAt(M,i.makeTranslation(B,b+yt.height-.12,D))}),f.computeBoundingSphere(),f.castShadow=!0,f.receiveShadow=!0,f.name="lampPosts",t.add(f),m&&(m.computeBoundingSphere(),m.boundingSphere&&(m.boundingSphere.radius+=4),m.name="lampGlow",m.renderOrder=2,m.userData.noAO=!0,t.add(m))}return t.userData.heads=o,t}function Pl(a,e,t=ko.count){let o=ko,i=t,r=new ct;r.name="lampLights";let s=[];for(let p=0;p<i;p++){let b=new kr(16777215,0,o.range,o.angle,o.penumbra,2);r.add(b,b.target),s.push(b)}a.add(r);let n=new Float64Array(i+1),l=new Float64Array(i+1),c=new Float64Array(i+1),u=new Float64Array(i+1),f=new Uint8Array(i+1),m=new ne;return{update(p,b){p.getWorldDirection(m);let P=Math.hypot(m.x,m.z)||1,S=p.position.x+m.x/P*o.ahead,M=p.position.y,B=p.position.z+m.z/P*o.ahead;n.fill(1/0);for(let A of b)for(let _=0;_<A.length;_+=4){let v=A[_]-S,h=A[_+1]-M,d=A[_+2]-B,g=v*v+h*h+d*d;if(g>=n[i])continue;let x=i;for(;x>0&&n[x-1]>g;)n[x]=n[x-1],l[x]=l[x-1],c[x]=c[x-1],u[x]=u[x-1],f[x]=f[x-1],x--;n[x]=g,l[x]=A[_],c[x]=A[_+1],u[x]=A[_+2],f[x]=A[_+3]}let D=Math.min(Math.sqrt(n[i]),o.far),L=e.level*e.gain*o.power;for(let A=0;A<i;A++){let _=s[A],v=Math.sqrt(n[A]);if(!(v<D)){_.intensity=0;continue}_.intensity=L*(1-Jt.smoothstep(v,D*.6,D)),_.position.set(l[A],c[A],u[A]),_.target.position.set(l[A],c[A]-8,u[A]),_.color.copy(_a[f[A]])}},get active(){return s.filter(p=>p.intensity>0).length},dispose(){r.removeFromParent();for(let p of s)p.dispose()}}}function Tl(a,e){let t=Math.floor(e.length/7),o={uNearTile:{value:new je(-1e4,-1e4)},uNearMask:{value:0}},i=new ft({name:"farLights",vertexShader:mr,fragmentShader:vr,defines:{FAR_MASK:"",TILE:500 .toFixed(1),HALF:nt.toFixed(1)},uniforms:{...a.view,...o,uColor:{value:new Ee(1,1,1).multiplyScalar(a.level*a.gain*pr.peak)}},transparent:!0,depthWrite:!1,blending:2}),r=new rt(a.glowGeo,i,Math.max(1,t)),s=new Ze,n=new Ee;for(let l=0;l<t;l++){let c=l*7,u=e[c+6];r.setMatrixAt(l,s.makeScale(u,u,u).setPosition(e[c],e[c+1],e[c+2])),r.setColorAt(l,n.setRGB(e[c+3],e[c+4],e[c+5]))}return r.count=t,r.frustumCulled=!1,r.renderOrder=2,r.name="farLights",r.userData.noAO=!0,{mesh:r,count:t,setNear(l,c,u){o.uNearTile.value.set(l,c),o.uNearMask.value=u},dispose(){r.removeFromParent(),r.dispose(),i.dispose()}}}var ve={poleStep:38,poleOut:2.2,poleH:11.5,armH:10.3,sag:.6,poleFoot:1200,delStep:12,delCurv:1/250,hairTurn:2.4,hairWin:50,speedStep:1500,speedSpokeStep:1e3,lampStep:60,lampOut:1.2},Fe=()=>({p:[],n:[],u:[],i:[]});function Ot(a,e,t,o,i,r,s=0,n=0){for(let l=0;l<r;l++){let c=l/r*Math.PI*2,u=(l+1)/r*Math.PI*2,f=a.p.length/3;for(let[m,p,b]of[[c,e,o],[u,e,o],[u,t,i],[c,t,i]])a.p.push(s+Math.cos(m)*p,b,n+Math.sin(m)*p),a.n.push(Math.cos(m),0,Math.sin(m)),a.u.push(0,0);a.i.push(f,f+2,f+1,f,f+3,f+2)}}function ht(a,e,t,o,i,r,s){for(let[n,l,c]of[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]]){let u=a.p.length/3,f=n===0?l===0?[0,1,0]:[1,0,0]:[0,1,0],m=[l*f[2]-c*f[1],c*f[0]-n*f[2],n*f[1]-l*f[0]];for(let[p,b]of[[-1,-1],[1,-1],[1,1],[-1,1]])a.p.push(i+(n+f[0]*p+m[0]*b)*e/2,r+(l+f[1]*p+m[1]*b)*t/2,s+(c+f[2]*p+m[2]*b)*o/2),a.n.push(n,l,c),a.u.push(0,0);a.i.push(u,u+1,u+2,u,u+2,u+3)}}function $a(a,e,t,o,i,r=!1){let s=a.p.length/3,n=r?-1:1;a.p.push(0,o,i),a.n.push(0,0,n),a.u.push(.5,.5);for(let l=0;l<=t;l++){let c=l/t*Math.PI*2;a.p.push(Math.cos(c)*e,o+Math.sin(c)*e,i),a.n.push(0,0,n),a.u.push(0,0)}for(let l=0;l<t;l++)r?a.i.push(s,s+l+2,s+l+1):a.i.push(s,s+l+1,s+l+2)}function kt(a,e,t,o,i,r,s=!1){let n=a.p.length/3,l=s?-1:1;for(let[c,u,f,m]of[[-e/2,o,r[0],r[1]],[e/2,o,r[2],r[1]],[e/2,o+t,r[2],r[3]],[-e/2,o+t,r[0],r[3]]])a.p.push(s?-c:c,u,i),a.n.push(0,0,l),a.u.push(s?r[0]+r[2]-f:f,m);a.i.push(n,n+1,n+2,n,n+2,n+3)}function He(a,e,t,o,i,r){let s=Math.cos(r),n=Math.sin(r),l=a.p.length/3;for(let c=0;c<e.p.length;c+=3){let u=e.p[c],f=e.p[c+2],m=e.n[c],p=e.n[c+2];a.p.push(t+u*s+f*n,o+e.p[c+1],i-u*n+f*s),a.n.push(m*s+p*n,e.n[c+1],-m*n+p*s)}for(let c=0;c<e.u.length;c++)a.u.push(e.u[c]);for(let c of e.i)a.i.push(l+c)}function wt(a,e,t,o,i){let r=t[0]-e[0],s=t[1]-e[1],n=t[2]-e[2],l=i[0]-e[0],c=i[1]-e[1],u=i[2]-e[2],f=s*u-n*c,m=n*l-r*u,p=r*c-s*l,b=Math.hypot(f,m,p)||1,P=a.p.length/3;f/=b,m/=b,p/=b;for(let S of[e,t,o,i])a.p.push(S[0],S[1],S[2]),a.n.push(f,m,p),a.u.push(0,0);a.i.push(P,P+1,P+2,P,P+2,P+3)}function ja(a,e,t,o,i,r){let s=[e.x,e.y+i,e.z],n=[e.x,e.y+r,e.z],l=[t.x,t.y+i,t.z],c=[t.x,t.y+r,t.z],u=[e.x+e.ox*o,e.y+i,e.z+e.oz*o],f=[e.x+e.ox*o,e.y+r,e.z+e.oz*o],m=[t.x+t.ox*o,t.y+i,t.z+t.oz*o],p=[t.x+t.ox*o,t.y+r,t.z+t.oz*o],b=l[0]-s[0],P=l[2]-s[2];b*e.oz-P*e.ox>0?(wt(a,s,l,c,n),wt(a,m,u,f,p),wt(a,n,c,p,f)):(wt(a,l,s,n,c),wt(a,u,m,p,f),wt(a,c,n,f,p))}var gr='"Yu Gothic UI", "Meiryo", "Hiragino Sans", "Noto Sans JP", sans-serif',Ye={rows:64,px:512,rowPx:116,w:5.3,h:1.2,y:2.6,at:62,out:1.6},pt={flat:60,bays:11,bayW:2.7,bayL:5.2,canopy:[14,7,4.6],canopyIn:10},Oo={len:1.2,lift:.03},Ya={rail:ii,post:{size:.5,top:1.4},shed:si},Qe=(a,e)=>Math.atan2(a,e),Dt=8,bt=a=>{let e=a%Dt,t=Math.floor(a/Dt);return[e/Dt+.004,1-(t+1)/Dt+.004,(e+1)/Dt-.004,1-t/Dt-.004]};function Dl(){let a=1024,e=new OffscreenCanvas(a,a),t=e.getContext("2d"),o=a/Dt;t.fillStyle="#8c8f93",t.fillRect(0,0,a,a);let i=s=>[s%Dt*o,Math.floor(s/Dt)*o];for(let[s,n]of[[0,"40"],[1,"50"]]){let[l,c]=i(s);t.fillStyle="#ffffff",t.beginPath(),t.arc(l+o/2,c+o/2,o*.47,0,Math.PI*2),t.fill(),t.strokeStyle="#d0262c",t.lineWidth=o*.11,t.beginPath(),t.arc(l+o/2,c+o/2,o*.4,0,Math.PI*2),t.stroke(),t.fillStyle="#1a3f9a",t.font=`bold ${o*.42}px Arial`,t.textAlign="center",t.textBaseline="middle",t.fillText(n,l+o/2,c+o*.53)}{let[s,n]=i(4),l=s+o/2,c=n+o/2,u=o*.47;t.fillStyle="#111",t.beginPath(),t.moveTo(l,c-u),t.lineTo(l+u,c),t.lineTo(l,c+u),t.lineTo(l-u,c),t.closePath(),t.fill(),t.fillStyle="#f2c81d",t.beginPath(),t.moveTo(l,c-u*.86),t.lineTo(l+u*.86,c),t.lineTo(l,c+u*.86),t.lineTo(l-u*.86,c),t.closePath(),t.fill(),t.fillStyle="#111",t.textAlign="center",t.textBaseline="middle",t.font=`bold ${o*.17}px ${gr}`,t.fillText("落石",l,c-o*.09),t.fillText("注意",l,c+o*.1)}for(let[s,n]of[[2,1],[3,-1]]){let[l,c]=i(s),u=l+o/2,f=c+o/2;t.save(),t.translate(u,f),t.rotate(Math.PI/4),t.fillStyle="#111",t.fillRect(-42.24,-42.24,o*.66,o*.66),t.fillStyle="#f2c81d",t.fillRect(-38.4,-38.4,o*.6,o*.6),t.restore(),t.strokeStyle="#111",t.lineWidth=o*.07,t.beginPath(),t.moveTo(u-n*o*.12,f+o*.22),t.lineTo(u-n*o*.12,f-o*.02),t.quadraticCurveTo(u-n*o*.12,f-o*.14,u+n*o*.04,f-o*.14),t.stroke(),t.fillStyle="#111",t.beginPath(),t.moveTo(u+n*o*.18,f-o*.14),t.lineTo(u+n*o*.04,f-o*.25),t.lineTo(u+n*o*.04,f-o*.03),t.fill()}{let[s,n]=i(5);t.fillStyle="#f2c81d",t.fillRect(s+6,n+6,o-12,o-12),t.fillStyle="#111";for(let l of[.3,.58]){let c=s+o*l;t.beginPath(),t.moveTo(c,n+o*.18),t.lineTo(c+o*.2,n+o*.5),t.lineTo(c,n+o*.82),t.lineTo(c-o*.1,n+o*.82),t.lineTo(c+o*.1,n+o*.5),t.lineTo(c-o*.1,n+o*.18),t.closePath(),t.fill()}}{let[s,n]=i(6);for(let l=0;l<5;l++)t.fillStyle=l%2?"#f4f4f0":"#d3262b",t.fillRect(s+8,n+l*o/5,o-16,o/5);t.fillStyle="#8c8f93",t.beginPath(),t.moveTo(s,n+o*.55),t.lineTo(s+o/2-2,n+o),t.lineTo(s,n+o),t.fill(),t.beginPath(),t.moveTo(s+o,n+o*.55),t.lineTo(s+o/2+2,n+o),t.lineTo(s+o,n+o),t.fill()}for(let s=8;s<64;s++){let[n,l]=i(s);t.fillStyle="#1d4f9c",t.fillRect(n+4,l+o*.2,120,o*.6),t.strokeStyle="#ffffff",t.lineWidth=4,t.strokeRect(n+9,l+o*.2+5,110,o*.6-10),t.fillStyle="#ffffff",t.font=`bold ${o*.3}px Arial`,t.textAlign="center",t.textBaseline="middle",t.fillText(`No.${s-7}`,n+o/2,l+o/2)}let r=new gt(e);return r.colorSpace=mt,r.anisotropy=4,r}var xr={concrete:!0,metal:!0,orange:!0,white:!1,mirror:!1,signs:!0,checker:!1,boards:!0};function wr(){let a=Fe(),e=Fe(),t=Fe(),o=Fe(),i=Fe(),r=Fe(),s=Fe();Ot(a,.19,.12,-4,ve.poleH,8),ht(e,2.2,.1,.1,0,ve.armH,0);for(let S of[-.9,0,.9])Ot(e,.04,.03,ve.armH+.05,ve.armH+.22,5,S,0);Ot(e,.26,.26,7.6,8.5,8,0,.3),Ot(t,.05,.05,-.5,3,6),$a(t,.47,16,3.25,.05,!0),$a(o,.42,16,3.25,.07),ht(i,.08,1.2,.08,0,.4,0),$a(r,.05,10,.9,.045),Ot(s,.04,.04,-.5,2.2,6);let n=Dl(),l=new OffscreenCanvas(64,16),c=l.getContext("2d");for(let S=0;S<2;S++)for(let M=0;M<8;M++)c.fillStyle=(M+S)%2?"#f2f2f2":"#15171a",c.fillRect(M*8,S*8,8,8);let u=new gt(l);u.wrapS=xt,u.magFilter=eo,u.colorSpace=mt;let f=new OffscreenCanvas(Ye.px,Ye.rows*Ye.rowPx),m=f.getContext("2d");m.fillStyle="#1d4f9c",m.fillRect(0,0,f.width,f.height);let p=new gt(f);p.colorSpace=mt,p.anisotropy=4;let b=new Map,P={checker:new Ie({map:u,roughness:.85,side:2,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}),boards:new Ie({map:p,roughness:.5}),concrete:new Ie({color:9407878,roughness:.95}),metal:new Ie({color:9277590,roughness:.5,metalness:.6}),orange:new Ie({color:13134124,roughness:.7}),white:new Ie({color:16053488,roughness:.85}),mirror:new Ie({color:16777215,roughness:.04,metalness:1}),signs:new Ie({map:n,roughness:.45}),wire:new Fr({color:1776928})};return P.concrete.onBeforeCompile=S=>{S.vertexShader=S.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vCnP;
varying vec3 vCnN;`).replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
	vCnP = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;
	vCnN = normalize( mat3( modelMatrix ) * objectNormal );`),S.fragmentShader=S.fragmentShader.replace("#include <common>",`#include <common>
varying vec3 vCnP;
varying vec3 vCnN;
float cnH( vec2 p ) { return fract( sin( dot( p, vec2( 127.1, 311.7 ) ) ) * 43758.5453 ); }
float cnN( vec2 p ) { vec2 i = floor( p ), f = fract( p ); f = f * f * ( 3.0 - 2.0 * f ); return mix( mix( cnH( i ), cnH( i + vec2( 1.0, 0.0 ) ), f.x ), mix( cnH( i + vec2( 0.0, 1.0 ) ), cnH( i + 1.0 ), f.x ), f.y ); }`).replace("#include <map_fragment>",`#include <map_fragment>
	{
		// вдоль грани: у вертикальной — по горизонтали грани, у горизонтальной (низ настила) — по x
		float side = 1.0 - abs( vCnN.y );
		float u = side > 0.5 ? dot( vCnP.xz, normalize( vec2( - vCnN.z, vCnN.x ) + 1e-5 ) ) : vCnP.x + vCnP.z * 0.3;
		float fw = max( fwidth( u ), fwidth( vCnP.y ) );
		float fade = 1.0 - smoothstep( 0.15, 0.6, fw );
		float joint = ( 1.0 - smoothstep( 0.0, 0.05 + fw, abs( fract( u / 6.0 + 0.5 ) - 0.5 ) * 6.0 ) ) * side;
		float form = ( 1.0 - smoothstep( 0.0, 0.03 + fw, abs( fract( vCnP.y / 1.2 + 0.5 ) - 0.5 ) * 1.2 ) ) * side;
		float tone = cnN( vec2( u, vCnP.y ) * 0.08 ) * 0.6 + cnN( vec2( u, vCnP.y ) * 0.5 ) * 0.4;
		float streak = cnN( vec2( u * 1.3, vCnP.y * 0.06 ) ) * side;
		diffuseColor.rgb *= ( 0.86 + 0.2 * tone ) * ( 1.0 - 0.18 * smoothstep( 0.55, 0.9, streak ) );
		diffuseColor.rgb *= 1.0 - fade * ( 0.28 * joint + 0.1 * form );
	}`)},P.concrete.customProgramCacheKey=()=>"roadsideConcrete",Object.entries(P).forEach(([S,M])=>{M.name=`roadside_${S}`}),{tpl:{pole:a,arm:e,mirror:t,mirrorFace:o,del:i,delRef:r,signPole:s},mats:P,boardUV(S,M=""){let B=S.cl,D=1/0,L=-1/0;if(!b.has(S.id))for(let A=0;A<B.n;A+=5){let _=B.pos[3*A+1];_<D&&(D=_),_>L&&(L=_)}return this.boardText(S.id,String(S.data.name),`${(B.length/1e3).toFixed(1).replace(".",",")} км · ${Math.round(L-D)} м`,M)},boardText(S,M,B="",D=""){let L=b.get(S);if(L===void 0){L=b.size%Ye.rows,b.set(S,L);let A=L*Ye.rowPx,_=Ye.rowPx,v=Ye.px;m.fillStyle="#1d4f9c",m.fillRect(0,A,v,_),m.strokeStyle="#ffffff",m.lineWidth=5,m.strokeRect(6,A+6,v-12,_-12),m.fillStyle="#ffffff",m.textBaseline="middle",m.textAlign="left";let h=B?v*.56:v-48;D?(m.font=`bold ${Math.round(_*.44)}px ${gr}`,m.fillText(D,24,A+_*.36,h),m.font=`${Math.round(_*.24)}px "Segoe UI", Arial, sans-serif`,m.fillText(M,26,A+_*.76,h)):(m.font=`bold ${Math.round(_*.52)}px "Segoe UI", Arial, sans-serif`,m.fillText(M,24,A+_/2+2,h)),m.textAlign="right",m.font=`${Math.round(_*.3)}px "Segoe UI", Arial, sans-serif`,B&&m.fillText(B,v-22,A+_/2+2,v*.36),p.needsUpdate=!0}return[1-(L+1)/Ye.rows,1-L/Ye.rows]},dispose(){u.dispose(),p.dispose(),n.dispose();for(let S of Object.values(P))S.dispose()}}}function lo(a){let e=a.cl,t=e.n,o=Math.max(2,Math.round(ve.hairWin/e.step/2)),i=[];for(let r=o;r<t-o;r++){let s=0;for(let l=r-o;l<=r+o;l++)s+=e.curvature[l]*e.step;if(Math.abs(s)<ve.hairTurn)continue;let n=r;for(let l=r-o;l<=r+o;l++)Math.abs(e.curvature[l])>Math.abs(e.curvature[n])&&(n=l);i.length&&Math.abs(i[i.length-1].row-n)*e.step<80||i.push({row:n,right:s>0})}return i.sort((r,s)=>s.row-r.row),i.map((r,s)=>({...r,no:s+1}))}var Io=new WeakMap;function yr(a){let e=Io.get(a.graph);if(e)return e;let{graph:t,world:o}=a,i=t.ring.cl;return e=t.nodes.filter(r=>r.kind==="ringx").map(r=>{let s=1/0,n=0;for(let c=0;c<i.n;c++){let u=Math.hypot(i.pos[3*c]-r.x,i.pos[3*c+2]-r.z);u<s&&(s=u,n=c)}let l=o.districts[r.district];return{id:l.id,name:l.name,nameJa:l.nameJa||"",s:i.s[n],outRight:i.right[3*n]*r.x+i.right[3*n+2]*r.z>0}}),Io.set(t,e),e}var vt={course:(a,e,t)=>e.boardUV(t,a.world.courses.find(o=>o.id===t.id)?.nameJa||""),view:a=>a.boardText("viewpoint","Смотровая","","展望台"),spoke:(a,e,t)=>{let o=a.world.districts[t.district];return e.boardText("to_"+o.id,o.name,`${(t.cl.length/1e3).toFixed(1).replace(".",",")} км`,o.nameJa||"")},parking:a=>a.boardText("parking","Стоянка · заправка","","P 駐車場"),ringA:(a,e)=>{let t=e.nameJa||e.name;return a.boardText("ring_a_"+e.id,e.name,"",e.outRight?t+" →":"← "+t)},ringB:(a,e)=>{let t=e.nameJa||e.name;return a.boardText("ring_b_"+e.id,e.name,"",e.outRight?"← "+t:t+" →")}};function zl(a,e){for(let t of a.graph.roads){let o=t.data.kind;if(o==="course")vt.course(a,e,t),t.view&&t.view.kind==="view"&&vt.view(e);else if(o==="spoke")vt.spoke(a,e,t),t.view&&vt.parking(e);else if(o==="ring")for(let i of yr(a))vt.ringA(e,i),vt.ringB(e,i)}}function so(a,e,t,o=0,i=0){let{cl:r,data:s}=a,n=ri(s,r,e),l=t>0?n.d.length-1:0,c=3*e,u=Math.hypot(r.right[c],r.right[c+2])||1,f=r.right[c]/u,m=r.right[c+2]/u,p=n.d[l]+(a.view&&a.view.sign===t?t*a.view.extra[e]:0);return{x:r.pos[c]+r.right[c]*p-o,y:r.pos[c+1]+r.right[c+1]*p+r.up[c+1]*n.h[l],z:r.pos[c+2]+r.right[c+2]*p-i,ox:t*f,oz:t*m,tx:r.tan[c],tz:r.tan[c+2]}}var Xe=(a,e)=>{let t=Math.round(e/a.step);return a.closed?(t%a.n+a.n)%a.n:Math.min(a.n-1,Math.max(0,t))};function Rl(a,e){let t=[],o=ve.lampOut-yt.reach,i=r=>t.push(r.x+r.ox*o,r.y+yt.height-.15,r.z+r.oz*o);for(let r of a.graph.roads){let s=r.cl,n=s.length;if(r.data.kind==="ring"||r.data.kind==="spoke"){for(let c=0;c*ve.lampStep<n;c++){let u=c*ve.lampStep;!s.closed&&(u<30||u>n-30)||i(so(r,Xe(s,u),-1))}continue}let l=e.get(r.idx);l||e.set(r.idx,l=lo(r));for(let c of l)i(so(r,Xe(s,s.s[c.row]-8),c.right?-1:1))}return t}function*Fl(a,e,t,o,i=null){let r=[],{graph:s,index:n}=a,[l,,c]=e.origin,u=t.tpl,f={concrete:Fe(),metal:Fe(),orange:Fe(),white:Fe(),mirror:Fe(),signs:Fe(),checker:Fe(),boards:Fe()},m=[],p=[],b=a.height?.roadHit?a.height:null,P=l,S=c,M=-1,B=(v,h,d,g=NaN)=>!!b&&b.roadHit(v+P,h+S,d,M,g),D=(v,h)=>{let d=v.x+v.ox*ve.lampOut,g=v.z+v.oz*ve.lampOut;B(d,g,v.y)||p.push([d,v.y,g,Math.atan2(v.oz,-v.ox),h])},L=(v,h,d)=>so(v,h,d,l,c);for(let v of n.pieces.get(e.id)||[]){let h=s.roads[v.road],d=h.cl,g=h.data.kind,x=d.length,w=C=>C*d.step,y=(C,O,z,U)=>{let H=U[0],k=U[1],V=Xe(d,d.closed?(C%x+x)%x:C);if(V<v.from||V>=v.to)return;let F=L(h,V,O),j=F.x+F.ox*Ye.out,ee=F.z+F.oz*Ye.out,K=Qe(F.tx*z,F.tz*z);if(B(j,ee,F.y,C))return;let oe=Fe(),J=Fe(),fe=Fe();kt(oe,Ye.w,Ye.h,Ye.y,.06,[0,H,1,k]),kt(J,Ye.w,Ye.h,Ye.y,.03,bt(7),!0);for(let se of[-5.3/2+.3,Ye.w/2-.3])Ot(fe,.05,.05,-.5,Ye.y+Ye.h,6,se,0);He(f.boards,oe,j,F.y,ee,K),He(f.signs,J,j,F.y,ee,K),He(f.metal,fe,j,F.y,ee,K)},E=ve.poleStep,R=g==="course"?-1:1;M=h.idx;for(let C=Math.ceil(w(v.from)/E);C*E<w(v.to);C++){let O=C*E;if(g==="link"||g==="course"&&O<x-ve.poleFoot||!d.closed&&(O<25||O>x-25))continue;let z=L(h,Xe(d,O),R),U=z.x+z.ox*ve.poleOut,H=z.z+z.oz*ve.poleOut,k=Qe(z.tx,z.tz);if(B(U,H,z.y,O))continue;He(f.concrete,u.pole,U,z.y,H,k),He(f.metal,u.arm,U,z.y,H,k);let V=O+E,F=L(h,Xe(d,V),R);if((g==="course"?V<=x-25:d.closed||V<=x-25)&&!B(F.x+F.ox*ve.poleOut,F.z+F.oz*ve.poleOut,F.y,V)){let j=F,ee=j.x+j.ox*ve.poleOut,K=j.z+j.oz*ve.poleOut,oe=Qe(j.tx,j.tz),J=Math.cos(k),fe=Math.sin(k),se=Math.cos(oe),pe=Math.sin(oe);for(let we of[-.9,0,.9]){let Me=U+we*J,Re=H-we*fe,Ne=z.y+ve.armH+.22,Ue=ee+we*se,ye=K-we*pe,ge=j.y+ve.armH+.22;for(let ke=0;ke<8;ke++){let We=ke/8,G=(ke+1)/8,X=Z=>ve.sag*4*Z*(1-Z);m.push(Me+(Ue-Me)*We,Ne+(ge-Ne)*We-X(We),Re+(ye-Re)*We,Me+(Ue-Me)*G,Ne+(ge-Ne)*G-X(G),Re+(ye-Re)*G)}}}}if(yield,g==="ring"||g==="spoke")for(let C=Math.ceil(w(v.from)/ve.lampStep);C*ve.lampStep<w(v.to);C++){let O=C*ve.lampStep;!d.closed&&(O<30||O>x-30)||D(L(h,Xe(d,O),-R),0)}for(let C=Math.ceil(w(v.from)/ve.delStep);C*ve.delStep<w(v.to);C++){let O=C*ve.delStep;if(!d.closed&&(O<30||O>x-30))continue;let z=Xe(d,O),U=d.curvature[z];if(Math.abs(U)<ve.delCurv)continue;let H=L(h,z,U>0?-1:1),k=H.x+H.ox*.45,V=H.z+H.oz*.45,F=Qe(-H.ox,-H.oz);B(k,V,H.y,O)||(He(f.white,u.del,k,H.y,V,F),He(f.orange,u.delRef,k,H.y,V,F))}yield;let T=g==="course"?ve.speedStep:ve.speedSpokeStep,I=bt(g==="course"?0:1);for(let C=Math.ceil((w(v.from)-200)/T);200+C*T<w(v.to);C++){let O=200+C*T;if(O<w(v.from)||!d.closed&&O>x-60)continue;let z=L(h,Xe(d,O),1),U=z.x+z.ox*.9,H=z.z+z.oz*.9,k=Qe(-z.tx,-z.tz);B(U,H,z.y,O)||Sa(f,u,U,z.y,H,k,I,.6)}if(g==="course"){let C=d.width[0]/2,O=(h.data.crossSection.crownPercent||0)/100;for(let U of[h.data.start.s,h.data.finish.s]){let H=Xe(d,U);if(H<v.from||H>=v.to)continue;let k=(F,j,ee)=>{let K=3*F,oe=-Math.abs(j)*O+Oo.lift;return[d.pos[K]+d.right[K]*j+d.up[K]*oe-l,d.pos[K+1]+d.right[K+1]*j+d.up[K+1]*oe,d.pos[K+2]+d.right[K+2]*j+d.up[K+2]*oe-c,ee]},V=Math.min(d.n-1,H+Math.max(1,Math.round(Oo.len/d.step)));for(let[F,j]of[[-C,0],[0,C]]){let ee=k(H,F,F/2),K=k(H,j,j/2),oe=k(V,j,j/2),J=k(V,F,F/2),fe=f.checker.p.length/3;[ee,K,oe,J].forEach((se,pe)=>{f.checker.p.push(se[0],se[1],se[2]),f.checker.n.push(0,1,0),f.checker.u.push(se[3],pe<2?0:1)}),f.checker.i.push(fe,fe+2,fe+1,fe,fe+3,fe+2)}}for(let[U,H,k]of[[Ye.at,1,-1],[x-Ye.at,-1,1]])y(U,H,k,vt.course(a,t,h));if(h.view&&h.view.kind==="view"){let U=h.view,H=vt.view(t);y(U.sFrom-80,U.sign,-1,H),y(U.sTo+80,U.sign,1,H)}let z=a.height.walls[h.idx];if(z)for(let[U,H]of[[1,-1],[2,1]]){let k=-1/0;for(let V=Math.max(1,v.from);V<v.to;V++){if(!(z.flags[V]&U)||z.flags[V-1]&U)continue;let F=V;for(;F+1<d.n&&z.flags[F+1]&U;)F++;if(!(F-V<30||d.s[V]-k<400)){k=d.s[V];for(let[j,ee]of[[V-10,-1],[F+10,1]]){if(j<v.from||j>=v.to)continue;let K=L(h,j,H),oe=K.x+K.ox*.9,J=K.z+K.oz*.9;Sa(f,u,oe,K.y,J,Qe(K.tx*ee,K.tz*ee),bt(4),.7)}}}}}if(yield,g==="spoke"&&(y(90,1,-1,vt.spoke(a,t,h)),h.view&&y(h.view.sFrom-70,h.view.sign,-1,vt.parking(t))),g==="ring")for(let C of yr(a))y(C.s-120,1,-1,vt.ringA(t,C)),y(C.s+120,-1,1,vt.ringB(t,C));if(h.view&&h.view.kind==="parking"){let C=h.view,O=C.s-pt.flat/2,z=H=>{let k=Xe(d,H);return k>=v.from&&k<v.to?L(h,k,C.sign):null};for(let H=0;H<=pt.bays;H++){let k=z(O+2+H*pt.bayW);if(!k)continue;let V=Fe();ht(V,.12,.02,pt.bayL,0,.02,0),He(f.white,V,k.x-k.ox*(1.2+pt.bayL/2),k.y,k.z-k.oz*(1.2+pt.bayL/2),Qe(k.ox,k.oz))}for(let H of[O+12,O+pt.flat-8]){let k=z(H);k&&D(k,1)}let U=z(O+pt.flat-pt.canopy[0]/2-3);if(U){let H=Qe(U.ox,U.oz),k=U.x-U.ox*pt.canopyIn,V=U.z-U.oz*pt.canopyIn,F=Fe(),j=Fe(),ee=Fe(),K=Fe(),oe=Fe(),[J,fe,se]=pt.canopy;ht(F,J,.35,fe,0,se+.175,0),ht(j,J+.1,.5,fe+.1,0,se+.2,0);for(let pe of[-J/2+1.2,J/2-1.2])ht(ee,.35,se,.35,pe,se/2,0),ht(K,.9,1.5,.5,pe*.45,.85,0),ht(ee,2.6,.2,1.2,pe*.45,.1,0);for(let pe of[1.6,2.6,3.6]){let we=pt.canopyIn-5,Me=Math.cos(H),Re=Math.sin(H);r.push(k+pe*Me+we*Re,U.y,V-pe*Re+we*Me,H+Math.PI)}ht(oe,9,3.2,4,0,1.6,pt.canopyIn-2.6),He(f.white,F,k,U.y,V,H),He(f.orange,j,k,U.y,V,H),He(f.metal,ee,k,U.y,V,H),He(f.orange,K,k,U.y,V,H),He(f.concrete,oe,k,U.y,V,H)}}if(h.view&&h.view.kind==="view"){let C=h.view;for(let O of[-5,5]){let z=Xe(d,C.s+O);if(z<v.from||z>=v.to)continue;let U=L(h,z,C.sign),H=U.x-U.ox*1.3,k=U.z-U.oz*1.3,V=Qe(U.ox,U.oz),F=Fe();ht(F,1.8,.07,.42,0,.45,0),ht(F,1.8,.3,.06,0,.72,-.2);for(let j of[-.75,.75])ht(F,.08,.45,.4,j,.22,0);He(f.concrete,F,H,U.y,k,V)}for(let O of[11,12]){let z=Xe(d,C.s+O);if(z<v.from||z>=v.to)continue;let U=L(h,z,C.sign);r.push(U.x-U.ox*2.4,U.y,U.z-U.oz*2.4,Qe(U.ox,U.oz)+Math.PI)}}yield;for(let C of(h.data.structures||[]).filter(O=>O.type==="viaduct"||O.type==="tunnel"||g==="course")){let O=Xe(d,C.sFrom),z=Xe(d,C.sTo),U=Math.max(v.from,O),H=Math.min(v.to,z);if(H<=U)continue;let k=(F,j,ee)=>{let K=L(h,F,j);return{x:K.x+K.ox*ee,y:K.y,z:K.z+K.oz*ee,ox:K.ox,oz:K.oz}},V=C.type==="viaduct";if(C.type==="bridge"||V){let F=V?{out:.75,skirt:2.2,thick:.3,top:1.1,ext:0}:Ya.rail,j=Ya.post;for(let oe=U;oe<H;oe+=2){let J=Math.min(H,oe+2),fe=k(oe,-1,F.out),se=k(oe,1,F.out),pe=k(J,-1,F.out),we=k(J,1,F.out),Me=Re=>[Re.x,Re.y-F.skirt,Re.z];wt(f.concrete,Me(fe),Me(pe),Me(we),Me(se))}for(let oe of li(h,v.from,v.to,(J,fe)=>ua(e.terrain,J-l,fe-c))){let J=Fe(),fe=oe.yTop-oe.yBase;ht(J,oe.size||yo.size,fe,oe.size||yo.size,0,-fe/2,0),He(f.concrete,J,oe.x-l,oe.yTop,oe.z-c,oe.yaw)}let ee=Math.max(v.from,O-Math.round(F.ext/d.step)),K=Math.min(v.to,z+Math.round(F.ext/d.step));for(let oe of[-1,1]){for(let J=ee;J<K;J+=2)d.open&&(d.open[J]|d.open[Math.min(K,J+2)])&(oe>0?2:1)||ja(f.concrete,k(J,oe,F.out),k(Math.min(K,J+2),oe,F.out),F.thick,-F.skirt,F.top);for(let J of[O-Math.round(F.ext/d.step),z+Math.round(F.ext/d.step)]){if(J<v.from||J>v.to)continue;let fe=L(h,J,oe),se=Fe();ht(se,j.size,j.top+F.skirt,j.size,0,(j.top-F.skirt)/2,0),He(f.concrete,se,fe.x+fe.ox*(F.out+F.thick/2),fe.y,fe.z+fe.oz*(F.out+F.thick/2),Qe(fe.tx,fe.tz))}}}else{let F=Ya.shed;for(let j=U;j<H;j+=F.step){if(d.open&&(d.open[j]|d.open[Math.min(H,j+F.step)])&16)continue;let ee=Math.min(H,j+F.step),K=k(j,-1,F.out),oe=k(ee,-1,F.out),J=k(j,1,F.out),fe=k(ee,1,F.out);ja(f.concrete,K,oe,F.thick,-.5,F.top+F.roof),ja(f.concrete,J,fe,F.thick,-.5,F.top+F.roof);let se=(pe,we)=>[pe.x,pe.y+we,pe.z];wt(f.concrete,se(K,F.top),se(J,F.top),se(fe,F.top),se(oe,F.top)),wt(f.concrete,se(K,F.top+F.roof),se(oe,F.top+F.roof),se(fe,F.top+F.roof),se(J,F.top+F.roof))}for(let[j,ee]of[[O,1],[z,-1]]){if(j<v.from||j>v.to)continue;let K=k(j,-1,F.out),oe=k(j,1,F.out),J=(se,pe,we=0)=>[se.x+se.ox*we,se.y+pe,se.z+se.oz*we],fe=(se,pe,we,Me)=>ee>0?wt(f.concrete,se,pe,we,Me):wt(f.concrete,pe,se,Me,we);fe(J(K,-.5,F.thick),J(K,-.5),J(K,F.top+F.roof),J(K,F.top+F.roof,F.thick)),fe(J(oe,-.5),J(oe,-.5,F.thick),J(oe,F.top+F.roof,F.thick),J(oe,F.top+F.roof)),fe(J(K,F.top),J(oe,F.top),J(oe,F.top+F.roof),J(K,F.top+F.roof))}}}let N=h.data.scenery?.roadside;if(N)for(let C=Math.ceil(w(v.from)/E);C*E<w(v.to);C++){let O=C*E;if(O<25||O>x-25||(h.data.structures||[]).some(H=>H.type==="tunnel"&&O>H.sFrom-10&&O<H.sTo+10))continue;let z=L(h,Xe(d,O),1),U=Qe(z.tx,z.tz);B(z.x+z.ox*ve.poleOut,z.z+z.oz*ve.poleOut,z.y,O)||(He(f.concrete,u.pole,z.x+z.ox*ve.poleOut,z.y,z.z+z.oz*ve.poleOut,U),He(f.metal,u.arm,z.x+z.ox*ve.poleOut,z.y,z.z+z.oz*ve.poleOut,U)),N==="town"&&C%2==0&&D(L(h,Xe(d,O),-1),0)}if(g==="course"||g==="link"){let C=(z,U)=>{let H=Xe(d,z);if(H<v.from||H>=v.to||z<20||z>x-20)return;let k=L(h,H,U);if(B(k.x+k.ox*.75,k.z+k.oz*.75,k.y,z))return;let V=Fe();Ot(V,.035,.035,-.4,1.35,6,0,-.04),He(f.metal,V,k.x+k.ox*.75,k.y,k.z+k.oz*.75,Qe(-k.ox,-k.oz));let F=Fe();kt(F,.55,.72,.62,0,bt(5),U>0),kt(F,.55,.72,.62,-.02,bt(7),U<0),He(f.signs,F,k.x+k.ox*.75,k.y,k.z+k.oz*.75,Qe(-k.ox,-k.oz))},O=o.get(h.idx);O||o.set(h.idx,O=lo(h));for(let z of O)for(let U=-2;U<=2;U++)C(d.s[z.row]+U*7,z.right?-1:1);for(let z=Math.ceil(w(v.from)/55);z*55<w(v.to);z++){let U=z*55,H=d.curvature[Xe(d,U)];if(!(Math.abs(H)<1/45||O.some(k=>Math.abs(d.s[k.row]-U)<60)))for(let k=-1;k<=1;k++)C(U+k*7,H>0?-1:1)}for(let z=Math.ceil(w(v.from)/42);z*42<w(v.to);z++){let U=z*42,H=Xe(d,U);if(U<30||U>x-30||d.pos[3*H+1]<(h.data.region?1100:420))continue;let k=L(h,H,1);if(B(k.x+k.ox*.9,k.z+k.oz*.9,k.y,U))continue;let V=Fe();Ot(V,.04,.04,-.4,4.6,6,0,0),ht(V,.06,.06,1.1,0,4.55,-.5),He(f.white,V,k.x+k.ox*.9,k.y,k.z+k.oz*.9,Qe(-k.ox,-k.oz));let F=Fe();kt(F,.32,.9,3.7,-1,bt(6)),kt(F,.32,.9,3.7,-1.02,bt(6),!0),He(f.signs,F,k.x+k.ox*.9,k.y,k.z+k.oz*.9,Qe(-k.ox,-k.oz)+Math.PI/2)}}if(yield,g==="course"){let C=o.get(h.idx);C||o.set(h.idx,C=lo(h));for(let O of C){if(O.row<v.from||O.row>=v.to)continue;let z=O.right?-1:1,U=L(h,O.row,z),H=U.x+U.ox*1.6,k=U.z+U.oz*1.6,V=Qe(-U.ox,-U.oz);He(f.orange,u.mirror,H,U.y,k,V),He(f.mirror,u.mirrorFace,H,U.y,k,V),D(L(h,Xe(d,d.s[O.row]-8),z),0);let F=d.s[O.row]+35;if(F<x-30){let j=L(h,Xe(d,F),-1),ee=Qe(j.tx,j.tz);Sa(f,u,j.x+j.ox*.9,j.y,j.z+j.oz*.9,ee,bt(O.right?3:2),.75),O.no<=56&&Sa(f,u,j.x+j.ox*.9-j.tx*3,j.y,j.z+j.oz*.9-j.tz*3,ee,bt(7+O.no),.75,1.35)}}}yield}let A=new ct;A.name="roadside";let _=(v,h,d)=>{if(!v.i.length)return;let g=new it;g.setAttribute("position",new ze(v.p,3)),g.setAttribute("normal",new ze(v.n,3)),g.setAttribute("uv",new ze(v.u,2)),g.setIndex(v.i),g.computeBoundingSphere();let x=new ot(g,h);x.castShadow=d,x.receiveShadow=!0,A.add(x)};for(let[v,h]of Object.entries(xr))_(f[v],t.mats[v],h);if(r.length&&t.vend){let v=new Cr(t.vend.geo,t.vend.mats,r.length/4),h=new Ze;for(let d=0;d<r.length;d+=4)v.setMatrixAt(d/4,h.makeRotationY(r[d+3]).setPosition(r[d],r[d+1],r[d+2]));v.castShadow=!0,v.receiveShadow=!0,v.name="roadVending",v.computeBoundingSphere(),A.add(v)}return m.length&&(new it,A.add(Fa(m))),i&&p.length&&A.add(vo(p,i)),A}function Sa(a,e,t,o,i,r,s,n,l=0){He(a.metal,e.signPole,t,o+l,i,r);let c=Fe();kt(c,n,n,2+l,.05,s),kt(c,n,n,2+l,.03,bt(7),!0),He(a.signs,c,t,o,i,r)}function Uo(a){a.removeFromParent(),a.traverse(e=>{let t=e;t.geometry&&t.geometry.dispose()}),a.clear()}var Ll=`
attribute float aKind;
varying vec3 vFacLocal;
varying vec3 vFacScale;
varying vec3 vFacNormal;
varying float vFacSeed;
varying float vFacKind;
varying vec3 vFacView;
attribute float aSeed;
varying float vFacNear;
uniform vec2 uNearC;
`,Al=`
varying vec3 vFacLocal;
varying vec3 vFacScale;
varying vec3 vFacNormal;
varying float vFacSeed;
varying float vFacKind;
varying float vFacNear;    // 1 — дом в ячейке 125 м ближе 110 м к машине: рамы, балконы и т. п. — геометрия (facadeDetail.js)
varying vec3 vFacView;     // от камеры к точке в осях дома, м: откосы окон и комнаты за стеклом
uniform float uDayLum;     // яркость белой поверхности под дневным светом (0 ночью): свет витрин и мастерских днём
uniform sampler2D tFacDet;   // фактура (facade_detail.jpg): R штукатурка, G бетон, B доски — яркость около 0,5
uniform sampler2D tFacGrime; // потёки и грязь (facade_grime.jpg): вертикальные полосы
uniform sampler2D tSigns;    // атлас вывесок с японским текстом (beauty.js signAtlas)
uniform vec3 uBounce;      // отражённый от земли и домов напротив свет на стены (тёплый, от солнца)
// хэш без синуса (он дорог на встроенной видеокарте): дробные части и скалярное произведение
float fHash( vec2 p ) { vec3 q = fract( vec3( p.xyx ) * 0.1031 ); q += dot( q, q.yzx + 33.33 ); return fract( ( q.x + q.y ) * q.z ); }
float fNoise( vec2 p ) { vec2 i = floor( p ), f = fract( p ); f = f * f * ( 3.0 - 2.0 * f ); return mix( mix( fHash( i ), fHash( i + vec2( 1.0, 0.0 ) ), f.x ), mix( fHash( i + vec2( 0.0, 1.0 ) ), fHash( i + vec2( 1.0, 1.0 ) ), f.x ), f.y ); }
vec3 fPick( float s, vec3 a, vec3 b, vec3 c, vec3 d, vec3 e ) { return s < 0.2 ? a : s < 0.4 ? b : s < 0.6 ? c : s < 0.8 ? d : e; }
uniform float uNight;
// условный знак вывески: клетка 5 × 5 из хэша с пустыми краями; p — 0…1 внутри знака
float fGlyph( vec2 p, float id ) { vec2 c = floor( p * 5.0 ); if ( c.x < 0.5 || c.x > 3.5 || c.y < 0.5 || c.y > 3.5 ) return 0.0; return step( 0.42, fHash( c + id * 13.7 ) ); }
// окно в стене: на раме красит её цвет, в проёме возвращает 1 — проём (откосы, стекло, комната) считает общий блок
// после стилей. cu, cy — от центра окна; hw, hh — половины проёма; fr — рама
float fWin( inout vec3 col, vec3 frameCol, float cu, float cy, float hw, float hh, float fr ) {
	float ax = abs( cu ), ay = abs( cy );
	if ( ax > hw + fr || ay > hh + fr ) return 0.0;
	if ( ax > hw || ay > hh ) { col = frameCol; return 0.0; }
	return 1.0;
}
// вывеска из атласа: idx — номер, p — 0…1 на лице, S — размер лица (м), fw — метров на пиксель. Текст — по центру в своих
// пропорциях (4:1 или 1:4), по сторонам — фон (край клетки); уровень мипа считается сам — можно звать из ветвей
vec3 fSignTex( float idx, vec2 p, vec2 S, float fw ) {
	float j = mod( floor( idx ), 32.0 );
	vec2 uv;
	float lod;
	if ( S.y > S.x * 1.5 ) {
		float c = clamp( ( p.y - 0.5 ) * S.y / ( S.x * 4.0 ) + 0.5, 0.0, 1.0 );
		uv = vec2( ( mod( j, 16.0 ) + clamp( p.x, 0.0, 1.0 ) ) / 16.0, 1.0 - ( 8.0 + floor( j / 16.0 ) * 4.0 + ( 1.0 - c ) * 4.0 ) / 16.0 );
		lod = log2( max( fw * 128.0 / S.x, 1.0 ) );
	} else {
		float c = clamp( ( p.x - 0.5 ) * S.x / ( S.y * 4.0 ) + 0.5, 0.02, 0.98 );
		uv = vec2( ( mod( j, 4.0 ) + c ) / 4.0, 1.0 - ( floor( j / 4.0 ) + 1.0 - clamp( p.y, 0.0, 1.0 ) ) / 16.0 );
		lod = log2( max( fw * 128.0 / S.y, 1.0 ) );
	}
	return textureLod( tSigns, uv, lod ).rgb;
}
vec3 fSign( float s ) { return s < 0.17 ? vec3( 0.78, 0.10, 0.09 ) : s < 0.34 ? vec3( 0.08, 0.28, 0.68 ) : s < 0.5 ? vec3( 0.10, 0.52, 0.24 ) : s < 0.67 ? vec3( 0.95, 0.62, 0.08 ) : s < 0.84 ? vec3( 0.93, 0.93, 0.9 ) : vec3( 0.86, 0.2, 0.5 ); }
`,El=`
	float fRough = 0.85, fMetal = 0.0;
	vec3 fEmit = vec3( 0.0 );
	// яркость ночного света окон и вывесок: экспозиция ночи высокая, 1,0 давало сплошь белые окна (2026-10-21)
	float nE = uNight * 0.32;
	// рельеф стены без геометрии: наклон нормали в осях фасада (x — вдоль u, y — вверх, z — от стены); fBumpS — знак оси u
	vec3 fBump = vec3( 0.0 );
	float fBumpS = ( vFacNormal.z > 0.5 || vFacNormal.x < -0.5 ) ? 1.0 : -1.0;
	// стекло: доля отражения неба (Френель) и куда смотрит отражённый луч — смешивается в fog_fragment
	float fGlassF = 0.0, fReflY = 0.0, fReflH = 0.0;
	{
		vec3 an = abs( vFacNormal );
		// зерно дома: ступень из 4096 (вершинный шейдер кладёт его в середину ступени) — погрешность интерполяции не меняет хэш.
		// Пометку flat не ставить: на Direct3D браузер ради неё подключает геометрический шейдер — дома стоили 9 мс вместо 3
		float seed = ( floor( vFacSeed * 4096.0 ) + 0.5 ) / 4096.0, floors = max( 1.0, floor( ( vFacScale.y - 0.7 ) / 3.0 + 0.5 ) ), kind = floor( vFacKind + 0.5 );
		float y = vFacLocal.y + vFacScale.y * 0.5;
		// фактура и потёки: две выборки на точку, вне ветвлений (мип-уровень от производных); у каждого дома свой сдвиг
		vec2 tUV = an.y > 0.5 ? vFacLocal.xz : vec2( an.x > 0.5 ? vFacLocal.z : vFacLocal.x, y );
		vec3 tDet = texture2D( tFacDet, tUV / 3.6 + vec2( seed * 7.0, seed * 3.0 ) ).rgb - 0.5;
		float tGrime = texture2D( tFacGrime, ( tUV + vec2( seed * 37.0, 0.0 ) ) / vec2( 5.0, 7.0 ) ).r - 0.5;
		float age = fract( seed * 17.31 );                                  // возраст дома: 0 новый … 1 старый
		bool front = vFacNormal.z > 0.5;
		// производные — один раз и вне ветвлений: с производной внутри ветви видеокарта считает все ветви шейдера для каждой точки
		float fwH = fwidth( vFacLocal.x ) + fwidth( vFacLocal.z ), fwV = fwidth( vFacLocal.y ), det = 1.0 - smoothstep( 0.03, 0.1, fwH + fwV );   // det: издали мелкий рисунок сливается в ровный тон
		// стиль по виду дома: 0 жилой, 1 торговый, 2 балконы, 3 стекло, 4 лента окон, 5 профлист, 6 дерево, 7 теплица
		float st = 0.0;
		if ( kind == 3.0 || kind == 6.0 || kind == 8.0 ) st = 1.0;
		else if ( kind == 4.0 || kind == 2.0 ) st = 2.0;
		else if ( kind == 7.0 || kind == 17.0 || ( kind == 5.0 && floors >= 9.0 ) ) st = 3.0;
		else if ( kind == 5.0 || kind == 12.0 ) st = 4.0;
		else if ( kind == 9.0 || kind == 10.0 || kind == 11.0 || kind == 13.0 || kind == 18.0 ) st = 5.0;
		else if ( kind == 14.0 || kind == 16.0 || kind == 19.0 ) st = 6.0;
		else if ( kind == 15.0 ) st = 7.0;
		else if ( kind == 20.0 || kind == 23.0 ) st = 8.0;
		else if ( kind == 21.0 ) st = 9.0;
		else if ( kind == 22.0 ) st = 10.0;
		else if ( kind == 24.0 ) st = 11.0;
		else if ( kind == 25.0 ) st = 12.0;
		else if ( kind == 27.0 ) st = 6.0;
		else if ( kind == 29.0 ) st = 13.0;
		else if ( kind == 30.0 ) st = 14.0;
		else if ( kind == 32.0 ) st = 15.0;
		else if ( kind == 33.0 ) st = 16.0;
		else if ( kind == 34.0 || kind == 35.0 ) st = 17.0;
		else if ( kind >= 36.0 ) st = 18.0;                                  // детали фасада вблизи (facadeDetail.js)
		vec3 wall = vec3( 0.5 );
		vec3 mW = vec3( 0.0, 0.7, 0.0 );   // доля фактур в стене: штукатурка, бетон, доски (по умолчанию бетон)
		float fStreak = 0.0;               // потёк из-под окна над этой точкой (0…1)
		vec3 glass = vec3( 0.035, 0.045, 0.06 );                           // тёмное: в окне днём темно, а не небо
		// окно: стили только описывают проём (где, какой, что за ним); откосы, стекло и комнату считает общий блок после
		// стилей — один раз на точку, а не в каждой ветке. wType: 0 жилая комната, 1 магазин, 2 контора, 3 бокс (гараж, мастерская)
		float wOn = 0.0, wType = 0.0, wSill = 0.9, wRoomW = 2.7, wLit = 0.45, wFrost = 0.0, wAmado = 0.0, wAband = -1.0, wShopK = 0.0;
		vec2 wP = vec2( 0.0 ), wH = vec2( 1.0 ), wId = vec2( 0.0 );
		vec3 wFrame = vec3( 0.05 );
		vec3 col;
		if ( st > 8.5 ) {                                                    // мелочь у дома: балкон, кондиционер, изгородь, навес
			float u2 = an.x > 0.5 ? vFacLocal.z : vFacLocal.x;
			if ( st < 9.5 ) {
				vec3 pc = fPick( seed, vec3( 0.5, 0.48, 0.44 ), vec3( 0.38 ), vec3( 0.1, 0.1, 0.11 ), vec3( 0.55 ), vec3( 0.24, 0.17, 0.11 ) );
				col = an.y > 0.5 ? vec3( 0.26 ) : pc * ( y > vFacScale.y - 0.07 ? 0.5 : 1.0 ) * ( 0.9 + 0.1 * step( 0.5, fract( u2 / 0.11 ) ) );
			} else if ( st < 10.5 ) {
				col = vec3( 0.5, 0.5, 0.48 );
				if ( an.x > 0.5 && length( vec2( u2, vFacLocal.y ) ) < 0.22 ) col = vec3( 0.1 ) * ( 0.6 + 0.4 * step( 0.5, fract( vFacLocal.y / 0.04 ) ) );
			} else if ( st < 11.5 ) {
				col = vec3( 0.055, 0.13, 0.04 ) * ( 0.65 + 0.7 * fHash( floor( vec2( u2 + vFacLocal.y * 0.37, vFacLocal.y + ( vFacLocal.x + vFacLocal.z ) * 0.21 ) / 0.08 ) + seed ) );
				fRough = 1.0;
			} else if ( st < 12.5 ) col = fPick( fract( seed * 6.1 ), vec3( 0.42, 0.43, 0.43 ), vec3( 0.2, 0.17, 0.14 ), vec3( 0.5, 0.5, 0.48 ), vec3( 0.1, 0.1, 0.11 ), vec3( 0.32, 0.33, 0.34 ) ) * ( 0.88 + 0.12 * step( 0.5, fract( u2 / 0.25 ) ) );   // козырёк: алюминий, бронза, поликарбонат
			else if ( st < 13.5 ) {                                        // эркер: тёмная рама, стекло
				float hx = ( an.x > 0.5 ? vFacScale.z : vFacScale.x ) * 0.5, hy = vFacScale.y * 0.5;
				bool fr = abs( u2 ) > hx - 0.07 || abs( vFacLocal.y ) > hy - 0.07 || abs( u2 ) < 0.025;
				col = an.y > 0.5 ? vec3( 0.06 ) : fr ? vec3( 0.04, 0.04, 0.045 ) : vec3( 0.035, 0.045, 0.06 ) * ( 0.7 + 0.8 * smoothstep( -hy, hy, vFacLocal.y ) );
				if ( !fr && an.y < 0.5 ) { fRough = 0.22; fMetal = 0.2; fEmit = vec3( 1.0, 0.78, 0.52 ) * 0.7 * nE * step( fract( seed * 3.7 ), 0.5 ); }
			} else if ( st > 14.5 && st < 15.5 ) {                         // будка выхода на крышу: бетон, дверь
				col = an.y > 0.5 ? vec3( 0.14 ) : vec3( 0.27, 0.27, 0.26 ) * ( 0.85 + 0.15 * step( 0.5, fract( vFacLocal.y / 0.3 ) ) );
				if ( an.z > 0.5 && abs( u2 ) < 0.45 && vFacLocal.y < 0.5 ) col = vec3( 0.07, 0.08, 0.09 );
			} else if ( st > 15.5 && st < 16.5 ) {                         // бак с водой на тёмном основании
				col = vFacLocal.y < -vFacScale.y * 0.5 + 0.45 ? vec3( 0.06 ) : vec3( 0.33, 0.37, 0.39 ) * ( 0.85 + 0.15 * step( 0.12, fract( vFacLocal.y / 0.45 ) ) );
			} else if ( st > 17.5 ) {                                      // детали фасада вблизи; вариант — дробная часть вида × 40
				float vr = floor( fract( vFacKind ) * 40.0 + 0.5 ), hx = ( an.x > 0.5 ? vFacScale.z : vFacScale.x ) * 0.5, hy = vFacScale.y * 0.5;
				vec3 alu = mod( vr, 2.0 ) > 0.5 ? vec3( 0.07, 0.07, 0.075 ) : vec3( 0.5, 0.51, 0.51 );   // рама: тёмная или серебристая
				bool topF = an.y > 0.5 && vFacNormal.y > 0.0, vert = vFacScale.y > max( vFacScale.x, vFacScale.z );
				if ( kind == 39.0 ) {                                        // окно-блок: рама выступает из стены, внутри — проём (общий блок окна)
					col = alu; fRough = 0.35; fMetal = 0.4;
					if ( vFacNormal.z > 0.5 && abs( u2 ) < hx - 0.07 && abs( vFacLocal.y ) < hy - 0.07 ) {
						wOn = 1.0; wP = vec2( u2, vFacLocal.y ); wH = vec2( hx - 0.07, hy - 0.07 ); wFrame = alu; wall = alu;
						wSill = wH.y > 0.92 ? 0.14 : wH.x < 0.5 ? 1.45 : 0.9; wRoomW = max( 2.4, 2.0 * hx + 0.6 );
						wFrost = wH.x < 0.5 ? 0.75 : 0.08; wAmado = mod( floor( vr / 2.0 ), 2.0 ); wAband = mod( floor( vr / 4.0 ), 2.0 );
						wType = mod( floor( vr / 8.0 ), 2.0 ) > 0.5 ? 2.0 : 0.0; wLit = wType > 1.5 ? 0.7 : 0.45;
					}
				} else if ( kind == 40.0 ) { col = alu * ( topF ? 1.2 : 0.85 ); fRough = 0.4; fMetal = 0.4; }   // отлив под окном
				else if ( kind == 41.0 ) {                                   // короб ставней над окном (у старых — ржавчина)
					col = ( vr > 1.5 ? vec3( 0.5, 0.48, 0.43 ) : alu ) * ( topF ? 1.1 : 0.9 + 0.1 * step( 0.5, fract( vFacLocal.y / 0.05 ) ) ); fRough = 0.45; fMetal = 0.3;
				} else if ( kind == 42.0 || kind == 48.0 ) {                 // труба, желоб, трансформатор на столбе: круглые — нормаль поворачивается поперёк
					col = kind == 48.0 ? vec3( 0.52, 0.54, 0.55 ) * ( abs( vFacLocal.y ) > hy - 0.06 ? 0.7 : 1.0 ) : fPick( vr / 4.0 + 0.1, vec3( 0.5, 0.5, 0.49 ), vec3( 0.58, 0.54, 0.45 ), vec3( 0.2, 0.15, 0.1 ), vec3( 0.06 ), vec3( 0.5 ) ); fRough = 0.5;
					float cr = clamp( vert ? u2 / hx : vFacLocal.y / hy, -1.0, 1.0 );
					if ( an.y < 0.5 ) fBump = vec3( vert ? cr : 0.0, vert ? 0.0 : cr, sqrt( max( 0.0, 1.0 - cr * cr ) ) + 0.05 );
				} else if ( kind == 36.0 ) {                                 // плита балкона или галереи: снизу — потолок балкона, по краю капельник
					vec3 tr = fPick( vr / 4.0 + 0.1, vec3( 0.56, 0.55, 0.52 ), vec3( 0.62, 0.61, 0.58 ), vec3( 0.55, 0.5, 0.42 ), vec3( 0.42, 0.42, 0.41 ), vec3( 0.5 ) );
					col = an.y > 0.5 ? tr * ( topF ? 0.72 : 1.05 ) : tr * ( vFacLocal.y < 0.03 - hy ? 0.55 : 1.0 ); fRough = 0.9;
				} else if ( kind == 37.0 || kind == 45.0 ) {                 // ограждение: бетон, матовое стекло в раме, профиль, решётка на фоне тени балкона
					vec3 rail = vec3( 0.42, 0.43, 0.44 ), tr = vr > 3.5 ? vec3( 0.42, 0.42, 0.41 ) : vec3( 0.62, 0.61, 0.58 );
					float rv = kind == 45.0 ? mod( vr, 4.0 ) : vr;
					if ( kind == 45.0 && ( an.y > 0.5 || vFacLocal.y < 0.16 - hy ) ) col = an.y > 0.5 ? tr * ( topF ? 0.6 : 1.05 ) : tr * ( vFacLocal.y < 0.03 - hy ? 0.55 : 1.0 );   // плита
					else if ( rv < 0.5 ) col = vec3( 0.55, 0.54, 0.51 ) * ( topF ? 1.1 : 1.0 );
					else if ( rv < 1.5 ) { col = vFacLocal.y > hy - 0.06 || abs( fract( u2 / 1.8 ) - 0.5 ) > 0.48 ? rail : vec3( 0.5, 0.55, 0.57 ) * ( 0.9 + 0.1 * smoothstep( -hy, hy, vFacLocal.y ) ); fRough = 0.3; }
					else if ( rv < 2.5 ) { col = vec3( 0.5, 0.51, 0.5 ) * ( 0.84 + 0.16 * step( 0.5, fract( u2 / 0.1 ) ) ); fMetal = 0.3; fRough = 0.45; }
					else col = vFacLocal.y > hy - 0.06 || fract( u2 / 0.11 ) < 0.3 ? vec3( 0.12, 0.12, 0.13 ) : vec3( 0.045, 0.045, 0.05 );
				} else if ( kind == 38.0 ) {                                 // перегородка между балконами (светлая доска в раме) или боковая стенка
					col = vr > 0.5 ? vec3( 0.52, 0.51, 0.49 ) : vec3( 0.72, 0.71, 0.66 ) * ( abs( vFacLocal.y ) > hy - 0.04 || abs( u2 ) > hx - 0.04 ? 0.6 : 1.0 );
				} else if ( kind == 43.0 ) col = topF || vFacLocal.y > hy - 0.04 ? vec3( 0.46, 0.47, 0.48 ) : vec3( 0.5, 0.49, 0.46 );   // парапет с крышкой
				else if ( kind == 47.0 ) col = vec3( 0.74, 0.74, 0.72 ) * ( 0.9 + 0.1 * tDet.r ) - vec3( 0.25, 0.28, 0.3 ) * max( tGrime, 0.0 ) * age;   // трубчатое ограждение, белая краска
				else if ( kind == 49.0 ) col = vec3( 0.45, 0.46, 0.47 ) * ( 0.85 + 0.15 * tDet.r );   // столб фонаря стоянки
				else if ( kind == 50.0 ) {                                   // голова фонаря: снизу светодиоды, ночью светятся белым
					col = vec3( 0.32, 0.33, 0.34 );
					if ( an.y > 0.5 && !topF ) { col = vec3( 0.85, 0.88, 0.9 ); fEmit = vec3( 0.95, 0.97, 1.0 ) * nE * 9.0; }
				}
				else if ( kind == 46.0 ) {                                   // электросчётчик: светлый короб, окошко с циферблатом
					col = vec3( 0.6, 0.6, 0.57 );
					if ( vFacNormal.z > 0.5 && abs( u2 ) < 0.09 && abs( vFacLocal.y - 0.06 ) < 0.08 ) col = vec3( 0.12, 0.13, 0.14 );
				}
				else if ( kind == 44.0 ) col = fPick( vr / 4.0 + 0.1, vec3( 0.6, 0.59, 0.55 ), vec3( 0.32, 0.3, 0.28 ), vec3( 0.48, 0.42, 0.34 ), vec3( 0.12, 0.11, 0.1 ), vec3( 0.5 ) );   // поясок
				else col = alu;
				// бетон деталей: фактура и потёки вниз от верхнего края (у старых домов — тёмные полосы под каждым ограждением)
				bool concr = kind == 36.0 || kind == 43.0 || ( kind == 38.0 && vr > 0.5 ) || ( ( kind == 37.0 || kind == 45.0 ) && ( kind == 37.0 ? vr : mod( vr, 4.0 ) ) < 0.5 );
				if ( concr && an.y < 0.5 ) {
					col *= 1.0 + 0.9 * tDet.g;
					float drip = exp( -( hy - vFacLocal.y ) / ( 0.35 + 0.9 * age ) ) * ( 0.3 + 2.4 * max( tGrime, 0.0 ) ) * ( 0.3 + 0.7 * age );
					col *= 1.0 - 0.45 * clamp( drip, 0.0, 1.0 );
					col = mix( col, vec3( dot( col, vec3( 0.3, 0.59, 0.11 ) ) ), 0.3 * age );
				} else if ( kind == 41.0 || kind == 40.0 ) col = mix( col, vec3( 0.3, 0.16, 0.08 ), age * smoothstep( 0.0, 0.35, tGrime ) * 0.55 );   // ржавчина на металле
			} else if ( st > 16.5 ) {                                      // вывеска-консоль и щит на крыше: цвет, рамка, условные знаки; ночью светятся
				vec3 bg = fSign( fract( seed * 7.31 ) ), fg = dot( bg, vec3( 0.33 ) ) > 0.4 ? vec3( 0.03 ) : vec3( 0.85 );
				bool face = an.x > 0.5 ? vFacScale.z > vFacScale.x : ( an.z > 0.5 && vFacScale.x > vFacScale.z );
				if ( !face ) col = vec3( 0.05 );
				else {
					float W2 = an.x > 0.5 ? vFacScale.z : vFacScale.x, Hs = vFacScale.y, px = u2 / W2 + 0.5, py = vFacLocal.y / Hs + 0.5;
					col = fSignTex( fract( vFacKind ) > 0.004 ? floor( fract( vFacKind ) * 80.0 + 0.5 ) - 1.0 : fract( seed * 13.37 ) * 32.0, vec2( px, py ), vec2( W2, Hs ), fwH + fwV );
					if ( min( min( px, 1.0 - px ) * W2, min( py, 1.0 - py ) * Hs ) < 0.035 ) col = vec3( 0.1 );   // рамка короба
					col *= 0.92 + 0.16 * tDet.r - 0.25 * max( tGrime, 0.0 ) * age;                                 // пыль и потёки на вывеске
					fEmit = col * nE * 1.25;
				}
			} else {                                                         // машина во дворе: кузов и кабина — две коробки
				vec3 body = fPick( fract( seed * 5.7 ), vec3( 0.5, 0.51, 0.51 ), vec3( 0.24, 0.25, 0.26 ), vec3( 0.025, 0.025, 0.03 ), vec3( 0.32, 0.04, 0.035 ), vec3( 0.06, 0.1, 0.24 ) );
				float lx = vFacLocal.x, ly = vFacLocal.y;
				if ( vFacScale.y < 0.65 ) {                                  // кабина: стёкла между стойками
					bool pillar = an.y > 0.5 || abs( abs( lx ) - ( vFacScale.x * 0.5 - 0.05 ) ) < 0.05 || ( an.z > 0.5 && abs( lx ) < 0.04 ) || ly > vFacScale.y * 0.5 - 0.06;
					col = pillar ? body : vec3( 0.025, 0.035, 0.045 );
					if ( !pillar ) { fRough = 0.15; fMetal = 0.3; } else { fRough = 0.4; fMetal = 0.25; }
				} else {
					col = body; fRough = 0.4; fMetal = 0.25;
					if ( an.z > 0.5 && length( vec2( abs( lx ) - vFacScale.x * 0.31, ly + vFacScale.y * 0.5 - 0.14 ) ) < 0.3 ) { col = vec3( 0.015 ); fRough = 0.9; fMetal = 0.0; }   // колёса
					if ( an.x > 0.5 && ly > 0.0 && abs( abs( vFacLocal.z ) - vFacScale.z * 0.32 ) < 0.15 ) col = vFacNormal.x > 0.0 ? vec3( 0.7, 0.7, 0.65 ) : vec3( 0.45, 0.03, 0.025 );   // фары и задние фонари
				}
			}
		} else if ( an.y > 0.5 ) {                                           // крыша: бетон, пятна кондиционеров
			col = vec3( 0.46, 0.46, 0.44 ) * ( 0.85 + 0.2 * fHash( floor( vFacLocal.xz / 2.0 ) + seed ) );
			if ( st > 4.5 ) col = vec3( 0.5, 0.52, 0.54 );
			col *= 0.6;
			vec2 rim = vFacScale.xz * 0.5 - abs( vFacLocal.xz );
			float rimD = min( rim.x, rim.y );
			if ( kind == 31.0 || kind == 2.0 || kind == 4.0 || kind == 5.0 || kind == 3.0 || kind == 6.0 ) col = rimD < 0.22 ? vec3( 0.2, 0.2, 0.19 ) : vec3( 0.11, 0.115, 0.12 ) * ( 0.9 + 0.2 * fHash( floor( vFacLocal.xz / 1.2 ) + seed ) ) * ( 0.75 + 0.25 * smoothstep( 0.22, 0.7, rimD ) );
		} else {
			float u = an.x > 0.5 ? vFacLocal.z + vFacScale.z * 0.5 : vFacLocal.x + vFacScale.x * 0.5;
			float w = an.x > 0.5 ? vFacScale.z : vFacScale.x;
			float fl = floor( y / 3.0 ), fy = y - fl * 3.0;
			bool top = y > floors * 3.0;
			// свет окна (вечером и ночью) — один раз на точку: окно сетки 2,7 м × этаж горит, если его число lh меньше доли
			// горящих окон у этого вида дома; цвет — тёплый или холодный (телевизор). Шейдер с тенями считается без ветвлений
			// (все ветви стилей для каждой точки), поэтому общий расчёт вынесен из ветвей
			float lh = 2.0;
			vec3 lit = vec3( 0.0 );
			if ( uNight > 0.0 ) {                                            // днём не считается
				// у контор и стеклянных башен свет горит блоками по 4 окна (отделами), у остальных — по окну
				vec2 lid = vec2( floor( u / ( st > 2.5 && st < 4.5 ? 10.8 : 2.7 ) ), fl );
				lh = fHash( lid + seed * 17.0 );
				lit = ( fHash( lid.yx + seed * 5.0 ) < 0.78 ? vec3( 1.0, 0.78, 0.52 ) : vec3( 0.72, 0.84, 1.0 ) ) * ( 0.55 + 0.45 * fHash( lid * 1.7 + seed ) ) * nE;
			}
			if ( st < 0.5 ) {                                              // жилой дом: дерево, плитка, штукатурка, сайдинг или фахверк; окна разные
				float mt = fract( seed * 9.17 ), two = fract( seed * 23.71 );
				bool upperMat = two < 0.5 && fl >= 1.0;                      // у половины домов верх из другого материала, чем низ
				float m = upperMat ? fract( mt + 0.37 ) : mt, ps = upperMat ? fract( seed + 0.31 ) : seed;
				if ( m < 0.28 ) {                                            // тёмные доски
					wall = fPick( ps, vec3( 0.10, 0.065, 0.04 ), vec3( 0.15, 0.095, 0.055 ), vec3( 0.07, 0.05, 0.04 ), vec3( 0.20, 0.13, 0.07 ), vec3( 0.12, 0.08, 0.06 ) );
					wall *= mix( 0.92, ( 0.72 + 0.28 * step( 0.1, fract( u / 0.18 ) ) ) * ( 0.84 + 0.16 * fHash( vec2( floor( u / 0.18 ), 3.0 ) + seed ) ), det );
					mW = vec3( 0.3, 0.0, 0.9 );
				} else if ( m < 0.5 ) {                                      // облицовочная плитка
					wall = fPick( ps, vec3( 0.40, 0.34, 0.27 ), vec3( 0.26, 0.25, 0.24 ), vec3( 0.33, 0.29, 0.24 ), vec3( 0.44, 0.39, 0.31 ), vec3( 0.22, 0.19, 0.17 ) );
					vec2 tf = abs( fract( vec2( u / 0.3 + 0.5 * mod( floor( y / 0.1 ), 2.0 ), y / 0.1 ) ) - 0.5 );
					wall *= 1.0 - 0.3 * smoothstep( 0.36, 0.5, max( tf.x, tf.y ) ) * det;
					mW = vec3( 0.3, 0.5, 0.0 );
				} else if ( m < 0.72 ) {                                     // штукатурка: кремовая, серая, охра
					wall = fPick( ps, vec3( 0.50, 0.46, 0.38 ), vec3( 0.42, 0.41, 0.39 ), vec3( 0.46, 0.35, 0.20 ), vec3( 0.54, 0.52, 0.47 ), vec3( 0.38, 0.32, 0.26 ) );
					mW = vec3( 0.55, 0.2, 0.0 );
				} else if ( m < 0.88 ) {                                     // сайдинг: светлый, серо-голубой, тёмный металл
					wall = fPick( ps, vec3( 0.42, 0.40, 0.36 ), vec3( 0.27, 0.31, 0.34 ), vec3( 0.07, 0.075, 0.085 ), vec3( 0.46, 0.44, 0.40 ), vec3( 0.20, 0.23, 0.21 ) );
					wall *= 1.0 - 0.16 * step( 0.82, fract( y / 0.2 ) ) * det;
					mW = vec3( 0.6, 0.0, 0.0 );
				} else {                                                       // белая штукатурка в тёмном деревянном каркасе
					wall = vec3( 0.52, 0.50, 0.45 );
					mW = vec3( 0.7, 0.0, 0.0 );
					float post = min( abs( fract( u / 1.82 ) - 0.5 ) * 1.82, min( u, w - u ) );
					if ( post > 0.84 || min( u, w - u ) < 0.09 || abs( fy - 0.06 ) < 0.07 ) wall = vec3( 0.075, 0.05, 0.035 );
				}
				// окна: в каждой ячейке своё — нет окна, обычное раздвижное, маленькое под потолком, большое до пола
				float n = max( 1.0, floor( w / 2.7 ) ), cell = w / n, ci = floor( u / cell ), cu = u - ( ci + 0.5 ) * cell;
				float wt = fHash( vec2( ci, fl ) + seed * 7.0 + ( an.x > 0.5 ? 3.0 : 0.0 ) );
				float hw = 0.82, wy0 = 0.9, wy1 = 2.1;
				bool has = !top && cell > 1.9;
				if ( wt < 0.2 && !( front && fl >= 1.0 ) ) has = false;
				else if ( wt > 0.62 && wt < 0.78 ) { hw = 0.38; wy0 = 1.45; wy1 = 2.05; }
				else if ( wt >= 0.78 && front ) { hw = 0.88; wy0 = 0.14; wy1 = 2.12; }
				bool upperBox = abs( fract( vFacKind ) - 0.25 ) < 0.05;                       // верхний этаж двухэтажного дома (resetPose: вид + 0,25)
				// у двери и гаража окна нет: ячейка, задевающая их, на первом этаже фасада пустая
				float cx0 = ci * cell, cx1 = cx0 + cell;
				bool gHouse = front && !upperBox && fract( seed * 4.7 ) < 0.22 && w > 6.8;
				if ( front && fl < 1.0 && !upperBox && ( ( cx0 < w * 0.5 + 0.6 && cx1 > w * 0.5 - 0.6 ) || ( gHouse && cx0 < 3.1 ) ) ) has = false;
				if ( has && abs( cu ) < hw + 0.04 && fy < wy0 - 0.1 ) fStreak = exp( -( wy0 - 0.1 - fy ) / 0.8 ) * smoothstep( hw + 0.04, hw - 0.2, abs( cu ) );
				if ( vFacNear > 0.5 ) has = false;                                                  // вблизи окна, отливы, короба — геометрия
				bool win = has && abs( cu ) < hw && fy > wy0 && fy < wy1;
				bool frame = has && abs( cu ) < hw + 0.07 && fy > wy0 - 0.07 && fy < wy1 + 0.07;
				bool shut = has && hw > 0.6 && fract( seed * 6.3 ) < 0.45 && abs( cu ) < hw + 0.12 && fy >= wy1 + 0.07 && fy < wy1 + 0.27;   // короб ставней над окном
				bool door = front && fl < 1.0 && !upperBox && abs( u - w * 0.5 ) < 0.48 && fy < 2.08;       // входная дверь на фасаде к улице
				bool garage = front && fl < 1.0 && !upperBox && fract( seed * 4.7 ) < 0.22 && u > 0.4 && u < 3.0 && fy < 2.3 && w > 6.8;   // место под машину в доме
				bool pipe = abs( u - 0.22 ) < 0.035 && y < floors * 3.0 && an.x < 0.5;         // водосточная труба
				vec3 fcol = fract( seed * 3.3 ) < 0.55 ? vec3( 0.045, 0.04, 0.04 ) : vec3( 0.46 );
				vec2 wid = vec2( ci, fl );
				vec3 dcol = fPick( fract( seed * 11.3 ), vec3( 0.10, 0.07, 0.05 ), vec3( 0.05, 0.05, 0.055 ), vec3( 0.17, 0.11, 0.06 ), vec3( 0.09, 0.12, 0.10 ), vec3( 0.26, 0.24, 0.21 ) );
				if ( door && abs( u - w * 0.5 + 0.2 ) < 0.07 && fy > 0.5 && fy < 1.8 ) dcol = glass * 2.0;   // узкое стекло в двери
				win = win && !garage && !door;
				col = door ? dcol * ( 1.0 - 0.4 * smoothstep( 1.8, 2.08, fy ) ) : ( win || garage ) ? wall : ( frame || shut ) ? fcol : pipe ? vec3( 0.3 ) : wall;
				// водосточная труба — цилиндр: нормаль поворачивается поперёк трубы, свет ложится как на круглое
				if ( pipe && !door && !win && !garage ) { float px = ( u - 0.22 ) / 0.035; fBump = vec3( px, 0.0, sqrt( max( 0.0, 1.0 - px * px ) ) + 0.05 ); }
				// отлив под окном выступает: верх смотрит вверх (светлый на солнце), под ним — тень на стене
				bool sill = has && !door && !garage && abs( cu ) < hw + 0.11 && fy > wy0 - 0.12 && fy <= wy0 - 0.07;
				if ( sill ) { col = mix( fcol, vec3( 0.5 ), 0.5 ); fBump = vec3( 0.0, 1.0, 0.6 ); }
				else if ( !garage && !door && !frame && has && abs( cu ) < hw + 0.11 && fy > wy0 - 0.32 && fy <= wy0 - 0.12 ) col *= 0.68 + 0.32 * smoothstep( 0.0, 0.2, wy0 - 0.12 - fy );
				// короб ставней: низ в тени
				if ( shut && !win && fy < wy1 + 0.1 ) col *= 0.6;
				// поясок между этажами: верх выступа смотрит вверх, низ — вниз
				if ( abs( y - 3.0 ) < 0.06 && floors > 1.5 && !win && !door && !garage ) { col *= 0.88; fBump = vec3( 0.0, y > 3.0 ? 0.9 : -0.9, 1.0 ); }
				if ( win ) {
					wOn = 1.0; wP = vec2( cu, fy - ( wy0 + wy1 ) * 0.5 ); wH = vec2( hw, ( wy1 - wy0 ) * 0.5 ); wSill = wy0; wRoomW = cell;
					wId = wid + vec2( an.x > 0.5 ? 40.0 : 0.0, vFacNormal.z < -0.5 || vFacNormal.x < -0.5 ? 20.0 : 0.0 ); wFrame = fcol;
					// маленькое окно — ванная или туалет: обычно матовое стекло; у домов с коробами ставней часть ставней закрыта
					wFrost = hw < 0.5 ? 0.75 : 0.08; wAmado = fract( seed * 6.3 ) < 0.45 && hw > 0.6 ? 1.0 : 0.0;
				}
				// гараж в доме: роллета поднята или опущена, внутри машина
				if ( garage ) { wOn = 1.0; wType = 3.0; wP = vec2( u - 1.7, fy - 1.15 ); wH = vec2( 1.3, 1.15 ); wSill = 0.0; wRoomW = 3.2; wId = vec2( 90.0, seed * 50.0 ); wLit = 0.25; wFrame = fcol; }
			} else if ( st < 1.5 ) {                                       // торговый дом: плитка или штукатурка, витрина, вывески
				float m = fract( seed * 9.17 );
				wall = fPick( seed, vec3( 0.44, 0.40, 0.33 ), vec3( 0.30, 0.29, 0.28 ), vec3( 0.36, 0.27, 0.20 ), vec3( 0.50, 0.48, 0.44 ), vec3( 0.20, 0.21, 0.23 ) );
				if ( m < 0.55 ) { vec2 tf = abs( fract( vec2( u / 0.24 + 0.5 * mod( floor( y / 0.08 ), 2.0 ), y / 0.08 ) ) - 0.5 ); wall *= 1.0 - 0.17 * smoothstep( 0.38, 0.5, max( tf.x, tf.y ) ) * det; mW = vec3( 0.3, 0.5, 0.0 ); }
				else mW = vec3( 0.55, 0.2, 0.0 );
				vec3 sign = fSign( fract( seed * 7.31 ) ), fcol = fract( seed * 3.3 ) < 0.6 ? vec3( 0.05, 0.05, 0.055 ) : vec3( 0.42 );
				float n = max( 1.0, floor( w / 2.6 ) ), cell = w / n, ci = floor( u / cell ), cu = u - ( ci + 0.5 ) * cell;
				vec2 wid = vec2( ci, fl );
				col = wall;
				if ( front && fl < 1.0 ) {
					// первый этаж к улице: витрина или опущенная роллета; над ней — маркиза и вывеска с условными знаками
					bool closed = fHash( vec2( ci, 9.0 ) + seed ) < 0.28 && kind != 8.0;
					if ( kind == 8.0 ) sign = mix( vec3( 0.8 ), fSign( fract( seed * 3.7 ) * 0.5 ), step( 0.5, fract( fy / 0.2 ) ) );   // круглосуточный магазин: полосатая вывеска
					if ( fy >= 2.3 && fy < 2.95 ) {
						col = kind == 8.0 ? sign : fSignTex( fract( seed * 13.37 ) * 32.0, vec2( u / w, ( fy - 2.3 ) / 0.65 ), vec2( w, 0.65 ), fwH + fwV );
						fEmit = col * nE * 0.9;
					} else if ( fy > 2.02 && fy < 2.3 && fract( seed * 2.9 ) < 0.5 ) col = sign * ( 0.55 + 0.2 * step( 0.5, fract( u / 0.4 ) ) );   // маркиза полосами
					else if ( fy > 0.12 && fy <= 2.02 ) {
						if ( closed ) col = vec3( 0.3, 0.31, 0.32 ) * ( 0.75 + 0.25 * step( 0.3, fract( fy / 0.09 ) ) ) * ( abs( cu ) > cell * 0.5 - 0.06 ? 0.6 : 1.0 );
						else if ( fWin( col, fcol, cu, fy - 1.07, cell * 0.5 - 0.14, 0.95, 0.07 ) > 0.5 ) {
							// внутри — по вывеске: еда (стойка, столики), услуги (кресла, зеркала), товары (полки), машины (бокс с подъёмником)
							float sg = floor( fract( seed * 13.37 ) * 32.0 );
							wShopK = kind == 8.0 ? 0.0 : sg < 9.5 ? 1.0 : sg < 17.5 ? 2.0 : sg < 25.5 ? 0.0 : 3.0;
							wOn = 1.0; wType = wShopK > 2.5 ? 3.0 : 1.0; wP = vec2( cu, fy - 1.07 ); wH = vec2( cell * 0.5 - 0.14, 0.95 ); wSill = 0.12; wRoomW = cell; wId = wid + 60.0; wLit = 0.95; wFrame = fcol; }
					} else col = wall * 0.7;
				} else if ( !top ) {
					bool pencilFront = front && kind == 6.0;
					if ( pencilFront && fy < 0.7 ) {                           // «карандаш»: вывеска своего цвета на каждом этаже
						col = fSignTex( fract( seed * 3.1 + fl * 0.37 ) * 32.0, vec2( u / w, ( fy - 0.04 ) / 0.62 ), vec2( w, 0.62 ), fwH + fwV ); fEmit = col * nE * 0.9;
					} else {
						bool has = ( front || fHash( wid + seed ) < 0.55 ) && vFacNear < 0.5;
						float hw = pencilFront ? cell * 0.5 - 0.2 : min( 0.85, cell * 0.5 - 0.3 );
						float wcy = pencilFront ? 1.8 : 1.55, whh = pencilFront ? 0.85 : 0.65;
						if ( has && fWin( col, fcol, cu, fy - wcy, hw, whh, 0.06 ) > 0.5 ) { wOn = 1.0; wType = pencilFront ? 2.0 : 0.0; wP = vec2( cu, fy - wcy ); wH = vec2( hw, whh ); wSill = wcy - whh; wRoomW = cell; wId = wid; wLit = pencilFront ? 0.7 : 0.4; wFrame = fcol; wFrost = 0.1; }
						else if ( has && !pencilFront && fHash( wid + seed * 5.0 ) < 0.35 && abs( cu - 0.25 ) < 0.36 && fy > 0.12 && fy < 0.62 ) col = length( vec2( cu - 0.33, fy - 0.37 ) ) < 0.17 ? vec3( 0.1 ) : vec3( 0.42, 0.42, 0.4 );   // кондиционер под окном
					}
				}
			} else if ( st < 2.5 ) {                                       // многоэтажка: плитка, балконы к улице, галерея с дверями сзади
				wall = fPick( seed, vec3( 0.46, 0.43, 0.37 ), vec3( 0.34, 0.26, 0.20 ), vec3( 0.36, 0.36, 0.36 ), vec3( 0.50, 0.47, 0.42 ), vec3( 0.26, 0.22, 0.19 ) );
				{ vec2 tf = abs( fract( vec2( u / 0.24 + 0.5 * mod( floor( y / 0.08 ), 2.0 ), y / 0.08 ) ) - 0.5 ); wall *= 1.0 - 0.16 * smoothstep( 0.38, 0.5, max( tf.x, tf.y ) ) * det; }
				vec3 fcol = vec3( 0.05, 0.05, 0.055 ), trim = fract( seed * 4.1 ) < 0.5 ? vec3( 0.5, 0.5, 0.48 ) : vec3( 0.2, 0.2, 0.21 );
				float n = max( 1.0, floor( w / 3.6 ) ), cell = w / n, ci = floor( u / cell ), cu = u - ( ci + 0.5 ) * cell;
				vec2 wid = vec2( ci, fl );
				bool back = vFacNormal.z < -0.5;
				col = wall;
				if ( top ) col = trim * 0.8;
				else if ( an.x > 0.5 ) {                                     // торец: редкие окна
					if ( fHash( wid + seed ) < 0.5 && fWin( col, fcol, cu, fy - 1.55, 0.5, 0.6, 0.06 ) > 0.5 ) { wOn = 1.0; wP = vec2( cu, fy - 1.55 ); wH = vec2( 0.5, 0.6 ); wSill = 0.95; wRoomW = cell; wId = wid + 30.0; wFrame = fcol; wFrost = 0.4; }
				} else if ( back ) {                                          // галерея: плита и ограждение — геометрия (facadeDetail.js); здесь двери квартир и окошки
					{
						col = wall * 0.72;
						if ( abs( cu + cell * 0.2 ) < 0.42 && fy < 2.15 ) col = fPick( fract( seed * 11.3 ), vec3( 0.12, 0.09, 0.07 ), vec3( 0.07, 0.09, 0.12 ), vec3( 0.2 ), vec3( 0.1, 0.13, 0.1 ), vec3( 0.25, 0.2, 0.15 ) );
						else if ( abs( cu - cell * 0.22 ) < 0.3 && fy > 1.3 && fy < 2.0 ) { col = glass * 1.6; fEmit = ( lit * step( lh, 0.3 ) ); }
					}
				} else if ( fl < 1.0 && kind == 4.0 ) {                      // первый этаж дома с лифтом: стеклянный вход и ряд окон
					if ( abs( u - w * 0.5 ) < 1.5 && fy < 2.5 ) { col = ( abs( u - w * 0.5 ) > 1.4 || fy > 2.4 ) ? fcol : glass * 1.5; fEmit = vec3( 1.0, 0.92, 0.8 ) * nE * 0.5; }
					else if ( fWin( col, fcol, cu, fy - 1.5, 0.6, 0.55, 0.06 ) > 0.5 ) { wOn = 1.0; wP = vec2( cu, fy - 1.5 ); wH = vec2( 0.6, 0.55 ); wSill = 0.95; wRoomW = cell; wId = wid; wLit = 0.4; wFrame = fcol; }
				} else {                                                       // балкон: плита, ограждение, перегородки — геометрия (facadeDetail.js); здесь стена в глубине балкона и окно до пола
					col = wall * 0.85;
					if ( fWin( col, fcol, cu, fy - 1.25, cell * 0.5 - 0.45, 1.05, 0.05 ) > 0.5 ) { wOn = 1.0; wP = vec2( cu, fy - 1.25 ); wH = vec2( cell * 0.5 - 0.45, 1.05 ); wSill = 0.2; wRoomW = cell; wId = wid; wFrame = fcol; wFrost = 0.03; }
				}
			} else if ( st < 3.5 ) {                                       // стекло: ленты перекрытий, стойки
				vec3 g = fPick( seed, vec3( 0.12, 0.18, 0.22 ), vec3( 0.16, 0.20, 0.18 ), vec3( 0.20, 0.22, 0.25 ), vec3( 0.10, 0.12, 0.16 ), vec3( 0.18, 0.16, 0.14 ) );
				float cu = fract( u / 1.5 ) * 1.5;
				bool spandrel = fy < 0.6, mullion = cu < 0.06;
				col = top ? vec3( 0.3 ) : spandrel ? g * 0.75 + 0.035 : mullion ? g * 1.5 + 0.04 : g;
				// издали стойки и перекрытия мельче пикселя — рябь: там ровные тон, блеск и свет окон
				float far3 = top ? 0.0 : smoothstep( 0.04, 0.2, max( fwH / 0.75, fwV / 1.5 ) );
				bool pane = !spandrel && !mullion && !top;
				col = mix( col, g * 0.9 + 0.03, far3 );
				fRough = mix( pane ? 0.05 : 0.85, 0.12, far3 ); fMetal = mix( pane ? 0.7 : 0.0, 0.6, far3 );
				// башни (Минато-Мирай): ночью горит половина отделов, полосы этажей темнее; днём стекло отражает небо (Френель,
				// смешивается в fog_fragment, как у окон)
				if ( !top ) {
					fEmit = ( lit * step( lh, 0.5 ) ) * vec3( 0.85, 0.92, 1.0 ) * mix( pane ? 0.8 : 0.0, 0.42, far3 );
					vec3 vd = normalize( vFacView );
					float cz = max( - dot( vd, vFacNormal ), 0.04 );
					fGlassF = ( pane || far3 > 0.5 ? 1.0 : 0.25 ) * ( 0.22 + 0.7 * pow( 1.0 - cz, 3.0 ) );
					fReflY = vd.y; fReflH = dot( vd, an.x > 0.5 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 ) ) / cz;
				}
			} else if ( st < 4.5 ) {                                       // контора и школа: панели со швами, окна в рамах, стеклянный вход, название на парапете
				wall = kind == 12.0 ? vec3( 0.5, 0.47, 0.4 ) : fPick( seed, vec3( 0.42, 0.42, 0.41 ), vec3( 0.3, 0.32, 0.34 ), vec3( 0.4, 0.36, 0.31 ), vec3( 0.5, 0.5, 0.48 ), vec3( 0.24, 0.25, 0.27 ) );
				wall *= 1.0 - 0.22 * step( 0.955, max( fract( u / 1.8 ), fract( y / 1.5 ) ) ) * det;
				mW = vec3( 0.0, 1.2, 0.0 );
				float cu = fract( u / 1.8 ) * 1.8 - 0.9, du = abs( u - w * 0.5 );
				col = wall;
				if ( front && fl < 1.0 && du < 1.7 && fy < 2.6 ) { col = ( du > 1.6 || fy > 2.5 || du < 0.03 ) ? vec3( 0.05 ) : glass * 1.6; fRough = 0.22; fMetal = 0.2; fEmit = vec3( 1.0, 0.95, 0.85 ) * nE * 0.45; }
				else if ( !top && fWin( col, vec3( 0.05, 0.05, 0.055 ), cu, fy - 1.62, 0.86, 0.68, 0.045 ) > 0.5 ) { wOn = 1.0; wType = 2.0; wP = vec2( cu, fy - 1.62 ); wH = vec2( 0.86, 0.68 ); wSill = 0.94; wRoomW = 7.2; wId = vec2( floor( u / 1.8 ), fl ); wLit = kind == 12.0 ? 0.15 : 0.55; wFrame = vec3( 0.05, 0.05, 0.055 ); }
				if ( top && front && kind == 5.0 && fract( seed * 5.9 ) < 0.5 ) {
					float gl = fGlyph( vec2( fract( u / 0.5 ), ( y - floors * 3.0 - 0.1 ) / 0.5 ), floor( u / 0.5 ) + seed * 31.0 ) * step( w * 0.2, u ) * step( u, w * 0.8 );
					col = mix( vec3( 0.1, 0.11, 0.13 ), vec3( 0.8 ), gl ); fEmit = vec3( gl ) * nE * 0.8;
				}
			} else if ( st < 5.5 ) {                                       // профлист: склад, цех, большой магазин, заправка
				wall = fPick( seed, vec3( 0.62, 0.64, 0.66 ), vec3( 0.52, 0.58, 0.62 ), vec3( 0.74, 0.72, 0.66 ), vec3( 0.5, 0.56, 0.5 ), vec3( 0.68, 0.68, 0.7 ) );
				wall *= mix( 0.95, 0.9 + 0.1 * step( 0.5, fract( u / 0.3 ) ), det );   // рёбра профлиста — вблизи (издали муар)
				col = wall; fRough = 0.6; fMetal = 0.3;
				if ( kind == 9.0 || kind == 18.0 ) {                         // магазин и заправка: цветная полоса под крышей, стекло входа
					vec3 sign = fSign( fract( seed * 5.3 ) );
					float hh = vFacScale.y;
					if ( y > hh - 1.6 ) { col = sign; fEmit = sign * nE * 0.9; fRough = 0.5; fMetal = 0.0; }
					else if ( front && y < 2.8 && abs( u - w * 0.5 ) < w * 0.3 ) { col = glass * 1.5; fRough = 0.22; fMetal = 0.2; fEmit = vec3( 1.0, 0.95, 0.85 ) * nE * 0.6; }
					else col = vec3( 0.86, 0.86, 0.84 );
				} else if ( front && y < 4.6 && abs( u - w * 0.5 ) < 2.6 ) col = vec3( 0.42, 0.44, 0.46 ) * ( 0.9 + 0.1 * step( 0.5, fract( y / 0.25 ) ) );   // ворота
			} else if ( st < 6.5 ) {                                       // дерево: усадьба, святилище
				wall = kind == 14.0 ? vec3( 0.2, 0.14, 0.1 ) : vec3( 0.5, 0.1, 0.06 );
				mW = vec3( 0.4, 0.0, 1.0 );
				wall *= 0.9 + 0.1 * step( 0.5, fract( u / 0.45 ) );
				bool panel = fy > 0.5 && fy < 2.3 && fract( u / 1.8 ) > 0.12;
				col = panel ? vec3( 0.86, 0.84, 0.76 ) : wall;
			} else if ( st > 7.5 ) {                                       // цоколь на склоне: бетонные блоки рядами
				float row = floor( y / 0.2 ), bu = u / 0.4 + 0.5 * mod( row, 2.0 );
				vec2 bf = abs( fract( vec2( bu, y / 0.2 ) ) - 0.5 );
				col = vec3( 0.3, 0.295, 0.28 ) * ( 0.84 + 0.16 * fHash( vec2( floor( bu ), row ) + seed ) ) * ( 1.0 - 0.3 * smoothstep( 0.44, 0.5, max( bf.x, bf.y ) ) );
				fRough = 0.95;
			} else {                                                         // теплица: плёнка на каркасе
				col = vec3( 0.82, 0.86, 0.84 ) * ( 0.92 + 0.08 * step( 0.06, fract( u / 2.0 ) ) );
				fRough = 0.35;
			}
			// угол дома темнее (тень от выступа), низ — с налётом
			// стены — приглушённые тона японского города (кремовый, песочный, серо-голубой, коричневый); вывески и стекло не трогаем
			float hi = max( col.r, max( col.g, col.b ) ), lo = min( col.r, min( col.g, col.b ) );
			if ( wOn < 0.5 && st > 0.5 && hi > 0.4 && lo > 0.6 * hi ) col *=0.6 * fPick( fract( seed * 13.7 ), vec3( 1.0 ), vec3( 1.0, 0.92, 0.78 ), vec3( 0.92, 0.8, 0.66 ), vec3( 0.82, 0.88, 0.94 ), vec3( 0.78, 0.66, 0.56 ) );
			// ── фактура и старение (возраст дома age): фото-фактура материала, потёки с крыши и из-под окон, брызги грязи
			// у земли, плесень, выцветание, заплатки (процедурные трещины отвергнуты: петли шума выглядели проводами) ──
			if ( wOn < 0.5 && st < 8.5 ) {
				col *= 1.0 + 1.25 * dot( tDet, mW );
				float ageW = 0.3 + 0.7 * age;
				float topS = exp( -( vFacScale.y - y ) / ( 1.2 + 2.8 * age ) );
				float stk = clamp( max( topS, fStreak ) * ( 0.25 + 2.6 * max( tGrime, 0.0 ) ), 0.0, 1.0 ) * ageW;
				col *= 1.0 - 0.42 * stk;
				float splash = ( 1.0 - smoothstep( 0.0, 0.3 + 0.7 * ( tGrime + 0.5 ), y ) ) * ( 0.4 + 0.6 * age );
				col = mix( col, col * vec3( 0.6, 0.56, 0.5 ), splash );
				float mold = smoothstep( 0.12, 0.3, -tGrime ) * smoothstep( 0.35, 0.8, age ) * ( 0.4 + 0.6 * smoothstep( 2.5, 0.0, y ) + 0.6 * topS );
				col = mix( col, col * vec3( 0.55, 0.6, 0.5 ), mold * 0.45 );
				col = mix( col, vec3( dot( col, vec3( 0.3, 0.59, 0.11 ) ) ) * 1.1, 0.4 * age );   // выцветание краски
				vec2 pq = floor( tUV / vec2( 1.3, 0.9 ) );
				if ( fHash( pq + seed * 19.0 ) < 0.06 * age ) col *= 0.88 + 0.24 * fHash( pq + 3.0 );   // заплатки
			}
			float edge = min( u, w - u );
			col *= 0.86 + 0.14 * smoothstep( 0.0, 0.3, edge );
			// объём без лишней геометрии: тень под свесом крыши, затемнение у земли, боковые и задняя стены темнее фасада
			float eave = ( kind < 2.5 || kind == 26.0 || kind == 28.0 || kind == 13.0 || kind == 14.0 || kind == 16.0 ) ? 0.5 : 0.16;
			col *= 1.0 - eave * smoothstep( vFacScale.y - 0.75, vFacScale.y - 0.05, y );
			col *= 0.8 + 0.2 * smoothstep( 0.0, 1.0, y );
			col *= an.x > 0.5 ? 0.8 : ( front ? 1.0 : 0.9 );
		}
		// ── окно, общее для всех стилей: проём с откосами, стекло с отражением неба, за стеклом — комната ──
		// Комната — проекция луча взгляда на стены, пол и потолок коробки за стеклом (interior mapping); мебель — силуэт на
		// плоскости посреди комнаты; шторы, тюль, матовое стекло, ставни, жалюзи — на плоскости стекла. Издали (det → 0) —
		// ровный тон и средний свет комнаты: рисунок там мельче пикселя
		if ( wOn > 0.5 ) {
			vec3 tF = an.x > 0.5 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 vd = normalize( vFacView );
			float cz = max( - dot( vd, vFacNormal ), 0.04 );
			vec3 rd = vec3( dot( vd, tF ), vd.y, cz );
			float rH = fHash( wId + seed * 29.0 ), rH2 = fHash( wId.yx * 1.37 + seed * 41.0 ), rH3 = fHash( wId * 0.71 + seed * 13.0 + 5.0 );
			bool shopT = wType > 0.5 && wType < 1.5, officeT = wType > 1.5 && wType < 2.5, boxT = wType > 2.5;
			// брошенный дом: окна тёмные, часть заколочена
			bool aband = ( wAband > -0.5 ? wAband > 0.5 : fract( seed * 31.7 ) < 0.035 ) && wType < 0.5;
			// свет ночью: горит ли комната (порог wLit) и каким светом — холодным дневным, тёплым, синеватым от телевизора
			vec2 lid = officeT ? vec2( floor( wId.x / 4.0 ), wId.y ) : wId;
			float on = aband ? 0.0 : step( fHash( lid + seed * 17.0 ), wLit ) * nE;
			vec3 lamp = ( fract( rH3 * 7.7 ) < ( officeT || shopT ? 0.85 : 0.5 ) ? vec3( 0.84, 0.92, 1.0 ) : vec3( 1.0, 0.74, 0.46 ) ) * ( 0.6 + 0.4 * fract( rH3 * 3.1 ) );
			if ( wType < 0.5 && rH3 > 0.9 ) lamp = vec3( 0.3, 0.42, 0.85 ) * 0.55;
			if ( shopT && wShopK > 0.5 && wShopK < 1.5 ) lamp = vec3( 1.0, 0.8, 0.56 );
			// витрины и мастерские освещены и днём; у гаража стекла нет
			float dayOn = shopT || boxT ? uDayLum * 0.22 : 0.0, refl = boxT ? 0.0 : 1.0;
			vec3 nc = vec3( 0.045, 0.05, 0.055 ) + ( shopT ? vec3( 0.1 ) : vec3( 0.0 ) ), ne = lamp * ( on * ( shopT ? 0.75 : 0.55 ) + dayOn * 0.6 );   // издали
			// стекло утоплено в стену: луч от фасада до стекла смещается — у края проёма он упирается в откос
			vec2 g = wP + rd.xy * ( ( boxT ? 0.14 : 0.1 ) / cz );
			vec2 ov = abs( g ) - wH;
			if ( det > 0.0 ) {
				vec3 dc, de = vec3( 0.0 );
				if ( max( ov.x, ov.y ) > 0.0 ) {
					// откос: бок или верх (низ) — какой край проёма луч пересекает раньше; нормаль откоса — к середине проёма
					float dX = ( ( rd.x > 0.0 ? wH.x : - wH.x ) - wP.x ) / ( rd.x + ( rd.x >= 0.0 ? 1e-4 : -1e-4 ) );
					float dY = ( ( rd.y > 0.0 ? wH.y : - wH.y ) - wP.y ) / ( rd.y + ( rd.y >= 0.0 ? 1e-4 : -1e-4 ) );
					dc = mix( wall, wFrame, 0.55 );
					fBump = dX < dY ? vec3( rd.x > 0.0 ? -1.0 : 1.0, 0.0, 0.2 ) : vec3( 0.0, rd.y > 0.0 ? -1.0 : 1.0, 0.2 );
					refl = 0.0;
				} else {
					// комната: луч от стекла до стены, пола или потолка
					float RW = wRoomW * 0.5, RD = boxT ? 6.5 : shopT ? 5.0 : officeT ? 7.0 : 3.0 + 1.8 * rH;
					float RH = max( boxT ? 3.3 : officeT ? 2.7 : 2.5, wSill + 2.0 * wH.y + 0.12 );
					vec3 ro = vec3( g.x, wSill + wH.y + g.y, 0.0 );
					float tx = rd.x > 0.0 ? ( RW - ro.x ) / max( rd.x, 1e-4 ) : ( RW + ro.x ) / max( - rd.x, 1e-4 );
					float ty = rd.y > 0.0 ? ( RH - ro.y ) / max( rd.y, 1e-4 ) : ro.y / max( - rd.y, 1e-4 );
					float tz = RD / cz, t = min( min( tx, ty ), tz );
					vec3 p = ro + rd * t;
					vec3 wpap = fPick( rH, vec3( 0.62, 0.6, 0.55 ), vec3( 0.55, 0.54, 0.5 ), vec3( 0.6, 0.53, 0.44 ), vec3( 0.5, 0.53, 0.52 ), vec3( 0.66, 0.63, 0.58 ) );   // обои
					if ( shopT ) wpap = vec3( 0.68 ); else if ( boxT ) wpap = vec3( 0.32, 0.32, 0.31 ); else if ( officeT ) wpap = vec3( 0.6, 0.6, 0.58 );
					float ed, lm = 0.0;
					if ( t == tz ) {
						// задняя стена: шкаф или комод, картина; в магазине — полки с товаром, в конторе — шкафы с папками,
						// в мастерской — стеллаж шин, щит с инструментом и красная тележка
						ed = min( RW - abs( p.x ), min( p.y, RH - p.y ) );
						dc = wpap;
						if ( shopT && wShopK > 0.5 && wShopK < 1.5 ) {
							dc = p.y < 1.0 ? vec3( 0.34, 0.21, 0.11 ) * ( p.y > 0.93 ? 1.5 : 0.85 + 0.15 * step( 0.5, fract( p.x / 0.6 ) ) )   // стойка
								: p.y < 1.25 ? vec3( 0.18, 0.13, 0.09 )
								: p.y < 1.9 ? ( fract( p.y / 0.3 ) < 0.12 ? vec3( 0.3, 0.2, 0.12 ) : fract( p.x / 0.11 ) < 0.55 ? fPick( fHash( floor( vec2( p.x / 0.11, p.y / 0.3 ) ) ), vec3( 0.15, 0.3, 0.12 ), vec3( 0.5, 0.35, 0.15 ), vec3( 0.7 ), vec3( 0.12 ), vec3( 0.55, 0.2, 0.1 ) ) : vec3( 0.2, 0.15, 0.1 ) )   // бутылки
								: abs( fract( p.x / 1.1 ) - 0.5 ) < 0.4 && p.y < 2.35 ? vec3( 0.78, 0.74, 0.62 ) * ( 0.85 + 0.15 * step( 0.3, fract( p.y / 0.07 ) ) ) : vec3( 0.42, 0.3, 0.2 );   // меню
						} else if ( shopT && wShopK > 1.5 ) {
							dc = p.y > 0.85 && p.y < 1.95 && abs( fract( p.x / 1.2 ) - 0.5 ) < 0.36 ? vec3( 0.5, 0.56, 0.6 ) * ( 0.8 + 0.4 * smoothstep( 0.85, 1.95, p.y ) ) : p.y < 0.85 ? vec3( 0.55, 0.53, 0.5 ) : vec3( 0.74, 0.74, 0.72 );   // зеркала над столиком
						} else if ( shopT ) dc = p.y < 2.0 ? ( fract( p.y / 0.42 ) < 0.12 ? vec3( 0.5 ) : fPick( fHash( floor( vec2( p.x / 0.17, p.y / 0.42 ) ) + rH * 9.0 ), vec3( 0.55, 0.3, 0.25 ), vec3( 0.3, 0.38, 0.5 ), vec3( 0.62, 0.56, 0.38 ), vec3( 0.66 ), vec3( 0.32, 0.45, 0.34 ) ) * 0.7 ) : wpap;
						else if ( boxT ) {
							vec2 tc = fract( p.xy / 0.66 ) - 0.5;
							float r = length( tc );
							if ( p.x < -0.2 && p.y < 2.0 ) dc = r < 0.31 ? ( r < 0.15 ? vec3( 0.22 ) : vec3( 0.035 ) ) : wpap * 0.6;
							else if ( p.x > 0.2 && p.y > 0.95 && p.y < 1.95 ) dc = vec3( 0.2, 0.26, 0.3 ) * ( 0.8 + 0.4 * step( 0.6, fHash( floor( p.xy / 0.12 ) ) ) );
							else if ( p.x > 0.2 && p.y < 0.95 ) dc = vec3( 0.55, 0.08, 0.06 ) * ( 0.85 + 0.15 * step( 0.1, fract( p.y / 0.24 ) ) );
						} else if ( officeT ) dc = p.y < 1.8 && fract( p.x / 3.0 ) < 0.45 ? vec3( 0.55, 0.56, 0.55 ) * ( 0.9 + 0.1 * step( 0.05, fract( p.y / 0.45 ) ) ) : wpap;
						else if ( abs( p.x - ( rH2 - 0.5 ) * RW ) < 0.45 && p.y < 1.8 ) dc = fPick( rH2, vec3( 0.3, 0.2, 0.13 ), vec3( 0.55, 0.45, 0.33 ), vec3( 0.7, 0.68, 0.64 ), vec3( 0.18, 0.14, 0.1 ), vec3( 0.45, 0.32, 0.2 ) ) * ( 0.85 + 0.15 * step( 0.05, fract( p.y / 0.45 ) ) );
						else if ( abs( p.y - 1.55 ) < 0.22 && abs( p.x + ( rH2 - 0.5 ) * RW * 0.7 ) < 0.3 ) dc = fPick( rH3, vec3( 0.3, 0.4, 0.5 ), vec3( 0.6, 0.5, 0.3 ), vec3( 0.2 ), vec3( 0.7, 0.62, 0.55 ), vec3( 0.35, 0.45, 0.3 ) );
					} else if ( t == ty ) {
						ed = min( RW - abs( p.x ), RD - p.z );
						if ( rd.y > 0.0 ) {
							// потолок: круглая лампа в комнате, ряды ламп дневного света в магазине, конторе, мастерской
							lm = ( shopT || officeT || boxT ) ? step( abs( fract( p.z / 1.8 + 0.5 ) - 0.5 ), 0.07 ) * step( abs( fract( p.x / 2.4 ) - 0.5 ), 0.32 ) : step( length( vec2( p.x, p.z - RD * 0.45 ) ), 0.28 );
							dc = mix( vec3( 0.72, 0.72, 0.7 ), vec3( 0.95 ), lm );
						} else {
							// пол: татами, доски, ковёр; плитка в магазине и конторе, бетон в пятнах в мастерской
							float fm = fract( rH * 5.3 );
							vec2 fq = p.xz;
							dc = shopT || officeT ? vec3( 0.5, 0.5, 0.48 ) * ( 0.88 + 0.12 * step( 0.04, min( fract( fq.x / 0.6 ), fract( fq.y / 0.6 ) ) ) )
								: boxT ? vec3( 0.3, 0.3, 0.29 ) * ( 0.7 + 0.3 * fHash( floor( fq / 0.8 ) + seed ) )
								: fm < 0.3 ? vec3( 0.48, 0.46, 0.3 ) * ( 0.8 + 0.2 * step( 0.03, min( fract( fq.x / 0.9 ), fract( fq.y / 1.8 ) ) ) )
								: fm < 0.8 ? vec3( 0.34, 0.22, 0.13 ) * ( 0.85 + 0.15 * fHash( vec2( floor( fq.x / 0.14 ), floor( fq.y / 1.2 ) ) ) )
								: vec3( 0.4, 0.37, 0.35 );
						}
					} else {
						ed = min( min( p.y, RH - p.y ), RD - p.z );
						dc = wpap * 0.9;
						if ( shopT && wShopK > 0.5 ) dc = p.y < 1.0 ? wpap * 0.7 : wpap;   // у еды и услуг по бокам — стены
						else if ( shopT && p.y < 2.0 ) dc = fract( p.y / 0.42 ) < 0.12 ? vec3( 0.5 ) : fPick( fHash( floor( vec2( p.z / 0.2, p.y / 0.42 ) ) + rH * 7.0 ), vec3( 0.6, 0.52, 0.38 ), vec3( 0.32, 0.4, 0.5 ), vec3( 0.66 ), vec3( 0.52, 0.32, 0.3 ), vec3( 0.36, 0.46, 0.36 ) ) * 0.65;
					}
					dc *= 0.6 + 0.4 * smoothstep( 0.0, 0.45, ed );   // углы комнаты темнее
					// мебель — силуэт на плоскости посреди комнаты
					float zc = RD * ( 0.38 + 0.25 * rH2 ), tcd = zc / cz;
					if ( tcd < t ) {
						vec3 pc = ro + rd * tcd, fc = vec3( -1.0 );
						if ( shopT && wShopK > 0.5 && wShopK < 1.5 ) {                // столики и стулья
							float tx = fract( pc.x / 1.5 );
							if ( ( pc.y < 0.74 && pc.y > 0.68 && abs( tx - 0.5 ) < 0.32 ) || ( pc.y < 0.7 && abs( abs( tx - 0.5 ) - 0.29 ) < 0.025 ) ) fc = vec3( 0.36, 0.24, 0.14 );
							else if ( pc.y < 0.95 && abs( abs( tx - 0.5 ) - 0.42 ) < 0.07 && ( pc.y < 0.46 || abs( tx - 0.5 ) > 0.46 ) ) fc = vec3( 0.2, 0.14, 0.1 );
						} else if ( shopT && wShopK > 1.5 ) {                         // кресла (парикмахерская, клиника)
							float tx = fract( pc.x / 1.2 ) - 0.5;
							if ( abs( tx ) < 0.28 && ( pc.y < 0.62 || ( pc.y < 1.25 && tx > 0.1 ) ) && pc.y > 0.1 ) fc = vec3( 0.12, 0.12, 0.13 ) + vec3( 0.25, 0.04, 0.03 ) * step( 0.5, fract( rH * 3.0 ) );
							else if ( abs( tx ) < 0.05 && pc.y <= 0.1 ) fc = vec3( 0.5 );
						} else if ( shopT ) {                                        // стеллажи-«острова» с товаром
							if ( pc.y < 1.4 && abs( fract( pc.x / 1.7 ) - 0.5 ) < 0.3 ) fc = fract( pc.y / 0.35 ) < 0.15 ? vec3( 0.5 ) : fPick( fHash( floor( vec2( pc.x / 0.15, pc.y / 0.35 ) ) + rH2 * 9.0 ), vec3( 0.6, 0.34, 0.28 ), vec3( 0.72 ), vec3( 0.32, 0.4, 0.55 ), vec3( 0.66, 0.6, 0.4 ), vec3( 0.3 ) ) * 0.7;
						} else if ( boxT ) {                                          // машина сзади: в мастерской — на подъёмнике, в гараже — на полу
							float lift = wId.x > 89.0 ? 0.0 : 1.0 + 0.4 * rH, cy = pc.y - lift, ax = abs( pc.x );
							vec3 body = fPick( rH2, vec3( 0.75, 0.75, 0.73 ), vec3( 0.05 ), vec3( 0.55, 0.06, 0.05 ), vec3( 0.12, 0.2, 0.45 ), vec3( 0.6, 0.6, 0.62 ) );
							if ( ax < 0.85 && cy > 0.28 && cy < 0.82 ) fc = ( ax > 0.58 && cy > 0.6 && cy < 0.74 ) ? vec3( 0.6, 0.05, 0.04 ) : body;
							else if ( cy >= 0.82 && cy < 1.3 && ax < 0.68 - ( cy - 0.82 ) * 0.5 ) fc = ( cy > 0.88 && cy < 1.24 && ax < 0.55 - ( cy - 0.82 ) * 0.5 ) ? vec3( 0.04, 0.05, 0.06 ) : body;
							else if ( abs( ax - 0.62 ) < 0.18 && cy > 0.0 && cy <= 0.28 ) fc = vec3( 0.03 );
							else if ( lift > 0.5 && abs( ax - 1.35 ) < 0.07 && pc.y < 2.6 ) fc = vec3( 0.15, 0.3, 0.6 );
						} else if ( officeT ) {                                       // столы и перегородки
							if ( pc.y < 0.72 || ( pc.y < 1.2 && fract( pc.x / 1.6 ) < 0.05 ) ) fc = pc.y > 0.68 ? vec3( 0.6 ) : vec3( 0.32, 0.33, 0.35 );
						} else if ( ( pc.y < 0.42 + 0.4 * rH && abs( pc.x - ( rH3 - 0.5 ) * RW * 0.5 ) < RW * 0.45 ) || ( rH > 0.55 && pc.y < 1.75 && abs( pc.x - RW * 0.6 * sign( rH2 - 0.5 ) ) < 0.32 ) )
							fc = fPick( fract( rH2 * 3.7 ), vec3( 0.35, 0.26, 0.18 ), vec3( 0.55, 0.5, 0.42 ), vec3( 0.25, 0.3, 0.4 ), vec3( 0.6, 0.58, 0.55 ), vec3( 0.2, 0.15, 0.12 ) );   // диван, стол, комод, шкаф
						if ( fc.x >= 0.0 ) { dc = fc * 0.85; p = pc; lm = 0.0; }
					}
					// свет: днём в комнате темнее, чем на улице, и к глубине темнее; ночью — от лампы
					float fall = 1.0 - 0.5 * smoothstep( 0.0, RD, p.z );
					de = dc * lamp * ( on * ( shopT ? 0.95 : 0.85 ) + dayOn ) * fall + lamp * lm * ( on * 4.0 + dayOn * 3.0 );
					dc *= 0.2 * fall;
					// перед комнатой, на плоскости стекла: шторы, тюль, матовое стекло, ставни, жалюзи, роллета гаража
					float cm = fract( rH2 * 5.1 + rH * 1.3 );
					if ( aband ) {
						if ( rH > 0.5 ) { dc = vec3( 0.42, 0.33, 0.22 ) * ( 0.8 + 0.2 * step( 0.08, fract( g.y / 0.3 + rH3 ) ) ); de = vec3( 0.0 ); refl = 0.0; }   // заколочено фанерой
						else dc *= 0.6;
					} else if ( wType < 0.5 ) {
						float fold = 0.8 + 0.2 * abs( fract( g.x / 0.11 ) * 2.0 - 1.0 );
						if ( rH3 < wFrost ) { dc = vec3( 0.4, 0.42, 0.43 ) * ( 0.85 + 0.15 * smoothstep( - wH.y, wH.y, g.y ) ); de = lamp * on * 0.6; }   // матовое стекло
						else if ( wAmado > 0.5 && cm < 0.22 ) { dc = vec3( 0.42, 0.43, 0.42 ) * ( 0.82 + 0.18 * step( 0.5, fract( g.x / 0.2 ) ) ); de = vec3( 0.0 ); refl = 0.0; }   // закрытые ставни-амадо
						else if ( cm < 0.4 ) { dc = mix( dc, vec3( 0.66, 0.65, 0.62 ) * fold, 0.58 ); de = mix( de, lamp * on * 0.55 * fold, 0.6 ); }   // тюль
						else if ( cm < 0.72 && abs( g.x ) > ( 0.25 + 0.6 * rH3 ) * wH.x ) {                                   // шторы раздвинуты не до конца
							vec3 cc = fPick( fract( rH * 3.3 ), vec3( 0.7, 0.66, 0.56 ), vec3( 0.28, 0.36, 0.48 ), vec3( 0.5, 0.4, 0.28 ), vec3( 0.38, 0.46, 0.36 ), vec3( 0.62, 0.55, 0.5 ) ) * fold;
							dc = cc * 0.8; de = cc * lamp * on * 0.4;
						}
					} else if ( officeT && g.y > wH.y - ( 0.2 + 1.4 * rH2 ) * wH.y ) {                                       // жалюзи опущены сверху
						float sl = step( 0.4, fract( g.y / 0.05 ) );
						dc = vec3( 0.6, 0.61, 0.6 ) * ( 0.7 + 0.3 * sl ); de = lamp * on * 0.35 * ( 1.0 - sl * 0.6 );
					} else if ( boxT && g.y > wH.y - ( rH < 0.45 ? 2.0 : 0.14 ) * wH.y ) {                                   // роллета: опущена или свёрнута наверху
						dc = vec3( 0.36, 0.37, 0.38 ) * ( 0.75 + 0.25 * step( 0.25, fract( g.y / 0.09 ) ) ); de = vec3( 0.0 );
					}
					// створки: рама по краю стекла, у широкого окна — стык раздвижных рам посередине
					if ( !shopT && !boxT && ( max( ov.x, ov.y ) > -0.04 || ( wH.x > 0.5 && abs( g.x ) < 0.03 ) ) ) { dc = wFrame; de = vec3( 0.0 ); }
				}
				nc = mix( nc, dc, det ); ne = mix( ne, de, det );
			}
			nc = mix( nc, vec3( 0.32, 0.31, 0.29 ), 0.18 * age * refl );   // пыль на стекле
			col = nc; fEmit += ne;
			fRough = refl > 0.5 ? 0.12 + 0.3 * age : 0.75; fMetal = 0.0;
			// Френель: под острым углом стекло — почти зеркало
			fGlassF = refl * ( 0.08 + 0.92 * pow( 1.0 - cz, 4.0 ) ) * ( 1.0 - 0.35 * age );
			fReflY = vd.y; fReflH = rd.x / cz;
		}
		diffuseColor.rgb = col;
	}
`,at={uDayLum:{value:0},uBounce:{value:new Ee(0,0,0)},uNearC:{value:[0,0]},tFacDet:{value:null},tFacGrime:{value:null},tSigns:{value:null}},no={tRoofDet:{value:null}},Nl=null,kl=[["ラーメン 一番",0],["居酒屋 とり吉",1],["寿司 まる八",1],["焼肉 大将",0],["ほっと弁当",0],["喫茶 ロマン",1],["中華料理 龍門",1],["そば・うどん",1],["吉田のうどん",1],["和菓子 松月堂",1],["美容室 カット",0],["理容 タナカ",0],["山田歯科医院",0],["ふじ整骨院",0],["学習塾 進学会",0],["クリーニング",0],["不動産 賃貸",1],["コインランドリー",0],["くすり 薬局",0],["酒 山本商店",1],["書店 文林堂",1],["サイクルショップ",0],["でんき 電器店",0],["写真 カメラ",0],["メガネ・時計",0],["生花 フラワー",0],["タイヤ専門店",0],["自動車整備工場",0],["鈑金塗装",0],["中古車 販売",0],["カー用品",0],["チューニング工房",0]],Ol=["ラーメン","居酒屋","薬","美容室","歯科","そば","寿司","焼肉","スナック","カラオケ","診療所","整体","質","酒","たばこ","旅館","麻雀","うどん","定食","喫茶","不動産","学習塾","理容","花","本","鍼灸","接骨院","古着","パチンコ","ゲーム","民宿","整備"],Ho=[["#e8e4dc","#b0221c"],["#a8261e","#f2eee6"],["#e0b52c","#1d1a16"],["#1f4f8f","#f0f0ee"],["#2f6b45","#f0f0e8"],["#1c1c1e","#e6c13a"],["#e6dcc4","#5a3520"],["#cc6a1e","#fbf6ec"],["#f2f1ec","#1d2a52"],["#5b2a44","#f2e6ec"]];function Il(){let a=2048,e=new OffscreenCanvas(a,a),t=e.getContext("2d"),o='"Yu Gothic UI", "Yu Gothic", YuGothic, Meiryo, "Hiragino Kaku Gothic ProN", "Hiragino Sans", "Noto Sans JP", "Noto Sans CJK JP", sans-serif',i='"Yu Mincho", YuMincho, "Hiragino Mincho ProN", "Noto Serif JP", "Noto Serif CJK JP", "MS Mincho", serif',r=n=>Ho[(n*7+3)%Ho.length];t.fillStyle="#808080",t.fillRect(0,0,a,a),t.textAlign="center",t.textBaseline="middle",kl.forEach(([n,l],c)=>{let u=c%4*512,f=Math.floor(c/4)*128,[m,p]=r(c);t.fillStyle=m,t.fillRect(u,f,512,128),t.fillStyle=p,t.fillRect(u,f+6,512,5),t.fillRect(u,f+117,512,5),t.font=`bold 76px ${l?i:o}`;let b=t.measureText(n).width,P=Math.min(1,440/Math.max(1,b));t.save(),t.translate(u+256,f+66),t.scale(P,1),t.fillText(n,0,0),t.restore()}),Ol.forEach((n,l)=>{let c=l%16*128,u=1024+Math.floor(l/16)*512,[f,m]=r(l+5),p=[...n],b=Math.min(92,440/p.length);t.fillStyle=m,t.fillRect(c,u,128,512),t.fillStyle=f,t.fillRect(c+7,u+7,114,498),t.fillStyle=m,t.font=`bold ${b}px ${l%3?o:i}`,p.forEach((P,S)=>{let M=u+256+(S-(p.length-1)/2)*b*1.02;P==="ー"?(t.save(),t.translate(c+64,M),t.rotate(Math.PI/2),t.fillText(P,0,0),t.restore()):t.fillText(P,c+64,M)})});let s=new gt(e);return s.wrapS=s.wrapT=1001,s.minFilter=Ta,s.magFilter=Da,s.generateMipmaps=!0,s.anisotropy=4,s.colorSpace=mt,s.needsUpdate=!0,s}function Ul(a){let e=()=>{let t=new OffscreenCanvas(1,1),o=t.getContext("2d");return o.fillStyle="#808080",o.fillRect(0,0,1,1),new gt(t)};return at.tFacDet.value||(at.tFacDet.value=e(),at.tFacGrime.value=e(),no.tRoofDet.value=e()),at.tSigns.value||(at.tSigns.value=Il()),Nl||=Promise.all(["facade_detail","facade_grime","roof_detail"].map(async t=>{let o=await createImageBitmap(await(await fetch(`${a}textures/${t}.jpg`)).blob()),i=new gt(o);return i.wrapS=i.wrapT=xt,i.minFilter=Ta,i.magFilter=Da,i.generateMipmaps=!0,i.anisotropy=4,i.colorSpace="",i.needsUpdate=!0,i})).then(([t,o,i])=>{at.tFacDet.value=t,at.tFacGrime.value=o,no.tRoofDet.value=i}).catch(t=>console.warn("текстуры фасадов:",t))}function Hl(a){let e=new Ie({roughness:1,metalness:0,envMapIntensity:.75});return e.name="cityFacade",e.userData.night=a,e.onBeforeCompile=t=>{t.uniforms.uNight=a,t.uniforms.uDayLum=at.uDayLum,t.uniforms.uBounce=at.uBounce,t.uniforms.uNearC=at.uNearC,t.uniforms.tFacDet=at.tFacDet,t.uniforms.tFacGrime=at.tFacGrime,t.uniforms.tSigns=at.tSigns,t.vertexShader=Ll+t.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
	{
		vec3 sc = vec3( length( instanceMatrix[ 0 ].xyz ), length( instanceMatrix[ 1 ].xyz ), length( instanceMatrix[ 2 ].xyz ) );
		vFacLocal = position * sc; vFacScale = sc; vFacNormal = normal; vFacKind = aKind;
		vFacSeed = aSeed;   // зерно дома считает JS (facadeDetail.js houseSeed) — та же раскладка окон у геометрии деталей
		// «вблизи»: ячейка 125 м дома (как cityDecor в worldVisual) ближе 110 м к машине — то же правило, что видимость ячеек в beauty.update
		vec2 nc0 = floor( instanceMatrix[ 3 ].xz / 125.0 ) * 125.0, ncl = uNearC - modelMatrix[ 3 ].xz;
		vec2 ndd = max( max( nc0 - ncl, vec2( 0.0 ) ), ncl - nc0 - 125.0 );
		vFacNear = dot( ndd, ndd ) < 12100.0 ? 1.0 : 0.0;
		// взгляд в осях дома: поворот дома обратно (у плиток мира только сдвиг)
		mat3 rotF = mat3( instanceMatrix[ 0 ].xyz / sc.x, instanceMatrix[ 1 ].xyz / sc.y, instanceMatrix[ 2 ].xyz / sc.z );
		vFacView = transpose( rotF ) * ( ( modelMatrix * instanceMatrix * vec4( position, 1.0 ) ).xyz - cameraPosition );
	}`).replace("#include <project_vertex>",`#include <project_vertex>
	// балкон издали (вид 45) вблизи убирается: там плита, ограждение и перегородки — детали (facadeDetail.js)
	if ( floor( aKind + 0.5 ) == 45.0 && vFacNear > 0.5 ) gl_Position = vec4( 0.0, 0.0, -2.0, 1.0 );`),t.fragmentShader=Al+t.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
`+El).replace("#include <roughnessmap_fragment>","float roughnessFactor = fRough;").replace("#include <metalnessmap_fragment>","float metalnessFactor = fMetal;").replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
	// рельеф стены (откосы, отливы, пояски, трубы): нормаль наклоняется в осях фасада
	if ( dot( fBump, fBump ) > 0.0 ) {
		vec3 upV = normalize( ( viewMatrix * vec4( 0.0, 1.0, 0.0, 0.0 ) ).xyz );
		vec3 tV = normalize( cross( upV, normal ) ) * fBumpS;
		normal = normalize( normal * fBump.z + tV * fBump.x + upV * fBump.y );
	}`).replace("#include <lights_fragment_end>",`irradiance += uBounce * clamp( 1.0 - vFacNormal.y, 0.0, 1.5 );   // стены и низ плит, козырьков (от земли — сильнее всего)
#include <lights_fragment_end>`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
	totalEmissiveRadiance += fEmit;`).replace("#include <fog_fragment>",`#ifdef USE_FOG
	// стекло отражает небо (цвет дымки у горизонта, выше — голубее), дома напротив — тёмные силуэты, внизу — улицу
	if ( fGlassF > 0.0 ) {
		float sky = 0.06 + 0.3 * fHash( vec2( floor( fReflH * 2.5 + vFacSeed * 40.0 ), 7.0 ) );
		vec3 env = fReflY > sky ? fogColor * mix( vec3( 1.0 ), vec3( 0.8, 0.9, 1.08 ), smoothstep( sky, 0.8, fReflY ) ) : fogColor * ( fReflY > -0.03 ? 0.42 : 0.3 );
		gl_FragColor.rgb = mix( gl_FragColor.rgb, env, fGlassF );
	}
	#endif
#include <fog_fragment>`)},e.customProgramCacheKey=()=>"cityFacade28",e}function Bl(){let a=new Ie({vertexColors:!0,roughness:.95,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3});return a.name="cityGround",a.onBeforeCompile=e=>{e.vertexShader=`attribute float aGround;
varying vec3 vGrW;
varying float vGrK;
`+e.vertexShader.replace("#include <fog_vertex>",`#include <fog_vertex>
	vGrW = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz; vGrK = aGround;`),e.fragmentShader=`varying vec3 vGrW;
varying float vGrK;
float gHash( vec2 p ) { vec3 q = fract( vec3( p.xyx ) * 0.1031 ); q += dot( q, q.yzx + 33.33 ); return fract( ( q.x + q.y ) * q.z ); }
float gNoise( vec2 p ) { vec2 i = floor( p ), f = fract( p ); f = f * f * ( 3.0 - 2.0 * f ); return mix( mix( gHash( i ), gHash( i + vec2( 1.0, 0.0 ) ), f.x ), mix( gHash( i + vec2( 0.0, 1.0 ) ), gHash( i + vec2( 1.0, 1.0 ) ), f.x ), f.y ); }
`+e.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
	{
		float k = floor( vGrK + 0.5 );
		vec2 cellId = floor( vGrW.xz / 0.6 );
		float rnd = gHash( cellId );
		if ( k < 0.5 ) {                                                   // тротуар: плитка 0,6 м со швами
			vec2 f = abs( fract( vGrW.xz / 0.6 ) - 0.5 );
			diffuseColor.rgb *= ( 1.0 - smoothstep( 0.44, 0.5, max( f.x, f.y ) ) * 0.35 ) * ( 0.9 + 0.12 * rnd );
		} else if ( k < 1.5 ) {                                            // двор жилого квартала: бетон, гравий и садики пятнами
			float gn = gNoise( vGrW.xz / 3.0 ), fine = rnd;               // один плавный шум на точку: земля занимает много экрана
			diffuseColor.rgb *= 0.92 + 0.12 * fine;
			diffuseColor.rgb = mix( diffuseColor.rgb, vec3( 0.15, 0.142, 0.13 ) * ( 0.8 + 0.4 * fine ), 1.0 - smoothstep( 0.34, 0.4, gn ) );
			diffuseColor.rgb = mix( diffuseColor.rgb, vec3( 0.055, 0.092, 0.035 ) * ( 0.8 + 0.4 * fine ), smoothstep( 0.6, 0.66, gn ) );
		} else if ( k < 3.5 ) diffuseColor.rgb *= 0.92 + 0.14 * rnd;       // стоянка, трава: пятна
		else if ( k < 4.5 ) diffuseColor.rgb *= 0.86 + 0.2 * smoothstep( 0.3, 0.5, abs( fract( ( vGrW.x + vGrW.z * 0.35 ) / 0.5 ) - 0.5 ) );   // поле: борозды
		else if ( k < 5.5 ) diffuseColor.rgb *= 0.9 + 0.12 * gNoise( vGrW.xz / 0.7 );                       // бордюр: бетон
		else if ( k < 6.5 ) {                                              // канава: бетонные крышки, решётки — тёмные щели сеткой
			float gr = step( 0.55, fract( vGrW.x / 0.045 ) ) + step( 0.55, fract( vGrW.z / 0.045 ) );
			diffuseColor.rgb *= ( rnd < 0.3 ? 1.0 - 0.55 * min( gr, 1.0 ) : 0.95 ) * ( 0.88 + 0.12 * gNoise( vGrW.xz / 0.5 ) );
		} else if ( k < 7.5 ) {                                            // тактильная плитка: жёлтая, с выпуклыми точками
			vec2 tp = fract( vGrW.xz / 0.075 ) - 0.5;
			diffuseColor.rgb *= 0.85 + 0.25 * step( length( tp ), 0.22 );
		} else if ( k < 8.5 ) diffuseColor.rgb *= 0.82 + 0.18 * gNoise( vGrW.xz / 0.6 );                 // белая линия: стёртая местами
		else diffuseColor.rgb *= ( 0.8 + 0.3 * gNoise( vGrW.xz / 1.7 ) ) * ( 0.92 + 0.1 * gNoise( vGrW.xz / 0.25 ) );   // асфальт стоянки: пятна, без плитки
	}`)},a.customProgramCacheKey=()=>"cityGround8",a}var Sr={thick:.1,capW:.03,capH:.075};function br(a){let e=[],t=[],o=[];for(let[r,s]of a){let n=r[0],l=r[1],c=r[2],u=(l[1]-n[1])*(c[2]-n[2])-(l[2]-n[2])*(c[1]-n[1]),f=(l[2]-n[2])*(c[0]-n[0])-(l[0]-n[0])*(c[2]-n[2]),m=(l[0]-n[0])*(c[1]-n[1])-(l[1]-n[1])*(c[0]-n[0]),p=u*s[0]+f*s[1]+m*s[2]<0?[...r].reverse():r,b=e.length/3;for(let P of p)e.push(...P),t.push(...s);for(let P=1;P+1<p.length;P++)o.push(b,b+P,b+P+1)}let i=new it;return i.setAttribute("position",new ze(e,3)),i.setAttribute("normal",new ze(t,3)),i.setIndex(o),i}function Mr(a){let{capW:e,capH:t}=Sr,o=.97,i=1+t;return[[[[-a,i,-e],[a,i,-e],[a,i,e],[-a,i,e]],[0,1,0]],[[[-a,o,e],[a,o,e],[a,i,e],[-a,i,e]],[0,0,1]],[[[-a,o,-e],[a,o,-e],[a,i,-e],[-a,i,-e]],[0,0,-1]],[[[-a,o,-e],[-a,o,e],[-a,i,e],[-a,i,-e]],[-1,0,0]],[[[a,o,-e],[a,o,e],[a,i,e],[a,i,-e]],[1,0,0]]]}function Bo(a=!0){let e=Math.SQRT1_2,t=a?Sr.thick:0,o=[[[[-.5,0,.5],[.5,0,.5],[.5,1,0],[-.5,1,0]],[0,e,e]],[[[.5,0,-.5],[-.5,0,-.5],[-.5,1,0],[.5,1,0]],[0,e,-e]],a?[[[-.5,-t,-.5],[-.5,-t,.5],[-.5,0,.5],[-.5,1,0],[-.5,0,-.5]],[-1,0,0]]:[[[-.5,0,-.5],[-.5,0,.5],[-.5,1,0]],[-1,0,0]],a?[[[.5,-t,-.5],[.5,-t,.5],[.5,0,.5],[.5,1,0],[.5,0,-.5]],[1,0,0]]:[[[.5,0,-.5],[.5,0,.5],[.5,1,0]],[1,0,0]]];return a&&o.push([[[-.5,-t,.5],[.5,-t,.5],[.5,0,.5],[-.5,0,.5]],[0,0,1]],[[[-.5,-t,-.5],[.5,-t,-.5],[.5,0,-.5],[-.5,0,-.5]],[0,0,-1]],[[[-.5,-t,-.5],[.5,-t,-.5],[.5,-t,.5],[-.5,-t,.5]],[0,-1,0]],...Mr(.5)),br(o)}function Go(a=!0){let e=Math.SQRT1_2,t=.22,o=[[[[-.5,0,.5],[.5,0,.5],[t,1,0],[-.22,1,0]],[0,e,e]],[[[.5,0,-.5],[-.5,0,-.5],[-.22,1,0],[t,1,0]],[0,e,-e]],[[[-.5,0,-.5],[-.5,0,.5],[-.22,1,0]],[-e,e,0]],[[[.5,0,.5],[.5,0,-.5],[t,1,0]],[e,e,0]]];return a&&o.push([[[-.5,-.1,.5],[.5,-.1,.5],[.5,0,.5],[-.5,0,.5]],[0,0,1]],[[[-.5,-.1,-.5],[.5,-.1,-.5],[.5,0,-.5],[-.5,0,-.5]],[0,0,-1]],[[[-.5,-.1,-.5],[-.5,-.1,.5],[-.5,0,.5],[-.5,0,-.5]],[-1,0,0]],[[[.5,-.1,-.5],[.5,-.1,.5],[.5,0,.5],[.5,0,-.5]],[1,0,0]],[[[-.5,-.1,-.5],[.5,-.1,-.5],[.5,-.1,.5],[-.5,-.1,.5]],[0,-1,0]],...Mr(t)),br(o)}var go={cols:8,px:256,period:12},Qt={boulevard:0,avenue:1,collector:2,minor:3,asphalt:4,white:6};function _r(a,e,t,o){a.fillStyle="#3b3c3f",a.fillRect(0,0,e,t);let i=12345,r=()=>(i=i*1664525+1013904223>>>0,i/4294967296);for(let s=0;s<o;s++){let n=44+Math.floor(r()*34);a.fillStyle=`rgb(${n},${n},${n+2})`,a.fillRect(Math.floor(r()*e),Math.floor(r()*t),2,2)}}function Gl(){let a=go.px,e=new OffscreenCanvas(a,a);_r(e.getContext("2d"),a,a,3250);let t=new gt(e);return t.colorSpace=mt,t.wrapS=t.wrapT=xt,t.anisotropy=4,t}function Wl(){let a=go,e=a.cols*a.px,t=a.px,o=new OffscreenCanvas(e,t),i=o.getContext("2d");_r(i,e,t,26e3);let r="#e6e6e2",s=(l,c,u,f,m,p=!1)=>{i.fillStyle=m;let b=l*a.px+u/c*a.px,P=Math.max(2,f/c*a.px);i.fillRect(b-P/2,0,P,p?t/2:t)};for(let[l,c]of[["boulevard",0],["avenue",1],["collector",2],["minor",3]]){let u=ir[l].w;if(s(c,u,.5,.15,r),s(c,u,u-.5,.15,r),l==="boulevard"){s(c,u,u/2-.9,.15,r),s(c,u,u/2+.9,.15,r),i.save(),i.beginPath(),i.rect(c*a.px+(u/2-.82)/u*a.px,0,1.64/u*a.px,t),i.clip(),i.strokeStyle=r,i.lineWidth=4;for(let f=-4;f<12;f++)i.beginPath(),i.moveTo(c*a.px+a.px*.42,f*t/6),i.lineTo(c*a.px+a.px*.58,f*t/6+t/6),i.stroke();i.restore(),s(c,u,u/2-.9-(u/2-1.4)/2,.15,r,!0),s(c,u,u/2+.9+(u/2-1.4)/2,.15,r,!0)}else l==="avenue"?(s(c,u,u/2,.18,"#e2a23a"),s(c,u,.5+(u/2-.5)/2,.15,r,!0),s(c,u,u-.5-(u/2-.5)/2,.15,r,!0)):s(c,u,u/2,.15,r,!0)}i.fillStyle=r,i.fillRect(Qt.white*a.px,0,a.px,t);let n=new gt(o);return n.colorSpace=mt,n.wrapT=xt,n.anisotropy=4,n}var ut={poleH:6.2,arm:5.2,headX:4.4,headY:5.55};function Vl(){let a=new to(.1,.12,ut.poleH,8);a.translate(0,ut.poleH/2,0);let e=new to(.055,.055,ut.arm,6);e.rotateZ(Math.PI/2),e.translate(ut.arm/2,ut.poleH-.3,0);let t=new ea(1.36,.46,.3);t.translate(ut.headX,ut.headY,0);let o=new ea(.06,ut.poleH-.3-ut.headY-.23,.06);o.translate(ut.headX,(ut.poleH-.3+ut.headY+.23)/2,0);let i=s=>{let n=[],l=[],c=[];for(let f of s){let m=f.getAttribute("position"),p=f.getAttribute("normal"),b=n.length/3;for(let S=0;S<m.count;S++)n.push(m.getX(S),m.getY(S),m.getZ(S)),l.push(p.getX(S),p.getY(S),p.getZ(S));let P=f.getIndex();for(let S=0;S<P.count;S++)c.push(b+P.getX(S));f.dispose()}let u=new it;return u.setAttribute("position",new ze(n,3)),u.setAttribute("normal",new ze(l,3)),u.setIndex(c),u},r=s=>{let n=[],l=[],c=[],u=[[.1,1,.75],[1,.75,.1],[1,.12,.08]];for(let m=0;m<3;m++){let p=ut.headX-.42+m*.42,b=n.length/3,P=m===s,S=u[m].map(M=>M*(P?1.6:.07));n.push(p,ut.headY,.16),l.push(...S);for(let M=0;M<=12;M++){let B=M/12*Math.PI*2;n.push(p+Math.cos(B)*.15,ut.headY+Math.sin(B)*.15,.16),l.push(...S)}for(let M=0;M<12;M++)c.push(b,b+M+1,b+M+2)}let f=new it;return f.setAttribute("position",new ze(n,3)),f.setAttribute("color",new ze(l,3)),f.setIndex(c),f};return{body:i([a,e,t,o]),go:r(0),stop:r(2)}}function $l(){let a=new ea(.9,1.83,.75);a.translate(0,.915,0),a.groups.forEach((n,l)=>{n.materialIndex=+(l===4)});let e=new OffscreenCanvas(128,256),t=e.getContext("2d");t.fillStyle="#f4f4f2",t.fillRect(0,0,128,256),t.fillStyle="#c8202a",t.fillRect(0,0,128,34),t.fillStyle="#20252b",t.fillRect(8,40,112,120);let o=["#d32f2f","#1e88e5","#43a047","#fbc02d","#8e24aa","#f57c00","#ffffff","#795548"];for(let n=0;n<4;n++)for(let l=0;l<6;l++)t.fillStyle=o[(n*3+l*5)%o.length],t.fillRect(12+l*18,46+n*28,12,20);t.fillStyle="#2b2f36",t.fillRect(16,196,96,26),t.fillStyle="#8a9099",t.fillRect(96,168,14,22);let i=new gt(e);i.colorSpace=mt;let r=new Ie({color:15263974,roughness:.4,metalness:.2}),s=new Ie({map:i,roughness:.25,emissive:16777215,emissiveMap:i,emissiveIntensity:.05});return r.name="cityVendBody",s.name="cityVendFace",{geo:a,mats:[r,s],tex:i}}var co={uRes:{value:[800,450]},uColor:{value:new Ee(1776928)}},Wo=null;function Fa(a,e=.012){Wo||=new Pr({name:"wires",transparent:!0,depthWrite:!1,side:2,uniforms:co,vertexShader:`attribute vec3 aB;
attribute float aSide;
attribute float aR;
uniform vec2 uRes;
varying float vA;
void main() {
	vec4 a = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ), b = projectionMatrix * modelViewMatrix * vec4( aB, 1.0 );
	if ( a.w < 0.05 || b.w < 0.05 ) { gl_Position = vec4( 0.0, 0.0, -2.0, 1.0 ); vA = 0.0; return; }
	vec2 d = b.xy / b.w * uRes - a.xy / a.w * uRes;
	float L = length( d );
	d = L > 1e-4 ? d / L : vec2( 1.0, 0.0 );
	float px = aR * 2.0 * projectionMatrix[ 1 ][ 1 ] * uRes.y / a.w;   // толщина в пикселях (uRes — половина кадра)
	vA = clamp( px, 0.3, 1.0 ) * exp( -a.w / 700.0 );
	a.xy += vec2( -d.y, d.x ) * aSide * max( px, 1.0 ) * 0.5 / uRes * a.w;
	gl_Position = a;
}`,fragmentShader:`uniform vec3 uColor;
varying float vA;
void main() { gl_FragColor = vec4( uColor, vA ); }`});let t=a.length/6,o=new Float32Array(t*12),i=new Float32Array(t*12),r=new Float32Array(t*4),s=new Float32Array(t*4),n=new Uint32Array(t*6);for(let u=0;u<t;u++){let f=a.slice(u*6,u*6+3),m=a.slice(u*6+3,u*6+6),p=typeof e=="number"?e:e[u];[f,f,m,m].forEach((b,P)=>(o.set(b,u*12+P*3),i.set(P<2?m:f,u*12+P*3),s[u*4+P]=p)),r.set([-1,1,1,-1],u*4),n.set([u*4,u*4+1,u*4+2,u*4+1,u*4+3,u*4+2],u*6)}let l=new it;l.setAttribute("position",new ze(o,3)),l.setAttribute("aB",new ze(i,3)),l.setAttribute("aSide",new ze(r,1)),l.setAttribute("aR",new ze(s,1)),l.setIndex(Array.from(n)),l.computeBoundingSphere();let c=new ot(l,Wo);return c.name="wires",c.renderOrder=2,c.userData.noAO=!0,c}function jl(a,e,t=null){let o={concrete:Fe(),metal:Fe()},i=[],r=[];for(let n of a){let[l,c,u,f]=n;if(He(o.concrete,e.tpl.pole,l,c,u,f),He(o.metal,e.tpl.arm,l,c,u,f),n.length<8)continue;let[m,p,b,P]=n.slice(4),S=Math.cos(f),M=Math.sin(f),B=Math.cos(P),D=Math.sin(P);for(let[L,A,_,v]of[[-.9,.22,ve.sag,.008],[0,.22,ve.sag,.008],[.9,.22,ve.sag,.008],[-.3,-1.2,ve.sag*1.3,.012],[.3,-1.2,ve.sag*1.3,.012],[.35,-3.3,ve.sag*2.2,.03],[.5,-3.7,ve.sag*2.6,.022]]){let h=l+L*S,d=u-L*M,g=c+ve.armH+A,x=m+L*B,w=b-L*D,y=p+ve.armH+A;for(let E=0;E<8;E++){let R=E/8,T=(E+1)/8,I=N=>_*4*N*(1-N);i.push(h+(x-h)*R,g+(y-g)*R-I(R),d+(w-d)*R,h+(x-h)*T,g+(y-g)*T-I(T),d+(w-d)*T),r.push(v)}}}if(t)for(let n=0;n<t.length;n+=6){let l=t[n],c=t[n+1]+ve.armH-1.3,u=t[n+2],f=t[n+3],m=t[n+4],p=t[n+5],b=.25+.03*Math.hypot(f-l,p-u);for(let P=0;P<6;P++){let S=P/6,M=(P+1)/6,B=D=>b*4*D*(1-D);i.push(l+(f-l)*S,c+(m-c)*S-B(S),u+(p-u)*S,l+(f-l)*M,c+(m-c)*M-B(M),u+(p-u)*M),r.push(.009)}}let s=new ct;s.name="townPoles";for(let[n,l]of[[o.concrete,e.mats.concrete],[o.metal,e.mats.metal]]){if(!n.i.length)continue;let c=new it;c.setAttribute("position",new ze(n.p,3)),c.setAttribute("normal",new ze(n.n,3)),c.setAttribute("uv",new ze(n.u,2)),c.setIndex(n.i),c.computeBoundingSphere();let u=new ot(c,l);u.castShadow=l===e.mats.concrete,u.receiveShadow=!0,s.add(u)}return i.length&&s.add(Fa(i,r)),s}var Cr=rt,Pr=ft;function Yl(){let a=new Ie({color:16777215,roughness:.62,metalness:0,envMapIntensity:.7});a.name="cityRoof",a.onBeforeCompile=D=>{D.vertexShader=`varying float vRoofY;
varying float vRoofU;
varying float vRoofN;
varying float vRoofX;
`+D.vertexShader.replace("#include <fog_vertex>",`#include <fog_vertex>
	vRoofY = ( modelMatrix * instanceMatrix * vec4( transformed, 1.0 ) ).y; vRoofU = position.x * length( instanceMatrix[ 0 ].xyz ); vRoofN = normal.y; vRoofX = abs( normal.x );`),D.uniforms.uSnowRoof=Ut.uSnow,D.uniforms.tRoofDet=no.tRoofDet,D.fragmentShader=`uniform float uSnowRoof;
uniform sampler2D tRoofDet;
varying float vRoofY;
varying float vRoofU;
varying float vRoofN;
varying float vRoofX;
`+D.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
	{
		float det = 1.0 - smoothstep( 0.06, 0.2, fwidth( vRoofY ) + fwidth( vRoofU ) );
		float rows = smoothstep( 0.0, 0.25, fract( vRoofY / 0.3 ) ), ribs = smoothstep( 0.0, 0.5, abs( fract( vRoofU / 0.28 ) - 0.5 ) * 2.0 );
		diffuseColor.rgb *= mix( 0.88, ( 0.74 + 0.26 * rows ) * ( 0.84 + 0.16 * ribs ), det );
		// фактура: черепица (R) и профлист (G) пополам, пятна мха и грязи (B) — темнее и зеленее
		vec3 rt = texture2D( tRoofDet, vec2( vRoofU, vRoofY * 2.2 ) / 3.0 ).rgb - 0.5;
		diffuseColor.rgb *= 1.0 + 0.9 * ( rt.r + rt.g ) * 0.5;
		diffuseColor.rgb = mix( diffuseColor.rgb, diffuseColor.rgb * vec3( 0.7, 0.78, 0.6 ), smoothstep( 0.05, 0.3, rt.b ) * 0.5 );
		if ( vRoofN < -0.5 ) diffuseColor.rgb *= 0.35;
		if ( vRoofN > 0.2 && uSnowRoof > 0.0 ) diffuseColor.rgb = mix( diffuseColor.rgb, vec3( 0.9, 0.91, 0.93 ), uSnowRoof );
		if ( vRoofX > 0.9 ) diffuseColor.rgb = vec3( 0.58, 0.56, 0.5 ) * ( 0.94 + 0.06 * ribs );   // фронтон: штукатурка
	}`)},a.customProgramCacheKey=()=>"cityRoof4";let e=$l(),t={value:0},o=Wl(),i=Vl(),r=new Ie({map:o,roughness:.92,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2});r.name="cityStreet";let s=Gl(),n=r.clone();n.map=s,n.name="cityCross";let l=new Ie({color:4868941,roughness:.95,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1});l.name="cityLane";let c=new Ie({color:10197394,roughness:.95});c.name="cityParapet";let u=new Ie({color:7304055,roughness:.55,metalness:.5});u.name="citySignal";let f=new It({vertexColors:!0});f.name="citySignalLens";let m=new Ie({color:16777215,roughness:1,metalness:0,envMapIntensity:.6});m.name="cityGreen";let p=(D,L=.3)=>{let A=new Hr(1,D),_=A.getAttribute("position"),v=A.getAttribute("normal");for(let h=0;h<_.count;h++){let d=_.getX(h),g=_.getY(h),x=_.getZ(h),w=Math.hypot(d,g,x)||1,y=Math.round(d/w*1e3)/1e3,E=Math.round(g/w*1e3)/1e3,R=Math.round(x/w*1e3)/1e3,T=Math.sin(y*37.7+E*91.3+R*53.1)*43758.5453,I=1-L/2+L*(T-Math.floor(T));_.setXYZ(h,y*I,E<-.25?-.25+(E+.25)*.45*I:E*I,R*I),v.setXYZ(h,y,E,R)}return A},b=p(1),P=p(0),S=p(0),M=new to(.7,1,1,6,1,!0);M.translate(0,.5,0);let B=new Ie({color:1854034,roughness:.12,metalness:.3});return B.name="cityWater",{setLights(D,L){t.value=D*L,e.mats[1].emissiveIntensity=.05+D*L*.9},facade:Hl(t),ground:Bl(),lanes:l,parapet:c,street:r,cross:n,water:B,roofGeo:Bo(),hipGeo:Go(),roofMat:a,poles:wr(),vendGeo:e.geo,vendMats:e.mats,signal:i,signalBody:u,signalLens:f,green:m,crownGeo:b,crownFarGeo:P,shrubGeo:S,trunkGeo:M,roofFarGeo:Bo(!1),hipFarGeo:Go(!1),dispose(){this.facade.dispose(),this.ground.dispose(),l.dispose(),c.dispose(),r.dispose(),n.dispose(),s.dispose(),B.dispose(),o.dispose(),this.roofGeo.dispose(),this.hipGeo.dispose(),this.roofFarGeo.dispose(),this.hipFarGeo.dispose(),a.dispose(),this.poles.dispose(),e.geo.dispose(),e.tex.dispose();for(let D of e.mats)D.dispose();i.body.dispose(),i.go.dispose(),i.stop.dispose(),u.dispose(),f.dispose(),m.dispose(),b.dispose(),P.dispose(),S.dispose(),M.dispose()}}}var Vo=[4869975,3816772,5591628,3424335,4930094,4016704,5922403,7027502,3093048,4474959,7234130,5068387],$o={[Ae.house]:[!1,.3,1.2],[Ae.houseHip]:[!0,.28,1.3],[Ae.houseLow]:[!0,.13,1.1],[Ae.pagodaTier]:[!0,.11,5.2],[Ae.apartment]:[!1,.16,.7],[Ae.shed]:[!1,.2,.4],[Ae.farmhouse]:[!0,.34,1.6],[Ae.shrine]:[!1,.5,2],[Ae.warehouse]:[!1,.1,.3],[Ae.factory]:[!1,.08,.3],[Ae.greenhouse]:[!1,.14,.1]};function jo(a,e){let t=[];for(let o of[!1,!0]){let i=[];for(let m=0;m<a.length;m+=8){let p=$o[Math.round(a[m+7])];p&&p[0]===o&&i.push(m)}if(!i.length)continue;let r=new rt(o?e.hipGeo:e.roofGeo,e.roofMat,i.length),s=new Ze,n=new ta,l=new ne,c=new ne,u=new ne(0,1,0),f=new Ee;i.forEach((m,p)=>{let b=a[m+3],P=a[m+4],S=a[m+5],M=Math.round(a[m+7]),B=$o[M],D=Math.floor(Math.abs(Math.sin(a[m]*12.9898+a[m+2]*78.233))*43758.5453),L=M===Ae.house||M===Ae.houseHip,A=b>=S;L&&Math.abs(b-S)<2.6&&(D>>4)%10<4&&(A=!A);let _=A?S:b,v=B[1]*(L?.82+.05*((D>>8)%9):1);s.compose(l.set(a[m],a[m+1]+P/2-.05,a[m+2]),n.setFromAxisAngle(u,a[m+6]+(A?0:Math.PI/2)),c.set((A?b:S)+(B[0]?B[2]:Math.min(B[2],.3)),_*v,_+B[2])),r.setMatrixAt(p,s),M===Ae.greenhouse?f.setHex(14674150):M===Ae.warehouse||M===Ae.factory||M===Ae.shed?f.setHex([8160652,9278616,7307148][D%3]):M===Ae.shrine||M===Ae.pagodaTier?f.setHex(2899772):f.setHex(Vo[D%Vo.length]),r.setColorAt(p,f)}),r.computeBoundingSphere(),r.castShadow=!0,r.receiveShadow=!0,r.name=o?"roofsHip":"roofs",t.push(r)}return t}var Xa={[zt.shrub]:[.05,.13,.04],[zt.tree]:[.06,.15,.045],[zt.sakura]:[.62,.3,.37],[zt.conifer]:[.03,.085,.04],[zt.street]:[.09,.19,.05]};function Xl(a,e,t){let o=aa(a),i=o.tiles.get(e.id);if(!i||!i.greens.length)return null;let r=o.greens,s=e.origin[0],n=e.origin[2],l=[],c=[];for(let L of i.greens)(r[L*6+5]===zt.shrub?c:l).push(L*6);let u=new ct,f=new Ze,m=new ta,p=new ne,b=new ne,P=new ne(0,1,0),S=new Ee;u.name="cityGreens";let M=(L,A)=>{let _=Math.sin(L*12.9898+A*78.233)*43758.5453;return _-Math.floor(_)},B=(L,A,_=1)=>{let v=.82+.36*M(r[L],r[L+2]);return S.setRGB(A[0]*v*_,A[1]*v*_,A[2]*v*_),S},D=new Map;for(let L of c){let A=Math.floor((r[L]-s)/125)*64+Math.floor((r[L+2]-n)/125),_=D.get(A);_||D.set(A,_=[]),_.push(L)}for(let[L,A]of D){let _=new rt(t.shrubGeo,t.green,A.length),v=Math.floor(L/64),h=L-v*64;A.forEach((d,g)=>{let x=r[d+3];_.setMatrixAt(g,f.compose(p.set(r[d]-s,r[d+1]+x*.55,r[d+2]-n),m.setFromAxisAngle(P,M(r[d+2],r[d])*6.28),b.set(x*1.2,x*.85,x*1.05))),_.setColorAt(g,B(d,Xa[zt.shrub]))}),_.computeBoundingSphere(),_.castShadow=!1,_.receiveShadow=!0,_.name="shrubs",_.userData.cell=[v*125,h*125,(v+1)*125,(h+1)*125],u.add(_)}if(l.length){let L=new rt(t.crownGeo,t.green,l.length),A=new rt(t.trunkGeo,t.green,l.length);l.forEach((_,v)=>{let h=r[_+3],d=r[_+4],g=r[_+5],x=g===zt.conifer,w=x?d*.42:h*.82;L.setMatrixAt(v,f.compose(p.set(r[_]-s,r[_+1]+d-w,r[_+2]-n),m.setFromAxisAngle(P,M(r[_+2],r[_])*6.28),b.set(x?h*.75:h,w,x?h*.75:h*(.85+.3*M(r[_],7))))),L.setColorAt(v,B(_,Xa[g]||Xa[zt.tree])),A.setMatrixAt(v,f.compose(p.set(r[_]-s,r[_+1]-.2,r[_+2]-n),m.identity(),b.set(.1+d*.022,d-w*.9+.2,.1+d*.022))),A.setColorAt(v,S.setRGB(.09,.065,.045))}),L.computeBoundingSphere(),L.castShadow=!0,L.receiveShadow=!0,L.name="crowns",A.computeBoundingSphere(),A.castShadow=!1,A.receiveShadow=!0,A.name="trunks",u.add(L,A)}return u}var fa={street:.03,paint:.04},Ka={out:.55,w:.14,trim:3},Kl=6,tt={gap:.6,len:3,bar:.45,stop:.45,after:1};function ql(a,e,t){let o=aa(a),i=o.tiles.get(e.id);if(!i)return null;let r=e.origin[0],s=e.origin[2],n=o.y,l=[],c=[],u=[],f=go,m=[],p=[],b=[],P=(h,d)=>n+Math.max(0,o.heightAt(h,d)),S=(h,d)=>(h+.01+d*.98)/f.cols,M=(h,d,g,x,w,y,E,R,T,I,N,C)=>{let O=l.length/3;l.push(h-r,P(h,d)+C,d-s,g-r,P(g,x)+C,x-s,E-r,P(E,R)+C,R-s,w-r,P(w,y)+C,y-s),c.push(S(T,0),I,S(T,1),I,S(T,1),N,S(T,0),N),u.push(O,O+1,O+2,O,O+2,O+3)},B=(h,d,g,x,w,y,E=fa.street)=>{let R=Math.hypot(g-h,x-d);if(R<.3)return;let T=(g-h)/R,I=(x-d)/R,N=I*w/2,C=-T*w/2,O=Math.max(1,Math.ceil(R/Kl));for(let z=0;z<O;z++){let U=R*z/O,H=R*(z+1)/O,k=h+T*U,V=d+I*U,F=h+T*H,j=d+I*H;M(k+N,V+C,k-N,V-C,F+N,j+C,F-N,j-C,y,U/f.period,H/f.period,E)}},D=new Map,L=h=>{let d=D.get(h);if(d)return d;let g=o.nodes[h],x=[];for(let I of g.out){let N=o.edges[I.edge];if(N.cls==="edge"||N.cls==="river")continue;let C=I.to===N.b?N.dx:-N.dx,O=I.to===N.b?N.dz:-N.dz;x.push({edge:I.edge,ux:C,uz:O,w:N.w,ang:Math.atan2(O,C),cut:0})}x.sort((I,N)=>I.ang-N.ang);let w=Math.max(0,...x.map(I=>I.w)),y=[];for(let I=0;I<x.length;I++){let N=x[I],C=x[(I+1)%x.length],O=C.ang-N.ang+(I===x.length-1?2*Math.PI:0);if(x.length<2||O>2.97){y.push(null);continue}let z=N.ux,U=N.uz,H=C.ux,k=C.uz,V=-C.w/2*-k-N.w/2*-U,F=-C.w/2*H-N.w/2*z,j=z*-k- -H*U;if(Math.abs(j)<1e-6){y.push(null);continue}let ee=(V*-k- -H*F)/j,K=(z*F-U*V)/j,oe=Math.min(3*w,Math.max(0,ee)),J=Math.min(3*w,Math.max(0,K));N.cut=Math.max(N.cut,oe),C.cut=Math.max(C.cut,J),y.push([z*ee+-U*(N.w/2),U*ee+z*(N.w/2),ee>=0&&K>=0&&ee<=3*w&&K<=3*w])}let E=g.deg>=3?.4:-.4,R=new Map,T=[];for(let I=0;I<x.length;I++){let N=x[I];N.cut=g.deg>=3?Math.max(N.cut+E,N.w/2+.6):E,R.set(N.edge,N.cut);let C=-N.uz,O=N.ux,z=N.cut+(g.signal?tt.gap+tt.len+tt.after+tt.stop:0);T.push([g.x+N.ux*z-C*(N.w/2),g.z+N.uz*z-O*(N.w/2)],[g.x+N.ux*z+C*(N.w/2),g.z+N.uz*z+O*(N.w/2)]),y[I]&&y[I][2]&&T.push([g.x+y[I][0],g.z+y[I][1]])}return d={cut:R,poly:T,list:x},D.set(h,d),d},A=(h,d)=>{let g=o.nodes[h];return g.deg<3?-.4:(L(h).cut.get(d)??g.r)+(g.signal?tt.gap+tt.len+tt.after+tt.stop:0)};for(let h of i.edges){let d=o.edges[h];if(d.cls==="river")continue;let g=o.nodes[d.a],x=o.nodes[d.b],w=A(d.a,h),y=A(d.b,h);d.len-w-y<.5||B(g.x+d.dx*w,g.z+d.dz*w,x.x-d.dx*y,x.z-d.dz*y,d.w,Qt[d.cls])}for(let h of i.minors){let d=o.minors[h],g=Math.hypot(d[2]-d[0],d[3]-d[1]),x=(d[2]-d[0])/g,w=(d[3]-d[1])/g,y=d[4],E=d[5];g-y-E>1&&B(d[0]+x*y,d[1]+w*y,d[2]-x*E,d[3]-w*E,ir.minor.w,Qt.minor)}for(let h of i.nodes){let d=o.nodes[h];if(d.deg<3)continue;let g=L(h),x=g.poly;for(let E of d.out){let R=o.edges[E.edge];if(R.cls==="edge"||R.cls==="river")continue;let T=E.to===R.b?R.dx:-R.dx,I=E.to===R.b?R.dz:-R.dz;if(!d.signal||!mo.has(R.cls))continue;let N=(g.cut.get(E.edge)??d.r)+tt.gap,C=N+tt.len,O=Math.floor((R.w-1)/(2*tt.bar));for(let k=0;k<O;k++){let V=-R.w/2+.6+k*2*tt.bar,F=I*(V+tt.bar/2),j=-T*(V+tt.bar/2);B(d.x+T*N+F,d.z+I*N+j,d.x+T*C+F,d.z+I*C+j,tt.bar,Qt.white,fa.paint)}let z=C+tt.after,U=-I*R.w/4,H=T*R.w/4;B(d.x+T*z+U-I*R.w/4,d.z+I*z+H+T*R.w/4,d.x+T*z+U+I*R.w/4,d.z+I*z+H-T*R.w/4,tt.stop,Qt.white,fa.paint)}if(x.length<3)continue;let w=E=>(m.push(E[0]-r,P(E[0],E[1])+fa.street,E[1]-s),p.push(E[0]/f.period,E[1]/f.period),m.length/3-1),y=(E,R)=>[(E[0]+R[0])/2,(E[1]+R[1])/2];for(let E=0;E<x.length;E++){let R=[d.x,d.z],T=x[(E+1)%x.length],I=x[E];if((I[0]-R[0])*(T[1]-R[1])-(I[1]-R[1])*(T[0]-R[0])<=0)continue;let N=w(R),C=w(T),O=w(I),z=w(y(R,T)),U=w(y(T,I)),H=w(y(I,R));b.push(N,z,H,z,C,U,H,U,O,z,U,H)}}let _=(h,d,g,x,w)=>{let y=new it;y.setAttribute("position",new ze(g,3)),y.setAttribute("uv",new ze(x,2)),y.setIndex(w),y.computeVertexNormals(),y.computeBoundingSphere();let E=new ot(y,d);return E.receiveShadow=!0,E.castShadow=!1,E.name=h,E},v=new ct;v.name="cityStreetSet",u.length&&v.add(_("cityStreets",t.street,l,c,u)),b.length&&v.add(_("cityCross",t.cross,m,p,b)),l.length=0,c.length=0,u.length=0;for(let h of i.blocks){let d=o.blocks[h],g=d.poly.length;if(d.type!=="fields"&&d.type!=="industrial")for(let x=0;x<g;x++){if(d.tags[x]!=="local")continue;let w=d.poly[x],y=d.poly[(x+1)%g],E=Math.hypot(y[0]-w[0],y[1]-w[1]);if(E<12)continue;let R=(y[0]-w[0])/E,T=(y[1]-w[1])/E,I=-T,N=R;(d.c[0]-w[0])*I+(d.c[1]-w[1])*N>0&&(I=-I,N=-N);let C=Ka.out,O=Ka.trim;B(w[0]+R*O+I*C,w[1]+T*O+N*C,y[0]-R*O+I*C,y[1]-T*O+N*C,Ka.w,Qt.white,fa.paint)}}return u.length&&v.add(_("cityLines",t.street,l,c,u)),v.children.length?v:null}var qa={step:38,out:.7};function Tr(a,e,t){let o=i=>{let r=a.edges[i];if(!mo.has(r.cls))return;let s=a.nodes[r.a],n=r.cls==="boulevard",l=r.dz,c=-r.dx;for(let u=0,f=qa.step/2+i%5*3;f<r.len-6;f+=qa.step,u++)for(let m of n?[1,-1]:[(u+i)%2?1:-1]){let p=r.w/2+qa.out;t(s.x+r.dx*f+l*p*m,s.z+r.dz*f+c*p*m,Math.atan2(c*m,-l*m))}};e?e.forEach(o):a.edges.forEach((i,r)=>o(r))}function Zl(a){let e=aa(a),t=[];return Tr(e,null,(o,i,r)=>t.push(o+Math.cos(r)*yt.reach,e.y+Math.max(0,e.heightAt(o,i))+yt.height,i-Math.sin(r)*yt.reach)),t}function Ql(a){let e=aa(a),t=e.buildings,o=(r,s,n)=>{let l=Math.sin(r*12.9898+s*78.233+n*37.719)*43758.5453;return l-Math.floor(l)},i=[];for(let r=0;r<t.length;r+=8){let s=t[r],n=t[r+1],l=t[r+2],c=t[r+3],u=t[r+4],f=t[r+5],m=Math.cos(t[r+6]),p=Math.sin(t[r+6]),b=Math.round(t[r+7]);if(b===Ae.greenhouse||b===Ae.shed||b===Ae.pagoda||b===Ae.shrine)continue;let P=Math.max(1,Math.round((u-.7)/3)),S=n-u/2,M=Math.min(u>60?64:16,Math.max(1,Math.round(P*2*(c+f)/70)));for(let B=0;B<M;B++){let D=o(s,l,B),L=o(l,s,B+7);if(o(s+B,l-B,3)<.35)continue;let A=Math.floor(D*4),_=L-.5,v=Math.floor(o(s,l,B+13)*P),h=A<2?_*c:(A===2?-1:1)*(c/2+.3),d=A<2?(A===0?-1:1)*(f/2+.3):_*f,g=b===Ae.office||b===Ae.tower||b===Ae.landmark?[.75,.85,1]:D*7%1<.65?[1,.72,.42]:[.72,.84,1],x=.22+.25*o(l,s,B+21);i.push(s+h*m+d*p,S+v*3+1.6,l-h*p+d*m,g[0]*x,g[1]*x,g[2]*x)}}for(let r of e.landmarks)i.push(r.top[0],r.top[1]+2,r.top[2],1.6,.1,.06);return i}function Jl(a,e,t,o=null){let i=aa(a),r=i.tiles.get(e.id),s=new ct;if(s.name="cityProps",!r)return s;let n=e.origin[0],l=e.origin[2],c=t.poles.tpl,u=(h,d)=>i.y+Math.max(0,i.heightAt(h,d))+.15,f={concrete:[],metal:[]},m=[],p=[],b=[],P=[],S=(h,d)=>{let g=Math.sin(h*12.9898+d*78.233)*43758.5453;return g-Math.floor(g)};Tr(i,r.edges,(h,d,g)=>p.push([h-n,u(h,d),d-l,g,1]));for(let h of r.nodes){let d=i.nodes[h];if(!d.signal)continue;let g=d.out.map(w=>({o:w,e:i.edges[w.edge]})).filter(w=>mo.has(w.e.cls)),x=Math.max(...g.map(w=>w.e.w));for(let{o:w,e:y}of g){let E=w.to===y.b?-y.dx:y.dx,R=w.to===y.b?-y.dz:y.dz,T=R,I=-E,N=d.x+E*(d.r+1.2)+T*(y.w/2+.9),C=d.z+R*(d.r+1.2)+I*(y.w/2+.9);P.push({x:N-n,y:u(N,C),z:C-l,yaw:Math.atan2(-E,-R),go:y.w>=x-.01})}}for(let h of r.blocks){let d=i.blocks[h],g=d.poly.length;if(d.type!=="fields"&&d.use!=="park")for(let x=0;x<g;x++){if(d.tags[x]!=="local")continue;let w=d.poly[x],y=d.poly[(x+1)%g],E=Math.hypot(y[0]-w[0],y[1]-w[1]),R=(y[0]-w[0])/E,T=(y[1]-w[1])/E;if(E<24||R*.8+T*.6<0)continue;let I=Math.max(1,Math.round(E/30)),N=E/I,C=Math.atan2(-T,R),O=d.c[0]-(w[0]+y[0])/2,z=d.c[1]-(w[1]+y[1])/2,U=-T*O+R*z>0?1:-1,H=-T*U*.45,k=R*U*.45,V=null;for(let F=0;F<I;F++){let j=N*(F+.5),ee=w[0]+R*j+H,K=w[1]+T*j+k,oe=u(ee,K);if(f.concrete.push([c.pole,ee-n,oe,K-l,C]),f.metal.push([c.arm,ee-n,oe,K-l,C]),V)for(let J of[-.9,0,.9]){let fe=-T*J,se=R*J,pe=V[2]+10.52,we=oe+10.52;for(let Me=0;Me<6;Me++){let Re=Me/6,Ne=(Me+1)/6,Ue=ye=>2*ye*(1-ye);m.push(V[0]+fe+(ee-V[0])*Re-n,pe+(we-pe)*Re-Ue(Re),V[1]+se+(K-V[1])*Re-l,V[0]+fe+(ee-V[0])*Ne-n,pe+(we-pe)*Ne-Ue(Ne),V[1]+se+(K-V[1])*Ne-l)}}V=[ee,K,oe]}}}let M=e.buildings;for(let h=0;h<M.length;h+=8){let d=M[h+7];if(d!==Ae.shop&&d!==Ae.konbini&&d!==Ae.apartment||S(M[h]+n,M[h+2]+l)>(d===Ae.apartment?.12:.3))continue;let g=Math.cos(M[h+6]),x=Math.sin(M[h+6]),w=M[h+3]/2-.7,y=M[h+5]/2+.42;b.push([M[h]+w*g+y*x,M[h+1]-M[h+4]/2,M[h+2]-w*x+y*g,M[h+6]])}let B=h=>{let d=[],g=[],x=[];for(let[y,E,R,T,I]of h){let N=Math.cos(I),C=Math.sin(I),O=d.length/3;for(let z=0;z<y.p.length;z+=3)d.push(E+y.p[z]*N+y.p[z+2]*C,R+y.p[z+1],T-y.p[z]*C+y.p[z+2]*N),g.push(y.n[z]*N+y.n[z+2]*C,y.n[z+1],-y.n[z]*C+y.n[z+2]*N);for(let z of y.i)x.push(O+z)}let w=new it;return w.setAttribute("position",new ze(d,3)),w.setAttribute("normal",new ze(g,3)),w.setIndex(x),w.computeBoundingSphere(),w};if(f.concrete.length)for(let[h,d]of[[f.concrete,t.poles.mats.concrete],[f.metal,t.poles.mats.metal]]){let g=new ot(B(h),d);g.castShadow=d===t.poles.mats.concrete,g.receiveShadow=!0,s.add(g),d!==t.poles.mats.concrete&&(g.name="cityPoleArms")}let D=new Ze,L=new ta,A=new ne,_=new ne(0,1,0),v=new ne(1,1,1);if(b.length){let h=new rt(t.vendGeo,t.vendMats,b.length);b.forEach(([d,g,x,w],y)=>h.setMatrixAt(y,D.compose(A.set(d,g,x),L.setFromAxisAngle(_,w),v))),h.computeBoundingSphere(),h.castShadow=!0,h.receiveShadow=!0,h.name="vending",s.add(h)}if(P.length){let h=new rt(t.signal.body,t.signalBody,P.length);P.forEach((d,g)=>h.setMatrixAt(g,D.compose(A.set(d.x,d.y,d.z),L.setFromAxisAngle(_,d.yaw),v))),h.computeBoundingSphere(),h.castShadow=!0,h.receiveShadow=!0,h.name="signals",s.add(h);for(let d of[!0,!1]){let g=P.filter(w=>w.go===d);if(!g.length)continue;let x=new rt(d?t.signal.go:t.signal.stop,t.signalLens,g.length);g.forEach((w,y)=>x.setMatrixAt(y,D.compose(A.set(w.x,w.y,w.z),L.setFromAxisAngle(_,w.yaw),v))),x.computeBoundingSphere(),x.castShadow=!1,x.receiveShadow=!1,x.name="signalLens",x.userData.noAO=!0,s.add(x)}}if(m.length){let h=Fa(m);h.name="cityWires",s.add(h)}return o&&p.length&&s.add(vo(p,o)),s}var Za={lamp:1,window:.55};function e0(a,e,t){let o=[],i=(s,n,l)=>{for(let c=0;c<s.length;c+=3)o.push(s[c],s[c+1],s[c+2],n.r,n.g,n.b,l)};i(Rl(a,t),io[0],Za.lamp),i(Zl(a.world),io[1],Za.lamp);let r=Ql(a.world);for(let s=0;s<r.length;s+=6)o.push(r[s],r[s+1],r[s+2],r[s+3],r[s+4],r[s+5],Za.window);return Tl(e,new Float32Array(o))}var da={fogHalf:14e3,fogFalloff:1/600,sunColor:16773340,moonColor:11122920,toneMapping:4,exposureMul:.97},Qa={ultra:{ao:!0,bloom:!0,msaa:4,shadow:{splits:[12,60,300],maxFar:2500,mapSize:2048},forest:1,lamps:10,water:!0,scale:1},high:{ao:!1,bloom:!0,msaa:4,shadow:{splits:[12,60,300],maxFar:2500,mapSize:2048},forest:1,lamps:10,water:!0,scale:1},balanced:{ao:!0,bloom:!0,msaa:0,shadow:{splits:[18],maxFar:500,mapSize:1536},forest:1,lamps:6,water:!0,scale:1,perf:{aoScale:.5,aoSamples:8,bloomScale:.5,fxaa:!0,stagger:!0,dynamic:{min:.5,target:55}}},medium:{ao:!1,bloom:!1,msaa:0,shadow:{splits:[14],maxFar:350,mapSize:1024},forest:.6,lamps:6,water:!0,scale:.75},low:{ao:!1,bloom:!1,msaa:0,shadow:null,forest:.35,lamps:4,water:!1,scale:.6}},Yo={below:40,scale:.001},Ja=512,Xo={ground:3,far:5},Ko=1,qo=2,Zo=3,t0=5,a0=30;async function o0(a,e,t=250){let o=(e?.dems||[]).slice(0,4),i=(await Promise.all(o.map((r,s)=>r0(a,e,r,s,t)))).filter(Boolean);return i.length?(r,s)=>{for(let n of i){let l=n(r,s);if(l)return l}return null}:null}async function r0(a,e,t,o,i){let r=await fetch(`${a}world/regions/${t.id}_photo.jpg`).catch(()=>null);if(!r?.ok)return null;let s=await createImageBitmap(await r.blob()),n=new gt(await createImageBitmap(s));n.flipY=!1,n.anisotropy=4,n.needsUpdate=!0;{let[p,b,P]=[[Be.tPhoto,Be.uPhotoRect,Be.uPhotoOn],[Be.tPhoto2,Be.uPhotoRect2,Be.uPhotoOn2],[Be.tPhoto3,Be.uPhotoRect3,Be.uPhotoOn3],[Be.tPhoto4,Be.uPhotoRect4,Be.uPhotoOn4]][o];p.value=n,b.value.set([t.x0,t.z0,t.x1,t.z1]),P.value=1}let l=Math.max(2,Math.round((t.x1-t.x0)/i)),c=Math.max(2,Math.round((t.z1-t.z0)/i)),u=new OffscreenCanvas(l,c).getContext("2d");u.imageSmoothingQuality="high",u.drawImage(s,0,0,l,c),s.close();let f=u.getImageData(0,0,l,c).data,m=p=>Math.pow(p/255,2.2);return(p,b)=>{let P=(p-t.x0)/(t.x1-t.x0),S=(b-t.z0)/(t.z1-t.z0);if(!(P>=0&&S>=0&&P<=1&&S<=1))return null;let M=4*(Math.min(c-1,Math.floor(S*c))*l+Math.min(l-1,Math.floor(P*l))),B=Mt(0,1500,Math.min(p-t.x0,t.x1-p,b-t.z0,t.z1-b))*e.weight(p,b);return t.id==="kanto"&&(B*=1-Mt(560,640,f[M]+f[M+1]+f[M+2])),[B,m(f[M]),m(f[M+1]),m(f[M+2])]}}async function d0({renderer:a,scene:e,camera:t,session:o,mats:i,oldSun:r,groups:s,base:n,off:l=new Set,tod:c="day",quality:u="ultra"}){let f=Aa[qr()]||Aa.clear,m=po(),p=Zr(Ma[c]||Ma.day),b=structuredClone(Qa[u]||Qa.ultra);Ut.uSnow.value=m==="winter"?1:0,Ut.uAutumn.value=m==="autumn"?1:0,Ut.uWet.value=Math.max(f.wet,m==="winter"?.45:0);for(let W of(new URLSearchParams(globalThis.location?.search||"").get("gfxset")||"").split(",")){let[re,q]=W.split(":"),te=Number(q);re&&Number.isFinite(te)&&(re==="scale"||re==="forest"||re==="lamps"?b[re]=te:b.shadow&&re==="shadowfar"?b.shadow.maxFar=te:b.shadow&&re==="shadowmap"?b.shadow.mapSize=te:b.shadow&&re==="cascades"&&(b.shadow.splits=b.shadow.splits.slice(0,Math.max(1,te))))}$t.near=b.forest,b.scale!==1&&a.setPixelRatio(a.getPixelRatio()*b.scale),l.has("shadow")||!b.shadow||p.sunToSky===0?a.shadowMap.enabled=!1:a.shadowMap.type=2,$t.shadows=a.shadowMap.enabled,l.has("bloom")&&(b.bloom=!1);let[P,S,M]=await Promise.all([al(n,el),dl(n),yl(a,n)]),B=ui(o.world,31,Qr(o.graph)),D=wr(),L=new Map,A=Cl();{let W={d:0,road:-1,s:0},re=(q,te,ce)=>{let le=Math.min(1,Math.max(0,(ce-q)/(te-q)));return le*le*(3-2*le)};B.roadBelt=(q,te)=>(o.height.nearestRoad(q,te,pa.beltTo+10,W),W.d===1/0?0:(1-re(pa.beltFrom,pa.beltTo,W.d))*re(0,6,W.d)),B.roadDist=(q,te)=>(o.height.nearestRoad(q,te,pa.beltTo+10,W),W.d)}!l.has("roadside")&&!l.has("warm")&&zl(o,D);let _=l.has("grass")||m==="winter"?null:bl();m==="autumn"&&_?.mat?.color.set(10260312),i.ground.dispose(),i.ground=cl(P,null);let v=Yl();Ul(n),D.vend={geo:v.vendGeo,mats:v.vendMats},i.box.mat.dispose(),i.box.mat=v.facade,i.cityGround.dispose(),i.cityGround=v.ground,i.cityLane.dispose(),i.cityLane=v.lanes,i.parapet.dispose(),i.parapet=v.parapet,i.water&&=(i.water.dispose(),v.water),i.road.map?.dispose(),i.road.dispose(),i.road=S,i.groundAttrs=function*(W,re){let q=W.terrain,te=q.nx*q.nz,ce=W.forestCache||B,le=No(q,W.origin,ce,null,0,0);for(let $=0;$<te;$+=Ja)le=No(q,W.origin,ce,le,$,Math.min(te,$+Ja)),$+Ja<te&&(yield);re.setAttribute("splatA",new Rt(le.a,4)),re.setAttribute("splatB",new Rt(le.b,4))};let h=Si(a,p,{sunColor:da.sunColor,moonColor:da.moonColor});f!==Aa.clear&&h.night&&h.mesh.material.uniforms.uStars&&(h.mesh.material.uniforms.uStars.value=0,h.mesh.material.uniforms.showMoon.value=0),bi({sunDir:h.sunDir,sunColor:h.horizonSun,falloff:f.falloff??da.fogFalloff});let d=new Rr(16777215,Math.LN2/f.fogHalf);d.color.copy(h.horizonAway),e.fog=d,e.add(h.mesh),e.background=null,e.environment=h.envMap,r.visible=!1,e.traverse(W=>{W.isHemisphereLight&&(W.visible=!1)});let g=h.skyIrradiance,x=p.sunToSky*g/Math.max(.05,h.sunDir.y),w=h.lightColor;at.uDayLum.value=h.night?0:g*(1+p.sunToSky)/Math.PI,at.uBounce.value.copy(w).multiplyScalar(x*Math.max(0,h.sunDir.y)*.1),a.toneMapping=da.toneMapping,a.toneMappingExposure=(p.rel?p.rel*Math.PI/(vi*(1+Ma.day.sunToSky)):Math.PI/(g*(1+p.sunToSky)))*da.exposureMul;let y=Ti({scene:e,camera:t,sunDir:h.sunDir,intensity:x,color:w,...b.shadow||{splits:[20],maxFar:60,mapSize:256}}),E=3/a.toneMappingExposure;v.setLights(p.lights,E),A.setLights(p.lights,E),hr.value=p.lights>.2?p.lights*E*.6:0;let R=p.lights>.2?Pl(e,A,b.lamps):null,T=new Map,I=R?e0(o,A,L):null;I&&e.add(I.mesh),t.near=.5,t.far=Dr?7e4:22e3,t.updateProjectionMatrix();let N=aa(o.world),C=Ji(o.regions?.kanto?(W,re)=>{let q=o.height.naturalAt(W,re);if(q<.3){for(let[te,ce]of[[180,0],[-180,0],[0,180],[0,-180]])if(o.regions.height(W+te,re+ce)>.3)return .35}return q}:(W,re)=>o.height.naturalAt(W,re),{cityRadius:o.world.city?.radius??-1e9,edge:o.world.city?nt:1e9,city:o.world.city,ringRadius:0,built:(W,re)=>{let q=N.urbanT(W,re);return q<.85?1:q>1.15?0:1-(q-.85)/.3}});C.setLights(p.lights,E),C.mesh.renderOrder=Xo.far,e.add(C.mesh),Be.uPhotoHub.value=o.world.city?12e3:-1e6,Be.uPhotoNear.value=o.world.city?0:1,o0(n,o.regions).then(W=>{W&&C.recolor(W),m==="winter"&&C.recolor((re,q,te)=>[Mt(150,600,te)*.85,.75,.77,.8])});let O=ul(o.world,{lights:p.lights,lampGain:E});e.add(O.group);let z=o.height.places,U=z.lakes.length&&!l.has("water")&&b.water?pi(z,{sunDir:h.sunDir,sunColor:w.clone().multiplyScalar(x*.04),skyE:g}):null;if(U&&e.add(U.group),o.regions?.lakes?.length){let W=o.regions.lakeStrips(),re=new Float32Array(W.length*12),q=new Uint32Array(W.length*6);W.forEach(($,Y)=>{let Q=$.lake.level+.15;re.set([$.x0,Q,$.z0,$.x1,Q,$.z0,$.x0,Q,$.z1,$.x1,Q,$.z1],Y*12),q.set([4*Y,4*Y+2,4*Y+1,4*Y+1,4*Y+2,4*Y+3],Y*6)});let te=C.mesh.geometry.getAttribute("position").constructor,ce=new C.mesh.geometry.constructor;ce.setAttribute("position",new te(re,3)),ce.setIndex(new te(q,1)),ce.computeVertexNormals();let le=new C.mesh.constructor(ce,new C.mesh.material.constructor({color:2375756,roughness:.08,metalness:0,envMapIntensity:0}));le.material.onBeforeCompile=$=>{$.fragmentShader=$.fragmentShader.replace("#include <fog_fragment>",`#include <fog_fragment>
	#ifdef USE_FOG
	{
		float fr = pow( 1.0 - clamp( dot( normal, normalize( vViewPosition ) ), 0.0, 1.0 ), 5.0 );
		gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor * vec3( 0.9, 0.96, 1.04 ), clamp( 0.04 + 0.92 * fr, 0.0, 0.9 ) );
	}
	#endif`)},le.material.customProgramCacheKey=()=>"regionLakeFresnel",le.name="regionLakes",le.userData.noAO=!o.regions?.kanto,le.receiveShadow=!0,e.add(le)}let H=Wi(a,e,t,a.toneMappingExposure,{samples:l.has("msaa")?0:b.msaa,grading:!l.has("grade")});(l.has("ao")||!b.ao)&&(H.gtao.enabled=!1),(l.has("bloom")||!b.bloom)&&(H.bloom.enabled=!1),H.setNight(p.lights),H.grade.uniforms.uSat.value*=f.sat;let k=f.precip>0?nl(m==="winter"?"snow":"rain",Math.max(.07,1-.93*Math.pow(p.lights,.6))):null;k&&e.add(k.mesh);let V=Li({perf:l.has("perf")?void 0:b.perf,renderer:a,post:H,shadows:y,camera:t,splits:(b.shadow||{splits:[20]}).splits,maxFar:(b.shadow||{maxFar:60}).maxFar});!U&&z.lakes.length&&!l.has("water")&&e.add(mi(z).group),l.has("far")&&(C.mesh.visible=!1);let F=new Map,j=new Map,ee=new Map,K=new Map,oe=!0,J=!0,fe=0,se=new Map,pe=new Map,we=W=>{se.delete(W);let re=pe.get(W);re&&(Ea(re),pe.delete(W))},Me=W=>{se.has(W.id)||se.set(W.id,Re(W))};function*Re(W){let re=performance.now(),q=0,te=re,ce=0,le=()=>{let ie=performance.now()-te;q+=ie,de.stageMs[ce]=Math.max(de.stageMs[ce]||0,ie),ce++},$=()=>{let ie=performance.now()-te;q+=ie,de.stageMs[ce]=Math.max(de.stageMs[ce]||0,ie)},Y=hi(B,W);W.forestCache=Y;let Q=di(W,i,{trees:!1,deferAttrs:!0});pe.set(W.id,Q),Q.traverse(ie=>{ie.isMesh&&(ie.castShadow=!0,ie.receiveShadow=!0)}),le(),yield,te=performance.now();for(let ie of Y.prepare())$(),yield,te=performance.now();for(let ie of Q.userData.groundAttrs||[]){let ue=ie();if(ue)for(;!ue.next().done;)$(),yield,te=performance.now()}Q.userData.groundAttrs=null,pe.delete(W.id);for(let ie of["road","rails","verge","cityGround","cityLanes","terrain"]){let ue=Q.getObjectByName(ie);ue&&(ue.castShadow=!1)}for(let ie of["terrain","verge"]){let ue=Q.getObjectByName(ie);ue&&(ue.renderOrder=Xo.ground)}if(e.add(Q),F.set(W.id,Q),s.add(Q),oe=!0,J=!0,Ne(Q),le(),yield,te=performance.now(),!l.has("forest")){let ie=Sl(W,Y,M.modelKinds),ue;for(;;){let me=ie.next();if(me.done){ue=me.value;break}$(),yield,te=performance.now()}le(),yield,te=performance.now();let be=Lo(ue,M);Q.add(be.group),j.set(W.id,be),J=!0,Ne(Q),le(),yield,te=performance.now()}if(_){let ie=Eo(ue=>Ml(W,Y,ue),_);Q.add(ie.group),ee.set(W.id,ie),le(),yield,te=performance.now()}if(!l.has("roadside")){let ie=Fl(o,W,D,L,A),ue;for(;;){let be=ie.next();if(be.done){ue=be.value;break}$(),yield,te=performance.now()}Q.add(ue),K.set(W.id,ue),Ne(ue),le(),yield,te=performance.now()}if(W.city){let ie=ql(o.world,W,v);if(ie&&Q.add(ie),le(),yield,te=performance.now(),W.city.poles?.length&&Q.add(jl(W.city.poles,D,W.city.drops)),W.city.pa){let Ge=new ct,Oe=W.city.pa;if(Ge.name="placeProps",Ge.userData.heads=Oe.lamps,Oe.vend.length){let et=new Cr(v.vendGeo,v.vendMats,Oe.vend.length/4),Lt=new Ze;for(let dt=0;dt<Oe.vend.length;dt+=4)et.setMatrixAt(dt/4,Lt.makeRotationY(Oe.vend[dt+3]).setPosition(Oe.vend[dt],Oe.vend[dt+1],Oe.vend[dt+2]));et.castShadow=!0,et.receiveShadow=!0,et.name="placeVending",et.computeBoundingSphere(),Ge.add(et)}Q.add(Ge)}let ue=jo(W.buildings,v);for(let Ge of ue)Ge.castShadow=!1,Q.add(Ge);Q.userData.cityRoofs=ue,le(),yield,te=performance.now();let be=Xl(o.world,W,v);be&&Q.add(be);let me=[];Q.traverse(Ge=>{Ge.userData.cell&&(Ge.name==="cityDecor"||Ge.name==="shrubs")&&(Ge.castShadow=!1,me.push(Ge))}),Q.userData.cityBoxes=Q.getObjectByName("buildings")||null,Q.userData.cityNear=me,Q.userData.cityCrowns=be?.getObjectByName("crowns")||null,Q.userData.cityTrunks=be?.getObjectByName("trunks")||null,Q.userData.cityFar=[Q.getObjectByName("cityGround"),Q.getObjectByName("cityLanes"),Q.getObjectByName("cityLines"),Q.userData.cityTrunks].filter(Boolean);let Pe=Q.getObjectByName("buildings");if(Pe)for(let Ge=0;Ge<W.buildings.length;Ge+=8)W.buildings[Ge+7]===Ae.pagoda&&(Pe.setMatrixAt(Ge/8-W.city.farFrom,new Ze().makeScale(0,0,0)),Pe.instanceMatrix.needsUpdate=!0);le(),yield,te=performance.now();let qe=Jl(o.world,W,v,A);Q.add(qe),K.set(-1-W.id,qe);for(let Ge of["cityPoleArms","cityWires"]){let Oe=qe.getObjectByName(Ge);Oe&&Q.userData.cityFar.push(Oe)}Q.userData.cityFarOn=void 0}if(J=!0,Ne(Q),le(),de.showMs=q,de.showMsMax=Math.max(de.showMsMax,q),de.shows++,R){Q.updateMatrixWorld(!0);let ie=[],ue=new ne;Q.traverse(be=>{let me=be.userData.heads;if(me)for(let Pe=0;Pe<me.length;Pe+=4)ue.set(me[Pe],me[Pe+1],me[Pe+2]).applyMatrix4(be.matrixWorld),ie.push(ue.x,ue.y,ue.z,me[Pe+3])}),ie.length&&T.set(W.id,new Float32Array(ie))}}let Ne=W=>W.traverse(re=>{re.matrixAutoUpdate&&(re.updateMatrix(),re.matrixAutoUpdate=!1,re.matrixWorldNeedsUpdate=!0);let q=re;if(!q.isInstancedMesh||q.userData.instReady)return;q.userData.instReady=!0;let te=Array.isArray(q.material)?q.material:[q.material];q.renderOrder===0&&!te.some(ce=>ce.transparent)&&(q.renderOrder=q.instanceColor?2:1),q.castShadow&&!q.customDepthMaterial&&!te.some(ce=>ce.alphaTest>0||ce.alphaMap||ce.displacementMap)&&(q.customDepthMaterial=q.instanceColor?Ue:M.instDepth)}),Ue=new Qo;Ue.name="worldInstDepthColor";function ye(W,re){if(!se.size)return;let q=performance.now(),te=[...se.keys()].sort((le,$)=>ge(le,W,re)-ge($,W,re)),ce=ge(te[0],W,re)<=Ko?a0:t0;for(let le of te){let $=se.get(le);if($){for(;;){if($.next().done){se.delete(le);break}if(performance.now()-q>=ce)return}if(performance.now()-q>=ce)return}}}let ge=(W,re,q)=>{let te=W%lt,ce=(W-te)/lt;return Math.max(Math.abs(te-re),Math.abs(ce-q))};function ke(W,re){let q=Math.floor((W+nt)/500),te=Math.floor((re+nt)/500);for(let[$,Y]of F){let Q=$%lt,ie=($-Q)/lt,ue=o.streamer.tileAt(Q,ie);if(Math.max(Math.abs(Q-q),Math.abs(ie-te))<Zo&&ue&&ue.data&&ue.data.id===$)continue;let be=j.get($);be&&(be.dispose(),j.delete($));let me=ee.get($);me&&(me.dispose(),ee.delete($));for(let Pe of[$,-1-$]){let qe=K.get(Pe);qe&&(Uo(qe),K.delete(Pe))}F.delete($),s.delete(Y),T.delete($),Ea(Y),oe=!0,we($)}for(let $ of se.keys()){let Y=$%lt,Q=($-Y)/lt;Math.max(Math.abs(Y-q),Math.abs(Q-te))>=Zo&&we($)}let ce=null,le=1/0;for(let $=-2;$<=qo;$++)for(let Y=-2;Y<=qo;Y++){let Q=q+Y,ie=te+$;if(Q<0||ie<0||Q>=lt||ie>=lt||F.has(ie*lt+Q))continue;let ue=o.streamer.tileAt(Q,ie);if(!ue||!ue.data)continue;let be=Math.max(Math.abs(Y),Math.abs($));be<=Ko?Me(ue.data):be<le&&(le=be,ce=ue.data)}ce&&Me(ce)}let We=new WeakSet,G=W=>{y.setup(W),W.isMeshStandardMaterial&&W.envMap&&W.envMap!==h.envMap&&!We.has(W)&&(We.add(W),W.envMap=h.envMap,W.needsUpdate=!0)},X=W=>{let re=W.material;if(re)if(Array.isArray(re))for(let q of re)G(q);else G(re)};function*Z(){let W=new ct;W.name="warmup",W.scale.setScalar(Yo.scale),e.add(W),ae=W;let re=$=>{W.add($),Ne($),W.position.copy(t.position),W.position.y-=Yo.below,W.traverse(Y=>{Y.frustumCulled=!1}),W.updateMatrixWorld(!0),J=!0,de.warm++},q=[];if(!l.has("forest")){let $=500/Ke.modelCells,Y=250+$/2,Q=$t.near,ie=0;for(let me=1;me<=4&&!ie;me++){let Pe=(me-.5)*$;Pe>=Ke.fullIn*Q&&Pe<Ke.modelIn*Q&&(ie=me)}let ue=me=>()=>{let Pe=Lo({sugi:[],sugi2:[],broad:[],sasa:[],fern:[],take:[],...me},M);for(let qe=0;qe<8&&Pe.update(Y,Y,999,null);qe++);return{o:Pe.group,dispose:()=>Pe.dispose()}},be=[Y,0,Y,12,0];for(let me of Object.keys(M.models))q.push(ue({[me]:ie?[...be,Y+ie*$,0,Y,12,0]:be}));q.push(ue({sasa:[Y,0,Y,1,0],fern:[Y,0,Y,1,0],...M.modelKinds.conifer.length?{}:{sugi:be,sugi2:be},...M.modelKinds.broad.length?{}:{broad:be}}))}if(_){let $=_;q.push(()=>{let Y=Eo([250,0,250,1,1,0],$);return Y.update(250,250,999),{o:Y.group,dispose:()=>Y.dispose()}})}let te=($,Y)=>()=>{$.traverse(Q=>{Q.isInstancedMesh&&Q.dispose()});for(let Q of Y)Q.dispose()},ce=($,Y,Q)=>{let ie=new ba(1,1),ue=new it;ue.setAttribute("position",new ze([0,0,0,1,0,0],3)),Q.push(ie,ue);for(let[be,me]of Object.entries(xr)){let Pe=new ot(ie,$.mats[be]);Pe.castShadow=me,Pe.receiveShadow=!0,Y.add(Pe)}Y.add(Fa([0,0,0,1,0,0]))};q.push(()=>{let $=new ct,Y=new ba(1,1),Q=new ot(Y,i.road);return Q.castShadow=!1,Q.receiveShadow=!0,$.add(Q),{o:$,dispose:()=>Y.dispose()}}),l.has("roadside")||q.push(()=>{let $=new ct,Y=[];return ce(D,$,Y),$.add(vo([[0,0,0,0,0],[3,0,0,0,1]],A)),{o:$,dispose:te($,Y)}}),q.push(()=>{let $=new ct,Y=[],Q=new Ze,ie=(me,Pe)=>{let qe=new rt(me,Pe,1);qe.setMatrixAt(0,Q),qe.castShadow=!0,qe.receiveShadow=!0,$.add(qe)},ue=i.box.geo.clone();ue.setAttribute("aKind",new or(new Float32Array([Ae.shop]),1)),Y.push(ue),ie(ue,i.box.mat),ie(i.box.geo,i.parapet),ie(v.vendGeo,v.vendMats),ie(v.signal.body,v.signalBody);for(let me of[v.signal.go,v.signal.stop]){let Pe=new rt(me,v.signalLens,1);Pe.setMatrixAt(0,Q),Pe.userData.noAO=!0,$.add(Pe)}for(let me of jo(new Float32Array([0,0,0,6,3,6,0,Ae.house,9,0,0,6,3,6,0,Ae.houseHip]),v))$.add(me);{let me=new rt(v.crownGeo,v.green,1);me.setMatrixAt(0,Q),me.setColorAt(0,new Ee(3364130)),me.castShadow=!0,me.receiveShadow=!0,$.add(me)}let be=new ba(1,1);be.setAttribute("color",new Rt(new Float32Array(12).fill(.5),3)),be.setAttribute("aGround",new Rt(new Float32Array(4),1)),Y.push(be);for(let me of[i.cityGround,i.cityLane,v.street]){let Pe=new ot(be,me);Pe.receiveShadow=!0,Pe.castShadow=!0,$.add(Pe)}return{o:$,dispose:te($,Y)}});for(let $ of q){let Y=$();Y&&(re(Y.o),yield,W.remove(Y.o),Y.dispose())}let le=[];for(let $ of e.children)($.name==="lakes"||$.name==="landmarks")&&$.traverse(Y=>{Y.frustumCulled&&(Y.frustumCulled=!1,le.push(Y))});de.warm++,yield;for(let $ of le)$.frustumCulled=!0;e.remove(W),ae=null}let ae=null,he=l.has("warm")?null:Z(),Te=new je,Se=new ne,Ve={fx:0,fz:1,cos:-2},de={quality:Qa[u]?u:"ultra",tod:c,lights:p.lights,visuals:0,farTriangles:0,sunIntensity:x,exposure:a.toneMappingExposure,skyIrradiance:g,ground:h.groundColor.toArray(),wallIrradiance:h.wallIrradiance,lampLights:0,farLights:I?I.count:0,showMs:0,showMsMax:0,shows:0,stageMs:[],warm:0},Ce=0;return{info:de,perf:V.info,setRenderScale:V.setScale,setSpeed(W,re=.016){let q=Math.min(1,Math.max(0,(W-25)/145));q=q*(2-q),Ce+=(q-Ce)*Math.min(1,re*4),H.grade.uniforms.uSpeedBlur.value=Ce*.85},update(W,re,q){ke(W,re),at.uNearC.value[0]=W,at.uNearC.value[1]=re,co.uRes.value[0]=a.domElement.width*.5*(V.info.scale||1),co.uRes.value[1]=a.domElement.height*.5*(V.info.scale||1);let te=Math.floor((W+nt)/500),ce=Math.floor((re+nt)/500);ye(te,ce);for(let[$,Y]of F){let Q=ge($,te,ce);Y.userData.noAO=Q>1;{let Oe=Y.userData.terrainMesh||(Y.userData.terrainMesh=Y.getObjectByName("terrain")||null),et=$%lt,Lt=($-et)/lt,dt=Math.max(et*500-nt-W,0,W-(et+1)*500+nt),ra=Math.max(Lt*500-nt-re,0,re-(Lt+1)*500+nt),ia=dt*dt+ra*ra,Kt=(sa,Ht,La)=>sa?ia>La:ia>Ht,ha=Kt(Oe?.userData.isCoarse>=2,16e5,13e5)?2:Kt(Oe?.userData.isCoarse>=1,14e4,105e3)?1:0;Oe&&Oe.userData.coarse&&Oe.userData.isCoarse!==ha&&(Oe.userData.isCoarse=ha,Oe.geometry.setIndex(ha===2?Oe.userData.coarse4:ha===1?Oe.userData.coarse:Oe.userData.fine));let la=Y.userData.railsMesh===void 0?Y.userData.railsMesh=Y.getObjectByName("rails")||null:Y.userData.railsMesh,xo=la?!Kt(!la.visible,115e3,9e4):!1;if(la&&la.visible!==xo&&(la.visible=xo),Y.userData.cityBoxes){let sa=Y.userData.cityHidden|0,Ht=Kt(sa>=3,28e4,22e4)+Kt(sa>=2,14e4,105e3)+Kt(sa>=1,72e3,54e3);if(Y.userData.cityHidden!==Ht){Y.userData.cityHidden=Ht,Y.userData.cityBoxes.visible=Ht<3;for(let La of Y.userData.cityRoofs||[])La.visible=Ht<2;Y.userData.cityCrowns&&(Y.userData.cityCrowns.visible=Ht<1)}}}let ie=$%lt,ue=($-ie)/lt,be=Math.max(ie*500-nt-W,0,W-(ie+1)*500+nt),me=Math.max(ue*500-nt-re,0,re-(ue+1)*500+nt),Pe=be*be+me*me,qe=Q<=2&&Pe<16e4;if(Y.userData.cityFar&&Y.userData.cityFarOn!==qe){Y.userData.cityFarOn=qe;for(let Oe of Y.userData.cityFar)Oe.visible=qe}Y.userData.cityBoxes&&Y.userData.cityBoxes.castShadow!==qe&&(Y.userData.cityBoxes.castShadow=qe);let Ge=Q<=1&&Pe<12100;if(Y.userData.cityNear){if(Q<=1){let Oe=W-Y.position.x,et=re-Y.position.z;for(let Lt of Y.userData.cityNear){if(Lt.userData.hold)continue;let dt=Lt.userData.cell,ra=Math.max(dt[0]-Oe,0,Oe-dt[2]),ia=Math.max(dt[1]-et,0,et-dt[3]);Lt.visible=ra*ra+ia*ia<12100}Y.userData.cityCellsOff=!1}else if(!Y.userData.cityCellsOff){Y.userData.cityCellsOff=!0;for(let Oe of Y.userData.cityNear)Oe.visible=!1}}if(Y.userData.cityNear&&Y.userData.cityNearOn!==Ge){Y.userData.cityNearOn=Ge;let Oe=Y.userData.cityCrowns;Oe&&(Oe.castShadow=Ge,Oe.geometry=Ge?v.crownGeo:v.crownFarGeo);for(let et of Y.userData.cityRoofs||[])et.castShadow=!1,et.geometry=et.name==="roofsHip"?Ge?v.hipGeo:v.hipFarGeo:Ge?v.roofGeo:v.roofFarGeo}}oe&&=(C.setDetailed($=>F.has($)),O.setDetailed($=>F.has($)),!1),C.follow(t.position.x,t.position.z);let le=3;t.getWorldDirection(Se);{let $=Math.hypot(Se.x,Se.z);Ve.cos=$<.35?-2:Math.cos(Math.min(Math.PI,Math.ceil((Math.atan(Math.tan(t.fov*Math.PI/360)*t.aspect)+.32)*12)/12)),Ve.fx=$>0?Se.x/$:0,Ve.fz=$>0?Se.z/$:1}for(let[$,Y]of j){let Q=F.get($);if(!Q||le<=0)break;let ie=Y.update(t.position.x-Q.position.x,t.position.z-Q.position.z,le,Ve);ie&&(J=!0),le-=ie}if(M.setTime(q/1e3),_){_.setTime(q/1e3);let $=3;for(let[Y,Q]of ee){let ie=F.get(Y);if(!ie||$<=0)break;$-=Q.update(t.position.x-ie.position.x,t.position.z-ie.position.z,$)}}h.update(t,q/1e3),k?.update(t,q/1e3);{let $=new ne().copy(h.sunDir).add(t.position).project(t),Y=h.sunDir.dot(t.getWorldDirection(new ne))>0,Q=($.x+1)/2,ie=($.y+1)/2,ue=Math.max(0,1-Math.max(Math.abs($.x),Math.abs($.y))/1.6);H.setSun(Q,ie,Y&&p.sunToSky>0?ue*(p.lights>.5?.3:1):0)}if(U?.update(q/1e3),R&&(R.update(t,T.values()),de.lampLights=R.active),I){let $=Math.floor((W+nt)/500),Y=Math.floor((re+nt)/500),Q=0;for(let ie=-2;ie<=2;ie++)for(let ue=-2;ue<=2;ue++){let be=$+ue,me=Y+ie;be>=0&&me>=0&&be<lt&&me<lt&&F.has(me*lt+be)&&(Q|=1<<(ie+2)*5+ue+2)}I.setNear($,Y,Q)}A.setView(t.fov,a.getDrawingBufferSize(Te).y),he&&he.next().done&&(he=null),(J||!(++fe&63))&&(e.traverse(X),J=!1),y.update(),V.tick(),de.visuals=F.size,de.farTriangles=C.info.triangles},render(){a.info.reset(),l.has("post")?a.render(e,t):H.render()},dispose(){for(let W of j.values())W.dispose();for(let W of ee.values())W.dispose();ee.clear(),_?.dispose();for(let W of K.values())Uo(W);for(let W of[...se.keys()])we(W);he=null,ae?.removeFromParent(),Ue.dispose(),K.clear(),D.dispose(),v.dispose(),A.dispose(),R?.dispose(),I?.dispose(),U?.dispose(),T.clear();for(let W of F.values())s.delete(W),Ea(W);j.clear(),F.clear(),M.dispose(),H.dispose(),y.dispose(),C.dispose(),O.dispose(),h.dispose()}}}export{da as LOOK,Qa as QUALITY,d0 as createBeautyWorld};
