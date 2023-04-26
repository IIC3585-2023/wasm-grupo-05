self.onmessage = event => {
  const args = event.data;
  const result = Module.ccall('greedyC', 'int', ['number', 'number', 'number', 'number'], args);
  postMessage(result);
};
