const assert=require('node:assert/strict');

const store=new Map();
global.localStorage={
  getItem:key=>store.get(key)||null,
  setItem:(key,value)=>store.set(key,String(value))
};
global.window={AFFILIATE_CONFIG:{
  conoha_canvas:{enabled:true,url:'javascript:alert(1)'},
  adobe:{enabled:true,url:'https://affiliate.example/adobe'}
}};

let checked=[{value:'image'}];
const nodes={
  '#choices':{insertAdjacentHTML(){}},
  '#run':{},
  '#priority':{value:'easy'},
  '#cards':{innerHTML:''},
  '#disclosure':{hidden:true},
  '#result':{hidden:true}
};
global.document={
  querySelector:selector=>nodes[selector],
  querySelectorAll:selector=>selector==='#choices input:checked'?checked:[]
};

const {safeHttpUrl,linkFor}=require('../app.js');
assert.equal(typeof nodes['#run'].onclick,'function');
assert.equal(safeHttpUrl('javascript:alert(1)'),'');
assert.equal(safeHttpUrl('https://example.com/x'),'https://example.com/x');
assert.deepEqual(linkFor({key:'conoha_canvas',url:'https://ai.conoha.jp/canvas/'}),{url:'https://ai.conoha.jp/canvas/',rel:'noopener',paid:false});
assert.deepEqual(linkFor({key:'adobe',url:'https://www.adobe.com/jp/creativecloud.html'}),{url:'https://affiliate.example/adobe',rel:'nofollow noopener sponsored',paid:true});

nodes['#run'].onclick();
let usage=JSON.parse(store.get('amase_usage_creator_stack_picker'));
assert.equal(usage.total,1);
assert.equal(usage.labels.run,1);
assert.doesNotMatch(nodes['#cards'].innerHTML,/javascript:/);
assert.match(nodes['#cards'].innerHTML,/https:\/\/affiliate\.example\/adobe/);

nodes['#run'].onclick();
usage=JSON.parse(store.get('amase_usage_creator_stack_picker'));
assert.equal(usage.total,2);
assert.equal(usage.labels.run,2);

assert.match(nodes['#cards'].innerHTML,/Adobe Creative Cloud|ConoHa AI Canvas|GIMP/);
checked=[]; nodes['#run'].onclick();
assert.equal(nodes['#cards'].innerHTML,'<p>条件を1つ以上選んでください。</p>');
assert.equal(nodes['#disclosure'].hidden,true);
console.log('13 assertions PASS: usage/ranking preserved and unsafe affiliate URLs fall back to official links');
