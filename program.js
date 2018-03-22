/**
 * Represent a branch in the tree
 */
class Branch {
  constructor({ id, value, parentId }) {
    this.id = id;
    this.value = value;
    this.parentId = parentId;
    this.children = [];
  }

  /**
   * Add a branch to the current branch.
   */
  addChild(branch) {
    this.children.push(branch);
  }

  /**
   * Get the value of this branch
   */
  getValue() {
    return this.value;
  }
}

/**
 * Represent a tree
 */
class Tree {
  constructor(root) {
    this.root = root;
  }

  /**
   * Traverse the tree and call the callback on each branch
   */
  traverse(callback) {
    const branchStack = [this.root];
    let current = null;

    while (branchStack.length !== 0) {
      current = branchStack.pop();

      if (callback) {
        callback(current);
      }

      current.children.forEach((branch) => {
        branchStack.push(branch);
      });
    }
  }
}

/**
 * Create a tree from branch data.
 */
const createTree = (data) => {
  // Map of branches to easily lookup a branch
  const branches = {};

  // Root branch
  let root = null;

  data.split('\n').forEach((item) => {
    let branchData = item.split(',').map(x => parseInt(x.trim(), 10));

    branchData = {
      id: branchData[0],
      parentId: branchData[1],
      value: branchData.slice(2).reduce((a, b) => a + b, 0),
    };

    // Create branch
    const branch = new Branch(branchData);

    // Add to map
    branches[branchData.id] = branch;

    // Add branch as child of parent
    if (branchData.parentId in branches) {
      branches[branchData.parentId].addChild(branch);
    } else if (branchData.parentId === -1) {
      root = branch;
    }
  });

  return new Tree(root);
};

const parseTree = (fileText) => {
  if (fileText.match(/[a-z]/i)) {
    return 'Invalid Input File!';
  }

  const tree = createTree(fileText);

  let totalWeight = 0;

  // Traverse the tree and get weight of each fruit
  tree.traverse((branch) => {
    totalWeight += branch.getValue();
  });

  return totalWeight;
};

const readFile = (evt) => {
  const file = evt.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      document.getElementById('result').innerHTML = parseTree(e.target.result);
    };

    reader.readAsText(file);
  } else {
    document.getElementById('result').innerHTML = 'Failed to load file';
  }
};

/**
 * Unit Testing
 */
const tests = [
  {
    input: '0, -1, 5',
    expected: 5,
  },
  {
    input: `0, -1, 0, 5
1, 0, 0, 5
2, 1, 0, 5
3, 2, 0, 5
4, 3, 5`,
    expected: 25,
  },
  {
    input: `0, -1, 0, 0, 0
1, 0, 2
2, 0, 0, 1
3, 0
4, 2, 1`,
    expected: 4,
  },
  {
    input: `0, -1, 0, 2
1, 0, 0, 0
2, 1, 10
3, 1, 11`,
    expected: 23,
  },
];

let result = null;

// Run each test
tests.forEach((test) => {
  result = parseTree(test.input);
  console.assert(result === test.expected, {
    msg: 'Test failed!',
    input: test.input,
    expected: test.expected,
    actual: result,
  });
});

window.addEventListener('load', () => {
  document.getElementById('fileInput').addEventListener('change', readFile, false);
}, false);
