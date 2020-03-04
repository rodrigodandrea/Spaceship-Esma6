!function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=3)}([function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=function(){function e(t,n,i,s){r(this,e),this.x=null==t?0:t,this.y=null==n?0:n,this.width=null==i?0:i,this.height=null==s?this.width:s}return i(e,[{key:"intersects",value:function(e){if(null!=e)return this.x<e.x+e.width&&this.x+this.width>e.x&&this.y<e.y+e.height&&this.y+this.height>e.y}},{key:"fill",value:function(e){e.fillRect(this.x,this.y,this.width,this.height)}},{key:"drawImageArea",value:function(e,t,n,r,i,s){t.width?e.drawImage(t,n,r,i,s,this.x,this.y,this.width,this.height):e.strokeRect(this.x,this.y,this.width,this.height)}}]),e}();t.default=s},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=function(){function e(){r(this,e),this.KEY_LEFT=37,this.KEY_UP=38,this.KEY_RIGHT=39,this.KEY_DOWN=40,this.KEY_ENTER=13,this.KEY_SPACE=32,this.lastPress=null,this.pressing=[]}return i(e,[{key:"listen",value:function(){var e=this;document.addEventListener("keydown",function(t){e.lastPress=t.keyCode,e.pressing[t.keyCode]=!0},!1),document.addEventListener("keyup",function(t){e.pressing[t.keyCode]=!1},!1)}}]),e}();t.KeyBoard=new s},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),a=function(e){return e&&e.__esModule?e:{default:e}}(o),u=function(e){function t(e,n,s,o,a){r(this,t);var u=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n,s,o));return u.type=void 0===a?1:a,u}return s(t,e),t}(a.default);t.default=u},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(){x=document.getElementById("canvas"),O=x.getContext("2d"),x.width=400,x.height=580;for(var e=0;e<200;e++)R.push(new d.default(c.default.mathR(x.width),c.default.mathR(x.height),c.default.mathR(200)));s(),o()}function s(){setTimeout(s,50),u()}function o(){requestAnimationFrame(o),l(O)}function a(){k.score=0,k.x=200,k.y=530,k.shots.length=0,K.length=0,j.length=0,k.messages.length=0,K.push(new v.default(40,0,40,40,0,2)),P=!1,k.health=3,k.timer=0,k.multishot=1}function u(){if(!E){P&&a(),k.update(),S--,S<0&&(K.push(new v.default(0,60,40,40,1)),S=20+c.default.mathR(40));for(var e=0,t=K.length;e<t;e++){if(K[e].timer>0&&K[e].timer--,1==K[e].type){if(K[e].x+=10,K[e].x>x.width){K.splice(e--,1),t--;continue}K[e].timer--,K[e].timer<0&&(K.push(new v.default(K[e].x+3,K[e].y+5,10,10,2)),K[e].timer=10+c.default.mathR(30));for(var n=0,r=k.shots.length;n<r;n++)k.shots[n].intersects(K[e])&&(k.score++,k.shots.splice(n--,1),r--,K.splice(e--,1),t--)}else if(2==K[e].type){if(K[e].y+=10,K[e].y>x.height){K.splice(e--,1),t--;continue}k.intersects(K[e])&&k.timer<1&&(k.health--,k.timer=20)}for(var i=0,s=k.shots.length;i<s;i++)if(k.shots[i].intersects(K[e])){if(k.score++,--K[e].health<1){var o=c.default.mathR(20);o<5&&(0==o?j.push(new _.default(K[e].x,K[e].y,40,40,1)):j.push(new _.default(K[e].x,K[e].y,40,40,0))),K[e].x=40*c.default.mathR(x.width/40),K[e].y=0,K[e].health=2,K.legth<50&&K.push(new v.default(40*c.default.mathR(x.width/40),0,40,40,0,2))}else K[e].timer=1;k.shots.splice(i--,1),s--}0==K[e].type&&(K[e].y+=10,K[e].y>x.height&&(K[e].x=40*c.default.mathR(x.width/40),K[e].y=0),k.intersects(K[e])&&k.timer<1&&(k.health--,k.timer=20));for(var u=0,l=k.shots.length;u<l;u++)if(k.shots[u].intersects(K[e])){if(k.score++,--K[e].health<1){var f=c.default.mathR(20);f<5&&(0==f?j.push(new _.default(K[e].x,K[e].y,40,40,1)):j.push(new _.default(K[e].x,K[e].y,40,40,0))),K[e].x=40*c.default.mathR(x.width/40),K[e].y=0,K[e].health=2,K.length<50&&K.push(new v.default(40*c.default.mathR(x.width/40),0,40,40,0,2))}else K[e].timer=1;k.shots.splice(u--,1),l--}}for(var y=0,p=j.length;y<p;y++)j[y].y+=10,k.checkPowerUp(j[y]),k.intersects(j[y])&&(j.splice(y--,1),p--),j[y].y>x.height&&(j.splice(y--,1),p--);for(var d=0,m=k.shots.length;d<m;d++)k.shots[d].y-=10,k.shots[d].y<0&&(k.shots.splice(d--,1),m--);k.timer>0&&k.timer--,k.health<1&&(P=!0,E=!0);for(var w=0,g=R.length;w<g;w++)R[w].moveStars(x.height);T++,T>0&&(T-=A.height);for(var b=0,O=k.messages.length;b<O;b++)k.messages[b].y+=2,k.messages[b].y<200&&(k.messages.splice(b--,1),O--)}h.KeyBoard.lastPress==h.KeyBoard.KEY_ENTER&&(E=!E,h.KeyBoard.lastPress=null)}function l(e){e.fillStyle="#000",e.fillRect(0,0,x.width,x.height),A.width&&(e.drawImage(A,0,T),e.drawImage(A,0,A.height+T)),k.drawImageArea(e,B,0,0,150,150);for(var t=0,n=K.length;t<n;t++)0==K[t].type?2==K[t].health?(e.fillStyle="#0a3f21",K[t].drawImageArea(e,I,35,100,25,25)):(e.fillStyle="#01f4f5",K[t].drawImageArea(e,I,35,128,25,25)):1==K[t].type?K[t].drawImageArea(e,I,35,200,25,25):2==K[t].type&&K[t].drawImageArea(e,M,168,21,12,12);e.fillStyle="#f00";for(var r=0,i=k.shots.length;r<i;r++)k.shots[r].drawImageArea(e,M,21,21,8,8);for(var s=0,o=j.length;s<o;s++)1==j.type?(e.strokeStyle="#f90",j[s].drawImageArea(e,I,35,68,25,25)):(e.strokeStyle="#cc6",j[s].drawImageArea(e,I,35,68,25,25));e.fillStyle="#fff";for(var a=0,u=k.messages.length;a<u;a++)e.fillText(k.messages[a].string,k.messages[a].x,k.messages[a].y-50);for(var l=0,h=R.length;l<h;l++){var f=255-Math.abs(100-R[l].timer);e.fillStyle="rgb("+f+", "+f+", "+f+")",e.fillRect(R[l].x,R[l].y,2,2)}e.fillStyle="#fff",e.fillText("Health: "+k.health,350,20),e.fillStyle="#fff",e.fillText("Score: "+k.score,50,20),E&&(e.textAlign="center",P?e.fillText("GAME OVER",200,300):(e.fillText("PAUSE",200,300),e.textAlign="left"))}var h=n(1),f=n(4),c=r(f),y=n(0),p=(r(y),n(5)),d=r(p),m=n(6),w=r(m),g=n(9),v=r(g),b=n(2),_=r(b);window.addEventListener("load",i,!1),h.KeyBoard.listen();var x=null,O=null,E=!0,P=!0,j=[],k=new w.default(200,530,40,40,3),K=[],R=[],T=0,S=20,A=new Image,I=new Image,M=new Image,B=new Image;A.src="../src/assets/nebula.png",I.src="../src/assets/smallships.png",M.src="../src/assets/fstrip.png",B.src="../src/assets/spaceship.png",window.requestAnimationFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,17)}}()},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=function(){function e(){r(this,e)}return i(e,null,[{key:"mathR",value:function(e){return~~(Math.random()*e)}}]),e}();t.default=s},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=function(){function e(t,n,i){r(this,e),this.x=null==t?0:t,this.y=null==n?0:n,this.timer=null==i?0:i}return i(e,[{key:"moveStars",value:function(e){this.y++,this.y>e&&(this.y=0),this.timer+=10,this.timer>200&&(this.timer-=200)}}]),e}();t.default=s},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),l=r(u),h=n(1),f=n(7),c=r(f),y=n(2),p=(r(y),n(8)),d=r(p),m=function(e){function t(e,n,r,o,a){i(this,t);var u=s(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n,r,o));return u.health=void 0===a?1:a,u.timer=0,u.shots=[],u.multiShot=1,u.score=0,u.messages=[],u}return o(t,e),a(t,[{key:"update",value:function(){this.movePlayer(),this.checkStatus()}},{key:"movePlayer",value:function(){h.KeyBoard.pressing[h.KeyBoard.KEY_UP]&&(this.y-=10),h.KeyBoard.pressing[h.KeyBoard.KEY_RIGHT]&&(this.x+=10),h.KeyBoard.pressing[h.KeyBoard.KEY_DOWN]&&(this.y+=10),h.KeyBoard.pressing[h.KeyBoard.KEY_LEFT]&&(this.x-=10),h.KeyBoard.lastPress==h.KeyBoard.KEY_SPACE&&(3==this.multishot?(this.shots.push(new c.default(this.x-12,this.y+2,8,8)),this.shots.push(new c.default(this.x+15,this.y,8,8)),this.shots.push(new c.default(this.x+42,this.y+2,8,8))):2==this.multishot?(this.shots.push(new c.default(this.x+6,this.y,8,8)),this.shots.push(new c.default(this.x+26,this.y,8,8))):this.shots.push(new c.default(this.x+15,this.y,8,8)),h.KeyBoard.lastPress=null)}},{key:"checkStatus",value:function(){this.x>canvas.width-this.width&&(this.x=canvas.width-this.width),this.x<0&&(this.x=0),this.y>canvas.height-2*this.height&&(this.y=canvas.height-2*this.height),this.y<0&&(this.y=2*this.height),this.timer>0&&(this.timer=this.timer-1),0==this.health&&(gameover=!0,pause=!0)}},{key:"checkPowerUp",value:function(e){this.intersects(e)&&(1==e.type&&this.multishot<3?(this.multishot++,this.messages.push(new d.default("Multi",this.x,this.y))):(this.score+=5,this.messages.push(new d.default("+5",this.x,this.y))))}}]),t}(l.default);t.default=m},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(0),u=function(e){return e&&e.__esModule?e:{default:e}}(a),l=(n(1),function(e){function t(e,n,s,o){r(this,t);var a=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n,s,o));return a.timer=0,a}return s(t,e),o(t,[{key:"update",value:function(){this.moveShots()}},{key:"moveShots",value:function(){this.y-=10}}]),t}(u.default));t.default=l},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function e(t,n,i){r(this,e),this.string=null==t?"?":t,this.x=null==n?0:n,this.y=null==i?0:i};t.default=i},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),a=function(e){return e&&e.__esModule?e:{default:e}}(o),u=function(e){function t(e,n,s,o,a,u){r(this,t);var l=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n,s,o));return l.health=null==u?1:u,l.type=null==a?1:a,l}return s(t,e),t}(a.default);t.default=u}]);