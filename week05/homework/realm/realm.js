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
const mountNodes = [];

for (const p of globalProperties) {
  queue.push({
    path: [p],
    object: this[p]
  });
}

let current;

while (queue.length) {
  current = queue.shift();
  if (set.has(current.object)) {
    continue;
  }
  set.add(current.object);
  mountNodes.push(current.path);
  for (let p of Object.getOwnPropertyNames(current.object)) {
    const property = Object.getOwnPropertyDescriptor(current.object, p);
    if (
      property.hasOwnProperty('value')
      && (
        (property.value != null) && (typeof property.value === 'object') || (typeof property.value === 'object')
      )
      && property.value instanceof Object
    ) {
      queue.push({
        path: current.path.concat([p]),
        object: property.value
      });
    }
    if (property.hasOwnProperty('get') && (typeof property.get === 'function')) {
      queue.push({
        path: current.path.concat([p]),
        object: property.get
      });
    }
    if (property.hasOwnProperty('set') && (typeof property.set === 'function')) {
      queue.push({
        path: current.path.concat([p]),
        object: property.set
      });
    }
  }
}
console.log('mountNodes :>> ', mountNodes);

const nodes = {
  id: 'realm',
  children: [...mountNodes.filter(item => item.length === 1).map(item => ({ id: item[0] }))],
}

console.log('nodes :>> ', nodes);

const data = {
  "id": "Modeling Methods",
  "children": [
    {
      "id": "Classification",
      "children": [
        {
          "id": "Logistic regression"
        },
        {
          "id": "Linear discriminant analysis"
        },
        {
          "id": "Rules"
        },
        {
          "id": "Decision trees"
        },
        {
          "id": "Naive Bayes"
        },
        {
          "id": "K nearest neighbor"
        },
        {
          "id": "Probabilistic neural network"
        },
        {
          "id": "Support vector machine"
        }
      ]
    },
    {
      "id": "Consensus",
      "children": [
        {
          "id": "Models diversity",
          "children": [
            {
              "id": "Different initializations"
            },
            {
              "id": "Different parameter choices"
            },
            {
              "id": "Different architectures"
            },
            {
              "id": "Different modeling methods"
            },
            {
              "id": "Different training sets"
            },
            {
              "id": "Different feature sets"
            }
          ]
        },
        {
          "id": "Methods",
          "children": [
            {
              "id": "Classifier selection"
            },
            {
              "id": "Classifier fusion"
            }
          ]
        },
        {
          "id": "Common",
          "children": [
            {
              "id": "Bagging"
            },
            {
              "id": "Boosting"
            },
            {
              "id": "AdaBoost"
            }
          ]
        }
      ]
    },
    {
      "id": "Regression",
      "children": [
        {
          "id": "Multiple linear regression"
        },
        {
          "id": "Partial least squares"
        },
        {
          "id": "Multi-layer feedforward neural network"
        },
        {
          "id": "General regression neural network"
        },
        {
          "id": "Support vector regression"
        }
      ]
    }
  ]
}

window.onload = () => {
  console.log('document.body.clientWidth :>> ', document.body.clientWidth);
  console.log('document.body.clientHeight :>> ', document.body.clientHeight);
  const graph = new G6.TreeGraph({
    container: 'container',
    width: document.body.clientWidth,
    height: document.body.clientHeight,
    modes: {
      default: [
        {
          type: 'collapse-expand',
          onChange: function onChange(item, collapsed) {
            const data = item.get('model').data;
            data.collapsed = collapsed;
            return true;
          },
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
  graph.data(nodes);
  // 渲染图
  graph.render();
  graph.fitView();

}

