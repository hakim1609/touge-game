const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./main-yKJPGUka.js","./kantoSurface-B6GZl99o.js","./three.module-XOnEzjVc.js"])))=>i.map(i=>d[i]);
import{W as Jr,a as ut,_ as ei,u as ti,c as ai,p as oi,r as ri,b as ii,d as Co}from"./kantoSurface-B6GZl99o.js";import{S as Wt,L as vr,K as ke,A as nt,m as gr,U as ne,H as qe,a as _t,u as He,b as Ia,D as Po,d as Ua,l as Ha,X as Ao,C as ct,c as Xt,e as xr,f as Gt,g as To,z as wr,h as yr,$ as Sr,i as Tt,r as Dt,o as fo,j as li,F as dt,Y as Re,k as ka,n as vt,M as da,O as uo,v as si,p as ni,q as ci,t as fi,G as Zt,s as di,E as ua,y as Jt,w as ui,W as at,V as br,x as ft,B as hi,I as pi,J as mi,_ as vi,N as gi,P as Et,Q as xi,R as wi,T as yi,Z as Si,a0 as bi,a1 as Mi,a2 as ha,a3 as _i}from"./three.module-XOnEzjVc.js";import{W as Qt,w as Mr,s as Do,a as ho,J as Ci,b as pa,e as pt,h as ht,H as Lt,c as Pi,d as po,u as _r,r as Ti,p as Di,f as zi,_ as Oe,g as Fi,i as Cr,v as ca,j as Ri,k as zo,l as Ma,P as Li,m as Ai,I as ko,U as ki,n as Ht,o as Ei,y as Ni}from"./main-yKJPGUka.js";import{o as Oi,W as Ii,s as Ui,a as Pa}from"./forest-B3BNofn9.js";import{disposeTileVisual as $a,t as Hi,n as Eo,createTileVisual as Wi}from"./worldVisual-D3DEmr3k.js";import{createLakeWater as Gi,createLakeFlat as Bi}from"./water-DUfq_Sz2.js";var Pr=class Tr extends ct{constructor(){let e=Tr.SkyShader,t=new vt({name:e.name,uniforms:Et.clone(e.uniforms),vertexShader:e.vertexShader,fragmentShader:e.fragmentShader,side:1,depthWrite:!1});super(new ua(1,1,1),t),this.isSky=!0}};Pr.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new ne},cloudScale:{value:2e-4},cloudSpeed:{value:2e-5},cloudCoverage:{value:.4},cloudDensity:{value:.4},cloudElevation:{value:.5},showSunDisc:{value:1},skyGain:{value:1},time:{value:0}},vertexShader:`
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

		}`};var mt={day:{sun:[235,42],turbidity:2.8,rayleigh:1.9,mie:.003,clouds:.32,sunToSky:2.4,skyGain:1.25,rel:0,lights:0},sunset:{sun:[262,3.5],turbidity:5,rayleigh:3,mie:.007,clouds:.34,sunToSky:2.4,rel:7,lights:.3},dusk:{sun:[268,-1.2],turbidity:4.5,rayleigh:3.2,mie:.006,clouds:.28,sunToSky:0,rel:80,lights:.85},night:{moon:[140,38],sunToSky:2,rel:45,lights:1}},mo=5.73;function No(a,e){if(a<=-6)return{...mt.night};let t=mt.day,o=mt.day,i=0;a<10&&(a>=0?(o=mt.sunset,i=(10-a)/10):(t=mt.sunset,o=mt.dusk,i=Math.min(1,-a/6)));let r=(s,l=0)=>(t[s]??l)+((o[s]??l)-(t[s]??l))*i,n={sun:[e,a<0?Math.max(-1.5,a*.25):a],_k:i,_a:t,_b:o};for(let s of["turbidity","rayleigh","mie","clouds","sunToSky","lights"])n[s]=r(s);return n.skyGain=r("skyGain",1),n}function Vi(a,e,t=new ne){let o=da.degToRad(a),i=da.degToRad(e);return t.set(Math.sin(o)*Math.cos(i),Math.sin(i),-Math.cos(o)*Math.cos(i))}var $i=`
varying vec3 vWorldPosition;
void main() {
	vec4 wp = modelMatrix * vec4( position, 1.0 );
	vWorldPosition = wp.xyz;
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
	gl_Position.z = gl_Position.w;
}`,ji=`
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
}`;function Yi(a){let e=new vt({name:"NightSky",vertexShader:$i,fragmentShader:ji,side:1,depthWrite:!1,uniforms:{moonDir:{value:a.clone()},showMoon:{value:1},uStars:{value:1},time:{value:0},cityGlow:{value:1}}}),t=new ct(new ua(1,1,1),e);return t.frustumCulled=!1,t}function vo(a,e=mt.day,{sunColor:t=16773340,moonColor:o=11122920,groundAlbedo:i=.15}={}){let r=!!e.moon,[n,s]=r?e.moon:e.sun,l=Vi(n,s),c=()=>{if(r)return Yi(l);let N=new Pr,G=N.material.uniforms;return G.turbidity.value=e.turbidity,G.rayleigh.value=e.rayleigh,G.mieCoefficient.value=e.mie,G.mieDirectionalG.value=.8,G.sunPosition.value.copy(l),G.cloudCoverage.value=e.clouds,G.cloudDensity.value=.75,G.cloudElevation.value=.5,G.cloudScale.value=2e-4,G.cloudSpeed.value=3e-5,N.frustumCulled=!1,N},u=(N,G)=>{let z=N.material.uniforms;r?(z.showMoon.value=0,z.cityGlow.value=0):z.showSunDisc.value=0},d=c();!r&&(d.material.uniforms.skyGain.value=e.skyGain??1),d.scale.setScalar(1e3),d.renderOrder=1e3,d.name="sky";let m=c();u(m),m.scale.setScalar(10);let g=new wr;g.add(m);let _=new Gt(32,32,{type:si}),b=new Float32Array(4096),w=new ni(90,1,.1,100),M=new ne,I=new ne,T=new ne,R=new ne,L=new qe(l.x,l.z).normalize(),P=new ne,y=new ne,h=new ne,f=0,p=0,x=0,v=0,S=a.getRenderTarget();for(let[N,G,z,j,E,$]of[[0,1,0,0,0,-1],[1,0,0,0,1,0],[-1,0,0,0,1,0],[0,0,1,0,1,0],[0,0,-1,0,1,0]]){w.position.set(0,0,0),w.up.set(j,E,$),w.lookAt(N,G,z),w.updateMatrixWorld(),a.setRenderTarget(_),a.render(g,w),a.readRenderTargetPixels(_,0,0,32,32,b);let oe=w.matrixWorld.elements;M.set(oe[0],oe[1],oe[2]),I.set(oe[4],oe[5],oe[6]),T.set(-oe[8],-oe[9],-oe[10]);for(let J=0;J<32;J++)for(let te=0;te<32;te++){let ie=(te+.5)/32*2-1,ce=(J+.5)/32*2-1;R.copy(T).addScaledVector(M,ie).addScaledVector(I,ce);let fe=R.length();if(R.divideScalar(fe),R.y<=0)continue;let ue=(J*32+te)*4,ye=b[ue],Me=b[ue+1],ze=b[ue+2],We=4/1024/(fe*fe*fe),xe=R.y*We,we=.2126*ye+.7152*Me+.0722*ze,Ue=R.x*L.x+R.z*L.y;if(f+=we*xe,Ue>0&&(p+=we*Ue*We),h.x+=ye*xe,h.y+=Me*xe,h.z+=ze*xe,R.y<.02||R.y>.09)continue;let $e=Math.hypot(R.x,R.z),B=(R.x*L.x+R.z*L.y)/$e;B>.92?(P.x+=ye,P.y+=Me,P.z+=ze,x++):B<-.3&&(y.x+=ye,y.y+=Me,y.z+=ze,v++)}}a.setRenderTarget(S),_.dispose(),P.divideScalar(Math.max(1,x)),y.divideScalar(Math.max(1,v));let A=new ke(P.x,P.y,P.z).multiplyScalar(1/Math.max(1e-6,P.x,P.y,P.z)),D=1-da.smoothstep(s,2,20),C=r?new ke(o):new ke(t).lerp(A,D),U=i/Math.PI,k=e.sunToSky*f,W=new Xt({side:2,color:new ke((h.x+C.r*k)*U,(h.y+C.g*k)*U,(h.z+C.b*k)*U)}),O=new ct(new ci(90,48),W);O.rotation.x=-Math.PI/2,O.position.y=-.3,g.add(O);let F=new fi(a),H=F.fromScene(g,0,.1,100);return F.dispose(),m.geometry.dispose(),m.material.dispose(),O.geometry.dispose(),W.dispose(),{mesh:d,sunDir:l,night:r,envMap:H.texture,lightColor:C,groundColor:W.color.clone(),skyIrradiance:f,wallIrradiance:p+(.2126*W.color.r+.7152*W.color.g+.0722*W.color.b)*Math.PI/2,horizonAway:new ke(y.x,y.y,y.z),horizonSun:new ke(P.x,P.y,P.z),update(N,G){d.position.copy(N.position),d.material.uniforms.time.value=G},dispose(){d.removeFromParent(),d.geometry.dispose(),d.material.dispose(),H.dispose()}}}function Dr({sunDir:a,sunColor:e,falloff:t=1/450,dynamic:o=!1,fogRef:i=null}){let r=(c,u,d)=>`vec3( ${c.toFixed(6)}, ${u.toFixed(6)}, ${d.toFixed(6)} )`,n=c=>Math.max(c.r,c.g,c.b,1e-4),s=i?n(i):1,l=i?n(e)/s:1;Zt.fog_pars_vertex=`#ifdef USE_FOG
	varying vec3 vFogWorld;
#endif`,Zt.fog_vertex=`#ifdef USE_FOG
	vFogWorld = transpose( mat3( viewMatrix ) ) * mvPosition.xyz + cameraPosition;
#endif`,Zt.fog_pars_fragment=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying vec3 vFogWorld;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
	#define FOG_SUN_DIR ${r(a.x,a.y,a.z)}
	#define FOG_SUN_COLOR ${r(e.r,e.g,e.b)}
	#define FOG_FALLOFF ${t.toExponential(6)}
${o?`	#define FOG_SUN_REF ${s.toExponential(6)}
	#define FOG_SUN_GAIN ${l.toExponential(6)}
	#if ( defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG ) || defined( TOON ) ) && NUM_DIR_LIGHTS > 0
		#define FOG_DYN
	#endif`:""}
#endif`,Zt.fog_fragment=`#ifdef USE_FOG
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
	#ifdef FOG_DYN
	vec3 fogSunDir = normalize( ( vec4( directionalLights[ 0 ].direction, 0.0 ) * viewMatrix ).xyz );
	vec3 fogSunCol = directionalLights[ 0 ].color;
	fogSunCol = fogSunCol / max( max( fogSunCol.r, fogSunCol.g ), max( fogSunCol.b, 1e-3 ) ) * max( max( fogColor.r, fogColor.g ), fogColor.b ) * FOG_SUN_GAIN;
	#elif defined( FOG_SUN_REF )
	vec3 fogSunDir = FOG_SUN_DIR;
	vec3 fogSunCol = FOG_SUN_COLOR * ( max( max( fogColor.r, fogColor.g ), fogColor.b ) / FOG_SUN_REF );
	#else
	vec3 fogSunDir = FOG_SUN_DIR;
	vec3 fogSunCol = FOG_SUN_COLOR;
	#endif
	float fogSun = pow( max( dot( fogDir, fogSunDir ), 0.0 ), 6.0 );
	// дальние слои синеют (Г8.4: хребты уходят в синеву слоями)
	// Г11: воздух ступенями, как на фонах — средний план заметно бледнее, дальний выходит на плоскую сине-серую заливку
	float fogStep = mix( fogFactor, smoothstep( 0.2, 0.7, fogFactor ), 0.25 );
	vec3 fogCol = mix( fogColor, fogSunCol, fogSun ) * mix( vec3( 1.0 ), vec3( 0.8, 0.9, 1.1 ), fogStep );
	// дальний план — насыщенная синева от цвета неба (Initial D: хребты синими слоями), а не постоянный серый
	fogCol = mix( fogCol, fogColor * vec3( 0.72, 0.88, 1.18 ), smoothstep( 0.7, 1.0, fogStep ) * 0.55 );
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogCol, fogStep );
#endif`}var ja=new at,zr=class Fr{constructor(e){e||={},this.zNear=e.webGL===!0?-1:0,this.zFar=1,this.vertices={near:[new ne,new ne,new ne,new ne],far:[new ne,new ne,new ne,new ne]},e.projectionMatrix!==void 0&&this.setFromProjectionMatrix(e.projectionMatrix,e.maxFar||1e4),e.reversedDepth===!0&&(this.zNear=1,this.zFar=0)}setFromProjectionMatrix(e,t){let o=this.zNear,i=this.zFar,r=e.elements[11]===0;return ja.copy(e).invert(),this.vertices.near[0].set(1,1,o),this.vertices.near[1].set(1,-1,o),this.vertices.near[2].set(-1,-1,o),this.vertices.near[3].set(-1,1,o),this.vertices.near.forEach(function(n){n.applyMatrix4(ja)}),this.vertices.far[0].set(1,1,i),this.vertices.far[1].set(1,-1,i),this.vertices.far[2].set(-1,-1,i),this.vertices.far[3].set(-1,1,i),this.vertices.far.forEach(function(n){n.applyMatrix4(ja);let s=Math.abs(n.z);r?n.z*=Math.min(t/s,1):n.multiplyScalar(Math.min(t/s,1))}),this.vertices}split(e,t){for(;e.length>t.length;)t.push(new Fr);t.length=e.length;let o=this.vertices.near[0].z,i=this.vertices.far[0].z;for(let r=0;r<e.length;r++){let n=t[r];if(r===0)for(let s=0;s<4;s++)n.vertices.near[s].copy(this.vertices.near[s]);else{let s=(e[r-1]*i-o)/(i-o);for(let l=0;l<4;l++)n.vertices.near[l].lerpVectors(this.vertices.near[l],this.vertices.far[l],s)}if(r===e.length-1)for(let s=0;s<4;s++)n.vertices.far[s].copy(this.vertices.far[s]);else{let s=(e[r]*i-o)/(i-o);for(let l=0;l<4;l++)n.vertices.far[l].lerpVectors(this.vertices.near[l],this.vertices.far[l],s)}}}toSpace(e,t){for(let o=0;o<4;o++)t.vertices.near[o].copy(this.vertices.near[o]).applyMatrix4(e),t.vertices.far[o].copy(this.vertices.far[o]).applyMatrix4(e)}},Oo={lights_fragment_begin:`
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
	`+Zt.lights_pars_begin},Io=new at,Ya=new zr({webGL:!0}),Nt=new ne,Xi=new ne,ya=new xr,Xa=[],Ka=[],qa=new at,Uo=new at,Ki=new ne(0,1,0),qi=class{constructor(a){this.camera=a.camera,this.parent=a.parent,this.cascades=a.cascades||3,this.maxFar=a.maxFar||1e5,this.mode=a.mode||"practical",this.shadowMapSize=a.shadowMapSize||2048,this.shadowBias=a.shadowBias||1e-6,this.lightDirection=a.lightDirection||new ne(1,-1,1).normalize(),this.lightIntensity=a.lightIntensity||3,this.lightNear=a.lightNear||1,this.lightFar=a.lightFar||2e3,this.lightMargin=a.lightMargin||200,this.customSplitsCallback=a.customSplitsCallback,this.fade=!1,this.mainFrustum=new zr({webGL:!0}),this.frustums=[],this.breaks=[],this.lights=[],this.shaders=new Map,this._createLights(),this.updateFrustums(),this._injectInclude()}_createLights(){for(let a=0;a<this.cascades;a++){let e=new vi(16777215,this.lightIntensity);e.castShadow=!0,e.shadow.mapSize.width=this.shadowMapSize,e.shadow.mapSize.height=this.shadowMapSize,e.shadow.camera.near=this.lightNear,e.shadow.camera.far=this.lightFar,e.shadow.bias=this.shadowBias,this.parent.add(e),this.parent.add(e.target),this.lights.push(e)}}_initCascades(){let a=this.camera;a.updateProjectionMatrix(),this.mainFrustum.setFromProjectionMatrix(a.projectionMatrix,this.maxFar),this.mainFrustum.split(this.breaks,this.frustums)}_updateShadowBounds(){let a=this.frustums;for(let e=0;e<a.length;e++){let t=this.lights[e].shadow.camera,o=this.frustums[e],i=o.vertices.near,r=o.vertices.far,n=r[0],s;s=n.distanceTo(r[2])>n.distanceTo(i[2])?r[2]:i[2];let l=n.distanceTo(s);if(this.fade){let c=this.camera,u=Math.max(c.far,this.maxFar),d=.25*(o.vertices.far[0].z/(u-c.near))**2*(u-c.near);l+=d}t.left=-l/2,t.right=l/2,t.top=l/2,t.bottom=-l/2,t.updateProjectionMatrix()}}_getBreaks(){let a=this.camera,e=Math.min(a.far,this.maxFar);switch(this.breaks.length=0,this.mode){case"uniform":t(this.cascades,a.near,e,this.breaks);break;case"logarithmic":o(this.cascades,a.near,e,this.breaks);break;case"practical":i(this.cascades,a.near,e,.5,this.breaks);break;case"custom":this.customSplitsCallback===void 0&&console.error("CSM: Custom split scheme callback not defined."),this.customSplitsCallback(this.cascades,a.near,e,this.breaks)}function t(r,n,s,l){for(let c=1;c<r;c++)l.push((n+(s-n)*c/r)/s);l.push(1)}function o(r,n,s,l){for(let c=1;c<r;c++)l.push(n*(s/n)**(c/r)/s);l.push(1)}function i(r,n,s,l,c){Xa.length=0,Ka.length=0,o(r,n,s,Ka),t(r,n,s,Xa);for(let u=1;u<r;u++)c.push(da.lerp(Xa[u-1],Ka[u-1],l));c.push(1)}}update(){let a=this.camera,e=this.frustums;qa.lookAt(Xi,this.lightDirection,Ki),Uo.copy(qa).invert();for(let t=0;t<e.length;t++){let o=this.lights[t],i=o.shadow.camera,r=(i.right-i.left)/this.shadowMapSize,n=(i.top-i.bottom)/this.shadowMapSize;Io.multiplyMatrices(Uo,a.matrixWorld),e[t].toSpace(Io,Ya);let s=Ya.vertices.near,l=Ya.vertices.far;ya.makeEmpty();for(let c=0;c<4;c++)ya.expandByPoint(s[c]),ya.expandByPoint(l[c]);ya.getCenter(Nt),Nt.z=ya.max.z+this.lightMargin,Nt.x=Math.floor(Nt.x/r)*r,Nt.y=Math.floor(Nt.y/n)*n,Nt.applyMatrix4(qa),o.position.copy(Nt),o.target.position.copy(Nt),o.target.position.x+=this.lightDirection.x,o.target.position.y+=this.lightDirection.y,o.target.position.z+=this.lightDirection.z}}_injectInclude(){Zt.lights_fragment_begin=Oo.lights_fragment_begin,Zt.lights_pars_begin=Oo.lights_pars_begin}setupMaterial(a){a.defines=a.defines||{},a.defines.USE_CSM=1,a.defines.CSM_CASCADES=this.cascades,this.fade&&(a.defines.CSM_FADE="");let e=[],t=this,o=this.shaders;a.onBeforeCompile=function(i){let r=Math.min(t.camera.far,t.maxFar);t._getExtendedBreaks(e),i.uniforms.CSM_cascades={value:e},i.uniforms.cameraNear={value:t.camera.near},i.uniforms.shadowFar={value:r},o.set(a,i)},o.set(a,null)}_updateUniforms(){let a=Math.min(this.camera.far,this.maxFar);this.shaders.forEach(function(e,t){if(e!==null){let o=e.uniforms;this._getExtendedBreaks(o.CSM_cascades.value),o.cameraNear.value=this.camera.near,o.shadowFar.value=a}!this.fade&&"CSM_FADE"in t.defines?(delete t.defines.CSM_FADE,t.needsUpdate=!0):this.fade&&!("CSM_FADE"in t.defines)&&(t.defines.CSM_FADE="",t.needsUpdate=!0)},this)}_getExtendedBreaks(a){for(;a.length<this.breaks.length;)a.push(new qe);a.length=this.breaks.length;for(let e=0;e<this.cascades;e++){let t=this.breaks[e],o=this.breaks[e-1]||0;a[e].x=o,a[e].y=t}}updateFrustums(){this._getBreaks(),this._initCascades(),this._updateShadowBounds(),this._updateUniforms()}remove(){for(let a=0;a<this.lights.length;a++)this.parent.remove(this.lights[a].target),this.parent.remove(this.lights[a])}dispose(){let a=this.shaders;a.forEach(function(e,t){delete t.onBeforeCompile,delete t.defines.USE_CSM,delete t.defines.CSM_CASCADES,delete t.defines.CSM_FADE,e!==null&&(delete e.uniforms.CSM_cascades,delete e.uniforms.cameraNear,delete e.uniforms.shadowFar),t.needsUpdate=!0}),a.clear()}},Zi=a=>a.isMeshStandardMaterial||a.isMeshLambertMaterial||a.isMeshPhongMaterial||a.isMeshToonMaterial;function Rr({scene:a,camera:e,sunDir:t,intensity:o,color:i,maxFar:r=2500,mapSize:n=2048,splits:s=[12,60,300]}){let l=s,c=new qi({camera:e,parent:a,cascades:l.length+1,maxFar:r,mode:"custom",shadowMapSize:n,shadowBias:-5e-5,customSplitsCallback:(g,_,b,w)=>{for(let M of l)w.push(M/b);w.push(1)},lightDirection:t.clone().negate(),lightIntensity:o,lightNear:1,lightFar:8e3,lightMargin:3e3});c.fade=!0;for(let g of c.lights)g.color.copy(i),g.intensity=o;c.lights.length>=4&&n>=2048&&c.lights[c.lights.length-1].shadow.mapSize.set(n/2,n/2);let u=new WeakSet;function d(g){if(u.has(g)||(u.add(g),!Zi(g)))return;let _=g.onBeforeCompile,b=g.customProgramCacheKey();c.setupMaterial(g);let w=g.onBeforeCompile;g.onBeforeCompile=function(M,I){_.call(this,M,I),w.call(this,M,I)},g.customProgramCacheKey=()=>b+"|csm",g.needsUpdate=!0}let m=g=>{let _=g.material;if(_)if(Array.isArray(_))for(let b of _)d(b);else d(_)};return{csm:c,setup:d,scan(){a.traverse(m)},update(){e.updateMatrixWorld(),c.update();for(let g of c.lights){let _=g.shadow.camera;g.shadow.normalBias=1.5*(_.right-_.left)/g.shadow.mapSize.x,g.shadow.radius=4}},dispose(){c.remove(),c.dispose()}}}var Qi={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new qe(1/1024,1/512)}},vertexShader:`

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

		}`},oa=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},Ji=new yr(-1,1,1,-1,0,1),el=new class extends dt{constructor(){super(),this.setAttribute("position",new Re([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Re([0,2,0,0,2,0],2))}},Wa=class{constructor(a){this._mesh=new ct(el,a)}dispose(){this._mesh.geometry.dispose()}render(a){a.render(this._mesh,Ji)}get material(){return this._mesh.material}set material(a){this._mesh.material=a}},Na=class extends oa{constructor(a,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,a instanceof vt?(this.uniforms=a.uniforms,this.material=a):a&&(this.uniforms=Et.clone(a.uniforms),this.material=new vt({name:a.name===void 0?"unspecified":a.name,defines:Object.assign({},a.defines),uniforms:this.uniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader})),this._fsQuad=new Wa(this.material)}render(a,e,t){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=t.texture),this._fsQuad.material=this.material,this.renderToScreen?(a.setRenderTarget(null),this._fsQuad.render(a)):(a.setRenderTarget(e),this.clear&&a.clear(a.autoClearColor,a.autoClearDepth,a.autoClearStencil),this._fsQuad.render(a))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},tl=class extends Na{constructor(){super(Qi)}setSize(a,e){this.material.uniforms.resolution.value.set(1/a,1/e)}},Ta={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`},Lr=class extends oa{constructor(){super(),this.isOutputPass=!0,this.uniforms=Et.clone(Ta.uniforms),this.material=new bi({name:Ta.name,uniforms:this.uniforms,vertexShader:Ta.vertexShader,fragmentShader:Ta.fragmentShader}),this._fsQuad=new Wa(this.material),this._outputColorSpace=null,this._toneMapping=null}render(a,e,t){this.uniforms.tDiffuse.value=t.texture,this.uniforms.toneMappingExposure.value=a.toneMappingExposure,(this._outputColorSpace!==a.outputColorSpace||this._toneMapping!==a.toneMapping)&&(this._outputColorSpace=a.outputColorSpace,this._toneMapping=a.toneMapping,this.material.defines={},Mi.getTransfer(this._outputColorSpace)==="srgb"&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(a.setRenderTarget(null),this._fsQuad.render(a)):(a.setRenderTarget(e),this.clear&&a.clear(a.autoClearColor,a.autoClearDepth,a.autoClearStencil),this._fsQuad.render(a))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Da={move:.04,turn:.045,maxFrames:[1,3,8,16]},Ot={step:.1,down:.87,up:1.02,downSec:2,upSec:3,warmup:6,lockSec:120};function Ho(a,e,t,o){let i=a.setSize.bind(a);a.setSize=(r,n)=>i(Math.max(1,Math.round(r*e)),Math.max(1,Math.round(n*e))),a.setSize(t,o)}function Ar({perf:a,renderer:e,post:t,shadows:o,camera:i,splits:r,maxFar:n,now:s=()=>performance.now()}){let l={ao:1,bloom:1,fxaa:!1,stagger:!1,shadowDraws:0,frames:0,dynamic:!1,scale:1,atFloor:!0,degrade:0,degradeText:"",fps:0};if(!a)return{info:l,tick(){},setScale(){}};let c=t.composer.renderTarget1,u=c.width,d=c.height;if(a.aoScale&&a.aoScale!==1&&t.gtao.enabled){Ho(t.gtao,a.aoScale,u,d);let W=a.aoSamples||8;t.gtao.updateGtaoMaterial({samples:W}),t.gtao.updatePdMaterial({samples:W,radius:4}),l.ao=a.aoScale}if(a.bloomScale&&a.bloomScale!==1&&t.bloom.enabled&&(Ho(t.bloom,a.bloomScale,u,d),l.bloom=a.bloomScale),a.fxaa){let W=t.composer.passes.findIndex(O=>O instanceof Lr);if(W>=0){let O=new tl;t.composer.insertPass(O,W+1),O.setSize(u,d),l.fxaa=!0}}let m=[],g=[...r,n],_=new ne,b=a.stagger?o.csm.lights:[];for(let W=0;W<b.length;W++)b[W].shadow.autoUpdate=!1,b[W].shadow.needsUpdate=!0,m.push({pos:new ne(1/0,0,0),dir:new ne,age:0});l.stagger=b.length>0;let w=a.dynamic&&a.dynamic.min<1?a.dynamic:null,M=e.getPixelRatio(),I=new qe,T=1,R=1,L=0,P=-1e9,y=0,h=0,f=0,p=0,x=s(),v=x;l.dynamic=!!w,l.atFloor=!w;function S(W){T=Math.round(Math.min(1,Math.max(.3,W))*100)/100,e.getSize(I),t.composer._pixelRatio=M*T,t.composer.setSize(I.x,I.y),l.scale=T,l.atFloor=!w||T<=w.min+1e-6}function A(W){let O=Math.min(.5,(W-v)/1e3);if(v=W,W-x<Ot.warmup*1e3||O<=0||(f+=O,p++,f<1))return;let F=p/f;if(f=0,p=0,l.fps=Math.round(F),W>L&&(R=1),F<w.target*Ot.down?(y+=1,h=0):F>w.target*Ot.up?(h+=1,y=0):(y=0,h=0),y>=Ot.downSec&&T>w.min+1e-6){let H=Math.max(w.min,T-(F<w.target*.6?2:1)*Ot.step);W-P<15e3&&(R=H,L=W+Ot.lockSec*1e3),S(H),y=0}else if(y>=Ot.downSec&&T<=w.min+1e-6){if(y=0,++D>=2){D=0;let H=l.degrade|0;H===0&&C.gtao.enabled?(C.gtao.enabled=!1,l.degrade=1,l.degradeText="без затенения AO"):H<=1&&C.bloom.enabled?(C.bloom.enabled=!1,l.degrade=2,l.degradeText="без свечения"):H<=2&&U.csm&&U.csm.lights.length&&U.csm.lights[0].shadow.mapSize.x>768?(U.csm.lights.forEach(N=>{N.shadow.mapSize.set(768,768),N.shadow.map&&(N.shadow.map.dispose(),N.shadow.map=null),N.shadow.needsUpdate=!0}),l.degrade=3,l.degradeText="тени 768"):l.degrade=4}}else h>=Ot.upSec&&T<R-1e-6&&(S(Math.min(R,T+Ot.step)),h=0,P=W)}let D=0,C=t,U=o,k=0;return{info:l,setScale:S,tick(){let W=s();if(w&&A(W),T!==1||t.grade.uniforms.uSharpen.value!==it.sharpen){let O=t.composer.renderTarget1;t.grade.uniforms.uTexel.value.set(1/O.width,1/O.height),t.grade.uniforms.uSharpen.value=it.sharpen+it.sharpenLow*(1-T)}if(b.length){k++,l.frames=k,i.getWorldDirection(_);for(let O=0;O<b.length;O++){let F=m[O],H=Da.maxFrames[Math.min(O,Da.maxFrames.length-1)];F.age++;let N=F.age>=H&&(H<=3||(k+O)%2==0),G=F.pos.distanceToSquared(i.position)>(Da.move*g[O])**2,z=F.dir.dot(_)<Math.cos(Da.turn);(O===0||N||G||z)&&(b[O].shadow.needsUpdate=!0,l.shadowDraws++,F.pos.copy(i.position),F.dir.copy(_),F.age=0)}}}}}var ea={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`},Wo=class extends oa{constructor(a,e){super(),this.scene=a,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(a,e,t){let o=a.getContext(),i=a.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let r,n;this.inverse?(r=0,n=1):(r=1,n=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(o.REPLACE,o.REPLACE,o.REPLACE),i.buffers.stencil.setFunc(o.ALWAYS,r,4294967295),i.buffers.stencil.setClear(n),i.buffers.stencil.setLocked(!0),a.setRenderTarget(t),this.clear&&a.clear(),a.render(this.scene,this.camera),a.setRenderTarget(e),this.clear&&a.clear(),a.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(o.EQUAL,1,4294967295),i.buffers.stencil.setOp(o.KEEP,o.KEEP,o.KEEP),i.buffers.stencil.setLocked(!0)}},al=class extends oa{constructor(){super(),this.needsSwap=!1}render(a){a.state.buffers.stencil.setLocked(!1),a.state.buffers.stencil.setTest(!1)}},ol=class{constructor(a,e){if(this.renderer=a,this._pixelRatio=a.getPixelRatio(),e===void 0){let t=a.getSize(new qe);this._width=t.width,this._height=t.height,e=new Gt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Jt}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Na(ea),this.copyPass.material.blending=0,this.timer=new gi}swapBuffers(){let a=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=a}addPass(a){this.passes.push(a),a.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(a,e){this.passes.splice(e,0,a),a.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(a){let e=this.passes.indexOf(a);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(a){for(let e=a+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(a){this.timer.update(),a===void 0&&(a=this.timer.getDelta());let e=this.renderer.getRenderTarget(),t=!1;for(let o=0,i=this.passes.length;o<i;o++){let r=this.passes[o];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(o),r.render(this.renderer,this.writeBuffer,this.readBuffer,a,t),r.needsSwap){if(t){let n=this.renderer.getContext(),s=this.renderer.state.buffers.stencil;s.setFunc(n.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,a),s.setFunc(n.EQUAL,1,4294967295)}this.swapBuffers()}Wo!==void 0&&(r instanceof Wo?t=!0:r instanceof al&&(t=!1))}}this.renderer.setRenderTarget(e)}reset(a){if(a===void 0){let e=this.renderer.getSize(new qe);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,a=this.renderTarget1.clone(),a.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=a,this.renderTarget2=a.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(a,e){this._width=a,this._height=e;let t=this._width*this._pixelRatio,o=this._height*this._pixelRatio;this.renderTarget1.setSize(t,o),this.renderTarget2.setSize(t,o);for(let i=0;i<this.passes.length;i++)this.passes[i].setSize(t,o)}setPixelRatio(a){this._pixelRatio=a,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},rl=class extends oa{constructor(a,e,t=null,o=null,i=null){super(),this.scene=a,this.camera=e,this.overrideMaterial=t,this.clearColor=o,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new ke}render(a,e,t){let o=a.autoClear;a.autoClear=!1;let i,r;this.overrideMaterial!==null&&(r=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(a.getClearColor(this._oldClearColor),a.setClearColor(this.clearColor,a.getClearAlpha())),this.clearAlpha!==null&&(i=a.getClearAlpha(),a.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&a.clearDepth(),a.setRenderTarget(this.renderToScreen?null:t),this.clear===!0&&a.clear(a.autoClearColor,a.autoClearDepth,a.autoClearStencil),a.render(this.scene,this.camera),this.clearColor!==null&&a.setClearColor(this._oldClearColor),this.clearAlpha!==null&&a.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=r),a.autoClear=o}},za={defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new qe},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new at},cameraProjectionMatrixInverse:{value:new at},cameraWorldMatrix:{value:new at},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new ne(-1,-1,-1)},sceneBoxMax:{value:new ne(1,1,1)}},vertexShader:`

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
		}`},Fa={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
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

		}`},Za={uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
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
		}`};function il(a=5){let e=Math.floor(a)%2==0?Math.floor(a)+1:Math.floor(a),t=ll(e),o=t.length,i=new Uint8Array(o*4);for(let n=0;n<o;++n){let s=t[n],l=2*Math.PI*s/o,c=new ne(Math.cos(l),Math.sin(l),0).normalize();i[n*4]=(c.x*.5+.5)*255,i[n*4+1]=(c.y*.5+.5)*255,i[n*4+2]=127,i[n*4+3]=255}let r=new Ia(i,e,e);return r.wrapS=Dt,r.wrapT=Dt,r.needsUpdate=!0,r}function ll(a){let e=Math.floor(a)%2==0?Math.floor(a)+1:Math.floor(a),t=e*e,o=Array(t).fill(0),i=Math.floor(e/2),r=e-1;for(let n=1;n<=t;){if(i===-1&&r===e?(r=e-2,i=0):(r===e&&(r=0),i<0&&(i=e-1)),o[i*e+r]!==0){r-=2,i++;continue}o[i*e+r]=n++,r++,i--}return o}var Ra={defines:{SAMPLES:16,SAMPLE_VECTORS:kr(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new qe},cameraProjectionMatrixInverse:{value:new at},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

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
		}`};function kr(a,e,t){let o=sl(a,e,t),i="vec3[SAMPLES](";for(let r=0;r<a;r++){let n=o[r];i+=`vec3(${n.x}, ${n.y}, ${n.z})${r<a-1?",":")"}`}return i}function sl(a,e,t){let o=[];for(let i=0;i<a;i++){let r=2*Math.PI*e*i/a,n=(i/(a-1))**t;o.push(new ne(Math.cos(r),Math.sin(r),n))}return o}var nl=class{constructor(a=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let e=0;e<256;e++)this.p[e]=Math.floor(a.random()*256);this.perm=[];for(let e=0;e<512;e++)this.perm[e]=this.p[e&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(a,e){let t,o,i,r=.5*(Math.sqrt(3)-1),n=(a+e)*r,s=Math.floor(a+n),l=Math.floor(e+n),c=(3-Math.sqrt(3))/6,u=(s+l)*c,d=s-u,m=l-u,g=a-d,_=e-m,b,w;g>_?(b=1,w=0):(b=0,w=1);let M=g-b+c,I=_-w+c,T=g-1+2*c,R=_-1+2*c,L=s&255,P=l&255,y=this.perm[L+this.perm[P]]%12,h=this.perm[L+b+this.perm[P+w]]%12,f=this.perm[L+1+this.perm[P+1]]%12,p=.5-g*g-_*_;p<0?t=0:(p*=p,t=p*p*this._dot(this.grad3[y],g,_));let x=.5-M*M-I*I;x<0?o=0:(x*=x,o=x*x*this._dot(this.grad3[h],M,I));let v=.5-T*T-R*R;return v<0?i=0:(v*=v,i=v*v*this._dot(this.grad3[f],T,R)),70*(t+o+i)}noise3d(a,e,t){let o,i,r,n,s=(a+e+t)*.3333333333333333,l=Math.floor(a+s),c=Math.floor(e+s),u=Math.floor(t+s),d=1/6,m=(l+c+u)*d,g=l-m,_=c-m,b=u-m,w=a-g,M=e-_,I=t-b,T,R,L,P,y,h;w>=M?M>=I?(T=1,R=0,L=0,P=1,y=1,h=0):w>=I?(T=1,R=0,L=0,P=1,y=0,h=1):(T=0,R=0,L=1,P=1,y=0,h=1):M<I?(T=0,R=0,L=1,P=0,y=1,h=1):w<I?(T=0,R=1,L=0,P=0,y=1,h=1):(T=0,R=1,L=0,P=1,y=1,h=0);let f=w-T+d,p=M-R+d,x=I-L+d,v=w-P+2*d,S=M-y+2*d,A=I-h+2*d,D=w-1+3*d,C=M-1+3*d,U=I-1+3*d,k=l&255,W=c&255,O=u&255,F=this.perm[k+this.perm[W+this.perm[O]]]%12,H=this.perm[k+T+this.perm[W+R+this.perm[O+L]]]%12,N=this.perm[k+P+this.perm[W+y+this.perm[O+h]]]%12,G=this.perm[k+1+this.perm[W+1+this.perm[O+1]]]%12,z=.6-w*w-M*M-I*I;z<0?o=0:(z*=z,o=z*z*this._dot3(this.grad3[F],w,M,I));let j=.6-f*f-p*p-x*x;j<0?i=0:(j*=j,i=j*j*this._dot3(this.grad3[H],f,p,x));let E=.6-v*v-S*S-A*A;E<0?r=0:(E*=E,r=E*E*this._dot3(this.grad3[N],v,S,A));let $=.6-D*D-C*C-U*U;return $<0?n=0:($*=$,n=$*$*this._dot3(this.grad3[G],D,C,U)),32*(o+i+r+n)}noise4d(a,e,t,o){let i=this.grad4,r=this.simplex,n=this.perm,s=(Math.sqrt(5)-1)/4,l=(5-Math.sqrt(5))/20,c,u,d,m,g,_=(a+e+t+o)*s,b=Math.floor(a+_),w=Math.floor(e+_),M=Math.floor(t+_),I=Math.floor(o+_),T=(b+w+M+I)*l,R=b-T,L=w-T,P=M-T,y=I-T,h=a-R,f=e-L,p=t-P,x=o-y,v=h>f?32:0,S=h>p?16:0,A=f>p?8:0,D=h>x?4:0,C=f>x?2:0,U=+(p>x),k=v+S+A+D+C+U,W=+(r[k][0]>=3),O=+(r[k][1]>=3),F=+(r[k][2]>=3),H=+(r[k][3]>=3),N=+(r[k][0]>=2),G=+(r[k][1]>=2),z=+(r[k][2]>=2),j=+(r[k][3]>=2),E=+(r[k][0]>=1),$=+(r[k][1]>=1),oe=+(r[k][2]>=1),J=+(r[k][3]>=1),te=h-W+l,ie=f-O+l,ce=p-F+l,fe=x-H+l,ue=h-N+2*l,ye=f-G+2*l,Me=p-z+2*l,ze=x-j+2*l,We=h-E+3*l,xe=f-$+3*l,we=p-oe+3*l,Ue=x-J+3*l,$e=h-1+4*l,B=f-1+4*l,X=p-1+4*l,Z=x-1+4*l,ae=b&255,he=w&255,Ce=M&255,_e=I&255,Ze=n[ae+n[he+n[Ce+n[_e]]]]%32,me=n[ae+W+n[he+O+n[Ce+F+n[_e+H]]]]%32,Pe=n[ae+N+n[he+G+n[Ce+z+n[_e+j]]]]%32,Le=n[ae+E+n[he+$+n[Ce+oe+n[_e+J]]]]%32,gt=n[ae+1+n[he+1+n[Ce+1+n[_e+1]]]]%32,je=.6-h*h-f*f-p*p-x*x;je<0?c=0:(je*=je,c=je*je*this._dot4(i[Ze],h,f,p,x));let Qe=.6-te*te-ie*ie-ce*ce-fe*fe;Qe<0?u=0:(Qe*=Qe,u=Qe*Qe*this._dot4(i[me],te,ie,ce,fe));let Xe=.6-ue*ue-ye*ye-Me*Me-ze*ze;Xe<0?d=0:(Xe*=Xe,d=Xe*Xe*this._dot4(i[Pe],ue,ye,Me,ze));let Ge=.6-We*We-xe*xe-we*we-Ue*Ue;Ge<0?m=0:(Ge*=Ge,m=Ge*Ge*this._dot4(i[Le],We,xe,we,Ue));let Rt=.6-$e*$e-B*B-X*X-Z*Z;return Rt<0?g=0:(Rt*=Rt,g=Rt*Rt*this._dot4(i[gt],$e,B,X,Z)),27*(c+u+d+m+g)}_dot(a,e,t){return a[0]*e+a[1]*t}_dot3(a,e,t,o){return a[0]*e+a[1]*t+a[2]*o}_dot4(a,e,t,o,i){return a[0]*e+a[1]*t+a[2]*o+a[3]*i}},Er=class $t extends oa{constructor(e,t,o=512,i=512,r,n,s){super(),this.width=o,this.height=i,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=il(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new Gt(this.width,this.height,{type:Jt,depthBuffer:!1}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new vt({defines:Object.assign({},za.defines),uniforms:Et.clone(za.uniforms),vertexShader:za.vertexShader,fragmentShader:za.fragmentShader,blending:0,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=+!!this.camera.isPerspectiveCamera,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new xi,this.normalMaterial.blending=0,this.pdMaterial=new vt({defines:Object.assign({},Ra.defines),uniforms:Et.clone(Ra.uniforms),vertexShader:Ra.vertexShader,fragmentShader:Ra.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new vt({defines:Object.assign({},Fa.defines),uniforms:Et.clone(Fa.uniforms),vertexShader:Fa.vertexShader,fragmentShader:Fa.fragmentShader,blending:0}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new vt({uniforms:Et.clone(ea.uniforms),vertexShader:ea.vertexShader,fragmentShader:ea.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:208,blendDst:200,blendEquation:100,blendSrcAlpha:206,blendDstAlpha:200,blendEquationAlpha:100}),this.blendMaterial=new vt({uniforms:Et.clone(Za.uniforms),vertexShader:Za.vertexShader,fragmentShader:Za.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:5,blendSrc:208,blendDst:200,blendEquation:100,blendSrcAlpha:206,blendDstAlpha:200,blendEquationAlpha:100}),this._fsQuad=new Wa(null),this._originalClearColor=new ke,this.setGBuffer(r?r.depthTexture:void 0,r?r.normalTexture:void 0),n!==void 0&&this.updateGtaoMaterial(n),s!==void 0&&this.updatePdMaterial(s)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,t){e===void 0?(this.depthTexture=new wi,this.depthTexture.format=yi,this.depthTexture.type=Si,this.normalRenderTarget=new Gt(this.width,this.height,{minFilter:fo,magFilter:fo,type:Jt,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0):(this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1);let o=+!!this.normalTexture,i=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=o,this.gtaoMaterial.defines.DEPTH_SWIZZLING=i,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=o,this.pdMaterial.defines.DEPTH_SWIZZLING=i,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&+!!e.screenSpaceRadius!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=+!!e.screenSpaceRadius,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=kr(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(e,t,o){switch(this._renderGBuffer&&(this._overrideVisibility(),this._renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(e,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(e,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case $t.OUTPUT.Off:break;case $t.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=o.texture,this.copyMaterial.blending=0,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case $t.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=0,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case $t.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=0,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case $t.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case $t.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=0,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case $t.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=o.texture,this.copyMaterial.blending=0,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(e,this.blendMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}_renderPass(e,t,o,i,r){e.getClearColor(this._originalClearColor);let n=e.getClearAlpha(),s=e.autoClear;e.setRenderTarget(o),e.autoClear=!1,i!=null&&(e.setClearColor(i),e.setClearAlpha(r||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=s,e.setClearColor(this._originalClearColor),e.setClearAlpha(n)}_renderOverride(e,t,o,i,r){e.getClearColor(this._originalClearColor);let n=e.getClearAlpha(),s=e.autoClear;e.setRenderTarget(o),e.autoClear=!1,i=t.clearColor||i,r=t.clearAlpha||r,i!=null&&(e.setClearColor(i),e.setClearAlpha(r||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=s,e.setClearColor(this._originalClearColor),e.setClearAlpha(n)}_overrideVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(o){(o.isPoints||o.isLine||o.isLine2)&&o.visible&&(o.visible=!1,t.push(o))})}_restoreVisibility(){let e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}_generateNoise(e=64){let t=new nl,o=e*e*4,i=new Uint8Array(o);for(let n=0;n<e;n++)for(let s=0;s<e;s++){let l=n,c=s;i[(n*e+s)*4]=(t.noise(l,c)*.5+.5)*255,i[(n*e+s)*4+1]=(t.noise(l+e,c)*.5+.5)*255,i[(n*e+s)*4+2]=(t.noise(l,c+e)*.5+.5)*255,i[(n*e+s)*4+3]=(t.noise(l+e,c+e)*.5+.5)*255}let r=new Ia(i,e,e,Po,To);return r.wrapS=Dt,r.wrapT=Dt,r.needsUpdate=!0,r}};Er.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};var cl={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new ke(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`},go=class xo extends oa{constructor(e,t=1,o,i){super(),this.strength=t,this.radius=o,this.threshold=i,this.resolution=e===void 0?new qe(256,256):new qe(e.x,e.y),this.clearColor=new ke(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),n=Math.round(this.resolution.y/2);this.renderTargetBright=new Gt(r,n,{type:Jt,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){let d=new Gt(r,n,{type:Jt,depthBuffer:!1});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);let m=new Gt(r,n,{type:Jt,depthBuffer:!1});m.texture.name="UnrealBloomPass.v"+u,m.texture.generateMipmaps=!1,this.renderTargetsVertical.push(m),r=Math.round(r/2),n=Math.round(n/2)}let s=cl;this.highPassUniforms=Et.clone(s.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new vt({uniforms:this.highPassUniforms,vertexShader:s.vertexShader,fragmentShader:s.fragmentShader}),this.separableBlurMaterials=[];let l=[6,10,14,18,22];r=Math.round(this.resolution.x/2),n=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new qe(1/r,1/n),r=Math.round(r/2),n=Math.round(n/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new ne(1,1,1),new ne(1,1,1),new ne(1,1,1),new ne(1,1,1),new ne(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Et.clone(ea.uniforms),this.blendMaterial=new vt({uniforms:this.copyUniforms,vertexShader:ea.vertexShader,fragmentShader:ea.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new ke,this._oldClearAlpha=1,this._basic=new Xt,this._fsQuad=new Wa(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let o=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(o,i);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(o,i),this.renderTargetsVertical[r].setSize(o,i),this.separableBlurMaterials[r].uniforms.invSize.value=new qe(1/o,1/i),o=Math.round(o/2),i=Math.round(i/2)}render(e,t,o,i,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();let n=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=o.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=o.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let s=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[l].uniforms.direction.value=xo.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=xo.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),s=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(o),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=n}_getSeparableBlurMaterial(e){let t=[],o=e/3;for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(o*o))/o);let i=[],r=[];for(let n=1;n<e;n+=2){let s=t[n],l=n+1<e?t[n+1]:0,c=s+l;i.push((n*s+(n+1)*l)/c),r.push(c)}return new vt({defines:{KERNEL_PAIRS:i.length},uniforms:{colorTexture:{value:null},invSize:{value:new qe(.5,.5)},direction:{value:new qe(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:i},gaussianWeights:{value:r}},vertexShader:`

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

				}`})}_getCompositeMaterial(e){return new vt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}};go.BlurDirectionX=new qe(1,0),go.BlurDirectionY=new qe(0,1);var it={contrast:1.05,saturation:.94,greenSat:.84,warm:.03,lift:.018,gamma:.98,sharpen:.3,sharpenLow:1.2,vignette:.06,chroma:0},la={contrast:1.12,saturation:1.12,greenSat:1,warm:.09,lift:0,gamma:1},qt={samples:28,length:.55,decay:.965,strength:0,threshold:.78},fl={uniforms:{tDiffuse:{value:null},uSun:{value:new qe(.5,.5)},uOn:{value:0}},vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); }",fragmentShader:`
    uniform sampler2D tDiffuse; uniform vec2 uSun; uniform float uOn;
    varying vec2 vUv;
    void main() {
      vec3 c = texture2D( tDiffuse, vUv ).rgb;
      if ( uOn <= 0.0 ) { gl_FragColor = vec4( c, 1.0 ); return; }
      vec2 d = ( uSun - vUv ) * ${qt.length.toFixed(2)} / ${qt.samples.toFixed(1)};
      vec2 p = vUv; float w = 1.0; vec3 acc = vec3( 0.0 );
      for ( int i = 0; i < ${qt.samples}; i ++ ) {
        p += d;
        vec3 s = texture2D( tDiffuse, p ).rgb;
        float l = dot( s, vec3( 0.2126, 0.7152, 0.0722 ) );
        acc += s * smoothstep( ${qt.threshold.toFixed(2)}, 1.0, l ) * w;
        w *= ${qt.decay.toFixed(3)};
      }
      gl_FragColor = vec4( c + acc * ${qt.strength.toFixed(2)} * uOn / ${qt.samples.toFixed(1)}, 1.0 );
    }`},dl={uniforms:{tDiffuse:{value:null},uTexel:{value:new qe(1/1600,1/900)},uContrast:{value:it.contrast},uSat:{value:it.saturation},uGreenSat:{value:it.greenSat},uWarm:{value:it.warm},uLift:{value:it.lift},uGamma:{value:it.gamma},uSharpen:{value:it.sharpen},uVignette:{value:it.vignette},uChroma:{value:it.chroma},uSpeedBlur:{value:0}},vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); }",fragmentShader:`
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
    }`};function Nr(a,e,t,o,{samples:i=4,grading:r=!0}={}){let n=a.getSize(new qe).multiplyScalar(a.getPixelRatio()).floor(),s=new Gt(n.x,n.y,{type:Jt,samples:i}),l=new ol(a,s);l.addPass(new rl(e,t));let c=new Er(e,t,n.x,n.y);c.updateGtaoMaterial({radius:2.5,distanceExponent:1.5,thickness:2,scale:1.2,samples:16,distanceFallOff:1}),c.updatePdMaterial({lumaPhi:10,depthPhi:2,normalPhi:3,radius:6,radiusExponent:1,rings:2,samples:16}),c.blendIntensity=.9;let u=c,d=u._overrideVisibility.bind(c);u._overrideVisibility=function(){d();let w=u._visibilityCache;e.traverse(M=>{M.userData.noAO&&M.visible&&(M.visible=!1,w.push(M))})},l.addPass(c);let m=new go(new qe(n.x,n.y),.22,.6,2.5/o);l.addPass(m),l.addPass(new Lr);let g=new Na(fl),_=new Na(dl);_.uniforms.uTexel.value.set(1/n.x,1/n.y),r&&l.addPass(_);let b=()=>{l.setSize(innerWidth,innerHeight);let w=a.getSize(new qe).multiplyScalar(a.getPixelRatio());_.uniforms.uTexel.value.set(1/w.x,1/w.y)};return addEventListener("resize",b),{composer:l,gtao:c,bloom:m,grade:_,rays:g,setSun(w,M,I){g.uniforms.uSun.value.set(w,M),g.uniforms.uOn.value=I},setNight(w){let M=_.uniforms,I=1-w;M.uLift.value=it.lift*I+la.lift*w,M.uContrast.value=it.contrast*I+la.contrast*w,M.uSat.value=it.saturation*I+la.saturation*w,M.uGreenSat.value=it.greenSat*I+la.greenSat*w,M.uWarm.value=it.warm*I+la.warm*w,M.uGamma.value=it.gamma*I+la.gamma*w},render(){l.render()},dispose(){removeEventListener("resize",b),l.dispose(),s.dispose()}}}var kt=(a,e,t)=>{let o=Math.min(1,Math.max(0,(t-a)/(e-a)));return o*o*(3-2*o)},ra=a=>new ke(a),ul=ra(7031356),hl=ra(15922424),pl=ra(5795914),ml=ra(2637613),vl=ra(3164218),gl=ra(7039331),xl=ra(6447453),wl=`
uniform float uCityLights;
varying vec3 vFarW;
vec2 farCover( vec2 dist, vec2 halfW, vec2 fw ) { return clamp( ( halfW + 0.5 * fw - dist ) / fw, 0.0, 1.0 ); }
`,yl=`
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
`;function Sl(a,{cityRadius:e,edge:t,seed:o=7,city:i,ringRadius:r=0,built:n=null}){let s=Ei(o),l=p=>{let x=1-Math.abs(2*p-1);return 2*x*x-1},c=(p,x)=>l(s(p/3e3+41,x/3e3-17))+l(s(p/1100-5,x/1100+23))*.3,u=(p,x)=>a(p,x)+kt(t-800,t+2500,Math.max(Math.abs(p),Math.abs(x)))*(260+220*c(p,x)),d=51e3,m=350,g=null,_=null,b=new ke,w={u:null,d:0,h:null,g:null,_:null,cx:0,cz:0},M=[],I=()=>!1,T={triangles:0,masks:0,rebuilds:0};const R=(p,x,v,S,A)=>{for(let D=0;D<A*A;D++){let C=p[3*D],U=p[3*D+2],k=x[D],W=S.getY(D),O=s(C/400+3,U/400-8);b.copy(pl).lerp(ml,kt(30,120,k)).lerp(vl,O*.6*kt(30,120,k)),b.lerp(gl,kt(.62,.42,W)),k>2100&&(b.lerp(ul,kt(2250,2650,k)),b.lerp(hl,kt(2750,3150,k+300*(O-.5)))),Math.hypot(C,U)<e+60&&b.lerp(xl,n?n(C,U):1),v[3*D]=b.r,v[3*D+1]=b.g,v[3*D+2]=b.b}},L=(p,x,v,S,A)=>{for(let D=0;D<A*A;D++){let C=p(x[3*D],x[3*D+2],v[D]);if(!C||C[0]<=0)continue;let U=C[0]*(1-kt(2300,2700,v[D])),k=(C[1]+C[2]+C[3])/3;for(let W=0;W<3;W++)S[3*D+W]+=(k+(C[W+1]-k)*.8-S[3*D+W])*U}},P=(p,x,v)=>{let{n:S,step:A,x0:D,z0:C,heights:U}=p,k=new Float32Array(S*S*3),W=new Float32Array(S*S*3),O=Eo(p,I);for(let H=0;H<S;H++)for(let N=0;N<S;N++){let G=(H*S+N)*3;k[G]=D+N*A,k[G+1]=U[H*S+N],k[G+2]=C+H*A}let F=new dt;F.setAttribute("position",new Wt(k,3)),F.setIndex(new Wt(O.indices,1)),F.computeVertexNormals(),R(k,U,W,F.getAttribute("normal"),S);for(let H of M)L(H,k,U,W,S);F.setAttribute("color",new Wt(W,3));for(let H=0;H<S*S;H++)O.low[H]&&(k[3*H+1]=U[H]-8);if(Object.assign(w,{u:p,d:S,h:U,g:k,_:W,cx:x,cz:v}),T.triangles=O.indices.length/3,_){let H=_.geometry;_.geometry=F,H.dispose()}g=F};P(Hi(u,m,d,0,0),0,0);let y=new He({vertexColors:!0,roughness:1,metalness:0}),h={value:0};if(i){let p=x=>x.toFixed(2);y.onBeforeCompile=x=>{x.uniforms.uCityLights=h,x.defines={...x.defines,CITY_R:p(e-100),CITY_PLAZA:p(i.plaza),CITY_PX:p(i.blockW+i.streetW),CITY_PZ:p(i.blockH+i.streetW),CITY_SW:p(i.streetW),RING_R:p(r||-1e4),RING_W:p(2.5)},x.vertexShader=x.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vFarW;`).replace("#include <begin_vertex>",`#include <begin_vertex>
	vFarW = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;`),x.fragmentShader=x.fragmentShader.replace("#include <common>","#include <common>"+wl).replace("#include <emissivemap_fragment>","#include <emissivemap_fragment>"+yl)},y.customProgramCacheKey=()=>"farWorldLights"}_=new ct(g,y),_.name="farWorld",_.frustumCulled=!1,_.receiveShadow=!0,_.castShadow=!1;let f=!1;return{mesh:_,info:T,recolor(p){M.push(p),L(p,w.g,w.h,w._,w.d),g.getAttribute("color").needsUpdate=!0},setLights(p,x){h.value=p*x},setDetailed(p){I=p;let x=Eo(w.u,p),v=g.getAttribute("position");for(let S=0;S<w.d*w.d;S++)v.setY(S,w.h[S]-(x.low[S]?8:0));v.needsUpdate=!0,g.setIndex(new Wt(x.indices,1)),T.triangles=x.indices.length/3,T.masks++},follow(p,x){if(f||Math.abs(p-w.cx)<15e3&&Math.abs(x-w.cz)<15e3)return;f=!0;let v=Math.round(p/7e3)*7e3,S=Math.round(x/7e3)*7e3,A=Math.round(2*d/m)+1,D=new Float32Array(A*A),C=0,U=()=>{for(let k=Math.min(A,C+6);C<k;C++)for(let W=0;W<A;W++)D[C*A+W]=u(v-d+W*m,S-d+C*m);if(C<A)return setTimeout(U,0);P({x0:v-d,z0:S-d,step:m,n:A,heights:D},v,S),T.rebuilds++,f=!1};setTimeout(U,0)},dispose(){_.removeFromParent(),g.dispose(),y.dispose()}}}var bl=["grass","forest","rock","gravel","asphalt","moss"];async function Ml(a,e){let t=await(await fetch(a)).blob(),o=await createImageBitmap(t,{resizeWidth:e,resizeHeight:e,resizeQuality:"high"}),i=new OffscreenCanvas(e,e).getContext("2d");return i.drawImage(o,0,0),o.close(),i.getImageData(0,0,e,e).data}function Go(a,e,t,o){let i=new hi(a,e,e,t);return i.format=Po,i.type=To,i.wrapS=i.wrapT=Dt,i.minFilter=Ua,i.magFilter=Ha,i.generateMipmaps=!0,i.anisotropy=8,i.colorSpace=o?_t:"",i.needsUpdate=!0,i}async function _l(a,e,t=1024){let o=e.length,i=new Uint8Array(t*t*4*o),r=new Uint8Array(t*t*4*o),n=[];return await Promise.all(e.map(async(s,l)=>{let[c,u,d]=await Promise.all(["color","normal","rough"].map(M=>Ml(`${a}textures/${s}_${M}.jpg`,t))),m=l*t*t*4;i.set(c,m);let g=0,_=0,b=0;for(let M=0;M<t*t*4;M+=4)r[m+M]=u[M],r[m+M+1]=u[M+1],r[m+M+2]=u[M+2],r[m+M+3]=d[M],g+=c[M],_+=c[M+1],b+=c[M+2];let w=1/(t*t*255);n[l]=new ke().setRGB(g*w,_*w,b*w,_t)})),{albedo:Go(i,t,o,!0),normalRough:Go(r,t,o,!1),mean:n}}var Qa={dark:.36,edge0:.15,edge1:.45};function Ga(a,e={}){let t=e.dark??Qa.dark,o=e.edge0??Qa.edge0,i=e.edge1??Qa.edge1;return a.fragmentShader=a.fragmentShader.replace("#include <lights_physical_pars_fragment>",`#include <lights_physical_pars_fragment>
#undef RE_Direct
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float nl = dot( geometryNormal, directLight.direction );
	float lit = mix( ${t.toFixed(3)}, 1.0, smoothstep( ${o.toFixed(3)}, ${i.toFixed(3)}, nl ) );
	reflectedLight.directDiffuse += directLight.color * lit * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct RE_Direct_Toon`),a}var Cl=[2.6,3.2,6,2.2,4,2.4],Pl=[[.37,.47,.26],[.34,.29,.2],[.86,.86,.84],[.5,.5,.52],[1,1,1],[.25,.36,.19]],Tl=`
uniform float uSnow;
uniform float uAutumn;
uniform float uSpring;
// рисовые поля: поворот полей по клеткам 2 км (R) и рамка текстуры (x0, z0, клетка, число клеток)
uniform sampler2D tPaddy;
uniform vec4 uPaddyO;
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
`,Dl=`
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
		// рисовые поля (田んぼ, 2026-10-23): ровные открытые места равнины Канто (вес — vSplatB.w, beauty.js Wn). Поля
		// 100 × 30 м вдоль сетки дорог клетки 2 км (tPaddy), межи 0,5 м с травой, полевая дорога (гравий 3 м) у каждого
		// 4-го ряда; рис — рядками через 0,3 м (вблизи), четверть полей — овощи грядками или пар. Весной поля залиты
		// водой (серо-голубые, гладкие), летом зелёные, осенью — под соломенный тинт травы ниже — золотые
		float farm = vSplatB.w * w[ 0 ] / max( ws, 1e-4 );
		if ( farm > 0.01 && uPaddyO.w > 0.0 ) {
			vec2 pc = floor( ( vTWorld.xz - uPaddyO.xy ) / uPaddyO.z );
			float th = texture2D( tPaddy, ( pc + 0.5 ) / uPaddyO.w ).r * 1.5707963;
			float pcs = cos( th ), psn = sin( th );
			vec2 q = vec2( vTWorld.x * pcs - vTWorld.z * psn, vTWorld.x * psn + vTWorld.z * pcs );
			vec2 fsz = vec2( 100.0, 30.0 ), fi = floor( q / fsz ), fp = q - fi * fsz, de = min( fp, fsz - fp );
			float h1 = tHash( fi + pc * 7.31 ), h2 = tHash( fi.yx * 1.7 + pc + 3.1 );
			// размер пикселя по миру (не по q: на границе клеток q скачет, и fwidth давал «пунктир» межи)
			float pxw = min( max( length( dxz ), length( dyz ) ), 4.0 ), rowAA = 1.0 - smoothstep( 0.05, 0.15, pxw );
			// межа 0,5 м и дорога 3 м — тонкие линии: вдали покрытие по доле пикселя, а не полоса шириной в пиксель
			float levee = ( 1.0 - smoothstep( 0.25, 0.25 + pxw, min( de.x, de.y ) ) ) * min( 1.0, 0.5 / pxw );
			float froad = mod( fi.y, 4.0 ) < 0.5 ? ( 1.0 - smoothstep( 1.5, 1.5 + pxw, fp.y ) ) * min( 1.0, 3.0 / pxw ) : 0.0;
			// граница клеток 2 км (поворот полей меняется) — полевая дорога вдоль неё
			vec2 cb = abs( fract( ( vTWorld.xz - uPaddyO.xy ) / uPaddyO.z + 0.5 ) - 0.5 ) * uPaddyO.z;
			froad = max( froad, 1.0 - smoothstep( 1.5, 1.5 + pxw, min( cb.x, cb.y ) ) );
			vec3 rice = uSpring > 0.5 ? vec3( 0.19, 0.22, 0.23 ) : uAutumn > 0.5 ? vec3( 0.3, 0.31, 0.25 ) : vec3( 0.14, 0.21, 0.075 );
			rice *= ( 0.88 + 0.24 * h2 ) * ( 1.0 - 0.16 * rowAA * smoothstep( 0.35, 0.6, abs( fract( q.y / 0.3 ) - 0.5 ) * 2.0 ) );
			vec3 veg = mix( vec3( 0.21, 0.16, 0.1 ), vec3( 0.17, 0.25, 0.09 ), mix( 0.5, step( 0.5, fract( q.y / 0.9 ) ), rowAA ) );
			vec3 fallow = vec3( 0.27, 0.24, 0.16 ) * ( 0.9 + 0.2 * tNoise( q / 3.0 ) );
			bool isRice = h1 < 0.75;
			vec3 fc = isRice ? rice : h1 < 0.9 ? veg : fallow;
			fc = mix( mix( fc, mix( vec3( 0.13, 0.19, 0.08 ), tAlbC * 1.6, 0.5 ), levee ), vec3( 0.34, 0.32, 0.28 ) * ( 0.9 + 0.2 * tNoise( vTWorld.xz * 0.8 ) ), froad );
			tAlbC = mix( tAlbC, fc, farm );
			if ( uSpring > 0.5 && isRice ) tRgh = mix( tRgh, 0.12, farm * ( 1.0 - levee ) * ( 1.0 - froad ) );
		}
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
`,zl=`
	normal = normalize( ( viewMatrix * vec4( normalize( vTNormal ), 0.0 ) ).xyz );   // Г11: без карт нормалей — рисованная плоская земля
`,Pt={uSnow:{value:0},uAutumn:{value:0},uWet:{value:0},uSpring:{value:0},uSnowFall:{value:0}},Or=Co&&new URLSearchParams(globalThis.location?.search||"").get("paddy")!=="0",Bo=(()=>{if(!Or)return{tPaddy:{value:null},uPaddyO:{value:[0,0,1,0]}};let a=ii(),e=new Ia(a.data,a.n,a.n);return e.needsUpdate=!0,{tPaddy:{value:e},uPaddyO:{value:[a.o,a.o,a.cell,a.n]}}})(),wo={value:0},Ja=new Map;function Vo(a,e=Do()){return e==="spring"&&a.spring?a.spring:e==="autumn"?a.autumn?a.autumn:a.kind==="broad"?"kouyou":"none":e==="winter"&&a.kind==="conifer"?"frost":"none"}function $o(a,e){if(!a?.image||e==="none")return a;let t=a.uuid+e;if(Ja.has(t))return Ja.get(t);let o=a.image,i=o.width,r=o.height,n=new OffscreenCanvas(i,r),s=n.getContext("2d");s.drawImage(o,0,0);let l=s.getImageData(0,0,i,r),c=l.data,u={sakura:[[.98,.66,.78],[.96,.8,.86]],momiji:[[.82,.12,.05],[.96,.4,.07]],kouyou:[[.95,.66,.12],[.78,.4,.08]]}[e];for(let m=0;m<c.length;m+=4){if(!c[m+3])continue;let g=(.3*c[m]+.59*c[m+1]+.11*c[m+2])/255;if(e==="frost"){for(let I=0;I<3;I++)c[m+I]+=(232-c[m+I])*.38;continue}let _=(m>>2)%i,b=(m>>2)/i,w=.5+.5*Math.sin(_/i*5.1+Math.sin(b/i*4.3)*1.7),M=.6+.9*g;for(let I=0;I<3;I++)c[m+I]=Math.min(255,(u[0][I]+(u[1][I]-u[0][I])*w)*255*M)}s.putImageData(l,0,0);let d=new Tt(n);return d.colorSpace=a.colorSpace,d.flipY=a.flipY,d.wrapS=a.wrapS,d.wrapT=a.wrapT,d.needsUpdate=!0,Ja.set(t,d),d}function Fl(a,e=1){let t=a==="snow",o=t?7e3:9e3,i=new Float32Array(o*6),r=new Float32Array(o*2);for(let c=0;c<o;c++){let u=Math.random(),d=Math.random(),m=Math.random();i.set([u,d,m,u,d,m],c*6),r.set([0,1],c*2)}let n=new dt;n.setAttribute("position",new Re(i,3)),n.setAttribute("aEnd",new Re(r,1));let s=new qr({transparent:!0,depthWrite:!1,fog:!1,uniforms:{uTime:{value:0},uCam:{value:new ne},uBright:{value:e}},vertexShader:`attribute float aEnd; uniform float uTime; uniform vec3 uCam; varying float vA;
void main() {
	float box = ${t?"46.0":"38.0"}, sp = ${t?"1.3":"11.0"};
	vec3 w = vec3( ${t?"0.35 * sin( uTime * 0.7 + position.z * 31.0 )":"1.4"}, - sp, ${t?"0.3 * cos( uTime * 0.6 + position.x * 23.0 )":"0.5"} ) * uTime;
	vec3 p = uCam + ( fract( position + ( w - uCam ) / box ) - 0.5 ) * box;
	p += aEnd * vec3( ${t?"0.0, 0.07, 0.0":"-0.04, 0.38, -0.015"} );
	vA = 1.0 - smoothstep( 0.25, 0.5, length( p - uCam ) / box );
	gl_Position = projectionMatrix * viewMatrix * vec4( p, 1.0 );
}`,fragmentShader:`uniform float uBright; varying float vA;
void main() { gl_FragColor = vec4( vec3( ${t?"0.95":"0.72, 0.76, 0.82"} ) * uBright, vA * ${t?"0.85":"0.22"} * ( 0.35 + 0.65 * uBright ) ); }`}),l=new ui(n,s);return l.frustumCulled=!1,l.name=t?"snowfall":"rainfall",{mesh:l,update(c,u){s.uniforms.uTime.value=u,s.uniforms.uCam.value.copy(c.position)},dispose(){l.removeFromParent(),n.dispose(),s.dispose()}}}var Ve={uPhotoHub:{value:12e3},uPhotoNear:{value:0},tPhoto:{value:null},uPhotoRect:{value:new Float32Array(4)},uPhotoOn:{value:0},tPhoto2:{value:null},uPhotoRect2:{value:new Float32Array(4)},uPhotoOn2:{value:0},tPhoto3:{value:null},uPhotoRect3:{value:new Float32Array(4)},uPhotoOn3:{value:0},tPhoto4:{value:null},uPhotoRect4:{value:new Float32Array(4)},uPhotoOn4:{value:0}};function Rl(a,e=null){let t=new He({roughness:1,metalness:0,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1});return t.name="worldTerrain",e&&(t.defines={CITY_PX:(e.blockW+e.streetW).toFixed(2),CITY_PZ:(e.blockH+e.streetW).toFixed(2),CITY_HS:(e.streetW/2).toFixed(2),CITY_PLAZA:e.plaza.toFixed(2),CITY_BR:e.blockRadius.toFixed(2)}),t.onBeforeCompile=o=>{o.uniforms.uSnow=Pt.uSnow,o.uniforms.uAutumn=Pt.uAutumn,o.uniforms.uSpring=Pt.uSpring,o.uniforms.tPaddy=Bo.tPaddy,o.uniforms.uPaddyO=Bo.uPaddyO,o.uniforms.tPhoto=Ve.tPhoto,o.uniforms.uPhotoRect=Ve.uPhotoRect,o.uniforms.uPhotoOn=Ve.uPhotoOn,o.uniforms.tPhoto2=Ve.tPhoto2,o.uniforms.uPhotoRect2=Ve.uPhotoRect2,o.uniforms.uPhotoOn2=Ve.uPhotoOn2,o.uniforms.tPhoto3=Ve.tPhoto3,o.uniforms.uPhotoRect3=Ve.uPhotoRect3,o.uniforms.uPhotoOn3=Ve.uPhotoOn3,o.uniforms.tPhoto4=Ve.tPhoto4,o.uniforms.uPhotoRect4=Ve.uPhotoRect4,o.uniforms.uPhotoOn4=Ve.uPhotoOn4,o.uniforms.uPhotoHub=Ve.uPhotoHub,o.uniforms.uPhotoNear=Ve.uPhotoNear,o.uniforms.tAlbedo={value:a.albedo},o.uniforms.tNormalRough={value:a.normalRough},o.uniforms.tScale={value:Cl},o.uniforms.tTint={value:Pl.map(i=>new ne(i[0],i[1],i[2]))},o.vertexShader=`attribute vec4 splatA;
attribute vec4 splatB;
varying vec3 vTWorld;
varying vec3 vTNormal;
varying vec4 vSplatA;
varying vec4 vSplatB;
`+o.vertexShader.replace("#include <fog_vertex>",`#include <fog_vertex>
	vTWorld = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;
	vTNormal = normalize( mat3( modelMatrix ) * objectNormal );
	vSplatA = splatA; vSplatB = splatB;`),Ga(o,{dark:.45}),o.fragmentShader=Tl+o.fragmentShader.replace("#include <map_fragment>",Dl).replace("#include <roughnessmap_fragment>","float roughnessFactor = roughness * tRgh;").replace("#include <normal_fragment_maps>",zl)},t.customProgramCacheKey=()=>"worldTerrainToon",t}var De=2048,sa=a=>Math.round(a*De);async function Ll(a){return createImageBitmap(await(await fetch(a)).blob())}async function Al(a){let[e,t,o]=await Promise.all(["asphalt","gravel","grass"].map(v=>Promise.all(["color","normal","rough"].map(S=>Ll(`${a}textures/${v}_${S}.jpg`))))),i=[0,1,2].map(()=>new OffscreenCanvas(De,De)),[r,n,s]=i.map(v=>v.getContext("2d"));r.fillStyle="#8a8a86",r.fillRect(0,0,De,De),n.fillStyle="rgb(128,128,255)",n.fillRect(0,0,De,De),s.fillStyle="rgb(230,230,230)",s.fillRect(0,0,De,De);let l=(v,S,A,D,C,U=1)=>{[r,n,s].forEach((k,W)=>{k.save(),k.beginPath(),k.rect(S,0,A-S,De),k.clip(),k.globalAlpha=U;for(let O=0;O<De;O+=C)for(let F=S;F<A;F+=D)k.drawImage(v[W],F,O,D,C);k.restore()})},c=(v,S,A,D,C=1)=>{r.save(),r.globalAlpha=C,r.fillStyle=A,r.fillRect(v,0,S-v,De),r.restore(),n.save(),n.globalAlpha=C,n.fillStyle="rgb(128,128,255)",n.fillRect(v,0,S-v,De),n.restore(),s.save(),s.globalAlpha=C,s.fillStyle=`rgb(${D},${D},${D})`,s.fillRect(v,0,S-v,De),s.restore()},u=12345,d=()=>(u=u*16807%2147483647)/2147483647,[m,g]=ht.asphalt.map(sa);l(e,m,g,(g-m)/2,De/3),l(e,m,g,De/2,De/2,.45),r.fillStyle="rgba(142,145,150,0.5)",r.fillRect(m,0,g-m,De),n.fillStyle="rgba(128,128,255,0.6)",n.fillRect(m,0,g-m,De),s.fillStyle="rgba(235,235,235,0.8)",s.fillRect(m,0,g-m,De);for(let v=0;v<40;v++){let S=m+d()*(g-m),A=d()*De,D=120+d()*180,C=r.createRadialGradient(S,A,0,S,A,D),U=d()<.5,k=.05+d()*.05;C.addColorStop(0,U?`rgba(40,42,46,${k})`:`rgba(230,232,236,${k})`),C.addColorStop(1,"rgba(0,0,0,0)"),r.fillStyle=C,r.fillRect(S-D,A-D,2*D,2*D)}for(let v of[.17,.33,.67,.83]){let S=m+(g-m)*v,A=(g-m)*.07,D=r.createLinearGradient(S-A,0,S+A,0);D.addColorStop(0,"rgba(255,255,255,0)"),D.addColorStop(.5,"rgba(60,60,64,0.08)"),D.addColorStop(1,"rgba(255,255,255,0)"),r.fillStyle=D,r.fillRect(S-A,0,2*A,De)}for(let[v,S]of[[m,m+(g-m)*.14],[g,g-(g-m)*.14]]){let A=r.createLinearGradient(v,0,S,0);A.addColorStop(0,"rgba(118,108,92,0.18)"),A.addColorStop(1,"rgba(118,108,92,0)"),r.fillStyle=A,r.fillRect(Math.min(v,S),0,Math.abs(S-v),De);let D=s.createLinearGradient(v,0,S,0);D.addColorStop(0,"rgba(245,245,245,0.6)"),D.addColorStop(1,"rgba(245,245,245,0)"),s.fillStyle=D,s.fillRect(Math.min(v,S),0,Math.abs(S-v),De)}r.lineCap="round",s.lineCap="round";for(let v=0;v<0;v++){let S=m+30+d()*(g-m-60),A=d()*De,D=4+Math.floor(d()*7),C=2.5+d()*3;r.strokeStyle="rgba(22,22,24,0.6)",r.lineWidth=C,s.strokeStyle="rgba(70,70,70,0.9)",s.lineWidth=C+1,r.beginPath(),r.moveTo(S,A),s.beginPath(),s.moveTo(S,A);for(let U=0;U<D;U++)S+=(d()-.5)*70,A+=(d()-.3)*60,S=Math.max(m+20,Math.min(g-20,S)),r.lineTo(S,A),s.lineTo(S,A);r.stroke(),s.stroke()}for(let v=0;v<26;v++){let S=m+40+d()*(g-m-80),A=d()*De,D=30+d()*120,C=r.createRadialGradient(S,A,0,S,A,D),U=d()<.5?"rgba(20,20,22,0.18)":"rgba(60,58,55,0.12)";C.addColorStop(0,U),C.addColorStop(1,"rgba(0,0,0,0)"),r.fillStyle=C,r.fillRect(S-D,A-D,2*D,2*D)}let _=(v,S,A)=>{r.fillStyle=A,r.fillRect(v,0,S,De),n.fillStyle="rgba(128,128,255,0.7)",n.fillRect(v,0,S,De),s.fillStyle="rgba(120,120,120,0.85)",s.fillRect(v,0,S,De);for(let D=0;D<60;D++)r.fillStyle=`rgba(110,112,116,${.08+d()*.14})`,r.fillRect(v+d()*S,d()*De,2+d()*4,2+d()*8)};_(m+8+11,17,"#ececea"),_(g-8-28,17,"#ececea"),_((m+g)/2-9,17,"#e3c440");let[b,w]=ht.curb.map(sa);c(b,w,"#efefea",150);for(let v=0;v<10;v++)r.fillStyle=v%2?"#e4e4df":"#a8453a",r.fillRect(b,v*De/10,w-b,De/10);let M=(v,S,A,D)=>{let[C,U]=ht[v].map(sa);l(S,C,U,De/4,De/4),A&&(r.fillStyle=A,r.globalAlpha=D,r.fillRect(C,0,U-C,De),r.globalAlpha=1)};M("gravel",t,"#5f5d58",.72),M("dirt",t,"#5a4a3a",.4),M("sand",t,"#cfc3a6",.4),M("grass",o);let[I,T]=ht.concrete.map(sa);c(I,T,"#a3a29c",215);for(let v=0;v<9e3;v++){let S=110+d()*90;r.fillStyle=`rgba(${S},${S},${S-4},0.25)`,r.fillRect(I+d()*(T-I),d()*De,2,2)}for(let v=0;v<40;v++)r.fillStyle="rgba(60,62,55,0.10)",r.fillRect(I+d()*(T-I),d()*De,3+d()*10,40+d()*200);let[R,L]=ht.rail.map(sa),[P,y]=ht.post.map(sa);c(R,L,"#d4d4cf",90),c(P,y,"#8e8f8e",160),c(R,L,"#dcdcd7",150);for(let v=0;v<700;v++)r.fillStyle="rgba(105,100,88,0.13)",r.fillRect(R+d()*(L-R),d()*De,2,20+d()*140);let h=(v,S)=>{let A=new Tt(v);return A.colorSpace=S?_t:"",A.wrapS=pi,A.wrapT=Dt,A.anisotropy=8,A};for(let v of[e,t,o])for(let S of v)S.close();let f=new He({map:h(i[0],!0),normalMap:h(i[1],!1),roughnessMap:h(i[2],!1),roughness:1,metalness:0});f.name="worldRoad";let[p,x]=ht.concrete;return f.onBeforeCompile=v=>{v.uniforms.uWet=Pt.uWet,v.uniforms.uSnowR=Pt.uSnow,v.uniforms.uSnowFall=Pt.uSnowFall,v.uniforms.uRdLamp=wo,v.vertexShader=`varying vec3 vRWorld;
varying vec3 vRNormal;
varying float vRdLanes;
`+v.vertexShader.replace("#include <uv_vertex>",`#include <uv_vertex>
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
	vRNormal = normalize( mat3( modelMatrix ) * objectNormal );`),v.fragmentShader=`varying vec3 vRWorld;
varying vec3 vRNormal;
varying float vRdLanes;
uniform float uRdLamp;
uniform float uWet;
uniform float uSnowR;
uniform float uSnowFall;
${Ii}
float rHash( vec2 p ) { return fract( sin( dot( p, vec2( 127.1, 311.7 ) ) ) * 43758.5453 ); }
float rNoise( vec2 p ) {
	vec2 i = floor( p ), f = fract( p ), u = f * f * ( 3.0 - 2.0 * f );
	return mix( mix( rHash( i ), rHash( i + vec2( 1.0, 0.0 ) ), u.x ), mix( rHash( i + vec2( 0.0, 1.0 ) ), rHash( i + vec2( 1.0, 1.0 ) ), u.x ), u.y );
}
`+v.fragmentShader.replace("#include <opaque_fragment>",`outgoingLight += diffuseColor.rgb * vec3( ${Lt.color.join(", ")} ) * rdLamp * uRdLamp;
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
		diffuseColor.rgb = diffuse * texture2D( map, vec2( ${(ht.asphalt[0]+.004+(ht.asphalt[1]-ht.asphalt[0]-.008)*.58).toFixed(4)} + tx * ${((ht.asphalt[1]-ht.asphalt[0]-.008)*.32).toFixed(4)}, wr.y / 10.0 ) ).rgb;
		diffuseColor.rgb *= 0.9 + 0.08 * rNoise( wr / 9.0 + seed ) + 0.04 * rNoise( wr / 2.3 );
		diffuseColor.rgb *= 1.0 - 0.18 * smoothstep( 0.7, 0.9, rNoise( wr / 3.1 + seed * 1.9 ) );
		rdPolish = 0.1;
		if ( uWet > 0.0 ) {
			rdWet = uWet * ( 0.55 + 0.45 * smoothstep( 0.55, 0.75, rNoise( w / 3.5 + seed * 2.3 ) ) );
			diffuseColor.rgb *= 1.0 - 0.45 * rdWet;
		}
		// зима (src/winterRoad.js — то же правило в физике): укатанный снег, лёд блестит, на площадке каши нет (середина)
		if ( uSnowR > 0.0 ) {
			vec3 wr = winterRoad( w, vRWorld.y, 0.0, uSnowFall );
			diffuseColor.rgb = mix( diffuseColor.rgb, vec3( 0.8, 0.82, 0.86 ) * ( 0.9 + 0.1 * rNoise( w / 1.3 ) ), wr.x );
			diffuseColor.rgb = mix( diffuseColor.rgb, diffuseColor.rgb * 0.75 + vec3( 0.03, 0.04, 0.06 ), wr.y );
			rdWet *= 1.0 - wr.x;
			rdPolish = max( rdPolish, 0.85 * wr.y );
		}
	} else
	#endif
	if ( vMapUv.x < ${(ht.asphalt[1]-.001).toFixed(4)} ) {
		float s = vMapUv.y * 10.0, lat = ( vMapUv.x - ${ht.asphalt[0].toFixed(4)} - 0.004 ) / ${(ht.asphalt[1]-ht.asphalt[0]-.008).toFixed(4)} - 0.5;
		vec2 seed = floor( vRWorld.xz / 500.0 );
		float lm = lat * 7.6;                                            // ≈ метры от оси
		// колеи: по два следа колёс в каждой полосе — темнее и глаже
		float wp = min( min( abs( lm - 1.1 ), abs( lm - 2.6 ) ), min( abs( lm + 1.1 ), abs( lm + 2.6 ) ) );
		float rut = 1.0 - smoothstep( 0.15, 0.55, wp );
		diffuseColor.rgb *= 1.0 - 0.16 * rut * ( 0.7 + 0.3 * rNoise( vec2( s / 8.0, lm ) + seed ) );
		rdPolish = 0.35 * rut;
		// заплатки: каждые 12 м с вероятностью ~10 % — участок на полполосы или полосу. 2026-10-23 (владелец: «много дыр»):
		// был плоский цвет 0,075/0,2 на 85 % с чёрной каймой — читался провалом; теперь тот же асфальт чуть темнее (свежая)
		// или чуть светлее (старая), край неровный (шум ±12 см), по краю — тонкий битумный шов
		{
			float c = floor( s / 12.0 ), h = rHash( vec2( c, 3.1 ) + seed );
			if ( h < 0.1 ) {
				float h2 = rHash( vec2( c, 7.7 ) + seed ), h3 = rHash( vec2( c, 11.3 ) + seed );
				float s0 = c * 12.0 + h2 * 4.0, s1 = s0 + 1.5 + h3 * 4.0;
				float a0 = h2 < 0.5 ? ( h3 < 0.5 ? 0.15 : - 3.6 ) : ( h3 < 0.5 ? - 1.8 : 0.5 ), a1 = a0 + ( h2 < 0.5 ? 3.4 : 1.3 + 1.6 * h3 );
				float wob = 0.12 * ( rNoise( vec2( s * 1.3, lm * 1.3 ) + seed * 4.1 ) - 0.5 );
				float edge = min( min( s - s0, s1 - s ), min( lm - a0, a1 - lm ) ) + wob;
				if ( edge > 0.0 ) {
					float tone = h3 < 0.55 ? 0.84 : 1.07, seam = 1.0 - 0.28 * ( 1.0 - smoothstep( 0.0, 0.035, edge ) );
					diffuseColor.rgb *= mix( 1.0, tone * ( 0.96 + 0.08 * rNoise( vec2( s, lm ) * 1.7 ) ), smoothstep( 0.0, 0.05, edge ) ) * seam;
				}
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
			// 9 — автодром (chunks.js): только стереть ось, шире, без полос и фонарей
			bool clean = vRdLanes > 8.5, two = vRdLanes > 3.5 && ! clean;
			float nl = clean ? 1.0 : two ? 2.0 * ( vRdLanes - 4.0 ) : vRdLanes;
			// стирание шире вдали: мип-уровни размывают жёлтую линию атласа на несколько текселей
			// 2026-10-23: у двусторонних (шоссе Канто) ось тоже стирается — на ней бетонный барьер (barriers median), по краям
			// разделительной полосы — сплошные белые линии; жёлтая ось осталась только у дорог без барьера
			float fw = 3.0 * fwidth( lat ), cm = 1.0 - smoothstep( ( clean ? 0.03 : 0.009 ) + fw, ( clean ? 0.05 : 0.017 ) + 2.0 * fw, abs( lat ) );
			// асфальт для стирания — из атласа сбоку от оси; у автодрома полоса стирания шире — и сдвиг больше (иначе берёт саму линию)
			diffuseColor.rgb = mix( diffuseColor.rgb, diffuse * texture2D( map, vec2( vMapUv.x + ( clean ? 0.14 : 0.04 ), vMapUv.y ) ).rgb, cm );
			float ln = 0.0;
			for ( int k = 1; k < 6; k ++ ) {
				if ( float( k ) >= nl ) break;
				if ( two && 2 * k == int( nl + 0.5 ) ) continue;
				ln = max( ln, 1.0 - smoothstep( 0.005, 0.009, abs( lat + 0.481 - 0.962 * float( k ) / nl ) ) );
			}
			float dash = step( mod( s, 20.0 ), 8.0 ), wr = smoothstep( 0.5, 0.75, rNoise( vec2( s / 4.0, lat * 9.0 ) + seed * 5.1 ) );
			diffuseColor.rgb = mix( diffuseColor.rgb, vec3( 0.8, 0.8, 0.78 ), ln * dash * ( 1.0 - 0.6 * wr ) );
			if ( two ) {
				float mo = 0.962 * 0.2 / nl, ml = 1.0 - smoothstep( 0.004, 0.0075, abs( abs( lat ) - mo ) );
				diffuseColor.rgb = mix( diffuseColor.rgb, vec3( 0.8, 0.8, 0.78 ), ml * ( 1.0 - 0.5 * wr ) );
			}
			// фонари (hwLights.js HW_LAMP): слева через ${Lt.step} м с ${Lt.first} м, на широких — и справа вразбежку;
			// пятно ~10 м вдоль, у своего края ярче
			if ( uRdLamp > 0.0 && ! clean ) {
				float dl = mod( s - ${Lt.first.toFixed(1)}, ${Lt.step.toFixed(1)} );
				dl = min( dl, ${Lt.step.toFixed(1)} - dl );
				rdLamp = exp( - dl * dl / 70.0 ) * ( 0.5 + 0.5 * smoothstep( 0.45, - 0.45, lat ) );
				if ( vRdLanes > 2.5 ) {
					float dr = mod( s - ${(Lt.first+Lt.step/2).toFixed(1)}, ${Lt.step.toFixed(1)} );
					dr = min( dr, ${Lt.step.toFixed(1)} - dr );
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
		// зима (src/winterRoad.js — то же правило в физике): укатанный снег (в колеях серее), лёд — темнее и блестит,
		// каша у краёв
		if ( uSnowR > 0.0 ) {
			vec3 wr = winterRoad( vRWorld.xz, vRWorld.y, abs( lat ), uSnowFall );
			vec3 snowC = mix( vec3( 0.8, 0.82, 0.86 ), vec3( 0.6, 0.62, 0.66 ), rut * 0.7 ) * ( 0.9 + 0.1 * rNoise( vRWorld.xz / 1.3 ) );
			diffuseColor.rgb = mix( diffuseColor.rgb, snowC, wr.x );
			diffuseColor.rgb = mix( diffuseColor.rgb, diffuseColor.rgb * 0.75 + vec3( 0.03, 0.04, 0.06 ), wr.y );
			diffuseColor.rgb = mix( diffuseColor.rgb, vec3( 0.5, 0.52, 0.55 ), wr.z );
			rdWet = max( rdWet * ( 1.0 - wr.x ), 0.6 * wr.z );
			rdPolish = max( rdPolish, 0.85 * wr.y );
		}
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
		if ( vMapUv.x > ${p.toFixed(4)} && vMapUv.x < ${x.toFixed(4)} && abs( kn.y ) < 0.35 ) {
			vec2 hz = normalize( vec2( - kn.z, kn.x ) + 1e-5 );
			float s = dot( vRWorld.xz, hz ), y = vRWorld.y;
			vec2 q = vec2( s + y, s - y ) * 0.70711 / 0.42, cell = floor( q ), f = fract( q );
			float g = min( min( f.x, 1.0 - f.x ), min( f.y, 1.0 - f.y ) ), grout = 1.0 - smoothstep( 0.025, 0.06, g );
			float shade = 0.82 + 0.26 * fract( sin( dot( cell, vec2( 12.9898, 78.233 ) ) ) * 43758.5453 );
			float stain = smoothstep( 0.0, 1.0, fract( sin( dot( floor( vec2( s / 3.0, 0.0 ) ), vec2( 7.13, 1.7 ) ) ) * 9182.31 ) ) * 0.12;
			vec3 block = vec3( 0.56, 0.555, 0.53 ) * ( shade - stain ) * ( 0.94 + 0.06 * smoothstep( 0.06, 0.25, g ) );
			diffuseColor.rgb = mix( block, vec3( 0.25, 0.25, 0.24 ), grout );
		}
	}`)},f.customProgramCacheKey=()=>"worldRoadHw",f}function kl(a,{lights:e=0,lampGain:t=1}={}){let o=new nt;o.name="landmarks";let i=new He({color:9082790,roughness:.4,metalness:.15}),r=new Xt({color:new ke(1,.08,.05).multiplyScalar(e>0?6*t:1),toneMapped:e>0}),n=[];for(let s of Di(a)){let l=[],c=[];for(let g=0;g<s.boxes.length;g+=8){let _=new ua(s.boxes[g+3],s.boxes[g+4],s.boxes[g+5]).toNonIndexed();_.rotateY(s.boxes[g+6]),_.translate(s.boxes[g],s.boxes[g+1],s.boxes[g+2]);let b=_.getAttribute("position");for(let w=0;w<b.count;w++)c.push(l.length/3),l.push(b.getX(w),b.getY(w),b.getZ(w));_.dispose()}let u=new dt;u.setAttribute("position",new Re(l,3)),u.setIndex(c),u.computeVertexNormals(),u.computeBoundingSphere();let d=new ct(u,i);d.castShadow=!1,d.receiveShadow=!1,o.add(d);let m=new ct(new Sr(1.6,8,6),r);m.position.set(s.top[0],s.top[1]+1.6,s.top[2]),o.add(m),n.push({mesh:d,tile:zi(s.x,s.z)})}return{group:o,setDetailed(s){for(let l of n)l.mesh.visible=!s(l.tile)},setLights(s,l){r.color.setRGB(1,.08,.05).multiplyScalar(s>0?6*l*Math.min(1,s/.3)+(1-Math.min(1,s/.3)):1)},dispose(){for(let s of o.children)s.geometry.dispose();i.dispose(),r.dispose()}}}var jo=(()=>{try{let a=new URLSearchParams(location.search).get("trees");return a&&/^[a-z0-9]+$/.test(a)?`v-${a}/`:""}catch{return""}})(),El={value:(()=>{try{let a=parseFloat(new URLSearchParams(location.search).get("leafsat"));return a>=0&&a<=1.5?a:.6}catch{return .6}})()},Sa=6,Nl=16,Vt=160,aa={sugi:[0,.5,.5,1],broad:[.5,.5,1,1],sasa:[0,0,.5,.5],sugi2:[.5,0,1,.5]},eo=[{id:"sugi",kind:"conifer",w:3,hk:1},{id:"sugi2",kind:"conifer",w:2,hk:.92},{id:"sugi3",kind:"conifer",w:2,hk:.68},{id:"hinoki",kind:"conifer",w:2,hk:.8},{id:"akamatsu",kind:"conifer",w:1,hk:.78},{id:"maple",kind:"broad",w:2,hk:.85,autumn:"momiji"},{id:"maple2",kind:"broad",w:1,hk:.62,autumn:"momiji"},{id:"oak",kind:"broad",w:2,hk:1},{id:"konara",kind:"broad",w:2,hk:.95},{id:"keyaki",kind:"broad",w:1,hk:1.2},{id:"sakura",kind:"broad",w:2,hk:.7,spring:"sakura"}],Ke={step:15,nearBand:150,stepMixed:9,stepCedar:6,cedarJitter:.15,mixedJitter:.7,sugiH:[22,34],broadH:[12,20],sasaStep:6,sasaBand:[2,35],sasaFar:20,tint:{sugi:[[.4,.5],[.46,.56],[.38,.48]],sugi2:[[.44,.54],[.5,.6],[.4,.5]],broad:[[.5,.62],[.52,.62],[.38,.48]],sasa:[[.26,.33],[.5,.58],[.2,.27]],take:[[.3,.37],[.44,.52],[.22,.28]]},minNy:.55},Fe=(a,e,t)=>{let o=a*374761393+e*668265263+t*2147483647|0;return o=Math.imul(o^o>>>13,1274126177),((o^o>>>16)>>>0)/4294967296};function ma(){let a=[],e=[],t=[],o=[],i=[],r=[];return{P:a,N:e,U:t,I:o,C:i,groups:r,quad(n,s,l,c,u,d,m=1){let g=a.length/3;for(let[_,b]of[[n,[u[0],u[1]]],[s,[u[2],u[1]]],[l,[u[2],u[3]]],[c,[u[0],u[3]]]]){a.push(_.x,_.y,_.z),t.push(b[0],b[1]);let w=typeof d=="function"?d(_):d;e.push(w.x,w.y,w.z);let M=typeof m=="function"?m(_):m;i.push(M,M,M)}o.push(g,g+1,g+2,g,g+2,g+3)},group(n,s){r.push([n,o.length-n,s])},geometry(){let n=new dt;n.setAttribute("position",new Re(a,3)),n.setAttribute("normal",new Re(e,3)),n.setAttribute("uv",new Re(t,2)),n.setAttribute("color",new Re(i,3)),n.setIndex(o);for(let[s,l,c]of r)n.addGroup(s,l,c);return n.computeBoundingSphere(),n}}}var ge=(a,e,t)=>new ne(a,e,t);function Oa(a,e,t,o,i,r,n,s=0,l=0,c=0,u=0){for(let d=0;d<r;d++){let m=d/r*Math.PI*2,g=(d+1)/r*Math.PI*2,_=(M,I,T,R)=>ge(s+c*R+Math.cos(M)*I,T,l+u*R+Math.sin(M)*I),b=M=>ge(Math.cos(M),.2,Math.sin(M)).normalize(),w=a.P.length/3;for(let[M,I,T,R,L,P]of[[m,o,e,0,d/r,0],[g,o,e,0,(d+1)/r,0],[g,i,t,1,(d+1)/r,n],[m,i,t,1,d/r,n]]){let y=_(M,I,T,R),h=b(M);a.P.push(y.x,y.y,y.z),a.N.push(h.x,h.y,h.z),a.U.push(L*2,P),a.C.push(1,1,1)}a.I.push(w,w+2,w+1,w,w+3,w+2)}}function Yo(a){let e=ma(),t=a?aa.sugi2:aa.sugi;Oa(e,0,.97,.016,.003,6,9),e.group(0,0);let o=e.I.length;for(let i=0;i<12;i++){let r=(i+.5)/12,n=.4+.6*r,s=.09*(1-r)**.75+.014;for(let l=0;l<4;l++){let c=l/4*Math.PI*2+i*2.39996+(Fe(i,l,41)-.5)*.8,u=Math.cos(c),d=Math.sin(c),m=.85+.3*Fe(i,l,43),g=s*.05,_=s*1.05*m,b=_-g,w=-b*.18,M=ge(u*g,n-b*.2,d*g),I=ge(u*_,n-b*.2+w,d*_),T=ge(-d,0,u).multiplyScalar(b*.55),R=ge(0,b*.55,0),L=T.clone().multiplyScalar(.707).addScaledVector(R,.707),P=T.clone().multiplyScalar(.707).addScaledVector(R,-.707),y=p=>ge(p.x,(p.y-n)*.6+s*.6,p.z).normalize(),h=p=>(.35+.65*Math.min(1,Math.hypot(p.x,p.z)/Math.max(.001,_)))*(.75+.25*r),f=I.clone().sub(M).multiplyScalar(.12);e.quad(M.clone().sub(T),M.clone().add(T),I.clone().add(T),I.clone().sub(T),t,y,h),e.quad(M.clone().add(f).sub(L),M.clone().add(f).add(L),I.clone().add(L),I.clone().sub(L),t,y,h),e.quad(M.clone().sub(f).sub(P),M.clone().sub(f).add(P),I.clone().add(P),I.clone().sub(P),t,y,h)}}for(let i of[0,Math.PI/2]){let r=ge(Math.cos(i),0,Math.sin(i)).multiplyScalar(.022);e.quad(ge(-r.x,.92,-r.z),ge(r.x,.92,r.z),ge(r.x,1.03,r.z),ge(-r.x,1.03,-r.z),t,ge(0,1,0))}return e.group(o,1),e.geometry()}function Ol(){let a=ma();Oa(a,0,.55,.022,.012,6,4);for(let t=0;t<3;t++){let o=t*2.094+.4;Oa(a,.45,.72,.011,.004,4,2,0,0,Math.cos(o)*.16,Math.sin(o)*.16)}a.group(0,0);let e=a.I.length;for(let[t,o,i,r,n]of[[0,.7,0,.26,.22],[.14,.6,.08,.2,.17],[-.12,.62,-.1,.19,.16]])for(let s=0;s<34;s++){let l=ge(t,o,i),c=ge(r,n,r),u=1-2*(s+.5)/34,d=Math.sqrt(1-u*u),m=s*2.39996+t*7,g=ge(Math.cos(m)*d,u,Math.sin(m)*d),_=ge(l.x+g.x*c.x*.85,l.y+g.y*c.y*.85,l.z+g.z*c.z*.85),b=new ne().crossVectors(g,Math.abs(g.y)>.9?ge(1,0,0):ge(0,1,0)).normalize(),w=new ne().crossVectors(g,b).normalize(),M=Fe(s,3,7)*Math.PI,I=.13,T=b.clone().multiplyScalar(Math.cos(M)).addScaledVector(w,Math.sin(M)).multiplyScalar(I),R=w.clone().multiplyScalar(Math.cos(M)).addScaledVector(b,-Math.sin(M)).multiplyScalar(I);a.quad(_.clone().sub(T).sub(R),_.clone().add(T).sub(R),_.clone().add(T).add(R),_.clone().sub(T).add(R),aa.broad,L=>L.clone().sub(l).normalize(),.4+.6*(_.y-.4)/.55)}return a.group(e,1),a.geometry()}function Il(){let a=ma(),e=[];for(let o=0;o<7;o++){let i=o*2.39996,r=o?.012+.03*Fe(o,5,71):0,n=Math.cos(i)*r,s=Math.sin(i)*r,l=(Fe(o,6,72)-.5)*.12,c=(Fe(o,7,73)-.5)*.12,u=.82+.18*Fe(o,8,74);Oa(a,0,u,.0055,.0035,5,1,n,s,l,c),e.push([n,s,l,c,u])}a.group(0,0);let t=a.I.length;for(let[o,i,r,n,s]of e)for(let l=0;l<10;l++){let c=(.4+.6*(l+.5)/10)*s,u=l*2.39996+o*40,d=Math.cos(u),m=Math.sin(u),g=ge(o+r*(c/s),c,i+n*(c/s)),_=.09+.06*Fe(l,9,75),b=ge(g.x+d*_*1.1,c-_*.35,g.z+m*_*1.1),w=ge(-m,0,d).multiplyScalar(_*.55);a.quad(g.clone().sub(w),g.clone().add(w),b.clone().add(w),b.clone().sub(w),aa.sasa,M=>ge(d,.6,m).normalize(),.55+.45*(c/s)),a.quad(g.clone().add(ge(0,_*.4,0)),g.clone().sub(ge(0,_*.4,0)),b.clone().sub(ge(0,_*.4,0)),b.clone().add(ge(0,_*.4,0)),aa.sasa,M=>ge(d,.6,m).normalize(),.55+.45*(c/s))}return a.group(t,1),a.geometry()}function Ul(){let a=ma(),e=ge(0,.55,0);for(let t=0;t<3;t++){let o=t/3*Math.PI,i=ge(Math.cos(o)*1.25,0,Math.sin(o)*1.25);a.quad(ge(-i.x,-.05,-i.z),ge(i.x,-.05,i.z),ge(i.x,.95,i.z),ge(-i.x,.95,-i.z),aa.sasa,r=>ge(r.x,(r.y-e.y)*.7+.5,r.z).normalize(),r=>.4+.6*Math.max(0,r.y)/.95)}return a.group(0,1),a.geometry()}function Hl(){let a=ma();for(let e=0;e<5;e++){let t=e/5*Math.PI*2+.3,o=Math.cos(t),i=Math.sin(t),r=ge(-i,0,o).multiplyScalar(.42),n=ge(o*.05,.05,i*.05),s=ge(o*.95,.55,i*.95);a.quad(n.clone().sub(r),n.clone().add(r),s.clone().add(r),s.clone().sub(r),aa.sasa,l=>ge(l.x,.8,l.z).normalize(),l=>.4+.6*Math.hypot(l.x,l.z))}return a.group(0,1),a.geometry()}function Wl(a,e=!0){let t=ma();for(let o of e?[0]:[0,Math.PI/2]){let i=ge(Math.cos(o)*a/2,0,Math.sin(o)*a/2);t.quad(ge(-i.x,0,-i.z),ge(i.x,0,i.z),ge(i.x,1,i.z),ge(-i.x,1,-i.z),[0,0,1,1],r=>ge(r.x*1.5,.6,r.z*1.5).normalize())}return t.group(0,0),t.geometry()}var La={swayAmp:.007,swaySpeed:1.1,flutterAmp:.0025,flutterSpeed:3.5};function to(a,e={value:0},t=1,o={}){let i=o.wind!==!1,r=!!o.crownNormals,n=!!o.billboard,s=o.atlas||null,l=!!o.cards,c={value:new ne(+(t*.6).toFixed(3)-(t*.25).toFixed(3),+(1/t).toFixed(5),+(i?t:0).toFixed(3))};return a.onBeforeCompile=u=>{u.uniforms.uTime=e,u.uniforms.uLeaf=c,u.uniforms.uLeafSat=El,Ga(u,{dark:.55}),r&&(u.vertexShader=u.vertexShader.replace("#include <beginnormal_vertex>",`#include <beginnormal_vertex>
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
		float ph = uTime * ${La.swaySpeed.toFixed(2)} + iw.x * 0.13 + iw.z * 0.09;
		float hgt = clamp( position.y * uLeaf.y, 0.0, 1.0 );
		vec2 sway = vec2( sin( ph ), sin( ph * 0.8 + 1.3 ) ) * ${La.swayAmp.toFixed(4)} * hgt * hgt;
		float fl = sin( uTime * ${La.flutterSpeed.toFixed(2)} + position.x * 37.0 + position.z * 29.0 + position.y * 11.0 ) * ${La.flutterAmp.toFixed(4)} * hgt;
		transformed.xz += ( sway + fl ) * ${i?"uLeaf.z":"0.0"};
	}`),n&&(u.vertexShader=(s?`attribute float aSlot;
`:"")+u.vertexShader.replace("#include <uv_vertex>",`#include <uv_vertex>
	#ifdef USE_INSTANCING
	vec3 bbO = ( modelMatrix * instanceMatrix * vec4( 0.0, 0.0, 0.0, 1.0 ) ).xyz;
	vec3 bbC = normalize( instanceMatrix[0].xyz );
	#else
	vec3 bbO = ( modelMatrix * vec4( 0.0, 0.0, 0.0, 1.0 ) ).xyz;
	vec3 bbC = vec3( 1.0, 0.0, 0.0 );
	#endif
	vec2 bbW = normalize( cameraPosition.xz - bbO.xz + vec2( 1e-5, 0.0 ) );
	vec2 bbD = vec2( bbW.x * bbC.x + bbW.y * bbC.z, bbW.y * bbC.x - bbW.x * bbC.z ), bbR = vec2( bbD.y, - bbD.x );`+(s?`
	#ifdef USE_MAP
	{
		float bbK = mod( floor( atan( bbD.y, bbD.x ) / ${(2*Math.PI/s.v).toFixed(6)} + 0.5 ), ${s.v.toFixed(1)} ),
			cell = aSlot * ${s.v.toFixed(1)} + bbK;
		vMapUv = vec2( ( mod( cell, ${s.cols.toFixed(1)} ) + clamp( vMapUv.x, 0.004, 0.996 ) ) / ${s.cols.toFixed(1)},
			( floor( cell / ${s.cols.toFixed(1)} ) + clamp( vMapUv.y, 0.002, 0.998 ) ) / ${s.rows.toFixed(1)} );
	}
	#endif`:"")).replace("#include <beginnormal_vertex>",`#include <beginnormal_vertex>
	objectNormal = normalize( vec3( bbR.x, 0.0, bbR.y ) * position.x * 1.6 + vec3( 0.0, ( position.y - 0.55 ) * 1.3, 0.0 ) + vec3( bbD.x, 0.0, bbD.y ) * 0.75 );`).replace("#include <begin_vertex>",`#include <begin_vertex>
	transformed = vec3( position.x * bbR.x, position.y, position.x * bbR.y );`)),u.fragmentShader=`uniform float uLeafSat;
`+u.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
	diffuseColor.rgb = mix( vec3( dot( diffuseColor.rgb, vec3( 0.299, 0.587, 0.114 ) ) ), diffuseColor.rgb, uLeafSat );`),u.fragmentShader=u.fragmentShader.replace("#include <normal_fragment_begin>",`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
	vec3 normal = normalize( vNormal );
	vec3 nonPerturbedNormal = normal;`)},a.customProgramCacheKey=()=>"worldFoliageToon"+(i?"":"_still")+(r?"_crown":"")+(l?"_cards":"")+(n?"_bb"+(s?`${s.v}x${s.cols}x${s.rows}`:""):""),a}async function Gl(a,e){let t=async C=>{let U=await createImageBitmap(await(await fetch(C)).blob()),k=new OffscreenCanvas(U.width,U.height),W=k.getContext("2d");return W.drawImage(U,0,0),U.close(),W.getImageData(0,0,k.width,k.height)},[o,i]=await Promise.all([t(`${e}textures/foliage_color.jpg`),t(`${e}textures/foliage_alpha.png`)]);for(let C=0;C<o.data.length;C+=4)o.data[C+3]=i.data[C];let r=new Ia(o.data,o.width,o.height,Po);r.flipY=!1,r.colorSpace=_t,r.generateMipmaps=!0,r.minFilter=Ua,r.magFilter=Ha,r.anisotropy=8,r.needsUpdate=!0;let n=new Ao,s=(C,U)=>new Promise(k=>n.load(`${e}textures/cedar_bark_${C}.jpg`,W=>{W.colorSpace=U?_t:"",W.wrapS=W.wrapT=Dt,W.anisotropy=4,k(W)})),[l,c,u]=await Promise.all([s("color",!0),s("normal",!1),s("rough",!1)]),d=new He({map:l,normalMap:c,roughnessMap:u,roughness:1,color:3813417,vertexColors:!0});d.name="worldBark",d.onBeforeCompile=C=>{Ga(C),C.vertexShader=C.vertexShader.replace("#include <color_vertex>",`#include <color_vertex>
#ifdef USE_INSTANCING_COLOR
	vColor.rgb = vec3( 1.0 );
	#ifdef USE_COLOR
	vColor.rgb *= color.rgb;   // затенение ствола внутри кроны (цвет вершин моделей)
	#endif
#endif`)},d.customProgramCacheKey=()=>"worldBarkNoTint";let m=new He({roughness:.85,color:5204522,vertexColors:!0});m.name="worldBambooCulm",m.onBeforeCompile=d.onBeforeCompile,m.customProgramCacheKey=()=>"worldBambooCulm";let g={value:0},_=to(new He({map:r,alphaTest:.3,alphaToCoverage:!0,side:2,roughness:1,metalness:0,vertexColors:!0}),g);_.name="worldFoliage";let b={sugi:Yo(0),sugi2:Yo(1),broad:Ol(),sasa:Ul(),fern:Hl(),take:Il()};for(let C of Object.values(b)){let U=C.getAttribute("uv"),k=C.groups.find(F=>F.materialIndex===1);if(!k)continue;let W=C.getIndex(),O=new Set;for(let F=k.start;F<k.start+k.count;F++){let H=W.getX(F);O.has(H)||(O.add(H),U.setY(H,1-U.getY(H)))}}let w=C=>new ke((C[0][0]+C[0][1])/2,(C[1][0]+C[1][1])/2,(C[2][0]+C[2][1])/2),M=[];for(let[C,U,k,W]of[["sugi",b.sugi,.22,Ke.tint.sugi],["broad",b.broad,.7,Ke.tint.broad]])M.push({key:C,w:k,obj:new ct(U,[new Xt({map:l,color:3352863}),new Xt({map:r,alphaTest:.45,side:2,color:w(W),vertexColors:!0})])});let I={};if(eo.length){let{GLTFLoader:C}=await Pi(async()=>{let{GLTFLoader:N}=await ei(()=>import("./main-yKJPGUka.js").then(G=>G.ag),__vite__mapDeps([0,1,2]),import.meta.url).then(G=>G.P);return{GLTFLoader:N}},[],import.meta.url),U=new C,k=async N=>{try{return await U.loadAsync(N)}catch(G){let z=await fetch(N+".json").catch(()=>null);if(!z?.ok)throw G;let j=Uint8Array.from(atob((await z.json()).glb),E=>E.charCodeAt(0));return U.parseAsync(j.buffer,N.slice(0,N.lastIndexOf("/")+1))}},W=new Ao,O=new Map,F=(N,G)=>O.get(N)||O.set(N,new Promise(z=>W.load(`${e}world/trees/tex/${N}`,j=>(j.colorSpace=G?_t:"",j.wrapS=j.wrapT=Dt,j.anisotropy=4,z(j)),void 0,()=>z(null)))).get(N),H=async N=>{let G=[];N.traverse(z=>{if(!z.isMesh)return;let j=Array.isArray(z.material)?z.material[0]:z.material,[E,$]=(j.name||"").split("|");E==="leaves"&&!j.map&&G.push(F(`leaf_${$}.png`,!0).then(oe=>j.map=oe)),E==="bark"&&!j.map&&G.push(F(`bark_${$}.jpg`,!0).then(oe=>j.map=oe),F(`bark_${$}_n.jpg`,!1).then(oe=>j.normalMap=oe))}),await Promise.all(G)};await Promise.all(eo.map(async N=>{let G,z=null;try{G=await k(`${e}world/trees/${jo}${N.id}.glb`),await H(G.scene)}catch{console.warn("лес: нет модели дерева",N.id);return}try{z=await k(`${e}world/trees/${jo}${N.id}_lo.glb`),await H(z.scene)}catch{}let j=G.scene;j.updateMatrixWorld(!0);let E=new xr().setFromObject(j),$=E.max.y-E.min.y,oe=Math.max(E.max.x-E.min.x,E.max.z-E.min.z),J=[],te=[],ie=new nt,ce=(fe,ue,ye,Me=!0)=>{let ze=new Map;fe.traverse(We=>{let xe=We;if(!xe.isMesh)return;let we=xe.geometry.clone().applyMatrix4(xe.matrixWorld),Ue=Array.isArray(xe.material)?xe.material[0]:xe.material,$e=Ue.alphaTest>0||Ue.side===2;for(let Z of Object.keys(we.attributes))Z!=="position"&&Z!=="normal"&&Z!=="uv"&&Z!=="color"&&Z!=="_card"&&we.deleteAttribute(Z);we.attributes.normal||we.computeVertexNormals(),we.attributes.uv||we.setAttribute("uv",new Wt(new Float32Array(we.attributes.position.count*2),2));let B=`${$e?"L":"B"}:${Ue.map?Ue.map.uuid:"-"}:${Ue.normalMap?Ue.normalMap.uuid:"-"}:${Ue.color?Ue.color.getHex():0}`,X=ze.get(B);X?X.geos.push(we):ze.set(B,{geos:[we],src:Ue,leafy:$e})});for(let{geos:We,src:xe,leafy:we}of ze.values()){if(we&&N.kind==="broad"&&Do()==="winter")continue;let Ue=We.some(Z=>!!Z.index)&&We.some(Z=>!Z.index)?We.map(Z=>Z.index?Z.toNonIndexed():Z):We,$e=Ue.length>1&&Fi(Ue,!1)||Ue[0];if(Ue.length>1&&$e!==Ue[0])for(let Z of Ue)Z.dispose();let B=new He({map:(we?$o(xe.map,Vo(N)):xe.map)||null,normalMap:we?null:xe.normalMap||null,color:we?(xe.color?xe.color.clone():new ke(1,1,1)).multiplyScalar(.74):(xe.color?xe.color.clone():new ke(1,1,1)).multiply(new ke(.6,.55,.5)),roughness:.95,metalness:0,side:we?2:0,alphaTest:we?.3:0,alphaToCoverage:we,vertexColors:!!$e.attributes.color});if(we?to(B,g,$,{wind:Me,crownNormals:!0,cards:!!$e.attributes._card}):(B.onBeforeCompile=d.onBeforeCompile,B.customProgramCacheKey=()=>"worldBarkNoTint"),B.name=`worldTree_${N.id}_${we?"leaf":"bark"}${Me?"":"_lo"}`,ue.push({geo:$e,mat:B,leafy:we}),!ye)continue;let X=new ct($e,new Xt({map:(we?$o(xe.map,Vo(N)):xe.map)||null,color:xe.color?xe.color.clone():new ke(1,1,1),alphaTest:we?.4:0,side:we?2:0,vertexColors:!!$e.attributes.color}));ie.add(X)}};ce(j,J,!0),z&&(z.scene.updateMatrixWorld(!0),ce(z.scene,te,!1,!1)),ie.scale.setScalar(1/$),I[N.id]={...N,parts:J,loParts:te.length?te:J,height:$,width:oe},M.push({key:N.id,obj:ie,w:oe/$*1.12})}))}let T=M.length*Sa,R=Math.min(Nl,T),L=Math.ceil(T/R),P=new Gt(Vt*R,Vt*2*L,{type:To});P.texture.colorSpace="";let y={},h={};{let C=a.getRenderTarget(),U=a.getClearColor(new ke),k=a.getClearAlpha(),W=a.autoClear;a.setRenderTarget(P),a.setClearColor(2899748,0),a.clear(),a.autoClear=!1,M.forEach(({key:O,obj:F,w:H},N)=>{y[O]=N,h[O]=H;let G=new wr;G.add(F);let z=new yr(-H/2,H/2,1.02,-.02,-2,2);for(let j=0;j<Sa;j++){let E=j/Sa*2*Math.PI,$=N*Sa+j;z.position.set(Math.cos(E),0,Math.sin(E)),z.lookAt(0,0,0),z.updateMatrixWorld(),P.viewport.set($%R*Vt,Math.floor($/R)*Vt*2,Vt,Vt*2),a.setRenderTarget(P),a.render(G,z)}F.traverse(j=>{let E=j.material;E&&(Array.isArray(E)?E:[E]).forEach($=>$.dispose())})}),P.viewport.set(0,0,Vt*R,Vt*2*L),a.autoClear=W,a.setRenderTarget(C),a.setClearColor(U,k)}let f=to(new He({map:P.texture,alphaTest:.5,side:0,roughness:.9}),g,1,{billboard:!0,atlas:{v:Sa,cols:R,rows:L}});f.name="worldTreeFar";let p={rt:P,mat:f,slot:y,width:h,n:M.length,geo:Wl(1)},x=eo.filter(C=>I[C.id]),v={conifer:x.filter(C=>C.kind==="conifer").flatMap(C=>Array(C.w||1).fill(C.id)),broad:x.filter(C=>C.kind==="broad").flatMap(C=>Array(C.w||1).fill(C.id)),hk:Object.fromEntries(x.map(C=>[C.id,C.hk||1]))},S=new Sr(1,6,4),A=new Xt({colorWrite:!1,depthWrite:!1}),D=new gr;return D.name="worldInstDepth",A.name="worldCrownShadow",{geo:b,imp:p,bark:d,culm:m,foliage:_,models:I,modelKinds:v,crownGeo:S,crownMat:A,instDepth:D,setTime(C){g.value=C},dispose(){for(let C of[...Object.values(b),p.geo])C.dispose();for(let C of[r,l,c,u])C.dispose();S.dispose(),A.dispose(),D.dispose(),d.dispose(),m.dispose(),_.dispose(),p.rt.dispose(),p.mat.dispose();for(let C of Object.values(I))for(let U of[...C.parts,...C.loParts===C.parts?[]:C.loParts])U.geo.dispose(),U.mat.dispose()}}}function*Bl(a,e,t=null){let o=a.terrain,[i,,r]=a.origin,n={sugi:[],sugi2:[],broad:[],sasa:[],fern:[],take:[]},s=(T,R,L)=>T[Math.floor(Fe(Math.floor(R*2),Math.floor(L*2),88)*T.length)%T.length],l=(T,R)=>{let L=Math.min(o.nx-1,Math.max(0,Math.round(T/o.cell))),P=Math.min(o.nz-1,Math.max(0,Math.round(R/o.cell)));return o.edge[P*o.nx+L]},c=(T,R)=>{let L=Math.min(o.nx-1,Math.max(0,Math.round(T/o.cell))),P=Math.min(o.nz-1,Math.max(0,Math.round(R/o.cell)));return o.normals[3*(P*o.nx+L)+1]},u=(T,R,L)=>{let P=T+i,y=R+r,h=e.cedar(P,y)>Fe(Math.floor(P*7),Math.floor(y*7),77),f=Ma(o,T,R)-.2,p=e.alpine?e.alpine(P,y):0;if(h||p>.5){let x=Ke.sugiH[0]+(Ke.sugiH[1]-Ke.sugiH[0])*Fe(Math.floor(P*3),Math.floor(y*3),9);if(t?.broad?.length&&Fe(Math.floor(P*5),Math.floor(y*5),91)<.25*(1-p)){let v=s(t.broad,P,y);(n[v]||=[]).push(T,f,R,x*.6*(t.hk?.[v]??1),L)}else if(t?.conifer?.length){let v=s(t.conifer,P,y);(n[v]||=[]).push(T,f,R,x*(t.hk?.[v]??1),L)}else(Fe(Math.floor(P),Math.floor(y),21)<.2?n.sugi2:n.sugi).push(T,f,R,x,L)}else if(Fe(Math.floor(P*4),Math.floor(y*4),92)<.32){let x=Ke.sugiH[0]*.85+(Ke.sugiH[1]-Ke.sugiH[0])*.7*Fe(Math.floor(P*3),Math.floor(y*3),93),v=t?.conifer?.length?s(t.conifer,P,y):null;v?(n[v]||=[]).push(T,f,R,x*(t.hk?.[v]??1),L):(Fe(Math.floor(P),Math.floor(y),94)<.45?n.sugi2:n.sugi).push(T,f,R,x,L)}else{let x=Ke.broadH[0]+(Ke.broadH[1]-Ke.broadH[0])*Fe(Math.floor(P*3),Math.floor(y*3),11);if(t?.broad?.length){let v=s(t.broad,P,y);(n[v]||=[]).push(T,f,R,x*(t.hk?.[v]??1),L)}else n.broad.push(T,f,R,x,L)}},d=a.trees;for(let T=0;T<d.length;T+=5)u(d[T],d[T+2],d[T+4]);yield;function*m(T,R,L,P){let y=Math.ceil(T*1.5),h=Math.floor((i-y)/T),f=Math.floor((r-y)/T),p=Math.ceil((500+2*y)/T)+1;for(let x=0;x<p;x++){for(let v=0;v<p;v++){let S=h+v,A=f+x,D=(S+.5-R/2+R*Fe(S,A,1))*T,C=(A+.5-R/2+R*Fe(A,S,2))*T;if(P){let O=Math.floor(D/420)*420+210,F=Math.floor(C/420)*420+210,H=Fe(Math.floor(D/420),Math.floor(C/420),57)*Math.PI,N=Math.cos(H),G=Math.sin(H),z=D-O,j=C-F;D=O+z*N-j*G,C=F+z*G+j*N}let U=D-i,k=C-r;if(U<0||k<0||U>=500||k>=500)continue;let W=l(U,k);W<7||c(U,k)<Ke.minNy||!L(W,D,C)||Fe(S,A,3)>e.density(D,C)||u(U,k,6.283*Fe(A,S,4))}yield}}let g=T=>T<Ke.nearBand,_=(T,R)=>e.cedar(T,R)>.5;if(yield*m(Ke.step,.7,T=>!g(T),!1),yield*m(Ke.stepMixed,Ke.mixedJitter,(T,R,L)=>g(T)&&!_(R,L),!1),yield*m(Ke.stepCedar,Ke.cedarJitter,(T,R,L)=>g(T)&&_(R,L),!0),e.bamboo){let T=2.6,R=Math.ceil(i/T),L=Math.ceil(r/T),P=Math.round(500/T);for(let y=0;y<P;y++){for(let h=0;h<P;h++){let f=R+h,p=L+y,x=(f+.8*Fe(f,p,51))*T-i,v=(p+.8*Fe(p,f,52))*T-r;if(x<0||v<0||x>=500||v>=500)continue;let S=l(x,v);S<5||S>45||c(x,v)<.7||Fe(f,p,53)>e.bamboo(x+i,v+r)||n.take.push(x,Ma(o,x,v)-.15,v,9+6*Fe(f,p,54),6.283*Fe(p,f,55))}(y&15)==15&&(yield)}}let b=Ke.sasaStep,w=Math.ceil(i/b),M=Math.ceil(r/b),I=Math.round(500/b);for(let T=0;T<I;T++){for(let R=0;R<I;R++){let L=w+R,P=M+T,y=(L+Fe(L,P,31))*b-i,h=(P+Fe(P,L,32))*b-r;if(y<0||h<0||y>=500||h>=500)continue;let f=l(y,h);f<Ke.sasaBand[0]||f>Ke.sasaBand[1]||c(y,h)<.6||f>Ke.sasaFar&&(L&1||P&1)||Fe(L,P,33)>e.density(y+i,h+r)*.95||(Fe(L,P,36)<.5?n.sasa:n.fern).push(y,Ma(o,y,h)-.05,h,.55+.4*Fe(L,P,34),6.283*Fe(P,L,35))}(T&7)==7&&(yield)}return n}var tt={cells:4,nearIn:120,nearOut:160,perFrame:2,modelCells:16,modelIn:40,modelOut:62,fullIn:7,fullOut:16,move:2,viewNear:45,viewTurn:.985},ta={near:1,shadows:!0};function Xo(a,e){let t=new nt;t.name="forest";let o=tt.cells,i=500/o,r=(B,X)=>Math.min(o-1,Math.max(0,Math.floor(X/i)))*o+Math.min(o-1,Math.max(0,Math.floor(B/i))),n=tt.modelCells,s=500/n,l=(B,X)=>Math.min(n-1,Math.max(0,Math.floor(X/s)))*n+Math.min(n-1,Math.max(0,Math.floor(B/s))),c=new at,u=new ha,d=new ne,m=new ne,g=new ne(0,1,0),_=new at().makeScale(0,0,0),b=(B,X)=>.8+.4*Fe(Math.floor(B[5*X]*3),Math.floor(B[5*X+2]*3),71),w=(B,X,Z=1)=>{let ae=B[5*X+3]*Z,he=ae*b(B,X);return c.compose(d.set(B[5*X],B[5*X+1],B[5*X+2]),u.setFromAxisAngle(g,B[5*X+4]),m.set(he,ae,he))},M=(B,X,Z)=>{let ae=B[5*X+3],he=ae*Z*b(B,X);return c.compose(d.set(B[5*X],B[5*X+1],B[5*X+2]),u.setFromAxisAngle(g,B[5*X+4]),m.set(he,ae,he))},I=new ke,T=(B,X,Z)=>{let ae=Ke.tint[B],he=Fe(Math.floor(X[5*Z]*3),Math.floor(X[5*Z+2]*3),61),Ce=Fe(Math.floor(X[5*Z+2]*3),Math.floor(X[5*Z]*3),62);return I.setRGB(ae[0][0]+(ae[0][1]-ae[0][0])*he,ae[1][0]+(ae[1][1]-ae[1][0])*Ce,ae[2][0]+(ae[2][1]-ae[2][0])*he)},R=(B,X,Z=!0)=>(B.castShadow=X,B.receiveShadow=Z,B.userData.noAO=!0,B.matrixAutoUpdate=!1,B.matrixWorldNeedsUpdate=!0,B.renderOrder=1,B.userData.instReady=!0,X&&(B.customDepthMaterial=e.instDepth),t.add(B),B),L=a.sugi.concat(a.sugi2),P=Object.keys(e.models||{}).filter(B=>a[B]?.length),y=[{key:"sugi",arr:L,model:!1},{key:"broad",arr:a.broad,model:!1},...P.map(B=>({key:B,arr:a[B],model:!0}))].filter(B=>B.arr.length),h=0;for(let B of y)h+=B.arr.length/5;let f=Array.from({length:o*o},()=>[]),p=Array.from({length:n*n},()=>[]),x=null;if(h){let B=e.imp.geo.clone(),X=new Float32Array(h),Z=new ft(B,e.imp.mat,h),ae=0;for(let{key:he,arr:Ce,model:_e}of y){let Ze=Ce.length/5,me=e.imp.width[he],Pe=e.imp.slot[he],Le=_e?l:r,gt=Array.from({length:_e?n*n:o*o},()=>[]);for(let je=0;je<Ze;je++)gt[Le(Ce[5*je],Ce[5*je+2])].push(je);gt.forEach((je,Qe)=>{if(je.length){(_e?p:f)[Qe].push({arr:Ce,w:me,start:ae,ids:je});for(let Xe of je)Z.setMatrixAt(ae,M(Ce,Xe,me)),X[ae++]=Pe}})}B.setAttribute("aSlot",new br(X,1)),Z.computeBoundingSphere(),x=R(Z,!1)}let v=(B,X)=>{if(x&&B.length){for(let Z of B){for(let ae=0;ae<Z.ids.length;ae++)x.setMatrixAt(Z.start+ae,X?_:M(Z.arr,Z.ids[ae],Z.w));x.instanceMatrix.addUpdateRange(Z.start*16,Z.ids.length*16)}x.instanceMatrix.needsUpdate=!0}},S=[["sugi",e.geo.sugi,[e.bark,e.foliage]],["sugi2",e.geo.sugi2,[e.bark,e.foliage]],["broad",e.geo.broad,[e.bark,e.foliage]],["sasa",e.geo.sasa,[e.foliage,e.foliage]],["fern",e.geo.fern,[e.foliage,e.foliage]],["take",e.geo.take,[e.culm,e.foliage]]].filter(B=>a[B[0]]?.length),A=Array.from({length:o*o},()=>({sugi:[],sugi2:[],broad:[],sasa:[],fern:[],take:[]}));for(let[B]of S){let X=a[B];for(let Z=0;Z<X.length/5;Z++)A[r(X[5*Z],X[5*Z+2])][B].push(Z)}let D=Array.from({length:n*n},()=>({}));for(let B of P){let X=a[B];for(let Z=0;Z<X.length/5;Z++){let ae=D[l(X[5*Z],X[5*Z+2])];(ae[B]||(ae[B]=[])).push(Z)}}let C=new Uint8Array(o*o),U=new Uint8Array(n*n),k=0,W=(B,X,Z,ae,he,Ce=!0)=>{let _e=new ft(B,X,Z);return _e.count=0,_e.visible=!1,_e.userData.leafy=he,_e.instanceMatrix.setUsage(_i),R(_e,ae,Ce)},O=(B,X)=>{B.count=X,B.visible=X>0,X&&(B.instanceMatrix.clearUpdateRanges(),B.instanceMatrix.addUpdateRange(0,X*16),B.instanceMatrix.needsUpdate=!0,B.instanceColor&&(B.instanceColor.clearUpdateRanges(),B.instanceColor.addUpdateRange(0,X*3),B.instanceColor.needsUpdate=!0),B.computeBoundingSphere())},F={},H=(B,X,Z)=>{let ae=a[B],he=F[B]||(F[B]=W(X,Z,ae.length/5,!1,!0)),Ce=B==="fern"?"sasa":B,_e=0;for(let Ze=0;Ze<o*o;Ze++)if(C[Ze])for(let me of A[Ze][B])he.setMatrixAt(_e,w(ae,me)),he.setColorAt(_e,T(Ce,ae,me)),_e++;O(he,_e)},N={},G=B=>{let X=e.models[B],Z=a[B],ae=Z.length/5,he=1/X.height,Ce=X.kind==="conifer"?"sugi":"broad",_e=N[B]||(N[B]={lo:X.loParts.map(Pe=>W(Pe.geo,Pe.mat,ae,!1,Pe.leafy)),full:X.parts.map(Pe=>W(Pe.geo,Pe.mat,ae,!Pe.leafy,Pe.leafy))}),Ze=0,me=0;for(let Pe=0;Pe<n*n;Pe++){let Le=U[Pe],gt=Le?D[Pe][B]:void 0;if(!gt||Le===1&&!$e(Pe))continue;let je=Le===2?_e.full:_e.lo;for(let Qe of gt){let Xe=Le===2?me++:Ze++;w(Z,Qe,he);for(let Ge of je)Ge.setMatrixAt(Xe,c),Ge.userData.leafy&&Ge.setColorAt(Xe,T(Ce,Z,Qe))}}for(let Pe of _e.lo)O(Pe,Ze);for(let Pe of _e.full)O(Pe,me)},z=(B,X,Z,ae,he,Ce)=>{let _e=Z[5*ae+3],Ze=_e*he*(Ce?.38:.45),me=_e*(Ce?.34:.26);B.setMatrixAt(X,c.compose(d.set(Z[5*ae],Z[5*ae+1]+_e*(Ce?.58:.64),Z[5*ae+2]),u.identity(),m.set(Ze,me,Ze)))},j=B=>{let X=W(e.crownGeo,e.crownMat,B,!0,!1,!1);return X.frustumCulled=!1,X.visible=ta.shadows,X.userData.noAO=!0,X},E=null,$=null,oe=a.sugi.length/5,J=()=>{let B=L.length/5+a.broad.length/5;if(!B)return;let X=E||=j(B),Z=0;for(let ae=0;ae<o*o;ae++)if(C[ae]){for(let he of A[ae].sugi)z(X,Z++,L,he,.3,!0);for(let he of A[ae].sugi2)z(X,Z++,L,he+oe,.3,!0);for(let he of A[ae].broad)z(X,Z++,a.broad,he,.6,!1)}O(X,Z)},te=0;for(let B of P)te+=a[B].length/5;let ie=()=>{if(!te)return;let B=$||=j(te),X=0;for(let Z=0;Z<n*n;Z++)if(U[Z])for(let ae of P){let he=D[Z][ae];if(!he)continue;let Ce=e.models[ae],_e=Ce.width/Ce.height,Ze=Ce.kind==="conifer";for(let me of he)z(B,X++,a[ae],me,_e,Ze)}O(B,X)},ce=NaN,fe=NaN,ue=NaN,ye=!1,Me=0,ze=0,We=0,xe=0,we=-2,Ue=0,$e=B=>{if(we<=-1)return!0;let X=(B%n+.5)*s-Me,Z=(Math.floor(B/n)+.5)*s-ze,ae=Math.hypot(X,Z);return ae<tt.viewNear||X*We+Z*xe+s>=ae*we};return{group:t,get nearCells(){let B=0;for(let X of C)B+=X;return B},get modelCells(){let B=0;for(let X of U)X===2&&B++;return B},get loCells(){let B=0;for(let X of U)X===1&&B++;return B},update(B,X,Z=tt.perFrame,ae=null){let he=ta.near;if(ae&&Ue>0&&(ae.fx*We+ae.fz*xe<tt.viewTurn||Math.abs(B-Me)>s/2||Math.abs(X-ze)>s/2||we!==ae.cos)){Me=B,ze=X,We=ae.fx,xe=ae.fz,we=ae.cos;for(let me of Object.keys(N))G(me)}if(!k){let me=Math.max(-B,0,B-500),Pe=Math.max(-X,0,X-500),Le=tt.nearIn*he;if(me*me+Pe*Pe>Le*Le)return 0}if(!ye&&he===ue&&Math.abs(B-ce)<tt.move&&Math.abs(X-fe)<tt.move)return 0;let Ce=0,_e=!1,Ze=new Set;for(let me=0;me<o*o&&Ce<Z;me++){let Pe=me%o*i,Le=Math.floor(me/o)*i,gt=Math.max(Pe-B,0,B-Pe-i),je=Math.max(Le-X,0,X-Le-i),Qe=Math.hypot(gt,je),Xe=C[me]===1,Ge=Xe?Qe<tt.nearOut*he:Qe<tt.nearIn*he;Ge!==Xe&&(C[me]=+!!Ge,k+=Ge?1:-1,v(f[me],Ge),_e=!0,Ce++)}if(P.length)for(let me=0;me<n*n&&Ce<Z*3;me++){let Pe=me%n*s,Le=Math.floor(me/n)*s,gt=Math.max(Pe-B,0,B-Pe-s),je=Math.max(Le-X,0,X-Le-s),Qe=Math.hypot(gt,je),Xe=U[me],Ge=Xe;if(Xe===2?Qe>=tt.fullOut*he&&(Ge=+(Qe<tt.modelOut*he)):Xe===1?Qe<tt.fullIn*he?Ge=2:Qe>=tt.modelOut*he&&(Ge=0):Qe<tt.fullIn*he?Ge=2:Qe<tt.modelIn*he&&(Ge=1),Ge!==Xe){Xe>0!=Ge>0&&(v(p[me],Ge>0),k+=Ge>0?1:-1),Ue+=(Ge===1)-+(Xe===1),U[me]=Ge,Ce++;for(let Rt of P)D[me][Rt]&&Ze.add(Rt)}}if(_e){for(let[me,Pe,Le]of S)H(me,Pe,Le);J()}if(Ze.size){ae?(Me=B,ze=X,We=ae.fx,xe=ae.fz,we=ae.cos):we=-2;for(let me of Ze)G(me);ie()}return ye=Ce>=Z,ye||(ce=B,fe=X,ue=he),Ce},dispose(){t.removeFromParent(),t.traverse(B=>{B.isInstancedMesh&&B.dispose()}),x&&x.geometry.dispose(),t.clear()}}}var Ne={from:1,dense:6,mid:12,far:18,step:.65,stepMid:1.2,stepFar:1.9,w:[.8,1.3],h:[.45,.85],blades:5,segments:2,sparseSegments:2,sparseBlades:3,sparseFrom:8,sparseTo:11,sparseIn:30,sparseOut:42,minNy:.6,wind:{amp:.09,speed:1.4,len:7},tint:[[.34,.44],[.54,.64],[.2,.28]]},It=(a,e,t)=>{let o=a*374761393+e*668265263+t*2147483647|0;return o=Math.imul(o^o>>>13,1274126177),((o^o>>>16)>>>0)/4294967296};function Ko(a=Ne.blades,e=Ne.segments){let t=[],o=[],i=[],r=[],n=[],s=977,l=()=>(s=s*16807%2147483647)/2147483647,c=e;for(let d=0;d<a;d++){let m=l()*Math.PI*2,g=.12+.45*l(),_=.55+.45*l(),b=.035+.035*l(),w=Math.cos(m),M=Math.sin(m),I=-M,T=w,R=.8+.3*l(),L=(l()-.5)*.5,P=(l()-.5)*.5,y=t.length/3,h=A=>[L+w*g*A*A*_,A*_*(1-.2*g*A),P+M*g*A*A*_];for(let A=0;A<=c;A++){let D=A/(c+1),[C,U,k]=h(D),W=b*(1-D*.7),O=(.3+.7*D)*R,[F,H,N]=h(D+.1),G=F-C,z=H-U,j=N-k,E=z*T-j*0,$=j*I-G*T,oe=G*0-z*I,J=Math.hypot(E,$,oe)||1,te=E/J*.6,ie=$/J*.6+.8,ce=oe/J*.6,fe=Math.hypot(te,ie,ce);for(let ue of[-1,1])t.push(C+I*W*ue,U,k+T*W*ue),o.push(te/fe,ie/fe,ce/fe),i.push(+(ue>0),D),r.push(O,O,O)}let[f,p,x]=h(1),v=R;t.push(f,p,x),o.push(0,1,0),i.push(.5,1),r.push(v,v,v);for(let A=0;A<c;A++){let D=y+2*A;n.push(D,D+1,D+2,D+1,D+3,D+2)}let S=y+2*c;n.push(S,S+1,y+2*(c+1))}let u=new dt;return u.setAttribute("position",new Re(t,3)),u.setAttribute("normal",new Re(o,3)),u.setAttribute("uv",new Re(i,2)),u.setAttribute("color",new Re(r,3)),u.setIndex(n),u.computeBoundingSphere(),u}function Vl(){let a=Ko(),e=Ko(Ne.sparseBlades,Ne.sparseSegments),t={value:0},o=new He({color:8161884,side:2,roughness:.9,metalness:0,vertexColors:!0});return o.name="worldGrass",o.onBeforeCompile=i=>{i.uniforms.uTime=t,Ga(i),i.vertexShader=`uniform float uTime;
`+i.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
	{
		vec3 iw = ( modelMatrix * instanceMatrix * vec4( 0.0, 0.0, 0.0, 1.0 ) ).xyz;
		float ph = ( iw.x + iw.z * 0.7 ) / ${Ne.wind.len.toFixed(2)} + uTime * ${Ne.wind.speed.toFixed(2)};
		float sway = ( sin( ph ) + 0.5 * sin( ph * 2.3 + 1.7 ) ) * ${Ne.wind.amp.toFixed(3)} * uv.y * uv.y;
		transformed.x += sway; transformed.z += sway * 0.6;
	}`)},o.customProgramCacheKey=()=>"worldGrassToon",{geo:a,geoSparse:e,mat:o,setTime(i){t.value=i},dispose(){a.dispose(),e.dispose(),o.dispose()}}}function $l(a,e,t=null){let o=a.terrain,[i,,r]=a.origin,n=[],s=(T,R,L,P=1,y=0)=>{let h=Math.min(o.nx-1,Math.max(0,Math.round(R/o.cell)));return T[P*(Math.min(o.nz-1,Math.max(0,Math.round(L/o.cell)))*o.nx+h)+y]},l=o.cell,c=o.nx-1,u=o.nz-1,d=t?Math.max(0,Math.floor(t.x0/l)):0,m=t?Math.min(c,Math.ceil(t.x1/l)):c,g=t?Math.max(0,Math.floor(t.z0/l)):0,_=t?Math.min(u,Math.ceil(t.z1/l)):u,b=t?t.x0:0,w=t?t.z0:0,M=t?t.x1:500,I=t?t.z1:500;for(let[T,R,L]of[[Ne.step,Ne.from,Ne.dense],[Ne.stepMid,Ne.dense,Ne.mid],[Ne.stepFar,Ne.mid,Ne.far]])for(let P=g;P<_;P++)for(let y=d;y<m;y++){let h=P*o.nx+y;if(Math.min(o.edge[h],o.edge[h+1],o.edge[h+o.nx],o.edge[h+o.nx+1])>=L+1)continue;let f=Math.max(b,y*l),p=Math.max(w,P*l),x=Math.min(M,f+l,(y+1)*l),v=Math.min(I,p+l,(P+1)*l),S=Math.floor((i+f)/T),A=Math.floor((i+x)/T),D=Math.floor((r+p)/T),C=Math.floor((r+v)/T);for(let U=D;U<=C;U++)for(let k=S;k<=A;k++){let W=(k+.1+.8*It(k,U,1))*T-i,O=(U+.1+.8*It(U,k,2))*T-r;if(W<f||O<p||W>=x||O>=v)continue;let F=s(o.edge,W,O);if(F<R||F>=L||F===255||s(o.normals,W,O,3,1)<Ne.minNy||_r(W+i,O+r)>It(k,U,8)*.6||po(W+i,O+r)>.3)continue;let H=F<Ne.mid?0:e.density(W+i,O+r)*e.clearing(F);if(H>.5||It(k,U,3)<H*.8||F>Ne.mid&&It(k,U,4)<.3)continue;let N=Ne.w[0]+(Ne.w[1]-Ne.w[0])*It(k,U,5),G=Ne.h[0]+(Ne.h[1]-Ne.h[0])*It(U,k,6);n.push(W,Ma(o,W,O)-.03,O,N,G,6.283*It(k,U,7))}}return n}function qo(a,e){let t=new nt;t.name="grass";let o=tt.modelCells,i=500/o,r=(h,f)=>Math.min(o-1,Math.max(0,Math.floor(f/i)))*o+Math.min(o-1,Math.max(0,Math.floor(h/i))),n=typeof a=="function",s=Array(o*o).fill(null),l=h=>{if(s[h])return s[h];if(n){let f=h%o*i,p=Math.floor(h/o)*i;return s[h]=a({x0:f,z0:p,x1:f+i,z1:p+i})}return s[h]=[]};if(!n){let h=Array.from({length:o*o},()=>[]);for(let f=0;f<a.length/6;f++){let p=6*f;h[r(a[p],a[p+2])].push(a[p],a[p+1],a[p+2],a[p+3],a[p+4],a[p+5])}h.forEach((f,p)=>{s[p]=f})}let c=n?-1:a.length/6,u=new at,d=new ha,m=new ne,g=new ne,_=new ne(0,1,0),b=new ke,w=Array(o*o).fill(null),M=Array(o*o).fill(0),I=(h,f)=>{let p=w[h];if(p&&f&&M[h]){M[h]=f,p.geometry=f===2?e.geo:e.geoSparse,p.computeBoundingSphere();return}if(p&&(p.removeFromParent(),p.dispose()),w[h]=null,M[h]=f,!f)return;let x=l(h),v=x.length/6;if(!v)return;let S=new ft(f===2?e.geo:e.geoSparse,e.mat,v);for(let A=0;A<v;A++){let D=6*A;S.setMatrixAt(A,u.compose(m.set(x[D],x[D+1],x[D+2]),d.setFromAxisAngle(_,x[D+5]),g.set(x[D+3],x[D+4],x[D+3])));let C=Ne.tint,U=It(Math.floor(x[D]*5),Math.floor(x[D+2]*5),9);S.setColorAt(A,b.setRGB(C[0][0]+(C[0][1]-C[0][0])*U,C[1][0]+(C[1][1]-C[1][0])*U,C[2][0]+(C[2][1]-C[2][0])*U))}S.computeBoundingSphere(),S.castShadow=!1,S.receiveShadow=!0,S.userData.noAO=!0,S.matrixAutoUpdate=!1,S.matrixWorldNeedsUpdate=!0,S.renderOrder=2,S.userData.instReady=!0,t.add(S),w[h]=S},T=0,R=NaN,L=NaN,P=NaN,y=!1;return{group:t,get count(){if(c<0){c=0;for(let h=0;h<o*o;h++)c+=l(h).length/6}return c},update(h,f,p=tt.perFrame*3){let x=ta.near;if(!T){let S=Math.max(-h,0,h-500),A=Math.max(-f,0,f-500),D=Math.max(Ne.sparseFrom,Ne.sparseIn*x);if(S*S+A*A>D*D)return 0}if(!y&&x===P&&Math.abs(h-R)<1&&Math.abs(f-L)<1)return 0;let v=0;for(let S=0;S<o*o&&v<p;S++){let A=S%o*i,D=Math.floor(S/o)*i,C=Math.max(A-h,0,h-A-i),U=Math.max(D-f,0,f-D-i),k=Math.hypot(C,U),W=ta.near,O=M[S],F=O;O===2?k>=Ne.sparseTo&&(F=+(k<Ne.sparseOut*W)):O===1?k<Ne.sparseFrom?F=2:k>=Ne.sparseOut*W&&(F=0):k<Ne.sparseFrom?F=2:k<Ne.sparseIn*W&&(F=1),F!==O&&(O>0!=F>0&&(T+=F>0?1:-1),I(S,F),v++)}return y=v>=p,y||(R=h,L=f,P=x),v},dispose(){t.removeFromParent();for(let h of w)h?.dispose();t.clear()}}}var bt=(a,e,t)=>{let o=Math.min(1,Math.max(0,(t-a)/(e-a)));return o*o*(3-2*o)},jl=ca.indexOf("asphalt"),Yl=ca.indexOf("gravel"),Zo=Co?(()=>{const a=[],e=(t,o,i,r=!1)=>ca.indexOf(t)>=0&&(a[ca.indexOf(t)]={s:o,k:i,farmSkip:r});return e("sand",[.05,0,0,.95],.9),e("shingle",[.05,0,.15,.8],.9),e("gravel_loose",[0,0,.1,.9],.9),e("track",[.2,.05,0,.75],.85,!0),e("dirt",[.25,.15,0,.6],.6,!0),e("marsh",[.35,.65,0,0],.8),e("rock",[0,0,1,0],.85),a[ca.indexOf("rock")]&&(a[ca.indexOf("rock")].flatOnly=!0),a})():null,Xl=Co;function Qo(a,e,t,o=null,i=0,r=a.nx*a.nz){let n=a.nx*a.nz,s=o?o.a:new Float32Array(4*n),l=o?o.b:new Float32Array(4*n);for(let c=i;c<r;c++){let u=c%a.nx,d=(c-u)/a.nx;if(a.mask[c]===jl){l[4*c]=1;continue}if(a.mask[c]===Yl&&Xl){s[4*c]=0,s[4*c+1]=0,s[4*c+2]=0,s[4*c+3]=1,l[4*c+1]=0,l[4*c+3]=0;continue}let m=e[0]+(a.xz?a.xz[2*c]:u*a.cell),g=e[2]+(a.xz?a.xz[2*c+1]:d*a.cell),_=a.normals[3*c+1],b=a.edge[c],w=bt(.77,.62,_),M=(1-bt(.5,2.2,b))*(1-w),I=t.density(m,g)*t.clearing(b)*(1-po(m,g)),T=I*(1-w)*(1-M),R=w*I*.5+T*.55;s[4*c]=Math.max(0,1-w-M-T),s[4*c+1]=T*.45,s[4*c+2]=w*(1-I*.5),s[4*c+3]=M,l[4*c+1]=R,a.cut&&(l[4*c+2]=bt(4,10,a.cut[c])*bt(.9,.75,_)*+(b>=1.5&&b<=45));let L=a.heights?bt(2050,2350,a.heights[c]):0;if(L>0){let f=s[4*c]*L;s[4*c]-=f,s[4*c+3]+=f*.65,s[4*c+2]+=f*.35,s[4*c+1]*=1-.6*L,l[4*c+1]*=1-.6*L}let P=po(m,g),y=P<1?_r(m,g):0;if(y>0){let f=s[4*c]*y,p=Ni(m,g),x=1-bt(.11,.19,p),v=bt(.11,.19,p)*(1-bt(.42,.52,p));s[4*c]-=f*(x+v),s[4*c+1]*=1-y,l[4*c+1]*=1-y,s[4*c+3]=s[4*c+3]*(1-y)+f*v,l[4*c]=Math.max(l[4*c],f*x)}if(P>0){for(let f=0;f<4;f++)s[4*c+f]*=1-P;l[4*c+1]*=1-P,l[4*c]=Math.max(l[4*c],P)}if(Or&&a.heights){let f=bt(.985,.996,_)*(1-I)*bt(6,14,b)*(1-y)*(1-P)*(1-bt(.12,.3,ti(m,g)))*bt(900,500,a.heights[c])*bt(.6,2,a.heights[c]);f>.01&&(f*=1-ai(m,g))>.01&&(f*=1-oi(m,g)),f>.01&&(Ti().nearWater?.(m,g,150)||[[0,0],[150,0],[-150,0],[0,150],[0,-150]].some(([p,x])=>{const v=ri(m+p,g+x);return v&&v.f>.5&&v.river?.shore!==void 0}))&&(f=0),l[4*c+3]=f>.01?f:0}let h=Zo&&Zo[a.mask[c]];if(h&&!(h.farmSkip&&l[4*c+3]>.3)&&!(h.farmSkip&&a.edge[c]<4)&&!(h.flatOnly&&_<.85)){const f=h.k;for(let p=0;p<4;p++)s[4*c+p]+=(h.s[p]-s[4*c+p])*f;l[4*c+1]*=1-f,l[4*c+3]*=1-f}}return{a:s,b:l}}var yo=[new ke(1,.44,.07),new ke(.86,.9,1),new ke(.86*8,.9*8,8),new ke(.86*.45,.9*.45,.45)],Ea=yo,Ft={height:7.82,reach:1.75},Jo={count:10,power:380,angle:1,penumbra:.5,range:36,ahead:30,far:320},Ir={radius:1.3,minPx:2.5,peak:.45,floor:.5,fade:Math.LN2/7e3},Ur=`
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
}`,Hr=`
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
}`;function Kl(){let a=[],e=[],t=[],o=[],i=(b,w,M,I,T,R)=>{for(let[L,P,y]of[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]]){let h=a.length/3,f=L===0?P===0?[0,1,0]:[1,0,0]:[0,1,0],p=[P*f[2]-y*f[1],y*f[0]-L*f[2],L*f[1]-P*f[0]];for(let[x,v]of[[-1,-1],[1,-1],[1,1],[-1,1]])a.push(I+(L+f[0]*x+p[0]*v)*b/2,T+(P+f[1]*x+p[1]*v)*w/2,R+(y+f[2]*x+p[2]*v)*M/2),e.push(L,P,y);t.push(h,h+1,h+2,h,h+2,h+3)}};i(.14,9,.14,0,3.5,0),i(1.9,.08,.08,.95,7.9,0),o.push([0,t.length,0]);let r=t.length;i(.6,.14,.26,Ft.reach,Ft.height,0),o.push([r,t.length-r,1]);let n=new dt;n.setAttribute("position",new Re(a,3)),n.setAttribute("normal",new Re(e,3)),n.setIndex(t);for(let[b,w,M]of o)n.addGroup(b,w,M);let s=new He({color:10132898,roughness:.5,metalness:.5}),l=Ea.map((b,w)=>{let M=new He({color:14606046,roughness:.3,emissive:b,emissiveIntensity:0});return M.name=`lampHead${w}`,M});s.name="lampPost";let c=Ir,u=new ka(1,1),d={uMinPx:{value:c.minPx},uPxAngle:{value:.001},uRadius:{value:c.radius},uFade:{value:c.fade},uFloor:{value:c.floor}},m=Ea.map((b,w)=>new vt({name:`lampGlow${w}`,vertexShader:Ur,fragmentShader:Hr,uniforms:{...d,uColor:{value:new ke}},transparent:!0,depthWrite:!1,blending:2})),g=0,_=0;return{geo:n,mats:l.map(b=>[s,b]),glowGeo:u,glows:m,view:d,get level(){return g},get gain(){return _},get lit(){return g>.2},setLights(b,w){g=b,_=w;for(let M of l)M.emissiveIntensity=b*w*.7;m.forEach((M,I)=>M.uniforms.uColor.value.copy(Ea[I]).multiplyScalar(b*w*c.peak))},setView(b,w){d.uPxAngle.value=2*Math.tan(da.degToRad(b)/2)/Math.max(1,w)},dispose(){n.dispose(),s.dispose();for(let b of l)b.dispose();u.dispose();for(let b of m)b.dispose()}}}function Fo(a,e){let t=new nt;t.name="lamps";let o=[],i=new at,r=new ha,n=new ne,s=new ne(1,1,1),l=new ne(0,1,0);for(let c of[0,1]){let u=a.filter(g=>+!!g[4]===c);if(!u.length)continue;let d=new ft(e.geo,e.mats[c],u.length),m=e.lit?new ft(e.glowGeo,e.glows[c],u.length):null;u.forEach(([g,_,b,w],M)=>{d.setMatrixAt(M,i.compose(n.set(g,_,b),r.setFromAxisAngle(l,w),s));let I=g+Math.cos(w)*Ft.reach,T=b-Math.sin(w)*Ft.reach;o.push(I,_+Ft.height-.15,T,c),m?.setMatrixAt(M,i.makeTranslation(I,_+Ft.height-.12,T))}),d.computeBoundingSphere(),d.castShadow=!0,d.receiveShadow=!0,d.name="lampPosts",t.add(d),m&&(m.computeBoundingSphere(),m.boundingSphere&&(m.boundingSphere.radius+=4),m.name="lampGlow",m.renderOrder=2,m.userData.noAO=!0,t.add(m))}return t.userData.heads=o,t}function er(a,e,t=Jo.count){let o=Jo,i=t,r=new nt;r.name="lampLights";let n=[];for(let g=0;g<i;g++){let _=new di(16777215,0,o.range,o.angle,o.penumbra,2);r.add(_,_.target),n.push(_)}a.add(r);let s=new Float64Array(i+1),l=new Float64Array(i+1),c=new Float64Array(i+1),u=new Float64Array(i+1),d=new Uint8Array(i+1),m=new ne;return{update(g,_){g.getWorldDirection(m);let b=Math.hypot(m.x,m.z)||1,w=g.position.x+m.x/b*o.ahead,M=g.position.y,I=g.position.z+m.z/b*o.ahead;s.fill(1/0);for(let L of _)for(let P=0;P<L.length;P+=4){let y=L[P]-w,h=L[P+1]-M,f=L[P+2]-I,p=y*y+h*h+f*f;if(p>=s[i])continue;let x=i;for(;x>0&&s[x-1]>p;)s[x]=s[x-1],l[x]=l[x-1],c[x]=c[x-1],u[x]=u[x-1],d[x]=d[x-1],x--;s[x]=p,l[x]=L[P],c[x]=L[P+1],u[x]=L[P+2],d[x]=L[P+3]}let T=Math.min(Math.sqrt(s[i]),o.far),R=e.level*e.gain*o.power;for(let L=0;L<i;L++){let P=n[L],y=Math.sqrt(s[L]);if(!(y<T)){P.intensity=0;continue}P.intensity=R*(1-da.smoothstep(y,T*.6,T)),P.position.set(l[L],c[L],u[L]),P.target.position.set(l[L],c[L]-8,u[L]),P.color.copy(Ea[d[L]])}},get active(){return n.filter(g=>g.intensity>0).length},dispose(){r.removeFromParent();for(let g of n)g.dispose()}}}function ql(a,e){let t=Math.floor(e.length/7),o={uNearTile:{value:new qe(-1e4,-1e4)},uNearMask:{value:0}},i=new vt({name:"farLights",vertexShader:Ur,fragmentShader:Hr,defines:{FAR_MASK:"",TILE:500 .toFixed(1),HALF:pt.toFixed(1)},uniforms:{...a.view,...o,uColor:{value:new ke(1,1,1).multiplyScalar(a.level*a.gain*Ir.peak)}},transparent:!0,depthWrite:!1,blending:2}),r=new ft(a.glowGeo,i,Math.max(1,t)),n=new at,s=new ke;for(let l=0;l<t;l++){let c=l*7,u=e[c+6];r.setMatrixAt(l,n.makeScale(u,u,u).setPosition(e[c],e[c+1],e[c+2])),r.setColorAt(l,s.setRGB(e[c+3],e[c+4],e[c+5]))}return r.count=t,r.frustumCulled=!1,r.renderOrder=2,r.name="farLights",r.userData.noAO=!0,{mesh:r,count:t,setNear(l,c,u){o.uNearTile.value.set(l,c),o.uNearMask.value=u},dispose(){r.removeFromParent(),r.dispose(),i.dispose()}}}var be={poleStep:38,poleOut:2.2,poleH:11.5,armH:10.3,sag:.6,poleFoot:1200,delStep:12,delCurv:1/250,hairTurn:2.4,hairWin:50,speedStep:1500,speedSpokeStep:1e3,lampStep:60,lampOut:1.2},Ee=()=>({p:[],n:[],u:[],i:[]});function Yt(a,e,t,o,i,r,n=0,s=0){for(let l=0;l<r;l++){let c=l/r*Math.PI*2,u=(l+1)/r*Math.PI*2,d=a.p.length/3;for(let[m,g,_]of[[c,e,o],[u,e,o],[u,t,i],[c,t,i]])a.p.push(n+Math.cos(m)*g,_,s+Math.sin(m)*g),a.n.push(Math.cos(m),0,Math.sin(m)),a.u.push(0,0);a.i.push(d,d+2,d+1,d,d+3,d+2)}}function yt(a,e,t,o,i,r,n){for(let[s,l,c]of[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]]){let u=a.p.length/3,d=s===0?l===0?[0,1,0]:[1,0,0]:[0,1,0],m=[l*d[2]-c*d[1],c*d[0]-s*d[2],s*d[1]-l*d[0]];for(let[g,_]of[[-1,-1],[1,-1],[1,1],[-1,1]])a.p.push(i+(s+d[0]*g+m[0]*_)*e/2,r+(l+d[1]*g+m[1]*_)*t/2,n+(c+d[2]*g+m[2]*_)*o/2),a.n.push(s,l,c),a.u.push(0,0);a.i.push(u,u+1,u+2,u,u+2,u+3)}}function ao(a,e,t,o,i,r=!1){let n=a.p.length/3,s=r?-1:1;a.p.push(0,o,i),a.n.push(0,0,s),a.u.push(.5,.5);for(let l=0;l<=t;l++){let c=l/t*Math.PI*2;a.p.push(Math.cos(c)*e,o+Math.sin(c)*e,i),a.n.push(0,0,s),a.u.push(0,0)}for(let l=0;l<t;l++)r?a.i.push(n,n+l+2,n+l+1):a.i.push(n,n+l+1,n+l+2)}function jt(a,e,t,o,i,r,n=!1){let s=a.p.length/3,l=n?-1:1;for(let[c,u,d,m]of[[-e/2,o,r[0],r[1]],[e/2,o,r[2],r[1]],[e/2,o+t,r[2],r[3]],[-e/2,o+t,r[0],r[3]]])a.p.push(n?-c:c,u,i),a.n.push(0,0,l),a.u.push(n?r[0]+r[2]-d:d,m);a.i.push(s,s+1,s+2,s,s+2,s+3)}function Be(a,e,t,o,i,r){let n=Math.cos(r),s=Math.sin(r),l=a.p.length/3;for(let c=0;c<e.p.length;c+=3){let u=e.p[c],d=e.p[c+2],m=e.n[c],g=e.n[c+2];a.p.push(t+u*n+d*s,o+e.p[c+1],i-u*s+d*n),a.n.push(m*n+g*s,e.n[c+1],-m*s+g*n)}for(let c=0;c<e.u.length;c++)a.u.push(e.u[c]);for(let c of e.i)a.i.push(l+c)}function zt(a,e,t,o,i){let r=t[0]-e[0],n=t[1]-e[1],s=t[2]-e[2],l=i[0]-e[0],c=i[1]-e[1],u=i[2]-e[2],d=n*u-s*c,m=s*l-r*u,g=r*c-n*l,_=Math.hypot(d,m,g)||1,b=a.p.length/3;d/=_,m/=_,g/=_;for(let w of[e,t,o,i])a.p.push(w[0],w[1],w[2]),a.n.push(d,m,g),a.u.push(0,0);a.i.push(b,b+1,b+2,b,b+2,b+3)}function oo(a,e,t,o,i,r){let n=[e.x,e.y+i,e.z],s=[e.x,e.y+r,e.z],l=[t.x,t.y+i,t.z],c=[t.x,t.y+r,t.z],u=[e.x+e.ox*o,e.y+i,e.z+e.oz*o],d=[e.x+e.ox*o,e.y+r,e.z+e.oz*o],m=[t.x+t.ox*o,t.y+i,t.z+t.oz*o],g=[t.x+t.ox*o,t.y+r,t.z+t.oz*o],_=l[0]-n[0],b=l[2]-n[2];_*e.oz-b*e.ox>0?(zt(a,n,l,c,s),zt(a,m,u,d,g),zt(a,s,c,g,d)):(zt(a,l,n,s,c),zt(a,u,m,g,d),zt(a,c,s,d,g))}var Wr='"Yu Gothic UI", "Meiryo", "Hiragino Sans", "Noto Sans JP", sans-serif',et={rows:64,px:512,rowPx:116,w:5.3,h:1.2,y:2.6,at:62,out:1.6},St={flat:60,bays:11,bayW:2.7,bayL:5.2,canopy:[14,7,4.6],canopyIn:10},tr={len:1.2,lift:.03},ro={rail:Li,post:{size:.5,top:1.4},shed:ki},rt=(a,e)=>Math.atan2(a,e),Ut=8,At=a=>{let e=a%Ut,t=Math.floor(a/Ut);return[e/Ut+.004,1-(t+1)/Ut+.004,(e+1)/Ut-.004,1-t/Ut-.004]};function Zl(){let a=1024,e=new OffscreenCanvas(a,a),t=e.getContext("2d"),o=a/Ut;t.fillStyle="#8c8f93",t.fillRect(0,0,a,a);let i=n=>[n%Ut*o,Math.floor(n/Ut)*o];for(let[n,s]of[[0,"40"],[1,"50"]]){let[l,c]=i(n);t.fillStyle="#ffffff",t.beginPath(),t.arc(l+o/2,c+o/2,o*.47,0,Math.PI*2),t.fill(),t.strokeStyle="#d0262c",t.lineWidth=o*.11,t.beginPath(),t.arc(l+o/2,c+o/2,o*.4,0,Math.PI*2),t.stroke(),t.fillStyle="#1a3f9a",t.font=`bold ${o*.42}px Arial`,t.textAlign="center",t.textBaseline="middle",t.fillText(s,l+o/2,c+o*.53)}{let[n,s]=i(4),l=n+o/2,c=s+o/2,u=o*.47;t.fillStyle="#111",t.beginPath(),t.moveTo(l,c-u),t.lineTo(l+u,c),t.lineTo(l,c+u),t.lineTo(l-u,c),t.closePath(),t.fill(),t.fillStyle="#f2c81d",t.beginPath(),t.moveTo(l,c-u*.86),t.lineTo(l+u*.86,c),t.lineTo(l,c+u*.86),t.lineTo(l-u*.86,c),t.closePath(),t.fill(),t.fillStyle="#111",t.textAlign="center",t.textBaseline="middle",t.font=`bold ${o*.17}px ${Wr}`,t.fillText("落石",l,c-o*.09),t.fillText("注意",l,c+o*.1)}for(let[n,s]of[[2,1],[3,-1]]){let[l,c]=i(n),u=l+o/2,d=c+o/2;t.save(),t.translate(u,d),t.rotate(Math.PI/4),t.fillStyle="#111",t.fillRect(-42.24,-42.24,o*.66,o*.66),t.fillStyle="#f2c81d",t.fillRect(-38.4,-38.4,o*.6,o*.6),t.restore(),t.strokeStyle="#111",t.lineWidth=o*.07,t.beginPath(),t.moveTo(u-s*o*.12,d+o*.22),t.lineTo(u-s*o*.12,d-o*.02),t.quadraticCurveTo(u-s*o*.12,d-o*.14,u+s*o*.04,d-o*.14),t.stroke(),t.fillStyle="#111",t.beginPath(),t.moveTo(u+s*o*.18,d-o*.14),t.lineTo(u+s*o*.04,d-o*.25),t.lineTo(u+s*o*.04,d-o*.03),t.fill()}{let[n,s]=i(5);t.fillStyle="#f2c81d",t.fillRect(n+6,s+6,o-12,o-12),t.fillStyle="#111";for(let l of[.3,.58]){let c=n+o*l;t.beginPath(),t.moveTo(c,s+o*.18),t.lineTo(c+o*.2,s+o*.5),t.lineTo(c,s+o*.82),t.lineTo(c-o*.1,s+o*.82),t.lineTo(c+o*.1,s+o*.5),t.lineTo(c-o*.1,s+o*.18),t.closePath(),t.fill()}}{let[n,s]=i(6);for(let l=0;l<5;l++)t.fillStyle=l%2?"#f4f4f0":"#d3262b",t.fillRect(n+8,s+l*o/5,o-16,o/5);t.fillStyle="#8c8f93",t.beginPath(),t.moveTo(n,s+o*.55),t.lineTo(n+o/2-2,s+o),t.lineTo(n,s+o),t.fill(),t.beginPath(),t.moveTo(n+o,s+o*.55),t.lineTo(n+o/2+2,s+o),t.lineTo(n+o,s+o),t.fill()}for(let n=8;n<64;n++){let[s,l]=i(n);t.fillStyle="#1d4f9c",t.fillRect(s+4,l+o*.2,120,o*.6),t.strokeStyle="#ffffff",t.lineWidth=4,t.strokeRect(s+9,l+o*.2+5,110,o*.6-10),t.fillStyle="#ffffff",t.font=`bold ${o*.3}px Arial`,t.textAlign="center",t.textBaseline="middle",t.fillText(`No.${n-7}`,s+o/2,l+o/2)}let r=new Tt(e);return r.colorSpace=_t,r.anisotropy=4,r}var Gr={concrete:!0,metal:!0,orange:!0,white:!1,mirror:!1,signs:!0,checker:!1,boards:!0};function Br(){let a=Ee(),e=Ee(),t=Ee(),o=Ee(),i=Ee(),r=Ee(),n=Ee();Yt(a,.19,.12,-4,be.poleH,8),yt(e,2.2,.1,.1,0,be.armH,0);for(let w of[-.9,0,.9])Yt(e,.04,.03,be.armH+.05,be.armH+.22,5,w,0);Yt(e,.26,.26,7.6,8.5,8,0,.3),Yt(t,.05,.05,-.5,3,6),ao(t,.47,16,3.25,.05,!0),ao(o,.42,16,3.25,.07),yt(i,.08,1.2,.08,0,.4,0),ao(r,.05,10,.9,.045),Yt(n,.04,.04,-.5,2.2,6);let s=Zl(),l=new OffscreenCanvas(64,16),c=l.getContext("2d");for(let w=0;w<2;w++)for(let M=0;M<8;M++)c.fillStyle=(M+w)%2?"#f2f2f2":"#15171a",c.fillRect(M*8,w*8,8,8);let u=new Tt(l);u.wrapS=Dt,u.magFilter=fo,u.colorSpace=_t;let d=new OffscreenCanvas(et.px,et.rows*et.rowPx),m=d.getContext("2d");m.fillStyle="#1d4f9c",m.fillRect(0,0,d.width,d.height);let g=new Tt(d);g.colorSpace=_t,g.anisotropy=4;let _=new Map,b={checker:new He({map:u,roughness:.85,side:2,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}),boards:new He({map:g,roughness:.5}),concrete:new He({color:9407878,roughness:.95}),metal:new He({color:9277590,roughness:.5,metalness:.6}),orange:new He({color:13134124,roughness:.7}),white:new He({color:16053488,roughness:.85}),mirror:new He({color:16777215,roughness:.04,metalness:1}),signs:new He({map:s,roughness:.45}),wire:new li({color:1776928})};return b.concrete.onBeforeCompile=w=>{w.vertexShader=w.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vCnP;
varying vec3 vCnN;`).replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
	vCnP = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;
	vCnN = normalize( mat3( modelMatrix ) * objectNormal );`),w.fragmentShader=w.fragmentShader.replace("#include <common>",`#include <common>
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
	}`)},b.concrete.customProgramCacheKey=()=>"roadsideConcrete",Object.entries(b).forEach(([w,M])=>{M.name=`roadside_${w}`}),{tpl:{pole:a,arm:e,mirror:t,mirrorFace:o,del:i,delRef:r,signPole:n},mats:b,boardUV(w,M=""){let I=w.cl,T=1/0,R=-1/0;if(!_.has(w.id))for(let L=0;L<I.n;L+=5){let P=I.pos[3*L+1];P<T&&(T=P),P>R&&(R=P)}return this.boardText(w.id,String(w.data.name),`${(I.length/1e3).toFixed(1).replace(".",",")} км · ${Math.round(R-T)} м`,M)},boardText(w,M,I="",T=""){let R=_.get(w);if(R===void 0){R=_.size%et.rows,_.set(w,R);let L=R*et.rowPx,P=et.rowPx,y=et.px;m.fillStyle="#1d4f9c",m.fillRect(0,L,y,P),m.strokeStyle="#ffffff",m.lineWidth=5,m.strokeRect(6,L+6,y-12,P-12),m.fillStyle="#ffffff",m.textBaseline="middle",m.textAlign="left";let h=I?y*.56:y-48;T?(m.font=`bold ${Math.round(P*.44)}px ${Wr}`,m.fillText(T,24,L+P*.36,h),m.font=`${Math.round(P*.24)}px "Segoe UI", Arial, sans-serif`,m.fillText(M,26,L+P*.76,h)):(m.font=`bold ${Math.round(P*.52)}px "Segoe UI", Arial, sans-serif`,m.fillText(M,24,L+P/2+2,h)),m.textAlign="right",m.font=`${Math.round(P*.3)}px "Segoe UI", Arial, sans-serif`,I&&m.fillText(I,y-22,L+P/2+2,y*.36),g.needsUpdate=!0}return[1-(R+1)/et.rows,1-R/et.rows]},dispose(){u.dispose(),g.dispose(),s.dispose();for(let w of Object.values(b))w.dispose()}}}function So(a){let e=a.cl,t=e.n,o=Math.max(2,Math.round(be.hairWin/e.step/2)),i=[];for(let r=o;r<t-o;r++){let n=0;for(let l=r-o;l<=r+o;l++)n+=e.curvature[l]*e.step;if(Math.abs(n)<be.hairTurn)continue;let s=r;for(let l=r-o;l<=r+o;l++)Math.abs(e.curvature[l])>Math.abs(e.curvature[s])&&(s=l);i.length&&Math.abs(i[i.length-1].row-s)*e.step<80||i.push({row:s,right:n>0})}return i.sort((r,n)=>n.row-r.row),i.map((r,n)=>({...r,no:n+1}))}var ar=new WeakMap;function Vr(a){let e=ar.get(a.graph);if(e)return e;let{graph:t,world:o}=a,i=t.ring.cl;return e=t.nodes.filter(r=>r.kind==="ringx").map(r=>{let n=1/0,s=0;for(let c=0;c<i.n;c++){let u=Math.hypot(i.pos[3*c]-r.x,i.pos[3*c+2]-r.z);u<n&&(n=u,s=c)}let l=o.districts[r.district];return{id:l.id,name:l.name,nameJa:l.nameJa||"",s:i.s[s],outRight:i.right[3*s]*r.x+i.right[3*s+2]*r.z>0}}),ar.set(t,e),e}var Ct={course:(a,e,t)=>e.boardUV(t,a.world.courses.find(o=>o.id===t.id)?.nameJa||""),view:a=>a.boardText("viewpoint","Смотровая","","展望台"),spoke:(a,e,t)=>{let o=a.world.districts[t.district];return e.boardText("to_"+o.id,o.name,`${(t.cl.length/1e3).toFixed(1).replace(".",",")} км`,o.nameJa||"")},parking:a=>a.boardText("parking","Стоянка · заправка","","P 駐車場"),ringA:(a,e)=>{let t=e.nameJa||e.name;return a.boardText("ring_a_"+e.id,e.name,"",e.outRight?t+" →":"← "+t)},ringB:(a,e)=>{let t=e.nameJa||e.name;return a.boardText("ring_b_"+e.id,e.name,"",e.outRight?"← "+t:t+" →")}};function Ql(a,e){for(let t of a.graph.roads){let o=t.data.kind;if(o==="course")Ct.course(a,e,t),t.view&&t.view.kind==="view"&&Ct.view(e);else if(o==="spoke")Ct.spoke(a,e,t),t.view&&Ct.parking(e);else if(o==="ring")for(let i of Vr(a))Ct.ringA(e,i),Ct.ringB(e,i)}}function bo(a,e,t,o=0,i=0){let{cl:r,data:n}=a,s=Ri(n,r,e),l=t>0?s.d.length-1:0,c=3*e,u=Math.hypot(r.right[c],r.right[c+2])||1,d=r.right[c]/u,m=r.right[c+2]/u,g=s.d[l]+(a.view&&a.view.sign===t?t*a.view.extra[e]:0);return{x:r.pos[c]+r.right[c]*g-o,y:r.pos[c+1]+r.right[c+1]*g+r.up[c+1]*s.h[l],z:r.pos[c+2]+r.right[c+2]*g-i,ox:t*d,oz:t*m,tx:r.tan[c],tz:r.tan[c+2]}}var Je=(a,e)=>{let t=Math.round(e/a.step);return a.closed?(t%a.n+a.n)%a.n:Math.min(a.n-1,Math.max(0,t))};function Jl(a,e){let t=[],o=be.lampOut-Ft.reach,i=r=>t.push(r.x+r.ox*o,r.y+Ft.height-.15,r.z+r.oz*o);for(let r of a.graph.roads){let n=r.cl,s=n.length;if(r.data.kind==="ring"||r.data.kind==="spoke"){for(let c=0;c*be.lampStep<s;c++){let u=c*be.lampStep;!n.closed&&(u<30||u>s-30)||i(bo(r,Je(n,u),-1))}continue}let l=e.get(r.idx);l||e.set(r.idx,l=So(r));for(let c of l)i(bo(r,Je(n,n.s[c.row]-8),c.right?-1:1))}return t}function*e0(a,e,t,o,i=null){let r=[],{graph:n,index:s}=a,[l,,c]=e.origin,u=t.tpl,d={concrete:Ee(),metal:Ee(),orange:Ee(),white:Ee(),mirror:Ee(),signs:Ee(),checker:Ee(),boards:Ee()},m=[],g=[],_=a.height?.roadHit?a.height:null,b=l,w=c,M=-1,I=(y,h,f,p=NaN)=>!!_&&_.roadHit(y+b,h+w,f,M,p),T=(y,h,f=be.lampOut)=>{let p=y.x+y.ox*f,x=y.z+y.oz*f;I(p,x,y.y)||g.push([p,y.y,x,Math.atan2(y.oz,-y.ox),h])},R=(y,h,f)=>bo(y,h,f,l,c);for(let y of s.pieces.get(e.id)||[]){let h=n.roads[y.road],f=h.cl,p=h.data.kind,x=f.length,v=O=>O*f.step,S=(O,F,H,N)=>{let G=N[0],z=N[1],j=Je(f,f.closed?(O%x+x)%x:O);if(j<y.from||j>=y.to)return;let E=R(h,j,F),$=E.x+E.ox*et.out,oe=E.z+E.oz*et.out,J=rt(E.tx*H,E.tz*H);if(I($,oe,E.y,O))return;let te=Ee(),ie=Ee(),ce=Ee();jt(te,et.w,et.h,et.y,.06,[0,G,1,z]),jt(ie,et.w,et.h,et.y,.03,At(7),!0);for(let fe of[-5.3/2+.3,et.w/2-.3])Yt(ce,.05,.05,-.5,et.y+et.h,6,fe,0);Be(d.boards,te,$,E.y,oe,J),Be(d.signs,ie,$,E.y,oe,J),Be(d.metal,ce,$,E.y,oe,J)},A=be.poleStep,D=p==="course"?-1:1;M=h.idx;for(let O=Math.ceil(v(y.from)/A);O*A<v(y.to);O++){let F=O*A;if(p==="link"||p==="circuit"||p==="course"&&F<x-be.poleFoot||!f.closed&&(F<25||F>x-25))continue;let H=R(h,Je(f,F),D),N=H.x+H.ox*be.poleOut,G=H.z+H.oz*be.poleOut,z=rt(H.tx,H.tz);if(I(N,G,H.y,F))continue;Be(d.concrete,u.pole,N,H.y,G,z),Be(d.metal,u.arm,N,H.y,G,z);let j=F+A,E=R(h,Je(f,j),D);if((p==="course"?j<=x-25:f.closed||j<=x-25)&&!I(E.x+E.ox*be.poleOut,E.z+E.oz*be.poleOut,E.y,j)){let $=E,oe=$.x+$.ox*be.poleOut,J=$.z+$.oz*be.poleOut,te=rt($.tx,$.tz),ie=Math.cos(z),ce=Math.sin(z),fe=Math.cos(te),ue=Math.sin(te);for(let ye of[-.9,0,.9]){let Me=N+ye*ie,ze=G-ye*ce,We=H.y+be.armH+.22,xe=oe+ye*fe,we=J-ye*ue,Ue=$.y+be.armH+.22;for(let $e=0;$e<8;$e++){let B=$e/8,X=($e+1)/8,Z=ae=>be.sag*4*ae*(1-ae);m.push(Me+(xe-Me)*B,We+(Ue-We)*B-Z(B),ze+(we-ze)*B,Me+(xe-Me)*X,We+(Ue-We)*X-Z(X),ze+(we-ze)*X)}}}}if(yield,p==="ring"||p==="spoke")for(let O=Math.ceil(v(y.from)/be.lampStep);O*be.lampStep<v(y.to);O++){let F=O*be.lampStep;!f.closed&&(F<30||F>x-30)||T(R(h,Je(f,F),-D),0)}for(let O=Math.ceil(v(y.from)/be.delStep);p!=="circuit"&&O*be.delStep<v(y.to);O++){let F=O*be.delStep;if(!f.closed&&(F<30||F>x-30))continue;let H=Je(f,F),N=f.curvature[H];if(Math.abs(N)<be.delCurv)continue;let G=R(h,H,N>0?-1:1),z=G.x+G.ox*.45,j=G.z+G.oz*.45,E=rt(-G.ox,-G.oz);I(z,j,G.y,F)||(Be(d.white,u.del,z,G.y,j,E),Be(d.orange,u.delRef,z,G.y,j,E))}yield;let C=p==="course"?be.speedStep:be.speedSpokeStep,U=At(p==="course"?0:1);for(let O=Math.ceil((v(y.from)-200)/C);p!=="circuit"&&200+O*C<v(y.to);O++){let F=200+O*C;if(F<v(y.from)||!f.closed&&F>x-60)continue;let H=R(h,Je(f,F),1),N=H.x+H.ox*.9,G=H.z+H.oz*.9,z=rt(-H.tx,-H.tz);I(N,G,H.y,F)||Aa(d,u,N,H.y,G,z,U,.6)}if(p==="course"||p==="circuit"){let O=f.width[0]/2,F=(h.data.crossSection.crownPercent||0)/100;for(let N of[h.data.start.s,h.data.finish.s]){let G=Je(f,N);if(G<y.from||G>=y.to)continue;let z=(E,$,oe)=>{let J=3*E,te=-Math.abs($)*F+tr.lift;return[f.pos[J]+f.right[J]*$+f.up[J]*te-l,f.pos[J+1]+f.right[J+1]*$+f.up[J+1]*te,f.pos[J+2]+f.right[J+2]*$+f.up[J+2]*te-c,oe]},j=Math.min(f.n-1,G+Math.max(1,Math.round(tr.len/f.step)));for(let[E,$]of[[-O,0],[0,O]]){let oe=z(G,E,E/2),J=z(G,$,$/2),te=z(j,$,$/2),ie=z(j,E,E/2),ce=d.checker.p.length/3;[oe,J,te,ie].forEach((fe,ue)=>{d.checker.p.push(fe[0],fe[1],fe[2]),d.checker.n.push(0,1,0),d.checker.u.push(fe[3],ue<2?0:1)}),d.checker.i.push(ce,ce+2,ce+1,ce,ce+3,ce+2)}}for(let[N,G,z]of[[et.at,1,-1],[x-et.at,-1,1]])S(N,G,z,Ct.course(a,t,h));if(h.view&&h.view.kind==="view"){let N=h.view,G=Ct.view(t);S(N.sFrom-80,N.sign,-1,G),S(N.sTo+80,N.sign,1,G)}let H=a.height.walls[h.idx];if(H)for(let[N,G]of[[1,-1],[2,1]]){let z=-1/0;for(let j=Math.max(1,y.from);j<y.to;j++){if(!(H.flags[j]&N)||H.flags[j-1]&N)continue;let E=j;for(;E+1<f.n&&H.flags[E+1]&N;)E++;if(!(E-j<30||f.s[j]-z<400)){z=f.s[j];for(let[$,oe]of[[j-10,-1],[E+10,1]]){if($<y.from||$>=y.to)continue;let J=R(h,$,G),te=J.x+J.ox*.9,ie=J.z+J.oz*.9;Aa(d,u,te,J.y,ie,rt(J.tx*oe,J.tz*oe),At(4),.7)}}}}}if(yield,p==="spoke"&&(S(90,1,-1,Ct.spoke(a,t,h)),h.view&&S(h.view.sFrom-70,h.view.sign,-1,Ct.parking(t))),p==="ring")for(let O of Vr(a))S(O.s-120,1,-1,Ct.ringA(t,O)),S(O.s+120,-1,1,Ct.ringB(t,O));if(h.view&&h.view.kind==="parking"){let O=h.view,F=O.s-St.flat/2,H=G=>{let z=Je(f,G);return z>=y.from&&z<y.to?R(h,z,O.sign):null};for(let G=0;G<=St.bays;G++){let z=H(F+2+G*St.bayW);if(!z)continue;let j=Ee();yt(j,.12,.02,St.bayL,0,.02,0),Be(d.white,j,z.x-z.ox*(1.2+St.bayL/2),z.y,z.z-z.oz*(1.2+St.bayL/2),rt(z.ox,z.oz))}for(let G of[F+12,F+St.flat-8]){let z=H(G);z&&T(z,1)}let N=H(F+St.flat-St.canopy[0]/2-3);if(N){let G=rt(N.ox,N.oz),z=N.x-N.ox*St.canopyIn,j=N.z-N.oz*St.canopyIn,E=Ee(),$=Ee(),oe=Ee(),J=Ee(),te=Ee(),[ie,ce,fe]=St.canopy;yt(E,ie,.35,ce,0,fe+.175,0),yt($,ie+.1,.5,ce+.1,0,fe+.2,0);for(let ue of[-ie/2+1.2,ie/2-1.2])yt(oe,.35,fe,.35,ue,fe/2,0),yt(J,.9,1.5,.5,ue*.45,.85,0),yt(oe,2.6,.2,1.2,ue*.45,.1,0);for(let ue of[1.6,2.6,3.6]){let ye=St.canopyIn-5,Me=Math.cos(G),ze=Math.sin(G);r.push(z+ue*Me+ye*ze,N.y,j-ue*ze+ye*Me,G+Math.PI)}yt(te,9,3.2,4,0,1.6,St.canopyIn-2.6),Be(d.white,E,z,N.y,j,G),Be(d.orange,$,z,N.y,j,G),Be(d.metal,oe,z,N.y,j,G),Be(d.orange,J,z,N.y,j,G),Be(d.concrete,te,z,N.y,j,G)}}if(h.view&&h.view.kind==="view"){let O=h.view;for(let F of[-5,5]){let H=Je(f,O.s+F);if(H<y.from||H>=y.to)continue;let N=R(h,H,O.sign),G=N.x-N.ox*1.3,z=N.z-N.oz*1.3,j=rt(N.ox,N.oz),E=Ee();yt(E,1.8,.07,.42,0,.45,0),yt(E,1.8,.3,.06,0,.72,-.2);for(let $ of[-.75,.75])yt(E,.08,.45,.4,$,.22,0);Be(d.concrete,E,G,N.y,z,j)}for(let F of[11,12]){let H=Je(f,O.s+F);if(H<y.from||H>=y.to)continue;let N=R(h,H,O.sign);r.push(N.x-N.ox*2.4,N.y,N.z-N.oz*2.4,rt(N.ox,N.oz)+Math.PI)}}yield;for(let O of(h.data.structures||[]).filter(F=>F.type==="viaduct"||F.type==="tunnel"||p==="course")){let F=Je(f,O.sFrom),H=Je(f,O.sTo),N=Math.max(y.from,F),G=Math.min(y.to,H);if(G<=N)continue;let z=(E,$,oe)=>{let J=R(h,E,$);return{x:J.x+J.ox*oe,y:J.y,z:J.z+J.oz*oe,ox:J.ox,oz:J.oz}},j=O.type==="viaduct";if(O.type==="bridge"||j){let E=j?{out:.75,skirt:2.2,thick:.3,top:1.1,ext:0}:ro.rail,$=ro.post;for(let te=N;te<G;te+=2){let ie=Math.min(G,te+2),ce=z(te,-1,E.out),fe=z(te,1,E.out),ue=z(ie,-1,E.out),ye=z(ie,1,E.out),Me=ze=>[ze.x,ze.y-E.skirt,ze.z];zt(d.concrete,Me(ce),Me(ue),Me(ye),Me(fe))}for(let te of Ai(h,y.from,y.to,(ie,ce)=>Ma(e.terrain,ie-l,ce-c))){let ie=Ee(),ce=te.yTop-te.yBase;yt(ie,te.size||ko.size,ce,te.size||ko.size,0,-ce/2,0),Be(d.concrete,ie,te.x-l,te.yTop,te.z-c,te.yaw)}let oe=Math.max(y.from,F-Math.round(E.ext/f.step)),J=Math.min(y.to,H+Math.round(E.ext/f.step));for(let te of[-1,1]){for(let ie=oe;ie<J;ie+=2)f.open&&(f.open[ie]|f.open[Math.min(J,ie+2)])&(te>0?2:1)||oo(d.concrete,z(ie,te,E.out),z(Math.min(J,ie+2),te,E.out),E.thick,-E.skirt,E.top);for(let ie of[F-Math.round(E.ext/f.step),H+Math.round(E.ext/f.step)]){if(ie<y.from||ie>y.to)continue;let ce=R(h,ie,te),fe=Ee();yt(fe,$.size,$.top+E.skirt,$.size,0,($.top-E.skirt)/2,0),Be(d.concrete,fe,ce.x+ce.ox*(E.out+E.thick/2),ce.y,ce.z+ce.oz*(E.out+E.thick/2),rt(ce.tx,ce.tz))}}}else{let E=ro.shed;for(let $=N;$<G;$+=E.step){if(f.open&&(f.open[$]|f.open[Math.min(G,$+E.step)])&16)continue;let oe=Math.min(G,$+E.step),J=z($,-1,E.out),te=z(oe,-1,E.out),ie=z($,1,E.out),ce=z(oe,1,E.out);oo(d.concrete,J,te,E.thick,-.5,E.top+E.roof),oo(d.concrete,ie,ce,E.thick,-.5,E.top+E.roof);let fe=(ue,ye)=>[ue.x,ue.y+ye,ue.z];zt(d.concrete,fe(J,E.top),fe(ie,E.top),fe(ce,E.top),fe(te,E.top)),zt(d.concrete,fe(J,E.top+E.roof),fe(te,E.top+E.roof),fe(ce,E.top+E.roof),fe(ie,E.top+E.roof))}for(let[$,oe]of[[F,1],[H,-1]]){if($<y.from||$>y.to)continue;let J=z($,-1,E.out),te=z($,1,E.out),ie=(fe,ue,ye=0)=>[fe.x+fe.ox*ye,fe.y+ue,fe.z+fe.oz*ye],ce=(fe,ue,ye,Me)=>oe>0?zt(d.concrete,fe,ue,ye,Me):zt(d.concrete,ue,fe,Me,ye);ce(ie(J,-.5,E.thick),ie(J,-.5),ie(J,E.top+E.roof),ie(J,E.top+E.roof,E.thick)),ce(ie(te,-.5),ie(te,-.5,E.thick),ie(te,E.top+E.roof,E.thick),ie(te,E.top+E.roof)),ce(ie(J,E.top),ie(te,E.top),ie(te,E.top+E.roof),ie(J,E.top+E.roof))}}}let k=h.data.scenery?.roadside,W=(O,F)=>{for(let H of h.data.crossSection?.sidewalks||[])if((H.side===F||H.side==="both")&&O>=H.sFrom&&O<=H.sTo)return H.width;return 0};if(k)for(let O=Math.ceil(v(y.from)/A);O*A<v(y.to);O++){let F=O*A;if(F<25||F>x-25||(h.data.structures||[]).some($=>$.type==="tunnel"&&F>$.sFrom-10&&F<$.sTo+10))continue;let H=R(h,Je(f,F),1),N=rt(H.tx,H.tz),G=W(F,"right"),z=W(F,"left"),j=G>0?-(G+.25)+.6:be.poleOut,E=G>0?H.y+.17:H.y;I(H.x+H.ox*j,H.z+H.oz*j,E,F)||(Be(d.concrete,u.pole,H.x+H.ox*j,E,H.z+H.oz*j,N),Be(d.metal,u.arm,H.x+H.ox*j,E,H.z+H.oz*j,N)),(k==="town"||z>0)&&(O%2==0||/^st_/.test(h.id)&&f.width[Je(f,F)]>=9)&&T(R(h,Je(f,F),-1),0,z>0?-(z+.25)+.6:be.lampOut)}if((p==="course"||p==="link")&&!/^st_/.test(h.id)){let O=(H,N)=>{let G=Je(f,H);if(G<y.from||G>=y.to||H<20||H>x-20)return;let z=R(h,G,N);if(I(z.x+z.ox*.75,z.z+z.oz*.75,z.y,H))return;let j=Ee();Yt(j,.035,.035,-.4,1.35,6,0,-.04),Be(d.metal,j,z.x+z.ox*.75,z.y,z.z+z.oz*.75,rt(-z.ox,-z.oz));let E=Ee();jt(E,.55,.72,.62,0,At(5),N>0),jt(E,.55,.72,.62,-.02,At(7),N<0),Be(d.signs,E,z.x+z.ox*.75,z.y,z.z+z.oz*.75,rt(-z.ox,-z.oz))},F=o.get(h.idx);F||o.set(h.idx,F=So(h));for(let H of F)for(let N=-2;N<=2;N++)O(f.s[H.row]+N*7,H.right?-1:1);for(let H=Math.ceil(v(y.from)/55);H*55<v(y.to);H++){let N=H*55,G=f.curvature[Je(f,N)];if(!(Math.abs(G)<1/45||F.some(z=>Math.abs(f.s[z.row]-N)<60)))for(let z=-1;z<=1;z++)O(N+z*7,G>0?-1:1)}for(let H=Math.ceil(v(y.from)/42);H*42<v(y.to);H++){let N=H*42,G=Je(f,N);if(N<30||N>x-30||f.pos[3*G+1]<(h.data.region?1100:420))continue;let z=R(h,G,1);if(I(z.x+z.ox*.9,z.z+z.oz*.9,z.y,N))continue;let j=Ee();Yt(j,.04,.04,-.4,4.6,6,0,0),yt(j,.06,.06,1.1,0,4.55,-.5),Be(d.white,j,z.x+z.ox*.9,z.y,z.z+z.oz*.9,rt(-z.ox,-z.oz));let E=Ee();jt(E,.32,.9,3.7,-1,At(6)),jt(E,.32,.9,3.7,-1.02,At(6),!0),Be(d.signs,E,z.x+z.ox*.9,z.y,z.z+z.oz*.9,rt(-z.ox,-z.oz)+Math.PI/2)}}if(yield,p==="course"){let O=o.get(h.idx);O||o.set(h.idx,O=So(h));for(let F of O){if(F.row<y.from||F.row>=y.to)continue;let H=F.right?-1:1,N=R(h,F.row,H),G=N.x+N.ox*1.6,z=N.z+N.oz*1.6,j=rt(-N.ox,-N.oz);Be(d.orange,u.mirror,G,N.y,z,j),Be(d.mirror,u.mirrorFace,G,N.y,z,j),T(R(h,Je(f,f.s[F.row]-8),H),0);let E=f.s[F.row]+35;if(E<x-30){let $=R(h,Je(f,E),-1),oe=rt($.tx,$.tz);Aa(d,u,$.x+$.ox*.9,$.y,$.z+$.oz*.9,oe,At(F.right?3:2),.75),F.no<=56&&Aa(d,u,$.x+$.ox*.9-$.tx*3,$.y,$.z+$.oz*.9-$.tz*3,oe,At(7+F.no),.75,1.35)}}}yield}let L=new nt;L.name="roadside";let P=(y,h,f)=>{if(!y.i.length)return;let p=new dt;p.setAttribute("position",new Re(y.p,3)),p.setAttribute("normal",new Re(y.n,3)),p.setAttribute("uv",new Re(y.u,2)),p.setIndex(y.i),p.computeBoundingSphere();let x=new ct(p,h);x.castShadow=f,x.receiveShadow=!0,L.add(x)};for(let[y,h]of Object.entries(Gr))P(d[y],t.mats[y],h);if(r.length&&t.vend){let y=new Kr(t.vend.geo,t.vend.mats,r.length/4),h=new at;for(let f=0;f<r.length;f+=4)y.setMatrixAt(f/4,h.makeRotationY(r[f+3]).setPosition(r[f],r[f+1],r[f+2]));y.castShadow=!0,y.receiveShadow=!0,y.name="roadVending",y.computeBoundingSphere(),L.add(y)}return m.length&&(new dt,L.add(Ba(m))),i&&g.length&&L.add(Fo(g,i)),L}function Aa(a,e,t,o,i,r,n,s,l=0){Be(a.metal,e.signPole,t,o+l,i,r);let c=Ee();jt(c,s,s,2+l,.05,n),jt(c,s,s,2+l,.03,At(7),!0),Be(a.signs,c,t,o,i,r)}function or(a){a.removeFromParent(),a.traverse(e=>{let t=e;t.geometry&&t.geometry.dispose()}),a.clear()}var t0=`
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
`,a0=`
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
// до отрезка a–b (велосипед, 2026-10-24)
float fSeg( vec2 p, vec2 a, vec2 b ) { vec2 d = b - a; return length( p - a - d * clamp( dot( p - a, d ) / dot( d, d ), 0.0, 1.0 ) ); }
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
`,o0=`
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
		else if ( kind == 5.0 || kind == 12.0 || kind == 57.0 || kind == 58.0 || kind == 59.0 ) st = 4.0;   // 57 вокзал, 58 больница, 59 административное (2026-10-25)
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
				// уличные мелочи (2026-10-24): столб кривого зеркала, зеркало, знак «止まれ», почтовый ящик, сетка мусорной площадки
				else if ( kind == 51.0 ) col = vec3( 0.82, 0.33, 0.06 ) * ( 0.9 + 0.1 * tDet.r );
				else if ( kind == 52.0 ) {                                   // カーブミラー: круглое выпуклое зеркало в оранжевой оправе
					col = vec3( 0.82, 0.33, 0.06 );
					if ( an.z > 0.5 && length( vec2( u2, vFacLocal.y ) ) < min( hx, hy ) - 0.04 ) { col = mix( vec3( 0.55, 0.62, 0.7 ), vec3( 0.3, 0.32, 0.3 ), smoothstep( -hy, hy, -vFacLocal.y ) ); fRough = 0.06; fMetal = 0.8; }
				} else if ( kind == 53.0 ) {                                 // 止まれ: перевёрнутый красный треугольник с белой каймой
					float tt = ( vFacLocal.y + hy ) / ( 2.0 * hy ), ex = hx * tt - abs( u2 );
					if ( ex < 0.0 ) discard;
					col = an.z > 0.5 && ex > 0.06 && vFacLocal.y < hy - 0.06 ? vec3( 0.72, 0.04, 0.04 ) : vec3( 0.82, 0.82, 0.8 );
				} else if ( kind == 54.0 ) {                                 // почтовый ящик: красный, щель под крышкой
					col = vec3( 0.7, 0.06, 0.05 ) * ( 0.9 + 0.1 * tDet.r );
					if ( an.z > 0.5 && abs( vFacLocal.y - hy + 0.28 ) < 0.03 && abs( u2 ) < hx - 0.08 ) col = vec3( 0.04 );
					if ( topF ) col *= 0.75;
				} else if ( kind == 55.0 ) {                                 // мусорная площадка: зелёная сетка
					vec2 gg = abs( fract( vec2( u2, vFacLocal.y ) / 0.06 ) - 0.5 );
					col = vec3( 0.07, 0.28, 0.13 ) * ( max( gg.x, gg.y ) > 0.32 ? 1.15 : 0.55 );
				} else if ( kind == 64.0 ) {                                 // общественный туалет (2026-10-26): светлый бетон, две двери с синей и красной табличкой на лицевой стороне
					col = vec3( 0.72, 0.72, 0.7 ) * ( 0.9 + 0.1 * tDet.r ) - vec3( 0.2, 0.22, 0.25 ) * max( tGrime, 0.0 ) * age;
					if ( an.z > 0.5 && vFacNormal.z > 0.5 ) {
						float du = abs( abs( u2 ) - hx * 0.5 );
						if ( du < 0.45 && vFacLocal.y < hy - 0.7 ) { col = vec3( 0.3, 0.32, 0.34 ); if ( du < 0.18 && abs( vFacLocal.y - ( hy - 1.0 ) ) < 0.18 ) col = u2 < 0.0 ? vec3( 0.1, 0.3, 0.75 ) : vec3( 0.85, 0.15, 0.3 ); }
					}
				} else if ( kind == 65.0 ) {                                 // щит-панорама смотровой: тёмная доска, в ней светлый горизонт гор и подписи-полоски
					col = vec3( 0.16, 0.14, 0.12 );
					if ( an.z > 0.5 ) {
						vec2 bp = vec2( u2 / hx, vFacLocal.y / hy );
						float ridge = 0.1 + 0.25 * sin( bp.x * 5.0 + 1.0 ) * sin( bp.x * 11.0 ) + 0.15 * sin( bp.x * 3.0 );
						if ( abs( bp.x ) < 0.92 && abs( bp.y ) < 0.85 ) col = bp.y < ridge ? vec3( 0.35, 0.42, 0.3 ) : vec3( 0.78, 0.86, 0.92 );
						if ( abs( bp.x ) < 0.92 && bp.y > 0.5 && fract( bp.x * 4.0 ) < 0.6 && abs( bp.y - 0.65 ) < 0.05 ) col = vec3( 0.12 );
					}
				} else if ( kind == 63.0 ) {                                 // щебёночная призма ж/д пути (2026-10-26): серо-бурый гравий
					col = vec3( 0.27, 0.26, 0.25 ) * ( 0.7 + 0.5 * tDet.r ) * ( 0.85 + 0.3 * tDet.g );   // с воздуха светлый щебень читался как бетон
					fRough = 0.95;
				} else if ( kind == 62.0 ) {                                 // знак остановки: круг, синее поле, белое кольцо и белый автобус-прямоугольник (2026-10-25)
					float rr = length( vec2( u2, vFacLocal.y ) ) / hx;
					if ( rr > 1.0 ) discard;
					col = rr > 0.86 ? vec3( 0.85, 0.85, 0.83 ) : vec3( 0.08, 0.2, 0.62 );
					if ( an.z > 0.5 && abs( u2 ) < hx * 0.42 && abs( vFacLocal.y + hx * 0.02 ) < hx * 0.2 ) col = vec3( 0.9 );
					if ( an.z > 0.5 && abs( u2 ) < hx * 0.36 && vFacLocal.y > hx * 0.05 && vFacLocal.y < hx * 0.14 ) col = vec3( 0.08, 0.2, 0.62 );
				} else if ( kind == 60.0 || kind == 61.0 ) {                 // светофор 横型 (2026-10-25): тёмный короб, на лицевой стороне три лампы — зелёная, жёлтая, красная; горит одна (60 зелёная, 61 красная), и днём
					col = vec3( 0.15, 0.16, 0.17 );
					if ( vFacNormal.z > 0.5 ) {
						float li = clamp( floor( ( u2 + hx ) / ( 2.0 * hx ) * 3.0 ), 0.0, 2.0 ), lcx = ( li + 0.5 ) * ( 2.0 * hx / 3.0 ) - hx;
						if ( length( vec2( u2 - lcx, vFacLocal.y ) ) < 0.15 ) {
							vec3 lc = li < 0.5 ? vec3( 0.05, 0.72, 0.5 ) : li < 1.5 ? vec3( 0.95, 0.7, 0.08 ) : vec3( 0.95, 0.08, 0.06 );
							bool on = kind == 60.0 ? li < 0.5 : li > 1.5;
							col = on ? lc : lc * 0.2;
							if ( on ) fEmit = lc * 2.5;
						}
					}
				} else if ( kind == 56.0 ) {                                 // велосипед (自転車, ママチャリ): рисунок на боковых гранях, остальное — вырез
					if ( an.x < 0.5 ) discard;
					vec2 bp = vec2( u2, vFacLocal.y + hy );
					float wa = hx * 0.56, ty = 0.33,
						tire = min( abs( length( bp - vec2( wa, ty ) ) - 0.3 ), abs( length( bp - vec2( -wa, ty ) ) - 0.3 ) ),
						fr = min( min( fSeg( bp, vec2( -wa, ty ), vec2( 0.0, 0.33 ) ), fSeg( bp, vec2( 0.0, 0.33 ), vec2( wa * 0.55, 0.78 ) ) ),
						          min( fSeg( bp, vec2( -wa, ty ), vec2( -wa * 0.25, 0.82 ) ), fSeg( bp, vec2( wa * 0.55, 0.78 ), vec2( wa, ty ) ) ) ),
						bar = fSeg( bp, vec2( wa * 0.55, 0.78 ), vec2( wa * 0.7, 0.98 ) ),
						seat = fSeg( bp, vec2( -wa * 0.45, 0.86 ), vec2( -wa * 0.05, 0.86 ) ),
						bask = max( abs( bp.x - wa * 1.02 ), abs( bp.y - 0.84 ) * 1.6 );
					if ( tire > 0.032 && fr > 0.02 && bar > 0.018 && seat > 0.035 && bask > 0.13 ) discard;
					col = tire <= 0.032 ? vec3( 0.025 ) : seat <= 0.035 ? vec3( 0.04 ) : bask <= 0.13 ? vec3( 0.32 ) * ( 0.7 + 0.3 * step( 0.5, fract( bp.x / 0.03 ) ) )
						: fPick( fract( seed * 5.3 ), vec3( 0.62, 0.63, 0.64 ), vec3( 0.06 ), vec3( 0.5, 0.06, 0.05 ), vec3( 0.1, 0.18, 0.42 ), vec3( 0.72, 0.72, 0.7 ) );
					fRough = 0.4; fMetal = tire > 0.032 && seat > 0.035 ? 0.5 : 0.0;
				}
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
				wall = kind == 12.0 ? vec3( 0.5, 0.47, 0.4 ) : kind == 58.0 ? vec3( 0.82, 0.82, 0.8 ) : kind == 57.0 ? vec3( 0.48, 0.52, 0.58 ) : kind == 59.0 ? vec3( 0.5, 0.47, 0.42 ) : fPick( seed, vec3( 0.42, 0.42, 0.41 ), vec3( 0.3, 0.32, 0.34 ), vec3( 0.4, 0.36, 0.31 ), vec3( 0.5, 0.5, 0.48 ), vec3( 0.24, 0.25, 0.27 ) );
				wall *= 1.0 - 0.22 * step( 0.955, max( fract( u / 1.8 ), fract( y / 1.5 ) ) ) * det;
				mW = vec3( 0.0, 1.2, 0.0 );
				float cu = fract( u / 1.8 ) * 1.8 - 0.9, du = abs( u - w * 0.5 );
				col = wall;
				if ( front && fl < 1.0 && du < 1.7 && fy < 2.6 ) { col = ( du > 1.6 || fy > 2.5 || du < 0.03 ) ? vec3( 0.05 ) : glass * 1.6; fRough = 0.22; fMetal = 0.2; fEmit = vec3( 1.0, 0.95, 0.85 ) * nE * 0.45; }
				else if ( !top && fWin( col, vec3( 0.05, 0.05, 0.055 ), cu, fy - 1.62, 0.86, 0.68, 0.045 ) > 0.5 ) { wOn = 1.0; wType = 2.0; wP = vec2( cu, fy - 1.62 ); wH = vec2( 0.86, 0.68 ); wSill = 0.94; wRoomW = 7.2; wId = vec2( floor( u / 1.8 ), fl ); wLit = kind == 12.0 ? 0.15 : 0.55; wFrame = vec3( 0.05, 0.05, 0.055 ); }
				// больница: красный крест над входом; вокзал: стеклянный фасад первого этажа во всю ширину и вывеска
				if ( kind == 58.0 && front && abs( u - w * 0.5 ) < 1.0 && y > 3.3 && y < 5.3 ) {
					float cr = step( abs( u - w * 0.5 ), 0.3 ) + step( abs( y - 4.3 ), 0.3 );
					if ( cr > 0.5 ) { col = vec3( 0.75, 0.08, 0.06 ); fEmit = vec3( 0.9, 0.1, 0.08 ) * nE * 0.8; fRough = 0.5; fMetal = 0.0; }
				}
				if ( kind == 57.0 && front && fl < 1.0 && y < 3.3 && y > 0.1 && abs( u - w * 0.5 ) < w * 0.45 ) { col = ( abs( fract( u / 2.4 ) - 0.5 ) > 0.47 ) ? vec3( 0.2, 0.21, 0.23 ) : glass * 1.5; fRough = 0.22; fMetal = 0.2; fEmit = vec3( 1.0, 0.97, 0.9 ) * nE * 0.55; }
				if ( top && front && ( ( kind == 5.0 && fract( seed * 5.9 ) < 0.5 ) || kind == 57.0 || kind == 59.0 ) ) {
					float gl = fGlyph( vec2( fract( u / 0.5 ), ( y - floors * 3.0 - 0.1 ) / 0.5 ), floor( u / 0.5 ) + seed * 31.0 ) * step( w * 0.2, u ) * step( u, w * 0.8 );
					col = mix( vec3( 0.1, 0.11, 0.13 ), vec3( 0.8 ), gl ); fEmit = vec3( gl ) * nE * 0.8;
				}
			} else if ( st < 5.5 ) {                                       // профлист: склад, цех, большой магазин, заправка
				wall = fPick( seed, vec3( 0.62, 0.64, 0.66 ), vec3( 0.52, 0.58, 0.62 ), vec3( 0.74, 0.72, 0.66 ), vec3( 0.5, 0.56, 0.5 ), vec3( 0.68, 0.68, 0.7 ) );
				wall *= mix( 0.95, 0.9 + 0.1 * step( 0.5, fract( u / 0.3 ) ), det );   // рёбра профлиста — вблизи (издали муар)
				// панели по 6 м: чуть разный тон и тёмный шов — видно и издали (2026-10-24: большие коробки были ровными)
				wall *= ( 0.95 + 0.07 * fHash( vec2( floor( u / 6.0 ), seed * 31.0 ) ) ) * ( 1.0 - 0.22 * ( 1.0 - smoothstep( 0.03, 0.09, ( 0.5 - abs( fract( u / 6.0 ) - 0.5 ) ) * 6.0 ) ) );
				col = wall; fRough = 0.6; fMetal = 0.3;
				float hhI = vFacScale.y;
				if ( kind == 10.0 && w > 18.0 && y < 4.5 && abs( mod( u, 9.0 ) - 4.5 ) < 2.0 ) {                    // склад: подъёмные ворота через 9 м
					col = vec3( 0.55, 0.57, 0.58 ) * ( 0.88 + 0.12 * step( 0.5, fract( y / 0.12 ) ) ) * ( y < 0.25 ? 0.4 : 1.0 ); fMetal = 0.4;
				} else if ( kind == 11.0 && hhI > 6.0 && y > hhI - 3.4 && y < hhI - 2.1 && w > 10.0 ) {             // цех: ленточное остекление
					col = abs( fract( u / 1.2 ) - 0.5 ) > 0.46 ? vec3( 0.3, 0.31, 0.32 ) : glass * 1.3; fRough = 0.2; fMetal = 0.2;
					fEmit = vec3( 1.0, 0.96, 0.88 ) * nE * 0.5 * step( 0.4, fHash( vec2( floor( u / 7.0 ), seed ) ) );
				}
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
`,ot={uDayLum:{value:0},uBounce:{value:new ke(0,0,0)},uNearC:{value:[0,0]},tFacDet:{value:null},tFacGrime:{value:null},tSigns:{value:null}},Mo={tRoofDet:{value:null}},r0=null,i0=[["ラーメン 一番",0],["居酒屋 とり吉",1],["寿司 まる八",1],["焼肉 大将",0],["ほっと弁当",0],["喫茶 ロマン",1],["中華料理 龍門",1],["そば・うどん",1],["吉田のうどん",1],["和菓子 松月堂",1],["美容室 カット",0],["理容 タナカ",0],["山田歯科医院",0],["ふじ整骨院",0],["学習塾 進学会",0],["クリーニング",0],["不動産 賃貸",1],["コインランドリー",0],["くすり 薬局",0],["酒 山本商店",1],["書店 文林堂",1],["サイクルショップ",0],["でんき 電器店",0],["写真 カメラ",0],["メガネ・時計",0],["生花 フラワー",0],["タイヤ専門店",0],["自動車整備工場",0],["鈑金塗装",0],["中古車 販売",0],["カー用品",0],["チューニング工房",0]],l0=["ラーメン","居酒屋","薬","美容室","歯科","そば","寿司","焼肉","スナック","カラオケ","診療所","整体","質","酒","たばこ","旅館","麻雀","うどん","定食","喫茶","不動産","学習塾","理容","花","本","鍼灸","接骨院","古着","パチンコ","ゲーム","民宿","整備"],rr=[["#e8e4dc","#b0221c"],["#a8261e","#f2eee6"],["#e0b52c","#1d1a16"],["#1f4f8f","#f0f0ee"],["#2f6b45","#f0f0e8"],["#1c1c1e","#e6c13a"],["#e6dcc4","#5a3520"],["#cc6a1e","#fbf6ec"],["#f2f1ec","#1d2a52"],["#5b2a44","#f2e6ec"]];function s0(){let a=2048,e=new OffscreenCanvas(a,a),t=e.getContext("2d"),o='"Yu Gothic UI", "Yu Gothic", YuGothic, Meiryo, "Hiragino Kaku Gothic ProN", "Hiragino Sans", "Noto Sans JP", "Noto Sans CJK JP", sans-serif',i='"Yu Mincho", YuMincho, "Hiragino Mincho ProN", "Noto Serif JP", "Noto Serif CJK JP", "MS Mincho", serif',r=s=>rr[(s*7+3)%rr.length];t.fillStyle="#808080",t.fillRect(0,0,a,a),t.textAlign="center",t.textBaseline="middle",i0.forEach(([s,l],c)=>{let u=c%4*512,d=Math.floor(c/4)*128,[m,g]=r(c);t.fillStyle=m,t.fillRect(u,d,512,128),t.fillStyle=g,t.fillRect(u,d+6,512,5),t.fillRect(u,d+117,512,5),t.font=`bold 76px ${l?i:o}`;let _=t.measureText(s).width,b=Math.min(1,440/Math.max(1,_));t.save(),t.translate(u+256,d+66),t.scale(b,1),t.fillText(s,0,0),t.restore()}),l0.forEach((s,l)=>{let c=l%16*128,u=1024+Math.floor(l/16)*512,[d,m]=r(l+5),g=[...s],_=Math.min(92,440/g.length);t.fillStyle=m,t.fillRect(c,u,128,512),t.fillStyle=d,t.fillRect(c+7,u+7,114,498),t.fillStyle=m,t.font=`bold ${_}px ${l%3?o:i}`,g.forEach((b,w)=>{let M=u+256+(w-(g.length-1)/2)*_*1.02;b==="ー"?(t.save(),t.translate(c+64,M),t.rotate(Math.PI/2),t.fillText(b,0,0),t.restore()):t.fillText(b,c+64,M)})});let n=new Tt(e);return n.wrapS=n.wrapT=1001,n.minFilter=Ua,n.magFilter=Ha,n.generateMipmaps=!0,n.anisotropy=4,n.colorSpace=_t,n.needsUpdate=!0,n}function n0(a){let e=()=>{let t=new OffscreenCanvas(1,1),o=t.getContext("2d");return o.fillStyle="#808080",o.fillRect(0,0,1,1),new Tt(t)};return ot.tFacDet.value||(ot.tFacDet.value=e(),ot.tFacGrime.value=e(),Mo.tRoofDet.value=e()),ot.tSigns.value||(ot.tSigns.value=s0()),r0||=Promise.all(["facade_detail","facade_grime","roof_detail"].map(async t=>{let o=await createImageBitmap(await(await fetch(`${a}textures/${t}.jpg`)).blob()),i=new Tt(o);return i.wrapS=i.wrapT=Dt,i.minFilter=Ua,i.magFilter=Ha,i.generateMipmaps=!0,i.anisotropy=4,i.colorSpace="",i.needsUpdate=!0,i})).then(([t,o,i])=>{ot.tFacDet.value=t,ot.tFacGrime.value=o,Mo.tRoofDet.value=i}).catch(t=>console.warn("текстуры фасадов:",t))}function c0(a){let e=new He({roughness:1,metalness:0,envMapIntensity:.75});return e.name="cityFacade",e.userData.night=a,e.onBeforeCompile=t=>{t.uniforms.uNight=a,t.uniforms.uDayLum=ot.uDayLum,t.uniforms.uBounce=ot.uBounce,t.uniforms.uNearC=ot.uNearC,t.uniforms.tFacDet=ot.tFacDet,t.uniforms.tFacGrime=ot.tFacGrime,t.uniforms.tSigns=ot.tSigns,t.vertexShader=t0+t.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
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
	if ( floor( aKind + 0.5 ) == 45.0 && vFacNear > 0.5 ) gl_Position = vec4( 0.0, 0.0, -2.0, 1.0 );`),t.fragmentShader=a0+t.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
`+o0).replace("#include <roughnessmap_fragment>","float roughnessFactor = fRough;").replace("#include <metalnessmap_fragment>","float metalnessFactor = fMetal;").replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
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
#include <fog_fragment>`)},e.customProgramCacheKey=()=>"cityFacade28",e}function f0(){let a=new He({vertexColors:!0,roughness:.95,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3});return a.name="cityGround",a.onBeforeCompile=e=>{e.vertexShader=`attribute float aGround;
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
		else if ( k < 9.5 ) diffuseColor.rgb *= ( 0.8 + 0.3 * gNoise( vGrW.xz / 1.7 ) ) * ( 0.92 + 0.1 * gNoise( vGrW.xz / 0.25 ) );   // асфальт стоянки и улиц: пятна, без плитки
		else if ( k < 10.5 ) {                                             // бетон въезда (2026-10-24): плиты ~2,6 м со швами, пятна
			vec2 f = abs( fract( vGrW.xz / 2.6 ) - 0.5 );
			diffuseColor.rgb *= ( 1.0 - smoothstep( 0.485, 0.5, max( f.x, f.y ) ) * 0.4 ) * ( 0.9 + 0.12 * gNoise( vGrW.xz / 0.9 ) );
		} else {                                                           // чугунный люк (マンホール): мелкая решётка рельефа, блик краёв
			vec2 g = abs( fract( ( vGrW.xz + vGrW.zx * vec2( 0.5, -0.5 ) ) / 0.07 ) - 0.5 );
			diffuseColor.rgb *= ( 0.75 + 0.35 * step( 0.3, max( g.x, g.y ) ) ) * ( 0.9 + 0.15 * gNoise( vGrW.xz / 0.2 ) );
		}
	}`)},a.customProgramCacheKey=()=>"cityGround10",a}var $r={thick:.1,capW:.03,capH:.075};function jr(a){let e=[],t=[],o=[];for(let[r,n]of a){let s=r[0],l=r[1],c=r[2],u=(l[1]-s[1])*(c[2]-s[2])-(l[2]-s[2])*(c[1]-s[1]),d=(l[2]-s[2])*(c[0]-s[0])-(l[0]-s[0])*(c[2]-s[2]),m=(l[0]-s[0])*(c[1]-s[1])-(l[1]-s[1])*(c[0]-s[0]),g=u*n[0]+d*n[1]+m*n[2]<0?[...r].reverse():r,_=e.length/3;for(let b of g)e.push(...b),t.push(...n);for(let b=1;b+1<g.length;b++)o.push(_,_+b,_+b+1)}let i=new dt;return i.setAttribute("position",new Re(e,3)),i.setAttribute("normal",new Re(t,3)),i.setIndex(o),i}function Yr(a){let{capW:e,capH:t}=$r,o=.97,i=1+t;return[[[[-a,i,-e],[a,i,-e],[a,i,e],[-a,i,e]],[0,1,0]],[[[-a,o,e],[a,o,e],[a,i,e],[-a,i,e]],[0,0,1]],[[[-a,o,-e],[a,o,-e],[a,i,-e],[-a,i,-e]],[0,0,-1]],[[[-a,o,-e],[-a,o,e],[-a,i,e],[-a,i,-e]],[-1,0,0]],[[[a,o,-e],[a,o,e],[a,i,e],[a,i,-e]],[1,0,0]]]}function ir(a=!0){let e=Math.SQRT1_2,t=a?$r.thick:0,o=[[[[-.5,0,.5],[.5,0,.5],[.5,1,0],[-.5,1,0]],[0,e,e]],[[[.5,0,-.5],[-.5,0,-.5],[-.5,1,0],[.5,1,0]],[0,e,-e]],a?[[[-.5,-t,-.5],[-.5,-t,.5],[-.5,0,.5],[-.5,1,0],[-.5,0,-.5]],[-1,0,0]]:[[[-.5,0,-.5],[-.5,0,.5],[-.5,1,0]],[-1,0,0]],a?[[[.5,-t,-.5],[.5,-t,.5],[.5,0,.5],[.5,1,0],[.5,0,-.5]],[1,0,0]]:[[[.5,0,-.5],[.5,0,.5],[.5,1,0]],[1,0,0]]];return a&&o.push([[[-.5,-t,.5],[.5,-t,.5],[.5,0,.5],[-.5,0,.5]],[0,0,1]],[[[-.5,-t,-.5],[.5,-t,-.5],[.5,0,-.5],[-.5,0,-.5]],[0,0,-1]],[[[-.5,-t,-.5],[.5,-t,-.5],[.5,-t,.5],[-.5,-t,.5]],[0,-1,0]],...Yr(.5)),jr(o)}function lr(a=!0){let e=Math.SQRT1_2,t=.22,o=[[[[-.5,0,.5],[.5,0,.5],[t,1,0],[-.22,1,0]],[0,e,e]],[[[.5,0,-.5],[-.5,0,-.5],[-.22,1,0],[t,1,0]],[0,e,-e]],[[[-.5,0,-.5],[-.5,0,.5],[-.22,1,0]],[-e,e,0]],[[[.5,0,.5],[.5,0,-.5],[t,1,0]],[e,e,0]]];return a&&o.push([[[-.5,-.1,.5],[.5,-.1,.5],[.5,0,.5],[-.5,0,.5]],[0,0,1]],[[[-.5,-.1,-.5],[.5,-.1,-.5],[.5,0,-.5],[-.5,0,-.5]],[0,0,-1]],[[[-.5,-.1,-.5],[-.5,-.1,.5],[-.5,0,.5],[-.5,0,-.5]],[-1,0,0]],[[[.5,-.1,-.5],[.5,-.1,.5],[.5,0,.5],[.5,0,-.5]],[1,0,0]],[[[-.5,-.1,-.5],[.5,-.1,-.5],[.5,-.1,.5],[-.5,-.1,.5]],[0,-1,0]],...Yr(t)),jr(o)}var Ro={cols:8,px:256,period:12},na={boulevard:0,avenue:1,collector:2,minor:3,asphalt:4,white:6};function Xr(a,e,t,o){a.fillStyle="#3b3c3f",a.fillRect(0,0,e,t);let i=12345,r=()=>(i=i*1664525+1013904223>>>0,i/4294967296);for(let n=0;n<o;n++){let s=44+Math.floor(r()*34);a.fillStyle=`rgb(${s},${s},${s+2})`,a.fillRect(Math.floor(r()*e),Math.floor(r()*t),2,2)}}function d0(){let a=Ro.px,e=new OffscreenCanvas(a,a);Xr(e.getContext("2d"),a,a,3250);let t=new Tt(e);return t.colorSpace=_t,t.wrapS=t.wrapT=Dt,t.anisotropy=4,t}function u0(){let a=Ro,e=a.cols*a.px,t=a.px,o=new OffscreenCanvas(e,t),i=o.getContext("2d");Xr(i,e,t,26e3);let r="#e6e6e2",n=(l,c,u,d,m,g=!1)=>{i.fillStyle=m;let _=l*a.px+u/c*a.px,b=Math.max(2,d/c*a.px);i.fillRect(_-b/2,0,b,g?t/2:t)};for(let[l,c]of[["boulevard",0],["avenue",1],["collector",2],["minor",3]]){let u=Cr[l].w;if(n(c,u,.5,.15,r),n(c,u,u-.5,.15,r),l==="boulevard"){n(c,u,u/2-.9,.15,r),n(c,u,u/2+.9,.15,r),i.save(),i.beginPath(),i.rect(c*a.px+(u/2-.82)/u*a.px,0,1.64/u*a.px,t),i.clip(),i.strokeStyle=r,i.lineWidth=4;for(let d=-4;d<12;d++)i.beginPath(),i.moveTo(c*a.px+a.px*.42,d*t/6),i.lineTo(c*a.px+a.px*.58,d*t/6+t/6),i.stroke();i.restore(),n(c,u,u/2-.9-(u/2-1.4)/2,.15,r,!0),n(c,u,u/2+.9+(u/2-1.4)/2,.15,r,!0)}else l==="avenue"?(n(c,u,u/2,.18,"#e2a23a"),n(c,u,.5+(u/2-.5)/2,.15,r,!0),n(c,u,u-.5-(u/2-.5)/2,.15,r,!0)):n(c,u,u/2,.15,r,!0)}i.fillStyle=r,i.fillRect(na.white*a.px,0,a.px,t);let s=new Tt(o);return s.colorSpace=_t,s.wrapT=Dt,s.anisotropy=4,s}var wt={poleH:6.2,arm:5.2,headX:4.4,headY:5.55};function h0(){let a=new uo(.1,.12,wt.poleH,8);a.translate(0,wt.poleH/2,0);let e=new uo(.055,.055,wt.arm,6);e.rotateZ(Math.PI/2),e.translate(wt.arm/2,wt.poleH-.3,0);let t=new ua(1.36,.46,.3);t.translate(wt.headX,wt.headY,0);let o=new ua(.06,wt.poleH-.3-wt.headY-.23,.06);o.translate(wt.headX,(wt.poleH-.3+wt.headY+.23)/2,0);let i=n=>{let s=[],l=[],c=[];for(let d of n){let m=d.getAttribute("position"),g=d.getAttribute("normal"),_=s.length/3;for(let w=0;w<m.count;w++)s.push(m.getX(w),m.getY(w),m.getZ(w)),l.push(g.getX(w),g.getY(w),g.getZ(w));let b=d.getIndex();for(let w=0;w<b.count;w++)c.push(_+b.getX(w));d.dispose()}let u=new dt;return u.setAttribute("position",new Re(s,3)),u.setAttribute("normal",new Re(l,3)),u.setIndex(c),u},r=n=>{let s=[],l=[],c=[],u=[[.1,1,.75],[1,.75,.1],[1,.12,.08]];for(let m=0;m<3;m++){let g=wt.headX-.42+m*.42,_=s.length/3,b=m===n,w=u[m].map(M=>M*(b?1.6:.07));s.push(g,wt.headY,.16),l.push(...w);for(let M=0;M<=12;M++){let I=M/12*Math.PI*2;s.push(g+Math.cos(I)*.15,wt.headY+Math.sin(I)*.15,.16),l.push(...w)}for(let M=0;M<12;M++)c.push(_,_+M+1,_+M+2)}let d=new dt;return d.setAttribute("position",new Re(s,3)),d.setAttribute("color",new Re(l,3)),d.setIndex(c),d};return{body:i([a,e,t,o]),go:r(0),stop:r(2)}}function p0(){let a=new ua(.9,1.83,.75);a.translate(0,.915,0),a.groups.forEach((s,l)=>{s.materialIndex=+(l===4)});let e=new OffscreenCanvas(128,256),t=e.getContext("2d");t.fillStyle="#f4f4f2",t.fillRect(0,0,128,256),t.fillStyle="#c8202a",t.fillRect(0,0,128,34),t.fillStyle="#20252b",t.fillRect(8,40,112,120);let o=["#d32f2f","#1e88e5","#43a047","#fbc02d","#8e24aa","#f57c00","#ffffff","#795548"];for(let s=0;s<4;s++)for(let l=0;l<6;l++)t.fillStyle=o[(s*3+l*5)%o.length],t.fillRect(12+l*18,46+s*28,12,20);t.fillStyle="#2b2f36",t.fillRect(16,196,96,26),t.fillStyle="#8a9099",t.fillRect(96,168,14,22);let i=new Tt(e);i.colorSpace=_t;let r=new He({color:15263974,roughness:.4,metalness:.2}),n=new He({map:i,roughness:.25,emissive:16777215,emissiveMap:i,emissiveIntensity:.05});return r.name="cityVendBody",n.name="cityVendFace",{geo:a,mats:[r,n],tex:i}}var _o={uRes:{value:[800,450]},uColor:{value:new ke(1776928)}},sr=null;function Ba(a,e=.012){sr||=new qr({name:"wires",transparent:!0,depthWrite:!1,side:2,uniforms:_o,vertexShader:`attribute vec3 aB;
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
void main() { gl_FragColor = vec4( uColor, vA ); }`});let t=a.length/6,o=new Float32Array(t*12),i=new Float32Array(t*12),r=new Float32Array(t*4),n=new Float32Array(t*4),s=new Uint32Array(t*6);for(let u=0;u<t;u++){let d=a.slice(u*6,u*6+3),m=a.slice(u*6+3,u*6+6),g=typeof e=="number"?e:e[u];[d,d,m,m].forEach((_,b)=>(o.set(_,u*12+b*3),i.set(b<2?m:d,u*12+b*3),n[u*4+b]=g)),r.set([-1,1,1,-1],u*4),s.set([u*4,u*4+1,u*4+2,u*4+1,u*4+3,u*4+2],u*6)}let l=new dt;l.setAttribute("position",new Re(o,3)),l.setAttribute("aB",new Re(i,3)),l.setAttribute("aSide",new Re(r,1)),l.setAttribute("aR",new Re(n,1)),l.setIndex(Array.from(s)),l.computeBoundingSphere();let c=new ct(l,sr);return c.name="wires",c.renderOrder=2,c.userData.noAO=!0,c}function m0(a,e,t=null){let o={concrete:Ee(),metal:Ee()},i=[],r=[];for(let s of a){let[l,c,u,d]=s;if(Be(o.concrete,e.tpl.pole,l,c,u,d),Be(o.metal,e.tpl.arm,l,c,u,d),s.length<8)continue;let[m,g,_,b]=s.slice(4),w=Math.cos(d),M=Math.sin(d),I=Math.cos(b),T=Math.sin(b);for(let[R,L,P,y]of[[-.9,.22,be.sag,.008],[0,.22,be.sag,.008],[.9,.22,be.sag,.008],[-.3,-1.2,be.sag*1.3,.012],[.3,-1.2,be.sag*1.3,.012],[.35,-3.3,be.sag*2.2,.03],[.5,-3.7,be.sag*2.6,.022]]){let h=l+R*w,f=u-R*M,p=c+be.armH+L,x=m+R*I,v=_-R*T,S=g+be.armH+L;for(let A=0;A<8;A++){let D=A/8,C=(A+1)/8,U=k=>P*4*k*(1-k);i.push(h+(x-h)*D,p+(S-p)*D-U(D),f+(v-f)*D,h+(x-h)*C,p+(S-p)*C-U(C),f+(v-f)*C),r.push(y)}}}if(t)for(let s=0;s<t.length;s+=6){let l=t[s],c=t[s+1]+be.armH-1.3,u=t[s+2],d=t[s+3],m=t[s+4],g=t[s+5],_=.25+.03*Math.hypot(d-l,g-u);for(let b=0;b<6;b++){let w=b/6,M=(b+1)/6,I=T=>_*4*T*(1-T);i.push(l+(d-l)*w,c+(m-c)*w-I(w),u+(g-u)*w,l+(d-l)*M,c+(m-c)*M-I(M),u+(g-u)*M),r.push(.009)}}let n=new nt;n.name="townPoles";for(let[s,l]of[[o.concrete,e.mats.concrete],[o.metal,e.mats.metal]]){if(!s.i.length)continue;let c=new dt;c.setAttribute("position",new Re(s.p,3)),c.setAttribute("normal",new Re(s.n,3)),c.setAttribute("uv",new Re(s.u,2)),c.setIndex(s.i),c.computeBoundingSphere();let u=new ct(c,l);u.castShadow=l===e.mats.concrete,u.receiveShadow=!0,n.add(u)}return i.length&&n.add(Ba(i,r)),n}var Kr=ft,qr=vt;function v0(){let a=new He({color:16777215,roughness:.62,metalness:0,envMapIntensity:.7});a.name="cityRoof",a.onBeforeCompile=T=>{T.vertexShader=`varying float vRoofY;
varying float vRoofU;
varying float vRoofN;
varying float vRoofX;
`+T.vertexShader.replace("#include <fog_vertex>",`#include <fog_vertex>
	vRoofY = ( modelMatrix * instanceMatrix * vec4( transformed, 1.0 ) ).y; vRoofU = position.x * length( instanceMatrix[ 0 ].xyz ); vRoofN = normal.y; vRoofX = abs( normal.x );`),T.uniforms.uSnowRoof=Pt.uSnow,T.uniforms.tRoofDet=Mo.tRoofDet,T.fragmentShader=`uniform float uSnowRoof;
uniform sampler2D tRoofDet;
varying float vRoofY;
varying float vRoofU;
varying float vRoofN;
varying float vRoofX;
`+T.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
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
	}`)},a.customProgramCacheKey=()=>"cityRoof4";let e=p0(),t={value:0},o=u0(),i=h0(),r=new He({map:o,roughness:.92,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2});r.name="cityStreet";let n=d0(),s=r.clone();s.map=n,s.name="cityCross";let l=new He({color:4868941,roughness:.95,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1});l.name="cityLane";let c=new He({color:10197394,roughness:.95});c.name="cityParapet";let u=new He({color:7304055,roughness:.55,metalness:.5});u.name="citySignal";let d=new Xt({vertexColors:!0});d.name="citySignalLens";let m=new He({color:16777215,roughness:1,metalness:0,envMapIntensity:.6});m.name="cityGreen";let g=(T,R=.3)=>{let L=new mi(1,T),P=L.getAttribute("position"),y=L.getAttribute("normal");for(let h=0;h<P.count;h++){let f=P.getX(h),p=P.getY(h),x=P.getZ(h),v=Math.hypot(f,p,x)||1,S=Math.round(f/v*1e3)/1e3,A=Math.round(p/v*1e3)/1e3,D=Math.round(x/v*1e3)/1e3,C=Math.sin(S*37.7+A*91.3+D*53.1)*43758.5453,U=1-R/2+R*(C-Math.floor(C));P.setXYZ(h,S*U,A<-.25?-.25+(A+.25)*.45*U:A*U,D*U),y.setXYZ(h,S,A,D)}return L},_=g(1),b=g(0),w=g(0),M=new uo(.7,1,1,6,1,!0);M.translate(0,.5,0);let I=new He({color:1854034,roughness:.12,metalness:.3});return I.name="cityWater",{setLights(T,R){t.value=T*R,e.mats[1].emissiveIntensity=.05+T*R*.9},facade:c0(t),ground:f0(),lanes:l,parapet:c,street:r,cross:s,water:I,roofGeo:ir(),hipGeo:lr(),roofMat:a,poles:Br(),vendGeo:e.geo,vendMats:e.mats,signal:i,signalBody:u,signalLens:d,green:m,crownGeo:_,crownFarGeo:b,shrubGeo:w,trunkGeo:M,roofFarGeo:ir(!1),hipFarGeo:lr(!1),dispose(){this.facade.dispose(),this.ground.dispose(),l.dispose(),c.dispose(),r.dispose(),s.dispose(),n.dispose(),I.dispose(),o.dispose(),this.roofGeo.dispose(),this.hipGeo.dispose(),this.roofFarGeo.dispose(),this.hipFarGeo.dispose(),a.dispose(),this.poles.dispose(),e.geo.dispose(),e.tex.dispose();for(let T of e.mats)T.dispose();i.body.dispose(),i.go.dispose(),i.stop.dispose(),u.dispose(),d.dispose(),m.dispose(),_.dispose(),b.dispose(),w.dispose(),M.dispose()}}}var nr=[4869975,3816772,5591628,3424335,4930094,4016704,5922403,7027502,3093048,4474959,7234130,5068387],cr={[Oe.house]:[!1,.3,1.2],[Oe.houseHip]:[!0,.28,1.3],[Oe.houseLow]:[!0,.13,1.1],[Oe.pagodaTier]:[!0,.11,5.2],[Oe.apartment]:[!1,.16,.7],[Oe.shed]:[!1,.2,.4],[Oe.farmhouse]:[!0,.34,1.6],[Oe.shrine]:[!1,.5,2],[Oe.warehouse]:[!1,.1,.3],[Oe.factory]:[!1,.08,.3],[Oe.greenhouse]:[!1,.14,.1]};function fr(a,e){let t=[];for(let o of[!1,!0]){let i=[];for(let m=0;m<a.length;m+=8){let g=cr[Math.round(a[m+7])];g&&g[0]===o&&i.push(m)}if(!i.length)continue;let r=new ft(o?e.hipGeo:e.roofGeo,e.roofMat,i.length),n=new at,s=new ha,l=new ne,c=new ne,u=new ne(0,1,0),d=new ke;i.forEach((m,g)=>{let _=a[m+3],b=a[m+4],w=a[m+5],M=Math.round(a[m+7]),I=cr[M],T=Math.floor(Math.abs(Math.sin(a[m]*12.9898+a[m+2]*78.233))*43758.5453),R=M===Oe.house||M===Oe.houseHip,L=_>=w;R&&Math.abs(_-w)<2.6&&(T>>4)%10<4&&(L=!L);let P=L?w:_,y=I[1]*(R?.82+.05*((T>>8)%9):1);n.compose(l.set(a[m],a[m+1]+b/2-.05,a[m+2]),s.setFromAxisAngle(u,a[m+6]+(L?0:Math.PI/2)),c.set((L?_:w)+(I[0]?I[2]:Math.min(I[2],.3)),P*y,P+I[2])),r.setMatrixAt(g,n),M===Oe.greenhouse?d.setHex(14674150):M===Oe.warehouse||M===Oe.factory||M===Oe.shed?d.setHex([8160652,9278616,7307148][T%3]):M===Oe.shrine||M===Oe.pagodaTier?d.setHex(2899772):d.setHex(nr[T%nr.length]),r.setColorAt(g,d)}),r.computeBoundingSphere(),r.castShadow=!0,r.receiveShadow=!0,r.name=o?"roofsHip":"roofs",t.push(r)}return t}var io={[Ht.shrub]:[.05,.13,.04],[Ht.tree]:[.06,.15,.045],[Ht.sakura]:[.62,.3,.37],[Ht.conifer]:[.03,.085,.04],[Ht.street]:[.09,.19,.05]};function g0(a,e,t){let o=pa(a),i=o.tiles.get(e.id);if(!i||!i.greens.length)return null;let r=o.greens,n=e.origin[0],s=e.origin[2],l=[],c=[];for(let R of i.greens)(r[R*6+5]===Ht.shrub?c:l).push(R*6);let u=new nt,d=new at,m=new ha,g=new ne,_=new ne,b=new ne(0,1,0),w=new ke;u.name="cityGreens";let M=(R,L)=>{let P=Math.sin(R*12.9898+L*78.233)*43758.5453;return P-Math.floor(P)},I=(R,L,P=1)=>{let y=.82+.36*M(r[R],r[R+2]);return w.setRGB(L[0]*y*P,L[1]*y*P,L[2]*y*P),w},T=new Map;for(let R of c){let L=Math.floor((r[R]-n)/125)*64+Math.floor((r[R+2]-s)/125),P=T.get(L);P||T.set(L,P=[]),P.push(R)}for(let[R,L]of T){let P=new ft(t.shrubGeo,t.green,L.length),y=Math.floor(R/64),h=R-y*64;L.forEach((f,p)=>{let x=r[f+3];P.setMatrixAt(p,d.compose(g.set(r[f]-n,r[f+1]+x*.55,r[f+2]-s),m.setFromAxisAngle(b,M(r[f+2],r[f])*6.28),_.set(x*1.2,x*.85,x*1.05))),P.setColorAt(p,I(f,io[Ht.shrub]))}),P.computeBoundingSphere(),P.castShadow=!1,P.receiveShadow=!0,P.name="shrubs",P.userData.cell=[y*125,h*125,(y+1)*125,(h+1)*125],u.add(P)}if(l.length){let R=new ft(t.crownGeo,t.green,l.length),L=new ft(t.trunkGeo,t.green,l.length);l.forEach((P,y)=>{let h=r[P+3],f=r[P+4],p=r[P+5],x=p===Ht.conifer,v=x?f*.42:h*.82;R.setMatrixAt(y,d.compose(g.set(r[P]-n,r[P+1]+f-v,r[P+2]-s),m.setFromAxisAngle(b,M(r[P+2],r[P])*6.28),_.set(x?h*.75:h,v,x?h*.75:h*(.85+.3*M(r[P],7))))),R.setColorAt(y,I(P,io[p]||io[Ht.tree])),L.setMatrixAt(y,d.compose(g.set(r[P]-n,r[P+1]-.2,r[P+2]-s),m.identity(),_.set(.1+f*.022,f-v*.9+.2,.1+f*.022))),L.setColorAt(y,w.setRGB(.09,.065,.045))}),R.computeBoundingSphere(),R.castShadow=!0,R.receiveShadow=!0,R.name="crowns",L.computeBoundingSphere(),L.castShadow=!1,L.receiveShadow=!0,L.name="trunks",u.add(R,L)}return u}var ba={street:.03,paint:.04},lo={out:.55,w:.14,trim:3},x0=6,st={gap:.6,len:3,bar:.45,stop:.45,after:1};function w0(a,e,t){let o=pa(a),i=o.tiles.get(e.id);if(!i)return null;let r=e.origin[0],n=e.origin[2],s=o.y,l=[],c=[],u=[],d=Ro,m=[],g=[],_=[],b=(h,f)=>s+Math.max(0,o.heightAt(h,f)),w=(h,f)=>(h+.01+f*.98)/d.cols,M=(h,f,p,x,v,S,A,D,C,U,k,W)=>{let O=l.length/3;l.push(h-r,b(h,f)+W,f-n,p-r,b(p,x)+W,x-n,A-r,b(A,D)+W,D-n,v-r,b(v,S)+W,S-n),c.push(w(C,0),U,w(C,1),U,w(C,1),k,w(C,0),k),u.push(O,O+1,O+2,O,O+2,O+3)},I=(h,f,p,x,v,S,A=ba.street)=>{let D=Math.hypot(p-h,x-f);if(D<.3)return;let C=(p-h)/D,U=(x-f)/D,k=U*v/2,W=-C*v/2,O=Math.max(1,Math.ceil(D/x0));for(let F=0;F<O;F++){let H=D*F/O,N=D*(F+1)/O,G=h+C*H,z=f+U*H,j=h+C*N,E=f+U*N;M(G+k,z+W,G-k,z-W,j+k,E+W,j-k,E-W,S,H/d.period,N/d.period,A)}},T=new Map,R=h=>{let f=T.get(h);if(f)return f;let p=o.nodes[h],x=[];for(let U of p.out){let k=o.edges[U.edge];if(k.cls==="edge"||k.cls==="river")continue;let W=U.to===k.b?k.dx:-k.dx,O=U.to===k.b?k.dz:-k.dz;x.push({edge:U.edge,ux:W,uz:O,w:k.w,ang:Math.atan2(O,W),cut:0})}x.sort((U,k)=>U.ang-k.ang);let v=Math.max(0,...x.map(U=>U.w)),S=[];for(let U=0;U<x.length;U++){let k=x[U],W=x[(U+1)%x.length],O=W.ang-k.ang+(U===x.length-1?2*Math.PI:0);if(x.length<2||O>2.97){S.push(null);continue}let F=k.ux,H=k.uz,N=W.ux,G=W.uz,z=-W.w/2*-G-k.w/2*-H,j=-W.w/2*N-k.w/2*F,E=F*-G- -N*H;if(Math.abs(E)<1e-6){S.push(null);continue}let $=(z*-G- -N*j)/E,oe=(F*j-H*z)/E,J=Math.min(3*v,Math.max(0,$)),te=Math.min(3*v,Math.max(0,oe));k.cut=Math.max(k.cut,J),W.cut=Math.max(W.cut,te),S.push([F*$+-H*(k.w/2),H*$+F*(k.w/2),$>=0&&oe>=0&&$<=3*v&&oe<=3*v])}let A=p.deg>=3?.4:-.4,D=new Map,C=[];for(let U=0;U<x.length;U++){let k=x[U];k.cut=p.deg>=3?Math.max(k.cut+A,k.w/2+.6):A,D.set(k.edge,k.cut);let W=-k.uz,O=k.ux,F=k.cut+(p.signal?st.gap+st.len+st.after+st.stop:0);C.push([p.x+k.ux*F-W*(k.w/2),p.z+k.uz*F-O*(k.w/2)],[p.x+k.ux*F+W*(k.w/2),p.z+k.uz*F+O*(k.w/2)]),S[U]&&S[U][2]&&C.push([p.x+S[U][0],p.z+S[U][1]])}return f={cut:D,poly:C,list:x},T.set(h,f),f},L=(h,f)=>{let p=o.nodes[h];return p.deg<3?-.4:(R(h).cut.get(f)??p.r)+(p.signal?st.gap+st.len+st.after+st.stop:0)};for(let h of i.edges){let f=o.edges[h];if(f.cls==="river")continue;let p=o.nodes[f.a],x=o.nodes[f.b],v=L(f.a,h),S=L(f.b,h);f.len-v-S<.5||I(p.x+f.dx*v,p.z+f.dz*v,x.x-f.dx*S,x.z-f.dz*S,f.w,na[f.cls])}for(let h of i.minors){let f=o.minors[h],p=Math.hypot(f[2]-f[0],f[3]-f[1]),x=(f[2]-f[0])/p,v=(f[3]-f[1])/p,S=f[4],A=f[5];p-S-A>1&&I(f[0]+x*S,f[1]+v*S,f[2]-x*A,f[3]-v*A,Cr.minor.w,na.minor)}for(let h of i.nodes){let f=o.nodes[h];if(f.deg<3)continue;let p=R(h),x=p.poly;for(let A of f.out){let D=o.edges[A.edge];if(D.cls==="edge"||D.cls==="river")continue;let C=A.to===D.b?D.dx:-D.dx,U=A.to===D.b?D.dz:-D.dz;if(!f.signal||!zo.has(D.cls))continue;let k=(p.cut.get(A.edge)??f.r)+st.gap,W=k+st.len,O=Math.floor((D.w-1)/(2*st.bar));for(let G=0;G<O;G++){let z=-D.w/2+.6+G*2*st.bar,j=U*(z+st.bar/2),E=-C*(z+st.bar/2);I(f.x+C*k+j,f.z+U*k+E,f.x+C*W+j,f.z+U*W+E,st.bar,na.white,ba.paint)}let F=W+st.after,H=-U*D.w/4,N=C*D.w/4;I(f.x+C*F+H-U*D.w/4,f.z+U*F+N+C*D.w/4,f.x+C*F+H+U*D.w/4,f.z+U*F+N-C*D.w/4,st.stop,na.white,ba.paint)}if(x.length<3)continue;let v=A=>(m.push(A[0]-r,b(A[0],A[1])+ba.street,A[1]-n),g.push(A[0]/d.period,A[1]/d.period),m.length/3-1),S=(A,D)=>[(A[0]+D[0])/2,(A[1]+D[1])/2];for(let A=0;A<x.length;A++){let D=[f.x,f.z],C=x[(A+1)%x.length],U=x[A];if((U[0]-D[0])*(C[1]-D[1])-(U[1]-D[1])*(C[0]-D[0])<=0)continue;let k=v(D),W=v(C),O=v(U),F=v(S(D,C)),H=v(S(C,U)),N=v(S(U,D));_.push(k,F,N,F,W,H,N,H,O,F,H,N)}}let P=(h,f,p,x,v)=>{let S=new dt;S.setAttribute("position",new Re(p,3)),S.setAttribute("uv",new Re(x,2)),S.setIndex(v),S.computeVertexNormals(),S.computeBoundingSphere();let A=new ct(S,f);return A.receiveShadow=!0,A.castShadow=!1,A.name=h,A},y=new nt;y.name="cityStreetSet",u.length&&y.add(P("cityStreets",t.street,l,c,u)),_.length&&y.add(P("cityCross",t.cross,m,g,_)),l.length=0,c.length=0,u.length=0;for(let h of i.blocks){let f=o.blocks[h],p=f.poly.length;if(f.type!=="fields"&&f.type!=="industrial")for(let x=0;x<p;x++){if(f.tags[x]!=="local")continue;let v=f.poly[x],S=f.poly[(x+1)%p],A=Math.hypot(S[0]-v[0],S[1]-v[1]);if(A<12)continue;let D=(S[0]-v[0])/A,C=(S[1]-v[1])/A,U=-C,k=D;(f.c[0]-v[0])*U+(f.c[1]-v[1])*k>0&&(U=-U,k=-k);let W=lo.out,O=lo.trim;I(v[0]+D*O+U*W,v[1]+C*O+k*W,S[0]-D*O+U*W,S[1]-C*O+k*W,lo.w,na.white,ba.paint)}}return u.length&&y.add(P("cityLines",t.street,l,c,u)),y.children.length?y:null}var so={step:38,out:.7};function Zr(a,e,t){let o=i=>{let r=a.edges[i];if(!zo.has(r.cls))return;let n=a.nodes[r.a],s=r.cls==="boulevard",l=r.dz,c=-r.dx;for(let u=0,d=so.step/2+i%5*3;d<r.len-6;d+=so.step,u++)for(let m of s?[1,-1]:[(u+i)%2?1:-1]){let g=r.w/2+so.out;t(n.x+r.dx*d+l*g*m,n.z+r.dz*d+c*g*m,Math.atan2(c*m,-l*m))}};e?e.forEach(o):a.edges.forEach((i,r)=>o(r))}function y0(a){let e=pa(a),t=[];return Zr(e,null,(o,i,r)=>t.push(o+Math.cos(r)*Ft.reach,e.y+Math.max(0,e.heightAt(o,i))+Ft.height,i-Math.sin(r)*Ft.reach)),t}function S0(a){let e=pa(a),t=e.buildings,o=(r,n,s)=>{let l=Math.sin(r*12.9898+n*78.233+s*37.719)*43758.5453;return l-Math.floor(l)},i=[];for(let r=0;r<t.length;r+=8){let n=t[r],s=t[r+1],l=t[r+2],c=t[r+3],u=t[r+4],d=t[r+5],m=Math.cos(t[r+6]),g=Math.sin(t[r+6]),_=Math.round(t[r+7]);if(_===Oe.greenhouse||_===Oe.shed||_===Oe.pagoda||_===Oe.shrine)continue;let b=Math.max(1,Math.round((u-.7)/3)),w=s-u/2,M=Math.min(u>60?64:16,Math.max(1,Math.round(b*2*(c+d)/70)));for(let I=0;I<M;I++){let T=o(n,l,I),R=o(l,n,I+7);if(o(n+I,l-I,3)<.35)continue;let L=Math.floor(T*4),P=R-.5,y=Math.floor(o(n,l,I+13)*b),h=L<2?P*c:(L===2?-1:1)*(c/2+.3),f=L<2?(L===0?-1:1)*(d/2+.3):P*d,p=_===Oe.office||_===Oe.tower||_===Oe.landmark?[.75,.85,1]:T*7%1<.65?[1,.72,.42]:[.72,.84,1],x=.22+.25*o(l,n,I+21);i.push(n+h*m+f*g,w+y*3+1.6,l-h*g+f*m,p[0]*x,p[1]*x,p[2]*x)}}for(let r of e.landmarks)i.push(r.top[0],r.top[1]+2,r.top[2],1.6,.1,.06);return i}function b0(a,e,t,o=null){let i=pa(a),r=i.tiles.get(e.id),n=new nt;if(n.name="cityProps",!r)return n;let s=e.origin[0],l=e.origin[2],c=t.poles.tpl,u=(h,f)=>i.y+Math.max(0,i.heightAt(h,f))+.15,d={concrete:[],metal:[]},m=[],g=[],_=[],b=[],w=(h,f)=>{let p=Math.sin(h*12.9898+f*78.233)*43758.5453;return p-Math.floor(p)};Zr(i,r.edges,(h,f,p)=>g.push([h-s,u(h,f),f-l,p,1]));for(let h of r.nodes){let f=i.nodes[h];if(!f.signal)continue;let p=f.out.map(v=>({o:v,e:i.edges[v.edge]})).filter(v=>zo.has(v.e.cls)),x=Math.max(...p.map(v=>v.e.w));for(let{o:v,e:S}of p){let A=v.to===S.b?-S.dx:S.dx,D=v.to===S.b?-S.dz:S.dz,C=D,U=-A,k=f.x+A*(f.r+1.2)+C*(S.w/2+.9),W=f.z+D*(f.r+1.2)+U*(S.w/2+.9);b.push({x:k-s,y:u(k,W),z:W-l,yaw:Math.atan2(-A,-D),go:S.w>=x-.01})}}for(let h of r.blocks){let f=i.blocks[h],p=f.poly.length;if(f.type!=="fields"&&f.use!=="park")for(let x=0;x<p;x++){if(f.tags[x]!=="local")continue;let v=f.poly[x],S=f.poly[(x+1)%p],A=Math.hypot(S[0]-v[0],S[1]-v[1]),D=(S[0]-v[0])/A,C=(S[1]-v[1])/A;if(A<24||D*.8+C*.6<0)continue;let U=Math.max(1,Math.round(A/30)),k=A/U,W=Math.atan2(-C,D),O=f.c[0]-(v[0]+S[0])/2,F=f.c[1]-(v[1]+S[1])/2,H=-C*O+D*F>0?1:-1,N=-C*H*.45,G=D*H*.45,z=null;for(let j=0;j<U;j++){let E=k*(j+.5),$=v[0]+D*E+N,oe=v[1]+C*E+G,J=u($,oe);if(d.concrete.push([c.pole,$-s,J,oe-l,W]),d.metal.push([c.arm,$-s,J,oe-l,W]),z)for(let te of[-.9,0,.9]){let ie=-C*te,ce=D*te,fe=z[2]+10.52,ue=J+10.52;for(let ye=0;ye<6;ye++){let Me=ye/6,ze=(ye+1)/6,We=xe=>2*xe*(1-xe);m.push(z[0]+ie+($-z[0])*Me-s,fe+(ue-fe)*Me-We(Me),z[1]+ce+(oe-z[1])*Me-l,z[0]+ie+($-z[0])*ze-s,fe+(ue-fe)*ze-We(ze),z[1]+ce+(oe-z[1])*ze-l)}}z=[$,oe,J]}}}let M=e.buildings;for(let h=0;h<M.length;h+=8){let f=M[h+7];if(f!==Oe.shop&&f!==Oe.konbini&&f!==Oe.apartment||w(M[h]+s,M[h+2]+l)>(f===Oe.apartment?.12:.3))continue;let p=Math.cos(M[h+6]),x=Math.sin(M[h+6]),v=M[h+3]/2-.7,S=M[h+5]/2+.42;_.push([M[h]+v*p+S*x,M[h+1]-M[h+4]/2,M[h+2]-v*x+S*p,M[h+6]])}let I=h=>{let f=[],p=[],x=[];for(let[S,A,D,C,U]of h){let k=Math.cos(U),W=Math.sin(U),O=f.length/3;for(let F=0;F<S.p.length;F+=3)f.push(A+S.p[F]*k+S.p[F+2]*W,D+S.p[F+1],C-S.p[F]*W+S.p[F+2]*k),p.push(S.n[F]*k+S.n[F+2]*W,S.n[F+1],-S.n[F]*W+S.n[F+2]*k);for(let F of S.i)x.push(O+F)}let v=new dt;return v.setAttribute("position",new Re(f,3)),v.setAttribute("normal",new Re(p,3)),v.setIndex(x),v.computeBoundingSphere(),v};if(d.concrete.length)for(let[h,f]of[[d.concrete,t.poles.mats.concrete],[d.metal,t.poles.mats.metal]]){let p=new ct(I(h),f);p.castShadow=f===t.poles.mats.concrete,p.receiveShadow=!0,n.add(p),f!==t.poles.mats.concrete&&(p.name="cityPoleArms")}let T=new at,R=new ha,L=new ne,P=new ne(0,1,0),y=new ne(1,1,1);if(_.length){let h=new ft(t.vendGeo,t.vendMats,_.length);_.forEach(([f,p,x,v],S)=>h.setMatrixAt(S,T.compose(L.set(f,p,x),R.setFromAxisAngle(P,v),y))),h.computeBoundingSphere(),h.castShadow=!0,h.receiveShadow=!0,h.name="vending",n.add(h)}if(b.length){let h=new ft(t.signal.body,t.signalBody,b.length);b.forEach((f,p)=>h.setMatrixAt(p,T.compose(L.set(f.x,f.y,f.z),R.setFromAxisAngle(P,f.yaw),y))),h.computeBoundingSphere(),h.castShadow=!0,h.receiveShadow=!0,h.name="signals",n.add(h);for(let f of[!0,!1]){let p=b.filter(v=>v.go===f);if(!p.length)continue;let x=new ft(f?t.signal.go:t.signal.stop,t.signalLens,p.length);p.forEach((v,S)=>x.setMatrixAt(S,T.compose(L.set(v.x,v.y,v.z),R.setFromAxisAngle(P,v.yaw),y))),x.computeBoundingSphere(),x.castShadow=!1,x.receiveShadow=!1,x.name="signalLens",x.userData.noAO=!0,n.add(x)}}if(m.length){let h=Ba(m);h.name="cityWires",n.add(h)}return o&&g.length&&n.add(Fo(g,o)),n}var no={lamp:1,window:.55};function M0(a,e,t){let o=[],i=(n,s,l)=>{for(let c=0;c<n.length;c+=3)o.push(n[c],n[c+1],n[c+2],s.r,s.g,s.b,l)};i(Jl(a,t),yo[0],no.lamp),i(y0(a.world),yo[1],no.lamp);let r=S0(a.world);for(let n=0;n<r.length;n+=6)o.push(r[n],r[n+1],r[n+2],r[n+3],r[n+4],r[n+5],no.window);return ql(e,new Float32Array(o))}var Mt={fogHalf:14e3,fogFalloff:1/600,sunColor:16773340,moonColor:11122920,toneMapping:4,exposureMul:.97},fa={ultra:{ao:!0,bloom:!0,msaa:4,shadow:{splits:[12,60,300],maxFar:2500,mapSize:2048},forest:1,lamps:10,water:!0,scale:1},high:{ao:!1,bloom:!0,msaa:4,shadow:{splits:[12,60,300],maxFar:2500,mapSize:2048},forest:1,lamps:10,water:!0,scale:1},balanced:{ao:!0,bloom:!0,msaa:0,shadow:{splits:[18],maxFar:500,mapSize:1536},forest:1,lamps:6,water:!0,scale:1,perf:{aoScale:.5,aoSamples:8,bloomScale:.5,fxaa:!0,stagger:!0,dynamic:{min:.5,target:55}}},medium:{ao:!1,bloom:!1,msaa:0,shadow:{splits:[14],maxFar:350,mapSize:1024},forest:.6,lamps:6,water:!0,scale:.75},low:{ao:!1,bloom:!1,msaa:0,shadow:null,forest:.25,lamps:4,water:!1,scale:.5}},dr={below:40,scale:.001},co=512,ur={ground:3,far:5},hr=1,pr=2,mr=3,_0=5,C0=30;async function P0(a,e,t=250){let o=(e?.dems||[]).slice(0,4),i=(await Promise.all(o.map((r,n)=>T0(a,e,r,n,t)))).filter(Boolean);return i.length?(r,n)=>{for(let s of i){let l=s(r,n);if(l)return l}return null}:null}async function T0(a,e,t,o,i){let r=await fetch(`${a}world/regions/${t.id}_photo.jpg`).catch(()=>null);if(!r?.ok)return null;let n=await createImageBitmap(await r.blob()),s=new Tt(await createImageBitmap(n));s.flipY=!1,s.anisotropy=4,s.needsUpdate=!0;{let[g,_,b]=[[Ve.tPhoto,Ve.uPhotoRect,Ve.uPhotoOn],[Ve.tPhoto2,Ve.uPhotoRect2,Ve.uPhotoOn2],[Ve.tPhoto3,Ve.uPhotoRect3,Ve.uPhotoOn3],[Ve.tPhoto4,Ve.uPhotoRect4,Ve.uPhotoOn4]][o];g.value=s,_.value.set([t.x0,t.z0,t.x1,t.z1]),b.value=1}let l=Math.max(2,Math.round((t.x1-t.x0)/i)),c=Math.max(2,Math.round((t.z1-t.z0)/i)),u=new OffscreenCanvas(l,c).getContext("2d");u.imageSmoothingQuality="high",u.drawImage(n,0,0,l,c),n.close();let d=u.getImageData(0,0,l,c).data,m=g=>Math.pow(g/255,2.2);return(g,_)=>{let b=(g-t.x0)/(t.x1-t.x0),w=(_-t.z0)/(t.z1-t.z0);if(!(b>=0&&w>=0&&b<=1&&w<=1))return null;let M=4*(Math.min(c-1,Math.floor(w*c))*l+Math.min(l-1,Math.floor(b*l))),I=kt(0,1500,Math.min(g-t.x0,t.x1-g,_-t.z0,t.z1-_))*e.weight(g,_);return t.id==="kanto"&&(I*=1-kt(560,640,d[M]+d[M+1]+d[M+2])),[I,m(d[M]),m(d[M+1]),m(d[M+2])]}}async function k0({renderer:a,scene:e,camera:t,session:o,mats:i,oldSun:r,groups:n,base:s,off:l=new Set,tod:c="day",quality:u="ultra",sun:d=null}){let m=c==="cycle",g=Qt[Mr()]||Qt.clear,_=Do(),b=ho(m?No(d?.el??42,d?.az??235):mt[c]||mt.day),w=structuredClone(fa[u]||fa.ultra);Pt.uSnow.value=_==="winter"?1:0,Pt.uSnowFall.value=_==="winter"&&g.precip>0?1:0,Pt.uAutumn.value=_==="autumn"?1:0,Pt.uSpring.value=_==="spring"?1:0,Pt.uWet.value=Math.max(g.wet,_==="winter"?.45:0);for(let V of(new URLSearchParams(globalThis.location?.search||"").get("gfxset")||"").split(",")){let[re,Q]=V.split(":"),le=Number(Q);re&&Number.isFinite(le)&&(re==="scale"||re==="forest"||re==="lamps"?w[re]=le:w.shadow&&re==="shadowfar"?w.shadow.maxFar=le:w.shadow&&re==="shadowmap"?w.shadow.mapSize=le:w.shadow&&re==="cascades"&&(w.shadow.splits=w.shadow.splits.slice(0,Math.max(1,le))))}ta.near=w.forest,w.scale!==1&&a.setPixelRatio(a.getPixelRatio()*w.scale),l.has("shadow")||!w.shadow||b.sunToSky===0&&!m?a.shadowMap.enabled=!1:a.shadowMap.type=2,ta.shadows=a.shadowMap.enabled,l.has("bloom")&&(w.bloom=!1);let[M,I,T]=await Promise.all([_l(s,bl),Al(s),Gl(a,s)]),R=Oi(o.world,31,Ci(o.graph)),L=Br(),P=new Map,y=Kl();{let V={d:0,road:-1,s:0},re=(Q,le,Se)=>{let Te=Math.min(1,Math.max(0,(Se-Q)/(le-Q)));return Te*Te*(3-2*Te)};R.roadBelt=(Q,le)=>(o.height.nearestRoad(Q,le,Pa.beltTo+10,V),V.d===1/0?0:(1-re(Pa.beltFrom,Pa.beltTo,V.d))*re(0,6,V.d)),R.roadDist=(Q,le)=>(o.height.nearestRoad(Q,le,Pa.beltTo+10,V),V.d)}!l.has("roadside")&&!l.has("warm")&&Ql(o,L);let h=l.has("grass")||_==="winter"?null:Vl();_==="autumn"&&h?.mat?.color.set(10260312),i.ground.dispose(),i.ground=Rl(M,null);let f=v0();n0(s),L.vend={geo:f.vendGeo,mats:f.vendMats},i.box.mat.dispose(),i.box.mat=f.facade,i.cityGround.dispose(),i.cityGround=f.ground,i.cityLane.dispose(),i.cityLane=f.lanes,i.parapet.dispose(),i.parapet=f.parapet,i.water&&=(i.water.dispose(),f.water),i.road.map?.dispose(),i.road.dispose(),i.road=I,i.groundAttrs=function*(V,re){let Q=V.terrain,le=Q.nx*Q.nz,Se=V.forestCache||R,Te=Qo(Q,V.origin,Se,null,0,0);for(let K=0;K<le;K+=co)Te=Qo(Q,V.origin,Se,Te,K,Math.min(le,K+co)),K+co<le&&(yield);re.setAttribute("splatA",new Wt(Te.a,4)),re.setAttribute("splatB",new Wt(Te.b,4))};let p=vo(a,b,{sunColor:Mt.sunColor,moonColor:Mt.moonColor});g!==Qt.clear&&p.night&&p.mesh.material.uniforms.uStars&&(p.mesh.material.uniforms.uStars.value=0,p.mesh.material.uniforms.showMoon.value=0),Dr({sunDir:p.sunDir,sunColor:p.horizonSun,falloff:g.falloff??Mt.fogFalloff,dynamic:m,fogRef:p.horizonAway});let x=new vr(16777215,Math.LN2/g.fogHalf);x.color.copy(p.horizonAway),e.fog=x,e.add(p.mesh),e.background=null,e.environment=p.envMap,r.visible=!1,e.traverse(V=>{V.isHemisphereLight&&(V.visible=!1)});let v=p.skyIrradiance,S=b.sunToSky*v/Math.max(.05,p.sunDir.y),A=p.lightColor;ot.uDayLum.value=p.night?0:v*(1+b.sunToSky)/Math.PI,ot.uBounce.value.copy(A).multiplyScalar(S*Math.max(0,p.sunDir.y)*.1),a.toneMapping=Mt.toneMapping,a.toneMappingExposure=(b.rel?b.rel*Math.PI/(mo*(1+mt.day.sunToSky)):Math.PI/(v*(1+b.sunToSky)))*Mt.exposureMul;let D=Rr({scene:e,camera:t,sunDir:p.sunDir,intensity:S,color:A,...w.shadow||{splits:[20],maxFar:60,mapSize:256}}),C=3/a.toneMappingExposure;f.setLights(b.lights,C),y.setLights(b.lights,C),wo.value=b.lights>.2?b.lights*C*.6:0;let U=b.lights>.2?er(e,y,w.lamps):m&&w.lamps?er(e,y,Math.min(6,w.lamps)):null,k=new Map,W=U?M0(o,y,P):null;W&&e.add(W.mesh),t.near=.5,t.far=Jr?7e4:22e3,t.updateProjectionMatrix();let O=pa(o.world),F=Sl(o.regions?.kanto?(V,re)=>{let Q=o.height.naturalAt(V,re);if(Q<.3){for(let[le,Se]of[[180,0],[-180,0],[0,180],[0,-180]])if(o.regions.height(V+le,re+Se)>.3)return .35}return Q}:(V,re)=>o.height.naturalAt(V,re),{cityRadius:o.world.city?.radius??-1e9,edge:o.world.city?pt:1e9,city:o.world.city,ringRadius:0,built:(V,re)=>{let Q=O.urbanT(V,re);return Q<.85?1:Q>1.15?0:1-(Q-.85)/.3}});F.setLights(b.lights,C),F.mesh.renderOrder=ur.far,e.add(F.mesh),Ve.uPhotoHub.value=o.world.city?12e3:-1e6,Ve.uPhotoNear.value=o.world.city?0:1,P0(s,o.regions).then(V=>{V&&F.recolor(V),_==="winter"&&F.recolor((re,Q,le)=>[kt(150,600,le)*.85,.75,.77,.8])});let H=kl(o.world,{lights:b.lights,lampGain:C});m&&H.setLights(b.lights,C),e.add(H.group);let N=o.height.places,G=N.lakes.length&&!l.has("water")&&w.water?Gi(N,{sunDir:p.sunDir,sunColor:A.clone().multiplyScalar(S*.04),skyE:v}):null;if(G&&e.add(G.group),o.regions?.lakes?.length){let V=4e3,re=o.regions.lakeStrips(),Q=[];{let Y=new Map;for(let q of[...re].sort((ee,se)=>ee.x0-se.x0||ee.x1-se.x1||ee.z0-se.z0)){let ee=q.lv?null:q.lake.level+"|"+q.x0+"|"+q.x1,se=ee&&Y.get(ee);if(se&&Math.abs(se.z1-q.z0)<.001)se.z1=q.z1;else{let pe={x0:q.x0,x1:q.x1,z0:q.z0,z1:q.z1,lake:q.lake,lv:q.lv};Q.push(pe),ee&&Y.set(ee,pe)}}}let le=new Map;for(let Y of Q){let q=Math.floor((Y.x0+Y.x1)/2/V)+","+Math.floor((Y.z0+Y.z1)/2/V);(le.get(q)||le.set(q,[]).get(q)).push(Y)}let Se=F.mesh.geometry.getAttribute("position").constructor,Te=new F.mesh.material.constructor({color:2375756,roughness:.08,metalness:0,envMapIntensity:0}),K=new nt;Te.onBeforeCompile=Y=>{Y.fragmentShader=Y.fragmentShader.replace("#include <fog_fragment>",`#include <fog_fragment>
	#ifdef USE_FOG
	{
		float fr = pow( 1.0 - clamp( dot( normal, normalize( vViewPosition ) ), 0.0, 1.0 ), 5.0 );
		gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor * vec3( 0.9, 0.96, 1.04 ), clamp( 0.04 + 0.92 * fr, 0.0, 0.9 ) );
	}
	#endif`)},Te.customProgramCacheKey=()=>"regionLakeFresnel";for(let Y of le.values()){let q=new Float32Array(Y.length*12),ee=new Uint32Array(Y.length*6);Y.forEach((de,ve)=>{let Ye=de.lake.level+.15,Ie=de.lv?de.lv.map(Ae=>Ae+.15):[Ye,Ye,Ye,Ye];q.set([de.x0,Ie[0],de.z0,de.x1,Ie[1],de.z0,de.x0,Ie[2],de.z1,de.x1,Ie[3],de.z1],ve*12),ee.set([4*ve,4*ve+2,4*ve+1,4*ve+1,4*ve+2,4*ve+3],ve*6)});let se=new F.mesh.geometry.constructor;se.setAttribute("position",new Se(q,3)),se.setIndex(new Se(ee,1)),se.computeVertexNormals(),se.computeBoundingSphere();let pe=new F.mesh.constructor(se,Te);pe.name="regionLake",pe.userData.noAO=!o.regions?.kanto,pe.receiveShadow=!0,K.add(pe)}K.name="regionLakes",e.add(K)}let z=Nr(a,e,t,a.toneMappingExposure,{samples:l.has("msaa")?0:w.msaa,grading:!l.has("grade")});(l.has("ao")||!w.ao)&&(z.gtao.enabled=!1),(l.has("bloom")||!w.bloom)&&(z.bloom.enabled=!1),z.setNight(b.lights),z.grade.uniforms.uSat.value*=g.sat;let j=g.precip>0?Fl(_==="winter"?"snow":"rain",Math.max(.07,1-.93*Math.pow(b.lights,.6))):null;j&&e.add(j.mesh);let E=Ar({perf:l.has("perf")?void 0:w.perf,renderer:a,post:z,shadows:D,camera:t,splits:(w.shadow||{splits:[20]}).splits,maxFar:(w.shadow||{maxFar:60}).maxFar});!G&&N.lakes.length&&!l.has("water")&&e.add(Bi(N).group),l.has("far")&&(F.mesh.visible=!1);let $=new Map,oe=new Map,J=new Map,te=new Map,ie=!0,ce=!0,fe=0,ue=new Map,ye=new Map,Me=V=>{ue.delete(V);let re=ye.get(V);re&&($a(re),ye.delete(V))},ze=V=>{ue.has(V.id)||ue.set(V.id,We(V))};function*We(V){let re=performance.now(),Q=0,le=re,Se=0,Te=()=>{let ee=performance.now()-le;Q+=ee,Le.stageMs[Se]=Math.max(Le.stageMs[Se]||0,ee),Se++},K=()=>{let ee=performance.now()-le;Q+=ee,Le.stageMs[Se]=Math.max(Le.stageMs[Se]||0,ee)},Y=Ui(R,V);V.forestCache=Y;let q=Wi(V,i,{trees:!1,deferAttrs:!0});ye.set(V.id,q),q.traverse(ee=>{ee.isMesh&&(ee.castShadow=!0,ee.receiveShadow=!0)}),Te(),yield,le=performance.now();for(let ee of Y.prepare())K(),yield,le=performance.now();for(let ee of q.userData.groundAttrs||[]){let se=ee();if(se)for(;!se.next().done;)K(),yield,le=performance.now()}q.userData.groundAttrs=null,ye.delete(V.id);for(let ee of["road","rails","verge","cityGround","cityLanes","terrain"]){let se=q.getObjectByName(ee);se&&(se.castShadow=!1)}for(let ee of["terrain","verge"]){let se=q.getObjectByName(ee);se&&(se.renderOrder=ur.ground)}if(e.add(q),$.set(V.id,q),n.add(q),ie=!0,ce=!0,xe(q),Te(),yield,le=performance.now(),!l.has("forest")){let ee=Bl(V,Y,T.modelKinds),se;for(;;){let de=ee.next();if(de.done){se=de.value;break}K(),yield,le=performance.now()}Te(),yield,le=performance.now();let pe=Xo(se,T);q.add(pe.group),oe.set(V.id,pe),ce=!0,xe(q),Te(),yield,le=performance.now()}if(h){let ee=qo(se=>$l(V,Y,se),h);q.add(ee.group),J.set(V.id,ee),Te(),yield,le=performance.now()}if(!l.has("roadside")){let ee=e0(o,V,L,P,y),se;for(;;){let pe=ee.next();if(pe.done){se=pe.value;break}K(),yield,le=performance.now()}q.add(se),te.set(V.id,se),xe(se),Te(),yield,le=performance.now()}if(V.city){let ee=w0(o.world,V,f);if(ee&&q.add(ee),Te(),yield,le=performance.now(),V.city.poles?.length&&q.add(m0(V.city.poles,L,V.city.drops)),V.city.pa){let Ie=new nt,Ae=V.city.pa;if(Ie.name="placeProps",Ie.userData.heads=Ae.lamps,Ae.vend.length){let lt=new Kr(f.vendGeo,f.vendMats,Ae.vend.length/4),Bt=new at;for(let xt=0;xt<Ae.vend.length;xt+=4)lt.setMatrixAt(xt/4,Bt.makeRotationY(Ae.vend[xt+3]).setPosition(Ae.vend[xt],Ae.vend[xt+1],Ae.vend[xt+2]));lt.castShadow=!0,lt.receiveShadow=!0,lt.name="placeVending",lt.computeBoundingSphere(),Ie.add(lt)}q.add(Ie)}let se=fr(V.buildings,f);for(let Ie of se)Ie.castShadow=!1,q.add(Ie);q.userData.cityRoofs=se,Te(),yield,le=performance.now();let pe=g0(o.world,V,f);pe&&q.add(pe);let de=[];q.traverse(Ie=>{Ie.userData.cell&&(Ie.name==="cityDecor"||Ie.name==="shrubs")&&(Ie.castShadow=!1,de.push(Ie))}),q.userData.cityBoxes=q.getObjectByName("buildings")||null,q.userData.cityNear=de,q.userData.cityCrowns=pe?.getObjectByName("crowns")||null,q.userData.cityTrunks=pe?.getObjectByName("trunks")||null,q.userData.cityFar=[q.getObjectByName("cityGround"),q.getObjectByName("cityLanes"),q.getObjectByName("cityLines"),q.userData.cityTrunks].filter(Boolean);let ve=q.getObjectByName("buildings");if(ve)for(let Ie=0;Ie<V.buildings.length;Ie+=8)V.buildings[Ie+7]===Oe.pagoda&&(ve.setMatrixAt(Ie/8-V.city.farFrom,new at().makeScale(0,0,0)),ve.instanceMatrix.needsUpdate=!0);Te(),yield,le=performance.now();let Ye=b0(o.world,V,f,y);q.add(Ye),te.set(-1-V.id,Ye);for(let Ie of["cityPoleArms","cityWires"]){let Ae=Ye.getObjectByName(Ie);Ae&&q.userData.cityFar.push(Ae)}q.userData.cityFarOn=void 0}if(ce=!0,xe(q),Te(),Le.showMs=Q,Le.showMsMax=Math.max(Le.showMsMax,Q),Le.shows++,U){q.updateMatrixWorld(!0);let ee=[],se=new ne;q.traverse(pe=>{let de=pe.userData.heads;if(de)for(let ve=0;ve<de.length;ve+=4)se.set(de[ve],de[ve+1],de[ve+2]).applyMatrix4(pe.matrixWorld),ee.push(se.x,se.y,se.z,de[ve+3])}),ee.length&&k.set(V.id,new Float32Array(ee))}}let xe=V=>V.traverse(re=>{re.matrixAutoUpdate&&(re.updateMatrix(),re.matrixAutoUpdate=!1,re.matrixWorldNeedsUpdate=!0);let Q=re;if(!Q.isInstancedMesh||Q.userData.instReady)return;Q.userData.instReady=!0;let le=Array.isArray(Q.material)?Q.material:[Q.material];Q.renderOrder===0&&!le.some(Se=>Se.transparent)&&(Q.renderOrder=Q.instanceColor?2:1),Q.castShadow&&!Q.customDepthMaterial&&!le.some(Se=>Se.alphaTest>0||Se.alphaMap||Se.displacementMap)&&(Q.customDepthMaterial=Q.instanceColor?we:T.instDepth)}),we=new gr;we.name="worldInstDepthColor";function Ue(V,re){if(!ue.size)return;let Q=performance.now(),le=[...ue.keys()].sort((Te,K)=>$e(Te,V,re)-$e(K,V,re)),Se=$e(le[0],V,re)<=hr?C0:_0;for(let Te of le){let K=ue.get(Te);if(K){for(;;){if(K.next().done){ue.delete(Te);break}if(performance.now()-Q>=Se)return}if(performance.now()-Q>=Se)return}}}let $e=(V,re,Q)=>{let le=V%ut,Se=(V-le)/ut;return Math.max(Math.abs(le-re),Math.abs(Se-Q))};function B(V,re){let Q=Math.floor((V+pt)/500),le=Math.floor((re+pt)/500);for(let[K,Y]of $){let q=K%ut,ee=(K-q)/ut,se=o.streamer.tileAt(q,ee);if(Math.max(Math.abs(q-Q),Math.abs(ee-le))<mr&&se&&se.data&&se.data.id===K)continue;let pe=oe.get(K);pe&&(pe.dispose(),oe.delete(K));let de=J.get(K);de&&(de.dispose(),J.delete(K));for(let ve of[K,-1-K]){let Ye=te.get(ve);Ye&&(or(Ye),te.delete(ve))}$.delete(K),n.delete(Y),k.delete(K),$a(Y),ie=!0,Me(K)}for(let K of ue.keys()){let Y=K%ut,q=(K-Y)/ut;Math.max(Math.abs(Y-Q),Math.abs(q-le))>=mr&&Me(K)}let Se=null,Te=1/0;for(let K=-2;K<=pr;K++)for(let Y=-2;Y<=pr;Y++){let q=Q+Y,ee=le+K;if(q<0||ee<0||q>=ut||ee>=ut||$.has(ee*ut+q))continue;let se=o.streamer.tileAt(q,ee);if(!se||!se.data)continue;let pe=Math.max(Math.abs(Y),Math.abs(K));pe<=hr?ze(se.data):pe<Te&&(Te=pe,Se=se.data)}Se&&ze(Se)}let X=new WeakSet,Z=V=>{D.setup(V),V.isMeshStandardMaterial&&V.envMap&&V.envMap!==p.envMap&&!X.has(V)&&(X.add(V),V.envMap=p.envMap,V.needsUpdate=!0)},ae=V=>{let re=V.material;if(re)if(Array.isArray(re))for(let Q of re)Z(Q);else Z(re)};function*he(){let V=new nt;V.name="warmup",V.scale.setScalar(dr.scale),e.add(V),Ce=V;let re=K=>{V.add(K),xe(K),V.position.copy(t.position),V.position.y-=dr.below,V.traverse(Y=>{Y.frustumCulled=!1}),V.updateMatrixWorld(!0),ce=!0,Le.warm++},Q=[];if(!l.has("forest")){let K=500/tt.modelCells,Y=250+K/2,q=ta.near,ee=0;for(let de=1;de<=4&&!ee;de++){let ve=(de-.5)*K;ve>=tt.fullIn*q&&ve<tt.modelIn*q&&(ee=de)}let se=de=>()=>{let ve=Xo({sugi:[],sugi2:[],broad:[],sasa:[],fern:[],take:[],...de},T);for(let Ye=0;Ye<8&&ve.update(Y,Y,999,null);Ye++);return{o:ve.group,dispose:()=>ve.dispose()}},pe=[Y,0,Y,12,0];for(let de of Object.keys(T.models))Q.push(se({[de]:ee?[...pe,Y+ee*K,0,Y,12,0]:pe}));Q.push(se({sasa:[Y,0,Y,1,0],fern:[Y,0,Y,1,0],...T.modelKinds.conifer.length?{}:{sugi:pe,sugi2:pe},...T.modelKinds.broad.length?{}:{broad:pe}}))}if(h){let K=h;Q.push(()=>{let Y=qo([250,0,250,1,1,0],K);return Y.update(250,250,999),{o:Y.group,dispose:()=>Y.dispose()}})}let le=(K,Y)=>()=>{K.traverse(q=>{q.isInstancedMesh&&q.dispose()});for(let q of Y)q.dispose()},Se=(K,Y,q)=>{let ee=new ka(1,1),se=new dt;se.setAttribute("position",new Re([0,0,0,1,0,0],3)),q.push(ee,se);for(let[pe,de]of Object.entries(Gr)){let ve=new ct(ee,K.mats[pe]);ve.castShadow=de,ve.receiveShadow=!0,Y.add(ve)}Y.add(Ba([0,0,0,1,0,0]))};Q.push(()=>{let K=new nt,Y=new ka(1,1),q=new ct(Y,i.road);return q.castShadow=!1,q.receiveShadow=!0,K.add(q),{o:K,dispose:()=>Y.dispose()}}),l.has("roadside")||Q.push(()=>{let K=new nt,Y=[];return Se(L,K,Y),K.add(Fo([[0,0,0,0,0],[3,0,0,0,1]],y)),{o:K,dispose:le(K,Y)}}),Q.push(()=>{let K=new nt,Y=[],q=new at,ee=(de,ve)=>{let Ye=new ft(de,ve,1);Ye.setMatrixAt(0,q),Ye.castShadow=!0,Ye.receiveShadow=!0,K.add(Ye)},se=i.box.geo.clone();se.setAttribute("aKind",new br(new Float32Array([Oe.shop]),1)),Y.push(se),ee(se,i.box.mat),ee(i.box.geo,i.parapet),ee(f.vendGeo,f.vendMats),ee(f.signal.body,f.signalBody);for(let de of[f.signal.go,f.signal.stop]){let ve=new ft(de,f.signalLens,1);ve.setMatrixAt(0,q),ve.userData.noAO=!0,K.add(ve)}for(let de of fr(new Float32Array([0,0,0,6,3,6,0,Oe.house,9,0,0,6,3,6,0,Oe.houseHip]),f))K.add(de);{let de=new ft(f.crownGeo,f.green,1);de.setMatrixAt(0,q),de.setColorAt(0,new ke(3364130)),de.castShadow=!0,de.receiveShadow=!0,K.add(de)}let pe=new ka(1,1);pe.setAttribute("color",new Wt(new Float32Array(12).fill(.5),3)),pe.setAttribute("aGround",new Wt(new Float32Array(4),1)),Y.push(pe);for(let de of[i.cityGround,i.cityLane,f.street]){let ve=new ct(pe,de);ve.receiveShadow=!0,ve.castShadow=!0,K.add(ve)}return{o:K,dispose:le(K,Y)}});for(let K of Q){let Y=K();Y&&(re(Y.o),yield,V.remove(Y.o),Y.dispose())}let Te=[];for(let K of e.children)(K.name==="lakes"||K.name==="landmarks")&&K.traverse(Y=>{Y.frustumCulled&&(Y.frustumCulled=!1,Te.push(Y))});Le.warm++,yield;for(let K of Te)K.frustumCulled=!0;e.remove(V),Ce=null}let Ce=null,_e=l.has("warm")?null:he(),Ze=new qe,me=new ne,Pe={fx:0,fz:1,cos:-2},Le={quality:fa[u]?u:"ultra",tod:c,lights:b.lights,visuals:0,farTriangles:0,sunIntensity:S,exposure:a.toneMappingExposure,skyIrradiance:v,ground:p.groundColor.toArray(),wallIrradiance:p.wallIrradiance,lampLights:0,farLights:W?W.count:0,showMs:0,showMsMax:0,shows:0,stageMs:[],warm:0},gt=0,je=null;const Qe=No,Xe=(V,re)=>V.rel?V.rel*Math.PI/(mo*(1+mt.day.sunToSky)):Math.PI/(re*(1+(V.sunToSky??0)));function Ge(V){if(!V._a)return Xe(V,v);let re=Math.log(Xe(V._a===mt.day?{sunToSky:V.sunToSky}:V._a,v)),Q=Math.log(Xe(V._b===mt.day?{sunToSky:V.sunToSky}:V._b,v));return Math.exp(re+(Q-re)*V._k)}function Rt(V){let re=ho(V),Q=vo(a,re,{sunColor:Mt.sunColor,moonColor:Mt.moonColor});g!==Qt.clear&&Q.night&&Q.mesh.material.uniforms.uStars&&(Q.mesh.material.uniforms.uStars.value=0,Q.mesh.material.uniforms.showMoon.value=0),e.remove(p.mesh),p.dispose(),e.add(Q.mesh),p=Q,b=re,e.environment=p.envMap,v=p.skyIrradiance,S=b.sunToSky*v/Math.max(.05,p.sunDir.y),A=p.lightColor,x.color.copy(p.horizonAway),ot.uDayLum.value=p.night?0:v*(1+b.sunToSky)/Math.PI,ot.uBounce.value.copy(A).multiplyScalar(S*Math.max(0,p.sunDir.y)*.1),a.toneMappingExposure=Ge(V)*Mt.exposureMul,C=3/a.toneMappingExposure,z.bloom&&(z.bloom.threshold=2.5/a.toneMappingExposure);let le=b.lights;f.setLights(le,C),y.setLights(le,C),wo.value=le>.2?le*C*.6:0,F.setLights(le,C),H.setLights(le,C),z.setNight(le),z.grade.uniforms.uSat.value*=g.sat,D.csm.lightDirection.copy(p.sunDir).negate();for(let Se of D.csm.lights)Se.color.copy(A),Se.intensity=S;Object.assign(Le,{tod:"cycle",lights:le,sunIntensity:S,exposure:a.toneMappingExposure,skyIrradiance:v})}let _a=new ne;function Qr({el:V,az:re}){if(!m)return;let Q=V<=-6;if(!je||Q!==je.night||Math.abs(V-je.el)>2||Q&&!je.night){je={el:V,az:re,night:Q},Rt(Qe(V,re));return}if(!Q&&!p.night){let le=re*Math.PI/180,Se=V*Math.PI/180;_a.set(Math.sin(le)*Math.cos(Se),Math.sin(Se),-Math.cos(le)*Math.cos(Se)),p.sunDir.copy(_a),p.mesh.material.uniforms.sunPosition?.value.copy(_a),D.csm.lightDirection.copy(_a).negate()}}return{info:Le,perf:E.info,setRenderScale:E.setScale,setTime:Qr,setSpeed(V,re=.016){let Q=Math.min(1,Math.max(0,(V-25)/145));Q=Q*(2-Q),gt+=(Q-gt)*Math.min(1,re*4),z.grade.uniforms.uSpeedBlur.value=gt*.85},update(V,re,Q){B(V,re),ot.uNearC.value[0]=V,ot.uNearC.value[1]=re,_o.uRes.value[0]=a.domElement.width*.5*(E.info.scale||1),_o.uRes.value[1]=a.domElement.height*.5*(E.info.scale||1);let le=Math.floor((V+pt)/500),Se=Math.floor((re+pt)/500);Ue(le,Se);for(let[K,Y]of $){let q=$e(K,le,Se);Y.userData.noAO=q>1;{let Ae=Y.userData.terrainMesh||(Y.userData.terrainMesh=Y.getObjectByName("terrain")||null),lt=K%ut,Bt=(K-lt)/ut,xt=Math.max(lt*500-pt-V,0,V-(lt+1)*500+pt),va=Math.max(Bt*500-pt-re,0,re-(Bt+1)*500+pt),ga=xt*xt+va*va,ia=(wa,Kt,Va)=>wa?ga>Va:ga>Kt,Ca=ia(Ae?.userData.isCoarse>=2,16e5,13e5)?2:ia(Ae?.userData.isCoarse>=1,14e4,105e3)?1:0;Ae&&Ae.userData.coarse&&Ae.userData.isCoarse!==Ca&&(Ae.userData.isCoarse=Ca,Ae.geometry.setIndex(Ca===2?Ae.userData.coarse4:Ca===1?Ae.userData.coarse:Ae.userData.fine));let xa=Y.userData.railsMesh===void 0?Y.userData.railsMesh=Y.getObjectByName("rails")||null:Y.userData.railsMesh,Lo=xa?!ia(!xa.visible,115e3,9e4):!1;if(xa&&xa.visible!==Lo&&(xa.visible=Lo),Y.userData.cityBoxes){let wa=Y.userData.cityHidden|0,Kt=ia(wa>=3,28e4,22e4)+ia(wa>=2,14e4,105e3)+ia(wa>=1,72e3,54e3);if(Y.userData.cityHidden!==Kt){Y.userData.cityHidden=Kt,Y.userData.cityBoxes.visible=Kt<3;for(let Va of Y.userData.cityRoofs||[])Va.visible=Kt<2;Y.userData.cityCrowns&&(Y.userData.cityCrowns.visible=Kt<1)}}}let ee=K%ut,se=(K-ee)/ut,pe=Math.max(ee*500-pt-V,0,V-(ee+1)*500+pt),de=Math.max(se*500-pt-re,0,re-(se+1)*500+pt),ve=pe*pe+de*de,Ye=q<=2&&ve<16e4;if(Y.userData.cityFar&&Y.userData.cityFarOn!==Ye){Y.userData.cityFarOn=Ye;for(let Ae of Y.userData.cityFar)Ae.visible=Ye}Y.userData.cityBoxes&&Y.userData.cityBoxes.castShadow!==Ye&&(Y.userData.cityBoxes.castShadow=Ye);let Ie=q<=1&&ve<12100;if(Y.userData.cityNear){if(q<=1){let Ae=V-Y.position.x,lt=re-Y.position.z;for(let Bt of Y.userData.cityNear){if(Bt.userData.hold)continue;let xt=Bt.userData.cell,va=Math.max(xt[0]-Ae,0,Ae-xt[2]),ga=Math.max(xt[1]-lt,0,lt-xt[3]);Bt.visible=va*va+ga*ga<12100}Y.userData.cityCellsOff=!1}else if(!Y.userData.cityCellsOff){Y.userData.cityCellsOff=!0;for(let Ae of Y.userData.cityNear)Ae.visible=!1}}if(Y.userData.cityNear&&Y.userData.cityNearOn!==Ie){Y.userData.cityNearOn=Ie;let Ae=Y.userData.cityCrowns;Ae&&(Ae.castShadow=Ie,Ae.geometry=Ie?f.crownGeo:f.crownFarGeo);for(let lt of Y.userData.cityRoofs||[])lt.castShadow=!1,lt.geometry=lt.name==="roofsHip"?Ie?f.hipGeo:f.hipFarGeo:Ie?f.roofGeo:f.roofFarGeo}}ie&&=(F.setDetailed(K=>$.has(K)),H.setDetailed(K=>$.has(K)),!1),F.follow(t.position.x,t.position.z);let Te=3;t.getWorldDirection(me);{let K=Math.hypot(me.x,me.z);Pe.cos=K<.35?-2:Math.cos(Math.min(Math.PI,Math.ceil((Math.atan(Math.tan(t.fov*Math.PI/360)*t.aspect)+.32)*12)/12)),Pe.fx=K>0?me.x/K:0,Pe.fz=K>0?me.z/K:1}for(let[K,Y]of oe){let q=$.get(K);if(!q||Te<=0)break;let ee=Y.update(t.position.x-q.position.x,t.position.z-q.position.z,Te,Pe);ee&&(ce=!0),Te-=ee}if(T.setTime(Q/1e3),h){h.setTime(Q/1e3);let K=3;for(let[Y,q]of J){let ee=$.get(Y);if(!ee||K<=0)break;K-=q.update(t.position.x-ee.position.x,t.position.z-ee.position.z,K)}}p.update(t,Q/1e3),j?.update(t,Q/1e3);{let K=new ne().copy(p.sunDir).add(t.position).project(t),Y=p.sunDir.dot(t.getWorldDirection(new ne))>0,q=(K.x+1)/2,ee=(K.y+1)/2,se=Math.max(0,1-Math.max(Math.abs(K.x),Math.abs(K.y))/1.6);z.setSun(q,ee,Y&&b.sunToSky>0?se*(b.lights>.5?.3:1):0)}if(G?.update(Q/1e3),U&&(U.update(t,k.values()),Le.lampLights=U.active),W){let K=Math.floor((V+pt)/500),Y=Math.floor((re+pt)/500),q=0;for(let ee=-2;ee<=2;ee++)for(let se=-2;se<=2;se++){let pe=K+se,de=Y+ee;pe>=0&&de>=0&&pe<ut&&de<ut&&$.has(de*ut+pe)&&(q|=1<<(ee+2)*5+se+2)}W.setNear(K,Y,q)}y.setView(t.fov,a.getDrawingBufferSize(Ze).y),_e&&_e.next().done&&(_e=null),(ce||!(++fe&63))&&(e.traverse(ae),ce=!1),D.update(),E.tick(),Le.visuals=$.size,Le.farTriangles=F.info.triangles},post:z,rawRender:l.has("post"),render(){a.info.reset(),l.has("post")?a.render(e,t):z.render()},dispose(){for(let V of oe.values())V.dispose();for(let V of J.values())V.dispose();J.clear(),h?.dispose();for(let V of te.values())or(V);for(let V of[...ue.keys()])Me(V);_e=null,Ce?.removeFromParent(),we.dispose(),te.clear(),L.dispose(),f.dispose(),y.dispose(),U?.dispose(),W?.dispose(),G?.dispose(),k.clear();for(let V of $.values())n.delete(V),$a(V);oe.clear(),$.clear(),T.dispose(),z.dispose(),D.dispose(),F.dispose(),H.dispose(),p.dispose()}}}async function E0({renderer:a,scene:e,camera:t,oldSun:o,off:i=new Set,tod:r="day",quality:n="balanced",fogFar:s=1e3}){let l=Qt[Mr()]||Qt.clear,c=ho(mt[r]||mt.day),u=structuredClone(fa[n]||fa.balanced);u.scale!==1&&a.setPixelRatio(a.getPixelRatio()*u.scale),i.has("shadow")||!u.shadow||c.sunToSky===0?a.shadowMap.enabled=!1:(a.shadowMap.enabled=!0,a.shadowMap.type=2);let d=vo(a,c,{sunColor:Mt.sunColor,moonColor:Mt.moonColor});l!==Qt.clear&&d.night&&d.mesh.material.uniforms.uStars&&(d.mesh.material.uniforms.uStars.value=0,d.mesh.material.uniforms.showMoon.value=0),Dr({sunDir:d.sunDir,sunColor:d.horizonSun,falloff:l.falloff??Mt.fogFalloff});let m=new vr(16777215,Math.LN2/Math.min(l.fogHalf,Math.max(600,1.5*s)));m.color.copy(d.horizonAway),e.fog=m,e.add(d.mesh),e.background=null,e.environment=d.envMap,o.visible=!1,e.traverse(p=>{p.isHemisphereLight&&(p.visible=!1)});let g=d.skyIrradiance,_=c.sunToSky*g/Math.max(.05,d.sunDir.y),b=d.lightColor;a.toneMapping=Mt.toneMapping,a.toneMappingExposure=(c.rel?c.rel*Math.PI/(mo*(1+mt.day.sunToSky)):Math.PI/(g*(1+c.sunToSky)))*Mt.exposureMul;let w=Rr({scene:e,camera:t,sunDir:d.sunDir,intensity:_,color:b,...u.shadow||{splits:[20],maxFar:60,mapSize:256}});t.near=.5,t.far=3e4,t.updateProjectionMatrix();let M=Nr(a,e,t,a.toneMappingExposure,{samples:i.has("msaa")?0:u.msaa,grading:!i.has("grade")});(i.has("ao")||!u.ao)&&(M.gtao.enabled=!1),(i.has("bloom")||!u.bloom)&&(M.bloom.enabled=!1),M.setNight(c.lights),M.grade.uniforms.uSat.value*=l.sat;let I=Ar({perf:i.has("perf")?void 0:u.perf,renderer:a,post:M,shadows:w,camera:t,splits:(u.shadow||{splits:[20]}).splits,maxFar:(u.shadow||{maxFar:60}).maxFar}),T=new WeakSet,R=p=>{w.setup(p),p.isMeshStandardMaterial&&p.envMap&&p.envMap!==d.envMap&&!T.has(p)&&(T.add(p),p.envMap=d.envMap,p.needsUpdate=!0)},L=p=>{let x=p.material;x&&(Array.isArray(x)?x.forEach(R):R(x))},P=0,y=0,h=new ne,f=new ne;return{info:{quality:fa[n]?n:"balanced",tod:r,lights:c.lights,sunIntensity:_,exposure:a.toneMappingExposure,track:!0},perf:I.info,setRenderScale:I.setScale,setSpeed(p,x=.016){let v=Math.min(1,Math.max(0,(p-25)/145));v=v*(2-v),y+=(v-y)*Math.min(1,x*4),M.grade.uniforms.uSpeedBlur.value=y*.85},update(p,x,v){P++&63||e.traverse(L),d.update(t,v/1e3);let S=h.copy(d.sunDir).add(t.position).project(t),A=d.sunDir.dot(t.getWorldDirection(f))>0,D=Math.max(0,1-Math.max(Math.abs(S.x),Math.abs(S.y))/1.6);M.setSun((S.x+1)/2,(S.y+1)/2,A&&c.sunToSky>0?D*(c.lights>.5?.3:1):0),w.update(),I.tick()},post:M,rawRender:i.has("post"),render(){a.info.reset(),i.has("post")?a.render(e,t):M.render()},dispose(){M.dispose(),w.dispose(),d.dispose()}}}export{Mt as LOOK,fa as QUALITY,k0 as createBeautyWorld,E0 as createTrackLook};
