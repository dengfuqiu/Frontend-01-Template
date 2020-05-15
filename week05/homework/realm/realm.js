const set = new Set();
const globalProperties = [
  'eval',
  'isFinite',
  'isNaN',
  'parseFloat',
  'parseInt',
  'decodeURI',
  'decodeURIComponent',
  'encodeURI',
  'encodeURIComponent',
  'Array',
  'Date',
  'RegExp',
  'Promise',
  'Proxy',
  'Map',
  'WeakMap',
  'Set',
  'WeakSet',
  'Function',
  'Boolean',
  'String',
  'Number',
  'Symbol',
  'Object',
  'Error',
  'EvalError',
  'RangeError',
  'ReferenceError',
  'SyntaxError',
  'TypeError',
  'URIError',
  'ArrayBuffer',
  'SharedArrayBuffer',
  'DataView',
  'Float32Array',
  'Float64Array',
  'Int8Array',
  'Int16Array',
  'Int32Array',
  'Uint8Array',
  'Uint16Array',
  'Uint32Array',
  'Uint8ClampedArray',
  'Atomics',
  'JSON',
  'Math',
  'Reflect'
]

const queue = [];
const nodes = [];

const queuePushItem = (queue, path, object) => {
  queue.push({
    path,
    object
  });
  modifyNodes(nodes, path);
}

const modifyNodes = (nodes, pathArr) => {
  const copyPathArr = Array.from(pathArr);
  let current = copyPathArr.shift();
  let nodesIndex = nodes.findIndex(node => node.id === current);
  if (copyPathArr.length === 0 && nodesIndex === -1) {
    nodes.push({
      id: current,
      children: [],
    });
  } else {
    modifyNodes(nodes[nodesIndex].children, copyPathArr);
  }
}

for (const p of globalProperties) {
  queuePushItem(queue, [p], this[p]);
}

let current;
let count = 0;

while (queue.length) {
  current = queue.shift();
  if (set.has(current.object)) {
    continue;
  }

  // console.log('current.path :>> ', current.path);
  set.add(current.object);

  for (let p of Object.getOwnPropertyNames(current.object)) {
    const property = Object.getOwnPropertyDescriptor(current.object, p);
    if (
      property.hasOwnProperty('value')
      && (
        (property.value != null) && (typeof property.value === 'object') || (typeof property.value === 'object')
      )
      && property.value instanceof Object
    ) {
      queuePushItem(queue, current.path.concat([`${count} value ${p}`]), property.value);
      count++;
    }
    if (property.hasOwnProperty('get') && (typeof property.get === 'function')) {
      queuePushItem(queue, current.path.concat([`${count} get ${p}`]), property.get);
      count++;
    }
    if (property.hasOwnProperty('set') && (typeof property.set === 'function')) {
      queuePushItem(queue, current.path.concat([`${count} get ${p}`]), property.set);
      count++;
    }
  }
}

window.onload = () => {
  const graph = new G6.TreeGraph({
    container: 'container',
    width: document.body.clientWidth,
    height: document.body.clientHeight,
    modes: {
      default: [
        {
          type: 'collapse-expand',
          // onChange: function onChange(item, collapsed) {
          //   const data = item.get('model').data;
          //   data.collapsed = collapsed;
          //   return true;
          // },
        },
        'drag-canvas',
        'zoom-canvas',
      ],
    },
    defaultNode: {
      size: 26,
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
      style: {
        fill: '#C6E5FF',
        stroke: '#5B8FF9',
      },
    },
    defaultEdge: {
      type: 'cubic-horizontal',
      style: {
        stroke: '#A3B1BF',
      },
    },
    layout: {
      type: 'compactBox',
      direction: 'LR',
      getId: function getId(d) {
        return d.id;
      },
      getHeight: function getHeight() {
        return 16;
      },
      getWidth: function getWidth() {
        return 16;
      },
      getVGap: function getVGap() {
        return 10;
      },
      getHGap: function getHGap() {
        return 100;
      },
    },
  });

  graph.node(function (node) {
    return {
      label: node.id,
      labelCfg: {
        offset: 10,
        position: node.children && node.children.length > 0 ? 'left' : 'right',
      },
    };
  });

  // 读取数据
  graph.data({
    id: 'realm',
    children: nodes,
  });
  // 渲染图
  graph.render();
  graph.fitView();
}

