import{r as J,j as f,i as ie,k as se,c as P,m as ee,A as ae,H as ce}from"./index-BP3hJFkw.js";const ue=2,le=80,fe=14,me=.012,de=4,he=`#version 300 es
const vec2 P[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
void main() { gl_Position = vec4(P[gl_VertexID], 0.0, 1.0); }
`,ve=`#version 300 es
precision highp float;
uniform vec2 uRes; uniform float uTime; uniform vec3 uC1; uniform vec3 uC2; uniform float uSize; uniform float uAngle;
out vec4 o;
const float TAU = 6.28318530718;
const float LAYERS = ${le.toFixed(1)};
const float GAIN = 0.5;
const vec2 CENTRE = vec2(0.36, 0.52);
const float TILT = 2.4; const float ZOOM = 1.05; const float THETA = 2.12; const float SHEAR = 0.958; const float SHRINK = 0.95;
const vec2 WARP_FREQ = vec2(0.5, 2.7); const vec2 WARP_AMP = vec2(0.14, 0.03); const vec2 ASPECT = vec2(1.8, 0.2);
const float OFFSET = 0.33; const float GLOW = 0.0021; const float SOFT = 0.0019; const float FALLOFF = 0.37;
const float PHASE = 40.0; const float CYCLE = 0.16; const float HUE_TRAVEL = 2.0;
mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, s, -s, c); }
void main() {
  vec2 R = uRes;
  vec2 pos = (gl_FragCoord.xy - 0.5 * R) / R.y;
  pos = rot(uAngle) * pos / uSize;
  float t = uTime * 0.49 + PHASE;
  float breath = (-sin(uTime * 0.735) + sin(uTime * 0.49 + 1.0)) * 0.25 + 0.5;
  vec2 u = rot(TILT) * ((pos - CENTRE) * (ZOOM - breath * 0.085));
  mat2 fold = mat2(cos(THETA), sin(THETA), -SHEAR, cos(THETA));
  vec3 col = vec3(0.0);
  for (float i = 1.0; i <= LAYERS; i += 1.0) {
    u.x -= sin(u.y * WARP_FREQ.x + t + i * 0.007) * WARP_AMP.x;
    u.y -= sin(u.x * WARP_FREQ.y - t + i * 0.02) * WARP_AMP.y;
    u = fold * u * SHRINK;
    vec2 q = (u - vec2(OFFSET + breath * 0.1, 0.0)) * ASPECT;
    float g = GLOW / (dot(q, q) + SOFT) * (0.25 + breath * 0.4);
    float r = length(u);
    float k = sin(i * CYCLE + t * 1.2 + r * HUE_TRAVEL) * 0.5 + 0.5;
    col += g * mix(uC1, uC2, k) * (0.62 + 0.5 * k) * exp2(-r * FALLOFF);
  }
  vec3 x = max(col * GAIN, 0.0);
  col = (x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14);
  col = pow(clamp(col, 0.0, 1.0), vec3(0.85, 0.92, 0.98));
  col *= 1.0 - smoothstep(0.5, 1.6, length(pos)) * 0.07;
  o = vec4(col, 1.0);
}
`,xe=`#version 300 es
precision highp float;
uniform sampler2D uField; uniform vec2 uRes; uniform float uTime; uniform vec3 uBg; uniform float uPaper; uniform float uPR;
uniform vec2 uMouse; uniform float uOn; uniform float uReach; uniform vec2 uVel; uniform vec2 uTilt; uniform float uSplit;
out vec4 o;
const float NEAR_SPLIT = ${fe.toFixed(3)};
const float SMEAR = ${me.toFixed(4)};
float ign(vec2 p, float f) { p += 5.588238 * mod(f, 64.0); return fract(52.9829189 * fract(0.06711056 * p.x + 0.00583715 * p.y)); }
vec3 scene(vec2 uv) { return texture(uField, clamp(uv, 0.0, 1.0)).rgb; }
float near(vec2 p) { vec2 d = (p - uMouse) / (uPR * uReach); return uOn * exp(-dot(d, d)); }
vec3 rgb2hsv(vec3 c) {
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
  float d = q.x - min(q.w, q.y);
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + 1e-10)), d / (q.x + 1e-10), q.x);
}
vec3 hsv2rgb(vec3 c) {
  vec3 p = abs(fract(c.xxx + vec3(1.0, 2.0 / 3.0, 1.0 / 3.0)) * 6.0 - 3.0);
  return c.z * mix(vec3(1.0), clamp(p - 1.0, 0.0, 1.0), c.y);
}
vec3 prism(vec2 frag, vec2 uv) {
  float time = uTime * 0.22;
  float w = near(frag);
  float ang = time * 0.7 + uv.y * 1.6;
  vec2 dir = vec2(cos(ang), sin(ang)) * (1.0 - 0.5 * min(length(uTilt), 1.0)) + uTilt * 1.6;
  vec2 px = dir * uSplit;
  if (w > 1e-4) px += dir * NEAR_SPLIT * w + uVel * SMEAR * w;
  vec2 split = px * uPR / uRes;
  vec3 base = scene(uv);
  vec3 refr = vec3(scene(uv + split).r, base.g, scene(uv - split).b);
  float inten = length(base) * 0.57735;
  float presence = smoothstep(0.025, 0.2, inten);
  float phase = inten * 4.0 + dot(uv, vec2(1.6, -1.2)) + time + dot(uTilt, vec2(2.4, -1.6));
  float coat = smoothstep(0.04, 0.28, inten) * (1.0 - smoothstep(0.72, 1.0, inten));
  vec3 hsv = rgb2hsv(max(refr, 0.0));
  hsv.x += sin(phase) * (0.07 + 0.1 * w) * coat;
  hsv.y += (1.0 - hsv.y) * coat * 0.22 * smoothstep(0.04, 0.16, hsv.y);
  return mix(base, hsv2rgb(hsv), presence);
}
void main() {
  vec2 frag = gl_FragCoord.xy;
  vec3 L = max(prism(frag, frag / uRes), 0.0);
  vec3 dark = uBg + L * (1.0 - uBg);
  float strength = clamp(max(L.r, max(L.g, L.b)), 0.0, 1.0);
  vec3 paper = uBg * (1.0 - strength) + L * 0.96;
  vec3 col = mix(dark, paper, uPaper);
  col += (ign(frag, floor(uTime * 24.0)) - 0.5) / 255.0;
  o = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`,L={background:"#0A1030",color1:"#FF5FA2",color2:"#6C7BFF"},te="radial-gradient(90% 70% at 80% 90%, #c46bd6 0%, #5b4bd1 30%, #0a1030 70%)",H=new Map;function g(e){if(!e)return null;if(H.has(e))return H.get(e)??null;let n=e.trim();const r=n.match(/^var\(\s*--[^,]+,\s*(.+)\)$/);r&&(n=r[1].trim());let c=null;if(n.charAt(0)==="#"){let o=n.slice(1);if((o.length===3||o.length===4)&&(o=o[0]+o[0]+o[1]+o[1]+o[2]+o[2]),o.length>=6){const t=parseInt(o.slice(0,2),16),s=parseInt(o.slice(2,4),16),i=parseInt(o.slice(4,6),16);[t,s,i].every(Number.isFinite)&&(c=[t/255,s/255,i/255])}}else{const o=n.match(/^(rgba?|hsla?)\(([^)]*)\)/i);if(o){const t=o[2].split(/[\s,/]+/).filter(Boolean),s=i=>parseFloat(t[i]);if(t.length>=3&&[0,1,2].every(i=>Number.isFinite(s(i)))){if(o[1].toLowerCase().startsWith("rgb")){const i=u=>t[u].endsWith("%")?s(u)/100:s(u)/255;c=[i(0),i(1),i(2)]}else{const i=(s(0)%360+360)%360/360,u=s(1)/100,a=s(2)/100,v=a<.5?a*(1+u):a+u-a*u,l=2*a-v,d=x=>{let m=x;return m<0&&(m+=1),m>1&&(m-=1),m<1/6?l+(v-l)*6*m:m<1/2?v:m<2/3?l+(v-l)*(2/3-m)*6:l};c=[d(i+1/3),d(i),d(i-1/3)]}c=c.map(i=>Math.min(1,Math.max(0,i)))}}}return H.set(e,c),c}const h=(e,n,r)=>e<n?n:e>r?r:e,A=(e,n)=>typeof e=="number"&&Number.isFinite(e)?e:n;function oe(e,n,r){const c=(i,u)=>{const a=e.createShader(i);return a?(e.shaderSource(a,u),e.compileShader(a),e.getShaderParameter(a,e.COMPILE_STATUS)?a:(console.error(`PrismFilm ${r} shader:`,e.getShaderInfoLog(a)),e.deleteShader(a),null)):null},o=c(e.VERTEX_SHADER,he),t=c(e.FRAGMENT_SHADER,n);if(!o||!t)return null;const s=e.createProgram();return s?(e.attachShader(s,o),e.attachShader(s,t),e.linkProgram(s),e.deleteShader(o),e.deleteShader(t),e.getProgramParameter(s,e.LINK_STATUS)?s:(console.error(`PrismFilm ${r} link:`,e.getProgramInfoLog(s)),null)):null}function ne(e,n,r){const c={};for(const o of r)c[o]=e.getUniformLocation(n,o);return c}function pe(e){const n=e.createFramebuffer();let r=null,c=0,o=0,t=!!e.getExtension("EXT_color_buffer_float");return{fbo:n,texture:()=>r,width:()=>c,height:()=>o,resize(s,i){if(!(s===c&&i===o&&r)){for(let u=0;u<2;u++){r&&e.deleteTexture(r),r=e.createTexture(),e.bindTexture(e.TEXTURE_2D,r),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,t?e.RGBA16F:e.RGBA8,s,i,0,e.RGBA,t?e.HALF_FLOAT:e.UNSIGNED_BYTE,null),e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0);const a=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;if(e.bindFramebuffer(e.FRAMEBUFFER,null),a||!t)break;t=!1}c=s,o=i}},dispose(){r&&e.deleteTexture(r),e.deleteFramebuffer(n)}}}function Ee(e){const n={tx:0,ty:0,inside:!1},r=o=>{const t=e.getBoundingClientRect(),s=e.offsetWidth/(t.width||1),i=e.offsetHeight/(t.height||1);n.tx=(o.clientX-t.left)*s,n.ty=(o.clientY-t.top)*i,n.inside=o.clientX>=t.left&&o.clientX<=t.right&&o.clientY>=t.top&&o.clientY<=t.bottom},c=o=>{o.relatedTarget||(n.inside=!1)};return window.addEventListener("pointermove",r,{passive:!0}),window.addEventListener("pointerdown",r,{passive:!0}),document.addEventListener("pointerout",c),{p:n,dispose(){window.removeEventListener("pointermove",r),window.removeEventListener("pointerdown",r),document.removeEventListener("pointerout",c)}}}function Re(e,n){const r={background:n.background,color1:n.color1,color2:n.color2,speed:h(A(n.speed,50),0,100)/50,size:h(A(n.size,117),50,200)/100,angle:h(A(n.angle,119),-180,180)*Math.PI/180,split:h(A(n.split,40),0,40),hover:h(A(n.hover,100),0,200)/100,reach:h(A(n.reach,260),10,800)},c=A(n.startTime,0),o=document.createElement("canvas");o.setAttribute("aria-hidden","true"),Object.assign(o.style,{position:"absolute",inset:"0",width:"100%",height:"100%",display:"block",pointerEvents:"none"}),e.prepend(o);const t=o.getContext("webgl2",{antialias:!1,alpha:!1,depth:!1,stencil:!1});if(!t)return console.error("PrismFilm: WebGL2 unavailable"),e.style.background=te,o.remove(),()=>{};const s=oe(t,ve,"field"),i=oe(t,xe,"finish");if(!s||!i)return e.style.background=te,o.remove(),()=>{};const u=ne(t,s,["uRes","uTime","uC1","uC2","uSize","uAngle"]),a=ne(t,i,["uField","uRes","uTime","uBg","uPaper","uPR","uMouse","uOn","uReach","uVel","uTilt","uSplit"]),v=t.createVertexArray();t.bindVertexArray(v);const l=pe(t),d=Ee(e),x=d.p,m=typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches;let E=0,R=0,S=0,y=0,_=0,C=0,N=0,I=0,U=-1,M=c;const X=j=>{I=requestAnimationFrame(X);const p=U<0?0:h((j-U)/1e3,0,.05);if(U=j,document.hidden)return;M=(M+p*r.speed*(m?0:1))%3600;const G=Math.min(window.devicePixelRatio||1,ue),k=o.clientWidth||1200,w=o.clientHeight||800,F=Math.max(1,Math.round(k*G)),T=Math.max(1,Math.round(w*G));(o.width!==F||o.height!==T)&&(o.width=F,o.height=T),l.resize(Math.max(1,Math.round(F/2)),Math.max(1,Math.round(T/2)));const q=x.inside?1:0;q&&_<.02&&(E=x.tx,R=x.ty),_+=(q-_)*(1-Math.exp(-p*5));const W=1-Math.exp(-p*16),z=E+(x.tx-E)*W,V=R+(x.ty-R)*W;if(p>0){const Z=1-Math.exp(-p*8);S+=((z-E)/p-S)*Z,y+=((V-R)/p-y)*Z}E=z,R=V;const Y=Math.hypot(S,y)/w,K=Y>3?3/Y:1,O=_*r.hover,$=1-Math.exp(-p*de);C+=(h((E/k-.5)*2,-1,1)*O-C)*$,N+=(h((.5-R/w)*2,-1,1)*O-N)*$;const B=g(r.color1)??g(L.color1),D=g(r.color2)??g(L.color2),b=g(r.background)??g(L.background),re=.2126*b[0]+.7152*b[1]+.0722*b[2];t.bindFramebuffer(t.FRAMEBUFFER,l.fbo),t.viewport(0,0,l.width(),l.height()),t.useProgram(s),t.uniform2f(u.uRes,l.width(),l.height()),t.uniform1f(u.uTime,M),t.uniform3f(u.uC1,B[0],B[1],B[2]),t.uniform3f(u.uC2,D[0],D[1],D[2]),t.uniform1f(u.uSize,r.size),t.uniform1f(u.uAngle,r.angle),t.drawArrays(t.TRIANGLES,0,3);const Q=F/k;t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,F,T),t.useProgram(i),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,l.texture()),t.uniform1i(a.uField,0),t.uniform2f(a.uRes,F,T),t.uniform1f(a.uTime,M),t.uniform3f(a.uBg,b[0],b[1],b[2]),t.uniform1f(a.uPaper,h((re-.35)/.3,0,1)),t.uniform1f(a.uPR,Q),t.uniform2f(a.uMouse,E*Q,T-R*(T/w)),t.uniform1f(a.uOn,O),t.uniform1f(a.uReach,r.reach),t.uniform2f(a.uVel,S*K,-y*K),t.uniform2f(a.uTilt,C,N),t.uniform1f(a.uSplit,r.split),t.drawArrays(t.TRIANGLES,0,3)};return I=requestAnimationFrame(X),()=>{cancelAnimationFrame(I),d.dispose(),l.dispose(),t.deleteVertexArray(v),t.deleteProgram(s),t.deleteProgram(i),o.remove()}}function Te({background:e=L.background,color1:n=L.color1,color2:r=L.color2,speed:c=50,size:o=117,angle:t=119,split:s=40,hover:i=100,reach:u=260,startTime:a=18,className:v}){const l=J.useRef(null);return J.useEffect(()=>{const d=l.current;return d?(d.style.background=e,Re(d,{background:e,color1:n,color2:r,speed:c,size:o,angle:t,split:s,hover:i,reach:u,startTime:a})):void 0},[e,n,r,c,o,t,s,i,u,a]),f.jsx("div",{ref:l,"aria-hidden":"true",className:ie("absolute inset-0 overflow-hidden",v)})}const Ae=[.21,.47,.32,.98];function be(){const e=se(),n=P("landing.cta.title"),r=P("landing.cta.highlight"),c=n.indexOf(r);return f.jsx("section",{className:"mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24",children:f.jsxs(ee.div,{initial:e?!1:{opacity:0,y:40},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-80px"},transition:{duration:.8,ease:Ae},className:"force-dark relative isolate overflow-hidden rounded-4xl",children:[f.jsx(Te,{className:"absolute inset-0 -z-10",color1:"#8e65fd",color2:"#30c1d5"}),f.jsx("div",{className:"absolute inset-0 -z-10 bg-gradient-to-r from-background/85 via-background/50 to-transparent"}),f.jsxs("div",{className:"grid items-center gap-12 px-6 py-14 sm:px-12 sm:py-20 lg:grid-cols-2",children:[f.jsxs("div",{className:"flex flex-col items-start gap-6",children:[f.jsx("h2",{className:"text-4xl font-semibold tracking-tight text-balance sm:text-5xl",children:c>=0?f.jsxs(f.Fragment,{children:[n.slice(0,c),f.jsx("span",{className:"text-brand-gradient",children:r}),n.slice(c+r.length)]}):n}),f.jsx("p",{className:"max-w-md text-base text-muted-foreground sm:text-lg",children:P("landing.cta.subtitle")}),f.jsx(ae,{label:P("landing.hero.download")}),f.jsx("p",{className:"text-sm text-muted-foreground",children:P("landing.cta.note")})]}),f.jsx(ee.div,{animate:e?void 0:{y:[0,-14,0]},transition:{duration:6,repeat:1/0,ease:"easeInOut"},children:f.jsx(ce,{toggle:!1})})]})]})})}export{be as default};
