const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./main-JYttHjEr.js","./regionSprawl-BoUJOhKU.js","./three.module-lZIeIsMj.js"])))=>i.map(i=>d[i]);
import{a as _r,at as rt,av as Cr}from"./regionSprawl-BoUJOhKU.js";import{S as Ft,L as Pr,K as Ne,m as Xo,U as ie,H as Ve,a as pt,u as ke,b as no,D as co,d as Ca,l as Pa,X as Tr,C as tt,c as Ot,e as Ko,A as lt,f as Lt,g as fo,z as qo,h as Zo,$ as Qo,i as mt,r as wt,o as Qa,j as Dr,F as ot,Y as Ce,k as ya,n as st,M as Qt,O as Ja,v as zr,p as Fr,q as Lr,t as Rr,G as Bt,s as Ar,E as Jt,y as Gt,w as Er,W as Ke,V as Jo,x as at,B as Nr,I as kr,J as Or,_ as Ir,N as Ur,P as _t,Q as Hr,R as Br,T as Gr,Z as Wr,a0 as Vr,a1 as jr,a2 as ea,a3 as $r}from"./three.module-lZIeIsMj.js";import{F as La,H as Yr,I as uo,L as Xr,J as Kr,a as ta,M as it,B as vt,N as St,O as qr,P as eo,Q as er,R as Zr,Y as Qr,Z as Re,$ as Jr,a0 as tr,A as ei,z as ti,a1 as ho,w as fa,a2 as ai,a3 as oi,a4 as go,a5 as ri,a6 as zt,a7 as ii,a8 as li}from"./main-JYttHjEr.js";import{disposeTileVisual as Ra,t as si,n as xo,createTileVisual as ni}from"./worldVisual-NbiDXnP5.js";import{o as ci,s as fi,a as ua}from"./forest-o0hAuW3L.js";import{createLakeWater as di,createLakeFlat as ui}from"./water-DYoVWBgE.js";var ar=class or extends tt{constructor(){let e=or.SkyShader,t=new st({name:e.name,uniforms:_t.clone(e.uniforms),vertexShader:e.vertexShader,fragmentShader:e.fragmentShader,side:1,depthWrite:!1});super(new Jt(1,1,1),t),this.isSky=!0}};ar.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new ie},cloudScale:{value:2e-4},cloudSpeed:{value:2e-5},cloudCoverage:{value:.4},cloudDensity:{value:.4},cloudElevation:{value:.5},showSunDisc:{value:1},skyGain:{value:1},time:{value:0}},vertexShader:`
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

		}`};var Sa={day:{sun:[235,42],turbidity:2.8,rayleigh:1.9,mie:.003,clouds:.32,sunToSky:2.4,skyGain:1.25,rel:0,lights:0},sunset:{sun:[262,3.5],turbidity:5,rayleigh:3,mie:.007,clouds:.34,sunToSky:2.4,rel:7,lights:.3},dusk:{sun:[268,-1.2],turbidity:4.5,rayleigh:3.2,mie:.006,clouds:.28,sunToSky:0,rel:80,lights:.85},night:{moon:[140,38],sunToSky:2,rel:45,lights:1}},hi=5.73;function pi(a,e,t=new ie){let o=Qt.degToRad(a),i=Qt.degToRad(e);return t.set(Math.sin(o)*Math.cos(i),Math.sin(i),-Math.cos(o)*Math.cos(i))}var mi=`
varying vec3 vWorldPosition;
void main() {
	vec4 wp = modelMatrix * vec4( position, 1.0 );
	vWorldPosition = wp.xyz;
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
	gl_Position.z = gl_Position.w;
}`,vi=`
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
}`;function gi(a){let e=new st({name:"NightSky",vertexShader:mi,fragmentShader:vi,side:1,depthWrite:!1,uniforms:{moonDir:{value:a.clone()},showMoon:{value:1},uStars:{value:1},time:{value:0},cityGlow:{value:1}}}),t=new tt(new Jt(1,1,1),e);return t.frustumCulled=!1,t}function xi(a,e=Sa.day,{sunColor:t=16773340,moonColor:o=11122920,groundAlbedo:i=.15}={}){let r=!!e.moon,[l,n]=r?e.moon:e.sun,s=pi(l,n),c=()=>{if(r)return gi(s);let j=new ar,G=j.material.uniforms;return G.turbidity.value=e.turbidity,G.rayleigh.value=e.rayleigh,G.mieCoefficient.value=e.mie,G.mieDirectionalG.value=.8,G.sunPosition.value.copy(s),G.cloudCoverage.value=e.clouds,G.cloudDensity.value=.75,G.cloudElevation.value=.5,G.cloudScale.value=2e-4,G.cloudSpeed.value=3e-5,j.frustumCulled=!1,j},d=(j,G)=>{let V=j.material.uniforms;r?(V.showMoon.value=0,V.cityGlow.value=0):V.showSunDisc.value=0},f=c();!r&&(f.material.uniforms.skyGain.value=e.skyGain??1),f.scale.setScalar(1e3),f.renderOrder=1e3,f.name="sky";let p=c();d(p),p.scale.setScalar(10);let m=new qo;m.add(p);let L=new Lt(32,32,{type:zr}),R=new Float32Array(4096),C=new Fr(90,1,.1,100),A=new ie,z=new ie,x=new ie,_=new ie,N=new Ve(s.x,s.z).normalize(),E=new ie,k=new ie,u=new ie,v=0,T=0,F=0,D=0,h=a.getRenderTarget();for(let[j,G,V,$,Q,J]of[[0,1,0,0,0,-1],[1,0,0,0,1,0],[-1,0,0,0,1,0],[0,0,1,0,1,0],[0,0,-1,0,1,0]]){C.position.set(0,0,0),C.up.set($,Q,J),C.lookAt(j,G,V),C.updateMatrixWorld(),a.setRenderTarget(L),a.render(m,C),a.readRenderTargetPixels(L,0,0,32,32,R);let re=C.matrixWorld.elements;A.set(re[0],re[1],re[2]),z.set(re[4],re[5],re[6]),x.set(-re[8],-re[9],-re[10]);for(let fe=0;fe<32;fe++)for(let ue=0;ue<32;ue++){let Pe=(ue+.5)/32*2-1,ve=(fe+.5)/32*2-1;_.copy(x).addScaledVector(A,Pe).addScaledVector(z,ve);let se=_.length();if(_.divideScalar(se),_.y<=0)continue;let xe=(fe*32+ue)*4,Ae=R[xe],De=R[xe+1],ze=R[xe+2],be=4/1024/(se*se*se),Be=_.y*be,dt=.2126*Ae+.7152*De+.0722*ze,yt=_.x*N.x+_.z*N.y;if(v+=dt*Be,yt>0&&(T+=dt*yt*be),u.x+=Ae*Be,u.y+=De*Be,u.z+=ze*Be,_.y<.02||_.y>.09)continue;let H=Math.hypot(_.x,_.z),Y=(_.x*N.x+_.z*N.y)/H;Y>.92?(E.x+=Ae,E.y+=De,E.z+=ze,F++):Y<-.3&&(k.x+=Ae,k.y+=De,k.z+=ze,D++)}}a.setRenderTarget(h),L.dispose(),E.divideScalar(Math.max(1,F)),k.divideScalar(Math.max(1,D));let M=new Ne(E.x,E.y,E.z).multiplyScalar(1/Math.max(1e-6,E.x,E.y,E.z)),g=1-Qt.smoothstep(n,2,20),y=r?new Ne(o):new Ne(t).lerp(M,g),b=i/Math.PI,S=e.sunToSky*v,w=new Ot({side:2,color:new Ne((u.x+y.r*S)*b,(u.y+y.g*S)*b,(u.z+y.b*S)*b)}),O=new tt(new Lr(90,48),w);O.rotation.x=-Math.PI/2,O.position.y=-.3,m.add(O);let P=new Rr(a),I=P.fromScene(m,0,.1,100);return P.dispose(),p.geometry.dispose(),p.material.dispose(),O.geometry.dispose(),w.dispose(),{mesh:f,sunDir:s,night:r,envMap:I.texture,lightColor:y,groundColor:w.color.clone(),skyIrradiance:v,wallIrradiance:T+(.2126*w.color.r+.7152*w.color.g+.0722*w.color.b)*Math.PI/2,horizonAway:new Ne(k.x,k.y,k.z),horizonSun:new Ne(E.x,E.y,E.z),update(j,G){f.position.copy(j.position),f.material.uniforms.time.value=G},dispose(){f.removeFromParent(),f.geometry.dispose(),f.material.dispose(),I.dispose()}}}function wi({sunDir:a,sunColor:e,falloff:t=1/450}){let o=(i,r,l)=>`vec3( ${i.toFixed(6)}, ${r.toFixed(6)}, ${l.toFixed(6)} )`;Bt.fog_pars_vertex=`#ifdef USE_FOG
	varying vec3 vFogWorld;
#endif`,Bt.fog_vertex=`#ifdef USE_FOG
	vFogWorld = transpose( mat3( viewMatrix ) ) * mvPosition.xyz + cameraPosition;
#endif`,Bt.fog_pars_fragment=`#ifdef USE_FOG
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
#endif`,Bt.fog_fragment=`#ifdef USE_FOG
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
#endif`}var Aa=new Ke,rr=class ir{constructor(e){e||={},this.zNear=e.webGL===!0?-1:0,this.zFar=1,this.vertices={near:[new ie,new ie,new ie,new ie],far:[new ie,new ie,new ie,new ie]},e.projectionMatrix!==void 0&&this.setFromProjectionMatrix(e.projectionMatrix,e.maxFar||1e4),e.reversedDepth===!0&&(this.zNear=1,this.zFar=0)}setFromProjectionMatrix(e,t){let o=this.zNear,i=this.zFar,r=e.elements[11]===0;return Aa.copy(e).invert(),this.vertices.near[0].set(1,1,o),this.vertices.near[1].set(1,-1,o),this.vertices.near[2].set(-1,-1,o),this.vertices.near[3].set(-1,1,o),this.vertices.near.forEach(function(l){l.applyMatrix4(Aa)}),this.vertices.far[0].set(1,1,i),this.vertices.far[1].set(1,-1,i),this.vertices.far[2].set(-1,-1,i),this.vertices.far[3].set(-1,1,i),this.vertices.far.forEach(function(l){l.applyMatrix4(Aa);let n=Math.abs(l.z);r?l.z*=Math.min(t/n,1):l.multiplyScalar(Math.min(t/n,1))}),this.vertices}split(e,t){for(;e.length>t.length;)t.push(new ir);t.length=e.length;let o=this.vertices.near[0].z,i=this.vertices.far[0].z;for(let r=0;r<e.length;r++){let l=t[r];if(r===0)for(let n=0;n<4;n++)l.vertices.near[n].copy(this.vertices.near[n]);else{let n=(e[r-1]*i-o)/(i-o);for(let s=0;s<4;s++)l.vertices.near[s].lerpVectors(this.vertices.near[s],this.vertices.far[s],n)}if(r===e.length-1)for(let n=0;n<4;n++)l.vertices.far[n].copy(this.vertices.far[n]);else{let n=(e[r]*i-o)/(i-o);for(let s=0;s<4;s++)l.vertices.far[s].lerpVectors(this.vertices.near[s],this.vertices.far[s],n)}}}toSpace(e,t){for(let o=0;o<4;o++)t.vertices.near[o].copy(this.vertices.near[o]).applyMatrix4(e),t.vertices.far[o].copy(this.vertices.far[o]).applyMatrix4(e)}},wo={lights_fragment_begin:`
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
	`+Bt.lights_pars_begin},yo=new Ke,Ea=new rr({webGL:!0}),Ct=new ie,yi=new ie,sa=new Ko,Na=[],ka=[],Oa=new Ke,So=new Ke,Si=new ie(0,1,0),Mi=class{constructor(a){this.camera=a.camera,this.parent=a.parent,this.cascades=a.cascades||3,this.maxFar=a.maxFar||1e5,this.mode=a.mode||"practical",this.shadowMapSize=a.shadowMapSize||2048,this.shadowBias=a.shadowBias||1e-6,this.lightDirection=a.lightDirection||new ie(1,-1,1).normalize(),this.lightIntensity=a.lightIntensity||3,this.lightNear=a.lightNear||1,this.lightFar=a.lightFar||2e3,this.lightMargin=a.lightMargin||200,this.customSplitsCallback=a.customSplitsCallback,this.fade=!1,this.mainFrustum=new rr({webGL:!0}),this.frustums=[],this.breaks=[],this.lights=[],this.shaders=new Map,this._createLights(),this.updateFrustums(),this._injectInclude()}_createLights(){for(let a=0;a<this.cascades;a++){let e=new Ir(16777215,this.lightIntensity);e.castShadow=!0,e.shadow.mapSize.width=this.shadowMapSize,e.shadow.mapSize.height=this.shadowMapSize,e.shadow.camera.near=this.lightNear,e.shadow.camera.far=this.lightFar,e.shadow.bias=this.shadowBias,this.parent.add(e),this.parent.add(e.target),this.lights.push(e)}}_initCascades(){let a=this.camera;a.updateProjectionMatrix(),this.mainFrustum.setFromProjectionMatrix(a.projectionMatrix,this.maxFar),this.mainFrustum.split(this.breaks,this.frustums)}_updateShadowBounds(){let a=this.frustums;for(let e=0;e<a.length;e++){let t=this.lights[e].shadow.camera,o=this.frustums[e],i=o.vertices.near,r=o.vertices.far,l=r[0],n;n=l.distanceTo(r[2])>l.distanceTo(i[2])?r[2]:i[2];let s=l.distanceTo(n);if(this.fade){let c=this.camera,d=Math.max(c.far,this.maxFar),f=.25*(o.vertices.far[0].z/(d-c.near))**2*(d-c.near);s+=f}t.left=-s/2,t.right=s/2,t.top=s/2,t.bottom=-s/2,t.updateProjectionMatrix()}}_getBreaks(){let a=this.camera,e=Math.min(a.far,this.maxFar);switch(this.breaks.length=0,this.mode){case"uniform":t(this.cascades,a.near,e,this.breaks);break;case"logarithmic":o(this.cascades,a.near,e,this.breaks);break;case"practical":i(this.cascades,a.near,e,.5,this.breaks);break;case"custom":this.customSplitsCallback===void 0&&console.error("CSM: Custom split scheme callback not defined."),this.customSplitsCallback(this.cascades,a.near,e,this.breaks)}function t(r,l,n,s){for(let c=1;c<r;c++)s.push((l+(n-l)*c/r)/n);s.push(1)}function o(r,l,n,s){for(let c=1;c<r;c++)s.push(l*(n/l)**(c/r)/n);s.push(1)}function i(r,l,n,s,c){Na.length=0,ka.length=0,o(r,l,n,ka),t(r,l,n,Na);for(let d=1;d<r;d++)c.push(Qt.lerp(Na[d-1],ka[d-1],s));c.push(1)}}update(){let a=this.camera,e=this.frustums;Oa.lookAt(yi,this.lightDirection,Si),So.copy(Oa).invert();for(let t=0;t<e.length;t++){let o=this.lights[t],i=o.shadow.camera,r=(i.right-i.left)/this.shadowMapSize,l=(i.top-i.bottom)/this.shadowMapSize;yo.multiplyMatrices(So,a.matrixWorld),e[t].toSpace(yo,Ea);let n=Ea.vertices.near,s=Ea.vertices.far;sa.makeEmpty();for(let c=0;c<4;c++)sa.expandByPoint(n[c]),sa.expandByPoint(s[c]);sa.getCenter(Ct),Ct.z=sa.max.z+this.lightMargin,Ct.x=Math.floor(Ct.x/r)*r,Ct.y=Math.floor(Ct.y/l)*l,Ct.applyMatrix4(Oa),o.position.copy(Ct),o.target.position.copy(Ct),o.target.position.x+=this.lightDirection.x,o.target.position.y+=this.lightDirection.y,o.target.position.z+=this.lightDirection.z}}_injectInclude(){Bt.lights_fragment_begin=wo.lights_fragment_begin,Bt.lights_pars_begin=wo.lights_pars_begin}setupMaterial(a){a.defines=a.defines||{},a.defines.USE_CSM=1,a.defines.CSM_CASCADES=this.cascades,this.fade&&(a.defines.CSM_FADE="");let e=[],t=this,o=this.shaders;a.onBeforeCompile=function(i){let r=Math.min(t.camera.far,t.maxFar);t._getExtendedBreaks(e),i.uniforms.CSM_cascades={value:e},i.uniforms.cameraNear={value:t.camera.near},i.uniforms.shadowFar={value:r},o.set(a,i)},o.set(a,null)}_updateUniforms(){let a=Math.min(this.camera.far,this.maxFar);this.shaders.forEach(function(e,t){if(e!==null){let o=e.uniforms;this._getExtendedBreaks(o.CSM_cascades.value),o.cameraNear.value=this.camera.near,o.shadowFar.value=a}!this.fade&&"CSM_FADE"in t.defines?(delete t.defines.CSM_FADE,t.needsUpdate=!0):this.fade&&!("CSM_FADE"in t.defines)&&(t.defines.CSM_FADE="",t.needsUpdate=!0)},this)}_getExtendedBreaks(a){for(;a.length<this.breaks.length;)a.push(new Ve);a.length=this.breaks.length;for(let e=0;e<this.cascades;e++){let t=this.breaks[e],o=this.breaks[e-1]||0;a[e].x=o,a[e].y=t}}updateFrustums(){this._getBreaks(),this._initCascades(),this._updateShadowBounds(),this._updateUniforms()}remove(){for(let a=0;a<this.lights.length;a++)this.parent.remove(this.lights[a].target),this.parent.remove(this.lights[a])}dispose(){let a=this.shaders;a.forEach(function(e,t){delete t.onBeforeCompile,delete t.defines.USE_CSM,delete t.defines.CSM_CASCADES,delete t.defines.CSM_FADE,e!==null&&(delete e.uniforms.CSM_cascades,delete e.uniforms.cameraNear,delete e.uniforms.shadowFar),t.needsUpdate=!0}),a.clear()}},bi=a=>a.isMeshStandardMaterial||a.isMeshLambertMaterial||a.isMeshPhongMaterial||a.isMeshToonMaterial;function _i({scene:a,camera:e,sunDir:t,intensity:o,color:i,maxFar:r=2500,mapSize:l=2048,splits:n=[12,60,300]}){let s=n,c=new Mi({camera:e,parent:a,cascades:s.length+1,maxFar:r,mode:"custom",shadowMapSize:l,shadowBias:-5e-5,customSplitsCallback:(m,L,R,C)=>{for(let A of s)C.push(A/R);C.push(1)},lightDirection:t.clone().negate(),lightIntensity:o,lightNear:1,lightFar:8e3,lightMargin:3e3});c.fade=!0;for(let m of c.lights)m.color.copy(i),m.intensity=o;c.lights.length>=4&&l>=2048&&c.lights[c.lights.length-1].shadow.mapSize.set(l/2,l/2);let d=new WeakSet;function f(m){if(d.has(m)||(d.add(m),!bi(m)))return;let L=m.onBeforeCompile,R=m.customProgramCacheKey();c.setupMaterial(m);let C=m.onBeforeCompile;m.onBeforeCompile=function(A,z){L.call(this,A,z),C.call(this,A,z)},m.customProgramCacheKey=()=>R+"|csm",m.needsUpdate=!0}let p=m=>{let L=m.material;if(L)if(Array.isArray(L))for(let R of L)f(R);else f(L)};return{csm:c,setup:f,scan(){a.traverse(p)},update(){e.updateMatrixWorld(),c.update();for(let m of c.lights){let L=m.shadow.camera;m.shadow.normalBias=1.5*(L.right-L.left)/m.shadow.mapSize.x,m.shadow.radius=4}},dispose(){c.remove(),c.dispose()}}}var Ci={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new Ve(1/1024,1/512)}},vertexShader:`

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

		}`},$t=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},Pi=new Zo(-1,1,1,-1,0,1),Ti=new class extends ot{constructor(){super(),this.setAttribute("position",new Ce([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ce([0,2,0,0,2,0],2))}},Ta=class{constructor(a){this._mesh=new tt(Ti,a)}dispose(){this._mesh.geometry.dispose()}render(a){a.render(this._mesh,Pi)}get material(){return this._mesh.material}set material(a){this._mesh.material=a}},ba=class extends $t{constructor(a,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,a instanceof st?(this.uniforms=a.uniforms,this.material=a):a&&(this.uniforms=_t.clone(a.uniforms),this.material=new st({name:a.name===void 0?"unspecified":a.name,defines:Object.assign({},a.defines),uniforms:this.uniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader})),this._fsQuad=new Ta(this.material)}render(a,e,t){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=t.texture),this._fsQuad.material=this.material,this.renderToScreen?(a.setRenderTarget(null),this._fsQuad.render(a)):(a.setRenderTarget(e),this.clear&&a.clear(a.autoClearColor,a.autoClearDepth,a.autoClearStencil),this._fsQuad.render(a))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Di=class extends ba{constructor(){super(Ci)}setSize(a,e){this.material.uniforms.resolution.value.set(1/a,1/e)}},ha={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`},lr=class extends $t{constructor(){super(),this.isOutputPass=!0,this.uniforms=_t.clone(ha.uniforms),this.material=new Vr({name:ha.name,uniforms:this.uniforms,vertexShader:ha.vertexShader,fragmentShader:ha.fragmentShader}),this._fsQuad=new Ta(this.material),this._outputColorSpace=null,this._toneMapping=null}render(a,e,t){this.uniforms.tDiffuse.value=t.texture,this.uniforms.toneMappingExposure.value=a.toneMappingExposure,(this._outputColorSpace!==a.outputColorSpace||this._toneMapping!==a.toneMapping)&&(this._outputColorSpace=a.outputColorSpace,this._toneMapping=a.toneMapping,this.material.defines={},jr.getTransfer(this._outputColorSpace)==="srgb"&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(a.setRenderTarget(null),this._fsQuad.render(a)):(a.setRenderTarget(e),this.clear&&a.clear(a.autoClearColor,a.autoClearDepth,a.autoClearStencil),this._fsQuad.render(a))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},pa={move:.04,turn:.045,maxFrames:[1,3,8,16]},Pt={step:.1,down:.87,up:1.02,downSec:2,upSec:3,warmup:6,lockSec:120};function Mo(a,e,t,o){let i=a.setSize.bind(a);a.setSize=(r,l)=>i(Math.max(1,Math.round(r*e)),Math.max(1,Math.round(l*e))),a.setSize(t,o)}function zi({perf:a,renderer:e,post:t,shadows:o,camera:i,splits:r,maxFar:l,now:n=()=>performance.now()}){let s={ao:1,bloom:1,fxaa:!1,stagger:!1,shadowDraws:0,frames:0,dynamic:!1,scale:1,atFloor:!0,degrade:0,degradeText:"",fps:0};if(!a)return{info:s,tick(){},setScale(){}};let c=t.composer.renderTarget1,d=c.width,f=c.height;if(a.aoScale&&a.aoScale!==1&&t.gtao.enabled){Mo(t.gtao,a.aoScale,d,f);let w=a.aoSamples||8;t.gtao.updateGtaoMaterial({samples:w}),t.gtao.updatePdMaterial({samples:w,radius:4}),s.ao=a.aoScale}if(a.bloomScale&&a.bloomScale!==1&&t.bloom.enabled&&(Mo(t.bloom,a.bloomScale,d,f),s.bloom=a.bloomScale),a.fxaa){let w=t.composer.passes.findIndex(O=>O instanceof lr);if(w>=0){let O=new Di;t.composer.insertPass(O,w+1),O.setSize(d,f),s.fxaa=!0}}let p=[],m=[...r,l],L=new ie,R=a.stagger?o.csm.lights:[];for(let w=0;w<R.length;w++)R[w].shadow.autoUpdate=!1,R[w].shadow.needsUpdate=!0,p.push({pos:new ie(1/0,0,0),dir:new ie,age:0});s.stagger=R.length>0;let C=a.dynamic&&a.dynamic.min<1?a.dynamic:null,A=e.getPixelRatio(),z=new Ve,x=1,_=1,N=0,E=-1e9,k=0,u=0,v=0,T=0,F=n(),D=F;s.dynamic=!!C,s.atFloor=!C;function h(w){x=Math.round(Math.min(1,Math.max(.3,w))*100)/100,e.getSize(z),t.composer._pixelRatio=A*x,t.composer.setSize(z.x,z.y),s.scale=x,s.atFloor=!C||x<=C.min+1e-6}function M(w){let O=Math.min(.5,(w-D)/1e3);if(D=w,w-F<Pt.warmup*1e3||O<=0||(v+=O,T++,v<1))return;let P=T/v;if(v=0,T=0,s.fps=Math.round(P),w>N&&(_=1),P<C.target*Pt.down?(k+=1,u=0):P>C.target*Pt.up?(u+=1,k=0):(k=0,u=0),k>=Pt.downSec&&x>C.min+1e-6){let I=Math.max(C.min,x-(P<C.target*.6?2:1)*Pt.step);w-E<15e3&&(_=I,N=w+Pt.lockSec*1e3),h(I),k=0}else if(k>=Pt.downSec&&x<=C.min+1e-6){if(k=0,++g>=2){g=0;let I=s.degrade|0;I===0&&y.gtao.enabled?(y.gtao.enabled=!1,s.degrade=1,s.degradeText="без затенения AO"):I<=1&&y.bloom.enabled?(y.bloom.enabled=!1,s.degrade=2,s.degradeText="без свечения"):I<=2&&b.csm&&b.csm.lights.length&&b.csm.lights[0].shadow.mapSize.x>768?(b.csm.lights.forEach(j=>{j.shadow.mapSize.set(768,768),j.shadow.map&&(j.shadow.map.dispose(),j.shadow.map=null),j.shadow.needsUpdate=!0}),s.degrade=3,s.degradeText="тени 768"):s.degrade=4}}else u>=Pt.upSec&&x<_-1e-6&&(h(Math.min(_,x+Pt.step)),u=0,E=w)}let g=0,y=t,b=o,S=0;return{info:s,setScale:h,tick(){let w=n();if(C&&M(w),x!==1||t.grade.uniforms.uSharpen.value!==Ze.sharpen){let O=t.composer.renderTarget1;t.grade.uniforms.uTexel.value.set(1/O.width,1/O.height),t.grade.uniforms.uSharpen.value=Ze.sharpen+Ze.sharpenLow*(1-x)}if(R.length){S++,s.frames=S,i.getWorldDirection(L);for(let O=0;O<R.length;O++){let P=p[O],I=pa.maxFrames[Math.min(O,pa.maxFrames.length-1)];P.age++;let j=P.age>=I&&(I<=3||(S+O)%2==0),G=P.pos.distanceToSquared(i.position)>(pa.move*m[O])**2,V=P.dir.dot(L)<Math.cos(pa.turn);(O===0||j||G||V)&&(R[O].shadow.needsUpdate=!0,s.shadowDraws++,P.pos.copy(i.position),P.dir.copy(L),P.age=0)}}}}}var Wt={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`},bo=class extends $t{constructor(a,e){super(),this.scene=a,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(a,e,t){let o=a.getContext(),i=a.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let r,l;this.inverse?(r=0,l=1):(r=1,l=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(o.REPLACE,o.REPLACE,o.REPLACE),i.buffers.stencil.setFunc(o.ALWAYS,r,4294967295),i.buffers.stencil.setClear(l),i.buffers.stencil.setLocked(!0),a.setRenderTarget(t),this.clear&&a.clear(),a.render(this.scene,this.camera),a.setRenderTarget(e),this.clear&&a.clear(),a.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(o.EQUAL,1,4294967295),i.buffers.stencil.setOp(o.KEEP,o.KEEP,o.KEEP),i.buffers.stencil.setLocked(!0)}},Fi=class extends $t{constructor(){super(),this.needsSwap=!1}render(a){a.state.buffers.stencil.setLocked(!1),a.state.buffers.stencil.setTest(!1)}},Li=class{constructor(a,e){if(this.renderer=a,this._pixelRatio=a.getPixelRatio(),e===void 0){let t=a.getSize(new Ve);this._width=t.width,this._height=t.height,e=new Lt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Gt}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new ba(Wt),this.copyPass.material.blending=0,this.timer=new Ur}swapBuffers(){let a=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=a}addPass(a){this.passes.push(a),a.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(a,e){this.passes.splice(e,0,a),a.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(a){let e=this.passes.indexOf(a);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(a){for(let e=a+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(a){this.timer.update(),a===void 0&&(a=this.timer.getDelta());let e=this.renderer.getRenderTarget(),t=!1;for(let o=0,i=this.passes.length;o<i;o++){let r=this.passes[o];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(o),r.render(this.renderer,this.writeBuffer,this.readBuffer,a,t),r.needsSwap){if(t){let l=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(l.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,a),n.setFunc(l.EQUAL,1,4294967295)}this.swapBuffers()}bo!==void 0&&(r instanceof bo?t=!0:r instanceof Fi&&(t=!1))}}this.renderer.setRenderTarget(e)}reset(a){if(a===void 0){let e=this.renderer.getSize(new Ve);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,a=this.renderTarget1.clone(),a.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=a,this.renderTarget2=a.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(a,e){this._width=a,this._height=e;let t=this._width*this._pixelRatio,o=this._height*this._pixelRatio;this.renderTarget1.setSize(t,o),this.renderTarget2.setSize(t,o);for(let i=0;i<this.passes.length;i++)this.passes[i].setSize(t,o)}setPixelRatio(a){this._pixelRatio=a,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},Ri=class extends $t{constructor(a,e,t=null,o=null,i=null){super(),this.scene=a,this.camera=e,this.overrideMaterial=t,this.clearColor=o,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Ne}render(a,e,t){let o=a.autoClear;a.autoClear=!1;let i,r;this.overrideMaterial!==null&&(r=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(a.getClearColor(this._oldClearColor),a.setClearColor(this.clearColor,a.getClearAlpha())),this.clearAlpha!==null&&(i=a.getClearAlpha(),a.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&a.clearDepth(),a.setRenderTarget(this.renderToScreen?null:t),this.clear===!0&&a.clear(a.autoClearColor,a.autoClearDepth,a.autoClearStencil),a.render(this.scene,this.camera),this.clearColor!==null&&a.setClearColor(this._oldClearColor),this.clearAlpha!==null&&a.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=r),a.autoClear=o}},ma={defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new Ve},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new Ke},cameraProjectionMatrixInverse:{value:new Ke},cameraWorldMatrix:{value:new Ke},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new ie(-1,-1,-1)},sceneBoxMax:{value:new ie(1,1,1)}},vertexShader:`

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
		}`},va={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
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

		}`},Ia={uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
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
		}`};function Ai(a=5){let e=Math.floor(a)%2==0?Math.floor(a)+1:Math.floor(a),t=Ei(e),o=t.length,i=new Uint8Array(o*4);for(let l=0;l<o;++l){let n=t[l],s=2*Math.PI*n/o,c=new ie(Math.cos(s),Math.sin(s),0).normalize();i[l*4]=(c.x*.5+.5)*255,i[l*4+1]=(c.y*.5+.5)*255,i[l*4+2]=127,i[l*4+3]=255}let r=new no(i,e,e);return r.wrapS=wt,r.wrapT=wt,r.needsUpdate=!0,r}function Ei(a){let e=Math.floor(a)%2==0?Math.floor(a)+1:Math.floor(a),t=e*e,o=Array(t).fill(0),i=Math.floor(e/2),r=e-1;for(let l=1;l<=t;){if(i===-1&&r===e?(r=e-2,i=0):(r===e&&(r=0),i<0&&(i=e-1)),o[i*e+r]!==0){r-=2,i++;continue}o[i*e+r]=l++,r++,i--}return o}var ga={defines:{SAMPLES:16,SAMPLE_VECTORS:sr(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new Ve},cameraProjectionMatrixInverse:{value:new Ke},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

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
		}`};function sr(a,e,t){let o=Ni(a,e,t),i="vec3[SAMPLES](";for(let r=0;r<a;r++){let l=o[r];i+=`vec3(${l.x}, ${l.y}, ${l.z})${r<a-1?",":")"}`}return i}function Ni(a,e,t){let o=[];for(let i=0;i<a;i++){let r=2*Math.PI*e*i/a,l=(i/(a-1))**t;o.push(new ie(Math.cos(r),Math.sin(r),l))}return o}var ki=class{constructor(a=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let e=0;e<256;e++)this.p[e]=Math.floor(a.random()*256);this.perm=[];for(let e=0;e<512;e++)this.perm[e]=this.p[e&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(a,e){let t,o,i,r=.5*(Math.sqrt(3)-1),l=(a+e)*r,n=Math.floor(a+l),s=Math.floor(e+l),c=(3-Math.sqrt(3))/6,d=(n+s)*c,f=n-d,p=s-d,m=a-f,L=e-p,R,C;m>L?(R=1,C=0):(R=0,C=1);let A=m-R+c,z=L-C+c,x=m-1+2*c,_=L-1+2*c,N=n&255,E=s&255,k=this.perm[N+this.perm[E]]%12,u=this.perm[N+R+this.perm[E+C]]%12,v=this.perm[N+1+this.perm[E+1]]%12,T=.5-m*m-L*L;T<0?t=0:(T*=T,t=T*T*this._dot(this.grad3[k],m,L));let F=.5-A*A-z*z;F<0?o=0:(F*=F,o=F*F*this._dot(this.grad3[u],A,z));let D=.5-x*x-_*_;return D<0?i=0:(D*=D,i=D*D*this._dot(this.grad3[v],x,_)),70*(t+o+i)}noise3d(a,e,t){let o,i,r,l,n=(a+e+t)*.3333333333333333,s=Math.floor(a+n),c=Math.floor(e+n),d=Math.floor(t+n),f=1/6,p=(s+c+d)*f,m=s-p,L=c-p,R=d-p,C=a-m,A=e-L,z=t-R,x,_,N,E,k,u;C>=A?A>=z?(x=1,_=0,N=0,E=1,k=1,u=0):C>=z?(x=1,_=0,N=0,E=1,k=0,u=1):(x=0,_=0,N=1,E=1,k=0,u=1):A<z?(x=0,_=0,N=1,E=0,k=1,u=1):C<z?(x=0,_=1,N=0,E=0,k=1,u=1):(x=0,_=1,N=0,E=1,k=1,u=0);let v=C-x+f,T=A-_+f,F=z-N+f,D=C-E+2*f,h=A-k+2*f,M=z-u+2*f,g=C-1+3*f,y=A-1+3*f,b=z-1+3*f,S=s&255,w=c&255,O=d&255,P=this.perm[S+this.perm[w+this.perm[O]]]%12,I=this.perm[S+x+this.perm[w+_+this.perm[O+N]]]%12,j=this.perm[S+E+this.perm[w+k+this.perm[O+u]]]%12,G=this.perm[S+1+this.perm[w+1+this.perm[O+1]]]%12,V=.6-C*C-A*A-z*z;V<0?o=0:(V*=V,o=V*V*this._dot3(this.grad3[P],C,A,z));let $=.6-v*v-T*T-F*F;$<0?i=0:($*=$,i=$*$*this._dot3(this.grad3[I],v,T,F));let Q=.6-D*D-h*h-M*M;Q<0?r=0:(Q*=Q,r=Q*Q*this._dot3(this.grad3[j],D,h,M));let J=.6-g*g-y*y-b*b;return J<0?l=0:(J*=J,l=J*J*this._dot3(this.grad3[G],g,y,b)),32*(o+i+r+l)}noise4d(a,e,t,o){let i=this.grad4,r=this.simplex,l=this.perm,n=(Math.sqrt(5)-1)/4,s=(5-Math.sqrt(5))/20,c,d,f,p,m,L=(a+e+t+o)*n,R=Math.floor(a+L),C=Math.floor(e+L),A=Math.floor(t+L),z=Math.floor(o+L),x=(R+C+A+z)*s,_=R-x,N=C-x,E=A-x,k=z-x,u=a-_,v=e-N,T=t-E,F=o-k,D=u>v?32:0,h=u>T?16:0,M=v>T?8:0,g=u>F?4:0,y=v>F?2:0,b=+(T>F),S=D+h+M+g+y+b,w=+(r[S][0]>=3),O=+(r[S][1]>=3),P=+(r[S][2]>=3),I=+(r[S][3]>=3),j=+(r[S][0]>=2),G=+(r[S][1]>=2),V=+(r[S][2]>=2),$=+(r[S][3]>=2),Q=+(r[S][0]>=1),J=+(r[S][1]>=1),re=+(r[S][2]>=1),fe=+(r[S][3]>=1),ue=u-w+s,Pe=v-O+s,ve=T-P+s,se=F-I+s,xe=u-j+2*s,Ae=v-G+2*s,De=T-V+2*s,ze=F-$+2*s,be=u-Q+3*s,Be=v-J+3*s,dt=T-re+3*s,yt=F-fe+3*s,H=u-1+4*s,Y=v-1+4*s,ee=T-1+4*s,te=F-1+4*s,he=R&255,ye=C&255,_e=A&255,Oe=z&255,pe=l[he+l[ye+l[_e+l[Oe]]]]%32,ce=l[he+w+l[ye+O+l[_e+P+l[Oe+I]]]]%32,Ge=l[he+j+l[ye+G+l[_e+V+l[Oe+$]]]]%32,U=l[he+Q+l[ye+J+l[_e+re+l[Oe+fe]]]]%32,q=l[he+1+l[ye+1+l[_e+1+l[Oe+1]]]]%32,X=.6-u*u-v*v-T*T-F*F;X<0?c=0:(X*=X,c=X*X*this._dot4(i[pe],u,v,T,F));let Z=.6-ue*ue-Pe*Pe-ve*ve-se*se;Z<0?d=0:(Z*=Z,d=Z*Z*this._dot4(i[ce],ue,Pe,ve,se));let oe=.6-xe*xe-Ae*Ae-De*De-ze*ze;oe<0?f=0:(oe*=oe,f=oe*oe*this._dot4(i[Ge],xe,Ae,De,ze));let ne=.6-be*be-Be*Be-dt*dt-yt*yt;ne<0?p=0:(ne*=ne,p=ne*ne*this._dot4(i[U],be,Be,dt,yt));let B=.6-H*H-Y*Y-ee*ee-te*te;return B<0?m=0:(B*=B,m=B*B*this._dot4(i[q],H,Y,ee,te)),27*(c+d+f+p+m)}_dot(a,e,t){return a[0]*e+a[1]*t}_dot3(a,e,t,o){return a[0]*e+a[1]*t+a[2]*o}_dot4(a,e,t,o,i){return a[0]*e+a[1]*t+a[2]*o+a[3]*i}},nr=class Et extends $t{constructor(e,t,o=512,i=512,r,l,n){super(),this.width=o,this.height=i,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=Ai(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new Lt(this.width,this.height,{type:Gt,depthBuffer:!1}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new st({defines:Object.assign({},ma.defines),uniforms:_t.clone(ma.uniforms),vertexShader:ma.vertexShader,fragmentShader:ma.fragmentShader,blending:0,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=+!!this.camera.isPerspectiveCamera,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new Hr,this.normalMaterial.blending=0,this.pdMaterial=new st({defines:Object.assign({},ga.defines),uniforms:_t.clone(ga.uniforms),vertexShader:ga.vertexShader,fragmentShader:ga.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new st({defines:Object.assign({},va.defines),uniforms:_t.clone(va.uniforms),vertexShader:va.vertexShader,fragmentShader:va.fragmentShader,blending:0}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new st({uniforms:_t.clone(Wt.uniforms),vertexShader:Wt.vertexShader,fragmentShader:Wt.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:208,blendDst:200,blendEquation:100,blendSrcAlpha:206,blendDstAlpha:200,blendEquationAlpha:100}),this.blendMaterial=new st({uniforms:_t.clone(Ia.uniforms),vertexShader:Ia.vertexShader,fragmentShader:Ia.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:5,blendSrc:208,blendDst:200,blendEquation:100,blendSrcAlpha:206,blendDstAlpha:200,blendEquationAlpha:100}),this._fsQuad=new Ta(null),this._originalClearColor=new Ne,this.setGBuffer(r?r.depthTexture:void 0,r?r.normalTexture:void 0),l!==void 0&&this.updateGtaoMaterial(l),n!==void 0&&this.updatePdMaterial(n)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,t){e===void 0?(this.depthTexture=new Br,this.depthTexture.format=Gr,this.depthTexture.type=Wr,this.normalRenderTarget=new Lt(this.width,this.height,{minFilter:Qa,magFilter:Qa,type:Gt,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0):(this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1);let o=+!!this.normalTexture,i=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=o,this.gtaoMaterial.defines.DEPTH_SWIZZLING=i,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=o,this.pdMaterial.defines.DEPTH_SWIZZLING=i,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&+!!e.screenSpaceRadius!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=+!!e.screenSpaceRadius,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=sr(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(e,t,o){switch(this._renderGBuffer&&(this._overrideVisibility(),this._renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(e,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(e,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case Et.OUTPUT.Off:break;case Et.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=o.texture,this.copyMaterial.blending=0,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case Et.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=0,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case Et.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=0,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case Et.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case Et.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=0,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case Et.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=o.texture,this.copyMaterial.blending=0,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(e,this.blendMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}_renderPass(e,t,o,i,r){e.getClearColor(this._originalClearColor);let l=e.getClearAlpha(),n=e.autoClear;e.setRenderTarget(o),e.autoClear=!1,i!=null&&(e.setClearColor(i),e.setClearAlpha(r||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=n,e.setClearColor(this._originalClearColor),e.setClearAlpha(l)}_renderOverride(e,t,o,i,r){e.getClearColor(this._originalClearColor);let l=e.getClearAlpha(),n=e.autoClear;e.setRenderTarget(o),e.autoClear=!1,i=t.clearColor||i,r=t.clearAlpha||r,i!=null&&(e.setClearColor(i),e.setClearAlpha(r||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=n,e.setClearColor(this._originalClearColor),e.setClearAlpha(l)}_overrideVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(o){(o.isPoints||o.isLine||o.isLine2)&&o.visible&&(o.visible=!1,t.push(o))})}_restoreVisibility(){let e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}_generateNoise(e=64){let t=new ki,o=e*e*4,i=new Uint8Array(o);for(let l=0;l<e;l++)for(let n=0;n<e;n++){let s=l,c=n;i[(l*e+n)*4]=(t.noise(s,c)*.5+.5)*255,i[(l*e+n)*4+1]=(t.noise(s+e,c)*.5+.5)*255,i[(l*e+n)*4+2]=(t.noise(s,c+e)*.5+.5)*255,i[(l*e+n)*4+3]=(t.noise(s+e,c+e)*.5+.5)*255}let r=new no(i,e,e,co,fo);return r.wrapS=wt,r.wrapT=wt,r.needsUpdate=!0,r}};nr.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};var Oi={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ne(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`},to=class ao extends $t{constructor(e,t=1,o,i){super(),this.strength=t,this.radius=o,this.threshold=i,this.resolution=e===void 0?new Ve(256,256):new Ve(e.x,e.y),this.clearColor=new Ne(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),l=Math.round(this.resolution.y/2);this.renderTargetBright=new Lt(r,l,{type:Gt,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){let f=new Lt(r,l,{type:Gt,depthBuffer:!1});f.texture.name="UnrealBloomPass.h"+d,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);let p=new Lt(r,l,{type:Gt,depthBuffer:!1});p.texture.name="UnrealBloomPass.v"+d,p.texture.generateMipmaps=!1,this.renderTargetsVertical.push(p),r=Math.round(r/2),l=Math.round(l/2)}let n=Oi;this.highPassUniforms=_t.clone(n.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new st({uniforms:this.highPassUniforms,vertexShader:n.vertexShader,fragmentShader:n.fragmentShader}),this.separableBlurMaterials=[];let s=[6,10,14,18,22];r=Math.round(this.resolution.x/2),l=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(s[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new Ve(1/r,1/l),r=Math.round(r/2),l=Math.round(l/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new ie(1,1,1),new ie(1,1,1),new ie(1,1,1),new ie(1,1,1),new ie(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=_t.clone(Wt.uniforms),this.blendMaterial=new st({uniforms:this.copyUniforms,vertexShader:Wt.vertexShader,fragmentShader:Wt.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Ne,this._oldClearAlpha=1,this._basic=new Ot,this._fsQuad=new Ta(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let o=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(o,i);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(o,i),this.renderTargetsVertical[r].setSize(o,i),this.separableBlurMaterials[r].uniforms.invSize.value=new Ve(1/o,1/i),o=Math.round(o/2),i=Math.round(i/2)}render(e,t,o,i,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();let l=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=o.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=o.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let n=this.renderTargetBright;for(let s=0;s<this.nMips;s++)this._fsQuad.material=this.separableBlurMaterials[s],this.separableBlurMaterials[s].uniforms.colorTexture.value=n.texture,this.separableBlurMaterials[s].uniforms.direction.value=ao.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[s]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[s].uniforms.colorTexture.value=this.renderTargetsHorizontal[s].texture,this.separableBlurMaterials[s].uniforms.direction.value=ao.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[s]),e.clear(),this._fsQuad.render(e),n=this.renderTargetsVertical[s];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(o),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=l}_getSeparableBlurMaterial(e){let t=[],o=e/3;for(let l=0;l<e;l++)t.push(.39894*Math.exp(-.5*l*l/(o*o))/o);let i=[],r=[];for(let l=1;l<e;l+=2){let n=t[l],s=l+1<e?t[l+1]:0,c=n+s;i.push((l*n+(l+1)*s)/c),r.push(c)}return new st({defines:{KERNEL_PAIRS:i.length},uniforms:{colorTexture:{value:null},invSize:{value:new Ve(.5,.5)},direction:{value:new Ve(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:i},gaussianWeights:{value:r}},vertexShader:`

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

				}`})}_getCompositeMaterial(e){return new st({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}};to.BlurDirectionX=new Ve(1,0),to.BlurDirectionY=new Ve(0,1);var Ze={contrast:1.05,saturation:.94,greenSat:.84,warm:.03,lift:.018,gamma:.98,sharpen:.3,sharpenLow:1.2,vignette:.06,chroma:0},Kt={contrast:1.12,saturation:1.12,greenSat:1,warm:.09,lift:0,gamma:1},Ht={samples:28,length:.55,decay:.965,strength:0,threshold:.78},Ii={uniforms:{tDiffuse:{value:null},uSun:{value:new Ve(.5,.5)},uOn:{value:0}},vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); }",fragmentShader:`
    uniform sampler2D tDiffuse; uniform vec2 uSun; uniform float uOn;
    varying vec2 vUv;
    void main() {
      vec3 c = texture2D( tDiffuse, vUv ).rgb;
      if ( uOn <= 0.0 ) { gl_FragColor = vec4( c, 1.0 ); return; }
      vec2 d = ( uSun - vUv ) * ${Ht.length.toFixed(2)} / ${Ht.samples.toFixed(1)};
      vec2 p = vUv; float w = 1.0; vec3 acc = vec3( 0.0 );
      for ( int i = 0; i < ${Ht.samples}; i ++ ) {
        p += d;
        vec3 s = texture2D( tDiffuse, p ).rgb;
        float l = dot( s, vec3( 0.2126, 0.7152, 0.0722 ) );
        acc += s * smoothstep( ${Ht.threshold.toFixed(2)}, 1.0, l ) * w;
        w *= ${Ht.decay.toFixed(3)};
      }
      gl_FragColor = vec4( c + acc * ${Ht.strength.toFixed(2)} * uOn / ${Ht.samples.toFixed(1)}, 1.0 );
    }`},Ui={uniforms:{tDiffuse:{value:null},uTexel:{value:new Ve(1/1600,1/900)},uContrast:{value:Ze.contrast},uSat:{value:Ze.saturation},uGreenSat:{value:Ze.greenSat},uWarm:{value:Ze.warm},uLift:{value:Ze.lift},uGamma:{value:Ze.gamma},uSharpen:{value:Ze.sharpen},uVignette:{value:Ze.vignette},uChroma:{value:Ze.chroma},uSpeedBlur:{value:0}},vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); }",fragmentShader:`
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
    }`};function Hi(a,e,t,o,{samples:i=4,grading:r=!0}={}){let l=a.getSize(new Ve).multiplyScalar(a.getPixelRatio()).floor(),n=new Lt(l.x,l.y,{type:Gt,samples:i}),s=new Li(a,n);s.addPass(new Ri(e,t));let c=new nr(e,t,l.x,l.y);c.updateGtaoMaterial({radius:2.5,distanceExponent:1.5,thickness:2,scale:1.2,samples:16,distanceFallOff:1}),c.updatePdMaterial({lumaPhi:10,depthPhi:2,normalPhi:3,radius:6,radiusExponent:1,rings:2,samples:16}),c.blendIntensity=.9;let d=c,f=d._overrideVisibility.bind(c);d._overrideVisibility=function(){f();let C=d._visibilityCache;e.traverse(A=>{A.userData.noAO&&A.visible&&(A.visible=!1,C.push(A))})},s.addPass(c);let p=new to(new Ve(l.x,l.y),.22,.6,2.5/o);s.addPass(p),s.addPass(new lr);let m=new ba(Ii),L=new ba(Ui);L.uniforms.uTexel.value.set(1/l.x,1/l.y),r&&s.addPass(L);let R=()=>{s.setSize(innerWidth,innerHeight);let C=a.getSize(new Ve).multiplyScalar(a.getPixelRatio());L.uniforms.uTexel.value.set(1/C.x,1/C.y)};return addEventListener("resize",R),{composer:s,gtao:c,bloom:p,grade:L,rays:m,setSun(C,A,z){m.uniforms.uSun.value.set(C,A),m.uniforms.uOn.value=z},setNight(C){let A=L.uniforms,z=1-C;A.uLift.value=Ze.lift*z+Kt.lift*C,A.uContrast.value=Ze.contrast*z+Kt.contrast*C,A.uSat.value=Ze.saturation*z+Kt.saturation*C,A.uGreenSat.value=Ze.greenSat*z+Kt.greenSat*C,A.uWarm.value=Ze.warm*z+Kt.warm*C,A.uGamma.value=Ze.gamma*z+Kt.gamma*C},render(){s.render()},dispose(){removeEventListener("resize",R),s.dispose(),n.dispose()}}}var bt=(a,e,t)=>{let o=Math.min(1,Math.max(0,(t-a)/(e-a)));return o*o*(3-2*o)},Yt=a=>new Ne(a),Bi=Yt(7031356),Gi=Yt(15922424),Wi=Yt(5795914),Vi=Yt(2637613),ji=Yt(3164218),$i=Yt(7039331),Yi=Yt(6447453),Xi=`
uniform float uCityLights;
varying vec3 vFarW;
vec2 farCover( vec2 dist, vec2 halfW, vec2 fw ) { return clamp( ( halfW + 0.5 * fw - dist ) / fw, 0.0, 1.0 ); }
`,Ki=`
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
`;function qi(a,{cityRadius:e,edge:t,seed:o=7,city:i,ringRadius:r=0,built:l=null}){let n=ii(o),s=T=>{let F=1-Math.abs(2*T-1);return 2*F*F-1},c=(T,F)=>s(n(T/3e3+41,F/3e3-17))+s(n(T/1100-5,F/1100+23))*.3,d=(T,F)=>a(T,F)+bt(t-800,t+2500,Math.max(Math.abs(T),Math.abs(F)))*(260+220*c(T,F)),f=51e3,p=350,m=null,L=null,R=new Ne,C={u:null,d:0,h:null,g:null,_:null,cx:0,cz:0},A=[],z=()=>!1,x={triangles:0,masks:0,rebuilds:0};const _=(T,F,D,h,M)=>{for(let g=0;g<M*M;g++){let y=T[3*g],b=T[3*g+2],S=F[g],w=h.getY(g),O=n(y/400+3,b/400-8);R.copy(Wi).lerp(Vi,bt(30,120,S)).lerp(ji,O*.6*bt(30,120,S)),R.lerp($i,bt(.62,.42,w)),S>2100&&(R.lerp(Bi,bt(2250,2650,S)),R.lerp(Gi,bt(2750,3150,S+300*(O-.5)))),Math.hypot(y,b)<e+60&&R.lerp(Yi,l?l(y,b):1),D[3*g]=R.r,D[3*g+1]=R.g,D[3*g+2]=R.b}},N=(T,F,D,h,M)=>{for(let g=0;g<M*M;g++){let y=T(F[3*g],F[3*g+2],D[g]);if(!y||y[0]<=0)continue;let b=y[0]*(1-bt(2300,2700,D[g])),S=(y[1]+y[2]+y[3])/3;for(let w=0;w<3;w++)h[3*g+w]+=(S+(y[w+1]-S)*.8-h[3*g+w])*b}},E=(T,F,D)=>{let{n:h,step:M,x0:g,z0:y,heights:b}=T,S=new Float32Array(h*h*3),w=new Float32Array(h*h*3),O=xo(T,z);for(let I=0;I<h;I++)for(let j=0;j<h;j++){let G=(I*h+j)*3;S[G]=g+j*M,S[G+1]=b[I*h+j],S[G+2]=y+I*M}let P=new ot;P.setAttribute("position",new Ft(S,3)),P.setIndex(new Ft(O.indices,1)),P.computeVertexNormals(),_(S,b,w,P.getAttribute("normal"),h);for(let I of A)N(I,S,b,w,h);P.setAttribute("color",new Ft(w,3));for(let I=0;I<h*h;I++)O.low[I]&&(S[3*I+1]=b[I]-8);if(Object.assign(C,{u:T,d:h,h:b,g:S,_:w,cx:F,cz:D}),x.triangles=O.indices.length/3,L){let I=L.geometry;L.geometry=P,I.dispose()}m=P};E(si(d,p,f,0,0),0,0);let k=new ke({vertexColors:!0,roughness:1,metalness:0}),u={value:0};if(i){let T=F=>F.toFixed(2);k.onBeforeCompile=F=>{F.uniforms.uCityLights=u,F.defines={...F.defines,CITY_R:T(e-100),CITY_PLAZA:T(i.plaza),CITY_PX:T(i.blockW+i.streetW),CITY_PZ:T(i.blockH+i.streetW),CITY_SW:T(i.streetW),RING_R:T(r||-1e4),RING_W:T(2.5)},F.vertexShader=F.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vFarW;`).replace("#include <begin_vertex>",`#include <begin_vertex>
	vFarW = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;`),F.fragmentShader=F.fragmentShader.replace("#include <common>","#include <common>"+Xi).replace("#include <emissivemap_fragment>","#include <emissivemap_fragment>"+Ki)},k.customProgramCacheKey=()=>"farWorldLights"}L=new tt(m,k),L.name="farWorld",L.frustumCulled=!1,L.receiveShadow=!0,L.castShadow=!1;let v=!1;return{mesh:L,info:x,recolor(T){A.push(T),N(T,C.g,C.h,C._,C.d),m.getAttribute("color").needsUpdate=!0},setLights(T,F){u.value=T*F},setDetailed(T){z=T;let F=xo(C.u,T),D=m.getAttribute("position");for(let h=0;h<C.d*C.d;h++)D.setY(h,C.h[h]-(F.low[h]?8:0));D.needsUpdate=!0,m.setIndex(new Ft(F.indices,1)),x.triangles=F.indices.length/3,x.masks++},follow(T,F){if(v||Math.abs(T-C.cx)<15e3&&Math.abs(F-C.cz)<15e3)return;v=!0;let D=Math.round(T/7e3)*7e3,h=Math.round(F/7e3)*7e3,M=Math.round(2*f/p)+1,g=new Float32Array(M*M),y=0,b=()=>{for(let S=Math.min(M,y+6);y<S;y++)for(let w=0;w<M;w++)g[y*M+w]=d(D-f+w*p,h-f+y*p);if(y<M)return setTimeout(b,0);E({x0:D-f,z0:h-f,step:p,n:M,heights:g},D,h),x.rebuilds++,v=!1};setTimeout(b,0)},dispose(){L.removeFromParent(),m.dispose(),k.dispose()}}}var Zi=["grass","forest","rock","gravel","asphalt","moss"];async function Qi(a,e){let t=await(await fetch(a)).blob(),o=await createImageBitmap(t,{resizeWidth:e,resizeHeight:e,resizeQuality:"high"}),i=new OffscreenCanvas(e,e).getContext("2d");return i.drawImage(o,0,0),o.close(),i.getImageData(0,0,e,e).data}function _o(a,e,t,o){let i=new Nr(a,e,e,t);return i.format=co,i.type=fo,i.wrapS=i.wrapT=wt,i.minFilter=Ca,i.magFilter=Pa,i.generateMipmaps=!0,i.anisotropy=8,i.colorSpace=o?pt:"",i.needsUpdate=!0,i}async function Ji(a,e,t=1024){let o=e.length,i=new Uint8Array(t*t*4*o),r=new Uint8Array(t*t*4*o),l=[];return await Promise.all(e.map(async(n,s)=>{let[c,d,f]=await Promise.all(["color","normal","rough"].map(A=>Qi(`${a}textures/${n}_${A}.jpg`,t))),p=s*t*t*4;i.set(c,p);let m=0,L=0,R=0;for(let A=0;A<t*t*4;A+=4)r[p+A]=d[A],r[p+A+1]=d[A+1],r[p+A+2]=d[A+2],r[p+A+3]=f[A],m+=c[A],L+=c[A+1],R+=c[A+2];let C=1/(t*t*255);l[s]=new Ne().setRGB(m*C,L*C,R*C,pt)})),{albedo:_o(i,t,o,!0),normalRough:_o(r,t,o,!1),mean:l}}var Ua={dark:.36,edge0:.15,edge1:.45};function Da(a,e={}){let t=e.dark??Ua.dark,o=e.edge0??Ua.edge0,i=e.edge1??Ua.edge1;return a.fragmentShader=a.fragmentShader.replace("#include <lights_physical_pars_fragment>",`#include <lights_physical_pars_fragment>
#undef RE_Direct
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float nl = dot( geometryNormal, directLight.direction );
	float lit = mix( ${t.toFixed(3)}, 1.0, smoothstep( ${o.toFixed(3)}, ${i.toFixed(3)}, nl ) );
	reflectedLight.directDiffuse += directLight.color * lit * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct RE_Direct_Toon`),a}var el=[2.6,3.2,6,2.2,4,2.4],tl=[[.37,.47,.26],[.34,.29,.2],[.86,.86,.84],[.5,.5,.52],[1,1,1],[.25,.36,.19]],al=`
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
`,ol=`
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
`,rl=`
	normal = normalize( ( viewMatrix * vec4( normalize( vTNormal ), 0.0 ) ).xyz );   // Г11: без карт нормалей — рисованная плоская земля
`,It={uSnow:{value:0},uAutumn:{value:0},uWet:{value:0}},cr={value:0},Ha=new Map;function Co(a,e=uo()){return e==="spring"&&a.id==="maple"?"sakura":e==="autumn"?a.id==="maple"?"momiji":a.kind==="broad"?"kouyou":"none":e==="winter"&&a.kind==="conifer"?"frost":"none"}function Po(a,e){if(!a?.image||e==="none")return a;let t=a.uuid+e;if(Ha.has(t))return Ha.get(t);let o=a.image,i=o.width,r=o.height,l=new OffscreenCanvas(i,r),n=l.getContext("2d");n.drawImage(o,0,0);let s=n.getImageData(0,0,i,r),c=s.data,d={sakura:[[.98,.66,.78],[.96,.8,.86]],momiji:[[.82,.12,.05],[.96,.4,.07]],kouyou:[[.95,.66,.12],[.78,.4,.08]]}[e];for(let p=0;p<c.length;p+=4){if(!c[p+3])continue;let m=(.3*c[p]+.59*c[p+1]+.11*c[p+2])/255;if(e==="frost"){for(let z=0;z<3;z++)c[p+z]+=(232-c[p+z])*.38;continue}let L=(p>>2)%i,R=(p>>2)/i,C=.5+.5*Math.sin(L/i*5.1+Math.sin(R/i*4.3)*1.7),A=.6+.9*m;for(let z=0;z<3;z++)c[p+z]=Math.min(255,(d[0][z]+(d[1][z]-d[0][z])*C)*255*A)}n.putImageData(s,0,0);let f=new mt(l);return f.colorSpace=a.colorSpace,f.flipY=a.flipY,f.wrapS=a.wrapS,f.wrapT=a.wrapT,f.needsUpdate=!0,Ha.set(t,f),f}function il(a,e=1){let t=a==="snow",o=t?7e3:9e3,i=new Float32Array(o*6),r=new Float32Array(o*2);for(let c=0;c<o;c++){let d=Math.random(),f=Math.random(),p=Math.random();i.set([d,f,p,d,f,p],c*6),r.set([0,1],c*2)}let l=new ot;l.setAttribute("position",new Ce(i,3)),l.setAttribute("aEnd",new Ce(r,1));let n=new Mr({transparent:!0,depthWrite:!1,fog:!1,uniforms:{uTime:{value:0},uCam:{value:new ie},uBright:{value:e}},vertexShader:`attribute float aEnd; uniform float uTime; uniform vec3 uCam; varying float vA;
void main() {
	float box = ${t?"46.0":"38.0"}, sp = ${t?"1.3":"11.0"};
	vec3 w = vec3( ${t?"0.35 * sin( uTime * 0.7 + position.z * 31.0 )":"1.4"}, - sp, ${t?"0.3 * cos( uTime * 0.6 + position.x * 23.0 )":"0.5"} ) * uTime;
	vec3 p = uCam + ( fract( position + ( w - uCam ) / box ) - 0.5 ) * box;
	p += aEnd * vec3( ${t?"0.0, 0.07, 0.0":"-0.04, 0.38, -0.015"} );
	vA = 1.0 - smoothstep( 0.25, 0.5, length( p - uCam ) / box );
	gl_Position = projectionMatrix * viewMatrix * vec4( p, 1.0 );
}`,fragmentShader:`uniform float uBright; varying float vA;
void main() { gl_FragColor = vec4( vec3( ${t?"0.95":"0.72, 0.76, 0.82"} ) * uBright, vA * ${t?"0.85":"0.22"} * ( 0.35 + 0.65 * uBright ) ); }`}),s=new Er(l,n);return s.frustumCulled=!1,s.name=t?"snowfall":"rainfall",{mesh:s,update(c,d){n.uniforms.uTime.value=d,n.uniforms.uCam.value.copy(c.position)},dispose(){s.removeFromParent(),l.dispose(),n.dispose()}}}var Ue={uPhotoHub:{value:12e3},uPhotoNear:{value:0},tPhoto:{value:null},uPhotoRect:{value:new Float32Array(4)},uPhotoOn:{value:0},tPhoto2:{value:null},uPhotoRect2:{value:new Float32Array(4)},uPhotoOn2:{value:0},tPhoto3:{value:null},uPhotoRect3:{value:new Float32Array(4)},uPhotoOn3:{value:0},tPhoto4:{value:null},uPhotoRect4:{value:new Float32Array(4)},uPhotoOn4:{value:0}};function ll(a,e=null){let t=new ke({roughness:1,metalness:0,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1});return t.name="worldTerrain",e&&(t.defines={CITY_PX:(e.blockW+e.streetW).toFixed(2),CITY_PZ:(e.blockH+e.streetW).toFixed(2),CITY_HS:(e.streetW/2).toFixed(2),CITY_PLAZA:e.plaza.toFixed(2),CITY_BR:e.blockRadius.toFixed(2)}),t.onBeforeCompile=o=>{o.uniforms.uSnow=It.uSnow,o.uniforms.uAutumn=It.uAutumn,o.uniforms.tPhoto=Ue.tPhoto,o.uniforms.uPhotoRect=Ue.uPhotoRect,o.uniforms.uPhotoOn=Ue.uPhotoOn,o.uniforms.tPhoto2=Ue.tPhoto2,o.uniforms.uPhotoRect2=Ue.uPhotoRect2,o.uniforms.uPhotoOn2=Ue.uPhotoOn2,o.uniforms.tPhoto3=Ue.tPhoto3,o.uniforms.uPhotoRect3=Ue.uPhotoRect3,o.uniforms.uPhotoOn3=Ue.uPhotoOn3,o.uniforms.tPhoto4=Ue.tPhoto4,o.uniforms.uPhotoRect4=Ue.uPhotoRect4,o.uniforms.uPhotoOn4=Ue.uPhotoOn4,o.uniforms.uPhotoHub=Ue.uPhotoHub,o.uniforms.uPhotoNear=Ue.uPhotoNear,o.uniforms.tAlbedo={value:a.albedo},o.uniforms.tNormalRough={value:a.normalRough},o.uniforms.tScale={value:el},o.uniforms.tTint={value:tl.map(i=>new ie(i[0],i[1],i[2]))},o.vertexShader=`attribute vec4 splatA;
attribute vec4 splatB;
varying vec3 vTWorld;
varying vec3 vTNormal;
varying vec4 vSplatA;
varying vec4 vSplatB;
`+o.vertexShader.replace("#include <fog_vertex>",`#include <fog_vertex>
	vTWorld = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;
	vTNormal = normalize( mat3( modelMatrix ) * objectNormal );
	vSplatA = splatA; vSplatB = splatB;`),Da(o,{dark:.45}),o.fragmentShader=al+o.fragmentShader.replace("#include <map_fragment>",ol).replace("#include <roughnessmap_fragment>","float roughnessFactor = roughness * tRgh;").replace("#include <normal_fragment_maps>",rl)},t.customProgramCacheKey=()=>"worldTerrainToon",t}var Se=2048,qt=a=>Math.round(a*Se);async function sl(a){return createImageBitmap(await(await fetch(a)).blob())}async function nl(a){let[e,t,o]=await Promise.all(["asphalt","gravel","grass"].map(D=>Promise.all(["color","normal","rough"].map(h=>sl(`${a}textures/${D}_${h}.jpg`))))),i=[0,1,2].map(()=>new OffscreenCanvas(Se,Se)),[r,l,n]=i.map(D=>D.getContext("2d"));r.fillStyle="#8a8a86",r.fillRect(0,0,Se,Se),l.fillStyle="rgb(128,128,255)",l.fillRect(0,0,Se,Se),n.fillStyle="rgb(230,230,230)",n.fillRect(0,0,Se,Se);let s=(D,h,M,g,y,b=1)=>{[r,l,n].forEach((S,w)=>{S.save(),S.beginPath(),S.rect(h,0,M-h,Se),S.clip(),S.globalAlpha=b;for(let O=0;O<Se;O+=y)for(let P=h;P<M;P+=g)S.drawImage(D[w],P,O,g,y);S.restore()})},c=(D,h,M,g,y=1)=>{r.save(),r.globalAlpha=y,r.fillStyle=M,r.fillRect(D,0,h-D,Se),r.restore(),l.save(),l.globalAlpha=y,l.fillStyle="rgb(128,128,255)",l.fillRect(D,0,h-D,Se),l.restore(),n.save(),n.globalAlpha=y,n.fillStyle=`rgb(${g},${g},${g})`,n.fillRect(D,0,h-D,Se),n.restore()},d=12345,f=()=>(d=d*16807%2147483647)/2147483647,[p,m]=vt.asphalt.map(qt);s(e,p,m,(m-p)/2,Se/3),s(e,p,m,Se/2,Se/2,.45),r.fillStyle="rgba(142,145,150,0.5)",r.fillRect(p,0,m-p,Se),l.fillStyle="rgba(128,128,255,0.6)",l.fillRect(p,0,m-p,Se),n.fillStyle="rgba(235,235,235,0.8)",n.fillRect(p,0,m-p,Se);for(let D=0;D<40;D++){let h=p+f()*(m-p),M=f()*Se,g=120+f()*180,y=r.createRadialGradient(h,M,0,h,M,g),b=f()<.5,S=.05+f()*.05;y.addColorStop(0,b?`rgba(40,42,46,${S})`:`rgba(230,232,236,${S})`),y.addColorStop(1,"rgba(0,0,0,0)"),r.fillStyle=y,r.fillRect(h-g,M-g,2*g,2*g)}for(let D of[.17,.33,.67,.83]){let h=p+(m-p)*D,M=(m-p)*.07,g=r.createLinearGradient(h-M,0,h+M,0);g.addColorStop(0,"rgba(255,255,255,0)"),g.addColorStop(.5,"rgba(60,60,64,0.08)"),g.addColorStop(1,"rgba(255,255,255,0)"),r.fillStyle=g,r.fillRect(h-M,0,2*M,Se)}for(let[D,h]of[[p,p+(m-p)*.14],[m,m-(m-p)*.14]]){let M=r.createLinearGradient(D,0,h,0);M.addColorStop(0,"rgba(118,108,92,0.18)"),M.addColorStop(1,"rgba(118,108,92,0)"),r.fillStyle=M,r.fillRect(Math.min(D,h),0,Math.abs(h-D),Se);let g=n.createLinearGradient(D,0,h,0);g.addColorStop(0,"rgba(245,245,245,0.6)"),g.addColorStop(1,"rgba(245,245,245,0)"),n.fillStyle=g,n.fillRect(Math.min(D,h),0,Math.abs(h-D),Se)}r.lineCap="round",n.lineCap="round";for(let D=0;D<0;D++){let h=p+30+f()*(m-p-60),M=f()*Se,g=4+Math.floor(f()*7),y=2.5+f()*3;r.strokeStyle="rgba(22,22,24,0.6)",r.lineWidth=y,n.strokeStyle="rgba(70,70,70,0.9)",n.lineWidth=y+1,r.beginPath(),r.moveTo(h,M),n.beginPath(),n.moveTo(h,M);for(let b=0;b<g;b++)h+=(f()-.5)*70,M+=(f()-.3)*60,h=Math.max(p+20,Math.min(m-20,h)),r.lineTo(h,M),n.lineTo(h,M);r.stroke(),n.stroke()}for(let D=0;D<26;D++){let h=p+40+f()*(m-p-80),M=f()*Se,g=30+f()*120,y=r.createRadialGradient(h,M,0,h,M,g),b=f()<.5?"rgba(20,20,22,0.18)":"rgba(60,58,55,0.12)";y.addColorStop(0,b),y.addColorStop(1,"rgba(0,0,0,0)"),r.fillStyle=y,r.fillRect(h-g,M-g,2*g,2*g)}let L=(D,h,M)=>{r.fillStyle=M,r.fillRect(D,0,h,Se),l.fillStyle="rgba(128,128,255,0.7)",l.fillRect(D,0,h,Se),n.fillStyle="rgba(120,120,120,0.85)",n.fillRect(D,0,h,Se);for(let g=0;g<60;g++)r.fillStyle=`rgba(110,112,116,${.08+f()*.14})`,r.fillRect(D+f()*h,f()*Se,2+f()*4,2+f()*8)};L(p+8+11,17,"#ececea"),L(m-8-28,17,"#ececea"),L((p+m)/2-9,17,"#e3c440");let[R,C]=vt.curb.map(qt);c(R,C,"#efefea",150);for(let D=0;D<10;D++)r.fillStyle=D%2?"#e4e4df":"#a8453a",r.fillRect(R,D*Se/10,C-R,Se/10);let A=(D,h,M,g)=>{let[y,b]=vt[D].map(qt);s(h,y,b,Se/4,Se/4),M&&(r.fillStyle=M,r.globalAlpha=g,r.fillRect(y,0,b-y,Se),r.globalAlpha=1)};A("gravel",t,"#5f5d58",.72),A("dirt",t,"#5a4a3a",.4),A("sand",t,"#cfc3a6",.4),A("grass",o);let[z,x]=vt.concrete.map(qt);c(z,x,"#a3a29c",215);for(let D=0;D<9e3;D++){let h=110+f()*90;r.fillStyle=`rgba(${h},${h},${h-4},0.25)`,r.fillRect(z+f()*(x-z),f()*Se,2,2)}for(let D=0;D<40;D++)r.fillStyle="rgba(60,62,55,0.10)",r.fillRect(z+f()*(x-z),f()*Se,3+f()*10,40+f()*200);let[_,N]=vt.rail.map(qt),[E,k]=vt.post.map(qt);c(_,N,"#d4d4cf",90),c(E,k,"#8e8f8e",160),c(_,N,"#dcdcd7",150);for(let D=0;D<700;D++)r.fillStyle="rgba(105,100,88,0.13)",r.fillRect(_+f()*(N-_),f()*Se,2,20+f()*140);let u=(D,h)=>{let M=new mt(D);return M.colorSpace=h?pt:"",M.wrapS=kr,M.wrapT=wt,M.anisotropy=8,M};for(let D of[e,t,o])for(let h of D)h.close();let v=new ke({map:u(i[0],!0),normalMap:u(i[1],!1),roughnessMap:u(i[2],!1),roughness:1,metalness:0});v.name="worldRoad";let[T,F]=vt.concrete;return v.onBeforeCompile=D=>{D.uniforms.uWet=It.uWet,D.uniforms.uSnowR=It.uSnow,D.uniforms.uRdLamp=cr,D.vertexShader=`varying vec3 vRWorld;
varying vec3 vRNormal;
varying float vRdLanes;
`+D.vertexShader.replace("#include <uv_vertex>",`#include <uv_vertex>
	// скоростная дорога: число полос — в развёртке v (+4096 на полосу, chunks.js hwLanes)
	vRdLanes = 0.0;
	#ifdef USE_MAP
	if ( vMapUv.y >= 4096.0 ) { vRdLanes = floor( vMapUv.y / 4096.0 ); vMapUv.y -= vRdLanes * 4096.0; }
	#endif
	#ifdef USE_NORMALMAP
	vNormalMapUv.y -= floor( vNormalMapUv.y / 4096.0 ) * 4096.0;
	#endif
	#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv.y -= floor( vRoughnessMapUv.y / 4096.0 ) * 4096.0;
	#endif`).replace("#include <fog_vertex>",`#include <fog_vertex>
	vRWorld = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;
	vRNormal = normalize( mat3( modelMatrix ) * objectNormal );`),D.fragmentShader=`varying vec3 vRWorld;
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
`+D.fragmentShader.replace("#include <opaque_fragment>",`outgoingLight += diffuseColor.rgb * vec3( ${St.color.join(", ")} ) * rdLamp * uRdLamp;
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
	if ( vMapUv.x < ${(vt.asphalt[1]-.001).toFixed(4)} ) {
		float s = vMapUv.y * 10.0, lat = ( vMapUv.x - ${vt.asphalt[0].toFixed(4)} - 0.004 ) / ${(vt.asphalt[1]-vt.asphalt[0]-.008).toFixed(4)} - 0.5;
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
		if ( vMapUv.x > ${T.toFixed(4)} && vMapUv.x < ${F.toFixed(4)} && abs( kn.y ) < 0.35 ) {
			vec2 hz = normalize( vec2( - kn.z, kn.x ) + 1e-5 );
			float s = dot( vRWorld.xz, hz ), y = vRWorld.y;
			vec2 q = vec2( s + y, s - y ) * 0.70711 / 0.42, cell = floor( q ), f = fract( q );
			float g = min( min( f.x, 1.0 - f.x ), min( f.y, 1.0 - f.y ) ), grout = 1.0 - smoothstep( 0.025, 0.06, g );
			float shade = 0.82 + 0.26 * fract( sin( dot( cell, vec2( 12.9898, 78.233 ) ) ) * 43758.5453 );
			float stain = smoothstep( 0.0, 1.0, fract( sin( dot( floor( vec2( s / 3.0, 0.0 ) ), vec2( 7.13, 1.7 ) ) ) * 9182.31 ) ) * 0.12;
			vec3 block = vec3( 0.56, 0.555, 0.53 ) * ( shade - stain ) * ( 0.94 + 0.06 * smoothstep( 0.06, 0.25, g ) );
			diffuseColor.rgb = mix( block, vec3( 0.25, 0.25, 0.24 ), grout );
		}
	}`)},v.customProgramCacheKey=()=>"worldRoadHw",v}function cl(a,{lights:e=0,lampGain:t=1}={}){let o=new lt;o.name="landmarks";let i=new ke({color:9082790,roughness:.4,metalness:.15}),r=new Ot({color:new Ne(1,.08,.05).multiplyScalar(e>0?6*t:1),toneMapped:e>0}),l=[];for(let n of Zr(a)){let s=[],c=[];for(let m=0;m<n.boxes.length;m+=8){let L=new Jt(n.boxes[m+3],n.boxes[m+4],n.boxes[m+5]).toNonIndexed();L.rotateY(n.boxes[m+6]),L.translate(n.boxes[m],n.boxes[m+1],n.boxes[m+2]);let R=L.getAttribute("position");for(let C=0;C<R.count;C++)c.push(s.length/3),s.push(R.getX(C),R.getY(C),R.getZ(C));L.dispose()}let d=new ot;d.setAttribute("position",new Ce(s,3)),d.setIndex(c),d.computeVertexNormals(),d.computeBoundingSphere();let f=new tt(d,i);f.castShadow=!1,f.receiveShadow=!1,o.add(f);let p=new tt(new Qo(1.6,8,6),r);p.position.set(n.top[0],n.top[1]+1.6,n.top[2]),o.add(p),l.push({mesh:f,tile:Qr(n.x,n.z)})}return{group:o,setDetailed(n){for(let s of l)s.mesh.visible=!n(s.tile)},dispose(){for(let n of o.children)n.geometry.dispose();i.dispose(),r.dispose()}}}var jt={sugi:[0,.5,.5,1],broad:[.5,.5,1,1],sasa:[0,0,.5,.5],sugi2:[.5,0,1,.5]},Ba=[{id:"sugi",kind:"conifer"},{id:"sugi2",kind:"conifer"},{id:"maple",kind:"broad"},{id:"oak",kind:"broad"}],We={step:15,nearBand:150,stepMixed:9,stepCedar:6,cedarJitter:.15,mixedJitter:.7,sugiH:[22,34],broadH:[12,20],sasaStep:6,sasaBand:[2,35],sasaFar:20,tint:{sugi:[[.4,.5],[.46,.56],[.38,.48]],sugi2:[[.44,.54],[.5,.6],[.4,.5]],broad:[[.5,.62],[.52,.62],[.38,.48]],sasa:[[.26,.33],[.5,.58],[.2,.27]],take:[[.3,.37],[.44,.52],[.22,.28]]},minNy:.55},Te=(a,e,t)=>{let o=a*374761393+e*668265263+t*2147483647|0;return o=Math.imul(o^o>>>13,1274126177),((o^o>>>16)>>>0)/4294967296};function aa(){let a=[],e=[],t=[],o=[],i=[],r=[];return{P:a,N:e,U:t,I:o,C:i,groups:r,quad(l,n,s,c,d,f,p=1){let m=a.length/3;for(let[L,R]of[[l,[d[0],d[1]]],[n,[d[2],d[1]]],[s,[d[2],d[3]]],[c,[d[0],d[3]]]]){a.push(L.x,L.y,L.z),t.push(R[0],R[1]);let C=typeof f=="function"?f(L):f;e.push(C.x,C.y,C.z);let A=typeof p=="function"?p(L):p;i.push(A,A,A)}o.push(m,m+1,m+2,m,m+2,m+3)},group(l,n){r.push([l,o.length-l,n])},geometry(){let l=new ot;l.setAttribute("position",new Ce(a,3)),l.setAttribute("normal",new Ce(e,3)),l.setAttribute("uv",new Ce(t,2)),l.setAttribute("color",new Ce(i,3)),l.setIndex(o);for(let[n,s,c]of r)l.addGroup(n,s,c);return l.computeBoundingSphere(),l}}}var me=(a,e,t)=>new ie(a,e,t);function _a(a,e,t,o,i,r,l,n=0,s=0,c=0,d=0){for(let f=0;f<r;f++){let p=f/r*Math.PI*2,m=(f+1)/r*Math.PI*2,L=(A,z,x,_)=>me(n+c*_+Math.cos(A)*z,x,s+d*_+Math.sin(A)*z),R=A=>me(Math.cos(A),.2,Math.sin(A)).normalize(),C=a.P.length/3;for(let[A,z,x,_,N,E]of[[p,o,e,0,f/r,0],[m,o,e,0,(f+1)/r,0],[m,i,t,1,(f+1)/r,l],[p,i,t,1,f/r,l]]){let k=L(A,z,x,_),u=R(A);a.P.push(k.x,k.y,k.z),a.N.push(u.x,u.y,u.z),a.U.push(N*2,E),a.C.push(1,1,1)}a.I.push(C,C+2,C+1,C,C+3,C+2)}}function To(a){let e=aa(),t=a?jt.sugi2:jt.sugi;_a(e,0,.97,.016,.003,6,9),e.group(0,0);let o=e.I.length;for(let i=0;i<12;i++){let r=(i+.5)/12,l=.4+.6*r,n=.09*(1-r)**.75+.014;for(let s=0;s<4;s++){let c=s/4*Math.PI*2+i*2.39996+(Te(i,s,41)-.5)*.8,d=Math.cos(c),f=Math.sin(c),p=.85+.3*Te(i,s,43),m=n*.05,L=n*1.05*p,R=L-m,C=-R*.18,A=me(d*m,l-R*.2,f*m),z=me(d*L,l-R*.2+C,f*L),x=me(-f,0,d).multiplyScalar(R*.55),_=me(0,R*.55,0),N=x.clone().multiplyScalar(.707).addScaledVector(_,.707),E=x.clone().multiplyScalar(.707).addScaledVector(_,-.707),k=T=>me(T.x,(T.y-l)*.6+n*.6,T.z).normalize(),u=T=>(.35+.65*Math.min(1,Math.hypot(T.x,T.z)/Math.max(.001,L)))*(.75+.25*r),v=z.clone().sub(A).multiplyScalar(.12);e.quad(A.clone().sub(x),A.clone().add(x),z.clone().add(x),z.clone().sub(x),t,k,u),e.quad(A.clone().add(v).sub(N),A.clone().add(v).add(N),z.clone().add(N),z.clone().sub(N),t,k,u),e.quad(A.clone().sub(v).sub(E),A.clone().sub(v).add(E),z.clone().add(E),z.clone().sub(E),t,k,u)}}for(let i of[0,Math.PI/2]){let r=me(Math.cos(i),0,Math.sin(i)).multiplyScalar(.022);e.quad(me(-r.x,.92,-r.z),me(r.x,.92,r.z),me(r.x,1.03,r.z),me(-r.x,1.03,-r.z),t,me(0,1,0))}return e.group(o,1),e.geometry()}function fl(){let a=aa();_a(a,0,.55,.022,.012,6,4);for(let t=0;t<3;t++){let o=t*2.094+.4;_a(a,.45,.72,.011,.004,4,2,0,0,Math.cos(o)*.16,Math.sin(o)*.16)}a.group(0,0);let e=a.I.length;for(let[t,o,i,r,l]of[[0,.7,0,.26,.22],[.14,.6,.08,.2,.17],[-.12,.62,-.1,.19,.16]])for(let n=0;n<34;n++){let s=me(t,o,i),c=me(r,l,r),d=1-2*(n+.5)/34,f=Math.sqrt(1-d*d),p=n*2.39996+t*7,m=me(Math.cos(p)*f,d,Math.sin(p)*f),L=me(s.x+m.x*c.x*.85,s.y+m.y*c.y*.85,s.z+m.z*c.z*.85),R=new ie().crossVectors(m,Math.abs(m.y)>.9?me(1,0,0):me(0,1,0)).normalize(),C=new ie().crossVectors(m,R).normalize(),A=Te(n,3,7)*Math.PI,z=.13,x=R.clone().multiplyScalar(Math.cos(A)).addScaledVector(C,Math.sin(A)).multiplyScalar(z),_=C.clone().multiplyScalar(Math.cos(A)).addScaledVector(R,-Math.sin(A)).multiplyScalar(z);a.quad(L.clone().sub(x).sub(_),L.clone().add(x).sub(_),L.clone().add(x).add(_),L.clone().sub(x).add(_),jt.broad,N=>N.clone().sub(s).normalize(),.4+.6*(L.y-.4)/.55)}return a.group(e,1),a.geometry()}function dl(){let a=aa(),e=[];for(let o=0;o<7;o++){let i=o*2.39996,r=o?.012+.03*Te(o,5,71):0,l=Math.cos(i)*r,n=Math.sin(i)*r,s=(Te(o,6,72)-.5)*.12,c=(Te(o,7,73)-.5)*.12,d=.82+.18*Te(o,8,74);_a(a,0,d,.0055,.0035,5,1,l,n,s,c),e.push([l,n,s,c,d])}a.group(0,0);let t=a.I.length;for(let[o,i,r,l,n]of e)for(let s=0;s<10;s++){let c=(.4+.6*(s+.5)/10)*n,d=s*2.39996+o*40,f=Math.cos(d),p=Math.sin(d),m=me(o+r*(c/n),c,i+l*(c/n)),L=.09+.06*Te(s,9,75),R=me(m.x+f*L*1.1,c-L*.35,m.z+p*L*1.1),C=me(-p,0,f).multiplyScalar(L*.55);a.quad(m.clone().sub(C),m.clone().add(C),R.clone().add(C),R.clone().sub(C),jt.sasa,A=>me(f,.6,p).normalize(),.55+.45*(c/n)),a.quad(m.clone().add(me(0,L*.4,0)),m.clone().sub(me(0,L*.4,0)),R.clone().sub(me(0,L*.4,0)),R.clone().add(me(0,L*.4,0)),jt.sasa,A=>me(f,.6,p).normalize(),.55+.45*(c/n))}return a.group(t,1),a.geometry()}function ul(){let a=aa(),e=me(0,.55,0);for(let t=0;t<3;t++){let o=t/3*Math.PI,i=me(Math.cos(o)*1.25,0,Math.sin(o)*1.25);a.quad(me(-i.x,-.05,-i.z),me(i.x,-.05,i.z),me(i.x,.95,i.z),me(-i.x,.95,-i.z),jt.sasa,r=>me(r.x,(r.y-e.y)*.7+.5,r.z).normalize(),r=>.4+.6*Math.max(0,r.y)/.95)}return a.group(0,1),a.geometry()}function hl(){let a=aa();for(let e=0;e<5;e++){let t=e/5*Math.PI*2+.3,o=Math.cos(t),i=Math.sin(t),r=me(-i,0,o).multiplyScalar(.42),l=me(o*.05,.05,i*.05),n=me(o*.95,.55,i*.95);a.quad(l.clone().sub(r),l.clone().add(r),n.clone().add(r),n.clone().sub(r),jt.sasa,s=>me(s.x,.8,s.z).normalize(),s=>.4+.6*Math.hypot(s.x,s.z))}return a.group(0,1),a.geometry()}function pl(a,e=!0){let t=aa();for(let o of e?[0]:[0,Math.PI/2]){let i=me(Math.cos(o)*a/2,0,Math.sin(o)*a/2);t.quad(me(-i.x,0,-i.z),me(i.x,0,i.z),me(i.x,1,i.z),me(-i.x,1,-i.z),[0,0,1,1],r=>me(r.x*1.5,.6,r.z*1.5).normalize())}return t.group(0,0),t.geometry()}var xa={swayAmp:.007,swaySpeed:1.1,flutterAmp:.0025,flutterSpeed:3.5};function Ga(a,e={value:0},t=1,o={}){let i=o.wind!==!1,r=!!o.crownNormals,l=!!o.billboard,n=o.atlasN||0,s={value:new ie(+(t*.6).toFixed(3)-(t*.25).toFixed(3),+(1/t).toFixed(5),+(i?t:0).toFixed(3))};return a.onBeforeCompile=c=>{c.uniforms.uTime=e,c.uniforms.uLeaf=s,Da(c,{dark:.55}),r&&(c.vertexShader=c.vertexShader.replace("#include <beginnormal_vertex>",`#include <beginnormal_vertex>
	objectNormal = normalize( position - vec3( 0.0, uLeaf.x, 0.0 ) );`)),c.vertexShader=`uniform float uTime;
uniform vec3 uLeaf;
`+c.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
	{
		#ifdef USE_INSTANCING
		vec3 iw = ( modelMatrix * instanceMatrix * vec4( 0.0, 0.0, 0.0, 1.0 ) ).xyz;
		#else
		vec3 iw = vec3( 0.0 );
		#endif
		float ph = uTime * ${xa.swaySpeed.toFixed(2)} + iw.x * 0.13 + iw.z * 0.09;
		float hgt = clamp( position.y * uLeaf.y, 0.0, 1.0 );
		vec2 sway = vec2( sin( ph ), sin( ph * 0.8 + 1.3 ) ) * ${xa.swayAmp.toFixed(4)} * hgt * hgt;
		float fl = sin( uTime * ${xa.flutterSpeed.toFixed(2)} + position.x * 37.0 + position.z * 29.0 + position.y * 11.0 ) * ${xa.flutterAmp.toFixed(4)} * hgt;
		transformed.xz += ( sway + fl ) * ${i?"uLeaf.z":"0.0"};
	}`),l&&n&&(c.vertexShader=`attribute float aSlot;
`+c.vertexShader.replace("#include <uv_vertex>",`#include <uv_vertex>
	#ifdef USE_MAP
	vMapUv.x = ( aSlot + clamp( vMapUv.x, 0.004, 0.996 ) ) / ${n.toFixed(1)};
	#endif`)),l&&(c.vertexShader=c.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
	{
		#ifdef USE_INSTANCING
		vec3 bo = ( modelMatrix * instanceMatrix * vec4( 0.0, 0.0, 0.0, 1.0 ) ).xyz;
		#else
		vec3 bo = ( modelMatrix * vec4( 0.0, 0.0, 0.0, 1.0 ) ).xyz;
		#endif
		vec2 bd = normalize( cameraPosition.xz - bo.xz + vec2( 1e-5, 0.0 ) ), br = vec2( bd.y, - bd.x );
		transformed = vec3( position.x * br.x, position.y, position.x * br.y );
		objectNormal = normalize( vec3( bd.x, 0.6, bd.y ) + vec3( br.x, 0.0, br.y ) * position.x * 1.5 );
	}`)),c.fragmentShader=c.fragmentShader.replace("#include <normal_fragment_begin>",`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
	vec3 normal = normalize( vNormal );
	vec3 nonPerturbedNormal = normal;`)},a.customProgramCacheKey=()=>"worldFoliageToon"+(i?"":"_still")+(r?"_crown":"")+(l?"_bb"+n:""),a}async function ml(a,e){let t=async h=>{let M=await createImageBitmap(await(await fetch(h)).blob()),g=new OffscreenCanvas(M.width,M.height),y=g.getContext("2d");return y.drawImage(M,0,0),M.close(),y.getImageData(0,0,g.width,g.height)},[o,i]=await Promise.all([t(`${e}textures/foliage_color.jpg`),t(`${e}textures/foliage_alpha.png`)]);for(let h=0;h<o.data.length;h+=4)o.data[h+3]=i.data[h];let r=new no(o.data,o.width,o.height,co);r.flipY=!1,r.colorSpace=pt,r.generateMipmaps=!0,r.minFilter=Ca,r.magFilter=Pa,r.anisotropy=8,r.needsUpdate=!0;let l=new Tr,n=(h,M)=>new Promise(g=>l.load(`${e}textures/cedar_bark_${h}.jpg`,y=>{y.colorSpace=M?pt:"",y.wrapS=y.wrapT=wt,y.anisotropy=4,g(y)})),[s,c,d]=await Promise.all([n("color",!0),n("normal",!1),n("rough",!1)]),f=new ke({map:s,normalMap:c,roughnessMap:d,roughness:1,color:3813417,vertexColors:!0});f.name="worldBark",f.onBeforeCompile=h=>{Da(h),h.vertexShader=h.vertexShader.replace("#include <color_vertex>",`#include <color_vertex>
#ifdef USE_INSTANCING_COLOR
	vColor.rgb = vec3( 1.0 );
#endif`)},f.customProgramCacheKey=()=>"worldBarkNoTint";let p=new ke({roughness:.85,color:5204522,vertexColors:!0});p.name="worldBambooCulm",p.onBeforeCompile=f.onBeforeCompile,p.customProgramCacheKey=()=>"worldBambooCulm";let m={value:0},L=Ga(new ke({map:r,alphaTest:.3,alphaToCoverage:!0,side:2,roughness:1,metalness:0,vertexColors:!0}),m);L.name="worldFoliage";let R={sugi:To(0),sugi2:To(1),broad:fl(),sasa:ul(),fern:hl(),take:dl()};for(let h of Object.values(R)){let M=h.getAttribute("uv"),g=h.groups.find(S=>S.materialIndex===1);if(!g)continue;let y=h.getIndex(),b=new Set;for(let S=g.start;S<g.start+g.count;S++){let w=y.getX(S);b.has(w)||(b.add(w),M.setY(w,1-M.getY(w)))}}let C=h=>new Ne((h[0][0]+h[0][1])/2,(h[1][0]+h[1][1])/2,(h[2][0]+h[2][1])/2),A=[];for(let[h,M,g,y]of[["sugi",R.sugi,.22,We.tint.sugi],["broad",R.broad,.7,We.tint.broad]])A.push({key:h,w:g,obj:new tt(M,[new Ot({map:s,color:3352863}),new Ot({map:r,alphaTest:.45,side:2,color:C(y),vertexColors:!0})])});let z={};if(Ba.length){let{GLTFLoader:h}=await qr(async()=>{let{GLTFLoader:y}=await Cr(()=>import("./main-JYttHjEr.js").then(b=>b.af),__vite__mapDeps([0,1,2]),import.meta.url).then(b=>b.P);return{GLTFLoader:y}},[],import.meta.url),M=new h,g=async y=>{try{return await M.loadAsync(y)}catch(b){let S=await fetch(y+".json").catch(()=>null);if(!S?.ok)throw b;let w=Uint8Array.from(atob((await S.json()).glb),O=>O.charCodeAt(0));return M.parseAsync(w.buffer,y.slice(0,y.lastIndexOf("/")+1))}};await Promise.all(Ba.map(async y=>{let b,S=null;try{b=await g(`${e}world/trees/${y.id}.glb`)}catch{console.warn("лес: нет модели дерева",y.id);return}try{S=await g(`${e}world/trees/${y.id}_lo.glb`)}catch{}let w=b.scene;w.updateMatrixWorld(!0);let O=new Ko().setFromObject(w),P=O.max.y-O.min.y,I=Math.max(O.max.x-O.min.x,O.max.z-O.min.z),j=[],G=[],V=new lt,$=(Q,J,re,fe=!0)=>{let ue=new Map;Q.traverse(Pe=>{let ve=Pe;if(!ve.isMesh)return;let se=ve.geometry.clone().applyMatrix4(ve.matrixWorld),xe=Array.isArray(ve.material)?ve.material[0]:ve.material,Ae=xe.alphaTest>0||xe.side===2;for(let be of Object.keys(se.attributes))be!=="position"&&be!=="normal"&&be!=="uv"&&se.deleteAttribute(be);se.attributes.normal||se.computeVertexNormals(),se.attributes.uv||se.setAttribute("uv",new Ft(new Float32Array(se.attributes.position.count*2),2));let De=`${Ae?"L":"B"}:${xe.map?xe.map.uuid:"-"}:${xe.normalMap?xe.normalMap.uuid:"-"}:${xe.color?xe.color.getHex():0}`,ze=ue.get(De);ze?ze.geos.push(se):ue.set(De,{geos:[se],src:xe,leafy:Ae})});for(let{geos:Pe,src:ve,leafy:se}of ue.values()){if(se&&y.kind==="broad"&&uo()==="winter")continue;let xe=Pe.some(be=>!!be.index)&&Pe.some(be=>!be.index)?Pe.map(be=>be.index?be.toNonIndexed():be):Pe,Ae=xe.length>1&&Jr(xe,!1)||xe[0];if(xe.length>1&&Ae!==xe[0])for(let be of xe)be.dispose();let De=new ke({map:(se?Po(ve.map,Co(y)):ve.map)||null,normalMap:se?null:ve.normalMap||null,color:se?(ve.color?ve.color.clone():new Ne(1,1,1)).multiplyScalar(.74):new Ne(.6,.55,.5),roughness:.95,metalness:0,side:se?2:0,alphaTest:se?.3:0,alphaToCoverage:se});if(se?Ga(De,m,P,{wind:fe,crownNormals:!0}):(De.onBeforeCompile=f.onBeforeCompile,De.customProgramCacheKey=()=>"worldBarkNoTint"),De.name=`worldTree_${y.id}_${se?"leaf":"bark"}${fe?"":"_lo"}`,J.push({geo:Ae,mat:De,leafy:se}),!re)continue;let ze=new tt(Ae,new Ot({map:(se?Po(ve.map,Co(y)):ve.map)||null,color:ve.color?ve.color.clone():new Ne(1,1,1),alphaTest:se?.4:0,side:se?2:0}));V.add(ze)}};$(w,j,!0),S&&(S.scene.updateMatrixWorld(!0),$(S.scene,G,!1,!1)),V.scale.setScalar(1/P),z[y.id]={...y,parts:j,loParts:G.length?G:j,height:P,width:I},A.push({key:y.id,obj:V,w:I/P})}))}let x=new Lt(256*A.length,512,{type:fo});x.texture.colorSpace="";let _={},N={};{let h=a.getRenderTarget(),M=a.getClearColor(new Ne),g=a.getClearAlpha(),y=a.autoClear;a.setRenderTarget(x),a.setClearColor(2899748,0),a.clear(),a.autoClear=!1,A.forEach(({key:b,obj:S,w},O)=>{_[b]=O,N[b]=w;let P=new qo;P.add(S);let I=new Zo(-w/2,w/2,1.02,-.02,-2,2);I.position.set(0,0,1),I.lookAt(0,0,0),x.viewport.set(O*256,0,256,512),a.setRenderTarget(x),a.render(P,I),S.traverse(j=>{let G=j.material;G&&(Array.isArray(G)?G:[G]).forEach(V=>V.dispose())})}),x.viewport.set(0,0,256*A.length,512),a.autoClear=y,a.setRenderTarget(h),a.setClearColor(M,g)}let E=Ga(new ke({map:x.texture,alphaTest:.5,side:0,roughness:.9}),m,1,{billboard:!0,atlasN:A.length});E.name="worldTreeFar";let k={rt:x,mat:E,slot:_,width:N,n:A.length,geo:pl(1)},u=Ba.filter(h=>z[h.id]),v={conifer:u.filter(h=>h.kind==="conifer").map(h=>h.id),broad:u.filter(h=>h.kind==="broad").map(h=>h.id)},T=new Qo(1,6,4),F=new Ot({colorWrite:!1,depthWrite:!1}),D=new Xo;return D.name="worldInstDepth",F.name="worldCrownShadow",{geo:R,imp:k,bark:f,culm:p,foliage:L,models:z,modelKinds:v,crownGeo:T,crownMat:F,instDepth:D,setTime(h){m.value=h},dispose(){for(let h of[...Object.values(R),k.geo])h.dispose();for(let h of[r,s,c,d])h.dispose();T.dispose(),F.dispose(),D.dispose(),f.dispose(),p.dispose(),L.dispose(),k.rt.dispose(),k.mat.dispose();for(let h of Object.values(z))for(let M of[...h.parts,...h.loParts===h.parts?[]:h.loParts])M.geo.dispose(),M.mat.dispose()}}}function*vl(a,e,t=null){let o=a.terrain,[i,,r]=a.origin,l={sugi:[],sugi2:[],broad:[],sasa:[],fern:[],take:[]},n=(x,_,N)=>x[Math.floor(Te(Math.floor(_*2),Math.floor(N*2),88)*x.length)%x.length],s=(x,_)=>{let N=Math.min(o.nx-1,Math.max(0,Math.round(x/o.cell))),E=Math.min(o.nz-1,Math.max(0,Math.round(_/o.cell)));return o.edge[E*o.nx+N]},c=(x,_)=>{let N=Math.min(o.nx-1,Math.max(0,Math.round(x/o.cell))),E=Math.min(o.nz-1,Math.max(0,Math.round(_/o.cell)));return o.normals[3*(E*o.nx+N)+1]},d=(x,_,N)=>{let E=x+i,k=_+r,u=e.cedar(E,k)>Te(Math.floor(E*7),Math.floor(k*7),77),v=fa(o,x,_)-.2,T=e.alpine?e.alpine(E,k):0;if(u||T>.5){let F=We.sugiH[0]+(We.sugiH[1]-We.sugiH[0])*Te(Math.floor(E*3),Math.floor(k*3),9);if(t?.broad?.length&&Te(Math.floor(E*5),Math.floor(k*5),91)<.25*(1-T)){let D=n(t.broad,E,k);(l[D]||=[]).push(x,v,_,F*.6,N)}else if(t?.conifer?.length){let D=n(t.conifer,E,k);(l[D]||=[]).push(x,v,_,F,N)}else(Te(Math.floor(E),Math.floor(k),21)<.2?l.sugi2:l.sugi).push(x,v,_,F,N)}else if(Te(Math.floor(E*4),Math.floor(k*4),92)<.32){let F=We.sugiH[0]*.85+(We.sugiH[1]-We.sugiH[0])*.7*Te(Math.floor(E*3),Math.floor(k*3),93);t?.conifer?.length?(l[n(t.conifer,E,k)]||=[]).push(x,v,_,F,N):(Te(Math.floor(E),Math.floor(k),94)<.45?l.sugi2:l.sugi).push(x,v,_,F,N)}else{let F=We.broadH[0]+(We.broadH[1]-We.broadH[0])*Te(Math.floor(E*3),Math.floor(k*3),11);if(t?.broad?.length){let D=n(t.broad,E,k);(l[D]||=[]).push(x,v,_,F,N)}else l.broad.push(x,v,_,F,N)}},f=a.trees;for(let x=0;x<f.length;x+=5)d(f[x],f[x+2],f[x+4]);yield;function*p(x,_,N,E){let k=Math.ceil(x*1.5),u=Math.floor((i-k)/x),v=Math.floor((r-k)/x),T=Math.ceil((500+2*k)/x)+1;for(let F=0;F<T;F++){for(let D=0;D<T;D++){let h=u+D,M=v+F,g=(h+.5-_/2+_*Te(h,M,1))*x,y=(M+.5-_/2+_*Te(M,h,2))*x;if(E){let O=Math.floor(g/420)*420+210,P=Math.floor(y/420)*420+210,I=Te(Math.floor(g/420),Math.floor(y/420),57)*Math.PI,j=Math.cos(I),G=Math.sin(I),V=g-O,$=y-P;g=O+V*j-$*G,y=P+V*G+$*j}let b=g-i,S=y-r;if(b<0||S<0||b>=500||S>=500)continue;let w=s(b,S);w<7||c(b,S)<We.minNy||!N(w,g,y)||Te(h,M,3)>e.density(g,y)||d(b,S,6.283*Te(M,h,4))}yield}}let m=x=>x<We.nearBand,L=(x,_)=>e.cedar(x,_)>.5;if(yield*p(We.step,.7,x=>!m(x),!1),yield*p(We.stepMixed,We.mixedJitter,(x,_,N)=>m(x)&&!L(_,N),!1),yield*p(We.stepCedar,We.cedarJitter,(x,_,N)=>m(x)&&L(_,N),!0),e.bamboo){let x=2.6,_=Math.ceil(i/x),N=Math.ceil(r/x),E=Math.round(500/x);for(let k=0;k<E;k++){for(let u=0;u<E;u++){let v=_+u,T=N+k,F=(v+.8*Te(v,T,51))*x-i,D=(T+.8*Te(T,v,52))*x-r;if(F<0||D<0||F>=500||D>=500)continue;let h=s(F,D);h<5||h>45||c(F,D)<.7||Te(v,T,53)>e.bamboo(F+i,D+r)||l.take.push(F,fa(o,F,D)-.15,D,9+6*Te(v,T,54),6.283*Te(T,v,55))}(k&15)==15&&(yield)}}let R=We.sasaStep,C=Math.ceil(i/R),A=Math.ceil(r/R),z=Math.round(500/R);for(let x=0;x<z;x++){for(let _=0;_<z;_++){let N=C+_,E=A+x,k=(N+Te(N,E,31))*R-i,u=(E+Te(E,N,32))*R-r;if(k<0||u<0||k>=500||u>=500)continue;let v=s(k,u);v<We.sasaBand[0]||v>We.sasaBand[1]||c(k,u)<.6||v>We.sasaFar&&(N&1||E&1)||Te(N,E,33)>e.density(k+i,u+r)*.95||(Te(N,E,36)<.5?l.sasa:l.fern).push(k,fa(o,k,u)-.05,u,.55+.4*Te(N,E,34),6.283*Te(E,N,35))}(x&7)==7&&(yield)}return l}var Ye={cells:4,nearIn:120,nearOut:160,perFrame:2,modelCells:16,modelIn:40,modelOut:62,fullIn:7,fullOut:16,move:2,viewNear:45,viewTurn:.985},Vt={near:1,shadows:!0};function Do(a,e){let t=new lt;t.name="forest";let o=Ye.cells,i=500/o,r=(H,Y)=>Math.min(o-1,Math.max(0,Math.floor(Y/i)))*o+Math.min(o-1,Math.max(0,Math.floor(H/i))),l=Ye.modelCells,n=500/l,s=(H,Y)=>Math.min(l-1,Math.max(0,Math.floor(Y/n)))*l+Math.min(l-1,Math.max(0,Math.floor(H/n))),c=new Ke,d=new ea,f=new ie,p=new ie,m=new ie(0,1,0),L=new Ke().makeScale(0,0,0),R=(H,Y,ee=1)=>c.compose(f.set(H[5*Y],H[5*Y+1],H[5*Y+2]),d.setFromAxisAngle(m,H[5*Y+4]),p.setScalar(H[5*Y+3]*ee)),C=(H,Y,ee)=>{let te=H[5*Y+3];return c.compose(f.set(H[5*Y],H[5*Y+1],H[5*Y+2]),d.identity(),p.set(te*ee,te,te*ee))},A=new Ne,z=(H,Y,ee)=>{let te=We.tint[H],he=Te(Math.floor(Y[5*ee]*3),Math.floor(Y[5*ee+2]*3),61),ye=Te(Math.floor(Y[5*ee+2]*3),Math.floor(Y[5*ee]*3),62);return A.setRGB(te[0][0]+(te[0][1]-te[0][0])*he,te[1][0]+(te[1][1]-te[1][0])*ye,te[2][0]+(te[2][1]-te[2][0])*he)},x=(H,Y,ee=!0)=>(H.castShadow=Y,H.receiveShadow=ee,H.userData.noAO=!0,H.matrixAutoUpdate=!1,H.matrixWorldNeedsUpdate=!0,H.renderOrder=1,H.userData.instReady=!0,Y&&(H.customDepthMaterial=e.instDepth),t.add(H),H),_=a.sugi.concat(a.sugi2),N=Object.keys(e.models||{}).filter(H=>a[H]?.length),E=[{key:"sugi",arr:_,model:!1},{key:"broad",arr:a.broad,model:!1},...N.map(H=>({key:H,arr:a[H],model:!0}))].filter(H=>H.arr.length),k=0;for(let H of E)k+=H.arr.length/5;let u=Array.from({length:o*o},()=>[]),v=Array.from({length:l*l},()=>[]),T=null;if(k){let H=e.imp.geo.clone(),Y=new Float32Array(k),ee=new at(H,e.imp.mat,k),te=0;for(let{key:he,arr:ye,model:_e}of E){let Oe=ye.length/5,pe=e.imp.width[he],ce=e.imp.slot[he],Ge=_e?s:r,U=Array.from({length:_e?l*l:o*o},()=>[]);for(let q=0;q<Oe;q++)U[Ge(ye[5*q],ye[5*q+2])].push(q);U.forEach((q,X)=>{if(q.length){(_e?v:u)[X].push({arr:ye,w:pe,start:te,ids:q});for(let Z of q)ee.setMatrixAt(te,C(ye,Z,pe)),Y[te++]=ce}})}H.setAttribute("aSlot",new Jo(Y,1)),ee.computeBoundingSphere(),T=x(ee,!1)}let F=(H,Y)=>{if(T&&H.length){for(let ee of H){for(let te=0;te<ee.ids.length;te++)T.setMatrixAt(ee.start+te,Y?L:C(ee.arr,ee.ids[te],ee.w));T.instanceMatrix.addUpdateRange(ee.start*16,ee.ids.length*16)}T.instanceMatrix.needsUpdate=!0}},D=[["sugi",e.geo.sugi,[e.bark,e.foliage]],["sugi2",e.geo.sugi2,[e.bark,e.foliage]],["broad",e.geo.broad,[e.bark,e.foliage]],["sasa",e.geo.sasa,[e.foliage,e.foliage]],["fern",e.geo.fern,[e.foliage,e.foliage]],["take",e.geo.take,[e.culm,e.foliage]]].filter(H=>a[H[0]]?.length),h=Array.from({length:o*o},()=>({sugi:[],sugi2:[],broad:[],sasa:[],fern:[],take:[]}));for(let[H]of D){let Y=a[H];for(let ee=0;ee<Y.length/5;ee++)h[r(Y[5*ee],Y[5*ee+2])][H].push(ee)}let M=Array.from({length:l*l},()=>({}));for(let H of N){let Y=a[H];for(let ee=0;ee<Y.length/5;ee++){let te=M[s(Y[5*ee],Y[5*ee+2])];(te[H]||(te[H]=[])).push(ee)}}let g=new Uint8Array(o*o),y=new Uint8Array(l*l),b=0,S=(H,Y,ee,te,he,ye=!0)=>{let _e=new at(H,Y,ee);return _e.count=0,_e.visible=!1,_e.userData.leafy=he,_e.instanceMatrix.setUsage($r),x(_e,te,ye)},w=(H,Y)=>{H.count=Y,H.visible=Y>0,Y&&(H.instanceMatrix.clearUpdateRanges(),H.instanceMatrix.addUpdateRange(0,Y*16),H.instanceMatrix.needsUpdate=!0,H.instanceColor&&(H.instanceColor.clearUpdateRanges(),H.instanceColor.addUpdateRange(0,Y*3),H.instanceColor.needsUpdate=!0),H.computeBoundingSphere())},O={},P=(H,Y,ee)=>{let te=a[H],he=O[H]||(O[H]=S(Y,ee,te.length/5,!1,!0)),ye=H==="fern"?"sasa":H,_e=0;for(let Oe=0;Oe<o*o;Oe++)if(g[Oe])for(let pe of h[Oe][H])he.setMatrixAt(_e,R(te,pe)),he.setColorAt(_e,z(ye,te,pe)),_e++;w(he,_e)},I={},j=H=>{let Y=e.models[H],ee=a[H],te=ee.length/5,he=1/Y.height,ye=Y.kind==="conifer"?"sugi":"broad",_e=I[H]||(I[H]={lo:Y.loParts.map(ce=>S(ce.geo,ce.mat,te,!1,ce.leafy)),full:Y.parts.map(ce=>S(ce.geo,ce.mat,te,!ce.leafy,ce.leafy))}),Oe=0,pe=0;for(let ce=0;ce<l*l;ce++){let Ge=y[ce],U=Ge?M[ce][H]:void 0;if(!U||Ge===1&&!yt(ce))continue;let q=Ge===2?_e.full:_e.lo;for(let X of U){let Z=Ge===2?pe++:Oe++;R(ee,X,he);for(let oe of q)oe.setMatrixAt(Z,c),oe.userData.leafy&&oe.setColorAt(Z,z(ye,ee,X))}}for(let ce of _e.lo)w(ce,Oe);for(let ce of _e.full)w(ce,pe)},G=(H,Y,ee,te,he,ye)=>{let _e=ee[5*te+3],Oe=_e*he*(ye?.38:.45),pe=_e*(ye?.34:.26);H.setMatrixAt(Y,c.compose(f.set(ee[5*te],ee[5*te+1]+_e*(ye?.58:.64),ee[5*te+2]),d.identity(),p.set(Oe,pe,Oe)))},V=H=>{let Y=S(e.crownGeo,e.crownMat,H,!0,!1,!1);return Y.frustumCulled=!1,Y.visible=Vt.shadows,Y.userData.noAO=!0,Y},$=null,Q=null,J=a.sugi.length/5,re=()=>{let H=_.length/5+a.broad.length/5;if(!H)return;let Y=$||=V(H),ee=0;for(let te=0;te<o*o;te++)if(g[te]){for(let he of h[te].sugi)G(Y,ee++,_,he,.3,!0);for(let he of h[te].sugi2)G(Y,ee++,_,he+J,.3,!0);for(let he of h[te].broad)G(Y,ee++,a.broad,he,.6,!1)}w(Y,ee)},fe=0;for(let H of N)fe+=a[H].length/5;let ue=()=>{if(!fe)return;let H=Q||=V(fe),Y=0;for(let ee=0;ee<l*l;ee++)if(y[ee])for(let te of N){let he=M[ee][te];if(!he)continue;let ye=e.models[te],_e=ye.width/ye.height,Oe=ye.kind==="conifer";for(let pe of he)G(H,Y++,a[te],pe,_e,Oe)}w(H,Y)},Pe=NaN,ve=NaN,se=NaN,xe=!1,Ae=0,De=0,ze=0,be=0,Be=-2,dt=0,yt=H=>{if(Be<=-1)return!0;let Y=(H%l+.5)*n-Ae,ee=(Math.floor(H/l)+.5)*n-De,te=Math.hypot(Y,ee);return te<Ye.viewNear||Y*ze+ee*be+n>=te*Be};return{group:t,get nearCells(){let H=0;for(let Y of g)H+=Y;return H},get modelCells(){let H=0;for(let Y of y)Y===2&&H++;return H},get loCells(){let H=0;for(let Y of y)Y===1&&H++;return H},update(H,Y,ee=Ye.perFrame,te=null){let he=Vt.near;if(te&&dt>0&&(te.fx*ze+te.fz*be<Ye.viewTurn||Math.abs(H-Ae)>n/2||Math.abs(Y-De)>n/2||Be!==te.cos)){Ae=H,De=Y,ze=te.fx,be=te.fz,Be=te.cos;for(let pe of Object.keys(I))j(pe)}if(!b){let pe=Math.max(-H,0,H-500),ce=Math.max(-Y,0,Y-500),Ge=Ye.nearIn*he;if(pe*pe+ce*ce>Ge*Ge)return 0}if(!xe&&he===se&&Math.abs(H-Pe)<Ye.move&&Math.abs(Y-ve)<Ye.move)return 0;let ye=0,_e=!1,Oe=new Set;for(let pe=0;pe<o*o&&ye<ee;pe++){let ce=pe%o*i,Ge=Math.floor(pe/o)*i,U=Math.max(ce-H,0,H-ce-i),q=Math.max(Ge-Y,0,Y-Ge-i),X=Math.hypot(U,q),Z=g[pe]===1,oe=Z?X<Ye.nearOut*he:X<Ye.nearIn*he;oe!==Z&&(g[pe]=+!!oe,b+=oe?1:-1,F(u[pe],oe),_e=!0,ye++)}if(N.length)for(let pe=0;pe<l*l&&ye<ee*3;pe++){let ce=pe%l*n,Ge=Math.floor(pe/l)*n,U=Math.max(ce-H,0,H-ce-n),q=Math.max(Ge-Y,0,Y-Ge-n),X=Math.hypot(U,q),Z=y[pe],oe=Z;if(Z===2?X>=Ye.fullOut*he&&(oe=+(X<Ye.modelOut*he)):Z===1?X<Ye.fullIn*he?oe=2:X>=Ye.modelOut*he&&(oe=0):X<Ye.fullIn*he?oe=2:X<Ye.modelIn*he&&(oe=1),oe!==Z){Z>0!=oe>0&&(F(v[pe],oe>0),b+=oe>0?1:-1),dt+=(oe===1)-+(Z===1),y[pe]=oe,ye++;for(let ne of N)M[pe][ne]&&Oe.add(ne)}}if(_e){for(let[pe,ce,Ge]of D)P(pe,ce,Ge);re()}if(Oe.size){te?(Ae=H,De=Y,ze=te.fx,be=te.fz,Be=te.cos):Be=-2;for(let pe of Oe)j(pe);ue()}return xe=ye>=ee,xe||(Pe=H,ve=Y,se=he),ye},dispose(){t.removeFromParent(),t.traverse(H=>{H.isInstancedMesh&&H.dispose()}),T&&T.geometry.dispose(),t.clear()}}}var Le={from:1,dense:6,mid:12,far:18,step:.65,stepMid:1.2,stepFar:1.9,w:[.8,1.3],h:[.45,.85],blades:5,segments:2,sparseSegments:2,sparseBlades:3,sparseFrom:8,sparseTo:11,sparseIn:30,sparseOut:42,minNy:.6,wind:{amp:.09,speed:1.4,len:7},tint:[[.34,.44],[.54,.64],[.2,.28]]},Tt=(a,e,t)=>{let o=a*374761393+e*668265263+t*2147483647|0;return o=Math.imul(o^o>>>13,1274126177),((o^o>>>16)>>>0)/4294967296};function zo(a=Le.blades,e=Le.segments){let t=[],o=[],i=[],r=[],l=[],n=977,s=()=>(n=n*16807%2147483647)/2147483647,c=e;for(let f=0;f<a;f++){let p=s()*Math.PI*2,m=.12+.45*s(),L=.55+.45*s(),R=.035+.035*s(),C=Math.cos(p),A=Math.sin(p),z=-A,x=C,_=.8+.3*s(),N=(s()-.5)*.5,E=(s()-.5)*.5,k=t.length/3,u=M=>[N+C*m*M*M*L,M*L*(1-.2*m*M),E+A*m*M*M*L];for(let M=0;M<=c;M++){let g=M/(c+1),[y,b,S]=u(g),w=R*(1-g*.7),O=(.3+.7*g)*_,[P,I,j]=u(g+.1),G=P-y,V=I-b,$=j-S,Q=V*x-$*0,J=$*z-G*x,re=G*0-V*z,fe=Math.hypot(Q,J,re)||1,ue=Q/fe*.6,Pe=J/fe*.6+.8,ve=re/fe*.6,se=Math.hypot(ue,Pe,ve);for(let xe of[-1,1])t.push(y+z*w*xe,b,S+x*w*xe),o.push(ue/se,Pe/se,ve/se),i.push(+(xe>0),g),r.push(O,O,O)}let[v,T,F]=u(1),D=_;t.push(v,T,F),o.push(0,1,0),i.push(.5,1),r.push(D,D,D);for(let M=0;M<c;M++){let g=k+2*M;l.push(g,g+1,g+2,g+1,g+3,g+2)}let h=k+2*c;l.push(h,h+1,k+2*(c+1))}let d=new ot;return d.setAttribute("position",new Ce(t,3)),d.setAttribute("normal",new Ce(o,3)),d.setAttribute("uv",new Ce(i,2)),d.setAttribute("color",new Ce(r,3)),d.setIndex(l),d.computeBoundingSphere(),d}function gl(){let a=zo(),e=zo(Le.sparseBlades,Le.sparseSegments),t={value:0},o=new ke({color:8161884,side:2,roughness:.9,metalness:0,vertexColors:!0});return o.name="worldGrass",o.onBeforeCompile=i=>{i.uniforms.uTime=t,Da(i),i.vertexShader=`uniform float uTime;
`+i.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
	{
		vec3 iw = ( modelMatrix * instanceMatrix * vec4( 0.0, 0.0, 0.0, 1.0 ) ).xyz;
		float ph = ( iw.x + iw.z * 0.7 ) / ${Le.wind.len.toFixed(2)} + uTime * ${Le.wind.speed.toFixed(2)};
		float sway = ( sin( ph ) + 0.5 * sin( ph * 2.3 + 1.7 ) ) * ${Le.wind.amp.toFixed(3)} * uv.y * uv.y;
		transformed.x += sway; transformed.z += sway * 0.6;
	}`)},o.customProgramCacheKey=()=>"worldGrassToon",{geo:a,geoSparse:e,mat:o,setTime(i){t.value=i},dispose(){a.dispose(),e.dispose(),o.dispose()}}}function xl(a,e,t=null){let o=a.terrain,[i,,r]=a.origin,l=[],n=(x,_,N,E=1,k=0)=>{let u=Math.min(o.nx-1,Math.max(0,Math.round(_/o.cell)));return x[E*(Math.min(o.nz-1,Math.max(0,Math.round(N/o.cell)))*o.nx+u)+k]},s=o.cell,c=o.nx-1,d=o.nz-1,f=t?Math.max(0,Math.floor(t.x0/s)):0,p=t?Math.min(c,Math.ceil(t.x1/s)):c,m=t?Math.max(0,Math.floor(t.z0/s)):0,L=t?Math.min(d,Math.ceil(t.z1/s)):d,R=t?t.x0:0,C=t?t.z0:0,A=t?t.x1:500,z=t?t.z1:500;for(let[x,_,N]of[[Le.step,Le.from,Le.dense],[Le.stepMid,Le.dense,Le.mid],[Le.stepFar,Le.mid,Le.far]])for(let E=m;E<L;E++)for(let k=f;k<p;k++){let u=E*o.nx+k;if(Math.min(o.edge[u],o.edge[u+1],o.edge[u+o.nx],o.edge[u+o.nx+1])>=N+1)continue;let v=Math.max(R,k*s),T=Math.max(C,E*s),F=Math.min(A,v+s,(k+1)*s),D=Math.min(z,T+s,(E+1)*s),h=Math.floor((i+v)/x),M=Math.floor((i+F)/x),g=Math.floor((r+T)/x),y=Math.floor((r+D)/x);for(let b=g;b<=y;b++)for(let S=h;S<=M;S++){let w=(S+.1+.8*Tt(S,b,1))*x-i,O=(b+.1+.8*Tt(b,S,2))*x-r;if(w<v||O<T||w>=F||O>=D)continue;let P=n(o.edge,w,O);if(P<_||P>=N||P===255||n(o.normals,w,O,3,1)<Le.minNy||er(w+i,O+r)>Tt(S,b,8)*.6||eo(w+i,O+r)>.3)continue;let I=P<Le.mid?0:e.density(w+i,O+r)*e.clearing(P);if(I>.5||Tt(S,b,3)<I*.8||P>Le.mid&&Tt(S,b,4)<.3)continue;let j=Le.w[0]+(Le.w[1]-Le.w[0])*Tt(S,b,5),G=Le.h[0]+(Le.h[1]-Le.h[0])*Tt(b,S,6);l.push(w,fa(o,w,O)-.03,O,j,G,6.283*Tt(S,b,7))}}return l}function Fo(a,e){let t=new lt;t.name="grass";let o=Ye.modelCells,i=500/o,r=(u,v)=>Math.min(o-1,Math.max(0,Math.floor(v/i)))*o+Math.min(o-1,Math.max(0,Math.floor(u/i))),l=typeof a=="function",n=Array(o*o).fill(null),s=u=>{if(n[u])return n[u];if(l){let v=u%o*i,T=Math.floor(u/o)*i;return n[u]=a({x0:v,z0:T,x1:v+i,z1:T+i})}return n[u]=[]};if(!l){let u=Array.from({length:o*o},()=>[]);for(let v=0;v<a.length/6;v++){let T=6*v;u[r(a[T],a[T+2])].push(a[T],a[T+1],a[T+2],a[T+3],a[T+4],a[T+5])}u.forEach((v,T)=>{n[T]=v})}let c=l?-1:a.length/6,d=new Ke,f=new ea,p=new ie,m=new ie,L=new ie(0,1,0),R=new Ne,C=Array(o*o).fill(null),A=Array(o*o).fill(0),z=(u,v)=>{let T=C[u];if(T&&v&&A[u]){A[u]=v,T.geometry=v===2?e.geo:e.geoSparse,T.computeBoundingSphere();return}if(T&&(T.removeFromParent(),T.dispose()),C[u]=null,A[u]=v,!v)return;let F=s(u),D=F.length/6;if(!D)return;let h=new at(v===2?e.geo:e.geoSparse,e.mat,D);for(let M=0;M<D;M++){let g=6*M;h.setMatrixAt(M,d.compose(p.set(F[g],F[g+1],F[g+2]),f.setFromAxisAngle(L,F[g+5]),m.set(F[g+3],F[g+4],F[g+3])));let y=Le.tint,b=Tt(Math.floor(F[g]*5),Math.floor(F[g+2]*5),9);h.setColorAt(M,R.setRGB(y[0][0]+(y[0][1]-y[0][0])*b,y[1][0]+(y[1][1]-y[1][0])*b,y[2][0]+(y[2][1]-y[2][0])*b))}h.computeBoundingSphere(),h.castShadow=!1,h.receiveShadow=!0,h.userData.noAO=!0,h.matrixAutoUpdate=!1,h.matrixWorldNeedsUpdate=!0,h.renderOrder=2,h.userData.instReady=!0,t.add(h),C[u]=h},x=0,_=NaN,N=NaN,E=NaN,k=!1;return{group:t,get count(){if(c<0){c=0;for(let u=0;u<o*o;u++)c+=s(u).length/6}return c},update(u,v,T=Ye.perFrame*3){let F=Vt.near;if(!x){let h=Math.max(-u,0,u-500),M=Math.max(-v,0,v-500),g=Math.max(Le.sparseFrom,Le.sparseIn*F);if(h*h+M*M>g*g)return 0}if(!k&&F===E&&Math.abs(u-_)<1&&Math.abs(v-N)<1)return 0;let D=0;for(let h=0;h<o*o&&D<T;h++){let M=h%o*i,g=Math.floor(h/o)*i,y=Math.max(M-u,0,u-M-i),b=Math.max(g-v,0,v-g-i),S=Math.hypot(y,b),w=Vt.near,O=A[h],P=O;O===2?S>=Le.sparseTo&&(P=+(S<Le.sparseOut*w)):O===1?S<Le.sparseFrom?P=2:S>=Le.sparseOut*w&&(P=0):S<Le.sparseFrom?P=2:S<Le.sparseIn*w&&(P=1),P!==O&&(O>0!=P>0&&(x+=P>0?1:-1),z(h,P),D++)}return k=D>=T,k||(_=u,N=v,E=F),D},dispose(){t.removeFromParent();for(let u of C)u?.dispose();t.clear()}}}var At=(a,e,t)=>{let o=Math.min(1,Math.max(0,(t-a)/(e-a)));return o*o*(3-2*o)},wl=ei.indexOf("asphalt");function Lo(a,e,t,o=null,i=0,r=a.nx*a.nz){let l=a.nx*a.nz,n=o?o.a:new Float32Array(4*l),s=o?o.b:new Float32Array(4*l);for(let c=i;c<r;c++){let d=c%a.nx,f=(c-d)/a.nx;if(a.mask[c]===wl){s[4*c]=1;continue}let p=e[0]+(a.xz?a.xz[2*c]:d*a.cell),m=e[2]+(a.xz?a.xz[2*c+1]:f*a.cell),L=a.normals[3*c+1],R=a.edge[c],C=At(.77,.62,L),A=(1-At(.5,2.2,R))*(1-C),z=t.density(p,m)*t.clearing(R)*(1-eo(p,m)),x=z*(1-C)*(1-A),_=C*z*.5+x*.55;n[4*c]=Math.max(0,1-C-A-x),n[4*c+1]=x*.45,n[4*c+2]=C*(1-z*.5),n[4*c+3]=A,s[4*c+1]=_,a.cut&&(s[4*c+2]=At(2,8,a.cut[c])*At(.9,.75,L)*+(R>=1.5&&R<=45));let N=a.heights?At(2050,2350,a.heights[c]):0;if(N>0){let u=n[4*c]*N;n[4*c]-=u,n[4*c+3]+=u*.65,n[4*c+2]+=u*.35,n[4*c+1]*=1-.6*N,s[4*c+1]*=1-.6*N}let E=eo(p,m),k=E<1?er(p,m):0;if(k>0){let u=n[4*c]*k,v=li(p,m),T=1-At(.36,.5,v),F=At(.36,.5,v)*(1-At(.64,.78,v));n[4*c]-=u*(T+F),n[4*c+1]*=1-k,s[4*c+1]*=1-k,n[4*c+3]=n[4*c+3]*(1-k)+u*F,s[4*c]=Math.max(s[4*c],u*T)}if(E>0){for(let u=0;u<4;u++)n[4*c+u]*=1-E;s[4*c+1]*=1-E,s[4*c]=Math.max(s[4*c],E)}}return{a:n,b:s}}var oo=[new Ne(1,.44,.07),new Ne(.86,.9,1),new Ne(.86*8,.9*8,8)],Ma=oo,xt={height:7.82,reach:1.75},Ro={count:10,power:380,angle:1,penumbra:.5,range:36,ahead:30,far:320},fr={radius:1.3,minPx:2.5,peak:.45,floor:.5,fade:Math.LN2/7e3},dr=`
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
}`,ur=`
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
}`;function yl(){let a=[],e=[],t=[],o=[],i=(R,C,A,z,x,_)=>{for(let[N,E,k]of[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]]){let u=a.length/3,v=N===0?E===0?[0,1,0]:[1,0,0]:[0,1,0],T=[E*v[2]-k*v[1],k*v[0]-N*v[2],N*v[1]-E*v[0]];for(let[F,D]of[[-1,-1],[1,-1],[1,1],[-1,1]])a.push(z+(N+v[0]*F+T[0]*D)*R/2,x+(E+v[1]*F+T[1]*D)*C/2,_+(k+v[2]*F+T[2]*D)*A/2),e.push(N,E,k);t.push(u,u+1,u+2,u,u+2,u+3)}};i(.14,9,.14,0,3.5,0),i(1.9,.08,.08,.95,7.9,0),o.push([0,t.length,0]);let r=t.length;i(.6,.14,.26,xt.reach,xt.height,0),o.push([r,t.length-r,1]);let l=new ot;l.setAttribute("position",new Ce(a,3)),l.setAttribute("normal",new Ce(e,3)),l.setIndex(t);for(let[R,C,A]of o)l.addGroup(R,C,A);let n=new ke({color:10132898,roughness:.5,metalness:.5}),s=Ma.map((R,C)=>{let A=new ke({color:14606046,roughness:.3,emissive:R,emissiveIntensity:0});return A.name=`lampHead${C}`,A});n.name="lampPost";let c=fr,d=new ya(1,1),f={uMinPx:{value:c.minPx},uPxAngle:{value:.001},uRadius:{value:c.radius},uFade:{value:c.fade},uFloor:{value:c.floor}},p=Ma.map((R,C)=>new st({name:`lampGlow${C}`,vertexShader:dr,fragmentShader:ur,uniforms:{...f,uColor:{value:new Ne}},transparent:!0,depthWrite:!1,blending:2})),m=0,L=0;return{geo:l,mats:s.map(R=>[n,R]),glowGeo:d,glows:p,view:f,get level(){return m},get gain(){return L},get lit(){return m>.2},setLights(R,C){m=R,L=C;for(let A of s)A.emissiveIntensity=R*C*.7;p.forEach((A,z)=>A.uniforms.uColor.value.copy(Ma[z]).multiplyScalar(R*C*c.peak))},setView(R,C){f.uPxAngle.value=2*Math.tan(Qt.degToRad(R)/2)/Math.max(1,C)},dispose(){l.dispose(),n.dispose();for(let R of s)R.dispose();d.dispose();for(let R of p)R.dispose()}}}function po(a,e){let t=new lt;t.name="lamps";let o=[],i=new Ke,r=new ea,l=new ie,n=new ie(1,1,1),s=new ie(0,1,0);for(let c of[0,1]){let d=a.filter(m=>+!!m[4]===c);if(!d.length)continue;let f=new at(e.geo,e.mats[c],d.length),p=e.lit?new at(e.glowGeo,e.glows[c],d.length):null;d.forEach(([m,L,R,C],A)=>{f.setMatrixAt(A,i.compose(l.set(m,L,R),r.setFromAxisAngle(s,C),n));let z=m+Math.cos(C)*xt.reach,x=R-Math.sin(C)*xt.reach;o.push(z,L+xt.height-.15,x,c),p?.setMatrixAt(A,i.makeTranslation(z,L+xt.height-.12,x))}),f.computeBoundingSphere(),f.castShadow=!0,f.receiveShadow=!0,f.name="lampPosts",t.add(f),p&&(p.computeBoundingSphere(),p.boundingSphere&&(p.boundingSphere.radius+=4),p.name="lampGlow",p.renderOrder=2,p.userData.noAO=!0,t.add(p))}return t.userData.heads=o,t}function Sl(a,e,t=Ro.count){let o=Ro,i=t,r=new lt;r.name="lampLights";let l=[];for(let m=0;m<i;m++){let L=new Ar(16777215,0,o.range,o.angle,o.penumbra,2);r.add(L,L.target),l.push(L)}a.add(r);let n=new Float64Array(i+1),s=new Float64Array(i+1),c=new Float64Array(i+1),d=new Float64Array(i+1),f=new Uint8Array(i+1),p=new ie;return{update(m,L){m.getWorldDirection(p);let R=Math.hypot(p.x,p.z)||1,C=m.position.x+p.x/R*o.ahead,A=m.position.y,z=m.position.z+p.z/R*o.ahead;n.fill(1/0);for(let N of L)for(let E=0;E<N.length;E+=4){let k=N[E]-C,u=N[E+1]-A,v=N[E+2]-z,T=k*k+u*u+v*v;if(T>=n[i])continue;let F=i;for(;F>0&&n[F-1]>T;)n[F]=n[F-1],s[F]=s[F-1],c[F]=c[F-1],d[F]=d[F-1],f[F]=f[F-1],F--;n[F]=T,s[F]=N[E],c[F]=N[E+1],d[F]=N[E+2],f[F]=N[E+3]}let x=Math.min(Math.sqrt(n[i]),o.far),_=e.level*e.gain*o.power;for(let N=0;N<i;N++){let E=l[N],k=Math.sqrt(n[N]);if(!(k<x)){E.intensity=0;continue}E.intensity=_*(1-Qt.smoothstep(k,x*.6,x)),E.position.set(s[N],c[N],d[N]),E.target.position.set(s[N],c[N]-8,d[N]),E.color.copy(Ma[f[N]])}},get active(){return l.filter(m=>m.intensity>0).length},dispose(){r.removeFromParent();for(let m of l)m.dispose()}}}function Ml(a,e){let t=Math.floor(e.length/7),o={uNearTile:{value:new Ve(-1e4,-1e4)},uNearMask:{value:0}},i=new st({name:"farLights",vertexShader:dr,fragmentShader:ur,defines:{FAR_MASK:"",TILE:500 .toFixed(1),HALF:it.toFixed(1)},uniforms:{...a.view,...o,uColor:{value:new Ne(1,1,1).multiplyScalar(a.level*a.gain*fr.peak)}},transparent:!0,depthWrite:!1,blending:2}),r=new at(a.glowGeo,i,Math.max(1,t)),l=new Ke,n=new Ne;for(let s=0;s<t;s++){let c=s*7,d=e[c+6];r.setMatrixAt(s,l.makeScale(d,d,d).setPosition(e[c],e[c+1],e[c+2])),r.setColorAt(s,n.setRGB(e[c+3],e[c+4],e[c+5]))}return r.count=t,r.frustumCulled=!1,r.renderOrder=2,r.name="farLights",r.userData.noAO=!0,{mesh:r,count:t,setNear(s,c,d){o.uNearTile.value.set(s,c),o.uNearMask.value=d},dispose(){r.removeFromParent(),r.dispose(),i.dispose()}}}var ge={poleStep:38,poleOut:2.2,poleH:11.5,armH:10.3,sag:.6,poleFoot:1200,delStep:12,delCurv:1/250,hairTurn:2.4,hairWin:50,speedStep:1500,speedSpokeStep:1e3,lampStep:60,lampOut:1.2},Fe=()=>({p:[],n:[],u:[],i:[]});function kt(a,e,t,o,i,r,l=0,n=0){for(let s=0;s<r;s++){let c=s/r*Math.PI*2,d=(s+1)/r*Math.PI*2,f=a.p.length/3;for(let[p,m,L]of[[c,e,o],[d,e,o],[d,t,i],[c,t,i]])a.p.push(l+Math.cos(p)*m,L,n+Math.sin(p)*m),a.n.push(Math.cos(p),0,Math.sin(p)),a.u.push(0,0);a.i.push(f,f+2,f+1,f,f+3,f+2)}}function ft(a,e,t,o,i,r,l){for(let[n,s,c]of[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]]){let d=a.p.length/3,f=n===0?s===0?[0,1,0]:[1,0,0]:[0,1,0],p=[s*f[2]-c*f[1],c*f[0]-n*f[2],n*f[1]-s*f[0]];for(let[m,L]of[[-1,-1],[1,-1],[1,1],[-1,1]])a.p.push(i+(n+f[0]*m+p[0]*L)*e/2,r+(s+f[1]*m+p[1]*L)*t/2,l+(c+f[2]*m+p[2]*L)*o/2),a.n.push(n,s,c),a.u.push(0,0);a.i.push(d,d+1,d+2,d,d+2,d+3)}}function Wa(a,e,t,o,i,r=!1){let l=a.p.length/3,n=r?-1:1;a.p.push(0,o,i),a.n.push(0,0,n),a.u.push(.5,.5);for(let s=0;s<=t;s++){let c=s/t*Math.PI*2;a.p.push(Math.cos(c)*e,o+Math.sin(c)*e,i),a.n.push(0,0,n),a.u.push(0,0)}for(let s=0;s<t;s++)r?a.i.push(l,l+s+2,l+s+1):a.i.push(l,l+s+1,l+s+2)}function Nt(a,e,t,o,i,r,l=!1){let n=a.p.length/3,s=l?-1:1;for(let[c,d,f,p]of[[-e/2,o,r[0],r[1]],[e/2,o,r[2],r[1]],[e/2,o+t,r[2],r[3]],[-e/2,o+t,r[0],r[3]]])a.p.push(l?-c:c,d,i),a.n.push(0,0,s),a.u.push(l?r[0]+r[2]-f:f,p);a.i.push(n,n+1,n+2,n,n+2,n+3)}function Ie(a,e,t,o,i,r){let l=Math.cos(r),n=Math.sin(r),s=a.p.length/3;for(let c=0;c<e.p.length;c+=3){let d=e.p[c],f=e.p[c+2],p=e.n[c],m=e.n[c+2];a.p.push(t+d*l+f*n,o+e.p[c+1],i-d*n+f*l),a.n.push(p*l+m*n,e.n[c+1],-p*n+m*l)}for(let c=0;c<e.u.length;c++)a.u.push(e.u[c]);for(let c of e.i)a.i.push(s+c)}function gt(a,e,t,o,i){let r=t[0]-e[0],l=t[1]-e[1],n=t[2]-e[2],s=i[0]-e[0],c=i[1]-e[1],d=i[2]-e[2],f=l*d-n*c,p=n*s-r*d,m=r*c-l*s,L=Math.hypot(f,p,m)||1,R=a.p.length/3;f/=L,p/=L,m/=L;for(let C of[e,t,o,i])a.p.push(C[0],C[1],C[2]),a.n.push(f,p,m),a.u.push(0,0);a.i.push(R,R+1,R+2,R,R+2,R+3)}function Va(a,e,t,o,i,r){let l=[e.x,e.y+i,e.z],n=[e.x,e.y+r,e.z],s=[t.x,t.y+i,t.z],c=[t.x,t.y+r,t.z],d=[e.x+e.ox*o,e.y+i,e.z+e.oz*o],f=[e.x+e.ox*o,e.y+r,e.z+e.oz*o],p=[t.x+t.ox*o,t.y+i,t.z+t.oz*o],m=[t.x+t.ox*o,t.y+r,t.z+t.oz*o],L=s[0]-l[0],R=s[2]-l[2];L*e.oz-R*e.ox>0?(gt(a,l,s,c,n),gt(a,p,d,f,m),gt(a,n,c,m,f)):(gt(a,s,l,n,c),gt(a,d,p,m,f),gt(a,c,n,f,m))}var hr='"Yu Gothic UI", "Meiryo", "Hiragino Sans", "Noto Sans JP", sans-serif',je={rows:64,px:512,rowPx:116,w:5.3,h:1.2,y:2.6,at:62,out:1.6},ut={flat:60,bays:11,bayW:2.7,bayL:5.2,canopy:[14,7,4.6],canopyIn:10},Ao={len:1.2,lift:.03},ja={rail:ai,post:{size:.5,top:1.4},shed:ri},qe=(a,e)=>Math.atan2(a,e),Dt=8,Mt=a=>{let e=a%Dt,t=Math.floor(a/Dt);return[e/Dt+.004,1-(t+1)/Dt+.004,(e+1)/Dt-.004,1-t/Dt-.004]};function bl(){let a=1024,e=new OffscreenCanvas(a,a),t=e.getContext("2d"),o=a/Dt;t.fillStyle="#8c8f93",t.fillRect(0,0,a,a);let i=l=>[l%Dt*o,Math.floor(l/Dt)*o];for(let[l,n]of[[0,"40"],[1,"50"]]){let[s,c]=i(l);t.fillStyle="#ffffff",t.beginPath(),t.arc(s+o/2,c+o/2,o*.47,0,Math.PI*2),t.fill(),t.strokeStyle="#d0262c",t.lineWidth=o*.11,t.beginPath(),t.arc(s+o/2,c+o/2,o*.4,0,Math.PI*2),t.stroke(),t.fillStyle="#1a3f9a",t.font=`bold ${o*.42}px Arial`,t.textAlign="center",t.textBaseline="middle",t.fillText(n,s+o/2,c+o*.53)}{let[l,n]=i(4),s=l+o/2,c=n+o/2,d=o*.47;t.fillStyle="#111",t.beginPath(),t.moveTo(s,c-d),t.lineTo(s+d,c),t.lineTo(s,c+d),t.lineTo(s-d,c),t.closePath(),t.fill(),t.fillStyle="#f2c81d",t.beginPath(),t.moveTo(s,c-d*.86),t.lineTo(s+d*.86,c),t.lineTo(s,c+d*.86),t.lineTo(s-d*.86,c),t.closePath(),t.fill(),t.fillStyle="#111",t.textAlign="center",t.textBaseline="middle",t.font=`bold ${o*.17}px ${hr}`,t.fillText("落石",s,c-o*.09),t.fillText("注意",s,c+o*.1)}for(let[l,n]of[[2,1],[3,-1]]){let[s,c]=i(l),d=s+o/2,f=c+o/2;t.save(),t.translate(d,f),t.rotate(Math.PI/4),t.fillStyle="#111",t.fillRect(-42.24,-42.24,o*.66,o*.66),t.fillStyle="#f2c81d",t.fillRect(-38.4,-38.4,o*.6,o*.6),t.restore(),t.strokeStyle="#111",t.lineWidth=o*.07,t.beginPath(),t.moveTo(d-n*o*.12,f+o*.22),t.lineTo(d-n*o*.12,f-o*.02),t.quadraticCurveTo(d-n*o*.12,f-o*.14,d+n*o*.04,f-o*.14),t.stroke(),t.fillStyle="#111",t.beginPath(),t.moveTo(d+n*o*.18,f-o*.14),t.lineTo(d+n*o*.04,f-o*.25),t.lineTo(d+n*o*.04,f-o*.03),t.fill()}{let[l,n]=i(5);t.fillStyle="#f2c81d",t.fillRect(l+6,n+6,o-12,o-12),t.fillStyle="#111";for(let s of[.3,.58]){let c=l+o*s;t.beginPath(),t.moveTo(c,n+o*.18),t.lineTo(c+o*.2,n+o*.5),t.lineTo(c,n+o*.82),t.lineTo(c-o*.1,n+o*.82),t.lineTo(c+o*.1,n+o*.5),t.lineTo(c-o*.1,n+o*.18),t.closePath(),t.fill()}}{let[l,n]=i(6);for(let s=0;s<5;s++)t.fillStyle=s%2?"#f4f4f0":"#d3262b",t.fillRect(l+8,n+s*o/5,o-16,o/5);t.fillStyle="#8c8f93",t.beginPath(),t.moveTo(l,n+o*.55),t.lineTo(l+o/2-2,n+o),t.lineTo(l,n+o),t.fill(),t.beginPath(),t.moveTo(l+o,n+o*.55),t.lineTo(l+o/2+2,n+o),t.lineTo(l+o,n+o),t.fill()}for(let l=8;l<64;l++){let[n,s]=i(l);t.fillStyle="#1d4f9c",t.fillRect(n+4,s+o*.2,120,o*.6),t.strokeStyle="#ffffff",t.lineWidth=4,t.strokeRect(n+9,s+o*.2+5,110,o*.6-10),t.fillStyle="#ffffff",t.font=`bold ${o*.3}px Arial`,t.textAlign="center",t.textBaseline="middle",t.fillText(`No.${l-7}`,n+o/2,s+o/2)}let r=new mt(e);return r.colorSpace=pt,r.anisotropy=4,r}var pr={concrete:!0,metal:!0,orange:!0,white:!1,mirror:!1,signs:!0,checker:!1,boards:!0};function mr(){let a=Fe(),e=Fe(),t=Fe(),o=Fe(),i=Fe(),r=Fe(),l=Fe();kt(a,.19,.12,-4,ge.poleH,8),ft(e,2.2,.1,.1,0,ge.armH,0);for(let C of[-.9,0,.9])kt(e,.04,.03,ge.armH+.05,ge.armH+.22,5,C,0);kt(e,.26,.26,7.6,8.5,8,0,.3),kt(t,.05,.05,-.5,3,6),Wa(t,.47,16,3.25,.05,!0),Wa(o,.42,16,3.25,.07),ft(i,.08,1.2,.08,0,.4,0),Wa(r,.05,10,.9,.045),kt(l,.04,.04,-.5,2.2,6);let n=bl(),s=new OffscreenCanvas(64,16),c=s.getContext("2d");for(let C=0;C<2;C++)for(let A=0;A<8;A++)c.fillStyle=(A+C)%2?"#f2f2f2":"#15171a",c.fillRect(A*8,C*8,8,8);let d=new mt(s);d.wrapS=wt,d.magFilter=Qa,d.colorSpace=pt;let f=new OffscreenCanvas(je.px,je.rows*je.rowPx),p=f.getContext("2d");p.fillStyle="#1d4f9c",p.fillRect(0,0,f.width,f.height);let m=new mt(f);m.colorSpace=pt,m.anisotropy=4;let L=new Map,R={checker:new ke({map:d,roughness:.85,side:2,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}),boards:new ke({map:m,roughness:.5}),concrete:new ke({color:9407878,roughness:.95}),metal:new ke({color:9277590,roughness:.5,metalness:.6}),orange:new ke({color:13134124,roughness:.7}),white:new ke({color:16053488,roughness:.85}),mirror:new ke({color:16777215,roughness:.04,metalness:1}),signs:new ke({map:n,roughness:.45}),wire:new Dr({color:1776928})};return R.concrete.onBeforeCompile=C=>{C.vertexShader=C.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vCnP;
varying vec3 vCnN;`).replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
	vCnP = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;
	vCnN = normalize( mat3( modelMatrix ) * objectNormal );`),C.fragmentShader=C.fragmentShader.replace("#include <common>",`#include <common>
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
	}`)},R.concrete.customProgramCacheKey=()=>"roadsideConcrete",Object.entries(R).forEach(([C,A])=>{A.name=`roadside_${C}`}),{tpl:{pole:a,arm:e,mirror:t,mirrorFace:o,del:i,delRef:r,signPole:l},mats:R,boardUV(C,A=""){let z=C.cl,x=1/0,_=-1/0;if(!L.has(C.id))for(let N=0;N<z.n;N+=5){let E=z.pos[3*N+1];E<x&&(x=E),E>_&&(_=E)}return this.boardText(C.id,String(C.data.name),`${(z.length/1e3).toFixed(1).replace(".",",")} км · ${Math.round(_-x)} м`,A)},boardText(C,A,z="",x=""){let _=L.get(C);if(_===void 0){_=L.size%je.rows,L.set(C,_);let N=_*je.rowPx,E=je.rowPx,k=je.px;p.fillStyle="#1d4f9c",p.fillRect(0,N,k,E),p.strokeStyle="#ffffff",p.lineWidth=5,p.strokeRect(6,N+6,k-12,E-12),p.fillStyle="#ffffff",p.textBaseline="middle",p.textAlign="left";let u=z?k*.56:k-48;x?(p.font=`bold ${Math.round(E*.44)}px ${hr}`,p.fillText(x,24,N+E*.36,u),p.font=`${Math.round(E*.24)}px "Segoe UI", Arial, sans-serif`,p.fillText(A,26,N+E*.76,u)):(p.font=`bold ${Math.round(E*.52)}px "Segoe UI", Arial, sans-serif`,p.fillText(A,24,N+E/2+2,u)),p.textAlign="right",p.font=`${Math.round(E*.3)}px "Segoe UI", Arial, sans-serif`,z&&p.fillText(z,k-22,N+E/2+2,k*.36),m.needsUpdate=!0}return[1-(_+1)/je.rows,1-_/je.rows]},dispose(){d.dispose(),m.dispose(),n.dispose();for(let C of Object.values(R))C.dispose()}}}function ro(a){let e=a.cl,t=e.n,o=Math.max(2,Math.round(ge.hairWin/e.step/2)),i=[];for(let r=o;r<t-o;r++){let l=0;for(let s=r-o;s<=r+o;s++)l+=e.curvature[s]*e.step;if(Math.abs(l)<ge.hairTurn)continue;let n=r;for(let s=r-o;s<=r+o;s++)Math.abs(e.curvature[s])>Math.abs(e.curvature[n])&&(n=s);i.length&&Math.abs(i[i.length-1].row-n)*e.step<80||i.push({row:n,right:l>0})}return i.sort((r,l)=>l.row-r.row),i.map((r,l)=>({...r,no:l+1}))}var Eo=new WeakMap;function vr(a){let e=Eo.get(a.graph);if(e)return e;let{graph:t,world:o}=a,i=t.ring.cl;return e=t.nodes.filter(r=>r.kind==="ringx").map(r=>{let l=1/0,n=0;for(let c=0;c<i.n;c++){let d=Math.hypot(i.pos[3*c]-r.x,i.pos[3*c+2]-r.z);d<l&&(l=d,n=c)}let s=o.districts[r.district];return{id:s.id,name:s.name,nameJa:s.nameJa||"",s:i.s[n],outRight:i.right[3*n]*r.x+i.right[3*n+2]*r.z>0}}),Eo.set(t,e),e}var ht={course:(a,e,t)=>e.boardUV(t,a.world.courses.find(o=>o.id===t.id)?.nameJa||""),view:a=>a.boardText("viewpoint","Смотровая","","展望台"),spoke:(a,e,t)=>{let o=a.world.districts[t.district];return e.boardText("to_"+o.id,o.name,`${(t.cl.length/1e3).toFixed(1).replace(".",",")} км`,o.nameJa||"")},parking:a=>a.boardText("parking","Стоянка · заправка","","P 駐車場"),ringA:(a,e)=>{let t=e.nameJa||e.name;return a.boardText("ring_a_"+e.id,e.name,"",e.outRight?t+" →":"← "+t)},ringB:(a,e)=>{let t=e.nameJa||e.name;return a.boardText("ring_b_"+e.id,e.name,"",e.outRight?"← "+t:t+" →")}};function _l(a,e){for(let t of a.graph.roads){let o=t.data.kind;if(o==="course")ht.course(a,e,t),t.view&&t.view.kind==="view"&&ht.view(e);else if(o==="spoke")ht.spoke(a,e,t),t.view&&ht.parking(e);else if(o==="ring")for(let i of vr(a))ht.ringA(e,i),ht.ringB(e,i)}}function io(a,e,t,o=0,i=0){let{cl:r,data:l}=a,n=ti(l,r,e),s=t>0?n.d.length-1:0,c=3*e,d=Math.hypot(r.right[c],r.right[c+2])||1,f=r.right[c]/d,p=r.right[c+2]/d,m=n.d[s]+(a.view&&a.view.sign===t?t*a.view.extra[e]:0);return{x:r.pos[c]+r.right[c]*m-o,y:r.pos[c+1]+r.right[c+1]*m+r.up[c+1]*n.h[s],z:r.pos[c+2]+r.right[c+2]*m-i,ox:t*f,oz:t*p,tx:r.tan[c],tz:r.tan[c+2]}}var $e=(a,e)=>{let t=Math.round(e/a.step);return a.closed?(t%a.n+a.n)%a.n:Math.min(a.n-1,Math.max(0,t))};function Cl(a,e){let t=[],o=ge.lampOut-xt.reach,i=r=>t.push(r.x+r.ox*o,r.y+xt.height-.15,r.z+r.oz*o);for(let r of a.graph.roads){let l=r.cl,n=l.length;if(r.data.kind==="ring"||r.data.kind==="spoke"){for(let c=0;c*ge.lampStep<n;c++){let d=c*ge.lampStep;!l.closed&&(d<30||d>n-30)||i(io(r,$e(l,d),-1))}continue}let s=e.get(r.idx);s||e.set(r.idx,s=ro(r));for(let c of s)i(io(r,$e(l,l.s[c.row]-8),c.right?-1:1))}return t}function*Pl(a,e,t,o,i=null){let r=[],{graph:l,index:n}=a,[s,,c]=e.origin,d=t.tpl,f={concrete:Fe(),metal:Fe(),orange:Fe(),white:Fe(),mirror:Fe(),signs:Fe(),checker:Fe(),boards:Fe()},p=[],m=[],L=(z,x)=>m.push([z.x+z.ox*ge.lampOut,z.y,z.z+z.oz*ge.lampOut,Math.atan2(z.oz,-z.ox),x]),R=(z,x,_)=>io(z,x,_,s,c);for(let z of n.pieces.get(e.id)||[]){let x=l.roads[z.road],_=x.cl,N=x.data.kind,E=_.length,k=M=>M*_.step,u=(M,g,y,b)=>{let S=b[0],w=b[1],O=$e(_,_.closed?(M%E+E)%E:M);if(O<z.from||O>=z.to)return;let P=R(x,O,g),I=P.x+P.ox*je.out,j=P.z+P.oz*je.out,G=qe(P.tx*y,P.tz*y),V=Fe(),$=Fe(),Q=Fe();Nt(V,je.w,je.h,je.y,.06,[0,S,1,w]),Nt($,je.w,je.h,je.y,.03,Mt(7),!0);for(let J of[-5.3/2+.3,je.w/2-.3])kt(Q,.05,.05,-.5,je.y+je.h,6,J,0);Ie(f.boards,V,I,P.y,j,G),Ie(f.signs,$,I,P.y,j,G),Ie(f.metal,Q,I,P.y,j,G)},v=ge.poleStep,T=N==="course"?-1:1;for(let M=Math.ceil(k(z.from)/v);M*v<k(z.to);M++){let g=M*v;if(N==="link"||N==="course"&&g<E-ge.poleFoot||!_.closed&&(g<25||g>E-25))continue;let y=R(x,$e(_,g),T),b=y.x+y.ox*ge.poleOut,S=y.z+y.oz*ge.poleOut,w=qe(y.tx,y.tz);Ie(f.concrete,d.pole,b,y.y,S,w),Ie(f.metal,d.arm,b,y.y,S,w);let O=g+v;if(N==="course"?O<=E-25:_.closed||O<=E-25){let P=R(x,$e(_,O),T),I=P.x+P.ox*ge.poleOut,j=P.z+P.oz*ge.poleOut,G=qe(P.tx,P.tz),V=Math.cos(w),$=Math.sin(w),Q=Math.cos(G),J=Math.sin(G);for(let re of[-.9,0,.9]){let fe=b+re*V,ue=S-re*$,Pe=y.y+ge.armH+.22,ve=I+re*Q,se=j-re*J,xe=P.y+ge.armH+.22;for(let Ae=0;Ae<8;Ae++){let De=Ae/8,ze=(Ae+1)/8,be=Be=>ge.sag*4*Be*(1-Be);p.push(fe+(ve-fe)*De,Pe+(xe-Pe)*De-be(De),ue+(se-ue)*De,fe+(ve-fe)*ze,Pe+(xe-Pe)*ze-be(ze),ue+(se-ue)*ze)}}}}if(yield,N==="ring"||N==="spoke")for(let M=Math.ceil(k(z.from)/ge.lampStep);M*ge.lampStep<k(z.to);M++){let g=M*ge.lampStep;!_.closed&&(g<30||g>E-30)||L(R(x,$e(_,g),-T),0)}for(let M=Math.ceil(k(z.from)/ge.delStep);M*ge.delStep<k(z.to);M++){let g=M*ge.delStep;if(!_.closed&&(g<30||g>E-30))continue;let y=$e(_,g),b=_.curvature[y];if(Math.abs(b)<ge.delCurv)continue;let S=R(x,y,b>0?-1:1),w=S.x+S.ox*.45,O=S.z+S.oz*.45,P=qe(-S.ox,-S.oz);Ie(f.white,d.del,w,S.y,O,P),Ie(f.orange,d.delRef,w,S.y,O,P)}yield;let F=N==="course"?ge.speedStep:ge.speedSpokeStep,D=Mt(N==="course"?0:1);for(let M=Math.ceil((k(z.from)-200)/F);200+M*F<k(z.to);M++){let g=200+M*F;if(g<k(z.from)||!_.closed&&g>E-60)continue;let y=R(x,$e(_,g),1),b=y.x+y.ox*.9,S=y.z+y.oz*.9,w=qe(-y.tx,-y.tz);wa(f,d,b,y.y,S,w,D,.6)}if(N==="course"){let M=_.width[0]/2,g=(x.data.crossSection.crownPercent||0)/100;for(let b of[x.data.start.s,x.data.finish.s]){let S=$e(_,b);if(S<z.from||S>=z.to)continue;let w=(P,I,j)=>{let G=3*P,V=-Math.abs(I)*g+Ao.lift;return[_.pos[G]+_.right[G]*I+_.up[G]*V-s,_.pos[G+1]+_.right[G+1]*I+_.up[G+1]*V,_.pos[G+2]+_.right[G+2]*I+_.up[G+2]*V-c,j]},O=Math.min(_.n-1,S+Math.max(1,Math.round(Ao.len/_.step)));for(let[P,I]of[[-M,0],[0,M]]){let j=w(S,P,P/2),G=w(S,I,I/2),V=w(O,I,I/2),$=w(O,P,P/2),Q=f.checker.p.length/3;[j,G,V,$].forEach((J,re)=>{f.checker.p.push(J[0],J[1],J[2]),f.checker.n.push(0,1,0),f.checker.u.push(J[3],re<2?0:1)}),f.checker.i.push(Q,Q+2,Q+1,Q,Q+3,Q+2)}}for(let[b,S,w]of[[je.at,1,-1],[E-je.at,-1,1]])u(b,S,w,ht.course(a,t,x));if(x.view&&x.view.kind==="view"){let b=x.view,S=ht.view(t);u(b.sFrom-80,b.sign,-1,S),u(b.sTo+80,b.sign,1,S)}let y=a.height.walls[x.idx];if(y)for(let[b,S]of[[1,-1],[2,1]]){let w=-1/0;for(let O=Math.max(1,z.from);O<z.to;O++){if(!(y.flags[O]&b)||y.flags[O-1]&b)continue;let P=O;for(;P+1<_.n&&y.flags[P+1]&b;)P++;if(!(P-O<30||_.s[O]-w<400)){w=_.s[O];for(let[I,j]of[[O-10,-1],[P+10,1]]){if(I<z.from||I>=z.to)continue;let G=R(x,I,S),V=G.x+G.ox*.9,$=G.z+G.oz*.9;wa(f,d,V,G.y,$,qe(G.tx*j,G.tz*j),Mt(4),.7)}}}}}if(yield,N==="spoke"&&(u(90,1,-1,ht.spoke(a,t,x)),x.view&&u(x.view.sFrom-70,x.view.sign,-1,ht.parking(t))),N==="ring")for(let M of vr(a))u(M.s-120,1,-1,ht.ringA(t,M)),u(M.s+120,-1,1,ht.ringB(t,M));if(x.view&&x.view.kind==="parking"){let M=x.view,g=M.s-ut.flat/2,y=S=>{let w=$e(_,S);return w>=z.from&&w<z.to?R(x,w,M.sign):null};for(let S=0;S<=ut.bays;S++){let w=y(g+2+S*ut.bayW);if(!w)continue;let O=Fe();ft(O,.12,.02,ut.bayL,0,.02,0),Ie(f.white,O,w.x-w.ox*(1.2+ut.bayL/2),w.y,w.z-w.oz*(1.2+ut.bayL/2),qe(w.ox,w.oz))}for(let S of[g+12,g+ut.flat-8]){let w=y(S);w&&L(w,1)}let b=y(g+ut.flat-ut.canopy[0]/2-3);if(b){let S=qe(b.ox,b.oz),w=b.x-b.ox*ut.canopyIn,O=b.z-b.oz*ut.canopyIn,P=Fe(),I=Fe(),j=Fe(),G=Fe(),V=Fe(),[$,Q,J]=ut.canopy;ft(P,$,.35,Q,0,J+.175,0),ft(I,$+.1,.5,Q+.1,0,J+.2,0);for(let re of[-$/2+1.2,$/2-1.2])ft(j,.35,J,.35,re,J/2,0),ft(G,.9,1.5,.5,re*.45,.85,0),ft(j,2.6,.2,1.2,re*.45,.1,0);for(let re of[1.6,2.6,3.6]){let fe=ut.canopyIn-5,ue=Math.cos(S),Pe=Math.sin(S);r.push(w+re*ue+fe*Pe,b.y,O-re*Pe+fe*ue,S+Math.PI)}ft(V,9,3.2,4,0,1.6,ut.canopyIn-2.6),Ie(f.white,P,w,b.y,O,S),Ie(f.orange,I,w,b.y,O,S),Ie(f.metal,j,w,b.y,O,S),Ie(f.orange,G,w,b.y,O,S),Ie(f.concrete,V,w,b.y,O,S)}}if(x.view&&x.view.kind==="view"){let M=x.view;for(let g of[-5,5]){let y=$e(_,M.s+g);if(y<z.from||y>=z.to)continue;let b=R(x,y,M.sign),S=b.x-b.ox*1.3,w=b.z-b.oz*1.3,O=qe(b.ox,b.oz),P=Fe();ft(P,1.8,.07,.42,0,.45,0),ft(P,1.8,.3,.06,0,.72,-.2);for(let I of[-.75,.75])ft(P,.08,.45,.4,I,.22,0);Ie(f.concrete,P,S,b.y,w,O)}for(let g of[11,12]){let y=$e(_,M.s+g);if(y<z.from||y>=z.to)continue;let b=R(x,y,M.sign);r.push(b.x-b.ox*2.4,b.y,b.z-b.oz*2.4,qe(b.ox,b.oz)+Math.PI)}}yield;for(let M of(x.data.structures||[]).filter(g=>g.type==="viaduct"||g.type==="tunnel"||N==="course")){let g=$e(_,M.sFrom),y=$e(_,M.sTo),b=Math.max(z.from,g),S=Math.min(z.to,y);if(S<=b)continue;let w=(P,I,j)=>{let G=R(x,P,I);return{x:G.x+G.ox*j,y:G.y,z:G.z+G.oz*j,ox:G.ox,oz:G.oz}},O=M.type==="viaduct";if(M.type==="bridge"||O){let P=O?{out:.75,skirt:2.2,thick:.3,top:1.1,ext:0}:ja.rail,I=ja.post;for(let V=b;V<S;V+=2){let $=Math.min(S,V+2),Q=w(V,-1,P.out),J=w(V,1,P.out),re=w($,-1,P.out),fe=w($,1,P.out),ue=Pe=>[Pe.x,Pe.y-P.skirt,Pe.z];gt(f.concrete,ue(Q),ue(re),ue(fe),ue(J))}for(let V of oi(x,z.from,z.to,($,Q)=>fa(e.terrain,$-s,Q-c))){let $=Fe(),Q=V.yTop-V.yBase;ft($,V.size||go.size,Q,V.size||go.size,0,-Q/2,0),Ie(f.concrete,$,V.x-s,V.yTop,V.z-c,V.yaw)}let j=Math.max(z.from,g-Math.round(P.ext/_.step)),G=Math.min(z.to,y+Math.round(P.ext/_.step));for(let V of[-1,1]){for(let $=j;$<G;$+=2)_.open&&(_.open[$]|_.open[Math.min(G,$+2)])&(V>0?2:1)||Va(f.concrete,w($,V,P.out),w(Math.min(G,$+2),V,P.out),P.thick,-P.skirt,P.top);for(let $ of[g-Math.round(P.ext/_.step),y+Math.round(P.ext/_.step)]){if($<z.from||$>z.to)continue;let Q=R(x,$,V),J=Fe();ft(J,I.size,I.top+P.skirt,I.size,0,(I.top-P.skirt)/2,0),Ie(f.concrete,J,Q.x+Q.ox*(P.out+P.thick/2),Q.y,Q.z+Q.oz*(P.out+P.thick/2),qe(Q.tx,Q.tz))}}}else{let P=ja.shed;for(let I=b;I<S;I+=P.step){if(_.open&&(_.open[I]|_.open[Math.min(S,I+P.step)])&16)continue;let j=Math.min(S,I+P.step),G=w(I,-1,P.out),V=w(j,-1,P.out),$=w(I,1,P.out),Q=w(j,1,P.out);Va(f.concrete,G,V,P.thick,-.5,P.top+P.roof),Va(f.concrete,$,Q,P.thick,-.5,P.top+P.roof);let J=(re,fe)=>[re.x,re.y+fe,re.z];gt(f.concrete,J(G,P.top),J($,P.top),J(Q,P.top),J(V,P.top)),gt(f.concrete,J(G,P.top+P.roof),J(V,P.top+P.roof),J(Q,P.top+P.roof),J($,P.top+P.roof))}for(let[I,j]of[[g,1],[y,-1]]){if(I<z.from||I>z.to)continue;let G=w(I,-1,P.out),V=w(I,1,P.out),$=(J,re,fe=0)=>[J.x+J.ox*fe,J.y+re,J.z+J.oz*fe],Q=(J,re,fe,ue)=>j>0?gt(f.concrete,J,re,fe,ue):gt(f.concrete,re,J,ue,fe);Q($(G,-.5,P.thick),$(G,-.5),$(G,P.top+P.roof),$(G,P.top+P.roof,P.thick)),Q($(V,-.5),$(V,-.5,P.thick),$(V,P.top+P.roof,P.thick),$(V,P.top+P.roof)),Q($(G,P.top),$(V,P.top),$(V,P.top+P.roof),$(G,P.top+P.roof))}}}let h=x.data.scenery?.roadside;if(h)for(let M=Math.ceil(k(z.from)/v);M*v<k(z.to);M++){let g=M*v;if(g<25||g>E-25||(x.data.structures||[]).some(S=>S.type==="tunnel"&&g>S.sFrom-10&&g<S.sTo+10))continue;let y=R(x,$e(_,g),1),b=qe(y.tx,y.tz);Ie(f.concrete,d.pole,y.x+y.ox*ge.poleOut,y.y,y.z+y.oz*ge.poleOut,b),Ie(f.metal,d.arm,y.x+y.ox*ge.poleOut,y.y,y.z+y.oz*ge.poleOut,b),h==="town"&&M%2==0&&L(R(x,$e(_,g),-1),0)}if(N==="course"||N==="link"){let M=(y,b)=>{let S=$e(_,y);if(S<z.from||S>=z.to||y<20||y>E-20)return;let w=R(x,S,b),O=Fe();kt(O,.035,.035,-.4,1.35,6,0,-.04),Ie(f.metal,O,w.x+w.ox*.75,w.y,w.z+w.oz*.75,qe(-w.ox,-w.oz));let P=Fe();Nt(P,.55,.72,.62,0,Mt(5),b>0),Nt(P,.55,.72,.62,-.02,Mt(7),b<0),Ie(f.signs,P,w.x+w.ox*.75,w.y,w.z+w.oz*.75,qe(-w.ox,-w.oz))},g=o.get(x.idx);g||o.set(x.idx,g=ro(x));for(let y of g)for(let b=-2;b<=2;b++)M(_.s[y.row]+b*7,y.right?-1:1);for(let y=Math.ceil(k(z.from)/55);y*55<k(z.to);y++){let b=y*55,S=_.curvature[$e(_,b)];if(!(Math.abs(S)<1/45||g.some(w=>Math.abs(_.s[w.row]-b)<60)))for(let w=-1;w<=1;w++)M(b+w*7,S>0?-1:1)}for(let y=Math.ceil(k(z.from)/42);y*42<k(z.to);y++){let b=y*42,S=$e(_,b);if(b<30||b>E-30||_.pos[3*S+1]<(x.data.region?1100:420))continue;let w=R(x,S,1),O=Fe();kt(O,.04,.04,-.4,4.6,6,0,0),ft(O,.06,.06,1.1,0,4.55,-.5),Ie(f.white,O,w.x+w.ox*.9,w.y,w.z+w.oz*.9,qe(-w.ox,-w.oz));let P=Fe();Nt(P,.32,.9,3.7,-1,Mt(6)),Nt(P,.32,.9,3.7,-1.02,Mt(6),!0),Ie(f.signs,P,w.x+w.ox*.9,w.y,w.z+w.oz*.9,qe(-w.ox,-w.oz)+Math.PI/2)}}if(yield,N==="course"){let M=o.get(x.idx);M||o.set(x.idx,M=ro(x));for(let g of M){if(g.row<z.from||g.row>=z.to)continue;let y=g.right?-1:1,b=R(x,g.row,y),S=b.x+b.ox*1.6,w=b.z+b.oz*1.6,O=qe(-b.ox,-b.oz);Ie(f.orange,d.mirror,S,b.y,w,O),Ie(f.mirror,d.mirrorFace,S,b.y,w,O),L(R(x,$e(_,_.s[g.row]-8),y),0);let P=_.s[g.row]+35;if(P<E-30){let I=R(x,$e(_,P),-1),j=qe(I.tx,I.tz);wa(f,d,I.x+I.ox*.9,I.y,I.z+I.oz*.9,j,Mt(g.right?3:2),.75),g.no<=56&&wa(f,d,I.x+I.ox*.9-I.tx*3,I.y,I.z+I.oz*.9-I.tz*3,j,Mt(7+g.no),.75,1.35)}}}yield}let C=new lt;C.name="roadside";let A=(z,x,_)=>{if(!z.i.length)return;let N=new ot;N.setAttribute("position",new Ce(z.p,3)),N.setAttribute("normal",new Ce(z.n,3)),N.setAttribute("uv",new Ce(z.u,2)),N.setIndex(z.i),N.computeBoundingSphere();let E=new tt(N,x);E.castShadow=_,E.receiveShadow=!0,C.add(E)};for(let[z,x]of Object.entries(pr))A(f[z],t.mats[z],x);if(r.length&&t.vend){let z=new Sr(t.vend.geo,t.vend.mats,r.length/4),x=new Ke;for(let _=0;_<r.length;_+=4)z.setMatrixAt(_/4,x.makeRotationY(r[_+3]).setPosition(r[_],r[_+1],r[_+2]));z.castShadow=!0,z.receiveShadow=!0,z.name="roadVending",z.computeBoundingSphere(),C.add(z)}return p.length&&(new ot,C.add(za(p))),i&&m.length&&C.add(po(m,i)),C}function wa(a,e,t,o,i,r,l,n,s=0){Ie(a.metal,e.signPole,t,o+s,i,r);let c=Fe();Nt(c,n,n,2+s,.05,l),Nt(c,n,n,2+s,.03,Mt(7),!0),Ie(a.signs,c,t,o,i,r)}function No(a){a.removeFromParent(),a.traverse(e=>{let t=e;t.geometry&&t.geometry.dispose()}),a.clear()}var Tl=`
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
`,Dl=`
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
`,zl=`
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
`,et={uDayLum:{value:0},uBounce:{value:new Ne(0,0,0)},uNearC:{value:[0,0]},tFacDet:{value:null},tFacGrime:{value:null},tSigns:{value:null}},lo={tRoofDet:{value:null}},Fl=null,Ll=[["ラーメン 一番",0],["居酒屋 とり吉",1],["寿司 まる八",1],["焼肉 大将",0],["ほっと弁当",0],["喫茶 ロマン",1],["中華料理 龍門",1],["そば・うどん",1],["吉田のうどん",1],["和菓子 松月堂",1],["美容室 カット",0],["理容 タナカ",0],["山田歯科医院",0],["ふじ整骨院",0],["学習塾 進学会",0],["クリーニング",0],["不動産 賃貸",1],["コインランドリー",0],["くすり 薬局",0],["酒 山本商店",1],["書店 文林堂",1],["サイクルショップ",0],["でんき 電器店",0],["写真 カメラ",0],["メガネ・時計",0],["生花 フラワー",0],["タイヤ専門店",0],["自動車整備工場",0],["鈑金塗装",0],["中古車 販売",0],["カー用品",0],["チューニング工房",0]],Rl=["ラーメン","居酒屋","薬","美容室","歯科","そば","寿司","焼肉","スナック","カラオケ","診療所","整体","質","酒","たばこ","旅館","麻雀","うどん","定食","喫茶","不動産","学習塾","理容","花","本","鍼灸","接骨院","古着","パチンコ","ゲーム","民宿","整備"],ko=[["#e8e4dc","#b0221c"],["#a8261e","#f2eee6"],["#e0b52c","#1d1a16"],["#1f4f8f","#f0f0ee"],["#2f6b45","#f0f0e8"],["#1c1c1e","#e6c13a"],["#e6dcc4","#5a3520"],["#cc6a1e","#fbf6ec"],["#f2f1ec","#1d2a52"],["#5b2a44","#f2e6ec"]];function Al(){let a=2048,e=new OffscreenCanvas(a,a),t=e.getContext("2d"),o='"Yu Gothic UI", "Yu Gothic", YuGothic, Meiryo, "Hiragino Kaku Gothic ProN", "Hiragino Sans", "Noto Sans JP", "Noto Sans CJK JP", sans-serif',i='"Yu Mincho", YuMincho, "Hiragino Mincho ProN", "Noto Serif JP", "Noto Serif CJK JP", "MS Mincho", serif',r=n=>ko[(n*7+3)%ko.length];t.fillStyle="#808080",t.fillRect(0,0,a,a),t.textAlign="center",t.textBaseline="middle",Ll.forEach(([n,s],c)=>{let d=c%4*512,f=Math.floor(c/4)*128,[p,m]=r(c);t.fillStyle=p,t.fillRect(d,f,512,128),t.fillStyle=m,t.fillRect(d,f+6,512,5),t.fillRect(d,f+117,512,5),t.font=`bold 76px ${s?i:o}`;let L=t.measureText(n).width,R=Math.min(1,440/Math.max(1,L));t.save(),t.translate(d+256,f+66),t.scale(R,1),t.fillText(n,0,0),t.restore()}),Rl.forEach((n,s)=>{let c=s%16*128,d=1024+Math.floor(s/16)*512,[f,p]=r(s+5),m=[...n],L=Math.min(92,440/m.length);t.fillStyle=p,t.fillRect(c,d,128,512),t.fillStyle=f,t.fillRect(c+7,d+7,114,498),t.fillStyle=p,t.font=`bold ${L}px ${s%3?o:i}`,m.forEach((R,C)=>{let A=d+256+(C-(m.length-1)/2)*L*1.02;R==="ー"?(t.save(),t.translate(c+64,A),t.rotate(Math.PI/2),t.fillText(R,0,0),t.restore()):t.fillText(R,c+64,A)})});let l=new mt(e);return l.wrapS=l.wrapT=1001,l.minFilter=Ca,l.magFilter=Pa,l.generateMipmaps=!0,l.anisotropy=4,l.colorSpace=pt,l.needsUpdate=!0,l}function El(a){let e=()=>{let t=new OffscreenCanvas(1,1),o=t.getContext("2d");return o.fillStyle="#808080",o.fillRect(0,0,1,1),new mt(t)};return et.tFacDet.value||(et.tFacDet.value=e(),et.tFacGrime.value=e(),lo.tRoofDet.value=e()),et.tSigns.value||(et.tSigns.value=Al()),Fl||=Promise.all(["facade_detail","facade_grime","roof_detail"].map(async t=>{let o=await createImageBitmap(await(await fetch(`${a}textures/${t}.jpg`)).blob()),i=new mt(o);return i.wrapS=i.wrapT=wt,i.minFilter=Ca,i.magFilter=Pa,i.generateMipmaps=!0,i.anisotropy=4,i.colorSpace="",i.needsUpdate=!0,i})).then(([t,o,i])=>{et.tFacDet.value=t,et.tFacGrime.value=o,lo.tRoofDet.value=i}).catch(t=>console.warn("текстуры фасадов:",t))}function Nl(a){let e=new ke({roughness:1,metalness:0,envMapIntensity:.75});return e.name="cityFacade",e.userData.night=a,e.onBeforeCompile=t=>{t.uniforms.uNight=a,t.uniforms.uDayLum=et.uDayLum,t.uniforms.uBounce=et.uBounce,t.uniforms.uNearC=et.uNearC,t.uniforms.tFacDet=et.tFacDet,t.uniforms.tFacGrime=et.tFacGrime,t.uniforms.tSigns=et.tSigns,t.vertexShader=Tl+t.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
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
	if ( floor( aKind + 0.5 ) == 45.0 && vFacNear > 0.5 ) gl_Position = vec4( 0.0, 0.0, -2.0, 1.0 );`),t.fragmentShader=Dl+t.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
`+zl).replace("#include <roughnessmap_fragment>","float roughnessFactor = fRough;").replace("#include <metalnessmap_fragment>","float metalnessFactor = fMetal;").replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
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
#include <fog_fragment>`)},e.customProgramCacheKey=()=>"cityFacade28",e}function kl(){let a=new ke({vertexColors:!0,roughness:.95,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3});return a.name="cityGround",a.onBeforeCompile=e=>{e.vertexShader=`attribute float aGround;
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
	}`)},a.customProgramCacheKey=()=>"cityGround8",a}var gr={thick:.1,capW:.03,capH:.075};function xr(a){let e=[],t=[],o=[];for(let[r,l]of a){let n=r[0],s=r[1],c=r[2],d=(s[1]-n[1])*(c[2]-n[2])-(s[2]-n[2])*(c[1]-n[1]),f=(s[2]-n[2])*(c[0]-n[0])-(s[0]-n[0])*(c[2]-n[2]),p=(s[0]-n[0])*(c[1]-n[1])-(s[1]-n[1])*(c[0]-n[0]),m=d*l[0]+f*l[1]+p*l[2]<0?[...r].reverse():r,L=e.length/3;for(let R of m)e.push(...R),t.push(...l);for(let R=1;R+1<m.length;R++)o.push(L,L+R,L+R+1)}let i=new ot;return i.setAttribute("position",new Ce(e,3)),i.setAttribute("normal",new Ce(t,3)),i.setIndex(o),i}function wr(a){let{capW:e,capH:t}=gr,o=.97,i=1+t;return[[[[-a,i,-e],[a,i,-e],[a,i,e],[-a,i,e]],[0,1,0]],[[[-a,o,e],[a,o,e],[a,i,e],[-a,i,e]],[0,0,1]],[[[-a,o,-e],[a,o,-e],[a,i,-e],[-a,i,-e]],[0,0,-1]],[[[-a,o,-e],[-a,o,e],[-a,i,e],[-a,i,-e]],[-1,0,0]],[[[a,o,-e],[a,o,e],[a,i,e],[a,i,-e]],[1,0,0]]]}function Oo(a=!0){let e=Math.SQRT1_2,t=a?gr.thick:0,o=[[[[-.5,0,.5],[.5,0,.5],[.5,1,0],[-.5,1,0]],[0,e,e]],[[[.5,0,-.5],[-.5,0,-.5],[-.5,1,0],[.5,1,0]],[0,e,-e]],a?[[[-.5,-t,-.5],[-.5,-t,.5],[-.5,0,.5],[-.5,1,0],[-.5,0,-.5]],[-1,0,0]]:[[[-.5,0,-.5],[-.5,0,.5],[-.5,1,0]],[-1,0,0]],a?[[[.5,-t,-.5],[.5,-t,.5],[.5,0,.5],[.5,1,0],[.5,0,-.5]],[1,0,0]]:[[[.5,0,-.5],[.5,0,.5],[.5,1,0]],[1,0,0]]];return a&&o.push([[[-.5,-t,.5],[.5,-t,.5],[.5,0,.5],[-.5,0,.5]],[0,0,1]],[[[-.5,-t,-.5],[.5,-t,-.5],[.5,0,-.5],[-.5,0,-.5]],[0,0,-1]],[[[-.5,-t,-.5],[.5,-t,-.5],[.5,-t,.5],[-.5,-t,.5]],[0,-1,0]],...wr(.5)),xr(o)}function Io(a=!0){let e=Math.SQRT1_2,t=.22,o=[[[[-.5,0,.5],[.5,0,.5],[t,1,0],[-.22,1,0]],[0,e,e]],[[[.5,0,-.5],[-.5,0,-.5],[-.22,1,0],[t,1,0]],[0,e,-e]],[[[-.5,0,-.5],[-.5,0,.5],[-.22,1,0]],[-e,e,0]],[[[.5,0,.5],[.5,0,-.5],[t,1,0]],[e,e,0]]];return a&&o.push([[[-.5,-.1,.5],[.5,-.1,.5],[.5,0,.5],[-.5,0,.5]],[0,0,1]],[[[-.5,-.1,-.5],[.5,-.1,-.5],[.5,0,-.5],[-.5,0,-.5]],[0,0,-1]],[[[-.5,-.1,-.5],[-.5,-.1,.5],[-.5,0,.5],[-.5,0,-.5]],[-1,0,0]],[[[.5,-.1,-.5],[.5,-.1,.5],[.5,0,.5],[.5,0,-.5]],[1,0,0]],[[[-.5,-.1,-.5],[.5,-.1,-.5],[.5,-.1,.5],[-.5,-.1,.5]],[0,-1,0]],...wr(t)),xr(o)}var mo={cols:8,px:256,period:12},Zt={boulevard:0,avenue:1,collector:2,minor:3,asphalt:4,white:6};function yr(a,e,t,o){a.fillStyle="#3b3c3f",a.fillRect(0,0,e,t);let i=12345,r=()=>(i=i*1664525+1013904223>>>0,i/4294967296);for(let l=0;l<o;l++){let n=44+Math.floor(r()*34);a.fillStyle=`rgb(${n},${n},${n+2})`,a.fillRect(Math.floor(r()*e),Math.floor(r()*t),2,2)}}function Ol(){let a=mo.px,e=new OffscreenCanvas(a,a);yr(e.getContext("2d"),a,a,3250);let t=new mt(e);return t.colorSpace=pt,t.wrapS=t.wrapT=wt,t.anisotropy=4,t}function Il(){let a=mo,e=a.cols*a.px,t=a.px,o=new OffscreenCanvas(e,t),i=o.getContext("2d");yr(i,e,t,26e3);let r="#e6e6e2",l=(s,c,d,f,p,m=!1)=>{i.fillStyle=p;let L=s*a.px+d/c*a.px,R=Math.max(2,f/c*a.px);i.fillRect(L-R/2,0,R,m?t/2:t)};for(let[s,c]of[["boulevard",0],["avenue",1],["collector",2],["minor",3]]){let d=tr[s].w;if(l(c,d,.5,.15,r),l(c,d,d-.5,.15,r),s==="boulevard"){l(c,d,d/2-.9,.15,r),l(c,d,d/2+.9,.15,r),i.save(),i.beginPath(),i.rect(c*a.px+(d/2-.82)/d*a.px,0,1.64/d*a.px,t),i.clip(),i.strokeStyle=r,i.lineWidth=4;for(let f=-4;f<12;f++)i.beginPath(),i.moveTo(c*a.px+a.px*.42,f*t/6),i.lineTo(c*a.px+a.px*.58,f*t/6+t/6),i.stroke();i.restore(),l(c,d,d/2-.9-(d/2-1.4)/2,.15,r,!0),l(c,d,d/2+.9+(d/2-1.4)/2,.15,r,!0)}else s==="avenue"?(l(c,d,d/2,.18,"#e2a23a"),l(c,d,.5+(d/2-.5)/2,.15,r,!0),l(c,d,d-.5-(d/2-.5)/2,.15,r,!0)):l(c,d,d/2,.15,r,!0)}i.fillStyle=r,i.fillRect(Zt.white*a.px,0,a.px,t);let n=new mt(o);return n.colorSpace=pt,n.wrapT=wt,n.anisotropy=4,n}var ct={poleH:6.2,arm:5.2,headX:4.4,headY:5.55};function Ul(){let a=new Ja(.1,.12,ct.poleH,8);a.translate(0,ct.poleH/2,0);let e=new Ja(.055,.055,ct.arm,6);e.rotateZ(Math.PI/2),e.translate(ct.arm/2,ct.poleH-.3,0);let t=new Jt(1.36,.46,.3);t.translate(ct.headX,ct.headY,0);let o=new Jt(.06,ct.poleH-.3-ct.headY-.23,.06);o.translate(ct.headX,(ct.poleH-.3+ct.headY+.23)/2,0);let i=l=>{let n=[],s=[],c=[];for(let f of l){let p=f.getAttribute("position"),m=f.getAttribute("normal"),L=n.length/3;for(let C=0;C<p.count;C++)n.push(p.getX(C),p.getY(C),p.getZ(C)),s.push(m.getX(C),m.getY(C),m.getZ(C));let R=f.getIndex();for(let C=0;C<R.count;C++)c.push(L+R.getX(C));f.dispose()}let d=new ot;return d.setAttribute("position",new Ce(n,3)),d.setAttribute("normal",new Ce(s,3)),d.setIndex(c),d},r=l=>{let n=[],s=[],c=[],d=[[.1,1,.75],[1,.75,.1],[1,.12,.08]];for(let p=0;p<3;p++){let m=ct.headX-.42+p*.42,L=n.length/3,R=p===l,C=d[p].map(A=>A*(R?1.6:.07));n.push(m,ct.headY,.16),s.push(...C);for(let A=0;A<=12;A++){let z=A/12*Math.PI*2;n.push(m+Math.cos(z)*.15,ct.headY+Math.sin(z)*.15,.16),s.push(...C)}for(let A=0;A<12;A++)c.push(L,L+A+1,L+A+2)}let f=new ot;return f.setAttribute("position",new Ce(n,3)),f.setAttribute("color",new Ce(s,3)),f.setIndex(c),f};return{body:i([a,e,t,o]),go:r(0),stop:r(2)}}function Hl(){let a=new Jt(.9,1.83,.75);a.translate(0,.915,0),a.groups.forEach((n,s)=>{n.materialIndex=+(s===4)});let e=new OffscreenCanvas(128,256),t=e.getContext("2d");t.fillStyle="#f4f4f2",t.fillRect(0,0,128,256),t.fillStyle="#c8202a",t.fillRect(0,0,128,34),t.fillStyle="#20252b",t.fillRect(8,40,112,120);let o=["#d32f2f","#1e88e5","#43a047","#fbc02d","#8e24aa","#f57c00","#ffffff","#795548"];for(let n=0;n<4;n++)for(let s=0;s<6;s++)t.fillStyle=o[(n*3+s*5)%o.length],t.fillRect(12+s*18,46+n*28,12,20);t.fillStyle="#2b2f36",t.fillRect(16,196,96,26),t.fillStyle="#8a9099",t.fillRect(96,168,14,22);let i=new mt(e);i.colorSpace=pt;let r=new ke({color:15263974,roughness:.4,metalness:.2}),l=new ke({map:i,roughness:.25,emissive:16777215,emissiveMap:i,emissiveIntensity:.05});return r.name="cityVendBody",l.name="cityVendFace",{geo:a,mats:[r,l],tex:i}}var so={uRes:{value:[800,450]},uColor:{value:new Ne(1776928)}},Uo=null;function za(a,e=.012){Uo||=new Mr({name:"wires",transparent:!0,depthWrite:!1,side:2,uniforms:so,vertexShader:`attribute vec3 aB;
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
void main() { gl_FragColor = vec4( uColor, vA ); }`});let t=a.length/6,o=new Float32Array(t*12),i=new Float32Array(t*12),r=new Float32Array(t*4),l=new Float32Array(t*4),n=new Uint32Array(t*6);for(let d=0;d<t;d++){let f=a.slice(d*6,d*6+3),p=a.slice(d*6+3,d*6+6),m=typeof e=="number"?e:e[d];[f,f,p,p].forEach((L,R)=>(o.set(L,d*12+R*3),i.set(R<2?p:f,d*12+R*3),l[d*4+R]=m)),r.set([-1,1,1,-1],d*4),n.set([d*4,d*4+1,d*4+2,d*4+1,d*4+3,d*4+2],d*6)}let s=new ot;s.setAttribute("position",new Ce(o,3)),s.setAttribute("aB",new Ce(i,3)),s.setAttribute("aSide",new Ce(r,1)),s.setAttribute("aR",new Ce(l,1)),s.setIndex(Array.from(n)),s.computeBoundingSphere();let c=new tt(s,Uo);return c.name="wires",c.renderOrder=2,c.userData.noAO=!0,c}function Bl(a,e,t=null){let o={concrete:Fe(),metal:Fe()},i=[],r=[];for(let n of a){let[s,c,d,f]=n;if(Ie(o.concrete,e.tpl.pole,s,c,d,f),Ie(o.metal,e.tpl.arm,s,c,d,f),n.length<8)continue;let[p,m,L,R]=n.slice(4),C=Math.cos(f),A=Math.sin(f),z=Math.cos(R),x=Math.sin(R);for(let[_,N,E,k]of[[-.9,.22,ge.sag,.008],[0,.22,ge.sag,.008],[.9,.22,ge.sag,.008],[-.3,-1.2,ge.sag*1.3,.012],[.3,-1.2,ge.sag*1.3,.012],[.35,-3.3,ge.sag*2.2,.03],[.5,-3.7,ge.sag*2.6,.022]]){let u=s+_*C,v=d-_*A,T=c+ge.armH+N,F=p+_*z,D=L-_*x,h=m+ge.armH+N;for(let M=0;M<8;M++){let g=M/8,y=(M+1)/8,b=S=>E*4*S*(1-S);i.push(u+(F-u)*g,T+(h-T)*g-b(g),v+(D-v)*g,u+(F-u)*y,T+(h-T)*y-b(y),v+(D-v)*y),r.push(k)}}}if(t)for(let n=0;n<t.length;n+=6){let s=t[n],c=t[n+1]+ge.armH-1.3,d=t[n+2],f=t[n+3],p=t[n+4],m=t[n+5],L=.25+.03*Math.hypot(f-s,m-d);for(let R=0;R<6;R++){let C=R/6,A=(R+1)/6,z=x=>L*4*x*(1-x);i.push(s+(f-s)*C,c+(p-c)*C-z(C),d+(m-d)*C,s+(f-s)*A,c+(p-c)*A-z(A),d+(m-d)*A),r.push(.009)}}let l=new lt;l.name="townPoles";for(let[n,s]of[[o.concrete,e.mats.concrete],[o.metal,e.mats.metal]]){if(!n.i.length)continue;let c=new ot;c.setAttribute("position",new Ce(n.p,3)),c.setAttribute("normal",new Ce(n.n,3)),c.setAttribute("uv",new Ce(n.u,2)),c.setIndex(n.i),c.computeBoundingSphere();let d=new tt(c,s);d.castShadow=s===e.mats.concrete,d.receiveShadow=!0,l.add(d)}return i.length&&l.add(za(i,r)),l}var Sr=at,Mr=st;function Gl(){let a=new ke({color:16777215,roughness:.62,metalness:0,envMapIntensity:.7});a.name="cityRoof",a.onBeforeCompile=x=>{x.vertexShader=`varying float vRoofY;
varying float vRoofU;
varying float vRoofN;
varying float vRoofX;
`+x.vertexShader.replace("#include <fog_vertex>",`#include <fog_vertex>
	vRoofY = ( modelMatrix * instanceMatrix * vec4( transformed, 1.0 ) ).y; vRoofU = position.x * length( instanceMatrix[ 0 ].xyz ); vRoofN = normal.y; vRoofX = abs( normal.x );`),x.uniforms.uSnowRoof=It.uSnow,x.uniforms.tRoofDet=lo.tRoofDet,x.fragmentShader=`uniform float uSnowRoof;
uniform sampler2D tRoofDet;
varying float vRoofY;
varying float vRoofU;
varying float vRoofN;
varying float vRoofX;
`+x.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
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
	}`)},a.customProgramCacheKey=()=>"cityRoof4";let e=Hl(),t={value:0},o=Il(),i=Ul(),r=new ke({map:o,roughness:.92,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2});r.name="cityStreet";let l=Ol(),n=r.clone();n.map=l,n.name="cityCross";let s=new ke({color:4868941,roughness:.95,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1});s.name="cityLane";let c=new ke({color:10197394,roughness:.95});c.name="cityParapet";let d=new ke({color:7304055,roughness:.55,metalness:.5});d.name="citySignal";let f=new Ot({vertexColors:!0});f.name="citySignalLens";let p=new ke({color:16777215,roughness:1,metalness:0,envMapIntensity:.6});p.name="cityGreen";let m=(x,_=.3)=>{let N=new Or(1,x),E=N.getAttribute("position"),k=N.getAttribute("normal");for(let u=0;u<E.count;u++){let v=E.getX(u),T=E.getY(u),F=E.getZ(u),D=Math.hypot(v,T,F)||1,h=Math.round(v/D*1e3)/1e3,M=Math.round(T/D*1e3)/1e3,g=Math.round(F/D*1e3)/1e3,y=Math.sin(h*37.7+M*91.3+g*53.1)*43758.5453,b=1-_/2+_*(y-Math.floor(y));E.setXYZ(u,h*b,M<-.25?-.25+(M+.25)*.45*b:M*b,g*b),k.setXYZ(u,h,M,g)}return N},L=m(1),R=m(0),C=m(0),A=new Ja(.7,1,1,6,1,!0);A.translate(0,.5,0);let z=new ke({color:1854034,roughness:.12,metalness:.3});return z.name="cityWater",{setLights(x,_){t.value=x*_,e.mats[1].emissiveIntensity=.05+x*_*.9},facade:Nl(t),ground:kl(),lanes:s,parapet:c,street:r,cross:n,water:z,roofGeo:Oo(),hipGeo:Io(),roofMat:a,poles:mr(),vendGeo:e.geo,vendMats:e.mats,signal:i,signalBody:d,signalLens:f,green:p,crownGeo:L,crownFarGeo:R,shrubGeo:C,trunkGeo:A,roofFarGeo:Oo(!1),hipFarGeo:Io(!1),dispose(){this.facade.dispose(),this.ground.dispose(),s.dispose(),c.dispose(),r.dispose(),n.dispose(),l.dispose(),z.dispose(),o.dispose(),this.roofGeo.dispose(),this.hipGeo.dispose(),this.roofFarGeo.dispose(),this.hipFarGeo.dispose(),a.dispose(),this.poles.dispose(),e.geo.dispose(),e.tex.dispose();for(let x of e.mats)x.dispose();i.body.dispose(),i.go.dispose(),i.stop.dispose(),d.dispose(),f.dispose(),p.dispose(),L.dispose(),R.dispose(),C.dispose(),A.dispose()}}}var Ho=[4869975,3816772,5591628,3424335,4930094,4016704,5922403,7027502,3093048,4474959,7234130,5068387],Bo={[Re.house]:[!1,.3,1.2],[Re.houseHip]:[!0,.28,1.3],[Re.houseLow]:[!0,.13,1.1],[Re.pagodaTier]:[!0,.11,5.2],[Re.apartment]:[!1,.16,.7],[Re.shed]:[!1,.2,.4],[Re.farmhouse]:[!0,.34,1.6],[Re.shrine]:[!1,.5,2],[Re.warehouse]:[!1,.1,.3],[Re.factory]:[!1,.08,.3],[Re.greenhouse]:[!1,.14,.1]};function Go(a,e){let t=[];for(let o of[!1,!0]){let i=[];for(let p=0;p<a.length;p+=8){let m=Bo[Math.round(a[p+7])];m&&m[0]===o&&i.push(p)}if(!i.length)continue;let r=new at(o?e.hipGeo:e.roofGeo,e.roofMat,i.length),l=new Ke,n=new ea,s=new ie,c=new ie,d=new ie(0,1,0),f=new Ne;i.forEach((p,m)=>{let L=a[p+3],R=a[p+4],C=a[p+5],A=Math.round(a[p+7]),z=Bo[A],x=Math.floor(Math.abs(Math.sin(a[p]*12.9898+a[p+2]*78.233))*43758.5453),_=A===Re.house||A===Re.houseHip,N=L>=C;_&&Math.abs(L-C)<2.6&&(x>>4)%10<4&&(N=!N);let E=N?C:L,k=z[1]*(_?.82+.05*((x>>8)%9):1);l.compose(s.set(a[p],a[p+1]+R/2-.05,a[p+2]),n.setFromAxisAngle(d,a[p+6]+(N?0:Math.PI/2)),c.set((N?L:C)+(z[0]?z[2]:Math.min(z[2],.3)),E*k,E+z[2])),r.setMatrixAt(m,l),A===Re.greenhouse?f.setHex(14674150):A===Re.warehouse||A===Re.factory||A===Re.shed?f.setHex([8160652,9278616,7307148][x%3]):A===Re.shrine||A===Re.pagodaTier?f.setHex(2899772):f.setHex(Ho[x%Ho.length]),r.setColorAt(m,f)}),r.computeBoundingSphere(),r.castShadow=!0,r.receiveShadow=!0,r.name=o?"roofsHip":"roofs",t.push(r)}return t}var $a={[zt.shrub]:[.05,.13,.04],[zt.tree]:[.06,.15,.045],[zt.sakura]:[.62,.3,.37],[zt.conifer]:[.03,.085,.04],[zt.street]:[.09,.19,.05]};function Wl(a,e,t){let o=ta(a),i=o.tiles.get(e.id);if(!i||!i.greens.length)return null;let r=o.greens,l=e.origin[0],n=e.origin[2],s=[],c=[];for(let _ of i.greens)(r[_*6+5]===zt.shrub?c:s).push(_*6);let d=new lt,f=new Ke,p=new ea,m=new ie,L=new ie,R=new ie(0,1,0),C=new Ne;d.name="cityGreens";let A=(_,N)=>{let E=Math.sin(_*12.9898+N*78.233)*43758.5453;return E-Math.floor(E)},z=(_,N,E=1)=>{let k=.82+.36*A(r[_],r[_+2]);return C.setRGB(N[0]*k*E,N[1]*k*E,N[2]*k*E),C},x=new Map;for(let _ of c){let N=Math.floor((r[_]-l)/125)*64+Math.floor((r[_+2]-n)/125),E=x.get(N);E||x.set(N,E=[]),E.push(_)}for(let[_,N]of x){let E=new at(t.shrubGeo,t.green,N.length),k=Math.floor(_/64),u=_-k*64;N.forEach((v,T)=>{let F=r[v+3];E.setMatrixAt(T,f.compose(m.set(r[v]-l,r[v+1]+F*.55,r[v+2]-n),p.setFromAxisAngle(R,A(r[v+2],r[v])*6.28),L.set(F*1.2,F*.85,F*1.05))),E.setColorAt(T,z(v,$a[zt.shrub]))}),E.computeBoundingSphere(),E.castShadow=!1,E.receiveShadow=!0,E.name="shrubs",E.userData.cell=[k*125,u*125,(k+1)*125,(u+1)*125],d.add(E)}if(s.length){let _=new at(t.crownGeo,t.green,s.length),N=new at(t.trunkGeo,t.green,s.length);s.forEach((E,k)=>{let u=r[E+3],v=r[E+4],T=r[E+5],F=T===zt.conifer,D=F?v*.42:u*.82;_.setMatrixAt(k,f.compose(m.set(r[E]-l,r[E+1]+v-D,r[E+2]-n),p.setFromAxisAngle(R,A(r[E+2],r[E])*6.28),L.set(F?u*.75:u,D,F?u*.75:u*(.85+.3*A(r[E],7))))),_.setColorAt(k,z(E,$a[T]||$a[zt.tree])),N.setMatrixAt(k,f.compose(m.set(r[E]-l,r[E+1]-.2,r[E+2]-n),p.identity(),L.set(.1+v*.022,v-D*.9+.2,.1+v*.022))),N.setColorAt(k,C.setRGB(.09,.065,.045))}),_.computeBoundingSphere(),_.castShadow=!0,_.receiveShadow=!0,_.name="crowns",N.computeBoundingSphere(),N.castShadow=!1,N.receiveShadow=!0,N.name="trunks",d.add(_,N)}return d}var na={street:.03,paint:.04},Ya={out:.55,w:.14,trim:3},Vl=6,Je={gap:.6,len:3,bar:.45,stop:.45,after:1};function jl(a,e,t){let o=ta(a),i=o.tiles.get(e.id);if(!i)return null;let r=e.origin[0],l=e.origin[2],n=o.y,s=[],c=[],d=[],f=mo,p=[],m=[],L=[],R=(u,v)=>n+Math.max(0,o.heightAt(u,v)),C=(u,v)=>(u+.01+v*.98)/f.cols,A=(u,v,T,F,D,h,M,g,y,b,S,w)=>{let O=s.length/3;s.push(u-r,R(u,v)+w,v-l,T-r,R(T,F)+w,F-l,M-r,R(M,g)+w,g-l,D-r,R(D,h)+w,h-l),c.push(C(y,0),b,C(y,1),b,C(y,1),S,C(y,0),S),d.push(O,O+1,O+2,O,O+2,O+3)},z=(u,v,T,F,D,h,M=na.street)=>{let g=Math.hypot(T-u,F-v);if(g<.3)return;let y=(T-u)/g,b=(F-v)/g,S=b*D/2,w=-y*D/2,O=Math.max(1,Math.ceil(g/Vl));for(let P=0;P<O;P++){let I=g*P/O,j=g*(P+1)/O,G=u+y*I,V=v+b*I,$=u+y*j,Q=v+b*j;A(G+S,V+w,G-S,V-w,$+S,Q+w,$-S,Q-w,h,I/f.period,j/f.period,M)}},x=new Map,_=u=>{let v=x.get(u);if(v)return v;let T=o.nodes[u],F=[];for(let b of T.out){let S=o.edges[b.edge];if(S.cls==="edge"||S.cls==="river")continue;let w=b.to===S.b?S.dx:-S.dx,O=b.to===S.b?S.dz:-S.dz;F.push({edge:b.edge,ux:w,uz:O,w:S.w,ang:Math.atan2(O,w),cut:0})}F.sort((b,S)=>b.ang-S.ang);let D=Math.max(0,...F.map(b=>b.w)),h=[];for(let b=0;b<F.length;b++){let S=F[b],w=F[(b+1)%F.length],O=w.ang-S.ang+(b===F.length-1?2*Math.PI:0);if(F.length<2||O>2.97){h.push(null);continue}let P=S.ux,I=S.uz,j=w.ux,G=w.uz,V=-w.w/2*-G-S.w/2*-I,$=-w.w/2*j-S.w/2*P,Q=P*-G- -j*I;if(Math.abs(Q)<1e-6){h.push(null);continue}let J=(V*-G- -j*$)/Q,re=(P*$-I*V)/Q,fe=Math.min(3*D,Math.max(0,J)),ue=Math.min(3*D,Math.max(0,re));S.cut=Math.max(S.cut,fe),w.cut=Math.max(w.cut,ue),h.push([P*J+-I*(S.w/2),I*J+P*(S.w/2),J>=0&&re>=0&&J<=3*D&&re<=3*D])}let M=T.deg>=3?.4:-.4,g=new Map,y=[];for(let b=0;b<F.length;b++){let S=F[b];S.cut=T.deg>=3?Math.max(S.cut+M,S.w/2+.6):M,g.set(S.edge,S.cut);let w=-S.uz,O=S.ux,P=S.cut+(T.signal?Je.gap+Je.len+Je.after+Je.stop:0);y.push([T.x+S.ux*P-w*(S.w/2),T.z+S.uz*P-O*(S.w/2)],[T.x+S.ux*P+w*(S.w/2),T.z+S.uz*P+O*(S.w/2)]),h[b]&&h[b][2]&&y.push([T.x+h[b][0],T.z+h[b][1]])}return v={cut:g,poly:y,list:F},x.set(u,v),v},N=(u,v)=>{let T=o.nodes[u];return T.deg<3?-.4:(_(u).cut.get(v)??T.r)+(T.signal?Je.gap+Je.len+Je.after+Je.stop:0)};for(let u of i.edges){let v=o.edges[u];if(v.cls==="river")continue;let T=o.nodes[v.a],F=o.nodes[v.b],D=N(v.a,u),h=N(v.b,u);v.len-D-h<.5||z(T.x+v.dx*D,T.z+v.dz*D,F.x-v.dx*h,F.z-v.dz*h,v.w,Zt[v.cls])}for(let u of i.minors){let v=o.minors[u],T=Math.hypot(v[2]-v[0],v[3]-v[1]),F=(v[2]-v[0])/T,D=(v[3]-v[1])/T,h=v[4],M=v[5];T-h-M>1&&z(v[0]+F*h,v[1]+D*h,v[2]-F*M,v[3]-D*M,tr.minor.w,Zt.minor)}for(let u of i.nodes){let v=o.nodes[u];if(v.deg<3)continue;let T=_(u),F=T.poly;for(let M of v.out){let g=o.edges[M.edge];if(g.cls==="edge"||g.cls==="river")continue;let y=M.to===g.b?g.dx:-g.dx,b=M.to===g.b?g.dz:-g.dz;if(!v.signal||!ho.has(g.cls))continue;let S=(T.cut.get(M.edge)??v.r)+Je.gap,w=S+Je.len,O=Math.floor((g.w-1)/(2*Je.bar));for(let G=0;G<O;G++){let V=-g.w/2+.6+G*2*Je.bar,$=b*(V+Je.bar/2),Q=-y*(V+Je.bar/2);z(v.x+y*S+$,v.z+b*S+Q,v.x+y*w+$,v.z+b*w+Q,Je.bar,Zt.white,na.paint)}let P=w+Je.after,I=-b*g.w/4,j=y*g.w/4;z(v.x+y*P+I-b*g.w/4,v.z+b*P+j+y*g.w/4,v.x+y*P+I+b*g.w/4,v.z+b*P+j-y*g.w/4,Je.stop,Zt.white,na.paint)}if(F.length<3)continue;let D=M=>(p.push(M[0]-r,R(M[0],M[1])+na.street,M[1]-l),m.push(M[0]/f.period,M[1]/f.period),p.length/3-1),h=(M,g)=>[(M[0]+g[0])/2,(M[1]+g[1])/2];for(let M=0;M<F.length;M++){let g=[v.x,v.z],y=F[(M+1)%F.length],b=F[M];if((b[0]-g[0])*(y[1]-g[1])-(b[1]-g[1])*(y[0]-g[0])<=0)continue;let S=D(g),w=D(y),O=D(b),P=D(h(g,y)),I=D(h(y,b)),j=D(h(b,g));L.push(S,P,j,P,w,I,j,I,O,P,I,j)}}let E=(u,v,T,F,D)=>{let h=new ot;h.setAttribute("position",new Ce(T,3)),h.setAttribute("uv",new Ce(F,2)),h.setIndex(D),h.computeVertexNormals(),h.computeBoundingSphere();let M=new tt(h,v);return M.receiveShadow=!0,M.castShadow=!1,M.name=u,M},k=new lt;k.name="cityStreetSet",d.length&&k.add(E("cityStreets",t.street,s,c,d)),L.length&&k.add(E("cityCross",t.cross,p,m,L)),s.length=0,c.length=0,d.length=0;for(let u of i.blocks){let v=o.blocks[u],T=v.poly.length;if(v.type!=="fields"&&v.type!=="industrial")for(let F=0;F<T;F++){if(v.tags[F]!=="local")continue;let D=v.poly[F],h=v.poly[(F+1)%T],M=Math.hypot(h[0]-D[0],h[1]-D[1]);if(M<12)continue;let g=(h[0]-D[0])/M,y=(h[1]-D[1])/M,b=-y,S=g;(v.c[0]-D[0])*b+(v.c[1]-D[1])*S>0&&(b=-b,S=-S);let w=Ya.out,O=Ya.trim;z(D[0]+g*O+b*w,D[1]+y*O+S*w,h[0]-g*O+b*w,h[1]-y*O+S*w,Ya.w,Zt.white,na.paint)}}return d.length&&k.add(E("cityLines",t.street,s,c,d)),k.children.length?k:null}var Xa={step:38,out:.7};function br(a,e,t){let o=i=>{let r=a.edges[i];if(!ho.has(r.cls))return;let l=a.nodes[r.a],n=r.cls==="boulevard",s=r.dz,c=-r.dx;for(let d=0,f=Xa.step/2+i%5*3;f<r.len-6;f+=Xa.step,d++)for(let p of n?[1,-1]:[(d+i)%2?1:-1]){let m=r.w/2+Xa.out;t(l.x+r.dx*f+s*m*p,l.z+r.dz*f+c*m*p,Math.atan2(c*p,-s*p))}};e?e.forEach(o):a.edges.forEach((i,r)=>o(r))}function $l(a){let e=ta(a),t=[];return br(e,null,(o,i,r)=>t.push(o+Math.cos(r)*xt.reach,e.y+Math.max(0,e.heightAt(o,i))+xt.height,i-Math.sin(r)*xt.reach)),t}function Yl(a){let e=ta(a),t=e.buildings,o=(r,l,n)=>{let s=Math.sin(r*12.9898+l*78.233+n*37.719)*43758.5453;return s-Math.floor(s)},i=[];for(let r=0;r<t.length;r+=8){let l=t[r],n=t[r+1],s=t[r+2],c=t[r+3],d=t[r+4],f=t[r+5],p=Math.cos(t[r+6]),m=Math.sin(t[r+6]),L=Math.round(t[r+7]);if(L===Re.greenhouse||L===Re.shed||L===Re.pagoda||L===Re.shrine)continue;let R=Math.max(1,Math.round((d-.7)/3)),C=n-d/2,A=Math.min(d>60?64:16,Math.max(1,Math.round(R*2*(c+f)/70)));for(let z=0;z<A;z++){let x=o(l,s,z),_=o(s,l,z+7);if(o(l+z,s-z,3)<.35)continue;let N=Math.floor(x*4),E=_-.5,k=Math.floor(o(l,s,z+13)*R),u=N<2?E*c:(N===2?-1:1)*(c/2+.3),v=N<2?(N===0?-1:1)*(f/2+.3):E*f,T=L===Re.office||L===Re.tower||L===Re.landmark?[.75,.85,1]:x*7%1<.65?[1,.72,.42]:[.72,.84,1],F=.22+.25*o(s,l,z+21);i.push(l+u*p+v*m,C+k*3+1.6,s-u*m+v*p,T[0]*F,T[1]*F,T[2]*F)}}for(let r of e.landmarks)i.push(r.top[0],r.top[1]+2,r.top[2],1.6,.1,.06);return i}function Xl(a,e,t,o=null){let i=ta(a),r=i.tiles.get(e.id),l=new lt;if(l.name="cityProps",!r)return l;let n=e.origin[0],s=e.origin[2],c=t.poles.tpl,d=(u,v)=>i.y+Math.max(0,i.heightAt(u,v))+.15,f={concrete:[],metal:[]},p=[],m=[],L=[],R=[],C=(u,v)=>{let T=Math.sin(u*12.9898+v*78.233)*43758.5453;return T-Math.floor(T)};br(i,r.edges,(u,v,T)=>m.push([u-n,d(u,v),v-s,T,1]));for(let u of r.nodes){let v=i.nodes[u];if(!v.signal)continue;let T=v.out.map(D=>({o:D,e:i.edges[D.edge]})).filter(D=>ho.has(D.e.cls)),F=Math.max(...T.map(D=>D.e.w));for(let{o:D,e:h}of T){let M=D.to===h.b?-h.dx:h.dx,g=D.to===h.b?-h.dz:h.dz,y=g,b=-M,S=v.x+M*(v.r+1.2)+y*(h.w/2+.9),w=v.z+g*(v.r+1.2)+b*(h.w/2+.9);R.push({x:S-n,y:d(S,w),z:w-s,yaw:Math.atan2(-M,-g),go:h.w>=F-.01})}}for(let u of r.blocks){let v=i.blocks[u],T=v.poly.length;if(v.type!=="fields"&&v.use!=="park")for(let F=0;F<T;F++){if(v.tags[F]!=="local")continue;let D=v.poly[F],h=v.poly[(F+1)%T],M=Math.hypot(h[0]-D[0],h[1]-D[1]),g=(h[0]-D[0])/M,y=(h[1]-D[1])/M;if(M<24||g*.8+y*.6<0)continue;let b=Math.max(1,Math.round(M/30)),S=M/b,w=Math.atan2(-y,g),O=v.c[0]-(D[0]+h[0])/2,P=v.c[1]-(D[1]+h[1])/2,I=-y*O+g*P>0?1:-1,j=-y*I*.45,G=g*I*.45,V=null;for(let $=0;$<b;$++){let Q=S*($+.5),J=D[0]+g*Q+j,re=D[1]+y*Q+G,fe=d(J,re);if(f.concrete.push([c.pole,J-n,fe,re-s,w]),f.metal.push([c.arm,J-n,fe,re-s,w]),V)for(let ue of[-.9,0,.9]){let Pe=-y*ue,ve=g*ue,se=V[2]+10.52,xe=fe+10.52;for(let Ae=0;Ae<6;Ae++){let De=Ae/6,ze=(Ae+1)/6,be=Be=>2*Be*(1-Be);p.push(V[0]+Pe+(J-V[0])*De-n,se+(xe-se)*De-be(De),V[1]+ve+(re-V[1])*De-s,V[0]+Pe+(J-V[0])*ze-n,se+(xe-se)*ze-be(ze),V[1]+ve+(re-V[1])*ze-s)}}V=[J,re,fe]}}}let A=e.buildings;for(let u=0;u<A.length;u+=8){let v=A[u+7];if(v!==Re.shop&&v!==Re.konbini&&v!==Re.apartment||C(A[u]+n,A[u+2]+s)>(v===Re.apartment?.12:.3))continue;let T=Math.cos(A[u+6]),F=Math.sin(A[u+6]),D=A[u+3]/2-.7,h=A[u+5]/2+.42;L.push([A[u]+D*T+h*F,A[u+1]-A[u+4]/2,A[u+2]-D*F+h*T,A[u+6]])}let z=u=>{let v=[],T=[],F=[];for(let[h,M,g,y,b]of u){let S=Math.cos(b),w=Math.sin(b),O=v.length/3;for(let P=0;P<h.p.length;P+=3)v.push(M+h.p[P]*S+h.p[P+2]*w,g+h.p[P+1],y-h.p[P]*w+h.p[P+2]*S),T.push(h.n[P]*S+h.n[P+2]*w,h.n[P+1],-h.n[P]*w+h.n[P+2]*S);for(let P of h.i)F.push(O+P)}let D=new ot;return D.setAttribute("position",new Ce(v,3)),D.setAttribute("normal",new Ce(T,3)),D.setIndex(F),D.computeBoundingSphere(),D};if(f.concrete.length)for(let[u,v]of[[f.concrete,t.poles.mats.concrete],[f.metal,t.poles.mats.metal]]){let T=new tt(z(u),v);T.castShadow=v===t.poles.mats.concrete,T.receiveShadow=!0,l.add(T),v!==t.poles.mats.concrete&&(T.name="cityPoleArms")}let x=new Ke,_=new ea,N=new ie,E=new ie(0,1,0),k=new ie(1,1,1);if(L.length){let u=new at(t.vendGeo,t.vendMats,L.length);L.forEach(([v,T,F,D],h)=>u.setMatrixAt(h,x.compose(N.set(v,T,F),_.setFromAxisAngle(E,D),k))),u.computeBoundingSphere(),u.castShadow=!0,u.receiveShadow=!0,u.name="vending",l.add(u)}if(R.length){let u=new at(t.signal.body,t.signalBody,R.length);R.forEach((v,T)=>u.setMatrixAt(T,x.compose(N.set(v.x,v.y,v.z),_.setFromAxisAngle(E,v.yaw),k))),u.computeBoundingSphere(),u.castShadow=!0,u.receiveShadow=!0,u.name="signals",l.add(u);for(let v of[!0,!1]){let T=R.filter(D=>D.go===v);if(!T.length)continue;let F=new at(v?t.signal.go:t.signal.stop,t.signalLens,T.length);T.forEach((D,h)=>F.setMatrixAt(h,x.compose(N.set(D.x,D.y,D.z),_.setFromAxisAngle(E,D.yaw),k))),F.computeBoundingSphere(),F.castShadow=!1,F.receiveShadow=!1,F.name="signalLens",F.userData.noAO=!0,l.add(F)}}if(p.length){let u=za(p);u.name="cityWires",l.add(u)}return o&&m.length&&l.add(po(m,o)),l}var Ka={lamp:1,window:.55};function Kl(a,e,t){let o=[],i=(l,n,s)=>{for(let c=0;c<l.length;c+=3)o.push(l[c],l[c+1],l[c+2],n.r,n.g,n.b,s)};i(Cl(a,t),oo[0],Ka.lamp),i($l(a.world),oo[1],Ka.lamp);let r=Yl(a.world);for(let l=0;l<r.length;l+=6)o.push(r[l],r[l+1],r[l+2],r[l+3],r[l+4],r[l+5],Ka.window);return Ml(e,new Float32Array(o))}var ca={fogHalf:14e3,fogFalloff:1/600,sunColor:16773340,moonColor:11122920,toneMapping:4,exposureMul:.97},qa={ultra:{ao:!0,bloom:!0,msaa:4,shadow:{splits:[12,60,300],maxFar:2500,mapSize:2048},forest:1,lamps:10,water:!0,scale:1},high:{ao:!1,bloom:!0,msaa:4,shadow:{splits:[12,60,300],maxFar:2500,mapSize:2048},forest:1,lamps:10,water:!0,scale:1},balanced:{ao:!0,bloom:!0,msaa:0,shadow:{splits:[18],maxFar:500,mapSize:1536},forest:1,lamps:6,water:!0,scale:1,perf:{aoScale:.5,aoSamples:8,bloomScale:.5,fxaa:!0,stagger:!0,dynamic:{min:.5,target:55}}},medium:{ao:!1,bloom:!1,msaa:0,shadow:{splits:[14],maxFar:350,mapSize:1024},forest:.6,lamps:6,water:!0,scale:.75},low:{ao:!1,bloom:!1,msaa:0,shadow:null,forest:.35,lamps:4,water:!1,scale:.6}},Wo={below:40,scale:.001},Za=512,Vo={ground:3,far:5},jo=1,$o=2,Yo=3,ql=5,Zl=30;async function Ql(a,e,t=250){let o=(e?.dems||[]).slice(0,4),i=(await Promise.all(o.map((r,l)=>Jl(a,e,r,l,t)))).filter(Boolean);return i.length?(r,l)=>{for(let n of i){let s=n(r,l);if(s)return s}return null}:null}async function Jl(a,e,t,o,i){let r=await fetch(`${a}world/regions/${t.id}_photo.jpg`).catch(()=>null);if(!r?.ok)return null;let l=await createImageBitmap(await r.blob()),n=new mt(await createImageBitmap(l));n.flipY=!1,n.anisotropy=4,n.needsUpdate=!0;{let[m,L,R]=[[Ue.tPhoto,Ue.uPhotoRect,Ue.uPhotoOn],[Ue.tPhoto2,Ue.uPhotoRect2,Ue.uPhotoOn2],[Ue.tPhoto3,Ue.uPhotoRect3,Ue.uPhotoOn3],[Ue.tPhoto4,Ue.uPhotoRect4,Ue.uPhotoOn4]][o];m.value=n,L.value.set([t.x0,t.z0,t.x1,t.z1]),R.value=1}let s=Math.max(2,Math.round((t.x1-t.x0)/i)),c=Math.max(2,Math.round((t.z1-t.z0)/i)),d=new OffscreenCanvas(s,c).getContext("2d");d.imageSmoothingQuality="high",d.drawImage(l,0,0,s,c),l.close();let f=d.getImageData(0,0,s,c).data,p=m=>Math.pow(m/255,2.2);return(m,L)=>{let R=(m-t.x0)/(t.x1-t.x0),C=(L-t.z0)/(t.z1-t.z0);if(!(R>=0&&C>=0&&R<=1&&C<=1))return null;let A=4*(Math.min(c-1,Math.floor(C*c))*s+Math.min(s-1,Math.floor(R*s))),z=bt(0,1500,Math.min(m-t.x0,t.x1-m,L-t.z0,t.z1-L))*e.weight(m,L);return t.id==="kanto"&&(z*=1-bt(560,640,f[A]+f[A+1]+f[A+2])),[z,p(f[A]),p(f[A+1]),p(f[A+2])]}}async function l0({renderer:a,scene:e,camera:t,session:o,mats:i,oldSun:r,groups:l,base:n,off:s=new Set,tod:c="day",quality:d="ultra"}){let f=La[Yr()]||La.clear,p=uo(),m=Xr(Sa[c]||Sa.day),L=structuredClone(qa[d]||qa.ultra);It.uSnow.value=p==="winter"?1:0,It.uAutumn.value=p==="autumn"?1:0,It.uWet.value=Math.max(f.wet,p==="winter"?.45:0);for(let U of(new URLSearchParams(globalThis.location?.search||"").get("gfxset")||"").split(",")){let[q,X]=U.split(":"),Z=Number(X);q&&Number.isFinite(Z)&&(q==="scale"||q==="forest"||q==="lamps"?L[q]=Z:L.shadow&&q==="shadowfar"?L.shadow.maxFar=Z:L.shadow&&q==="shadowmap"?L.shadow.mapSize=Z:L.shadow&&q==="cascades"&&(L.shadow.splits=L.shadow.splits.slice(0,Math.max(1,Z))))}Vt.near=L.forest,L.scale!==1&&a.setPixelRatio(a.getPixelRatio()*L.scale),s.has("shadow")||!L.shadow||m.sunToSky===0?a.shadowMap.enabled=!1:a.shadowMap.type=2,Vt.shadows=a.shadowMap.enabled,s.has("bloom")&&(L.bloom=!1);let[R,C,A]=await Promise.all([Ji(n,Zi),nl(n),ml(a,n)]),z=ci(o.world,31,Kr(o.graph)),x=mr(),_=new Map,N=yl();{let U={d:0,road:-1,s:0},q=(X,Z,oe)=>{let ne=Math.min(1,Math.max(0,(oe-X)/(Z-X)));return ne*ne*(3-2*ne)};z.roadBelt=(X,Z)=>(o.height.nearestRoad(X,Z,ua.beltTo+10,U),U.d===1/0?0:(1-q(ua.beltFrom,ua.beltTo,U.d))*q(0,6,U.d)),z.roadDist=(X,Z)=>(o.height.nearestRoad(X,Z,ua.beltTo+10,U),U.d)}!s.has("roadside")&&!s.has("warm")&&_l(o,x);let E=s.has("grass")||p==="winter"?null:gl();p==="autumn"&&E?.mat?.color.set(10260312),i.ground.dispose(),i.ground=ll(R,null);let k=Gl();El(n),x.vend={geo:k.vendGeo,mats:k.vendMats},i.box.mat.dispose(),i.box.mat=k.facade,i.cityGround.dispose(),i.cityGround=k.ground,i.cityLane.dispose(),i.cityLane=k.lanes,i.parapet.dispose(),i.parapet=k.parapet,i.water&&=(i.water.dispose(),k.water),i.road.map?.dispose(),i.road.dispose(),i.road=C,i.groundAttrs=function*(U,q){let X=U.terrain,Z=X.nx*X.nz,oe=U.forestCache||z,ne=Lo(X,U.origin,oe,null,0,0);for(let B=0;B<Z;B+=Za)ne=Lo(X,U.origin,oe,ne,B,Math.min(Z,B+Za)),B+Za<Z&&(yield);q.setAttribute("splatA",new Ft(ne.a,4)),q.setAttribute("splatB",new Ft(ne.b,4))};let u=xi(a,m,{sunColor:ca.sunColor,moonColor:ca.moonColor});f!==La.clear&&u.night&&u.mesh.material.uniforms.uStars&&(u.mesh.material.uniforms.uStars.value=0,u.mesh.material.uniforms.showMoon.value=0),wi({sunDir:u.sunDir,sunColor:u.horizonSun,falloff:f.falloff??ca.fogFalloff});let v=new Pr(16777215,Math.LN2/f.fogHalf);v.color.copy(u.horizonAway),e.fog=v,e.add(u.mesh),e.background=null,e.environment=u.envMap,r.visible=!1,e.traverse(U=>{U.isHemisphereLight&&(U.visible=!1)});let T=u.skyIrradiance,F=m.sunToSky*T/Math.max(.05,u.sunDir.y),D=u.lightColor;et.uDayLum.value=u.night?0:T*(1+m.sunToSky)/Math.PI,et.uBounce.value.copy(D).multiplyScalar(F*Math.max(0,u.sunDir.y)*.1),a.toneMapping=ca.toneMapping,a.toneMappingExposure=(m.rel?m.rel*Math.PI/(hi*(1+Sa.day.sunToSky)):Math.PI/(T*(1+m.sunToSky)))*ca.exposureMul;let h=_i({scene:e,camera:t,sunDir:u.sunDir,intensity:F,color:D,...L.shadow||{splits:[20],maxFar:60,mapSize:256}}),M=3/a.toneMappingExposure;k.setLights(m.lights,M),N.setLights(m.lights,M),cr.value=m.lights>.2?m.lights*M*.6:0;let g=m.lights>.2?Sl(e,N,L.lamps):null,y=new Map,b=g?Kl(o,N,_):null;b&&e.add(b.mesh),t.near=.5,t.far=_r?7e4:22e3,t.updateProjectionMatrix();let S=ta(o.world),w=qi(o.regions?.kanto?(U,q)=>{let X=o.height.naturalAt(U,q);if(X<.3){for(let[Z,oe]of[[180,0],[-180,0],[0,180],[0,-180]])if(o.regions.height(U+Z,q+oe)>.3)return .35}return X}:(U,q)=>o.height.naturalAt(U,q),{cityRadius:o.world.city?.radius??-1e9,edge:o.world.city?it:1e9,city:o.world.city,ringRadius:0,built:(U,q)=>{let X=S.urbanT(U,q);return X<.85?1:X>1.15?0:1-(X-.85)/.3}});w.setLights(m.lights,M),w.mesh.renderOrder=Vo.far,e.add(w.mesh),Ue.uPhotoHub.value=o.world.city?12e3:-1e6,Ue.uPhotoNear.value=o.world.city?0:1,Ql(n,o.regions).then(U=>{U&&w.recolor(U),p==="winter"&&w.recolor((q,X,Z)=>[bt(150,600,Z)*.85,.75,.77,.8])});let O=cl(o.world,{lights:m.lights,lampGain:M});e.add(O.group);let P=o.height.places,I=P.lakes.length&&!s.has("water")&&L.water?di(P,{sunDir:u.sunDir,sunColor:D.clone().multiplyScalar(F*.04),skyE:T}):null;if(I&&e.add(I.group),o.regions?.lakes?.length){let U=o.regions.lakeStrips(),q=new Float32Array(U.length*12),X=new Uint32Array(U.length*6);U.forEach((B,W)=>{let K=B.lake.level+.15;q.set([B.x0,K,B.z0,B.x1,K,B.z0,B.x0,K,B.z1,B.x1,K,B.z1],W*12),X.set([4*W,4*W+2,4*W+1,4*W+1,4*W+2,4*W+3],W*6)});let Z=w.mesh.geometry.getAttribute("position").constructor,oe=new w.mesh.geometry.constructor;oe.setAttribute("position",new Z(q,3)),oe.setIndex(new Z(X,1)),oe.computeVertexNormals();let ne=new w.mesh.constructor(oe,new w.mesh.material.constructor({color:2375756,roughness:.08,metalness:0,envMapIntensity:0}));ne.material.onBeforeCompile=B=>{B.fragmentShader=B.fragmentShader.replace("#include <fog_fragment>",`#include <fog_fragment>
	#ifdef USE_FOG
	{
		float fr = pow( 1.0 - clamp( dot( normal, normalize( vViewPosition ) ), 0.0, 1.0 ), 5.0 );
		gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor * vec3( 0.9, 0.96, 1.04 ), clamp( 0.04 + 0.92 * fr, 0.0, 0.9 ) );
	}
	#endif`)},ne.material.customProgramCacheKey=()=>"regionLakeFresnel",ne.name="regionLakes",ne.userData.noAO=!o.regions?.kanto,ne.receiveShadow=!0,e.add(ne)}let j=Hi(a,e,t,a.toneMappingExposure,{samples:s.has("msaa")?0:L.msaa,grading:!s.has("grade")});(s.has("ao")||!L.ao)&&(j.gtao.enabled=!1),(s.has("bloom")||!L.bloom)&&(j.bloom.enabled=!1),j.setNight(m.lights),j.grade.uniforms.uSat.value*=f.sat;let G=f.precip>0?il(p==="winter"?"snow":"rain",Math.max(.07,1-.93*Math.pow(m.lights,.6))):null;G&&e.add(G.mesh);let V=zi({perf:s.has("perf")?void 0:L.perf,renderer:a,post:j,shadows:h,camera:t,splits:(L.shadow||{splits:[20]}).splits,maxFar:(L.shadow||{maxFar:60}).maxFar});!I&&P.lakes.length&&!s.has("water")&&e.add(ui(P).group),s.has("far")&&(w.mesh.visible=!1);let $=new Map,Q=new Map,J=new Map,re=new Map,fe=!0,ue=!0,Pe=0,ve=new Map,se=new Map,xe=U=>{ve.delete(U);let q=se.get(U);q&&(Ra(q),se.delete(U))},Ae=U=>{ve.has(U.id)||ve.set(U.id,De(U))};function*De(U){let q=performance.now(),X=0,Z=q,oe=0,ne=()=>{let ae=performance.now()-Z;X+=ae,ce.stageMs[oe]=Math.max(ce.stageMs[oe]||0,ae),oe++},B=()=>{let ae=performance.now()-Z;X+=ae,ce.stageMs[oe]=Math.max(ce.stageMs[oe]||0,ae)},W=fi(z,U);U.forestCache=W;let K=ni(U,i,{trees:!1,deferAttrs:!0});se.set(U.id,K),K.traverse(ae=>{ae.isMesh&&(ae.castShadow=!0,ae.receiveShadow=!0)}),ne(),yield,Z=performance.now();for(let ae of W.prepare())B(),yield,Z=performance.now();for(let ae of K.userData.groundAttrs||[]){let le=ae();if(le)for(;!le.next().done;)B(),yield,Z=performance.now()}K.userData.groundAttrs=null,se.delete(U.id);for(let ae of["road","rails","verge","cityGround","cityLanes","terrain"]){let le=K.getObjectByName(ae);le&&(le.castShadow=!1)}for(let ae of["terrain","verge"]){let le=K.getObjectByName(ae);le&&(le.renderOrder=Vo.ground)}if(e.add(K),$.set(U.id,K),l.add(K),fe=!0,ue=!0,ze(K),ne(),yield,Z=performance.now(),!s.has("forest")){let ae=vl(U,W,A.modelKinds),le;for(;;){let de=ae.next();if(de.done){le=de.value;break}B(),yield,Z=performance.now()}ne(),yield,Z=performance.now();let we=Do(le,A);K.add(we.group),Q.set(U.id,we),ue=!0,ze(K),ne(),yield,Z=performance.now()}if(E){let ae=Fo(le=>xl(U,W,le),E);K.add(ae.group),J.set(U.id,ae),ne(),yield,Z=performance.now()}if(!s.has("roadside")){let ae=Pl(o,U,x,_,N),le;for(;;){let we=ae.next();if(we.done){le=we.value;break}B(),yield,Z=performance.now()}K.add(le),re.set(U.id,le),ze(le),ne(),yield,Z=performance.now()}if(U.city){let ae=jl(o.world,U,k);if(ae&&K.add(ae),ne(),yield,Z=performance.now(),U.city.poles?.length&&K.add(Bl(U.city.poles,x,U.city.drops)),U.city.pa){let He=new lt,Ee=U.city.pa;if(He.name="placeProps",He.userData.heads=Ee.lamps,Ee.vend.length){let Qe=new Sr(k.vendGeo,k.vendMats,Ee.vend.length/4),Rt=new Ke;for(let nt=0;nt<Ee.vend.length;nt+=4)Qe.setMatrixAt(nt/4,Rt.makeRotationY(Ee.vend[nt+3]).setPosition(Ee.vend[nt],Ee.vend[nt+1],Ee.vend[nt+2]));Qe.castShadow=!0,Qe.receiveShadow=!0,Qe.name="placeVending",Qe.computeBoundingSphere(),He.add(Qe)}K.add(He)}let le=Go(U.buildings,k);for(let He of le)He.castShadow=!1,K.add(He);K.userData.cityRoofs=le,ne(),yield,Z=performance.now();let we=Wl(o.world,U,k);we&&K.add(we);let de=[];K.traverse(He=>{He.userData.cell&&(He.name==="cityDecor"||He.name==="shrubs")&&(He.castShadow=!1,de.push(He))}),K.userData.cityBoxes=K.getObjectByName("buildings")||null,K.userData.cityNear=de,K.userData.cityCrowns=we?.getObjectByName("crowns")||null,K.userData.cityTrunks=we?.getObjectByName("trunks")||null,K.userData.cityFar=[K.getObjectByName("cityGround"),K.getObjectByName("cityLanes"),K.getObjectByName("cityLines"),K.userData.cityTrunks].filter(Boolean);let Me=K.getObjectByName("buildings");if(Me)for(let He=0;He<U.buildings.length;He+=8)U.buildings[He+7]===Re.pagoda&&(Me.setMatrixAt(He/8-U.city.farFrom,new Ke().makeScale(0,0,0)),Me.instanceMatrix.needsUpdate=!0);ne(),yield,Z=performance.now();let Xe=Xl(o.world,U,k,N);K.add(Xe),re.set(-1-U.id,Xe);for(let He of["cityPoleArms","cityWires"]){let Ee=Xe.getObjectByName(He);Ee&&K.userData.cityFar.push(Ee)}K.userData.cityFarOn=void 0}if(ue=!0,ze(K),ne(),ce.showMs=X,ce.showMsMax=Math.max(ce.showMsMax,X),ce.shows++,g){K.updateMatrixWorld(!0);let ae=[],le=new ie;K.traverse(we=>{let de=we.userData.heads;if(de)for(let Me=0;Me<de.length;Me+=4)le.set(de[Me],de[Me+1],de[Me+2]).applyMatrix4(we.matrixWorld),ae.push(le.x,le.y,le.z,de[Me+3])}),ae.length&&y.set(U.id,new Float32Array(ae))}}let ze=U=>U.traverse(q=>{q.matrixAutoUpdate&&(q.updateMatrix(),q.matrixAutoUpdate=!1,q.matrixWorldNeedsUpdate=!0);let X=q;if(!X.isInstancedMesh||X.userData.instReady)return;X.userData.instReady=!0;let Z=Array.isArray(X.material)?X.material:[X.material];X.renderOrder===0&&!Z.some(oe=>oe.transparent)&&(X.renderOrder=X.instanceColor?2:1),X.castShadow&&!X.customDepthMaterial&&!Z.some(oe=>oe.alphaTest>0||oe.alphaMap||oe.displacementMap)&&(X.customDepthMaterial=X.instanceColor?be:A.instDepth)}),be=new Xo;be.name="worldInstDepthColor";function Be(U,q){if(!ve.size)return;let X=performance.now(),Z=[...ve.keys()].sort((ne,B)=>dt(ne,U,q)-dt(B,U,q)),oe=dt(Z[0],U,q)<=jo?Zl:ql;for(let ne of Z){let B=ve.get(ne);if(B){for(;;){if(B.next().done){ve.delete(ne);break}if(performance.now()-X>=oe)return}if(performance.now()-X>=oe)return}}}let dt=(U,q,X)=>{let Z=U%rt,oe=(U-Z)/rt;return Math.max(Math.abs(Z-q),Math.abs(oe-X))};function yt(U,q){let X=Math.floor((U+it)/500),Z=Math.floor((q+it)/500);for(let[B,W]of $){let K=B%rt,ae=(B-K)/rt,le=o.streamer.tileAt(K,ae);if(Math.max(Math.abs(K-X),Math.abs(ae-Z))<Yo&&le&&le.data&&le.data.id===B)continue;let we=Q.get(B);we&&(we.dispose(),Q.delete(B));let de=J.get(B);de&&(de.dispose(),J.delete(B));for(let Me of[B,-1-B]){let Xe=re.get(Me);Xe&&(No(Xe),re.delete(Me))}$.delete(B),l.delete(W),y.delete(B),Ra(W),fe=!0,xe(B)}for(let B of ve.keys()){let W=B%rt,K=(B-W)/rt;Math.max(Math.abs(W-X),Math.abs(K-Z))>=Yo&&xe(B)}let oe=null,ne=1/0;for(let B=-2;B<=$o;B++)for(let W=-2;W<=$o;W++){let K=X+W,ae=Z+B;if(K<0||ae<0||K>=rt||ae>=rt||$.has(ae*rt+K))continue;let le=o.streamer.tileAt(K,ae);if(!le||!le.data)continue;let we=Math.max(Math.abs(W),Math.abs(B));we<=jo?Ae(le.data):we<ne&&(ne=we,oe=le.data)}oe&&Ae(oe)}let H=new WeakSet,Y=U=>{h.setup(U),U.isMeshStandardMaterial&&U.envMap&&U.envMap!==u.envMap&&!H.has(U)&&(H.add(U),U.envMap=u.envMap,U.needsUpdate=!0)},ee=U=>{let q=U.material;if(q)if(Array.isArray(q))for(let X of q)Y(X);else Y(q)};function*te(){let U=new lt;U.name="warmup",U.scale.setScalar(Wo.scale),e.add(U),he=U;let q=B=>{U.add(B),ze(B),U.position.copy(t.position),U.position.y-=Wo.below,U.traverse(W=>{W.frustumCulled=!1}),U.updateMatrixWorld(!0),ue=!0,ce.warm++},X=[];if(!s.has("forest")){let B=500/Ye.modelCells,W=250+B/2,K=Vt.near,ae=0;for(let de=1;de<=4&&!ae;de++){let Me=(de-.5)*B;Me>=Ye.fullIn*K&&Me<Ye.modelIn*K&&(ae=de)}let le=de=>()=>{let Me=Do({sugi:[],sugi2:[],broad:[],sasa:[],fern:[],take:[],...de},A);for(let Xe=0;Xe<8&&Me.update(W,W,999,null);Xe++);return{o:Me.group,dispose:()=>Me.dispose()}},we=[W,0,W,12,0];for(let de of Object.keys(A.models))X.push(le({[de]:ae?[...we,W+ae*B,0,W,12,0]:we}));X.push(le({sasa:[W,0,W,1,0],fern:[W,0,W,1,0],...A.modelKinds.conifer.length?{}:{sugi:we,sugi2:we},...A.modelKinds.broad.length?{}:{broad:we}}))}if(E){let B=E;X.push(()=>{let W=Fo([250,0,250,1,1,0],B);return W.update(250,250,999),{o:W.group,dispose:()=>W.dispose()}})}let Z=(B,W)=>()=>{B.traverse(K=>{K.isInstancedMesh&&K.dispose()});for(let K of W)K.dispose()},oe=(B,W,K)=>{let ae=new ya(1,1),le=new ot;le.setAttribute("position",new Ce([0,0,0,1,0,0],3)),K.push(ae,le);for(let[we,de]of Object.entries(pr)){let Me=new tt(ae,B.mats[we]);Me.castShadow=de,Me.receiveShadow=!0,W.add(Me)}W.add(za([0,0,0,1,0,0]))};X.push(()=>{let B=new lt,W=new ya(1,1),K=new tt(W,i.road);return K.castShadow=!1,K.receiveShadow=!0,B.add(K),{o:B,dispose:()=>W.dispose()}}),s.has("roadside")||X.push(()=>{let B=new lt,W=[];return oe(x,B,W),B.add(po([[0,0,0,0,0],[3,0,0,0,1]],N)),{o:B,dispose:Z(B,W)}}),X.push(()=>{let B=new lt,W=[],K=new Ke,ae=(de,Me)=>{let Xe=new at(de,Me,1);Xe.setMatrixAt(0,K),Xe.castShadow=!0,Xe.receiveShadow=!0,B.add(Xe)},le=i.box.geo.clone();le.setAttribute("aKind",new Jo(new Float32Array([Re.shop]),1)),W.push(le),ae(le,i.box.mat),ae(i.box.geo,i.parapet),ae(k.vendGeo,k.vendMats),ae(k.signal.body,k.signalBody);for(let de of[k.signal.go,k.signal.stop]){let Me=new at(de,k.signalLens,1);Me.setMatrixAt(0,K),Me.userData.noAO=!0,B.add(Me)}for(let de of Go(new Float32Array([0,0,0,6,3,6,0,Re.house,9,0,0,6,3,6,0,Re.houseHip]),k))B.add(de);{let de=new at(k.crownGeo,k.green,1);de.setMatrixAt(0,K),de.setColorAt(0,new Ne(3364130)),de.castShadow=!0,de.receiveShadow=!0,B.add(de)}let we=new ya(1,1);we.setAttribute("color",new Ft(new Float32Array(12).fill(.5),3)),we.setAttribute("aGround",new Ft(new Float32Array(4),1)),W.push(we);for(let de of[i.cityGround,i.cityLane,k.street]){let Me=new tt(we,de);Me.receiveShadow=!0,Me.castShadow=!0,B.add(Me)}return{o:B,dispose:Z(B,W)}});for(let B of X){let W=B();W&&(q(W.o),yield,U.remove(W.o),W.dispose())}let ne=[];for(let B of e.children)(B.name==="lakes"||B.name==="landmarks")&&B.traverse(W=>{W.frustumCulled&&(W.frustumCulled=!1,ne.push(W))});ce.warm++,yield;for(let B of ne)B.frustumCulled=!0;e.remove(U),he=null}let he=null,ye=s.has("warm")?null:te(),_e=new Ve,Oe=new ie,pe={fx:0,fz:1,cos:-2},ce={quality:qa[d]?d:"ultra",tod:c,lights:m.lights,visuals:0,farTriangles:0,sunIntensity:F,exposure:a.toneMappingExposure,skyIrradiance:T,ground:u.groundColor.toArray(),wallIrradiance:u.wallIrradiance,lampLights:0,farLights:b?b.count:0,showMs:0,showMsMax:0,shows:0,stageMs:[],warm:0},Ge=0;return{info:ce,perf:V.info,setRenderScale:V.setScale,setSpeed(U,q=.016){let X=Math.min(1,Math.max(0,(U-25)/145));X=X*(2-X),Ge+=(X-Ge)*Math.min(1,q*4),j.grade.uniforms.uSpeedBlur.value=Ge*.85},update(U,q,X){yt(U,q),et.uNearC.value[0]=U,et.uNearC.value[1]=q,so.uRes.value[0]=a.domElement.width*.5*(V.info.scale||1),so.uRes.value[1]=a.domElement.height*.5*(V.info.scale||1);let Z=Math.floor((U+it)/500),oe=Math.floor((q+it)/500);Be(Z,oe);for(let[B,W]of $){let K=dt(B,Z,oe);W.userData.noAO=K>1;{let Ee=W.userData.terrainMesh||(W.userData.terrainMesh=W.getObjectByName("terrain")||null),Qe=B%rt,Rt=(B-Qe)/rt,nt=Math.max(Qe*500-it-U,0,U-(Qe+1)*500+it),oa=Math.max(Rt*500-it-q,0,q-(Rt+1)*500+it),ra=nt*nt+oa*oa,Xt=(la,Ut,Fa)=>la?ra>Fa:ra>Ut,da=Xt(Ee?.userData.isCoarse>=2,16e5,13e5)?2:Xt(Ee?.userData.isCoarse>=1,14e4,105e3)?1:0;Ee&&Ee.userData.coarse&&Ee.userData.isCoarse!==da&&(Ee.userData.isCoarse=da,Ee.geometry.setIndex(da===2?Ee.userData.coarse4:da===1?Ee.userData.coarse:Ee.userData.fine));let ia=W.userData.railsMesh===void 0?W.userData.railsMesh=W.getObjectByName("rails")||null:W.userData.railsMesh,vo=ia?!Xt(!ia.visible,115e3,9e4):!1;if(ia&&ia.visible!==vo&&(ia.visible=vo),W.userData.cityBoxes){let la=W.userData.cityHidden|0,Ut=Xt(la>=3,28e4,22e4)+Xt(la>=2,14e4,105e3)+Xt(la>=1,72e3,54e3);if(W.userData.cityHidden!==Ut){W.userData.cityHidden=Ut,W.userData.cityBoxes.visible=Ut<3;for(let Fa of W.userData.cityRoofs||[])Fa.visible=Ut<2;W.userData.cityCrowns&&(W.userData.cityCrowns.visible=Ut<1)}}}let ae=B%rt,le=(B-ae)/rt,we=Math.max(ae*500-it-U,0,U-(ae+1)*500+it),de=Math.max(le*500-it-q,0,q-(le+1)*500+it),Me=we*we+de*de,Xe=K<=2&&Me<16e4;if(W.userData.cityFar&&W.userData.cityFarOn!==Xe){W.userData.cityFarOn=Xe;for(let Ee of W.userData.cityFar)Ee.visible=Xe}W.userData.cityBoxes&&W.userData.cityBoxes.castShadow!==Xe&&(W.userData.cityBoxes.castShadow=Xe);let He=K<=1&&Me<12100;if(W.userData.cityNear){if(K<=1){let Ee=U-W.position.x,Qe=q-W.position.z;for(let Rt of W.userData.cityNear){if(Rt.userData.hold)continue;let nt=Rt.userData.cell,oa=Math.max(nt[0]-Ee,0,Ee-nt[2]),ra=Math.max(nt[1]-Qe,0,Qe-nt[3]);Rt.visible=oa*oa+ra*ra<12100}W.userData.cityCellsOff=!1}else if(!W.userData.cityCellsOff){W.userData.cityCellsOff=!0;for(let Ee of W.userData.cityNear)Ee.visible=!1}}if(W.userData.cityNear&&W.userData.cityNearOn!==He){W.userData.cityNearOn=He;let Ee=W.userData.cityCrowns;Ee&&(Ee.castShadow=He,Ee.geometry=He?k.crownGeo:k.crownFarGeo);for(let Qe of W.userData.cityRoofs||[])Qe.castShadow=!1,Qe.geometry=Qe.name==="roofsHip"?He?k.hipGeo:k.hipFarGeo:He?k.roofGeo:k.roofFarGeo}}fe&&=(w.setDetailed(B=>$.has(B)),O.setDetailed(B=>$.has(B)),!1),w.follow(t.position.x,t.position.z);let ne=3;t.getWorldDirection(Oe);{let B=Math.hypot(Oe.x,Oe.z);pe.cos=B<.35?-2:Math.cos(Math.min(Math.PI,Math.ceil((Math.atan(Math.tan(t.fov*Math.PI/360)*t.aspect)+.32)*12)/12)),pe.fx=B>0?Oe.x/B:0,pe.fz=B>0?Oe.z/B:1}for(let[B,W]of Q){let K=$.get(B);if(!K||ne<=0)break;let ae=W.update(t.position.x-K.position.x,t.position.z-K.position.z,ne,pe);ae&&(ue=!0),ne-=ae}if(A.setTime(X/1e3),E){E.setTime(X/1e3);let B=3;for(let[W,K]of J){let ae=$.get(W);if(!ae||B<=0)break;B-=K.update(t.position.x-ae.position.x,t.position.z-ae.position.z,B)}}u.update(t,X/1e3),G?.update(t,X/1e3);{let B=new ie().copy(u.sunDir).add(t.position).project(t),W=u.sunDir.dot(t.getWorldDirection(new ie))>0,K=(B.x+1)/2,ae=(B.y+1)/2,le=Math.max(0,1-Math.max(Math.abs(B.x),Math.abs(B.y))/1.6);j.setSun(K,ae,W&&m.sunToSky>0?le*(m.lights>.5?.3:1):0)}if(I?.update(X/1e3),g&&(g.update(t,y.values()),ce.lampLights=g.active),b){let B=Math.floor((U+it)/500),W=Math.floor((q+it)/500),K=0;for(let ae=-2;ae<=2;ae++)for(let le=-2;le<=2;le++){let we=B+le,de=W+ae;we>=0&&de>=0&&we<rt&&de<rt&&$.has(de*rt+we)&&(K|=1<<(ae+2)*5+le+2)}b.setNear(B,W,K)}N.setView(t.fov,a.getDrawingBufferSize(_e).y),ye&&ye.next().done&&(ye=null),(ue||!(++Pe&63))&&(e.traverse(ee),ue=!1),h.update(),V.tick(),ce.visuals=$.size,ce.farTriangles=w.info.triangles},render(){a.info.reset(),s.has("post")?a.render(e,t):j.render()},dispose(){for(let U of Q.values())U.dispose();for(let U of J.values())U.dispose();J.clear(),E?.dispose();for(let U of re.values())No(U);for(let U of[...ve.keys()])xe(U);ye=null,he?.removeFromParent(),be.dispose(),re.clear(),x.dispose(),k.dispose(),N.dispose(),g?.dispose(),b?.dispose(),I?.dispose(),y.clear();for(let U of $.values())l.delete(U),Ra(U);Q.clear(),$.clear(),A.dispose(),j.dispose(),h.dispose(),w.dispose(),O.dispose(),u.dispose()}}}export{ca as LOOK,qa as QUALITY,l0 as createBeautyWorld};
