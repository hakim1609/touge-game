const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-D087b-o8.js","./three.core-cHjUlQS7.js","./three.module-BqPlYAZQ.js","./cars-CW2n562P.js","./chunks-Dbcody47.js"])))=>i.map(i=>d[i]);
import{A as e,An as t,Bn as n,C as r,D as i,Et as a,F as o,G as s,H as c,I as l,Kt as u,Ln as d,Mt as f,O as p,Pt as m,R as h,St as g,Tn as _,V as v,Yn as y,_t as b,a as x,ar as S,at as C,c as w,er as T,f as E,gt as D,h as O,ir as k,it as A,jt as ee,k as j,m as M,mr as N,mt as P,nt as F,o as I,ot as L,p as te,pr as R,q as z,qn as B,s as V,sr as H,tr as ne,u as re,vr as U,vt as ie,w as ae,wt as W,yt as oe,zn as se,zt as ce}from"./three.core-cHjUlQS7.js";import{n as le,t as ue}from"./three.module-BqPlYAZQ.js";import{_ as de,f as fe,h as pe,m as me,s as he}from"./chunks-Dbcody47.js";import{B as ge,C as _e,D as ve,E as ye,F as be,I as xe,P as Se,T as Ce,U as we,V as Te,t as Ee,w as De}from"./index-D087b-o8.js";import{createTileVisual as Oe,disposeTileVisual as ke,n as Ae,t as je}from"./worldVisual-DlPArof1.js";import{n as Me,r as Ne,t as Pe}from"./forest-D30TJ0Be.js";import{createLakeFlat as Fe,createLakeWater as Ie}from"./water-D8hpXj0u.js";var Le=class e extends b{constructor(){let t=e.SkyShader,r=new n({name:t.name,uniforms:k.clone(t.uniforms),vertexShader:t.vertexShader,fragmentShader:t.fragmentShader,side:1,depthWrite:!1});super(new I(1,1,1),r),this.isSky=!0}};Le.SkyShader={name:`SkyShader`,uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new N},cloudScale:{value:2e-4},cloudSpeed:{value:2e-5},cloudCoverage:{value:.4},cloudDensity:{value:.4},cloudElevation:{value:.5},showSunDisc:{value:1},time:{value:0}},vertexShader:`
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

			gl_FragColor = vec4( texColor, 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};var Re={day:{sun:[235,42],turbidity:5,rayleigh:1.2,mie:.004,clouds:.36,sunToSky:1.3,rel:0,lights:0},sunset:{sun:[262,3.5],turbidity:7.5,rayleigh:2.4,mie:.007,clouds:.34,sunToSky:2.4,rel:7,lights:.3},dusk:{sun:[268,-1.2],turbidity:6,rayleigh:2.8,mie:.006,clouds:.28,sunToSky:0,rel:80,lights:.85},night:{moon:[140,38],sunToSky:2,rel:45,lights:1}},ze=5.73;function Be(e,t,n=new N){let r=P.degToRad(e),i=P.degToRad(t);return n.set(Math.sin(r)*Math.cos(i),Math.sin(i),-Math.cos(r)*Math.cos(i))}var Ve=`
varying vec3 vWorldPosition;
void main() {
	vec4 wp = modelMatrix * vec4( position, 1.0 );
	vWorldPosition = wp.xyz;
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
	gl_Position.z = gl_Position.w;
}`,He=`
uniform vec3 moonDir;
uniform float showMoon;
uniform float time;
uniform float cityGlow;
varying vec3 vWorldPosition;
float nh( vec3 p ) { return fract( sin( dot( p, vec3( 12.9898, 78.233, 45.164 ) ) ) * 43758.5453 ); }
void main() {
	vec3 d = normalize( vWorldPosition - cameraPosition );
	float el = d.y;
	vec3 col = mix( vec3( 0.010, 0.014, 0.026 ), vec3( 0.0016, 0.0026, 0.0068 ), smoothstep( 0.0, 0.55, el ) );
	if ( el < 0.0 ) col = vec3( 0.006, 0.008, 0.014 );
	// звёзды: ячейки на сфере, в редких — точка со своей яркостью и цветом, мерцание
	vec3 sp = d * 240.0, cell = floor( sp );
	float r = nh( cell );
	if ( r > 0.984 && el > 0.02 ) {
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
}`;function Ue(e){let t=new n({name:`NightSky`,vertexShader:Ve,fragmentShader:He,side:1,depthWrite:!1,uniforms:{moonDir:{value:e.clone()},showMoon:{value:1},time:{value:0},cityGlow:{value:1}}}),r=new b(new I(1,1,1),t);return r.frustumCulled=!1,r}function We(e,t=Re.day,{sunColor:n=16773340,moonColor:r=11122920,groundAlbedo:i=.15}={}){let a=!!t.moon,[o,s]=a?t.moon:t.sun,c=Be(o,s),u=()=>{if(a)return Ue(c);let e=new Le,n=e.material.uniforms;return n.turbidity.value=t.turbidity,n.rayleigh.value=t.rayleigh,n.mieCoefficient.value=t.mie,n.mieDirectionalG.value=.8,n.sunPosition.value.copy(c),n.cloudCoverage.value=t.clouds,n.cloudDensity.value=.75,n.cloudElevation.value=.5,n.cloudScale.value=2e-4,n.cloudSpeed.value=3e-5,e.frustumCulled=!1,e},d=(e,t)=>{let n=e.material.uniforms;a?(n.showMoon.value=+!!t,n.cityGlow.value=+!!t):n.showSunDisc.value=+!!t},p=u();p.scale.setScalar(1e3),p.renderOrder=1e3,p.name=`sky`;let m=u();d(m,!1),m.scale.setScalar(10);let h=new se;h.add(m);let g=new U(32,32,{type:l}),_=new Float32Array(4096),v=new f(90,1,.1,100),y=new N,x=new N,S=new N,C=new N,w=new R(c.x,c.z).normalize(),T=new N,D=new N,O=new N,k=0,A=0,ee=0,j=0,F=e.getRenderTarget();for(let[t,n,r,i,a,o]of[[0,1,0,0,0,-1],[1,0,0,0,1,0],[-1,0,0,0,1,0],[0,0,1,0,1,0],[0,0,-1,0,1,0]]){v.position.set(0,0,0),v.up.set(i,a,o),v.lookAt(t,n,r),v.updateMatrixWorld(),e.setRenderTarget(g),e.render(h,v),e.readRenderTargetPixels(g,0,0,32,32,_);let s=v.matrixWorld.elements;y.set(s[0],s[1],s[2]),x.set(s[4],s[5],s[6]),S.set(-s[8],-s[9],-s[10]);for(let e=0;e<32;e++)for(let t=0;t<32;t++){let n=(t+.5)/32*2-1,r=(e+.5)/32*2-1;C.copy(S).addScaledVector(y,n).addScaledVector(x,r);let i=C.length();if(C.divideScalar(i),C.y<=0)continue;let a=(e*32+t)*4,o=_[a],s=_[a+1],c=_[a+2],l=4/1024/(i*i*i),u=C.y*l,d=.2126*o+.7152*s+.0722*c,f=C.x*w.x+C.z*w.y;if(k+=d*u,f>0&&(A+=d*f*l),O.x+=o*u,O.y+=s*u,O.z+=c*u,C.y<.02||C.y>.09)continue;let p=Math.hypot(C.x,C.z),m=(C.x*w.x+C.z*w.y)/p;m>.92?(T.x+=o,T.y+=s,T.z+=c,ee++):m<-.3&&(D.x+=o,D.y+=s,D.z+=c,j++)}}e.setRenderTarget(F),g.dispose(),T.divideScalar(Math.max(1,ee)),D.divideScalar(Math.max(1,j));let I=new M(T.x,T.y,T.z).multiplyScalar(1/Math.max(1e-6,T.x,T.y,T.z)),L=1-P.smoothstep(s,2,20),te=a?new M(r):new M(n).lerp(I,L),z=i/Math.PI,B=t.sunToSky*k,V=new ie({side:2,color:new M((O.x+te.r*B)*z,(O.y+te.g*B)*z,(O.z+te.b*B)*z)}),H=new b(new E(90,48),V);H.rotation.x=-Math.PI/2,H.position.y=-.3,h.add(H);let ne=new ue(e),re=ne.fromScene(h,0,.1,100);return ne.dispose(),m.geometry.dispose(),m.material.dispose(),H.geometry.dispose(),V.dispose(),{mesh:p,sunDir:c,night:a,envMap:re.texture,lightColor:te,groundColor:V.color.clone(),skyIrradiance:k,wallIrradiance:A+(.2126*V.color.r+.7152*V.color.g+.0722*V.color.b)*Math.PI/2,horizonAway:new M(D.x,D.y,D.z),horizonSun:new M(T.x,T.y,T.z),update(e,t){p.position.copy(e.position),p.material.uniforms.time.value=t},dispose(){p.removeFromParent(),p.geometry.dispose(),p.material.dispose(),re.dispose()}}}function Ge({sunDir:e,sunColor:t,falloff:n=1/450}){let r=(e,t,n)=>`vec3( ${e.toFixed(6)}, ${t.toFixed(6)}, ${n.toFixed(6)} )`;le.fog_pars_vertex=`#ifdef USE_FOG
	varying vec3 vFogWorld;
#endif`,le.fog_vertex=`#ifdef USE_FOG
	vFogWorld = transpose( mat3( viewMatrix ) ) * mvPosition.xyz + cameraPosition;
#endif`,le.fog_pars_fragment=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying vec3 vFogWorld;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
	#define FOG_SUN_DIR ${r(e.x,e.y,e.z)}
	#define FOG_SUN_COLOR ${r(t.r,t.g,t.b)}
	#define FOG_FALLOFF ${n.toExponential(6)}
#endif`,le.fog_fragment=`#ifdef USE_FOG
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
	float fogStep = mix( fogFactor, smoothstep( 0.2, 0.7, fogFactor ), 0.6 );
	vec3 fogCol = mix( fogColor, FOG_SUN_COLOR, fogSun ) * mix( vec3( 1.0 ), vec3( 0.86, 0.9, 1.02 ), fogStep );
	fogCol = mix( fogCol, vec3( 0.72, 0.78, 0.86 ) * fogColor.g / max( fogColor.g, 1e-3 ), smoothstep( 0.75, 1.0, fogStep ) * 0.5 );
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogCol, fogStep );
#endif`}var Ke=new D,qe=class e{constructor(e){e||={},this.zNear=e.webGL===!0?-1:0,this.zFar=1,this.vertices={near:[new N,new N,new N,new N],far:[new N,new N,new N,new N]},e.projectionMatrix!==void 0&&this.setFromProjectionMatrix(e.projectionMatrix,e.maxFar||1e4),e.reversedDepth===!0&&(this.zNear=1,this.zFar=0)}setFromProjectionMatrix(e,t){let n=this.zNear,r=this.zFar,i=e.elements[11]===0;return Ke.copy(e).invert(),this.vertices.near[0].set(1,1,n),this.vertices.near[1].set(1,-1,n),this.vertices.near[2].set(-1,-1,n),this.vertices.near[3].set(-1,1,n),this.vertices.near.forEach(function(e){e.applyMatrix4(Ke)}),this.vertices.far[0].set(1,1,r),this.vertices.far[1].set(1,-1,r),this.vertices.far[2].set(-1,-1,r),this.vertices.far[3].set(-1,1,r),this.vertices.far.forEach(function(e){e.applyMatrix4(Ke);let n=Math.abs(e.z);i?e.z*=Math.min(t/n,1):e.multiplyScalar(Math.min(t/n,1))}),this.vertices}split(t,n){for(;t.length>n.length;)n.push(new e);n.length=t.length;let r=this.vertices.near[0].z,i=this.vertices.far[0].z;for(let e=0;e<t.length;e++){let a=n[e];if(e===0)for(let e=0;e<4;e++)a.vertices.near[e].copy(this.vertices.near[e]);else{let n=(t[e-1]*i-r)/(i-r);for(let e=0;e<4;e++)a.vertices.near[e].lerpVectors(this.vertices.near[e],this.vertices.far[e],n)}if(e===t.length-1)for(let e=0;e<4;e++)a.vertices.far[e].copy(this.vertices.far[e]);else{let n=(t[e]*i-r)/(i-r);for(let e=0;e<4;e++)a.vertices.far[e].lerpVectors(this.vertices.near[e],this.vertices.far[e],n)}}}toSpace(e,t){for(let n=0;n<4;n++)t.vertices.near[n].copy(this.vertices.near[n]).applyMatrix4(e),t.vertices.far[n].copy(this.vertices.far[n]).applyMatrix4(e)}},Je={lights_fragment_begin:`
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
	`+le.lights_pars_begin},Ye=new D,Xe=new qe({webGL:!0}),Ze=new N,Qe=new N,$e=new x,et=[],tt=[],nt=new D,rt=new D,it=new N(0,1,0),at=class{constructor(e){this.camera=e.camera,this.parent=e.parent,this.cascades=e.cascades||3,this.maxFar=e.maxFar||1e5,this.mode=e.mode||`practical`,this.shadowMapSize=e.shadowMapSize||2048,this.shadowBias=e.shadowBias||1e-6,this.lightDirection=e.lightDirection||new N(1,-1,1).normalize(),this.lightIntensity=e.lightIntensity||3,this.lightNear=e.lightNear||1,this.lightFar=e.lightFar||2e3,this.lightMargin=e.lightMargin||200,this.customSplitsCallback=e.customSplitsCallback,this.fade=!1,this.mainFrustum=new qe({webGL:!0}),this.frustums=[],this.breaks=[],this.lights=[],this.shaders=new Map,this._createLights(),this.updateFrustums(),this._injectInclude()}_createLights(){for(let e=0;e<this.cascades;e++){let e=new j(16777215,this.lightIntensity);e.castShadow=!0,e.shadow.mapSize.width=this.shadowMapSize,e.shadow.mapSize.height=this.shadowMapSize,e.shadow.camera.near=this.lightNear,e.shadow.camera.far=this.lightFar,e.shadow.bias=this.shadowBias,this.parent.add(e),this.parent.add(e.target),this.lights.push(e)}}_initCascades(){let e=this.camera;e.updateProjectionMatrix(),this.mainFrustum.setFromProjectionMatrix(e.projectionMatrix,this.maxFar),this.mainFrustum.split(this.breaks,this.frustums)}_updateShadowBounds(){let e=this.frustums;for(let t=0;t<e.length;t++){let e=this.lights[t].shadow.camera,n=this.frustums[t],r=n.vertices.near,i=n.vertices.far,a=i[0],o;o=a.distanceTo(i[2])>a.distanceTo(r[2])?i[2]:r[2];let s=a.distanceTo(o);if(this.fade){let e=this.camera,t=Math.max(e.far,this.maxFar),r=.25*(n.vertices.far[0].z/(t-e.near))**2*(t-e.near);s+=r}e.left=-s/2,e.right=s/2,e.top=s/2,e.bottom=-s/2,e.updateProjectionMatrix()}}_getBreaks(){let e=this.camera,t=Math.min(e.far,this.maxFar);switch(this.breaks.length=0,this.mode){case`uniform`:n(this.cascades,e.near,t,this.breaks);break;case`logarithmic`:r(this.cascades,e.near,t,this.breaks);break;case`practical`:i(this.cascades,e.near,t,.5,this.breaks);break;case`custom`:this.customSplitsCallback===void 0&&console.error(`CSM: Custom split scheme callback not defined.`),this.customSplitsCallback(this.cascades,e.near,t,this.breaks)}function n(e,t,n,r){for(let i=1;i<e;i++)r.push((t+(n-t)*i/e)/n);r.push(1)}function r(e,t,n,r){for(let i=1;i<e;i++)r.push(t*(n/t)**(i/e)/n);r.push(1)}function i(e,t,i,a,o){et.length=0,tt.length=0,r(e,t,i,tt),n(e,t,i,et);for(let t=1;t<e;t++)o.push(P.lerp(et[t-1],tt[t-1],a));o.push(1)}}update(){let e=this.camera,t=this.frustums;nt.lookAt(Qe,this.lightDirection,it),rt.copy(nt).invert();for(let n=0;n<t.length;n++){let r=this.lights[n],i=r.shadow.camera,a=(i.right-i.left)/this.shadowMapSize,o=(i.top-i.bottom)/this.shadowMapSize;Ye.multiplyMatrices(rt,e.matrixWorld),t[n].toSpace(Ye,Xe);let s=Xe.vertices.near,c=Xe.vertices.far;$e.makeEmpty();for(let e=0;e<4;e++)$e.expandByPoint(s[e]),$e.expandByPoint(c[e]);$e.getCenter(Ze),Ze.z=$e.max.z+this.lightMargin,Ze.x=Math.floor(Ze.x/a)*a,Ze.y=Math.floor(Ze.y/o)*o,Ze.applyMatrix4(nt),r.position.copy(Ze),r.target.position.copy(Ze),r.target.position.x+=this.lightDirection.x,r.target.position.y+=this.lightDirection.y,r.target.position.z+=this.lightDirection.z}}_injectInclude(){le.lights_fragment_begin=Je.lights_fragment_begin,le.lights_pars_begin=Je.lights_pars_begin}setupMaterial(e){e.defines=e.defines||{},e.defines.USE_CSM=1,e.defines.CSM_CASCADES=this.cascades,this.fade&&(e.defines.CSM_FADE=``);let t=[],n=this,r=this.shaders;e.onBeforeCompile=function(i){let a=Math.min(n.camera.far,n.maxFar);n._getExtendedBreaks(t),i.uniforms.CSM_cascades={value:t},i.uniforms.cameraNear={value:n.camera.near},i.uniforms.shadowFar={value:a},r.set(e,i)},r.set(e,null)}_updateUniforms(){let e=Math.min(this.camera.far,this.maxFar);this.shaders.forEach(function(t,n){if(t!==null){let n=t.uniforms;this._getExtendedBreaks(n.CSM_cascades.value),n.cameraNear.value=this.camera.near,n.shadowFar.value=e}!this.fade&&`CSM_FADE`in n.defines?(delete n.defines.CSM_FADE,n.needsUpdate=!0):this.fade&&!(`CSM_FADE`in n.defines)&&(n.defines.CSM_FADE=``,n.needsUpdate=!0)},this)}_getExtendedBreaks(e){for(;e.length<this.breaks.length;)e.push(new R);e.length=this.breaks.length;for(let t=0;t<this.cascades;t++){let n=this.breaks[t],r=this.breaks[t-1]||0;e[t].x=r,e[t].y=n}}updateFrustums(){this._getBreaks(),this._initCascades(),this._updateShadowBounds(),this._updateUniforms()}remove(){for(let e=0;e<this.lights.length;e++)this.parent.remove(this.lights[e].target),this.parent.remove(this.lights[e])}dispose(){let e=this.shaders;e.forEach(function(e,t){delete t.onBeforeCompile,delete t.defines.USE_CSM,delete t.defines.CSM_CASCADES,delete t.defines.CSM_FADE,e!==null&&(delete e.uniforms.CSM_cascades,delete e.uniforms.cameraNear,delete e.uniforms.shadowFar),t.needsUpdate=!0}),e.clear()}},ot=e=>e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial||e.isMeshToonMaterial;function st({scene:e,camera:t,sunDir:n,intensity:r,color:i,maxFar:a=2500,mapSize:o=2048,splits:s=[12,60,300]}){let c=s,l=new at({camera:t,parent:e,cascades:c.length+1,maxFar:a,mode:`custom`,shadowMapSize:o,shadowBias:-5e-5,customSplitsCallback:(e,t,n,r)=>{for(let e of c)r.push(e/n);r.push(1)},lightDirection:n.clone().negate(),lightIntensity:r,lightNear:1,lightFar:8e3,lightMargin:3e3});l.fade=!0;for(let e of l.lights)e.color.copy(i),e.intensity=r;l.lights.length>=4&&o>=2048&&l.lights[l.lights.length-1].shadow.mapSize.set(o/2,o/2);let u=new WeakSet;function d(e){if(u.has(e)||(u.add(e),!ot(e)))return;let t=e.onBeforeCompile,n=e.customProgramCacheKey();l.setupMaterial(e);let r=e.onBeforeCompile;e.onBeforeCompile=function(e,n){t.call(this,e,n),r.call(this,e,n)},e.customProgramCacheKey=()=>n+`|csm`,e.needsUpdate=!0}let f=e=>{let t=e.material;if(t){if(Array.isArray(t))for(let e of t)d(e);else d(t)}};return{csm:l,setup:d,scan(){e.traverse(f)},update(){t.updateMatrixWorld(),l.update();for(let e of l.lights){let t=e.shadow.camera;e.shadow.normalBias=1.5*(t.right-t.left)/e.shadow.mapSize.x,e.shadow.radius=4}},dispose(){l.remove(),l.dispose()}}}var ct={name:`FXAAShader`,uniforms:{tDiffuse:{value:null},resolution:{value:new R(1/1024,1/512)}},vertexShader:`

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
		float _SubpixelBlending = 1.0;

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

		}`},lt=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},ut=new ee(-1,1,1,-1,0,1),dt=new class extends w{constructor(){super(),this.setAttribute(`position`,new o([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new o([0,2,0,0,2,0],2))}},ft=class{constructor(e){this._mesh=new b(dt,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,ut)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},pt=class extends lt{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof n?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=k.clone(e.uniforms),this.material=new n({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new ft(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},mt=class extends pt{constructor(){super(ct)}setSize(e,t){this.material.uniforms.resolution.value.set(1/e,1/t)}},ht={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`},gt=class extends lt{constructor(){super(),this.isOutputPass=!0,this.uniforms=k.clone(ht.uniforms),this.material=new _({name:ht.name,uniforms:this.uniforms,vertexShader:ht.vertexShader,fragmentShader:ht.fragmentShader}),this._fsQuad=new ft(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},O.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},_t={move:.04,turn:.045,maxFrames:[1,3,8,16]},vt={step:.1,down:.87,up:1.5,downSec:2,upSec:5,warmup:6,lockSec:120};function yt(e,t,n,r){let i=e.setSize.bind(e);e.setSize=(e,n)=>i(Math.max(1,Math.round(e*t)),Math.max(1,Math.round(n*t))),e.setSize(n,r)}function bt({perf:e,renderer:t,post:n,shadows:r,camera:i,splits:a,maxFar:o,now:s=()=>performance.now()}){let c={ao:1,bloom:1,fxaa:!1,stagger:!1,shadowDraws:0,frames:0,dynamic:!1,scale:1,atFloor:!0,fps:0};if(!e)return{info:c,tick(){},setScale(){}};let l=n.composer.renderTarget1,u=l.width,d=l.height;if(e.aoScale&&e.aoScale!==1&&n.gtao.enabled){yt(n.gtao,e.aoScale,u,d);let t=e.aoSamples||8;n.gtao.updateGtaoMaterial({samples:t}),n.gtao.updatePdMaterial({samples:t,radius:4}),c.ao=e.aoScale}if(e.bloomScale&&e.bloomScale!==1&&n.bloom.enabled&&(yt(n.bloom,e.bloomScale,u,d),c.bloom=e.bloomScale),e.fxaa){let e=n.composer.passes.findIndex(e=>e instanceof gt);if(e>=0){let t=new mt;n.composer.insertPass(t,e+1),t.setSize(u,d),c.fxaa=!0}}let f=[],p=[...a,o],m=new N,h=e.stagger?r.csm.lights:[];for(let e=0;e<h.length;e++)h[e].shadow.autoUpdate=!1,h[e].shadow.needsUpdate=!0,f.push({pos:new N(1/0,0,0),dir:new N,age:0});c.stagger=h.length>0;let g=e.dynamic&&e.dynamic.min<1?e.dynamic:null,_=t.getPixelRatio(),v=new R,y=1,b=1,x=0,S=-1e9,C=0,w=0,T=0,E=0,D=s(),O=D;c.dynamic=!!g,c.atFloor=!g;function k(e){y=Math.round(Math.min(1,Math.max(.3,e))*100)/100,t.getSize(v),n.composer._pixelRatio=_*y,n.composer.setSize(v.x,v.y),c.scale=y,c.atFloor=!g||y<=g.min+1e-6}function A(e){let t=Math.min(.5,(e-O)/1e3);if(O=e,e-D<vt.warmup*1e3||t<=0||(T+=t,E++,T<1))return;let n=E/T;if(T=0,E=0,c.fps=Math.round(n),e>x&&(b=1),n<g.target*vt.down?(C+=1,w=0):n>g.target*vt.up?(w+=1,C=0):(C=0,w=0),C>=vt.downSec&&y>g.min+1e-6){let t=Math.max(g.min,y-(n<g.target*.6?2:1)*vt.step);e-S<15e3&&(b=t,x=e+vt.lockSec*1e3),k(t),C=0}else w>=vt.upSec&&y<b-1e-6&&(k(Math.min(b,y+vt.step)),w=0,S=e)}let ee=0;return{info:c,setScale:k,tick(){let e=s();if(g&&A(e),y!==1){let e=n.composer.renderTarget1;n.grade.uniforms.uTexel.value.set(1/e.width,1/e.height)}if(h.length){ee++,c.frames=ee,i.getWorldDirection(m);for(let e=0;e<h.length;e++){let t=f[e],n=_t.maxFrames[Math.min(e,_t.maxFrames.length-1)];t.age++;let r=t.age>=n&&(n<=3||(ee+e)%2==0),a=t.pos.distanceToSquared(i.position)>(_t.move*p[e])**2,o=t.dir.dot(m)<Math.cos(_t.turn);(e===0||r||a||o)&&(h[e].shadow.needsUpdate=!0,c.shadowDraws++,t.pos.copy(i.position),t.dir.copy(m),t.age=0)}}}}}var xt={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`},St=class extends lt{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},Ct=class extends lt{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},wt=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new R);this._width=n.width,this._height=n.height,t=new U(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:c}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new pt(xt),this.copyPass.material.blending=0,this.timer=new ne}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}St!==void 0&&(r instanceof St?n=!0:r instanceof Ct&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new R);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},Tt=class extends lt{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new M}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},Et={name:`GTAOShader`,defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:`x`,SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new R},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new D},cameraProjectionMatrixInverse:{value:new D},cameraWorldMatrix:{value:new D},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new N(-1,-1,-1)},sceneBoxMax:{value:new N(1,1,1)}},vertexShader:`

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
		}`},Dt={name:`GTAODepthShader`,defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
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

		}`},Ot={name:`GTAOBlendShader`,uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
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
		}`};function kt(e=5){let n=Math.floor(e)%2==0?Math.floor(e)+1:Math.floor(e),r=At(n),i=r.length,a=new Uint8Array(i*4);for(let e=0;e<i;++e){let t=r[e],n=2*Math.PI*t/i,o=new N(Math.cos(n),Math.sin(n),0).normalize();a[e*4]=(o.x*.5+.5)*255,a[e*4+1]=(o.y*.5+.5)*255,a[e*4+2]=127,a[e*4+3]=255}let o=new ae(a,n,n);return o.wrapS=t,o.wrapT=t,o.needsUpdate=!0,o}function At(e){let t=Math.floor(e)%2==0?Math.floor(e)+1:Math.floor(e),n=t*t,r=Array(n).fill(0),i=Math.floor(t/2),a=t-1;for(let e=1;e<=n;){if(i===-1&&a===t?(a=t-2,i=0):(a===t&&(a=0),i<0&&(i=t-1)),r[i*t+a]!==0){a-=2,i++;continue}r[i*t+a]=e++,a++,i--}return r}var jt={name:`PoissonDenoiseShader`,defines:{SAMPLES:16,SAMPLE_VECTORS:Mt(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new R},cameraProjectionMatrixInverse:{value:new D},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

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
		}`};function Mt(e,t,n){let r=Nt(e,t,n),i=`vec3[SAMPLES](`;for(let t=0;t<e;t++){let n=r[t];i+=`vec3(${n.x}, ${n.y}, ${n.z})${t<e-1?`,`:`)`}`}return i}function Nt(e,t,n){let r=[];for(let i=0;i<e;i++){let a=2*Math.PI*t*i/e,o=(i/(e-1))**n;r.push(new N(Math.cos(a),Math.sin(a),o))}return r}var Pt=class{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let e=0;e<512;e++)this.perm[e]=this.p[e&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,t){let n,r,i,a=.5*(Math.sqrt(3)-1),o=(e+t)*a,s=Math.floor(e+o),c=Math.floor(t+o),l=(3-Math.sqrt(3))/6,u=(s+c)*l,d=s-u,f=c-u,p=e-d,m=t-f,h,g;p>m?(h=1,g=0):(h=0,g=1);let _=p-h+l,v=m-g+l,y=p-1+2*l,b=m-1+2*l,x=s&255,S=c&255,C=this.perm[x+this.perm[S]]%12,w=this.perm[x+h+this.perm[S+g]]%12,T=this.perm[x+1+this.perm[S+1]]%12,E=.5-p*p-m*m;E<0?n=0:(E*=E,n=E*E*this._dot(this.grad3[C],p,m));let D=.5-_*_-v*v;D<0?r=0:(D*=D,r=D*D*this._dot(this.grad3[w],_,v));let O=.5-y*y-b*b;return O<0?i=0:(O*=O,i=O*O*this._dot(this.grad3[T],y,b)),70*(n+r+i)}noise3d(e,t,n){let r,i,a,o,s=(e+t+n)*(1/3),c=Math.floor(e+s),l=Math.floor(t+s),u=Math.floor(n+s),d=1/6,f=(c+l+u)*d,p=c-f,m=l-f,h=u-f,g=e-p,_=t-m,v=n-h,y,b,x,S,C,w;g>=_?_>=v?(y=1,b=0,x=0,S=1,C=1,w=0):g>=v?(y=1,b=0,x=0,S=1,C=0,w=1):(y=0,b=0,x=1,S=1,C=0,w=1):_<v?(y=0,b=0,x=1,S=0,C=1,w=1):g<v?(y=0,b=1,x=0,S=0,C=1,w=1):(y=0,b=1,x=0,S=1,C=1,w=0);let T=g-y+d,E=_-b+d,D=v-x+d,O=g-S+2*d,k=_-C+2*d,A=v-w+2*d,ee=g-1+3*d,j=_-1+3*d,M=v-1+3*d,N=c&255,P=l&255,F=u&255,I=this.perm[N+this.perm[P+this.perm[F]]]%12,L=this.perm[N+y+this.perm[P+b+this.perm[F+x]]]%12,te=this.perm[N+S+this.perm[P+C+this.perm[F+w]]]%12,R=this.perm[N+1+this.perm[P+1+this.perm[F+1]]]%12,z=.6-g*g-_*_-v*v;z<0?r=0:(z*=z,r=z*z*this._dot3(this.grad3[I],g,_,v));let B=.6-T*T-E*E-D*D;B<0?i=0:(B*=B,i=B*B*this._dot3(this.grad3[L],T,E,D));let V=.6-O*O-k*k-A*A;V<0?a=0:(V*=V,a=V*V*this._dot3(this.grad3[te],O,k,A));let H=.6-ee*ee-j*j-M*M;return H<0?o=0:(H*=H,o=H*H*this._dot3(this.grad3[R],ee,j,M)),32*(r+i+a+o)}noise4d(e,t,n,r){let i=this.grad4,a=this.simplex,o=this.perm,s=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20,l,u,d,f,p,m=(e+t+n+r)*s,h=Math.floor(e+m),g=Math.floor(t+m),_=Math.floor(n+m),v=Math.floor(r+m),y=(h+g+_+v)*c,b=h-y,x=g-y,S=_-y,C=v-y,w=e-b,T=t-x,E=n-S,D=r-C,O=w>T?32:0,k=w>E?16:0,A=T>E?8:0,ee=w>D?4:0,j=T>D?2:0,M=+(E>D),N=O+k+A+ee+j+M,P=+(a[N][0]>=3),F=+(a[N][1]>=3),I=+(a[N][2]>=3),L=+(a[N][3]>=3),te=+(a[N][0]>=2),R=+(a[N][1]>=2),z=+(a[N][2]>=2),B=+(a[N][3]>=2),V=+(a[N][0]>=1),H=+(a[N][1]>=1),ne=+(a[N][2]>=1),re=+(a[N][3]>=1),U=w-P+c,ie=T-F+c,ae=E-I+c,W=D-L+c,oe=w-te+2*c,se=T-R+2*c,ce=E-z+2*c,le=D-B+2*c,ue=w-V+3*c,de=T-H+3*c,fe=E-ne+3*c,pe=D-re+3*c,me=w-1+4*c,he=T-1+4*c,ge=E-1+4*c,_e=D-1+4*c,ve=h&255,ye=g&255,be=_&255,xe=v&255,Se=o[ve+o[ye+o[be+o[xe]]]]%32,Ce=o[ve+P+o[ye+F+o[be+I+o[xe+L]]]]%32,we=o[ve+te+o[ye+R+o[be+z+o[xe+B]]]]%32,Te=o[ve+V+o[ye+H+o[be+ne+o[xe+re]]]]%32,Ee=o[ve+1+o[ye+1+o[be+1+o[xe+1]]]]%32,De=.6-w*w-T*T-E*E-D*D;De<0?l=0:(De*=De,l=De*De*this._dot4(i[Se],w,T,E,D));let Oe=.6-U*U-ie*ie-ae*ae-W*W;Oe<0?u=0:(Oe*=Oe,u=Oe*Oe*this._dot4(i[Ce],U,ie,ae,W));let ke=.6-oe*oe-se*se-ce*ce-le*le;ke<0?d=0:(ke*=ke,d=ke*ke*this._dot4(i[we],oe,se,ce,le));let Ae=.6-ue*ue-de*de-fe*fe-pe*pe;Ae<0?f=0:(Ae*=Ae,f=Ae*Ae*this._dot4(i[Te],ue,de,fe,pe));let je=.6-me*me-he*he-ge*ge-_e*_e;return je<0?p=0:(je*=je,p=je*je*this._dot4(i[Ee],me,he,ge,_e)),27*(l+u+d+f+p)}_dot(e,t,n){return e[0]*t+e[1]*n}_dot3(e,t,n,r){return e[0]*t+e[1]*n+e[2]*r}_dot4(e,t,n,r,i){return e[0]*t+e[1]*n+e[2]*r+e[3]*i}},Ft=class e extends lt{constructor(e,t,r=512,i=512,a,o,s){super(),this.width=r,this.height=i,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=kt(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new U(this.width,this.height,{type:c,depthBuffer:!1}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new n({defines:Object.assign({},Et.defines),uniforms:k.clone(Et.uniforms),vertexShader:Et.vertexShader,fragmentShader:Et.fragmentShader,blending:0,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=+!!this.camera.isPerspectiveCamera,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new g,this.normalMaterial.blending=0,this.pdMaterial=new n({defines:Object.assign({},jt.defines),uniforms:k.clone(jt.uniforms),vertexShader:jt.vertexShader,fragmentShader:jt.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new n({defines:Object.assign({},Dt.defines),uniforms:k.clone(Dt.uniforms),vertexShader:Dt.vertexShader,fragmentShader:Dt.fragmentShader,blending:0}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new n({uniforms:k.clone(xt.uniforms),vertexShader:xt.vertexShader,fragmentShader:xt.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:208,blendDst:200,blendEquation:100,blendSrcAlpha:206,blendDstAlpha:200,blendEquationAlpha:100}),this.blendMaterial=new n({uniforms:k.clone(Ot.uniforms),vertexShader:Ot.vertexShader,fragmentShader:Ot.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:5,blendSrc:208,blendDst:200,blendEquation:100,blendSrcAlpha:206,blendDstAlpha:200,blendEquationAlpha:100}),this._fsQuad=new ft(null),this._originalClearColor=new M,this.setGBuffer(a?a.depthTexture:void 0,a?a.normalTexture:void 0),o!==void 0&&this.updateGtaoMaterial(o),s!==void 0&&this.updatePdMaterial(s)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,t){e===void 0?(this.depthTexture=new p,this.depthTexture.format=i,this.depthTexture.type=H,this.normalRenderTarget=new U(this.width,this.height,{minFilter:a,magFilter:a,type:c,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0):(this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1);let n=+!!this.normalTexture,r=this.depthTexture===this.normalTexture?`w`:`x`;this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=n,this.gtaoMaterial.defines.DEPTH_SWIZZLING=r,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=n,this.pdMaterial.defines.DEPTH_SWIZZLING=r,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&+!!e.screenSpaceRadius!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=+!!e.screenSpaceRadius,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=Mt(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(t,n,r){switch(this._renderGBuffer&&(this._overrideVisibility(),this._renderOverride(t,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(t,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(t,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case e.OUTPUT.Off:break;case e.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=r.texture,this.copyMaterial.blending=0,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:n);break;case e.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=0,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:n);break;case e.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=0,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:n);break;case e.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(t,this.depthRenderMaterial,this.renderToScreen?null:n);break;case e.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=0,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:n);break;case e.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=r.texture,this.copyMaterial.blending=0,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:n),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(t,this.blendMaterial,this.renderToScreen?null:n);break;default:console.warn(`THREE.GTAOPass: Unknown output type.`)}}_renderPass(e,t,n,r,i){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,r!=null&&(e.setClearColor(r),e.setClearAlpha(i||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_renderOverride(e,t,n,r,i){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,r=t.clearColor||r,i=t.clearAlpha||i,r!=null&&(e.setClearColor(r),e.setClearAlpha(i||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_overrideVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(e){(e.isPoints||e.isLine||e.isLine2)&&e.visible&&(e.visible=!1,t.push(e))})}_restoreVisibility(){let e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}_generateNoise(e=64){let n=new Pt,r=e*e*4,i=new Uint8Array(r);for(let t=0;t<e;t++)for(let r=0;r<e;r++){let a=t,o=r;i[(t*e+r)*4]=(n.noise(a,o)*.5+.5)*255,i[(t*e+r)*4+1]=(n.noise(a+e,o)*.5+.5)*255,i[(t*e+r)*4+2]=(n.noise(a,o+e)*.5+.5)*255,i[(t*e+r)*4+3]=(n.noise(a+e,o+e)*.5+.5)*255}let a=new ae(i,e,e,u,S);return a.wrapS=t,a.wrapT=t,a.needsUpdate=!0,a}};Ft.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};var It={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new M(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`},Lt=class e extends lt{constructor(e,t=1,r,i){super(),this.strength=t,this.radius=r,this.threshold=i,this.resolution=e===void 0?new R(256,256):new R(e.x,e.y),this.clearColor=new M(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let a=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new U(a,o,{type:c,depthBuffer:!1}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new U(a,o,{type:c,depthBuffer:!1});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new U(a,o,{type:c,depthBuffer:!1});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),a=Math.round(a/2),o=Math.round(o/2)}let s=It;this.highPassUniforms=k.clone(s.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new n({uniforms:this.highPassUniforms,vertexShader:s.vertexShader,fragmentShader:s.fragmentShader}),this.separableBlurMaterials=[];let l=[6,10,14,18,22];a=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new R(1/a,1/o),a=Math.round(a/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let u=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=u,this.bloomTintColors=[new N(1,1,1),new N(1,1,1),new N(1,1,1),new N(1,1,1),new N(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=k.clone(xt.uniforms),this.blendMaterial=new n({uniforms:this.copyUniforms,vertexShader:xt.vertexShader,fragmentShader:xt.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new M,this._oldClearAlpha=1,this._basic=new ie,this._fsQuad=new ft(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new R(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[],r=e/3;for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(r*r))/r);let i=[],a=[];for(let n=1;n<e;n+=2){let r=t[n],o=n+1<e?t[n+1]:0,s=r+o;i.push((n*r+(n+1)*o)/s),a.push(s)}return new n({defines:{KERNEL_PAIRS:i.length},uniforms:{colorTexture:{value:null},invSize:{value:new R(.5,.5)},direction:{value:new R(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:i},gaussianWeights:{value:a}},vertexShader:`

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

				}`})}_getCompositeMaterial(e){return new n({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}};Lt.BlurDirectionX=new R(1,0),Lt.BlurDirectionY=new R(0,1);var Rt={contrast:.94,saturation:.78,greenSat:.8,warm:-.05,lift:.07,gamma:.96,sharpen:0,vignette:0,chroma:0},zt={samples:28,length:.55,decay:.965,strength:0,threshold:.78},Bt={uniforms:{tDiffuse:{value:null},uSun:{value:new R(.5,.5)},uOn:{value:0}},vertexShader:`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); }`,fragmentShader:`
    uniform sampler2D tDiffuse; uniform vec2 uSun; uniform float uOn;
    varying vec2 vUv;
    void main() {
      vec3 c = texture2D( tDiffuse, vUv ).rgb;
      if ( uOn <= 0.0 ) { gl_FragColor = vec4( c, 1.0 ); return; }
      vec2 d = ( uSun - vUv ) * ${zt.length.toFixed(2)} / ${zt.samples.toFixed(1)};
      vec2 p = vUv; float w = 1.0; vec3 acc = vec3( 0.0 );
      for ( int i = 0; i < ${zt.samples}; i ++ ) {
        p += d;
        vec3 s = texture2D( tDiffuse, p ).rgb;
        float l = dot( s, vec3( 0.2126, 0.7152, 0.0722 ) );
        acc += s * smoothstep( ${zt.threshold.toFixed(2)}, 1.0, l ) * w;
        w *= ${zt.decay.toFixed(3)};
      }
      gl_FragColor = vec4( c + acc * ${zt.strength.toFixed(2)} * uOn / ${zt.samples.toFixed(1)}, 1.0 );
    }`},Vt={uniforms:{tDiffuse:{value:null},uTexel:{value:new R(1/1600,1/900)},uContrast:{value:Rt.contrast},uSat:{value:Rt.saturation},uGreenSat:{value:Rt.greenSat},uWarm:{value:Rt.warm},uLift:{value:Rt.lift},uGamma:{value:Rt.gamma},uSharpen:{value:Rt.sharpen},uVignette:{value:Rt.vignette},uChroma:{value:Rt.chroma}},vertexShader:`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); }`,fragmentShader:`
    uniform sampler2D tDiffuse; uniform vec2 uTexel;
    uniform float uContrast, uSat, uGreenSat, uWarm, uLift, uGamma, uSharpen, uVignette, uChroma;
    varying vec2 vUv;
    void main() {
      vec2 d = vUv - 0.5;
      // аберрация: красный и синий каналы — чуть в стороны от центра
      vec2 ca = d * uChroma * dot( d, d ) * 4.0;
      vec3 c = vec3( texture2D( tDiffuse, vUv + ca ).r, texture2D( tDiffuse, vUv ).g, texture2D( tDiffuse, vUv - ca ).b );
      // нерезкая маска
      vec3 blur = ( texture2D( tDiffuse, vUv + vec2( uTexel.x, 0.0 ) ).rgb + texture2D( tDiffuse, vUv - vec2( uTexel.x, 0.0 ) ).rgb
        + texture2D( tDiffuse, vUv + vec2( 0.0, uTexel.y ) ).rgb + texture2D( tDiffuse, vUv - vec2( 0.0, uTexel.y ) ).rgb ) * 0.25;
      c = c + ( c - blur ) * uSharpen;
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
    }`};function Ht(e,t,n,r,{samples:i=4,grading:a=!0}={}){let o=e.getSize(new R).multiplyScalar(e.getPixelRatio()).floor(),s=new U(o.x,o.y,{type:c,samples:i}),l=new wt(e,s);l.addPass(new Tt(t,n));let u=new Ft(t,n,o.x,o.y);u.updateGtaoMaterial({radius:2.5,distanceExponent:1.5,thickness:2,scale:1.2,samples:16,distanceFallOff:1}),u.updatePdMaterial({lumaPhi:10,depthPhi:2,normalPhi:3,radius:6,radiusExponent:1,rings:2,samples:16}),u.blendIntensity=.9;let d=u,f=d._overrideVisibility.bind(u);d._overrideVisibility=function(){f();let e=d._visibilityCache;t.traverse(t=>{t.userData.noAO&&t.visible&&(t.visible=!1,e.push(t))})},l.addPass(u);let p=new Lt(new R(o.x,o.y),.22,.6,2.5/r);l.addPass(p),l.addPass(new gt);let m=new pt(Bt);a&&zt.strength>0&&l.addPass(m);let h=new pt(Vt);h.uniforms.uTexel.value.set(1/o.x,1/o.y),a&&l.addPass(h);let g=()=>{l.setSize(innerWidth,innerHeight);let t=e.getSize(new R).multiplyScalar(e.getPixelRatio());h.uniforms.uTexel.value.set(1/t.x,1/t.y)};return addEventListener(`resize`,g),{composer:l,gtao:u,bloom:p,grade:h,rays:m,setSun(e,t,n){m.uniforms.uSun.value.set(e,t),m.uniforms.uOn.value=n},setNight(e){let t=h.uniforms,n=1-e;t.uLift.value=Rt.lift*n,t.uContrast.value=Rt.contrast*n+1*e,t.uSat.value=Rt.saturation*n+1*e,t.uGreenSat.value=Rt.greenSat*n+1*e,t.uWarm.value=Rt.warm*n,t.uGamma.value=Rt.gamma*n+1*e},render(){l.render()},dispose(){removeEventListener(`resize`,g),l.dispose(),s.dispose()}}}var Ut=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},Wt=e=>new M(e),Gt=Wt(6715199),Kt=Wt(2373164),qt=Wt(2900530),Jt=Wt(7039331),Yt=Wt(6447453),Xt=`
uniform float uCityLights;
varying vec3 vFarW;
vec2 farCover( vec2 dist, vec2 halfW, vec2 fw ) { return clamp( ( halfW + 0.5 * fw - dist ) / fw, 0.0, 1.0 ); }
`,Zt=`
	if ( uCityLights > 0.0 ) {
		float rC = length( vFarW.xz );
		vec2 fw = max( fwidth( vFarW.xz ), vec2( 0.05 ) );
		vec3 glow = vec3( 0.0 ), sodium = vec3( 1.0, 0.42, 0.1 );
		if ( rC < CITY_R ) {
			vec2 per = vec2( CITY_PX, CITY_PZ ), d = abs( fract( vFarW.xz / per + 0.5 ) - 0.5 ) * per;
			vec2 lane = mix( farCover( d, vec2( 2.5 ), fw ), 5.0 / per, smoothstep( per * 0.2, per * 0.6, fw ) );
			float street = lane.x + lane.y - lane.x * lane.y;
			float zone = mix( 1.4, 0.7, smoothstep( 250.0, CITY_R, rC ) );
			float inside = smoothstep( CITY_R, CITY_R - 120.0, rC ) * smoothstep( CITY_PLAZA, CITY_PLAZA + 30.0, rC );
			glow += vec3( 0.86, 0.9, 1.0 ) * street * 0.025 * zone * inside;
		}
		float ringFw = max( fw.x, fw.y );
		float ring = farCover( vec2( abs( rC - RING_R ) ), vec2( RING_W ), vec2( ringFw ) ).x;
		glow += sodium * ring * 0.03;
		totalEmissiveRadiance += uCityLights * glow;
	}
`;function Qt(e,{cityRadius:t,edge:n,seed:r=7,city:i,ringRadius:a=0}){let o=ge(r),s=e=>{let t=1-Math.abs(2*e-1);return 2*t*t-1},c=(e,t)=>s(o(e/3e3+41,t/3e3-17))+s(o(e/1100-5,t/1100+23))*.3,l=je((t,r)=>e(t,r)+Ut(n-800,n+2500,Math.max(Math.abs(t),Math.abs(r)))*(260+220*c(t,r))),{n:u,step:d,x0:f,z0:p,heights:m}=l,h=new Float32Array(u*u*3),g=new Float32Array(u*u*3);for(let e=0;e<u;e++)for(let t=0;t<u;t++){let n=(e*u+t)*3;h[n]=f+t*d,h[n+1]=m[e*u+t],h[n+2]=p+e*d}let _=new w;_.setAttribute(`position`,new V(h,3)),_.setIndex(new V(Ae(l,()=>!1).indices,1)),_.computeVertexNormals();let v=_.getAttribute(`normal`),y=new M;for(let e=0;e<u;e++)for(let n=0;n<u;n++){let r=e*u+n,i=h[3*r],a=h[3*r+2],s=m[r],c=v.getY(r),l=o(i/400+3,a/400-8);y.copy(Gt).lerp(Kt,Ut(30,120,s)).lerp(qt,l*.6*Ut(30,120,s)),y.lerp(Jt,Ut(.62,.42,c)),Math.hypot(i,a)<t+60&&y.copy(Yt),g[3*r]=y.r,g[3*r+1]=y.g,g[3*r+2]=y.b}_.setAttribute(`color`,new V(g,3));let x=new W({vertexColors:!0,roughness:1,metalness:0}),S={value:0};if(i){let e=e=>e.toFixed(2);x.onBeforeCompile=n=>{n.uniforms.uCityLights=S,n.defines={...n.defines,CITY_R:e(t-100),CITY_PLAZA:e(i.plaza),CITY_PX:e(i.blockW+i.streetW),CITY_PZ:e(i.blockH+i.streetW),CITY_SW:e(i.streetW),RING_R:e(a||-1e4),RING_W:e(2.5)},n.vertexShader=n.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vFarW;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
	vFarW = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;`),n.fragmentShader=n.fragmentShader.replace(`#include <common>`,`#include <common>`+Xt).replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>`+Zt)},x.customProgramCacheKey=()=>`farWorldLights`}let C=new b(_,x);C.name=`farWorld`,C.frustumCulled=!1,C.receiveShadow=!0,C.castShadow=!1;let T={triangles:_.index?_.index.count/3:0,masks:0};return{mesh:C,info:T,setLights(e,t){S.value=e*t},setDetailed(e){let t=Ae(l,e),n=_.getAttribute(`position`);for(let e=0;e<u*u;e++)n.setY(e,m[e]-(t.low[e]?8:0));n.needsUpdate=!0,_.setIndex(new V(t.indices,1)),T.triangles=t.indices.length/3,T.masks++},dispose(){C.removeFromParent(),_.dispose(),x.dispose()}}}var $t=[`grass`,`forest`,`rock`,`gravel`,`asphalt`,`moss`];async function en(e,t){let n=await(await fetch(e)).blob(),r=await createImageBitmap(n,{resizeWidth:t,resizeHeight:t,resizeQuality:`high`}),i=new OffscreenCanvas(t,t).getContext(`2d`);return i.drawImage(r,0,0),r.close(),i.getImageData(0,0,t,t).data}function tn(e,n,i,a){let o=new r(e,n,n,i);return o.format=u,o.type=S,o.wrapS=o.wrapT=t,o.minFilter=L,o.magFilter=C,o.generateMipmaps=!0,o.anisotropy=8,o.colorSpace=a?d:``,o.needsUpdate=!0,o}async function nn(e,t,n=1024){let r=t.length,i=new Uint8Array(n*n*4*r),a=new Uint8Array(n*n*4*r),o=[];return await Promise.all(t.map(async(t,r)=>{let[s,c,l]=await Promise.all([`color`,`normal`,`rough`].map(r=>en(`${e}textures/${t}_${r}.jpg`,n))),u=r*n*n*4;i.set(s,u);let f=0,p=0,m=0;for(let e=0;e<n*n*4;e+=4)a[u+e]=c[e],a[u+e+1]=c[e+1],a[u+e+2]=c[e+2],a[u+e+3]=l[e],f+=s[e],p+=s[e+1],m+=s[e+2];let h=1/(n*n*255);o[r]=new M().setRGB(f*h,p*h,m*h,d)})),{albedo:tn(i,n,r,!0),normalRough:tn(a,n,r,!1),mean:o}}var rn={dark:.36,edge0:.15,edge1:.45};function an(e,t={}){let n=t.dark??rn.dark,r=t.edge0??rn.edge0,i=t.edge1??rn.edge1;return e.fragmentShader=e.fragmentShader.replace(`#include <lights_physical_pars_fragment>`,`#include <lights_physical_pars_fragment>
#undef RE_Direct
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float nl = dot( geometryNormal, directLight.direction );
	float lit = mix( ${n.toFixed(3)}, 1.0, smoothstep( ${r.toFixed(3)}, ${i.toFixed(3)}, nl ) );
	reflectedLight.directDiffuse += directLight.color * lit * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct RE_Direct_Toon`),e}var on=[2.6,3.2,6,2.2,4,2.4],sn=[[.46,.54,.36],[.34,.3,.22],[.86,.86,.84],[.9,.88,.85],[1,1,1],[.3,.4,.26]],cn=`
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
`,ln=`
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
`,un=`
	normal = normalize( ( viewMatrix * vec4( normalize( vTNormal ), 0.0 ) ).xyz );   // Г11: без карт нормалей — рисованная плоская земля
`;function dn(e,t=null){let n=new W({roughness:1,metalness:0,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1});return n.name=`worldTerrain`,t&&(n.defines={CITY_PX:(t.blockW+t.streetW).toFixed(2),CITY_PZ:(t.blockH+t.streetW).toFixed(2),CITY_HS:(t.streetW/2).toFixed(2),CITY_PLAZA:t.plaza.toFixed(2),CITY_BR:t.blockRadius.toFixed(2)}),n.onBeforeCompile=t=>{t.uniforms.tAlbedo={value:e.albedo},t.uniforms.tNormalRough={value:e.normalRough},t.uniforms.tScale={value:on},t.uniforms.tTint={value:sn.map(e=>new N(e[0],e[1],e[2]))},t.vertexShader=`attribute vec4 splatA;
attribute vec4 splatB;
varying vec3 vTWorld;
varying vec3 vTNormal;
varying vec4 vSplatA;
varying vec4 vSplatB;
`+t.vertexShader.replace(`#include <fog_vertex>`,`#include <fog_vertex>
	vTWorld = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;
	vTNormal = normalize( mat3( modelMatrix ) * objectNormal );
	vSplatA = splatA; vSplatB = splatB;`),an(t,{dark:.62}),t.fragmentShader=cn+t.fragmentShader.replace(`#include <map_fragment>`,ln).replace(`#include <roughnessmap_fragment>`,`float roughnessFactor = roughness * tRgh;`).replace(`#include <normal_fragment_maps>`,un)},n.customProgramCacheKey=()=>`worldTerrainToon`,n}var G=2048,fn=e=>Math.round(e*G);async function pn(e){return createImageBitmap(await(await fetch(e)).blob())}async function mn(e){let[n,r,i]=await Promise.all([`asphalt`,`gravel`,`grass`].map(t=>Promise.all([`color`,`normal`,`rough`].map(n=>pn(`${e}textures/${t}_${n}.jpg`))))),a=[0,1,2].map(()=>new OffscreenCanvas(G,G)),[o,s,c]=a.map(e=>e.getContext(`2d`));o.fillStyle=`#8a8a86`,o.fillRect(0,0,G,G),s.fillStyle=`rgb(128,128,255)`,s.fillRect(0,0,G,G),c.fillStyle=`rgb(230,230,230)`,c.fillRect(0,0,G,G);let l=(e,t,n,r,i,a=1)=>{[o,s,c].forEach((o,s)=>{o.save(),o.beginPath(),o.rect(t,0,n-t,G),o.clip(),o.globalAlpha=a;for(let a=0;a<G;a+=i)for(let c=t;c<n;c+=r)o.drawImage(e[s],c,a,r,i);o.restore()})},u=(e,t,n,r,i=1)=>{o.save(),o.globalAlpha=i,o.fillStyle=n,o.fillRect(e,0,t-e,G),o.restore(),s.save(),s.globalAlpha=i,s.fillStyle=`rgb(128,128,255)`,s.fillRect(e,0,t-e,G),s.restore(),c.save(),c.globalAlpha=i,c.fillStyle=`rgb(${r},${r},${r})`,c.fillRect(e,0,t-e,G),c.restore()},f=12345,p=()=>(f=f*16807%2147483647)/2147483647,[m,h]=me.asphalt.map(fn);l(n,m,h,(h-m)/2,G/3),l(n,m,h,G/2,G/2,.45),o.fillStyle=`rgba(172,176,182,0.74)`,o.fillRect(m,0,h-m,G),s.fillStyle=`rgba(128,128,255,0.6)`,s.fillRect(m,0,h-m,G),c.fillStyle=`rgba(235,235,235,0.8)`,c.fillRect(m,0,h-m,G);for(let e=0;e<40;e++){let e=m+p()*(h-m),t=p()*G,n=120+p()*180,r=o.createRadialGradient(e,t,0,e,t,n),i=p()<.5,a=.05+p()*.05;r.addColorStop(0,i?`rgba(40,42,46,${a})`:`rgba(230,232,236,${a})`),r.addColorStop(1,`rgba(0,0,0,0)`),o.fillStyle=r,o.fillRect(e-n,t-n,2*n,2*n)}for(let e of[.17,.33,.67,.83]){let t=m+(h-m)*e,n=(h-m)*.07,r=o.createLinearGradient(t-n,0,t+n,0);r.addColorStop(0,`rgba(255,255,255,0)`),r.addColorStop(.5,`rgba(60,60,64,0.08)`),r.addColorStop(1,`rgba(255,255,255,0)`),o.fillStyle=r,o.fillRect(t-n,0,2*n,G)}for(let[e,t]of[[m,m+(h-m)*.14],[h,h-(h-m)*.14]]){let n=o.createLinearGradient(e,0,t,0);n.addColorStop(0,`rgba(118,108,92,0.18)`),n.addColorStop(1,`rgba(118,108,92,0)`),o.fillStyle=n,o.fillRect(Math.min(e,t),0,Math.abs(t-e),G);let r=c.createLinearGradient(e,0,t,0);r.addColorStop(0,`rgba(245,245,245,0.6)`),r.addColorStop(1,`rgba(245,245,245,0)`),c.fillStyle=r,c.fillRect(Math.min(e,t),0,Math.abs(t-e),G)}o.lineCap=`round`,c.lineCap=`round`;for(let e=0;e<0;e++){let e=m+30+p()*(h-m-60),t=p()*G,n=4+Math.floor(p()*7),r=2.5+p()*3;o.strokeStyle=`rgba(22,22,24,0.6)`,o.lineWidth=r,c.strokeStyle=`rgba(70,70,70,0.9)`,c.lineWidth=r+1,o.beginPath(),o.moveTo(e,t),c.beginPath(),c.moveTo(e,t);for(let r=0;r<n;r++)e+=(p()-.5)*70,t+=(p()-.3)*60,e=Math.max(m+20,Math.min(h-20,e)),o.lineTo(e,t),c.lineTo(e,t);o.stroke(),c.stroke()}for(let e=0;e<26;e++){let e=m+40+p()*(h-m-80),t=p()*G,n=30+p()*120,r=o.createRadialGradient(e,t,0,e,t,n),i=p()<.5?`rgba(20,20,22,0.18)`:`rgba(60,58,55,0.12)`;r.addColorStop(0,i),r.addColorStop(1,`rgba(0,0,0,0)`),o.fillStyle=r,o.fillRect(e-n,t-n,2*n,2*n)}let g=(e,t,n)=>{o.fillStyle=n,o.fillRect(e,0,t,G),s.fillStyle=`rgba(128,128,255,0.7)`,s.fillRect(e,0,t,G),c.fillStyle=`rgba(120,120,120,0.85)`,c.fillRect(e,0,t,G);for(let n=0;n<60;n++)o.fillStyle=`rgba(110,112,116,${.08+p()*.14})`,o.fillRect(e+p()*t,p()*G,2+p()*4,2+p()*8)};g(m+8+11,17,`#ececea`),g(h-8-28,17,`#ececea`),g((m+h)/2-9,17,`#e3c440`);let[_,v]=me.curb.map(fn);u(_,v,`#efefea`,150);for(let e=0;e<10;e++)o.fillStyle=e%2?`#e4e4df`:`#a8453a`,o.fillRect(_,e*G/10,v-_,G/10);let y=(e,t,n,r)=>{let[i,a]=me[e].map(fn);l(t,i,a,G/4,G/4),n&&(o.fillStyle=n,o.globalAlpha=r,o.fillRect(i,0,a-i,G),o.globalAlpha=1)};y(`gravel`,r,`#6e6b64`,.45),y(`dirt`,r,`#5a4a3a`,.4),y(`sand`,r,`#cfc3a6`,.4),y(`grass`,i);let[b,x]=me.concrete.map(fn);u(b,x,`#a3a29c`,215);for(let e=0;e<9e3;e++){let e=110+p()*90;o.fillStyle=`rgba(${e},${e},${e-4},0.25)`,o.fillRect(b+p()*(x-b),p()*G,2,2)}for(let e=0;e<40;e++)o.fillStyle=`rgba(60,62,55,0.10)`,o.fillRect(b+p()*(x-b),p()*G,3+p()*10,40+p()*200);let[S,C]=me.rail.map(fn),[w,T]=me.post.map(fn);u(S,C,`#ecece8`,90),u(w,T,`#9a9b9a`,160),u(S,C,`#f4f4f0`,150);for(let e=0;e<300;e++)o.fillStyle=`rgba(120,115,100,0.08)`,o.fillRect(S+p()*(C-S),p()*G,2,20+p()*120);let E=(e,n)=>{let r=new re(e);return r.colorSpace=n?d:``,r.wrapS=te,r.wrapT=t,r.anisotropy=8,r};for(let e of[n,r,i])for(let t of e)t.close();let D=new W({map:E(a[0],!0),normalMap:E(a[1],!1),roughnessMap:E(a[2],!1),roughness:1,metalness:0});D.name=`worldRoad`;let[O,k]=me.concrete;return D.onBeforeCompile=e=>{e.vertexShader=`varying vec3 vRWorld;
varying vec3 vRNormal;
`+e.vertexShader.replace(`#include <fog_vertex>`,`#include <fog_vertex>
	vRWorld = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;
	vRNormal = normalize( mat3( modelMatrix ) * objectNormal );`),e.fragmentShader=`varying vec3 vRWorld;
varying vec3 vRNormal;
`+e.fragmentShader.replace(`#include <map_fragment>`,`#include <map_fragment>
	{
		vec3 kn = normalize( vRNormal );
		if ( vMapUv.x > ${O.toFixed(4)} && vMapUv.x < ${k.toFixed(4)} && abs( kn.y ) < 0.35 ) {
			vec2 hz = normalize( vec2( - kn.z, kn.x ) + 1e-5 );
			float s = dot( vRWorld.xz, hz ), y = vRWorld.y;
			vec2 q = vec2( s + y, s - y ) * 0.70711 / 0.42, cell = floor( q ), f = fract( q );
			float g = min( min( f.x, 1.0 - f.x ), min( f.y, 1.0 - f.y ) ), grout = 1.0 - smoothstep( 0.025, 0.06, g );
			float shade = 0.82 + 0.26 * fract( sin( dot( cell, vec2( 12.9898, 78.233 ) ) ) * 43758.5453 );
			float stain = smoothstep( 0.0, 1.0, fract( sin( dot( floor( vec2( s / 3.0, 0.0 ) ), vec2( 7.13, 1.7 ) ) ) * 9182.31 ) ) * 0.12;
			vec3 block = vec3( 0.56, 0.555, 0.53 ) * ( shade - stain ) * ( 0.94 + 0.06 * smoothstep( 0.06, 0.25, g ) );
			diffuseColor.rgb = mix( block, vec3( 0.25, 0.25, 0.24 ), grout );
		}
	}`)},D.customProgramCacheKey=()=>`worldRoadKenchi`,D}function hn(e,{lights:t=0,lampGain:n=1}={}){let r=new v;r.name=`landmarks`;let i=new W({color:9082790,roughness:.4,metalness:.15}),a=new ie({color:new M(1,.08,.05).multiplyScalar(t>0?6*n:1),toneMapped:t>0}),s=[];for(let t of xe(e)){let e=[],n=[];for(let r=0;r<t.boxes.length;r+=6){let i=new I(t.boxes[r+3],t.boxes[r+4],t.boxes[r+5]).toNonIndexed();i.translate(t.boxes[r],t.boxes[r+1],t.boxes[r+2]);let a=i.getAttribute(`position`);for(let t=0;t<a.count;t++)n.push(e.length/3),e.push(a.getX(t),a.getY(t),a.getZ(t));i.dispose()}let c=new w;c.setAttribute(`position`,new o(e,3)),c.setIndex(n),c.computeVertexNormals(),c.computeBoundingSphere();let l=new b(c,i);l.castShadow=!1,l.receiveShadow=!1,r.add(l);let u=new b(new B(1.6,8,6),a);u.position.set(t.top[0],t.top[1]+1.6,t.top[2]),r.add(u),s.push({mesh:l,tile:fe(t.x,t.z)})}return{group:r,setDetailed(e){for(let t of s)t.mesh.visible=!e(t.tile)},dispose(){for(let e of r.children)e.geometry.dispose();i.dispose(),a.dispose()}}}var gn={sugi:[0,.5,.5,1],broad:[.5,.5,1,1],sasa:[0,0,.5,.5],sugi2:[.5,0,1,.5]},_n=[{id:`fir`,kind:`conifer`},{id:`pine_big`,kind:`conifer`},{id:`pine_large`,kind:`conifer`},{id:`noblefir`,kind:`conifer`},{id:`maple_large`,kind:`broad`},{id:`maple_medium`,kind:`broad`},{id:`rtree`,kind:`broad`}],K={step:9,nearBand:150,stepMixed:8,stepCedar:6,cedarJitter:.15,mixedJitter:.7,sugiH:[22,34],broadH:[12,20],sasaStep:2.6,sasaBand:[2,35],sasaFar:20,tint:{sugi:[[.28,.36],[.38,.46],[.34,.42]],sugi2:[[.32,.4],[.42,.5],[.36,.44]],broad:[[.32,.42],[.44,.54],[.3,.4]],sasa:[[.3,.38],[.42,.5],[.28,.36]]},minNy:.55},q=(e,t,n)=>{let r=e*374761393+t*668265263+n*2147483647|0;return r=Math.imul(r^r>>>13,1274126177),((r^r>>>16)>>>0)/4294967296};function vn(){let e=[],t=[],n=[],r=[],i=[],a=[];return{P:e,N:t,U:n,I:r,C:i,groups:a,quad(a,o,s,c,l,u,d=1){let f=e.length/3;for(let[r,f]of[[a,[l[0],l[1]]],[o,[l[2],l[1]]],[s,[l[2],l[3]]],[c,[l[0],l[3]]]]){e.push(r.x,r.y,r.z),n.push(f[0],f[1]);let a=typeof u==`function`?u(r):u;t.push(a.x,a.y,a.z);let o=typeof d==`function`?d(r):d;i.push(o,o,o)}r.push(f,f+1,f+2,f,f+2,f+3)},group(e,t){a.push([e,r.length-e,t])},geometry(){let s=new w;s.setAttribute(`position`,new o(e,3)),s.setAttribute(`normal`,new o(t,3)),s.setAttribute(`uv`,new o(n,2)),s.setAttribute(`color`,new o(i,3)),s.setIndex(r);for(let[e,t,n]of a)s.addGroup(e,t,n);return s.computeBoundingSphere(),s}}}var J=(e,t,n)=>new N(e,t,n);function yn(e,t,n,r,i,a,o,s=0,c=0,l=0,u=0){for(let d=0;d<a;d++){let f=d/a*Math.PI*2,p=(d+1)/a*Math.PI*2,m=(e,t,n,r)=>J(s+l*r+Math.cos(e)*t,n,c+u*r+Math.sin(e)*t),h=e=>J(Math.cos(e),.2,Math.sin(e)).normalize(),g=e.P.length/3;for(let[s,c,l,u,g,_]of[[f,r,t,0,d/a,0],[p,r,t,0,(d+1)/a,0],[p,i,n,1,(d+1)/a,o],[f,i,n,1,d/a,o]]){let t=m(s,c,l,u),n=h(s);e.P.push(t.x,t.y,t.z),e.N.push(n.x,n.y,n.z),e.U.push(g*2,_),e.C.push(1,1,1)}e.I.push(g,g+2,g+1,g,g+3,g+2)}}function bn(e){let t=vn(),n=e?gn.sugi2:gn.sugi;yn(t,0,.97,.016,.003,6,9),t.group(0,0);let r=t.I.length;for(let e=0;e<12;e++){let r=(e+.5)/12,i=.4+.6*r,a=.09*(1-r)**.75+.014;for(let o=0;o<4;o++){let s=o/4*Math.PI*2+e*2.39996+(q(e,o,41)-.5)*.8,c=Math.cos(s),l=Math.sin(s),u=.85+.3*q(e,o,43),d=a*.05,f=a*1.05*u,p=f-d,m=-p*.18,h=J(c*d,i-p*.2,l*d),g=J(c*f,i-p*.2+m,l*f),_=J(-l,0,c).multiplyScalar(p*.55),v=J(0,p*.55,0),y=_.clone().multiplyScalar(.707).addScaledVector(v,.707),b=_.clone().multiplyScalar(.707).addScaledVector(v,-.707),x=e=>J(e.x,(e.y-i)*.6+a*.6,e.z).normalize(),S=e=>(.35+.65*Math.min(1,Math.hypot(e.x,e.z)/Math.max(.001,f)))*(.75+.25*r),C=g.clone().sub(h).multiplyScalar(.12);t.quad(h.clone().sub(_),h.clone().add(_),g.clone().add(_),g.clone().sub(_),n,x,S),t.quad(h.clone().add(C).sub(y),h.clone().add(C).add(y),g.clone().add(y),g.clone().sub(y),n,x,S),t.quad(h.clone().sub(C).sub(b),h.clone().sub(C).add(b),g.clone().add(b),g.clone().sub(b),n,x,S)}}for(let e of[0,Math.PI/2]){let r=J(Math.cos(e),0,Math.sin(e)).multiplyScalar(.022);t.quad(J(-r.x,.92,-r.z),J(r.x,.92,r.z),J(r.x,1.03,r.z),J(-r.x,1.03,-r.z),n,J(0,1,0))}return t.group(r,1),t.geometry()}function xn(){let e=vn();yn(e,0,.55,.022,.012,6,4);for(let t=0;t<3;t++){let n=t*2.094+.4;yn(e,.45,.72,.011,.004,4,2,0,0,Math.cos(n)*.16,Math.sin(n)*.16)}e.group(0,0);let t=e.I.length;for(let[t,n,r,i,a]of[[0,.7,0,.26,.22],[.14,.6,.08,.2,.17],[-.12,.62,-.1,.19,.16]])for(let o=0;o<34;o++){let s=J(t,n,r),c=J(i,a,i),l=1-2*(o+.5)/34,u=Math.sqrt(1-l*l),d=o*2.39996+t*7,f=J(Math.cos(d)*u,l,Math.sin(d)*u),p=J(s.x+f.x*c.x*.85,s.y+f.y*c.y*.85,s.z+f.z*c.z*.85),m=new N().crossVectors(f,Math.abs(f.y)>.9?J(1,0,0):J(0,1,0)).normalize(),h=new N().crossVectors(f,m).normalize(),g=q(o,3,7)*Math.PI,_=.13,v=m.clone().multiplyScalar(Math.cos(g)).addScaledVector(h,Math.sin(g)).multiplyScalar(_),y=h.clone().multiplyScalar(Math.cos(g)).addScaledVector(m,-Math.sin(g)).multiplyScalar(_);e.quad(p.clone().sub(v).sub(y),p.clone().add(v).sub(y),p.clone().add(v).add(y),p.clone().sub(v).add(y),gn.broad,e=>e.clone().sub(s).normalize(),.4+.6*(p.y-.4)/.55)}return e.group(t,1),e.geometry()}function Sn(){let e=vn(),t=J(0,.55,0);for(let n=0;n<3;n++){let r=n/3*Math.PI,i=J(Math.cos(r)*1.25,0,Math.sin(r)*1.25);e.quad(J(-i.x,-.05,-i.z),J(i.x,-.05,i.z),J(i.x,.95,i.z),J(-i.x,.95,-i.z),gn.sasa,e=>J(e.x,(e.y-t.y)*.7+.5,e.z).normalize(),e=>.4+.6*Math.max(0,e.y)/.95)}return e.group(0,1),e.geometry()}function Cn(){let e=vn();for(let t=0;t<5;t++){let n=t/5*Math.PI*2+.3,r=Math.cos(n),i=Math.sin(n),a=J(-i,0,r).multiplyScalar(.42),o=J(r*.05,.05,i*.05),s=J(r*.95,.55,i*.95);e.quad(o.clone().sub(a),o.clone().add(a),s.clone().add(a),s.clone().sub(a),gn.sasa,e=>J(e.x,.8,e.z).normalize(),e=>.4+.6*Math.hypot(e.x,e.z))}return e.group(0,1),e.geometry()}function wn(e,t=!0){let n=vn();for(let r of t?[0]:[0,Math.PI/2]){let t=J(Math.cos(r)*e/2,0,Math.sin(r)*e/2);n.quad(J(-t.x,0,-t.z),J(t.x,0,t.z),J(t.x,1,t.z),J(-t.x,1,-t.z),[0,0,1,1],e=>J(e.x*1.5,.6,e.z*1.5).normalize())}return n.group(0,0),n.geometry()}var Tn={translucency:0,swayAmp:.007,swaySpeed:1.1,flutterAmp:.0025,flutterSpeed:3.5};function En(e,t={value:0},n=1,r={}){let i=r.wind!==!1,a=!!r.crownNormals,o=!!r.billboard,s=r.atlasN||0;return e.onBeforeCompile=e=>{e.uniforms.uTime=t,an(e),a&&(e.vertexShader=e.vertexShader.replace(`#include <beginnormal_vertex>`,`#include <beginnormal_vertex>
	objectNormal = normalize( position - vec3( 0.0, ${(n*.6).toFixed(3)}, 0.0 ) + vec3( 0.0, ${(n*.25).toFixed(3)}, 0.0 ) );`)),e.vertexShader=`uniform float uTime;
`+e.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
	{
		#ifdef USE_INSTANCING
		vec3 iw = ( modelMatrix * instanceMatrix * vec4( 0.0, 0.0, 0.0, 1.0 ) ).xyz;
		#else
		vec3 iw = vec3( 0.0 );
		#endif
		float ph = uTime * ${Tn.swaySpeed.toFixed(2)} + iw.x * 0.13 + iw.z * 0.09;
		float hgt = clamp( position.y * ${(1/n).toFixed(5)}, 0.0, 1.0 );
		vec2 sway = vec2( sin( ph ), sin( ph * 0.8 + 1.3 ) ) * ${Tn.swayAmp.toFixed(4)} * hgt * hgt;
		float fl = sin( uTime * ${Tn.flutterSpeed.toFixed(2)} + position.x * 37.0 + position.z * 29.0 + position.y * 11.0 ) * ${Tn.flutterAmp.toFixed(4)} * hgt;
		transformed.xz += ( sway + fl ) * ${(i?n:0).toFixed(3)};
	}`),o&&s&&(e.vertexShader=`attribute float aSlot;
`+e.vertexShader.replace(`#include <uv_vertex>`,`#include <uv_vertex>
	#ifdef USE_MAP
	vMapUv.x = ( aSlot + clamp( vMapUv.x, 0.004, 0.996 ) ) / ${s.toFixed(1)};
	#endif`)),o&&(e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
	{
		#ifdef USE_INSTANCING
		vec3 bo = ( modelMatrix * instanceMatrix * vec4( 0.0, 0.0, 0.0, 1.0 ) ).xyz;
		#else
		vec3 bo = ( modelMatrix * vec4( 0.0, 0.0, 0.0, 1.0 ) ).xyz;
		#endif
		vec2 bd = normalize( cameraPosition.xz - bo.xz + vec2( 1e-5, 0.0 ) ), br = vec2( bd.y, - bd.x );
		transformed = vec3( position.x * br.x, position.y, position.x * br.y );
		objectNormal = normalize( vec3( bd.x, 0.6, bd.y ) + vec3( br.x, 0.0, br.y ) * position.x * 1.5 );
	}`)),e.fragmentShader=e.fragmentShader.replace(`#include <normal_fragment_begin>`,`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
	vec3 normal = normalize( vNormal );
	vec3 nonPerturbedNormal = normal;`)},e.customProgramCacheKey=()=>`worldFoliageToon`+(n===1?``:`_`+n.toFixed(2))+(i?``:`_still`)+(a?`_crown`:``)+(o?`_bb`+s:``),e}async function Dn(e,n){let r=async e=>{let t=await createImageBitmap(await(await fetch(e)).blob()),n=new OffscreenCanvas(t.width,t.height),r=n.getContext(`2d`);return r.drawImage(t,0,0),t.close(),r.getImageData(0,0,n.width,n.height)},[i,a]=await Promise.all([r(`${n}textures/foliage_color.jpg`),r(`${n}textures/foliage_alpha.png`)]);for(let e=0;e<i.data.length;e+=4)i.data[e+3]=a.data[e];let o=new ae(i.data,i.width,i.height,u);o.flipY=!1,o.colorSpace=d,o.generateMipmaps=!0,o.minFilter=L,o.magFilter=C,o.anisotropy=8,o.needsUpdate=!0;let s=new T,c=(e,r)=>new Promise(i=>s.load(`${n}textures/cedar_bark_${e}.jpg`,e=>{e.colorSpace=r?d:``,e.wrapS=e.wrapT=t,e.anisotropy=4,i(e)})),[l,f,p]=await Promise.all([c(`color`,!0),c(`normal`,!1),c(`rough`,!1)]),m=new W({map:l,normalMap:f,roughnessMap:p,roughness:1,color:3813417,vertexColors:!0});m.name=`worldBark`,m.onBeforeCompile=e=>{an(e),e.vertexShader=e.vertexShader.replace(`#include <color_vertex>`,`#include <color_vertex>
#ifdef USE_INSTANCING_COLOR
	vColor.rgb = vec3( 1.0 );
#endif`)},m.customProgramCacheKey=()=>`worldBarkNoTint`;let h={value:0},g=En(new W({map:o,alphaTest:.3,alphaToCoverage:!0,side:2,roughness:1,metalness:0,vertexColors:!0}),h);g.name=`worldFoliage`;let _={sugi:bn(0),sugi2:bn(1),broad:xn(),sasa:Sn(),fern:Cn()};for(let e of Object.values(_)){let t=e.getAttribute(`uv`),n=e.groups.find(e=>e.materialIndex===1);if(!n)continue;let r=e.getIndex(),i=new Set;for(let e=n.start;e<n.start+n.count;e++){let n=r.getX(e);i.has(n)||(i.add(n),t.setY(n,1-t.getY(n)))}}let y=e=>new M((e[0][0]+e[0][1])/2,(e[1][0]+e[1][1])/2,(e[2][0]+e[2][1])/2),w=[];for(let[e,t,n,r]of[[`sugi`,_.sugi,.22,K.tint.sugi],[`broad`,_.broad,.7,K.tint.broad]])w.push({key:e,w:n,obj:new b(t,[new ie({map:l,color:3352863}),new ie({map:o,alphaTest:.45,side:2,color:y(r),vertexColors:!0})])});let E={};if(_n.length){let{GLTFLoader:e}=await Ee(async()=>{let{GLTFLoader:e}=await import(`./index-D087b-o8.js`).then(e=>e.H);return{GLTFLoader:e}},__vite__mapDeps([0,1,2,3,4]),import.meta.url),t=new e;await Promise.all(_n.map(async e=>{let r,i=null;try{r=await t.loadAsync(`${n}world/trees/${e.id}.glb`)}catch{console.warn(`лес: нет модели дерева`,e.id);return}try{i=await t.loadAsync(`${n}world/trees/${e.id}_lo.glb`)}catch{}let a=r.scene;a.updateMatrixWorld(!0);let o=new x().setFromObject(a),s=o.max.y-o.min.y,c=Math.max(o.max.x-o.min.x,o.max.z-o.min.z),l=[],u=[],d=new v,f=(t,n,r,i=!0)=>{let a=new Map;t.traverse(e=>{let t=e;if(!t.isMesh)return;let n=t.geometry.clone().applyMatrix4(t.matrixWorld),r=Array.isArray(t.material)?t.material[0]:t.material,i=r.alphaTest>0||r.side===2;for(let e of Object.keys(n.attributes))e!==`position`&&e!==`normal`&&e!==`uv`&&n.deleteAttribute(e);n.attributes.normal||n.computeVertexNormals(),n.attributes.uv||n.setAttribute(`uv`,new V(new Float32Array(n.attributes.position.count*2),2));let o=`${i?`L`:`B`}:${r.map?r.map.uuid:`-`}:${r.normalMap?r.normalMap.uuid:`-`}:${r.color?r.color.getHex():0}`,s=a.get(o);s?s.geos.push(n):a.set(o,{geos:[n],src:r,leafy:i})});for(let{geos:t,src:o,leafy:c}of a.values()){let a=t.some(e=>!!e.index)&&t.some(e=>!e.index)?t.map(e=>e.index?e.toNonIndexed():e):t,l=a.length>1&&we(a,!1)||a[0];if(a.length>1&&l!==a[0])for(let e of a)e.dispose();let u=new W({map:o.map||null,normalMap:c?null:o.normalMap||null,color:c?(o.color?o.color.clone():new M(1,1,1)).multiplyScalar(.62):new M(.6,.55,.5),roughness:.95,metalness:0,side:c?2:0,alphaTest:c?.3:0,alphaToCoverage:c});if(c?En(u,h,s,{wind:i,crownNormals:!0}):(u.onBeforeCompile=m.onBeforeCompile,u.customProgramCacheKey=()=>`worldBarkNoTint`),u.name=`worldTree_${e.id}_${c?`leaf`:`bark`}${i?``:`_lo`}`,n.push({geo:l,mat:u,leafy:c}),!r)continue;let f=new b(l,new ie({map:o.map||null,color:o.color?o.color.clone():new M(1,1,1),alphaTest:c?.4:0,side:c?2:0}));d.add(f)}};f(a,l,!0),i&&(i.scene.updateMatrixWorld(!0),f(i.scene,u,!1,!1)),d.scale.setScalar(1/s),E[e.id]={...e,parts:l,loParts:u.length?u:l,height:s,width:c},w.push({key:e.id,obj:d,w:c/s})}))}let D=new U(256*w.length,512,{type:S});D.texture.colorSpace=``;let O={},k={};{let t=e.getRenderTarget(),n=e.getClearColor(new M),r=e.getClearAlpha(),i=e.autoClear;e.setRenderTarget(D),e.setClearColor(2899748,0),e.clear(),e.autoClear=!1,w.forEach(({key:t,obj:n,w:r},i)=>{O[t]=i,k[t]=r;let a=new se;a.add(n);let o=new ee(-r/2,r/2,1.02,-.02,-2,2);o.position.set(0,0,1),o.lookAt(0,0,0),D.viewport.set(i*256,0,256,512),e.setRenderTarget(D),e.render(a,o),n.traverse(e=>{let t=e.material;t&&(Array.isArray(t)?t:[t]).forEach(e=>e.dispose())})}),D.viewport.set(0,0,256*w.length,512),e.autoClear=i,e.setRenderTarget(t),e.setClearColor(n,r)}let A=En(new W({map:D.texture,alphaTest:.5,side:0,roughness:.9}),h,1,{billboard:!0,atlasN:w.length});A.name=`worldTreeFar`;let j={rt:D,mat:A,slot:O,width:k,n:w.length,geo:wn(1)},N={conifer:Object.values(E).filter(e=>e.kind===`conifer`).map(e=>e.id),broad:Object.values(E).filter(e=>e.kind===`broad`).map(e=>e.id)},P=new B(1,10,7),F=new ie({colorWrite:!1,depthWrite:!1}),I=new oe;return I.name=`worldInstDepth`,F.name=`worldCrownShadow`,{geo:_,imp:j,bark:m,foliage:g,models:E,modelKinds:N,crownGeo:P,crownMat:F,instDepth:I,setTime(e){h.value=e},dispose(){for(let e of[...Object.values(_),j.geo])e.dispose();for(let e of[o,l,f,p])e.dispose();P.dispose(),F.dispose(),I.dispose(),m.dispose(),g.dispose(),j.rt.dispose(),j.mat.dispose();for(let e of Object.values(E))for(let t of[...e.parts,...e.loParts===e.parts?[]:e.loParts])t.geo.dispose(),t.mat.dispose()}}}function On(e,t,n=null){let r=e.terrain,[i,,a]=e.origin,o={sugi:[],sugi2:[],broad:[],sasa:[],fern:[]},s=(e,t,n)=>e[Math.floor(q(Math.floor(t*2),Math.floor(n*2),88)*e.length)%e.length],c=(e,t)=>{let n=Math.min(r.nx-1,Math.max(0,Math.round(e/r.cell))),i=Math.min(r.nz-1,Math.max(0,Math.round(t/r.cell)));return r.edge[i*r.nx+n]},l=(e,t)=>{let n=Math.min(r.nx-1,Math.max(0,Math.round(e/r.cell))),i=Math.min(r.nz-1,Math.max(0,Math.round(t/r.cell)));return r.normals[3*(i*r.nx+n)+1]},u=(e,c,l)=>{let u=e+i,d=c+a,f=t.cedar(u,d)>q(Math.floor(u*7),Math.floor(d*7),77),p=Te(r,e,c)-.2;if(f){let t=K.sugiH[0]+(K.sugiH[1]-K.sugiH[0])*q(Math.floor(u*3),Math.floor(d*3),9);if(n?.broad?.length&&q(Math.floor(u*5),Math.floor(d*5),91)<.25){let r=s(n.broad,u,d);(o[r]||=[]).push(e,p,c,t*.6,l)}else if(n?.conifer?.length){let r=s(n.conifer,u,d);(o[r]||=[]).push(e,p,c,t,l)}else(q(Math.floor(u),Math.floor(d),21)<.2?o.sugi2:o.sugi).push(e,p,c,t,l)}else{let t=K.broadH[0]+(K.broadH[1]-K.broadH[0])*q(Math.floor(u*3),Math.floor(d*3),11);if(n?.broad?.length){let r=s(n.broad,u,d);(o[r]||=[]).push(e,p,c,t,l)}else o.broad.push(e,p,c,t,l)}},d=e.trees;for(let e=0;e<d.length;e+=5)u(d[e],d[e+2],d[e+4]);let f=(e,n,r,o)=>{let s=Math.ceil(e*1.5),d=Math.floor((i-s)/e),f=Math.floor((a-s)/e),p=Math.ceil((500+2*s)/e)+1;for(let s=0;s<p;s++)for(let m=0;m<p;m++){let p=d+m,h=f+s,g=(p+.5-n/2+n*q(p,h,1))*e,_=(h+.5-n/2+n*q(h,p,2))*e;if(o){let e=Math.floor(g/420)*420+210,t=Math.floor(_/420)*420+210,n=q(Math.floor(g/420),Math.floor(_/420),57)*Math.PI,r=Math.cos(n),i=Math.sin(n),a=g-e,o=_-t;g=e+a*r-o*i,_=t+a*i+o*r}let v=g-i,y=_-a;if(v<0||y<0||v>=500||y>=500)continue;let b=c(v,y);b<15||l(v,y)<K.minNy||!r(b,g,_)||q(p,h,3)>t.density(g,_)||u(v,y,6.283*q(h,p,4))}},p=e=>e<K.nearBand,m=(e,n)=>t.cedar(e,n)>.5&&Math.hypot(e,n)>3600;f(K.step,.7,e=>!p(e),!1),f(K.stepMixed,K.mixedJitter,(e,t,n)=>p(e)&&!m(t,n),!1),f(K.stepCedar,K.cedarJitter,(e,t,n)=>p(e)&&m(t,n),!0);let h=K.sasaStep,g=Math.ceil(i/h),_=Math.ceil(a/h),v=Math.round(500/h);for(let e=0;e<v;e++)for(let n=0;n<v;n++){let s=g+n,u=_+e,d=(s+q(s,u,31))*h-i,f=(u+q(u,s,32))*h-a;if(d<0||f<0||d>=500||f>=500)continue;let p=c(d,f);p<K.sasaBand[0]||p>K.sasaBand[1]||l(d,f)<.6||p>K.sasaFar&&(s&1||u&1)||q(s,u,33)>t.density(d+i,f+a)*.95||(q(s,u,36)<.5?o.sasa:o.fern).push(d,Te(r,d,f)-.05,f,.55+.4*q(s,u,34),6.283*q(u,s,35))}return o}var kn={cells:4,nearIn:170,nearOut:230,perFrame:2,modelCells:16,modelIn:95,modelOut:120,fullIn:25,fullOut:34,move:2,viewNear:45,viewTurn:.985},An={near:1};function jn(t,n){let r=new v;r.name=`forest`;let i=kn.cells,a=500/i,o=(e,t)=>Math.min(i-1,Math.max(0,Math.floor(t/a)))*i+Math.min(i-1,Math.max(0,Math.floor(e/a))),c=kn.modelCells,l=500/c,u=(e,t)=>Math.min(c-1,Math.max(0,Math.floor(t/l)))*c+Math.min(c-1,Math.max(0,Math.floor(e/l))),d=new D,f=new ce,p=new N,m=new N,h=new N(0,1,0),g=new D().makeScale(0,0,0),_=(e,t,n=1)=>d.compose(p.set(e[5*t],e[5*t+1],e[5*t+2]),f.setFromAxisAngle(h,e[5*t+4]),m.setScalar(e[5*t+3]*n)),y=(e,t,n)=>{let r=e[5*t+3];return d.compose(p.set(e[5*t],e[5*t+1],e[5*t+2]),f.identity(),m.set(r*n,r,r*n))},b=new M,x=(e,t,n)=>{let r=K.tint[e],i=q(Math.floor(t[5*n]*3),Math.floor(t[5*n+2]*3),61),a=q(Math.floor(t[5*n+2]*3),Math.floor(t[5*n]*3),62);return b.setRGB(r[0][0]+(r[0][1]-r[0][0])*i,r[1][0]+(r[1][1]-r[1][0])*a,r[2][0]+(r[2][1]-r[2][0])*i)},S=(e,t,i=!0)=>(e.castShadow=t,e.receiveShadow=i,e.userData.noAO=!0,e.matrixAutoUpdate=!1,e.matrixWorldNeedsUpdate=!0,e.renderOrder=1,e.userData.instReady=!0,t&&(e.customDepthMaterial=n.instDepth),r.add(e),e),C=t.sugi.concat(t.sugi2),w=Object.keys(n.models||{}).filter(e=>t[e]?.length),T=[{key:`sugi`,arr:C,model:!1},{key:`broad`,arr:t.broad,model:!1},...w.map(e=>({key:e,arr:t[e],model:!0}))].filter(e=>e.arr.length),E=0;for(let e of T)E+=e.arr.length/5;let O=Array.from({length:i*i},()=>[]),k=Array.from({length:c*c},()=>[]),A=null;if(E){let e=n.imp.geo.clone(),t=new Float32Array(E),r=new z(e,n.imp.mat,E),a=0;for(let{key:e,arr:s,model:l}of T){let d=s.length/5,f=n.imp.width[e],p=n.imp.slot[e],m=l?u:o,h=Array.from({length:l?c*c:i*i},()=>[]);for(let e=0;e<d;e++)h[m(s[5*e],s[5*e+2])].push(e);h.forEach((e,n)=>{if(e.length){(l?k:O)[n].push({arr:s,w:f,start:a,ids:e});for(let n of e)r.setMatrixAt(a,y(s,n,f)),t[a++]=p}})}e.setAttribute(`aSlot`,new s(t,1)),r.computeBoundingSphere(),A=S(r,!1)}let ee=(e,t)=>{if(A&&e.length){for(let n of e){for(let e=0;e<n.ids.length;e++)A.setMatrixAt(n.start+e,t?g:y(n.arr,n.ids[e],n.w));A.instanceMatrix.addUpdateRange(n.start*16,n.ids.length*16)}A.instanceMatrix.needsUpdate=!0}},j=[[`sugi`,n.geo.sugi,[n.bark,n.foliage]],[`sugi2`,n.geo.sugi2,[n.bark,n.foliage]],[`broad`,n.geo.broad,[n.bark,n.foliage]],[`sasa`,n.geo.sasa,[n.foliage,n.foliage]],[`fern`,n.geo.fern,[n.foliage,n.foliage]]].filter(e=>t[e[0]]?.length),P=Array.from({length:i*i},()=>({sugi:[],sugi2:[],broad:[],sasa:[],fern:[]}));for(let[e]of j){let n=t[e];for(let t=0;t<n.length/5;t++)P[o(n[5*t],n[5*t+2])][e].push(t)}let F=Array.from({length:c*c},()=>({}));for(let e of w){let n=t[e];for(let t=0;t<n.length/5;t++){let r=F[u(n[5*t],n[5*t+2])];(r[e]||(r[e]=[])).push(t)}}let I=new Uint8Array(i*i),L=new Uint8Array(c*c),te=0,R=(t,n,r,i,a,o=!0)=>{let s=new z(t,n,r);return s.count=0,s.visible=!1,s.userData.leafy=a,s.instanceMatrix.setUsage(e),S(s,i,o)},B=(e,t)=>{e.count=t,e.visible=t>0,t&&(e.instanceMatrix.clearUpdateRanges(),e.instanceMatrix.addUpdateRange(0,t*16),e.instanceMatrix.needsUpdate=!0,e.instanceColor&&(e.instanceColor.clearUpdateRanges(),e.instanceColor.addUpdateRange(0,t*3),e.instanceColor.needsUpdate=!0),e.computeBoundingSphere())},V={},H=(e,n,r)=>{let a=t[e],o=V[e]||(V[e]=R(n,r,a.length/5,!1,!0)),s=e===`fern`?`sasa`:e,c=0;for(let t=0;t<i*i;t++)if(I[t])for(let n of P[t][e])o.setMatrixAt(c,_(a,n)),o.setColorAt(c,x(s,a,n)),c++;B(o,c)},ne={},re=e=>{let r=n.models[e],i=t[e],a=i.length/5,o=1/r.height,s=r.kind===`conifer`?`sugi`:`broad`,l=ne[e]||(ne[e]={lo:r.loParts.map(e=>R(e.geo,e.mat,a,!1,e.leafy)),full:r.parts.map(e=>R(e.geo,e.mat,a,!e.leafy,e.leafy))}),u=0,f=0;for(let t=0;t<c*c;t++){let n=L[t],r=n?F[t][e]:void 0;if(!r||n===1&&!xe(t))continue;let a=n===2?l.full:l.lo;for(let e of r){let t=n===2?f++:u++;_(i,e,o);for(let n of a)n.setMatrixAt(t,d),n.userData.leafy&&n.setColorAt(t,x(s,i,e))}}for(let e of l.lo)B(e,u);for(let e of l.full)B(e,f)},U=(e,t,n,r,i,a)=>{let o=n[5*r+3],s=o*i*(a?.38:.45),c=o*(a?.34:.26);e.setMatrixAt(t,d.compose(p.set(n[5*r],n[5*r+1]+o*(a?.58:.64),n[5*r+2]),f.identity(),m.set(s,c,s)))},ie=e=>{let t=R(n.crownGeo,n.crownMat,e,!0,!1,!1);return t.frustumCulled=!1,t},ae=null,W=null,oe=t.sugi.length/5,se=()=>{let e=C.length/5+t.broad.length/5;if(!e)return;let n=ae||=ie(e),r=0;for(let e=0;e<i*i;e++)if(I[e]){for(let t of P[e].sugi)U(n,r++,C,t,.3,!0);for(let t of P[e].sugi2)U(n,r++,C,t+oe,.3,!0);for(let i of P[e].broad)U(n,r++,t.broad,i,.6,!1)}B(n,r)},le=0;for(let e of w)le+=t[e].length/5;let ue=()=>{if(!le)return;let e=W||=ie(le),r=0;for(let i=0;i<c*c;i++)if(L[i])for(let a of w){let o=F[i][a];if(!o)continue;let s=n.models[a],c=s.width/s.height,l=s.kind===`conifer`;for(let n of o)U(e,r++,t[a],n,c,l)}B(e,r)},de=NaN,fe=NaN,pe=NaN,me=!1,he=0,ge=0,_e=0,ve=0,ye=-2,be=0,xe=e=>{if(ye<=-1)return!0;let t=(e%c+.5)*l-he,n=(Math.floor(e/c)+.5)*l-ge,r=Math.hypot(t,n);return r<kn.viewNear||t*_e+n*ve+l>=r*ye};return{group:r,get nearCells(){let e=0;for(let t of I)e+=t;return e},get modelCells(){let e=0;for(let t of L)t===2&&e++;return e},get loCells(){let e=0;for(let t of L)t===1&&e++;return e},update(e,t,n=kn.perFrame,r=null){let o=An.near;if(r&&be>0&&(r.fx*_e+r.fz*ve<kn.viewTurn||Math.abs(e-he)>l/2||Math.abs(t-ge)>l/2||ye!==r.cos)){he=e,ge=t,_e=r.fx,ve=r.fz,ye=r.cos;for(let e of Object.keys(ne))re(e)}if(!te){let n=Math.max(-e,0,e-500),r=Math.max(-t,0,t-500),i=kn.nearIn*o;if(n*n+r*r>i*i)return 0}if(!me&&o===pe&&Math.abs(e-de)<kn.move&&Math.abs(t-fe)<kn.move)return 0;let s=0,u=!1,d=new Set;for(let r=0;r<i*i&&s<n;r++){let n=r%i*a,c=Math.floor(r/i)*a,l=Math.max(n-e,0,e-n-a),d=Math.max(c-t,0,t-c-a),f=Math.hypot(l,d),p=I[r]===1,m=p?f<kn.nearOut*o:f<kn.nearIn*o;m!==p&&(I[r]=+!!m,te+=m?1:-1,ee(O[r],m),u=!0,s++)}if(w.length)for(let r=0;r<c*c&&s<n*3;r++){let n=r%c*l,i=Math.floor(r/c)*l,a=Math.max(n-e,0,e-n-l),u=Math.max(i-t,0,t-i-l),f=Math.hypot(a,u),p=L[r],m=p;if(p===2?f>=kn.fullOut*o&&(m=+(f<kn.modelOut*o)):p===1?f<kn.fullIn*o?m=2:f>=kn.modelOut*o&&(m=0):f<kn.fullIn*o?m=2:f<kn.modelIn*o&&(m=1),m!==p){p>0!=m>0&&(ee(k[r],m>0),te+=m>0?1:-1),be+=(m===1)-+(p===1),L[r]=m,s++;for(let e of w)F[r][e]&&d.add(e)}}if(u){for(let[e,t,n]of j)H(e,t,n);se()}if(d.size){r?(he=e,ge=t,_e=r.fx,ve=r.fz,ye=r.cos):ye=-2;for(let e of d)re(e);ue()}return me=s>=n,me||(de=e,fe=t,pe=o),s},dispose(){r.removeFromParent(),r.traverse(e=>{e.isInstancedMesh&&e.dispose()}),A&&A.geometry.dispose(),r.clear()}}}var Y={from:1,dense:6,mid:12,far:18,step:.5,stepMid:.9,stepFar:1.6,w:[.7,1.2],h:[.45,.85],blades:9,segments:3,sparseSegments:2,sparseBlades:3,sparseFrom:12,sparseTo:16,sparseIn:40,sparseOut:55,minNy:.6,wind:{amp:.09,speed:1.4,len:7},tint:[[.4,.5],[.5,.6],[.28,.38]]},Mn=(e,t,n)=>{let r=e*374761393+t*668265263+n*2147483647|0;return r=Math.imul(r^r>>>13,1274126177),((r^r>>>16)>>>0)/4294967296};function Nn(e=Y.blades,t=Y.segments){let n=[],r=[],i=[],a=[],s=[],c=977,l=()=>(c=c*16807%2147483647)/2147483647,u=t;for(let t=0;t<e;t++){let e=l()*Math.PI*2,t=.12+.45*l(),o=.55+.45*l(),c=.035+.035*l(),d=Math.cos(e),f=Math.sin(e),p=-f,m=d,h=.8+.3*l(),g=(l()-.5)*.5,_=(l()-.5)*.5,v=n.length/3,y=e=>[g+d*t*e*e*o,e*o*(1-.2*t*e),_+f*t*e*e*o];for(let e=0;e<=u;e++){let t=e/(u+1),[o,s,l]=y(t),d=c*(1-t*.7),f=(.3+.7*t)*h,[g,_,v]=y(t+.1),b=g-o,x=_-s,S=v-l,C=x*m-S*0,w=S*p-b*m,T=b*0-x*p,E=Math.hypot(C,w,T)||1,D=C/E*.6,O=w/E*.6+.8,k=T/E*.6,A=Math.hypot(D,O,k);for(let e of[-1,1])n.push(o+p*d*e,s,l+m*d*e),r.push(D/A,O/A,k/A),i.push(+(e>0),t),a.push(f,f,f)}let[b,x,S]=y(1),C=h;n.push(b,x,S),r.push(0,1,0),i.push(.5,1),a.push(C,C,C);for(let e=0;e<u;e++){let t=v+2*e;s.push(t,t+1,t+2,t+1,t+3,t+2)}let w=v+2*u;s.push(w,w+1,v+2*(u+1))}let d=new w;return d.setAttribute(`position`,new o(n,3)),d.setAttribute(`normal`,new o(r,3)),d.setAttribute(`uv`,new o(i,2)),d.setAttribute(`color`,new o(a,3)),d.setIndex(s),d.computeBoundingSphere(),d}function Pn(){let e=Nn(),t=Nn(Y.sparseBlades,Y.sparseSegments),n={value:0},r=new W({color:10139754,side:2,roughness:.9,metalness:0,vertexColors:!0});return r.name=`worldGrass`,r.onBeforeCompile=e=>{e.uniforms.uTime=n,an(e),e.vertexShader=`uniform float uTime;
`+e.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
	{
		vec3 iw = ( modelMatrix * instanceMatrix * vec4( 0.0, 0.0, 0.0, 1.0 ) ).xyz;
		float ph = ( iw.x + iw.z * 0.7 ) / ${Y.wind.len.toFixed(2)} + uTime * ${Y.wind.speed.toFixed(2)};
		float sway = ( sin( ph ) + 0.5 * sin( ph * 2.3 + 1.7 ) ) * ${Y.wind.amp.toFixed(3)} * uv.y * uv.y;
		transformed.x += sway; transformed.z += sway * 0.6;
	}`)},r.customProgramCacheKey=()=>`worldGrassToon`,{geo:e,geoSparse:t,mat:r,setTime(e){n.value=e},dispose(){e.dispose(),t.dispose(),r.dispose()}}}function Fn(e,t,n=null){let r=e.terrain,[i,,a]=e.origin,o=[],s=(e,t,n,i=1,a=0)=>{let o=Math.min(r.nx-1,Math.max(0,Math.round(t/r.cell)));return e[i*(Math.min(r.nz-1,Math.max(0,Math.round(n/r.cell)))*r.nx+o)+a]},c=r.cell,l=r.nx-1,u=r.nz-1,d=n?Math.max(0,Math.floor(n.x0/c)):0,f=n?Math.min(l,Math.ceil(n.x1/c)):l,p=n?Math.max(0,Math.floor(n.z0/c)):0,m=n?Math.min(u,Math.ceil(n.z1/c)):u,h=n?n.x0:0,g=n?n.z0:0,_=n?n.x1:500,v=n?n.z1:500;for(let[e,n,l]of[[Y.step,Y.from,Y.dense],[Y.stepMid,Y.dense,Y.mid],[Y.stepFar,Y.mid,Y.far]])for(let u=p;u<m;u++)for(let p=d;p<f;p++){let d=u*r.nx+p;if(Math.min(r.edge[d],r.edge[d+1],r.edge[d+r.nx],r.edge[d+r.nx+1])>=l+1)continue;let f=Math.max(h,p*c),m=Math.max(g,u*c),y=Math.min(_,f+c,(p+1)*c),b=Math.min(v,m+c,(u+1)*c),x=Math.floor((i+f)/e),S=Math.floor((i+y)/e),C=Math.floor((a+m)/e),w=Math.floor((a+b)/e);for(let c=C;c<=w;c++)for(let u=x;u<=S;u++){let d=(u+.1+.8*Mn(u,c,1))*e-i,p=(c+.1+.8*Mn(c,u,2))*e-a;if(d<f||p<m||d>=y||p>=b)continue;let h=s(r.edge,d,p);if(h<n||h>=l||h===255||s(r.normals,d,p,3,1)<Y.minNy)continue;let g=h<Y.mid?0:t.density(d+i,p+a)*t.clearing(h);if(g>.5||Mn(u,c,3)<g*.8||h>Y.mid&&Mn(u,c,4)<.3)continue;let _=Y.w[0]+(Y.w[1]-Y.w[0])*Mn(u,c,5),v=Y.h[0]+(Y.h[1]-Y.h[0])*Mn(c,u,6);o.push(d,Te(r,d,p)-.03,p,_,v,6.283*Mn(u,c,7))}}return o}function In(e,t){let n=new v;n.name=`grass`;let r=kn.modelCells,i=500/r,a=(e,t)=>Math.min(r-1,Math.max(0,Math.floor(t/i)))*r+Math.min(r-1,Math.max(0,Math.floor(e/i))),o=typeof e==`function`,s=Array(r*r).fill(null),c=t=>{if(s[t])return s[t];if(o){let n=t%r*i,a=Math.floor(t/r)*i;return s[t]=e({x0:n,z0:a,x1:n+i,z1:a+i})}return s[t]=[]};if(!o){let t=Array.from({length:r*r},()=>[]);for(let n=0;n<e.length/6;n++){let r=6*n;t[a(e[r],e[r+2])].push(e[r],e[r+1],e[r+2],e[r+3],e[r+4],e[r+5])}t.forEach((e,t)=>{s[t]=e})}let l=o?-1:e.length/6,u=new D,d=new ce,f=new N,p=new N,m=new N(0,1,0),h=new M,g=Array(r*r).fill(null),_=Array(r*r).fill(0),y=(e,r)=>{{let t=g[e];t&&(t.removeFromParent(),t.dispose()),g[e]=null}if(_[e]=r,!r)return;let i=c(e),a=i.length/6;if(!a)return;let o=new z(r===2?t.geo:t.geoSparse,t.mat,a);for(let e=0;e<a;e++){let t=6*e;o.setMatrixAt(e,u.compose(f.set(i[t],i[t+1],i[t+2]),d.setFromAxisAngle(m,i[t+5]),p.set(i[t+3],i[t+4],i[t+3])));let n=Y.tint,r=Mn(Math.floor(i[t]*5),Math.floor(i[t+2]*5),9);o.setColorAt(e,h.setRGB(n[0][0]+(n[0][1]-n[0][0])*r,n[1][0]+(n[1][1]-n[1][0])*r,n[2][0]+(n[2][1]-n[2][0])*r))}o.computeBoundingSphere(),o.castShadow=!1,o.receiveShadow=!0,o.userData.noAO=!0,o.matrixAutoUpdate=!1,o.matrixWorldNeedsUpdate=!0,o.renderOrder=2,o.userData.instReady=!0,n.add(o),g[e]=o},b=0,x=NaN,S=NaN,C=NaN,w=!1;return{group:n,get count(){if(l<0){l=0;for(let e=0;e<r*r;e++)l+=c(e).length/6}return l},update(e,t,n=kn.perFrame*3){let a=An.near;if(!b){let n=Math.max(-e,0,e-500),r=Math.max(-t,0,t-500),i=Math.max(Y.sparseFrom,Y.sparseIn*a);if(n*n+r*r>i*i)return 0}if(!w&&a===C&&Math.abs(e-x)<1&&Math.abs(t-S)<1)return 0;let o=0;for(let a=0;a<r*r&&o<n;a++){let n=a%r*i,s=Math.floor(a/r)*i,c=Math.max(n-e,0,e-n-i),l=Math.max(s-t,0,t-s-i),u=Math.hypot(c,l),d=An.near,f=_[a],p=f;f===2?u>=Y.sparseTo&&(p=+(u<Y.sparseOut*d)):f===1?u<Y.sparseFrom?p=2:u>=Y.sparseOut*d&&(p=0):u<Y.sparseFrom?p=2:u<Y.sparseIn*d&&(p=1),p!==f&&(f>0!=p>0&&(b+=p>0?1:-1),y(a,p),o++)}return w=o>=n,w||(x=e,S=t,C=a),o},dispose(){n.removeFromParent();for(let e of g)e?.dispose();n.clear()}}}var Ln=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},Rn=pe.indexOf(`asphalt`);function zn(e,t,n){let r=e.nx*e.nz,i=new Float32Array(4*r),a=new Float32Array(4*r);for(let r=0;r<e.nz;r++)for(let o=0;o<e.nx;o++){let s=r*e.nx+o;if(e.mask[s]===Rn){a[4*s]=1;continue}let c=t[0]+(e.xz?e.xz[2*s]:o*e.cell),l=t[2]+(e.xz?e.xz[2*s+1]:r*e.cell),u=e.normals[3*s+1],d=e.edge[s],f=Ln(.77,.62,u),p=(1-Ln(1,4,d))*(1-f),m=n.density(c,l)*n.clearing(d),h=m*(1-f)*(1-p),g=f*m*.5+h*.55;i[4*s]=Math.max(0,1-f-p-h),i[4*s+1]=h*.45,i[4*s+2]=f*(1-m*.5),i[4*s+3]=p,a[4*s+1]=g,e.cut&&(a[4*s+2]=Ln(2,8,e.cut[s])*Ln(.9,.75,u)*+(d>=1.5&&d<=45))}return{a:i,b:a}}var Bn=[new M(1,.42,.1),new M(.86,.9,1)],Vn=Bn,Hn={height:7.82,reach:1.75},Un={count:10,power:300,angle:1,penumbra:.5,range:36,ahead:30,far:320},Wn={radius:1.3,minPx:2.5,peak:.45,floor:.5,fade:Math.LN2/7e3},Gn=`
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
}`,Kn=`
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
}`;function qn(){let e=[],t=[],r=[],i=[],a=(n,i,a,o,s,c)=>{for(let[l,u,d]of[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]]){let f=e.length/3,p=l===0?u===0?[0,1,0]:[1,0,0]:[0,1,0],m=[u*p[2]-d*p[1],d*p[0]-l*p[2],l*p[1]-u*p[0]];for(let[r,f]of[[-1,-1],[1,-1],[1,1],[-1,1]])e.push(o+(l+p[0]*r+m[0]*f)*n/2,s+(u+p[1]*r+m[1]*f)*i/2,c+(d+p[2]*r+m[2]*f)*a/2),t.push(l,u,d);r.push(f,f+1,f+2,f,f+2,f+3)}};a(.14,9,.14,0,3.5,0),a(1.9,.08,.08,.95,7.9,0),i.push([0,r.length,0]);let s=r.length;a(.6,.14,.26,Hn.reach,Hn.height,0),i.push([s,r.length-s,1]);let c=new w;c.setAttribute(`position`,new o(e,3)),c.setAttribute(`normal`,new o(t,3)),c.setIndex(r);for(let[e,t,n]of i)c.addGroup(e,t,n);let l=new W({color:10132898,roughness:.5,metalness:.5}),u=Vn.map((e,t)=>{let n=new W({color:14606046,roughness:.3,emissive:e,emissiveIntensity:0});return n.name=`lampHead${t}`,n});l.name=`lampPost`;let d=Wn,f=new m(1,1),p={uMinPx:{value:d.minPx},uPxAngle:{value:.001},uRadius:{value:d.radius},uFade:{value:d.fade},uFloor:{value:d.floor}},h=Vn.map((e,t)=>new n({name:`lampGlow${t}`,vertexShader:Gn,fragmentShader:Kn,uniforms:{...p,uColor:{value:new M}},transparent:!0,depthWrite:!1,blending:2})),g=0,_=0;return{geo:c,mats:u.map(e=>[l,e]),glowGeo:f,glows:h,view:p,get level(){return g},get gain(){return _},get lit(){return g>.2},setLights(e,t){g=e,_=t;for(let n of u)n.emissiveIntensity=e*t*.7;h.forEach((n,r)=>n.uniforms.uColor.value.copy(Vn[r]).multiplyScalar(e*t*d.peak))},setView(e,t){p.uPxAngle.value=2*Math.tan(P.degToRad(e)/2)/Math.max(1,t)},dispose(){c.dispose(),l.dispose();for(let e of u)e.dispose();f.dispose();for(let e of h)e.dispose()}}}function Jn(e,t){let n=new v;n.name=`lamps`;let r=[],i=new D,a=new ce,o=new N,s=new N(1,1,1),c=new N(0,1,0);for(let l of[0,1]){let u=e.filter(e=>+!!e[4]===l);if(!u.length)continue;let d=new z(t.geo,t.mats[l],u.length),f=t.lit?new z(t.glowGeo,t.glows[l],u.length):null;u.forEach(([e,t,n,u],p)=>{d.setMatrixAt(p,i.compose(o.set(e,t,n),a.setFromAxisAngle(c,u),s));let m=e+Math.cos(u)*Hn.reach,h=n-Math.sin(u)*Hn.reach;r.push(m,t+Hn.height-.15,h,l),f?.setMatrixAt(p,i.makeTranslation(m,t+Hn.height-.12,h))}),d.computeBoundingSphere(),d.castShadow=!0,d.receiveShadow=!0,d.name=`lampPosts`,n.add(d),f&&(f.computeBoundingSphere(),f.boundingSphere&&(f.boundingSphere.radius+=4),f.name=`lampGlow`,f.renderOrder=2,f.userData.noAO=!0,n.add(f))}return n.userData.heads=r,n}function Yn(e,t,n=Un.count){let r=Un,i=n,a=new v;a.name=`lampLights`;let o=[];for(let e=0;e<i;e++){let e=new y(16777215,0,r.range,r.angle,r.penumbra,2);a.add(e,e.target),o.push(e)}e.add(a);let s=new Float64Array(i+1),c=new Float64Array(i+1),l=new Float64Array(i+1),u=new Float64Array(i+1),d=new Uint8Array(i+1),f=new N;return{update(e,n){e.getWorldDirection(f);let a=Math.hypot(f.x,f.z)||1,p=e.position.x+f.x/a*r.ahead,m=e.position.y,h=e.position.z+f.z/a*r.ahead;s.fill(1/0);for(let e of n)for(let t=0;t<e.length;t+=4){let n=e[t]-p,r=e[t+1]-m,a=e[t+2]-h,o=n*n+r*r+a*a;if(o>=s[i])continue;let f=i;for(;f>0&&s[f-1]>o;)s[f]=s[f-1],c[f]=c[f-1],l[f]=l[f-1],u[f]=u[f-1],d[f]=d[f-1],f--;s[f]=o,c[f]=e[t],l[f]=e[t+1],u[f]=e[t+2],d[f]=e[t+3]}let g=Math.min(Math.sqrt(s[i]),r.far),_=t.level*t.gain*r.power;for(let e=0;e<i;e++){let t=o[e],n=Math.sqrt(s[e]);if(!(n<g)){t.intensity=0;continue}t.intensity=_*(1-P.smoothstep(n,g*.6,g)),t.position.set(c[e],l[e],u[e]),t.target.position.set(c[e],l[e]-8,u[e]),t.color.copy(Vn[d[e]])}},get active(){return o.filter(e=>e.intensity>0).length},dispose(){a.removeFromParent();for(let e of o)e.dispose()}}}function Xn(e,t){let r=Math.floor(t.length/7),i={uNearTile:{value:new R(-1e4,-1e4)},uNearMask:{value:0}},a=new n({name:`farLights`,vertexShader:Gn,fragmentShader:Kn,defines:{FAR_MASK:``,TILE:500 .toFixed(1),HALF:he.toFixed(1)},uniforms:{...e.view,...i,uColor:{value:new M(1,1,1).multiplyScalar(e.level*e.gain*Wn.peak)}},transparent:!0,depthWrite:!1,blending:2}),o=new z(e.glowGeo,a,Math.max(1,r)),s=new D,c=new M;for(let e=0;e<r;e++){let n=e*7,r=t[n+6];o.setMatrixAt(e,s.makeScale(r,r,r).setPosition(t[n],t[n+1],t[n+2])),o.setColorAt(e,c.setRGB(t[n+3],t[n+4],t[n+5]))}return o.count=r,o.frustumCulled=!1,o.renderOrder=2,o.name=`farLights`,o.userData.noAO=!0,{mesh:o,count:r,setNear(e,t,n){i.uNearTile.value.set(e,t),i.uNearMask.value=n},dispose(){o.removeFromParent(),o.dispose(),a.dispose()}}}var X={poleStep:38,poleOut:2.2,poleH:11.5,armH:10.3,sag:.6,poleFoot:1200,delStep:12,delCurv:1/250,hairTurn:2.4,hairWin:50,speedStep:1500,speedSpokeStep:1e3,lampStep:60,lampOut:1.2},Z=()=>({p:[],n:[],u:[],i:[]});function Zn(e,t,n,r,i,a,o=0,s=0){for(let c=0;c<a;c++){let l=c/a*Math.PI*2,u=(c+1)/a*Math.PI*2,d=e.p.length/3;for(let[a,c,d]of[[l,t,r],[u,t,r],[u,n,i],[l,n,i]])e.p.push(o+Math.cos(a)*c,d,s+Math.sin(a)*c),e.n.push(Math.cos(a),0,Math.sin(a)),e.u.push(0,0);e.i.push(d,d+2,d+1,d,d+3,d+2)}}function Qn(e,t,n,r,i,a,o){for(let[s,c,l]of[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]]){let u=e.p.length/3,d=s===0?c===0?[0,1,0]:[1,0,0]:[0,1,0],f=[c*d[2]-l*d[1],l*d[0]-s*d[2],s*d[1]-c*d[0]];for(let[u,p]of[[-1,-1],[1,-1],[1,1],[-1,1]])e.p.push(i+(s+d[0]*u+f[0]*p)*t/2,a+(c+d[1]*u+f[1]*p)*n/2,o+(l+d[2]*u+f[2]*p)*r/2),e.n.push(s,c,l),e.u.push(0,0);e.i.push(u,u+1,u+2,u,u+2,u+3)}}function $n(e,t,n,r,i,a=!1){let o=e.p.length/3,s=a?-1:1;e.p.push(0,r,i),e.n.push(0,0,s),e.u.push(.5,.5);for(let a=0;a<=n;a++){let o=a/n*Math.PI*2;e.p.push(Math.cos(o)*t,r+Math.sin(o)*t,i),e.n.push(0,0,s),e.u.push(0,0)}for(let t=0;t<n;t++)a?e.i.push(o,o+t+2,o+t+1):e.i.push(o,o+t+1,o+t+2)}function er(e,t,n,r,i,a,o=!1){let s=e.p.length/3,c=o?-1:1;for(let[s,l,u,d]of[[-t/2,r,a[0],a[1]],[t/2,r,a[2],a[1]],[t/2,r+n,a[2],a[3]],[-t/2,r+n,a[0],a[3]]])e.p.push(o?-s:s,l,i),e.n.push(0,0,c),e.u.push(o?a[0]+a[2]-u:u,d);e.i.push(s,s+1,s+2,s,s+2,s+3)}function Q(e,t,n,r,i,a){let o=Math.cos(a),s=Math.sin(a),c=e.p.length/3;for(let a=0;a<t.p.length;a+=3){let c=t.p[a],l=t.p[a+2],u=t.n[a],d=t.n[a+2];e.p.push(n+c*o+l*s,r+t.p[a+1],i-c*s+l*o),e.n.push(u*o+d*s,t.n[a+1],-u*s+d*o)}for(let n=0;n<t.u.length;n++)e.u.push(t.u[n]);for(let n of t.i)e.i.push(c+n)}function tr(e,t,n,r,i){let a=n[0]-t[0],o=n[1]-t[1],s=n[2]-t[2],c=i[0]-t[0],l=i[1]-t[1],u=i[2]-t[2],d=o*u-s*l,f=s*c-a*u,p=a*l-o*c,m=Math.hypot(d,f,p)||1,h=e.p.length/3;d/=m,f/=m,p/=m;for(let a of[t,n,r,i])e.p.push(a[0],a[1],a[2]),e.n.push(d,f,p),e.u.push(0,0);e.i.push(h,h+1,h+2,h,h+2,h+3)}function nr(e,t,n,r,i,a){let o=[t.x,t.y+i,t.z],s=[t.x,t.y+a,t.z],c=[n.x,n.y+i,n.z],l=[n.x,n.y+a,n.z],u=[t.x+t.ox*r,t.y+i,t.z+t.oz*r],d=[t.x+t.ox*r,t.y+a,t.z+t.oz*r],f=[n.x+n.ox*r,n.y+i,n.z+n.oz*r],p=[n.x+n.ox*r,n.y+a,n.z+n.oz*r],m=c[0]-o[0],h=c[2]-o[2];m*t.oz-h*t.ox>0?(tr(e,o,c,l,s),tr(e,f,u,d,p),tr(e,s,l,p,d)):(tr(e,c,o,s,l),tr(e,u,f,p,d),tr(e,l,s,d,p))}var rr=`"Yu Gothic UI", "Meiryo", "Hiragino Sans", "Noto Sans JP", sans-serif`,$={rows:64,px:512,rowPx:116,w:5.3,h:1.2,y:2.6,at:62,out:1.6},ir={flat:60,bays:11,bayW:2.7,bayL:5.2,canopy:[14,7,4.6],canopyIn:10},ar={len:1.2,lift:.03},or={rail:Ce,post:{size:.5,top:1.4},shed:ye},sr=(e,t)=>Math.atan2(e,t),cr=8,lr=e=>{let t=e%cr,n=Math.floor(e/cr);return[t/cr+.004,1-(n+1)/cr+.004,(t+1)/cr-.004,1-n/cr-.004]};function ur(){let e=1024,t=new OffscreenCanvas(e,e),n=t.getContext(`2d`),r=e/cr;n.fillStyle=`#8c8f93`,n.fillRect(0,0,e,e);let i=e=>[e%cr*r,Math.floor(e/cr)*r];for(let[e,t]of[[0,`40`],[1,`50`]]){let[a,o]=i(e);n.fillStyle=`#ffffff`,n.beginPath(),n.arc(a+r/2,o+r/2,r*.47,0,Math.PI*2),n.fill(),n.strokeStyle=`#d0262c`,n.lineWidth=r*.11,n.beginPath(),n.arc(a+r/2,o+r/2,r*.4,0,Math.PI*2),n.stroke(),n.fillStyle=`#1a3f9a`,n.font=`bold ${r*.42}px Arial`,n.textAlign=`center`,n.textBaseline=`middle`,n.fillText(t,a+r/2,o+r*.53)}{let[e,t]=i(4),a=e+r/2,o=t+r/2,s=r*.47;n.fillStyle=`#111`,n.beginPath(),n.moveTo(a,o-s),n.lineTo(a+s,o),n.lineTo(a,o+s),n.lineTo(a-s,o),n.closePath(),n.fill(),n.fillStyle=`#f2c81d`,n.beginPath(),n.moveTo(a,o-s*.86),n.lineTo(a+s*.86,o),n.lineTo(a,o+s*.86),n.lineTo(a-s*.86,o),n.closePath(),n.fill(),n.fillStyle=`#111`,n.textAlign=`center`,n.textBaseline=`middle`,n.font=`bold ${r*.17}px ${rr}`,n.fillText(`落石`,a,o-r*.09),n.fillText(`注意`,a,o+r*.1)}for(let[e,t]of[[2,1],[3,-1]]){let[a,o]=i(e),s=a+r/2,c=o+r/2;n.save(),n.translate(s,c),n.rotate(Math.PI/4),n.fillStyle=`#111`,n.fillRect(-42.24,-42.24,r*.66,r*.66),n.fillStyle=`#f2c81d`,n.fillRect(-38.4,-38.4,r*.6,r*.6),n.restore(),n.strokeStyle=`#111`,n.lineWidth=r*.07,n.beginPath(),n.moveTo(s-t*r*.12,c+r*.22),n.lineTo(s-t*r*.12,c-r*.02),n.quadraticCurveTo(s-t*r*.12,c-r*.14,s+t*r*.04,c-r*.14),n.stroke(),n.fillStyle=`#111`,n.beginPath(),n.moveTo(s+t*r*.18,c-r*.14),n.lineTo(s+t*r*.04,c-r*.25),n.lineTo(s+t*r*.04,c-r*.03),n.fill()}for(let e=8;e<64;e++){let[t,a]=i(e);n.fillStyle=`#1d4f9c`,n.fillRect(t+4,a+r*.2,120,r*.6),n.strokeStyle=`#ffffff`,n.lineWidth=4,n.strokeRect(t+9,a+r*.2+5,110,r*.6-10),n.fillStyle=`#ffffff`,n.font=`bold ${r*.3}px Arial`,n.textAlign=`center`,n.textBaseline=`middle`,n.fillText(`No.${e-7}`,t+r/2,a+r/2)}let a=new re(t);return a.colorSpace=d,a.anisotropy=4,a}function dr(){let e=Z(),n=Z(),r=Z(),i=Z(),o=Z(),s=Z(),c=Z();Zn(e,.19,.12,-4,X.poleH,8),Qn(n,2.2,.1,.1,0,X.armH,0);for(let e of[-.9,0,.9])Zn(n,.04,.03,X.armH+.05,X.armH+.22,5,e,0);Zn(n,.26,.26,7.6,8.5,8,0,.3),Zn(r,.05,.05,-.5,3,6),$n(r,.47,16,3.25,.05,!0),$n(i,.42,16,3.25,.07),Qn(o,.08,1.2,.08,0,.4,0),$n(s,.05,10,.9,.045),Zn(c,.04,.04,-.5,2.2,6);let l=ur(),u=new OffscreenCanvas(64,16),f=u.getContext(`2d`);for(let e=0;e<2;e++)for(let t=0;t<8;t++)f.fillStyle=(t+e)%2?`#f2f2f2`:`#15171a`,f.fillRect(t*8,e*8,8,8);let p=new re(u);p.wrapS=t,p.magFilter=a,p.colorSpace=d;let m=new OffscreenCanvas($.px,$.rows*$.rowPx),h=m.getContext(`2d`);h.fillStyle=`#1d4f9c`,h.fillRect(0,0,m.width,m.height);let g=new re(m);g.colorSpace=d,g.anisotropy=4;let _=new Map,v={checker:new W({map:p,roughness:.85,side:2,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}),boards:new W({map:g,roughness:.5}),concrete:new W({color:9407878,roughness:.95}),metal:new W({color:9277590,roughness:.5,metalness:.6}),orange:new W({color:13134124,roughness:.7}),white:new W({color:16053488,roughness:.85}),mirror:new W({color:16777215,roughness:.04,metalness:1}),signs:new W({map:l,roughness:.45}),wire:new F({color:1776928})};return Object.entries(v).forEach(([e,t])=>{t.name=`roadside_${e}`}),{tpl:{pole:e,arm:n,mirror:r,mirrorFace:i,del:o,delRef:s,signPole:c},mats:v,boardUV(e,t=``){let n=e.cl,r=1/0,i=-1/0;if(!_.has(e.id))for(let e=0;e<n.n;e+=5){let t=n.pos[3*e+1];t<r&&(r=t),t>i&&(i=t)}return this.boardText(e.id,String(e.data.name),`${(n.length/1e3).toFixed(1).replace(`.`,`,`)} км · ${Math.round(i-r)} м`,t)},boardText(e,t,n=``,r=``){let i=_.get(e);if(i===void 0){i=_.size%$.rows,_.set(e,i);let a=i*$.rowPx,o=$.rowPx,s=$.px;h.fillStyle=`#1d4f9c`,h.fillRect(0,a,s,o),h.strokeStyle=`#ffffff`,h.lineWidth=5,h.strokeRect(6,a+6,s-12,o-12),h.fillStyle=`#ffffff`,h.textBaseline=`middle`,h.textAlign=`left`;let c=n?s*.56:s-48;r?(h.font=`bold ${Math.round(o*.44)}px ${rr}`,h.fillText(r,24,a+o*.36,c),h.font=`${Math.round(o*.24)}px "Segoe UI", Arial, sans-serif`,h.fillText(t,26,a+o*.76,c)):(h.font=`bold ${Math.round(o*.52)}px "Segoe UI", Arial, sans-serif`,h.fillText(t,24,a+o/2+2,c)),h.textAlign=`right`,h.font=`${Math.round(o*.3)}px "Segoe UI", Arial, sans-serif`,n&&h.fillText(n,s-22,a+o/2+2,s*.36),g.needsUpdate=!0}return[1-(i+1)/$.rows,1-i/$.rows]},dispose(){p.dispose(),g.dispose(),l.dispose();for(let e of Object.values(v))e.dispose()}}}function fr(e){let t=e.cl,n=t.n,r=Math.max(2,Math.round(X.hairWin/t.step/2)),i=[];for(let e=r;e<n-r;e++){let n=0;for(let i=e-r;i<=e+r;i++)n+=t.curvature[i]*t.step;if(Math.abs(n)<X.hairTurn)continue;let a=e;for(let n=e-r;n<=e+r;n++)Math.abs(t.curvature[n])>Math.abs(t.curvature[a])&&(a=n);i.length&&Math.abs(i[i.length-1].row-a)*t.step<80||i.push({row:a,right:n>0})}return i.sort((e,t)=>t.row-e.row),i.map((e,t)=>({...e,no:t+1}))}var pr=new WeakMap;function mr(e){let t=pr.get(e.graph);if(t)return t;let{graph:n,world:r}=e,i=n.ring.cl;return t=n.nodes.filter(e=>e.kind===`ringx`).map(e=>{let t=1/0,n=0;for(let r=0;r<i.n;r++){let a=Math.hypot(i.pos[3*r]-e.x,i.pos[3*r+2]-e.z);a<t&&(t=a,n=r)}let a=r.districts[e.district];return{id:a.id,name:a.name,nameJa:a.nameJa||``,s:i.s[n],outRight:i.right[3*n]*e.x+i.right[3*n+2]*e.z>0}}),pr.set(n,t),t}function hr(e,t,n,r=0,i=0){let{cl:a,data:o}=e,s=de(o,a,t),c=n>0?s.d.length-1:0,l=3*t,u=Math.hypot(a.right[l],a.right[l+2])||1,d=a.right[l]/u,f=a.right[l+2]/u,p=s.d[c]+(e.view&&e.view.sign===n?n*e.view.extra[t]:0);return{x:a.pos[l]+a.right[l]*p-r,y:a.pos[l+1]+a.right[l+1]*p+a.up[l+1]*s.h[c],z:a.pos[l+2]+a.right[l+2]*p-i,ox:n*d,oz:n*f,tx:a.tan[l],tz:a.tan[l+2]}}var gr=(e,t)=>{let n=Math.round(t/e.step);return e.closed?(n%e.n+e.n)%e.n:Math.min(e.n-1,Math.max(0,n))};function _r(e,t){let n=[],r=X.lampOut-Hn.reach,i=e=>n.push(e.x+e.ox*r,e.y+Hn.height-.15,e.z+e.oz*r);for(let n of e.graph.roads){let e=n.cl,r=e.length;if(n.data.kind===`ring`||n.data.kind===`spoke`){for(let t=0;t*X.lampStep<r;t++){let a=t*X.lampStep;!e.closed&&(a<30||a>r-30)||i(hr(n,gr(e,a),-1))}continue}let a=t.get(n.idx);a||t.set(n.idx,a=fr(n));for(let t of a)i(hr(n,gr(e,e.s[t.row]-8),t.right?-1:1))}return n}function vr(e,t,n,r,i=null){let{graph:a,index:s}=e,[c,,l]=t.origin,u=n.tpl,d=t=>e.world.courses.find(e=>e.id===t)?.nameJa||``,f={concrete:Z(),metal:Z(),orange:Z(),white:Z(),mirror:Z(),signs:Z(),checker:Z(),boards:Z()},p=[],m=[],h=(e,t)=>m.push([e.x+e.ox*X.lampOut,e.y,e.z+e.oz*X.lampOut,Math.atan2(e.oz,-e.ox),t]),g=(e,t,n)=>hr(e,t,n,c,l);for(let i of s.pieces.get(t.id)||[]){let o=a.roads[i.road],s=o.cl,m=o.data.kind,_=s.length,v=e=>e*s.step,y=(e,t,n,r)=>{let a=r[0],c=r[1],l=gr(s,s.closed?(e%_+_)%_:e);if(l<i.from||l>=i.to)return;let u=g(o,l,t),d=u.x+u.ox*$.out,p=u.z+u.oz*$.out,m=sr(u.tx*n,u.tz*n),h=Z(),v=Z(),y=Z();er(h,$.w,$.h,$.y,.06,[0,a,1,c]),er(v,$.w,$.h,$.y,.03,lr(7),!0);for(let e of[-$.w/2+.3,$.w/2-.3])Zn(y,.05,.05,-.5,$.y+$.h,6,e,0);Q(f.boards,h,d,u.y,p,m),Q(f.signs,v,d,u.y,p,m),Q(f.metal,y,d,u.y,p,m)},b=X.poleStep,x=m===`course`?-1:1;for(let e=Math.ceil(v(i.from)/b);e*b<v(i.to);e++){let t=e*b;if(m===`link`||m===`course`&&t<_-X.poleFoot||!s.closed&&(t<25||t>_-25))continue;let n=g(o,gr(s,t),x),r=n.x+n.ox*X.poleOut,i=n.z+n.oz*X.poleOut,a=sr(n.tx,n.tz);Q(f.concrete,u.pole,r,n.y,i,a),Q(f.metal,u.arm,r,n.y,i,a);let c=t+b;if(m===`course`?c<=_-25:s.closed||c<=_-25){let e=g(o,gr(s,c),x),t=e.x+e.ox*X.poleOut,l=e.z+e.oz*X.poleOut,u=sr(e.tx,e.tz),d=Math.cos(a),f=Math.sin(a),m=Math.cos(u),h=Math.sin(u);for(let a of[-.9,0,.9]){let o=r+a*d,s=i-a*f,c=n.y+X.armH+.22,u=t+a*m,g=l-a*h,_=e.y+X.armH+.22;for(let e=0;e<8;e++){let t=e/8,n=(e+1)/8,r=e=>X.sag*4*e*(1-e);p.push(o+(u-o)*t,c+(_-c)*t-r(t),s+(g-s)*t,o+(u-o)*n,c+(_-c)*n-r(n),s+(g-s)*n)}}}}if(m===`ring`||m===`spoke`)for(let e=Math.ceil(v(i.from)/X.lampStep);e*X.lampStep<v(i.to);e++){let t=e*X.lampStep;!s.closed&&(t<30||t>_-30)||h(g(o,gr(s,t),-x),0)}for(let e=Math.ceil(v(i.from)/X.delStep);e*X.delStep<v(i.to);e++){let t=e*X.delStep;if(!s.closed&&(t<30||t>_-30))continue;let n=gr(s,t),r=s.curvature[n];if(Math.abs(r)<X.delCurv)continue;let i=g(o,n,r>0?-1:1),a=i.x+i.ox*.45,c=i.z+i.oz*.45,l=sr(-i.ox,-i.oz);Q(f.white,u.del,a,i.y,c,l),Q(f.orange,u.delRef,a,i.y,c,l)}let S=m===`course`?X.speedStep:X.speedSpokeStep,C=lr(m===`course`?0:1);for(let e=Math.ceil((v(i.from)-200)/S);200+e*S<v(i.to);e++){let t=200+e*S;if(t<v(i.from)||!s.closed&&t>_-60)continue;let n=g(o,gr(s,t),1),r=n.x+n.ox*.9,a=n.z+n.oz*.9,c=sr(-n.tx,-n.tz);yr(f,u,r,n.y,a,c,C,.6)}if(m===`course`){let t=s.width[0]/2,r=(o.data.crossSection.crownPercent||0)/100;for(let e of[o.data.start.s,o.data.finish.s]){let n=gr(s,e);if(n<i.from||n>=i.to)continue;let a=(e,t,n)=>{let i=3*e,a=-Math.abs(t)*r+ar.lift;return[s.pos[i]+s.right[i]*t+s.up[i]*a-c,s.pos[i+1]+s.right[i+1]*t+s.up[i+1]*a,s.pos[i+2]+s.right[i+2]*t+s.up[i+2]*a-l,n]},o=Math.min(s.n-1,n+Math.max(1,Math.round(ar.len/s.step)));for(let[e,r]of[[-t,0],[0,t]]){let t=a(n,e,e/2),i=a(n,r,r/2),s=a(o,r,r/2),c=a(o,e,e/2),l=f.checker.p.length/3;[t,i,s,c].forEach((e,t)=>{f.checker.p.push(e[0],e[1],e[2]),f.checker.n.push(0,1,0),f.checker.u.push(e[3],t<2?0:1)}),f.checker.i.push(l,l+2,l+1,l,l+3,l+2)}}for(let[e,t,r]of[[$.at,1,-1],[_-$.at,-1,1]])y(e,t,r,n.boardUV(o,d(o.id)));if(o.view&&o.view.kind===`view`){let e=o.view,t=n.boardText(`viewpoint`,`Смотровая`,``,`展望台`);y(e.sFrom-80,e.sign,-1,t),y(e.sTo+80,e.sign,1,t)}let a=e.height.walls[o.idx];if(a)for(let[e,t]of[[1,-1],[2,1]]){let n=-1/0;for(let r=Math.max(1,i.from);r<i.to;r++){if(!(a.flags[r]&e)||a.flags[r-1]&e)continue;let c=r;for(;c+1<s.n&&a.flags[c+1]&e;)c++;if(!(c-r<30||s.s[r]-n<400)){n=s.s[r];for(let[e,n]of[[r-10,-1],[c+10,1]]){if(e<i.from||e>=i.to)continue;let r=g(o,e,t),a=r.x+r.ox*.9,s=r.z+r.oz*.9;yr(f,u,a,r.y,s,sr(r.tx*n,r.tz*n),lr(4),.7)}}}}}if(m===`spoke`){let t=e.world.districts[o.district];y(90,1,-1,n.boardText(`to_`+t.id,t.name,`${(_/1e3).toFixed(1).replace(`.`,`,`)} км`,t.nameJa||``)),o.view&&y(o.view.sFrom-70,o.view.sign,-1,n.boardText(`parking`,`Стоянка · заправка`,``,`P 駐車場`))}if(m===`ring`)for(let t of mr(e)){let e=t.nameJa||t.name;y(t.s-120,1,-1,n.boardText(`ring_a_`+t.id,t.name,``,t.outRight?e+` →`:`← `+e)),y(t.s+120,-1,1,n.boardText(`ring_b_`+t.id,t.name,``,t.outRight?`← `+e:e+` →`))}if(o.view&&o.view.kind===`parking`){let e=o.view,t=e.s-ir.flat/2,n=t=>{let n=gr(s,t);return n>=i.from&&n<i.to?g(o,n,e.sign):null};for(let e=0;e<=ir.bays;e++){let r=n(t+2+e*ir.bayW);if(!r)continue;let i=Z();Qn(i,.12,.02,ir.bayL,0,.02,0),Q(f.white,i,r.x-r.ox*(1.2+ir.bayL/2),r.y,r.z-r.oz*(1.2+ir.bayL/2),sr(r.ox,r.oz))}for(let e of[t+12,t+ir.flat-8]){let t=n(e);t&&h(t,1)}let r=n(t+ir.flat-ir.canopy[0]/2-3);if(r){let e=sr(r.ox,r.oz),t=r.x-r.ox*ir.canopyIn,n=r.z-r.oz*ir.canopyIn,i=Z(),a=Z(),o=Z(),s=Z(),c=Z(),[l,u,d]=ir.canopy;Qn(i,l,.35,u,0,d+.175,0),Qn(a,l+.1,.5,u+.1,0,d+.2,0);for(let e of[-l/2+1.2,l/2-1.2])Qn(o,.35,d,.35,e,d/2,0),Qn(s,.9,1.5,.5,e*.45,.85,0),Qn(o,2.6,.2,1.2,e*.45,.1,0);Qn(c,9,3.2,4,0,1.6,ir.canopyIn-2.6),Q(f.white,i,t,r.y,n,e),Q(f.orange,a,t,r.y,n,e),Q(f.metal,o,t,r.y,n,e),Q(f.orange,s,t,r.y,n,e),Q(f.concrete,c,t,r.y,n,e)}}if(o.view&&o.view.kind===`view`){let e=o.view;for(let t of[-5,5]){let n=gr(s,e.s+t);if(n<i.from||n>=i.to)continue;let r=g(o,n,e.sign),a=r.x-r.ox*1.3,c=r.z-r.oz*1.3,l=sr(r.ox,r.oz),u=Z();Qn(u,1.8,.07,.42,0,.45,0),Qn(u,1.8,.3,.06,0,.72,-.2);for(let e of[-.75,.75])Qn(u,.08,.45,.4,e,.22,0);Q(f.concrete,u,a,r.y,c,l)}}for(let e of m===`course`&&o.data.structures||[]){let n=gr(s,e.sFrom),r=gr(s,e.sTo),a=Math.max(i.from,n),u=Math.min(i.to,r);if(u<=a)continue;let d=(e,t,n)=>{let r=g(o,e,t);return{x:r.x+r.ox*n,y:r.y,z:r.z+r.oz*n,ox:r.ox,oz:r.oz}};if(e.type===`bridge`){let e=or.rail,p=or.post;for(let t=a;t<u;t+=2){let n=Math.min(u,t+2),r=d(t,-1,e.out),i=d(t,1,e.out),a=d(n,-1,e.out),o=d(n,1,e.out),s=t=>[t.x,t.y-e.skirt,t.z];tr(f.concrete,s(r),s(a),s(o),s(i))}for(let e of ve(o,i.from,i.to,(e,n)=>Te(t.terrain,e-c,n-l))){let t=Z(),n=e.yTop-e.yBase;Qn(t,De.size,n,De.size,0,-n/2,0),Q(f.concrete,t,e.x-c,e.yTop,e.z-l,e.yaw)}let m=Math.max(i.from,n-Math.round(e.ext/s.step)),h=Math.min(i.to,r+Math.round(e.ext/s.step));for(let t of[-1,1]){for(let n=m;n<h;n+=2)nr(f.concrete,d(n,t,e.out),d(Math.min(h,n+2),t,e.out),e.thick,-e.skirt,e.top);for(let a of[n-Math.round(e.ext/s.step),r+Math.round(e.ext/s.step)]){if(a<i.from||a>i.to)continue;let n=g(o,a,t),r=Z();Qn(r,p.size,p.top+e.skirt,p.size,0,(p.top-e.skirt)/2,0),Q(f.concrete,r,n.x+n.ox*(e.out+e.thick/2),n.y,n.z+n.oz*(e.out+e.thick/2),sr(n.tx,n.tz))}}}else{let e=or.shed;for(let t=a;t<u;t+=e.step){let n=Math.min(u,t+e.step),r=d(t,-1,e.out),i=d(n,-1,e.out),a=d(t,1,e.out),o=d(n,1,e.out);nr(f.concrete,r,i,e.thick,-.5,e.top+e.roof),nr(f.concrete,a,o,e.thick,-.5,e.top+e.roof);let s=(e,t)=>[e.x,e.y+t,e.z];tr(f.concrete,s(r,e.top),s(a,e.top),s(o,e.top),s(i,e.top)),tr(f.concrete,s(r,e.top+e.roof),s(i,e.top+e.roof),s(o,e.top+e.roof),s(a,e.top+e.roof))}for(let[t,a]of[[n,1],[r,-1]]){if(t<i.from||t>i.to)continue;let n=d(t,-1,e.out),r=d(t,1,e.out),o=(e,t,n=0)=>[e.x+e.ox*n,e.y+t,e.z+e.oz*n],s=(e,t,n,r)=>a>0?tr(f.concrete,e,t,n,r):tr(f.concrete,t,e,r,n);s(o(n,-.5,e.thick),o(n,-.5),o(n,e.top+e.roof),o(n,e.top+e.roof,e.thick)),s(o(r,-.5),o(r,-.5,e.thick),o(r,e.top+e.roof,e.thick),o(r,e.top+e.roof)),s(o(n,e.top),o(r,e.top),o(r,e.top+e.roof),o(n,e.top+e.roof))}}}if(m===`course`){let e=r.get(o.idx);e||r.set(o.idx,e=fr(o));for(let t of e){if(t.row<i.from||t.row>=i.to)continue;let e=t.right?-1:1,n=g(o,t.row,e),r=n.x+n.ox*1.6,a=n.z+n.oz*1.6,c=sr(-n.ox,-n.oz);Q(f.orange,u.mirror,r,n.y,a,c),Q(f.mirror,u.mirrorFace,r,n.y,a,c),h(g(o,gr(s,s.s[t.row]-8),e),0);let l=s.s[t.row]+35;if(l<_-30){let e=g(o,gr(s,l),-1),n=sr(e.tx,e.tz);yr(f,u,e.x+e.ox*.9,e.y,e.z+e.oz*.9,n,lr(t.right?3:2),.75),t.no<=56&&yr(f,u,e.x+e.ox*.9-e.tx*3,e.y,e.z+e.oz*.9-e.tz*3,n,lr(7+t.no),.75,1.35)}}}}let _=new v;_.name=`roadside`;let y=(e,t,n)=>{if(!e.i.length)return;let r=new w;r.setAttribute(`position`,new o(e.p,3)),r.setAttribute(`normal`,new o(e.n,3)),r.setAttribute(`uv`,new o(e.u,2)),r.setIndex(e.i),r.computeBoundingSphere();let i=new b(r,t);i.castShadow=n,i.receiveShadow=!0,_.add(i)};if(y(f.concrete,n.mats.concrete,!0),y(f.metal,n.mats.metal,!0),y(f.orange,n.mats.orange,!0),y(f.white,n.mats.white,!1),y(f.mirror,n.mats.mirror,!1),y(f.signs,n.mats.signs,!0),y(f.checker,n.mats.checker,!1),y(f.boards,n.mats.boards,!0),p.length){let e=new w;e.setAttribute(`position`,new o(p,3)),e.computeBoundingSphere(),_.add(new A(e,n.mats.wire))}return i&&m.length&&_.add(Jn(m,i)),_}function yr(e,t,n,r,i,a,o,s,c=0){Q(e.metal,t.signPole,n,r+c,i,a);let l=Z();er(l,s,s,2+c,.05,o),er(l,s,s,2+c,.03,lr(7),!0),Q(e.signs,l,n,r,i,a)}function br(e){e.removeFromParent(),e.traverse(e=>{let t=e;t.geometry&&t.geometry.dispose()}),e.clear()}var xr=`
varying vec3 vFacLocal;
varying vec3 vFacScale;
varying vec3 vFacNormal;
varying float vFacSeed;
`,Sr=`
varying vec3 vFacLocal;
varying vec3 vFacScale;
varying vec3 vFacNormal;
varying float vFacSeed;
float fHash( vec2 p ) { return fract( sin( dot( p, vec2( 127.1, 311.7 ) ) ) * 43758.5453 ); }
vec3 fPick( float s, vec3 a, vec3 b, vec3 c, vec3 d, vec3 e ) { return s < 0.2 ? a : s < 0.4 ? b : s < 0.6 ? c : s < 0.8 ? d : e; }
uniform float uNight;
// свет в окне id (вечером и ночью): горит с вероятностью p, тёплый или холодный (телевизор)
vec3 fLit( vec2 id, float seed, float p ) {
	if ( fHash( id + seed * 17.0 ) > p ) return vec3( 0.0 );
	vec3 c = fHash( id.yx + seed * 5.0 ) < 0.78 ? vec3( 1.0, 0.78, 0.52 ) : vec3( 0.72, 0.84, 1.0 );
	return c * ( 0.55 + 0.45 * fHash( id * 1.7 + seed ) ) * uNight;
}
`,Cr=`
	float fRough = 0.85, fMetal = 0.0;
	vec3 fEmit = vec3( 0.0 );
	{
		vec3 an = abs( vFacNormal );
		float seed = vFacSeed, floors = floor( ( vFacScale.y - 0.7 ) / 3.0 + 0.5 );
		float y = vFacLocal.y + vFacScale.y * 0.5;
		vec3 col;
		if ( an.y > 0.5 ) {                                                  // крыша: бетон, пятна кондиционеров
			col = vec3( 0.46, 0.46, 0.44 ) * ( 0.85 + 0.2 * fHash( floor( vFacLocal.xz / 2.0 ) + seed ) );
		} else {
			float u = an.x > 0.5 ? vFacLocal.z + vFacScale.z * 0.5 : vFacLocal.x + vFacScale.x * 0.5;
			float w = an.x > 0.5 ? vFacScale.z : vFacScale.x;
			float fl = floor( y / 3.0 ), fy = y - fl * 3.0;
			bool top = y > floors * 3.0;
			vec3 wall;
			vec3 glass = vec3( 0.10, 0.13, 0.16 );
			if ( floors <= 2.0 ) {                                         // дом: сайдинг светлых тонов, окна в рамах
				wall = fPick( seed, vec3( 0.86, 0.84, 0.78 ), vec3( 0.78, 0.74, 0.66 ), vec3( 0.70, 0.71, 0.70 ), vec3( 0.80, 0.70, 0.56 ), vec3( 0.62, 0.58, 0.52 ) );
				wall *= 0.94 + 0.06 * step( 0.5, fract( y / 0.22 ) );
				float n = max( 1.0, floor( w / 3.4 ) ), cell = w / n, cu = fract( u / cell ) * cell;
				bool win = cu > cell * 0.5 - 0.8 && cu < cell * 0.5 + 0.8 && fy > 0.9 && fy < 2.2 && !top;
				bool frame = cu > cell * 0.5 - 0.9 && cu < cell * 0.5 + 0.9 && fy > 0.82 && fy < 2.28 && !top;
				col = win ? glass : frame ? vec3( 0.72, 0.73, 0.74 ) : wall;
				if ( win ) { fRough = 0.08; fMetal = 0.5; fEmit = fLit( vec2( floor( u / cell ), fl ), seed, 0.45 ); }
			} else if ( floors <= 5.0 ) {                                  // магазин: витрина и вывеска, выше окна
				wall = fPick( seed, vec3( 0.80, 0.78, 0.74 ), vec3( 0.66, 0.64, 0.60 ), vec3( 0.74, 0.66, 0.58 ), vec3( 0.86, 0.85, 0.82 ), vec3( 0.55, 0.55, 0.57 ) );
				vec3 sign = fPick( fract( seed * 7.31 ), vec3( 0.75, 0.12, 0.10 ), vec3( 0.10, 0.30, 0.65 ), vec3( 0.12, 0.50, 0.25 ), vec3( 0.92, 0.55, 0.10 ), vec3( 0.92, 0.92, 0.90 ) );
				float n = max( 1.0, floor( w / 2.6 ) ), cell = w / n, cu = fract( u / cell ) * cell;
				if ( fl < 1.0 ) {
					bool shop = fy > 0.15 && fy < 2.3, band = fy >= 2.35 && fy < 2.95;
					col = band ? sign : shop ? ( cu < 0.12 || cu > cell - 0.12 ? vec3( 0.3 ) : glass * 1.4 ) : wall * 0.8;
					if ( shop ) { fRough = 0.06; fMetal = 0.4; fEmit = fLit( vec2( floor( u / cell ), 0.0 ), seed, 0.9 ) * 1.3; }
					if ( band ) fEmit = sign * uNight * 0.7;
				} else {
					bool win = cu > 0.35 && cu < cell - 0.35 && fy > 0.85 && fy < 2.3 && !top;
					col = win ? glass : wall;
					if ( win ) { fRough = 0.08; fMetal = 0.5; fEmit = fLit( vec2( floor( u / cell ), fl ), seed, 0.4 ); }
				}
			} else if ( floors <= 12.0 ) {                                 // многоэтажка: балкон с ограждением на каждом этаже
				wall = fPick( seed, vec3( 0.88, 0.87, 0.84 ), vec3( 0.80, 0.76, 0.68 ), vec3( 0.74, 0.74, 0.74 ), vec3( 0.84, 0.80, 0.74 ), vec3( 0.66, 0.62, 0.58 ) );
				float n = max( 1.0, floor( w / 3.6 ) ), cell = w / n, cu = fract( u / cell ) * cell;
				bool side = an.x > 0.5 ? vFacScale.z < vFacScale.x : vFacScale.x < vFacScale.z;   // торец — без балконов
				if ( top || fl < 1.0 || side ) {
					bool win = !top && cu > 0.9 && cu < cell - 0.9 && fy > 0.9 && fy < 2.1;
					col = win ? glass : wall * 0.95;
					if ( win ) { fRough = 0.08; fMetal = 0.5; fEmit = fLit( vec2( floor( u / cell ), fl ), seed, 0.45 ); }
				} else {
					bool rail = fy < 1.15, slab = fy < 0.18, divider = cu < 0.18;
					col = slab ? wall * 0.82 : divider ? wall * 0.9 : rail ? mix( wall, vec3( 0.75, 0.77, 0.78 ), 0.4 ) * ( 0.9 + 0.1 * step( 0.5, fract( u / 0.12 ) ) ) : glass * 1.2;
					if ( !rail && !divider ) { fRough = 0.1; fMetal = 0.45; fEmit = fLit( vec2( floor( u / cell ), fl ), seed, 0.45 ); }
				}
			} else {                                                         // контора в стекле: ленты перекрытий, стойки
				vec3 g = fPick( seed, vec3( 0.12, 0.18, 0.22 ), vec3( 0.16, 0.20, 0.18 ), vec3( 0.20, 0.22, 0.25 ), vec3( 0.10, 0.12, 0.16 ), vec3( 0.18, 0.16, 0.14 ) );
				float cu = fract( u / 1.5 ) * 1.5;
				bool spandrel = fy < 0.6, mullion = cu < 0.06;
				col = top ? vec3( 0.5 ) : spandrel ? g * 0.6 + 0.1 : mullion ? vec3( 0.55, 0.57, 0.6 ) : g;
				if ( !spandrel && !mullion && !top ) { fRough = 0.05; fMetal = 0.7; fEmit = fLit( vec2( floor( u / 4.5 ), fl ), seed, 0.6 ) * vec3( 0.85, 0.92, 1.0 ); }
			}
			// угол дома темнее (тень от выступа), низ — с налётом
			float edge = min( u, w - u );
			col *= 0.9 + 0.1 * smoothstep( 0.0, 0.4, edge );
			col *= 0.88 + 0.12 * smoothstep( 0.0, 1.5, y );
		}
		diffuseColor.rgb = col;
	}
`;function wr(e){let t=new W({roughness:1,metalness:0});return t.name=`cityFacade`,t.userData.night=e,t.onBeforeCompile=t=>{t.uniforms.uNight=e,t.vertexShader=xr+t.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
	{
		vec3 sc = vec3( length( instanceMatrix[ 0 ].xyz ), length( instanceMatrix[ 1 ].xyz ), length( instanceMatrix[ 2 ].xyz ) );
		vFacLocal = position * sc; vFacScale = sc; vFacNormal = normal;
		vFacSeed = fract( sin( dot( instanceMatrix[ 3 ].xz, vec2( 12.9898, 78.233 ) ) ) * 43758.5453 );
	}`),t.fragmentShader=Sr+t.fragmentShader.replace(`#include <map_fragment>`,`#include <map_fragment>
`+Cr).replace(`#include <roughnessmap_fragment>`,`float roughnessFactor = fRough;`).replace(`#include <metalnessmap_fragment>`,`float metalnessFactor = fMetal;`).replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
	totalEmissiveRadiance += fEmit;`)},t.customProgramCacheKey=()=>`cityFacade`,t}function Tr(){let e=new W({color:11118497,roughness:.9});return e.name=`cityPavement`,e.onBeforeCompile=e=>{e.vertexShader=`varying vec3 vPavW;
`+e.vertexShader.replace(`#include <fog_vertex>`,`#include <fog_vertex>
	vPavW = ( modelMatrix * instanceMatrix * vec4( transformed, 1.0 ) ).xyz;`),e.fragmentShader=`varying vec3 vPavW;
`+e.fragmentShader.replace(`#include <map_fragment>`,`#include <map_fragment>
	{
		vec2 g = vPavW.xz / 0.6, f = abs( fract( g ) - 0.5 );
		float seam = 1.0 - smoothstep( 0.44, 0.5, max( f.x, f.y ) ) * 0.35;
		float tone = 0.9 + 0.12 * fract( sin( dot( floor( g ), vec2( 12.9898, 78.233 ) ) ) * 43758.5453 );
		diffuseColor.rgb *= seam * tone;
	}`)},e.customProgramCacheKey=()=>`cityPavement`,e}function Er(){let e=[],t=[],n=[],r=(r,i,a,o,s)=>{let c=e.length/3;e.push(...r,...i,...a,...o);for(let e=0;e<4;e++)t.push(...s);n.push(c,c+1,c+2,c,c+2,c+3)},i=(r,i,a,o)=>{let s=e.length/3;e.push(...r,...i,...a);for(let e=0;e<3;e++)t.push(...o);n.push(s,s+1,s+2)},a=Math.SQRT1_2;r([-.5,0,.5],[.5,0,.5],[.5,1,0],[-.5,1,0],[0,a,a]),r([.5,0,-.5],[-.5,0,-.5],[-.5,1,0],[.5,1,0],[0,a,-a]),i([-.5,0,-.5],[-.5,0,.5],[-.5,1,0],[-1,0,0]),i([.5,0,.5],[.5,0,-.5],[.5,1,0],[1,0,0]);let s=new w;return s.setAttribute(`position`,new o(e,3)),s.setAttribute(`normal`,new o(t,3)),s.setIndex(n),s}function Dr(){let e=new W({color:16777215,roughness:.55,metalness:.15});e.name=`cityRoof`,e.onBeforeCompile=e=>{e.vertexShader=`varying float vRoofY;
`+e.vertexShader.replace(`#include <fog_vertex>`,`#include <fog_vertex>
	vRoofY = ( modelMatrix * instanceMatrix * vec4( transformed, 1.0 ) ).y;`),e.fragmentShader=`varying float vRoofY;
`+e.fragmentShader.replace(`#include <map_fragment>`,`#include <map_fragment>
	diffuseColor.rgb *= 0.82 + 0.18 * smoothstep( 0.0, 0.25, fract( vRoofY / 0.3 ) );`)},e.customProgramCacheKey=()=>`cityRoof`;let t=Pr(),n={value:0};return{setLights(e,r){n.value=e*r,t.mats[1].emissiveIntensity=.05+e*r*.9},facade:wr(n),pavement:Tr(),roofGeo:Er(),roofMat:e,poles:dr(),vendGeo:t.geo,vendMats:t.mats,dispose(){this.facade.dispose(),this.pavement.dispose(),this.roofGeo.dispose(),e.dispose(),this.poles.dispose(),t.geo.dispose(),t.tex.dispose();for(let e of t.mats)e.dispose()}}}var Or=(e,t,n)=>{let r=Math.hypot(t,n);return r>e.plaza+10&&r<e.blockRadius-5};function kr(e,t,n){let r=t.blockW+t.streetW,i=t.blockH+t.streetW,a=t.streetW/2,o=a+1.2,s=(e,t)=>Math.abs(e-Math.round(e/t)*t)<a+4;for(let a of[!0,!1]){let c=a?r:i,l=a?i:r,u=a?e.x0:e.z0,d=a?e.z0:e.x0;for(let e=Math.ceil((u-o)/c);e*c+o<u+500+o;e++){let r=e*c,i=r+(a?o:-o);if(!(i<u||i>=u+500))for(let e=Math.ceil(d/30);e*30<d+500;e++){let o=e*30,c=a?i:o,u=a?o:i;Or(t,c,u)&&!s(o,l)&&n(a,r,i,e,o,l,c,u)}}}}function Ar(e,t,n,r,i,a){if(r%2!=0)return null;let o=e.streetW/2,s=t?n-o-.8:i,c=t?a:n+o+.8;return Or(e,s,c)?[s,c,t?0:Math.PI/2]:null}function jr(e){let t=[],n=e.y+e.podium+Hn.height-.15,r=Math.ceil(e.blockRadius/500)*500;for(let i=-r;i<r;i+=500)for(let a=-r;a<r;a+=500)kr({x0:i,z0:a},e,(r,i,a,o,s,c,l,u)=>{let d=Ar(e,r,i,o,l,u);d&&t.push(d[0]+Math.cos(d[2])*Hn.reach,n,d[1]-Math.sin(d[2])*Hn.reach)});return t}function Mr(e){let t=e.city.blockRadius+100,{buildings:n}=Se(e,-t,-t,t,t),r=(e,t,n)=>{let r=Math.sin(e*12.9898+t*78.233+n*37.719)*43758.5453;return r-Math.floor(r)},i=[];for(let e=0;e<n.length;e+=6){let t=n[e],a=n[e+1],o=n[e+2],s=n[e+3],c=n[e+4],l=n[e+5],u=Math.max(1,Math.round((c-.7)/3)),d=a-c/2,f=Math.min(c>60?64:16,Math.max(1,Math.round(u*2*(s+l)/70)));for(let e=0;e<f;e++){let n=r(t,o,e),a=r(o,t,e+7);if(r(t+e,o-e,3)<.35)continue;let c=Math.floor(n*4),f=a-.5,p=Math.floor(r(t,o,e+13)*u),m=c<2?t+f*s:t+(c===2?-1:1)*(s/2+.3),h=c<2?o+(c===0?-1:1)*(l/2+.3):o+f*l,g=u>=13?[.75,.85,1]:n*7%1<.65?[1,.72,.42]:[.72,.84,1],_=.22+.25*r(o,t,e+21);i.push(m,d+p*3+1.6,h,g[0]*_,g[1]*_,g[2]*_)}}for(let t of xe(e))i.push(t.top[0],t.top[1]+2,t.top[2],1.6,.1,.06);return i}function Nr(e,t,n,r=null){let i=t.streetW/2,a=t.y+t.podium,s=n.poles.tpl,c={concrete:[],metal:[],vend:[]},l=[],u=[],d=i+1.2,f=(e,n)=>Or(t,e,n),p=(e,t)=>Math.abs(e-Math.round(e/t)*t)<i+4,m=(t,n,r,i,a,o)=>t.push([n,r-e.x0,i,a-e.z0,o]),h=(e,t)=>{let n=Math.sin(e*12.9898+t*78.233)*43758.5453;return n-Math.floor(n)};kr(e,t,(n,r,i,o,g,_,v,y)=>{let b=n?0:Math.PI/2;m(c.concrete,s.pole,v,a,y,b),m(c.metal,s.arm,v,a,y,b);let x=g+30,S=n?i:x,C=n?x:i;if(f(S,C)&&!p(x,_))for(let t of[-.9,0,.9]){let r=n?t:0,i=n?0:-t,o=a+10.52;for(let t=0;t<6;t++){let n=t/6,a=(t+1)/6,s=e=>2*e*(1-e);l.push(v+r+(S-v)*n-e.x0,o-s(n),y+i+(C-y)*n-e.z0,v+r+(S-v)*a-e.x0,o-s(a),y+i+(C-y)*a-e.z0)}}let w=Ar(t,n,r,o,v,y);if(w&&u.push([w[0]-e.x0,a,w[1]-e.z0,w[2],1]),h(v,y)<.18){let e=n?r-d+.6:v+8,t=n?y+8:r+d-.6;f(e,t)&&m(c.vend,null,e,a,t,n?Math.PI/2:Math.PI)}});let g=new v;g.name=`cityProps`;let _=e=>{let t=[],n=[],r=[];for(let[i,a,o,s,c]of e){let e=Math.cos(c),l=Math.sin(c),u=t.length/3;for(let r=0;r<i.p.length;r+=3)t.push(a+i.p[r]*e+i.p[r+2]*l,o+i.p[r+1],s-i.p[r]*l+i.p[r+2]*e),n.push(i.n[r]*e+i.n[r+2]*l,i.n[r+1],-i.n[r]*l+i.n[r+2]*e);for(let e of i.i)r.push(u+e)}let i=new w;return i.setAttribute(`position`,new o(t,3)),i.setAttribute(`normal`,new o(n,3)),i.setIndex(r),i.computeBoundingSphere(),i};if(c.concrete.length)for(let[e,t]of[[c.concrete,n.poles.mats.concrete],[c.metal,n.poles.mats.metal]]){let n=new b(_(e),t);n.castShadow=!0,n.receiveShadow=!0,g.add(n)}if(c.vend.length){let e=new z(n.vendGeo,n.vendMats,c.vend.length),t=new D,r=new ce,i=new N,a=new N(0,1,0),o=new N(1,1,1);c.vend.forEach(([,n,s,c,l],u)=>e.setMatrixAt(u,t.compose(i.set(n,s,c),r.setFromAxisAngle(a,l),o))),e.computeBoundingSphere(),e.castShadow=!0,e.receiveShadow=!0,e.name=`vending`,g.add(e)}if(l.length){let e=new w;e.setAttribute(`position`,new o(l,3)),e.computeBoundingSphere(),g.add(new A(e,n.poles.mats.wire))}return r&&u.length&&g.add(Jn(u,r)),g}function Pr(){let e=new I(.9,1.83,.75);e.translate(0,.915,0),e.groups.forEach((e,t)=>{e.materialIndex=+(t===4)});let t=new OffscreenCanvas(128,256),n=t.getContext(`2d`);n.fillStyle=`#f4f4f2`,n.fillRect(0,0,128,256),n.fillStyle=`#c8202a`,n.fillRect(0,0,128,34),n.fillStyle=`#20252b`,n.fillRect(8,40,112,120);let r=[`#d32f2f`,`#1e88e5`,`#43a047`,`#fbc02d`,`#8e24aa`,`#f57c00`,`#ffffff`,`#795548`];for(let e=0;e<4;e++)for(let t=0;t<6;t++)n.fillStyle=r[(e*3+t*5)%r.length],n.fillRect(12+t*18,46+e*28,12,20);n.fillStyle=`#2b2f36`,n.fillRect(16,196,96,26),n.fillStyle=`#8a9099`,n.fillRect(96,168,14,22);let i=new re(t);i.colorSpace=d;let a=new W({color:15263974,roughness:.4,metalness:.2}),o=new W({map:i,roughness:.25,emissive:16777215,emissiveMap:i,emissiveIntensity:.05});return a.name=`cityVendBody`,o.name=`cityVendFace`,{geo:e,mats:[a,o],tex:i}}var Fr=[4081234,4869976,5913648,7031354,3095110,9067068];function Ir(e,t){let n=[];for(let t=0;t<e.length;t+=6)e[t+4]<=be(2)+.01&&n.push(t);if(!n.length)return null;let r=new z(t.roofGeo,t.roofMat,n.length),i=new D,a=new ce,o=new N,s=new N,c=new N(0,1,0),l=new M;return n.forEach((t,n)=>{let u=e[t+3],d=e[t+4],f=e[t+5],p=u>=f,m=Math.min(u,f);i.compose(o.set(e[t],e[t+1]+d/2-.05,e[t+2]),a.setFromAxisAngle(c,p?0:Math.PI/2),s.set((p?u:f)+.9,m*.28,m+.9)),r.setMatrixAt(n,i),r.setColorAt(n,l.setHex(Fr[Math.floor(Math.abs(Math.sin(e[t]*12.9898+e[t+2]*78.233))*43758.5453)%Fr.length]))}),r.computeBoundingSphere(),r.castShadow=!0,r.receiveShadow=!0,r.name=`roofs`,r}var Lr={lamp:1,window:.55};function Rr(e,t,n){let r=[],i=(e,t,n)=>{for(let i=0;i<e.length;i+=3)r.push(e[i],e[i+1],e[i+2],t.r,t.g,t.b,n)};i(_r(e,n),Bn[0],Lr.lamp),i(jr(e.world.city),Bn[1],Lr.lamp);let a=Mr(e.world);for(let e=0;e<a.length;e+=6)r.push(a[e],a[e+1],a[e+2],a[e+3],a[e+4],a[e+5],Lr.window);return Xn(t,new Float32Array(r))}var zr={fogHalf:5500,fogFalloff:1/600,sunColor:16773340,moonColor:11122920,toneMapping:6},Br={ultra:{ao:!0,bloom:!0,msaa:4,shadow:{splits:[12,60,300],maxFar:2500,mapSize:2048},forest:1,lamps:10,water:!0,scale:1},high:{ao:!1,bloom:!0,msaa:4,shadow:{splits:[12,60,300],maxFar:2500,mapSize:2048},forest:1,lamps:10,water:!0,scale:1},balanced:{ao:!0,bloom:!0,msaa:0,shadow:{splits:[12,60,300],maxFar:2500,mapSize:2048},forest:1,lamps:10,water:!0,scale:1,perf:{aoScale:.5,aoSamples:8,bloomScale:.5,fxaa:!0,stagger:!0,dynamic:{min:.7,target:30}}},medium:{ao:!1,bloom:!1,msaa:0,shadow:{splits:[14],maxFar:350,mapSize:1024},forest:.6,lamps:6,water:!0,scale:.75},low:{ao:!1,bloom:!1,msaa:0,shadow:null,forest:.35,lamps:4,water:!1,scale:.6}},Vr=1,Hr=2,Ur=3,Wr=5,Gr=30;async function Kr({renderer:e,scene:t,camera:n,session:r,mats:i,oldSun:a,groups:o,base:s,off:c=new Set,tod:l=`day`,quality:u=`ultra`}){let d=Re[l]||Re.day,f=structuredClone(Br[u]||Br.ultra);for(let e of(new URLSearchParams(globalThis.location?.search||``).get(`gfxset`)||``).split(`,`)){let[t,n]=e.split(`:`),r=Number(n);t&&Number.isFinite(r)&&(t===`scale`||t===`forest`||t===`lamps`?f[t]=r:f.shadow&&t===`shadowfar`?f.shadow.maxFar=r:f.shadow&&t===`shadowmap`?f.shadow.mapSize=r:f.shadow&&t===`cascades`&&(f.shadow.splits=f.shadow.splits.slice(0,Math.max(1,r))))}An.near=f.forest,f.scale!==1&&e.setPixelRatio(e.getPixelRatio()*f.scale),c.has(`shadow`)||!f.shadow||d.sunToSky===0?e.shadowMap.enabled=!1:e.shadowMap.type=2,c.has(`bloom`)||(f.bloom=!1);let[p,m,g]=await Promise.all([nn(s,$t),mn(s),Dn(e,s)]),_=Ne(r.world,31,_e(r.graph)),v=dr(),y=new Map,b=qn();{let e={d:0,road:-1,s:0},t=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)};_.roadBelt=(n,i)=>(r.height.nearestRoad(n,i,Pe.beltTo+10,e),e.d===1/0?0:(1-t(Pe.beltFrom,Pe.beltTo,e.d))*t(0,6,e.d)),_.roadDist=(t,n)=>(r.height.nearestRoad(t,n,Pe.beltTo+10,e),e.d)}let x=c.has(`grass`)?null:Pn();i.ground.dispose(),i.ground=dn(p,r.world.city);let S=Dr();i.box.mat.dispose(),i.box.mat=S.facade,i.podium.mat.dispose(),i.podium.mat=S.pavement,i.road.map?.dispose(),i.road.dispose(),i.road=m,i.groundAttrs=(e,t)=>{let n=zn(e.terrain,e.origin,e.forestCache||_);t.setAttribute(`splatA`,new V(n.a,4)),t.setAttribute(`splatB`,new V(n.b,4))};let C=We(e,d,{sunColor:zr.sunColor,moonColor:zr.moonColor});Ge({sunDir:C.sunDir,sunColor:C.horizonSun,falloff:zr.fogFalloff});let w=new h(16777215,Math.LN2/zr.fogHalf);w.color.copy(C.horizonAway),t.fog=w,t.add(C.mesh),t.background=null,t.environment=C.envMap,a.visible=!1,t.traverse(e=>{e.isHemisphereLight&&(e.visible=!1)});let T=C.skyIrradiance,E=d.sunToSky*T/Math.max(.05,C.sunDir.y),D=C.lightColor;e.toneMapping=zr.toneMapping,e.toneMappingExposure=d.rel?d.rel*Math.PI/(ze*(1+Re.day.sunToSky)):Math.PI/(T*(1+d.sunToSky));let O=st({scene:t,camera:n,sunDir:C.sunDir,intensity:E,color:D,...f.shadow||{splits:[20],maxFar:60,mapSize:256}}),k=3/e.toneMappingExposure;S.setLights(d.lights,k),b.setLights(d.lights,k);let A=d.lights>.2?Yn(t,b,f.lamps):null,ee=new Map,j=A?Rr(r,b,y):null;j&&t.add(j.mesh),n.near=.5,n.far=22e3,n.updateProjectionMatrix();let M=Qt((e,t)=>r.height.naturalAt(e,t),{cityRadius:r.world.city.radius,edge:he,city:r.world.city,ringRadius:r.world.ring.radius});M.setLights(d.lights,k),t.add(M.mesh);let P=hn(r.world,{lights:d.lights,lampGain:k});t.add(P.group);let F=r.height.places,I=F.lakes.length&&!c.has(`water`)&&f.water?Ie(F,{sunDir:C.sunDir,sunColor:D.clone().multiplyScalar(E*.04),skyE:T}):null;I&&t.add(I.group);let L=Ht(e,t,n,e.toneMappingExposure,{samples:c.has(`msaa`)?0:f.msaa,grading:!c.has(`grade`)});(c.has(`ao`)||!f.ao)&&(L.gtao.enabled=!1),(c.has(`bloom`)||!f.bloom)&&(L.bloom.enabled=!1),L.setNight(d.lights);let te=bt({perf:c.has(`perf`)?void 0:f.perf,renderer:e,post:L,shadows:O,camera:n,splits:(f.shadow||{splits:[20]}).splits,maxFar:(f.shadow||{maxFar:60}).maxFar});!I&&F.lakes.length&&!c.has(`water`)&&t.add(Fe(F).group),c.has(`far`)&&(M.mesh.visible=!1);let z=new Map,B=new Map,H=new Map,ne=new Map,re=!0,U=!0,ie=0,ae=new Map,W=new Map,se=e=>{ae.delete(e);let t=W.get(e);t&&(ke(t),W.delete(e))},ce=e=>{ae.has(e.id)||ae.set(e.id,le(e))};function*le(e){let n=performance.now(),a=0,s=n,l=0,u=()=>{let e=performance.now()-s;a+=e,Ce.stageMs[l]=Math.max(Ce.stageMs[l]||0,e),l++},d=Me(_,e);e.forestCache=d;let f=Oe(e,i,{trees:!1,deferAttrs:!0});W.set(e.id,f),f.traverse(e=>{e.isMesh&&(e.castShadow=!0,e.receiveShadow=!0)}),u(),yield,s=performance.now();for(let e of f.userData.groundAttrs||[])e();f.userData.groundAttrs=null,W.delete(e.id);for(let e of[`road`,`verge`]){let t=f.getObjectByName(e);t&&(t.castShadow=!1)}if(t.add(f),z.set(e.id,f),o.add(f),re=!0,U=!0,ue(f),u(),yield,s=performance.now(),!c.has(`forest`)){let t=On(e,d,g.modelKinds);u(),yield,s=performance.now();let n=jn(t,g);f.add(n.group),B.set(e.id,n),U=!0,ue(f),u(),yield,s=performance.now()}if(x){let t=In(t=>Fn(e,d,t),x);f.add(t.group),H.set(e.id,t),u(),yield,s=performance.now()}if(!c.has(`roadside`)){let t=vr(r,e,v,y,b);f.add(t),ne.set(e.id,t),u(),yield,s=performance.now()}let p=e.buildings.length?Ir(e.buildings,S):null;if(p&&f.add(p),e.podiums.length){let t=Nr(e.box,r.world.city,S,b);f.add(t),ne.set(-1-e.id,t)}if(U=!0,ue(f),u(),Ce.showMs=a,Ce.showMsMax=Math.max(Ce.showMsMax,a),Ce.shows++,A){f.updateMatrixWorld(!0);let t=[],n=new N;f.traverse(e=>{let r=e.userData.heads;if(r)for(let i=0;i<r.length;i+=4)n.set(r[i],r[i+1],r[i+2]).applyMatrix4(e.matrixWorld),t.push(n.x,n.y,n.z,r[i+3])}),t.length&&ee.set(e.id,new Float32Array(t))}}let ue=e=>e.traverse(e=>{e.matrixAutoUpdate&&(e.updateMatrix(),e.matrixAutoUpdate=!1,e.matrixWorldNeedsUpdate=!0);let t=e;if(!t.isInstancedMesh||t.userData.instReady)return;t.userData.instReady=!0;let n=Array.isArray(t.material)?t.material:[t.material];t.renderOrder===0&&!n.some(e=>e.transparent)&&(t.renderOrder=t.instanceColor?2:1),t.castShadow&&!t.customDepthMaterial&&!n.some(e=>e.alphaTest>0||e.alphaMap||e.displacementMap)&&(t.customDepthMaterial=t.instanceColor?de:g.instDepth)}),de=new oe;de.name=`worldInstDepthColor`;function fe(e,t){if(!ae.size)return;let n=performance.now(),r=[...ae.keys()].sort((n,r)=>pe(n,e,t)-pe(r,e,t)),i=pe(r[0],e,t)<=Vr?Gr:Wr;for(let e of r){let t=ae.get(e);if(t){for(;;){if(t.next().done){ae.delete(e);break}if(performance.now()-n>=i)return}if(performance.now()-n>=i)return}}}let pe=(e,t,n)=>{let r=e%40,i=(e-r)/40;return Math.max(Math.abs(r-t),Math.abs(i-n))};function me(e,t){let n=Math.floor((e+he)/500),i=Math.floor((t+he)/500);for(let[e,t]of z){let a=e%40,s=(e-a)/40,c=r.streamer.tileAt(a,s);if(Math.max(Math.abs(a-n),Math.abs(s-i))<Ur&&c&&c.data&&c.data.id===e)continue;let l=B.get(e);l&&(l.dispose(),B.delete(e));let u=H.get(e);u&&(u.dispose(),H.delete(e));for(let t of[e,-1-e]){let e=ne.get(t);e&&(br(e),ne.delete(t))}z.delete(e),o.delete(t),ee.delete(e),ke(t),re=!0,se(e)}for(let e of ae.keys()){let t=e%40,r=(e-t)/40;Math.max(Math.abs(t-n),Math.abs(r-i))>=Ur&&se(e)}let a=null,s=1/0;for(let e=-2;e<=Hr;e++)for(let t=-2;t<=Hr;t++){let o=n+t,c=i+e;if(o<0||c<0||o>=40||c>=40||z.has(c*40+o))continue;let l=r.streamer.tileAt(o,c);if(!l||!l.data)continue;let u=Math.max(Math.abs(t),Math.abs(e));u<=Vr?ce(l.data):u<s&&(s=u,a=l.data)}a&&ce(a)}let ge=new WeakSet,ve=e=>{O.setup(e),e.isMeshStandardMaterial&&e.envMap&&e.envMap!==C.envMap&&!ge.has(e)&&(ge.add(e),e.envMap=C.envMap,e.needsUpdate=!0)},ye=e=>{let t=e.material;if(t){if(Array.isArray(t))for(let e of t)ve(e);else ve(t)}},be=new R,xe=new N,Se={fx:0,fz:1,cos:-2},Ce={quality:Br[u]?u:`ultra`,tod:l,lights:d.lights,visuals:0,farTriangles:0,sunIntensity:E,exposure:e.toneMappingExposure,skyIrradiance:T,ground:C.groundColor.toArray(),wallIrradiance:C.wallIrradiance,lampLights:0,farLights:j?j.count:0,showMs:0,showMsMax:0,shows:0,stageMs:[]};return{info:Ce,perf:te.info,setRenderScale:te.setScale,update(r,i,a){me(r,i);let o=Math.floor((r+he)/500),s=Math.floor((i+he)/500);fe(o,s);for(let[e,t]of z)t.userData.noAO=pe(e,o,s)>1;re&&=(M.setDetailed(e=>z.has(e)),P.setDetailed(e=>z.has(e)),!1);let c=3;n.getWorldDirection(xe);{let e=Math.hypot(xe.x,xe.z);Se.cos=e<.35?-2:Math.cos(Math.min(Math.PI,Math.ceil((Math.atan(Math.tan(n.fov*Math.PI/360)*n.aspect)+.32)*12)/12)),Se.fx=e>0?xe.x/e:0,Se.fz=e>0?xe.z/e:1}for(let[e,t]of B){let r=z.get(e);if(!r||c<=0)break;let i=t.update(n.position.x-r.position.x,n.position.z-r.position.z,c,Se);i&&(U=!0),c-=i}if(g.setTime(a/1e3),x){x.setTime(a/1e3);let e=3;for(let[t,r]of H){let i=z.get(t);if(!i||e<=0)break;e-=r.update(n.position.x-i.position.x,n.position.z-i.position.z,e)}}C.update(n,a/1e3);{let e=new N().copy(C.sunDir).add(n.position).project(n),t=C.sunDir.dot(n.getWorldDirection(new N))>0,r=(e.x+1)/2,i=(e.y+1)/2,a=Math.max(0,1-Math.max(Math.abs(e.x),Math.abs(e.y))/1.6);L.setSun(r,i,t&&d.sunToSky>0?a*(d.lights>.5?.3:1):0)}if(I?.update(a/1e3),A&&(A.update(n,ee.values()),Ce.lampLights=A.active),j){let e=Math.floor((r+he)/500),t=Math.floor((i+he)/500),n=0;for(let r=-2;r<=2;r++)for(let i=-2;i<=2;i++){let a=e+i,o=t+r;a>=0&&o>=0&&a<40&&o<40&&z.has(o*40+a)&&(n|=1<<(r+2)*5+i+2)}j.setNear(e,t,n)}b.setView(n.fov,e.getDrawingBufferSize(be).y),(U||!(++ie&63))&&(t.traverse(ye),U=!1),O.update(),te.tick(),Ce.visuals=z.size,Ce.farTriangles=M.info.triangles},render(){e.info.reset(),c.has(`post`)?e.render(t,n):L.render()},dispose(){for(let e of B.values())e.dispose();for(let e of H.values())e.dispose();H.clear(),x?.dispose();for(let e of ne.values())br(e);for(let e of[...ae.keys()])se(e);de.dispose(),ne.clear(),v.dispose(),S.dispose(),b.dispose(),A?.dispose(),j?.dispose(),I?.dispose(),ee.clear();for(let e of z.values())o.delete(e),ke(e);B.clear(),z.clear(),g.dispose(),L.dispose(),O.dispose(),M.dispose(),P.dispose(),C.dispose()}}}export{zr as LOOK,Br as QUALITY,Kr as createBeautyWorld};