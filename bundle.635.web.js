"use strict";(self.webpackChunk_mmomtchev_react_native_settings=self.webpackChunk_mmomtchev_react_native_settings||[]).push([[635],{2635:(n,s,a)=>{a.r(s),a.d(s,{default:()=>t});const t='<span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> ReactDOM <span class="token keyword">from</span> <span class="token string">"react-dom"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> Dimensions<span class="token punctuation">,</span> StyleSheet<span class="token punctuation">,</span> View <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"react-native"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> NavigationContainer <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"@react-navigation/native"</span><span class="token punctuation">;</span>\n\n<span class="token comment">// This example uses react-native async-storage to store the configuration</span>\n<span class="token keyword">import</span> AsyncStorage <span class="token keyword">from</span> <span class="token string">"@react-native-async-storage/async-storage"</span><span class="token punctuation">;</span>\n\n<span class="token keyword">import</span> <span class="token punctuation">{</span>\n  <span class="token keyword">default</span> <span class="token keyword">as</span> ReactNativeSettings<span class="token punctuation">,</span>\n  SettingsElement<span class="token punctuation">,</span>\n<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"@mmomtchev/react-native-settings"</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> styles <span class="token operator">=</span> StyleSheet<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  container<span class="token operator">:</span> <span class="token punctuation">{</span>\n    flex<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n    maxHeight<span class="token operator">:</span> Dimensions<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"window"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>height<span class="token punctuation">,</span>\n    backgroundColor<span class="token operator">:</span> <span class="token string">"#fff"</span><span class="token punctuation">,</span>\n    justifyContent<span class="token operator">:</span> <span class="token string">"center"</span><span class="token punctuation">,</span>\n    padding<span class="token operator">:</span> <span class="token string">"1.5%"</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// You have to define a configuration getter</span>\n<span class="token comment">// (you are allowed to use async)</span>\n<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">confGet</span><span class="token punctuation">(</span>key<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> def<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">></span> <span class="token punctuation">{</span>\n  <span class="token comment">// I am slow</span>\n  <span class="token keyword">await</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Promise</span></span><span class="token punctuation">(</span><span class="token punctuation">(</span>resolve<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">setTimeout</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> <span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">return</span> <span class="token keyword">await</span> AsyncStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span>v <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">"value not found"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token keyword">return</span> v<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      <span class="token keyword">return</span> def<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// And a configuration setter</span>\n<span class="token comment">// (you are allowed to use async or to return false to deny the operation but not both at the same time)</span>\n<span class="token keyword">function</span> <span class="token function">confSet</span><span class="token punctuation">(</span>key<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> value<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token operator">></span> <span class="token operator">|</span> <span class="token builtin">boolean</span> <span class="token punctuation">{</span>\n  <span class="token comment">// denying must be synchronous</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>value<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string">"bad"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n  <span class="token comment">// I am slow</span>\n  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Promise</span></span><span class="token punctuation">(</span><span class="token punctuation">(</span>resolve<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">setTimeout</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> <span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>\n    AsyncStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      <span class="token comment">// eslint-disable-next-line no-console</span>\n      <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">const</span> intelligence<span class="token operator">:</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">string</span><span class="token operator">></span> <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token constant">L</span><span class="token operator">:</span> <span class="token string">"Low"</span><span class="token punctuation">,</span>\n  <span class="token constant">M</span><span class="token operator">:</span> <span class="token string">"Medium"</span><span class="token punctuation">,</span>\n  <span class="token constant">H</span><span class="token operator">:</span> <span class="token string">"High"</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> pairs<span class="token operator">:</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">string</span><span class="token operator">></span> <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token string-property property">"2"</span><span class="token operator">:</span> <span class="token string">"Two"</span><span class="token punctuation">,</span>\n  <span class="token string-property property">"4"</span><span class="token operator">:</span> <span class="token string">"Four"</span><span class="token punctuation">,</span>\n  <span class="token string-property property">"6"</span><span class="token operator">:</span> <span class="token string">"Six"</span><span class="token punctuation">,</span>\n  <span class="token string-property property">"8"</span><span class="token operator">:</span> <span class="token string">"Eight"</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token comment">// This is the configuration schema</span>\n<span class="token keyword">const</span> settings<span class="token operator">:</span> SettingsElement<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>\n  <span class="token punctuation">{</span>\n    <span class="token comment">// Two items grouped under a common header</span>\n    label<span class="token operator">:</span> <span class="token string">"Alien Race"</span><span class="token punctuation">,</span>\n    type<span class="token operator">:</span> <span class="token string">"section"</span><span class="token punctuation">,</span>\n    elements<span class="token operator">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span>\n        label<span class="token operator">:</span> <span class="token string">"Name"</span><span class="token punctuation">,</span>\n        type<span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span>\n        <span class="token function-variable function">display</span><span class="token operator">:</span> <span class="token punctuation">(</span>s<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>s <span class="token operator">&amp;&amp;</span> s<span class="token punctuation">.</span>length <span class="token operator">?</span> s <span class="token operator">:</span> <span class="token string">"empty"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        get<span class="token operator">:</span> <span class="token function">confGet</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">"@name"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        set<span class="token operator">:</span> <span class="token function">confSet</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">"@name"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token comment">// You can use `display` to define how information is rendered</span>\n      <span class="token punctuation">{</span>\n        label<span class="token operator">:</span> <span class="token string">"Secret"</span><span class="token punctuation">,</span>\n        type<span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span>\n        <span class="token function-variable function">display</span><span class="token operator">:</span> <span class="token punctuation">(</span>s<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>s <span class="token operator">&amp;&amp;</span> s<span class="token punctuation">.</span>length <span class="token operator">?</span> <span class="token string">"***"</span> <span class="token operator">:</span> <span class="token string">"empty"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        get<span class="token operator">:</span> <span class="token function">confGet</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">"@password"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        set<span class="token operator">:</span> <span class="token function">confSet</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">"@password"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token comment">// Choose from a list, uses the standard phone navigation screens</span>\n  <span class="token punctuation">{</span>\n    label<span class="token operator">:</span> <span class="token string">"Intelligence"</span><span class="token punctuation">,</span>\n    type<span class="token operator">:</span> <span class="token string">"enum"</span><span class="token punctuation">,</span>\n    values<span class="token operator">:</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>intelligence<span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token function-variable function">display</span><span class="token operator">:</span> <span class="token punctuation">(</span>v<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=></span> intelligence<span class="token punctuation">[</span>v<span class="token punctuation">]</span><span class="token punctuation">,</span>\n    get<span class="token operator">:</span> <span class="token function">confGet</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">"@int"</span><span class="token punctuation">,</span> <span class="token string">"M"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    set<span class="token operator">:</span> <span class="token function">confSet</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">"@int"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span>\n    label<span class="token operator">:</span> <span class="token string">"Legs"</span><span class="token punctuation">,</span>\n    type<span class="token operator">:</span> <span class="token string">"enum"</span><span class="token punctuation">,</span>\n    values<span class="token operator">:</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>pairs<span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token function-variable function">display</span><span class="token operator">:</span> <span class="token punctuation">(</span>v<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=></span> pairs<span class="token punctuation">[</span>v<span class="token punctuation">]</span><span class="token punctuation">,</span>\n    get<span class="token operator">:</span> <span class="token function">confGet</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">"@legs"</span><span class="token punctuation">,</span> <span class="token string">"2"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    set<span class="token operator">:</span> <span class="token function">confSet</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">"@legs"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span>\n    label<span class="token operator">:</span> <span class="token string">"Arms"</span><span class="token punctuation">,</span>\n    type<span class="token operator">:</span> <span class="token string">"enum"</span><span class="token punctuation">,</span>\n    values<span class="token operator">:</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>pairs<span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token function-variable function">display</span><span class="token operator">:</span> <span class="token punctuation">(</span>v<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=></span> pairs<span class="token punctuation">[</span>v<span class="token punctuation">]</span><span class="token punctuation">,</span>\n    get<span class="token operator">:</span> <span class="token function">confGet</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">"@arms"</span><span class="token punctuation">,</span> <span class="token string">"2"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    set<span class="token operator">:</span> <span class="token function">confSet</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">"@arms"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token comment">// Boolean switches grouped under a common header</span>\n  <span class="token punctuation">{</span>\n    label<span class="token operator">:</span> <span class="token string">"Features"</span><span class="token punctuation">,</span>\n    type<span class="token operator">:</span> <span class="token string">"section"</span><span class="token punctuation">,</span>\n    elements<span class="token operator">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span>\n        label<span class="token operator">:</span> <span class="token string">"Wings"</span><span class="token punctuation">,</span>\n        type<span class="token operator">:</span> <span class="token string">"boolean"</span><span class="token punctuation">,</span>\n        <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token keyword">await</span> <span class="token function">confGet</span><span class="token punctuation">(</span><span class="token string">"@wings"</span><span class="token punctuation">,</span> <span class="token string">"false"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">"true"</span><span class="token punctuation">,</span>\n        <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token punctuation">(</span>v<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">confSet</span><span class="token punctuation">(</span><span class="token string">"@wings"</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">{</span>\n        label<span class="token operator">:</span> <span class="token string">"Horns"</span><span class="token punctuation">,</span>\n        type<span class="token operator">:</span> <span class="token string">"boolean"</span><span class="token punctuation">,</span>\n        <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token keyword">await</span> <span class="token function">confGet</span><span class="token punctuation">(</span><span class="token string">"@horns"</span><span class="token punctuation">,</span> <span class="token string">"true"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">"true"</span><span class="token punctuation">,</span>\n        <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token punctuation">(</span>v<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">confSet</span><span class="token punctuation">(</span><span class="token string">"@horns"</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">{</span>\n        label<span class="token operator">:</span> <span class="token string">"Fangs"</span><span class="token punctuation">,</span>\n        type<span class="token operator">:</span> <span class="token string">"boolean"</span><span class="token punctuation">,</span>\n        <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token keyword">await</span> <span class="token function">confGet</span><span class="token punctuation">(</span><span class="token string">"@fangs"</span><span class="token punctuation">,</span> <span class="token string">"false"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">"true"</span><span class="token punctuation">,</span>\n        <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token punctuation">(</span>v<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">confSet</span><span class="token punctuation">(</span><span class="token string">"@fangs"</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">{</span>\n        label<span class="token operator">:</span> <span class="token string">"Claws"</span><span class="token punctuation">,</span>\n        type<span class="token operator">:</span> <span class="token string">"boolean"</span><span class="token punctuation">,</span>\n        <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token keyword">await</span> <span class="token function">confGet</span><span class="token punctuation">(</span><span class="token string">"@claws"</span><span class="token punctuation">,</span> <span class="token string">"false"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">"true"</span><span class="token punctuation">,</span>\n        <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token punctuation">(</span>v<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">confSet</span><span class="token punctuation">(</span><span class="token string">"@claws"</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">{</span>\n        label<span class="token operator">:</span> <span class="token string">"Gills"</span><span class="token punctuation">,</span>\n        type<span class="token operator">:</span> <span class="token string">"boolean"</span><span class="token punctuation">,</span>\n        <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token keyword">await</span> <span class="token function">confGet</span><span class="token punctuation">(</span><span class="token string">"@gills"</span><span class="token punctuation">,</span> <span class="token string">"false"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">"true"</span><span class="token punctuation">,</span>\n        <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token punctuation">(</span>v<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">confSet</span><span class="token punctuation">(</span><span class="token string">"@gills"</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">]</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">Settings</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">// Simply pass the schema here</span>\n  <span class="token comment">// It integrates in your existing `NavigationContainer` or `Screen`</span>\n  <span class="token keyword">return</span> <span class="token punctuation">(</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">NavigationContainer</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">View</span></span> <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>styles<span class="token punctuation">.</span>container<span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">ReactNativeSettings</span></span> <span class="token attr-name">settings</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>settings<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">View</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">NavigationContainer</span></span><span class="token punctuation">></span></span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\nReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Settings</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">,</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"root"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n'}}]);