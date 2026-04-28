import{connect as He}from"cloudflare:sockets";var F="d342d11e-d424-4583-b36e-524ab1f0afa4";var C=["cdn.xn--b6gac.eu.org:443","cdn-all.xn--b6gac.eu.org:443"];function Y(t={}){let{UUID:e,SOCKS5:r,SOCKS5_RELAY:c,TROJAN_PASSWORD:p,PROXY_TIMEOUT:i,PROXY_FALLBACK:s,VLESS_OUTBOUND:a}=t,n=e||F;return{userID:n,trojanPassword:p||""||n,socks5Address:r||"",socks5Relay:c==="true"||!1,proxyIP:null,proxyPort:null,proxyType:null,parsedProxyAddress:null,proxyTimeout:i?parseInt(i,10):1500,enableProxyFallback:s!=="false"&&!0,vlessOutbound:a||"",parsedVlessOutbound:null}}async function G(t,e){let c=`
	  <!DOCTYPE html>
	  <html lang="en">
	  <head>
		  <meta charset="UTF-8">
		  <meta name="viewport" content="width=device-width, initial-scale=1.0">
		  <title>${e.headers.get("Host")} - Cloud Drive</title>
		  <style>
			  body {
				  font-family: Arial, sans-serif;
				  line-height: 1.6;
				  margin: 0;
				  padding: 20px;
				  background-color: #f4f4f4;
			  }
			  .container {
				  max-width: 800px;
				  margin: auto;
				  background: white;
				  padding: 20px;
				  border-radius: 5px;
				  box-shadow: 0 0 10px rgba(0,0,0,0.1);
			  }
			  h1 {
				  color: #333;
			  }
			  .file-list {
				  list-style-type: none;
				  padding: 0;
			  }
			  .file-list li {
				  background: #f9f9f9;
				  margin-bottom: 10px;
				  padding: 10px;
				  border-radius: 3px;
				  display: flex;
				  align-items: center;
			  }
			  .file-list li:hover {
				  background: #f0f0f0;
			  }
			  .file-icon {
				  margin-right: 10px;
				  font-size: 1.2em;
			  }
			  .file-link {
				  text-decoration: none;
				  color: #0066cc;
				  flex-grow: 1;
			  }
			  .file-link:hover {
				  text-decoration: underline;
			  }
			  .upload-area {
				  margin-top: 20px;
				  padding: 40px;
				  background: #e9e9e9;
				  border: 2px dashed #aaa;
				  border-radius: 5px;
				  text-align: center;
				  cursor: pointer;
				  transition: all 0.3s ease;
			  }
			  .upload-area:hover, .upload-area.drag-over {
				  background: #d9d9d9;
				  border-color: #666;
			  }
			  .upload-area h2 {
				  margin-top: 0;
				  color: #333;
			  }
			  #fileInput {
				  display: none;
			  }
			  .upload-icon {
				  font-size: 48px;
				  color: #666;
				  margin-bottom: 10px;
			  }
			  .upload-text {
				  font-size: 18px;
				  color: #666;
			  }
			  .upload-status {
				  margin-top: 20px;
				  font-style: italic;
				  color: #666;
			  }
			  .file-actions {
				  display: flex;
				  gap: 10px;
			  }
			  .delete-btn {
				  color: #ff4444;
				  cursor: pointer;
				  background: none;
				  border: none;
				  padding: 5px;
			  }
			  .delete-btn:hover {
				  color: #ff0000;
			  }
			  .clear-all-btn {
				  background-color: #ff4444;
				  color: white;
				  border: none;
				  padding: 10px 15px;
				  border-radius: 4px;
				  cursor: pointer;
				  margin-bottom: 20px;
			  }
			  .clear-all-btn:hover {
				  background-color: #ff0000;
			  }
		  </style>
	  </head>
	  <body>
		  <div class="container">
			  <h1>Cloud Drive</h1>
			  <p>Welcome to your personal cloud storage. Here are your uploaded files:</p>
			  <button id="clearAllBtn" class="clear-all-btn">Clear All Files</button>
			  <ul id="fileList" class="file-list">
			  </ul>
			  <div id="uploadArea" class="upload-area">
				  <div class="upload-icon">\u{1F4C1}</div>
				  <h2>Upload a File</h2>
				  <p class="upload-text">Drag and drop a file here or click to select</p>
				  <input type="file" id="fileInput" hidden>
			  </div>
			  <div id="uploadStatus" class="upload-status"></div>
		  </div>
		  <script>
			  function loadFileList() {
				  const fileList = document.getElementById('fileList');
				  const savedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
				  fileList.innerHTML = '';
				  savedFiles.forEach((file, index) => {
					  const li = document.createElement('li');
					  li.innerHTML = \`
						  <span class="file-icon">\u{1F4C4}</span>
						  <a href="https://ipfs.io/ipfs/\${file.Url.split('/').pop()}" class="file-link" target="_blank">\${file.Name}</a>
						  <div class="file-actions">
							  <button class="delete-btn" onclick="deleteFile(\${index})">
								  <span class="file-icon">\u274C</span>
							  </button>
						  </div>
					  \`;
					  fileList.appendChild(li);
				  });
			  }

			  function deleteFile(index) {
				  const savedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
				  savedFiles.splice(index, 1);
				  localStorage.setItem('uploadedFiles', JSON.stringify(savedFiles));
				  loadFileList();
			  }

			  document.getElementById('clearAllBtn').addEventListener('click', () => {
				  if (confirm('Are you sure you want to clear all files?')) {
					  localStorage.removeItem('uploadedFiles');
					  loadFileList();
				  }
			  });

			  loadFileList();

			  const uploadArea = document.getElementById('uploadArea');
			  const fileInput = document.getElementById('fileInput');
			  const uploadStatus = document.getElementById('uploadStatus');

			  uploadArea.addEventListener('dragover', (e) => {
				  e.preventDefault();
				  uploadArea.classList.add('drag-over');
			  });

			  uploadArea.addEventListener('dragleave', () => {
				  uploadArea.classList.remove('drag-over');
			  });

			  uploadArea.addEventListener('drop', (e) => {
				  e.preventDefault();
				  uploadArea.classList.remove('drag-over');
				  const files = e.dataTransfer.files;
				  if (files.length) {
					  handleFileUpload(files[0]);
				  }
			  });

			  uploadArea.addEventListener('click', () => {
				  fileInput.click();
			  });

			  fileInput.addEventListener('change', (e) => {
				  const file = e.target.files[0];
				  if (file) {
					  handleFileUpload(file);
				  }
			  });

			  async function handleFileUpload(file) {
				  uploadStatus.textContent = \`Uploading: \${file.name}...\`;

				  const formData = new FormData();
				  formData.append('file', file);

				  try {
					  const response = await fetch('https://app.img2ipfs.org/api/v0/add', {
						  method: 'POST',
						  body: formData,
						  headers: {
							  'Accept': 'application/json',
						  },
					  });

					  if (!response.ok) {
						  throw new Error('Upload failed');
					  }

					  const result = await response.json();
					  uploadStatus.textContent = \`File uploaded successfully! IPFS Hash: \${result.Hash}\`;

					  const savedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
					  savedFiles.push(result);
					  localStorage.setItem('uploadedFiles', JSON.stringify(savedFiles));

					  loadFileList();

				  } catch (error) {
					  console.error('Error:', error);
					  uploadStatus.textContent = 'Upload failed. Please try again.';
				  }
			  }
		  <\/script>
	  </body>
	  </html>
	`;return new Response(c,{headers:{"content-type":"text/html;charset=UTF-8"}})}var Q=new Set([80,8080,8880,2052,2086,2095,2082]),M=new Set([443,8443,2053,2096,2087,2083]),k=Array.from({length:256},(t,e)=>(e+256).toString(16).slice(1)),L="QA==",V="dmxlc3M=",X="RUR0dW5uZWw=",I="dHJvamFu",ee=1,W=3;function O(t){return/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(t)}function te(t){if(!t)return{earlyData:null,error:null};try{t=t.replace(/-/g,"+").replace(/_/g,"/");let e=atob(t),r=new ArrayBuffer(e.length),c=new Uint8Array(r);for(let p=0;p<e.length;p++)c[p]=e.charCodeAt(p);return{earlyData:r,error:null}}catch(e){return{earlyData:null,error:e}}}function De(t,e=0){return[k[t[e]],k[t[e+1]],k[t[e+2]],k[t[e+3]],"-",k[t[e+4]],k[t[e+5]],"-",k[t[e+6]],k[t[e+7]],"-",k[t[e+8]],k[t[e+9]],"-",k[t[e+10]],k[t[e+11]],k[t[e+12]],k[t[e+13]],k[t[e+14]],k[t[e+15]]].join("").toLowerCase()}function re(t,e=0){let r=De(t,e);if(!O(r))throw new TypeError("Stringified UUID is invalid");return r}function T(t){try{(t.readyState===1||t.readyState===2)&&t.close()}catch(e){console.error("safeCloseWebSocket error:",e)}}function oe(t,e,r){let c=!1;return new ReadableStream({start(i){t.addEventListener("message",n=>{c||i.enqueue(n.data)}),t.addEventListener("close",n=>{r(`readableWebSocketStream is close (code: ${n.code})`),!c&&(T(t),i.close())}),t.addEventListener("error",n=>{r(`webSocketServer has error: ${n?.message||"unknown"}`),i.error(n)});let{earlyData:s,error:a}=te(e);a?i.error(a):s&&i.enqueue(s)},pull(i){},cancel(i){r(`ReadableStream was canceled, due to ${i}`),c=!0,T(t)}})}async function _(t,e,r,c,p){p(`[remoteSocketToWS] Starting, remoteSocket.readable=${!!t?.readable}`);let i=!1;try{p("[remoteSocketToWS] Starting pipeTo..."),await t.readable.pipeTo(new WritableStream({async write(s){if(p(`[remoteSocketToWS] Received chunk, size=${s?.byteLength||s?.length||0}`),e.readyState!==1)throw p(`[remoteSocketToWS] WebSocket not open, readyState=${e.readyState}`),new Error("WebSocket is not open");if(i=!0,r){let a=new Uint8Array(r),n=new Uint8Array(s),o=new Uint8Array(a.length+n.length);o.set(a,0),o.set(n,a.length),p(`[remoteSocketToWS] Sending first chunk with header, total size=${o.length}`),e.send(o.buffer),r=null}else p("[remoteSocketToWS] Sending chunk to WebSocket"),e.send(s)},close(){p(`[remoteSocketToWS] Remote connection readable closed. Had incoming data: ${i}`)},abort(s){p(`[remoteSocketToWS] Remote connection readable aborted: ${s}`),console.error("Remote connection readable aborted:",s)}})),p("[remoteSocketToWS] pipeTo completed normally")}catch(s){p(`[remoteSocketToWS] pipeTo error: ${s.message}`),console.error("remoteSocketToWS error:",s.stack||s),T(e)}!i&&c&&(p("[remoteSocketToWS] No incoming data, retrying"),await c())}async function ne(t,e,r,c,p,i){let{username:s,password:a,hostname:n,port:o}=p,l=i({hostname:n,port:o}),d=new Uint8Array([5,2,0,2]),f=l.writable.getWriter();await f.write(d),c("sent socks greeting");let m=l.readable.getReader(),h=new TextEncoder,x=(await m.read()).value;if(x[0]!==5){c(`socks server version error: ${x[0]} expected: 5`);return}if(x[1]===255){c("no acceptable methods");return}if(x[1]===2){if(c("socks server needs auth"),!s||!a){c("please provide username/password");return}let y=new Uint8Array([1,s.length,...h.encode(s),a.length,...h.encode(a)]);if(await f.write(y),x=(await m.read()).value,x[0]!==1||x[1]!==0){c("fail to auth socks server");return}}let u;switch(t){case 1:u=new Uint8Array([1,...e.split(".").map(Number)]);break;case 2:u=new Uint8Array([3,e.length,...h.encode(e)]);break;case 3:u=new Uint8Array([4,...e.split(":").flatMap(y=>[parseInt(y.slice(0,2),16),parseInt(y.slice(2),16)])]);break;default:c(`invild  addressType is ${t}`);return}let b=new Uint8Array([5,1,0,...u,r>>8,r&255]);if(await f.write(b),c("sent socks request"),x=(await m.read()).value,x[1]===0)c("socks connection opened");else{c("fail to open socks connection");return}return f.releaseLock(),m.releaseLock(),l}async function se(t,e,r,c,p,i,s=new Uint8Array(0)){let{username:a,password:n,hostname:o,port:l}=p,d=i({hostname:o,port:l}),f=d.writable.getWriter(),m=d.readable.getReader();try{let h=a&&n?`Proxy-Authorization: Basic ${btoa(`${a}:${n}`)}\r
`:"",x=`CONNECT ${e}:${r} HTTP/1.1\r
Host: ${e}:${r}\r
${h}User-Agent: Mozilla/5.0\r
Connection: keep-alive\r
\r
`;await f.write(new TextEncoder().encode(x)),c("sent HTTP CONNECT request");let u=new Uint8Array(0),b=-1,y=0;for(;b===-1&&y<8192;){let{done:S,value:g}=await m.read();if(S)throw new Error("Connection closed before receiving HTTP response");u=new Uint8Array([...u,...g]),y=u.length;let E=u.findIndex((A,v)=>v<u.length-3&&u[v]===13&&u[v+1]===10&&u[v+2]===13&&u[v+3]===10);E!==-1&&(b=E+4)}if(b===-1)throw new Error("Invalid HTTP response: header too large or malformed");let P=new TextDecoder().decode(u.slice(0,b)),w=P.split(`\r
`)[0].match(/HTTP\/\d\.\d\s+(\d+)/);if(!w)throw new Error("Invalid HTTP response format");let $=parseInt(w[1]);if(c(`HTTP proxy response: ${P.split(`\r
`)[0]}`),$<200||$>=300)throw new Error(`HTTP CONNECT failed: HTTP ${$}`);return c("HTTP CONNECT tunnel established"),s.length>0&&await f.write(s),f.releaseLock(),m.releaseLock(),d}catch(h){c(`HTTP CONNECT error: ${h.message}`);try{f.releaseLock()}catch{}try{m.releaseLock()}catch{}try{d.close()}catch{}return}}var z=null,j=null,ae=0;async function B(t,e){try{let r=await fetch(`https://1.1.1.1/dns-query?name=${t}&type=${e}`,{headers:{Accept:"application/dns-json"}});return r.ok?(await r.json()).Answer||[]:[]}catch(r){return console.error(`DoH query failed (${e}):`,r),[]}}function ie(t){let e=t,r=443;if(t.includes("]:")){let c=t.split("]:");e=c[0]+"]",r=parseInt(c[1],10)||r}else if(t.includes(":")&&!t.startsWith("[")){let c=t.lastIndexOf(":");e=t.slice(0,c),r=parseInt(t.slice(c+1),10)||r}return[e,r]}function Ie(t,e){return[...(t.includes(".")?t.split(".").slice(-2).join("."):t)+e].reduce((c,p)=>c+p.charCodeAt(0),0)}function je(t,e){let r=[...t],c=e;return r.sort(()=>(c=c*1103515245+12345&2147483647,c/2147483647-.5)),r}async function ce(t,e="cloudflare.com",r=""){if(z&&j&&z===t)return console.log(`[ProxyResolver] Using cached addresses (${j.length} entries)`),j;let c=t.toLowerCase(),p=[];if(c.includes(".william"))try{let o=(await B(c,"TXT")).filter(l=>l.type===16).map(l=>l.data);if(o.length>0){let l=o[0];l.startsWith('"')&&l.endsWith('"')&&(l=l.slice(1,-1)),p=l.replace(/\\010/g,",").replace(/\n/g,",").split(",").map(f=>f.trim()).filter(Boolean).map(f=>ie(f))}}catch(n){console.error("[ProxyResolver] Failed to parse TXT domain:",n)}else{let[n,o]=ie(c),l=c.match(/\.tp(\d+)/);l&&(o=parseInt(l[1],10));let d=/^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/,f=/^\[?([a-fA-F0-9:]+)\]?$/;if(!d.test(n)&&!f.test(n)){let[m,h]=await Promise.all([B(n,"A"),B(n,"AAAA")]),x=m.filter(y=>y.type===1).map(y=>y.data),u=h.filter(y=>y.type===28).map(y=>`[${y.data}]`),b=[...x,...u];p=b.length>0?b.map(y=>[y,o]):[[n,o]]}else p=[[n,o]]}let i=p.sort((n,o)=>n[0].localeCompare(o[0])),s=Ie(e,r);return j=je(i,s).slice(0,8),z=t,console.log(`[ProxyResolver] Resolved ${j.length} addresses:`,j.map(([n,o],l)=>`${l+1}. ${n}:${o}`).join(", ")),j}async function le(t,e,r,c,p=1500){let i=ae;for(let s=0;s<t.length;s++){let a=(i+s)%t.length,[n,o]=t[a];try{c(`[ProxyRotation] Trying ${n}:${o} (index: ${a})`);let l=r({hostname:n,port:o});await Promise.race([l.opened,new Promise((f,m)=>setTimeout(()=>m(new Error("Connection timeout")),p))]);let d=l.writable.getWriter();return await d.write(e),d.releaseLock(),c(`[ProxyRotation] Connected to ${n}:${o}`),ae=a,{socket:l,index:a}}catch(l){c(`[ProxyRotation] Failed ${n}:${o}: ${l.message}`);continue}}return null}var fe=1,N=2,de=1,pe=2,ue=3,We=1e4;function Oe(t,e,r,c,p){let i,s;switch(e){case de:i=4;break;case pe:s=new TextEncoder().encode(r),i=s.length+1;break;case ue:i=16;break;default:throw new Error(`Unknown address type: ${e}`)}let a=p.replace(/-/g,""),n=new Uint8Array(22+i);n[0]=0;for(let o=0;o<a.length;o+=2)n[1+o/2]=parseInt(a.substr(o,2),16);switch(n[17]=0,n[18]=t,n[19]=c>>8,n[20]=c&255,n[21]=e,e){case de:let o=r.split(".");for(let f=0;f<4;f++)n[22+f]=parseInt(o[f]);break;case pe:n[22]=s.length,n.set(s,23);break;case ue:let d=_e(r).split(":");for(let f=0;f<8;f++){let m=parseInt(d[f],16);n[22+f*2]=m>>8,n[23+f*2]=m&255}break}return n}function _e(t){if(t=t.replace(/^\[|\]$/g,""),t.includes("::")){let e=t.split("::"),r=e[0]?e[0].split(":"):[],c=e[1]?e[1].split(":"):[],p=8-r.length-c.length,i=Array(p).fill("0");return[...r,...i,...c].map(s=>s.padStart(4,"0")).join(":")}return t.split(":").map(e=>e.padStart(4,"0")).join(":")}function Re(t,e){if(e.network!=="ws")throw new Error(`Unsupported network type: ${e.network}, must be 'ws'`);if(e.security!=="tls"&&e.security!=="none"&&e.security!=="")throw new Error(`Unsupported security: ${e.security}, must be 'tls' or 'none'`)}async function R(t,e,r,c,p,i,s,a=We){try{Re(t.address,t.streamSettings)}catch(h){return s(`[VLESS] Config validation failed: ${h.message}`),null}let o=(t.streamSettings.security||"none")==="tls"?"wss://":"ws://";o+=`${t.address}:${t.port}`,t.streamSettings.wsSettings?.path&&(o+=t.streamSettings.wsSettings.path),s(`[VLESS] Connecting to ${o} for ${e===N?"UDP":"TCP"}://${c}:${p}`),s(`[VLESS] Creating WebSocket to ${o}...`);let d;try{d=new WebSocket(o),s(`[VLESS] WebSocket object created, readyState: ${d.readyState}`)}catch(h){return s(`[VLESS] Failed to create WebSocket: ${h.message}`),null}let f,m=new Promise(h=>{f=h});s(`[VLESS] Waiting for WebSocket to open (timeout: ${a}ms)...`);try{await new Promise((h,x)=>{let u=setTimeout(()=>{s(`[VLESS] Connection timeout after ${a}ms`),x(new Error("Connection timeout"))},a);d.addEventListener("open",()=>{s("[VLESS] WebSocket open event received"),clearTimeout(u),h()}),d.addEventListener("close",b=>{s(`[VLESS] WebSocket close event during connect (code: ${b.code})`),clearTimeout(u),x(new Error(`WebSocket closed with code ${b.code}`))}),d.addEventListener("error",b=>{s(`[VLESS] WebSocket error event during connect: ${b?.message||"unknown"}`),clearTimeout(u),x(new Error("WebSocket connection error"))})})}catch(h){s(`[VLESS] Connection failed: ${h.message}`);try{d.close()}catch{}return f(),null}s("[VLESS] Connection promise resolved, setting up handlers...");try{d.addEventListener("close",w=>{s(`[VLESS] WebSocket connection closed (code: ${w.code}, reason: ${w.reason||"none"})`),f()}),d.addEventListener("error",()=>{s("[VLESS] WebSocket error event")}),s("[VLESS] Creating writable stream...");let h=new WritableStream({write(w){d.readyState===1&&d.send(w)},close(){s("[VLESS] Writable stream closed"),T(d)},abort(w){s(`[VLESS] Writable stream aborted: ${w}`),T(d)}});s("[VLESS] Writable stream created");let x=!1;s("[VLESS] Creating readable stream with message handlers...");let u=new ReadableStream({start(w){s("[VLESS] ReadableStream start called, adding message listener"),d.addEventListener("message",$=>{s(`[VLESS] Message received from VLESS server, size=${$.data?.byteLength||"unknown"}`);let S=new Uint8Array($.data);if(!x&&(x=!0,s(`[VLESS] First message - stripping header. Raw length=${S.length}, first bytes: ${S.slice(0,Math.min(10,S.length)).join(",")}`),S.length>=2)){let g=S[1];if(s(`[VLESS] Additional info bytes: ${g}`),S.length>2+g)S=S.slice(2+g),s(`[VLESS] After header strip, data length=${S.length}`);else{s("[VLESS] Response header only, no payload data");return}}S.length>0&&(s(`[VLESS] Enqueueing ${S.length} bytes to readable stream`),w.enqueue(S))}),d.addEventListener("close",()=>{s("[VLESS] ReadableStream: WebSocket close event");try{w.close()}catch{}}),d.addEventListener("error",$=>{s(`[VLESS] ReadableStream: WebSocket error event: ${$?.message||"unknown"}`);try{w.error($)}catch{}}),s("[VLESS] ReadableStream message handlers registered")},cancel(){T(d)}});s("[VLESS] Readable stream created"),s("[VLESS] Streams created, generating request header..."),s(`[VLESS] Generating header for command=${e}, addressType=${r}, address=${c}, port=${p}`);let b=Oe(e,r,c,p,t.uuid),y;i instanceof ArrayBuffer?y=new Uint8Array(i):i instanceof Uint8Array?y=i:i&&i.buffer instanceof ArrayBuffer?y=new Uint8Array(i.buffer,i.byteOffset,i.byteLength):y=new Uint8Array(i||0),s(`[VLESS] Header generated, length=${b.length}, clientData length=${y.length}`);let P=new Uint8Array(b.length+y.length);return P.set(b,0),P.set(y,b.length),s(`[VLESS] Sending first packet, total length=${P.length}, ws.readyState=${d.readyState}`),d.send(P),s("[VLESS] Sent request header with initial data"),s("[VLESS] Returning streams and closed promise"),{readable:u,writable:h,closed:m}}catch(h){return s(`[VLESS] Error after connection opened: ${h.message}`),s(`[VLESS] Error stack: ${h.stack}`),T(d),f(),null}}async function he(t,e,r,c,p,i,s,a,n,o){async function l(){if(n.proxyType==="vless"&&n.parsedVlessOutbound){a(`[TCP] Connecting via VLESS outbound to ${r}:${c}`);let u=await R(n.parsedVlessOutbound,fe,e,r,c,p,a);if(!u)throw new Error("VLESS outbound connection failed");return{readable:u.readable,writable:u.writable,closed:u.closed}}else if(n.proxyType==="http"){a(`[TCP] Connecting via HTTP proxy to ${r}:${c}`);let u=await se(e,r,c,a,n.parsedProxyAddress,o,p);if(!u)throw new Error("HTTP proxy connection failed");return u}else{a(`[TCP] Connecting via SOCKS5 proxy to ${r}:${c}`);let u=await ne(e,r,c,a,n.parsedProxyAddress,o);if(!u)throw new Error("SOCKS5 proxy connection failed");let b=u.writable.getWriter();return await b.write(p),b.releaseLock(),u}}async function d(u,b){a(`[TCP] Direct connecting to ${u}:${b}`);let y=o({hostname:u,port:b}),P=y.writable.getWriter();return await P.write(p),P.releaseLock(),y}async function f(u=!0){let b=await ce(n.proxyIP,r,n.userID||"");if(b.length>0){let y=await le(b,p,o,a,n.proxyTimeout||1500);if(y)return y.socket}if(u)return a("[TCP] All proxies failed, falling back to direct connection"),await d(r,c);throw new Error("All proxy connections failed and fallback is disabled")}async function m(){let u,b=n.parsedProxyAddress||n.parsedVlessOutbound;n.globalProxy&&n.proxyType&&b?u=await l():n.proxyIP?u=await f(n.enableProxyFallback!==!1):u=await d(r,c),t.value=u,u.closed.catch(y=>{console.log("retry tcpSocket closed error",y)}).finally(()=>{T(i)}),_(u,i,s,null,a)}let h,x=n.parsedProxyAddress||n.parsedVlessOutbound;if(n.globalProxy&&n.proxyType&&x){if(a(`[TCP] Using ${n.proxyType.toUpperCase()} proxy (global mode)`),h=await l(),a(`[TCP] connectViaProxy returned, tcpSocket=${h?"valid":"null"}`),!h){a("[TCP] VLESS connection returned null, closing WebSocket"),T(i);return}t.value=h,a("[TCP] Setting up closed handler"),h.closed.catch(u=>{a(`[TCP] tcpSocket.closed catch: ${u?.message||"unknown"}`)}).finally(()=>{a("[TCP] tcpSocket.closed finally - closing WebSocket"),T(i)}),a("[TCP] Calling remoteSocketToWS"),_(h,i,s,null,a)}else try{h=await d(r,c),t.value=h,_(h,i,s,m,a)}catch(u){a(`[TCP] Direct connection failed: ${u.message}, trying proxies`),await m()}}async function q(t,e,r,c,p){try{let i="8.8.4.4",a=r,n=p({hostname:i,port:53});c(`connected to ${i}:53`);let o=n.writable.getWriter();await o.write(t),o.releaseLock(),await n.readable.pipeTo(new WritableStream({async write(l){e.readyState===1&&(a?(e.send(await new Blob([a,l]).arrayBuffer()),a=null):e.send(l))},close(){c(`dns server(${i}) tcp is close`)},abort(l){console.error(`dns server(${i}) tcp is abort`,l)}}))}catch(i){console.error(`handleDNSQuery have exception, error: ${i.message}`)}}function me(t,e){if(t.byteLength<24)return{hasError:!0,message:"invalid data"};let r=new DataView(t),c=r.getUint8(0),p=re(new Uint8Array(t.slice(1,17))),i=e.includes(",")?e.split(","):[e],s=i.some(x=>p===x.trim())||i.length===1&&p===i[0].trim();if(console.log(`userID: ${p}`),!s)return{hasError:!0,message:"invalid user"};let a=r.getUint8(17),n=r.getUint8(18+a);if(n!==1&&n!==2)return{hasError:!0,message:`command ${n} is not supported, command 01-tcp,02-udp,03-mux`};let o=18+a+1,l=r.getUint16(o),d=r.getUint8(o+2),f,m,h;switch(d){case 1:m=4,h=o+3,f=new Uint8Array(t.slice(h,h+m)).join(".");break;case 2:m=r.getUint8(o+3),h=o+4,f=new TextDecoder().decode(t.slice(h,h+m));break;case 3:m=16,h=o+3,f=Array.from({length:8},(x,u)=>r.getUint16(h+u*2).toString(16)).join(":");break;default:return{hasError:!0,message:`invalid addressType: ${d}`}}return f?{hasError:!1,addressRemote:f,addressType:d,portRemote:l,rawDataIndex:h+m,protocolVersion:new Uint8Array([c]),isUDP:n===2}:{hasError:!0,message:`addressValue is empty, addressType is ${d}`}}function Z(t){function e(d,f){return d>>>f|d<<32-f}let r=Math.pow,c=r(2,32),p="",i=[],s=t.length*8,a=[3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428],n=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],o,l;for(t+="\x80";t.length%64-56;)t+="\0";for(o=0;o<t.length;o++){if(l=t.charCodeAt(o),l>>8)return;i[o>>2]|=l<<(3-o)%4*8}for(i[i.length]=s/c|0,i[i.length]=s,l=0;l<i.length;){let d=i.slice(l,l+=16),f=a.slice(0);for(o=0;o<64;o++){if(o>=16){let b=d[o-15],y=d[o-2];d[o]=d[o-16]+(e(b,7)^e(b,18)^b>>>3)+d[o-7]+(e(y,17)^e(y,19)^y>>>10)|0}let m=a[0],h=a[4],x=a[7]+(e(h,6)^e(h,11)^e(h,25))+(h&a[5]^~h&a[6])+n[o]+d[o],u=(e(m,2)^e(m,13)^e(m,22))+(m&a[1]^m&a[2]^a[1]&a[2]);a=[x+u|0].concat(a),a[4]=a[4]+x|0,a.pop()}for(o=0;o<8;o++)a[o]=a[o]+f[o]|0}for(o=0;o<7;o++){let d=a[o];p+=(d>>28&15).toString(16)+(d>>24&15).toString(16)+(d>>20&15).toString(16)+(d>>16&15).toString(16)+(d>>12&15).toString(16)+(d>>8&15).toString(16)+(d>>4&15).toString(16)+(d&15).toString(16)}return p}function xe(t,e){if(t.byteLength<58)return!1;let r=new Uint8Array(t);if(r[56]!==13||r[57]!==10)return!1;try{let c=new TextDecoder().decode(r.slice(0,56)),p=Z(e);return c===p}catch{return!1}}function ye(t,e){if(t.byteLength<58)return{hasError:!0,message:"Invalid Trojan data: too short"};let r=new Uint8Array(t),c=new DataView(t),p=new TextDecoder().decode(r.slice(0,56)),i=Z(e);if(p!==i)return{hasError:!0,message:"Invalid Trojan password"};if(r[56]!==13||r[57]!==10)return{hasError:!0,message:"Invalid Trojan header: missing CRLF"};let s=r[58];if(s!==ee&&s!==W)return{hasError:!0,message:`Unsupported Trojan command: ${s}`};let a=r[59],n,o,l;switch(a){case 1:if(o=4,l=60,t.byteLength<l+o+2)return{hasError:!0,message:"Invalid Trojan header: IPv4 address truncated"};n=Array.from(r.slice(l,l+o)).join(".");break;case 3:if(o=r[60],l=61,t.byteLength<l+o+2)return{hasError:!0,message:"Invalid Trojan header: domain name truncated"};n=new TextDecoder().decode(r.slice(l,l+o));break;case 4:if(o=16,l=60,t.byteLength<l+o+2)return{hasError:!0,message:"Invalid Trojan header: IPv6 address truncated"};n=Array.from({length:8},(x,u)=>c.getUint16(l+u*2).toString(16)).join(":");break;default:return{hasError:!0,message:`Invalid Trojan address type: ${a}`}}let d=l+o;if(t.byteLength<d+2)return{hasError:!0,message:"Invalid Trojan header: port truncated"};let f=c.getUint16(d),m=d+2;if(t.byteLength<m+2)return{hasError:!0,message:"Invalid Trojan header: missing final CRLF"};if(r[m]!==13||r[m+1]!==10)return{hasError:!0,message:"Invalid Trojan header: invalid final CRLF"};let h=m+2;return n?(console.log(`Trojan: target ${n}:${f}, UDP: ${s===W}`),{hasError:!1,addressRemote:n,addressType:a===3?2:a,portRemote:f,rawDataIndex:h,isUDP:s===W}):{hasError:!0,message:`Address value is empty, address type is ${a}`}}function be(t){return!!(t.proxyType==="vless"&&t.parsedVlessOutbound)}async function ge(t,e,r,c,p,i,s,a){if(a.proxyType!=="vless"||!a.parsedVlessOutbound)return s("[UDP] No UDP-capable outbound configured"),T(t),null;s(`[UDP] Establishing VLESS outbound for UDP://${c}:${p}`);let n=await R(a.parsedVlessOutbound,N,r,c,p,i,s);if(!n)return s("[UDP] VLESS outbound connection failed"),T(t),null;let o=!1;return n.readable.pipeTo(new WritableStream({write(l){if(t.readyState===1)if(!o&&e){let d=new Uint8Array(e.length+l.length);d.set(e,0),d.set(l,e.length),t.send(d.buffer),o=!0}else t.send(l)},close(){s("[UDP] VLESS readable stream closed"),T(t)},abort(l){s(`[UDP] VLESS readable stream aborted: ${l}`),T(t)}})).catch(l=>{s(`[UDP] VLESS pipe error: ${l.message||l}`),T(t)}),s("[UDP] VLESS outbound established successfully"),n.writable}async function Se(t,e,r){let c=new WebSocketPair,[p,i]=Object.values(c);i.accept();let s="",a="",n=(m,h)=>{console.log(`[${s}:${a}] ${m}`,h||"")},o=t.headers.get("sec-websocket-protocol")||"",l=oe(i,o,n),d={value:null},f=!1;return l.pipeTo(new WritableStream({async write(m,h){if(f)return await q(m,i,null,n,r);if(d.value){let D=d.value.writable.getWriter();await D.write(m),D.releaseLock();return}let x,u="vless";xe(m,e.trojanPassword)?(u="trojan",x=ye(m,e.trojanPassword)):x=me(m,e.userID);let{hasError:b,message:y,addressType:P,portRemote:w=443,addressRemote:$="",rawDataIndex:S,protocolVersion:g=new Uint8Array([0,0]),isUDP:E}=x;if(s=$,a=`${w}--${Math.random()} ${E?"udp ":"tcp "} [${u}]`,b)throw new Error(y);if(E){if(be(e)){let D=u==="trojan"?null:new Uint8Array([g[0],0]),Ue=m.slice(S),J=await ge(i,D,P,$,w,Ue,n,e);J&&(d.value={writable:J});return}else if(w===53)f=!0;else throw new Error("UDP proxy requires VLESS outbound configuration");return}let A=u==="trojan"?null:new Uint8Array([g[0],0]),v=m.slice(S);if(f)return q(v,i,A,n,r);he(d,P,$,w,v,i,A,n,e,r)},close(){n("readableWebSocketStream is close")},abort(m){n("readableWebSocketStream is abort",JSON.stringify(m))}})).catch(m=>{n("readableWebSocketStream pipeTo error",m)}),new Response(null,{status:101,webSocket:p})}function we(t,e,r,c=null){let p=Array.isArray(r)?r[0]:r,i=p.includes(":")?p.split(":")[1]:"443",s=`?encryption=none&security=tls&sni=${e}&fp=randomized&type=ws&host=${e}&path=%2F%3Fed%3D2048#${e}`,a=t.split(","),n=c||a[0],o=`?security=tls&type=ws&host=${e}&path=%2F%3Fed%3D2048&sni=${e}#${e}`,l=`https://${e}/sub/${a[0]}?format=clash`,d=`https://${e}/bestip/${a[0]}`,f=`https://url.v1.mk/sub?target=clash&url=${encodeURIComponent(`https://${e}/sub/${a[0]}?format=clash`)}&insert=false&emoji=true&list=false&tfo=false&scv=true&fdn=false&sort=false&new_name=true`,m=`
  <head>
    <title>EDtunnel: Configuration</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <meta property='og:site_name' content='EDtunnel: Protocol Configuration' />
    <meta property='og:type' content='website' />
    <meta property='og:title' content='EDtunnel - Protocol Configuration and Subscribe Output' />
    <meta property='og:description' content='Use Cloudflare Pages and Worker serverless to implement protocol' />
    <meta property='og:url' content='https://${e}/' />
    <meta property='og:image' content='https://cdn.jsdelivr.net/gh/6Kmfi6HP/EDtunnel@refs/heads/main/image/logo.png' />
    <meta name='twitter:card' content='summary_large_image' />
    <meta name='twitter:title' content='EDtunnel - Protocol Configuration and Subscribe Output' />
    <meta name='twitter:description' content='Use Cloudflare Pages and Worker serverless to implement protocol' />
    <meta name='twitter:url' content='https://${e}/' />
    <meta name='twitter:image' content='https://cdn.jsdelivr.net/gh/6Kmfi6HP/EDtunnel@refs/heads/main/image/logo.png' />
    <meta property='og:image:width' content='1500' />
    <meta property='og:image:height' content='1500' />

    <style>
      body {
        font-family: 'Roboto', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #000000;
        color: #ffffff;
        line-height: 1.6;
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
      }
      .container {
        background-color: #111111;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(255, 255, 255, 0.1);
        padding: 20px;
        margin-bottom: 20px;
      }
      h1, h2 {
        color: #ffffff;
      }
      .config-item {
        background-color: #222222;
        border: 1px solid #333333;
        border-radius: 4px;
        padding: 15px;
        margin-bottom: 15px;
      }
      .config-item h3 {
        margin-top: 0;
        color: #ffffff;
      }
      .btn {
        background-color: #ffffff;
        color: #000000;
        border: none;
        padding: 10px 15px;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s, color 0.3s;
      }
      .btn:hover {
        background-color: #cccccc;
      }
      .btn-group {
        margin-top: 10px;
      }
      .btn-group .btn {
        margin-right: 10px;
      }
      pre {
        background-color: #333333;
        border: 1px solid #444444;
        border-radius: 4px;
        padding: 10px;
        white-space: pre-wrap;
        word-wrap: break-word;
        color: #00ff00;
      }
      .logo {
        float: left;
        margin-right: 20px;
        margin-bottom: 20px;
		max-width: 30%;
      }
      @media (max-width: 768px) {
        .logo {
          float: none;
          display: block;
          margin: 0 auto 20px;
          max-width: 90%; /* Adjust the max-width to fit within the container */
        }
        .btn-group {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .btn-group .btn {
          margin-bottom: 10px;
          width: 100%;
          text-align: center;
        }
      }
      .code-container {
        position: relative;
        margin-bottom: 15px;
      }
      .code-container pre {
        margin: 0;
        padding-right: 100px; /* Make space for the button */
      }
      .copy-btn {
        position: absolute;
        top: 5px;
        right: 5px;
        padding: 5px 10px;
        font-size: 0.8em;
      }
      .subscription-info {
        margin-top: 20px;
        background-color: #222222;
        border-radius: 4px;
        padding: 15px;
      }
      .subscription-info h3 {
        color: #ffffff;
        margin-top: 0;
      }
      .subscription-info ul {
        padding-left: 20px;
      }
      .subscription-info li {
        margin-bottom: 10px;
      }
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
  </head>
  `,h=`
    <div class="container">
      <h1>EDtunnel: Protocol Configuration</h1>
      <img src="https://cdn.jsdelivr.net/gh/6Kmfi6HP/EDtunnel@refs/heads/main/image/logo.png" alt="EDtunnel Logo" class="logo">
      <p>Welcome! This function generates configuration for the vless protocol. If you found this useful, please check our GitHub project:</p>
      <p><a href="https://github.com/6Kmfi6HP/EDtunnel" target="_blank" style="color: #00ff00;">EDtunnel - https://github.com/6Kmfi6HP/EDtunnel</a></p>
      <div style="clear: both;"></div>
      <div class="btn-group">
        <a href="//${e}/sub/${a[0]}" class="btn" target="_blank"><i class="fas fa-link"></i> VLESS Subscription</a>
        <a href="//${e}/trojan/${a[0]}" class="btn" target="_blank"><i class="fas fa-shield-alt"></i> Trojan Subscription</a>
        <a href="clash://install-config?url=${encodeURIComponent(`https://${e}/sub/${a[0]}?format=clash`)}" class="btn" target="_blank"><i class="fas fa-bolt"></i> Clash Subscription</a>
        <a href="${f}" class="btn" target="_blank"><i class="fas fa-bolt"></i> Clash Link</a>
        <a href="${d}" class="btn" target="_blank"><i class="fas fa-star"></i> Best IP Subscription</a>
      </div>
      <div class="subscription-info">
        <h3>Options Explained:</h3>
        <ul>
          <li><strong>VLESS Subscription:</strong> Direct link for VLESS protocol configuration. Suitable for clients supporting VLESS.</li>
          <li><strong>Trojan Subscription:</strong> Direct link for Trojan protocol configuration. Suitable for clients supporting Trojan-WS.</li>
          <li><strong>Clash Subscription:</strong> Opens the Clash client with pre-configured settings. Best for Clash users on mobile devices.</li>
          <li><strong>Clash Link:</strong> A web link to convert the VLESS config to Clash format. Useful for manual import or troubleshooting.</li>
          <li><strong>Best IP Subscription:</strong> Provides a curated list of optimal server IPs for many <b>different countries</b>.</li>
        </ul>
        <p>Choose the option that best fits your client and needs. For most users, the VLESS or Clash Subscription will be the easiest to use.</p>
      </div>
    </div>
  `,x=atob(I)+"://"+encodeURIComponent(n)+atob(L)+e+":443"+o,u=(Array.isArray(r)?r[0]:r).split(":")[0],b=atob(I)+"://"+encodeURIComponent(n)+atob(L)+u+":"+i+o,y=a.map(w=>{let $=atob(V)+"://"+w+atob(L)+e+":443"+s,S=(Array.isArray(r)?r[0]:r).split(":")[0],g=atob(V)+"://"+w+atob(L)+S+":"+i+s;return`
      <div class="container config-item">
        <h2>UUID: ${w}</h2>
        <h3>VLESS Default IP Configuration</h3>
        <div class="code-container">
          <pre><code>${$}</code></pre>
          <button class="btn copy-btn" onclick='copyToClipboard("${$}")'><i class="fas fa-copy"></i> Copy</button>
        </div>

        <h3>VLESS Best IP Configuration</h3>
        <div class="input-group mb-3">
          <select class="form-select" id="proxySelect" onchange="updateProxyConfig()">
            ${typeof r=="string"?`<option value="${r}">${r}</option>`:Array.from(r).map(E=>`<option value="${E}">${E}</option>`).join("")}
          </select>
        </div>
		<br>
        <div class="code-container">
          <pre><code id="proxyConfig">${g}</code></pre>
          <button class="btn copy-btn" onclick='copyToClipboard(document.getElementById("proxyConfig").textContent)'><i class="fas fa-copy"></i> Copy</button>
        </div>
      </div>
    `}).join(""),P=`
      <div class="container config-item">
        <h2>Trojan Configuration</h2>
        <p>Password: <code>${n}</code></p>
        <h3>Trojan Default IP Configuration</h3>
        <div class="code-container">
          <pre><code>${x}</code></pre>
          <button class="btn copy-btn" onclick='copyToClipboard("${x}")'><i class="fas fa-copy"></i> Copy</button>
        </div>

        <h3>Trojan Best IP Configuration</h3>
        <div class="input-group mb-3">
          <select class="form-select" id="trojanProxySelect" onchange="updateTrojanProxyConfig()">
            ${typeof r=="string"?`<option value="${r}">${r}</option>`:Array.from(r).map(w=>`<option value="${w}">${w}</option>`).join("")}
          </select>
        </div>
		<br>
        <div class="code-container">
          <pre><code id="trojanProxyConfig">${b}</code></pre>
          <button class="btn copy-btn" onclick='copyToClipboard(document.getElementById("trojanProxyConfig").textContent)'><i class="fas fa-copy"></i> Copy</button>
        </div>
      </div>
    `;return`
  <html>
  ${m}
  <body>
    ${h}
    ${y}
    ${P}
    <script>
      const userIDArray = ${JSON.stringify(a)};
      const pt = "${V}";
      const at = "${L}";
      const trojanPt = "${I}";
      const trojanPassword = "${encodeURIComponent(n)}";
      const commonUrlPart = "?encryption=none&security=tls&sni=${e}&fp=randomized&type=ws&host=${e}&path=%2F%3Fed%3D2048#${e}";
      const trojanCommonUrlPart = "?security=tls&type=ws&host=${e}&path=%2F%3Fed%3D2048&sni=${e}#${e}";

      function copyToClipboard(text) {
        navigator.clipboard.writeText(text)
          .then(() => {
            alert("Copied to clipboard");
          })
          .catch((err) => {
            console.error("Failed to copy to clipboard:", err);
          });
      }

      function updateProxyConfig() {
        const select = document.getElementById('proxySelect');
        const proxyValue = select.value;
        const [host, port] = proxyValue.split(':');
        const protocolSec = atob(pt) + '://' + userIDArray[0] + atob(at) + host + ":" + port + commonUrlPart;
        document.getElementById("proxyConfig").textContent = protocolSec;
      }

      function updateTrojanProxyConfig() {
        const select = document.getElementById('trojanProxySelect');
        const proxyValue = select.value;
        const [host, port] = proxyValue.split(':');
        const trojanSec = atob(trojanPt) + '://' + trojanPassword + atob(at) + host + ":" + port + trojanCommonUrlPart;
        document.getElementById("trojanProxyConfig").textContent = trojanSec;
      }
    <\/script>
  </body>
  </html>`}function Pe(t,e,r,c=null){let p=new Set([e,"icook.hk","japan.com","malaysia.com","russia.com","singapore.com","www.visa.com","www.csgo.com","www.shopify.com","www.whatismyip.com","www.ipget.net","freeyx.cloudflare88.eu.org","cloudflare.182682.xyz","cfip.cfcdn.vip",...C,"cf.0sm.com","cloudflare-ip.mofashi.ltd","cf.090227.xyz","cf.zhetengsha.eu.org","cloudflare.9jy.cc","cf.zerone-cdn.pp.ua","cfip.1323123.xyz","cdn.tzpro.xyz","cf.877771.xyz","cnamefuckxxs.yuchen.icu","cfip.xxxxxxxx.tk"]),i=t.includes(",")?t.split(","):[t],s=Array.isArray(r)?r:r?r.includes(",")?r.split(","):[r]:C,n=`?encryption=none&security=none&fp=random&type=ws&host=${e}&path=${encodeURIComponent("/"+Math.random().toString(36).substring(2,15)+"?ed=2048")}#`,o=`?encryption=none&security=tls&sni=${e}&fp=random&type=ws&host=${e}&path=%2F%3Fed%3D2048#`,l=i.flatMap(m=>{let h=[];return e.includes("pages.dev")||p.forEach(x=>{Array.from(Q).forEach(u=>{let b=`${e.split(".")[0]}-${x}-HTTP-${u}`,y=atob(V)+"://"+m+atob(L)+x+":"+u+n+b;h.push(y)})}),p.forEach(x=>{Array.from(M).forEach(u=>{let b=`${e.split(".")[0]}-${x}-HTTPS-${u}`,y=atob(V)+"://"+m+atob(L)+x+":"+u+o+b;h.push(y)})}),s.forEach(x=>{let[u,b="443"]=x.split(":"),y=`${e.split(".")[0]}-${u}-HTTPS-${b}`,P=atob(V)+"://"+m+atob(L)+u+":"+b+o+y+"-"+atob(X);h.push(P)}),h}),d=c||i[0],f=$e(d,e,s);return btoa([...l,...f].join(`
`))}function $e(t,e,r){let c=[],p=encodeURIComponent(t),i=`?security=tls&type=ws&host=${e}&path=%2F%3Fed%3D2048&sni=${e}`;return Array.from(M).forEach(s=>{let a=`${e.split(".")[0]}-Trojan-HTTPS-${s}`,n=`${atob(I)}://${p}@${e}:${s}${i}#${a}`;c.push(n)}),r.forEach(s=>{let[a,n="443"]=s.split(":"),o=`${e.split(".")[0]}-${a}-Trojan-${n}`,l=`${atob(I)}://${p}@${a}:${n}${i}#${o}`;c.push(l)}),c}function ve(t,e,r){let c=Array.isArray(r)?r:r?r.includes(",")?r.split(","):[r]:C,p=$e(t,e,c);return btoa(p.join(`
`))}function Te(t){if(!t||!t.startsWith("vless://"))return null;try{let e=t.slice(8).split("#")[0],r=e.indexOf("@");if(r===-1)return null;let c=e.slice(0,r),p=e.slice(r+1),[i,s]=p.split("?"),a,n;if(i.startsWith("[")){let d=i.indexOf("]");if(d===-1)return null;a=i.slice(1,d);let f=i.slice(d+1);f.startsWith(":")?n=parseInt(f.slice(1),10):n=443}else{let d=i.lastIndexOf(":");d===-1?(a=i,n=443):(a=i.slice(0,d),n=parseInt(i.slice(d+1),10))}isNaN(n)&&(n=443);let o={};s&&s.split("&").forEach(d=>{let[f,m]=d.split("=");f&&(o[decodeURIComponent(f)]=decodeURIComponent(m||""))});let l={network:o.type||"ws",security:o.security||"none"};return l.network==="ws"&&(l.wsSettings={path:o.path||"/"},o.host&&(l.wsSettings.headers={Host:o.host})),l.security==="tls"&&(l.tlsSettings={serverName:o.sni||o.host||a}),{uuid:c,address:a,port:n,streamSettings:l}}catch(e){return console.error("[VLESS] Failed to parse URL:",e),null}}function K(t){let[e,r]=t.split("@").reverse(),c,p,i,s;if(r){let o=r.split(":");if(o.length!==2)throw new Error("Invalid SOCKS address format");[c,p]=o}let a=e.split(":");if(s=Number(a.pop()),isNaN(s))throw new Error("Invalid SOCKS address format");i=a.join(":");let n=/^\[.*\]$/;if(i.includes(":")&&!n.test(i))throw new Error("Invalid SOCKS address format");return{username:c,password:p,hostname:i,port:s}}function ke(t){if(t){let e=t.split(",").map(i=>i.trim()),r=H(e),[c,p="443"]=r.split(":");return{ip:c,port:p}}else{let e=C[Math.floor(Math.random()*C.length)],r=e.includes(":")?e.split(":")[1]:"443";return{ip:e.split(":")[0],port:r}}}function H(t){let e=typeof t=="string"?t.split(",").map(r=>r.trim()):t;return e[Math.floor(Math.random()*e.length)]}function Ae(t){let e={};if(t.includes("%3F")){let r=t.match(/%3F(.+)$/);if(r){let p=r[1].split("&");for(let i of p){let[s,a]=i.split("=");a&&(e[s]=decodeURIComponent(a))}}}return e}function Ee(t){if(!t.includes("@"))return t;let e=t.lastIndexOf("@"),r=t.substring(0,e).replace(/%3D/gi,"="),c=t.substring(e+1);if(/^[A-Za-z0-9+/]+=*$/.test(r)&&!r.includes(":"))try{r=atob(r)}catch{}return`${r}@${c}`}function Ce(t){let e={proxyip:null,socks5:null,http:null,vless:null,globalProxy:!1},r=t.match(/^\/(proxyip[.=]|pyip=|ip=)([^/?#]+)/i);if(r){let o=r[1].toLowerCase(),l=r[2];return e.proxyip=o==="proxyip."?`proxyip.${l}`:l,e}let c=t.match(/^\/(socks5?):\/\/?([^/?#]+)/i);if(c)return e.socks5=Ee(c[2]),e.globalProxy=!0,e;let p=t.match(/^\/(g?s5|g?socks5?)=([^/?#]+)/i);if(p){let o=p[1].toLowerCase();return e.socks5=p[2],o.startsWith("g")&&(e.globalProxy=!0),e}let i=t.match(/^\/http:\/\/?([^/?#]+)/i);if(i)return e.http=Ee(i[1]),e.globalProxy=!0,e;let s=t.match(/^\/(g?http)=([^/?#]+)/i);if(s){let o=s[1].toLowerCase();return e.http=s[2],o.startsWith("g")&&(e.globalProxy=!0),e}if(t.match(/^\/vless:\/\/([^/?#]+)/i)){let o=t.slice(1);return e.vless=o,e.globalProxy=!0,e}let n=t.match(/^\/(g?vless)=([^/?#]+)/i);if(n){let o=n[1].toLowerCase();return e.vless=decodeURIComponent(n[2]),o.startsWith("g")&&(e.globalProxy=!0),e}return e}if(!O(F))throw new Error("uuid is not valid");async function Le(t,e,r,c){try{let{UUID:p,PROXYIP:i,SOCKS5:s,SOCKS5_RELAY:a,TROJAN_PASSWORD:n}=e,o=new URL(t.url),l=Y(e),d=o.searchParams.get("proxyip"),f=o.searchParams.get("socks5"),m=o.searchParams.has("globalproxy");if(!d&&!f){let g=Ae(o.pathname);d=d||g.proxyip,f=f||g.socks5}let h=Ce(o.pathname);!d&&h.proxyip&&(d=h.proxyip),!f&&h.socks5&&(f=h.socks5);let x=h.globalProxy||m,u=o.searchParams.get("http")||h.http;if(d){let g=/^([a-zA-Z0-9][-a-zA-Z0-9.]*(\.[a-zA-Z0-9][-a-zA-Z0-9.]*)+|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\[[0-9a-fA-F:]+\]):\d{1,5}$/;d.split(",").map(v=>v.trim()).every(v=>g.test(v))||(console.warn("Invalid proxyip format:",d),d=null)}if(f){let g=/^(([^:@]+:[^:@]+@)?[a-zA-Z0-9][-a-zA-Z0-9.]*(\.[a-zA-Z0-9][-a-zA-Z0-9.]*)+|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}):\d{1,5}$/;f.split(",").map(v=>v.trim()).every(v=>g.test(v))||(console.warn("Invalid socks5 format:",f),f=null)}l.socks5Address=f||l.socks5Address,l.globalProxy=x||l.socks5Relay,console.log("Config params:",l.userID,l.socks5Address,l.globalProxy,d);let b=ke(d||i);l.proxyIP=b.ip,l.proxyPort=b.port,console.log("Using proxy:",l.proxyIP,l.proxyPort);let y=o.searchParams.get("vless")||h.vless;if(y||l.vlessOutbound)try{let g=y||l.vlessOutbound,E=Te(g);E&&(l.parsedVlessOutbound=E,l.proxyType="vless",console.log("VLESS outbound configured:",E.address,E.port))}catch(g){console.log("VLESS outbound parse error:",g.toString())}if(l.proxyType!=="vless"){if(u)try{let g=H(u);l.parsedProxyAddress=K(g),l.proxyType="http"}catch(g){console.log("HTTP proxy parse error:",g.toString())}else if(l.socks5Address)try{let g=H(l.socks5Address);l.parsedProxyAddress=K(g),l.proxyType="socks5"}catch(g){console.log("SOCKS5 proxy parse error:",g.toString())}}let P=l.userID.includes(",")?l.userID.split(",").map(g=>g.trim()):[l.userID],w=t.headers.get("Host"),$=o.pathname.substring(1),S=P.length===1?$===P[0]||$===`sub/${P[0]}`||$===`bestip/${P[0]}`||$===`trojan/${P[0]}`?P[0]:null:P.find(g=>[g,`sub/${g}`,`bestip/${g}`,`trojan/${g}`].some(A=>$.startsWith(A)));if(t.headers.get("Upgrade")!=="websocket"){if(o.pathname==="/cf")return new Response(JSON.stringify(t.cf,null,4),{status:200,headers:{"Content-Type":"application/json;charset=utf-8"}});if(S){if(o.pathname===`/${S}`||o.pathname===`/sub/${S}`){let g=o.pathname.startsWith("/sub/"),E=d?d.split(",").map(D=>D.trim()):i?i.split(",").map(D=>D.trim()):C,A=n||S,v=g?Pe(S,w,E,A):we(S,w,E,A);return new Response(v,{status:200,headers:{"Content-Type":g?"text/plain;charset=utf-8":"text/html; charset=utf-8"}})}else if(o.pathname===`/trojan/${S}`){let g=d?d.split(",").map(v=>v.trim()):i?i.split(",").map(v=>v.trim()):C,A=ve(n||S,w,g);return new Response(A,{status:200,headers:{"Content-Type":"text/plain;charset=utf-8"}})}else if(o.pathname===`/bestip/${S}`)return fetch(`https://bestip.06151953.xyz/auto?host=${w}&uuid=${S}&path=/`,{headers:t.headers})}return G(o,t)}else return await Se(t,l,c)}catch(p){return new Response(p.toString())}}var Gt={async fetch(t,e,r){return Le(t,e,r,He)}};export{Gt as default};
