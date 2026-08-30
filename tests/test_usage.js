const assert=require('node:assert/strict');

const store=new Map();
global.localStorage={
  getItem:key=>store.get(key)||null,
  setItem:(key,value)=>store.set(key,String(value))
};
global.window={AFFILIATE_CONFIG:{}};

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
  querySelectorAll:selector=>selector==='#choices input:checked'?[{value:'image'}]:[]
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

console.log('4 assertions PASS: one click equals one run');
