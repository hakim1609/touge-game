import{An as e,Bn as t,H as n,Hn as r,Kt as i,Mt as a,Nt as o,V as s,Vn as c,_t as l,at as u,gt as d,hr as f,ir as p,m,mr as h,ot as g,pr as _,vr as v,w as y,wt as b}from"./three.core-cHjUlQS7.js";import{r as x}from"./three.module-BqPlYAZQ.js";var S=class extends l{constructor(e,r={}){super(e),this.isWater=!0;let i=this,s=r.textureWidth===void 0?512:r.textureWidth,c=r.textureHeight===void 0?512:r.textureHeight,l=r.clipBias===void 0?0:r.clipBias,u=r.alpha===void 0?1:r.alpha,g=r.time===void 0?0:r.time,_=r.waterNormals===void 0?null:r.waterNormals,y=r.sunDirection===void 0?new h(.70707,.70707,0):r.sunDirection,b=new m(r.sunColor===void 0?16777215:r.sunColor),S=new m(r.waterColor===void 0?8355711:r.waterColor),C=r.eye===void 0?new h(0,0,0):r.eye,w=r.distortionScale===void 0?20:r.distortionScale,T=r.side===void 0?0:r.side,E=r.fog!==void 0&&r.fog,D=new o,O=new h,k=new h,A=new h,j=new d,M=new h(0,0,-1),N=new f,P=new h,F=new h,I=new f,L=new d,R=new a,z=new v(s,c,{type:n}),B={name:`MirrorShader`,uniforms:p.merge([x.fog,x.lights,{normalSampler:{value:null},mirrorSampler:{value:null},alpha:{value:1},time:{value:0},size:{value:1},distortionScale:{value:20},textureMatrix:{value:new d},sunColor:{value:new m(8355711)},sunDirection:{value:new h(.70707,.70707,0)},eye:{value:new h},waterColor:{value:new m(5592405)}}]),vertexShader:`
				uniform mat4 textureMatrix;
				uniform float time;

				varying vec4 mirrorCoord;
				varying vec4 worldPosition;

				#include <common>
				#include <fog_pars_vertex>
				#include <shadowmap_pars_vertex>
				#include <logdepthbuf_pars_vertex>

				void main() {
					mirrorCoord = modelMatrix * vec4( position, 1.0 );
					worldPosition = mirrorCoord.xyzw;
					mirrorCoord = textureMatrix * mirrorCoord;
					vec4 mvPosition =  modelViewMatrix * vec4( position, 1.0 );
					gl_Position = projectionMatrix * mvPosition;

				#include <beginnormal_vertex>
				#include <defaultnormal_vertex>
				#include <logdepthbuf_vertex>
				#include <fog_vertex>
				#include <shadowmap_vertex>
			}`,fragmentShader:`
				uniform sampler2D mirrorSampler;
				uniform float alpha;
				uniform float time;
				uniform float size;
				uniform float distortionScale;
				uniform sampler2D normalSampler;
				uniform vec3 sunColor;
				uniform vec3 sunDirection;
				uniform vec3 eye;
				uniform vec3 waterColor;

				varying vec4 mirrorCoord;
				varying vec4 worldPosition;

				vec4 getNoise( vec2 uv ) {
					vec2 uv0 = ( uv / 103.0 ) + vec2(time / 17.0, time / 29.0);
					vec2 uv1 = uv / 107.0-vec2( time / -19.0, time / 31.0 );
					vec2 uv2 = uv / vec2( 8907.0, 9803.0 ) + vec2( time / 101.0, time / 97.0 );
					vec2 uv3 = uv / vec2( 1091.0, 1027.0 ) - vec2( time / 109.0, time / -113.0 );
					vec4 noise = texture2D( normalSampler, uv0 ) +
						texture2D( normalSampler, uv1 ) +
						texture2D( normalSampler, uv2 ) +
						texture2D( normalSampler, uv3 );
					return noise * 0.5 - 1.0;
				}

				void sunLight( const vec3 surfaceNormal, const vec3 eyeDirection, float shiny, float spec, float diffuse, inout vec3 diffuseColor, inout vec3 specularColor ) {
					vec3 reflection = normalize( reflect( -sunDirection, surfaceNormal ) );
					float direction = max( 0.0, dot( eyeDirection, reflection ) );
					specularColor += pow( direction, shiny ) * sunColor * spec;
					diffuseColor += max( dot( sunDirection, surfaceNormal ), 0.0 ) * sunColor * diffuse;
				}

				#include <common>
				#include <packing>
				#include <bsdfs>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <lights_pars_begin>
				#include <shadowmap_pars_fragment>
				#include <shadowmask_pars_fragment>

				void main() {

					#include <logdepthbuf_fragment>
					vec4 noise = getNoise( worldPosition.xz * size );
					vec3 surfaceNormal = normalize( noise.xzy * vec3( 1.5, 1.0, 1.5 ) );

					vec3 diffuseLight = vec3(0.0);
					vec3 specularLight = vec3(0.0);

					vec3 worldToEye = eye-worldPosition.xyz;
					vec3 eyeDirection = normalize( worldToEye );
					sunLight( surfaceNormal, eyeDirection, 100.0, 2.0, 0.5, diffuseLight, specularLight );

					float distance = length(worldToEye);

					vec2 distortion = surfaceNormal.xz * ( 0.001 + 1.0 / distance ) * distortionScale;
					vec3 reflectionSample = vec3( texture2D( mirrorSampler, mirrorCoord.xy / mirrorCoord.w + distortion ) );

					float theta = max( dot( eyeDirection, surfaceNormal ), 0.0 );
					float rf0 = 0.02;
					float reflectance = rf0 + ( 1.0 - rf0 ) * pow( ( 1.0 - theta ), 5.0 );
					vec3 scatter = max( 0.0, dot( surfaceNormal, eyeDirection ) ) * waterColor;
					vec3 albedo = mix( ( sunColor * diffuseLight * 0.3 + scatter ) * getShadowMask(), reflectionSample + specularLight, reflectance );
					vec3 outgoingLight = albedo;
					gl_FragColor = vec4( outgoingLight, alpha );

					#include <tonemapping_fragment>
					#include <colorspace_fragment>
					#include <fog_fragment>	
				}`},V=new t({name:B.name,uniforms:p.clone(B.uniforms),vertexShader:B.vertexShader,fragmentShader:B.fragmentShader,lights:!0,side:T,fog:E});V.uniforms.mirrorSampler.value=z.texture,V.uniforms.textureMatrix.value=L,V.uniforms.alpha.value=u,V.uniforms.time.value=g,V.uniforms.normalSampler.value=_,V.uniforms.sunColor.value=b,V.uniforms.waterColor.value=S,V.uniforms.sunDirection.value=y,V.uniforms.distortionScale.value=w,V.uniforms.eye.value=C,i.material=V,i.onBeforeRender=function(e,t,n){if(k.setFromMatrixPosition(i.matrixWorld),A.setFromMatrixPosition(n.matrixWorld),j.extractRotation(i.matrixWorld),O.set(0,0,1),O.applyMatrix4(j),P.subVectors(k,A),P.dot(O)>0)return;P.reflect(O).negate(),P.add(k),j.extractRotation(n.matrixWorld),M.set(0,0,-1),M.applyMatrix4(j),M.add(A),F.subVectors(k,M),F.reflect(O).negate(),F.add(k),R.position.copy(P),R.up.set(0,1,0),R.up.applyMatrix4(j),R.up.reflect(O),R.lookAt(F),R.far=n.far,R.updateMatrixWorld(),R.projectionMatrix.copy(n.projectionMatrix),L.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),L.multiply(R.projectionMatrix),L.multiply(R.matrixWorldInverse),D.setFromNormalAndCoplanarPoint(O,k),D.applyMatrix4(R.matrixWorldInverse),N.set(D.normal.x,D.normal.y,D.normal.z,D.constant);let r=R.projectionMatrix;I.x=(Math.sign(N.x)+r.elements[8])/r.elements[0],I.y=(Math.sign(N.y)+r.elements[9])/r.elements[5],I.z=-1,I.w=(1+r.elements[10])/r.elements[14],N.multiplyScalar(2/N.dot(I)),r.elements[2]=N.x,r.elements[6]=N.y,r.elements[10]=N.z+1-l,r.elements[14]=N.w,C.setFromMatrixPosition(n.matrixWorld);let a=e.getRenderTarget(),o=e.xr.enabled,s=e.shadowMap.autoUpdate;i.visible=!1,e.xr.enabled=!1,e.shadowMap.autoUpdate=!1,e.setRenderTarget(z),e.state.buffers.depth.setMask(!0),e.autoClear===!1&&e.clear(),e.render(t,R),i.visible=!0,e.xr.enabled=o,e.shadowMap.autoUpdate=s,e.setRenderTarget(a);let c=n.viewport;c!==void 0&&e.state.viewport(c)}}},C={mirror:1024,ripple:5,distortion:1.4,deep:1854034,segments:96,over:3};function w(e,t){let n=[];for(let r=0;r<C.segments;r++){let i=r/C.segments*2*Math.PI,a=Math.cos(i),o=Math.sin(i),s=e.shoreR(t,a,o)+C.over;n.push(new _(a*s,-o*s))}return new r(new c(n))}function T(t=256){let n=[];for(let e=0;e<14;e++){let t=t=>{let n=Math.sin(e*12.9898+t*78.233)*43758.5453;return n-Math.floor(n)},r=Math.round((t(1)-.5)*22),i=Math.round((t(2)-.5)*22),a=Math.hypot(r,i)||1;n.push([r,i,.9/a,t(3)*6.283])}let r=new Uint8Array(t*t*4);for(let e=0;e<t;e++)for(let i=0;i<t;i++){let a=0,o=0;for(let[r,s,c,l]of n){let n=Math.cos(2*Math.PI*(r*i+s*e)/t+l)*c;a+=n*r,o+=n*s}let s=new h(-a*.08,-o*.08,1).normalize(),c=(e*t+i)*4;r[c]=(s.x*.5+.5)*255,r[c+1]=(s.y*.5+.5)*255,r[c+2]=(s.z*.5+.5)*255,r[c+3]=255}let a=new y(r,t,t,i);return a.wrapS=a.wrapT=e,a.minFilter=g,a.magFilter=u,a.generateMipmaps=!0,a.needsUpdate=!0,a}function E(e,{sunDir:t,sunColor:n,skyE:r}){let i=new s,a=T();i.name=`lakes`;let o=[];for(let s of e.lakes){let c=new S(w(e,s),{textureWidth:C.mirror,textureHeight:C.mirror,waterNormals:a,sunDirection:t.clone(),sunColor:16777215,waterColor:0,distortionScale:C.distortion,fog:!0}),l=c.material.uniforms;l.sunColor.value.copy(n),l.waterColor.value.set(C.deep).multiplyScalar(r/Math.PI),l.size.value=C.ripple,c.rotation.x=-Math.PI/2,c.position.set(s.x,s.level,s.z),c.name=`water:${s.id}`,c.userData.noAO=!0,i.add(c),o.push(c)}return{group:i,update(e){for(let t of o)t.material.uniforms.time.value=e},dispose(){i.removeFromParent(),a.dispose();for(let e of o)e.geometry.dispose(),e.material.dispose()}}}function D(e){let t=new s,n=new b({color:C.deep,roughness:.12,metalness:.3});t.name=`lakes`;for(let r of e.lakes){let i=new l(w(e,r),n);i.rotation.x=-Math.PI/2,i.position.set(r.x,r.level,r.z),t.add(i)}return{group:t,dispose(){t.removeFromParent(),n.dispose(),t.traverse(e=>e.geometry?.dispose())}}}export{D as createLakeFlat,E as createLakeWater};