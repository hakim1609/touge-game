import{A as V,u as q,C as $,U as f,b as G,D as J,r as X,d as Y,l as ee,K as k,W as I,p as re,f as oe,y as te,P as j,a7 as E,n as ae,a8 as ie,a9 as U,aa as ne,ab as le,H as se}from"./three.module-XOnEzjVc.js";var ue=class extends ${constructor(i,e={}){super(i),this.isWater=!0;let a=this,r=e.textureWidth===void 0?512:e.textureWidth,o=e.textureHeight===void 0?512:e.textureHeight,l=e.clipBias===void 0?0:e.clipBias,s=e.alpha===void 0?1:e.alpha,t=e.time===void 0?0:e.time,n=e.waterNormals===void 0?null:e.waterNormals,c=e.sunDirection===void 0?new f(.70707,.70707,0):e.sunDirection,g=new k(e.sunColor===void 0?16777215:e.sunColor),D=new k(e.waterColor===void 0?8355711:e.waterColor),P=e.eye===void 0?new f(0,0,0):e.eye,F=e.distortionScale===void 0?20:e.distortionScale,z=e.side===void 0?0:e.side,H=e.fog!==void 0&&e.fog,h=new ie,w=new f,y=new f,T=new f,C=new I,b=new f(0,0,-1),p=new U,S=new f,N=new f,_=new U,L=new I,m=new re,R=new oe(r,o,{type:te}),W={name:"MirrorShader",uniforms:j.merge([E.fog,E.lights,{normalSampler:{value:null},mirrorSampler:{value:null},alpha:{value:1},time:{value:0},size:{value:1},distortionScale:{value:20},textureMatrix:{value:new I},sunColor:{value:new k(8355711)},sunDirection:{value:new f(.70707,.70707,0)},eye:{value:new f},waterColor:{value:new k(5592405)}}]),vertexShader:`
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
				}`},d=new ae({name:W.name,uniforms:j.clone(W.uniforms),vertexShader:W.vertexShader,fragmentShader:W.fragmentShader,lights:!0,side:z,fog:H});d.uniforms.mirrorSampler.value=R.texture,d.uniforms.textureMatrix.value=L,d.uniforms.alpha.value=s,d.uniforms.time.value=t,d.uniforms.normalSampler.value=n,d.uniforms.sunColor.value=g,d.uniforms.waterColor.value=D,d.uniforms.sunDirection.value=c,d.uniforms.distortionScale.value=F,d.uniforms.eye.value=P,a.material=d,a.onBeforeRender=function(u,K,M){if(y.setFromMatrixPosition(a.matrixWorld),T.setFromMatrixPosition(M.matrixWorld),C.extractRotation(a.matrixWorld),w.set(0,0,1),w.applyMatrix4(C),S.subVectors(y,T),S.dot(w)>0)return;S.reflect(w).negate(),S.add(y),C.extractRotation(M.matrixWorld),b.set(0,0,-1),b.applyMatrix4(C),b.add(T),N.subVectors(y,b),N.reflect(w).negate(),N.add(y),m.position.copy(S),m.up.set(0,1,0),m.up.applyMatrix4(C),m.up.reflect(w),m.lookAt(N),m.far=M.far,m.updateMatrixWorld(),m.projectionMatrix.copy(M.projectionMatrix),L.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),L.multiply(m.projectionMatrix),L.multiply(m.matrixWorldInverse),h.setFromNormalAndCoplanarPoint(w,y),h.applyMatrix4(m.matrixWorldInverse),p.set(h.normal.x,h.normal.y,h.normal.z,h.constant);let v=m.projectionMatrix;_.x=(Math.sign(p.x)+v.elements[8])/v.elements[0],_.y=(Math.sign(p.y)+v.elements[9])/v.elements[5],_.z=-1,_.w=(1+v.elements[10])/v.elements[14],p.multiplyScalar(2/p.dot(_)),v.elements[2]=p.x,v.elements[6]=p.y,v.elements[10]=p.z+1-l,v.elements[14]=p.w,P.setFromMatrixPosition(M.matrixWorld);let O=u.getRenderTarget(),Q=u.xr.enabled,Z=u.shadowMap.autoUpdate;a.visible=!1,u.xr.enabled=!1,u.shadowMap.autoUpdate=!1,u.setRenderTarget(R),u.state.buffers.depth.setMask(!0),u.autoClear===!1&&u.clear(),u.render(K,m),a.visible=!0,u.xr.enabled=Q,u.shadowMap.autoUpdate=Z,u.setRenderTarget(O);let A=M.viewport;A!==void 0&&u.state.viewport(A)}}},x={mirror:1024,ripple:5,distortion:1.4,deep:1854034,segments:96,over:3};function B(i,e){let a=[];for(let r=0;r<x.segments;r++){let o=r/x.segments*2*Math.PI,l=Math.cos(o),s=Math.sin(o),t=i.shoreR(e,l,s)+x.over;a.push(new se(l*t,-s*t))}return new ne(new le(a))}function me(i=256){let e=[];for(let o=0;o<14;o++){let l=c=>{let g=Math.sin(o*12.9898+c*78.233)*43758.5453;return g-Math.floor(g)},s=Math.round((l(1)-.5)*22),t=Math.round((l(2)-.5)*22),n=Math.hypot(s,t)||1;e.push([s,t,.9/n,l(3)*6.283])}let a=new Uint8Array(i*i*4);for(let o=0;o<i;o++)for(let l=0;l<i;l++){let s=0,t=0;for(let[g,D,P,F]of e){let z=Math.cos(2*Math.PI*(g*l+D*o)/i+F)*P;s+=z*g,t+=z*D}let n=new f(-s*.08,-t*.08,1).normalize(),c=(o*i+l)*4;a[c]=(n.x*.5+.5)*255,a[c+1]=(n.y*.5+.5)*255,a[c+2]=(n.z*.5+.5)*255,a[c+3]=255}let r=new G(a,i,i,J);return r.wrapS=r.wrapT=X,r.minFilter=Y,r.magFilter=ee,r.generateMipmaps=!0,r.needsUpdate=!0,r}function de(i,{sunDir:e,sunColor:a,skyE:r}){let o=new V,l=me();o.name="lakes";let s=[];for(let t of i.lakes){let n=new ue(B(i,t),{textureWidth:x.mirror,textureHeight:x.mirror,waterNormals:l,sunDirection:e.clone(),sunColor:16777215,waterColor:0,distortionScale:x.distortion,fog:!0}),c=n.material.uniforms;c.sunColor.value.copy(a),c.waterColor.value.set(x.deep).multiplyScalar(r/Math.PI),c.size.value=x.ripple,n.rotation.x=-Math.PI/2,n.position.set(t.x,t.level,t.z),n.name=`water:${t.id}`,n.userData.noAO=!0,o.add(n),s.push(n)}return{group:o,update(t){for(let n of s)n.material.uniforms.time.value=t},dispose(){o.removeFromParent(),l.dispose();for(let t of s)t.geometry.dispose(),t.material.dispose()}}}function fe(i){let e=new V,a=new q({color:x.deep,roughness:.12,metalness:.3});e.name="lakes";for(let r of i.lakes){let o=new $(B(i,r),a);o.rotation.x=-Math.PI/2,o.position.set(r.x,r.level,r.z),e.add(o)}return{group:e,dispose(){e.removeFromParent(),a.dispose(),e.traverse(r=>r.geometry?.dispose())}}}export{fe as createLakeFlat,de as createLakeWater};
