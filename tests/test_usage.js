const assert=require('node:assert/strict');

const store=new Map();
global.localStorage={
  getItem:key=>store.get(key)||null,
  setItem:(key,value)=>store.set(key,String(value))
};
global.window={AFFILIATE_CONFIG:{}};

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

require('../app.js');
assert.equal(typeof nodes['#run'].onclick,'function');

nodes['#run'].onclick();
let usage=JSON.parse(store.get('amase_usage_creator_stack_picker'));
assert.equal(usage.total,1);
assert.equal(usage.labels.run,1);

nodes['#run'].onclick();
usage=JSON.parse(store.get('amase_usage_creator_stack_picker'));
assert.equal(usage.total,2);
assert.equal(usage.labels.run,2);

assert.match(nodes['#cards'].innerHTML,/Adobe Creative Cloud|ConoHa AI Canvas|GIMP/);
checked=[]; nodes['#run'].onclick();
assert.equal(nodes['#cards'].innerHTML,'<p>条件を1つ以上選んでください。</p>');
assert.equal(nodes['#disclosure'].hidden,true);
console.log('7 assertions PASS: usage remains one-per-click and empty selection yields no ranking');
